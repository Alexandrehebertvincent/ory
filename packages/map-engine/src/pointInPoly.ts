// ============================================================================
// Point-in-Polygon — Assignation des tuiles aux nations
// ============================================================================

import type { GeoCoord, GeoPolygon } from '../../shared/src/types/world'

/**
 * Teste si un point est à l'intérieur d'un polygone (ray casting algorithm).
 * Fonctionne pour des polygones convexes et concaves.
 */
export function pointInPolygon(point: GeoCoord, polygon: GeoPolygon): boolean {
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

/**
 * Trouve la nation qui possède un point donné.
 * Retourne le nationId ou null si le point est en terre sauvage / océan.
 */
export function findNationAtPoint(
	point: GeoCoord,
	nations: Array<{ id: string; territory: GeoPolygon }>,
): string | null {
	for (const nation of nations) {
		if (pointInPolygon(point, nation.territory)) {
			return nation.id
		}
	}
	return null
}
