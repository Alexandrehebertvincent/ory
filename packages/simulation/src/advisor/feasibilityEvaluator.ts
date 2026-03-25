// ============================================================================
// AI Advisor Engine — Feasibility Evaluator
// ============================================================================
// "2. Évaluation de faisabilité (pré-requis, ressources nécessaires,
//  état de la recherche)" — GDD §3.6
// ============================================================================

import type {
	FeasibilityRule,
	NationTechnology,
	NationEconomy,
	KnowledgeEntry,
	EntityId,
	AdvisorDomain,
	GameYear,
} from '../../../shared/src/types/world'
import type { DetectedIntent } from './intentDetector'

// ----------------------------------------------------------------------------
// Types du résultat — extensibles par design
// ----------------------------------------------------------------------------

/** Verdict de faisabilité — extensible pour de futurs cas */
export type FeasibilityOutcome =
	| 'feasible'
	| 'partially_feasible'
	| 'missing_tech'
	| 'missing_resource'
	| 'inconceivable'
	| 'cultural_barrier'
	| (string & {}) // extensible

/** Résultat de l'évaluation d'une règle de faisabilité */
export interface FeasibilityResult {
	/** Règle matchée (null si aucune règle ne correspond) */
	matchedRule: FeasibilityRule | null
	/** Verdict global */
	outcome: FeasibilityOutcome
	/** Techs manquantes (IDs) */
	missingTechs: EntityId[]
	/** Ressources manquantes */
	missingResources: string[]
	/** Connaissances manquantes (IDs de KnowledgeEntry) */
	missingKnowledge: EntityId[]
	/** Techs que le joueur possède déjà (parmi les requises) */
	presentTechs: EntityId[]
	/** Ressources disponibles */
	presentResources: string[]
	/** Texte de réponse pré-rempli par la règle */
	responseText: string
	/** Score de correspondance avec la requête (0-1) */
	matchScore: number
}

/** Contexte du joueur nécessaire pour évaluer la faisabilité */
export interface PlayerContext {
	nationId: EntityId
	nationTechs: NationTechnology[]
	nationEconomy: NationEconomy | undefined
	nationKnowledgeIds: EntityId[]
	currentYear: GameYear
	/** Propriétés additionnelles pour future extensibilité */
	[key: string]: unknown
}

// ----------------------------------------------------------------------------
// Matching des règles
// ----------------------------------------------------------------------------

/**
 * Calcule un score de correspondance entre les mots-clés de la requête
 * et les triggerKeywords d'une règle. Score normalisé 0–1.
 */
function computeMatchScore(
	queryKeywords: string[],
	rule: FeasibilityRule,
): number {
	if (rule.triggerKeywords.length === 0) return 0

	const queryLower = queryKeywords.map((k) => k.toLowerCase())
	let hits = 0

	for (const trigger of rule.triggerKeywords) {
		const triggerLower = trigger.toLowerCase()
		// Match exact ou inclusion partielle
		for (const qk of queryLower) {
			if (triggerLower.includes(qk) || qk.includes(triggerLower)) {
				hits++
				break
			}
		}
	}

	// Normaliser : au moins 1 hit doit exister pour un score > 0
	return hits / rule.triggerKeywords.length
}

/**
 * Trouve les règles de faisabilité qui correspondent à une requête.
 * Retourne les règles triées par score décroissant.
 */
export function matchFeasibilityRules(
	intent: DetectedIntent,
	rules: FeasibilityRule[],
	currentYear: GameYear,
): Array<{ rule: FeasibilityRule; score: number }> {
	const matches: Array<{ rule: FeasibilityRule; score: number }> = []

	for (const rule of rules) {
		// Filtre par année
		if (currentYear < rule.minYear || currentYear > rule.maxYear) continue

		// Filtre par catégorie d'intention (si elle correspond)
		const intentMatch = rule.intentCategory === intent.category

		// Score basé sur les mots-clés
		const keywordScore = computeMatchScore(intent.keywords, rule)

		// Un match nécessite soit l'intention, soit des mots-clés
		if (!intentMatch && keywordScore === 0) continue

		// Score composite : intention + mots-clés
		const score = (intentMatch ? 0.4 : 0) + keywordScore * 0.6

		if (score > 0) {
			matches.push({ rule, score })
		}
	}

	return matches.sort((a, b) => b.score - a.score)
}

// ----------------------------------------------------------------------------
// Évaluation de faisabilité
// ----------------------------------------------------------------------------

/**
 * Évalue la faisabilité d'un projet joueur en comparant les prérequis
 * de la meilleure règle matchée avec le contexte du joueur.
 */
export function evaluateFeasibility(
	intent: DetectedIntent,
	playerCtx: PlayerContext,
	rules: FeasibilityRule[],
	knowledgeEntries: KnowledgeEntry[],
): FeasibilityResult {
	// 1. Trouver la meilleure règle
	const matches = matchFeasibilityRules(intent, rules, playerCtx.currentYear)

	if (matches.length === 0) {
		return {
			matchedRule: null,
			outcome: 'feasible', // pas de contrainte connue
			missingTechs: [],
			missingResources: [],
			missingKnowledge: [],
			presentTechs: [],
			presentResources: [],
			responseText: '',
			matchScore: 0,
		}
	}

	const best = matches[0]
	const rule = best.rule

	// 2. Vérifier les techs
	const playerTechIds = new Set(
		playerCtx.nationTechs.flatMap((t) => t.unlockedTechs),
	)
	const presentTechs = rule.requiredTechs.filter((t) => playerTechIds.has(t))
	const missingTechs = rule.requiredTechs.filter((t) => !playerTechIds.has(t))

	// 3. Vérifier les ressources (via commodités de l'économie)
	const availableResources = new Set<string>()
	if (playerCtx.nationEconomy) {
		for (const mp of playerCtx.nationEconomy.marketPrices) {
			if (mp.price > 0) {
				availableResources.add(mp.commodityId)
			}
		}
		// Also include main exports as available resources
		for (const e of playerCtx.nationEconomy.mainExports) {
			availableResources.add(e)
		}
	}
	const presentResources = rule.requiredResources.filter((r) =>
		availableResources.has(r),
	)
	const missingResources = rule.requiredResources.filter(
		(r) => !availableResources.has(r),
	)

	// 4. Vérifier les connaissances
	const playerKnowledgeSet = new Set(playerCtx.nationKnowledgeIds)
	const missingKnowledge = rule.requiredKnowledge.filter(
		(k) => !playerKnowledgeSet.has(k),
	)

	// 5. Déterminer le verdict
	const outcome = determineOutcome(
		missingTechs,
		missingResources,
		missingKnowledge,
		rule,
		playerCtx.currentYear,
	)

	// 6. Choisir le texte de réponse
	const responseText = pickResponseText(rule, outcome)

	return {
		matchedRule: rule,
		outcome,
		missingTechs,
		missingResources,
		missingKnowledge,
		presentTechs,
		presentResources,
		responseText,
		matchScore: best.score,
	}
}

/**
 * Détermine le verdict global en fonction des éléments manquants.
 */
function determineOutcome(
	missingTechs: EntityId[],
	missingResources: string[],
	missingKnowledge: EntityId[],
	rule: FeasibilityRule,
	currentYear: GameYear,
): FeasibilityOutcome {
	const totalRequired =
		rule.requiredTechs.length +
		rule.requiredResources.length +
		rule.requiredKnowledge.length
	const totalMissing =
		missingTechs.length + missingResources.length + missingKnowledge.length

	// Tout est là
	if (totalMissing === 0) return 'feasible'

	// Trop en avance sur l'époque (aucune tech et concept post-daté)
	if (
		missingTechs.length === rule.requiredTechs.length &&
		rule.minYear > currentYear
	) {
		return 'inconceivable'
	}

	// Quelques techs manquantes mais pas toutes
	if (missingTechs.length > 0 && missingResources.length === 0) {
		return 'missing_tech'
	}

	// Ressources manquantes mais techs OK
	if (missingTechs.length === 0 && missingResources.length > 0) {
		return 'missing_resource'
	}

	// Mix de manques : partiellement faisable
	if (totalMissing > 0 && totalMissing < totalRequired) {
		return 'partially_feasible'
	}

	// Tout manque
	return 'inconceivable'
}

/**
 * Choisit le texte de réponse approprié selon le verdict.
 */
function pickResponseText(
	rule: FeasibilityRule,
	outcome: FeasibilityOutcome,
): string {
	switch (outcome) {
		case 'feasible':
			return rule.responseIfFeasible
		case 'missing_tech':
			return rule.responseIfMissingTech
		case 'missing_resource':
			return rule.responseIfMissingResource
		case 'inconceivable':
			return rule.responseIfInconceivable
		case 'partially_feasible':
			return rule.responseIfMissingTech // le plus informatif en mode partiel
		default:
			return rule.responseIfInconceivable
	}
}
