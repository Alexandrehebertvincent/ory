import type { NationEducation } from '../../../shared/src/types/world'

// ============================================================================
// Éducation par nation — An 1000
// ============================================================================

export const nationEducationData: NationEducation[] = [
	// ========================================================================
	// EUROPE OCCIDENTALE
	// ========================================================================
	{
		nationId: 'nat_hre',
		institutions: ['monastery', 'court_school', 'guild_apprenticeship'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['philosophy', 'writing', 'governance'],
		libraryCount: 80,
		educationAccess: 3,
	},
	{
		nationId: 'nat_france',
		institutions: ['monastery', 'court_school'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['philosophy', 'writing', 'governance'],
		libraryCount: 60,
		educationAccess: 2,
	},
	{
		nationId: 'nat_england',
		institutions: ['monastery', 'court_school'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['writing', 'philosophy', 'governance'],
		libraryCount: 40,
		educationAccess: 3,
	},
	{
		nationId: 'nat_scotland',
		institutions: ['monastery', 'oral_tradition'],
		scholarPopulation: 0.01,
		knowledgeAreas: ['writing', 'philosophy'],
		libraryCount: 10,
		educationAccess: 1,
	},
	{
		nationId: 'nat_papal',
		institutions: ['monastery', 'court_school'],
		scholarPopulation: 0.04,
		knowledgeAreas: ['philosophy', 'writing', 'governance', 'medicine'],
		libraryCount: 50,
		educationAccess: 3,
	},
	{
		nationId: 'nat_venice',
		institutions: ['guild_apprenticeship', 'monastery', 'court_school'],
		scholarPopulation: 0.05,
		knowledgeAreas: ['trade', 'navigation', 'writing', 'mathematics'],
		libraryCount: 30,
		educationAccess: 4,
	},

	// ========================================================================
	// IBÉRIE
	// ========================================================================
	{
		nationId: 'nat_leon',
		institutions: ['monastery', 'court_school'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['writing', 'philosophy', 'governance'],
		libraryCount: 20,
		educationAccess: 2,
	},
	{
		nationId: 'nat_navarre',
		institutions: ['monastery', 'oral_tradition'],
		scholarPopulation: 0.01,
		knowledgeAreas: ['writing', 'philosophy'],
		libraryCount: 8,
		educationAccess: 2,
	},
	{
		nationId: 'nat_cordoba',
		institutions: ['madrasa', 'court_school', 'university'],
		scholarPopulation: 0.08,
		knowledgeAreas: [
			'medicine',
			'mathematics',
			'astronomy',
			'philosophy',
			'agriculture',
			'craftsmanship',
		],
		libraryCount: 70,
		educationAccess: 7,
	},

	// ========================================================================
	// SCANDINAVIE
	// ========================================================================
	{
		nationId: 'nat_denmark',
		institutions: ['monastery', 'oral_tradition'],
		scholarPopulation: 0.01,
		knowledgeAreas: ['navigation', 'craftsmanship', 'writing'],
		libraryCount: 10,
		educationAccess: 2,
	},
	{
		nationId: 'nat_norway',
		institutions: ['oral_tradition', 'monastery'],
		scholarPopulation: 0.01,
		knowledgeAreas: ['navigation', 'craftsmanship'],
		libraryCount: 5,
		educationAccess: 1,
	},
	{
		nationId: 'nat_sweden',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.005,
		knowledgeAreas: ['craftsmanship', 'navigation'],
		libraryCount: 3,
		educationAccess: 1,
	},

	// ========================================================================
	// EUROPE ORIENTALE
	// ========================================================================
	{
		nationId: 'nat_poland',
		institutions: ['monastery', 'court_school'],
		scholarPopulation: 0.01,
		knowledgeAreas: ['writing', 'philosophy', 'governance'],
		libraryCount: 15,
		educationAccess: 2,
	},
	{
		nationId: 'nat_hungary',
		institutions: ['monastery', 'court_school'],
		scholarPopulation: 0.015,
		knowledgeAreas: ['writing', 'philosophy', 'governance'],
		libraryCount: 15,
		educationAccess: 2,
	},
	{
		nationId: 'nat_kievan_rus',
		institutions: ['monastery', 'court_school'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['writing', 'philosophy', 'governance'],
		libraryCount: 25,
		educationAccess: 2,
	},
	{
		nationId: 'nat_volga_bulgaria',
		institutions: ['madrasa', 'court_school'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['writing', 'trade', 'mathematics'],
		libraryCount: 12,
		educationAccess: 3,
	},
	{
		nationId: 'nat_croatia',
		institutions: ['monastery', 'court_school'],
		scholarPopulation: 0.015,
		knowledgeAreas: ['writing', 'philosophy'],
		libraryCount: 10,
		educationAccess: 2,
	},

	// ========================================================================
	// BYZANCE
	// ========================================================================
	{
		nationId: 'nat_byzantine',
		institutions: ['imperial_academy', 'monastery', 'court_school'],
		scholarPopulation: 0.06,
		knowledgeAreas: [
			'philosophy',
			'medicine',
			'mathematics',
			'astronomy',
			'governance',
			'writing',
		],
		libraryCount: 150,
		educationAccess: 5,
	},

	// ========================================================================
	// MONDE ISLAMIQUE
	// ========================================================================
	{
		nationId: 'nat_fatimid',
		institutions: ['madrasa', 'university', 'court_school'],
		scholarPopulation: 0.07,
		knowledgeAreas: [
			'medicine',
			'mathematics',
			'astronomy',
			'philosophy',
			'craftsmanship',
			'trade',
		],
		libraryCount: 200,
		educationAccess: 7,
	},
	{
		nationId: 'nat_buyid',
		institutions: ['madrasa', 'court_school'],
		scholarPopulation: 0.06,
		knowledgeAreas: [
			'medicine',
			'mathematics',
			'astronomy',
			'philosophy',
			'writing',
		],
		libraryCount: 100,
		educationAccess: 6,
	},
	{
		nationId: 'nat_ghaznavid',
		institutions: ['madrasa', 'court_school'],
		scholarPopulation: 0.04,
		knowledgeAreas: ['writing', 'philosophy', 'mathematics', 'astronomy'],
		libraryCount: 40,
		educationAccess: 4,
	},
	{
		nationId: 'nat_karakhanid',
		institutions: ['madrasa', 'oral_tradition'],
		scholarPopulation: 0.03,
		knowledgeAreas: ['writing', 'philosophy', 'trade'],
		libraryCount: 20,
		educationAccess: 3,
	},

	// ========================================================================
	// ASIE ORIENTALE
	// ========================================================================
	{
		nationId: 'nat_song',
		institutions: ['imperial_academy', 'court_school', 'temple_school'],
		scholarPopulation: 0.1,
		knowledgeAreas: [
			'mathematics',
			'astronomy',
			'medicine',
			'agriculture',
			'craftsmanship',
			'philosophy',
			'governance',
			'navigation',
		],
		libraryCount: 500,
		educationAccess: 8,
	},
	{
		nationId: 'nat_liao',
		institutions: ['court_school', 'oral_tradition', 'temple_school'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['governance', 'writing', 'military'],
		libraryCount: 20,
		educationAccess: 3,
	},
	{
		nationId: 'nat_goryeo',
		institutions: ['imperial_academy', 'temple_school', 'court_school'],
		scholarPopulation: 0.05,
		knowledgeAreas: [
			'philosophy',
			'writing',
			'governance',
			'medicine',
			'astronomy',
		],
		libraryCount: 80,
		educationAccess: 5,
	},
	{
		nationId: 'nat_japan',
		institutions: ['court_school', 'temple_school', 'monastery'],
		scholarPopulation: 0.04,
		knowledgeAreas: ['writing', 'philosophy', 'governance', 'medicine'],
		libraryCount: 60,
		educationAccess: 4,
	},

	// ========================================================================
	// ASIE DU SUD-EST
	// ========================================================================
	{
		nationId: 'nat_dai_viet',
		institutions: ['imperial_academy', 'temple_school', 'court_school'],
		scholarPopulation: 0.03,
		knowledgeAreas: ['writing', 'governance', 'philosophy', 'agriculture'],
		libraryCount: 25,
		educationAccess: 3,
	},
	{
		nationId: 'nat_khmer',
		institutions: ['temple_school', 'court_school'],
		scholarPopulation: 0.03,
		knowledgeAreas: ['astronomy', 'construction', 'writing', 'philosophy'],
		libraryCount: 30,
		educationAccess: 3,
	},
	{
		nationId: 'nat_srivijaya',
		institutions: ['temple_school', 'monastery'],
		scholarPopulation: 0.03,
		knowledgeAreas: ['navigation', 'trade', 'philosophy', 'writing'],
		libraryCount: 20,
		educationAccess: 3,
	},

	// ========================================================================
	// ASIE DU SUD
	// ========================================================================
	{
		nationId: 'nat_chola',
		institutions: ['temple_school', 'court_school', 'guild_apprenticeship'],
		scholarPopulation: 0.05,
		knowledgeAreas: [
			'mathematics',
			'astronomy',
			'medicine',
			'philosophy',
			'navigation',
			'craftsmanship',
		],
		libraryCount: 80,
		educationAccess: 5,
	},
	{
		nationId: 'nat_chalukya',
		institutions: ['temple_school', 'court_school'],
		scholarPopulation: 0.04,
		knowledgeAreas: ['mathematics', 'astronomy', 'philosophy', 'medicine'],
		libraryCount: 50,
		educationAccess: 4,
	},
	{
		nationId: 'nat_pala',
		institutions: ['university', 'temple_school', 'monastery'],
		scholarPopulation: 0.06,
		knowledgeAreas: [
			'philosophy',
			'medicine',
			'mathematics',
			'astronomy',
			'writing',
		],
		libraryCount: 100,
		educationAccess: 5,
	},

	// ========================================================================
	// AFRIQUE
	// ========================================================================
	{
		nationId: 'nat_ghana',
		institutions: ['oral_tradition', 'court_school'],
		scholarPopulation: 0.01,
		knowledgeAreas: ['trade', 'governance', 'craftsmanship'],
		libraryCount: 5,
		educationAccess: 2,
	},
	{
		nationId: 'nat_kanem',
		institutions: ['oral_tradition', 'madrasa'],
		scholarPopulation: 0.01,
		knowledgeAreas: ['trade', 'governance'],
		libraryCount: 3,
		educationAccess: 1,
	},
	{
		nationId: 'nat_ethiopia',
		institutions: ['monastery', 'court_school'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['writing', 'philosophy', 'governance'],
		libraryCount: 20,
		educationAccess: 2,
	},
	{
		nationId: 'nat_swahili_cities',
		institutions: ['madrasa', 'oral_tradition', 'guild_apprenticeship'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['trade', 'navigation', 'writing'],
		libraryCount: 10,
		educationAccess: 3,
	},

	// ========================================================================
	// AMÉRIQUES
	// ========================================================================
	{
		nationId: 'nat_toltec',
		institutions: ['temple_school', 'court_school'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['astronomy', 'construction', 'agriculture'],
		libraryCount: 5,
		educationAccess: 2,
	},
	{
		nationId: 'nat_maya_states',
		institutions: ['temple_school', 'court_school'],
		scholarPopulation: 0.03,
		knowledgeAreas: ['astronomy', 'mathematics', 'writing', 'agriculture'],
		libraryCount: 15,
		educationAccess: 3,
	},
	{
		nationId: 'nat_mississippian',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.005,
		knowledgeAreas: ['agriculture', 'construction'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_wari',
		institutions: ['court_school', 'temple_school'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['construction', 'agriculture', 'craftsmanship'],
		libraryCount: 3,
		educationAccess: 2,
	},

	// ========================================================================
	// ASIE CENTRALE
	// ========================================================================
	{
		nationId: 'nat_tibet',
		institutions: ['monastery', 'temple_school'],
		scholarPopulation: 0.04,
		knowledgeAreas: ['philosophy', 'medicine', 'writing', 'astronomy'],
		libraryCount: 40,
		educationAccess: 3,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 1
	// ========================================================================
	{
		nationId: 'nat_puebloans',
		institutions: ['oral_tradition', 'kiva_school'],
		scholarPopulation: 0.01,
		knowledgeAreas: ['astronomy', 'agriculture', 'construction'],
		libraryCount: 0,
		educationAccess: 2,
	},
	{
		nationId: 'nat_haida',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.01,
		knowledgeAreas: ['navigation', 'craftsmanship', 'ecology'],
		libraryCount: 0,
		educationAccess: 2,
	},
	{
		nationId: 'nat_thule',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.005,
		knowledgeAreas: ['navigation', 'survival', 'ecology'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_tui_tonga',
		institutions: ['oral_tradition', 'court_school'],
		scholarPopulation: 0.01,
		knowledgeAreas: ['navigation', 'agriculture', 'astronomy'],
		libraryCount: 0,
		educationAccess: 2,
	},
	{
		nationId: 'nat_aboriginal',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.005,
		knowledgeAreas: ['ecology', 'astronomy', 'medicine'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_sami',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.005,
		knowledgeAreas: ['ecology', 'animal_husbandry', 'navigation'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_mapuche',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.008,
		knowledgeAreas: ['agriculture', 'medicine', 'warfare'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_malagasy',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.01,
		knowledgeAreas: ['navigation', 'agriculture', 'craftsmanship'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_yoruba',
		institutions: ['oral_tradition', 'temple_school'],
		scholarPopulation: 0.02,
		knowledgeAreas: [
			'metallurgy',
			'agriculture',
			'divination',
			'craftsmanship',
		],
		libraryCount: 0,
		educationAccess: 2,
	},
	{
		nationId: 'nat_zimbabwe',
		institutions: ['oral_tradition', 'court_school'],
		scholarPopulation: 0.01,
		knowledgeAreas: ['construction', 'metallurgy', 'trade'],
		libraryCount: 0,
		educationAccess: 2,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 2
	// ========================================================================
	{
		nationId: 'nat_chimu',
		institutions: ['temple_school', 'oral_tradition'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['metallurgy', 'irrigation', 'architecture', 'astronomy'],
		libraryCount: 0,
		educationAccess: 2,
	},
	{
		nationId: 'nat_muisca',
		institutions: ['temple_school', 'oral_tradition'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['astronomy', 'metallurgy', 'agriculture'],
		libraryCount: 0,
		educationAccess: 2,
	},
	{
		nationId: 'nat_guarani',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.005,
		knowledgeAreas: ['agriculture', 'medicine', 'mythology'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_hawaii',
		institutions: ['oral_tradition', 'temple_school'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['navigation', 'agriculture', 'astronomy', 'medicine'],
		libraryCount: 0,
		educationAccess: 2,
	},
	{
		nationId: 'nat_ainu',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.005,
		knowledgeAreas: ['medicine', 'ecology', 'craftsmanship'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_makuria',
		institutions: ['monastery', 'cathedral_school', 'oral_tradition'],
		scholarPopulation: 0.03,
		knowledgeAreas: ['theology', 'architecture', 'medicine', 'agriculture'],
		libraryCount: 3,
		educationAccess: 3,
	},
	{
		nationId: 'nat_tuareg',
		institutions: ['oral_tradition', 'koranic_school'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['navigation', 'astronomy', 'trade', 'poetry'],
		libraryCount: 0,
		educationAccess: 2,
	},
	{
		nationId: 'nat_georgia',
		institutions: ['monastery', 'cathedral_school', 'court_school'],
		scholarPopulation: 0.04,
		knowledgeAreas: ['theology', 'philosophy', 'medicine', 'literature'],
		libraryCount: 8,
		educationAccess: 3,
	},
	{
		nationId: 'nat_armenia',
		institutions: ['monastery', 'cathedral_school', 'university'],
		scholarPopulation: 0.05,
		knowledgeAreas: [
			'theology',
			'philosophy',
			'medicine',
			'literature',
			'mathematics',
		],
		libraryCount: 15,
		educationAccess: 4,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 3
	// ========================================================================
	{
		nationId: 'nat_hohokam',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.005,
		knowledgeAreas: ['irrigation', 'agriculture', 'astronomy'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_dorset',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.003,
		knowledgeAreas: ['hunting', 'ecology', 'craftsmanship'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_beothuk',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.003,
		knowledgeAreas: ['hunting', 'ecology'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_dene',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.003,
		knowledgeAreas: ['hunting', 'ecology', 'navigation'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_mikmaq',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.008,
		knowledgeAreas: ['navigation', 'medicine', 'ecology'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_papuan',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.003,
		knowledgeAreas: ['agriculture', 'medicine', 'ecology'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_fiji',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.005,
		knowledgeAreas: ['navigation', 'agriculture', 'craftsmanship'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_chamorro',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.005,
		knowledgeAreas: ['navigation', 'construction', 'agriculture'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_guanche',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.005,
		knowledgeAreas: ['agriculture', 'medicine', 'astronomy'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_san',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.005,
		knowledgeAreas: ['ecology', 'medicine', 'hunting'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_mbuti',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.003,
		knowledgeAreas: ['ecology', 'medicine', 'hunting'],
		libraryCount: 0,
		educationAccess: 1,
	},
	{
		nationId: 'nat_igbo',
		institutions: ['oral_tradition', 'temple_school'],
		scholarPopulation: 0.02,
		knowledgeAreas: ['metallurgy', 'agriculture', 'trade', 'divination'],
		libraryCount: 0,
		educationAccess: 2,
	},
	{
		nationId: 'nat_chukchi',
		institutions: ['oral_tradition'],
		scholarPopulation: 0.003,
		knowledgeAreas: ['ecology', 'hunting', 'navigation'],
		libraryCount: 0,
		educationAccess: 1,
	},
]
