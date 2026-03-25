import type { InformationVector } from '../../../shared/src/types/world'

// ============================================================================
// VECTEURS D'INFORMATION — Canaux de communication à travers les époques
// ============================================================================
// Chaque vecteur définit comment l'information circule : vitesse, portée,
// fiabilité, classes sociales concernées, et si un chat joueur est débloqué.
//
// La propagationSpeed est en km/jour de jeu.
// Le decayPerRelay est un multiplicateur : accuracy *= (1 - decayPerRelay) par relais.
// ============================================================================

export const informationVectors: InformationVector[] = [
	// ========================================================================
	// VECTEURS MÉDIÉVAUX (disponibles dès l'an 1000)
	// ========================================================================

	{
		id: 'vec_peasant_gossip',
		name: 'Ragots paysans',
		description:
			"Le bouche-à-oreille entre villages voisins. Lent, limité et très déformé, mais c'est le seul canal dont disposent les paysans.",
		categories: [
			'natural_disaster',
			'epidemic',
			'military',
			'crime',
			'personal',
		],
		propagationSpeed: 5,
		maxRange: 50,
		baseAccuracy: 0.3,
		decayPerRelay: 0.25,
		requiredTechs: [],
		minYear: 0,
		receiverClasses: ['peasant', 'artisan'],
		emitterClasses: ['peasant', 'artisan'],
		requiresCoast: false,
		requiresTradeRoute: false,
		enablesPlayerChat: false,
		chatMode: null,
		chatDelay: 0,
	},

	{
		id: 'vec_merchant_news',
		name: 'Nouvelles marchandes',
		description:
			'Les marchands itinérants transportent des nouvelles le long des routes commerciales. Fiabilité moyenne — ils exagèrent volontiers pour impressionner.',
		categories: [
			'economic',
			'trade',
			'military',
			'political',
			'epidemic',
			'exploration',
		],
		propagationSpeed: 30,
		maxRange: 500,
		baseAccuracy: 0.55,
		decayPerRelay: 0.15,
		requiredTechs: [],
		minYear: 0,
		receiverClasses: ['merchant', 'artisan', 'noble', 'any'],
		emitterClasses: ['merchant'],
		requiresCoast: false,
		requiresTradeRoute: true,
		enablesPlayerChat: false,
		chatMode: null,
		chatDelay: 0,
	},

	{
		id: 'vec_pilgrim_tale',
		name: 'Récits de pèlerins',
		description:
			'Les pèlerins voyagent loin et ramènent des histoires. Mêlées de merveilleux et de foi, ces récits sont colorés mais peu fiables.',
		categories: ['religious', 'cultural', 'epidemic', 'exploration'],
		propagationSpeed: 15,
		maxRange: 2000,
		baseAccuracy: 0.35,
		decayPerRelay: 0.2,
		requiredTechs: [],
		minYear: 0,
		receiverClasses: ['peasant', 'artisan', 'clergy', 'any'],
		emitterClasses: ['clergy', 'peasant'],
		requiresCoast: false,
		requiresTradeRoute: false,
		enablesPlayerChat: false,
		chatMode: null,
		chatDelay: 0,
	},

	{
		id: 'vec_military_report',
		name: 'Rapport militaire',
		description:
			'Messagers à cheval envoyés entre commandants et seigneurs. Rapide, relativement fiable, mais réservé à la noblesse et aux cours.',
		categories: ['military', 'political', 'diplomatic'],
		propagationSpeed: 60,
		maxRange: 300,
		baseAccuracy: 0.75,
		decayPerRelay: 0.1,
		requiredTechs: [],
		minYear: 0,
		receiverClasses: ['noble', 'minor_noble'],
		emitterClasses: ['noble', 'minor_noble'],
		requiresCoast: false,
		requiresTradeRoute: false,
		enablesPlayerChat: false,
		chatMode: null,
		chatDelay: 0,
	},

	{
		id: 'vec_church_network',
		name: 'Réseau ecclésiastique',
		description:
			'Le réseau des monastères, évêchés et ordres religieux. Lent mais fiable — les moines copistes sont méticuleux. Couvre toute la chrétienté.',
		categories: [
			'religious',
			'political',
			'cultural',
			'scientific',
			'epidemic',
		],
		propagationSpeed: 10,
		maxRange: 3000,
		baseAccuracy: 0.7,
		decayPerRelay: 0.08,
		requiredTechs: [],
		minYear: 0,
		receiverClasses: ['clergy', 'noble'],
		emitterClasses: ['clergy'],
		requiresCoast: false,
		requiresTradeRoute: false,
		enablesPlayerChat: false,
		chatMode: null,
		chatDelay: 0,
	},

	{
		id: 'vec_royal_herald',
		name: 'Héraut royal',
		description:
			"Messager officiel d'un souverain. Lit les proclamations sur les places publiques. Très fiable pour les édits, mais ne couvre que le royaume.",
		categories: ['political', 'military', 'diplomatic', 'economic'],
		propagationSpeed: 50,
		maxRange: 800,
		baseAccuracy: 0.9,
		decayPerRelay: 0.05,
		requiredTechs: [],
		minYear: 0,
		receiverClasses: ['any'],
		emitterClasses: ['noble'],
		requiresCoast: false,
		requiresTradeRoute: false,
		enablesPlayerChat: false,
		chatMode: null,
		chatDelay: 0,
	},

	{
		id: 'vec_sailor_rumor',
		name: 'Rumeurs de marins',
		description:
			'Les marins rapportent des nouvelles des ports lointains. Exotiques et souvent exagérées, mais essentielles pour les cités portuaires.',
		categories: [
			'trade',
			'exploration',
			'military',
			'epidemic',
			'natural_disaster',
		],
		propagationSpeed: 80,
		maxRange: 5000,
		baseAccuracy: 0.4,
		decayPerRelay: 0.2,
		requiredTechs: [],
		minYear: 0,
		receiverClasses: ['merchant', 'artisan', 'noble', 'any'],
		emitterClasses: ['merchant', 'artisan'],
		requiresCoast: true,
		requiresTradeRoute: false,
		enablesPlayerChat: false,
		chatMode: null,
		chatDelay: 0,
	},

	{
		id: 'vec_spy_report',
		name: "Rapport d'espion",
		description:
			"Information secrète obtenue par un réseau d'espions. Très précise mais coûteuse à obtenir et réservée aux puissants.",
		categories: ['military', 'political', 'diplomatic', 'economic'],
		propagationSpeed: 40,
		maxRange: 1000,
		baseAccuracy: 0.85,
		decayPerRelay: 0.05,
		requiredTechs: [],
		minYear: 0,
		receiverClasses: ['noble'],
		emitterClasses: ['noble'],
		requiresCoast: false,
		requiresTradeRoute: false,
		enablesPlayerChat: false,
		chatMode: null,
		chatDelay: 0,
	},

	// ========================================================================
	// VECTEURS POST-IMPRIMERIE (XVe siècle+)
	// ========================================================================

	{
		id: 'vec_printed_pamphlet',
		name: 'Pamphlet imprimé',
		description:
			'Feuillets imprimés distribués sur les marchés et dans les tavernes. Premier média de masse — idéal pour la propagande et la contestation.',
		categories: [
			'political',
			'religious',
			'cultural',
			'scientific',
			'economic',
		],
		propagationSpeed: 20,
		maxRange: 500,
		baseAccuracy: 0.6,
		decayPerRelay: 0.1,
		requiredTechs: ['tech_printing_press'],
		minYear: 1450,
		receiverClasses: ['merchant', 'artisan', 'clergy', 'noble', 'any'],
		emitterClasses: ['clergy', 'merchant', 'noble'],
		requiresCoast: false,
		requiresTradeRoute: false,
		enablesPlayerChat: true,
		chatMode: 'broadcast',
		chatDelay: 3,
	},

	{
		id: 'vec_newspaper',
		name: 'Journal imprimé',
		description:
			'Publication périodique avec des nouvelles nationales et internationales. Premier vrai journalisme — avec ses biais éditoriaux.',
		categories: [
			'political',
			'military',
			'economic',
			'cultural',
			'scientific',
			'diplomatic',
			'crime',
			'trade',
		],
		propagationSpeed: 40,
		maxRange: 1000,
		baseAccuracy: 0.7,
		decayPerRelay: 0.08,
		requiredTechs: ['tech_printing_press'],
		minYear: 1600,
		receiverClasses: ['merchant', 'artisan', 'clergy', 'noble', 'any'],
		emitterClasses: ['merchant', 'noble'],
		requiresCoast: false,
		requiresTradeRoute: false,
		enablesPlayerChat: false,
		chatMode: null,
		chatDelay: 0,
	},

	// ========================================================================
	// VECTEURS INDUSTRIELS (XIXe siècle+)
	// ========================================================================

	{
		id: 'vec_telegraph',
		name: 'Télégraphe',
		description:
			'Messages codés transmis quasi instantanément par fil électrique. Révolution de la communication — mais messages courts et coûteux.',
		categories: ['military', 'political', 'economic', 'diplomatic', 'trade'],
		propagationSpeed: 10000,
		maxRange: 5000,
		baseAccuracy: 0.95,
		decayPerRelay: 0.02,
		requiredTechs: ['tech_telegraph'],
		minYear: 1844,
		receiverClasses: ['merchant', 'noble', 'any'],
		emitterClasses: ['merchant', 'noble'],
		requiresCoast: false,
		requiresTradeRoute: false,
		enablesPlayerChat: true,
		chatMode: 'private',
		chatDelay: 1,
	},

	{
		id: 'vec_telephone',
		name: 'Téléphone',
		description:
			'Communication vocale directe entre deux points. Le monde rétrécit — une conversation entre Paris et Lyon en quelques secondes.',
		categories: [
			'military',
			'political',
			'economic',
			'diplomatic',
			'personal',
			'trade',
			'crime',
		],
		propagationSpeed: 50000,
		maxRange: 10000,
		baseAccuracy: 0.95,
		decayPerRelay: 0.01,
		requiredTechs: ['tech_telephone'],
		minYear: 1876,
		receiverClasses: ['merchant', 'noble', 'artisan', 'any'],
		emitterClasses: ['any'],
		requiresCoast: false,
		requiresTradeRoute: false,
		enablesPlayerChat: true,
		chatMode: 'private',
		chatDelay: 0,
	},

	// ========================================================================
	// VECTEURS MODERNES (XXe siècle+)
	// ========================================================================

	{
		id: 'vec_radio_broadcast',
		name: 'Radio',
		description:
			'Diffusion sans fil à grande échelle. Propagande, nouvelles, musique — la radio entre dans chaque foyer. Un émetteur, des millions de récepteurs.',
		categories: [
			'political',
			'military',
			'cultural',
			'economic',
			'natural_disaster',
			'epidemic',
		],
		propagationSpeed: 100000,
		maxRange: null,
		baseAccuracy: 0.75,
		decayPerRelay: 0.02,
		requiredTechs: ['tech_radio'],
		minYear: 1920,
		receiverClasses: ['any'],
		emitterClasses: ['noble'],
		requiresCoast: false,
		requiresTradeRoute: false,
		enablesPlayerChat: true,
		chatMode: 'broadcast',
		chatDelay: 0,
	},

	{
		id: 'vec_television',
		name: 'Télévision',
		description:
			"L'image en mouvement dans chaque salon. Le pouvoir de montrer — et de choisir ce qu'on ne montre pas. Outil de propagande ultime.",
		categories: [
			'political',
			'military',
			'cultural',
			'economic',
			'natural_disaster',
			'epidemic',
			'scientific',
		],
		propagationSpeed: 100000,
		maxRange: null,
		baseAccuracy: 0.8,
		decayPerRelay: 0.01,
		requiredTechs: ['tech_television'],
		minYear: 1950,
		receiverClasses: ['any'],
		emitterClasses: ['noble'],
		requiresCoast: false,
		requiresTradeRoute: false,
		enablesPlayerChat: false,
		chatMode: null,
		chatDelay: 0,
	},

	// ========================================================================
	// VECTEURS NUMÉRIQUES (fin XXe+)
	// ========================================================================

	{
		id: 'vec_internet',
		name: 'Internet',
		description:
			"Le réseau mondial. Tout le monde peut savoir tout, partout, instantanément. L'asymétrie d'information disparaît — mais la désinformation explose.",
		categories: [
			'political',
			'military',
			'economic',
			'cultural',
			'scientific',
			'diplomatic',
			'natural_disaster',
			'epidemic',
			'exploration',
			'trade',
			'crime',
			'personal',
			'religious',
		],
		propagationSpeed: 100000,
		maxRange: null,
		baseAccuracy: 0.6,
		decayPerRelay: 0.0,
		requiredTechs: ['tech_internet'],
		minYear: 1995,
		receiverClasses: ['any'],
		emitterClasses: ['any'],
		requiresCoast: false,
		requiresTradeRoute: false,
		enablesPlayerChat: true,
		chatMode: 'global',
		chatDelay: 0,
	},
]
