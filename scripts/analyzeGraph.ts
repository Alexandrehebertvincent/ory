import { historicalEvents } from '../packages/historical-data/src/seed/historicalEvents'

interface Node {
	id: string
	name: string
	year: number
	requiredBy: string[]
	requires: string[]
	triggers: string[]
	triggeredBy: string[]
}

const nodes = new Map<string, Node>()

for (const evt of historicalEvents) {
	nodes.set(evt.id, {
		id: evt.id,
		name: evt.name,
		year: evt.year,
		requiredBy: [],
		requires: (evt as any).triggerConditions?.requiredEventIds || [],
		triggers: (evt as any).effects?.triggerEventIds || [],
		triggeredBy: [],
	})
}

for (const evt of historicalEvents) {
	const reqs: string[] = (evt as any).triggerConditions?.requiredEventIds || []
	for (const req of reqs) {
		const target = nodes.get(req)
		if (target) target.requiredBy.push(evt.id)
	}
	const trigs: string[] = (evt as any).effects?.triggerEventIds || []
	for (const trig of trigs) {
		const target = nodes.get(trig)
		if (target) target.triggeredBy.push(evt.id)
	}
}

const orphans: Node[] = []
const roots: Node[] = []
const leaves: Node[] = []
const connected: Node[] = []

for (const node of nodes.values()) {
	const hasIn = node.requires.length > 0 || node.triggeredBy.length > 0
	const hasOut = node.requiredBy.length > 0 || node.triggers.length > 0
	if (!hasIn && !hasOut) orphans.push(node)
	else if (!hasIn && hasOut) roots.push(node)
	else if (hasIn && !hasOut) leaves.push(node)
	else connected.push(node)
}

console.log('\n=== STATS ===')
console.log('Total events: ' + historicalEvents.length)
console.log('Connected (in+out): ' + connected.length)
console.log('Roots (out only): ' + roots.length)
console.log('Leaves (in only): ' + leaves.length)
console.log('Orphans (isolated): ' + orphans.length)

console.log('\n=== ORPHELINS (aucun lien) ===')
for (const o of orphans.sort((a, b) => a.year - b.year)) {
	console.log('  ' + o.year + ' | ' + o.id + ' | ' + o.name)
}

console.log("\n=== RACINES (pas de prerequis, requis par d'autres) ===")
for (const r of roots.sort((a, b) => a.year - b.year)) {
	console.log(
		'  ' +
			r.year +
			' | ' +
			r.id +
			' -> requis par: ' +
			r.requiredBy.join(', ') +
			(r.triggers.length ? ' | triggers: ' + r.triggers.join(', ') : ''),
	)
}

console.log("\n=== FEUILLES (a des prerequis, personne ne depend d'eux) ===")
for (const l of leaves.sort((a, b) => a.year - b.year)) {
	console.log(
		'  ' + l.year + ' | ' + l.id + ' | requires: ' + l.requires.join(', '),
	)
}

console.log('\n=== REFERENCES CASSEES ===')
let broken = 0
for (const evt of historicalEvents) {
	const reqs: string[] = (evt as any).triggerConditions?.requiredEventIds || []
	for (const req of reqs) {
		if (!nodes.has(req)) {
			console.log('  ' + evt.id + ' references inconnu: ' + req)
			broken++
		}
	}
	const trigs: string[] = (evt as any).effects?.triggerEventIds || []
	for (const trig of trigs) {
		if (!nodes.has(trig)) {
			console.log('  ' + evt.id + ' triggers inconnu: ' + trig)
			broken++
		}
	}
}
if (broken === 0) console.log('  (aucune)')

console.log('\n=== GRAPHE COMPLET ===')
for (const node of [...nodes.values()].sort((a, b) => a.year - b.year)) {
	const parts: string[] = []
	if (node.requires.length) parts.push('req: ' + node.requires.join(', '))
	if (node.requiredBy.length) parts.push('reqBy: ' + node.requiredBy.join(', '))
	if (node.triggers.length) parts.push('trig: ' + node.triggers.join(', '))
	if (node.triggeredBy.length)
		parts.push('trigBy: ' + node.triggeredBy.join(', '))
	console.log(
		'  ' +
			node.year +
			' | ' +
			node.id +
			' | ' +
			(parts.join(' | ') || '(ISOLE)'),
	)
}
