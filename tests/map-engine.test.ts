// ============================================================================
// Tests — Map Engine
// ============================================================================

import { describe, expect, it } from 'vitest'
import {
	geoToHex,
	hexToGeo,
	hexNeighbors,
	hexDistance,
	hexTileId,
	HEX_SIZE_KM,
} from '../packages/map-engine/src/hex'
import { generateHexGrid } from '../packages/map-engine/src/grid'
import {
	pointInPolygon,
	findNationAtPoint,
} from '../packages/map-engine/src/pointInPoly'
import {
	assignTerrain,
	findClimateRegion,
} from '../packages/map-engine/src/terrain'
import {
	buildTileIndex,
	findNearestTile,
} from '../packages/map-engine/src/settlements'
import type { ClimateRegion } from '../packages/shared/src/types/world'

// ── Hex Math ──

describe('Hex Math', () => {
	it('hex(0,0) → geo(0,0)', () => {
		const geo = hexToGeo({ q: 0, r: 0 })
		expect(geo.lat).toBeCloseTo(0, 1)
		expect(geo.lng).toBeCloseTo(0, 1)
	})

	it('geoToHex ↔ hexToGeo roundtrip (Paris)', () => {
		const paris = { lat: 48.86, lng: 2.35 }
		const hex = geoToHex(paris)
		const back = hexToGeo(hex)
		// Doit être à moins de ~25km de l'original (taille d'un hex)
		const dLat = Math.abs(back.lat - paris.lat) * 111.32
		const dLng =
			Math.abs(back.lng - paris.lng) *
			111.32 *
			Math.cos((paris.lat * Math.PI) / 180)
		const distKm = Math.sqrt(dLat * dLat + dLng * dLng)
		expect(distKm).toBeLessThan(HEX_SIZE_KM)
	})

	it('hex a exactement 6 voisins', () => {
		const neighbors = hexNeighbors({ q: 5, r: 3 })
		expect(neighbors).toHaveLength(6)
		// Tous à distance 1
		for (const n of neighbors) {
			expect(hexDistance({ q: 5, r: 3 }, n)).toBe(1)
		}
	})

	it('hexDistance est symétrique', () => {
		const a = { q: 2, r: -3 }
		const b = { q: -1, r: 5 }
		expect(hexDistance(a, b)).toBe(hexDistance(b, a))
	})

	it('hexDistance(same, same) = 0', () => {
		expect(hexDistance({ q: 3, r: 7 }, { q: 3, r: 7 })).toBe(0)
	})

	it('hexTileId est déterministe', () => {
		expect(hexTileId({ q: 10, r: -5 })).toBe('tile_10_-5')
	})
})

// ── Grid Generation ──

describe('Grid Generation', () => {
	it('génère des tuiles pour une petite zone', () => {
		const tiles = generateHexGrid({
			minLat: 45,
			maxLat: 50,
			minLng: 0,
			maxLng: 10,
		})
		expect(tiles.length).toBeGreaterThan(10)
		expect(tiles.length).toBeLessThan(500)
		// Toutes les tuiles dans les limites
		for (const tile of tiles) {
			expect(tile.center.lat).toBeGreaterThanOrEqual(44) // Tolérance hex
			expect(tile.center.lat).toBeLessThanOrEqual(51)
		}
	})

	it('tous les IDs sont uniques', () => {
		const tiles = generateHexGrid({
			minLat: 40,
			maxLat: 55,
			minLng: -5,
			maxLng: 20,
		})
		const ids = new Set(tiles.map((t) => t.id))
		expect(ids.size).toBe(tiles.length)
	})
})

// ── Point in Polygon ──

describe('Point in Polygon', () => {
	const france = [
		{ lat: 51, lng: -1.5 },
		{ lat: 51, lng: 5 },
		{ lat: 48, lng: 7.5 },
		{ lat: 43, lng: 7 },
		{ lat: 42.5, lng: 3 },
		{ lat: 43, lng: -1.5 },
	]

	it('Paris est en France', () => {
		expect(pointInPolygon({ lat: 48.86, lng: 2.35 }, france)).toBe(true)
	})

	it("Londres n'est pas en France", () => {
		expect(pointInPolygon({ lat: 51.51, lng: -0.13 }, france)).toBe(false)
	})

	it('findNationAtPoint retourne la bonne nation', () => {
		const nations = [
			{ id: 'nat_france', territory: france },
			{
				id: 'nat_england',
				territory: [
					{ lat: 55.8, lng: -5.5 },
					{ lat: 55.8, lng: 1.5 },
					{ lat: 50.7, lng: 1.5 },
					{ lat: 50.7, lng: -5.5 },
				],
			},
		]
		expect(findNationAtPoint({ lat: 48.86, lng: 2.35 }, nations)).toBe(
			'nat_france',
		)
		expect(findNationAtPoint({ lat: 51.51, lng: -0.13 }, nations)).toBe(
			'nat_england',
		)
		expect(findNationAtPoint({ lat: 0, lng: 0 }, nations)).toBeNull()
	})
})

// ── Terrain Assignment ──

describe('Terrain Assignment', () => {
	const sampleClimate: ClimateRegion[] = [
		{
			id: 'clim_test_temperate',
			zone: 'temperate',
			area: [
				{ lat: 55, lng: -10 },
				{ lat: 55, lng: 25 },
				{ lat: 45, lng: 25 },
				{ lat: 45, lng: -10 },
			],
			avgTemperature: 10,
			avgRainfall: 750,
			seasonality: 7,
			disasterRisks: [],
		},
		{
			id: 'clim_test_arid',
			zone: 'arid',
			area: [
				{ lat: 35, lng: -10 },
				{ lat: 35, lng: 40 },
				{ lat: 20, lng: 40 },
				{ lat: 20, lng: -10 },
			],
			avgTemperature: 28,
			avgRainfall: 100,
			seasonality: 3,
			disasterRisks: [],
		},
	]

	it('montagne si élévation > 2500m', () => {
		const info = assignTerrain({ lat: 47, lng: 7 }, 3000, sampleClimate)
		expect(info.terrain).toBe('mountain')
	})

	it('plaine en zone tempérée basse altitude', () => {
		const info = assignTerrain({ lat: 50, lng: 5 }, 100, sampleClimate)
		expect(info.terrain).toBe('plain')
	})

	it('désert en zone aride', () => {
		const info = assignTerrain({ lat: 25, lng: 5 }, 200, sampleClimate)
		expect(info.terrain).toBe('desert')
	})

	it('océan si élévation très négative', () => {
		const info = assignTerrain({ lat: 50, lng: -30 }, -3000, sampleClimate)
		expect(info.terrain).toBe('ocean')
	})

	it('temperature entre 0 et 10', () => {
		const info = assignTerrain({ lat: 50, lng: 5 }, 100, sampleClimate)
		expect(info.temperature).toBeGreaterThanOrEqual(0)
		expect(info.temperature).toBeLessThanOrEqual(10)
	})

	it('findClimateRegion trouve la bonne zone', () => {
		const region = findClimateRegion({ lat: 50, lng: 5 }, sampleClimate)
		expect(region?.id).toBe('clim_test_temperate')
	})
})

// ── Settlement Linking ──

describe('Settlement Linking', () => {
	it('trouve la tuile la plus proche', () => {
		const tiles = generateHexGrid({
			minLat: 45,
			maxLat: 55,
			minLng: -5,
			maxLng: 15,
		})
		const index = buildTileIndex(tiles)
		const nearest = findNearestTile({ lat: 48.86, lng: 2.35 }, index)
		expect(nearest).not.toBeNull()
		// La tuile trouvée doit être à moins de ~25km
		if (nearest) {
			const dLat = Math.abs(nearest.center.lat - 48.86) * 111.32
			expect(dLat).toBeLessThan(50) // Tolérance large
		}
	})
})
