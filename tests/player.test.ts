// ============================================================================
// Tests — Phase 3: Le Joueur (Player System)
// ============================================================================

import { describe, expect, it, beforeEach } from 'vitest'
import { SeededRNG } from '../packages/simulation/src/types'
import type {
	GameState,
	StaticData,
	SimConfig,
	PendingDecision,
	GrandMasterAlert,
} from '../packages/simulation/src/types'
import { DEFAULT_SIM_CONFIG } from '../packages/simulation/src/types'
import type {
	FamilyLine,
	FamilyMember,
	Gender,
	LifeStage,
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
	SocialMobilityPath,
	SocialMobilityModifier,
	CulturalNamePool,
} from '../packages/shared/src/types/world'

// --- Player modules ---
import {
	TRAIT_CATALOG,
	SKILL_IDS,
	CLASS_SKILL_PROFILES,
	getTraitDef,
	generateTraits,
	generateSkills,
	developSkills,
	traitSkillBonus,
} from '../packages/simulation/src/player/traitSystem'

import {
	BLOCKED_STARTING_CLASSES,
	validateCreation,
	getAvailableClasses,
	generateName,
	computeLifeStage,
	createFoundingMember,
	createPlayerLineage,
} from '../packages/simulation/src/player/characterCreation'

import { simulateLifeCycle } from '../packages/simulation/src/player/lifeCycleSim'

import {
	simulateSocialMobility,
	getEligiblePaths,
	startMobilityTransition,
} from '../packages/simulation/src/player/socialMobilitySim'
import type { MobilityStateMap } from '../packages/simulation/src/player/socialMobilitySim'

import {
	CLASS_PRESSURE_PROFILES,
	applyPressure,
	getProfile,
	getVisibility,
	scaleUrgency,
	shouldReceiveImposedEvent,
} from '../packages/simulation/src/player/pressureSystem'

// ============================================================================
// Fixtures
// ============================================================================

function makeMember(overrides: Partial<FamilyMember> = {}): FamilyMember {
	return {
		id: 'member_1',
		name: 'Henri',
		gender: 'male',
		birthYear: 975,
		deathYear: null,
		parentId: null,
		spouseId: null,
		childrenIds: [],
		nationId: 'nat_france',
		socialClass: 'merchants',
		traits: ['ambitious'],
		skills: { diplomacy: 5, trade: 7, military: 2 },
		isPlayerControlled: true,
		lifeStage: 'adult',
		health: 8,
		...overrides,
	}
}

function makeFamily(overrides: Partial<FamilyLine> = {}): FamilyLine {
	return {
		id: 'family_1',
		playerId: 'player_1',
		nationId: 'nat_france',
		surname: 'Dupont',
		foundingYear: 950,
		currentHeadId: 'member_1',
		members: [makeMember()],
		reputation: 5,
		wealth: 6,
		socialClass: 'merchants',
		...overrides,
	}
}

function makeNamePool(): CulturalNamePool {
	return {
		nationIds: ['nat_france'],
		maleFirstNames: ['Henri', 'Louis', 'Charles', 'Robert'],
		femaleFirstNames: ['Marie', 'Isabelle', 'Jeanne', 'Catherine'],
		surnames: ['Dupont', 'Martin', 'Lefevre', 'Bernard'],
		titles: { royalty: 'Roi', nobility: 'Seigneur' },
		namingConvention: 'first_last',
	}
}

function makeMobilityPath(
	overrides: Partial<SocialMobilityPath> = {},
): SocialMobilityPath {
	return {
		id: 'mob_merchant_to_noble',
		fromClass: 'merchants',
		toClass: 'nobility',
		direction: 'up',
		mechanism: 'land_acquisition',
		name: 'Achat de terres',
		description: 'Un marchand achète des terres et accède à la noblesse.',
		requiredTechs: [],
		minWealth: 5,
		minReputation: 4,
		durationYears: 5,
		wealthCost: 60,
		baseSuccessRate: 0.4,
		reputationChangeOnSuccess: 2,
		reputationChangeOnFailure: -1,
		generationsRequired: 1,
		reversible: true,
		minYear: 0,
		maxYear: null,
		notes: 'test',
		...overrides,
	}
}

function makeMobilityModifier(
	overrides: Partial<SocialMobilityModifier> = {},
): SocialMobilityModifier {
	return {
		nationId: 'nat_france',
		upwardOpenness: 5,
		downwardRisk: 4,
		encouragedMechanisms: ['land_acquisition'],
		blockedMechanisms: ['rebellion'],
		clergyOpenToAll: true,
		hasMeritExam: false,
		manumissionAllowed: true,
		notes: 'test',
		...overrides,
	}
}

function makeNation(
	id: string = 'nat_france',
	name: string = 'France',
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
		tileIds: [`tile_${id}_1`],
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
	}
}

function makePopulation(nationId: string = 'nat_france'): Population {
	return {
		nationId,
		total: 100000,
		urbanRatio: 0.1,
		socialGroups: [
			{ class: 'free_peasants', percentage: 0.5, influence: 1, wealth: 2 },
			{ class: 'merchants', percentage: 0.15, influence: 4, wealth: 6 },
			{ class: 'nobility', percentage: 0.05, influence: 8, wealth: 9 },
			{ class: 'artisans', percentage: 0.1, influence: 2, wealth: 4 },
			{ class: 'clergy', percentage: 0.05, influence: 5, wealth: 5 },
			{ class: 'serfs', percentage: 0.15, influence: 0, wealth: 1 },
		],
		lifeExpectancy: 35,
		infantMortality: 0.3,
		birthRate: 0.04,
		deathRate: 0.03,
		growthRate: 0.01,
	}
}

function makeMinimalState(families: FamilyLine[] = [makeFamily()]): GameState {
	return {
		currentYear: 1000,
		currentWeek: 1,
		currentSeason: 'spring',
		nations: [makeNation()],
		populations: [makePopulation()],
		nationEconomies: [
			{
				nationId: 'nat_france',
				currency: 'denier',
				currencyValue: 1,
				gdpEstimate: 100000,
				taxRate: 0.1,
				tradeBalance: 0,
				mainExports: [],
				mainImports: [],
				tradeRouteAccess: [],
				marketPrices: [],
			},
		],
		nationTechnologies: [
			{
				nationId: 'nat_france',
				unlockedTechs: ['tech_basic_trade'],
				researchProgress: [],
				innovationCapacity: 5,
			},
		],
		nationMilitary: [
			{
				nationId: 'nat_france',
				armySize: 5000,
				availableUnits: ['infantry'],
				militaryStrength: 5,
				navalStrength: 2,
				fortificationCount: 3,
				warExperience: 4,
				morale: 7,
				professionalArmy: false,
			},
		],
		nationHealth: [
			{
				nationId: 'nat_france',
				medicalKnowledge: 3,
				sanitation: 3,
				activeDiseases: [],
				faminRisk: 2,
				overallHealth: 5,
			},
		],
		nationReligions: [
			{
				nationId: 'nat_france',
				stateReligionId: 'rel_christianity',
				religions: [
					{ religionId: 'rel_christianity', percentage: 0.9, status: 'state' },
				],
				religiousTension: 2,
			},
		],
		nationLaws: [
			{
				nationId: 'nat_france',
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
			},
		],
		nationEducation: [
			{
				nationId: 'nat_france',
				institutions: [],
				scholarPopulation: 0.02,
				knowledgeAreas: ['agriculture'],
				libraryCount: 1,
				educationAccess: 2,
			},
		],
		nationWorldKnowledge: [
			{
				nationId: 'nat_france',
				knownRegions: [],
				explorationCapacity: 3,
				navalRange: 2,
				cartographyLevel: 2,
				knownNations: [],
				myths: [],
			},
		],
		settlements: [],
		infrastructure: [],
		familyLines: families,
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

function makeMinimalStaticData(extras: Partial<StaticData> = {}): StaticData {
	return {
		technologies: [],
		commodities: [],
		diseases: [],
		climateRegions: [],
		tradeRoutes: [],
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
		culturalNamePools: [makeNamePool()],
		dailyLife: [],
		...extras,
	}
}

// ============================================================================
// 1. Trait System
// ============================================================================

describe('traitSystem', () => {
	it('TRAIT_CATALOG contains positive, negative, and neutral traits', () => {
		const positive = TRAIT_CATALOG.filter((t) => t.valence === 'positive')
		const negative = TRAIT_CATALOG.filter((t) => t.valence === 'negative')
		const neutral = TRAIT_CATALOG.filter((t) => t.valence === 'neutral')
		expect(positive.length).toBeGreaterThan(5)
		expect(negative.length).toBeGreaterThan(3)
		expect(neutral.length).toBeGreaterThan(3)
	})

	it('SKILL_IDS contains 10 base skills', () => {
		expect(SKILL_IDS).toHaveLength(10)
		expect(SKILL_IDS).toContain('diplomacy')
		expect(SKILL_IDS).toContain('military')
		expect(SKILL_IDS).toContain('trade')
	})

	it('getTraitDef returns trait definition by ID', () => {
		const brave = getTraitDef('brave')
		expect(brave).toBeDefined()
		expect(brave!.valence).toBe('positive')
		expect(getTraitDef('nonexistent')).toBeUndefined()
	})

	it('generateTraits produces 1-4 traits with seeded RNG', () => {
		const rng = new SeededRNG(42)
		const traits = generateTraits('merchants', [], rng, 3)
		expect(traits.length).toBeGreaterThanOrEqual(1)
		expect(traits.length).toBeLessThanOrEqual(4)

		// All traits must be valid IDs
		for (const t of traits) {
			expect(getTraitDef(t)).toBeDefined()
		}
	})

	it('generateTraits respects incompatibilities', () => {
		const rng = new SeededRNG(12345)
		for (let i = 0; i < 50; i++) {
			const traits = generateTraits('merchants', [], new SeededRNG(i), 4)
			// Check brave and cowardly are never together
			if (traits.includes('brave')) {
				expect(traits).not.toContain('cowardly')
			}
		}
	})

	it('generateTraits inherits from parent traits', () => {
		const rng = new SeededRNG(100)
		let inherited = 0
		for (let i = 0; i < 100; i++) {
			const traits = generateTraits(
				'merchants',
				['ambitious', 'brave'],
				new SeededRNG(i),
				3,
			)
			if (traits.includes('ambitious') || traits.includes('brave')) {
				inherited++
			}
		}
		// With heritability, should inherit at least some of the time
		expect(inherited).toBeGreaterThan(10)
	})

	it('generateSkills produces valid skill levels (0-10)', () => {
		const rng = new SeededRNG(42)
		const skills = generateSkills('merchants', ['shrewd'], rng)
		for (const [, level] of Object.entries(skills)) {
			expect(level).toBeGreaterThanOrEqual(0)
			expect(level).toBeLessThanOrEqual(10)
		}
		// Merchants should have higher trade
		expect(skills.trade).toBeGreaterThan(0)
	})

	it('generateSkills applies class profiles', () => {
		const rng = new SeededRNG(42)
		// Generate many times and check tendency
		let totalRoyalDiplo = 0
		let totalSerfDiplo = 0
		const n = 50
		for (let i = 0; i < n; i++) {
			const r = new SeededRNG(i)
			totalRoyalDiplo += generateSkills('royalty', [], r).diplomacy ?? 0
			totalSerfDiplo +=
				generateSkills('serfs', [], new SeededRNG(i + 1000)).diplomacy ?? 0
		}
		// Royalty should average higher diplomacy than serfs
		expect(totalRoyalDiplo / n).toBeGreaterThan(totalSerfDiplo / n)
	})

	it('developSkills can improve skills based on action categories', () => {
		const rng = new SeededRNG(42)
		const member = makeMember({ skills: { trade: 3, diplomacy: 2 } })
		// Run many development cycles
		let improved = false
		for (let i = 0; i < 50; i++) {
			developSkills(member, ['trade'], new SeededRNG(i))
			if (member.skills.trade > 3) {
				improved = true
				break
			}
		}
		expect(improved).toBe(true)
	})

	it('traitSkillBonus computes correct modifier', () => {
		const bonus = traitSkillBonus(['shrewd'], 'trade')
		expect(bonus).toBeGreaterThan(0)
		expect(traitSkillBonus([], 'trade')).toBe(0)
	})
})

// ============================================================================
// 2. Character Creation
// ============================================================================

describe('characterCreation', () => {
	it('computeLifeStage returns correct stages', () => {
		expect(computeLifeStage(0)).toBe('infant')
		expect(computeLifeStage(1)).toBe('infant')
		expect(computeLifeStage(5)).toBe('child')
		expect(computeLifeStage(14)).toBe('adolescent')
		expect(computeLifeStage(30)).toBe('adult')
		expect(computeLifeStage(55)).toBe('elder')
	})

	it('BLOCKED_STARTING_CLASSES blocks royalty and slaves', () => {
		expect(BLOCKED_STARTING_CLASSES).toContain('royalty')
		expect(BLOCKED_STARTING_CLASSES).toContain('slaves')
	})

	it('validateCreation rejects blocked classes', () => {
		const state = makeMinimalState()
		const staticData = makeMinimalStaticData()
		const result = validateCreation('nat_france', 'royalty', state, staticData)
		expect(result.valid).toBe(false)
		expect(result.errors.length).toBeGreaterThan(0)
	})

	it('validateCreation accepts valid creation', () => {
		const state = makeMinimalState()
		const staticData = makeMinimalStaticData()
		const result = validateCreation(
			'nat_france',
			'merchants',
			state,
			staticData,
		)
		expect(result.valid).toBe(true)
	})

	it('validateCreation rejects unknown nation', () => {
		const state = makeMinimalState()
		const staticData = makeMinimalStaticData()
		const result = validateCreation(
			'nat_unknown',
			'merchants',
			state,
			staticData,
		)
		expect(result.valid).toBe(false)
	})

	it('getAvailableClasses excludes blocked classes', () => {
		const state = makeMinimalState()
		const classes = getAvailableClasses('nat_france', state)
		expect(classes).not.toContain('royalty')
		expect(classes).not.toContain('slaves')
		expect(classes).toContain('merchants')
	})

	it('generateName produces first and surname from cultural pool', () => {
		const rng = new SeededRNG(99)
		const staticData = makeMinimalStaticData()
		const name = generateName('nat_france', 'male', staticData, rng)
		expect(name.firstName).toBeTruthy()
		expect(name.surname).toBeTruthy()
	})

	it('createFoundingMember creates valid member', () => {
		const rng = new SeededRNG(42)
		const staticData = makeMinimalStaticData()
		const { member, surname } = createFoundingMember(
			'nat_france',
			'merchants',
			'male',
			1000,
			staticData,
			rng,
		)
		expect(member.gender).toBe('male')
		expect(member.lifeStage).toBe('adult')
		expect(member.health).toBeGreaterThanOrEqual(7)
		expect(member.socialClass).toBe('merchants')
		expect(member.traits.length).toBeGreaterThanOrEqual(1)
		expect(Object.keys(member.skills).length).toBeGreaterThan(0)
		expect(surname).toBeTruthy()
	})

	it('createPlayerLineage returns valid lineage', () => {
		const rng = new SeededRNG(42)
		const state = makeMinimalState([])
		const staticData = makeMinimalStaticData()
		const result = createPlayerLineage(
			'player_1',
			'nat_france',
			'merchants',
			'male',
			state,
			staticData,
			rng,
		)
		expect(result.lineage).not.toBeNull()
		expect(result.lineage!.playerId).toBe('player_1')
		expect(result.lineage!.members.length).toBe(1)
		expect(result.lineage!.socialClass).toBe('merchants')
		expect(result.lineage!.wealth).toBeGreaterThan(0)
	})

	it('createPlayerLineage rejects blocked classes', () => {
		const rng = new SeededRNG(42)
		const state = makeMinimalState([])
		const staticData = makeMinimalStaticData()
		const result = createPlayerLineage(
			'player_1',
			'nat_france',
			'royalty',
			'male',
			state,
			staticData,
			rng,
		)
		expect(result.lineage).toBeNull()
		expect(result.errors!.length).toBeGreaterThan(0)
	})
})

// ============================================================================
// 3. Life Cycle Simulation
// ============================================================================

describe('lifeCycleSim', () => {
	const config = DEFAULT_SIM_CONFIG

	it('updates life stage when age changes bracket', () => {
		const member = makeMember({
			birthYear: 988,
			lifeStage: 'child',
		})
		const family = makeFamily({ members: [member] })
		const state = makeMinimalState([family])
		state.currentYear = 1000 // age = 12 → adolescent
		state.currentWeek = 1

		const rng = new SeededRNG(42)
		const log = simulateLifeCycle(state, makeMinimalStaticData(), config, rng)

		expect(member.lifeStage).toBe('adolescent')
		expect(log.some((l) => l.category === 'life_cycle')).toBe(true)
	})

	it('generates adolescence decision for player lineage', () => {
		const member = makeMember({
			birthYear: 988,
			lifeStage: 'child',
		})
		const family = makeFamily({ members: [member] })
		const state = makeMinimalState([family])
		state.currentYear = 1000 // 12 years old → adolescent
		state.currentWeek = 1

		const rng = new SeededRNG(42)
		simulateLifeCycle(state, makeMinimalStaticData(), config, rng)

		const apprenticeDecision = state.pendingDecisions.find((d) =>
			d.id.includes('adolescence'),
		)
		expect(apprenticeDecision).toBeDefined()
		expect(apprenticeDecision!.source).toBe('life_cycle')
	})

	it('generates elder legacy decision', () => {
		const member = makeMember({
			birthYear: 950,
			lifeStage: 'adult',
		})
		const family = makeFamily({ members: [member] })
		const state = makeMinimalState([family])
		state.currentYear = 1000 // 50 years old → elder
		state.currentWeek = 1

		const rng = new SeededRNG(42)
		simulateLifeCycle(state, makeMinimalStaticData(), config, rng)

		expect(member.lifeStage).toBe('elder')
		const elderDecision = state.pendingDecisions.find((d) =>
			d.id.includes('elder'),
		)
		expect(elderDecision).toBeDefined()
	})

	it('can generate children when married', () => {
		const member = makeMember({
			birthYear: 970,
			spouseId: 'spouse_1',
			health: 10,
		})
		const family = makeFamily({ members: [member] })
		const state = makeMinimalState([family])
		const staticData = makeMinimalStaticData()

		let childBorn = false
		// Run many anniversary weeks to trigger child birth
		for (let i = 0; i < 200; i++) {
			const rng = new SeededRNG(i)
			state.currentYear = 1000
			// Set to anniversary week
			const birthWeek = ((member.birthYear * 7) % 52) + 1
			state.currentWeek = birthWeek
			member.deathYear = null
			member.lifeStage = 'adult'

			simulateLifeCycle(state, staticData, config, rng)

			if (family.members.length > 1) {
				childBorn = true
				break
			}
		}
		expect(childBorn).toBe(true)
	})

	it('handles succession on death', () => {
		const parent = makeMember({
			id: 'parent_1',
			birthYear: 920, // 80 years old
			health: 1,
			childrenIds: ['child_1'],
		})
		const child = makeMember({
			id: 'child_1',
			name: 'Louis',
			birthYear: 970, // 30 years old
			parentId: 'parent_1',
			isPlayerControlled: false,
		})
		const family = makeFamily({
			currentHeadId: 'parent_1',
			members: [parent, child],
		})
		const state = makeMinimalState([family])
		state.currentYear = 1000
		const staticData = makeMinimalStaticData()

		let successionHappened = false
		// Run many times with anniversary week to trigger death
		for (let i = 0; i < 200; i++) {
			const rng = new SeededRNG(i)
			parent.deathYear = null
			parent.health = 1 as any
			child.isPlayerControlled = false
			family.currentHeadId = 'parent_1'

			const birthWeek = ((parent.birthYear * 7) % 52) + 1
			state.currentWeek = birthWeek

			const log = simulateLifeCycle(state, staticData, config, rng)

			if (parent.deathYear !== null) {
				successionHappened = true
				expect(family.currentHeadId).toBe('child_1')
				expect(child.isPlayerControlled).toBe(true)
				break
			}
		}
		expect(successionHappened).toBe(true)
	})

	it('handles lineage with no heir by generating distant relative', () => {
		const member = makeMember({
			birthYear: 920,
			health: 0 as any, // certain death
			childrenIds: [],
		})
		const family = makeFamily({
			members: [member],
		})
		const state = makeMinimalState([family])
		state.currentYear = 1000
		const staticData = makeMinimalStaticData()

		// Find anniversary week so death check runs
		const birthWeek = ((member.birthYear * 7) % 52) + 1
		state.currentWeek = birthWeek

		// Try many seeds to trigger death
		let handled = false
		for (let i = 0; i < 200; i++) {
			member.deathYear = null
			member.health = 0 as any
			family.members = [member]
			family.currentHeadId = 'member_1'

			const rng = new SeededRNG(i)
			const log = simulateLifeCycle(state, staticData, config, rng)

			if (member.deathYear !== null) {
				handled = true
				// Should have generated a distant relative
				expect(family.members.length).toBeGreaterThan(1)
				expect(family.currentHeadId).not.toBe('member_1')
				break
			}
		}
		expect(handled).toBe(true)
	})

	it('skips NPC lineages for life stage decisions', () => {
		const member = makeMember({
			birthYear: 988,
			lifeStage: 'child',
		})
		const family = makeFamily({
			playerId: null, // NPC
			members: [member],
		})
		const state = makeMinimalState([family])
		state.currentYear = 1000
		state.currentWeek = 1

		const rng = new SeededRNG(42)
		simulateLifeCycle(state, makeMinimalStaticData(), config, rng)

		// Stage updates but no decisions generated
		expect(member.lifeStage).toBe('adolescent')
		expect(state.pendingDecisions.length).toBe(0)
	})
})

// ============================================================================
// 4. Social Mobility
// ============================================================================

describe('socialMobilitySim', () => {
	const config = DEFAULT_SIM_CONFIG

	it('getEligiblePaths finds matching paths', () => {
		const family = makeFamily({ wealth: 6, reputation: 5 })
		const head = family.members[0]
		const state = makeMinimalState([family])
		const staticData = makeMinimalStaticData({
			socialMobilityPaths: [makeMobilityPath()],
			socialMobilityModifiers: [makeMobilityModifier()],
		})

		const paths = getEligiblePaths(family, head, state, staticData)
		expect(paths).toHaveLength(1)
		expect(paths[0].toClass).toBe('nobility')
	})

	it('getEligiblePaths filters by wealth threshold', () => {
		const family = makeFamily({ wealth: 2, reputation: 5 }) // below minWealth=5
		const head = family.members[0]
		const state = makeMinimalState([family])
		const staticData = makeMinimalStaticData({
			socialMobilityPaths: [makeMobilityPath()],
			socialMobilityModifiers: [makeMobilityModifier()],
		})

		const paths = getEligiblePaths(family, head, state, staticData)
		expect(paths).toHaveLength(0)
	})

	it('getEligiblePaths filters by blocked mechanisms', () => {
		const family = makeFamily({ wealth: 6, reputation: 5 })
		const head = family.members[0]
		const state = makeMinimalState([family])
		const staticData = makeMinimalStaticData({
			socialMobilityPaths: [
				makeMobilityPath({ mechanism: 'rebellion' }), // blocked
			],
			socialMobilityModifiers: [makeMobilityModifier()],
		})

		const paths = getEligiblePaths(family, head, state, staticData)
		expect(paths).toHaveLength(0)
	})

	it('getEligiblePaths filters by required techs', () => {
		const family = makeFamily({ wealth: 6, reputation: 5 })
		const head = family.members[0]
		const state = makeMinimalState([family])
		state.nationTechnologies[0].unlockedTechs = [] // no tech
		const staticData = makeMinimalStaticData({
			socialMobilityPaths: [
				makeMobilityPath({ requiredTechs: ['tech_guilds'] }),
			],
			socialMobilityModifiers: [makeMobilityModifier()],
		})

		const paths = getEligiblePaths(family, head, state, staticData)
		expect(paths).toHaveLength(0)
	})

	it('simulateSocialMobility generates decision on evaluation week', () => {
		const family = makeFamily({ wealth: 6, reputation: 5 })
		const state = makeMinimalState([family])
		state.currentWeek = 13 // evaluation week
		state.currentYear = 1000

		const staticData = makeMinimalStaticData({
			socialMobilityPaths: [makeMobilityPath()],
			socialMobilityModifiers: [makeMobilityModifier()],
		})

		const mobilityState: MobilityStateMap = new Map()
		const rng = new SeededRNG(42)
		const log = simulateSocialMobility(
			state,
			staticData,
			config,
			rng,
			mobilityState,
		)

		const mobilityDecisions = state.pendingDecisions.filter((d) =>
			d.id.includes('mobility'),
		)
		expect(mobilityDecisions.length).toBeGreaterThanOrEqual(1)
	})

	it('startMobilityTransition creates transition record', () => {
		const family = makeFamily()
		const state = makeMinimalState([family])
		state.currentYear = 1000

		const staticData = makeMinimalStaticData({
			socialMobilityPaths: [makeMobilityPath()],
		})

		const mobilityState: MobilityStateMap = new Map()
		const result = startMobilityTransition(
			family,
			'mob_merchant_to_noble',
			state,
			staticData,
			mobilityState,
		)

		expect(result).toBe(true)
		const transition = mobilityState.get(family.id)
		expect(transition).toBeDefined()
		expect(transition!.targetYear).toBe(1005) // 1000 + 5 years
	})

	it('simulateSocialMobility resolves completed transitions', () => {
		const family = makeFamily({ wealth: 6, reputation: 5 })
		const state = makeMinimalState([family])
		state.currentYear = 1005 // transition target year
		state.currentWeek = 13

		const staticData = makeMinimalStaticData({
			socialMobilityPaths: [makeMobilityPath({ baseSuccessRate: 1.0 })], // guaranteed success
			socialMobilityModifiers: [makeMobilityModifier()],
		})

		const mobilityState: MobilityStateMap = new Map()
		mobilityState.set(family.id, {
			pathId: 'mob_merchant_to_noble',
			familyId: family.id,
			startYear: 1000,
			targetYear: 1005,
			completed: false,
		})

		const rng = new SeededRNG(42)
		const log = simulateSocialMobility(
			state,
			staticData,
			config,
			rng,
			mobilityState,
		)

		// Should have transitioned
		expect(family.socialClass).toBe('nobility')
		expect(log.some((l) => l.category === 'social_mobility')).toBe(true)
	})
})

// ============================================================================
// 5. Pressure System
// ============================================================================

describe('pressureSystem', () => {
	it('CLASS_PRESSURE_PROFILES exists for all major classes', () => {
		expect(CLASS_PRESSURE_PROFILES.royalty).toBeDefined()
		expect(CLASS_PRESSURE_PROFILES.serfs).toBeDefined()
		expect(CLASS_PRESSURE_PROFILES.merchants).toBeDefined()
	})

	it('royalty has highest visibility and urgency', () => {
		const royalty = CLASS_PRESSURE_PROFILES.royalty
		const peasant = CLASS_PRESSURE_PROFILES.free_peasants
		expect(royalty.visibility).toBeGreaterThan(peasant.visibility)
		expect(royalty.urgencyMultiplier).toBeGreaterThan(peasant.urgencyMultiplier)
		expect(royalty.annualMaintenanceCost).toBeGreaterThan(
			peasant.annualMaintenanceCost,
		)
	})

	it('getProfile returns correct profile or default', () => {
		const profile = getProfile('royalty')
		expect(profile.visibility).toBe(10)
		const unknown = getProfile('unknown_class' as any)
		expect(unknown.visibility).toBe(3) // default
	})

	it('getVisibility combines class and reputation', () => {
		const lowRep = makeFamily({ socialClass: 'serfs', reputation: 1 })
		const highRep = makeFamily({ socialClass: 'nobility', reputation: 9 })
		expect(getVisibility(highRep)).toBeGreaterThan(getVisibility(lowRep))
	})

	it('scaleUrgency multiplies by class profile', () => {
		const royalUrgency = scaleUrgency(5 as any, 'royalty')
		const serfUrgency = scaleUrgency(5 as any, 'serfs')
		expect(royalUrgency).toBeGreaterThan(serfUrgency)
	})

	it('shouldReceiveImposedEvent fires more for higher classes', () => {
		const royalFamily = makeFamily({ socialClass: 'royalty' })
		const serfFamily = makeFamily({ socialClass: 'serfs' })

		let royalEvents = 0
		let serfEvents = 0
		for (let i = 0; i < 1000; i++) {
			const rng = new SeededRNG(i)
			if (shouldReceiveImposedEvent(royalFamily, rng)) royalEvents++
			if (shouldReceiveImposedEvent(serfFamily, new SeededRNG(i + 5000)))
				serfEvents++
		}

		expect(royalEvents).toBeGreaterThan(serfEvents)
	})

	it('applyPressure scales urgency of pending decisions', () => {
		const family = makeFamily({ socialClass: 'royalty' })
		const state = makeMinimalState([family])
		state.pendingDecisions = [
			{
				id: 'test_dec',
				playerId: 'player_1',
				nationId: 'nat_france',
				familyLineId: 'family_1',
				source: 'life_cycle',
				narrativeContext: 'test',
				options: [],
				urgency: 3 as any,
				createdAtTick: 1,
				deadlineTick: 10,
				defaultOptionId: 'opt_1',
				resolved: false,
			},
		]

		const rng = new SeededRNG(42)
		applyPressure(state, makeMinimalStaticData(), DEFAULT_SIM_CONFIG, rng)

		// Royalty urgency multiplier is 2.0 → 3 * 2.0 = 6
		expect(state.pendingDecisions[0].urgency).toBeGreaterThanOrEqual(6)
	})

	it('applyPressure can deplete wealth for high-class families', () => {
		const family = makeFamily({ socialClass: 'royalty', wealth: 5 })
		const state = makeMinimalState([family])

		let wealthDecreased = false
		for (let i = 0; i < 500; i++) {
			family.wealth = 5 as any
			const rng = new SeededRNG(i)
			applyPressure(state, makeMinimalStaticData(), DEFAULT_SIM_CONFIG, rng)
			if (family.wealth < 5) {
				wealthDecreased = true
				break
			}
		}
		expect(wealthDecreased).toBe(true)
	})
})
