// ============================================================================
// Pressure System — Rank-proportional balancing
// ============================================================================
// GDD §3.8: "Le pouvoir attire les problèmes, la discrétion donne la liberté."
//
// Six concrete mechanics:
// 1. Visibility = risk → higher class = more GM-imposed events
// 2. Critical decision frequency → urgency bonus by class
// 3. Net wealth (not gross) → fixed costs per class
// 4. Distinct event trees → events filtered by requiredSocialClass
// 5. Adapted advisor → already handled by advisor profiles
// 6. Social mobility as progression → handled by socialMobilitySim
//
// This module provides:
// - Pressure calculation per family (used by Grand Master to scale events)
// - Fixed costs applied per tick (maintenance)
// - Visibility score (used by rumor system to target higher-rank players)
// ============================================================================

import type {
	Level,
	SocialClass,
	FamilyLine,
	FamilyMember,
} from '../../../shared/src/types/world'
import type {
	GameState,
	StaticData,
	SimConfig,
	TickLogEntry,
	SeededRNG,
	UrgencyWeight,
} from '../types'

// ----------------------------------------------------------------------------
// Pressure profile per social class
// ----------------------------------------------------------------------------

export interface ClassPressureProfile {
	/** 0-10: how visible the family is (= risk of being targeted by events/enemies) */
	visibility: number
	/** Urgency multiplier: higher = more critical decisions per tick */
	urgencyMultiplier: number
	/** Annual fixed cost as fraction of wealth (0-1). Applied weekly. */
	annualMaintenanceCost: number
	/** Maximum number of GM alerts per tick (soft cap) */
	maxGMAlertPerTick: number
	/** Base number of imposed events per year */
	imposedEventsPerYear: number
}

export const CLASS_PRESSURE_PROFILES: Record<string, ClassPressureProfile> = {
	royalty: {
		visibility: 10,
		urgencyMultiplier: 2.0,
		annualMaintenanceCost: 0.3,
		maxGMAlertPerTick: 3,
		imposedEventsPerYear: 12,
	},
	nobility: {
		visibility: 8,
		urgencyMultiplier: 1.6,
		annualMaintenanceCost: 0.2,
		maxGMAlertPerTick: 2,
		imposedEventsPerYear: 8,
	},
	clergy: {
		visibility: 6,
		urgencyMultiplier: 1.2,
		annualMaintenanceCost: 0.1,
		maxGMAlertPerTick: 2,
		imposedEventsPerYear: 6,
	},
	warriors: {
		visibility: 6,
		urgencyMultiplier: 1.4,
		annualMaintenanceCost: 0.15,
		maxGMAlertPerTick: 2,
		imposedEventsPerYear: 6,
	},
	merchants: {
		visibility: 5,
		urgencyMultiplier: 1.1,
		annualMaintenanceCost: 0.08,
		maxGMAlertPerTick: 2,
		imposedEventsPerYear: 5,
	},
	artisans: {
		visibility: 3,
		urgencyMultiplier: 0.9,
		annualMaintenanceCost: 0.05,
		maxGMAlertPerTick: 1,
		imposedEventsPerYear: 3,
	},
	free_peasants: {
		visibility: 2,
		urgencyMultiplier: 0.7,
		annualMaintenanceCost: 0.03,
		maxGMAlertPerTick: 1,
		imposedEventsPerYear: 2,
	},
	nomads: {
		visibility: 2,
		urgencyMultiplier: 0.8,
		annualMaintenanceCost: 0.02,
		maxGMAlertPerTick: 1,
		imposedEventsPerYear: 2,
	},
	serfs: {
		visibility: 1,
		urgencyMultiplier: 0.5,
		annualMaintenanceCost: 0.01,
		maxGMAlertPerTick: 1,
		imposedEventsPerYear: 1,
	},
	slaves: {
		visibility: 0,
		urgencyMultiplier: 0.3,
		annualMaintenanceCost: 0.0,
		maxGMAlertPerTick: 0,
		imposedEventsPerYear: 0,
	},
}

const DEFAULT_PROFILE: ClassPressureProfile = {
	visibility: 3,
	urgencyMultiplier: 1.0,
	annualMaintenanceCost: 0.05,
	maxGMAlertPerTick: 1,
	imposedEventsPerYear: 3,
}

const WEEKS_PER_YEAR = 52

// ----------------------------------------------------------------------------
// Main entry: apply pressure for all family lines
// ----------------------------------------------------------------------------

/**
 * Apply rank-proportional pressure to all player family lines.
 * Called once per tick from worldTick.
 *
 * Effects:
 * - Wealth maintenance costs (weekly deduction)
 * - Urgency scaling on pending decisions
 * - Logging of significant pressure events
 */
export function applyPressure(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	for (const family of state.familyLines) {
		if (!family.playerId) continue

		const head = family.members.find((m) => m.id === family.currentHeadId)
		if (!head || head.deathYear !== null) continue

		const profile = getProfile(family.socialClass)

		// --- Apply maintenance costs (weekly fraction of annual cost) ---
		const weeklyMaintenanceCost = profile.annualMaintenanceCost / WEEKS_PER_YEAR
		if (weeklyMaintenanceCost > 0 && family.wealth > 0) {
			// Apply as probability of losing 1 wealth point per tick
			const lossProb = weeklyMaintenanceCost * family.wealth
			if (rng.chance(lossProb)) {
				family.wealth = Math.max(0, family.wealth - 1) as Level
				log.push({
					year: state.currentYear,
					category: 'life_cycle',
					nationId: family.nationId,
					message: `Les obligations de rang coûtent à la famille ${family.surname} (richesse -1)`,
					data: {
						familyId: family.id,
						socialClass: family.socialClass,
						newWealth: family.wealth,
					},
				})
			}
		}

		// --- Scale urgency of pending decisions for this family ---
		for (const decision of state.pendingDecisions) {
			if (decision.familyLineId === family.id && !decision.resolved) {
				// Apply urgency multiplier (only increase, never decrease)
				const scaledUrgency = Math.min(
					10,
					Math.ceil(decision.urgency * profile.urgencyMultiplier),
				) as UrgencyWeight
				if (scaledUrgency > decision.urgency) {
					decision.urgency = scaledUrgency
				}
			}
		}

		// --- Cap GM alerts per tick ---
		const familyAlerts = state.grandMasterAlerts.filter(
			(a) => a.affectedPlayerIds.includes(family.playerId!) && !a.processed,
		)
		if (familyAlerts.length > profile.maxGMAlertPerTick) {
			// Mark excess alerts as auto-processed to avoid overload
			const excess = familyAlerts.slice(profile.maxGMAlertPerTick)
			for (const alert of excess) {
				alert.processed = true
			}
		}
	}

	return log
}

// ----------------------------------------------------------------------------
// Public API for other systems
// ----------------------------------------------------------------------------

/**
 * Get the pressure profile for a given social class.
 */
export function getProfile(socialClass: SocialClass): ClassPressureProfile {
	return CLASS_PRESSURE_PROFILES[socialClass] ?? DEFAULT_PROFILE
}

/**
 * Get the visibility score for a family (used by rumor system
 * and Grand Master to decide who gets targeted).
 */
export function getVisibility(family: FamilyLine): number {
	const profile = getProfile(family.socialClass)
	// Base visibility from class, modified by reputation
	return Math.min(10, profile.visibility + Math.floor(family.reputation / 3))
}

/**
 * Compute urgency weight for a decision targeting a specific family.
 */
export function scaleUrgency(
	baseUrgency: UrgencyWeight,
	socialClass: SocialClass,
): UrgencyWeight {
	const profile = getProfile(socialClass)
	return Math.min(
		10,
		Math.ceil(baseUrgency * profile.urgencyMultiplier),
	) as UrgencyWeight
}

/**
 * Check whether a family should receive an imposed event this tick.
 * Returns true with probability proportional to class rank.
 */
export function shouldReceiveImposedEvent(
	family: FamilyLine,
	rng: SeededRNG,
): boolean {
	const profile = getProfile(family.socialClass)
	const weeklyProb = profile.imposedEventsPerYear / WEEKS_PER_YEAR
	return rng.chance(weeklyProb)
}
