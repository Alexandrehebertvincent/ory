#!/usr/bin/env npx tsx
// ============================================================================
// Script de génération : /docs/GAME_ORIGINAL_DATASET.md
// Lit le WorldSnapshot an 1000 et produit un document Markdown organisé
// par strate géographique, avec table des matières navigable.
// ============================================================================

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { religions } from '../packages/historical-data/src/seed/religions'
import { technologies } from '../packages/historical-data/src/seed/technologies'
import { commodities } from '../packages/historical-data/src/seed/commodities'
import { tradeRoutes } from '../packages/historical-data/src/seed/tradeRoutes'
import { languages } from '../packages/historical-data/src/seed/languages'
import { diseases } from '../packages/historical-data/src/seed/diseases'
import { nations } from '../packages/historical-data/src/seed/nations'
import { settlements } from '../packages/historical-data/src/seed/settlements'
import { nationReligions } from '../packages/historical-data/src/seed/nationReligions'
import { nationTechnologies } from '../packages/historical-data/src/seed/nationTechnologies'
import { nationEconomies } from '../packages/historical-data/src/seed/nationEconomies'
import { nationLanguages } from '../packages/historical-data/src/seed/nationLanguages'
import { nationCultures } from '../packages/historical-data/src/seed/nationCultures'
import { nationHealthData } from '../packages/historical-data/src/seed/nationHealth'
import { nationLawsData } from '../packages/historical-data/src/seed/nationLaws'
import { nationEducationData } from '../packages/historical-data/src/seed/nationEducation'
import { nationMilitaryData } from '../packages/historical-data/src/seed/nationMilitary'
import { nationWorldKnowledgeData } from '../packages/historical-data/src/seed/nationWorldKnowledge'
import { populationsData } from '../packages/historical-data/src/seed/populations'
import { dailyLifeData } from '../packages/historical-data/src/seed/dailyLife'
import { infrastructureData } from '../packages/historical-data/src/seed/infrastructure'
import { climateRegions } from '../packages/historical-data/src/seed/climateRegions'
import { ecologyData } from '../packages/historical-data/src/seed/ecology'
import { historicalEvents } from '../packages/historical-data/src/seed/historicalEvents'
import { eventTemplates } from '../packages/historical-data/src/seed/eventTemplates'

import type {
	Nation,
	Settlement,
	ClimateRegion,
	RegionEcology,
	TradeRoute,
	NationReligion,
	NationTechnology,
	NationEconomy,
	NationLanguage,
	NationCulture,
	NationHealth,
	NationLaw,
	NationEducation,
	NationMilitary,
	NationWorldKnowledge,
	Population,
	DailyLife,
	Infrastructure,
	Religion,
	Technology,
	Commodity,
	Language,
	Disease,
	HistoricalEvent,
	EventTemplate,
} from '../packages/shared/src/types/world'

// ============================================================================
// Helpers
// ============================================================================

/** Transforme un ID en ancre markdown (github-compatible) */
function toAnchor(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^\w\s-àâäéèêëïîôùûüÿçæœ]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim()
}

/** Formatte un nombre avec séparateur de milliers */
function fmt(n: number): string {
	return n.toLocaleString('fr-FR')
}

/** Formatte un ratio en pourcentage */
function pct(r: number): string {
	return `${(r * 100).toFixed(1)} %`
}

/** Barre de niveau visuelle ■□ sur 10 */
function lvl(n: number): string {
	const filled = Math.round(n)
	return '■'.repeat(filled) + '□'.repeat(10 - filled) + ` (${n}/10)`
}

/** Lookup maps indexées par ID / nationId */
function indexBy<T extends { nationId: string }>(arr: T[]): Map<string, T> {
	const m = new Map<string, T>()
	for (const item of arr) m.set(item.nationId, item)
	return m
}

function indexByMulti<T extends { nationId: string }>(
	arr: T[],
): Map<string, T[]> {
	const m = new Map<string, T[]>()
	for (const item of arr) {
		const list = m.get(item.nationId) ?? []
		list.push(item)
		m.set(item.nationId, list)
	}
	return m
}

function indexById<T extends { id: string }>(arr: T[]): Map<string, T> {
	const m = new Map<string, T>()
	for (const item of arr) m.set(item.id, item)
	return m
}

// ============================================================================
// Lookup maps
// ============================================================================
const religionMap = indexById(religions)
const techMap = indexById(technologies)
const commodityMap = indexById(commodities)
const languageMap = indexById(languages)
const diseaseMap = indexById(diseases)
const settlementMap = indexById(settlements)

const relByNation = indexBy(nationReligions)
const techByNation = indexBy(nationTechnologies)
const ecoByNation = indexBy(nationEconomies)
const langByNation = indexBy(nationLanguages)
const cultByNation = indexBy(nationCultures)
const healthByNation = indexBy(nationHealthData)
const lawByNation = indexBy(nationLawsData)
const eduByNation = indexBy(nationEducationData)
const milByNation = indexBy(nationMilitaryData)
const wkByNation = indexBy(nationWorldKnowledgeData)
const popByNation = indexBy(populationsData)
const dailyByNation = indexByMulti(dailyLifeData)

const ecologyByRegion = new Map<string, RegionEcology>()
for (const e of ecologyData) ecologyByRegion.set(e.regionId, e)

const infraByNation = new Map<string, Infrastructure[]>()
for (const i of infrastructureData) {
	const list = infraByNation.get(i.nationId) ?? []
	list.push(i)
	infraByNation.set(i.nationId, list)
}

const settlementsByNation = new Map<string, Settlement[]>()
for (const s of settlements) {
	const list = settlementsByNation.get(s.nationId) ?? []
	list.push(s)
	settlementsByNation.set(s.nationId, list)
}

// ============================================================================
// Classification géographique des nations
// ============================================================================

interface GeoGroup {
	name: string
	climateRegionIds: string[]
	nationIds: string[]
}

/** Détermine le centre approximatif d'un territoire */
function centerOf(nation: Nation): { lat: number; lng: number } {
	const t = nation.territory
	if (!t || t.length === 0) return { lat: 0, lng: 0 }
	const avgLat = t.reduce((s, c) => s + c.lat, 0) / t.length
	const avgLng = t.reduce((s, c) => s + c.lng, 0) / t.length
	return { lat: avgLat, lng: avgLng }
}

/** Regroupe les nations par grande zone géographique */
function classifyNations(): GeoGroup[] {
	const groups: GeoGroup[] = [
		{
			name: 'Europe occidentale',
			climateRegionIds: ['clim_temperate_europe', 'clim_atlantic_europe'],
			nationIds: [],
		},
		{
			name: 'Europe méditerranéenne',
			climateRegionIds: ['clim_mediterranean', 'clim_iberian_mediterranean'],
			nationIds: [],
		},
		{
			name: 'Europe du Nord & Scandinavie',
			climateRegionIds: [
				'clim_subarctic',
				'clim_scandinavian_subarctic',
				'clim_subarctic_canada',
			],
			nationIds: [],
		},
		{
			name: 'Europe orientale',
			climateRegionIds: ['clim_continental_europe', 'clim_pontic_steppe'],
			nationIds: [],
		},
		{
			name: 'Monde islamique — Moyen-Orient & Asie centrale',
			climateRegionIds: [
				'clim_arid_middle_east',
				'clim_central_asian_steppe',
				'clim_caucasus',
			],
			nationIds: [],
		},
		{
			name: 'Afrique du Nord & Sahara',
			climateRegionIds: [
				'clim_saharan',
				'clim_nile_valley',
				'clim_central_sahara',
			],
			nationIds: [],
		},
		{
			name: 'Afrique subsaharienne',
			climateRegionIds: [
				'clim_sahel',
				'clim_tropical_west_africa',
				'clim_east_african_highland',
				'clim_east_african_coast',
				'clim_congo_rainforest',
				'clim_kalahari',
				'clim_madagascar',
			],
			nationIds: [],
		},
		{
			name: "Asie de l'Est",
			climateRegionIds: [
				'clim_temperate_east_asia',
				'clim_monsoon_china',
				'clim_hokkaido_temperate',
			],
			nationIds: [],
		},
		{
			name: 'Asie du Sud (Inde)',
			climateRegionIds: ['clim_monsoon_india', 'clim_tropical_india'],
			nationIds: [],
		},
		{
			name: 'Asie du Sud-Est',
			climateRegionIds: [
				'clim_tropical_southeast_asia',
				'clim_new_guinea_tropical',
			],
			nationIds: [],
		},
		{
			name: 'Asie centrale & Sibérie',
			climateRegionIds: [
				'clim_highland_tibet',
				'clim_siberian_taiga',
				'clim_chukotka_tundra',
			],
			nationIds: [],
		},
		{
			name: 'Amériques — Mésoamérique & Amérique du Nord',
			climateRegionIds: [
				'clim_tropical_mesoamerica',
				'clim_arid_north_america',
				'clim_temperate_north_america',
				'clim_northeast_america_temperate',
				'clim_pacific_northwest',
				'clim_arctic',
			],
			nationIds: [],
		},
		{
			name: 'Amériques — Amérique du Sud',
			climateRegionIds: [
				'clim_andean_highland',
				'clim_amazonian',
				'clim_peruvian_coastal',
				'clim_colombian_highland',
				'clim_south_american_subtropical',
			],
			nationIds: [],
		},
		{
			name: 'Océanie & Pacifique',
			climateRegionIds: [
				'clim_oceanic_pacific',
				'clim_australian_arid',
				'clim_hawaiian_tropical',
				'clim_fijian_tropical',
				'clim_mariana_tropical',
			],
			nationIds: [],
		},
		{
			name: 'Atlantique (Îles)',
			climateRegionIds: ['clim_canary_subtropical'],
			nationIds: [],
		},
	]

	// Index: pour chaque climate region, calculer la bounding box center
	const climCenterMap = new Map<string, { lat: number; lng: number }>()
	for (const cr of climateRegions) {
		const avgLat = cr.area.reduce((s, c) => s + c.lat, 0) / cr.area.length
		const avgLng = cr.area.reduce((s, c) => s + c.lng, 0) / cr.area.length
		climCenterMap.set(cr.id, { lat: avgLat, lng: avgLng })
	}

	// Map climate region ids -> group index
	const crToGroup = new Map<string, number>()
	for (let gi = 0; gi < groups.length; gi++) {
		for (const crId of groups[gi].climateRegionIds) {
			crToGroup.set(crId, gi)
		}
	}

	// Assign each nation to closest climateRegion group
	for (const n of nations) {
		const center = centerOf(n)
		let bestGroup = 0
		let bestDist = Infinity

		for (let gi = 0; gi < groups.length; gi++) {
			for (const crId of groups[gi].climateRegionIds) {
				const cc = climCenterMap.get(crId)
				if (!cc) continue
				const dist = (center.lat - cc.lat) ** 2 + (center.lng - cc.lng) ** 2
				if (dist < bestDist) {
					bestDist = dist
					bestGroup = gi
				}
			}
		}

		groups[bestGroup].nationIds.push(n.id)
	}

	// Filter empty groups
	return groups.filter((g) => g.nationIds.length > 0)
}

// ============================================================================
// Markdown section renderers
// ============================================================================

function renderNationSection(n: Nation): string {
	const lines: string[] = []
	const cap = settlementMap.get(n.capital)

	lines.push(`#### ${n.name}`)
	lines.push('')
	lines.push(`| Champ | Valeur |`)
	lines.push(`|---|---|`)
	lines.push(`| **ID** | \`${n.id}\` |`)
	lines.push(`| **Gentilé** | ${n.dempinym} |`)
	lines.push(`| **Gouvernance** | ${n.governance} |`)
	lines.push(
		`| **Capitale** | ${cap ? `${cap.name} (\`${cap.id}\`)` : n.capital} |`,
	)
	lines.push(
		`| **Dirigeant** | ${n.ruler.name} (${n.ruler.dynastyName}), né en ${n.ruler.birthYear}, ${n.ruler.age} ans |`,
	)
	lines.push(
		`| **Traits du dirigeant** | ${n.ruler.traits.join(', ') || '—'} |`,
	)
	lines.push(`| **Stabilité** | ${lvl(n.stability)} |`)
	lines.push(`| **Prestige** | ${lvl(n.prestige)} |`)
	if (n.vassalOf) lines.push(`| **Vassal de** | \`${n.vassalOf}\` |`)
	lines.push(`| **Couleur carte** | \`${n.color}\` |`)
	lines.push('')

	// Diplomacy
	if (n.diplomacy.length > 0) {
		lines.push(
			`<details><summary>Diplomatie (${n.diplomacy.length} relations)</summary>`,
		)
		lines.push('')
		lines.push(`| Cible | Type | Force |`)
		lines.push(`|---|---|---|`)
		for (const d of n.diplomacy) {
			lines.push(`| \`${d.targetNationId}\` | ${d.type} | ${d.strength}/10 |`)
		}
		lines.push('')
		lines.push(`</details>`)
		lines.push('')
	}

	// Settlements
	const natSettlements = settlementsByNation.get(n.id) ?? []
	if (natSettlements.length > 0) {
		lines.push(
			`<details><summary>Établissements (${natSettlements.length})</summary>`,
		)
		lines.push('')
		lines.push(`| Ville | Type | Pop. | Défense | Richesse | Spécialisations |`)
		lines.push(`|---|---|---:|---|---|---|`)
		for (const s of natSettlements.sort(
			(a, b) => b.population - a.population,
		)) {
			lines.push(
				`| ${s.name} | ${s.type} | ${fmt(s.population)} | ${s.defenseLevel}/10 | ${s.wealthLevel}/10 | ${s.specializations.join(', ')} |`,
			)
		}
		lines.push('')
		lines.push(`</details>`)
		lines.push('')
	}

	// Population
	const pop = popByNation.get(n.id)
	if (pop) {
		lines.push(`<details><summary>Population</summary>`)
		lines.push('')
		lines.push(`| Champ | Valeur |`)
		lines.push(`|---|---|`)
		lines.push(`| **Population totale** | ${fmt(pop.total)} |`)
		lines.push(`| **Taux d'urbanisation** | ${pct(pop.urbanRatio)} |`)
		lines.push(`| **Espérance de vie** | ${pop.lifeExpectancy} ans |`)
		lines.push(`| **Mortalité infantile** | ${pct(pop.infantMortality)} |`)
		lines.push(
			`| **Natalité / Mortalité** | ${pct(pop.birthRate)} / ${pct(pop.deathRate)} |`,
		)
		lines.push(`| **Croissance** | ${pct(pop.growthRate)} |`)
		if (pop.socialGroups.length > 0) {
			lines.push('')
			lines.push(`**Groupes sociaux :**`)
			lines.push('')
			lines.push(`| Classe | % | Influence | Richesse |`)
			lines.push(`|---|---:|---|---|`)
			for (const sg of pop.socialGroups.sort(
				(a, b) => b.percentage - a.percentage,
			)) {
				lines.push(
					`| ${sg.class} | ${pct(sg.percentage)} | ${sg.influence}/10 | ${sg.wealth}/10 |`,
				)
			}
		}
		lines.push('')
		lines.push(`</details>`)
		lines.push('')
	}

	// Religion
	const rel = relByNation.get(n.id)
	if (rel) {
		lines.push(`<details><summary>Religion</summary>`)
		lines.push('')
		const stateRel = rel.stateReligionId
			? religionMap.get(rel.stateReligionId)
			: null
		if (stateRel) {
			lines.push(`**Religion d'État :** ${stateRel.name} (\`${stateRel.id}\`)`)
		}
		lines.push(`**Tension religieuse :** ${lvl(rel.religiousTension)}`)
		lines.push('')
		lines.push(`| Religion | % | Statut |`)
		lines.push(`|---|---:|---|`)
		for (const r of rel.religions.sort((a, b) => b.percentage - a.percentage)) {
			const rObj = religionMap.get(r.religionId)
			lines.push(
				`| ${rObj?.name ?? r.religionId} | ${pct(r.percentage)} | ${r.status} |`,
			)
		}
		lines.push('')
		lines.push(`</details>`)
		lines.push('')
	}

	// Language
	const lang = langByNation.get(n.id)
	if (lang) {
		lines.push(`<details><summary>Langues</summary>`)
		lines.push('')
		const offLang = languageMap.get(lang.officialLanguageId)
		lines.push(
			`**Langue officielle :** ${offLang?.name ?? lang.officialLanguageId}`,
		)
		lines.push(`**Taux d'alphabétisation :** ${pct(lang.literacyRate)}`)
		lines.push('')
		lines.push(`| Langue | % |`)
		lines.push(`|---|---:|`)
		for (const sl of lang.spokenLanguages.sort(
			(a, b) => b.percentage - a.percentage,
		)) {
			const lObj = languageMap.get(sl.languageId)
			lines.push(`| ${lObj?.name ?? sl.languageId} | ${pct(sl.percentage)} |`)
		}
		lines.push('')
		lines.push(`</details>`)
		lines.push('')
	}

	// Economy
	const eco = ecoByNation.get(n.id)
	if (eco) {
		lines.push(`<details><summary>Économie</summary>`)
		lines.push('')
		lines.push(`| Champ | Valeur |`)
		lines.push(`|---|---|`)
		lines.push(
			`| **Monnaie** | ${eco.currency ?? 'Troc'} (valeur relative : ${eco.currencyValue}) |`,
		)
		lines.push(`| **PIB estimé** | ${eco.gdpEstimate} |`)
		lines.push(`| **Taux d'imposition** | ${pct(eco.taxRate)} |`)
		lines.push(
			`| **Balance commerciale** | ${eco.tradeBalance > 0 ? '+' : ''}${eco.tradeBalance} |`,
		)
		lines.push(
			`| **Exports** | ${eco.mainExports.map((id) => commodityMap.get(id)?.name ?? id).join(', ')} |`,
		)
		lines.push(
			`| **Imports** | ${eco.mainImports.map((id) => commodityMap.get(id)?.name ?? id).join(', ')} |`,
		)
		lines.push(
			`| **Routes commerciales** | ${eco.tradeRouteAccess
				.map((id) => {
					const tr = tradeRoutes.find((t) => t.id === id)
					return tr?.name ?? id
				})
				.join(', ')} |`,
		)
		if (eco.marketPrices.length > 0) {
			lines.push('')
			lines.push(`**Prix du marché local :**`)
			lines.push('')
			lines.push(`| Commodité | Prix local |`)
			lines.push(`|---|---:|`)
			for (const mp of eco.marketPrices) {
				lines.push(
					`| ${commodityMap.get(mp.commodityId)?.name ?? mp.commodityId} | ${mp.price} |`,
				)
			}
		}
		lines.push('')
		lines.push(`</details>`)
		lines.push('')
	}

	// Technology
	const tech = techByNation.get(n.id)
	if (tech) {
		lines.push(
			`<details><summary>Technologie (${tech.unlockedTechs.length} acquises)</summary>`,
		)
		lines.push('')
		lines.push(`**Capacité d'innovation :** ${lvl(tech.innovationCapacity)}`)
		lines.push('')
		// Group by category
		const byCategory = new Map<string, string[]>()
		for (const tid of tech.unlockedTechs) {
			const t = techMap.get(tid)
			const cat = t?.category ?? 'autre'
			const list = byCategory.get(cat) ?? []
			list.push(t?.name ?? tid)
			byCategory.set(cat, list)
		}
		for (const [cat, names] of [...byCategory.entries()].sort((a, b) =>
			a[0].localeCompare(b[0]),
		)) {
			lines.push(`- **${cat}** : ${names.join(', ')}`)
		}
		if (tech.researchProgress.length > 0) {
			lines.push('')
			lines.push(`**Recherches en cours :**`)
			for (const rp of tech.researchProgress) {
				const t = techMap.get(rp.techId)
				lines.push(`- ${t?.name ?? rp.techId} — ${pct(rp.progress)}`)
			}
		}
		lines.push('')
		lines.push(`</details>`)
		lines.push('')
	}

	// Culture
	const cult = cultByNation.get(n.id)
	if (cult) {
		lines.push(`<details><summary>Culture</summary>`)
		lines.push('')
		lines.push(`| Champ | Valeur |`)
		lines.push(`|---|---|`)
		lines.push(`| **Style architectural** | ${cult.architecturalStyle} |`)
		lines.push(`| **Traits culturels** | ${cult.culturalTraits.join(', ')} |`)
		lines.push(`| **Festivals** | ${cult.festivals.join(', ')} |`)
		lines.push(`| **Formes d'art** | ${cult.artForms.join(', ')} |`)
		lines.push(`| **Cuisine** | ${cult.cuisineStaples.join(', ')} |`)
		lines.push(`| **Vêtements** | ${cult.clothing.join(', ')} |`)
		lines.push(`| **Coutumes** | ${cult.socialCustoms.join(', ')} |`)
		lines.push(`| **Prestige culturel** | ${lvl(cult.culturalPrestige)} |`)
		lines.push('')
		lines.push(`</details>`)
		lines.push('')
	}

	// Military
	const mil = milByNation.get(n.id)
	if (mil) {
		lines.push(`<details><summary>Militaire</summary>`)
		lines.push('')
		lines.push(`| Champ | Valeur |`)
		lines.push(`|---|---|`)
		lines.push(`| **Effectifs** | ${fmt(mil.armySize)} |`)
		lines.push(`| **Unités disponibles** | ${mil.availableUnits.join(', ')} |`)
		lines.push(`| **Force militaire** | ${lvl(mil.militaryStrength)} |`)
		lines.push(`| **Force navale** | ${lvl(mil.navalStrength)} |`)
		lines.push(`| **Fortifications** | ${mil.fortificationCount} |`)
		lines.push(`| **Expérience de guerre** | ${lvl(mil.warExperience)} |`)
		lines.push(`| **Moral** | ${lvl(mil.morale)} |`)
		lines.push(
			`| **Armée professionnelle** | ${mil.professionalArmy ? 'Oui' : 'Non'} |`,
		)
		lines.push('')
		lines.push(`</details>`)
		lines.push('')
	}

	// Health
	const health = healthByNation.get(n.id)
	if (health) {
		lines.push(`<details><summary>Santé</summary>`)
		lines.push('')
		lines.push(`| Champ | Valeur |`)
		lines.push(`|---|---|`)
		lines.push(
			`| **Connaissances médicales** | ${lvl(health.medicalKnowledge)} |`,
		)
		lines.push(`| **Hygiène** | ${lvl(health.sanitation)} |`)
		lines.push(`| **Risque de famine** | ${lvl(health.faminRisk)} |`)
		lines.push(`| **Santé globale** | ${lvl(health.overallHealth)} |`)
		if (health.activeDiseases.length > 0) {
			lines.push('')
			lines.push(`**Maladies actives :**`)
			lines.push('')
			lines.push(`| Maladie | Prévalence |`)
			lines.push(`|---|---:|`)
			for (const ad of health.activeDiseases) {
				const d = diseaseMap.get(ad.diseaseId)
				lines.push(`| ${d?.name ?? ad.diseaseId} | ${pct(ad.prevalence)} |`)
			}
		}
		lines.push('')
		lines.push(`</details>`)
		lines.push('')
	}

	// Law
	const law = lawByNation.get(n.id)
	if (law) {
		lines.push(`<details><summary>Droit & Justice</summary>`)
		lines.push('')
		lines.push(`| Champ | Valeur |`)
		lines.push(`|---|---|`)
		lines.push(`| **Système juridique** | ${law.legalSystem} |`)
		lines.push(`| **Droits de propriété** | ${lvl(law.propertyRights)} |`)
		lines.push(`| **Liberté individuelle** | ${lvl(law.personalFreedom)} |`)
		lines.push(`| **Égalité des genres** | ${lvl(law.genderEquality)} |`)
		lines.push(`| **Esclavage** | ${law.slaveryStatus} |`)
		lines.push(
			`| **Indépendance judiciaire** | ${lvl(law.judicialIndependence)} |`,
		)
		lines.push(`| **Criminalité** | ${lvl(law.crimeRate)} |`)
		lines.push(`| **Crimes courants** | ${law.commonCrimes.join(', ')} |`)
		lines.push(`| **Sanctions** | ${law.punishments.join(', ')} |`)
		lines.push(`| **Application de la loi** | ${lvl(law.lawEnforcement)} |`)
		lines.push('')
		lines.push(`</details>`)
		lines.push('')
	}

	// Education
	const edu = eduByNation.get(n.id)
	if (edu) {
		lines.push(`<details><summary>Éducation</summary>`)
		lines.push('')
		lines.push(`| Champ | Valeur |`)
		lines.push(`|---|---|`)
		lines.push(`| **Institutions** | ${edu.institutions.join(', ')} |`)
		lines.push(`| **Pop. lettrée** | ${pct(edu.scholarPopulation)} |`)
		lines.push(`| **Domaines de savoir** | ${edu.knowledgeAreas.join(', ')} |`)
		lines.push(`| **Bibliothèques** | ${edu.libraryCount} |`)
		lines.push(`| **Accès à l'éducation** | ${lvl(edu.educationAccess)} |`)
		lines.push('')
		lines.push(`</details>`)
		lines.push('')
	}

	// World Knowledge
	const wk = wkByNation.get(n.id)
	if (wk) {
		lines.push(`<details><summary>Connaissance du monde</summary>`)
		lines.push('')
		lines.push(`| Champ | Valeur |`)
		lines.push(`|---|---|`)
		lines.push(`| **Régions connues** | ${wk.knownRegions.length} zones |`)
		lines.push(
			`| **Capacité d'exploration** | ${lvl(wk.explorationCapacity)} |`,
		)
		lines.push(`| **Portée navale** | ${lvl(wk.navalRange)} |`)
		lines.push(`| **Cartographie** | ${lvl(wk.cartographyLevel)} |`)
		lines.push(
			`| **Nations connues** | ${wk.knownNations.length} (${wk.knownNations
				.map((id) => {
					const nn = nations.find((nn) => nn.id === id)
					return nn?.name ?? id
				})
				.join(', ')}) |`,
		)
		if (wk.myths.length > 0) {
			lines.push(`| **Mythes** | ${wk.myths.join(' · ')} |`)
		}
		lines.push('')
		lines.push(`</details>`)
		lines.push('')
	}

	// Daily Life
	const dailyList = dailyByNation.get(n.id) ?? []
	if (dailyList.length > 0) {
		lines.push(
			`<details><summary>Vie quotidienne (${dailyList.length} classes)</summary>`,
		)
		lines.push('')
		for (const dl of dailyList) {
			lines.push(
				`**${dl.socialClass}** (qualité de vie : ${dl.qualityOfLife}/10)`,
			)
			lines.push('')
			lines.push(`| Champ | Valeur |`)
			lines.push(`|---|---|`)
			lines.push(`| Régime | ${dl.typicalDiet.join(', ')} |`)
			lines.push(`| Logement | ${dl.housing} |`)
			lines.push(`| Vêtements | ${dl.clothing} |`)
			lines.push(`| Travail | ${dl.workType} |`)
			lines.push(`| Loisirs | ${dl.leisureActivities.join(', ')} |`)
			lines.push(`| Revenu moyen | ${dl.averageIncome} |`)
			lines.push('')
		}
		lines.push(`</details>`)
		lines.push('')
	}

	// Infrastructure
	const infra = infraByNation.get(n.id) ?? []
	if (infra.length > 0) {
		lines.push(`<details><summary>Infrastructure (${infra.length})</summary>`)
		lines.push('')
		lines.push(`| Nom | Type | État | Importance |`)
		lines.push(`|---|---|---|---|`)
		for (const i of infra) {
			lines.push(
				`| ${i.name} | ${i.type} | ${i.condition}/10 | ${i.strategicValue}/10 |`,
			)
		}
		lines.push('')
		lines.push(`</details>`)
		lines.push('')
	}

	lines.push('---')
	lines.push('')
	return lines.join('\n')
}

function renderClimateRegion(cr: ClimateRegion): string {
	const lines: string[] = []
	const eco = ecologyByRegion.get(cr.id)

	lines.push(`| Champ | Valeur |`)
	lines.push(`|---|---|`)
	lines.push(`| **ID** | \`${cr.id}\` |`)
	lines.push(`| **Zone climatique** | ${cr.zone} |`)
	lines.push(`| **Temp. moyenne** | ${cr.avgTemperature} °C |`)
	lines.push(`| **Précipitations** | ${fmt(cr.avgRainfall)} mm/an |`)
	lines.push(`| **Saisonnalité** | ${lvl(cr.seasonality)} |`)

	if (cr.disasterRisks.length > 0) {
		lines.push('')
		lines.push(`**Risques naturels :**`)
		lines.push('')
		lines.push(`| Type | Probabilité | Sévérité |`)
		lines.push(`|---|---:|---|`)
		for (const dr of cr.disasterRisks) {
			lines.push(`| ${dr.type} | ${pct(dr.probability)} | ${dr.severity}/10 |`)
		}
	}

	if (eco) {
		lines.push('')
		lines.push(`**Écologie :**`)
		lines.push('')
		lines.push(`| Champ | Valeur |`)
		lines.push(`|---|---|`)
		lines.push(`| **Couverture forestière** | ${pct(eco.forestCoverage)} |`)
		lines.push(`| **Biodiversité** | ${lvl(eco.biodiversity)} |`)
		lines.push(`| **Impact humain** | ${lvl(eco.humanImpact)} |`)
		lines.push(`| **Flore dominante** | ${eco.dominantFlora.join(', ')} |`)
		lines.push(`| **Faune dominante** | ${eco.dominantFauna.join(', ')} |`)
		lines.push(
			`| **Animaux domestiqués** | ${eco.domesticatedAnimals.join(', ')} |`,
		)
		lines.push(
			`| **Plantes domestiquées** | ${eco.domesticatedPlants.join(', ')} |`,
		)
	}

	lines.push('')
	return lines.join('\n')
}

// ============================================================================
// Main — Build the document
// ============================================================================

function buildDocument(): string {
	const geoGroups = classifyNations()
	const out: string[] = []

	// Header
	out.push(`# 🌍 ORY — Jeu de données original (An 1000)`)
	out.push('')
	out.push(
		`> Document auto-généré le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} à partir des données seed.`,
	)
	out.push('')
	out.push(`---`)
	out.push('')

	// Stats résumé
	out.push(`## Résumé statistique`)
	out.push('')
	out.push(`| Entité | Nombre |`)
	out.push(`|---|---:|`)
	out.push(`| Nations | ${nations.length} |`)
	out.push(`| Établissements | ${settlements.length} |`)
	out.push(`| Religions | ${religions.length} |`)
	out.push(`| Langues | ${languages.length} |`)
	out.push(`| Technologies | ${technologies.length} |`)
	out.push(`| Commodités | ${commodities.length} |`)
	out.push(`| Routes commerciales | ${tradeRoutes.length} |`)
	out.push(`| Maladies | ${diseases.length} |`)
	out.push(`| Régions climatiques | ${climateRegions.length} |`)
	out.push(`| Zones écologiques | ${ecologyData.length} |`)
	out.push(`| Infrastructures | ${infrastructureData.length} |`)
	out.push(`| Événements historiques | ${historicalEvents.length} |`)
	out.push(`| Modèles d'événements locaux | ${eventTemplates.length} |`)
	out.push(
		`| Population mondiale totale | ${fmt(populationsData.reduce((s, p) => s + p.total, 0))} |`,
	)
	out.push('')
	out.push(`---`)
	out.push('')

	// ========================================================================
	// Table des matières
	// ========================================================================
	out.push(`## Table des matières`)
	out.push('')
	out.push(`- [Résumé statistique](#résumé-statistique)`)
	out.push(`- [Référentiels globaux](#référentiels-globaux)`)
	out.push(`  - [Religions](#religions)`)
	out.push(`  - [Langues](#langues)`)
	out.push(`  - [Technologies](#technologies)`)
	out.push(`  - [Commodités](#commodités)`)
	out.push(`  - [Routes commerciales](#routes-commerciales)`)
	out.push(`  - [Maladies](#maladies)`)
	out.push(`  - [Événements historiques](#événements-historiques)`)
	out.push(`  - [Modèles d'événements locaux](#modèles-dévénements-locaux)`)

	for (const group of geoGroups) {
		const anchor = toAnchor(group.name)
		out.push(`- [${group.name}](#${anchor})`)

		// Sub-items: climate regions
		const regionIds = group.climateRegionIds.filter((id) =>
			climateRegions.some((cr) => cr.id === id),
		)
		if (regionIds.length > 0) {
			out.push(
				`  - [Climat & Écologie](#climat--écologie${regionIds.length > 1 ? `-${anchor}` : ''})`,
			)
		}

		// Sub-items: nations
		for (const nid of group.nationIds) {
			const nat = nations.find((nn) => nn.id === nid)
			if (nat) {
				const natAnchor = toAnchor(nat.name)
				out.push(`  - [${nat.name}](#${natAnchor})`)
			}
		}
	}
	out.push('')
	out.push(`---`)
	out.push('')

	// ========================================================================
	// Global references
	// ========================================================================
	out.push(`## Référentiels globaux`)
	out.push('')

	// Religions
	out.push(`### Religions`)
	out.push('')
	out.push(
		`| ID | Nom | Famille | Ville sainte | Organisation | Prosélytisme | Influence pol. |`,
	)
	out.push(`|---|---|---|---|---|---|---|`)
	for (const r of religions.sort((a, b) => a.family.localeCompare(b.family))) {
		const holy = r.holyCity
			? (settlementMap.get(r.holyCity)?.name ?? r.holyCity)
			: '—'
		out.push(
			`| \`${r.id}\` | ${r.name} | ${r.family} | ${holy} | ${r.organizationLevel}/10 | ${r.proselytism}/10 | ${r.politicalInfluence}/10 |`,
		)
	}
	out.push('')

	// Languages
	out.push(`### Langues`)
	out.push('')
	out.push(`| ID | Nom | Famille | Écriture | Locuteurs | Lingua franca |`)
	out.push(`|---|---|---|---|---:|---|`)
	for (const l of languages.sort((a, b) => a.family.localeCompare(b.family))) {
		out.push(
			`| \`${l.id}\` | ${l.name} | ${l.family} | ${l.script} | ${fmt(l.speakerCount)} | ${l.isLingua_franca ? '✅' : ''} |`,
		)
	}
	out.push('')

	// Technologies
	out.push(`### Technologies`)
	out.push('')
	out.push(`| ID | Nom | Catégorie | Complexité | Prérequis |`)
	out.push(`|---|---|---|---|---|`)
	for (const t of technologies.sort((a, b) =>
		a.category.localeCompare(b.category),
	)) {
		const prereqs = t.prerequisites
			.map((pid) => techMap.get(pid)?.name ?? pid)
			.join(', ')
		out.push(
			`| \`${t.id}\` | ${t.name} | ${t.category} | ${t.complexity}/10 | ${prereqs || '—'} |`,
		)
	}
	out.push('')

	// Commodités
	out.push(`### Commodités`)
	out.push('')
	out.push(`| ID | Nom | Catégorie | Valeur | Poids | Périssable |`)
	out.push(`|---|---|---|---:|---:|---|`)
	for (const c of commodities.sort((a, b) =>
		a.category.localeCompare(b.category),
	)) {
		out.push(
			`| \`${c.id}\` | ${c.name} | ${c.category} | ${c.baseValue} | ${c.weight} | ${c.perishable ? '⚠️ Oui' : 'Non'} |`,
		)
	}
	out.push('')

	// Trade routes
	out.push(`### Routes commerciales`)
	out.push('')
	out.push(`| ID | Nom | Type | Nations reliées | Danger | Importance |`)
	out.push(`|---|---|---|---|---|---|`)
	for (const tr of tradeRoutes) {
		const natNames = tr.connectsNations
			.map((id) => nations.find((n) => n.id === id)?.name ?? id)
			.join(', ')
		out.push(
			`| \`${tr.id}\` | ${tr.name} | ${tr.type} | ${natNames} | ${tr.danger}/10 | ${tr.importance}/10 |`,
		)
	}
	out.push('')

	// Diseases
	out.push(`### Maladies`)
	out.push('')
	out.push(
		`| ID | Nom | Type | Mortalité | Transmission | Régions endémiques |`,
	)
	out.push(`|---|---|---|---:|---|---|`)
	for (const d of diseases) {
		const regions = d.endemicRegions
			.map((id) => {
				const cr = climateRegions.find((c) => c.id === id)
				return cr?.zone ?? id
			})
			.join(', ')
		out.push(
			`| \`${d.id}\` | ${d.name} | ${d.type} | ${pct(d.mortality)} | ${d.transmissionMode} | ${regions} |`,
		)
	}
	out.push('')
	out.push(`---`)
	out.push('')

	// Historical Events
	out.push(`### Événements historiques`)
	out.push('')
	out.push(
		`${historicalEvents.length} événements couvrant la période 1000–1200. Ces milestones sont connus du MJ et servent de trame narrative adaptable.`,
	)
	out.push('')
	out.push(
		`| Année | Nom | Type | Catégorie | Sévérité | Nations affectées | Prérequis | Déclenche |`,
	)
	out.push(`|---:|---|---|---|---:|---|---|---|`)
	for (const evt of [...historicalEvents].sort((a, b) => a.year - b.year)) {
		const natNames = evt.affectedNationIds
			.map((id) => nations.find((n) => n.id === id)?.name ?? id)
			.join(', ')
		const prereqs =
			(evt.triggerConditions.requiredEventIds ?? [])
				.map((id) => historicalEvents.find((e) => e.id === id)?.name ?? id)
				.join(', ') || '—'
		const triggers =
			(evt.effects.triggerEventIds ?? [])
				.map((id) => historicalEvents.find((e) => e.id === id)?.name ?? id)
				.join(', ') || '—'
		out.push(
			`| ${evt.year} | **${evt.name}** | ${evt.type} | ${evt.category} | ${evt.severity}/10 | ${natNames || 'Global'} | ${prereqs} | ${triggers} |`,
		)
	}
	out.push('')

	// Event details
	for (const evt of [...historicalEvents].sort((a, b) => a.year - b.year)) {
		out.push(`#### ${evt.name} (${evt.year})`)
		out.push('')
		out.push(`> ${evt.description}`)
		out.push('')
		out.push(`- **Type** : ${evt.type} / ${evt.category}`)
		out.push(`- **Fenêtre** : ${evt.yearRange[0]}–${evt.yearRange[1]}`)
		out.push(`- **Sévérité** : ${evt.severity}/10`)
		out.push(`- **Visibilité** : ${evt.visibility}`)
		out.push(`- **Global** : ${evt.globalEvent ? 'Oui' : 'Non'}`)
		if (evt.affectedNationIds.length > 0) {
			const names = evt.affectedNationIds
				.map((id) => nations.find((n) => n.id === id)?.name ?? id)
				.join(', ')
			out.push(`- **Nations** : ${names}`)
		}
		if (evt.triggerConditions.requiredEventIds?.length) {
			const names = evt.triggerConditions.requiredEventIds
				.map((id) => historicalEvents.find((e) => e.id === id)?.name ?? id)
				.join(', ')
			out.push(`- **Prérequis** : ${names}`)
		}
		if (evt.effects.triggerEventIds?.length) {
			const names = evt.effects.triggerEventIds
				.map((id) => historicalEvents.find((e) => e.id === id)?.name ?? id)
				.join(', ')
			out.push(`- **Déclenche** : ${names}`)
		}
		if (evt.playerChoices.length > 0) {
			out.push(`- **Choix joueurs** :`)
			for (const c of evt.playerChoices) {
				out.push(`  - *${c.label}* — ${c.description}`)
			}
		}
		if (evt.gmOverrideOptions.suggestedAlternative) {
			out.push(
				`- **Alternative MJ** : ${evt.gmOverrideOptions.suggestedAlternative}`,
			)
		}
		out.push(`- **Issue historique** : ${evt.historical_outcome}`)
		out.push('')
	}

	out.push(`---`)
	out.push('')

	// ========================================================================
	// Event Templates (modèles d'événements locaux)
	// ========================================================================
	out.push(`### Modèles d'événements locaux`)
	out.push('')
	out.push(
		`${eventTemplates.length} modèles d'événements procéduraux (sévérité 1-5). Instanciés par le moteur de jeu selon les conditions locales.`,
	)
	out.push('')
	out.push(
		`| Nom | Catégorie | Portée | Sévérité | Classes ciblées | Récurrent | Probabilité |`,
	)
	out.push(`|---|---|---|---:|---|---|---:|`)
	for (const t of eventTemplates) {
		out.push(
			`| **${t.name}** | ${t.category} | ${t.scope} | ${t.severity}/5 | ${t.targetClasses.join(', ')} | ${t.recurring ? 'Oui' : 'Non'} | ${(t.baseProbability * 100).toFixed(0)} % |`,
		)
	}
	out.push('')

	// Template details
	for (const t of eventTemplates) {
		out.push(`#### ${t.name}`)
		out.push('')
		out.push(`> ${t.description}`)
		out.push('')
		out.push(`- **ID** : \`${t.id}\``)
		out.push(`- **Catégorie** : ${t.category} / ${t.scope}`)
		out.push(`- **Sévérité** : ${t.severity}/5`)
		out.push(`- **Classes** : ${t.targetClasses.join(', ')}`)
		out.push(
			`- **Récurrent** : ${t.recurring ? `Oui (cooldown ${t.cooldownYears} ans)` : 'Non'}`,
		)
		out.push(
			`- **Probabilité de base** : ${(t.baseProbability * 100).toFixed(0)} %`,
		)
		if (t.triggerConditions.season && t.triggerConditions.season !== 'any') {
			out.push(`- **Saison** : ${t.triggerConditions.season}`)
		}
		if (t.triggerConditions.customCondition) {
			out.push(`- **Conditions** : ${t.triggerConditions.customCondition}`)
		}
		if (t.defaultEffects.customEffect) {
			out.push(`- **Effets** : ${t.defaultEffects.customEffect}`)
		}
		if (t.playerChoices.length > 0) {
			out.push(`- **Choix joueurs** :`)
			for (const c of t.playerChoices) {
				const cls = c.requiredSocialClass ? ` *(${c.requiredSocialClass})*` : ''
				out.push(`  - *${c.label}*${cls} — ${c.description}`)
			}
		}
		if (t.flavorTexts.length > 0) {
			out.push(`- **Textes d'ambiance** :`)
			for (const ft of t.flavorTexts) {
				out.push(`  - _"${ft}"_`)
			}
		}
		out.push(`- **Tags** : ${t.tags.join(', ')}`)
		out.push('')
	}

	out.push(`---`)
	out.push('')

	// ========================================================================
	// Geographic strata
	// ========================================================================

	for (const group of geoGroups) {
		out.push(`## ${group.name}`)
		out.push('')

		// Climate regions for this group
		const groupClimateRegions = group.climateRegionIds
			.map((id) => climateRegions.find((cr) => cr.id === id))
			.filter((cr): cr is ClimateRegion => !!cr)

		if (groupClimateRegions.length > 0) {
			out.push(`### Climat & Écologie`)
			out.push('')
			for (const cr of groupClimateRegions) {
				out.push(`#### ${cr.zone} — \`${cr.id}\``)
				out.push('')
				out.push(renderClimateRegion(cr))
			}
		}

		// Nations in this group
		out.push(`### Nations`)
		out.push('')
		for (const nid of group.nationIds) {
			const nat = nations.find((nn) => nn.id === nid)
			if (nat) {
				out.push(renderNationSection(nat))
			}
		}
	}

	return out.join('\n')
}

// ============================================================================
// Execute
// ============================================================================

if (process.argv.includes('--html')) {
	// Delegate to the HTML generator script
	const { execSync } =
		require('node:child_process') as typeof import('node:child_process')
	execSync(
		`npx tsx ${resolve(process.cwd(), 'scripts', 'generateDatasetHtml.ts')}`,
		{ stdio: 'inherit', cwd: process.cwd() },
	)
} else {
	const md = buildDocument()
	const outPath = resolve(process.cwd(), 'docs', 'GAME_ORIGINAL_DATASET.md')
	writeFileSync(outPath, md, 'utf-8')

	const lines = md.split('\n').length
	const sizeKB = (Buffer.byteLength(md, 'utf-8') / 1024).toFixed(0)
	console.log(`✅ ${outPath}`)
	console.log(`   ${lines} lignes, ${sizeKB} Ko`)
}
