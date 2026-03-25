// ============================================================================
// AI Advisor Engine — Response Assembler
// ============================================================================
// "4. Assemblage de la réponse en langage naturel (templates + variables)"
// — GDD §3.6
// ============================================================================

import type {
	AdvisorResponseTemplate,
	AdvisorProfile,
	AdvisorDomain,
	KnowledgeEntry,
	EntityId,
	GameYear,
} from '../../../shared/src/types/world'
import type {
	FeasibilityResult,
	FeasibilityOutcome,
} from './feasibilityEvaluator'
import type { KnowledgeMatch } from './knowledgeMatcher'

// ----------------------------------------------------------------------------
// Types — extensibles
// ----------------------------------------------------------------------------

/** Variables de contexte injectables dans les templates */
export interface TemplateVariables {
	playerName?: string
	advisorName?: string
	npcType?: string
	techName?: string
	resourceName?: string
	locationName?: string
	nationName?: string
	year?: string
	domainName?: string
	referralTarget?: string
	referralReason?: string
	knowledgeTitle?: string
	prerequisite?: string
	directAnswer?: string
	/** Variables additionnelles pour extensibilité */
	[key: string]: string | undefined
}

/** Situation de réponse — même type que AdvisorResponseTemplate.situation */
export type ResponseSituation = AdvisorResponseTemplate['situation']

/** Réponse assemblée prête à envoyer au joueur */
export interface AssembledResponse {
	/** Texte final avec variables remplies */
	text: string
	/** Template utilisé (pour debug/log) */
	templateId: EntityId
	/** Situation identifiée */
	situation: ResponseSituation
	/** Ton de la réponse */
	tone: string
	/** Le template a-t-il pu être trouvé ? */
	fromTemplate: boolean
}

// ----------------------------------------------------------------------------
// Sélection de template
// ----------------------------------------------------------------------------

/**
 * Critères de sélection de template, triés par spécificité décroissante :
 * 1. Archétype + domaine + situation + année
 * 2. Archétype + situation + année
 * 3. Domaine + situation + année
 * 4. Situation + année (générique)
 */
export function selectTemplate(
	templates: AdvisorResponseTemplate[],
	situation: ResponseSituation,
	currentYear: GameYear,
	advisor?: AdvisorProfile,
	domain?: AdvisorDomain | null,
	preferredTone?: string,
): AdvisorResponseTemplate | null {
	// Filtrer les templates valides pour l'année
	const valid = templates.filter(
		(t) =>
			t.situation === situation &&
			currentYear >= t.minYear &&
			currentYear <= t.maxYear,
	)

	if (valid.length === 0) return null

	// Scorer chaque template par spécificité
	const scored = valid.map((t) => {
		let score = 0

		// Match archétype +3
		if (advisor && t.advisorProfileId === advisor.id) score += 3

		// Match domaine +2
		if (domain && t.domain === domain) score += 2

		// Match ton préféré +1
		if (preferredTone && t.tone === preferredTone) score += 1

		// Pénalité si le template est pour un autre archétype spécifique
		if (
			t.advisorProfileId !== null &&
			advisor &&
			t.advisorProfileId !== advisor.id
		) {
			score -= 10 // exclure
		}

		return { template: t, score }
	})

	// Filtrer les exclus puis trier par score
	const candidates = scored.filter((s) => s.score >= 0)
	if (candidates.length === 0) return null

	candidates.sort((a, b) => b.score - a.score)
	return candidates[0].template
}

// ----------------------------------------------------------------------------
// Remplissage des variables
// ----------------------------------------------------------------------------

/**
 * Remplace les {placeholders} dans un texte de template par les variables.
 * Les variables non fournies restent telles quelles (pas d'erreur).
 */
export function fillTemplate(
	templateText: string,
	variables: TemplateVariables,
): string {
	return templateText.replace(/\{(\w+)\}/g, (match, key: string) => {
		return variables[key] ?? match
	})
}

// ----------------------------------------------------------------------------
// Construction des variables depuis le contexte
// ----------------------------------------------------------------------------

/**
 * Construit les variables de template à partir d'un contexte de connaissance.
 */
export function buildVariablesFromKnowledge(
	match: KnowledgeMatch,
	advisor?: AdvisorProfile,
	playerName?: string,
): TemplateVariables {
	const entry = match.entry
	const referral = entry.referrals[0] // premier referral s'il existe

	return {
		playerName,
		advisorName: advisor?.name,
		knowledgeTitle: entry.title,
		directAnswer: entry.directAnswer,
		domainName: entry.domain,
		referralTarget: referral?.target,
		referralReason: referral?.reason,
	}
}

/**
 * Construit les variables de template à partir d'un résultat de faisabilité.
 */
export function buildVariablesFromFeasibility(
	result: FeasibilityResult,
	advisor?: AdvisorProfile,
	playerName?: string,
): TemplateVariables {
	return {
		playerName,
		advisorName: advisor?.name,
		techName: result.missingTechs[0] ?? undefined,
		resourceName:
			result.missingResources[0] ?? result.presentResources[0] ?? undefined,
		prerequisite:
			result.missingKnowledge[0] ?? result.missingTechs[0] ?? undefined,
		domainName: result.matchedRule?.domain,
	}
}

// ----------------------------------------------------------------------------
// API publique
// ----------------------------------------------------------------------------

/**
 * Assemble une réponse complète à partir d'une connaissance trouvée.
 */
export function assembleKnowledgeResponse(
	match: KnowledgeMatch,
	templates: AdvisorResponseTemplate[],
	currentYear: GameYear,
	advisor?: AdvisorProfile,
	playerName?: string,
): AssembledResponse {
	// Déterminer la situation selon le niveau de connaissance
	const situationMap: Record<string, ResponseSituation> = {
		mastered: 'knowledge_shared',
		known: 'knowledge_shared',
		rumored: 'rumor_shared',
		theoretical: 'rumor_shared',
	}
	const situation: ResponseSituation =
		situationMap[match.effectiveLevel] ?? 'unknown_topic'

	// Déterminer le ton selon l'archétype
	const toneFromProfile = advisor ? inferTone(advisor) : undefined

	// Sélectionner le template
	const template = selectTemplate(
		templates,
		situation,
		currentYear,
		advisor,
		match.entry.domain,
		toneFromProfile,
	)

	// Construire les variables
	const variables = buildVariablesFromKnowledge(match, advisor, playerName)

	if (template) {
		return {
			text: fillTemplate(template.template, variables),
			templateId: template.id,
			situation,
			tone: template.tone,
			fromTemplate: true,
		}
	}

	// Fallback : utiliser la directAnswer brute
	return {
		text: match.entry.directAnswer,
		templateId: 'fallback_direct',
		situation,
		tone: 'pragmatic',
		fromTemplate: false,
	}
}

/**
 * Assemble une réponse à partir d'un résultat de faisabilité.
 * Utilise d'abord le texte de la règle, puis habille avec un template.
 */
export function assembleFeasibilityResponse(
	result: FeasibilityResult,
	templates: AdvisorResponseTemplate[],
	currentYear: GameYear,
	advisor?: AdvisorProfile,
	playerName?: string,
): AssembledResponse {
	// Si on a un texte de la règle, l'utiliser directement
	if (result.responseText) {
		return {
			text: result.responseText,
			templateId: result.matchedRule?.id ?? 'rule_direct',
			situation: outcomeToSituation(result.outcome),
			tone: 'pragmatic',
			fromTemplate: false,
		}
	}

	// Sinon, chercher un template
	const situation = outcomeToSituation(result.outcome)
	const toneFromProfile = advisor ? inferTone(advisor) : undefined

	const template = selectTemplate(
		templates,
		situation,
		currentYear,
		advisor,
		result.matchedRule?.domain ?? null,
		toneFromProfile,
	)

	const variables = buildVariablesFromFeasibility(result, advisor, playerName)

	if (template) {
		return {
			text: fillTemplate(template.template, variables),
			templateId: template.id,
			situation,
			tone: template.tone,
			fromTemplate: true,
		}
	}

	return {
		text: "Je ne sais que dire à ce sujet. Peut-être quelqu'un de plus savant pourrait aider.",
		templateId: 'fallback_empty',
		situation: 'unknown_topic',
		tone: 'pragmatic',
		fromTemplate: false,
	}
}

/**
 * Assemble un message d'accueil du conseiller.
 */
export function assembleGreeting(
	templates: AdvisorResponseTemplate[],
	advisor: AdvisorProfile,
	currentYear: GameYear,
	playerName?: string,
): AssembledResponse {
	const template = selectTemplate(templates, 'greeting', currentYear, advisor)

	if (template) {
		const variables: TemplateVariables = {
			playerName,
			advisorName: advisor.name,
			year: currentYear.toString(),
		}
		return {
			text: fillTemplate(template.template, variables),
			templateId: template.id,
			situation: 'greeting',
			tone: template.tone,
			fromTemplate: true,
		}
	}

	// Fallback : piocher dans les greetings du profil
	const greeting =
		advisor.greetings[Math.floor(Math.random() * advisor.greetings.length)] ??
		'Bonjour.'
	return {
		text: greeting,
		templateId: 'fallback_profile_greeting',
		situation: 'greeting',
		tone: 'familiar',
		fromTemplate: false,
	}
}

// ----------------------------------------------------------------------------
// Helpers internes
// ----------------------------------------------------------------------------

/** Convertit un FeasibilityOutcome en ResponseSituation */
function outcomeToSituation(outcome: FeasibilityOutcome): ResponseSituation {
	const map: Record<string, ResponseSituation> = {
		feasible: 'feasible',
		partially_feasible: 'partially_feasible',
		missing_tech: 'missing_tech',
		missing_resource: 'missing_resource',
		inconceivable: 'inconceivable',
		cultural_barrier: 'cultural_barrier',
	}
	return map[outcome] ?? 'unknown_topic'
}

/** Déduit le ton préféré depuis le profil du conseiller */
function inferTone(advisor: AdvisorProfile): string {
	const style = advisor.speechStyle.toLowerCase()
	if (style.includes('proverbe') || style.includes('tutoie')) return 'familiar'
	if (style.includes('vouvoie') || style.includes('formel')) return 'formal'
	if (style.includes('savant') || style.includes('jargon')) return 'scholarly'
	if (style.includes('mystique') || style.includes('sacré')) return 'mystical'
	return 'pragmatic'
}
