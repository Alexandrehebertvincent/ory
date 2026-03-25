// ============================================================================
// Tests — Advisor IA Pipeline
// ============================================================================

import { describe, expect, it } from 'vitest'

// --- Advisor modules ---
import { detectIntent } from '../packages/simulation/src/advisor/intentDetector'
import {
	evaluateFeasibility,
	matchFeasibilityRules,
} from '../packages/simulation/src/advisor/feasibilityEvaluator'
import type {
	FeasibilityResult,
	PlayerContext,
} from '../packages/simulation/src/advisor/feasibilityEvaluator'
import {
	searchKnowledge,
	searchKnowledgeFromIntent,
} from '../packages/simulation/src/advisor/knowledgeMatcher'
import type { KnowledgeSearchCriteria } from '../packages/simulation/src/advisor/knowledgeMatcher'
import {
	selectTemplate,
	fillTemplate,
	assembleKnowledgeResponse,
	assembleFeasibilityResponse,
	assembleGreeting,
	buildVariablesFromKnowledge,
} from '../packages/simulation/src/advisor/responseAssembler'
import {
	selectAdvisorProfile,
	processAdvisorQuery,
} from '../packages/simulation/src/advisor/advisorOrchestrator'
import type {
	AdvisorStaticData,
	AdvisorPlayerData,
	AdvisorQuery,
} from '../packages/simulation/src/advisor/advisorOrchestrator'

// --- Types ---
import type {
	AdvisorProfile,
	AdvisorResponseTemplate,
	FeasibilityRule,
	KnowledgeEntry,
	NationTechnology,
	NationEconomy,
} from '../packages/shared/src/types/world'

// ============================================================================
// Fixtures
// ============================================================================

function makeAdvisorProfile(
	id: string,
	overrides: Partial<AdvisorProfile> = {},
): AdvisorProfile {
	return {
		id,
		name: `Advisor ${id}`,
		description: 'Test advisor',
		availableToClasses: ['peasant', 'artisan', 'merchant', 'noble'],
		primaryDomains: ['agriculture', 'construction'],
		secondaryDomains: ['trade'],
		speechStyle: 'Parle en proverbes. Tutoie.',
		minYear: 0,
		requiredTechs: [],
		culturalFilters: [],
		greetings: ['Bonjour, ami.', 'Salut !'],
		deflections: [
			"Ce n'est pas mon domaine. Va voir un autre.",
			'Ça me dépasse.',
		],
		...overrides,
	}
}

function makeElderProfile(): AdvisorProfile {
	return makeAdvisorProfile('adv_village_elder', {
		name: 'Ancien du village',
		availableToClasses: ['peasant', 'artisan'],
		primaryDomains: ['agriculture', 'husbandry', 'natural_history', 'cooking'],
		secondaryDomains: ['medicine', 'theology', 'construction'],
		speechStyle: 'Parle en proverbes et métaphores agricoles. Tutoie.',
	})
}

function makeProfessorProfile(): AdvisorProfile {
	return makeAdvisorProfile('adv_university_professor', {
		name: 'Professeur universitaire',
		availableToClasses: ['clergy', 'noble', 'merchant', 'artisan'],
		primaryDomains: ['philosophy', 'theology', 'law', 'medicine', 'astronomy'],
		secondaryDomains: ['alchemy', 'natural_history', 'linguistics'],
		speechStyle: 'Érudit, vouvoie, cite les autorités.',
		minYear: 1150,
		requiredTechs: ['tech_university'],
	})
}

function makeKnowledgeEntry(
	id: string,
	overrides: Partial<KnowledgeEntry> = {},
): KnowledgeEntry {
	return {
		id,
		domain: 'agriculture',
		title: 'Labour et semailles',
		description: 'Comment cultiver...',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe'],
		knowledgeLevel: 'mastered',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['grain'],
		keywords: ['labourer', 'semer', 'cultiver', 'blé', 'champ', 'terre'],
		directAnswer: 'Pour cultiver un champ, il faut labourer la terre...',
		referrals: [
			{
				type: 'npc_type',
				target: 'paysan_ancien',
				reason: 'Connaît les rythmes de la terre',
				domain: 'agriculture',
			},
		],
		...overrides,
	}
}

function makeFeasibilityRule(
	id: string,
	overrides: Partial<FeasibilityRule> = {},
): FeasibilityRule {
	return {
		id,
		triggerKeywords: ['château', 'forteresse', 'château fort'],
		intentCategory: 'build',
		requiredTechs: ['tech_stone_masonry', 'tech_fortification'],
		requiredResources: ['stone', 'wood', 'iron'],
		requiredKnowledge: [],
		responseIfFeasible: 'Un château fort, tout à fait réalisable.',
		responseIfMissingTech:
			"Construire un château exige des savoirs que tu n'as pas.",
		responseIfMissingResource: 'Les moyens manquent.',
		responseIfInconceivable: 'Un château ? Ce mot a-t-il un sens ?',
		minYear: 800,
		maxYear: 1500,
		domain: 'construction',
		...overrides,
	}
}

function makeTemplate(
	id: string,
	overrides: Partial<AdvisorResponseTemplate> = {},
): AdvisorResponseTemplate {
	return {
		id,
		situation: 'knowledge_shared',
		domain: null,
		advisorProfileId: null,
		template: 'Voici ce que je sais sur {knowledgeTitle} :\n\n{directAnswer}',
		tone: 'pragmatic',
		minYear: 0,
		maxYear: 9999,
		...overrides,
	}
}

function makePlayerContext(
	overrides: Partial<PlayerContext> = {},
): PlayerContext {
	return {
		nationId: 'nat_a',
		nationTechs: [
			{
				nationId: 'nat_a',
				unlockedTechs: ['tech_stone_masonry', 'tech_fortification'],
				researchProgress: [],
				innovationCapacity: 5,
			},
		],
		nationEconomy: {
			nationId: 'nat_a',
			currency: 'gold',
			currencyValue: 1,
			gdpEstimate: 100000,
			taxRate: 0.1,
			tradeBalance: 0,
			mainExports: ['stone', 'wood'],
			mainImports: ['iron'],
			tradeRouteAccess: [],
			marketPrices: [
				{ commodityId: 'stone', price: 5 },
				{ commodityId: 'wood', price: 3 },
				{ commodityId: 'iron', price: 10 },
			],
		},
		nationKnowledgeIds: ['know_stone_masonry'],
		currentYear: 1000,
		...overrides,
	}
}

// ============================================================================
// Tests — Feasibility Evaluator
// ============================================================================

describe('FeasibilityEvaluator', () => {
	const castleRule = makeFeasibilityRule('feas_build_castle')
	const rules = [castleRule]

	it('matches a rule by keyword + intent', () => {
		const intent = detectIntent('Je veux construire un château fort')
		const matches = matchFeasibilityRules(intent, rules, 1000)
		expect(matches.length).toBeGreaterThan(0)
		expect(matches[0].rule.id).toBe('feas_build_castle')
	})

	it('returns no match if year out of range', () => {
		const intent = detectIntent('Je veux construire un château')
		const matches = matchFeasibilityRules(intent, rules, 1600)
		expect(matches.length).toBe(0)
	})

	it('evaluates as feasible when all prereqs met', () => {
		const intent = detectIntent('Je veux construire un château fort')
		const ctx = makePlayerContext()
		const result = evaluateFeasibility(intent, ctx, rules, [])
		expect(result.matchedRule).not.toBeNull()
		expect(result.outcome).toBe('feasible')
		expect(result.missingTechs).toHaveLength(0)
	})

	it('evaluates as missing_tech when techs are absent', () => {
		const intent = detectIntent('Je veux construire un château')
		const ctx = makePlayerContext({
			nationTechs: [
				{
					nationId: 'nat_a',
					unlockedTechs: [],
					researchProgress: [],
					innovationCapacity: 5,
				},
			],
		})
		const result = evaluateFeasibility(intent, ctx, rules, [])
		expect(result.outcome).toBe('missing_tech')
		expect(result.missingTechs).toContain('tech_stone_masonry')
	})

	it('evaluates as missing_resource when techs ok but resources missing', () => {
		const intent = detectIntent('Je veux construire un château')
		const ctx = makePlayerContext({
			nationEconomy: {
				nationId: 'nat_a',
				currency: 'gold',
				currencyValue: 1,
				gdpEstimate: 100000,
				taxRate: 0.1,
				tradeBalance: 0,
				mainExports: [],
				mainImports: [],
				tradeRouteAccess: [],
				marketPrices: [], // no resources
			},
		})
		const result = evaluateFeasibility(intent, ctx, rules, [])
		expect(result.outcome).toBe('missing_resource')
		expect(result.missingResources.length).toBeGreaterThan(0)
	})

	it('returns no matchedRule for unrelated queries', () => {
		const intent = detectIntent('Comment comprendre la science ?')
		const result = evaluateFeasibility(intent, makePlayerContext(), rules, [])
		expect(result.matchedRule).toBeNull()
	})

	it('picks correct response text for each outcome', () => {
		const intent = detectIntent('Je veux construire un château fort')
		const ctxFeasible = makePlayerContext()
		const r1 = evaluateFeasibility(intent, ctxFeasible, rules, [])
		expect(r1.responseText).toContain('réalisable')

		const ctxNoTech = makePlayerContext({
			nationTechs: [
				{
					nationId: 'nat_a',
					unlockedTechs: [],
					researchProgress: [],
					innovationCapacity: 5,
				},
			],
		})
		const r2 = evaluateFeasibility(intent, ctxNoTech, rules, [])
		expect(r2.responseText).toContain('savoirs')
	})
})

// ============================================================================
// Tests — Knowledge Matcher
// ============================================================================

describe('KnowledgeMatcher', () => {
	const entries = [
		makeKnowledgeEntry('know_basic_farming', {
			domain: 'agriculture',
			title: 'Labour et semailles',
			keywords: [
				'labourer',
				'semer',
				'cultiver',
				'blé',
				'champ',
				'terre',
				'récolte',
			],
		}),
		makeKnowledgeEntry('know_iron_smelting', {
			domain: 'metallurgy',
			title: 'Fonte du fer',
			keywords: ['fer', 'forge', 'fondre', 'métal', 'minerai'],
			directAnswer: 'Pour fondre le fer...',
			requiredTechs: ['tech_iron_working'],
		}),
		makeKnowledgeEntry('know_navigation', {
			domain: 'navigation',
			title: 'Navigation côtière',
			keywords: ['naviguer', 'navire', 'mer', 'cabotage', 'côte'],
			validFrom: 800,
			validTo: 1200,
		}),
		makeKnowledgeEntry('know_future_tech', {
			domain: 'engineering',
			title: 'Machine à vapeur',
			keywords: ['vapeur', 'machine', 'pression'],
			validFrom: 1700,
			validTo: 9999,
			knowledgeLevel: 'unknown',
		}),
	]

	it('finds knowledge by keywords', () => {
		const criteria: KnowledgeSearchCriteria = {
			keywords: ['labourer', 'blé'],
			currentYear: 1000,
			playerTechIds: new Set(),
			playerKnowledgeIds: new Set(),
		}
		const results = searchKnowledge(criteria, entries)
		expect(results.length).toBeGreaterThan(0)
		expect(results[0].entry.id).toBe('know_basic_farming')
	})

	it('does not return entries outside valid year range', () => {
		const criteria: KnowledgeSearchCriteria = {
			keywords: ['vapeur', 'machine'],
			currentYear: 1000,
			playerTechIds: new Set(),
			playerKnowledgeIds: new Set(),
		}
		const results = searchKnowledge(criteria, entries)
		expect(results.length).toBe(0) // future tech, not visible in 1000
	})

	it('boosts score for matching domain', () => {
		const criteria: KnowledgeSearchCriteria = {
			keywords: ['fer'],
			domain: 'metallurgy',
			currentYear: 1000,
			playerTechIds: new Set(['tech_iron_working']),
			playerKnowledgeIds: new Set(),
		}
		const results = searchKnowledge(criteria, entries)
		expect(results.length).toBeGreaterThan(0)
		expect(results[0].entry.id).toBe('know_iron_smelting')
	})

	it('degrades effective level when techs are missing', () => {
		const criteria: KnowledgeSearchCriteria = {
			keywords: ['fer', 'fondre'],
			currentYear: 1000,
			playerTechIds: new Set(), // no tech_iron_working
			playerKnowledgeIds: new Set(),
		}
		const results = searchKnowledge(criteria, entries)
		// Iron smelting requires tech_iron_working — should be degraded
		const ironMatch = results.find((r) => r.entry.id === 'know_iron_smelting')
		if (ironMatch) {
			expect(ironMatch.effectiveLevel).not.toBe('mastered')
		}
	})

	it('boosts score for advisor domain match', () => {
		const elder = makeElderProfile()
		const criteria: KnowledgeSearchCriteria = {
			keywords: ['cultiver'],
			currentYear: 1000,
			playerTechIds: new Set(),
			playerKnowledgeIds: new Set(),
		}
		const withAdvisor = searchKnowledge(criteria, entries, elder)
		const withoutAdvisor = searchKnowledge(criteria, entries)

		// Both should find farming, but with advisor the score should be higher
		expect(withAdvisor[0].entry.id).toBe('know_basic_farming')
		expect(withAdvisor[0].inAdvisorDomain).toBe(true)
		expect(withAdvisor[0].score).toBeGreaterThanOrEqual(withoutAdvisor[0].score)
	})

	it('limits results to requested count', () => {
		const criteria: KnowledgeSearchCriteria = {
			keywords: ['e'], // broad match
			currentYear: 1000,
			playerTechIds: new Set(['tech_iron_working']),
			playerKnowledgeIds: new Set(),
			limit: 2,
		}
		const results = searchKnowledge(criteria, entries)
		expect(results.length).toBeLessThanOrEqual(2)
	})

	it('searchKnowledgeFromIntent maps intent to domain', () => {
		const intent = detectIntent('Comment cultiver le blé ?')
		const results = searchKnowledgeFromIntent(
			intent,
			entries,
			new Set(),
			new Set(),
			1000,
		)
		expect(results.length).toBeGreaterThan(0)
		expect(results[0].entry.domain).toBe('agriculture')
	})
})

// ============================================================================
// Tests — Response Assembler
// ============================================================================

describe('ResponseAssembler', () => {
	const templates = [
		makeTemplate('tpl_knowledge_generic', {
			situation: 'knowledge_shared',
			tone: 'pragmatic',
		}),
		makeTemplate('tpl_knowledge_scholarly', {
			situation: 'knowledge_shared',
			tone: 'scholarly',
			template:
				'La question de {knowledgeTitle} est fort intéressante. {directAnswer}',
		}),
		makeTemplate('tpl_rumor_generic', {
			situation: 'rumor_shared',
			tone: 'familiar',
			template:
				"J'ai ouï dire que {directAnswer}. {referralTarget} en sait plus.",
		}),
		makeTemplate('tpl_feasible_generic', {
			situation: 'feasible',
			tone: 'pragmatic',
			template: "C'est réalisable. {resourceName} est nécessaire.",
		}),
		makeTemplate('tpl_missing_tech', {
			situation: 'missing_tech',
			tone: 'pragmatic',
			template: 'Il faudrait maîtriser {techName}.',
		}),
		makeTemplate('tpl_elder_knowledge', {
			situation: 'knowledge_shared',
			advisorProfileId: 'adv_village_elder',
			tone: 'familiar',
			template: 'Mon père disait : {directAnswer}\nVa voir {referralTarget}.',
		}),
		makeTemplate('tpl_unknown', {
			situation: 'unknown_topic',
			tone: 'pragmatic',
			template: 'Je ne connais rien de tel.',
		}),
	]

	it('fillTemplate replaces placeholders', () => {
		const result = fillTemplate('Bonjour {playerName}, voici {techName}.', {
			playerName: 'Jean',
			techName: "l'imprimerie",
		})
		expect(result).toBe("Bonjour Jean, voici l'imprimerie.")
	})

	it('fillTemplate keeps unknown placeholders', () => {
		const result = fillTemplate('Cherchez {unknown}.', {})
		expect(result).toBe('Cherchez {unknown}.')
	})

	it('selectTemplate picks archetype-specific over generic', () => {
		const elder = makeElderProfile()
		const tpl = selectTemplate(templates, 'knowledge_shared', 1000, elder)
		expect(tpl?.id).toBe('tpl_elder_knowledge')
	})

	it('selectTemplate falls back to generic when no archetype match', () => {
		const professor = makeProfessorProfile()
		const tpl = selectTemplate(templates, 'knowledge_shared', 1200, professor)
		// Should not pick elder-specific template
		expect(tpl?.advisorProfileId).not.toBe('adv_village_elder')
	})

	it('selectTemplate filters by year', () => {
		const tpl = selectTemplate(
			[
				makeTemplate('tpl_future', {
					situation: 'knowledge_shared',
					minYear: 1600,
					maxYear: 9999,
				}),
			],
			'knowledge_shared',
			1000,
		)
		expect(tpl).toBeNull()
	})

	it('assembleKnowledgeResponse produces text with variables', () => {
		const match = {
			entry: makeKnowledgeEntry('know_farming'),
			score: 0.8,
			effectiveLevel: 'mastered' as const,
			inAdvisorDomain: true,
		}
		const advisor = makeElderProfile()
		const response = assembleKnowledgeResponse(
			match,
			templates,
			1000,
			advisor,
			'Pierre',
		)
		expect(response.text).toContain('cultiver')
		expect(response.situation).toBe('knowledge_shared')
	})

	it('assembleKnowledgeResponse uses rumor template for rumored level', () => {
		const match = {
			entry: makeKnowledgeEntry('know_rumor', {
				directAnswer: 'Des voyageurs disent...',
			}),
			score: 0.6,
			effectiveLevel: 'rumored' as const,
			inAdvisorDomain: true,
		}
		const response = assembleKnowledgeResponse(match, templates, 1000)
		expect(response.situation).toBe('rumor_shared')
	})

	it('assembleFeasibilityResponse uses rule text directly', () => {
		const feasResult: FeasibilityResult = {
			matchedRule: makeFeasibilityRule('feas_test'),
			outcome: 'feasible',
			missingTechs: [],
			missingResources: [],
			missingKnowledge: [],
			presentTechs: ['tech_stone_masonry'],
			presentResources: ['stone'],
			responseText: 'Tout est prêt pour la construction !',
			matchScore: 0.9,
		}
		const response = assembleFeasibilityResponse(feasResult, templates, 1000)
		expect(response.text).toBe('Tout est prêt pour la construction !')
	})

	it('assembleGreeting picks from profile greetings as fallback', () => {
		const advisor = makeElderProfile()
		const response = assembleGreeting([], advisor, 1000, 'Pierre')
		// No greeting template → should use profile greetings
		expect(response.fromTemplate).toBe(false)
		expect(advisor.greetings).toContain(response.text)
	})
})

// ============================================================================
// Tests — Advisor Profile Selection
// ============================================================================

describe('AdvisorProfileSelection', () => {
	const profiles = [makeElderProfile(), makeProfessorProfile()]

	it('selects elder for peasant in year 1000', () => {
		const advisor = selectAdvisorProfile(profiles, 'peasant', 1000, new Set())
		expect(advisor.id).toBe('adv_village_elder')
	})

	it('selects professor when available (year + tech)', () => {
		const advisor = selectAdvisorProfile(
			profiles,
			'merchant',
			1200,
			new Set(['tech_university']),
		)
		expect(advisor.id).toBe('adv_university_professor')
	})

	it('falls back to elder if professor not yet available', () => {
		const advisor = selectAdvisorProfile(profiles, 'noble', 1000, new Set())
		// Professor requires minYear 1150 + tech_university
		expect(advisor.id).toBe('adv_village_elder')
	})

	it('prefers most advanced profile (highest minYear)', () => {
		const advisor = selectAdvisorProfile(
			profiles,
			'artisan',
			1200,
			new Set(['tech_university']),
		)
		// Both available, professor has higher minYear
		expect(advisor.id).toBe('adv_university_professor')
	})
})

// ============================================================================
// Tests — Full Orchestrator Pipeline
// ============================================================================

describe('AdvisorOrchestrator', () => {
	const staticData: AdvisorStaticData = {
		advisorProfiles: [makeElderProfile(), makeProfessorProfile()],
		feasibilityRules: [
			makeFeasibilityRule('feas_build_castle'),
			makeFeasibilityRule('feas_improve_farming', {
				triggerKeywords: ['améliorer', 'agriculture', 'récolte', 'rotation'],
				intentCategory: 'farm',
				requiredTechs: ['tech_crop_rotation'],
				requiredResources: ['grain'],
				responseIfFeasible: 'La rotation des cultures est à ta portée.',
				responseIfMissingTech:
					'Il faudrait maîtriser la rotation des cultures.',
				responseIfMissingResource: 'Il te manque des semences.',
				responseIfInconceivable: 'Nous ne connaissons pas cela.',
				domain: 'agriculture',
				minYear: 0,
				maxYear: 9999,
			}),
		],
		knowledgeEntries: [
			makeKnowledgeEntry('know_basic_farming', {
				keywords: [
					'labourer',
					'semer',
					'cultiver',
					'blé',
					'champ',
					'terre',
					'récolte',
					'agriculture',
				],
			}),
			makeKnowledgeEntry('know_iron_smelting', {
				domain: 'metallurgy',
				title: 'Fonte du fer',
				keywords: ['fer', 'forge', 'fondre', 'métal'],
				directAnswer: 'Pour fondre le fer...',
				requiredTechs: ['tech_iron_working'],
			}),
		],
		advisorResponseTemplates: [
			makeTemplate('tpl_knowledge_generic'),
			makeTemplate('tpl_feasible', {
				situation: 'feasible',
				template: "C'est réalisable. {resourceName}.",
			}),
			makeTemplate('tpl_missing_tech', {
				situation: 'missing_tech',
				template: 'Il faudrait {techName}.',
			}),
			makeTemplate('tpl_unknown', {
				situation: 'unknown_topic',
				template: 'Je ne sais rien là-dessus.',
			}),
		],
	}

	const playerData: AdvisorPlayerData = {
		nationTechs: [
			{
				nationId: 'nat_a',
				unlockedTechs: ['tech_stone_masonry', 'tech_fortification'],
				researchProgress: [],
				innovationCapacity: 5,
			},
		],
		nationEconomy: {
			nationId: 'nat_a',
			currency: 'gold',
			currencyValue: 1,
			gdpEstimate: 100000,
			taxRate: 0.1,
			tradeBalance: 0,
			mainExports: ['stone', 'wood'],
			mainImports: [],
			tradeRouteAccess: [],
			marketPrices: [
				{ commodityId: 'stone', price: 5 },
				{ commodityId: 'wood', price: 3 },
				{ commodityId: 'iron', price: 10 },
			],
		},
		nationKnowledgeIds: [],
		currentYear: 1000,
	}

	it('processes a build query with feasibility', () => {
		const query: AdvisorQuery = {
			text: 'Je veux construire un château fort',
			playerId: 'player_1',
			playerName: 'Pierre',
			nationId: 'nat_a',
			playerClass: 'peasant',
		}
		const response = processAdvisorQuery(query, staticData, playerData)

		expect(response.intent.category).toBe('build')
		expect(response.advisor).toBeDefined()
		expect(response.feasibility).not.toBeNull()
		expect(response.feasibility?.outcome).toBe('feasible')
		expect(response.text.length).toBeGreaterThan(0)
	})

	it('processes a learn query with knowledge', () => {
		const query: AdvisorQuery = {
			text: 'Comment cultiver le blé ?',
			playerId: 'player_1',
			nationId: 'nat_a',
			playerClass: 'peasant',
		}
		const response = processAdvisorQuery(query, staticData, playerData)

		expect(response.intent.category).toBe('farm')
		expect(response.knowledgeMatches.length).toBeGreaterThan(0)
		expect(response.text.length).toBeGreaterThan(0)
	})

	it('sets needsLLM=true for vague queries', () => {
		const query: AdvisorQuery = {
			text: 'Parle-moi de ton enfance',
			playerId: 'player_1',
			nationId: 'nat_a',
			playerClass: 'peasant',
		}
		const response = processAdvisorQuery(query, staticData, playerData)

		expect(response.needsLLM).toBe(true)
		expect(response.answeredAutonomously).toBe(false)
	})

	it('provides llmContext when escalation needed', () => {
		const query: AdvisorQuery = {
			text: 'Que penses-tu de la vie ?',
			playerId: 'player_1',
			nationId: 'nat_a',
			playerClass: 'peasant',
		}
		const response = processAdvisorQuery(query, staticData, playerData)

		if (response.needsLLM) {
			expect(response.llmContext).not.toBeNull()
			expect(response.llmContext?.originalQuery).toBe(
				'Que penses-tu de la vie ?',
			)
			expect(response.llmContext?.advisorPersona.name).toBeDefined()
		}
	})

	it('selects appropriate advisor for player class', () => {
		const query: AdvisorQuery = {
			text: 'Bonjour',
			playerId: 'player_1',
			nationId: 'nat_a',
			playerClass: 'peasant',
		}
		const response = processAdvisorQuery(query, staticData, playerData)
		expect(response.advisor.id).toBe('adv_village_elder')
	})

	it('handles missing_tech scenario end-to-end', () => {
		const noTechPlayerData: AdvisorPlayerData = {
			...playerData,
			nationTechs: [
				{
					nationId: 'nat_a',
					unlockedTechs: [],
					researchProgress: [],
					innovationCapacity: 5,
				},
			],
		}
		const query: AdvisorQuery = {
			text: 'Je veux construire un château',
			playerId: 'player_1',
			nationId: 'nat_a',
			playerClass: 'peasant',
		}
		const response = processAdvisorQuery(query, staticData, noTechPlayerData)

		expect(response.feasibility?.outcome).toBe('missing_tech')
		expect(response.text).toContain('savoirs')
	})
})

// ============================================================================
// Tests — PlayerAction & EffectChain types (structural)
// ============================================================================

describe('PlayerAction types (structural)', () => {
	it('PlayerAction accepts standard categories', () => {
		const action: import('../packages/simulation/src/types').PlayerAction = {
			id: 'act_1',
			playerId: 'player_1',
			nationId: 'nat_a',
			category: 'gift',
			description: 'Donner ma fortune au voisin',
			target: { type: 'nation', id: 'nat_b', name: 'Beta' },
			secondaryTargets: [],
			committedResources: [{ resourceId: 'gold', quantity: 10000 }],
			status: 'proposed',
			createdAtTick: 52,
			metadata: {},
		}
		expect(action.category).toBe('gift')
		expect(action.status).toBe('proposed')
	})

	it('PlayerAction accepts custom extensible categories', () => {
		const action: import('../packages/simulation/src/types').PlayerAction = {
			id: 'act_2',
			playerId: 'player_1',
			nationId: 'nat_a',
			category: 'custom_wedding_alliance', // extensible !
			description: 'Mariage diplomatique',
			target: { type: 'player', id: 'player_2', name: 'Marie' },
			secondaryTargets: [{ type: 'nation', id: 'nat_b', name: 'Beta' }],
			committedResources: [],
			status: 'proposed',
			createdAtTick: 100,
			metadata: { dowry: 5000, alliance_terms: 'mutual_defense' },
		}
		expect(action.category).toBe('custom_wedding_alliance')
	})

	it('EffectChain holds scheduled effects with conditions', () => {
		const chain: import('../packages/simulation/src/types').EffectChain = {
			id: 'chain_1',
			sourceActionId: 'act_1',
			effects: [
				{
					id: 'eff_1',
					delayTicks: 0,
					type: 'economic',
					description: 'Transfer de richesse immédiat',
					target: { type: 'nation', id: 'nat_b', name: 'Beta' },
					probability: 1.0,
					conditions: [],
					modifications: [
						{
							type: 'transfer_resource',
							targetId: 'nat_b',
							field: 'gdpEstimate',
							value: 10000,
							params: {},
						},
					],
					executed: false,
				},
				{
					id: 'eff_2',
					delayTicks: 4,
					type: 'reputation',
					description: 'Le voisin parle de ta générosité',
					target: { type: 'nation', id: 'nat_b', name: 'Beta' },
					probability: 0.8,
					conditions: [
						{
							type: 'nation_exists',
							targetId: 'nat_b',
							value: 'true',
							params: {},
						},
					],
					modifications: [
						{
							type: 'adjust_relation',
							targetId: 'nat_b',
							field: 'diplomatic_opinion',
							value: 3,
							params: {},
						},
					],
					executed: false,
				},
				{
					id: 'eff_3',
					delayTicks: 26,
					type: 'social',
					description:
						'Des paysans migrent vers ta nation (attirés par la rumeur)',
					target: { type: 'nation', id: 'nat_a', name: 'Alpha' },
					probability: 0.4,
					conditions: [
						{
							type: 'nation_relation_above',
							targetId: 'nat_b',
							value: 5,
							params: {},
						},
					],
					modifications: [
						{
							type: 'change_population',
							targetId: 'nat_a',
							field: 'total',
							value: 200,
							params: { source: 'immigration' },
						},
					],
					executed: false,
				},
			],
			completed: false,
		}
		expect(chain.effects).toHaveLength(3)
		expect(chain.effects[0].delayTicks).toBe(0) // immédiat
		expect(chain.effects[1].delayTicks).toBe(4) // 1 mois
		expect(chain.effects[2].delayTicks).toBe(26) // 6 mois
		expect(chain.effects[2].probability).toBe(0.4) // probabiliste
	})

	it('ScheduledEffect supports extensible types', () => {
		const effect: import('../packages/simulation/src/types').ScheduledEffect = {
			id: 'eff_custom',
			delayTicks: 52,
			type: 'cultural_shift', // custom type !
			description: 'Changement culturel progressif',
			target: { type: 'settlement', id: 'set_1', name: 'Ville' },
			probability: 0.5,
			conditions: [],
			modifications: [
				{
					type: 'grant_knowledge',
					targetId: 'nat_a',
					field: 'knowledgeIds',
					value: 'know_new_custom',
					params: {},
				},
			],
			executed: false,
		}
		expect(effect.type).toBe('cultural_shift')
	})

	it('ActionTarget supports custom types', () => {
		const target: import('../packages/simulation/src/types').ActionTarget = {
			type: 'caravan', // custom !
			id: 'car_1',
			name: 'Caravane de Marco',
		}
		expect(target.type).toBe('caravan')
	})
})
