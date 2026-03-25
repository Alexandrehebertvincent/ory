// ============================================================================
// Script de téléchargement ETOPO1 simplifié via NOAA ERDDAP
// ============================================================================
// Usage : npx tsx scripts/downloadEtopo.ts
//
// Télécharge les élévations mondiales ETOPO1 (NOAA) à résolution réduite
// via le serveur ERDDAP (une seule requête HTTP, pas de clé API).
//
// Résolution : 0.5° (~55km) — largement suffisant pour interpoler sur
// des hexagones de 25km. Produit ~65K points (~400KB JSON).
//
// Source : NOAA National Centers for Environmental Information
// Données : domaine public (US Government work)
// ============================================================================

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

/** Grille régulière d'élévation */
interface EtopoGrid {
	source: string
	resolution: number // degrés
	minLat: number
	maxLat: number
	minLng: number
	maxLng: number
	rows: number // nombre de lignes (latitude)
	cols: number // nombre de colonnes (longitude)
	data: number[] // row-major, du nord (maxLat) au sud (minLat)
}

const OUTPUT_PATH = resolve(__dirname, '../data/etopo-grid.json')

// NOAA ERDDAP — ETOPO 2022 (successeur d'ETOPO1, même couverture, meilleure qualité)
// Stride 30 sur une grille 1 arc-minute = résolution 0.5°
// Format CSV pour parsing simple
const ERDDAP_URL =
	'https://coastwatch.pfeg.noaa.gov/erddap/griddap/etopo180.csv?altitude[(-60):30:(80)][(-180):30:(180)]'

async function download(): Promise<void> {
	if (existsSync(OUTPUT_PATH)) {
		console.log(`Le fichier existe déjà : ${OUTPUT_PATH}`)
		console.log('Supprimez-le pour re-télécharger.')
		return
	}

	console.log('Téléchargement ETOPO depuis NOAA ERDDAP...')
	console.log(`URL: ${ERDDAP_URL}`)
	console.log()

	const response = await fetch(ERDDAP_URL)
	if (!response.ok) {
		throw new Error(`ERDDAP error: ${response.status} ${response.statusText}`)
	}

	const csv = await response.text()
	console.log(`Réponse reçue : ${(csv.length / 1024).toFixed(0)} KB`)

	// Parser le CSV ERDDAP
	// Format: latitude,longitude,altitude
	// Ligne 0 = headers, Ligne 1 = unités, Ligne 2+ = données
	const lines = csv.split('\n')
	const dataLines = lines.slice(2).filter((l) => l.trim().length > 0)

	console.log(`Points de données : ${dataLines.length}`)

	// Extraire lat/lng/alt
	const points: Array<{ lat: number; lng: number; alt: number }> = []
	for (const line of dataLines) {
		const parts = line.split(',')
		if (parts.length < 3) continue
		points.push({
			lat: Number.parseFloat(parts[0]),
			lng: Number.parseFloat(parts[1]),
			alt: Number.parseFloat(parts[2]),
		})
	}

	if (points.length === 0) {
		throw new Error('Aucun point parsé — le format CSV a peut-être changé')
	}

	// Déterminer les bornes et la résolution
	const lats = [...new Set(points.map((p) => p.lat))].sort((a, b) => a - b)
	const lngs = [...new Set(points.map((p) => p.lng))].sort((a, b) => a - b)
	const step = lats.length > 1 ? lats[1] - lats[0] : 0.5

	const minLat = lats[0]
	const maxLat = lats[lats.length - 1]
	const minLng = lngs[0]
	const maxLng = lngs[lngs.length - 1]

	console.log(
		`Grille : lat [${minLat}, ${maxLat}], lng [${minLng}, ${maxLng}], step ${step}°`,
	)
	console.log(`Dimensions : ${lats.length} rows × ${lngs.length} cols`)

	// Construire la grille row-major (du sud au nord pour indexation cohérente)
	const rows = lats.length
	const cols = lngs.length

	// Index rapide lat/lng → index
	const latIdx = new Map<number, number>()
	const lngIdx = new Map<number, number>()
	lats.forEach((l, i) => latIdx.set(l, i))
	lngs.forEach((l, i) => lngIdx.set(l, i))

	const data = new Array<number>(rows * cols).fill(0)
	let filled = 0

	for (const p of points) {
		const r = latIdx.get(p.lat)
		const c = lngIdx.get(p.lng)
		if (r !== undefined && c !== undefined) {
			data[r * cols + c] = Math.round(p.alt)
			filled++
		}
	}

	console.log(`Points remplis : ${filled}/${rows * cols}`)

	const grid: EtopoGrid = {
		source: 'NOAA ETOPO 2022 via ERDDAP (coastwatch.pfeg.noaa.gov)',
		resolution: step,
		minLat,
		maxLat,
		minLng,
		maxLng,
		rows,
		cols,
		data,
	}

	// Sauvegarder
	const dir = dirname(OUTPUT_PATH)
	if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
	writeFileSync(OUTPUT_PATH, JSON.stringify(grid), 'utf8')

	const sizeKB = (JSON.stringify(grid).length / 1024).toFixed(0)
	console.log()
	console.log(`✅ Grille ETOPO sauvegardée : ${OUTPUT_PATH} (${sizeKB} KB)`)
	console.log(
		`   ${rows}×${cols} = ${rows * cols} points à ${step}° de résolution`,
	)
}

download().catch((err) => {
	console.error('❌ Erreur:', err)
	process.exit(1)
})
