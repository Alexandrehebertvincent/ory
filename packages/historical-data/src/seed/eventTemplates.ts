import type { EventTemplate } from '../../../shared/src/types/world'

// ============================================================================
// Modèles d'événements locaux — Génération procédurale
// ============================================================================
// Ces templates sont instanciés par le moteur de jeu selon les conditions
// locales (climat, stabilité, richesse, proximité de routes, etc.).
// Sévérité 1-5. Récurrents. Ciblés par classe sociale.
//
// Catégories couvertes :
//   🌾 Agriculture & famine       🏥 Santé & épidémies
//   ⚔️ Violence & insécurité      🛐 Religion & superstition
//   💰 Commerce & économie        🏗️ Infrastructure & catastrophes
//   👑 Politique & seigneurie     🎭 Culture & vie quotidienne
//   🌊 Climat & catastrophes naturelles
//   🧭 Exploration & découverte
// ============================================================================

export const eventTemplates: EventTemplate[] = [
	// ========================================================================
	// 🌾 AGRICULTURE & FAMINE
	// ========================================================================

	{
		id: 'tpl_bad_harvest',
		name: 'Mauvaise récolte',
		description:
			'Les récoltes sont mauvaises cette année. Les greniers se vident et les prix du grain montent en flèche. Les plus pauvres souffrent en premier.',
		category: 'economic',
		scope: 'local',
		severity: 3,
		targetClasses: ['peasant', 'artisan'],
		recurring: true,
		cooldownYears: 2,
		baseProbability: 0.12,
		triggerConditions: {
			maxWealth: 5,
			season: 'autumn',
			customCondition:
				'Déclenché si les précipitations sont insuffisantes ou si un gel tardif a détruit les semis.',
		},
		defaultEffects: {
			wealthModifier: -2,
			populationModifier: -0.01,
			stabilityModifier: -1,
			customEffect:
				'Prix du grain ×2. Les paysans vendent leurs outils ou leur bétail. Migration vers la ville si la famine persiste.',
		},
		playerChoices: [
			{
				id: 'tpl_bh_ration',
				label: 'Rationner les réserves',
				description:
					'Partager les stocks équitablement. Le village survit mais affaibli.',
				effects: { wealthModifier: -1, healthModifier: -1 },
			},
			{
				id: 'tpl_bh_steal',
				label: 'Voler dans les greniers du seigneur',
				description: 'Risqué — la pendaison guette, mais la famille mange.',
				effects: {
					wealthModifier: 1,
					reputationModifier: -2,
					stabilityModifier: -1,
				},
			},
			{
				id: 'tpl_bh_migrate',
				label: 'Partir vers la ville',
				description: 'Abandonner la terre pour chercher du travail en ville.',
				effects: { reputationModifier: -1, wealthModifier: -1 },
			},
		],
		flavorTexts: [
			"Les épis de blé sont rachitiques cette année. Les vieux disent que c'est le pire depuis la grande sécheresse.",
			"La pluie n'est pas venue. Les champs craquent sous le soleil. Les enfants pleurent de faim.",
			"Le gel de mai a brûlé les bourgeons. Il n'y aura presque rien à moissonner.",
		],
		tags: ['famine', 'agriculture', 'pauvreté', 'grain'],
	},

	{
		id: 'tpl_excellent_harvest',
		name: 'Récolte exceptionnelle',
		description:
			'La terre a été généreuse. Les greniers débordent, les marchés regorgent et les fêtes de la moisson durent trois jours.',
		category: 'economic',
		scope: 'local',
		severity: 2,
		targetClasses: ['peasant', 'merchant'],
		recurring: true,
		cooldownYears: 3,
		baseProbability: 0.08,
		triggerConditions: {
			minStability: 4,
			minWealth: 3,
			season: 'autumn',
			customCondition:
				"Précipitations optimales et pas de gel tardif. Pas de passage d'armée sur les champs.",
		},
		defaultEffects: {
			wealthModifier: 2,
			stabilityModifier: 1,
			customEffect:
				"Prix du grain ÷2. Excédent commercialisable. Bière et pain en abondance. Les naissances augmentent l'année suivante.",
		},
		playerChoices: [
			{
				id: 'tpl_eh_sell',
				label: 'Vendre le surplus au marché',
				description: "Profit immédiat mais stocks réduits pour l'hiver.",
				effects: { wealthModifier: 2 },
			},
			{
				id: 'tpl_eh_store',
				label: "Stocker pour l'hiver",
				description: 'Pas de profit immédiat mais sécurité alimentaire.',
				effects: { healthModifier: 1, stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			"Les gerbes de blé sont si lourdes que les charrettes craquent. On n'a pas vu ça depuis vingt ans.",
			'Le verger ploie sous les pommes. Les enfants chantent en courant dans les champs dorés.',
		],
		tags: ['récolte', 'abondance', 'agriculture', 'fête'],
	},

	{
		id: 'tpl_abundant_fishing',
		name: 'Pêche miraculeuse',
		description:
			"Les bancs de poissons affluent comme jamais. Les filets reviennent si lourds qu'il faut trois hommes pour les hisser. On sale, on fume, on sèche — il y en a pour tout l'hiver.",
		category: 'economic',
		scope: 'local',
		severity: 2,
		targetClasses: ['peasant', 'merchant'],
		recurring: true,
		cooldownYears: 4,
		baseProbability: 0.06,
		triggerConditions: {
			nearCoast: true,
			season: 'spring',
			customCondition:
				'Courants marins favorables, absence de tempêtes prolongées. Plus probable au printemps et en automne, quand les bancs migrent. Les communautés côtières et fluviales en profitent.',
		},
		defaultEffects: {
			wealthModifier: 2,
			healthModifier: 1,
			stabilityModifier: 1,
			customEffect:
				'Surplus de poisson salé et fumé. Alimentation améliorée. Commerce possible avec les régions intérieures. Les fêtes de la pêche renforcent la cohésion communautaire.',
		},
		playerChoices: [
			{
				id: 'tpl_af_sell',
				label: 'Vendre le surplus aux marchands',
				description:
					"Profit rapide. Le poisson salé s'écoule bien sur les marchés.",
				effects: { wealthModifier: 2 },
			},
			{
				id: 'tpl_af_store',
				label: "Constituer des réserves pour l'hiver",
				description:
					'Fumer et saler pour les mois difficiles. La prudence paie.',
				effects: { healthModifier: 1, stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			"Les barques reviennent si chargées qu'elles enfoncent jusqu'au plat-bord. Les mouettes tournoient par centaines — c'est une année bénie.",
			"Le vieux Guiraud dit que la mer donne quand elle veut. Aujourd'hui, elle donne comme jamais. Les femmes chantent en vidant les filets.",
		],
		tags: ['pêche', 'abondance', 'nourriture', 'côte'],
	},

	{
		id: 'tpl_beneficial_rains',
		name: 'Pluies bienfaitrices',
		description:
			'Après des semaines sèches, les pluies arrivent au moment parfait — assez pour gorger la terre, pas assez pour noyer les semis. Les anciens sourient : la récolte sera bonne.',
		category: 'natural',
		scope: 'regional',
		severity: 2,
		targetClasses: ['peasant'],
		recurring: true,
		cooldownYears: 2,
		baseProbability: 0.1,
		triggerConditions: {
			season: 'spring',
			customCondition:
				'Précipitations optimales au bon moment du cycle agricole. Plus fréquent dans les régions tempérées. Incompatible avec une sécheresse en cours.',
		},
		defaultEffects: {
			wealthModifier: 1,
			stabilityModifier: 1,
			customEffect:
				'Les champs verdissent en une semaine. Nappes phréatiques rechargées. Les puits et fontaines coulent à nouveau. Optimisme dans les campagnes.',
		},
		playerChoices: [],
		flavorTexts: [
			'La pluie a tambouriné toute la nuit sur les toits de chaume. Au matin, la terre exhale cette odeur de vie. Les bourgeons éclatent.',
			"Le curé dit que c'est la bénédiction du Seigneur. Le paysan dit que c'est la pluie de mars qui fait tout. Les deux ont raison.",
		],
		tags: ['pluie', 'agriculture', 'bienfait', 'climat'],
	},

	{
		id: 'tpl_mild_winter',
		name: 'Hiver clément',
		description:
			"L'hiver est doux cette année. Peu de gel, peu de neige, les rivières ne gèlent pas. Les provisions durent plus longtemps et les pertes humaines sont moindres.",
		category: 'natural',
		scope: 'regional',
		severity: 2,
		targetClasses: ['peasant', 'artisan', 'any'],
		recurring: true,
		cooldownYears: 3,
		baseProbability: 0.08,
		triggerConditions: {
			season: 'winter',
			customCondition:
				'Températures hivernales supérieures à la normale. Pas de vague de froid prolongée. Plus rare pendant le Petit Âge glaciaire.',
		},
		defaultEffects: {
			healthModifier: 1,
			populationModifier: 0.005,
			stabilityModifier: 1,
			customEffect:
				'Moins de morts hivernales (vieillards, nourrissons). Le bétail survit mieux. Les routes restent praticables. Le commerce hivernal continue.',
		},
		playerChoices: [],
		flavorTexts: [
			'Noël sans neige. Les vieux trouvent ça inquiétant, les jeunes trouvent ça agréable. Les bêtes restent dehors et le foin dure.',
			"La rivière n'a pas gelé cette année. Le meunier tourne encore en janvier. On mange du pain frais en plein hiver — quel luxe.",
		],
		tags: ['hiver', 'climat', 'douceur', 'santé'],
	},

	{
		id: 'tpl_volcanic_fertility',
		name: 'Cendres fertiles',
		description:
			"Une éruption lointaine a couvert les champs d'une fine couche de cendres volcaniques. Ce qui semblait une malédiction s'avère une bénédiction : la terre est enrichie comme jamais.",
		category: 'natural',
		scope: 'regional',
		severity: 2,
		targetClasses: ['peasant'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.02,
		triggerConditions: {
			requiredBiomes: [
				'clim_mediterranean',
				'clim_southeast_asia',
				'clim_east_africa_highland',
				'clim_hokkaido',
			],
			customCondition:
				"Zones volcaniques uniquement. Éruption modérée dont les retombées de cendres enrichissent les sols sans détruire les cultures. Effet visible l'année suivante.",
		},
		defaultEffects: {
			wealthModifier: 2,
			stabilityModifier: 1,
			customEffect:
				'Rendements agricoles doublés pendant 2-3 ans. Les sols volcaniques sont parmi les plus fertiles au monde. Attire de nouveaux colons.',
		},
		playerChoices: [
			{
				id: 'tpl_vf_expand',
				label: 'Défricher de nouvelles terres',
				description: 'Profiter de la fertilité pour étendre les cultures.',
				effects: { wealthModifier: 2 },
			},
			{
				id: 'tpl_vf_rest',
				label: 'Laisser les champs en jachère enrichie',
				description:
					'La terre se repose et accumule encore plus de nutriments.',
				effects: { stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			"La montagne a craché sa fumée il y a deux saisons. Aujourd'hui, les tomates sont grosses comme des poings et les vignes ploient sous le raisin.",
			'Les anciens le savaient : la terre noire du volcan est la meilleure. Ce que le feu détruit, la cendre le rend au centuple.',
		],
		tags: ['volcan', 'fertilité', 'cendre', 'agriculture'],
	},

	{
		id: 'tpl_hot_spring_discovery',
		name: 'Découverte de sources chaudes',
		description:
			"On a trouvé des sources d'eau chaude naturelle. Les malades s'y baignent et guérissent — ou du moins le croient. Le lieu attire pèlerins et curieux.",
		category: 'natural',
		scope: 'local',
		severity: 1,
		targetClasses: ['any'],
		recurring: false,
		cooldownYears: 0,
		baseProbability: 0.01,
		triggerConditions: {
			requiredBiomes: [
				'clim_mediterranean',
				'clim_hokkaido',
				'clim_east_africa_highland',
				'clim_tibetan_plateau',
			],
			customCondition:
				'Zones géothermiques. Plus probable lors de travaux de défrichement ou après un séisme mineur qui ouvre de nouvelles fissures.',
		},
		defaultEffects: {
			healthModifier: 1,
			stabilityModifier: 1,
			customEffect:
				'Lieu de guérison réputé. Attire des visiteurs. Possible développement thermal à long terme. Rhumatismes et maladies de peau soignés.',
		},
		playerChoices: [
			{
				id: 'tpl_hs_exploit',
				label: 'Aménager un bain public',
				description: 'Investir pour accueillir les visiteurs payants.',
				effects: { wealthModifier: 2, reputationModifier: 1 },
			},
			{
				id: 'tpl_hs_sacred',
				label: 'Déclarer le lieu sacré',
				description:
					'La source devient un lieu de pèlerinage. Prestige religieux.',
				effects: { reputationModifier: 2, religiousTensionModifier: -1 },
			},
		],
		flavorTexts: [
			"Le berger cherchait une brebis égarée. Il a trouvé un bassin d'eau fumante au creux de la roche. L'eau sent le soufre mais elle est merveilleusement chaude.",
			"Depuis qu'on a trouvé la source, le vieux Thomas ne boite plus. Miracle ou nature ? Le curé et le barbier ne sont pas d'accord.",
		],
		tags: ['source', 'thermes', 'guérison', 'découverte'],
	},

	{
		id: 'tpl_whale_stranding',
		name: 'Échouage de baleine',
		description:
			"Une baleine s'échoue sur le rivage. Des tonnes de viande, de graisse et d'os — une aubaine inespérée pour tout le village côtier.",
		category: 'economic',
		scope: 'local',
		severity: 1,
		targetClasses: ['peasant', 'artisan'],
		recurring: true,
		cooldownYears: 8,
		baseProbability: 0.02,
		triggerConditions: {
			nearCoast: true,
			customCondition:
				'Côtes atlantiques, nordiques ou méditerranéennes. Événement rare mais historiquement documenté. Contestation fréquente du droit de propriété (seigneur vs village vs Église).',
		},
		defaultEffects: {
			wealthModifier: 2,
			stabilityModifier: 1,
			customEffect:
				'Viande et graisse pour des semaines. Huile de baleine pour les lampes. Os pour les outils et la construction. Le seigneur réclame souvent sa part ("droit d\'épave").',
		},
		playerChoices: [
			{
				id: 'tpl_ws_share',
				label: 'Partager avec le village',
				description: 'Répartition équitable. Tout le monde mange.',
				effects: { reputationModifier: 2, stabilityModifier: 1 },
			},
			{
				id: 'tpl_ws_sell',
				label: 'Vendre la graisse aux marchands',
				description: "L'huile de baleine vaut de l'or. Profit personnel.",
				effects: { wealthModifier: 3, reputationModifier: -1 },
			},
		],
		flavorTexts: [
			"La bête est énorme — plus longue que trois charrettes. Tout le village est sur la plage, couteaux en main. L'odeur est terrible mais la graisse vaut de l'or.",
			"Le seigneur dit que la baleine lui appartient. Le village dit que c'est Dieu qui l'a envoyée. Le curé dit que c'est à l'Église. La dispute durera plus longtemps que la viande.",
		],
		tags: ['baleine', 'côte', 'abondance', 'aubaine'],
	},

	{
		id: 'tpl_cattle_disease',
		name: 'Épizootie — Maladie du bétail',
		description:
			"Une maladie frappe le bétail local. Les bêtes meurent à vue d'œil. Sans bœufs de trait, pas de labour ; sans vaches, pas de lait.",
		category: 'natural',
		scope: 'local',
		severity: 3,
		targetClasses: ['peasant'],
		recurring: true,
		cooldownYears: 5,
		baseProbability: 0.06,
		triggerConditions: {
			season: 'summer',
			customCondition:
				'Chaleur excessive ou eau contaminée. Plus probable si un marché aux bestiaux a eu lieu récemment (transmission).',
		},
		defaultEffects: {
			wealthModifier: -2,
			populationModifier: -0.005,
			customEffect:
				"Perte de 30-60 % du cheptel. Pas de labour → mauvaise récolte l'année suivante. Le cuir et la viande manquent.",
			triggerTemplateIds: ['tpl_bad_harvest'],
		},
		playerChoices: [
			{
				id: 'tpl_cd_isolate',
				label: 'Isoler les bêtes malades',
				description: 'Sacrifier quelques têtes pour sauver le troupeau.',
				effects: { wealthModifier: -1 },
			},
			{
				id: 'tpl_cd_pray',
				label: 'Appeler le prêtre pour bénir le troupeau',
				description: 'Inefficace mais réconfortant. La communauté se soude.',
				effects: { stabilityModifier: 1, wealthModifier: -1 },
			},
		],
		flavorTexts: [
			"La vieille Marguerite a perdu ses trois vaches en une semaine. Le mal se répand d'étable en étable.",
			'Le veau est né mort et couvert de pustules. Le paysan regarde ses bêtes avec terreur.',
		],
		tags: ['bétail', 'maladie', 'agriculture', 'épizootie'],
	},

	{
		id: 'tpl_locust_swarm',
		name: 'Invasion de criquets',
		description:
			"Un nuage de criquets s'abat sur la région, dévorant tout sur son passage. Les champs sont nus en quelques heures.",
		category: 'natural',
		scope: 'regional',
		severity: 4,
		targetClasses: ['peasant', 'any'],
		recurring: true,
		cooldownYears: 8,
		baseProbability: 0.03,
		triggerConditions: {
			requiredBiomes: [
				'clim_sahel',
				'clim_arid_mideast',
				'clim_mediterranean',
				'clim_mediterranean',
			],
			season: 'summer',
			customCondition:
				'Plus fréquent dans les zones arides après une saison humide inhabituelle.',
		},
		defaultEffects: {
			wealthModifier: -3,
			populationModifier: -0.02,
			stabilityModifier: -2,
			triggerTemplateIds: ['tpl_bad_harvest', 'tpl_famine_local'],
			customEffect:
				'Destruction totale des cultures. Famine garantie si les réserves sont faibles. Interprété comme un signe divin.',
		},
		playerChoices: [],
		flavorTexts: [
			"Le ciel s'assombrit. Ce ne sont pas des nuages — ce sont des millions de criquets. En une heure, il ne reste plus un brin d'herbe.",
			'Le bruit est assourdissant. Les ailes crissent par millions. Les enfants hurlent, les femmes prient.',
		],
		tags: ['criquets', 'famine', 'catastrophe', 'agriculture'],
	},

	{
		id: 'tpl_famine_local',
		name: 'Famine locale',
		description:
			"La faim s'installe durablement. Les gens mangent de l'écorce, des racines, des chiens. Les plus faibles meurent — vieillards, enfants, malades.",
		category: 'natural',
		scope: 'regional',
		severity: 5,
		targetClasses: ['peasant', 'artisan', 'any'],
		recurring: true,
		cooldownYears: 5,
		baseProbability: 0.04,
		triggerConditions: {
			maxWealth: 3,
			maxStability: 4,
			customCondition:
				"Déclenché après 2+ mauvaises récoltes consécutives, ou suite à une guerre/passage d'armée qui a détruit les stocks.",
		},
		defaultEffects: {
			populationModifier: -0.05,
			wealthModifier: -3,
			stabilityModifier: -3,
			healthModifier: -2,
			triggerTemplateIds: ['tpl_bandit_raid', 'tpl_peasant_flight'],
			customEffect:
				'Mortalité infantile en hausse. Cannibalisme dans les cas extrêmes. Exode rural massif. Les survivants sont affaiblis pour des années.',
		},
		playerChoices: [
			{
				id: 'tpl_fam_beg',
				label: 'Mendier au monastère',
				description:
					'Les moines distribuent de la soupe. Humiliant mais vital.',
				effects: { healthModifier: 1, reputationModifier: -1 },
			},
			{
				id: 'tpl_fam_hunt',
				label: 'Braconner dans la forêt du seigneur',
				description:
					'Du gibier pour la famille. Mais le braconnage est puni de mort.',
				effects: { healthModifier: 1, reputationModifier: -2 },
			},
			{
				id: 'tpl_fam_flee',
				label: 'Fuir vers une autre région',
				description:
					'Tout abandonner pour survivre. Peut-être un nouveau départ.',
				effects: { wealthModifier: -2 },
			},
		],
		flavorTexts: [
			'On a retrouvé le vieux Pierre mort dans son champ, la bouche pleine de terre. La faim rend fou.',
			"Les enfants ont le ventre gonflé et les yeux creux. Le prêtre dit que c'est la punition de Dieu.",
			'Les rats ont pris les derniers grains du grenier. Il ne reste plus rien.',
		],
		tags: ['famine', 'mort', 'pauvreté', 'crise'],
	},

	// ========================================================================
	// 🏥 SANTÉ & ÉPIDÉMIES
	// ========================================================================

	{
		id: 'tpl_plague_rumor',
		name: 'Rumeur de peste',
		description:
			"Des marchands parlent d'une maladie terrible dans les villes voisines. Les morts s'entassent, dit-on. La peur s'installe avant la maladie elle-même.",
		category: 'health',
		scope: 'regional',
		severity: 2,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 3,
		baseProbability: 0.06,
		triggerConditions: {
			nearTradeRoute: true,
			requiredActiveEvents: ['evt_black_death_europe'],
			customCondition:
				"Déclenché 6-12 mois avant l'arrivée réelle de la peste dans la zone. Plus probable près des routes commerciales et des ports.",
		},
		defaultEffects: {
			stabilityModifier: -1,
			religiousTensionModifier: 1,
			customEffect:
				'Panique. Les gens fuient, répandant potentiellement la maladie. Prix des remèdes en hausse. Les étrangers sont suspectés.',
			triggerTemplateIds: ['tpl_local_epidemic'],
		},
		playerChoices: [
			{
				id: 'tpl_pr_prepare',
				label: 'Se préparer — stocks et isolement',
				description:
					'Acheter du vinaigre, des herbes, stocker de la nourriture. Éviter les étrangers.',
				effects: { wealthModifier: -1, healthModifier: 1 },
			},
			{
				id: 'tpl_pr_flee',
				label: 'Fuir vers la campagne',
				description:
					'Quitter la ville immédiatement. On reviendra quand ce sera fini.',
				effects: { wealthModifier: -1, reputationModifier: -1 },
			},
			{
				id: 'tpl_pr_ignore',
				label: 'Ignorer les rumeurs',
				description: 'Des histoires de voyageurs. Assurément exagéré.',
				effects: {},
			},
		],
		flavorTexts: [
			"Un marchand de Gênes jure qu'il a vu des rues entières de cadavres. Les rats fuient les navires au port.",
			'Le voisin dit que dans la ville voisine, on ne peut plus enterrer les morts assez vite. Les fosses débordent.',
		],
		tags: ['peste', 'rumeur', 'peur', 'maladie'],
	},

	{
		id: 'tpl_local_epidemic',
		name: 'Épidémie locale',
		description:
			"Une maladie se répand — dysenterie, fièvre typhoïde, variole ou peste. Les malades s'entassent, les fossoyeurs travaillent jour et nuit.",
		category: 'health',
		scope: 'local',
		severity: 4,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 5,
		baseProbability: 0.05,
		triggerConditions: {
			maxStability: 5,
			nearTradeRoute: true,
			customCondition:
				'Plus fréquent en été (eau contaminée) ou après une famine (immunité affaiblie). Les villes sont plus touchées que les campagnes.',
		},
		defaultEffects: {
			populationModifier: -0.08,
			healthModifier: -2,
			stabilityModifier: -2,
			wealthModifier: -1,
			customEffect:
				'10-30 % de mortalité locale. Les métiers liés au contact (barbiers, lavandières) sont les plus touchés. Les riches fuient à la campagne.',
		},
		playerChoices: [
			{
				id: 'tpl_le_nurse',
				label: 'Soigner les malades',
				description: 'Acte de charité héroïque. Risque de contagion élevé.',
				effects: { reputationModifier: 3, healthModifier: -2 },
			},
			{
				id: 'tpl_le_barricade',
				label: 'Se barricader chez soi',
				description:
					"Fermer la porte et prier. Si les stocks suffisent, on s'en sort.",
				effects: { healthModifier: 1, reputationModifier: -1 },
			},
			{
				id: 'tpl_le_scapegoat',
				label: 'Accuser les étrangers / juifs',
				description: 'Trouver un bouc émissaire. La foule veut des coupables.',
				effects: { stabilityModifier: -2, religiousTensionModifier: 2 },
			},
		],
		flavorTexts: [
			"Le fossoyeur ne dort plus. Cinq enterrements aujourd'hui, et la nuit n'est pas finie.",
			"Les bubons noirs apparaissent à l'aine et aux aisselles. Le médecin porte un masque au bec rempli de lavande.",
			"L'eau du puits a un goût étrange. Depuis, la moitié du quartier est alitée.",
		],
		tags: ['épidémie', 'peste', 'maladie', 'mort', 'santé'],
	},

	{
		id: 'tpl_healing_woman',
		name: 'La guérisseuse du village',
		description:
			"Une femme du village connaît les plantes et les remèdes. Elle soigne discrètement, mais l'Église voit d'un mauvais œil ces pratiques « païennes ».",
		category: 'health',
		scope: 'local',
		severity: 1,
		targetClasses: ['peasant', 'artisan'],
		recurring: true,
		cooldownYears: 3,
		baseProbability: 0.07,
		triggerConditions: {
			customCondition:
				"Présent dans la plupart des villages médiévaux. Plus visible quand un médecin n'est pas disponible.",
		},
		defaultEffects: {
			healthModifier: 1,
			customEffect:
				"Soins de base disponibles localement. Remèdes à base de plantes. Risque d'accusation de sorcellerie si la tension religieuse est élevée.",
		},
		playerChoices: [
			{
				id: 'tpl_hw_consult',
				label: 'Consulter la guérisseuse',
				description: "Soins efficaces mais risque d'être vu par le curé.",
				effects: { healthModifier: 1, religiousTensionModifier: 1 },
			},
			{
				id: 'tpl_hw_denounce',
				label: 'La dénoncer comme sorcière',
				description:
					"S'attirer les faveurs du prêtre, mais perdre les soins du village.",
				effects: {
					reputationModifier: 1,
					healthModifier: -1,
					religiousTensionModifier: 1,
				},
			},
		],
		flavorTexts: [
			'La vieille Hildegarde murmure des mots en cueillant le millepertuis à la pleine lune. Sa tisane a sauvé le petit Thomas.',
			'Le curé tonne en chaire contre « les femmes qui murmurent aux herbes ». Pourtant, quand sa servante est tombée malade...',
		],
		tags: ['guérisseuse', 'médecine', 'sorcellerie', 'village'],
	},

	// ========================================================================
	// ⚔️ VIOLENCE & INSÉCURITÉ
	// ========================================================================

	{
		id: 'tpl_bandit_raid',
		name: 'Attaque de brigands',
		description:
			'Des bandits de grand chemin rançonnent les voyageurs et pillent les fermes isolées. Les routes ne sont plus sûres.',
		category: 'military',
		scope: 'local',
		severity: 3,
		targetClasses: ['peasant', 'merchant', 'any'],
		recurring: true,
		cooldownYears: 1,
		baseProbability: 0.1,
		triggerConditions: {
			maxStability: 5,
			customCondition:
				'Plus fréquent en temps de guerre (soldats démobilisés sans solde), en période de famine (désespoir), ou loin des garnisons.',
		},
		defaultEffects: {
			wealthModifier: -1,
			stabilityModifier: -1,
			customEffect:
				'Pillage de fermes et entrepôts. Les marchands évitent la route → prix locaux en hausse. Les voyageurs se déplacent en convoi.',
		},
		playerChoices: [
			{
				id: 'tpl_br_hide',
				label: 'Se cacher et attendre',
				description:
					'Laisser passer les brigands. On perd peu mais on vit dans la peur.',
				effects: { stabilityModifier: -1 },
			},
			{
				id: 'tpl_br_fight',
				label: 'Organiser la milice du village',
				description:
					'Armer les paysans et monter la garde. Risqué mais efficace.',
				effects: { reputationModifier: 2, stabilityModifier: 1 },
			},
			{
				id: 'tpl_br_pay',
				label: 'Payer un tribut aux brigands',
				description: 'Acheter la paix. Les brigands reviendront peut-être.',
				effects: { wealthModifier: -2, stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			'Des cavaliers masqués ont brûlé la ferme des Dupont la nuit dernière. Ils ont pris le grain et les poules.',
			"On a retrouvé le colporteur mort sur le chemin, la bourse coupée. Plus personne n'ose marcher seul.",
		],
		tags: ['brigands', 'violence', 'insécurité', 'route'],
	},

	{
		id: 'tpl_army_passage',
		name: "Passage d'une armée",
		description:
			'Une armée traverse la région — amie ou ennemie, peu importe. Les soldats vivent sur le pays, réquisitionnent le grain, le bétail et parfois les femmes.',
		category: 'military',
		scope: 'regional',
		severity: 4,
		targetClasses: ['peasant', 'artisan', 'any'],
		recurring: true,
		cooldownYears: 2,
		baseProbability: 0.07,
		triggerConditions: {
			requiredActiveEvents: [
				'evt_hundred_years_war_start',
				'evt_french_wars_of_religion',
				'evt_hussite_wars',
				'evt_peasants_war_germany',
			],
			customCondition:
				"Déclenché quand un macro-événement militaire affecte la nation. L'armée de passage n'est pas nécessairement ennemie — les troupes amies pillent aussi.",
		},
		defaultEffects: {
			wealthModifier: -2,
			populationModifier: -0.01,
			stabilityModifier: -2,
			customEffect:
				'Réquisitions forcées. Viols et violences. Les maisons sont occupées. Les champs piétinés. Les puits souillés. La reconstruction prendra des années.',
		},
		playerChoices: [
			{
				id: 'tpl_ap_hide',
				label: 'Cacher les provisions dans la forêt',
				description:
					'Enterrer le grain et cacher le bétail. Si les soldats trouvent le cache...',
				effects: { wealthModifier: -1 },
			},
			{
				id: 'tpl_ap_serve',
				label: "Servir l'armée volontairement",
				description:
					'Se faire recruter comme porteur ou cuisinier. Au moins on mange.',
				effects: { reputationModifier: -1, healthModifier: -1 },
			},
			{
				id: 'tpl_ap_church',
				label: "Se réfugier dans l'église",
				description: "Le droit d'asile protège... en théorie.",
				effects: { stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			"Le sol tremble sous les sabots. La colonne de soldats n'en finit pas. Le sergent pointe notre grange du doigt.",
			'Ils ont pris les deux bœufs, le foin, et le jambon qui séchait. Le dernier soldat a cassé la porte en partant.',
		],
		tags: ['armée', 'pillage', 'guerre', 'réquisition'],
	},

	{
		id: 'tpl_lord_conscription',
		name: 'Conscription seigneuriale',
		description:
			'Le seigneur local lève des hommes pour une campagne militaire. Chaque famille doit fournir un fils ou payer une taxe de remplacement.',
		category: 'military',
		scope: 'local',
		severity: 3,
		targetClasses: ['peasant', 'artisan'],
		recurring: true,
		cooldownYears: 3,
		baseProbability: 0.06,
		triggerConditions: {
			requiredActiveEvents: [
				'evt_hundred_years_war_start',
				'evt_battle_kosovo',
				'evt_ottoman_peak',
			],
			customCondition:
				'Déclenché quand un conflit militaire affecte la nation du joueur. Le seigneur a besoin de fantassins.',
		},
		defaultEffects: {
			populationModifier: -0.01,
			stabilityModifier: -1,
			customEffect:
				'Les bras manquent aux champs. Les familles perdent un fils — beaucoup ne reviendront pas. Les femmes assument le travail agricole.',
		},
		playerChoices: [
			{
				id: 'tpl_lc_go',
				label: 'Partir à la guerre',
				description: 'Honneur et récompenses possibles. Mais la mort aussi.',
				effects: { reputationModifier: 1, healthModifier: -1 },
			},
			{
				id: 'tpl_lc_pay',
				label: 'Payer la taxe de remplacement',
				description: "Garder son fils mais perdre beaucoup d'argent.",
				effects: { wealthModifier: -3 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_lc_desert',
				label: 'Fuir et se cacher',
				description: 'Déserter avant le rassemblement. Devenir hors-la-loi.',
				effects: { reputationModifier: -3, stabilityModifier: -1 },
			},
		],
		flavorTexts: [
			'Le héraut du baron est passé ce matin. Chaque foyer doit envoyer un homme valide sous quinzaine. Les mères pleurent.',
			"Jacques n'avait que seize ans. Il est parti avec la lance de son père et un morceau de pain. On ne l'a plus revu.",
		],
		tags: ['conscription', 'guerre', 'seigneur', 'recrutement'],
	},

	{
		id: 'tpl_feud_between_lords',
		name: 'Querelle entre seigneurs',
		description:
			'Deux seigneurs voisins se disputent un moulin, une forêt ou un droit de péage. Les paysans sont pris entre deux feux.',
		category: 'political',
		scope: 'local',
		severity: 2,
		targetClasses: ['peasant', 'any'],
		recurring: true,
		cooldownYears: 3,
		baseProbability: 0.08,
		triggerConditions: {
			maxStability: 6,
			nearBorder: true,
			customCondition:
				"Plus fréquent dans les régions frontalières ou quand l'autorité royale est faible.",
		},
		defaultEffects: {
			stabilityModifier: -1,
			customEffect:
				'Escarmouches locales, champs brûlés dans la zone contestée. Les paysans servent deux maîtres ou aucun. Le plus faible est ruiné.',
		},
		playerChoices: [
			{
				id: 'tpl_fl_neutral',
				label: 'Rester neutre',
				description: 'Ne prendre parti pour aucun camp. Difficile mais sage.',
				effects: {},
			},
			{
				id: 'tpl_fl_side',
				label: 'Choisir un camp',
				description:
					"Gagner la protection d'un seigneur mais la haine de l'autre.",
				effects: { reputationModifier: 1, stabilityModifier: -1 },
			},
		],
		flavorTexts: [
			"Le baron du nord prétend que la rivière lui appartient. Celui du sud dit que c'est la forêt. Les paysans au milieu ne savent plus à qui payer la dîme.",
			"Les hommes d'armes du seigneur voisin ont brûlé le moulin cette nuit. Représailles pour un porc volé il y a trois mois.",
		],
		tags: ['conflit', 'seigneurs', 'féodalité', 'politique'],
	},

	// ========================================================================
	// 🛐 RELIGION & SUPERSTITION
	// ========================================================================

	{
		id: 'tpl_wandering_preacher',
		name: 'Prédicateur itinérant',
		description:
			"Un moine ou un prédicateur laïc arrive au village. Ses sermons enflammés parlent de la fin du monde, de la corruption du clergé ou d'un christianisme plus pur.",
		category: 'religious',
		scope: 'local',
		severity: 2,
		targetClasses: ['peasant', 'artisan', 'any'],
		recurring: true,
		cooldownYears: 2,
		baseProbability: 0.08,
		triggerConditions: {
			minReligiousTension: 3,
			customCondition:
				'Plus fréquent en période de crise (peste, famine) ou après un macro-événement religieux (Réforme, schisme).',
		},
		defaultEffects: {
			religiousTensionModifier: 1,
			customEffect:
				'Le village est divisé entre ceux qui écoutent et ceux qui le trouvent dangereux. Le curé local est furieux.',
		},
		playerChoices: [
			{
				id: 'tpl_wp_listen',
				label: 'Écouter ses sermons',
				description:
					'Ses paroles touchent le cœur. Peut-être dit-il la vérité.',
				effects: { religiousTensionModifier: 1, reputationModifier: -1 },
			},
			{
				id: 'tpl_wp_report',
				label: "Le dénoncer à l'évêque",
				description:
					"Gagner les faveurs de l'Église. Le prédicateur sera arrêté.",
				effects: { reputationModifier: 2, religiousTensionModifier: -1 },
				requiredSocialClass: 'clergy',
			},
			{
				id: 'tpl_wp_ignore',
				label: "L'ignorer",
				description: "Il repartira. Pas besoin de s'en mêler.",
				effects: {},
			},
		],
		flavorTexts: [
			"Un homme pieds nus, vêtu de haillons, parle sur la place du marché. Ses yeux brûlent d'une foi étrange. La foule grossit.",
			"Le frère Anselme dit que le pape est l'Antéchrist et que la fin des temps est proche. Le curé a barricadé son église.",
		],
		tags: ['prédication', 'hérésie', 'religion', 'réforme'],
	},

	{
		id: 'tpl_miracle_claim',
		name: 'Miracle présumé',
		description:
			"Quelqu'un affirme avoir vu un miracle — une statue qui pleure, une guérison inexpliquée, une apparition de la Vierge. Les pèlerins affluent.",
		category: 'religious',
		scope: 'local',
		severity: 2,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 5,
		baseProbability: 0.05,
		triggerConditions: {
			minReligiousTension: 2,
			customCondition:
				"Plus fréquent en période de crise spirituelle, après une peste ou une famine. L'Église peut confirmer ou démentir.",
		},
		defaultEffects: {
			religiousTensionModifier: 1,
			wealthModifier: 1,
			customEffect:
				"Si l'Église confirme : pèlerinage lucratif, reliques, prestige local. Si l'Église dément : scandale, punition de l'affabulateur.",
		},
		playerChoices: [
			{
				id: 'tpl_mc_believe',
				label: 'Y croire et prier',
				description: 'La foi console. Et les pèlerins dépensent au marché.',
				effects: { reputationModifier: 1, wealthModifier: 1 },
			},
			{
				id: 'tpl_mc_exploit',
				label: 'Profiter du pèlerinage',
				description:
					'Vendre hébergement, nourriture et fausses reliques aux pèlerins.',
				effects: { wealthModifier: 2, reputationModifier: -1 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_mc_doubt',
				label: 'Douter publiquement',
				description: 'Exprimer son scepticisme. Courageux ou imprudent.',
				effects: { reputationModifier: -2, religiousTensionModifier: 1 },
			},
		],
		flavorTexts: [
			'La statue de Notre-Dame dans la chapelle a versé une larme rouge. Trois jours plus tard, la petite Marie a guéri de la fièvre.',
			'Un berger affirme avoir vu un ange dans le champ au lever du soleil. Il montre une brûlure sur sa main comme preuve.',
		],
		tags: ['miracle', 'pèlerinage', 'religion', 'superstition'],
	},

	{
		id: 'tpl_witch_trial',
		name: 'Procès en sorcellerie',
		description:
			'Une personne du village — souvent une femme seule, une veuve, une étrangère — est accusée de sorcellerie. Le procès peut tourner au drame collectif.',
		category: 'religious',
		scope: 'local',
		severity: 3,
		targetClasses: ['peasant', 'any'],
		recurring: true,
		cooldownYears: 4,
		baseProbability: 0.05,
		triggerConditions: {
			minReligiousTension: 4,
			maxStability: 5,
			customCondition:
				"Plus fréquent après une catastrophe inexpliquée (maladie, grêle, mort d'enfant). Les accusations visent souvent les marginaux.",
		},
		defaultEffects: {
			stabilityModifier: -1,
			religiousTensionModifier: 1,
			customEffect:
				'Procès par ordalie ou inquisition locale. Si condamnation : bûcher, noyade ou bannissement. Le village est traumatisé. Les voisins se méfient les uns des autres.',
		},
		playerChoices: [
			{
				id: 'tpl_wt_defend',
				label: "Défendre l'accusé(e)",
				description: "Risquer d'être accusé soi-même. Mais c'est juste.",
				effects: { reputationModifier: -1, religiousTensionModifier: 1 },
			},
			{
				id: 'tpl_wt_accuse',
				label: 'Joindre les accusateurs',
				description: 'Se ranger du côté de la majorité. Plus sûr.',
				effects: { reputationModifier: 1, stabilityModifier: -1 },
			},
			{
				id: 'tpl_wt_stay_silent',
				label: 'Se taire',
				description: "Ne pas s'en mêler. La culpabilité, c'est pour plus tard.",
				effects: {},
			},
		],
		flavorTexts: [
			'La vieille Agnès qui vit seule au bord du bois... Son chat noir, ses herbes, le regard mauvais du curé. Tout le monde le savait.',
			"Le nourrisson de la boulangère est mort sans raison. Le lendemain, on a trouvé des épingles sous le seuil. On sait qui c'est.",
		],
		tags: ['sorcellerie', 'procès', 'religion', 'peur', 'injustice'],
	},

	// ========================================================================
	// 💰 COMMERCE & ÉCONOMIE
	// ========================================================================

	{
		id: 'tpl_market_fair',
		name: 'Foire annuelle',
		description:
			"La grande foire attire marchands, saltimbanques et voleurs de toute la région. C'est l'événement économique de l'année pour le bourg.",
		category: 'economic',
		scope: 'regional',
		severity: 1,
		targetClasses: ['merchant', 'artisan', 'peasant', 'any'],
		recurring: true,
		cooldownYears: 1,
		baseProbability: 0.15,
		triggerConditions: {
			minStability: 3,
			nearTradeRoute: true,
			season: 'summer',
			customCondition:
				"Les foires ont besoin de stabilité minimale et d'une route commerciale accessible. Des lettres de foire garantissent les transactions.",
		},
		defaultEffects: {
			wealthModifier: 1,
			stabilityModifier: 1,
			customEffect:
				'Commerce animé pendant 3-7 jours. Les artisans vendent, les paysans achètent des outils, les marchands négocient. Nouvelles de contrées lointaines. Divertissements.',
		},
		playerChoices: [
			{
				id: 'tpl_mf_sell',
				label: 'Vendre ses produits',
				description:
					'Proposer ses marchandises aux visiteurs. Bon prix si la qualité est là.',
				effects: { wealthModifier: 2, reputationModifier: 1 },
			},
			{
				id: 'tpl_mf_buy',
				label: 'Acheter des outils ou du tissu',
				description: 'Investir dans du matériel de qualité venu de loin.',
				effects: { wealthModifier: -1 },
			},
			{
				id: 'tpl_mf_gamble',
				label: 'Jouer aux dés',
				description: 'La chance sourit aux audacieux... ou pas.',
				effects: { wealthModifier: 1, reputationModifier: -1 },
			},
		],
		flavorTexts: [
			"Les étals colorés s'alignent sur la place. On sent les épices, la laine mouillée, le bois fraîchement coupé. Un jongleur fait rire les enfants.",
			"Le marchand vénitien a des soieries et des miroirs. Le forgeron d'à côté vend des couteaux de Toledo. Le monde entier est venu au village.",
		],
		tags: ['foire', 'commerce', 'marché', 'économie', 'social'],
	},

	{
		id: 'tpl_trade_route_disruption',
		name: "Perturbation d'une route commerciale",
		description:
			"La route commerciale principale est coupée — un pont s'est effondré, des brigands la bloquent, ou une guerre a fermé la frontière. Les prix locaux explosent.",
		category: 'economic',
		scope: 'regional',
		severity: 3,
		targetClasses: ['merchant', 'artisan', 'any'],
		recurring: true,
		cooldownYears: 2,
		baseProbability: 0.06,
		triggerConditions: {
			nearTradeRoute: true,
			maxStability: 5,
			customCondition:
				'Déclenché par un conflit, une catastrophe naturelle ou des brigands. Plus probable en hiver (routes impraticables) ou en temps de guerre.',
		},
		defaultEffects: {
			wealthModifier: -2,
			customEffect:
				"Pénurie de sel, de fer, d'épices. Les prix doublent ou triplent. Les artisans manquent de matière première. Les marchands cherchent des routes alternatives.",
		},
		playerChoices: [
			{
				id: 'tpl_trd_wait',
				label: 'Attendre la réouverture',
				description:
					'Patience. La route finira par rouvrir. En attendant, on serre la ceinture.',
				effects: { wealthModifier: -1 },
			},
			{
				id: 'tpl_trd_smuggle',
				label: 'Passer par les chemins de contrebande',
				description: 'Risqué et illégal, mais lucratif.',
				effects: { wealthModifier: 2, reputationModifier: -2 },
				requiredSocialClass: 'merchant',
			},
		],
		flavorTexts: [
			"Le pont de pierre sur la rivière s'est effondré après les pluies. Les marchands font demi-tour. Le sel va manquer.",
			"Les soldats ont fermé la frontière. Plus de tissu flamand, plus de fer de Styrie. Le forgeron n'a plus rien à forger.",
		],
		tags: ['commerce', 'route', 'pénurie', 'économie'],
	},

	{
		id: 'tpl_new_tax',
		name: 'Nouvelle taxe seigneuriale',
		description:
			'Le seigneur impose une nouvelle taxe — pour financer une guerre, un mariage, une rançon ou simplement par avidité. Les paysans grognent.',
		category: 'political',
		scope: 'local',
		severity: 2,
		targetClasses: ['peasant', 'artisan', 'merchant'],
		recurring: true,
		cooldownYears: 2,
		baseProbability: 0.1,
		triggerConditions: {
			maxWealth: 7,
			customCondition:
				"Plus fréquent en temps de guerre (le seigneur a besoin d'argent), lors d'un mariage noble, ou pour payer une rançon de croisade.",
		},
		defaultEffects: {
			wealthModifier: -1,
			stabilityModifier: -1,
			customEffect:
				'Taxe sur le grain, le sel, le bétail, les charrois ou les mariages. Les plus pauvres sont les plus affectés. Le ressentiment monte.',
		},
		playerChoices: [
			{
				id: 'tpl_nt_pay',
				label: 'Payer sans protester',
				description: "C'est la loi. Ça fait mal mais on évite les ennuis.",
				effects: { wealthModifier: -1 },
			},
			{
				id: 'tpl_nt_petition',
				label: 'Rédiger une pétition collective',
				description:
					"Organiser les villageois pour négocier. S'il sait lire quelqu'un...",
				effects: { reputationModifier: 1, stabilityModifier: -1 },
			},
			{
				id: 'tpl_nt_evade',
				label: 'Dissimuler des revenus',
				description:
					'Cacher une partie de la récolte. Si le prévôt découvre...',
				effects: { wealthModifier: 1, reputationModifier: -2 },
			},
		],
		flavorTexts: [
			"Le prévôt est venu avec ses gardes. Trois deniers par foyer pour la « campagne de Monseigneur ». Le vieux Michel n'a même pas trois deniers.",
			"Taxe sur le sel, taxe sur le grain, taxe pour le pont qu'on n'a jamais vu. Bientôt une taxe pour respirer.",
		],
		tags: ['taxe', 'impôt', 'seigneur', 'politique', 'injustice'],
	},

	// ========================================================================
	// 🏗️ INFRASTRUCTURE & CATASTROPHES
	// ========================================================================

	{
		id: 'tpl_fire',
		name: 'Incendie',
		description:
			'Le feu se déclare — dans une maison, un atelier, une grange. Avec des toits de chaume et des murs de bois, le quartier entier peut brûler en quelques heures.',
		category: 'natural',
		scope: 'local',
		severity: 4,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 3,
		baseProbability: 0.07,
		triggerConditions: {
			season: 'summer',
			customCondition:
				'Plus fréquent en été (sécheresse). Les villes médiévales à maisons de bois sont des pièges à feu. Les incendies accidentels sont courants.',
		},
		defaultEffects: {
			wealthModifier: -3,
			populationModifier: -0.01,
			stabilityModifier: -1,
			customEffect:
				'Destruction de 5-50 maisons. Pertes de stocks, outils, bétail. Sans-abris. La reconstruction est lente et coûteuse.',
		},
		playerChoices: [
			{
				id: 'tpl_fire_fight',
				label: 'Combattre le feu',
				description:
					'Former une chaîne humaine avec des seaux. Risque de brûlures.',
				effects: { reputationModifier: 2, healthModifier: -1 },
			},
			{
				id: 'tpl_fire_save',
				label: 'Sauver ses affaires et fuir',
				description: "Emporter ce qu'on peut et regarder le reste brûler.",
				effects: { wealthModifier: -2 },
			},
		],
		flavorTexts: [
			"La chandelle du forgeron a mis le foin. En un quart d'heure, six maisons brûlent. Les femmes hurlent, les hommes portent de l'eau.",
			"Le vent porte les braises de toit en toit. La moitié du bourg est en flammes avant que quelqu'un n'organise les seaux.",
		],
		tags: ['incendie', 'catastrophe', 'destruction', 'ville'],
	},

	{
		id: 'tpl_flood',
		name: 'Inondation',
		description:
			'La rivière sort de son lit après des pluies diluviennes ou la fonte des neiges. Les champs sont noyés, les ponts emportés, les caves inondées.',
		category: 'natural',
		scope: 'regional',
		severity: 3,
		targetClasses: ['peasant', 'any'],
		recurring: true,
		cooldownYears: 3,
		baseProbability: 0.06,
		triggerConditions: {
			season: 'spring',
			customCondition:
				'Plus fréquent au printemps (fonte des neiges) ou en automne (pluies). Les zones près des rivières sont les plus touchées.',
		},
		defaultEffects: {
			wealthModifier: -2,
			stabilityModifier: -1,
			customEffect:
				"Terres agricoles noyées. Semis détruits. Ponts emportés. L'eau stagnante apporte les moustiques et la dysenterie.",
			triggerTemplateIds: ['tpl_local_epidemic'],
		},
		playerChoices: [
			{
				id: 'tpl_fl_sandbag',
				label: 'Construire des digues de fortune',
				description:
					'Tous au travail, jour et nuit. On peut limiter les dégâts.',
				effects: { reputationModifier: 1, wealthModifier: -1 },
			},
			{
				id: 'tpl_fl_relocate',
				label: 'Se réfugier en hauteur',
				description:
					'Abandonner la maison basse et monter sur la colline. Attendre.',
				effects: { wealthModifier: -1 },
			},
		],
		flavorTexts: [
			"L'eau monte depuis l'aube. À midi, la place est un lac. Les poules se sont noyées dans le poulailler.",
			"Le pont roman, debout depuis 200 ans, s'est effondré en une nuit. La rivière charrie des arbres entiers.",
		],
		tags: ['inondation', 'catastrophe', 'rivière', 'climat'],
	},

	{
		id: 'tpl_comet',
		name: "Apparition d'une comète",
		description:
			'Une comète traverse le ciel nocturne pendant des semaines. Les paysans y voient un présage — de guerre, de peste ou de fin du monde. Les savants sont perplexes.',
		category: 'natural',
		scope: 'regional',
		severity: 1,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.03,
		triggerConditions: {
			customCondition:
				"Événement astronomique réel (comète de Halley : 1066, 1145, 1222, 1301, 1378, 1456, 1531). Peut être généré à n'importe quel moment comme présage narratif.",
		},
		defaultEffects: {
			religiousTensionModifier: 1,
			customEffect:
				"Panique populaire. Sermons apocalyptiques. Certains y voient un signe positif (victoire à venir), d'autres un avertissement divin. Les astronomes prennent note.",
		},
		playerChoices: [
			{
				id: 'tpl_cm_pray',
				label: 'Prier et jeûner',
				description: 'Montrer sa piété face au signe divin.',
				effects: { reputationModifier: 1, healthModifier: -1 },
			},
			{
				id: 'tpl_cm_observe',
				label: 'Observer et noter',
				description:
					'Curiosité scientifique. Rares sont ceux qui pensent ainsi.',
				effects: { reputationModifier: -1 },
			},
		],
		flavorTexts: [
			"L'étoile chevelue brille plus que la lune. Le curé dit que c'est l'annonce du Jugement dernier. Le vieux berger dit que la dernière fois, il y a eu la guerre.",
			'Chaque nuit, la traînée lumineuse grandit dans le ciel. Les enfants la regardent, fascinés. Les adultes murmurent, inquiets.',
		],
		tags: ['comète', 'présage', 'astronomie', 'superstition'],
	},

	{
		id: 'tpl_earthquake',
		name: 'Tremblement de terre',
		description:
			"La terre tremble. Les murs craquent, le clocher vacille, la poussière monte. En quelques secondes, le monde familier s'effondre.",
		category: 'natural',
		scope: 'regional',
		severity: 4,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.02,
		triggerConditions: {
			requiredBiomes: [
				'clim_mediterranean',
				'clim_arid_mideast',
				'clim_tibetan_plateau',
				'clim_hokkaido',
			],
			customCondition:
				'Zones sismiques uniquement. Méditerranée, Moyen-Orient, Himalaya, Japon.',
		},
		defaultEffects: {
			populationModifier: -0.02,
			wealthModifier: -3,
			stabilityModifier: -2,
			religiousTensionModifier: 1,
			customEffect:
				'Bâtiments effondrés. Morts et blessés sous les décombres. Répliques pendant des jours. Interprété comme la colère de Dieu.',
		},
		playerChoices: [],
		flavorTexts: [
			"Le sol a tremblé pendant ce qui a semblé une éternité. L'église s'est fendue en deux. On entend les cris sous les gravats.",
			"Tout s'est mis à vibrer. Les tuiles pleuvaient, les murs se fissuraient. Puis le silence — terrible.",
		],
		tags: ['séisme', 'catastrophe', 'destruction', 'tremblement'],
	},

	{
		id: 'tpl_river_alluvium',
		name: 'Crue fertile',
		description:
			"La rivière a débordé juste assez — elle se retire en laissant une couche de limon riche sur les berges. Les champs proches de l'eau porteront double cette année.",
		category: 'natural',
		scope: 'local',
		severity: 2,
		targetClasses: ['peasant'],
		recurring: true,
		cooldownYears: 3,
		baseProbability: 0.07,
		triggerConditions: {
			season: 'spring',
			customCondition:
				"Crue modérée et contrôlée d'une rivière. Le limon déposé enrichit les sols. Historiquement fondamental pour les civilisations du Nil, du Tigre, de l'Euphrate et de l'Indus.",
		},
		defaultEffects: {
			wealthModifier: 2,
			stabilityModifier: 1,
			customEffect:
				"Sols enrichis par les alluvions. Les parcelles riveraines deviennent les plus convoitées. Rendements supérieurs de 50 %. L'eau retreint en laissant les champs naturellement irrigués.",
		},
		playerChoices: [
			{
				id: 'tpl_ra_cultivate',
				label: 'Semer immédiatement sur le limon frais',
				description:
					'Profiter de la fertilité maximale. Récolte précoce possible.',
				effects: { wealthModifier: 2 },
			},
			{
				id: 'tpl_ra_expand',
				label: "Étendre les canaux d'irrigation",
				description:
					"Investir pour capter l'eau de la crue les prochaines années.",
				effects: { wealthModifier: 1, stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			"L'eau brune s'est retirée en trois jours. Dessous, une boue noire et grasse que les anciens appellent l'or de la rivière. Tout ce qu'on y plante pousse deux fois plus vite.",
			"Les berges sont couvertes de limon frais. Les grenouilles chantent, les hérons pêchent — la rivière a fait son travail. Cette année, personne n'aura faim.",
		],
		tags: ['crue', 'limon', 'fertilité', 'rivière'],
	},

	{
		id: 'tpl_fair_winds',
		name: 'Vents favorables',
		description:
			'Les vents soufflent dans la bonne direction, avec constance et douceur. Les navires arrivent plus vite, les moulins tournent sans relâche, les nuages de pluie viennent au bon moment.',
		category: 'natural',
		scope: 'regional',
		severity: 1,
		targetClasses: ['merchant', 'peasant'],
		recurring: true,
		cooldownYears: 2,
		baseProbability: 0.08,
		triggerConditions: {
			nearCoast: true,
			customCondition:
				"Régime de vents saisonniers particulièrement favorable. Les moussons arrivent à temps en Asie. Les alizés sont réguliers pour les traversées atlantiques. Les mistrals s'apaisent en Méditerranée.",
		},
		defaultEffects: {
			wealthModifier: 1,
			customEffect:
				'Navigation facilitée, commerce accéléré. Les moulins à vent produisent davantage. Les traversées sont plus rapides et plus sûres. Moins de naufrages.',
		},
		playerChoices: [],
		flavorTexts: [
			"Le capitaine sourit : vent portant depuis trois jours. On arrivera au port avec une semaine d'avance. La cargaison sera la première sur le marché.",
			"Les voiles du moulin n'ont pas cessé de tourner depuis un mois. Le meunier a de la farine pour tout le canton.",
		],
		tags: ['vent', 'navigation', 'commerce', 'climat'],
	},

	// ========================================================================
	// 🎭 CULTURE & VIE QUOTIDIENNE
	// ========================================================================

	{
		id: 'tpl_peasant_flight',
		name: 'Fuite de paysans',
		description:
			'Des familles entières quittent le village en catimini pour échapper aux taxes, au servage ou à la famine. Elles espèrent trouver mieux ailleurs — ou se cacher en ville.',
		category: 'political',
		scope: 'local',
		severity: 2,
		targetClasses: ['peasant'],
		recurring: true,
		cooldownYears: 2,
		baseProbability: 0.06,
		triggerConditions: {
			maxStability: 4,
			maxWealth: 3,
			customCondition:
				'Déclenché quand les conditions locales sont très mauvaises (famine + taxe + instabilité). Le servage empêche légalement le départ mais pas en pratique.',
		},
		defaultEffects: {
			populationModifier: -0.02,
			stabilityModifier: -1,
			customEffect:
				'Le village se vide. Moins de bras = moins de récolte. Le seigneur envoie des hommes les ramener. En ville, les fugitifs deviennent mendiants ou ouvriers.',
		},
		playerChoices: [
			{
				id: 'tpl_pf_stay',
				label: 'Rester et endurer',
				description:
					"C'est dur mais c'est chez soi. Peut-être que ça ira mieux.",
				effects: { stabilityModifier: 1 },
			},
			{
				id: 'tpl_pf_flee',
				label: 'Partir avec les autres',
				description:
					'La ville rend libre après un an et un jour. Si on survit jusque-là.',
				effects: { wealthModifier: -2 },
			},
		],
		flavorTexts: [
			"Les Martin sont partis dans la nuit. Leur maison est vide, le feu éteint. Le prévôt jure qu'il les retrouvera.",
			"Encore trois familles ce mois-ci. Le village se vide. Bientôt il n'y aura plus personne pour labourer les champs du baron.",
		],
		tags: ['exode', 'servage', 'fuite', 'ville', 'liberté'],
	},

	{
		id: 'tpl_new_church_bell',
		name: "Nouvelle cloche d'église",
		description:
			"La paroisse inaugure une nouvelle cloche. C'est un événement majeur pour le village — la cloche rythme toute la vie : heures de prière, alarmes, mariages, enterrements.",
		category: 'cultural',
		scope: 'local',
		severity: 1,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.03,
		triggerConditions: {
			minStability: 4,
			minWealth: 4,
			customCondition:
				'Le village doit avoir assez de ressources pour financer la cloche (collecte communautaire ou don du seigneur).',
		},
		defaultEffects: {
			stabilityModifier: 1,
			reputationModifier: 1,
			customEffect:
				'Fierté communautaire. La cloche est baptisée avec un nom propre. Le fondeur de cloches est un artisan itinérant respecté.',
		},
		playerChoices: [
			{
				id: 'tpl_ncb_donate',
				label: 'Contribuer à la collecte',
				description:
					'Gagner le respect de la communauté. La cloche portera votre nom ?',
				effects: { wealthModifier: -1, reputationModifier: 2 },
			},
			{
				id: 'tpl_ncb_attend',
				label: "Assister à l'inauguration",
				description: 'Fête du village. Musique, vin et danses.',
				effects: { stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			'Le fondeur a travaillé trois jours et trois nuits. Quand la cloche a sonné pour la première fois, les larmes coulaient sur les visages.',
			"Elle s'appelle Marie-Jeanne. Son son porte jusqu'à la colline de l'autre côté de la vallée. On la sonne le dimanche avec fierté.",
		],
		tags: ['cloche', 'église', 'communauté', 'culture', 'fête'],
	},

	{
		id: 'tpl_travelling_merchant',
		name: 'Marchand itinérant',
		description:
			"Un colporteur arrive avec sa mule chargée de merveilles : sel, épices, tissu, nouvelles du monde. Pour le village, c'est une fenêtre sur l'extérieur.",
		category: 'economic',
		scope: 'local',
		severity: 1,
		targetClasses: ['peasant', 'artisan', 'any'],
		recurring: true,
		cooldownYears: 1,
		baseProbability: 0.12,
		triggerConditions: {
			minStability: 3,
			nearTradeRoute: true,
			customCondition:
				'Les colporteurs suivent les routes commerciales. Moins fréquent en hiver ou en zone de guerre.',
		},
		defaultEffects: {
			wealthModifier: 1,
			customEffect:
				"Accès à des biens rares : sel, aiguilles, nouvelles. Le marchand raconte des histoires de contrées lointaines. Source d'information précieuse.",
		},
		playerChoices: [
			{
				id: 'tpl_tm_buy',
				label: 'Acheter quelque chose',
				description: 'Du sel, du tissu, une lame... le choix est tentant.',
				effects: { wealthModifier: -1 },
			},
			{
				id: 'tpl_tm_news',
				label: "L'interroger sur l'actualité",
				description: 'Que se passe-t-il dans le monde ? Le marchand sait tout.',
				effects: {},
			},
			{
				id: 'tpl_tm_trade',
				label: 'Troquer des produits locaux',
				description: "Échanger du miel ou des peaux contre ce qu'il apporte.",
				effects: { wealthModifier: 1 },
			},
		],
		flavorTexts: [
			'Le colporteur a un accent du sud et des histoires incroyables. Il vend du sel de Guérande et des aiguilles de Nuremberg.',
			"Sa mule porte assez de merveilles pour faire rêver tout le village. Du poivre ! Il a du poivre ! Personne ici n'en a jamais goûté.",
		],
		tags: ['colporteur', 'commerce', 'nouvelles', 'quotidien'],
	},

	{
		id: 'tpl_child_apprenticeship',
		name: "Mise en apprentissage d'un enfant",
		description:
			'Le moment est venu de placer un enfant en apprentissage chez un artisan, un marchand ou un moine. Décision cruciale qui déterminera sa vie entière.',
		category: 'cultural',
		scope: 'personal',
		severity: 1,
		targetClasses: ['peasant', 'artisan', 'merchant'],
		recurring: true,
		cooldownYears: 5,
		baseProbability: 0.08,
		triggerConditions: {
			customCondition:
				"L'enfant doit avoir 7-12 ans. La famille doit pouvoir payer ou faire un accord avec un maître artisan.",
		},
		defaultEffects: {
			customEffect:
				"L'enfant quitte la maison familiale. Il dormira chez le maître, apprendra le métier pendant 5-7 ans. Conditions souvent dures mais perspective de promotion sociale.",
		},
		playerChoices: [
			{
				id: 'tpl_ca_blacksmith',
				label: 'Chez le forgeron',
				description:
					'Métier respecté et demandé. Travail pénible mais revenu assuré.',
				effects: { reputationModifier: 1 },
			},
			{
				id: 'tpl_ca_merchant',
				label: 'Chez un marchand',
				description:
					'Apprendre le commerce, les chiffres et les langues. Aventure possible.',
				effects: { wealthModifier: -1, reputationModifier: 1 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_ca_monastery',
				label: 'Au monastère (oblat)',
				description: 'Lire, écrire, prier. La meilleure éducation disponible.',
				effects: { reputationModifier: 2, religiousTensionModifier: -1 },
			},
			{
				id: 'tpl_ca_keep',
				label: "Garder l'enfant aux champs",
				description: 'On a besoin de bras. Il labourera comme son père.',
				effects: {},
			},
		],
		flavorTexts: [
			"Le petit Guillaume serre la main de sa mère une dernière fois. Le maître tanneur l'emmène. On ne le reverra pas avant cinq ans.",
			"Maître Jean accepte le garçon comme apprenti. La famille doit fournir un manteau neuf et deux poulets. C'est cher, mais c'est l'avenir.",
		],
		tags: ['apprentissage', 'enfant', 'métier', 'éducation', 'social'],
	},

	// ========================================================================
	// 🧭 EXPLORATION & DÉCOUVERTE (pour joueurs avancés)
	// ========================================================================

	{
		id: 'tpl_shipwreck',
		name: 'Naufrage sur la côte',
		description:
			"Un navire s'est brisé sur les rochers. Le rivage est jonché de débris, de cargaison et parfois de survivants. Le droit de bris est contesté entre le seigneur et les villageois.",
		category: 'economic',
		scope: 'local',
		severity: 2,
		targetClasses: ['peasant', 'merchant', 'any'],
		recurring: true,
		cooldownYears: 3,
		baseProbability: 0.05,
		triggerConditions: {
			nearCoast: true,
			season: 'winter',
			customCondition:
				'Côtes uniquement. Plus fréquent en hiver (tempêtes). Les côtes bretonnes, scandinaves et méditerranéennes sont les plus touchées.',
		},
		defaultEffects: {
			wealthModifier: 1,
			customEffect:
				'Débris récupérables : bois, corde, parfois de la cargaison précieuse. Le seigneur revendique le droit de bris. Les villageois pillent discrètement.',
		},
		playerChoices: [
			{
				id: 'tpl_sw_salvage',
				label: 'Récupérer la cargaison',
				description: 'Profiter de la nuit pour prendre ce que la mer offre.',
				effects: { wealthModifier: 2, reputationModifier: -1 },
			},
			{
				id: 'tpl_sw_rescue',
				label: 'Secourir les survivants',
				description:
					"Des hommes luttent dans l'eau. Aller les chercher, c'est risquer sa vie.",
				effects: { reputationModifier: 3, healthModifier: -1 },
			},
			{
				id: 'tpl_sw_report',
				label: 'Prévenir le seigneur',
				description:
					'Respecter la loi. Le seigneur prend tout mais vous récompense peut-être.',
				effects: { reputationModifier: 1 },
			},
		],
		flavorTexts: [
			'La tempête a jeté un cogue sur les brisants. Le pont est fendu en deux. Des ballots de laine flottent vers le rivage.',
			"On a trouvé trois marins vivants parmi les débris. Ils parlent une langue qu'on ne comprend pas. L'un d'eux serre un coffret contre lui.",
		],
		tags: ['naufrage', 'côte', 'récupération', 'tempête'],
	},

	{
		id: 'tpl_pilgrim_passage',
		name: 'Passage de pèlerins',
		description:
			'Un groupe de pèlerins traverse le village en route vers un sanctuaire (Compostelle, Rome, Jérusalem). Ils apportent nouvelles, maladies et piété.',
		category: 'religious',
		scope: 'local',
		severity: 1,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 1,
		baseProbability: 0.1,
		triggerConditions: {
			nearTradeRoute: true,
			customCondition:
				"Le village doit être sur un chemin de pèlerinage ou près d'une route majeure. Plus fréquent au printemps et en été.",
		},
		defaultEffects: {
			wealthModifier: 1,
			religiousTensionModifier: -1,
			customEffect:
				"Les pèlerins achètent nourriture et hébergement. Ils racontent ce qu'ils ont vu. Parfois ils apportent des maladies. L'hospitalité est un devoir chrétien.",
		},
		playerChoices: [
			{
				id: 'tpl_pp_host',
				label: 'Héberger des pèlerins',
				description:
					'Acte de charité. Ils paieront en bénédictions et en histoires.',
				effects: { reputationModifier: 1, wealthModifier: -1 },
			},
			{
				id: 'tpl_pp_join',
				label: 'Rejoindre le pèlerinage',
				description:
					'Tout quitter pour marcher vers Compostelle. Aventure spirituelle.',
				effects: { reputationModifier: 2, wealthModifier: -2 },
			},
		],
		flavorTexts: [
			'Ils sont une trentaine, la coquille au chapeau, le bâton à la main. Ils vont à Saint-Jacques — deux mois de marche encore.',
			'Le plus vieux pèlerin a vu Rome, Jérusalem et Compostelle. Ses pieds sont en sang mais ses yeux brillent. Il raconte des merveilles.',
		],
		tags: ['pèlerinage', 'religion', 'voyage', 'Compostelle'],
	},

	{
		id: 'tpl_wolf_attack',
		name: 'Attaque de loups',
		description:
			"En hiver, quand la faim les pousse, les loups s'approchent du village. Ils attaquent le bétail dans les enclos et, parfois, les voyageurs isolés.",
		category: 'natural',
		scope: 'local',
		severity: 2,
		targetClasses: ['peasant', 'any'],
		recurring: true,
		cooldownYears: 2,
		baseProbability: 0.07,
		triggerConditions: {
			season: 'winter',
			excludedBiomes: ['clim_saharan', 'clim_sahel', 'clim_tropical_africa'],
			customCondition:
				'Plus fréquent en hiver rude, dans les zones boisées. Rare dans les régions densément peuplées.',
		},
		defaultEffects: {
			wealthModifier: -1,
			customEffect:
				'Perte de bétail. Peur collective. Les enfants ne vont plus seuls au bois. Le seigneur organise parfois une grande battue.',
		},
		playerChoices: [
			{
				id: 'tpl_wa_hunt',
				label: 'Participer à la battue',
				description:
					'Traquer les loups avec les villageois. Dangereux mais nécessaire.',
				effects: { reputationModifier: 2, healthModifier: -1 },
			},
			{
				id: 'tpl_wa_protect',
				label: 'Renforcer les enclos',
				description: 'Protéger le bétail en fortifiant les clôtures.',
				effects: { wealthModifier: -1 },
			},
		],
		flavorTexts: [
			'La vieille louve grise a pris deux moutons cette nuit. On voit ses traces dans la neige, droit vers la forêt noire.',
			"Le bûcheron dit qu'il a vu six loups à la lisière. Les yeux jaunes dans l'obscurité. On ne sort plus après les vêpres.",
		],
		tags: ['loups', 'hiver', 'bétail', 'danger', 'forêt'],
	},

	{
		id: 'tpl_wedding_celebration',
		name: 'Mariage au village',
		description:
			"Un mariage est célébré. C'est l'occasion de fêter — musique, banquet, danses. Mais aussi de négocier dots, alliances familiales et héritages.",
		category: 'cultural',
		scope: 'personal',
		severity: 1,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 1,
		baseProbability: 0.15,
		triggerConditions: {
			minStability: 3,
			customCondition:
				'Les mariages sont arrangés par les familles. Ils scellent aussi des alliances commerciales ou territoriales entre petits propriétaires.',
		},
		defaultEffects: {
			stabilityModifier: 1,
			customEffect:
				"Alliance entre deux familles. Dot échangée (terres, bétail ou argent). Fête de 1-3 jours. Le curé bénit l'union. Les enfants dansent.",
		},
		playerChoices: [
			{
				id: 'tpl_wc_feast',
				label: 'Contribuer au banquet',
				description:
					'Offrir un tonneau de vin ou un porc. Générosité remarquée.',
				effects: { wealthModifier: -1, reputationModifier: 2 },
			},
			{
				id: 'tpl_wc_arrange',
				label: 'Négocier un mariage pour son enfant',
				description: 'Le moment est bon pour discuter alliances familiales.',
				effects: { reputationModifier: 1 },
			},
		],
		flavorTexts: [
			"La mariée porte une couronne de fleurs. Le joueur de vielle fait danser tout le village. La bière coule jusqu'à l'aube.",
			"Le père de la mariée offre trois arpents de terre. Le père du marié donne deux vaches. Le curé bénit. L'affaire est conclue.",
		],
		tags: ['mariage', 'fête', 'famille', 'social', 'alliance'],
	},

	{
		id: 'tpl_harsh_winter',
		name: 'Hiver rigoureux',
		description:
			"Un hiver exceptionnellement froid s'abat sur la région. Les rivières gèlent, le bois manque, le bétail meurt dans les étables non chauffées.",
		category: 'natural',
		scope: 'regional',
		severity: 3,
		targetClasses: ['peasant', 'artisan', 'any'],
		recurring: true,
		cooldownYears: 5,
		baseProbability: 0.06,
		triggerConditions: {
			season: 'winter',
			excludedBiomes: [
				'clim_saharan',
				'clim_tropical_africa',
				'clim_southeast_asia',
			],
			customCondition:
				'Plus fréquent dans les régions continentales et scandinaves. Aggravé si les stocks de bois et de grain sont faibles.',
		},
		defaultEffects: {
			populationModifier: -0.01,
			wealthModifier: -1,
			healthModifier: -1,
			triggerTemplateIds: ['tpl_wolf_attack'],
			customEffect:
				'Mortalité des vieillards et des enfants en hausse. Bétail affamé. Routes impraticables. Isolement total des villages pendant des semaines.',
		},
		playerChoices: [
			{
				id: 'tpl_hw_share',
				label: 'Partager le bois avec les voisins',
				description:
					'Solidarité communautaire. Tout le monde survit, mais de justesse.',
				effects: {
					reputationModifier: 2,
					wealthModifier: -1,
					healthModifier: -1,
				},
			},
			{
				id: 'tpl_hw_hoard',
				label: 'Garder ses réserves pour soi',
				description: "Sa famille d'abord. Les voisins se débrouilleront.",
				effects: { healthModifier: 1, reputationModifier: -2 },
			},
		],
		flavorTexts: [
			"Le gel a pris en novembre et n'a pas lâché. En février, il faut briser la glace du puits à coups de hache. Le vieux Thomas n'a pas survécu.",
			"Le loup hurle derrière la porte. Le feu baisse. Il reste deux bûches et une semaine d'hiver.",
		],
		tags: ['hiver', 'froid', 'gel', 'survie', 'climat'],
	},

	// ========================================================================
	// XIIe SIÈCLE — CROISADES, FÉODALITÉ MÛRE, ORDRES RELIGIEUX
	// ========================================================================

	{
		id: 'tpl_crusader_recruitment',
		name: 'Recrutement pour la croisade',
		description:
			'Un prédicateur itinérant prêche la guerre sainte. Des hommes du village partent se croiser, laissant femmes et enfants. Les terres manquent de bras.',
		category: 'military',
		scope: 'local',
		severity: 4,
		targetClasses: ['peasant', 'minor_noble', 'noble'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.06,
		triggerConditions: {
			minYear: 1095,
			maxYear: 1291,
			requiredActiveEvents: ['evt_first_crusade'],
			customCondition:
				'Actif tant que les croisades sont en cours. La ferveur religieuse locale doit être élevée.',
		},
		defaultEffects: {
			populationModifier: -0.02,
			stabilityModifier: -1,
			customEffect:
				"Perte de main-d'oeuvre agricole. Les familles des partants s'appauvrissent. Certains reviennent enrichis, la plupart jamais.",
		},
		playerChoices: [
			{
				id: 'tpl_cr_join',
				label: 'Prendre la croix',
				description:
					"Partir en Terre sainte. Gloire et péril. Les dettes sont suspendues pendant l'absence.",
				effects: {
					reputationModifier: 2,
					wealthModifier: -2,
					healthModifier: -2,
				},
			},
			{
				id: 'tpl_cr_stay',
				label: 'Rester et profiter des terres vacantes',
				description:
					'Racheter les terres des partants à bas prix. Mal vu par le clergé.',
				effects: { wealthModifier: 2, reputationModifier: -1 },
			},
			{
				id: 'tpl_cr_fund',
				label: 'Financer un croisé',
				description:
					"Payer l'équipement d'un chevalier en échange d'une part du butin.",
				effects: { wealthModifier: -1, reputationModifier: 1 },
			},
		],
		flavorTexts: [
			'"Dieu le veut !" Le cri résonne sur la place. Trois fils du forgeron partent dès l\'aube.',
			'Le curé promet le pardon de tous les péchés à ceux qui prendront la croix. Les yeux brillent.',
			"On dit que les rues de Jérusalem sont pavées d'or. Le jeune Pierre y croit dur comme fer.",
		],
		tags: ['croisade', 'recrutement', 'guerre_sainte', 'terre_sainte'],
	},

	{
		id: 'tpl_castle_construction',
		name: "Construction d'un château",
		description:
			"Le seigneur local entreprend la construction d'une forteresse en pierre. La corvée mobilise des centaines de paysans pendant des mois.",
		category: 'political',
		scope: 'local',
		severity: 3,
		targetClasses: ['peasant', 'artisan'],
		recurring: true,
		cooldownYears: 25,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1050,
			maxYear: 1350,
			minWealth: 4,
			requiredTechs: ['tech_fortification'],
			customCondition:
				'Le seigneur doit avoir les moyens. Plus fréquent en zone frontalière ou après une menace.',
		},
		defaultEffects: {
			wealthModifier: -1,
			stabilityModifier: 1,
			customEffect:
				'Les paysans corvéables perdent du temps de travail agricole. Le château renforce la défense locale et le prestige seigneurial.',
		},
		playerChoices: [
			{
				id: 'tpl_cc_work',
				label: 'Accomplir la corvée',
				description:
					'Travailler dur au chantier. Épuisant mais on évite les ennuis.',
				effects: { healthModifier: -1 },
			},
			{
				id: 'tpl_cc_specialize',
				label: 'Proposer ses services de tailleur de pierre',
				description:
					'Les artisans qualifiés sont recherchés et bien payés sur le chantier.',
				effects: { wealthModifier: 1, reputationModifier: 1 },
				requiredSocialClass: 'artisan',
			},
			{
				id: 'tpl_cc_dodge',
				label: 'Esquiver la corvée',
				description:
					'Se cacher ou payer un remplaçant. Risqué si on est découvert.',
				effects: { reputationModifier: -1 },
			},
		],
		flavorTexts: [
			'Les charrettes de pierre passent jour et nuit sur le chemin du village. La poussière couvre tout.',
			'Le maître maçon est venu de loin. Il trace des plans que personne ne comprend, mais les murs montent.',
			'Trois mois de corvée au château. Les champs en souffriront, mais le seigneur ne négocie pas.',
		],
		tags: ['château', 'construction', 'corvée', 'féodalité', 'fortification'],
	},

	{
		id: 'tpl_monastic_foundation',
		name: "Fondation d'un monastère",
		description:
			'Des moines cisterciens ou clunisiens fondent un monastère dans la région. Ils défrichent, drainent et cultivent des terres incultes.',
		category: 'religious',
		scope: 'regional',
		severity: 2,
		targetClasses: ['peasant', 'clergy', 'any'],
		recurring: true,
		cooldownYears: 30,
		baseProbability: 0.03,
		triggerConditions: {
			minYear: 1050,
			maxYear: 1300,
			customCondition:
				'Plus fréquent dans les zones de faible densité avec des terres à défricher. Les ordres monastiques sont en pleine expansion.',
		},
		defaultEffects: {
			stabilityModifier: 1,
			wealthModifier: 1,
			customEffect:
				'Le monastère devient un centre économique et culturel local. Copie de manuscrits, soins aux malades, éducation.',
		},
		playerChoices: [
			{
				id: 'tpl_mf_donate',
				label: 'Faire un don de terres',
				description:
					'Céder une parcelle aux moines contre des prières pour le salut de sa famille.',
				effects: { wealthModifier: -1, reputationModifier: 2 },
			},
			{
				id: 'tpl_mf_trade',
				label: 'Commercer avec le monastère',
				description:
					'Les moines ont besoin de fournitures et produisent du vin, du fromage, des manuscrits.',
				effects: { wealthModifier: 1 },
			},
			{
				id: 'tpl_mf_oblate',
				label: 'Offrir un enfant comme oblat',
				description:
					'Placer un enfant au monastère. Il sera éduqué mais perdu pour la famille.',
				effects: { reputationModifier: 1 },
			},
		],
		flavorTexts: [
			'Douze moines en robe blanche sont arrivés avec des houes et des bibles. En un an, le marais est devenu un jardin.',
			'Le prieur dit que le travail est prière. Ses moines labourent du lever au coucher du soleil.',
			"Le nouveau monastère distribue du pain aux pauvres le vendredi. La file s'allonge chaque semaine.",
		],
		tags: ['monastère', 'cisterciens', 'clergé', 'défrichement', 'éducation'],
	},

	{
		id: 'tpl_tournament',
		name: 'Tournoi chevaleresque',
		description:
			"Le seigneur organise un tournoi. Les chevaliers de la région s'affrontent à la lance et à l'épée. La fête attire marchands, jongleurs et pickpockets.",
		category: 'cultural',
		scope: 'regional',
		severity: 2,
		targetClasses: ['noble', 'minor_noble', 'merchant', 'peasant'],
		recurring: true,
		cooldownYears: 3,
		baseProbability: 0.08,
		triggerConditions: {
			minYear: 1100,
			maxYear: 1400,
			minWealth: 3,
			minStability: 4,
			customCondition:
				'Organisé en temps de paix relative. Nécessite un seigneur assez riche.',
		},
		defaultEffects: {
			stabilityModifier: 1,
			wealthModifier: 1,
			customEffect:
				'Stimule le commerce local. Renforce les liens féodaux. Quelques blessés voire des morts parmi les combattants.',
		},
		playerChoices: [
			{
				id: 'tpl_tour_fight',
				label: 'Participer au tournoi',
				description:
					'Combattre pour la gloire. Victoire = renom et rançon du vaincu.',
				effects: { reputationModifier: 2, healthModifier: -1 },
				requiredSocialClass: 'minor_noble',
			},
			{
				id: 'tpl_tour_trade',
				label: 'Tenir un étal au marché du tournoi',
				description: 'Profiter de la foule pour vendre ses marchandises.',
				effects: { wealthModifier: 1 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_tour_watch',
				label: 'Assister aux joutes',
				description:
					'Un jour de fête rare. On oublie la corvée et on admire les chevaliers.',
				effects: { stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			'Les bannières claquent au vent. Le fracas des lances résonne jusque dans les collines.',
			'Le chevalier de Montfort a mis trois adversaires à terre avant midi. La foule est en délire.',
			"Les marchands ont triplé leurs prix, mais personne ne se plaint — c'est jour de fête.",
		],
		tags: ['tournoi', 'chevalerie', 'joute', 'fête', 'noblesse'],
	},

	{
		id: 'tpl_heresy_spread',
		name: "Propagation d'une hérésie",
		description:
			'Des prêcheurs dissidents répandent des doctrines hétérodoxes. Les fidèles se divisent. Le clergé est inquiet.',
		category: 'religious',
		scope: 'regional',
		severity: 3,
		targetClasses: ['peasant', 'artisan', 'clergy'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1100,
			maxYear: 1350,
			minReligiousTension: 4,
			customCondition:
				'Plus probable dans les régions où le clergé est corrompu ou absent. Cathares, Vaudois, Bogomiles...',
		},
		defaultEffects: {
			religiousTensionModifier: 2,
			stabilityModifier: -1,
			customEffect:
				"Division communautaire. Le seigneur ou l'évêque peut réagir par la force.",
		},
		playerChoices: [
			{
				id: 'tpl_hs_follow',
				label: 'Écouter les prêcheurs',
				description:
					'Leurs paroles sur la pauvreté du Christ parlent aux humbles.',
				effects: { religiousTensionModifier: 1, reputationModifier: -1 },
			},
			{
				id: 'tpl_hs_denounce',
				label: "Dénoncer les hérétiques à l'évêque",
				description:
					'Rester dans le droit chemin et prouver sa fidélité à Rome.',
				effects: { reputationModifier: 1, religiousTensionModifier: -1 },
			},
			{
				id: 'tpl_hs_ignore',
				label: 'Ne pas se mêler de théologie',
				description: 'Ce sont des querelles de clercs. Mieux vaut labourer.',
				effects: {},
			},
		],
		flavorTexts: [
			"L'homme en haillons prêche que l'Église est corrompue. Certains hochent la tête, d'autres reculent.",
			'On murmure que le tisserand du quartier bas est un parfait. Sa femme ne mange plus de viande.',
			"L'évêque a envoyé des inquisiteurs. On brûle des livres sur la place du marché.",
		],
		tags: ['hérésie', 'cathares', 'vaudois', 'inquisition', 'religion'],
	},

	{
		id: 'tpl_crusader_return',
		name: "Retour d'un croisé",
		description:
			'Un homme revient de Terre sainte après des années. Il rapporte des reliques, des histoires fabuleuses, et peut-être des maladies.',
		category: 'cultural',
		scope: 'local',
		severity: 2,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1100,
			maxYear: 1300,
			requiredActiveEvents: ['evt_first_crusade'],
			requiredTemplateIds: ['tpl_crusader_recruitment'],
			customCondition:
				"Nécessite qu'un recrutement croisé ait eu lieu localement.",
		},
		defaultEffects: {
			wealthModifier: 1,
			customEffect:
				'Le croisé rapporte des connaissances (médecine arabe, épices, soie). Possible introduction de nouvelles maladies.',
		},
		playerChoices: [
			{
				id: 'tpl_cret_welcome',
				label: 'Accueillir le héros',
				description: 'Écouter ses récits. Il connaît des remèdes inconnus ici.',
				effects: { healthModifier: 1, reputationModifier: 1 },
			},
			{
				id: 'tpl_cret_trade',
				label: 'Acheter ses reliques et épices',
				description: 'Des objets de Terre sainte se vendent cher aux pèlerins.',
				effects: { wealthModifier: 1 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_cret_shun',
				label: 'Se méfier de cet étranger',
				description:
					'Il a changé. Il parle de choses étranges. Mieux vaut garder ses distances.',
				effects: { healthModifier: 1 },
			},
		],
		flavorTexts: [
			'Il est revenu avec un bras en moins et un coffret de myrrhe. Les enfants le suivent comme un héros.',
			"Le croisé parle d'une médecine arabe qui guérit les fièvres. Le barbier est sceptique.",
			"Il dit avoir vu Jérusalem. Ses yeux disent qu'il a vu des choses bien pires.",
		],
		tags: ['croisade', 'retour', 'reliques', 'orient', 'épices'],
	},

	{
		id: 'tpl_forest_clearing',
		name: 'Défrichement de forêt',
		description:
			'De nouvelles terres sont ouvertes à la culture par le défrichement. Les paysans y gagnent des parcelles, mais la forêt recule.',
		category: 'economic',
		scope: 'local',
		severity: 2,
		targetClasses: ['peasant'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.06,
		triggerConditions: {
			minYear: 1050,
			maxYear: 1300,
			customCondition:
				'Période de croissance démographique. Plus fréquent en Europe occidentale et centrale.',
		},
		defaultEffects: {
			populationModifier: 0.01,
			wealthModifier: 1,
			customEffect:
				'Nouvelles terres arables. La population locale augmente. Perte de bois et de gibier.',
		},
		playerChoices: [
			{
				id: 'tpl_fc_claim',
				label: 'Réclamer une nouvelle parcelle',
				description:
					'Défricher soi-même et gagner une terre libre de corvée pendant quelques années.',
				effects: { wealthModifier: 2, healthModifier: -1 },
			},
			{
				id: 'tpl_fc_wood',
				label: 'Récupérer le bois coupé',
				description:
					"Vendre le bois ou le garder pour l'hiver. Un butin éphémère.",
				effects: { wealthModifier: 1 },
			},
			{
				id: 'tpl_fc_oppose',
				label: "S'opposer au défrichement",
				description:
					'La forêt nourrit le village : gibier, champignons, bois de chauffe. Sans elle, les hivers seront durs.',
				effects: { reputationModifier: -1 },
			},
		],
		flavorTexts: [
			"Les cognées résonnent du matin au soir. Chaque arbre qui tombe, c'est un arpent de blé futur.",
			'Le vieux chêne centenaire est tombé. Les anciens disent que la forêt se vengera.',
			"Les nouveaux colons arrivent avec leurs familles. En un an, un hameau pousse là où il n'y avait que des ronces.",
		],
		tags: [
			'défrichement',
			'agriculture',
			'colonisation',
			'forêt',
			'croissance',
		],
	},

	{
		id: 'tpl_tithe_dispute',
		name: 'Conflit sur la dîme',
		description:
			'Le curé exige le paiement intégral de la dîme. Les paysans estiment avoir déjà trop donné cette année.',
		category: 'religious',
		scope: 'local',
		severity: 2,
		targetClasses: ['peasant', 'artisan'],
		recurring: true,
		cooldownYears: 5,
		baseProbability: 0.07,
		triggerConditions: {
			minYear: 1000,
			maxYear: 1500,
			maxWealth: 4,
			customCondition:
				'Plus fréquent après une mauvaise récolte ou quand le curé local est cupide.',
		},
		defaultEffects: {
			religiousTensionModifier: 1,
			stabilityModifier: -1,
			customEffect:
				"Tension entre paysans et clergé. Risque d'excommunication locale ou de rébellion.",
		},
		playerChoices: [
			{
				id: 'tpl_td_pay',
				label: 'Payer la dîme en entier',
				description:
					'Serre-toi la ceinture mais évite les ennuis avec le curé.',
				effects: { wealthModifier: -1, reputationModifier: 1 },
			},
			{
				id: 'tpl_td_hide',
				label: 'Cacher une partie de la récolte',
				description:
					'Mentir sur la taille de la récolte. Risqué mais tout le monde le fait.',
				effects: { religiousTensionModifier: 1 },
			},
			{
				id: 'tpl_td_petition',
				label: 'Pétitionner le seigneur',
				description:
					"Demander au seigneur de réduire la part du curé. Il n'aime pas non plus enrichir l'Église.",
				effects: { reputationModifier: 1, religiousTensionModifier: -1 },
			},
		],
		flavorTexts: [
			'Le curé arrive avec son charreton pour prélever son dixième. Les greniers sont déjà presque vides.',
			'"Rendez à Dieu ce qui est à Dieu", dit le curé. "Et nous, on mange quoi ?" répond la veuve Marion.',
			"Le curé menace d'excommunication. Les paysans serrent les poings mais baissent la tête.",
		],
		tags: ['dîme', 'clergé', 'conflit', 'église', 'fiscalité'],
	},

	{
		id: 'tpl_leper_colony',
		name: "Création d'une léproserie",
		description:
			"Des lépreux sont signalés dans la région. Le seigneur ou l'Église décide d'établir une maladrerie aux portes de la ville.",
		category: 'health',
		scope: 'local',
		severity: 3,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 20,
		baseProbability: 0.03,
		triggerConditions: {
			minYear: 1050,
			maxYear: 1350,
			minPopulation: 2000,
			customCondition:
				'Présence de lépreux confirmée. Plus fréquent dans les zones densément peuplées.',
		},
		defaultEffects: {
			healthModifier: 1,
			stabilityModifier: -1,
			customEffect:
				'Les lépreux sont isolés. Peur et stigmatisation mais la contagion est limitée.',
		},
		playerChoices: [
			{
				id: 'tpl_lep_charity',
				label: 'Aider les malades',
				description:
					'Porter de la nourriture aux lépreux. Acte de charité chrétienne.',
				effects: { reputationModifier: 2, healthModifier: -1 },
			},
			{
				id: 'tpl_lep_avoid',
				label: 'Rester loin de la maladrerie',
				description:
					'La prudence vaut mieux que la charité. On ne sait pas comment ça se transmet.',
				effects: { healthModifier: 1 },
			},
			{
				id: 'tpl_lep_expel',
				label: 'Demander leur expulsion',
				description:
					'Pousser le seigneur à chasser les lépreux plus loin. Cruel mais certains y pensent.',
				effects: { stabilityModifier: -1, reputationModifier: -1 },
			},
		],
		flavorTexts: [
			"On entend la cliquette du lépreux sur le chemin. Les femmes tirent leurs enfants à l'intérieur.",
			'La maladrerie est un triste lieu — des cabanes de bois, une chapelle, et des gens oubliés du monde.',
			"Le frère Anselme soigne les lépreux sans gants. Il dit que Dieu le protège. Pour l'instant.",
		],
		tags: ['lèpre', 'maladrerie', 'maladie', 'isolement', 'charité'],
	},

	{
		id: 'tpl_mill_dispute',
		name: 'Querelle du moulin',
		description:
			"Le seigneur impose l'usage exclusif de son moulin banal. Un paysan a installé un moulin à main et risque une amende sévère.",
		category: 'economic',
		scope: 'local',
		severity: 2,
		targetClasses: ['peasant'],
		recurring: true,
		cooldownYears: 8,
		baseProbability: 0.06,
		triggerConditions: {
			minYear: 1050,
			maxYear: 1400,
			customCondition:
				'Typique du système banal féodal. Le monopole seigneurial sur le moulin est source de conflit constant.',
		},
		defaultEffects: {
			stabilityModifier: -1,
			customEffect:
				'Le paysan est puni. Le ressentiment grandit contre les droits seigneuriaux.',
		},
		playerChoices: [
			{
				id: 'tpl_md_comply',
				label: 'Utiliser le moulin seigneurial',
				description: "Payer le droit de mouture, comme la coutume l'exige.",
				effects: { wealthModifier: -1 },
			},
			{
				id: 'tpl_md_grind',
				label: 'Moudre en secret chez soi',
				description:
					'Le moulin à main est caché sous la grange. Gare aux espions du seigneur.',
				effects: { wealthModifier: 1, reputationModifier: -1 },
			},
			{
				id: 'tpl_md_collectif',
				label: 'Organiser une pétition collective',
				description:
					'Ensemble, les paysans demandent un tarif réduit. Le seigneur peut céder ou sévir.',
				effects: { stabilityModifier: -1, reputationModifier: 1 },
			},
		],
		flavorTexts: [
			"Le meunier du seigneur pèse le grain avec des balances truquées. Tout le village le sait, personne n'ose parler.",
			"On a trouvé le moulin à main de la veuve Marthe. L'amende est de trois boisseaux — un mois de farine.",
			'Le moulin banal est en panne depuis deux semaines. Le pain manque mais le seigneur interdit de moudre ailleurs.',
		],
		tags: ['moulin', 'banalité', 'féodalité', 'grain', 'conflit'],
	},

	{
		id: 'tpl_bridge_construction',
		name: "Construction d'un pont",
		description:
			"Un pont en pierre est construit sur la rivière, remplaçant l'ancien gué dangereux. Le commerce local va en bénéficier.",
		category: 'economic',
		scope: 'local',
		severity: 2,
		targetClasses: ['merchant', 'artisan', 'peasant'],
		recurring: true,
		cooldownYears: 30,
		baseProbability: 0.03,
		triggerConditions: {
			minYear: 1100,
			maxYear: 1400,
			nearTradeRoute: true,
			minWealth: 4,
			customCondition:
				'Nécessite un investissement seigneurial ou ecclésiastique. Les frères pontifes sont spécialisés dans cette tâche.',
		},
		defaultEffects: {
			wealthModifier: 2,
			stabilityModifier: 1,
			customEffect:
				'Le pont attire les marchands. Un péage est instauré. Le village prospère.',
		},
		playerChoices: [
			{
				id: 'tpl_bc_toll',
				label: 'Négocier un tarif de passage réduit pour les locaux',
				description:
					"Convaincre le seigneur d'exempter les villageois du péage.",
				effects: { wealthModifier: 1, reputationModifier: 1 },
			},
			{
				id: 'tpl_bc_build',
				label: 'Participer à la construction',
				description: 'Donner de son temps. Le pont sera fini plus vite.',
				effects: { healthModifier: -1, reputationModifier: 1 },
			},
			{
				id: 'tpl_bc_inn',
				label: 'Ouvrir une auberge près du pont',
				description: 'Les voyageurs auront besoin de manger et dormir.',
				effects: { wealthModifier: 2 },
				requiredSocialClass: 'merchant',
			},
		],
		flavorTexts: [
			'Le nouveau pont est une merveille — trois arches de pierre qui défient le courant.',
			'Depuis le pont, les charrettes passent en toute saison. Fini les noyades au gué de printemps.',
			"Le péager s'est installé. Un denier par homme, deux par cheval, cinq par chariot. Le seigneur sourit.",
		],
		tags: ['pont', 'construction', 'commerce', 'péage', 'infrastructure'],
	},

	{
		id: 'tpl_troubadour_visit',
		name: "Passage d'un troubadour",
		description:
			"Un troubadour de renom s'arrête dans la région. Ses chansons d'amour courtois et de hauts faits émerveillent la cour et les tavernes.",
		category: 'cultural',
		scope: 'local',
		severity: 1,
		targetClasses: ['noble', 'minor_noble', 'any'],
		recurring: true,
		cooldownYears: 4,
		baseProbability: 0.08,
		triggerConditions: {
			minYear: 1100,
			maxYear: 1350,
			minStability: 3,
			customCondition:
				'Plus fréquent en Occitanie, Catalogne, Italie du Nord. Nécessite une cour noble réceptive.',
		},
		defaultEffects: {
			stabilityModifier: 1,
			customEffect:
				'Diffusion de la culture courtoise. Les modes et les idéaux chevaleresques se répandent.',
		},
		playerChoices: [
			{
				id: 'tpl_tv_patron',
				label: 'Devenir mécène du troubadour',
				description:
					'Le loger, le nourrir, lui offrir des cadeaux. Il chantera votre nom dans toutes les cours.',
				effects: { wealthModifier: -1, reputationModifier: 2 },
				requiredSocialClass: 'minor_noble',
			},
			{
				id: 'tpl_tv_listen',
				label: 'Écouter ses chansons à la taverne',
				description: 'Un soir de beauté dans la grisaille du quotidien.',
				effects: { stabilityModifier: 1 },
			},
			{
				id: 'tpl_tv_hire',
				label: 'Lui commander une chanson satirique',
				description: 'Moquer un rival en chanson. Efficace mais dangereux.',
				effects: { reputationModifier: 1, stabilityModifier: -1 },
			},
		],
		flavorTexts: [
			'Sa voix porte dans la grande salle. Même le seigneur a les yeux humides quand il chante la dame lointaine.',
			"Les servantes fredonnent ses mélodies pendant des semaines. L'amour courtois est arrivé au village.",
			'Il parle de Jaufré Rudel, du comte de Toulouse, de dames inaccessibles. Les jeunes hommes soupirent.',
		],
		tags: ['troubadour', 'musique', 'amour_courtois', 'culture', 'poésie'],
	},

	{
		id: 'tpl_communal_charter',
		name: 'Charte communale',
		description:
			'Les bourgeois de la ville négocient une charte de libertés avec le seigneur. Autonomie municipale contre une forte somme.',
		category: 'political',
		scope: 'local',
		severity: 3,
		targetClasses: ['merchant', 'artisan'],
		recurring: false,
		cooldownYears: 0,
		baseProbability: 0.03,
		triggerConditions: {
			minYear: 1100,
			maxYear: 1300,
			minPopulation: 3000,
			minWealth: 5,
			customCondition:
				'Mouvement communal en pleine expansion en Europe du Nord. Les villes riches achètent leurs libertés.',
		},
		defaultEffects: {
			stabilityModifier: 2,
			wealthModifier: 1,
			customEffect:
				'La ville gagne son autonomie : élection de consuls/échevins, marché libre, justice propre. Le seigneur perd du pouvoir local.',
		},
		playerChoices: [
			{
				id: 'tpl_charte_support',
				label: 'Contribuer financièrement',
				description: 'Verser sa part pour racheter la liberté de la ville.',
				effects: {
					wealthModifier: -2,
					reputationModifier: 2,
					stabilityModifier: 1,
				},
			},
			{
				id: 'tpl_charte_profit',
				label: 'Profiter du nouveau marché libre',
				description:
					'La charte abolit les péages internes. Le commerce va fleurir.',
				effects: { wealthModifier: 2 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_charte_oppose',
				label: 'Rester loyal au seigneur',
				description:
					'La nouveauté est dangereuse. On connaît le seigneur, on ne connaît pas les consuls.',
				effects: { reputationModifier: -1 },
			},
		],
		flavorTexts: [
			'Le sceau est apposé. La cloche du beffroi sonne pour la première fois — la ville est libre.',
			'Le seigneur a accepté moyennant trois mille livres. Cher, mais quel prix pour la liberté ?',
			'Les bourgeois élisent leurs premiers échevins. Le boulanger Pierre est choisi — il sait lire.',
		],
		tags: ['commune', 'charte', 'liberté', 'bourgeoisie', 'autonomie'],
	},

	{
		id: 'tpl_knight_hospitaller',
		name: 'Passage de chevaliers hospitaliers',
		description:
			'Des frères hospitaliers traversent la région, soignant les malades et hébergeant les pèlerins. Ils recrutent aussi.',
		category: 'religious',
		scope: 'local',
		severity: 1,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 8,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1100,
			maxYear: 1312,
			requiredActiveEvents: ['evt_first_crusade'],
			nearTradeRoute: true,
			customCondition:
				'Les ordres militaires sont actifs le long des routes de pèlerinage.',
		},
		defaultEffects: {
			healthModifier: 1,
			customEffect:
				'Soins gratuits pour les pauvres. Recrutement de frères servants ou de donats.',
		},
		playerChoices: [
			{
				id: 'tpl_kh_heal',
				label: 'Se faire soigner',
				description:
					'Leurs médecins connaissent des remèdes orientaux efficaces.',
				effects: { healthModifier: 2 },
			},
			{
				id: 'tpl_kh_join',
				label: 'Rejoindre leur ordre',
				description:
					'Devenir frère servant. Une vie de discipline, de combat et de prière.',
				effects: { reputationModifier: 2, wealthModifier: -1 },
			},
			{
				id: 'tpl_kh_donate',
				label: 'Faire un don',
				description:
					'Offrir quelques pièces ou de la nourriture à leur commanderie.',
				effects: { wealthModifier: -1, reputationModifier: 1 },
			},
		],
		flavorTexts: [
			'Ils portent la croix blanche sur fond noir. Soldats et infirmiers à la fois. Une combinaison qui inspire confiance.',
			"Le frère chirurgien a recousu la jambe du petit Hugues. Sans lui, il l'aurait perdue.",
			'Leur commanderie accueille les pèlerins gratuitement. Le vin est mauvais mais le toit ne fuit pas.',
		],
		tags: [
			'hospitaliers',
			'ordre_militaire',
			'pèlerinage',
			'soins',
			'croisade',
		],
	},

	// ========================================================================
	// XIIIe SIÈCLE — UNIVERSITÉS, GUILDES, COMMERCE, MONGOLS
	// ========================================================================

	{
		id: 'tpl_university_foundation',
		name: "Fondation d'une université",
		description:
			"Des maîtres et étudiants fondent un studium generale. La ville attire des savants de toute l'Europe.",
		category: 'cultural',
		scope: 'regional',
		severity: 3,
		targetClasses: ['clergy', 'noble', 'merchant'],
		recurring: false,
		cooldownYears: 0,
		baseProbability: 0.02,
		triggerConditions: {
			minYear: 1150,
			maxYear: 1400,
			minPopulation: 5000,
			minWealth: 5,
			requiredTechs: ['tech_university'],
			customCondition:
				'Nécessite une ville importante avec des écoles cathédrales existantes. Bologne, Paris, Oxford servent de modèle.',
		},
		defaultEffects: {
			stabilityModifier: 1,
			wealthModifier: 1,
			customEffect:
				"Afflux d'étudiants et de maîtres. Copistes, libraires, aubergistes prospèrent. Conflits fréquents entre étudiants et bourgeois.",
		},
		playerChoices: [
			{
				id: 'tpl_uf_enroll',
				label: 'Envoyer un fils étudier',
				description:
					'Droit canon ou médecine — un investissement pour la famille.',
				effects: { wealthModifier: -2, reputationModifier: 2 },
			},
			{
				id: 'tpl_uf_lodge',
				label: 'Loger des étudiants',
				description: 'Ils paient bien mais sont bruyants et bagarreurs.',
				effects: { wealthModifier: 1, stabilityModifier: -1 },
			},
			{
				id: 'tpl_uf_copy',
				label: 'Devenir copiste',
				description:
					"Les livres sont rares et chers. Savoir écrire vaut de l'or.",
				effects: { wealthModifier: 1, reputationModifier: 1 },
				requiredSocialClass: 'clergy',
			},
		],
		flavorTexts: [
			'Les disputes des maîtres ès arts résonnent jusque dans la rue. On parle latin à chaque coin de rue.',
			"Le chancelier a accordé le droit d'enseigner. Cinquante étudiants sont déjà arrivés. La ville ne sera plus jamais la même.",
			'Les bourgeois se plaignent : les étudiants boivent, se battent et ne paient pas leurs dettes. Mais ils font tourner le commerce.',
		],
		tags: ['université', 'éducation', 'étudiants', 'savoir', 'droit_canon'],
	},

	{
		id: 'tpl_guild_formation',
		name: "Création d'une guilde",
		description:
			"Les artisans d'un même métier s'organisent en corporation. Règles strictes, prix fixés, apprentissage contrôlé.",
		category: 'economic',
		scope: 'local',
		severity: 2,
		targetClasses: ['artisan', 'merchant'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1150,
			maxYear: 1500,
			minPopulation: 2000,
			minWealth: 4,
			customCondition:
				'Le mouvement corporatif se développe dans les villes en croissance.',
		},
		defaultEffects: {
			stabilityModifier: 1,
			wealthModifier: 1,
			customEffect:
				'Qualité des produits garantie. Concurrence réduite. Les non-membres sont exclus du marché.',
		},
		playerChoices: [
			{
				id: 'tpl_gf_join',
				label: 'Rejoindre la guilde',
				description:
					"Payer le droit d'entrée et jurer de respecter les statuts.",
				effects: { wealthModifier: 1, reputationModifier: 1 },
				requiredSocialClass: 'artisan',
			},
			{
				id: 'tpl_gf_apprentice',
				label: 'Placer un enfant en apprentissage',
				description:
					'Trois à sept ans de formation chez un maître. Un métier pour la vie.',
				effects: { reputationModifier: 1 },
			},
			{
				id: 'tpl_gf_resist',
				label: 'Refuser la guilde et travailler seul',
				description: "Garder sa liberté mais perdre l'accès au marché couvert.",
				effects: { reputationModifier: -1, wealthModifier: -1 },
			},
		],
		flavorTexts: [
			'Les tisserands ont leur bannière maintenant. Nul ne vendra de drap en ville sans leur sceau.',
			"Le chef-d'oeuvre du jeune Étienne a impressionné les maîtres. Il est reçu compagnon.",
			'La guilde des bouchers a fixé le prix de la viande. Les bourgeois râlent mais la qualité est sûre.',
		],
		tags: ['guilde', 'corporation', 'artisanat', 'apprentissage', 'métier'],
	},

	{
		id: 'tpl_mongol_threat_rumor',
		name: "Rumeurs de l'invasion mongole",
		description:
			"Des récits terrifiants arrivent de l'Est. Des cavaliers sans nombre détruisent tout sur leur passage. Kiev est tombée.",
		category: 'military',
		scope: 'regional',
		severity: 4,
		targetClasses: ['any'],
		recurring: false,
		cooldownYears: 0,
		baseProbability: 0.08,
		triggerConditions: {
			minYear: 1220,
			maxYear: 1280,
			requiredActiveEvents: ['evt_genghis_khan'],
			customCondition:
				"Déclenché par l'expansion mongole. La terreur précède les armées. Plus fort en Europe orientale et Moyen-Orient.",
		},
		defaultEffects: {
			stabilityModifier: -2,
			customEffect:
				"Panique et fuite de réfugiés. Certains fortifient, d'autres fuient vers l'Ouest. Le prix des armes monte.",
		},
		playerChoices: [
			{
				id: 'tpl_mtr_prepare',
				label: 'Renforcer les défenses',
				description:
					'Consolider les murs, stocker des vivres. Si les Mongols viennent, on tiendra peut-être.',
				effects: { wealthModifier: -2, stabilityModifier: 1 },
			},
			{
				id: 'tpl_mtr_flee',
				label: "Fuir vers l'Ouest",
				description:
					'Tout abandonner et partir. La vie vaut plus que les terres.',
				effects: { wealthModifier: -2, healthModifier: 1 },
			},
			{
				id: 'tpl_mtr_ignore',
				label: 'Ignorer les rumeurs',
				description:
					"On raconte n'importe quoi. Les Mongols sont loin. Concentrons-nous sur la moisson.",
				effects: {},
			},
		],
		flavorTexts: [
			'Un marchand venu de Pologne tremble en racontant. Des villes entières rasées. Des pyramides de crânes.',
			"Les réfugiés coumans arrivent par milliers. Ils n'ont que la peur dans les yeux.",
			"On dit qu'ils boivent le sang de leurs chevaux et qu'aucune muraille ne les arrête.",
		],
		tags: ['mongols', 'invasion', 'terreur', 'réfugiés', 'rumeur'],
	},

	{
		id: 'tpl_maritime_trade_boom',
		name: 'Essor du commerce maritime',
		description:
			'Les navires marchands affluent au port. De nouvelles marchandises arrivent : épices, soieries, porcelaine. La ville portuaire prospère.',
		category: 'economic',
		scope: 'regional',
		severity: 3,
		targetClasses: ['merchant', 'artisan', 'noble'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1150,
			maxYear: 1500,
			nearCoast: true,
			nearTradeRoute: true,
			minWealth: 4,
			requiredTechs: ['tech_compass'],
			customCondition:
				'Venise, Gênes, Bruges, Lübeck et les autres cités marchandes étendent leurs réseaux. Nécessite un accès portuaire.',
		},
		defaultEffects: {
			wealthModifier: 2,
			populationModifier: 0.01,
			customEffect:
				'Enrichissement des marchands. Apparition de banquiers et de comptoirs. Les guildes maritimes prospèrent.',
		},
		playerChoices: [
			{
				id: 'tpl_mtb_invest',
				label: 'Investir dans une cargaison',
				description:
					'Risqué — tempêtes, pirates — mais le retour peut être énorme.',
				effects: { wealthModifier: 2 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_mtb_crew',
				label: "S'engager comme marin",
				description: 'La mer est dure mais paie mieux que les champs.',
				effects: { wealthModifier: 1, healthModifier: -1 },
			},
			{
				id: 'tpl_mtb_warehouse',
				label: 'Louer un entrepôt au port',
				description: 'Les marchands ont besoin de stocker leurs marchandises.',
				effects: { wealthModifier: 1 },
			},
		],
		flavorTexts: [
			"Trois galères génoises sont entrées dans le port ce matin. L'air sent le poivre et la cannelle.",
			"Le comptoir vénitien emploie déjà vingt personnes. On y change l'or contre des lettres de crédit.",
			"Le vieux pêcheur dit qu'il ne reconnaît plus le port. Des navires de partout, des langues qu'il n'a jamais entendues.",
		],
		tags: ['commerce', 'maritime', 'port', 'épices', 'marchands'],
	},

	{
		id: 'tpl_franciscan_preaching',
		name: 'Prédication franciscaine',
		description:
			'Des frères mendiants franciscains arrivent en ville. Pieds nus et en haillons, ils prêchent la pauvreté du Christ et critiquent la richesse du clergé.',
		category: 'religious',
		scope: 'local',
		severity: 2,
		targetClasses: ['peasant', 'artisan', 'clergy'],
		recurring: true,
		cooldownYears: 8,
		baseProbability: 0.06,
		triggerConditions: {
			minYear: 1210,
			maxYear: 1400,
			customCondition:
				"Après la fondation de l'ordre franciscain (1209). Plus fréquent dans les villes italiennes puis partout en Europe.",
		},
		defaultEffects: {
			religiousTensionModifier: 1,
			stabilityModifier: 1,
			customEffect:
				'Le message de pauvreté résonne chez les humbles. Le clergé séculier est embarrassé.',
		},
		playerChoices: [
			{
				id: 'tpl_fran_follow',
				label: 'Suivre leur enseignement',
				description:
					'La simplicité franciscaine parle au coeur. Donner aux pauvres et vivre humblement.',
				effects: { wealthModifier: -1, reputationModifier: 1 },
			},
			{
				id: 'tpl_fran_confess',
				label: 'Se confesser aux frères',
				description:
					"Contrairement au curé local, ils ne jugent pas et n'exigent rien.",
				effects: { stabilityModifier: 1 },
			},
			{
				id: 'tpl_fran_expel',
				label: 'Soutenir le curé contre les mendiants',
				description:
					'Le curé veut chasser ces vagabonds qui sapent son autorité.',
				effects: { religiousTensionModifier: 1, reputationModifier: -1 },
			},
		],
		flavorTexts: [
			"Le frère François — pas le saint, un autre — dort dans une grange et prêche au marché. Les gens s'arrêtent.",
			'Il a donné sa seule robe à un mendiant et prêché nu dans la neige. Fou ou saint ?',
			'Le curé est furieux : ses ouailles vont se confesser aux frères mendiants. Ses aumônes diminuent.',
		],
		tags: ['franciscains', 'mendiants', 'pauvreté', 'prédication', 'religion'],
	},

	{
		id: 'tpl_inquisition_visit',
		name: "Visite de l'Inquisition",
		description:
			"Des inquisiteurs dominicains arrivent dans la région. Ils interrogent, enquêtent, et parfois condamnent. La peur s'installe.",
		category: 'religious',
		scope: 'regional',
		severity: 4,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 12,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1230,
			maxYear: 1500,
			minReligiousTension: 3,
			requiredTemplateIds: ['tpl_heresy_spread'],
			customCondition:
				"L'Inquisition est envoyée là où l'hérésie a été signalée. Nécessite une hérésie locale antérieure.",
		},
		defaultEffects: {
			stabilityModifier: -2,
			religiousTensionModifier: 2,
			customEffect:
				'Procès, interrogatoires, dénonciations. Le tissu social se déchire. Certains innocents sont condamnés.',
		},
		playerChoices: [
			{
				id: 'tpl_inq_cooperate',
				label: 'Coopérer avec les inquisiteurs',
				description: "Répondre honnêtement et espérer qu'ils repartent vite.",
				effects: { stabilityModifier: 1 },
			},
			{
				id: 'tpl_inq_denounce',
				label: 'Dénoncer un rival comme hérétique',
				description:
					"L'occasion de régler des comptes personnels. Ignoble mais tentant.",
				effects: { reputationModifier: -2, stabilityModifier: -1 },
			},
			{
				id: 'tpl_inq_hide',
				label: 'Cacher un suspect recherché',
				description:
					'Risquer sa vie pour protéger un voisin accusé injustement.',
				effects: { reputationModifier: 2, healthModifier: -1 },
			},
		],
		flavorTexts: [
			'Ils sont arrivés avec leurs robes noires et blanches. Le silence est tombé sur le marché.',
			"Le boulanger a été emmené pour interrogatoire. Sa femme hurle qu'il est innocent. Personne ne bouge.",
			"Les inquisiteurs demandent à chacun de dénoncer les hérétiques qu'il connaît. Le voisin regarde le voisin avec méfiance.",
		],
		tags: ['inquisition', 'dominicains', 'hérésie', 'procès', 'terreur'],
	},

	{
		id: 'tpl_student_riot',
		name: 'Émeute étudiante',
		description:
			"Les étudiants de l'université se battent avec les bourgeois. Rixes, tavernes saccagées, et intervention du prévôt.",
		category: 'political',
		scope: 'local',
		severity: 2,
		targetClasses: ['merchant', 'artisan', 'clergy'],
		recurring: true,
		cooldownYears: 5,
		baseProbability: 0.06,
		triggerConditions: {
			minYear: 1200,
			maxYear: 1500,
			minPopulation: 5000,
			requiredTemplateIds: ['tpl_university_foundation'],
			customCondition:
				'Conflits endémiques entre la communauté universitaire (clerc, donc immunité judiciaire) et les bourgeois.',
		},
		defaultEffects: {
			stabilityModifier: -2,
			customEffect:
				"Dégâts matériels. Le chancelier menace de déplacer l'université. Les bourgeois exigent des compensations.",
		},
		playerChoices: [
			{
				id: 'tpl_sr_barricade',
				label: 'Barricader son commerce',
				description: 'Protéger ses biens en attendant que le calme revienne.',
				effects: { wealthModifier: -1 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_sr_mediate',
				label: 'Tenter une médiation',
				description:
					'Calmer les esprits entre les deux camps. Courageux mais risqué.',
				effects: { reputationModifier: 2, healthModifier: -1 },
			},
			{
				id: 'tpl_sr_profit',
				label: 'Vendre du vin aux deux camps',
				description: 'La bagarre donne soif. Autant en profiter.',
				effects: { wealthModifier: 1, reputationModifier: -1 },
			},
		],
		flavorTexts: [
			'Ça a commencé au cabaret du Coq. Un étudiant allemand a insulté le tavernier. Le sang a coulé.',
			'Le prévôt a arrêté trois étudiants. Le chancelier les réclame — ils sont clercs et relèvent du tribunal ecclésiastique.',
			"Les bourgeois veulent que l'université paie pour les dégâts. Le recteur menace de partir à Orléans.",
		],
		tags: ['université', 'émeute', 'étudiants', 'bourgeois', 'conflit'],
	},

	{
		id: 'tpl_letter_of_credit',
		name: 'Apparition des lettres de change',
		description:
			"Des banquiers italiens introduisent la lettre de change. On peut désormais voyager sans transporter d'or.",
		category: 'economic',
		scope: 'regional',
		severity: 2,
		targetClasses: ['merchant', 'noble'],
		recurring: false,
		cooldownYears: 0,
		baseProbability: 0.03,
		triggerConditions: {
			minYear: 1200,
			maxYear: 1400,
			nearTradeRoute: true,
			minWealth: 5,
			requiredTechs: ['tech_double_entry_bookkeeping'],
			customCondition:
				'Innovation financière florentine et génoise qui se diffuse le long des routes commerciales.',
		},
		defaultEffects: {
			wealthModifier: 1,
			customEffect:
				'Le commerce longue distance est facilité. Les risques de vol sur les routes diminuent. Les Templiers aussi offrent ce service.',
		},
		playerChoices: [
			{
				id: 'tpl_loc_use',
				label: 'Utiliser les lettres de change',
				description: 'Déposer son or chez le banquier et voyager léger.',
				effects: { wealthModifier: 1 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_loc_distrust',
				label: 'Se méfier de ces bouts de papier',
				description:
					"Un morceau de parchemin ne vaut pas de l'or qu'on peut peser.",
				effects: {},
			},
			{
				id: 'tpl_loc_lend',
				label: 'Devenir prêteur à intérêt',
				description:
					"L'usure est un péché mais les affaires sont les affaires. Les Lombards le font bien.",
				effects: { wealthModifier: 2, reputationModifier: -1 },
			},
		],
		flavorTexts: [
			"Le Florentin a un comptoir au port. Il échange de l'or contre du papier signé. Sorcellerie, disent les anciens.",
			'Avec cette lettre, on peut retirer cent livres à Bruges sans porter un seul sou sur la route.',
			'Les Templiers aussi font le change. Déposer à Paris, retirer à Acre. Pratique pour les croisés.',
		],
		tags: ['banque', 'lettre_de_change', 'finance', 'commerce', 'innovation'],
	},

	{
		id: 'tpl_pirate_raid_coastal',
		name: 'Raid de pirates',
		description:
			'Des pirates attaquent la côte. Pillage de villages de pêcheurs, enlèvement de captifs pour rançon ou esclavage.',
		category: 'military',
		scope: 'local',
		severity: 4,
		targetClasses: ['peasant', 'merchant', 'artisan'],
		recurring: true,
		cooldownYears: 5,
		baseProbability: 0.06,
		triggerConditions: {
			minYear: 1100,
			maxYear: 1600,
			nearCoast: true,
			customCondition:
				'Plus fréquent en Méditerranée (Barbaresques, Normands) et en mer du Nord. La piraterie est endémique.',
		},
		defaultEffects: {
			wealthModifier: -2,
			populationModifier: -0.01,
			stabilityModifier: -2,
			customEffect:
				'Destructions, captifs emmenés, terreur côtière. Les pêcheurs hésitent à sortir en mer.',
		},
		playerChoices: [
			{
				id: 'tpl_prc_fight',
				label: 'Défendre le village',
				description:
					'Armer les pêcheurs et résister. Courageux mais les pirates sont armés.',
				effects: { reputationModifier: 2, healthModifier: -2 },
			},
			{
				id: 'tpl_prc_ransom',
				label: 'Payer la rançon',
				description: 'Racheter les captifs. Cher mais humain.',
				effects: { wealthModifier: -2 },
			},
			{
				id: 'tpl_prc_tower',
				label: 'Construire une tour de guet',
				description:
					"Prévenir les prochaines attaques. Un investissement pour l'avenir.",
				effects: { wealthModifier: -1, stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			"Les voiles noires sont apparues à l'aube. Quand elles sont reparties, il ne restait que des cendres.",
			"Ils ont emmené le fils du pêcheur et trois femmes. La rançon est de vingt marcs d'argent.",
			"Depuis le raid, personne ne dort sans une hache sous le lit. La mer est devenue l'ennemie.",
		],
		tags: ['pirates', 'raid', 'côte', 'pillage', 'captifs'],
	},

	{
		id: 'tpl_jewish_quarter',
		name: "Installation d'une communauté juive",
		description:
			"Des familles juives s'installent dans la ville, apportant leurs compétences en médecine, érudition et commerce. Elles font face à la méfiance.",
		category: 'cultural',
		scope: 'local',
		severity: 2,
		targetClasses: ['merchant', 'artisan', 'any'],
		recurring: false,
		cooldownYears: 0,
		baseProbability: 0.03,
		triggerConditions: {
			minYear: 1050,
			maxYear: 1400,
			minPopulation: 3000,
			customCondition:
				'Les communautés juives sont présentes dans la plupart des villes médiévales et jouent un rôle économique crucial.',
		},
		defaultEffects: {
			wealthModifier: 1,
			religiousTensionModifier: 1,
			customEffect:
				'Enrichissement culturel et économique mais tensions potentielles. Prêt à intérêt (interdit aux chrétiens) disponible.',
		},
		playerChoices: [
			{
				id: 'tpl_jq_borrow',
				label: "Emprunter de l'argent",
				description:
					'Les prêteurs juifs offrent du crédit. Utile pour un investissement.',
				effects: { wealthModifier: 2 },
			},
			{
				id: 'tpl_jq_learn',
				label: 'Consulter un médecin juif',
				description:
					'Leur médecine est réputée meilleure que celle des barbiers.',
				effects: { healthModifier: 2 },
			},
			{
				id: 'tpl_jq_shun',
				label: 'Demander leur expulsion',
				description: 'Céder aux préjugés et à la jalousie. La ville y perdra.',
				effects: { religiousTensionModifier: 2, wealthModifier: -1 },
			},
		],
		flavorTexts: [
			'Le médecin Isaac a sauvé le fils du forgeron. Maintenant, même ceux qui crachaient sur sa porte viennent le consulter.',
			'La rue des Juifs a sa propre synagogue, son marché, son cimetière. Un monde dans la ville.',
			'Le prêteur Abraham offre des taux raisonnables. Sans lui, aucun marchand ne pourrait financer une expédition.',
		],
		tags: ['juifs', 'minorité', 'commerce', 'médecine', 'prêt'],
	},

	{
		id: 'tpl_flagellant_procession',
		name: 'Procession de flagellants',
		description:
			"Des pénitents se fouettent en public, parcourant les villes en appelant au repentir. Certains y voient la sainteté, d'autres la folie.",
		category: 'religious',
		scope: 'regional',
		severity: 3,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1260,
			maxYear: 1400,
			minReligiousTension: 3,
			customCondition:
				'Mouvement de flagellants en réponse aux crises (famines, peste, guerres). Surtout après 1349.',
		},
		defaultEffects: {
			religiousTensionModifier: 2,
			stabilityModifier: -1,
			customEffect:
				"Ferveur apocalyptique. L'Église officielle désapprouve mais le peuple est fasciné ou terrifié.",
		},
		playerChoices: [
			{
				id: 'tpl_flag_join',
				label: 'Rejoindre la procession',
				description:
					"Se fouetter pour expier ses péchés. La douleur rachète l'âme, disent-ils.",
				effects: { healthModifier: -2, reputationModifier: 1 },
			},
			{
				id: 'tpl_flag_watch',
				label: 'Observer avec effroi',
				description:
					'Le spectacle du sang et des larmes glace le sang. Mais on ne détourne pas les yeux.',
				effects: {},
			},
			{
				id: 'tpl_flag_reject',
				label: 'Fermer ses portes',
				description:
					'Ces gens sont dangereux. Ils propagent la panique et peut-être la maladie.',
				effects: { stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			'Ils marchent pieds nus, le dos en sang, en chantant le Stabat Mater. Les femmes pleurent sur leur passage.',
			"Le curé dit qu'ils sont hérétiques. Mais le curé a une maîtresse et un cellier plein. Qui est le vrai pécheur ?",
			"Le chef des flagellants annonce la fin du monde pour bientôt. Vu l'état du monde, c'est presque crédible.",
		],
		tags: ['flagellants', 'pénitence', 'procession', 'apocalypse', 'crise'],
	},

	// ========================================================================
	// XIVe SIÈCLE — PESTE, CRISE FÉODALE, GUERRE, RÉVOLTES
	// ========================================================================

	{
		id: 'tpl_plague_wave',
		name: 'Vague de peste',
		description:
			"La Mort Noire frappe la région. Les corps s'entassent, les villages se vident, les prières restent sans réponse.",
		category: 'health',
		scope: 'regional',
		severity: 5,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.08,
		triggerConditions: {
			minYear: 1347,
			maxYear: 1500,
			requiredActiveEvents: ['evt_black_death_europe'],
			customCondition:
				"Après l'arrivée de la Peste noire en Europe. Revient par vagues récurrentes environ tous les 10-15 ans.",
		},
		defaultEffects: {
			populationModifier: -0.15,
			stabilityModifier: -3,
			wealthModifier: -2,
			customEffect:
				"Mortalité massive (30-50% localement). Pénurie de main-d'oeuvre. Les survivants héritent et les salaires montent.",
		},
		playerChoices: [
			{
				id: 'tpl_pw_quarantine',
				label: 'Se barricader chez soi',
				description:
					'Fermer portes et volets. Ne voir personne. Attendre que ça passe.',
				effects: { healthModifier: 2, wealthModifier: -1 },
			},
			{
				id: 'tpl_pw_flee',
				label: 'Fuir à la campagne',
				description:
					'Quitter la ville pestiférée. Mais la maladie court plus vite que les charrettes.',
				effects: { healthModifier: 1, wealthModifier: -2 },
			},
			{
				id: 'tpl_pw_nurse',
				label: 'Soigner les malades',
				description:
					'Rester et aider. Un acte héroïque mais probablement fatal.',
				effects: { reputationModifier: 3, healthModifier: -3 },
			},
		],
		flavorTexts: [
			"Les cloches sonnent sans cesse. Il n'y a plus assez de prêtres pour donner les derniers sacrements.",
			'Le fossoyeur est mort hier. Qui enterrera les morts maintenant ?',
			"Les bubons noirs apparaissent sous les bras, dans l'aine. Après trois jours de fièvre, la mort vient.",
		],
		tags: ['peste', 'peste_noire', 'épidémie', 'mortalité', 'quarantaine'],
	},

	{
		id: 'tpl_peasant_uprising',
		name: 'Révolte paysanne',
		description:
			'Les paysans se soulèvent contre les taxes, les corvées et les abus seigneuriaux. Fourches et faucilles contre épées et armures.',
		category: 'political',
		scope: 'regional',
		severity: 4,
		targetClasses: ['peasant', 'artisan', 'noble'],
		recurring: true,
		cooldownYears: 20,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1300,
			maxYear: 1500,
			maxStability: 4,
			requiredActiveEvents: ['evt_black_death_europe'],
			customCondition:
				'Après la Peste noire, les survivants exigent plus. Jacquerie (1358), Révolte des Travailleurs (1381), les Tuchins...',
		},
		defaultEffects: {
			stabilityModifier: -3,
			customEffect:
				'Châteaux brûlés, seigneurs lynchés, récoltes détruites. La répression est brutale mais les mentalités changent.',
		},
		playerChoices: [
			{
				id: 'tpl_pu_join',
				label: 'Rejoindre la révolte',
				description:
					'"Quand Adam bêchait et qu\'Ève filait, qui donc était gentilhomme ?"',
				effects: {
					reputationModifier: 2,
					healthModifier: -2,
					stabilityModifier: -1,
				},
			},
			{
				id: 'tpl_pu_hide',
				label: 'Se terrer en attendant que ça passe',
				description: 'Ni avec les seigneurs ni avec les révoltés. Survivre.',
				effects: { wealthModifier: -1 },
			},
			{
				id: 'tpl_pu_defend',
				label: 'Défendre le château seigneurial',
				description:
					'Rester loyal au seigneur. Il récompensera peut-être cette fidélité.',
				effects: { reputationModifier: -1, stabilityModifier: 1 },
				requiredSocialClass: 'minor_noble',
			},
		],
		flavorTexts: [
			'Ils marchent par milliers avec des fourches et des bâtons. Le tocsin sonne dans chaque village.',
			"Le manoir du seigneur brûle. Les flammes éclairent la nuit. Les paysans dansent devant l'incendie.",
			'La répression a été sanglante. Cent pendus au bord de la route. Mais les corvées ont été réduites.',
		],
		tags: ['révolte', 'paysans', 'jacquerie', 'féodalité', 'insurrection'],
	},

	{
		id: 'tpl_mercenary_company',
		name: 'Passage de routiers',
		description:
			'Une compagnie de mercenaires désoeuvrer traverse la région entre deux guerres. Ils pillent, rançonnent et terrorisent.',
		category: 'military',
		scope: 'regional',
		severity: 4,
		targetClasses: ['peasant', 'merchant', 'artisan'],
		recurring: true,
		cooldownYears: 8,
		baseProbability: 0.06,
		triggerConditions: {
			minYear: 1300,
			maxYear: 1500,
			maxStability: 5,
			requiredActiveEvents: ['evt_hundred_years_war_start'],
			customCondition:
				'Pendant la Guerre de Cent Ans, les trêves sont plus dangereuses que les batailles — les soldats sans solde se servent.',
		},
		defaultEffects: {
			wealthModifier: -2,
			stabilityModifier: -2,
			populationModifier: -0.01,
			customEffect:
				'Pillages, viols, incendies. Les Grandes Compagnies sont le fléau du XIVe siècle.',
		},
		playerChoices: [
			{
				id: 'tpl_mc_pay_off',
				label: 'Payer la rançon du village',
				description: 'Cher, mais ils partiront sans brûler les maisons.',
				effects: { wealthModifier: -2, stabilityModifier: 1 },
			},
			{
				id: 'tpl_mc_resist',
				label: 'Organiser la défense',
				description:
					"Barricader les rues, armer les villageois. Contre des professionnels, c'est risqué.",
				effects: { reputationModifier: 1, healthModifier: -2 },
			},
			{
				id: 'tpl_mc_recruit',
				label: 'Rejoindre les routiers',
				description:
					"Ils recrutent. Le butin est bon et la vie est libre. Mais l'âme y reste.",
				effects: { wealthModifier: 2, reputationModifier: -2 },
			},
		],
		flavorTexts: [
			'Ils se font appeler les Tard-Venus. Leur chef porte une armure volée à un chevalier mort.',
			"Le village a payé cent florins pour qu'ils passent leur chemin. C'est la troisième fois cette année.",
			"Ils ont vidé le cellier du curé et brûlé le grenier. Le capitaine dit que c'est le prix de la paix.",
		],
		tags: [
			'routiers',
			'mercenaires',
			'pillage',
			'grandes_compagnies',
			'guerre',
		],
	},

	{
		id: 'tpl_labor_shortage',
		name: "Pénurie de main-d'oeuvre",
		description:
			'Après les ravages de la peste, les bras manquent. Les survivants exigent des salaires plus élevés. Les seigneurs tentent de les retenir de force.',
		category: 'economic',
		scope: 'regional',
		severity: 3,
		targetClasses: ['peasant', 'artisan', 'noble'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.07,
		triggerConditions: {
			minYear: 1350,
			maxYear: 1500,
			requiredActiveEvents: ['evt_black_death_europe'],
			requiredTemplateIds: ['tpl_plague_wave'],
			customCondition:
				'Conséquence directe de la peste. La terre est abondante, les hommes rares. Le rapport de force change.',
		},
		defaultEffects: {
			wealthModifier: 1,
			stabilityModifier: -1,
			customEffect:
				'Les salaires montent. Les paysans négocient. Certains fuient vers des seigneurs plus généreux. Les lois tentent de geler les salaires.',
		},
		playerChoices: [
			{
				id: 'tpl_ls_negotiate',
				label: 'Négocier un meilleur salaire',
				description:
					"Le seigneur a besoin de bras. C'est le moment de demander plus.",
				effects: { wealthModifier: 2, reputationModifier: 1 },
			},
			{
				id: 'tpl_ls_move',
				label: 'Partir vers un seigneur plus généreux',
				description:
					'La mobilité est interdite en théorie mais en pratique, qui va retenir un paysan dont tout le monde a besoin ?',
				effects: { wealthModifier: 1, stabilityModifier: -1 },
			},
			{
				id: 'tpl_ls_stay',
				label: 'Rester loyal au seigneur actuel',
				description:
					"Il promet des concessions si on reste. Un tiens vaut mieux que deux tu l'auras.",
				effects: { reputationModifier: 1 },
			},
		],
		flavorTexts: [
			"Le seigneur offre trois arpents de terre à qui labourera ses champs. Avant la peste, il n'offrait que des coups de bâton.",
			'Le Statute of Labourers dit que les salaires ne doivent pas monter. Mais la loi ne remplit pas les champs vides.',
			'Le forgeron demande le double pour ferrer un cheval. Il peut se le permettre — les autres forgerons sont morts.',
		],
		tags: ['pénurie', 'main_oeuvre', 'salaires', 'peste', 'mobilité'],
	},

	{
		id: 'tpl_pogrom',
		name: 'Pogrom',
		description:
			"La colère populaire se retourne contre la communauté juive, accusée d'empoisonner les puits ou de causer la peste. Violence meurtrière.",
		category: 'religious',
		scope: 'local',
		severity: 5,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1096,
			maxYear: 1500,
			minReligiousTension: 5,
			requiredTemplateIds: ['tpl_jewish_quarter'],
			customCondition:
				'Déclenché en période de crise (peste, famine, croisade). La communauté juive locale doit être présente.',
		},
		defaultEffects: {
			stabilityModifier: -3,
			religiousTensionModifier: 2,
			wealthModifier: -1,
			customEffect:
				'Massacres, pillages, expulsions. Perte irréparable en capital humain et économique.',
		},
		playerChoices: [
			{
				id: 'tpl_pog_protect',
				label: 'Protéger les persécutés',
				description:
					'Cacher une famille juive chez soi. Courageux et dangereux.',
				effects: { reputationModifier: 2, healthModifier: -1 },
			},
			{
				id: 'tpl_pog_passive',
				label: 'Ne rien faire',
				description: 'Fermer les yeux et les volets. La honte au ventre.',
				effects: {},
			},
			{
				id: 'tpl_pog_loot',
				label: 'Profiter du chaos pour piller',
				description:
					"Voler dans les décombres. L'opportunisme est aussi une réponse humaine.",
				effects: { wealthModifier: 2, reputationModifier: -3 },
			},
		],
		flavorTexts: [
			"La foule hurle devant la synagogue. Les pierres volent. Personne n'arrête personne.",
			'Le médecin Isaac, qui a sauvé tant de vies, est traîné dans la rue. Ses livres brûlent sur la place.',
			"Après le massacre, un silence de mort. Les survivants partent à l'aube, sans rien, vers on ne sait où.",
		],
		tags: ['pogrom', 'persécution', 'violence', 'antisémitisme', 'crise'],
	},

	{
		id: 'tpl_famine_great',
		name: 'Grande famine',
		description:
			'Plusieurs mauvaises récoltes consécutives provoquent une famine généralisée. Les prix explosent, les gens meurent dans les rues.',
		category: 'economic',
		scope: 'regional',
		severity: 5,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 25,
		baseProbability: 0.03,
		triggerConditions: {
			minYear: 1300,
			maxYear: 1400,
			requiredTemplateIds: ['tpl_bad_harvest'],
			customCondition:
				'La Grande Famine de 1315-1317 est le modèle. Nécessite des mauvaises récoltes répétées et un refroidissement climatique.',
		},
		defaultEffects: {
			populationModifier: -0.05,
			stabilityModifier: -3,
			wealthModifier: -2,
			customEffect:
				'Cannibalisme signalé dans les cas extrêmes. Exode rural. Crime en hausse. Les enfants sont abandonnés.',
		},
		playerChoices: [
			{
				id: 'tpl_gf_beg',
				label: 'Mendier aux portes du monastère',
				description:
					'Les moines distribuent encore de la soupe. Combien de temps ?',
				effects: { wealthModifier: -1, reputationModifier: -1 },
			},
			{
				id: 'tpl_gf_hoard',
				label: 'Cacher ses dernières réserves',
				description: 'Protéger les siens. Les voisins font pareil.',
				effects: { healthModifier: 1, reputationModifier: -1 },
			},
			{
				id: 'tpl_gf_share',
				label: 'Organiser la solidarité du village',
				description:
					'Mettre en commun ce qui reste. On survivra ensemble ou pas du tout.',
				effects: { reputationModifier: 2, stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			'Il pleut depuis trois mois. Le blé pourrit dans les champs. Les rats sont les seuls à manger à leur faim.',
			"Un pain de seigle coûte le salaire d'une semaine. Un cheval vaut moins qu'un boisseau de grain.",
			"On mange de l'écorce, des racines, des rats. Les enfants ont des ventres gonflés et des yeux vides.",
		],
		tags: ['famine', 'disette', 'mortalité', 'crise', 'climat'],
	},

	{
		id: 'tpl_schism_confusion',
		name: 'Confusion du Grand Schisme',
		description:
			'Deux papes (voire trois) prétendent à la tiare. Les fidèles ne savent plus lequel est le vrai. Les curés se querellent.',
		category: 'religious',
		scope: 'regional',
		severity: 3,
		targetClasses: ['clergy', 'peasant', 'any'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1378,
			maxYear: 1417,
			requiredActiveEvents: ['evt_great_schism_west'],
			customCondition:
				"Le Grand Schisme d'Occident divise la chrétienté. Rome contre Avignon. Chaque État choisit son pape.",
		},
		defaultEffects: {
			religiousTensionModifier: 2,
			stabilityModifier: -1,
			customEffect:
				"Confusion spirituelle généralisée. Vente accrue d'indulgences. Les fidèles perdent confiance dans le clergé.",
		},
		playerChoices: [
			{
				id: 'tpl_sc_rome',
				label: 'Soutenir le pape de Rome',
				description: 'Rome est le siège légitime de Pierre.',
				effects: { religiousTensionModifier: 1 },
			},
			{
				id: 'tpl_sc_avignon',
				label: "Soutenir le pape d'Avignon",
				description:
					'Avignon est plus savant et mieux organisé. Le roi le soutient.',
				effects: { religiousTensionModifier: 1 },
			},
			{
				id: 'tpl_sc_doubt',
				label: 'Douter de tout le système',
				description:
					"Si même les papes se disputent, que vaut l'Église ? Penser par soi-même est dangereux.",
				effects: { religiousTensionModifier: -1, reputationModifier: -1 },
			},
		],
		flavorTexts: [
			'Le curé prêche pour Rome. Le moine du couvent prêche pour Avignon. Le paysan ne sait plus à quel saint se vouer.',
			"Deux bulles d'excommunication croisées. Les deux papes s'excommunient mutuellement. On rit — jaune.",
			'Si deux papes vendent des indulgences, est-ce que ça vaut double ? Le forgeron pose la question, le curé ne répond pas.',
		],
		tags: ['schisme', 'papes', 'avignon', 'rome', 'crise_religieuse'],
	},

	{
		id: 'tpl_war_taxation',
		name: 'Impôts de guerre',
		description:
			'Le roi lève une taille exceptionnelle pour financer la guerre. Chaque foyer doit payer, sous peine de saisie.',
		category: 'political',
		scope: 'regional',
		severity: 3,
		targetClasses: ['peasant', 'artisan', 'merchant'],
		recurring: true,
		cooldownYears: 5,
		baseProbability: 0.06,
		triggerConditions: {
			minYear: 1300,
			maxYear: 1500,
			requiredActiveEvents: ['evt_hundred_years_war_start'],
			customCondition:
				'La Guerre de Cent Ans nécessite un financement constant. Les impôts augmentent sans cesse.',
		},
		defaultEffects: {
			wealthModifier: -2,
			stabilityModifier: -1,
			customEffect:
				"Appauvrissement généralisé. Les collecteurs d'impôts sont haïs. Les plus pauvres perdent tout.",
		},
		playerChoices: [
			{
				id: 'tpl_wt_pay_tax',
				label: 'Payer la taille',
				description: "C'est la loi du roi. On paie et on serre les dents.",
				effects: { wealthModifier: -2 },
			},
			{
				id: 'tpl_wt_evade',
				label: 'Cacher ses avoirs',
				description:
					'Enterrer les pièces, sous-déclarer les récoltes. Tout le monde le fait.',
				effects: { wealthModifier: -1, reputationModifier: -1 },
			},
			{
				id: 'tpl_wt_protest',
				label: 'Protester collectivement',
				description:
					'Refuser de payer en groupe. Le collecteur ne peut pas arrêter tout le village.',
				effects: { stabilityModifier: -2, reputationModifier: 1 },
			},
		],
		flavorTexts: [
			"Le collecteur est venu avec six hommes d'armes. Il a tout noté — la vache, les poules, le grain. Tout sera taxé.",
			"C'est la troisième taille en deux ans. Le roi dit que c'est pour reprendre Calais. On n'a jamais vu Calais.",
			"La veuve Mathilde n'a pas payé. Ils ont pris sa chèvre et son chaudron. Elle dort avec les siens dans la grange.",
		],
		tags: ['impôt', 'taille', 'guerre', 'fiscalité', 'cent_ans'],
	},

	{
		id: 'tpl_abandoned_village',
		name: 'Village abandonné',
		description:
			'Un village voisin est totalement déserté après la peste et la famine. Ses terres et maisons sont vides. La nature reprend ses droits.',
		category: 'economic',
		scope: 'local',
		severity: 3,
		targetClasses: ['peasant', 'noble'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1350,
			maxYear: 1500,
			requiredTemplateIds: ['tpl_plague_wave'],
			customCondition:
				'Phénomène massif après la Peste noire. Des milliers de Wüstungen en Europe. Les terres les moins fertiles sont abandonnées les premières.',
		},
		defaultEffects: {
			populationModifier: -0.02,
			customEffect:
				'Les survivants des villages voisins peuvent récupérer terres et matériaux. La forêt regagne du terrain.',
		},
		playerChoices: [
			{
				id: 'tpl_av_claim',
				label: 'Revendiquer les terres abandonnées',
				description:
					'Personne ne les réclame. Autant les prendre avant le seigneur.',
				effects: { wealthModifier: 2 },
			},
			{
				id: 'tpl_av_salvage',
				label: 'Récupérer les matériaux de construction',
				description: 'Les pierres du moulin feront un bon mur de grange.',
				effects: { wealthModifier: 1 },
			},
			{
				id: 'tpl_av_avoid',
				label: 'Éviter le village maudit',
				description:
					'On dit que les fantômes y rôdent. Et peut-être la peste aussi.',
				effects: {},
			},
		],
		flavorTexts: [
			"Le village de la colline est vide. Les toits s'effondrent. Le puits est couvert de mousse. Seuls les corbeaux y vivent.",
			"On entend encore la cloche tinter les jours de vent. Il n'y a personne pour la sonner.",
			"L'herbe pousse dans l'église. Les bancs sont encore en rang, comme si les fidèles allaient revenir.",
		],
		tags: ['village_abandonné', 'Wüstung', 'peste', 'dépopulation', 'ruines'],
	},

	{
		id: 'tpl_cannon_arrival',
		name: "Apparition de l'artillerie",
		description:
			'Les premières bombardes sont utilisées dans la région. Le fracas du canon annonce la fin des châteaux invincibles.',
		category: 'military',
		scope: 'regional',
		severity: 3,
		targetClasses: ['noble', 'minor_noble', 'artisan'],
		recurring: false,
		cooldownYears: 0,
		baseProbability: 0.03,
		triggerConditions: {
			minYear: 1340,
			maxYear: 1450,
			requiredTechs: ['tech_gunpowder_weapons'],
			customCondition:
				"L'artillerie à poudre se diffuse lentement en Europe à partir de Crécy (1346) et surtout au XVe siècle.",
		},
		defaultEffects: {
			stabilityModifier: -1,
			customEffect:
				'Les châteaux deviennent vulnérables. La guerre change. Les chevaliers sont menacés par les canonniers.',
		},
		playerChoices: [
			{
				id: 'tpl_ca_learn',
				label: "S'initier à l'artillerie",
				description:
					"Apprendre à manier la bombarde. Un métier d'avenir, dangereux mais recherché.",
				effects: { reputationModifier: 1, healthModifier: -1 },
			},
			{
				id: 'tpl_ca_fortify',
				label: 'Adapter les fortifications',
				description:
					'Épaissir les murs, creuser des bastions. Coûteux mais nécessaire.',
				effects: { wealthModifier: -2, stabilityModifier: 1 },
				requiredSocialClass: 'noble',
			},
			{
				id: 'tpl_ca_fear',
				label: 'Craindre cette arme du diable',
				description:
					"La poudre sent le soufre. C'est une invention de Satan, murmurent les anciens.",
				effects: {},
			},
		],
		flavorTexts: [
			"Le premier tir de bombarde a fait trembler la terre et fuir les chevaux. Un morceau de mur s'est effondré comme du pain.",
			"Le canonnier vient de Flandre. Il mélange salpêtre, charbon et soufre avec le soin d'un apothicaire.",
			"Les chevaliers regardent la bombarde avec mépris. Mais c'est la bombarde qui fera tomber leurs châteaux.",
		],
		tags: ['artillerie', 'bombarde', 'poudre', 'guerre', 'innovation'],
	},

	{
		id: 'tpl_dance_macabre',
		name: 'Danse macabre',
		description:
			'Une fresque de la Danse macabre apparaît sur les murs du cimetière. La Mort invite riches et pauvres, rois et mendiants à danser.',
		category: 'cultural',
		scope: 'local',
		severity: 1,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1350,
			maxYear: 1500,
			requiredActiveEvents: ['evt_black_death_europe'],
			customCondition:
				'Expression artistique née du traumatisme de la Peste noire. La mort est omniprésente dans la culture du XIVe siècle.',
		},
		defaultEffects: {
			religiousTensionModifier: 1,
			customEffect:
				'Réflexion collective sur la mortalité. Le memento mori inspire à la fois la piété et le hédonisme.',
		},
		playerChoices: [
			{
				id: 'tpl_dm_contemplate',
				label: 'Contempler la fresque',
				description:
					"La Mort ne fait pas de différence entre le roi et le mendiant. Leçon d'humilité.",
				effects: { stabilityModifier: 1 },
			},
			{
				id: 'tpl_dm_feast',
				label: "Profiter de la vie tant qu'elle dure",
				description:
					"Si la mort peut venir demain, autant manger, boire et aimer aujourd'hui.",
				effects: { wealthModifier: -1, healthModifier: -1 },
			},
			{
				id: 'tpl_dm_pray',
				label: 'Prier pour les morts',
				description:
					'Commander des messes pour les âmes du purgatoire. Le curé approuve.',
				effects: { wealthModifier: -1, reputationModifier: 1 },
			},
		],
		flavorTexts: [
			'Le peintre a mis trois mois. Le pape danse avec un squelette, suivi du roi, du marchand, du paysan. Tous égaux.',
			"Les enfants viennent voir la fresque en riant. Les vieux viennent en pleurant. Chacun y voit ce qu'il porte.",
			'"Vous serez ce que je suis", dit le mort au vivant. Le message est peint en lettres noires sur fond d\'or.',
		],
		tags: ['danse_macabre', 'art', 'mort', 'peste', 'memento_mori'],
	},

	{
		id: 'tpl_free_company_disbandment',
		name: 'Reconversion de routiers',
		description:
			"Une trêve dans la guerre libère des milliers de soldats sans emploi. Certains deviennent brigands, d'autres cherchent un patron.",
		category: 'military',
		scope: 'regional',
		severity: 3,
		targetClasses: ['noble', 'merchant', 'peasant'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1340,
			maxYear: 1500,
			requiredTemplateIds: ['tpl_mercenary_company'],
			customCondition:
				'Après chaque trêve de la Guerre de Cent Ans. Le pape tente de les envoyer en croisade.',
		},
		defaultEffects: {
			stabilityModifier: -1,
			customEffect:
				"Insécurité sur les routes. Certains routiers s'installent et deviennent seigneurs. D'autres sont pendus.",
		},
		playerChoices: [
			{
				id: 'tpl_fcd_hire',
				label: 'Engager des routiers comme gardes',
				description: 'Transformer le problème en solution. Cher mais efficace.',
				effects: { wealthModifier: -1, stabilityModifier: 1 },
				requiredSocialClass: 'noble',
			},
			{
				id: 'tpl_fcd_avoid',
				label: 'Éviter les routes principales',
				description:
					'Passer par les chemins de traverse. Plus long mais plus sûr.',
				effects: { wealthModifier: -1 },
			},
			{
				id: 'tpl_fcd_crusade',
				label: 'Encourager leur départ en croisade',
				description:
					'Le pape propose de les envoyer combattre les Turcs. Bonne débarras.',
				effects: { stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			"La trêve est signée. Dix mille hommes d'armes sans solde errent sur les routes de France.",
			"Le capitaine Arnaud de Cervole s'est fait seigneur de trois villages. Qui ira lui demander de partir ?",
			'Du Guesclin a emmené les Grandes Compagnies en Castille. Bon débarras — sauf pour les Castillans.',
		],
		tags: ['routiers', 'trêve', 'reconversion', 'brigandage', 'guerre'],
	},

	// ========================================================================
	// XVe SIÈCLE — RENAISSANCE, IMPRIMERIE, DÉCOUVERTES, FIN DU MOYEN ÂGE
	// ========================================================================

	{
		id: 'tpl_printing_press_arrival',
		name: "Arrivée de l'imprimerie",
		description:
			"Un imprimeur s'installe en ville avec sa presse à caractères mobiles. Les livres deviennent accessibles. Les idées circulent plus vite.",
		category: 'cultural',
		scope: 'regional',
		severity: 3,
		targetClasses: ['clergy', 'merchant', 'noble'],
		recurring: false,
		cooldownYears: 0,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1450,
			maxYear: 1550,
			requiredActiveEvents: ['evt_gutenberg_press'],
			minPopulation: 3000,
			requiredTechs: ['tech_printing_press'],
			customCondition:
				"L'imprimerie se diffuse depuis Mayence à travers l'Europe. Nécessite une ville avec un public lettré.",
		},
		defaultEffects: {
			stabilityModifier: 1,
			customEffect:
				"Bibles, almanachs, pamphlets — tout s'imprime. Les copistes perdent leur emploi. Le savoir se démocratise.",
		},
		playerChoices: [
			{
				id: 'tpl_ppa_buy',
				label: 'Acheter un livre imprimé',
				description:
					"Dix fois moins cher qu'un manuscrit. Une Bible pour le prix d'une vache.",
				effects: { reputationModifier: 1 },
			},
			{
				id: 'tpl_ppa_invest',
				label: "Investir dans l'atelier d'imprimerie",
				description:
					"Financer l'imprimeur contre une part des profits. Les livres se vendent bien.",
				effects: { wealthModifier: 2 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_ppa_ban',
				label: 'Soutenir la censure des livres',
				description:
					"L'évêque veut contrôler ce qui s'imprime. Des idées dangereuses circulent.",
				effects: { religiousTensionModifier: 1, reputationModifier: -1 },
			},
		],
		flavorTexts: [
			"L'imprimeur a sorti cent exemplaires en un mois. Les moines copistes en produisaient un par an.",
			"Le curé est inquiet : n'importe qui peut lire la Bible maintenant. Et l'interpréter à sa façon.",
			"Les étudiants se ruent sur les textes imprimés. Aristote pour trois sous. Le savoir n'a plus de prix.",
		],
		tags: ['imprimerie', 'gutenberg', 'livres', 'savoir', 'innovation'],
	},

	{
		id: 'tpl_greek_refugees',
		name: 'Réfugiés grecs de Constantinople',
		description:
			'Des savants et artisans byzantins fuient la conquête ottomane. Ils apportent des manuscrits antiques et un savoir oublié.',
		category: 'cultural',
		scope: 'regional',
		severity: 2,
		targetClasses: ['clergy', 'noble', 'merchant'],
		recurring: false,
		cooldownYears: 0,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1453,
			maxYear: 1520,
			requiredActiveEvents: ['evt_fall_constantinople'],
			customCondition:
				"Afflux de lettrés grecs en Italie et dans le reste de l'Europe après 1453.",
		},
		defaultEffects: {
			stabilityModifier: 1,
			customEffect:
				'Redécouverte de textes grecs anciens : Platon, Euclide, Galien. Stimulation intellectuelle majeure.',
		},
		playerChoices: [
			{
				id: 'tpl_gr_patronize',
				label: 'Accueillir un savant grec',
				description:
					'Il enseigne le grec ancien et traduit des textes inédits.',
				effects: { reputationModifier: 2, wealthModifier: -1 },
			},
			{
				id: 'tpl_gr_manuscripts',
				label: 'Acheter des manuscrits',
				description:
					"Des textes d'Aristote et de Ptolémée jamais vus en Occident.",
				effects: { wealthModifier: -1, reputationModifier: 1 },
			},
			{
				id: 'tpl_gr_ignore',
				label: 'Ignorer ces étrangers',
				description:
					"Des réfugiés qui parlent une langue incompréhensible. Qu'ont-ils à offrir ?",
				effects: {},
			},
		],
		flavorTexts: [
			"Le vieux professeur de Constantinople pleure en déballant ses manuscrits. C'est tout ce qu'il a sauvé.",
			"Il lit Platon dans le texte. Les étudiants sont éblouis. Un monde de pensée s'ouvre.",
			'Les manuscrits sentent le sel marin et la fumée. Ils ont traversé la Méditerranée dans des coffres.',
		],
		tags: ['constantinople', 'réfugiés', 'grecs', 'manuscrits', 'renaissance'],
	},

	{
		id: 'tpl_renaissance_art',
		name: "Commission d'une oeuvre d'art",
		description:
			"Un peintre ou sculpteur de renom est engagé pour décorer une église ou un palais. L'art de la Renaissance transforme les regards.",
		category: 'cultural',
		scope: 'local',
		severity: 2,
		targetClasses: ['noble', 'clergy', 'merchant'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1400,
			maxYear: 1600,
			requiredActiveEvents: ['evt_italian_renaissance_peak'],
			minWealth: 5,
			customCondition:
				"La Renaissance artistique irradie depuis l'Italie. Les mécènes rivalisent pour attirer les artistes.",
		},
		defaultEffects: {
			stabilityModifier: 1,
			customEffect:
				"Prestige accru pour le commanditaire. Les artistes locaux s'inspirent des nouvelles techniques (perspective, clair-obscur).",
		},
		playerChoices: [
			{
				id: 'tpl_ra_commission',
				label: 'Commander un retable',
				description:
					'Le peintre utilisera la perspective et des couleurs éclatantes. Une oeuvre pour les siècles.',
				effects: { wealthModifier: -2, reputationModifier: 2 },
			},
			{
				id: 'tpl_ra_apprentice',
				label: "Placer un enfant en apprentissage chez l'artiste",
				description:
					'Apprendre les secrets du métier : pigments, proportions, anatomie.',
				effects: { reputationModifier: 1 },
			},
			{
				id: 'tpl_ra_reject',
				label: 'Critiquer ces images trop profanes',
				description:
					"Ces nus et ces dieux païens n'ont rien à faire dans une église.",
				effects: { religiousTensionModifier: 1 },
			},
		],
		flavorTexts: [
			"Le peintre a mis la Vierge dans un paysage qu'on reconnaît — nos collines. L'effet est saisissant.",
			"Il peint des corps comme on n'en avait jamais vu — muscles, veines, expressions. On croirait qu'ils respirent.",
			"Le retable a coûté cent florins. Le marchand qui l'a payé dit que c'est un investissement pour son âme.",
		],
		tags: ['renaissance', 'art', 'peinture', 'mécénat', 'culture'],
	},

	{
		id: 'tpl_ottoman_trade_disruption',
		name: 'Perturbation du commerce oriental',
		description:
			"La conquête ottomane bouleverse les routes commerciales vers l'Orient. Les épices et la soie se font rares et chères.",
		category: 'economic',
		scope: 'regional',
		severity: 3,
		targetClasses: ['merchant', 'noble'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1453,
			maxYear: 1600,
			requiredActiveEvents: ['evt_fall_constantinople'],
			nearTradeRoute: true,
			customCondition:
				'La chute de Constantinople perturbe le commerce est-ouest. Les marchands cherchent des routes alternatives.',
		},
		defaultEffects: {
			wealthModifier: -1,
			customEffect:
				'Hausse des prix des épices. Motivation pour chercher des routes maritimes vers les Indes. Stimule les grandes découvertes.',
		},
		playerChoices: [
			{
				id: 'tpl_otd_adapt',
				label: "S'adapter aux intermédiaires ottomans",
				description:
					'Les Ottomans vendent aussi. Il faut juste accepter leurs prix.',
				effects: { wealthModifier: -1 },
			},
			{
				id: 'tpl_otd_invest_sea',
				label: 'Investir dans une expédition maritime',
				description:
					'Trouver une route par la mer vers les épices. Risqué mais le gain serait immense.',
				effects: { wealthModifier: -2 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_otd_substitute',
				label: 'Trouver des substituts locaux',
				description:
					'Les herbes du jardin ne remplacent pas le poivre, mais elles sont gratuites.',
				effects: { wealthModifier: 1 },
			},
		],
		flavorTexts: [
			'Le poivre a triplé de prix depuis que les Turcs tiennent Constantinople. Le cuisinier du seigneur désespère.',
			"Un marchand vénitien dit qu'il faut contourner l'Afrique. Tout le monde rit. Sauf les Portugais.",
			"La soie de Chine n'arrive plus. Les tisserands locaux tentent d'imiter, sans succès.",
		],
		tags: ['ottoman', 'commerce', 'épices', 'routes', 'découvertes'],
	},

	{
		id: 'tpl_banking_house',
		name: "Installation d'une banque",
		description:
			"Une grande famille de banquiers ouvre un comptoir. Prêts, lettres de change, investissements — la finance moderne s'installe.",
		category: 'economic',
		scope: 'local',
		severity: 2,
		targetClasses: ['merchant', 'noble'],
		recurring: false,
		cooldownYears: 0,
		baseProbability: 0.03,
		triggerConditions: {
			minYear: 1400,
			maxYear: 1600,
			minWealth: 5,
			minPopulation: 5000,
			requiredTechs: ['tech_double_entry_bookkeeping'],
			customCondition:
				"Les Médicis, les Fugger, les Welser — les dynasties bancaires transforment l'économie européenne.",
		},
		defaultEffects: {
			wealthModifier: 2,
			customEffect:
				'Le crédit est disponible. Les investissements augmentent. Mais la dépendance aux banquiers crée des risques.',
		},
		playerChoices: [
			{
				id: 'tpl_bh_borrow',
				label: 'Emprunter pour investir',
				description:
					'Le taux est raisonnable. De quoi acheter un atelier ou un navire.',
				effects: { wealthModifier: 2 },
			},
			{
				id: 'tpl_bh_deposit',
				label: 'Déposer ses économies',
				description:
					"Plus sûr que sous le matelas. Et les intérêts s'accumulent.",
				effects: { wealthModifier: 1 },
			},
			{
				id: 'tpl_bh_distrust',
				label: 'Se méfier des usuriers',
				description:
					"L'argent qui fait de l'argent, c'est contre nature. L'Église le dit bien.",
				effects: {},
			},
		],
		flavorTexts: [
			"Le banquier florentin s'est installé dans la plus belle maison de la place. Son coffre-fort pèse plus que tout l'or du village.",
			'Avec une lettre de change, on achète à Lyon et on paie à Anvers. La magie du papier signé.',
			'Le banquier prête au roi, au pape et aux marchands. Si la banque tombe, tout le monde tombe.',
		],
		tags: ['banque', 'finance', 'médicis', 'crédit', 'investissement'],
	},

	{
		id: 'tpl_new_world_goods',
		name: 'Arrivée de produits du Nouveau Monde',
		description:
			'Des marchandises inconnues débarquent des navires : pommes de terre, maïs, tomates, tabac, cacao. Le monde change dans les assiettes.',
		category: 'economic',
		scope: 'regional',
		severity: 2,
		targetClasses: ['peasant', 'merchant', 'any'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1500,
			maxYear: 1700,
			requiredActiveEvents: ['evt_columbus_discovery'],
			requiredTechs: ['tech_caravel'],
			customCondition:
				"L'échange colombien transforme l'alimentation mondiale. Les nouveaux produits se diffusent lentement.",
		},
		defaultEffects: {
			wealthModifier: 1,
			populationModifier: 0.01,
			customEffect:
				'Le maïs et la pomme de terre nourrissent plus de monde. Le tabac crée une nouvelle industrie. Le cacao, un luxe.',
		},
		playerChoices: [
			{
				id: 'tpl_nwg_plant',
				label: 'Planter les nouvelles cultures',
				description:
					'La pomme de terre pousse partout et résiste au gel. Miracle.',
				effects: { wealthModifier: 1, healthModifier: 1 },
			},
			{
				id: 'tpl_nwg_trade',
				label: 'Commercer le tabac et le cacao',
				description: 'Produits de luxe très demandés par la noblesse.',
				effects: { wealthModifier: 2 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_nwg_reject',
				label: 'Refuser ces plantes étrangères',
				description:
					"On ne sait pas ce que c'est. La tomate est sûrement toxique.",
				effects: {},
			},
		],
		flavorTexts: [
			"Le marin a ramené un tubercule bosselé. Personne n'en veut. Dans cinquante ans, tout le monde en mangera.",
			'Le cacao se boit chaud avec du sucre. Les dames de la cour en raffolent. Un nouveau luxe est né.',
			"Le tabac se fume dans une pipe. Certains disent que c'est médicinal. D'autres toussent.",
		],
		tags: [
			'nouveau_monde',
			'pomme_de_terre',
			'tabac',
			'cacao',
			'échange_colombien',
		],
	},

	{
		id: 'tpl_reconquista_refugees',
		name: 'Réfugiés de la Reconquista',
		description:
			"Des Juifs et des Musulmans expulsés d'Espagne cherchent refuge. Ils apportent des compétences rares.",
		category: 'cultural',
		scope: 'regional',
		severity: 3,
		targetClasses: ['merchant', 'artisan', 'any'],
		recurring: false,
		cooldownYears: 0,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1492,
			maxYear: 1550,
			requiredActiveEvents: ['evt_reconquista_granada'],
			customCondition:
				"L'expulsion des Juifs (1492) et des Morisques d'Espagne provoque un exode massif.",
		},
		defaultEffects: {
			wealthModifier: 1,
			religiousTensionModifier: 1,
			customEffect:
				"Médecins, orfèvres, marchands affluent. Enrichissement des villes d'accueil (Amsterdam, Salonique, Istanbul).",
		},
		playerChoices: [
			{
				id: 'tpl_rr_welcome',
				label: 'Accueillir les réfugiés',
				description:
					'Leurs compétences sont précieuses. Un orfèvre juif, un médecin maure — que demander de plus ?',
				effects: { wealthModifier: 1, reputationModifier: 1 },
			},
			{
				id: 'tpl_rr_expel',
				label: 'Refuser les étrangers',
				description: "Assez de bouches à nourrir. Qu'ils aillent ailleurs.",
				effects: { religiousTensionModifier: 1, reputationModifier: -1 },
			},
			{
				id: 'tpl_rr_convert',
				label: 'Exiger leur conversion',
				description:
					"Ils peuvent rester s'ils se baptisent. La sincérité, on verra plus tard.",
				effects: { religiousTensionModifier: 1 },
			},
		],
		flavorTexts: [
			'Ils sont arrivés avec des clefs. Les clefs de leurs maisons de Tolède. Ils les gardent, au cas où.',
			"Le médecin maure parle cinq langues et connaît des remèdes qu'aucun barbier local n'imagine.",
			"L'orfèvre séfarade produit des bijoux si fins que la duchesse ne jure plus que par lui.",
		],
		tags: ['réfugiés', 'reconquista', 'séfarades', 'morisques', 'expulsion'],
	},

	{
		id: 'tpl_condottiere',
		name: 'Condottiere en quête de contrat',
		description:
			'Un capitaine mercenaire italien propose ses services au plus offrant. Ses compagnies sont efficaces mais coûteuses et peu fiables.',
		category: 'military',
		scope: 'regional',
		severity: 3,
		targetClasses: ['noble', 'merchant'],
		recurring: true,
		cooldownYears: 8,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1380,
			maxYear: 1530,
			customCondition:
				'Les condottieri dominent la guerre en Italie et se répandent en Europe. Professionnels de la guerre à louer.',
		},
		defaultEffects: {
			stabilityModifier: -1,
			customEffect:
				'La guerre devient affaire de professionnels. Les milices communales perdent en importance.',
		},
		playerChoices: [
			{
				id: 'tpl_condo_hire',
				label: 'Engager la compagnie',
				description: 'Cher mais ils savent se battre. Gare à la facture.',
				effects: { wealthModifier: -2, stabilityModifier: 1 },
				requiredSocialClass: 'noble',
			},
			{
				id: 'tpl_condo_refuse',
				label: 'Refuser et risquer son ire',
				description:
					'Un condottiere sans contrat est dangereux. Il pourrait se servir tout seul.',
				effects: { stabilityModifier: -1 },
			},
			{
				id: 'tpl_condo_enlist',
				label: "S'enrôler dans sa compagnie",
				description:
					'La solde est bonne et le métier des armes nourrit son homme.',
				effects: { wealthModifier: 1, healthModifier: -1 },
			},
		],
		flavorTexts: [
			'Le condottiere est arrivé avec trois cents lances et un sourire de requin. Il veut cinq mille ducats par mois.',
			"On dit qu'il a changé de camp trois fois en un an. Mais personne ne conteste son efficacité.",
			'Sa compagnie passe sous les murs. Les paysans rentrent le bétail. Ami ou ennemi, un mercenaire reste un mercenaire.',
		],
		tags: ['condottiere', 'mercenaire', 'italie', 'guerre', 'compagnie'],
	},

	{
		id: 'tpl_witch_panic',
		name: 'Panique sorcellaire',
		description:
			"La peur des sorcières s'intensifie. Le Malleus Maleficarum circule. Des femmes (surtout) sont accusées, torturées, brûlées.",
		category: 'religious',
		scope: 'local',
		severity: 4,
		targetClasses: ['peasant', 'artisan', 'any'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1480,
			maxYear: 1700,
			minReligiousTension: 3,
			customCondition:
				"La chasse aux sorcières s'intensifie avec le Malleus Maleficarum (1487). Pic entre 1580 et 1650.",
		},
		defaultEffects: {
			stabilityModifier: -2,
			religiousTensionModifier: 2,
			customEffect:
				'Terreur, délation, procès iniques. Toute femme seule, étrange ou savante est suspecte.',
		},
		playerChoices: [
			{
				id: 'tpl_wp_protect',
				label: 'Défendre une accusée',
				description:
					"Risquer d'être accusé soi-même. Mais la vieille Margot n'est pas une sorcière.",
				effects: { reputationModifier: 2, healthModifier: -1 },
			},
			{
				id: 'tpl_wp_silent',
				label: 'Se taire et attendre',
				description:
					"Ne pas attirer l'attention. Qui se mêle de l'Inquisition se brûle les doigts.",
				effects: {},
			},
			{
				id: 'tpl_wp_accuse',
				label: 'Dénoncer une rivale',
				description:
					"Régler un vieux conflit. L'occasion est trop belle pour certains.",
				effects: { reputationModifier: -2, stabilityModifier: -1 },
			},
		],
		flavorTexts: [
			'La sage-femme a été arrêtée. Elle qui a mis au monde la moitié du village est accusée de tuer les nouveau-nés.',
			"Le Malleus Maleficarum dit que les femmes sont faibles et le diable fort. Le juge ne demande rien d'autre.",
			'Trois femmes brûlées en un mois. Le village sent encore la fumée et la peur.',
		],
		tags: ['sorcellerie', 'procès', 'Malleus', 'bûcher', 'terreur'],
	},

	{
		id: 'tpl_enclosure_movement',
		name: 'Clôture des communaux',
		description:
			'Le seigneur clôture les terres communes pour y mettre des moutons. Les paysans perdent leurs pâturages et leurs droits anciens.',
		category: 'economic',
		scope: 'local',
		severity: 3,
		targetClasses: ['peasant'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1450,
			maxYear: 1700,
			customCondition:
				"Le mouvement des enclosures commence en Angleterre au XVe siècle et s'intensifie. La laine vaut plus que le blé.",
		},
		defaultEffects: {
			stabilityModifier: -2,
			populationModifier: -0.01,
			customEffect:
				'Exode rural. Les paysans sans terre deviennent vagabonds ou ouvriers. La production lainière enrichit les propriétaires.',
		},
		playerChoices: [
			{
				id: 'tpl_em_resist',
				label: 'Résister à la clôture',
				description:
					'Arracher les haies la nuit. Les anciens ont leurs droits.',
				effects: { reputationModifier: 1, stabilityModifier: -1 },
			},
			{
				id: 'tpl_em_leave',
				label: 'Partir vers la ville',
				description:
					'Plus de terre, plus de raison de rester. La ville offre du travail.',
				effects: { wealthModifier: -1 },
			},
			{
				id: 'tpl_em_sheep',
				label: 'Se reconvertir en berger',
				description:
					'Si les moutons remplacent les champs, autant garder les moutons.',
				effects: { wealthModifier: 1 },
			},
		],
		flavorTexts: [
			'"Les moutons mangent les hommes", dit Thomas More. Les haies poussent là où les enfants jouaient.',
			'Le seigneur a fait venir des clôtures de bois. La prairie commune est devenue un pâturage privé.',
			"Sans les communaux, pas de bois de chauffe, pas de glands pour les porcs. L'hiver sera terrible.",
		],
		tags: ['enclosure', 'clôture', 'communaux', 'moutons', 'exode'],
	},

	{
		id: 'tpl_war_reconstruction',
		name: "Reconstruction d'après-guerre",
		description:
			'La guerre est finie. Les ruines fument encore. Les survivants reconstruisent, lentement. Les terres vacantes attendent.',
		category: 'economic',
		scope: 'regional',
		severity: 3,
		targetClasses: ['peasant', 'artisan', 'merchant'],
		recurring: true,
		cooldownYears: 20,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1453,
			maxYear: 1550,
			requiredActiveEvents: ['evt_end_hundred_years_war'],
			customCondition:
				'Après la Guerre de Cent Ans. Des régions entières sont dévastées et se repeuplent lentement.',
		},
		defaultEffects: {
			wealthModifier: 1,
			populationModifier: 0.01,
			stabilityModifier: 1,
			customEffect:
				'Les friches sont remises en culture. Les villes se rebâtissent. De nouvelles opportunités apparaissent.',
		},
		playerChoices: [
			{
				id: 'tpl_wr_rebuild',
				label: 'Reconstruire sa maison',
				description:
					'Pierre par pierre. Les matériaux sont bon marché — il y a plus de ruines que de maçons.',
				effects: { wealthModifier: -1, stabilityModifier: 1 },
			},
			{
				id: 'tpl_wr_claim',
				label: 'Revendiquer des terres vacantes',
				description:
					'Les anciens propriétaires sont morts. La terre est là, elle attend.',
				effects: { wealthModifier: 2 },
			},
			{
				id: 'tpl_wr_migrate',
				label: 'Immigrer dans une zone sinistrée',
				description:
					'Les seigneurs offrent des conditions avantageuses pour attirer de nouveaux paysans.',
				effects: { wealthModifier: 1, stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			'Trente ans de guerre. Les champs sont des friches, les villages des décombres. Mais les oiseaux chantent à nouveau.',
			'Le seigneur offre trois ans sans corvée à qui relèvera les murs. Les bras ne manquent pas — les matériaux si.',
			'On plante des vignes dans les tranchées. La vie est obstinée.',
		],
		tags: [
			'reconstruction',
			'après-guerre',
			'repopulation',
			'cent_ans',
			'renouveau',
		],
	},

	{
		id: 'tpl_royal_centralization',
		name: 'Centralisation royale',
		description:
			'Le roi renforce son pouvoir. Impôts permanents, armée royale, justice unifiée. Les seigneurs locaux perdent leur autonomie.',
		category: 'political',
		scope: 'national',
		severity: 3,
		targetClasses: ['noble', 'minor_noble', 'merchant'],
		recurring: true,
		cooldownYears: 20,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1440,
			maxYear: 1600,
			customCondition:
				'Formation des États modernes : France (Charles VII, Louis XI), Angleterre (Tudors), Espagne (Rois Catholiques).',
		},
		defaultEffects: {
			stabilityModifier: 1,
			customEffect:
				"Fin de l'anarchie féodale. Paix relative mais perte de libertés locales. Les États Généraux perdent en influence.",
		},
		playerChoices: [
			{
				id: 'tpl_rc_serve',
				label: 'Servir le roi',
				description:
					"Entrer dans l'administration royale. Les officiers du roi ont un bel avenir.",
				effects: { reputationModifier: 2, wealthModifier: 1 },
			},
			{
				id: 'tpl_rc_resist_local',
				label: 'Défendre les droits seigneuriaux',
				description:
					'Le roi empiète sur les prérogatives locales. Résister est risqué.',
				effects: { reputationModifier: -1, stabilityModifier: -1 },
				requiredSocialClass: 'noble',
			},
			{
				id: 'tpl_rc_profit',
				label: 'Profiter de la paix nouvelle',
				description:
					'Moins de guerres privées, plus de commerce. Les routes sont sûres.',
				effects: { wealthModifier: 1 },
			},
		],
		flavorTexts: [
			'Le roi a envoyé un bailli. Il juge désormais à la place du seigneur. Les temps changent.',
			"L'impôt royal est permanent maintenant. Plus besoin de convoquer les États pour lever la taille.",
			"Les compagnies d'ordonnance du roi patrouillent. Les routiers ont disparu. Les routes sont sûres pour la première fois en un siècle.",
		],
		tags: [
			'centralisation',
			'monarchie',
			'administration',
			'état_moderne',
			'pouvoir',
		],
	},

	{
		id: 'tpl_spice_fortune',
		name: 'Fortune des épices',
		description:
			"Un navire revient des Indes chargé d'épices. Le retour sur investissement est fabuleux. La fièvre spéculative gagne le port.",
		category: 'economic',
		scope: 'regional',
		severity: 2,
		targetClasses: ['merchant', 'noble'],
		recurring: true,
		cooldownYears: 8,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1498,
			maxYear: 1650,
			requiredActiveEvents: ['evt_vasco_da_gama'],
			nearCoast: true,
			requiredTechs: ['tech_caravel', 'tech_cartography'],
			customCondition:
				"Après l'ouverture de la route des Indes par Vasco de Gama. Lisbonne, puis Amsterdam, deviennent les plaques tournantes.",
		},
		defaultEffects: {
			wealthModifier: 2,
			customEffect:
				'Enrichissement fulgurant des investisseurs. Création de compagnies commerciales. Spéculation intense.',
		},
		playerChoices: [
			{
				id: 'tpl_sf_invest',
				label: 'Investir dans une cargaison',
				description:
					'Un sac de poivre acheté à Goa vaut cent fois son prix à Amsterdam.',
				effects: { wealthModifier: 3 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_sf_crew',
				label: "S'embarquer comme marin",
				description:
					'Six mois de mer, le scorbut et les tempêtes. Mais la prime vaut le risque.',
				effects: { wealthModifier: 1, healthModifier: -2 },
			},
			{
				id: 'tpl_sf_cautious',
				label: 'Observer prudemment',
				description:
					'Un navire sur trois ne revient jamais. Mieux vaut garder ses sous.',
				effects: {},
			},
		],
		flavorTexts: [
			'Le navire est entré au port couvert de sel et de gloire. Sa cargaison de poivre vaut une fortune.',
			"L'investisseur a mis cent florins. Il en récupère mille. La fièvre des épices est contagieuse.",
			'Le marin a perdu trois dents et gagné un an de salaire. Il repartira. Ils repartent tous.',
		],
		tags: ['épices', 'commerce', 'Indes', 'navigation', 'fortune'],
	},

	{
		id: 'tpl_hussite_influence',
		name: 'Influence hussite',
		description:
			'Les idées de Jan Hus se propagent. Communion sous les deux espèces, sermons en langue vulgaire, rejet du luxe clérical.',
		category: 'religious',
		scope: 'regional',
		severity: 3,
		targetClasses: ['peasant', 'artisan', 'clergy'],
		recurring: true,
		cooldownYears: 12,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1415,
			maxYear: 1500,
			requiredActiveEvents: ['evt_hussite_wars'],
			minReligiousTension: 3,
			customCondition:
				'Les idées hussites préfigurent la Réforme. Se propagent en Bohême puis dans les pays voisins.',
		},
		defaultEffects: {
			religiousTensionModifier: 2,
			stabilityModifier: -1,
			customEffect:
				'Contestation du clergé. Demande de réformes. Le calice devient un symbole de rébellion.',
		},
		playerChoices: [
			{
				id: 'tpl_hi_support',
				label: 'Rejoindre les réformateurs',
				description:
					"Le calice pour tous. La Bible en tchèque. L'Église doit changer.",
				effects: { religiousTensionModifier: 1, reputationModifier: 1 },
			},
			{
				id: 'tpl_hi_loyal',
				label: 'Rester fidèle à Rome',
				description: "L'hérésie mène au bûcher. Hus l'a appris à ses dépens.",
				effects: { reputationModifier: 1 },
			},
			{
				id: 'tpl_hi_neutral',
				label: 'Rester neutre',
				description: 'Les disputes théologiques ne remplissent pas le ventre.',
				effects: {},
			},
		],
		flavorTexts: [
			'Le prédicateur brandit un calice. "Pour tous les fidèles, pas seulement le prêtre !" La foule gronde.',
			'On a brûlé Hus à Constance, mais ses idées ne brûlent pas. Elles se répandent comme les flammes.',
			'Le curé dit la messe en latin. Le prédicateur hussite dit le sermon en langue du peuple. Qui comprend-on mieux ?',
		],
		tags: ['hussites', 'réforme', 'calice', 'hérésie', 'bohême'],
	},

	// ========================================================================
	// XVIe SIÈCLE — RÉFORME, CONQUÊTES, GUERRES DE RELIGION, INFLATION
	// ========================================================================

	{
		id: 'tpl_protestant_preaching',
		name: 'Prédication protestante',
		description:
			'Un pasteur prêche la doctrine de Luther ou de Calvin. La grâce seule sauve. Les indulgences sont une escroquerie.',
		category: 'religious',
		scope: 'local',
		severity: 3,
		targetClasses: ['peasant', 'artisan', 'merchant', 'clergy'],
		recurring: true,
		cooldownYears: 8,
		baseProbability: 0.06,
		triggerConditions: {
			minYear: 1517,
			maxYear: 1650,
			requiredActiveEvents: ['evt_augsburg_peace'],
			requiredTechs: ['tech_printing_press'],
			customCondition:
				'La Réforme protestante se propage après les 95 thèses de Luther (1517). Conflit confessionnel majeur.',
		},
		defaultEffects: {
			religiousTensionModifier: 2,
			stabilityModifier: -1,
			customEffect:
				'Division confessionnelle. Familles et villages se déchirent. Iconoclasme possible.',
		},
		playerChoices: [
			{
				id: 'tpl_pp_convert',
				label: 'Se convertir au protestantisme',
				description:
					"La Bible seule, la grâce seule. Plus besoin d'intermédiaires.",
				effects: { religiousTensionModifier: 1, reputationModifier: -1 },
			},
			{
				id: 'tpl_pp_catholic',
				label: 'Rester catholique',
				description:
					'La foi des pères. On ne change pas la religion comme de chemise.',
				effects: { reputationModifier: 1 },
			},
			{
				id: 'tpl_pp_debate',
				label: 'Assister aux débats théologiques',
				description:
					'Écouter les deux camps avant de choisir. La prudence est une vertu.',
				effects: {},
			},
		],
		flavorTexts: [
			"Le pasteur a affiché ses thèses sur la porte de l'église. Le curé les a arrachées. Le pasteur les a imprimées.",
			'"Sola scriptura, sola fide, sola gratia." Les mots de Luther résonnent dans les tavernes.',
			"Le briseur d'images a détruit les statues de la chapelle. Le seul ornement est un livre ouvert.",
		],
		tags: ['protestantisme', 'réforme', 'luther', 'calvin', 'religion'],
	},

	{
		id: 'tpl_iconoclasm',
		name: 'Crise iconoclaste',
		description:
			"Des protestants zélés détruisent les statues, les vitraux et les images des églises. La fureur briseur d'images frappe.",
		category: 'religious',
		scope: 'local',
		severity: 4,
		targetClasses: ['clergy', 'artisan', 'any'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1520,
			maxYear: 1600,
			requiredTemplateIds: ['tpl_protestant_preaching'],
			minReligiousTension: 5,
			customCondition:
				"Les Pays-Bas (1566), la France, l'Allemagne. La destruction des images accompagne la Réforme radicale.",
		},
		defaultEffects: {
			stabilityModifier: -3,
			religiousTensionModifier: 2,
			customEffect:
				'Destruction du patrimoine artistique. Traumatisme pour les catholiques. Réaction violente possible.',
		},
		playerChoices: [
			{
				id: 'tpl_ico_smash',
				label: 'Participer à la destruction',
				description:
					'Les idoles doivent tomber. Le deuxième commandement est clair.',
				effects: { religiousTensionModifier: 1, reputationModifier: -1 },
			},
			{
				id: 'tpl_ico_save',
				label: 'Sauver des oeuvres en cachette',
				description:
					"Cacher un retable dans une grange. L'art mérite mieux que le marteau.",
				effects: { reputationModifier: 1 },
			},
			{
				id: 'tpl_ico_flee',
				label: 'Fuir la violence',
				description: 'Quand la foule est en fureur, mieux vaut être ailleurs.',
				effects: { healthModifier: 1 },
			},
		],
		flavorTexts: [
			'Les vitraux explosent un par un. Trois siècles de beauté tombent en pluie de couleurs brisées.',
			'La Vierge en bois peint a brûlé sur le parvis. Le curé pleure. Le pasteur prie.',
			"Ils ont même détruit l'orgue. Le silence dans l'église est assourdissant.",
		],
		tags: ['iconoclasme', 'destruction', 'protestantisme', 'images', 'réforme'],
	},

	{
		id: 'tpl_price_revolution',
		name: "Inflation par l'argent américain",
		description:
			"L'afflux d'argent du Pérou et du Mexique provoque une hausse généralisée des prix. Les salaires ne suivent pas.",
		category: 'economic',
		scope: 'regional',
		severity: 3,
		targetClasses: ['peasant', 'artisan', 'merchant'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1550,
			maxYear: 1650,
			requiredActiveEvents: ['evt_potosi_silver'],
			customCondition:
				"La révolution des prix frappe l'Europe entière. L'argent de Potosí inonde les marchés. Les prix triplent en un siècle.",
		},
		defaultEffects: {
			wealthModifier: -1,
			stabilityModifier: -1,
			customEffect:
				"Les prix montent mais les salaires stagnent. Les rentiers et les seigneurs à rentes fixes s'appauvrissent. Les débiteurs gagnent.",
		},
		playerChoices: [
			{
				id: 'tpl_pr_hoard',
				label: 'Stocker des denrées',
				description:
					'Le grain sera plus cher demain. Spéculation ou prudence ?',
				effects: { wealthModifier: 1 },
			},
			{
				id: 'tpl_pr_negotiate',
				label: 'Renégocier ses dettes',
				description:
					"L'argent vaut moins qu'avant. Bon moment pour rembourser.",
				effects: { wealthModifier: 1 },
			},
			{
				id: 'tpl_pr_suffer',
				label: 'Subir la hausse',
				description:
					"Le pain coûte le double. Le salaire n'a pas bougé. On serre la ceinture.",
				effects: { wealthModifier: -1, healthModifier: -1 },
			},
		],
		flavorTexts: [
			"Le boulanger a encore augmenté ses prix. C'est le troisième fois cette année. L'argent ne vaut plus rien, dit-on.",
			"Les galions espagnols déversent l'argent du Pérou. Paradoxe : plus il y a d'or, plus on est pauvre.",
			"Le fermier qui devait cent livres il y a vingt ans les rembourse facilement. Le seigneur qui les reçoit n'en achète que la moitié de ce qu'elles valaient.",
		],
		tags: ['inflation', 'prix', 'argent', 'Potosí', 'économie'],
	},

	{
		id: 'tpl_religious_massacre',
		name: 'Massacre confessionnel',
		description:
			"Les tensions religieuses explosent. Catholiques et protestants s'entretuent. La nuit est rouge.",
		category: 'military',
		scope: 'local',
		severity: 5,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1550,
			maxYear: 1650,
			requiredActiveEvents: ['evt_french_wars_of_religion'],
			minReligiousTension: 6,
			customCondition:
				'Guerres de Religion en France, Pays-Bas, Saint-Empire. La Saint-Barthélemy (1572) en est le paroxysme.',
		},
		defaultEffects: {
			stabilityModifier: -4,
			populationModifier: -0.03,
			religiousTensionModifier: 3,
			customEffect:
				'Massacre, exode, traumatisme générationnel. Le tissu social est déchiré pour des décennies.',
		},
		playerChoices: [
			{
				id: 'tpl_rm_hide_neighbor',
				label: 'Cacher un voisin menacé',
				description:
					"Protestant ou catholique, c'est d'abord un voisin. Le cacher au risque de sa vie.",
				effects: { reputationModifier: 3, healthModifier: -2 },
			},
			{
				id: 'tpl_rm_flee',
				label: 'Fuir la ville',
				description:
					'Partir avec le strict minimum. Tout plutôt que de rester dans le sang.',
				effects: { wealthModifier: -2, healthModifier: 1 },
			},
			{
				id: 'tpl_rm_barricade',
				label: 'Se barricader chez soi',
				description:
					'Fermer les volets, prier, attendre. Le bruit des épées finira bien par cesser.',
				effects: { healthModifier: -1 },
			},
		],
		flavorTexts: [
			"Le tocsin a sonné à minuit. À l'aube, les rues étaient rouges. On tuait au nom de Dieu.",
			"Le voisin Pierre, qu'on connaissait depuis l'enfance, gît devant sa porte. Son seul crime : sa prière.",
			'Les enfants ne comprennent pas pourquoi leur ami Jean ne viendra plus jouer. Il priait différemment.',
		],
		tags: [
			'massacre',
			'guerres_de_religion',
			'Saint-Barthélemy',
			'violence',
			'confessionnel',
		],
	},

	{
		id: 'tpl_huguenot_flight',
		name: 'Exode huguenot',
		description:
			'Des familles protestantes fuient la persécution. Artisans qualifiés, tisserands, orfèvres — la ville perd ses meilleurs ouvriers.',
		category: 'cultural',
		scope: 'regional',
		severity: 3,
		targetClasses: ['artisan', 'merchant', 'any'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1560,
			maxYear: 1700,
			requiredActiveEvents: ['evt_french_wars_of_religion'],
			minReligiousTension: 4,
			customCondition:
				"Exil des huguenots français vers Genève, les Pays-Bas, l'Angleterre, le Brandebourg.",
		},
		defaultEffects: {
			populationModifier: -0.02,
			wealthModifier: -1,
			customEffect:
				"Perte de savoir-faire artisanal. Les villes d'accueil (Amsterdam, Londres, Berlin) en profitent énormément.",
		},
		playerChoices: [
			{
				id: 'tpl_hf_welcome',
				label: 'Accueillir les réfugiés huguenots',
				description:
					'Leurs compétences sont précieuses. Tisserands de soie, horlogers, imprimeurs.',
				effects: { wealthModifier: 2, reputationModifier: 1 },
			},
			{
				id: 'tpl_hf_depart',
				label: 'Partir avec eux',
				description:
					'Quitter la terre des ancêtres pour la liberté de conscience.',
				effects: { wealthModifier: -2, stabilityModifier: -1 },
			},
			{
				id: 'tpl_hf_confiscate',
				label: 'Racheter leurs biens à bas prix',
				description:
					'Ils partent en urgence et vendent tout pour rien. Opportunisme pur.',
				effects: { wealthModifier: 2, reputationModifier: -2 },
			},
		],
		flavorTexts: [
			'La famille Dupont est partie cette nuit avec deux malles. Leur atelier de soie est vide.',
			"L'horloger calviniste a fermé boutique. Genève l'accueillera. Nous perdons le meilleur artisan de la ville.",
			'Ils montent dans les charrettes avec des bibles et des outils. Pas de meubles, pas de souvenirs. Juste le nécessaire.',
		],
		tags: ['huguenots', 'exode', 'réfugiés', 'protestantisme', 'savoir-faire'],
	},

	{
		id: 'tpl_jesuit_mission',
		name: 'Mission jésuite',
		description:
			"Des pères jésuites ouvrent un collège. Éducation d'élite, discipline de fer, formation des futurs dirigeants.",
		category: 'religious',
		scope: 'local',
		severity: 2,
		targetClasses: ['noble', 'merchant', 'clergy'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1540,
			maxYear: 1700,
			requiredActiveEvents: ['evt_council_trent'],
			customCondition:
				'La Compagnie de Jésus (1540) est le fer de lance de la Contre-Réforme. Collèges partout en Europe.',
		},
		defaultEffects: {
			stabilityModifier: 1,
			customEffect:
				'Éducation de qualité pour les élites. Influence politique considérable. Les protestants les détestent.',
		},
		playerChoices: [
			{
				id: 'tpl_jm_enroll',
				label: 'Inscrire un fils au collège',
				description:
					'La meilleure éducation du continent. Latin, grec, rhétorique, sciences.',
				effects: { wealthModifier: -1, reputationModifier: 2 },
			},
			{
				id: 'tpl_jm_vocation',
				label: 'Rejoindre la Compagnie',
				description:
					"Devenir soldat du Christ. Vœu d'obéissance, missions au bout du monde.",
				effects: { reputationModifier: 2, wealthModifier: -1 },
			},
			{
				id: 'tpl_jm_distrust',
				label: 'Se méfier de ces manipulateurs',
				description:
					"Les jésuites ont trop d'influence. Ils espionnent pour le pape.",
				effects: { religiousTensionModifier: 1 },
			},
		],
		flavorTexts: [
			'Le collège jésuite est le plus beau bâtiment de la ville. La discipline y est absolue et le savoir immense.',
			"Le père recteur parle six langues et a vécu au Japon. Les étudiants l'écoutent, bouche bée.",
			'Les jésuites confessent le roi, éduquent ses enfants et correspondent avec Rome. Certains y voient un complot.',
		],
		tags: ['jésuites', 'éducation', 'contre-réforme', 'collège', 'religion'],
	},

	{
		id: 'tpl_slave_trade_involvement',
		name: 'Commerce triangulaire',
		description:
			"Des navires négriers passent au port. Pacotille vers l'Afrique, esclaves vers les Amériques, sucre vers l'Europe. Un commerce atroce et lucratif.",
		category: 'economic',
		scope: 'regional',
		severity: 5,
		targetClasses: ['merchant', 'noble'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1530,
			maxYear: 1800,
			requiredActiveEvents: ['evt_atlantic_slave_trade'],
			nearCoast: true,
			requiredTechs: ['tech_galleon'],
			customCondition:
				'Le commerce triangulaire enrichit les ports européens. Nantes, Liverpool, Lisbonne en sont des plaques tournantes.',
		},
		defaultEffects: {
			wealthModifier: 2,
			customEffect:
				'Enrichissement considérable des armateurs. Souffrance indicible des victimes. Les sucriers coloniaux prospèrent.',
		},
		playerChoices: [
			{
				id: 'tpl_st_profit',
				label: 'Investir dans une expédition négrière',
				description: 'Le retour est énorme. Le coût humain est occulté.',
				effects: { wealthModifier: 3, reputationModifier: -2 },
			},
			{
				id: 'tpl_st_refuse',
				label: 'Refuser de participer',
				description:
					"Ce commerce est inhumain. Certaines voix s'élèvent, rares mais courageuses.",
				effects: { reputationModifier: 2 },
			},
			{
				id: 'tpl_st_sugar',
				label: 'Commercer le sucre colonial',
				description:
					'Le sucre des Antilles vient du sang des esclaves, mais il se vend cher.',
				effects: { wealthModifier: 2 },
			},
		],
		flavorTexts: [
			"Le négrier est revenu avec 400 captifs. 120 sont morts en route. L'armateur calcule que c'est encore rentable.",
			'Le sucre dans votre tasse a le goût du sang si on y réfléchit. Mais qui y réfléchit ?',
			"Le capitaine dit que ce sont des sauvages. L'aumônier du bord ne dort plus depuis trois nuits.",
		],
		tags: [
			'esclavage',
			'traite',
			'commerce_triangulaire',
			'négrière',
			'Atlantique',
		],
	},

	{
		id: 'tpl_colonial_plantation',
		name: 'Départ vers les colonies',
		description:
			'Le Nouveau Monde cherche des colons. Terres gratuites, or, aventure. Mais la traversée tue et les indigènes résistent.',
		category: 'military',
		scope: 'regional',
		severity: 3,
		targetClasses: ['peasant', 'artisan', 'merchant'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1520,
			maxYear: 1700,
			requiredActiveEvents: ['evt_columbus_discovery'],
			nearCoast: true,
			requiredTechs: ['tech_caravel'],
			customCondition:
				"L'émigration vers les Amériques s'intensifie. Engagés, colons, aventuriers, condamnés.",
		},
		defaultEffects: {
			populationModifier: -0.01,
			customEffect:
				'Émigration de jeunes hommes. Certains font fortune, la plupart disparaissent. Les colonies grandissent.',
		},
		playerChoices: [
			{
				id: 'tpl_cp_emigrate',
				label: 'Partir aux Amériques',
				description:
					"Tout recommencer de l'autre côté de l'océan. Risqué mais l'espoir est là.",
				effects: { wealthModifier: -1, healthModifier: -2 },
			},
			{
				id: 'tpl_cp_invest',
				label: 'Investir dans une plantation',
				description:
					"Le sucre, le tabac, le coton. La terre est gratuite, la main-d'oeuvre... moins.",
				effects: { wealthModifier: 2 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_cp_stay',
				label: 'Rester sur ses terres',
				description:
					"L'aventure est pour les fous. La terre des ancêtres vaut plus que l'or des sauvages.",
				effects: {},
			},
		],
		flavorTexts: [
			"Le recruteur promet des terres et de l'or. Le marin qui l'accompagne a le teint jaune du scorbut.",
			'Son frère est parti il y a trois ans. Pas une lettre. Est-il riche ? Est-il mort ?',
			'Le navire part demain pour la Nouvelle-France. Trente familles montent à bord. Combien reviendront ?',
		],
		tags: ['colonies', 'émigration', 'Amériques', 'plantations', 'exploration'],
	},

	{
		id: 'tpl_spanish_inquisition_reach',
		name: "Ombre de l'Inquisition espagnole",
		description:
			"L'Inquisition espagnole étend son influence. Les conversos et les suspects de judaïsme secret sont traqués.",
		category: 'religious',
		scope: 'regional',
		severity: 4,
		targetClasses: ['merchant', 'artisan', 'any'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1478,
			maxYear: 1700,
			requiredActiveEvents: ['evt_spanish_inquisition'],
			customCondition:
				"L'Inquisition espagnole est particulièrement active contre les conversos (juifs convertis) et les morisques.",
		},
		defaultEffects: {
			religiousTensionModifier: 2,
			stabilityModifier: -2,
			customEffect:
				'Autodafés, confiscations de biens, fuite des élites converses. Climat de terreur et de délation.',
		},
		playerChoices: [
			{
				id: 'tpl_sir_prove',
				label: 'Prouver sa pureté de sang',
				description:
					'Les statuts de limpieza de sangre exigent de montrer patte blanche. Humiliant mais nécessaire.',
				effects: { reputationModifier: 1, wealthModifier: -1 },
			},
			{
				id: 'tpl_sir_hide',
				label: 'Cacher ses origines',
				description:
					'Ne jamais parler du grand-père. Manger du porc ostensiblement. Vivre dans le mensonge.',
				effects: { stabilityModifier: -1 },
			},
			{
				id: 'tpl_sir_flee_north',
				label: 'Fuir vers le Nord',
				description:
					"Amsterdam, Hambourg — les villes du Nord n'ont pas d'Inquisition.",
				effects: { wealthModifier: -1 },
			},
		],
		flavorTexts: [
			"L'autodafé a duré toute la journée. Les flammes et les prières. Le peuple regarde, fasciné ou terrifié.",
			"Le Don Cristóbal était un médecin respecté. On a découvert qu'il allumait des bougies le vendredi soir. Il n'est plus.",
			"L'Inquisiteur est un vieil homme patient. Il pose toujours la même question, encore et encore, jusqu'à obtenir un aveu.",
		],
		tags: ['inquisition', 'espagne', 'conversos', 'autodafé', 'persécution'],
	},

	{
		id: 'tpl_peasant_war',
		name: 'Guerre des paysans',
		description:
			'Les paysans se soulèvent en masse, inspirés par Luther — mais Luther les condamne. Révolte écrasée dans le sang.',
		category: 'political',
		scope: 'regional',
		severity: 4,
		targetClasses: ['peasant', 'artisan', 'noble'],
		recurring: true,
		cooldownYears: 25,
		baseProbability: 0.03,
		triggerConditions: {
			minYear: 1520,
			maxYear: 1560,
			requiredActiveEvents: ['evt_peasants_war_germany'],
			requiredTemplateIds: ['tpl_protestant_preaching'],
			customCondition:
				'La Réforme donne des arguments aux revendications sociales. Les 12 articles de Memmingen demandent justice.',
		},
		defaultEffects: {
			stabilityModifier: -3,
			populationModifier: -0.02,
			customEffect:
				'Massacres, destructions de monastères. La répression fait 100 000 morts en Allemagne. Le servage se renforce.',
		},
		playerChoices: [
			{
				id: 'tpl_pw_rebel',
				label: 'Rejoindre la révolte',
				description:
					'"Plus de corvée, plus de dîme ! Nous sommes tous égaux devant Dieu !"',
				effects: { reputationModifier: 1, healthModifier: -3 },
			},
			{
				id: 'tpl_pw_loyal_lord',
				label: 'Défendre le seigneur',
				description:
					"L'ordre social a sa raison d'être. La rébellion mène au chaos.",
				effects: { reputationModifier: -1, stabilityModifier: 1 },
			},
			{
				id: 'tpl_pw_hide_war',
				label: 'Se cacher dans les bois',
				description:
					'Quand les armées passent, paysans et seigneurs souffrent pareil.',
				effects: { wealthModifier: -1 },
			},
		],
		flavorTexts: [
			'"Nous ne sommes pas du bétail !" crient les paysans. Les 12 articles circulent de village en village.',
			"Luther les a condamnés : \"Frappez, étranglez, tuez ces paysans furieux.\" L'allié d'hier est devenu l'ennemi.",
			"Le château brûle. Le monastère est pillé. Mais quand les Landsknechts arrivent, la révolte s'éteint dans le sang.",
		],
		tags: ['paysans', 'révolte', 'réforme', 'Allemagne', 'servage'],
	},

	{
		id: 'tpl_galleon_treasure',
		name: "Passage d'un galion chargé d'or",
		description:
			"Un galion espagnol chargé d'or et d'argent fait escale. La richesse des Amériques transite sous escorte armée.",
		category: 'economic',
		scope: 'local',
		severity: 2,
		targetClasses: ['merchant', 'artisan'],
		recurring: true,
		cooldownYears: 5,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1540,
			maxYear: 1700,
			requiredActiveEvents: ['evt_potosi_silver'],
			nearCoast: true,
			requiredTechs: ['tech_galleon'],
			customCondition:
				"Les convois de galions traversent l'Atlantique deux fois par an. La flotte des Indes est un trésor flottant.",
		},
		defaultEffects: {
			wealthModifier: 1,
			customEffect:
				"L'escale stimule le commerce local. Mariniers, cabaretiers et prostituées prospèrent.",
		},
		playerChoices: [
			{
				id: 'tpl_gt_trade',
				label: 'Commercer avec les marins',
				description: 'Ils paient bien et veulent tout : vivres, vin, cordages.',
				effects: { wealthModifier: 1 },
			},
			{
				id: 'tpl_gt_enlist',
				label: "S'embarquer comme marin",
				description:
					'La flotte cherche toujours des bras. La solde est bonne, le scorbut aussi.',
				effects: { wealthModifier: 1, healthModifier: -1 },
			},
			{
				id: 'tpl_gt_piracy',
				label: 'Renseigner les corsaires',
				description:
					'Drake ou Hawkins paieraient cher pour connaître la route du convoi.',
				effects: { wealthModifier: 2, reputationModifier: -2 },
			},
		],
		flavorTexts: [
			'Douze galions au mouillage. Les soldats gardent les cales comme des dragons leur trésor.',
			"Un marin a laissé tomber un réal d'argent au cabaret. On se l'est disputé une heure.",
			"Les corsaires anglais rôdent. L'amiral fait doubler la garde. La nuit, personne ne dort.",
		],
		tags: ['galion', 'or', 'argent', 'Espagne', 'convoi'],
	},

	{
		id: 'tpl_mercator_maps',
		name: 'Nouvelles cartes du monde',
		description:
			"De nouvelles cartes arrivent montrant des continents inconnus. Le monde est plus grand qu'on ne le pensait.",
		category: 'cultural',
		scope: 'regional',
		severity: 1,
		targetClasses: ['merchant', 'noble', 'clergy'],
		recurring: false,
		cooldownYears: 0,
		baseProbability: 0.03,
		triggerConditions: {
			minYear: 1507,
			maxYear: 1600,
			requiredActiveEvents: ['evt_columbus_discovery'],
			requiredTechs: ['tech_cartography'],
			customCondition:
				'La cartographie explose avec les grandes découvertes. Mercator, Waldseemüller, Ortelius transforment la vision du monde.',
		},
		defaultEffects: {
			customEffect:
				"La vision du monde change radicalement. L'Europe n'est plus le centre. De nouvelles routes s'ouvrent.",
		},
		playerChoices: [
			{
				id: 'tpl_mm_buy',
				label: 'Acheter une carte imprimée',
				description:
					'Voir le monde entier sur une feuille. Un objet de savoir et de pouvoir.',
				effects: { wealthModifier: -1, reputationModifier: 1 },
			},
			{
				id: 'tpl_mm_navigate',
				label: 'Utiliser les cartes pour le commerce',
				description:
					'Planifier de nouvelles routes maritimes. Le savoir géographique est un avantage commercial.',
				effects: { wealthModifier: 1 },
				requiredSocialClass: 'merchant',
			},
			{
				id: 'tpl_mm_doubt',
				label: 'Douter de ces fantaisies',
				description:
					"Un continent entier à l'Ouest ? Et quoi encore ? Des dragons au Sud ?",
				effects: {},
			},
		],
		flavorTexts: [
			"La carte montre un océan immense et des terres que personne ici n'a jamais vues. Le monde a changé de taille.",
			"\"America\" est écrit sur le nouveau continent. Du nom d'Amerigo, pas de Christophe. L'injustice de l'Histoire.",
			'Le navigateur trace sa future route sur la carte de Mercator. Les loxodromies sont des lignes droites. Révolution.',
		],
		tags: ['cartes', 'géographie', 'Mercator', 'exploration', 'monde'],
	},

	// ========================================================================
	// XVIIe SIÈCLE — GUERRES TOTALES, ABSOLUTISME, SCIENCE, COLONIES
	// ========================================================================

	{
		id: 'tpl_thirty_years_devastation',
		name: 'Dévastation de la Guerre de Trente Ans',
		description:
			'Armées suédoises, impériales et françaises piétinent les campagnes. Villages brûlés, populations massacrées, famines.',
		category: 'military',
		scope: 'regional',
		severity: 5,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.07,
		triggerConditions: {
			minYear: 1618,
			maxYear: 1648,
			requiredActiveEvents: ['evt_thirty_years_war'],
			customCondition:
				"La pire guerre en Europe avant les guerres mondiales. L'Allemagne perd un tiers de sa population.",
		},
		defaultEffects: {
			populationModifier: -0.1,
			stabilityModifier: -4,
			wealthModifier: -3,
			customEffect:
				'Destruction totale. Cannibalisme signalé. Pandémies liées. Des régions mettent un siècle à se remettre.',
		},
		playerChoices: [
			{
				id: 'tpl_tyd_hide',
				label: 'Se cacher dans la forêt',
				description:
					'Des familles entières vivent dans les bois pendant des mois. Mieux que de croiser une armée.',
				effects: { healthModifier: -1, wealthModifier: -1 },
			},
			{
				id: 'tpl_tyd_serve',
				label: 'Servir comme vivandier',
				description:
					"Suivre l'armée et vendre des vivres aux soldats. Dangereux mais lucratif.",
				effects: { wealthModifier: 1, healthModifier: -1 },
			},
			{
				id: 'tpl_tyd_fortify',
				label: 'Fortifier le village',
				description:
					'Palissades, fossés, guetteurs. Transformer le village en forteresse de fortune.',
				effects: { wealthModifier: -1, stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			"Les Suédois sont passés hier. Il ne reste que les murs noircis et l'odeur de la cendre.",
			"On mange de l'herbe et de l'écorce. Le chien a disparu — personne ne demande dans quel ragoût.",
			"Un village de 300 âmes. Il en reste 40. Le curé est mort. L'église sert d'étable. Simplement.",
		],
		tags: ['trente_ans', 'dévastation', 'guerre', 'famine', 'Allemagne'],
	},

	{
		id: 'tpl_absolutist_edict',
		name: 'Édit royal absolutiste',
		description:
			"Le roi promulgue un édit renforçant son pouvoir. Interdictions, obligations, contrôles. L'État s'impose jusque dans les foyers.",
		category: 'political',
		scope: 'national',
		severity: 3,
		targetClasses: ['noble', 'merchant', 'peasant'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1600,
			maxYear: 1750,
			requiredActiveEvents: ['evt_louis_xiv'],
			customCondition:
				"L'absolutisme triomphe au XVIIe siècle. Louis XIV en est le modèle. \"L'État, c'est moi.\"",
		},
		defaultEffects: {
			stabilityModifier: 1,
			customEffect:
				'Ordre public renforcé. Libertés locales réduites. La noblesse est domestiquée à Versailles.',
		},
		playerChoices: [
			{
				id: 'tpl_ae_obey',
				label: "Obéir à l'édit",
				description:
					"Le roi commande, le sujet obéit. C'est l'ordre naturel des choses.",
				effects: { stabilityModifier: 1 },
			},
			{
				id: 'tpl_ae_court',
				label: 'Se rapprocher de la cour',
				description:
					"Versailles est le centre du monde. Être vu du roi, c'est exister.",
				effects: { wealthModifier: -2, reputationModifier: 2 },
				requiredSocialClass: 'noble',
			},
			{
				id: 'tpl_ae_resist_quietly',
				label: 'Résister discrètement',
				description:
					'Traîner des pieds, ignorer les ordres, garder ses vieilles coutumes.',
				effects: { reputationModifier: -1 },
			},
		],
		flavorTexts: [
			"L'intendant du roi est arrivé avec un édit long comme un bras. Personne ne l'a lu, tout le monde doit obéir.",
			"Le seigneur a reçu l'ordre de venir à Versailles. Sa femme gère le domaine — mal.",
			'Le roi a interdit les duels. Les gentilshommes se battent quand même, mais la nuit et en secret.',
		],
		tags: ['absolutisme', 'édit', 'Louis_XIV', 'monarchie', 'Versailles'],
	},

	{
		id: 'tpl_scientific_discovery',
		name: 'Découverte scientifique',
		description:
			'Un savant local fait une découverte remarquable. Optique, mécanique, anatomie — la science avance à pas de géant.',
		category: 'cultural',
		scope: 'local',
		severity: 2,
		targetClasses: ['clergy', 'noble', 'merchant'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1600,
			maxYear: 1750,
			requiredActiveEvents: ['evt_galileo_trial'],
			requiredTechs: ['tech_scientific_method'],
			customCondition:
				'La révolution scientifique : Galilée, Kepler, Harvey, Newton. La méthode expérimentale transforme le savoir.',
		},
		defaultEffects: {
			stabilityModifier: 1,
			customEffect:
				'Les universités adoptent lentement les nouvelles méthodes. Le clergé est méfiant. Le savoir progresse.',
		},
		playerChoices: [
			{
				id: 'tpl_sd_sponsor',
				label: 'Financer les recherches',
				description:
					'Le savant a besoin de lentilles, de livres et de temps. Le mécénat paie.',
				effects: { wealthModifier: -1, reputationModifier: 2 },
			},
			{
				id: 'tpl_sd_study',
				label: 'Étudier les nouvelles théories',
				description:
					'La Terre tourne autour du Soleil. Le sang circule. Tout change.',
				effects: { reputationModifier: 1 },
			},
			{
				id: 'tpl_sd_condemn',
				label: 'Condamner ces hérésies scientifiques',
				description:
					'La Bible dit que le Soleil tourne. Qui êtes-vous pour contredire Dieu ?',
				effects: { religiousTensionModifier: 1 },
			},
		],
		flavorTexts: [
			"Le savant a pointé sa lunette vers Jupiter. Il y a vu quatre lunes. L'Église dit qu'il n'y en a pas.",
			"Le médecin a ouvert un cadavre devant ses étudiants. Galien se trompait. Le corps humain est différent de ce qu'on croyait.",
			"Isaac Newton dit que la même force qui fait tomber la pomme retient la Lune. C'est beau et terrifiant.",
		],
		tags: [
			'science',
			'découverte',
			'Galilée',
			'Newton',
			'révolution_scientifique',
		],
	},

	{
		id: 'tpl_east_india_venture',
		name: 'Investissement dans une Compagnie des Indes',
		description:
			'La Compagnie des Indes orientales vend des actions. Épices, soie, thé — les profits promis sont astronomiques.',
		category: 'economic',
		scope: 'regional',
		severity: 3,
		targetClasses: ['merchant', 'noble'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1600,
			maxYear: 1750,
			requiredActiveEvents: ['evt_east_india_companies'],
			requiredTechs: ['tech_joint_stock_company', 'tech_galleon'],
			customCondition:
				'VOC (1602), EIC (1600), Compagnies françaises. Les premières sociétés par actions modernes.',
		},
		defaultEffects: {
			wealthModifier: 2,
			customEffect:
				'Enrichissement des actionnaires. Naissance du capitalisme boursier. Mais les krachs sont possibles.',
		},
		playerChoices: [
			{
				id: 'tpl_eiv_buy',
				label: 'Acheter des actions',
				description:
					"Chaque action de la VOC a doublé depuis l'an dernier. Le train passe, montez dedans.",
				effects: { wealthModifier: 2 },
			},
			{
				id: 'tpl_eiv_sailor',
				label: "S'engager sur un navire de la Compagnie",
				description:
					'Deux ans de mer, le scorbut et les moussons. Mais la prime est belle.',
				effects: { wealthModifier: 1, healthModifier: -2 },
			},
			{
				id: 'tpl_eiv_abstain',
				label: 'Garder ses sous au coffre',
				description:
					"Ces papiers ne remplaceront jamais de l'or sonnant et trébuchant.",
				effects: {},
			},
		],
		flavorTexts: [
			"La Bourse d'Amsterdam est un théâtre. On y crie, on y pleure, on y fait fortune en une heure.",
			'Le poivre de Java rapporte 600 % à celui qui survit au voyage. Le problème, c\'est "survivre".',
			'La VOC est plus puissante que bien des royaumes. Elle a sa flotte, son armée, ses territoires.',
		],
		tags: ['Compagnie_des_Indes', 'VOC', 'actions', 'commerce', 'capitalisme'],
	},

	{
		id: 'tpl_revocation_effects',
		name: "Effets de la révocation de l'Édit de Nantes",
		description:
			'La révocation de 1685 interdit le protestantisme en France. Conversion forcée ou exil. 200 000 huguenots partent.',
		category: 'religious',
		scope: 'national',
		severity: 4,
		targetClasses: ['artisan', 'merchant', 'any'],
		recurring: false,
		cooldownYears: 0,
		baseProbability: 0.06,
		triggerConditions: {
			minYear: 1685,
			maxYear: 1720,
			requiredActiveEvents: ['evt_revocation_edict_nantes'],
			customCondition:
				"La France perd ses meilleurs artisans. Leurs compétences enrichissent la Prusse, la Hollande, l'Angleterre.",
		},
		defaultEffects: {
			populationModifier: -0.02,
			wealthModifier: -2,
			religiousTensionModifier: 2,
			customEffect:
				'Exode massif. Perte de savoir-faire irréparable. Résistance camisarde dans les Cévennes.',
		},
		playerChoices: [
			{
				id: 'tpl_re_convert',
				label: 'Abjurer et se convertir',
				description:
					'Devenir "nouveau catholique". Pratiquer en secret. Sauver ses biens.',
				effects: { reputationModifier: -1, stabilityModifier: 1 },
			},
			{
				id: 'tpl_re_exile',
				label: "Prendre le chemin de l'exil",
				description:
					'Tout abandonner pour la liberté de conscience. Berlin, Amsterdam, Londres.',
				effects: { wealthModifier: -2 },
			},
			{
				id: 'tpl_re_resist_cevennes',
				label: 'Résister dans les montagnes',
				description:
					'Les Camisards se battent dans les Cévennes. La foi par les armes.',
				effects: { reputationModifier: 2, healthModifier: -2 },
			},
		],
		flavorTexts: [
			"Les dragonnades : des soldats logés chez les protestants jusqu'à ce qu'ils abjurent. Méthode efficace et infâme.",
			'Le temple a été rasé. Les bibles sont confisquées. On prie désormais dans les grottes, la nuit.',
			'Cent mille artisans. Horlogers, tisserands, imprimeurs. La France vient de se tirer une balle dans le pied.',
		],
		tags: ['révocation', 'Nantes', 'huguenots', 'dragonnades', 'camisards'],
	},

	{
		id: 'tpl_tulip_mania',
		name: 'Spéculation financière',
		description:
			'Un objet ordinaire atteint des prix délirants. Tulipes, actions, billets — la bulle enfle puis éclate.',
		category: 'economic',
		scope: 'regional',
		severity: 3,
		targetClasses: ['merchant', 'artisan', 'noble'],
		recurring: true,
		cooldownYears: 20,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1630,
			maxYear: 1750,
			minWealth: 5,
			customCondition:
				'Tulipomanie (1637), Mississippi (1720), South Sea (1720). Les bulles spéculatives se multiplient.',
		},
		defaultEffects: {
			wealthModifier: -2,
			stabilityModifier: -1,
			customEffect:
				'Enrichissement fulgurant puis ruine. Des fortunes détruites en un jour. Méfiance envers la finance.',
		},
		playerChoices: [
			{
				id: 'tpl_tm_buy',
				label: 'Investir dans la bulle',
				description:
					'Tout le monde gagne. Et si ça continuait ? FOMO médiéval.',
				effects: { wealthModifier: -2 },
			},
			{
				id: 'tpl_tm_sell',
				label: 'Vendre au sommet',
				description:
					'Le malin vend quand les autres achètent. Encore faut-il être malin.',
				effects: { wealthModifier: 2 },
			},
			{
				id: 'tpl_tm_watch',
				label: 'Regarder de loin',
				description:
					'Ces prix sont dingues. Une tulipe ne vaut pas une maison. Si ?',
				effects: {},
			},
		],
		flavorTexts: [
			"Un bulbe de tulipe Semper Augustus a été vendu pour le prix d'une maison au bord du canal. C'est une fleur.",
			"Hier millionnaire, aujourd'hui ruiné. Le cours a chuté en une matinée. Les larmes coulent sur les registres.",
			"Le barbier a vendu ses ciseaux pour acheter des tulipes. Maintenant il n'a ni ciseaux ni tulipes.",
		],
		tags: ['spéculation', 'tulipes', 'bulle', 'krach', 'finance'],
	},

	{
		id: 'tpl_piracy_golden_age',
		name: "Âge d'or de la piraterie",
		description:
			"Les pirates sillonnent les Caraïbes et l'océan Indien. Ils attaquent les galions, les comptoirs, les villes côtières.",
		category: 'military',
		scope: 'regional',
		severity: 3,
		targetClasses: ['merchant', 'peasant'],
		recurring: true,
		cooldownYears: 8,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1650,
			maxYear: 1730,
			nearCoast: true,
			customCondition:
				"L'âge d'or de la piraterie en Atlantique et dans l'océan Indien. Corsaires, boucaniers, forbans.",
		},
		defaultEffects: {
			wealthModifier: -1,
			stabilityModifier: -1,
			customEffect:
				"Insécurité maritime. Les primes d'assurance montent. Certains gouverneurs pactisent avec les pirates.",
		},
		playerChoices: [
			{
				id: 'tpl_pga_privateer',
				label: 'Acheter une lettre de marque',
				description:
					'Devenir corsaire — piller légalement les navires ennemis. Presque respectable.',
				effects: { wealthModifier: 2, reputationModifier: -1 },
			},
			{
				id: 'tpl_pga_convoy',
				label: 'Naviguer en convoi',
				description: 'Voyager groupé coûte du temps mais protège des attaques.',
				effects: { wealthModifier: -1 },
			},
			{
				id: 'tpl_pga_coastal_guard',
				label: 'Financer la garde côtière',
				description:
					'Les navires de patrouille coûtent cher mais sécurisent le port.',
				effects: { wealthModifier: -1, stabilityModifier: 1 },
			},
		],
		flavorTexts: [
			'Le Jolly Roger flotte au vent. Le capitaine offre le quart du butin à chaque homme. Démocratie du pavillon noir.',
			'Le gouverneur de Port Royal ferme les yeux tant que les pirates dépensent leur or dans ses tavernes.',
			'Un galion espagnol a été pris. Les pirates ont partagé 50 000 pièces de huit en une nuit de beuverie.',
		],
		tags: ['piraterie', 'corsaires', 'Caraïbes', 'océan', 'butin'],
	},

	{
		id: 'tpl_little_ice_age',
		name: 'Crise du Petit Âge Glaciaire',
		description:
			'Le climat se refroidit. Les récoltes diminuent, les rivières gèlent, les hivers sont terribles. La famine guette.',
		category: 'health',
		scope: 'regional',
		severity: 4,
		targetClasses: ['peasant', 'any'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1550,
			maxYear: 1700,
			customCondition:
				'Le Petit Âge Glaciaire atteint son minimum au XVIIe siècle. Gel des canaux, baisse des rendements, famines.',
		},
		defaultEffects: {
			populationModifier: -0.02,
			wealthModifier: -1,
			healthModifier: -1,
			customEffect:
				'Gel des cultures, famines locales. La Tamise gèle. Les glaciers avancent dans les vallées alpines.',
		},
		playerChoices: [
			{
				id: 'tpl_lia_store',
				label: "Stocker des provisions pour l'hiver",
				description: 'Doubler les réserves. Mieux vaut trop que pas assez.',
				effects: { wealthModifier: -1, healthModifier: 1 },
			},
			{
				id: 'tpl_lia_adapt',
				label: 'Planter des cultures résistantes au froid',
				description:
					"Le seigle tient mieux que le blé. L'avoine pousse même dans la boue.",
				effects: { wealthModifier: 1 },
			},
			{
				id: 'tpl_lia_migrate',
				label: 'Partir vers le Sud',
				description:
					'Les hivers sont plus cléments au sud. Mais on y est un étranger.',
				effects: { healthModifier: 1, wealthModifier: -1 },
			},
		],
		flavorTexts: [
			"La Tamise est gelée si fort qu'on y fait marché. Une foire sur la glace, dans le brouillard.",
			"Le glacier a avancé jusqu'au village. La ferme du vieux Hans est sous la glace. Il ne reviendra pas.",
			'Trois ans de gel tardif. Le blé ne mûrit plus. Les greniers sont vides dès février.',
		],
		tags: ['petit_âge_glaciaire', 'froid', 'famine', 'climat', 'gel'],
	},

	{
		id: 'tpl_witch_trial_mass',
		name: 'Procès de sorcellerie en masse',
		description:
			'La chasse aux sorcières atteint son paroxysme. Des dizaines de personnes sont arrêtées, torturées et brûlées en quelques mois.',
		category: 'religious',
		scope: 'regional',
		severity: 5,
		targetClasses: ['any'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1580,
			maxYear: 1680,
			requiredTemplateIds: ['tpl_witch_panic'],
			minReligiousTension: 4,
			customCondition:
				"Pic de la chasse aux sorcières (1580-1650). Bamberg, Würzburg, Trier — des centaines d'exécutions par ville.",
		},
		defaultEffects: {
			stabilityModifier: -3,
			populationModifier: -0.01,
			religiousTensionModifier: 2,
			customEffect:
				'Psychose collective. Toute dénonciation suffit. Les prisons débordent. La torture garantit les aveux.',
		},
		playerChoices: [
			{
				id: 'tpl_wtm_denounce',
				label: 'Dénoncer pour se protéger',
				description:
					"Mieux vaut accuser que d'être accusé. Logique de terreur.",
				effects: { reputationModifier: -2, stabilityModifier: -1 },
			},
			{
				id: 'tpl_wtm_speak',
				label: 'Oser dire que la chasse va trop loin',
				description:
					"Quelques voix courageuses s'élèvent. Friedrich Spee écrit la Cautio Criminalis. Le risque est réel.",
				effects: { reputationModifier: 2, healthModifier: -1 },
			},
			{
				id: 'tpl_wtm_flee',
				label: 'Quitter la région',
				description:
					"Partir avant d'être la prochaine cible. Les bûchers fument encore.",
				effects: { wealthModifier: -1 },
			},
		],
		flavorTexts: [
			'Trois cents bûchers en un an dans le seul évêché de Bamberg. Le prince-évêque est insatiable.',
			'La veuve a avoué sous la torture avoir volé sur un balai. Elle a aussi nommé douze complices. Douze nouveaux procès.',
			"Le jésuite Spee ne dort plus. Tous ceux qu'il a confessés avant le bûcher étaient innocents. Il le sait. Il l'écrira.",
		],
		tags: ['sorcellerie', 'bûcher', 'procès', 'terreur', 'torture'],
	},

	{
		id: 'tpl_mercantilism',
		name: 'Politique mercantiliste',
		description:
			'Le roi impose une politique de manufactures, de tarifs douaniers et de monopoles. Produire en interne, exporter au maximum.',
		category: 'economic',
		scope: 'national',
		severity: 2,
		targetClasses: ['merchant', 'artisan'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1650,
			maxYear: 1770,
			requiredActiveEvents: ['evt_louis_xiv'],
			customCondition:
				"Colbert en France, Cromwell en Angleterre. L'État dirige l'économie pour enrichir le trésor royal.",
		},
		defaultEffects: {
			wealthModifier: 1,
			customEffect:
				"Les manufactures royales produisent des gobelins, des porcelaines, des draps. L'importation est taxée.",
		},
		playerChoices: [
			{
				id: 'tpl_merc_manufacture',
				label: 'Travailler dans une manufacture royale',
				description:
					'Un emploi stable avec un salaire fixe. Mais les horaires sont stricts.',
				effects: { wealthModifier: 1 },
			},
			{
				id: 'tpl_merc_smuggle',
				label: 'Faire de la contrebande',
				description:
					'Les tarifs douaniers créent des opportunités pour les contrebandiers.',
				effects: { wealthModifier: 2, reputationModifier: -1 },
			},
			{
				id: 'tpl_merc_export',
				label: 'Exporter ses produits',
				description:
					"L'État subventionne les exportations. Le marché est le monde entier.",
				effects: { wealthModifier: 1 },
				requiredSocialClass: 'merchant',
			},
		],
		flavorTexts: [
			'La manufacture des Gobelins emploie trois cents ouvriers. Le roi veut que tout le luxe soit français.',
			'Le tarif douanier a doublé sur les draps anglais. Le contrebandier de Calais sourit.',
			"Colbert dit que la richesse d'un pays se mesure à son or. Alors il faut exporter, exporter, exporter.",
		],
		tags: ['mercantilisme', 'Colbert', 'manufacture', 'douane', 'économie'],
	},

	{
		id: 'tpl_coffee_house',
		name: "Ouverture d'un café",
		description:
			"Le café, boisson exotique venue d'Orient, se boit dans de nouveaux établissements. On y discute, on y conspire, on y pense.",
		category: 'cultural',
		scope: 'local',
		severity: 1,
		targetClasses: ['merchant', 'artisan', 'clergy', 'noble'],
		recurring: true,
		cooldownYears: 10,
		baseProbability: 0.05,
		triggerConditions: {
			minYear: 1650,
			maxYear: 1750,
			minPopulation: 5000,
			customCondition:
				"Les cafés se multiplient à Londres, Paris, Vienne, Amsterdam. Lieux de sociabilité, d'échange et de spéculation.",
		},
		defaultEffects: {
			stabilityModifier: 1,
			customEffect:
				'Les cafés deviennent des salons où naissent les idées, les affaires et parfois les révolutions.',
		},
		playerChoices: [
			{
				id: 'tpl_ch_open',
				label: 'Ouvrir un café',
				description: 'Le café est à la mode. Bonne affaire, clientèle fidèle.',
				effects: { wealthModifier: 2 },
			},
			{
				id: 'tpl_ch_debate',
				label: 'Fréquenter le café pour les débats',
				description:
					'On y parle politique, science, commerce. Le journal est sur la table.',
				effects: { reputationModifier: 1 },
			},
			{
				id: 'tpl_ch_condemn',
				label: 'Condamner cette boisson du diable',
				description:
					'Le café excite les esprits et ruine le commerce des taverniers. Méfiance.',
				effects: { reputationModifier: -1 },
			},
		],
		flavorTexts: [
			"Le café est amer, noir comme l'encre. Mais après deux tasses, l'esprit vole. Adieu, l'ivresse du vin.",
			'Au café Procope, on croise des philosophes, des poètes et des espions. Tout se sait entre deux tasses.',
			"Lloyd's Coffee House à Londres. On y assure les navires entre deux gorgées. La finance naît dans le marc de café.",
		],
		tags: ['café', 'sociabilité', 'débat', 'commerce', 'mode'],
	},

	{
		id: 'tpl_newspaper_birth',
		name: "Apparition d'un journal imprimé",
		description:
			"Un imprimeur publie un journal périodique. Nouvelles locales, internationales, annonces. L'information se démocratise.",
		category: 'cultural',
		scope: 'local',
		severity: 2,
		targetClasses: ['merchant', 'noble', 'clergy'],
		recurring: false,
		cooldownYears: 0,
		baseProbability: 0.03,
		triggerConditions: {
			minYear: 1600,
			maxYear: 1700,
			minPopulation: 5000,
			requiredTemplateIds: ['tpl_printing_press_arrival'],
			customCondition:
				'Les premiers journaux apparaissent en Allemagne (1605), en France (La Gazette, 1631). La presse est née.',
		},
		defaultEffects: {
			customEffect:
				"L'information circule plus vite. L'opinion publique naît. Le pouvoir devra compter avec elle.",
		},
		playerChoices: [
			{
				id: 'tpl_nb_subscribe',
				label: "S'abonner au journal",
				description:
					'Savoir ce qui se passe dans le monde sans quitter la ville. Révolutionnaire.',
				effects: { reputationModifier: 1 },
			},
			{
				id: 'tpl_nb_publish',
				label: 'Faire publier une annonce',
				description:
					'Le journal touche des centaines de lecteurs. Parfait pour vendre ou recruter.',
				effects: { wealthModifier: 1 },
			},
			{
				id: 'tpl_nb_censor',
				label: 'Soutenir la censure royale',
				description:
					"La presse libre est dangereuse. Le roi doit contrôler ce qui s'imprime.",
				effects: { stabilityModifier: 1, reputationModifier: -1 },
			},
		],
		flavorTexts: [
			'La Gazette de France arrive tous les mardis. On y apprend la guerre, la paix et le prix du blé.',
			"Quatre feuilles imprimées recto-verso. Mais quel trésor d'informations. Le monde entre dans le salon.",
			'Le roi a fait saisir la dernière édition. Le journaliste est en prison. La vérité dérange.',
		],
		tags: ['journal', 'presse', 'information', 'gazette', 'opinion'],
	},

	{
		id: 'tpl_plantation_sugar',
		name: 'Essor du sucre colonial',
		description:
			'Le sucre des plantations antillaises inonde le marché. Ce luxe devient un produit de base. Derrière, le travail des esclaves.',
		category: 'economic',
		scope: 'regional',
		severity: 3,
		targetClasses: ['merchant', 'noble'],
		recurring: true,
		cooldownYears: 15,
		baseProbability: 0.04,
		triggerConditions: {
			minYear: 1640,
			maxYear: 1780,
			requiredActiveEvents: ['evt_atlantic_slave_trade'],
			nearCoast: true,
			customCondition:
				'La "révolution sucrière" des Antilles. Barbade, Saint-Domingue, Jamaïque. Le sucre est le pétrole du XVIIe.',
		},
		defaultEffects: {
			wealthModifier: 2,
			customEffect:
				"Enrichissement des ports négriers. Le sucre entre dans l'alimentation quotidienne. Le coût humain est immense.",
		},
		playerChoices: [
			{
				id: 'tpl_ps_invest',
				label: 'Investir dans une plantation',
				description:
					'Le sucre rapporte 20 % par an. Le prix ? Des vies humaines.',
				effects: { wealthModifier: 3, reputationModifier: -2 },
			},
			{
				id: 'tpl_ps_refine',
				label: 'Ouvrir une raffinerie de sucre',
				description:
					'Raffiner le sucre brut venu des colonies. Moins sale moralement, presque aussi rentable.',
				effects: { wealthModifier: 2 },
			},
			{
				id: 'tpl_ps_boycott',
				label: 'Refuser le sucre esclavagiste',
				description:
					"Quelques voix s'élèvent déjà. Le sucre est taché de sang. Rare courage.",
				effects: { reputationModifier: 2, wealthModifier: -1 },
			},
		],
		flavorTexts: [
			'Le sucre coule à flots dans les entrepôts de Nantes. Le port sent le caramel et la culpabilité.',
			'Une livre de sucre de Saint-Domingue. Combien de coups de fouet par cuillère ?',
			"La duchesse sucre son café. Le marin sucre son rhum. L'esclave coupe la canne sous le soleil.",
		],
		tags: ['sucre', 'plantation', 'esclavage', 'colonies', 'Antilles'],
	},
]
