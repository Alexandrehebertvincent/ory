// ============================================================================
// Script de génération de la carte du monde — An 1000
// ============================================================================
// Usage : npx tsx scripts/generateMap.ts
//
// Génère la grille hex 25km couvrant le monde entier, récupère les élévations
// réelles via ETOPO, assigne terrains/nations/settlements, et sauvegarde
// le résultat dans packages/historical-data/src/seed/mapTiles.generated.json
// ============================================================================

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { climateRegions } from '../packages/historical-data/src/seed/climateRegions'
import { nations } from '../packages/historical-data/src/seed/nations'
import { settlements } from '../packages/historical-data/src/seed/settlements'
import { generateWorldMap } from '../packages/map-engine/src/generate'

const ETOPO_PATH = resolve(__dirname, '../data/etopo-grid.json')

async function main() {
	console.log(
		'╔══════════════════════════════════════════════════════════════╗',
	)
	console.log('║          ORY — Génération de la carte du monde             ║')
	console.log('║          Hex 25km · Monde entier · Élévations ETOPO        ║')
	console.log(
		'╚══════════════════════════════════════════════════════════════╝',
	)
	console.log()

	const startTime = Date.now()

	const result = await generateWorldMap(
		{
			nations: nations.map((n) => ({ id: n.id, territory: n.territory })),
			settlements: settlements.map((s) => ({
				id: s.id,
				coord: s.coord,
				nationId: s.nationId,
			})),
			climateRegions,
			etopoGridPath: ETOPO_PATH,
		},
		(step, detail) => {
			const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
			console.log(`  [${elapsed}s] [${step}] ${detail}`)
		},
	)

	// Afficher les stats
	console.log()
	console.log(
		'════════════════════════════════════════════════════════════════',
	)
	console.log('  RÉSULTAT')
	console.log(
		'════════════════════════════════════════════════════════════════',
	)
	console.log(`  Total tuiles      : ${result.stats.totalTiles}`)
	console.log(`  Tuiles terrestres : ${result.stats.landTiles}`)
	console.log(`  Tuiles océan      : ${result.stats.oceanTiles}`)
	console.log(`  Tuiles nationales : ${result.stats.nationTiles}`)
	console.log(
		`  Settlements liés  : ${result.settlementTileMap.size}/${settlements.length}`,
	)

	if (result.stats.unmappedSettlements.length > 0) {
		console.log(
			`  ⚠ Settlements non liés : ${result.stats.unmappedSettlements.join(', ')}`,
		)
	}

	// Détail par nation
	console.log()
	console.log('  Tuiles par nation (top 20) :')
	const nationEntries = [...result.nationTileMap.entries()]
		.sort((a, b) => b[1].length - a[1].length)
		.slice(0, 20)
	for (const [nationId, tileIds] of nationEntries) {
		const name = nations.find((n) => n.id === nationId)?.name ?? nationId
		console.log(`    ${name}: ${tileIds.length} tuiles`)
	}

	// Répartition des terrains
	console.log()
	console.log('  Répartition des terrains :')
	const terrainCounts = new Map<string, number>()
	for (const tile of result.tiles) {
		terrainCounts.set(tile.terrain, (terrainCounts.get(tile.terrain) ?? 0) + 1)
	}
	for (const [terrain, count] of [...terrainCounts.entries()].sort(
		(a, b) => b[1] - a[1],
	)) {
		const pct = ((count / result.tiles.length) * 100).toFixed(1)
		console.log(`    ${terrain}: ${count} (${pct}%)`)
	}

	// Sauvegarder
	const outputPath = resolve(
		__dirname,
		'../packages/historical-data/src/seed/mapTiles.generated.json',
	)
	const output = {
		generatedAt: new Date().toISOString(),
		hexSizeKm: 25,
		bounds: { minLat: -60, maxLat: 72, minLng: -180, maxLng: 180 },
		totalTiles: result.tiles.length,
		tiles: result.tiles,
	}

	writeFileSync(outputPath, JSON.stringify(output, null, '\t'), 'utf8')
	console.log()
	console.log(`  ✅ Carte sauvegardée : ${outputPath}`)

	const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
	console.log(`  ⏱ Temps total : ${elapsed}s`)
}

main().catch((err) => {
	console.error('❌ Erreur:', err)
	process.exit(1)
})
