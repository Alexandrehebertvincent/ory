// ============================================================================
// Social Mobility Simulation — Class transitions (ascension / déchéance)
// ============================================================================
// GDD §3.8: "La classe sociale est le multiplicateur de pression. Plus le
// rang est élevé, plus l'influence est grande — mais l'exposition au
// Grand Maître augmente proportionnellement."
//
// Uses SocialMobilityPath and SocialMobilityModifier from seed data.
// Called once per tick — but most transitions span years, so we track
// active transitions in-progress via markers on the family line.
// ============================================================================

import type {
	EntityId,
	Level,
	SocialClass,
	SocialMobilityPath,
	SocialMobilityModifier,
	FamilyLine,
	FamilyMember,
} from '../../../shared/src/types/world'
import type {
	GameState,
	StaticData,
	SimConfig,
	TickLogEntry,
	PendingDecision,
	DecisionOption,
	SeededRNG,
	UrgencyWeight,
} from '../types'
import { computeLifeStage } from './characterCreation'

// ----------------------------------------------------------------------------
// Active transition tracking (stored in family.socialMobilityProgress)
// We cannot mutate the FamilyLine type so we use a module-level Map
// that persists across ticks within the same simulation run.
// The integration layer must pass this map to each call.
// ----------------------------------------------------------------------------

export interface MobilityTransition {
	pathId: EntityId
	familyId: EntityId
	startYear: number
	targetYear: number
	completed: boolean
}

/** Transition state map — keyed by familyId */
export type MobilityStateMap = Map<string, MobilityTransition>

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------

const WEEKS_PER_YEAR = 52
const DECISION_DEADLINE = 12 // 3 months

/** How often to evaluate mobility opportunities (once per year, in spring) */
const EVALUATION_WEEK = 13 // ~week 13 = spring

// ----------------------------------------------------------------------------
// Main entry
// ----------------------------------------------------------------------------

/**
 * Evaluate social mobility for all player family lines.
 * Called once per tick from worldTick.
 */
export function simulateSocialMobility(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
	mobilityState: MobilityStateMap,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	for (const family of state.familyLines) {
		const head = family.members.find((m) => m.id === family.currentHeadId)
		if (!head || head.deathYear !== null) continue

		// --- Check active transition progress ---
		const active = mobilityState.get(family.id)
		if (active && !active.completed) {
			if (state.currentYear >= active.targetYear) {
				// Transition complete — resolve it
				const resultLog = resolveTransition(
					family,
					head,
					active,
					state,
					staticData,
					rng,
				)
				log.push(...resultLog)
				active.completed = true
			}
			continue // skip new evaluations while in transition
		}

		// --- Annual evaluation: only on EVALUATION_WEEK ---
		if (state.currentWeek !== EVALUATION_WEEK) continue
		if (!family.playerId) continue // NPC families don't get mobility decisions

		// Only adults can initiate transitions
		const age = state.currentYear - head.birthYear
		if (computeLifeStage(age) !== 'adult') continue

		// Find eligible paths
		const paths = getEligiblePaths(family, head, state, staticData)
		if (paths.length === 0) continue

		// Generate a decision for the player
		const currentTick = Math.round(
			state.currentYear * WEEKS_PER_YEAR + state.currentWeek,
		)
		const decision = generateMobilityDecision(
			family,
			head,
			paths,
			state,
			staticData,
			rng,
			currentTick,
		)
		if (decision) {
			state.pendingDecisions.push(decision)
			log.push({
				year: state.currentYear,
				category: 'social_mobility',
				nationId: family.nationId,
				message: `Opportunités de mobilité sociale pour ${head.name} ${family.surname}`,
				data: { familyId: family.id, pathCount: paths.length },
			})
		}
	}

	return log
}

// ----------------------------------------------------------------------------
// Path eligibility
// ----------------------------------------------------------------------------

/**
 * Get all mobility paths for which the family currently meets the prerequisites.
 */
export function getEligiblePaths(
	family: FamilyLine,
	head: FamilyMember,
	state: GameState,
	staticData: StaticData,
): SocialMobilityPath[] {
	const nationMod = staticData.socialMobilityModifiers.find(
		(m) => m.nationId === family.nationId,
	)

	const nationTech = state.nationTechnologies.find(
		(nt) => nt.nationId === family.nationId,
	)
	const unlockedTechs = nationTech?.unlockedTechs ?? []

	return staticData.socialMobilityPaths.filter((path) => {
		// Must originate from current class
		if (path.fromClass !== family.socialClass) return false

		// Year range check
		if (state.currentYear < path.minYear) return false
		if (path.maxYear !== null && state.currentYear > path.maxYear) return false

		// Wealth and reputation minimum
		if (family.wealth < path.minWealth) return false
		if (family.reputation < path.minReputation) return false

		// Required technologies
		if (!path.requiredTechs.every((t) => unlockedTechs.includes(t)))
			return false

		// National modifier: blocked mechanisms
		if (nationMod?.blockedMechanisms.includes(path.mechanism)) return false

		// Clergy path: check if nation allows it for all classes
		if (
			path.toClass === 'clergy' &&
			nationMod &&
			!nationMod.clergyOpenToAll &&
			family.socialClass !== 'free_peasants'
		) {
			return false
		}

		return true
	})
}

// ----------------------------------------------------------------------------
// Transition resolution
// ----------------------------------------------------------------------------

function resolveTransition(
	family: FamilyLine,
	head: FamilyMember,
	transition: MobilityTransition,
	state: GameState,
	staticData: StaticData,
	rng: SeededRNG,
): TickLogEntry[] {
	const log: TickLogEntry[] = []
	const path = staticData.socialMobilityPaths.find(
		(p) => p.id === transition.pathId,
	)
	if (!path) return log

	// Calculate success probability
	let successRate = path.baseSuccessRate

	// National modifiers
	const nationMod = staticData.socialMobilityModifiers.find(
		(m) => m.nationId === family.nationId,
	)
	if (nationMod) {
		if (path.direction === 'up') {
			successRate *= 1 + (nationMod.upwardOpenness - 5) * 0.05
		} else {
			successRate *= 1 + (nationMod.downwardRisk - 5) * 0.05
		}
		if (nationMod.encouragedMechanisms.includes(path.mechanism)) {
			successRate *= 1.3
		}
	}

	// Clamp
	successRate = Math.max(0.05, Math.min(0.95, successRate))

	if (rng.chance(successRate)) {
		// SUCCESS
		const oldClass = family.socialClass
		family.socialClass = path.toClass

		// Update head and all living members' social class
		for (const member of family.members) {
			if (member.deathYear === null) {
				member.socialClass = path.toClass
			}
		}

		// Apply reputation/wealth changes
		family.reputation = Math.max(
			0,
			Math.min(10, family.reputation + path.reputationChangeOnSuccess),
		) as Level
		family.wealth = Math.max(
			0,
			Math.min(10, family.wealth - Math.ceil(path.wealthCost / 20)),
		) as Level

		log.push({
			year: state.currentYear,
			category: 'social_mobility',
			nationId: family.nationId,
			message: `${head.name} ${family.surname} a réussi la transition: ${path.name} (${oldClass} → ${path.toClass})`,
			data: {
				familyId: family.id,
				pathId: path.id,
				oldClass,
				newClass: path.toClass,
				success: true,
			},
		})
	} else {
		// FAILURE
		family.reputation = Math.max(
			0,
			Math.min(10, family.reputation + path.reputationChangeOnFailure),
		) as Level

		// Partial wealth cost on failure
		family.wealth = Math.max(
			0,
			Math.min(10, family.wealth - Math.ceil(path.wealthCost / 40)),
		) as Level

		log.push({
			year: state.currentYear,
			category: 'social_mobility',
			nationId: family.nationId,
			message: `${head.name} ${family.surname} a échoué: ${path.name}. La famille conserve son statut de ${family.socialClass}.`,
			data: {
				familyId: family.id,
				pathId: path.id,
				success: false,
			},
		})
	}

	return log
}

// ----------------------------------------------------------------------------
// Decision generation
// ----------------------------------------------------------------------------

function generateMobilityDecision(
	family: FamilyLine,
	head: FamilyMember,
	eligiblePaths: SocialMobilityPath[],
	state: GameState,
	staticData: StaticData,
	rng: SeededRNG,
	currentTick: number,
): PendingDecision | null {
	if (!family.playerId) return null

	// Pick up to 3 paths (prefer upward mobility, most interesting)
	const sorted = [...eligiblePaths].sort((a, b) => {
		if (a.direction !== b.direction) return a.direction === 'up' ? -1 : 1
		return b.baseSuccessRate - a.baseSuccessRate
	})
	const selected = sorted.slice(0, 3)

	const options: DecisionOption[] = selected.map((path) => ({
		id: `opt_mob_${path.id}_${currentTick}`,
		type: (path.direction === 'up'
			? 'optimal'
			: 'historical') as DecisionOption['type'],
		label: `${path.name} (${path.fromClass} → ${path.toClass})`,
		description: `${path.description} Durée: ${path.durationYears} an(s). Coût: ${path.wealthCost} richesse.`,
		predictedEffects: [
			`Succès: ${Math.round(path.baseSuccessRate * 100)}% de chance`,
			`Réputation ${path.reputationChangeOnSuccess >= 0 ? '+' : ''}${path.reputationChangeOnSuccess} si réussite`,
		],
		risks: [
			`Échec: réputation ${path.reputationChangeOnFailure >= 0 ? '+' : ''}${path.reputationChangeOnFailure}`,
			...(path.durationYears > 5
				? ['Transition longue — engagement sur plusieurs années']
				: []),
		],
		historicalReference: path.notes || undefined,
		confidence: path.baseSuccessRate,
	}))

	// Always add "stay" option
	options.push({
		id: `opt_mob_stay_${currentTick}`,
		type: 'free',
		label: `Rester ${family.socialClass}`,
		description:
			'Maintenir la position actuelle de la famille. Pas de risque, pas de changement.',
		predictedEffects: ['Stabilité'],
		risks: [],
		confidence: 1.0,
	})

	return {
		id: `dec_mobility_${family.id}_${currentTick}`,
		playerId: family.playerId,
		nationId: family.nationId,
		familyLineId: family.id,
		source: 'social_mobility' as any,
		narrativeContext: `La famille ${family.surname} (${family.socialClass}) a des opportunités d'ascension sociale.`,
		options,
		urgency: 3 as UrgencyWeight,
		createdAtTick: currentTick,
		deadlineTick: currentTick + DECISION_DEADLINE,
		defaultOptionId: options[options.length - 1].id, // default: stay
		resolved: false,
	}
}

// ----------------------------------------------------------------------------
// Action resolution: called when a player decision is resolved
// ----------------------------------------------------------------------------

/**
 * Start a mobility transition based on a player's resolved decision.
 * Called from the action resolver when a mobility decision is processed.
 */
export function startMobilityTransition(
	family: FamilyLine,
	pathId: EntityId,
	state: GameState,
	staticData: StaticData,
	mobilityState: MobilityStateMap,
): boolean {
	const path = staticData.socialMobilityPaths.find((p) => p.id === pathId)
	if (!path) return false

	mobilityState.set(family.id, {
		pathId: path.id,
		familyId: family.id,
		startYear: state.currentYear,
		targetYear: state.currentYear + path.durationYears,
		completed: false,
	})

	return true
}
