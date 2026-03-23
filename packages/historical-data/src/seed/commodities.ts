import type { Commodity, TradeRoute } from '../../../shared/src/types/world'

// ============================================================================
// Commodités (biens échangeables) — An 1000
// ============================================================================
// baseValue : valeur relative (1 = valeur d'un boisseau de blé)
// weight    : poids relatif (1 = léger/facile à transporter, 10 = lourd/encombrant)
// ============================================================================

export const commodities: Commodity[] = [
	// --- Nourriture ---
	{
		id: 'com_wheat',
		name: 'Blé',
		category: 'food',
		baseValue: 1,
		weight: 5,
		perishable: true,
	},
	{
		id: 'com_rice',
		name: 'Riz',
		category: 'food',
		baseValue: 1.2,
		weight: 5,
		perishable: true,
	},
	{
		id: 'com_millet',
		name: 'Millet',
		category: 'food',
		baseValue: 0.8,
		weight: 5,
		perishable: true,
	},
	{
		id: 'com_barley',
		name: 'Orge',
		category: 'food',
		baseValue: 0.9,
		weight: 5,
		perishable: true,
	},
	{
		id: 'com_maize',
		name: 'Maïs',
		category: 'food',
		baseValue: 1,
		weight: 5,
		perishable: true,
	},
	{
		id: 'com_fish',
		name: 'Poisson',
		category: 'food',
		baseValue: 1.5,
		weight: 4,
		perishable: true,
	},
	{
		id: 'com_dried_fish',
		name: 'Poisson séché',
		category: 'food',
		baseValue: 3,
		weight: 2,
		perishable: false,
	},
	{
		id: 'com_salt',
		name: 'Sel',
		category: 'food',
		baseValue: 8,
		weight: 6,
		perishable: false,
	},
	{
		id: 'com_olive_oil',
		name: "Huile d'olive",
		category: 'food',
		baseValue: 5,
		weight: 7,
		perishable: false,
	},
	{
		id: 'com_wine',
		name: 'Vin',
		category: 'food',
		baseValue: 6,
		weight: 8,
		perishable: false,
	},
	{
		id: 'com_dates',
		name: 'Dattes',
		category: 'food',
		baseValue: 3,
		weight: 3,
		perishable: true,
	},
	{
		id: 'com_honey',
		name: 'Miel',
		category: 'food',
		baseValue: 7,
		weight: 6,
		perishable: false,
	},
	{
		id: 'com_tea',
		name: 'Thé',
		category: 'food',
		baseValue: 15,
		weight: 1,
		perishable: false,
	},

	// --- Bétail ---
	{
		id: 'com_cattle',
		name: 'Bœuf / Bétail',
		category: 'livestock',
		baseValue: 20,
		weight: 10,
		perishable: false,
	},
	{
		id: 'com_horses',
		name: 'Chevaux',
		category: 'livestock',
		baseValue: 50,
		weight: 10,
		perishable: false,
	},
	{
		id: 'com_sheep',
		name: 'Moutons',
		category: 'livestock',
		baseValue: 8,
		weight: 6,
		perishable: false,
	},
	{
		id: 'com_camels',
		name: 'Chameaux',
		category: 'livestock',
		baseValue: 40,
		weight: 10,
		perishable: false,
	},

	// --- Matières premières ---
	{
		id: 'com_iron_ore',
		name: 'Minerai de fer',
		category: 'raw_material',
		baseValue: 4,
		weight: 9,
		perishable: false,
	},
	{
		id: 'com_copper_ore',
		name: 'Minerai de cuivre',
		category: 'raw_material',
		baseValue: 5,
		weight: 9,
		perishable: false,
	},
	{
		id: 'com_tin',
		name: 'Étain',
		category: 'raw_material',
		baseValue: 7,
		weight: 8,
		perishable: false,
	},
	{
		id: 'com_timber',
		name: "Bois d'œuvre",
		category: 'raw_material',
		baseValue: 3,
		weight: 10,
		perishable: false,
	},
	{
		id: 'com_stone',
		name: 'Pierre de taille',
		category: 'raw_material',
		baseValue: 2,
		weight: 10,
		perishable: false,
	},
	{
		id: 'com_cotton',
		name: 'Coton brut',
		category: 'raw_material',
		baseValue: 6,
		weight: 3,
		perishable: false,
	},
	{
		id: 'com_wool',
		name: 'Laine',
		category: 'raw_material',
		baseValue: 5,
		weight: 3,
		perishable: false,
	},
	{
		id: 'com_leather',
		name: 'Cuir',
		category: 'raw_material',
		baseValue: 6,
		weight: 4,
		perishable: false,
	},
	{
		id: 'com_clay',
		name: 'Argile',
		category: 'raw_material',
		baseValue: 1,
		weight: 8,
		perishable: false,
	},
	{
		id: 'com_furs',
		name: 'Fourrures',
		category: 'raw_material',
		baseValue: 15,
		weight: 2,
		perishable: false,
	},

	// --- Biens de luxe ---
	{
		id: 'com_gold',
		name: 'Or',
		category: 'luxury',
		baseValue: 500,
		weight: 8,
		perishable: false,
	},
	{
		id: 'com_silver',
		name: 'Argent (métal)',
		category: 'luxury',
		baseValue: 100,
		weight: 7,
		perishable: false,
	},
	{
		id: 'com_gems',
		name: 'Pierres précieuses',
		category: 'luxury',
		baseValue: 300,
		weight: 1,
		perishable: false,
	},
	{
		id: 'com_silk',
		name: 'Soie',
		category: 'luxury',
		baseValue: 80,
		weight: 1,
		perishable: false,
	},
	{
		id: 'com_spices',
		name: 'Épices',
		category: 'luxury',
		baseValue: 60,
		weight: 1,
		perishable: false,
	},
	{
		id: 'com_incense',
		name: 'Encens et myrrhe',
		category: 'luxury',
		baseValue: 40,
		weight: 1,
		perishable: false,
	},
	{
		id: 'com_ivory',
		name: 'Ivoire',
		category: 'luxury',
		baseValue: 70,
		weight: 5,
		perishable: false,
	},
	{
		id: 'com_amber',
		name: 'Ambre',
		category: 'luxury',
		baseValue: 45,
		weight: 1,
		perishable: false,
	},
	{
		id: 'com_lapis_lazuli',
		name: 'Lapis-lazuli',
		category: 'luxury',
		baseValue: 55,
		weight: 2,
		perishable: false,
	},
	{
		id: 'com_pearls',
		name: 'Perles',
		category: 'luxury',
		baseValue: 120,
		weight: 1,
		perishable: false,
	},
	{
		id: 'com_dyes',
		name: 'Teintures (pourpre, indigo)',
		category: 'luxury',
		baseValue: 35,
		weight: 2,
		perishable: false,
	},

	// --- Biens manufacturés ---
	{
		id: 'com_weapons',
		name: 'Armes forgées',
		category: 'manufactured',
		baseValue: 25,
		weight: 7,
		perishable: false,
	},
	{
		id: 'com_armor',
		name: 'Armures',
		category: 'manufactured',
		baseValue: 40,
		weight: 8,
		perishable: false,
	},
	{
		id: 'com_textiles',
		name: 'Textiles (tissus)',
		category: 'manufactured',
		baseValue: 10,
		weight: 3,
		perishable: false,
	},
	{
		id: 'com_pottery_goods',
		name: 'Poterie et céramique',
		category: 'manufactured',
		baseValue: 5,
		weight: 6,
		perishable: false,
	},
	{
		id: 'com_porcelain',
		name: 'Porcelaine',
		category: 'manufactured',
		baseValue: 50,
		weight: 5,
		perishable: false,
	},
	{
		id: 'com_glass',
		name: 'Verrerie',
		category: 'manufactured',
		baseValue: 20,
		weight: 5,
		perishable: false,
	},
	{
		id: 'com_paper',
		name: 'Papier',
		category: 'manufactured',
		baseValue: 12,
		weight: 2,
		perishable: false,
	},
	{
		id: 'com_books',
		name: 'Livres et manuscrits',
		category: 'manufactured',
		baseValue: 100,
		weight: 3,
		perishable: false,
	},
	// --- Commodités additionnelles ---
	{
		id: 'com_coffee',
		name: 'Café',
		category: 'food',
		baseValue: 15,
		weight: 3,
		perishable: false,
	},
	{
		id: 'com_dried_salmon',
		name: 'Saumon séché',
		category: 'food',
		baseValue: 3,
		weight: 4,
		perishable: true,
	},
	{
		id: 'com_grain',
		name: 'Céréales (mélange)',
		category: 'food',
		baseValue: 1,
		weight: 5,
		perishable: true,
	},
	{
		id: 'com_livestock',
		name: 'Bétail vivant',
		category: 'food',
		baseValue: 8,
		weight: 10,
		perishable: false,
	},
	{
		id: 'com_palm_oil',
		name: 'Huile de palme',
		category: 'food',
		baseValue: 4,
		weight: 6,
		perishable: true,
	},
	{
		id: 'com_emeralds',
		name: 'Émeraudes',
		category: 'luxury',
		baseValue: 200,
		weight: 1,
		perishable: false,
	},
	{
		id: 'com_jewelry',
		name: 'Bijoux',
		category: 'luxury',
		baseValue: 120,
		weight: 1,
		perishable: false,
	},
	{
		id: 'com_obsidian',
		name: 'Obsidienne',
		category: 'raw',
		baseValue: 10,
		weight: 5,
		perishable: false,
	},
	{
		id: 'com_shells',
		name: 'Coquillages (monnaie)',
		category: 'luxury',
		baseValue: 5,
		weight: 1,
		perishable: false,
	},
	{
		id: 'com_slaves',
		name: 'Esclaves',
		category: 'raw',
		baseValue: 50,
		weight: 10,
		perishable: false,
	},
	{
		id: 'com_tropical_wood',
		name: 'Bois tropical',
		category: 'raw',
		baseValue: 8,
		weight: 8,
		perishable: false,
	},
	{
		id: 'com_turquoise',
		name: 'Turquoise',
		category: 'luxury',
		baseValue: 80,
		weight: 1,
		perishable: false,
	},
	{
		id: 'com_iron_goods',
		name: 'Articles en fer',
		category: 'manufactured',
		baseValue: 15,
		weight: 7,
		perishable: false,
	},
]

// ============================================================================
// Routes commerciales majeures — An 1000
// ============================================================================
// goods : ResourceType[] (catégories de ressources échangées, pas des commodity IDs)
// danger / importance : 0-10
// ============================================================================

export const tradeRoutes: TradeRoute[] = [
	{
		id: 'tr_silk_road',
		name: 'Route de la Soie (terrestre)',
		type: 'land',
		waypoints: [
			{ lat: 34.26, lng: 108.94 }, // Chang'an / Xi'an
			{ lat: 36.73, lng: 78.47 }, // Khotan
			{ lat: 39.47, lng: 75.99 }, // Kashgar
			{ lat: 39.65, lng: 66.96 }, // Samarcande
			{ lat: 35.69, lng: 51.39 }, // Téhéran / Rey
			{ lat: 36.2, lng: 37.16 }, // Alep
			{ lat: 41.01, lng: 28.98 }, // Constantinople
		],
		connectsNations: [
			'nat_song',
			'nat_karakhanid',
			'nat_ghaznavid',
			'nat_buyid',
			'nat_byzantine',
		],
		goods: ['silk', 'spices', 'gems', 'gold', 'horses', 'cotton', 'ivory'],
		danger: 6,
		importance: 10,
	},
	{
		id: 'tr_maritime_silk_road',
		name: 'Route de la Soie maritime',
		type: 'sea',
		waypoints: [
			{ lat: 23.13, lng: 113.26 }, // Canton / Guangzhou
			{ lat: 10.82, lng: 106.63 }, // Delta du Mékong
			{ lat: 1.35, lng: 103.82 }, // Srivijaya / Singapour
			{ lat: 6.93, lng: 79.85 }, // Ceylan
			{ lat: 9.93, lng: 76.26 }, // Malabar
			{ lat: 23.02, lng: 72.57 }, // Gujarat
			{ lat: 12.78, lng: 45.04 }, // Aden
			{ lat: 30.04, lng: 31.24 }, // Le Caire (via mer Rouge)
		],
		connectsNations: ['nat_song', 'nat_srivijaya', 'nat_chola', 'nat_fatimid'],
		goods: ['silk', 'spices', 'gems', 'cotton', 'ivory', 'gold'],
		danger: 5,
		importance: 9,
	},
	{
		id: 'tr_trans_saharan',
		name: 'Routes transsahariennes',
		type: 'land',
		waypoints: [
			{ lat: 33.97, lng: -6.87 }, // Fès
			{ lat: 31.63, lng: -8.01 }, // Marrakech
			{ lat: 16.77, lng: -3.01 }, // Tombouctou
			{ lat: 13.51, lng: -2.11 }, // Koumbi Saleh (Ghana)
			{ lat: 12.0, lng: 8.52 }, // Kano
		],
		connectsNations: ['nat_fatimid', 'nat_ghana'],
		goods: ['gold', 'salt', 'ivory', 'furs', 'copper'],
		danger: 7,
		importance: 8,
	},
	{
		id: 'tr_varangian_route',
		name: 'Route des Varègues (De la Baltique à Byzance)',
		type: 'river',
		waypoints: [
			{ lat: 59.95, lng: 30.32 }, // Novgorod (Ladoga)
			{ lat: 56.33, lng: 44.0 }, // Volga supérieure
			{ lat: 50.45, lng: 30.52 }, // Kiev
			{ lat: 41.01, lng: 28.98 }, // Constantinople
		],
		connectsNations: ['nat_kievan_rus', 'nat_byzantine'],
		goods: ['furs', 'silver', 'gold', 'silk', 'spices', 'iron'],
		danger: 5,
		importance: 7,
	},
	{
		id: 'tr_volga_route',
		name: 'Route de la Volga',
		type: 'river',
		waypoints: [
			{ lat: 59.95, lng: 30.32 }, // Novgorod
			{ lat: 55.79, lng: 49.11 }, // Bulgar
			{ lat: 46.35, lng: 48.04 }, // Itil (Volga delta)
			{ lat: 39.65, lng: 66.96 }, // Samarcande (via Caspienne)
		],
		connectsNations: ['nat_kievan_rus', 'nat_volga_bulgaria', 'nat_karakhanid'],
		goods: ['furs', 'silver', 'silk', 'spices', 'iron', 'horses'],
		danger: 5,
		importance: 6,
	},
	{
		id: 'tr_mediterranean',
		name: 'Commerce méditerranéen',
		type: 'sea',
		waypoints: [
			{ lat: 41.01, lng: 28.98 }, // Constantinople
			{ lat: 37.98, lng: 23.73 }, // Athènes
			{ lat: 45.44, lng: 12.34 }, // Venise
			{ lat: 41.9, lng: 12.5 }, // Rome
			{ lat: 36.72, lng: 3.06 }, // Alger
			{ lat: 36.81, lng: 10.18 }, // Tunis
			{ lat: 31.2, lng: 29.92 }, // Alexandrie
		],
		connectsNations: ['nat_byzantine', 'nat_venice', 'nat_fatimid'],
		goods: ['salt', 'silk', 'spices', 'iron', 'wood', 'gold', 'cotton'],
		danger: 4,
		importance: 8,
	},
	{
		id: 'tr_north_sea_baltic',
		name: 'Commerce de la mer du Nord et Baltique',
		type: 'sea',
		waypoints: [
			{ lat: 51.51, lng: -0.13 }, // Londres
			{ lat: 52.37, lng: 4.9 }, // Pays-Bas
			{ lat: 53.55, lng: 10.0 }, // Hambourg
			{ lat: 55.68, lng: 12.57 }, // Copenhague / Hedeby
			{ lat: 59.33, lng: 18.07 }, // Birka / Stockholm
			{ lat: 59.95, lng: 30.32 }, // Novgorod
		],
		connectsNations: [
			'nat_england',
			'nat_denmark',
			'nat_norway',
			'nat_sweden',
			'nat_kievan_rus',
		],
		goods: ['furs', 'fish', 'wood', 'wool', 'iron', 'salt'],
		danger: 5,
		importance: 7,
	},
	{
		id: 'tr_incense_route',
		name: "Route de l'encens",
		type: 'land',
		waypoints: [
			{ lat: 15.36, lng: 44.21 }, // Sanaa (Yémen)
			{ lat: 21.49, lng: 39.19 }, // La Mecque
			{ lat: 29.98, lng: 31.13 }, // Le Caire
			{ lat: 31.77, lng: 35.23 }, // Jérusalem
			{ lat: 33.89, lng: 35.5 }, // Beyrouth
		],
		connectsNations: ['nat_fatimid'],
		goods: ['spices', 'gold', 'ivory', 'gems', 'silk'],
		danger: 4,
		importance: 6,
	},
	{
		id: 'tr_indian_ocean',
		name: "Commerce de l'océan Indien",
		type: 'sea',
		waypoints: [
			{ lat: 12.78, lng: 45.04 }, // Aden
			{ lat: -6.17, lng: 39.19 }, // Zanzibar / Côte swahilie
			{ lat: 19.08, lng: 72.88 }, // Mumbai / Konkan
			{ lat: 6.93, lng: 79.85 }, // Ceylan
			{ lat: 1.35, lng: 103.82 }, // Srivijaya
		],
		connectsNations: [
			'nat_fatimid',
			'nat_chola',
			'nat_srivijaya',
			'nat_swahili_cities',
		],
		goods: ['spices', 'ivory', 'gold', 'gems', 'silk', 'cotton'],
		danger: 5,
		importance: 8,
	},
	{
		id: 'tr_east_african_coast',
		name: 'Commerce côtier est-africain',
		type: 'sea',
		waypoints: [
			{ lat: -1.29, lng: 36.82 }, // Intérieur est-africain
			{ lat: -4.05, lng: 39.67 }, // Mombasa
			{ lat: -6.17, lng: 39.19 }, // Zanzibar
			{ lat: -8.84, lng: 39.29 }, // Kilwa
			{ lat: -11.35, lng: 40.35 }, // Mozambique
		],
		connectsNations: ['nat_swahili_cities'],
		goods: ['gold', 'ivory', 'iron', 'spices', 'copper'],
		danger: 4,
		importance: 5,
	},
	{
		id: 'tr_grand_canal_china',
		name: 'Grand Canal (Chine)',
		type: 'river',
		waypoints: [
			{ lat: 39.9, lng: 116.4 }, // Pékin (nord)
			{ lat: 34.26, lng: 108.94 }, // Xi'an
			{ lat: 30.27, lng: 120.15 }, // Hangzhou (sud)
		],
		connectsNations: ['nat_song'],
		goods: ['silk', 'iron', 'salt', 'wood', 'cotton', 'clay'],
		danger: 2,
		importance: 9,
	},
	{
		id: 'tr_nile',
		name: 'Route du Nil',
		type: 'river',
		waypoints: [
			{ lat: 30.05, lng: 31.24 }, // Le Caire / Fustat
			{ lat: 25.69, lng: 32.64 }, // Louxor
			{ lat: 15.6, lng: 32.54 }, // Khartoum
		],
		connectsNations: ['nat_fatimid', 'nat_nubia'],
		goods: ['gold', 'ivory', 'grain', 'papyrus', 'spices'],
		danger: 3,
		importance: 8,
	},
]
