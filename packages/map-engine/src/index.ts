// ============================================================================
// Map Engine — Public API
// ============================================================================

export {
	type HexCoord,
	HEX_SIZE_KM,
	hexToGeo,
	geoToHex,
	hexNeighbors,
	hexDistance,
	hexTileId,
} from './hex'
export {
	type GridBounds,
	type GridTile,
	WORLD_BOUNDS,
	generateHexGrid,
} from './grid'
export {
	computeAllElevations,
	interpolateEtopo,
	loadEtopoGrid,
	resetGridCache,
	coordKey,
	type EtopoGrid,
	type ElevationContext,
} from './elevation'
export { assignTerrain, findClimateRegion, type TerrainInfo } from './terrain'
export { pointInPolygon, findNationAtPoint } from './pointInPoly'
export { findNearestTile, buildTileIndex } from './settlements'
export {
	generateWorldMap,
	type GenerateInput,
	type GenerateResult,
} from './generate'
