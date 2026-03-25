import type { KnowledgeEntry } from '../../../shared/src/types/world'

// ============================================================================
// BASE DE CONNAISSANCES — Le cœur autonome de l'IA de réflexion
// ============================================================================
// Chaque entrée est un FAIT structuré que le moteur peut consulter sans LLM.
// Les descriptions sont écrites dans le registre d'un érudit de l'époque,
// pas d'un historien moderne. Le joueur reçoit le savoir TEL QU'IL ÉTAIT COMPRIS.
// ============================================================================

export const knowledgeEntries: KnowledgeEntry[] = [
	// ========================================================================
	// AGRICULTURE
	// ========================================================================

	{
		id: 'know_basic_farming',
		domain: 'agriculture',
		title: 'Labour et semailles',
		description:
			"La terre nourricière exige qu'on la retourne avant de lui confier la semence. L'araire gratte le sol ; la charrue lourde, elle, le creuse en profondeur. Avec du fumier et la grâce de Dieu, le grain pousse.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'south_asia',
			'north_africa',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_basic_agriculture'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_heavy_plow', 'tech_crop_rotation'],
		relatedResources: ['grain', 'soil', 'oxen', 'seeds'],
		keywords: [
			'labourer',
			'semer',
			'cultiver',
			'blé',
			'orge',
			'avoine',
			'champ',
			'terre',
			'récolte',
			'labour',
			'araire',
			'charrue',
		],
		directAnswer:
			"Pour cultiver un champ, il faut d'abord labourer la terre avec un araire ou une charrue — la charrue lourde, avec son soc en fer, est bien meilleure dans les sols argileux du Nord. On sème au printemps ou à l'automne selon le grain. Le fumier des bêtes enrichit la terre. Sans jachère, elle s'épuise en deux ou trois saisons.",
		referrals: [
			{
				type: 'npc_type',
				target: 'paysan_ancien',
				reason: 'Connaît les rythmes de la terre mieux que quiconque',
				domain: 'agriculture',
			},
		],
	},

	{
		id: 'know_crop_rotation',
		domain: 'agriculture',
		title: 'Rotation des cultures',
		description:
			"Les anciens savaient qu'un champ cultivé sans relâche se fatigue. En alternant les grains, les légumineuses et la jachère, la terre retrouve sa force. Le système à trois soles change tout.",
		validFrom: 800,
		validTo: 9999,
		knownInRegions: ['europe'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_crop_rotation'],
		prerequisiteKnowledge: ['know_basic_farming'],
		leadsToTechs: ['tech_three_field_system'],
		relatedResources: ['grain', 'legumes', 'soil'],
		keywords: [
			'rotation',
			'jachère',
			'assolement',
			'trois soles',
			'alterner',
			'cultures',
			'épuiser',
			'sol',
			'fertile',
		],
		directAnswer:
			"La rotation est simple : divise tes terres en trois parties. La première reçoit le blé d'hiver, la deuxième les légumineuses ou l'avoine de printemps, la troisième se repose en jachère. Chaque année, on tourne. Les fèves et les pois nourrissent la terre que le blé a épuisée — c'est un fait connu de tout bon fermier.",
		referrals: [
			{
				type: 'npc_type',
				target: 'intendant_domaine',
				reason: 'Gère les assolements de plusieurs domaines',
				domain: 'agriculture',
			},
		],
	},

	{
		id: 'know_irrigation',
		domain: 'agriculture',
		title: 'Irrigation et canaux',
		description:
			"L'eau est la vie du champ. Là où la pluie manque, les hommes ont creusé des canaux depuis l'Antiquité. En Orient, les qanats souterrains portent l'eau sur des lieues sans rien perdre à l'évaporation.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'middle_east',
			'north_africa',
			'east_asia',
			'south_asia',
			'southern_europe',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_irrigation'],
		prerequisiteKnowledge: ['know_basic_farming'],
		leadsToTechs: ['tech_aqueduct'],
		relatedResources: ['water', 'stone', 'clay'],
		keywords: [
			'irrigation',
			'canal',
			'eau',
			'qanat',
			'arroser',
			'sécheresse',
			'aqueduct',
		],
		directAnswer:
			"L'irrigation demande des canaux bien creusés, avec une pente régulière pour que l'eau coule sans stagner. Les Arabes maîtrisent les qanats — des tunnels souterrains qui captent l'eau des montagnes. En Égypte, on laisse le Nil déborder et on cultive dans la boue fertile. En Europe, les moines ont drainé des marais entiers.",
		referrals: [
			{
				type: 'institution',
				target: 'monastère',
				reason: 'Les moines sont experts en drainage et irrigation',
				domain: 'agriculture',
			},
			{
				type: 'npc_type',
				target: 'ingénieur_arabe',
				reason: 'Maîtrise la construction des qanats',
				domain: 'engineering',
			},
		],
	},

	{
		id: 'know_animal_husbandry',
		domain: 'husbandry',
		title: 'Élevage et bétail',
		description:
			"Les bêtes fournissent la viande, le lait, la laine, le cuir et surtout la force de trait. Un bœuf bien nourri vaut plus qu'un serf, dit-on. Les moutons font la richesse de l'Angleterre et de la Castille.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'central_asia',
			'east_asia',
			'south_asia',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_animal_husbandry'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_selective_breeding', 'tech_horse_collar'],
		relatedResources: ['cattle', 'sheep', 'horses', 'hay', 'pasture'],
		keywords: [
			'élevage',
			'bétail',
			'vache',
			'mouton',
			'cheval',
			'bœuf',
			'laine',
			'viande',
			'lait',
			'fromage',
			'pâturage',
		],
		directAnswer:
			"L'élevage est un art patient. Les bœufs tirent la charrue ; les moutons donnent la laine ; les chevaux portent les cavaliers. Il faut des pâturages, du foin pour l'hiver, et un berger qui connaît ses bêtes. La sélection des meilleurs reproducteurs améliore le troupeau sur plusieurs générations.",
		referrals: [
			{
				type: 'npc_type',
				target: 'berger',
				reason: 'Connaît les races et les pâturages',
				domain: 'husbandry',
			},
		],
	},

	{
		id: 'know_water_mill',
		domain: 'engineering',
		title: 'Moulin à eau',
		description:
			"Les Romains connaissaient le moulin à eau, mais c'est notre époque qui en a fait un pilier. La roue tourne avec le courant et entraîne la meule qui écrase le grain. Un seul moulin remplace vingt esclaves.",
		validFrom: 500,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_water_mill'],
		prerequisiteKnowledge: ['know_basic_farming'],
		leadsToTechs: ['tech_windmill'],
		relatedResources: ['wood', 'stone', 'iron', 'grain'],
		keywords: [
			'moulin',
			'eau',
			'roue',
			'meule',
			'grain',
			'farine',
			'moudre',
			"cours d'eau",
			'rivière',
		],
		directAnswer:
			"Un moulin à eau exige un cours d'eau régulier, une roue en bois solide et une meule de pierre bien taillée. La roue peut être en dessous (alimentée par le courant) ou au-dessus (alimentée par un bief). Le seigneur possède le moulin et les paysans payent pour moudre — c'est le droit de banalité.",
		referrals: [
			{
				type: 'npc_type',
				target: 'meunier',
				reason: "Connaît l'entretien des meules et des engrenages",
				domain: 'engineering',
			},
			{
				type: 'npc_type',
				target: 'charpentier',
				reason: 'Construit les roues et la structure du moulin',
				domain: 'construction',
			},
		],
	},

	// ========================================================================
	// MÉTALLURGIE
	// ========================================================================

	{
		id: 'know_iron_smelting',
		domain: 'metallurgy',
		title: 'Fondre le fer',
		description:
			"Le minerai de fer, chauffé au charbon de bois dans un bas fourneau, libère un métal spongieux qu'on martèle pour en chasser les scories. C'est un art ancien, mais toujours vital — sans fer, point d'outils, point d'armes.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'south_asia',
			'sub_saharan_africa',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_iron_working'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_steel_making', 'tech_blast_furnace'],
		relatedResources: ['iron_ore', 'charcoal', 'limestone'],
		keywords: [
			'fer',
			'fondre',
			'forger',
			'minerai',
			'fourneau',
			'forge',
			'charbon',
			'scorie',
			'métal',
			'enclume',
			'marteau',
		],
		directAnswer:
			"Pour fondre le fer, il faut un bas fourneau en argile, du charbon de bois en abondance et du minerai de fer. On alterne les couches de charbon et de minerai, on souffle avec un soufflet, et au bout de plusieurs heures, on obtient une loupe de fer — une masse spongieuse qu'il faut marteler longuement pour la purifier. Le forgeron est l'homme le plus important du village après le prêtre.",
		referrals: [
			{
				type: 'npc_type',
				target: 'forgeron',
				reason: 'Maîtrise la forge et connaît les minerais locaux',
				domain: 'metallurgy',
			},
			{
				type: 'location_type',
				target: 'mine_de_fer',
				reason: 'Source de minerai de fer brut',
				domain: 'metallurgy',
			},
		],
	},

	{
		id: 'know_steel_making',
		domain: 'metallurgy',
		title: "L'acier, roi des métaux",
		description:
			"L'acier est du fer auquel on a ajouté juste ce qu'il faut de carbone. Il est plus dur, plus résistant et garde mieux son tranchant. Mais le dosage est un secret que peu de forgerons maîtrisent.",
		validFrom: 500,
		validTo: 9999,
		knownInRegions: ['middle_east', 'south_asia', 'east_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_steel_making'],
		prerequisiteKnowledge: ['know_iron_smelting'],
		leadsToTechs: ['tech_damascus_steel', 'tech_bessemer_process'],
		relatedResources: ['iron_ore', 'charcoal', 'carbon'],
		keywords: [
			'acier',
			'trempe',
			'carbone',
			'lame',
			'dureté',
			'tranchant',
			'épée',
			'damas',
		],
		directAnswer:
			"L'acier se fabrique en chauffant le fer avec du charbon de bois dans un creuset fermé, pendant des heures. Le carbone du charbon pénètre le fer et le transforme. Puis vient la trempe — plonger la lame rouge dans l'eau froide — qui donne sa dureté. Le secret est dans le dosage : trop de carbone, et le métal casse ; pas assez, et il plie. Les forgerons de Damas et d'Inde sont les maîtres incontestés de cet art.",
		referrals: [
			{
				type: 'npc_type',
				target: 'maître_forgeron',
				reason: 'Seul un maître peut enseigner les secrets de la trempe',
				domain: 'metallurgy',
			},
			{
				type: 'trade_route',
				target: 'route_de_la_soie',
				reason: 'Les aciers indiens arrivent par cette voie',
				domain: 'trade',
			},
		],
	},

	{
		id: 'know_damascus_steel',
		domain: 'metallurgy',
		title: 'Acier de Damas',
		description:
			"Les lames de Damas portent des motifs ondulés qui fascinent l'Occident. On dit qu'elles tranchent un voile de soie en l'air. Le secret viendrait de l'acier wootz d'Inde, retravaillé par les forgerons syriens.",
		validFrom: 800,
		validTo: 1750,
		knownInRegions: ['middle_east', 'south_asia'],
		knowledgeLevel: 'rumored',
		requiredTechs: ['tech_damascus_steel'],
		prerequisiteKnowledge: ['know_steel_making'],
		leadsToTechs: [],
		relatedResources: ['wootz_steel', 'charcoal'],
		keywords: [
			'damas',
			'wootz',
			'lame',
			'motif',
			'onde',
			'sabre',
			'orient',
			'syrie',
			'inde',
			'tranchant',
		],
		directAnswer:
			"L'acier de Damas, c'est un mystère que même nos meilleurs forgerons n'arrivent pas à percer. On dit que les lingots viennent de l'Inde — de l'acier wootz, fondu dans des creusets scellés. Les forgerons de Syrie les reforgent avec un art incomparable, créant ces motifs ondulés dans le métal. Pour en obtenir, il faut commercer avec l'Orient... ou capturer un forgeron qui connaît le secret.",
		referrals: [
			{
				type: 'trade_route',
				target: 'route_de_la_soie',
				reason: "Le wootz arrive d'Inde par les marchands arabes",
				domain: 'trade',
			},
			{
				type: 'npc_type',
				target: 'marchand_arabe',
				reason: 'Peut fournir des lingots de wootz',
				domain: 'trade',
			},
		],
	},

	{
		id: 'know_blast_furnace',
		domain: 'metallurgy',
		title: 'Le haut fourneau',
		description:
			'Un fourneau plus grand, plus chaud, alimenté par des soufflets puissants. Au lieu de fer spongieux, il produit de la fonte — du fer liquide ! Inconnu en Occident avant le XIVe siècle, mais les Chinois le pratiquent depuis longtemps.',
		validFrom: 1200,
		validTo: 9999,
		knownInRegions: ['east_asia'],
		knowledgeLevel: 'rumored',
		requiredTechs: ['tech_blast_furnace'],
		prerequisiteKnowledge: ['know_iron_smelting'],
		leadsToTechs: ['tech_bessemer_process'],
		relatedResources: ['iron_ore', 'charcoal', 'limestone', 'clay'],
		keywords: [
			'haut fourneau',
			'fonte',
			'liquide',
			'soufflet',
			'couler',
			'moulage',
			'fer liquide',
		],
		directAnswer:
			"On raconte que dans l'Empire du Milieu, les forgerons construisent des fourneaux si grands et si chauds que le fer y fond comme de l'eau. Ce fer liquide, la fonte, peut être coulé dans des moules — une chose incroyable pour nous qui martelons encore des loupes. Le secret tient dans la taille du fourneau, la puissance du soufflet et l'ajout de calcite. Il faudrait un maître bâtisseur et un forgeron audacieux pour tenter l'expérience chez nous.",
		referrals: [
			{
				type: 'npc_type',
				target: 'voyageur_orient',
				reason: 'A vu les hauts fourneaux chinois',
				domain: 'metallurgy',
			},
			{
				type: 'npc_type',
				target: 'maître_forgeron',
				reason: 'Pourrait adapter la technique si on lui explique',
				domain: 'metallurgy',
			},
		],
	},

	// ========================================================================
	// CONSTRUCTION
	// ========================================================================

	{
		id: 'know_stone_masonry',
		domain: 'construction',
		title: 'Maçonnerie de pierre',
		description:
			"Tailler la pierre, la poser avec du mortier, élever des murs qui tiennent des siècles — c'est l'art des maçons. Les Romains excellaient ; nous redécouvrons leurs secrets dans les cathédrales.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'north_africa', 'south_asia'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_stone_masonry'],
		prerequisiteKnowledge: [],
		leadsToTechs: [
			'tech_arch_vault',
			'tech_fortification',
			'tech_gothic_architecture',
		],
		relatedResources: ['stone', 'limestone', 'sand', 'water'],
		keywords: [
			'pierre',
			'construire',
			'mur',
			'mortier',
			'maçon',
			'bâtir',
			'taille',
			'carrière',
		],
		directAnswer:
			"La maçonnerie exige trois choses : une bonne pierre (calcaire, grès ou granit selon la région), du mortier (chaux et sable mélangés) et des maçons habiles. On extrait la pierre en carrière, on la taille avec des ciseaux et des maillets, on la pose assise après assise. Le secret des murs qui durent, c'est la fondation — creuse profond et pose large.",
		referrals: [
			{
				type: 'npc_type',
				target: 'maître_maçon',
				reason: 'Dirige les chantiers et connaît les techniques de taille',
				domain: 'construction',
			},
			{
				type: 'location_type',
				target: 'carrière',
				reason: 'Source de pierre de construction',
				domain: 'construction',
			},
		],
	},

	{
		id: 'know_arch_vault',
		domain: 'construction',
		title: "L'arc et la voûte",
		description:
			"L'arc est le triomphe de la pierre sur le vide. Chaque pierre pousse contre ses voisines et aucune ne tombe. La voûte, c'est un arc prolongé — elle couvre des salles entières. Les Romains en étaient maîtres.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'north_africa'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_arch_vault'],
		prerequisiteKnowledge: ['know_stone_masonry'],
		leadsToTechs: ['tech_gothic_architecture'],
		relatedResources: ['stone', 'wood_centering'],
		keywords: [
			'arc',
			'voûte',
			'cintre',
			'clé de voûte',
			'poussée',
			'roman',
			'plein cintre',
			'ogive',
		],
		directAnswer:
			"L'arc repose sur un principe d'équilibre : les pierres en forme de coins (les claveaux) se soutiennent mutuellement, et la clé de voûte au sommet les verrouille toutes. On construit sur un cintre en bois qu'on retire une fois l'arc fermé. La voûte en berceau est la plus simple ; la croisée d'ogives, qu'on voit dans les nouvelles cathédrales, permet de monter plus haut et d'ouvrir de grandes fenêtres.",
		referrals: [
			{
				type: 'npc_type',
				target: 'maître_maçon',
				reason: 'Connaît les calculs de poussée et les techniques de cintre',
				domain: 'construction',
			},
			{
				type: 'location_type',
				target: 'cathédrale_en_construction',
				reason: 'Observer les techniques les plus avancées en direct',
				domain: 'construction',
			},
		],
	},

	{
		id: 'know_fortification',
		domain: 'military',
		title: 'Fortifications et châteaux',
		description:
			"Un château fort est plus qu'une résidence — c'est une machine de guerre. Murs épais, tours rondes, douves, mâchicoulis : chaque élément a sa fonction défensive. Le seigneur qui construit bien survit.",
		validFrom: 800,
		validTo: 1500,
		knownInRegions: ['europe', 'middle_east'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_fortification'],
		prerequisiteKnowledge: ['know_stone_masonry'],
		leadsToTechs: ['tech_star_fort'],
		relatedResources: ['stone', 'wood', 'iron', 'water'],
		keywords: [
			'château',
			'forteresse',
			'mur',
			'tour',
			'douve',
			'donjon',
			'mâchicoulis',
			'fortifier',
			'défendre',
			'rempart',
		],
		directAnswer:
			"Pour bâtir un château, il faut un promontoire naturel ou un fossé creusé de main d'homme. Les murs doivent faire au moins deux toises d'épaisseur, les tours rondes résistent mieux aux béliers que les carrées. Les douves empêchent le minage. Le donjon est le dernier refuge. Tout dépend du terrain — un bon maître d'œuvre choisit l'emplacement avant de poser la première pierre.",
		referrals: [
			{
				type: 'npc_type',
				target: 'maître_d_oeuvre',
				reason: 'Conçoit les plans et supervise la construction',
				domain: 'construction',
			},
			{
				type: 'npc_type',
				target: 'capitaine_garnison',
				reason:
					'Connaît les faiblesses des fortifications par expérience du siège',
				domain: 'military',
			},
		],
	},

	// ========================================================================
	// NAVIGATION
	// ========================================================================

	{
		id: 'know_basic_sailing',
		domain: 'navigation',
		title: 'Navigation côtière',
		description:
			"Longer les côtes en observant les étoiles, les courants et les amers — c'est l'art des marins depuis des millénaires. On ne s'aventure guère en haute mer, sauf les Vikings et les Arabes les plus audacieux.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'southeast_asia',
			'north_africa',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_basic_sailing'],
		prerequisiteKnowledge: [],
		leadsToTechs: [
			'tech_celestial_navigation',
			'tech_lateen_sail',
			'tech_compass',
		],
		relatedResources: ['wood', 'linen', 'rope', 'tar'],
		keywords: [
			'naviguer',
			'bateau',
			'mer',
			'côte',
			'voile',
			'vent',
			'étoile',
			'marin',
			'port',
			'navigation',
		],
		directAnswer:
			"En mer, on suit la côte tant qu'on peut la voir. La nuit, l'étoile polaire indique le nord. On observe le vent, la couleur de l'eau, le vol des oiseaux pour deviner la terre. Les navires à voile carrée vont bien vent arrière mais peinent contre le vent. Les Arabes ont une voile triangulaire — la voile latine — qui remonte mieux au vent. Pour naviguer loin, il faut de l'eau douce, des vivres salés et du courage.",
		referrals: [
			{
				type: 'npc_type',
				target: 'capitaine_navire',
				reason: 'Connaît les courants, les vents et les ports',
				domain: 'navigation',
			},
			{
				type: 'location_type',
				target: 'port',
				reason: 'Pour trouver un navire et un équipage',
				domain: 'navigation',
			},
		],
	},

	{
		id: 'know_compass',
		domain: 'navigation',
		title: 'La boussole',
		description:
			"Une aiguille aimantée posée sur un pivot qui pointe toujours vers le nord — c'est un miracle de la nature. Les Chinois la connaissent depuis des siècles. Les Arabes l'utilisent en mer. L'Occident commence à la découvrir.",
		validFrom: 1000,
		validTo: 9999,
		knownInRegions: ['east_asia'],
		knowledgeLevel: 'rumored',
		requiredTechs: ['tech_compass'],
		prerequisiteKnowledge: ['know_basic_sailing'],
		leadsToTechs: ['tech_magnetic_declination', 'tech_cartography'],
		relatedResources: ['magnetite', 'iron', 'pivot'],
		keywords: [
			'boussole',
			'nord',
			'aiguille',
			'magnétique',
			'aimant',
			'direction',
			'orientation',
		],
		directAnswer:
			"On dit que dans l'Empire du Milieu, les marins possèdent une aiguille magique qui pointe toujours vers le sud. Frottée contre une pierre d'aimant — la magnétite — une aiguille de fer acquiert cette propriété mystérieuse. Posée sur un bouchon flottant dans un bol d'eau, elle s'aligne nord-sud. Un tel instrument pourrait changer la navigation... si on pouvait s'en procurer un ou comprendre comment le fabriquer.",
		referrals: [
			{
				type: 'npc_type',
				target: 'marchand_chinois',
				reason: 'Pourrait posséder une boussole ou en décrire une',
				domain: 'trade',
			},
			{
				type: 'npc_type',
				target: 'marin_arabe',
				reason: 'Certains marins arabes commencent à en utiliser',
				domain: 'navigation',
			},
		],
	},

	{
		id: 'know_celestial_navigation',
		domain: 'navigation',
		title: 'Navigation aux étoiles',
		description:
			"Les étoiles sont la carte du ciel. La Polaire donne le nord ; la hauteur du soleil à midi, la latitude. Les Arabes ont des instruments pour mesurer les angles — l'astrolabe, merveille de géométrie.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['middle_east', 'north_africa', 'south_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_celestial_navigation'],
		prerequisiteKnowledge: ['know_basic_sailing'],
		leadsToTechs: ['tech_astrolabe'],
		relatedResources: ['astrolabe', 'star_charts'],
		keywords: [
			'étoile',
			'astrolabe',
			'latitude',
			'polaire',
			'navigation',
			'ciel',
			'soleil',
			'angle',
			'horizon',
		],
		directAnswer:
			"Pour connaître sa position en mer, un marin observe les étoiles. L'étoile polaire indique le nord et sa hauteur au-dessus de l'horizon donne la latitude. Le soleil à midi fait de même, avec des tables de calcul. L'astrolabe — un disque de métal gravé de cercles — permet de mesurer ces angles avec précision. Les Arabes le maîtrisent comme nul autre peuple.",
		referrals: [
			{
				type: 'npc_type',
				target: 'astronome_arabe',
				reason: "Maîtrise l'usage de l'astrolabe et les cartes du ciel",
				domain: 'astronomy',
			},
			{
				type: 'npc_type',
				target: 'fabricant_instruments',
				reason: 'Peut construire un astrolabe sur commande',
				domain: 'engineering',
			},
		],
	},

	// ========================================================================
	// MÉDECINE
	// ========================================================================

	{
		id: 'know_herbal_medicine',
		domain: 'medicine',
		title: 'Médecine des simples',
		description:
			"Les plantes sont la pharmacie de Dieu. La sauge guérit les fièvres, le millepertuis chasse la mélancolie, l'ail repousse les miasmes. Chaque herboriste connaît ses simples — c'est le savoir des grands-mères et des moines.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'south_asia',
			'sub_saharan_africa',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_herbal_medicine'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_surgery_basic'],
		relatedResources: ['herbs', 'roots', 'honey', 'vinegar'],
		keywords: [
			'plante',
			'herbe',
			'remède',
			'guérir',
			'maladie',
			'fièvre',
			'potion',
			'onguent',
			'simples',
			'herboriste',
			'soigner',
		],
		directAnswer:
			"Les simples sont les plantes médicinales — chacune a sa vertu. La sauge pour la fièvre, la camomille pour le ventre, le pavot pour la douleur (mais attention, il endort et crée le besoin). On les prépare en décoctions, en onguents avec du saindoux, ou en cataplasmes. Les moines cultivent des jardins de simples ; l'herboriste du marché vend les herbes séchées. Mais méfie-toi des charlatans qui vendent de l'eau colorée.",
		referrals: [
			{
				type: 'npc_type',
				target: 'herboriste',
				reason: 'Connaît les plantes et leurs vertus',
				domain: 'medicine',
			},
			{
				type: 'institution',
				target: 'monastère',
				reason:
					'Les moines entretiennent des jardins de simples et des infirmeries',
				domain: 'medicine',
			},
		],
	},

	{
		id: 'know_humoral_medicine',
		domain: 'medicine',
		title: 'La théorie des humeurs',
		description:
			"Le corps est gouverné par quatre humeurs : le sang, la bile jaune, la bile noire et le flegme. La maladie vient de leur déséquilibre. Galien l'a enseigné, et c'est la base de toute médecine savante.",
		validFrom: 0,
		validTo: 1800,
		knownInRegions: ['europe', 'middle_east', 'north_africa'],
		knowledgeLevel: 'mastered',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: [],
		keywords: [
			'humeur',
			'sang',
			'bile',
			'flegme',
			'Galien',
			'saignée',
			'équilibre',
			'tempérament',
			'purge',
		],
		directAnswer:
			"Selon Galien et Hippocrate, le corps contient quatre humeurs : le sang (chaud et humide), la bile jaune (chaude et sèche), la bile noire (froide et sèche) et le flegme (froid et humide). La santé, c'est leur équilibre. Quand une humeur domine, on tombe malade. Le médecin rétablit l'équilibre par la saignée, la purge, le régime alimentaire et les bains. C'est la science — pas de la sorcellerie.",
		referrals: [
			{
				type: 'npc_type',
				target: 'physicien',
				reason: 'Médecin savant formé à la théorie humorale',
				domain: 'medicine',
			},
			{
				type: 'npc_type',
				target: 'barbier_chirurgien',
				reason: 'Pratique les saignées et les petites chirurgies',
				domain: 'medicine',
			},
		],
	},

	{
		id: 'know_islamic_medicine',
		domain: 'medicine',
		title: 'Médecine arabe',
		description:
			"Les médecins du monde islamique — Avicenne, Rhazes, Abulcasis — ont surpassé Galien. Leur Canon de la médecine décrit des centaines de maladies, de remèdes et d'opérations chirurgicales avec une précision inégalée.",
		validFrom: 900,
		validTo: 9999,
		knownInRegions: ['middle_east', 'north_africa', 'south_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_islamic_medicine'],
		prerequisiteKnowledge: ['know_humoral_medicine'],
		leadsToTechs: ['tech_quarantine', 'tech_anatomy'],
		relatedResources: ['herbs', 'surgical_instruments', 'manuscripts'],
		keywords: [
			'Avicenne',
			'Canon',
			'arabe',
			'islam',
			'médecin',
			'chirurgie',
			'hôpital',
			'Rhazes',
			'pharmacie',
		],
		directAnswer:
			"Les médecins arabes ont perfectionné l'art de Galien bien au-delà de ce que nous pratiquons en Occident. Avicenne, dans son Canon, a classé toutes les maladies connues avec leurs symptômes et leurs traitements. Les hôpitaux arabes — les bimaristans — accueillent les malades gratuitement. Ils ont inventé la distillation des essences médicinales, décrit les maladies contagieuses et pratiquent une chirurgie que nous n'osons pas tenter.",
		referrals: [
			{
				type: 'npc_type',
				target: 'médecin_arabe',
				reason: "Formé dans la tradition du Canon d'Avicenne",
				domain: 'medicine',
			},
			{
				type: 'institution',
				target: 'bimaristan',
				reason: 'Hôpital islamique — centre de savoir médical',
				domain: 'medicine',
			},
			{
				type: 'trade_route',
				target: 'route_méditerranée',
				reason: 'Les manuscrits médicaux arabes arrivent par le commerce',
				domain: 'trade',
			},
		],
	},

	// ========================================================================
	// COMMERCE & ÉCONOMIE
	// ========================================================================

	{
		id: 'know_basic_trade',
		domain: 'trade',
		title: 'Le commerce et les marchés',
		description:
			'Acheter bas, vendre haut — mais encore faut-il savoir où, quand et à qui. Les foires, les marchés et les ports sont les artères du commerce. Le sel, le fer, la laine et les épices font tourner le monde.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'south_asia',
			'sub_saharan_africa',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_basic_trade'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_guilds', 'tech_banking_basic', 'tech_caravanserai'],
		relatedResources: ['salt', 'iron', 'wool', 'spices', 'silk'],
		keywords: [
			'commerce',
			'marchand',
			'acheter',
			'vendre',
			'prix',
			'foire',
			'marché',
			'épices',
			'sel',
			'laine',
			'soie',
		],
		directAnswer:
			"Le commerce repose sur l'échange : ce qui est commun ici est rare ailleurs, et donc vaut plus. Le sel de la côte se vend cher dans les montagnes. Les épices de l'Orient valent leur poids en argent en Occident. Pour commercer, il faut connaître les routes, les prix et les gens. Les foires de Champagne sont le carrefour du commerce européen. À chaque transaction, attention aux changeurs — les monnaies sont différentes d'un comté à l'autre.",
		referrals: [
			{
				type: 'npc_type',
				target: 'marchand',
				reason: 'Connaît les prix et les routes commerciales',
				domain: 'trade',
			},
			{
				type: 'location_type',
				target: 'foire',
				reason: 'Lieu de commerce majeur avec des marchands de partout',
				domain: 'trade',
			},
			{
				type: 'npc_type',
				target: 'changeur',
				reason: "Convertit les monnaies et prête de l'argent",
				domain: 'trade',
			},
		],
	},

	{
		id: 'know_silk_road',
		domain: 'trade',
		title: 'La Route de la Soie',
		description:
			"Un réseau de routes qui relie l'Empire du Milieu à la Méditerranée, à travers déserts et montagnes. La soie, les épices, le papier, les idées — tout voyage par ces chemins, de caravansérail en caravansérail.",
		validFrom: 200,
		validTo: 1500,
		knownInRegions: ['middle_east', 'central_asia', 'east_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_caravanserai'],
		prerequisiteKnowledge: ['know_basic_trade'],
		leadsToTechs: [],
		relatedResources: ['silk', 'spices', 'porcelain', 'paper', 'camels'],
		keywords: [
			'soie',
			'route',
			'caravane',
			'orient',
			'chine',
			'épices',
			'caravansérail',
			'désert',
			'Samarkand',
			'Bagdad',
		],
		directAnswer:
			"La Route de la Soie n'est pas une route unique, mais un réseau : des pistes à travers les steppes d'Asie centrale, les déserts de Perse, les cols des montagnes. Les caravanes de chameaux portent la soie, les épices, la porcelaine, le papier et mille autres merveilles. Chaque étape a son caravansérail — un refuge pour les marchands et leurs bêtes. Le voyage prend des mois, parfois des années. Les profits sont immenses, mais les risques aussi : brigands, tempêtes de sable, maladies.",
		referrals: [
			{
				type: 'npc_type',
				target: 'caravanier',
				reason: 'Guide les caravanes à travers les routes dangereuses',
				domain: 'trade',
			},
			{
				type: 'location_type',
				target: 'caravansérail',
				reason: 'Étape et refuge sur les routes commerciales',
				domain: 'trade',
			},
		],
	},

	{
		id: 'know_guilds',
		domain: 'trade',
		title: 'Les guildes et corporations',
		description:
			"Les artisans d'un même métier se regroupent en guildes pour fixer les prix, garantir la qualité et protéger leurs secrets. Apprenti, compagnon, maître — c'est une hiérarchie stricte qui régit toute production urbaine.",
		validFrom: 900,
		validTo: 1800,
		knownInRegions: ['europe', 'middle_east'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_guilds'],
		prerequisiteKnowledge: ['know_basic_trade'],
		leadsToTechs: ['tech_double_entry_bookkeeping'],
		relatedResources: [],
		keywords: [
			'guilde',
			'corporation',
			'apprenti',
			'compagnon',
			'maître',
			'métier',
			'artisan',
			'règles',
			'qualité',
			'monopole',
		],
		directAnswer:
			"Les guildes contrôlent tout. Pour exercer un métier dans une ville, il faut en être membre. On commence comme apprenti chez un maître — ça dure des années. Puis on devient compagnon, on fait son tour, et si le chef-d'œuvre est accepté par les maîtres, on obtient la maîtrise. Personne en dehors de la guilde ne peut vendre dans la ville. C'est la protection du métier... et parfois son carcan.",
		referrals: [
			{
				type: 'npc_type',
				target: 'maître_de_guilde',
				reason: 'Dirige la guilde et fixe les règles',
				domain: 'trade',
			},
			{
				type: 'institution',
				target: 'hôtel_de_guilde',
				reason: 'Siège administratif de la corporation',
				domain: 'trade',
			},
		],
	},

	// ========================================================================
	// MILITAIRE
	// ========================================================================

	{
		id: 'know_siege_warfare',
		domain: 'military',
		title: "L'art du siège",
		description:
			"Prendre un château, c'est un art de patience et d'ingénierie. Escalade, bélier, sape, blocus — chaque méthode a ses mérites. Le trébuchet peut fracasser un mur, mais il faut des semaines pour le construire.",
		validFrom: 500,
		validTo: 1500,
		knownInRegions: ['europe', 'middle_east', 'east_asia'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_siege_warfare'],
		prerequisiteKnowledge: ['know_fortification'],
		leadsToTechs: ['tech_trebuchet', 'tech_gunpowder_weapons'],
		relatedResources: ['wood', 'rope', 'iron', 'stone_projectiles'],
		keywords: [
			'siège',
			'bélier',
			'trébuchet',
			'sape',
			'assaut',
			'blocus',
			'échelle',
			'tour de siège',
			'mine',
		],
		directAnswer:
			"Un siège se mène de plusieurs façons. Le blocus affame la garnison — c'est long mais sûr. L'assaut direct coûte cher en hommes. Le bélier enfonce les portes. La sape creuse sous les murs pour les faire s'effondrer. Le trébuchet lance des pierres de plusieurs quintaux contre les murailles. Et la ruse — un agent à l'intérieur — est souvent plus efficace que toute machine. Celui qui assiège doit aussi se garder des sorties de la garnison et des armées de secours.",
		referrals: [
			{
				type: 'npc_type',
				target: 'ingénieur_militaire',
				reason: 'Conçoit et construit les machines de siège',
				domain: 'engineering',
			},
			{
				type: 'npc_type',
				target: 'capitaine_garnison',
				reason: 'Connaît les tactiques de défense',
				domain: 'military',
			},
		],
	},

	{
		id: 'know_cavalry_tactics',
		domain: 'military',
		title: 'La cavalerie',
		description:
			"Le chevalier à cheval est l'arme décisive des batailles. L'étrier, venu des steppes, a tout changé — il permet de frapper puissamment sans tomber de selle. Une charge de cavalerie lourde brise les lignes d'infanterie.",
		validFrom: 800,
		validTo: 1500,
		knownInRegions: ['europe', 'middle_east', 'central_asia'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_cavalry', 'tech_stirrup'],
		prerequisiteKnowledge: ['know_animal_husbandry'],
		leadsToTechs: [],
		relatedResources: ['horses', 'iron', 'leather', 'lance'],
		keywords: [
			'cavalerie',
			'cheval',
			'chevalier',
			'charge',
			'étrier',
			'lance',
			'armure',
			'destrier',
			'bataille',
		],
		directAnswer:
			"La cavalerie lourde est la reine des batailles. Un chevalier en armure sur un destrier, lance en avant, est une force terrifiante. L'étrier permet de rester en selle lors de l'impact. Mais un bon cheval de guerre coûte une fortune, il faut des années d'entraînement, et sans bonne coordination, une charge peut tourner au désastre. Les archers peuvent décimer une cavalerie mal protégée, et les piquiers serrés l'arrêtent net.",
		referrals: [
			{
				type: 'npc_type',
				target: 'maréchal',
				reason: 'Commande la cavalerie et connaît les tactiques',
				domain: 'military',
			},
			{
				type: 'npc_type',
				target: 'palefrenier',
				reason: 'Entraîne et soigne les chevaux de guerre',
				domain: 'husbandry',
			},
		],
	},

	{
		id: 'know_gunpowder',
		domain: 'military',
		title: 'La poudre noire',
		description:
			"Un mélange de salpêtre, de soufre et de charbon qui explose avec un bruit de tonnerre. Les Chinois l'utilisent depuis des siècles pour des feux d'artifice et — de plus en plus — pour la guerre.",
		validFrom: 900,
		validTo: 9999,
		knownInRegions: ['east_asia'],
		knowledgeLevel: 'rumored',
		requiredTechs: ['tech_gunpowder'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_gunpowder_weapons', 'tech_musket', 'tech_dynamite'],
		relatedResources: ['saltpeter', 'sulfur', 'charcoal'],
		keywords: [
			'poudre',
			'explosion',
			'salpêtre',
			'soufre',
			'charbon',
			'feu',
			'tonnerre',
			'bombarde',
			'canon',
			'poudre noire',
		],
		directAnswer:
			"On raconte que dans l'Empire du Milieu, les alchimistes ont découvert un mélange terrible : du salpêtre, du soufre et du charbon de bois, broyés ensemble, créent une poudre qui s'enflamme avec une violence terrifiante. Ils l'utilisent pour des feux d'artifice, mais aussi pour des armes qui lancent le feu et des tubes de métal qui projettent des pierres. Si cette poudre arrive en Occident, elle changera la guerre pour toujours. Les murs les plus épais n'y résisteront pas.",
		referrals: [
			{
				type: 'npc_type',
				target: 'alchimiste',
				reason: 'Étudie les substances et pourrait reproduire la recette',
				domain: 'alchemy',
			},
			{
				type: 'npc_type',
				target: 'marchand_oriental',
				reason: 'Pourrait rapporter de la poudre ou des informations',
				domain: 'trade',
			},
		],
	},

	// ========================================================================
	// THÉOLOGIE & PHILOSOPHIE
	// ========================================================================

	{
		id: 'know_theology_basics',
		domain: 'theology',
		title: "La foi et l'Église",
		description:
			"L'Église est le pilier de la société. Le pape à Rome, les évêques dans leurs diocèses, les curés dans leurs paroisses — une hiérarchie qui couvre toute la chrétienté. Les sacrements rythment la vie de chaque chrétien.",
		validFrom: 500,
		validTo: 9999,
		knownInRegions: ['europe'],
		knowledgeLevel: 'mastered',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: [],
		keywords: [
			'église',
			'pape',
			'évêque',
			'prêtre',
			'sacrement',
			'baptême',
			'messe',
			'péché',
			'confession',
			'dieu',
			'foi',
			'chrétien',
		],
		directAnswer:
			"L'Église est partout. Du baptême à l'extrême-onction, chaque moment de la vie passe par les sacrements. Le curé gouverne la paroisse, l'évêque le diocèse, et le pape — vicaire du Christ — règne sur toute la chrétienté. Défier l'Église, c'est risquer l'excommunication : plus de sacrements, plus de commerce, plus de protection. Les monastères gardent les livres et les savoirs. Les ordres mendiants prêchent au peuple. N'offense pas l'Église, même si tu ne crois pas.",
		referrals: [
			{
				type: 'npc_type',
				target: 'curé',
				reason: "Premier point de contact avec l'institution ecclésiastique",
				domain: 'theology',
			},
			{
				type: 'institution',
				target: 'évêché',
				reason: 'Centre du pouvoir ecclésiastique local',
				domain: 'theology',
			},
		],
	},

	{
		id: 'know_philosophy_basics',
		domain: 'philosophy',
		title: 'La philosophie et la logique',
		description:
			"Aristote est le maître de ceux qui savent. Sa logique, sa physique, sa métaphysique — tout passe par lui. Les Arabes l'ont traduit et commenté ; l'Occident le redécouvre à travers eux.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['middle_east', 'north_africa'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_philosophy'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_university', 'tech_natural_philosophy'],
		relatedResources: ['manuscripts', 'parchment'],
		keywords: [
			'philosophie',
			'Aristote',
			'logique',
			'raison',
			'savoir',
			'pensée',
			'dialectique',
			'métaphysique',
		],
		directAnswer:
			"La philosophie est l'amour de la sagesse — la quête de la vérité par la raison. Aristote de Stagire a posé les bases : la logique pour penser juste, la physique pour comprendre la nature, la métaphysique pour ce qui est au-delà. Les Arabes — Averroès, Avicenne — ont enrichi son œuvre. En Occident, les moines commencent à traduire ces textes du grec et de l'arabe vers le latin. C'est un trésor immense qui attend d'être ouvert.",
		referrals: [
			{
				type: 'npc_type',
				target: 'moine_copiste',
				reason: 'Traduit et copie les manuscrits anciens',
				domain: 'linguistics',
			},
			{
				type: 'institution',
				target: 'bibliothèque_monastique',
				reason: 'Conserve les manuscrits philosophiques',
				domain: 'philosophy',
			},
		],
	},

	{
		id: 'know_alchemy_basics',
		domain: 'alchemy',
		title: "L'alchimie et ses secrets",
		description:
			"Transformer le plomb en or — le Grand Œuvre — c'est le rêve de l'alchimiste. Mais en chemin, il découvre des acides, des sels, des teintures. L'alchimie est à la frontière de la science, de la philosophie et de la magie.",
		validFrom: 500,
		validTo: 1700,
		knownInRegions: ['middle_east', 'north_africa', 'europe'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_alchemy'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_modern_chemistry'],
		relatedResources: ['mercury', 'sulfur', 'lead', 'gold', 'alembic'],
		keywords: [
			'alchimie',
			'transmutation',
			'or',
			'plomb',
			'pierre philosophale',
			'élixir',
			'distillation',
			'alambic',
			'mercure',
		],
		directAnswer:
			"L'alchimie cherche le secret de la transmutation — transformer les métaux vils en or. Personne n'y est encore parvenu, mais en chemin, les alchimistes ont appris la distillation, l'extraction des acides, la fabrication de teintures et de remèdes. L'alambic, l'athanor (le fourneau alchimique) et le bain-marie sont leurs outils. Attention : l'Église voit d'un mauvais œil ces pratiques qui frisent la sorcellerie. Mieux vaut opérer discrètement.",
		referrals: [
			{
				type: 'npc_type',
				target: 'alchimiste',
				reason: "Pratique l'art de la transmutation et connaît les substances",
				domain: 'alchemy',
			},
			{
				type: 'npc_type',
				target: 'apothicaire',
				reason: 'Utilise les techniques alchimiques pour les remèdes',
				domain: 'medicine',
			},
		],
	},

	// ========================================================================
	// ASTRONOMIE
	// ========================================================================

	{
		id: 'know_basic_astronomy',
		domain: 'astronomy',
		title: 'Le ciel et ses signes',
		description:
			"Le soleil, la lune et les étoiles gouvernent les saisons, les marées et — disent certains — le destin des hommes. L'astronomie est la reine des sciences, inséparable de l'astrologie.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'south_asia',
			'mesoamerica',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_basic_astronomy'],
		prerequisiteKnowledge: [],
		leadsToTechs: [
			'tech_calendar',
			'tech_advanced_astronomy',
			'tech_heliocentric_model',
		],
		relatedResources: [],
		keywords: [
			'étoile',
			'soleil',
			'lune',
			'planète',
			'constellation',
			'éclipse',
			'ciel',
			'zodiaque',
			'astronomie',
			'astrologie',
		],
		directAnswer:
			"Le ciel est un livre ouvert pour qui sait le lire. Le soleil marque les jours et les saisons, la lune les mois et les marées. Les cinq planètes errantes — Mercure, Vénus, Mars, Jupiter, Saturne — se déplacent parmi les étoiles fixes. Les constellations du zodiaque servent de repères. Les éclipses sont des présages terrifiants. Ptolémée a décrit tout cela dans l'Almageste — les Arabes l'ont amélioré.",
		referrals: [
			{
				type: 'npc_type',
				target: 'astrologue',
				reason: 'Lit les étoiles et tire les horoscopes',
				domain: 'astronomy',
			},
			{
				type: 'npc_type',
				target: 'astronome_arabe',
				reason: 'Possède les tables de calcul les plus précises',
				domain: 'astronomy',
			},
		],
	},

	// ========================================================================
	// DROIT & POLITIQUE
	// ========================================================================

	{
		id: 'know_feudal_law',
		domain: 'law',
		title: 'Le droit féodal',
		description:
			"Le vassal doit au seigneur le conseil et l'ost ; le seigneur doit au vassal la protection et le fief. C'est un contrat sacré, scellé par l'hommage. Tout repose sur cette chaîne de fidélités.",
		validFrom: 800,
		validTo: 1500,
		knownInRegions: ['europe'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_feudalism'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_codified_law'],
		relatedResources: [],
		keywords: [
			'féodal',
			'vassal',
			'seigneur',
			'fief',
			'hommage',
			'ost',
			'droit',
			'loi',
			'suzerain',
			'serment',
			'fidélité',
		],
		directAnswer:
			"Le système féodal est une pyramide de serments. Le roi au sommet, les grands seigneurs en dessous, puis les petits vassaux, et tout en bas, les serfs liés à la terre. Chaque vassal prête hommage à son seigneur : il met ses mains dans les siennes et jure fidélité. En échange du fief (terre et ses revenus), il doit 40 jours de service militaire par an et le conseil. Le seigneur lui doit justice et protection. Rompre ce serment, c'est la félonie — un crime terrible.",
		referrals: [
			{
				type: 'npc_type',
				target: 'juriste',
				reason: 'Connaît les coutumes et les droits locaux',
				domain: 'law',
			},
			{
				type: 'npc_type',
				target: 'sénéchal',
				reason: 'Administre les affaires juridiques du domaine',
				domain: 'politics',
			},
		],
	},

	{
		id: 'know_diplomacy',
		domain: 'politics',
		title: "L'art de la diplomatie",
		description:
			'Les alliances se nouent par les mariages, les traités se scellent par les otages. La diplomatie est un jeu de patience où chaque mot compte et chaque cadeau est un message.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'east_asia'],
		knowledgeLevel: 'known',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['gold', 'gifts'],
		keywords: [
			'diplomatie',
			'alliance',
			'traité',
			'mariage',
			'ambassadeur',
			'otage',
			'paix',
			'guerre',
			'négocier',
			'pacte',
		],
		directAnswer:
			"La diplomatie est l'art d'obtenir par la parole ce que la guerre ne peut donner qu'au prix du sang. Les alliances se scellent par des mariages dynastiques — ta fille épouse son fils, et vos maisons sont liées. Les traités exigent des garanties : otages de haut rang, or, ou terres en gage. Envoie un messager qui connaît les coutumes de la cour adverse. Un cadeau bien choisi vaut plus que mille mots. Et surtout — ne montre jamais ta faiblesse.",
		referrals: [
			{
				type: 'npc_type',
				target: 'ambassadeur',
				reason: 'Négocie les traités et connaît les cours étrangères',
				domain: 'politics',
			},
			{
				type: 'npc_type',
				target: 'héraut',
				reason: 'Porte les messages officiels entre seigneurs',
				domain: 'politics',
			},
		],
	},

	// ========================================================================
	// GÉOGRAPHIE
	// ========================================================================

	{
		id: 'know_known_world_1000',
		domain: 'geography',
		title: "Le monde connu en l'an 1000",
		description:
			"Le monde connu des chrétiens d'Occident se limite à l'Europe, une partie de l'Afrique du Nord et le Proche-Orient. Mais les Arabes, les Chinois et les Vikings savent que le monde est bien plus vaste.",
		validFrom: 900,
		validTo: 1200,
		knownInRegions: ['europe'],
		knowledgeLevel: 'known',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_cartography'],
		relatedResources: ['maps', 'manuscripts'],
		keywords: [
			'monde',
			'terre',
			'continent',
			'carte',
			'géographie',
			'pays',
			'région',
			'voyager',
			'loin',
			'inconnu',
		],
		directAnswer:
			"Pour nous chrétiens, le monde se divise en trois : l'Europe, l'Asie et l'Afrique, avec Jérusalem au centre — c'est ce que montrent nos cartes T-O. Mais les voyageurs arabes décrivent des terres immenses au-delà de la Perse, un empire fabuleux en Chine, et des peuples inconnus au sud du Sahara. Les Vikings ont navigué vers l'ouest et trouvé des terres glacées — le Groenland, et peut-être au-delà. Le monde est plus grand que ce que nos livres racontent.",
		referrals: [
			{
				type: 'npc_type',
				target: 'géographe_arabe',
				reason: 'Al-Idrisi et ses contemporains cartographient le monde',
				domain: 'geography',
			},
			{
				type: 'npc_type',
				target: 'marin_viking',
				reason: "A exploré les terres de l'Ouest",
				domain: 'navigation',
			},
		],
	},

	// ========================================================================
	// ART & CULTURE
	// ========================================================================

	{
		id: 'know_manuscript_production',
		domain: 'art',
		title: "L'art du manuscrit",
		description:
			"Les moines copient les livres à la main, sur du parchemin de veau ou de mouton. Chaque manuscrit est une œuvre d'art : lettres enluminées, dorures, miniatures. Un seul livre peut prendre des mois de travail.",
		validFrom: 500,
		validTo: 1500,
		knownInRegions: ['europe', 'middle_east'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_basic_writing'],
		prerequisiteKnowledge: [],
		leadsToTechs: [
			'tech_paper_making',
			'tech_block_printing',
			'tech_printing_press',
		],
		relatedResources: ['parchment', 'ink', 'gold_leaf', 'pigments'],
		keywords: [
			'manuscrit',
			'livre',
			'copier',
			'écrire',
			'parchemin',
			'enluminure',
			'moine',
			'scriptorium',
			'encre',
		],
		directAnswer:
			"Un livre est un trésor — il faut des semaines au moine copiste pour le reproduire. Le parchemin est fait de peau de veau ou de mouton, gratté et blanchi. L'encre est un mélange de noix de galle, de vitriol et de gomme. Les lettres sont tracées au calame ou à la plume d'oie. Les plus beaux manuscrits portent des enluminures : des images peintes en couleurs vives, avec de l'or véritable. C'est pourquoi les livres valent une fortune et que peu de gens y ont accès.",
		referrals: [
			{
				type: 'npc_type',
				target: 'moine_copiste',
				reason: 'Copie et illustre les manuscrits au scriptorium',
				domain: 'art',
			},
			{
				type: 'institution',
				target: 'scriptorium',
				reason: 'Atelier de copie des manuscrits dans les monastères',
				domain: 'art',
			},
		],
	},

	// ========================================================================
	// TEXTILE
	// ========================================================================

	{
		id: 'know_wool_production',
		domain: 'textiles',
		title: 'La laine et le drap',
		description:
			"La laine est l'or blanc de l'Europe. Les moutons anglais donnent la meilleure laine, les Flamands la tissent en draps inégalés. Tondre, carder, filer, tisser, fouler, teindre — c'est toute une chaîne.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_weaving'],
		prerequisiteKnowledge: ['know_animal_husbandry'],
		leadsToTechs: ['tech_spinning_jenny'],
		relatedResources: ['wool', 'dye', 'alum'],
		keywords: [
			'laine',
			'drap',
			'tisser',
			'filer',
			'mouton',
			'tondre',
			'rouet',
			'métier à tisser',
			'flandre',
			'teinture',
		],
		directAnswer:
			"La laine suit un long chemin : d'abord la tonte au printemps, puis le lavage pour ôter le suint. Vient le cardage — on démêle les fibres avec des chardons. Le filage au rouet transforme les fibres en fil. Le tissage au métier crée le drap. Puis le foulage dans les moulins à foulon le rend dense et imperméable. Enfin, la teinture lui donne sa couleur — le bleu de guède, le rouge de garance. La laine anglaise tissée en Flandre, c'est ce qui fait la richesse des villes drapières.",
		referrals: [
			{
				type: 'npc_type',
				target: 'tisserand',
				reason: 'Maîtrise le métier à tisser et connaît les fibres',
				domain: 'textiles',
			},
			{
				type: 'npc_type',
				target: 'teinturier',
				reason: 'Connaît les pigments et les mordants pour fixer les couleurs',
				domain: 'textiles',
			},
		],
	},

	{
		id: 'know_silk',
		domain: 'textiles',
		title: 'La soie',
		description:
			"Le tissu le plus précieux du monde vient d'un ver. Les Chinois ont gardé ce secret pendant des siècles. La soie vaut plus que l'or à poids égal en Occident, et tout marchand rêve d'en faire le commerce.",
		validFrom: 500,
		validTo: 9999,
		knownInRegions: ['east_asia'],
		knowledgeLevel: 'rumored',
		requiredTechs: ['tech_silk_production'],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['silk', 'mulberry'],
		keywords: [
			'soie',
			'ver à soie',
			'mûrier',
			'tissu',
			'luxe',
			'chine',
			'orient',
			'précieux',
		],
		directAnswer:
			"La soie est un mystère pour l'Occident. On sait qu'elle vient de l'Empire du Milieu et qu'elle est faite par des vers qui filent un cocon. Ces vers se nourrissent de feuilles de mûrier. Le fil de soie est d'une finesse et d'une solidité incomparables. Les Chinois protègent ce secret sous peine de mort. Des Byzantins auraient réussi à faire sortir des œufs de vers à soie cachés dans des bâtons creux — mais cela reste une rumeur. Pour en obtenir, il faut commercer avec l'Orient.",
		referrals: [
			{
				type: 'trade_route',
				target: 'route_de_la_soie',
				reason: "Le seul moyen d'obtenir de la soie en Occident",
				domain: 'trade',
			},
			{
				type: 'npc_type',
				target: 'marchand_byzantin',
				reason: 'Byzance a ses propres ateliers de soie',
				domain: 'trade',
			},
		],
	},

	// ========================================================================
	// INGÉNIERIE
	// ========================================================================

	{
		id: 'know_mechanical_clock',
		domain: 'engineering',
		title: "L'horloge mécanique",
		description:
			"Mesurer le temps au-delà du cadran solaire et du sablier — c'est le défi de notre époque. On commence à voir dans les cathédrales et les clochers des mécanismes à poids et à échappement qui battent les heures.",
		validFrom: 1200,
		validTo: 9999,
		knownInRegions: ['europe'],
		knowledgeLevel: 'rumored',
		requiredTechs: ['tech_mechanical_clock'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_chronometer'],
		relatedResources: ['iron', 'brass', 'gears'],
		keywords: [
			'horloge',
			'temps',
			'mécanique',
			'engrenage',
			'clocher',
			'heure',
			'cadran',
			'poids',
			'échappement',
		],
		directAnswer:
			"L'horloge mécanique est une invention merveilleuse. Un poids suspendu fait tourner des engrenages, et un dispositif appelé échappement libère le mouvement rythme par rythme — tick, tick, tick. C'est ainsi qu'on peut compter les heures sans soleil ni sable. Les premières apparaissent dans les clochers des cathédrales. Construire un tel mécanisme exige un forgeron d'une habileté exceptionnelle, qui sache tailler des roues dentées avec une précision extrême.",
		referrals: [
			{
				type: 'npc_type',
				target: 'horloger',
				reason: 'Conçoit et répare les mécanismes de mesure du temps',
				domain: 'engineering',
			},
			{
				type: 'npc_type',
				target: 'forgeron_spécialisé',
				reason: 'Peut fabriquer les engrenages en fer ou en laiton',
				domain: 'metallurgy',
			},
		],
	},

	// ========================================================================
	// SAVOIRS AVANCÉS (accessibles plus tard dans le jeu)
	// ========================================================================

	{
		id: 'know_printing_press',
		domain: 'engineering',
		title: "L'imprimerie à caractères mobiles",
		description:
			"Chaque lettre est un petit bloc de métal. On les assemble pour former une page, on les encre, on presse le papier — et on peut tirer cent copies, mille, dix mille. C'est une révolution.",
		validFrom: 1440,
		validTo: 9999,
		knownInRegions: ['europe'],
		knowledgeLevel: 'unknown',
		requiredTechs: ['tech_printing_press', 'tech_movable_type'],
		prerequisiteKnowledge: ['know_manuscript_production'],
		leadsToTechs: ['tech_encyclopedie'],
		relatedResources: ['lead', 'tin', 'ink', 'paper', 'press'],
		keywords: [
			'imprimerie',
			'imprimer',
			'livre',
			'caractère mobile',
			'Gutenberg',
			'presse',
			'papier',
			'copie',
			'typographie',
		],
		directAnswer:
			"L'imprimerie de Gutenberg est un miracle de l'ingénierie. Chaque lettre est fondue en métal — un alliage de plomb, d'étain et d'antimoine. On compose le texte lettre par lettre dans un cadre, on encre la surface, on pose le papier et on presse avec une vis. En une journée, on produit plus de pages qu'un moine en un an. Le coût des livres s'effondre. Le savoir, autrefois réservé aux clercs, peut atteindre tous ceux qui savent lire.",
		referrals: [
			{
				type: 'npc_type',
				target: 'imprimeur',
				reason: 'Maîtrise la technique de Gutenberg',
				domain: 'engineering',
			},
			{
				type: 'npc_type',
				target: 'fondeur_de_caractères',
				reason: 'Fabrique les lettres en métal',
				domain: 'metallurgy',
			},
		],
	},

	{
		id: 'know_scientific_method',
		domain: 'philosophy',
		title: 'La méthode expérimentale',
		description:
			"Observer, formuler une hypothèse, expérimenter, vérifier — puis recommencer. C'est un renversement complet : on ne croit plus les anciens sur parole, on vérifie par soi-même.",
		validFrom: 1600,
		validTo: 9999,
		knownInRegions: ['europe'],
		knowledgeLevel: 'unknown',
		requiredTechs: ['tech_scientific_method'],
		prerequisiteKnowledge: ['know_philosophy_basics'],
		leadsToTechs: ['tech_newtonian_mechanics', 'tech_modern_chemistry'],
		relatedResources: ['instruments', 'laboratory'],
		keywords: [
			'méthode',
			'expérience',
			'hypothèse',
			'observer',
			'vérifier',
			'science',
			'expérimental',
			'preuve',
			'raison',
		],
		directAnswer:
			"La méthode scientifique est une discipline de l'esprit. Au lieu de croire ce qu'Aristote a écrit il y a deux mille ans, on observe la nature directement. On formule une hypothèse — une explication possible — et on la met à l'épreuve par une expérience contrôlée. Si l'expérience contredit l'hypothèse, on la rejette, même si elle semblait évidente. Galilée, Bacon, Descartes — chacun à sa manière a posé les bases de cette approche. C'est ainsi que le vrai savoir progresse.",
		referrals: [
			{
				type: 'npc_type',
				target: 'philosophe_naturel',
				reason: 'Pratique la méthode expérimentale',
				domain: 'philosophy',
			},
			{
				type: 'institution',
				target: 'académie_des_sciences',
				reason: 'Lieu de débat et de vérification des découvertes',
				domain: 'philosophy',
			},
		],
	},

	{
		id: 'know_heliocentric_model',
		domain: 'astronomy',
		title: 'Le modèle héliocentrique',
		description:
			"Et si c'était la Terre qui tournait autour du Soleil, et non l'inverse ? Copernic l'a écrit, Galilée l'a observé avec sa lunette. Mais l'Église dit que c'est une hérésie...",
		validFrom: 1543,
		validTo: 9999,
		knownInRegions: ['europe'],
		knowledgeLevel: 'unknown',
		requiredTechs: ['tech_heliocentric_model'],
		prerequisiteKnowledge: ['know_basic_astronomy'],
		leadsToTechs: ['tech_telescope', 'tech_newtonian_mechanics'],
		relatedResources: ['telescope', 'astronomical_tables'],
		keywords: [
			'héliocentrique',
			'Copernic',
			'Galilée',
			'terre',
			'soleil',
			'tourner',
			'orbite',
			'planète',
			'hérésie',
		],
		directAnswer:
			"Copernic a proposé que la Terre n'est pas au centre du monde — c'est le Soleil, et les planètes tournent autour de lui. Galilée, avec sa lunette, a vu les phases de Vénus et les lunes de Jupiter, confirmant cette théorie. Mais l'Église a condamné Galilée : dire que la Terre bouge, c'est contredire les Écritures. Malgré tout, les calculs de Kepler fonctionnent mieux avec le modèle héliocentrique. La vérité finira par s'imposer.",
		referrals: [
			{
				type: 'npc_type',
				target: 'astronome',
				reason: 'Étudie les mouvements planétaires',
				domain: 'astronomy',
			},
			{
				type: 'npc_type',
				target: 'fabricant_de_lunettes',
				reason: "Peut construire un instrument d'observation",
				domain: 'engineering',
			},
		],
	},

	{
		id: 'know_steam_power',
		domain: 'engineering',
		title: 'La force de la vapeur',
		description:
			"L'eau chauffée devient vapeur, et la vapeur pousse. Héron d'Alexandrie en jouait déjà, mais personne n'avait su en faire une vraie machine... jusqu'à Newcomen et Watt.",
		validFrom: 1700,
		validTo: 9999,
		knownInRegions: ['europe'],
		knowledgeLevel: 'unknown',
		requiredTechs: ['tech_steam_engine'],
		prerequisiteKnowledge: ['know_iron_smelting', 'know_blast_furnace'],
		leadsToTechs: ['tech_steam_locomotive', 'tech_spinning_jenny'],
		relatedResources: ['iron', 'coal', 'copper', 'water'],
		keywords: [
			'vapeur',
			'machine',
			'chaudière',
			'piston',
			'Watt',
			'Newcomen',
			'charbon',
			'force',
			'énergie',
			'révolution industrielle',
		],
		directAnswer:
			"La machine à vapeur est l'invention qui change tout. L'eau chauffée dans une chaudière scellée produit de la vapeur sous pression. Cette vapeur pousse un piston dans un cylindre, et le mouvement du piston entraîne une roue ou un mécanisme. Newcomen l'a d'abord utilisée pour pomper l'eau des mines. Watt l'a perfectionnée avec un condenseur séparé, la rendant bien plus efficace. Avec cette machine, la force humaine et animale n'est plus la seule source d'énergie. C'est le début d'un monde nouveau.",
		referrals: [
			{
				type: 'npc_type',
				target: 'ingénieur_mécanicien',
				reason: 'Conçoit et construit les machines à vapeur',
				domain: 'engineering',
			},
			{
				type: 'location_type',
				target: 'mine',
				reason: "Premier lieu d'utilisation des machines à vapeur",
				domain: 'engineering',
			},
		],
	},

	{
		id: 'know_vaccination',
		domain: 'medicine',
		title: 'La vaccination',
		description:
			"Jenner a observé que les filles de ferme qui avaient eu la variole de la vache ne contractaient jamais la variole humaine. En inoculant le pus de la vache à l'homme, on le protège. C'est miraculeux... et controversé.",
		validFrom: 1796,
		validTo: 9999,
		knownInRegions: ['europe'],
		knowledgeLevel: 'unknown',
		requiredTechs: ['tech_vaccination'],
		prerequisiteKnowledge: ['know_herbal_medicine'],
		leadsToTechs: ['tech_germ_theory'],
		relatedResources: ['cowpox_serum'],
		keywords: [
			'vaccin',
			'vaccination',
			'variole',
			'Jenner',
			'inoculer',
			'immunité',
			'maladie',
			'prévention',
			'épidémie',
		],
		directAnswer:
			"Edward Jenner a fait une observation brillante : les vachers qui attrapent la vaccine — la variole des vaches — ne contractent jamais la terrible variole humaine. En prélevant le pus d'une pustule de vaccine et en le grattant dans la peau d'un patient sain, on lui donne une protection durable contre la variole. L'idée est terrifiante pour beaucoup — introduire volontairement une maladie ? Mais les résultats sont indéniables. La variole, ce fléau qui défigure et tue, pourrait être vaincue.",
		referrals: [
			{
				type: 'npc_type',
				target: 'médecin',
				reason: 'Peut pratiquer la vaccination',
				domain: 'medicine',
			},
			{
				type: 'npc_type',
				target: 'fermier',
				reason: 'Source de la vaccine (variole bovine)',
				domain: 'agriculture',
			},
		],
	},

	// ========================================================================
	// ALIMENTATION & CUISINE
	// ========================================================================

	{
		id: 'know_food_preservation',
		domain: 'cooking',
		title: 'Conserver les aliments',
		description:
			"Le sel, le fumage, le séchage et le vinaigre — voilà les armes contre la pourriture. Sans conservation, pas de provisions d'hiver, pas de voyage, pas de siège tenable.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'south_asia',
			'sub_saharan_africa',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['salt', 'vinegar', 'smoke', 'honey'],
		keywords: [
			'conserver',
			'sel',
			'saler',
			'fumer',
			'sécher',
			'vinaigre',
			'provisions',
			'hiver',
			'pourrir',
			'nourriture',
			'stockage',
		],
		directAnswer:
			"La conservation est vitale. Le sel est le moyen le plus sûr : il déshydrate la viande et le poisson, empêchant la putréfaction. Le fumage ajoute une protection supplémentaire et donne du goût. Le séchage au soleil fonctionne pour les fruits, les herbes et les grains. Le vinaigre conserve les légumes. Le miel préserve les fruits et les remèdes. Le froid naturel en hiver est un allié. Sans ces techniques, personne ne passe l'hiver, et aucune armée ne marche plus de trois jours.",
		referrals: [
			{
				type: 'npc_type',
				target: 'boucher',
				reason: 'Maîtrise le salage et le fumage des viandes',
				domain: 'cooking',
			},
			{
				type: 'npc_type',
				target: 'marchand_de_sel',
				reason: 'Fournit le sel, ressource précieuse',
				domain: 'trade',
			},
		],
	},

	// ========================================================================
	// LINGUISTIQUE
	// ========================================================================

	{
		id: 'know_languages',
		domain: 'linguistics',
		title: 'Les langues du monde connu',
		description:
			"Le latin est la langue de l'Église et du savoir en Occident. L'arabe domine le monde islamique et porte l'essentiel de la science. Le chinois, le grec, le persan — chaque langue est une porte vers une civilisation.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east'],
		knowledgeLevel: 'known',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['manuscripts', 'interpreters'],
		keywords: [
			'langue',
			'latin',
			'arabe',
			'grec',
			'traduction',
			'interprète',
			'parler',
			'écrire',
			'comprendre',
			'communication',
		],
		directAnswer:
			"Le latin est la langue universelle de l'Église, des tribunaux et des savants en Occident — mais le peuple parle mille dialectes. L'arabe est la langue du Coran et de la science : médecine, astronomie, mathématiques — tout est en arabe. Le grec ancien porte Aristote et Platon, mais peu le lisent encore. Pour commercer avec l'Orient, il faut un interprète — ou apprendre les rudiments du turc, du persan ou du chinois. Celui qui parle plusieurs langues ouvre plusieurs mondes.",
		referrals: [
			{
				type: 'npc_type',
				target: 'interprète',
				reason: 'Parle plusieurs langues et peut servir de traducteur',
				domain: 'linguistics',
			},
			{
				type: 'institution',
				target: 'école_de_traduction',
				reason: "Tolède et d'autres centres traduisent l'arabe vers le latin",
				domain: 'linguistics',
			},
		],
	},

	// ========================================================================
	// HISTOIRE NATURELLE
	// ========================================================================

	{
		id: 'know_bestiary',
		domain: 'natural_history',
		title: 'Le bestiaire',
		description:
			'Les bêtes du monde sont innombrables, et chacune porte un enseignement. Le lion est roi, le pélican nourrit ses petits de son sang, le basilic tue du regard. Ce que les anciens ont consigné dans les bestiaires mêle observation et allégorie.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'north_africa'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_writing'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_natural_philosophy'],
		relatedResources: ['manuscripts', 'parchemin', 'encre'],
		keywords: [
			'animal',
			'bête',
			'bestiaire',
			'lion',
			'aigle',
			'serpent',
			'loup',
			'chasse',
			'créature',
			'faune',
		],
		directAnswer:
			"Les bestiaires décrivent les créatures connues et celles rapportées par les voyageurs. Le lion règne sur les bêtes ; le cerf combat le serpent ; le phénix renaît de ses cendres. Chaque animal porte une leçon morale. Mais au-delà des allégories, les chasseurs et les éleveurs connaissent les vrais comportements des bêtes — quand elles migrent, ce qu'elles mangent, comment les piéger. Pour les créatures lointaines — éléphants, girafes, crocodiles — il faut interroger les marchands qui ont voyagé.",
		referrals: [
			{
				type: 'npc_type',
				target: 'chasseur',
				reason: 'Connaît les animaux sauvages et leurs habitudes',
				domain: 'natural_history',
			},
			{
				type: 'npc_type',
				target: 'moine_copiste',
				reason: 'Copie et illustre les bestiaires',
				domain: 'natural_history',
			},
		],
	},

	{
		id: 'know_herbalism',
		domain: 'natural_history',
		title: 'Les simples et les plantes',
		description:
			'Chaque plante a une vertu — ou un poison. Les moines cultivent les jardins de simples, les guérisseuses connaissent les herbes des champs. Savoir reconnaître la digitale de la consoude peut sauver une vie ou en prendre une.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'south_asia',
			'north_africa',
		],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_herbal_medicine'],
		prerequisiteKnowledge: ['know_herbal_medicine'],
		leadsToTechs: ['tech_botanical_garden'],
		relatedResources: ['herbes', 'jardin', 'graines', 'racines'],
		keywords: [
			'plante',
			'herbe',
			'racine',
			'fleur',
			'feuille',
			'simple',
			'jardin',
			'cueillette',
			'botanique',
			'poison',
		],
		directAnswer:
			'Les plantes se divisent en quatre : celles qui nourrissent, celles qui guérissent, celles qui empoisonnent, et celles qui teignent. La sauge apaise les fièvres, le pavot endort la douleur, la belladone tue. Les moines tiennent des herbiers où chaque plante est dessinée avec ses propriétés. Pour les plantes rares, il faut chercher dans les montagnes ou les marécages — ou interroger les apothicaires arabes qui ont catalogué des centaines de simples.',
		referrals: [
			{
				type: 'npc_type',
				target: 'herboriste',
				reason: 'Identifie les plantes et prépare les remèdes',
				domain: 'natural_history',
			},
			{
				type: 'institution',
				target: 'jardin_monastique',
				reason: 'Cultive les simples à des fins médicinales',
				domain: 'medicine',
			},
		],
	},

	{
		id: 'know_minerals_gems',
		domain: 'natural_history',
		title: 'Les pierres et les gemmes',
		description:
			'Sous la terre dorment les richesses : le fer pour les armes, le cuivre pour les cloches, les gemmes pour les couronnes. Chaque pierre a ses propriétés — les lapidaires les ont consignées depuis les Grecs.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'south_asia', 'east_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_copper_working'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_gold_silver_working'],
		relatedResources: ['minerai', 'gemmes', 'cristaux', 'mine'],
		keywords: [
			'pierre',
			'gemme',
			'minerai',
			'rubis',
			'saphir',
			'diamant',
			'or',
			'argent',
			'mine',
			'cristal',
		],
		directAnswer:
			"Les pierres précieuses viennent des confins du monde : les rubis de Ceylan et de Birmanie, les saphirs de Perse, les émeraudes d'Égypte. Chaque gemme possède, dit-on, des vertus : le saphir protège des poisons, le rubis donne courage. Le minerai de fer se trouve partout, mais le bon — celui qui donne un acier pur — est plus rare. Les mineurs savent lire la roche pour trouver les veines. Les orfèvres et les lapidaires sont les maîtres de ces savoirs.",
		referrals: [
			{
				type: 'npc_type',
				target: 'mineur',
				reason: 'Sait trouver les veines de minerai et de gemmes',
				domain: 'natural_history',
			},
			{
				type: 'npc_type',
				target: 'orfèvre',
				reason: 'Connaît la valeur et les propriétés des pierres',
				domain: 'trade',
			},
		],
	},

	{
		id: 'know_weather_signs',
		domain: 'natural_history',
		title: 'Les signes du ciel',
		description:
			'Nul besoin de magie pour prédire le temps — il suffit de regarder. Les nuages, le vent, le comportement des bêtes, la couleur du couchant : tout annonce ce qui vient. Les marins et les paysans le savent depuis toujours.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'south_asia',
			'north_africa',
			'sub_saharan_africa',
			'southeast_asia',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_barometer'],
		relatedResources: ['observation', 'ciel', 'vent'],
		keywords: [
			'temps',
			'pluie',
			'orage',
			'vent',
			'nuage',
			'tempête',
			'ciel',
			'saison',
			'sécheresse',
			'prévision',
		],
		directAnswer:
			'Le ciel rouge au couchant promet du beau temps ; rouge au levant, il annonce la tempête. Les hirondelles qui volent bas chassent les insectes écrasés par la pression — la pluie vient. Un halo autour de la lune prévient de la neige. Les marins lisent la houle et le vent ; les paysans observent leurs bêtes — quand les fourmis maçonnent haut et que les grenouilles chantent tard, le temps va tourner.',
		referrals: [
			{
				type: 'npc_type',
				target: 'marin',
				reason: 'Lit le ciel et la mer pour prévoir les tempêtes',
				domain: 'navigation',
			},
			{
				type: 'npc_type',
				target: 'paysan_ancien',
				reason: 'Prédit le temps par les signes naturels',
				domain: 'agriculture',
			},
		],
	},

	{
		id: 'know_forest_lore',
		domain: 'natural_history',
		title: 'La forêt et ses ressources',
		description:
			'La forêt est garde-manger, pharmacie, chantier et refuge. Bois de charpente, gibier, baies, champignons, miel sauvage — celui qui connaît la forêt ne manque de rien. Mais elle cache aussi loups, brigands et marécages.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'east_asia', 'south_asia', 'southeast_asia'],
		knowledgeLevel: 'mastered',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['bois', 'gibier', 'charbon', 'résine'],
		keywords: [
			'forêt',
			'bois',
			'chêne',
			'gibier',
			'chasse',
			'champignon',
			'charbon',
			'bûcheron',
			'arbre',
			'loup',
		],
		directAnswer:
			'La forêt fournit tout : le chêne et le hêtre pour la charpente et les navires, le charbon de bois pour les forges, le gibier pour la table. Les bûcherons savent quels arbres abattre et quand — un arbre coupé en pleine sève pourrit vite. Les charbonniers transforment le bois en combustible pour les forgerons. La forêt domaniale est souvent protégée par le seigneur pour la chasse, mais les paysans y cueillent les baies, les herbes et les champignons. Gare aux loups en hiver et aux brigands en toute saison.',
		referrals: [
			{
				type: 'npc_type',
				target: 'bûcheron',
				reason: 'Connaît les essences de bois et leur usage',
				domain: 'natural_history',
			},
			{
				type: 'npc_type',
				target: 'garde_forestier',
				reason: 'Surveille la forêt et en gère les ressources',
				domain: 'natural_history',
			},
		],
	},

	// ========================================================================
	// THÉOLOGIE (compléments)
	// ========================================================================

	{
		id: 'know_christian_theology',
		domain: 'theology',
		title: 'La foi chrétienne',
		description:
			"Le Christ est mort et ressuscité pour le salut des hommes. L'Église, gardienne de la vraie foi, enseigne les sacrements, combat les hérésies et guide les âmes. Le pape à Rome est le vicaire du Christ sur terre.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_basic_writing'],
		prerequisiteKnowledge: ['know_theology_basics'],
		leadsToTechs: ['tech_university'],
		relatedResources: ['bible', 'calice', 'encens', 'cierge'],
		keywords: [
			'chrétien',
			'Christ',
			'Dieu',
			'Église',
			'pape',
			'sacrement',
			'baptême',
			'eucharistie',
			'prière',
			'péché',
		],
		directAnswer:
			"La foi chrétienne repose sur la Trinité — Père, Fils et Esprit Saint — et sur le sacrifice du Christ. Sept sacrements jalonnent la vie du fidèle : le baptême, la confirmation, l'eucharistie, la pénitence, l'onction des malades, l'ordre et le mariage. L'Église est divisée entre Rome et Constantinople, mais la foi reste une. Les moines prient et copient les textes sacrés, les évêques gouvernent les diocèses, le pape tranche les questions de doctrine.",
		referrals: [
			{
				type: 'npc_type',
				target: 'prêtre',
				reason: 'Enseigne la doctrine et administre les sacrements',
				domain: 'theology',
			},
			{
				type: 'institution',
				target: 'monastère',
				reason: 'Centre de prière, de copie et de savoir théologique',
				domain: 'theology',
			},
		],
	},

	{
		id: 'know_islamic_theology',
		domain: 'theology',
		title: "La science de l'islam",
		description:
			"L'islam repose sur cinq piliers : la profession de foi, la prière, l'aumône, le jeûne du ramadan et le pèlerinage à La Mecque. Le Coran est la parole incréée de Dieu, et les oulémas en sont les gardiens.",
		validFrom: 622,
		validTo: 9999,
		knownInRegions: [
			'middle_east',
			'north_africa',
			'central_asia',
			'south_asia',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_basic_writing'],
		prerequisiteKnowledge: ['know_theology_basics'],
		leadsToTechs: [],
		relatedResources: ['coran', 'mosquée', 'minaret', 'tapis_de_prière'],
		keywords: [
			'islam',
			'musulman',
			'Coran',
			'Allah',
			'Mahomet',
			'prophète',
			'mosquée',
			'prière',
			'ramadan',
			'pèlerinage',
		],
		directAnswer:
			"L'islam enseigne la soumission à la volonté de Dieu unique — Allah. Le prophète Mahomet a reçu le Coran, parole divine, et sa vie (la Sunna) guide les croyants. Les cinq piliers structurent la foi : la shahada (profession de foi), la salat (cinq prières quotidiennes), la zakat (aumône), le sawm (jeûne du ramadan) et le hajj (pèlerinage à La Mecque). Les oulémas interprètent la loi, les soufis cherchent l'union mystique avec Dieu.",
		referrals: [
			{
				type: 'npc_type',
				target: 'imam',
				reason: 'Guide la prière et enseigne le Coran',
				domain: 'theology',
			},
			{
				type: 'institution',
				target: 'madrasa',
				reason: "École coranique et centre d'études islamiques",
				domain: 'theology',
			},
		],
	},

	{
		id: 'know_buddhist_teachings',
		domain: 'theology',
		title: 'Les enseignements du Bouddha',
		description:
			'Le Bouddha a enseigné les quatre nobles vérités : la vie est souffrance, la souffrance naît du désir, le désir peut être éteint, et le chemin octuple y mène. Cette sagesse a traversé les montagnes et les mers.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['east_asia', 'south_asia', 'southeast_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_writing'],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['sutras', 'temple', 'statue', 'encens'],
		keywords: [
			'Bouddha',
			'bouddhisme',
			'karma',
			'nirvana',
			'méditation',
			'moine',
			'temple',
			'souffrance',
			'éveil',
			'dharma',
		],
		directAnswer:
			"Le Bouddha Siddharta Gautama a découvert que la souffrance est inséparable de l'existence. La cause en est le désir et l'attachement. En suivant le Noble Chemin Octuple — vue juste, intention juste, parole juste, action juste, moyens d'existence justes, effort juste, attention juste, concentration juste — on peut atteindre le nirvana, la fin du cycle des renaissances. Les moines bouddhistes mendient leur nourriture et méditent dans les monastères. Le bouddhisme se divise en Theravada au sud et Mahayana au nord et à l'est.",
		referrals: [
			{
				type: 'npc_type',
				target: 'moine_bouddhiste',
				reason: 'Pratique la méditation et enseigne le dharma',
				domain: 'theology',
			},
			{
				type: 'institution',
				target: 'monastère_bouddhiste',
				reason: "Centre d'étude et de méditation",
				domain: 'theology',
			},
		],
	},

	{
		id: 'know_hindu_traditions',
		domain: 'theology',
		title: 'Les traditions hindoues',
		description:
			"L'hindouisme est une forêt de dieux, de rites et de sagesses. Brahma crée, Vishnou préserve, Shiva détruit. Le dharma guide chaque caste dans son devoir, et le karma lie chaque âme à ses actes passés.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['south_asia', 'southeast_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_writing'],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['vedas', 'temple', 'offrandes', 'mantras'],
		keywords: [
			'hindu',
			'hindou',
			'Vishnou',
			'Shiva',
			'Brahma',
			'dharma',
			'karma',
			'caste',
			'réincarnation',
			'veda',
		],
		directAnswer:
			'La tradition hindoue enseigne que le monde est un cycle éternel de création et de destruction. Trois dieux suprêmes président : Brahma le créateur, Vishnou le protecteur, Shiva le destructeur. Chaque être humain naît dans une caste qui détermine son dharma — son devoir sacré. Le karma, fruit des actions passées, détermine la prochaine renaissance. Les Vedas sont les textes les plus anciens et les plus sacrés. Les brahmanes effectuent les rituels, les temples abritent les images divines.',
		referrals: [
			{
				type: 'npc_type',
				target: 'brahmane',
				reason: 'Prêtre hindou, gardien des rites et des Vedas',
				domain: 'theology',
			},
			{
				type: 'institution',
				target: 'temple_hindou',
				reason: 'Lieu de culte et de pèlerinage',
				domain: 'theology',
			},
		],
	},

	// ========================================================================
	// DROIT (compléments)
	// ========================================================================

	{
		id: 'know_roman_law',
		domain: 'law',
		title: 'Le droit romain',
		description:
			"Le Corpus Juris Civilis de Justinien est le fondement de tout droit savant en Occident. Ses codes, ses digestes et ses institutes organisent la propriété, les contrats et la justice avec une rigueur que nul peuple barbare n'a égalée.",
		validFrom: 530,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'southern_europe'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_codified_law'],
		prerequisiteKnowledge: ['know_feudal_law'],
		leadsToTechs: [],
		relatedResources: ['codex', 'tribunal', 'notaire', 'sceau'],
		keywords: [
			'droit',
			'loi',
			'romain',
			'Justinien',
			'code',
			'tribunal',
			'propriété',
			'contrat',
			'justice',
			'juriste',
		],
		directAnswer:
			"Le droit romain, codifié par l'empereur Justinien au VIe siècle, distingue le droit des personnes, le droit des choses et le droit des actions. Il règle la propriété, les successions, les contrats et les délits avec une précision sans égale. Les universités de Bologne et de Ravenne commencent à le redécouvrir et à l'enseigner. Tout juriste sérieux doit connaître les Institutes, le Digeste et le Code. Ce droit inspire les rois qui veulent organiser leur royaume au-delà de la simple coutume.",
		referrals: [
			{
				type: 'npc_type',
				target: 'juriste',
				reason: 'Formé au droit romain, conseille les princes',
				domain: 'law',
			},
			{
				type: 'institution',
				target: 'université',
				reason: 'Enseigne le droit civil et le droit canon',
				domain: 'law',
			},
		],
	},

	{
		id: 'know_sharia',
		domain: 'law',
		title: "La charia — la voie de l'islam",
		description:
			'La charia est la loi divine tirée du Coran et de la Sunna. Les juristes des quatre écoles — hanafite, malikite, chaféite, hanbalite — interprètent ses règles pour chaque aspect de la vie : mariage, commerce, héritage, châtiments.',
		validFrom: 622,
		validTo: 9999,
		knownInRegions: [
			'middle_east',
			'north_africa',
			'central_asia',
			'south_asia',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_codified_law'],
		prerequisiteKnowledge: ['know_islamic_theology'],
		leadsToTechs: [],
		relatedResources: ['coran', 'hadiths', 'qadi', 'tribunal'],
		keywords: [
			'charia',
			'loi',
			'islamique',
			'qadi',
			'juge',
			'fiqh',
			'halal',
			'haram',
			'héritage',
			'mariage',
		],
		directAnswer:
			"La charia couvre tout : le culte, le mariage, le commerce, les peines criminelles, l'héritage. Le Coran et les hadiths (paroles du Prophète) en sont les sources premières. Les juristes (fuqaha) raisonnent par analogie (qiyas) et consensus (ijma) quand les textes ne tranchent pas directement. Le qadi (juge) applique la loi dans chaque cité. Quatre grandes écoles juridiques — hanafite, malikite, chaféite, hanbalite — offrent des interprétations parfois divergentes mais toutes légitimes.",
		referrals: [
			{
				type: 'npc_type',
				target: 'qadi',
				reason: 'Juge islamique, applique la charia',
				domain: 'law',
			},
			{
				type: 'institution',
				target: 'madrasa',
				reason: 'Forme les juristes en droit islamique',
				domain: 'law',
			},
		],
	},

	{
		id: 'know_chinese_legal_codes',
		domain: 'law',
		title: 'Les codes chinois',
		description:
			"L'Empire du Milieu gouverne par la loi autant que par la vertu. Le Code des Tang, puis celui des Song, prescrit peines et procédures avec une minutie bureaucratique que les lettrés maintiennent à travers les dynasties.",
		validFrom: 624,
		validTo: 9999,
		knownInRegions: ['east_asia'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_codified_law', 'tech_bureaucracy'],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['code_pénal', 'magistrat', 'sceau_impérial'],
		keywords: [
			'loi',
			'chinois',
			'code',
			'Tang',
			'Song',
			'magistrat',
			'peine',
			'châtiment',
			'examen',
			'mandarin',
		],
		directAnswer:
			"Les codes chinois classifient les crimes en dix catégories de gravité, de la rébellion au vol. Le Code des Tang (624) a servi de modèle à toute l'Asie orientale — le Japon, la Corée et le Vietnam s'en sont inspirés. Les peines vont du bâton à l'exil, de la strangulation à la décapitation. Les magistrats locaux instruisent les affaires et jugent au nom de l'empereur. Le système des examens impériaux sélectionne les fonctionnaires les plus lettrés pour administrer la justice.",
		referrals: [
			{
				type: 'npc_type',
				target: 'mandarin',
				reason: 'Fonctionnaire lettré, administre la justice locale',
				domain: 'law',
			},
			{
				type: 'institution',
				target: 'cour_impériale',
				reason: 'Instance suprême de justice en Chine',
				domain: 'politics',
			},
		],
	},

	{
		id: 'know_customary_law',
		domain: 'law',
		title: 'Le droit coutumier',
		description:
			"Avant les codes écrits, la coutume faisait loi. Les anciens du village, le chef du clan, l'assemblée des guerriers — chaque peuple a sa façon de trancher les disputes. La tradition orale porte des siècles de jurisprudence tacite.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'sub_saharan_africa',
			'southeast_asia',
			'central_asia',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_codified_law'],
		relatedResources: ['conseil_des_anciens', 'assemblée', 'serment'],
		keywords: [
			'coutume',
			'tradition',
			'ancien',
			'assemblée',
			'jugement',
			'serment',
			'ordalie',
			'wergeld',
			'clan',
			'tribu',
		],
		directAnswer:
			"Le droit coutumier repose sur la mémoire des anciens. En Europe du Nord, le wergeld fixe le prix du sang — chaque homme a un prix selon son rang, et le meurtrier paie pour éviter la vendetta. Les ordalies — épreuves du feu, de l'eau — laissent Dieu trancher. En Afrique, le conseil des anciens arbitre les conflits fonciers et matrimoniaux. Dans les steppes, le yasak des nomades règle la vie du clan. Partout, le serment engage la parole et l'honneur devant les dieux ou les esprits.",
		referrals: [
			{
				type: 'npc_type',
				target: 'ancien_du_village',
				reason: 'Gardien de la coutume et arbitre des conflits',
				domain: 'law',
			},
		],
	},

	// ========================================================================
	// POLITIQUE (compléments)
	// ========================================================================

	{
		id: 'know_statecraft',
		domain: 'politics',
		title: "L'art de gouverner",
		description:
			'Gouverner ne se résume pas à porter la couronne. Il faut des conseillers habiles, une administration qui obéit, des revenus qui coulent, et la sagesse de savoir quand montrer la force et quand négocier.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'east_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_bureaucracy'],
		prerequisiteKnowledge: ['know_diplomacy'],
		leadsToTechs: [],
		relatedResources: ['conseillers', 'trésor', 'chancellerie', 'sceau'],
		keywords: [
			'gouverner',
			'roi',
			'prince',
			'conseil',
			'administration',
			'pouvoir',
			'autorité',
			'chancellerie',
			'décret',
			'politique',
		],
		directAnswer:
			"L'art de gouverner exige de maîtriser trois piliers : la force militaire pour se défendre, les revenus pour financer l'État, et la légitimité pour que le peuple obéisse. Un bon prince s'entoure de conseillers loyaux et compétents. Il tient sa chancellerie pour émettre des décrets, sa trésorerie pour compter l'or, et son réseau d'espions pour savoir ce qui se trame. La justice rendue équitablement assoit l'autorité mieux que la terreur.",
		referrals: [
			{
				type: 'npc_type',
				target: 'chancelier',
				reason: "Dirige l'administration et rédige les décrets",
				domain: 'politics',
			},
			{
				type: 'npc_type',
				target: 'conseiller_royal',
				reason: 'Guide le prince dans ses décisions',
				domain: 'politics',
			},
		],
	},

	{
		id: 'know_succession_rules',
		domain: 'politics',
		title: 'Les règles de succession',
		description:
			'À la mort du roi, qui monte sur le trône ? Primogéniture, élection, partage entre fils, succession par le frère — chaque peuple a ses règles, et chaque succession est une crise en puissance.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'east_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_feudalism'],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['couronne', 'lignage', 'testament', 'sacre'],
		keywords: [
			'succession',
			'héritier',
			'roi',
			'trône',
			'primogéniture',
			'couronne',
			'lignage',
			'régence',
			'usurpation',
			'sacre',
		],
		directAnswer:
			"En Europe, la primogéniture masculine domine — le fils aîné hérite. Mais en pratique, un roi faible peut être écarté au profit d'un frère ou d'un cousin plus capable. Le Saint-Empire est électif : sept princes-électeurs choisissent l'empereur. Chez les Arabes, le califat se transmet souvent au plus apte de la famille. En Chine, le fils désigné par l'empereur lui succède, mais les intrigues de palais abondent. Partout, le sacre ou l'investiture légitime le nouveau souverain.",
		referrals: [
			{
				type: 'npc_type',
				target: 'héraldiste',
				reason: 'Connaît les lignages et les droits successoraux',
				domain: 'politics',
			},
		],
	},

	{
		id: 'know_taxation_systems',
		domain: 'politics',
		title: "L'impôt et le tribut",
		description:
			'Pas de royaume sans trésor, pas de trésor sans impôt. La taille, la dîme, les droits de douane, le tribut des vassaux — tout souverain doit choisir qui payer et comment taxer sans provoquer la révolte.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'east_asia', 'south_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_coinage'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_census'],
		relatedResources: ['trésor', 'monnaie', 'registre', 'collecteur'],
		keywords: [
			'impôt',
			'taxe',
			'tribut',
			'dîme',
			'taille',
			'douane',
			'trésor',
			'monnaie',
			'fisc',
			'revenu',
		],
		directAnswer:
			"L'impôt prend mille formes. En Europe, la taille frappe les paysans, la dîme va à l'Église, les péages taxent les marchands sur les routes et les ponts. Dans le monde islamique, la jizya est prélevée sur les non-musulmans, et la zakat sur les musulmans. En Chine, l'impôt foncier et le service obligatoire (corvée) financent l'État. Le tribut des vassaux et des peuples soumis remplit aussi les coffres. Un impôt trop lourd provoque la révolte ; trop léger, il affame l'armée.",
		referrals: [
			{
				type: 'npc_type',
				target: 'trésorier',
				reason: 'Gère les recettes et les dépenses du royaume',
				domain: 'trade',
			},
			{
				type: 'npc_type',
				target: 'collecteur_impôts',
				reason: "Prélève l'impôt au nom du seigneur",
				domain: 'politics',
			},
		],
	},

	{
		id: 'know_espionage',
		domain: 'politics',
		title: "L'art de l'espionnage",
		description:
			'Tout prince avisé a ses yeux et ses oreilles dans les cours étrangères. Les espions, déguisés en marchands, en moines ou en pèlerins, rapportent les secrets des rivaux, les complots des traîtres et les mouvements des armées.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'east_asia'],
		knowledgeLevel: 'rumored',
		requiredTechs: [],
		prerequisiteKnowledge: ['know_diplomacy'],
		leadsToTechs: [],
		relatedResources: ['informateurs', 'codes', 'encre_invisible', 'réseau'],
		keywords: [
			'espion',
			'renseignement',
			'secret',
			'complot',
			'traître',
			'infiltration',
			'réseau',
			'code',
			'message',
			'surveillance',
		],
		directAnswer:
			"L'espionnage est aussi ancien que la guerre. Les marchands qui traversent les frontières rapportent ce qu'ils voient. Les ambassadeurs observent les forces de leurs hôtes. Les moines voyageurs portent des messages cachés. En Chine, Sun Tzu enseignait déjà les cinq types d'espions. Chez les Byzantins, le bureau des barbares surveille les peuples voisins. Un bon réseau d'espions vaut plus qu'une armée — car il prévient la guerre avant qu'elle n'éclate.",
		referrals: [
			{
				type: 'npc_type',
				target: 'espion',
				reason: 'Collecte des informations en territoire ennemi',
				domain: 'politics',
			},
			{
				type: 'npc_type',
				target: 'marchand',
				reason: 'Voyage librement et observe les cours étrangères',
				domain: 'trade',
			},
		],
	},

	// ========================================================================
	// GÉOGRAPHIE (compléments)
	// ========================================================================

	{
		id: 'know_cartography',
		domain: 'geography',
		title: "L'art des cartes",
		description:
			"Dessiner le monde sur un parchemin est un art autant qu'une science. Les cartes arabes sont les plus précises, les mappemondes chrétiennes placent Jérusalem au centre, et les Chinois cartographient leur empire avec un quadrillage rigoureux.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'east_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_writing', 'tech_basic_mathematics'],
		prerequisiteKnowledge: ['know_known_world_1000'],
		leadsToTechs: ['tech_cartography'],
		relatedResources: ['cartes', 'parchemin', 'compas', 'encre'],
		keywords: [
			'carte',
			'mappemonde',
			'cartographie',
			'portulans',
			'géographe',
			'territoire',
			'frontière',
			'distance',
			'boussole',
			'plan',
		],
		directAnswer:
			"Les cartes prennent des formes bien différentes selon les civilisations. En terres chrétiennes, les mappemondes T-O placent Jérusalem au centre du monde, avec l'Asie en haut. Les géographes arabes — al-Idrisi, al-Khwarizmi — mesurent les distances et dessinent des cartes bien plus précises. Les Chinois utilisent un système de grille pour représenter leur empire. Les portulans, cartes côtières des marins, sont les plus utiles pour la navigation en Méditerranée. Toute carte est aussi une vision du monde.",
		referrals: [
			{
				type: 'npc_type',
				target: 'géographe',
				reason: 'Dessine les cartes et mesure les distances',
				domain: 'geography',
			},
			{
				type: 'npc_type',
				target: 'marin',
				reason: 'Utilise les portulans pour naviguer',
				domain: 'navigation',
			},
		],
	},

	{
		id: 'know_mountain_passes',
		domain: 'geography',
		title: 'Les cols et les passages',
		description:
			'Les montagnes sont des murs que seuls les cols permettent de franchir. Connaître les passes — leur altitude, leur saison praticable, leurs dangers — est vital pour les marchands et les armées.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'central_asia', 'south_asia'],
		knowledgeLevel: 'known',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['col', 'mule', 'guide', 'caravane'],
		keywords: [
			'col',
			'montagne',
			'passage',
			'Alpes',
			'Pamir',
			'Himalaya',
			'caravane',
			'altitude',
			'neige',
			'route',
		],
		directAnswer:
			"Les grands cols du monde connu sont les artères du commerce terrestre. Le col du Grand-Saint-Bernard relie la France à l'Italie ; le Khyber passe entre la Perse et l'Inde ; les passes du Pamir ouvrent la Route de la Soie. Chaque col a sa saison : les Alpes sont fermées l'hiver par la neige, les passes du Karakoram ne sont praticables qu'en été. Des guides locaux connaissent les sentiers sûrs. Les monastères d'altitude, comme ceux du Grand-Saint-Bernard, accueillent les voyageurs perdus dans la tempête.",
		referrals: [
			{
				type: 'npc_type',
				target: 'guide_montagnard',
				reason: 'Connaît les cols et les sentiers sûrs',
				domain: 'geography',
			},
			{
				type: 'trade_route',
				target: 'tr_silk_road',
				reason: 'La Route de la Soie emprunte les cols du Pamir',
				domain: 'trade',
			},
		],
	},

	{
		id: 'know_river_navigation',
		domain: 'geography',
		title: 'Les fleuves, routes du monde',
		description:
			"Les fleuves sont les routes naturelles du commerce et de la guerre. Le Nil nourrit l'Égypte, le Rhin et le Danube relient l'Europe, le Yangtzé traverse la Chine. Qui tient le fleuve tient le pays.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'south_asia',
			'sub_saharan_africa',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['barque', 'bac', 'port_fluvial', 'péage'],
		keywords: [
			'fleuve',
			'rivière',
			'Nil',
			'Rhin',
			'Danube',
			'Yangtzé',
			'navigation',
			'courant',
			'crue',
			'barque',
		],
		directAnswer:
			"Naviguer sur un fleuve coûte dix fois moins cher que le transport par terre. Le Rhin porte le vin et le sel de la Suisse à la mer du Nord. Le Danube relie la Bavière à Constantinople. Le Nil, avec ses crues annuelles, fertilise l'Égypte et porte les barques chargées de grain. Le Yangtzé est l'artère vitale de la Chine du Sud. Mais les fleuves ont leurs dangers — rapides, bancs de sable, crues soudaines. Les passeurs et les bateliers connaissent chaque méandre de leur portion du fleuve.",
		referrals: [
			{
				type: 'npc_type',
				target: 'batelier',
				reason: 'Navigue sur les fleuves et connaît les courants',
				domain: 'navigation',
			},
		],
	},

	{
		id: 'know_desert_travel',
		domain: 'geography',
		title: 'Traverser le désert',
		description:
			'Le désert est un océan de sable où les oasis sont des îles. Seuls les guides qui connaissent les puits, les étoiles et les vents peuvent y mener une caravane sans la perdre. Le chameau est le vaisseau de cette mer aride.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['middle_east', 'north_africa', 'central_asia'],
		knowledgeLevel: 'known',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['chameau', 'oasis', 'puits', 'caravane'],
		keywords: [
			'désert',
			'Sahara',
			'oasis',
			'chameau',
			'caravane',
			'puits',
			'sable',
			'chaleur',
			'nomade',
			'dune',
		],
		directAnswer:
			"Traverser le Sahara ou le Rub al-Khali exige une préparation minutieuse. Le chameau porte jusqu'à 250 livres et peut marcher quatre jours sans eau. Les guides Touaregs et Bédouins connaissent chaque puits, chaque oasis, chaque point de repère dans les dunes. On voyage de nuit pour éviter la chaleur, en suivant les étoiles. Les tempêtes de sable peuvent ensevelir une caravane entière. Les oasis sont des refuges vitaux où l'on trouve de l'eau, des dattes et du repos — mais aussi des brigands.",
		referrals: [
			{
				type: 'npc_type',
				target: 'guide_caravane',
				reason: 'Connaît les routes du désert, les puits et les oasis',
				domain: 'geography',
			},
			{
				type: 'trade_route',
				target: 'tr_trans_saharan',
				reason: 'La route transsaharienne relie le Maghreb au Sahel',
				domain: 'trade',
			},
		],
	},

	// ========================================================================
	// ART (compléments)
	// ========================================================================

	{
		id: 'know_fresco_painting',
		domain: 'art',
		title: 'La peinture à fresque',
		description:
			"Peindre sur l'enduit frais exige rapidité et maîtrise. Les pigments, mêlés à la chaux humide, deviennent partie du mur. Les églises de Constantinople et de Rome brillent de ces images qui enseignent la foi aux illettrés.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'southern_europe', 'middle_east'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_construction'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_perspective_drawing'],
		relatedResources: ['pigments', 'chaux', 'enduit', 'pinceaux'],
		keywords: [
			'fresque',
			'peinture',
			'mur',
			'pigment',
			'église',
			'couleur',
			'image',
			'icône',
			'artiste',
			'enduit',
		],
		directAnswer:
			"La fresque se peint sur l'enduit encore humide — d'où son nom. Le peintre doit travailler vite, car une fois la chaux sèche, les pigments sont scellés pour des siècles. Les couleurs viennent de la terre (ocres), des minéraux (azurite pour le bleu, cinabre pour le rouge), ou des plantes (indigo). Les murs des églises se couvrent de scènes bibliques pour instruire les fidèles qui ne savent pas lire. Constantinople excelle dans les mosaïques et les fresques ; Rome et l'Italie perpétuent la tradition.",
		referrals: [
			{
				type: 'npc_type',
				target: 'peintre',
				reason: 'Maîtrise les techniques de la fresque et des pigments',
				domain: 'art',
			},
			{
				type: 'institution',
				target: 'atelier_artisan',
				reason: 'Forme les apprentis aux arts de la peinture',
				domain: 'art',
			},
		],
	},

	{
		id: 'know_mosaic_art',
		domain: 'art',
		title: "L'art de la mosaïque",
		description:
			"De petits cubes de pierre, de verre ou d'or assemblés par milliers composent des images d'une beauté éternelle. Les Byzantins en ont fait un art sacré, les Romains ornaient leurs villas, et les mosquées brillent de tesselles dorées.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'southern_europe'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_glass_making'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_stained_glass'],
		relatedResources: ['tesselles', 'verre', 'or', 'mortier'],
		keywords: [
			'mosaïque',
			'tesselle',
			'verre',
			'or',
			'sol',
			'mur',
			'byzantin',
			'décoration',
			'motif',
			'opus',
		],
		directAnswer:
			"La mosaïque est un art de patience. Des milliers de tesselles — cubes de pierre, de céramique ou de verre doré — sont enchâssées dans un lit de mortier pour former des images. L'or de fond des mosaïques byzantines de Ravenne et de Constantinople crée une lumière surnaturelle. Les artisans romains préféraient les motifs géométriques et les scènes de la vie. Le monde islamique utilise la mosaïque pour des motifs abstraits et géométriques, car la représentation des êtres vivants y est limitée.",
		referrals: [
			{
				type: 'npc_type',
				target: 'mosaïste',
				reason: 'Assemble les tesselles en images durables',
				domain: 'art',
			},
		],
	},

	{
		id: 'know_calligraphy_art',
		domain: 'art',
		title: "L'art de la belle écriture",
		description:
			"En terre d'islam, la calligraphie est le premier des arts — car elle porte la parole de Dieu. En Chine, le pinceau est la quatrième arme du lettré. En Occident, les moines enluminent les manuscrits d'une beauté qui glorifie le Créateur.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['middle_east', 'east_asia', 'europe', 'north_africa'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_ink_production'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_block_printing'],
		relatedResources: ['encre', 'calame', 'pinceau', 'parchemin'],
		keywords: [
			'calligraphie',
			'écriture',
			'encre',
			'pinceau',
			'enluminure',
			'manuscrit',
			'calame',
			'lettré',
			'parchemin',
			'alphabet',
		],
		directAnswer:
			"Trois grandes traditions de calligraphie illuminent le monde. En terre d'islam, les calligraphes transforment les versets du Coran en œuvres d'art — les styles coufique, naskhi et thuluth ornent mosquées et manuscrits. En Chine et au Japon, la calligraphie au pinceau est un art majeur : chaque trait exprime l'esprit du lettré. En Occident, les scriptoria monastiques produisent des manuscrits enluminés avec des lettrines dorées et des marges décorées. L'encre se prépare avec des noix de galle, du vitriol et de la gomme arabique.",
		referrals: [
			{
				type: 'npc_type',
				target: 'calligraphe',
				reason: "Maître de l'écriture ornementale",
				domain: 'art',
			},
			{
				type: 'institution',
				target: 'scriptorium',
				reason: 'Atelier monastique de copie et de calligraphie',
				domain: 'art',
			},
		],
	},

	{
		id: 'know_sculpture_carving',
		domain: 'art',
		title: 'La sculpture et la taille',
		description:
			"Du marbre des cathédrales au bois des temples, la sculpture donne vie à la pierre et au bois. Les tailleurs de pierre ornent les portails, les sculpteurs hindous peuplent les temples de divinités, et les bronziers chinois coulent des chefs-d'œuvre.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'south_asia', 'east_asia', 'middle_east'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_stone_masonry'],
		prerequisiteKnowledge: ['know_stone_masonry'],
		leadsToTechs: ['tech_gothic_architecture'],
		relatedResources: ['marbre', 'bois', 'ciseau', 'burin', 'bronze'],
		keywords: [
			'sculpture',
			'statue',
			'pierre',
			'bois',
			'taille',
			'ciseau',
			'bas-relief',
			'portail',
			'bronze',
			'figure',
		],
		directAnswer:
			'Le sculpteur transforme la matière brute en beauté. Le tailleur de pierre, avec son ciseau et son maillet, orne les chapiteaux des colonnes, les tympans des portails et les tombeaux des grands. En Inde, les temples regorgent de statues de divinités sculptées avec une finesse extraordinaire. En Chine, les bronziers coulent des statues colossales de Bouddha. Le bois se sculpte pour les retables, les sièges et les proues des navires. Chaque matériau exige ses outils et sa technique — un bloc de marbre ne se travaille pas comme un tronc de chêne.',
		referrals: [
			{
				type: 'npc_type',
				target: 'tailleur_de_pierre',
				reason: 'Sculpte la pierre pour les édifices et les statues',
				domain: 'construction',
			},
		],
	},

	// ========================================================================
	// CUISINE (compléments)
	// ========================================================================

	{
		id: 'know_bread_making',
		domain: 'cooking',
		title: 'Le pain, nourriture des hommes',
		description:
			'Le pain est la base de toute table. Moudre le grain, pétrir la pâte, la laisser lever avec le levain, et cuire au four — cet art nourrit des civilisations entières. Le pain blanc est luxe, le pain noir est quotidien.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'north_africa', 'central_asia'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_basic_agriculture'],
		prerequisiteKnowledge: ['know_basic_farming'],
		leadsToTechs: [],
		relatedResources: ['farine', 'levain', 'four', 'moulin'],
		keywords: [
			'pain',
			'farine',
			'levain',
			'four',
			'moulin',
			'blé',
			'pétrir',
			'croûte',
			'mie',
			'boulanger',
		],
		directAnswer:
			"Tout commence au moulin : le grain est broyé entre les meules pour donner la farine. La farine blanche, tamisée, fait le pain des riches ; la complète, avec son et gruau, fait celui des pauvres. Le levain, gardé d'une fournée à l'autre, fait lever la pâte. Le boulanger pétrit, façonne et enfourne dans un four à bois chauffé à blanc. Dans les campagnes, le four est souvent communal et banal — le seigneur en tire un droit. Le pain plat, sans levain, nourrit les peuples du Proche-Orient depuis des millénaires.",
		referrals: [
			{
				type: 'npc_type',
				target: 'boulanger',
				reason: 'Maîtrise la fabrication du pain',
				domain: 'cooking',
			},
			{
				type: 'npc_type',
				target: 'meunier',
				reason: 'Transforme le grain en farine au moulin',
				domain: 'engineering',
			},
		],
	},

	{
		id: 'know_fermentation',
		domain: 'cooking',
		title: 'Les arts de la fermentation',
		description:
			"Le même miracle transforme le raisin en vin, l'orge en bière et le lait en fromage. La fermentation conserve, nourrit et réjouit. Chaque peuple a sa boisson — hydromel au Nord, vin au Sud, saké en Orient.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'north_africa',
			'sub_saharan_africa',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['raisin', 'orge', 'miel', 'tonneau', 'cuve'],
		keywords: [
			'vin',
			'bière',
			'hydromel',
			'fermentation',
			'fromage',
			'levure',
			'tonneau',
			'alcool',
			'vinaigre',
			'saké',
		],
		directAnswer:
			"La fermentation est un mystère que les anciens maîtrisent sans le comprendre. Le raisin foulé et l'orge maltée deviennent, par la grâce du temps et de la chaleur, vin et bière. Le lait caillé donne le fromage — chaque terroir, chaque troupeau produit un fromage différent. Le chou fermenté nourrit le Nord, le miso nourrit le Japon. L'hydromel, fait de miel dilué et fermenté, est la boisson des guerriers nordiques. Le vinaigre, vin qui a tourné, conserve les aliments et assaisonne les plats.",
		referrals: [
			{
				type: 'npc_type',
				target: 'vigneron',
				reason: 'Cultive la vigne et produit le vin',
				domain: 'cooking',
			},
			{
				type: 'npc_type',
				target: 'brasseur',
				reason: "Fabrique la bière et l'hydromel",
				domain: 'cooking',
			},
		],
	},

	{
		id: 'know_spice_knowledge',
		domain: 'cooking',
		title: 'Les épices du monde',
		description:
			'Les épices valent leur poids en or — parfois davantage. Le poivre de Malabar, la cannelle de Ceylan, le clou de girofle des Moluques : ces trésors traversent des océans pour arriver sur la table des riches.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['south_asia', 'middle_east', 'southeast_asia'],
		knowledgeLevel: 'known',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['poivre', 'cannelle', 'girofle', 'safran', 'muscade'],
		keywords: [
			'épice',
			'poivre',
			'cannelle',
			'girofle',
			'safran',
			'muscade',
			'gingembre',
			'cumin',
			'cardamome',
			'commerce',
		],
		directAnswer:
			"Le poivre vient de la côte de Malabar en Inde — il est si précieux qu'on le compte grain par grain. La cannelle vient de Ceylan, le clou de girofle et la muscade des lointaines îles aux Épices (Moluques). Le safran, cueilli fleur par fleur, colore et parfume les plats. Le gingembre, le cumin, le curcuma sont les bases de la cuisine orientale. Les épices ne servent pas qu'au goût — elles masquent les saveurs de la viande tournée, parfument les remèdes et s'offrent en cadeau diplomatique. Les marchands arabes gardent jalousement le secret de leurs sources.",
		referrals: [
			{
				type: 'npc_type',
				target: 'marchand_épices',
				reason: 'Connaît les origines, les prix et les usages des épices',
				domain: 'trade',
			},
			{
				type: 'trade_route',
				target: 'tr_indian_ocean',
				reason: "La route de l'océan Indien achemine les épices",
				domain: 'trade',
			},
		],
	},

	// ========================================================================
	// LINGUISTIQUE (compléments)
	// ========================================================================

	{
		id: 'know_writing_systems',
		domain: 'linguistics',
		title: 'Les écritures du monde',
		description:
			"L'alphabet latin, l'alphabet arabe, les idéogrammes chinois, le devanagari — chaque civilisation a inventé sa manière de fixer la parole. Comprendre ces écritures, c'est ouvrir la porte de leurs savoirs.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'south_asia',
			'north_africa',
		],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_writing'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_movable_type'],
		relatedResources: ['parchemin', 'papier', 'encre', 'calame_roseau'],
		keywords: [
			'écriture',
			'alphabet',
			'idéogramme',
			'lettre',
			'signe',
			'hiéroglyphe',
			'rune',
			'script',
			'syllabaire',
			'déchiffrer',
		],
		directAnswer:
			"Le monde connaît des dizaines de systèmes d'écriture. L'alphabet latin, hérité des Romains, est celui de l'Occident chrétien — vingt-trois lettres suffisent pour tous les mots. L'alphabet arabe, écrit de droite à gauche, porte le Coran et la science. Les Chinois utilisent des milliers d'idéogrammes où chaque signe est un concept — un lettré en maîtrise trois à quatre mille. Le devanagari écrit le sanskrit, langue sacrée de l'Inde. Le grec ancien a un alphabet propre, et les runes nordiques servaient aux inscriptions sacrées. Lire et écrire est un pouvoir rare — la plupart des hommes ne le possèdent pas.",
		referrals: [
			{
				type: 'npc_type',
				target: 'scribe',
				reason: "Maîtrise un ou plusieurs systèmes d'écriture",
				domain: 'linguistics',
			},
		],
	},

	{
		id: 'know_lingua_franca',
		domain: 'linguistics',
		title: 'Les langues du commerce',
		description:
			"Sur les marchés du monde, il faut une langue commune. Le latin lie les clercs, l'arabe unit les marchands de Cordoue au Cathay, le persan est la langue des cours de Bagdad à Delhi. Les marchands apprennent les mots du profit.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'south_asia',
			'north_africa',
		],
		knowledgeLevel: 'known',
		requiredTechs: [],
		prerequisiteKnowledge: ['know_languages'],
		leadsToTechs: [],
		relatedResources: ['interprète', 'lexique', 'gestes'],
		keywords: [
			'langue',
			'commerce',
			'marchand',
			'interprète',
			'latin',
			'arabe',
			'persan',
			'parler',
			'négocier',
			'comprendre',
		],
		directAnswer:
			"Chaque grande zone commerciale a sa lingua franca. En Méditerranée, un sabir mêlant italien, arabe et grec permet aux marins de se comprendre. L'arabe est la langue du commerce de l'Atlantique à la mer de Chine. Le persan est la langue de prestige et de poésie des cours musulmanes orientales. Le latin est la langue de l'Église et des savants en Occident, mais le peuple parle ses dialectes locaux. En Chine, le chinois littéraire unit les lettrés malgré les différences entre dialectes parlés. Connaître deux langues double les opportunités.",
		referrals: [
			{
				type: 'npc_type',
				target: 'interprète',
				reason: 'Parle plusieurs langues et facilite le commerce',
				domain: 'linguistics',
			},
			{
				type: 'npc_type',
				target: 'marchand',
				reason: 'Apprend les langues nécessaires au négoce',
				domain: 'trade',
			},
		],
	},

	{
		id: 'know_translation_art',
		domain: 'linguistics',
		title: "L'art de la traduction",
		description:
			"Traduire, c'est faire passer un monde dans un autre. Les traducteurs de Tolède versent Aristote de l'arabe au latin. À Bagdad, la Maison de la Sagesse a traduit les Grecs en arabe. Chaque traduction est une renaissance du savoir.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_writing'],
		prerequisiteKnowledge: ['know_languages'],
		leadsToTechs: [],
		relatedResources: ['manuscrits', 'dictionnaire', 'scriptorium'],
		keywords: [
			'traduction',
			'traduire',
			'Tolède',
			'Bagdad',
			'Aristote',
			'manuscrit',
			'arabe',
			'latin',
			'grec',
			'savoir',
		],
		directAnswer:
			"La traduction est le pont entre les civilisations. Au IXe siècle, la Maison de la Sagesse à Bagdad a traduit en arabe les œuvres de Galien, Hippocrate, Aristote et Ptolémée — préservant un savoir que l'Occident avait oublié. À Tolède, les traducteurs chrétiens, juifs et musulmans travaillent ensemble pour rendre ces textes arabes en latin, ouvrant à l'Europe un trésor de science. Traduire exige de maîtriser les deux langues et le sujet — un mauvais traducteur peut corrompre le sens d'un texte pour des siècles.",
		referrals: [
			{
				type: 'institution',
				target: 'école_de_traduction',
				reason: 'Centre de traduction comme Tolède ou Bagdad',
				domain: 'linguistics',
			},
		],
	},

	// ========================================================================
	// ÉLEVAGE (compléments)
	// ========================================================================

	{
		id: 'know_horse_breeding',
		domain: 'husbandry',
		title: "L'élevage du cheval",
		description:
			'Le cheval est la monture du guerrier, le compagnon du cavalier, et la fierté du seigneur. Les Arabes élèvent les pur-sang les plus rapides, les steppes produisent les coursiers les plus endurants, et chaque peuple de cavaliers garde jalousement ses lignées.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['central_asia', 'middle_east', 'europe'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_animal_husbandry', 'tech_selective_breeding'],
		prerequisiteKnowledge: ['know_animal_husbandry'],
		leadsToTechs: ['tech_cavalry'],
		relatedResources: ['haras', 'fourrage', 'sellerie', 'maréchal_ferrant'],
		keywords: [
			'cheval',
			'élevage',
			'pur-sang',
			'jument',
			'étalon',
			'poulain',
			'cavalerie',
			'haras',
			'dressage',
			'monture',
		],
		directAnswer:
			"Le cheval arabe est le plus noble — fin, rapide, endurant. Les Bédouins transmettent les lignées de jument en jument, car c'est la mère qui donne le sang. Les chevaux des steppes, plus petits mais infatigables, portent les cavaliers mongols et turcs sur des milliers de lieues. En Europe, on croise les races pour obtenir des destriers de guerre, lourds et puissants, capables de porter un cavalier en armure. Le maréchal-ferrant ferre les sabots, le palefrenier nourrit et soigne. Un bon cheval vaut une fortune.",
		referrals: [
			{
				type: 'npc_type',
				target: 'éleveur_de_chevaux',
				reason: 'Sélectionne les lignées et élève les poulains',
				domain: 'husbandry',
			},
			{
				type: 'npc_type',
				target: 'maréchal_ferrant',
				reason: 'Ferre et soigne les sabots des chevaux',
				domain: 'husbandry',
			},
		],
	},

	{
		id: 'know_falconry',
		domain: 'husbandry',
		title: 'La fauconnerie',
		description:
			"L'art de dresser un rapace pour la chasse est le passe-temps des rois. Le faucon pèlerin, l'autour et l'épervier sont les oiseaux du noble. Savoir affaiter un rapace — le nourrir, le dresser au leurre, le rappeler — demande des années.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'central_asia'],
		knowledgeLevel: 'known',
		requiredTechs: [],
		prerequisiteKnowledge: ['know_animal_husbandry'],
		leadsToTechs: [],
		relatedResources: ['faucon', 'leurre', 'gant', 'chaperon'],
		keywords: [
			'faucon',
			'fauconnerie',
			'rapace',
			'chasse',
			'autour',
			'épervier',
			'leurre',
			'affaiter',
			'noble',
			'proie',
		],
		directAnswer:
			"La fauconnerie est le sport des rois et des émirs. L'oiseau est pris jeune au nid ou capturé adulte. Le fauconnier l'habitue à la main avec un gant de cuir, l'encapuchonne pour le calmer, et le dresse au leurre. Le faucon pèlerin fond du ciel à une vitesse fulgurante sur sa proie. L'autour chasse dans les bois, l'épervier prend les petits oiseaux. Les Arabes sont les plus grands fauconniers du monde — un faucon blanc de Sibérie vaut le prix de dix chevaux.",
		referrals: [
			{
				type: 'npc_type',
				target: 'fauconnier',
				reason: 'Dresse et entraîne les rapaces de chasse',
				domain: 'husbandry',
			},
		],
	},

	{
		id: 'know_beekeeping',
		domain: 'husbandry',
		title: "L'élevage des abeilles",
		description:
			"Le miel est la seule douceur du pauvre et le sucre du riche. Les abeilles, en plus du miel, fournissent la cire — indispensable pour les cierges des églises et les sceaux des lettres. L'apiculteur qui connaît ses ruches a un trésor.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'north_africa'],
		knowledgeLevel: 'mastered',
		requiredTechs: [],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['miel', 'cire', 'ruche', 'abeille'],
		keywords: [
			'abeille',
			'miel',
			'cire',
			'ruche',
			'apiculture',
			'essaim',
			'rayon',
			'récolte',
			'douceur',
			'hydromel',
		],
		directAnswer:
			"Les ruches sont faites de paille tressée ou de troncs évidés. L'apiculteur enfume les abeilles pour récolter le miel sans se faire piquer. Le miel guérit les plaies, adoucit les tisanes, conserve les fruits et se fermente en hydromel. La cire d'abeille, blanche et pure, fait les meilleurs cierges — l'Église en est le plus gros acheteur. Un essaim en bonne santé produit du miel à foison ; un mauvais hiver ou une maladie peut tuer toute la colonie.",
		referrals: [
			{
				type: 'npc_type',
				target: 'apiculteur',
				reason: 'Entretient les ruches et récolte miel et cire',
				domain: 'husbandry',
			},
		],
	},

	{
		id: 'know_cattle_raising',
		domain: 'husbandry',
		title: "L'élevage du bétail",
		description:
			'La vache donne le lait, le cuir, le fumier et la viande. Le bœuf tire la charrue et le chariot. Le troupeau est la richesse visible du paysan et la dot de la mariée dans bien des peuples.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'south_asia',
			'sub_saharan_africa',
			'middle_east',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_animal_husbandry'],
		prerequisiteKnowledge: ['know_animal_husbandry'],
		leadsToTechs: ['tech_selective_breeding'],
		relatedResources: ['bétail', 'fourrage', 'pâturage', 'étable'],
		keywords: [
			'vache',
			'bœuf',
			'taureau',
			'troupeau',
			'lait',
			'cuir',
			'viande',
			'pâturage',
			'fourrage',
			'berger',
		],
		directAnswer:
			'Le bétail est le fondement de la richesse rurale. La vache donne du lait pour le beurre et le fromage. Le bœuf, castré et dressé, tire la charrue et le chariot — sa force est irremplaçable. Le fumier enrichit les champs. Le cuir habille et protège. En Afrique et en Asie, le bétail est monnaie et prestige — les Masaïs comptent leur richesse en têtes de bétail. En Inde, la vache est sacrée. Nourrir le troupeau en hiver est le défi : il faut du foin, de la paille et un abri contre le gel.',
		referrals: [
			{
				type: 'npc_type',
				target: 'bouvier',
				reason: 'Élève et soigne le bétail',
				domain: 'husbandry',
			},
		],
	},

	// ========================================================================
	// ALCHIMIE (compléments)
	// ========================================================================

	{
		id: 'know_distillation',
		domain: 'alchemy',
		title: "L'art de la distillation",
		description:
			"L'alambic, invention arabe, sépare les esprits des corps. Par la chaleur, le liquide monte en vapeur, puis redescend purifié. On en tire des eaux florales, des essences, et — pour ceux qui savent — l'aqua vitae.",
		validFrom: 800,
		validTo: 9999,
		knownInRegions: ['middle_east', 'europe', 'north_africa'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_alchemy'],
		prerequisiteKnowledge: ['know_alchemy_basics'],
		leadsToTechs: ['tech_modern_chemistry'],
		relatedResources: ['alambic', 'fourneau', 'cornue', 'essences'],
		keywords: [
			'distillation',
			'alambic',
			'vapeur',
			'essence',
			'purifier',
			'eau-de-vie',
			'parfum',
			'alcool',
			'al-anbiq',
			'condensation',
		],
		directAnswer:
			"L'alambic (al-anbiq en arabe) est l'outil clé de la distillation. Le liquide est chauffé dans une cucurbite ; la vapeur monte dans le chapiteau, se condense dans le serpentin refroidi, et le distillat coule goutte à goutte. Jabir ibn Hayyan a perfectionné cette technique au VIIIe siècle. On distille les plantes pour en tirer des parfums et des remèdes, le vin pour obtenir l'aqua vitae (eau-de-vie), et les minerais pour purifier certains métaux. La distillation est au cœur du Grand Œuvre alchimique.",
		referrals: [
			{
				type: 'npc_type',
				target: 'alchimiste',
				reason: "Maîtrise l'alambic et les procédés de distillation",
				domain: 'alchemy',
			},
			{
				type: 'npc_type',
				target: 'apothicaire',
				reason: 'Distille des remèdes et des eaux florales',
				domain: 'medicine',
			},
		],
	},

	{
		id: 'know_transmutation_theory',
		domain: 'alchemy',
		title: 'La théorie de la transmutation',
		description:
			"Les alchimistes croient que tous les métaux sont un seul métal à différents stades de maturité. Le plomb est un or imparfait. La Pierre Philosophale, s'il est possible de la créer, achèverait ce que la nature a laissé inachevé.",
		validFrom: 300,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'east_asia'],
		knowledgeLevel: 'theoretical',
		requiredTechs: ['tech_basic_alchemy'],
		prerequisiteKnowledge: ['know_alchemy_basics'],
		leadsToTechs: ['tech_modern_chemistry'],
		relatedResources: ['four', 'creuset', 'mercure', 'soufre'],
		keywords: [
			'transmutation',
			'or',
			'plomb',
			'pierre philosophale',
			'mercure',
			'soufre',
			'élixir',
			'Grand Œuvre',
			'métal',
			'transformation',
		],
		directAnswer:
			"La théorie des alchimistes enseigne que tous les métaux sont composés de mercure et de soufre en proportions variables. L'or est le métal parfait — pur, incorruptible. Le plomb est l'or le plus impur. La Pierre Philosophale, agent de perfection, transmuerait les métaux vils en or et conférerait l'immortalité par l'élixir de longue vie. Nul n'a jamais prouvé cette transmutation, mais la quête a produit des savoirs réels : la distillation, la manipulation des acides, la connaissance des métaux. En Chine, les alchimistes taoïstes cherchent la pilule d'immortalité.",
		referrals: [
			{
				type: 'npc_type',
				target: 'alchimiste',
				reason: 'Poursuit le Grand Œuvre et étudie les métaux',
				domain: 'alchemy',
			},
		],
	},

	{
		id: 'know_dye_making',
		domain: 'alchemy',
		title: 'Les teintures et les pigments',
		description:
			"Les couleurs ne tombent pas du ciel — il faut les extraire. La garance donne le rouge, le pastel le bleu, la noix de galle le noir. Chaque teinte est un secret de nature arraché par l'art du teinturier.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'south_asia',
			'north_africa',
		],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_alchemy'],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['garance', 'pastel', 'indigo', 'mordant', 'cuve'],
		keywords: [
			'teinture',
			'pigment',
			'couleur',
			'rouge',
			'bleu',
			'garance',
			'indigo',
			'pourpre',
			'mordant',
			'cochenille',
		],
		directAnswer:
			"Les teintures naissent des plantes, des insectes et des minéraux. La garance (racine) donne un rouge profond, le pastel (feuilles) un bleu solide, l'indigo un bleu plus intense encore. La pourpre de Tyr, tirée du murex, est si rare et chère qu'elle est réservée aux empereurs. La cochenille, insecte écrasé, donne un carmin éclatant. Pour que la couleur tienne au tissu, il faut un mordant — alun, vinaigre ou urine. Le noir se fait avec la noix de galle et du fer. Chaque couleur a sa recette jalousement gardée par les guildes de teinturiers.",
		referrals: [
			{
				type: 'npc_type',
				target: 'teinturier',
				reason: 'Maîtrise les recettes des couleurs',
				domain: 'textiles',
			},
		],
	},

	// ========================================================================
	// CONSTRUCTION (compléments)
	// ========================================================================

	{
		id: 'know_bridge_building',
		domain: 'construction',
		title: 'La construction des ponts',
		description:
			'Un pont est un miracle de pierre ou de bois jeté par-dessus le vide. Les Romains bâtissaient en arches de pierre qui tiennent encore. Ailleurs, des ponts de corde, de bois ou de bateaux permettent de franchir les eaux.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'east_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_bridge_building'],
		prerequisiteKnowledge: ['know_stone_masonry'],
		leadsToTechs: [],
		relatedResources: ['pierre', 'bois', 'mortier', 'cintre'],
		keywords: [
			'pont',
			'arche',
			'pilier',
			'rivière',
			'traverser',
			'péage',
			'gué',
			'passerelle',
			'romain',
			'chaussée',
		],
		directAnswer:
			"Construire un pont en pierre exige des fondations solides dans le lit du fleuve — on utilise des batardeaux pour assécher la zone de travail. Les arches, construites sur des cintres de bois temporaires, répartissent le poids vers les piliers. Les ponts romains, avec leur mortier de pouzzolane, durent des siècles. Les ponts de bois sont plus rapides à construire mais brûlent et pourrissent. En Chine, les ponts en arc de pierre atteignent des portées remarquables. Chaque pont rapporte un péage au seigneur qui le contrôle — un pont est une source de revenus autant qu'un passage.",
		referrals: [
			{
				type: 'npc_type',
				target: 'maître_maçon',
				reason: 'Conçoit et dirige la construction des ponts',
				domain: 'construction',
			},
		],
	},

	{
		id: 'know_castle_architecture',
		domain: 'construction',
		title: "L'architecture des châteaux",
		description:
			"Le château fort est à la fois demeure du seigneur et forteresse. Murs épais, tours rondes, douves, herse et mâchicoulis — chaque élément est pensé pour résister à l'assaut. L'art de bâtir un château évolue avec l'art de l'attaquer.",
		validFrom: 900,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_fortification'],
		prerequisiteKnowledge: ['know_fortification', 'know_stone_masonry'],
		leadsToTechs: ['tech_star_fort'],
		relatedResources: ['pierre', 'mortier', 'bois', 'fer'],
		keywords: [
			'château',
			'donjon',
			'rempart',
			'tour',
			'douve',
			'herse',
			'mâchicoulis',
			'meurtrière',
			'enceinte',
			'forteresse',
		],
		directAnswer:
			"Un bon château commence par le site — une colline, un éperon rocheux, un méandre de rivière. Le donjon est le cœur de la défense, la dernière retraite. L'enceinte de murailles est flanquée de tours qui permettent le tir croisé. Les mâchicoulis surplombent la base des murs pour déverser pierres et liquides brûlants. Les douves empêchent l'approche et la sape. En Orient, les Croisés ont découvert les forteresses byzantines et arabes — ribats et krak — et rapporté leurs techniques. Un château bien construit peut résister des mois à un siège.",
		referrals: [
			{
				type: 'npc_type',
				target: 'maître_maçon',
				reason: 'Architecte militaire spécialisé dans les fortifications',
				domain: 'construction',
			},
			{
				type: 'npc_type',
				target: 'ingénieur_militaire',
				reason: "Conçoit les défenses et les machines d'assaut",
				domain: 'military',
			},
		],
	},

	{
		id: 'know_aqueduct_engineering',
		domain: 'construction',
		title: "Les aqueducs et l'eau",
		description:
			"Les Romains ont compris que l'eau coule vers le bas — et sur ce principe simple, ils ont bâti des merveilles. Des aqueducs de pierre, certains hauts de trente mètres, amenaient l'eau fraîche des montagnes jusqu'au cœur des cités.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'southern_europe'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_aqueduct'],
		prerequisiteKnowledge: ['know_stone_masonry'],
		leadsToTechs: [],
		relatedResources: ['pierre', 'plomb', 'tuyaux', 'citerne'],
		keywords: [
			'aqueduc',
			'eau',
			'fontaine',
			'citerne',
			'canal',
			'pente',
			'romain',
			'tuyau',
			'source',
			'irrigation',
		],
		directAnswer:
			"L'aqueduc est un canal en pente douce — quelques centimètres par lieue suffisent — qui amène l'eau de source jusqu'à la ville par la seule force de la gravité. Les Romains en ont construit des dizaines : le Pont du Gard franchit la vallée du Gardon sur trois niveaux d'arches. Certains fonctionnent encore mille ans après. Les Arabes ont perfectionné les qanats — galeries souterraines qui captent l'eau des nappes phréatiques en terrain aride. Les citernes de Constantinople stockent des millions de litres sous la ville. Amener l'eau propre est la première condition d'une grande cité.",
		referrals: [
			{
				type: 'npc_type',
				target: 'ingénieur_hydraulique',
				reason: "Conçoit les systèmes d'adduction d'eau",
				domain: 'engineering',
			},
		],
	},

	// ========================================================================
	// PHILOSOPHIE (compléments)
	// ========================================================================

	{
		id: 'know_aristotelian_logic',
		domain: 'philosophy',
		title: "La logique d'Aristote",
		description:
			"Le Stagirite a posé les règles du raisonnement juste. Le syllogisme — si tout A est B, et tout B est C, alors tout A est C — est l'outil de quiconque veut penser droit et confondre le sophiste.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_philosophy'],
		prerequisiteKnowledge: ['know_philosophy_basics'],
		leadsToTechs: ['tech_scientific_method'],
		relatedResources: ['Organon', 'manuscrit', 'disputatio'],
		keywords: [
			'logique',
			'Aristote',
			'syllogisme',
			'raisonnement',
			'argument',
			'démonstration',
			'catégorie',
			'prémisse',
			'conclusion',
			'dialectique',
		],
		directAnswer:
			"Aristote a fondé la logique formelle dans l'Organon. Le syllogisme est son outil premier : deux prémisses mènent nécessairement à une conclusion. Par exemple : tout homme est mortel, Socrate est un homme, donc Socrate est mortel. Cette méthode permet de distinguer le vrai du faux, le raisonnement valide du sophisme. Les philosophes arabes — al-Farabi, Avicenne — ont commenté et enrichi Aristote. En Occident, on redécouvre son œuvre par les traductions latines. La disputatio universitaire, art du débat contradictoire, repose entièrement sur la logique aristotélicienne.",
		referrals: [
			{
				type: 'npc_type',
				target: 'philosophe',
				reason: 'Enseigne la logique et le raisonnement',
				domain: 'philosophy',
			},
			{
				type: 'institution',
				target: 'université',
				reason: "La logique est la base de l'enseignement universitaire",
				domain: 'philosophy',
			},
		],
	},

	{
		id: 'know_confucian_thought',
		domain: 'philosophy',
		title: 'La pensée de Confucius',
		description:
			"Confucius a enseigné que l'ordre du monde commence par l'ordre de soi. La piété filiale, le respect des rites, la vertu du prince — ces principes gouvernent l'Empire du Milieu et façonnent l'Orient depuis quinze siècles.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['east_asia'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_basic_philosophy'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_civil_examination'],
		relatedResources: ['Analectes', 'rites', 'temple_confucéen'],
		keywords: [
			'Confucius',
			'piété_filiale',
			'vertu',
			'rite',
			'lettré',
			'mandarin',
			'harmonie',
			'respect',
			'maître',
			'savoir',
		],
		directAnswer:
			"Confucius (Kong Fuzi) a enseigné cinq relations fondamentales : prince et sujet, père et fils, époux et épouse, frère aîné et cadet, ami et ami. Chacun doit jouer son rôle avec vertu (ren) et respecter les rites (li). Le prince gouverne par l'exemple moral, non par la force. L'étude des classiques forme le lettré accompli. Le système des examens impériaux sélectionne les fonctionnaires sur leur maîtrise de ces textes. La piété filiale — le respect absolu envers les parents — est le fondement de toute vertu.",
		referrals: [
			{
				type: 'npc_type',
				target: 'lettré_confucéen',
				reason: 'Étudie les classiques et enseigne la vertu',
				domain: 'philosophy',
			},
			{
				type: 'institution',
				target: 'académie_impériale',
				reason: 'Centre des études confucéennes et des examens',
				domain: 'philosophy',
			},
		],
	},

	{
		id: 'know_neoplatonism',
		domain: 'philosophy',
		title: 'Le néoplatonisme',
		description:
			"Plotin a enseigné que tout émane de l'Un — une source unique d'où coulent l'Intellect, l'Âme et le monde sensible. Cette vision, mêlée au christianisme et à l'islam, nourrit la mystique de l'Orient et de l'Occident.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east'],
		knowledgeLevel: 'theoretical',
		requiredTechs: ['tech_basic_philosophy'],
		prerequisiteKnowledge: ['know_philosophy_basics'],
		leadsToTechs: [],
		relatedResources: ['Ennéades', 'manuscrit', 'commentaire'],
		keywords: [
			'Plotin',
			'néoplatonisme',
			'Un',
			'émanation',
			'âme',
			'intellect',
			'mystique',
			'Platon',
			'contemplation',
			'hiérarchie',
		],
		directAnswer:
			"Pour les néoplatoniciens, tout ce qui existe émane de l'Un — source absolue, au-delà de toute pensée. De l'Un procède l'Intellect (Nous), de l'Intellect procède l'Âme du Monde, et de l'Âme procède la matière. Le but de l'âme humaine est de remonter vers l'Un par la contemplation et la purification. Cette philosophie a profondément influencé les Pères de l'Église (Augustin), les mystiques musulmans (les soufis), et les philosophes juifs. Pseudo-Denys l'Aréopagite a transmis cette vision en hiérarchies célestes et ecclésiastiques.",
		referrals: [
			{
				type: 'npc_type',
				target: 'philosophe',
				reason: 'Étudie les textes de Plotin et de Proclus',
				domain: 'philosophy',
			},
		],
	},

	// ========================================================================
	// ASTRONOMIE (compléments)
	// ========================================================================

	{
		id: 'know_lunar_calendar',
		domain: 'astronomy',
		title: 'Le calendrier lunaire',
		description:
			'La lune règle le temps de bien des peuples. Les mois islamiques suivent ses phases, les fêtes juives se calent sur ses cycles, et les paysans sèment et récoltent selon ses quartiers. Vingt-neuf jours et demi font un mois lunaire.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['middle_east', 'east_asia', 'south_asia', 'north_africa'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_calendar'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_advanced_astronomy'],
		relatedResources: ['lune', 'tables', 'observation', 'almanach'],
		keywords: [
			'lune',
			'calendrier',
			'mois',
			'croissant',
			'pleine_lune',
			'phase',
			'ramadan',
			'marée',
			'cycle',
			'quartier',
		],
		directAnswer:
			"Le calendrier lunaire compte douze mois de 29 ou 30 jours, soit 354 jours par an — onze de moins que l'année solaire. Le calendrier islamique (hégirien) est purement lunaire : le ramadan recule chaque année de onze jours par rapport aux saisons. Les calendriers chinois, juif et hindou sont luni-solaires : ils ajoutent un mois intercalaire tous les deux ou trois ans pour rester synchronisés avec les saisons. La nouvelle lune marque le début du mois ; sa première observation déclenche les fêtes religieuses.",
		referrals: [
			{
				type: 'npc_type',
				target: 'astronome',
				reason: 'Calcule les phases de la lune et les calendriers',
				domain: 'astronomy',
			},
		],
	},

	{
		id: 'know_zodiac_astrology',
		domain: 'astronomy',
		title: 'Le zodiaque et les astres',
		description:
			"Les étoiles forment douze constellations sur le chemin du soleil — le zodiaque. Chaque signe influence, dit-on, le destin des hommes et des royaumes. L'astrologue lit le ciel pour conseiller le prince.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'south_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_astronomy'],
		prerequisiteKnowledge: ['know_basic_astronomy'],
		leadsToTechs: ['tech_astrolabe'],
		relatedResources: ['astrolabe', 'tables_astronomiques', 'horoscope'],
		keywords: [
			'zodiaque',
			'signe',
			'planète',
			'horoscope',
			'astrologue',
			'conjonction',
			'Saturne',
			'Jupiter',
			'Mars',
			'influence',
		],
		directAnswer:
			"Le zodiaque est une bande du ciel divisée en douze signes — Bélier, Taureau, Gémeaux et ainsi de suite. Le soleil, la lune et les cinq planètes visibles (Mercure, Vénus, Mars, Jupiter, Saturne) traversent ces signes au fil de l'année. Les astrologues dressent des horoscopes en notant la position des astres à la naissance d'un prince ou au moment d'une décision importante. Saturne annonce le malheur, Jupiter la prospérité, Mars la guerre. Les savants arabes sont les meilleurs astronomes-astrologues — leurs tables permettent de calculer les positions planétaires avec une grande précision.",
		referrals: [
			{
				type: 'npc_type',
				target: 'astrologue',
				reason: 'Dresse les horoscopes et lit les signes célestes',
				domain: 'astronomy',
			},
		],
	},

	{
		id: 'know_eclipse_prediction',
		domain: 'astronomy',
		title: 'Prédire les éclipses',
		description:
			"Quand le soleil s'éteint en plein jour ou que la lune rougit dans la nuit, le peuple tremble. Mais les astronomes savent calculer ces événements — les cycles de Saros permettent de prédire les éclipses des décennies à l'avance.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['middle_east', 'east_asia', 'south_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_astronomy', 'tech_basic_mathematics'],
		prerequisiteKnowledge: ['know_basic_astronomy'],
		leadsToTechs: ['tech_advanced_astronomy'],
		relatedResources: ['tables', 'calculs', 'observation'],
		keywords: [
			'éclipse',
			'soleil',
			'lune',
			'ombre',
			'Saros',
			'prédiction',
			'obscurité',
			'calcul',
			'cycle',
			'prodige',
		],
		directAnswer:
			"Une éclipse de soleil survient quand la lune passe exactement entre le soleil et la terre. Une éclipse de lune, quand la terre projette son ombre sur la lune. Le cycle de Saros — 223 lunaisons, soit environ 18 ans — répète les mêmes éclipses avec un décalage prévisible. Les astronomes babyloniens avaient déjà découvert ce cycle. Les Chinois prédisent les éclipses avec précision, et un astronome qui échoue risque la disgrâce. En terre d'islam, al-Battani et d'autres ont affiné les calculs. Le peuple y voit des présages ; les savants y voient des mathématiques.",
		referrals: [
			{
				type: 'npc_type',
				target: 'astronome',
				reason: 'Calcule les éclipses et tient les tables astronomiques',
				domain: 'astronomy',
			},
		],
	},

	// ========================================================================
	// TEXTILES (compléments)
	// ========================================================================

	{
		id: 'know_dyeing_techniques',
		domain: 'textiles',
		title: 'La teinture des étoffes',
		description:
			"La couleur fait la valeur du tissu. Un drap bien teint au bleu de pastel vaut deux fois un drap écru. Les teinturiers sont des artisans respectés — et redoutés pour l'odeur de leurs cuves d'urine et de mordant.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'east_asia', 'south_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_weaving'],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['cuve', 'mordant', 'alun', 'indigo', 'garance'],
		keywords: [
			'teinture',
			'couleur',
			'étoffe',
			'tissu',
			'mordant',
			'alun',
			'pastel',
			'garance',
			'cuve',
			'trempage',
		],
		directAnswer:
			"Teindre un tissu nécessite trois étapes. D'abord, le mordançage : le tissu est trempé dans une solution d'alun ou d'un autre fixateur pour que la couleur tienne. Ensuite, la teinture : le tissu plonge dans la cuve de colorant — garance pour le rouge, pastel ou indigo pour le bleu, gaude pour le jaune. Enfin, le rinçage et le séchage. Les couleurs les plus coûteuses — le pourpre de murex, le kermès écarlate — sont réservées aux riches. Les guildes de teinturiers en Europe gardent leurs recettes secrètes. En Inde, les techniques de réserve (batik) créent des motifs complexes.",
		referrals: [
			{
				type: 'npc_type',
				target: 'teinturier',
				reason: 'Spécialiste des bains de couleur et des mordants',
				domain: 'textiles',
			},
		],
	},

	{
		id: 'know_cotton_processing',
		domain: 'textiles',
		title: 'Le coton, fleur du Sud',
		description:
			"La fleur de coton pousse dans les terres chaudes de l'Inde et de l'Égypte. Une fois cueillie, cardée et filée, elle donne un tissu léger et doux — plus frais que la laine, moins cher que la soie.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['south_asia', 'middle_east', 'east_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_weaving'],
		prerequisiteKnowledge: [],
		leadsToTechs: ['tech_spinning_jenny'],
		relatedResources: ['coton', 'fuseau', 'métier_à_tisser', 'cardeuse'],
		keywords: [
			'coton',
			'fil',
			'tisser',
			'carder',
			'filer',
			'tissu',
			'Inde',
			'Égypte',
			'léger',
			'vêtement',
		],
		directAnswer:
			"Le coton est une fibre végétale qui entoure les graines de la plante. La récolte se fait à la main, fleur par fleur. Les graines sont séparées des fibres au peigne ou au rouleau. Les fibres sont ensuite cardées (démêlées), puis filées au fuseau ou au rouet pour donner du fil. Le fil est tissé sur un métier pour produire le tissu. L'Inde est la grande maîtresse du coton — ses mousselines de Dacca sont si fines qu'on les dit tissées de vent. Le coton indien arrive en Europe et dans le monde arabe par les routes commerciales maritimes.",
		referrals: [
			{
				type: 'npc_type',
				target: 'tisserand',
				reason: 'Tisse le coton sur son métier',
				domain: 'textiles',
			},
			{
				type: 'trade_route',
				target: 'tr_indian_ocean',
				reason: "Le coton indien voyage par l'océan Indien",
				domain: 'trade',
			},
		],
	},

	// ========================================================================
	// AGRICULTURE (compléments)
	// ========================================================================

	{
		id: 'know_terracing',
		domain: 'agriculture',
		title: 'Les terrasses et les pentes',
		description:
			'Quand la terre manque dans la plaine, le paysan grimpe sur la montagne. En creusant des terrasses — marches de terre retenues par des murets — il transforme une pente stérile en champs fertiles. Les Incas et les Chinois en ont fait un art.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['east_asia', 'south_asia', 'southeast_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_terracing'],
		prerequisiteKnowledge: ['know_basic_farming'],
		leadsToTechs: [],
		relatedResources: ['muret', 'irrigation', 'pente', 'riz'],
		keywords: [
			'terrasse',
			'pente',
			'montagne',
			'muret',
			'rizière',
			'irrigation',
			'érosion',
			'niveau',
			'canaux',
			'escalier',
		],
		directAnswer:
			"Les terrasses transforment les collines en escaliers cultivables. Chaque niveau est retenu par un muret de pierre ou de terre battue. L'eau descend de terrasse en terrasse par des canaux soigneusement calibrés. En Chine du Sud et en Asie du Sud-Est, les rizières en terrasses sont des merveilles d'ingénierie paysanne — certaines ont plus de mille ans. Au Yémen, les terrasses de montagne captent la moindre pluie. En Amérique, les civilisations andines cultivent le maïs et la pomme de terre sur des terrasses à plus de 3000 mètres d'altitude.",
		referrals: [
			{
				type: 'npc_type',
				target: 'paysan_montagnard',
				reason: 'Maîtrise la construction et la culture en terrasses',
				domain: 'agriculture',
			},
		],
	},

	{
		id: 'know_rice_cultivation',
		domain: 'agriculture',
		title: 'La culture du riz',
		description:
			"Le riz est le grain de l'Orient — il nourrit plus de la moitié du monde connu. Les rizières inondées, où le grain pousse les pieds dans l'eau, exigent une maîtrise parfaite de l'irrigation et un labeur immense.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['east_asia', 'south_asia', 'southeast_asia'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_basic_agriculture', 'tech_irrigation'],
		prerequisiteKnowledge: ['know_irrigation'],
		leadsToTechs: [],
		relatedResources: ['riz', 'eau', 'rizière', 'buffle'],
		keywords: [
			'riz',
			'rizière',
			'paddy',
			'inondé',
			'repiquage',
			'récolte',
			'buffle',
			'mousson',
			'grain',
			'eau',
		],
		directAnswer:
			"La culture du riz irrigué est l'agriculture la plus productive du monde. Les grains sont d'abord semés en pépinière, puis les plantules sont repiquées à la main dans des champs inondés — un travail épuisant qui mobilise tout le village. L'eau doit être à la bonne hauteur : trop peu et le riz sèche, trop et il est noyé. Le buffle tire la herse dans la boue. La mousson apporte l'eau nécessaire. En Chine, les variétés de riz précoce Champa, venues du Vietnam, permettent désormais deux récoltes par an, ce qui a doublé la production et la population.",
		referrals: [
			{
				type: 'npc_type',
				target: 'riziculteur',
				reason: 'Maîtrise le cycle complet de la culture du riz',
				domain: 'agriculture',
			},
		],
	},

	// ========================================================================
	// NAVIGATION (compléments)
	// ========================================================================

	{
		id: 'know_coastal_piloting',
		domain: 'navigation',
		title: 'Le cabotage et le pilotage côtier',
		description:
			'Avant la haute mer, il y a la côte. Le pilote côtier connaît chaque cap, chaque récif, chaque mouillage sûr. Naviguer en vue de terre est plus lent mais bien plus sûr — et quand la tempête gronde, la côte sauve des vies.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'east_asia', 'southeast_asia'],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_basic_sailing'],
		prerequisiteKnowledge: ['know_basic_sailing'],
		leadsToTechs: ['tech_celestial_navigation'],
		relatedResources: ['carte_côtière', 'sonde', 'phare', 'amers'],
		keywords: [
			'côte',
			'cabotage',
			'pilote',
			'récif',
			'mouillage',
			'phare',
			'cap',
			'baie',
			'port',
			'sonde',
		],
		directAnswer:
			"Le cabotage — la navigation le long des côtes — est la façon la plus sûre de voyager par mer. Le pilote côtier reconnaît les amers (points de repère sur la côte), sonde la profondeur avec un plomb lesté, et sait où jeter l'ancre à l'abri du vent. Les phares et feux de port guidaient déjà les marins antiques. En Méditerranée, les portulans indiquent chaque cap, chaque baie, chaque danger. Le cabotage est lent — il faut suivre les détours de la côte — mais il permet de se ravitailler en eau et nourriture à chaque escale.",
		referrals: [
			{
				type: 'npc_type',
				target: 'pilote_côtier',
				reason: 'Connaît les côtes et guide les navires au port',
				domain: 'navigation',
			},
		],
	},

	{
		id: 'know_star_navigation',
		domain: 'navigation',
		title: 'La navigation aux étoiles',
		description:
			"Les Arabes et les Polynésiens ont appris à lire le ciel pour traverser les océans sans terre en vue. L'étoile polaire, la Croix du Sud, la position des constellations — les étoiles sont les phares du navigateur hauturier.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['middle_east', 'southeast_asia', 'south_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_celestial_navigation'],
		prerequisiteKnowledge: ['know_celestial_navigation'],
		leadsToTechs: ['tech_astrolabe'],
		relatedResources: ['étoile_polaire', 'kamal', 'astrolabe'],
		keywords: [
			'étoile',
			'polaire',
			'ciel',
			'nuit',
			'constellation',
			'latitude',
			'kamal',
			'navigation',
			'hauturier',
			'horizon',
		],
		directAnswer:
			"Le navigateur hauturier mesure la hauteur de l'étoile polaire au-dessus de l'horizon pour estimer sa latitude. Les Arabes utilisent le kamal — une planchette tenue à bout de bras avec une ficelle entre les dents — pour mesurer cet angle. Les Polynésiens, sans aucun instrument, mémorisent des centaines d'étoiles et leur position au lever et au coucher pour naviguer entre les îles du Pacifique. L'astrolabe nautique, perfectionné par les Arabes, permet des mesures plus précises. Plus on va vers le sud, plus l'étoile polaire descend vers l'horizon, et d'autres repères prennent le relais.",
		referrals: [
			{
				type: 'npc_type',
				target: 'navigateur',
				reason: 'Maîtrise la navigation astronomique',
				domain: 'navigation',
			},
		],
	},

	// ========================================================================
	// COMMERCE (compléments)
	// ========================================================================

	{
		id: 'know_banking_credit',
		domain: 'trade',
		title: 'Le crédit et les lettres de change',
		description:
			"Transporter de l'or sur les routes est dangereux. Les marchands de Bagdad ont inventé la lettre de change — un bout de papier qui vaut de l'or dans une autre ville. Cette magie de la confiance est la base du commerce à longue distance.",
		validFrom: 800,
		validTo: 9999,
		knownInRegions: ['middle_east', 'europe', 'east_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_banking_basic', 'tech_coinage'],
		prerequisiteKnowledge: ['know_basic_trade'],
		leadsToTechs: ['tech_double_entry_bookkeeping'],
		relatedResources: ['lettre_de_change', 'comptoir', 'or', 'sceau'],
		keywords: [
			'banque',
			'crédit',
			'lettre_de_change',
			'prêt',
			'intérêt',
			'or',
			'change',
			'comptoir',
			'dette',
			'remboursement',
		],
		directAnswer:
			"La lettre de change permet de déposer de l'or chez un banquier dans une ville et de retirer la somme équivalente chez son correspondant dans une autre ville, moyennant une commission. C'est plus sûr que de voyager avec des sacs de pièces. Les marchands musulmans ont développé le suftaja et le hawala, systèmes de transfert basés sur la confiance entre correspondants. En Chine, les marchands de Shanxi opèrent un réseau similaire. L'Église interdit le prêt à intérêt (usure) aux chrétiens, mais les Juifs et les Lombards remplissent ce rôle en Europe.",
		referrals: [
			{
				type: 'npc_type',
				target: 'banquier',
				reason: 'Émet des lettres de change et gère les dépôts',
				domain: 'trade',
			},
			{
				type: 'npc_type',
				target: 'changeur',
				reason: 'Convertit les monnaies et évalue les pièces',
				domain: 'trade',
			},
		],
	},

	{
		id: 'know_weights_measures',
		domain: 'trade',
		title: 'Les poids et mesures',
		description:
			"Une livre à Paris ne pèse pas comme une livre à Londres, et un boisseau de grain varie d'un marché à l'autre. Les poids et mesures sont le nerf du commerce honnête — et la source d'innombrables disputes.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'south_asia',
			'north_africa',
		],
		knowledgeLevel: 'mastered',
		requiredTechs: ['tech_coinage'],
		prerequisiteKnowledge: ['know_basic_trade'],
		leadsToTechs: [],
		relatedResources: ['balance', 'poids_étalon', 'mesure', 'sceau'],
		keywords: [
			'poids',
			'mesure',
			'balance',
			'livre',
			'boisseau',
			'coudée',
			'étalon',
			'fraude',
			'marché',
			'once',
		],
		directAnswer:
			"Chaque cité, chaque royaume a ses propres poids et mesures — c'est un cauchemar pour le marchand. La livre de Paris (489 grammes) diffère de la livre de Londres. Le boisseau de blé varie d'un marché à l'autre. En terre d'islam, le dirham et le mithqal sont plus standardisés. En Chine, le système de poids impérial est unifié. Au marché, la balance est l'arbitre — mais les poids peuvent être truqués. Le seigneur ou la guilde fixe les étalons officiels et les garde sous scellé. L'inspecteur des marchés (muhtasib en islam, prévôt des marchands en France) vérifie l'honnêteté des mesures.",
		referrals: [
			{
				type: 'npc_type',
				target: 'inspecteur_marché',
				reason: 'Vérifie les poids et mesures sur les marchés',
				domain: 'trade',
			},
		],
	},

	// ========================================================================
	// INGÉNIERIE (compléments)
	// ========================================================================

	{
		id: 'know_windmill_tech',
		domain: 'engineering',
		title: 'Le moulin à vent',
		description:
			"Là où l'eau manque, le vent travaille. Les Persans ont inventé le moulin à vent, captant le souffle du désert pour moudre le grain. L'idée a voyagé vers l'Europe où les ailes se dressent maintenant dans les plaines venteuses.",
		validFrom: 600,
		validTo: 9999,
		knownInRegions: ['middle_east', 'europe', 'central_asia'],
		knowledgeLevel: 'known',
		requiredTechs: [],
		prerequisiteKnowledge: ['know_water_mill'],
		leadsToTechs: ['tech_windmill'],
		relatedResources: ['moulin', 'meule', 'ailes', 'vent', 'grain'],
		keywords: [
			'moulin',
			'vent',
			'ailes',
			'moudre',
			'grain',
			'farine',
			'Perse',
			'meule',
			'rotation',
			'énergie',
		],
		directAnswer:
			"Le moulin à vent capte l'énergie du vent avec des ailes montées sur un axe rotatif. Les premiers moulins à vent, inventés en Perse au VIIe siècle, avaient un axe vertical avec des voiles de tissu. Les moulins européens, apparus au XIIe siècle, ont un axe horizontal et des ailes orientables face au vent. Ils moulent le grain en farine, pompent l'eau des marais et broient diverses matières. Là où il n'y a pas de rivière assez forte pour un moulin à eau, le moulin à vent prend le relais. La construction du mécanisme exige un charpentier habile et un forgeron pour les pièces métalliques.",
		referrals: [
			{
				type: 'npc_type',
				target: 'meunier',
				reason: 'Opère le moulin et moud le grain',
				domain: 'engineering',
			},
		],
	},

	// ========================================================================
	// MÉTALLURGIE (compléments)
	// ========================================================================

	{
		id: 'know_gold_working',
		domain: 'metallurgy',
		title: "L'art de l'orfèvre",
		description:
			"L'or ne rouille pas, ne ternit pas et brille éternellement. L'orfèvre le martèle en feuilles, le coule en moules, le tresse en filigranes. Couronnes, calices, bijoux — l'or transformé est le sommet de l'art des métaux.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: [
			'europe',
			'middle_east',
			'east_asia',
			'south_asia',
			'sub_saharan_africa',
		],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_gold_silver_working'],
		prerequisiteKnowledge: [],
		leadsToTechs: [],
		relatedResources: ['or', 'argent', 'marteau', 'moule', 'creuset'],
		keywords: [
			'or',
			'orfèvre',
			'filigrane',
			'dorure',
			'bijou',
			'couronne',
			'argent',
			'repoussé',
			'ciselure',
			'joaillerie',
		],
		directAnswer:
			"L'orfèvre travaille les métaux précieux avec une patience infinie. La technique du repoussé crée des reliefs en martelant une feuille d'or par-derrière. Le filigrane torsade des fils d'or en motifs délicats. La granulation soude de minuscules billes d'or sur une surface. La dorure au mercure (amalgame) recouvre d'or les objets de bronze. Les Byzantins excellent dans l'émaillerie cloisonnée — des alvéoles d'or remplies d'émail coloré. En Afrique de l'Ouest, les Akan coulent des poids à peser l'or en bronze, œuvres d'art miniatures. Un orfèvre de talent est courtisé par les rois et les évêques.",
		referrals: [
			{
				type: 'npc_type',
				target: 'orfèvre',
				reason: 'Maître des métaux précieux et de la joaillerie',
				domain: 'metallurgy',
			},
		],
	},

	// ========================================================================
	// MILITAIRE (compléments)
	// ========================================================================

	{
		id: 'know_naval_warfare',
		domain: 'military',
		title: 'La guerre sur mer',
		description:
			"Le combat naval est un art à part. L'abordage, le bélier, le feu grégeois — chaque flotte a ses tactiques. Les Byzantins dominent avec le feu grégeois, les Vikings avec la rapidité, les Chinois avec les jonques de guerre.",
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['europe', 'middle_east', 'east_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_basic_sailing'],
		prerequisiteKnowledge: ['know_basic_sailing'],
		leadsToTechs: ['tech_galleon'],
		relatedResources: ['galère', 'dromon', 'feu_grégeois', 'archers'],
		keywords: [
			'naval',
			'galère',
			'abordage',
			'bélier',
			'feu_grégeois',
			'flotte',
			'amiral',
			'mer',
			'combat',
			'Viking',
		],
		directAnswer:
			"La guerre navale en Méditerranée repose sur la galère — un navire long et bas, propulsé par des rameurs, armé d'un éperon et de soldats. Le dromon byzantin crache le feu grégeois, un liquide incendiaire impossible à éteindre avec de l'eau — son secret est jalousement gardé. Les Vikings abordent avec leurs drakkars légers et rapides, déversant des guerriers sur le pont ennemi. En Chine, les jonques de guerre portent des catapultes et des bombes incendiaires. La clé d'une bataille navale est le vent, le courant et la manœuvre — couper la ligne ennemie, encercler, éperonner.",
		referrals: [
			{
				type: 'npc_type',
				target: 'amiral',
				reason: 'Commande la flotte et connaît les tactiques navales',
				domain: 'military',
			},
		],
	},

	// ========================================================================
	// MÉDECINE (compléments)
	// ========================================================================

	{
		id: 'know_surgical_knowledge',
		domain: 'medicine',
		title: 'La chirurgie',
		description:
			'Le chirurgien est le plus courageux des médecins — il ouvre le corps avec le fer. Al-Zahrawi a codifié deux cents instruments chirurgicaux. En Occident, les barbiers-chirurgiens cautérisent, amputent et réduisent les fractures.',
		validFrom: 0,
		validTo: 9999,
		knownInRegions: ['middle_east', 'europe', 'east_asia', 'south_asia'],
		knowledgeLevel: 'known',
		requiredTechs: ['tech_herbal_medicine'],
		prerequisiteKnowledge: ['know_humoral_medicine'],
		leadsToTechs: ['tech_anatomy', 'tech_antiseptic_surgery'],
		relatedResources: ['bistouri', 'cautère', 'ligature', 'éponge'],
		keywords: [
			'chirurgie',
			'opération',
			'amputation',
			'cautériser',
			'fracture',
			'instrument',
			'plaie',
			'saigner',
			'recoudre',
			'barbier',
		],
		directAnswer:
			"La chirurgie est l'art de guérir par le fer et le feu. Al-Zahrawi (Albucasis), médecin de Cordoue, a décrit dans son Kitab al-Tasrif plus de deux cents instruments : scalpels, pinces, cautères, sondes. Il savait ligaturer les artères, retirer les calculs de la vessie, et opérer les yeux de la cataracte. En Europe, le chirurgien est souvent un barbier — il saigne, arrache les dents, réduit les fractures et ampute les membres gangrenés. La cautérisation au fer rouge stoppe les hémorragies mais inflige une souffrance terrible. La douleur est le grand obstacle — le pavot et la mandragore endorment un peu, mais pas assez.",
		referrals: [
			{
				type: 'npc_type',
				target: 'chirurgien',
				reason: 'Opère les blessures et les maladies chirurgicales',
				domain: 'medicine',
			},
			{
				type: 'npc_type',
				target: 'barbier_chirurgien',
				reason: 'Pratique la petite chirurgie et la saignée',
				domain: 'medicine',
			},
		],
	},
]
