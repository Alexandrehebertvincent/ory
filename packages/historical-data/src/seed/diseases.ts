import type { Disease } from '../../../shared/src/types/world'

// ============================================================================
// Maladies endémiques / épidémiques — An 1000
// ============================================================================
// mortality : taux de mortalité si contractée (0-1)
// endemicRegions : IDs de ClimateRegion où la maladie sévit naturellement
// knownTreatments : IDs de technologies qui aident à traiter
// ============================================================================

export const diseases: Disease[] = [
	{
		id: 'dis_smallpox',
		name: 'Variole',
		type: 'epidemic',
		mortality: 0.3,
		transmissionMode: 'airborne',
		endemicRegions: [
			'clim_temperate_europe',
			'clim_mediterranean',
			'clim_arid_mideast',
			'clim_south_asia',
			'clim_east_asia',
		],
		knownTreatments: [], // pas de traitement connu en l'an 1000
	},
	{
		id: 'dis_malaria',
		name: 'Paludisme',
		type: 'endemic',
		mortality: 0.1,
		transmissionMode: 'insect',
		endemicRegions: [
			'clim_tropical_africa',
			'clim_south_asia',
			'clim_southeast_asia',
			'clim_mediterranean',
		],
		knownTreatments: [],
	},
	{
		id: 'dis_leprosy',
		name: 'Lèpre',
		type: 'endemic',
		mortality: 0.05,
		transmissionMode: 'contact',
		endemicRegions: [
			'clim_temperate_europe',
			'clim_arid_mideast',
			'clim_south_asia',
			'clim_tropical_africa',
		],
		knownTreatments: ['tech_basic_surgery'],
	},
	{
		id: 'dis_tuberculosis',
		name: 'Tuberculose',
		type: 'endemic',
		mortality: 0.4,
		transmissionMode: 'airborne',
		endemicRegions: [
			'clim_temperate_europe',
			'clim_east_asia',
			'clim_south_asia',
			'clim_arid_mideast',
		],
		knownTreatments: [],
	},
	{
		id: 'dis_dysentery',
		name: 'Dysenterie',
		type: 'endemic',
		mortality: 0.15,
		transmissionMode: 'waterborne',
		endemicRegions: [
			'clim_temperate_europe',
			'clim_tropical_africa',
			'clim_south_asia',
			'clim_east_asia',
			'clim_southeast_asia',
		],
		knownTreatments: ['tech_herbal_medicine'],
	},
	{
		id: 'dis_typhoid',
		name: 'Fièvre typhoïde',
		type: 'endemic',
		mortality: 0.2,
		transmissionMode: 'waterborne',
		endemicRegions: [
			'clim_temperate_europe',
			'clim_mediterranean',
			'clim_south_asia',
			'clim_east_asia',
		],
		knownTreatments: [],
	},
	{
		id: 'dis_cholera',
		name: 'Choléra',
		type: 'epidemic',
		mortality: 0.25,
		transmissionMode: 'waterborne',
		endemicRegions: ['clim_south_asia', 'clim_southeast_asia'],
		knownTreatments: [],
	},
	{
		id: 'dis_ergotism',
		name: 'Ergotisme (feu de Saint-Antoine)',
		type: 'endemic',
		mortality: 0.15,
		transmissionMode: 'food',
		endemicRegions: ['clim_temperate_europe'],
		knownTreatments: [],
	},
	{
		id: 'dis_plague',
		name: 'Peste bubonique',
		type: 'epidemic',
		mortality: 0.6,
		transmissionMode: 'insect',
		endemicRegions: ['clim_central_asia_steppe'], // réservoir chez les rongeurs
		knownTreatments: [],
	},
	{
		id: 'dis_measles',
		name: 'Rougeole',
		type: 'epidemic',
		mortality: 0.1,
		transmissionMode: 'airborne',
		endemicRegions: [
			'clim_temperate_europe',
			'clim_arid_mideast',
			'clim_south_asia',
			'clim_east_asia',
		],
		knownTreatments: [],
	},
	{
		id: 'dis_trachoma',
		name: 'Trachome',
		type: 'endemic',
		mortality: 0.01,
		transmissionMode: 'contact',
		endemicRegions: [
			'clim_arid_mideast',
			'clim_tropical_africa',
			'clim_saharan',
		],
		knownTreatments: [],
	},
	{
		id: 'dis_scurvy',
		name: 'Scorbut',
		type: 'endemic',
		mortality: 0.2,
		transmissionMode: 'food', // carence nutritionnelle
		endemicRegions: ['clim_subarctic', 'clim_temperate_europe'],
		knownTreatments: [],
	},
]
