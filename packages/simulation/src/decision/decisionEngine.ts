// ============================================================================
// Decision Engine — Contextual Choice Generator
// ============================================================================
// "Système de décision IA : proposer des choix contextuels" — GDD Phase 2
//
// Scans the world state for a player and generates PendingDecisions with
// the 3 types of choices defined in GDD §3.1:
//   - Option A: Réplique historique (if a real-world parallel exists)
//   - Option B: Meilleur choix IA (optimal based on context)
//   - Option C: Décision libre du joueur (always available)
// ============================================================================

import type {
	HistoricalEvent,
	EventTemplate,
	FamilyLine,
	LocalPlayerChoice,
	EventPlayerChoice,
} from '../../../shared/src/types/world'
import type {
	GameState,
	StaticData,
	SimConfig,
	TickLogEntry,
	PendingDecision,
	DecisionOption,
	UrgencyWeight,
	GrandMasterAlert,
	SeededRNG,
	PlayerAction,
} from '../types'

// ----------------------------------------------------------------------------
// Configuration
// ----------------------------------------------------------------------------

/** Default deadline in ticks if not overridden */
const DEFAULT_DEADLINE_TICKS = 4 // 4 semaines = ~1 mois de jeu

/** Urgency above which deadline is shorter */
const HIGH_URGENCY_THRESHOLD: UrgencyWeight = 7

/** Shorter deadline for urgent decisions */
const URGENT_DEADLINE_TICKS = 2

// ----------------------------------------------------------------------------
// Historical Event → PendingDecision
// ----------------------------------------------------------------------------

/**
 * Convert a triggered HistoricalEvent with playerChoices into a PendingDecision.
 * Generates the 3 option types when possible.
 */
export function decisionFromHistoricalEvent(
	event: HistoricalEvent,
	familyLine: FamilyLine,
	currentTick: number,
	rng: SeededRNG,
): PendingDecision | null {
	if (event.playerChoices.length === 0) return null

	const options: DecisionOption[] = []

	// Option A — historical replica (if event has historical_outcome)
	if (event.historical_outcome) {
		const historicalChoice = findBestHistoricalMatch(
			event.playerChoices,
			event.historical_outcome,
		)
		if (historicalChoice) {
			options.push({
				id: `${event.id}_hist`,
				type: 'historical',
				label: historicalChoice.label,
				description: `${historicalChoice.description} (comme dans l'histoire réelle)`,
				predictedEffects: describeEffects(historicalChoice.effects),
				risks: [],
				historicalReference: event.historical_outcome,
				confidence: 0.9,
			})
		}
	}

	// Option B — optimal choice(s): rank by severiy impact and pick best
	const rankedChoices = rankEventChoices(event.playerChoices, event.severity)
	for (const ranked of rankedChoices.slice(0, 2)) {
		// Skip if already added as historical
		if (
			options.some(
				(o) => o.id === `${event.id}_hist` && o.label === ranked.choice.label,
			)
		) {
			continue
		}
		options.push({
			id: `${event.id}_opt_${ranked.choice.id}`,
			type: 'optimal',
			label: ranked.choice.label,
			description: ranked.choice.description,
			predictedEffects: describeEffects(ranked.choice.effects),
			risks: ranked.risks,
			confidence: ranked.score,
		})
	}

	// Option C — free choice (always available)
	options.push(makeFreeOption(`${event.id}_free`))

	if (options.length < 2) return null

	const urgency = severityToUrgency(event.severity)
	const deadline =
		urgency >= HIGH_URGENCY_THRESHOLD
			? URGENT_DEADLINE_TICKS
			: DEFAULT_DEADLINE_TICKS

	return {
		id: `dec_hist_${event.id}`,
		playerId: familyLine.playerId ?? familyLine.id,
		nationId: familyLine.nationId,
		familyLineId: familyLine.id,
		source: 'historical_event',
		sourceEntityId: event.id,
		narrativeContext: event.description,
		options,
		urgency,
		createdAtTick: currentTick,
		deadlineTick: currentTick + deadline,
		defaultOptionId: options[0].id, // historical or first optimal
		resolved: false,
	}
}

// ----------------------------------------------------------------------------
// Local Event Template → PendingDecision
// ----------------------------------------------------------------------------

/**
 * Convert an instantiated local EventTemplate into a PendingDecision
 * for a player whose family matches the target class.
 */
export function decisionFromLocalEvent(
	template: EventTemplate,
	familyLine: FamilyLine,
	flavorText: string,
	currentTick: number,
	rng: SeededRNG,
): PendingDecision | null {
	// Filter choices by social class
	const applicableChoices = template.playerChoices.filter(
		(c) =>
			!c.requiredSocialClass ||
			c.requiredSocialClass === 'any' ||
			c.requiredSocialClass === familyLine.socialClass,
	)

	if (applicableChoices.length === 0) return null

	const options: DecisionOption[] = []

	// Option B — rank local choices by net benefit
	const ranked = rankLocalChoices(applicableChoices)
	for (const r of ranked) {
		options.push({
			id: `${template.id}_opt_${r.choice.id}`,
			type: 'optimal',
			label: r.choice.label,
			description: r.choice.description,
			predictedEffects: describeLocalEffects(r.choice.effects),
			risks: r.risks,
			requiredSocialClass: r.choice.requiredSocialClass,
			confidence: r.score,
		})
	}

	// Option C — free choice
	options.push(makeFreeOption(`${template.id}_free`))

	if (options.length < 2) return null

	const urgency = severityToUrgency(template.severity)
	const deadline =
		urgency >= HIGH_URGENCY_THRESHOLD
			? URGENT_DEADLINE_TICKS
			: DEFAULT_DEADLINE_TICKS

	return {
		id: `dec_local_${template.id}_${currentTick}`,
		playerId: familyLine.playerId ?? familyLine.id,
		nationId: familyLine.nationId,
		familyLineId: familyLine.id,
		source: 'local_event',
		sourceEntityId: template.id,
		narrativeContext: flavorText || template.description,
		options,
		urgency,
		createdAtTick: currentTick,
		deadlineTick: currentTick + deadline,
		defaultOptionId: options[0].id,
		resolved: false,
	}
}

// ----------------------------------------------------------------------------
// PlayerAction feedback → PendingDecision
// ----------------------------------------------------------------------------

/**
 * Generate a decision from a PlayerAction that needs confirmation
 * (advisor evaluated it, now the player must choose how to proceed).
 */
export function decisionFromPlayerAction(
	action: PlayerAction,
	familyLine: FamilyLine,
	currentTick: number,
): PendingDecision {
	const options: DecisionOption[] = []

	// Option B — proceed with the action as evaluated
	options.push({
		id: `${action.id}_proceed`,
		type: 'optimal',
		label: 'Procéder comme prévu',
		description: action.description,
		predictedEffects: action.feasibilityOutcome
			? [action.feasibilityOutcome]
			: ['Effets selon évaluation du conseiller'],
		risks: [],
		generatedAction: { ...action, status: 'confirmed' },
		confidence: 0.7,
	})

	// Option B — modify (lighter version)
	options.push({
		id: `${action.id}_modify`,
		type: 'optimal',
		label: "Modifier l'approche",
		description: "Ajuster les paramètres de l'action avant de procéder",
		predictedEffects: ['Impact réduit mais risques moindres'],
		risks: [],
		confidence: 0.5,
	})

	// Cancel
	options.push({
		id: `${action.id}_cancel`,
		type: 'optimal',
		label: 'Abandonner',
		description: 'Ne pas poursuivre cette action',
		predictedEffects: ['Aucun changement — statu quo maintenu'],
		risks: [],
		generatedAction: { ...action, status: 'cancelled' },
		confidence: 0.3,
	})

	// Option C — free choice
	options.push(makeFreeOption(`${action.id}_free`))

	return {
		id: `dec_action_${action.id}`,
		playerId: familyLine.playerId ?? familyLine.id,
		nationId: familyLine.nationId,
		familyLineId: familyLine.id,
		source: 'player_action',
		sourceEntityId: action.id,
		narrativeContext: `Votre projet : ${action.description}`,
		options,
		urgency: 3 as UrgencyWeight,
		createdAtTick: currentTick,
		deadlineTick: currentTick + DEFAULT_DEADLINE_TICKS,
		defaultOptionId: options[0].id,
		resolved: false,
	}
}

// ----------------------------------------------------------------------------
// Tick: Generate decisions for all players
// ----------------------------------------------------------------------------

/**
 * Main entry point — called once per tick to generate PendingDecisions
 * for all player-controlled family lines.
 *
 * Scans:
 * 1. Newly triggered historical events with playerChoices
 * 2. Local events matching player context
 * 3. GrandMaster alerts converted to decisions
 * 4. PlayerActions needing confirmation
 */
export function generateDecisions(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
	currentTick: number,
): { decisions: PendingDecision[]; log: TickLogEntry[] } {
	const decisions: PendingDecision[] = []
	const log: TickLogEntry[] = []

	const playerFamilies = state.familyLines.filter((f) => f.playerId !== null)

	for (const family of playerFamilies) {
		// 1. Historical events that just triggered and affect this player's nation
		const triggeredEvents = state.historicalEvents.filter(
			(e) =>
				e.status === 'triggered' &&
				e.playerChoices.length > 0 &&
				(e.globalEvent || e.affectedNationIds.includes(family.nationId)),
		)

		for (const event of triggeredEvents) {
			// Don't create duplicate decisions for the same event
			const alreadyExists = state.pendingDecisions.some(
				(d) =>
					d.source === 'historical_event' &&
					d.sourceEntityId === event.id &&
					d.familyLineId === family.id,
			)
			if (alreadyExists) continue

			const decision = decisionFromHistoricalEvent(
				event,
				family,
				currentTick,
				rng,
			)
			if (decision) {
				decisions.push(decision)
				log.push({
					year: state.currentYear,
					category: 'decision',
					nationId: family.nationId,
					message: `Décision historique proposée: ${event.name}`,
					data: { eventId: event.id, familyLineId: family.id },
				})
			}
		}

		// 2. GrandMaster alerts targeting this player → decisions
		const alertsForPlayer = state.grandMasterAlerts.filter(
			(a) =>
				!a.processed &&
				a.affectedPlayerIds.includes(family.playerId ?? family.id),
		)

		for (const alert of alertsForPlayer) {
			const decision = decisionFromGrandMasterAlert(alert, family, currentTick)
			if (decision) {
				decisions.push(decision)
				alert.processed = true
				log.push({
					year: state.currentYear,
					category: 'decision',
					nationId: family.nationId,
					message: `Alerte du Grand Maître: ${alert.type}`,
					data: { alertId: alert.id, familyLineId: family.id },
				})
			}
		}

		// 3. PlayerActions in 'evaluated' status → need confirmation
		const actionsNeedingConfirm = state.playerActions.filter(
			(a) =>
				a.status === 'evaluated' &&
				a.playerId === (family.playerId ?? family.id),
		)

		for (const action of actionsNeedingConfirm) {
			const alreadyExists = state.pendingDecisions.some(
				(d) => d.source === 'player_action' && d.sourceEntityId === action.id,
			)
			if (alreadyExists) continue

			decisions.push(decisionFromPlayerAction(action, family, currentTick))
			log.push({
				year: state.currentYear,
				category: 'decision',
				nationId: family.nationId,
				message: `Action en attente de confirmation: ${action.category}`,
				data: { actionId: action.id },
			})
		}
	}

	return { decisions, log }
}

// ----------------------------------------------------------------------------
// Resolve expired decisions (AI timeout)
// ----------------------------------------------------------------------------

/**
 * Auto-resolve decisions that have passed their deadline.
 * The AI picks the default option (most neutral/historical).
 */
export function resolveExpiredDecisions(
	state: GameState,
	currentTick: number,
): { resolvedActions: PlayerAction[]; log: TickLogEntry[] } {
	const resolvedActions: PlayerAction[] = []
	const log: TickLogEntry[] = []

	for (const decision of state.pendingDecisions) {
		if (decision.resolved) continue
		if (currentTick < decision.deadlineTick) continue

		// Auto-resolve with default option
		decision.resolved = true
		decision.chosenOptionId = decision.defaultOptionId
		decision.resolvedBy = 'ai_timeout'

		const chosenOption = decision.options.find(
			(o) => o.id === decision.defaultOptionId,
		)

		// If the chosen option generates an action, add it
		if (chosenOption?.generatedAction) {
			const action: PlayerAction = {
				id: `action_auto_${decision.id}`,
				playerId: decision.playerId,
				nationId: decision.nationId,
				category: chosenOption.generatedAction.category ?? 'social',
				description:
					chosenOption.generatedAction.description ?? chosenOption.description,
				target: chosenOption.generatedAction.target ?? {
					type: 'nation',
					id: decision.nationId,
					name: '',
				},
				secondaryTargets: chosenOption.generatedAction.secondaryTargets ?? [],
				committedResources:
					chosenOption.generatedAction.committedResources ?? [],
				status: 'confirmed',
				createdAtTick: currentTick,
				metadata: { autoResolved: true, decisionId: decision.id },
			}
			resolvedActions.push(action)
		}

		log.push({
			year: state.currentYear,
			category: 'decision',
			nationId: decision.nationId,
			message: `Décision auto-résolue (timeout): ${decision.narrativeContext.slice(0, 80)}`,
			data: {
				decisionId: decision.id,
				chosenOptionId: decision.defaultOptionId,
				resolvedBy: 'ai_timeout',
			},
		})
	}

	return { resolvedActions, log }
}

// ----------------------------------------------------------------------------
// Player choice resolution
// ----------------------------------------------------------------------------

/**
 * Resolve a decision with the player's explicit choice.
 * Returns the generated PlayerAction if applicable.
 */
export function resolvePlayerChoice(
	decision: PendingDecision,
	chosenOptionId: string,
	currentTick: number,
): PlayerAction | null {
	const option = decision.options.find((o) => o.id === chosenOptionId)
	if (!option) return null

	decision.resolved = true
	decision.chosenOptionId = chosenOptionId
	decision.resolvedBy = 'player'

	if (option.generatedAction) {
		return {
			id: `action_player_${decision.id}`,
			playerId: decision.playerId,
			nationId: decision.nationId,
			category: option.generatedAction.category ?? 'social',
			description: option.generatedAction.description ?? option.description,
			target: option.generatedAction.target ?? {
				type: 'nation',
				id: decision.nationId,
				name: '',
			},
			secondaryTargets: option.generatedAction.secondaryTargets ?? [],
			committedResources: option.generatedAction.committedResources ?? [],
			status: 'confirmed',
			createdAtTick: currentTick,
			metadata: { decisionId: decision.id, optionId: chosenOptionId },
		}
	}

	return null
}

// ----------------------------------------------------------------------------
// GrandMasterAlert → PendingDecision
// ----------------------------------------------------------------------------

function decisionFromGrandMasterAlert(
	alert: GrandMasterAlert,
	familyLine: FamilyLine,
	currentTick: number,
): PendingDecision {
	const options: DecisionOption[] = []

	if (alert.imposed) {
		// Imposed — limited choices
		options.push({
			id: `${alert.id}_accept`,
			type: 'optimal',
			label: 'Accepter la situation',
			description: `Faire face à ${alert.description.toLowerCase()}`,
			predictedEffects: ['Adaptation forcée aux circonstances'],
			risks: ['Impact potentiellement négatif si non préparé'],
			confidence: 0.6,
		})
		options.push({
			id: `${alert.id}_resist`,
			type: 'optimal',
			label: 'Résister',
			description: 'Tenter de contrer ou atténuer la situation',
			predictedEffects: ['Résultat incertain — dépend des ressources'],
			risks: ['Échec possible, conséquences aggravées'],
			confidence: 0.4,
		})
	} else {
		// Proposed — opportunity
		options.push({
			id: `${alert.id}_seize`,
			type: 'optimal',
			label: "Saisir l'opportunité",
			description: alert.description,
			predictedEffects: ['Bénéfices potentiels selon le contexte'],
			risks: ['Engagement de ressources', 'Réaction des autres nations'],
			confidence: 0.7,
		})
		options.push({
			id: `${alert.id}_ignore`,
			type: 'optimal',
			label: 'Ignorer',
			description: 'Laisser passer cette opportunité',
			predictedEffects: ['Aucun changement'],
			risks: [],
			confidence: 0.5,
		})
	}

	// Free choice always available
	options.push(makeFreeOption(`${alert.id}_free`))

	const deadline =
		alert.urgency >= HIGH_URGENCY_THRESHOLD
			? URGENT_DEADLINE_TICKS
			: DEFAULT_DEADLINE_TICKS

	return {
		id: `dec_gm_${alert.id}`,
		playerId: familyLine.playerId ?? familyLine.id,
		nationId: familyLine.nationId,
		familyLineId: familyLine.id,
		source: 'grand_master',
		sourceEntityId: alert.id,
		narrativeContext: alert.description,
		options,
		urgency: alert.urgency,
		createdAtTick: currentTick,
		deadlineTick: currentTick + deadline,
		defaultOptionId: options[0].id,
		resolved: false,
	}
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function makeFreeOption(id: string): DecisionOption {
	return {
		id,
		type: 'free',
		label: 'Action libre',
		description: 'Formulez votre propre réponse à la situation',
		predictedEffects: ['Dépend de votre action — le conseiller évaluera'],
		risks: ['Résultat imprévisible'],
		confidence: 0.3,
	}
}

function severityToUrgency(severity: number): UrgencyWeight {
	// severity 1-10 → urgency 0-10
	return Math.min(10, Math.max(0, Math.round(severity))) as UrgencyWeight
}

/**
 * Find the event choice most aligned with the real historical outcome.
 * Simple keyword overlap heuristic.
 */
function findBestHistoricalMatch(
	choices: EventPlayerChoice[],
	historicalOutcome: string,
): EventPlayerChoice | null {
	if (choices.length === 0) return null

	const outcomeWords = historicalOutcome.toLowerCase().split(/\s+/)
	let best: EventPlayerChoice | null = null
	let bestScore = 0

	for (const choice of choices) {
		const choiceWords = `${choice.label} ${choice.description}`
			.toLowerCase()
			.split(/\s+/)
		const overlap = choiceWords.filter((w) => outcomeWords.includes(w)).length
		if (overlap > bestScore) {
			bestScore = overlap
			best = choice
		}
	}

	return best ?? choices[0]
}

interface RankedChoice {
	choice: EventPlayerChoice
	score: number
	risks: string[]
}

/**
 * Rank event choices by net positive impact.
 */
function rankEventChoices(
	choices: EventPlayerChoice[],
	severity: number,
): RankedChoice[] {
	return choices
		.map((choice) => {
			const effects = choice.effects
			let score = 0.5

			// Positive effects boost score
			if (effects.stabilityModifier && effects.stabilityModifier > 0)
				score += 0.1
			if (effects.populationModifier && effects.populationModifier > 0)
				score += 0.1
			if (effects.economicModifier && effects.economicModifier > 0) score += 0.1

			// Negative modifiers are risks
			const risks: string[] = []
			if (effects.stabilityModifier && effects.stabilityModifier < 0) {
				risks.push('Déstabilisation possible')
				score -= 0.1
			}
			if (effects.populationModifier && effects.populationModifier < 0) {
				risks.push('Pertes humaines')
				score -= 0.1
			}
			if (effects.militaryModifier && effects.militaryModifier < 0) {
				risks.push('Affaiblissement militaire')
				score -= 0.05
			}

			return { choice, score: Math.max(0, Math.min(1, score)), risks }
		})
		.sort((a, b) => b.score - a.score)
}

interface RankedLocalChoice {
	choice: LocalPlayerChoice
	score: number
	risks: string[]
}

function rankLocalChoices(choices: LocalPlayerChoice[]): RankedLocalChoice[] {
	return choices
		.map((choice) => {
			const effects = choice.effects
			let score = 0.5
			const risks: string[] = []

			if (effects.stabilityModifier && effects.stabilityModifier > 0)
				score += 0.15
			if (effects.wealthModifier && effects.wealthModifier > 0) score += 0.15
			if (effects.reputationModifier && effects.reputationModifier > 0)
				score += 0.1

			if (effects.stabilityModifier && effects.stabilityModifier < 0) {
				risks.push('Risque de troubles')
				score -= 0.1
			}
			if (effects.healthModifier && effects.healthModifier < 0) {
				risks.push('Risque sanitaire')
				score -= 0.1
			}

			return { choice, score: Math.max(0, Math.min(1, score)), risks }
		})
		.sort((a, b) => b.score - a.score)
}

function describeEffects(effects: EventPlayerChoice['effects']): string[] {
	const result: string[] = []
	if (effects.stabilityModifier) {
		result.push(
			`Stabilité ${effects.stabilityModifier > 0 ? '+' : ''}${effects.stabilityModifier}`,
		)
	}
	if (effects.populationModifier) {
		result.push(
			`Population ${effects.populationModifier > 0 ? '+' : ''}${effects.populationModifier}%`,
		)
	}
	if (effects.economicModifier) {
		result.push(
			`Économie ${effects.economicModifier > 0 ? '+' : ''}${effects.economicModifier}`,
		)
	}
	if (effects.militaryModifier) {
		result.push(
			`Militaire ${effects.militaryModifier > 0 ? '+' : ''}${effects.militaryModifier}`,
		)
	}
	if (effects.customEffect) {
		result.push(effects.customEffect)
	}
	return result.length > 0 ? result : ['Effets à déterminer selon le contexte']
}

function describeLocalEffects(effects: LocalPlayerChoice['effects']): string[] {
	const result: string[] = []
	if (effects.stabilityModifier) {
		result.push(
			`Stabilité ${effects.stabilityModifier > 0 ? '+' : ''}${effects.stabilityModifier}`,
		)
	}
	if (effects.wealthModifier) {
		result.push(
			`Richesse ${effects.wealthModifier > 0 ? '+' : ''}${effects.wealthModifier}`,
		)
	}
	if (effects.reputationModifier) {
		result.push(
			`Réputation ${effects.reputationModifier > 0 ? '+' : ''}${effects.reputationModifier}`,
		)
	}
	if (effects.healthModifier) {
		result.push(
			`Santé ${effects.healthModifier > 0 ? '+' : ''}${effects.healthModifier}`,
		)
	}
	if (effects.customEffect) {
		result.push(effects.customEffect)
	}
	return result.length > 0 ? result : ['Effets mineurs locaux']
}
