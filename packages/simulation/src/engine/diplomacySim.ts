// ============================================================================
// Diplomacy Simulation — NPC Nations
// ============================================================================
// "Nations sans joueur (NPC): simulation simplifiée des nations non pilotées
// par un humain (diplomatie, expansion, économie basique)" — GDD §5.2
//
// NPC nations make diplomatic decisions based on:
// - Power balance (military strength relative to neighbors)
// - Economic interests (trade route access)
// - Cultural/religious affinity
// - Stability (unstable nations are aggressive or desperate)
// ============================================================================

import type {
	Nation,
	DiplomaticRelation,
	DiplomaticRelationType,
} from '../../../shared/src/types/world'
import type {
	GameState,
	StaticData,
	SimConfig,
	TickLogEntry,
	SeededRNG,
	Treaty,
	Conflict,
} from '../types'

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function getMilitary(state: GameState, nationId: string) {
	return state.nationMilitary.find((m) => m.nationId === nationId)
}

function getReligion(state: GameState, nationId: string) {
	return state.nationReligions.find((r) => r.nationId === nationId)
}

function getEcon(state: GameState, nationId: string) {
	return state.nationEconomies.find((e) => e.nationId === nationId)
}

/** Get all nations that share a border (via tile adjacency, simplified here via diplomacy + geography) */
function getNeighborIds(nation: Nation, state: GameState): string[] {
	// Use existing diplomacy targets + nations with adjacent territories
	const neighbors = new Set<string>()
	for (const rel of nation.diplomacy) {
		neighbors.add(rel.targetNationId)
	}
	return Array.from(neighbors)
}

/** Compute affinity between two nations (0-10, higher = more likely to cooperate) */
function computeAffinity(
	nationA: Nation,
	nationB: Nation,
	state: GameState,
): number {
	let affinity = 5 // baseline

	// Same religion bonus
	const relA = getReligion(state, nationA.id)
	const relB = getReligion(state, nationB.id)
	if (relA?.stateReligionId && relA.stateReligionId === relB?.stateReligionId) {
		affinity += 2
	}

	// Existing alliance bonus
	const existingRel = nationA.diplomacy.find(
		(d) => d.targetNationId === nationB.id,
	)
	if (existingRel) {
		if (
			existingRel.type === 'alliance' ||
			existingRel.type === 'trade_agreement'
		) {
			affinity += existingRel.strength * 0.2
		} else if (existingRel.type === 'rivalry' || existingRel.type === 'war') {
			affinity -= existingRel.strength * 0.3
		}
	}

	// Similar governance
	if (nationA.governance === nationB.governance) affinity += 1

	// Clamp
	return Math.max(0, Math.min(10, affinity))
}

// ----------------------------------------------------------------------------
// Diplomatic actions
// ----------------------------------------------------------------------------

function tryFormAlliance(
	nationA: Nation,
	nationB: Nation,
	affinity: number,
	rng: SeededRNG,
	state: GameState,
): DiplomaticRelation | null {
	// High affinity + no existing negative relation
	const existing = nationA.diplomacy.find(
		(d) => d.targetNationId === nationB.id,
	)
	if (existing && (existing.type === 'war' || existing.type === 'rivalry'))
		return null
	if (existing?.type === 'alliance') return null // already allied

	const prob = (affinity / 10) * 0.05 // up to 5% per tick
	if (rng.chance(prob)) {
		return {
			targetNationId: nationB.id,
			type: 'alliance',
			strength: Math.round(affinity) as any,
		}
	}
	return null
}

function tryFormTradeAgreement(
	nationA: Nation,
	nationB: Nation,
	state: GameState,
	staticData: StaticData,
	rng: SeededRNG,
): DiplomaticRelation | null {
	const existing = nationA.diplomacy.find(
		(d) => d.targetNationId === nationB.id,
	)
	if (existing?.type === 'war') return null
	if (existing?.type === 'trade_agreement') return null

	// Check if they share a trade route
	const sharedRoute = staticData.tradeRoutes.some(
		(r) =>
			r.connectsNations.includes(nationA.id) &&
			r.connectsNations.includes(nationB.id),
	)
	if (!sharedRoute) return null

	const prob = 0.08 // 8% chance if trade route exists
	if (rng.chance(prob)) {
		return {
			targetNationId: nationB.id,
			type: 'trade_agreement',
			strength: 5 as any,
		}
	}
	return null
}

function tryDeclareWar(
	attacker: Nation,
	defender: Nation,
	state: GameState,
	rng: SeededRNG,
): Conflict | null {
	// Already at war?
	if (
		state.activeConflicts.some(
			(c) =>
				!c.resolved &&
				((c.attackerId === attacker.id && c.defenderId === defender.id) ||
					(c.attackerId === defender.id && c.defenderId === attacker.id)),
		)
	)
		return null

	const aMil = getMilitary(state, attacker.id)
	const dMil = getMilitary(state, defender.id)
	if (!aMil || !dMil) return null

	// War conditions: low stability + military superiority + rivalry
	const existing = attacker.diplomacy.find(
		(d) => d.targetNationId === defender.id,
	)
	const isRival = existing?.type === 'rivalry'
	const forceRatio = (aMil.militaryStrength + 1) / (dMil.militaryStrength + 1)

	let warProb = 0
	if (isRival && forceRatio > 1.5 && attacker.stability >= 4) {
		warProb = 0.03 // 3% if rival and much stronger
	} else if (attacker.stability < 3 && forceRatio > 1.2) {
		warProb = 0.02 // Desperate unstable nation
	}

	if (rng.chance(warProb)) {
		return {
			id: `conflict_${attacker.id}_${defender.id}_${state.currentYear}`,
			attackerId: attacker.id,
			defenderId: defender.id,
			startYear: state.currentYear,
			cause: isRival ? 'rivalry' : 'territorial_expansion',
			forceRatio,
			attackerMorale: aMil.morale as any,
			defenderMorale: dMil.morale as any,
			battles: 0,
			resolved: false,
		}
	}
	return null
}

// ----------------------------------------------------------------------------
// Conflict resolution
// ----------------------------------------------------------------------------

function resolveOngoingConflicts(
	state: GameState,
	rng: SeededRNG,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	for (const conflict of state.activeConflicts) {
		if (conflict.resolved) continue

		const duration = state.currentYear - conflict.startYear
		conflict.battles++

		const aMil = getMilitary(state, conflict.attackerId)
		const dMil = getMilitary(state, conflict.defenderId)
		if (!aMil || !dMil) continue

		// Morale attrition
		conflict.attackerMorale = Math.max(
			1,
			conflict.attackerMorale - rng.next() * 0.5,
		)
		conflict.defenderMorale = Math.max(
			1,
			conflict.defenderMorale - rng.next() * 0.5,
		)

		// Battle outcome per tick (abstract)
		const attackPower = conflict.forceRatio * (conflict.attackerMorale / 10)
		const defendPower = 1.0 * (conflict.defenderMorale / 10) * 1.2 // defender advantage

		// Resolution conditions
		const shouldResolve =
			duration >= 3 || // max 3 years war
			conflict.attackerMorale < 2 ||
			conflict.defenderMorale < 2 ||
			rng.chance(0.15) // random peace chance each year

		if (shouldResolve) {
			conflict.resolved = true

			if (attackPower > defendPower * 1.3) {
				conflict.outcome = 'attacker_victory'
				// Winner: prestige + stability boost, Loser: stability drop
				const attacker = state.nations.find((n) => n.id === conflict.attackerId)
				const defender = state.nations.find((n) => n.id === conflict.defenderId)
				if (attacker) {
					attacker.prestige = Math.min(10, attacker.prestige + 1) as any
					attacker.stability = Math.min(10, attacker.stability + 0.5) as any
				}
				if (defender) {
					defender.stability = Math.max(0, defender.stability - 2) as any
					defender.prestige = Math.max(0, defender.prestige - 1) as any
				}

				log.push({
					year: state.currentYear,
					category: 'military',
					nationId: conflict.attackerId,
					message: `${attacker?.name} remporte la guerre contre ${defender?.name}`,
					data: { conflictId: conflict.id, duration },
				})
			} else if (defendPower > attackPower * 1.3) {
				conflict.outcome = 'defender_victory'
				const attacker = state.nations.find((n) => n.id === conflict.attackerId)
				const defender = state.nations.find((n) => n.id === conflict.defenderId)
				if (attacker) {
					attacker.stability = Math.max(0, attacker.stability - 2) as any
				}
				if (defender) {
					defender.prestige = Math.min(10, defender.prestige + 1) as any
				}

				log.push({
					year: state.currentYear,
					category: 'military',
					nationId: conflict.defenderId,
					message: `${defender?.name} repousse l'attaque de ${attacker?.name}`,
					data: { conflictId: conflict.id, duration },
				})
			} else {
				conflict.outcome = 'stalemate'
				// Both lose stability
				const attacker = state.nations.find((n) => n.id === conflict.attackerId)
				const defender = state.nations.find((n) => n.id === conflict.defenderId)
				if (attacker)
					attacker.stability = Math.max(0, attacker.stability - 1) as any
				if (defender)
					defender.stability = Math.max(0, defender.stability - 1) as any

				log.push({
					year: state.currentYear,
					category: 'military',
					message: `Trêve entre ${attacker?.name} et ${defender?.name} après ${duration} ans de conflit`,
					data: { conflictId: conflict.id, duration },
				})
			}

			// Post-war: update diplomacy (rivals become non-aggression or stay rivals)
			const attacker = state.nations.find((n) => n.id === conflict.attackerId)
			const defender = state.nations.find((n) => n.id === conflict.defenderId)
			if (attacker && defender) {
				const aDip = attacker.diplomacy.find(
					(d) => d.targetNationId === defender.id,
				)
				const dDip = defender.diplomacy.find(
					(d) => d.targetNationId === attacker.id,
				)
				if (aDip)
					aDip.type =
						conflict.outcome === 'stalemate' ? 'non_aggression' : 'rivalry'
				if (dDip)
					dDip.type =
						conflict.outcome === 'stalemate' ? 'non_aggression' : 'rivalry'
			}
		}

		// Military losses during active conflict
		if (!conflict.resolved) {
			if (aMil)
				aMil.armySize = Math.round(aMil.armySize * (1 - rng.next() * 0.05))
			if (dMil)
				dMil.armySize = Math.round(dMil.armySize * (1 - rng.next() * 0.03))
		}
	}

	return log
}

// ----------------------------------------------------------------------------
// Main simulation
// ----------------------------------------------------------------------------

/**
 * Simulate one tick of diplomatic activity for NPC nations.
 */
export function simulateDiplomacy(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
	playerNationIds: Set<string>,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	if (!config.npcNationsActive) return log

	// --- Resolve ongoing conflicts first ---
	log.push(...resolveOngoingConflicts(state, rng))

	// --- NPC diplomatic decisions ---
	for (const nation of state.nations) {
		// Skip player-controlled nations (players decide their own diplomacy)
		if (playerNationIds.has(nation.id)) continue

		const neighborIds = getNeighborIds(nation, state)

		for (const neighborId of neighborIds) {
			if (!rng.chance(config.diplomacyChangeProb)) continue

			const neighbor = state.nations.find((n) => n.id === neighborId)
			if (!neighbor) continue

			const affinity = computeAffinity(nation, neighbor, state)

			// Try alliance
			if (affinity > 6) {
				const alliance = tryFormAlliance(nation, neighbor, affinity, rng, state)
				if (alliance) {
					// Add bilateral
					nation.diplomacy.push(alliance)
					neighbor.diplomacy.push({
						targetNationId: nation.id,
						type: 'alliance',
						strength: alliance.strength,
					})

					state.activeTreaties.push({
						id: `treaty_${nation.id}_${neighbor.id}_${state.currentYear}`,
						type: 'alliance',
						nationA: nation.id,
						nationB: neighbor.id,
						startYear: state.currentYear,
						strength: alliance.strength,
					})

					log.push({
						year: state.currentYear,
						category: 'diplomacy',
						nationId: nation.id,
						message: `Alliance formée entre ${nation.name} et ${neighbor.name}`,
						data: { partnerId: neighbor.id },
					})
				}
			}

			// Try trade agreement
			const trade = tryFormTradeAgreement(
				nation,
				neighbor,
				state,
				staticData,
				rng,
			)
			if (trade) {
				nation.diplomacy.push(trade)
				neighbor.diplomacy.push({
					targetNationId: nation.id,
					type: 'trade_agreement',
					strength: trade.strength,
				})

				log.push({
					year: state.currentYear,
					category: 'diplomacy',
					nationId: nation.id,
					message: `Accord commercial entre ${nation.name} et ${neighbor.name}`,
					data: { partnerId: neighbor.id },
				})
			}

			// Try war (low affinity)
			if (affinity < 3) {
				const conflict = tryDeclareWar(nation, neighbor, state, rng)
				if (conflict) {
					state.activeConflicts.push(conflict)

					// Update diplomacy to "war"
					const aDip = nation.diplomacy.find(
						(d) => d.targetNationId === neighbor.id,
					)
					const dDip = neighbor.diplomacy.find(
						(d) => d.targetNationId === nation.id,
					)
					if (aDip) aDip.type = 'war'
					else
						nation.diplomacy.push({
							targetNationId: neighbor.id,
							type: 'war',
							strength: 0 as any,
						})
					if (dDip) dDip.type = 'war'
					else
						neighbor.diplomacy.push({
							targetNationId: nation.id,
							type: 'war',
							strength: 0 as any,
						})

					log.push({
						year: state.currentYear,
						category: 'military',
						nationId: nation.id,
						message: `${nation.name} déclare la guerre à ${neighbor.name}!`,
						data: { conflictId: conflict.id, cause: conflict.cause },
					})
				}
			}
		}

		// --- Stability recovery ---
		// Nations at peace slowly recover stability
		const atWar = state.activeConflicts.some(
			(c) =>
				!c.resolved &&
				(c.attackerId === nation.id || c.defenderId === nation.id),
		)
		if (!atWar && nation.stability < 8) {
			nation.stability = Math.min(10, nation.stability + 0.2) as any
		}
	}

	return log
}
