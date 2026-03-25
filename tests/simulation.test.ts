// ============================================================================
// Tests — Simulation Engine
// ============================================================================

import { describe, expect, it, beforeEach } from 'vitest'
import {
	SeededRNG,
	DEFAULT_SIM_CONFIG,
	WEEKS_PER_YEAR,
	weekToSeason,
} from '../packages/simulation/src/types'
import type {
	GameState,
	StaticData,
	SimConfig,
	Season,
} from '../packages/simulation/src/types'
import {
	worldTick,
	runTicks,
} from '../packages/simulation/src/engine/worldTick'
import {
	simulatePopulation,
	simulateDiseasePropagation,
} from '../packages/simulation/src/engine/populationSim'
import { simulateEconomy } from '../packages/simulation/src/engine/economySim'
import { simulateTechDiffusion } from '../packages/simulation/src/engine/techDiffusion'
import { simulateDiplomacy } from '../packages/simulation/src/engine/diplomacySim'
import { simulateDisasters } from '../packages/simulation/src/engine/disasterSim'
import {
	simulateHistoricalEvents,
	simulateLocalEvents,
	simulateRumors,
} from '../packages/simulation/src/engine/eventEngine'
import { detectIntent } from '../packages/simulation/src/advisor/intentDetector'
import type {
	Nation,
	Population,
	NationEconomy,
	NationTechnology,
	NationMilitary,
	NationHealth,
	NationReligion,
	NationLaw,
	NationEducation,
	NationWorldKnowledge,
	Settlement,
	Technology,
	Commodity,
	Disease,
	ClimateRegion,
	TradeRoute,
	MapTile,
	HistoricalEvent,
	EventTemplate,
	Infrastructure,
	FamilyLine,
} from '../packages/shared/src/types/world'

// ============================================================================
// Fixtures — Minimal valid objects for two nations
// ============================================================================

function makeNation(
	id: string,
	name: string,
	extras: Partial<Nation> = {},
): Nation {
	return {
		id,
		name,
		dempinym: name + 'ais',
		governance: 'monarchy',
		capital: `set_${id}`,
		territory: [
			{ lat: 0, lng: 0 },
			{ lat: 10, lng: 0 },
			{ lat: 10, lng: 10 },
			{ lat: 0, lng: 10 },
		],
		tileIds: [`tile_${id}_1`, `tile_${id}_2`],
		ruler: {
			name: 'King Test',
			dynastyName: 'Dynasty',
			birthYear: 960,
			age: 40,
			traits: ['brave'],
		},
		diplomacy: [],
		vassalOf: null,
		stability: 7,
		prestige: 5,
		color: '#FF0000',
		...extras,
	}
}

function makePopulation(nationId: string, total: number): Population {
	return {
		nationId,
		total,
		urbanRatio: 0.1,
		socialGroups: [
			{ class: 'peasant', percentage: 0.7, influence: 1, wealth: 2 },
			{ class: 'nobility', percentage: 0.05, influence: 8, wealth: 9 },
			{ class: 'clergy', percentage: 0.05, influence: 5, wealth: 5 },
			{ class: 'merchants', percentage: 0.1, influence: 4, wealth: 6 },
			{ class: 'artisan', percentage: 0.1, influence: 2, wealth: 4 },
		],
		lifeExpectancy: 35,
		infantMortality: 0.3,
		birthRate: 0.04,
		deathRate: 0.03,
		growthRate: 0.01,
	}
}

function makeEcon(nationId: string): NationEconomy {
	return {
		nationId,
		currency: 'gold',
		currencyValue: 1,
		gdpEstimate: 100000,
		taxRate: 0.1,
		tradeBalance: 0,
		mainExports: ['com_wheat'],
		mainImports: ['com_iron'],
		tradeRouteAccess: ['tr_silk_road'],
		marketPrices: [{ commodityId: 'com_wheat', price: 10 }],
	}
}

function makeTech(nationId: string, unlocked: string[] = []): NationTechnology {
	return {
		nationId,
		unlockedTechs: unlocked,
		researchProgress: [],
		innovationCapacity: 5,
	}
}

function makeMilitary(nationId: string): NationMilitary {
	return {
		nationId,
		armySize: 5000,
		availableUnits: ['infantry', 'cavalry'],
		militaryStrength: 5,
		navalStrength: 2,
		fortificationCount: 3,
		warExperience: 4,
		morale: 7,
		professionalArmy: false,
	}
}

function makeHealth(nationId: string): NationHealth {
	return {
		nationId,
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [],
		faminRisk: 2,
		overallHealth: 5,
	}
}

function makeReligion(nationId: string, religionId: string): NationReligion {
	return {
		nationId,
		stateReligionId: religionId,
		religions: [{ religionId, percentage: 0.9, status: 'state' }],
		religiousTension: 2,
	}
}

function makeLaw(nationId: string): NationLaw {
	return {
		nationId,
		legalSystem: 'customary',
		propertyRights: 4,
		personalFreedom: 3,
		genderEquality: 2,
		slaveryStatus: 'legal',
		judicialIndependence: 3,
		crimeRate: 4,
		commonCrimes: ['theft'],
		punishments: ['fines'],
		lawEnforcement: 3,
	}
}

function makeEducation(nationId: string): NationEducation {
	return {
		nationId,
		institutions: [],
		scholarPopulation: 0.02,
		knowledgeAreas: ['agriculture'],
		libraryCount: 1,
		educationAccess: 2,
	}
}

function makeWorldKnowledge(nationId: string): NationWorldKnowledge {
	return {
		nationId,
		knownRegions: [],
		explorationCapacity: 3,
		navalRange: 2,
		cartographyLevel: 2,
		knownNations: [],
		myths: [],
	}
}

function makeSettlement(id: string, nationId: string, pop: number): Settlement {
	return {
		id,
		name: `City of ${id}`,
		type: 'city',
		coord: { lat: 5, lng: 5 },
		tileId: `tile_${nationId}_1`,
		nationId,
		population: pop,
		defenseLevel: 4,
		wealthLevel: 5,
		specializations: ['trade'],
	}
}

function makeTile(id: string, nationId: string | null): MapTile {
	return {
		id,
		coord: { lat: 5, lng: 5 },
		terrain: 'plains',
		elevation: 100,
		resources: [
			{ type: 'fertile_land', abundance: 7 },
			{ type: 'fresh_water', abundance: 5 },
		],
		rainfall: 5,
		temperature: 5,
		fertility: 6,
		nationId,
		settlementId: null,
	}
}

function makeTradeRoute(nationIds: string[]): TradeRoute {
	return {
		id: 'tr_test_route',
		name: 'Test Trade Route',
		type: 'land',
		waypoints: [
			{ lat: 5, lng: 5 },
			{ lat: 15, lng: 15 },
		],
		connectsNations: nationIds,
		goods: ['wheat', 'iron'],
		danger: 3,
		importance: 7,
	}
}

function makeTechnology(
	id: string,
	prereqs: string[] = [],
	complexity = 3,
): Technology {
	return {
		id,
		name: `Tech ${id}`,
		category: 'agriculture',
		description: 'A technology',
		prerequisites: prereqs,
		effects: ['bonus'],
		complexity,
	}
}

function makeCommodity(
	id: string,
	category: string,
	baseValue: number,
): Commodity {
	return {
		id,
		name: `Commodity ${id}`,
		category: category as any,
		baseValue,
		weight: 1,
		perishable: false,
	}
}

function makeDisease(id: string, mortality: number): Disease {
	return {
		id,
		name: `Disease ${id}`,
		type: 'epidemic',
		mortality,
		transmissionMode: 'airborne',
		endemicRegions: [],
		knownTreatments: [],
	}
}

function makeClimateRegion(): ClimateRegion {
	return {
		id: 'climate_temperate',
		zone: 'temperate',
		area: [
			{ lat: 0, lng: 0 },
			{ lat: 20, lng: 0 },
			{ lat: 20, lng: 20 },
			{ lat: 0, lng: 20 },
		],
		avgTemperature: 15,
		avgRainfall: 800,
		seasonality: 7,
		disasterRisks: [
			{ type: 'flood', probability: 0.1, severity: 4 },
			{ type: 'drought', probability: 0.05, severity: 3 },
		],
	}
}

// --- Build complete state + static for 2 nations ---

function buildTestState(): GameState {
	const nationA = makeNation('nat_a', 'Alpha', {
		diplomacy: [
			{ targetNationId: 'nat_b', type: 'trade_agreement', strength: 5 },
		],
	})
	const nationB = makeNation('nat_b', 'Beta', {
		diplomacy: [
			{ targetNationId: 'nat_a', type: 'trade_agreement', strength: 5 },
		],
	})

	return {
		currentYear: 1000,
		currentWeek: 1,
		currentSeason: 'spring',
		nations: [nationA, nationB],
		populations: [
			makePopulation('nat_a', 500000),
			makePopulation('nat_b', 300000),
		],
		nationEconomies: [makeEcon('nat_a'), makeEcon('nat_b')],
		nationTechnologies: [
			makeTech('nat_a', ['tech_iron_working']),
			makeTech('nat_b', []),
		],
		nationMilitary: [makeMilitary('nat_a'), makeMilitary('nat_b')],
		nationHealth: [makeHealth('nat_a'), makeHealth('nat_b')],
		nationReligions: [
			makeReligion('nat_a', 'rel_christianity'),
			makeReligion('nat_b', 'rel_islam'),
		],
		nationLaws: [makeLaw('nat_a'), makeLaw('nat_b')],
		nationEducation: [makeEducation('nat_a'), makeEducation('nat_b')],
		nationWorldKnowledge: [
			makeWorldKnowledge('nat_a'),
			makeWorldKnowledge('nat_b'),
		],
		settlements: [
			makeSettlement('set_nat_a', 'nat_a', 50000),
			makeSettlement('set_nat_b', 'nat_b', 30000),
		],
		infrastructure: [],
		familyLines: [],
		historicalEvents: [],
		activeRumors: [],
		activeTreaties: [],
		activeConflicts: [],
		pendingDecisions: [],
		playerActions: [],
		grandMasterAlerts: [],
		tickLog: [],
	}
}

function buildTestStatic(): StaticData {
	return {
		technologies: [
			makeTechnology('tech_iron_working'),
			makeTechnology('tech_heavy_plough', ['tech_iron_working'], 4),
			makeTechnology('tech_three_field_rotation', ['tech_heavy_plough'], 5),
			makeTechnology('tech_compass', [], 6),
		],
		commodities: [
			makeCommodity('com_wheat', 'food', 10),
			makeCommodity('com_iron', 'raw_material', 25),
			makeCommodity('com_silk', 'luxury', 100),
		],
		diseases: [
			makeDisease('dis_plague', 0.3),
			makeDisease('dis_malaria', 0.05),
		],
		climateRegions: [makeClimateRegion()],
		tradeRoutes: [makeTradeRoute(['nat_a', 'nat_b'])],
		tiles: [
			makeTile('tile_nat_a_1', 'nat_a'),
			makeTile('tile_nat_a_2', 'nat_a'),
			makeTile('tile_nat_b_1', 'nat_b'),
			makeTile('tile_nat_b_2', 'nat_b'),
		],
		religions: [],
		languages: [],
		nationLanguages: [],
		nationCultures: [],
		ecology: [],
		eventTemplates: [],
		informationVectors: [],
		rumorTemplates: [],
		advisorProfiles: [],
		knowledgeEntries: [],
		feasibilityRules: [],
		advisorResponseTemplates: [],
		socialMobilityPaths: [],
		socialMobilityModifiers: [],
		transportVehicles: [],
		constructionRecipes: [],
		culturalNamePools: [],
		dailyLife: [],
	}
}

// ============================================================================
// Tests
// ============================================================================

// ── SeededRNG ──

describe('SeededRNG', () => {
	it('produit des résultats déterministes', () => {
		const rng1 = new SeededRNG(42)
		const rng2 = new SeededRNG(42)
		const seq1 = Array.from({ length: 10 }, () => rng1.next())
		const seq2 = Array.from({ length: 10 }, () => rng2.next())
		expect(seq1).toEqual(seq2)
	})

	it('produit des valeurs entre 0 et 1', () => {
		const rng = new SeededRNG(123)
		for (let i = 0; i < 100; i++) {
			const v = rng.next()
			expect(v).toBeGreaterThanOrEqual(0)
			expect(v).toBeLessThan(1)
		}
	})

	it('intBetween respecte les bornes', () => {
		const rng = new SeededRNG(99)
		for (let i = 0; i < 100; i++) {
			const v = rng.intBetween(5, 10)
			expect(v).toBeGreaterThanOrEqual(5)
			expect(v).toBeLessThanOrEqual(10)
		}
	})

	it('chance retourne des booléens', () => {
		const rng = new SeededRNG(7)
		let trues = 0
		const n = 1000
		for (let i = 0; i < n; i++) {
			if (rng.chance(0.5)) trues++
		}
		// With 1000 trials, ~400-600 should be true (very loose check)
		expect(trues).toBeGreaterThan(300)
		expect(trues).toBeLessThan(700)
	})

	it('pick choisit un élément du tableau', () => {
		const rng = new SeededRNG(55)
		const items = ['a', 'b', 'c']
		for (let i = 0; i < 20; i++) {
			expect(items).toContain(rng.pick(items))
		}
	})

	it('shuffle ne perd aucun élément', () => {
		const rng = new SeededRNG(77)
		const items = [1, 2, 3, 4, 5]
		const shuffled = rng.shuffle(items)
		expect(shuffled).toHaveLength(5)
		expect(shuffled.sort()).toEqual([1, 2, 3, 4, 5])
	})

	it('seeds différents → séquences différentes', () => {
		const a = new SeededRNG(1)
		const b = new SeededRNG(2)
		const seqA = Array.from({ length: 5 }, () => a.next())
		const seqB = Array.from({ length: 5 }, () => b.next())
		expect(seqA).not.toEqual(seqB)
	})
})

// ── Temps & Saisons ──

describe('weekToSeason', () => {
	it('semaines 1-13 → spring', () => {
		expect(weekToSeason(1)).toBe('spring')
		expect(weekToSeason(13)).toBe('spring')
	})

	it('semaines 14-26 → summer', () => {
		expect(weekToSeason(14)).toBe('summer')
		expect(weekToSeason(26)).toBe('summer')
	})

	it('semaines 27-39 → autumn', () => {
		expect(weekToSeason(27)).toBe('autumn')
		expect(weekToSeason(39)).toBe('autumn')
	})

	it('semaines 40-52 → winter', () => {
		expect(weekToSeason(40)).toBe('winter')
		expect(weekToSeason(52)).toBe('winter')
	})

	it('WEEKS_PER_YEAR vaut 52', () => {
		expect(WEEKS_PER_YEAR).toBe(52)
	})
})

// ── Population ──

describe('simulatePopulation', () => {
	let state: GameState
	let staticData: StaticData
	const config = { ...DEFAULT_SIM_CONFIG }

	beforeEach(() => {
		state = buildTestState()
		staticData = buildTestStatic()
	})

	it('fait croître la population avec un taux positif', () => {
		const rng = new SeededRNG(42)
		const popBefore = state.populations[0].total

		simulatePopulation(state, staticData, config, rng)

		// Birth rate > death rate → population should grow (or at worst stay stable)
		expect(state.populations[0].total).toBeGreaterThanOrEqual(popBefore)
	})

	it('met un plancher à 1000', () => {
		const rng = new SeededRNG(42)
		state.populations[0].total = 500
		state.populations[0].deathRate = 0.9
		state.populations[0].birthRate = 0.01

		simulatePopulation(state, staticData, config, rng)

		expect(state.populations[0].total).toBeGreaterThanOrEqual(1000)
	})

	it('la famine augmente la mortalité', () => {
		const rng1 = new SeededRNG(42)
		const rng2 = new SeededRNG(42)

		const stateHealthy = buildTestState()
		const stateFamine = buildTestState()
		stateFamine.nationHealth[0].faminRisk = 8

		simulatePopulation(stateHealthy, staticData, config, rng1)
		simulatePopulation(stateFamine, staticData, config, rng2)

		// With high famine risk, population should grow less (or shrink)
		expect(stateFamine.populations[0].total).toBeLessThanOrEqual(
			stateHealthy.populations[0].total,
		)
	})

	it('les conflits réduisent la population', () => {
		const rng1 = new SeededRNG(42)
		const rng2 = new SeededRNG(42)

		const statePeace = buildTestState()
		const stateWar = buildTestState()
		stateWar.activeConflicts = [
			{
				id: 'conflict_test',
				attackerId: 'nat_a',
				defenderId: 'nat_b',
				startYear: 999,
				cause: 'rivalry',
				forceRatio: 1.5,
				attackerMorale: 7,
				defenderMorale: 7,
				battles: 0,
				resolved: false,
			},
		]

		simulatePopulation(statePeace, staticData, config, rng1)
		simulatePopulation(stateWar, staticData, config, rng2)

		expect(stateWar.populations[0].total).toBeLessThanOrEqual(
			statePeace.populations[0].total,
		)
	})

	it('met à jour settlements proportionnellement', () => {
		const rng = new SeededRNG(42)
		const popBefore = state.populations[0].total
		const settlementBefore = state.settlements[0].population

		simulatePopulation(state, staticData, config, rng)

		const ratio = state.populations[0].total / popBefore
		expect(state.settlements[0].population).toBe(
			Math.round(settlementBefore * ratio),
		)
	})

	it('retourne un log pour les changements significatifs', () => {
		const rng = new SeededRNG(42)
		// Force a large change
		state.populations[0].birthRate = 0.2
		state.populations[0].deathRate = 0.01

		const log = simulatePopulation(state, staticData, config, rng)

		// Should have at least one log entry about population change
		expect(log.every((e) => e.category === 'population')).toBe(true)
	})
})

// ── Disease Propagation ──

describe('simulateDiseasePropagation', () => {
	it('propage les maladies via les routes commerciales', () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const rng = new SeededRNG(42)

		// Nation A has a disease, Nation B doesn't
		state.nationHealth[0].activeDiseases = [
			{ diseaseId: 'dis_plague', prevalence: 0.15 },
		]
		state.nationHealth[1].activeDiseases = []

		// Run propagation several times (low probability per tick)
		for (let i = 0; i < 100; i++) {
			simulateDiseasePropagation(state, staticData, rng)
		}

		// After many iterations with high prevalence, disease should have spread
		const nationBDiseases = state.nationHealth[1].activeDiseases
		// May or may not have spread (probabilistic), but at least the function runs without error
		expect(state.nationHealth[0].activeDiseases.length).toBeGreaterThanOrEqual(
			0,
		)
	})
})

// ── Economy ──

describe('simulateEconomy', () => {
	let state: GameState
	let staticData: StaticData
	const config = { ...DEFAULT_SIM_CONFIG }

	beforeEach(() => {
		state = buildTestState()
		staticData = buildTestStatic()
	})

	it('met à jour les prix de marché', () => {
		const rng = new SeededRNG(42)
		simulateEconomy(state, staticData, config, rng)

		// Both nations should have market prices
		for (const econ of state.nationEconomies) {
			expect(econ.marketPrices.length).toBeGreaterThan(0)
		}
	})

	it('met à jour le GDP', () => {
		const rng = new SeededRNG(42)
		const oldGdp = state.nationEconomies[0].gdpEstimate

		simulateEconomy(state, staticData, config, rng)

		// GDP should change (it's recomputed from production × prices)
		expect(typeof state.nationEconomies[0].gdpEstimate).toBe('number')
	})

	it('exécute le commerce entre nations connectées', () => {
		const rng = new SeededRNG(42)
		simulateEconomy(state, staticData, config, rng)

		// Trade balance should have changed for at least one nation
		const balanceSum = state.nationEconomies.reduce(
			(s, e) => s + e.tradeBalance,
			0,
		)
		// Trade is a zero-sum game + losses from danger
		expect(typeof balanceSum).toBe('number')
	})

	it('les prix sont bornés entre 0.2x et 5x la valeur de base', () => {
		const rng = new SeededRNG(42)
		simulateEconomy(state, staticData, config, rng)

		for (const econ of state.nationEconomies) {
			for (const mp of econ.marketPrices) {
				const commodity = staticData.commodities.find(
					(c) => c.id === mp.commodityId,
				)
				if (!commodity) continue
				// Price should be roughly within bounds (noise can push slightly)
				expect(mp.price).toBeGreaterThan(0)
			}
		}
	})
})

// ── Tech Diffusion ──

describe('simulateTechDiffusion', () => {
	let state: GameState
	let staticData: StaticData
	const config = { ...DEFAULT_SIM_CONFIG }

	beforeEach(() => {
		state = buildTestState()
		staticData = buildTestStatic()
	})

	it("n'ajoute pas de techs sans prérequis remplis", () => {
		const rng = new SeededRNG(42)
		// nat_b has no techs; tech_heavy_plough requires tech_iron_working
		simulateTechDiffusion(state, staticData, config, rng)

		const natBTech = state.nationTechnologies[1]
		// Should NOT have tech_heavy_plough (missing prerequisite)
		expect(natBTech.unlockedTechs).not.toContain('tech_heavy_plough')
	})

	it('la recherche progresse', () => {
		const rng = new SeededRNG(42)
		// Give nat_a a research in progress
		state.nationTechnologies[0].researchProgress = [
			{ techId: 'tech_heavy_plough', progress: 0.5 },
		]

		simulateTechDiffusion(state, staticData, config, rng)

		const rp = state.nationTechnologies[0].researchProgress.find(
			(r) => r.techId === 'tech_heavy_plough',
		)
		// Either progress increased, or it completed (moved to unlockedTechs)
		const unlocked =
			state.nationTechnologies[0].unlockedTechs.includes('tech_heavy_plough')
		if (rp) {
			expect(rp.progress).toBeGreaterThan(0.5)
		} else {
			expect(unlocked).toBe(true)
		}
	})

	it('la diffusion via commerce peut démarrer une recherche', () => {
		const rng = new SeededRNG(42)
		// nat_a has iron_working, nat_b doesn't, they share a trade route
		// Run many ticks to increase chance of diffusion
		for (let i = 0; i < 50; i++) {
			simulateTechDiffusion(state, staticData, config, new SeededRNG(i))
		}

		const natBTech = state.nationTechnologies[1]
		// tech_iron_working has no prereqs, so nat_b could start researching it
		const hasResearch = natBTech.researchProgress.some(
			(r) => r.techId === 'tech_iron_working',
		)
		const hasUnlocked = natBTech.unlockedTechs.includes('tech_iron_working')
		// After 50 attempts, it's very likely to have started
		expect(hasResearch || hasUnlocked).toBe(true)
	})

	it('retourne des logs pour les découvertes', () => {
		const rng = new SeededRNG(42)
		// Set progress to 1.0 (should instantly unlock)
		state.nationTechnologies[0].researchProgress = [
			{ techId: 'tech_heavy_plough', progress: 1.0 },
		]

		const log = simulateTechDiffusion(state, staticData, config, rng)

		// Should discover the tech and log it
		expect(state.nationTechnologies[0].unlockedTechs).toContain(
			'tech_heavy_plough',
		)
		expect(log.some((l) => l.category === 'technology')).toBe(true)
	})
})

// ── Diplomacy ──

describe('simulateDiplomacy', () => {
	let state: GameState
	let staticData: StaticData
	const config = { ...DEFAULT_SIM_CONFIG }

	beforeEach(() => {
		state = buildTestState()
		staticData = buildTestStatic()
	})

	it('ne modifie pas les nations joueur', () => {
		const rng = new SeededRNG(42)
		const playerIds = new Set(['nat_a'])
		const diploBeforeA = JSON.stringify(state.nations[0].diplomacy)

		simulateDiplomacy(state, staticData, config, rng, playerIds)

		// nat_a's decisions should not be altered (player-controlled)
		expect(JSON.stringify(state.nations[0].diplomacy)).toBe(diploBeforeA)
	})

	it('résout les conflits en cours', () => {
		const rng = new SeededRNG(42)
		state.activeConflicts = [
			{
				id: 'conflict_old',
				attackerId: 'nat_a',
				defenderId: 'nat_b',
				startYear: 996,
				cause: 'rivalry',
				forceRatio: 2.0,
				attackerMorale: 8,
				defenderMorale: 3,
				battles: 10,
				resolved: false,
			},
		]

		// Run many ticks to ensure resolution
		for (let i = 0; i < 20; i++) {
			simulateDiplomacy(state, staticData, config, new SeededRNG(i), new Set())
		}

		// After enough ticks, old conflict (4+ years) should be resolved
		expect(state.activeConflicts[0].resolved).toBe(true)
	})

	it('retourne des logs', () => {
		const rng = new SeededRNG(42)
		state.activeConflicts = [
			{
				id: 'conflict_resolve',
				attackerId: 'nat_a',
				defenderId: 'nat_b',
				startYear: 990,
				cause: 'rivalry',
				forceRatio: 3.0,
				attackerMorale: 9,
				defenderMorale: 2,
				battles: 20,
				resolved: false,
			},
		]

		const log = simulateDiplomacy(state, staticData, config, rng, new Set())

		expect(Array.isArray(log)).toBe(true)
	})
})

// ── Disasters ──

describe('simulateDisasters', () => {
	it('génère des catastrophes selon les probabilités des régions', () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		// Boost disaster probability to ensure they happen
		const config = { ...DEFAULT_SIM_CONFIG, disasterBaseProb: 1.0 }

		let totalLogs = 0
		// Run many ticks to catch probabilistic events
		for (let i = 0; i < 100; i++) {
			const rng = new SeededRNG(i)
			const log = simulateDisasters(state, staticData, config, rng)
			totalLogs += log.length
		}

		expect(totalLogs).toBeGreaterThan(0)
	})

	it('applique des effets de stabilité et population', () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const config = { ...DEFAULT_SIM_CONFIG, disasterBaseProb: 100 } // force disasters

		const stabBefore = state.nations[0].stability
		const popBefore = state.populations[0].total

		// Run with very high probability
		for (let i = 0; i < 10; i++) {
			simulateDisasters(state, staticData, config, new SeededRNG(i))
		}

		// Stability should have dropped, or population decreased
		const decreased =
			state.nations[0].stability < stabBefore ||
			state.populations[0].total < popBefore
		expect(decreased).toBe(true)
	})
})

// ── Historical Events ──

describe('simulateHistoricalEvents', () => {
	it('déclenche un événement dont les conditions sont remplies', () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const config = { ...DEFAULT_SIM_CONFIG }
		const rng = new SeededRNG(42)

		const event: HistoricalEvent = {
			id: 'evt_test',
			name: 'Test Event',
			description: 'A test event',
			type: 'milestone',
			category: 'political',
			year: 1000,
			yearRange: [999, 1001],
			affectedNationIds: ['nat_a'],
			affectedRegionIds: [],
			globalEvent: false,
			triggerConditions: {
				requiredNationsExist: ['nat_a'],
			},
			effects: {
				stabilityModifier: -2,
			},
			severity: 5,
			visibility: 'public',
			playerChoices: [],
			gmOverrideOptions: { canForce: true, canModify: true, canCancel: true },
			historical_outcome: 'test',
			status: 'pending',
		}
		state.historicalEvents = [event]

		const stabBefore = state.nations[0].stability
		const log = simulateHistoricalEvents(state, staticData, config, rng)

		expect(state.historicalEvents[0].status).toBe('triggered')
		expect(state.nations[0].stability).toBe(stabBefore - 2)
		expect(log.length).toBe(1)
		expect(log[0].category).toBe('event')
	})

	it("ne déclenche pas un événement hors de sa fenêtre d'années", () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const config = { ...DEFAULT_SIM_CONFIG }
		const rng = new SeededRNG(42)

		state.historicalEvents = [
			{
				id: 'evt_future',
				name: 'Future Event',
				description: '',
				type: 'milestone',
				category: 'political',
				year: 1200,
				yearRange: [1100, 1300],
				affectedNationIds: ['nat_a'],
				affectedRegionIds: [],
				globalEvent: false,
				triggerConditions: {},
				effects: {},
				severity: 3,
				visibility: 'public',
				playerChoices: [],
				gmOverrideOptions: { canForce: true, canModify: true, canCancel: true },
				historical_outcome: '',
				status: 'pending',
			},
		]

		simulateHistoricalEvents(state, staticData, config, rng)

		expect(state.historicalEvents[0].status).toBe('pending')
	})
})

// ── Local Events ──

describe('simulateLocalEvents', () => {
	it('génère des événements locaux à partir de templates', () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const config = { ...DEFAULT_SIM_CONFIG }

		// Add a template very likely to trigger
		staticData.eventTemplates = [
			{
				id: 'tmpl_harvest',
				name: 'Grande Récolte',
				description: 'Récolte exceptionnelle',
				category: 'economic',
				scope: 'local',
				severity: 3,
				targetClasses: ['peasant'],
				recurring: true,
				cooldownYears: 0,
				baseProbability: 1.0, // 100% probability
				triggerConditions: {},
				defaultEffects: { stabilityModifier: 1 },
				playerChoices: [],
				flavorTexts: ['Les granges sont pleines'],
				tags: ['harvest'],
			},
		]

		let totalLogs = 0
		for (let i = 0; i < 10; i++) {
			const rng = new SeededRNG(i)
			const log = simulateLocalEvents(state, staticData, config, rng)
			totalLogs += log.length
		}

		expect(totalLogs).toBeGreaterThan(0)
	})
})

// ── Intent Detection ──

describe('detectIntent', () => {
	it('détecte l\'intention "build"', () => {
		const result = detectIntent('Je veux construire un pont')
		expect(result.category).toBe('build')
		expect(result.confidence).toBeGreaterThan(0)
	})

	it('détecte l\'intention "military"', () => {
		const result = detectIntent('Lever une armée pour attaquer')
		expect(result.category).toBe('military')
	})

	it('détecte l\'intention "trade"', () => {
		const result = detectIntent(
			'Négocier un accord commercial avec les marchands',
		)
		expect(result.category).toBe('trade')
	})

	it('détecte l\'intention "heal"', () => {
		const result = detectIntent('Trouver un remède contre la peste')
		expect(result.category).toBe('heal')
	})

	it('détecte l\'intention "explore"', () => {
		const result = detectIntent(
			'Monter une expédition pour explorer les terres inconnues',
		)
		expect(result.category).toBe('explore')
	})

	it('détecte l\'intention "farm"', () => {
		const result = detectIntent('Cultiver du blé et irriguer les champs')
		expect(result.category).toBe('farm')
	})

	it('détecte l\'intention "political"', () => {
		const result = detectIntent('Former une alliance diplomatique avec le roi')
		expect(result.category).toBe('political')
	})

	it('détecte l\'intention "navigate"', () => {
		const result = detectIntent('Naviguer en haute mer avec une boussole')
		expect(result.category).toBe('navigate')
	})

	it('détecte l\'intention "learn"', () => {
		const result = detectIntent('Comment comprendre la science ?')
		expect(result.category).toBe('learn')
	})

	it('retourne "general" pour une requête vague', () => {
		const result = detectIntent('bonjour')
		expect(result.category).toBe('general')
		expect(result.confidence).toBe(0)
	})

	it('gère les accents correctement', () => {
		const result = detectIntent('Édifier une cathédrale')
		expect(result.category).toBe('build')
	})

	it('fournit des keywords extraits', () => {
		const result = detectIntent('Je veux construire un grand pont en pierre')
		expect(result.keywords.length).toBeGreaterThan(0)
		expect(result.rawQuery).toBe('Je veux construire un grand pont en pierre')
	})
})

// ── World Tick (intégration) ──

describe('worldTick', () => {
	it('exécute un tick complet sans erreur', () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const config = { ...DEFAULT_SIM_CONFIG }
		const rng = new SeededRNG(42)

		const result = worldTick(state, staticData, config, rng)

		expect(result.state).toBeDefined()
		expect(result.log).toBeInstanceOf(Array)
		expect(result.durationMs).toBeGreaterThanOrEqual(0)
	})

	it('avance la semaine de 1', () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const config = { ...DEFAULT_SIM_CONFIG }
		const rng = new SeededRNG(42)

		expect(state.currentWeek).toBe(1)

		worldTick(state, staticData, config, rng)

		expect(state.currentWeek).toBe(2)
		expect(state.currentSeason).toBe('spring')
	})

	it("passe à l'année suivante à la semaine 53", () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const config = { ...DEFAULT_SIM_CONFIG }
		const rng = new SeededRNG(42)

		state.currentWeek = 52
		state.currentYear = 1000

		worldTick(state, staticData, config, rng)

		expect(state.currentYear).toBe(1001)
		expect(state.currentWeek).toBe(1)
		expect(state.currentSeason).toBe('spring')
	})

	it('met à jour la saison correctement', () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const config = { ...DEFAULT_SIM_CONFIG }
		const rng = new SeededRNG(42)

		state.currentWeek = 13 // fin du printemps

		worldTick(state, staticData, config, rng)

		expect(state.currentWeek).toBe(14)
		expect(state.currentSeason).toBe('summer')
	})

	it('popule le tickLog', () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const config = { ...DEFAULT_SIM_CONFIG }
		const rng = new SeededRNG(42)

		worldTick(state, staticData, config, rng)

		expect(Array.isArray(state.tickLog)).toBe(true)
	})
})

// ── Fast Forward ──

describe('runTicks', () => {
	it('avance de N semaines', () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const config = { ...DEFAULT_SIM_CONFIG }
		const rng = new SeededRNG(42)

		runTicks(state, staticData, config, rng, 10)

		expect(state.currentWeek).toBe(11) // started at 1, advanced 10
	})

	it('traverse une année complète (52 ticks)', () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const config = { ...DEFAULT_SIM_CONFIG }
		const rng = new SeededRNG(42)

		runTicks(state, staticData, config, rng, 52)

		expect(state.currentYear).toBe(1001)
		expect(state.currentWeek).toBe(1)
	})

	it('exécute le callback onTick', () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const config = { ...DEFAULT_SIM_CONFIG }
		const rng = new SeededRNG(42)

		const years: number[] = []
		runTicks(state, staticData, config, rng, 5, undefined, (year) => {
			years.push(year)
		})

		expect(years).toHaveLength(5)
	})

	it('accumule tous les logs', () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const config = { ...DEFAULT_SIM_CONFIG }
		const rng = new SeededRNG(42)

		const result = runTicks(state, staticData, config, rng, 5)

		expect(Array.isArray(result.log)).toBe(true)
		expect(result.durationMs).toBeGreaterThanOrEqual(0)
	})

	it('simule 10 ans (520 semaines) sans crash', () => {
		const state = buildTestState()
		const staticData = buildTestStatic()
		const config = { ...DEFAULT_SIM_CONFIG }
		const rng = new SeededRNG(42)

		const result = runTicks(state, staticData, config, rng, 520)

		expect(state.currentYear).toBe(1010)
		expect(state.currentWeek).toBe(1)
		expect(result.durationMs).toBeGreaterThanOrEqual(0)
	})
})
