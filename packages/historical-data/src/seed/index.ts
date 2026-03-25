import type { WorldSnapshot } from '../../../shared/src/types/world'

import { religions } from './religions'
import { technologies } from './technologies'
import { commodities } from './commodities'
import { tradeRoutes } from './tradeRoutes'
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
import { historicalEvents } from './historicalEvents'
import { eventTemplates } from './eventTemplates'
import { informationVectors } from './informationVectors'
import { rumorTemplates } from './rumorTemplates'
import { advisorProfiles } from './advisorProfiles'
import { knowledgeEntries } from './knowledgeEntries'
import {
	advisorResponseTemplates,
	feasibilityRules,
} from './advisorResponseTemplates'
import { culturalNamePools } from './culturalNamePools'
import { constructionRecipes } from './constructionRecipes'
import { socialMobilityPaths, socialMobilityModifiers } from './socialMobility'
import { transportVehicles } from './transportVehicles'

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

	// --- Événements historiques ---
	historicalEvents,
	// --- Modèles d'événements locaux ---
	eventTemplates,

	// --- Système d'information & rumeurs ---
	informationVectors,
	rumorTemplates,
	rumorInstances: [], // générées au runtime par le moteur

	// --- Système de conseiller IA autonome ---
	advisorProfiles,
	knowledgeEntries,
	feasibilityRules,
	advisorResponseTemplates,

	// --- Pools de noms par culture ---
	culturalNamePools,

	// --- Recettes de construction ---
	constructionRecipes,

	// --- Mobilité sociale ---
	socialMobilityPaths,
	socialMobilityModifiers,

	// --- Transport & véhicules ---
	transportVehicles,
}
