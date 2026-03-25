// ============================================================================
// Hex Grid Mathematics — Axial Coordinates (flat-top hexagons)
// ============================================================================
// Référence : https://www.redblobgames.com/grids/hexagons/
// Système de coordonnées axiales (q, r) avec flat-top hexagons.
// ============================================================================

import type { GeoCoord } from '../../shared/src/types/world'

/** Coordonnées axiales d'un hexagone */
export interface HexCoord {
	q: number
	r: number
}

/** Taille d'un hex en km (rayon = centre → sommet) */
export const HEX_SIZE_KM = 25

/** Conversion degrés ↔ km (approximation à l'équateur) */
const KM_PER_DEG_LAT = 111.32

/** Calcule km par degré de longitude à une latitude donnée */
function kmPerDegLng(lat: number): number {
	return KM_PER_DEG_LAT * Math.cos((lat * Math.PI) / 180)
}

// Flat-top hex geometry:
//   width  = 2 * size
//   height = sqrt(3) * size
//   horiz spacing = width * 3/4
//   vert spacing  = height

/** Espacement horizontal entre centres hex (en km) */
export const HEX_HORIZ_KM = HEX_SIZE_KM * 1.5 // 3/4 * width = 3/4 * 2*size = 1.5*size
/** Espacement vertical entre centres hex (en km) */
export const HEX_VERT_KM = HEX_SIZE_KM * Math.sqrt(3)

/**
 * Convertit des coordonnées axiales hex → coordonnées géographiques (lat, lng).
 * Le point d'origine (q=0, r=0) est à lat=0, lng=0.
 */
export function hexToGeo(hex: HexCoord): GeoCoord {
	// Position en km depuis l'origine
	const xKm = hex.q * HEX_HORIZ_KM
	const yKm = (hex.r + hex.q * 0.5) * HEX_VERT_KM

	// Convertir km → degrés
	const lat = yKm / KM_PER_DEG_LAT
	// Utiliser la latitude calculée pour ajuster la longitude
	const lng = xKm / kmPerDegLng(lat)

	return { lat, lng }
}

/**
 * Convertit des coordonnées géographiques → coordonnées axiales hex (arrondies).
 */
export function geoToHex(geo: GeoCoord): HexCoord {
	// Convertir degrés → km
	const xKm = geo.lng * kmPerDegLng(geo.lat)
	const yKm = geo.lat * KM_PER_DEG_LAT

	// Coordonnées axiales fractionnaires
	const q = xKm / HEX_HORIZ_KM
	const r = yKm / HEX_VERT_KM - q * 0.5

	return hexRound(q, r)
}

/**
 * Arrondit des coordonnées axiales fractionnaires au hex le plus proche.
 * Utilise la conversion cube → arrondi → retour axial.
 */
function hexRound(qFrac: number, rFrac: number): HexCoord {
	// Axial → Cube
	const x = qFrac
	const z = rFrac
	const y = -x - z

	let rx = Math.round(x)
	let ry = Math.round(y)
	let rz = Math.round(z)

	const xDiff = Math.abs(rx - x)
	const yDiff = Math.abs(ry - y)
	const zDiff = Math.abs(rz - z)

	if (xDiff > yDiff && xDiff > zDiff) {
		rx = -ry - rz
	} else if (yDiff > zDiff) {
		ry = -rx - rz
	} else {
		rz = -rx - ry
	}

	// Cube → Axial
	return { q: rx, r: rz }
}

/** Les 6 directions voisines en coordonnées axiales (flat-top) */
const HEX_DIRECTIONS: HexCoord[] = [
	{ q: 1, r: 0 },
	{ q: 1, r: -1 },
	{ q: 0, r: -1 },
	{ q: -1, r: 0 },
	{ q: -1, r: 1 },
	{ q: 0, r: 1 },
]

/** Retourne les 6 voisins d'un hex */
export function hexNeighbors(hex: HexCoord): HexCoord[] {
	return HEX_DIRECTIONS.map((d) => ({
		q: hex.q + d.q,
		r: hex.r + d.r,
	}))
}

/** Distance entre deux hex (en nombre de tuiles) */
export function hexDistance(a: HexCoord, b: HexCoord): number {
	// Distance cube = max(|dx|, |dy|, |dz|)
	const dq = a.q - b.q
	const dr = a.r - b.r
	const ds = -dq - dr
	return Math.max(Math.abs(dq), Math.abs(dr), Math.abs(ds))
}

/** Génère un ID de tuile déterministe à partir de coordonnées hex */
export function hexTileId(hex: HexCoord): string {
	return `tile_${hex.q}_${hex.r}`
}
