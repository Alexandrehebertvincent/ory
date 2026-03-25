// ============================================================================
// Map Generation Pipeline — Orchestre la génération complète de la carte
// ============================================================================

import type {
	ClimateRegion,
	EntityId,
	GeoPolygon,
	MapTile,
} from '../../shared/src/types/world'
import { computeAllElevations, coordKey } from './elevation'
import {
	type GridBounds,
	type GridTile,
	WORLD_BOUNDS,
	generateHexGrid,
} from './grid'
import { findNationAtPoint } from './pointInPoly'
import { buildTileIndex, findNearestTile } from './settlements'
import { assignTerrain } from './terrain'

/** Données d'entrée pour la génération */
export interface GenerateInput {
	nations: Array<{ id: EntityId; territory: GeoPolygon }>
	settlements: Array<{
		id: EntityId
		coord: { lat: number; lng: number }
		nationId: EntityId
	}>
	climateRegions: ClimateRegion[]
	bounds?: GridBounds
	etopoGridPath?: string
}

/** Résultat de la génération */
export interface GenerateResult {
	tiles: MapTile[]
	/** Mapping settlementId → tileId */
	settlementTileMap: Map<string, string>
	/** Mapping nationId → tileId[] */
	nationTileMap: Map<string, string[]>
	stats: {
		totalTiles: number
		landTiles: number
		oceanTiles: number
		nationTiles: number
		unmappedSettlements: string[]
	}
}

/**
 * Génère la carte complète du monde.
 *
 * Pipeline :
 * 1. Générer la grille hexagonale
 * 2. Calculer les élévations (ETOPO réel ou procédural)
 * 3. Assigner terrain, température, précipitations, ressources
 * 4. Assigner les tuiles aux nations (point-dans-polygone)
 * 5. Lier les settlements à leurs tuiles
 */
export async function generateWorldMap(
	input: GenerateInput,
	onProgress?: (step: string, detail: string) => void,
): Promise<GenerateResult> {
	const bounds = input.bounds ?? WORLD_BOUNDS

	// ── Étape 1 : Grille hex ──
	onProgress?.('grid', 'Génération de la grille hexagonale...')
	const gridTiles = generateHexGrid(bounds)
	onProgress?.('grid', `${gridTiles.length} tuiles générées`)

	// ── Étape 2 : Élévations ──
	onProgress?.(
		'elevation',
		`Calcul des élévations pour ${gridTiles.length} tuiles...`,
	)
	const coords = gridTiles.map((t) => t.center)
	const elevations = computeAllElevations(
		coords,
		{
			nations: input.nations,
			climateRegions: input.climateRegions,
			etopoGridPath: input.etopoGridPath,
		},
		(done, total) => {
			onProgress?.('elevation', `${done}/${total} coordonnées`)
		},
	)
	onProgress?.('elevation', 'Élévations calculées')

	// ── Étape 3 : Terrain ──
	onProgress?.('terrain', 'Assignation du terrain...')
	const mapTiles: MapTile[] = gridTiles.map((gt) => {
		const elev = elevations.get(coordKey(gt.center)) ?? 0
		const info = assignTerrain(gt.center, elev, input.climateRegions)

		return {
			id: gt.id,
			coord: gt.center,
			terrain: info.terrain,
			elevation: info.elevation,
			resources: info.resources,
			rainfall: info.rainfall,
			temperature: info.temperature,
			fertility: info.fertility,
			nationId: null,
			settlementId: null,
		}
	})
	onProgress?.('terrain', `Terrain assigné pour ${mapTiles.length} tuiles`)

	// ── Étape 4 : Nations ──
	onProgress?.('nations', 'Assignation des nations...')
	const nationTileMap = new Map<string, string[]>()

	for (const tile of mapTiles) {
		// Seulement les tuiles terrestres
		if (tile.terrain === 'ocean' || tile.terrain === 'sea') continue

		const nationId = findNationAtPoint(tile.coord, input.nations)
		if (nationId) {
			tile.nationId = nationId
			const existing = nationTileMap.get(nationId) ?? []
			existing.push(tile.id)
			nationTileMap.set(nationId, existing)
		}
	}

	const nationTiles = mapTiles.filter((t) => t.nationId !== null).length
	onProgress?.('nations', `${nationTiles} tuiles assignées à des nations`)

	// ── Étape 5 : Settlements ──
	onProgress?.('settlements', 'Liaison des settlements aux tuiles...')
	const tileIndex = buildTileIndex(gridTiles)
	const settlementTileMap = new Map<string, string>()
	const unmappedSettlements: string[] = []

	for (const settlement of input.settlements) {
		const nearest = findNearestTile(settlement.coord, tileIndex)
		if (nearest) {
			settlementTileMap.set(settlement.id, nearest.id)
			// Marquer la tuile
			const tile = mapTiles.find((t) => t.id === nearest.id)
			if (tile) {
				tile.settlementId = settlement.id
				// S'assurer que la tuile appartient à la bonne nation
				if (!tile.nationId) {
					tile.nationId = settlement.nationId
				}
			}
		} else {
			unmappedSettlements.push(settlement.id)
		}
	}

	onProgress?.(
		'settlements',
		`${settlementTileMap.size} settlements liés, ${unmappedSettlements.length} non trouvés`,
	)

	// ── Stats ──
	const landTiles = mapTiles.filter(
		(t) => t.terrain !== 'ocean' && t.terrain !== 'sea',
	).length
	const oceanTiles = mapTiles.length - landTiles

	return {
		tiles: mapTiles,
		settlementTileMap,
		nationTileMap,
		stats: {
			totalTiles: mapTiles.length,
			landTiles,
			oceanTiles,
			nationTiles,
			unmappedSettlements,
		},
	}
}
