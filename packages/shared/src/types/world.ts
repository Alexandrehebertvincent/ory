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

export interface FamilyMember {
	id: EntityId
	name: string
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
}
