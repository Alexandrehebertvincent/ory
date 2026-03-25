// ============================================================================
// Simulation Engine — Types
// ============================================================================
// Types internes au moteur de simulation. Les types du monde (Nation,
// Population, etc.) restent dans shared/types/world.ts.
// ============================================================================

import type {
	EntityId,
	GameYear,
	Level,
	Ratio,
	Nation,
	Population,
	NationEconomy,
	NationTechnology,
	NationMilitary,
	NationHealth,
	NationReligion,
	NationLaw,
	NationEducation,
	NationWorldKnowledge,
	DiplomaticRelation,
	HistoricalEvent,
	EventTemplate,
	RumorInstance,
	Commodity,
	Technology,
	Disease,
	ClimateRegion,
	Settlement,
	TradeRoute,
	MapTile,
	AdvisorProfile,
	KnowledgeEntry,
	FeasibilityRule,
	AdvisorResponseTemplate,
	InformationVector,
	SocialMobilityPath,
	SocialMobilityModifier,
	TransportVehicle,
	ConstructionRecipe,
	Religion,
	Language,
	NationLanguage,
	NationCulture,
	Infrastructure,
	RegionEcology,
	RumorTemplate,
	DailyLife,
	CulturalNamePool,
	FamilyLine,
	FamilyMember,
	Gender,
	LifeStage,
} from '../../shared/src/types/world'

// ----------------------------------------------------------------------------
// Temps & Saisons
// ----------------------------------------------------------------------------

export const WEEKS_PER_YEAR = 52

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

/** Retourne la saison pour une semaine donnée (1-52) */
export function weekToSeason(week: number): Season {
	if (week <= 13) return 'spring' // semaines 1-13  (mars → mai)
	if (week <= 26) return 'summer' // semaines 14-26 (juin → août)
	if (week <= 39) return 'autumn' // semaines 27-39 (sept → nov)
	return 'winter' // semaines 40-52 (déc → fév)
}

// ----------------------------------------------------------------------------
// Configuration de la simulation
// ----------------------------------------------------------------------------

/** Configuration du moteur — paramètres réglables par monde */
export interface SimConfig {
	/** Durée d'un tick en années de jeu (1/52 = 1 semaine, par défaut) */
	tickDurationYears: number
	/** Multiplicateur global de croissance démographique */
	populationGrowthMultiplier: number
	/** Multiplicateur global de variation économique */
	economicVolatility: number
	/** Multiplicateur global de diffusion technologique */
	techDiffusionRate: number
	/** Probabilité de base d'un événement de catastrophe naturelle par tick */
	disasterBaseProb: number
	/** Probabilité de base de changement diplomatique NPC par tick */
	diplomacyChangeProb: number
	/** Seuil de stabilité sous lequel des révoltes peuvent éclater */
	revoltStabilityThreshold: Level
	/** Activé: les nations NPC agissent de manière autonome */
	npcNationsActive: boolean
	/** Seed pour le RNG (reproductibilité) */
	rngSeed: number
}

export const DEFAULT_SIM_CONFIG: SimConfig = {
	tickDurationYears: 1 / WEEKS_PER_YEAR, // 1 tick = 1 semaine
	populationGrowthMultiplier: 1.0,
	economicVolatility: 1.0,
	techDiffusionRate: 1.0,
	disasterBaseProb: 0.05, // probabilité annuelle, auto-scalée par dt
	diplomacyChangeProb: 0.1, // probabilité annuelle, auto-scalée par dt
	revoltStabilityThreshold: 3,
	npcNationsActive: true,
	rngSeed: 42,
}

// ----------------------------------------------------------------------------
// État du monde mutable (ce qui évolue à chaque tick)
// ----------------------------------------------------------------------------

/**
 * GameState est la version mutable du WorldSnapshot.
 * Seuls les champs qui changent à chaque tick sont ici.
 * Les données statiques (tiles, climateRegions, etc.) restent en lecture seule.
 */
export interface GameState {
	/** Année courante (partie entière = année, partie décimale = fraction d'année) */
	currentYear: GameYear
	/** Semaine courante dans l'année (1-52) */
	currentWeek: number
	/** Saison courante */
	currentSeason: Season

	/** Nations actives (non dissoutes) */
	nations: Nation[]
	populations: Population[]
	nationEconomies: NationEconomy[]
	nationTechnologies: NationTechnology[]
	nationMilitary: NationMilitary[]
	nationHealth: NationHealth[]
	nationReligions: NationReligion[]
	nationLaws: NationLaw[]
	nationEducation: NationEducation[]
	nationWorldKnowledge: NationWorldKnowledge[]
	settlements: Settlement[]
	infrastructure: Infrastructure[]

	/** Lignées des joueurs */
	familyLines: FamilyLine[]

	/** Événements historiques (état mis à jour : pending → triggered, etc.) */
	historicalEvents: HistoricalEvent[]

	/** Rumeurs actives dans le monde */
	activeRumors: RumorInstance[]

	/** Diplomatie — stockée dans nations[].diplomacy, mais aussi ici pour accès rapide */
	activeTreaties: Treaty[]

	/** Conflits armés en cours */
	activeConflicts: Conflict[]

	/** Décisions en attente de réponse joueur */
	pendingDecisions: PendingDecision[]

	/** Actions joueur en cours de résolution */
	playerActions: PlayerAction[]

	/** Alertes du Grand Maître non encore traitées */
	grandMasterAlerts: GrandMasterAlert[]

	/** Log des événements survenus ce tick */
	tickLog: TickLogEntry[]
}

// ----------------------------------------------------------------------------
// Données statiques (lecture seule pendant la simulation)
// ----------------------------------------------------------------------------

export interface StaticData {
	technologies: Technology[]
	commodities: Commodity[]
	diseases: Disease[]
	climateRegions: ClimateRegion[]
	tradeRoutes: TradeRoute[]
	tiles: MapTile[]
	religions: Religion[]
	languages: Language[]
	nationLanguages: NationLanguage[]
	nationCultures: NationCulture[]
	ecology: RegionEcology[]
	eventTemplates: EventTemplate[]
	informationVectors: InformationVector[]
	rumorTemplates: RumorTemplate[]
	advisorProfiles: AdvisorProfile[]
	knowledgeEntries: KnowledgeEntry[]
	feasibilityRules: FeasibilityRule[]
	advisorResponseTemplates: AdvisorResponseTemplate[]
	socialMobilityPaths: SocialMobilityPath[]
	socialMobilityModifiers: SocialMobilityModifier[]
	transportVehicles: TransportVehicle[]
	constructionRecipes: ConstructionRecipe[]
	culturalNamePools: CulturalNamePool[]
	dailyLife: DailyLife[]
}

// ----------------------------------------------------------------------------
// Sous-types de simulation
// ----------------------------------------------------------------------------

/** Traité diplomatique actif entre deux nations */
export interface Treaty {
	id: EntityId
	type: DiplomaticRelation['type']
	nationA: EntityId
	nationB: EntityId
	startYear: GameYear
	strength: Level
}

/** Conflit armé en cours */
export interface Conflict {
	id: EntityId
	attackerId: EntityId
	defenderId: EntityId
	startYear: GameYear
	cause: string
	/** Ratio de force attaquant/défenseur (>1 = avantage attaquant) */
	forceRatio: number
	/** Moral de chaque camp */
	attackerMorale: Level
	defenderMorale: Level
	/** Batailles passées (résumé) */
	battles: number
	/** Conflit terminé ? */
	resolved: boolean
	outcome?: 'attacker_victory' | 'defender_victory' | 'stalemate' | 'truce'
}

/** Entrée dans le log d'un tick */
export interface TickLogEntry {
	year: GameYear
	category:
		| 'population'
		| 'economy'
		| 'technology'
		| 'diplomacy'
		| 'military'
		| 'disaster'
		| 'disease'
		| 'event'
		| 'rumor'
		| 'decision'
		| 'action'
		| 'life_cycle'
		| 'social_mobility'
	nationId?: EntityId
	message: string
	data?: Record<string, unknown>
}

// ----------------------------------------------------------------------------
// Résultat d'un tick
// ----------------------------------------------------------------------------

export interface TickResult {
	/** Nouvel état du monde après le tick */
	state: GameState
	/** Log des événements survenus */
	log: TickLogEntry[]
	/** Durée du tick (ms) */
	durationMs: number
}

// ----------------------------------------------------------------------------
// RNG déterministe
// ----------------------------------------------------------------------------

/**
 * Générateur de nombres pseudo-aléatoires déterministe (mulberry32).
 * Crucial pour la reproductibilité de la simulation.
 */
export class SeededRNG {
	private state: number

	constructor(seed: number) {
		this.state = seed
	}

	/** Retourne un nombre entre 0 et 1 */
	next(): number {
		this.state |= 0
		this.state = (this.state + 0x6d2b79f5) | 0
		let t = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state)
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296
	}

	/** Retourne un entier entre min et max (inclus) */
	intBetween(min: number, max: number): number {
		return Math.floor(this.next() * (max - min + 1)) + min
	}

	/** Retourne true avec la probabilité donnée (0-1) */
	chance(probability: number): boolean {
		return this.next() < probability
	}

	/** Choisit un élément aléatoire dans un tableau */
	pick<T>(arr: readonly T[]): T {
		return arr[Math.floor(this.next() * arr.length)]
	}

	/** Mélange un tableau (Fisher-Yates) — retourne une copie */
	shuffle<T>(arr: readonly T[]): T[] {
		const result = [...arr]
		for (let i = result.length - 1; i > 0; i--) {
			const j = Math.floor(this.next() * (i + 1))
			;[result[i], result[j]] = [result[j], result[i]]
		}
		return result
	}
}

// ----------------------------------------------------------------------------
// Actions joueur & chaînes d'effets (extensibles)
// ----------------------------------------------------------------------------

/**
 * Catégorie d'action — extensible via string union ouverte.
 * Les catégories de base couvrent les interactions courantes,
 * mais les joueurs peuvent inventer des actions non prévues.
 */
export type PlayerActionCategory =
	| 'build'
	| 'trade'
	| 'gift'
	| 'diplomacy'
	| 'military'
	| 'explore'
	| 'research'
	| 'social'
	| 'religious'
	| 'espionage'
	| (string & {}) // extensible : toute chaîne acceptée

/** Statut d'une action dans le pipeline */
export type ActionStatus =
	| 'proposed' // intention brute du joueur
	| 'evaluated' // évaluée par le conseiller
	| 'confirmed' // confirmée par le joueur
	| 'scheduled' // planifiée pour exécution
	| 'in_progress' // en cours d'exécution (multi-ticks)
	| 'resolved' // terminée (succès ou échec)
	| 'cancelled' // annulée par le joueur ou un événement
	| (string & {}) // extensible

/** Cible d'une action — peut être un NPC, un joueur, un lieu, un objet */
export interface ActionTarget {
	/** Type de cible — extensible */
	type:
		| 'nation'
		| 'settlement'
		| 'npc'
		| 'player'
		| 'trade_route'
		| 'tile'
		| (string & {})
	/** ID de la cible */
	id: EntityId
	/** Nom lisible (pour logs et affichage) */
	name: string
}

/**
 * Action d'un joueur sur le monde — structure extensible.
 *
 * Une PlayerAction représente l'intention complète du joueur :
 * ce qu'il veut faire, à qui, avec quoi, et dans quel contexte.
 * Le Grand Maître évalue et résout l'action.
 */
export interface PlayerAction {
	id: EntityId
	/** Qui agit */
	playerId: EntityId
	nationId: EntityId
	/** Catégorie d'action (extensible) */
	category: PlayerActionCategory
	/** Description libre de l'intention du joueur */
	description: string
	/** Cible principale de l'action */
	target: ActionTarget
	/** Cibles secondaires (témoins, alliés, intermédiaires...) */
	secondaryTargets: ActionTarget[]
	/** Ressources engagées par le joueur */
	committedResources: Array<{ resourceId: string; quantity: number }>
	/** Statut actuel dans le pipeline */
	status: ActionStatus
	/** Tick de création */
	createdAtTick: number
	/** Tick de résolution (quand status = resolved) */
	resolvedAtTick?: number
	/** Résultat de faisabilité (pré-rempli par le conseiller) */
	feasibilityOutcome?: string
	/** Chaîne d'effets générée par le Grand Maître */
	effectChain?: EffectChain
	/** Données libres pour extensibilité */
	metadata: Record<string, unknown>
}

/**
 * Chaîne d'effets — conséquences d'une action qui se propagent dans le temps.
 * Chaque action résolue peut déclencher une cascade d'effets étalés sur
 * plusieurs ticks, avec des probabilités et des conditions.
 */
export interface EffectChain {
	id: EntityId
	/** L'action source */
	sourceActionId: EntityId
	/** Effets planifiés (triés par delayTicks croissant) */
	effects: ScheduledEffect[]
	/** La chaîne est-elle terminée ? */
	completed: boolean
}

/**
 * Effet planifié — un événement futur déclenché par une action.
 *
 * Les effets ne sont PAS déterministes : leur probabilité et leurs conditions
 * sont ré-évaluées au moment du déclenchement. Le monde a pu changer
 * entre la planification et l'exécution.
 */
export interface ScheduledEffect {
	id: EntityId
	/** Délai en ticks depuis la résolution de l'action */
	delayTicks: number
	/** Type d'effet — extensible */
	type:
		| 'economic'
		| 'diplomatic'
		| 'social'
		| 'military'
		| 'knowledge'
		| 'reputation'
		| 'population'
		| 'infrastructure'
		| (string & {})
	/** Description humaine de l'effet */
	description: string
	/** Cible de l'effet */
	target: ActionTarget
	/** Probabilité de déclenchement (0-1), ré-évaluée au moment d'exécution */
	probability: number
	/** Conditions pour que l'effet se produise (évaluées au tick de déclenchement) */
	conditions: EffectCondition[]
	/** Modifications concrètes à appliquer si déclenché */
	modifications: EffectModification[]
	/** L'effet a-t-il été exécuté ? */
	executed: boolean
	/** Résultat si exécuté */
	outcome?: 'triggered' | 'skipped' | 'conditions_unmet'
}

/**
 * Condition d'un effet — vérifie que le monde est dans l'état attendu.
 * Structure extensible : de nouveaux types de conditions pourront être ajoutés.
 */
export interface EffectCondition {
	/** Type de condition — extensible */
	type:
		| 'nation_exists'
		| 'nation_has_tech'
		| 'nation_has_resource'
		| 'nation_relation_above'
		| 'nation_relation_below'
		| 'settlement_exists'
		| 'year_after'
		| 'year_before'
		| (string & {})
	/** ID de l'entité concernée */
	targetId: EntityId
	/** Valeur de comparaison */
	value: string | number
	/** Données additionnelles */
	params: Record<string, unknown>
}

/**
 * Modification concrète à appliquer au monde quand un effet se déclenche.
 * Structure extensible pour supporter tout type de changement futur.
 */
export interface EffectModification {
	/** Type de modification — extensible */
	type:
		| 'adjust_relation'
		| 'transfer_resource'
		| 'change_population'
		| 'add_rumor'
		| 'trigger_event'
		| 'modify_stability'
		| 'grant_knowledge'
		| 'destroy_infrastructure'
		| (string & {})
	/** Cible de la modification */
	targetId: EntityId
	/** Champ à modifier */
	field: string
	/** Delta ou valeur à appliquer */
	value: number | string
	/** Données additionnelles */
	params: Record<string, unknown>
}

// ----------------------------------------------------------------------------
// Système de décision — Choix contextuels proposés au joueur
// ----------------------------------------------------------------------------

/**
 * Type de choix proposé au joueur (GDD §3.1 — les 3 options) :
 * - historical : réplique d'un événement/décision historique réelle
 * - optimal    : meilleur choix calculé par l'IA selon le contexte
 * - free       : action libre formulée par le joueur
 */
export type DecisionOptionType = 'historical' | 'optimal' | 'free'

/**
 * Urgence d'une décision — plus c'est urgent, plus le time ratio ralentit.
 * Le Grand Maître collecte les poids d'urgence pour calculer le ratio.
 */
export type UrgencyWeight = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

/**
 * Source qui a généré cette décision.
 */
export type DecisionSource =
	| 'historical_event' // un HistoricalEvent avec playerChoices
	| 'local_event' // un EventTemplate instancié
	| 'grand_master' // le Grand Maître impose/propose
	| 'player_action' // réponse à une PlayerAction en cours
	| 'life_cycle' // étape de vie (mariage, succession, etc.)
	| (string & {}) // extensible

/**
 * Une option de choix concrète proposée au joueur.
 */
export interface DecisionOption {
	id: EntityId
	/** Type GDD (historique / optimal / libre) */
	type: DecisionOptionType
	/** Titre court (affiché dans l'interface) */
	label: string
	/** Description narrative (style conseiller) */
	description: string
	/** Effets prévisibles (ce que le joueur peut anticiper) */
	predictedEffects: string[]
	/** Risques identifiés */
	risks: string[]
	/** Préconditions sociales — certains choix réservés à certaines classes */
	requiredSocialClass?: string
	/** Action équivalente si le joueur choisit cette option */
	generatedAction?: Partial<PlayerAction>
	/** Référence historique (si type = historical) */
	historicalReference?: string
	/** Score de confiance IA (0-1) — pertinence de cette option */
	confidence: number
}

/**
 * Une décision en attente de réponse du joueur.
 * Générée par le DecisionEngine ou le Grand Maître.
 */
export interface PendingDecision {
	id: EntityId
	/** Joueur concerné */
	playerId: EntityId
	nationId: EntityId
	/** Famille/personnage qui doit décider */
	familyLineId: EntityId
	/** Source de la décision */
	source: DecisionSource
	/** ID de l'entité source (event, template, etc.) */
	sourceEntityId?: EntityId
	/** Contexte narratif pour le joueur */
	narrativeContext: string
	/** Options proposées (au moins 2, typiquement 3+) */
	options: DecisionOption[]
	/** Poids d'urgence (0 = cosmétique, 10 = crise existentielle) */
	urgency: UrgencyWeight
	/** Tick de création */
	createdAtTick: number
	/** Deadline en ticks (après quoi l'IA choisit par défaut) */
	deadlineTick: number
	/** L'option par défaut si timeout (la plus neutre/historique) */
	defaultOptionId: EntityId
	/** Décision prise ? */
	resolved: boolean
	/** Option choisie (quand resolved = true) */
	chosenOptionId?: EntityId
	/** Le choix a-t-il été fait par l'IA (timeout) ou le joueur ? */
	resolvedBy?: 'player' | 'ai_timeout' | 'ai_default'
}

/**
 * Alerte du Grand Maître — friction ou opportunité détectée entre entités.
 * Peut devenir un PendingDecision pour un ou plusieurs joueurs.
 */
export interface GrandMasterAlert {
	id: EntityId
	/** Type d'alerte — extensible */
	type:
		| 'border_tension' // tension frontalière inévitable
		| 'resource_conflict' // conflit de ressources
		| 'trade_opportunity' // opportunité commerciale
		| 'diplomatic_marriage' // mariage diplomatique potentiel
		| 'refugee_crisis' // afflux de réfugiés
		| 'epidemic_spread' // épidémie qui se propage
		| 'military_threat' // menace militaire détectée
		| 'tech_leap' // écart technologique significatif
		| 'cultural_clash' // friction culturelle/religieuse
		| 'alliance_opportunity' // alliance face à menace commune
		| (string & {}) // extensible
	/** Nations concernées */
	involvedNationIds: EntityId[]
	/** Joueurs directement affectés */
	affectedPlayerIds: EntityId[]
	/** Urgence */
	urgency: UrgencyWeight
	/** Contexte narratif */
	description: string
	/** L'alerte est-elle imposée (inévitable) ou proposée (opportunité) ? */
	imposed: boolean
	/** Tick de création */
	createdAtTick: number
	/** L'alerte a-t-elle été convertie en PendingDecision ? */
	processed: boolean
}
