import type { TradeRoute } from '../../../shared/src/types/world'

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
		connectsNations: [
			'nat_byzantine',
			'nat_venice',
			'nat_fatimid',
			'nat_papal',
		],
		goods: ['salt', 'silk', 'spices', 'iron', 'wood', 'gold', 'cotton'],
		danger: 4,
		importance: 8,
	},
	{
		id: 'tr_north_sea_baltic',
		name: 'Commerce de la mer du Nord et Baltique',
		type: 'sea',
		waypoints: [
			{ lat: 55.95, lng: -3.19 }, // Édimbourg
			{ lat: 51.51, lng: -0.13 }, // Londres
			{ lat: 52.37, lng: 4.9 }, // Pays-Bas
			{ lat: 53.55, lng: 10.0 }, // Hambourg
			{ lat: 55.68, lng: 12.57 }, // Copenhague / Hedeby
			{ lat: 59.33, lng: 18.07 }, // Birka / Stockholm
			{ lat: 59.95, lng: 30.32 }, // Novgorod
		],
		connectsNations: [
			'nat_scotland',
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
			{ lat: -11.35, lng: 40.35 }, // Mozambique / Sofala
			{ lat: -20.27, lng: 30.93 }, // Great Zimbabwe
			{ lat: -18.92, lng: 47.52 }, // Madagascar (Mahilaka)
		],
		connectsNations: ['nat_swahili_cities', 'nat_zimbabwe', 'nat_malagasy'],
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
		connectsNations: ['nat_fatimid', 'nat_makuria'],
		goods: ['gold', 'ivory', 'grain', 'papyrus', 'spices'],
		danger: 3,
		importance: 8,
	},

	// ====================================================================
	// Routes commerciales additionnelles
	// ====================================================================

	// --- Routes fluviales ---
	{
		id: 'tr_danube',
		name: 'Route du Danube',
		type: 'river',
		waypoints: [
			{ lat: 48.21, lng: 16.37 }, // Vienne
			{ lat: 47.5, lng: 19.04 }, // Budapest (Buda)
			{ lat: 44.42, lng: 26.1 }, // Belgrade area
			{ lat: 41.01, lng: 28.98 }, // Constantinople
		],
		connectsNations: ['nat_hre', 'nat_hungary', 'nat_croatia', 'nat_byzantine'],
		goods: ['salt', 'iron', 'wood', 'grain', 'furs', 'silver'],
		danger: 4,
		importance: 6,
	},
	{
		id: 'tr_rhine',
		name: 'Route du Rhin',
		type: 'river',
		waypoints: [
			{ lat: 51.96, lng: 4.5 }, // Rotterdam / delta
			{ lat: 50.94, lng: 6.96 }, // Cologne
			{ lat: 50.0, lng: 8.27 }, // Mayence
			{ lat: 47.56, lng: 7.59 }, // Bâle
		],
		connectsNations: ['nat_hre', 'nat_france'],
		goods: ['wine', 'wool', 'iron', 'salt', 'wood', 'stone'],
		danger: 3,
		importance: 6,
	},
	{
		id: 'tr_niger',
		name: 'Route du Niger',
		type: 'river',
		waypoints: [
			{ lat: 11.58, lng: -7.99 }, // Bamako area
			{ lat: 16.77, lng: -3.01 }, // Tombouctou
			{ lat: 16.27, lng: -0.04 }, // Gao
			{ lat: 12.0, lng: 8.52 }, // Kano region
			{ lat: 7.52, lng: 4.54 }, // Ifè (Yoruba)
		],
		connectsNations: ['nat_ghana', 'nat_tuareg', 'nat_kanem', 'nat_yoruba'],
		goods: ['gold', 'salt', 'ivory', 'fish', 'cotton'],
		danger: 4,
		importance: 7,
	},
	{
		id: 'tr_yangtze',
		name: 'Route du Yangtsé',
		type: 'river',
		waypoints: [
			{ lat: 30.57, lng: 104.07 }, // Chengdu area
			{ lat: 30.59, lng: 106.55 }, // Chongqing
			{ lat: 30.6, lng: 114.3 }, // Wuhan
			{ lat: 32.06, lng: 118.8 }, // Nankin
			{ lat: 30.27, lng: 120.15 }, // Hangzhou
		],
		connectsNations: ['nat_song'],
		goods: ['silk', 'salt', 'iron', 'cotton', 'clay', 'wood'],
		danger: 2,
		importance: 9,
	},
	{
		id: 'tr_mekong',
		name: 'Route du Mékong',
		type: 'river',
		waypoints: [
			{ lat: 21.03, lng: 100.72 }, // Yunnan / amont
			{ lat: 17.97, lng: 102.63 }, // Vientiane area
			{ lat: 13.36, lng: 103.86 }, // Angkor area
			{ lat: 10.82, lng: 106.63 }, // Delta du Mékong
		],
		connectsNations: ['nat_khmer', 'nat_dai_viet'],
		goods: ['spices', 'fish', 'gems', 'ivory', 'wood'],
		danger: 4,
		importance: 6,
	},
	{
		id: 'tr_irrawaddy',
		name: "Route de l'Irrawaddy",
		type: 'river',
		waypoints: [
			{ lat: 23.88, lng: 96.12 }, // Mandalay area
			{ lat: 21.97, lng: 96.08 }, // Pagan area
			{ lat: 16.77, lng: 96.17 }, // Rangoun
		],
		connectsNations: ['nat_khmer'],
		goods: ['gems', 'wood', 'cotton', 'ivory'],
		danger: 4,
		importance: 4,
	},

	// --- Routes maritimes ---
	{
		id: 'tr_western_mediterranean',
		name: 'Commerce de la Méditerranée occidentale',
		type: 'sea',
		waypoints: [
			{ lat: 41.39, lng: 2.17 }, // Barcelone area
			{ lat: 37.39, lng: -5.98 }, // Séville
			{ lat: 36.72, lng: -4.42 }, // Málaga
			{ lat: 36.72, lng: 3.06 }, // Alger
			{ lat: 33.97, lng: -6.87 }, // Fès area
		],
		connectsNations: ['nat_cordoba', 'nat_fatimid'],
		goods: ['silk', 'spices', 'gold', 'silver', 'cotton', 'wool'],
		danger: 5,
		importance: 6,
	},
	{
		id: 'tr_atlantic_iberian',
		name: 'Cabotage atlantique ibérique',
		type: 'sea',
		waypoints: [
			{ lat: 51.51, lng: -0.13 }, // Londres
			{ lat: 48.39, lng: -4.49 }, // Brest
			{ lat: 42.88, lng: -8.54 }, // Saint-Jacques
			{ lat: 41.15, lng: -8.61 }, // Porto area
			{ lat: 37.39, lng: -5.98 }, // Séville
		],
		connectsNations: ['nat_england', 'nat_france', 'nat_leon', 'nat_cordoba'],
		goods: ['wool', 'wine', 'salt', 'fish', 'iron'],
		danger: 5,
		importance: 5,
	},
	{
		id: 'tr_south_china_sea',
		name: 'Commerce de la mer de Chine méridionale',
		type: 'sea',
		waypoints: [
			{ lat: 24.91, lng: 118.59 }, // Quanzhou
			{ lat: 16.05, lng: 108.22 }, // Đà Nẵng area
			{ lat: 10.82, lng: 106.63 }, // Delta du Mékong
			{ lat: 1.35, lng: 103.82 }, // Srivijaya
		],
		connectsNations: ['nat_song', 'nat_dai_viet', 'nat_srivijaya'],
		goods: ['silk', 'spices', 'gems', 'cotton', 'ivory'],
		danger: 4,
		importance: 7,
	},
	{
		id: 'tr_japan_sea',
		name: 'Commerce de la mer du Japon',
		type: 'sea',
		waypoints: [
			{ lat: 43.06, lng: 141.35 }, // Ezo / Hokkaido (Aïnous)
			{ lat: 35.02, lng: 135.77 }, // Kyoto / Heian
			{ lat: 33.52, lng: 130.52 }, // Dazaifu / Hakata
			{ lat: 35.18, lng: 129.08 }, // Busan area
			{ lat: 37.57, lng: 126.98 }, // Kaesong area
		],
		connectsNations: ['nat_ainu', 'nat_japan', 'nat_goryeo'],
		goods: ['silk', 'iron', 'silver', 'fish', 'cotton'],
		danger: 4,
		importance: 5,
	},
	{
		id: 'tr_black_sea',
		name: 'Commerce de la mer Noire',
		type: 'sea',
		waypoints: [
			{ lat: 41.01, lng: 28.98 }, // Constantinople
			{ lat: 41.0, lng: 39.72 }, // Trébizonde
			{ lat: 44.62, lng: 33.53 }, // Chersonèse / Crimée
			{ lat: 50.45, lng: 30.52 }, // Kiev (via Dniepr)
		],
		connectsNations: ['nat_byzantine', 'nat_kievan_rus', 'nat_georgia'],
		goods: ['furs', 'silk', 'spices', 'fish', 'gold', 'iron'],
		danger: 4,
		importance: 6,
	},
	{
		id: 'tr_adriatic',
		name: 'Commerce adriatique',
		type: 'sea',
		waypoints: [
			{ lat: 45.44, lng: 12.34 }, // Venise
			{ lat: 43.51, lng: 16.44 }, // Split
			{ lat: 42.44, lng: 18.77 }, // Dubrovnik area
			{ lat: 39.63, lng: 19.92 }, // Corfou
		],
		connectsNations: ['nat_venice', 'nat_croatia', 'nat_byzantine'],
		goods: ['salt', 'fish', 'wood', 'silk', 'spices', 'iron'],
		danger: 3,
		importance: 5,
	},
	{
		id: 'tr_red_sea',
		name: 'Commerce de la mer Rouge',
		type: 'sea',
		waypoints: [
			{ lat: 30.05, lng: 32.56 }, // Suez area
			{ lat: 21.49, lng: 39.19 }, // Djeddah / La Mecque
			{ lat: 15.4, lng: 39.66 }, // Adulis / Massawa
			{ lat: 12.78, lng: 45.04 }, // Aden
		],
		connectsNations: ['nat_fatimid', 'nat_ethiopia'],
		goods: ['spices', 'gold', 'ivory', 'silk', 'gems'],
		danger: 4,
		importance: 7,
	},
	{
		id: 'tr_southeast_asian_coastal',
		name: 'Cabotage côtier sud-est asiatique',
		type: 'sea',
		waypoints: [
			{ lat: 1.35, lng: 103.82 }, // Srivijaya / Palembang
			{ lat: 6.12, lng: 100.37 }, // Kedah
			{ lat: 6.93, lng: 79.85 }, // Ceylan
			{ lat: 9.93, lng: 76.26 }, // Malabar
		],
		connectsNations: ['nat_srivijaya', 'nat_chola'],
		goods: ['spices', 'gems', 'silk', 'cotton', 'ivory'],
		danger: 4,
		importance: 6,
	},

	// --- Routes terrestres ---
	{
		id: 'tr_caucasus',
		name: 'Route du Caucase',
		type: 'land',
		waypoints: [
			{ lat: 41.01, lng: 28.98 }, // Constantinople
			{ lat: 41.0, lng: 39.72 }, // Trébizonde
			{ lat: 41.69, lng: 44.8 }, // Tbilissi
			{ lat: 40.18, lng: 44.51 }, // Erevan area
		],
		connectsNations: ['nat_byzantine', 'nat_georgia', 'nat_armenia'],
		goods: ['silk', 'iron', 'silver', 'horses', 'wool'],
		danger: 5,
		importance: 5,
	},
	{
		id: 'tr_amber_road',
		name: "Route de l'ambre",
		type: 'land',
		waypoints: [
			{ lat: 54.35, lng: 18.65 }, // Gdańsk area
			{ lat: 52.23, lng: 21.01 }, // Varsovie area
			{ lat: 47.5, lng: 19.04 }, // Budapest area
			{ lat: 45.44, lng: 12.34 }, // Venise
		],
		connectsNations: ['nat_poland', 'nat_hungary', 'nat_venice'],
		goods: ['furs', 'gold', 'silver', 'salt', 'iron', 'wool'],
		danger: 4,
		importance: 5,
	},
	{
		id: 'tr_saharan_east',
		name: 'Transsaharienne orientale',
		type: 'land',
		waypoints: [
			{ lat: 32.9, lng: 13.18 }, // Tripoli
			{ lat: 27.05, lng: 14.42 }, // Fezzan
			{ lat: 13.5, lng: 14.85 }, // Njimi (Kanem)
		],
		connectsNations: ['nat_fatimid', 'nat_kanem'],
		goods: ['gold', 'salt', 'ivory', 'copper', 'cotton'],
		danger: 7,
		importance: 5,
	},
	{
		id: 'tr_andean',
		name: 'Route andine',
		type: 'land',
		waypoints: [
			{ lat: -8.1, lng: -79.07 }, // Chan Chan (Chimú)
			{ lat: -12.05, lng: -77.04 }, // Lima area
			{ lat: -13.53, lng: -71.97 }, // Cusco area (Wari)
			{ lat: -16.55, lng: -68.67 }, // Tiwanaku
			{ lat: -33.45, lng: -70.65 }, // Vallée du Mapocho (Mapuche nord)
			{ lat: -38.74, lng: -72.6 }, // Araucanía
		],
		connectsNations: ['nat_chimu', 'nat_wari', 'nat_mapuche'],
		goods: ['gold', 'silver', 'copper', 'cotton', 'wool'],
		danger: 5,
		importance: 5,
	},
	{
		id: 'tr_mesoamerican',
		name: 'Réseau commercial mésoaméricain',
		type: 'land',
		waypoints: [
			{ lat: 19.42, lng: -99.13 }, // Tula / Teotihuacan area
			{ lat: 19.06, lng: -98.31 }, // Cholula
			{ lat: 17.06, lng: -96.73 }, // Oaxaca
			{ lat: 20.68, lng: -88.57 }, // Chichén Itzá
		],
		connectsNations: ['nat_toltec', 'nat_maya_states'],
		goods: ['gold', 'gems', 'cotton', 'salt', 'copper'],
		danger: 4,
		importance: 6,
	},

	// ========================================================================
	// Routes additionnelles — Nations tribales et manquantes
	// ========================================================================

	// --- Europe ---
	{
		id: 'tr_camino_santiago',
		name: 'Chemin de Saint-Jacques-de-Compostelle',
		type: 'land',
		waypoints: [
			{ lat: 47.39, lng: 0.69 }, // Tours
			{ lat: 44.84, lng: -0.58 }, // Bordeaux
			{ lat: 43.01, lng: -1.32 }, // Roncevaux
			{ lat: 42.82, lng: -1.64 }, // Pampelune (Navarre)
			{ lat: 42.34, lng: -3.7 }, // Burgos
			{ lat: 42.6, lng: -5.57 }, // León
			{ lat: 42.88, lng: -8.54 }, // Santiago de Compostelle
		],
		connectsNations: ['nat_france', 'nat_navarre', 'nat_leon'],
		goods: ['wool', 'salt', 'iron', 'gold', 'silver'],
		danger: 3,
		importance: 6,
	},

	// --- Asie de l'Est ---
	{
		id: 'tr_liao_border_markets',
		name: 'Marchés frontaliers Liao-Song',
		type: 'land',
		waypoints: [
			{ lat: 43.97, lng: 118.93 }, // Shangjing (capitale Liao)
			{ lat: 39.9, lng: 116.4 }, // Yanjing / Pékin (Liao sud)
			{ lat: 34.8, lng: 114.31 }, // Kaifeng (capitale Song)
		],
		connectsNations: ['nat_liao', 'nat_song'],
		goods: ['horses', 'furs', 'silk', 'silver', 'iron', 'salt'],
		danger: 3,
		importance: 7,
	},

	// --- Asie centrale ---
	{
		id: 'tr_tea_horse_road',
		name: 'Route du thé et des chevaux',
		type: 'land',
		waypoints: [
			{ lat: 30.0, lng: 103.0 }, // Ya\'an (Sichuan)
			{ lat: 30.05, lng: 101.97 }, // Kangding
			{ lat: 29.65, lng: 91.17 }, // Lhassa
			{ lat: 28.27, lng: 83.97 }, // Mustang / passage népalais
		],
		connectsNations: ['nat_song', 'nat_tibet'],
		goods: ['horses', 'salt', 'wool', 'furs', 'silk', 'spices'],
		danger: 8,
		importance: 6,
	},

	// --- Asie du Sud ---
	{
		id: 'tr_indian_inland',
		name: 'Routes intérieures indiennes',
		type: 'land',
		waypoints: [
			{ lat: 25.61, lng: 85.14 }, // Nalanda (Pala)
			{ lat: 25.32, lng: 83.01 }, // Varanasi
			{ lat: 25.44, lng: 81.85 }, // Prayaga (Allahabad)
			{ lat: 17.38, lng: 76.3 }, // Manyakheta (Chalukya)
			{ lat: 10.79, lng: 79.14 }, // Thanjavur (Chola)
		],
		connectsNations: ['nat_pala', 'nat_chalukya', 'nat_chola'],
		goods: ['spices', 'cotton', 'silk', 'gems', 'gold', 'iron'],
		danger: 4,
		importance: 6,
	},

	// --- Scandinavie / Sami ---
	{
		id: 'tr_sami_fur_trade',
		name: 'Commerce de fourrures sami',
		type: 'land',
		waypoints: [
			{ lat: 69.65, lng: 18.96 }, // Tromsø area
			{ lat: 69.97, lng: 23.27 }, // Alta / Finnmark
			{ lat: 66.5, lng: 25.97 }, // Kemi area (Laponie)
			{ lat: 63.43, lng: 10.4 }, // Trondheim (Nidaros)
		],
		connectsNations: ['nat_sami', 'nat_norway', 'nat_sweden'],
		goods: ['furs', 'fish', 'ivory', 'iron', 'salt', 'wool'],
		danger: 4,
		importance: 4,
	},

	// --- Afrique ---
	{
		id: 'tr_west_african_forest',
		name: 'Commerce forestier ouest-africain',
		type: 'land',
		waypoints: [
			{ lat: 7.52, lng: 4.54 }, // Ifè (Yoruba)
			{ lat: 6.34, lng: 5.62 }, // Bénin City area
			{ lat: 6.44, lng: 7.49 }, // Igbo-Ukwu / Nri
		],
		connectsNations: ['nat_yoruba', 'nat_igbo'],
		goods: ['gold', 'iron', 'ivory', 'copper', 'salt', 'cotton'],
		danger: 3,
		importance: 4,
	},
	{
		id: 'tr_southern_african',
		name: 'Échanges sud-africains',
		type: 'land',
		waypoints: [
			{ lat: -22.22, lng: 29.42 }, // Mapungubwe
			{ lat: -20.27, lng: 30.93 }, // Great Zimbabwe
			{ lat: -22.38, lng: 24.4 }, // Kalahari central
			{ lat: -20.74, lng: 21.17 }, // Tsodilo Hills (San)
		],
		connectsNations: ['nat_zimbabwe', 'nat_san'],
		goods: ['gold', 'ivory', 'furs', 'salt', 'iron'],
		danger: 5,
		importance: 3,
	},
	{
		id: 'tr_ituri_exchange',
		name: "Échanges de la forêt d'Ituri",
		type: 'river',
		waypoints: [
			{ lat: 1.67, lng: 29.22 }, // Forêt d\'Ituri (ouest)
			{ lat: 1.4, lng: 30.5 }, // Ituri (centre)
			{ lat: 0.5, lng: 29.5 }, // Lisières forestières (villages bantous)
		],
		connectsNations: ['nat_mbuti'],
		goods: ['ivory', 'furs', 'wood', 'iron', 'fish'],
		danger: 5,
		importance: 2,
	},

	// --- Amériques du Nord ---
	{
		id: 'tr_mississippi_trade',
		name: 'Commerce du Mississippi',
		type: 'river',
		waypoints: [
			{ lat: 38.63, lng: -90.2 }, // Cahokia
			{ lat: 35.15, lng: -90.05 }, // Memphis area
			{ lat: 31.56, lng: -91.4 }, // Natchez area
			{ lat: 29.95, lng: -90.07 }, // Delta du Mississippi
		],
		connectsNations: ['nat_mississippian'],
		goods: ['copper', 'salt', 'furs', 'clay', 'fish', 'stone'],
		danger: 3,
		importance: 5,
	},
	{
		id: 'tr_southwest_turquoise',
		name: 'Réseau de la turquoise (Sud-Ouest)',
		type: 'land',
		waypoints: [
			{ lat: 36.06, lng: -107.96 }, // Chaco Canyon (Puebloans)
			{ lat: 34.48, lng: -108.73 }, // Zuni area
			{ lat: 33.43, lng: -111.94 }, // Snaketown (Hohokam)
			{ lat: 32.88, lng: -111.75 }, // Casa Grande
		],
		connectsNations: ['nat_puebloans', 'nat_hohokam'],
		goods: ['gems', 'copper', 'salt', 'cotton', 'clay'],
		danger: 4,
		importance: 4,
	},
	{
		id: 'tr_pacific_northwest',
		name: 'Commerce côtier du Pacifique Nord-Ouest',
		type: 'sea',
		waypoints: [
			{ lat: 53.25, lng: -132.07 }, // Haida Gwaii
			{ lat: 57.05, lng: -135.33 }, // Sitka area (Tlingit)
			{ lat: 54.32, lng: -130.32 }, // Prince Rupert area
			{ lat: 49.28, lng: -123.12 }, // Détroit de Georgia
		],
		connectsNations: ['nat_haida'],
		goods: ['fish', 'furs', 'copper', 'wood', 'ivory'],
		danger: 5,
		importance: 3,
	},
	{
		id: 'tr_northeast_woodland',
		name: 'Cabotage nord-atlantique',
		type: 'sea',
		waypoints: [
			{ lat: 44.65, lng: -63.57 }, // Mi\'kma\'ki (Nouvelle-Écosse)
			{ lat: 46.81, lng: -56.77 }, // Terre-Neuve sud (Béothuks)
			{ lat: 48.57, lng: -53.14 }, // Terre-Neuve nord
		],
		connectsNations: ['nat_mikmaq', 'nat_beothuk'],
		goods: ['fish', 'furs', 'copper', 'salt', 'stone'],
		danger: 6,
		importance: 2,
	},
	{
		id: 'tr_subarctic_network',
		name: "Réseau d'échange subarctique",
		type: 'land',
		waypoints: [
			{ lat: 62.45, lng: -114.37 }, // Grand lac des Esclaves (Dénés)
			{ lat: 58.77, lng: -94.17 }, // Churchill / baie d\'Hudson
			{ lat: 63.75, lng: -68.52 }, // Terre de Baffin (Thulé)
		],
		connectsNations: ['nat_dene', 'nat_thule'],
		goods: ['furs', 'copper', 'fish', 'ivory', 'stone'],
		danger: 7,
		importance: 2,
	},

	// --- Amériques du Sud ---
	{
		id: 'tr_muisca_emerald',
		name: 'Commerce muisca (sel, or, émeraudes)',
		type: 'land',
		waypoints: [
			{ lat: 4.71, lng: -74.07 }, // Bacatá (Bogotá)
			{ lat: 5.02, lng: -73.92 }, // Guatavita
			{ lat: 5.53, lng: -73.36 }, // Tunja (Zaque)
			{ lat: 5.71, lng: -72.93 }, // Sogamoso
		],
		connectsNations: ['nat_muisca'],
		goods: ['gold', 'gems', 'salt', 'cotton', 'copper'],
		danger: 3,
		importance: 4,
	},
	{
		id: 'tr_guarani_rivers',
		name: 'Routes fluviales guaranies',
		type: 'river',
		waypoints: [
			{ lat: -25.26, lng: -57.58 }, // Asunción area (Paraguay)
			{ lat: -27.47, lng: -58.83 }, // Corrientes (Paraná)
			{ lat: -34.58, lng: -58.38 }, // Delta du Río de la Plata
		],
		connectsNations: ['nat_guarani'],
		goods: ['fish', 'wood', 'cotton', 'clay', 'furs'],
		danger: 4,
		importance: 3,
	},

	// --- Arctique ---
	{
		id: 'tr_arctic_ivory',
		name: "Route arctique de l'ivoire",
		type: 'sea',
		waypoints: [
			{ lat: 66.07, lng: -169.49 }, // Détroit de Béring (Tchouktches)
			{ lat: 71.29, lng: -156.79 }, // Barrow / Alaska nord
			{ lat: 72.0, lng: -96.0 }, // Passage du Nord-Ouest
			{ lat: 72.32, lng: -65.0 }, // Terre de Baffin nord
			{ lat: 64.17, lng: -51.74 }, // Nuuk / Groenland
		],
		connectsNations: ['nat_chukchi', 'nat_thule', 'nat_dorset'],
		goods: ['ivory', 'furs', 'fish', 'stone'],
		danger: 9,
		importance: 3,
	},

	// --- Pacifique ---
	{
		id: 'tr_polynesian_maritime',
		name: 'Réseau maritime polynésien',
		type: 'sea',
		waypoints: [
			{ lat: -21.21, lng: -175.15 }, // Tongatapu (Tu\'i Tonga)
			{ lat: -17.78, lng: 177.97 }, // Suva / Fidji
			{ lat: -13.83, lng: -171.76 }, // Samoa
			{ lat: 21.31, lng: -157.86 }, // O\'ahu / Hawaï
		],
		connectsNations: ['nat_tui_tonga', 'nat_fiji', 'nat_hawaii'],
		goods: ['fish', 'salt', 'stone', 'wood', 'cotton'],
		danger: 7,
		importance: 4,
	},
	{
		id: 'tr_chamorro_inter_island',
		name: 'Navigation inter-insulaire chamorro',
		type: 'sea',
		waypoints: [
			{ lat: 13.44, lng: 144.79 }, // Guam
			{ lat: 14.15, lng: 145.21 }, // Rota
			{ lat: 15.19, lng: 145.75 }, // Saipan
		],
		connectsNations: ['nat_chamorro'],
		goods: ['fish', 'salt', 'stone', 'clay'],
		danger: 4,
		importance: 2,
	},

	// --- Océanie ---
	{
		id: 'tr_australian_songlines',
		name: 'Pistes de chants australiennes (Songlines)',
		type: 'land',
		waypoints: [
			{ lat: -25.34, lng: 131.04 }, // Uluru
			{ lat: -28.0, lng: 137.77 }, // Lac Eyre
			{ lat: -31.77, lng: 143.63 }, // Darling River
			{ lat: -33.87, lng: 151.21 }, // Côte est (Sydney area)
		],
		connectsNations: ['nat_aboriginal'],
		goods: ['stone', 'salt', 'furs', 'clay', 'wood'],
		danger: 6,
		importance: 3,
	},
	{
		id: 'tr_papuan_highlands',
		name: 'Échanges des Hautes-Terres papoues',
		type: 'land',
		waypoints: [
			{ lat: -5.86, lng: 144.3 }, // Hautes-Terres (Mount Hagen)
			{ lat: -6.07, lng: 145.39 }, // Vallée de Wahgi (Kuk)
			{ lat: -6.73, lng: 147.0 }, // Lae / côte
		],
		connectsNations: ['nat_papuan'],
		goods: ['salt', 'stone', 'furs', 'wood', 'clay'],
		danger: 5,
		importance: 3,
	},
	{
		id: 'tr_canary_islands_trade',
		name: 'Cabotage inter-insulaire canarien',
		type: 'sea',
		waypoints: [
			{ lat: 28.15, lng: -15.65 }, // Gáldar (Gran Canaria)
			{ lat: 28.31, lng: -16.38 }, // Güímar (Tenerife)
			{ lat: 28.95, lng: -13.55 }, // Lanzarote / Fuerteventura
		],
		connectsNations: ['nat_guanche'],
		goods: ['fish', 'salt', 'stone', 'clay', 'cattle'],
		danger: 5,
		importance: 2,
	},
]
