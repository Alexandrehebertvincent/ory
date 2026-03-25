// ============================================================================
// Hex Grid Generation — Couvre le monde entier en hexagones de 25km
// ============================================================================

import type { GeoCoord } from '../../shared/src/types/world'
import { type HexCoord, geoToHex, hexToGeo, hexTileId } from './hex'

/** Limites de la grille en latitude/longitude */
export interface GridBounds {
	minLat: number
	maxLat: number
	minLng: number
	maxLng: number
}

/** Limites par défaut : monde entier habitable */
export const WORLD_BOUNDS: GridBounds = {
	minLat: -60, // Exclut l'Antarctique profond
	maxLat: 80, // Inclut l'Arctique (Thuél / proto-Inuit)
	minLng: -180,
	maxLng: 180,
}

export interface GridTile {
	hex: HexCoord
	id: string
	center: GeoCoord
}

/**
 * Génère tous les hex couvrant les limites données.
 * Stratégie : itérer en lat/lng par pas réguliers, convertir en hex, dédupliquer.
 */
export function generateHexGrid(bounds: GridBounds = WORLD_BOUNDS): GridTile[] {
	const seen = new Set<string>()
	const tiles: GridTile[] = []

	// Pas de balayage en degrés (~20km, plus fin que la taille hex pour ne rien rater)
	const latStep = 0.18
	const baseLngStep = 0.18

	for (let lat = bounds.minLat; lat <= bounds.maxLat; lat += latStep) {
		// Ajuster le pas de longitude à la latitude (les degrés rétrécissent vers les pôles)
		const cosLat = Math.cos((lat * Math.PI) / 180)
		if (cosLat < 0.05) continue // Skip les pôles extrêmes
		const lngStep = baseLngStep / cosLat

		for (let lng = bounds.minLng; lng < bounds.maxLng; lng += lngStep) {
			const hex = geoToHex({ lat, lng })
			const id = hexTileId(hex)

			if (seen.has(id)) continue
			seen.add(id)

			const center = hexToGeo(hex)

			// Vérifier que le centre est bien dans les limites
			if (
				center.lat < bounds.minLat ||
				center.lat > bounds.maxLat ||
				center.lng < bounds.minLng ||
				center.lng >= bounds.maxLng
			) {
				continue
			}

			tiles.push({ hex, id, center })
		}
	}

	return tiles
}
