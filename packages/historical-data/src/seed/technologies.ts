import type { Technology } from '../../../shared/src/types/world'

// ============================================================================
// Arbre technologique — Toutes les technologies connues en l'an 1000
// ============================================================================
// Chaque tech a des `prerequisites` qui forment le DAG (graphe de dépendances).
// Une nation ne peut débloquer une tech que si elle possède tous ses prérequis.
// Cet arbre est ÉVOLUTIF : les joueurs peuvent inventer de nouvelles techs
// au-delà de ce qui est listé ici, tant que les prérequis logiques sont remplis.
// ============================================================================

export const technologies: Technology[] = [
	// ==========================================================================
	// AGRICULTURE
	// ==========================================================================
	{
		id: 'tech_basic_agriculture',
		name: 'Agriculture de base',
		category: 'agriculture',
		description:
			'Culture de céréales et légumineuses par semis, sarclage et récolte manuelle.',
		prerequisites: [],
		effects: ['Permet la sédentarisation', 'Production alimentaire de base'],
		complexity: 1,
	},
	{
		id: 'tech_irrigation',
		name: 'Irrigation',
		category: 'agriculture',
		description: "Canaux et systèmes de distribution d'eau pour les cultures.",
		prerequisites: ['tech_basic_agriculture'],
		effects: ['+30% rendement agricole', 'Agriculture en zone aride possible'],
		complexity: 3,
	},
	{
		id: 'tech_heavy_plow',
		name: 'Charrue lourde',
		category: 'agriculture',
		description:
			'Charrue à soc de fer tirée par des bœufs, retourne les sols lourds.',
		prerequisites: ['tech_basic_agriculture', 'tech_iron_working'],
		effects: [
			'+40% rendement en sols lourds',
			'Colonisation de nouvelles terres',
		],
		complexity: 4,
	},
	{
		id: 'tech_crop_rotation',
		name: 'Rotation des cultures',
		category: 'agriculture',
		description:
			'Alternance de cultures sur un même champ pour maintenir la fertilité.',
		prerequisites: ['tech_basic_agriculture'],
		effects: ['+25% rendement moyen', 'Réduction épuisement des sols'],
		complexity: 3,
	},
	{
		id: 'tech_animal_husbandry',
		name: 'Élevage',
		category: 'agriculture',
		description:
			"Domestication et élevage d'animaux pour la nourriture, le travail et les matières premières.",
		prerequisites: ['tech_basic_agriculture'],
		effects: [
			'Source de protéines',
			'Force de travail animale',
			'Laine, cuir, os',
		],
		complexity: 2,
	},
	{
		id: 'tech_selective_breeding',
		name: 'Sélection animale',
		category: 'agriculture',
		description:
			"Croisement sélectif pour améliorer les races d'animaux domestiques.",
		prerequisites: ['tech_animal_husbandry'],
		effects: [
			'Animaux plus productifs',
			'Chevaux de guerre améliorés',
			'Meilleurs rendements laitiers',
		],
		complexity: 4,
	},
	{
		id: 'tech_terracing',
		name: 'Culture en terrasses',
		category: 'agriculture',
		description: 'Aménagement de flancs de collines en plateaux cultivables.',
		prerequisites: ['tech_irrigation', 'tech_basic_construction'],
		effects: [
			'Agriculture en montagne',
			"Réduction de l'érosion",
			'+20% terres cultivables',
		],
		complexity: 4,
	},
	{
		id: 'tech_water_mill',
		name: 'Moulin à eau',
		category: 'agriculture',
		description: 'Utilisation de la force hydraulique pour moudre le grain.',
		prerequisites: ['tech_basic_agriculture', 'tech_basic_construction'],
		effects: [
			'Automatisation du broyage',
			'+50% efficacité de transformation du grain',
		],
		complexity: 4,
	},
	{
		id: 'tech_windmill',
		name: 'Moulin à vent',
		category: 'agriculture',
		description: 'Utilisation de la force éolienne pour moudre le grain.',
		prerequisites: ['tech_water_mill'],
		effects: ['Mouture possible sans rivière', 'Applicable en plaine'],
		complexity: 5,
	},

	// ==========================================================================
	// MÉTALLURGIE
	// ==========================================================================
	{
		id: 'tech_copper_working',
		name: 'Travail du cuivre',
		category: 'metallurgy',
		description:
			'Extraction et mise en forme du cuivre par martelage et fonte.',
		prerequisites: [],
		effects: ['Outils en cuivre', 'Objets décoratifs'],
		complexity: 2,
	},
	{
		id: 'tech_bronze_working',
		name: 'Travail du bronze',
		category: 'metallurgy',
		description: "Alliage de cuivre et d'étain pour produire du bronze.",
		prerequisites: ['tech_copper_working'],
		effects: ['Armes et armures en bronze', 'Outils plus résistants'],
		complexity: 3,
	},
	{
		id: 'tech_iron_working',
		name: 'Travail du fer',
		category: 'metallurgy',
		description: 'Extraction et forge du fer à partir de minerai.',
		prerequisites: ['tech_bronze_working'],
		effects: [
			'Outils et armes en fer',
			'Clous et fixations',
			'Charrue métallique',
		],
		complexity: 4,
	},
	{
		id: 'tech_steel_making',
		name: "Fabrication d'acier",
		category: 'metallurgy',
		description:
			"Carburation du fer pour produire de l'acier, plus dur et flexible.",
		prerequisites: ['tech_iron_working'],
		effects: ['Lames supérieures', 'Armures renforcées', 'Outils de précision'],
		complexity: 6,
	},
	{
		id: 'tech_damascus_steel',
		name: 'Acier de Damas',
		category: 'metallurgy',
		description:
			'Technique de forge produisant un acier aux motifs caractéristiques, exceptionnellement tranchant.',
		prerequisites: ['tech_steel_making'],
		effects: [
			'Lames légendaires',
			'Prestige militaire',
			'Bien de luxe commercialisable',
		],
		complexity: 8,
	},
	{
		id: 'tech_gold_silver_working',
		name: 'Orfèvrerie (or et argent)',
		category: 'metallurgy',
		description:
			'Travail fin des métaux précieux pour bijoux, monnaie et objets rituels.',
		prerequisites: ['tech_copper_working'],
		effects: ['Monnaie métallique', 'Objets de prestige', 'Commerce facilité'],
		complexity: 3,
	},

	// ==========================================================================
	// CONSTRUCTION
	// ==========================================================================
	{
		id: 'tech_basic_construction',
		name: 'Construction de base',
		category: 'construction',
		description:
			'Bâtiments en bois, torchis, briques crues. Habitations simples.',
		prerequisites: [],
		effects: ['Habitations permanentes', 'Stockage de nourriture'],
		complexity: 1,
	},
	{
		id: 'tech_stone_masonry',
		name: 'Maçonnerie en pierre',
		category: 'construction',
		description:
			'Taille et assemblage de blocs de pierre pour des bâtiments durables.',
		prerequisites: ['tech_basic_construction', 'tech_iron_working'],
		effects: [
			'Bâtiments en pierre',
			'Fortifications',
			'Monuments',
			'Durabilité accrue',
		],
		complexity: 5,
	},
	{
		id: 'tech_arch_vault',
		name: 'Arc et voûte',
		category: 'construction',
		description:
			'Technique permettant de couvrir de grands espaces avec des arcs en pierre.',
		prerequisites: ['tech_stone_masonry'],
		effects: [
			'Ponts en pierre',
			'Cathédrales',
			'Aqueducs',
			'Bâtiments plus grands',
		],
		complexity: 6,
	},
	{
		id: 'tech_fortification',
		name: 'Fortification',
		category: 'construction',
		description: "Murs d'enceinte, tours, douves et châteaux forts.",
		prerequisites: ['tech_stone_masonry'],
		effects: ['Défense des villes', 'Châteaux forts', 'Contrôle territorial'],
		complexity: 5,
	},
	{
		id: 'tech_aqueduct',
		name: 'Aqueduc',
		category: 'construction',
		description:
			"Canaux surélevés pour transporter l'eau sur de longues distances.",
		prerequisites: ['tech_arch_vault', 'tech_irrigation'],
		effects: [
			'Eau potable en ville',
			'Hygiène améliorée',
			'Croissance urbaine possible',
		],
		complexity: 7,
	},
	{
		id: 'tech_road_building',
		name: 'Construction routière',
		category: 'construction',
		description:
			'Routes pavées ou damées facilitant le transport et le commerce.',
		prerequisites: ['tech_basic_construction'],
		effects: [
			'Commerce terrestre facilité',
			"Mouvement d'armées rapide",
			'Unification territoriale',
		],
		complexity: 4,
	},
	{
		id: 'tech_bridge_building',
		name: 'Construction de ponts',
		category: 'construction',
		description:
			'Ponts en bois ou en pierre pour traverser rivières et ravins.',
		prerequisites: ['tech_road_building', 'tech_basic_construction'],
		effects: [
			'Traversée de rivières',
			'Routes commerciales étendues',
			'Avantage militaire',
		],
		complexity: 5,
	},

	// ==========================================================================
	// NAVIGATION
	// ==========================================================================
	{
		id: 'tech_basic_sailing',
		name: 'Navigation côtière',
		category: 'navigation',
		description:
			'Navigation à vue le long des côtes avec voiles simples et rames.',
		prerequisites: ['tech_basic_construction'],
		effects: ['Pêche en mer', 'Commerce côtier', 'Exploration littorale'],
		complexity: 3,
	},
	{
		id: 'tech_celestial_navigation',
		name: 'Navigation céleste',
		category: 'navigation',
		description: "Utilisation des étoiles pour s'orienter en haute mer.",
		prerequisites: ['tech_basic_sailing', 'tech_basic_astronomy'],
		effects: [
			'Navigation hauturière',
			'Traversées océaniques possibles',
			'Commerce longue distance',
		],
		complexity: 5,
	},
	{
		id: 'tech_lateen_sail',
		name: 'Voile latine',
		category: 'navigation',
		description: 'Voile triangulaire permettant de remonter le vent.',
		prerequisites: ['tech_basic_sailing'],
		effects: [
			'Navigation contre le vent',
			'Manœuvrabilité accrue',
			'Commerce maritime étendu',
		],
		complexity: 5,
	},
	{
		id: 'tech_longship',
		name: 'Drakkar / Longship',
		category: 'navigation',
		description:
			'Navire long et étroit pouvant naviguer en mer comme en rivière.',
		prerequisites: ['tech_basic_sailing', 'tech_iron_working'],
		effects: [
			'Navigation fluviale et maritime',
			'Raids côtiers',
			'Exploration transatlantique',
		],
		complexity: 6,
	},
	{
		id: 'tech_chinese_junk',
		name: 'Jonque chinoise',
		category: 'navigation',
		description:
			"Navire à voiles lattées avec cloisons étanches et gouvernail d'étambot.",
		prerequisites: ['tech_basic_sailing', 'tech_iron_working'],
		effects: [
			'Navigation hauturière',
			'Grande capacité de cargaison',
			'Cloisons de sécurité',
		],
		complexity: 7,
	},
	{
		id: 'tech_astrolabe',
		name: 'Astrolabe',
		category: 'navigation',
		description:
			'Instrument permettant de mesurer la hauteur des astres et déterminer la latitude.',
		prerequisites: ['tech_celestial_navigation', 'tech_basic_mathematics'],
		effects: [
			'Positionnement précis en mer',
			'Navigation plus sûre',
			'Cartographie améliorée',
		],
		complexity: 7,
	},

	// ==========================================================================
	// MILITAIRE
	// ==========================================================================
	{
		id: 'tech_basic_weapons',
		name: 'Armes de base',
		category: 'military',
		description: 'Lances, arcs, haches, massues en bois et pierre.',
		prerequisites: [],
		effects: ['Capacité de combat', 'Chasse améliorée'],
		complexity: 1,
	},
	{
		id: 'tech_metal_weapons',
		name: 'Armes métalliques',
		category: 'military',
		description: 'Épées, lances et haches en fer ou acier.',
		prerequisites: ['tech_basic_weapons', 'tech_iron_working'],
		effects: [
			'Supériorité au combat',
			'Armes plus durables',
			"Pénétration d'armure",
		],
		complexity: 4,
	},
	{
		id: 'tech_armor',
		name: 'Armure',
		category: 'military',
		description:
			'Protection corporelle en cuir renforcé, maille ou écailles métalliques.',
		prerequisites: ['tech_iron_working'],
		effects: [
			'Protection des guerriers',
			'Réduction des pertes au combat',
			'Cavalerie lourde possible',
		],
		complexity: 5,
	},
	{
		id: 'tech_chainmail',
		name: 'Cotte de mailles',
		category: 'military',
		description: "Armure constituée d'anneaux de fer entrelacés.",
		prerequisites: ['tech_armor', 'tech_steel_making'],
		effects: [
			'Protection supérieure',
			'Flexibilité au combat',
			'Prestige militaire',
		],
		complexity: 6,
	},
	{
		id: 'tech_cavalry',
		name: 'Cavalerie',
		category: 'military',
		description: 'Utilisation du cheval au combat, avec selle et étriers.',
		prerequisites: ['tech_animal_husbandry', 'tech_basic_weapons'],
		effects: [
			'Mobilité au combat',
			'Charge de cavalerie',
			'Reconnaissance rapide',
		],
		complexity: 4,
	},
	{
		id: 'tech_stirrup',
		name: 'Étrier',
		category: 'military',
		description:
			"Support pour les pieds du cavalier, stabilisant l'assise en combat.",
		prerequisites: ['tech_cavalry'],
		effects: [
			'Cavalerie lourde possible',
			"Combat à l'épée à cheval",
			'Charge de lance couchée',
		],
		complexity: 3,
	},
	{
		id: 'tech_siege_warfare',
		name: 'Guerre de siège',
		category: 'military',
		description:
			"Béliers, tours de siège, catapultes et techniques d'encerclement.",
		prerequisites: ['tech_fortification', 'tech_basic_construction'],
		effects: [
			'Prise de villes fortifiées',
			'Bélier',
			'Catapulte',
			'Échelles de siège',
		],
		complexity: 6,
	},
	{
		id: 'tech_trebuchet',
		name: 'Trébuchet',
		category: 'military',
		description:
			'Engin de siège à contrepoids capablede lancer de lourds projectiles.',
		prerequisites: ['tech_siege_warfare', 'tech_basic_mathematics'],
		effects: [
			'Destruction de murailles',
			'Portée supérieure aux catapultes',
			'Siège efficace',
		],
		complexity: 7,
	},
	{
		id: 'tech_crossbow',
		name: 'Arbalète',
		category: 'military',
		description:
			"Arme à projectile mécanisée, plus puissante que l'arc traditionnel.",
		prerequisites: ['tech_basic_weapons', 'tech_iron_working'],
		effects: [
			"Pénétration d'armure",
			'Formation rapide des soldats',
			'Défense efficace',
		],
		complexity: 5,
	},
	{
		id: 'tech_composite_bow',
		name: 'Arc composite',
		category: 'military',
		description:
			'Arc multicouche (bois, corne, tendon) puissant et compact, idéal à cheval.',
		prerequisites: ['tech_basic_weapons', 'tech_animal_husbandry'],
		effects: [
			'Tir monté efficace',
			'Portée supérieure',
			'Arme des cavaliers des steppes',
		],
		complexity: 5,
	},
	{
		id: 'tech_gunpowder',
		name: 'Poudre à canon',
		category: 'military',
		description:
			"Mélange explosif de salpêtre, soufre et charbon. Connu en Chine vers l'an 1000.",
		prerequisites: ['tech_basic_alchemy'],
		effects: [
			"Feux d'artifice",
			'Armes incendiaires',
			'Prérequis aux armes à feu',
		],
		complexity: 7,
	},
	{
		id: 'tech_greek_fire',
		name: 'Feu grégeois',
		category: 'military',
		description:
			"Arme incendiaire navale utilisée par l'Empire byzantin. Composition secrète.",
		prerequisites: ['tech_basic_alchemy', 'tech_basic_sailing'],
		effects: [
			'Domination navale',
			'Arme incendiaire dévatatrice',
			'Terreur psychologique',
		],
		complexity: 8,
	},

	// ==========================================================================
	// MÉDECINE
	// ==========================================================================
	{
		id: 'tech_herbal_medicine',
		name: 'Médecine herbale',
		category: 'medicine',
		description:
			'Utilisation de plantes médicinales pour soigner les maladies courantes.',
		prerequisites: [],
		effects: [
			'Soins de base',
			'Réduction de la mortalité simple',
			'Connaissances botaniques',
		],
		complexity: 2,
	},
	{
		id: 'tech_surgery_basic',
		name: 'Chirurgie de base',
		category: 'medicine',
		description: 'Amputation, cautérisation, soins des blessures de guerre.',
		prerequisites: ['tech_herbal_medicine', 'tech_iron_working'],
		effects: [
			'Soins de blessures graves',
			'Réduction de la mortalité au combat',
		],
		complexity: 5,
	},
	{
		id: 'tech_islamic_medicine',
		name: "Médecine islamique (Canon d'Avicenne)",
		category: 'medicine',
		description:
			'Approche systématique de la médecine, compilation des savoirs grecs, persans et indiens.',
		prerequisites: ['tech_herbal_medicine', 'tech_basic_writing'],
		effects: [
			'Pharmacologie avancée',
			'Hôpitaux',
			'Diagnostics améliorés',
			'Enseignement médical',
		],
		complexity: 7,
	},
	{
		id: 'tech_chinese_medicine',
		name: 'Médecine traditionnelle chinoise',
		category: 'medicine',
		description:
			'Acupuncture, moxibustion, pharmacopée complexe, théorie du qi.',
		prerequisites: ['tech_herbal_medicine'],
		effects: [
			'Soins chroniques',
			'Pharmacopée étendue',
			'Prévention des maladies',
		],
		complexity: 6,
	},
	{
		id: 'tech_quarantine',
		name: 'Quarantaine',
		category: 'medicine',
		description:
			'Isolement des malades pour prévenir la propagation des épidémies.',
		prerequisites: ['tech_herbal_medicine'],
		effects: [
			'Réduction de propagation des épidémies',
			'Protection des villes',
		],
		complexity: 4,
	},

	// ==========================================================================
	// ÉCRITURE & COMMUNICATION
	// ==========================================================================
	{
		id: 'tech_basic_writing',
		name: 'Écriture',
		category: 'writing',
		description: "Système de signes permettant d'enregistrer la langue parlée.",
		prerequisites: [],
		effects: [
			'Administration',
			'Lois écrites',
			'Commerce documenté',
			'Transmission du savoir',
		],
		complexity: 3,
	},
	{
		id: 'tech_paper_making',
		name: 'Fabrication du papier',
		category: 'writing',
		description:
			'Production de papier à partir de fibres végétales. Inventé en Chine.',
		prerequisites: ['tech_basic_writing'],
		effects: [
			"Support d'écriture bon marché",
			'Diffusion du savoir',
			'Administration étendue',
		],
		complexity: 5,
	},
	{
		id: 'tech_block_printing',
		name: 'Impression par blocs de bois',
		category: 'writing',
		description:
			'Gravure de textes sur blocs de bois pour reproduction. Utilisée en Chine.',
		prerequisites: ['tech_paper_making'],
		effects: [
			'Reproduction de textes',
			'Diffusion de livres',
			'Éducation élargie',
		],
		complexity: 6,
	},
	{
		id: 'tech_ink_production',
		name: "Production d'encre",
		category: 'writing',
		description: "Fabrication d'encre durable pour l'écriture et l'impression.",
		prerequisites: ['tech_basic_writing'],
		effects: [
			'Documents durables',
			'Calligraphie',
			'Illustration de manuscrits',
		],
		complexity: 3,
	},

	// ==========================================================================
	// ASTRONOMIE
	// ==========================================================================
	{
		id: 'tech_basic_astronomy',
		name: "Astronomie d'observation",
		category: 'astronomy',
		description:
			'Observation des étoiles, du soleil et de la lune pour marquer le temps.',
		prerequisites: [],
		effects: ['Calendrier', 'Navigation nocturne', 'Prédictions saisonnières'],
		complexity: 2,
	},
	{
		id: 'tech_calendar',
		name: 'Calendrier',
		category: 'astronomy',
		description:
			'Système de comptage du temps basé sur les cycles astronomiques.',
		prerequisites: ['tech_basic_astronomy'],
		effects: [
			'Planification agricole',
			'Fêtes religieuses',
			'Administration du temps',
		],
		complexity: 3,
	},
	{
		id: 'tech_advanced_astronomy',
		name: 'Astronomie avancée',
		category: 'astronomy',
		description: "Modèles planétaires, prédiction d'éclipses, observatoires.",
		prerequisites: ['tech_basic_astronomy', 'tech_basic_mathematics'],
		effects: [
			"Prédiction d'éclipses",
			'Navigation précise',
			'Prestige intellectuel',
		],
		complexity: 7,
	},

	// ==========================================================================
	// MATHÉMATIQUES
	// ==========================================================================
	{
		id: 'tech_basic_mathematics',
		name: 'Mathématiques de base',
		category: 'mathematics',
		description: 'Arithmétique, géométrie simple, comptage.',
		prerequisites: [],
		effects: [
			'Commerce facilité',
			'Construction mesurée',
			'Administration fiscale',
		],
		complexity: 2,
	},
	{
		id: 'tech_algebra',
		name: 'Algèbre',
		category: 'mathematics',
		description:
			"Résolution d'équations, travaux d'Al-Khwarizmi. Monde islamique.",
		prerequisites: ['tech_basic_mathematics', 'tech_basic_writing'],
		effects: ['Ingénierie avancée', 'Commerce complexe', 'Sciences naturelles'],
		complexity: 7,
	},
	{
		id: 'tech_zero_decimal',
		name: 'Zéro et système décimal',
		category: 'mathematics',
		description:
			'Le concept du zéro et le système positionnel décimal. Inventé en Inde.',
		prerequisites: ['tech_basic_mathematics'],
		effects: [
			'Calculs complexes possibles',
			'Comptabilité avancée',
			'Base des mathématiques futures',
		],
		complexity: 6,
	},

	// ==========================================================================
	// ARTISANAT
	// ==========================================================================
	{
		id: 'tech_pottery',
		name: 'Poterie',
		category: 'craftsmanship',
		description:
			"Façonnage et cuisson d'argile pour créer récipients et conteneurs.",
		prerequisites: [],
		effects: [
			'Stockage de nourriture',
			'Transport de liquides',
			'Art décoratif',
		],
		complexity: 1,
	},
	{
		id: 'tech_weaving',
		name: 'Tissage',
		category: 'craftsmanship',
		description:
			'Fabrication de textiles à partir de fibres (laine, lin, coton, soie).',
		prerequisites: [],
		effects: ['Vêtements', 'Voiles de navire', 'Commerce textile'],
		complexity: 2,
	},
	{
		id: 'tech_silk_production',
		name: 'Sériciculture (production de soie)',
		category: 'craftsmanship',
		description:
			'Élevage de vers à soie et tissage de la soie. Secret chinois longtemps gardé.',
		prerequisites: ['tech_weaving'],
		effects: [
			'Bien de luxe majeur',
			'Commerce international',
			'Prestige culturel',
		],
		complexity: 6,
	},
	{
		id: 'tech_glass_making',
		name: 'Verrerie',
		category: 'craftsmanship',
		description: "Fabrication d'objets en verre soufflé ou moulé.",
		prerequisites: ['tech_pottery'],
		effects: [
			'Récipients transparents',
			'Bijoux',
			'Vitraux (futur)',
			'Optique (futur)',
		],
		complexity: 5,
	},
	{
		id: 'tech_porcelain',
		name: 'Porcelaine',
		category: 'craftsmanship',
		description:
			'Céramique fine cuite à haute température. Invention chinoise.',
		prerequisites: ['tech_pottery'],
		effects: ['Bien de luxe', 'Exportation majeure', 'Prestige culturel'],
		complexity: 7,
	},
	{
		id: 'tech_leather_working',
		name: 'Travail du cuir',
		category: 'craftsmanship',
		description:
			'Tannage et façonnage du cuir pour vêtements, armures et conteneurs.',
		prerequisites: ['tech_animal_husbandry'],
		effects: ['Armure légère', 'Sacs et conteneurs', 'Selles', 'Chaussures'],
		complexity: 2,
	},

	// ==========================================================================
	// GOUVERNANCE
	// ==========================================================================
	{
		id: 'tech_tribal_governance',
		name: 'Gouvernance tribale',
		category: 'governance',
		description:
			"Organisation sociale autour d'un chef et d'un conseil d'anciens.",
		prerequisites: [],
		effects: [
			'Organisation sociale de base',
			'Résolution de conflits internes',
		],
		complexity: 1,
	},
	{
		id: 'tech_feudalism',
		name: 'Féodalisme',
		category: 'governance',
		description:
			'Système hiérarchique de suzeraineté et de vassalité avec échange de terres contre loyauté.',
		prerequisites: ['tech_tribal_governance', 'tech_basic_writing'],
		effects: [
			'Contrôle territorial structuré',
			'Armée féodale',
			'Hiérarchie sociale claire',
		],
		complexity: 5,
	},
	{
		id: 'tech_bureaucracy',
		name: 'Bureaucratie',
		category: 'governance',
		description: 'Administration centralisée avec fonctionnaires et archives.',
		prerequisites: ['tech_basic_writing'],
		effects: [
			"Collecte d'impôts efficace",
			'Lois uniformes',
			"Gouvernance d'un grand territoire",
		],
		complexity: 6,
	},
	{
		id: 'tech_civil_examination',
		name: 'Examens impériaux',
		category: 'governance',
		description: 'Recrutement des fonctionnaires par examen. Système chinois.',
		prerequisites: ['tech_bureaucracy'],
		effects: ['Méritocratie', 'Fonctionnaires compétents', 'Mobilité sociale'],
		complexity: 7,
	},
	{
		id: 'tech_codified_law',
		name: 'Droit codifié',
		category: 'governance',
		description: 'Rédaction et compilation des lois en un code écrit.',
		prerequisites: ['tech_basic_writing', 'tech_tribal_governance'],
		effects: [
			'Justice plus uniforme',
			'Droits de propriété',
			'Stabilité politique',
		],
		complexity: 5,
	},
	{
		id: 'tech_census',
		name: 'Recensement',
		category: 'governance',
		description: 'Comptage systématique de la population et des ressources.',
		prerequisites: ['tech_bureaucracy', 'tech_basic_mathematics'],
		effects: [
			'Impôts précis',
			'Planification militaire',
			'Connaissance du territoire',
		],
		complexity: 5,
	},
	{
		id: 'tech_coinage',
		name: 'Frappe de monnaie',
		category: 'governance',
		description: "Production de pièces de monnaie standardisées par l'État.",
		prerequisites: ['tech_gold_silver_working', 'tech_bureaucracy'],
		effects: ['Commerce facilité', 'Contrôle monétaire', "Prestige de l'État"],
		complexity: 5,
	},

	// ==========================================================================
	// COMMERCE
	// ==========================================================================
	{
		id: 'tech_basic_trade',
		name: 'Commerce de base (troc)',
		category: 'trade',
		description: 'Échange de biens entre communautés par troc.',
		prerequisites: [],
		effects: ['Accès à des ressources distantes', 'Spécialisation économique'],
		complexity: 1,
	},
	{
		id: 'tech_caravanserai',
		name: 'Caravansérail',
		category: 'trade',
		description:
			'Auberges fortifiées le long des routes commerciales pour les caravanes.',
		prerequisites: ['tech_basic_trade', 'tech_basic_construction'],
		effects: [
			'Routes commerciales sécurisées',
			'Commerce longue distance terrestre',
			'Échange culturel',
		],
		complexity: 4,
	},
	{
		id: 'tech_banking_basic',
		name: 'Banque primitive',
		category: 'trade',
		description: 'Changeurs, prêteurs, lettres de change simples.',
		prerequisites: ['tech_basic_trade', 'tech_basic_writing', 'tech_coinage'],
		effects: ['Crédit', "Commerce sans transport d'espèces", 'Investissement'],
		complexity: 6,
	},
	{
		id: 'tech_guilds',
		name: 'Guildes et corporations',
		category: 'trade',
		description: 'Associations de marchands ou artisans régulant leur métier.',
		prerequisites: ['tech_basic_trade', 'tech_codified_law'],
		effects: [
			'Standards de qualité',
			'Protection des artisans',
			"Formation d'apprentis",
		],
		complexity: 5,
	},

	// ==========================================================================
	// PHILOSOPHIE & SCIENCE NATURELLE
	// ==========================================================================
	{
		id: 'tech_basic_philosophy',
		name: 'Philosophie et pensée critique',
		category: 'philosophy',
		description:
			"Questionnement rationnel sur la nature, l'éthique et la connaissance.",
		prerequisites: ['tech_basic_writing'],
		effects: [
			'Fondement de la science',
			'Débat éthique',
			'Enseignement structuré',
		],
		complexity: 4,
	},
	{
		id: 'tech_basic_alchemy',
		name: 'Alchimie',
		category: 'philosophy',
		description:
			'Recherche sur la transformation des substances. Précurseur de la chimie.',
		prerequisites: ['tech_basic_philosophy'],
		effects: [
			'Découverte de substances',
			'Poudre à canon possible',
			'Pharmacologie',
			'Métallurgie améliorée',
		],
		complexity: 5,
	},
	{
		id: 'tech_natural_philosophy',
		name: 'Philosophie naturelle',
		category: 'philosophy',
		description:
			"Étude systématique de la nature par l'observation et le raisonnement.",
		prerequisites: ['tech_basic_philosophy', 'tech_basic_mathematics'],
		effects: [
			'Classification du vivant',
			'Compréhension des phénomènes naturels',
			'Base de la méthode scientifique',
		],
		complexity: 6,
	},
]
