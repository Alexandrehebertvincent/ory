// ============================================================================
// Life Cycle Simulation — Aging, marriage, children, death, succession
// ============================================================================
// GDD §3.3: "Naissance → enfance → adolescence → adulte → vieillesse → mort
// → transition vers le descendant choisi"
//
// Called once per tick (1 week). Most events only fire at year boundaries
// or when specific conditions are met.
// ============================================================================

import type {
	EntityId,
	GameYear,
	Level,
	FamilyLine,
	FamilyMember,
	Gender,
	LifeStage,
} from '../../../shared/src/types/world'
import type {
	GameState,
	StaticData,
	SimConfig,
	TickLogEntry,
	PendingDecision,
	DecisionOption,
	SeededRNG,
	UrgencyWeight,
} from '../types'
import { generateTraits, generateSkills } from './traitSystem'
import { computeLifeStage, generateName } from './characterCreation'

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------

/** Marriage age range */
const MIN_MARRIAGE_AGE = 14
const MAX_MARRIAGE_AGE = 45

/** Childbearing age range */
const MIN_CHILDBEARING_AGE = 16
const MAX_CHILDBEARING_AGE = 42

/** Base annual probability of having a child when married (adjusted by health) */
const BASE_FERTILITY_RATE = 0.15

/** Base annual probability of natural death by age bracket */
const MORTALITY_TABLE: Array<{
	minAge: number
	maxAge: number
	annualRate: number
}> = [
	{ minAge: 0, maxAge: 2, annualRate: 0.25 }, // infant mortality
	{ minAge: 3, maxAge: 11, annualRate: 0.03 },
	{ minAge: 12, maxAge: 17, annualRate: 0.02 },
	{ minAge: 18, maxAge: 34, annualRate: 0.015 },
	{ minAge: 35, maxAge: 49, annualRate: 0.025 },
	{ minAge: 50, maxAge: 59, annualRate: 0.05 },
	{ minAge: 60, maxAge: 69, annualRate: 0.1 },
	{ minAge: 70, maxAge: 79, annualRate: 0.2 },
	{ minAge: 80, maxAge: 999, annualRate: 0.4 },
]

/** Health decline per year in old age */
const ELDER_HEALTH_DECLINE_PER_YEAR = 0.5

/** Weeks per year (for probability scaling) */
const WEEKS_PER_YEAR = 52

/** Deadline ticks for life decisions */
const LIFE_DECISION_DEADLINE = 8 // 2 months

// ----------------------------------------------------------------------------
// Main entry: simulate one tick of life cycle for all family lines
// ----------------------------------------------------------------------------

/**
 * Simulate life cycle for all family lines. Called once per tick.
 * Handles: aging, life stage transitions, marriage, children, death, succession.
 */
export function simulateLifeCycle(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
): TickLogEntry[] {
	const log: TickLogEntry[] = []
	const currentTick = Math.round(
		state.currentYear * WEEKS_PER_YEAR + state.currentWeek,
	)

	for (const family of state.familyLines) {
		const head = family.members.find((m) => m.id === family.currentHeadId)
		if (!head || head.deathYear !== null) continue

		const age = state.currentYear - head.birthYear

		// --- Life stage transition (check each tick, fires on transition) ---
		const newStage = computeLifeStage(age)
		if (newStage !== head.lifeStage) {
			const oldStage = head.lifeStage
			head.lifeStage = newStage
			log.push({
				year: state.currentYear,
				category: 'life_cycle',
				nationId: family.nationId,
				message: `${head.name} entre dans la phase ${newStage} (${age} ans)`,
				data: { memberId: head.id, familyId: family.id, oldStage, newStage },
			})

			// Trigger life cycle decisions at stage transitions
			const decisions = generateLifeStageDecisions(
				family,
				head,
				newStage,
				state,
				staticData,
				rng,
				currentTick,
			)
			state.pendingDecisions.push(...decisions)
		}

		// --- Weekly checks (only once per year, on week 1 of birth month) ---
		const birthWeek = ((head.birthYear * 7) % WEEKS_PER_YEAR) + 1
		const isAnniversaryWeek = state.currentWeek === birthWeek

		if (isAnniversaryWeek) {
			// Health decline for elders
			if (head.lifeStage === 'elder') {
				head.health = Math.max(
					0,
					Math.round((head.health - ELDER_HEALTH_DECLINE_PER_YEAR) * 10) / 10,
				) as Level
			}

			// Marriage check (if unmarried adult)
			if (
				head.spouseId === null &&
				age >= MIN_MARRIAGE_AGE &&
				age <= MAX_MARRIAGE_AGE &&
				head.lifeStage !== 'elder'
			) {
				const marriageProb = computeMarriageProbability(head, family, state)
				if (rng.chance(marriageProb)) {
					const marriageDecision = generateMarriageDecision(
						family,
						head,
						state,
						staticData,
						rng,
						currentTick,
					)
					if (marriageDecision) {
						state.pendingDecisions.push(marriageDecision)
					}
				}
			}

			// Children check (if married and in childbearing age)
			if (
				head.spouseId !== null &&
				age >= MIN_CHILDBEARING_AGE &&
				age <= MAX_CHILDBEARING_AGE
			) {
				const fertilityProb = BASE_FERTILITY_RATE * (head.health / 10)
				if (rng.chance(fertilityProb)) {
					const child = generateChild(
						family,
						head,
						state.currentYear,
						staticData,
						rng,
					)
					family.members.push(child)
					head.childrenIds.push(child.id)
					log.push({
						year: state.currentYear,
						category: 'life_cycle',
						nationId: family.nationId,
						message: `Naissance de ${child.name} dans la famille ${family.surname}`,
						data: { childId: child.id, parentId: head.id, familyId: family.id },
					})
				}
			}

			// Death check
			const deathProb = computeDeathProbability(head, age, state)
			if (rng.chance(deathProb)) {
				head.deathYear = state.currentYear
				head.isPlayerControlled = false
				log.push({
					year: state.currentYear,
					category: 'life_cycle',
					nationId: family.nationId,
					message: `${head.name} ${family.surname} est décédé(e) à l'âge de ${age} ans`,
					data: { memberId: head.id, familyId: family.id, age },
				})

				// Trigger succession
				const successionLog = handleSuccession(
					family,
					head,
					state,
					staticData,
					rng,
					currentTick,
				)
				log.push(...successionLog)
			}
		}

		// --- Update life stage for all living non-head members ---
		for (const member of family.members) {
			if (member.deathYear !== null || member.id === head.id) continue
			const memberAge = state.currentYear - member.birthYear
			member.lifeStage = computeLifeStage(memberAge)

			// NPC member death check (once per year on anniversary)
			const memberBirthWeek = ((member.birthYear * 7) % WEEKS_PER_YEAR) + 1
			if (state.currentWeek === memberBirthWeek) {
				const memberDeathProb = computeDeathProbability(
					member,
					memberAge,
					state,
				)
				if (rng.chance(memberDeathProb)) {
					member.deathYear = state.currentYear
				}
			}
		}
	}

	return log
}

// ----------------------------------------------------------------------------
// Death probability
// ----------------------------------------------------------------------------

function computeDeathProbability(
	member: FamilyMember,
	age: number,
	state: GameState,
): number {
	const bracket = MORTALITY_TABLE.find(
		(b) => age >= b.minAge && age <= b.maxAge,
	)
	if (!bracket) return 0.5

	let annualRate = bracket.annualRate

	// Health modifier: low health increases death rate
	const healthFactor = 1 + (5 - member.health) * 0.1
	annualRate *= Math.max(0.5, healthFactor)

	// Nation health modifier
	const nationHealth = state.nationHealth.find(
		(h) => h.nationId === member.nationId,
	)
	if (nationHealth) {
		// Active diseases increase death rate
		const diseaseCount = nationHealth.activeDiseases?.length ?? 0
		annualRate *= 1 + diseaseCount * 0.1

		// Medical knowledge decreases death rate
		annualRate *= 1 - (nationHealth.medicalKnowledge ?? 0) * 0.03
	}

	// Convert annual rate to weekly probability
	return 1 - Math.pow(1 - annualRate, 1 / WEEKS_PER_YEAR)
}

// ----------------------------------------------------------------------------
// Marriage
// ----------------------------------------------------------------------------

function computeMarriageProbability(
	head: FamilyMember,
	family: FamilyLine,
	state: GameState,
): number {
	const age = state.currentYear - head.birthYear
	let prob = 0.15 // Base 15% per year

	// Social modifiers
	if (family.socialClass === 'nobility' || family.socialClass === 'royalty') {
		prob *= 1.5 // Arranged marriages more common
	}
	if (family.socialClass === 'clergy') {
		prob *= 0.1 // Very rare
	}

	// Age modifiers
	if (age > 30) prob *= 0.5
	if (age > 40) prob *= 0.3

	// Reputation helps
	prob *= 1 + family.reputation * 0.05

	// Convert annual to weekly
	return 1 - Math.pow(1 - prob, 1 / WEEKS_PER_YEAR)
}

function generateMarriageDecision(
	family: FamilyLine,
	head: FamilyMember,
	state: GameState,
	staticData: StaticData,
	rng: SeededRNG,
	currentTick: number,
): PendingDecision | null {
	if (!family.playerId) return null

	// Generate 2-3 potential spouses
	const spouseGender: Gender = head.gender === 'male' ? 'female' : 'male'
	const options: DecisionOption[] = []

	// Option 1: Same-class marriage (stability)
	const name1 = generateName(family.nationId, spouseGender, staticData, rng)
	options.push({
		id: `opt_marry_same_${currentTick}`,
		type: 'optimal',
		label: `Épouser ${name1.firstName} ${name1.surname} (${family.socialClass})`,
		description: `Un mariage au sein de votre classe. Solide et prévisible.`,
		predictedEffects: ['Stabilité familiale', 'Réputation +1'],
		risks: [],
		confidence: 0.8,
	})

	// Option 2: Ambitious marriage (higher class or richer)
	const name2 = generateName(family.nationId, spouseGender, staticData, rng)
	options.push({
		id: `opt_marry_ambitious_${currentTick}`,
		type: 'historical',
		label: `Épouser ${name2.firstName} ${name2.surname} (alliance ambitieuse)`,
		description: `Un mariage qui pourrait élever le statut de votre famille, mais avec des obligations.`,
		predictedEffects: ['Réputation +2', 'Nouvelles obligations'],
		risks: ['Attentes familiales élevées'],
		historicalReference:
			"Les mariages stratégiques étaient la norme pour l'ascension sociale",
		confidence: 0.6,
	})

	// Option 3: Decline
	options.push({
		id: `opt_marry_decline_${currentTick}`,
		type: 'free',
		label: 'Rester célibataire pour le moment',
		description: 'Vous préférez attendre une meilleure opportunité.',
		predictedEffects: ["Liberté d'action"],
		risks: ["Pas d'héritier sans mariage"],
		confidence: 0.5,
	})

	return {
		id: `dec_marriage_${family.id}_${currentTick}`,
		playerId: family.playerId,
		nationId: family.nationId,
		familyLineId: family.id,
		source: 'life_cycle',
		narrativeContext: `${head.name} ${family.surname} est en âge de se marier. Plusieurs prétendants se présentent.`,
		options,
		urgency: 2 as UrgencyWeight,
		createdAtTick: currentTick,
		deadlineTick: currentTick + LIFE_DECISION_DEADLINE,
		defaultOptionId: options[0].id,
		resolved: false,
	}
}

// ----------------------------------------------------------------------------
// Children
// ----------------------------------------------------------------------------

function generateChild(
	family: FamilyLine,
	parent: FamilyMember,
	currentYear: GameYear,
	staticData: StaticData,
	rng: SeededRNG,
): FamilyMember {
	const gender: Gender = rng.chance(0.5) ? 'male' : 'female'
	const { firstName } = generateName(family.nationId, gender, staticData, rng)

	const traits = generateTraits(family.socialClass, parent.traits, rng, 2)
	const skills = generateSkills(family.socialClass, traits, rng)

	return {
		id: `member_${family.id}_${currentYear}_${Math.floor(rng.next() * 10000)}`,
		name: firstName,
		gender,
		birthYear: currentYear,
		deathYear: null,
		parentId: parent.id,
		spouseId: null,
		childrenIds: [],
		nationId: family.nationId,
		socialClass: family.socialClass,
		traits,
		skills,
		isPlayerControlled: false, // will become player-controlled on succession
		lifeStage: 'infant',
		health: rng.intBetween(5, 10) as Level,
	}
}

// ----------------------------------------------------------------------------
// Succession
// ----------------------------------------------------------------------------

/**
 * Handle death of the family head. Either auto-select heir or create
 * a PendingDecision for the player to choose.
 */
function handleSuccession(
	family: FamilyLine,
	deceased: FamilyMember,
	state: GameState,
	staticData: StaticData,
	rng: SeededRNG,
	currentTick: number,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	// Find eligible heirs: living children, oldest first
	const eligibleHeirs = family.members
		.filter(
			(m) =>
				m.deathYear === null &&
				m.parentId === deceased.id &&
				computeLifeStage(state.currentYear - m.birthYear) !== 'infant',
		)
		.sort((a, b) => a.birthYear - b.birthYear) // oldest first

	if (eligibleHeirs.length === 0) {
		// No heirs — find any living adult family member
		const anyAdult = family.members.find(
			(m) =>
				m.deathYear === null &&
				m.id !== deceased.id &&
				computeLifeStage(state.currentYear - m.birthYear) === 'adult',
		)

		if (anyAdult) {
			applySuccession(family, anyAdult, state.currentYear)
			log.push({
				year: state.currentYear,
				category: 'life_cycle',
				nationId: family.nationId,
				message: `${anyAdult.name} ${family.surname} hérite de la lignée faute d'héritier direct`,
				data: {
					newHeadId: anyAdult.id,
					familyId: family.id,
					type: 'emergency',
				},
			})
		} else {
			// Lineage extinction — generate a new heir to keep the game going
			const heir = generateChild(
				family,
				deceased,
				state.currentYear,
				staticData,
				rng,
			)
			heir.lifeStage = 'adolescent'
			heir.isPlayerControlled = true
			const age = 16
			heir.birthYear = state.currentYear - age
			heir.skills = generateSkills(family.socialClass, heir.traits, rng)
			family.members.push(heir)
			applySuccession(family, heir, state.currentYear)
			log.push({
				year: state.currentYear,
				category: 'life_cycle',
				nationId: family.nationId,
				message: `Un cousin éloigné, ${heir.name}, reprend la lignée ${family.surname}`,
				data: {
					newHeadId: heir.id,
					familyId: family.id,
					type: 'distant_relative',
				},
			})
		}
		return log
	}

	// If player lineage with multiple heirs, create a succession decision
	if (family.playerId && eligibleHeirs.length > 1) {
		const options: DecisionOption[] = eligibleHeirs
			.slice(0, 4)
			.map((heir, i) => {
				const age = state.currentYear - heir.birthYear
				return {
					id: `opt_heir_${heir.id}`,
					type: (i === 0 ? 'historical' : 'optimal') as DecisionOption['type'],
					label: `${heir.name} (${age} ans, ${heir.lifeStage})`,
					description: `Traits: ${heir.traits.join(', ') || 'aucun'}. Compétences principales: ${topSkills(heir)}`,
					predictedEffects:
						i === 0
							? ['Succession légitime', 'Stabilité']
							: ['Succession contestable'],
					risks: i > 0 ? ['Héritier non-primogène, rivalités possibles'] : [],
					historicalReference:
						i === 0
							? 'La primogéniture était la norme dans la plupart des monarchies'
							: undefined,
					confidence: i === 0 ? 0.8 : 0.6,
				}
			})

		state.pendingDecisions.push({
			id: `dec_succession_${family.id}_${currentTick}`,
			playerId: family.playerId,
			nationId: family.nationId,
			familyLineId: family.id,
			source: 'life_cycle',
			narrativeContext: `${deceased.name} ${family.surname} est décédé(e). La succession de la lignée doit être décidée.`,
			options,
			urgency: 8 as UrgencyWeight,
			createdAtTick: currentTick,
			deadlineTick: currentTick + 4, // urgent: 1 month
			defaultOptionId: options[0].id, // primogeniture by default
			resolved: false,
		})

		// Auto-apply eldest as temporary head until player decides
		applySuccession(family, eligibleHeirs[0], state.currentYear)

		log.push({
			year: state.currentYear,
			category: 'life_cycle',
			nationId: family.nationId,
			message: `Succession ouverte pour la lignée ${family.surname}. ${eligibleHeirs.length} héritiers possibles.`,
			data: {
				familyId: family.id,
				heirCount: eligibleHeirs.length,
				tempHeadId: eligibleHeirs[0].id,
			},
		})
	} else {
		// Single heir or NPC lineage: auto-succeed
		const heir = eligibleHeirs[0]
		applySuccession(family, heir, state.currentYear)
		log.push({
			year: state.currentYear,
			category: 'life_cycle',
			nationId: family.nationId,
			message: `${heir.name} ${family.surname} succède à ${deceased.name}`,
			data: { newHeadId: heir.id, familyId: family.id, type: 'primogeniture' },
		})
	}

	return log
}

/**
 * Apply succession: transfer player control to the new head.
 */
function applySuccession(
	family: FamilyLine,
	newHead: FamilyMember,
	currentYear: GameYear,
): void {
	// Remove player control from all members
	for (const member of family.members) {
		member.isPlayerControlled = false
	}

	// Set new head
	family.currentHeadId = newHead.id
	newHead.isPlayerControlled = true
}

// ----------------------------------------------------------------------------
// Life stage decisions
// ----------------------------------------------------------------------------

function generateLifeStageDecisions(
	family: FamilyLine,
	head: FamilyMember,
	newStage: LifeStage,
	state: GameState,
	staticData: StaticData,
	rng: SeededRNG,
	currentTick: number,
): PendingDecision[] {
	if (!family.playerId) return [] // NPC lineages don't get decisions

	const decisions: PendingDecision[] = []

	if (newStage === 'adolescent') {
		// Apprenticeship / education choice
		decisions.push({
			id: `dec_adolescence_${family.id}_${currentTick}`,
			playerId: family.playerId,
			nationId: family.nationId,
			familyLineId: family.id,
			source: 'life_cycle',
			narrativeContext: `${head.name} entre dans l'adolescence. Il est temps de choisir une voie d'apprentissage.`,
			options: [
				{
					id: `opt_apprentice_trade_${currentTick}`,
					type: 'optimal',
					label: 'Apprentissage commercial',
					description:
						"Formation auprès d'un marchand. Développe le commerce et la négociation.",
					predictedEffects: ['Commerce +2 au fil du temps'],
					risks: [],
					confidence: 0.7,
				},
				{
					id: `opt_apprentice_military_${currentTick}`,
					type: 'historical',
					label: 'Formation militaire',
					description: 'Entraînement au combat et à la stratégie.',
					predictedEffects: ['Militaire +2 au fil du temps'],
					risks: ['Risques physiques'],
					historicalReference:
						'Les écuyers commençaient leur formation dès 12-14 ans',
					confidence: 0.7,
				},
				{
					id: `opt_apprentice_scholarly_${currentTick}`,
					type: 'optimal',
					label: 'Études et érudition',
					description: "Formation dans un monastère ou auprès d'un lettré.",
					predictedEffects: ['Recherche +2 au fil du temps'],
					risks: [],
					confidence: 0.7,
				},
				{
					id: `opt_apprentice_craft_${currentTick}`,
					type: 'free',
					label: "Apprentissage d'un métier",
					description: 'Formation pratique dans un atelier ou une guilde.',
					predictedEffects: ['Artisanat +2 au fil du temps'],
					risks: [],
					confidence: 0.7,
				},
			],
			urgency: 3 as UrgencyWeight,
			createdAtTick: currentTick,
			deadlineTick: currentTick + LIFE_DECISION_DEADLINE,
			defaultOptionId: `opt_apprentice_trade_${currentTick}`,
			resolved: false,
		})
	}

	if (newStage === 'elder') {
		// Elder — begin thinking about legacy
		decisions.push({
			id: `dec_elder_${family.id}_${currentTick}`,
			playerId: family.playerId,
			nationId: family.nationId,
			familyLineId: family.id,
			source: 'life_cycle',
			narrativeContext: `${head.name} ${family.surname} vieillit. Le temps est venu de penser à l'avenir de la lignée.`,
			options: [
				{
					id: `opt_legacy_wealth_${currentTick}`,
					type: 'optimal',
					label: 'Accumuler un héritage',
					description:
						'Concentrer les efforts sur la transmission de richesse.',
					predictedEffects: ['Richesse familiale préservée pour le successeur'],
					risks: [],
					confidence: 0.7,
				},
				{
					id: `opt_legacy_reputation_${currentTick}`,
					type: 'historical',
					label: 'Bâtir une réputation',
					description:
						'Investir dans la renommée familiale via des actes publics.',
					predictedEffects: ['Réputation +1 pour le successeur'],
					risks: ['Coût en richesse'],
					historicalReference:
						'Les mécènes médiévaux finançaient cathédrales et monastères',
					confidence: 0.7,
				},
				{
					id: `opt_legacy_train_${currentTick}`,
					type: 'free',
					label: "Former l'héritier",
					description:
						'Transmettre directement vos compétences à votre successeur.',
					predictedEffects: [
						"L'héritier commence avec de meilleures compétences",
					],
					risks: ["Dépend de la relation avec l'héritier"],
					confidence: 0.6,
				},
			],
			urgency: 2 as UrgencyWeight,
			createdAtTick: currentTick,
			deadlineTick: currentTick + LIFE_DECISION_DEADLINE * 2,
			defaultOptionId: `opt_legacy_wealth_${currentTick}`,
			resolved: false,
		})
	}

	return decisions
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function topSkills(member: FamilyMember): string {
	return Object.entries(member.skills)
		.sort(([, a], [, b]) => b - a)
		.slice(0, 3)
		.map(([name, level]) => `${name} ${level}`)
		.join(', ')
}
