import type { Infrastructure } from '../../../shared/src/types/world'

// ============================================================================
// Infrastructures majeures — An 1000
// Types : road, bridge, port, aqueduct, canal, wall, fortress, market,
//         granary, mine, irrigation, lighthouse
// condition / strategicValue : 0-10
// ============================================================================

export const infrastructureData: Infrastructure[] = [
	// ========================================================================
	// SAINT-EMPIRE ROMAIN GERMANIQUE
	// ========================================================================
	{
		id: 'inf_hre_aachen_palace',
		type: 'fortress',
		name: "Palais impérial d'Aix-la-Chapelle",
		nationId: 'nat_hre',
		coord: { lat: 50.78, lng: 6.08 },
		condition: 8,
		strategicValue: 9,
	},
	{
		id: 'inf_hre_rhine_road',
		type: 'road',
		name: 'Route du Rhin (vestiges romains)',
		nationId: 'nat_hre',
		coord: { lat: 50.94, lng: 6.96 },
		condition: 4,
		strategicValue: 7,
	},
	{
		id: 'inf_hre_goslar_mine',
		type: 'mine',
		name: "Mines d'argent de Rammelsberg (Goslar)",
		nationId: 'nat_hre',
		coord: { lat: 51.9, lng: 10.43 },
		condition: 8,
		strategicValue: 9,
	},
	{
		id: 'inf_hre_regensburg_bridge',
		type: 'bridge',
		name: 'Pont de Ratisbonne sur le Danube',
		nationId: 'nat_hre',
		coord: { lat: 49.02, lng: 12.1 },
		condition: 6,
		strategicValue: 7,
	},

	// ========================================================================
	// FRANCE
	// ========================================================================
	{
		id: 'inf_france_paris_market',
		type: 'market',
		name: 'Marché de la Cité de Paris',
		nationId: 'nat_france',
		coord: { lat: 48.86, lng: 2.35 },
		condition: 6,
		strategicValue: 7,
	},
	{
		id: 'inf_france_paris_wall',
		type: 'wall',
		name: "Enceinte de l'Île de la Cité",
		nationId: 'nat_france',
		coord: { lat: 48.86, lng: 2.35 },
		condition: 5,
		strategicValue: 6,
	},
	{
		id: 'inf_france_via_agrippa',
		type: 'road',
		name: 'Via Agrippa (vestiges romains)',
		nationId: 'nat_france',
		coord: { lat: 45.76, lng: 4.83 },
		condition: 3,
		strategicValue: 6,
	},

	// ========================================================================
	// ANGLETERRE
	// ========================================================================
	{
		id: 'inf_england_london_bridge',
		type: 'bridge',
		name: 'Pont de Londres (timber)',
		nationId: 'nat_england',
		coord: { lat: 51.51, lng: -0.09 },
		condition: 5,
		strategicValue: 8,
	},
	{
		id: 'inf_england_london_port',
		type: 'port',
		name: 'Port de Londres (Billingsgate)',
		nationId: 'nat_england',
		coord: { lat: 51.51, lng: -0.08 },
		condition: 6,
		strategicValue: 8,
	},
	{
		id: 'inf_england_watling_street',
		type: 'road',
		name: 'Watling Street (voie romaine)',
		nationId: 'nat_england',
		coord: { lat: 52.0, lng: -1.0 },
		condition: 4,
		strategicValue: 7,
	},
	{
		id: 'inf_england_danelaw_fortress',
		type: 'fortress',
		name: 'Burh fortifié de Winchester',
		nationId: 'nat_england',
		coord: { lat: 51.06, lng: -1.31 },
		condition: 7,
		strategicValue: 7,
	},

	// ========================================================================
	// ÉCOSSE
	// ========================================================================
	{
		id: 'inf_scotland_edinburgh_fort',
		type: 'fortress',
		name: 'Forteresse de Din Eidyn (Edinburgh Rock)',
		nationId: 'nat_scotland',
		coord: { lat: 55.95, lng: -3.19 },
		condition: 6,
		strategicValue: 7,
	},

	// ========================================================================
	// ÉTATS PONTIFICAUX
	// ========================================================================
	{
		id: 'inf_papal_rome_aqueduct',
		type: 'aqueduct',
		name: 'Aqueduc romain restauré (Aqua Virgo)',
		nationId: 'nat_papal',
		coord: { lat: 41.9, lng: 12.48 },
		condition: 4,
		strategicValue: 6,
	},
	{
		id: 'inf_papal_via_francigena',
		type: 'road',
		name: 'Via Francigena (pèlerinage)',
		nationId: 'nat_papal',
		coord: { lat: 42.5, lng: 12.0 },
		condition: 5,
		strategicValue: 8,
	},

	// ========================================================================
	// VENISE
	// ========================================================================
	{
		id: 'inf_venice_arsenal',
		type: 'port',
		name: 'Arsenal de Venise (chantier naval)',
		nationId: 'nat_venice',
		coord: { lat: 45.44, lng: 12.36 },
		condition: 8,
		strategicValue: 10,
	},
	{
		id: 'inf_venice_rialto_market',
		type: 'market',
		name: 'Marché du Rialto',
		nationId: 'nat_venice',
		coord: { lat: 45.44, lng: 12.34 },
		condition: 8,
		strategicValue: 9,
	},
	{
		id: 'inf_venice_murano_glass',
		type: 'market',
		name: 'Ateliers de verre de Murano',
		nationId: 'nat_venice',
		coord: { lat: 45.46, lng: 12.35 },
		condition: 7,
		strategicValue: 7,
	},

	// ========================================================================
	// LÉON
	// ========================================================================
	{
		id: 'inf_leon_walls',
		type: 'wall',
		name: 'Murailles romaines de León',
		nationId: 'nat_leon',
		coord: { lat: 42.6, lng: -5.57 },
		condition: 6,
		strategicValue: 7,
	},
	{
		id: 'inf_leon_camino',
		type: 'road',
		name: 'Camino de Santiago (étape León)',
		nationId: 'nat_leon',
		coord: { lat: 42.6, lng: -5.57 },
		condition: 5,
		strategicValue: 7,
	},

	// ========================================================================
	// NAVARRE
	// ========================================================================
	{
		id: 'inf_navarre_pamplona_wall',
		type: 'wall',
		name: 'Enceinte de Pampelune',
		nationId: 'nat_navarre',
		coord: { lat: 42.82, lng: -1.64 },
		condition: 7,
		strategicValue: 7,
	},

	// ========================================================================
	// CALIFAT DE CORDOUE
	// ========================================================================
	{
		id: 'inf_cordoba_bridge',
		type: 'bridge',
		name: 'Pont Romain de Cordoue',
		nationId: 'nat_cordoba',
		coord: { lat: 37.88, lng: -4.78 },
		condition: 8,
		strategicValue: 8,
	},
	{
		id: 'inf_cordoba_irrigation',
		type: 'irrigation',
		name: 'Système de norias du Guadalquivir',
		nationId: 'nat_cordoba',
		coord: { lat: 37.88, lng: -4.78 },
		condition: 9,
		strategicValue: 9,
	},
	{
		id: 'inf_cordoba_aqueduct',
		type: 'aqueduct',
		name: 'Aqueduc de Valdepuentes',
		nationId: 'nat_cordoba',
		coord: { lat: 37.89, lng: -4.86 },
		condition: 8,
		strategicValue: 7,
	},
	{
		id: 'inf_cordoba_market',
		type: 'market',
		name: 'Grand Suq de Cordoue',
		nationId: 'nat_cordoba',
		coord: { lat: 37.88, lng: -4.78 },
		condition: 9,
		strategicValue: 9,
	},

	// ========================================================================
	// DANEMARK
	// ========================================================================
	{
		id: 'inf_denmark_danevirke',
		type: 'wall',
		name: 'Danevirke (mur défensif)',
		nationId: 'nat_denmark',
		coord: { lat: 54.48, lng: 9.53 },
		condition: 7,
		strategicValue: 9,
	},
	{
		id: 'inf_denmark_hedeby_port',
		type: 'port',
		name: 'Port de Hedeby',
		nationId: 'nat_denmark',
		coord: { lat: 54.49, lng: 9.57 },
		condition: 6,
		strategicValue: 8,
	},

	// ========================================================================
	// NORVÈGE
	// ========================================================================
	{
		id: 'inf_norway_nidaros_port',
		type: 'port',
		name: 'Port de Nidaros (Trondheim)',
		nationId: 'nat_norway',
		coord: { lat: 63.43, lng: 10.4 },
		condition: 5,
		strategicValue: 7,
	},

	// ========================================================================
	// SUÈDE
	// ========================================================================
	{
		id: 'inf_sweden_sigtuna_market',
		type: 'market',
		name: 'Marché de Sigtuna',
		nationId: 'nat_sweden',
		coord: { lat: 59.62, lng: 17.72 },
		condition: 6,
		strategicValue: 6,
	},

	// ========================================================================
	// POLOGNE
	// ========================================================================
	{
		id: 'inf_poland_gniezno_fortress',
		type: 'fortress',
		name: 'Gród de Gniezno',
		nationId: 'nat_poland',
		coord: { lat: 52.54, lng: 17.6 },
		condition: 7,
		strategicValue: 8,
	},
	{
		id: 'inf_poland_salt_mine',
		type: 'mine',
		name: 'Mines de sel de Wieliczka',
		nationId: 'nat_poland',
		coord: { lat: 49.98, lng: 20.06 },
		condition: 7,
		strategicValue: 8,
	},

	// ========================================================================
	// HONGRIE
	// ========================================================================
	{
		id: 'inf_hungary_esztergom_fort',
		type: 'fortress',
		name: "Forteresse royale d'Esztergom",
		nationId: 'nat_hungary',
		coord: { lat: 47.79, lng: 18.74 },
		condition: 7,
		strategicValue: 8,
	},

	// ========================================================================
	// RUS' DE KIEV
	// ========================================================================
	{
		id: 'inf_kievan_rus_golden_gate',
		type: 'wall',
		name: 'Porte dorée de Kiev (en construction)',
		nationId: 'nat_kievan_rus',
		coord: { lat: 50.45, lng: 30.51 },
		condition: 6,
		strategicValue: 8,
	},
	{
		id: 'inf_kievan_rus_dnieper_port',
		type: 'port',
		name: 'Port fluvial de Kiev (Dniepr)',
		nationId: 'nat_kievan_rus',
		coord: { lat: 50.44, lng: 30.53 },
		condition: 6,
		strategicValue: 8,
	},
	{
		id: 'inf_kievan_rus_novgorod_market',
		type: 'market',
		name: 'Marché de Novgorod',
		nationId: 'nat_kievan_rus',
		coord: { lat: 58.52, lng: 31.27 },
		condition: 7,
		strategicValue: 8,
	},

	// ========================================================================
	// BULGARIE DE LA VOLGA
	// ========================================================================
	{
		id: 'inf_volga_bulgar_port',
		type: 'port',
		name: 'Port fluvial de Bolghar (Volga)',
		nationId: 'nat_volga_bulgaria',
		coord: { lat: 54.97, lng: 49.05 },
		condition: 6,
		strategicValue: 7,
	},

	// ========================================================================
	// CROATIE
	// ========================================================================
	{
		id: 'inf_croatia_biograd_port',
		type: 'port',
		name: 'Port de Biograd na Moru',
		nationId: 'nat_croatia',
		coord: { lat: 43.94, lng: 15.45 },
		condition: 5,
		strategicValue: 6,
	},

	// ========================================================================
	// EMPIRE BYZANTIN
	// ========================================================================
	{
		id: 'inf_byzantine_walls',
		type: 'wall',
		name: 'Murailles théodosiennes de Constantinople',
		nationId: 'nat_byzantine',
		coord: { lat: 41.01, lng: 28.92 },
		condition: 9,
		strategicValue: 10,
	},
	{
		id: 'inf_byzantine_aqueduct',
		type: 'aqueduct',
		name: 'Aqueduc de Valens',
		nationId: 'nat_byzantine',
		coord: { lat: 41.02, lng: 28.96 },
		condition: 7,
		strategicValue: 8,
	},
	{
		id: 'inf_byzantine_golden_horn_port',
		type: 'port',
		name: "Port de la Corne d'Or",
		nationId: 'nat_byzantine',
		coord: { lat: 41.03, lng: 28.97 },
		condition: 9,
		strategicValue: 10,
	},
	{
		id: 'inf_byzantine_lighthouse',
		type: 'lighthouse',
		name: 'Phare de la Tour de Pharos',
		nationId: 'nat_byzantine',
		coord: { lat: 41.01, lng: 28.98 },
		condition: 7,
		strategicValue: 7,
	},
	{
		id: 'inf_byzantine_via_egnatia',
		type: 'road',
		name: 'Via Egnatia',
		nationId: 'nat_byzantine',
		coord: { lat: 40.64, lng: 22.94 },
		condition: 6,
		strategicValue: 9,
	},
	{
		id: 'inf_byzantine_granary',
		type: 'granary',
		name: 'Greniers impériaux de Constantinople',
		nationId: 'nat_byzantine',
		coord: { lat: 41.01, lng: 28.97 },
		condition: 8,
		strategicValue: 9,
	},

	// ========================================================================
	// CALIFAT FATIMIDE
	// ========================================================================
	{
		id: 'inf_fatimid_cairo_wall',
		type: 'wall',
		name: "Enceinte d'al-Qahira",
		nationId: 'nat_fatimid',
		coord: { lat: 30.05, lng: 31.26 },
		condition: 9,
		strategicValue: 9,
	},
	{
		id: 'inf_fatimid_nile_irrigation',
		type: 'irrigation',
		name: "Canaux d'irrigation du Nil",
		nationId: 'nat_fatimid',
		coord: { lat: 30.0, lng: 31.2 },
		condition: 8,
		strategicValue: 10,
	},
	{
		id: 'inf_fatimid_alexandria_port',
		type: 'port',
		name: "Port d'Alexandrie",
		nationId: 'nat_fatimid',
		coord: { lat: 31.2, lng: 29.92 },
		condition: 8,
		strategicValue: 9,
	},
	{
		id: 'inf_fatimid_lighthouse',
		type: 'lighthouse',
		name: "Phare d'Alexandrie (partiellement ruiné)",
		nationId: 'nat_fatimid',
		coord: { lat: 31.21, lng: 29.89 },
		condition: 4,
		strategicValue: 7,
	},
	{
		id: 'inf_fatimid_market',
		type: 'market',
		name: 'Suq Khan al-Khalili du Caire',
		nationId: 'nat_fatimid',
		coord: { lat: 30.05, lng: 31.26 },
		condition: 9,
		strategicValue: 9,
	},

	// ========================================================================
	// ÉMIRAT BOUYIDE
	// ========================================================================
	{
		id: 'inf_buyid_baghdad_canal',
		type: 'canal',
		name: 'Réseau de canaux de Bagdad',
		nationId: 'nat_buyid',
		coord: { lat: 33.31, lng: 44.37 },
		condition: 6,
		strategicValue: 8,
	},
	{
		id: 'inf_buyid_shiraz_market',
		type: 'market',
		name: 'Bazar de Shiraz',
		nationId: 'nat_buyid',
		coord: { lat: 29.62, lng: 52.53 },
		condition: 7,
		strategicValue: 7,
	},
	{
		id: 'inf_buyid_irrigation',
		type: 'irrigation',
		name: 'Qanats de Mésopotamie',
		nationId: 'nat_buyid',
		coord: { lat: 33.0, lng: 44.4 },
		condition: 5,
		strategicValue: 8,
	},

	// ========================================================================
	// EMPIRE GHAZNAVIDE
	// ========================================================================
	{
		id: 'inf_ghaznavid_fortress',
		type: 'fortress',
		name: 'Citadelle de Ghazni',
		nationId: 'nat_ghaznavid',
		coord: { lat: 33.55, lng: 68.42 },
		condition: 8,
		strategicValue: 9,
	},
	{
		id: 'inf_ghaznavid_road',
		type: 'road',
		name: 'Route royale Ghazni-Lahore',
		nationId: 'nat_ghaznavid',
		coord: { lat: 32.0, lng: 69.0 },
		condition: 6,
		strategicValue: 8,
	},

	// ========================================================================
	// KHANAT KARAKHANIDE
	// ========================================================================
	{
		id: 'inf_karakhanid_samarkand_market',
		type: 'market',
		name: 'Bazar de Samarcande (Route de la Soie)',
		nationId: 'nat_karakhanid',
		coord: { lat: 39.65, lng: 66.96 },
		condition: 7,
		strategicValue: 9,
	},
	{
		id: 'inf_karakhanid_irrigation',
		type: 'irrigation',
		name: "Canaux d'irrigation de Samarcande",
		nationId: 'nat_karakhanid',
		coord: { lat: 39.6, lng: 66.9 },
		condition: 7,
		strategicValue: 8,
	},

	// ========================================================================
	// DYNASTIE SONG
	// ========================================================================
	{
		id: 'inf_song_grand_canal',
		type: 'canal',
		name: 'Grand Canal (Kaifeng-Hangzhou)',
		nationId: 'nat_song',
		coord: { lat: 34.8, lng: 114.3 },
		condition: 8,
		strategicValue: 10,
	},
	{
		id: 'inf_song_kaifeng_wall',
		type: 'wall',
		name: 'Murailles de Kaifeng',
		nationId: 'nat_song',
		coord: { lat: 34.8, lng: 114.35 },
		condition: 9,
		strategicValue: 9,
	},
	{
		id: 'inf_song_kaifeng_market',
		type: 'market',
		name: 'Grand marché nocturne de Kaifeng',
		nationId: 'nat_song',
		coord: { lat: 34.8, lng: 114.35 },
		condition: 9,
		strategicValue: 9,
	},
	{
		id: 'inf_song_granary',
		type: 'granary',
		name: "Greniers impériaux de l'Ever-Normal",
		nationId: 'nat_song',
		coord: { lat: 34.8, lng: 114.35 },
		condition: 9,
		strategicValue: 10,
	},
	{
		id: 'inf_song_guangzhou_port',
		type: 'port',
		name: 'Port de Guangzhou (Canton)',
		nationId: 'nat_song',
		coord: { lat: 23.13, lng: 113.26 },
		condition: 9,
		strategicValue: 10,
	},
	{
		id: 'inf_song_irrigation',
		type: 'irrigation',
		name: "Système d'irrigation de Dujiangyan",
		nationId: 'nat_song',
		coord: { lat: 31.0, lng: 103.6 },
		condition: 9,
		strategicValue: 9,
	},
	{
		id: 'inf_song_iron_mine',
		type: 'mine',
		name: 'Mines de fer du Hebei',
		nationId: 'nat_song',
		coord: { lat: 37.8, lng: 114.5 },
		condition: 8,
		strategicValue: 8,
	},

	// ========================================================================
	// DYNASTIE LIAO
	// ========================================================================
	{
		id: 'inf_liao_fortress',
		type: 'fortress',
		name: 'Forteresse de Shangjing',
		nationId: 'nat_liao',
		coord: { lat: 43.97, lng: 119.0 },
		condition: 7,
		strategicValue: 8,
	},

	// ========================================================================
	// GORYEO
	// ========================================================================
	{
		id: 'inf_goryeo_kaesong_wall',
		type: 'wall',
		name: 'Murailles de Kaesong',
		nationId: 'nat_goryeo',
		coord: { lat: 37.97, lng: 126.55 },
		condition: 8,
		strategicValue: 8,
	},
	{
		id: 'inf_goryeo_granary',
		type: 'granary',
		name: "Greniers royaux d'Uichang",
		nationId: 'nat_goryeo',
		coord: { lat: 37.97, lng: 126.55 },
		condition: 7,
		strategicValue: 7,
	},

	// ========================================================================
	// JAPON
	// ========================================================================
	{
		id: 'inf_japan_kyoto_road',
		type: 'road',
		name: 'Route du Tōkaidō',
		nationId: 'nat_japan',
		coord: { lat: 35.01, lng: 135.77 },
		condition: 6,
		strategicValue: 8,
	},
	{
		id: 'inf_japan_naniwa_port',
		type: 'port',
		name: 'Port de Naniwa (Osaka)',
		nationId: 'nat_japan',
		coord: { lat: 34.69, lng: 135.5 },
		condition: 6,
		strategicValue: 7,
	},

	// ========================================================================
	// ĐẠI VIỆT
	// ========================================================================
	{
		id: 'inf_dai_viet_hoa_lu_fort',
		type: 'fortress',
		name: 'Citadelle de Hoa Lư',
		nationId: 'nat_dai_viet',
		coord: { lat: 20.28, lng: 105.88 },
		condition: 8,
		strategicValue: 8,
	},
	{
		id: 'inf_dai_viet_irrigation',
		type: 'irrigation',
		name: 'Digues du fleuve Rouge',
		nationId: 'nat_dai_viet',
		coord: { lat: 21.03, lng: 105.85 },
		condition: 7,
		strategicValue: 9,
	},

	// ========================================================================
	// EMPIRE KHMER
	// ========================================================================
	{
		id: 'inf_khmer_western_baray',
		type: 'irrigation',
		name: "Baray occidental d'Angkor",
		nationId: 'nat_khmer',
		coord: { lat: 13.38, lng: 103.78 },
		condition: 9,
		strategicValue: 10,
	},
	{
		id: 'inf_khmer_eastern_baray',
		type: 'irrigation',
		name: "Baray oriental d'Angkor",
		nationId: 'nat_khmer',
		coord: { lat: 13.42, lng: 103.92 },
		condition: 7,
		strategicValue: 8,
	},
	{
		id: 'inf_khmer_road_network',
		type: 'road',
		name: 'Routes royales reliant les provinces',
		nationId: 'nat_khmer',
		coord: { lat: 13.44, lng: 103.84 },
		condition: 7,
		strategicValue: 8,
	},

	// ========================================================================
	// SRIVIJAYA
	// ========================================================================
	{
		id: 'inf_srivijaya_palembang_port',
		type: 'port',
		name: 'Port de Palembang',
		nationId: 'nat_srivijaya',
		coord: { lat: -2.99, lng: 104.76 },
		condition: 7,
		strategicValue: 9,
	},

	// ========================================================================
	// EMPIRE CHOLA
	// ========================================================================
	{
		id: 'inf_chola_nagapattinam_port',
		type: 'port',
		name: 'Port de Nagapattinam',
		nationId: 'nat_chola',
		coord: { lat: 10.76, lng: 79.84 },
		condition: 8,
		strategicValue: 9,
	},
	{
		id: 'inf_chola_irrigation',
		type: 'irrigation',
		name: "Système d'irrigation du Kaveri",
		nationId: 'nat_chola',
		coord: { lat: 10.78, lng: 79.13 },
		condition: 9,
		strategicValue: 9,
	},
	{
		id: 'inf_chola_thanjavur_fort',
		type: 'fortress',
		name: 'Fort de Thanjavur',
		nationId: 'nat_chola',
		coord: { lat: 10.78, lng: 79.14 },
		condition: 8,
		strategicValue: 8,
	},

	// ========================================================================
	// CHALUKYA OCCIDENTAUX
	// ========================================================================
	{
		id: 'inf_chalukya_manyakheta_fort',
		type: 'fortress',
		name: 'Forteresse de Manyakheta',
		nationId: 'nat_chalukya',
		coord: { lat: 17.18, lng: 76.52 },
		condition: 7,
		strategicValue: 8,
	},
	{
		id: 'inf_chalukya_irrigation',
		type: 'irrigation',
		name: 'Réservoirs du Deccan (tanks)',
		nationId: 'nat_chalukya',
		coord: { lat: 17.0, lng: 76.5 },
		condition: 6,
		strategicValue: 7,
	},

	// ========================================================================
	// EMPIRE PALA
	// ========================================================================
	{
		id: 'inf_pala_nalanda',
		type: 'market',
		name: 'Complexe marchand de Vikramapura',
		nationId: 'nat_pala',
		coord: { lat: 23.59, lng: 90.37 },
		condition: 6,
		strategicValue: 6,
	},

	// ========================================================================
	// EMPIRE DU GHANA
	// ========================================================================
	{
		id: 'inf_ghana_koumbi_market',
		type: 'market',
		name: 'Marché de Koumbi Saleh',
		nationId: 'nat_ghana',
		coord: { lat: 15.77, lng: -7.98 },
		condition: 7,
		strategicValue: 9,
	},
	{
		id: 'inf_ghana_gold_mine',
		type: 'mine',
		name: "Mines d'or du Bambuk",
		nationId: 'nat_ghana',
		coord: { lat: 12.5, lng: -11.5 },
		condition: 7,
		strategicValue: 10,
	},

	// ========================================================================
	// EMPIRE DU KANEM
	// ========================================================================
	{
		id: 'inf_kanem_njimi_fort',
		type: 'fortress',
		name: 'Forteresse de Njimi',
		nationId: 'nat_kanem',
		coord: { lat: 14.0, lng: 15.5 },
		condition: 5,
		strategicValue: 7,
	},

	// ========================================================================
	// ÉTHIOPIE
	// ========================================================================
	{
		id: 'inf_ethiopia_lalibela_road',
		type: 'road',
		name: 'Route de pèlerinage vers Lalibela',
		nationId: 'nat_ethiopia',
		coord: { lat: 12.03, lng: 39.04 },
		condition: 4,
		strategicValue: 6,
	},

	// ========================================================================
	// CITÉS SWAHILIES
	// ========================================================================
	{
		id: 'inf_swahili_kilwa_port',
		type: 'port',
		name: 'Port de Kilwa Kisiwani',
		nationId: 'nat_swahili_cities',
		coord: { lat: -8.96, lng: 39.52 },
		condition: 7,
		strategicValue: 9,
	},

	// ========================================================================
	// EMPIRE TOLTÈQUE
	// ========================================================================
	{
		id: 'inf_toltec_tula_market',
		type: 'market',
		name: 'Grand marché de Tula',
		nationId: 'nat_toltec',
		coord: { lat: 20.06, lng: -99.34 },
		condition: 7,
		strategicValue: 8,
	},

	// ========================================================================
	// CITÉS-ÉTATS MAYAS
	// ========================================================================
	{
		id: 'inf_maya_sacbe_road',
		type: 'road',
		name: 'Sacbé (chaussée blanche) Chichén Itzá-Uxmal',
		nationId: 'nat_maya_states',
		coord: { lat: 20.68, lng: -88.57 },
		condition: 7,
		strategicValue: 8,
	},
	{
		id: 'inf_maya_cenote',
		type: 'irrigation',
		name: 'Réseau de cenotes de Chichén Itzá',
		nationId: 'nat_maya_states',
		coord: { lat: 20.68, lng: -88.57 },
		condition: 8,
		strategicValue: 9,
	},

	// ========================================================================
	// CULTURE MISSISSIPPIENNE
	// ========================================================================
	{
		id: 'inf_mississippian_cahokia_granary',
		type: 'granary',
		name: 'Greniers communaux de Cahokia',
		nationId: 'nat_mississippian',
		coord: { lat: 38.66, lng: -90.06 },
		condition: 6,
		strategicValue: 7,
	},

	// ========================================================================
	// EMPIRE WARI
	// ========================================================================
	{
		id: 'inf_wari_road',
		type: 'road',
		name: 'Routes impériales Wari (proto-Qhapaq Ñan)',
		nationId: 'nat_wari',
		coord: { lat: -13.1, lng: -74.2 },
		condition: 7,
		strategicValue: 8,
	},
	{
		id: 'inf_wari_terrace_irrigation',
		type: 'irrigation',
		name: 'Terrasses irriguées andines',
		nationId: 'nat_wari',
		coord: { lat: -13.1, lng: -74.2 },
		condition: 8,
		strategicValue: 9,
	},

	// ========================================================================
	// TIBET
	// ========================================================================
	{
		id: 'inf_tibet_lhasa_fort',
		type: 'fortress',
		name: 'Forteresse du Potala de Lhassa',
		nationId: 'nat_tibet',
		coord: { lat: 29.66, lng: 91.12 },
		condition: 6,
		strategicValue: 8,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 1
	// ========================================================================
	{
		id: 'inf_puebloans_chaco_road',
		type: 'road',
		name: 'Routes cérémonielles de Chaco Canyon',
		nationId: 'nat_puebloans',
		coord: { lat: 36.06, lng: -107.96 },
		condition: 7,
		strategicValue: 6,
	},
	{
		id: 'inf_puebloans_irrigation',
		type: 'irrigation',
		name: "Canaux d'irrigation puebloans",
		nationId: 'nat_puebloans',
		coord: { lat: 36.06, lng: -107.96 },
		condition: 7,
		strategicValue: 8,
	},
	{
		id: 'inf_haida_village',
		type: 'port',
		name: 'Port et village fortifié Haida',
		nationId: 'nat_haida',
		coord: { lat: 53.25, lng: -132.07 },
		condition: 7,
		strategicValue: 6,
	},
	{
		id: 'inf_tui_tonga_langi',
		type: 'monument',
		name: 'Langi (tombes royales monumentales de Lapaha)',
		nationId: 'nat_tui_tonga',
		coord: { lat: -21.21, lng: -175.15 },
		condition: 8,
		strategicValue: 7,
	},
	{
		id: 'inf_tui_tonga_port',
		type: 'port',
		name: 'Port de Tongatapu',
		nationId: 'nat_tui_tonga',
		coord: { lat: -21.21, lng: -175.15 },
		condition: 7,
		strategicValue: 8,
	},
	{
		id: 'inf_mapuche_fortification',
		type: 'fortress',
		name: 'Pucará (fortification mapuche)',
		nationId: 'nat_mapuche',
		coord: { lat: -38.74, lng: -72.6 },
		condition: 6,
		strategicValue: 7,
	},
	{
		id: 'inf_malagasy_port',
		type: 'port',
		name: 'Port de Mahilaka',
		nationId: 'nat_malagasy',
		coord: { lat: -15.18, lng: 46.31 },
		condition: 6,
		strategicValue: 7,
	},
	{
		id: 'inf_yoruba_walls',
		type: 'fortress',
		name: "Murailles d'Ifè (Sungbo's Eredo)",
		nationId: 'nat_yoruba',
		coord: { lat: 7.47, lng: 4.56 },
		condition: 7,
		strategicValue: 8,
	},
	{
		id: 'inf_zimbabwe_walls',
		type: 'fortress',
		name: 'Enceinte en pierre sèche du Grand Zimbabwe',
		nationId: 'nat_zimbabwe',
		coord: { lat: -20.27, lng: 30.93 },
		condition: 8,
		strategicValue: 9,
	},
	{
		id: 'inf_zimbabwe_mine',
		type: 'mine',
		name: "Mines d'or du Grand Zimbabwe",
		nationId: 'nat_zimbabwe',
		coord: { lat: -20.27, lng: 30.93 },
		condition: 7,
		strategicValue: 9,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 2
	// ========================================================================
	{
		id: 'inf_chimu_canal',
		type: 'canal',
		name: 'Canal de La Cumbre',
		nationId: 'nat_chimu',
		coord: { lat: -8.1, lng: -79.04 },
		condition: 8,
		strategicValue: 9,
	},
	{
		id: 'inf_chimu_walls',
		type: 'fortress',
		name: 'Murailles de Chan Chan',
		nationId: 'nat_chimu',
		coord: { lat: -8.1, lng: -79.07 },
		condition: 8,
		strategicValue: 8,
	},
	{
		id: 'inf_muisca_road',
		type: 'road',
		name: 'Chemin du sel Muisca',
		nationId: 'nat_muisca',
		coord: { lat: 5.05, lng: -73.8 },
		condition: 6,
		strategicValue: 7,
	},
	{
		id: 'inf_hawaii_fishpond',
		type: 'farm',
		name: "Loko i'a (bassin piscicole) de Waipi'o",
		nationId: 'nat_hawaii',
		coord: { lat: 20.12, lng: -155.59 },
		condition: 7,
		strategicValue: 6,
	},
	{
		id: 'inf_hawaii_heiau',
		type: 'fortress',
		name: "Heiau Mo'okini",
		nationId: 'nat_hawaii',
		coord: { lat: 20.23, lng: -155.88 },
		condition: 7,
		strategicValue: 7,
	},
	{
		id: 'inf_makuria_cathedral',
		type: 'fortress',
		name: 'Cathédrale de Faras',
		nationId: 'nat_makuria',
		coord: { lat: 22.23, lng: 31.62 },
		condition: 7,
		strategicValue: 7,
	},
	{
		id: 'inf_makuria_fortress',
		type: 'fortress',
		name: 'Forteresse de Dongola',
		nationId: 'nat_makuria',
		coord: { lat: 18.22, lng: 30.75 },
		condition: 7,
		strategicValue: 8,
	},
	{
		id: 'inf_tuareg_well',
		type: 'farm',
		name: 'Puits caravaniers de Tadmekka',
		nationId: 'nat_tuareg',
		coord: { lat: 21.06, lng: 0.79 },
		condition: 6,
		strategicValue: 8,
	},
	{
		id: 'inf_georgia_fortress',
		type: 'fortress',
		name: 'Forteresse de Narikala',
		nationId: 'nat_georgia',
		coord: { lat: 41.69, lng: 44.81 },
		condition: 8,
		strategicValue: 9,
	},
	{
		id: 'inf_georgia_monastery',
		type: 'fortress',
		name: 'Monastère de Ghélati',
		nationId: 'nat_georgia',
		coord: { lat: 42.3, lng: 42.77 },
		condition: 8,
		strategicValue: 8,
	},
	{
		id: 'inf_armenia_walls',
		type: 'fortress',
		name: "Murailles d'Ani",
		nationId: 'nat_armenia',
		coord: { lat: 40.51, lng: 43.57 },
		condition: 9,
		strategicValue: 10,
	},
	{
		id: 'inf_armenia_road',
		type: 'road',
		name: 'Route commerciale Ani–Trébizonde',
		nationId: 'nat_armenia',
		coord: { lat: 40.5, lng: 43.0 },
		condition: 7,
		strategicValue: 8,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 3
	// ========================================================================
	{
		id: 'inf_hohokam_canal',
		type: 'canal',
		name: "Canaux d'irrigation Hohokam",
		nationId: 'nat_hohokam',
		coord: { lat: 33.43, lng: -111.93 },
		condition: 7,
		strategicValue: 8,
	},
	{
		id: 'inf_mikmaq_portage',
		type: 'road',
		name: "Sentier de portage Mi'kmaq",
		nationId: 'nat_mikmaq',
		coord: { lat: 46.0, lng: -63.0 },
		condition: 5,
		strategicValue: 5,
	},
	{
		id: 'inf_fiji_drua',
		type: 'port',
		name: 'Port de construction de drua',
		nationId: 'nat_fiji',
		coord: { lat: -17.78, lng: 177.96 },
		condition: 6,
		strategicValue: 6,
	},
	{
		id: 'inf_chamorro_latte',
		type: 'fortress',
		name: 'Village de piliers latte',
		nationId: 'nat_chamorro',
		coord: { lat: 13.47, lng: 144.75 },
		condition: 6,
		strategicValue: 5,
	},
	{
		id: 'inf_guanche_pyramid',
		type: 'fortress',
		name: 'Pyramides de Güímar',
		nationId: 'nat_guanche',
		coord: { lat: 28.31, lng: -16.38 },
		condition: 6,
		strategicValue: 5,
	},
	{
		id: 'inf_igbo_shrine',
		type: 'fortress',
		name: 'Sanctuaire sacré de Nri',
		nationId: 'nat_igbo',
		coord: { lat: 6.07, lng: 6.95 },
		condition: 7,
		strategicValue: 7,
	},
	{
		id: 'inf_igbo_walls',
		type: 'fortress',
		name: "Murailles d'Eredo de Sungbo (Igbo-Ukwu)",
		nationId: 'nat_igbo',
		coord: { lat: 6.65, lng: 3.98 },
		condition: 7,
		strategicValue: 7,
	},
]
