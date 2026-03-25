/**
 * cross-references.test.ts
 *
 * Suite de tests TDD pour valider l'intégrité référentielle
 * de TOUS les datasets du WorldSnapshot (an 1000).
 *
 * Usage : npm test
 */

import { describe, it, expect } from 'vitest'
import { worldSnapshot1000 as w } from '../packages/historical-data/src/seed/index'

// ============================================================================
// Helpers
// ============================================================================

/** Construit un Set d'IDs à partir d'un tableau avec un champ `id`. */
function idSet(arr: { id: string }[]): Set<string> {
	return new Set(arr.map((e) => e.id))
}

/** Vérifie qu'un ID existe dans un ensemble cible. Retourne les erreurs. */
function findBrokenRefs(
	items: { id: string }[],
	field: string,
	extractor: (item: any) => (string | null | undefined)[],
	targetSet: Set<string>,
): string[] {
	const errors: string[] = []
	for (const item of items) {
		for (const ref of extractor(item)) {
			if (ref != null && !targetSet.has(ref)) {
				errors.push(`${item.id}.${field} → "${ref}" introuvable`)
			}
		}
	}
	return errors
}

/** Vérifie qu'un nationId existe dans un ensemble de nations. */
function findBrokenNationRefs(
	items: { nationId: string }[],
	dataset: string,
	targetSet: Set<string>,
): string[] {
	const errors: string[] = []
	for (const item of items) {
		if (!targetSet.has(item.nationId)) {
			errors.push(`${dataset}[${item.nationId}].nationId introuvable`)
		}
	}
	return errors
}

// ============================================================================
// Index des IDs
// ============================================================================

const nationIds = idSet(w.nations)
// Nations actives en l'an 1000
const activeNationIds = new Set(
	w.nations
		.filter((n: any) => !n.startYear || n.startYear <= 1000)
		.map((n: any) => n.id),
)
const settlementIds = idSet(w.settlements)
const religionIds = idSet(w.religions)
const techIds = idSet(w.technologies)
const commodityIds = idSet(w.commodities)
const languageIds = idSet(w.languages)
const diseaseIds = idSet(w.diseases)
const tradeRouteIds = idSet(w.tradeRoutes)
const climateRegionIds = idSet(w.climateRegions)
const historicalEventIds = idSet(w.historicalEvents)
const eventTemplateIds = idSet(w.eventTemplates)
const knowledgeEntryIds = idSet(w.knowledgeEntries)
const advisorProfileIds = idSet(w.advisorProfiles)

// ============================================================================
// 1. Doublons d'IDs
// ============================================================================

describe('Doublons', () => {
	function findDuplicateIds(arr: { id: string }[]): string[] {
		const seen = new Set<string>()
		const dupes: string[] = []
		for (const item of arr) {
			if (seen.has(item.id)) dupes.push(item.id)
			seen.add(item.id)
		}
		return dupes
	}

	function findDuplicateNationIds(arr: { nationId: string }[]): string[] {
		const seen = new Set<string>()
		const dupes: string[] = []
		for (const item of arr) {
			if (seen.has(item.nationId)) dupes.push(item.nationId)
			seen.add(item.nationId)
		}
		return dupes
	}

	describe('IDs uniques dans les tables principales', () => {
		const datasets: [string, { id: string }[]][] = [
			['nations', w.nations],
			['settlements', w.settlements],
			['religions', w.religions],
			['technologies', w.technologies],
			['commodities', w.commodities],
			['languages', w.languages],
			['diseases', w.diseases],
			['tradeRoutes', w.tradeRoutes],
			['climateRegions', w.climateRegions],
			['transportVehicles', w.transportVehicles],
			['historicalEvents', w.historicalEvents],
			['eventTemplates', w.eventTemplates],
			['informationVectors', w.informationVectors],
			['rumorTemplates', w.rumorTemplates],
			['advisorProfiles', w.advisorProfiles],
			['knowledgeEntries', w.knowledgeEntries],
			['feasibilityRules', w.feasibilityRules],
			['constructionRecipes', w.constructionRecipes],
			['socialMobilityPaths', w.socialMobilityPaths],
			['culturalNamePools', w.culturalNamePools],
			['infrastructure', w.infrastructure],
		]

		for (const [name, data] of datasets) {
			it(`${name} n'a pas d'ID dupliqué`, () => {
				const dupes = findDuplicateIds(data)
				expect(
					dupes,
					`IDs dupliqués dans ${name}: ${dupes.join(', ')}`,
				).toEqual([])
			})
		}
	})

	describe('NationIds uniques dans les mapping tables', () => {
		const mappings: [string, { nationId: string }[]][] = [
			['nationReligions', w.nationReligions],
			['nationTechnologies', w.nationTechnologies],
			['nationEconomies', w.nationEconomies],
			['nationLanguages', w.nationLanguages],
			['nationCultures', w.nationCultures],
			['nationHealth', w.nationHealth],
			['nationLaws', w.nationLaws],
			['nationEducation', w.nationEducation],
			['nationMilitary', w.nationMilitary],
			['nationWorldKnowledge', w.nationWorldKnowledge],
			['populations', w.populations],
			['socialMobilityModifiers', w.socialMobilityModifiers],
		]

		for (const [name, data] of mappings) {
			it(`${name} n'a pas de nationId dupliqué`, () => {
				const dupes = findDuplicateNationIds(data)
				expect(
					dupes,
					`nationIds dupliqués dans ${name}: ${dupes.join(', ')}`,
				).toEqual([])
			})
		}
	})

	it("dailyLife n'a pas de (nationId, socialClass) dupliqué", () => {
		const seen = new Set<string>()
		const dupes: string[] = []
		for (const entry of w.dailyLife) {
			const key = `${entry.nationId}::${entry.socialClass}`
			if (seen.has(key)) dupes.push(key)
			seen.add(key)
		}
		expect(
			dupes,
			`Clés composites dupliquées dans dailyLife: ${dupes.join(', ')}`,
		).toEqual([])
	})
})

// ============================================================================
// 2. Références croisées — Entités principales
// ============================================================================

describe('Références croisées — Entités principales', () => {
	it('Nation.capital → settlements', () => {
		const errors = findBrokenRefs(
			w.nations,
			'capital',
			(n) => [n.capital],
			settlementIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('Nation.vassalOf → nations', () => {
		const errors = findBrokenRefs(
			w.nations,
			'vassalOf',
			(n) => [n.vassalOf],
			nationIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('Nation.diplomacy[].targetNationId → nations', () => {
		const errors: string[] = []
		for (const n of w.nations) {
			if (n.diplomacy) {
				for (const d of n.diplomacy) {
					if (!nationIds.has(d.targetNationId)) {
						errors.push(`${n.id}.diplomacy → "${d.targetNationId}" introuvable`)
					}
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('Settlement.nationId → nations', () => {
		const errors = findBrokenRefs(
			w.settlements,
			'nationId',
			(s) => [s.nationId],
			nationIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('Religion.holyCity → settlements', () => {
		const errors = findBrokenRefs(
			w.religions,
			'holyCity',
			(r) => [r.holyCity],
			settlementIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('Technology.prerequisites → technologies (self-ref)', () => {
		const errors = findBrokenRefs(
			w.technologies,
			'prerequisites',
			(t) => t.prerequisites,
			techIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('TradeRoute.connectsNations → nations', () => {
		const errors = findBrokenRefs(
			w.tradeRoutes,
			'connectsNations',
			(tr) => tr.connectsNations,
			nationIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('Disease.endemicRegions → climateRegions', () => {
		const errors = findBrokenRefs(
			w.diseases,
			'endemicRegions',
			(d) => d.endemicRegions,
			climateRegionIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('Disease.knownTreatments → technologies', () => {
		const errors = findBrokenRefs(
			w.diseases,
			'knownTreatments',
			(d) => d.knownTreatments,
			techIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('TransportVehicle.requiredTechs → technologies', () => {
		const errors = findBrokenRefs(
			w.transportVehicles,
			'requiredTechs',
			(v) => v.requiredTechs,
			techIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('TransportVehicle.culturalOrigins → nations', () => {
		const errors = findBrokenRefs(
			w.transportVehicles,
			'culturalOrigins',
			(v) => v.culturalOrigins,
			nationIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('ConstructionRecipe.requiredTechs → technologies', () => {
		const errors = findBrokenRefs(
			w.constructionRecipes,
			'requiredTechs',
			(cr) => cr.requiredTechs,
			techIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('SocialMobilityPath.requiredTechs → technologies', () => {
		const errors = findBrokenRefs(
			w.socialMobilityPaths,
			'requiredTechs',
			(sm) => sm.requiredTechs,
			techIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('InformationVector.requiredTechs → technologies', () => {
		const errors = findBrokenRefs(
			w.informationVectors,
			'requiredTechs',
			(iv) => iv.requiredTechs,
			techIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('AdvisorProfile.requiredTechs → technologies', () => {
		const errors = findBrokenRefs(
			w.advisorProfiles,
			'requiredTechs',
			(ap) => ap.requiredTechs,
			techIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('KnowledgeEntry.requiredTechs → technologies', () => {
		const errors = findBrokenRefs(
			w.knowledgeEntries,
			'requiredTechs',
			(ke) => ke.requiredTechs,
			techIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('KnowledgeEntry.prerequisiteKnowledge → knowledgeEntries', () => {
		const errors = findBrokenRefs(
			w.knowledgeEntries,
			'prerequisiteKnowledge',
			(ke) => ke.prerequisiteKnowledge,
			knowledgeEntryIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('KnowledgeEntry.leadsToTechs → technologies', () => {
		const errors = findBrokenRefs(
			w.knowledgeEntries,
			'leadsToTechs',
			(ke) => ke.leadsToTechs,
			techIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('FeasibilityRule.requiredTechs → technologies', () => {
		const errors = findBrokenRefs(
			w.feasibilityRules,
			'requiredTechs',
			(fr) => fr.requiredTechs,
			techIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('FeasibilityRule.requiredKnowledge → knowledgeEntries', () => {
		const errors = findBrokenRefs(
			w.feasibilityRules,
			'requiredKnowledge',
			(fr) => fr.requiredKnowledge,
			knowledgeEntryIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('CulturalNamePool.nationIds → nations', () => {
		const errors: string[] = []
		for (const cnp of w.culturalNamePools) {
			for (const nid of cnp.nationIds) {
				if (!nationIds.has(nid)) {
					errors.push(`${cnp.id}.nationIds → "${nid}" introuvable`)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})
})

// ============================================================================
// 3. Références croisées — Mapping tables nation → *
// ============================================================================

describe('Références croisées — Mapping tables', () => {
	it('NationReligion.nationId → nations', () => {
		const errors = findBrokenNationRefs(
			w.nationReligions,
			'nationReligion',
			nationIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationReligion.stateReligionId → religions', () => {
		const errors: string[] = []
		for (const nr of w.nationReligions) {
			if (nr.stateReligionId && !religionIds.has(nr.stateReligionId)) {
				errors.push(
					`nationReligion[${nr.nationId}].stateReligionId → "${nr.stateReligionId}" introuvable`,
				)
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationReligion.religions[].religionId → religions', () => {
		const errors: string[] = []
		for (const nr of w.nationReligions) {
			if (nr.religions) {
				for (const r of nr.religions) {
					if (!religionIds.has(r.religionId)) {
						errors.push(
							`nationReligion[${nr.nationId}].religions → "${r.religionId}" introuvable`,
						)
					}
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationTechnology.nationId → nations', () => {
		const errors = findBrokenNationRefs(
			w.nationTechnologies,
			'nationTechnology',
			nationIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationTechnology.unlockedTechs → technologies', () => {
		const errors: string[] = []
		for (const nt of w.nationTechnologies) {
			for (const tid of nt.unlockedTechs) {
				if (!techIds.has(tid)) {
					errors.push(
						`nationTechnology[${nt.nationId}].unlockedTechs → "${tid}" introuvable`,
					)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationTechnology.researchProgress[].techId → technologies', () => {
		const errors: string[] = []
		for (const nt of w.nationTechnologies) {
			if (nt.researchProgress) {
				for (const rp of nt.researchProgress) {
					if (!techIds.has(rp.techId)) {
						errors.push(
							`nationTechnology[${nt.nationId}].researchProgress → "${rp.techId}" introuvable`,
						)
					}
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationEconomy.nationId → nations', () => {
		const errors = findBrokenNationRefs(
			w.nationEconomies,
			'nationEconomy',
			nationIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationEconomy.mainExports → commodities', () => {
		const errors: string[] = []
		for (const ne of w.nationEconomies) {
			for (const cid of ne.mainExports) {
				if (!commodityIds.has(cid)) {
					errors.push(
						`nationEconomy[${ne.nationId}].mainExports → "${cid}" introuvable`,
					)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationEconomy.mainImports → commodities', () => {
		const errors: string[] = []
		for (const ne of w.nationEconomies) {
			for (const cid of ne.mainImports) {
				if (!commodityIds.has(cid)) {
					errors.push(
						`nationEconomy[${ne.nationId}].mainImports → "${cid}" introuvable`,
					)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationEconomy.tradeRouteAccess → tradeRoutes', () => {
		const errors: string[] = []
		for (const ne of w.nationEconomies) {
			for (const trid of ne.tradeRouteAccess) {
				if (!tradeRouteIds.has(trid)) {
					errors.push(
						`nationEconomy[${ne.nationId}].tradeRouteAccess → "${trid}" introuvable`,
					)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationEconomy.marketPrices[].commodityId → commodities', () => {
		const errors: string[] = []
		for (const ne of w.nationEconomies) {
			if (ne.marketPrices) {
				for (const mp of ne.marketPrices) {
					if (!commodityIds.has(mp.commodityId)) {
						errors.push(
							`nationEconomy[${ne.nationId}].marketPrices → "${mp.commodityId}" introuvable`,
						)
					}
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationLanguage.nationId → nations', () => {
		const errors = findBrokenNationRefs(
			w.nationLanguages,
			'nationLanguage',
			nationIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationLanguage.officialLanguageId → languages', () => {
		const errors: string[] = []
		for (const nl of w.nationLanguages) {
			if (!languageIds.has(nl.officialLanguageId)) {
				errors.push(
					`nationLanguage[${nl.nationId}].officialLanguageId → "${nl.officialLanguageId}" introuvable`,
				)
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationLanguage.spokenLanguages[].languageId → languages', () => {
		const errors: string[] = []
		for (const nl of w.nationLanguages) {
			if (nl.spokenLanguages) {
				for (const sl of nl.spokenLanguages) {
					if (!languageIds.has(sl.languageId)) {
						errors.push(
							`nationLanguage[${nl.nationId}].spokenLanguages → "${sl.languageId}" introuvable`,
						)
					}
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationCulture.nationId → nations', () => {
		const errors = findBrokenNationRefs(
			w.nationCultures,
			'nationCulture',
			nationIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationHealth.nationId → nations', () => {
		const errors = findBrokenNationRefs(
			w.nationHealth,
			'nationHealth',
			nationIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationHealth.activeDiseases[].diseaseId → diseases', () => {
		const errors: string[] = []
		for (const nh of w.nationHealth) {
			if (nh.activeDiseases) {
				for (const ad of nh.activeDiseases) {
					if (!diseaseIds.has(ad.diseaseId)) {
						errors.push(
							`nationHealth[${nh.nationId}].activeDiseases → "${ad.diseaseId}" introuvable`,
						)
					}
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationLaw.nationId → nations', () => {
		const errors = findBrokenNationRefs(w.nationLaws, 'nationLaw', nationIds)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationEducation.nationId → nations', () => {
		const errors = findBrokenNationRefs(
			w.nationEducation,
			'nationEducation',
			nationIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationMilitary.nationId → nations', () => {
		const errors = findBrokenNationRefs(
			w.nationMilitary,
			'nationMilitary',
			nationIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationWorldKnowledge.nationId → nations', () => {
		const errors = findBrokenNationRefs(
			w.nationWorldKnowledge,
			'nationWorldKnowledge',
			nationIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('NationWorldKnowledge.knownNations → nations', () => {
		const errors: string[] = []
		for (const nwk of w.nationWorldKnowledge) {
			for (const nid of nwk.knownNations) {
				if (!nationIds.has(nid)) {
					errors.push(
						`nationWorldKnowledge[${nwk.nationId}].knownNations → "${nid}" introuvable`,
					)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('Population.nationId → nations', () => {
		const errors = findBrokenNationRefs(w.populations, 'population', nationIds)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('DailyLife.nationId → nations', () => {
		const errors = findBrokenNationRefs(w.dailyLife, 'dailyLife', nationIds)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('Infrastructure.nationId → nations', () => {
		const errors: string[] = []
		for (const inf of w.infrastructure) {
			if (!nationIds.has(inf.nationId)) {
				errors.push(
					`infrastructure[${inf.id}].nationId → "${inf.nationId}" introuvable`,
				)
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('SocialMobilityModifier.nationId → nations', () => {
		const errors = findBrokenNationRefs(
			w.socialMobilityModifiers,
			'socialMobilityModifier',
			nationIds,
		)
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('Ecology.regionId → climateRegions', () => {
		const errors: string[] = []
		for (const eco of w.ecology) {
			if (!climateRegionIds.has(eco.regionId)) {
				errors.push(`ecology[${eco.regionId}].regionId introuvable`)
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('AdvisorResponseTemplate.advisorProfileId → advisorProfiles', () => {
		const errors: string[] = []
		for (const art of w.advisorResponseTemplates) {
			if (
				(art as any).advisorProfileId &&
				!advisorProfileIds.has((art as any).advisorProfileId)
			) {
				errors.push(
					`advisorResponseTemplate[${art.id}].advisorProfileId → "${(art as any).advisorProfileId}" introuvable`,
				)
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})
})

// ============================================================================
// 4. HistoricalEvents — références complexes
// ============================================================================

describe('HistoricalEvents — références', () => {
	it('affectedNationIds → nations', () => {
		const errors: string[] = []
		for (const evt of w.historicalEvents) {
			for (const nid of evt.affectedNationIds) {
				if (!nationIds.has(nid)) {
					errors.push(`${evt.id}.affectedNationIds → "${nid}"`)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('affectedRegionIds → climateRegions', () => {
		const errors: string[] = []
		for (const evt of w.historicalEvents) {
			if (evt.affectedRegionIds) {
				for (const rid of evt.affectedRegionIds) {
					if (!climateRegionIds.has(rid)) {
						errors.push(`${evt.id}.affectedRegionIds → "${rid}"`)
					}
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('triggerConditions.requiredTechs → technologies', () => {
		const errors: string[] = []
		for (const evt of w.historicalEvents) {
			if (evt.triggerConditions?.requiredTechs) {
				for (const tid of evt.triggerConditions.requiredTechs) {
					if (!techIds.has(tid))
						errors.push(`${evt.id}.triggerConditions.requiredTechs → "${tid}"`)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('triggerConditions.requiredEventIds → historicalEvents', () => {
		const errors: string[] = []
		for (const evt of w.historicalEvents) {
			if (evt.triggerConditions?.requiredEventIds) {
				for (const eid of evt.triggerConditions.requiredEventIds) {
					if (!historicalEventIds.has(eid))
						errors.push(
							`${evt.id}.triggerConditions.requiredEventIds → "${eid}"`,
						)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('triggerConditions.blockedByEventIds → historicalEvents', () => {
		const errors: string[] = []
		for (const evt of w.historicalEvents) {
			if (evt.triggerConditions?.blockedByEventIds) {
				for (const eid of evt.triggerConditions.blockedByEventIds) {
					if (!historicalEventIds.has(eid))
						errors.push(
							`${evt.id}.triggerConditions.blockedByEventIds → "${eid}"`,
						)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('triggerConditions.requiredNationsExist → nations', () => {
		const errors: string[] = []
		for (const evt of w.historicalEvents) {
			if (evt.triggerConditions?.requiredNationsExist) {
				for (const nid of evt.triggerConditions.requiredNationsExist) {
					if (!nationIds.has(nid))
						errors.push(
							`${evt.id}.triggerConditions.requiredNationsExist → "${nid}"`,
						)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('triggerConditions.requiredDiplomacy.between → nations', () => {
		const errors: string[] = []
		for (const evt of w.historicalEvents) {
			const between = evt.triggerConditions?.requiredDiplomacy?.between
			if (between) {
				if (!nationIds.has(between[0]))
					errors.push(
						`${evt.id}.requiredDiplomacy.between[0] → "${between[0]}"`,
					)
				if (!nationIds.has(between[1]))
					errors.push(
						`${evt.id}.requiredDiplomacy.between[1] → "${between[1]}"`,
					)
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('effects.techUnlocks → technologies', () => {
		const errors: string[] = []
		for (const evt of w.historicalEvents) {
			if (evt.effects?.techUnlocks) {
				for (const tid of evt.effects.techUnlocks) {
					if (!techIds.has(tid))
						errors.push(`${evt.id}.effects.techUnlocks → "${tid}"`)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('effects.triggerEventIds → historicalEvents', () => {
		const errors: string[] = []
		for (const evt of w.historicalEvents) {
			if (evt.effects?.triggerEventIds) {
				for (const eid of evt.effects.triggerEventIds) {
					if (!historicalEventIds.has(eid))
						errors.push(`${evt.id}.effects.triggerEventIds → "${eid}"`)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('effects.newDiplomacy.between → nations', () => {
		const errors: string[] = []
		for (const evt of w.historicalEvents) {
			const between = evt.effects?.newDiplomacy?.between
			if (between) {
				if (!nationIds.has(between[0]))
					errors.push(
						`${evt.id}.effects.newDiplomacy.between[0] → "${between[0]}"`,
					)
				if (!nationIds.has(between[1]))
					errors.push(
						`${evt.id}.effects.newDiplomacy.between[1] → "${between[1]}"`,
					)
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('effects.nationMutations[].nationId → nations', () => {
		const errors: string[] = []
		for (const evt of w.historicalEvents) {
			if (evt.effects?.nationMutations) {
				for (const nm of evt.effects.nationMutations) {
					if (!nationIds.has(nm.nationId))
						errors.push(`${evt.id}.nationMutations.nationId → "${nm.nationId}"`)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('gmOverrideOptions.fallbackEventId → historicalEvents', () => {
		const errors: string[] = []
		for (const evt of w.historicalEvents) {
			if (evt.gmOverrideOptions?.fallbackEventId) {
				if (!historicalEventIds.has(evt.gmOverrideOptions.fallbackEventId)) {
					errors.push(
						`${evt.id}.gmOverrideOptions.fallbackEventId → "${evt.gmOverrideOptions.fallbackEventId}"`,
					)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})
})

// ============================================================================
// 5. EventTemplates — références
// ============================================================================

describe('EventTemplates — références', () => {
	it('triggerConditions.requiredTechs → technologies', () => {
		const errors: string[] = []
		for (const tpl of w.eventTemplates) {
			if (tpl.triggerConditions?.requiredTechs) {
				for (const tid of tpl.triggerConditions.requiredTechs) {
					if (!techIds.has(tid))
						errors.push(`${tpl.id}.triggerConditions.requiredTechs → "${tid}"`)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('triggerConditions refs → historicalEvents / eventTemplates / climateRegions', () => {
		const errors: string[] = []
		for (const tpl of w.eventTemplates) {
			const tc = tpl.triggerConditions as any
			if (tc?.requiredActiveEvents) {
				for (const eid of tc.requiredActiveEvents) {
					if (!historicalEventIds.has(eid))
						errors.push(`${tpl.id}.requiredActiveEvents → "${eid}"`)
				}
			}
			if (tc?.requiredTemplateIds) {
				for (const tid of tc.requiredTemplateIds) {
					if (!eventTemplateIds.has(tid))
						errors.push(`${tpl.id}.requiredTemplateIds → "${tid}"`)
				}
			}
			if (tc?.requiredBiomes) {
				for (const bid of tc.requiredBiomes) {
					if (!climateRegionIds.has(bid))
						errors.push(`${tpl.id}.requiredBiomes → "${bid}"`)
				}
			}
			if (tc?.excludedBiomes) {
				for (const bid of tc.excludedBiomes) {
					if (!climateRegionIds.has(bid))
						errors.push(`${tpl.id}.excludedBiomes → "${bid}"`)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('defaultEffects refs → eventTemplates / historicalEvents', () => {
		const errors: string[] = []
		for (const tpl of w.eventTemplates) {
			const eff = tpl.defaultEffects as any
			if (eff?.triggerTemplateIds) {
				for (const tid of eff.triggerTemplateIds) {
					if (!eventTemplateIds.has(tid))
						errors.push(`${tpl.id}.triggerTemplateIds → "${tid}"`)
				}
			}
			if (eff?.triggerHistoricalEventIds) {
				for (const eid of eff.triggerHistoricalEventIds) {
					if (!historicalEventIds.has(eid))
						errors.push(`${tpl.id}.triggerHistoricalEventIds → "${eid}"`)
				}
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})
})

// ============================================================================
// 6. RumorTemplates
// ============================================================================

describe('RumorTemplates — références', () => {
	it('sourceEventId → historicalEvents', () => {
		const errors: string[] = []
		for (const rt of w.rumorTemplates) {
			const sourceEventId = (rt as any).sourceEventId
			if (sourceEventId && !historicalEventIds.has(sourceEventId)) {
				errors.push(`${rt.id}.sourceEventId → "${sourceEventId}"`)
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('sourceTemplateId → eventTemplates', () => {
		const errors: string[] = []
		for (const rt of w.rumorTemplates) {
			const sourceTemplateId = (rt as any).sourceTemplateId
			if (sourceTemplateId && !eventTemplateIds.has(sourceTemplateId)) {
				errors.push(`${rt.id}.sourceTemplateId → "${sourceTemplateId}"`)
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})
})

// ============================================================================
// 7. DAG Technologies — détection de cycles
// ============================================================================

describe('Technologies — DAG', () => {
	it('le graphe de prérequis ne contient aucun cycle', () => {
		const visited = new Set<string>()
		const inStack = new Set<string>()
		const techMap = new Map(w.technologies.map((t) => [t.id, t]))
		let cyclePath: string[] | null = null

		function dfs(id: string, path: string[]): boolean {
			if (inStack.has(id)) {
				cyclePath = [...path, id]
				return true
			}
			if (visited.has(id)) return false
			visited.add(id)
			inStack.add(id)
			const tech = techMap.get(id)
			if (tech) {
				for (const pre of tech.prerequisites) {
					if (dfs(pre, [...path, id])) return true
				}
			}
			inStack.delete(id)
			return false
		}

		for (const t of w.technologies) {
			if (dfs(t.id, [])) break
		}

		expect(
			cyclePath,
			cyclePath ? `Cycle détecté : ${cyclePath.join(' → ')}` : '',
		).toBeNull()
	})
})

// ============================================================================
// 8. Couverture — chaque nation doit avoir une entrée par mapping table
// ============================================================================

describe('Couverture — mapping tables couvrent toutes les nations', () => {
	function nationIdSet(arr: { nationId: string }[]): Set<string> {
		return new Set(arr.map((e) => e.nationId))
	}

	const mappingTables: [string, { nationId: string }[]][] = [
		['nationReligions', w.nationReligions],
		['nationTechnologies', w.nationTechnologies],
		['nationEconomies', w.nationEconomies],
		['nationLanguages', w.nationLanguages],
		['nationCultures', w.nationCultures],
		['nationHealth', w.nationHealth],
		['nationLaws', w.nationLaws],
		['nationEducation', w.nationEducation],
		['nationMilitary', w.nationMilitary],
		['nationWorldKnowledge', w.nationWorldKnowledge],
		['populations', w.populations],
		['socialMobilityModifiers', w.socialMobilityModifiers],
	]

	for (const [name, data] of mappingTables) {
		it(`${name} couvre chaque nation active`, () => {
			const covered = nationIdSet(data)
			const missing = [...activeNationIds].filter((nid) => !covered.has(nid))
			expect(missing, `${name} manque pour : ${missing.join(', ')}`).toEqual([])
		})
	}

	it('dailyLife couvre chaque nation active (au moins une entrée par nation)', () => {
		const covered = new Set(w.dailyLife.map((e: any) => e.nationId))
		const missing = [...activeNationIds].filter((nid) => !covered.has(nid))
		expect(missing, `dailyLife manque pour : ${missing.join(', ')}`).toEqual([])
	})

	it('culturalNamePools couvre chaque nation active', () => {
		const covered = new Set<string>()
		for (const cnp of w.culturalNamePools) {
			for (const nid of cnp.nationIds) covered.add(nid)
		}
		const missing = [...activeNationIds].filter((nid) => !covered.has(nid))
		expect(
			missing,
			`culturalNamePools manque pour : ${missing.join(', ')}`,
		).toEqual([])
	})
})

// ============================================================================
// 9. Cohérence — invariants métier
// ============================================================================

describe('Cohérence — invariants métier', () => {
	it("la capital d'une nation active appartient bien à cette nation", () => {
		const errors: string[] = []
		for (const n of w.nations.filter((n: any) => activeNationIds.has(n.id))) {
			const settlement = w.settlements.find((s) => s.id === n.capital)
			if (settlement && settlement.nationId !== n.id) {
				errors.push(
					`Nation "${n.id}" a pour capital "${n.capital}" mais ce settlement appartient à "${settlement.nationId}"`,
				)
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('chaque dataset principal contient au moins 1 entrée', () => {
		expect(w.nations.length).toBeGreaterThan(0)
		expect(w.settlements.length).toBeGreaterThan(0)
		expect(w.religions.length).toBeGreaterThan(0)
		expect(w.technologies.length).toBeGreaterThan(0)
		expect(w.commodities.length).toBeGreaterThan(0)
		expect(w.languages.length).toBeGreaterThan(0)
		expect(w.diseases.length).toBeGreaterThan(0)
		expect(w.tradeRoutes.length).toBeGreaterThan(0)
	})

	it("les techs requises par d'autres datasets sont soit débloquées soit ont des prérequis non encore atteints", () => {
		const allUnlockedTechs = new Set<string>()
		for (const nt of w.nationTechnologies) {
			for (const t of nt.unlockedTechs) allUnlockedTechs.add(t)
		}

		const referencedTechs = new Set<string>()
		for (const v of w.transportVehicles)
			for (const t of v.requiredTechs) referencedTechs.add(t)
		for (const cr of w.constructionRecipes)
			for (const t of cr.requiredTechs) referencedTechs.add(t)
		for (const sm of w.socialMobilityPaths)
			for (const t of sm.requiredTechs) referencedTechs.add(t)
		for (const iv of w.informationVectors)
			for (const t of iv.requiredTechs) referencedTechs.add(t)
		for (const ap of w.advisorProfiles)
			for (const t of ap.requiredTechs) referencedTechs.add(t)
		for (const ke of w.knowledgeEntries)
			for (const t of ke.requiredTechs) referencedTechs.add(t)
		for (const fr of w.feasibilityRules)
			for (const t of fr.requiredTechs) referencedTechs.add(t)

		// Construire un index des prérequis par techId
		const techPrereqs = new Map<string, string[]>()
		for (const tech of w.technologies) {
			techPrereqs.set(tech.id, tech.prerequisites ?? [])
		}

		// Techs futures (yearAvailable > 1000) : pas encore découvrables, on les ignore
		const futureTechIds = new Set(
			w.technologies
				.filter((t) => t.yearAvailable && t.yearAvailable > 1000)
				.map((t) => t.id),
		)

		// Seules les techs dont TOUS les prérequis sont débloqués globalement
		// mais qui ne sont elles-mêmes débloquées par personne sont suspectes.
		// Les techs avec des prérequis non atteints sont simplement « futures ».
		const orphans: string[] = []
		for (const refTech of referencedTechs) {
			if (techIds.has(refTech) && !allUnlockedTechs.has(refTech)) {
				if (futureTechIds.has(refTech)) continue
				const prereqs = techPrereqs.get(refTech) ?? []
				const allPrereqsMet =
					prereqs.length === 0 || prereqs.every((p) => allUnlockedTechs.has(p))
				if (allPrereqsMet) {
					orphans.push(refTech)
				}
			}
		}

		expect(
			orphans,
			`Techs orphelines (requises, prérequis atteints, mais jamais débloquées) : ${orphans.join(', ')}`,
		).toEqual([])
	})
})

// ============================================================================
// 10. Cohérence sémantique — qualité des données
// ============================================================================

describe('Cohérence sémantique — Ratios et Levels', () => {
	it('les Ratios (0-1) sont dans les bornes', () => {
		const errors: string[] = []
		for (const p of w.populations) {
			if (p.urbanRatio < 0 || p.urbanRatio > 1)
				errors.push(`population[${p.nationId}].urbanRatio = ${p.urbanRatio}`)
			if (p.infantMortality < 0 || p.infantMortality > 1)
				errors.push(
					`population[${p.nationId}].infantMortality = ${p.infantMortality}`,
				)
			if (p.birthRate < 0 || p.birthRate > 1)
				errors.push(`population[${p.nationId}].birthRate = ${p.birthRate}`)
			if (p.deathRate < 0 || p.deathRate > 1)
				errors.push(`population[${p.nationId}].deathRate = ${p.deathRate}`)
		}
		for (const nl of w.nationLanguages) {
			if (nl.literacyRate < 0 || nl.literacyRate > 1)
				errors.push(
					`nationLanguage[${nl.nationId}].literacyRate = ${nl.literacyRate}`,
				)
		}
		for (const ne of w.nationEconomies) {
			if (ne.taxRate < 0 || ne.taxRate > 1)
				errors.push(`nationEconomy[${ne.nationId}].taxRate = ${ne.taxRate}`)
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('les Levels (0-10) sont dans les bornes', () => {
		const errors: string[] = []
		for (const nh of w.nationHealth) {
			for (const [field, val] of [
				['medicalKnowledge', nh.medicalKnowledge],
				['sanitation', nh.sanitation],
				['faminRisk', nh.faminRisk],
				['overallHealth', nh.overallHealth],
			] as [string, number][]) {
				if (val < 0 || val > 10)
					errors.push(`nationHealth[${nh.nationId}].${field} = ${val}`)
			}
		}
		for (const nr of w.nationReligions) {
			if (nr.religiousTension < 0 || nr.religiousTension > 10)
				errors.push(
					`nationReligion[${nr.nationId}].religiousTension = ${nr.religiousTension}`,
				)
		}
		for (const p of w.populations) {
			for (const sg of p.socialGroups) {
				if (sg.influence < 0 || sg.influence > 10)
					errors.push(
						`population[${p.nationId}].${sg.class}.influence = ${sg.influence}`,
					)
				if (sg.wealth < 0 || sg.wealth > 10)
					errors.push(
						`population[${p.nationId}].${sg.class}.wealth = ${sg.wealth}`,
					)
			}
		}
		for (const nm of w.nationMilitary) {
			for (const [field, val] of [
				['militaryStrength', nm.militaryStrength],
				['navalStrength', nm.navalStrength],
				['warExperience', nm.warExperience],
				['morale', nm.morale],
			] as [string, number][]) {
				if (val < 0 || val > 10)
					errors.push(`nationMilitary[${nm.nationId}].${field} = ${val}`)
			}
		}
		for (const t of w.technologies) {
			if (t.complexity < 0 || t.complexity > 10)
				errors.push(`technology[${t.id}].complexity = ${t.complexity}`)
		}
		expect(errors, errors.join('\n')).toEqual([])
	})
})

describe('Cohérence sémantique — Pourcentages', () => {
	it('les pourcentages religieux par nation somment à ≥ 0.70', () => {
		const errors: string[] = []
		for (const nr of w.nationReligions) {
			const sum = nr.religions.reduce((s, r) => s + r.percentage, 0)
			if (sum < 0.7 || sum > 1.05)
				errors.push(`nationReligion[${nr.nationId}]: somme = ${sum.toFixed(3)}`)
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('les pourcentages linguistiques par nation somment à ≥ 0.70', () => {
		const errors: string[] = []
		for (const nl of w.nationLanguages) {
			const sum = nl.spokenLanguages.reduce((s, l) => s + l.percentage, 0)
			if (sum < 0.7 || sum > 1.05)
				errors.push(`nationLanguage[${nl.nationId}]: somme = ${sum.toFixed(3)}`)
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('les pourcentages des groupes sociaux par nation somment à ≥ 0.70', () => {
		const errors: string[] = []
		for (const p of w.populations) {
			const sum = p.socialGroups.reduce((s, g) => s + g.percentage, 0)
			if (sum < 0.7 || sum > 1.05)
				errors.push(`population[${p.nationId}]: somme = ${sum.toFixed(3)}`)
		}
		expect(errors, errors.join('\n')).toEqual([])
	})
})

describe('Cohérence sémantique — Valeurs réalistes', () => {
	it('lifeExpectancy est entre 20 et 60 (an 1000)', () => {
		const errors: string[] = []
		for (const p of w.populations) {
			if (p.lifeExpectancy < 20 || p.lifeExpectancy > 60)
				errors.push(
					`population[${p.nationId}].lifeExpectancy = ${p.lifeExpectancy}`,
				)
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('les prix du marché sont strictement positifs', () => {
		const errors: string[] = []
		for (const ne of w.nationEconomies) {
			for (const mp of ne.marketPrices) {
				if (mp.price <= 0)
					errors.push(
						`nationEconomy[${ne.nationId}].marketPrices[${mp.commodityId}] = ${mp.price}`,
					)
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('gdpEstimate est strictement positif', () => {
		const errors: string[] = []
		for (const ne of w.nationEconomies) {
			if (ne.gdpEstimate <= 0)
				errors.push(
					`nationEconomy[${ne.nationId}].gdpEstimate = ${ne.gdpEstimate}`,
				)
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('armySize est positif ou nul', () => {
		const errors: string[] = []
		for (const nm of w.nationMilitary) {
			if (nm.armySize < 0)
				errors.push(`nationMilitary[${nm.nationId}].armySize = ${nm.armySize}`)
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('population totale est strictement positive', () => {
		const errors: string[] = []
		for (const p of w.populations) {
			if (p.total <= 0)
				errors.push(`population[${p.nationId}].total = ${p.total}`)
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('population mondiale est entre 200M et 400M (an 1000)', () => {
		const total = w.populations.reduce((s, p) => s + p.total, 0)
		expect(total).toBeGreaterThan(200_000_000)
		expect(total).toBeLessThan(400_000_000)
	})
})

describe('Cohérence sémantique — Technologies', () => {
	it("aucune tech avec yearAvailable > 1000 n'est débloquée par une nation", () => {
		const futureTechIds = new Set(
			w.technologies
				.filter((t) => t.yearAvailable && t.yearAvailable > 1000)
				.map((t) => t.id),
		)
		const errors: string[] = []
		for (const nt of w.nationTechnologies) {
			for (const tid of nt.unlockedTechs) {
				if (futureTechIds.has(tid))
					errors.push(`${nt.nationId} a débloqué la tech future "${tid}"`)
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('researchProgress est entre 0 et 1', () => {
		const errors: string[] = []
		for (const nt of w.nationTechnologies) {
			for (const rp of nt.researchProgress) {
				if (rp.progress < 0 || rp.progress > 1)
					errors.push(
						`nationTechnology[${nt.nationId}].researchProgress[${rp.techId}] = ${rp.progress}`,
					)
			}
		}
		expect(errors, errors.join('\n')).toEqual([])
	})

	it('innovationCapacity est entre 0 et 10', () => {
		const errors: string[] = []
		for (const nt of w.nationTechnologies) {
			if (nt.innovationCapacity < 0 || nt.innovationCapacity > 10)
				errors.push(
					`nationTechnology[${nt.nationId}].innovationCapacity = ${nt.innovationCapacity}`,
				)
		}
		expect(errors, errors.join('\n')).toEqual([])
	})
})

describe('Cohérence sémantique — Connaissances mondiales', () => {
	it('les knownNations sont au moins partiellement symétriques (>50%)', () => {
		let totalPairs = 0
		let symmetricPairs = 0
		const wkMap = new Map(w.nationWorldKnowledge.map((x) => [x.nationId, x]))
		for (const a of w.nationWorldKnowledge) {
			for (const known of a.knownNations) {
				totalPairs++
				const b = wkMap.get(known)
				if (b && b.knownNations.includes(a.nationId)) symmetricPairs++
			}
		}
		const ratio = totalPairs > 0 ? symmetricPairs / totalPairs : 1
		expect(
			ratio,
			`Seulement ${(ratio * 100).toFixed(1)}% de paires symétriques (${symmetricPairs}/${totalPairs})`,
		).toBeGreaterThan(0.5)
	})
})
