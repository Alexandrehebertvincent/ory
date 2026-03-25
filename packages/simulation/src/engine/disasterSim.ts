// ============================================================================
// Natural Disasters & Climate Simulation
// ============================================================================
// "Événements naturels: séismes, éruptions, sécheresses, inondations,
// épidémies — hors contrôle des joueurs." — GDD §5.2
//
// Uses ClimateRegion.disasterRisks probabilities to generate events.
// ============================================================================

import type {
	ClimateRegion,
	NaturalDisasterType,
} from '../../../shared/src/types/world'
import type {
	GameState,
	StaticData,
	SimConfig,
	TickLogEntry,
	SeededRNG,
} from '../types'

/**
 * Maps disaster types to their effects on nations.
 */
const DISASTER_EFFECTS: Record<
	string,
	{
		stabilityImpact: number
		populationImpact: number // ratio: -0.01 = -1%
		economicImpact: number // ratio: -0.1 = -10% GDP
		healthImpact: number // faminRisk increase
	}
> = {
	earthquake: {
		stabilityImpact: -1,
		populationImpact: -0.01,
		economicImpact: -0.05,
		healthImpact: 1,
	},
	volcanic_eruption: {
		stabilityImpact: -2,
		populationImpact: -0.02,
		economicImpact: -0.1,
		healthImpact: 2,
	},
	flood: {
		stabilityImpact: -1,
		populationImpact: -0.005,
		economicImpact: -0.08,
		healthImpact: 1,
	},
	drought: {
		stabilityImpact: -1,
		populationImpact: -0.005,
		economicImpact: -0.06,
		healthImpact: 3,
	},
	tsunami: {
		stabilityImpact: -2,
		populationImpact: -0.03,
		economicImpact: -0.12,
		healthImpact: 2,
	},
	hurricane: {
		stabilityImpact: -1,
		populationImpact: -0.01,
		economicImpact: -0.07,
		healthImpact: 1,
	},
	famine: {
		stabilityImpact: -2,
		populationImpact: -0.04,
		economicImpact: -0.15,
		healthImpact: 4,
	},
	wildfire: {
		stabilityImpact: -0.5,
		populationImpact: -0.002,
		economicImpact: -0.03,
		healthImpact: 0,
	},
	plague: {
		stabilityImpact: -3,
		populationImpact: -0.08,
		economicImpact: -0.2,
		healthImpact: 5,
	},
}

/**
 * Determine which nations are affected by a disaster in a given climate region.
 * A nation is affected if it has tiles in that climate region.
 */
function getNationsInRegion(
	region: ClimateRegion,
	state: GameState,
	staticData: StaticData,
): string[] {
	// Simple approach: find nations whose settlements are in this climate zone
	// Full approach would use tile-level climate mapping
	const nationIds = new Set<string>()
	for (const nation of state.nations) {
		// Check if any settlement of this nation falls within the region's polygon bounds
		for (const settlement of state.settlements) {
			if (settlement.nationId !== nation.id) continue
			// Simplified: check if settlement is within the region polygon's bounding box
			if (isPointInPolygonBBox(settlement.coord, region.area)) {
				nationIds.add(nation.id)
				break
			}
		}
	}
	return Array.from(nationIds)
}

function isPointInPolygonBBox(
	point: { lat: number; lng: number },
	polygon: Array<{ lat: number; lng: number }>,
): boolean {
	if (polygon.length < 3) return false
	let minLat = Infinity,
		maxLat = -Infinity
	let minLng = Infinity,
		maxLng = -Infinity
	for (const p of polygon) {
		if (p.lat < minLat) minLat = p.lat
		if (p.lat > maxLat) maxLat = p.lat
		if (p.lng < minLng) minLng = p.lng
		if (p.lng > maxLng) maxLng = p.lng
	}
	return (
		point.lat >= minLat &&
		point.lat <= maxLat &&
		point.lng >= minLng &&
		point.lng <= maxLng
	)
}

/**
 * Simulate natural disasters for one tick.
 */
export function simulateDisasters(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	for (const region of staticData.climateRegions) {
		for (const risk of region.disasterRisks) {
			// Annual probability, scaled by config
			const prob = (risk.probability * config.disasterBaseProb) / 0.05 // normalize around default
			if (!rng.chance(prob * config.tickDurationYears)) continue

			// Disaster happens!
			const effects =
				DISASTER_EFFECTS[risk.type] ?? DISASTER_EFFECTS['earthquake']
			const severity = risk.severity
			const severityMultiplier = severity / 5 // normalize around severity 5

			const affectedNationIds = getNationsInRegion(region, state, staticData)
			if (affectedNationIds.length === 0) continue

			for (const nationId of affectedNationIds) {
				const nation = state.nations.find((n) => n.id === nationId)
				if (!nation) continue

				// Apply stability impact
				nation.stability = Math.max(
					0,
					nation.stability + effects.stabilityImpact * severityMultiplier,
				) as any

				// Apply population impact
				const pop = state.populations.find((p) => p.nationId === nationId)
				if (pop) {
					const popLoss = Math.round(
						pop.total * effects.populationImpact * severityMultiplier,
					)
					pop.total = Math.max(1000, pop.total + popLoss) // population loss is negative
				}

				// Apply economic impact
				const econ = state.nationEconomies.find((e) => e.nationId === nationId)
				if (econ) {
					econ.gdpEstimate = Math.round(
						econ.gdpEstimate *
							(1 + effects.economicImpact * severityMultiplier),
					)
				}

				// Apply health impact
				const health = state.nationHealth.find((h) => h.nationId === nationId)
				if (health) {
					health.faminRisk = Math.min(
						10,
						health.faminRisk + effects.healthImpact * severityMultiplier,
					) as any
					health.overallHealth = Math.max(
						0,
						health.overallHealth - severity * 0.3,
					) as any
				}

				// Infrastructure damage
				const nationInfra = state.infrastructure.filter(
					(i) => i.nationId === nationId,
				)
				for (const infra of nationInfra) {
					if (rng.chance(0.2 * severityMultiplier)) {
						infra.condition = Math.max(
							0,
							infra.condition - rng.intBetween(1, 3),
						) as any
					}
				}
			}

			const names = affectedNationIds
				.map((id) => state.nations.find((n) => n.id === id)?.name ?? id)
				.join(', ')

			log.push({
				year: state.currentYear,
				category: 'disaster',
				message: `${formatDisasterName(risk.type)} (sévérité ${severity}) frappe: ${names}`,
				data: {
					disasterType: risk.type,
					severity,
					regionId: region.id,
					affectedNationIds,
				},
			})
		}
	}

	// --- Famine recovery for nations not in crisis ---
	for (const health of state.nationHealth) {
		if (health.faminRisk > 0) {
			health.faminRisk = Math.max(0, health.faminRisk - 0.3) as any
		}
		// Health slowly recovers
		if (health.overallHealth < 7) {
			health.overallHealth = Math.min(
				10,
				health.overallHealth + 0.1 + health.medicalKnowledge * 0.02,
			) as any
		}
	}

	return log
}

function formatDisasterName(type: string): string {
	const names: Record<string, string> = {
		earthquake: 'Tremblement de terre',
		volcanic_eruption: 'Éruption volcanique',
		flood: 'Inondation',
		drought: 'Sécheresse',
		tsunami: 'Tsunami',
		hurricane: 'Ouragan',
		famine: 'Famine',
		wildfire: 'Incendie',
		plague: 'Peste',
	}
	return names[type] ?? type
}
