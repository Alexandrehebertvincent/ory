// ============================================================================
// AI Advisor Engine — Orchestrator
// ============================================================================
// Pipeline complet : intention → profil → faisabilité → connaissances →
// réponse assemblée → ou fallback LLM.
// "Le Conseiller IA fonctionne en mode autonome SANS appel LLM pour les
//  réponses courantes." — GDD §3.6
// ============================================================================

import type {
	AdvisorProfile,
	AdvisorResponseTemplate,
	FeasibilityRule,
	KnowledgeEntry,
	NationTechnology,
	NationEconomy,
	EntityId,
	GameYear,
	AdvisorDomain,
} from '../../../shared/src/types/world'

import { detectIntent } from './intentDetector'
import type { DetectedIntent } from './intentDetector'
import {
	evaluateFeasibility,
	matchFeasibilityRules,
} from './feasibilityEvaluator'
import type { FeasibilityResult, PlayerContext } from './feasibilityEvaluator'
import { searchKnowledgeFromIntent } from './knowledgeMatcher'
import type { KnowledgeMatch } from './knowledgeMatcher'
import {
	assembleKnowledgeResponse,
	assembleFeasibilityResponse,
	assembleGreeting,
	fillTemplate,
} from './responseAssembler'
import type { AssembledResponse, TemplateVariables } from './responseAssembler'

// ----------------------------------------------------------------------------
// Types publics — extensibles
// ----------------------------------------------------------------------------

/** Requête du joueur vers le conseiller */
export interface AdvisorQuery {
	/** Texte libre du joueur */
	text: string
	/** ID du joueur */
	playerId: EntityId
	/** Nom du joueur (pour la personnalisation) */
	playerName?: string
	/** ID de la nation du joueur */
	nationId: EntityId
	/** Classe sociale courante du joueur */
	playerClass: string
	/** Région culturelle du joueur */
	playerRegion?: string
	/** Propriétés additionnelles pour extensibilité */
	[key: string]: unknown
}

/** Résultat complet du pipeline du conseiller */
export interface AdvisorResponse {
	/** Texte de la réponse à afficher au joueur */
	text: string
	/** Intention détectée */
	intent: DetectedIntent
	/** Profil du conseiller sélectionné */
	advisor: AdvisorProfile
	/** Résultat de faisabilité (si applicable) */
	feasibility: FeasibilityResult | null
	/** Connaissances trouvées (si applicable) */
	knowledgeMatches: KnowledgeMatch[]
	/** Réponse assemblée (détails internes) */
	assembledResponse: AssembledResponse
	/** Le moteur autonome a-t-il pu répondre ? */
	answeredAutonomously: boolean
	/**
	 * Si true, le moteur recommande un appel LLM pour enrichir la réponse.
	 * Le contexte préparé est dans `llmContext`.
	 */
	needsLLM: boolean
	/** Contexte structuré pour un éventuel prompt LLM */
	llmContext: LLMContext | null
}

/**
 * Contexte préparé pour un prompt LLM — extensible.
 * Le serveur Phase 3 utilisera ces données pour construire le prompt.
 */
export interface LLMContext {
	/** Résumé de ce que le moteur autonome a trouvé */
	autonomousFindings: string
	/** Intention du joueur */
	intent: DetectedIntent
	/** Domaines pertinents */
	relevantDomains: AdvisorDomain[]
	/** Connaissances partielles trouvées */
	partialKnowledge: Array<{ title: string; answer: string; level: string }>
	/** Personnage du conseiller (pour le rôle du LLM) */
	advisorPersona: {
		name: string
		speechStyle: string
		culturalFilters: string[]
	}
	/** Année courante */
	currentYear: GameYear
	/** La question originale */
	originalQuery: string
	/** Propriétés additionnelles */
	[key: string]: unknown
}

/** Données statiques nécessaires au pipeline */
export interface AdvisorStaticData {
	advisorProfiles: AdvisorProfile[]
	feasibilityRules: FeasibilityRule[]
	knowledgeEntries: KnowledgeEntry[]
	advisorResponseTemplates: AdvisorResponseTemplate[]
}

/** Données dynamiques du joueur */
export interface AdvisorPlayerData {
	nationTechs: NationTechnology[]
	nationEconomy: NationEconomy | undefined
	nationKnowledgeIds: EntityId[]
	currentYear: GameYear
}

// ----------------------------------------------------------------------------
// Sélection du profil de conseiller
// ----------------------------------------------------------------------------

/**
 * Sélectionne le profil de conseiller approprié selon :
 * - La classe sociale du joueur
 * - L'année courante
 * - Les techs disponibles
 */
export function selectAdvisorProfile(
	profiles: AdvisorProfile[],
	playerClass: string,
	currentYear: GameYear,
	playerTechIds: Set<EntityId>,
): AdvisorProfile {
	// Filtrer les profils accessibles
	const available = profiles.filter((p) => {
		// Vérifier la classe sociale
		if (!p.availableToClasses.includes(playerClass as any)) return false
		// Vérifier l'année
		if (currentYear < p.minYear) return false
		// Vérifier les techs requises
		if (!p.requiredTechs.every((t) => playerTechIds.has(t))) return false
		return true
	})

	if (available.length === 0) {
		// Fallback : le premier profil sans restriction de classe
		return profiles[0]
	}

	// Préférer le profil le plus avancé (minYear le plus élevé = le plus spécialisé)
	available.sort((a, b) => b.minYear - a.minYear)
	return available[0]
}

// ----------------------------------------------------------------------------
// Pipeline principal
// ----------------------------------------------------------------------------

/**
 * Pipeline complet du conseiller IA — traite une requête joueur
 * de bout en bout sans appel LLM.
 *
 * Étapes :
 * 1. Détection d'intention
 * 2. Sélection du profil de conseiller
 * 3. Évaluation de faisabilité (si intention = build/invent/explore/etc.)
 * 4. Recherche de connaissances
 * 5. Assemblage de la réponse
 * 6. Évaluation du besoin LLM
 */
export function processAdvisorQuery(
	query: AdvisorQuery,
	staticData: AdvisorStaticData,
	playerData: AdvisorPlayerData,
): AdvisorResponse {
	// 1. Détecter l'intention
	const intent = detectIntent(query.text)

	// 2. Sélectionner le profil
	const playerTechIds = new Set(
		playerData.nationTechs.flatMap((t) => t.unlockedTechs),
	)
	const advisor = selectAdvisorProfile(
		staticData.advisorProfiles,
		query.playerClass,
		playerData.currentYear,
		playerTechIds,
	)

	// 3. Construire le contexte joueur
	const playerCtx: PlayerContext = {
		nationId: query.nationId,
		nationTechs: playerData.nationTechs,
		nationEconomy: playerData.nationEconomy,
		nationKnowledgeIds: playerData.nationKnowledgeIds ?? [],
		currentYear: playerData.currentYear,
	}

	// 4. Évaluation de faisabilité (pour les intentions d'action)
	const actionIntents = new Set([
		'build',
		'invent',
		'explore',
		'trade',
		'military',
		'farm',
		'navigate',
		'heal',
	])
	let feasibility: FeasibilityResult | null = null
	if (actionIntents.has(intent.category)) {
		feasibility = evaluateFeasibility(
			intent,
			playerCtx,
			staticData.feasibilityRules,
			staticData.knowledgeEntries,
		)
	}

	// 5. Recherche de connaissances
	const playerKnowledgeIds = new Set(playerData.nationKnowledgeIds ?? [])
	const knowledgeMatches = searchKnowledgeFromIntent(
		intent,
		staticData.knowledgeEntries,
		playerTechIds,
		playerKnowledgeIds,
		playerData.currentYear,
		advisor,
		query.playerRegion,
	)

	// 6. Assembler la réponse
	const assembledResponse = assembleResponse(
		intent,
		feasibility,
		knowledgeMatches,
		advisor,
		staticData.advisorResponseTemplates,
		playerData.currentYear,
		query.playerName,
	)

	// 7. Évaluer le besoin LLM
	const needsLLM = shouldEscalateToLLM(
		intent,
		feasibility,
		knowledgeMatches,
		assembledResponse,
	)

	// 8. Préparer le contexte LLM si nécessaire
	const llmContext = needsLLM
		? buildLLMContext(
				intent,
				advisor,
				knowledgeMatches,
				feasibility,
				playerData.currentYear,
				query.text,
				assembledResponse,
			)
		: null

	return {
		text: assembledResponse.text,
		intent,
		advisor,
		feasibility,
		knowledgeMatches,
		assembledResponse,
		answeredAutonomously: !needsLLM,
		needsLLM,
		llmContext,
	}
}

// ----------------------------------------------------------------------------
// Assemblage intelligent de la réponse
// ----------------------------------------------------------------------------

/**
 * Choisit la meilleure stratégie d'assemblage selon ce qui a été trouvé.
 */
function assembleResponse(
	intent: DetectedIntent,
	feasibility: FeasibilityResult | null,
	knowledgeMatches: KnowledgeMatch[],
	advisor: AdvisorProfile,
	templates: AdvisorResponseTemplate[],
	currentYear: GameYear,
	playerName?: string,
): AssembledResponse {
	// Priorité 1 : Faisabilité forte (score > 0.3 et règle matchée)
	if (feasibility?.matchedRule && feasibility.matchScore > 0.3) {
		return assembleFeasibilityResponse(
			feasibility,
			templates,
			currentYear,
			advisor,
			playerName,
		)
	}

	// Priorité 2 : Connaissance trouvée (score > 0.2)
	if (knowledgeMatches.length > 0 && knowledgeMatches[0].score > 0.2) {
		return assembleKnowledgeResponse(
			knowledgeMatches[0],
			templates,
			currentYear,
			advisor,
			playerName,
		)
	}

	// Priorité 3 : Faisabilité faible (au moins une règle)
	if (feasibility?.matchedRule) {
		return assembleFeasibilityResponse(
			feasibility,
			templates,
			currentYear,
			advisor,
			playerName,
		)
	}

	// Priorité 4 : Connaissance faible
	if (knowledgeMatches.length > 0) {
		return assembleKnowledgeResponse(
			knowledgeMatches[0],
			templates,
			currentYear,
			advisor,
			playerName,
		)
	}

	// Priorité 5 : Si le sujet est hors domaine du conseiller, rediriger
	if (!isInAdvisorDomains(intent, advisor)) {
		const deflection =
			advisor.deflections[
				Math.floor(Math.random() * advisor.deflections.length)
			] ?? "Ce n'est pas mon domaine."
		return {
			text: deflection,
			templateId: 'fallback_deflection',
			situation: 'referral',
			tone: 'pragmatic',
			fromTemplate: false,
		}
	}

	// Fallback final : sujet inconnu
	return {
		text: "Je ne sais que répondre à cela. Peut-être qu'un autre conseiller plus savant pourrait t'aider.",
		templateId: 'fallback_unknown',
		situation: 'unknown_topic',
		tone: 'pragmatic',
		fromTemplate: false,
	}
}

// ----------------------------------------------------------------------------
// Escalade LLM
// ----------------------------------------------------------------------------

/**
 * Détermine si la requête nécessite un appel LLM pour enrichir.
 */
function shouldEscalateToLLM(
	intent: DetectedIntent,
	feasibility: FeasibilityResult | null,
	knowledgeMatches: KnowledgeMatch[],
	response: AssembledResponse,
): boolean {
	// Confidence d'intention trop basse
	if (intent.confidence < 0.3) return true

	// Aucune connaissance ni faisabilité trouvée
	if (!feasibility?.matchedRule && knowledgeMatches.length === 0) return true

	// Réponse de type inconnu/fallback
	if (response.situation === 'unknown_topic' && !response.fromTemplate) {
		return true
	}

	// Intent "general" (conversation libre) → souvent besoin de LLM
	if (intent.category === 'general') return true

	return false
}

/**
 * Construit un contexte structuré pour un futur appel LLM.
 */
function buildLLMContext(
	intent: DetectedIntent,
	advisor: AdvisorProfile,
	knowledgeMatches: KnowledgeMatch[],
	feasibility: FeasibilityResult | null,
	currentYear: GameYear,
	originalQuery: string,
	autonomousResponse: AssembledResponse,
): LLMContext {
	// Résumé des trouvailles autonomes
	const findings: string[] = []
	if (feasibility?.matchedRule) {
		findings.push(`Faisabilité: ${feasibility.outcome}`)
	}
	for (const km of knowledgeMatches.slice(0, 3)) {
		findings.push(
			`Connaissance: "${km.entry.title}" (niveau: ${km.effectiveLevel}, score: ${km.score.toFixed(2)})`,
		)
	}
	if (autonomousResponse.fromTemplate) {
		findings.push(`Réponse template trouvée (${autonomousResponse.templateId})`)
	}

	// Domaines pertinents
	const domains = new Set<AdvisorDomain>()
	for (const km of knowledgeMatches) {
		domains.add(km.entry.domain)
	}
	if (feasibility?.matchedRule) {
		domains.add(feasibility.matchedRule.domain)
	}

	return {
		autonomousFindings:
			findings.length > 0
				? findings.join('\n')
				: 'Aucune information trouvée dans la base de connaissances.',
		intent,
		relevantDomains: [...domains],
		partialKnowledge: knowledgeMatches.slice(0, 3).map((km) => ({
			title: km.entry.title,
			answer: km.entry.directAnswer,
			level: km.effectiveLevel,
		})),
		advisorPersona: {
			name: advisor.name,
			speechStyle: advisor.speechStyle,
			culturalFilters: advisor.culturalFilters,
		},
		currentYear,
		originalQuery,
	}
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

/** Vérifie si l'intention est dans les domaines du conseiller */
function isInAdvisorDomains(
	intent: DetectedIntent,
	advisor: AdvisorProfile,
): boolean {
	const domainMap: Partial<Record<string, AdvisorDomain>> = {
		build: 'construction',
		invent: 'engineering',
		farm: 'agriculture',
		heal: 'medicine',
		navigate: 'navigation',
		military: 'military',
		trade: 'trade',
		political: 'politics',
		learn: 'philosophy', // learn est très large, on ne refuse jamais
		explore: 'geography',
	}

	const domain = domainMap[intent.category]
	if (!domain) return true // general → on ne refuse pas

	return (
		advisor.primaryDomains.includes(domain) ||
		advisor.secondaryDomains.includes(domain)
	)
}
