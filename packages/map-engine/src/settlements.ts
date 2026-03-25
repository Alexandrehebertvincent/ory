// ============================================================================
// Settlement Linking — Lie chaque settlement à sa tuile hex la plus proche
// ============================================================================

import type { GeoCoord } from '../../shared/src/types/world'
import type { GridTile } from './grid'
import { geoToHex, hexDistance, hexTileId } from './hex'

/**
 * Trouve la tuile la plus proche d'une coordonnée géographique.
 * Utilise la conversion hex directe (O(1) au lieu de parcourir toutes les tuiles).
 */
export function findNearestTile(
	coord: GeoCoord,
	tileIndex: Map<string, GridTile>,
): GridTile | null {
	const hex = geoToHex(coord)
	const id = hexTileId(hex)

	// Essayer le hex exact
	const tile = tileIndex.get(id)
	if (tile) return tile

	// Si pas trouvé (bord de grille), chercher dans les voisins proches
	for (let dq = -2; dq <= 2; dq++) {
		for (let dr = -2; dr <= 2; dr++) {
			const candidateId = hexTileId({ q: hex.q + dq, r: hex.r + dr })
			const candidate = tileIndex.get(candidateId)
			if (candidate) return candidate
		}
	}

	return null
}

/**
 * Crée un index rapide des tuiles par ID.
 */
export function buildTileIndex(tiles: GridTile[]): Map<string, GridTile> {
	const index = new Map<string, GridTile>()
	for (const tile of tiles) {
		index.set(tile.id, tile)
	}
	return index
}
