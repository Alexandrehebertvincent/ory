// ============================================================================
// Event Engine — Historical Events & Local Event Templates
// ============================================================================
// Evaluates trigger conditions for historical events and instantiates
// local events from templates based on current world state.
// ============================================================================

import type {
	HistoricalEvent,
	EventTemplate,
	EventTriggerConditions,
	LocalTriggerConditions,
	RumorInstance,
	RumorTemplate,
	InformationVector,
} from '../../../shared/src/types/world'
import type {
	GameState,
	StaticData,
	SimConfig,
	TickLogEntry,
	SeededRNG,
} from '../types'

// ----------------------------------------------------------------------------
// Historical Event Trigger Evaluation
// ----------------------------------------------------------------------------

/**
 * Check if the trigger conditions for a historical event are met.
 */
function evaluateConditions(
	conditions: EventTriggerConditions,
	state: GameState,
	affectedNationIds: string[],
): boolean {
	// Required techs: at least one affected nation must have all required techs
	if (conditions.requiredTechs && conditions.requiredTechs.length > 0) {
		const anyNationHasTechs = affectedNationIds.some((nId) => {
			const natTech = state.nationTechnologies.find((t) => t.nationId === nId)
			return (
				natTech &&
				conditions.requiredTechs!.every((t) =>
					natTech.unlockedTechs.includes(t),
				)
			)
		})
		if (!anyNationHasTechs) return false
	}

	// Required events must be resolved
	if (conditions.requiredEventIds && conditions.requiredEventIds.length > 0) {
		const allResolved = conditions.requiredEventIds.every((eId) => {
			const evt = state.historicalEvents.find((e) => e.id === eId)
			return evt && (evt.status === 'triggered' || evt.status === 'resolved')
		})
		if (!allResolved) return false
	}

	// Blocked by events
	if (conditions.blockedByEventIds && conditions.blockedByEventIds.length > 0) {
		const blocked = conditions.blockedByEventIds.some((eId) => {
			const evt = state.historicalEvents.find((e) => e.id === eId)
			return evt && (evt.status === 'triggered' || evt.status === 'resolved')
		})
		if (blocked) return false
	}

	// Required nations must exist
	if (
		conditions.requiredNationsExist &&
		conditions.requiredNationsExist.length > 0
	) {
		const allExist = conditions.requiredNationsExist.every((nId) =>
			state.nations.some((n) => n.id === nId),
		)
		if (!allExist) return false
	}

	// Stability range for affected nations
	if (conditions.minStability !== undefined) {
		const anyBelowMin = affectedNationIds.some((nId) => {
			const nation = state.nations.find((n) => n.id === nId)
			return nation && nation.stability < conditions.minStability!
		})
		if (anyBelowMin) return false
	}

	if (conditions.maxStability !== undefined) {
		const anyAboveMax = affectedNationIds.some((nId) => {
			const nation = state.nations.find((n) => n.id === nId)
			return nation && nation.stability > conditions.maxStability!
		})
		if (anyAboveMax) return false
	}

	// Population threshold
	if (conditions.minPopulation !== undefined) {
		const anyBelowPop = affectedNationIds.some((nId) => {
			const pop = state.populations.find((p) => p.nationId === nId)
			return pop && pop.total < conditions.minPopulation!
		})
		if (anyBelowPop) return false
	}

	// Religious tension
	if (conditions.minReligiousTension !== undefined) {
		const anyBelowTension = affectedNationIds.some((nId) => {
			const rel = state.nationReligions.find((r) => r.nationId === nId)
			return rel && rel.religiousTension < conditions.minReligiousTension!
		})
		if (anyBelowTension) return false
	}

	// Diplomacy condition
	if (conditions.requiredDiplomacy) {
		const [nA, nB] = conditions.requiredDiplomacy.between
		const nationA = state.nations.find((n) => n.id === nA)
		if (!nationA) return false
		const hasRelation = nationA.diplomacy.some(
			(d) =>
				d.targetNationId === nB &&
				d.type === conditions.requiredDiplomacy!.type,
		)
		if (!hasRelation) return false
	}

	return true
}

/**
 * Apply the effects of a triggered historical event.
 */
function applyEventEffects(event: HistoricalEvent, state: GameState): void {
	const effects = event.effects

	for (const nationId of event.affectedNationIds) {
		const nation = state.nations.find((n) => n.id === nationId)
		if (!nation) continue

		if (effects.stabilityModifier) {
			nation.stability = Math.max(
				0,
				Math.min(10, nation.stability + effects.stabilityModifier),
			) as any
		}
		if (effects.prestigeModifier) {
			nation.prestige = Math.max(
				0,
				Math.min(10, nation.prestige + effects.prestigeModifier),
			) as any
		}
		if (effects.populationModifier) {
			const pop = state.populations.find((p) => p.nationId === nationId)
			if (pop) {
				pop.total = Math.max(
					1000,
					Math.round(pop.total * (1 + effects.populationModifier)),
				)
			}
		}
		if (effects.economicModifier) {
			const econ = state.nationEconomies.find((e) => e.nationId === nationId)
			if (econ) {
				econ.gdpEstimate = Math.round(
					econ.gdpEstimate * (1 + effects.economicModifier),
				)
			}
		}
		if (effects.militaryModifier) {
			const mil = state.nationMilitary.find((m) => m.nationId === nationId)
			if (mil) {
				mil.armySize = Math.round(mil.armySize * (1 + effects.militaryModifier))
				mil.militaryStrength = Math.max(
					0,
					Math.min(10, mil.militaryStrength + effects.militaryModifier * 5),
				) as any
			}
		}
		if (effects.religiousTensionModifier) {
			const rel = state.nationReligions.find((r) => r.nationId === nationId)
			if (rel) {
				rel.religiousTension = Math.max(
					0,
					Math.min(10, rel.religiousTension + effects.religiousTensionModifier),
				) as any
			}
		}
	}

	// Tech unlocks
	if (effects.techUnlocks) {
		for (const nationId of event.affectedNationIds) {
			const natTech = state.nationTechnologies.find(
				(t) => t.nationId === nationId,
			)
			if (!natTech) continue
			for (const techId of effects.techUnlocks) {
				if (!natTech.unlockedTechs.includes(techId)) {
					natTech.unlockedTechs.push(techId)
				}
			}
		}
	}

	// New diplomacy
	if (effects.newDiplomacy) {
		const [nA, nB] = effects.newDiplomacy.between
		const nationA = state.nations.find((n) => n.id === nA)
		const nationB = state.nations.find((n) => n.id === nB)
		if (nationA && nationB) {
			nationA.diplomacy.push({
				targetNationId: nB,
				type: effects.newDiplomacy.type,
				strength: effects.newDiplomacy.strength,
			})
			nationB.diplomacy.push({
				targetNationId: nA,
				type: effects.newDiplomacy.type,
				strength: effects.newDiplomacy.strength,
			})
		}
	}

	// Nation mutations
	if (effects.nationMutations) {
		for (const mutation of effects.nationMutations) {
			const nation = state.nations.find((n) => n.id === mutation.nationId)
			if (!nation) continue

			if (mutation.rename) {
				nation.name = mutation.rename.name
				nation.dempinym = mutation.rename.dempinym
			}
			if (mutation.changeGovernance) {
				nation.governance = mutation.changeGovernance
			}
			if (mutation.changeCapital) {
				nation.capital = mutation.changeCapital
			}
			if (mutation.changeRuler) {
				nation.ruler = mutation.changeRuler
			}
			if (mutation.dissolve) {
				// Remove nation from active list
				state.nations = state.nations.filter((n) => n.id !== mutation.nationId)
			}
		}
	}

	// Cascade: trigger other events
	if (effects.triggerEventIds) {
		for (const eventId of effects.triggerEventIds) {
			const cascadeEvent = state.historicalEvents.find((e) => e.id === eventId)
			if (cascadeEvent && cascadeEvent.status === 'pending') {
				cascadeEvent.status = 'triggered'
			}
		}
	}
}

// ----------------------------------------------------------------------------
// Main simulation
// ----------------------------------------------------------------------------

/**
 * Evaluate and trigger historical events for the current tick.
 */
export function simulateHistoricalEvents(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	for (const event of state.historicalEvents) {
		if (event.status !== 'pending') continue

		// Check year window
		const [minYear, maxYear] = event.yearRange
		if (state.currentYear < minYear || state.currentYear > maxYear) continue

		// Check trigger conditions
		if (
			!evaluateConditions(
				event.triggerConditions,
				state,
				event.affectedNationIds,
			)
		) {
			// If past the window and conditions still unmet, mark as conditions_unmet
			if (state.currentYear >= maxYear) {
				event.status = 'conditions_unmet'
			}
			continue
		}

		// Event triggers!
		event.status = 'triggered'
		applyEventEffects(event, state)

		log.push({
			year: state.currentYear,
			category: 'event',
			message: `Événement historique: ${event.name}`,
			data: {
				eventId: event.id,
				type: event.type,
				category: event.category,
				affectedNations: event.affectedNationIds,
			},
		})
	}

	return log
}

/**
 * Instantiate local events from templates based on current conditions.
 * Returns generated event descriptions (not full EventTemplate instances).
 */
export function simulateLocalEvents(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	for (const template of staticData.eventTemplates) {
		// Year guard
		const conditions = template.triggerConditions
		if (conditions.minYear && state.currentYear < conditions.minYear) continue
		if (conditions.maxYear && state.currentYear > conditions.maxYear) continue

		// Check base probability
		if (!rng.chance(template.baseProbability * config.tickDurationYears))
			continue

		// Required techs
		if (conditions.requiredTechs && conditions.requiredTechs.length > 0) {
			// At least one nation must have the required techs
			const anyHasTechs = state.nations.some((n) => {
				const natTech = state.nationTechnologies.find(
					(t) => t.nationId === n.id,
				)
				return (
					natTech &&
					conditions.requiredTechs!.every((t) =>
						natTech.unlockedTechs.includes(t),
					)
				)
			})
			if (!anyHasTechs) continue
		}

		// Pick a random affected nation
		const eligibleNations = state.nations.filter((n) => {
			if (
				conditions.minStability !== undefined &&
				n.stability < conditions.minStability
			)
				return false
			if (
				conditions.maxStability !== undefined &&
				n.stability > conditions.maxStability
			)
				return false
			return true
		})

		if (eligibleNations.length === 0) continue
		const targetNation = rng.pick(eligibleNations)

		// Pick a flavor text
		const flavor =
			template.flavorTexts.length > 0
				? rng.pick(template.flavorTexts)
				: template.description

		log.push({
			year: state.currentYear,
			category: 'event',
			nationId: targetNation.id,
			message: `[${template.scope}] ${template.name} — ${targetNation.name}: ${flavor}`,
			data: {
				templateId: template.id,
				scope: template.scope,
				severity: template.severity,
			},
		})

		// Apply default effects
		if (template.defaultEffects.stabilityModifier) {
			targetNation.stability = Math.max(
				0,
				Math.min(
					10,
					targetNation.stability + template.defaultEffects.stabilityModifier,
				),
			) as any
		}
	}

	return log
}

// ----------------------------------------------------------------------------
// Rumor Propagation
// ----------------------------------------------------------------------------

/**
 * Generate rumors from recent events and propagate existing rumors.
 */
export function simulateRumors(
	state: GameState,
	staticData: StaticData,
	rng: SeededRNG,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	// --- Generate new rumors from recent tick log entries ---
	for (const entry of state.tickLog) {
		if (
			entry.category === 'event' ||
			entry.category === 'military' ||
			entry.category === 'disaster'
		) {
			// Find a matching rumor template
			const matchingTemplate = staticData.rumorTemplates.find(
				(rt) =>
					rt.category === entry.category &&
					state.currentYear >= rt.minYear &&
					state.currentYear <= rt.maxYear,
			)
			if (!matchingTemplate) continue
			if (!rng.chance(0.3)) continue // 30% chance to generate a rumor

			// Pick a compatible vector
			const availableVectors = staticData.informationVectors.filter(
				(v) =>
					matchingTemplate.compatibleVectors.includes(v.id as any) &&
					state.currentYear >= v.minYear,
			)
			if (availableVectors.length === 0) continue
			const vector = rng.pick(availableVectors)

			// Create rumor instance
			const distortionLevel = Math.floor(
				(1 - vector.baseAccuracy) * matchingTemplate.distortions.length,
			)
			const displayContent =
				distortionLevel > 0 && matchingTemplate.distortions.length > 0
					? matchingTemplate.distortions[
							Math.min(distortionLevel, matchingTemplate.distortions.length - 1)
						]
					: matchingTemplate.content

			const rumor: RumorInstance = {
				id: `rumor_${state.currentYear}_${rng.intBetween(1000, 9999)}`,
				templateId: matchingTemplate.id,
				sourceEventId: entry.data?.eventId as string | undefined,
				vectorId: vector.id as any,
				currentAccuracy: vector.baseAccuracy,
				displayContent,
				originNationId: entry.nationId ?? state.nations[0]?.id ?? '',
				originCoord: { lat: 0, lng: 0 },
				emittedYear: state.currentYear,
				relayCount: 0,
				receivedBy: entry.nationId ? [entry.nationId] : [],
				expired: false,
			}

			state.activeRumors.push(rumor)
		}
	}

	// --- Propagate existing rumors ---
	for (const rumor of state.activeRumors) {
		if (rumor.expired) continue

		const vector = staticData.informationVectors.find(
			(v) => v.id === rumor.vectorId,
		)
		if (!vector) continue

		// Degrade accuracy per relay
		rumor.currentAccuracy *= 1 - vector.decayPerRelay
		rumor.relayCount++

		// Expire old rumors
		if (
			state.currentYear - rumor.emittedYear > 5 ||
			rumor.currentAccuracy < 0.1
		) {
			rumor.expired = true
			continue
		}

		// Spread to connected nations via trade routes
		const originNation = rumor.originNationId
		for (const route of staticData.tradeRoutes) {
			if (!route.connectsNations.includes(originNation)) continue
			for (const nationId of route.connectsNations) {
				if (rumor.receivedBy.includes(nationId)) continue
				if (rng.chance(0.4)) {
					rumor.receivedBy.push(nationId)
				}
			}
		}
	}

	// Clean up expired rumors (keep last 100)
	state.activeRumors = state.activeRumors.filter((r) => !r.expired).slice(-200)

	return log
}
