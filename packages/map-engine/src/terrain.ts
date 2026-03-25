// ============================================================================
// Terrain Assignment — Détermine le terrain, la température, les précipitations
//                      et les ressources de chaque tuile
// ============================================================================

import type {
	ClimateRegion,
	GeoCoord,
	Level,
	NaturalResource,
	TerrainType,
} from '../../shared/src/types/world'

/** Résultat de l'assignation terrain pour une tuile */
export interface TerrainInfo {
	terrain: TerrainType
	elevation: number
	temperature: Level
	rainfall: Level
	fertility: Level
	resources: NaturalResource[]
}

/**
 * Vérifie si un point est dans un bounding box rectangulaire (4 points NW→NE→SE→SW).
 */
function pointInBBox(point: GeoCoord, area: GeoCoord[]): boolean {
	if (area.length < 4) return false
	const minLat = Math.min(area[2].lat, area[3].lat)
	const maxLat = Math.max(area[0].lat, area[1].lat)
	const minLng = Math.min(area[0].lng, area[3].lng)
	const maxLng = Math.max(area[1].lng, area[2].lng)
	return (
		point.lat >= minLat &&
		point.lat <= maxLat &&
		point.lng >= minLng &&
		point.lng <= maxLng
	)
}

/**
 * Trouve la zone climatique qui contient un point.
 */
export function findClimateRegion(
	point: GeoCoord,
	regions: ClimateRegion[],
): ClimateRegion | null {
	return regions.find((r) => pointInBBox(point, r.area)) ?? null
}

/**
 * Détermine le type de terrain à partir de l'élévation et de la zone climatique.
 */
function classifyTerrain(
	elevation: number,
	zone: string | null,
	lat: number,
): TerrainType {
	// Océan / mer
	if (elevation <= -100) return 'ocean'
	if (elevation <= 0) return 'sea'

	// Glace aux hautes latitudes
	if (Math.abs(lat) > 68 && elevation < 500) return 'ice'
	if (Math.abs(lat) > 65 && elevation < 300) return 'tundra'

	// Haute altitude → montagne
	if (elevation > 2500) return 'mountain'
	if (elevation > 1000) return 'hill'

	// Classification par zone climatique
	switch (zone) {
		case 'tropical':
		case 'monsoon':
			return elevation > 500 ? 'jungle' : 'jungle'
		case 'tropical_highland':
			return 'forest'
		case 'arid':
		case 'semi_arid':
			return 'desert'
		case 'mediterranean':
			return elevation > 400 ? 'hill' : 'plain'
		case 'temperate':
			return elevation > 200 ? 'forest' : 'plain'
		case 'continental':
			return elevation > 300 ? 'forest' : 'steppe'
		case 'subtropical':
			return 'forest'
		case 'subarctic':
			return 'tundra'
		case 'arctic':
		case 'polar':
			return 'ice'
		case 'highland':
			return elevation > 1500 ? 'mountain' : 'hill'
		default:
			// Fallback basé sur la latitude
			if (Math.abs(lat) > 60) return 'tundra'
			if (Math.abs(lat) > 45) return 'forest'
			if (Math.abs(lat) > 30) return 'plain'
			if (Math.abs(lat) > 15) return 'desert'
			return 'jungle'
	}
}

/**
 * Calcule la température (Level 0-10) à partir de la latitude et l'élévation.
 * 0 = glacial (-30°C), 10 = tropical (35°C)
 */
function computeTemperature(
	lat: number,
	elevation: number,
	climate: ClimateRegion | null,
): Level {
	if (climate) {
		// Base depuis la donnée climatique
		const base = ((climate.avgTemperature + 30) / 65) * 10 // -30°C → 0, 35°C → 10
		// Ajustement altitude : -6.5°C par 1000m → -1 point par 1000m
		const altAdjust = (elevation / 1000) * -1
		return Math.round(Math.max(0, Math.min(10, base + altAdjust)))
	}
	// Fallback : gradient latitudinal
	const base = 10 - (Math.abs(lat) / 90) * 10
	const altAdjust = (elevation / 1000) * -1
	return Math.round(Math.max(0, Math.min(10, base + altAdjust)))
}

/**
 * Calcule les précipitations (Level 0-10) à partir de la zone climatique.
 */
function computeRainfall(
	climate: ClimateRegion | null,
	terrain: TerrainType,
): Level {
	if (climate) {
		// 0mm → 0, 2000mm+ → 10
		return Math.round(Math.min(10, (climate.avgRainfall / 2000) * 10))
	}
	// Fallback par terrain
	switch (terrain) {
		case 'jungle':
			return 9
		case 'forest':
		case 'dense_forest':
			return 6
		case 'swamp':
			return 8
		case 'plain':
		case 'hill':
			return 5
		case 'steppe':
			return 3
		case 'desert':
			return 1
		case 'tundra':
		case 'ice':
			return 2
		default:
			return 5
	}
}

/**
 * Calcule la fertilité (Level 0-10).
 */
function computeFertility(
	terrain: TerrainType,
	rainfall: Level,
	temperature: Level,
): Level {
	const base: Record<string, number> = {
		plain: 7,
		forest: 5,
		dense_forest: 4,
		jungle: 6,
		hill: 4,
		steppe: 3,
		swamp: 3,
		desert: 1,
		mountain: 1,
		tundra: 1,
		ice: 0,
		coast: 4,
		ocean: 0,
		sea: 0,
		lake: 3,
		river: 6,
	}
	const b = base[terrain] ?? 3
	// Bonus si pluie et chaleur modérées
	const rainBonus = rainfall >= 4 && rainfall <= 8 ? 1 : 0
	const tempBonus = temperature >= 4 && temperature <= 8 ? 1 : 0
	return Math.round(
		Math.max(0, Math.min(10, b + rainBonus + tempBonus)),
	) as Level
}

/**
 * Génère les ressources naturelles basées sur le terrain et la zone climatique.
 */
function generateResources(
	terrain: TerrainType,
	elevation: number,
	climate: ClimateRegion | null,
): NaturalResource[] {
	const resources: NaturalResource[] = []

	// Ressources minérales en montagne/colline
	if (elevation > 1000) {
		resources.push({ type: 'stone', abundance: 7 })
		if (elevation > 2000) resources.push({ type: 'iron', abundance: 4 })
		if (elevation > 2500) resources.push({ type: 'copper', abundance: 3 })
	}

	// Forêts → bois
	if (
		terrain === 'forest' ||
		terrain === 'dense_forest' ||
		terrain === 'jungle'
	) {
		resources.push({ type: 'wood', abundance: 7 })
	}

	// Plaines → terres fertiles
	if (terrain === 'plain' || terrain === 'steppe') {
		resources.push({ type: 'fertile_land', abundance: 6 })
		resources.push({ type: 'cattle', abundance: 4 })
	}

	// Zones tropicales → épices, coton
	if (climate?.zone === 'tropical' || climate?.zone === 'monsoon') {
		resources.push({ type: 'spices', abundance: 3 })
		if (terrain !== 'mountain') resources.push({ type: 'cotton', abundance: 4 })
	}

	// Côtes → poisson
	if (terrain === 'coast' || terrain === 'sea') {
		resources.push({ type: 'fish', abundance: 6 })
		resources.push({ type: 'salt', abundance: 3 })
	}

	// Subarctique → fourrures
	if (climate?.zone === 'subarctic' || terrain === 'tundra') {
		resources.push({ type: 'furs', abundance: 5 })
	}

	// Eau douce
	if (terrain === 'plain' || terrain === 'forest' || terrain === 'swamp') {
		resources.push({ type: 'fresh_water', abundance: 5 })
	}

	return resources
}

/**
 * Assigne les informations de terrain complètes pour une tuile.
 */
export function assignTerrain(
	center: GeoCoord,
	elevation: number,
	climateRegions: ClimateRegion[],
): TerrainInfo {
	const climate = findClimateRegion(center, climateRegions)
	const terrain = classifyTerrain(elevation, climate?.zone ?? null, center.lat)
	const temperature = computeTemperature(center.lat, elevation, climate)
	const rainfall = computeRainfall(climate, terrain)
	const fertility = computeFertility(terrain, rainfall, temperature)
	const resources = generateResources(terrain, elevation, climate)

	return {
		terrain,
		elevation,
		temperature,
		rainfall,
		fertility,
		resources,
	}
}
