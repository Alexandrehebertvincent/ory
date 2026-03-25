/**
 * validateCrossReferences.ts
 *
 * Vérifie l'intégrité référentielle de TOUS les datasets du WorldSnapshot.
 * Usage : npx tsx scripts/validateCrossReferences.ts
 */

import { worldSnapshot1000 as w } from '../packages/historical-data/src/seed/index'

// ============================================================================
// Helpers
// ============================================================================

interface Issue {
	dataset: string
	entityId: string
	field: string
	refId: string
	targetDataset: string
}

const issues: Issue[] = []
const warnings: string[] = []
const stats = { checks: 0, ok: 0, fail: 0, warn: 0 }

function idSet(arr: { id: string }[]): Set<string> {
	return new Set(arr.map((e) => e.id))
}

function nationIdSet(arr: { nationId: string }[]): Set<string> {
	return new Set(arr.map((e) => e.nationId))
}

/**
 * Vérifie qu'un ID unique existe dans un ensemble cible.
 */
function checkRef(
	dataset: string,
	entityId: string,
	field: string,
	refId: string | null | undefined,
	targetSet: Set<string>,
	targetDataset: string,
) {
	if (refId == null) return
	stats.checks++
	if (targetSet.has(refId)) {
		stats.ok++
	} else {
		stats.fail++
		issues.push({ dataset, entityId, field, refId, targetDataset })
	}
}

/**
 * Vérifie un tableau d'IDs.
 */
function checkRefs(
	dataset: string,
	entityId: string,
	field: string,
	refIds: string[] | undefined,
	targetSet: Set<string>,
	targetDataset: string,
) {
	if (!refIds) return
	for (const refId of refIds) {
		checkRef(dataset, entityId, field, refId, targetSet, targetDataset)
	}
}

/**
 * Vérifie que chaque nation a une entrée dans un mapping table.
 */
function checkNationCoverage(
	mappingName: string,
	mappingNationIds: Set<string>,
	allNationIds: Set<string>,
) {
	for (const nid of allNationIds) {
		stats.checks++
		if (mappingNationIds.has(nid)) {
			stats.ok++
		} else {
			stats.warn++
			warnings.push(`[COUVERTURE] ${mappingName} manque pour nation "${nid}"`)
		}
	}
}

/**
 * Vérifie les doublons d'IDs.
 */
function checkDuplicates(dataset: string, arr: { id: string }[]) {
	const seen = new Set<string>()
	for (const item of arr) {
		if (seen.has(item.id)) {
			stats.warn++
			warnings.push(`[DOUBLON] ${dataset} a un ID dupliqué : "${item.id}"`)
		}
		seen.add(item.id)
	}
}

function checkDuplicatesByNation(dataset: string, arr: { nationId: string }[]) {
	const seen = new Set<string>()
	for (const item of arr) {
		if (seen.has(item.nationId)) {
			stats.warn++
			warnings.push(
				`[DOUBLON] ${dataset} a un nationId dupliqué : "${item.nationId}"`,
			)
		}
		seen.add(item.nationId)
	}
}

function checkDuplicatesByNationAndClass(
	dataset: string,
	arr: { nationId: string; socialClass: string }[],
) {
	const seen = new Set<string>()
	for (const item of arr) {
		const key = `${item.nationId}::${item.socialClass}`
		if (seen.has(key)) {
			stats.warn++
			warnings.push(
				`[DOUBLON] ${dataset} a un doublon (nationId + socialClass) : "${item.nationId}" / "${item.socialClass}"`,
			)
		}
		seen.add(key)
	}
}

// ============================================================================
// Construction des index
// ============================================================================

const nationIds = idSet(w.nations)
const activeNationIds = new Set(
	w.nations.filter((n) => !n.startYear).map((n) => n.id),
)
const settlementIds = idSet(w.settlements)
const religionIds = idSet(w.religions)
const techIds = idSet(w.technologies)
const commodityIds = idSet(w.commodities)
const languageIds = idSet(w.languages)
const diseaseIds = idSet(w.diseases)
const tradeRouteIds = idSet(w.tradeRoutes)
const climateRegionIds = idSet(w.climateRegions)
const transportVehicleIds = idSet(w.transportVehicles)
const historicalEventIds = idSet(w.historicalEvents)
const eventTemplateIds = idSet(w.eventTemplates)
const informationVectorIds = idSet(w.informationVectors)
const rumorTemplateIds = idSet(w.rumorTemplates)
const advisorProfileIds = idSet(w.advisorProfiles)
const knowledgeEntryIds = idSet(w.knowledgeEntries)
const feasibilityRuleIds = idSet(w.feasibilityRules)
const constructionRecipeIds = idSet(w.constructionRecipes)
const socialMobilityPathIds = idSet(w.socialMobilityPaths)
const culturalNamePoolIds = idSet(w.culturalNamePools)
const ecologyRegionIds = new Set(w.ecology.map((e) => e.regionId))
const infrastructureIds = idSet(w.infrastructure)

console.log('='.repeat(72))
console.log('  VALIDATION CROISÉE DES DATASETS — ORY WorldSnapshot An 1000')
console.log('='.repeat(72))
console.log()

// ============================================================================
// 0. Doublons
// ============================================================================

console.log("▸ Vérification des doublons d'IDs...")

checkDuplicates('nations', w.nations)
checkDuplicates('settlements', w.settlements)
checkDuplicates('religions', w.religions)
checkDuplicates('technologies', w.technologies)
checkDuplicates('commodities', w.commodities)
checkDuplicates('languages', w.languages)
checkDuplicates('diseases', w.diseases)
checkDuplicates('tradeRoutes', w.tradeRoutes)
checkDuplicates('climateRegions', w.climateRegions)
checkDuplicates('transportVehicles', w.transportVehicles)
checkDuplicates('historicalEvents', w.historicalEvents)
checkDuplicates('eventTemplates', w.eventTemplates)
checkDuplicates('informationVectors', w.informationVectors)
checkDuplicates('rumorTemplates', w.rumorTemplates)
checkDuplicates('advisorProfiles', w.advisorProfiles)
checkDuplicates('knowledgeEntries', w.knowledgeEntries)
checkDuplicates('feasibilityRules', w.feasibilityRules)
checkDuplicates('constructionRecipes', w.constructionRecipes)
checkDuplicates('socialMobilityPaths', w.socialMobilityPaths)
checkDuplicates('culturalNamePools', w.culturalNamePools)
checkDuplicates('infrastructure', w.infrastructure)

checkDuplicatesByNation('nationReligions', w.nationReligions)
checkDuplicatesByNation('nationTechnologies', w.nationTechnologies)
checkDuplicatesByNation('nationEconomies', w.nationEconomies)
checkDuplicatesByNation('nationLanguages', w.nationLanguages)
checkDuplicatesByNation('nationCultures', w.nationCultures)
checkDuplicatesByNation('nationHealth', w.nationHealth)
checkDuplicatesByNation('nationLaws', w.nationLaws)
checkDuplicatesByNation('nationEducation', w.nationEducation)
checkDuplicatesByNation('nationMilitary', w.nationMilitary)
checkDuplicatesByNation('nationWorldKnowledge', w.nationWorldKnowledge)
checkDuplicatesByNation('populations', w.populations)
checkDuplicatesByNation('socialMobilityModifiers', w.socialMobilityModifiers)
checkDuplicatesByNationAndClass('dailyLife', w.dailyLife)

// ============================================================================
// 1. Nations
// ============================================================================

console.log('▸ Vérification des Nations...')

for (const n of w.nations) {
	// capital → Settlement
	checkRef('nation', n.id, 'capital', n.capital, settlementIds, 'settlements')

	// vassalOf → Nation (self-ref)
	checkRef('nation', n.id, 'vassalOf', n.vassalOf, nationIds, 'nations')

	// diplomacy[].targetNationId → Nation
	if (n.diplomacy) {
		for (const d of n.diplomacy) {
			checkRef(
				'nation',
				n.id,
				'diplomacy.targetNationId',
				d.targetNationId,
				nationIds,
				'nations',
			)
		}
	}
}

// ============================================================================
// 2. Settlements
// ============================================================================

console.log('▸ Vérification des Settlements...')

for (const s of w.settlements) {
	checkRef('settlement', s.id, 'nationId', s.nationId, nationIds, 'nations')
}

// ============================================================================
// 3. Religions
// ============================================================================

console.log('▸ Vérification des Religions...')

for (const r of w.religions) {
	checkRef(
		'religion',
		r.id,
		'holyCity',
		r.holyCity,
		settlementIds,
		'settlements',
	)
}

// ============================================================================
// 4. Technologies (DAG)
// ============================================================================

console.log('▸ Vérification des Technologies...')

for (const t of w.technologies) {
	checkRefs(
		'technology',
		t.id,
		'prerequisites',
		t.prerequisites,
		techIds,
		'technologies',
	)
}

// Détection de cycles dans le DAG
function detectTechCycles() {
	const visited = new Set<string>()
	const inStack = new Set<string>()
	const techMap = new Map(w.technologies.map((t) => [t.id, t]))

	function dfs(id: string, path: string[]): string[] | null {
		if (inStack.has(id)) return [...path, id]
		if (visited.has(id)) return null
		visited.add(id)
		inStack.add(id)
		const tech = techMap.get(id)
		if (tech) {
			for (const pre of tech.prerequisites) {
				const cycle = dfs(pre, [...path, id])
				if (cycle) return cycle
			}
		}
		inStack.delete(id)
		return null
	}

	for (const t of w.technologies) {
		const cycle = dfs(t.id, [])
		if (cycle) {
			stats.fail++
			warnings.push(`[CYCLE TECH] Cycle détecté : ${cycle.join(' → ')}`)
			return
		}
	}
}
detectTechCycles()

// ============================================================================
// 5. TradeRoutes
// ============================================================================

console.log('▸ Vérification des TradeRoutes...')

for (const tr of w.tradeRoutes) {
	checkRefs(
		'tradeRoute',
		tr.id,
		'connectsNations',
		tr.connectsNations,
		nationIds,
		'nations',
	)
}

// ============================================================================
// 6. Diseases
// ============================================================================

console.log('▸ Vérification des Diseases...')

for (const d of w.diseases) {
	checkRefs(
		'disease',
		d.id,
		'endemicRegions',
		d.endemicRegions,
		climateRegionIds,
		'climateRegions',
	)
	checkRefs(
		'disease',
		d.id,
		'knownTreatments',
		d.knownTreatments,
		techIds,
		'technologies',
	)
}

// ============================================================================
// 7. TransportVehicles
// ============================================================================

console.log('▸ Vérification des TransportVehicles...')

for (const v of w.transportVehicles) {
	checkRefs(
		'transportVehicle',
		v.id,
		'requiredTechs',
		v.requiredTechs,
		techIds,
		'technologies',
	)
	checkRefs(
		'transportVehicle',
		v.id,
		'culturalOrigins',
		v.culturalOrigins,
		nationIds,
		'nations',
	)
}

// ============================================================================
// 8. ConstructionRecipes
// ============================================================================

console.log('▸ Vérification des ConstructionRecipes...')

for (const cr of w.constructionRecipes) {
	checkRefs(
		'constructionRecipe',
		cr.id,
		'requiredTechs',
		cr.requiredTechs,
		techIds,
		'technologies',
	)
}

// ============================================================================
// 9. SocialMobilityPaths
// ============================================================================

console.log('▸ Vérification des SocialMobilityPaths...')

for (const sm of w.socialMobilityPaths) {
	checkRefs(
		'socialMobilityPath',
		sm.id,
		'requiredTechs',
		sm.requiredTechs,
		techIds,
		'technologies',
	)
}

// ============================================================================
// 10. NationReligions
// ============================================================================

console.log('▸ Vérification des NationReligions...')

for (const nr of w.nationReligions) {
	checkRef(
		'nationReligion',
		nr.nationId,
		'nationId',
		nr.nationId,
		nationIds,
		'nations',
	)
	checkRef(
		'nationReligion',
		nr.nationId,
		'stateReligionId',
		nr.stateReligionId,
		religionIds,
		'religions',
	)
	if (nr.religions) {
		for (const r of nr.religions) {
			checkRef(
				'nationReligion',
				nr.nationId,
				'religions[].religionId',
				r.religionId,
				religionIds,
				'religions',
			)
		}
	}
}

// ============================================================================
// 11. NationTechnologies
// ============================================================================

console.log('▸ Vérification des NationTechnologies...')

for (const nt of w.nationTechnologies) {
	checkRef(
		'nationTechnology',
		nt.nationId,
		'nationId',
		nt.nationId,
		nationIds,
		'nations',
	)
	checkRefs(
		'nationTechnology',
		nt.nationId,
		'unlockedTechs',
		nt.unlockedTechs,
		techIds,
		'technologies',
	)
	if (nt.researchProgress) {
		for (const rp of nt.researchProgress) {
			checkRef(
				'nationTechnology',
				nt.nationId,
				'researchProgress[].techId',
				rp.techId,
				techIds,
				'technologies',
			)
		}
	}
}

// ============================================================================
// 12. NationEconomies
// ============================================================================

console.log('▸ Vérification des NationEconomies...')

for (const ne of w.nationEconomies) {
	checkRef(
		'nationEconomy',
		ne.nationId,
		'nationId',
		ne.nationId,
		nationIds,
		'nations',
	)
	checkRefs(
		'nationEconomy',
		ne.nationId,
		'mainExports',
		ne.mainExports,
		commodityIds,
		'commodities',
	)
	checkRefs(
		'nationEconomy',
		ne.nationId,
		'mainImports',
		ne.mainImports,
		commodityIds,
		'commodities',
	)
	checkRefs(
		'nationEconomy',
		ne.nationId,
		'tradeRouteAccess',
		ne.tradeRouteAccess,
		tradeRouteIds,
		'tradeRoutes',
	)
	if (ne.marketPrices) {
		for (const mp of ne.marketPrices) {
			checkRef(
				'nationEconomy',
				ne.nationId,
				'marketPrices[].commodityId',
				mp.commodityId,
				commodityIds,
				'commodities',
			)
		}
	}
}

// ============================================================================
// 13. NationLanguages
// ============================================================================

console.log('▸ Vérification des NationLanguages...')

for (const nl of w.nationLanguages) {
	checkRef(
		'nationLanguage',
		nl.nationId,
		'nationId',
		nl.nationId,
		nationIds,
		'nations',
	)
	checkRef(
		'nationLanguage',
		nl.nationId,
		'officialLanguageId',
		nl.officialLanguageId,
		languageIds,
		'languages',
	)
	if (nl.spokenLanguages) {
		for (const sl of nl.spokenLanguages) {
			checkRef(
				'nationLanguage',
				nl.nationId,
				'spokenLanguages[].languageId',
				sl.languageId,
				languageIds,
				'languages',
			)
		}
	}
}

// ============================================================================
// 14. NationCultures
// ============================================================================

console.log('▸ Vérification des NationCultures...')

for (const nc of w.nationCultures) {
	checkRef(
		'nationCulture',
		nc.nationId,
		'nationId',
		nc.nationId,
		nationIds,
		'nations',
	)
}

// ============================================================================
// 15. NationHealth
// ============================================================================

console.log('▸ Vérification des NationHealth...')

for (const nh of w.nationHealth) {
	checkRef(
		'nationHealth',
		nh.nationId,
		'nationId',
		nh.nationId,
		nationIds,
		'nations',
	)
	if (nh.activeDiseases) {
		for (const ad of nh.activeDiseases) {
			checkRef(
				'nationHealth',
				nh.nationId,
				'activeDiseases[].diseaseId',
				ad.diseaseId,
				diseaseIds,
				'diseases',
			)
		}
	}
}

// ============================================================================
// 16. NationLaws
// ============================================================================

console.log('▸ Vérification des NationLaws...')

for (const nl of w.nationLaws) {
	checkRef(
		'nationLaw',
		nl.nationId,
		'nationId',
		nl.nationId,
		nationIds,
		'nations',
	)
}

// ============================================================================
// 17. NationEducation
// ============================================================================

console.log('▸ Vérification des NationEducation...')

for (const ne of w.nationEducation) {
	checkRef(
		'nationEducation',
		ne.nationId,
		'nationId',
		ne.nationId,
		nationIds,
		'nations',
	)
}

// ============================================================================
// 18. NationMilitary
// ============================================================================

console.log('▸ Vérification des NationMilitary...')

for (const nm of w.nationMilitary) {
	checkRef(
		'nationMilitary',
		nm.nationId,
		'nationId',
		nm.nationId,
		nationIds,
		'nations',
	)
}

// ============================================================================
// 19. NationWorldKnowledge
// ============================================================================

console.log('▸ Vérification des NationWorldKnowledge...')

for (const nwk of w.nationWorldKnowledge) {
	checkRef(
		'nationWorldKnowledge',
		nwk.nationId,
		'nationId',
		nwk.nationId,
		nationIds,
		'nations',
	)
	checkRefs(
		'nationWorldKnowledge',
		nwk.nationId,
		'knownNations',
		nwk.knownNations,
		nationIds,
		'nations',
	)
}

// ============================================================================
// 20. Populations
// ============================================================================

console.log('▸ Vérification des Populations...')

for (const p of w.populations) {
	checkRef(
		'population',
		p.nationId,
		'nationId',
		p.nationId,
		nationIds,
		'nations',
	)
}

// ============================================================================
// 21. DailyLife
// ============================================================================

console.log('▸ Vérification des DailyLife...')

for (const dl of w.dailyLife) {
	checkRef(
		'dailyLife',
		dl.nationId,
		'nationId',
		dl.nationId,
		nationIds,
		'nations',
	)
}

// ============================================================================
// 22. Infrastructure
// ============================================================================

console.log('▸ Vérification des Infrastructure...')

for (const inf of w.infrastructure) {
	checkRef(
		'infrastructure',
		inf.id,
		'nationId',
		inf.nationId,
		nationIds,
		'nations',
	)
}

// ============================================================================
// 23. SocialMobilityModifiers
// ============================================================================

console.log('▸ Vérification des SocialMobilityModifiers...')

for (const smm of w.socialMobilityModifiers) {
	checkRef(
		'socialMobilityModifier',
		smm.nationId,
		'nationId',
		smm.nationId,
		nationIds,
		'nations',
	)
}

// ============================================================================
// 24. Ecology
// ============================================================================

console.log('▸ Vérification des RegionEcology...')

for (const eco of w.ecology) {
	checkRef(
		'ecology',
		eco.regionId,
		'regionId',
		eco.regionId,
		climateRegionIds,
		'climateRegions',
	)
}

// ============================================================================
// 25. HistoricalEvents
// ============================================================================

console.log('▸ Vérification des HistoricalEvents...')

for (const evt of w.historicalEvents) {
	checkRefs(
		'historicalEvent',
		evt.id,
		'affectedNationIds',
		evt.affectedNationIds,
		nationIds,
		'nations',
	)
	checkRefs(
		'historicalEvent',
		evt.id,
		'affectedRegionIds',
		evt.affectedRegionIds,
		climateRegionIds,
		'climateRegions',
	)

	// triggerConditions
	const tc = evt.triggerConditions
	if (tc) {
		checkRefs(
			'historicalEvent',
			evt.id,
			'triggerConditions.requiredTechs',
			tc.requiredTechs,
			techIds,
			'technologies',
		)
		checkRefs(
			'historicalEvent',
			evt.id,
			'triggerConditions.requiredEventIds',
			tc.requiredEventIds,
			historicalEventIds,
			'historicalEvents',
		)
		checkRefs(
			'historicalEvent',
			evt.id,
			'triggerConditions.blockedByEventIds',
			tc.blockedByEventIds,
			historicalEventIds,
			'historicalEvents',
		)
		checkRefs(
			'historicalEvent',
			evt.id,
			'triggerConditions.requiredNationsExist',
			tc.requiredNationsExist,
			nationIds,
			'nations',
		)
		if (tc.requiredDiplomacy?.between) {
			checkRef(
				'historicalEvent',
				evt.id,
				'triggerConditions.requiredDiplomacy.between[0]',
				tc.requiredDiplomacy.between[0],
				nationIds,
				'nations',
			)
			checkRef(
				'historicalEvent',
				evt.id,
				'triggerConditions.requiredDiplomacy.between[1]',
				tc.requiredDiplomacy.between[1],
				nationIds,
				'nations',
			)
		}
	}

	// effects
	const eff = evt.effects
	if (eff) {
		checkRefs(
			'historicalEvent',
			evt.id,
			'effects.techUnlocks',
			eff.techUnlocks,
			techIds,
			'technologies',
		)
		checkRefs(
			'historicalEvent',
			evt.id,
			'effects.triggerEventIds',
			eff.triggerEventIds,
			historicalEventIds,
			'historicalEvents',
		)
		if (eff.newDiplomacy?.between) {
			checkRef(
				'historicalEvent',
				evt.id,
				'effects.newDiplomacy.between[0]',
				eff.newDiplomacy.between[0],
				nationIds,
				'nations',
			)
			checkRef(
				'historicalEvent',
				evt.id,
				'effects.newDiplomacy.between[1]',
				eff.newDiplomacy.between[1],
				nationIds,
				'nations',
			)
		}
		// nationMutations
		if (eff.nationMutations) {
			for (const nm of eff.nationMutations) {
				checkRef(
					'historicalEvent',
					evt.id,
					'effects.nationMutations[].nationId',
					nm.nationId,
					nationIds,
					'nations',
				)
				checkRef(
					'historicalEvent',
					evt.id,
					'effects.nationMutations[].changeCapital',
					(nm as any).changeCapital,
					settlementIds,
					'settlements',
				)
				checkRef(
					'historicalEvent',
					evt.id,
					'effects.nationMutations[].changeStateReligion',
					(nm as any).changeStateReligion,
					religionIds,
					'religions',
				)
				checkRef(
					'historicalEvent',
					evt.id,
					'effects.nationMutations[].removeReligion',
					(nm as any).removeReligion,
					religionIds,
					'religions',
				)
				checkRef(
					'historicalEvent',
					evt.id,
					'effects.nationMutations[].changeOfficialLanguage',
					(nm as any).changeOfficialLanguage,
					languageIds,
					'languages',
				)
				checkRef(
					'historicalEvent',
					evt.id,
					'effects.nationMutations[].removeLanguage',
					(nm as any).removeLanguage,
					languageIds,
					'languages',
				)
				checkRef(
					'historicalEvent',
					evt.id,
					'effects.nationMutations[].successorId',
					(nm as any).successorId,
					nationIds,
					'nations',
				)
				checkRef(
					'historicalEvent',
					evt.id,
					'effects.nationMutations[].absorbedBy',
					(nm as any).absorbedBy,
					nationIds,
					'nations',
				)
				if ((nm as any).cededTo) {
					checkRef(
						'historicalEvent',
						evt.id,
						'effects.nationMutations[].cededTo.nationId',
						(nm as any).cededTo.nationId,
						nationIds,
						'nations',
					)
				}
				if ((nm as any).gainedFrom) {
					checkRef(
						'historicalEvent',
						evt.id,
						'effects.nationMutations[].gainedFrom.nationId',
						(nm as any).gainedFrom.nationId,
						nationIds,
						'nations',
					)
				}
				// addReligion
				if ((nm as any).addReligion) {
					checkRef(
						'historicalEvent',
						evt.id,
						'effects.nationMutations[].addReligion.religionId',
						(nm as any).addReligion.religionId,
						religionIds,
						'religions',
					)
				}
				// addLanguage
				if ((nm as any).addLanguage) {
					checkRef(
						'historicalEvent',
						evt.id,
						'effects.nationMutations[].addLanguage.languageId',
						(nm as any).addLanguage.languageId,
						languageIds,
						'languages',
					)
				}
			}
		}
	}

	// gmOverrideOptions
	if (evt.gmOverrideOptions?.fallbackEventId) {
		checkRef(
			'historicalEvent',
			evt.id,
			'gmOverrideOptions.fallbackEventId',
			evt.gmOverrideOptions.fallbackEventId,
			historicalEventIds,
			'historicalEvents',
		)
	}
}

// ============================================================================
// 26. EventTemplates
// ============================================================================

console.log('▸ Vérification des EventTemplates...')

for (const tpl of w.eventTemplates) {
	const tc = tpl.triggerConditions
	if (tc) {
		checkRefs(
			'eventTemplate',
			tpl.id,
			'triggerConditions.requiredTechs',
			tc.requiredTechs,
			techIds,
			'technologies',
		)
		checkRefs(
			'eventTemplate',
			tpl.id,
			'triggerConditions.requiredActiveEvents',
			(tc as any).requiredActiveEvents,
			historicalEventIds,
			'historicalEvents',
		)
		checkRefs(
			'eventTemplate',
			tpl.id,
			'triggerConditions.requiredTemplateIds',
			(tc as any).requiredTemplateIds,
			eventTemplateIds,
			'eventTemplates',
		)
		checkRefs(
			'eventTemplate',
			tpl.id,
			'triggerConditions.requiredBiomes',
			(tc as any).requiredBiomes,
			climateRegionIds,
			'climateRegions',
		)
		checkRefs(
			'eventTemplate',
			tpl.id,
			'triggerConditions.excludedBiomes',
			(tc as any).excludedBiomes,
			climateRegionIds,
			'climateRegions',
		)
	}
	const eff = tpl.defaultEffects
	if (eff) {
		checkRefs(
			'eventTemplate',
			tpl.id,
			'defaultEffects.triggerTemplateIds',
			(eff as any).triggerTemplateIds,
			eventTemplateIds,
			'eventTemplates',
		)
		checkRefs(
			'eventTemplate',
			tpl.id,
			'defaultEffects.triggerHistoricalEventIds',
			(eff as any).triggerHistoricalEventIds,
			historicalEventIds,
			'historicalEvents',
		)
	}
}

// ============================================================================
// 27. InformationVectors
// ============================================================================

console.log('▸ Vérification des InformationVectors...')

for (const iv of w.informationVectors) {
	checkRefs(
		'informationVector',
		iv.id,
		'requiredTechs',
		iv.requiredTechs,
		techIds,
		'technologies',
	)
}

// ============================================================================
// 28. RumorTemplates
// ============================================================================

console.log('▸ Vérification des RumorTemplates...')

for (const rt of w.rumorTemplates) {
	checkRef(
		'rumorTemplate',
		rt.id,
		'sourceEventId',
		(rt as any).sourceEventId,
		historicalEventIds,
		'historicalEvents',
	)
	checkRef(
		'rumorTemplate',
		rt.id,
		'sourceTemplateId',
		(rt as any).sourceTemplateId,
		eventTemplateIds,
		'eventTemplates',
	)
}

// ============================================================================
// 29. AdvisorProfiles
// ============================================================================

console.log('▸ Vérification des AdvisorProfiles...')

for (const ap of w.advisorProfiles) {
	checkRefs(
		'advisorProfile',
		ap.id,
		'requiredTechs',
		ap.requiredTechs,
		techIds,
		'technologies',
	)
}

// ============================================================================
// 30. KnowledgeEntries
// ============================================================================

console.log('▸ Vérification des KnowledgeEntries...')

for (const ke of w.knowledgeEntries) {
	checkRefs(
		'knowledgeEntry',
		ke.id,
		'requiredTechs',
		ke.requiredTechs,
		techIds,
		'technologies',
	)
	checkRefs(
		'knowledgeEntry',
		ke.id,
		'prerequisiteKnowledge',
		ke.prerequisiteKnowledge,
		knowledgeEntryIds,
		'knowledgeEntries',
	)
	checkRefs(
		'knowledgeEntry',
		ke.id,
		'leadsToTechs',
		ke.leadsToTechs,
		techIds,
		'technologies',
	)
}

// ============================================================================
// 31. FeasibilityRules
// ============================================================================

console.log('▸ Vérification des FeasibilityRules...')

for (const fr of w.feasibilityRules) {
	checkRefs(
		'feasibilityRule',
		fr.id,
		'requiredTechs',
		fr.requiredTechs,
		techIds,
		'technologies',
	)
	checkRefs(
		'feasibilityRule',
		fr.id,
		'requiredKnowledge',
		fr.requiredKnowledge,
		knowledgeEntryIds,
		'knowledgeEntries',
	)
}

// ============================================================================
// 32. AdvisorResponseTemplates
// ============================================================================

console.log('▸ Vérification des AdvisorResponseTemplates...')

for (const art of w.advisorResponseTemplates) {
	if ((art as any).advisorProfileId) {
		checkRef(
			'advisorResponseTemplate',
			art.id,
			'advisorProfileId',
			(art as any).advisorProfileId,
			advisorProfileIds,
			'advisorProfiles',
		)
	}
}

// ============================================================================
// 33. CulturalNamePools
// ============================================================================

console.log('▸ Vérification des CulturalNamePools...')

for (const cnp of w.culturalNamePools) {
	checkRefs(
		'culturalNamePool',
		cnp.id,
		'nationIds',
		cnp.nationIds,
		nationIds,
		'nations',
	)
}

// ============================================================================
// 34. Couverture des nations dans les mapping tables
// ============================================================================

console.log('▸ Vérification de la couverture nation (73/73)...')

const mappingTables: [string, Set<string>][] = [
	['nationReligions', nationIdSet(w.nationReligions)],
	['nationTechnologies', nationIdSet(w.nationTechnologies)],
	['nationEconomies', nationIdSet(w.nationEconomies)],
	['nationLanguages', nationIdSet(w.nationLanguages)],
	['nationCultures', nationIdSet(w.nationCultures)],
	['nationHealth', nationIdSet(w.nationHealth)],
	['nationLaws', nationIdSet(w.nationLaws)],
	['nationEducation', nationIdSet(w.nationEducation)],
	['nationMilitary', nationIdSet(w.nationMilitary)],
	['nationWorldKnowledge', nationIdSet(w.nationWorldKnowledge)],
	['populations', nationIdSet(w.populations)],
	['socialMobilityModifiers', nationIdSet(w.socialMobilityModifiers)],
	['dailyLife', nationIdSet(w.dailyLife)],
]

for (const [name, nids] of mappingTables) {
	checkNationCoverage(name, nids, activeNationIds)
}

// Toutes les nations doivent être couvertes par au moins un CulturalNamePool
console.log('▸ Vérification couverture CulturalNamePools...')
const nationsInNamePools = new Set<string>()
for (const cnp of w.culturalNamePools) {
	for (const nid of cnp.nationIds) {
		nationsInNamePools.add(nid)
	}
}
for (const nid of activeNationIds) {
	stats.checks++
	if (nationsInNamePools.has(nid)) {
		stats.ok++
	} else {
		stats.warn++
		warnings.push(
			`[COUVERTURE] culturalNamePools ne couvre pas la nation "${nid}"`,
		)
	}
}

// Toutes les capitales de Nation doivent exister dans settlements
console.log(
	'▸ Vérification que chaque capital pointe vers un settlement existant...',
)
for (const n of w.nations) {
	if (n.startYear) continue // nation future — capitale non encore attribuée
	const settlement = w.settlements.find((s) => s.id === n.capital)
	if (settlement && settlement.nationId !== n.id) {
		stats.warn++
		warnings.push(
			`[COHÉRENCE] Nation "${n.id}" a pour capital "${n.capital}" mais ce settlement appartient à "${settlement.nationId}"`,
		)
	}
}

// ============================================================================
// 35. Techs non-débloquées par aucune nation mais requises
// ============================================================================

console.log('▸ Vérification des techs orphelines...')

const allUnlockedTechs = new Set<string>()
for (const nt of w.nationTechnologies) {
	for (const t of nt.unlockedTechs) {
		allUnlockedTechs.add(t)
	}
}

const allReferencedTechs = new Set<string>()
// Collect techs referenced as requirements
for (const v of w.transportVehicles)
	for (const t of v.requiredTechs) allReferencedTechs.add(t)
for (const cr of w.constructionRecipes)
	for (const t of cr.requiredTechs) allReferencedTechs.add(t)
for (const sm of w.socialMobilityPaths)
	for (const t of sm.requiredTechs) allReferencedTechs.add(t)
for (const iv of w.informationVectors)
	for (const t of iv.requiredTechs) allReferencedTechs.add(t)
for (const ap of w.advisorProfiles)
	for (const t of ap.requiredTechs) allReferencedTechs.add(t)
for (const ke of w.knowledgeEntries)
	for (const t of ke.requiredTechs) allReferencedTechs.add(t)
for (const fr of w.feasibilityRules)
	for (const t of fr.requiredTechs) allReferencedTechs.add(t)

const GAME_START_YEAR = 1000

const futureTechIds = new Set<string>(
	w.technologies
		.filter((t) => t.yearAvailable && t.yearAvailable > GAME_START_YEAR)
		.map((t) => t.id),
)

for (const refTech of allReferencedTechs) {
	if (!techIds.has(refTech)) continue // déjà signalé comme erreur
	if (futureTechIds.has(refTech)) continue // tech future, pas encore découvrable
	if (!allUnlockedTechs.has(refTech)) {
		stats.warn++
		warnings.push(
			`[TECH ORPHELINE] La tech "${refTech}" est requise par un dataset mais n'est débloquée par aucune nation`,
		)
	}
}

// ============================================================================
// RAPPORT FINAL
// ============================================================================

console.log()
console.log('='.repeat(72))
console.log('  RÉSULTATS')
console.log('='.repeat(72))
console.log()

// Statistiques des datasets
console.log('📊 Tailles des datasets :')
console.log(`   Nations ............... ${w.nations.length}`)
console.log(`   Settlements ........... ${w.settlements.length}`)
console.log(`   Religions ............. ${w.religions.length}`)
console.log(`   Technologies .......... ${w.technologies.length}`)
console.log(`   Commodities ........... ${w.commodities.length}`)
console.log(`   Languages ............. ${w.languages.length}`)
console.log(`   Diseases .............. ${w.diseases.length}`)
console.log(`   TradeRoutes ........... ${w.tradeRoutes.length}`)
console.log(`   ClimateRegions ........ ${w.climateRegions.length}`)
console.log(`   TransportVehicles ..... ${w.transportVehicles.length}`)
console.log(`   HistoricalEvents ...... ${w.historicalEvents.length}`)
console.log(`   EventTemplates ........ ${w.eventTemplates.length}`)
console.log(`   InformationVectors .... ${w.informationVectors.length}`)
console.log(`   RumorTemplates ........ ${w.rumorTemplates.length}`)
console.log(`   AdvisorProfiles ....... ${w.advisorProfiles.length}`)
console.log(`   KnowledgeEntries ...... ${w.knowledgeEntries.length}`)
console.log(`   FeasibilityRules ...... ${w.feasibilityRules.length}`)
console.log(`   ConstructionRecipes ... ${w.constructionRecipes.length}`)
console.log(`   SocialMobilityPaths ... ${w.socialMobilityPaths.length}`)
console.log(`   CulturalNamePools ..... ${w.culturalNamePools.length}`)
console.log(`   Infrastructure ........ ${w.infrastructure.length}`)
console.log(`   Ecology ............... ${w.ecology.length}`)
console.log(`   AdvisorResponseTpl .... ${w.advisorResponseTemplates.length}`)
console.log()

// Erreurs
if (issues.length > 0) {
	console.log(`❌ ERREURS (${issues.length}) — Références cassées :`)
	console.log()
	for (const iss of issues) {
		console.log(
			`   ${iss.dataset}[${iss.entityId}].${iss.field} → "${iss.refId}" introuvable dans ${iss.targetDataset}`,
		)
	}
	console.log()
}

// Warnings
if (warnings.length > 0) {
	console.log(`⚠️  AVERTISSEMENTS (${warnings.length}) :`)
	console.log()
	for (const w of warnings) {
		console.log(`   ${w}`)
	}
	console.log()
}

// Résumé
console.log('─'.repeat(72))
console.log(
	`  Vérifications : ${stats.checks} | ✅ OK : ${stats.ok} | ❌ Erreurs : ${stats.fail} | ⚠️  Avertissements : ${stats.warn}`,
)
console.log('─'.repeat(72))

if (stats.fail > 0) {
	process.exit(1)
} else {
	console.log()
	console.log('✅ Toutes les références croisées sont valides !')
	console.log()
}
