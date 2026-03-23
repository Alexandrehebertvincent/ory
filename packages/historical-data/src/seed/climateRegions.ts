import type { ClimateRegion } from '../../../shared/src/types/world'

// ============================================================================
// Régions climatiques — An 1000
// ============================================================================
// Chaque région correspond à une grande zone bioclimatique du monde jouable.
// Les IDs (clim_*) sont référencés par diseases.ts (endemicRegions) et
// ecology.ts (regionId).
//
// area : GeoPolygon simplifié (bounding box NW → NE → SE → SW)
// avgTemperature : °C moyen annuel
// avgRainfall : mm/an
// seasonality : 0-10 (0 = stable, 10 = saisons très marquées)
// ============================================================================

export const climateRegions: ClimateRegion[] = [
	// ========================================================================
	// EUROPE
	// ========================================================================
	{
		id: 'clim_temperate_europe',
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
		disasterRisks: [
			{ type: 'flood', probability: 0.15, severity: 5 },
			{ type: 'famine', probability: 0.1, severity: 7 },
			{ type: 'wildfire', probability: 0.03, severity: 3 },
		],
	},
	{
		id: 'clim_mediterranean',
		zone: 'mediterranean',
		area: [
			{ lat: 45, lng: -10 },
			{ lat: 45, lng: 40 },
			{ lat: 30, lng: 40 },
			{ lat: 30, lng: -10 },
		],
		avgTemperature: 17,
		avgRainfall: 500,
		seasonality: 6,
		disasterRisks: [
			{ type: 'earthquake', probability: 0.05, severity: 7 },
			{ type: 'drought', probability: 0.15, severity: 6 },
			{ type: 'wildfire', probability: 0.1, severity: 5 },
		],
	},
	{
		id: 'clim_subarctic',
		zone: 'subarctic',
		area: [
			{ lat: 72, lng: -25 },
			{ lat: 72, lng: 40 },
			{ lat: 55, lng: 40 },
			{ lat: 55, lng: -25 },
		],
		avgTemperature: 2,
		avgRainfall: 500,
		seasonality: 9,
		disasterRisks: [
			{ type: 'famine', probability: 0.15, severity: 8 },
			{ type: 'flood', probability: 0.05, severity: 4 },
		],
	},
	{
		id: 'clim_continental_east_europe',
		zone: 'continental',
		area: [
			{ lat: 60, lng: 25 },
			{ lat: 60, lng: 60 },
			{ lat: 45, lng: 60 },
			{ lat: 45, lng: 25 },
		],
		avgTemperature: 5,
		avgRainfall: 550,
		seasonality: 9,
		disasterRisks: [
			{ type: 'famine', probability: 0.12, severity: 7 },
			{ type: 'flood', probability: 0.1, severity: 5 },
			{ type: 'wildfire', probability: 0.05, severity: 4 },
		],
	},

	// ========================================================================
	// MOYEN-ORIENT & AFRIQUE DU NORD
	// ========================================================================
	{
		id: 'clim_arid_mideast',
		zone: 'arid',
		area: [
			{ lat: 40, lng: 25 },
			{ lat: 40, lng: 75 },
			{ lat: 15, lng: 75 },
			{ lat: 15, lng: 25 },
		],
		avgTemperature: 25,
		avgRainfall: 150,
		seasonality: 3,
		disasterRisks: [
			{ type: 'drought', probability: 0.2, severity: 8 },
			{ type: 'earthquake', probability: 0.04, severity: 7 },
			{ type: 'flood', probability: 0.05, severity: 6 }, // crues soudaines
		],
	},
	{
		id: 'clim_saharan',
		zone: 'arid',
		area: [
			{ lat: 32, lng: -15 },
			{ lat: 32, lng: 35 },
			{ lat: 15, lng: 35 },
			{ lat: 15, lng: -15 },
		],
		avgTemperature: 30,
		avgRainfall: 50,
		seasonality: 2,
		disasterRisks: [
			{ type: 'drought', probability: 0.3, severity: 9 },
			{ type: 'famine', probability: 0.2, severity: 9 },
		],
	},
	{
		id: 'clim_nile_valley',
		zone: 'arid',
		area: [
			{ lat: 32, lng: 28 },
			{ lat: 32, lng: 35 },
			{ lat: 22, lng: 35 },
			{ lat: 22, lng: 28 },
		],
		avgTemperature: 24,
		avgRainfall: 100,
		seasonality: 4,
		disasterRisks: [
			{ type: 'flood', probability: 0.3, severity: 5 }, // crue du Nil — bénéfique aussi
			{ type: 'drought', probability: 0.1, severity: 8 },
			{ type: 'famine', probability: 0.08, severity: 7 },
		],
	},

	// ========================================================================
	// ASIE CENTRALE
	// ========================================================================
	{
		id: 'clim_central_asia_steppe',
		zone: 'continental',
		area: [
			{ lat: 55, lng: 50 },
			{ lat: 55, lng: 90 },
			{ lat: 35, lng: 90 },
			{ lat: 35, lng: 50 },
		],
		avgTemperature: 6,
		avgRainfall: 300,
		seasonality: 10,
		disasterRisks: [
			{ type: 'drought', probability: 0.2, severity: 7 },
			{ type: 'famine', probability: 0.15, severity: 8 },
			{ type: 'wildfire', probability: 0.08, severity: 5 },
		],
	},
	{
		id: 'clim_tibetan_plateau',
		zone: 'highland',
		area: [
			{ lat: 38, lng: 75 },
			{ lat: 38, lng: 105 },
			{ lat: 27, lng: 105 },
			{ lat: 27, lng: 75 },
		],
		avgTemperature: -2,
		avgRainfall: 400,
		seasonality: 7,
		disasterRisks: [
			{ type: 'earthquake', probability: 0.06, severity: 7 },
			{ type: 'famine', probability: 0.12, severity: 8 },
			{ type: 'flood', probability: 0.04, severity: 5 }, // glacial outbursts
		],
	},

	// ========================================================================
	// ASIE DE L'EST
	// ========================================================================
	{
		id: 'clim_east_asia',
		zone: 'monsoon',
		area: [
			{ lat: 45, lng: 100 },
			{ lat: 45, lng: 145 },
			{ lat: 20, lng: 145 },
			{ lat: 20, lng: 100 },
		],
		avgTemperature: 14,
		avgRainfall: 1100,
		seasonality: 8,
		disasterRisks: [
			{ type: 'flood', probability: 0.25, severity: 7 }, // Fleuve Jaune
			{ type: 'earthquake', probability: 0.05, severity: 8 },
			{ type: 'hurricane', probability: 0.1, severity: 7 }, // typhons
			{ type: 'drought', probability: 0.08, severity: 6 },
			{ type: 'famine', probability: 0.06, severity: 7 },
		],
	},
	{
		id: 'clim_east_asia_steppe',
		zone: 'continental',
		area: [
			{ lat: 55, lng: 100 },
			{ lat: 55, lng: 135 },
			{ lat: 40, lng: 135 },
			{ lat: 40, lng: 100 },
		],
		avgTemperature: -1,
		avgRainfall: 250,
		seasonality: 10,
		disasterRisks: [
			{ type: 'drought', probability: 0.18, severity: 7 },
			{ type: 'famine', probability: 0.15, severity: 8 },
		],
	},

	// ========================================================================
	// ASIE DU SUD-EST
	// ========================================================================
	{
		id: 'clim_southeast_asia',
		zone: 'tropical',
		area: [
			{ lat: 25, lng: 95 },
			{ lat: 25, lng: 130 },
			{ lat: -10, lng: 130 },
			{ lat: -10, lng: 95 },
		],
		avgTemperature: 27,
		avgRainfall: 2200,
		seasonality: 4,
		disasterRisks: [
			{ type: 'flood', probability: 0.25, severity: 6 },
			{ type: 'hurricane', probability: 0.15, severity: 8 }, // typhons
			{ type: 'volcanic_eruption', probability: 0.03, severity: 9 },
			{ type: 'earthquake', probability: 0.06, severity: 7 },
			{ type: 'tsunami', probability: 0.02, severity: 9 },
		],
	},

	// ========================================================================
	// ASIE DU SUD (sous-continent indien)
	// ========================================================================
	{
		id: 'clim_south_asia',
		zone: 'monsoon',
		area: [
			{ lat: 35, lng: 65 },
			{ lat: 35, lng: 95 },
			{ lat: 5, lng: 95 },
			{ lat: 5, lng: 65 },
		],
		avgTemperature: 26,
		avgRainfall: 1500,
		seasonality: 8,
		disasterRisks: [
			{ type: 'flood', probability: 0.3, severity: 7 },
			{ type: 'hurricane', probability: 0.1, severity: 7 }, // cyclones
			{ type: 'drought', probability: 0.12, severity: 7 },
			{ type: 'famine', probability: 0.08, severity: 8 },
			{ type: 'earthquake', probability: 0.04, severity: 7 },
		],
	},

	// ========================================================================
	// AFRIQUE SUB-SAHARIENNE
	// ========================================================================
	{
		id: 'clim_tropical_africa',
		zone: 'tropical',
		area: [
			{ lat: 15, lng: -20 },
			{ lat: 15, lng: 50 },
			{ lat: -15, lng: 50 },
			{ lat: -15, lng: -20 },
		],
		avgTemperature: 26,
		avgRainfall: 1400,
		seasonality: 5,
		disasterRisks: [
			{ type: 'drought', probability: 0.15, severity: 7 },
			{ type: 'flood', probability: 0.12, severity: 5 },
			{ type: 'famine', probability: 0.1, severity: 8 },
			{ type: 'wildfire', probability: 0.08, severity: 4 },
		],
	},
	{
		id: 'clim_sahel',
		zone: 'arid',
		area: [
			{ lat: 18, lng: -15 },
			{ lat: 18, lng: 40 },
			{ lat: 10, lng: 40 },
			{ lat: 10, lng: -15 },
		],
		avgTemperature: 28,
		avgRainfall: 400,
		seasonality: 6,
		disasterRisks: [
			{ type: 'drought', probability: 0.25, severity: 8 },
			{ type: 'famine', probability: 0.18, severity: 9 },
			{ type: 'wildfire', probability: 0.1, severity: 5 },
		],
	},
	{
		id: 'clim_east_africa_highland',
		zone: 'highland',
		area: [
			{ lat: 15, lng: 32 },
			{ lat: 15, lng: 50 },
			{ lat: -5, lng: 50 },
			{ lat: -5, lng: 32 },
		],
		avgTemperature: 18,
		avgRainfall: 900,
		seasonality: 5,
		disasterRisks: [
			{ type: 'drought', probability: 0.1, severity: 6 },
			{ type: 'famine', probability: 0.08, severity: 7 },
			{ type: 'earthquake', probability: 0.03, severity: 5 },
		],
	},

	// ========================================================================
	// AMÉRIQUES
	// ========================================================================
	{
		id: 'clim_mesoamerica',
		zone: 'tropical',
		area: [
			{ lat: 25, lng: -105 },
			{ lat: 25, lng: -83 },
			{ lat: 14, lng: -83 },
			{ lat: 14, lng: -105 },
		],
		avgTemperature: 24,
		avgRainfall: 1200,
		seasonality: 5,
		disasterRisks: [
			{ type: 'hurricane', probability: 0.15, severity: 7 },
			{ type: 'earthquake', probability: 0.06, severity: 7 },
			{ type: 'volcanic_eruption', probability: 0.03, severity: 8 },
			{ type: 'drought', probability: 0.1, severity: 7 },
		],
	},
	{
		id: 'clim_mississippi_valley',
		zone: 'temperate',
		area: [
			{ lat: 42, lng: -95 },
			{ lat: 42, lng: -85 },
			{ lat: 32, lng: -85 },
			{ lat: 32, lng: -95 },
		],
		avgTemperature: 14,
		avgRainfall: 1100,
		seasonality: 8,
		disasterRisks: [
			{ type: 'flood', probability: 0.25, severity: 6 },
			{ type: 'hurricane', probability: 0.08, severity: 7 },
			{ type: 'drought', probability: 0.08, severity: 5 },
			{ type: 'wildfire', probability: 0.05, severity: 4 },
		],
	},
	{
		id: 'clim_andes_highland',
		zone: 'highland',
		area: [
			{ lat: -5, lng: -80 },
			{ lat: -5, lng: -68 },
			{ lat: -20, lng: -68 },
			{ lat: -20, lng: -80 },
		],
		avgTemperature: 12,
		avgRainfall: 600,
		seasonality: 4,
		disasterRisks: [
			{ type: 'earthquake', probability: 0.08, severity: 8 },
			{ type: 'volcanic_eruption', probability: 0.04, severity: 9 },
			{ type: 'drought', probability: 0.12, severity: 7 },
			{ type: 'famine', probability: 0.08, severity: 7 },
		],
	},

	// ========================================================================
	// JAPON (zone sismique distincte)
	// ========================================================================
	{
		id: 'clim_japan',
		zone: 'monsoon',
		area: [
			{ lat: 46, lng: 128 },
			{ lat: 46, lng: 146 },
			{ lat: 30, lng: 146 },
			{ lat: 30, lng: 128 },
		],
		avgTemperature: 14,
		avgRainfall: 1600,
		seasonality: 8,
		disasterRisks: [
			{ type: 'earthquake', probability: 0.2, severity: 8 },
			{ type: 'tsunami', probability: 0.05, severity: 9 },
			{ type: 'hurricane', probability: 0.12, severity: 7 }, // typhons
			{ type: 'volcanic_eruption', probability: 0.04, severity: 8 },
			{ type: 'flood', probability: 0.15, severity: 5 },
		],
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 1
	// ========================================================================
	{
		id: 'clim_southwest_north_america',
		zone: 'arid',
		area: [
			{ lat: 40, lng: -115 },
			{ lat: 40, lng: -103 },
			{ lat: 32, lng: -103 },
			{ lat: 32, lng: -115 },
		],
		avgTemperature: 18,
		avgRainfall: 250,
		seasonality: 6,
		disasterRisks: [
			{ type: 'drought', probability: 0.25, severity: 8 },
			{ type: 'flood', probability: 0.05, severity: 5 }, // flash floods
		],
	},
	{
		id: 'clim_pacific_northwest',
		zone: 'temperate',
		area: [
			{ lat: 62, lng: -145 },
			{ lat: 62, lng: -125 },
			{ lat: 50, lng: -125 },
			{ lat: 50, lng: -145 },
		],
		avgTemperature: 8,
		avgRainfall: 2500, // forêt pluviale tempérée
		seasonality: 5,
		disasterRisks: [
			{ type: 'earthquake', probability: 0.06, severity: 7 },
			{ type: 'flood', probability: 0.1, severity: 5 },
			{ type: 'landslide', probability: 0.05, severity: 5 },
		],
	},
	{
		id: 'clim_arctic',
		zone: 'polar',
		area: [
			{ lat: 80, lng: -130 },
			{ lat: 80, lng: -50 },
			{ lat: 60, lng: -50 },
			{ lat: 60, lng: -130 },
		],
		avgTemperature: -15,
		avgRainfall: 200,
		seasonality: 10, // nuit polaire / soleil de minuit
		disasterRisks: [
			{ type: 'blizzard', probability: 0.3, severity: 7 },
			{ type: 'famine', probability: 0.15, severity: 8 },
		],
	},
	{
		id: 'clim_polynesia',
		zone: 'tropical',
		area: [
			{ lat: -5, lng: -180 },
			{ lat: -5, lng: -150 },
			{ lat: -25, lng: -150 },
			{ lat: -25, lng: -180 },
		],
		avgTemperature: 26,
		avgRainfall: 2000,
		seasonality: 2,
		disasterRisks: [
			{ type: 'hurricane', probability: 0.15, severity: 8 },
			{ type: 'tsunami', probability: 0.03, severity: 9 },
			{ type: 'volcanic_eruption', probability: 0.02, severity: 7 },
		],
	},
	{
		id: 'clim_australia',
		zone: 'arid',
		area: [
			{ lat: -10, lng: 112 },
			{ lat: -10, lng: 155 },
			{ lat: -40, lng: 155 },
			{ lat: -40, lng: 112 },
		],
		avgTemperature: 22,
		avgRainfall: 400,
		seasonality: 4,
		disasterRisks: [
			{ type: 'drought', probability: 0.25, severity: 8 },
			{ type: 'bushfire', probability: 0.2, severity: 7 },
			{ type: 'flood', probability: 0.08, severity: 6 },
		],
	},
	{
		id: 'clim_lapland',
		zone: 'subarctic',
		area: [
			{ lat: 72, lng: 10 },
			{ lat: 72, lng: 35 },
			{ lat: 63, lng: 35 },
			{ lat: 63, lng: 10 },
		],
		avgTemperature: -2,
		avgRainfall: 450,
		seasonality: 9,
		disasterRisks: [
			{ type: 'blizzard', probability: 0.2, severity: 6 },
			{ type: 'famine', probability: 0.1, severity: 7 },
		],
	},
	{
		id: 'clim_south_america_temperate',
		zone: 'temperate',
		area: [
			{ lat: -30, lng: -76 },
			{ lat: -30, lng: -65 },
			{ lat: -46, lng: -65 },
			{ lat: -46, lng: -76 },
		],
		avgTemperature: 12,
		avgRainfall: 1200,
		seasonality: 6,
		disasterRisks: [
			{ type: 'earthquake', probability: 0.1, severity: 7 },
			{ type: 'volcanic_eruption', probability: 0.05, severity: 7 },
			{ type: 'flood', probability: 0.08, severity: 5 },
		],
	},
	{
		id: 'clim_madagascar',
		zone: 'tropical',
		area: [
			{ lat: -11, lng: 42 },
			{ lat: -11, lng: 52 },
			{ lat: -27, lng: 52 },
			{ lat: -27, lng: 42 },
		],
		avgTemperature: 24,
		avgRainfall: 1500,
		seasonality: 5,
		disasterRisks: [
			{ type: 'hurricane', probability: 0.12, severity: 7 },
			{ type: 'drought', probability: 0.08, severity: 6 },
			{ type: 'flood', probability: 0.1, severity: 5 },
		],
	},

	// ========================================================================
	// RÉGIONS CLIMATIQUES — TIER 2 & 3
	// ========================================================================
	{
		id: 'clim_peruvian_coast',
		zone: 'arid',
		area: [
			{ lat: -3, lng: -82 },
			{ lat: -3, lng: -75 },
			{ lat: -18, lng: -75 },
			{ lat: -18, lng: -82 },
		],
		avgTemperature: 20,
		avgRainfall: 50,
		seasonality: 2,
		disasterRisks: [
			{ type: 'earthquake', probability: 0.12, severity: 8 },
			{ type: 'el_nino_flood', probability: 0.08, severity: 7 },
			{ type: 'drought', probability: 0.15, severity: 6 },
		],
	},
	{
		id: 'clim_colombian_highlands',
		zone: 'tropical_highland',
		area: [
			{ lat: 8, lng: -77 },
			{ lat: 8, lng: -72 },
			{ lat: 2, lng: -72 },
			{ lat: 2, lng: -77 },
		],
		avgTemperature: 14,
		avgRainfall: 1200,
		seasonality: 3,
		disasterRisks: [
			{ type: 'earthquake', probability: 0.1, severity: 7 },
			{ type: 'flood', probability: 0.1, severity: 5 },
			{ type: 'landslide', probability: 0.08, severity: 6 },
		],
	},
	{
		id: 'clim_south_american_subtropical',
		zone: 'subtropical',
		area: [
			{ lat: -15, lng: -60 },
			{ lat: -15, lng: -45 },
			{ lat: -30, lng: -45 },
			{ lat: -30, lng: -60 },
		],
		avgTemperature: 22,
		avgRainfall: 1400,
		seasonality: 4,
		disasterRisks: [
			{ type: 'flood', probability: 0.12, severity: 6 },
			{ type: 'drought', probability: 0.08, severity: 5 },
		],
	},
	{
		id: 'clim_hawaii',
		zone: 'tropical',
		area: [
			{ lat: 23, lng: -162 },
			{ lat: 23, lng: -154 },
			{ lat: 18, lng: -154 },
			{ lat: 18, lng: -162 },
		],
		avgTemperature: 25,
		avgRainfall: 1700,
		seasonality: 2,
		disasterRisks: [
			{ type: 'hurricane', probability: 0.05, severity: 7 },
			{ type: 'volcanic_eruption', probability: 0.08, severity: 8 },
			{ type: 'tsunami', probability: 0.03, severity: 9 },
		],
	},
	{
		id: 'clim_hokkaido',
		zone: 'subarctic',
		area: [
			{ lat: 46, lng: 139 },
			{ lat: 46, lng: 146 },
			{ lat: 41, lng: 146 },
			{ lat: 41, lng: 139 },
		],
		avgTemperature: 6,
		avgRainfall: 1100,
		seasonality: 8,
		disasterRisks: [
			{ type: 'blizzard', probability: 0.15, severity: 6 },
			{ type: 'earthquake', probability: 0.1, severity: 7 },
			{ type: 'tsunami', probability: 0.03, severity: 8 },
		],
	},
	{
		id: 'clim_upper_nile',
		zone: 'semi_arid',
		area: [
			{ lat: 22, lng: 27 },
			{ lat: 22, lng: 36 },
			{ lat: 15, lng: 36 },
			{ lat: 15, lng: 27 },
		],
		avgTemperature: 28,
		avgRainfall: 250,
		seasonality: 3,
		disasterRisks: [
			{ type: 'drought', probability: 0.2, severity: 8 },
			{ type: 'flood', probability: 0.1, severity: 6 },
			{ type: 'locust_swarm', probability: 0.08, severity: 7 },
		],
	},
	{
		id: 'clim_central_sahara',
		zone: 'arid',
		area: [
			{ lat: 28, lng: -5 },
			{ lat: 28, lng: 15 },
			{ lat: 18, lng: 15 },
			{ lat: 18, lng: -5 },
		],
		avgTemperature: 30,
		avgRainfall: 50,
		seasonality: 2,
		disasterRisks: [
			{ type: 'drought', probability: 0.3, severity: 9 },
			{ type: 'sandstorm', probability: 0.15, severity: 5 },
		],
	},
	{
		id: 'clim_caucasus',
		zone: 'continental',
		area: [
			{ lat: 44, lng: 38 },
			{ lat: 44, lng: 50 },
			{ lat: 38, lng: 50 },
			{ lat: 38, lng: 38 },
		],
		avgTemperature: 10,
		avgRainfall: 800,
		seasonality: 7,
		disasterRisks: [
			{ type: 'earthquake', probability: 0.12, severity: 8 },
			{ type: 'avalanche', probability: 0.08, severity: 6 },
			{ type: 'drought', probability: 0.05, severity: 5 },
		],
	},
	{
		id: 'clim_northeast_america',
		zone: 'continental',
		area: [
			{ lat: 52, lng: -70 },
			{ lat: 52, lng: -52 },
			{ lat: 42, lng: -52 },
			{ lat: 42, lng: -70 },
		],
		avgTemperature: 4,
		avgRainfall: 1100,
		seasonality: 8,
		disasterRisks: [
			{ type: 'blizzard', probability: 0.15, severity: 6 },
			{ type: 'hurricane', probability: 0.05, severity: 7 },
		],
	},
	{
		id: 'clim_new_guinea',
		zone: 'tropical',
		area: [
			{ lat: -1, lng: 130 },
			{ lat: -1, lng: 152 },
			{ lat: -10, lng: 152 },
			{ lat: -10, lng: 130 },
		],
		avgTemperature: 26,
		avgRainfall: 3000,
		seasonality: 2,
		disasterRisks: [
			{ type: 'earthquake', probability: 0.12, severity: 7 },
			{ type: 'volcanic_eruption', probability: 0.06, severity: 8 },
			{ type: 'flood', probability: 0.15, severity: 5 },
		],
	},
	{
		id: 'clim_fiji',
		zone: 'tropical',
		area: [
			{ lat: -15, lng: 176 },
			{ lat: -15, lng: -179 },
			{ lat: -22, lng: -179 },
			{ lat: -22, lng: 176 },
		],
		avgTemperature: 26,
		avgRainfall: 2500,
		seasonality: 3,
		disasterRisks: [
			{ type: 'hurricane', probability: 0.12, severity: 8 },
			{ type: 'flood', probability: 0.1, severity: 5 },
		],
	},
	{
		id: 'clim_mariana_islands',
		zone: 'tropical',
		area: [
			{ lat: 21, lng: 143 },
			{ lat: 21, lng: 147 },
			{ lat: 13, lng: 147 },
			{ lat: 13, lng: 143 },
		],
		avgTemperature: 27,
		avgRainfall: 2200,
		seasonality: 2,
		disasterRisks: [
			{ type: 'typhoon', probability: 0.15, severity: 8 },
			{ type: 'earthquake', probability: 0.08, severity: 7 },
		],
	},
	{
		id: 'clim_canary_islands',
		zone: 'mediterranean',
		area: [
			{ lat: 30, lng: -19 },
			{ lat: 30, lng: -13 },
			{ lat: 27, lng: -13 },
			{ lat: 27, lng: -19 },
		],
		avgTemperature: 20,
		avgRainfall: 350,
		seasonality: 3,
		disasterRisks: [
			{ type: 'volcanic_eruption', probability: 0.03, severity: 8 },
			{ type: 'drought', probability: 0.1, severity: 5 },
		],
	},
	{
		id: 'clim_kalahari',
		zone: 'semi_arid',
		area: [
			{ lat: -18, lng: 18 },
			{ lat: -18, lng: 28 },
			{ lat: -28, lng: 28 },
			{ lat: -28, lng: 18 },
		],
		avgTemperature: 22,
		avgRainfall: 300,
		seasonality: 5,
		disasterRisks: [
			{ type: 'drought', probability: 0.2, severity: 7 },
			{ type: 'bushfire', probability: 0.1, severity: 5 },
		],
	},
	{
		id: 'clim_congo_rainforest',
		zone: 'tropical',
		area: [
			{ lat: 4, lng: 18 },
			{ lat: 4, lng: 32 },
			{ lat: -5, lng: 32 },
			{ lat: -5, lng: 18 },
		],
		avgTemperature: 25,
		avgRainfall: 1800,
		seasonality: 2,
		disasterRisks: [
			{ type: 'flood', probability: 0.12, severity: 5 },
			{ type: 'epidemic', probability: 0.08, severity: 7 },
		],
	},
	{
		id: 'clim_chukotka',
		zone: 'arctic',
		area: [
			{ lat: 70, lng: 168 },
			{ lat: 70, lng: -170 },
			{ lat: 62, lng: -170 },
			{ lat: 62, lng: 168 },
		],
		avgTemperature: -10,
		avgRainfall: 300,
		seasonality: 9,
		disasterRisks: [
			{ type: 'blizzard', probability: 0.25, severity: 7 },
			{ type: 'famine', probability: 0.12, severity: 8 },
		],
	},
	{
		id: 'clim_subarctic_canada',
		zone: 'subarctic',
		area: [
			{ lat: 65, lng: -140 },
			{ lat: 65, lng: -100 },
			{ lat: 55, lng: -100 },
			{ lat: 55, lng: -140 },
		],
		avgTemperature: -5,
		avgRainfall: 400,
		seasonality: 9,
		disasterRisks: [
			{ type: 'blizzard', probability: 0.2, severity: 6 },
			{ type: 'famine', probability: 0.1, severity: 7 },
			{ type: 'forest_fire', probability: 0.06, severity: 6 },
		],
	},
]
