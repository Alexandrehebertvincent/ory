import type {
	NationWorldKnowledge,
	GeoPolygon,
} from '../../../shared/src/types/world'

// ============================================================================
// Connaissance du monde par nation — An 1000
// ============================================================================

// Régions connues simplifiées (boîtes englobantes NW→NE→SE→SW)
const EUROPE_WEST: GeoPolygon = [
	{ lat: 60, lng: -10 },
	{ lat: 60, lng: 15 },
	{ lat: 36, lng: 15 },
	{ lat: 36, lng: -10 },
]
const EUROPE_EAST: GeoPolygon = [
	{ lat: 60, lng: 15 },
	{ lat: 60, lng: 45 },
	{ lat: 36, lng: 45 },
	{ lat: 36, lng: 15 },
]
const SCANDINAVIA: GeoPolygon = [
	{ lat: 72, lng: -25 },
	{ lat: 72, lng: 30 },
	{ lat: 55, lng: 30 },
	{ lat: 55, lng: -25 },
]
const MEDITERRANEAN: GeoPolygon = [
	{ lat: 46, lng: -10 },
	{ lat: 46, lng: 40 },
	{ lat: 30, lng: 40 },
	{ lat: 30, lng: -10 },
]
const NORTH_AFRICA: GeoPolygon = [
	{ lat: 37, lng: -15 },
	{ lat: 37, lng: 45 },
	{ lat: 15, lng: 45 },
	{ lat: 15, lng: -15 },
]
const MIDDLE_EAST: GeoPolygon = [
	{ lat: 42, lng: 25 },
	{ lat: 42, lng: 65 },
	{ lat: 12, lng: 65 },
	{ lat: 12, lng: 25 },
]
const CENTRAL_ASIA: GeoPolygon = [
	{ lat: 50, lng: 50 },
	{ lat: 50, lng: 90 },
	{ lat: 30, lng: 90 },
	{ lat: 30, lng: 50 },
]
const INDIA: GeoPolygon = [
	{ lat: 35, lng: 65 },
	{ lat: 35, lng: 90 },
	{ lat: 5, lng: 90 },
	{ lat: 5, lng: 65 },
]
const EAST_ASIA: GeoPolygon = [
	{ lat: 50, lng: 90 },
	{ lat: 50, lng: 140 },
	{ lat: 20, lng: 140 },
	{ lat: 20, lng: 90 },
]
const SOUTHEAST_ASIA: GeoPolygon = [
	{ lat: 25, lng: 90 },
	{ lat: 25, lng: 130 },
	{ lat: -10, lng: 130 },
	{ lat: -10, lng: 90 },
]
const EAST_AFRICA: GeoPolygon = [
	{ lat: 15, lng: 25 },
	{ lat: 15, lng: 55 },
	{ lat: -15, lng: 55 },
	{ lat: -15, lng: 25 },
]
const WEST_AFRICA: GeoPolygon = [
	{ lat: 25, lng: -20 },
	{ lat: 25, lng: 15 },
	{ lat: 5, lng: 15 },
	{ lat: 5, lng: -20 },
]
const SAHARA: GeoPolygon = [
	{ lat: 30, lng: -15 },
	{ lat: 30, lng: 35 },
	{ lat: 15, lng: 35 },
	{ lat: 15, lng: -15 },
]
const ICELAND_GREENLAND: GeoPolygon = [
	{ lat: 70, lng: -55 },
	{ lat: 70, lng: -15 },
	{ lat: 60, lng: -15 },
	{ lat: 60, lng: -55 },
]
const MESOAMERICA: GeoPolygon = [
	{ lat: 23, lng: -105 },
	{ lat: 23, lng: -85 },
	{ lat: 14, lng: -85 },
	{ lat: 14, lng: -105 },
]
const ANDES: GeoPolygon = [
	{ lat: 5, lng: -80 },
	{ lat: 5, lng: -65 },
	{ lat: -20, lng: -65 },
	{ lat: -20, lng: -80 },
]
const MISSISSIPPI_VALLEY: GeoPolygon = [
	{ lat: 42, lng: -95 },
	{ lat: 42, lng: -80 },
	{ lat: 30, lng: -80 },
	{ lat: 30, lng: -95 },
]
const TIBETAN_PLATEAU: GeoPolygon = [
	{ lat: 40, lng: 75 },
	{ lat: 40, lng: 105 },
	{ lat: 27, lng: 105 },
	{ lat: 27, lng: 75 },
]

// --- Régions supplémentaires Tier 1 ---
const SOUTHWEST_NORTH_AMERICA: GeoPolygon = [
	{ lat: 40, lng: -115 },
	{ lat: 40, lng: -103 },
	{ lat: 32, lng: -103 },
	{ lat: 32, lng: -115 },
]
const PACIFIC_NORTHWEST: GeoPolygon = [
	{ lat: 62, lng: -145 },
	{ lat: 62, lng: -125 },
	{ lat: 50, lng: -125 },
	{ lat: 50, lng: -145 },
]
const ARCTIC: GeoPolygon = [
	{ lat: 80, lng: -130 },
	{ lat: 80, lng: -50 },
	{ lat: 60, lng: -50 },
	{ lat: 60, lng: -130 },
]
const POLYNESIA: GeoPolygon = [
	{ lat: -5, lng: -180 },
	{ lat: -5, lng: -150 },
	{ lat: -25, lng: -150 },
	{ lat: -25, lng: -180 },
]
const AUSTRALIA: GeoPolygon = [
	{ lat: -10, lng: 112 },
	{ lat: -10, lng: 155 },
	{ lat: -40, lng: 155 },
	{ lat: -40, lng: 112 },
]
const LAPLAND: GeoPolygon = [
	{ lat: 72, lng: 10 },
	{ lat: 72, lng: 35 },
	{ lat: 63, lng: 35 },
	{ lat: 63, lng: 10 },
]
const SOUTHERN_SOUTH_AMERICA: GeoPolygon = [
	{ lat: -30, lng: -76 },
	{ lat: -30, lng: -65 },
	{ lat: -46, lng: -65 },
	{ lat: -46, lng: -76 },
]
const MADAGASCAR: GeoPolygon = [
	{ lat: -11, lng: 42 },
	{ lat: -11, lng: 52 },
	{ lat: -27, lng: 52 },
	{ lat: -27, lng: 42 },
]
const SOUTHERN_AFRICA: GeoPolygon = [
	{ lat: -10, lng: 20 },
	{ lat: -10, lng: 40 },
	{ lat: -35, lng: 40 },
	{ lat: -35, lng: 20 },
]

// --- Régions supplémentaires Tier 2 & 3 ---
const PERUVIAN_COAST: GeoPolygon = [
	{ lat: -3, lng: -82 },
	{ lat: -3, lng: -75 },
	{ lat: -18, lng: -75 },
	{ lat: -18, lng: -82 },
]
const COLOMBIAN_HIGHLANDS: GeoPolygon = [
	{ lat: 8, lng: -77 },
	{ lat: 8, lng: -72 },
	{ lat: 2, lng: -72 },
	{ lat: 2, lng: -77 },
]
const SOUTH_AMERICAN_SUBTROPICAL: GeoPolygon = [
	{ lat: -15, lng: -60 },
	{ lat: -15, lng: -45 },
	{ lat: -30, lng: -45 },
	{ lat: -30, lng: -60 },
]
const HAWAII_REGION: GeoPolygon = [
	{ lat: 23, lng: -162 },
	{ lat: 23, lng: -154 },
	{ lat: 18, lng: -154 },
	{ lat: 18, lng: -162 },
]
const HOKKAIDO: GeoPolygon = [
	{ lat: 46, lng: 139 },
	{ lat: 46, lng: 146 },
	{ lat: 41, lng: 146 },
	{ lat: 41, lng: 139 },
]
const UPPER_NILE: GeoPolygon = [
	{ lat: 22, lng: 27 },
	{ lat: 22, lng: 36 },
	{ lat: 15, lng: 36 },
	{ lat: 15, lng: 27 },
]
const CENTRAL_SAHARA: GeoPolygon = [
	{ lat: 28, lng: -5 },
	{ lat: 28, lng: 15 },
	{ lat: 18, lng: 15 },
	{ lat: 18, lng: -5 },
]
const CAUCASUS: GeoPolygon = [
	{ lat: 44, lng: 38 },
	{ lat: 44, lng: 50 },
	{ lat: 38, lng: 50 },
	{ lat: 38, lng: 38 },
]
const NORTHEAST_AMERICA: GeoPolygon = [
	{ lat: 52, lng: -70 },
	{ lat: 52, lng: -52 },
	{ lat: 42, lng: -52 },
	{ lat: 42, lng: -70 },
]
const NEW_GUINEA: GeoPolygon = [
	{ lat: -1, lng: 130 },
	{ lat: -1, lng: 152 },
	{ lat: -10, lng: 152 },
	{ lat: -10, lng: 130 },
]
const FIJI_REGION: GeoPolygon = [
	{ lat: -15, lng: 176 },
	{ lat: -15, lng: -179 },
	{ lat: -22, lng: -179 },
	{ lat: -22, lng: 176 },
]
const MARIANA_ISLANDS: GeoPolygon = [
	{ lat: 21, lng: 143 },
	{ lat: 21, lng: 147 },
	{ lat: 13, lng: 147 },
	{ lat: 13, lng: 143 },
]
const CANARY_ISLANDS: GeoPolygon = [
	{ lat: 30, lng: -19 },
	{ lat: 30, lng: -13 },
	{ lat: 27, lng: -13 },
	{ lat: 27, lng: -19 },
]
const KALAHARI: GeoPolygon = [
	{ lat: -18, lng: 18 },
	{ lat: -18, lng: 28 },
	{ lat: -28, lng: 28 },
	{ lat: -28, lng: 18 },
]
const CONGO_RAINFOREST: GeoPolygon = [
	{ lat: 4, lng: 18 },
	{ lat: 4, lng: 32 },
	{ lat: -5, lng: 32 },
	{ lat: -5, lng: 18 },
]
const CHUKOTKA: GeoPolygon = [
	{ lat: 70, lng: 168 },
	{ lat: 70, lng: -170 },
	{ lat: 62, lng: -170 },
	{ lat: 62, lng: 168 },
]
const SUBARCTIC_CANADA: GeoPolygon = [
	{ lat: 65, lng: -140 },
	{ lat: 65, lng: -100 },
	{ lat: 55, lng: -100 },
	{ lat: 55, lng: -140 },
]

export const nationWorldKnowledgeData: NationWorldKnowledge[] = [
	// ========================================================================
	// EUROPE OCCIDENTALE
	// ========================================================================
	{
		nationId: 'nat_hre',
		knownRegions: [
			EUROPE_WEST,
			EUROPE_EAST,
			SCANDINAVIA,
			MEDITERRANEAN,
			NORTH_AFRICA,
		],
		explorationCapacity: 3,
		navalRange: 2,
		cartographyLevel: 3,
		knownNations: [
			'nat_france',
			'nat_england',
			'nat_scotland',
			'nat_papal',
			'nat_venice',
			'nat_leon',
			'nat_navarre',
			'nat_cordoba',
			'nat_denmark',
			'nat_norway',
			'nat_sweden',
			'nat_poland',
			'nat_hungary',
			'nat_kievan_rus',
			'nat_croatia',
			'nat_byzantine',
			'nat_fatimid',
		],
		myths: [
			'Prester John rules a Christian kingdom in the East',
			'The edge of the world lies beyond the western ocean',
		],
	},
	{
		nationId: 'nat_france',
		knownRegions: [EUROPE_WEST, MEDITERRANEAN, SCANDINAVIA],
		explorationCapacity: 3,
		navalRange: 2,
		cartographyLevel: 3,
		knownNations: [
			'nat_hre',
			'nat_england',
			'nat_papal',
			'nat_venice',
			'nat_leon',
			'nat_navarre',
			'nat_cordoba',
			'nat_denmark',
			'nat_norway',
			'nat_byzantine',
			'nat_scotland',
		],
		myths: [
			'Prester John rules a Christian kingdom in the East',
			'Monsters inhabit the deep ocean',
		],
	},
	{
		nationId: 'nat_england',
		knownRegions: [EUROPE_WEST, SCANDINAVIA, MEDITERRANEAN],
		explorationCapacity: 4,
		navalRange: 4,
		cartographyLevel: 3,
		knownNations: [
			'nat_hre',
			'nat_france',
			'nat_scotland',
			'nat_papal',
			'nat_denmark',
			'nat_norway',
			'nat_venice',
			'nat_cordoba',
			'nat_byzantine',
			'nat_leon',
		],
		myths: [
			'The Fortunate Isles lie to the west',
			'Sea serpents guard unknown waters',
		],
	},
	{
		nationId: 'nat_scotland',
		knownRegions: [EUROPE_WEST, SCANDINAVIA],
		explorationCapacity: 2,
		navalRange: 3,
		cartographyLevel: 2,
		knownNations: [
			'nat_england',
			'nat_france',
			'nat_hre',
			'nat_denmark',
			'nat_norway',
		],
		myths: [
			'Tír na nÓg lies beyond the western sea',
			'Giant serpents inhabit the deep',
		],
	},
	{
		nationId: 'nat_papal',
		knownRegions: [
			EUROPE_WEST,
			EUROPE_EAST,
			MEDITERRANEAN,
			NORTH_AFRICA,
			MIDDLE_EAST,
		],
		explorationCapacity: 3,
		navalRange: 3,
		cartographyLevel: 5,
		knownNations: [
			'nat_hre',
			'nat_france',
			'nat_england',
			'nat_venice',
			'nat_leon',
			'nat_cordoba',
			'nat_byzantine',
			'nat_hungary',
			'nat_poland',
			'nat_fatimid',
			'nat_croatia',
			'nat_denmark',
			'nat_norway',
			'nat_kievan_rus',
			'nat_navarre',
		],
		myths: [
			'The Garden of Eden lies in the distant East',
			'Gog and Magog dwell beyond the Caspian gates',
		],
	},
	{
		nationId: 'nat_venice',
		knownRegions: [
			EUROPE_WEST,
			EUROPE_EAST,
			MEDITERRANEAN,
			NORTH_AFRICA,
			MIDDLE_EAST,
		],
		explorationCapacity: 6,
		navalRange: 7,
		cartographyLevel: 6,
		knownNations: [
			'nat_hre',
			'nat_france',
			'nat_papal',
			'nat_byzantine',
			'nat_fatimid',
			'nat_cordoba',
			'nat_croatia',
			'nat_hungary',
			'nat_leon',
			'nat_england',
			'nat_buyid',
			'nat_denmark',
			'nat_kievan_rus',
		],
		myths: [
			'The Spice Islands hold untold riches',
			'Sea monsters patrol the Indian Ocean',
		],
	},

	// ========================================================================
	// IBÉRIE
	// ========================================================================
	{
		nationId: 'nat_leon',
		knownRegions: [EUROPE_WEST, MEDITERRANEAN, NORTH_AFRICA],
		explorationCapacity: 3,
		navalRange: 2,
		cartographyLevel: 3,
		knownNations: [
			'nat_navarre',
			'nat_cordoba',
			'nat_france',
			'nat_hre',
			'nat_papal',
			'nat_england',
			'nat_venice',
		],
		myths: [
			'Santiago guides Christians in battle',
			'Africa holds kingdoms of gold',
		],
	},
	{
		nationId: 'nat_navarre',
		knownRegions: [EUROPE_WEST, MEDITERRANEAN],
		explorationCapacity: 2,
		navalRange: 1,
		cartographyLevel: 2,
		knownNations: [
			'nat_leon',
			'nat_cordoba',
			'nat_france',
			'nat_hre',
			'nat_papal',
		],
		myths: ['The mountains hide ancient secrets'],
	},
	{
		nationId: 'nat_cordoba',
		knownRegions: [
			EUROPE_WEST,
			MEDITERRANEAN,
			NORTH_AFRICA,
			MIDDLE_EAST,
			SAHARA,
			WEST_AFRICA,
			CENTRAL_ASIA,
			INDIA,
		],
		explorationCapacity: 7,
		navalRange: 6,
		cartographyLevel: 8,
		knownNations: [
			'nat_leon',
			'nat_navarre',
			'nat_france',
			'nat_hre',
			'nat_papal',
			'nat_venice',
			'nat_byzantine',
			'nat_fatimid',
			'nat_buyid',
			'nat_ghaznavid',
			'nat_karakhanid',
			'nat_ghana',
			'nat_kanem',
			'nat_england',
		],
		myths: [
			'The Mountains of the Moon are the source of the Nile',
			'Lost cities of gold lie in the deep Sahara',
		],
	},

	// ========================================================================
	// SCANDINAVIE
	// ========================================================================
	{
		nationId: 'nat_denmark',
		knownRegions: [
			EUROPE_WEST,
			SCANDINAVIA,
			EUROPE_EAST,
			MEDITERRANEAN,
			ICELAND_GREENLAND,
		],
		explorationCapacity: 6,
		navalRange: 7,
		cartographyLevel: 3,
		knownNations: [
			'nat_england',
			'nat_france',
			'nat_hre',
			'nat_norway',
			'nat_sweden',
			'nat_poland',
			'nat_kievan_rus',
			'nat_byzantine',
			'nat_scotland',
			'nat_papal',
			'nat_venice',
			'nat_sami',
		],
		myths: [
			'Vinland lies across the western ocean',
			'Jörmungandr encircles the world in the deep sea',
		],
	},
	{
		nationId: 'nat_norway',
		knownRegions: [EUROPE_WEST, SCANDINAVIA, ICELAND_GREENLAND],
		explorationCapacity: 7,
		navalRange: 8,
		cartographyLevel: 3,
		knownNations: [
			'nat_england',
			'nat_scotland',
			'nat_denmark',
			'nat_sweden',
			'nat_france',
			'nat_hre',
			'nat_kievan_rus',
			'nat_papal',
			'nat_byzantine',
			'nat_sami',
		],
		myths: [
			'Vinland is rich with timber and grapes',
			'Niflheim lies in the frozen north',
		],
	},
	{
		nationId: 'nat_sweden',
		knownRegions: [SCANDINAVIA, EUROPE_EAST, EUROPE_WEST],
		explorationCapacity: 4,
		navalRange: 5,
		cartographyLevel: 2,
		knownNations: [
			'nat_denmark',
			'nat_norway',
			'nat_kievan_rus',
			'nat_poland',
			'nat_hre',
			'nat_volga_bulgaria',
		],
		myths: [
			'Jötunheimr lies in the frozen wastes',
			'Miklagard is the greatest city in the world',
		],
	},

	// ========================================================================
	// EUROPE ORIENTALE
	// ========================================================================
	{
		nationId: 'nat_poland',
		knownRegions: [EUROPE_WEST, EUROPE_EAST, SCANDINAVIA],
		explorationCapacity: 3,
		navalRange: 1,
		cartographyLevel: 2,
		knownNations: [
			'nat_hre',
			'nat_hungary',
			'nat_kievan_rus',
			'nat_denmark',
			'nat_sweden',
			'nat_byzantine',
			'nat_croatia',
			'nat_papal',
		],
		myths: ['Wild peoples inhabit the eastern steppes'],
	},
	{
		nationId: 'nat_hungary',
		knownRegions: [EUROPE_WEST, EUROPE_EAST, MEDITERRANEAN],
		explorationCapacity: 3,
		navalRange: 1,
		cartographyLevel: 3,
		knownNations: [
			'nat_hre',
			'nat_poland',
			'nat_kievan_rus',
			'nat_croatia',
			'nat_byzantine',
			'nat_venice',
			'nat_papal',
			'nat_volga_bulgaria',
		],
		myths: ['Our ancestors came from the great eastern steppe'],
	},
	{
		nationId: 'nat_kievan_rus',
		knownRegions: [
			EUROPE_EAST,
			SCANDINAVIA,
			EUROPE_WEST,
			MEDITERRANEAN,
			CENTRAL_ASIA,
		],
		explorationCapacity: 5,
		navalRange: 4,
		cartographyLevel: 3,
		knownNations: [
			'nat_byzantine',
			'nat_poland',
			'nat_hungary',
			'nat_denmark',
			'nat_norway',
			'nat_sweden',
			'nat_hre',
			'nat_volga_bulgaria',
			'nat_karakhanid',
			'nat_papal',
			'nat_venice',
		],
		myths: [
			'Tsargrad is the center of the world',
			'Fierce peoples roam beyond the eastern steppe',
		],
	},
	{
		nationId: 'nat_volga_bulgaria',
		knownRegions: [EUROPE_EAST, CENTRAL_ASIA, MIDDLE_EAST],
		explorationCapacity: 4,
		navalRange: 2,
		cartographyLevel: 3,
		knownNations: [
			'nat_kievan_rus',
			'nat_karakhanid',
			'nat_buyid',
			'nat_ghaznavid',
			'nat_byzantine',
			'nat_hungary',
			'nat_sweden',
		],
		myths: ['The lands of Yajuj and Majuj lie to the far north'],
	},
	{
		nationId: 'nat_croatia',
		knownRegions: [EUROPE_WEST, EUROPE_EAST, MEDITERRANEAN],
		explorationCapacity: 3,
		navalRange: 3,
		cartographyLevel: 3,
		knownNations: [
			'nat_hre',
			'nat_hungary',
			'nat_venice',
			'nat_papal',
			'nat_byzantine',
			'nat_poland',
		],
		myths: ['The Adriatic hides ancient treasures'],
	},

	// ========================================================================
	// BYZANCE
	// ========================================================================
	{
		nationId: 'nat_byzantine',
		knownRegions: [
			EUROPE_WEST,
			EUROPE_EAST,
			SCANDINAVIA,
			MEDITERRANEAN,
			NORTH_AFRICA,
			MIDDLE_EAST,
			CENTRAL_ASIA,
			INDIA,
			EAST_AFRICA,
		],
		explorationCapacity: 7,
		navalRange: 7,
		cartographyLevel: 8,
		knownNations: [
			'nat_hre',
			'nat_france',
			'nat_england',
			'nat_papal',
			'nat_venice',
			'nat_cordoba',
			'nat_denmark',
			'nat_norway',
			'nat_poland',
			'nat_hungary',
			'nat_kievan_rus',
			'nat_croatia',
			'nat_fatimid',
			'nat_buyid',
			'nat_ghaznavid',
			'nat_karakhanid',
			'nat_ethiopia',
			'nat_chola',
			'nat_volga_bulgaria',
			'nat_georgia',
			'nat_armenia',
		],
		myths: [
			'India holds wonders beyond imagination',
			'The Pillars of Hercules guard the outer ocean',
		],
	},

	// ========================================================================
	// MONDE ISLAMIQUE
	// ========================================================================
	{
		nationId: 'nat_fatimid',
		knownRegions: [
			NORTH_AFRICA,
			MEDITERRANEAN,
			MIDDLE_EAST,
			EUROPE_WEST,
			EUROPE_EAST,
			EAST_AFRICA,
			SAHARA,
			WEST_AFRICA,
			CENTRAL_ASIA,
			INDIA,
			SOUTHEAST_ASIA,
		],
		explorationCapacity: 7,
		navalRange: 7,
		cartographyLevel: 9,
		knownNations: [
			'nat_byzantine',
			'nat_buyid',
			'nat_ghaznavid',
			'nat_cordoba',
			'nat_venice',
			'nat_papal',
			'nat_hre',
			'nat_ethiopia',
			'nat_ghana',
			'nat_kanem',
			'nat_swahili_cities',
			'nat_chola',
			'nat_srivijaya',
			'nat_song',
			'nat_karakhanid',
			'nat_makuria',
			'nat_tuareg',
			'nat_armenia',
		],
		myths: [
			'The Mountains of the Moon feed the Nile',
			'Waq-Waq is a land of gold trees in the far east',
		],
	},
	{
		nationId: 'nat_buyid',
		knownRegions: [
			MIDDLE_EAST,
			CENTRAL_ASIA,
			INDIA,
			NORTH_AFRICA,
			MEDITERRANEAN,
			EAST_AFRICA,
		],
		explorationCapacity: 5,
		navalRange: 5,
		cartographyLevel: 7,
		knownNations: [
			'nat_fatimid',
			'nat_ghaznavid',
			'nat_karakhanid',
			'nat_byzantine',
			'nat_cordoba',
			'nat_chola',
			'nat_srivijaya',
			'nat_ethiopia',
			'nat_swahili_cities',
			'nat_venice',
			'nat_volga_bulgaria',
			'nat_chalukya',
			'nat_makuria',
			'nat_georgia',
			'nat_armenia',
		],
		myths: [
			'The Sea of Darkness lies beyond India',
			'Gog and Magog are sealed behind iron gates',
		],
	},
	{
		nationId: 'nat_ghaznavid',
		knownRegions: [MIDDLE_EAST, CENTRAL_ASIA, INDIA, NORTH_AFRICA, EAST_ASIA],
		explorationCapacity: 6,
		navalRange: 2,
		cartographyLevel: 6,
		knownNations: [
			'nat_buyid',
			'nat_karakhanid',
			'nat_fatimid',
			'nat_byzantine',
			'nat_chola',
			'nat_chalukya',
			'nat_pala',
			'nat_song',
			'nat_tibet',
			'nat_cordoba',
			'nat_volga_bulgaria',
		],
		myths: [
			'India holds infinite temple treasures',
			'The eastern mountains guard paradise',
		],
	},
	{
		nationId: 'nat_karakhanid',
		knownRegions: [CENTRAL_ASIA, MIDDLE_EAST, EAST_ASIA, INDIA],
		explorationCapacity: 5,
		navalRange: 0,
		cartographyLevel: 4,
		knownNations: [
			'nat_ghaznavid',
			'nat_buyid',
			'nat_song',
			'nat_liao',
			'nat_volga_bulgaria',
			'nat_tibet',
			'nat_fatimid',
			'nat_cordoba',
			'nat_kievan_rus',
			'nat_byzantine',
		],
		myths: [
			'The Jade Gate leads to endless riches',
			'Fierce demons guard the mountain passes',
		],
	},

	// ========================================================================
	// ASIE ORIENTALE
	// ========================================================================
	{
		nationId: 'nat_song',
		knownRegions: [
			EAST_ASIA,
			SOUTHEAST_ASIA,
			INDIA,
			CENTRAL_ASIA,
			MIDDLE_EAST,
			EAST_AFRICA,
			TIBETAN_PLATEAU,
		],
		explorationCapacity: 7,
		navalRange: 8,
		cartographyLevel: 8,
		knownNations: [
			'nat_liao',
			'nat_goryeo',
			'nat_japan',
			'nat_dai_viet',
			'nat_khmer',
			'nat_srivijaya',
			'nat_chola',
			'nat_chalukya',
			'nat_pala',
			'nat_ghaznavid',
			'nat_karakhanid',
			'nat_fatimid',
			'nat_tibet',
			'nat_swahili_cities',
		],
		myths: [
			'Penglai, the island of immortals, floats in the eastern sea',
			'The Western Paradise lies beyond the mountains',
		],
	},
	{
		nationId: 'nat_liao',
		knownRegions: [EAST_ASIA, CENTRAL_ASIA],
		explorationCapacity: 4,
		navalRange: 1,
		cartographyLevel: 3,
		knownNations: [
			'nat_song',
			'nat_goryeo',
			'nat_japan',
			'nat_karakhanid',
			'nat_tibet',
			'nat_dai_viet',
		],
		myths: ['The steppe extends forever to the west'],
	},
	{
		nationId: 'nat_goryeo',
		knownRegions: [EAST_ASIA, SOUTHEAST_ASIA],
		explorationCapacity: 4,
		navalRange: 5,
		cartographyLevel: 5,
		knownNations: [
			'nat_song',
			'nat_liao',
			'nat_japan',
			'nat_dai_viet',
			'nat_srivijaya',
		],
		myths: [
			'The Dragon King rules the eastern seas',
			'Tamna is the gate to the southern ocean',
		],
	},
	{
		nationId: 'nat_japan',
		knownRegions: [EAST_ASIA, SOUTHEAST_ASIA],
		explorationCapacity: 3,
		navalRange: 4,
		cartographyLevel: 4,
		knownNations: [
			'nat_song',
			'nat_liao',
			'nat_goryeo',
			'nat_dai_viet',
			'nat_srivijaya',
			'nat_ainu',
		],
		myths: [
			'Tokoyo-no-kuni lies beneath the sea',
			'Horai holds the elixir of immortality',
		],
	},

	// ========================================================================
	// ASIE DU SUD-EST
	// ========================================================================
	{
		nationId: 'nat_dai_viet',
		knownRegions: [EAST_ASIA, SOUTHEAST_ASIA, INDIA],
		explorationCapacity: 4,
		navalRange: 4,
		cartographyLevel: 4,
		knownNations: [
			'nat_song',
			'nat_khmer',
			'nat_srivijaya',
			'nat_chola',
			'nat_liao',
			'nat_goryeo',
			'nat_japan',
		],
		myths: [
			'The Dragon Lord protects our waters',
			'Southern islands hold spice gardens of the gods',
		],
	},
	{
		nationId: 'nat_khmer',
		knownRegions: [SOUTHEAST_ASIA, INDIA, EAST_ASIA],
		explorationCapacity: 4,
		navalRange: 3,
		cartographyLevel: 4,
		knownNations: [
			'nat_dai_viet',
			'nat_srivijaya',
			'nat_chola',
			'nat_song',
			'nat_pala',
			'nat_chalukya',
		],
		myths: [
			'Mount Meru is the center of the universe',
			'The ocean of milk surrounds all lands',
		],
	},
	{
		nationId: 'nat_srivijaya',
		knownRegions: [SOUTHEAST_ASIA, INDIA, EAST_ASIA, EAST_AFRICA, MIDDLE_EAST],
		explorationCapacity: 6,
		navalRange: 8,
		cartographyLevel: 5,
		knownNations: [
			'nat_song',
			'nat_chola',
			'nat_khmer',
			'nat_dai_viet',
			'nat_pala',
			'nat_fatimid',
			'nat_swahili_cities',
			'nat_japan',
			'nat_goryeo',
			'nat_buyid',
			'nat_chalukya',
		],
		myths: [
			'The Land of Gold lies to the east',
			'Spirits guard the Strait of Malacca',
		],
	},

	// ========================================================================
	// ASIE DU SUD
	// ========================================================================
	{
		nationId: 'nat_chola',
		knownRegions: [INDIA, SOUTHEAST_ASIA, EAST_ASIA, EAST_AFRICA, MIDDLE_EAST],
		explorationCapacity: 7,
		navalRange: 9,
		cartographyLevel: 6,
		knownNations: [
			'nat_chalukya',
			'nat_pala',
			'nat_srivijaya',
			'nat_khmer',
			'nat_song',
			'nat_dai_viet',
			'nat_fatimid',
			'nat_swahili_cities',
			'nat_ghaznavid',
			'nat_byzantine',
			'nat_buyid',
		],
		myths: [
			'Lanka was the fortress of Ravana',
			'The southern ocean leads to the land of the nagas',
		],
	},
	{
		nationId: 'nat_chalukya',
		knownRegions: [INDIA, SOUTHEAST_ASIA, MIDDLE_EAST],
		explorationCapacity: 4,
		navalRange: 3,
		cartographyLevel: 4,
		knownNations: [
			'nat_chola',
			'nat_pala',
			'nat_ghaznavid',
			'nat_srivijaya',
			'nat_buyid',
			'nat_khmer',
			'nat_song',
		],
		myths: ['The gods dwell on Mount Kailasa', 'Patala lies beneath the earth'],
	},
	{
		nationId: 'nat_pala',
		knownRegions: [
			INDIA,
			SOUTHEAST_ASIA,
			EAST_ASIA,
			CENTRAL_ASIA,
			TIBETAN_PLATEAU,
		],
		explorationCapacity: 5,
		navalRange: 4,
		cartographyLevel: 5,
		knownNations: [
			'nat_chola',
			'nat_chalukya',
			'nat_ghaznavid',
			'nat_tibet',
			'nat_srivijaya',
			'nat_khmer',
			'nat_song',
		],
		myths: [
			'Shambhala lies hidden in the northern mountains',
			'The Buddha walked these very lands',
		],
	},

	// ========================================================================
	// AFRIQUE
	// ========================================================================
	{
		nationId: 'nat_ghana',
		knownRegions: [WEST_AFRICA, SAHARA, NORTH_AFRICA],
		explorationCapacity: 4,
		navalRange: 0,
		cartographyLevel: 2,
		knownNations: [
			'nat_kanem',
			'nat_cordoba',
			'nat_fatimid',
			'nat_yoruba',
			'nat_tuareg',
			'nat_igbo',
		],
		myths: [
			'The river of gold flows from the mountains of light',
			'Spirits guard the forest to the south',
		],
	},
	{
		nationId: 'nat_kanem',
		knownRegions: [WEST_AFRICA, SAHARA, NORTH_AFRICA, EAST_AFRICA],
		explorationCapacity: 3,
		navalRange: 0,
		cartographyLevel: 2,
		knownNations: ['nat_ghana', 'nat_fatimid', 'nat_ethiopia', 'nat_cordoba'],
		myths: [
			'The lake is the heart of the world',
			'Giants dwell in the southern forest',
		],
	},
	{
		nationId: 'nat_ethiopia',
		knownRegions: [EAST_AFRICA, NORTH_AFRICA, MIDDLE_EAST],
		explorationCapacity: 3,
		navalRange: 2,
		cartographyLevel: 3,
		knownNations: [
			'nat_fatimid',
			'nat_swahili_cities',
			'nat_kanem',
			'nat_byzantine',
			'nat_buyid',
		],
		myths: [
			'The Ark of the Covenant rests in Aksum',
			'The source of the Nile is the garden of God',
		],
	},
	{
		nationId: 'nat_swahili_cities',
		knownRegions: [EAST_AFRICA, MIDDLE_EAST, INDIA, SOUTHEAST_ASIA],
		explorationCapacity: 5,
		navalRange: 6,
		cartographyLevel: 4,
		knownNations: [
			'nat_fatimid',
			'nat_ethiopia',
			'nat_chola',
			'nat_srivijaya',
			'nat_buyid',
			'nat_song',
		],
		myths: [
			'The land of Zanj holds endless wonders',
			'Sea djinn protect the monsoon routes',
		],
	},

	// ========================================================================
	// AMÉRIQUES
	// ========================================================================
	{
		nationId: 'nat_toltec',
		knownRegions: [MESOAMERICA],
		explorationCapacity: 3,
		navalRange: 1,
		cartographyLevel: 2,
		knownNations: ['nat_maya_states'],
		myths: [
			'Quetzalcoatl sailed east and will return',
			'Mictlan lies beneath the earth',
		],
	},
	{
		nationId: 'nat_maya_states',
		knownRegions: [MESOAMERICA],
		explorationCapacity: 3,
		navalRange: 2,
		cartographyLevel: 3,
		knownNations: ['nat_toltec'],
		myths: [
			'Xibalba is the underworld of the lords of death',
			'The great ocean hides the celestial crocodile',
		],
	},
	{
		nationId: 'nat_mississippian',
		knownRegions: [MISSISSIPPI_VALLEY],
		explorationCapacity: 3,
		navalRange: 1,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'The Great Spirit created the mounds',
			'The sky world sits above the clouds',
		],
	},
	{
		nationId: 'nat_wari',
		knownRegions: [ANDES],
		explorationCapacity: 4,
		navalRange: 2,
		cartographyLevel: 2,
		knownNations: [],
		myths: [
			'Viracocha rose from Lake Titicaca',
			'The mountains are the bones of ancient gods',
		],
	},

	// ========================================================================
	// ASIE CENTRALE
	// ========================================================================
	{
		nationId: 'nat_tibet',
		knownRegions: [TIBETAN_PLATEAU, INDIA, CENTRAL_ASIA, EAST_ASIA],
		explorationCapacity: 3,
		navalRange: 0,
		cartographyLevel: 3,
		knownNations: [
			'nat_song',
			'nat_pala',
			'nat_ghaznavid',
			'nat_karakhanid',
			'nat_liao',
		],
		myths: [
			'Shambhala is a hidden kingdom of enlightenment',
			'The world mountain Sumeru stands at the center of all things',
		],
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 1
	// ========================================================================
	{
		nationId: 'nat_puebloans',
		knownRegions: [SOUTHWEST_NORTH_AMERICA],
		explorationCapacity: 3,
		navalRange: 0,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'The people emerged from the underworld through the sipapu',
			'Spider Grandmother wove the world into being',
		],
	},
	{
		nationId: 'nat_haida',
		knownRegions: [PACIFIC_NORTHWEST],
		explorationCapacity: 5,
		navalRange: 4, // grands canoës de cèdre
		cartographyLevel: 2,
		knownNations: [],
		myths: [
			'Raven stole the sun and brought light to the world',
			'Beneath the ocean lies the realm of the killer whales',
		],
	},
	{
		nationId: 'nat_thule',
		knownRegions: [ARCTIC],
		explorationCapacity: 6, // explorateurs exceptionnels
		navalRange: 3,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'Sedna, mistress of the sea, controls the animals',
			'The Northern Lights are spirits playing ball with walrus skulls',
		],
	},
	{
		nationId: 'nat_tui_tonga',
		knownRegions: [POLYNESIA, SOUTHEAST_ASIA],
		explorationCapacity: 8, // navigateurs extraordinaires
		navalRange: 9,
		cartographyLevel: 3,
		knownNations: [],
		myths: [
			'Maui fished the islands out of the ocean',
			'Tangaloa descended from the sky and created the islands from a rock',
		],
	},
	{
		nationId: 'nat_aboriginal',
		knownRegions: [AUSTRALIA],
		explorationCapacity: 4,
		navalRange: 1,
		cartographyLevel: 2, // songlines = cartographie orale sophistiquée
		knownNations: [],
		myths: [
			'In the Dreamtime the ancestors sang the world into existence',
			'The Rainbow Serpent carved the rivers and valleys',
		],
	},
	{
		nationId: 'nat_sami',
		knownRegions: [LAPLAND, SCANDINAVIA],
		explorationCapacity: 4,
		navalRange: 2,
		cartographyLevel: 1,
		knownNations: ['nat_norway', 'nat_denmark'],
		myths: [
			'The world was created on a reindeer antler',
			'Beaivi the sun goddess rides across the sky in a reindeer sleigh',
		],
	},
	{
		nationId: 'nat_mapuche',
		knownRegions: [SOUTHERN_SOUTH_AMERICA, ANDES],
		explorationCapacity: 3,
		navalRange: 1,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'Treng Treng and Kai Kai, the twin serpents, shaped the land',
			'The pillán spirits dwell in the volcanoes',
		],
	},
	{
		nationId: 'nat_malagasy',
		knownRegions: [MADAGASCAR, EAST_AFRICA, SOUTHEAST_ASIA],
		explorationCapacity: 5,
		navalRange: 5, // héritage austronésien
		cartographyLevel: 2,
		knownNations: [],
		myths: [
			'The ancestors crossed the great ocean from the east',
			'Zanahary created the world and the Vazimba were its first people',
		],
	},
	{
		nationId: 'nat_yoruba',
		knownRegions: [WEST_AFRICA, SAHARA],
		explorationCapacity: 4,
		navalRange: 1,
		cartographyLevel: 2,
		knownNations: ['nat_ghana', 'nat_igbo'],
		myths: [
			'Oduduwa descended from the sky on a chain and founded Ifè',
			'Obatala shaped humans from clay',
		],
	},
	{
		nationId: 'nat_zimbabwe',
		knownRegions: [SOUTHERN_AFRICA, EAST_AFRICA],
		explorationCapacity: 4,
		navalRange: 1,
		cartographyLevel: 2,
		knownNations: [],
		myths: [
			'Mwari the creator speaks from the rocks of Matobo',
			'The walls of Zimbabwe were built by the ancient spirits',
		],
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 2
	// ========================================================================
	{
		nationId: 'nat_chimu',
		knownRegions: [PERUVIAN_COAST, ANDES],
		explorationCapacity: 5,
		navalRange: 3,
		cartographyLevel: 2,
		knownNations: [],
		myths: [
			'Si, the Moon goddess, is more powerful than the Sun',
			'Tacaynamo arrived from the sea on a balsa raft to found the kingdom',
		],
	},
	{
		nationId: 'nat_muisca',
		knownRegions: [COLOMBIAN_HIGHLANDS],
		explorationCapacity: 3,
		navalRange: 0,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'Bochica, the bearded god, taught the people to weave and farm',
			'The golden offerings at Guatavita connect to the spirit world',
		],
	},
	{
		nationId: 'nat_guarani',
		knownRegions: [SOUTH_AMERICAN_SUBTROPICAL, ANDES],
		explorationCapacity: 4,
		navalRange: 1,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'Ñamandú created the world from a palm tree',
			'The Land Without Evil (Yvy Maraey) lies beyond the western mountains',
		],
	},
	{
		nationId: 'nat_hawaii',
		knownRegions: [HAWAII_REGION, POLYNESIA],
		explorationCapacity: 6,
		navalRange: 7,
		cartographyLevel: 3,
		knownNations: [],
		myths: [
			'Māui fished the Hawaiian islands out of the sea',
			'Pele the fire goddess dwells in Kīlauea volcano',
		],
	},
	{
		nationId: 'nat_ainu',
		knownRegions: [HOKKAIDO, EAST_ASIA],
		explorationCapacity: 3,
		navalRange: 2,
		cartographyLevel: 1,
		knownNations: ['nat_japan'],
		myths: [
			'The kamuy (spirits) live in all things of nature',
			'The bear is a kamuy who visits the human world in a fur coat',
		],
	},
	{
		nationId: 'nat_makuria',
		knownRegions: [UPPER_NILE, EAST_AFRICA, NORTH_AFRICA, MIDDLE_EAST],
		explorationCapacity: 5,
		navalRange: 2,
		cartographyLevel: 4,
		knownNations: ['nat_fatimid', 'nat_buyid'],
		myths: [
			'The Nile is the lifeblood of God flowing through the desert',
			'The ancient Nubian kingdoms were children of Kush',
		],
	},
	{
		nationId: 'nat_tuareg',
		knownRegions: [CENTRAL_SAHARA, SAHARA, WEST_AFRICA, NORTH_AFRICA],
		explorationCapacity: 6,
		navalRange: 0,
		cartographyLevel: 3,
		knownNations: ['nat_ghana', 'nat_fatimid'],
		myths: [
			'Tin Hinan, the legendary queen mother, crossed the desert to found the Tuareg',
			'The spirits of the desert (kel essuf) dwell in the sand dunes',
		],
	},
	{
		nationId: 'nat_georgia',
		knownRegions: [CAUCASUS, EUROPE_EAST, MIDDLE_EAST, MEDITERRANEAN],
		explorationCapacity: 5,
		navalRange: 3,
		cartographyLevel: 5,
		knownNations: ['nat_byzantine', 'nat_armenia', 'nat_buyid'],
		myths: [
			'Amirani (Georgian Prometheus) is chained in the Caucasus mountains',
			'Saint Nino brought the True Cross to Georgia',
		],
	},
	{
		nationId: 'nat_armenia',
		knownRegions: [
			CAUCASUS,
			EUROPE_EAST,
			MIDDLE_EAST,
			MEDITERRANEAN,
			CENTRAL_ASIA,
		],
		explorationCapacity: 6,
		navalRange: 2,
		cartographyLevel: 6,
		knownNations: ['nat_byzantine', 'nat_georgia', 'nat_buyid', 'nat_fatimid'],
		myths: [
			'Hayk the archer defeated Bel the tyrant and founded the Armenian nation',
			"Mount Ararat is where Noah's Ark came to rest",
		],
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 3
	// ========================================================================
	{
		nationId: 'nat_hohokam',
		knownRegions: [SOUTHWEST_NORTH_AMERICA],
		explorationCapacity: 3,
		navalRange: 0,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'The ancestors emerged from the underworld through a sipapu',
			'Elder Brother taught the people to dig canals',
		],
	},
	{
		nationId: 'nat_dorset',
		knownRegions: [ARCTIC],
		explorationCapacity: 3,
		navalRange: 2,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'The sea goddess Sedna controls the seals under the ice',
			'The northern lights are spirits playing ball with a walrus skull',
		],
	},
	{
		nationId: 'nat_beothuk',
		knownRegions: [NORTHEAST_AMERICA],
		explorationCapacity: 2,
		navalRange: 2,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'The red ochre protects the living from the spirit world',
			'The caribou were a gift from the Creator',
		],
	},
	{
		nationId: 'nat_dene',
		knownRegions: [SUBARCTIC_CANADA, ARCTIC],
		explorationCapacity: 4,
		navalRange: 0,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'Yamoria the lawmaker chased giant beavers across the land',
			'The caribou and the Dene were once one people',
		],
	},
	{
		nationId: 'nat_mikmaq',
		knownRegions: [NORTHEAST_AMERICA],
		explorationCapacity: 4,
		navalRange: 3,
		cartographyLevel: 2,
		knownNations: [],
		myths: [
			'Glooscap the trickster shaped the land and animals',
			"The seven districts of Mi'kma'ki are ordained by the Creator",
		],
	},
	{
		nationId: 'nat_papuan',
		knownRegions: [NEW_GUINEA],
		explorationCapacity: 2,
		navalRange: 1,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'The ancestors planted the first yam in the highlands',
			'Spirits live in the rivers and mountains of the valleys',
		],
	},
	{
		nationId: 'nat_fiji',
		knownRegions: [FIJI_REGION, POLYNESIA],
		explorationCapacity: 4,
		navalRange: 5,
		cartographyLevel: 2,
		knownNations: [],
		myths: [
			'Degei the serpent god created the islands from the sea',
			'The spirits of chiefs dwell in the afterworld of Burotu',
		],
	},
	{
		nationId: 'nat_chamorro',
		knownRegions: [MARIANA_ISLANDS],
		explorationCapacity: 4,
		navalRange: 5,
		cartographyLevel: 2,
		knownNations: [],
		myths: [
			"Puntan and Fu'una created the world from their bodies",
			'The latte stones hold up the houses of the ancestors',
		],
	},
	{
		nationId: 'nat_guanche',
		knownRegions: [CANARY_ISLANDS],
		explorationCapacity: 1,
		navalRange: 0,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'Achamán the sky god created the world',
			'Mount Teide is the gate to the underworld',
		],
	},
	{
		nationId: 'nat_san',
		knownRegions: [KALAHARI, SOUTHERN_AFRICA],
		explorationCapacity: 5,
		navalRange: 0,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'Cagn the mantis god created all living things',
			'The trance dance opens the door to the spirit world',
		],
	},
	{
		nationId: 'nat_mbuti',
		knownRegions: [CONGO_RAINFOREST],
		explorationCapacity: 3,
		navalRange: 0,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'The forest is father and mother of the Mbuti',
			'When the molimo sings, the forest wakes from its sleep',
		],
	},
	{
		nationId: 'nat_igbo',
		knownRegions: [WEST_AFRICA],
		explorationCapacity: 4,
		navalRange: 1,
		cartographyLevel: 2,
		knownNations: ['nat_ghana', 'nat_yoruba'],
		myths: [
			'Eri descended from the sky and founded the Nri kingdom',
			'Chukwu the supreme god speaks through the oracle of Agbala',
		],
	},
	{
		nationId: 'nat_chukchi',
		knownRegions: [CHUKOTKA],
		explorationCapacity: 4,
		navalRange: 3,
		cartographyLevel: 1,
		knownNations: [],
		myths: [
			'Raven created the world and taught the people to hunt',
			'The reindeer spirit guides the nomads across the tundra',
		],
	},
]
