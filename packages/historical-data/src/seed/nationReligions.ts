import type { NationReligion } from '../../../shared/src/types/world'

// ============================================================================
// Religions par nation — An 1000
// ============================================================================

export const nationReligions: NationReligion[] = [
	// ========================================================================
	// EUROPE OCCIDENTALE
	// ========================================================================
	{
		nationId: 'nat_hre',
		stateReligionId: 'rel_catholic',
		religions: [
			{ religionId: 'rel_catholic', percentage: 0.95, status: 'state' },
			{ religionId: 'rel_judaism', percentage: 0.02, status: 'tolerated' },
			{
				religionId: 'rel_slavic_paganism',
				percentage: 0.03,
				status: 'persecuted',
			},
		],
		religiousTension: 2,
	},
	{
		nationId: 'nat_france',
		stateReligionId: 'rel_catholic',
		religions: [
			{ religionId: 'rel_catholic', percentage: 0.96, status: 'state' },
			{ religionId: 'rel_judaism', percentage: 0.02, status: 'tolerated' },
		],
		religiousTension: 1,
	},
	{
		nationId: 'nat_england',
		stateReligionId: 'rel_catholic',
		religions: [
			{ religionId: 'rel_catholic', percentage: 0.92, status: 'state' },
			{
				religionId: 'rel_norse_paganism',
				percentage: 0.05,
				status: 'tolerated',
			},
			{ religionId: 'rel_judaism', percentage: 0.01, status: 'tolerated' },
		],
		religiousTension: 3,
	},
	{
		nationId: 'nat_scotland',
		stateReligionId: 'rel_catholic',
		religions: [
			{ religionId: 'rel_catholic', percentage: 0.9, status: 'state' },
			{
				religionId: 'rel_norse_paganism',
				percentage: 0.08,
				status: 'tolerated',
			},
		],
		religiousTension: 2,
	},
	{
		nationId: 'nat_papal',
		stateReligionId: 'rel_catholic',
		religions: [
			{ religionId: 'rel_catholic', percentage: 0.97, status: 'state' },
			{ religionId: 'rel_judaism', percentage: 0.03, status: 'tolerated' },
		],
		religiousTension: 1,
	},
	{
		nationId: 'nat_venice',
		stateReligionId: 'rel_catholic',
		religions: [
			{ religionId: 'rel_catholic', percentage: 0.9, status: 'state' },
			{ religionId: 'rel_orthodox', percentage: 0.04, status: 'tolerated' },
			{ religionId: 'rel_judaism', percentage: 0.03, status: 'tolerated' },
			{ religionId: 'rel_sunni', percentage: 0.03, status: 'tolerated' },
		],
		religiousTension: 2,
	},

	// ========================================================================
	// IBÉRIE
	// ========================================================================
	{
		nationId: 'nat_leon',
		stateReligionId: 'rel_catholic',
		religions: [
			{ religionId: 'rel_catholic', percentage: 0.88, status: 'state' },
			{ religionId: 'rel_sunni', percentage: 0.05, status: 'tolerated' },
			{ religionId: 'rel_judaism', percentage: 0.05, status: 'tolerated' },
		],
		religiousTension: 4,
	},
	{
		nationId: 'nat_navarre',
		stateReligionId: 'rel_catholic',
		religions: [
			{ religionId: 'rel_catholic', percentage: 0.92, status: 'state' },
			{ religionId: 'rel_sunni', percentage: 0.04, status: 'tolerated' },
			{ religionId: 'rel_judaism', percentage: 0.04, status: 'tolerated' },
		],
		religiousTension: 3,
	},
	{
		nationId: 'nat_cordoba',
		stateReligionId: 'rel_sunni',
		religions: [
			{ religionId: 'rel_sunni', percentage: 0.65, status: 'state' },
			{ religionId: 'rel_catholic', percentage: 0.22, status: 'tolerated' },
			{ religionId: 'rel_judaism', percentage: 0.1, status: 'tolerated' },
			{ religionId: 'rel_shia', percentage: 0.03, status: 'minority' },
		],
		religiousTension: 4,
	},

	// ========================================================================
	// SCANDINAVIE
	// ========================================================================
	{
		nationId: 'nat_denmark',
		stateReligionId: 'rel_catholic',
		religions: [
			{ religionId: 'rel_catholic', percentage: 0.7, status: 'state' },
			{
				religionId: 'rel_norse_paganism',
				percentage: 0.28,
				status: 'tolerated',
			},
		],
		religiousTension: 4,
	},
	{
		nationId: 'nat_norway',
		stateReligionId: 'rel_catholic',
		religions: [
			{ religionId: 'rel_catholic', percentage: 0.55, status: 'state' },
			{
				religionId: 'rel_norse_paganism',
				percentage: 0.43,
				status: 'tolerated',
			},
		],
		religiousTension: 6,
	},
	{
		nationId: 'nat_sweden',
		stateReligionId: null,
		religions: [
			{ religionId: 'rel_norse_paganism', percentage: 0.6, status: 'state' },
			{ religionId: 'rel_catholic', percentage: 0.38, status: 'tolerated' },
		],
		religiousTension: 5,
	},

	// ========================================================================
	// EUROPE ORIENTALE
	// ========================================================================
	{
		nationId: 'nat_poland',
		stateReligionId: 'rel_catholic',
		religions: [
			{ religionId: 'rel_catholic', percentage: 0.75, status: 'state' },
			{
				religionId: 'rel_slavic_paganism',
				percentage: 0.22,
				status: 'persecuted',
			},
			{ religionId: 'rel_judaism', percentage: 0.03, status: 'tolerated' },
		],
		religiousTension: 5,
	},
	{
		nationId: 'nat_hungary',
		stateReligionId: 'rel_catholic',
		religions: [
			{ religionId: 'rel_catholic', percentage: 0.65, status: 'state' },
			{ religionId: 'rel_tengriism', percentage: 0.2, status: 'tolerated' },
			{ religionId: 'rel_orthodox', percentage: 0.1, status: 'tolerated' },
			{ religionId: 'rel_judaism', percentage: 0.03, status: 'tolerated' },
		],
		religiousTension: 5,
	},
	{
		nationId: 'nat_kievan_rus',
		stateReligionId: 'rel_orthodox',
		religions: [
			{ religionId: 'rel_orthodox', percentage: 0.65, status: 'state' },
			{
				religionId: 'rel_slavic_paganism',
				percentage: 0.3,
				status: 'tolerated',
			},
			{ religionId: 'rel_judaism', percentage: 0.02, status: 'tolerated' },
			{ religionId: 'rel_sunni', percentage: 0.03, status: 'minority' },
		],
		religiousTension: 4,
	},
	{
		nationId: 'nat_volga_bulgaria',
		stateReligionId: 'rel_sunni',
		religions: [
			{ religionId: 'rel_sunni', percentage: 0.7, status: 'state' },
			{ religionId: 'rel_tengriism', percentage: 0.2, status: 'tolerated' },
			{
				religionId: 'rel_slavic_paganism',
				percentage: 0.08,
				status: 'minority',
			},
		],
		religiousTension: 3,
	},
	{
		nationId: 'nat_croatia',
		stateReligionId: 'rel_catholic',
		religions: [
			{ religionId: 'rel_catholic', percentage: 0.9, status: 'state' },
			{ religionId: 'rel_orthodox', percentage: 0.07, status: 'tolerated' },
		],
		religiousTension: 2,
	},

	// ========================================================================
	// BYZANCE
	// ========================================================================
	{
		nationId: 'nat_byzantine',
		stateReligionId: 'rel_orthodox',
		religions: [
			{ religionId: 'rel_orthodox', percentage: 0.85, status: 'state' },
			{ religionId: 'rel_sunni', percentage: 0.05, status: 'tolerated' },
			{ religionId: 'rel_judaism', percentage: 0.04, status: 'tolerated' },
			{ religionId: 'rel_catholic', percentage: 0.03, status: 'minority' },
			{ religionId: 'rel_nestorian', percentage: 0.03, status: 'tolerated' },
		],
		religiousTension: 3,
	},

	// ========================================================================
	// MONDE ISLAMIQUE
	// ========================================================================
	{
		nationId: 'nat_fatimid',
		stateReligionId: 'rel_ismaili',
		religions: [
			{ religionId: 'rel_sunni', percentage: 0.55, status: 'tolerated' },
			{ religionId: 'rel_ismaili', percentage: 0.15, status: 'state' },
			{ religionId: 'rel_coptic', percentage: 0.2, status: 'tolerated' },
			{ religionId: 'rel_judaism', percentage: 0.05, status: 'tolerated' },
			{ religionId: 'rel_shia', percentage: 0.05, status: 'tolerated' },
		],
		religiousTension: 4,
	},
	{
		nationId: 'nat_buyid',
		stateReligionId: 'rel_shia',
		religions: [
			{ religionId: 'rel_shia', percentage: 0.4, status: 'state' },
			{ religionId: 'rel_sunni', percentage: 0.45, status: 'tolerated' },
			{ religionId: 'rel_nestorian', percentage: 0.05, status: 'tolerated' },
			{ religionId: 'rel_judaism', percentage: 0.05, status: 'tolerated' },
			{
				religionId: 'rel_zoroastrianism',
				percentage: 0.05,
				status: 'tolerated',
			},
		],
		religiousTension: 5,
	},
	{
		nationId: 'nat_ghaznavid',
		stateReligionId: 'rel_sunni',
		religions: [
			{ religionId: 'rel_sunni', percentage: 0.6, status: 'state' },
			{
				religionId: 'rel_hinduism_shaivism',
				percentage: 0.2,
				status: 'persecuted',
			},
			{
				religionId: 'rel_hinduism_vaishnavism',
				percentage: 0.08,
				status: 'persecuted',
			},
			{
				religionId: 'rel_mahayana',
				percentage: 0.07,
				status: 'persecuted',
			},
			{
				religionId: 'rel_zoroastrianism',
				percentage: 0.05,
				status: 'persecuted',
			},
		],
		religiousTension: 7,
	},
	{
		nationId: 'nat_karakhanid',
		stateReligionId: 'rel_sunni',
		religions: [
			{ religionId: 'rel_sunni', percentage: 0.65, status: 'state' },
			{ religionId: 'rel_tengriism', percentage: 0.2, status: 'tolerated' },
			{ religionId: 'rel_nestorian', percentage: 0.05, status: 'tolerated' },
			{ religionId: 'rel_mahayana', percentage: 0.05, status: 'tolerated' },
			{
				religionId: 'rel_zoroastrianism',
				percentage: 0.05,
				status: 'minority',
			},
		],
		religiousTension: 4,
	},

	// ========================================================================
	// ASIE ORIENTALE
	// ========================================================================
	{
		nationId: 'nat_song',
		stateReligionId: null,
		religions: [
			{ religionId: 'rel_confucianism', percentage: 0.4, status: 'state' },
			{ religionId: 'rel_taoism', percentage: 0.25, status: 'tolerated' },
			{ religionId: 'rel_mahayana', percentage: 0.3, status: 'tolerated' },
			{ religionId: 'rel_sunni', percentage: 0.02, status: 'minority' },
			{ religionId: 'rel_nestorian', percentage: 0.01, status: 'minority' },
		],
		religiousTension: 1,
	},
	{
		nationId: 'nat_liao',
		stateReligionId: null,
		religions: [
			{ religionId: 'rel_mahayana', percentage: 0.4, status: 'tolerated' },
			{ religionId: 'rel_tengriism', percentage: 0.3, status: 'tolerated' },
			{ religionId: 'rel_confucianism', percentage: 0.15, status: 'tolerated' },
			{ religionId: 'rel_taoism', percentage: 0.1, status: 'tolerated' },
		],
		religiousTension: 2,
	},
	{
		nationId: 'nat_goryeo',
		stateReligionId: null,
		religions: [
			{ religionId: 'rel_mahayana', percentage: 0.55, status: 'state' },
			{ religionId: 'rel_confucianism', percentage: 0.3, status: 'tolerated' },
			{ religionId: 'rel_taoism', percentage: 0.1, status: 'tolerated' },
		],
		religiousTension: 1,
	},
	{
		nationId: 'nat_japan',
		stateReligionId: null,
		religions: [
			{ religionId: 'rel_mahayana', percentage: 0.45, status: 'tolerated' },
			{ religionId: 'rel_shinto', percentage: 0.45, status: 'state' },
			{ religionId: 'rel_confucianism', percentage: 0.08, status: 'tolerated' },
		],
		religiousTension: 1,
	},

	// ========================================================================
	// ASIE DU SUD-EST
	// ========================================================================
	{
		nationId: 'nat_dai_viet',
		stateReligionId: null,
		religions: [
			{ religionId: 'rel_mahayana', percentage: 0.5, status: 'state' },
			{ religionId: 'rel_confucianism', percentage: 0.25, status: 'tolerated' },
			{ religionId: 'rel_taoism', percentage: 0.2, status: 'tolerated' },
		],
		religiousTension: 1,
	},
	{
		nationId: 'nat_khmer',
		stateReligionId: 'rel_hinduism_shaivism',
		religions: [
			{
				religionId: 'rel_hinduism_shaivism',
				percentage: 0.45,
				status: 'state',
			},
			{
				religionId: 'rel_hinduism_vaishnavism',
				percentage: 0.15,
				status: 'tolerated',
			},
			{ religionId: 'rel_mahayana', percentage: 0.3, status: 'tolerated' },
			{ religionId: 'rel_theravada', percentage: 0.08, status: 'tolerated' },
		],
		religiousTension: 2,
	},
	{
		nationId: 'nat_srivijaya',
		stateReligionId: 'rel_mahayana',
		religions: [
			{ religionId: 'rel_mahayana', percentage: 0.45, status: 'state' },
			{
				religionId: 'rel_hinduism_shaivism',
				percentage: 0.25,
				status: 'tolerated',
			},
			{ religionId: 'rel_theravada', percentage: 0.15, status: 'tolerated' },
			{ religionId: 'rel_sunni', percentage: 0.1, status: 'minority' },
		],
		religiousTension: 2,
	},

	// ========================================================================
	// ASIE DU SUD
	// ========================================================================
	{
		nationId: 'nat_chola',
		stateReligionId: 'rel_hinduism_shaivism',
		religions: [
			{
				religionId: 'rel_hinduism_shaivism',
				percentage: 0.55,
				status: 'state',
			},
			{
				religionId: 'rel_hinduism_vaishnavism',
				percentage: 0.25,
				status: 'tolerated',
			},
			{ religionId: 'rel_jainism', percentage: 0.08, status: 'tolerated' },
			{ religionId: 'rel_theravada', percentage: 0.07, status: 'tolerated' },
			{ religionId: 'rel_sunni', percentage: 0.03, status: 'minority' },
		],
		religiousTension: 2,
	},
	{
		nationId: 'nat_chalukya',
		stateReligionId: 'rel_hinduism_shaivism',
		religions: [
			{
				religionId: 'rel_hinduism_shaivism',
				percentage: 0.45,
				status: 'state',
			},
			{
				religionId: 'rel_hinduism_vaishnavism',
				percentage: 0.25,
				status: 'tolerated',
			},
			{ religionId: 'rel_jainism', percentage: 0.2, status: 'tolerated' },
			{ religionId: 'rel_mahayana', percentage: 0.05, status: 'tolerated' },
		],
		religiousTension: 2,
	},
	{
		nationId: 'nat_pala',
		stateReligionId: 'rel_mahayana',
		religions: [
			{ religionId: 'rel_mahayana', percentage: 0.35, status: 'state' },
			{
				religionId: 'rel_hinduism_shaivism',
				percentage: 0.3,
				status: 'tolerated',
			},
			{
				religionId: 'rel_hinduism_vaishnavism',
				percentage: 0.2,
				status: 'tolerated',
			},
			{ religionId: 'rel_vajrayana', percentage: 0.1, status: 'tolerated' },
			{ religionId: 'rel_jainism', percentage: 0.05, status: 'tolerated' },
		],
		religiousTension: 2,
	},

	// ========================================================================
	// AFRIQUE
	// ========================================================================
	{
		nationId: 'nat_ghana',
		stateReligionId: null,
		religions: [
			{
				religionId: 'rel_west_african_traditional',
				percentage: 0.55,
				status: 'state',
			},
			{ religionId: 'rel_sunni', percentage: 0.4, status: 'tolerated' },
		],
		religiousTension: 2,
	},
	{
		nationId: 'nat_kanem',
		stateReligionId: 'rel_sunni',
		religions: [
			{ religionId: 'rel_sunni', percentage: 0.55, status: 'state' },
			{
				religionId: 'rel_west_african_traditional',
				percentage: 0.4,
				status: 'tolerated',
			},
		],
		religiousTension: 3,
	},
	{
		nationId: 'nat_ethiopia',
		stateReligionId: 'rel_ethiopian_christian',
		religions: [
			{
				religionId: 'rel_ethiopian_christian',
				percentage: 0.6,
				status: 'state',
			},
			{ religionId: 'rel_judaism', percentage: 0.1, status: 'tolerated' },
			{ religionId: 'rel_sunni', percentage: 0.15, status: 'tolerated' },
			{
				religionId: 'rel_east_african_traditional',
				percentage: 0.15,
				status: 'tolerated',
			},
		],
		religiousTension: 4,
	},
	{
		nationId: 'nat_swahili_cities',
		stateReligionId: 'rel_sunni',
		religions: [
			{ religionId: 'rel_sunni', percentage: 0.5, status: 'state' },
			{
				religionId: 'rel_east_african_traditional',
				percentage: 0.4,
				status: 'tolerated',
			},
			{ religionId: 'rel_ibadi', percentage: 0.05, status: 'minority' },
		],
		religiousTension: 2,
	},

	// ========================================================================
	// AMÉRIQUES
	// ========================================================================
	{
		nationId: 'nat_toltec',
		stateReligionId: 'rel_mesoamerican',
		religions: [
			{ religionId: 'rel_mesoamerican', percentage: 0.98, status: 'state' },
		],
		religiousTension: 1,
	},
	{
		nationId: 'nat_maya_states',
		stateReligionId: 'rel_mesoamerican',
		religions: [
			{ religionId: 'rel_mesoamerican', percentage: 0.98, status: 'state' },
		],
		religiousTension: 1,
	},
	{
		nationId: 'nat_mississippian',
		stateReligionId: 'rel_north_american_traditional',
		religions: [
			{
				religionId: 'rel_north_american_traditional',
				percentage: 0.99,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_wari',
		stateReligionId: 'rel_andean_traditional',
		religions: [
			{
				religionId: 'rel_andean_traditional',
				percentage: 0.99,
				status: 'state',
			},
		],
		religiousTension: 1,
	},

	// ========================================================================
	// ASIE CENTRALE
	// ========================================================================
	{
		nationId: 'nat_tibet',
		stateReligionId: 'rel_vajrayana',
		religions: [
			{ religionId: 'rel_vajrayana', percentage: 0.75, status: 'state' },
			{ religionId: 'rel_mahayana', percentage: 0.1, status: 'tolerated' },
			{
				religionId: 'rel_hinduism_shaivism',
				percentage: 0.05,
				status: 'minority',
			},
		],
		religiousTension: 2,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 1
	// ========================================================================
	{
		nationId: 'nat_puebloans',
		stateReligionId: 'rel_north_american_traditional',
		religions: [
			{
				religionId: 'rel_north_american_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_haida',
		stateReligionId: 'rel_north_american_traditional',
		religions: [
			{
				religionId: 'rel_north_american_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_thule',
		stateReligionId: 'rel_north_american_traditional',
		religions: [
			{
				religionId: 'rel_north_american_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_tui_tonga',
		stateReligionId: 'rel_polynesian',
		religions: [
			{
				religionId: 'rel_polynesian',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_aboriginal',
		stateReligionId: 'rel_australian_aboriginal',
		religions: [
			{
				religionId: 'rel_australian_aboriginal',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_sami',
		stateReligionId: 'rel_sami_shamanism',
		religions: [
			{
				religionId: 'rel_sami_shamanism',
				percentage: 0.9,
				status: 'state',
			},
			{
				religionId: 'rel_norse_paganism',
				percentage: 0.05,
				status: 'minority',
			},
			{
				religionId: 'rel_catholic',
				percentage: 0.03,
				status: 'minority',
			},
		],
		religiousTension: 2,
	},
	{
		nationId: 'nat_mapuche',
		stateReligionId: 'rel_mapuche_traditional',
		religions: [
			{
				religionId: 'rel_mapuche_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_malagasy',
		stateReligionId: 'rel_malagasy_traditional',
		religions: [
			{
				religionId: 'rel_malagasy_traditional',
				percentage: 0.85,
				status: 'state',
			},
			{
				religionId: 'rel_sunni',
				percentage: 0.1,
				status: 'minority',
			},
		],
		religiousTension: 1,
	},
	{
		nationId: 'nat_yoruba',
		stateReligionId: 'rel_west_african_traditional',
		religions: [
			{
				religionId: 'rel_west_african_traditional',
				percentage: 0.95,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_zimbabwe',
		stateReligionId: 'rel_east_african_traditional',
		religions: [
			{
				religionId: 'rel_east_african_traditional',
				percentage: 0.95,
				status: 'state',
			},
		],
		religiousTension: 0,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 2
	// ========================================================================
	{
		nationId: 'nat_chimu',
		stateReligionId: 'rel_andean_traditional',
		religions: [
			{
				religionId: 'rel_andean_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_muisca',
		stateReligionId: 'rel_muisca_traditional',
		religions: [
			{
				religionId: 'rel_muisca_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_guarani',
		stateReligionId: 'rel_guarani_traditional',
		religions: [
			{
				religionId: 'rel_guarani_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_hawaii',
		stateReligionId: 'rel_polynesian',
		religions: [
			{
				religionId: 'rel_polynesian',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_ainu',
		stateReligionId: 'rel_ainu_kamuy',
		religions: [
			{
				religionId: 'rel_ainu_kamuy',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_makuria',
		stateReligionId: 'rel_coptic',
		religions: [
			{
				religionId: 'rel_coptic',
				percentage: 0.85,
				status: 'state',
			},
			{
				religionId: 'rel_sunni',
				percentage: 0.1,
				status: 'minority',
			},
		],
		religiousTension: 3,
	},
	{
		nationId: 'nat_tuareg',
		stateReligionId: 'rel_sunni',
		religions: [
			{
				religionId: 'rel_sunni',
				percentage: 0.7,
				status: 'state',
			},
			{
				religionId: 'rel_west_african_traditional',
				percentage: 0.25,
				status: 'tolerated',
			},
		],
		religiousTension: 2,
	},
	{
		nationId: 'nat_georgia',
		stateReligionId: 'rel_orthodox',
		religions: [
			{
				religionId: 'rel_orthodox',
				percentage: 0.9,
				status: 'state',
			},
			{
				religionId: 'rel_sunni',
				percentage: 0.05,
				status: 'minority',
			},
		],
		religiousTension: 2,
	},
	{
		nationId: 'nat_armenia',
		stateReligionId: 'rel_armenian_apostolic',
		religions: [
			{
				religionId: 'rel_armenian_apostolic',
				percentage: 0.92,
				status: 'state',
			},
			{
				religionId: 'rel_sunni',
				percentage: 0.04,
				status: 'minority',
			},
		],
		religiousTension: 2,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 3
	// ========================================================================
	{
		nationId: 'nat_hohokam',
		stateReligionId: 'rel_north_american_traditional',
		religions: [
			{
				religionId: 'rel_north_american_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_dorset',
		stateReligionId: 'rel_north_american_traditional',
		religions: [
			{
				religionId: 'rel_north_american_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_beothuk',
		stateReligionId: 'rel_north_american_traditional',
		religions: [
			{
				religionId: 'rel_north_american_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_dene',
		stateReligionId: 'rel_north_american_traditional',
		religions: [
			{
				religionId: 'rel_north_american_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_mikmaq',
		stateReligionId: 'rel_north_american_traditional',
		religions: [
			{
				religionId: 'rel_north_american_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_papuan',
		stateReligionId: 'rel_papuan_traditional',
		religions: [
			{
				religionId: 'rel_papuan_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_fiji',
		stateReligionId: 'rel_polynesian',
		religions: [
			{
				religionId: 'rel_polynesian',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_chamorro',
		stateReligionId: 'rel_polynesian',
		religions: [
			{
				religionId: 'rel_polynesian',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_guanche',
		stateReligionId: 'rel_guanche_traditional',
		religions: [
			{
				religionId: 'rel_guanche_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_san',
		stateReligionId: 'rel_san_traditional',
		religions: [
			{
				religionId: 'rel_san_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_mbuti',
		stateReligionId: 'rel_central_african_traditional',
		religions: [
			{
				religionId: 'rel_central_african_traditional',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_igbo',
		stateReligionId: 'rel_west_african_traditional',
		religions: [
			{
				religionId: 'rel_west_african_traditional',
				percentage: 0.95,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
	{
		nationId: 'nat_chukchi',
		stateReligionId: 'rel_siberian_shamanism',
		religions: [
			{
				religionId: 'rel_siberian_shamanism',
				percentage: 1.0,
				status: 'state',
			},
		],
		religiousTension: 0,
	},
]
