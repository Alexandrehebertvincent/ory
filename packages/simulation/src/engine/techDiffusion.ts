// ============================================================================
// Technology Diffusion Simulation
// ============================================================================
// "Arbre technologique basé sur des prérequis physiques/scientifiques réels,
// pas sur la chronologie historique." — GDD §5.3
//
// Technologies spread between nations through:
// 1. Trade routes (merchants carry knowledge)
// 2. Diplomatic relations (alliances share techs)
// 3. Proximity/border contact
// 4. Independent research (innovation capacity)
// ============================================================================

import type {
	NationTechnology,
	Technology,
	TradeRoute,
} from '../../../shared/src/types/world'
import type {
	GameState,
	StaticData,
	SimConfig,
	TickLogEntry,
	SeededRNG,
} from '../types'

function findTech(
	state: GameState,
	nationId: string,
): NationTechnology | undefined {
	return state.nationTechnologies.find((t) => t.nationId === nationId)
}

/**
 * Check if all prerequisites of a technology are met by a nation.
 */
function prerequisitesMet(tech: Technology, unlockedTechs: string[]): boolean {
	return tech.prerequisites.every((prereq) => unlockedTechs.includes(prereq))
}

/**
 * Simulate one tick of technology diffusion and research.
 *
 * For each nation:
 * 1. Progress ongoing research (based on innovationCapacity + population educated)
 * 2. Discover new techs from trade route partners
 * 3. Discover new techs from allied nations
 * 4. Chance of independent discovery for techs where prerequisites are met
 */
export function simulateTechDiffusion(
	state: GameState,
	staticData: StaticData,
	config: SimConfig,
	rng: SeededRNG,
): TickLogEntry[] {
	const log: TickLogEntry[] = []

	// Build a map of which nations are connected via trade routes
	const tradeConnections = new Map<string, Set<string>>()
	for (const route of staticData.tradeRoutes) {
		for (const nId of route.connectsNations) {
			if (!tradeConnections.has(nId)) tradeConnections.set(nId, new Set())
			for (const otherId of route.connectsNations) {
				if (otherId !== nId) tradeConnections.get(nId)!.add(otherId)
			}
		}
	}

	for (const nation of state.nations) {
		const natTech = findTech(state, nation.id)
		if (!natTech) continue

		const education = state.nationEducation.find(
			(e) => e.nationId === nation.id,
		)
		const dt = config.tickDurationYears

		// --- 1. Progress ongoing research ---
		for (const rp of natTech.researchProgress) {
			const tech = staticData.technologies.find((t) => t.id === rp.techId)
			if (!tech) continue

			// Year guard: tech not available yet
			if (tech.yearAvailable && state.currentYear < tech.yearAvailable) continue

			// Prerequisites must be met to research
			if (!prerequisitesMet(tech, natTech.unlockedTechs)) continue

			// Progress rate depends on innovation capacity and complexity
			const innovBonus = natTech.innovationCapacity / 10 // 0 to 1
			const educBonus = education ? education.scholarPopulation * 2 : 0 // scholar pop ratio × 2
			const complexityPenalty = tech.complexity / 10 // higher complexity = slower
			const progressRate =
				((0.1 + innovBonus * 0.3 + educBonus * 0.2) / (1 + complexityPenalty)) *
				dt *
				config.techDiffusionRate

			rp.progress = Math.min(1, rp.progress + progressRate)

			// Tech unlocked!
			if (rp.progress >= 1) {
				natTech.unlockedTechs.push(rp.techId)
				// Remove from research
				natTech.researchProgress = natTech.researchProgress.filter(
					(r) => r.techId !== rp.techId,
				)

				log.push({
					year: state.currentYear,
					category: 'technology',
					nationId: nation.id,
					message: `${nation.name} a découvert: ${tech.name}`,
					data: { techId: tech.id },
				})
			}
		}

		// --- 2. Trade route diffusion ---
		const partners = tradeConnections.get(nation.id)
		if (partners) {
			for (const partnerId of partners) {
				const partnerTech = findTech(state, partnerId)
				if (!partnerTech) continue

				// Techs the partner has but we don't
				for (const techId of partnerTech.unlockedTechs) {
					if (natTech.unlockedTechs.includes(techId)) continue
					if (natTech.researchProgress.some((r) => r.techId === techId))
						continue

					const tech = staticData.technologies.find((t) => t.id === techId)
					if (!tech) continue

					// Must have prerequisites
					if (!prerequisitesMet(tech, natTech.unlockedTechs)) continue

					// Diffusion probability: based on trade importance and tech complexity
					const diffProb =
						(0.03 * config.techDiffusionRate) / (1 + tech.complexity * 0.2)
					if (rng.chance(diffProb)) {
						// Start researching at 30-50% progress (knowledge transfer)
						natTech.researchProgress.push({
							techId,
							progress: 0.3 + rng.next() * 0.2,
						})

						log.push({
							year: state.currentYear,
							category: 'technology',
							nationId: nation.id,
							message: `${nation.name} découvre ${tech.name} via le commerce`,
							data: { techId, source: partnerId },
						})
					}
				}
			}
		}

		// --- 3. Allied nations share knowledge ---
		for (const dipRel of nation.diplomacy) {
			if (dipRel.type !== 'alliance' && dipRel.type !== 'royal_marriage')
				continue
			if (dipRel.strength < 5) continue // only strong alliances share tech

			const allyTech = findTech(state, dipRel.targetNationId)
			if (!allyTech) continue

			for (const techId of allyTech.unlockedTechs) {
				if (natTech.unlockedTechs.includes(techId)) continue
				if (natTech.researchProgress.some((r) => r.techId === techId)) continue

				const tech = staticData.technologies.find((t) => t.id === techId)
				if (!tech) continue
				if (!prerequisitesMet(tech, natTech.unlockedTechs)) continue

				const diffProb =
					0.05 * config.techDiffusionRate * (dipRel.strength / 10)
				if (rng.chance(diffProb)) {
					natTech.researchProgress.push({
						techId,
						progress: 0.4 + rng.next() * 0.2,
					})
				}
			}
		}

		// --- 4. Independent discovery ---
		// Small chance to start researching a tech nobody else has, if prerequisites are met
		for (const tech of staticData.technologies) {
			if (natTech.unlockedTechs.includes(tech.id)) continue
			if (natTech.researchProgress.some((r) => r.techId === tech.id)) continue
			if (tech.yearAvailable && state.currentYear < tech.yearAvailable) continue
			if (!prerequisitesMet(tech, natTech.unlockedTechs)) continue

			// Very low base probability, boosted by innovation capacity
			const discoverProb =
				(0.005 * (natTech.innovationCapacity / 10) * config.techDiffusionRate) /
				(1 + tech.complexity * 0.3)
			if (rng.chance(discoverProb)) {
				natTech.researchProgress.push({
					techId: tech.id,
					progress: rng.next() * 0.15, // just starting
				})
			}
		}
	}

	return log
}
