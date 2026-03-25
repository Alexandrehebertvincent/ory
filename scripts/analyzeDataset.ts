/**
 * analyzeDataset.ts
 *
 * Analyse statistique du WorldSnapshot an 1000.
 * Identifie les déséquilibres, lacunes et distributions.
 *
 * Usage : npx tsx scripts/analyzeDataset.ts
 */

import { worldSnapshot1000 as w } from '../packages/historical-data/src/seed/index'

const SEP = '─'.repeat(72)
const THICK = '═'.repeat(72)

function pct(n: number, total: number): string {
	return total > 0 ? `${((n / total) * 100).toFixed(1)}%` : '—'
}

function bar(n: number, max: number, width = 30): string {
	const filled = Math.round((n / max) * width)
	return '█'.repeat(filled) + '░'.repeat(width - filled)
}

function padEnd(s: string, n: number): string {
	return s.length >= n ? s.slice(0, n) : s + ' '.repeat(n - s.length)
}

console.log()
console.log(THICK)
console.log('  ANALYSE STATISTIQUE — ORY WorldSnapshot An 1000')
console.log(THICK)

// ============================================================================
// 1. Vue d'ensemble
// ============================================================================

console.log()
console.log("▸ 1. VUE D'ENSEMBLE")
console.log(SEP)

const datasets = [
	['Nations', w.nations.length],
	['Settlements', w.settlements.length],
	['Religions', w.religions.length],
	['Technologies', w.technologies.length],
	['Commodities', w.commodities.length],
	['Languages', w.languages.length],
	['Diseases', w.diseases.length],
	['TradeRoutes', w.tradeRoutes.length],
	['ClimateRegions', w.climateRegions.length],
	['TransportVehicles', w.transportVehicles.length],
	['HistoricalEvents', w.historicalEvents.length],
	['EventTemplates', w.eventTemplates.length],
	['InformationVectors', w.informationVectors.length],
	['RumorTemplates', w.rumorTemplates.length],
	['AdvisorProfiles', w.advisorProfiles.length],
	['KnowledgeEntries', w.knowledgeEntries.length],
	['FeasibilityRules', w.feasibilityRules.length],
	['ConstructionRecipes', w.constructionRecipes.length],
	['SocialMobilityPaths', w.socialMobilityPaths.length],
	['CulturalNamePools', w.culturalNamePools.length],
	['Infrastructure', w.infrastructure.length],
	['Ecology', w.ecology.length],
	['DailyLife', w.dailyLife.length],
	['Populations', w.populations.length],
] as [string, number][]

for (const [name, count] of datasets) {
	console.log(`  ${padEnd(name, 24)} ${count}`)
}

// ============================================================================
// 2. Événements historiques — par siècle
// ============================================================================

console.log()
console.log('▸ 2. ÉVÉNEMENTS HISTORIQUES PAR SIÈCLE')
console.log(SEP)

const eventsByCentury = new Map<number, number>()
for (const evt of w.historicalEvents) {
	const century = Math.floor(evt.year / 100) * 100
	eventsByCentury.set(century, (eventsByCentury.get(century) ?? 0) + 1)
}
const centuries = [...eventsByCentury.entries()].sort((a, b) => a[0] - b[0])
const maxEvents = Math.max(...centuries.map(([, c]) => c))
for (const [century, count] of centuries) {
	console.log(`  ${padEnd(`${century}s`, 8)} ${bar(count, maxEvents)} ${count}`)
}

// ============================================================================
// 3. Événements par catégorie
// ============================================================================

console.log()
console.log('▸ 3. ÉVÉNEMENTS PAR CATÉGORIE')
console.log(SEP)

const eventsByType = new Map<string, number>()
for (const evt of w.historicalEvents) {
	eventsByType.set(evt.type, (eventsByType.get(evt.type) ?? 0) + 1)
}
const types = [...eventsByType.entries()].sort((a, b) => b[1] - a[1])
const maxType = Math.max(...types.map(([, c]) => c))
for (const [type, count] of types) {
	console.log(
		`  ${padEnd(type, 24)} ${bar(count, maxType, 20)} ${count} (${pct(count, w.historicalEvents.length)})`,
	)
}

// ============================================================================
// 4. Événements par région (nations les plus couvertes)
// ============================================================================

console.log()
console.log('▸ 4. ÉVÉNEMENTS PAR NATION (top 20)')
console.log(SEP)

const eventsByNation = new Map<string, number>()
for (const evt of w.historicalEvents) {
	for (const nid of evt.affectedNationIds) {
		eventsByNation.set(nid, (eventsByNation.get(nid) ?? 0) + 1)
	}
}
const nationEventsSorted = [...eventsByNation.entries()].sort(
	(a, b) => b[1] - a[1],
)
const maxNationEvents = Math.max(...nationEventsSorted.map(([, c]) => c))
for (const [nid, count] of nationEventsSorted.slice(0, 20)) {
	const name = w.nations.find((n) => n.id === nid)?.name ?? nid
	console.log(
		`  ${padEnd(name, 28)} ${bar(count, maxNationEvents, 20)} ${count}`,
	)
}
const nationsWithZeroEvents = [
	...new Set(w.nations.filter((n: any) => !n.startYear).map((n) => n.id)),
].filter((nid) => !eventsByNation.has(nid))
if (nationsWithZeroEvents.length) {
	console.log(
		`\n  ⚠ Nations sans aucun événement: ${nationsWithZeroEvents.join(', ')}`,
	)
}

// ============================================================================
// 5. Technologies — par catégorie
// ============================================================================

console.log()
console.log('▸ 5. TECHNOLOGIES PAR CATÉGORIE')
console.log(SEP)

const techsByCat = new Map<string, number>()
for (const t of w.technologies) {
	techsByCat.set(t.category, (techsByCat.get(t.category) ?? 0) + 1)
}
const cats = [...techsByCat.entries()].sort((a, b) => b[1] - a[1])
const maxCat = Math.max(...cats.map(([, c]) => c))
for (const [cat, count] of cats) {
	console.log(`  ${padEnd(cat, 24)} ${bar(count, maxCat, 20)} ${count}`)
}

// ============================================================================
// 6. Technologies — par époque (yearAvailable)
// ============================================================================

console.log()
console.log('▸ 6. TECHNOLOGIES PAR ÉPOQUE')
console.log(SEP)

const techsByEra = new Map<string, number>()
for (const t of w.technologies) {
	const year = t.yearAvailable ?? 0
	let era: string
	if (year <= 1000) era = '≤1000 (disponibles)'
	else if (year <= 1300) era = '1001-1300'
	else if (year <= 1500) era = '1301-1500'
	else if (year <= 1700) era = '1501-1700'
	else if (year <= 1900) era = '1701-1900'
	else era = '1901+'
	techsByEra.set(era, (techsByEra.get(era) ?? 0) + 1)
}
const eras = [
	'≤1000 (disponibles)',
	'1001-1300',
	'1301-1500',
	'1501-1700',
	'1701-1900',
	'1901+',
]
const maxEra = Math.max(...eras.map((e) => techsByEra.get(e) ?? 0))
for (const era of eras) {
	const count = techsByEra.get(era) ?? 0
	console.log(`  ${padEnd(era, 24)} ${bar(count, maxEra, 20)} ${count}`)
}

// ============================================================================
// 7. Techs débloquées par nation (top/bottom 10)
// ============================================================================

console.log()
console.log('▸ 7. TECHS DÉBLOQUÉES PAR NATION')
console.log(SEP)

const techCounts = w.nationTechnologies
	.map((nt) => ({
		nationId: nt.nationId,
		name: w.nations.find((n) => n.id === nt.nationId)?.name ?? nt.nationId,
		count: nt.unlockedTechs.length,
	}))
	.sort((a, b) => b.count - a.count)

const maxTech = Math.max(...techCounts.map((t) => t.count))
console.log('  Top 10 :')
for (const { name, count } of techCounts.slice(0, 10)) {
	console.log(`    ${padEnd(name, 28)} ${bar(count, maxTech, 20)} ${count}`)
}
console.log('  Bottom 10 :')
for (const { name, count } of techCounts.slice(-10)) {
	console.log(`    ${padEnd(name, 28)} ${bar(count, maxTech, 20)} ${count}`)
}

// ============================================================================
// 8. Démographie
// ============================================================================

console.log()
console.log('▸ 8. DÉMOGRAPHIE')
console.log(SEP)

const totalPop = w.populations.reduce((s, p) => s + p.total, 0)
console.log(
	`  Population mondiale totale : ${(totalPop / 1_000_000).toFixed(1)}M`,
)

const popSorted = [...w.populations].sort((a, b) => b.total - a.total)
const maxPop = popSorted[0].total
console.log('\n  Top 10 nations par population :')
for (const p of popSorted.slice(0, 10)) {
	const name = w.nations.find((n) => n.id === p.nationId)?.name ?? p.nationId
	console.log(
		`    ${padEnd(name, 28)} ${bar(p.total, maxPop, 20)} ${(p.total / 1_000_000).toFixed(1)}M`,
	)
}

const les = [...w.populations].sort(
	(a, b) => b.lifeExpectancy - a.lifeExpectancy,
)
console.log(
	`\n  Espérance de vie : ${Math.min(...les.map((p) => p.lifeExpectancy))} - ${Math.max(...les.map((p) => p.lifeExpectancy))} ans`,
)

// ============================================================================
// 9. Économie
// ============================================================================

console.log()
console.log('▸ 9. ÉCONOMIE')
console.log(SEP)

const ecoSorted = [...w.nationEconomies].sort(
	(a, b) => b.gdpEstimate - a.gdpEstimate,
)
const maxGdp = ecoSorted[0].gdpEstimate
console.log('  Top 10 PIB :')
for (const e of ecoSorted.slice(0, 10)) {
	const name = w.nations.find((n) => n.id === e.nationId)?.name ?? e.nationId
	console.log(
		`    ${padEnd(name, 28)} ${bar(e.gdpEstimate, maxGdp, 20)} ${e.gdpEstimate}`,
	)
}

// ============================================================================
// 10. DailyLife — couverture par classes
// ============================================================================

console.log()
console.log('▸ 10. DAILYLIFE — COUVERTURE')
console.log(SEP)

const activeNations = w.nations.filter(
	(n: any) => !n.startYear || n.startYear <= 1000,
)
const classCounts = new Map<string, number>()
for (const dl of w.dailyLife) {
	classCounts.set(dl.socialClass, (classCounts.get(dl.socialClass) ?? 0) + 1)
}
const classes = [...classCounts.entries()].sort((a, b) => b[1] - a[1])
console.log(
	`  ${activeNations.length} nations actives × ${classes.length} classes = ${activeNations.length * classes.length} combinaisons possibles`,
)
console.log(
	`  ${w.dailyLife.length} entrées existantes (${pct(w.dailyLife.length, activeNations.length * classes.length)} couverture)`,
)
console.log()
for (const [cls, count] of classes) {
	console.log(
		`  ${padEnd(cls, 24)} ${count}/${activeNations.length} nations (${pct(count, activeNations.length)})`,
	)
}

// ============================================================================
// 11. Knowledge Entries — par domaine
// ============================================================================

console.log()
console.log('▸ 11. KNOWLEDGE ENTRIES PAR DOMAINE')
console.log(SEP)

const keDomains = new Map<string, number>()
for (const ke of w.knowledgeEntries) {
	keDomains.set(ke.domain, (keDomains.get(ke.domain) ?? 0) + 1)
}
const domains = [...keDomains.entries()].sort((a, b) => b[1] - a[1])
const maxDomain = Math.max(...domains.map(([, c]) => c))
for (const [domain, count] of domains) {
	console.log(`  ${padEnd(domain, 24)} ${bar(count, maxDomain, 15)} ${count}`)
}

// ============================================================================
// 12. Connaissances mondiales — symétrie
// ============================================================================

console.log()
console.log('▸ 12. KNOWNATIONS — SYMÉTRIE')
console.log(SEP)

const wkMap = new Map(w.nationWorldKnowledge.map((x) => [x.nationId, x]))
let totalPairs = 0
let symmetricPairs = 0
for (const a of w.nationWorldKnowledge) {
	for (const known of a.knownNations) {
		totalPairs++
		const b = wkMap.get(known)
		if (b && b.knownNations.includes(a.nationId)) symmetricPairs++
	}
}
console.log(`  Paires totales : ${totalPairs}`)
console.log(
	`  Paires symétriques : ${symmetricPairs} (${pct(symmetricPairs, totalPairs)})`,
)
console.log(`  Paires asymétriques : ${totalPairs - symmetricPairs}`)

// ============================================================================
// 13. Settlements par nation
// ============================================================================

console.log()
console.log('▸ 13. SETTLEMENTS PAR NATION')
console.log(SEP)

const settlementsByNation = new Map<string, number>()
for (const s of w.settlements) {
	settlementsByNation.set(
		s.nationId,
		(settlementsByNation.get(s.nationId) ?? 0) + 1,
	)
}
const nationsOnlyCapital = activeNations.filter(
	(n) => (settlementsByNation.get(n.id) ?? 0) <= 1,
)
console.log(`  Total settlements : ${w.settlements.length}`)
console.log(
	`  Moyenne par nation : ${(w.settlements.length / activeNations.length).toFixed(1)}`,
)
console.log(
	`  Nations avec seulement 1 settlement : ${nationsOnlyCapital.length}/${activeNations.length}`,
)
if (nationsOnlyCapital.length > 0) {
	console.log(`    ${nationsOnlyCapital.map((n) => n.id).join(', ')}`)
}

// ============================================================================
// 14. Routes commerciales
// ============================================================================

console.log()
console.log('▸ 14. ROUTES COMMERCIALES')
console.log(SEP)

console.log(`  Total routes : ${w.tradeRoutes.length}`)
const nationsOnRoutes = new Set<string>()
for (const tr of w.tradeRoutes) {
	for (const nid of tr.connectsNations) nationsOnRoutes.add(nid)
}
const nationsWithoutRoutes = activeNations.filter(
	(n) => !nationsOnRoutes.has(n.id),
)
console.log(
	`  Nations connectées : ${nationsOnRoutes.size}/${activeNations.length}`,
)
if (nationsWithoutRoutes.length) {
	console.log(
		`  Nations sans route commerciale : ${nationsWithoutRoutes.map((n) => n.id).join(', ')}`,
	)
}

// ============================================================================
// Résumé des lacunes
// ============================================================================

console.log()
console.log(THICK)
console.log('  RÉSUMÉ DES LACUNES')
console.log(THICK)
console.log()

const gaps: string[] = []
if (nationsWithZeroEvents.length)
	gaps.push(`${nationsWithZeroEvents.length} nations sans événement historique`)
if (nationsOnlyCapital.length)
	gaps.push(`${nationsOnlyCapital.length} nations avec un seul settlement`)
if (nationsWithoutRoutes.length)
	gaps.push(`${nationsWithoutRoutes.length} nations sans route commerciale`)

const dlCoverage = w.dailyLife.length / (activeNations.length * classes.length)
if (dlCoverage < 0.5)
	gaps.push(`DailyLife à ${(dlCoverage * 100).toFixed(0)}% de couverture`)

if (w.knowledgeEntries.length < 50)
	gaps.push(
		`Seulement ${w.knowledgeEntries.length} knowledge entries (cible: 100+)`,
	)

if (w.tradeRoutes.length < 20)
	gaps.push(
		`Seulement ${w.tradeRoutes.length} routes commerciales (cible: 25+)`,
	)

const asymRatio =
	totalPairs > 0 ? (totalPairs - symmetricPairs) / totalPairs : 0
if (asymRatio > 0.1)
	gaps.push(
		`${totalPairs - symmetricPairs} paires knownNations asymétriques (${(asymRatio * 100).toFixed(0)}%)`,
	)

if (gaps.length === 0) {
	console.log('  ✅ Aucune lacune majeure détectée !')
} else {
	for (const gap of gaps) {
		console.log(`  ⚠ ${gap}`)
	}
}
console.log()
