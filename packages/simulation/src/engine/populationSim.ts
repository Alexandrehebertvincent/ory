// ============================================================================
// Population & Demographic Simulation
// ============================================================================
// Simulates population growth, mortality, migration, and disease impact.
// Each tick = 1 year (configurable). Formulas use realistic demographic rates.
// ============================================================================

import type {
	Population,
	NationHealth,
	Disease,
	ClimateRegion,
	Settlement,
} from '../../../shared/src/types/world'
import type {
	GameState,
	StaticData,
	SimConfig,
	TickLogEntry,
	SeededRNG,
} from '../types'

/** Helpers — lookup by nationId */
function findPop(state: GameState, nationId: string): Population | undefined {
	return state.populations.find((p) => p.nationId === nationId)
}

function findHealth(
	state: GameState,
	nationId: string,
): NationHealth | undefined {
	return state.nationHealth.find((h) => h.nationId === nationId)
}

/**
 * Simulate one tick of population change for all nations.
 *
 * Factors:
 * - Base birth/death rates (from Population data)
 * - Famine risk (from NationHealth.faminRisk)
 * - Active diseases (prevalence × mortality)
 * - War losses (from active conflicts)
 * - Sanitation & medical knowledge (reduce death rate)
 */
export function simulatePopulation(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	for (const nation of state.nations) {
		const pop = findPop(state, nation.id)
		if (!pop) continue

		const health = findHealth(state, nation.id)
		const dt = config.tickDurationYears

		// --- Base demographic rates ---
		let effectiveBirthRate = pop.birthRate
		let effectiveDeathRate = pop.deathRate

		// --- Sanitation & medicine reduce death rate ---
		if (health) {
			// medicalKnowledge (0-10) → up to 15% death rate reduction
			const medReduction = (health.medicalKnowledge / 10) * 0.15
			// sanitation (0-10) → up to 10% death rate reduction
			const sanReduction = (health.sanitation / 10) * 0.1
			effectiveDeathRate *= 1 - medReduction - sanReduction
		}

		// --- Famine impact ---
		if (health && health.faminRisk > 3) {
			// Famine increases death rate and decreases birth rate
			const famineImpact = (health.faminRisk - 3) / 7 // 0 to 1
			effectiveDeathRate *= 1 + famineImpact * 0.5 // up to +50% deaths
			effectiveBirthRate *= 1 - famineImpact * 0.3 // up to -30% births
		}

		// --- Disease impact ---
		if (health) {
			for (const active of health.activeDiseases) {
				const disease = staticData.diseases.find(
					(d) => d.id === active.diseaseId,
				)
				if (!disease) continue
				// Extra deaths = prevalence × mortality × population
				const diseaseDeaths = active.prevalence * disease.mortality
				effectiveDeathRate += diseaseDeaths

				// Chance to worsen or improve epidemic
				if (rng.chance(0.3)) {
					// Disease evolution: may grow or shrink
					const change = rng.next() * 0.04 - 0.02 // ±2%
					active.prevalence = Math.max(
						0,
						Math.min(0.5, active.prevalence + change),
					)
				}
			}
		}

		// --- War losses (from active conflicts) ---
		const nationConflicts = state.activeConflicts.filter(
			(c) =>
				!c.resolved &&
				(c.attackerId === nation.id || c.defenderId === nation.id),
		)
		if (nationConflicts.length > 0) {
			// Each war adds 0.5-2% additional deaths to military-age population
			const warDeathRate = nationConflicts.length * (0.005 + rng.next() * 0.015)
			effectiveDeathRate += warDeathRate
			// War also reduces birth rate
			effectiveBirthRate *= 0.9
		}

		// --- Apply multiplier ---
		const growthRate =
			(effectiveBirthRate - effectiveDeathRate) *
			config.populationGrowthMultiplier

		// --- Compute new population ---
		const oldTotal = pop.total
		const deltaPopulation = Math.round(oldTotal * growthRate * dt)
		pop.total = Math.max(1000, oldTotal + deltaPopulation) // floor at 1000
		pop.growthRate = growthRate
		pop.birthRate = effectiveBirthRate
		pop.deathRate = effectiveDeathRate

		// --- Update infant mortality based on health ---
		if (health) {
			pop.infantMortality = Math.max(
				0.05,
				0.35 - (health.medicalKnowledge / 10) * 0.2,
			)
			pop.lifeExpectancy =
				30 +
				(health.overallHealth / 10) * 25 +
				(health.medicalKnowledge / 10) * 10
		}

		// --- Update settlement populations proportionally ---
		if (oldTotal > 0) {
			const ratio = pop.total / oldTotal
			for (const settlement of state.settlements) {
				if (settlement.nationId === nation.id) {
					settlement.population = Math.round(settlement.population * ratio)
				}
			}
		}

		// --- Log significant changes ---
		if (Math.abs(deltaPopulation) > oldTotal * 0.02) {
			log.push({
				year: state.currentYear,
				category: 'population',
				nationId: nation.id,
				message:
					deltaPopulation > 0
						? `Population de ${nation.name}: +${deltaPopulation} (${pop.total} total)`
						: `Population de ${nation.name}: ${deltaPopulation} (${pop.total} total)`,
				data: { oldTotal, newTotal: pop.total, growthRate },
			})
		}
	}

	return log
}

/**
 * Simulate disease propagation between neighboring nations.
 *
 * Uses trade routes as vectors: diseases spread through connected nations.
 */
export function simulateDiseasePropagation(
	state: GameState,
	staticData: StaticData,
	rng: SeededRNG,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	for (const route of staticData.tradeRoutes) {
		// For each active disease in any nation on this route, chance to spread
		for (const nationId of route.connectsNations) {
			const health = findHealth(state, nationId)
			if (!health) continue

			for (const active of health.activeDiseases) {
				if (active.prevalence < 0.01) continue // too small to spread

				const disease = staticData.diseases.find(
					(d) => d.id === active.diseaseId,
				)
				if (!disease) continue

				// Spread to connected nations
				for (const targetNationId of route.connectsNations) {
					if (targetNationId === nationId) continue
					const targetHealth = findHealth(state, targetNationId)
					if (!targetHealth) continue

					// Already has this disease?
					const existing = targetHealth.activeDiseases.find(
						(d) => d.diseaseId === disease.id,
					)
					if (existing && existing.prevalence > 0.01) continue

					// Spread probability: based on route importance & disease prevalence
					const spreadProb = (route.importance / 10) * active.prevalence * 0.3
					if (rng.chance(spreadProb)) {
						if (existing) {
							existing.prevalence = Math.max(existing.prevalence, 0.01)
						} else {
							targetHealth.activeDiseases.push({
								diseaseId: disease.id,
								prevalence: 0.01 + rng.next() * 0.02,
							})
						}

						const targetNation = state.nations.find(
							(n) => n.id === targetNationId,
						)
						log.push({
							year: state.currentYear,
							category: 'disease',
							nationId: targetNationId,
							message: `${disease.name} se propage vers ${targetNation?.name ?? targetNationId} via ${route.name}`,
							data: { diseaseId: disease.id, routeId: route.id },
						})
					}
				}
			}
		}
	}

	return log
}
