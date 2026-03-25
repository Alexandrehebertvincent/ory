// ============================================================================
// Trait & Skill System — Hereditary traits and skill development
// ============================================================================
// GDD §3.3: "Traits héréditaires : certains traits se transmettent
// (aptitudes, défauts, réputation familiale)"
//
// Traits affect gameplay through modifiers on decisions, events, and
// social interactions. Skills develop through actions and age.
// ============================================================================

import type {
	FamilyMember,
	Level,
	SocialClass,
} from '../../../shared/src/types/world'
import type { SeededRNG } from '../types'

// ----------------------------------------------------------------------------
// Trait catalog
// ----------------------------------------------------------------------------

export interface TraitDefinition {
	id: string
	name: string
	/** Positive, negative, or neutral */
	valence: 'positive' | 'negative' | 'neutral'
	/** Probability of passing to offspring (0-1) */
	heritability: number
	/** Which skills this trait boosts/penalizes */
	skillModifiers: Partial<Record<string, number>>
	/** Social classes where this trait is more common at birth */
	affinityClasses: SocialClass[]
	/** Incompatible traits (cannot coexist) */
	incompatible: string[]
	/** Description narrative */
	description: string
}

/** Master trait catalog — covers medieval-relevant personality traits */
export const TRAIT_CATALOG: TraitDefinition[] = [
	// --- Positive ---
	{
		id: 'ambitious',
		name: 'Ambitieux',
		valence: 'positive',
		heritability: 0.3,
		skillModifiers: { diplomacy: 1, trade: 1 },
		affinityClasses: ['nobility', 'merchants'],
		incompatible: ['content'],
		description: "Cherche toujours à s'élever",
	},
	{
		id: 'brave',
		name: 'Courageux',
		valence: 'positive',
		heritability: 0.2,
		skillModifiers: { military: 2, diplomacy: -1 },
		affinityClasses: ['nobility', 'warriors'],
		incompatible: ['cowardly'],
		description: 'Fait face au danger sans hésitation',
	},
	{
		id: 'shrewd',
		name: 'Astucieux',
		valence: 'positive',
		heritability: 0.25,
		skillModifiers: { trade: 2, espionage: 1 },
		affinityClasses: ['merchants', 'artisans'],
		incompatible: ['naive'],
		description: 'Saisit vite les opportunités',
	},
	{
		id: 'pious',
		name: 'Pieux',
		valence: 'positive',
		heritability: 0.4,
		skillModifiers: { faith: 2, military: -1 },
		affinityClasses: ['clergy', 'free_peasants'],
		incompatible: ['cynical'],
		description: 'Dévoué à sa foi',
	},
	{
		id: 'charismatic',
		name: 'Charismatique',
		valence: 'positive',
		heritability: 0.15,
		skillModifiers: { diplomacy: 2, leadership: 1 },
		affinityClasses: ['royalty', 'nobility', 'clergy'],
		incompatible: ['shy'],
		description: "Attire la loyauté et l'admiration",
	},
	{
		id: 'scholarly',
		name: 'Érudit',
		valence: 'positive',
		heritability: 0.35,
		skillModifiers: { research: 2, trade: -1 },
		affinityClasses: ['clergy', 'nobility'],
		incompatible: ['ignorant'],
		description: 'Passionné de savoir et de connaissance',
	},
	{
		id: 'industrious',
		name: 'Industrieux',
		valence: 'positive',
		heritability: 0.3,
		skillModifiers: { craftsmanship: 2, agriculture: 1 },
		affinityClasses: ['artisans', 'free_peasants'],
		incompatible: ['lazy'],
		description: 'Travailleur infatigable',
	},
	{
		id: 'just',
		name: 'Juste',
		valence: 'positive',
		heritability: 0.2,
		skillModifiers: { diplomacy: 1, leadership: 1 },
		affinityClasses: ['royalty', 'nobility', 'clergy'],
		incompatible: ['cruel', 'deceitful'],
		description: "Respecte l'équité et le droit",
	},
	{
		id: 'resilient',
		name: 'Résilient',
		valence: 'positive',
		heritability: 0.25,
		skillModifiers: { survival: 2 },
		affinityClasses: ['serfs', 'free_peasants', 'nomads'],
		incompatible: ['fragile'],
		description: 'Endure les épreuves sans fléchir',
	},
	{
		id: 'diplomatic',
		name: 'Diplomate',
		valence: 'positive',
		heritability: 0.2,
		skillModifiers: { diplomacy: 2, espionage: 1 },
		affinityClasses: ['nobility', 'merchants'],
		incompatible: ['hot_tempered'],
		description: 'Résout les conflits par la parole',
	},

	// --- Negative ---
	{
		id: 'cruel',
		name: 'Cruel',
		valence: 'negative',
		heritability: 0.15,
		skillModifiers: { military: 1, diplomacy: -2 },
		affinityClasses: [],
		incompatible: ['just', 'compassionate'],
		description: 'Inflige la souffrance sans remords',
	},
	{
		id: 'cowardly',
		name: 'Lâche',
		valence: 'negative',
		heritability: 0.1,
		skillModifiers: { military: -2, espionage: 1 },
		affinityClasses: [],
		incompatible: ['brave'],
		description: 'Fuit le danger',
	},
	{
		id: 'greedy',
		name: 'Avare',
		valence: 'negative',
		heritability: 0.2,
		skillModifiers: { trade: 1, diplomacy: -1 },
		affinityClasses: ['merchants'],
		incompatible: ['generous'],
		description: 'Accumule sans partager',
	},
	{
		id: 'deceitful',
		name: 'Fourbe',
		valence: 'negative',
		heritability: 0.15,
		skillModifiers: { espionage: 2, diplomacy: -1 },
		affinityClasses: [],
		incompatible: ['just', 'honest'],
		description: 'Ment et manipule pour son avantage',
	},
	{
		id: 'lazy',
		name: 'Paresseux',
		valence: 'negative',
		heritability: 0.1,
		skillModifiers: { craftsmanship: -1, agriculture: -1 },
		affinityClasses: [],
		incompatible: ['industrious'],
		description: "Évite l'effort",
	},
	{
		id: 'hot_tempered',
		name: 'Colérique',
		valence: 'negative',
		heritability: 0.2,
		skillModifiers: { military: 1, diplomacy: -2 },
		affinityClasses: ['warriors'],
		incompatible: ['diplomatic', 'patient'],
		description: "S'emporte facilement",
	},
	{
		id: 'naive',
		name: 'Naïf',
		valence: 'negative',
		heritability: 0.1,
		skillModifiers: { trade: -1, espionage: -1, faith: 1 },
		affinityClasses: [],
		incompatible: ['shrewd'],
		description: 'Se laisse facilement tromper',
	},
	{
		id: 'fragile',
		name: 'Fragile',
		valence: 'negative',
		heritability: 0.15,
		skillModifiers: { survival: -2, research: 1 },
		affinityClasses: [],
		incompatible: ['resilient'],
		description: 'Constitution faible, tombe souvent malade',
	},

	// --- Neutral ---
	{
		id: 'content',
		name: 'Satisfait',
		valence: 'neutral',
		heritability: 0.2,
		skillModifiers: { survival: 1, diplomacy: 1 },
		affinityClasses: ['free_peasants', 'serfs'],
		incompatible: ['ambitious'],
		description: "Heureux de ce qu'il a",
	},
	{
		id: 'cynical',
		name: 'Cynique',
		valence: 'neutral',
		heritability: 0.15,
		skillModifiers: { espionage: 1, faith: -1 },
		affinityClasses: ['merchants', 'nobility'],
		incompatible: ['pious', 'naive'],
		description: 'Doute de tout et de tous',
	},
	{
		id: 'patient',
		name: 'Patient',
		valence: 'neutral',
		heritability: 0.25,
		skillModifiers: { research: 1, craftsmanship: 1 },
		affinityClasses: ['clergy', 'artisans'],
		incompatible: ['hot_tempered'],
		description: 'Sait attendre le bon moment',
	},
	{
		id: 'generous',
		name: 'Généreux',
		valence: 'neutral',
		heritability: 0.2,
		skillModifiers: { diplomacy: 1, trade: -1 },
		affinityClasses: ['royalty', 'clergy'],
		incompatible: ['greedy'],
		description: 'Donne sans compter',
	},
	{
		id: 'shy',
		name: 'Réservé',
		valence: 'neutral',
		heritability: 0.15,
		skillModifiers: { espionage: 1, diplomacy: -1 },
		affinityClasses: ['artisans', 'serfs'],
		incompatible: ['charismatic'],
		description: "Préfère l'ombre à la lumière",
	},
	{
		id: 'honest',
		name: 'Honnête',
		valence: 'neutral',
		heritability: 0.3,
		skillModifiers: { diplomacy: 1, espionage: -2 },
		affinityClasses: ['free_peasants', 'clergy'],
		incompatible: ['deceitful'],
		description: 'Dit toujours la vérité, même quand ça coûte',
	},
	{
		id: 'compassionate',
		name: 'Compatissant',
		valence: 'neutral',
		heritability: 0.2,
		skillModifiers: { faith: 1, military: -1 },
		affinityClasses: ['clergy'],
		incompatible: ['cruel'],
		description: "Ressent la souffrance d'autrui",
	},
	{
		id: 'stubborn',
		name: 'Têtu',
		valence: 'neutral',
		heritability: 0.25,
		skillModifiers: { survival: 1, diplomacy: -1 },
		affinityClasses: ['free_peasants', 'warriors'],
		incompatible: [],
		description: "Ne change jamais d'avis",
	},
]

// Index for fast lookup
const traitIndex = new Map(TRAIT_CATALOG.map((t) => [t.id, t]))

export function getTraitDef(traitId: string): TraitDefinition | undefined {
	return traitIndex.get(traitId)
}

// ----------------------------------------------------------------------------
// Skill catalog — base skills for the medieval world
// ----------------------------------------------------------------------------

export const SKILL_IDS = [
	'diplomacy',
	'military',
	'trade',
	'faith',
	'research',
	'espionage',
	'craftsmanship',
	'agriculture',
	'leadership',
	'survival',
] as const

export type SkillId = (typeof SKILL_IDS)[number] | (string & {})

// ----------------------------------------------------------------------------
// Trait generation
// ----------------------------------------------------------------------------

/** Maximum traits a character can have */
const MAX_TRAITS = 4

/** Generate initial traits for a newborn or new character */
export function generateTraits(
	socialClass: SocialClass,
	parentTraits: string[],
	rng: SeededRNG,
	count = 2,
): string[] {
	const traits: string[] = []
	const excluded = new Set<string>()
	const target = Math.min(count, MAX_TRAITS)

	// 1. Try to inherit from parent
	for (const parentTrait of parentTraits) {
		if (traits.length >= target) break
		const def = getTraitDef(parentTrait)
		if (def && rng.chance(def.heritability)) {
			traits.push(parentTrait)
			excluded.add(parentTrait)
			for (const inc of def.incompatible) excluded.add(inc)
		}
	}

	// 2. Fill with class-affinity traits
	if (traits.length < target) {
		const affinityTraits = TRAIT_CATALOG.filter(
			(t) =>
				!excluded.has(t.id) &&
				t.affinityClasses.includes(socialClass) &&
				!traits.includes(t.id),
		)
		const shuffled = rng.shuffle(affinityTraits)
		for (const t of shuffled) {
			if (traits.length >= target) break
			if (!t.incompatible.some((inc) => traits.includes(inc))) {
				traits.push(t.id)
				excluded.add(t.id)
				for (const inc of t.incompatible) excluded.add(inc)
			}
		}
	}

	// 3. Fill remaining randomly
	if (traits.length < target) {
		const remaining = TRAIT_CATALOG.filter(
			(t) =>
				!excluded.has(t.id) &&
				!traits.includes(t.id) &&
				!t.incompatible.some((inc) => traits.includes(inc)),
		)
		const shuffled = rng.shuffle(remaining)
		for (const t of shuffled) {
			if (traits.length >= target) break
			traits.push(t.id)
			for (const inc of t.incompatible) excluded.add(inc)
		}
	}

	return traits
}

// ----------------------------------------------------------------------------
// Skill generation & development
// ----------------------------------------------------------------------------

/** Initial skill ranges by social class */
export const CLASS_SKILL_PROFILES: Record<
	string,
	Partial<Record<string, [number, number]>>
> = {
	royalty: { diplomacy: [4, 7], leadership: [3, 6], military: [2, 5] },
	nobility: { diplomacy: [3, 6], military: [3, 6], leadership: [2, 5] },
	clergy: { faith: [4, 7], research: [3, 6], diplomacy: [2, 4] },
	merchants: { trade: [4, 7], diplomacy: [2, 5], espionage: [1, 3] },
	artisans: { craftsmanship: [4, 7], trade: [2, 4] },
	free_peasants: { agriculture: [4, 7], survival: [3, 5] },
	serfs: { agriculture: [3, 6], survival: [3, 6] },
	slaves: { survival: [3, 6] },
	nomads: { survival: [4, 7], military: [2, 5], trade: [1, 3] },
	warriors: { military: [4, 7], survival: [3, 5], leadership: [1, 3] },
}

/** Generate initial skills for a new character */
export function generateSkills(
	socialClass: SocialClass,
	traits: string[],
	rng: SeededRNG,
): Record<string, Level> {
	const skills: Record<string, number> = {}

	// Base: all skills at 1
	for (const skill of SKILL_IDS) {
		skills[skill] = 1
	}

	// Apply class profile
	const profile = CLASS_SKILL_PROFILES[socialClass] ?? {}
	for (const [skill, range] of Object.entries(profile)) {
		if (range) {
			skills[skill] = rng.intBetween(range[0], range[1])
		}
	}

	// Apply trait modifiers
	for (const traitId of traits) {
		const def = getTraitDef(traitId)
		if (!def) continue
		for (const [skill, mod] of Object.entries(def.skillModifiers)) {
			skills[skill] = Math.max(
				0,
				Math.min(10, (skills[skill] ?? 1) + (mod ?? 0)),
			)
		}
	}

	// Cast to Level
	const result: Record<string, Level> = {}
	for (const [k, v] of Object.entries(skills)) {
		result[k] = Math.max(0, Math.min(10, Math.round(v))) as Level
	}

	return result
}

/**
 * Develop skills over time based on the character's actions and social class.
 * Called periodically (e.g. once per year) to simulate learning.
 */
export function developSkills(
	member: FamilyMember,
	actionCategories: string[],
	rng: SeededRNG,
): void {
	// Map action categories to related skills
	const categoryToSkill: Record<string, string> = {
		trade: 'trade',
		diplomacy: 'diplomacy',
		military: 'military',
		research: 'research',
		religious: 'faith',
		espionage: 'espionage',
		build: 'craftsmanship',
		explore: 'survival',
		social: 'leadership',
	}

	for (const cat of actionCategories) {
		const skill = categoryToSkill[cat]
		if (!skill) continue
		const current = member.skills[skill] ?? 1
		if (current >= 10) continue

		// 30% base chance to gain +1, decreasing with level
		const gainProb = 0.3 * (1 - current / 12)
		if (rng.chance(gainProb)) {
			member.skills[skill] = Math.min(10, current + 1) as Level
		}
	}
}

/**
 * Compute the net skill modifier from traits for a given skill.
 */
export function traitSkillBonus(traits: string[], skillId: string): number {
	let bonus = 0
	for (const traitId of traits) {
		const def = getTraitDef(traitId)
		if (def?.skillModifiers[skillId]) {
			bonus += def.skillModifiers[skillId]
		}
	}
	return bonus
}
