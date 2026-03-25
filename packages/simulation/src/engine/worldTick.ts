// ============================================================================
// World Tick Engine — Main Simulation Loop
// ============================================================================
// "Moteur de simulation du monde (tour par tour interne, temps continu
// pour le joueur)." — GDD Phase 2
//
// One tick = one week (configurable). Orchestrates all sub-simulations
// in the correct order to maintain coherence.
// ============================================================================

import type {
	GameState,
	StaticData,
	SimConfig,
	TickResult,
	TickLogEntry,
	SeededRNG,
} from '../types'
import { WEEKS_PER_YEAR, weekToSeason } from '../types'
import { simulatePopulation, simulateDiseasePropagation } from './populationSim'
import { simulateEconomy } from './economySim'
import { simulateTechDiffusion } from './techDiffusion'
import { simulateDiplomacy } from './diplomacySim'
import { simulateDisasters } from './disasterSim'
import {
	simulateHistoricalEvents,
	simulateLocalEvents,
	simulateRumors,
} from './eventEngine'
import { evaluateWorldState } from '../decision/grandMaster'
import {
	generateDecisions,
	resolveExpiredDecisions,
} from '../decision/decisionEngine'
import { resolveActions } from '../decision/actionResolver'
import { simulateLifeCycle } from '../player/lifeCycleSim'
import {
	simulateSocialMobility,
	type MobilityStateMap,
} from '../player/socialMobilitySim'
import { applyPressure } from '../player/pressureSystem'

/** Module-level mobility transition state (persists across ticks within a run) */
const _mobilityState: MobilityStateMap = new Map()

/**
 * Execute one simulation tick (one game week by default).
 *
 * Order of operations (matters for coherence):
 * 1. Natural disasters (affect population, economy before they're computed)
 * 2. Disease propagation (spreads between nations via trade routes)
 * 3. Population simulation (births, deaths, wars, famine)
 * 4. Economic simulation (production, trade, prices)
 * 5. Technology diffusion (spread via trade, alliances, research)
 * 6. Diplomacy simulation (NPC nations make decisions)
 * 7. Historical events (evaluate trigger conditions)
 * 8. Local events (procedurally generated from templates)
 * 9. Rumor propagation (information spreads through the world)
 * 10. Life cycle simulation (aging, marriage, children, death, succession)
 * 11. Social mobility (class transition evaluation and progress)
 * 12. Pressure system (rank-proportional costs, urgency scaling)
 * 13. Grand Master evaluation (detect frictions, opportunities, alerts)
 * 14. Decision engine (generate choices for players, resolve expired)
 * 15. Action resolver (execute confirmed actions, process effect chains)
 * 16. Advance time (week → season → year)
 *
 * @param state - Current mutable world state
 * @param staticData - Read-only reference data
 * @param config - Simulation parameters
 * @param rng - Seeded random number generator
 * @param playerNationIds - IDs of player-controlled nations (skip NPC AI for these)
 */
export function worldTick(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
	playerNationIds: Set<string> = new Set(),
): TickResult {
	const t0 = performance.now()
	const log: TickLogEntry[] = []

	// Reset tick log
	state.tickLog = []

	// --- 1. Natural disasters ---
	const disasterLog = simulateDisasters(state, staticData, config, rng)
	log.push(...disasterLog)
	state.tickLog.push(...disasterLog)

	// --- 2. Disease propagation ---
	const diseaseLog = simulateDiseasePropagation(state, staticData, rng)
	log.push(...diseaseLog)
	state.tickLog.push(...diseaseLog)

	// --- 3. Population ---
	const popLog = simulatePopulation(state, staticData, config, rng)
	log.push(...popLog)
	state.tickLog.push(...popLog)

	// --- 4. Economy ---
	const econLog = simulateEconomy(state, staticData, config, rng)
	log.push(...econLog)
	state.tickLog.push(...econLog)

	// --- 5. Technology diffusion ---
	const techLog = simulateTechDiffusion(state, staticData, config, rng)
	log.push(...techLog)
	state.tickLog.push(...techLog)

	// --- 6. Diplomacy (NPC nations) ---
	const diploLog = simulateDiplomacy(
		state,
		staticData,
		config,
		rng,
		playerNationIds,
	)
	log.push(...diploLog)
	state.tickLog.push(...diploLog)

	// --- 7. Historical events ---
	const histLog = simulateHistoricalEvents(state, staticData, config, rng)
	log.push(...histLog)
	state.tickLog.push(...histLog)

	// --- 8. Local events ---
	const localLog = simulateLocalEvents(state, staticData, config, rng)
	log.push(...localLog)
	state.tickLog.push(...localLog)

	// --- 9. Rumors ---
	const rumorLog = simulateRumors(state, staticData, rng)
	log.push(...rumorLog)

	// --- 10. Life cycle (aging, marriage, children, death, succession) ---
	const lifeCycleLog = simulateLifeCycle(state, staticData, config, rng)
	log.push(...lifeCycleLog)
	state.tickLog.push(...lifeCycleLog)

	// --- 11. Social mobility (class transitions) ---
	const mobilityLog = simulateSocialMobility(
		state,
		staticData,
		config,
		rng,
		_mobilityState,
	)
	log.push(...mobilityLog)
	state.tickLog.push(...mobilityLog)

	// --- 12. Pressure system (rank-proportional costs & urgency) ---
	const pressureLog = applyPressure(state, staticData, config, rng)
	log.push(...pressureLog)
	state.tickLog.push(...pressureLog)

	// --- 13. Grand Master evaluation ---
	const currentTick = Math.round(state.currentYear * 52 + state.currentWeek)
	const { alerts: gmAlerts, log: gmLog } = evaluateWorldState(
		state,
		staticData,
		config,
		rng,
		[...playerNationIds],
	)
	state.grandMasterAlerts.push(...gmAlerts)
	log.push(...gmLog)
	state.tickLog.push(...gmLog)

	// --- 14. Decision engine ---
	const { decisions, log: decisionLog } = generateDecisions(
		state,
		staticData,
		config,
		rng,
		currentTick,
	)
	state.pendingDecisions.push(...decisions)
	log.push(...decisionLog)
	state.tickLog.push(...decisionLog)

	// Auto-resolve expired decisions
	const { resolvedActions, log: expiredLog } = resolveExpiredDecisions(
		state,
		currentTick,
	)
	state.playerActions.push(...resolvedActions)
	log.push(...expiredLog)
	state.tickLog.push(...expiredLog)

	// --- 15. Action resolver ---
	const actionLog = resolveActions(state, staticData, config, rng, currentTick)
	log.push(...actionLog)
	state.tickLog.push(...actionLog)

	// --- 16. Advance time ---
	const oldWeek = state.currentWeek
	state.currentWeek += 1
	if (state.currentWeek > WEEKS_PER_YEAR) {
		state.currentWeek = 1
		state.currentYear = Math.floor(state.currentYear) + 1
	}
	state.currentSeason = weekToSeason(state.currentWeek)

	const durationMs = performance.now() - t0

	return {
		state,
		log,
		durationMs,
	}
}

/**
 * Run multiple ticks at once (fast-forward).
 * Used for NPC-only simulation, world initialization, or catch-up.
 */
export function runTicks(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
	tickCount: number,
	playerNationIds?: Set<string>,
	onTick?: (year: number, log: TickLogEntry[]) => void,
): TickResult {
	const allLogs: TickLogEntry[] = []
	const t0 = performance.now()

	for (let i = 0; i < tickCount; i++) {
		const result = worldTick(state, staticData, config, rng, playerNationIds)
		allLogs.push(...result.log)
		if (onTick) {
			onTick(state.currentYear, result.log)
		}
	}

	return {
		state,
		log: allLogs,
		durationMs: performance.now() - t0,
	}
}
