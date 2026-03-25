// ============================================================================
// AI Advisor Engine — Knowledge Matcher
// ============================================================================
// "3. Recherche dans la base de connaissances locale (KnowledgeEntry[])"
// — GDD §3.6
// ============================================================================

import type {
	KnowledgeEntry,
	KnowledgeLevel,
	AdvisorProfile,
	AdvisorDomain,
	EntityId,
	GameYear,
} from '../../../shared/src/types/world'
import type { DetectedIntent } from './intentDetector'

// ----------------------------------------------------------------------------
// Types — extensibles
// ----------------------------------------------------------------------------

/** Résultat d'un match de connaissance scoré */
export interface KnowledgeMatch {
	entry: KnowledgeEntry
	/** Score composite (0-1) */
	score: number
	/** Niveau de connaissance effectif pour le joueur */
	effectiveLevel: KnowledgeLevel
	/** Le conseiller peut-il en parler d'après ses domaines ? */
	inAdvisorDomain: boolean
}

/** Critères de recherche — extensibles pour de futurs filtres */
export interface KnowledgeSearchCriteria {
	/** Mots-clés issus de la requête */
	keywords: string[]
	/** Domaine détecté par l'intention */
	domain?: AdvisorDomain
	/** Année courante (filtre validFrom/validTo) */
	currentYear: GameYear
	/** Techs du joueur (filtre requiredTechs) */
	playerTechIds: Set<EntityId>
	/** IDs de connaissances que le joueur possède déjà */
	playerKnowledgeIds: Set<EntityId>
	/** Niveau de connaissance maximum acceptable */
	maxLevel?: KnowledgeLevel
	/** Région culturelle du joueur */
	playerRegion?: string
	/** Nombre max de résultats */
	limit?: number
	/** Propriétés additionnelles pour extensibilité */
	[key: string]: unknown
}

// ----------------------------------------------------------------------------
// Scoring des mots-clés
// ----------------------------------------------------------------------------

/** Ordre des niveaux de connaissance (du plus accessible au moins) */
const KNOWLEDGE_LEVEL_ORDER: Record<KnowledgeLevel, number> = {
	mastered: 5,
	known: 4,
	rumored: 3,
	theoretical: 2,
	unknown: 1,
	forbidden: 0,
}

/**
 * Calcule le score de correspondance entre des mots-clés de recherche
 * et les keywords/title/domain d'une KnowledgeEntry.
 */
function computeKeywordScore(
	searchKeywords: string[],
	entry: KnowledgeEntry,
): number {
	if (searchKeywords.length === 0) return 0

	const entryKeywords = entry.keywords.map((k) => k.toLowerCase())
	const titleWords = entry.title.toLowerCase().split(/\s+/)
	const allEntryTerms = [
		...entryKeywords,
		...titleWords,
		entry.domain.toLowerCase(),
	]

	let hits = 0
	for (const sk of searchKeywords) {
		const skLower = sk.toLowerCase()
		for (const term of allEntryTerms) {
			if (term.includes(skLower) || skLower.includes(term)) {
				hits++
				break
			}
		}
	}

	return hits / searchKeywords.length
}

/**
 * Détermine le niveau de connaissance effectif pour le joueur,
 * en tenant compte de ses techs et de l'année courante.
 */
function resolveEffectiveLevel(
	entry: KnowledgeEntry,
	playerTechIds: Set<EntityId>,
	playerKnowledgeIds: Set<EntityId>,
	currentYear: GameYear,
	playerRegion?: string,
): KnowledgeLevel {
	// Hors période de validité → unknown
	if (currentYear < entry.validFrom || currentYear > entry.validTo) {
		return 'unknown'
	}

	// Techs manquantes → dégrade le niveau
	const hasTechs = entry.requiredTechs.every((t) => playerTechIds.has(t))

	// Prérequis de connaissance
	const hasPrereqs = entry.prerequisiteKnowledge.every((k) =>
		playerKnowledgeIds.has(k),
	)

	// Région culturelle
	const inRegion =
		!playerRegion ||
		entry.knownInRegions.length === 0 ||
		entry.knownInRegions.includes(playerRegion)

	// Niveau de base de l'entrée
	const baseLevel = entry.knowledgeLevel

	// Si tout est OK, retourner le niveau de base
	if (hasTechs && hasPrereqs && inRegion) return baseLevel

	// Dégradation progressive
	const basePriority = KNOWLEDGE_LEVEL_ORDER[baseLevel]

	let penalty = 0
	if (!hasTechs) penalty += 2
	if (!hasPrereqs) penalty += 1
	if (!inRegion) penalty += 1

	const effectivePriority = Math.max(0, basePriority - penalty)

	// Trouver le niveau correspondant
	const levels: KnowledgeLevel[] = [
		'forbidden',
		'unknown',
		'theoretical',
		'rumored',
		'known',
		'mastered',
	]
	return levels[effectivePriority] || 'unknown'
}

// ----------------------------------------------------------------------------
// API publique
// ----------------------------------------------------------------------------

/**
 * Recherche les entrées de connaissance les plus pertinentes pour une requête.
 * Retourne les résultats triés par score décroissant.
 */
export function searchKnowledge(
	criteria: KnowledgeSearchCriteria,
	entries: KnowledgeEntry[],
	advisor?: AdvisorProfile,
): KnowledgeMatch[] {
	const limit = criteria.limit ?? 5
	const matches: KnowledgeMatch[] = []

	for (const entry of entries) {
		// Filtre par année
		if (
			criteria.currentYear < entry.validFrom ||
			criteria.currentYear > entry.validTo
		) {
			continue
		}

		// Score mots-clés
		let score = computeKeywordScore(criteria.keywords, entry)

		// Bonus si le domaine correspond à l'intention
		if (criteria.domain && entry.domain === criteria.domain) {
			score += 0.2
		}

		// Bonus si la région culturelle correspond
		if (
			criteria.playerRegion &&
			entry.knownInRegions.includes(criteria.playerRegion)
		) {
			score += 0.1
		}

		// Pas de match → skip
		if (score <= 0) continue

		// Niveau de connaissance effectif
		const effectiveLevel = resolveEffectiveLevel(
			entry,
			criteria.playerTechIds,
			criteria.playerKnowledgeIds,
			criteria.currentYear,
			criteria.playerRegion,
		)

		// Si le conseiller ne peut pas le savoir → skip les unknown/forbidden
		if (effectiveLevel === 'unknown' || effectiveLevel === 'forbidden') {
			continue
		}

		// Bonus/malus selon le niveau de connaissance
		const levelBonus = KNOWLEDGE_LEVEL_ORDER[effectiveLevel] * 0.05
		score += levelBonus

		// Vérifie si c'est dans le domaine du conseiller
		const inAdvisorDomain = advisor
			? advisor.primaryDomains.includes(entry.domain) ||
				advisor.secondaryDomains.includes(entry.domain)
			: true

		// Bonus si dans le domaine du conseiller
		if (inAdvisorDomain) {
			score += 0.15
		}

		// Normaliser le score entre 0 et 1
		score = Math.min(1, score)

		matches.push({ entry, score, effectiveLevel, inAdvisorDomain })
	}

	// Tri par score décroissant
	matches.sort((a, b) => b.score - a.score)

	return matches.slice(0, limit)
}

/**
 * Raccourci : recherche à partir d'une intention détectée + contexte joueur.
 */
export function searchKnowledgeFromIntent(
	intent: DetectedIntent,
	entries: KnowledgeEntry[],
	playerTechIds: Set<EntityId>,
	playerKnowledgeIds: Set<EntityId>,
	currentYear: GameYear,
	advisor?: AdvisorProfile,
	playerRegion?: string,
): KnowledgeMatch[] {
	// Mapper l'intention vers un domaine quand c'est clair
	const domainMap: Partial<Record<string, AdvisorDomain>> = {
		build: 'construction',
		farm: 'agriculture',
		heal: 'medicine',
		navigate: 'navigation',
		military: 'military',
		trade: 'trade',
		political: 'politics',
	}

	const criteria: KnowledgeSearchCriteria = {
		keywords: intent.keywords,
		domain: domainMap[intent.category],
		currentYear,
		playerTechIds,
		playerKnowledgeIds,
		playerRegion,
	}

	return searchKnowledge(criteria, entries, advisor)
}
