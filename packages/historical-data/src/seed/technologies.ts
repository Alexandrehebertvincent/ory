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

	// ==========================================================================
	// TECHNOLOGIES POST-AN 1000 — INVENTIONS & DÉCOUVERTES
	// ==========================================================================
	// Ces technologies sont DÉBLOQUÉES progressivement par les événements
	// historiques et la recherche des nations. Elles ne sont PAS disponibles
	// au démarrage (sauf pour les nations ayant l'avance historique).
	// ==========================================================================

	// --------------------------------------------------------------------------
	// XIe–XIIe SIÈCLE — Perfectionnements médiévaux
	// --------------------------------------------------------------------------

	{
		id: 'tech_gothic_architecture',
		name: 'Architecture gothique',
		category: 'construction',
		description:
			'Ogives, arcs-boutants et vitraux. Permet de bâtir des cathédrales immenses baignées de lumière.',
		yearAvailable: 1140,
		prerequisites: [
			'tech_arch_vault',
			'tech_stone_masonry',
			'tech_glass_making',
		],
		effects: [
			'Cathédrales monumentales',
			'Prestige religieux et culturel',
			'Vitraux narratifs',
		],
		complexity: 7,
	},
	{
		id: 'tech_mechanical_clock',
		name: 'Horloge mécanique',
		category: 'craftsmanship',
		description:
			"Mécanisme à échappement mesurant le temps régulièrement. Révolutionne l'organisation du travail.",
		yearAvailable: 1280,
		prerequisites: ['tech_iron_working', 'tech_basic_mathematics'],
		effects: [
			'Mesure précise du temps',
			'Horloges de clocher',
			'Régulation du travail',
		],
		complexity: 7,
	},
	{
		id: 'tech_compass',
		name: 'Boussole magnétique',
		category: 'navigation',
		description:
			'Aiguille aimantée indiquant le nord. Utilisée en Chine puis diffusée en Europe via le monde arabe.',
		prerequisites: ['tech_basic_sailing', 'tech_iron_working'],
		effects: [
			'Navigation par temps couvert',
			'Traversées hivernales possibles',
			'Exploration hauturière fiable',
		],
		complexity: 5,
	},
	{
		id: 'tech_university',
		name: 'Université',
		category: 'philosophy',
		description:
			"Institution d'enseignement supérieur avec cursus, diplômes et corporation de maîtres. Bologne (1088), Paris (1150), Oxford (1167).",
		yearAvailable: 1088,
		prerequisites: [
			'tech_basic_philosophy',
			'tech_basic_writing',
			'tech_codified_law',
		],
		effects: [
			'Formation de lettrés',
			'Recherche systématique',
			'Diffusion du savoir',
			'Droit et théologie formalisés',
		],
		complexity: 7,
	},
	{
		id: 'tech_horse_collar',
		name: 'Collier de cheval',
		category: 'agriculture',
		description:
			"Harnais rigide permettant au cheval de tirer sans s'étrangler. Remplace le joug de bœuf.",
		prerequisites: ['tech_animal_husbandry', 'tech_leather_working'],
		effects: [
			'+50% force de traction',
			'Labourage rapide',
			'Transport lourd sur route',
		],
		complexity: 3,
	},
	{
		id: 'tech_three_field_system',
		name: 'Assolement triennal',
		category: 'agriculture',
		description:
			"Rotation sur trois champs : céréales d'hiver, céréales de printemps, jachère. Plus productif que le biennal.",
		prerequisites: ['tech_crop_rotation', 'tech_heavy_plow'],
		effects: [
			'+33% de terres cultivées chaque année',
			'Diversification des cultures',
			'Réduction des famines',
		],
		complexity: 4,
	},
	{
		id: 'tech_stained_glass',
		name: 'Vitrail',
		category: 'craftsmanship',
		description:
			'Assemblage de verres colorés dans du plomb pour créer des fenêtres narratives et décoratives.',
		prerequisites: ['tech_glass_making', 'tech_gothic_architecture'],
		effects: [
			'Art religieux majeur',
			'Instruction visuelle des illettrés',
			'Prestige culturel',
		],
		complexity: 6,
	},

	// --------------------------------------------------------------------------
	// XIIIe–XIVe SIÈCLE — Diffusion du savoir, prémices de la poudre
	// --------------------------------------------------------------------------

	{
		id: 'tech_eyeglasses',
		name: 'Lunettes',
		category: 'craftsmanship',
		description:
			'Lentilles convergentes taillées dans du verre, montées sur un support nasal. Inventées en Italie vers 1290.',
		prerequisites: ['tech_glass_making'],
		effects: [
			'Prolongation de la vie active des lettrés',
			'Prérequis de la lunette astronomique',
			'Commerce optique',
		],
		complexity: 5,
	},
	{
		id: 'tech_gunpowder_weapons',
		name: 'Armes à poudre primitives',
		category: 'military',
		description:
			'Canons rudimentaires (bombardes) et lances à feu. Diffusion de la poudre à canon en arme de guerre.',
		prerequisites: ['tech_gunpowder', 'tech_iron_working'],
		effects: [
			'Bombardes de siège',
			'Supériorité contre les fortifications',
			'Fin de la chevalerie lourde (à terme)',
		],
		complexity: 7,
	},
	{
		id: 'tech_plate_armor',
		name: 'Armure de plates',
		category: 'military',
		description:
			"Armure articulée en plaques d'acier couvrant tout le corps. Apogée de l'armure médiévale.",
		prerequisites: ['tech_chainmail', 'tech_steel_making'],
		effects: [
			'Protection maximale',
			'Cavalerie lourde redoutable',
			'Très coûteuse',
		],
		complexity: 8,
	},
	{
		id: 'tech_double_entry_bookkeeping',
		name: 'Comptabilité en partie double',
		category: 'trade',
		description:
			'Système comptable où chaque transaction est enregistrée deux fois (débit/crédit). Inventé en Italie.',
		prerequisites: ['tech_banking_basic', 'tech_basic_mathematics'],
		effects: [
			'Gestion financière fiable',
			'Détection de fraude',
			'Essor du capitalisme marchand',
		],
		complexity: 6,
	},
	{
		id: 'tech_magnetic_declination',
		name: 'Déclinaison magnétique',
		category: 'navigation',
		description:
			"Compréhension de l'écart entre le nord magnétique et le nord géographique. Améliore la navigation.",
		prerequisites: ['tech_compass', 'tech_basic_mathematics'],
		effects: [
			'Navigation plus précise',
			'Cartographie améliorée',
			'Correction des routes maritimes',
		],
		complexity: 6,
	},
	{
		id: 'tech_blast_furnace',
		name: 'Haut fourneau',
		category: 'metallurgy',
		description:
			'Four à soufflet puissant permettant de fondre le fer en continu. Production de fonte en grande quantité.',
		prerequisites: ['tech_iron_working', 'tech_water_mill'],
		effects: [
			'Production de fonte massive',
			'Acier en quantité',
			'Canons plus gros',
			'Prérequis industriel',
		],
		complexity: 7,
	},

	// --------------------------------------------------------------------------
	// XVe SIÈCLE — Imprimerie, exploration, Renaissance
	// --------------------------------------------------------------------------

	{
		id: 'tech_movable_type',
		name: 'Caractères mobiles (Chine/Corée)',
		category: 'writing',
		description:
			"Caractères individuels réutilisables pour l'impression. Inventé en Chine (1040) puis en Corée (métal, 1234).",
		yearAvailable: 1040,
		prerequisites: ['tech_block_printing'],
		effects: [
			'Impression plus rapide',
			'Moins de gravure par ouvrage',
			'Prérequis de Gutenberg',
		],
		complexity: 7,
	},
	{
		id: 'tech_printing_press',
		name: 'Presse à imprimer de Gutenberg',
		category: 'writing',
		description:
			'Presse mécanique à caractères mobiles métalliques. Révolutionne la diffusion du savoir en Europe (1450).',
		yearAvailable: 1450,
		prerequisites: [
			'tech_movable_type',
			'tech_iron_working',
			'tech_ink_production',
		],
		effects: [
			'Production de masse de livres',
			'Alphabétisation en hausse',
			'Réforme protestante possible',
			'Diffusion scientifique',
		],
		complexity: 8,
	},
	{
		id: 'tech_caravel',
		name: 'Caravelle',
		category: 'navigation',
		description:
			"Navire léger combinant voile latine et voile carrée. Idéal pour l'exploration côtière et hauturière.",
		yearAvailable: 1440,
		prerequisites: [
			'tech_lateen_sail',
			'tech_compass',
			'tech_celestial_navigation',
		],
		effects: [
			'Exploration océanique',
			'Remontée au vent efficace',
			"Découverte de l'Amérique et de la route des Indes",
		],
		complexity: 7,
	},
	{
		id: 'tech_galleon',
		name: 'Galion',
		category: 'navigation',
		description:
			'Grand navire de guerre et de commerce, capable de traversées transocéaniques avec lourde cargaison.',
		prerequisites: ['tech_caravel', 'tech_gunpowder_weapons'],
		effects: [
			'Transport transocéanique massif',
			'Navire de guerre armé de canons',
			'Commerce colonial à grande échelle',
		],
		complexity: 8,
	},
	{
		id: 'tech_perspective_drawing',
		name: 'Perspective linéaire',
		category: 'craftsmanship',
		description:
			'Technique de représentation en trois dimensions sur un plan. Brunelleschi, Alberti (Florence, XVe s.).',
		prerequisites: ['tech_basic_mathematics', 'tech_glass_making'],
		effects: ['Art réaliste', 'Architecture planifiée', 'Cartographie précise'],
		complexity: 6,
	},
	{
		id: 'tech_cartography',
		name: 'Cartographie moderne',
		category: 'navigation',
		description:
			"Cartes à l'échelle avec projections mathématiques. Mercator (1569), portulans améliorés.",
		prerequisites: [
			'tech_compass',
			'tech_basic_mathematics',
			'tech_printing_press',
		],
		effects: [
			'Navigation planifiée',
			'Connaissance des continents',
			'Puissance géostratégique',
		],
		complexity: 7,
	},
	{
		id: 'tech_anatomy',
		name: 'Anatomie moderne',
		category: 'medicine',
		description:
			'Étude du corps humain par la dissection. Vésale, De Humani Corporis Fabrica (1543).',
		prerequisites: ['tech_surgery_basic', 'tech_printing_press'],
		effects: [
			'Connaissance précise du corps',
			'Chirurgie améliorée',
			'Fin des erreurs galéniques',
		],
		complexity: 7,
	},

	// --------------------------------------------------------------------------
	// XVIe SIÈCLE — Révolution copernicienne, armes à feu modernes
	// --------------------------------------------------------------------------

	{
		id: 'tech_heliocentric_model',
		name: 'Modèle héliocentrique',
		category: 'astronomy',
		description:
			'La Terre tourne autour du Soleil. Copernic (1543), confirmé par Galilée et Kepler.',
		yearAvailable: 1543,
		prerequisites: ['tech_advanced_astronomy', 'tech_printing_press'],
		effects: [
			'Révolution scientifique',
			'Conflit avec le clergé',
			'Astronomie mathématique',
		],
		complexity: 8,
	},
	{
		id: 'tech_musket',
		name: 'Mousquet',
		category: 'military',
		description:
			"Arme à feu portative à mèche puis à silex. Remplace progressivement l'arbalète et le arc.",
		prerequisites: ['tech_gunpowder_weapons'],
		effects: [
			'Infanterie meurtrière',
			'Fin de la cavalerie lourde',
			'Formation en ligne',
		],
		complexity: 7,
	},
	{
		id: 'tech_star_fort',
		name: 'Fortification bastionnée (trace italienne)',
		category: 'construction',
		description:
			'Fortifications en étoile à bastions angulaires résistant aux canons. Remplace le château fort.',
		prerequisites: [
			'tech_fortification',
			'tech_gunpowder_weapons',
			'tech_basic_mathematics',
		],
		effects: [
			'Résistance aux bombardements',
			'Défense croisée par flanquement',
			'Sièges longs et coûteux',
		],
		complexity: 8,
	},
	{
		id: 'tech_joint_stock_company',
		name: 'Société par actions',
		category: 'trade',
		description:
			'Regroupement de capitaux de multiples investisseurs dans une entité commerciale. VOC (1602), EIC (1600).',
		prerequisites: ['tech_double_entry_bookkeeping', 'tech_codified_law'],
		effects: [
			'Mobilisation massive de capital',
			'Risque partagé',
			'Naissance du capitalisme moderne',
			'Bourse des valeurs',
		],
		complexity: 8,
	},
	{
		id: 'tech_botanical_garden',
		name: 'Jardin botanique',
		category: 'medicine',
		description:
			"Collection systématique de plantes pour l'étude et la pharmacopée. Padoue (1545), Leyde (1590).",
		prerequisites: ['tech_university', 'tech_herbal_medicine'],
		effects: [
			'Classification des plantes',
			'Pharmacopée enrichie',
			'Acclimatation de plantes exotiques',
		],
		complexity: 6,
	},

	// --------------------------------------------------------------------------
	// XVIIe SIÈCLE — Révolution scientifique, mécanique, optique
	// --------------------------------------------------------------------------

	{
		id: 'tech_telescope',
		name: 'Lunette astronomique / Télescope',
		category: 'astronomy',
		description:
			'Instrument optique grossissant. Galilée observe les lunes de Jupiter (1610). Newton invente le télescope à miroir.',
		prerequisites: ['tech_eyeglasses', 'tech_heliocentric_model'],
		effects: [
			'Observation des planètes',
			"Confirmation de l'héliocentrisme",
			'Découverte de nouveaux corps célestes',
		],
		complexity: 8,
	},
	{
		id: 'tech_microscope',
		name: 'Microscope',
		category: 'medicine',
		description:
			'Instrument optique révélant le monde invisible. Leeuwenhoek observe les premiers micro-organismes (1670s).',
		prerequisites: ['tech_eyeglasses'],
		effects: [
			'Découverte des micro-organismes',
			'Histologie',
			'Base de la microbiologie future',
		],
		complexity: 8,
	},
	{
		id: 'tech_scientific_method',
		name: 'Méthode scientifique',
		category: 'philosophy',
		description:
			'Approche systématique : observation, hypothèse, expérience, vérification. Bacon, Descartes, Galilée.',
		yearAvailable: 1600,
		prerequisites: [
			'tech_natural_philosophy',
			'tech_university',
			'tech_printing_press',
		],
		effects: [
			'Progrès technologique accéléré',
			'Académies des sciences',
			'Reproductibilité des résultats',
		],
		complexity: 8,
	},
	{
		id: 'tech_newtonian_mechanics',
		name: 'Mécanique newtonienne',
		category: 'mathematics',
		description:
			'Lois du mouvement et de la gravitation universelle. Newton, Principia Mathematica (1687).',
		prerequisites: ['tech_scientific_method', 'tech_algebra', 'tech_telescope'],
		effects: [
			'Prédiction des orbites',
			'Ingénierie mécanique',
			'Fondement de la physique classique',
		],
		complexity: 9,
	},
	{
		id: 'tech_calculus',
		name: 'Calcul infinitésimal',
		category: 'mathematics',
		description:
			'Dérivation et intégration. Inventé indépendamment par Newton et Leibniz (1680s).',
		prerequisites: ['tech_algebra', 'tech_scientific_method'],
		effects: [
			'Mathématiques avancées',
			'Modélisation physique',
			'Ingénierie de précision',
		],
		complexity: 9,
	},
	{
		id: 'tech_barometer',
		name: 'Baromètre',
		category: 'philosophy',
		description:
			'Instrument mesurant la pression atmosphérique. Torricelli (1643). Preuve du vide.',
		prerequisites: ['tech_glass_making', 'tech_scientific_method'],
		effects: [
			'Prévision météorologique',
			"Compréhension de l'atmosphère",
			'Navigation améliorée',
		],
		complexity: 7,
	},
	{
		id: 'tech_blood_circulation',
		name: 'Circulation sanguine',
		category: 'medicine',
		description:
			'Le sang circule en circuit fermé, pompé par le cœur. William Harvey (1628).',
		prerequisites: ['tech_anatomy', 'tech_scientific_method'],
		effects: [
			'Compréhension du système circulatoire',
			'Chirurgie améliorée',
			'Fin du recours aux saignées (à terme)',
		],
		complexity: 8,
	},
	{
		id: 'tech_chronometer',
		name: 'Chronomètre de marine',
		category: 'navigation',
		description:
			'Horloge de haute précision résistant au mouvement du navire, permettant de déterminer la longitude. Harrison (1761).',
		prerequisites: ['tech_mechanical_clock', 'tech_newtonian_mechanics'],
		effects: [
			'Détermination de la longitude en mer',
			'Navigation de précision',
			'Fin des naufrages par erreur de position',
		],
		complexity: 9,
	},

	// --------------------------------------------------------------------------
	// XVIIIe SIÈCLE — Lumières, proto-industrie, machine à vapeur
	// --------------------------------------------------------------------------

	{
		id: 'tech_steam_engine',
		name: 'Machine à vapeur',
		category: 'craftsmanship',
		description:
			'Conversion de la chaleur en travail mécanique. Newcomen (1712), Watt (1769).',
		yearAvailable: 1712,
		prerequisites: ['tech_blast_furnace', 'tech_newtonian_mechanics'],
		effects: [
			'Pompage des mines',
			'Force motrice industrielle',
			'Début de la révolution industrielle',
		],
		complexity: 8,
	},
	{
		id: 'tech_spinning_jenny',
		name: 'Machine à filer (Spinning Jenny)',
		category: 'craftsmanship',
		description:
			'Machine multi-broches permettant de filer plusieurs fils simultanément. Hargreaves (1764).',
		prerequisites: ['tech_weaving', 'tech_mechanical_clock'],
		effects: [
			'Production textile multipliée',
			'Début du système usinier',
			'Chômage des fileuses à domicile',
		],
		complexity: 7,
	},
	{
		id: 'tech_vaccination',
		name: 'Vaccination',
		category: 'medicine',
		description:
			'Inoculation préventive contre la variole. Jenner (1796). Première arme contre les épidémies.',
		yearAvailable: 1796,
		prerequisites: ['tech_microscope', 'tech_scientific_method'],
		effects: [
			'Éradication progressive de la variole',
			'Réduction massive de la mortalité infantile',
			'Modèle pour les vaccins futurs',
		],
		complexity: 8,
	},
	{
		id: 'tech_hot_air_balloon',
		name: 'Montgolfière',
		category: 'navigation',
		description:
			"Premier vol humain. Frères Montgolfier (1783). L'homme conquiert les airs.",
		prerequisites: ['tech_scientific_method', 'tech_weaving'],
		effects: [
			'Vol humain',
			'Reconnaissance militaire aérienne',
			'Exploration atmosphérique',
		],
		complexity: 7,
	},
	{
		id: 'tech_lightning_rod',
		name: 'Paratonnerre',
		category: 'philosophy',
		description:
			'Dispositif captant la foudre pour protéger les bâtiments. Benjamin Franklin (1752).',
		prerequisites: ['tech_scientific_method', 'tech_iron_working'],
		effects: [
			'Protection des bâtiments',
			"Compréhension de l'électricité",
			"Prérequis de l'électrotechnique",
		],
		complexity: 7,
	},
	{
		id: 'tech_encyclopedie',
		name: 'Encyclopédie',
		category: 'philosophy',
		description:
			"Compilation systématique de tout le savoir humain. Diderot et d'Alembert (1751-1772).",
		yearAvailable: 1751,
		prerequisites: [
			'tech_printing_press',
			'tech_scientific_method',
			'tech_university',
		],
		effects: [
			'Diffusion massive du savoir',
			'Philosophie des Lumières',
			'Critique du despotisme et de la superstition',
		],
		complexity: 8,
	},
	{
		id: 'tech_modern_chemistry',
		name: 'Chimie moderne',
		category: 'philosophy',
		description:
			'Lavoisier identifie les éléments, réfute le phlogistique (1780s). Naissance de la chimie scientifique.',
		prerequisites: ['tech_basic_alchemy', 'tech_scientific_method'],
		effects: [
			'Identification des éléments',
			'Industrie chimique',
			'Pharmacologie rationnelle',
		],
		complexity: 8,
	},
	{
		id: 'tech_seed_drill',
		name: 'Semoir mécanique',
		category: 'agriculture',
		description:
			'Machine semant les graines en lignes régulières à profondeur contrôlée. Jethro Tull (1701).',
		prerequisites: ['tech_three_field_system', 'tech_iron_working'],
		effects: [
			'+40% rendement des semis',
			'Moins de gaspillage de semences',
			"Début de l'agriculture mécanisée",
		],
		complexity: 6,
	},

	// --------------------------------------------------------------------------
	// XIXe SIÈCLE — Révolution industrielle, électricité, médecine moderne
	// --------------------------------------------------------------------------

	{
		id: 'tech_steam_locomotive',
		name: 'Locomotive à vapeur',
		category: 'construction',
		description:
			'Transport ferroviaire par machine à vapeur sur rails. Stephenson, Rocket (1829).',
		prerequisites: [
			'tech_steam_engine',
			'tech_iron_working',
			'tech_road_building',
		],
		effects: [
			'Transport de masse rapide',
			'Réseau ferroviaire',
			'Unification économique des territoires',
		],
		complexity: 8,
	},
	{
		id: 'tech_telegraph',
		name: 'Télégraphe électrique',
		category: 'writing',
		description:
			'Communication instantanée à distance par impulsions électriques et code Morse (1837).',
		yearAvailable: 1837,
		prerequisites: ['tech_lightning_rod', 'tech_iron_working'],
		effects: [
			'Communication instantanée',
			'Coordination militaire à distance',
			'Marchés financiers connectés',
		],
		complexity: 8,
	},
	{
		id: 'tech_photography',
		name: 'Photographie',
		category: 'craftsmanship',
		description:
			"Capture d'images par réaction chimique à la lumière. Daguerre (1839), Niépce (1826).",
		prerequisites: ['tech_modern_chemistry', 'tech_eyeglasses'],
		effects: [
			'Documentation visuelle',
			'Journalisme illustré',
			'Démocratisation du portrait',
		],
		complexity: 7,
	},
	{
		id: 'tech_germ_theory',
		name: 'Théorie des germes',
		category: 'medicine',
		description:
			'Les maladies sont causées par des micro-organismes. Pasteur, Koch (1860s-1880s).',
		prerequisites: [
			'tech_microscope',
			'tech_modern_chemistry',
			'tech_scientific_method',
		],
		effects: [
			'Antisepsie et asepsie',
			'Pasteurisation',
			'Hygiène hospitalière',
			'Antibiotiques possibles (futur)',
		],
		complexity: 9,
	},
	{
		id: 'tech_antiseptic_surgery',
		name: 'Chirurgie antiseptique',
		category: 'medicine',
		description:
			'Stérilisation des instruments et des plaies. Lister (1867). Chute de la mortalité post-opératoire.',
		prerequisites: ['tech_germ_theory', 'tech_surgery_basic'],
		effects: [
			'Chirurgie sûre',
			'Opérations complexes possibles',
			'Hospitalisation sans condamnation',
		],
		complexity: 8,
	},
	{
		id: 'tech_anesthesia',
		name: 'Anesthésie',
		category: 'medicine',
		description:
			'Suppression de la douleur pendant les opérations. Éther (1846), chloroforme.',
		prerequisites: ['tech_modern_chemistry', 'tech_surgery_basic'],
		effects: [
			'Chirurgie sans douleur',
			'Opérations plus longues et précises',
			'Dentisterie moderne',
		],
		complexity: 7,
	},
	{
		id: 'tech_bessemer_process',
		name: 'Procédé Bessemer',
		category: 'metallurgy',
		description:
			"Production d'acier en masse par soufflage d'air dans la fonte (1856). Acier bon marché.",
		prerequisites: ['tech_blast_furnace', 'tech_modern_chemistry'],
		effects: [
			'Acier en quantité industrielle',
			'Rails, ponts, gratte-ciels',
			'Machines et armement modernes',
		],
		complexity: 8,
	},
	{
		id: 'tech_electricity',
		name: 'Électricité',
		category: 'philosophy',
		description:
			'Production et distribution de courant électrique. Faraday (dynamo, 1831), Edison (réseau, 1882).',
		yearAvailable: 1831,
		prerequisites: [
			'tech_lightning_rod',
			'tech_newtonian_mechanics',
			'tech_modern_chemistry',
		],
		effects: [
			'Éclairage électrique',
			'Moteurs électriques',
			'Seconde révolution industrielle',
		],
		complexity: 9,
	},
	{
		id: 'tech_telephone',
		name: 'Téléphone',
		category: 'writing',
		description:
			'Transmission de la voix humaine par fil électrique. Bell (1876). Communication en temps réel.',
		yearAvailable: 1876,
		prerequisites: ['tech_telegraph', 'tech_electricity'],
		effects: [
			'Communication vocale à distance',
			'Réseau téléphonique',
			'Accélération des affaires',
		],
		complexity: 8,
	},
	{
		id: 'tech_internal_combustion',
		name: 'Moteur à combustion interne',
		category: 'craftsmanship',
		description:
			'Moteur convertissant la combustion de pétrole en mouvement. Otto (1876), Diesel (1893).',
		prerequisites: [
			'tech_steam_engine',
			'tech_modern_chemistry',
			'tech_bessemer_process',
		],
		effects: [
			'Automobile',
			'Transport individuel',
			"Début de l'ère du pétrole",
		],
		complexity: 9,
	},
	{
		id: 'tech_dynamite',
		name: 'Dynamite',
		category: 'military',
		description:
			'Explosif stable à base de nitroglycérine. Nobel (1867). Mine, construction, guerre.',
		prerequisites: ['tech_modern_chemistry', 'tech_gunpowder'],
		effects: ['Excavation massive', 'Tunnels et canaux', 'Arme destructrice'],
		complexity: 7,
	},
	{
		id: 'tech_ironclad',
		name: 'Navire cuirassé',
		category: 'navigation',
		description:
			"Navire de guerre à coque blindée d'acier et propulsion à vapeur. HMS Warrior (1860), Monitor (1862).",
		prerequisites: [
			'tech_steam_engine',
			'tech_bessemer_process',
			'tech_galleon',
		],
		effects: [
			'Domination navale',
			'Fin des navires en bois',
			'Course aux armements navals',
		],
		complexity: 9,
	},
	{
		id: 'tech_fertilizer',
		name: 'Engrais chimiques',
		category: 'agriculture',
		description:
			"Production industrielle d'engrais azotés, phosphatés et potassiques. Liebig, Haber-Bosch (1909).",
		prerequisites: ['tech_modern_chemistry', 'tech_seed_drill'],
		effects: [
			'Rendements agricoles multipliés',
			"Alimentation de milliards d'humains",
			'Pollution des eaux (à terme)',
		],
		complexity: 8,
	},

	// --------------------------------------------------------------------------
	// XXe SIÈCLE — Guerres mondiales, atome, espace, informatique
	// --------------------------------------------------------------------------

	{
		id: 'tech_airplane',
		name: 'Avion',
		category: 'navigation',
		description:
			"Vol motorisé plus lourd que l'air. Frères Wright (1903). Révolutionne guerre et transport.",
		prerequisites: ['tech_internal_combustion', 'tech_hot_air_balloon'],
		effects: ['Transport aérien', 'Bombardement aérien', 'Monde rétréci'],
		complexity: 9,
	},
	{
		id: 'tech_antibiotics',
		name: 'Antibiotiques',
		category: 'medicine',
		description:
			'Substances tuant les bactéries. Pénicilline découverte par Fleming (1928), produite en masse (1943).',
		prerequisites: ['tech_germ_theory', 'tech_modern_chemistry'],
		effects: [
			'Guérison des infections bactériennes',
			'Chute de la mortalité',
			'Résistance bactérienne (futur)',
		],
		complexity: 9,
	},
	{
		id: 'tech_radio',
		name: 'Radio',
		category: 'writing',
		description:
			'Transmission sans fil par ondes électromagnétiques. Marconi (1895), diffusion de masse (1920s).',
		yearAvailable: 1895,
		prerequisites: ['tech_electricity', 'tech_telephone'],
		effects: [
			'Communication de masse',
			'Propagande et information',
			'Coordination militaire sans fil',
		],
		complexity: 8,
	},
	{
		id: 'tech_tank',
		name: 'Char de combat',
		category: 'military',
		description:
			'Véhicule blindé chenillé armé de canons. Première apparition en 1916 (Somme).',
		prerequisites: [
			'tech_internal_combustion',
			'tech_bessemer_process',
			'tech_musket',
		],
		effects: [
			'Rupture des lignes de tranchées',
			'Guerre de mouvement',
			'Arme terrestre décisive',
		],
		complexity: 9,
	},
	{
		id: 'tech_nuclear_fission',
		name: 'Fission nucléaire',
		category: 'philosophy',
		description:
			'Division du noyau atomique libérant une énergie colossale. Hahn, Strassmann (1938). Manhattan Project (1945).',
		prerequisites: ['tech_electricity', 'tech_calculus'],
		effects: [
			'Bombe atomique',
			'Énergie nucléaire civile',
			'Dissuasion nucléaire',
			'Équilibre de la terreur',
		],
		complexity: 10,
	},
	{
		id: 'tech_rocket',
		name: 'Fusée / Missile balistique',
		category: 'military',
		description:
			'Propulsion par réaction. V2 allemand (1944), puis missiles intercontinentaux et lanceurs spatiaux.',
		prerequisites: [
			'tech_dynamite',
			'tech_calculus',
			'tech_internal_combustion',
		],
		effects: [
			'Frappe à longue distance',
			"Accès à l'espace",
			'Satellites possibles',
		],
		complexity: 10,
	},
	{
		id: 'tech_computer',
		name: 'Ordinateur',
		category: 'mathematics',
		description:
			'Machine de calcul programmable. Turing (théorie, 1936), ENIAC (1945), transistors (1947).',
		prerequisites: ['tech_electricity', 'tech_calculus'],
		effects: [
			'Calcul automatisé',
			'Cryptographie',
			'Gestion de données massives',
			"Prérequis de l'informatique moderne",
		],
		complexity: 10,
	},
	{
		id: 'tech_television',
		name: 'Télévision',
		category: 'writing',
		description:
			"Transmission d'images animées à distance. Premières émissions régulières dans les années 1930-1950.",
		yearAvailable: 1930,
		prerequisites: ['tech_radio', 'tech_photography'],
		effects: [
			'Média de masse visuel',
			'Culture globalisée',
			'Publicité de masse',
		],
		complexity: 9,
	},
	{
		id: 'tech_green_revolution',
		name: 'Révolution verte',
		category: 'agriculture',
		description:
			'Variétés à haut rendement, irrigation moderne, mécanisation. Borlaug (1960s). Nourrir des milliards.',
		prerequisites: ['tech_fertilizer', 'tech_internal_combustion'],
		effects: [
			'Production alimentaire multipliée',
			'Fin des grandes famines (dans les pays adoptants)',
			'Dépendance aux intrants chimiques',
		],
		complexity: 9,
	},
	{
		id: 'tech_satellite',
		name: 'Satellite artificiel',
		category: 'astronomy',
		description:
			'Objet en orbite terrestre. Spoutnik (1957). GPS, télécommunications, météo, espionnage.',
		prerequisites: ['tech_rocket', 'tech_computer', 'tech_radio'],
		effects: [
			'Télécommunications mondiales',
			'Observation terrestre',
			'GPS (futur)',
			'Espionnage spatial',
		],
		complexity: 10,
	},
	{
		id: 'tech_dna_discovery',
		name: "Découverte de l'ADN",
		category: 'medicine',
		description:
			"Structure en double hélice de l'ADN. Watson et Crick (1953). Fondement de la génétique moderne.",
		prerequisites: [
			'tech_microscope',
			'tech_modern_chemistry',
			'tech_antibiotics',
		],
		effects: [
			'Génétique moderne',
			'Médecine génomique',
			'Biotechnologies',
			'OGM possibles (futur)',
		],
		complexity: 10,
	},

	// --------------------------------------------------------------------------
	// XXe–XXIe SIÈCLE — Numérique, Internet, IA, énergies
	// --------------------------------------------------------------------------

	{
		id: 'tech_internet',
		name: 'Internet',
		category: 'writing',
		description:
			"Réseau mondial d'ordinateurs interconnectés. ARPANET (1969), World Wide Web (1991).",
		yearAvailable: 1969,
		prerequisites: ['tech_computer', 'tech_telephone', 'tech_satellite'],
		effects: [
			'Communication instantanée mondiale',
			'Économie numérique',
			'Accès universel au savoir',
			'Désinformation massive (revers)',
		],
		complexity: 10,
	},
	{
		id: 'tech_renewable_energy',
		name: 'Énergies renouvelables',
		category: 'craftsmanship',
		description:
			'Éoliennes, panneaux solaires, géothermie. Alternative aux combustibles fossiles.',
		prerequisites: ['tech_electricity', 'tech_computer'],
		effects: [
			'Énergie propre',
			'Réduction des émissions CO2',
			'Indépendance énergétique',
		],
		complexity: 9,
	},
	{
		id: 'tech_artificial_intelligence',
		name: 'Intelligence artificielle',
		category: 'mathematics',
		description:
			"Systèmes capables d'apprentissage et de raisonnement. Deep learning, transformers, LLMs (2010s-2020s).",
		prerequisites: ['tech_computer', 'tech_internet', 'tech_calculus'],
		effects: [
			'Automatisation cognitive',
			'Diagnostic médical assisté',
			"Risque de remplacement d'emplois",
			'Accélération de la recherche',
		],
		complexity: 10,
	},
	{
		id: 'tech_smartphone',
		name: 'Smartphone',
		category: 'writing',
		description:
			"Ordinateur de poche connecté au réseau mondial. iPhone (2007). L'informatique dans chaque main.",
		prerequisites: ['tech_internet', 'tech_computer', 'tech_satellite'],
		effects: [
			"Accès permanent à l'information",
			'Réseaux sociaux',
			'Économie des applications',
			'Surveillance de masse (revers)',
		],
		complexity: 10,
	},
	{
		id: 'tech_crispr',
		name: 'Édition génétique (CRISPR)',
		category: 'medicine',
		description:
			"Outil de modification précise de l'ADN. Doudna, Charpentier (2012). Thérapie génique et au-delà.",
		prerequisites: ['tech_dna_discovery', 'tech_computer'],
		effects: [
			'Thérapie de maladies génétiques',
			"Modification d'organismes",
			'Questions éthiques majeures',
		],
		complexity: 10,
	},
	{
		id: 'tech_space_travel',
		name: 'Voyage spatial habité',
		category: 'navigation',
		description:
			"L'homme dans l'espace et sur la Lune. Gagarine (1961), Apollo 11 (1969).",
		prerequisites: ['tech_rocket', 'tech_computer'],
		effects: [
			'Exploration spatiale',
			'Technologies dérivées (matériaux, miniaturisation)',
			'Station spatiale',
		],
		complexity: 10,
	},
	{
		id: 'tech_3d_printing',
		name: 'Impression 3D',
		category: 'craftsmanship',
		description:
			'Fabrication additive couche par couche. Prototypage rapide, pièces sur mesure.',
		prerequisites: ['tech_computer', 'tech_bessemer_process'],
		effects: [
			'Fabrication décentralisée',
			'Prototypage rapide',
			'Organes artificiels (futur)',
		],
		complexity: 9,
	},
	{
		id: 'tech_basic_surgery',
		name: 'Chirurgie élémentaire',
		category: 'medicine',
		description:
			"Trépanation, cautérisation, amputation et drainage des plaies. Pratiquée depuis l'Antiquité.",
		prerequisites: ['tech_herbal_medicine'],
		effects: [
			'Traitement des fractures ouvertes',
			'Amputation de membres gangrenés',
			'Cautérisation des plaies',
		],
		complexity: 3,
	},
]
