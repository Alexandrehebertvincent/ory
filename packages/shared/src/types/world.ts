// ============================================================================
// ORY — World Snapshot Data Model
// ============================================================================
// Ce fichier définit le modèle de données du snapshot An 1000.
// Il sert aussi de base pour l'état runtime du monde (qui évolue avec le jeu).
// ============================================================================

// ----------------------------------------------------------------------------
// Primitives & Utilitaires
// ----------------------------------------------------------------------------

/** Identifiant unique pour toute entité du jeu */
export type EntityId = string

/** Coordonnées géographiques (latitude/longitude réelles) */
export interface GeoCoord {
	lat: number
	lng: number
}

/** Polygone géographique (liste de coordonnées formant une frontière) */
export type GeoPolygon = GeoCoord[]

/** Année dans le jeu (peut dépasser 2026) */
export type GameYear = number

/** Valeur entre 0 et 1 représentant un pourcentage/ratio */
export type Ratio = number

/** Valeur entre 0 et 10 représentant un niveau/score */
export type Level = number

/**
 * Rend un type union extensible : préserve l'autocomplétion IDE
 * pour les valeurs connues tout en acceptant n'importe quel string.
 * Ex: Extensible<"land" | "sea"> accepte "land", "sea", et aussi "air", "rail", etc.
 */
export type Extensible<T extends string> = T | (string & {})

// ----------------------------------------------------------------------------
// 1. Géographie & Carte
// ----------------------------------------------------------------------------

export type TerrainType = Extensible<
	| 'ocean'
	| 'sea'
	| 'lake'
	| 'river'
	| 'plain'
	| 'hill'
	| 'mountain'
	| 'forest'
	| 'dense_forest'
	| 'jungle'
	| 'desert'
	| 'tundra'
	| 'steppe'
	| 'swamp'
	| 'coast'
	| 'ice'
>

export type ResourceType = Extensible<
	| 'iron'
	| 'copper'
	| 'gold'
	| 'silver'
	| 'tin'
	| 'salt'
	| 'stone'
	| 'marble'
	| 'wood'
	| 'fertile_land'
	| 'fresh_water'
	| 'fish'
	| 'furs'
	| 'silk'
	| 'spices'
	| 'cotton'
	| 'wool'
	| 'horses'
	| 'cattle'
	| 'ivory'
	| 'gems'
	| 'coal'
	| 'clay'
>

export interface NaturalResource {
	type: ResourceType
	abundance: Level // 0-10
}

export interface MapTile {
	id: EntityId
	coord: GeoCoord
	terrain: TerrainType
	elevation: number // mètres
	resources: NaturalResource[]
	rainfall: Level // 0-10 (précipitations annuelles moyennes)
	temperature: Level // 0-10 (température moyenne annuelle, 0=glacial, 10=tropical)
	fertility: Level // 0-10 (aptitude agricole)
	nationId: EntityId | null // nation qui contrôle cette tuile (null = terres sauvages)
	settlementId: EntityId | null // ville/village sur cette tuile
}

export interface TradeRoute {
	id: EntityId
	name: string
	type: Extensible<'land' | 'sea' | 'river'>
	waypoints: GeoCoord[]
	connectsNations: EntityId[] // nations reliées
	goods: ResourceType[] // biens typiquement échangés
	danger: Level // 0-10 (risque de pillage, naufrage, etc.)
	importance: Level // 0-10
}

// ----------------------------------------------------------------------------
// 1b. Véhicules & Navires (catalogue de transport)
// ----------------------------------------------------------------------------

/** Domaine de déplacement */
export type TransportDomain = Extensible<
	| 'ocean' // haute mer
	| 'coastal' // cabotage côtier
	| 'river' // navigation fluviale
	| 'land' // transport terrestre
	| 'pack' // bête de somme (sentiers, montagnes)
>

/** Rôle principal du véhicule */
export type TransportRole = Extensible<
	| 'trade' // transport de marchandises
	| 'war' // navire ou véhicule militaire
	| 'exploration' // exploration longue distance
	| 'fishing' // pêche
	| 'passenger' // transport de personnes
	| 'raid' // raids rapides
	| 'siege' // siège (tours, béliers)
	| 'ceremony' // embarcation cérémonielle
	| 'courier' // messagerie rapide
>

/**
 * Véhicule de transport — navire, chariot, monture, caravane, etc.
 * Ce catalogue décrit les types disponibles dans le jeu, pas les instances.
 */
export interface TransportVehicle {
	id: EntityId
	name: string
	description: string
	domain: TransportDomain
	roles: TransportRole[]
	/** Technologies requises pour construire/utiliser */
	requiredTechs: EntityId[]
	/** Capacité de cargaison (unités abstraites, 0 = monture seule) */
	cargoCapacity: number
	/** Capacité de passagers */
	passengerCapacity: number
	/** Vitesse en km/jour (conditions normales) */
	speedKmPerDay: number
	/** Équipage nécessaire */
	crewRequired: number
	/** Coût de construction (unités abstraites) */
	buildCost: number
	/** Coût d'entretien annuel */
	maintenanceCostPerYear: number
	/** Résistance en combat (0-10, 0 = aucun usage militaire) */
	combatStrength: Level
	/** Résistance aux intempéries (0-10) */
	seaworthiness: Level
	/** Terrains compatibles (pour transport terrestre) */
	allowedTerrains: TerrainType[]
	/** Peut naviguer en haute mer ? */
	oceanCapable: boolean
	/** Peut remonter les rivières ? */
	riverCapable: boolean
	/** Cultures/nations associées ([] = universel) */
	culturalOrigins: EntityId[]
	/** Année de disponibilité */
	minYear: GameYear
	maxYear: GameYear | null
	notes: string
}

// ----------------------------------------------------------------------------
// 2. Nations & Politique
// ----------------------------------------------------------------------------

export type GovernanceType = Extensible<
	| 'feudal_monarchy'
	| 'absolute_monarchy'
	| 'theocracy'
	| 'tribal'
	| 'tribal_confederation'
	| 'republic'
	| 'city_state'
	| 'empire'
	| 'nomadic'
	| 'chiefdom'
>

export type DiplomaticRelationType = Extensible<
	| 'alliance'
	| 'vassalage'
	| 'tributary'
	| 'rivalry'
	| 'war'
	| 'neutral'
	| 'trade_agreement'
	| 'non_aggression'
	| 'royal_marriage'
>

export interface DiplomaticRelation {
	targetNationId: EntityId
	type: DiplomaticRelationType
	strength: Level // 0-10 (solidité de la relation)
}

export interface Ruler {
	name: string
	dynastyName: string
	birthYear: GameYear
	age: number
	traits: string[] // ex: "ambitious", "pious", "cruel", "wise"
}

export interface Nation {
	id: EntityId
	name: string
	dempinym: string // ex: "Français", "Song", "Fatimide"
	governance: GovernanceType
	capital: EntityId // settlementId
	territory: GeoPolygon // frontières approximatives
	tileIds: EntityId[] // tuiles contrôlées
	ruler: Ruler
	diplomacy: DiplomaticRelation[]
	vassalOf: EntityId | null // si vassal d'une autre nation
	stability: Level // 0-10 (stabilité politique interne)
	prestige: Level // 0-10 (réputation internationale)
	color: string // couleur sur la carte (hex)
	/** Année d'apparition (optionnel). Si défini, la nation est "future" et n'existe pas encore au démarrage. */
	startYear?: GameYear
}

// ----------------------------------------------------------------------------
// 3. Population & Démographie
// ----------------------------------------------------------------------------

export type SocialClass = Extensible<
	| 'royalty'
	| 'nobility'
	| 'clergy'
	| 'merchants'
	| 'artisans'
	| 'free_peasants'
	| 'serfs'
	| 'slaves'
	| 'nomads'
	| 'warriors'
>

export interface SocialGroup {
	class: SocialClass
	percentage: Ratio // part de la population totale
	influence: Level // 0-10 (pouvoir politique)
	wealth: Level // 0-10 (richesse relative)
}

export interface Population {
	nationId: EntityId
	total: number // population totale estimée
	urbanRatio: Ratio // % vivant en ville
	socialGroups: SocialGroup[]
	lifeExpectancy: number // années (moyenne)
	infantMortality: Ratio // % de décès avant 5 ans
	birthRate: Ratio // naissances par habitant par an
	deathRate: Ratio // décès par habitant par an
	growthRate: Ratio // taux de croissance annuel
}

// ----------------------------------------------------------------------------
// 3b. Mobilité sociale
// ----------------------------------------------------------------------------

/** Mécanisme d'ascension / déchéance (ex: mariage, service militaire, ordination…) */
export type MobilityMechanism = Extensible<
	| 'marriage'
	| 'military_service'
	| 'religious_ordination'
	| 'guild_mastery'
	| 'trade_wealth'
	| 'land_acquisition'
	| 'royal_favour'
	| 'education'
	| 'rebellion'
	| 'inheritance'
	| 'adoption'
	| 'enslavement'
	| 'manumission'
	| 'exile'
	| 'debt'
	| 'conquest'
>

/** Direction du mouvement social */
export type MobilityDirection = 'up' | 'down'

/**
 * Chemin de mobilité sociale : décrit UNE transition possible entre deux classes.
 * Ex: free_peasants → artisans via guild_mastery.
 */
export interface SocialMobilityPath {
	id: EntityId
	fromClass: SocialClass
	toClass: SocialClass
	direction: MobilityDirection
	mechanism: MobilityMechanism
	name: string // ex: "Apprentissage de guilde"
	description: string
	/** Prérequis technologiques (ex: guilds requiert tech_guilds) */
	requiredTechs: EntityId[]
	/** Niveau minimum de richesse familiale (0-10) */
	minWealth: Level
	/** Niveau minimum de réputation familiale (0-10) */
	minReputation: Level
	/** Durée en années de jeu pour compléter la transition */
	durationYears: number
	/** Coût en richesse (unités abstraites) */
	wealthCost: number
	/** Probabilité de base de réussite (0-1) */
	baseSuccessRate: Ratio
	/** Impact sur la réputation familiale en cas de succès (-10 à +10) */
	reputationChangeOnSuccess: number
	/** Impact sur la réputation familiale en cas d'échec */
	reputationChangeOnFailure: number
	/** Nombre de générations nécessaires (1 = immédiat, 2+ = trans-générationnel) */
	generationsRequired: number
	/** Réversible ? (un noble déchu peut-il remonter ?) */
	reversible: boolean
	/** Année de disponibilité min/max */
	minYear: GameYear
	maxYear: GameYear | null
	notes: string
}

/**
 * Modificateur national de mobilité sociale.
 * Chaque nation a ses propres règles qui facilitent ou freinent la mobilité.
 */
export interface SocialMobilityModifier {
	nationId: EntityId
	/** Ouverture globale à la mobilité ascendante (0 = rigide, 10 = très fluide) */
	upwardOpenness: Level
	/** Risque de déchéance sociale (0 = stable, 10 = très instable) */
	downwardRisk: Level
	/** Mécanismes spécifiquement encouragés dans cette nation */
	encouragedMechanisms: MobilityMechanism[]
	/** Mécanismes spécifiquement bloqués ou très rares */
	blockedMechanisms: MobilityMechanism[]
	/** Le clergé est-il accessible à toutes les classes ? */
	clergyOpenToAll: boolean
	/** Existe-t-il un système d'examen officiel ? (ex: examens impériaux chinois) */
	hasMeritExam: boolean
	/** L'esclavage peut-il mener à l'affranchissement ? */
	manumissionAllowed: boolean
	/** Notes sur le contexte culturel */
	notes: string
}

// ----------------------------------------------------------------------------
// 4. Établissements humains (Villes & Villages)
// ----------------------------------------------------------------------------

export type SettlementType = Extensible<
	| 'capital'
	| 'major_city'
	| 'city'
	| 'town'
	| 'village'
	| 'fortress'
	| 'monastery'
	| 'port'
	| 'trading_post'
	| 'nomadic_camp'
>

export interface Settlement {
	id: EntityId
	name: string
	type: SettlementType
	coord: GeoCoord
	tileId: EntityId
	nationId: EntityId
	population: number
	defenseLevel: Level // 0-10 (fortifications)
	wealthLevel: Level // 0-10
	specializations: string[] // ex: "trade", "religious_center", "military", "academic"
}

// ----------------------------------------------------------------------------
// 5. Religion & Croyances
// ----------------------------------------------------------------------------

export type ReligionFamily = Extensible<
	| 'christianity'
	| 'islam'
	| 'buddhism'
	| 'hinduism'
	| 'judaism'
	| 'taoism'
	| 'confucianism'
	| 'shintoism'
	| 'zoroastrianism'
	| 'animism'
	| 'norse_paganism'
	| 'slavic_paganism'
	| 'tengriism'
	| 'traditional_african'
	| 'mesoamerican'
	| 'polynesian'
	| 'other'
>

export interface Religion {
	id: EntityId
	name: string // ex: "Catholicisme", "Islam sunnite", "Bouddhisme Theravada"
	family: ReligionFamily
	holyCity: EntityId | null // settlementId
	organizationLevel: Level // 0-10 (0=décentralisé/animiste, 10=papauté)
	proselytism: Level // 0-10 (tendance à convertir)
	politicalInfluence: Level // 0-10
	practices: string[] // ex: "pilgrimage", "monasticism", "holy_war", "sacrifice"
}

export interface NationReligion {
	nationId: EntityId
	stateReligionId: EntityId | null // religion officielle (null = pas de religion d'état)
	religions: Array<{
		religionId: EntityId
		percentage: Ratio // part de la population
		status: Extensible<'state' | 'tolerated' | 'persecuted' | 'minority'>
	}>
	religiousTension: Level // 0-10
}

// ----------------------------------------------------------------------------
// 6. Technologie (Arbre de dépendances — DAG)
// ----------------------------------------------------------------------------

export type TechCategory = Extensible<
	| 'agriculture'
	| 'metallurgy'
	| 'construction'
	| 'navigation'
	| 'military'
	| 'medicine'
	| 'writing'
	| 'astronomy'
	| 'mathematics'
	| 'craftsmanship'
	| 'governance'
	| 'trade'
	| 'philosophy'
>

export interface Technology {
	id: EntityId
	name: string // ex: "Charrue lourde", "Poudre à canon", "Astrolabe"
	category: TechCategory
	description: string
	yearAvailable?: GameYear // année à laquelle la tech devient découvrable (omis = disponible dès l'an 1000)
	prerequisites: EntityId[] // IDs des techs requises (le DAG)
	effects: string[] // ex: "+20% rendement agricole", "Permet la navigation hauturière"
	complexity: Level // 0-10 (difficulté à découvrir/maîtriser)
}

export interface NationTechnology {
	nationId: EntityId
	unlockedTechs: EntityId[] // techs maîtrisées
	researchProgress: Array<{
		techId: EntityId
		progress: Ratio // 0-1 (en cours de recherche)
	}>
	innovationCapacity: Level // 0-10 (facilité à inventer)
}

// ----------------------------------------------------------------------------
// 7. Économie & Commerce
// ----------------------------------------------------------------------------

export interface Commodity {
	id: EntityId
	name: string // ex: "Blé", "Fer", "Soie", "Sel", "Bœuf"
	category: Extensible<
		'food' | 'raw_material' | 'luxury' | 'manufactured' | 'livestock'
	>
	baseValue: number // valeur de référence en l'an 1000 (unité abstraite)
	weight: number // poids relatif (affecte le transport)
	perishable: boolean
}

export interface NationEconomy {
	nationId: EntityId
	currency: string | null // nom de la monnaie (null = troc)
	currencyValue: number // valeur relative de la monnaie
	gdpEstimate: number // richesse totale abstraite
	taxRate: Ratio
	tradeBalance: number // positif = excédent, négatif = déficit
	mainExports: EntityId[] // commodityIds
	mainImports: EntityId[] // commodityIds
	tradeRouteAccess: EntityId[] // tradeRouteIds
	marketPrices: Array<{
		commodityId: EntityId
		price: number // prix local (peut diverger de baseValue)
	}>
}

// ----------------------------------------------------------------------------
// 8. Climat & Environnement naturel
// ----------------------------------------------------------------------------

export type ClimateZone = Extensible<
	| 'tropical'
	| 'arid'
	| 'mediterranean'
	| 'temperate'
	| 'continental'
	| 'subarctic'
	| 'arctic'
	| 'monsoon'
	| 'highland'
>

export type NaturalDisasterType = Extensible<
	| 'earthquake'
	| 'volcanic_eruption'
	| 'flood'
	| 'drought'
	| 'tsunami'
	| 'hurricane'
	| 'famine'
	| 'wildfire'
	| 'plague'
>

export interface ClimateRegion {
	id: EntityId
	zone: ClimateZone
	area: GeoPolygon
	avgTemperature: number // °C moyen annuel
	avgRainfall: number // mm/an
	seasonality: Level // 0-10 (0=stable toute l'année, 10=saisons très marquées)
	disasterRisks: Array<{
		type: NaturalDisasterType
		probability: Ratio // probabilité annuelle
		severity: Level // 0-10
	}>
}

// ----------------------------------------------------------------------------
// 9. Santé & Maladies
// ----------------------------------------------------------------------------

export type DiseaseType = Extensible<'endemic' | 'epidemic' | 'pandemic'>

export interface Disease {
	id: EntityId
	name: string // ex: "Variole", "Paludisme", "Lèpre", "Peste"
	type: DiseaseType
	mortality: Ratio // taux de mortalité si contractée
	transmissionMode: Extensible<
		'airborne' | 'waterborne' | 'insect' | 'contact' | 'food'
	>
	endemicRegions: EntityId[] // climateRegionIds où la maladie est endémique
	knownTreatments: EntityId[] // techIds qui aident à traiter
}

export interface NationHealth {
	nationId: EntityId
	medicalKnowledge: Level // 0-10
	sanitation: Level // 0-10 (hygiène générale)
	activeDiseases: Array<{
		diseaseId: EntityId
		prevalence: Ratio // % de la population affectée
	}>
	faminRisk: Level // 0-10
	overallHealth: Level // 0-10
}

// ----------------------------------------------------------------------------
// 10. Langues & Écriture
// ----------------------------------------------------------------------------

export type LanguageFamily = Extensible<
	| 'indo_european'
	| 'sino_tibetan'
	| 'afro_asiatic'
	| 'niger_congo'
	| 'austronesian'
	| 'turkic'
	| 'uralic'
	| 'dravidian'
	| 'japonic'
	| 'koreanic'
	| 'tai_kadai'
	| 'mongolic'
	| 'nilo_saharan'
	| 'quechuan'
	| 'mayan'
	| 'na_dene'
	| 'other'
>

export type ScriptType = Extensible<
	| 'latin'
	| 'arabic'
	| 'chinese'
	| 'cyrillic'
	| 'devanagari'
	| 'greek'
	| 'hebrew'
	| 'runic'
	| 'tamil'
	| 'khmer'
	| 'tibetan'
	| 'korean'
	| 'japanese'
	| 'ethiopic'
	| 'maya_glyphs'
	| 'none'
>

export interface Language {
	id: EntityId
	name: string // ex: "Ancien français", "Arabe classique", "Chinois moyen"
	family: LanguageFamily
	script: ScriptType
	speakerCount: number // estimation mondiale
	isLingua_franca: boolean // langue de commerce/diplomatie
}

export interface NationLanguage {
	nationId: EntityId
	officialLanguageId: EntityId
	spokenLanguages: Array<{
		languageId: EntityId
		percentage: Ratio // % de la population qui la parle
	}>
	literacyRate: Ratio // % de la population qui sait lire/écrire
}

// ----------------------------------------------------------------------------
// 11. Culture & Arts
// ----------------------------------------------------------------------------

export type ArchitecturalStyle = Extensible<
	| 'romanesque'
	| 'islamic'
	| 'chinese_imperial'
	| 'indian'
	| 'southeast_asian'
	| 'mesoamerican'
	| 'african_vernacular'
	| 'norse'
	| 'byzantine'
	| 'andean'
	| 'steppe_nomadic'
	| 'polynesian'
>

export interface NationCulture {
	nationId: EntityId
	architecturalStyle: ArchitecturalStyle
	culturalTraits: string[] // ex: "oral_tradition", "literary", "martial", "mercantile", "seafaring"
	festivals: string[] // fêtes et célébrations importantes
	artForms: string[] // ex: "calligraphy", "mosaic", "woodcarving", "weaving"
	cuisineStaples: string[] // aliments de base (riz, blé, maïs, millet, etc.)
	clothing: string[] // styles vestimentaires dominants
	socialCustoms: string[] // coutumes (mariage, funérailles, etc.)
	culturalPrestige: Level // 0-10 (rayonnement culturel)
}

// ----------------------------------------------------------------------------
// 12. Infrastructure
// ----------------------------------------------------------------------------

export type InfrastructureType = Extensible<
	| 'road'
	| 'bridge'
	| 'port'
	| 'aqueduct'
	| 'canal'
	| 'wall'
	| 'fortress'
	| 'market'
	| 'granary'
	| 'mine'
	| 'irrigation'
	| 'lighthouse'
>

export interface Infrastructure {
	id: EntityId
	type: InfrastructureType
	name: string
	nationId: EntityId
	coord: GeoCoord
	condition: Level // 0-10 (état de la structure)
	strategicValue: Level // 0-10
}

// ----------------------------------------------------------------------------
// 12b. Recettes de construction (blueprints)
// ----------------------------------------------------------------------------

export type ConstructionTier = Extensible<
	'basic' | 'improved' | 'advanced' | 'monumental'
>

export interface ResourceCost {
	resource: ResourceType
	quantity: number // unités abstraites
}

export interface ConstructionRecipe {
	id: EntityId
	type: InfrastructureType // ce qu'on construit
	tier: ConstructionTier
	name: string // ex: "Route pavée"
	description: string
	requiredTechs: EntityId[] // tech_xxx nécessaires
	resourceCosts: ResourceCost[]
	laborForce: number // travailleurs nécessaires
	durationMonths: number // temps de construction en mois de jeu
	maintenanceCostPerYear: number // coût annuel abstrait
	minSocialClass: SocialTargetClass // classe minimale pour commander
	allowedTerrains: TerrainType[] // [] = tous terrains
	forbiddenTerrains: TerrainType[] // terrains où impossible
	requiresCoast: boolean
	requiresRiver: boolean
	minYear: GameYear // année minimale de disponibilité
	maxYear: GameYear | null // null = pas de limite haute
	conditionOnComplete: Level // état initial à la fin de la construction
	strategicValueOnComplete: Level
	notes: string // contexte historique
}

// ----------------------------------------------------------------------------
// 13. Droit & Justice
// ----------------------------------------------------------------------------

export type LegalSystem = Extensible<
	| 'customary'
	| 'religious_canon'
	| 'religious_sharia'
	| 'religious_dharma'
	| 'imperial_code'
	| 'tribal_law'
	| 'feudal_law'
	| 'mixed'
>

export interface NationLaw {
	nationId: EntityId
	legalSystem: LegalSystem
	propertyRights: Level // 0-10 (protection de la propriété)
	personalFreedom: Level // 0-10 (liberté individuelle)
	genderEquality: Level // 0-10
	slaveryStatus: Extensible<'legal' | 'restricted' | 'abolished'>
	judicialIndependence: Level // 0-10
	crimeRate: Level // 0-10 (niveau de criminalité général)
	commonCrimes: string[] // ex: "banditry", "piracy", "heresy", "smuggling", "theft"
	punishments: string[] // ex: "fine", "mutilation", "execution", "exile", "imprisonment"
	lawEnforcement: Level // 0-10 (capacité à faire respecter la loi)
}

// ----------------------------------------------------------------------------
// 14. Éducation
// ----------------------------------------------------------------------------

export type EducationInstitution = Extensible<
	| 'monastery'
	| 'madrasa'
	| 'imperial_academy'
	| 'guild_apprenticeship'
	| 'oral_tradition'
	| 'temple_school'
	| 'court_school'
	| 'university'
>

export interface NationEducation {
	nationId: EntityId
	institutions: EducationInstitution[]
	scholarPopulation: Ratio // % de la population éduquée formellement
	knowledgeAreas: TechCategory[] // domaines d'expertise
	libraryCount: number // nombre approximatif de bibliothèques/collections de savoirs
	educationAccess: Level // 0-10 (accessibilité de l'éducation)
}

// ----------------------------------------------------------------------------
// 15. Militaire
// ----------------------------------------------------------------------------

export type MilitaryUnitType = Extensible<
	| 'infantry'
	| 'heavy_infantry'
	| 'cavalry'
	| 'heavy_cavalry'
	| 'archers'
	| 'crossbowmen'
	| 'siege_engineers'
	| 'navy'
	| 'war_elephants'
	| 'chariots'
	| 'militia'
	| 'mercenaries'
>

export interface NationMilitary {
	nationId: EntityId
	armySize: number // effectifs totaux
	availableUnits: MilitaryUnitType[]
	militaryStrength: Level // 0-10 (force globale)
	navalStrength: Level // 0-10
	fortificationCount: number
	warExperience: Level // 0-10
	morale: Level // 0-10
	professionalArmy: boolean // armée pro vs levée paysanne
}

// ----------------------------------------------------------------------------
// 16. Exploration & Connaissance du monde
// ----------------------------------------------------------------------------

export interface NationWorldKnowledge {
	nationId: EntityId
	knownRegions: GeoPolygon[] // zones du monde que cette nation connaît
	explorationCapacity: Level // 0-10 (capacité à explorer)
	navalRange: Level // 0-10 (distance de navigation possible)
	cartographyLevel: Level // 0-10
	knownNations: EntityId[] // nations dont on connaît l'existence
	myths: string[] // croyances sur les zones inconnues
}

// ----------------------------------------------------------------------------
// 17. Écologie & Faune
// ----------------------------------------------------------------------------

export interface RegionEcology {
	regionId: EntityId // climateRegionId
	dominantFlora: string[] // ex: "chêne", "bambou", "palmier", "bouleau"
	dominantFauna: string[] // ex: "loup", "cerf", "éléphant", "bison"
	domesticatedAnimals: string[] // ex: "cheval", "bœuf", "chameau", "lama"
	domesticatedPlants: string[] // ex: "blé", "riz", "maïs", "millet"
	forestCoverage: Ratio // % couvert forestier
	biodiversity: Level // 0-10
	humanImpact: Level // 0-10 (déforestation, surpâturage, etc.)
}

// ----------------------------------------------------------------------------
// 18. Vie quotidienne (immersion du joueur en tant qu'humain)
// ----------------------------------------------------------------------------

export interface DailyLife {
	nationId: EntityId
	socialClass: SocialClass
	typicalDiet: string[] // aliments quotidiens
	housing: string // type de logement (hutte, maison en pierre, palais, yourte...)
	clothing: string // vêtements typiques
	workType: string // occupation typique
	leisureActivities: string[] // loisirs (jeux, fêtes, chasse, musique)
	averageIncome: number // en unité économique du jeu
	qualityOfLife: Level // 0-10
}

// ----------------------------------------------------------------------------
// 19. Lignée familiale (le joueur)
// ----------------------------------------------------------------------------

export type Gender = 'male' | 'female'

export type LifeStage =
	| 'infant' // 0-2 ans
	| 'child' // 3-11 ans
	| 'adolescent' // 12-17 ans
	| 'adult' // 18-49 ans
	| 'elder' // 50+ ans

export interface FamilyMember {
	id: EntityId
	name: string
	gender: Gender
	birthYear: GameYear
	deathYear: GameYear | null // null = vivant
	parentId: EntityId | null
	spouseId: EntityId | null
	childrenIds: EntityId[]
	nationId: EntityId
	socialClass: SocialClass
	traits: string[]
	skills: Record<string, Level> // ex: { "diplomacy": 7, "military": 3, "trade": 5 }
	isPlayerControlled: boolean // le joueur actuel incarne ce personnage
	lifeStage: LifeStage
	/** Health 0-10 (decline with age, affected by disease/events) */
	health: Level
}

export interface FamilyLine {
	id: EntityId
	playerId: EntityId | null // null = lignée NPC
	nationId: EntityId
	surname: string
	foundingYear: GameYear
	currentHeadId: EntityId // FamilyMember actuel
	members: FamilyMember[]
	reputation: Level // 0-10 (notoriété de la famille)
	wealth: Level // 0-10
	socialClass: SocialClass // classe sociale actuelle de la famille
}

// ============================================================================
// ÉVÉNEMENTS HISTORIQUES — Milestones, crises, chaînages
// ============================================================================

export type HistoricalEventType =
	| 'milestone'
	| 'crisis'
	| 'opportunity'
	| 'cultural_shift'
	| 'natural_disaster'
	| 'political'

export type HistoricalEventCategory =
	| 'religious'
	| 'military'
	| 'economic'
	| 'diplomatic'
	| 'scientific'
	| 'cultural'
	| 'natural'
	| 'political'
	| 'health'
	| 'exploration'

export type HistoricalEventStatus =
	| 'pending'
	| 'triggered'
	| 'conditions_unmet'
	| 'cancelled'
	| 'modified'
	| 'resolved'

export type EventVisibility = 'public' | 'national' | 'secret'

export interface EventTriggerConditions {
	requiredTechs?: EntityId[]
	requiredEventIds?: EntityId[] // événements qui doivent être résolus avant
	blockedByEventIds?: EntityId[] // si ceux-ci arrivent, celui-ci est compromis
	requiredLeadersAlive?: string[] // noms ou IDs de dirigeants nécessaires
	requiredNationsExist?: EntityId[] // nations qui doivent encore exister
	minStability?: Level
	maxStability?: Level
	minReligiousTension?: Level
	minPopulation?: number
	requiredDiplomacy?: {
		type: DiplomaticRelationType
		between: [EntityId, EntityId]
	}
	customCondition?: string // description textuelle pour le MJ
}

// ----------------------------------------------------------------------------
// Mutations structurelles des nations (portées par les événements)
// ----------------------------------------------------------------------------

/**
 * Décrit une transformation structurelle d'une nation déclenchée par un événement.
 * Permet de modéliser les changements historiques majeurs : renommages, conversions
 * religieuses, changements de régime, déplacements de capitales, dissolutions, etc.
 */
export interface NationMutation {
	nationId: EntityId

	// — Identité —
	rename?: {
		name: string
		dempinym: string
	}

	// — Structure politique —
	changeGovernance?: GovernanceType
	changeCapital?: EntityId // settlementId
	changeRuler?: Ruler

	// — Religion —
	changeStateReligion?: EntityId // religionId (nouvelle religion d'état)
	addReligion?: {
		religionId: EntityId
		percentage: Ratio
		status: Extensible<'state' | 'tolerated' | 'persecuted' | 'minority'>
	}
	removeReligion?: EntityId // religionId à retirer

	// — Langue —
	changeOfficialLanguage?: EntityId // languageId
	addLanguage?: {
		languageId: EntityId
		percentage: Ratio
	}
	removeLanguage?: EntityId // languageId à retirer

	// — Existence —
	dissolve?: boolean // la nation cesse d'exister
	successorId?: EntityId // nation qui hérite du territoire/peuple
	absorbedBy?: EntityId // fusionnée dans une autre nation

	// — Territoire —
	cededTo?: {
		nationId: EntityId
		regionDescription: string // description textuelle des territoires cédés
	}
	gainedFrom?: {
		nationId: EntityId
		regionDescription: string
	}
}

export interface EventEffects {
	stabilityModifier?: number // ex: -2, +1
	prestigeModifier?: number
	populationModifier?: number // pourcentage : -0.1 = -10%
	economicModifier?: number
	militaryModifier?: number
	religiousTensionModifier?: number
	techUnlocks?: EntityId[]
	newDiplomacy?: {
		type: DiplomaticRelationType
		between: [EntityId, EntityId]
		strength: Level
	}
	nationMutations?: NationMutation[] // transformations structurelles des nations
	triggerEventIds?: EntityId[] // déclenche d'autres événements en cascade
	customEffect?: string // description textuelle pour le MJ
}

export interface EventPlayerChoice {
	id: EntityId
	label: string
	description: string
	effects: EventEffects
}

export interface GMOverrideOptions {
	canForce: boolean
	canModify: boolean
	canCancel: boolean
	suggestedAlternative?: string
	fallbackEventId?: EntityId
}

export interface HistoricalEvent {
	id: EntityId
	name: string
	description: string
	type: HistoricalEventType
	category: HistoricalEventCategory

	/** Timing */
	year: GameYear // année cible
	yearRange: [GameYear, GameYear] // fenêtre flexible [min, max]

	/** Portée */
	affectedNationIds: EntityId[]
	affectedRegionIds: EntityId[] // régions climatiques
	globalEvent: boolean

	/** Conditions & chaînage */
	triggerConditions: EventTriggerConditions

	/** Effets */
	effects: EventEffects

	/** Sévérité & visibilité */
	severity: Level // 1-10
	visibility: EventVisibility

	/** Options joueur (si applicable) */
	playerChoices: EventPlayerChoice[]

	/** Override MJ */
	gmOverrideOptions: GMOverrideOptions

	/** Contexte historique */
	historical_outcome: string // ce qui s'est passé IRL

	/** État courant (runtime) */
	status: HistoricalEventStatus
}

// ============================================================================
// MODÈLES D'ÉVÉNEMENTS LOCAUX — Générés procéduralement par le moteur
// ============================================================================

/**
 * Échelle de l'événement : détermine le rayon d'impact.
 * - personal  : un individu, une famille
 * - local     : un village, un quartier
 * - regional  : une province, un duché
 * - national  : un royaume entier
 */
export type EventTemplateScope = 'personal' | 'local' | 'regional' | 'national'

/**
 * Cible sociale — qui est affecté par cet événement.
 * Le moteur filtre les templates selon la classe sociale du joueur.
 */
export type SocialTargetClass =
	| 'peasant'
	| 'artisan'
	| 'merchant'
	| 'clergy'
	| 'minor_noble'
	| 'noble'
	| 'any'

/**
 * Saison — certains événements sont saisonniers.
 */
export type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'any'

/**
 * Conditions locales requises pour qu'un template soit instancié.
 * Le moteur de jeu évalue ces conditions par tuile / région.
 */
export interface LocalTriggerConditions {
	/** Stabilité locale requise (min/max, 1-10) */
	minStability?: Level
	maxStability?: Level
	/** Tension religieuse locale */
	minReligiousTension?: Level
	maxReligiousTension?: Level
	/** Population minimale de la zone */
	minPopulation?: number
	/** Richesse locale (1-10) */
	minWealth?: Level
	maxWealth?: Level
	/** Climat/biome requis (IDs de climateRegion) */
	requiredBiomes?: EntityId[]
	excludedBiomes?: EntityId[]
	/** Proximité d'une route commerciale */
	nearTradeRoute?: boolean
	/** Proximité d'une frontière nationale */
	nearBorder?: boolean
	/** Proximité d'une côte */
	nearCoast?: boolean
	/** Un macro-événement doit être actif ou récent */
	requiredActiveEvents?: EntityId[]
	/** Un ou plusieurs templates doivent avoir déjà été instanciés localement */
	requiredTemplateIds?: EntityId[]
	/** Technologies locales requises */
	requiredTechs?: EntityId[]
	/** Année minimale de jeu pour que ce template soit disponible */
	minYear?: GameYear
	/** Année maximale de jeu au-delà de laquelle ce template n'est plus pertinent */
	maxYear?: GameYear
	/** Saison */
	season?: Season
	/** Condition textuelle pour le MJ */
	customCondition?: string
}

/**
 * Effets locaux d'un événement mineur — même structure que les macro mais
 * valeurs typiquement plus petites (-2 à +2).
 */
export interface LocalEventEffects {
	stabilityModifier?: number
	wealthModifier?: number
	populationModifier?: number
	religiousTensionModifier?: number
	reputationModifier?: number // réputation personnelle du joueur
	healthModifier?: number // santé du joueur/famille
	/** Peut déclencher d'autres templates en cascade */
	triggerTemplateIds?: EntityId[]
	/** Peut déclencher un macro-événement (rare) */
	triggerHistoricalEventIds?: EntityId[]
	customEffect?: string
}

/**
 * Choix offert au joueur face à un événement local.
 */
export interface LocalPlayerChoice {
	id: EntityId
	label: string
	description: string
	effects: LocalEventEffects
	/** Classe sociale minimale pour avoir accès à ce choix */
	requiredSocialClass?: SocialTargetClass
}

/**
 * Template d'événement local — instancié procéduralement par le moteur.
 * Contrairement aux HistoricalEvent (uniques, datés), les templates sont
 * réutilisables et générés dynamiquement selon les conditions locales.
 */
export interface EventTemplate {
	id: EntityId
	name: string
	description: string
	/** Catégorie thématique (réutilise le même enum) */
	category: HistoricalEventCategory
	/** Portée géographique */
	scope: EventTemplateScope
	/** Sévérité 1-5 (mineure par design) */
	severity: Level
	/** Classe(s) sociale(s) ciblée(s) */
	targetClasses: SocialTargetClass[]
	/** Récurrence — peut se déclencher plusieurs fois */
	recurring: boolean
	/** Cooldown minimum entre deux occurrences (en années de jeu) */
	cooldownYears: number
	/** Probabilité de base (0-1) par tick de jeu, modulée par les conditions */
	baseProbability: number
	/** Conditions locales de déclenchement */
	triggerConditions: LocalTriggerConditions
	/** Effets si aucune action joueur */
	defaultEffects: LocalEventEffects
	/** Choix offerts au joueur */
	playerChoices: LocalPlayerChoice[]
	/** Flavor text — variations narratives (le moteur en tire une au hasard) */
	flavorTexts: string[]
	/** Tags pour le filtrage et la recherche */
	tags: string[]
}

// ============================================================================
// SYSTÈME D'INFORMATION & RUMEURS
// ============================================================================

/**
 * Vecteur d'information — le canal par lequel une info circule.
 * Chaque vecteur a ses propres contraintes de portée, vitesse, fiabilité,
 * et peut nécessiter des technologies pour exister.
 */
export type InformationVectorId = Extensible<
	| 'vec_peasant_gossip'
	| 'vec_merchant_news'
	| 'vec_pilgrim_tale'
	| 'vec_military_report'
	| 'vec_church_network'
	| 'vec_royal_herald'
	| 'vec_sailor_rumor'
	| 'vec_spy_report'
	| 'vec_printed_pamphlet'
	| 'vec_newspaper'
	| 'vec_telegraph'
	| 'vec_telephone'
	| 'vec_radio_broadcast'
	| 'vec_television'
	| 'vec_internet'
>

/**
 * Catégorie d'information — quel domaine l'info concerne.
 * Certains vecteurs ne transmettent que certaines catégories.
 */
export type InformationCategory = Extensible<
	| 'military'
	| 'economic'
	| 'political'
	| 'religious'
	| 'scientific'
	| 'natural_disaster'
	| 'epidemic'
	| 'cultural'
	| 'diplomatic'
	| 'exploration'
	| 'trade'
	| 'crime'
	| 'personal'
>

/**
 * Définition d'un vecteur d'information.
 * Décrit les propriétés intrinsèques d'un canal de communication.
 */
export interface InformationVector {
	id: InformationVectorId
	name: string
	description: string
	/** Catégories d'info que ce vecteur peut transmettre */
	categories: InformationCategory[]
	/** Vitesse de propagation en km par jour de jeu */
	propagationSpeed: number
	/** Portée maximale en km (null = illimitée) */
	maxRange: number | null
	/** Fiabilité de base (0 = invention pure, 1 = parfaitement fiable) */
	baseAccuracy: Ratio
	/** Perte de fiabilité par relais (0-1, multiplicateur) */
	decayPerRelay: Ratio
	/** Technologies requises pour que ce vecteur existe */
	requiredTechs: EntityId[]
	/** Année la plus ancienne où ce vecteur peut apparaître */
	minYear: GameYear
	/** Classes sociales qui peuvent recevoir via ce vecteur */
	receiverClasses: SocialTargetClass[]
	/** Classes sociales qui peuvent émettre via ce vecteur */
	emitterClasses: SocialTargetClass[]
	/** Le vecteur nécessite-t-il un accès côtier ? */
	requiresCoast: boolean
	/** Le vecteur nécessite-t-il une route commerciale ? */
	requiresTradeRoute: boolean
	/** Permet la communication directe entre joueurs ? */
	enablesPlayerChat: boolean
	/** Mode de chat débloqué (null si pas de chat) */
	chatMode: 'private' | 'broadcast' | 'global' | null
	/** Délai du chat en tours de jeu (0 = temps réel) */
	chatDelay: number
}

/**
 * Template de rumeur — modèle procédural pour la génération de rumeurs.
 * Le moteur instancie des rumeurs concrètes à partir de ces templates
 * en fonction des événements en cours et des vecteurs disponibles.
 */
export interface RumorTemplate {
	id: EntityId
	name: string
	/** Texte narratif brut (le moteur peut le déformer selon l'accuracy) */
	content: string
	/** Variantes déformées graduelles (de accurate à très déformé) */
	distortions: string[]
	/** Catégorie d'information */
	category: InformationCategory
	/** Vecteurs capables de transmettre cette rumeur */
	compatibleVectors: InformationVectorId[]
	/** Événement historique ou template source (optionnel) */
	sourceEventId?: EntityId
	sourceTemplateId?: EntityId
	/** Sévérité de l'info (1=anecdotique, 5=bouleversante) */
	severity: Level
	/** Année min/max de pertinence */
	minYear: GameYear
	maxYear: GameYear
	/** Tags pour le filtrage */
	tags: string[]
}

/**
 * Instance de rumeur en jeu — créée par le moteur à partir d'un template.
 * Représente une information concrète qui se propage dans le monde.
 */
export interface RumorInstance {
	id: EntityId
	templateId: EntityId
	/** L'événement réel qui a généré cette rumeur (si applicable) */
	sourceEventId?: EntityId
	/** Le vecteur qui transporte cette rumeur */
	vectorId: InformationVectorId
	/** Fiabilité actuelle après propagation (0-1) */
	currentAccuracy: Ratio
	/** Le texte affiché au joueur (potentiellement déformé) */
	displayContent: string
	/** Région d'origine */
	originNationId: EntityId
	originCoord: GeoCoord
	/** Année où la rumeur a été émise */
	emittedYear: GameYear
	/** Nombre de relais traversés */
	relayCount: number
	/** Joueurs/nations qui ont reçu cette rumeur */
	receivedBy: EntityId[]
	/** État */
	expired: boolean
}

// ============================================================================
// IA DE RÉFLEXION — Système de conseil autonome
// ============================================================================

/**
 * Domaine de connaissance du conseiller.
 * Chaque domaine correspond à un champ de savoir réel de l'époque.
 */
export type AdvisorDomain = Extensible<
	| 'agriculture'
	| 'metallurgy'
	| 'construction'
	| 'navigation'
	| 'military'
	| 'medicine'
	| 'theology'
	| 'law'
	| 'trade'
	| 'astronomy'
	| 'alchemy'
	| 'philosophy'
	| 'engineering'
	| 'natural_history'
	| 'geography'
	| 'linguistics'
	| 'politics'
	| 'art'
	| 'textiles'
	| 'cooking'
	| 'husbandry'
>

/**
 * Archétype de conseiller — le "personnage" de l'IA selon la classe sociale.
 * Chaque archétype a ses propres domaines de compétence, son registre
 * de langage, et sa vision du monde.
 */
export interface AdvisorProfile {
	id: EntityId
	name: string
	description: string
	/** Classes sociales du joueur qui ont accès à ce conseiller */
	availableToClasses: SocialTargetClass[]
	/** Domaines de compétence primaires (réponses directes) */
	primaryDomains: AdvisorDomain[]
	/** Domaines secondaires (réponses partielles, type "j'ai entendu dire") */
	secondaryDomains: AdvisorDomain[]
	/** Registre de langage — exemples de tournures typiques */
	speechStyle: string
	/** Année min d'apparition (certains archétypes n'existent pas en 1000) */
	minYear: GameYear
	/** Techs requises pour que ce type de conseiller existe */
	requiredTechs: EntityId[]
	/** Biais culturels/religieux — sujets que ce conseiller refusera ou filtrera */
	culturalFilters: string[]
	/** Phrases d'accroche typiques (le moteur en choisit une) */
	greetings: string[]
	/** Phrases de redirection quand le sujet dépasse ses compétences */
	deflections: string[]
}

/**
 * Niveau de connaissance d'un fait par le conseiller.
 * Détermine comment l'info est présentée au joueur.
 */
export type KnowledgeLevel =
	| 'mastered' // le conseiller le sait et peut l'expliquer en détail
	| 'known' // le conseiller le sait mais de manière superficielle
	| 'rumored' // "j'ai entendu dire que..."
	| 'theoretical' // "les anciens parlent de..." (savoirs antiques redécouverts)
	| 'unknown' // le conseiller ne peut même pas concevoir le concept
	| 'forbidden' // le conseiller connaît mais refuse d'en parler (tabou)

/**
 * Entrée de la base de connaissances — un fait structuré que l'IA peut
 * consulter SANS appel LLM. C'est le cœur du système autonome.
 *
 * Chaque entrée décrit : quoi, quand, où, qui peut le savoir,
 * et surtout les prérequis et les conséquences.
 */
export interface KnowledgeEntry {
	id: EntityId
	/** Domaine principal */
	domain: AdvisorDomain
	/** Titre court (clé de recherche interne) */
	title: string
	/** Explication dans le registre d'un érudit de l'époque */
	description: string
	/** Période de validité : quand ce savoir est "vrai" ou accessible */
	validFrom: GameYear
	validTo: GameYear
	/** Régions culturelles où ce savoir est connu */
	knownInRegions: string[]
	/** Niveau de connaissance selon la région et l'époque */
	knowledgeLevel: KnowledgeLevel
	/** Technologies prérequises pour accéder à ce savoir */
	requiredTechs: EntityId[]
	/** Autres entrées de connaissance prérequises (chaîne de savoirs) */
	prerequisiteKnowledge: EntityId[]
	/** Technologies que ce savoir peut débloquer / vers lesquelles il mène */
	leadsToTechs: EntityId[]
	/** Ressources matérielles liées (matériaux nécessaires pour appliquer) */
	relatedResources: string[]
	/** Tags de recherche (le moteur matche les mots-clés du joueur) */
	keywords: string[]
	/** Réponse pré-formatée si le joueur pose la question directement */
	directAnswer: string
	/** Pistes de redirection vers NPCs ou lieux */
	referrals: AdvisorReferral[]
}

/**
 * Redirection vers un NPC ou un lieu — "va voir untel, il sait".
 */
export interface AdvisorReferral {
	/** Type de la cible */
	type: 'npc_type' | 'location_type' | 'institution' | 'trade_route'
	/** Identifiant générique (pas un NPC précis, mais un archétype) */
	target: string
	/** Ce que la cible sait / peut fournir */
	reason: string
	/** Domaine concerné */
	domain: AdvisorDomain
}

/**
 * Catégorie d'intention du joueur — ce que le moteur détecte
 * quand le joueur pose une question ou propose un projet.
 */
export type PlayerIntentCategory =
	| 'build' // "je veux construire X"
	| 'invent' // "je veux inventer X"
	| 'learn' // "comment fonctionne X ?"
	| 'trade' // "où puis-je trouver X ?"
	| 'explore' // "que sait-on de la région X ?"
	| 'political' // "comment devenir X ?" / "je veux influencer Y"
	| 'military' // "comment attaquer/défendre X ?"
	| 'heal' // "comment soigner X ?"
	| 'farm' // "comment cultiver / élever X ?"
	| 'navigate' // "comment atteindre X par mer ?"
	| 'general' // question libre / conversation

/**
 * Règle de faisabilité — évaluation automatique d'un projet joueur.
 * Le moteur parcourt ces règles AVANT d'appeler un LLM.
 */
export interface FeasibilityRule {
	id: EntityId
	/** Mots-clés qui déclenchent cette règle */
	triggerKeywords: string[]
	/** Intention détectée */
	intentCategory: PlayerIntentCategory
	/** Techs requises pour que le projet soit réalisable */
	requiredTechs: EntityId[]
	/** Ressources matérielles nécessaires */
	requiredResources: string[]
	/** Connaissances prérequises (IDs de KnowledgeEntry) */
	requiredKnowledge: EntityId[]
	/** Réponse si TOUT est disponible (feu vert) */
	responseIfFeasible: string
	/** Réponse si des techs manquent (pistes) */
	responseIfMissingTech: string
	/** Réponse si des ressources manquent (pistes commerciales) */
	responseIfMissingResource: string
	/** Réponse si le concept est inconcevable à cette époque */
	responseIfInconceivable: string
	/** Époque de validité */
	minYear: GameYear
	maxYear: GameYear
	/** Domaine principal */
	domain: AdvisorDomain
}

/**
 * Template de réponse du conseiller — phrase pré-construite que le moteur
 * assemble avec des variables contextuelles. AUCUN token LLM nécessaire.
 *
 * Variables disponibles : {playerName}, {advisorName}, {npcType},
 * {techName}, {resourceName}, {locationName}, {nationName}, {year},
 * {domainName}, {referralTarget}, {referralReason}
 */
export interface AdvisorResponseTemplate {
	id: EntityId
	/** Catégorie de situation */
	situation:
		| 'greeting'
		| 'feasible'
		| 'partially_feasible'
		| 'missing_tech'
		| 'missing_resource'
		| 'inconceivable'
		| 'cultural_barrier'
		| 'referral'
		| 'knowledge_shared'
		| 'rumor_shared'
		| 'unknown_topic'
		| 'encouragement'
		| 'warning'
	/** Domaine (null = générique, applicable partout) */
	domain: AdvisorDomain | null
	/** Archétype de conseiller concerné (null = tous) */
	advisorProfileId: EntityId | null
	/** Le texte de la réponse avec variables {placeholders} */
	template: string
	/** Ton : formel, familier, mystique, pragmatique */
	tone: 'formal' | 'familiar' | 'mystical' | 'pragmatic' | 'scholarly'
	/** Époque de validité du registre de langue */
	minYear: GameYear
	maxYear: GameYear
}

// ============================================================================
// POOLS DE NOMS PAR CULTURE — Génération de NPCs, familles, marchands
// ============================================================================

/**
 * Aire culturelle — regroupe les nations qui partagent un patrimoine
 * onomastique commun. Une nation peut appartenir à une seule aire.
 */
export type CulturalAreaId = Extensible<
	| 'area_western_europe'
	| 'area_germanic'
	| 'area_norse'
	| 'area_slavic'
	| 'area_byzantine'
	| 'area_arabic'
	| 'area_persian'
	| 'area_turkic'
	| 'area_caucasian'
	| 'area_east_african'
	| 'area_west_african'
	| 'area_south_african'
	| 'area_berber'
	| 'area_chinese'
	| 'area_korean'
	| 'area_japanese'
	| 'area_southeast_asian'
	| 'area_indian'
	| 'area_tibetan'
	| 'area_mesoamerican'
	| 'area_andean'
	| 'area_north_american'
	| 'area_amazonian'
	| 'area_polynesian'
	| 'area_papuan'
	| 'area_arctic'
	| 'area_malagasy'
	| 'area_guanche'
>

/**
 * Pool de noms pour une aire culturelle.
 * Le moteur pioche dans ces listes pour générer NPCs, enfants,
 * marchands, conseillers, etc. avec des noms cohérents.
 */
export interface CulturalNamePool {
	id: CulturalAreaId
	/** Nom affiché de l'aire culturelle */
	name: string
	/** Nations rattachées à cette aire */
	nationIds: EntityId[]
	/** Prénoms masculins courants de l'époque */
	maleFirstNames: string[]
	/** Prénoms féminins courants de l'époque */
	femaleFirstNames: string[]
	/** Noms de famille / patronymes / noms claniques */
	surnames: string[]
	/** Titres de noblesse et honorifiques, par classe sociale */
	titles: Array<{
		socialClass: SocialTargetClass
		male: string[]
		female: string[]
	}>
	/** Système de nommage (comment les noms se combinent) */
	namingConvention:
		| 'given_surname' // Jean Dupont
		| 'surname_given' // Song Taizu
		| 'given_patronymic' // Erik Haraldsson
		| 'given_only' // Sitting Bull
		| 'given_clan' // Ahuitzotl de Texcoco
		| 'given_ibn_father' // Ahmad ibn Tulun
		| 'given_tribal' // Kwame du clan Ashanti
	/** Notes sur les particularités onomastiques */
	notes: string
}

// ============================================================================
// WORLD SNAPSHOT — L'objet racine qui rassemble tout
// ============================================================================

export interface WorldSnapshot {
	/** Métadonnées */
	id: EntityId
	name: string
	createdAt: string // ISO date
	forkedFrom: EntityId | null // worldId si fork d'un autre monde
	forkedAtYear: GameYear | null

	/** Année courante dans le jeu */
	currentYear: GameYear // 1000 pour le snapshot initial

	/** Géographie */
	tiles: MapTile[]
	tradeRoutes: TradeRoute[]
	climateRegions: ClimateRegion[]
	ecology: RegionEcology[]

	/** Entités politiques */
	nations: Nation[]
	settlements: Settlement[]

	/** Peuples */
	populations: Population[]
	familyLines: FamilyLine[]

	/** Religion */
	religions: Religion[]
	nationReligions: NationReligion[]

	/** Technologie */
	technologies: Technology[] // l'arbre complet (DAG)
	nationTechnologies: NationTechnology[]

	/** Économie */
	commodities: Commodity[]
	nationEconomies: NationEconomy[]

	/** Langues */
	languages: Language[]
	nationLanguages: NationLanguage[]

	/** Culture */
	nationCultures: NationCulture[]

	/** Santé */
	diseases: Disease[]
	nationHealth: NationHealth[]

	/** Infrastructure */
	infrastructure: Infrastructure[]

	/** Droit */
	nationLaws: NationLaw[]

	/** Éducation */
	nationEducation: NationEducation[]

	/** Militaire */
	nationMilitary: NationMilitary[]

	/** Exploration */
	nationWorldKnowledge: NationWorldKnowledge[]

	/** Vie quotidienne */
	dailyLife: DailyLife[]

	/** Événements historiques */
	historicalEvents: HistoricalEvent[]

	/** Modèles d'événements locaux (procéduraux) */
	eventTemplates: EventTemplate[]

	/** Système d'information & rumeurs */
	informationVectors: InformationVector[]
	rumorTemplates: RumorTemplate[]
	rumorInstances: RumorInstance[]

	/** IA de réflexion — système de conseil autonome */
	advisorProfiles: AdvisorProfile[]
	knowledgeEntries: KnowledgeEntry[]
	feasibilityRules: FeasibilityRule[]
	advisorResponseTemplates: AdvisorResponseTemplate[]

	/** Pools de noms par culture */
	culturalNamePools: CulturalNamePool[]

	/** Recettes de construction (blueprints) */
	constructionRecipes: ConstructionRecipe[]

	/** Mobilité sociale */
	socialMobilityPaths: SocialMobilityPath[]
	socialMobilityModifiers: SocialMobilityModifier[]

	/** Catalogue de véhicules & navires */
	transportVehicles: TransportVehicle[]
}
