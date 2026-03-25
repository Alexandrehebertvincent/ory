// ============================================================================
// Grand Maître — World Orchestrator
// ============================================================================
// "IA Monde / Grand Maître (une instance par monde) — L'orchestrateur
// global omniscient" — GDD §5.2
//
// The Grand Master has global vision and detects:
// - Border tensions between players
// - Resource conflicts on disputed territories
// - Trade opportunities between player nations
// - Military threats (army mobilization near borders)
// - Technology gaps that create friction or opportunity
// - Epidemic spread between nations
// - Cultural/religious clashes
// - Alliance opportunities against common threats
//
// It generates GrandMasterAlerts that the DecisionEngine converts
// into PendingDecisions for affected players.
// ============================================================================

import type {
	Nation,
	DiplomaticRelation,
} from '../../../shared/src/types/world'
import type {
	GameState,
	StaticData,
	SimConfig,
	TickLogEntry,
	GrandMasterAlert,
	UrgencyWeight,
	SeededRNG,
} from '../types'

// ----------------------------------------------------------------------------
// Configuration
// ----------------------------------------------------------------------------

/** Minimum relation level to consider a military threat */
const MILITARY_THREAT_RELATION_THRESHOLD = 3

/** Force ratio above which a military threat is detected */
const FORCE_RATIO_THREAT = 1.5

/** Tech count difference to flag a tech leap */
const TECH_GAP_THRESHOLD = 5

/** Stability below which refugee crisis may spill over */
const REFUGEE_STABILITY_THRESHOLD = 3

/** Religious tension above which cultural clash is flagged */
const CULTURAL_CLASH_TENSION = 7

// ----------------------------------------------------------------------------
// Main orchestrator
// ----------------------------------------------------------------------------

/**
 * Evaluate the global world state and generate alerts for player-relevant situations.
 * Called once per tick by the main simulation loop.
 */
export function evaluateWorldState(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
	playerNationIds: string[],
): { alerts: GrandMasterAlert[]; log: TickLogEntry[] } {
	const alerts: GrandMasterAlert[] = []
	const log: TickLogEntry[] = []
	const currentTick = Math.round(state.currentYear * 52 + state.currentWeek)

	// Map player nation IDs to their family player IDs
	const nationToPlayers = buildNationPlayerMap(state, playerNationIds)

	// Run all detectors
	const detectors: AlertDetector[] = [
		detectMilitaryThreats,
		detectResourceConflicts,
		detectTradeOpportunities,
		detectTechLeaps,
		detectEpidemicSpread,
		detectCulturalClashes,
		detectRefugeeCrises,
		detectAllianceOpportunities,
	]

	for (const detect of detectors) {
		const result = detect(
			state,
			staticData,
			rng,
			playerNationIds,
			nationToPlayers,
			currentTick,
		)
		for (const alert of result) {
			// Avoid duplicate alerts of the same type for the same nations
			const isDuplicate = state.grandMasterAlerts.some(
				(existing) =>
					!existing.processed &&
					existing.type === alert.type &&
					arraysOverlap(existing.involvedNationIds, alert.involvedNationIds),
			)
			if (!isDuplicate) {
				alerts.push(alert)
				log.push({
					year: state.currentYear,
					category: 'decision',
					message: `Grand Maître: ${alert.type} détecté — urgence ${alert.urgency}`,
					data: {
						alertId: alert.id,
						type: alert.type,
						nations: alert.involvedNationIds,
					},
				})
			}
		}
	}

	return { alerts, log }
}

// ----------------------------------------------------------------------------
// Urgency calculator (for time ratio)
// ----------------------------------------------------------------------------

/**
 * Calculate the maximum urgency weight across all players.
 * Used by the time ratio system to determine game speed.
 * GDD §3.2: "Le ratio est déterminé par le poids le plus élevé parmi tous les joueurs"
 */
export function calculateMaxUrgency(state: GameState): UrgencyWeight {
	let maxUrgency: UrgencyWeight = 0 as UrgencyWeight

	// Check pending decisions
	for (const decision of state.pendingDecisions) {
		if (!decision.resolved && decision.urgency > maxUrgency) {
			maxUrgency = decision.urgency
		}
	}

	// Check active conflicts involving player nations
	for (const conflict of state.activeConflicts) {
		if (!conflict.resolved) {
			const urgency = Math.min(
				10,
				Math.round(conflict.forceRatio > 1 ? 6 : 8),
			) as UrgencyWeight
			if (urgency > maxUrgency) maxUrgency = urgency
		}
	}

	// Check unprocessed alerts
	for (const alert of state.grandMasterAlerts) {
		if (!alert.processed && alert.urgency > maxUrgency) {
			maxUrgency = alert.urgency
		}
	}

	return maxUrgency
}

// ----------------------------------------------------------------------------
// Alert detector type
// ----------------------------------------------------------------------------

type NationPlayerMap = Map<string, string[]>

type AlertDetector = (
	state: GameState,
	staticData: StaticData,
	rng: SeededRNG,
	playerNationIds: string[],
	nationToPlayers: NationPlayerMap,
	currentTick: number,
) => GrandMasterAlert[]

// ----------------------------------------------------------------------------
// Detector: Military threats
// ----------------------------------------------------------------------------

/**
 * Detect when a nation mobilizes significant military force near a player's borders.
 * GDD: "on ne peut pas ignorer un voisin qui mobilise son armée à ta frontière"
 */
const detectMilitaryThreats: AlertDetector = (
	state,
	_sd,
	_rng,
	playerNationIds,
	nationToPlayers,
	currentTick,
) => {
	const alerts: GrandMasterAlert[] = []

	for (const playerNationId of playerNationIds) {
		const playerMil = state.nationMilitary.find(
			(m) => m.nationId === playerNationId,
		)
		const playerNation = state.nations.find((n) => n.id === playerNationId)
		if (!playerMil || !playerNation) continue

		// Check all nations with hostile-ish relations
		for (const rel of playerNation.diplomacy) {
			if (rel.strength >= MILITARY_THREAT_RELATION_THRESHOLD) continue // friendly enough

			const hostileMil = state.nationMilitary.find(
				(m) => m.nationId === rel.targetNationId,
			)
			if (!hostileMil) continue

			const playerForce = playerMil.armySize * (playerMil.morale / 10)
			const hostileForce = hostileMil.armySize * (hostileMil.morale / 10)

			if (hostileForce === 0 || playerForce === 0) continue

			const ratio = hostileForce / playerForce
			if (ratio >= FORCE_RATIO_THREAT) {
				const urgency = Math.min(10, Math.round(4 + ratio * 2)) as UrgencyWeight
				const playerIds = nationToPlayers.get(playerNationId) ?? []

				alerts.push({
					id: `gm_mil_${playerNationId}_${rel.targetNationId}_${currentTick}`,
					type: 'military_threat',
					involvedNationIds: [playerNationId, rel.targetNationId],
					affectedPlayerIds: playerIds,
					urgency,
					description: `Forces militaires de ${rel.targetNationId} supérieures (ratio ${ratio.toFixed(1)}:1). Menace potentielle à nos frontières.`,
					imposed: true,
					createdAtTick: currentTick,
					processed: false,
				})
			}
		}
	}

	return alerts
}

// ----------------------------------------------------------------------------
// Detector: Resource conflicts
// ----------------------------------------------------------------------------

const detectResourceConflicts: AlertDetector = (
	state,
	_sd,
	_rng,
	playerNationIds,
	nationToPlayers,
	currentTick,
) => {
	const alerts: GrandMasterAlert[] = []

	for (const playerNationId of playerNationIds) {
		const playerEcon = state.nationEconomies.find(
			(e) => e.nationId === playerNationId,
		)
		if (!playerEcon) continue

		// Check if a neighbor has overlapping main exports (resource competition)
		const playerNation = state.nations.find((n) => n.id === playerNationId)
		if (!playerNation) continue

		for (const rel of playerNation.diplomacy) {
			const otherEcon = state.nationEconomies.find(
				(e) => e.nationId === rel.targetNationId,
			)
			if (!otherEcon) continue

			const sharedExports = playerEcon.mainExports.filter((exp) =>
				otherEcon.mainExports.includes(exp),
			)

			// Conflict when same exports + low relations
			if (sharedExports.length >= 2 && rel.strength < 4) {
				const playerIds = nationToPlayers.get(playerNationId) ?? []
				alerts.push({
					id: `gm_res_${playerNationId}_${rel.targetNationId}_${currentTick}`,
					type: 'resource_conflict',
					involvedNationIds: [playerNationId, rel.targetNationId],
					affectedPlayerIds: playerIds,
					urgency: 4 as UrgencyWeight,
					description: `Conflit de ressources avec ${rel.targetNationId}: marchés concurrents sur ${sharedExports.join(', ')}.`,
					imposed: false,
					createdAtTick: currentTick,
					processed: false,
				})
			}
		}
	}

	return alerts
}

// ----------------------------------------------------------------------------
// Detector: Trade opportunities
// ----------------------------------------------------------------------------

const detectTradeOpportunities: AlertDetector = (
	state,
	staticData,
	_rng,
	playerNationIds,
	nationToPlayers,
	currentTick,
) => {
	const alerts: GrandMasterAlert[] = []

	for (const playerNationId of playerNationIds) {
		const playerEcon = state.nationEconomies.find(
			(e) => e.nationId === playerNationId,
		)
		if (!playerEcon) continue

		// Find nations with complementary exports (they export what we import)
		const playerImports = playerEcon.mainImports ?? []
		if (playerImports.length === 0) continue

		for (const otherEcon of state.nationEconomies) {
			if (otherEcon.nationId === playerNationId) continue

			const complementary = otherEcon.mainExports.filter((exp) =>
				playerImports.includes(exp),
			)

			if (complementary.length === 0) continue

			// Check if a trade route connects them
			const connected = staticData.tradeRoutes.some(
				(r) =>
					(r.connectsNations.includes(playerNationId) &&
						r.connectsNations.includes(otherEcon.nationId)) ||
					r.type === 'sea', // maritime routes are more flexible
			)

			if (!connected) continue

			// Check if other nation is also player-controlled → inter-player opportunity
			const otherPlayerIds = nationToPlayers.get(otherEcon.nationId) ?? []
			const playerIds = [
				...(nationToPlayers.get(playerNationId) ?? []),
				...otherPlayerIds,
			]

			if (playerIds.length > 0) {
				alerts.push({
					id: `gm_trade_${playerNationId}_${otherEcon.nationId}_${currentTick}`,
					type: 'trade_opportunity',
					involvedNationIds: [playerNationId, otherEcon.nationId],
					affectedPlayerIds: playerIds,
					urgency: 2 as UrgencyWeight,
					description: `Opportunité commerciale: ${otherEcon.nationId} exporte ${complementary.join(', ')} dont nous avons besoin.`,
					imposed: false,
					createdAtTick: currentTick,
					processed: false,
				})
			}
		}
	}

	return alerts
}

// ----------------------------------------------------------------------------
// Detector: Tech leaps
// ----------------------------------------------------------------------------

const detectTechLeaps: AlertDetector = (
	state,
	_sd,
	_rng,
	playerNationIds,
	nationToPlayers,
	currentTick,
) => {
	const alerts: GrandMasterAlert[] = []

	for (const playerNationId of playerNationIds) {
		const playerTech = state.nationTechnologies.find(
			(t) => t.nationId === playerNationId,
		)
		if (!playerTech) continue

		const playerTechCount = playerTech.unlockedTechs.length

		for (const otherTech of state.nationTechnologies) {
			if (otherTech.nationId === playerNationId) continue

			const gap = otherTech.unlockedTechs.length - playerTechCount

			if (Math.abs(gap) >= TECH_GAP_THRESHOLD) {
				const playerIds = nationToPlayers.get(playerNationId) ?? []
				const behindNation = gap > 0 ? playerNationId : otherTech.nationId
				const aheadNation = gap > 0 ? otherTech.nationId : playerNationId

				alerts.push({
					id: `gm_tech_${playerNationId}_${otherTech.nationId}_${currentTick}`,
					type: 'tech_leap',
					involvedNationIds: [playerNationId, otherTech.nationId],
					affectedPlayerIds: playerIds,
					urgency: (gap > 0 ? 5 : 3) as UrgencyWeight,
					description:
						gap > 0
							? `${aheadNation} possède un avantage technologique significatif (${Math.abs(gap)} technologies d'avance).`
							: `Nous avons un avantage technologique de ${Math.abs(gap)} technologies sur ${behindNation}.`,
					imposed: false,
					createdAtTick: currentTick,
					processed: false,
				})
			}
		}
	}

	return alerts
}

// ----------------------------------------------------------------------------
// Detector: Epidemic spread
// ----------------------------------------------------------------------------

const detectEpidemicSpread: AlertDetector = (
	state,
	_sd,
	_rng,
	playerNationIds,
	nationToPlayers,
	currentTick,
) => {
	const alerts: GrandMasterAlert[] = []

	for (const playerNationId of playerNationIds) {
		const playerHealth = state.nationHealth.find(
			(h) => h.nationId === playerNationId,
		)
		if (!playerHealth) continue

		// Check neighboring nations for active diseases
		const playerNation = state.nations.find((n) => n.id === playerNationId)
		if (!playerNation) continue

		for (const rel of playerNation.diplomacy) {
			const neighborHealth = state.nationHealth.find(
				(h) => h.nationId === rel.targetNationId,
			)
			if (!neighborHealth) continue

			// If neighbor has active diseases we don't have
			const neighborDiseases =
				neighborHealth.activeDiseases?.map((d) => d.diseaseId) ?? []
			const playerDiseases =
				playerHealth.activeDiseases?.map((d) => d.diseaseId) ?? []
			const newThreats = neighborDiseases.filter(
				(d) => !playerDiseases.includes(d),
			)

			if (newThreats.length > 0) {
				const playerIds = nationToPlayers.get(playerNationId) ?? []
				alerts.push({
					id: `gm_epidemic_${playerNationId}_${currentTick}`,
					type: 'epidemic_spread',
					involvedNationIds: [playerNationId, rel.targetNationId],
					affectedPlayerIds: playerIds,
					urgency: 6 as UrgencyWeight,
					description: `Épidémie détectée chez ${rel.targetNationId} — risque de propagation via les routes commerciales.`,
					imposed: true,
					createdAtTick: currentTick,
					processed: false,
				})
				break // One alert per player nation per tick for epidemics
			}
		}
	}

	return alerts
}

// ----------------------------------------------------------------------------
// Detector: Cultural clashes
// ----------------------------------------------------------------------------

const detectCulturalClashes: AlertDetector = (
	state,
	_sd,
	_rng,
	playerNationIds,
	nationToPlayers,
	currentTick,
) => {
	const alerts: GrandMasterAlert[] = []

	for (const playerNationId of playerNationIds) {
		const playerReligion = state.nationReligions.find(
			(r) => r.nationId === playerNationId,
		)
		if (!playerReligion) continue

		if ((playerReligion.religiousTension ?? 0) >= CULTURAL_CLASH_TENSION) {
			const playerIds = nationToPlayers.get(playerNationId) ?? []
			alerts.push({
				id: `gm_cultural_${playerNationId}_${currentTick}`,
				type: 'cultural_clash',
				involvedNationIds: [playerNationId],
				affectedPlayerIds: playerIds,
				urgency: 5 as UrgencyWeight,
				description: `Tensions religieuses internes critiques (niveau ${playerReligion.religiousTension}). Risque de révolte ou de schisme.`,
				imposed: true,
				createdAtTick: currentTick,
				processed: false,
			})
		}
	}

	return alerts
}

// ----------------------------------------------------------------------------
// Detector: Refugee crises
// ----------------------------------------------------------------------------

const detectRefugeeCrises: AlertDetector = (
	state,
	_sd,
	_rng,
	playerNationIds,
	nationToPlayers,
	currentTick,
) => {
	const alerts: GrandMasterAlert[] = []

	for (const playerNationId of playerNationIds) {
		const playerNation = state.nations.find((n) => n.id === playerNationId)
		if (!playerNation) continue

		for (const rel of playerNation.diplomacy) {
			const neighbor = state.nations.find((n) => n.id === rel.targetNationId)
			if (!neighbor) continue

			if (neighbor.stability < REFUGEE_STABILITY_THRESHOLD) {
				const playerIds = nationToPlayers.get(playerNationId) ?? []
				alerts.push({
					id: `gm_refugee_${playerNationId}_${rel.targetNationId}_${currentTick}`,
					type: 'refugee_crisis',
					involvedNationIds: [playerNationId, rel.targetNationId],
					affectedPlayerIds: playerIds,
					urgency: 4 as UrgencyWeight,
					description: `Instabilité critique à ${rel.targetNationId} (stabilité ${neighbor.stability}). Afflux de réfugiés probable.`,
					imposed: true,
					createdAtTick: currentTick,
					processed: false,
				})
			}
		}
	}

	return alerts
}

// ----------------------------------------------------------------------------
// Detector: Alliance opportunities
// ----------------------------------------------------------------------------

const detectAllianceOpportunities: AlertDetector = (
	state,
	_sd,
	_rng,
	playerNationIds,
	nationToPlayers,
	currentTick,
) => {
	const alerts: GrandMasterAlert[] = []

	// Detect when two player nations share a common enemy
	if (playerNationIds.length < 2) return alerts

	for (let i = 0; i < playerNationIds.length; i++) {
		for (let j = i + 1; j < playerNationIds.length; j++) {
			const nationA = state.nations.find((n) => n.id === playerNationIds[i])
			const nationB = state.nations.find((n) => n.id === playerNationIds[j])
			if (!nationA || !nationB) continue

			// Find common enemies (nations both have bad relations with)
			const enemiesA = nationA.diplomacy
				.filter((rel) => rel.strength < 3)
				.map((rel) => rel.targetNationId)
			const enemiesB = nationB.diplomacy
				.filter((rel) => rel.strength < 3)
				.map((rel) => rel.targetNationId)

			const commonEnemies = enemiesA.filter((e) => enemiesB.includes(e))

			if (commonEnemies.length > 0) {
				const playerIdsA = nationToPlayers.get(playerNationIds[i]) ?? []
				const playerIdsB = nationToPlayers.get(playerNationIds[j]) ?? []

				alerts.push({
					id: `gm_alliance_${playerNationIds[i]}_${playerNationIds[j]}_${currentTick}`,
					type: 'alliance_opportunity',
					involvedNationIds: [
						playerNationIds[i],
						playerNationIds[j],
						...commonEnemies,
					],
					affectedPlayerIds: [...playerIdsA, ...playerIdsB],
					urgency: 3 as UrgencyWeight,
					description: `Alliance potentielle avec ${playerNationIds[j]}: ennemi commun (${commonEnemies.join(', ')}).`,
					imposed: false,
					createdAtTick: currentTick,
					processed: false,
				})
			}
		}
	}

	return alerts
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function buildNationPlayerMap(
	state: GameState,
	playerNationIds: string[],
): NationPlayerMap {
	const map: NationPlayerMap = new Map()
	for (const family of state.familyLines) {
		if (family.playerId) {
			const existing = map.get(family.nationId) ?? []
			existing.push(family.playerId)
			map.set(family.nationId, existing)
		}
	}
	return map
}

function arraysOverlap(a: string[], b: string[]): boolean {
	return a.some((x) => b.includes(x))
}
