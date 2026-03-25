#!/usr/bin/env npx tsx
// ============================================================================
// Script de génération : /docs/GAME_ORIGINAL_DATASET.html
// Produit une page HTML autonome avec sidebar, recherche, et thème sombre.
// Usage : npx tsx scripts/generateDatasetHtml.ts
//     ou : npx tsx scripts/generateDatasetDoc.ts --html
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
	Infrastructure,
	HistoricalEvent,
	EventTemplate,
} from '../packages/shared/src/types/world'

// ============================================================================
// Helpers
// ============================================================================

function esc(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

function slug(s: string): string {
	return s
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '')
}

function fmt(n: number): string {
	return n.toLocaleString('fr-FR')
}

function pct(r: number): string {
	return `${(r * 100).toFixed(1)}\u202F%`
}

function bar(n: number): string {
	const filled = Math.round(n)
	return `<span class="bar"><span class="fill" style="width:${filled * 10}%"></span></span> <span class="bar-val">${n}/10</span>`
}

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
// Geo groups (same logic as MD script)
// ============================================================================

interface GeoGroup {
	name: string
	climateRegionIds: string[]
	nationIds: string[]
}

function centerOf(nation: Nation): { lat: number; lng: number } {
	const t = nation.territory
	if (!t || t.length === 0) return { lat: 0, lng: 0 }
	return {
		lat: t.reduce((s, c) => s + c.lat, 0) / t.length,
		lng: t.reduce((s, c) => s + c.lng, 0) / t.length,
	}
}

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

	const climCenterMap = new Map<string, { lat: number; lng: number }>()
	for (const cr of climateRegions) {
		climCenterMap.set(cr.id, {
			lat: cr.area.reduce((s, c) => s + c.lat, 0) / cr.area.length,
			lng: cr.area.reduce((s, c) => s + c.lng, 0) / cr.area.length,
		})
	}

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

	return groups.filter((g) => g.nationIds.length > 0)
}

// ============================================================================
// HTML renderers
// ============================================================================

function row(label: string, value: string): string {
	return `<tr><th>${label}</th><td>${value}</td></tr>`
}

function details(summary: string, content: string, open = false): string {
	return `<details${open ? ' open' : ''}><summary>${summary}</summary><div class="details-body">${content}</div></details>`
}

function renderClimateHtml(cr: ClimateRegion): string {
	const eco = ecologyByRegion.get(cr.id)
	let h = `<table class="kv">`
	h += row('Zone', esc(cr.zone))
	h += row('Température moy.', `${cr.avgTemperature} °C`)
	h += row('Précipitations', `${fmt(cr.avgRainfall)} mm/an`)
	h += row('Saisonnalité', bar(cr.seasonality))
	h += `</table>`

	if (cr.disasterRisks.length > 0) {
		h += `<h6>Risques naturels</h6>`
		h += `<table><thead><tr><th>Type</th><th>Probabilité</th><th>Sévérité</th></tr></thead><tbody>`
		for (const dr of cr.disasterRisks) {
			h += `<tr><td>${esc(dr.type)}</td><td>${pct(dr.probability)}</td><td>${bar(dr.severity)}</td></tr>`
		}
		h += `</tbody></table>`
	}

	if (eco) {
		h += `<h6>Écologie</h6>`
		h += `<table class="kv">`
		h += row('Couverture forestière', pct(eco.forestCoverage))
		h += row('Biodiversité', bar(eco.biodiversity))
		h += row('Impact humain', bar(eco.humanImpact))
		h += row('Flore', esc(eco.dominantFlora.join(', ')))
		h += row('Faune', esc(eco.dominantFauna.join(', ')))
		h += row('Animaux domestiqués', esc(eco.domesticatedAnimals.join(', ')))
		h += row('Plantes domestiquées', esc(eco.domesticatedPlants.join(', ')))
		h += `</table>`
	}

	return h
}

function renderNationHtml(n: Nation): string {
	const cap = settlementMap.get(n.capital)
	const id = slug(n.name)
	let h = `<article class="nation" id="${id}" data-nation-id="${esc(n.id)}">`
	h += `<h4>${esc(n.name)} <span class="color-chip" style="background:${esc(n.color)}"></span></h4>`

	// Summary table
	h += `<table class="kv">`
	h += row('ID', `<code>${esc(n.id)}</code>`)
	h += row('Gentilé', esc(n.dempinym))
	h += row('Gouvernance', esc(n.governance))
	h += row(
		'Capitale',
		cap ? `${esc(cap.name)} (<code>${esc(cap.id)}</code>)` : esc(n.capital),
	)
	h += row(
		'Dirigeant',
		`${esc(n.ruler.name)} (${esc(n.ruler.dynastyName)}), né en ${n.ruler.birthYear}, ${n.ruler.age} ans`,
	)
	h += row(
		'Traits',
		n.ruler.traits.map((t) => `<span class="tag">${esc(t)}</span>`).join(' ') ||
			'—',
	)
	h += row('Stabilité', bar(n.stability))
	h += row('Prestige', bar(n.prestige))
	if (n.vassalOf) h += row('Vassal de', `<code>${esc(n.vassalOf)}</code>`)
	h += `</table>`

	// Diplomacy
	if (n.diplomacy.length > 0) {
		let d = `<table><thead><tr><th>Cible</th><th>Type</th><th>Force</th></tr></thead><tbody>`
		for (const rel of n.diplomacy) {
			const target = nations.find((nn) => nn.id === rel.targetNationId)
			d += `<tr><td>${target ? esc(target.name) : `<code>${esc(rel.targetNationId)}</code>`}</td><td><span class="tag tag-${slug(rel.type)}">${esc(rel.type)}</span></td><td>${bar(rel.strength)}</td></tr>`
		}
		d += `</tbody></table>`
		h += details(`Diplomatie (${n.diplomacy.length})`, d)
	}

	// Settlements
	const natSet = (settlementsByNation.get(n.id) ?? []).sort(
		(a, b) => b.population - a.population,
	)
	if (natSet.length > 0) {
		let s = `<table><thead><tr><th>Ville</th><th>Type</th><th>Pop.</th><th>Défense</th><th>Richesse</th><th>Spéc.</th></tr></thead><tbody>`
		for (const st of natSet) {
			s += `<tr><td>${esc(st.name)}</td><td>${esc(st.type)}</td><td class="num">${fmt(st.population)}</td><td>${bar(st.defenseLevel)}</td><td>${bar(st.wealthLevel)}</td><td>${st.specializations.map((sp) => `<span class="tag">${esc(sp)}</span>`).join(' ')}</td></tr>`
		}
		s += `</tbody></table>`
		h += details(`Établissements (${natSet.length})`, s)
	}

	// Population
	const pop = popByNation.get(n.id)
	if (pop) {
		let p = `<table class="kv">`
		p += row('Pop. totale', `<strong>${fmt(pop.total)}</strong>`)
		p += row('Urbanisation', pct(pop.urbanRatio))
		p += row('Espérance de vie', `${pop.lifeExpectancy} ans`)
		p += row('Mortalité infantile', pct(pop.infantMortality))
		p += row(
			'Natalité / Mortalité',
			`${pct(pop.birthRate)} / ${pct(pop.deathRate)}`,
		)
		p += row('Croissance', pct(pop.growthRate))
		p += `</table>`
		if (pop.socialGroups.length > 0) {
			p += `<table><thead><tr><th>Classe</th><th>%</th><th>Influence</th><th>Richesse</th></tr></thead><tbody>`
			for (const sg of pop.socialGroups.sort(
				(a, b) => b.percentage - a.percentage,
			)) {
				p += `<tr><td>${esc(sg.class)}</td><td class="num">${pct(sg.percentage)}</td><td>${bar(sg.influence)}</td><td>${bar(sg.wealth)}</td></tr>`
			}
			p += `</tbody></table>`
		}
		h += details('Population', p)
	}

	// Religion
	const rel = relByNation.get(n.id)
	if (rel) {
		const stateRel = rel.stateReligionId
			? religionMap.get(rel.stateReligionId)
			: null
		let r = ''
		if (stateRel)
			r += `<p><strong>Religion d'État :</strong> ${esc(stateRel.name)}</p>`
		r += `<p><strong>Tension religieuse :</strong> ${bar(rel.religiousTension)}</p>`
		r += `<table><thead><tr><th>Religion</th><th>%</th><th>Statut</th></tr></thead><tbody>`
		for (const rr of rel.religions.sort(
			(a, b) => b.percentage - a.percentage,
		)) {
			const rObj = religionMap.get(rr.religionId)
			r += `<tr><td>${esc(rObj?.name ?? rr.religionId)}</td><td class="num">${pct(rr.percentage)}</td><td><span class="tag tag-${slug(rr.status)}">${esc(rr.status)}</span></td></tr>`
		}
		r += `</tbody></table>`
		h += details('Religion', r)
	}

	// Language
	const lang = langByNation.get(n.id)
	if (lang) {
		const offLang = languageMap.get(lang.officialLanguageId)
		let l = `<p><strong>Langue officielle :</strong> ${esc(offLang?.name ?? lang.officialLanguageId)}</p>`
		l += `<p><strong>Alphabétisation :</strong> ${pct(lang.literacyRate)}</p>`
		l += `<table><thead><tr><th>Langue</th><th>%</th></tr></thead><tbody>`
		for (const sl of lang.spokenLanguages.sort(
			(a, b) => b.percentage - a.percentage,
		)) {
			const lObj = languageMap.get(sl.languageId)
			l += `<tr><td>${esc(lObj?.name ?? sl.languageId)}</td><td class="num">${pct(sl.percentage)}</td></tr>`
		}
		l += `</tbody></table>`
		h += details('Langues', l)
	}

	// Economy
	const eco = ecoByNation.get(n.id)
	if (eco) {
		let e = `<table class="kv">`
		e += row(
			'Monnaie',
			`${esc(eco.currency ?? 'Troc')} (val. relative ${eco.currencyValue})`,
		)
		e += row('PIB estimé', `${eco.gdpEstimate}`)
		e += row('Imposition', pct(eco.taxRate))
		e += row('Balance', `${eco.tradeBalance > 0 ? '+' : ''}${eco.tradeBalance}`)
		e += row(
			'Exports',
			eco.mainExports
				.map((id) => esc(commodityMap.get(id)?.name ?? id))
				.join(', '),
		)
		e += row(
			'Imports',
			eco.mainImports
				.map((id) => esc(commodityMap.get(id)?.name ?? id))
				.join(', '),
		)
		e += row(
			'Routes',
			eco.tradeRouteAccess
				.map((id) => {
					const tr = tradeRoutes.find((t) => t.id === id)
					return esc(tr?.name ?? id)
				})
				.join(', '),
		)
		e += `</table>`
		if (eco.marketPrices.length > 0) {
			e += `<h6>Prix du marché</h6><table><thead><tr><th>Commodité</th><th>Prix</th></tr></thead><tbody>`
			for (const mp of eco.marketPrices) {
				e += `<tr><td>${esc(commodityMap.get(mp.commodityId)?.name ?? mp.commodityId)}</td><td class="num">${mp.price}</td></tr>`
			}
			e += `</tbody></table>`
		}
		h += details('Économie', e)
	}

	// Technology
	const tech = techByNation.get(n.id)
	if (tech) {
		let t = `<p><strong>Innovation :</strong> ${bar(tech.innovationCapacity)}</p>`
		const byCategory = new Map<string, string[]>()
		for (const tid of tech.unlockedTechs) {
			const tt = techMap.get(tid)
			const cat = tt?.category ?? 'autre'
			const list = byCategory.get(cat) ?? []
			list.push(tt?.name ?? tid)
			byCategory.set(cat, list)
		}
		t += `<ul class="tech-list">`
		for (const [cat, names] of [...byCategory.entries()].sort((a, b) =>
			a[0].localeCompare(b[0]),
		)) {
			t += `<li><strong>${esc(cat)}</strong> : ${names.map((n) => esc(n)).join(', ')}</li>`
		}
		t += `</ul>`
		if (tech.researchProgress.length > 0) {
			t += `<h6>En cours</h6><ul>`
			for (const rp of tech.researchProgress) {
				const tt = techMap.get(rp.techId)
				t += `<li>${esc(tt?.name ?? rp.techId)} — ${pct(rp.progress)}</li>`
			}
			t += `</ul>`
		}
		h += details(`Technologie (${tech.unlockedTechs.length})`, t)
	}

	// Culture
	const cult = cultByNation.get(n.id)
	if (cult) {
		let c = `<table class="kv">`
		c += row('Architecture', esc(cult.architecturalStyle))
		c += row(
			'Traits culturels',
			cult.culturalTraits
				.map((t) => `<span class="tag">${esc(t)}</span>`)
				.join(' '),
		)
		c += row('Festivals', esc(cult.festivals.join(', ')))
		c += row('Arts', esc(cult.artForms.join(', ')))
		c += row('Cuisine', esc(cult.cuisineStaples.join(', ')))
		c += row('Vêtements', esc(cult.clothing.join(', ')))
		c += row('Coutumes', esc(cult.socialCustoms.join(', ')))
		c += row('Prestige culturel', bar(cult.culturalPrestige))
		c += `</table>`
		h += details('Culture', c)
	}

	// Military
	const mil = milByNation.get(n.id)
	if (mil) {
		let m = `<table class="kv">`
		m += row('Effectifs', fmt(mil.armySize))
		m += row(
			'Unités',
			mil.availableUnits
				.map((u) => `<span class="tag">${esc(u)}</span>`)
				.join(' '),
		)
		m += row('Force militaire', bar(mil.militaryStrength))
		m += row('Force navale', bar(mil.navalStrength))
		m += row('Fortifications', `${mil.fortificationCount}`)
		m += row('Expérience', bar(mil.warExperience))
		m += row('Moral', bar(mil.morale))
		m += row('Armée pro', mil.professionalArmy ? '✅ Oui' : '❌ Non')
		m += `</table>`
		h += details('Militaire', m)
	}

	// Health
	const health = healthByNation.get(n.id)
	if (health) {
		let hh = `<table class="kv">`
		hh += row('Médecine', bar(health.medicalKnowledge))
		hh += row('Hygiène', bar(health.sanitation))
		hh += row('Risque famine', bar(health.faminRisk))
		hh += row('Santé globale', bar(health.overallHealth))
		hh += `</table>`
		if (health.activeDiseases.length > 0) {
			hh += `<table><thead><tr><th>Maladie</th><th>Prévalence</th></tr></thead><tbody>`
			for (const ad of health.activeDiseases) {
				const d = diseaseMap.get(ad.diseaseId)
				hh += `<tr><td>${esc(d?.name ?? ad.diseaseId)}</td><td class="num">${pct(ad.prevalence)}</td></tr>`
			}
			hh += `</tbody></table>`
		}
		h += details('Santé', hh)
	}

	// Law
	const law = lawByNation.get(n.id)
	if (law) {
		let l = `<table class="kv">`
		l += row('Système', esc(law.legalSystem))
		l += row('Propriété', bar(law.propertyRights))
		l += row('Liberté', bar(law.personalFreedom))
		l += row('Égalité genres', bar(law.genderEquality))
		l += row('Esclavage', `<span class="tag">${esc(law.slaveryStatus)}</span>`)
		l += row('Indép. judiciaire', bar(law.judicialIndependence))
		l += row('Criminalité', bar(law.crimeRate))
		l += row(
			'Crimes courants',
			law.commonCrimes
				.map((c) => `<span class="tag">${esc(c)}</span>`)
				.join(' '),
		)
		l += row(
			'Sanctions',
			law.punishments
				.map((p) => `<span class="tag">${esc(p)}</span>`)
				.join(' '),
		)
		l += row('Application loi', bar(law.lawEnforcement))
		l += `</table>`
		h += details('Droit & Justice', l)
	}

	// Education
	const edu = eduByNation.get(n.id)
	if (edu) {
		let e = `<table class="kv">`
		e += row(
			'Institutions',
			edu.institutions
				.map((i) => `<span class="tag">${esc(i)}</span>`)
				.join(' '),
		)
		e += row('Pop. lettrée', pct(edu.scholarPopulation))
		e += row(
			'Domaines',
			edu.knowledgeAreas
				.map((k) => `<span class="tag">${esc(k)}</span>`)
				.join(' '),
		)
		e += row('Bibliothèques', `${edu.libraryCount}`)
		e += row('Accès éducation', bar(edu.educationAccess))
		e += `</table>`
		h += details('Éducation', e)
	}

	// World Knowledge
	const wk = wkByNation.get(n.id)
	if (wk) {
		let w = `<table class="kv">`
		w += row('Régions connues', `${wk.knownRegions.length} zones`)
		w += row('Exploration', bar(wk.explorationCapacity))
		w += row('Portée navale', bar(wk.navalRange))
		w += row('Cartographie', bar(wk.cartographyLevel))
		w += row(
			'Nations connues',
			`${wk.knownNations.length} — ${wk.knownNations
				.map((id) => {
					const nn = nations.find((n) => n.id === id)
					return esc(nn?.name ?? id)
				})
				.join(', ')}`,
		)
		if (wk.myths.length > 0)
			w += row('Mythes', wk.myths.map((m) => `<em>${esc(m)}</em>`).join(' · '))
		w += `</table>`
		h += details('Connaissance du monde', w)
	}

	// Daily life
	const dailyList = dailyByNation.get(n.id) ?? []
	if (dailyList.length > 0) {
		let d = ''
		for (const dl of dailyList) {
			d += `<h6>${esc(dl.socialClass)} <small>(qualité de vie : ${dl.qualityOfLife}/10)</small></h6>`
			d += `<table class="kv">`
			d += row('Régime', esc(dl.typicalDiet.join(', ')))
			d += row('Logement', esc(dl.housing))
			d += row('Vêtements', esc(dl.clothing))
			d += row('Travail', esc(dl.workType))
			d += row('Loisirs', esc(dl.leisureActivities.join(', ')))
			d += row('Revenu', `${dl.averageIncome}`)
			d += `</table>`
		}
		h += details(`Vie quotidienne (${dailyList.length} classes)`, d)
	}

	// Infrastructure
	const infra = infraByNation.get(n.id) ?? []
	if (infra.length > 0) {
		let ii = `<table><thead><tr><th>Nom</th><th>Type</th><th>État</th><th>Importance</th></tr></thead><tbody>`
		for (const inf of infra) {
			ii += `<tr><td>${esc(inf.name)}</td><td>${esc(inf.type)}</td><td>${bar(inf.condition)}</td><td>${bar(inf.strategicValue)}</td></tr>`
		}
		ii += `</tbody></table>`
		h += details(`Infrastructure (${infra.length})`, ii)
	}

	h += `</article>`
	return h
}

// ============================================================================
// CSS
// ============================================================================

const CSS = `
:root {
  --bg: #0d1117; --bg2: #161b22; --bg3: #21262d; --bg4: #30363d;
  --fg: #e6edf3; --fg2: #8b949e; --fg3: #6e7681;
  --accent: #58a6ff; --accent2: #3fb950; --accent3: #d29922;
  --red: #f85149; --purple: #bc8cff;
  --sidebar-w: 280px;
  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; scrollbar-color: var(--bg4) var(--bg); }
body {
  font-family: var(--font); background: var(--bg); color: var(--fg);
  font-size: 14px; line-height: 1.6;
}

/* Layout */
.layout { display: flex; min-height: 100vh; }
aside {
  position: fixed; top: 0; left: 0; width: var(--sidebar-w); height: 100vh;
  background: var(--bg2); border-right: 1px solid var(--bg4);
  display: flex; flex-direction: column; z-index: 100;
  transition: transform .25s;
}
main {
  flex: 1; margin-left: var(--sidebar-w); padding: 2rem 3rem; max-width: 960px;
}

/* Sidebar */
.sidebar-header { padding: 1rem; border-bottom: 1px solid var(--bg4); }
.sidebar-header h1 { font-size: 1.1rem; color: var(--accent); display: flex; align-items: center; gap: .5rem; }
.sidebar-header h1 span { font-size: 1.3rem; }
#search {
  width: 100%; margin-top: .5rem; padding: .5rem .7rem;
  background: var(--bg3); border: 1px solid var(--bg4); border-radius: 6px;
  color: var(--fg); font-size: .85rem; outline: none;
}
#search:focus { border-color: var(--accent); }
#search::placeholder { color: var(--fg3); }
.nav-body { flex: 1; overflow-y: auto; padding: .5rem 0; }
.nav-body::-webkit-scrollbar { width: 4px; }
.nav-body::-webkit-scrollbar-thumb { background: var(--bg4); border-radius: 2px; }
.nav-group { margin-bottom: .25rem; }
.nav-group-title {
  display: flex; align-items: center; gap: .3rem;
  padding: .35rem 1rem; font-size: .75rem; font-weight: 600;
  color: var(--fg2); text-transform: uppercase; letter-spacing: .05em;
  cursor: pointer; user-select: none;
}
.nav-group-title:hover { color: var(--fg); }
.nav-group-title .arrow { transition: transform .15s; font-size: .6rem; }
.nav-group.collapsed .arrow { transform: rotate(-90deg); }
.nav-group.collapsed .nav-items { display: none; }
.nav-items a {
  display: block; padding: .25rem 1rem .25rem 1.8rem;
  color: var(--fg2); text-decoration: none; font-size: .8rem;
  border-left: 2px solid transparent; transition: all .1s;
}
.nav-items a:hover { color: var(--fg); background: var(--bg3); }
.nav-items a.active { color: var(--accent); border-left-color: var(--accent); background: rgba(88,166,255,.08); }

/* Stat pills */
.stats { display: flex; flex-wrap: wrap; gap: .5rem; margin: 1.5rem 0; }
.stat {
  background: var(--bg2); border: 1px solid var(--bg4); border-radius: 8px;
  padding: .6rem 1rem; min-width: 120px; text-align: center;
}
.stat .val { font-size: 1.3rem; font-weight: 700; color: var(--accent); }
.stat .lbl { font-size: .7rem; color: var(--fg2); text-transform: uppercase; letter-spacing: .04em; margin-top: .1rem; }

/* Headings */
h2 { font-size: 1.4rem; color: var(--accent); border-bottom: 1px solid var(--bg4); padding-bottom: .5rem; margin: 2.5rem 0 1rem; }
h3 { font-size: 1.1rem; color: var(--fg); margin: 1.5rem 0 .75rem; }
h4 { font-size: 1rem; color: var(--fg); margin: 1rem 0 .5rem; display: flex; align-items: center; gap: .5rem; }
h5 { font-size: .9rem; color: var(--fg2); margin: .75rem 0 .5rem; }
h6 { font-size: .8rem; color: var(--fg2); margin: .75rem 0 .25rem; text-transform: uppercase; letter-spacing: .04em; }

/* Color chip */
.color-chip { display: inline-block; width: 14px; height: 14px; border-radius: 3px; border: 1px solid var(--bg4); vertical-align: middle; }

/* Tables */
table { width: 100%; border-collapse: collapse; margin: .5rem 0; font-size: .82rem; }
th, td { padding: .35rem .6rem; text-align: left; border-bottom: 1px solid var(--bg4); }
th { color: var(--fg2); font-weight: 600; font-size: .75rem; text-transform: uppercase; letter-spacing: .03em; background: var(--bg2); }
td { color: var(--fg); }
.num { text-align: right; font-variant-numeric: tabular-nums; }
table.kv { max-width: 600px; }
table.kv th { width: 160px; text-transform: none; letter-spacing: 0; font-size: .82rem; }

/* Tags */
.tag {
  display: inline-block; padding: .1rem .45rem; border-radius: 4px; font-size: .72rem;
  background: var(--bg3); color: var(--fg2); margin: .1rem .1rem;
}
.tag-alliance { background: rgba(63,185,80,.15); color: var(--accent2); }
.tag-war { background: rgba(248,81,73,.15); color: var(--red); }
.tag-rivalry { background: rgba(210,153,34,.15); color: var(--accent3); }
.tag-state { background: rgba(88,166,255,.15); color: var(--accent); }
.tag-persecuted { background: rgba(248,81,73,.15); color: var(--red); }
.tag-tolerated { background: rgba(210,153,34,.15); color: var(--accent3); }

/* Level bars */
.bar {
  display: inline-block; width: 80px; height: 8px; background: var(--bg4);
  border-radius: 4px; vertical-align: middle; overflow: hidden;
}
.bar .fill { display: block; height: 100%; background: var(--accent); border-radius: 4px; transition: width .3s; }
.bar-val { font-size: .72rem; color: var(--fg3); }

/* Details/Accordion */
details { margin: .5rem 0; border: 1px solid var(--bg4); border-radius: 6px; overflow: hidden; }
details summary {
  padding: .5rem .8rem; cursor: pointer; font-weight: 600; font-size: .85rem;
  background: var(--bg2); color: var(--fg2); user-select: none; list-style: none;
}
details summary::before { content: '▶'; display: inline-block; margin-right: .5rem; font-size: .6rem; transition: transform .15s; }
details[open] summary::before { transform: rotate(90deg); }
details summary:hover { color: var(--fg); }
.details-body { padding: .8rem; }

/* Nation articles */
.nation { margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--bg3); }

/* Reference tables */
.ref-section { margin: 1rem 0; }
.ref-section table { font-size: .78rem; }

code { font-family: var(--mono); font-size: .8rem; background: var(--bg3); padding: .1rem .3rem; border-radius: 3px; }

/* Tech list */
.tech-list { list-style: none; padding: 0; }
.tech-list li { margin: .3rem 0; font-size: .82rem; }

/* Responsive */
.burger { display: none; position: fixed; top: .7rem; left: .7rem; z-index: 200; background: var(--bg2); border: 1px solid var(--bg4); color: var(--fg); border-radius: 6px; padding: .4rem .6rem; cursor: pointer; font-size: 1.2rem; }
@media (max-width: 860px) {
  .burger { display: block; }
  aside { transform: translateX(-100%); }
  aside.open { transform: translateX(0); box-shadow: 4px 0 20px rgba(0,0,0,.5); }
  main { margin-left: 0; padding: 1rem; }
}

/* Event Timeline Graph */
#evt-graph-wrap {
  position: relative; width: 100%; height: 700px;
  background: var(--bg2); border: 1px solid var(--bg4); border-radius: 8px;
  overflow: hidden; cursor: grab; margin: 1rem 0;
}
#evt-graph-wrap:active { cursor: grabbing; }
#evt-graph-wrap svg { display: block; width: 100%; height: 100%; }
#graph-tooltip {
  position: absolute; pointer-events: none; background: var(--bg3);
  border: 1px solid var(--bg4); border-radius: 6px; padding: .5rem .7rem;
  font-size: .78rem; color: var(--fg); max-width: 320px;
  box-shadow: 0 4px 12px rgba(0,0,0,.4); z-index: 10;
  display: none; line-height: 1.5;
}
#graph-tooltip .tt-title { color: var(--accent); font-weight: 700; }
#graph-tooltip .tt-meta { color: var(--fg2); font-size: .72rem; margin-top: .15rem; }
#graph-legend {
  display: flex; flex-wrap: wrap; gap: .8rem; margin: .75rem 0;
  font-size: .78rem; color: var(--fg2);
}
#graph-legend span { display: flex; align-items: center; gap: .3rem; }
#graph-legend .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.graph-controls {
  display: flex; align-items: center; gap: .7rem; margin: .5rem 0; flex-wrap: wrap;
}
.graph-controls button, .graph-controls select {
  background: var(--bg3); color: var(--fg); border: 1px solid var(--bg4);
  border-radius: 4px; padding: .3rem .6rem; font-size: .78rem; cursor: pointer;
}
.graph-controls button:hover, .graph-controls select:hover { border-color: var(--accent); }
.graph-edge { transition: stroke-opacity .15s; }
.graph-node { transition: r .1s; }
`

// ============================================================================
// JS (search + nav highlighting + mobile burger)
// ============================================================================

const JS = `
document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('search');
  const navItems = document.querySelectorAll('.nav-items a');
  const articles = document.querySelectorAll('.nation');
  const sections = document.querySelectorAll('[data-geo-group]');
  const groupTitles = document.querySelectorAll('.nav-group-title');
  const burger = document.querySelector('.burger');
  const sidebar = document.querySelector('aside');

  // Burger menu
  burger?.addEventListener('click', () => sidebar?.classList.toggle('open'));
  document.querySelector('main')?.addEventListener('click', () => sidebar?.classList.remove('open'));

  // Collapse groups
  groupTitles.forEach(t => {
    t.addEventListener('click', () => t.parentElement?.classList.toggle('collapsed'));
  });

  // Search
  search?.addEventListener('input', () => {
    const q = search.value.toLowerCase().trim();
    navItems.forEach(a => {
      const match = !q || a.textContent.toLowerCase().includes(q);
      a.style.display = match ? '' : 'none';
    });
    // Show/hide groups that have visible items
    document.querySelectorAll('.nav-group').forEach(g => {
      const visible = g.querySelectorAll('.nav-items a[style=""],.nav-items a:not([style])');
      const hasVisible = Array.from(visible).some(a => a.style.display !== 'none');
      g.style.display = hasVisible || !q ? '' : 'none';
      if (q) g.classList.remove('collapsed');
    });
    // Highlight in main
    articles.forEach(a => {
      const match = !q || a.textContent.toLowerCase().includes(q);
      a.style.display = match ? '' : 'none';
    });
  });

  // Active nav on scroll
  const observer = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) {
        const id = e.target.id;
        navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    }
  }, { rootMargin: '-10% 0px -80% 0px' });
  articles.forEach(a => observer.observe(a));
});
`

// ============================================================================
// Graph JS (rendered in a separate <script> block, reads JSON from #graph-data)
// ============================================================================

const GRAPH_JS = `
(function() {
  var raw = JSON.parse(document.getElementById('graph-data').textContent);
  var nodes = raw.nodes, edges = raw.edges;
  var GW = raw.width, GH = raw.height;
  var minYear = raw.minYear, maxYear = raw.maxYear;
  var catLanes = raw.catLanes || {};

  var typeColors = {
    milestone: '#58a6ff', crisis: '#f85149', opportunity: '#3fb950',
    cultural_shift: '#bc8cff', natural_disaster: '#d29922', political: '#79c0ff'
  };

  var wrap = document.getElementById('evt-graph-wrap');
  var tooltip = document.getElementById('graph-tooltip');
  if (!wrap) return;

  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 ' + GW + ' ' + GH);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

  var defs = document.createElementNS(NS, 'defs');
  function mkMarker(id, color) {
    var m = document.createElementNS(NS, 'marker');
    m.id = id;
    m.setAttribute('viewBox', '0 0 10 7');
    m.setAttribute('refX', '10'); m.setAttribute('refY', '3.5');
    m.setAttribute('markerWidth', '7'); m.setAttribute('markerHeight', '5');
    m.setAttribute('orient', 'auto');
    var p = document.createElementNS(NS, 'polygon');
    p.setAttribute('points', '0 0,10 3.5,0 7');
    p.setAttribute('fill', color);
    m.appendChild(p); defs.appendChild(m);
  }
  mkMarker('arr-trig', 'rgba(63,185,80,.7)');
  mkMarker('arr-req', 'rgba(88,166,255,.7)');
  svg.appendChild(defs);

  var g = document.createElementNS(NS, 'g');
  svg.appendChild(g);

  var nodeMap = {};
  for (var i = 0; i < nodes.length; i++) nodeMap[nodes[i].id] = nodes[i];

  // Year axis gridlines
  var yearSpan = maxYear - minYear || 1;
  var PAD = 80;
  var step = yearSpan > 500 ? 100 : yearSpan > 200 ? 50 : 25;
  for (var yr = Math.ceil(minYear / step) * step; yr <= maxYear; yr += step) {
    var xp = PAD + ((yr - minYear) / yearSpan) * (GW - 2 * PAD);
    var ln = document.createElementNS(NS, 'line');
    ln.setAttribute('x1', xp); ln.setAttribute('y1', 20);
    ln.setAttribute('x2', xp); ln.setAttribute('y2', GH - 30);
    ln.setAttribute('stroke', '#21262d'); ln.setAttribute('stroke-width', '1');
    ln.setAttribute('stroke-dasharray', '4,4');
    g.appendChild(ln);
    var txt = document.createElementNS(NS, 'text');
    txt.setAttribute('x', xp); txt.setAttribute('y', GH - 8);
    txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('fill', '#6e7681'); txt.setAttribute('font-size', '13');
    txt.setAttribute('font-family', 'Inter,sans-serif');
    txt.textContent = yr.toString();
    g.appendChild(txt);
  }

  // Category lane labels
  for (var cat in catLanes) {
    var lbl = document.createElementNS(NS, 'text');
    lbl.setAttribute('x', '8'); lbl.setAttribute('y', String(catLanes[cat] + 4));
    lbl.setAttribute('fill', '#6e7681'); lbl.setAttribute('font-size', '10');
    lbl.setAttribute('font-family', 'Inter,sans-serif');
    lbl.setAttribute('opacity', '0.7');
    lbl.textContent = cat;
    g.appendChild(lbl);
    var rule = document.createElementNS(NS, 'line');
    rule.setAttribute('x1', '0'); rule.setAttribute('y1', String(catLanes[cat] - 15));
    rule.setAttribute('x2', String(GW)); rule.setAttribute('y2', String(catLanes[cat] - 15));
    rule.setAttribute('stroke', '#161b22'); rule.setAttribute('stroke-width', '1');
    g.appendChild(rule);
  }

  // Draw edges
  var edgeEls = [];
  for (var i = 0; i < edges.length; i++) {
    var e = edges[i];
    var src = nodeMap[e.from], tgt = nodeMap[e.to];
    if (!src || !tgt) continue;
    var dx = tgt.x - src.x;
    var dy = tgt.y - src.y;
    var cpOff = Math.min(Math.abs(dx) * 0.35, 200);
    var cpY = Math.abs(dy) > 60 ? dy * 0.2 : 0;
    var d = 'M' + src.x + ',' + src.y +
      ' C' + (src.x + cpOff) + ',' + (src.y + cpY) +
      ' ' + (tgt.x - cpOff) + ',' + (tgt.y - cpY) +
      ' ' + tgt.x + ',' + tgt.y;
    var path = document.createElementNS(NS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('class', 'graph-edge');
    var isTrig = e.type === 'triggers';
    path.setAttribute('stroke', isTrig ? '#3fb950' : '#58a6ff');
    path.setAttribute('stroke-width', '1.2');
    path.setAttribute('stroke-opacity', '0.3');
    path.setAttribute('marker-end', isTrig ? 'url(#arr-trig)' : 'url(#arr-req)');
    path.dataset.from = e.from; path.dataset.to = e.to;
    g.appendChild(path);
    edgeEls.push(path);
  }

  // Draw nodes
  var nodeEls = [];
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    var r = 4 + n.severity * 0.6;
    var circ = document.createElementNS(NS, 'circle');
    circ.setAttribute('cx', String(n.x)); circ.setAttribute('cy', String(n.y));
    circ.setAttribute('r', String(r));
    circ.setAttribute('fill', typeColors[n.type] || '#8b949e');
    circ.setAttribute('stroke', '#0d1117'); circ.setAttribute('stroke-width', '1.5');
    circ.setAttribute('class', 'graph-node');
    circ.style.cursor = 'pointer';
    circ.dataset.id = n.id; circ.dataset.type = n.type; circ.dataset.r = String(r);
    g.appendChild(circ);
    nodeEls.push(circ);
  }

  wrap.appendChild(svg);

  // Pan & Zoom state
  var scale = 1, panX = 0, panY = 0;
  var dragging = false, dsx = 0, dsy = 0;

  function applyTx() {
    g.setAttribute('transform', 'translate(' + panX + ',' + panY + ') scale(' + scale + ')');
  }

  // Initial view at 100% zoom, aligned top-left
  var wR = wrap.getBoundingClientRect();
  scale = 1;
  panX = 0;
  panY = 0;
  applyTx();

  wrap.addEventListener('wheel', function(ev) {
    ev.preventDefault();
    var rect = wrap.getBoundingClientRect();
    var mx = ev.clientX - rect.left, my = ev.clientY - rect.top;
    var f = ev.deltaY > 0 ? 0.9 : 1.1;
    var ns = Math.max(0.05, Math.min(10, scale * f));
    panX = mx - (mx - panX) * (ns / scale);
    panY = my - (my - panY) * (ns / scale);
    scale = ns; applyTx();
  }, {passive: false});

  wrap.addEventListener('mousedown', function(ev) {
    if (ev.button !== 0) return;
    dragging = true; dsx = ev.clientX - panX; dsy = ev.clientY - panY;
    wrap.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', function(ev) {
    if (!dragging) return;
    panX = ev.clientX - dsx; panY = ev.clientY - dsy; applyTx();
  });
  window.addEventListener('mouseup', function() {
    if (dragging) { dragging = false; wrap.style.cursor = 'grab'; }
  });

  // Tooltip
  svg.addEventListener('mouseover', function(ev) {
    var c = ev.target; if (!c.classList || !c.classList.contains('graph-node')) return;
    var n = nodeMap[c.dataset.id]; if (!n) return;
    c.setAttribute('r', String(parseFloat(c.dataset.r) + 3));
    for (var j = 0; j < edgeEls.length; j++) {
      var el = edgeEls[j];
      if (el.dataset.from === n.id || el.dataset.to === n.id) {
        el.setAttribute('stroke-opacity', '0.9');
        el.setAttribute('stroke-width', '2.5');
      }
    }
    tooltip.style.display = 'block';
    var depsIn = 0, depsOut = 0;
    for (var j = 0; j < edges.length; j++) {
      if (edges[j].to === n.id) depsIn++;
      if (edges[j].from === n.id) depsOut++;
    }
    tooltip.innerHTML = '<div class="tt-title">' + n.name + '</div>' +
      '<div class="tt-meta">' + n.year + ' &middot; ' + n.type + ' &middot; ' + n.category + ' &middot; Sev. ' + n.severity + '/10</div>' +
      (depsIn ? '<div style="margin-top:.2rem;color:#58a6ff;font-size:.72rem">&larr; ' + depsIn + ' prerequis</div>' : '') +
      (depsOut ? '<div style="color:#3fb950;font-size:.72rem">&rarr; Declenche ' + depsOut + ' evenement(s)</div>' : '');
  });
  svg.addEventListener('mousemove', function(ev) {
    if (tooltip.style.display === 'none') return;
    var rect = wrap.getBoundingClientRect();
    tooltip.style.left = (ev.clientX - rect.left + 14) + 'px';
    tooltip.style.top = (ev.clientY - rect.top - 10) + 'px';
  });
  svg.addEventListener('mouseout', function(ev) {
    var c = ev.target; if (!c.classList || !c.classList.contains('graph-node')) return;
    c.setAttribute('r', c.dataset.r);
    for (var j = 0; j < edgeEls.length; j++) {
      edgeEls[j].setAttribute('stroke-opacity', '0.3');
      edgeEls[j].setAttribute('stroke-width', '1.2');
    }
    tooltip.style.display = 'none';
  });

  // Reset zoom button
  var resetBtn = document.getElementById('graph-reset');
  if (resetBtn) resetBtn.addEventListener('click', function() {
    scale = 1;
    panX = 0;
    panY = 0;
    applyTx();
  });

  // Filter by type
  var filterSel = document.getElementById('graph-filter');
  if (filterSel) filterSel.addEventListener('change', function() {
    var val = filterSel.value;
    for (var j = 0; j < nodeEls.length; j++) {
      nodeEls[j].style.display = (!val || nodeEls[j].dataset.type === val) ? '' : 'none';
    }
    for (var j = 0; j < edgeEls.length; j++) {
      var ef = edgeEls[j];
      var sn = nodeMap[ef.dataset.from], tn = nodeMap[ef.dataset.to];
      ef.style.display = (!val || (sn && sn.type === val) || (tn && tn.type === val)) ? '' : 'none';
    }
  });
})();
`

// ============================================================================
// Build HTML document
// ============================================================================

function buildHtml(): string {
	const geoGroups = classifyNations()
	const nationById = indexById(nations)
	const totalPop = populationsData.reduce((s, p) => s + p.total, 0)

	// --- Sidebar navigation ---
	let nav = ''
	nav += `<div class="nav-group"><div class="nav-group-title"><span class="arrow">▼</span> Référentiels</div><div class="nav-items">`
	nav += `<a href="#religions">Religions (${religions.length})</a>`
	nav += `<a href="#langues">Langues (${languages.length})</a>`
	nav += `<a href="#technologies">Technologies (${technologies.length})</a>`
	nav += `<a href="#commodites">Commodités (${commodities.length})</a>`
	nav += `<a href="#routes-commerciales">Routes commerciales (${tradeRoutes.length})</a>`
	nav += `<a href="#maladies">Maladies (${diseases.length})</a>`
	nav += `<a href="#evenements">Événements (${historicalEvents.length})</a>`
	nav += `<a href="#templates">Templates locaux (${eventTemplates.length})</a>`
	nav += `<a href="#graphe-evenements">📊 Graphe temporel</a>`
	nav += `</div></div>`

	for (const group of geoGroups) {
		const gSlug = slug(group.name)
		nav += `<div class="nav-group"><div class="nav-group-title"><span class="arrow">▼</span> ${esc(group.name)}</div><div class="nav-items">`
		for (const nid of group.nationIds) {
			const nat = nationById.get(nid)
			if (nat) {
				nav += `<a href="#${slug(nat.name)}">${esc(nat.name)}</a>`
			}
		}
		nav += `</div></div>`
	}

	// --- Main content ---
	let main = ''

	// Stats
	main += `<h2 id="resume">Résumé — An 1000</h2>`
	main += `<div class="stats">`
	const statPills: [string, string | number][] = [
		['Nations', nations.length],
		['Établissements', settlements.length],
		['Religions', religions.length],
		['Langues', languages.length],
		['Technologies', technologies.length],
		['Commodités', commodities.length],
		['Routes comm.', tradeRoutes.length],
		['Maladies', diseases.length],
		['Régions clim.', climateRegions.length],
		['Écologie', ecologyData.length],
		['Infrastructures', infrastructureData.length],
		['Événements', historicalEvents.length],
		['Templates', eventTemplates.length],
		['Pop. mondiale', fmt(totalPop)],
	]
	for (const [lbl, val] of statPills) {
		main += `<div class="stat"><div class="val">${val}</div><div class="lbl">${lbl}</div></div>`
	}
	main += `</div>`

	// ---- Global references ----
	main += `<h2 id="referentiels">Référentiels globaux</h2>`

	// Religions
	main += `<div class="ref-section"><h3 id="religions">Religions</h3>`
	main += `<table><thead><tr><th>Nom</th><th>Famille</th><th>Ville sainte</th><th>Organisation</th><th>Prosélytisme</th><th>Influence pol.</th></tr></thead><tbody>`
	for (const r of religions.sort((a, b) => a.family.localeCompare(b.family))) {
		const holy = r.holyCity
			? (settlementMap.get(r.holyCity)?.name ?? r.holyCity)
			: '—'
		main += `<tr><td>${esc(r.name)}</td><td><span class="tag">${esc(r.family)}</span></td><td>${esc(holy)}</td><td>${bar(r.organizationLevel)}</td><td>${bar(r.proselytism)}</td><td>${bar(r.politicalInfluence)}</td></tr>`
	}
	main += `</tbody></table></div>`

	// Languages
	main += `<div class="ref-section"><h3 id="langues">Langues</h3>`
	main += `<table><thead><tr><th>Nom</th><th>Famille</th><th>Écriture</th><th>Locuteurs</th><th>Lingua franca</th></tr></thead><tbody>`
	for (const l of languages.sort((a, b) => a.family.localeCompare(b.family))) {
		main += `<tr><td>${esc(l.name)}</td><td><span class="tag">${esc(l.family)}</span></td><td>${esc(l.script)}</td><td class="num">${fmt(l.speakerCount)}</td><td>${l.isLingua_franca ? '✅' : ''}</td></tr>`
	}
	main += `</tbody></table></div>`

	// Technologies
	main += `<div class="ref-section"><h3 id="technologies">Technologies</h3>`
	main += `<table><thead><tr><th>Nom</th><th>Catégorie</th><th>Complexité</th><th>Prérequis</th></tr></thead><tbody>`
	for (const t of technologies.sort((a, b) =>
		a.category.localeCompare(b.category),
	)) {
		const prereqs = t.prerequisites
			.map((pid) => esc(techMap.get(pid)?.name ?? pid))
			.join(', ')
		main += `<tr><td>${esc(t.name)}</td><td><span class="tag">${esc(t.category)}</span></td><td>${bar(t.complexity)}</td><td>${prereqs || '—'}</td></tr>`
	}
	main += `</tbody></table></div>`

	// Commodities
	main += `<div class="ref-section"><h3 id="commodites">Commodités</h3>`
	main += `<table><thead><tr><th>Nom</th><th>Catégorie</th><th>Valeur</th><th>Poids</th><th>Périssable</th></tr></thead><tbody>`
	for (const c of commodities.sort((a, b) =>
		a.category.localeCompare(b.category),
	)) {
		main += `<tr><td>${esc(c.name)}</td><td><span class="tag">${esc(c.category)}</span></td><td class="num">${c.baseValue}</td><td class="num">${c.weight}</td><td>${c.perishable ? '⚠️' : ''}</td></tr>`
	}
	main += `</tbody></table></div>`

	// Trade routes
	main += `<div class="ref-section"><h3 id="routes-commerciales">Routes commerciales</h3>`
	main += `<table><thead><tr><th>Nom</th><th>Type</th><th>Nations reliées</th><th>Danger</th><th>Importance</th></tr></thead><tbody>`
	for (const tr of tradeRoutes) {
		const natNames = tr.connectsNations
			.map((id) => esc(nationById.get(id)?.name ?? id))
			.join(', ')
		main += `<tr><td>${esc(tr.name)}</td><td><span class="tag">${esc(tr.type)}</span></td><td>${natNames}</td><td>${bar(tr.danger)}</td><td>${bar(tr.importance)}</td></tr>`
	}
	main += `</tbody></table></div>`

	// Diseases
	main += `<div class="ref-section"><h3 id="maladies">Maladies</h3>`
	main += `<table><thead><tr><th>Nom</th><th>Type</th><th>Mortalité</th><th>Transmission</th><th>Régions</th></tr></thead><tbody>`
	for (const d of diseases) {
		const regions = d.endemicRegions
			.map((id) => {
				const cr = climateRegions.find((c) => c.id === id)
				return esc(cr?.zone ?? id)
			})
			.join(', ')
		main += `<tr><td>${esc(d.name)}</td><td><span class="tag">${esc(d.type)}</span></td><td class="num">${pct(d.mortality)}</td><td>${esc(d.transmissionMode)}</td><td>${regions}</td></tr>`
	}
	main += `</tbody></table></div>`

	// Historical events
	main += `<div class="ref-section"><h3 id="evenements">Événements historiques</h3>`
	main += `<p>${historicalEvents.length} événements couvrant la période 1000–1200. Milestones connus du MJ, adaptables selon les actions des joueurs.</p>`
	main += `<table><thead><tr><th>Année</th><th>Nom</th><th>Type</th><th>Catégorie</th><th>Sévérité</th><th>Nations</th><th>Prérequis</th><th>Déclenche</th></tr></thead><tbody>`
	for (const evt of [...historicalEvents].sort((a, b) => a.year - b.year)) {
		const natNames =
			evt.affectedNationIds
				.map((id) => {
					const n = nations.find((nn) => nn.id === id)
					return esc(n?.name ?? id)
				})
				.join(', ') || '<em>Global</em>'
		const prereqs =
			(evt.triggerConditions.requiredEventIds ?? [])
				.map((id) => {
					const e = historicalEvents.find((ee) => ee.id === id)
					return esc(e?.name ?? id)
				})
				.join(', ') || '—'
		const triggers =
			(evt.effects.triggerEventIds ?? [])
				.map((id) => {
					const e = historicalEvents.find((ee) => ee.id === id)
					return esc(e?.name ?? id)
				})
				.join(', ') || '—'
		main += `<tr><td class="num">${evt.year}</td><td><strong>${esc(evt.name)}</strong></td><td><span class="tag">${esc(evt.type)}</span></td><td><span class="tag">${esc(evt.category)}</span></td><td class="num">${evt.severity}/10</td><td>${natNames}</td><td>${prereqs}</td><td>${triggers}</td></tr>`
	}
	main += `</tbody></table>`

	// Event details
	for (const evt of [...historicalEvents].sort((a, b) => a.year - b.year)) {
		main += `<details><summary><strong>${esc(evt.name)}</strong> (${evt.year}) — ${esc(evt.type)} / ${esc(evt.category)} — Sévérité ${evt.severity}/10</summary>`
		main += `<blockquote>${esc(evt.description)}</blockquote>`
		main += `<ul>`
		main += `<li><strong>Fenêtre</strong> : ${evt.yearRange[0]}–${evt.yearRange[1]}</li>`
		main += `<li><strong>Visibilité</strong> : ${esc(evt.visibility)}</li>`
		main += `<li><strong>Global</strong> : ${evt.globalEvent ? 'Oui' : 'Non'}</li>`
		if (evt.affectedNationIds.length > 0) {
			const names = evt.affectedNationIds
				.map((id) => {
					const n = nations.find((nn) => nn.id === id)
					return esc(n?.name ?? id)
				})
				.join(', ')
			main += `<li><strong>Nations</strong> : ${names}</li>`
		}
		if (evt.triggerConditions.requiredEventIds?.length) {
			const names = evt.triggerConditions.requiredEventIds
				.map((id) => {
					const e = historicalEvents.find((ee) => ee.id === id)
					return esc(e?.name ?? id)
				})
				.join(', ')
			main += `<li><strong>Prérequis</strong> : ${names}</li>`
		}
		if (evt.triggerConditions.blockedByEventIds?.length) {
			const names = evt.triggerConditions.blockedByEventIds
				.map((id) => {
					const e = historicalEvents.find((ee) => ee.id === id)
					return esc(e?.name ?? id)
				})
				.join(', ')
			main += `<li><strong>Bloqué par</strong> : ${names}</li>`
		}
		if (evt.effects.triggerEventIds?.length) {
			const names = evt.effects.triggerEventIds
				.map((id) => {
					const e = historicalEvents.find((ee) => ee.id === id)
					return esc(e?.name ?? id)
				})
				.join(', ')
			main += `<li><strong>Déclenche</strong> : ${names}</li>`
		}
		if (evt.playerChoices.length > 0) {
			main += `<li><strong>Choix joueurs</strong> :<ul>`
			for (const c of evt.playerChoices) {
				main += `<li><em>${esc(c.label)}</em> — ${esc(c.description)}</li>`
			}
			main += `</ul></li>`
		}
		if (evt.gmOverrideOptions.suggestedAlternative) {
			main += `<li><strong>Alternative MJ</strong> : ${esc(evt.gmOverrideOptions.suggestedAlternative)}</li>`
		}
		main += `<li><strong>Issue historique</strong> : ${esc(evt.historical_outcome)}</li>`
		main += `</ul></details>`
	}
	main += `</div>`

	// Event Templates
	main += `<div class="ref-section"><h3 id="templates">Modèles d'événements locaux</h3>`
	main += `<p>${eventTemplates.length} modèles procéduraux (sévérité 1-5). Instanciés dynamiquement par le moteur de jeu.</p>`
	main += `<table><thead><tr><th>Nom</th><th>Catégorie</th><th>Portée</th><th>Sévérité</th><th>Classes</th><th>Probabilité</th></tr></thead><tbody>`
	for (const t of eventTemplates) {
		main += `<tr><td><strong>${esc(t.name)}</strong></td><td><span class="tag">${esc(t.category)}</span></td><td><span class="tag">${esc(t.scope)}</span></td><td class="num">${t.severity}/5</td><td>${t.targetClasses.map((c) => `<span class="tag">${esc(c)}</span>`).join(' ')}</td><td class="num">${(t.baseProbability * 100).toFixed(0)} %</td></tr>`
	}
	main += `</tbody></table>`

	for (const t of eventTemplates) {
		main += `<details><summary><strong>${esc(t.name)}</strong> — ${esc(t.category)} / ${esc(t.scope)} — Sévérité ${t.severity}/5</summary>`
		main += `<blockquote>${esc(t.description)}</blockquote>`
		main += `<ul>`
		main += `<li><strong>ID</strong> : <code>${esc(t.id)}</code></li>`
		main += `<li><strong>Classes</strong> : ${t.targetClasses.join(', ')}</li>`
		main += `<li><strong>Récurrent</strong> : ${t.recurring ? `Oui (cooldown ${t.cooldownYears} ans)` : 'Non'}</li>`
		main += `<li><strong>Probabilité</strong> : ${(t.baseProbability * 100).toFixed(0)} %</li>`
		if (t.triggerConditions.season && t.triggerConditions.season !== 'any') {
			main += `<li><strong>Saison</strong> : ${esc(t.triggerConditions.season)}</li>`
		}
		if (t.triggerConditions.customCondition) {
			main += `<li><strong>Conditions</strong> : ${esc(t.triggerConditions.customCondition)}</li>`
		}
		if (t.defaultEffects.customEffect) {
			main += `<li><strong>Effets</strong> : ${esc(t.defaultEffects.customEffect)}</li>`
		}
		if (t.playerChoices.length > 0) {
			main += `<li><strong>Choix joueurs</strong> :<ul>`
			for (const c of t.playerChoices) {
				const cls = c.requiredSocialClass
					? ` <em>(${esc(c.requiredSocialClass)})</em>`
					: ''
				main += `<li><em>${esc(c.label)}</em>${cls} — ${esc(c.description)}</li>`
			}
			main += `</ul></li>`
		}
		if (t.flavorTexts.length > 0) {
			main += `<li><strong>Textes d'ambiance</strong> :<ul>`
			for (const ft of t.flavorTexts) {
				main += `<li><em>"${esc(ft)}"</em></li>`
			}
			main += `</ul></li>`
		}
		main += `<li><strong>Tags</strong> : ${t.tags.map((tg) => `<span class="tag">${esc(tg)}</span>`).join(' ')}</li>`
		main += `</ul></details>`
	}
	main += `</div>`

	// ---- Event Timeline Graph ----
	{
		const sortedEvts = [...historicalEvents].sort((a, b) => a.year - b.year)
		const evtMinYear = Math.min(...sortedEvts.map((e) => e.year))
		const evtMaxYear = Math.max(...sortedEvts.map((e) => e.year))
		const yearSpan = evtMaxYear - evtMinYear || 1

		// Collect categories and assign Y lanes
		const categories = [
			...new Set(historicalEvents.map((e) => e.category)),
		].sort()
		const catLane = new Map<string, number>()
		const LANE_H = 140
		const PAD = 80
		categories.forEach((cat, i) => catLane.set(cat, PAD + i * LANE_H))

		const GRAPH_W = Math.max(4000, yearSpan * 5)

		// Position nodes — within each category lane, stack to avoid overlaps
		interface GraphNode {
			id: string
			name: string
			year: number
			type: string
			category: string
			severity: number
			x: number
			y: number
		}
		interface GraphEdge {
			from: string
			to: string
			type: string
		}

		const nodes: GraphNode[] = []
		const laneOccupied = new Map<string, { x: number; y: number }[]>()
		for (const cat of categories) laneOccupied.set(cat, [])

		const NODE_GAP = 22

		for (const evt of sortedEvts) {
			const x = PAD + ((evt.year - evtMinYear) / yearSpan) * (GRAPH_W - 2 * PAD)
			const laneBase = catLane.get(evt.category) ?? PAD
			const occupied = laneOccupied.get(evt.category) ?? []

			let y = laneBase + 20
			let placed = false
			while (!placed) {
				placed = true
				for (const occ of occupied) {
					if (
						Math.abs(occ.x - x) < NODE_GAP * 1.8 &&
						Math.abs(occ.y - y) < NODE_GAP
					) {
						y += NODE_GAP
						placed = false
						break
					}
				}
				if (y > laneBase + LANE_H - 20) break
			}

			occupied.push({ x, y })
			nodes.push({
				id: evt.id,
				name: evt.name,
				year: evt.year,
				type: evt.type,
				category: evt.category,
				severity: evt.severity,
				x: Math.round(x * 10) / 10,
				y: Math.round(y * 10) / 10,
			})
		}

		const GRAPH_H = PAD + categories.length * LANE_H + 40

		// Build edges
		const edges: GraphEdge[] = []
		for (const evt of historicalEvents) {
			for (const reqId of evt.triggerConditions.requiredEventIds ?? []) {
				edges.push({ from: reqId, to: evt.id, type: 'requires' })
			}
			for (const trigId of evt.effects.triggerEventIds ?? []) {
				edges.push({ from: evt.id, to: trigId, type: 'triggers' })
			}
		}

		// Deduplicate edges
		const edgeSet = new Set<string>()
		const uniqueEdges = edges.filter((e) => {
			const key = `${e.from}->${e.to}:${e.type}`
			if (edgeSet.has(key)) return false
			edgeSet.add(key)
			return true
		})

		// Category lane centers for labels
		const catLanesObj: Record<string, number> = {}
		for (const [cat, y] of catLane.entries()) catLanesObj[cat] = y + 10

		const graphData = {
			nodes,
			edges: uniqueEdges,
			width: GRAPH_W,
			height: GRAPH_H,
			minYear: evtMinYear,
			maxYear: evtMaxYear,
			catLanes: catLanesObj,
		}

		// Type labels for legend & filter
		const typeLabels: Record<string, string> = {
			milestone: 'Jalon',
			crisis: 'Crise',
			opportunity: 'Opportunite',
			cultural_shift: 'Mutation culturelle',
			natural_disaster: 'Catastrophe naturelle',
			political: 'Politique',
		}
		const typeColors: Record<string, string> = {
			milestone: '#58a6ff',
			crisis: '#f85149',
			opportunity: '#3fb950',
			cultural_shift: '#bc8cff',
			natural_disaster: '#d29922',
			political: '#79c0ff',
		}

		const types = [...new Set(historicalEvents.map((e) => e.type))].sort()

		main += `<div class="ref-section"><h3 id="graphe-evenements">Graphe temporel des evenements</h3>`
		main += `<p>${historicalEvents.length} evenements et ${uniqueEdges.length} liens de dependance. Zoom avec la molette, deplacement par glisser-deposer, survol pour les details.</p>`

		// Controls
		main += `<div class="graph-controls">`
		main += `<button id="graph-reset">Reinitialiser la vue</button>`
		main += `<label>Filtre : <select id="graph-filter"><option value="">Tous les types</option>`
		for (const t of types) {
			main += `<option value="${esc(t)}">${esc(typeLabels[t] ?? t)}</option>`
		}
		main += `</select></label>`
		main += `</div>`

		// Legend
		main += `<div id="graph-legend">`
		for (const t of types) {
			main += `<span><span class="dot" style="background:${typeColors[t] ?? '#8b949e'}"></span> ${esc(typeLabels[t] ?? t)}</span>`
		}
		main += `<span style="margin-left:1rem"><span class="dot" style="background:#58a6ff;border-radius:0;width:20px;height:3px"></span> Prerequis</span>`
		main += `<span><span class="dot" style="background:#3fb950;border-radius:0;width:20px;height:3px"></span> Declenche</span>`
		main += `</div>`

		// Graph container + tooltip + JSON data
		main += `<div id="evt-graph-wrap"><div id="graph-tooltip"></div></div>`
		main += `<script type="application/json" id="graph-data">${JSON.stringify(graphData)}</script>`

		main += `</div>`
	}

	// ---- Geographic strata ----
	for (const group of geoGroups) {
		const gSlug = slug(group.name)
		main += `<section data-geo-group="${gSlug}">`
		main += `<h2 id="${gSlug}">${esc(group.name)}</h2>`

		// Climate regions
		const gCR = group.climateRegionIds
			.map((id) => climateRegions.find((cr) => cr.id === id))
			.filter((cr): cr is ClimateRegion => !!cr)

		if (gCR.length > 0) {
			main += `<h3>Climat & Écologie</h3>`
			for (const cr of gCR) {
				main += `<h5>${esc(cr.zone)} — <code>${esc(cr.id)}</code></h5>`
				main += renderClimateHtml(cr)
			}
		}

		// Nations
		main += `<h3>Nations</h3>`
		for (const nid of group.nationIds) {
			const nat = nationById.get(nid)
			if (nat) main += renderNationHtml(nat)
		}

		main += `</section>`
	}

	// ---- Assemble full HTML ----
	return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ORY — Jeu de données original (An 1000)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<style>${CSS}</style>
</head>
<body>
<button class="burger" aria-label="Menu">☰</button>
<div class="layout">
<aside>
  <div class="sidebar-header">
    <h1><span>🌍</span> ORY — An 1000</h1>
    <input id="search" type="search" placeholder="Rechercher une nation…" autocomplete="off">
  </div>
  <nav class="nav-body">${nav}</nav>
  <div style="padding:.5rem 1rem;border-top:1px solid var(--bg4);font-size:.65rem;color:var(--fg3)">
    Généré le ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} · ${nations.length} nations · pop. ${fmt(totalPop)}
  </div>
</aside>
<main>${main}</main>
</div>
<script>${JS}</script>
<script>${GRAPH_JS}</script>
</body>
</html>`
}

// ============================================================================
// Execute
// ============================================================================

const html = buildHtml()
const outPath = resolve(process.cwd(), 'docs', 'GAME_ORIGINAL_DATASET.html')
writeFileSync(outPath, html, 'utf-8')

const sizeKB = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(0)
console.log(`✅ ${outPath}`)
console.log(`   ${sizeKB} Ko`)
