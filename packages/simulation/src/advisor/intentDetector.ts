// ============================================================================
// AI Advisor Engine — Intent Detection
// ============================================================================
// "1. Extraction des mots-clés + détection d'intention
//  (build, invent, learn, trade, explore, military...)" — GDD §3.6
// ============================================================================

import type { PlayerIntentCategory } from '../../../shared/src/types/world'

/** Result of intent detection from a player's question */
export interface DetectedIntent {
	category: PlayerIntentCategory
	keywords: string[]
	confidence: number // 0-1
	rawQuery: string
}

/**
 * Keyword patterns for each intent category.
 * Each pattern is a list of trigger words (stemmed/simplified).
 * Matching is case-insensitive.
 */
const INTENT_PATTERNS: Array<{
	category: PlayerIntentCategory
	keywords: string[]
	weight: number
}> = [
	{
		category: 'build',
		keywords: [
			'construire',
			'bâtir',
			'édifier',
			'build',
			'fortifier',
			'ériger',
			'mur',
			'pont',
			'route',
			'port',
			'marché',
			'grenier',
			'aqueduc',
			'canal',
			'forteresse',
			'mine',
			'irrigation',
			'phare',
			'cathédrale',
			'mosquée',
			'temple',
		],
		weight: 1.0,
	},
	{
		category: 'invent',
		keywords: [
			'inventer',
			'découvrir',
			'créer',
			'invent',
			'concevoir',
			'fabriquer',
			'innovation',
			'technique',
			'technologie',
			'machine',
			'mécanisme',
			'procédé',
			'améliorer',
			'perfectionner',
			'développer',
		],
		weight: 1.0,
	},
	{
		category: 'learn',
		keywords: [
			'apprendre',
			'savoir',
			'connaître',
			'comprendre',
			'learn',
			'expliquer',
			'comment',
			'pourquoi',
			"qu'est-ce",
			'enseigner',
			'étudier',
			'science',
			'connaissance',
			'formation',
			'éducation',
		],
		weight: 0.8,
	},
	{
		category: 'trade',
		keywords: [
			'commerce',
			'échanger',
			'vendre',
			'acheter',
			'trade',
			'marchand',
			'marché',
			'prix',
			'caravane',
			'route commerciale',
			'import',
			'export',
			'denrée',
			'marchandise',
			'troquer',
			'négocier',
		],
		weight: 1.0,
	},
	{
		category: 'explore',
		keywords: [
			'explorer',
			'découvrir',
			'voyager',
			'cartographier',
			'explore',
			'expédition',
			'terre inconnue',
			'au-delà',
			'naviguer',
			'traverser',
			'monde',
			'région',
			'territoire',
			'contrée',
		],
		weight: 1.0,
	},
	{
		category: 'political',
		keywords: [
			'politique',
			'pouvoir',
			'influence',
			'alliance',
			'diplomatie',
			'roi',
			'noble',
			'vassalité',
			'traité',
			'loi',
			'réforme',
			'gouverner',
			'régner',
			'élection',
			'succession',
			'complot',
		],
		weight: 1.0,
	},
	{
		category: 'military',
		keywords: [
			'attaquer',
			'défendre',
			'guerre',
			'armée',
			'soldats',
			'military',
			'bataille',
			'siège',
			'conquérir',
			'envahir',
			'fortification',
			'arme',
			'cavalerie',
			'infanterie',
			'marine',
			'stratégie',
		],
		weight: 1.0,
	},
	{
		category: 'heal',
		keywords: [
			'soigner',
			'guérir',
			'médecine',
			'maladie',
			'heal',
			'remède',
			'épidémie',
			'peste',
			'herbe',
			'potion',
			'chirurgie',
			'santé',
			'hôpital',
			'médecin',
			'apothicaire',
		],
		weight: 1.0,
	},
	{
		category: 'farm',
		keywords: [
			'cultiver',
			'récolter',
			'agriculture',
			'élevage',
			'farm',
			'champ',
			'blé',
			'bétail',
			'semence',
			'irrigation',
			'moisson',
			'pâturage',
			'vigne',
			'verger',
			'ferme',
		],
		weight: 1.0,
	},
	{
		category: 'navigate',
		keywords: [
			'naviguer',
			'mer',
			'océan',
			'bateau',
			'navire',
			'navigate',
			'voile',
			'port',
			'côte',
			'traversée',
			'maritime',
			'flotte',
			'cabotage',
			'haute mer',
			'boussole',
			'astrolabe',
		],
		weight: 1.0,
	},
]

/**
 * Detect the player's intent from a natural language question.
 *
 * Uses keyword matching with scoring. Returns the best match
 * or 'general' if no strong match is found.
 */
export function detectIntent(query: string): DetectedIntent {
	const normalizedQuery = query
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
	const queryWords = normalizedQuery.split(/\s+/)

	let bestCategory: PlayerIntentCategory = 'general'
	let bestScore = 0
	let matchedKeywords: string[] = []

	for (const pattern of INTENT_PATTERNS) {
		let score = 0
		const matched: string[] = []

		for (const keyword of pattern.keywords) {
			const normalizedKw = keyword
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
			// Check if keyword appears in query (as substring or word)
			if (normalizedQuery.includes(normalizedKw)) {
				score += pattern.weight
				matched.push(keyword)
			}
		}

		if (score > bestScore) {
			bestScore = score
			bestCategory = pattern.category
			matchedKeywords = matched
		}
	}

	// Extract all significant words as keywords (4+ chars)
	const extractedKeywords = queryWords.filter((w) => w.length >= 4)

	// Confidence: normalized score (0-1)
	const confidence = Math.min(1, bestScore / 3) // 3 keyword matches = full confidence

	return {
		category: bestCategory,
		keywords: [...new Set([...matchedKeywords, ...extractedKeywords])],
		confidence,
		rawQuery: query,
	}
}
