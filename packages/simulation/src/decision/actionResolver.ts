// ============================================================================
// Action Resolver — Execute Player Actions & Effect Chains
// ============================================================================
// Takes confirmed PlayerActions and resolves them:
// 1. Generate an EffectChain (sequence of scheduled effects)
// 2. Execute immediate effects (delayTicks = 0)
// 3. Queue deferred effects for future ticks
// 4. Process existing scheduled effects whose tick has come
//
// "L'IA simule les conséquences" — GDD §3.1 step 5
// ============================================================================

import type {
	GameState,
	StaticData,
	SimConfig,
	TickLogEntry,
	PlayerAction,
	EffectChain,
	ScheduledEffect,
	EffectCondition,
	EffectModification,
	ActionTarget,
	SeededRNG,
} from '../types'

// ----------------------------------------------------------------------------
// Generate Effect Chains from confirmed actions
// ----------------------------------------------------------------------------

/**
 * Generate an EffectChain for a confirmed PlayerAction.
 * Maps the action category to a set of scheduled effects based on context.
 */
export function generateEffectChain(
	action: PlayerAction,
	state: GameState,
	staticData: StaticData,
	rng: SeededRNG,
): EffectChain {
	const effects = buildEffectsForCategory(action, state, staticData, rng)

	return {
		id: `chain_${action.id}`,
		sourceActionId: action.id,
		effects,
		completed: false,
	}
}

/**
 * Build scheduled effects based on the action category.
 * Each category follows different patterns:
 * - trade → economic effects (immediate + deferred reputation)
 * - build → infrastructure effect (delayed) + economic cost (immediate)
 * - diplomacy → relation change (immediate) + ripple effects
 * - military → force deployment + casualties + diplomatic fallout
 * - etc.
 */
function buildEffectsForCategory(
	action: PlayerAction,
	state: GameState,
	staticData: StaticData,
	rng: SeededRNG,
): ScheduledEffect[] {
	const effects: ScheduledEffect[] = []
	const baseId = `eff_${action.id}`

	switch (action.category) {
		case 'trade':
			effects.push(...buildTradeEffects(action, state, baseId, rng))
			break
		case 'build':
			effects.push(
				...buildConstructionEffects(action, state, staticData, baseId, rng),
			)
			break
		case 'diplomacy':
			effects.push(...buildDiplomacyEffects(action, state, baseId, rng))
			break
		case 'military':
			effects.push(...buildMilitaryEffects(action, state, baseId, rng))
			break
		case 'research':
			effects.push(...buildResearchEffects(action, state, baseId, rng))
			break
		case 'explore':
			effects.push(...buildExploreEffects(action, baseId, rng))
			break
		case 'social':
			effects.push(...buildSocialEffects(action, baseId, rng))
			break
		case 'religious':
			effects.push(...buildReligiousEffects(action, baseId, rng))
			break
		case 'espionage':
			effects.push(...buildEspionageEffects(action, baseId, rng))
			break
		default:
			// Extensible: generic effect for unknown categories
			effects.push(makeGenericEffect(action, baseId))
			break
	}

	return effects
}

// ----------------------------------------------------------------------------
// Process effect chains at tick time
// ----------------------------------------------------------------------------

/**
 * Process all active effect chains — execute effects whose delay has elapsed.
 * Called once per tick after action resolution.
 */
export function processEffectChains(
	state: GameState,
	currentTick: number,
	rng: SeededRNG,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	for (const action of state.playerActions) {
		if (!action.effectChain || action.effectChain.completed) continue

		const chain = action.effectChain
		const resolveTick = action.resolvedAtTick ?? action.createdAtTick
		let allDone = true

		for (const effect of chain.effects) {
			if (effect.executed) continue

			const triggerTick = resolveTick + effect.delayTicks
			if (currentTick < triggerTick) {
				allDone = false
				continue
			}

			// Check conditions
			const conditionsMet = effect.conditions.every((c) =>
				evaluateCondition(c, state),
			)

			if (!conditionsMet) {
				effect.executed = true
				effect.outcome = 'conditions_unmet'
				log.push({
					year: state.currentYear,
					category: 'action',
					nationId: action.nationId,
					message: `Effet annulé (conditions non remplies): ${effect.description}`,
					data: { effectId: effect.id, actionId: action.id },
				})
				continue
			}

			// Roll probability
			if (!rng.chance(effect.probability)) {
				effect.executed = true
				effect.outcome = 'skipped'
				log.push({
					year: state.currentYear,
					category: 'action',
					nationId: action.nationId,
					message: `Effet non déclenché (probabilité): ${effect.description}`,
					data: { effectId: effect.id, probability: effect.probability },
				})
				continue
			}

			// Apply modifications
			for (const mod of effect.modifications) {
				applyModification(mod, state)
			}

			effect.executed = true
			effect.outcome = 'triggered'
			log.push({
				year: state.currentYear,
				category: 'action',
				nationId: action.nationId,
				message: `Effet déclenché: ${effect.description}`,
				data: { effectId: effect.id, actionId: action.id, type: effect.type },
			})
		}

		if (allDone) {
			chain.completed = true
		}
	}

	return log
}

// ----------------------------------------------------------------------------
// Resolve confirmed actions (main entry point per tick)
// ----------------------------------------------------------------------------

/**
 * Process all confirmed PlayerActions:
 * 1. Generate effect chains for newly confirmed actions
 * 2. Mark them as scheduled/in_progress
 * 3. Process all active effect chains
 */
export function resolveActions(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
	currentTick: number,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	// 1. Generate chains for newly confirmed actions
	for (const action of state.playerActions) {
		if (action.status !== 'confirmed') continue

		const chain = generateEffectChain(action, state, staticData, rng)
		action.effectChain = chain
		action.status = 'scheduled'
		action.resolvedAtTick = currentTick

		// Check if any effects are immediate (delayTicks = 0)
		const hasDeferred = chain.effects.some((e) => e.delayTicks > 0)
		if (!hasDeferred) {
			action.status = 'in_progress'
		}

		log.push({
			year: state.currentYear,
			category: 'action',
			nationId: action.nationId,
			message: `Action planifiée: ${action.description} (${chain.effects.length} effets)`,
			data: { actionId: action.id, effectCount: chain.effects.length },
		})
	}

	// 2. Process all chains (immediate + deferred effects from previous ticks)
	log.push(...processEffectChains(state, currentTick, rng))

	// 3. Mark fully resolved actions
	for (const action of state.playerActions) {
		if (action.effectChain?.completed && action.status !== 'resolved') {
			action.status = 'resolved'
			log.push({
				year: state.currentYear,
				category: 'action',
				nationId: action.nationId,
				message: `Action résolue: ${action.description}`,
				data: { actionId: action.id },
			})
		}
	}

	return log
}

// ----------------------------------------------------------------------------
// Condition evaluators
// ----------------------------------------------------------------------------

function evaluateCondition(
	condition: EffectCondition,
	state: GameState,
): boolean {
	switch (condition.type) {
		case 'nation_exists':
			return state.nations.some((n) => n.id === condition.targetId)

		case 'nation_has_tech': {
			const tech = state.nationTechnologies.find(
				(t) => t.nationId === condition.targetId,
			)
			return tech ? tech.unlockedTechs.includes(String(condition.value)) : false
		}

		case 'nation_has_resource': {
			const econ = state.nationEconomies.find(
				(e) => e.nationId === condition.targetId,
			)
			if (!econ) return false
			const resourceId = String(condition.value)
			return (
				econ.mainExports.includes(resourceId) ||
				econ.marketPrices.some((p) => p.commodityId === resourceId)
			)
		}

		case 'nation_relation_above': {
			const nation = state.nations.find((n) => n.id === condition.targetId)
			const otherId = String(condition.params?.['otherId'] ?? '')
			const rel = nation?.diplomacy.find((r) => r.targetNationId === otherId)
			return rel ? rel.strength > Number(condition.value) : false
		}

		case 'nation_relation_below': {
			const nation = state.nations.find((n) => n.id === condition.targetId)
			const otherId = String(condition.params?.['otherId'] ?? '')
			const rel = nation?.diplomacy.find((r) => r.targetNationId === otherId)
			return rel ? rel.strength < Number(condition.value) : false
		}

		case 'settlement_exists':
			return state.settlements.some((s) => s.id === condition.targetId)

		case 'year_after':
			return state.currentYear >= Number(condition.value)

		case 'year_before':
			return state.currentYear < Number(condition.value)

		default:
			// Unknown condition type — extensible, assume true
			return true
	}
}

// ----------------------------------------------------------------------------
// Modification appliers
// ----------------------------------------------------------------------------

function applyModification(mod: EffectModification, state: GameState): void {
	switch (mod.type) {
		case 'adjust_relation': {
			const nation = state.nations.find((n) => n.id === mod.targetId)
			if (!nation) break
			const otherId = String(mod.params?.['otherId'] ?? '')
			const rel = nation.diplomacy.find((r) => r.targetNationId === otherId)
			if (rel) {
				rel.strength = clamp(rel.strength + Number(mod.value), 0, 10)
			}
			break
		}

		case 'modify_stability': {
			const nation = state.nations.find((n) => n.id === mod.targetId)
			if (nation) {
				nation.stability = clamp(nation.stability + Number(mod.value), 0, 10)
			}
			break
		}

		case 'change_population': {
			const pop = state.populations.find((p) => p.nationId === mod.targetId)
			if (pop) {
				const delta = Number(mod.value)
				// Percentage change
				pop.total = Math.max(0, Math.round(pop.total * (1 + delta / 100)))
			}
			break
		}

		case 'add_rumor': {
			state.tickLog.push({
				year: state.currentYear,
				category: 'rumor',
				nationId: mod.targetId,
				message: String(mod.value),
			})
			break
		}

		case 'trigger_event': {
			const event = state.historicalEvents.find(
				(e) => e.id === String(mod.value),
			)
			if (event && event.status === 'pending') {
				event.status = 'triggered'
			}
			break
		}

		case 'grant_knowledge': {
			const nwk = state.nationWorldKnowledge.find(
				(k) => k.nationId === mod.targetId,
			)
			if (nwk) {
				const nationId = String(mod.value)
				if (!nwk.knownNations.includes(nationId)) {
					nwk.knownNations.push(nationId)
				}
			}
			break
		}

		case 'destroy_infrastructure': {
			const idx = state.infrastructure.findIndex(
				(i) => i.id === String(mod.value),
			)
			if (idx !== -1) {
				state.infrastructure.splice(idx, 1)
			}
			break
		}

		case 'transfer_resource': {
			// Transfer between nations — simplified via gdpEstimate
			const fromEcon = state.nationEconomies.find(
				(e) => e.nationId === String(mod.params?.['fromNationId'] ?? ''),
			)
			const toEcon = state.nationEconomies.find(
				(e) => e.nationId === mod.targetId,
			)
			if (fromEcon && toEcon) {
				const amount = Number(mod.value)
				fromEcon.gdpEstimate = Math.max(0, fromEcon.gdpEstimate - amount)
				toEcon.gdpEstimate += amount
			}
			break
		}

		default:
			// Extensible: unknown modification types are logged but not applied
			break
	}
}

// ----------------------------------------------------------------------------
// Category-specific effect builders
// ----------------------------------------------------------------------------

function buildTradeEffects(
	action: PlayerAction,
	state: GameState,
	baseId: string,
	rng: SeededRNG,
): ScheduledEffect[] {
	const effects: ScheduledEffect[] = []
	const resourceCount = action.committedResources.length

	// Immediate: economic exchange
	effects.push({
		id: `${baseId}_trade_0`,
		delayTicks: 0,
		type: 'economic',
		description: `Échange commercial avec ${action.target.name}`,
		target: action.target,
		probability: 0.95,
		conditions: [
			{
				type: 'nation_exists',
				targetId: action.target.id,
				value: '',
				params: {},
			},
		],
		modifications: [
			{
				type: 'transfer_resource',
				targetId: action.target.id,
				field: 'treasury',
				value: resourceCount * 10,
				params: { fromNationId: action.nationId },
			},
		],
		executed: false,
	})

	// Deferred: reputation boost
	effects.push({
		id: `${baseId}_trade_1`,
		delayTicks: 4, // 1 month later
		type: 'reputation',
		description: `Réputation commerciale améliorée suite au commerce`,
		target: action.target,
		probability: 0.7,
		conditions: [],
		modifications: [
			{
				type: 'adjust_relation',
				targetId: action.nationId,
				field: 'relation',
				value: 1,
				params: { otherId: action.target.id },
			},
		],
		executed: false,
	})

	return effects
}

function buildConstructionEffects(
	action: PlayerAction,
	state: GameState,
	staticData: StaticData,
	baseId: string,
	rng: SeededRNG,
): ScheduledEffect[] {
	const effects: ScheduledEffect[] = []

	// Find matching construction recipe
	const recipe = staticData.constructionRecipes.find((r) =>
		action.description.toLowerCase().includes(r.name.toLowerCase()),
	)

	const buildTime = recipe ? Math.ceil(recipe.durationMonths * 4) : 8 // months → ~weeks

	// Immediate: resource cost
	effects.push({
		id: `${baseId}_build_0`,
		delayTicks: 0,
		type: 'economic',
		description: `Coût de construction engagé`,
		target: { type: 'nation', id: action.nationId, name: '' },
		probability: 1.0,
		conditions: [],
		modifications: [],
		executed: false,
	})

	// Deferred: construction complete
	effects.push({
		id: `${baseId}_build_1`,
		delayTicks: buildTime,
		type: 'infrastructure',
		description: `Construction terminée: ${action.description}`,
		target: action.target,
		probability: 0.85,
		conditions: [
			{
				type: 'nation_exists',
				targetId: action.nationId,
				value: '',
				params: {},
			},
		],
		modifications: [
			{
				type: 'modify_stability',
				targetId: action.nationId,
				field: 'stability',
				value: 1,
				params: {},
			},
		],
		executed: false,
	})

	return effects
}

function buildDiplomacyEffects(
	action: PlayerAction,
	state: GameState,
	baseId: string,
	rng: SeededRNG,
): ScheduledEffect[] {
	const effects: ScheduledEffect[] = []

	// Immediate: relation change
	effects.push({
		id: `${baseId}_diplo_0`,
		delayTicks: 0,
		type: 'diplomatic',
		description: `Initiative diplomatique envers ${action.target.name}`,
		target: action.target,
		probability: 0.9,
		conditions: [
			{
				type: 'nation_exists',
				targetId: action.target.id,
				value: '',
				params: {},
			},
		],
		modifications: [
			{
				type: 'adjust_relation',
				targetId: action.nationId,
				field: 'relation',
				value: 2,
				params: { otherId: action.target.id },
			},
		],
		executed: false,
	})

	// Deferred: rumor about diplomacy
	effects.push({
		id: `${baseId}_diplo_1`,
		delayTicks: 2,
		type: 'social',
		description: `Les rumeurs de rapprochement se propagent`,
		target: action.target,
		probability: 0.6,
		conditions: [],
		modifications: [
			{
				type: 'add_rumor',
				targetId: action.nationId,
				field: '',
				value: `Des discussions diplomatiques auraient lieu entre ${action.nationId} et ${action.target.id}`,
				params: {},
			},
		],
		executed: false,
	})

	return effects
}

function buildMilitaryEffects(
	action: PlayerAction,
	state: GameState,
	baseId: string,
	rng: SeededRNG,
): ScheduledEffect[] {
	const effects: ScheduledEffect[] = []

	// Immediate: diplomatic penalty
	effects.push({
		id: `${baseId}_mil_0`,
		delayTicks: 0,
		type: 'diplomatic',
		description: `Relations diplomatiques dégradées par action militaire`,
		target: action.target,
		probability: 1.0,
		conditions: [],
		modifications: [
			{
				type: 'adjust_relation',
				targetId: action.nationId,
				field: 'relation',
				value: -3,
				params: { otherId: action.target.id },
			},
		],
		executed: false,
	})

	// Deferred: stability impact
	effects.push({
		id: `${baseId}_mil_1`,
		delayTicks: 4,
		type: 'social',
		description: `Impact de l'action militaire sur la stabilité`,
		target: { type: 'nation', id: action.nationId, name: '' },
		probability: 0.7,
		conditions: [],
		modifications: [
			{
				type: 'modify_stability',
				targetId: action.nationId,
				field: 'stability',
				value: -1,
				params: {},
			},
		],
		executed: false,
	})

	// Deferred: population impact on target
	effects.push({
		id: `${baseId}_mil_2`,
		delayTicks: 2,
		type: 'population',
		description: `Pertes humaines dues au conflit`,
		target: action.target,
		probability: 0.8,
		conditions: [
			{
				type: 'nation_exists',
				targetId: action.target.id,
				value: '',
				params: {},
			},
		],
		modifications: [
			{
				type: 'change_population',
				targetId: action.target.id,
				field: 'totalPopulation',
				value: -2, // -2%
				params: {},
			},
		],
		executed: false,
	})

	return effects
}

function buildResearchEffects(
	action: PlayerAction,
	state: GameState,
	baseId: string,
	rng: SeededRNG,
): ScheduledEffect[] {
	return [
		{
			id: `${baseId}_research_0`,
			delayTicks: 8, // 2 months of research
			type: 'knowledge',
			description: `Résultat de la recherche: ${action.description}`,
			target: { type: 'nation', id: action.nationId, name: '' },
			probability: 0.6, // Research can fail
			conditions: [
				{
					type: 'nation_exists',
					targetId: action.nationId,
					value: '',
					params: {},
				},
			],
			modifications: [
				{
					type: 'grant_knowledge',
					targetId: action.nationId,
					field: 'knownFacts',
					value:
						(action.metadata?.['knowledgeId'] as string) ??
						`knowledge_${action.id}`,
					params: {},
				},
			],
			executed: false,
		},
	]
}

function buildExploreEffects(
	action: PlayerAction,
	baseId: string,
	rng: SeededRNG,
): ScheduledEffect[] {
	return [
		{
			id: `${baseId}_explore_0`,
			delayTicks: 12, // 3 months of exploration
			type: 'knowledge',
			description: `Retour d'exploration: ${action.description}`,
			target: action.target,
			probability: 0.5, // Exploration is risky
			conditions: [],
			modifications: [
				{
					type: 'grant_knowledge',
					targetId: action.nationId,
					field: 'knownFacts',
					value: `exploration_${action.target.id}`,
					params: {},
				},
			],
			executed: false,
		},
	]
}

function buildSocialEffects(
	action: PlayerAction,
	baseId: string,
	rng: SeededRNG,
): ScheduledEffect[] {
	return [
		{
			id: `${baseId}_social_0`,
			delayTicks: 0,
			type: 'social',
			description: `Action sociale: ${action.description}`,
			target: action.target,
			probability: 0.8,
			conditions: [],
			modifications: [
				{
					type: 'modify_stability',
					targetId: action.nationId,
					field: 'stability',
					value: 1,
					params: {},
				},
			],
			executed: false,
		},
	]
}

function buildReligiousEffects(
	action: PlayerAction,
	baseId: string,
	rng: SeededRNG,
): ScheduledEffect[] {
	return [
		{
			id: `${baseId}_religious_0`,
			delayTicks: 0,
			type: 'social',
			description: `Action religieuse: ${action.description}`,
			target: action.target,
			probability: 0.85,
			conditions: [],
			modifications: [
				{
					type: 'modify_stability',
					targetId: action.nationId,
					field: 'stability',
					value: 1,
					params: {},
				},
			],
			executed: false,
		},
	]
}

function buildEspionageEffects(
	action: PlayerAction,
	baseId: string,
	rng: SeededRNG,
): ScheduledEffect[] {
	return [
		{
			id: `${baseId}_spy_0`,
			delayTicks: 4,
			type: 'knowledge',
			description: `Résultat de l'espionnage sur ${action.target.name}`,
			target: action.target,
			probability: 0.4, // Espionage is very risky
			conditions: [
				{
					type: 'nation_exists',
					targetId: action.target.id,
					value: '',
					params: {},
				},
			],
			modifications: [
				{
					type: 'grant_knowledge',
					targetId: action.nationId,
					field: 'knownFacts',
					value: `intel_${action.target.id}`,
					params: {},
				},
			],
			executed: false,
		},
		{
			id: `${baseId}_spy_1`,
			delayTicks: 6,
			type: 'diplomatic',
			description: `Risque de découverte de l'espionnage`,
			target: action.target,
			probability: 0.3, // 30% chance of getting caught
			conditions: [],
			modifications: [
				{
					type: 'adjust_relation',
					targetId: action.nationId,
					field: 'relation',
					value: -4, // Severe penalty if caught
					params: { otherId: action.target.id },
				},
			],
			executed: false,
		},
	]
}

function makeGenericEffect(
	action: PlayerAction,
	baseId: string,
): ScheduledEffect {
	return {
		id: `${baseId}_generic_0`,
		delayTicks: 2,
		type: 'social',
		description: `Effet de l'action: ${action.description}`,
		target: action.target,
		probability: 0.7,
		conditions: [],
		modifications: [],
		executed: false,
	}
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value))
}
