import type {
	AdvisorResponseTemplate,
	FeasibilityRule,
} from '../../../shared/src/types/world'

// ============================================================================
// TEMPLATES DE RÉPONSE — Phrases pré-construites pour l'IA autonome
// ============================================================================
// Chaque template est un texte avec des {variables} que le moteur remplit
// sans aucun appel LLM. Les variables disponibles :
//   {playerName}, {advisorName}, {npcType}, {techName}, {resourceName},
//   {locationName}, {nationName}, {year}, {domainName}, {referralTarget},
//   {referralReason}, {knowledgeTitle}, {prerequisite}, {directAnswer}
// ============================================================================

export const advisorResponseTemplates: AdvisorResponseTemplate[] = [
	// ========================================================================
	// RÉPONSES GÉNÉRIQUES (tous conseillers, tous domaines)
	// ========================================================================

	// --- Connaissances partagées ---
	{
		id: 'tpl_knowledge_shared_generic',
		situation: 'knowledge_shared',
		domain: null,
		advisorProfileId: null,
		template: 'Voici ce que je sais sur {knowledgeTitle} :\n\n{directAnswer}',
		tone: 'pragmatic',
		minYear: 0,
		maxYear: 9999,
	},
	{
		id: 'tpl_knowledge_shared_scholarly',
		situation: 'knowledge_shared',
		domain: null,
		advisorProfileId: null,
		template:
			'La question de {knowledgeTitle} est fort intéressante. Voici ce que les autorités en disent :\n\n{directAnswer}',
		tone: 'scholarly',
		minYear: 0,
		maxYear: 9999,
	},

	// --- Rumeurs ---
	{
		id: 'tpl_rumor_shared_generic',
		situation: 'rumor_shared',
		domain: null,
		advisorProfileId: null,
		template:
			"J'ai ouï dire — mais je ne saurais le jurer — que {directAnswer}\n\nPour en savoir plus, tu devrais chercher {referralTarget}. On dit que {referralReason}.",
		tone: 'familiar',
		minYear: 0,
		maxYear: 9999,
	},
	{
		id: 'tpl_rumor_shared_cautious',
		situation: 'rumor_shared',
		domain: null,
		advisorProfileId: null,
		template:
			'Des voyageurs rapportent... mais les voyageurs exagèrent souvent. {directAnswer}\n\nSi vous tenez à en savoir davantage, {referralTarget} pourrait éclairer la question.',
		tone: 'formal',
		minYear: 0,
		maxYear: 9999,
	},

	// --- Sujet inconnu ---
	{
		id: 'tpl_unknown_topic_generic',
		situation: 'unknown_topic',
		domain: null,
		advisorProfileId: null,
		template:
			'Je ne connais rien de semblable. Peut-être que {referralTarget} aurait des lumières sur ce sujet.',
		tone: 'pragmatic',
		minYear: 0,
		maxYear: 9999,
	},
	{
		id: 'tpl_unknown_topic_mystical',
		situation: 'unknown_topic',
		domain: null,
		advisorProfileId: null,
		template:
			"Cela dépasse tout ce que j'ai appris en ce monde. C'est peut-être un savoir venu d'un autre temps... ou d'un autre lieu. Seul Dieu le sait.",
		tone: 'mystical',
		minYear: 0,
		maxYear: 1500,
	},

	// --- Redirections ---
	{
		id: 'tpl_referral_generic',
		situation: 'referral',
		domain: null,
		advisorProfileId: null,
		template:
			"Ce n'est pas mon domaine, mais je sais que {referralTarget} s'y connaît. {referralReason}. Va le trouver.",
		tone: 'pragmatic',
		minYear: 0,
		maxYear: 9999,
	},
	{
		id: 'tpl_referral_formal',
		situation: 'referral',
		domain: null,
		advisorProfileId: null,
		template:
			'Cette question relève de compétences que je ne possède pas. Je vous recommande de consulter {referralTarget} — {referralReason}.',
		tone: 'formal',
		minYear: 0,
		maxYear: 9999,
	},

	// ========================================================================
	// RÉPONSES DE FAISABILITÉ
	// ========================================================================

	// --- Feu vert ---
	{
		id: 'tpl_feasible_generic',
		situation: 'feasible',
		domain: null,
		advisorProfileId: null,
		template:
			"C'est tout à fait réalisable. Vous disposez des savoirs nécessaires en {domainName}. Il vous faudra {resourceName} et l'aide de {referralTarget}. Quand souhaitez-vous commencer ?",
		tone: 'pragmatic',
		minYear: 0,
		maxYear: 9999,
	},
	{
		id: 'tpl_feasible_encouraging',
		situation: 'feasible',
		domain: null,
		advisorProfileId: null,
		template:
			'Bonne nouvelle — cela entre dans le domaine du possible. Les connaissances sont là, les ressources existent. Le plus dur sera de convaincre les bonnes personnes et de trouver {resourceName}.',
		tone: 'familiar',
		minYear: 0,
		maxYear: 9999,
	},

	// --- Partiellement faisable ---
	{
		id: 'tpl_partially_feasible_generic',
		situation: 'partially_feasible',
		domain: null,
		advisorProfileId: null,
		template:
			"L'idée a du mérite, mais il manque des éléments. Vous maîtrisez {knowledgeTitle}, c'est un bon début. En revanche, sans {prerequisite}, le projet ne peut pas aboutir. On y arrivera, mais pas encore.",
		tone: 'pragmatic',
		minYear: 0,
		maxYear: 9999,
	},

	// --- Tech manquante ---
	{
		id: 'tpl_missing_tech_generic',
		situation: 'missing_tech',
		domain: null,
		advisorProfileId: null,
		template:
			"L'intention est bonne, mais le savoir nécessaire n'existe pas encore chez nous. Il faudrait d'abord maîtriser {techName}. Cherchez du côté de {referralTarget} — {referralReason}.",
		tone: 'pragmatic',
		minYear: 0,
		maxYear: 9999,
	},
	{
		id: 'tpl_missing_tech_scholarly',
		situation: 'missing_tech',
		domain: null,
		advisorProfileId: null,
		template:
			"La théorie existe peut-être quelque part, mais ni moi ni personne ici ne la possède. Pour avancer, il faudrait d'abord comprendre {techName}. Les savants de {locationName} travaillent peut-être sur ce sujet.",
		tone: 'scholarly',
		minYear: 0,
		maxYear: 9999,
	},

	// --- Ressource manquante ---
	{
		id: 'tpl_missing_resource_generic',
		situation: 'missing_resource',
		domain: null,
		advisorProfileId: null,
		template:
			"Le savoir est là, mais les matériaux manquent. Il faudrait {resourceName}, et on n'en trouve pas ici. Les marchands de {locationName} pourraient en fournir, ou peut-être {referralTarget}.",
		tone: 'pragmatic',
		minYear: 0,
		maxYear: 9999,
	},
	{
		id: 'tpl_missing_resource_trade',
		situation: 'missing_resource',
		domain: 'trade',
		advisorProfileId: null,
		template:
			"Tu sais comment faire, mais sans {resourceName}, c'est impossible. J'ai entendu dire que {referralTarget} en a, ou qu'on en trouve sur {locationName}. Ça va coûter cher...",
		tone: 'familiar',
		minYear: 0,
		maxYear: 9999,
	},

	// --- Inconcevable ---
	{
		id: 'tpl_inconceivable_generic',
		situation: 'inconceivable',
		domain: null,
		advisorProfileId: null,
		template:
			"Je ne comprends même pas ce que tu décris. C'est... au-delà de tout ce que je connais. Peut-être dans un autre siècle, quelqu'un comprendra. Mais pas moi, pas aujourd'hui.",
		tone: 'pragmatic',
		minYear: 0,
		maxYear: 9999,
	},
	{
		id: 'tpl_inconceivable_mystical',
		situation: 'inconceivable',
		domain: null,
		advisorProfileId: null,
		template:
			'Ce dont tu parles ressemble à de la magie — ou à la folie. Aucun homme sensé ne conçoit une telle chose. Peut-être les anges le savent-ils, mais les mortels, non.',
		tone: 'mystical',
		minYear: 0,
		maxYear: 1500,
	},
	{
		id: 'tpl_inconceivable_enlightened',
		situation: 'inconceivable',
		domain: null,
		advisorProfileId: null,
		template:
			"C'est une idée fascinante, mais la science actuelle n'a ni les outils ni les théories pour l'aborder. Peut-être nos descendants y parviendront-ils. Pour l'instant, concentrons-nous sur ce qui est à notre portée.",
		tone: 'scholarly',
		minYear: 1600,
		maxYear: 9999,
	},

	// --- Barrière culturelle ---
	{
		id: 'tpl_cultural_barrier_generic',
		situation: 'cultural_barrier',
		domain: null,
		advisorProfileId: null,
		template:
			"Ce n'est pas que c'est impossible — c'est que ça ne se fait pas ici. Les coutumes, la religion, les gens... Ils n'accepteraient pas. Peut-être ailleurs, chez d'autres peuples, mais pas chez nous.",
		tone: 'pragmatic',
		minYear: 0,
		maxYear: 9999,
	},
	{
		id: 'tpl_cultural_barrier_religious',
		situation: 'cultural_barrier',
		domain: 'theology',
		advisorProfileId: null,
		template:
			"L'Église interdit cela. Si tu t'y risques, tu t'attires l'excommunication. Ce n'est pas un mince danger — sans les sacrements, tu es un paria. Réfléchis bien avant d'insister.",
		tone: 'formal',
		minYear: 500,
		maxYear: 1700,
	},

	// --- Encouragements ---
	{
		id: 'tpl_encouragement_generic',
		situation: 'encouragement',
		domain: null,
		advisorProfileId: null,
		template:
			'Tu es sur la bonne voie. Continue à chercher, à observer, à poser des questions. Le savoir vient à ceux qui le poursuivent.',
		tone: 'familiar',
		minYear: 0,
		maxYear: 9999,
	},
	{
		id: 'tpl_encouragement_scholarly',
		situation: 'encouragement',
		domain: null,
		advisorProfileId: null,
		template:
			"Votre curiosité vous honore. Peu osent poser les questions que vous posez. Persévérez — chaque réponse ouvre dix nouvelles questions, et c'est ainsi que le savoir progresse.",
		tone: 'scholarly',
		minYear: 0,
		maxYear: 9999,
	},

	// --- Avertissements ---
	{
		id: 'tpl_warning_generic',
		situation: 'warning',
		domain: null,
		advisorProfileId: null,
		template:
			"Attention — ce que tu envisages est dangereux. Pas seulement pour toi, mais pour ceux qui t'entourent. {directAnswer}",
		tone: 'pragmatic',
		minYear: 0,
		maxYear: 9999,
	},
	{
		id: 'tpl_warning_political',
		situation: 'warning',
		domain: 'politics',
		advisorProfileId: null,
		template:
			'Je vous en conjure, soyez prudent. Ce que vous proposez pourrait être interprété comme une trahison. Les murs ont des oreilles, et le seigneur a des espions. Procédez avec une extrême discrétion.',
		tone: 'formal',
		minYear: 0,
		maxYear: 9999,
	},

	// ========================================================================
	// TEMPLATES SPÉCIFIQUES PAR ARCHÉTYPE
	// ========================================================================

	// --- Ancien du village ---
	{
		id: 'tpl_elder_knowledge',
		situation: 'knowledge_shared',
		domain: null,
		advisorProfileId: 'adv_village_elder',
		template:
			"Mon père me l'a appris, et son père avant lui : {directAnswer}\n\nC'est comme ça qu'on fait chez nous. Si tu veux en savoir plus, va voir {referralTarget}.",
		tone: 'familiar',
		minYear: 0,
		maxYear: 9999,
	},

	// --- Maître de guilde ---
	{
		id: 'tpl_guild_knowledge',
		situation: 'knowledge_shared',
		domain: null,
		advisorProfileId: 'adv_guild_master',
		template:
			"Écoute bien, parce que je ne répète pas : {directAnswer}\n\nSi tu veux pratiquer, il faudra des années d'apprentissage. Et du bon matériel — {resourceName} pour commencer.",
		tone: 'pragmatic',
		minYear: 1000,
		maxYear: 9999,
	},

	// --- Érudit monastique ---
	{
		id: 'tpl_monk_knowledge',
		situation: 'knowledge_shared',
		domain: null,
		advisorProfileId: 'adv_monastery_scholar',
		template:
			'Isidore de Séville écrit ceci, et Pline confirme : {directAnswer}\n\nMais rappelle-toi — tout savoir vient de Dieu, et doit servir Sa gloire.',
		tone: 'scholarly',
		minYear: 0,
		maxYear: 1500,
	},

	// --- Conseiller de cour ---
	{
		id: 'tpl_court_feasible',
		situation: 'feasible',
		domain: null,
		advisorProfileId: 'adv_court_advisor',
		template:
			"Monseigneur, votre projet est non seulement réalisable, mais politiquement avisé. Il vous faudra {resourceName}, l'appui de {referralTarget}, et — surtout — de la discrétion.",
		tone: 'formal',
		minYear: 0,
		maxYear: 9999,
	},

	// --- Marchand ---
	{
		id: 'tpl_merchant_missing_resource',
		situation: 'missing_resource',
		domain: null,
		advisorProfileId: 'adv_merchant_associate',
		template:
			"Mon ami, tout se trouve si on y met le prix. {resourceName} est rare ici, mais {referralTarget} en a — ou en connaît quelqu'un qui en a. Prépare ta bourse.",
		tone: 'familiar',
		minYear: 0,
		maxYear: 9999,
	},

	// --- Professeur universitaire ---
	{
		id: 'tpl_professor_knowledge',
		situation: 'knowledge_shared',
		domain: null,
		advisorProfileId: 'adv_university_professor',
		template:
			"Quaestio : {knowledgeTitle}.\nRespondeo : {directAnswer}\n\nMais attention — Thomas d'Aquin nous rappelle que la foi et la raison doivent marcher ensemble.",
		tone: 'scholarly',
		minYear: 1150,
		maxYear: 1600,
	},

	// --- Philosophe naturel ---
	{
		id: 'tpl_naturalist_knowledge',
		situation: 'knowledge_shared',
		domain: null,
		advisorProfileId: 'adv_natural_philosopher',
		template:
			"J'ai vérifié cela par l'expérience : {directAnswer}\n\nNe croyez pas les anciens sur parole — observez par vous-même. La nature ne ment pas.",
		tone: 'scholarly',
		minYear: 1600,
		maxYear: 9999,
	},

	// --- Encyclopédiste ---
	{
		id: 'tpl_encyclopedist_knowledge',
		situation: 'knowledge_shared',
		domain: null,
		advisorProfileId: 'adv_enlightenment_encyclopedist',
		template:
			"Article : {knowledgeTitle}\n\n{directAnswer}\n\nVoilà ce que la raison et l'observation nous apprennent. Le progrès n'attend que notre volonté.",
		tone: 'scholarly',
		minYear: 1700,
		maxYear: 9999,
	},
]

// ============================================================================
// RÈGLES DE FAISABILITÉ — Évaluation automatique des projets joueur
// ============================================================================
// Le moteur parcourt ces règles AVANT d'appeler un LLM. Si les mots-clés
// du joueur matchent, le moteur évalue les prérequis (techs, ressources,
// connaissances) et sélectionne la réponse appropriée.
// ============================================================================

export const feasibilityRules: FeasibilityRule[] = [
	// ========================================================================
	// CONSTRUCTION
	// ========================================================================

	{
		id: 'feas_build_castle',
		triggerKeywords: [
			'château',
			'forteresse',
			'château fort',
			'citadelle',
			'construire un château',
		],
		intentCategory: 'build',
		requiredTechs: ['tech_stone_masonry', 'tech_fortification'],
		requiredResources: ['stone', 'wood', 'iron', 'labor'],
		requiredKnowledge: ['know_stone_masonry', 'know_fortification'],
		responseIfFeasible:
			"Un château fort, c'est un projet de seigneur. Tu as les connaissances en maçonnerie et en fortification — c'est bien. Il te faudra une carrière de pierre, du bois pour les charpentes, des forgerons pour les ferrures, et surtout des centaines de bras pendant des années. Choisis bien l'emplacement — un promontoire naturel ou un coude de rivière.",
		responseIfMissingTech:
			"Construire un château exige des savoirs que tu n'as pas encore. La maçonnerie de pierre est un art complexe, et la conception de fortifications demande une science militaire que seuls les maîtres d'œuvre possèdent. Commence par apprendre auprès d'un maître maçon.",
		responseIfMissingResource:
			"Tu sais comment bâtir, mais les moyens manquent. Un château dévore la pierre, le bois, le fer et d'innombrables journées de travail. Il faut un domaine riche ou un seigneur puissant qui finance. Cherche un mécène ou accumule des ressources.",
		responseIfInconceivable:
			"Un château ? Ce mot a-t-il un sens pour toi ? Les grands bâtissent en pierre, oui, mais ce que tu décris dépasse tout ce qu'on fait ici. Commence par une palissade de bois autour de ton village.",
		minYear: 800,
		maxYear: 1500,
		domain: 'construction',
	},

	{
		id: 'feas_build_cathedral',
		triggerKeywords: [
			'cathédrale',
			'église',
			'basilique',
			'construire une cathédrale',
		],
		intentCategory: 'build',
		requiredTechs: [
			'tech_stone_masonry',
			'tech_arch_vault',
			'tech_gothic_architecture',
		],
		requiredResources: ['stone', 'wood', 'glass', 'lead', 'labor'],
		requiredKnowledge: ['know_stone_masonry', 'know_arch_vault'],
		responseIfFeasible:
			"Une cathédrale est l'œuvre d'une vie — parfois de plusieurs. Tu maîtrises la taille de pierre et la croisée d'ogives, c'est essentiel. Il faudra un maître d'œuvre de génie, des tailleurs de pierre par dizaines, des verriers pour les vitraux, et surtout — la bénédiction de l'évêque et l'argent de la cité entière.",
		responseIfMissingTech:
			"Pour une cathédrale, il faut maîtriser l'arc-boutant, la croisée d'ogives et les techniques les plus avancées de la maçonnerie. Tu n'en es pas encore là. Apprends d'abord à construire des arcs simples et des voûtes en berceau.",
		responseIfMissingResource:
			"Les savoirs sont là, mais une cathédrale coûte plus cher qu'une guerre. Il faut de la pierre fine, du verre coloré, du plomb pour les toits, et des générations de travail. Seule une cité prospère peut se le permettre.",
		responseIfInconceivable:
			"Construire un bâtiment qui touche le ciel ? C'est de l'orgueil — Babel n'a pas bien fini. On ne sait même pas comment élever un mur au-delà de quelques toises ici.",
		minYear: 1000,
		maxYear: 1600,
		domain: 'construction',
	},

	// ========================================================================
	// INVENTIONS
	// ========================================================================

	{
		id: 'feas_invent_printing',
		triggerKeywords: [
			'imprimerie',
			'imprimer',
			'presse',
			'caractère mobile',
			'reproduction des livres',
			'copier des livres rapidement',
		],
		intentCategory: 'invent',
		requiredTechs: [
			'tech_movable_type',
			'tech_paper_making',
			'tech_ink_production',
		],
		requiredResources: ['lead', 'tin', 'iron', 'paper', 'ink'],
		requiredKnowledge: ['know_manuscript_production', 'know_iron_smelting'],
		responseIfFeasible:
			"L'idée de fondre des lettres en métal et de les assembler pour imprimer... c'est brillant ! Tu connais le travail du métal, la fabrication du papier et la composition de l'encre. Il reste à concevoir la presse elle-même — une vis de pressoir adaptée. Un forgeron habile et un menuisier pourraient construire un prototype.",
		responseIfMissingTech:
			"Copier des livres plus vite, c'est le rêve de tout moine copiste. Mais pour y parvenir, il faudrait d'abord maîtriser la fonte des petits objets en métal avec précision, savoir fabriquer du papier (le parchemin est trop cher), et préparer une encre grasse qui adhère au métal. Plusieurs savoirs te manquent encore.",
		responseIfMissingResource:
			"Tu as l'idée et les savoirs, mais il manque les matériaux clés : du plomb et de l'étain pour fondre les caractères, du papier en quantité, et une encre spéciale — plus grasse que l'encre des moines. Cherche un fondeur et un marchand de papier.",
		responseIfInconceivable:
			"Reproduire des livres sans les copier à la main ? Chaque lettre est tracée par un être humain — c'est un acte de dévotion, pas un travail mécanique. Ce que tu imagines n'a pas de sens.",
		minYear: 1200,
		maxYear: 1500,
		domain: 'engineering',
	},

	{
		id: 'feas_invent_gunpowder',
		triggerKeywords: [
			'poudre',
			'explosion',
			'poudre noire',
			'explosif',
			'faire exploser',
			'salpêtre',
			'poudre à canon',
		],
		intentCategory: 'invent',
		requiredTechs: ['tech_gunpowder'],
		requiredResources: ['saltpeter', 'sulfur', 'charcoal'],
		requiredKnowledge: ['know_alchemy_basics'],
		responseIfFeasible:
			"Tu connais les trois ingrédients : le salpêtre, le soufre et le charbon de bois. Mêlés dans les bonnes proportions — environ 75 de salpêtre, 15 de charbon, 10 de soufre — le mélange s'enflamme avec une violence terrifiante. ATTENTION : c'est extrêmement dangereux. Fais tes essais loin de tout bâtiment.",
		responseIfMissingTech:
			"Tu décris un mélange qui explose ? Des alchimistes en Orient auraient trouvé une telle recette, dit-on. Les ingrédients seraient le salpêtre — qu'on trouve sur les vieux murs — le soufre des volcans, et le charbon. Mais les proportions exactes sont un secret jalousement gardé. Cherche un alchimiste ou un marchand qui a voyagé jusqu'en Chine.",
		responseIfMissingResource:
			'Tu connais la recette, mais il te manque les ingrédients. Le salpêtre se récolte sur les vieux murs humides ou dans les étables — lentement. Le soufre vient des régions volcaniques. Le charbon de bois est facile, au moins. Cherche un apothicaire ou un marchand de minéraux.',
		responseIfInconceivable:
			"Faire exploser des choses ? C'est de la sorcellerie ou de la folie. Aucun mélange de substances que je connaisse ne pourrait produire un tel effet. Tu as trop écouté les contes des voyageurs.",
		minYear: 900,
		maxYear: 1400,
		domain: 'alchemy',
	},

	{
		id: 'feas_invent_steam_engine',
		triggerKeywords: [
			'machine à vapeur',
			'vapeur',
			'moteur',
			'machine',
			'piston',
			'chaudière',
			'force de la vapeur',
		],
		intentCategory: 'invent',
		requiredTechs: ['tech_steam_engine', 'tech_blast_furnace'],
		requiredResources: ['iron', 'copper', 'coal', 'precision_tools'],
		requiredKnowledge: ['know_iron_smelting', 'know_blast_furnace'],
		responseIfFeasible:
			'La vapeur comme force motrice — Newcomen et Watt ont montré la voie. Tu connais le travail du fer, les hauts fourneaux et les principes mécaniques. Il faut un cylindre en fer de précision, un piston étanche, une chaudière solide et de la houille. Un bon atelier de mécanique peut monter un prototype.',
		responseIfMissingTech:
			"Utiliser la vapeur pour mouvoir une machine ? L'idée est audacieuse. Héron d'Alexandrie jouait avec des boules tournantes, mais pour une vraie machine, il faudrait du fer de haute qualité, usiné avec une précision que nos forgerons n'atteignent pas encore. Il manque les savoirs métallurgiques et mécaniques de base.",
		responseIfMissingResource:
			'Tu sais comment ça fonctionne en théorie, mais construire un tel engin demande du fer usiné avec une précision extrême, du cuivre pour les joints, et de la houille en quantité. Les mines et les fonderies devront être mobilisées.',
		responseIfInconceivable:
			"L'eau qui bout peut faire tourner une roue ? Tu plaisantes. L'eau bouillonne, oui, mais de là à remplacer un bœuf ou un moulin... C'est un rêve d'alchimiste. La force vient des bêtes, du vent et de l'eau courante — pas d'une marmite.",
		minYear: 1600,
		maxYear: 1850,
		domain: 'engineering',
	},

	{
		id: 'feas_invent_electricity',
		triggerKeywords: [
			'électricité',
			'courant',
			'foudre',
			'éclair',
			'énergie électrique',
			'lumière électrique',
			'ampoule',
		],
		intentCategory: 'invent',
		requiredTechs: ['tech_electricity'],
		requiredResources: ['copper', 'zinc', 'glass', 'wire'],
		requiredKnowledge: ['know_scientific_method'],
		responseIfFeasible:
			"L'électricité — cette force invisible qui circule dans les fils de cuivre — est à portée de main. Tu comprends les principes de Faraday et la pile de Volta. Il faut des fils conducteurs, des générateurs et beaucoup d'expérimentation. C'est l'avenir.",
		responseIfMissingTech:
			"Capturer la foudre dans un fil ? Franklin a montré que c'était possible avec son paratonnerre, mais de là à en faire une force utile, il faut des connaissances que personne ne maîtrise encore pleinement. La route est longue.",
		responseIfMissingResource:
			"La théorie est solide, mais il te faut du cuivre en grande quantité pour les fils, du zinc et des acides pour les piles, et du verre pour l'isolation. C'est un investissement considérable.",
		responseIfInconceivable:
			"La foudre est la colère de Dieu — ou de Zeus, selon les anciens. L'idée de la capturer et de la mettre dans un fil est absurde. Tu ne peux pas dompter les cieux.",
		minYear: 1750,
		maxYear: 1920,
		domain: 'engineering',
	},

	// ========================================================================
	// EXPLORATION
	// ========================================================================

	{
		id: 'feas_explore_ocean',
		triggerKeywords: [
			"traverser l'océan",
			'nouveau monde',
			'Atlantique',
			'explorer',
			'terre inconnue',
			'voyage en mer',
			'découvrir des terres',
		],
		intentCategory: 'explore',
		requiredTechs: [
			'tech_caravel',
			'tech_compass',
			'tech_celestial_navigation',
		],
		requiredResources: ['ships', 'provisions', 'crew', 'gold'],
		requiredKnowledge: [
			'know_basic_sailing',
			'know_compass',
			'know_celestial_navigation',
		],
		responseIfFeasible:
			"Traverser l'océan — c'est le rêve de tout navigateur audacieux. Tu as la boussole, tu sais naviguer aux étoiles, et la caravelle peut affronter la haute mer. Il te faut un équipage courageux, des provisions pour des mois, et un mécène — roi ou marchand — prêt à financer l'expédition. Que Dieu te guide.",
		responseIfMissingTech:
			"S'aventurer en haute mer avec nos navires actuels, c'est du suicide. Il faudrait un navire capable de naviguer contre le vent, un instrument pour garder le cap sans voir les côtes, et des cartes fiables. La boussole et la caravelle n'existent pas encore chez nous. Commence par améliorer tes navires.",
		responseIfMissingResource:
			'Tu as les savoirs et les instruments, mais une telle expédition coûte une fortune. Il faut des navires solides, des mois de provisions, un équipage de marins expérimentés et un commanditaire. Adresse-toi à la couronne ou aux marchands les plus riches.',
		responseIfInconceivable:
			"Traverser la grande mer ? Personne ne sait ce qu'il y a de l'autre côté — si tant est qu'il y ait un autre côté. La mer des Ténèbres ne se traverse pas. Les monstres marins y rôdent, et le bord du monde n'est peut-être pas loin.",
		minYear: 1000,
		maxYear: 1600,
		domain: 'navigation',
	},

	// ========================================================================
	// COMMERCE
	// ========================================================================

	{
		id: 'feas_trade_route',
		triggerKeywords: [
			'ouvrir une route',
			'commercer',
			'route commerciale',
			'établir un commerce',
			'importer',
			'exporter',
		],
		intentCategory: 'trade',
		requiredTechs: ['tech_basic_trade'],
		requiredResources: ['gold', 'goods', 'pack_animals'],
		requiredKnowledge: ['know_basic_trade'],
		responseIfFeasible:
			'Le commerce est le sang de la civilisation. Tu connais les bases — acheter bas, vendre haut, connaître les routes. Il te faut du capital de départ, des marchandises demandées à destination, des bêtes de somme ou un navire, et des gardes armés pour la route. Les foires sont le meilleur point de départ.',
		responseIfMissingTech:
			"Pour commercer au-delà de ton village, il faut comprendre les monnaies, les poids et mesures, et les droits de passage. Ces savoirs s'apprennent auprès de marchands expérimentés. Commence comme apprenti d'un marchand établi.",
		responseIfMissingResource:
			"Tu sais commercer, mais sans capital de départ, tu ne peux rien. Il faut de l'or ou des marchandises à échanger, des bêtes de somme pour les transporter, et au moins un compagnon de route. Épargne ou trouve un associé.",
		responseIfInconceivable:
			"Le troc suffit parfaitement quand on vit de la terre. Pourquoi aller au loin quand tout ce qu'il faut est ici ? Les marchands sont des gens étranges qui courent après des chimères.",
		minYear: 0,
		maxYear: 9999,
		domain: 'trade',
	},

	// ========================================================================
	// AGRICULTURE AVANCÉE
	// ========================================================================

	{
		id: 'feas_improve_farming',
		triggerKeywords: [
			'améliorer les récoltes',
			'produire plus',
			'rendement',
			'meilleure agriculture',
			'nourrir plus de monde',
		],
		intentCategory: 'farm',
		requiredTechs: ['tech_crop_rotation', 'tech_heavy_plow'],
		requiredResources: ['iron', 'oxen', 'seeds'],
		requiredKnowledge: ['know_basic_farming', 'know_crop_rotation'],
		responseIfFeasible:
			"Tu connais déjà la rotation des cultures et la charrue lourde — c'est la base. Pour produire plus, il faut aussi drainer les terres humides, fumer les champs avec le fumier du bétail, et choisir les meilleures semences d'une année sur l'autre. Les moines cisterciens sont les meilleurs fermiers — observe leurs méthodes.",
		responseIfMissingTech:
			'La terre peut donner plus, mais il faut savoir comment. La rotation des cultures — alterner les grains et les légumineuses — et la charrue lourde à soc de fer sont les clés. Tu ne les maîtrises pas encore. Apprends auprès des domaines qui les pratiquent déjà.',
		responseIfMissingResource:
			"Tu sais comment faire, mais il te manque les moyens. Une charrue lourde exige un soc en fer et des bœufs pour la tirer. Les bonnes semences se trouvent auprès des meilleurs fermiers. Investis dans tes outils avant d'étendre tes terres.",
		responseIfInconceivable:
			"La terre donne ce que Dieu décide. Les mauvaises récoltes sont Sa punition, les bonnes Sa bénédiction. Prie et travaille — c'est tout ce que tu peux faire.",
		minYear: 800,
		maxYear: 1500,
		domain: 'agriculture',
	},

	// ========================================================================
	// MILITAIRE
	// ========================================================================

	{
		id: 'feas_build_army',
		triggerKeywords: [
			'lever une armée',
			'recruter des soldats',
			'préparer la guerre',
			'attaquer',
			'défendre mon territoire',
		],
		intentCategory: 'military',
		requiredTechs: ['tech_metal_weapons', 'tech_armor'],
		requiredResources: ['iron', 'food', 'gold', 'men'],
		requiredKnowledge: ['know_iron_smelting'],
		responseIfFeasible:
			"Lever une armée, c'est d'abord une question d'argent et d'hommes. Tes vassaux te doivent 40 jours de service. Au-delà, il faut payer des mercenaires. Il faut des armes — épées, lances, arcs — de l'armure, de la nourriture pour la campagne, et un capitaine qui sache commander. Prépare-toi en temps de paix.",
		responseIfMissingTech:
			"Pour lever une armée digne de ce nom, il faut des armes en fer et des armures. Des paysans avec des fourches ne font pas des soldats. Il te faut d'abord des forgerons capables de produire des armes en quantité.",
		responseIfMissingResource:
			"Tu sais te battre, mais la guerre coûte cher. Il faut du fer pour les armes, de la nourriture pour les troupes, de l'or pour les mercenaires. Un seigneur sans trésor ne lève pas d'armée. Remplis tes coffres d'abord.",
		responseIfInconceivable:
			"Tu veux faire la guerre ? Avec quoi — des bâtons et des cailloux ? Il faut d'abord savoir forger le fer, puis fabriquer des armes. Tu n'en es pas là.",
		minYear: 0,
		maxYear: 9999,
		domain: 'military',
	},

	// ========================================================================
	// MÉDECINE
	// ========================================================================

	{
		id: 'feas_cure_plague',
		triggerKeywords: [
			'peste',
			'épidémie',
			'soigner la peste',
			'maladie',
			'guérir',
			'contagion',
			'fléau',
		],
		intentCategory: 'heal',
		requiredTechs: ['tech_quarantine'],
		requiredResources: ['herbs', 'vinegar', 'isolation'],
		requiredKnowledge: ['know_herbal_medicine', 'know_humoral_medicine'],
		responseIfFeasible:
			"La peste est le pire des fléaux, mais on peut limiter ses ravages. La quarantaine — isoler les malades pendant 40 jours — freine la contagion. Le vinaigre purifie les airs. Les herbes aromatiques dans un masque filtrent les miasmes. Brûle les vêtements des morts. Éloigne les bien-portants des malades. Ce n'est pas une cure, mais ça sauve des vies.",
		responseIfMissingTech:
			"Guérir la peste... personne ne le peut. Mais on peut tenter de la contenir. Les Vénitiens pratiquent la quarantaine, mais nous ne connaissons pas encore cette méthode. Le vinaigre, la fumigation aux herbes et l'isolement sont tout ce que nous avons.",
		responseIfMissingResource:
			"Tu sais ce qu'il faut faire — isoler les malades, purifier l'air au vinaigre — mais il te manque les moyens. Il faut un lieu isolé pour la quarantaine, des herbes en quantité, du vinaigre, et des gens courageux pour s'occuper des malades.",
		responseIfInconceivable:
			"La peste est la volonté de Dieu. On ne lutte pas contre Dieu. Prie, fais pénitence, et espère Sa miséricorde. C'est tout ce que nous pouvons faire.",
		minYear: 500,
		maxYear: 1700,
		domain: 'medicine',
	},

	// ========================================================================
	// SAVOIRS
	// ========================================================================

	{
		id: 'feas_learn_read',
		triggerKeywords: [
			'lire',
			'écrire',
			'apprendre à lire',
			'alphabétisation',
			'lettres',
			'instruction',
		],
		intentCategory: 'learn',
		requiredTechs: ['tech_basic_writing'],
		requiredResources: ['parchment', 'ink', 'teacher'],
		requiredKnowledge: [],
		responseIfFeasible:
			"Apprendre à lire et écrire — c'est ouvrir la porte de tout le savoir du monde. Les moines enseignent le latin dans les écoles monastiques. Les prêtres de paroisse acceptent parfois des élèves. Il faut du parchemin (cher), de l'encre, et surtout du temps — beaucoup de temps. Mais une fois que tu sais lire, tu ne dépends plus de personne pour accéder au savoir.",
		responseIfMissingTech:
			"L'écriture est un art ancien, mais rares sont ceux qui la maîtrisent hors du clergé. Trouve un moine ou un clerc qui accepte de t'enseigner. C'est un parcours long et difficile pour quelqu'un qui n'est pas né dans un milieu lettré.",
		responseIfMissingResource:
			"Tu veux apprendre à lire ? C'est admirable. Mais il te faut un maître (un clerc ou un moine), du parchemin et de l'encre — ou au moins une tablette de cire pour s'entraîner. Les écoles monastiques sont ton meilleur espoir.",
		responseIfInconceivable:
			"Lire ? C'est un art de clerc. Les gens comme nous n'en ont pas besoin — la terre ne se lit pas, elle se travaille. Et le curé lit les Écritures pour nous le dimanche.",
		minYear: 0,
		maxYear: 9999,
		domain: 'linguistics',
	},
]
