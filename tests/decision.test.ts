// ============================================================================
// Tests — Decision System (DecisionEngine, GrandMaster, ActionResolver)
// ============================================================================

import { describe, it, expect } from 'vitest'
import type {
	GameState,
	StaticData,
	SimConfig,
	PendingDecision,
	PlayerAction,
	GrandMasterAlert,
	EffectChain,
} from '../packages/simulation/src/types'
import {
	SeededRNG,
	DEFAULT_SIM_CONFIG,
	WEEKS_PER_YEAR,
} from '../packages/simulation/src/types'
import type {
	HistoricalEvent,
	EventTemplate,
	FamilyLine,
	FamilyMember,
	Nation,
	NationMilitary,
	NationEconomy,
	NationTechnology,
	NationHealth,
	NationReligion,
	Population,
	NationWorldKnowledge,
} from '../packages/shared/src/types/world'

// --- DecisionEngine ---
import {
	decisionFromHistoricalEvent,
	decisionFromLocalEvent,
	decisionFromPlayerAction,
	generateDecisions,
	resolveExpiredDecisions,
	resolvePlayerChoice,
} from '../packages/simulation/src/decision/decisionEngine'

// --- GrandMaster ---
import {
	evaluateWorldState,
	calculateMaxUrgency,
} from '../packages/simulation/src/decision/grandMaster'

// --- ActionResolver ---
import {
	generateEffectChain,
	processEffectChains,
	resolveActions,
} from '../packages/simulation/src/decision/actionResolver'

// --- WorldTick ---
import { worldTick } from '../packages/simulation/src/engine/worldTick'

// ============================================================================
// Test Fixtures
// ============================================================================

function makeRNG(seed = 42): SeededRNG {
	return new SeededRNG(seed)
}

function makeFamilyMember(overrides: Partial<FamilyMember> = {}): FamilyMember {
	return {
		id: 'member_1',
		name: 'Henri',
		gender: 'male',
		birthYear: 980,
		deathYear: null,
		parentId: null,
		spouseId: null,
		childrenIds: [],
		nationId: 'nation_france',
		socialClass: 'merchant',
		traits: ['ambitious'],
		skills: { trade: 7, diplomacy: 5 },
		isPlayerControlled: true,
		lifeStage: 'adult',
		health: 8,
		...overrides,
	}
}

function makeFamilyLine(overrides: Partial<FamilyLine> = {}): FamilyLine {
	return {
		id: 'family_1',
		playerId: 'player_1',
		nationId: 'nation_france',
		surname: 'Dupont',
		foundingYear: 950,
		currentHeadId: 'member_1',
		members: [makeFamilyMember()],
		reputation: 5,
		wealth: 6,
		socialClass: 'merchant',
		...overrides,
	}
}

function makeHistoricalEvent(
	overrides: Partial<HistoricalEvent> = {},
): HistoricalEvent {
	return {
		id: 'event_plague',
		name: 'Grande Peste',
		description: 'Une épidémie ravage la région',
		type: 'crisis',
		category: 'health',
		year: 1000,
		yearRange: [999, 1001],
		affectedNationIds: ['nation_france'],
		affectedRegionIds: [],
		globalEvent: false,
		triggerConditions: {
			requiredTechs: [],
			requiredEventIds: [],
			blockedByEventIds: [],
			requiredNationsExist: [],
		},
		effects: {
			stabilityModifier: -3,
			populationModifier: -10,
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'choice_quarantine',
				label: 'Quarantaine stricte',
				description: 'Isoler les malades et fermer les portes',
				effects: {
					stabilityModifier: -1,
					populationModifier: -5,
					economicModifier: -2,
				},
			},
			{
				id: 'choice_pray',
				label: 'Prière et processions',
				description: 'Organiser des processions religieuses',
				effects: {
					stabilityModifier: 1,
					populationModifier: -8,
					religiousTensionModifier: 2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: false,
			canModify: true,
			canCancel: false,
		},
		historical_outcome:
			'Des quarantaines strictes furent imposées dans certaines villes',
		status: 'triggered',
		...overrides,
	}
}

function makeEventTemplate(
	overrides: Partial<EventTemplate> = {},
): EventTemplate {
	return {
		id: 'template_market_fire',
		name: 'Incendie au marché',
		description: 'Un incendie se déclare sur la place du marché',
		category: 'economic',
		scope: 'local',
		severity: 4,
		targetClasses: ['merchant', 'artisan', 'any'],
		recurring: true,
		cooldownYears: 2,
		baseProbability: 0.1,
		triggerConditions: {},
		defaultEffects: { wealthModifier: -1, stabilityModifier: -1 },
		playerChoices: [
			{
				id: 'choice_help',
				label: 'Aider à éteindre',
				description: "Organiser une chaîne d'eau",
				effects: { reputationModifier: 2, wealthModifier: -1 },
			},
			{
				id: 'choice_save_goods',
				label: 'Sauver vos marchandises',
				description: 'Priorité à vos biens',
				effects: { reputationModifier: -1, wealthModifier: 1 },
			},
		],
		flavorTexts: ['Les flammes dévorent les étals de bois sec'],
		tags: ['fire', 'market'],
		...overrides,
	}
}

function makePlayerAction(overrides: Partial<PlayerAction> = {}): PlayerAction {
	return {
		id: 'action_trade_spices',
		playerId: 'player_1',
		nationId: 'nation_france',
		category: 'trade',
		description: "Établir une route commerciale d'épices vers l'Orient",
		target: { type: 'nation', id: 'nation_byzantium', name: 'Byzance' },
		secondaryTargets: [],
		committedResources: [{ resourceId: 'gold', quantity: 50 }],
		status: 'confirmed',
		createdAtTick: 100,
		metadata: {},
		...overrides,
	}
}

function makeNation(id: string, stability = 7): Nation {
	return {
		id,
		name: id,
		foundingYear: 800,
		capital: 'city_1',
		governmentType: 'monarchy',
		ruler: {
			name: 'Roi',
			dynastyName: 'Dynasty',
			birthYear: 950,
			age: 50,
			traits: [],
		},
		stability,
		prestige: 5,
		diplomacy: [],
		territoryIds: [],
		vassalOf: null,
		vassalIds: [],
	} as unknown as Nation
}

function makeMinimalGameState(overrides: Partial<GameState> = {}): GameState {
	return {
		currentYear: 1000,
		currentWeek: 1,
		currentSeason: 'spring',
		nations: [
			{
				...makeNation('nation_france'),
				diplomacy: [
					{ targetNationId: 'nation_england', type: 'neutral', strength: 4 },
				],
			},
			{
				...makeNation('nation_england'),
				diplomacy: [
					{ targetNationId: 'nation_france', type: 'neutral', strength: 4 },
				],
			},
		],
		populations: [
			{
				nationId: 'nation_france',
				total: 5000000,
				urbanRatio: 0.1,
				socialGroups: [],
				lifeExpectancy: 35,
				infantMortality: 0.3,
				birthRate: 0.04,
				deathRate: 0.03,
				growthRate: 0.01,
			},
			{
				nationId: 'nation_england',
				total: 2000000,
				urbanRatio: 0.1,
				socialGroups: [],
				lifeExpectancy: 33,
				infantMortality: 0.35,
				birthRate: 0.04,
				deathRate: 0.035,
				growthRate: 0.005,
			},
		],
		nationEconomies: [
			{
				nationId: 'nation_france',
				currency: 'denier',
				currencyValue: 1,
				gdpEstimate: 1000,
				taxRate: 0.1,
				tradeBalance: 50,
				mainExports: ['wheat', 'wine'],
				mainImports: ['spices'],
				tradeRouteAccess: ['route_med'],
				marketPrices: [],
			},
			{
				nationId: 'nation_england',
				currency: 'penny',
				currencyValue: 1,
				gdpEstimate: 800,
				taxRate: 0.1,
				tradeBalance: -20,
				mainExports: ['wool', 'tin'],
				mainImports: ['wine'],
				tradeRouteAccess: ['route_north'],
				marketPrices: [],
			},
		],
		nationTechnologies: [
			{
				nationId: 'nation_france',
				unlockedTechs: ['tech_iron', 'tech_plough', 'tech_wheel'],
				researchProgress: [],
				techEra: 'medieval',
			},
			{
				nationId: 'nation_england',
				unlockedTechs: ['tech_iron', 'tech_wheel'],
				researchProgress: [],
				techEra: 'medieval',
			},
		] as unknown as GameState['nationTechnologies'],
		nationMilitary: [
			{
				nationId: 'nation_france',
				armySize: 10000,
				availableUnits: [],
				militaryStrength: 6,
				navalStrength: 3,
				fortificationCount: 5,
				warExperience: 4,
				morale: 7,
				professionalArmy: false,
			},
			{
				nationId: 'nation_england',
				armySize: 5000,
				availableUnits: [],
				militaryStrength: 5,
				navalStrength: 5,
				fortificationCount: 3,
				warExperience: 3,
				morale: 6,
				professionalArmy: false,
			},
		],
		nationHealth: [
			{
				nationId: 'nation_france',
				activeDiseases: [],
				medicalKnowledge: 3,
				sanitationLevel: 2,
				herbalism: 4,
				avgNutrition: 5,
			},
			{
				nationId: 'nation_england',
				activeDiseases: [{ diseaseId: 'disease_plague', prevalence: 0.05 }],
				medicalKnowledge: 3,
				sanitationLevel: 2,
				herbalism: 3,
				avgNutrition: 4,
			},
		] as unknown as GameState['nationHealth'],
		nationReligions: [
			{
				nationId: 'nation_france',
				stateReligionId: 'rel_catholic',
				tension: 2,
				religions: [],
			},
			{
				nationId: 'nation_england',
				stateReligionId: 'rel_catholic',
				tension: 3,
				religions: [],
			},
		] as unknown as GameState['nationReligions'],
		nationLaws: [],
		nationEducation: [],
		nationWorldKnowledge: [
			{
				nationId: 'nation_france',
				knownRegions: [],
				explorationCapacity: 3,
				navalRange: 2,
				cartographyLevel: 3,
				knownNations: ['nation_england'],
				myths: [],
			},
		],
		settlements: [],
		infrastructure: [],
		familyLines: [makeFamilyLine()],
		historicalEvents: [],
		activeRumors: [],
		activeTreaties: [],
		activeConflicts: [],
		pendingDecisions: [],
		playerActions: [],
		grandMasterAlerts: [],
		tickLog: [],
		...overrides,
	}
}

function makeMinimalStaticData(): StaticData {
	return {
		technologies: [],
		commodities: [],
		diseases: [],
		climateRegions: [],
		tradeRoutes: [
			{
				id: 'route_med',
				name: 'Méditerranée',
				type: 'maritime',
				nationIds: ['nation_france', 'nation_byzantium'],
				connectsNations: ['nation_france', 'nation_byzantium'],
				startCoords: { lat: 43, lng: 5 },
				endCoords: { lat: 41, lng: 29 },
				waypoints: [],
				controllingNationId: null,
				distance: 2000,
				dangerLevel: 3,
				economicValue: 8,
				requiredTechs: [],
				discoveredYear: 800,
				description: '',
				isActive: true,
				goods: [],
			},
		] as unknown as StaticData['tradeRoutes'],
		tiles: [],
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
// DecisionEngine Tests
// ============================================================================

describe('DecisionEngine', () => {
	describe('decisionFromHistoricalEvent', () => {
		it('génère une décision avec les 3 types de choix', () => {
			const event = makeHistoricalEvent()
			const family = makeFamilyLine()
			const rng = makeRNG()

			const decision = decisionFromHistoricalEvent(event, family, 100, rng)

			expect(decision).not.toBeNull()
			expect(decision!.options.length).toBeGreaterThanOrEqual(3)
			expect(decision!.options.some((o) => o.type === 'historical')).toBe(true)
			expect(decision!.options.some((o) => o.type === 'optimal')).toBe(true)
			expect(decision!.options.some((o) => o.type === 'free')).toBe(true)
		})

		it("l'option historique référence le historical_outcome", () => {
			const event = makeHistoricalEvent()
			const family = makeFamilyLine()
			const rng = makeRNG()

			const decision = decisionFromHistoricalEvent(event, family, 100, rng)
			const histOption = decision!.options.find((o) => o.type === 'historical')

			expect(histOption!.historicalReference).toBeDefined()
			expect(histOption!.historicalReference).toContain('quarantaine')
		})

		it('retourne null si pas de playerChoices', () => {
			const event = makeHistoricalEvent({ playerChoices: [] })
			const family = makeFamilyLine()
			const rng = makeRNG()

			const decision = decisionFromHistoricalEvent(event, family, 100, rng)
			expect(decision).toBeNull()
		})

		it('convertit severity en urgency', () => {
			const event = makeHistoricalEvent({ severity: 9 })
			const family = makeFamilyLine()
			const rng = makeRNG()

			const decision = decisionFromHistoricalEvent(event, family, 100, rng)
			expect(decision!.urgency).toBe(9)
		})

		it('deadline courte pour urgence élevée', () => {
			const event = makeHistoricalEvent({ severity: 9 })
			const family = makeFamilyLine()
			const rng = makeRNG()

			const decision = decisionFromHistoricalEvent(event, family, 100, rng)
			// High urgency = 2 ticks deadline
			expect(decision!.deadlineTick - decision!.createdAtTick).toBe(2)
		})
	})

	describe('decisionFromLocalEvent', () => {
		it("génère une décision à partir d'un template local", () => {
			const template = makeEventTemplate()
			const family = makeFamilyLine()
			const rng = makeRNG()

			const decision = decisionFromLocalEvent(
				template,
				family,
				'Les flammes !',
				100,
				rng,
			)

			expect(decision).not.toBeNull()
			expect(decision!.options.length).toBeGreaterThanOrEqual(2)
			expect(decision!.source).toBe('local_event')
			expect(decision!.narrativeContext).toBe('Les flammes !')
		})

		it('filtre les choix par classe sociale', () => {
			const template = makeEventTemplate({
				playerChoices: [
					{
						id: 'noble_only',
						label: 'Décret royal',
						description: 'Seul un noble peut décréter',
						effects: {},
						requiredSocialClass: 'noble',
					},
				],
			})
			const family = makeFamilyLine({ socialClass: 'peasant' })
			const rng = makeRNG()

			const decision = decisionFromLocalEvent(template, family, '', 100, rng)
			// Should return null — no applicable choices for peasant
			expect(decision).toBeNull()
		})
	})

	describe('decisionFromPlayerAction', () => {
		it('génère une décision pour confirmer une action', () => {
			const action = makePlayerAction({ status: 'evaluated' })
			const family = makeFamilyLine()

			const decision = decisionFromPlayerAction(action, family, 100)

			expect(decision.source).toBe('player_action')
			expect(decision.options.length).toBe(4) // proceed, modify, cancel, free
			expect(
				decision.options.some((o) => o.label === 'Procéder comme prévu'),
			).toBe(true)
		})
	})

	describe('generateDecisions', () => {
		it('génère des décisions pour les événements historiques triggered', () => {
			const state = makeMinimalGameState({
				historicalEvents: [makeHistoricalEvent()],
			})
			const staticData = makeMinimalStaticData()
			const rng = makeRNG()

			const { decisions, log } = generateDecisions(
				state,
				staticData,
				DEFAULT_SIM_CONFIG,
				rng,
				100,
			)

			expect(decisions.length).toBe(1)
			expect(decisions[0].source).toBe('historical_event')
			expect(log.length).toBeGreaterThan(0)
		})

		it('ne crée pas de doublon pour le même événement', () => {
			const event = makeHistoricalEvent()
			const state = makeMinimalGameState({
				historicalEvents: [event],
				pendingDecisions: [
					{
						id: 'dec_hist_event_plague',
						playerId: 'player_1',
						nationId: 'nation_france',
						familyLineId: 'family_1',
						source: 'historical_event',
						sourceEntityId: 'event_plague',
						narrativeContext: '',
						options: [],
						urgency: 5,
						createdAtTick: 50,
						deadlineTick: 54,
						defaultOptionId: '',
						resolved: false,
					},
				],
			})
			const rng = makeRNG()

			const { decisions } = generateDecisions(
				state,
				makeMinimalStaticData(),
				DEFAULT_SIM_CONFIG,
				rng,
				100,
			)
			expect(decisions.length).toBe(0)
		})

		it('génère des décisions pour les alertes Grand Maître', () => {
			const alert: GrandMasterAlert = {
				id: 'gm_test',
				type: 'trade_opportunity',
				involvedNationIds: ['nation_france', 'nation_england'],
				affectedPlayerIds: ['player_1'],
				urgency: 3,
				description: 'Opportunité commerciale',
				imposed: false,
				createdAtTick: 90,
				processed: false,
			}
			const state = makeMinimalGameState({ grandMasterAlerts: [alert] })
			const rng = makeRNG()

			const { decisions } = generateDecisions(
				state,
				makeMinimalStaticData(),
				DEFAULT_SIM_CONFIG,
				rng,
				100,
			)
			expect(decisions.length).toBe(1)
			expect(decisions[0].source).toBe('grand_master')
			expect(alert.processed).toBe(true) // mutated
		})
	})

	describe('resolveExpiredDecisions', () => {
		it('résout automatiquement les décisions expirées', () => {
			const state = makeMinimalGameState({
				pendingDecisions: [
					{
						id: 'dec_expired',
						playerId: 'player_1',
						nationId: 'nation_france',
						familyLineId: 'family_1',
						source: 'local_event',
						narrativeContext: 'Test',
						options: [
							{
								id: 'opt_a',
								type: 'optimal',
								label: 'A',
								description: '',
								predictedEffects: [],
								risks: [],
								confidence: 0.7,
							},
							{
								id: 'opt_free',
								type: 'free',
								label: 'Free',
								description: '',
								predictedEffects: [],
								risks: [],
								confidence: 0.3,
							},
						],
						urgency: 3,
						createdAtTick: 50,
						deadlineTick: 54,
						defaultOptionId: 'opt_a',
						resolved: false,
					},
				],
			})

			const { log } = resolveExpiredDecisions(state, 60) // tick 60 > deadline 54

			expect(state.pendingDecisions[0].resolved).toBe(true)
			expect(state.pendingDecisions[0].resolvedBy).toBe('ai_timeout')
			expect(state.pendingDecisions[0].chosenOptionId).toBe('opt_a')
			expect(log.length).toBe(1)
		})

		it('ne résout pas les décisions non expirées', () => {
			const state = makeMinimalGameState({
				pendingDecisions: [
					{
						id: 'dec_fresh',
						playerId: 'player_1',
						nationId: 'nation_france',
						familyLineId: 'family_1',
						source: 'local_event',
						narrativeContext: 'Test',
						options: [],
						urgency: 3,
						createdAtTick: 50,
						deadlineTick: 100,
						defaultOptionId: '',
						resolved: false,
					},
				],
			})

			resolveExpiredDecisions(state, 60)
			expect(state.pendingDecisions[0].resolved).toBe(false)
		})
	})

	describe('resolvePlayerChoice', () => {
		it('marque la décision comme résolue par le joueur', () => {
			const decision: PendingDecision = {
				id: 'dec_test',
				playerId: 'player_1',
				nationId: 'nation_france',
				familyLineId: 'family_1',
				source: 'local_event',
				narrativeContext: 'Test',
				options: [
					{
						id: 'opt_a',
						type: 'optimal',
						label: 'A',
						description: 'Do A',
						predictedEffects: [],
						risks: [],
						confidence: 0.7,
					},
				],
				urgency: 3,
				createdAtTick: 50,
				deadlineTick: 54,
				defaultOptionId: 'opt_a',
				resolved: false,
			}

			const action = resolvePlayerChoice(decision, 'opt_a', 52)

			expect(decision.resolved).toBe(true)
			expect(decision.resolvedBy).toBe('player')
			expect(decision.chosenOptionId).toBe('opt_a')
		})

		it('retourne null pour un optionId invalide', () => {
			const decision: PendingDecision = {
				id: 'dec_test',
				playerId: 'player_1',
				nationId: 'nation_france',
				familyLineId: 'family_1',
				source: 'local_event',
				narrativeContext: 'Test',
				options: [],
				urgency: 3,
				createdAtTick: 50,
				deadlineTick: 54,
				defaultOptionId: '',
				resolved: false,
			}

			const action = resolvePlayerChoice(decision, 'nonexistent', 52)
			expect(action).toBeNull()
		})
	})
})

// ============================================================================
// GrandMaster Tests
// ============================================================================

describe('GrandMaster', () => {
	describe('evaluateWorldState', () => {
		it('détecte une menace militaire quand un voisin hostile est plus fort', () => {
			const state = makeMinimalGameState({
				nations: [
					{
						...makeNation('nation_france'),
						diplomacy: [
							{
								targetNationId: 'nation_england',
								type: 'hostile',
								strength: 2,
							},
						],
					},
					{
						...makeNation('nation_england'),
						diplomacy: [
							{ targetNationId: 'nation_france', type: 'hostile', strength: 2 },
						],
					},
				],
				nationMilitary: [
					{
						nationId: 'nation_france',
						armySize: 3000,
						availableUnits: [],
						militaryStrength: 4,
						navalStrength: 2,
						fortificationCount: 2,
						warExperience: 3,
						morale: 5,
						professionalArmy: false,
					},
					{
						nationId: 'nation_england',
						armySize: 10000,
						availableUnits: [],
						militaryStrength: 7,
						navalStrength: 5,
						fortificationCount: 5,
						warExperience: 6,
						morale: 8,
						professionalArmy: false,
					},
				],
			})
			const rng = makeRNG()

			const { alerts } = evaluateWorldState(
				state,
				makeMinimalStaticData(),
				DEFAULT_SIM_CONFIG,
				rng,
				['nation_france'],
			)

			const militaryAlert = alerts.find((a) => a.type === 'military_threat')
			expect(militaryAlert).toBeDefined()
			expect(militaryAlert!.imposed).toBe(true)
			expect(militaryAlert!.urgency).toBeGreaterThanOrEqual(5)
		})

		it('détecte une opportunité commerciale entre nations complémentaires', () => {
			const state = makeMinimalGameState({
				nationEconomies: [
					{
						nationId: 'nation_france',
						currency: 'denier',
						currencyValue: 1,
						gdpEstimate: 1000,
						taxRate: 0.1,
						tradeBalance: 50,
						mainExports: ['wheat', 'wine'],
						mainImports: ['spices', 'silk'],
						tradeRouteAccess: ['route_med'],
						marketPrices: [],
					},
					{
						nationId: 'nation_byzantium',
						currency: 'solidus',
						currencyValue: 2,
						gdpEstimate: 2000,
						taxRate: 0.15,
						tradeBalance: 100,
						mainExports: ['spices', 'silk'],
						mainImports: ['wheat'],
						tradeRouteAccess: ['route_med'],
						marketPrices: [],
					},
				] as unknown as GameState['nationEconomies'],
				nationMilitary: [
					{
						nationId: 'nation_france',
						armySize: 10000,
						availableUnits: [],
						militaryStrength: 6,
						navalStrength: 3,
						fortificationCount: 5,
						warExperience: 4,
						morale: 7,
						professionalArmy: false,
					},
				],
				nationHealth: [
					{
						nationId: 'nation_france',
						activeDiseases: [],
						medicalKnowledge: 3,
						sanitationLevel: 2,
						herbalism: 4,
						avgNutrition: 5,
					},
				] as unknown as GameState['nationHealth'],
				nationReligions: [
					{
						nationId: 'nation_france',
						stateReligionId: 'rel_catholic',
						tension: 2,
						religions: [],
					},
				] as unknown as GameState['nationReligions'],
				nations: [{ ...makeNation('nation_france'), diplomacy: [] }],
			})

			const staticData = makeMinimalStaticData()
			const rng = makeRNG()

			const { alerts } = evaluateWorldState(
				state,
				staticData,
				DEFAULT_SIM_CONFIG,
				rng,
				['nation_france'],
			)

			const tradeAlert = alerts.find((a) => a.type === 'trade_opportunity')
			expect(tradeAlert).toBeDefined()
			expect(tradeAlert!.imposed).toBe(false)
		})

		it('détecte une crise de réfugiés quand un voisin est instable', () => {
			const state = makeMinimalGameState({
				nations: [
					{
						...makeNation('nation_france', 7),
						diplomacy: [
							{
								targetNationId: 'nation_collapsed',
								type: 'neutral',
								strength: 4,
							},
						],
					},
					{
						...makeNation('nation_collapsed', 1),
						diplomacy: [
							{ targetNationId: 'nation_france', type: 'neutral', strength: 4 },
						],
					},
				],
			})
			const rng = makeRNG()

			const { alerts } = evaluateWorldState(
				state,
				makeMinimalStaticData(),
				DEFAULT_SIM_CONFIG,
				rng,
				['nation_france'],
			)

			const refugeeAlert = alerts.find((a) => a.type === 'refugee_crisis')
			expect(refugeeAlert).toBeDefined()
			expect(refugeeAlert!.imposed).toBe(true)
		})

		it('détecte un écart technologique significatif', () => {
			const state = makeMinimalGameState({
				nationTechnologies: [
					{
						nationId: 'nation_france',
						unlockedTechs: ['t1', 't2'],
						researchProgress: [],
						techEra: 'medieval',
					},
					{
						nationId: 'nation_england',
						unlockedTechs: ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8'],
						researchProgress: [],
						techEra: 'medieval',
					},
				] as unknown as GameState['nationTechnologies'],
			})
			const rng = makeRNG()

			const { alerts } = evaluateWorldState(
				state,
				makeMinimalStaticData(),
				DEFAULT_SIM_CONFIG,
				rng,
				['nation_france'],
			)

			const techAlert = alerts.find((a) => a.type === 'tech_leap')
			expect(techAlert).toBeDefined()
		})

		it("ne crée pas de doublon pour le même type d'alerte", () => {
			const existingAlert: GrandMasterAlert = {
				id: 'gm_existing',
				type: 'refugee_crisis',
				involvedNationIds: ['nation_france', 'nation_collapsed'],
				affectedPlayerIds: ['player_1'],
				urgency: 4,
				description: 'Already exists',
				imposed: true,
				createdAtTick: 50,
				processed: false,
			}
			const state = makeMinimalGameState({
				nations: [
					{
						...makeNation('nation_france', 7),
						diplomacy: [
							{
								targetNationId: 'nation_collapsed',
								type: 'neutral',
								strength: 4,
							},
						],
					},
					{
						...makeNation('nation_collapsed', 1),
						diplomacy: [
							{ targetNationId: 'nation_france', type: 'neutral', strength: 4 },
						],
					},
				],
				grandMasterAlerts: [existingAlert],
			})
			const rng = makeRNG()

			const { alerts } = evaluateWorldState(
				state,
				makeMinimalStaticData(),
				DEFAULT_SIM_CONFIG,
				rng,
				['nation_france'],
			)

			const refugeeAlerts = alerts.filter((a) => a.type === 'refugee_crisis')
			expect(refugeeAlerts.length).toBe(0) // deduped
		})
	})

	describe('calculateMaxUrgency', () => {
		it('retourne 0 si rien en attente', () => {
			const state = makeMinimalGameState()
			expect(calculateMaxUrgency(state)).toBe(0)
		})

		it("retourne l'urgence max des décisions en attente", () => {
			const state = makeMinimalGameState({
				pendingDecisions: [
					{ id: '1', urgency: 3, resolved: false } as PendingDecision,
					{ id: '2', urgency: 8, resolved: false } as PendingDecision,
					{ id: '3', urgency: 5, resolved: true } as PendingDecision, // resolved, skip
				],
			})
			expect(calculateMaxUrgency(state)).toBe(8)
		})

		it('considère les alertes non traitées', () => {
			const state = makeMinimalGameState({
				grandMasterAlerts: [
					{ id: '1', urgency: 6, processed: false } as GrandMasterAlert,
				],
			})
			expect(calculateMaxUrgency(state)).toBe(6)
		})
	})
})

// ============================================================================
// ActionResolver Tests
// ============================================================================

describe('ActionResolver', () => {
	describe('generateEffectChain', () => {
		it("génère une chaîne d'effets pour une action trade", () => {
			const action = makePlayerAction({ category: 'trade' })
			const state = makeMinimalGameState()
			const rng = makeRNG()

			const chain = generateEffectChain(
				action,
				state,
				makeMinimalStaticData(),
				rng,
			)

			expect(chain.sourceActionId).toBe(action.id)
			expect(chain.effects.length).toBeGreaterThanOrEqual(2) // exchange + reputation
			expect(chain.completed).toBe(false)
			expect(chain.effects[0].type).toBe('economic')
			expect(chain.effects[1].delayTicks).toBeGreaterThan(0) // deferred
		})

		it('génère des effets diplomatiques pour une action diplomacy', () => {
			const action = makePlayerAction({ category: 'diplomacy' })
			const state = makeMinimalGameState()
			const rng = makeRNG()

			const chain = generateEffectChain(
				action,
				state,
				makeMinimalStaticData(),
				rng,
			)

			expect(chain.effects.some((e) => e.type === 'diplomatic')).toBe(true)
			expect(chain.effects.some((e) => e.type === 'social')).toBe(true) // rumor
		})

		it('génère des effets militaires avec pénalité diplomatique', () => {
			const action = makePlayerAction({ category: 'military' })
			const state = makeMinimalGameState()
			const rng = makeRNG()

			const chain = generateEffectChain(
				action,
				state,
				makeMinimalStaticData(),
				rng,
			)

			const diplomEffect = chain.effects.find((e) => e.type === 'diplomatic')
			expect(diplomEffect).toBeDefined()
			// Military action should have negative relation adjustment
			const relMod = diplomEffect!.modifications.find(
				(m) => m.type === 'adjust_relation',
			)
			expect(relMod).toBeDefined()
			expect(Number(relMod!.value)).toBeLessThan(0)
		})

		it('génère un effet générique pour une catégorie inconnue', () => {
			const action = makePlayerAction({ category: 'new_custom_category' })
			const state = makeMinimalGameState()
			const rng = makeRNG()

			const chain = generateEffectChain(
				action,
				state,
				makeMinimalStaticData(),
				rng,
			)

			expect(chain.effects.length).toBe(1)
		})

		it("l'espionnage a une faible probabilité de succès", () => {
			const action = makePlayerAction({ category: 'espionage' })
			const state = makeMinimalGameState()
			const rng = makeRNG()

			const chain = generateEffectChain(
				action,
				state,
				makeMinimalStaticData(),
				rng,
			)

			expect(chain.effects.some((e) => e.probability <= 0.4)).toBe(true)
		})
	})

	describe('resolveActions', () => {
		it('planifie les actions confirmées et traite les effets immédiats', () => {
			const action = makePlayerAction({
				category: 'social',
				status: 'confirmed',
			})
			const state = makeMinimalGameState({ playerActions: [action] })
			const rng = makeRNG()

			const log = resolveActions(
				state,
				makeMinimalStaticData(),
				DEFAULT_SIM_CONFIG,
				rng,
				100,
			)

			expect(action.effectChain).toBeDefined()
			expect(action.status).not.toBe('confirmed') // should be scheduled or in_progress
			expect(log.length).toBeGreaterThan(0)
		})

		it('marque les actions résolues quand tous les effets sont terminés', () => {
			// Action with only immediate effects (delayTicks = 0)
			const action = makePlayerAction({
				category: 'social',
				status: 'confirmed',
			})
			const state = makeMinimalGameState({ playerActions: [action] })
			const rng = makeRNG()

			resolveActions(
				state,
				makeMinimalStaticData(),
				DEFAULT_SIM_CONFIG,
				rng,
				100,
			)

			// Social has only delay=0 effects, so should be resolved
			expect(action.status).toBe('resolved')
		})

		it("n'exécute pas les effets différés avant leur tick", () => {
			const action = makePlayerAction({
				category: 'trade',
				status: 'confirmed',
			})
			const state = makeMinimalGameState({ playerActions: [action] })
			const rng = makeRNG()

			resolveActions(
				state,
				makeMinimalStaticData(),
				DEFAULT_SIM_CONFIG,
				rng,
				100,
			)

			// Trade has deferred effects (delayTicks = 4)
			const deferredEffect = action.effectChain!.effects.find(
				(e) => e.delayTicks > 0,
			)
			expect(deferredEffect).toBeDefined()
			expect(deferredEffect!.executed).toBe(false) // not yet
		})
	})

	describe('processEffectChains', () => {
		it('exécute les effets dont le tick est venu', () => {
			const action = makePlayerAction({
				status: 'scheduled',
				resolvedAtTick: 100,
				effectChain: {
					id: 'chain_test',
					sourceActionId: 'action_trade_spices',
					effects: [
						{
							id: 'eff_delayed',
							delayTicks: 4,
							type: 'reputation',
							description: 'Test effect',
							target: { type: 'nation', id: 'nation_france', name: '' },
							probability: 1.0,
							conditions: [],
							modifications: [
								{
									type: 'modify_stability',
									targetId: 'nation_france',
									field: 'stability',
									value: 1,
									params: {},
								},
							],
							executed: false,
						},
					],
					completed: false,
				},
			})
			const state = makeMinimalGameState({ playerActions: [action] })
			const rng = makeRNG()

			const log = processEffectChains(state, 104, rng) // tick 104 = 100 + 4

			expect(action.effectChain!.effects[0].executed).toBe(true)
			expect(action.effectChain!.effects[0].outcome).toBe('triggered')
			expect(log.length).toBeGreaterThan(0)
		})

		it('skip les effets dont les conditions ne sont pas remplies', () => {
			const action = makePlayerAction({
				status: 'scheduled',
				resolvedAtTick: 100,
				effectChain: {
					id: 'chain_test',
					sourceActionId: 'action_trade_spices',
					effects: [
						{
							id: 'eff_conditional',
							delayTicks: 0,
							type: 'diplomatic',
							description: 'Needs nonexistent nation',
							target: { type: 'nation', id: 'nation_france', name: '' },
							probability: 1.0,
							conditions: [
								{
									type: 'nation_exists',
									targetId: 'nation_atlantis', // doesn't exist
									value: '',
									params: {},
								},
							],
							modifications: [],
							executed: false,
						},
					],
					completed: false,
				},
			})
			const state = makeMinimalGameState({ playerActions: [action] })
			const rng = makeRNG()

			processEffectChains(state, 100, rng)

			expect(action.effectChain!.effects[0].outcome).toBe('conditions_unmet')
		})
	})
})

// ============================================================================
// Integration: worldTick includes decision system
// ============================================================================

describe('Decision System Integration', () => {
	it('worldTick gère les 3 nouvelles étapes sans crash', () => {
		const state = makeMinimalGameState()
		const staticData = makeMinimalStaticData()
		const rng = makeRNG()

		const result = worldTick(
			state,
			staticData,
			DEFAULT_SIM_CONFIG,
			rng,
			new Set(['nation_france']),
		)

		expect(result.state.currentWeek).toBe(2) // time advanced
		expect(Array.isArray(result.state.pendingDecisions)).toBe(true)
		expect(Array.isArray(result.state.grandMasterAlerts)).toBe(true)
		expect(Array.isArray(result.state.playerActions)).toBe(true)
	})

	it('les alertes Grand Maître se propagent en décisions dans le même tick', () => {
		const state = makeMinimalGameState({
			nations: [
				{
					...makeNation('nation_france', 7),
					diplomacy: [
						{ targetNationId: 'nation_chaos', type: 'neutral', strength: 4 },
					],
				},
				{
					...makeNation('nation_chaos', 1),
					diplomacy: [
						{ targetNationId: 'nation_france', type: 'neutral', strength: 4 },
					],
				},
			],
			populations: [
				{
					nationId: 'nation_france',
					total: 5000000,
					urbanRatio: 0.1,
					socialGroups: [],
					lifeExpectancy: 35,
					infantMortality: 0.3,
					birthRate: 0.04,
					deathRate: 0.03,
					growthRate: 0.01,
				},
				{
					nationId: 'nation_chaos',
					total: 500000,
					urbanRatio: 0.05,
					socialGroups: [],
					lifeExpectancy: 25,
					infantMortality: 0.5,
					birthRate: 0.03,
					deathRate: 0.04,
					growthRate: -0.01,
				},
			],
			nationEconomies: [
				{
					nationId: 'nation_france',
					currency: 'denier',
					currencyValue: 1,
					gdpEstimate: 1000,
					taxRate: 0.1,
					tradeBalance: 50,
					mainExports: ['wheat'],
					mainImports: [],
					tradeRouteAccess: [],
					marketPrices: [],
				},
				{
					nationId: 'nation_chaos',
					currency: null,
					currencyValue: 0,
					gdpEstimate: 100,
					taxRate: 0.05,
					tradeBalance: -50,
					mainExports: [],
					mainImports: [],
					tradeRouteAccess: [],
					marketPrices: [],
				},
			] as unknown as GameState['nationEconomies'],
			nationTechnologies: [
				{
					nationId: 'nation_france',
					unlockedTechs: ['t1'],
					researchProgress: [],
					techEra: 'medieval',
				},
				{
					nationId: 'nation_chaos',
					unlockedTechs: [],
					researchProgress: [],
					techEra: 'medieval',
				},
			] as unknown as GameState['nationTechnologies'],
			nationMilitary: [
				{
					nationId: 'nation_france',
					armySize: 5000,
					availableUnits: [],
					militaryStrength: 5,
					navalStrength: 2,
					fortificationCount: 3,
					warExperience: 3,
					morale: 6,
					professionalArmy: false,
				},
				{
					nationId: 'nation_chaos',
					armySize: 500,
					availableUnits: [],
					militaryStrength: 2,
					navalStrength: 0,
					fortificationCount: 0,
					warExperience: 1,
					morale: 3,
					professionalArmy: false,
				},
			],
			nationHealth: [
				{
					nationId: 'nation_france',
					activeDiseases: [],
					medicalKnowledge: 3,
					sanitationLevel: 2,
					herbalism: 4,
					avgNutrition: 5,
				},
				{
					nationId: 'nation_chaos',
					activeDiseases: [],
					medicalKnowledge: 1,
					sanitationLevel: 1,
					herbalism: 2,
					avgNutrition: 2,
				},
			] as unknown as GameState['nationHealth'],
			nationReligions: [
				{
					nationId: 'nation_france',
					stateReligionId: 'rel_catholic',
					tension: 2,
					religions: [],
				},
				{
					nationId: 'nation_chaos',
					stateReligionId: 'rel_pagan',
					tension: 5,
					religions: [],
				},
			] as unknown as GameState['nationReligions'],
		})
		const staticData = makeMinimalStaticData()
		const rng = makeRNG()

		const result = worldTick(
			state,
			staticData,
			DEFAULT_SIM_CONFIG,
			rng,
			new Set(['nation_france']),
		)

		// Should detect refugee crisis (nation_chaos stability = 1)
		expect(result.state.grandMasterAlerts.length).toBeGreaterThan(0)

		// Alert should have been converted to a decision
		expect(result.state.pendingDecisions.length).toBeGreaterThan(0)
	})
})
