// ============================================================================
// Character Creation — New lineage & first character
// ============================================================================
// GDD §3.8: "À la création de sa lignée, le joueur choisit sa nation
// et sa classe sociale d'origine."
//
// Restrictions:
// - 'royalty' and 'slaves' not selectable at start (GDD §3.8)
// - Available classes depend on nation's socialGroups in Population
// - Names generated from CulturalNamePool for the nation
// ============================================================================

import type {
	EntityId,
	GameYear,
	Level,
	SocialClass,
	FamilyLine,
	FamilyMember,
	Gender,
	LifeStage,
	Population,
	CulturalNamePool,
} from '../../../shared/src/types/world'
import type { GameState, StaticData, SeededRNG } from '../types'
import { generateTraits, generateSkills } from './traitSystem'

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------

/** Classes not selectable at start (GDD §3.8) */
export const BLOCKED_STARTING_CLASSES: SocialClass[] = ['royalty', 'slaves']

/** Starting age range for the first character */
const STARTING_AGE_MIN = 18
const STARTING_AGE_MAX = 25

// ----------------------------------------------------------------------------
// Validation
// ----------------------------------------------------------------------------

export interface CreationValidation {
	valid: boolean
	errors: string[]
}

/**
 * Check whether the player's creation choices are valid.
 * Validates nation exists, class is available, and restrictions are met.
 */
export function validateCreation(
	nationId: EntityId,
	socialClass: SocialClass,
	state: GameState,
	staticData: StaticData,
): CreationValidation {
	const errors: string[] = []

	// Nation must exist
	const nation = state.nations.find((n) => n.id === nationId)
	if (!nation) {
		errors.push(`Nation '${nationId}' n'existe pas`)
		return { valid: false, errors }
	}

	// Class must not be blocked
	if (BLOCKED_STARTING_CLASSES.includes(socialClass)) {
		errors.push(`La classe '${socialClass}' n'est pas sélectionnable au départ`)
	}

	// Class must exist in nation's population social groups
	const pop = state.populations.find((p) => p.nationId === nationId)
	if (pop) {
		const hasClass = pop.socialGroups.some((g) => g.class === socialClass)
		if (!hasClass) {
			errors.push(
				`La classe '${socialClass}' n'existe pas dans la nation '${nationId}'`,
			)
		}
	}

	return { valid: errors.length === 0, errors }
}

/**
 * Return the list of selectable social classes for a given nation.
 */
export function getAvailableClasses(
	nationId: EntityId,
	state: GameState,
): SocialClass[] {
	const pop = state.populations.find((p) => p.nationId === nationId)
	if (!pop) return []

	return pop.socialGroups
		.map((g) => g.class)
		.filter((c) => !BLOCKED_STARTING_CLASSES.includes(c))
}

// ----------------------------------------------------------------------------
// Name generation
// ----------------------------------------------------------------------------

/**
 * Generate a culturally appropriate name for a character.
 */
export function generateName(
	nationId: EntityId,
	gender: Gender,
	staticData: StaticData,
	rng: SeededRNG,
): { firstName: string; surname: string } {
	const pool = staticData.culturalNamePools.find((p) =>
		p.nationIds.includes(nationId),
	)

	if (!pool) {
		// Fallback generic names
		const firstName =
			gender === 'male'
				? rng.pick(['Jean', 'Pierre', 'Henri', 'Robert', 'Guillaume'])
				: rng.pick(['Marie', 'Jeanne', 'Agnès', 'Mathilde', 'Isabelle'])
		return { firstName, surname: 'Inconnu' }
	}

	const firstNames =
		gender === 'male' ? pool.maleFirstNames : pool.femaleFirstNames
	const firstName = rng.pick(firstNames)
	const surname = rng.pick(pool.surnames)

	return { firstName, surname }
}

// ----------------------------------------------------------------------------
// Character & Lineage creation
// ----------------------------------------------------------------------------

/**
 * Compute the life stage from age.
 */
export function computeLifeStage(age: number): LifeStage {
	if (age <= 2) return 'infant'
	if (age <= 11) return 'child'
	if (age <= 17) return 'adolescent'
	if (age <= 49) return 'adult'
	return 'elder'
}

/**
 * Create the founding character of a new player lineage.
 */
export function createFoundingMember(
	nationId: EntityId,
	socialClass: SocialClass,
	gender: Gender,
	currentYear: GameYear,
	staticData: StaticData,
	rng: SeededRNG,
): { member: FamilyMember; surname: string } {
	const age = rng.intBetween(STARTING_AGE_MIN, STARTING_AGE_MAX)
	const birthYear = currentYear - age
	const { firstName, surname } = generateName(nationId, gender, staticData, rng)

	const traits = generateTraits(socialClass, [], rng, 2)
	const skills = generateSkills(socialClass, traits, rng)

	const member: FamilyMember = {
		id: `member_${nationId}_${Date.now()}_${Math.floor(rng.next() * 10000)}`,
		name: firstName,
		gender,
		birthYear,
		deathYear: null,
		parentId: null,
		spouseId: null,
		childrenIds: [],
		nationId,
		socialClass,
		traits,
		skills,
		isPlayerControlled: true,
		lifeStage: computeLifeStage(age),
		health: rng.intBetween(7, 10) as Level,
	}

	return { member, surname }
}

/**
 * Create a full player lineage (FamilyLine + founding member).
 * This is the main entry point for character creation.
 *
 * Returns null with validation errors if input is invalid.
 */
export function createPlayerLineage(
	playerId: EntityId,
	nationId: EntityId,
	socialClass: SocialClass,
	gender: Gender,
	state: GameState,
	staticData: StaticData,
	rng: SeededRNG,
): { lineage: FamilyLine; errors: null } | { lineage: null; errors: string[] } {
	// Validate
	const validation = validateCreation(nationId, socialClass, state, staticData)
	if (!validation.valid) {
		return { lineage: null, errors: validation.errors }
	}

	// Create founding member
	const { member, surname } = createFoundingMember(
		nationId,
		socialClass,
		gender,
		state.currentYear,
		staticData,
		rng,
	)

	const lineage: FamilyLine = {
		id: `family_${playerId}_${Math.floor(rng.next() * 100000)}`,
		playerId,
		nationId,
		surname,
		foundingYear: state.currentYear,
		currentHeadId: member.id,
		members: [member],
		reputation: socialClassToReputation(socialClass),
		wealth: socialClassToWealth(socialClass),
		socialClass,
	}

	return { lineage, errors: null }
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

/** Initial reputation by social class */
function socialClassToReputation(cls: SocialClass): Level {
	const map: Record<string, Level> = {
		royalty: 9 as Level,
		nobility: 7 as Level,
		clergy: 6 as Level,
		merchants: 4 as Level,
		artisans: 3 as Level,
		warriors: 4 as Level,
		free_peasants: 2 as Level,
		nomads: 2 as Level,
		serfs: 1 as Level,
		slaves: 0 as Level,
	}
	return map[cls] ?? (3 as Level)
}

/** Initial wealth by social class */
function socialClassToWealth(cls: SocialClass): Level {
	const map: Record<string, Level> = {
		royalty: 9 as Level,
		nobility: 7 as Level,
		clergy: 4 as Level,
		merchants: 6 as Level,
		artisans: 4 as Level,
		warriors: 3 as Level,
		free_peasants: 3 as Level,
		nomads: 2 as Level,
		serfs: 1 as Level,
		slaves: 0 as Level,
	}
	return map[cls] ?? (3 as Level)
}
