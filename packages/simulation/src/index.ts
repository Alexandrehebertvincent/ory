// ============================================================================
// Simulation Package — Public API
// ============================================================================

// --- Types ---
export type {
	SimConfig,
	GameState,
	StaticData,
	Treaty,
	Conflict,
	TickLogEntry,
	TickResult,
	Season,
	PlayerActionCategory,
	ActionStatus,
	ActionTarget,
	PlayerAction,
	EffectChain,
	ScheduledEffect,
	EffectCondition,
	EffectModification,
	DecisionOptionType,
	UrgencyWeight,
	DecisionSource,
	DecisionOption,
	PendingDecision,
	GrandMasterAlert,
} from './types'

export {
	SeededRNG,
	DEFAULT_SIM_CONFIG,
	WEEKS_PER_YEAR,
	weekToSeason,
} from './types'

// --- Engine ---
export { worldTick, runTicks } from './engine/worldTick'
export {
	simulatePopulation,
	simulateDiseasePropagation,
} from './engine/populationSim'
export { simulateEconomy } from './engine/economySim'
export { simulateTechDiffusion } from './engine/techDiffusion'
export { simulateDiplomacy } from './engine/diplomacySim'
export { simulateDisasters } from './engine/disasterSim'
export {
	simulateHistoricalEvents,
	simulateLocalEvents,
	simulateRumors,
} from './engine/eventEngine'

// --- Advisor ---
export type { DetectedIntent } from './advisor/intentDetector'
export { detectIntent } from './advisor/intentDetector'

export type {
	FeasibilityResult,
	FeasibilityOutcome,
	PlayerContext,
} from './advisor/feasibilityEvaluator'
export {
	evaluateFeasibility,
	matchFeasibilityRules,
} from './advisor/feasibilityEvaluator'

export type {
	KnowledgeMatch,
	KnowledgeSearchCriteria,
} from './advisor/knowledgeMatcher'
export {
	searchKnowledge,
	searchKnowledgeFromIntent,
} from './advisor/knowledgeMatcher'

export type {
	TemplateVariables,
	AssembledResponse,
	ResponseSituation,
} from './advisor/responseAssembler'
export {
	selectTemplate,
	fillTemplate,
	assembleKnowledgeResponse,
	assembleFeasibilityResponse,
	assembleGreeting,
	buildVariablesFromKnowledge,
	buildVariablesFromFeasibility,
} from './advisor/responseAssembler'

export type {
	AdvisorQuery,
	AdvisorResponse,
	LLMContext,
	AdvisorStaticData,
	AdvisorPlayerData,
} from './advisor/advisorOrchestrator'
export {
	selectAdvisorProfile,
	processAdvisorQuery,
} from './advisor/advisorOrchestrator'

// --- Decision System ---
export {
	decisionFromHistoricalEvent,
	decisionFromLocalEvent,
	decisionFromPlayerAction,
	generateDecisions,
	resolveExpiredDecisions,
	resolvePlayerChoice,
} from './decision/decisionEngine'

export { evaluateWorldState, calculateMaxUrgency } from './decision/grandMaster'

export {
	generateEffectChain,
	processEffectChains,
	resolveActions,
} from './decision/actionResolver'

// --- Player / Character ---
export {
	TRAIT_CATALOG,
	SKILL_IDS,
	CLASS_SKILL_PROFILES,
	getTraitDef,
	generateTraits,
	generateSkills,
	developSkills,
	traitSkillBonus,
} from './player/traitSystem'
export type { TraitDefinition } from './player/traitSystem'

export {
	BLOCKED_STARTING_CLASSES,
	validateCreation,
	getAvailableClasses,
	generateName,
	computeLifeStage,
	createFoundingMember,
	createPlayerLineage,
} from './player/characterCreation'
export type { CreationValidation } from './player/characterCreation'

export { simulateLifeCycle } from './player/lifeCycleSim'

export {
	simulateSocialMobility,
	getEligiblePaths,
	startMobilityTransition,
} from './player/socialMobilitySim'
export type {
	MobilityTransition,
	MobilityStateMap,
} from './player/socialMobilitySim'

export {
	CLASS_PRESSURE_PROFILES,
	applyPressure,
	getProfile,
	getVisibility,
	scaleUrgency,
	shouldReceiveImposedEvent,
} from './player/pressureSystem'
export type { ClassPressureProfile } from './player/pressureSystem'
