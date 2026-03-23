import type { WorldSnapshot } from '../../../shared/src/types/world'

import { religions } from './religions'
import { technologies } from './technologies'
import { commodities, tradeRoutes } from './commodities'
import { languages } from './languages'
import { diseases } from './diseases'
import { nations } from './nations'
import { settlements } from './settlements'
import { nationReligions as nationReligionsData } from './nationReligions'
import { nationTechnologies as nationTechnologiesData } from './nationTechnologies'
import { nationEconomies as nationEconomiesData } from './nationEconomies'
import { nationLanguages as nationLanguagesData } from './nationLanguages'
import { nationCultures as nationCulturesData } from './nationCultures'
import { nationHealthData } from './nationHealth'
import { nationLawsData } from './nationLaws'
import { nationEducationData } from './nationEducation'
import { nationMilitaryData } from './nationMilitary'
import { nationWorldKnowledgeData } from './nationWorldKnowledge'
import { populationsData } from './populations'
import { dailyLifeData } from './dailyLife'
import { infrastructureData } from './infrastructure'
import { climateRegions } from './climateRegions'
import { ecologyData } from './ecology'

// ============================================================================
// WorldSnapshot — An 1000 (assemblage)
// ============================================================================

export const worldSnapshot1000: WorldSnapshot = {
	// --- Métadonnées ---
	id: 'world_seed_1000',
	name: 'Monde historique — An 1000',
	createdAt: new Date().toISOString(),
	forkedFrom: null,
	forkedAtYear: null,
	currentYear: 1000,

	// --- Géographie ---
	tiles: [], // généré par le système de tuiles (PostGIS)
	tradeRoutes,
	climateRegions,
	ecology: ecologyData,

	// --- Entités politiques ---
	nations,
	settlements,

	// --- Peuples ---
	populations: populationsData,
	familyLines: [], // généré au runtime quand un joueur rejoint

	// --- Religion ---
	religions,
	nationReligions: nationReligionsData,

	// --- Technologie ---
	technologies,
	nationTechnologies: nationTechnologiesData,

	// --- Économie ---
	commodities,
	nationEconomies: nationEconomiesData,

	// --- Langues ---
	languages,
	nationLanguages: nationLanguagesData,

	// --- Culture ---
	nationCultures: nationCulturesData,

	// --- Santé ---
	diseases,
	nationHealth: nationHealthData,

	// --- Infrastructure ---
	infrastructure: infrastructureData,

	// --- Droit ---
	nationLaws: nationLawsData,

	// --- Éducation ---
	nationEducation: nationEducationData,

	// --- Militaire ---
	nationMilitary: nationMilitaryData,

	// --- Exploration ---
	nationWorldKnowledge: nationWorldKnowledgeData,

	// --- Vie quotidienne ---
	dailyLife: dailyLifeData,
}
