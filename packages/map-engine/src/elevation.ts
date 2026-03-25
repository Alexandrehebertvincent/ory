// ============================================================================
// Elevation — Élévations ETOPO1 réelles + fallback procédural
// ============================================================================
// Stratégie L0 :
//   1. Si data/etopo-grid.json existe → interpolation bilinéaire sur données
//      NOAA réelles (0.5° ≈ 55km). Les côtes, océans, montagnes, plateaux
//      sont tous fidèles à la réalité.
//   2. Sinon → fallback procédural (bruit + chaînes montagneuses codées).
//
// Pour générer etopo-grid.json : npx tsx scripts/downloadEtopo.ts
//
// LOD fin (L1-L3) : réservé à l'API Open-Meteo à la demande (50-200 tuiles).
// ============================================================================

import { existsSync, readFileSync } from 'node:fs'
import type {
	ClimateRegion,
	GeoCoord,
	GeoPolygon,
} from '../../shared/src/types/world'

// ── Grille ETOPO ───────────────────────────────────────────────────────

/** Format de la grille sauvegardée par scripts/downloadEtopo.ts */
export interface EtopoGrid {
	source: string
	resolution: number
	minLat: number
	maxLat: number
	minLng: number
	maxLng: number
	rows: number
	cols: number
	data: number[]
}

let cachedGrid: EtopoGrid | null = null
let gridLoadAttempted = false

/**
 * Charge la grille ETOPO depuis le disque (cache en mémoire).
 */
export function loadEtopoGrid(path: string): EtopoGrid | null {
	if (gridLoadAttempted) return cachedGrid
	gridLoadAttempted = true

	if (!existsSync(path)) return null
	try {
		cachedGrid = JSON.parse(readFileSync(path, 'utf8')) as EtopoGrid
		return cachedGrid
	} catch {
		return null
	}
}

/** Réinitialise le cache mémoire (utile pour les tests) */
export function resetGridCache(): void {
	cachedGrid = null
	gridLoadAttempted = false
}

/**
 * Interpolation bilinéaire sur la grille ETOPO.
 */
export function interpolateEtopo(grid: EtopoGrid, coord: GeoCoord): number {
	// Position fractionnaire dans la grille
	const fRow = (coord.lat - grid.minLat) / grid.resolution
	const fCol = (coord.lng - grid.minLng) / grid.resolution

	const r0 = Math.floor(fRow)
	const c0 = Math.floor(fCol)
	const r1 = Math.min(r0 + 1, grid.rows - 1)
	const c1 = Math.min(c0 + 1, grid.cols - 1)

	if (r0 < 0 || r0 >= grid.rows || c0 < 0 || c0 >= grid.cols) return 0

	const fr = fRow - r0
	const fc = fCol - c0

	const v00 = grid.data[r0 * grid.cols + c0]
	const v01 = grid.data[r0 * grid.cols + c1]
	const v10 = grid.data[r1 * grid.cols + c0]
	const v11 = grid.data[r1 * grid.cols + c1]

	const v0 = v00 * (1 - fc) + v01 * fc
	const v1 = v10 * (1 - fc) + v11 * fc
	return Math.round(v0 * (1 - fr) + v1 * fr)
}

// ── Fallback procédural ────────────────────────────────────────────────

function hash2D(x: number, y: number): number {
	let h = x * 374761393 + y * 668265263
	h = ((h ^ (h >> 13)) * 1274126177) | 0
	return ((h ^ (h >> 16)) >>> 0) / 0xffffffff
}

function smoothstep(t: number): number {
	return t * t * (3 - 2 * t)
}

function valueNoise(x: number, y: number): number {
	const ix = Math.floor(x)
	const iy = Math.floor(y)
	const fx = smoothstep(x - ix)
	const fy = smoothstep(y - iy)
	const v00 = hash2D(ix, iy)
	const v10 = hash2D(ix + 1, iy)
	const v01 = hash2D(ix, iy + 1)
	const v11 = hash2D(ix + 1, iy + 1)
	const a = v00 + (v10 - v00) * fx
	const b = v01 + (v11 - v01) * fx
	return a + (b - a) * fy
}

function fbm(x: number, y: number, octaves = 4): number {
	let value = 0
	let amplitude = 0.5
	let frequency = 1
	let maxAmp = 0
	for (let i = 0; i < octaves; i++) {
		value += valueNoise(x * frequency, y * frequency) * amplitude
		maxAmp += amplitude
		amplitude *= 0.5
		frequency *= 2
	}
	return value / maxAmp
}

function pointInPoly(point: GeoCoord, polygon: GeoPolygon): boolean {
	let inside = false
	const n = polygon.length
	for (let i = 0, j = n - 1; i < n; j = i++) {
		const pi = polygon[i]
		const pj = polygon[j]
		if (
			pi.lat > point.lat !== pj.lat > point.lat &&
			point.lng <
				((pj.lng - pi.lng) * (point.lat - pi.lat)) / (pj.lat - pi.lat) + pi.lng
		) {
			inside = !inside
		}
	}
	return inside
}

interface MountainRange {
	points: GeoCoord[]
	width: number
	peakElev: number
}

const MOUNTAIN_RANGES: MountainRange[] = [
	{
		points: [
			{ lat: 35, lng: 72 },
			{ lat: 33, lng: 77 },
			{ lat: 28, lng: 84 },
			{ lat: 27, lng: 90 },
			{ lat: 28, lng: 97 },
		],
		width: 3,
		peakElev: 5500,
	},
	{
		points: [
			{ lat: 44, lng: 6 },
			{ lat: 46.5, lng: 9 },
			{ lat: 47, lng: 12 },
			{ lat: 47, lng: 15 },
		],
		width: 2,
		peakElev: 3500,
	},
	{
		points: [
			{ lat: 10, lng: -75 },
			{ lat: 5, lng: -76 },
			{ lat: -5, lng: -78 },
			{ lat: -15, lng: -70 },
			{ lat: -25, lng: -68 },
			{ lat: -35, lng: -70 },
			{ lat: -45, lng: -72 },
		],
		width: 3,
		peakElev: 5000,
	},
	{
		points: [
			{ lat: 35, lng: -5 },
			{ lat: 34, lng: 0 },
			{ lat: 33, lng: 3 },
			{ lat: 35, lng: 8 },
		],
		width: 2,
		peakElev: 3000,
	},
	{
		points: [
			{ lat: 52, lng: 59 },
			{ lat: 56, lng: 59 },
			{ lat: 60, lng: 60 },
			{ lat: 64, lng: 60 },
			{ lat: 68, lng: 65 },
		],
		width: 2,
		peakElev: 1500,
	},
	{
		points: [
			{ lat: 60, lng: 7 },
			{ lat: 63, lng: 12 },
			{ lat: 66, lng: 15 },
			{ lat: 69, lng: 19 },
		],
		width: 2.5,
		peakElev: 2000,
	},
	{
		points: [
			{ lat: 48.5, lng: 17 },
			{ lat: 48, lng: 22 },
			{ lat: 46, lng: 24 },
			{ lat: 45.5, lng: 25 },
		],
		width: 1.5,
		peakElev: 2000,
	},
	{
		points: [
			{ lat: 43, lng: 40 },
			{ lat: 42.5, lng: 44 },
			{ lat: 42, lng: 48 },
		],
		width: 1.5,
		peakElev: 4500,
	},
	{
		points: [
			{ lat: 13, lng: 38 },
			{ lat: 10, lng: 39 },
			{ lat: 7, lng: 38 },
		],
		width: 3,
		peakElev: 3500,
	},
	{
		points: [
			{ lat: 34, lng: 47 },
			{ lat: 32, lng: 50 },
			{ lat: 29, lng: 52 },
			{ lat: 27, lng: 55 },
		],
		width: 2,
		peakElev: 3500,
	},
	{
		points: [
			{ lat: 43, lng: 72 },
			{ lat: 42, lng: 78 },
			{ lat: 41, lng: 82 },
		],
		width: 2.5,
		peakElev: 5000,
	},
	{
		points: [
			{ lat: 33, lng: 80 },
			{ lat: 34, lng: 88 },
			{ lat: 35, lng: 95 },
			{ lat: 33, lng: 100 },
		],
		width: 4,
		peakElev: 4500,
	},
	{
		points: [
			{ lat: -29, lng: 29 },
			{ lat: -31, lng: 28 },
			{ lat: -33, lng: 27 },
		],
		width: 2,
		peakElev: 2500,
	},
	{
		points: [
			{ lat: 35, lng: -84 },
			{ lat: 38, lng: -80 },
			{ lat: 42, lng: -76 },
			{ lat: 45, lng: -71 },
		],
		width: 2,
		peakElev: 1500,
	},
	{
		points: [
			{ lat: 35, lng: -106 },
			{ lat: 40, lng: -106 },
			{ lat: 45, lng: -110 },
			{ lat: 50, lng: -115 },
			{ lat: 55, lng: -122 },
		],
		width: 3,
		peakElev: 3500,
	},
]

function distToSegment(p: GeoCoord, a: GeoCoord, b: GeoCoord): number {
	const dx = b.lng - a.lng
	const dy = b.lat - a.lat
	const len2 = dx * dx + dy * dy
	if (len2 === 0) return Math.sqrt((p.lng - a.lng) ** 2 + (p.lat - a.lat) ** 2)
	let t = ((p.lng - a.lng) * dx + (p.lat - a.lat) * dy) / len2
	t = Math.max(0, Math.min(1, t))
	const px = a.lng + t * dx
	const py = a.lat + t * dy
	return Math.sqrt((p.lng - px) ** 2 + (p.lat - py) ** 2)
}

function mountainBonus(coord: GeoCoord): number {
	let maxBonus = 0
	for (const range of MOUNTAIN_RANGES) {
		for (let i = 0; i < range.points.length - 1; i++) {
			const dist = distToSegment(coord, range.points[i], range.points[i + 1])
			if (dist < range.width) {
				const factor = 1 - (dist / range.width) ** 2
				const noise = fbm(coord.lng * 0.5, coord.lat * 0.5, 3) * 0.3 + 0.7
				const bonus = range.peakElev * factor * noise
				if (bonus > maxBonus) maxBonus = bonus
			}
		}
	}
	return maxBonus
}

function computeProceduralElevation(
	coord: GeoCoord,
	nations: Array<{ id: string; territory: GeoPolygon }>,
): number {
	const isLand = nations.some((n) => pointInPoly(coord, n.territory))
	if (!isLand) {
		const noise = fbm(coord.lng * 0.01, coord.lat * 0.01, 3)
		return -200 - noise * 4000
	}
	const noise = fbm(coord.lng * 0.03, coord.lat * 0.03, 4)
	let elevation = 20 + noise * 400
	const mtn = mountainBonus(coord)
	if (mtn > 0) elevation = Math.max(elevation, mtn)
	return Math.round(elevation)
}

// ── API publique ───────────────────────────────────────────────────────

export interface ElevationContext {
	nations: Array<{ id: string; territory: GeoPolygon }>
	climateRegions: ClimateRegion[]
	etopoGridPath?: string
}

/**
 * Calcule les élévations pour toutes les tuiles.
 *
 * Si etopo-grid.json est disponible → interpolation ETOPO (données réelles).
 * Sinon → fallback procédural (bruit + montagnes codées).
 */
export function computeAllElevations(
	coords: GeoCoord[],
	ctx: ElevationContext,
	onProgress?: (done: number, total: number) => void,
): Map<string, number> {
	const results = new Map<string, number>()

	// Tenter de charger la grille ETOPO
	const grid = ctx.etopoGridPath ? loadEtopoGrid(ctx.etopoGridPath) : null

	const mode = grid ? 'ETOPO' : 'procédural'

	for (let i = 0; i < coords.length; i++) {
		const c = coords[i]
		const elev = grid
			? interpolateEtopo(grid, c)
			: computeProceduralElevation(c, ctx.nations)
		results.set(coordKey(c), elev)
		if (onProgress && i % 10000 === 0) {
			onProgress(i, coords.length)
		}
	}
	onProgress?.(coords.length, coords.length)

	return results
}

/** Clé de cache pour une coordonnée */
export function coordKey(c: GeoCoord): string {
	return `${c.lat.toFixed(4)},${c.lng.toFixed(4)}`
}
