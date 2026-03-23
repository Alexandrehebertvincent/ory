import type { NationHealth } from '../../../shared/src/types/world'

// ============================================================================
// Santé par nation — An 1000
// ============================================================================

export const nationHealthData: NationHealth[] = [
	// ========================================================================
	// EUROPE OCCIDENTALE
	// ========================================================================
	{
		nationId: 'nat_hre',
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_smallpox', prevalence: 0.02 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.03 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.04 },
			{ diseaseId: 'dis_ergotism', prevalence: 0.02 },
		],
		faminRisk: 4,
		overallHealth: 4,
	},
	{
		nationId: 'nat_france',
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_smallpox', prevalence: 0.02 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.03 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
			{ diseaseId: 'dis_ergotism', prevalence: 0.03 },
		],
		faminRisk: 5,
		overallHealth: 4,
	},
	{
		nationId: 'nat_england',
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_smallpox', prevalence: 0.02 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.03 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
			{ diseaseId: 'dis_measles', prevalence: 0.02 },
		],
		faminRisk: 4,
		overallHealth: 4,
	},
	{
		nationId: 'nat_scotland',
		medicalKnowledge: 2,
		sanitation: 2,
		activeDiseases: [
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.03 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
			{ diseaseId: 'dis_scurvy', prevalence: 0.02 },
		],
		faminRisk: 5,
		overallHealth: 3,
	},
	{
		nationId: 'nat_papal',
		medicalKnowledge: 4,
		sanitation: 4,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.04 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.02 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.02 },
		],
		faminRisk: 3,
		overallHealth: 5,
	},
	{
		nationId: 'nat_venice',
		medicalKnowledge: 5,
		sanitation: 5,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.03 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.02 },
		],
		faminRisk: 2,
		overallHealth: 6,
	},

	// ========================================================================
	// IBÉRIE
	// ========================================================================
	{
		nationId: 'nat_leon',
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_smallpox', prevalence: 0.02 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.02 },
		],
		faminRisk: 4,
		overallHealth: 4,
	},
	{
		nationId: 'nat_navarre',
		medicalKnowledge: 2,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.02 },
		],
		faminRisk: 3,
		overallHealth: 4,
	},
	{
		nationId: 'nat_cordoba',
		medicalKnowledge: 8,
		sanitation: 7,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.02 },
			{ diseaseId: 'dis_trachoma', prevalence: 0.03 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.01 },
		],
		faminRisk: 2,
		overallHealth: 7,
	},

	// ========================================================================
	// SCANDINAVIE
	// ========================================================================
	{
		nationId: 'nat_denmark',
		medicalKnowledge: 2,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.03 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
			{ diseaseId: 'dis_scurvy', prevalence: 0.02 },
		],
		faminRisk: 4,
		overallHealth: 4,
	},
	{
		nationId: 'nat_norway',
		medicalKnowledge: 2,
		sanitation: 2,
		activeDiseases: [
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.03 },
			{ diseaseId: 'dis_scurvy', prevalence: 0.04 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.02 },
		],
		faminRisk: 6,
		overallHealth: 3,
	},
	{
		nationId: 'nat_sweden',
		medicalKnowledge: 2,
		sanitation: 2,
		activeDiseases: [
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.03 },
			{ diseaseId: 'dis_scurvy', prevalence: 0.03 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.02 },
		],
		faminRisk: 5,
		overallHealth: 3,
	},

	// ========================================================================
	// EUROPE ORIENTALE
	// ========================================================================
	{
		nationId: 'nat_poland',
		medicalKnowledge: 2,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_smallpox', prevalence: 0.02 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.03 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
		],
		faminRisk: 4,
		overallHealth: 4,
	},
	{
		nationId: 'nat_hungary',
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_smallpox', prevalence: 0.02 },
			{ diseaseId: 'dis_malaria', prevalence: 0.03 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
		],
		faminRisk: 3,
		overallHealth: 4,
	},
	{
		nationId: 'nat_kievan_rus',
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_smallpox', prevalence: 0.03 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.03 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.04 },
		],
		faminRisk: 5,
		overallHealth: 3,
	},
	{
		nationId: 'nat_volga_bulgaria',
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_smallpox', prevalence: 0.02 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
		],
		faminRisk: 4,
		overallHealth: 4,
	},
	{
		nationId: 'nat_croatia',
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.03 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.02 },
		],
		faminRisk: 3,
		overallHealth: 4,
	},

	// ========================================================================
	// BYZANCE
	// ========================================================================
	{
		nationId: 'nat_byzantine',
		medicalKnowledge: 7,
		sanitation: 6,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.03 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.02 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.02 },
			{ diseaseId: 'dis_leprosy', prevalence: 0.01 },
		],
		faminRisk: 3,
		overallHealth: 6,
	},

	// ========================================================================
	// MONDE ISLAMIQUE
	// ========================================================================
	{
		nationId: 'nat_fatimid',
		medicalKnowledge: 8,
		sanitation: 7,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.04 },
			{ diseaseId: 'dis_trachoma', prevalence: 0.04 },
			{ diseaseId: 'dis_cholera', prevalence: 0.02 },
			{ diseaseId: 'dis_leprosy', prevalence: 0.01 },
		],
		faminRisk: 3,
		overallHealth: 6,
	},
	{
		nationId: 'nat_buyid',
		medicalKnowledge: 7,
		sanitation: 6,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.03 },
			{ diseaseId: 'dis_trachoma', prevalence: 0.03 },
			{ diseaseId: 'dis_cholera', prevalence: 0.02 },
		],
		faminRisk: 3,
		overallHealth: 6,
	},
	{
		nationId: 'nat_ghaznavid',
		medicalKnowledge: 6,
		sanitation: 4,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.05 },
			{ diseaseId: 'dis_cholera', prevalence: 0.03 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
			{ diseaseId: 'dis_smallpox', prevalence: 0.02 },
		],
		faminRisk: 4,
		overallHealth: 5,
	},
	{
		nationId: 'nat_karakhanid',
		medicalKnowledge: 4,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_smallpox', prevalence: 0.03 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.02 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
		],
		faminRisk: 4,
		overallHealth: 4,
	},

	// ========================================================================
	// ASIE ORIENTALE
	// ========================================================================
	{
		nationId: 'nat_song',
		medicalKnowledge: 8,
		sanitation: 7,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.03 },
			{ diseaseId: 'dis_smallpox', prevalence: 0.02 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.02 },
			{ diseaseId: 'dis_cholera', prevalence: 0.01 },
		],
		faminRisk: 2,
		overallHealth: 7,
	},
	{
		nationId: 'nat_liao',
		medicalKnowledge: 4,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_smallpox', prevalence: 0.03 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.03 },
		],
		faminRisk: 4,
		overallHealth: 4,
	},
	{
		nationId: 'nat_goryeo',
		medicalKnowledge: 5,
		sanitation: 5,
		activeDiseases: [
			{ diseaseId: 'dis_smallpox', prevalence: 0.02 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.02 },
			{ diseaseId: 'dis_measles', prevalence: 0.02 },
		],
		faminRisk: 3,
		overallHealth: 5,
	},
	{
		nationId: 'nat_japan',
		medicalKnowledge: 5,
		sanitation: 5,
		activeDiseases: [
			{ diseaseId: 'dis_smallpox', prevalence: 0.02 },
			{ diseaseId: 'dis_measles', prevalence: 0.02 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.02 },
		],
		faminRisk: 3,
		overallHealth: 5,
	},

	// ========================================================================
	// ASIE DU SUD-EST
	// ========================================================================
	{
		nationId: 'nat_dai_viet',
		medicalKnowledge: 4,
		sanitation: 4,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.06 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.04 },
			{ diseaseId: 'dis_cholera', prevalence: 0.02 },
		],
		faminRisk: 3,
		overallHealth: 4,
	},
	{
		nationId: 'nat_khmer',
		medicalKnowledge: 4,
		sanitation: 5,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.07 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
			{ diseaseId: 'dis_cholera', prevalence: 0.02 },
		],
		faminRisk: 2,
		overallHealth: 5,
	},
	{
		nationId: 'nat_srivijaya',
		medicalKnowledge: 4,
		sanitation: 4,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.08 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.04 },
			{ diseaseId: 'dis_cholera', prevalence: 0.02 },
		],
		faminRisk: 2,
		overallHealth: 4,
	},

	// ========================================================================
	// ASIE DU SUD
	// ========================================================================
	{
		nationId: 'nat_chola',
		medicalKnowledge: 6,
		sanitation: 5,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.06 },
			{ diseaseId: 'dis_cholera', prevalence: 0.03 },
			{ diseaseId: 'dis_leprosy', prevalence: 0.02 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
		],
		faminRisk: 3,
		overallHealth: 5,
	},
	{
		nationId: 'nat_chalukya',
		medicalKnowledge: 5,
		sanitation: 4,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.05 },
			{ diseaseId: 'dis_cholera', prevalence: 0.03 },
			{ diseaseId: 'dis_leprosy', prevalence: 0.02 },
		],
		faminRisk: 3,
		overallHealth: 5,
	},
	{
		nationId: 'nat_pala',
		medicalKnowledge: 5,
		sanitation: 4,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.06 },
			{ diseaseId: 'dis_cholera', prevalence: 0.04 },
			{ diseaseId: 'dis_leprosy', prevalence: 0.02 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
		],
		faminRisk: 4,
		overallHealth: 4,
	},

	// ========================================================================
	// AFRIQUE
	// ========================================================================
	{
		nationId: 'nat_ghana',
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.1 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.04 },
			{ diseaseId: 'dis_trachoma', prevalence: 0.03 },
		],
		faminRisk: 3,
		overallHealth: 4,
	},
	{
		nationId: 'nat_kanem',
		medicalKnowledge: 2,
		sanitation: 2,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.1 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.05 },
			{ diseaseId: 'dis_trachoma', prevalence: 0.03 },
			{ diseaseId: 'dis_measles', prevalence: 0.02 },
		],
		faminRisk: 5,
		overallHealth: 3,
	},
	{
		nationId: 'nat_ethiopia',
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.06 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.03 },
			{ diseaseId: 'dis_leprosy', prevalence: 0.02 },
		],
		faminRisk: 4,
		overallHealth: 4,
	},
	{
		nationId: 'nat_swahili_cities',
		medicalKnowledge: 3,
		sanitation: 4,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.08 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
			{ diseaseId: 'dis_cholera', prevalence: 0.02 },
		],
		faminRisk: 2,
		overallHealth: 4,
	},

	// ========================================================================
	// AMÉRIQUES
	// ========================================================================
	{
		nationId: 'nat_toltec',
		medicalKnowledge: 3,
		sanitation: 4,
		activeDiseases: [
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.02 },
		],
		faminRisk: 3,
		overallHealth: 5,
	},
	{
		nationId: 'nat_maya_states',
		medicalKnowledge: 4,
		sanitation: 4,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.04 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
		],
		faminRisk: 3,
		overallHealth: 5,
	},
	{
		nationId: 'nat_mississippian',
		medicalKnowledge: 2,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.02 },
		],
		faminRisk: 3,
		overallHealth: 5,
	},
	{
		nationId: 'nat_wari',
		medicalKnowledge: 3,
		sanitation: 5,
		activeDiseases: [
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.02 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.02 },
		],
		faminRisk: 2,
		overallHealth: 6,
	},

	// ========================================================================
	// ASIE CENTRALE
	// ========================================================================
	{
		nationId: 'nat_tibet',
		medicalKnowledge: 5,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_tuberculosis', prevalence: 0.04 },
			{ diseaseId: 'dis_smallpox', prevalence: 0.02 },
		],
		faminRisk: 5,
		overallHealth: 4,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 1
	// ========================================================================
	{
		nationId: 'nat_puebloans',
		medicalKnowledge: 2,
		sanitation: 4,
		activeDiseases: [{ diseaseId: 'dis_dysentery', prevalence: 0.02 }],
		faminRisk: 4,
		overallHealth: 6,
	},
	{
		nationId: 'nat_haida',
		medicalKnowledge: 2,
		sanitation: 4,
		activeDiseases: [{ diseaseId: 'dis_dysentery', prevalence: 0.02 }],
		faminRisk: 2,
		overallHealth: 7,
	},
	{
		nationId: 'nat_thule',
		medicalKnowledge: 1,
		sanitation: 3,
		activeDiseases: [],
		faminRisk: 5,
		overallHealth: 5,
	},
	{
		nationId: 'nat_tui_tonga',
		medicalKnowledge: 2,
		sanitation: 4,
		activeDiseases: [{ diseaseId: 'dis_dysentery', prevalence: 0.02 }],
		faminRisk: 2,
		overallHealth: 7,
	},
	{
		nationId: 'nat_aboriginal',
		medicalKnowledge: 2,
		sanitation: 5,
		activeDiseases: [],
		faminRisk: 3,
		overallHealth: 7,
	},
	{
		nationId: 'nat_sami',
		medicalKnowledge: 2,
		sanitation: 3,
		activeDiseases: [{ diseaseId: 'dis_tuberculosis', prevalence: 0.02 }],
		faminRisk: 4,
		overallHealth: 5,
	},
	{
		nationId: 'nat_mapuche',
		medicalKnowledge: 3,
		sanitation: 4,
		activeDiseases: [{ diseaseId: 'dis_dysentery', prevalence: 0.02 }],
		faminRisk: 3,
		overallHealth: 6,
	},
	{
		nationId: 'nat_malagasy',
		medicalKnowledge: 2,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.06 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
		],
		faminRisk: 3,
		overallHealth: 5,
	},
	{
		nationId: 'nat_yoruba',
		medicalKnowledge: 3,
		sanitation: 4,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.08 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
		],
		faminRisk: 2,
		overallHealth: 5,
	},
	{
		nationId: 'nat_zimbabwe',
		medicalKnowledge: 2,
		sanitation: 4,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.06 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.02 },
		],
		faminRisk: 3,
		overallHealth: 5,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 2
	// ========================================================================
	{
		nationId: 'nat_chimu',
		medicalKnowledge: 4,
		sanitation: 5,
		activeDiseases: [{ diseaseId: 'dis_dysentery', prevalence: 0.03 }],
		faminRisk: 2,
		overallHealth: 6,
	},
	{
		nationId: 'nat_muisca',
		medicalKnowledge: 3,
		sanitation: 4,
		activeDiseases: [{ diseaseId: 'dis_dysentery', prevalence: 0.03 }],
		faminRisk: 2,
		overallHealth: 6,
	},
	{
		nationId: 'nat_guarani',
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.05 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
		],
		faminRisk: 3,
		overallHealth: 5,
	},
	{
		nationId: 'nat_hawaii',
		medicalKnowledge: 3,
		sanitation: 4,
		activeDiseases: [{ diseaseId: 'dis_dysentery', prevalence: 0.02 }],
		faminRisk: 2,
		overallHealth: 7,
	},
	{
		nationId: 'nat_ainu',
		medicalKnowledge: 3,
		sanitation: 4,
		activeDiseases: [{ diseaseId: 'dis_dysentery', prevalence: 0.02 }],
		faminRisk: 3,
		overallHealth: 6,
	},
	{
		nationId: 'nat_makuria',
		medicalKnowledge: 4,
		sanitation: 5,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.07 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
		],
		faminRisk: 3,
		overallHealth: 5,
	},
	{
		nationId: 'nat_tuareg',
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [{ diseaseId: 'dis_dysentery', prevalence: 0.03 }],
		faminRisk: 4,
		overallHealth: 5,
	},
	{
		nationId: 'nat_georgia',
		medicalKnowledge: 5,
		sanitation: 5,
		activeDiseases: [
			{ diseaseId: 'dis_plague', prevalence: 0.01 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.02 },
		],
		faminRisk: 2,
		overallHealth: 6,
	},
	{
		nationId: 'nat_armenia',
		medicalKnowledge: 5,
		sanitation: 6,
		activeDiseases: [
			{ diseaseId: 'dis_plague', prevalence: 0.01 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.02 },
		],
		faminRisk: 2,
		overallHealth: 7,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 3
	// ========================================================================
	{
		nationId: 'nat_hohokam',
		medicalKnowledge: 2,
		sanitation: 4,
		activeDiseases: [{ diseaseId: 'dis_dysentery', prevalence: 0.03 }],
		faminRisk: 3,
		overallHealth: 5,
	},
	{
		nationId: 'nat_dorset',
		medicalKnowledge: 2,
		sanitation: 3,
		activeDiseases: [],
		faminRisk: 5,
		overallHealth: 5,
	},
	{
		nationId: 'nat_beothuk',
		medicalKnowledge: 2,
		sanitation: 3,
		activeDiseases: [],
		faminRisk: 4,
		overallHealth: 5,
	},
	{
		nationId: 'nat_dene',
		medicalKnowledge: 2,
		sanitation: 3,
		activeDiseases: [],
		faminRisk: 5,
		overallHealth: 5,
	},
	{
		nationId: 'nat_mikmaq',
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [{ diseaseId: 'dis_dysentery', prevalence: 0.02 }],
		faminRisk: 3,
		overallHealth: 6,
	},
	{
		nationId: 'nat_papuan',
		medicalKnowledge: 2,
		sanitation: 2,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.1 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.05 },
		],
		faminRisk: 3,
		overallHealth: 4,
	},
	{
		nationId: 'nat_fiji',
		medicalKnowledge: 2,
		sanitation: 3,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.04 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
		],
		faminRisk: 2,
		overallHealth: 5,
	},
	{
		nationId: 'nat_chamorro',
		medicalKnowledge: 2,
		sanitation: 3,
		activeDiseases: [{ diseaseId: 'dis_dysentery', prevalence: 0.02 }],
		faminRisk: 2,
		overallHealth: 6,
	},
	{
		nationId: 'nat_guanche',
		medicalKnowledge: 2,
		sanitation: 3,
		activeDiseases: [{ diseaseId: 'dis_dysentery', prevalence: 0.02 }],
		faminRisk: 3,
		overallHealth: 6,
	},
	{
		nationId: 'nat_san',
		medicalKnowledge: 3,
		sanitation: 3,
		activeDiseases: [],
		faminRisk: 4,
		overallHealth: 6,
	},
	{
		nationId: 'nat_mbuti',
		medicalKnowledge: 3,
		sanitation: 2,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.08 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.04 },
		],
		faminRisk: 3,
		overallHealth: 5,
	},
	{
		nationId: 'nat_igbo',
		medicalKnowledge: 3,
		sanitation: 4,
		activeDiseases: [
			{ diseaseId: 'dis_malaria', prevalence: 0.08 },
			{ diseaseId: 'dis_dysentery', prevalence: 0.03 },
		],
		faminRisk: 2,
		overallHealth: 5,
	},
	{
		nationId: 'nat_chukchi',
		medicalKnowledge: 2,
		sanitation: 3,
		activeDiseases: [],
		faminRisk: 5,
		overallHealth: 5,
	},
]
