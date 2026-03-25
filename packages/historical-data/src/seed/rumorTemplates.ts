import type { RumorTemplate } from '../../../shared/src/types/world'

// ============================================================================
// RUMOR TEMPLATES — Modèles de rumeurs par époque et catégorie
// ============================================================================
// Le moteur de jeu instancie des RumorInstance à partir de ces templates
// quand un événement se produit. Le contenu affiché au joueur dépend de :
//   1. Le vecteur qui transporte la rumeur (fiabilité, portée)
//   2. La distance parcourue (nombre de relais → dégradation)
//   3. Si accuracy > 0.7 → content intact
//   4. Si accuracy 0.4-0.7 → distortions[0] (légèrement déformé)
//   5. Si accuracy 0.2-0.4 → distortions[1] (très déformé)
//   6. Si accuracy < 0.2 → distortions[2] (méconnaissable)
// ============================================================================

export const rumorTemplates: RumorTemplate[] = [
	// ========================================================================
	// RUMEURS MILITAIRES
	// ========================================================================

	{
		id: 'rum_army_approaching',
		name: 'Armée en approche',
		content:
			'Une armée de {nationName} marche vers {targetRegion} avec environ {troopCount} hommes.',
		distortions: [
			"On dit qu'une grande armée approche du {direction}. Ils seraient des milliers.",
			'Des soldats arrivent ! Une horde immense dévaste tout sur son passage.',
			'Des monstres ou des démons viennent du {direction}. Fuyez !',
		],
		category: 'military',
		compatibleVectors: [
			'vec_military_report',
			'vec_royal_herald',
			'vec_merchant_news',
			'vec_peasant_gossip',
			'vec_spy_report',
			'vec_telegraph',
			'vec_radio_broadcast',
			'vec_internet',
		],
		severity: 5,
		minYear: 1000,
		maxYear: 2100,
		tags: ['guerre', 'invasion', 'armée', 'urgence'],
	},

	{
		id: 'rum_battle_result',
		name: "Issue d'une bataille",
		content:
			'La bataille de {location} est terminée. {winnerNation} a vaincu {loserNation}. Pertes estimées : {casualties}.',
		distortions: [
			"On raconte qu'une grande bataille a eu lieu près de {location}. Le vainqueur n'est pas clair.",
			"Il y a eu un massacre terrible quelque part à l'{direction}. Le sang a coulé par rivières.",
			'Les dieux se sont battus dans le ciel de {direction}. Des milliers sont morts.',
		],
		category: 'military',
		compatibleVectors: [
			'vec_military_report',
			'vec_merchant_news',
			'vec_pilgrim_tale',
			'vec_peasant_gossip',
			'vec_royal_herald',
			'vec_newspaper',
			'vec_telegraph',
			'vec_radio_broadcast',
			'vec_television',
			'vec_internet',
		],
		severity: 4,
		minYear: 1000,
		maxYear: 2100,
		tags: ['bataille', 'victoire', 'défaite', 'guerre'],
	},

	{
		id: 'rum_siege_ongoing',
		name: 'Siège en cours',
		content:
			'La ville de {cityName} est assiégée par {attackerNation}. Les défenseurs tiennent bon mais les vivres manquent.',
		distortions: [
			"On dit qu'une grande ville est encerclée. Les habitants sont affamés.",
			'Une cité entière est condamnée. Ils mangent les rats et les chevaux.',
			'Les murs sont tombés. La famine a dévoré la ville avant même les soldats.',
		],
		category: 'military',
		compatibleVectors: [
			'vec_military_report',
			'vec_merchant_news',
			'vec_peasant_gossip',
			'vec_spy_report',
			'vec_newspaper',
			'vec_telegraph',
			'vec_internet',
		],
		severity: 4,
		minYear: 1000,
		maxYear: 2100,
		tags: ['siège', 'famine', 'résistance', 'guerre'],
	},

	{
		id: 'rum_peace_treaty',
		name: 'Traité de paix',
		content:
			'Un traité de paix a été signé entre {nation1} et {nation2}. Les hostilités cessent.',
		distortions: [
			"On parle d'une paix entre deux royaumes, mais les conditions restent floues.",
			"La guerre est finie, dit-on. Mais personne ici n'y croit vraiment.",
			'Un roi a capitulé. Ou peut-être les deux. Personne ne sait vraiment.',
		],
		category: 'diplomatic',
		compatibleVectors: [
			'vec_royal_herald',
			'vec_military_report',
			'vec_merchant_news',
			'vec_church_network',
			'vec_newspaper',
			'vec_telegraph',
			'vec_radio_broadcast',
			'vec_internet',
		],
		severity: 3,
		minYear: 1000,
		maxYear: 2100,
		tags: ['paix', 'diplomatie', 'traité'],
	},

	// ========================================================================
	// RUMEURS POLITIQUES
	// ========================================================================

	{
		id: 'rum_king_dead',
		name: "Mort d'un souverain",
		content:
			'Le roi {rulerName} de {nationName} est mort. {successorName} lui succède.',
		distortions: [
			"Le roi de {nationName} serait mort. Son successeur n'est pas encore connu.",
			"Un roi est mort quelque part. Certains disent empoisonné, d'autres de maladie.",
			'On dit que le roi a été tué par le diable en personne. Ou par son frère.',
		],
		category: 'political',
		compatibleVectors: [
			'vec_royal_herald',
			'vec_merchant_news',
			'vec_church_network',
			'vec_pilgrim_tale',
			'vec_peasant_gossip',
			'vec_military_report',
			'vec_newspaper',
			'vec_telegraph',
			'vec_radio_broadcast',
			'vec_television',
			'vec_internet',
		],
		severity: 4,
		minYear: 1000,
		maxYear: 2100,
		tags: ['roi', 'mort', 'succession', 'politique'],
	},

	{
		id: 'rum_rebellion',
		name: 'Révolte populaire',
		content:
			'Les habitants de {regionName} se sont révoltés contre {authority}. Les causes : {grievance}.',
		distortions: [
			'Il y aurait des troubles dans une province voisine. Les paysans refusent de payer.',
			"La populace s'est soulevée ! Ils brûlent tout sur leur passage, dit-on.",
			'Le peuple a massacré tous les nobles. Les rivières sont rouges de sang.',
		],
		category: 'political',
		compatibleVectors: [
			'vec_peasant_gossip',
			'vec_merchant_news',
			'vec_royal_herald',
			'vec_military_report',
			'vec_printed_pamphlet',
			'vec_newspaper',
			'vec_telegraph',
			'vec_radio_broadcast',
			'vec_internet',
		],
		severity: 3,
		minYear: 1000,
		maxYear: 2100,
		tags: ['révolte', 'paysans', 'contestation', 'violence'],
	},

	{
		id: 'rum_new_law',
		name: 'Nouvel édit royal',
		content: 'Le souverain de {nationName} a décrété : {lawDescription}.',
		distortions: [
			'Le roi aurait décrété quelque chose. On attend le héraut pour savoir quoi.',
			'De nouvelles lois arrivent. Certains disent que les impôts vont tripler.',
			"Le roi a interdit le pain. Ou le vin. Ou les deux. Personne n'est d'accord.",
		],
		category: 'political',
		compatibleVectors: [
			'vec_royal_herald',
			'vec_merchant_news',
			'vec_church_network',
			'vec_printed_pamphlet',
			'vec_newspaper',
			'vec_radio_broadcast',
			'vec_internet',
		],
		severity: 2,
		minYear: 1000,
		maxYear: 2100,
		tags: ['loi', 'édit', 'politique', 'impôt'],
	},

	{
		id: 'rum_alliance_formed',
		name: 'Alliance formée',
		content: '{nation1} et {nation2} ont conclu une alliance {allianceType}.',
		distortions: [
			'Deux royaumes se seraient alliés. Contre qui ?',
			'Les rois conspirèrent entre eux. Nous serons les prochains.',
			"Tous les royaumes s'unissent pour nous détruire. Préparez-vous.",
		],
		category: 'diplomatic',
		compatibleVectors: [
			'vec_royal_herald',
			'vec_merchant_news',
			'vec_spy_report',
			'vec_church_network',
			'vec_newspaper',
			'vec_telegraph',
			'vec_radio_broadcast',
			'vec_internet',
		],
		severity: 3,
		minYear: 1000,
		maxYear: 2100,
		tags: ['alliance', 'diplomatie', 'politique'],
	},

	// ========================================================================
	// RUMEURS ÉCONOMIQUES
	// ========================================================================

	{
		id: 'rum_trade_route_opened',
		name: 'Nouvelle route commerciale',
		content:
			'Une nouvelle route commerciale relie {origin} à {destination}. Les marchands affluent.',
		distortions: [
			"Des marchands parlent d'une nouvelle route vers l'{direction}. Les profits seraient immenses.",
			"Il y aurait de l'or au bout d'une route secrète. Les marchands se battent pour y aller.",
			"On dit qu'un pays fabuleux regorge de richesses, au-delà des montagnes.",
		],
		category: 'trade',
		compatibleVectors: [
			'vec_merchant_news',
			'vec_sailor_rumor',
			'vec_newspaper',
			'vec_telegraph',
			'vec_internet',
		],
		severity: 2,
		minYear: 1000,
		maxYear: 2100,
		tags: ['commerce', 'route', 'marchands', 'richesse'],
	},

	{
		id: 'rum_famine_region',
		name: 'Famine régionale',
		content:
			'La famine frappe {regionName}. Les récoltes ont été détruites par {cause}. Les prix flambent.',
		distortions: [
			'On dit que la récolte a été mauvaise dans la région voisine. Le pain va augmenter.',
			"La famine dévore un pays entier. Les gens mangent de l'herbe et de l'écorce.",
			"La terre est maudite. Plus rien ne pousse. C'est la fin des temps.",
		],
		category: 'economic',
		compatibleVectors: [
			'vec_peasant_gossip',
			'vec_merchant_news',
			'vec_pilgrim_tale',
			'vec_church_network',
			'vec_newspaper',
			'vec_radio_broadcast',
			'vec_internet',
		],
		severity: 4,
		minYear: 1000,
		maxYear: 2100,
		tags: ['famine', 'récolte', 'prix', 'survie'],
	},

	{
		id: 'rum_price_surge',
		name: 'Flambée des prix',
		content:
			'Le prix du {commodity} a {direction} de {percentage}% à {market}.',
		distortions: [
			'Les marchands se plaignent : le {commodity} coûte cher cette saison.',
			'Tout augmente ! Plus personne ne peut acheter de {commodity}.',
			"Il n'y a plus de {commodity} nulle part. Les marchands cachent leur stock.",
		],
		category: 'economic',
		compatibleVectors: [
			'vec_merchant_news',
			'vec_printed_pamphlet',
			'vec_newspaper',
			'vec_telegraph',
			'vec_radio_broadcast',
			'vec_internet',
		],
		severity: 2,
		minYear: 1000,
		maxYear: 2100,
		tags: ['prix', 'commerce', 'inflation', 'marché'],
	},

	// ========================================================================
	// RUMEURS RELIGIEUSES
	// ========================================================================

	{
		id: 'rum_heresy_spreading',
		name: 'Hérésie en expansion',
		content:
			'Une doctrine hérétique se répand dans {regionName}. {heresyDescription}.',
		distortions: [
			'Des hérétiques prêchent dans la région voisine. Ils nient les sacrements.',
			'Une secte dangereuse corrompt les âmes. Ils se réunissent la nuit dans les bois.',
			'Le diable en personne prêche aux carrefours. Des hommes et des femmes dansent nus.',
		],
		category: 'religious',
		compatibleVectors: [
			'vec_church_network',
			'vec_pilgrim_tale',
			'vec_peasant_gossip',
			'vec_printed_pamphlet',
			'vec_internet',
		],
		severity: 3,
		minYear: 1000,
		maxYear: 1700,
		tags: ['hérésie', 'religion', 'secte', 'inquisition'],
	},

	{
		id: 'rum_miracle_reported',
		name: 'Miracle signalé',
		content:
			'Un miracle se serait produit à {location} : {miracleDescription}.',
		distortions: [
			"Des pèlerins parlent d'un miracle dans une église voisine.",
			'Un saint est apparu dans le ciel. Des malades ont été guéris par centaines.',
			'Les morts marchent et les aveugles voient. La fin des temps est proche.',
		],
		category: 'religious',
		compatibleVectors: [
			'vec_pilgrim_tale',
			'vec_church_network',
			'vec_peasant_gossip',
			'vec_printed_pamphlet',
		],
		severity: 2,
		minYear: 1000,
		maxYear: 1700,
		tags: ['miracle', 'saint', 'religion', 'pèlerinage'],
	},

	{
		id: 'rum_papal_decree',
		name: 'Décret papal',
		content: 'Le pape a proclamé : {decreeDescription}.',
		distortions: [
			'Le pape a parlé. On attend son message par les moines.',
			"Rome a envoyé un édit terrible. L'Église exige quelque chose d'important.",
			'Le pape a excommunié tout le monde. Ou un seul roi. Ou personne. Qui sait ?',
		],
		category: 'religious',
		compatibleVectors: [
			'vec_church_network',
			'vec_royal_herald',
			'vec_pilgrim_tale',
			'vec_printed_pamphlet',
			'vec_newspaper',
			'vec_radio_broadcast',
			'vec_internet',
		],
		severity: 3,
		minYear: 1000,
		maxYear: 2100,
		tags: ['pape', 'décret', 'religion', 'rome'],
	},

	// ========================================================================
	// RUMEURS ÉPIDÉMIQUES
	// ========================================================================

	{
		id: 'rum_plague_approaching',
		name: 'Peste en approche',
		content:
			'La peste a frappé {originRegion}. Elle se déplace vers {direction} à une vitesse inquiétante.',
		distortions: [
			"On dit qu'une maladie terrible ravage une ville à quelques jours de marche.",
			'Une peste mortelle approche. Les voyageurs meurent sur les routes. Fermez les portes !',
			'La mort noire vient. Les oiseaux tombent du ciel et les puits sont empoisonnés.',
		],
		category: 'epidemic',
		compatibleVectors: [
			'vec_merchant_news',
			'vec_pilgrim_tale',
			'vec_peasant_gossip',
			'vec_church_network',
			'vec_sailor_rumor',
			'vec_newspaper',
			'vec_telegraph',
			'vec_radio_broadcast',
			'vec_internet',
		],
		severity: 5,
		minYear: 1000,
		maxYear: 2100,
		tags: ['peste', 'épidémie', 'maladie', 'mort'],
	},

	{
		id: 'rum_quarantine',
		name: 'Quarantaine imposée',
		content:
			"La ville de {cityName} est en quarantaine. Personne n'entre ni ne sort.",
		distortions: [
			'Une ville voisine a fermé ses portes. Les marchands sont refoulés.',
			"Ils ont muré les portes et brûlé les maisons des malades. C'est la fin.",
			'La ville entière est morte. Les corbeaux tournent au-dessus des murs.',
		],
		category: 'epidemic',
		compatibleVectors: [
			'vec_merchant_news',
			'vec_peasant_gossip',
			'vec_royal_herald',
			'vec_newspaper',
			'vec_telegraph',
			'vec_internet',
		],
		severity: 4,
		minYear: 1000,
		maxYear: 2100,
		tags: ['quarantaine', 'peste', 'isolement', 'maladie'],
	},

	// ========================================================================
	// RUMEURS DE CATASTROPHES NATURELLES
	// ========================================================================

	{
		id: 'rum_earthquake',
		name: 'Tremblement de terre',
		content:
			'Un tremblement de terre a dévasté {location}. De nombreux bâtiments se sont effondrés.',
		distortions: [
			'La terre a tremblé quelque part au {direction}. Des maisons seraient tombées.',
			"Un séisme terrible a englouti une ville entière. Le sol s'est ouvert.",
			"La terre s'est fendue et du feu a jailli. Dieu punit les pécheurs.",
		],
		category: 'natural_disaster',
		compatibleVectors: [
			'vec_peasant_gossip',
			'vec_merchant_news',
			'vec_pilgrim_tale',
			'vec_newspaper',
			'vec_telegraph',
			'vec_radio_broadcast',
			'vec_television',
			'vec_internet',
		],
		severity: 4,
		minYear: 1000,
		maxYear: 2100,
		tags: ['séisme', 'catastrophe', 'destruction'],
	},

	{
		id: 'rum_flood',
		name: 'Grande inondation',
		content:
			'Des inondations catastrophiques ont touché {regionName}. Les cultures sont détruites.',
		distortions: [
			'Il a beaucoup plu au {direction}. Les rivières auraient débordé.',
			"L'eau a tout emporté : maisons, bétail, ponts. Des villages entiers noyés.",
			"Le déluge est arrivé. La mer monte et ne s'arrêtera plus.",
		],
		category: 'natural_disaster',
		compatibleVectors: [
			'vec_peasant_gossip',
			'vec_merchant_news',
			'vec_sailor_rumor',
			'vec_newspaper',
			'vec_telegraph',
			'vec_internet',
		],
		severity: 3,
		minYear: 1000,
		maxYear: 2100,
		tags: ['inondation', 'catastrophe', 'rivière', 'récolte'],
	},

	// ========================================================================
	// RUMEURS D'EXPLORATION
	// ========================================================================

	{
		id: 'rum_new_land_discovered',
		name: 'Terre inconnue découverte',
		content:
			'Des navigateurs de {nationName} ont découvert une terre inconnue au-delà de {ocean}.',
		distortions: [
			"Des marins parlent d'une île immense au-delà des mers connues.",
			"Un continent entier existe de l'autre côté de l'océan ! Des villes d'or y brillent.",
			"Les marins ont trouvé le jardin d'Éden. Ou l'enfer. Les récits divergent.",
		],
		category: 'exploration',
		compatibleVectors: [
			'vec_sailor_rumor',
			'vec_merchant_news',
			'vec_royal_herald',
			'vec_printed_pamphlet',
			'vec_newspaper',
			'vec_internet',
		],
		severity: 3,
		minYear: 1000,
		maxYear: 1800,
		tags: ['exploration', 'découverte', 'continent', 'navigation'],
	},

	{
		id: 'rum_sea_monster',
		name: 'Monstre marin signalé',
		content:
			'Des marins rapportent avoir vu un {creature} géant près de {location}.',
		distortions: [
			'Des marins jurent avoir vu une créature dans les eaux au large.',
			'Un serpent de mer colossal a détruit un navire. La mer est dangereuse.',
			'Le Léviathan est éveillé. Aucun navire ne reviendra de cette direction.',
		],
		category: 'exploration',
		compatibleVectors: ['vec_sailor_rumor', 'vec_peasant_gossip'],
		severity: 1,
		minYear: 1000,
		maxYear: 1700,
		tags: ['monstre', 'mer', 'légende', 'navigation'],
	},

	// ========================================================================
	// RUMEURS SCIENTIFIQUES / CULTURELLES
	// ========================================================================

	{
		id: 'rum_scientific_breakthrough',
		name: 'Découverte scientifique',
		content: 'Un savant de {nationName} aurait démontré que {discovery}.',
		distortions: [
			"On dit qu'un phi­lo­sophe a fait une découverte importante. Les détails sont flous.",
			"Un savant prétend que le monde fonctionne autrement que ce qu'on croyait.",
			"Un fou affirme des hérésies sur la nature. Certains le croient, d'autres veulent le brûler.",
		],
		category: 'scientific',
		compatibleVectors: [
			'vec_church_network',
			'vec_printed_pamphlet',
			'vec_merchant_news',
			'vec_newspaper',
			'vec_telegraph',
			'vec_radio_broadcast',
			'vec_television',
			'vec_internet',
		],
		severity: 2,
		minYear: 1000,
		maxYear: 2100,
		tags: ['science', 'découverte', 'savoir', 'innovation'],
	},

	{
		id: 'rum_tech_invention',
		name: 'Nouvelle invention',
		content:
			'On a inventé {invention} à {location}. Cela pourrait changer {domain}.',
		distortions: [
			"Des marchands parlent d'un nouvel outil étrange venu de l'{direction}.",
			'Une machine merveilleuse fait le travail de cent hommes, dit-on.',
			'Des sorciers ont créé un objet magique. Il pense tout seul.',
		],
		category: 'scientific',
		compatibleVectors: [
			'vec_merchant_news',
			'vec_church_network',
			'vec_printed_pamphlet',
			'vec_newspaper',
			'vec_telegraph',
			'vec_radio_broadcast',
			'vec_internet',
		],
		severity: 2,
		minYear: 1000,
		maxYear: 2100,
		tags: ['invention', 'technologie', 'innovation', 'progrès'],
	},

	// ========================================================================
	// RUMEURS PERSONNELLES / SOCIALES
	// ========================================================================

	{
		id: 'rum_noble_scandal',
		name: 'Scandale nobiliaire',
		content: '{nobleName} de {nationName} est accusé de {scandal}.',
		distortions: [
			"On chuchote qu'un seigneur important est dans de sales draps.",
			'Un noble a trahi son roi. Ou couché avec sa femme. Ou les deux.',
			'Les nobles se dévorent entre eux. Intrigues, poisons, trahisons.',
		],
		category: 'personal',
		compatibleVectors: [
			'vec_peasant_gossip',
			'vec_merchant_news',
			'vec_spy_report',
			'vec_printed_pamphlet',
			'vec_newspaper',
			'vec_internet',
		],
		severity: 2,
		minYear: 1000,
		maxYear: 2100,
		tags: ['scandale', 'noble', 'intrigue', 'cour'],
	},

	{
		id: 'rum_refugee_wave',
		name: 'Vague de réfugiés',
		content:
			'Des réfugiés de {originRegion} fuient {cause}. Ils se dirigent vers {direction}.',
		distortions: [
			'Des étrangers arrivent sur les routes. Ils fuient quelque chose de terrible.',
			"Des milliers de gens déracinés marchent sans fin. Ils n'ont rien.",
			"Des hordes d'étrangers envahissent le pays. Ils veulent nos terres.",
		],
		category: 'personal',
		compatibleVectors: [
			'vec_peasant_gossip',
			'vec_merchant_news',
			'vec_church_network',
			'vec_newspaper',
			'vec_radio_broadcast',
			'vec_television',
			'vec_internet',
		],
		severity: 3,
		minYear: 1000,
		maxYear: 2100,
		tags: ['réfugiés', 'migration', 'fuite', 'déracinement'],
	},

	{
		id: 'rum_player_action',
		name: "Action notable d'un joueur",
		content: 'La famille {familyName} de {settlement} a {action}.',
		distortions: [
			"On raconte qu'une famille du coin a fait quelque chose de remarquable.",
			"Des gens d'ici auraient fait fortune. Ou perdu la tête. Les deux peut-être.",
			"Il s'est passé quelque chose d'extraordinaire à {direction}. Personne ne sait exactement quoi.",
		],
		category: 'personal',
		compatibleVectors: [
			'vec_peasant_gossip',
			'vec_merchant_news',
			'vec_printed_pamphlet',
			'vec_newspaper',
			'vec_internet',
		],
		severity: 1,
		minYear: 1000,
		maxYear: 2100,
		tags: ['joueur', 'famille', 'action', 'local'],
	},

	// ========================================================================
	// RUMEURS LIÉES AU CHAT JOUEUR (méta-gameplay)
	// ========================================================================

	{
		id: 'rum_diplomatic_message',
		name: 'Message diplomatique',
		content:
			'Un message officiel de {senderNation} a été transmis à {receiverNation}.',
		distortions: [
			"Un messager portant les couleurs d'un royaume lointain est passé.",
			'Des émissaires secrets négocient quelque chose. Les gardes les ont vus.',
			'Les rois complotent entre eux. Nous ne savons rien de leurs plans.',
		],
		category: 'diplomatic',
		compatibleVectors: [
			'vec_royal_herald',
			'vec_spy_report',
			'vec_military_report',
			'vec_telegraph',
			'vec_telephone',
			'vec_internet',
		],
		severity: 2,
		minYear: 1000,
		maxYear: 2100,
		tags: ['diplomatie', 'message', 'négociation', 'espionnage'],
	},

	{
		id: 'rum_trade_proposal',
		name: 'Proposition commerciale',
		content:
			"Un marchand de {originNation} propose d'échanger {offered} contre {requested}.",
		distortions: [
			'Un marchand étranger cherche à faire affaire. Il propose des choses intéressantes.',
			'Des étrangers veulent acheter tout notre {commodity}. Méfiance.',
			'Ils offrent de la pacotille contre nos trésors. Ne vous laissez pas avoir.',
		],
		category: 'trade',
		compatibleVectors: [
			'vec_merchant_news',
			'vec_printed_pamphlet',
			'vec_newspaper',
			'vec_telegraph',
			'vec_telephone',
			'vec_internet',
		],
		severity: 1,
		minYear: 1000,
		maxYear: 2100,
		tags: ['commerce', 'proposition', 'échange', 'marchand'],
	},
]
