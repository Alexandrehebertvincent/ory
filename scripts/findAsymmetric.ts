import { nationWorldKnowledgeData } from '../packages/historical-data/src/seed/nationWorldKnowledge'

const wkMap = new Map(nationWorldKnowledgeData.map((x) => [x.nationId, x]))
const asymm: string[] = []
for (const a of nationWorldKnowledgeData) {
	for (const known of a.knownNations) {
		const b = wkMap.get(known)
		if (!b || !b.knownNations.includes(a.nationId)) {
			asymm.push(`${a.nationId} -> ${known}`)
		}
	}
}
console.log(`Asymmetric pairs (${asymm.length}):`)
// Group by target nation (the one missing the reverse)
const byTarget = new Map<string, string[]>()
for (const pair of asymm) {
	const [src, tgt] = pair.split(' -> ')
	if (!byTarget.has(tgt)) byTarget.set(tgt, [])
	byTarget.get(tgt)!.push(src)
}
for (const [tgt, srcs] of [...byTarget.entries()].sort(
	(a, b) => b[1].length - a[1].length,
)) {
	console.log(`  ${tgt} manque: ${srcs.join(', ')}`)
}
