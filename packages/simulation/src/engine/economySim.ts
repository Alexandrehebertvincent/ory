// ============================================================================
// Economic Simulation — Supply & Demand, Trade, Production
// ============================================================================
// "L'économie : lois émergentes (offre/demande, rareté) plutôt que script
// historique." — GDD §5.5
//
// Each nation is an agent: produces goods, consumes goods, trades surplus
// via connected trade routes. Prices emerge from supply/demand ratios.
// ============================================================================

import type {
	NationEconomy,
	Commodity,
	TradeRoute,
	NationTechnology,
	Population,
	Settlement,
	MapTile,
} from '../../../shared/src/types/world'
import type {
	GameState,
	StaticData,
	SimConfig,
	TickLogEntry,
	SeededRNG,
} from '../types'

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function findEcon(
	state: GameState,
	nationId: string,
): NationEconomy | undefined {
	return state.nationEconomies.find((e) => e.nationId === nationId)
}

function findTech(
	state: GameState,
	nationId: string,
): NationTechnology | undefined {
	return state.nationTechnologies.find((t) => t.nationId === nationId)
}

function findPop(state: GameState, nationId: string): Population | undefined {
	return state.populations.find((p) => p.nationId === nationId)
}

/**
 * Compute base production for a nation based on its resources, population,
 * and technology level.
 */
function computeProduction(
	nationId: string,
	state: GameState,
	staticData: StaticData,
): Map<string, number> {
	const production = new Map<string, number>()
	const pop = findPop(state, nationId)
	const tech = findTech(state, nationId)
	if (!pop) return production

	// Population-based labor force (30% of population are productive workers)
	const workers = pop.total * 0.3

	// Count resources from controlled tiles
	const nationTiles = staticData.tiles.filter((t) => t.nationId === nationId)
	const resourceTotals = new Map<string, number>()
	for (const tile of nationTiles) {
		for (const res of tile.resources) {
			const prev = resourceTotals.get(res.type) ?? 0
			resourceTotals.set(res.type, prev + res.abundance)
		}
	}

	// Agriculture tech multiplier
	const hasBetterPlough = tech?.unlockedTechs.includes('tech_heavy_plough')
		? 1.3
		: 1.0
	const hasThreeField = tech?.unlockedTechs.includes(
		'tech_three_field_rotation',
	)
		? 1.2
		: 1.0
	const hasIrrigation = tech?.unlockedTechs.includes('tech_irrigation')
		? 1.15
		: 1.0
	const agriMultiplier = hasBetterPlough * hasThreeField * hasIrrigation

	// For each commodity, compute production based on matching resources
	for (const commodity of staticData.commodities) {
		let baseOutput = 0

		// Food: depends on fertile land + population
		if (commodity.category === 'food') {
			const fertility = resourceTotals.get('fertile_land') ?? 0
			const freshWater = resourceTotals.get('fresh_water') ?? 0
			const fish = resourceTotals.get('fish') ?? 0
			baseOutput =
				(fertility * 100 + freshWater * 30 + fish * 80) * agriMultiplier
		}
		// Raw materials: depend on resource availability
		else if (commodity.category === 'raw_material') {
			const matchingResource = resourceTotals.get(
				commodity.id.replace('com_', ''),
			)
			if (matchingResource) {
				baseOutput = matchingResource * 50
			}
		}
		// Manufactured goods: depend on raw materials + tech
		else if (commodity.category === 'manufactured') {
			const techCount = tech?.unlockedTechs.length ?? 0
			baseOutput = workers * 0.001 * (1 + techCount * 0.02)
		}
		// Luxury: specific to regions
		else if (commodity.category === 'luxury') {
			const matchingResource = resourceTotals.get(
				commodity.id.replace('com_', ''),
			)
			if (matchingResource) {
				baseOutput = matchingResource * 20
			}
		}
		// Livestock: depends on grasslands + animals
		else if (commodity.category === 'livestock') {
			const cattle = resourceTotals.get('cattle') ?? 0
			const horses = resourceTotals.get('horses') ?? 0
			baseOutput = (cattle + horses) * 40
		}

		if (baseOutput > 0) {
			// Scale by workers / 100000 (normalized)
			production.set(commodity.id, Math.round(baseOutput * (workers / 100000)))
		}
	}

	return production
}

/**
 * Compute demand for a nation based on population, wealth, and culture.
 */
function computeDemand(
	nationId: string,
	state: GameState,
	staticData: StaticData,
): Map<string, number> {
	const demand = new Map<string, number>()
	const pop = findPop(state, nationId)
	if (!pop) return demand

	for (const commodity of staticData.commodities) {
		let baseDemand = 0

		if (commodity.category === 'food') {
			// Everyone needs food: 1 unit per person per year (simplified)
			baseDemand = pop.total * 0.001
		} else if (commodity.category === 'raw_material') {
			// Demand based on infrastructure needs and settlement count
			const nationSettlements = state.settlements.filter(
				(s) => s.nationId === nationId,
			)
			baseDemand = nationSettlements.length * 10
		} else if (commodity.category === 'luxury') {
			// Only wealthy classes consume luxury goods
			const wealthyPop = pop.socialGroups
				.filter((g) =>
					['royalty', 'nobility', 'clergy', 'merchants'].includes(g.class),
				)
				.reduce((sum, g) => sum + g.percentage, 0)
			baseDemand = pop.total * wealthyPop * 0.0005
		} else if (commodity.category === 'manufactured') {
			baseDemand = pop.total * 0.0002
		} else if (commodity.category === 'livestock') {
			baseDemand = pop.total * 0.0003
		}

		if (baseDemand > 0) {
			demand.set(commodity.id, Math.round(baseDemand))
		}
	}

	return demand
}

// ----------------------------------------------------------------------------
// Main simulation
// ----------------------------------------------------------------------------

/**
 * Simulate one tick of economic activity for all nations.
 *
 * Steps:
 * 1. Compute production per nation
 * 2. Compute demand per nation
 * 3. Set local prices based on supply/demand ratio
 * 4. Trade between connected nations (surplus → deficit via trade routes)
 * 5. Update GDP, trade balance, currency value
 */
export function simulateEconomy(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	// --- Per-nation production & demand ---
	const nationProduction = new Map<string, Map<string, number>>()
	const nationDemand = new Map<string, Map<string, number>>()

	for (const nation of state.nations) {
		nationProduction.set(
			nation.id,
			computeProduction(nation.id, state, staticData),
		)
		nationDemand.set(nation.id, computeDemand(nation.id, state, staticData))
	}

	// --- Price adjustment (supply vs demand) ---
	for (const nation of state.nations) {
		const econ = findEcon(state, nation.id)
		if (!econ) continue

		const production = nationProduction.get(nation.id)!
		const demand = nationDemand.get(nation.id)!

		for (const commodity of staticData.commodities) {
			const supply = production.get(commodity.id) ?? 0
			const need = demand.get(commodity.id) ?? 1

			// Price = baseValue × (demand / supply) clamped to [0.2, 5.0]
			const ratio = need / Math.max(supply, 1)
			const priceMultiplier = Math.max(0.2, Math.min(5.0, ratio))
			// Add some volatility
			const noise = 1 + (rng.next() - 0.5) * 0.1 * config.economicVolatility
			const newPrice = Math.round(commodity.baseValue * priceMultiplier * noise)

			// Update or create market price entry
			const priceEntry = econ.marketPrices.find(
				(p) => p.commodityId === commodity.id,
			)
			if (priceEntry) {
				priceEntry.price = newPrice
			} else if (supply > 0 || need > 0) {
				econ.marketPrices.push({ commodityId: commodity.id, price: newPrice })
			}
		}
	}

	// --- Trade via trade routes ---
	for (const route of staticData.tradeRoutes) {
		if (route.connectsNations.length < 2) continue

		for (const goodType of route.goods) {
			// Find a commodity matching this resource type
			const commodity = staticData.commodities.find(
				(c) =>
					c.id === `com_${goodType}` || c.name.toLowerCase().includes(goodType),
			)
			if (!commodity) continue

			// For each pair of connected nations, trade surplus → deficit
			for (let i = 0; i < route.connectsNations.length; i++) {
				for (let j = i + 1; j < route.connectsNations.length; j++) {
					const nA = route.connectsNations[i]
					const nB = route.connectsNations[j]

					const prodA = nationProduction.get(nA)?.get(commodity.id) ?? 0
					const demA = nationDemand.get(nA)?.get(commodity.id) ?? 0
					const prodB = nationProduction.get(nB)?.get(commodity.id) ?? 0
					const demB = nationDemand.get(nB)?.get(commodity.id) ?? 0

					const surplusA = prodA - demA
					const surplusB = prodB - demB

					// Only trade if one has surplus and the other deficit
					if (surplusA > 0 && surplusB < 0) {
						executeTrade(
							nA,
							nB,
							commodity.id,
							Math.min(surplusA, -surplusB),
							state,
							route.danger,
							rng,
						)
					} else if (surplusB > 0 && surplusA < 0) {
						executeTrade(
							nB,
							nA,
							commodity.id,
							Math.min(surplusB, -surplusA),
							state,
							route.danger,
							rng,
						)
					}
				}
			}
		}
	}

	// --- Update GDP and trade balance ---
	for (const nation of state.nations) {
		const econ = findEcon(state, nation.id)
		if (!econ) continue

		const pop = findPop(state, nation.id)
		const production = nationProduction.get(nation.id)!

		// GDP = sum of production × local prices
		let gdp = 0
		for (const [comId, qty] of production) {
			const priceEntry = econ.marketPrices.find((p) => p.commodityId === comId)
			const price =
				priceEntry?.price ??
				staticData.commodities.find((c) => c.id === comId)?.baseValue ??
				1
			gdp += qty * price
		}
		const oldGdp = econ.gdpEstimate
		econ.gdpEstimate = gdp

		// Log significant economic changes
		if (oldGdp > 0 && Math.abs(gdp - oldGdp) / oldGdp > 0.05) {
			log.push({
				year: state.currentYear,
				category: 'economy',
				nationId: nation.id,
				message:
					gdp > oldGdp
						? `Économie de ${nation.name} en croissance: +${Math.round(((gdp - oldGdp) / oldGdp) * 100)}%`
						: `Économie de ${nation.name} en déclin: ${Math.round(((gdp - oldGdp) / oldGdp) * 100)}%`,
				data: { oldGdp, newGdp: gdp },
			})
		}
	}

	return log
}

/**
 * Execute a trade between two nations.
 * The exporter gains wealth, the importer gets goods.
 * Route danger may cause losses.
 */
function executeTrade(
	exporterId: string,
	importerId: string,
	commodityId: string,
	quantity: number,
	state: GameState,
	routeDanger: number,
	rng: SeededRNG,
): void {
	// Route danger: chance of losing part of the goods
	const lossRate = (routeDanger / 10) * 0.3 // up to 30% loss on dangerous routes
	const effectiveQty = Math.round(quantity * (1 - lossRate * rng.next()))
	if (effectiveQty <= 0) return

	const exporterEcon = findEcon(state, exporterId)
	const importerEcon = findEcon(state, importerId)
	if (!exporterEcon || !importerEcon) return

	// Trade value = quantity × average of both local prices
	const exportPrice =
		exporterEcon.marketPrices.find((p) => p.commodityId === commodityId)
			?.price ?? 1
	const importPrice =
		importerEcon.marketPrices.find((p) => p.commodityId === commodityId)
			?.price ?? 1
	const tradeValue = effectiveQty * ((exportPrice + importPrice) / 2)

	// Update trade balances
	exporterEcon.tradeBalance += tradeValue
	importerEcon.tradeBalance -= tradeValue
}
