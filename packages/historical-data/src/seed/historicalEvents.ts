import type { HistoricalEvent } from '../../../shared/src/types/world'

// ============================================================================
// Événements historiques — An 1000 → ~2025
// ============================================================================
// Milestones connus du MJ, avec conditions de déclenchement et chaînage.
// Le MJ peut forcer, modifier ou annuler tout événement si les joueurs
// altèrent le cours de l'histoire.
//
// Conventions :
//   year        = année cible historique
//   yearRange   = fenêtre flexible [min, max]
//   status      = 'pending' pour tous au départ (runtime les fera évoluer)
// ============================================================================

export const historicalEvents: HistoricalEvent[] = [
	// ========================================================================
	// 1000-1050 — Siècle de transition
	// ========================================================================

	{
		id: 'evt_christianization_scandinavia',
		name: 'Christianisation de la Scandinavie',
		description:
			"Les rois scandinaves achèvent la conversion officielle au christianisme, transformant les sociétés nordiques et intégrant la Scandinavie dans la chrétienté européenne. L'Islande s'est convertie en 1000, la Norvège et la Suède suivent.",
		type: 'cultural_shift',
		category: 'religious',
		year: 1000,
		yearRange: [995, 1030],
		affectedNationIds: ['nat_norway', 'nat_sweden', 'nat_denmark'],
		affectedRegionIds: ['clim_subarctic'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Les rois scandinaves doivent être favorables au christianisme ou subir une pression diplomatique suffisante des royaumes chrétiens voisins.',
		},
		effects: {
			religiousTensionModifier: 3,
			stabilityModifier: -1,
			prestigeModifier: 2,
			customEffect:
				"Remplacement progressif des cultes nordiques. Accès aux réseaux diplomatiques chrétiens. Tensions internes avec les tenants de l'ancien culte.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_christ_scand_accept',
				label: 'Accepter la conversion',
				description:
					'Le roi impose le baptême. Intégration rapide dans la chrétienté mais révoltes païennes.',
				effects: {
					stabilityModifier: -2,
					prestigeModifier: 3,
					religiousTensionModifier: 4,
				},
			},
			{
				id: 'evt_christ_scand_resist',
				label: 'Résister au christianisme',
				description:
					'Maintien des cultes nordiques. Isolation diplomatique mais stabilité interne préservée.',
				effects: {
					stabilityModifier: 1,
					prestigeModifier: -2,
					religiousTensionModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les joueurs scandinaves résistent, le christianisme peut arriver par le commerce et les mariages plutôt que par décret royal.',
		},
		historical_outcome:
			'Olaf II de Norvège et Olof Skötkonung de Suède imposent le christianisme. Les derniers temples païens sont détruits vers 1050, mais les pratiques syncrétiques persistent dans les campagnes pendant des décennies.',
		status: 'pending',
	},

	{
		id: 'evt_mahmud_somnath',
		name: 'Raids de Mahmud de Ghazni en Inde',
		description:
			"Mahmud de Ghazni lance une série de raids dévastateurs en Inde du Nord, culminant avec le pillage du temple de Somnath (1025). Ces raids enrichissent l'empire ghaznavide et affaiblissent les royaumes indiens du Nord.",
		type: 'milestone',
		category: 'military',
		year: 1025,
		yearRange: [1001, 1030],
		affectedNationIds: ['nat_ghaznavid', 'nat_pala', 'nat_chalukya'],
		affectedRegionIds: ['clim_south_asia', 'clim_south_asia'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_ghaznavid'],
			requiredLeadersAlive: ['Mahmud de Ghazni'],
			customCondition:
				"L'empire ghaznavide doit avoir une force militaire suffisante (militaryStrength ≥ 7) et un accès à la route de la soie pour financer les campagnes.",
		},
		effects: {
			economicModifier: 3,
			militaryModifier: 1,
			prestigeModifier: 3,
			religiousTensionModifier: 4,
			customEffect:
				'Pillage massif des temples hindous. Transfert de richesse vers Ghazni. Destruction de centres académiques bouddhistes. Traumatisme durable dans le sous-continent.',
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_mahmud_raid',
				label: 'Lancer les raids',
				description:
					'Campagnes militaires massives en Inde. Immense butin mais résistance croissante.',
				effects: {
					economicModifier: 4,
					militaryModifier: -1,
					prestigeModifier: 3,
				},
			},
			{
				id: 'evt_mahmud_diplomacy',
				label: 'Privilégier le commerce',
				description:
					"Développer les échanges commerciaux avec l'Inde plutôt que le pillage.",
				effects: {
					economicModifier: 2,
					stabilityModifier: 1,
					prestigeModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si Mahmud meurt prématurément, son fils Masud peut continuer les raids mais avec moins de succès.',
		},
		historical_outcome:
			'Mahmud lance 17 raids entre 1001 et 1027. Le temple de Somnath est pillé en 1025, rapportant un butin légendaire. Ghazni devient une des villes les plus riches du monde islamique.',
		status: 'pending',
	},

	{
		id: 'evt_canute_north_sea_empire',
		name: 'Empire de la mer du Nord de Knut le Grand',
		description:
			"Knut le Grand unifie l'Angleterre, le Danemark et la Norvège en un empire maritime couvrant la mer du Nord. Apogée de la puissance scandinave en Europe.",
		type: 'milestone',
		category: 'political',
		year: 1016,
		yearRange: [1013, 1020],
		affectedNationIds: ['nat_england', 'nat_denmark', 'nat_norway'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_subarctic'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_christianization_scandinavia'],
			requiredNationsExist: ['nat_denmark', 'nat_england'],
			customCondition:
				"Le Danemark doit avoir une force navale suffisante et l'Angleterre doit être en crise de succession (mort d'Æthelred II).",
		},
		effects: {
			stabilityModifier: -1,
			prestigeModifier: 3,
			militaryModifier: 2,
			newDiplomacy: {
				type: 'vassalage',
				between: ['nat_denmark', 'nat_england'],
				strength: 8,
			},
			triggerEventIds: ['evt_canute_empire_collapse'],
			customEffect:
				'Union personnelle des trois couronnes. Renforcement du commerce en mer du Nord. Influence nordique sur la politique anglaise.',
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le Danemark n'envahit pas, l'Angleterre reste sous les Wessex et l'histoire anglo-saxonne continue sans interruption scandinave.",
		},
		historical_outcome:
			"Knut conquiert l'Angleterre en 1016, hérite du Danemark en 1018 et soumet la Norvège en 1028. L'empire s'effondre à sa mort en 1035.",
		status: 'pending',
	},

	{
		id: 'evt_canute_empire_collapse',
		name: "Effondrement de l'Empire de Knut",
		description:
			"À la mort de Knut le Grand, ses fils incompétents se disputent l'héritage. L'empire se disloque rapidement : l'Angleterre, le Danemark et la Norvège redeviennent indépendants.",
		type: 'political',
		category: 'political',
		year: 1035,
		yearRange: [1035, 1042],
		affectedNationIds: ['nat_england', 'nat_denmark', 'nat_norway'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_subarctic'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_canute_north_sea_empire'],
			customCondition:
				"L'empire de Knut doit avoir été formé. Déclenché par la mort du souverain unificateur.",
		},
		effects: {
			stabilityModifier: -3,
			prestigeModifier: -2,
			triggerEventIds: ['evt_norman_conquest'],
			customEffect:
				"Guerres de succession. Harold Harefoot puis Hardeknut se disputent l'Angleterre. Restauration d'Édouard le Confesseur en 1042.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: false,
			suggestedAlternative:
				"Si un joueur a renforcé l'empire, il peut survivre plus longtemps mais les tensions centrifuges restent.",
		},
		historical_outcome:
			"Harold Harefoot prend l'Angleterre (1035), Hardeknut le Danemark, Magnus de Norvège reprend son trône. Édouard le Confesseur restaure la dynastie de Wessex en 1042.",
		status: 'pending',
	},

	{
		id: 'evt_song_printing_revolution',
		name: "Révolution de l'imprimerie Song",
		description:
			"Bi Sheng invente l'imprimerie à caractères mobiles en argile. Combinée à l'impression xylographique déjà répandue, cette innovation accélère la diffusion des connaissances dans l'empire Song.",
		type: 'milestone',
		category: 'scientific',
		year: 1040,
		yearRange: [1035, 1050],
		affectedNationIds: ['nat_song'],
		affectedRegionIds: ['clim_east_asia', 'clim_east_asia_steppe'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_song'],
			requiredTechs: ['tech_block_printing'],
			customCondition:
				"L'empire Song doit avoir un haut niveau d'éducation et de production manufacturière.",
		},
		effects: {
			prestigeModifier: 2,
			techUnlocks: ['tech_movable_type'],
			customEffect:
				"Explosion de la production littéraire. Diffusion accélérée des textes confucéens, bouddhistes et techniques. L'éducation devient plus accessible.",
		},
		severity: 6,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les Song sont affaiblis, l'innovation peut émerger chez les Liao ou Goryeo à la place.",
		},
		historical_outcome:
			"Bi Sheng développe les caractères mobiles vers 1040. L'impact reste limité en Chine (trop de caractères) mais le concept se diffusera lentement vers l'ouest.",
		status: 'pending',
	},

	{
		id: 'evt_schism_1054',
		name: 'Grand Schisme de 1054',
		description:
			"Rupture définitive entre l'Église catholique romaine et l'Église orthodoxe de Constantinople. Le légat papal Humbert de Moyenmoutier et le patriarche Michel Cérulaire s'excommunient mutuellement.",
		type: 'milestone',
		category: 'religious',
		year: 1054,
		yearRange: [1050, 1060],
		affectedNationIds: [
			'nat_papal',
			'nat_byzantine',
			'nat_hre',
			'nat_kievan_rus',
			'nat_france',
			'nat_england',
			'nat_hungary',
			'nat_poland',
		],
		affectedRegionIds: [
			'clim_mediterranean',
			'clim_temperate_europe',
			'clim_continental_east_europe',
		],
		globalEvent: true,
		triggerConditions: {
			requiredNationsExist: ['nat_papal', 'nat_byzantine'],
			minReligiousTension: 5,
			customCondition:
				"Le pape et le patriarche de Constantinople doivent être en désaccord théologique actif. L'autorité papale sur l'Italie du Sud est contestée.",
		},
		effects: {
			religiousTensionModifier: 5,
			stabilityModifier: -1,
			triggerEventIds: ['evt_first_crusade'],
			nationMutations: [
				{
					nationId: 'nat_papal',
					changeStateReligion: 'rel_catholic',
					removeReligion: 'rel_orthodox',
				},
				{
					nationId: 'nat_byzantine',
					changeStateReligion: 'rel_orthodox',
					removeReligion: 'rel_catholic',
				},
			],
			customEffect:
				"Division permanente de la chrétienté. L'Europe occidentale sous Rome, l'Europe orientale sous Constantinople. Impact sur toute diplomatie future entre royaumes catholiques et orthodoxes.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_schism_support_rome',
				label: 'Soutenir Rome',
				description:
					"S'aligner avec le pape. Accès aux réseaux diplomatiques occidentaux mais rupture avec Constantinople.",
				effects: {
					prestigeModifier: 1,
					religiousTensionModifier: 2,
				},
			},
			{
				id: 'evt_schism_support_constantinople',
				label: 'Soutenir Constantinople',
				description:
					"S'aligner avec le patriarche. Maintien des liens avec l'Orient mais isolement en Occident.",
				effects: {
					prestigeModifier: 1,
					religiousTensionModifier: 2,
				},
			},
			{
				id: 'evt_schism_mediate',
				label: 'Tenter la médiation',
				description:
					'Essayer de réconcilier les deux Églises. Très difficile mais prestigieux si réussi.',
				effects: {
					prestigeModifier: 3,
					stabilityModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les joueurs parviennent à réconcilier les Églises, le schisme est évité mais les tensions théologiques persistent. Conséquence majeure : pas de croisades sous cette forme.',
			fallbackEventId: 'evt_partial_reconciliation',
		},
		historical_outcome:
			'Le 16 juillet 1054, les légats pontificaux excommunient Michel Cérulaire, qui répond par une excommunication réciproque. La rupture est consommée, bien que les populations la ressentent graduellement.',
		status: 'pending',
	},

	{
		id: 'evt_partial_reconciliation',
		name: 'Réconciliation partielle des Églises',
		description:
			'Grâce à des efforts diplomatiques et théologiques exceptionnels, les Églises de Rome et Constantinople parviennent à un compromis fragile. Le schisme est évité, mais les tensions doctrinales persistent sous la surface.',
		type: 'political',
		category: 'religious',
		year: 1055,
		yearRange: [1054, 1065],
		affectedNationIds: [
			'nat_papal',
			'nat_byzantine',
			'nat_hre',
			'nat_kievan_rus',
		],
		affectedRegionIds: [
			'clim_mediterranean',
			'clim_temperate_europe',
			'clim_continental_east_europe',
		],
		globalEvent: true,
		triggerConditions: {
			customCondition:
				"Événement alternatif — ne peut être déclenché que si le schisme de 1054 est annulé par le MJ ou par l'action des joueurs. Requiert une médiation réussie entre le pape et le patriarche.",
		},
		effects: {
			religiousTensionModifier: -2,
			stabilityModifier: 1,
			customEffect:
				"L'unité chrétienne est préservée de façon précaire. Les Croisades ne prennent pas la même forme — possible coopération militaire gréco-latine directe. Les tensions sur le Filioque et les rites liturgiques persistent. La papauté et le patriarcat restent en rivalité d'influence.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Scénario uchronique. La réconciliation est fragile et peut se briser à tout moment lors d'une crise politique ou théologique ultérieure.",
		},
		historical_outcome:
			"Cet événement ne s'est jamais produit historiquement. Le schisme de 1054 a été définitif (levée des excommunications mutuelles seulement en 1965, par Paul VI et Athénagoras Ier).",
		status: 'pending',
	},

	// ========================================================================
	// 1060-1100 — Les grandes conquêtes
	// ========================================================================

	{
		id: 'evt_norman_conquest',
		name: "Conquête normande de l'Angleterre",
		description:
			"Guillaume le Conquérant, duc de Normandie, envahit l'Angleterre et défait Harold Godwinson à la bataille de Hastings. La noblesse anglo-saxonne est remplacée par une élite normande francophone.",
		type: 'milestone',
		category: 'military',
		year: 1066,
		yearRange: [1064, 1070],
		affectedNationIds: ['nat_england', 'nat_france'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_canute_empire_collapse'],
			requiredNationsExist: ['nat_england', 'nat_france'],
			customCondition:
				"Crise de succession en Angleterre (mort d'Édouard le Confesseur sans héritier clair). Un prétendant normand doit exister avec une force navale suffisante.",
		},
		effects: {
			stabilityModifier: -4,
			prestigeModifier: -2,
			militaryModifier: 2,
			nationMutations: [
				{
					nationId: 'nat_england',
					changeRuler: {
						name: 'Guillaume le Conquérant',
						dynastyName: 'Normandie',
						birthYear: 1028,
						age: 38,
						traits: ['conqueror', 'ruthless', 'administrator', 'ambitious'],
					},
					addLanguage: { languageId: 'lang_old_french', percentage: 0.15 },
					changeGovernance: 'feudal_monarchy',
				},
			],
			customEffect:
				"Remplacement total de l'aristocratie anglo-saxonne. Introduction du français normand. Construction de châteaux (Tower of London, etc.). Le Domesday Book recense tout le royaume.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_norman_invade',
				label: 'Envahir (joueur normand)',
				description:
					"Traverser la Manche avec une armée. Risqué mais potentiel gain d'un royaume entier.",
				effects: {
					militaryModifier: -2,
					prestigeModifier: 5,
				},
			},
			{
				id: 'evt_norman_defend',
				label: 'Défendre (joueur anglais)',
				description:
					'Mobiliser le fyrd et marcher vers le sud pour repousser les envahisseurs.',
				effects: {
					militaryModifier: -1,
					stabilityModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Harold survit ou si les Normands n'envahissent pas, l'Angleterre reste anglo-saxonne. Conséquence : pas de lien féodal avec la France, histoire très différente.",
		},
		historical_outcome:
			'Guillaume débarque à Pevensey le 28 septembre 1066. Harold, revenant de sa victoire contre les Norvégiens à Stamford Bridge, est tué à Hastings le 14 octobre. Guillaume est couronné roi à Noël.',
		status: 'pending',
	},

	{
		id: 'evt_investiture_controversy',
		name: 'Querelle des Investitures',
		description:
			"Conflit majeur entre la papauté et le Saint-Empire romain germanique sur le droit de nommer les évêques. Le pape Grégoire VII et l'empereur Henri IV s'affrontent, aboutissant à l'humiliation de Canossa.",
		type: 'crisis',
		category: 'religious',
		year: 1076,
		yearRange: [1075, 1122],
		affectedNationIds: ['nat_hre', 'nat_papal'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_hre', 'nat_papal'],
			minReligiousTension: 4,
			customCondition:
				"Le pape doit affirmer la suprématie pontificale (Dictatus papae). L'empereur doit résister à la perte de son pouvoir de nomination.",
		},
		effects: {
			stabilityModifier: -3,
			religiousTensionModifier: 4,
			prestigeModifier: -2,
			customEffect:
				"L'empereur excommunié doit se soumettre au pape à Canossa (1077). Guerre civile dans le HRE. Les princes allemands gagnent en autonomie. Concordat de Worms (1122) comme compromis final.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_invest_submit',
				label: 'Se soumettre au pape (empereur)',
				description:
					"Accepter l'autorité pontificale sur les investitures. Perte de pouvoir mais fin de l'excommunication.",
				effects: {
					stabilityModifier: 1,
					prestigeModifier: -3,
				},
			},
			{
				id: 'evt_invest_resist',
				label: 'Résister au pape (empereur)',
				description:
					'Nommer un antipape et contester Rome. Risque de guerre civile mais maintien du pouvoir impérial.',
				effects: {
					stabilityModifier: -4,
					prestigeModifier: 1,
					religiousTensionModifier: 3,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si le joueur HRE est conciliant dès le départ, le conflit peut être évité. La papauté gagne quand même en influence mais sans rupture violente.',
		},
		historical_outcome:
			"Henri IV est excommunié en 1076, fait pénitence à Canossa en 1077, mais relance le conflit ensuite. Le concordat de Worms (1122) établit un compromis : l'Église nomme spirituellement, l'empereur investit temporellement.",
		status: 'pending',
	},

	{
		id: 'evt_battle_manzikert',
		name: 'Bataille de Manzikert',
		description:
			"L'empereur byzantin Romain IV Diogène est défait et capturé par le sultan seldjoukide Alp Arslan à Manzikert. Cette défaite ouvre l'Anatolie aux Turcs et marque le début du déclin territorial byzantin.",
		type: 'milestone',
		category: 'military',
		year: 1071,
		yearRange: [1068, 1075],
		affectedNationIds: ['nat_byzantine'],
		affectedRegionIds: ['clim_mediterranean', 'clim_arid_mideast'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_byzantine'],
			customCondition:
				"Les Seldjoukides doivent avoir conquis la Perse et menacer l'Anatolie orientale. L'armée byzantine doit être engagée dans une campagne orientale.",
		},
		effects: {
			stabilityModifier: -4,
			militaryModifier: -3,
			prestigeModifier: -3,
			populationModifier: -0.05,
			triggerEventIds: ['evt_first_crusade'],
			customEffect:
				"Perte progressive de l'Anatolie. L'empire byzantin perd sa principale source de recrues et de revenus. Appel à l'aide à l'Occident qui mènera aux Croisades.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_manzikert_fight',
				label: 'Engager la bataille',
				description:
					'Affronter les Seldjoukides en rase campagne. Risque très élevé.',
				effects: {
					militaryModifier: -4,
					prestigeModifier: -2,
				},
			},
			{
				id: 'evt_manzikert_retreat',
				label: 'Se replier et négocier',
				description:
					'Éviter la confrontation directe. Abandon de territoires mais préservation de forces.',
				effects: {
					militaryModifier: -1,
					prestigeModifier: -1,
					stabilityModifier: -2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le joueur byzantin a renforcé ses frontières orientales, la bataille peut être évitée ou gagnée. Conséquence : pas de perte de l'Anatolie, pas d'appel aux croisades.",
			fallbackEventId: 'evt_first_crusade',
		},
		historical_outcome:
			"Romain IV est capturé à Manzikert le 26 août 1071. Le traité est honorable mais son renversement à Constantinople déclenche une guerre civile. Les Seldjoukides s'installent en Anatolie sans résistance organisée.",
		status: 'pending',
	},

	{
		id: 'evt_almoravid_conquest',
		name: 'Conquête almoravide du Ghana et de la péninsule ibérique',
		description:
			"Les Almoravides, mouvement religieux berbère, conquièrent l'empire du Ghana et traversent le détroit de Gibraltar pour unifier al-Andalus. Transformation majeure de l'Afrique de l'Ouest et de l'Ibérie musulmane.",
		type: 'milestone',
		category: 'military',
		year: 1076,
		yearRange: [1054, 1110],
		affectedNationIds: ['nat_ghana', 'nat_cordoba'],
		affectedRegionIds: ['clim_sahel', 'clim_saharan', 'clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"Un mouvement religieux réformateur doit émerger au Maghreb/Sahara. Les royaumes taifas d'al-Andalus doivent être fragmentés et menacés par la Reconquista.",
		},
		effects: {
			stabilityModifier: -3,
			religiousTensionModifier: 3,
			militaryModifier: 2,
			customEffect:
				"L'empire du Ghana perd le contrôle du commerce de l'or. Al-Andalus est réunifié sous une dynastie berbère stricte. La Reconquista est temporairement stoppée.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'empire du Ghana a renforcé ses défenses, les Almoravides peuvent être repoussés. Conséquence : le Ghana survit et le commerce transsaharien reste sous contrôle soninké.",
		},
		historical_outcome:
			"Les Almoravides prennent Koumbi Saleh (~1076), puis traversent en Ibérie (1086) où ils battent Alphonse VI à Sagrajas. L'unification est fragile et s'effondre vers 1147.",
		status: 'pending',
	},

	{
		id: 'evt_byzantine_military_aid',
		name: 'Aide militaire occidentale à Byzance',
		description:
			'Sans appel à la croisade, les royaumes occidentaux envoient une aide militaire limitée à Byzance face aux Seldjoukides. Pas de dimension religieuse massive — une opération géopolitique pragmatique entre souverains chrétiens.',
		type: 'political',
		category: 'military',
		year: 1096,
		yearRange: [1094, 1100],
		affectedNationIds: ['nat_byzantine', 'nat_hre', 'nat_france'],
		affectedRegionIds: ['clim_mediterranean', 'clim_arid_mideast'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"Événement alternatif — ne se déclenche que si la Première Croisade n'a pas lieu. Byzance doit avoir demandé de l'aide après Manzikert. Les royaumes occidentaux doivent être en paix relative.",
		},
		effects: {
			militaryModifier: -1,
			economicModifier: -1,
			stabilityModifier: 1,
			customEffect:
				"Des contingents de chevaliers normands, français et germaniques servent sous commandement byzantin. Récupération partielle de l'Anatolie occidentale. Pas de prise de Jérusalem. Pas d'États croisés. Les rapports entre chrétiens d'Orient et d'Occident restent plus cordiaux.",
		},
		severity: 6,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Scénario uchronique. Sans croisade, Jérusalem reste sous contrôle fatimide/seldjoukide. Les ordres militaires (Templiers, Hospitaliers) ne voient pas le jour. L'histoire du Moyen-Orient est radicalement différente.",
		},
		historical_outcome:
			"Cet événement ne s'est jamais produit. L'appel d'Alexis Comnène a été transformé par Urbain II en croisade religieuse, dépassant largement la demande initiale d'aide militaire.",
		status: 'pending',
	},

	{
		id: 'evt_first_crusade',
		name: 'Première Croisade',
		description:
			"Le pape Urbain II appelle la chrétienté à libérer Jérusalem lors du concile de Clermont. Une immense armée de croisés traverse l'Europe et le Moyen-Orient, aboutissant à la prise de Jérusalem en 1099.",
		type: 'milestone',
		category: 'military',
		year: 1095,
		yearRange: [1093, 1100],
		affectedNationIds: [
			'nat_papal',
			'nat_byzantine',
			'nat_france',
			'nat_hre',
			'nat_england',
			'nat_fatimid',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_mediterranean',
			'clim_arid_mideast',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: [
				'evt_schism_1054',
				'evt_battle_manzikert',
				'evt_investiture_controversy',
			],
			requiredNationsExist: ['nat_papal', 'nat_byzantine'],
			requiredLeadersAlive: ['Urbain II'],
			minReligiousTension: 6,
			customCondition:
				"Le pape doit être en position d'autorité (après la Querelle des Investitures). Byzance doit avoir fait appel à l'aide occidentale suite à Manzikert. La ferveur religieuse doit être élevée.",
		},
		effects: {
			stabilityModifier: -2,
			religiousTensionModifier: 5,
			militaryModifier: -2,
			populationModifier: -0.03,
			triggerEventIds: ['evt_kingdom_jerusalem', 'evt_second_crusade'],
			customEffect:
				"Mobilisation massive de chevaliers occidentaux. Massacres le long du trajet (pogroms, sac de villes). Prise de Jérusalem le 15 juillet 1099. Création d'États croisés au Levant.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_crusade_join',
				label: 'Rejoindre la croisade',
				description:
					'Envoyer des troupes en Terre Sainte. Coût militaire et économique mais prestige immense.',
				effects: {
					militaryModifier: -3,
					economicModifier: -2,
					prestigeModifier: 4,
					religiousTensionModifier: -1,
				},
			},
			{
				id: 'evt_crusade_refuse',
				label: 'Ne pas participer',
				description:
					'Rester neutre. Préservation des forces mais perte de prestige dans la chrétienté.',
				effects: {
					prestigeModifier: -2,
					stabilityModifier: 1,
				},
			},
			{
				id: 'evt_crusade_defend',
				label: 'Défendre (nations musulmanes)',
				description: 'Mobiliser pour repousser les envahisseurs croisés.',
				effects: {
					militaryModifier: -2,
					religiousTensionModifier: 3,
					prestigeModifier: 2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le schisme a été évité ou si Manzikert n'a pas eu lieu, la croisade peut ne pas se produire. Alternative : une aide militaire limitée à Byzance sans dimension religieuse.",
			fallbackEventId: 'evt_byzantine_military_aid',
		},
		historical_outcome:
			'Urbain II prêche la croisade au concile de Clermont (27 novembre 1095). La croisade des pauvres échoue, mais les armées féodales prennent Antioche (1098) puis Jérusalem (15 juillet 1099) dans un bain de sang.',
		status: 'pending',
	},

	{
		id: 'evt_kingdom_jerusalem',
		name: 'Fondation du Royaume de Jérusalem',
		description:
			"Après la prise de Jérusalem, Godefroy de Bouillon est élu premier souverain du nouveau royaume croisé. Les États latins d'Orient sont établis.",
		type: 'political',
		category: 'political',
		year: 1099,
		yearRange: [1099, 1102],
		affectedNationIds: ['nat_fatimid', 'nat_byzantine'],
		affectedRegionIds: ['clim_arid_mideast', 'clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_first_crusade'],
			customCondition:
				'La Première Croisade doit avoir abouti à la prise de Jérusalem.',
		},
		effects: {
			religiousTensionModifier: 3,
			stabilityModifier: -2,
			customEffect:
				"Création du Royaume de Jérusalem, du Comté de Tripoli, de la Principauté d'Antioche et du Comté d'Édesse. Tensions permanentes avec les voisins musulmans.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: false,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si la croisade échoue à prendre Jérusalem, les croisés peuvent établir un État tampon plus au nord (Antioche uniquement).',
		},
		historical_outcome:
			'Godefroy de Bouillon refuse le titre de roi ("Avoué du Saint-Sépulcre"). Son frère Baudouin Ier est couronné roi en 1100. Le royaume survivra jusqu\'en 1291.',
		status: 'pending',
	},

	// ========================================================================
	// 1100-1200 — Siècle des croisades et des empires
	// ========================================================================

	{
		id: 'evt_song_jurchens',
		name: 'Chute du Nord Song — Invasion Jurchen',
		description:
			'Les Jurchens fondent la dynastie Jin et conquièrent le nord de la Chine, forçant les Song à se replier au sud du Yangtsé. Kaifeng tombe en 1127.',
		type: 'milestone',
		category: 'military',
		year: 1127,
		yearRange: [1115, 1130],
		affectedNationIds: ['nat_song', 'nat_liao'],
		affectedRegionIds: ['clim_east_asia_steppe', 'clim_east_asia'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_song_printing_revolution'],
			requiredNationsExist: ['nat_song', 'nat_liao'],
			customCondition:
				"Les Jurchens doivent d'abord détruire les Liao (1125), puis se retourner contre les Song. Les Song doivent avoir affaibli les Liao en alliance avec les Jurchens.",
		},
		effects: {
			stabilityModifier: -5,
			militaryModifier: -3,
			populationModifier: -0.1,
			economicModifier: -3,
			customEffect:
				'Les Song perdent leur capitale Kaifeng et tout le nord de la Chine. Deux empereurs capturés. Repli au sud avec Hangzhou comme nouvelle capitale. Début des Song du Sud.',
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_song_resist_north',
				label: 'Résister au nord',
				description:
					'Mobiliser toutes les forces pour défendre Kaifeng. Très risqué.',
				effects: {
					militaryModifier: -4,
					stabilityModifier: -2,
				},
			},
			{
				id: 'evt_song_retreat_south',
				label: 'Repli stratégique au sud',
				description:
					'Abandonner le nord pour fortifier le Yangtsé. Préserve les forces.',
				effects: {
					militaryModifier: -1,
					economicModifier: -2,
					stabilityModifier: -3,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les Song n'ont pas affaibli les Liao, ceux-ci peuvent servir de tampon. Les Jurchens restent en Mandchourie.",
		},
		historical_outcome:
			"Les Jurchens détruisent les Liao (1125) puis prennent Kaifeng (1127). L'empereur Huizong et son fils sont capturés (Incident de Jingkang). Les Song du Sud s'établissent à Hangzhou sous Gaozong.",
		status: 'pending',
	},

	{
		id: 'evt_second_crusade',
		name: 'Deuxième Croisade',
		description:
			"Suite à la chute du comté d'Édesse (1144), Bernard de Clairvaux prêche une nouvelle croisade. Le roi Louis VII de France et l'empereur Conrad III du HRE mènent une expédition désastreuse.",
		type: 'milestone',
		category: 'military',
		year: 1147,
		yearRange: [1145, 1150],
		affectedNationIds: ['nat_france', 'nat_hre', 'nat_fatimid'],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_arid_mideast',
			'clim_mediterranean',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_kingdom_jerusalem'],
			customCondition:
				"Un État croisé doit être tombé ou menacé. Un prédicateur charismatique doit mobiliser l'Occident.",
		},
		effects: {
			militaryModifier: -2,
			economicModifier: -1,
			prestigeModifier: -2,
			triggerEventIds: ['evt_saladin_rise'],
			customEffect:
				"Échec total devant Damas. Perte de prestige des croisés. Les États musulmans se renforcent et commencent à s'unifier.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les États croisés sont forts, il n'y a pas besoin de croisade. Si aucun ne tombe, l'événement est annulé.",
		},
		historical_outcome:
			"Louis VII et Conrad III arrivent séparément en Terre Sainte. L'attaque sur Damas (1148) est un fiasco — les croisés se replient après 4 jours. La croisade discrédite le mouvement.",
		status: 'pending',
	},

	{
		id: 'evt_saladin_rise',
		name: 'Ascension de Saladin et unification ayyoubide',
		description:
			"Saladin (Salâh ad-Dîn) unifie l'Égypte (renversant les Fatimides) et la Syrie sous la bannière ayyoubide, créant une puissance capable de reconquérir Jérusalem.",
		type: 'political',
		category: 'political',
		year: 1174,
		yearRange: [1169, 1180],
		affectedNationIds: ['nat_fatimid'],
		affectedRegionIds: [
			'clim_arid_mideast',
			'clim_nile_valley',
			'clim_mediterranean',
		],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_second_crusade'],
			requiredNationsExist: ['nat_fatimid'],
			customCondition:
				'Les Fatimides doivent être affaiblis. Un leader militaire ambitieux doit émerger en Égypte.',
		},
		effects: {
			stabilityModifier: 2,
			militaryModifier: 3,
			prestigeModifier: 3,
			triggerEventIds: ['evt_battle_hattin'],
			customEffect:
				"Fin du califat fatimide (1171). Unification de l'Égypte et de la Syrie. Construction d'une armée capable de menacer les États croisés.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les Fatimides sont renforcés par un joueur, Saladin peut ne jamais prendre le pouvoir. L'unification se fait sous un autre leader ou pas du tout.",
		},
		historical_outcome:
			'Saladin renverse les Fatimides en 1171, prend le contrôle de la Syrie en 1174 et passe une décennie à consolider son pouvoir avant de se tourner vers les croisés.',
		status: 'pending',
	},

	{
		id: 'evt_battle_hattin',
		name: 'Bataille de Hattin et chute de Jérusalem',
		description:
			'Saladin inflige une défaite écrasante aux croisés à Hattin (1187), puis reprend Jérusalem. La quasi-totalité du Royaume de Jérusalem est reconquise en quelques mois.',
		type: 'milestone',
		category: 'military',
		year: 1187,
		yearRange: [1185, 1190],
		affectedNationIds: ['nat_fatimid'],
		affectedRegionIds: ['clim_arid_mideast', 'clim_mediterranean'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_saladin_rise', 'evt_kingdom_jerusalem'],
			customCondition:
				"Saladin (ou un leader ayyoubide équivalent) doit avoir unifié l'Égypte et la Syrie. Les États croisés doivent être affaiblis par des querelles internes.",
		},
		effects: {
			religiousTensionModifier: 5,
			militaryModifier: -4,
			stabilityModifier: -3,
			triggerEventIds: ['evt_third_crusade'],
			customEffect:
				"Destruction de l'armée croisée. Capture de la Vraie Croix. Jérusalem reprise le 2 octobre 1187. Saladin traite les vaincus avec clémence, contrairement au massacre de 1099.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les croisés ont renforcé leurs défenses ou évité les erreurs tactiques de Guy de Lusignan, Hattin peut être évité ou gagné.',
			fallbackEventId: 'evt_third_crusade',
		},
		historical_outcome:
			"Le 4 juillet 1187, Saladin piège l'armée croisée assoiffée sur les Cornes de Hattin. Le roi Guy est capturé. Jérusalem se rend le 2 octobre après 88 ans de domination chrétienne.",
		status: 'pending',
	},

	{
		id: 'evt_third_crusade',
		name: 'Troisième Croisade (Croisade des Rois)',
		description:
			'Richard Cœur de Lion, Philippe Auguste et Frédéric Barberousse lancent la troisième croisade pour reprendre Jérusalem après Hattin. Malgré des victoires tactiques, Jérusalem reste musulmane.',
		type: 'milestone',
		category: 'military',
		year: 1189,
		yearRange: [1188, 1192],
		affectedNationIds: ['nat_england', 'nat_france', 'nat_hre', 'nat_fatimid'],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_mediterranean',
			'clim_arid_mideast',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_battle_hattin'],
			customCondition:
				'Jérusalem doit être tombée. Plusieurs souverains chrétiens majeurs doivent être vivants et disposés à intervenir.',
		},
		effects: {
			militaryModifier: -2,
			economicModifier: -2,
			customEffect:
				'Barberousse se noie en Cilicie. Richard reprend Acre et Jaffa mais pas Jérusalem. Traité de Ramla : accès chrétien aux lieux saints. Richard et Saladin se respectent mutuellement.',
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Jérusalem n'est pas tombée, cette croisade n'a pas lieu. Si les joueurs européens refusent, seule une expédition mineure est possible.",
		},
		historical_outcome:
			'Barberousse meurt en chemin (1190). Richard et Philippe prennent Acre (1191). Richard bat Saladin à Arsuf mais ne peut reprendre Jérusalem. Le traité de Jaffa (1192) établit un compromis.',
		status: 'pending',
	},

	{
		id: 'evt_magna_carta_precursor',
		name: 'Tensions féodales en Angleterre',
		description:
			'Les dépenses militaires de Richard Cœur de Lion et la gouvernance impopulaire de Jean sans Terre créent les conditions de la révolte baroniale qui mènera à la Magna Carta (1215).',
		type: 'political',
		category: 'political',
		year: 1199,
		yearRange: [1190, 1205],
		affectedNationIds: ['nat_england'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_third_crusade', 'evt_norman_conquest'],
			requiredNationsExist: ['nat_england'],
			maxStability: 4,
			customCondition:
				"L'Angleterre doit être financièrement épuisée par les croisades et la rançon de Richard. Le roi doit être en conflit avec la noblesse.",
		},
		effects: {
			stabilityModifier: -2,
			economicModifier: -2,
			customEffect:
				"Taxes excessives, perte des territoires angevins en France, mécontentement généralisé. Les barons commencent à s'organiser.",
		},
		severity: 6,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_magna_conciliate',
				label: 'Concilier la noblesse',
				description:
					'Réduire les taxes et accorder des libertés. Stabilité mais perte de revenus.',
				effects: {
					stabilityModifier: 2,
					economicModifier: -1,
				},
			},
			{
				id: 'evt_magna_tax',
				label: 'Maintenir la pression fiscale',
				description:
					'Continuer les taxes élevées. Revenus maintenus mais révolte probable.',
				effects: {
					economicModifier: 1,
					stabilityModifier: -3,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Angleterre n'a pas participé aux croisades, les finances sont saines et ce conflit n'émerge pas.",
		},
		historical_outcome:
			'Jean sans Terre perd la Normandie (1204), taxe lourdement les barons, entre en conflit avec le pape. Les barons se révoltent et imposent la Magna Carta en 1215.',
		status: 'pending',
	},

	// ========================================================================
	// Événements régionaux non-européens
	// ========================================================================

	{
		id: 'evt_chola_naval_expansion',
		name: 'Expansion navale Chola vers le Sud-Est asiatique',
		description:
			'Rajendra Chola Ier lance des expéditions navales sans précédent contre Srivijaya et les royaumes du Sud-Est asiatique, établissant la domination Chola sur les détroits de Malacca.',
		type: 'milestone',
		category: 'military',
		year: 1025,
		yearRange: [1017, 1030],
		affectedNationIds: ['nat_chola', 'nat_srivijaya'],
		affectedRegionIds: ['clim_south_asia', 'clim_southeast_asia'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_chola', 'nat_srivijaya'],
			customCondition:
				"L'empire Chola doit avoir une force navale ≥ 8 et un accès aux routes de l'océan Indien.",
		},
		effects: {
			militaryModifier: 2,
			economicModifier: 3,
			prestigeModifier: 3,
			customEffect:
				"Contrôle des détroits de Malacca. Domination du commerce maritime entre l'Inde, la Chine et l'archipel. Affaiblissement durable de Srivijaya.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si Srivijaya a renforcé sa flotte, les Chola peuvent être repoussés. Le commerce reste fragmenté entre les deux puissances.',
		},
		historical_outcome:
			"Rajendra Chola Ier lance des raids navals contre les ports de Srivijaya en 1025. La thalassocratie Srivijaya est brisée, bien qu'elle survive formellement jusqu'au XIVe siècle.",
		status: 'pending',
	},

	{
		id: 'evt_tale_of_genji',
		name: 'Apogée culturel Heian — Le Dit du Genji',
		description:
			"Murasaki Shikibu achève le Genji Monogatari, considéré comme le premier roman de l'histoire. La cour Heian atteint son apogée culturel tandis que le pouvoir réel passe aux régents Fujiwara.",
		type: 'cultural_shift',
		category: 'cultural',
		year: 1010,
		yearRange: [1000, 1020],
		affectedNationIds: ['nat_japan'],
		affectedRegionIds: ['clim_hokkaido'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_japan'],
			customCondition:
				'Le Japon doit être en période de paix relative avec une cour impériale raffinée.',
		},
		effects: {
			prestigeModifier: 3,
			customEffect:
				"Floraison littéraire et artistique. Développement de l'écriture kana. La culture Heian influence toute l'Asie de l'Est. Paradoxalement, le déclin politique de l'aristocratie s'accélère.",
		},
		severity: 5,
		visibility: 'national',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: false,
		},
		historical_outcome:
			"Murasaki Shikibu écrit le Genji Monogatari vers 1000-1012 à la cour de l'impératrice Shōshi. L'œuvre définit les standards esthétiques japonais pour des siècles.",
		status: 'pending',
	},

	{
		id: 'evt_mississippian_peak',
		name: 'Apogée de Cahokia',
		description:
			"La cité de Cahokia atteint son pic démographique (~20 000 habitants), devenant la plus grande ville d'Amérique du Nord. Construction du Monks Mound et complexification des structures sociales mississippiennes.",
		type: 'cultural_shift',
		category: 'cultural',
		year: 1100,
		yearRange: [1050, 1150],
		affectedNationIds: ['nat_mississippian'],
		affectedRegionIds: ['clim_mississippi_valley'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_mississippian'],
			minPopulation: 10000,
			customCondition:
				'La culture mississippienne doit être en croissance avec un accès au commerce fluvial du Mississippi.',
		},
		effects: {
			prestigeModifier: 2,
			populationModifier: 0.05,
			customEffect:
				"Construction de monticules monumentaux. Réseau commercial couvrant le tiers est de l'Amérique du Nord. Émergence d'une classe dirigeante théocratique.",
		},
		severity: 5,
		visibility: 'national',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la population n'a pas crû suffisamment, Cahokia reste un centre régional sans atteindre son apogée historique.",
		},
		historical_outcome:
			"Cahokia atteint 10 000-20 000 habitants vers 1100, avec un réseau d'influence couvrant le midwest. Le déclin commence après 1200 pour des raisons encore débattues (surpopulation, sécheresse, conflits).",
		status: 'pending',
	},

	{
		id: 'evt_kilwa_gold_trade',
		name: "Essor de Kilwa et le commerce de l'or",
		description:
			"Kilwa Kisiwani prend le contrôle du commerce de l'or de Sofala, devenant la cité-État la plus riche de la côte est-africaine. Construction de la Grande Mosquée de Kilwa.",
		type: 'opportunity',
		category: 'economic',
		year: 1100,
		yearRange: [1050, 1150],
		affectedNationIds: ['nat_swahili_cities'],
		affectedRegionIds: ['clim_east_africa_highland'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_chola_naval_expansion'],
			requiredNationsExist: ['nat_swahili_cities'],
			customCondition:
				"Les cités swahilies doivent avoir un accès aux routes de l'océan Indien (ouvertes par l'expansion Chola) et au commerce de l'or de l'intérieur africain.",
		},
		effects: {
			economicModifier: 4,
			prestigeModifier: 2,
			customEffect:
				"Kilwa frappe sa propre monnaie. Construction monumentale en corail. Connexion commerciale avec l'Inde, la Perse et la Chine Song.",
		},
		severity: 6,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si une autre cité swahilie domine (Mogadiscio, Mombasa), c'est elle qui prend le rôle de Kilwa.",
		},
		historical_outcome:
			"Kilwa contrôle Sofala et son or vers la fin du XIe siècle. La Grande Mosquée est agrandie. Les marchands de Kilwa sont mentionnés par les voyageurs chinois et arabes comme les plus riches d'Afrique.",
		status: 'pending',
	},

	{
		id: 'evt_toltec_collapse',
		name: 'Effondrement de Tula et déclin toltèque',
		description:
			"La capitale toltèque de Tula est saccagée et abandonnée. La civilisation toltèque s'effondre, laissant un vide de pouvoir en Mésoamérique qui sera comblé par les Aztèques deux siècles plus tard.",
		type: 'crisis',
		category: 'political',
		year: 1150,
		yearRange: [1100, 1175],
		affectedNationIds: ['nat_toltec', 'nat_maya_states'],
		affectedRegionIds: ['clim_mesoamerica'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_toltec'],
			maxStability: 3,
			customCondition:
				"Sécheresses, famines, conflits internes et invasions chichimèques doivent converger pour provoquer l'effondrement.",
		},
		effects: {
			stabilityModifier: -5,
			populationModifier: -0.15,
			economicModifier: -3,
			customEffect:
				'Destruction et abandon de Tula. Migration des populations. Fragmentation politique de la Mésoamérique centrale. Le mythe de Quetzalcoatl se renforce.',
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si un joueur toltec a maintenu la stabilité, Tula peut survivre plus longtemps. Le vide de pouvoir mésoaméricain ne se produit pas dans cette timeline.',
		},
		historical_outcome:
			'Tula est détruite vers 1150-1175. Les causes exactes sont débattues : invasions, révoltes internes, sécheresse. Les survivants migrent et diffusent la culture toltèque dans toute la Mésoamérique.',
		status: 'pending',
	},

	{
		id: 'evt_angkor_wat',
		name: "Construction d'Angkor Vat",
		description:
			"Le roi Suryavarman II ordonne la construction d'Angkor Vat, le plus grand monument religieux jamais construit. Apogée de la puissance et du prestige de l'Empire khmer.",
		type: 'cultural_shift',
		category: 'cultural',
		year: 1130,
		yearRange: [1113, 1150],
		affectedNationIds: ['nat_khmer'],
		affectedRegionIds: ['clim_southeast_asia'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_chola_naval_expansion'],
			requiredNationsExist: ['nat_khmer'],
			customCondition:
				"L'Empire khmer doit être stable et prospère, dans un contexte de dynamisme commercial sud-est asiatique. Un roi ambitieux doit être au pouvoir avec accès aux ressources nécessaires (grès, main d'œuvre).",
		},
		effects: {
			prestigeModifier: 5,
			economicModifier: -2,
			customEffect:
				"Construction sur 30 ans. Mobilisation massive de main d'œuvre. Le temple devient le centre symbolique de l'empire et un lieu de pèlerinage majeur.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Empire khmer est affaibli, le temple peut être plus modeste ou ne jamais être achevé.",
		},
		historical_outcome:
			"Suryavarman II lance la construction vers 1113-1130. Le temple, dédié à Vishnou, couvre 162 hectares. Il ne sera achevé qu'après la mort du roi.",
		status: 'pending',
	},

	{
		id: 'evt_almohad_conquest',
		name: 'Conquête almohade',
		description:
			'Les Almohades renversent les Almoravides et unifient le Maghreb et al-Andalus sous un nouveau califat berbère réformateur plus strict théologiquement.',
		type: 'milestone',
		category: 'military',
		year: 1147,
		yearRange: [1130, 1160],
		affectedNationIds: ['nat_cordoba'],
		affectedRegionIds: ['clim_saharan', 'clim_mediterranean', 'clim_sahel'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_almoravid_conquest'],
			customCondition:
				'Les Almoravides doivent être affaiblis. Un mouvement religieux réformateur doit émerger dans le Haut Atlas.',
		},
		effects: {
			stabilityModifier: -2,
			religiousTensionModifier: 3,
			militaryModifier: 2,
			customEffect:
				'Persécution des non-musulmans et des musulmans non conformistes. Maimonide fuit Cordoue. Architecture almohade distinctive (Giralda de Séville). La Reconquista est stoppée temporairement.',
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les Almoravides sont forts, les Almohades restent un mouvement dissident local au Maroc.',
		},
		historical_outcome:
			"Les Almohades prennent Marrakech en 1147, puis unifient le Maghreb et al-Andalus vers 1170. Leur empire est le plus vaste qu'ait connu le Maghreb médiéval.",
		status: 'pending',
	},

	// ========================================================================
	// Événements naturels et crises récurrentes
	// ========================================================================

	{
		id: 'evt_medieval_warm_period',
		name: 'Optimum climatique médiéval',
		description:
			"Période de réchauffement climatique permettant l'expansion agricole en Europe du Nord, la colonisation viking du Groenland, et des récoltes abondantes. Le climat favorise la croissance démographique.",
		type: 'natural_disaster',
		category: 'natural',
		year: 1000,
		yearRange: [900, 1250],
		affectedNationIds: [],
		affectedRegionIds: [],
		globalEvent: true,
		triggerConditions: {
			customCondition:
				'Événement climatique global — automatique, ne peut être empêché par les joueurs.',
		},
		effects: {
			populationModifier: 0.02,
			economicModifier: 1,
			customEffect:
				'Hausse des rendements agricoles en Europe et Asie. Extension des terres cultivables au nord. Recul des glaciers. Vin cultivé en Angleterre.',
		},
		severity: 3,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: false,
			canCancel: false,
		},
		historical_outcome:
			"Températures supérieures de 1-2°C à celles du petit âge glaciaire. La population européenne double entre 1000 et 1300. L'agriculture s'étend au Groenland et en Scandinavie intérieure.",
		status: 'pending',
	},

	{
		id: 'evt_famine_1097',
		name: 'Grande famine européenne de 1097',
		description:
			'Mauvaises récoltes généralisées en Europe occidentale et centrale, aggravées par les prélèvements liés à la Première Croisade. Mortalité accrue dans les campagnes.',
		type: 'crisis',
		category: 'natural',
		year: 1097,
		yearRange: [1094, 1100],
		affectedNationIds: ['nat_france', 'nat_hre', 'nat_england'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_nile_flood_failure'],
			customCondition:
				'Conditions climatiques défavorables (dont les crises du Nil) combinées à une mobilisation militaire importante (Première Croisade).',
		},
		effects: {
			populationModifier: -0.03,
			stabilityModifier: -2,
			economicModifier: -2,
			customEffect:
				'Mortalité élevée chez les paysans. Les seigneurs partis en croisade ne peuvent gérer leurs domaines. Migrations vers les villes.',
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les conditions agricoles ont été améliorées (rotation des cultures, défrichements), la famine peut être atténuée.',
		},
		historical_outcome:
			'Les chroniqueurs rapportent des famines sévères entre 1094 et 1097, coïncidant avec le départ massif pour la Première Croisade. La mortalité est difficile à quantifier mais significative.',
		status: 'pending',
	},

	{
		id: 'evt_nile_flood_failure',
		name: 'Crise des crues du Nil',
		description:
			'Défaillance des crues annuelles du Nil, provoquant famines et instabilité politique en Égypte fatimide. Ces crises cycliques affaiblissent le califat.',
		type: 'natural_disaster',
		category: 'natural',
		year: 1065,
		yearRange: [1050, 1070],
		affectedNationIds: ['nat_fatimid'],
		affectedRegionIds: ['clim_nile_valley'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_fatimid'],
			customCondition:
				"L'Égypte doit être dépendante des crues du Nil pour son agriculture. Événement naturel cyclique.",
		},
		effects: {
			populationModifier: -0.05,
			economicModifier: -3,
			stabilityModifier: -3,
			customEffect:
				"Famines en Haute et Basse-Égypte. Révoltes paysannes. Affaiblissement de l'autorité fatimide. Les soldats turcs et berbères deviennent incontrôlables.",
		},
		severity: 8,
		visibility: 'national',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le joueur fatimide a investi dans des systèmes d'irrigation et de stockage, l'impact peut être réduit.",
		},
		historical_outcome:
			"La période 1065-1072 voit plusieurs défaillances du Nil. La grande crise de 1065-1072 (al-Shidda) provoque une famine catastrophique et la quasi-désintégration de l'État fatimide.",
		status: 'pending',
	},

	{
		id: 'evt_nile_excellent_floods',
		name: 'Crues exceptionnelles du Nil',
		description:
			"Plusieurs années consécutives de crues parfaitement calibrées du Nil. Les récoltes sont abondantes, les greniers pleins, et l'Égypte connaît une prospérité remarquable sous les Fatimides puis les Ayyoubides.",
		type: 'opportunity',
		category: 'natural',
		year: 1110,
		yearRange: [1100, 1140],
		affectedNationIds: ['nat_fatimid'],
		affectedRegionIds: ['clim_nile_valley'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_fatimid'],
			customCondition:
				"L'Égypte doit être dépendante de l'agriculture nilotique. Les crues doivent être cycliquement favorables. Événement naturel positif récurrent.",
		},
		effects: {
			populationModifier: 0.04,
			economicModifier: 2,
			stabilityModifier: 1,
			customEffect:
				"Récoltes doublées en Haute et Basse-Égypte. Le blé égyptien alimente le commerce méditerranéen. Le Caire prospère. Les surplus permettent de financer des constructions et de l'artisanat.",
		},
		severity: 3,
		visibility: 'national',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le joueur a investi dans des systèmes d'irrigation et de stockage, les excédents sont encore plus importants.",
		},
		historical_outcome:
			"L'Égypte fatimide puis ayyoubide connaît des périodes de prospérité agricole remarquable quand les crues sont régulières. Le nilomètre de l'île de Roda mesure le niveau des crues — une crue idéale est cause de fête nationale.",
		status: 'pending',
	},

	{
		id: 'evt_great_european_clearances',
		name: 'Grands défrichements européens',
		description:
			"Entre le Xe et le XIIIe siècle, l'Europe connaît une vague massive de défrichements. Des forêts entières sont abattues pour créer de nouvelles terres agricoles. La population européenne double.",
		type: 'opportunity',
		category: 'natural',
		year: 1050,
		yearRange: [1000, 1200],
		affectedNationIds: ['nat_france', 'nat_hre', 'nat_england'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_medieval_warm_period'],
			customCondition:
				"L'optimum climatique médiéval doit être en cours. Les moines cisterciens, les seigneurs locaux et les paysans libres participent au mouvement. Nécessite une stabilité politique minimale.",
		},
		effects: {
			populationModifier: 0.05,
			economicModifier: 2,
			stabilityModifier: 1,
			customEffect:
				"Extension massive des terres cultivables. Nouvelles paroisses, nouveaux villages (noms en -ville, -court, -wald). Mouvement de colonisation interne. Les rendements augmentent avec la rotation triennale et le collier d'épaule.",
		},
		severity: 4,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: false,
			suggestedAlternative:
				'Si les joueurs investissent dans le défrichement, les effets sont amplifiés dans leurs régions.',
		},
		historical_outcome:
			'La surface cultivée en Europe occidentale augmente de 50 à 100% entre 1000 et 1300. La population européenne passe de ~35 millions à ~75 millions. Le paysage européen est transformé — les grandes forêts reculent définitivement.',
		status: 'pending',
	},

	{
		id: 'evt_southeast_asian_monsoon_prosperity',
		name: "Âge d'or des moussons — Prospérité d'Angkor",
		description:
			"Le régime des moussons est exceptionnellement régulier en Asie du Sud-Est, permettant à l'Empire khmer d'atteindre son apogée. Le système hydraulique d'Angkor exploite parfaitement les crues saisonnières.",
		type: 'opportunity',
		category: 'natural',
		year: 1100,
		yearRange: [1050, 1200],
		affectedNationIds: ['nat_chola'],
		affectedRegionIds: ['clim_southeast_asia'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"Le régime de moussons doit être stable et prévisible. L'infrastructure hydraulique khmère (barays, canaux) doit exister. Angkor est le plus grand complexe urbain du monde médiéval.",
		},
		effects: {
			populationModifier: 0.04,
			economicModifier: 2,
			stabilityModifier: 1,
			customEffect:
				"Trois récoltes de riz par an grâce à l'irrigation. Population d'Angkor estimée à 750 000 habitants. Surplus agricoles massifs finançant la construction des temples. Commerce florissant avec la Chine et l'Inde.",
		},
		severity: 4,
		visibility: 'national',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le joueur a développé l'infrastructure hydraulique, les effets positifs sont multipliés.",
		},
		historical_outcome:
			"L'Empire khmer atteint son apogée sous Suryavarman II (constructeur d'Angkor Vat, ~1150) et Jayavarman VII (~1180–1220). Le système de barays (réservoirs artificiels) permet une productivité agricole sans équivalent. Le déclin viendra au XIVe siècle quand les moussons deviennent irrégulières.",
		status: 'pending',
	},

	{
		id: 'evt_sahel_green_period',
		name: 'Verdissement sahélien — Prospérité du Ghana et du Mali',
		description:
			'Période de précipitations favorables au Sahel, repoussant le désert vers le nord. Les empires ouest-africains prospèrent grâce à des récoltes abondantes et des pâturages riches.',
		type: 'opportunity',
		category: 'natural',
		year: 1050,
		yearRange: [1000, 1200],
		affectedNationIds: ['nat_ghana'],
		affectedRegionIds: ['clim_sahel'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_ghana'],
			customCondition:
				'Les précipitations sahéliennes doivent être supérieures à la moyenne. Le Sahel oscille entre phases humides et sèches sur des cycles de plusieurs décennies.',
		},
		effects: {
			populationModifier: 0.03,
			economicModifier: 2,
			stabilityModifier: 1,
			customEffect:
				'Pâturages abondants pour le bétail. Récoltes de mil et sorgho excellentes. Les caravanes transsahariennes trouvent eau et fourrage. Les villes de Koumbi Saleh, Djenné et Tombouctou prospèrent.',
		},
		severity: 4,
		visibility: 'national',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"L'intensité de la phase humide peut varier. Le MJ peut moduler les bénéfices selon les investissements agricoles du joueur.",
		},
		historical_outcome:
			"L'Empire du Ghana (apogée au XIe siècle) puis l'Empire du Mali (apogée au XIVe) profitent de phases climatiques favorables au Sahel. Le pèlerinage de Mansa Moussa à La Mecque (1324) avec des tonnes d'or illustre cette prospérité.",
		status: 'pending',
	},

	{
		id: 'evt_song_agricultural_revolution',
		name: 'Révolution agricole des Song',
		description:
			"La Chine des Song connaît une révolution agricole sans précédent : riz à maturation rapide du Champa, double récolte annuelle, irrigation perfectionnée. La population chinoise dépasse 100 millions d'habitants.",
		type: 'opportunity',
		category: 'natural',
		year: 1012,
		yearRange: [1000, 1100],
		affectedNationIds: ['nat_song'],
		affectedRegionIds: ['clim_east_asia'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_song'],
			customCondition:
				"La Chine des Song doit avoir accès au riz Champa (importé du Vietnam). Les techniques d'irrigation en terrasses doivent être développées. Le climat doit être favorable (optimum médiéval).",
		},
		effects: {
			populationModifier: 0.06,
			economicModifier: 3,
			stabilityModifier: 1,
			customEffect:
				'Introduction du riz Champa à maturation rapide (60 jours au lieu de 150). Double, parfois triple récolte annuelle dans le Sud. Migration massive vers le Yangzi et au-delà. Urbanisation sans précédent — Hangzhou et Kaifeng deviennent les plus grandes villes du monde.',
		},
		severity: 5,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: false,
		},
		historical_outcome:
			"L'empereur Zhenzong distribue des semences de riz Champa en 1012. La population chinoise passe de ~60 millions (960) à ~120 millions (1120). C'est la plus grande révolution agricole du monde médiéval. Les surplus alimentent une proto-industrialisation remarquable.",
		status: 'pending',
	},

	{
		id: 'evt_little_ice_age_fishing_boom',
		name: 'Boom de la pêche au hareng — Ligue hanséatique',
		description:
			'Les eaux froides du Petit Âge glaciaire déplacent les bancs de harengs vers le sud, dans la mer Baltique et la mer du Nord. La Hanse exploite cette manne et bâtit un empire commercial.',
		type: 'opportunity',
		category: 'natural',
		year: 1350,
		yearRange: [1300, 1400],
		affectedNationIds: ['nat_hre', 'nat_norway', 'nat_sweden'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_medieval_warm_end'],
			customCondition:
				'Le refroidissement climatique doit avoir commencé. Les eaux froides poussent les bancs de harengs vers des zones plus accessibles. Les techniques de salage et de tonnellerie doivent être connues.',
		},
		effects: {
			economicModifier: 2,
			stabilityModifier: 1,
			customEffect:
				"Le hareng salé devient la protéine de base de l'Europe du Nord. Les villes de Lübeck, Brême, Hamburg et Bergen prospèrent. Le commerce hanséatique domine la Baltique. Les navires de pêche alimentent l'industrie navale.",
		},
		severity: 4,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si un joueur investit dans la pêche et le salage, il peut devenir un acteur majeur du commerce hanséatique.',
		},
		historical_outcome:
			'La Ligue hanséatique (XIIIe-XVe siècle) prospère largement grâce au hareng. Les foires de Scanie (Suède méridionale) voient passer des millions de poissons. Lübeck contrôle le commerce du hareng salé. Quand les bancs se déplacent vers la mer du Nord au XVe siècle, la Hollande prend le relais.',
		status: 'pending',
	},

	{
		id: 'evt_columbian_exchange_crops',
		name: 'Échange colombien — Nouvelles cultures',
		description:
			"L'arrivée de cultures américaines en Europe, Afrique et Asie — pomme de terre, maïs, tomate, piment — transforme l'agriculture mondiale. Les rendements caloriques augmentent massivement, alimentant la croissance démographique.",
		type: 'opportunity',
		category: 'natural',
		year: 1530,
		yearRange: [1500, 1600],
		affectedNationIds: [
			'nat_leon',
			'nat_france',
			'nat_hre',
			'nat_england',
			'nat_papal',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_mediterranean',
			'clim_east_asia',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_columbus_discovery'],
			customCondition:
				"Les contacts avec les Amériques doivent être établis. L'adoption est lente — la pomme de terre met deux siècles à être acceptée en Europe (méfiance, superstition). Le maïs est adopté plus vite en Afrique et Asie du Sud.",
		},
		effects: {
			populationModifier: 0.03,
			economicModifier: 2,
			customEffect:
				"Le maïs s'adapte aux sols pauvres d'Afrique et d'Asie. La pomme de terre nourrit les sols ingrats d'Irlande, de Prusse et de Russie. Le piment révolutionne les cuisines asiatiques. La tomate transforme la cuisine méditerranéenne (mais pas avant le XVIIIe siècle). Le caoutchouc, le quinquina, le tabac ont aussi un impact considérable.",
		},
		severity: 6,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: false,
		},
		historical_outcome:
			"L'échange colombien est probablement le plus grand bouleversement écologique de l'histoire humaine. La pomme de terre nourrit la croissance démographique européenne du XVIIIe siècle. Le maïs permet l'expansion des populations africaines. La population mondiale passe de ~500 millions (1500) à ~900 millions (1800), largement grâce à ces nouvelles cultures.",
		status: 'pending',
	},

	{
		id: 'evt_japan_edo_forestry',
		name: 'Reforestation Edo — Renaissance des forêts japonaises',
		description:
			'Après une déforestation massive au XVIe siècle (guerres civiles, constructions de châteaux), le shogunat Tokugawa impose une politique de reforestation systématique. Le Japon devient le premier pays à gérer ses forêts de manière durable.',
		type: 'opportunity',
		category: 'natural',
		year: 1670,
		yearRange: [1650, 1720],
		affectedNationIds: ['nat_japan'],
		affectedRegionIds: ['clim_hokkaido'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_japan'],
			customCondition:
				"Le Japon doit être unifié sous un gouvernement central (shogunat). La déforestation doit avoir atteint un point critique. L'isolement (sakoku) force l'autosuffisance en ressources naturelles.",
		},
		effects: {
			economicModifier: 1,
			stabilityModifier: 2,
			customEffect:
				"Réglementation stricte des coupes. Plantation massive de cèdres et de cyprès. Les montagnes se reverdissent. Réduction de l'érosion et des inondations. Le bois redevient abondant pour la construction et le chauffage.",
		},
		severity: 3,
		visibility: 'national',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Sans politique active de reforestation, le Japon subit érosion, inondations et pénurie de bois — comme la Chine des Qing à la même époque.',
		},
		historical_outcome:
			"Le Japon Edo est un cas unique de développement durable pré-industriel. Les politiques forestières des daimyos et du shogunat (interdiction de coupes, pépinières d'État) permettent une régénération remarquable. Aujourd'hui encore, le Japon est couvert à 67% de forêts — taux parmi les plus élevés des pays développés.",
		status: 'pending',
	},

	// ========================================================================
	// 1200-1300 — Siècle des Mongols
	// ========================================================================

	{
		id: 'evt_fourth_crusade',
		name: 'Quatrième Croisade et sac de Constantinople',
		description:
			"Détournée de son objectif égyptien, la Quatrième Croisade s'empare de Constantinople (1204), capitale de la chrétienté orientale. L'Empire byzantin est démembré en un Empire latin et des États grecs successeurs.",
		type: 'milestone',
		category: 'military',
		year: 1204,
		yearRange: [1202, 1207],
		affectedNationIds: ['nat_byzantine', 'nat_venice', 'nat_papal'],
		affectedRegionIds: ['clim_mediterranean'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_third_crusade'],
			requiredNationsExist: ['nat_byzantine', 'nat_venice'],
			customCondition:
				"Venise doit avoir une flotte puissante et une créance impayée des croisés. L'Empire byzantin doit être en crise dynastique (usurpation d'Alexis III).",
		},
		effects: {
			stabilityModifier: -5,
			militaryModifier: -4,
			economicModifier: -3,
			prestigeModifier: -5,
			religiousTensionModifier: 5,
			triggerEventIds: ['evt_latin_empire_fall'],
			customEffect:
				"Pillage massif de Constantinople pendant 3 jours. Vol des reliques et trésors. Création de l'Empire latin de Constantinople. Venise s'empare des îles et ports stratégiques. L'orthodoxie ne pardonnera jamais.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_4c_redirect',
				label: 'Détourner la croisade vers Constantinople',
				description:
					'Suivre la proposition vénitienne. Riche butin mais trahison de la chrétienté orientale.',
				effects: {
					economicModifier: 4,
					prestigeModifier: -3,
					religiousTensionModifier: 4,
				},
			},
			{
				id: 'evt_4c_egypt',
				label: "Maintenir le cap vers l'Égypte",
				description:
					"Respecter l'objectif initial. Pas de butin facile mais honneur préservé.",
				effects: {
					prestigeModifier: 1,
					militaryModifier: -2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les croisés ne sont pas endettés envers Venise, la croisade peut aller en Égypte. Constantinople est épargnée et Byzance survit intacte.',
		},
		historical_outcome:
			"Les croisés, incapables de payer Venise, acceptent de prendre Constantinople. La ville tombe le 13 avril 1204 après un assaut. L'Empire latin est créé, mais les Grecs de Nicée reconquerront la ville en 1261.",
		status: 'pending',
	},

	{
		id: 'evt_latin_empire_fall',
		name: 'Reconquête de Constantinople par les Nicéens',
		description:
			"L'Empire de Nicée, État successeur grec, reconquiert Constantinople et restaure l'Empire byzantin sous Michel VIII Paléologue.",
		type: 'political',
		category: 'political',
		year: 1261,
		yearRange: [1255, 1265],
		affectedNationIds: ['nat_byzantine', 'nat_venice'],
		affectedRegionIds: ['clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_fourth_crusade'],
			customCondition:
				"Un État successeur grec doit avoir survécu et accumulé assez de forces. L'Empire latin doit être affaibli.",
		},
		effects: {
			stabilityModifier: 2,
			prestigeModifier: 3,
			militaryModifier: -1,
			customEffect:
				"Restauration de l'Empire byzantin — mais affaibli et réduit. Constantinople est ruinée par rapport à son ancienne gloire. L'empire ne retrouvera jamais sa puissance d'antan.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Empire latin a été renforcé par un joueur, la reconquête échoue ou est retardée.",
		},
		historical_outcome:
			"Le général Alexis Strategopoulos prend Constantinople presque sans combat le 25 juillet 1261. Michel VIII Paléologue est couronné empereur. L'empire survivra encore 192 ans mais dans un état très diminué.",
		status: 'pending',
	},

	{
		id: 'evt_magna_carta',
		name: 'Magna Carta',
		description:
			'Les barons anglais imposent la Magna Carta au roi Jean sans Terre, limitant le pouvoir royal et posant les bases du constitutionnalisme occidental.',
		type: 'milestone',
		category: 'political',
		year: 1215,
		yearRange: [1213, 1218],
		affectedNationIds: ['nat_england', 'nat_papal'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_magna_carta_precursor'],
			requiredNationsExist: ['nat_england'],
			maxStability: 3,
			customCondition:
				"Le roi d'Angleterre doit être en conflit ouvert avec sa noblesse. Défaites militaires en France et excommunication papale antérieure.",
		},
		effects: {
			stabilityModifier: 2,
			prestigeModifier: 1,
			customEffect:
				'Limitation du pouvoir royal : pas de taxation sans consentement, habeas corpus en germe, justice garantie. Le pape annule le document mais les principes survivent.',
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_mc_accept',
				label: 'Accepter la Magna Carta',
				description:
					'Signer la charte. Stabilité retrouvée mais pouvoir royal diminué.',
				effects: {
					stabilityModifier: 3,
					prestigeModifier: -1,
				},
			},
			{
				id: 'evt_mc_reject',
				label: 'Rejeter et guerre civile',
				description: 'Refuser les concessions. Guerre des Barons inévitable.',
				effects: {
					stabilityModifier: -4,
					militaryModifier: -2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le roi d'Angleterre a maintenu de bonnes relations avec la noblesse, la révolte n'a pas lieu et la charte n'est pas nécessaire.",
		},
		historical_outcome:
			"Jean sans Terre signe la Magna Carta à Runnymede le 15 juin 1215. Le pape Innocent III l'annule, déclenchant la Première Guerre des Barons. Le document sera réaffirmé sous Henri III et deviendra fondateur.",
		status: 'pending',
	},

	{
		id: 'evt_albigensian_crusade',
		name: 'Croisade des Albigeois',
		description:
			'Le pape Innocent III lance une croisade contre les Cathares du Languedoc. Vingt ans de guerre transforment le Midi de la France et renforcent la monarchie capétienne.',
		type: 'crisis',
		category: 'religious',
		year: 1209,
		yearRange: [1208, 1229],
		affectedNationIds: ['nat_france', 'nat_papal'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_france', 'nat_papal'],
			minReligiousTension: 5,
			customCondition:
				"Le catharisme doit s'être répandu au sud de la France. Le meurtre du légat papal Pierre de Castelnau sert de déclencheur.",
		},
		effects: {
			stabilityModifier: -3,
			religiousTensionModifier: 4,
			populationModifier: -0.05,
			customEffect:
				"Massacres de populations civiles (Béziers : « Tuez-les tous, Dieu reconnaîtra les siens »). Création de l'Inquisition. Disparition de la culture occitane indépendante. Le Languedoc passe sous contrôle capétien.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_cathare_crusade',
				label: 'Participer à la croisade',
				description:
					'Envoyer des troupes au Languedoc. Gain de terres mais brutalité extrême.',
				effects: {
					economicModifier: 2,
					prestigeModifier: -1,
					religiousTensionModifier: 2,
				},
			},
			{
				id: 'evt_cathare_protect',
				label: 'Protéger les Cathares',
				description:
					"Le comte de Toulouse défend ses vassaux. Risque d'excommunication.",
				effects: {
					stabilityModifier: -2,
					religiousTensionModifier: 3,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le catharisme a été réprimé pacifiquement ou si le pape n'est pas assez puissant, la croisade n'a pas lieu. Le Languedoc reste indépendant.",
		},
		historical_outcome:
			'Simon de Montfort mène la croisade à partir de 1209. Béziers est massacrée, Carcassonne tombe. Le traité de Meaux-Paris (1229) soumet le Languedoc à la couronne de France.',
		status: 'pending',
	},

	{
		id: 'evt_genghis_khan',
		name: 'Unification mongole et conquêtes de Gengis Khan',
		description:
			"Temüjin unifie les tribus mongoles sous le titre de Gengis Khan (1206), puis lance une série de conquêtes sans précédent : Chine du Nord, Khwârezm, Asie centrale. Le plus grand empire terrestre de l'histoire commence.",
		type: 'milestone',
		category: 'military',
		year: 1206,
		yearRange: [1200, 1227],
		affectedNationIds: [
			'nat_song',
			'nat_liao',
			'nat_karakhanid',
			'nat_ghaznavid',
		],
		affectedRegionIds: [
			'clim_central_asia_steppe',
			'clim_east_asia_steppe',
			'clim_east_asia',
			'clim_arid_mideast',
		],
		globalEvent: true,
		triggerConditions: {
			customCondition:
				'Un chef charismatique doit émerger dans les steppes mongoles. Les peuples turco-mongols doivent être fragmentés et en conflit interne.',
		},
		effects: {
			stabilityModifier: -5,
			militaryModifier: 5,
			populationModifier: -0.15,
			economicModifier: -4,
			triggerEventIds: [
				'evt_mongol_europe',
				'evt_mongol_baghdad',
				'evt_pax_mongolica',
			],
			customEffect:
				"Destruction de villes entières (Samarkand, Boukhara, Merv). Système postal yam. Tolérance religieuse pragmatique. Millions de morts mais unification commerciale de l'Eurasie.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Temüjin est assassiné jeune, les Mongols restent fragmentés. Les Turcs Khwarezm dominent l'Asie centrale. L'histoire eurasienne est radicalement différente.",
		},
		historical_outcome:
			"Gengis Khan unifie les Mongols en 1206, détruit le Khwârezm (1219-1221), envahit la Chine du Nord. À sa mort (1227), l'empire s'étend de la Corée à la Caspienne.",
		status: 'pending',
	},

	{
		id: 'evt_mongol_europe',
		name: "Invasion mongole de l'Europe",
		description:
			"Les armées de Batu Khan et Subötaï écrasent la Pologne, la Hongrie et les forces européennes lors de la campagne de 1241. La mort du khagan Ögödei sauve l'Europe d'une conquête totale.",
		type: 'milestone',
		category: 'military',
		year: 1241,
		yearRange: [1237, 1243],
		affectedNationIds: [
			'nat_poland',
			'nat_hungary',
			'nat_kievan_rus',
			'nat_hre',
		],
		affectedRegionIds: [
			'clim_continental_east_europe',
			'clim_continental_east_europe',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_genghis_khan'],
			requiredNationsExist: ['nat_poland', 'nat_hungary'],
			customCondition:
				"Les Mongols doivent avoir conquis la Rus' de Kiev (1237-1240). La Horde d'Or doit être lancée vers l'ouest.",
		},
		effects: {
			stabilityModifier: -5,
			militaryModifier: -4,
			populationModifier: -0.1,
			economicModifier: -3,
			customEffect:
				"Destruction de Kiev (1240). Batailles de Legnica et Mohi (1241). La Hongrie perd un tiers de sa population. La Pologne est dévastée. La Rus' sous domination mongole pour 240 ans.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_mongol_eu_resist',
				label: 'Résistance militaire',
				description:
					'Former une coalition européenne. Très difficile face à la tactique mongole.',
				effects: {
					militaryModifier: -4,
					prestigeModifier: 1,
				},
			},
			{
				id: 'evt_mongol_eu_submit',
				label: 'Se soumettre / négocier',
				description:
					'Accepter la vassalité mongole. Survie mais perte de souveraineté.',
				effects: {
					stabilityModifier: -1,
					prestigeModifier: -3,
					economicModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les joueurs européens ont organisé une défense coordonnée très tôt, les Mongols peuvent être ralentis ou repoussés. Conséquence : pas de Horde d'Or en Russie.",
		},
		historical_outcome:
			"Batu Khan détruit Kiev (1240), bat les Polonais à Legnica et les Hongrois à Mohi (avril 1241). La mort d'Ögödei Khan en décembre 1241 force le retrait mongol. La Horde d'Or s'installe en Russie.",
		status: 'pending',
	},

	{
		id: 'evt_mongol_baghdad',
		name: 'Chute de Bagdad — Fin du califat abbasside',
		description:
			'Hülegü Khan assiège et détruit Bagdad, mettant fin à cinq siècles de califat abbasside. Le dernier calife est exécuté. Destruction de la plus grande bibliothèque du monde islamique.',
		type: 'milestone',
		category: 'military',
		year: 1258,
		yearRange: [1255, 1260],
		affectedNationIds: ['nat_buyid', 'nat_fatimid'],
		affectedRegionIds: ['clim_arid_mideast'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_genghis_khan'],
			customCondition:
				"Les Ilkhanides (successeurs mongols en Perse) doivent être en marche vers l'ouest. Bagdad doit être affaiblie et isolée.",
		},
		effects: {
			stabilityModifier: -5,
			economicModifier: -5,
			populationModifier: -0.2,
			religiousTensionModifier: 5,
			triggerEventIds: ['evt_ain_jalut'],
			nationMutations: [
				{
					nationId: 'nat_ghaznavid',
					dissolve: true,
					successorId: 'nat_ghaznavid',
				},
			],
			customEffect:
				"Destruction du califat abbasside. Destruction de la Maison de la Sagesse et de ses bibliothèques. Les systèmes d'irrigation de Mésopotamie sont détruits, transformant irréversiblement le paysage. Trauma civilisationnel pour le monde islamique.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si le calife a négocié une soumission ou si les Mongols ont été arrêtés avant, Bagdad peut être épargnée. Le califat survit mais comme vassal mongol.',
		},
		historical_outcome:
			"Hülegü prend Bagdad le 10 février 1258. Le calife al-Musta'sim est roulé dans un tapis et piétiné à mort par des chevaux. L'eau du Tigre coule noire d'encre des manuscrits jetés. 200 000 à 1 million de morts.",
		status: 'pending',
	},

	{
		id: 'evt_ain_jalut',
		name: "Bataille d'Aïn Djalout — L'arrêt des Mongols",
		description:
			"Les Mamelouks d'Égypte infligent aux Mongols leur première défaite décisive à Aïn Djalout (Palestine). L'expansion mongole vers l'Afrique et l'Égypte est stoppée définitivement.",
		type: 'milestone',
		category: 'military',
		year: 1260,
		yearRange: [1259, 1261],
		affectedNationIds: ['nat_fatimid'],
		affectedRegionIds: ['clim_arid_mideast', 'clim_nile_valley'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_mongol_baghdad'],
			customCondition:
				'Les Mamelouks doivent avoir renversé les Ayyoubides en Égypte (1250). Les Mongols doivent avancer vers le Levant.',
		},
		effects: {
			stabilityModifier: 2,
			militaryModifier: 2,
			prestigeModifier: 4,
			customEffect:
				"Les Mamelouks deviennent les champions de l'islam. Le sultanat mamelouk domine le Moyen-Orient pour 250 ans. Les Mongols ne dépasseront jamais la Syrie.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les Mongols gagnent à Aïn Djalout, l'Égypte tombe et le monde islamique est totalement sous domination mongole.",
		},
		historical_outcome:
			'Le 3 septembre 1260, le sultan mamelouk Qutuz et son général Baybars battent les Mongols à Aïn Djalout. Qutuz est assassiné peu après et Baybars prend le pouvoir, fondant la grande ère mamelouke.',
		status: 'pending',
	},

	{
		id: 'evt_pax_mongolica',
		name: 'Pax Mongolica et Route de la Soie',
		description:
			"La domination mongole sur l'Eurasie permet une période de paix relative et d'échanges commerciaux intenses le long de la Route de la Soie. Marco Polo voyage de Venise à la cour du Grand Khan.",
		type: 'opportunity',
		category: 'economic',
		year: 1260,
		yearRange: [1250, 1350],
		affectedNationIds: ['nat_song', 'nat_venice', 'nat_byzantine'],
		affectedRegionIds: [
			'clim_central_asia_steppe',
			'clim_east_asia_steppe',
			'clim_arid_mideast',
			'clim_mediterranean',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_genghis_khan'],
			requiredTechs: ['tech_gunpowder'],
			customCondition:
				"Les khanats mongols doivent contrôler la majeure partie de l'Eurasie. Les routes commerciales doivent être sécurisées.",
		},
		effects: {
			economicModifier: 3,
			prestigeModifier: 1,
			techUnlocks: ['tech_gunpowder_weapons', 'tech_compass'],
			customEffect:
				"Commerce transcontinental florissant. Diffusion des technologies (poudre à canon, boussole, papier) de la Chine vers l'Occident. Transmission des maladies (peste) facilitée par les mêmes routes.",
		},
		severity: 6,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'empire mongol se fragmente trop tôt, la Pax Mongolica ne s'installe pas et le commerce eurasien reste fragmenté.",
		},
		historical_outcome:
			"De 1260 à 1350 environ, les routes commerciales sont sûres. Marco Polo voyage de 1271 à 1295. La technologie, l'art et les maladies circulent à une échelle sans précédent.",
		status: 'pending',
	},

	{
		id: 'evt_mali_empire',
		name: "Fondation de l'Empire du Mali — Soundiata Keïta",
		description:
			"Soundiata Keïta bat le roi Sosso Soumaoro Kanté à la bataille de Kirina et fonde l'Empire du Mali, qui deviendra le plus riche et le plus puissant d'Afrique de l'Ouest.",
		type: 'milestone',
		category: 'political',
		year: 1235,
		yearRange: [1230, 1240],
		affectedNationIds: ['nat_ghana'],
		affectedRegionIds: ['clim_sahel', 'clim_saharan'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"L'empire du Ghana doit être tombé ou très affaibli. Un leader mandingue charismatique doit émerger pour unifier les peuples mandé.",
		},
		effects: {
			stabilityModifier: 3,
			economicModifier: 4,
			prestigeModifier: 4,
			triggerEventIds: ['evt_mansa_musa'],
			customEffect:
				"Contrôle des mines d'or de Bambuk et Bure. Adoption de l'islam comme religion d'État. Création de la Charte du Manden, considérée comme une des premières déclarations des droits humains.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le Ghana n'est pas tombé, le Mali reste un royaume vassal et Soundiata ne peut pas unifier la région.",
		},
		historical_outcome:
			"Soundiata Keïta bat Soumaoro Kanté à la bataille de Kirina en 1235. Il fonde l'Empire du Mali avec capitale à Niani. La Charte du Manden proclame des droits fondamentaux.",
		status: 'pending',
	},

	{
		id: 'evt_delhi_sultanate',
		name: 'Apogée du Sultanat de Delhi',
		description:
			"Le sultanat de Delhi sous la dynastie Khalji puis Tughlaq s'étend sur presque tout le sous-continent indien, repoussant les Mongols et établissant une administration musulmane sur l'Inde.",
		type: 'milestone',
		category: 'political',
		year: 1290,
		yearRange: [1206, 1320],
		affectedNationIds: [
			'nat_ghaznavid',
			'nat_pala',
			'nat_chalukya',
			'nat_chola',
		],
		affectedRegionIds: ['clim_south_asia', 'clim_south_asia'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_mahmud_somnath'],
			customCondition:
				'Les conquêtes ghurides doivent avoir établi une base de pouvoir musulmane à Delhi. Les royaumes hindous doivent être fragmentés.',
		},
		effects: {
			stabilityModifier: -2,
			militaryModifier: 3,
			religiousTensionModifier: 4,
			customEffect:
				"Administration persanisée. Construction de monuments (Qutb Minar). Résistance mongole aux portes de l'Inde. Tensions communautaires durables entre musulmans et hindous.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les royaumes Rajputs ou le sud dravidien sont assez forts, le sultanat reste confiné au nord.',
		},
		historical_outcome:
			"Qutb al-Din Aibak fonde le sultanat (1206). Sous Ala al-Din Khalji (1296-1316), le sultanat repousse 6 invasions mongoles et contrôle la majeure partie de l'Inde. Muhammad bin Tughlaq (1325-1351) marque l'apogée territorial.",
		status: 'pending',
	},

	{
		id: 'evt_reconquista_las_navas',
		name: 'Bataille de Las Navas de Tolosa',
		description:
			'Coalition des royaumes chrétiens ibériques contre les Almohades. Victoire décisive qui brise la puissance almohade et ouvre la voie à la Reconquista finale.',
		type: 'milestone',
		category: 'military',
		year: 1212,
		yearRange: [1210, 1215],
		affectedNationIds: ['nat_leon', 'nat_navarre', 'nat_cordoba'],
		affectedRegionIds: ['clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_almohad_conquest'],
			requiredNationsExist: ['nat_leon', 'nat_cordoba'],
			customCondition:
				"Les royaumes chrétiens ibériques doivent s'être alliés (rare). Le pape doit avoir déclaré la croisade en Ibérie.",
		},
		effects: {
			stabilityModifier: -2,
			militaryModifier: -3,
			religiousTensionModifier: 3,
			triggerEventIds: ['evt_fall_cordoba_seville'],
			customEffect:
				"L'armée almohade est écrasée. L'effondrement almohade en Ibérie s'accélère. Les taifas se fragmentent à nouveau. La Reconquista avance rapidement.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les royaumes chrétiens ne s'allient pas, la bataille n'a pas lieu et les Almohades survivent plus longtemps.",
		},
		historical_outcome:
			"Le 16 juillet 1212, les armées de Castille, Aragon, Navarre et Portugal battent le calife almohade al-Nasir. 60 000 Almohades tués selon les chroniques. La Reconquista s'accélère dramatiquement.",
		status: 'pending',
	},

	{
		id: 'evt_fall_cordoba_seville',
		name: 'Chute de Cordoue et Séville',
		description:
			"Ferdinand III de Castille conquiert Cordoue (1236) et Séville (1248), les deux plus grandes villes d'al-Andalus. Seul le royaume nasride de Grenade survit.",
		type: 'milestone',
		category: 'military',
		year: 1248,
		yearRange: [1235, 1250],
		affectedNationIds: ['nat_leon', 'nat_cordoba'],
		affectedRegionIds: ['clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_reconquista_las_navas'],
			requiredNationsExist: ['nat_leon'],
			customCondition:
				"La puissance almohade doit être brisée. La Castille doit être en phase d'expansion active.",
		},
		effects: {
			stabilityModifier: -1,
			prestigeModifier: 3,
			economicModifier: 2,
			religiousTensionModifier: 3,
			customEffect:
				'Cordoue tombe en 1236, la grande mosquée est convertie en cathédrale. Séville tombe en 1248. Exode massif de musulmans vers le Maghreb ou Grenade. La Castille devient la puissance dominante en Ibérie.',
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les Almohades ont survécu ou si une nouvelle puissance musulmane a émergé, les villes andalouses résistent.',
		},
		historical_outcome:
			"Ferdinand III prend Cordoue (1236), Jaén (1246), Séville (1248). L'émirat nasride de Grenade survit comme vassal castillan jusqu'en 1492.",
		status: 'pending',
	},

	{
		id: 'evt_fifth_lateran_inquisition',
		name: "Création de l'Inquisition médiévale",
		description:
			"Le pape Grégoire IX institutionnalise l'Inquisition (1231), confiant aux Dominicains la traque des hérésies. Outil de contrôle religieux qui marquera l'Europe pendant des siècles.",
		type: 'political',
		category: 'religious',
		year: 1231,
		yearRange: [1229, 1235],
		affectedNationIds: ['nat_papal', 'nat_france', 'nat_hre'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_albigensian_crusade'],
			requiredNationsExist: ['nat_papal'],
			customCondition:
				"La croisade des Albigeois doit avoir montré la nécessité d'un système permanent de répression des hérésies.",
		},
		effects: {
			religiousTensionModifier: 3,
			stabilityModifier: 1,
			customEffect:
				"Tribunaux permanents. Procédure inquisitoire (aveu sous torture). Bûchers pour les hérétiques. Climat de peur dans les régions touchées. Renforcement de l'orthodoxie catholique.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le catharisme a été éradiqué pacifiquement, l'Inquisition peut ne pas être créée ou rester limitée.",
		},
		historical_outcome:
			"Grégoire IX charge les Dominicains de l'Inquisition en 1231. Les tribunaux s'étendent à toute l'Europe. Les Cathares sont éliminés vers 1330 (chute de Montségur en 1244).",
		status: 'pending',
	},

	{
		id: 'evt_mansa_musa',
		name: "Pèlerinage de Mansa Moussa — L'homme le plus riche de l'histoire",
		description:
			"Mansa Moussa, empereur du Mali, effectue son pèlerinage à La Mecque avec un cortège si fastueux qu'il provoque une inflation de l'or au Caire pendant une décennie.",
		type: 'milestone',
		category: 'economic',
		year: 1324,
		yearRange: [1324, 1326],
		affectedNationIds: ['nat_ghana', 'nat_fatimid'],
		affectedRegionIds: ['clim_sahel', 'clim_saharan', 'clim_nile_valley'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_mali_empire'],
			customCondition:
				"L'Empire du Mali doit être au sommet de sa puissance. Mansa Moussa doit être au pouvoir avec un accès aux mines d'or.",
		},
		effects: {
			economicModifier: -2,
			prestigeModifier: 5,
			customEffect:
				"Distribution de tonnes d'or au Caire, Médine et La Mecque. Inflation de l'or en Égypte pendant 10 ans. Le Mali apparaît sur les cartes européennes. Construction de mosquées et universités à Tombouctou.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Empire du Mali n'est pas assez riche, le pèlerinage est modeste et ne fait pas sensation.",
		},
		historical_outcome:
			"Mansa Moussa part avec 60 000 hommes et 12 tonnes d'or. Son passage au Caire (1324) dévalue l'or de 20 %. L'Atlas Catalan (1375) le représente sur son trône. Tombouctou devient un centre de savoir islamique.",
		status: 'pending',
	},

	// ========================================================================
	// 1300-1400 — Siècle de crises
	// ========================================================================

	{
		id: 'evt_hundred_years_war_start',
		name: 'Début de la Guerre de Cent Ans',
		description:
			"Édouard III d'Angleterre revendique le trône de France, déclenchant un conflit qui durera 116 ans. La Guerre de Cent Ans transforme la nature de la guerre et des États en Europe occidentale.",
		type: 'milestone',
		category: 'military',
		year: 1337,
		yearRange: [1337, 1340],
		affectedNationIds: ['nat_england', 'nat_france'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_england', 'nat_france'],
			customCondition:
				"L'Angleterre doit posséder des fiefs en France (Gascogne). La dynastie capétienne directe doit s'éteindre (1328). Le roi anglais doit avoir un prétexte dynastique.",
		},
		effects: {
			stabilityModifier: -3,
			militaryModifier: -1,
			economicModifier: -2,
			triggerEventIds: ['evt_crecy', 'evt_black_death_europe'],
			customEffect:
				"Guerre intermittente sur plus d'un siècle. Transformation de la guerre médiévale : archers gallois, artillerie, armée permanente. Ruine économique du nord de la France.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_100_claim',
				label: 'Revendiquer le trône de France',
				description:
					'Le roi anglais fait valoir ses droits dynastiques. Guerre longue et coûteuse.',
				effects: {
					prestigeModifier: 2,
					economicModifier: -2,
					militaryModifier: -1,
				},
			},
			{
				id: 'evt_100_renounce',
				label: 'Renoncer à la revendication',
				description:
					"L'Angleterre accepte les Valois. Paix mais perte d'influence continentale.",
				effects: {
					prestigeModifier: -2,
					stabilityModifier: 2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le roi anglais ne revendique pas le trône, ou si un héritier capétien direct existe, la guerre n'a pas lieu. L'Angleterre reste une puissance secondaire sur le continent.",
		},
		historical_outcome:
			'Édouard III revendique le trône français en 1337 face à Philippe VI de Valois. La guerre débute par des raids et des escarmouches navales avant les grandes batailles terrestres.',
		status: 'pending',
	},

	{
		id: 'evt_crecy',
		name: 'Bataille de Crécy',
		description:
			'Victoire décisive anglaise contre une armée française bien supérieure en nombre. Les archers gallois et leur long bow révolutionnent la guerre médiévale et annoncent la fin de la chevalerie lourde.',
		type: 'milestone',
		category: 'military',
		year: 1346,
		yearRange: [1345, 1348],
		affectedNationIds: ['nat_england', 'nat_france'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_hundred_years_war_start'],
			customCondition:
				"La guerre doit être active. L'armée anglaise doit avoir débarqué en Normandie.",
		},
		effects: {
			stabilityModifier: -2,
			militaryModifier: -3,
			prestigeModifier: -3,
			techUnlocks: ['tech_plate_armor'],
			customEffect:
				'La chevalerie française est décimée. Les canons sont peut-être utilisés pour la première fois en Europe. Prise de Calais (1347). Le prestige de la noblesse française est brisé.',
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la France a modernisé sa tactique ou si l'Angleterre n'a pas formé ses archers, la bataille peut tourner différemment.",
		},
		historical_outcome:
			'Le 26 août 1346, ~12 000 Anglais battent ~30 000 Français. Les charges de cavalerie lourde sont brisées par les archers. Le roi Jean de Bohême, aveugle, meurt en chargeant. Calais tombe en 1347.',
		status: 'pending',
	},

	{
		id: 'evt_black_death_asia',
		name: 'Peste noire en Asie centrale et Chine',
		description:
			"La peste bubonique, originaire d'Asie centrale, se propage le long des routes commerciales mongoles. La Chine perd entre 25 et 40 % de sa population sous la dynastie Yuan.",
		type: 'natural_disaster',
		category: 'natural',
		year: 1331,
		yearRange: [1320, 1345],
		affectedNationIds: ['nat_song'],
		affectedRegionIds: [
			'clim_central_asia_steppe',
			'clim_east_asia',
			'clim_east_asia_steppe',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_pax_mongolica'],
			customCondition:
				'Les routes commerciales mongoles doivent être actives, facilitant la transmission de la peste de rongeur en rongeur le long de la Route de la Soie.',
		},
		effects: {
			populationModifier: -0.3,
			economicModifier: -4,
			stabilityModifier: -4,
			triggerEventIds: ['evt_black_death_europe', 'evt_yuan_fall'],
			customEffect:
				"Effondrement démographique en Chine (de ~120M à ~80M). Famines, révoltes. La dynastie Yuan est fatalement affaiblie. La peste se propage vers l'ouest.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: false,
			canCancel: false,
		},
		historical_outcome:
			"La peste frappe la province du Hubei vers 1331-1334. Les chroniques chinoises rapportent 5 millions de morts en une seule province. La maladie se propage le long de la Route de la Soie vers l'ouest.",
		status: 'pending',
	},

	{
		id: 'evt_black_death_europe',
		name: 'Peste noire en Europe',
		description:
			'La peste bubonique arrive en Europe par les navires génois depuis Caffa (Crimée) en 1347. En quatre ans, elle tue entre 30 et 60 % de la population européenne, transformant irréversiblement la société médiévale.',
		type: 'natural_disaster',
		category: 'natural',
		year: 1347,
		yearRange: [1347, 1353],
		affectedNationIds: [
			'nat_france',
			'nat_england',
			'nat_hre',
			'nat_papal',
			'nat_venice',
			'nat_byzantine',
			'nat_poland',
			'nat_hungary',
			'nat_leon',
			'nat_cordoba',
			'nat_norway',
			'nat_sweden',
			'nat_denmark',
			'nat_scotland',
			'nat_kievan_rus',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_temperate_europe',
			'clim_mediterranean',
			'clim_continental_east_europe',
			'clim_subarctic',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_black_death_asia', 'evt_medieval_warm_end'],
			customCondition:
				"La peste doit avoir atteint la mer Noire via les routes mongoles. Les navires de commerce doivent relier la Crimée à l'Europe méditerranéenne.",
		},
		effects: {
			populationModifier: -0.4,
			economicModifier: -5,
			stabilityModifier: -5,
			religiousTensionModifier: 4,
			triggerEventIds: ['evt_peasant_revolts'],
			customEffect:
				"Mort de 25 à 50 millions d'Européens. Pénurie de main-d'œuvre → hausse des salaires → fin du servage. Pogroms contre les juifs (accusés d'empoisonner les puits). Flagellants. Crise de la foi. Renaissance préparée.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_plague_quarantine',
				label: 'Imposer la quarantaine',
				description:
					'Fermer les ports et isoler les malades. Efficace mais coûteux économiquement.',
				effects: {
					populationModifier: -0.2,
					economicModifier: -3,
				},
			},
			{
				id: 'evt_plague_pray',
				label: 'Processions et prières',
				description:
					'Réponse religieuse. Les rassemblements aggravent la contagion.',
				effects: {
					populationModifier: -0.5,
					religiousTensionModifier: 2,
				},
			},
			{
				id: 'evt_plague_scapegoat',
				label: 'Trouver des boucs émissaires',
				description:
					'Pogroms contre les minorités (juifs, lépreux). Violence inutile.',
				effects: {
					stabilityModifier: -3,
					religiousTensionModifier: 4,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: false,
			suggestedAlternative:
				"La peste est inévitable si les routes commerciales sont actives. Le MJ peut moduler la sévérité, mais pas l'empêcher. Si la Pax Mongolica n'a pas eu lieu, la peste arrive plus tard ou moins fort.",
		},
		historical_outcome:
			"La peste arrive à Messine (octobre 1347), Marseille (novembre 1347), puis balaye toute l'Europe. L'Islande et la Pologne sont relativement épargnées. L'Europe met 200 ans à retrouver sa population de 1340.",
		status: 'pending',
	},

	{
		id: 'evt_peasant_revolts',
		name: 'Révoltes paysannes (Jacquerie, Wat Tyler)',
		description:
			"La peste noire a créé une pénurie de main-d'œuvre. Les paysans exigent de meilleurs salaires et conditions. Les révoltes éclatent en France (Jacquerie, 1358) et en Angleterre (Wat Tyler, 1381).",
		type: 'crisis',
		category: 'political',
		year: 1358,
		yearRange: [1355, 1385],
		affectedNationIds: ['nat_france', 'nat_england'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_black_death_europe'],
			maxStability: 3,
			customCondition:
				"La population doit avoir chuté de >25 %. Les seigneurs doivent tenter de maintenir les obligations féodales malgré la pénurie de main-d'œuvre.",
		},
		effects: {
			stabilityModifier: -4,
			economicModifier: -1,
			customEffect:
				'La Jacquerie (1358) est écrasée sauvagement. La révolte de Wat Tyler (1381) est trahie. Mais à long terme, le servage disparaît en Europe occidentale. Les salaires augmentent durablement.',
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_peasant_concede',
				label: 'Accorder des concessions',
				description:
					'Améliorer les conditions des paysans. Perte de revenus seigneuriaux.',
				effects: {
					stabilityModifier: 2,
					economicModifier: -1,
				},
			},
			{
				id: 'evt_peasant_suppress',
				label: 'Réprimer par la force',
				description:
					'Écraser les révoltes militairement. Calme temporaire mais rancœur durable.',
				effects: {
					stabilityModifier: -1,
					militaryModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les joueurs ont amélioré les conditions paysannes après la peste, les révoltes sont évitées ou mineures.',
		},
		historical_outcome:
			"La Jacquerie éclate en mai 1358, écrasée en juin. Wat Tyler mène 60 000 paysans à Londres en 1381, rencontre le roi, est assassiné. Les révoltes échouent mais le servage disparaît d'Angleterre au XVe siècle.",
		status: 'pending',
	},

	{
		id: 'evt_yuan_fall',
		name: 'Chute de la dynastie Yuan — Fondation des Ming',
		description:
			'Zhu Yuanzhang, ancien moine mendiant, mène la révolte des Turbans Rouges et renverse la dynastie Yuan mongole. Il fonde la dynastie Ming sous le nom de Hongwu, restaurant le pouvoir chinois Han.',
		type: 'milestone',
		category: 'political',
		year: 1368,
		yearRange: [1351, 1370],
		affectedNationIds: ['nat_song'],
		affectedRegionIds: ['clim_east_asia', 'clim_east_asia_steppe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_black_death_asia', 'evt_song_jurchens'],
			customCondition:
				'La dynastie Yuan doit être affaiblie par la peste, les famines et les inondations du fleuve Jaune. Les révoltes paysannes doivent se multiplier.',
		},
		effects: {
			stabilityModifier: 3,
			militaryModifier: 2,
			economicModifier: 2,
			nationMutations: [
				{
					nationId: 'nat_song',
					rename: { name: 'Dynastie Ming', dempinym: 'Ming' },
					changeRuler: {
						name: 'Zhu Yuanzhang (Hongwu)',
						dynastyName: 'Ming',
						birthYear: 1328,
						age: 40,
						traits: ['ruthless', 'paranoid', 'administrator', 'peasant_origin'],
					},
					changeCapital: 'set_nanjing',
					changeGovernance: 'empire',
				},
			],
			customEffect:
				'Expulsion des Mongols vers la steppe. Restauration des traditions chinoises Han. Reconstruction massive. Nanjing puis Pékin comme capitale. Les Mongols refluent vers le nord.',
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la dynastie Yuan a réformé l'administration et géré la crise, elle peut survivre. Pas de restauration Han.",
		},
		historical_outcome:
			'Zhu Yuanzhang prend Nanjing (1356), bat les rivaux chinois, puis chasse les Mongols de Pékin (1368). Il instaure un régime autocratique, abolit le poste de premier ministre et fonde une dynastie qui durera 276 ans.',
		status: 'pending',
	},

	{
		id: 'evt_ottoman_rise',
		name: "Essor de l'Empire ottoman — Prise d'Andrinople",
		description:
			"Les Ottomans, d'abord petit beylik turc en Anatolie, traversent les Dardanelles et conquièrent les Balkans. La prise d'Andrinople (1363) leur donne une capitale européenne et encercle Constantinople.",
		type: 'milestone',
		category: 'military',
		year: 1363,
		yearRange: [1354, 1370],
		affectedNationIds: ['nat_byzantine', 'nat_hungary', 'nat_croatia'],
		affectedRegionIds: ['clim_mediterranean', 'clim_continental_east_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_latin_empire_fall'],
			customCondition:
				"L'Empire byzantin doit être très affaibli après la reconquête de Constantinople. Les Balkans doivent être fragmentés. Un État turc doit avoir émergé en Anatolie.",
		},
		effects: {
			stabilityModifier: -2,
			militaryModifier: 3,
			prestigeModifier: 2,
			triggerEventIds: ['evt_battle_kosovo', 'evt_battle_nicopolis'],
			customEffect:
				'Andrinople (Edirne) devient la nouvelle capitale ottomane. Système des devchirmé (enfants chrétiens enrôlés). Janissaires. Menace directe sur Constantinople et la Hongrie.',
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si Byzance a retrouvé sa puissance ou si les Balkans sont unis, les Ottomans restent confinés en Anatolie.',
		},
		historical_outcome:
			"Orhan Ier traverse les Dardanelles en 1354. Mourad Ier prend Andrinople (1363), lance le système devchirmé et les janissaires. L'Europe balkanique passe sous domination ottomane en une génération.",
		status: 'pending',
	},

	{
		id: 'evt_battle_kosovo',
		name: 'Bataille de Kosovo Polje',
		description:
			"L'armée ottomane de Mourad Ier affronte une coalition serbo-bosniaque à Kosovo Polje. La bataille est indécise (les deux souverains meurent) mais les Ottomans dominent les Balkans.",
		type: 'milestone',
		category: 'military',
		year: 1389,
		yearRange: [1387, 1392],
		affectedNationIds: ['nat_byzantine', 'nat_hungary', 'nat_croatia'],
		affectedRegionIds: ['clim_continental_east_europe', 'clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_ottoman_rise'],
			customCondition:
				'Les Ottomans doivent contrôler la Thrace et la Macédoine. La Serbie doit tenter de résister avec une coalition balkanique.',
		},
		effects: {
			stabilityModifier: -3,
			militaryModifier: -2,
			customEffect:
				'Mourad Ier assassiné. Le prince Lazare de Serbie capturé et exécuté. La Serbie devient vassale ottomane. Le Kosovo devient un mythe national serbe fondateur.',
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si la coalition balkanique est plus forte, les Ottomans peuvent être repoussés. Conséquence : la Serbie et la Bulgarie survivent comme États indépendants.',
		},
		historical_outcome:
			"Le 28 juin 1389, les deux armées s'affrontent à Kosovo Polje. Mourad Ier est assassiné par un noble serbe. Son fils Bayezid Ier prend le commandement et vainc les Serbes. La bataille deviendra le mythe fondateur serbe.",
		status: 'pending',
	},

	{
		id: 'evt_battle_nicopolis',
		name: 'Bataille de Nicopolis — Dernière croisade',
		description:
			"La dernière grande croisade européenne, menée par Sigismond de Hongrie et des chevaliers français, est écrasée par le sultan Bayezid Ier à Nicopolis. L'expansion ottomane en Europe semble inarrêtable.",
		type: 'milestone',
		category: 'military',
		year: 1396,
		yearRange: [1394, 1398],
		affectedNationIds: ['nat_hungary', 'nat_france', 'nat_venice', 'nat_hre'],
		affectedRegionIds: ['clim_continental_east_europe', 'clim_mediterranean'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_battle_kosovo'],
			requiredNationsExist: ['nat_hungary'],
			customCondition:
				"Les Ottomans doivent menacer la Hongrie. Une coalition chrétienne doit se former en réponse à l'appel de Sigismond.",
		},
		effects: {
			militaryModifier: -3,
			prestigeModifier: -3,
			stabilityModifier: -2,
			customEffect:
				"L'arrogance des chevaliers français cause la défaite. Massacre de 3 000 à 10 000 prisonniers croisés. Bayezid reçoit le surnom Yıldırım (« la Foudre »). La Hongrie reste seule face aux Ottomans.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si la coalition européenne est disciplinée et bien coordonnée, Nicopolis peut être une victoire chrétienne. Les Ottomans sont repoussés des Balkans pour une génération.',
		},
		historical_outcome:
			'Le 25 septembre 1396, les chevaliers français chargent sans coordination. Bayezid les écrase. Sigismond fuit par le Danube. Les croisés capturés sont exécutés sauf les plus riches (rançon). Le concept de croisade est mort.',
		status: 'pending',
	},

	{
		id: 'evt_great_schism_west',
		name: "Grand Schisme d'Occident",
		description:
			'Deux, puis trois papes rivaux revendiquent simultanément la légitimité pontificale (Rome, Avignon, Pise). La papauté est profondément discréditée pendant 39 ans.',
		type: 'crisis',
		category: 'religious',
		year: 1378,
		yearRange: [1378, 1417],
		affectedNationIds: ['nat_papal', 'nat_france', 'nat_hre', 'nat_england'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_mediterranean'],
		globalEvent: true,
		triggerConditions: {
			requiredNationsExist: ['nat_papal'],
			customCondition:
				"Le retour du pape d'Avignon à Rome doit provoquer une double élection contestée. Les intérêts français et italiens doivent être irréconciliables.",
		},
		effects: {
			religiousTensionModifier: 5,
			stabilityModifier: -2,
			prestigeModifier: -3,
			customEffect:
				"L'Europe chrétienne divisée entre obédiences romaine et avignonnaise. Chaque camp excommunie l'autre. Les penseurs commencent à questionner l'autorité papale (Wyclif, Hus). Terrain préparé pour la Réforme.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_schism_w_rome',
				label: 'Soutenir le pape de Rome',
				description:
					"Reconnaissance du pape romain. Alignement avec l'Italie et le HRE.",
				effects: {
					religiousTensionModifier: 2,
				},
			},
			{
				id: 'evt_schism_w_avignon',
				label: "Soutenir le pape d'Avignon",
				description:
					"Reconnaissance du pape avignonnais. Alignement avec la France et l'Écosse.",
				effects: {
					religiousTensionModifier: 2,
				},
			},
			{
				id: 'evt_schism_w_council',
				label: 'Réclamer un concile',
				description:
					'Exiger un concile général pour résoudre la crise. Position modérée mais longue.',
				effects: {
					prestigeModifier: 1,
					religiousTensionModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la papauté n'est jamais allée à Avignon, ou si l'élection de 1378 se passe bien, le schisme est évité.",
		},
		historical_outcome:
			'Urbain VI élu à Rome (1378), Clément VII élu à Avignon. Le concile de Pise (1409) ajoute un troisième pape. Le concile de Constance (1414-1418) met fin au schisme et élit Martin V.',
		status: 'pending',
	},

	{
		id: 'evt_timur_conquests',
		name: 'Conquêtes de Tamerlan',
		description:
			'Timur (Tamerlan), se proclamant héritier de Gengis Khan, bâtit un empire depuis Samarkand. Il dévaste Delhi, Bagdad, Damas et bat les Ottomans à Ankara (1402), retardant la chute de Constantinople de 50 ans.',
		type: 'milestone',
		category: 'military',
		year: 1370,
		yearRange: [1370, 1405],
		affectedNationIds: [
			'nat_ghaznavid',
			'nat_pala',
			'nat_karakhanid',
			'nat_fatimid',
		],
		affectedRegionIds: [
			'clim_central_asia_steppe',
			'clim_arid_mideast',
			'clim_south_asia',
		],
		globalEvent: true,
		triggerConditions: {
			customCondition:
				"L'Asie centrale doit être fragmentée après l'effondrement de l'Ilkhanat mongol. Un chef turco-mongol ambitieux doit émerger à Samarkand.",
		},
		effects: {
			stabilityModifier: -5,
			populationModifier: -0.1,
			militaryModifier: 4,
			economicModifier: -3,
			customEffect:
				"Pyramides de crânes. Delhi saccagée (1398, 100 000 morts). Bagdad dévastée à nouveau. L'empire timuride s'effondre à sa mort mais Samarkand prospère culturellement (Oulough Beg, astronomie).",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Tamerlan est vaincu jeune ou si les Ottomans ne sont pas affaiblis à Ankara, Constantinople tombe plus tôt et l'Empire ottoman domine dès le début du XVe siècle.",
		},
		historical_outcome:
			"Tamerlan conquiert la Perse (1381-1387), la Mésopotamie (1393), l'Inde du Nord (1398-1399), bat Bayezid Ier à Ankara (1402). Il meurt en 1405 en préparant l'invasion de la Chine Ming. Son empire se fragmente.",
		status: 'pending',
	},

	{
		id: 'evt_great_zimbabwe_peak',
		name: 'Apogée du Grand Zimbabwe',
		description:
			"Le Grand Zimbabwe atteint sa splendeur maximale : enceinte de pierre monumentale, contrôle du commerce de l'or entre l'intérieur africain et la côte swahilie.",
		type: 'cultural_shift',
		category: 'economic',
		year: 1300,
		yearRange: [1250, 1350],
		affectedNationIds: ['nat_zimbabwe', 'nat_swahili_cities'],
		affectedRegionIds: ['clim_east_africa_highland'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_kilwa_gold_trade'],
			requiredNationsExist: ['nat_zimbabwe'],
			customCondition:
				"Le commerce de l'or avec Kilwa et la côte swahilie doit être florissant. La population doit être suffisante pour la construction monumentale.",
		},
		effects: {
			economicModifier: 3,
			prestigeModifier: 3,
			customEffect:
				"Construction de l'enceinte en pierre sèche (11 m de haut). Population de 18 000 habitants. Centre d'un réseau commercial reliant l'or de l'intérieur aux marchands swahilis, indiens et chinois.",
		},
		severity: 6,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si le commerce avec la côte décline, le Zimbabwe reste un centre régional sans atteindre sa monumentalité historique.',
		},
		historical_outcome:
			"Le Grand Zimbabwe atteint son apogée vers 1300. L'enceinte elliptique et la tour conique sont construites. Le site est abandonné vers 1450, peut-être par épuisement des ressources.",
		status: 'pending',
	},

	{
		id: 'evt_majapahit_empire',
		name: "Apogée de l'Empire Majapahit",
		description:
			"L'Empire Majapahit, sous le règne de Hayam Wuruk et le premier ministre Gajah Mada, unifie l'archipel indonésien et domine le commerce maritime du Sud-Est asiatique.",
		type: 'milestone',
		category: 'political',
		year: 1350,
		yearRange: [1293, 1389],
		affectedNationIds: ['nat_srivijaya', 'nat_khmer'],
		affectedRegionIds: ['clim_southeast_asia'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_angkor_wat'],
			customCondition:
				"Srivijaya doit être affaiblie. Le contexte de grandes constructions sud-est asiatiques (Angkor) doit inspirer l'ambition. Un État javanais doit avoir une base économique et navale suffisante. Le Serment de Palapa (« pas de repos tant que le Nusantara n'est pas uni ») doit être prononcé.",
		},
		effects: {
			economicModifier: 3,
			prestigeModifier: 3,
			militaryModifier: 2,
			customEffect:
				"Contrôle des détroits de Malacca et de la Sonde. Commerce des épices. Le Nagarakretagama (poème épique) décrit l'empire à son apogée. Synthèse hindou-bouddhiste-javanaise.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si Srivijaya ou le Siam résistent, Majapahit reste un royaume javanais régional.',
		},
		historical_outcome:
			"Gajah Mada, premier ministre (1331-1364), unifie l'archipel. Hayam Wuruk (1350-1389) porte l'empire à son apogée. La mort des deux leaders provoque le déclin. L'islam remplacera progressivement l'hindouisme.",
		status: 'pending',
	},

	{
		id: 'evt_aztec_foundation',
		name: 'Fondation de Tenochtitlan',
		description:
			"Les Mexicas fondent Tenochtitlan sur une île du lac Texcoco (1325), accomplissant la prophétie de l'aigle et du serpent. La future capitale aztèque deviendra la plus grande ville des Amériques.",
		type: 'milestone',
		category: 'political',
		year: 1325,
		yearRange: [1320, 1330],
		affectedNationIds: ['nat_toltec', 'nat_maya_states'],
		affectedRegionIds: ['clim_mesoamerica'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_toltec_collapse', 'evt_mississippian_peak'],
			customCondition:
				'Le vide de pouvoir post-toltèque doit exister. Les réseaux commerciaux mississippiens doivent avoir montré la voie de la civilisation urbaine en Amérique du Nord. Les réseaux commerciaux mississippiens doivent avoir montré la voie de la civilisation urbaine. Un peuple migrant nahua (les Mexicas) doit atteindre la vallée de Mexico.',
		},
		effects: {
			stabilityModifier: 2,
			prestigeModifier: 1,
			customEffect:
				"Fondation d'une cité lacustre avec chinampas (jardins flottants). Alliance avec Texcoco et Tlacopan (future Triple Alliance). Début de l'ascension aztèque.",
		},
		severity: 7,
		visibility: 'national',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si un joueur contrôle la vallée de Mexico, les Mexicas doivent négocier ou s'installer ailleurs.",
		},
		historical_outcome:
			"Selon la tradition, les Mexicas fondent Tenochtitlan en 1325 à l'endroit où un aigle dévore un serpent sur un cactus. La cité se développe rapidement grâce au système de chinampas.",
		status: 'pending',
	},

	{
		id: 'evt_avignon_papacy',
		name: "Papauté d'Avignon",
		description:
			"Le pape Clément V s'installe à Avignon sous forte influence du roi de France (1309). Sept papes successifs résideront à Avignon pendant 67 ans, affaiblissant le prestige pontifical.",
		type: 'political',
		category: 'religious',
		year: 1309,
		yearRange: [1305, 1314],
		affectedNationIds: ['nat_papal', 'nat_france', 'nat_hre'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredNationsExist: ['nat_papal', 'nat_france'],
			customCondition:
				"La France doit avoir un roi puissant (Philippe IV le Bel). Le pape doit être sous pression française suite à l'attentat d'Anagni (1303).",
		},
		effects: {
			religiousTensionModifier: 3,
			prestigeModifier: -2,
			triggerEventIds: ['evt_great_schism_west'],
			customEffect:
				"Le pape est perçu comme un instrument français. Pétrarque dénonce la 'captivité babylonienne'. Construction du Palais des Papes. Enrichissement de la cour pontificale. Début de la corruption systémique.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Philippe IV est affaibli ou si le pape résiste, la papauté reste à Rome. Pas de schisme d'Occident.",
		},
		historical_outcome:
			"Clément V s'installe à Avignon en 1309. Sept papes y résident jusqu'en 1376, quand Grégoire XI retourne à Rome. Le luxe avignonnais finance l'art mais discrédite l'institution.",
		status: 'pending',
	},

	{
		id: 'evt_swiss_confederation',
		name: 'Naissance de la Confédération suisse',
		description:
			"Les cantons forestiers de Schwyz, Uri et Unterwald forment un pacte d'alliance (1291) contre les Habsbourg. La victoire de Morgarten (1315) confirme l'existence de la Confédération suisse.",
		type: 'political',
		category: 'political',
		year: 1291,
		yearRange: [1291, 1315],
		affectedNationIds: ['nat_hre'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_investiture_controversy'],
			requiredNationsExist: ['nat_hre'],
			customCondition:
				"Les Habsbourg doivent tenter d'étendre leur contrôle sur les cantons alpins. L'affaiblissement impérial après la Querelle des Investitures favorise l'autonomie locale. Les communautés montagnardes doivent être assez organisées pour résister.",
		},
		effects: {
			stabilityModifier: 2,
			militaryModifier: 1,
			customEffect:
				"Début de l'indépendance suisse vis-à-vis du HRE. L'infanterie paysanne démontre sa supériorité sur la cavalerie féodale (Morgarten). Les mercenaires suisses deviendront les plus recherchés d'Europe.",
		},
		severity: 5,
		visibility: 'national',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les Habsbourg n'exercent pas de pression, les cantons n'ont pas de raison de s'allier.",
		},
		historical_outcome:
			"Le pacte fédéral est signé le 1er août 1291. Guillaume Tell est un mythe. La victoire de Morgarten (1315) contre les Habsbourg établit la réalité militaire de la Confédération. Elle s'élargit progressivement.",
		status: 'pending',
	},

	{
		id: 'evt_medieval_warm_end',
		name: "Fin de l'optimum climatique — Début du Petit Âge glaciaire",
		description:
			'Les températures commencent à baisser en Europe, marquant la transition vers le Petit Âge glaciaire. Conséquences en cascade : famines, abandon du Groenland viking, difficultés agricoles.',
		type: 'natural_disaster',
		category: 'natural',
		year: 1300,
		yearRange: [1250, 1350],
		affectedNationIds: [],
		affectedRegionIds: [],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_medieval_warm_period'],
			customCondition:
				'Événement climatique global — automatique, ne peut être empêché par les joueurs.',
		},
		effects: {
			populationModifier: -0.03,
			economicModifier: -2,
			customEffect:
				'Réduction des rendements agricoles. Grande famine de 1315-1317 en Europe du Nord. Les colonies vikings du Groenland déclinent (abandonné vers 1350-1400). Gel des rivières, hivers plus longs.',
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: false,
			canCancel: false,
		},
		historical_outcome:
			"Les températures chutent à partir de ~1300. La Grande Famine (1315-1317) tue des millions en Europe. Les premières colonies vikings du Groenland s'éteignent. Le refroidissement s'accentuera jusqu'au XVIIe siècle.",
		status: 'pending',
	},

	{
		id: 'evt_goryeo_mongol_wars',
		name: 'Guerres Goryeo-Mongols et vassalité coréenne',
		description:
			"Après 7 invasions mongoles (1231-1270), le royaume de Goryeo se soumet et devient un État vassal de l'Empire Yuan. Mariage forcé de la famille royale avec des princesses mongoles.",
		type: 'crisis',
		category: 'military',
		year: 1270,
		yearRange: [1231, 1275],
		affectedNationIds: ['nat_goryeo'],
		affectedRegionIds: ['clim_east_asia_steppe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_genghis_khan'],
			requiredNationsExist: ['nat_goryeo'],
			customCondition:
				'Les Mongols doivent avoir conquis la Chine du Nord et menacer la péninsule coréenne.',
		},
		effects: {
			stabilityModifier: -3,
			militaryModifier: -3,
			populationModifier: -0.1,
			customEffect:
				"Dévastations massives. La cour Goryeo se réfugie sur l'île de Ganghwa pendant 30 ans. Souveraineté réduite. Forcée de fournir des troupes pour les tentatives d'invasion du Japon.",
		},
		severity: 8,
		visibility: 'national',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si Goryeo négocie tôt ou si les Mongols sont occupés ailleurs, la destruction est moindre.',
		},
		historical_outcome:
			"7 invasions mongoles entre 1231 et 1270. Goryeo résiste depuis Ganghwa mais le peuple souffre. La famille royale se soumet en 1270 et devient vassale Yuan jusqu'en 1356, quand Gongmin Wang restaure la souveraineté.",
		status: 'pending',
	},

	{
		id: 'evt_kamikaze_mongol_japan',
		name: 'Invasions mongoles du Japon et les « vents divins »',
		description:
			'Kubilai Khan lance deux invasions du Japon (1274, 1281). Les deux sont repoussées par la résistance samouraï et des typhons proventiels — les « kamikaze » (vents divins).',
		type: 'milestone',
		category: 'military',
		year: 1281,
		yearRange: [1274, 1285],
		affectedNationIds: ['nat_japan', 'nat_goryeo'],
		affectedRegionIds: ['clim_hokkaido'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_genghis_khan'],
			requiredNationsExist: ['nat_japan'],
			customCondition:
				"L'Empire Yuan doit contrôler la Chine et la Corée. Le Japon doit avoir refusé la soumission diplomatique.",
		},
		effects: {
			militaryModifier: -2,
			economicModifier: -2,
			prestigeModifier: 3,
			customEffect:
				"Les samouraïs résistent héroïquement. Les typhons détruisent les flottes mongoles. Le Japon est le seul pays à repousser les Mongols. Le mythe des kamikaze renforce l'identité nationale japonaise.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le Japon s'est soumis diplomatiquement, les invasions n'ont pas lieu. Le Japon devient un vassal Yuan comme la Corée.",
		},
		historical_outcome:
			"Première invasion (1274) : force mongolo-coréenne repoussée. Deuxième invasion (1281) : flotte de 140 000 hommes détruite par un typhon. Le shogunat Kamakura est ruiné financièrement par l'effort de défense et tombe en 1333.",
		status: 'pending',
	},

	// ========================================================================
	// 1400-1500 — Aube de la modernité
	// ========================================================================

	{
		id: 'evt_battle_ankara',
		name: "Bataille d'Ankara — Tamerlan bat les Ottomans",
		description:
			"Tamerlan écrase le sultan Bayezid Ier à Ankara (1402), capture le sultan et disloque temporairement l'Empire ottoman. Constantinople gagne un sursis de 50 ans.",
		type: 'milestone',
		category: 'military',
		year: 1402,
		yearRange: [1400, 1405],
		affectedNationIds: ['nat_byzantine', 'nat_hungary'],
		affectedRegionIds: ['clim_arid_mideast', 'clim_mediterranean'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_timur_conquests', 'evt_battle_nicopolis'],
			customCondition:
				"Tamerlan et Bayezid doivent être en conflit pour le contrôle de l'Anatolie. Les beyliks turcs doivent appeler Tamerlan à l'aide.",
		},
		effects: {
			stabilityModifier: -4,
			militaryModifier: -4,
			customEffect:
				"Bayezid capturé, meurt en captivité. L'Empire ottoman entre dans l'Interrègne (1402-1413) : guerre civile entre les fils de Bayezid. Constantinople respire. L'Europe ignore cette chance.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Tamerlan n'existe pas ou si Bayezid a évité la confrontation, l'Empire ottoman continue son expansion sans interruption. Constantinople tombe plus tôt.",
		},
		historical_outcome:
			"Le 20 juillet 1402, Tamerlan bat Bayezid avec une armée supérieure. Bayezid est capturé et meurt en 1403. L'Interrègne ottoman dure jusqu'en 1413 quand Mehmed Ier réunifie l'empire.",
		status: 'pending',
	},

	{
		id: 'evt_council_constance',
		name: 'Concile de Constance — Fin du Grand Schisme',
		description:
			"Le concile de Constance (1414-1418) met fin au Grand Schisme d'Occident en déposant ou acceptant la démission des trois papes rivaux et en élisant Martin V. Jan Hus est brûlé comme hérétique.",
		type: 'milestone',
		category: 'religious',
		year: 1414,
		yearRange: [1414, 1418],
		affectedNationIds: ['nat_papal', 'nat_hre', 'nat_france', 'nat_england'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_mediterranean'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_great_schism_west'],
			customCondition:
				"Le schisme doit durer depuis plus de 30 ans. L'empereur Sigismond doit prendre l'initiative de convoquer un concile.",
		},
		effects: {
			religiousTensionModifier: -3,
			stabilityModifier: 2,
			triggerEventIds: ['evt_hussite_wars'],
			customEffect:
				'Unité de la papauté restaurée. Mais le conciliarisme (supériorité du concile sur le pape) est affirmé puis contré. Exécution de Jan Hus (6 juillet 1415) malgré un sauf-conduit → révoltes hussites.',
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_constance_conciliar',
				label: 'Soutenir le conciliarisme',
				description:
					"Le concile est supérieur au pape. Réforme de l'Église par les évêques.",
				effects: {
					religiousTensionModifier: -2,
					prestigeModifier: 1,
				},
			},
			{
				id: 'evt_constance_papal',
				label: 'Défendre la primauté papale',
				description:
					'Le pape reste le chef suprême. Pas de réforme structurelle.',
				effects: {
					religiousTensionModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le schisme a été résolu plus tôt, le concile n'a pas lieu. Hus n'est pas brûlé → pas de guerres hussites.",
		},
		historical_outcome:
			'Le concile dépose Jean XXIII et Benoît XIII, accepte la démission de Grégoire XII, élit Martin V (11 novembre 1417). Jan Hus est brûlé (6 juillet 1415). Le conciliarisme triomphe brièvement.',
		status: 'pending',
	},

	{
		id: 'evt_hussite_wars',
		name: 'Guerres hussites',
		description:
			"L'exécution de Jan Hus enflamme la Bohême. Les Hussites, menés par Jan Žižka, repoussent cinq croisades pontificales grâce à des innovations tactiques révolutionnaires (chariots de guerre, armes à feu).",
		type: 'crisis',
		category: 'religious',
		year: 1419,
		yearRange: [1419, 1436],
		affectedNationIds: ['nat_hre', 'nat_papal'],
		affectedRegionIds: [
			'clim_continental_east_europe',
			'clim_temperate_europe',
		],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_council_constance', 'evt_peasant_revolts'],
			requiredTechs: ['tech_gunpowder_weapons'],
			customCondition:
				"Jan Hus doit avoir été exécuté. La Bohême doit être majoritairement hussite. Le pape et l'empereur doivent lancer des croisades.",
		},
		effects: {
			stabilityModifier: -3,
			militaryModifier: -2,
			religiousTensionModifier: 4,
			techUnlocks: ['tech_musket'],
			customEffect:
				'Jan Žižka invente la Wagenburg (forteresse mobile de chariots). Premières armes à feu tactiques en Europe. Les croisés impériaux écrasés à Vítkov (1420), Německý Brod (1422), Domažlice (1431). La Bohême obtient des compromis religieux.',
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Hus n'a pas été exécuté, ou si la Bohême n'est pas hussite, ces guerres n'ont pas lieu.",
		},
		historical_outcome:
			'Jan Žižka, génie militaire aveugle, remporte victoire après victoire. Cinq croisades échouent. Les Compactata de Bâle (1436) accordent la communion sous les deux espèces aux Hussites. Précurseur de la Réforme.',
		status: 'pending',
	},

	{
		id: 'evt_agincourt',
		name: "Bataille d'Azincourt",
		description:
			"Henri V d'Angleterre écrase la chevalerie française à Azincourt (1415). Cette victoire mène au traité de Troyes (1420) qui fait d'Henri l'héritier du trône de France.",
		type: 'milestone',
		category: 'military',
		year: 1415,
		yearRange: [1413, 1420],
		affectedNationIds: ['nat_england', 'nat_france'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_hundred_years_war_start', 'evt_crecy'],
			customCondition:
				"La France doit être affaiblie par la guerre civile Armagnacs-Bourguignons. L'Angleterre doit avoir un roi ambitieux.",
		},
		effects: {
			militaryModifier: -3,
			prestigeModifier: -4,
			stabilityModifier: -3,
			triggerEventIds: ['evt_joan_of_arc'],
			customEffect:
				'Destruction de la noblesse française. Traité de Troyes (1420) : Henri V héritier du trône de France. La France au bord de la disparition comme État indépendant.',
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la France n'est pas en guerre civile, Azincourt peut être évité ou tourner différemment.",
		},
		historical_outcome:
			'Le 25 octobre 1415, ~6 000 Anglais battent ~15 000 Français. La boue et les archers font le travail. 6 000 morts français, dont des centaines de nobles. Henri V épouse Catherine de Valois mais meurt en 1422.',
		status: 'pending',
	},

	{
		id: 'evt_joan_of_arc',
		name: "Jeanne d'Arc et le sacre de Charles VII",
		description:
			"Jeanne d'Arc, paysanne lorraine de 17 ans, prétend entendre des voix divines. Elle lève le siège d'Orléans (1429), fait sacrer Charles VII à Reims et renverse le cours de la Guerre de Cent Ans.",
		type: 'milestone',
		category: 'military',
		year: 1429,
		yearRange: [1428, 1431],
		affectedNationIds: ['nat_france', 'nat_england'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_agincourt'],
			customCondition:
				"La France doit être au bord de l'effondrement. Orléans doit être assiégée. Un personnage charismatique doit émerger pour galvaniser la résistance.",
		},
		effects: {
			stabilityModifier: 3,
			militaryModifier: 2,
			prestigeModifier: 4,
			customEffect:
				"Levée du siège d'Orléans (8 mai 1429). Sacre de Charles VII à Reims (17 juillet 1429). Tournant psychologique de la guerre. Jeanne capturée, vendue aux Anglais, brûlée à Rouen (30 mai 1431).",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_joan_support',
				label: 'Soutenir Jeanne',
				description:
					'Fournir une armée à Jeanne et marcher sur Reims pour le sacre.',
				effects: {
					prestigeModifier: 3,
					militaryModifier: 2,
				},
			},
			{
				id: 'evt_joan_reject',
				label: 'Rejeter la prophétesse',
				description:
					'La considérer comme folle ou hérétique. La France reste sans leader charismatique.',
				effects: {
					stabilityModifier: -2,
					prestigeModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la France n'est pas désespérée, pas de besoin d'un miracle. Le rétablissement français se fait par d'autres moyens.",
		},
		historical_outcome:
			'Jeanne délivre Orléans, fait sacrer Charles VII, est capturée à Compiègne, jugée et brûlée à 19 ans. Charles VII ne fait rien pour la sauver. Les Anglais sont chassés de France en 1453.',
		status: 'pending',
	},

	{
		id: 'evt_fall_constantinople',
		name: 'Chute de Constantinople',
		description:
			"Le sultan Mehmed II assiège et prend Constantinople le 29 mai 1453, mettant fin à l'Empire romain d'Orient après 1 123 ans. Événement charnière entre Moyen Âge et Renaissance.",
		type: 'milestone',
		category: 'military',
		year: 1453,
		yearRange: [1451, 1455],
		affectedNationIds: [
			'nat_byzantine',
			'nat_venice',
			'nat_papal',
			'nat_hungary',
			'nat_hre',
		],
		affectedRegionIds: ['clim_mediterranean', 'clim_continental_east_europe'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_ottoman_rise', 'evt_battle_ankara'],
			requiredNationsExist: ['nat_byzantine'],
			requiredTechs: ['tech_gunpowder_weapons', 'tech_siege_warfare'],
			customCondition:
				"L'Empire ottoman doit être réunifié après l'Interrègne (provoqué par la défaite d'Ankara). Les Ottomans doivent posséder le canon Orban (géant). L'Occident ne doit pas envoyer de secours significatif.",
		},
		effects: {
			stabilityModifier: -5,
			populationModifier: -0.05,
			economicModifier: -3,
			prestigeModifier: -5,
			religiousTensionModifier: 3,
			nationMutations: [
				{
					nationId: 'nat_byzantine',
					dissolve: true,
					absorbedBy: 'nat_ghaznavid',
				},
				{
					nationId: 'nat_ghaznavid',
					rename: { name: 'Empire ottoman', dempinym: 'Ottoman' },
					changeCapital: 'set_constantinople',
					changeRuler: {
						name: 'Mehmed II le Conquérant',
						dynastyName: 'Osmanli',
						birthYear: 1432,
						age: 21,
						traits: ['conqueror', 'ambitious', 'cultured', 'strategic'],
					},
					gainedFrom: {
						nationId: 'nat_byzantine',
						regionDescription:
							'Constantinople et les derniers territoires byzantins en Thrace et Grèce',
					},
				},
			],
			customEffect:
				"Fin de l'Empire byzantin. Hagia Sophia transformée en mosquée. Exode des savants grecs vers l'Italie — accélération de la Renaissance. Istanbul devient la capitale ottomane. Le commerce méditerranéen est coupé → recherche de routes alternatives vers l'Asie.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_cstpl_defend',
				label: 'Envoyer des renforts à Constantinople',
				description:
					"L'Occident mobilise une force de secours. Coûteux et risqué.",
				effects: {
					militaryModifier: -2,
					economicModifier: -1,
					prestigeModifier: 2,
				},
			},
			{
				id: 'evt_cstpl_negotiate',
				label: 'Négocier avec Mehmed II',
				description:
					'Tenter une paix diplomatique. Préserver les comptoirs commerciaux.',
				effects: {
					economicModifier: 1,
					prestigeModifier: -2,
				},
			},
			{
				id: 'evt_cstpl_abandon',
				label: 'Abandonner Constantinople',
				description:
					"L'Occident sacrifie Byzance. Les ressources sont conservées pour défendre la Hongrie.",
				effects: {
					prestigeModifier: -3,
					religiousTensionModifier: 2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Byzance a été renforcée ou si les Ottomans n'ont pas survécu à Ankara, Constantinople ne tombe pas. L'Empire byzantin survit et la Renaissance prend une autre forme.",
		},
		historical_outcome:
			"Le 29 mai 1453, après 53 jours de siège, les Ottomans percent les murailles grâce au canon géant d'Orban. Le dernier empereur Constantin XI meurt en combattant. La civilisation byzantine s'éteint après 1 123 ans.",
		status: 'pending',
	},

	{
		id: 'evt_end_hundred_years_war',
		name: 'Fin de la Guerre de Cent Ans',
		description:
			"La bataille de Castillon (1453) marque la victoire finale française. L'Angleterre perd tous ses territoires continentaux sauf Calais. Naissance de deux États-nations modernes.",
		type: 'milestone',
		category: 'military',
		year: 1453,
		yearRange: [1450, 1455],
		affectedNationIds: ['nat_france', 'nat_england'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_joan_of_arc'],
			customCondition:
				"Charles VII doit avoir réformé l'armée française (compagnies d'ordonnance, artillerie des frères Bureau). L'Angleterre doit être affaiblie par ses querelles internes.",
		},
		effects: {
			stabilityModifier: 3,
			economicModifier: 2,
			militaryModifier: 2,
			triggerEventIds: ['evt_wars_of_roses'],
			customEffect:
				"La France émerge comme la plus grande puissance européenne. L'artillerie de campagne domine. L'armée permanente remplace les levées féodales. L'Angleterre se tourne vers elle-même (Guerres des Roses).",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Angleterre a gagné la Guerre de Cent Ans, la France est un État vassal anglais. L'histoire de l'Europe est radicalement différente.",
		},
		historical_outcome:
			"La bataille de Castillon (17 juillet 1453) est la première bataille gagnée principalement par l'artillerie. Talbot est tué. Bordeaux tombe. L'Angleterre ne conserve que Calais (jusqu'en 1558).",
		status: 'pending',
	},

	{
		id: 'evt_wars_of_roses',
		name: 'Guerres des Roses',
		description:
			"Guerre civile anglaise entre les maisons de Lancastre (rose rouge) et d'York (rose blanche) pour le trône. 30 ans de conflits qui déciment la noblesse anglaise.",
		type: 'crisis',
		category: 'political',
		year: 1455,
		yearRange: [1455, 1487],
		affectedNationIds: ['nat_england'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_end_hundred_years_war'],
			customCondition:
				"L'Angleterre doit avoir perdu la Guerre de Cent Ans. Henri VI doit souffrir de crises de folie. La noblesse militaire doit être oisive et frustrée.",
		},
		effects: {
			stabilityModifier: -4,
			militaryModifier: -2,
			economicModifier: -1,
			customEffect:
				'Massacres entre nobles. Édouard IV (York) prend le trône (1461). Richard III le perd à Bosworth (1485). Henri VII Tudor fonde une nouvelle dynastie et un État plus centralisé.',
		},
		severity: 7,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_roses_lancaster',
				label: 'Soutenir Lancastre',
				description: "La rose rouge et la légitimité d'Henri VI.",
				effects: {
					stabilityModifier: -2,
				},
			},
			{
				id: 'evt_roses_york',
				label: 'Soutenir York',
				description: "La rose blanche et la compétence d'Édouard IV.",
				effects: {
					stabilityModifier: -2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Angleterre a gagné la Guerre de Cent Ans, Henri VI est populaire et stable. Pas de guerre civile.",
		},
		historical_outcome:
			'Première bataille de St Albans (1455). Édouard IV prend le trône (1461). Henri VI brièvement restauré (1470-71). Richard III vaincu à Bosworth (1485). Henri VII Tudor unit les roses par mariage.',
		status: 'pending',
	},

	{
		id: 'evt_gutenberg_press',
		name: "Invention de l'imprimerie à caractères mobiles",
		description:
			"Johannes Gutenberg met au point l'imprimerie à caractères mobiles métalliques à Mayence (~1440-1450). La Bible de Gutenberg (1455) inaugure une révolution de l'information comparable à Internet.",
		type: 'cultural_shift',
		category: 'cultural',
		year: 1450,
		yearRange: [1440, 1455],
		affectedNationIds: ['nat_hre'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: true,
		triggerConditions: {
			requiredNationsExist: ['nat_hre'],
			requiredEventIds: ['evt_song_printing_revolution'],
			requiredTechs: ['tech_movable_type'],
			customCondition:
				"L'Europe doit avoir une demande croissante de textes (universités, administration). La technique d'impression par caractères mobiles, déjà utilisée en Chine Song, doit avoir diffusé via la route de la soie. La métallurgie et les techniques de pressage doivent être suffisamment avancées.",
		},
		effects: {
			stabilityModifier: 1,
			economicModifier: 2,
			prestigeModifier: 3,
			techUnlocks: ['tech_printing_press'],
			customEffect:
				"Le coût des livres chute de 80 %. L'alphabétisation explose. La diffusion des idées s'accélère radicalement. La Réforme protestante sera impossible sans l'imprimerie. Les universités se multiplient.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_press_adopt',
				label: "Adopter l'imprimerie",
				description:
					"Investir dans des ateliers d'impression. Diffusion rapide du savoir.",
				effects: {
					economicModifier: 2,
					prestigeModifier: 2,
				},
			},
			{
				id: 'evt_press_restrict',
				label: "Restreindre l'imprimerie",
				description:
					"Censurer et contrôler les publications. Maintien de l'autorité mais retard culturel.",
				effects: {
					stabilityModifier: 1,
					prestigeModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la métallurgie européenne est en retard, l'imprimerie arrive plus tard. La Chine et la Corée ont déjà des caractères mobiles (Jikji, 1377).",
		},
		historical_outcome:
			"Gutenberg imprime la Bible à 42 lignes (~1455). En 1500, plus de 20 millions de volumes ont été imprimés en Europe. Venise devient le centre de l'édition. La Réforme (1517) sera fille de l'imprimerie.",
		status: 'pending',
	},

	{
		id: 'evt_reconquista_granada',
		name: 'Chute de Grenade — Fin de la Reconquista',
		description:
			"Ferdinand d'Aragon et Isabelle de Castille conquièrent le dernier bastion musulman en Ibérie : le royaume de Grenade (2 janvier 1492). Fin de 781 ans de présence musulmane en péninsule ibérique.",
		type: 'milestone',
		category: 'military',
		year: 1492,
		yearRange: [1482, 1492],
		affectedNationIds: ['nat_leon', 'nat_cordoba'],
		affectedRegionIds: ['clim_mediterranean', 'clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_fall_cordoba_seville'],
			customCondition:
				'Les royaumes chrétiens doivent être unis (mariage Ferdinand-Isabelle, 1469). Le royaume de Grenade doit être isolé et sans alliés extérieurs.',
		},
		effects: {
			stabilityModifier: 2,
			militaryModifier: 2,
			prestigeModifier: 4,
			religiousTensionModifier: 3,
			triggerEventIds: ['evt_columbus_discovery'],
			nationMutations: [
				{
					nationId: 'nat_leon',
					rename: { name: "Royaume d'Espagne", dempinym: 'Espagnol' },
					changeStateReligion: 'rel_catholic',
					removeReligion: 'rel_sunni',
					removeLanguage: 'lang_classical_arabic',
				},
			],
			customEffect:
				"Unification religieuse forcée de l'Espagne. Expulsion des juifs (31 mars 1492). Inquisition renforcée. L'énergie militaire de la Reconquista se redirige vers l'expansion outre-mer.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_granada_tolerance',
				label: 'Tolérance religieuse',
				description:
					'Respecter les capitulations de Grenade. Convivencia maintenue.',
				effects: {
					stabilityModifier: 2,
					religiousTensionModifier: -2,
				},
			},
			{
				id: 'evt_granada_expulsion',
				label: 'Expulsion et conversion forcée',
				description:
					'Expulser juifs et musulmans. Pureté religieuse mais perte de talents.',
				effects: {
					religiousTensionModifier: 4,
					economicModifier: -2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les royaumes chrétiens ne sont pas unis, Grenade survit. L'Espagne reste fragmentée et les colonisations sont retardées.",
		},
		historical_outcome:
			"Boabdil remet les clés de l'Alhambra le 2 janvier 1492. Le décret de l'Alhambra (31 mars) expulse les juifs. Les musulmans suivront (1502). L'Espagne gagne en unité mais perd en diversité intellectuelle.",
		status: 'pending',
	},

	{
		id: 'evt_columbus_discovery',
		name: "Découverte de l'Amérique par Christophe Colomb",
		description:
			"Christophe Colomb, financé par Isabelle de Castille, atteint les Bahamas le 12 octobre 1492. Il croit avoir atteint les Indes. L'échange colombien va transformer le monde entier.",
		type: 'milestone',
		category: 'exploration',
		year: 1492,
		yearRange: [1492, 1493],
		affectedNationIds: ['nat_leon', 'nat_toltec', 'nat_maya_states'],
		affectedRegionIds: ['clim_mesoamerica', 'clim_temperate_europe'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_reconquista_granada'],
			requiredTechs: ['tech_cartography', 'tech_compass'],
			customCondition:
				"La Reconquista doit être terminée (énergie disponible pour l'exploration). La route terrestre vers l'Asie doit être coupée ou difficile (chute de Constantinople). Un navigateur doit proposer une route par l'ouest.",
		},
		effects: {
			economicModifier: 3,
			prestigeModifier: 5,
			techUnlocks: ['tech_caravel'],
			customEffect:
				"Début de l'échange colombien : maïs, patate, tomate, cacao → Europe. Chevaux, blé, maladies → Amériques. Effondrement démographique amérindien (90 % en un siècle). Afflux d'or et d'argent. Mondialisation.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_columbus_explore',
				label: "Financer l'expédition",
				description:
					"Investir dans l'exploration transatlantique. Risqué mais potentiellement révolutionnaire.",
				effects: {
					economicModifier: -1,
					prestigeModifier: 3,
				},
			},
			{
				id: 'evt_columbus_refuse',
				label: 'Refuser le projet',
				description:
					'Trop risqué et trop cher. Un autre pays financera Colomb.',
				effects: {
					prestigeModifier: -2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Constantinople n'est pas tombée et que les routes terrestres sont ouvertes, la motivation pour chercher une route par l'ouest est moindre. Un navigateur portugais pourrait arriver en premier.",
		},
		historical_outcome:
			"Colomb quitte Palos (3 août 1492), atteint Guanahani/San Salvador (12 octobre). Quatre voyages au total. Il meurt en 1506 convaincu d'avoir atteint l'Asie. L'Amérique est nommée d'après Amerigo Vespucci.",
		status: 'pending',
	},

	{
		id: 'evt_vasco_da_gama',
		name: "Vasco de Gama atteint l'Inde",
		description:
			"Vasco de Gama contourne le cap de Bonne-Espérance et atteint Calicut (1498), ouvrant la route maritime directe vers l'Inde. Le monopole arabo-vénitien sur le commerce des épices est brisé.",
		type: 'milestone',
		category: 'exploration',
		year: 1498,
		yearRange: [1497, 1499],
		affectedNationIds: [
			'nat_leon',
			'nat_venice',
			'nat_fatimid',
			'nat_swahili_cities',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_east_africa_highland',
			'clim_south_asia',
		],
		globalEvent: true,
		triggerConditions: {
			requiredTechs: ['tech_caravel', 'tech_cartography'],
			customCondition:
				"Le Portugal doit avoir exploré la côte africaine depuis Henri le Navigateur (1420s). Bartolomeu Dias doit avoir doublé le Cap (1488). La route terrestre vers l'Asie doit être difficile.",
		},
		effects: {
			economicModifier: 4,
			prestigeModifier: 4,
			techUnlocks: ['tech_galleon'],
			customEffect:
				"Le commerce des épices passe de la Méditerranée à l'Atlantique. Venise et les Mamelouks déclinent. Les puissances atlantiques (Portugal, Espagne, puis Hollande, Angleterre) dominent. Début de l'empire colonial portugais.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les routes terrestres sont sûres ou si le Portugal n'a pas investi dans l'exploration, la route maritime n'est pas trouvée. Venise reste dominante.",
		},
		historical_outcome:
			'Vasco de Gama quitte Lisbonne (8 juillet 1497), double le Cap (novembre), atteint Calicut (20 mai 1498). Le prix des épices chute en Europe. Le Portugal construit un empire maritime de Malacca à Macao.',
		status: 'pending',
	},

	{
		id: 'evt_italian_renaissance_peak',
		name: 'Apogée de la Renaissance italienne',
		description:
			"Les cités-États italiennes (Florence, Venise, Milan, Rome) connaissent un essor culturel sans précédent. Léonard de Vinci, Botticelli, Machiavel, les Médicis : l'humanisme transforme la pensée occidentale.",
		type: 'cultural_shift',
		category: 'cultural',
		year: 1470,
		yearRange: [1450, 1500],
		affectedNationIds: ['nat_venice', 'nat_papal', 'nat_hre'],
		affectedRegionIds: ['clim_mediterranean', 'clim_temperate_europe'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_fall_constantinople', 'evt_gutenberg_press'],
			requiredTechs: ['tech_university'],
			customCondition:
				"Les savants byzantins doivent avoir fui vers l'Italie. Le commerce italien doit générer des surplus massifs. Le mécénat doit fleurir (Médicis, papes, doges).",
		},
		effects: {
			prestigeModifier: 5,
			economicModifier: 2,
			techUnlocks: ['tech_perspective_drawing', 'tech_anatomy'],
			customEffect:
				"Redécouverte de l'Antiquité gréco-romaine. Perspective en peinture (Brunelleschi). Imprimerie de Venise (Alde Manuce). Machiavel écrit Le Prince. Léonard de Vinci est le polymathéiste par excellence. La philosophie humaniste se répand.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_ren_patronage',
				label: 'Investir dans le mécénat',
				description: 'Financer artistes et savants. Prestige culturel immense.',
				effects: {
					prestigeModifier: 3,
					economicModifier: -1,
				},
			},
			{
				id: 'evt_ren_ignore',
				label: 'Ignorer le mouvement',
				description:
					'Se concentrer sur le militaire ou le commerce. Retard culturel.',
				effects: {
					prestigeModifier: -2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Constantinople n'est pas tombée, les savants grecs ne fuient pas. Si l'imprimerie n'existe pas, la diffusion est limitée. La Renaissance est retardée ou prend une autre forme.",
		},
		historical_outcome:
			"Florence sous Laurent le Magnifique (1469-1492) est l'épicentre. Botticelli peint la Naissance de Vénus (1485). Léonard travaille à Milan (1482-1499). Machiavel écrit Le Prince (1513). L'art et la pensée sont révolutionnés.",
		status: 'pending',
	},

	{
		id: 'evt_inca_expansion',
		name: "Expansion de l'Empire inca",
		description:
			"Sous Pachacutec et Tupac Inca Yupanqui, l'Empire inca (Tawantinsuyu) s'étend des Andes colombiennes au Chili. Le plus grand empire précolombien, relié par un réseau de routes de 40 000 km.",
		type: 'milestone',
		category: 'political',
		year: 1438,
		yearRange: [1430, 1493],
		affectedNationIds: ['nat_chimu', 'nat_wari'],
		affectedRegionIds: [
			'clim_andes_highland',
			'clim_south_american_subtropical',
		],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"Le royaume de Cusco doit avoir survécu à la menace Chanca. Un souverain ambitieux (Pachacutec) doit réorganiser l'État et l'armée.",
		},
		effects: {
			militaryModifier: 3,
			economicModifier: 3,
			stabilityModifier: 2,
			customEffect:
				"Conquête du royaume Chimú (1470). Réseau routier de 40 000 km (Qhapaq Ñan). Système de quipus pour la comptabilité. Agriculture en terrasses. Mit'a (travail obligatoire). Pas d'écriture ni de monnaie mais un empire administrativement sophistiqué.",
		},
		severity: 8,
		visibility: 'national',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les Chancas battent Cusco, pas d'Empire inca. Les Andes restent fragmentées.",
		},
		historical_outcome:
			"Pachacutec (1438-1471) transforme Cusco d'un petit royaume en empire. Tupac Inca Yupanqui étend les frontières de l'Équateur au Chili. Huayna Capac (1493-1527) porte l'empire à son apogée avant la guerre civile et l'arrivée des Espagnols.",
		status: 'pending',
	},

	{
		id: 'evt_songhai_empire',
		name: "Essor de l'Empire songhaï",
		description:
			"Sonni Ali Ber (1464-1492) puis Askia Mohammed (1493-1528) bâtissent le plus grand empire de l'histoire de l'Afrique de l'Ouest, succédant au Mali. Tombouctou devient la plus grande université islamique du monde.",
		type: 'milestone',
		category: 'political',
		year: 1468,
		yearRange: [1464, 1500],
		affectedNationIds: ['nat_ghana'],
		affectedRegionIds: ['clim_sahel', 'clim_saharan'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_mali_empire', 'evt_mansa_musa'],
			customCondition:
				"L'Empire du Mali doit être en déclin. Les Songhaï de Gao doivent avoir un chef militaire ambitieux.",
		},
		effects: {
			militaryModifier: 3,
			economicModifier: 3,
			prestigeModifier: 3,
			customEffect:
				"Conquête de Tombouctou (1468) et Djenné (1473). L'université de Sankoré attire des savants de tout le monde islamique. Commerce de l'or et du sel. Administration sophistiquée sous Askia Mohammed.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si le Mali reste puissant, les Songhaï restent un petit royaume vassal à Gao.',
		},
		historical_outcome:
			"Sonni Ali capture Tombouctou (1468) et Djenné (1473). Askia Mohammed fait le pèlerinage à La Mecque (1496-97), organise l'empire en provinces. Tombouctou compte 25 000 étudiants. L'empire tombe face aux Marocains (1591).",
		status: 'pending',
	},

	{
		id: 'evt_treaty_tordesillas',
		name: 'Traité de Tordesillas',
		description:
			"L'Espagne et le Portugal se partagent le « Nouveau Monde » avec la bénédiction du pape Alexandre VI. Une ligne à 370 lieues à l'ouest du Cap-Vert divise le globe en deux zones d'influence.",
		type: 'political',
		category: 'diplomatic',
		year: 1494,
		yearRange: [1493, 1494],
		affectedNationIds: ['nat_leon', 'nat_papal'],
		affectedRegionIds: [],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_columbus_discovery'],
			customCondition:
				"Colomb doit être revenu avec des nouvelles du Nouveau Monde. L'Espagne et le Portugal doivent être en compétition pour les nouvelles terres.",
		},
		effects: {
			stabilityModifier: 1,
			economicModifier: 2,
			customEffect:
				"Le Brésil revient au Portugal (c'est pourquoi il parle portugais). L'Espagne obtient le reste des Amériques. Les autres puissances européennes (France, Angleterre, Pays-Bas) ignorent ce traité.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Colomb n'a pas navigué ou si d'autres nations ont découvert l'Amérique, le partage est différent ou inexistant.",
		},
		historical_outcome:
			"Signé le 7 juin 1494. La ligne est fixée à 370 lieues à l'ouest du Cap-Vert. Le Portugal obtient le Brésil (découvert en 1500 par Cabral). La France et l'Angleterre contestent : « Montrez-moi le testament d'Adam ! » (François Ier).",
		status: 'pending',
	},

	{
		id: 'evt_moscow_rise',
		name: 'Fin du joug mongol — Montée de Moscou',
		description:
			"Ivan III de Moscou (le Grand) cesse de payer tribut à la Horde d'Or (1480). Il triple le territoire moscovite, unifie les principautés russes et se proclame héritier de Constantinople (« Troisième Rome »).",
		type: 'milestone',
		category: 'political',
		year: 1480,
		yearRange: [1462, 1505],
		affectedNationIds: ['nat_kievan_rus'],
		affectedRegionIds: ['clim_continental_east_europe', 'clim_subarctic'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: [
				'evt_genghis_khan',
				'evt_fall_constantinople',
				'evt_mongol_europe',
			],
			customCondition:
				"La Horde d'Or (héritière de l'invasion mongole de l'Europe) doit être fragmentée et affaiblie. Les principautés russes doivent être suffisamment fortes sous la direction de Moscou.",
		},
		effects: {
			stabilityModifier: 3,
			militaryModifier: 2,
			prestigeModifier: 3,
			customEffect:
				"Le « rassemblement des terres russes » est quasi complet. Ivan III épouse Sophie Paléologue (nièce du dernier empereur byzantin). Adoption de l'aigle bicéphale. Moscou comme « Troisième Rome ». Construction du Kremlin en pierre.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la Horde d'Or reste unie ou si Novgorod résiste, la Russie ne s'unifie pas sous Moscou.",
		},
		historical_outcome:
			"Ivan III refuse le tribut mongol (1476). La Grande Halte sur l'Ougra (1480) met fin symboliguement au joug tatar. Ivan annexe Novgorod (1478), Tver (1485). Il promulgue le Sudebnik (code de lois, 1497).",
		status: 'pending',
	},

	{
		id: 'evt_zheng_he_voyages',
		name: 'Voyages de Zheng He',
		description:
			"L'amiral eunuque Zheng He commande sept expéditions maritimes colossales (1405-1433) avec des flottes de 300 navires et 28 000 hommes, atteignant l'Afrique de l'Est. La Chine Ming choisit ensuite l'isolement.",
		type: 'milestone',
		category: 'exploration',
		year: 1405,
		yearRange: [1405, 1433],
		affectedNationIds: ['nat_song', 'nat_srivijaya', 'nat_swahili_cities'],
		affectedRegionIds: [
			'clim_east_asia',
			'clim_southeast_asia',
			'clim_south_asia',
			'clim_east_africa_highland',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_yuan_fall'],
			requiredTechs: ['tech_compass', 'tech_chinese_junk'],
			customCondition:
				"La dynastie Ming doit être stable sous l'empereur Yongle. La Chine doit posséder une technologie navale avancée (boussole, voiles, compartiments étanches).",
		},
		effects: {
			economicModifier: 2,
			prestigeModifier: 4,
			techUnlocks: ['tech_cartography'],
			customEffect:
				"Les plus grands navires du monde (120 m de long). Diplomatie, pas de conquête. Commerce tributaire établi avec 30+ royaumes. Après 1433, la faction confucéenne impose l'arrêt des expéditions. Les plans sont détruits. La Chine se replie.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_zheng_continue',
				label: 'Poursuivre les expéditions',
				description:
					"La Chine continue l'exploration maritime. Potentiel de colonisation de l'Afrique et au-delà.",
				effects: {
					economicModifier: 3,
					prestigeModifier: 3,
				},
			},
			{
				id: 'evt_zheng_halt',
				label: 'Arrêter les voyages',
				description:
					"Les confucéens l'emportent. La Chine se replie sur elle-même.",
				effects: {
					economicModifier: -1,
					prestigeModifier: -2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la Chine continue les voyages après 1433, elle colonise l'océan Indien et rencontre les Européens. L'histoire mondiale est radicalement différente.",
		},
		historical_outcome:
			'7 voyages entre 1405 et 1433. Les flottes visitent Java, Ceylan, Calicut, Ormuz, Mogadiscio, Malindi. Après la mort de Yongle (1424), les voyages cessent. En 1500, construire un navire de plus de 2 mâts est interdit.',
		status: 'pending',
	},

	{
		id: 'evt_spanish_inquisition',
		name: 'Inquisition espagnole',
		description:
			"Ferdinand et Isabelle créent l'Inquisition espagnole (1478), un tribunal religieux sous contrôle royal ciblant les conversos (juifs convertis) et morisques. Outil de contrôle social et politique.",
		type: 'political',
		category: 'religious',
		year: 1478,
		yearRange: [1478, 1500],
		affectedNationIds: ['nat_leon', 'nat_cordoba'],
		affectedRegionIds: ['clim_mediterranean', 'clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_fifth_lateran_inquisition'],
			requiredNationsExist: ['nat_leon'],
			customCondition:
				"Les rois catholiques doivent vouloir unifier l'Espagne religieusement. La population de conversos doit susciter la méfiance.",
		},
		effects: {
			religiousTensionModifier: 4,
			stabilityModifier: 1,
			economicModifier: -1,
			customEffect:
				"Torquemada nommé Grand Inquisiteur (1483). Autodafés publics. ~2 000 exécutions sur 350 ans. Exode de talents juifs et morisques. Climat de peur et de conformisme. L'Espagne se ferme intellectuellement.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les rois catholiques choisissent la tolérance, pas d'Inquisition. L'Espagne reste diverse mais potentiellement instable.",
		},
		historical_outcome:
			"Bulle Exigit Sincerae Devotionis (1478). Torquemada dirige l'Inquisition 1483-1498. Expulsion des juifs (1492). L'Inquisition ne sera abolie qu'en 1834. Elle devient un outil de contrôle royal autant que religieux.",
		status: 'pending',
	},

	// ========================================================================
	// 1500-1600 — Le siècle des Réformes et des conquêtes
	// ========================================================================

	{
		id: 'evt_protestant_reformation',
		name: 'Réforme protestante — 95 thèses de Luther',
		description:
			"Martin Luther affiche ses 95 thèses à Wittenberg (31 octobre 1517), dénonçant la vente des indulgences. L'imprimerie diffuse ses idées en quelques semaines. La chrétienté occidentale se fracture irréversiblement.",
		type: 'cultural_shift',
		category: 'religious',
		year: 1517,
		yearRange: [1517, 1530],
		affectedNationIds: ['nat_hre', 'nat_papal', 'nat_england', 'nat_france'],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: [
				'evt_gutenberg_press',
				'evt_council_constance',
				'evt_hussite_wars',
			],
			customCondition:
				"L'imprimerie doit exister pour propager les idées. La corruption de l'Église (vente d'indulgences par Tetzel) doit être flagrante. Le précédent hussite doit avoir montré qu'on peut défier Rome.",
		},
		effects: {
			religiousTensionModifier: 5,
			stabilityModifier: -3,
			triggerEventIds: ['evt_peasants_war_germany', 'evt_augsburg_peace'],
			nationMutations: [
				{
					nationId: 'nat_hre',
					addReligion: {
						religionId: 'rel_protestantism',
						percentage: 0.3,
						status: 'tolerated',
					},
				},
				{
					nationId: 'nat_england',
					addReligion: {
						religionId: 'rel_anglicanism',
						percentage: 0.5,
						status: 'state',
					},
					changeStateReligion: 'rel_anglicanism',
				},
			],
			customEffect:
				"Schisme définitif dans la chrétienté occidentale. Naissance du luthéranisme, puis du calvinisme et de l'anglicanisme. Guerres de religion en cascade. Contre-Réforme catholique. Alphabétisation accélérée (chacun doit lire la Bible).",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_reform_adopt',
				label: 'Adopter la Réforme',
				description:
					'Rompre avec Rome. Saisie des biens ecclésiastiques. Liberté religieuse.',
				effects: {
					economicModifier: 2,
					religiousTensionModifier: 3,
					prestigeModifier: -1,
				},
			},
			{
				id: 'evt_reform_catholic',
				label: 'Rester catholique',
				description:
					"Soutenir Rome et combattre l'hérésie. Alliance avec le pape.",
				effects: {
					religiousTensionModifier: 2,
					prestigeModifier: 1,
				},
			},
			{
				id: 'evt_reform_tolerate',
				label: 'Tolérer les deux confessions',
				description: 'Politique de compromis religieux. Difficile à maintenir.',
				effects: {
					stabilityModifier: -1,
					religiousTensionModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'imprimerie n'existe pas ou si l'Église s'est réformée internement (cf. conciliarisme), la Réforme est retardée ou prend une forme différente.",
		},
		historical_outcome:
			"Luther brûle la bulle papale (1520), comparaît à Worms (1521), traduit la Bible en allemand. En 1530, moitié de l'Allemagne est protestante. Calvin à Genève (1536). Henri VIII fonde l'Église anglicane (1534).",
		status: 'pending',
	},

	{
		id: 'evt_peasants_war_germany',
		name: 'Guerre des paysans allemands',
		description:
			'La plus grande révolte populaire en Europe avant la Révolution française. 300 000 paysans se soulèvent en Allemagne du Sud (1524-1525), inspirés par la Réforme, puis sont massacrés.',
		type: 'crisis',
		category: 'political',
		year: 1524,
		yearRange: [1524, 1526],
		affectedNationIds: ['nat_hre'],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
		],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_protestant_reformation'],
			customCondition:
				'La Réforme doit avoir créé un climat de contestation. Les paysans doivent être opprimés par les seigneurs et le clergé.',
		},
		effects: {
			stabilityModifier: -4,
			populationModifier: -0.03,
			customEffect:
				'100 000 paysans tués. Luther condamne la révolte (« Contre les hordes meurtrières »), perdant le soutien populaire. Thomas Müntzer exécuté. La Réforme devient un mouvement de princes, pas de peuple.',
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la Réforme n'a pas eu lieu, les paysans n'ont pas de cadre idéologique. La révolte est plus locale et vite écrasée.",
		},
		historical_outcome:
			"Les Douze Articles (mars 1525) formulent des revendications modérées. Les princes écrasent la révolte avec une brutalité extrême. Luther prend le parti des princes. Le mouvement anabaptiste radicalise l'aile gauche de la Réforme.",
		status: 'pending',
	},

	{
		id: 'evt_conquistadors_aztec',
		name: "Conquête de l'Empire aztèque par Cortés",
		description:
			"Hernán Cortés, avec 600 Espagnols et des milliers d'alliés indigènes, conquiert l'Empire aztèque de Moctezuma II. Tenochtitlan tombe après un siège dévastateur (1521).",
		type: 'milestone',
		category: 'military',
		year: 1521,
		yearRange: [1519, 1522],
		affectedNationIds: ['nat_leon', 'nat_toltec'],
		affectedRegionIds: ['clim_mesoamerica'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: [
				'evt_columbus_discovery',
				'evt_aztec_foundation',
				'evt_treaty_tordesillas',
			],
			customCondition:
				"L'Espagne doit avoir des bases aux Caraïbes. Un conquistador ambitieux doit émerger. Les peuples soumis aux Aztèques doivent être prêts à s'allier contre eux.",
		},
		effects: {
			populationModifier: -0.5,
			economicModifier: 4,
			stabilityModifier: -5,
			customEffect:
				"Effondrement démographique amérindien (variole, rougeole). Destruction de Tenochtitlan, reconstruction en Mexico. Afflux d'or et d'argent vers l'Espagne. Système d'encomienda (esclavage de facto). Métissage culturel.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les Aztèques ont des armes à feu (obtenues par commerce ?) ou si la variole n'arrive pas, la conquête échoue. Le Mexique reste amérindien.",
		},
		historical_outcome:
			'Cortés débarque en 1519, est accueilli par Moctezuma (qui le prend pour Quetzalcóatl ?). Noche Triste (30 juin 1520). Siège de Tenochtitlan (mai-août 1521). La variole tue plus que les épées. 90 % de la population indigène meurt en un siècle.',
		status: 'pending',
	},

	{
		id: 'evt_conquistadors_inca',
		name: "Conquête de l'Empire inca par Pizarro",
		description:
			"Francisco Pizarro capture l'empereur Atahualpa à Cajamarca (1532) avec 168 hommes. L'Empire inca, affaibli par une guerre civile et la variole, s'effondre en quelques années.",
		type: 'milestone',
		category: 'military',
		year: 1532,
		yearRange: [1531, 1535],
		affectedNationIds: ['nat_leon', 'nat_chimu', 'nat_wari'],
		affectedRegionIds: [
			'clim_andes_highland',
			'clim_south_american_subtropical',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_columbus_discovery', 'evt_inca_expansion'],
			customCondition:
				"La guerre civile Huáscar-Atahualpa doit avoir affaibli l'Empire inca. La variole doit avoir précédé les Espagnols (tuant Huayna Capac en 1527).",
		},
		effects: {
			populationModifier: -0.5,
			economicModifier: 4,
			stabilityModifier: -5,
			customEffect:
				"Atahualpa paie la plus grande rançon de l'histoire (une pièce remplie d'or) puis est exécuté. Cusco prise (1533). Manco Inca résiste depuis Vilcabamba. Des tonnes d'argent du Potosí affluent vers l'Espagne.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Empire inca n'est pas en guerre civile ou si les Espagnols sont repoussés, le Tawantinsuyu survit. L'histoire de l'Amérique du Sud est radicalement différente.",
		},
		historical_outcome:
			"Pizarro tend un piège à Cajamarca (16 novembre 1532). 7 000 Incas massacrés en 2 heures. Atahualpa capturé, rançonné, baptisé, garrotté (1533). Les Incas résistent à Vilcabamba jusqu'en 1572.",
		status: 'pending',
	},

	{
		id: 'evt_magellan_circumnavigation',
		name: 'Tour du monde de Magellan-Elcano',
		description:
			"L'expédition de Fernand de Magellan (1519-1522) réalise le premier tour du monde. Magellan meurt aux Philippines, mais Juan Sebastián Elcano ramène le Victoria à Séville. La Terre est ronde.",
		type: 'milestone',
		category: 'exploration',
		year: 1519,
		yearRange: [1519, 1522],
		affectedNationIds: ['nat_leon'],
		affectedRegionIds: [],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_vasco_da_gama'],
			requiredTechs: ['tech_galleon', 'tech_cartography'],
			customCondition:
				"Les techniques de navigation océanique doivent être maîtrisées. Un passage par le sud de l'Amérique doit être soupçonné.",
		},
		effects: {
			prestigeModifier: 5,
			economicModifier: 1,
			customEffect:
				"Preuve empirique que la Terre est un globe. Découverte du détroit de Magellan et de l'océan Pacifique. Les dimensions réelles de la planète sont connues. Les cartes du monde sont révolutionnées.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'expédition échoue complètement, le tour du monde est retardé d'une génération. Les dimensions du Pacifique restent inconnues.",
		},
		historical_outcome:
			'5 navires et 270 hommes partent de Séville (1519). Magellan franchit le détroit (1520), traverse le Pacifique, meurt aux Philippines (1521). Seuls 18 survivants sur le Victoria bouclent le tour du monde (6 septembre 1522).',
		status: 'pending',
	},

	{
		id: 'evt_sack_of_rome',
		name: 'Sac de Rome',
		description:
			'Les troupes de Charles Quint, impayées et mutinées, saccagent Rome pendant des semaines (1527). Le pape Clément VII est assiégé au château Saint-Ange. Choc moral pour la chrétienté.',
		type: 'crisis',
		category: 'military',
		year: 1527,
		yearRange: [1526, 1530],
		affectedNationIds: ['nat_papal', 'nat_hre', 'nat_france'],
		affectedRegionIds: ['clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: [
				'evt_italian_renaissance_peak',
				'evt_protestant_reformation',
			],
			customCondition:
				"Les guerres d'Italie doivent être en cours. Le pape doit avoir changé d'alliance (Ligue de Cognac, 1526). Les mercenaires lansquenets doivent être impayés et hors de contrôle.",
		},
		effects: {
			stabilityModifier: -4,
			prestigeModifier: -4,
			religiousTensionModifier: 2,
			customEffect:
				"8 jours de pillage. Des milliers de morts. Bibliothèques et œuvres d'art détruites. Le prestige de la papauté au plus bas. Fin de la Renaissance romaine. Le pape doit couronner Charles Quint empereur (1530).",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si Charles Quint contrôle ses troupes ou si la Ligue de Cognac est plus forte, le sac est évité. La Renaissance romaine se poursuit.',
		},
		historical_outcome:
			"Le 6 mai 1527, 20 000 soldats mutinés envahissent Rome. Le connétable de Bourbon est tué au début de l'assaut. Le pillage dure des semaines. Clément VII, réfugié au Château Saint-Ange, capitule. La Renaissance se déplace vers Venise.",
		status: 'pending',
	},

	{
		id: 'evt_augsburg_peace',
		name: "Paix d'Augsbourg — Cuius regio, eius religio",
		description:
			"La paix d'Augsbourg (1555) établit le principe « tel prince, telle religion ». Chaque prince du HRE choisit entre catholicisme et luthéranisme. Les calvinistes sont exclus.",
		type: 'political',
		category: 'diplomatic',
		year: 1555,
		yearRange: [1552, 1558],
		affectedNationIds: ['nat_hre', 'nat_papal'],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
		],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_protestant_reformation'],
			customCondition:
				"La guerre de Smalkalde doit avoir montré qu'aucun camp ne peut l'emporter militairement. Charles Quint doit être épuisé.",
		},
		effects: {
			stabilityModifier: 2,
			religiousTensionModifier: -2,
			customEffect:
				'Paix temporaire dans le HRE. Les sujets qui refusent la religion de leur prince peuvent émigrer. Mais les calvinistes sont exclus → frustration croissante → future Guerre de Trente Ans (1618).',
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si un camp a gagné les guerres de religion, pas besoin de compromis. L'Allemagne est uniformément catholique ou protestante.",
		},
		historical_outcome:
			"Charles Quint abdique (1556), épuisé par les guerres de religion. La paix d'Augsbourg gèle la situation religieuse. Elle tient 63 ans, jusqu'à ce que la tension calviniste, la Bohême et la rivalité Habsbourg-Bourbon la brisent en 1618.",
		status: 'pending',
	},

	{
		id: 'evt_council_trent',
		name: 'Concile de Trente — Contre-Réforme',
		description:
			'Le concile de Trente (1545-1563) lance la Contre-Réforme catholique. Clarification des dogmes, réforme des abus, création des séminaires. Les Jésuites deviennent le fer de lance de la reconquête catholique.',
		type: 'cultural_shift',
		category: 'religious',
		year: 1545,
		yearRange: [1545, 1563],
		affectedNationIds: ['nat_papal', 'nat_leon', 'nat_hre', 'nat_france'],
		affectedRegionIds: ['clim_mediterranean', 'clim_temperate_europe'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_protestant_reformation', 'evt_sack_of_rome'],
			customCondition:
				"La Réforme protestante doit menacer sérieusement l'Église catholique. Le pape doit accepter de convoquer un concile réformateur.",
		},
		effects: {
			religiousTensionModifier: -1,
			stabilityModifier: 1,
			prestigeModifier: 2,
			customEffect:
				"L'Index des livres interdits (1559). La Compagnie de Jésus (fondée 1540) évangélise l'Asie et les Amériques. Art baroque comme outil de propagande. Reconquête catholique de la Pologne, de la Bavière et de l'Autriche.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Église s'est réformée avant la Réforme (conciliarisme réussi), le concile de Trente n'est pas nécessaire.",
		},
		historical_outcome:
			"25 sessions sur 18 ans. Dogmes réaffirmés (transsubstantiation, 7 sacrements, purgatoire). Abus corrigés (résidence des évêques, formation des prêtres). Le catholicisme sort renforcé et discipliné. L'art baroque fleurit.",
		status: 'pending',
	},

	{
		id: 'evt_mughal_foundation',
		name: "Fondation de l'Empire moghol",
		description:
			"Babur, descendant de Tamerlan et de Gengis Khan, bat le sultan de Delhi à Panipat (1526) avec 12 000 hommes contre 100 000. Il fonde l'Empire moghol qui dominera l'Inde pendant trois siècles.",
		type: 'milestone',
		category: 'military',
		year: 1526,
		yearRange: [1519, 1530],
		affectedNationIds: ['nat_ghaznavid', 'nat_pala'],
		affectedRegionIds: ['clim_south_asia', 'clim_tibetan_plateau'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_timur_conquests', 'evt_delhi_sultanate'],
			customCondition:
				"Un descendant de Tamerlan doit avoir perdu l'Asie centrale (face aux Ouzbeks). Le sultanat de Delhi doit être faible et divisé.",
		},
		effects: {
			militaryModifier: 3,
			economicModifier: 2,
			stabilityModifier: 2,
			nationMutations: [
				{
					nationId: 'nat_ghaznavid',
					rename: { name: 'Empire moghol', dempinym: 'Moghol' },
					changeRuler: {
						name: 'Babur',
						dynastyName: 'Timourides-Moghols',
						birthYear: 1483,
						age: 43,
						traits: ['conqueror', 'cultured', 'poet', 'strategic'],
					},
					changeGovernance: 'empire',
					changeCapital: 'set_delhi',
				},
			],
			customEffect:
				"Utilisation décisive de l'artillerie à Panipat. Babur établit la dynastie moghole. Humayun perd puis regagne l'empire. Akbar le Grand (1556-1605) créera le véritable empire moghol avec sa politique de tolérance.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le sultanat de Delhi est fort ou si Babur ne dispose pas d'artillerie, la conquête échoue. L'Inde reste fragmentée entre sultanats.",
		},
		historical_outcome:
			"Babur gagne à Panipat (21 avril 1526) grâce à l'artillerie ottomane. Il bat les Rajputs à Khanwa (1527). Il meurt en 1530. Son fils Humayun perd l'empire face à Sher Shah Suri, le regagne en 1555. Akbar (1556-1605) l'agrandit fantastiquement.",
		status: 'pending',
	},

	{
		id: 'evt_ottoman_peak',
		name: "Apogée de l'Empire ottoman — Soliman le Magnifique",
		description:
			"Soliman le Magnifique (1520-1566) porte l'Empire ottoman à son apogée. Conquête de Belgrade (1521), Rhodes (1522), victoire à Mohács (1526), siège de Vienne (1529). Maître de la Méditerranée orientale.",
		type: 'milestone',
		category: 'political',
		year: 1520,
		yearRange: [1520, 1566],
		affectedNationIds: ['nat_hungary', 'nat_venice', 'nat_hre', 'nat_papal'],
		affectedRegionIds: [
			'clim_mediterranean',
			'clim_continental_east_europe',
			'clim_arid_mideast',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_fall_constantinople'],
			requiredTechs: ['tech_gunpowder_weapons', 'tech_siege_warfare'],
			customCondition:
				"L'Empire ottoman doit avoir survécu à l'Interrègne et à Ankara. Un sultan doté de compétences militaires et administratives doit régner.",
		},
		effects: {
			militaryModifier: 4,
			economicModifier: 3,
			prestigeModifier: 4,
			customEffect:
				"Mohács (1526) : la Hongrie cesse d'exister comme État indépendant. Siège de Vienne (1529) : l'avance ottomane est stoppée en Europe centrale. Barberousse domine la Méditerranée. Le Kanuni (législateur) réforme l'administration.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les Ottomans sont affaiblis (pas de Conquête de Constantinople, défaite à Ankara durable), Soliman règne sur un État régional, pas un empire mondial.',
		},
		historical_outcome:
			"Soliman conquiert Belgrade (1521), Rhodes (1522), bat la Hongrie à Mohács (1526), assiège Vienne (1529, échec), prend Bagdad (1534). Alliance avec François Ier contre Charles Quint. L'empire compte 25 millions d'habitants à sa mort (1566).",
		status: 'pending',
	},

	{
		id: 'evt_french_wars_of_religion',
		name: 'Guerres de religion françaises',
		description:
			"Huit guerres de religion déchirent la France (1562-1598). Catholiques vs Huguenots (calvinistes). La Saint-Barthélemy (1572) est le point culminant de l'horreur. L'Édit de Nantes (1598) apporte la paix.",
		type: 'crisis',
		category: 'religious',
		year: 1562,
		yearRange: [1562, 1598],
		affectedNationIds: ['nat_france'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_protestant_reformation'],
			requiredNationsExist: ['nat_france'],
			customCondition:
				"Le calvinisme doit s'être répandu en France. La monarchie doit être affaiblie (mort d'Henri II en joute, 1559). Les Guises catholiques et les Bourbons protestants doivent s'affronter.",
		},
		effects: {
			stabilityModifier: -5,
			populationModifier: -0.05,
			economicModifier: -3,
			religiousTensionModifier: 5,
			customEffect:
				"Massacre de la Saint-Barthélemy (24 août 1572) : 3 000 à 10 000 morts à Paris, 10 000 à 30 000 en province. Assassinat d'Henri III (1589). Henri IV se convertit (« Paris vaut bien une messe »). Édit de Nantes (1598).",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_fwr_catholic',
				label: 'Soutenir la Ligue catholique',
				description:
					"Alliance avec les Guises et l'Espagne. Éradiquer le protestantisme.",
				effects: {
					religiousTensionModifier: 3,
					stabilityModifier: -2,
				},
			},
			{
				id: 'evt_fwr_huguenot',
				label: 'Protéger les Huguenots',
				description:
					'Soutenir la liberté religieuse. Risque de guerre civile avec les ultra-catholiques.',
				effects: {
					religiousTensionModifier: 2,
					stabilityModifier: -2,
				},
			},
			{
				id: 'evt_fwr_politique',
				label: 'Position des Politiques',
				description:
					'La paix civile prime sur la religion. Pragmatisme et tolérance.',
				effects: {
					stabilityModifier: 1,
					religiousTensionModifier: -2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le calvinisme ne s'est pas répandu en France ou si la monarchie est forte, les guerres de religion sont évitées.",
		},
		historical_outcome:
			'8 guerres en 36 ans. Saint-Barthélemy (1572). Henri de Navarre devient Henri IV (1589), se convertit (1593), entre à Paris (1594). Édit de Nantes (1598) : liberté de culte et places de sûreté pour les protestants.',
		status: 'pending',
	},

	{
		id: 'evt_spanish_armada',
		name: "Défaite de l'Invincible Armada",
		description:
			"Philippe II d'Espagne lance l'Invincible Armada (130 navires) contre l'Angleterre d'Élisabeth Ire (1588). Défaite par la marine anglaise et les tempêtes. Début du déclin espagnol et de l'ascension anglaise.",
		type: 'milestone',
		category: 'military',
		year: 1588,
		yearRange: [1585, 1590],
		affectedNationIds: ['nat_leon', 'nat_england'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_protestant_reformation'],
			customCondition:
				"L'Angleterre doit être protestante. L'Espagne doit vouloir rétablir le catholicisme et punir le corsaire Drake. Les Pays-Bas doivent être en révolte.",
		},
		effects: {
			militaryModifier: -3,
			prestigeModifier: -3,
			economicModifier: -2,
			customEffect:
				"L'Espagne perd la maîtrise des mers. L'Angleterre émerge comme puissance navale. Les Pays-Bas poursuivent leur révolte. La monarchie universelle espagnole est un rêve brisé.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Armada réussit, l'Angleterre redevient catholique. L'Espagne domine les mers et les colonies. Pas d'Empire britannique.",
		},
		historical_outcome:
			"L'Armada quitte Lisbonne (mai 1588). Brûlots anglais à Calais (7 août). Bataille de Gravelines (8 août). L'Armada fuit par le nord de l'Écosse. 63 navires perdus, 15 000 morts. Drake et Hawkins deviennent des héros nationaux.",
		status: 'pending',
	},

	{
		id: 'evt_dutch_revolt',
		name: 'Révolte des Pays-Bas — Naissance des Provinces-Unies',
		description:
			"Les Pays-Bas espagnols se révoltent contre Philippe II (1568). La répression du duc d'Albe, les taxes et l'Inquisition catalysent l'indépendance. Les Provinces-Unies deviennent la première république moderne.",
		type: 'milestone',
		category: 'political',
		year: 1568,
		yearRange: [1568, 1600],
		affectedNationIds: ['nat_leon', 'nat_england'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_protestant_reformation'],
			customCondition:
				"Le calvinisme doit être répandu aux Pays-Bas. Philippe II doit imposer l'Inquisition et des taxes lourdes. Guillaume d'Orange doit mener la résistance.",
		},
		effects: {
			stabilityModifier: -3,
			economicModifier: -2,
			triggerEventIds: ['evt_spanish_armada'],
			customEffect:
				"Acte d'abjuration (1581) : premier acte d'indépendance dans l'histoire moderne. Amsterdam remplace Anvers comme centre financier. La VOC (1602) et la liberté commerciale feront des Provinces-Unies la première puissance économique mondiale.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Philippe II adopte une politique tolérante, les Pays-Bas restent espagnols. Pas de Siècle d'Or néerlandais.",
		},
		historical_outcome:
			"Guillaume d'Orange lance la révolte (1568). Le duc d'Albe fait régner la terreur. Union d'Utrecht (1579). Acte d'abjuration (1581). Assassinat de Guillaume (1584). La guerre dure 80 ans (trêve en 1609, paix en 1648).",
		status: 'pending',
	},

	{
		id: 'evt_battle_lepanto',
		name: 'Bataille de Lépante',
		description:
			'La Sainte Ligue (Espagne, Venise, papauté) bat la flotte ottomane à Lépante (7 octobre 1571). Dernière grande bataille de galères. Victoire symbolique de la chrétienté, mais sans conséquences stratégiques durables.',
		type: 'milestone',
		category: 'military',
		year: 1571,
		yearRange: [1570, 1573],
		affectedNationIds: ['nat_leon', 'nat_venice', 'nat_papal'],
		affectedRegionIds: ['clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_ottoman_peak'],
			customCondition:
				'Les Ottomans doivent avoir conquis Chypre vénitienne (1570). Le pape doit avoir formé une coalition navale chrétienne.',
		},
		effects: {
			militaryModifier: -2,
			prestigeModifier: 3,
			customEffect:
				'40 000 morts au total. 137 galères ottomanes capturées. 12 000 rameurs chrétiens libérés. Mais les Ottomans reconstruisent leur flotte en un an. Chypre reste ottomane. Victoire psychologique plus que stratégique.',
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la Sainte Ligue n'est pas formée, les Ottomans dominent totalement la Méditerranée. Venise perd tous ses comptoirs.",
		},
		historical_outcome:
			"Le 7 octobre 1571, 206 galères chrétiennes battent 230 galères ottomanes dans le golfe de Patras. Cervantès y participe et perd l'usage de sa main gauche. Le Grand Vizir Sokollu : « Nous vous avons coupé un bras ; vous nous avez rasé la barbe ».",
		status: 'pending',
	},

	{
		id: 'evt_potosi_silver',
		name: "Le Potosí et l'afflux d'argent américain",
		description:
			"Le Cerro Rico de Potosí (Bolivie actuelle), découvert en 1545, produit la plus grande quantité d'argent de l'histoire. L'afflux de métaux précieux américains transforme l'économie mondiale et provoque une inflation généralisée.",
		type: 'milestone',
		category: 'economic',
		year: 1545,
		yearRange: [1545, 1600],
		affectedNationIds: ['nat_leon', 'nat_hre', 'nat_venice'],
		affectedRegionIds: [
			'clim_andes_highland',
			'clim_temperate_europe',
			'clim_temperate_europe',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_conquistadors_inca'],
			customCondition:
				"L'Empire inca doit être conquis. Les mines d'argent du Potosí doivent être découvertes et exploitées par le système de la mita (travail forcé).",
		},
		effects: {
			economicModifier: 4,
			populationModifier: -0.05,
			customEffect:
				"Potosí atteint 160 000 habitants (plus grande ville des Amériques). « Révolution des prix » en Europe : inflation de 300 % sur un siècle. L'Espagne ne s'industrialise pas (« maladie hollandaise »). L'argent circule jusqu'en Chine (commerce de la soie).",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le Potosí n'est pas découvert ou si les Incas résistent, l'économie mondiale évolue sans l'afflux d'argent. Pas de révolution des prix.",
		},
		historical_outcome:
			"Entre 1500 et 1800, 150 000 tonnes d'argent et 4 700 tonnes d'or affluent vers l'Europe depuis les Amériques. Le Potosí est la 6e plus grande ville du monde en 1600. 8 millions de travailleurs forcés y périssent.",
		status: 'pending',
	},

	{
		id: 'evt_copernicus_heliocentric',
		name: 'Révolution copernicienne',
		description:
			'Nicolas Copernic publie De Revolutionibus Orbium Coelestium (1543), proposant un modèle héliocentrique : la Terre tourne autour du Soleil. Début de la révolution scientifique.',
		type: 'cultural_shift',
		category: 'cultural',
		year: 1543,
		yearRange: [1543, 1550],
		affectedNationIds: ['nat_hre', 'nat_papal'],
		affectedRegionIds: [
			'clim_continental_east_europe',
			'clim_temperate_europe',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_gutenberg_press', 'evt_italian_renaissance_peak'],
			requiredTechs: ['tech_advanced_astronomy', 'tech_university'],
			customCondition:
				"L'imprimerie doit exister pour diffuser l'ouvrage. La Renaissance et l'humanisme doivent avoir créé un climat intellectuel propice à la remise en question.",
		},
		effects: {
			prestigeModifier: 3,
			religiousTensionModifier: 1,
			techUnlocks: ['tech_heliocentric_model'],
			customEffect:
				"Le géocentrisme ptolémaïque est remis en question. L'Église n'interdit le livre qu'en 1616 (73 ans après publication). Galilée, Kepler et Newton continueront la révolution. La vision du monde est transformée.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la Renaissance n'a pas eu lieu ou si la censure est plus forte, l'héliocentrisme est retardé. La révolution scientifique commence ailleurs.",
		},
		historical_outcome:
			"Copernic publie sur son lit de mort (24 mai 1543). L'impact est lent : peu de gens comprennent les mathématiques. Galilée confirme par observation (1610). L'Église condamne l'héliocentrisme en 1616, réhabilite Galilée en 1992.",
		status: 'pending',
	},

	{
		id: 'evt_safavid_iran',
		name: "Fondation de l'Empire safavide — L'Iran devient chiite",
		description:
			"Ismaïl Ier fonde l'Empire safavide (1501) et impose le chiisme duodécimain comme religion d'État en Iran. Décision qui façonne l'identité iranienne jusqu'à aujourd'hui et crée un fossé durable avec les Ottomans sunnites.",
		type: 'milestone',
		category: 'religious',
		year: 1501,
		yearRange: [1501, 1524],
		affectedNationIds: ['nat_ghaznavid', 'nat_karakhanid'],
		affectedRegionIds: ['clim_arid_mideast', 'clim_central_asia_steppe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_timur_conquests'],
			customCondition:
				"L'Iran doit être fragmenté après les Timourides. Un mouvement soufiste militant (les Qizilbash) doit avoir émergé en Azerbaïdjan.",
		},
		effects: {
			religiousTensionModifier: 4,
			militaryModifier: 2,
			stabilityModifier: 1,
			nationMutations: [
				{
					nationId: 'nat_ghaznavid',
					rename: { name: 'Empire safavide', dempinym: 'Safavide' },
					changeGovernance: 'theocracy',
					changeStateReligion: 'rel_shia',
					removeReligion: 'rel_sunni',
					changeCapital: 'set_tabriz',
					changeRuler: {
						name: 'Ismaïl Ier',
						dynastyName: 'Safavides',
						birthYear: 1487,
						age: 14,
						traits: ['charismatic', 'zealot', 'warrior', 'poet'],
					},
				},
			],
			customEffect:
				"Conversion forcée de l'Iran au chiisme (majoritairement sunnite avant). Création d'un contre-pouvoir face aux Ottomans sunnites. Bataille de Chaldiran (1514) : les Ottomans battent les Safavides. Isfahan deviendra la splendide capitale sous Abbas Ier.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les Safavides n'émergent pas, l'Iran reste sunnite. Pas de fracture sunnite-chiite durable. L'Empire ottoman est moins menacé sur son flanc est.",
		},
		historical_outcome:
			"Ismaïl conquiert Tabriz (1501), se proclame chah. Conversion forcée au chiisme. Défaite à Chaldiran (1514) face à Sélim Ier. L'empire se stabilise. Abbas Ier (1587-1629) crée une armée moderne et fait d'Isfahan une merveille architecturale.",
		status: 'pending',
	},

	{
		id: 'evt_atlantic_slave_trade',
		name: 'Début de la traite atlantique',
		description:
			"Les Portugais commencent à transporter des esclaves africains vers les Amériques (1510s). En quatre siècles, 12.5 millions d'Africains seront déportés. La plus grande migration forcée de l'histoire.",
		type: 'crisis',
		category: 'economic',
		year: 1510,
		yearRange: [1502, 1560],
		affectedNationIds: ['nat_leon', 'nat_ghana', 'nat_swahili_cities'],
		affectedRegionIds: [
			'clim_sahel',
			'clim_tropical_africa',
			'clim_temperate_europe',
			'clim_mesoamerica',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_columbus_discovery'],
			customCondition:
				"Les Amériques doivent être colonisées. La population amérindienne doit être décimée (maladies). Les plantations de sucre doivent nécessiter une main-d'œuvre massive.",
		},
		effects: {
			populationModifier: -0.05,
			economicModifier: 3,
			stabilityModifier: -2,
			customEffect:
				"Triangle commercial : produits manufacturés → Afrique, esclaves → Amériques, sucre/tabac/coton → Europe. Les royaumes africains sont déstabilisés. Le Bénin, le Dahomey et le Congo participent au commerce. Impact démographique catastrophique sur l'Afrique de l'Ouest.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_slave_participate',
				label: 'Participer à la traite',
				description: "Profit économique massif mais crime contre l'humanité.",
				effects: {
					economicModifier: 3,
					stabilityModifier: -1,
				},
			},
			{
				id: 'evt_slave_abstain',
				label: "S'abstenir de la traite",
				description: 'Retard économique relatif mais dignité préservée.',
				effects: {
					economicModifier: -1,
					prestigeModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: false,
			suggestedAlternative:
				"Si les Amériques ne sont pas colonisées ou si la population amérindienne survit, le besoin d'esclaves est moindre. La traite existe à plus petite échelle.",
		},
		historical_outcome:
			"De 1500 à 1900, 12.5 millions d'Africains sont déportés (2 millions meurent pendant la traversée). Le Portugal, puis la Hollande, l'Angleterre et la France dominent le commerce. L'Afrique de l'Ouest perd sa dynamique démographique et politique.",
		status: 'pending',
	},

	{
		id: 'evt_tokugawa_japan',
		name: 'Unification du Japon — Oda, Toyotomi, Tokugawa',
		description:
			'Après un siècle de guerre civile (Sengoku), trois grands unificateurs — Oda Nobunaga, Toyotomi Hideyoshi et Tokugawa Ieyasu — réunifient le Japon. Sekigahara (1600) installe le shogunat Tokugawa.',
		type: 'milestone',
		category: 'political',
		year: 1600,
		yearRange: [1560, 1603],
		affectedNationIds: ['nat_japan'],
		affectedRegionIds: ['clim_hokkaido'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_tale_of_genji'],
			requiredNationsExist: ['nat_japan'],
			customCondition:
				"Le Japon doit avoir traversé la période Sengoku (guerre des clans). L'héritage culturel Heian (Genji) doit nourrir l'identité japonaise. L'adoption des armes à feu (portugaises, 1543) doit avoir transformé la guerre.",
		},
		effects: {
			stabilityModifier: 4,
			militaryModifier: 3,
			economicModifier: 2,
			customEffect:
				'Nobunaga utilise les arquebuses à Nagashino (1575). Hideyoshi unifie le Japon, lance deux invasions de la Corée (1592, 1597). Tokugawa vainc à Sekigahara (1600), installe le shogunat (1603). Le Japon se ferme au monde (sakoku).',
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si le Japon reste fragmenté, pas de shogunat Tokugawa. Le Japon reste ouvert au commerce européen et au christianisme.',
		},
		historical_outcome:
			"Nobunaga (1560-82) brûle l'Enryaku-ji, conquiert le centre du Japon. Assassiné au Honnō-ji. Hideyoshi (1585-98) achève l'unification, envahit la Corée. Tokugawa Ieyasu gagne Sekigahara (1600), fonde le shogunat (1603) qui durera 265 ans.",
		status: 'pending',
	},

	// ========================================================================
	// 1600-1625 — Début du Grand Siècle
	// ========================================================================

	{
		id: 'evt_east_india_companies',
		name: 'Fondation des Compagnies des Indes orientales',
		description:
			"L'Angleterre (1600), les Pays-Bas (1602) puis la France (1604) fondent des compagnies à charte pour le commerce avec l'Asie. La VOC néerlandaise est la première société par actions cotée en bourse. Le capitalisme moderne naît.",
		type: 'milestone',
		category: 'economic',
		year: 1602,
		yearRange: [1600, 1610],
		affectedNationIds: ['nat_england', 'nat_france', 'nat_venice'],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_southeast_asia',
			'clim_south_asia',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_vasco_da_gama'],
			requiredTechs: ['tech_galleon', 'tech_banking_basic'],
			customCondition:
				"La route maritime vers l'Asie doit être établie. Les épices, la soie et le thé doivent être des marchandises hautement rentables.",
		},
		effects: {
			economicModifier: 3,
			stabilityModifier: 1,
			techUnlocks: ['tech_joint_stock_company'],
			customEffect:
				'La VOC émet les premières actions boursières (Amsterdam, 1602). Les compagnies reçoivent le monopole du commerce, le droit de lever des armées et de signer des traités. Elles deviennent des quasi-États. Le commerce des épices passe des mains portugaises aux mains néerlandaises.',
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_eic_invest',
				label: 'Investir dans la compagnie',
				description:
					'Acheter des actions. Risque élevé, profit potentiel énorme.',
				effects: { economicModifier: 2 },
			},
			{
				id: 'evt_eic_compete',
				label: 'Développer un commerce indépendant',
				description:
					'Tenter de concurrencer les compagnies à charte — dangereux.',
				effects: { economicModifier: 1, stabilityModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les Portugais gardent le monopole asiatique, les compagnies du nord se concentrent sur les Amériques.',
		},
		historical_outcome:
			"La VOC néerlandaise domine le commerce asiatique pendant 200 ans. L'EIC britannique finira par contrôler l'Inde entière. Ces compagnies sont le berceau du capitalisme actionnarial, de la finance moderne et du colonialisme commercial.",
		status: 'pending',
	},

	{
		id: 'evt_jamestown_quebec',
		name: "Colonisation de l'Amérique du Nord — Jamestown & Québec",
		description:
			"Les Anglais fondent Jamestown (1607) en Virginie et les Français fondent Québec (1608). Début de la colonisation permanente de l'Amérique du Nord par les puissances européennes.",
		type: 'milestone',
		category: 'political',
		year: 1607,
		yearRange: [1607, 1620],
		affectedNationIds: [
			'nat_england',
			'nat_france',
			'nat_mikmaq',
			'nat_beothuk',
		],
		affectedRegionIds: ['clim_northeast_america', 'clim_mississippi_valley'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_columbus_discovery'],
			customCondition:
				"L'Amérique doit être connue. Les puissances coloniales doivent chercher de nouvelles sources de richesse et de terres.",
		},
		effects: {
			populationModifier: -0.03,
			economicModifier: 2,
			stabilityModifier: -1,
			customEffect:
				"Les colons anglais arrivent mal préparés — la moitié meurt le premier hiver. Le commerce des fourrures avec les peuples autochtones est vital. Les Français s'allient aux Hurons, les Anglais aux Iroquois. Les maladies européennes dévastent les populations locales.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les nations amérindiennes résistent efficacement, la colonisation reste côtière et limitée. La traite des fourrures peut fonctionner comme commerce entre égaux.',
		},
		historical_outcome:
			'Jamestown survit grâce au tabac (1612). Québec devient la base de la Nouvelle-France. Les Pays-Bas fondent la Nouvelle-Amsterdam (1626). En 50 ans, la côte est est colonisée. Les peuples autochtones perdent 90 % de leur population à cause des maladies européennes.',
		status: 'pending',
	},

	{
		id: 'evt_galileo_trial',
		name: 'Galilée et la révolution copernicienne',
		description:
			"Galilée publie le Dialogue sur les deux grands systèmes du monde (1632), défendant l'héliocentrisme de Copernic. L'Inquisition le condamne. La science moderne s'oppose à l'autorité de l'Église.",
		type: 'milestone',
		category: 'scientific',
		year: 1632,
		yearRange: [1610, 1642],
		affectedNationIds: ['nat_papal', 'nat_venice'],
		affectedRegionIds: ['clim_mediterranean'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_copernicus_heliocentric'],
			requiredTechs: ['tech_heliocentric_model'],
			customCondition:
				"L'héliocentrisme doit avoir été publié (Copernic, 1543). Le télescope doit exister (Galilée l'améliore en 1609).",
		},
		effects: {
			religiousTensionModifier: 2,
			prestigeModifier: 2,
			techUnlocks: ['tech_telescope', 'tech_scientific_method'],
			customEffect:
				"Galilée observe les lunes de Jupiter (1610), les phases de Vénus — preuves de l'héliocentrisme. L'Église condamne l'héliocentrisme (1616) puis Galilée (1633). « Eppur si muove ». La méthode scientifique expérimentale s'impose progressivement.",
		},
		severity: 6,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_galileo_support_science',
				label: 'Soutenir la nouvelle science',
				description:
					"Promouvoir l'observation et l'expérimentation contre le dogme.",
				effects: { prestigeModifier: 2, religiousTensionModifier: 1 },
			},
			{
				id: 'evt_galileo_support_church',
				label: "Défendre l'autorité de l'Église",
				description: 'La Bible est la vérité. Les savants sont dangereux.',
				effects: { religiousTensionModifier: -1, prestigeModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Église accepte l'héliocentrisme plus tôt, la révolution scientifique s'accélère. Si Galilée est exécuté, un effet dissuasif retarde la science d'une génération.",
		},
		historical_outcome:
			"Galilée est condamné à la résidence surveillée à vie (1633). Son Dialogue est interdit. Mais l'héliocentrisme triomphe — Kepler, puis Newton achèveront la révolution. Le Vatican réhabilite Galilée en... 1992.",
		status: 'pending',
	},

	// ========================================================================
	// 1618-1648 — Guerre de Trente Ans
	// ========================================================================

	{
		id: 'evt_thirty_years_war',
		name: 'Guerre de Trente Ans',
		description:
			"Le conflit le plus dévastateur en Europe avant les guerres mondiales. Commencé comme une guerre de religion en Bohême, il se transforme en conflit géopolitique impliquant la quasi-totalité de l'Europe. L'Allemagne perd un tiers de sa population.",
		type: 'crisis',
		category: 'military',
		year: 1618,
		yearRange: [1618, 1648],
		affectedNationIds: [
			'nat_hre',
			'nat_france',
			'nat_sweden',
			'nat_denmark',
			'nat_leon',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
		],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: [
				'evt_protestant_reformation',
				'evt_augsburg_peace',
				'evt_council_trent',
			],
			customCondition:
				"La Réforme doit avoir divisé l'Empire. La paix d'Augsbourg doit avoir échoué à résoudre durablement la tension confessionnelle. La défenestration de Prague (1618) est l'étincelle.",
		},
		effects: {
			populationModifier: -0.15,
			stabilityModifier: -4,
			economicModifier: -3,
			militaryModifier: 3,
			customEffect:
				"Phase bohémienne (1618-25), danoise (1625-29), suédoise (1630-35), française (1635-48). L'Allemagne perd 8 millions d'habitants. Les armées de mercenaires vivent sur le pays — pillages, famines, épidémies. La population de certaines régions chute de 50-70 %.",
			triggerEventIds: ['evt_westphalia'],
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_30yr_protestant',
				label: 'Rejoindre le camp protestant',
				description: "S'allier à la Suède et aux princes protestants.",
				effects: { militaryModifier: 1, religiousTensionModifier: 2 },
			},
			{
				id: 'evt_30yr_catholic',
				label: 'Rejoindre le camp catholique / impérial',
				description: "Soutenir l'Empereur et la Contre-Réforme.",
				effects: { militaryModifier: 1, religiousTensionModifier: 2 },
			},
			{
				id: 'evt_30yr_neutral',
				label: 'Rester neutre',
				description:
					'Difficile — les armées passent quand même. Mais moins de pertes.',
				effects: { stabilityModifier: 1, economicModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la paix d'Augsbourg tient, la guerre peut être évitée ou réduite à un conflit bohémien local. Si la France n'intervient pas, la guerre finit plus tôt avec une victoire impériale.",
		},
		historical_outcome:
			"La guerre dévaste le Saint-Empire pendant 30 ans. La Suède de Gustave Adolphe intervient (1630), puis la France de Richelieu (1635). Le conflit se termine par les traités de Westphalie (1648) qui redessinent l'Europe.",
		status: 'pending',
	},

	{
		id: 'evt_westphalia',
		name: 'Traités de Westphalie',
		description:
			"Les traités d'Osnabrück et de Münster mettent fin à la guerre de Trente Ans et à la guerre de Quatre-Vingts Ans (indépendance des Pays-Bas). Ils fondent le système international moderne basé sur la souveraineté des États.",
		type: 'milestone',
		category: 'political',
		year: 1648,
		yearRange: [1645, 1648],
		affectedNationIds: ['nat_hre', 'nat_france', 'nat_sweden', 'nat_leon'],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_thirty_years_war'],
			customCondition:
				"La guerre de Trente Ans doit avoir épuisé tous les belligérants. Aucun camp ne peut l'emporter militairement. La négociation s'impose.",
		},
		effects: {
			stabilityModifier: 3,
			religiousTensionModifier: -3,
			customEffect:
				"Fin du rêve d'un Empire universel chrétien. Souveraineté des 300+ États allemands confirmée. Les Pays-Bas et la Suisse sont indépendants. Le calvinisme est reconnu. La France et la Suède sont les arbitres de l'Europe. Naissance du droit international.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: false,
			suggestedAlternative:
				"Si un camp gagne la guerre, pas de compromis westphalien. Un Empire catholique restauré ou une fragmentation encore plus grande de l'Allemagne.",
		},
		historical_outcome:
			"Les traités de Westphalie (24 octobre 1648) créent le système d'États souverains qui régit encore les relations internationales. L'Empereur est affaibli, la France émerge comme première puissance européenne, les Pays-Bas sont à leur Âge d'Or.",
		status: 'pending',
	},

	// ========================================================================
	// 1640-1660 — Révolutions et guerres civiles
	// ========================================================================

	{
		id: 'evt_english_civil_war',
		name: 'Guerre civile anglaise & exécution de Charles Ier',
		description:
			"Le conflit entre le roi Charles Ier et le Parlement éclate en guerre civile (1642). Les Roundheads d'Oliver Cromwell l'emportent. Le roi est jugé et décapité (1649) — un choc pour toute l'Europe monarchique.",
		type: 'crisis',
		category: 'political',
		year: 1642,
		yearRange: [1642, 1651],
		affectedNationIds: ['nat_england', 'nat_scotland'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_magna_carta', 'evt_westphalia'],
			customCondition:
				"L'Angleterre doit avoir un conflit croissant entre pouvoir royal et pouvoir parlementaire (héritage de la Magna Carta). La Paix de Westphalie doit avoir affirmé la souveraineté des États. Les tensions religieuses (puritains vs anglicans) et fiscales doivent être aiguës.",
		},
		effects: {
			stabilityModifier: -3,
			militaryModifier: 2,
			populationModifier: -0.03,
			nationMutations: [
				{
					nationId: 'nat_england',
					rename: { name: "Commonwealth d'Angleterre", dempinym: 'Anglais' },
					changeGovernance: 'republic',
					changeRuler: {
						name: 'Oliver Cromwell',
						dynastyName: 'Cromwell',
						birthYear: 1599,
						age: 43,
						traits: ['puritan', 'military_genius', 'ruthless', 'republican'],
					},
				},
			],
			customEffect:
				"Guerre civile : Cavaliers (royalistes) vs Roundheads (parlementaires). Cromwell crée la New Model Army. Batailles de Marston Moor (1644), Naseby (1645). Charles exécuté le 30 janvier 1649. Le Commonwealth (république) est proclamé. L'Irlande et l'Écosse sont conquises brutalement.",
			triggerEventIds: ['evt_glorious_revolution'],
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_ecw_royalist',
				label: 'Soutenir le roi',
				description: "L'ordre divin fait le roi. La rébellion est sacrilège.",
				effects: { stabilityModifier: -1, prestigeModifier: 1 },
			},
			{
				id: 'evt_ecw_parliament',
				label: 'Soutenir le Parlement',
				description:
					'Le roi ne peut gouverner sans le consentement des représentants.',
				effects: { stabilityModifier: -1, economicModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Charles Ier fait des concessions, la guerre civile peut être évitée. Si Cromwell perd, la monarchie absolue s'installe en Angleterre.",
		},
		historical_outcome:
			"Charles Ier est exécuté (1649). L'Angleterre devient une république sous Cromwell, puis un Protectorat (1653). Cromwell meurt (1658). La monarchie est restaurée avec Charles II (1660). Mais le principe est posé : le roi ne règne pas seul.",
		status: 'pending',
	},

	{
		id: 'evt_dutch_golden_age',
		name: "Âge d'or néerlandais",
		description:
			'Les Provinces-Unies deviennent la première puissance économique mondiale. Amsterdam est le centre financier du monde. La peinture (Rembrandt, Vermeer), la science (Huygens, Leeuwenhoek) et la tolérance religieuse rayonnent.',
		type: 'cultural_shift',
		category: 'cultural',
		year: 1620,
		yearRange: [1600, 1670],
		affectedNationIds: ['nat_venice'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_dutch_revolt'],
			requiredTechs: ['tech_double_entry_bookkeeping', 'tech_printing_press'],
			customCondition:
				"Les Pays-Bas doivent être indépendants (ou en voie d'indépendance). Le commerce maritime doit être développé. La tolérance religieuse attire les réfugiés et les talents.",
		},
		effects: {
			economicModifier: 3,
			prestigeModifier: 3,
			techUnlocks: ['tech_microscope'],
			customEffect:
				"La VOC domine le commerce mondial. La Bourse d'Amsterdam invente les produits dérivés. Tulipomanie (1637) — première bulle spéculative. Rembrandt peint La Ronde de nuit (1642). Tolérance envers juifs, huguenots, dissidents. Population passe de 1.5 à 2 millions.",
		},
		severity: 6,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'indépendance néerlandaise échoue, l'Âge d'or n'a pas lieu. Anvers (espagnol) reste le centre financier. Amsterdam reste un port mineur.",
		},
		historical_outcome:
			"Les Pays-Bas dominent le commerce mondial pendant 80 ans. La VOC contrôle les Moluques, Ceylan, le Cap, Formose. La Tulipomanie (1637) est la première bulle spéculative. L'Âge d'or décline après les guerres anglo-néerlandaises et l'invasion française de 1672.",
		status: 'pending',
	},

	// ========================================================================
	// 1643-1715 — Le Roi-Soleil
	// ========================================================================

	{
		id: 'evt_louis_xiv',
		name: "Règne de Louis XIV — L'absolutisme français",
		description:
			"Louis XIV règne 72 ans (1643-1715), le plus long règne d'Europe. Il incarne l'absolutisme monarchique : « L'État, c'est moi ». Versailles, les guerres de conquête, la révocation de l'Édit de Nantes — la France domine l'Europe.",
		type: 'milestone',
		category: 'political',
		year: 1661,
		yearRange: [1643, 1715],
		affectedNationIds: ['nat_france'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_westphalia'],
			customCondition:
				'La France doit exister comme monarchie centralisée. Westphalie doit avoir redessiné l’ordre européen. La Fronde (1648-53) doit avoir échoué, renforçant le pouvoir royal. Mazarin doit avoir préparé le terrain.',
		},
		effects: {
			militaryModifier: 3,
			prestigeModifier: 3,
			economicModifier: 2,
			stabilityModifier: 1,
			customEffect:
				"Colbert organise l'économie (mercantilisme). Vauban fortifie les frontières. Versailles, symbol de l'absolutisme, coûte une fortune. Guerres de Dévolution, de Hollande, de la Ligue d'Augsbourg, de Succession d'Espagne. La France a 20 millions d'habitants — de loin la plus peuplée d'Europe.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la Fronde réussit, la noblesse garde du pouvoir. Si Louis XIV meurt jeune, la France reste décentralisée. L'Angleterre ou les Pays-Bas dominent le XVIIe siècle.",
		},
		historical_outcome:
			"Louis XIV gouverne personnellement à partir de 1661. Versailles (1682). Révocation de l'Édit de Nantes (1685) — 200,000 huguenots fuient. Quatre guerres majeures épuisent les finances. À sa mort (1715), la France est glorieuse mais ruinée.",
		status: 'pending',
	},

	{
		id: 'evt_revocation_edict_nantes',
		name: "Révocation de l'Édit de Nantes",
		description:
			"Louis XIV révoque l'Édit de Nantes (1598) qui garantissait la liberté de culte aux protestants. Les dragonnades forcent les conversions. 200 000 huguenots fuient vers la Hollande, l'Angleterre, la Prusse et l'Amérique.",
		type: 'crisis',
		category: 'religious',
		year: 1685,
		yearRange: [1681, 1685],
		affectedNationIds: ['nat_france', 'nat_england'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_louis_xiv', 'evt_french_wars_of_religion'],
			customCondition:
				"Louis XIV doit avoir instauré l'absolutisme. La pression de l'Église catholique et des dévots doit être forte. Les dragonnades (violences contre les protestants) commencent en 1681.",
		},
		effects: {
			religiousTensionModifier: 3,
			economicModifier: -2,
			populationModifier: -0.01,
			customEffect:
				"200 000 huguenots émigrent, emportant compétences, capitaux et réseaux commerciaux. Berlin, Amsterdam, Londres en profitent. L'industrie textile et horlogère française est amputée. Les dragonnades terrorisent les campagnes du Midi.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_ren_convert',
				label: 'Se convertir au catholicisme',
				description: 'Sauver ses biens et sa vie. Mais renier sa foi.',
				effects: { stabilityModifier: 1, religiousTensionModifier: -1 },
			},
			{
				id: 'evt_ren_flee',
				label: "Fuir à l'étranger",
				description: 'Tout perdre en France mais garder sa foi et recommencer.',
				effects: { economicModifier: -2, religiousTensionModifier: -1 },
			},
			{
				id: 'evt_ren_resist',
				label: 'Résister clandestinement',
				description: 'Culte au « Désert ». Peine de galères si découvert.',
				effects: { prestigeModifier: 1, stabilityModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Louis XIV est plus tolérant ou si les protestants sont plus nombreux, l'édit n'est pas révoqué. La France conserve sa diaspora productive.",
		},
		historical_outcome:
			"L'Édit de Fontainebleau (1685) révoque l'Édit de Nantes. Les temples sont détruits, les pasteurs bannis, l'émigration interdite (mais 200 000 partent quand même). Les Cévennes se soulèvent (Camisards, 1702-04). La France perd une partie de son élite économique.",
		status: 'pending',
	},

	// ========================================================================
	// 1660-1690 — Empire ottoman, Moghole, Qing
	// ========================================================================

	{
		id: 'evt_siege_vienna_1683',
		name: "Second siège de Vienne — Arrêt de l'expansion ottomane",
		description:
			"L'armée ottomane de Kara Mustafa assiège Vienne (1683). L'armée de secours du roi de Pologne Jean III Sobieski charge les Turcs. La défaite ottomane marque le début du reflux de l'Empire ottoman en Europe.",
		type: 'crisis',
		category: 'military',
		year: 1683,
		yearRange: [1683, 1699],
		affectedNationIds: ['nat_hre', 'nat_hungary', 'nat_poland'],
		affectedRegionIds: ['clim_continental_east_europe', 'clim_arid_mideast'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_ottoman_peak'],
			customCondition:
				"L'Empire ottoman doit encore être une puissance majeure. L'Autriche des Habsbourg doit contrôler Vienne. Le grand vizir doit avoir l'ambition de prendre la ville.",
		},
		effects: {
			militaryModifier: -2,
			stabilityModifier: -2,
			customEffect:
				"Sobieski charge avec 18 000 cavaliers — la plus grande charge de cavalerie de l'histoire. Kara Mustafa est exécuté. Le traité de Karlowitz (1699) : l'Empire ottoman cède la Hongrie, la Transylvanie et la plupart des Balkans. Début du long déclin ottoman.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Vienne tombe, l'Empire ottoman domine l'Europe centrale. La route vers l'Italie et le Rhin est ouverte. L'équilibre européen est bouleversé.",
		},
		historical_outcome:
			"La bataille de Vienne (12 septembre 1683) est suivie d'une contre-offensive autrichienne. Le traité de Karlowitz (1699) transfère la Hongrie aux Habsbourg. L'Empire ottoman se stabilise mais ne progressera plus en Europe. Le XVIIIe siècle sera celui du déclin.",
		status: 'pending',
	},

	{
		id: 'evt_mughal_peak',
		name: "Apogée de l'Empire moghol — Aurangzeb",
		description:
			"Sous Aurangzeb (r. 1658-1707), l'Empire moghol atteint son extension maximale, contrôlant presque tout le sous-continent indien. Mais sa politique d'intolérance religieuse sème les graines de la désintégration.",
		type: 'milestone',
		category: 'political',
		year: 1658,
		yearRange: [1658, 1707],
		affectedNationIds: ['nat_ghaznavid'],
		affectedRegionIds: ['clim_south_asia'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_mughal_foundation'],
			customCondition:
				"L'Empire moghol doit exister et avoir prospéré sous Akbar et Shah Jahan. Le Taj Mahal doit avoir été construit (1632-53).",
		},
		effects: {
			militaryModifier: 2,
			economicModifier: 1,
			religiousTensionModifier: 3,
			stabilityModifier: -2,
			customEffect:
				"Aurangzeb conquiert le Deccan (30 ans de guerre). Il réimpose la jizya sur les hindous. Les Marathes de Shivaji se soulèvent. Les Sikhs sont persécutés. L'Empire est immense mais ingouvernable. À la mort d'Aurangzeb, la fragmentation commence.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Aurangzeb poursuit la politique de tolérance d'Akbar, l'Empire moghol reste stable plus longtemps. Les Marathes ne se soulèvent pas.",
		},
		historical_outcome:
			"Aurangzeb étend l'Empire au maximum (150 millions de sujets, 25 % du PIB mondial) mais l'épuise. Après sa mort (1707), les Marathes, les Sikhs et les Britanniques dépècent l'Empire. En 1757, la bataille de Plassey donne l'Inde aux Britanniques.",
		status: 'pending',
	},

	{
		id: 'evt_qing_dynasty',
		name: 'Chute des Ming, avènement des Qing',
		description:
			"La dynastie Ming s'effondre sous les révoltes paysannes et l'invasion mandchoue. Les Mandchous fondent la dynastie Qing (1644) qui régnera jusqu'en 1912. La Chine connaît un siècle de prospérité sous Kangxi.",
		type: 'political',
		category: 'political',
		year: 1644,
		yearRange: [1636, 1683],
		affectedNationIds: ['nat_song'],
		affectedRegionIds: ['clim_east_asia', 'clim_east_asia_steppe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_zheng_he_voyages'],
			customCondition:
				'La Chine doit être sous la dynastie Ming. L’isolationnisme post-Zheng He doit avoir affaibli la dynastie. Les révoltes paysannes (Li Zicheng) et la pression mandchoue au nord doivent avoir affaibli le pouvoir central. Le Petit Âge glaciaire cause des famines.',
		},
		effects: {
			stabilityModifier: -3,
			populationModifier: -0.05,
			militaryModifier: 2,
			nationMutations: [
				{
					nationId: 'nat_song',
					rename: { name: 'Dynastie Qing', dempinym: 'Qing' },
					changeRuler: {
						name: 'Shunzhi',
						dynastyName: 'Aisin Gioro (Qing)',
						birthYear: 1638,
						age: 6,
						traits: ['young', 'reformer'],
					},
					addLanguage: { languageId: 'lang_manchu', percentage: 0.05 },
				},
			],
			customEffect:
				"Li Zicheng prend Pékin (1644). Le dernier empereur Ming se pend. Le général Wu Sangui ouvre la Grande Muraille aux Mandchous. Les Qing prennent le pouvoir, imposent la natte. Résistance des Ming du Sud. Taïwan conquis en 1683. Kangxi (r. 1661-1722) stabilise l'Empire.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les Ming survivent, la Chine poursuit sa trajectoire. Si la transition est pacifique, moins de pertes démographiques. Si les Mandchous échouent, une dynastie chinoise remplace les Ming.',
		},
		historical_outcome:
			'La transition Ming-Qing coûte 25 millions de morts. Les Qing imposent le port de la natte sous peine de mort. Mais Kangxi (r. 1661-1722) est un des plus grands empereurs chinois : il vainc les Trois Feudataires, prend Taïwan, signe le traité de Nertchinsk avec la Russie (1689).',
		status: 'pending',
	},

	// ========================================================================
	// 1688-1700 — Fin du XVIIe siècle
	// ========================================================================

	{
		id: 'evt_glorious_revolution',
		name: 'Glorieuse Révolution & Bill of Rights',
		description:
			"Guillaume d'Orange débarque en Angleterre (1688). Jacques II fuit. Le Parlement invite Guillaume et Marie à régner sous conditions. Le Bill of Rights (1689) pose les bases de la monarchie constitutionnelle.",
		type: 'political',
		category: 'political',
		year: 1688,
		yearRange: [1688, 1689],
		affectedNationIds: ['nat_england', 'nat_scotland'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_english_civil_war'],
			customCondition:
				"Jacques II doit être catholique et autoritaire. Le Parlement doit craindre un retour à l'absolutisme. Guillaume d'Orange doit être disponible comme candidat protestant.",
		},
		effects: {
			stabilityModifier: 2,
			economicModifier: 1,
			nationMutations: [
				{
					nationId: 'nat_england',
					rename: {
						name: 'Royaume de Grande-Bretagne',
						dempinym: 'Britannique',
					},
					changeGovernance: 'feudal_monarchy',
					changeRuler: {
						name: "Guillaume III d'Orange",
						dynastyName: 'Orange-Nassau',
						birthYear: 1650,
						age: 38,
						traits: ['protestant', 'strategic', 'pragmatic', 'reserved'],
					},
				},
			],
			customEffect:
				"Bill of Rights : pas de taxation sans le Parlement, élections libres, pas d'armée permanente sans accord parlementaire, liberté de pétition. Habeas Corpus renforcé. Tolérance religieuse (pour les protestants). La Bank of England sera fondée en 1694. Modèle pour les révolutions futures.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Jacques II résiste, guerre civile. Si Guillaume échoue, l'Angleterre reste catholique et absolutiste — alliance avec Louis XIV au lieu de l'opposer.",
		},
		historical_outcome:
			"La Glorieuse Révolution est « sans effusion de sang » en Angleterre (mais sanglante en Irlande — bataille de la Boyne, 1690). Le Bill of Rights inspire la Déclaration d'indépendance américaine et la Déclaration des droits de l'homme. L'Angleterre devient le modèle du parlementarisme.",
		status: 'pending',
	},

	{
		id: 'evt_newton_principia',
		name: 'Newton — Principia Mathematica',
		description:
			'Isaac Newton publie les Philosophiæ Naturalis Principia Mathematica (1687). Les lois de la gravitation et du mouvement unifient la physique terrestre et céleste. La révolution scientifique triomphe.',
		type: 'milestone',
		category: 'scientific',
		year: 1687,
		yearRange: [1687, 1690],
		affectedNationIds: ['nat_england'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_galileo_trial', 'evt_copernicus_heliocentric'],
			requiredTechs: ['tech_telescope', 'tech_scientific_method'],
			customCondition:
				"L'héliocentrisme doit être accepté dans les milieux scientifiques. Les travaux de Kepler (orbites elliptiques) et Galilée (mécanique) doivent exister.",
		},
		effects: {
			prestigeModifier: 3,
			techUnlocks: ['tech_newtonian_mechanics', 'tech_calculus'],
			customEffect:
				"Les trois lois du mouvement et la loi de la gravitation universelle. La lumière est un spectre. Le calcul infinitésimal (inventé en parallèle par Leibniz). Newton devient président de la Royal Society. La physique newtonienne règne 200 ans — jusqu'à Einstein.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: false,
			suggestedAlternative:
				'Si Newton ne publie pas (il hésite longtemps), Leibniz ou Hooke avancent les mêmes idées plus lentement. Le progrès scientifique est retardé de 20-30 ans.',
		},
		historical_outcome:
			"Les Principia sont publiés grâce à l'insistance d'Edmond Halley qui finance l'impression. Newton unifie la physique. Le calcul infinitésimal transforme les mathématiques. Voltaire diffuse Newton en France. L'ère des Lumières peut commencer.",
		status: 'pending',
	},

	{
		id: 'evt_kingdom_kongo_decline',
		name: "Déclin du Royaume du Kongo — Bataille d'Ambuila",
		description:
			"La bataille d'Ambuila (1665) voit la défaite catastrophique du Royaume du Kongo face aux Portugais. Le roi António Ier est tué. Le royaume se fragmente, affaibli par la traite négrière et l'ingérence portugaise.",
		type: 'crisis',
		category: 'military',
		year: 1665,
		yearRange: [1660, 1680],
		affectedNationIds: ['nat_ghana'],
		affectedRegionIds: ['clim_tropical_africa', 'clim_congo_rainforest'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_atlantic_slave_trade'],
			customCondition:
				'La traite négrière doit affaiblir les royaumes côtiers africains. Le Portugal doit avoir une présence coloniale en Angola.',
		},
		effects: {
			stabilityModifier: -3,
			populationModifier: -0.03,
			militaryModifier: -2,
			customEffect:
				'Le roi meurt au combat. Le royaume se fragmente en factions rivales. Les Portugais exploitent la guerre civile pour intensifier la traite. Le Kongo ne retrouvera jamais son unité. Le christianisme kongolais syncrétique produit des mouvements prophétiques (Kimpa Vita, 1704).',
		},
		severity: 6,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le Kongo gagne à Ambuila, il résiste à l'influence portugaise. Un royaume centralisé en Afrique centrale change la dynamique de la traite.",
		},
		historical_outcome:
			"Après Ambuila (1665), le Kongo se divise en duchés rivaux. Les Portugais depuis Luanda contrôlent le commerce d'esclaves. Kimpa Vita tente une restauration religieuse (1704) mais est brûlée vive. Le Kongo devient un fournisseur majeur de la traite transatlantique.",
		status: 'pending',
	},

	{
		id: 'evt_great_turkish_war',
		name: 'Grande Guerre turque — Traité de Karlowitz',
		description:
			"La Sainte-Ligue (Autriche, Pologne, Venise, Russie) lance une contre-offensive contre l'Empire ottoman. Le traité de Karlowitz (1699) marque le premier grand recul territorial ottoman en Europe.",
		type: 'crisis',
		category: 'military',
		year: 1699,
		yearRange: [1683, 1699],
		affectedNationIds: [
			'nat_hre',
			'nat_hungary',
			'nat_poland',
			'nat_venice',
			'nat_kievan_rus',
		],
		affectedRegionIds: [
			'clim_continental_east_europe',
			'clim_mediterranean',
			'clim_arid_mideast',
		],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_siege_vienna_1683'],
			customCondition:
				"La défaite ottomane à Vienne doit avoir encouragé une coalition chrétienne. L'Autriche doit être assez forte pour mener la contre-offensive.",
		},
		effects: {
			militaryModifier: -2,
			stabilityModifier: -1,
			customEffect:
				"Reconquête de la Hongrie (1686, Budapest). Victoire de Zenta (1697, Eugène de Savoie). Karlowitz : l'Empire ottoman cède la Hongrie, la Transylvanie, la Slavonie et la Morée. La Russie obtient Azov. Le Péloponnèse à Venise. L'Empire ottoman recule pour la première fois.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Empire ottoman se réforme à temps, la perte territoriale est limitée. Si la coalition chrétienne se divise (probable), l'offensive ralentit.",
		},
		historical_outcome:
			"Le traité de Karlowitz (1699) est la première grande cession territoriale ottomane. La Hongrie et la Transylvanie passent aux Habsbourg. L'Empire ottoman entre dans une longue période de stagnation et de réformes avortées. L'Autriche émerge comme grande puissance.",
		status: 'pending',
	},

	{
		id: 'evt_peter_great_modernization',
		name: 'Pierre le Grand — Modernisation de la Russie',
		description:
			"Pierre Ier (r. 1682-1725) transforme la Russie d'un État médiéval en puissance européenne. Il voyage en Europe incognito, fonde Saint-Pétersbourg (1703), réforme l'armée, la marine, l'administration, et force les boyards à se raser la barbe.",
		type: 'milestone',
		category: 'political',
		year: 1700,
		yearRange: [1689, 1725],
		affectedNationIds: ['nat_kievan_rus'],
		affectedRegionIds: ['clim_continental_east_europe', 'clim_subarctic'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_moscow_rise'],
			customCondition:
				'La Russie doit être un État centralisé autour de Moscou. Pierre doit avoir voyagé en Europe (Grande Ambassade, 1697-98) et constaté le retard russe.',
		},
		effects: {
			militaryModifier: 3,
			economicModifier: 2,
			prestigeModifier: 2,
			stabilityModifier: -1,
			nationMutations: [
				{
					nationId: 'nat_kievan_rus',
					rename: { name: 'Empire russe', dempinym: 'Russe' },
					changeGovernance: 'absolute_monarchy',
					changeCapital: 'set_saint_petersburg',
					changeRuler: {
						name: 'Pierre Ier le Grand',
						dynastyName: 'Romanov',
						birthYear: 1672,
						age: 28,
						traits: ['reformer', 'ruthless', 'visionary', 'workaholic'],
					},
					addLanguage: { languageId: 'lang_old_french', percentage: 0.05 },
				},
			],
			customEffect:
				"Saint-Pétersbourg est construite sur des marais (100 000 morts pendant la construction). Table des rangs (1722) — méritocratie. Marine de guerre créée ex nihilo. L'alphabet est réformé. Le calendrier julien adopté. Les boyards doivent porter des vêtements européens. Résistance féroce des traditionalistes et des streltsy.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Pierre meurt jeune ou si les streltsy gagnent, la Russie reste un État fermé et médiéval. Pas de Saint-Pétersbourg, pas de marine, pas d'ouverture sur la Baltique.",
		},
		historical_outcome:
			'Pierre vainc la Suède à Poltava (1709), obtient la Baltique (traité de Nystad, 1721). Saint-Pétersbourg est la nouvelle capitale. La Russie entre dans le concert européen. Mais la modernisation est imposée par la violence — le fils de Pierre, Alexis, est torturé et meurt en prison (1718).',
		status: 'pending',
	},

	{
		id: 'evt_salem_witch_trials',
		name: 'Procès des sorcières de Salem',
		description:
			"Dans le Massachusetts colonial, une hystérie collective mène à l'accusation de sorcellerie contre plus de 200 personnes. 20 sont exécutées. L'épisode illustre les dangers du puritanisme, de la délation et de la justice expéditive.",
		type: 'crisis',
		category: 'religious',
		year: 1692,
		yearRange: [1692, 1693],
		affectedNationIds: ['nat_england'],
		affectedRegionIds: ['clim_northeast_america'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_jamestown_quebec'],
			customCondition:
				'Les colonies puritaines de Nouvelle-Angleterre doivent exister. La tension religieuse, la peur des Amérindiens et les conflits fonciers créent un climat de paranoïa.',
		},
		effects: {
			stabilityModifier: -2,
			religiousTensionModifier: 2,
			customEffect:
				"200 accusés, 30 condamnés, 19 pendus, 1 pressé à mort. Des familles détruites. La communauté est traumatisée. L'affaire contribue à long terme à la séparation de l'Église et de l'État dans les colonies américaines.",
		},
		severity: 4,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_salem_accuse',
				label: 'Joindre les accusateurs',
				description: 'La sorcellerie est réelle. Protéger la communauté.',
				effects: { prestigeModifier: 1, religiousTensionModifier: 1 },
			},
			{
				id: 'evt_salem_defend',
				label: 'Défendre les accusés',
				description:
					"Risquer d'être accusé soi-même. C'est de la folie collective.",
				effects: { prestigeModifier: -1, stabilityModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les autorités coloniales interviennent plus tôt, l'hystérie est contenue. Le gouverneur Phips finit par arrêter les procès dans la réalité historique.",
		},
		historical_outcome:
			"Les procès de Salem (1692) durent de février à octobre. Le gouverneur Phips dissout le tribunal. Les juges et accusateurs expriment plus tard des regrets publics. L'affaire inspire Arthur Miller (Les Sorcières de Salem, 1953) comme allégorie du mccarthysme.",
		status: 'pending',
	},

	{
		id: 'evt_war_spanish_succession',
		name: "Guerre de Succession d'Espagne",
		description:
			"Charles II d'Espagne meurt sans héritier (1700). Louis XIV place son petit-fils Philippe d'Anjou sur le trône. L'Europe entière s'unit contre la menace d'une union franco-espagnole. 13 ans de guerre.",
		type: 'crisis',
		category: 'military',
		year: 1700,
		yearRange: [1700, 1714],
		affectedNationIds: ['nat_france', 'nat_leon', 'nat_hre', 'nat_england'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_mediterranean'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_louis_xiv'],
			customCondition:
				"L'Espagne doit être en déclin et sans héritier direct. Louis XIV doit avoir l'ambition de placer un Bourbon sur le trône d'Espagne. L'Angleterre et l'Autriche doivent s'y opposer.",
		},
		effects: {
			militaryModifier: 2,
			economicModifier: -2,
			populationModifier: -0.02,
			customEffect:
				"Marlborough vainc à Blenheim (1704), Ramillies (1706), Oudenarde (1708). Eugène de Savoie bat les Français en Italie. Mais la France résiste. Le traité d'Utrecht (1713) : Philippe V garde l'Espagne mais renonce à la couronne de France. Gibraltar à l'Angleterre. L'Angleterre émerge comme puissance mondiale.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Charles II a un héritier, pas de guerre. Si Louis XIV n'accepte pas le testament, l'Autriche prend l'Espagne. Si la France gagne, l'hégémonie franco-espagnole domine l'Europe.",
		},
		historical_outcome:
			"Le traité d'Utrecht (1713) redessine l'Europe. L'Espagne perd les Pays-Bas et l'Italie. La France est épuisée. L'Angleterre obtient Gibraltar, Minorque, Terre-Neuve et l'asiento (monopole de la traite négrière vers l'Amérique espagnole). L'équilibre des puissances s'installe.",
		status: 'pending',
	},

	// ========================================================================
	// 1700 – 1800 : Lumières, Révolutions & Empires
	// ========================================================================

	{
		id: 'evt_act_of_union_1707',
		name: "Acte d'Union — Grande-Bretagne",
		description:
			"L'Angleterre et l'Écosse fusionnent en un seul royaume : la Grande-Bretagne. Le Parlement écossais est dissous. L'union est motivée par la faillite du projet colonial Darien et par la nécessité de sécuriser la succession protestante.",
		type: 'political',
		category: 'diplomatic',
		year: 1707,
		yearRange: [1706, 1707],
		affectedNationIds: ['nat_england', 'nat_scotland'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_glorious_revolution'],
			customCondition:
				"L'Écosse doit être en difficulté financière (échec du projet Darien). L'Angleterre veut garantir la succession protestante et empêcher une alliance franco-écossaise.",
		},
		effects: {
			stabilityModifier: 1,
			economicModifier: 2,
			prestigeModifier: 1,
			customEffect:
				"Le Parlement écossais vote sa propre dissolution (16 janvier 1707). Libre accès aux marchés anglais et coloniaux. Certains Écossais considèrent l'union comme une trahison — Robert Burns écrira plus tard « We're bought and sold for English gold ». Les Highlands restent rétives.",
		},
		severity: 6,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_union_accept',
				label: "Accepter l'union",
				description:
					'Voter pour la fusion. Accès aux marchés anglais mais perte de souveraineté.',
				effects: { economicModifier: 2, stabilityModifier: 1 },
			},
			{
				id: 'evt_union_resist',
				label: "S'opposer à l'union",
				description:
					"Défendre la souveraineté écossaise. Risque d'isolement économique.",
				effects: { prestigeModifier: 1, economicModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le projet Darien réussit, l'Écosse reste indépendante et prospère. Si les Jacobites prennent le pouvoir, l'union est impossible.",
		},
		historical_outcome:
			"La Grande-Bretagne naît le 1er mai 1707. L'Écosse conserve son système juridique, son Église et son éducation. Les soulèvements jacobites de 1715 et 1745 montrent que l'union reste contestée. À long terme, l'union crée la plus grande puissance commerciale et navale du monde.",
		status: 'pending',
	},

	{
		id: 'evt_great_northern_war',
		name: 'Grande Guerre du Nord',
		description:
			'Coalition (Russie, Danemark, Saxe-Pologne) contre la Suède de Charles XII. La bataille de Poltava (1709) brise la puissance suédoise et fait de la Russie la nouvelle superpuissance nordique. La Baltique change de maître.',
		type: 'crisis',
		category: 'military',
		year: 1700,
		yearRange: [1700, 1721],
		affectedNationIds: [
			'nat_sweden',
			'nat_kievan_rus',
			'nat_denmark',
			'nat_poland',
		],
		affectedRegionIds: [
			'clim_subarctic',
			'clim_continental_east_europe',
			'clim_temperate_europe',
		],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_peter_great_modernization'],
			customCondition:
				'La Suède doit dominer la Baltique. Pierre le Grand doit vouloir un accès maritime. Charles XII (15 ans en 1700) doit être roi de Suède.',
		},
		effects: {
			militaryModifier: 3,
			economicModifier: -2,
			populationModifier: -0.03,
			customEffect:
				"Charles XII vainc les Russes à Narva (1700) puis envahit la Pologne. Mais il s'enlise en Ukraine. Défaite catastrophique à Poltava (1709). Charles fuit chez les Ottomans. Il meurt au siège de Fredrikshald (1718). La Suède cède la Livonie, l'Estonie, l'Ingrie et la Carélie à la Russie.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Charles XII ne marche pas sur Moscou via l'Ukraine, la Suède pourrait négocier une paix favorable après Narva. Si Pierre perd Poltava, la Russie reste enclavée.",
		},
		historical_outcome:
			"Le traité de Nystad (1721) consacre la Russie comme puissance baltique. La Suède perd son empire. Pierre Ier se proclame Empereur de toutes les Russies. Saint-Pétersbourg est la « fenêtre sur l'Europe ». L'ère de la grandeur suédoise est terminée.",
		status: 'pending',
	},

	{
		id: 'evt_south_sea_bubble',
		name: 'Bulle des Mers du Sud et Bulle du Mississippi',
		description:
			"Deux des premières grandes crises financières modernes. En France, le système de Law s'effondre (1720). En Angleterre, la South Sea Company fait faillite. Des milliers d'investisseurs sont ruinés. La confiance dans la finance spéculative est durablement ébranlée.",
		type: 'crisis',
		category: 'economic',
		year: 1720,
		yearRange: [1719, 1721],
		affectedNationIds: ['nat_england', 'nat_france'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_war_spanish_succession', 'evt_dutch_golden_age'],
			customCondition:
				"La dette publique post-guerre doit être massive. L'innovation financière néerlandaise (bourse d'Amsterdam, tulipomanie) doit avoir inspiré la spéculation. Des financiers (John Law en France, compagnie des Mers du Sud en Angleterre) proposent de convertir la dette en actions spéculatives.",
		},
		effects: {
			economicModifier: -3,
			stabilityModifier: -2,
			customEffect:
				'En France, Law crée la Banque Royale et la Compagnie du Mississippi. Hyperinflation puis effondrement. Le mot « banqueroute » entre dans le langage courant. En Angleterre, Isaac Newton perd 20 000 livres. Le Bubble Act (1720) interdit la création de sociétés par actions sans charte royale.',
		},
		severity: 6,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_bubble_invest',
				label: 'Investir dans la spéculation',
				description:
					"Les profits semblent illimités. Acheter des actions avant qu'il ne soit trop tard.",
				effects: { economicModifier: -2, stabilityModifier: -1 },
			},
			{
				id: 'evt_bubble_abstain',
				label: 'Rester prudent',
				description: 'Refuser la spéculation. Garder ses terres et son or.',
				effects: { economicModifier: 1, prestigeModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les gouvernements régulent la spéculation plus tôt, les bulles sont contenues. Si Law réussit, la France devient la première puissance financière mondiale.',
		},
		historical_outcome:
			"Le système de Law s'effondre en décembre 1720. La France ne créera pas de banque centrale pendant 80 ans. En Angleterre, Robert Walpole stabilise la situation et devient de facto le premier « Premier Ministre ». La méfiance envers la finance perdure une génération.",
		status: 'pending',
	},

	{
		id: 'evt_safavid_fall',
		name: 'Chute des Safavides',
		description:
			"Les Afghans Ghilzais envahissent la Perse et prennent Ispahan (1722). Le shah Hossein abdique. L'empire safavide, affaibli par la décadence et les révoltes, s'effondre. Nader Shah restaurera l'ordre mais sans continuité dynastique.",
		type: 'crisis',
		category: 'political',
		year: 1722,
		yearRange: [1709, 1736],
		affectedNationIds: ['nat_ghaznavid'],
		affectedRegionIds: ['clim_arid_mideast', 'clim_central_asia_steppe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_safavid_iran'],
			customCondition:
				'La Perse safavide doit être affaiblie — corruption, décadence de la cour, révoltes afghanes (Mir Wais, 1709). Le shah doit être un souverain faible.',
		},
		effects: {
			stabilityModifier: -3,
			militaryModifier: -2,
			economicModifier: -2,
			customEffect:
				"Mahmud Hotaki prend Ispahan après un siège de 6 mois (80 000 morts de famine). Les Ottomans et les Russes envahissent les provinces frontalières. Nader Shah (un aventurier turkmène) chasse les Afghans, reconquiert le territoire, envahit l'Inde moghole (sac de Delhi, 1739) et ramène le trône du Paon.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le shah est plus compétent, les Afghans sont contenus. Si Nader Shah n'émerge pas, la Perse est partagée entre Ottomans, Russes et Afghans.",
		},
		historical_outcome:
			"Les Safavides disparaissent. Nader Shah crée un empire éphémère (1736-1747) mais est assassiné. La Perse sombre dans le chaos jusqu'aux Qajars (1789). Le sac de Delhi (1739) accélère le déclin moghol. Le trône du Paon et le Koh-i-Noor sont emportés en Perse.",
		status: 'pending',
	},

	{
		id: 'evt_enlightenment',
		name: 'Les Lumières — Encyclopédie et Raison',
		description:
			"Mouvement intellectuel européen prônant la raison, la science, la tolérance et le progrès. Voltaire, Diderot, Montesquieu, Rousseau, Hume, Kant. L'Encyclopédie (1751-1772) condense le savoir humain en 28 volumes. Les idées des Lumières préparent les révolutions.",
		type: 'cultural_shift',
		category: 'cultural',
		year: 1751,
		yearRange: [1715, 1789],
		affectedNationIds: [
			'nat_france',
			'nat_england',
			'nat_hre',
			'nat_kievan_rus',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: [
				'evt_newton_principia',
				'evt_galileo_trial',
				'evt_lisbon_earthquake',
			],
			requiredTechs: ['tech_printing_press', 'tech_scientific_method'],
			customCondition:
				"La révolution scientifique doit avoir eu lieu. Le séisme de Lisbonne (1755) doit nourrir le débat philosophique (Voltaire vs Leibniz). L'imprimerie doit être largement répandue. Une classe bourgeoise éduquée doit exister. La censure doit être assez lâche pour permettre la circulation des idées.",
		},
		effects: {
			stabilityModifier: -1,
			prestigeModifier: 3,
			religiousTensionModifier: 2,
			techUnlocks: ['tech_encyclopedie'],
			customEffect:
				"L'Encyclopédie de Diderot et d'Alembert (1751-1772) : 72 000 articles, 17 volumes de texte, 11 de planches. Censurée puis tolérée. Les salons parisiens deviennent les centres du débat intellectuel. Les despotes éclairés (Frédéric II, Catherine II, Joseph II) tentent d'appliquer les idées des Lumières sans perdre le pouvoir. L'Église perd son monopole sur la vérité.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_lumiere_embrace',
				label: 'Embrasser les Lumières',
				description:
					'Encourager la raison, la tolérance et la science. Risque de déstabilisation.',
				effects: { prestigeModifier: 2, stabilityModifier: -1 },
			},
			{
				id: 'evt_lumiere_censor',
				label: 'Censurer les philosophes',
				description:
					"Maintenir l'ordre et la tradition. Interdire les écrits subversifs.",
				effects: { stabilityModifier: 1, religiousTensionModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la censure est totale en France, les Lumières se déplacent en Hollande ou en Angleterre. Si l'Église mène une contre-offensive efficace, le mouvement est ralenti mais pas arrêté.",
		},
		historical_outcome:
			"Les Lumières transforment la pensée européenne. La Déclaration des droits de l'homme (1789), la Constitution américaine (1787), l'abolition de la torture, la séparation des pouvoirs — tout découle des Lumières. Mais Voltaire méprise le peuple, Rousseau inspire la Terreur. Les contradictions sont immenses.",
		status: 'pending',
	},

	{
		id: 'evt_frederick_great',
		name: 'Frédéric II le Grand — Ascension de la Prusse',
		description:
			"Frédéric II (r. 1740-1786) transforme la Prusse en grande puissance militaire. Il envahit la Silésie, résiste à une coalition européenne pendant la guerre de Sept Ans, modernise l'administration et incarne le « despote éclairé ».",
		type: 'milestone',
		category: 'military',
		year: 1740,
		yearRange: [1740, 1786],
		affectedNationIds: ['nat_hre', 'nat_poland'],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
		],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"La Prusse doit être un État organisé mais modeste (héritage de Frédéric-Guillaume Ier). L'Autriche doit être affaiblie par la mort de Charles VI et la succession contestée de Marie-Thérèse.",
		},
		effects: {
			militaryModifier: 3,
			prestigeModifier: 2,
			economicModifier: 1,
			stabilityModifier: 1,
			customEffect:
				"La Prusse conquiert la Silésie (1740-1742). Frédéric survit à la guerre de Sept Ans par miracle (« le miracle de la Maison de Brandebourg » — mort d'Élisabeth de Russie en 1762). Il codifie le droit, abolit la torture, accueille les huguenots. L'armée prussienne devient le modèle européen : discipline, mobilité, méritocratie.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Frédéric meurt au combat, la Prusse reste une puissance mineure. Si Marie-Thérèse reprend la Silésie, l'Autriche domine l'Allemagne.",
		},
		historical_outcome:
			"Frédéric fait de la Prusse la cinquième grande puissance européenne. Il participe au premier partage de la Pologne (1772). À sa mort (1786), la Prusse a doublé de taille. L'héritage prussien — discipline, militarisme, bureaucratie efficace — marquera l'Allemagne jusqu'au XXe siècle.",
		status: 'pending',
	},

	{
		id: 'evt_lisbon_earthquake',
		name: 'Tremblement de terre de Lisbonne',
		description:
			"Le 1er novembre 1755, un séisme de magnitude ~8.5 détruit Lisbonne. Tsunami, incendie. 30 000 à 60 000 morts. L'événement choque l'Europe et ébranle la foi en la Providence divine. Voltaire écrit le « Poème sur le désastre de Lisbonne ».",
		type: 'natural_disaster',
		category: 'natural',
		year: 1755,
		yearRange: [1755, 1755],
		affectedNationIds: ['nat_leon'],
		affectedRegionIds: ['clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Événement naturel — aucune condition historique requise. Le Portugal doit exister comme nation maritime avec Lisbonne comme capitale prospère.',
		},
		effects: {
			economicModifier: -3,
			populationModifier: -0.05,
			stabilityModifier: -2,
			religiousTensionModifier: 1,
			customEffect:
				"Le séisme frappe le jour de la Toussaint pendant la messe. Trois secousses, suivies d'un tsunami de 6 mètres, puis un incendie de 5 jours. La bibliothèque royale, l'opéra, les archives des explorations — tout est détruit. Le marquis de Pombal organise la reconstruction avec une efficacité remarquable : urbanisme moderne, normes antisismiques. La « querelle de l'optimisme » : Voltaire vs Leibniz.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_lisbon_rebuild',
				label: 'Reconstruire rationnellement',
				description:
					'Pombal impose un urbanisme moderne. Coût immense mais ville neuve.',
				effects: { economicModifier: -2, prestigeModifier: 2 },
			},
			{
				id: 'evt_lisbon_penance',
				label: 'Pénitence et processions',
				description: "C'est un châtiment divin. Expier les péchés de la ville.",
				effects: { religiousTensionModifier: 1, stabilityModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Le séisme est réel et ne peut être empêché. Mais si Pombal n'est pas au pouvoir, la reconstruction est chaotique et le Portugal décline plus vite.",
		},
		historical_outcome:
			"Pombal reconstruit Lisbonne sur un plan en grille avec des bâtiments antisismiques (structure « pombalina »). Il expulse les Jésuites (1759). Le débat philosophique sur le mal et la Providence influence profondément les Lumières. Kant écrit ses premiers textes de sismologie. Lisbonne ne retrouvera jamais sa grandeur d'avant.",
		status: 'pending',
	},

	{
		id: 'evt_seven_years_war',
		name: 'Guerre de Sept Ans',
		description:
			"Premier conflit véritablement mondial (1756-1763). La Prusse et la Grande-Bretagne contre la France, l'Autriche et la Russie. Combats en Europe, en Amérique (French and Indian War), en Inde, en Afrique et aux Philippines. Winston Churchill l'appellera « la première guerre mondiale ».",
		type: 'crisis',
		category: 'military',
		year: 1756,
		yearRange: [1756, 1763],
		affectedNationIds: [
			'nat_france',
			'nat_england',
			'nat_hre',
			'nat_kievan_rus',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_northeast_america',
			'clim_south_asia',
			'clim_continental_east_europe',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_frederick_great'],
			customCondition:
				"La rivalité franco-britannique coloniale et la rivalité austro-prussienne continentale doivent converger. Le « renversement des alliances » (1756) : la France s'allie à l'Autriche, l'Angleterre à la Prusse.",
		},
		effects: {
			militaryModifier: 2,
			economicModifier: -3,
			populationModifier: -0.03,
			customEffect:
				"Frédéric II survit de justesse (batailles de Rossbach, Leuthen, Kunersdorf). En Amérique, Wolfe prend Québec (1759). En Inde, Clive vainc à Plassey (1757). La France perd le Canada, la Louisiane, la plupart de l'Inde. L'Angleterre émerge comme première puissance coloniale mondiale. La Prusse conserve la Silésie. La France est humiliée et endettée — germe de la Révolution.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la France concentre ses forces sur les colonies au lieu de l'Europe, elle garde le Canada. Si Élisabeth de Russie ne meurt pas en 1762, la Prusse est écrasée.",
		},
		historical_outcome:
			"Le traité de Paris (1763) : la France cède le Canada, la Louisiane orientale, la plupart de l'Inde. L'Espagne cède la Floride. L'Angleterre domine les océans. La dette de guerre française contribue directement à la crise financière qui mène à la Révolution de 1789. La Prusse est confirmée comme grande puissance.",
		status: 'pending',
	},

	{
		id: 'evt_qianlong_zenith',
		name: 'Apogée Qing — Empereur Qianlong',
		description:
			"L'empereur Qianlong (r. 1735-1796) porte la dynastie Qing à son apogée. Conquête du Xinjiang, du Tibet, de la Birmanie. La Chine est l'État le plus peuplé et le plus riche du monde. Mais le refus de l'ouverture commerciale prépare le déclin.",
		type: 'milestone',
		category: 'political',
		year: 1750,
		yearRange: [1735, 1796],
		affectedNationIds: ['nat_song'],
		affectedRegionIds: [
			'clim_east_asia',
			'clim_tibetan_plateau',
			'clim_central_asia_steppe',
		],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_qing_dynasty'],
			customCondition:
				"La dynastie Qing doit être établie et stable. Les empereurs Kangxi et Yongzheng ont consolidé l'empire. La Chine doit être prospère (population ~300 millions).",
		},
		effects: {
			economicModifier: 3,
			militaryModifier: 2,
			prestigeModifier: 3,
			stabilityModifier: 1,
			customEffect:
				"La population chinoise double sous les Qing (de 150 à 300 millions). Les « Dix Grandes Campagnes » de Qianlong étendent l'empire au Xinjiang, au Tibet et en Birmanie. Le Siku Quanshu (1773-1782) compile 36 000 volumes — le plus grand projet éditorial de l'histoire. Mais la corruption gangrène l'administration (Heshen). La mission Macartney (1793) échoue : Qianlong refuse le commerce libre avec l'Angleterre.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_qianlong_open',
				label: 'Ouvrir au commerce étranger',
				description: 'Accepter les demandes européennes. Modernisation forcée.',
				effects: { economicModifier: 2, stabilityModifier: -1 },
			},
			{
				id: 'evt_qianlong_close',
				label: "Maintenir l'isolement",
				description: "La Chine n'a besoin de rien. Refuser les barbares.",
				effects: { stabilityModifier: 1, economicModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Qianlong accepte l'ouverture commerciale, la Chine s'industrialise plus tôt et évite les guerres de l'opium. Si Heshen est éliminé, la corruption est endiguée.",
		},
		historical_outcome:
			"Qianlong abdique en 1796 par respect pour son grand-père Kangxi (qui régna 61 ans). Son fils Jiaqing hérite d'un empire miné par la corruption. La rébellion du Lotus Blanc (1796-1804) signale le début du déclin. Le refus de la mission Macartney prépare l'affrontement sino-britannique du XIXe siècle.",
		status: 'pending',
	},

	{
		id: 'evt_maratha_rise',
		name: "Empire Maratha — Résistance à l'hégémonie moghole",
		description:
			"Les Marathes, sous Shivaji puis les Peshwas, créent un vaste empire dans le sous-continent indien. Après la mort d'Aurangzeb (1707), les Marathes deviennent la puissance dominante en Inde. Leur défaite à Panipat (1761) ouvre la voie à la domination britannique.",
		type: 'milestone',
		category: 'military',
		year: 1720,
		yearRange: [1707, 1761],
		affectedNationIds: ['nat_chola'],
		affectedRegionIds: ['clim_south_asia'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_mughal_peak'],
			customCondition:
				"L'Empire moghol doit être en déclin après Aurangzeb. Shivaji doit avoir fondé le royaume maratha (1674). Les Peshwas doivent prendre le pouvoir effectif.",
		},
		effects: {
			militaryModifier: 3,
			economicModifier: 1,
			stabilityModifier: -1,
			customEffect:
				"Les Marathes utilisent la guérilla et la cavalerie légère. Le chauth (impôt de 25%) finance leurs campagnes. Sous le Peshwa Baji Rao I (1720-1740), l'empire s'étend de Tanjore au Pendjab. Mais la confédération est fragmentée — chaque chef (Scindia, Holkar, Gaekwad, Bhonsle) agit de façon semi-indépendante.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les Marathes restent unis sous un commandement central, ils pourraient unifier l'Inde. Si la défaite de Panipat (1761) n'a pas lieu, la Compagnie britannique des Indes est contrainte à la côte.",
		},
		historical_outcome:
			"La bataille de Panipat (1761) : les Marathes sont écrasés par les Afghans d'Ahmad Shah Durrani. 40 000 à 70 000 morts. L'empire maratha survit mais ne se relève jamais complètement. Le vide de pouvoir en Inde est exploité par la Compagnie britannique des Indes orientales. Les guerres anglo-marathes (1775-1818) finissent la confédération.",
		status: 'pending',
	},

	{
		id: 'evt_cook_voyages',
		name: 'Voyages de James Cook — Exploration du Pacifique',
		description:
			"James Cook effectue trois voyages (1768-1779) qui cartographient l'Australie, la Nouvelle-Zélande, Hawaï et d'innombrables îles du Pacifique. Il apporte aussi le scorbut vaincu (citron) et une rigueur scientifique nouvelle. Il est tué à Hawaï en 1779.",
		type: 'milestone',
		category: 'exploration',
		year: 1770,
		yearRange: [1768, 1779],
		affectedNationIds: [
			'nat_england',
			'nat_aboriginal',
			'nat_hawaii',
			'nat_tui_tonga',
		],
		affectedRegionIds: [
			'clim_australia',
			'clim_polynesia',
			'clim_hawaii',
			'clim_new_guinea',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_seven_years_war'],
			customCondition:
				'La Grande-Bretagne doit dominer les mers après 1763. La Royal Society doit financer des expéditions scientifiques (transit de Vénus, 1769). Le scorbut doit être maîtrisé.',
		},
		effects: {
			prestigeModifier: 2,
			economicModifier: 1,
			techUnlocks: ['tech_chronometer'],
			customEffect:
				"Premier voyage (1768-1771) : transit de Vénus à Tahiti, cartographie de la Nouvelle-Zélande et de l'est de l'Australie. Deuxième voyage (1772-1775) : premier à franchir le cercle antarctique, réfutation du continent austral. Troisième voyage (1776-1779) : recherche du passage du Nord-Ouest, découverte de Hawaï. Cook est tué dans une altercation avec les Hawaïens à Kealakekua Bay.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Cook ne navigue pas, les Français (Bougainville, La Pérouse) cartographient le Pacifique en premier. Si l'Australie n'est pas découverte, la colonisation est retardée de décennies.",
		},
		historical_outcome:
			"Les voyages de Cook ouvrent l'Australie à la colonisation (Botany Bay, 1788). La Nouvelle-Zélande entre dans l'orbite britannique. Hawaï est contacté par l'Occident pour la première fois. Les peuples autochtones subissent maladies, dépossession et violence. La cartographie du Pacifique est quasi complète.",
		status: 'pending',
	},

	{
		id: 'evt_partition_poland',
		name: 'Partages de la Pologne',
		description:
			"La Pologne-Lituanie, autrefois la plus grande nation d'Europe, est dépecée en trois partages (1772, 1793, 1795) par la Russie, la Prusse et l'Autriche. La Pologne disparaît de la carte pour 123 ans. Le liberum veto et l'anarchie nobiliaire ont rendu l'État ingouvernable.",
		type: 'crisis',
		category: 'diplomatic',
		year: 1772,
		yearRange: [1772, 1795],
		affectedNationIds: ['nat_poland', 'nat_kievan_rus', 'nat_hre'],
		affectedRegionIds: [
			'clim_continental_east_europe',
			'clim_temperate_europe',
		],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: [
				'evt_frederick_great',
				'evt_great_northern_war',
				'evt_catherine_great',
			],
			customCondition:
				"La Pologne doit être paralysée par le liberum veto et les ingérences étrangères. La Grande Guerre du Nord doit avoir affaibli la Pologne. Frédéric II, Catherine II et Marie-Thérèse doivent s'accorder sur le partage.",
		},
		effects: {
			stabilityModifier: -3,
			militaryModifier: -2,
			populationModifier: -0.05,
			customEffect:
				"Premier partage (1772) : la Pologne perd 30% de son territoire. Constitution du 3 mai 1791 — première constitution écrite d'Europe — mais la Russie et la Prusse refusent la modernisation. Kosciuszko mène un soulèvement héroïque mais futile (1794). Troisième partage (1795) : la Pologne disparaît. Les patriotes polonais errent en exil pendant 123 ans.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_poland_reform',
				label: 'Adopter la Constitution du 3 mai',
				description:
					"Moderniser l'État. Abolir le liberum veto. Risque d'intervention étrangère.",
				effects: { stabilityModifier: 2, militaryModifier: -1 },
			},
			{
				id: 'evt_poland_submit',
				label: 'Se soumettre au protectorat russe',
				description:
					'Accepter la tutelle de Catherine II. La Pologne survit mais sans souveraineté.',
				effects: { stabilityModifier: -1, prestigeModifier: -2 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si la Constitution de 1791 est appliquée et soutenue par la France révolutionnaire, la Pologne survit comme État moderne. Si Kosciuszko vainc, les partages sont annulés.',
		},
		historical_outcome:
			"La Pologne disparaît en 1795. Les légions polonaises combattent sous Napoléon avec l'espoir de restauration. Le Duché de Varsovie (1807-1815) est un bref espoir. La Pologne ne renaît qu'en 1918. La diaspora polonaise maintient la culture et la langue vivantes. Le 3 mai devient jour de fête nationale.",
		status: 'pending',
	},

	{
		id: 'evt_industrial_revolution_begins',
		name: 'Début de la Révolution industrielle',
		description:
			"En Angleterre, l'invention de la spinning jenny (1764), du water frame (1769) et de la machine à vapeur de Watt (1769) transforme la production textile puis toute l'économie. L'humanité passe de l'énergie musculaire à l'énergie fossile. Rien ne sera plus jamais pareil.",
		type: 'milestone',
		category: 'economic',
		year: 1769,
		yearRange: [1760, 1790],
		affectedNationIds: ['nat_england'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_newton_principia', 'evt_enlightenment'],
			requiredTechs: ['tech_blast_furnace'],
			customCondition:
				"L'Angleterre doit avoir : des capitaux (empire commercial), de la main-d'œuvre (enclosures), du charbon abondant, un système bancaire développé, des brevets protégeant l'innovation, et la stabilité politique post-1688.",
		},
		effects: {
			economicModifier: 3,
			populationModifier: 0.02,
			stabilityModifier: -1,
			techUnlocks: ['tech_steam_engine', 'tech_spinning_jenny'],
			customEffect:
				"La machine à vapeur de Newcomen (1712) puis de Watt (1769) pompe l'eau des mines de charbon. Arkwright mécanise le filage (1769). Crompton (mule jenny, 1779). Cartwright (métier à tisser mécanique, 1785). Les usines remplacent les ateliers. Manchester passe de 10 000 à 70 000 habitants. Le travail des enfants, les conditions sanitaires désastreuses, les émeutes luddites — le prix humain est terrible.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_indrev_mechanize',
				label: 'Investir dans les machines',
				description:
					'Construire des usines. Profits immenses mais misère ouvrière.',
				effects: { economicModifier: 3, stabilityModifier: -1 },
			},
			{
				id: 'evt_indrev_protect',
				label: 'Protéger les artisans',
				description:
					"Interdire les machines. Préserver l'emploi mais perdre la compétitivité.",
				effects: { stabilityModifier: 1, economicModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Angleterre n'a pas de charbon accessible, la révolution industrielle commence ailleurs (Pays-Bas ?). Si les luddites gagnent, l'industrialisation est retardée d'une génération.",
		},
		historical_outcome:
			"L'Angleterre interdit l'exportation de machines et d'ouvriers qualifiés pour maintenir son avantage. La révolution industrielle s'étend à la Belgique (1800s), la France (1830s), l'Allemagne (1850s). Le PIB mondial, stable pendant des millénaires, commence sa croissance exponentielle. La population mondiale double en un siècle. Le monde moderne est né.",
		status: 'pending',
	},

	{
		id: 'evt_catherine_great',
		name: 'Catherine II la Grande — Modernisation russe',
		description:
			"Catherine II (r. 1762-1796), princesse allemande devenue tsarine par coup d'État, modernise la Russie. Elle correspond avec Voltaire, annexe la Crimée, participe aux partages de la Pologne et étend l'empire au sud. Mais le servage s'aggrave.",
		type: 'milestone',
		category: 'political',
		year: 1762,
		yearRange: [1762, 1796],
		affectedNationIds: ['nat_kievan_rus'],
		affectedRegionIds: [
			'clim_continental_east_europe',
			'clim_central_asia_steppe',
		],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_peter_great_modernization', 'evt_enlightenment'],
			customCondition:
				'Pierre III doit être un tsar incompétent et impopulaire. Catherine doit avoir le soutien de la garde impériale (Orlov). Les idées des Lumières doivent circuler en Russie.',
		},
		effects: {
			prestigeModifier: 3,
			militaryModifier: 2,
			economicModifier: 1,
			stabilityModifier: -1,
			customEffect:
				"Catherine rédige le Nakaz (1767) — instructions pour une réforme juridique inspirée de Montesquieu. Annexion de la Crimée (1783). Guerres russo-turques victorieuses. Fondation d'Odessa. Mais la révolte de Pougatchev (1773-1775) — un cosaque prétendant être Pierre III — terrorise l'empire. Catherine renforce le servage pour garder la noblesse loyale. Contradiction entre les idéaux des Lumières et la réalité autocratique.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_catherine_reform',
				label: 'Appliquer les réformes des Lumières',
				description:
					'Réduire le servage, moderniser le droit. Risque de révolte nobiliaire.',
				effects: { prestigeModifier: 2, stabilityModifier: -1 },
			},
			{
				id: 'evt_catherine_conserve',
				label: 'Maintenir le servage',
				description:
					"Garder la noblesse loyale. L'empire reste stable mais archaïque.",
				effects: { stabilityModifier: 1, economicModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Pierre III n'est pas renversé, la Russie s'allie à la Prusse et la politique extérieure change radicalement. Si Pougatchev réussit, c'est une guerre civile majeure.",
		},
		historical_outcome:
			"Catherine meurt en 1796. La Russie est devenue la plus grande puissance territoriale du monde. La Crimée est russe. La Pologne n'existe plus. Mais le servage persiste jusqu'en 1861. Son fils Paul Ier est assassiné en 1801. L'héritage de Catherine : grandeur extérieure, misère intérieure.",
		status: 'pending',
	},

	{
		id: 'evt_slave_trade_peak',
		name: 'Apogée de la Traite atlantique',
		description:
			"Le XVIIIe siècle est le pic de la traite négrière transatlantique. 6 millions d'Africains sont déportés entre 1700 et 1800 — plus de la moitié du total historique. Le commerce triangulaire enrichit l'Europe et les Amériques au prix d'un crime contre l'humanité.",
		type: 'crisis',
		category: 'economic',
		year: 1750,
		yearRange: [1700, 1800],
		affectedNationIds: [
			'nat_england',
			'nat_france',
			'nat_leon',
			'nat_yoruba',
			'nat_ghana',
		],
		affectedRegionIds: [
			'clim_tropical_africa',
			'clim_sahel',
			'clim_mesoamerica',
			'clim_northeast_america',
			'clim_south_american_subtropical',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: [
				'evt_atlantic_slave_trade',
				'evt_east_india_companies',
			],
			customCondition:
				"Les plantations de sucre, tabac et coton dans les Amériques doivent exister. Les royaumes côtiers africains (Dahomey, Oyo, Ashanti) doivent participer à la capture et à la vente d'esclaves.",
		},
		effects: {
			economicModifier: 2,
			populationModifier: -0.05,
			stabilityModifier: -1,
			customEffect:
				'Liverpool, Nantes, Bristol — capitales du commerce triangulaire. Les navires partent avec des textiles et des armes, échangent des esclaves en Afrique, les vendent aux Amériques, reviennent avec du sucre et du coton. Le taux de mortalité lors du « passage du milieu » : 15-20%. Les royaumes africains sont déstabilisés — guerres permanentes pour capturer des esclaves. Les premières voix abolitionnistes émergent : les Quakers (1750s), Granville Sharp, les Lumières.',
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_slave_profit',
				label: 'Profiter du commerce',
				description:
					'Investir dans la traite. Profits considérables mais participation à un crime.',
				effects: { economicModifier: 2, prestigeModifier: -1 },
			},
			{
				id: 'evt_slave_oppose',
				label: "Soutenir l'abolition",
				description:
					'Rejoindre le mouvement abolitionniste. Perte économique mais honneur.',
				effects: { prestigeModifier: 2, economicModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le mouvement abolitionniste émerge plus tôt (les Quakers dès 1688), la traite est réduite au XVIIIe siècle. Si les royaumes africains refusent de vendre des captifs, le système s'effondre.",
		},
		historical_outcome:
			"La Grande-Bretagne abolit la traite en 1807, l'esclavage en 1833. La France abolit en 1794 (Révolution), rétablit en 1802 (Napoléon), abolit définitivement en 1848. Les États-Unis en 1865 (guerre civile). Le Brésil en 1888. L'héritage de la traite marque durablement l'Afrique, les Amériques et les relations raciales mondiales.",
		status: 'pending',
	},

	{
		id: 'evt_american_revolution',
		name: 'Révolution américaine',
		description:
			"Les Treize Colonies britanniques se révoltent contre la taxation sans représentation. La Déclaration d'Indépendance (4 juillet 1776), l'alliance française, la victoire de Yorktown (1781). Les États-Unis d'Amérique naissent — première démocratie moderne à grande échelle.",
		type: 'political',
		category: 'political',
		year: 1776,
		yearRange: [1765, 1783],
		affectedNationIds: ['nat_england', 'nat_france'],
		affectedRegionIds: ['clim_northeast_america', 'clim_temperate_europe'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_seven_years_war', 'evt_enlightenment'],
			requiredTechs: ['tech_musket', 'tech_printing_press'],
			customCondition:
				"La dette post-guerre de Sept Ans doit pousser l'Angleterre à taxer les colonies (Stamp Act, Townshend Acts, Tea Act). Les idées de Locke, Montesquieu et Paine doivent circuler dans les colonies. La France doit vouloir sa revanche.",
		},
		effects: {
			stabilityModifier: -2,
			militaryModifier: 1,
			economicModifier: -1,
			prestigeModifier: 2,
			techUnlocks: ['tech_lightning_rod'],
			customEffect:
				"Le Boston Tea Party (1773), les batailles de Lexington et Concord (1775), la Déclaration d'Indépendance (1776), l'hiver à Valley Forge (1777-78), l'alliance française (1778), la victoire de Yorktown (1781). Washington, Jefferson, Franklin, Hamilton — les Pères Fondateurs créent une république fédérale avec séparation des pouvoirs. La Constitution (1787) et le Bill of Rights (1791) deviennent des modèles mondiaux.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_amrev_support',
				label: 'Soutenir les insurgés',
				description:
					"Envoyer des troupes et de l'argent aux colonies. Affaiblir l'Angleterre.",
				effects: { militaryModifier: 1, economicModifier: -2 },
			},
			{
				id: 'evt_amrev_neutral',
				label: 'Rester neutre',
				description: 'Ne pas intervenir. Observer le résultat.',
				effects: { stabilityModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la France n'intervient pas, la révolution échoue probablement. Si l'Angleterre fait des concessions fiscales, la révolte est désamorcée. Si Washington est tué, le mouvement perd son leader.",
		},
		historical_outcome:
			"Le traité de Paris (1783) reconnaît l'indépendance américaine. La France est ruinée par son aide — dette colossale qui précipite la Révolution de 1789. Les États-Unis adoptent la Constitution (1787), élisent Washington premier président (1789). L'exemple américain inspire les révolutions en France, en Haïti, en Amérique latine.",
		status: 'pending',
	},

	{
		id: 'evt_french_revolution',
		name: 'Révolution française',
		description:
			"Le 14 juillet 1789, la Bastille tombe. En quelques mois, l'Ancien Régime s'effondre. Déclaration des droits de l'homme, abolition des privilèges, exécution du roi (1793), Terreur, Directoire. La France invente la politique moderne — gauche, droite, constitution, république, nation.",
		type: 'crisis',
		category: 'political',
		year: 1789,
		yearRange: [1789, 1799],
		affectedNationIds: ['nat_france'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_american_revolution', 'evt_enlightenment'],
			requiredTechs: ['tech_printing_press', 'tech_encyclopedie'],
			customCondition:
				"La France doit être en faillite (dette de guerre + mauvaises récoltes 1788). Les États Généraux doivent être convoqués (mai 1789). Le Tiers État doit être radicalisé par les idées des Lumières et l'exemple américain.",
		},
		effects: {
			stabilityModifier: -3,
			militaryModifier: 2,
			religiousTensionModifier: 2,
			populationModifier: -0.02,
			nationMutations: [
				{
					nationId: 'nat_france',
					rename: { name: 'République française', dempinym: 'Français' },
					changeGovernance: 'republic',
					removeReligion: 'rel_catholic',
				},
			],
			customEffect:
				"Prise de la Bastille (14 juillet 1789). Nuit du 4 août : abolition des privilèges féodaux. Déclaration des droits de l'homme (26 août 1789). Constitution civile du clergé. Fuite du roi à Varennes (1791). Guerre contre l'Europe (1792). Exécution de Louis XVI (21 janvier 1793). La Terreur : 17 000 exécutions officielles, 40 000 morts au total. Robespierre guillotiné (9 thermidor, 27 juillet 1794). Le Directoire (1795-1799) mène au coup d'État de Bonaparte.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_revolution_join',
				label: 'Rejoindre la Révolution',
				description: 'Liberté, Égalité, Fraternité. Mais la Terreur guette.',
				effects: { stabilityModifier: -2, prestigeModifier: 2 },
			},
			{
				id: 'evt_revolution_emigrate',
				label: 'Émigrer',
				description:
					'Fuir la France. Rejoindre les armées contre-révolutionnaires.',
				effects: { stabilityModifier: 1, economicModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si Louis XVI accepte une monarchie constitutionnelle et ne fuit pas à Varennes, la Terreur est évitée. Si les armées européennes vainquent en 1792, la monarchie est restaurée plus tôt.',
		},
		historical_outcome:
			"La Révolution française transforme l'Europe. Le système métrique, le Code civil, la laïcité, la conscription, le nationalisme — tout commence ici. Le Directoire s'effondre le 18 brumaire (9 novembre 1799) : Bonaparte prend le pouvoir. La Révolution dévore ses enfants, mais ses idées conquièrent le monde.",
		status: 'pending',
	},

	{
		id: 'evt_haitian_revolution',
		name: 'Révolution haïtienne',
		description:
			"Les esclaves de Saint-Domingue se soulèvent en août 1791. Toussaint Louverture, puis Jean-Jacques Dessalines, mènent la seule révolte d'esclaves victorieuse de l'histoire. Haïti devient indépendant le 1er janvier 1804 — première république noire du monde.",
		type: 'crisis',
		category: 'military',
		year: 1791,
		yearRange: [1791, 1804],
		affectedNationIds: ['nat_france'],
		affectedRegionIds: ['clim_south_american_subtropical'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_french_revolution'],
			customCondition:
				"Saint-Domingue doit être la colonie la plus riche du monde (sucre, café). 500 000 esclaves pour 40 000 blancs. La Déclaration des droits de l'homme (1789) crée une contradiction explosive. Les affranchis libres de couleur réclament l'égalité.",
		},
		effects: {
			stabilityModifier: -2,
			economicModifier: -3,
			militaryModifier: 1,
			customEffect:
				"La cérémonie du Bois Caïman (14 août 1791) lance la révolte. Toussaint Louverture, ancien esclave, devient le leader — il bat les Espagnols, les Anglais, puis les commissaires français. Napoléon envoie l'expédition Leclerc (1802) — 40 000 soldats. Toussaint est capturé par traîtrise et meurt au Fort de Joux (1803). Mais les Français sont décimés par la fièvre jaune et vaincus par Dessalines à Vertières (18 novembre 1803).",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_haiti_support',
				label: 'Soutenir les insurgés',
				description:
					'Aider les esclaves. Risque de contagion révolutionnaire dans ses propres colonies.',
				effects: { prestigeModifier: 1, stabilityModifier: -1 },
			},
			{
				id: 'evt_haiti_crush',
				label: 'Écraser la révolte',
				description: "Rétablir l'ordre colonial. Envoyer des troupes.",
				effects: { militaryModifier: -1, economicModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Napoléon n'envoie pas l'expédition Leclerc, Toussaint gouverne une Saint-Domingue autonome mais française. Si la fièvre jaune ne décime pas les Français, la révolte est écrasée.",
		},
		historical_outcome:
			"Haïti déclare son indépendance le 1er janvier 1804. Dessalines se proclame empereur. La France exige une « dette de l'indépendance » de 150 millions de francs (1825) — Haïti ne finit de payer qu'en 1947. L'exemple haïtien terrifie les esclavagistes du monde entier et inspire les mouvements abolitionnistes. Napoléon, écœuré, vend la Louisiane aux États-Unis (1803).",
		status: 'pending',
	},

	{
		id: 'evt_tokugawa_sakoku',
		name: "Japon Tokugawa — Apogée de l'isolement",
		description:
			"Le Japon des Tokugawa vit en paix depuis 1615. Le sakoku (fermeture du pays) interdit presque tout contact étranger. Paradoxalement, cette période produit un essor culturel remarquable : kabuki, ukiyo-e, haïku (Bashō), quartiers de plaisirs d'Edo. La population atteint 30 millions.",
		type: 'cultural_shift',
		category: 'cultural',
		year: 1720,
		yearRange: [1700, 1800],
		affectedNationIds: ['nat_japan'],
		affectedRegionIds: ['clim_japan'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_tokugawa_japan'],
			customCondition:
				'Le bakufu Tokugawa doit être stable. Le sakoku doit être en vigueur depuis 1639. Seuls les Néerlandais et les Chinois commercent à Nagasaki (île de Dejima).',
		},
		effects: {
			stabilityModifier: 2,
			prestigeModifier: 1,
			economicModifier: 1,
			customEffect:
				"Edo (Tokyo) est la plus grande ville du monde (~1 million d'habitants). Le taux d'alphabétisation est le plus élevé d'Asie. Les samouraïs deviennent des bureaucrates. La culture Genroku (1688-1704) : Bashō (haïku), Chikamatsu (théâtre), Ihara Saikaku (romans). L'ukiyo-e (estampes) influencera les impressionnistes. Le riz est la monnaie. Le Yoshiwara d'Edo est le plus grand quartier de plaisirs au monde.",
		},
		severity: 5,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_sakoku_maintain',
				label: 'Maintenir le sakoku',
				description: "La paix et l'ordre justifient l'isolement.",
				effects: { stabilityModifier: 1, economicModifier: -1 },
			},
			{
				id: 'evt_sakoku_open',
				label: 'Entrevoir une ouverture',
				description:
					"Permettre l'étude des « sciences hollandaises » (rangaku).",
				effects: { prestigeModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le Japon s'ouvre partiellement au XVIIIe siècle via le rangaku, il se modernise plus tôt. Si une puissance européenne force l'ouverture, le choc est brutal (comme en 1853).",
		},
		historical_outcome:
			"Le Japon reste fermé jusqu'aux « navires noirs » du commodore Perry (1853). Mais le rangaku (études hollandaises) permet une lente absorption des sciences occidentales. Quand l'ouverture forcée arrive, le Japon sera capable de se moderniser à une vitesse stupéfiante (Meiji, 1868). La paix Tokugawa dure 250 ans — record mondial.",
		status: 'pending',
	},

	// ========================================================================
	// 1800 – 1900 : Napoléon, Nationalismes & Impérialismes
	// ========================================================================

	{
		id: 'evt_napoleon_empire',
		name: 'Napoléon Bonaparte — Empire français',
		description:
			"Bonaparte prend le pouvoir par le coup d'État du 18 brumaire (1799), se couronne empereur (1804), réécrit le droit (Code civil), conquiert l'Europe d'Austerlitz à Moscou, puis s'effondre à Waterloo (1815). En 15 ans, il redessine la carte de l'Europe.",
		type: 'crisis',
		category: 'military',
		year: 1804,
		yearRange: [1799, 1815],
		affectedNationIds: [
			'nat_france',
			'nat_england',
			'nat_hre',
			'nat_kievan_rus',
			'nat_leon',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
			'clim_mediterranean',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_french_revolution'],
			customCondition:
				'La Révolution doit avoir affaibli les institutions. Le Directoire doit être corrompu et impopulaire. Bonaparte doit avoir acquis sa gloire militaire en Italie et en Égypte.',
		},
		effects: {
			militaryModifier: 3,
			economicModifier: -2,
			populationModifier: -0.04,
			stabilityModifier: -2,
			prestigeModifier: 3,
			nationMutations: [
				{
					nationId: 'nat_france',
					rename: { name: 'Empire français', dempinym: 'Français' },
					changeGovernance: 'empire',
					changeRuler: {
						name: 'Napoléon Ier Bonaparte',
						dynastyName: 'Bonaparte',
						birthYear: 1769,
						age: 35,
						traits: ['military_genius', 'ambitious', 'reformer', 'charismatic'],
					},
				},
				{
					nationId: 'nat_hre',
					dissolve: true,
				},
			],
			customEffect:
				"Le Code civil (1804) — toujours en vigueur en France et dans 30 pays. Le système métrique imposé. Austerlitz (1805), Iéna (1806), Wagram (1809) — la Grande Armée est invincible. Dissolution du Saint-Empire romain germanique (1806). Mais la campagne de Russie (1812) : 600 000 hommes partent, 100 000 reviennent. Leipzig (1813), abdication, Île d'Elbe, Cent-Jours, Waterloo (18 juin 1815). 3 à 6 millions de morts au total.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_napoleon_ally',
				label: "S'allier à Napoléon",
				description:
					'Rejoindre la Grande Armée. Gloire et modernisation, mais soumission à Paris.',
				effects: { militaryModifier: 2, stabilityModifier: -1 },
			},
			{
				id: 'evt_napoleon_coalition',
				label: 'Rejoindre la coalition',
				description:
					"Combattre Napoléon aux côtés de l'Angleterre, la Russie et l'Autriche.",
				effects: { militaryModifier: -1, prestigeModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Napoléon ne marche pas sur Moscou en 1812, il conserve son empire. Si Nelson perd Trafalgar, la France envahit l'Angleterre. Si le coup du 18 brumaire échoue, la République continue.",
		},
		historical_outcome:
			'Le Congrès de Vienne (1815) restaure les monarchies. Mais le Code civil, le système métrique, le nationalisme et la fin du Saint-Empire romain germanique (1806) sont irréversibles. Napoléon meurt à Sainte-Hélène (1821). Son ombre plane sur tout le XIXe siècle.',
		status: 'pending',
	},

	{
		id: 'evt_congress_vienna',
		name: 'Congrès de Vienne',
		description:
			"Après la chute de Napoléon, les grandes puissances (Autriche, Russie, Prusse, Angleterre, France) redessinent la carte de l'Europe. Metternich impose l'équilibre des puissances et la restauration monarchique. Le « Concert européen » maintient la paix pendant 40 ans.",
		type: 'political',
		category: 'diplomatic',
		year: 1815,
		yearRange: [1814, 1815],
		affectedNationIds: [
			'nat_hre',
			'nat_kievan_rus',
			'nat_england',
			'nat_france',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_napoleon_empire'],
			customCondition:
				"Napoléon doit être vaincu. Les puissances victorieuses doivent se réunir pour réorganiser l'Europe. Metternich doit dominer les négociations.",
		},
		effects: {
			stabilityModifier: 2,
			prestigeModifier: 1,
			militaryModifier: -1,
			customEffect:
				"La Sainte-Alliance (Russie, Autriche, Prusse) réprime tout mouvement libéral ou nationaliste. La France perd ses conquêtes mais garde ses frontières de 1792 grâce à Talleyrand. Les Pays-Bas sont réunifiés. La Confédération germanique remplace le Saint-Empire. La Pologne est partagée à nouveau. Le système de Metternich — conservatisme, censure, police secrète — domine l'Europe jusqu'en 1848.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les vainqueurs se disputent l'héritage napoléonien, l'Europe reste instable. Si la France est démantelée, le nationalisme français explose plus tôt.",
		},
		historical_outcome:
			"Le Concert européen fonctionne jusqu'en 1848 (Printemps des peuples). Le système de Metternich maintient l'ordre mais réprime les aspirations nationales. La Belgique fait sécession en 1830. La Grèce obtient son indépendance (1829). Les germes du nationalisme sont semés — ils exploseront en 1848, 1870 et 1914.",
		status: 'pending',
	},

	{
		id: 'evt_latin_american_independence',
		name: 'Indépendances latino-américaines',
		description:
			"De 1810 à 1825, l'Amérique latine se libère de l'Espagne et du Portugal. Bolívar, San Martín, O'Higgins, Hidalgo — les libertadors créent de nouvelles nations. Le rêve de Bolívar d'une Amérique unie échoue, mais 15 États naissent en une génération.",
		type: 'political',
		category: 'political',
		year: 1820,
		yearRange: [1810, 1825],
		affectedNationIds: ['nat_leon'],
		affectedRegionIds: [
			'clim_andes_highland',
			'clim_south_american_subtropical',
			'clim_mesoamerica',
			'clim_peruvian_coast',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_napoleon_empire', 'evt_american_revolution'],
			customCondition:
				"L'Espagne doit être affaiblie par l'invasion napoléonienne (1808). Les créoles doivent être inspirés par les révolutions américaine et française. L'Angleterre doit soutenir tacitement les indépendances pour ouvrir de nouveaux marchés.",
		},
		effects: {
			stabilityModifier: -2,
			economicModifier: -1,
			militaryModifier: 1,
			customEffect:
				"Bolívar libère le Venezuela, la Colombie, l'Équateur, le Pérou et la Bolivie. San Martín libère l'Argentine, le Chili et le Pérou. Le Mexique de Hidalgo et Morelos. Le Brésil se sépare pacifiquement du Portugal (1822). Mais les guerres civiles, le caudillisme et les inégalités persistent. Le rêve de la Grande Colombie s'effondre en 1830.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Napoléon ne renverse pas la monarchie espagnole, les colonies n'ont pas d'opportunité de révolte. Si Bolívar réussit à unir l'Amérique du Sud, une superpuissance émerge.",
		},
		historical_outcome:
			"En 1825, l'Espagne n'a plus que Cuba et les Philippines. Le Portugal perd le Brésil. L'Amérique latine entre dans un siècle d'instabilité politique — caudillos, guerres civiles, dépendance économique envers l'Angleterre puis les États-Unis. La doctrine Monroe (1823) déclare l'hémisphère occidental interdit à la recolonisation européenne.",
		status: 'pending',
	},

	{
		id: 'evt_greek_independence',
		name: 'Indépendance de la Grèce',
		description:
			"Les Grecs se soulèvent contre l'Empire ottoman en 1821. Byron meurt à Missolonghi (1824). Les grandes puissances interviennent (bataille de Navarin, 1827). La Grèce obtient son indépendance en 1829 — premier succès du nationalisme balkanique.",
		type: 'political',
		category: 'military',
		year: 1821,
		yearRange: [1821, 1829],
		affectedNationIds: [
			'nat_ghaznavid',
			'nat_england',
			'nat_france',
			'nat_kievan_rus',
		],
		affectedRegionIds: ['clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_enlightenment'],
			customCondition:
				"Le philhellénisme doit exister en Europe (admiration de la Grèce antique). L'Empire ottoman doit être affaibli. Les sociétés secrètes grecques (Filiki Eteria) doivent être actives.",
		},
		effects: {
			militaryModifier: 1,
			stabilityModifier: -1,
			prestigeModifier: 2,
			customEffect:
				"Le massacre de Chios (1822) — 20 000 morts, 50 000 esclaves — scandalise l'Europe (tableau de Delacroix). Byron meurt de fièvre à Missolonghi. La bataille navale de Navarin (1827) : la flotte ottomano-égyptienne est détruite par les Anglais, Français et Russes. Le protocole de Londres (1830) crée le royaume de Grèce avec un roi bavarois.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_greek_help',
				label: 'Soutenir les Grecs',
				description:
					"Envoyer des volontaires et de l'argent. Le berceau de la démocratie doit être libre.",
				effects: { prestigeModifier: 1, militaryModifier: -1 },
			},
			{
				id: 'evt_greek_ignore',
				label: 'Ne pas intervenir',
				description:
					"Affaire interne de l'Empire ottoman. Respecter le Concert européen.",
				effects: { stabilityModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les grandes puissances n'interviennent pas à Navarin, la Grèce reste ottomane. Si le soulèvement s'étend aux Balkans, l'Empire ottoman s'effondre plus tôt.",
		},
		historical_outcome:
			"La Grèce indépendante est minuscule (Péloponnèse + îles). La « Grande Idée » — réunir tous les Grecs — mène à un siècle de conflits avec l'Empire ottoman. Le précédent grec inspire les nationalismes serbe, roumain, bulgare. La « question d'Orient » domine la diplomatie européenne jusqu'en 1914.",
		status: 'pending',
	},

	{
		id: 'evt_opium_wars',
		name: "Guerres de l'Opium",
		description:
			"La Grande-Bretagne force la Chine à ouvrir ses ports au commerce (et à l'opium). Première guerre (1839-1842) : traité de Nankin, cession de Hong Kong. Seconde guerre (1856-1860) : sac du Palais d'Été. Le « siècle d'humiliation » commence.",
		type: 'crisis',
		category: 'military',
		year: 1840,
		yearRange: [1839, 1860],
		affectedNationIds: ['nat_song', 'nat_england', 'nat_france'],
		affectedRegionIds: ['clim_east_asia'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: [
				'evt_qianlong_zenith',
				'evt_industrial_revolution_begins',
			],
			requiredTechs: ['tech_steam_engine'],
			customCondition:
				"La Chine doit refuser le commerce libre (refus Macartney, 1793). La Grande-Bretagne doit avoir un déficit commercial avec la Chine (thé vs argent). L'opium cultivé en Inde doit être le moyen de combler ce déficit.",
		},
		effects: {
			militaryModifier: -2,
			economicModifier: -3,
			stabilityModifier: -2,
			prestigeModifier: -3,
			customEffect:
				"Le commissaire Lin Zexu détruit 20 000 caisses d'opium (1839). La Royal Navy bombarde Canton. Le traité de Nankin (1842) : Hong Kong cédé, 5 ports ouverts, indemnité de 21 millions de dollars. Seconde guerre : les troupes franco-britanniques pillent et brûlent le Palais d'Été (1860). Victor Hugo dénonce le sac. Les « traités inégaux » humilient la Chine.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_opium_resist',
				label: 'Résister aux Britanniques',
				description: "Détruire l'opium. Fermer les ports. Risquer la guerre.",
				effects: { militaryModifier: -1, prestigeModifier: 1 },
			},
			{
				id: 'evt_opium_concede',
				label: 'Négocier avec les Occidentaux',
				description:
					'Ouvrir le commerce pour éviter la destruction. Humiliation mais survie.',
				effects: { economicModifier: 1, prestigeModifier: -2 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si la Chine se modernise militairement dès 1800, elle résiste à la Royal Navy. Si le commerce est ouvert avant 1839, pas de guerre.',
		},
		historical_outcome:
			"La Chine perd Hong Kong (jusqu'en 1997), ouvre des dizaines de ports, accepte l'extraterritorialité. La révolte des Taiping (1850-1864) — 20 à 30 millions de morts — aggrave le chaos. Le « siècle d'humiliation » (1839-1949) forge l'identité nationale chinoise moderne. La Chine ne se relèvera pas avant Mao.",
		status: 'pending',
	},

	{
		id: 'evt_taiping_rebellion',
		name: 'Révolte des Taiping',
		description:
			"Hong Xiuquan, un chrétien mystique qui se croit frère de Jésus, mène la plus sanglante guerre civile de l'histoire (1850-1864). Le Royaume céleste des Taiping contrôle le sud de la Chine. 20 à 30 millions de morts — plus que la Première Guerre mondiale.",
		type: 'crisis',
		category: 'religious',
		year: 1850,
		yearRange: [1850, 1864],
		affectedNationIds: ['nat_song'],
		affectedRegionIds: ['clim_east_asia'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_opium_wars'],
			customCondition:
				"La Chine doit être affaiblie par les guerres de l'opium. La famine, la corruption et le chômage doivent être endémiques. Hong Xiuquan doit échouer aux examens impériaux et avoir une vision mystique.",
		},
		effects: {
			stabilityModifier: -3,
			populationModifier: -0.08,
			economicModifier: -3,
			militaryModifier: -1,
			customEffect:
				"Les Taiping abolissent la propriété privée, le foot binding, l'opium, l'alcool et la prostitution. Nankin est leur capitale. Mais les querelles internes et la brutalité minent le mouvement. Les armées régionales de Zeng Guofan et Li Hongzhang, soutenues par les Occidentaux (Gordon, « l'armée toujours victorieuse »), écrasent finalement les Taiping en 1864.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les Taiping ne se déchirent pas entre eux, ils renversent les Qing 50 ans plus tôt. Si les Occidentaux soutiennent les Taiping au lieu des Qing, la Chine devient chrétienne.',
		},
		historical_outcome:
			"30 millions de morts. Le sud de la Chine est dévasté. La dynastie Qing survit mais ne s'en remet jamais. Le pouvoir passe aux chefs militaires régionaux. Le mouvement d'auto-renforcement (modernisation) commence. Hong Xiuquan se suicide en 1864. Nankin tombe après un siège terrible.",
		status: 'pending',
	},

	{
		id: 'evt_revolutions_1848',
		name: 'Printemps des peuples — Révolutions de 1848',
		description:
			"En quelques semaines, des révolutions éclatent dans toute l'Europe : Paris, Vienne, Berlin, Budapest, Milan, Prague. Libéralisme et nationalisme contre l'ordre de Metternich. Presque toutes échouent — mais rien ne sera plus comme avant.",
		type: 'crisis',
		category: 'political',
		year: 1848,
		yearRange: [1848, 1849],
		affectedNationIds: ['nat_france', 'nat_hre', 'nat_hungary', 'nat_venice'],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
			'clim_mediterranean',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: [
				'evt_congress_vienna',
				'evt_industrial_revolution_begins',
				'evt_irish_famine',
			],
			customCondition:
				'La crise économique de 1846-47 (mauvaises récoltes dont la famine irlandaise, chômage industriel) doit exister. Les mouvements libéraux et nationalistes doivent être réprimés par le système de Metternich. La presse et les idées circulent malgré la censure.',
		},
		effects: {
			stabilityModifier: -2,
			prestigeModifier: 1,
			techUnlocks: ['tech_telegraph'],
			customEffect:
				"Février : Louis-Philippe abdique, IIe République en France. Mars : Metternich fuit Vienne. La Diète de Francfort tente d'unifier l'Allemagne. Kossuth proclame l'indépendance hongroise. La République romaine (Mazzini, Garibaldi). Mais en 1849 : la Russie écrase la Hongrie, la France restaure le pape, Frédéric-Guillaume IV refuse la couronne allemande. Marx et Engels publient le Manifeste du Parti communiste (février 1848).",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_1848_rebel',
				label: 'Rejoindre la révolution',
				description:
					'Constitution, liberté de la presse, suffrage universel — les peuples le méritent.',
				effects: { stabilityModifier: -1, prestigeModifier: 1 },
			},
			{
				id: 'evt_1848_suppress',
				label: 'Réprimer les insurgés',
				description:
					"L'ordre doit être maintenu. Les concessions mènent à l'anarchie.",
				effects: { stabilityModifier: 1, prestigeModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les révolutionnaires s'unissent au lieu de se diviser sur les questions nationales, 1848 réussit. Si la Russie n'intervient pas en Hongrie, les Habsbourg tombent.",
		},
		historical_outcome:
			"Toutes les révolutions échouent sauf en France (IIe République, puis coup d'État de Napoléon III en 1851). Le servage est aboli en Autriche-Hongrie. Le suffrage universel masculin est acquis en France. La leçon : le nationalisme se réalisera « par le fer et le sang » (Bismarck), pas par des assemblées. Marx tire ses conclusions.",
		status: 'pending',
	},

	{
		id: 'evt_crimean_war',
		name: 'Guerre de Crimée',
		description:
			"La Russie contre l'Empire ottoman, la France, l'Angleterre et le Piémont (1853-1856). Le siège de Sébastopol, la charge de la Brigade légère, Florence Nightingale. Première guerre « moderne » : télégraphe, chemin de fer, photographie. 750 000 morts, surtout de maladie.",
		type: 'crisis',
		category: 'military',
		year: 1854,
		yearRange: [1853, 1856],
		affectedNationIds: [
			'nat_kievan_rus',
			'nat_france',
			'nat_england',
			'nat_ghaznavid',
		],
		affectedRegionIds: ['clim_continental_east_europe', 'clim_arid_mideast'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_congress_vienna'],
			customCondition:
				"La Russie doit revendiquer la protection des chrétiens orthodoxes de l'Empire ottoman. La France et l'Angleterre doivent s'opposer à l'expansion russe en Méditerranée. Le Concert européen doit être brisé.",
		},
		effects: {
			militaryModifier: -1,
			populationModifier: -0.02,
			economicModifier: -1,
			techUnlocks: ['tech_photography'],
			customEffect:
				'Le siège de Sébastopol dure 11 mois. La charge de la Brigade légère à Balaklava — héroïque et absurde. Florence Nightingale révolutionne les soins infirmiers. Le télégraphe permet de suivre la guerre en temps réel. La photographie de Roger Fenton montre la guerre pour la première fois. Le traité de Paris (1856) neutralise la mer Noire.',
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la Russie ne provoque pas l'incident des Lieux Saints, la guerre est évitée. Si l'Autriche soutient la Russie, la coalition occidentale est plus faible.",
		},
		historical_outcome:
			"La Russie, humiliée, lance des réformes massives : abolition du servage (1861), réforme judiciaire, zemstvos. Le Concert européen est mort. Le Piémont (Cavour) gagne en prestige — prélude à l'unification italienne. Napoléon III est au sommet de son pouvoir. La Russie se tourne vers l'Asie centrale et l'Extrême-Orient.",
		status: 'pending',
	},

	{
		id: 'evt_italian_unification',
		name: "Unification de l'Italie — Risorgimento",
		description:
			"Cavour (diplomatie), Garibaldi (action) et Victor-Emmanuel II (monarchie) unifient l'Italie en une décennie. L'Expédition des Mille (1860), les batailles de Magenta et Solferino, la prise de Rome (1870). La péninsule est enfin un État.",
		type: 'political',
		category: 'political',
		year: 1861,
		yearRange: [1859, 1871],
		affectedNationIds: ['nat_venice', 'nat_papal', 'nat_hre', 'nat_france'],
		affectedRegionIds: ['clim_mediterranean', 'clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_revolutions_1848', 'evt_crimean_war'],
			customCondition:
				"Le Piémont-Sardaigne doit être le moteur de l'unification. Cavour doit obtenir l'alliance française (Plombières, 1858). L'Autriche doit être affaiblie. Garibaldi doit conquérir le sud.",
		},
		effects: {
			stabilityModifier: -1,
			militaryModifier: 1,
			prestigeModifier: 2,
			nationMutations: [
				{
					nationId: 'nat_papal',
					rename: { name: "Royaume d'Italie", dempinym: 'Italien' },
					changeGovernance: 'feudal_monarchy',
					changeCapital: 'set_turin',
					changeRuler: {
						name: 'Victor-Emmanuel II',
						dynastyName: 'Savoie',
						birthYear: 1820,
						age: 39,
						traits: ['pragmatic', 'soldier', 'nationalist'],
					},
				},
			],
			customEffect:
				"Guerre franco-autrichienne (1859) : Magenta, Solferino — la France aide le Piémont. L'Expédition des Mille (1860) : Garibaldi conquiert la Sicile et Naples avec 1 000 volontaires en chemise rouge. Rome est prise en 1870 (le pape se déclare « prisonnier du Vatican »). Mais le sud reste pauvre, le brigandage persiste. « L'Italie est faite, il faut faire les Italiens » (d'Azeglio).",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la France ne soutient pas le Piémont, l'Autriche garde le nord de l'Italie. Si Garibaldi marche sur Rome en 1860 au lieu du sud, le pape est protégé par la France et l'unification échoue.",
		},
		historical_outcome:
			"Le Royaume d'Italie proclamé en 1861 (capitale Turin, puis Florence, puis Rome en 1871). L'Italie reste divisée économiquement — nord industriel, sud agraire. La « question méridionale » persiste. Le Vatican ne reconnaît l'Italie qu'en 1929 (accords du Latran). L'irrédentisme italien (Trente, Trieste) mène à la Première Guerre mondiale.",
		status: 'pending',
	},

	{
		id: 'evt_german_unification',
		name: 'Unification allemande — Bismarck',
		description:
			"Otto von Bismarck unifie l'Allemagne « par le fer et le sang ». Trois guerres victorieuses : Danemark (1864), Autriche (1866), France (1870-71). L'Empire allemand est proclamé dans la Galerie des Glaces de Versailles le 18 janvier 1871.",
		type: 'political',
		category: 'military',
		year: 1871,
		yearRange: [1862, 1871],
		affectedNationIds: ['nat_hre', 'nat_france', 'nat_denmark'],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_revolutions_1848', 'evt_frederick_great'],
			customCondition:
				"La Prusse doit être la plus forte des États allemands. Bismarck doit être ministre-président. L'Autriche doit être exclue de la solution allemande (« kleindeutsch »).",
		},
		effects: {
			militaryModifier: 3,
			economicModifier: 2,
			prestigeModifier: 3,
			stabilityModifier: 1,
			nationMutations: [
				{
					nationId: 'nat_hre',
					rename: { name: 'Empire allemand', dempinym: 'Allemand' },
					changeGovernance: 'empire',
					changeCapital: 'set_berlin',
					changeRuler: {
						name: 'Guillaume Ier',
						dynastyName: 'Hohenzollern',
						birthYear: 1797,
						age: 74,
						traits: ['conservative', 'military', 'dignified'],
					},
				},
				{
					nationId: 'nat_france',
					cededTo: {
						nationId: 'nat_hre',
						regionDescription: 'Alsace-Lorraine',
					},
				},
			],
			customEffect:
				"Guerre des Duchés (1864) avec l'Autriche contre le Danemark. Guerre austro-prussienne (1866) : Sadowa — victoire en 7 semaines. Confédération de l'Allemagne du Nord. Guerre franco-prussienne (1870-71) : Sedan, siège de Paris, la Commune. L'Empire allemand naît à Versailles — humiliation calculée de la France. L'Alsace-Lorraine annexée. L'Allemagne devient la première puissance industrielle et militaire du continent.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_bismarck_support',
				label: 'Soutenir Bismarck',
				description:
					"L'unité allemande par la force prussienne. Ordre et puissance.",
				effects: { militaryModifier: 1, stabilityModifier: 1 },
			},
			{
				id: 'evt_bismarck_oppose',
				label: "Défendre l'autonomie régionale",
				description:
					'La Bavière, la Saxe, le Hanovre ont leur propre identité. Refuser la domination prussienne.',
				effects: { prestigeModifier: 1, militaryModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Autriche vainc à Sadowa, elle domine l'Allemagne (solution « großdeutsch »). Si la France ne tombe pas dans le piège de la dépêche d'Ems, la guerre de 1870 n'a pas lieu.",
		},
		historical_outcome:
			"L'Empire allemand (1871-1918) devient la puissance montante de l'Europe. Bismarck maintient la paix par un système d'alliances complexe. Mais Guillaume II (1888) renvoie Bismarck (1890) et mène une politique agressive — course navale, Weltpolitik. L'Alsace-Lorraine empoisonne les relations franco-allemandes. Le chemin vers 1914 est tracé.",
		status: 'pending',
	},

	{
		id: 'evt_us_civil_war',
		name: 'Guerre de Sécession américaine',
		description:
			"Les États du Sud font sécession (1861). Quatre ans de guerre : 620 000 morts, plus que toutes les autres guerres américaines combinées. Lincoln abolit l'esclavage (1863). Le Nord industriel écrase le Sud agraire. Les États-Unis restent unis mais traumatisés.",
		type: 'crisis',
		category: 'military',
		year: 1861,
		yearRange: [1861, 1865],
		affectedNationIds: ['nat_england'],
		affectedRegionIds: ['clim_northeast_america', 'clim_mississippi_valley'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: [
				'evt_american_revolution',
				'evt_industrial_revolution_begins',
				'evt_abolition_slavery',
			],
			customCondition:
				"La question de l'esclavage doit diviser les États-Unis depuis la fondation. L'élection de Lincoln (1860) doit provoquer la sécession des États du Sud. Le compromis du Missouri et le Kansas-Nebraska Act n'ont fait que retarder la crise.",
		},
		effects: {
			populationModifier: -0.03,
			economicModifier: -2,
			militaryModifier: 2,
			stabilityModifier: -2,
			techUnlocks: ['tech_ironclad'],
			customEffect:
				"Fort Sumter (avril 1861), Bull Run, Antietam, Gettysburg (juillet 1863), la marche de Sherman vers la mer. La Proclamation d'émancipation (1er janvier 1863), le 13e amendement (1865). Le Sud est dévasté. La Reconstruction (1865-1877) tente d'intégrer 4 millions d'anciens esclaves. Les lois Jim Crow annulent les acquis. Le traumatisme dure un siècle.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le Sud obtient la reconnaissance de la France et de l'Angleterre, la Confédération survit. Si le compromis Crittenden est accepté, la guerre est retardée.",
		},
		historical_outcome:
			"Lee se rend à Appomattox (9 avril 1865). Lincoln est assassiné 5 jours plus tard. La Reconstruction échoue : les lois Jim Crow instituent la ségrégation. Le Sud reste pauvre pendant un siècle. Mais l'Union est préservée, l'esclavage aboli, et les États-Unis deviennent la première puissance économique mondiale d'ici 1900.",
		status: 'pending',
	},

	{
		id: 'evt_meiji_restoration',
		name: 'Restauration Meiji — Modernisation du Japon',
		description:
			"Le shogunat Tokugawa tombe. L'empereur Meiji (15 ans) reprend le pouvoir en 1868. En 30 ans, le Japon passe du féodalisme à l'ère industrielle : constitution, armée moderne, chemin de fer, éducation universelle. Le seul pays non-occidental à s'industrialiser au XIXe siècle.",
		type: 'milestone',
		category: 'political',
		year: 1868,
		yearRange: [1853, 1890],
		affectedNationIds: ['nat_japan'],
		affectedRegionIds: ['clim_japan'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_tokugawa_sakoku'],
			customCondition:
				"Les « navires noirs » du commodore Perry doivent forcer l'ouverture (1853). Les traités inégaux doivent humilier le Japon. Les domaines de Satsuma et Chōshū doivent mener la rébellion contre le shogunat.",
		},
		effects: {
			militaryModifier: 3,
			economicModifier: 3,
			prestigeModifier: 3,
			stabilityModifier: -1,
			nationMutations: [
				{
					nationId: 'nat_japan',
					rename: { name: 'Empire du Japon', dempinym: 'Japonais' },
					changeGovernance: 'empire',
					changeCapital: 'set_tokyo',
					changeRuler: {
						name: 'Mutsuhito (Meiji)',
						dynastyName: 'Yamato',
						birthYear: 1852,
						age: 16,
						traits: ['modernizer', 'dignified', 'reformer'],
					},
				},
			],
			customEffect:
				"La Charte des Cinq Articles (1868). Abolition des classes féodales. Conscription universelle (1873). La mission Iwakura (1871-73) étudie l'Occident. Chemin de fer Tokyo-Yokohama (1872). Constitution Meiji (1889) — inspirée de Bismarck. Avec le slogan « fukoku kyōhei » (pays riche, armée forte), le Japon devient une puissance industrielle et militaire en une génération.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_meiji_westernize',
				label: "S'occidentaliser totalement",
				description:
					'Adopter la technologie, les institutions et même les vêtements occidentaux.',
				effects: { prestigeModifier: 2, stabilityModifier: -1 },
			},
			{
				id: 'evt_meiji_selective',
				label: 'Modernisation sélective',
				description: 'Technologie occidentale, esprit japonais (wakon yōsai).',
				effects: { stabilityModifier: 1, economicModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le shogunat se modernise lui-même (comme il a tenté), la restauration n'a pas lieu. Si Saigō Takamori réussit sa rébellion de Satsuma (1877), le Japon revient au féodalisme.",
		},
		historical_outcome:
			'Le Japon vainc la Chine (1894-95) puis la Russie (1905) — premier pays asiatique à vaincre une puissance européenne. Annexion de Formose (1895) et de la Corée (1910). Le Japon entre dans le club des grandes puissances. Mais le militarisme grandit. La rébellion de Satsuma (1877) est le dernier combat des samouraïs.',
		status: 'pending',
	},

	{
		id: 'evt_scramble_for_africa',
		name: "Partage de l'Afrique — Conférence de Berlin",
		description:
			"Les puissances européennes se partagent l'Afrique comme un gâteau. La Conférence de Berlin (1884-85) fixe les règles : « occupation effective ». En 20 ans, 90% de l'Afrique est colonisée. Seules l'Éthiopie et le Libéria restent indépendants.",
		type: 'crisis',
		category: 'diplomatic',
		year: 1885,
		yearRange: [1880, 1900],
		affectedNationIds: [
			'nat_england',
			'nat_france',
			'nat_hre',
			'nat_ethiopia',
			'nat_ghana',
			'nat_yoruba',
			'nat_swahili_cities',
			'nat_zimbabwe',
		],
		affectedRegionIds: [
			'clim_tropical_africa',
			'clim_sahel',
			'clim_east_africa_highland',
			'clim_congo_rainforest',
			'clim_kalahari',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: [
				'evt_industrial_revolution_begins',
				'evt_suez_canal',
				'evt_shaka_zulu_mfecane',
			],
			customCondition:
				"Les puissances européennes doivent être industrialisées et chercher des matières premières et des marchés. Le Mfecane doit avoir déstabilisé l'Afrique australe. L'exploration (Livingstone, Stanley) doit avoir cartographié l'intérieur. La rivalité franco-britannique en Afrique doit exister.",
		},
		effects: {
			economicModifier: 2,
			stabilityModifier: -2,
			populationModifier: -0.03,
			customEffect:
				"La Conférence de Berlin (1884-85) : 14 nations européennes se partagent l'Afrique sans qu'un seul Africain soit présent. Le Congo est donné à Léopold II comme propriété personnelle — 10 millions de morts. Les Zoulous, les Ashanti, les Mahdistes résistent héroïquement. L'Éthiopie de Menelik II vainc les Italiens à Adoua (1896). Les frontières coloniales, tracées au cordeau, ignorent les réalités ethniques — source de conflits jusqu'à aujourd'hui.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_africa_colonize',
				label: 'Participer à la colonisation',
				description:
					"Matières premières, marchés, prestige. « Le fardeau de l'homme blanc » (Kipling).",
				effects: { economicModifier: 2, prestigeModifier: -1 },
			},
			{
				id: 'evt_africa_resist',
				label: 'Résister à la colonisation',
				description:
					'Défendre la souveraineté africaine. Moderniser pour survivre.',
				effects: { militaryModifier: -1, prestigeModifier: 2 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les royaumes africains se modernisent (comme l'Éthiopie), la colonisation est plus difficile. Si les puissances européennes se disputent l'Afrique (Fachoda, 1898), une guerre européenne éclate plus tôt.",
		},
		historical_outcome:
			"En 1914, seules l'Éthiopie et le Libéria sont indépendants. Le Congo de Léopold II est un enfer. L'apartheid commence en Afrique du Sud (1948). Les indépendances (1950s-1960s) héritent de frontières artificielles. Les conséquences du partage de Berlin — guerres civiles, sous-développement, néocolonialisme — persistent au XXIe siècle.",
		status: 'pending',
	},

	{
		id: 'evt_abolition_slavery',
		name: "Abolition progressive de l'esclavage",
		description:
			"La Grande-Bretagne abolit la traite (1807) puis l'esclavage (1833). La France : 1794, rétabli 1802, aboli définitivement 1848. Les États-Unis : 1865. Le Brésil : 1888. Un mouvement moral et politique sans précédent qui met un siècle à aboutir.",
		type: 'milestone',
		category: 'political',
		year: 1833,
		yearRange: [1807, 1888],
		affectedNationIds: ['nat_england', 'nat_france', 'nat_yoruba', 'nat_ghana'],
		affectedRegionIds: [
			'clim_tropical_africa',
			'clim_northeast_america',
			'clim_south_american_subtropical',
			'clim_temperate_europe',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: [
				'evt_slave_trade_peak',
				'evt_enlightenment',
				'evt_haitian_revolution',
			],
			customCondition:
				'Le mouvement abolitionniste doit exister (Quakers, Wilberforce, Société des Amis des Noirs). La révolution haïtienne doit montrer que les esclaves peuvent se libérer. Les intérêts économiques doivent évoluer (sucre de betterave vs sucre de canne).',
		},
		effects: {
			stabilityModifier: 1,
			economicModifier: -1,
			prestigeModifier: 3,
			customEffect:
				"Wilberforce et le mouvement abolitionniste en Angleterre. Le Slavery Abolition Act (1833) libère 800 000 esclaves. La Royal Navy traque les navires négriers (le « Squadron d'Afrique de l'Ouest »). Victor Schœlcher impose l'abolition en France (1848). La guerre de Sécession (1865) libère 4 millions d'esclaves. Le Brésil est le dernier — la Lei Áurea (1888). Mais la ségrégation, le racisme et les inégalités persistent longtemps.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_abolish_now',
				label: "Abolir l'esclavage immédiatement",
				description:
					'Liberté pour tous. Indemniser les propriétaires. Intégrer les affranchis.',
				effects: { prestigeModifier: 2, economicModifier: -1 },
			},
			{
				id: 'evt_abolish_gradual',
				label: 'Abolition progressive',
				description:
					'Transition en douceur. Apprentissage obligatoire avant la pleine liberté.',
				effects: { stabilityModifier: 1, prestigeModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le mouvement abolitionniste échoue en Angleterre, la traite continue plus longtemps. Si la guerre de Sécession n'a pas lieu, l'esclavage persiste aux États-Unis jusqu'au XXe siècle.",
		},
		historical_outcome:
			"L'abolition de l'esclavage est la plus grande victoire morale du XIXe siècle. Mais la ségrégation (Jim Crow), le racisme systémique, le colonialisme africain et les inégalités économiques persistent. La « dette de l'indépendance » d'Haïti (150 millions de francs) n'est remboursée qu'en 1947. Les conséquences de l'esclavage continuent de façonner le monde.",
		status: 'pending',
	},

	{
		id: 'evt_darwin_evolution',
		name: "Darwin — De l'origine des espèces",
		description:
			"Charles Darwin publie De l'origine des espèces (1859). La théorie de l'évolution par sélection naturelle bouleverse la biologie, la philosophie et la religion. L'homme n'est plus au centre de la Création. La science et la foi s'affrontent.",
		type: 'cultural_shift',
		category: 'scientific',
		year: 1859,
		yearRange: [1831, 1882],
		affectedNationIds: ['nat_england'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_enlightenment', 'evt_cook_voyages'],
			requiredTechs: ['tech_scientific_method'],
			customCondition:
				"La géologie (Lyell) doit avoir montré l'ancienneté de la Terre. Le voyage du Beagle (1831-1836) doit avoir eu lieu. Wallace doit arriver indépendamment aux mêmes conclusions, forçant Darwin à publier.",
		},
		effects: {
			prestigeModifier: 3,
			religiousTensionModifier: 2,
			customEffect:
				"De l'origine des espèces (24 novembre 1859) : 1 250 exemplaires vendus le premier jour. Le débat Huxley vs Wilberforce à Oxford (1860). La Descendance de l'homme (1871) — l'homme descend du singe. Le darwinisme social (Spencer, pas Darwin) justifie le racisme et l'impérialisme. Mais la biologie moderne est née — génétique, écologie, médecine évolutive.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Darwin ne publie pas, Wallace publie — la théorie arrive de toute façon. Si l'Église réussit à faire censurer le livre, la biologie est retardée d'une génération. Le darwinisme social émerge quand même via Malthus et Spencer.",
		},
		historical_outcome:
			"La théorie de l'évolution est le fondement de la biologie moderne. Darwin meurt en 1882, enterré à Westminster Abbey à côté de Newton. La synthèse moderne (1930s-40s) unit Darwin et Mendel. Le débat évolution vs créationnisme continue au XXIe siècle, surtout aux États-Unis. Le darwinisme social a été détourné pour justifier le racisme et l'eugénisme.",
		status: 'pending',
	},

	{
		id: 'evt_suez_canal',
		name: 'Ouverture du canal de Suez',
		description:
			"Ferdinand de Lesseps construit le canal de Suez (1859-1869), reliant la Méditerranée à la mer Rouge. La distance Londres-Bombay est réduite de 40%. L'Angleterre rachète les parts égyptiennes (1875). Le contrôle du canal devient un enjeu géopolitique majeur.",
		type: 'milestone',
		category: 'economic',
		year: 1869,
		yearRange: [1859, 1875],
		affectedNationIds: ['nat_france', 'nat_england'],
		affectedRegionIds: [
			'clim_nile_valley',
			'clim_mediterranean',
			'clim_arid_mideast',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_industrial_revolution_begins'],
			customCondition:
				"L'Égypte doit être dirigée par un khédive modernisateur (Saïd, puis Ismaïl). La France doit avoir l'expertise technique. Le commerce avec l'Asie doit justifier l'investissement colossal.",
		},
		effects: {
			economicModifier: 3,
			prestigeModifier: 2,
			customEffect:
				"10 ans de construction, 1,5 million de travailleurs (dont beaucoup meurent). 164 km de canal. L'inauguration (17 novembre 1869) est une fête mondiale — Verdi compose Aida pour l'occasion (créée en 1871). L'Angleterre, initialement hostile, rachète les parts du khédive endetté (1875). Le canal devient l'artère vitale de l'Empire britannique.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le projet échoue techniquement, le cap de Bonne-Espérance reste la route principale. Si l'Égypte garde le contrôle, elle devient une puissance régionale majeure.",
		},
		historical_outcome:
			"Le canal transforme le commerce mondial. L'Égypte s'endette et est occupée par les Britanniques (1882). Le canal restera sous contrôle anglo-français jusqu'à la nationalisation par Nasser (1956 — crise de Suez). Lesseps tente de reproduire l'exploit à Panama — échec retentissant et scandale financier.",
		status: 'pending',
	},

	{
		id: 'evt_paris_commune',
		name: 'Commune de Paris',
		description:
			"Après la défaite de 1870 et le siège de Paris, les Parisiens insurgés proclament la Commune (18 mars - 28 mai 1871). 72 jours d'autogestion ouvrière. Institution de la laïcité, du travail des femmes, de l'éducation gratuite. Écrasée dans le sang par Thiers — la « Semaine sanglante » : 20 000 morts.",
		type: 'crisis',
		category: 'political',
		year: 1871,
		yearRange: [1871, 1871],
		affectedNationIds: ['nat_france'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_german_unification'],
			customCondition:
				'La France doit être vaincue par la Prusse (Sedan, 1870). Paris doit être assiégé et affamé. Le gouvernement de Thiers doit fuir à Versailles. La garde nationale parisienne doit être armée et radicalisée.',
		},
		effects: {
			stabilityModifier: -2,
			populationModifier: -0.01,
			customEffect:
				"La Commune : séparation de l'Église et de l'État, égalité des salaires, droit de vote des femmes (proposé), éducation gratuite et laïque. Les quartiers s'autogouvernent. Mais la Semaine sanglante (21-28 mai 1871) : les Versaillais écrasent la Commune. 20 000 fusillés, 43 000 prisonniers, 7 000 déportés en Nouvelle-Calédonie (dont Louise Michel).",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_commune_join',
				label: 'Rejoindre la Commune',
				description: 'Autogestion, justice sociale, laïcité. Risque de mort.',
				effects: { stabilityModifier: -1, prestigeModifier: 1 },
			},
			{
				id: 'evt_commune_versailles',
				label: 'Soutenir le gouvernement de Versailles',
				description:
					"L'ordre républicain contre l'anarchie. Réprimer l'insurrection.",
				effects: { stabilityModifier: 1, prestigeModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la Commune négocie avec Versailles, elle obtient une autonomie municipale. Si les provinciaux se soulèvent aussi (Lyon, Marseille l'ont tenté), la révolution s'étend.",
		},
		historical_outcome:
			'La Commune inspire Marx, Lénine, les anarchistes et tous les mouvements ouvriers. La IIIe République se construit contre la Commune (conservatisme) puis en intégrant ses idées (laïcité 1905, éducation gratuite). Le Mur des Fédérés au Père-Lachaise reste un lieu de mémoire de la gauche française.',
		status: 'pending',
	},

	{
		id: 'evt_shaka_zulu_mfecane',
		name: 'Shaka Zulu et le Mfecane',
		description:
			"Shaka kaSenzangakhona transforme le petit clan zoulou en un empire militaire redoutable (1816-1828). Ses innovations tactiques (assegai courte, formation en corne de buffle) bouleversent l'Afrique australe. Le Mfecane — vague de migrations et de guerres — redessine la carte de la région.",
		type: 'crisis',
		category: 'military',
		year: 1818,
		yearRange: [1816, 1840],
		affectedNationIds: ['nat_zimbabwe', 'nat_swahili_cities'],
		affectedRegionIds: [
			'clim_east_africa_highland',
			'clim_kalahari',
			'clim_tropical_africa',
		],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_congress_vienna'],
			customCondition:
				'Les pressions démographiques et les sécheresses doivent exister en Afrique australe. Shaka doit prendre le pouvoir du clan Zoulou. Les royaumes voisins (Ndwandwe, Mthethwa) doivent être en compétition.',
		},
		effects: {
			militaryModifier: 3,
			stabilityModifier: -2,
			populationModifier: -0.04,
			customEffect:
				"Shaka crée un État militarisé : conscription des jeunes hommes en régiments (impi), interdiction du mariage avant la victoire au combat. L'assegai courte (iklwa) remplace le javelot. La formation en « corne de buffle » : centre qui fixe, ailes qui encerclent. Le Mfecane déplace des millions de personnes — les Ndebele fuient vers le Zimbabwe, les Sotho se réfugient dans les montagnes (futur Lesotho). Shaka est assassiné par ses demi-frères en 1828.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Shaka est tué plus tôt, le royaume Zoulou reste un clan parmi d'autres. Si le Mfecane n'a pas lieu, les Boers trouvent une région plus densément peuplée et la colonisation est plus difficile.",
		},
		historical_outcome:
			"Le royaume Zoulou survit à Shaka mais sera finalement détruit par les Britanniques (guerre anglo-zouloue, 1879 — victoire zouloue à Isandlwana, puis défaite à Ulundi). Le Mfecane crée le Lesotho (Moshoeshoe), le Swaziland, les Ndebele du Zimbabwe. Quand les Boers arrivent dans le Natal (1838), ils trouvent une région vidée par le Mfecane — ce qui alimente le mythe d'une terre « vide ».",
		status: 'pending',
	},

	{
		id: 'evt_tanzimat',
		name: 'Réformes Tanzimat — Modernisation ottomane',
		description:
			"L'Empire ottoman tente de se moderniser pour survivre : le Hatt-i Sharif de Gülhane (1839) et le Hatt-i Hümayun (1856) proclament l'égalité devant la loi, la modernisation de l'armée et de l'administration. Le « vieil homme malade de l'Europe » lutte contre la décomposition.",
		type: 'political',
		category: 'political',
		year: 1839,
		yearRange: [1839, 1876],
		affectedNationIds: ['nat_ghaznavid'],
		affectedRegionIds: ['clim_arid_mideast', 'clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_greek_independence', 'evt_napoleon_empire'],
			customCondition:
				"L'Empire ottoman doit être affaibli par les pertes territoriales (Grèce, Algérie, Serbie). Le sultan Mahmud II doit avoir détruit les janissaires (1826). Les réformateurs (Mustafa Reşid Pacha) doivent avoir étudié en Europe.",
		},
		effects: {
			stabilityModifier: -1,
			prestigeModifier: 1,
			economicModifier: 1,
			customEffect:
				"Réformes juridiques (code pénal calqué sur le français), création de lycées modernes, télégraphe, chemin de fer. Égalité théorique entre musulmans et non-musulmans (millets). Mais les conservateurs résistent, les nationalités balkaniques ne sont pas satisfaites, et le sultan Abdülhamid II suspend la constitution (1878) et impose 30 ans d'autocratie. Les Jeunes-Turcs le renverseront en 1908.",
		},
		severity: 6,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_tanzimat_modernize',
				label: 'Soutenir les réformes',
				description:
					"Moderniser l'empire. Adopter les institutions occidentales. Risque de déstabilisation.",
				effects: { prestigeModifier: 1, stabilityModifier: -1 },
			},
			{
				id: 'evt_tanzimat_conserve',
				label: 'Défendre la tradition',
				description:
					"Les réformes trahissent l'islam et la charia. Résister à l'occidentalisation.",
				effects: { stabilityModifier: 1, religiousTensionModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les Tanzimat réussissent pleinement, l'Empire ottoman devient une monarchie constitutionnelle viable. Si les réformes sont abandonnées plus tôt, l'empire s'effondre avant 1900.",
		},
		historical_outcome:
			"Les Tanzimat échouent à sauver l'empire mais modernisent profondément la société — droit codifié, éducation laïque, administration centralisée. Abdülhamid II suspend la constitution mais poursuit la modernisation (chemin de fer du Hejaz). Les Jeunes-Turcs (1908) reprennent le flambeau. L'héritage Tanzimat influence la Turquie de Mustafa Kemal Atatürk.",
		status: 'pending',
	},

	{
		id: 'evt_irish_famine',
		name: 'Grande Famine irlandaise',
		description:
			"Le mildiou détruit la récolte de pommes de terre en Irlande (1845-1852). Un million de morts, un million d'émigrés. La population passe de 8 à 6 millions. Le gouvernement britannique est accusé de négligence criminelle. La haine de l'Angleterre s'enracine pour un siècle.",
		type: 'natural_disaster',
		category: 'natural',
		year: 1845,
		yearRange: [1845, 1852],
		affectedNationIds: ['nat_england'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_industrial_revolution_begins'],
			customCondition:
				"L'Irlande doit être dépendante de la pomme de terre (monoculture des pauvres). Le système foncier doit concentrer les terres aux mains de propriétaires anglais absentéistes. Le phytophthora infestans doit arriver d'Amérique.",
		},
		effects: {
			populationModifier: -0.12,
			economicModifier: -3,
			stabilityModifier: -2,
			customEffect:
				"Le mildiou détruit la récolte de pommes de terre plusieurs années consécutives. Les « lois sur le maïs » (Corn Laws) sont abolies (1846) mais trop tard. Les workhouses débordent. Les « coffin ships » transportent les émigrés vers l'Amérique — taux de mortalité de 20% à bord. Charles Trevelyan, responsable de l'aide, considère la famine comme un « mécanisme régulateur » divin. L'Irlande ne retrouvera sa population de 1845 qu'au XXIe siècle.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_famine_aid',
				label: 'Envoyer une aide massive',
				description:
					'Nourrir les Irlandais. Suspendre les exportations de nourriture. Coût politique en Angleterre.',
				effects: { economicModifier: -1, prestigeModifier: 1 },
			},
			{
				id: 'evt_famine_laissez',
				label: 'Laisser faire le marché',
				description:
					"Le libre-échange résoudra la crise. Ne pas interférer avec l'économie.",
				effects: { economicModifier: 1, prestigeModifier: -2 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le gouvernement britannique intervient massivement, la famine est atténuée et la population reste stable. Si le mildiou n'arrive pas, la question agraire irlandaise reste un problème politique sans catastrophe démographique.",
		},
		historical_outcome:
			"La famine transforme l'Irlande : la population chute de 8 à 4 millions en 60 ans (famine + émigration continue). La diaspora irlandaise (surtout aux États-Unis) nourrit le nationalisme irlandais. La Land League, le Home Rule, le Sinn Féin, la guerre d'indépendance (1919-1921) — tout découle de la famine. Les Choctaw, eux-mêmes victimes de la Piste des Larmes, envoient 170 dollars aux Irlandais (1847).",
		status: 'pending',
	},

	{
		id: 'evt_sepoy_mutiny',
		name: 'Révolte des Cipayes — Fin de la Compagnie des Indes',
		description:
			"Les cipayes (soldats indiens de la Compagnie des Indes) se mutinent à Meerut (10 mai 1857). La révolte s'étend à Delhi, Lucknow, Kanpur. Atrocités des deux côtés. La Compagnie des Indes est dissoute. Le Raj britannique commence — la reine Victoria est proclamée Impératrice des Indes (1876).",
		type: 'crisis',
		category: 'military',
		year: 1857,
		yearRange: [1857, 1858],
		affectedNationIds: ['nat_england', 'nat_chola'],
		affectedRegionIds: ['clim_south_asia'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_maratha_rise'],
			customCondition:
				"La Compagnie des Indes doit contrôler la majeure partie de l'Inde. La « doctrine du lapse » (annexion des États sans héritier) doit mécontenter les princes. La rumeur des cartouches graissées (porc + bœuf) doit être le déclencheur.",
		},
		effects: {
			militaryModifier: -1,
			stabilityModifier: -2,
			religiousTensionModifier: 2,
			customEffect:
				"Les cipayes prennent Delhi et proclament le vieux Bahadur Shah II empereur moghol. Le siège de Lucknow (87 jours). Le massacre de Kanpur (femmes et enfants britanniques). La reconquête britannique est brutale — exécutions au canon, villages rasés. La Compagnie des Indes est dissoute (1858). L'administration passe directement à la Couronne. Le Raj britannique durera 90 ans.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_sepoy_join',
				label: 'Rejoindre la révolte',
				description:
					'Chasser les Britanniques. Restaurer les souverains indiens.',
				effects: { militaryModifier: 1, stabilityModifier: -1 },
			},
			{
				id: 'evt_sepoy_loyal',
				label: 'Rester loyal aux Britanniques',
				description:
					'La stabilité et la modernisation valent mieux que le chaos.',
				effects: { stabilityModifier: 1, prestigeModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la révolte est mieux coordonnée et s'étend au sud, les Britanniques sont chassés. Si les Sikhs se joignent aux mutins (au lieu de rester loyaux), la reconquête est impossible.",
		},
		historical_outcome:
			"La Compagnie des Indes est dissoute. Le Raj britannique commence. La reine Victoria promet la tolérance religieuse et le respect des princes. Mais le racisme colonial s'aggrave. L'Inde ne sera indépendante qu'en 1947. Bahadur Shah II meurt en exil à Rangoon (1862) — le dernier Moghol.",
		status: 'pending',
	},

	{
		id: 'evt_russian_serfdom_abolition',
		name: 'Abolition du servage en Russie',
		description:
			"Le tsar Alexandre II abolit le servage le 19 février 1861 — 23 millions de serfs sont « libérés ». Mais les conditions sont dures : les paysans doivent racheter leur terre sur 49 ans. Les réformes judiciaires et administratives suivent. « Il vaut mieux abolir le servage par le haut que d'attendre qu'il s'abolisse par le bas. »",
		type: 'political',
		category: 'political',
		year: 1861,
		yearRange: [1861, 1881],
		affectedNationIds: ['nat_kievan_rus'],
		affectedRegionIds: ['clim_continental_east_europe', 'clim_subarctic'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_crimean_war'],
			customCondition:
				"La défaite en Crimée doit avoir révélé le retard russe. Alexandre II doit être convaincu que le servage empêche la modernisation. L'intelligentsia doit faire pression pour les réformes.",
		},
		effects: {
			stabilityModifier: -1,
			economicModifier: 1,
			prestigeModifier: 2,
			customEffect:
				'23 millions de serfs libérés mais sans terres suffisantes — ils doivent racheter des lopins à des prix gonflés sur 49 ans. Les anciens serfs restent liés à la commune (mir). Réformes judiciaires (1864) : tribunaux indépendants, jury, avocats. Zemstvos (assemblées locales). Mais les nihilistes veulent aller plus loin. Alexandre II est assassiné par les Narodnaya Volya (1er mars 1881) — ironie tragique : il signait une réforme constitutionnelle le jour même.',
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_serf_generous',
				label: 'Émancipation généreuse',
				description:
					'Donner des terres aux paysans sans rachat. Mécontenter la noblesse.',
				effects: { stabilityModifier: -1, prestigeModifier: 2 },
			},
			{
				id: 'evt_serf_conservative',
				label: 'Émancipation minimale',
				description:
					'Libérer les serfs mais protéger les intérêts des nobles. Transition lente.',
				effects: { stabilityModifier: 1, economicModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Alexandre II donne des terres généreusement, la Russie évite la révolution de 1917. Si le tsar est assassiné avant 1861, le servage persiste et la Russie s'effondre plus tôt.",
		},
		historical_outcome:
			"Alexandre III (après l'assassinat de son père) annule les réformes et impose la réaction. Mais le servage ne revient pas. L'industrialisation de Witte (1890s), les famines, les inégalités agraires — tout mène à 1905 puis 1917. Les « paiements de rachat » ne sont annulés qu'en 1907. Le problème agraire reste la bombe à retardement de la Russie.",
		status: 'pending',
	},

	{
		id: 'evt_second_industrial_revolution',
		name: 'Seconde Révolution industrielle',
		description:
			"Électricité, acier, pétrole, chimie, automobile, téléphone. Edison, Tesla, Bessemer, Nobel, Benz, Bell. La production industrielle explose. Les États-Unis et l'Allemagne dépassent l'Angleterre. Le monde passe de la vapeur à l'électricité.",
		type: 'milestone',
		category: 'scientific',
		year: 1880,
		yearRange: [1870, 1900],
		affectedNationIds: ['nat_england', 'nat_hre', 'nat_france'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_northeast_america'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_industrial_revolution_begins'],
			customCondition:
				"La première révolution industrielle doit avoir créé les bases (usines, charbon, chemins de fer). Les découvertes scientifiques (Maxwell, Faraday) doivent permettre l'électricité. Le pétrole doit être découvert (Pennsylvanie, 1859).",
		},
		effects: {
			economicModifier: 3,
			populationModifier: 0.03,
			prestigeModifier: 2,
			techUnlocks: [
				'tech_electricity',
				'tech_telephone',
				'tech_bessemer_process',
				'tech_internal_combustion',
				'tech_dynamite',
			],
			customEffect:
				"Le convertisseur Bessemer (1856) — acier bon marché. Edison : ampoule (1879), centrale électrique (1882). Tesla : courant alternatif (1888). Nobel : dynamite (1867). Bell : téléphone (1876). Benz : automobile (1886). Rockefeller (Standard Oil), Carnegie (US Steel), Krupp (acier allemand). Les syndicats naissent. La classe ouvrière s'organise — le mouvement socialiste (Marx, la IIe Internationale, 1889).",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_indrev2_invest',
				label: "Investir dans l'innovation",
				description:
					'Électrifier les villes, construire des usines modernes. Coût massif mais avance technologique.',
				effects: { economicModifier: 2, prestigeModifier: 1 },
			},
			{
				id: 'evt_indrev2_regulate',
				label: 'Réguler le capitalisme sauvage',
				description:
					"Lois sociales, interdiction du travail des enfants, durée du travail. Freiner l'exploitation.",
				effects: { stabilityModifier: 1, economicModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'électricité est découverte plus tard, la seconde révolution est retardée. Si les syndicats obtiennent des droits plus tôt (comme en Allemagne avec Bismarck), la contestation sociale est atténuée.",
		},
		historical_outcome:
			"En 1900, les États-Unis sont la première puissance industrielle mondiale. L'Allemagne est seconde. L'Angleterre décline relativement. L'exposition universelle de Paris (1900) — la Tour Eiffel, le métro — célèbre le progrès. Mais les inégalités sont immenses. Le monde est divisé entre nations industrielles et nations colonisées. La course aux armements commence.",
		status: 'pending',
	},

	{
		id: 'evt_russo_turkish_war_1877',
		name: 'Guerre russo-turque et Congrès de Berlin (1878)',
		description:
			"La Russie déclare la guerre à l'Empire ottoman (1877) pour « libérer » les Slaves des Balkans. Victoire russe. Mais le Congrès de Berlin (1878) — dominé par Bismarck — réduit les gains russes. La Bulgarie, la Serbie, la Roumanie et le Monténégro deviennent indépendants. La « question d'Orient » empoisonne l'Europe.",
		type: 'crisis',
		category: 'military',
		year: 1877,
		yearRange: [1875, 1878],
		affectedNationIds: [
			'nat_kievan_rus',
			'nat_ghaznavid',
			'nat_hre',
			'nat_england',
		],
		affectedRegionIds: ['clim_continental_east_europe', 'clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_crimean_war', 'evt_greek_independence'],
			customCondition:
				'Les révoltes en Bosnie-Herzégovine (1875) et en Bulgarie (1876) doivent provoquer une répression ottomane sanglante. La Russie doit se poser en protectrice des Slaves orthodoxes. Bismarck doit vouloir arbitrer.',
		},
		effects: {
			militaryModifier: 1,
			stabilityModifier: -1,
			customEffect:
				"Le siège de Plevna (143 jours) — résistance héroïque des Ottomans (Osman Pacha). Les Russes arrivent aux portes de Constantinople. Traité de San Stefano (mars 1878) : Grande Bulgarie proche russe. L'Angleterre et l'Autriche protestent. Congrès de Berlin (juin 1878) : Bismarck, « honnête courtier », réduit la Bulgarie, donne la Bosnie à l'Autriche, Chypre à l'Angleterre. La Russie est furieuse.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la Russie maintient le traité de San Stefano, la Grande Bulgarie contrôle les Balkans. Si l'Angleterre entre en guerre contre la Russie, la Crimée se répète. Si Bismarck soutient la Russie, l'alliance austro-allemande n'a pas lieu.",
		},
		historical_outcome:
			"Le Congrès de Berlin humilie la Russie et sème les graines de 1914. La Bulgarie, la Serbie, la Roumanie et le Monténégro sont indépendants mais insatisfaits. La Bosnie sous administration autrichienne — source de la crise de 1908 et de l'assassinat de Sarajevo (1914). La rivalité russo-autrichienne dans les Balkans devient mortelle.",
		status: 'pending',
	},

	{
		id: 'evt_spanish_american_war',
		name: 'Guerre hispano-américaine',
		description:
			"Les États-Unis déclarent la guerre à l'Espagne (1898) après l'explosion du USS Maine à La Havane. En quatre mois, l'Espagne perd Cuba, Porto Rico, Guam et les Philippines. Les États-Unis deviennent une puissance impériale — « a splendid little war » (John Hay).",
		type: 'crisis',
		category: 'military',
		year: 1898,
		yearRange: [1898, 1898],
		affectedNationIds: ['nat_leon', 'nat_england'],
		affectedRegionIds: [
			'clim_south_american_subtropical',
			'clim_southeast_asia',
			'clim_northeast_america',
		],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_us_civil_war'],
			customCondition:
				"Cuba doit être en révolte contre l'Espagne (guerre de 1895). La presse américaine (Hearst, Pulitzer) doit mener une campagne interventionniste. L'explosion du Maine doit fournir le prétexte.",
		},
		effects: {
			militaryModifier: 2,
			prestigeModifier: 2,
			economicModifier: 1,
			customEffect:
				"La bataille de la baie de Manille (1er mai 1898) : Dewey détruit la flotte espagnole en quelques heures. Santiago de Cuba : la flotte espagnole détruite aussi. Le traité de Paris (1898) : l'Espagne cède Cuba, Porto Rico, Guam et les Philippines. Les Philippines se révoltent contre leur nouveau colonisateur — la guerre américano-philippine (1899-1902) fait 200 000 morts civils. Les États-Unis ont un empire colonial.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_spanish_intervene',
				label: 'Intervenir pour libérer Cuba',
				description:
					"Les Cubains souffrent sous l'Espagne. « Remember the Maine! »",
				effects: { militaryModifier: 1, prestigeModifier: 1 },
			},
			{
				id: 'evt_spanish_isolate',
				label: "Maintenir l'isolationnisme",
				description:
					'Les États-Unis ne doivent pas devenir un empire colonial. Washington avait prévenu.',
				effects: { stabilityModifier: 1, economicModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le Maine n'explose pas, la guerre n'a pas lieu (ou est retardée). Si l'Espagne négocie l'indépendance de Cuba, le prétexte disparaît. Si les États-Unis libèrent les Philippines au lieu de les coloniser, ils gagnent un allié.",
		},
		historical_outcome:
			"L'Espagne perd ses dernières colonies — fin de l'empire espagnol (1898 = « El Desastre »). Les États-Unis contrôlent Cuba (amendement Platt), Porto Rico, Guam et les Philippines. Theodore Roosevelt (héros de San Juan Hill) devient président (1901). Le canal de Panama (1903-1914) confirme la puissance américaine. Le XXe siècle sera américain.",
		status: 'pending',
	},

	// ── 1900-2000 ──────────────────────────────────────────────────────────

	{
		id: 'evt_boxer_rebellion',
		name: "Révolte des Boxers — L'Alliance des Huit Nations",
		description:
			"Les Yihequan (« Poings de justice et de concorde ») se soulèvent contre les étrangers et les chrétiens en Chine (1899-1901). L'impératrice Cixi les soutient et déclare la guerre aux puissances. Huit nations (Angleterre, France, Allemagne, Russie, Japon, USA, Italie, Autriche) envoient un corps expéditionnaire. Pékin est pillé.",
		type: 'crisis',
		category: 'military',
		year: 1900,
		yearRange: [1899, 1901],
		affectedNationIds: [
			'nat_song',
			'nat_england',
			'nat_france',
			'nat_hre',
			'nat_kievan_rus',
			'nat_japan',
		],
		affectedRegionIds: ['clim_east_asia'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_opium_wars'],
			customCondition:
				'La Chine doit être affaiblie par les traités inégaux et les concessions étrangères. Les missions chrétiennes doivent provoquer le ressentiment populaire. Les sécheresses et inondations de 1898-99 doivent pousser les paysans au désespoir.',
		},
		effects: {
			militaryModifier: -2,
			stabilityModifier: -2,
			prestigeModifier: -2,
			customEffect:
				"Le siège des Légations à Pékin (55 jours). Les Boxers pensent être invulnérables aux balles. Le corps expéditionnaire international libère Pékin. Pillage systématique du Palais d'été. Le Protocole de Pékin (1901) : indemnité de 450 millions de taëls, droit de stationner des troupes étrangères, destruction des forts de Taku. La dynastie Qing est humiliée au-delà du réparable.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si Cixi ne soutient pas les Boxers, la révolte reste locale. Si les Boxers réussissent à expulser les étrangers, la Chine se referme totalement.',
		},
		historical_outcome:
			"La dynastie Qing tente des réformes désespérées (« Nouvelles Politiques », 1901-1911) mais trop tard. La Révolution de 1911 met fin à 2 000 ans d'empire. L'indemnité Boxer (remboursée partiellement par les USA en bourses étudiantes) forme une génération d'intellectuels chinois modernisateurs.",
		status: 'pending',
	},

	{
		id: 'evt_russo_japanese_war',
		name: 'Guerre russo-japonaise',
		description:
			"Le Japon attaque Port-Arthur sans déclaration de guerre (8 février 1904). Première victoire militaire d'une nation asiatique sur une puissance européenne. Tsushima (27 mai 1905) : la flotte russe du Baltique, après 7 mois de navigation, est anéantie en deux jours. Le monde est stupéfait.",
		type: 'crisis',
		category: 'military',
		year: 1904,
		yearRange: [1904, 1905],
		affectedNationIds: ['nat_japan', 'nat_kievan_rus'],
		affectedRegionIds: ['clim_japan', 'clim_east_asia', 'clim_subarctic'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_meiji_restoration'],
			customCondition:
				'Le Japon et la Russie doivent être en compétition pour la Mandchourie et la Corée. Le Japon doit avoir modernisé sa marine (cuirassés britanniques). La Russie doit refuser de négocier le retrait de Mandchourie.',
		},
		effects: {
			militaryModifier: 2,
			prestigeModifier: 3,
			customEffect:
				"Siège de Port-Arthur (11 mois, 90 000 morts japonais). Bataille de Moukden (plus grande bataille terrestre avant 1914). Tsushima : l'amiral Tōgō détruit 21 des 38 navires russes. Le traité de Portsmouth (Theodore Roosevelt, prix Nobel de la Paix) : le Japon obtient le sud de Sakhaline, Port-Arthur, et la prééminence en Corée. La Russie humiliée → révolution de 1905.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la Russie négocie, le Japon obtient la Corée pacifiquement. Si la flotte russe gagne à Tsushima, le Japon est contenu et la révolution de 1905 n'a pas lieu.",
		},
		historical_outcome:
			"Le Japon annexe la Corée (1910) et se lance dans l'impérialisme continental. La défaite russe provoque la révolution de 1905 (Dimanche rouge, mutinerie du Potemkine) — répétition générale de 1917. Les mouvements anticoloniaux en Asie sont galvanisés : « Si le Japon a vaincu la Russie, nous pouvons vaincre nos colonisateurs. »",
		status: 'pending',
	},

	{
		id: 'evt_russian_revolution_1905',
		name: 'Révolution russe de 1905',
		description:
			"Le « Dimanche rouge » (22 janvier 1905) : les troupes tirent sur une manifestation pacifique devant le Palais d'hiver. Grève générale, mutineries, soviets. Le tsar concède un parlement (Douma) et une constitution. Mais les promesses seront trahies.",
		type: 'political',
		category: 'political',
		year: 1905,
		yearRange: [1905, 1907],
		affectedNationIds: ['nat_kievan_rus'],
		affectedRegionIds: ['clim_continental_east_europe', 'clim_subarctic'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: [
				'evt_russo_japanese_war',
				'evt_russian_serfdom_abolition',
			],
			customCondition:
				'La défaite contre le Japon doit humilier le régime. Les ouvriers doivent être organisés (soviets). Le père Gapone doit mener la marche. La famine et la misère doivent être répandues.',
		},
		effects: {
			stabilityModifier: -3,
			prestigeModifier: -1,
			customEffect:
				"Dimanche rouge : 200 morts devant le Palais d'hiver. Grève générale d'octobre : la Russie paralysée. Mutinerie du cuirassé Potemkine (juin 1905). Le Manifeste d'octobre : libertés civiles, Douma élue. Mais le tsar dissout les deux premières Doumas et modifie la loi électorale (coup d'État de Stolypine, 1907). La répression des soviets. Lénine en exil prend des notes.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_1905_reform',
				label: 'Réformer sincèrement',
				description:
					'Respecter la Douma, donner des terres aux paysans. Risquer le pouvoir du tsar.',
				effects: { stabilityModifier: 2, prestigeModifier: 1 },
			},
			{
				id: 'evt_1905_repress',
				label: 'Réprimer et contrôler',
				description:
					'La Douma est une concession tactique. Reprendre le contrôle dès que possible.',
				effects: { stabilityModifier: -1, militaryModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Nicolas II accepte une monarchie constitutionnelle réelle, 1917 n'a pas lieu. Si la révolution réussit en 1905, Lénine prend le pouvoir 12 ans plus tôt.",
		},
		historical_outcome:
			'Stolypine tente de créer une classe de paysans propriétaires (1906-1911) — assassiné en 1911. Nicolas II ne comprend pas. Les réformes insuffisantes, la guerre de 1914, Raspoutine — tout converge vers février 1917. Lénine dira : « 1905 fut la répétition générale. »',
		status: 'pending',
	},

	{
		id: 'evt_ww1',
		name: 'Première Guerre mondiale',
		description:
			"L'assassinat de l'archiduc François-Ferdinand à Sarajevo (28 juin 1914) déclenche le jeu des alliances. En six semaines, l'Europe est en guerre. Quatre ans de tranchées, 20 millions de morts, quatre empires détruits (ottoman, russe, austro-hongrois, allemand). Le monde d'avant meurt dans la boue de la Somme.",
		type: 'crisis',
		category: 'military',
		year: 1914,
		yearRange: [1914, 1918],
		affectedNationIds: [
			'nat_france',
			'nat_england',
			'nat_hre',
			'nat_kievan_rus',
			'nat_ghaznavid',
			'nat_japan',
			'nat_leon',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
			'clim_mediterranean',
			'clim_arid_mideast',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: [
				'evt_german_unification',
				'evt_russo_turkish_war_1877',
			],
			requiredTechs: ['tech_telegraph', 'tech_ironclad'],
			customCondition:
				"Le système d'alliances (Triple Entente vs Triple Alliance) doit être en place. La course aux armements (dreadnoughts, plan Schlieffen) doit avoir créé une tension insoutenable. Les Balkans doivent être une poudrière (guerres balkaniques 1912-13).",
		},
		effects: {
			militaryModifier: -3,
			populationModifier: -0.08,
			economicModifier: -3,
			stabilityModifier: -3,
			techUnlocks: ['tech_tank', 'tech_radio', 'tech_airplane'],
			customEffect:
				"Plan Schlieffen : invasion de la Belgique → l'Angleterre entre en guerre. Bataille de la Marne (sept. 1914) : Paris sauvé, mais la guerre de mouvement s'arrête. Verdun (1916, 700 000 victimes), la Somme (1916, 1 million de victimes). Guerre sous-marine. Gaz moutarde. Chars d'assaut. Les États-Unis entrent en guerre (avril 1917). L'armistice du 11 novembre 1918. Le traité de Versailles (1919) : l'Allemagne perd ses colonies, l'Alsace-Lorraine, paie des réparations écrasantes.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_ww1_alliance',
				label: "Honorer l'alliance",
				description:
					'Rejoindre la guerre aux côtés de ses alliés. Honneur et traités.',
				effects: { militaryModifier: 1, prestigeModifier: 1 },
			},
			{
				id: 'evt_ww1_neutral',
				label: 'Rester neutre',
				description:
					"Refuser la folie collective. Risquer l'isolement diplomatique.",
				effects: { stabilityModifier: 2, prestigeModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'attentat de Sarajevo échoue, la guerre est retardée (mais pas évitée). Si l'Allemagne ne viole pas la neutralité belge, l'Angleterre reste neutre. Si la France tombe en 1914, la guerre est courte.",
		},
		historical_outcome:
			"Quatre empires détruits. La Société des Nations créée (sans les USA). La carte de l'Europe et du Moyen-Orient redessinée (accords Sykes-Picot). La grippe espagnole (1918-19) tue 50 millions supplémentaires. Le traité de Versailles humilie l'Allemagne → Weimar → Hitler. Comme le dira Foch : « Ce n'est pas une paix, c'est un armistice de vingt ans. »",
		status: 'pending',
	},

	{
		id: 'evt_russian_revolution_1917',
		name: "Révolution russe d'Octobre",
		description:
			"Février 1917 : le tsar abdique. Octobre 1917 : Lénine et les bolcheviks prennent le Palais d'hiver. « Tout le pouvoir aux soviets ! » La Russie quitte la guerre. La guerre civile (1918-1922) fait 8 millions de morts. L'URSS est née — le premier État communiste du monde.",
		type: 'crisis',
		category: 'political',
		year: 1917,
		yearRange: [1917, 1922],
		affectedNationIds: ['nat_kievan_rus'],
		affectedRegionIds: ['clim_continental_east_europe', 'clim_subarctic'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_ww1', 'evt_russian_revolution_1905'],
			customCondition:
				'La Russie doit être épuisée par la guerre (2 millions de morts). La famine doit sévir à Petrograd. Les soldats doivent refuser de combattre. Le tsar doit être isolé et incompétent.',
		},
		effects: {
			stabilityModifier: -3,
			populationModifier: -0.06,
			economicModifier: -3,
			nationMutations: [
				{
					nationId: 'nat_kievan_rus',
					rename: { name: 'Union soviétique', dempinym: 'Soviétique' },
					changeGovernance: 'republic',
					changeCapital: 'set_moscow',
					changeRuler: {
						name: 'Vladimir Lénine',
						dynastyName: 'Oulianov',
						birthYear: 1870,
						age: 47,
						traits: ['ideologue', 'ruthless', 'intellectual', 'revolutionary'],
					},
					removeReligion: 'rel_orthodox',
				},
			],
			customEffect:
				"Février : grèves à Petrograd, mutineries, abdication de Nicolas II. Le gouvernement provisoire (Kerensky) continue la guerre. Lénine revient d'exil (train blindé, avril 1917). Les « Thèses d'avril » : paix, terre, tout le pouvoir aux soviets. Octobre : les bolcheviks s'emparent du pouvoir presque sans violence. Traité de Brest-Litovsk (mars 1918) : la Russie perd la Pologne, la Finlande, les pays baltes, l'Ukraine. Guerre civile : Rouges vs Blancs, famine, terreur rouge.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_rev1917_bolshevik',
				label: 'Soutenir les bolcheviks',
				description:
					'La terre aux paysans, les usines aux ouvriers, la paix immédiate.',
				effects: { stabilityModifier: -2, economicModifier: -1 },
			},
			{
				id: 'evt_rev1917_white',
				label: 'Soutenir les Blancs',
				description:
					"Restaurer l'ordre. Monarchie constitutionnelle ou république modérée.",
				effects: { stabilityModifier: -1, militaryModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Kerensky arrête Lénine en juillet 1917, octobre n'a pas lieu. Si les Blancs gagnent la guerre civile, la Russie devient une démocratie fragile ou une dictature militaire.",
		},
		historical_outcome:
			"L'URSS est créée (1922). Lénine meurt (1924). Staline élimine Trotsky et tous ses rivaux. Collectivisation forcée, Goulag, industrialisation à marche forcée. L'URSS deviendra une superpuissance mais au prix de millions de vies. Le communisme se répand : Chine, Cuba, Vietnam.",
		status: 'pending',
	},

	{
		id: 'evt_ottoman_collapse',
		name: "Chute de l'Empire ottoman — Naissance de la Turquie",
		description:
			"L'Empire ottoman, allié de l'Allemagne, s'effondre en 1918. Le génocide arménien (1915-16, 1,5 million de victimes). Mustafa Kemal repousse les Grecs (1919-22), abolit le sultanat (1922), le califat (1924), et fonde la République de Turquie laïque.",
		type: 'political',
		category: 'political',
		year: 1922,
		yearRange: [1918, 1924],
		affectedNationIds: ['nat_ghaznavid'],
		affectedRegionIds: ['clim_arid_mideast', 'clim_mediterranean'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_ww1', 'evt_tanzimat'],
			customCondition:
				"L'Empire ottoman doit avoir rejoint les Puissances centrales. La défaite de Gallipoli (1915) doit révéler Mustafa Kemal. La révolte arabe (Lawrence d'Arabie) doit affaiblir l'empire de l'intérieur.",
		},
		effects: {
			stabilityModifier: -2,
			prestigeModifier: -3,
			populationModifier: -0.05,
			nationMutations: [
				{
					nationId: 'nat_ghaznavid',
					dissolve: true,
				},
			],
			customEffect:
				'Gallipoli (1915) : victoire ottomane défensive qui fait de Kemal un héros. Génocide arménien (1915-16) : déportations et massacres. La révolte arabe (1916-18) : les promesses contradictoires (McMahon, Sykes-Picot, Balfour). Occupation de Constantinople (1918). Kemal organise la résistance à Ankara. Guerre gréco-turque : victoire décisive à Sakarya (1921). Traité de Lausanne (1923) remplace le traité de Sèvres. Le califat aboli : fin de 1 300 ans de continuité islamique.',
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Empire ottoman reste neutre en 1914, il survit peut-être. Si Kemal échoue, la Turquie est dépecée selon le traité de Sèvres.",
		},
		historical_outcome:
			'La Turquie de Kemal se modernise radicalement : alphabet latin, code civil suisse, droit de vote des femmes (1934). Le Moyen-Orient est découpé par Sykes-Picot : Irak, Syrie, Liban, Jordanie, Palestine — frontières artificielles source de conflits. La déclaration Balfour (1917) pose les bases du conflit israélo-palestinien.',
		status: 'pending',
	},

	{
		id: 'evt_great_depression',
		name: 'Grande Dépression',
		description:
			"Le krach de Wall Street (24 octobre 1929, « Jeudi noir ») déclenche la pire crise économique de l'histoire. Chômage de masse (25% aux USA, 30% en Allemagne), faillites bancaires en cascade, effondrement du commerce mondial. Le capitalisme est au bord du gouffre.",
		type: 'crisis',
		category: 'economic',
		year: 1929,
		yearRange: [1929, 1939],
		affectedNationIds: ['nat_england', 'nat_france', 'nat_hre'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_northeast_america'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_ww1'],
			customCondition:
				'La spéculation boursière des années 1920 doit avoir créé une bulle. Les réparations de guerre et les dettes interalliées doivent fragiliser le système financier. Le protectionnisme (Smoot-Hawley Act) doit aggraver la crise.',
		},
		effects: {
			economicModifier: -4,
			stabilityModifier: -3,
			populationModifier: -0.02,
			customEffect:
				"Ruée bancaire : 9 000 banques font faillite aux USA (1929-33). Le PIB américain chute de 30%. Le Dust Bowl (1930-36) dévaste les Grandes Plaines. Roosevelt et le New Deal (1933) : intervention massive de l'État (TVA, Social Security, CCC). En Allemagne : 6 millions de chômeurs → montée du nazisme. Le Royaume-Uni abandonne l'étalon-or (1931). Partout, les gouvernements interviennent — la fin du laissez-faire.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_depression_keynesian',
				label: "Relance par l'État",
				description:
					'Grands travaux, déficit budgétaire, aide sociale. Suivre Keynes.',
				effects: { economicModifier: 1, stabilityModifier: 1 },
			},
			{
				id: 'evt_depression_austerity',
				label: 'Austérité et rigueur',
				description:
					'Équilibrer le budget, laisser le marché se purger. La douleur sera temporaire.',
				effects: { economicModifier: -1, stabilityModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la Fed intervient rapidement (comme en 2008), la crise est contenue. Si Roosevelt n'est pas élu, les USA ne font pas de New Deal et la crise dure plus longtemps.",
		},
		historical_outcome:
			"La Grande Dépression ne prend fin qu'avec la Seconde Guerre mondiale (économie de guerre). En Allemagne, les 6 millions de chômeurs votent Nazi — Hitler chancelier (1933). Au Japon, les militaristes prennent le pouvoir. L'URSS, économie planifiée, est épargnée et recrute des ingénieurs occidentaux. Le New Deal transforme l'Amérique : filets sociaux, régulation bancaire, syndicalisme.",
		status: 'pending',
	},

	{
		id: 'evt_rise_of_fascism',
		name: 'Montée des fascismes',
		description:
			"Mussolini marche sur Rome (1922). Hitler devient chancelier (1933). Franco gagne la guerre civile espagnole (1939). Le fascisme — nationalisme, autoritarisme, culte du chef — se répand en Europe. Les démocraties pratiquent l'apaisement. « La paix pour notre temps » (Chamberlain, 1938).",
		type: 'political',
		category: 'political',
		year: 1933,
		yearRange: [1922, 1939],
		affectedNationIds: ['nat_hre', 'nat_leon', 'nat_venice'],
		affectedRegionIds: ['clim_temperate_europe', 'clim_mediterranean'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_ww1', 'evt_great_depression'],
			requiredTechs: ['tech_radio'],
			customCondition:
				"Le traité de Versailles doit humilier l'Allemagne. Le chômage de masse doit radicaliser les populations. Les démocraties libérales doivent paraître impuissantes. Le communisme doit effrayer les classes moyennes et les élites.",
		},
		effects: {
			stabilityModifier: -2,
			militaryModifier: 2,
			religiousTensionModifier: 2,
			techUnlocks: ['tech_television'],
			customEffect:
				"Mussolini : marche sur Rome (1922), dictature (1925), conquête de l'Éthiopie (1935). Hitler : incendie du Reichstag (1933), lois de Nuremberg (1935), Anschluss (1938), Nuit de Cristal (1938). Franco : putsch (1936), guerre civile (Guernica), victoire (1939). Munich (1938) : Chamberlain cède les Sudètes. « Si vous aviez le choix entre la guerre et le déshonneur, vous avez choisi le déshonneur et vous aurez la guerre. » (Churchill)",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_fascism_resist',
				label: 'Résister au fascisme',
				description:
					"S'opposer à Hitler et Mussolini. Réarmer. Risquer la guerre maintenant.",
				effects: { militaryModifier: 1, stabilityModifier: -1 },
			},
			{
				id: 'evt_fascism_appease',
				label: "Pratiquer la politique d'apaisement",
				description:
					'Negocier, céder, gagner du temps. « La paix pour notre temps. »',
				effects: { stabilityModifier: 1, prestigeModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si Versailles est moins punitif, le ressentiment allemand est moindre. Si la France intervient lors de la remilitarisation de la Rhénanie (1936), Hitler tombe.',
		},
		historical_outcome:
			"L'apaisement échoue. L'invasion de la Pologne (1er septembre 1939) déclenche la Seconde Guerre mondiale. L'héritage fasciste : la Shoah, 60 millions de morts, la destruction de l'Europe. Après 1945, « plus jamais ça » — mais l'autoritarisme ne meurt jamais vraiment.",
		status: 'pending',
	},

	{
		id: 'evt_ww2',
		name: 'Seconde Guerre mondiale',
		description:
			"60 millions de morts. La Shoah : 6 millions de Juifs exterminés. Stalingrad, le Débarquement, Hiroshima. La guerre la plus destructrice de l'histoire humaine transforme l'ordre mondial : deux superpuissances émergent, l'Europe est en ruines.",
		type: 'crisis',
		category: 'military',
		year: 1939,
		yearRange: [1939, 1945],
		affectedNationIds: [
			'nat_france',
			'nat_england',
			'nat_hre',
			'nat_kievan_rus',
			'nat_japan',
			'nat_song',
			'nat_venice',
			'nat_poland',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
			'clim_east_asia',
			'clim_japan',
			'clim_mediterranean',
			'clim_northeast_america',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_rise_of_fascism', 'evt_great_depression'],
			requiredTechs: ['tech_tank', 'tech_airplane', 'tech_radio'],
			customCondition:
				"L'Allemagne nazie doit avoir remilitarisé et annexé l'Autriche et les Sudètes sans opposition. Le pacte Molotov-Ribbentrop (août 1939) doit neutraliser l'URSS temporairement. L'invasion de la Pologne doit être le déclencheur.",
		},
		effects: {
			militaryModifier: -3,
			populationModifier: -0.1,
			economicModifier: -4,
			stabilityModifier: -3,
			techUnlocks: [
				'tech_nuclear_fission',
				'tech_rocket',
				'tech_computer',
				'tech_antibiotics',
			],
			customEffect:
				"Blitzkrieg : Pologne (1939), France (1940, 6 semaines). Bataille d'Angleterre (1940). Opération Barbarossa (juin 1941) : 4 millions de soldats allemands envahissent l'URSS. Stalingrad (1942-43) : le tournant — 2 millions de victimes. Pearl Harbor (7 déc. 1941) : les USA entrent en guerre. Jour J (6 juin 1944). La Shoah : camps d'extermination (Auschwitz, Treblinka, Sobibor). Hiroshima (6 août 1945), Nagasaki (9 août). Capitulation japonaise (15 août 1945).",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_ww2_allies',
				label: 'Rejoindre les Alliés',
				description: 'Combattre le fascisme. Liberté contre tyrannie.',
				effects: { militaryModifier: 1, prestigeModifier: 2 },
			},
			{
				id: 'evt_ww2_neutral',
				label: 'Rester neutre',
				description:
					'Préserver sa nation, commercer avec tous. La Suisse, la Suède, le Portugal.',
				effects: { stabilityModifier: 2, economicModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Hitler n'envahit pas l'URSS, la guerre à l'Est n'a pas lieu. Si le Japon n'attaque pas Pearl Harbor, les USA restent peut-être neutres. Si le débarquement échoue, la guerre dure des années de plus.",
		},
		historical_outcome:
			"L'Europe en ruines. 60 millions de morts. L'ONU remplace la SDN. Le procès de Nuremberg. Le plan Marshall (1948). La division de l'Allemagne. La bombe atomique change tout. Les empires coloniaux s'effondrent — les peuples colonisés veulent l'indépendance promise. Le monde bipolaire USA/URSS commence.",
		status: 'pending',
	},

	{
		id: 'evt_indian_independence',
		name: "Indépendance de l'Inde et Partition",
		description:
			"Le 15 août 1947, l'Inde et le Pakistan deviennent indépendants. La Partition provoque le plus grand déplacement de population de l'histoire : 15 millions de personnes, 1 à 2 millions de morts. Gandhi est assassiné le 30 janvier 1948.",
		type: 'political',
		category: 'political',
		year: 1947,
		yearRange: [1947, 1948],
		affectedNationIds: ['nat_england', 'nat_chola', 'nat_ghaznavid'],
		affectedRegionIds: ['clim_south_asia'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_ww2', 'evt_sepoy_mutiny'],
			customCondition:
				"L'Angleterre doit être affaiblie par la guerre. Le mouvement de non-coopération de Gandhi doit avoir mobilisé les masses. La Ligue musulmane (Jinnah) doit exiger un État séparé. L'INA (Bose) doit avoir combattu les Britanniques.",
		},
		effects: {
			stabilityModifier: -3,
			populationModifier: -0.02,
			religiousTensionModifier: 3,
			nationMutations: [
				{
					nationId: 'nat_ghaznavid',
					rename: { name: "République de l'Inde", dempinym: 'Indien' },
					changeGovernance: 'republic',
					changeCapital: 'set_delhi',
					changeRuler: {
						name: 'Jawaharlal Nehru',
						dynastyName: 'Nehru',
						birthYear: 1889,
						age: 58,
						traits: ['visionary', 'democratic', 'secular', 'intellectual'],
					},
				},
			],
			customEffect:
				"Mountbatten accélère le calendrier : la Partition est bâclée. La « ligne Radcliffe » divise le Pendjab et le Bengale. Trains de réfugiés massacrés. Calcutta en flammes. Le Cachemire : le maharaja hésite, le Pakistan envoie des tribus, l'Inde intervient — première guerre du Cachemire (1947-48). Gandhi assassiné par un nationaliste hindou (Nathuram Godse). Nehru construit la plus grande démocratie du monde.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si la Partition est évitée, une Inde unie est plus puissante mais plus instable (tensions communautaires). Si la Partition est mieux planifiée (délais plus longs), les massacres sont réduits.',
		},
		historical_outcome:
			"L'Inde devient la plus grande démocratie du monde. Le Pakistan se divise (Bangladesh, 1971). Trois guerres indo-pakistanaises. Le Cachemire reste disputé. Le modèle de décolonisation par la non-violence inspire le monde — Martin Luther King, Mandela. L'Inde nucléaire (1974), le Pakistan nucléaire (1998) : la Partition a des conséquences atomiques.",
		status: 'pending',
	},

	{
		id: 'evt_creation_israel',
		name: "Création de l'État d'Israël",
		description:
			"Le 14 mai 1948, David Ben Gourion proclame l'État d'Israël. Le lendemain, cinq armées arabes attaquent. Israël survit. 700 000 Palestiniens fuient ou sont expulsés — la Nakba (« catastrophe »). Le conflit le plus durable du XXe siècle commence.",
		type: 'political',
		category: 'political',
		year: 1948,
		yearRange: [1948, 1949],
		affectedNationIds: ['nat_ghaznavid', 'nat_england'],
		affectedRegionIds: ['clim_arid_mideast', 'clim_mediterranean'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_ww2', 'evt_ottoman_collapse'],
			customCondition:
				"La Shoah doit avoir rendu le sionisme moralement inattaquable. Le mandat britannique doit être ingérable (terrorisme juif + révoltes arabes). L'ONU doit voter le plan de partage (novembre 1947). Les Britanniques doivent se retirer.",
		},
		effects: {
			stabilityModifier: -2,
			militaryModifier: 1,
			religiousTensionModifier: 3,
			customEffect:
				"Ben Gourion proclame l'indépendance sous le portrait de Herzl. Cinq armées arabes (Égypte, Jordanie, Syrie, Irak, Liban) attaquent. Israël repousse les attaques, conquiert plus de territoire que prévu par le plan de partage. Les réfugiés palestiniens dans des camps au Liban, en Jordanie, à Gaza — temporaires, disait-on. L'armistice de 1949 : pas de paix, juste des lignes de cessez-le-feu.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le plan de partage est accepté par les deux parties, un État binational émerge. Si les armées arabes gagnent en 1948, Israël n'existe pas.",
		},
		historical_outcome:
			"Six guerres (1948, 1956, 1967, 1973, 1982, 2006). L'occupation de la Cisjordanie et de Gaza (1967). Les accords d'Oslo (1993) : espoir bref. L'Intifada. Le mur de séparation. Le conflit empoisonne les relations internationales et déstabilise tout le Moyen-Orient. Aucune solution en vue.",
		status: 'pending',
	},

	{
		id: 'evt_chinese_communist_revolution',
		name: 'Révolution communiste chinoise',
		description:
			"Mao Zedong proclame la République populaire de Chine le 1er octobre 1949 depuis la place Tiananmen. Tchang Kaï-chek se réfugie à Taïwan. Un quart de l'humanité bascule dans le communisme.",
		type: 'political',
		category: 'political',
		year: 1949,
		yearRange: [1946, 1949],
		affectedNationIds: ['nat_song'],
		affectedRegionIds: ['clim_east_asia'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: [
				'evt_ww2',
				'evt_taiping_rebellion',
				'evt_boxer_rebellion',
			],
			customCondition:
				'La Chine doit être ravagée par la guerre sino-japonaise (1937-45). La révolte des Boxers doit avoir montré la vulnérabilité de la Chine face à l’Occident. Le Kuomintang doit être corrompu et impopulaire. Les communistes doivent contrôler les campagnes (réforme agraire). La Longue Marche (1934-35) doit avoir forgé la légende de Mao.',
		},
		effects: {
			stabilityModifier: -2,
			economicModifier: -2,
			populationModifier: -0.01,
			nationMutations: [
				{
					nationId: 'nat_song',
					rename: {
						name: 'République populaire de Chine',
						dempinym: 'Chinois',
					},
					changeGovernance: 'republic',
					changeCapital: 'set_beijing',
					changeRuler: {
						name: 'Mao Zedong',
						dynastyName: 'Parti communiste',
						birthYear: 1893,
						age: 56,
						traits: ['ideologue', 'ruthless', 'charismatic', 'strategic'],
					},
					removeReligion: 'rel_confucianism',
				},
			],
			customEffect:
				"La guerre civile reprend après la capitulation japonaise. Les communistes, forts de 4 millions de soldats et du soutien paysan, encerclent les villes. Bataille de Huaihai (1948-49) : 500 000 nationalistes capturés. Tchang Kaï-chek évacue à Taïwan avec l'or de la Banque nationale. Mao : « La Chine s'est levée ! » Réforme agraire : 40% des terres redistribuées, 1 à 2 millions de propriétaires exécutés.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les USA interviennent massivement pour le Kuomintang, la guerre civile dure. Si Mao est tué pendant la Longue Marche, un autre leader communiste émerge (Zhou Enlai ?).',
		},
		historical_outcome:
			"Le Grand Bond en avant (1958-62) : 30 à 45 millions de morts de famine. La Révolution culturelle (1966-76) : destruction du patrimoine, persécution des intellectuels. La mort de Mao (1976). Deng Xiaoping et la réforme économique (1978) : « Peu importe que le chat soit noir ou blanc, pourvu qu'il attrape les souris. » La Chine devient la deuxième puissance mondiale.",
		status: 'pending',
	},

	{
		id: 'evt_cold_war_begins',
		name: 'Début de la Guerre froide',
		description:
			"Le rideau de fer tombe sur l'Europe (Churchill, Fulton, 1946). Le blocus de Berlin (1948-49). L'OTAN (1949) vs le Pacte de Varsovie (1955). Deux superpuissances, deux idéologies, un monde divisé en deux. L'humanité vit sous la menace de l'annihilation nucléaire.",
		type: 'political',
		category: 'diplomatic',
		year: 1947,
		yearRange: [1947, 1991],
		affectedNationIds: [
			'nat_england',
			'nat_france',
			'nat_hre',
			'nat_kievan_rus',
			'nat_poland',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
			'clim_northeast_america',
			'clim_subarctic',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_ww2', 'evt_russian_revolution_1917'],
			requiredTechs: ['tech_nuclear_fission', 'tech_rocket'],
			customCondition:
				"Les USA et l'URSS doivent être les seules superpuissances survivantes. La méfiance mutuelle doit grandir (Yalta, Potsdam). L'URSS doit imposer des régimes communistes en Europe de l'Est. Les USA doivent développer la doctrine Truman (endiguement).",
		},
		effects: {
			militaryModifier: 3,
			stabilityModifier: -1,
			economicModifier: 1,
			techUnlocks: ['tech_satellite', 'tech_dna_discovery'],
			customEffect:
				"Blocus de Berlin : pont aérien américain (1948-49). Guerre de Corée (1950-53) : premier conflit chaud. Course aux armements : bombe H (1952-53), ICBM, sous-marins nucléaires. Crise des missiles de Cuba (1962) : le monde à 13 jours de l'apocalypse. Guerre du Vietnam (1955-75). Course à l'espace : Spoutnik (1957), Gagarine (1961), Apollo 11 (1969). Les guerres par procuration en Afrique, Asie, Amérique latine.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_cold_bloc_west',
				label: 'Rejoindre le bloc occidental',
				description: 'Démocratie, économie de marché, protection américaine.',
				effects: { economicModifier: 1, stabilityModifier: 1 },
			},
			{
				id: 'evt_cold_bloc_east',
				label: 'Rejoindre le bloc soviétique',
				description: 'Socialisme, planification, protection soviétique.',
				effects: { militaryModifier: 1, economicModifier: -1 },
			},
			{
				id: 'evt_cold_non_aligned',
				label: 'Mouvement des non-alignés',
				description:
					'Ni Est ni Ouest. Tiers-monde, Bandung (1955), Nehru, Nasser, Tito.',
				effects: { prestigeModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Truman négocie avec Staline à Potsdam, la tension est moindre. Si les USA utilisent la bombe atomique contre l'URSS (proposé par certains généraux), la Troisième Guerre mondiale commence.",
		},
		historical_outcome:
			"44 ans de tension sans guerre directe entre les superpuissances — la « destruction mutuelle assurée » (MAD) fonctionne. Mais des millions meurent dans les guerres par procuration. La course à l'espace produit des technologies civiles (satellites, Internet). L'URSS s'effondre (1991) — fin de la Guerre froide. Les USA restent seule superpuissance — brièvement.",
		status: 'pending',
	},

	{
		id: 'evt_decolonization_africa',
		name: "Décolonisation de l'Afrique",
		description:
			"En 1960, l'« Année de l'Afrique », 17 pays deviennent indépendants. De 1945 à 1975, la quasi-totalité de l'Afrique se libère du joug colonial. Mais les frontières héritées de Berlin (1885), les élites formées par les colonisateurs, et les ingérences de la Guerre froide compliquent tout.",
		type: 'political',
		category: 'political',
		year: 1960,
		yearRange: [1956, 1975],
		affectedNationIds: [
			'nat_ghana',
			'nat_ethiopia',
			'nat_swahili_cities',
			'nat_yoruba',
			'nat_zimbabwe',
			'nat_france',
			'nat_england',
		],
		affectedRegionIds: [
			'clim_tropical_africa',
			'clim_sahel',
			'clim_east_africa_highland',
			'clim_congo_rainforest',
			'clim_kalahari',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_ww2', 'evt_scramble_for_africa'],
			customCondition:
				'Les puissances coloniales doivent être affaiblies par la guerre. Les mouvements nationalistes africains doivent être organisés (Nkrumah, Lumumba, Senghor, Kenyatta). La conférence de Bandung (1955) doit galvaniser le tiers-monde.',
		},
		effects: {
			stabilityModifier: -2,
			prestigeModifier: 2,
			customEffect:
				"Ghana (1957) : Nkrumah, premier indépendantiste. Congo (1960) : Lumumba assassiné (avec la complicité de la CIA et de la Belgique). Algérie (1954-62) : guerre sanglante, 1 million de morts. Kenya : révolte Mau Mau. Afrique portugaise : guerres coloniales (1961-74). Rhodésie : indépendance blanche (1965), majorité noire (1980, Zimbabwe). L'apartheid en Afrique du Sud résiste jusqu'en 1994.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les puissances coloniales accordent l'indépendance progressivement (modèle britannique), la transition est plus douce. Si les frontières sont redessinées selon les ethnies, les guerres civiles sont évitées — mais le découpage est impossible.",
		},
		historical_outcome:
			"54 États africains indépendants. Mais la « Françafrique » (néocolonialisme français), les coups d'État (80 entre 1960 et 2000), les guerres civiles (Nigeria/Biafra, Rwanda, Congo). Le génocide rwandais (1994, 800 000 morts en 100 jours). Le poids de l'héritage colonial est immense. La croissance économique africaine commence vraiment dans les années 2000.",
		status: 'pending',
	},

	{
		id: 'evt_cuban_missile_crisis',
		name: 'Crise des missiles de Cuba',
		description:
			"Octobre 1962 : les États-Unis découvrent des missiles soviétiques à Cuba. Kennedy impose un blocus naval. Khrouchtchev refuse de reculer. Pendant 13 jours, le monde est au bord de la guerre nucléaire. Le moment le plus dangereux de l'histoire humaine.",
		type: 'crisis',
		category: 'diplomatic',
		year: 1962,
		yearRange: [1962, 1962],
		affectedNationIds: ['nat_kievan_rus', 'nat_england'],
		affectedRegionIds: [
			'clim_south_american_subtropical',
			'clim_northeast_america',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_cold_war_begins'],
			customCondition:
				"Castro doit avoir pris le pouvoir à Cuba (1959). L'échec de la Baie des Cochons (1961) doit pousser Khrouchtchev à installer des missiles. Les avions U-2 doivent photographier les rampes de lancement.",
		},
		effects: {
			stabilityModifier: -2,
			militaryModifier: 1,
			customEffect:
				"Kennedy annonce le blocus le 22 octobre (discours télévisé). 27 navires soviétiques approchent. Le 27 octobre (« Samedi noir ») : un U-2 abattu au-dessus de Cuba, un sous-marin soviétique avec torpille nucléaire faillit la lancer (Vasili Arkhipov refuse). Accord secret : les USA retirent leurs missiles de Turquie, l'URSS retire les siens de Cuba. Le « téléphone rouge » Moscou-Washington est installé.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Arkhipov autorise la torpille nucléaire, la Troisième Guerre mondiale commence. Si Kennedy choisit l'invasion au lieu du blocus, les Soviétiques ripostent avec les missiles déjà opérationnels.",
		},
		historical_outcome:
			"La crise mène directement au traité d'interdiction partielle des essais nucléaires (1963) et au téléphone rouge. Khrouchtchev est renversé (1964), en partie à cause de l'humiliation perçue. Kennedy est assassiné (1963). Cuba reste communiste. La détente commence — SALT I (1972). Le monde a eu très, très peur.",
		status: 'pending',
	},

	{
		id: 'evt_space_race_moon',
		name: "Course à l'espace — L'Homme sur la Lune",
		description:
			"« Un petit pas pour l'homme, un bond de géant pour l'humanité. » Le 20 juillet 1969, Neil Armstrong marche sur la Lune. La course à l'espace — de Spoutnik (1957) à Apollo 11 — est le plus grand exploit technologique du XXe siècle.",
		type: 'milestone',
		category: 'scientific',
		year: 1969,
		yearRange: [1957, 1972],
		affectedNationIds: ['nat_kievan_rus'],
		affectedRegionIds: ['clim_northeast_america', 'clim_subarctic'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_cold_war_begins'],
			requiredTechs: ['tech_rocket', 'tech_satellite', 'tech_computer'],
			customCondition:
				"Spoutnik (1957) doit choquer les Américains. Kennedy doit promettre la Lune avant la fin de la décennie (1961). La NASA doit être créée. L'URSS doit être en avance initiale (Gagarine, 1961).",
		},
		effects: {
			prestigeModifier: 3,
			economicModifier: 1,
			techUnlocks: ['tech_space_travel'],
			customEffect:
				"Spoutnik (1957) : le « moment Spoutnik » — panique américaine. Gagarine (1961) : premier homme dans l'espace. Kennedy (1961) : « Nous choisirons d'aller sur la Lune. » Gemini, Mercury, Apollo. Apollo 1 (1967) : 3 astronautes morts. Apollo 11 (1969) : Armstrong et Aldrin marchent sur la Lune, Collins en orbite. Apollo 13 (1970) : « Houston, nous avons un problème. » Retombées technologiques : miniaturisation, matériaux, logiciels.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'URSS atteint la Lune en premier, le prestige communiste est immense. Si Kennedy n'est pas assassiné, le programme spatial est peut-être mieux financé au-delà d'Apollo.",
		},
		historical_outcome:
			"Six missions lunaires habitées (1969-72), puis plus rien. Le programme spatial devient une coopération (ISS, 1998). Les satellites transforment les communications, la météo, le GPS. SpaceX (Elon Musk) relance la course en 2020. La Lune reste le symbole de ce que l'humanité peut accomplir quand elle le décide.",
		status: 'pending',
	},

	{
		id: 'evt_vietnam_war',
		name: 'Guerre du Vietnam',
		description:
			"Les États-Unis s'engagent au Vietnam pour contenir le communisme (1955-1975). 58 000 Américains et 3 millions de Vietnamiens morts. La première guerre télévisée. Le mouvement anti-guerre transforme la société américaine. Saïgon tombe le 30 avril 1975.",
		type: 'crisis',
		category: 'military',
		year: 1965,
		yearRange: [1955, 1975],
		affectedNationIds: ['nat_france', 'nat_england'],
		affectedRegionIds: ['clim_southeast_asia'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_cold_war_begins', 'evt_decolonization_africa'],
			customCondition:
				"La France doit avoir perdu à Diên Biên Phu (1954). Le Vietnam doit être divisé au 17e parallèle. Le domino theory doit convaincre les USA d'intervenir. Le Viet Cong doit mener une guérilla efficace.",
		},
		effects: {
			militaryModifier: -2,
			stabilityModifier: -2,
			populationModifier: -0.03,
			customEffect:
				"Incident du golfe du Tonkin (1964, en partie fabriqué) : résolution du Congrès. Escalade : 500 000 soldats américains au Vietnam (1968). Offensive du Tết (1968) : victoire militaire américaine, mais défaite politique — l'opinion se retourne. Napalm, Agent orange, My Lai. Bombardements au Cambodge. Accords de Paris (1973). Saïgon tombe (30 avril 1975) — hélicoptères sur le toit de l'ambassade.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les USA ne s'engagent pas (Eisenhower refuse en 1954), le Vietnam est unifié sous Hô Chi Minh plus tôt. Si les USA avaient gagné, le Vietnam serait divisé comme la Corée.",
		},
		historical_outcome:
			"Le Vietnam unifié sous le communisme. Les Khmers rouges au Cambodge (1975-79) : 2 millions de morts. Le « syndrome du Vietnam » paralyse la politique étrangère américaine pour une décennie. Le mouvement anti-guerre inspire les droits civiques, le féminisme, la contre-culture. Le doi moi (1986) : le Vietnam adopte l'économie de marché — comme la Chine.",
		status: 'pending',
	},

	{
		id: 'evt_mao_cultural_revolution',
		name: 'Révolution culturelle chinoise',
		description:
			"Mao lance la Révolution culturelle (1966-76) pour reprendre le pouvoir après le désastre du Grand Bond en avant. Les Gardes rouges terrorisent la population. Les intellectuels sont humiliés, battus, tués. Le patrimoine culturel est détruit. « La révolution n'est pas un dîner de gala. »",
		type: 'crisis',
		category: 'cultural',
		year: 1966,
		yearRange: [1966, 1976],
		affectedNationIds: ['nat_song'],
		affectedRegionIds: ['clim_east_asia'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_chinese_communist_revolution'],
			customCondition:
				'Mao doit être marginalisé après le Grand Bond en avant. Liu Shaoqi et Deng Xiaoping doivent diriger le pays de facto. Mao doit utiliser la jeunesse (Gardes rouges) comme arme politique. Le Petit Livre rouge doit devenir la bible du mouvement.',
		},
		effects: {
			stabilityModifier: -3,
			economicModifier: -2,
			prestigeModifier: -2,
			customEffect:
				"Les Gardes rouges (étudiants de 14-20 ans) s'attaquent aux « quatre vieilleries » (vieilles idées, culture, coutumes, habitudes). Temples détruits, livres brûlés, professeurs battus, suicides forcés. Liu Shaoqi meurt en détention (1969). Deng Xiaoping envoyé en rééducation. L'armée finit par mater les Gardes rouges. Un million de morts estimés. La « décennie perdue » retarde la Chine de 20 ans.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Mao ne lance pas la Révolution culturelle, la Chine se modernise 20 ans plus tôt. Si Lin Biao réussit son coup d'État (1971), une junte militaire remplace Mao.",
		},
		historical_outcome:
			"Mao meurt le 9 septembre 1976. La Bande des Quatre est arrêtée. Deng Xiaoping revient au pouvoir (1978) et lance les réformes économiques : zones économiques spéciales, investissement étranger, agriculture privée. La Chine passe du maoïsme au capitalisme d'État — la plus grande transformation économique de l'histoire. Le traumatisme de la Révolution culturelle est officiellement reconnu (résolution de 1981) mais jamais pleinement discuté.",
		status: 'pending',
	},

	{
		id: 'evt_oil_crisis_1973',
		name: 'Premier choc pétrolier',
		description:
			"L'OPEP décrète un embargo pétrolier contre les alliés d'Israël (octobre 1973). Le prix du pétrole quadruple en trois mois. Files d'attente aux stations-service. La fin des Trente Glorieuses. Le pétrole est une arme géopolitique.",
		type: 'crisis',
		category: 'economic',
		year: 1973,
		yearRange: [1973, 1974],
		affectedNationIds: ['nat_england', 'nat_france', 'nat_hre', 'nat_japan'],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_northeast_america',
			'clim_arid_mideast',
			'clim_japan',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_creation_israel', 'evt_cold_war_begins'],
			customCondition:
				"La guerre du Kippour (6 octobre 1973) doit éclater. Les pays arabes producteurs de pétrole doivent décider d'utiliser le pétrole comme arme. L'Occident doit être dépendant du pétrole moyen-oriental.",
		},
		effects: {
			economicModifier: -3,
			stabilityModifier: -2,
			customEffect:
				"Le prix du baril passe de 3 à 12 dollars. Rationnement, limitations de vitesse, dimanches sans voiture. Stagflation : inflation + récession. La fin des Trente Glorieuses (1945-73). Le Japon et l'Europe investissent dans l'efficacité énergétique. Les pays du Golfe deviennent immensément riches. Le nucléaire civil se développe (France : 58 réacteurs). Second choc pétrolier en 1979 (révolution iranienne).",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_oil_diversify',
				label: "Diversifier les sources d'énergie",
				description:
					'Nucléaire, charbon, énergies renouvelables. Réduire la dépendance au pétrole.',
				effects: { economicModifier: -1, prestigeModifier: 1 },
			},
			{
				id: 'evt_oil_negotiate',
				label: 'Négocier avec les producteurs',
				description:
					'Diplomatie, accords bilatéraux, concessions politiques sur Israël.',
				effects: { economicModifier: 1, prestigeModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'embargo n'a pas lieu, les Trente Glorieuses continuent plus longtemps. Si l'Occident développe des alternatives rapidement, la dépendance au pétrole diminue dès les années 70.",
		},
		historical_outcome:
			"Le choc pétrolier transforme l'économie mondiale : fin du keynésianisme, montée du néolibéralisme (Thatcher, Reagan). Le Moyen-Orient devient le centre géopolitique du monde. Les pétrodollars financent le wahhabisme. Le nucléaire civil se développe (France, Japon). La question énergétique domine le XXIe siècle — jusqu'au changement climatique.",
		status: 'pending',
	},

	{
		id: 'evt_iranian_revolution',
		name: 'Révolution islamique iranienne',
		description:
			"L'ayatollah Khomeini renverse le Shah d'Iran (février 1979). La première théocratie islamique moderne. La prise d'otages de l'ambassade américaine (444 jours). Le monde musulman est bouleversé. « Ni Est, ni Ouest — République islamique ! »",
		type: 'political',
		category: 'religious',
		year: 1979,
		yearRange: [1978, 1980],
		affectedNationIds: ['nat_ghaznavid'],
		affectedRegionIds: ['clim_arid_mideast'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_oil_crisis_1973'],
			customCondition:
				"Le Shah doit être impopulaire (SAVAK, occidentalisation forcée, inégalités). Khomeini doit être en exil (Najaf, puis Neauphle-le-Château). L'opposition doit unir gauchistes, nationalistes et islamistes — temporairement.",
		},
		effects: {
			stabilityModifier: -3,
			religiousTensionModifier: 3,
			economicModifier: -2,
			customEffect:
				"Manifestations massives (millions de personnes). Le Shah fuit (janvier 1979). Khomeini revient (1er février). Référendum : 98% pour la République islamique. La prise d'otages de l'ambassade américaine (4 novembre 1979 — 20 janvier 1981). Exécutions de l'ancien régime. Guerre Iran-Irak (1980-88, 1 million de morts). Le second choc pétrolier (1979) : le baril passe de 13 à 35 dollars.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le Shah avait réformé plus tôt, la révolution est évitée. Si les gauchistes gagnent au lieu des islamistes, l'Iran devient socialiste.",
		},
		historical_outcome:
			"L'Iran devient le modèle de l'islamisme politique. La guerre Iran-Irak (1980-88) : Saddam Hussein soutenu par l'Occident. Le Hezbollah au Liban (1982). L'exportation de la révolution. Les relations USA-Iran empoisonnées pour 45 ans. Le programme nucléaire iranien. La rivalité Iran-Arabie Saoudite (chiites vs sunnites) structure le Moyen-Orient.",
		status: 'pending',
	},

	{
		id: 'evt_fall_berlin_wall',
		name: 'Chute du mur de Berlin — Fin de la Guerre froide',
		description:
			"Le 9 novembre 1989, les Berlinois de l'Est et de l'Ouest abattent le Mur. En deux ans, l'URSS s'effondre. La Guerre froide est finie. « La fin de l'histoire » (Fukuyama) — ou le début d'un nouveau désordre mondial.",
		type: 'milestone',
		category: 'political',
		year: 1989,
		yearRange: [1989, 1991],
		affectedNationIds: ['nat_hre', 'nat_kievan_rus', 'nat_poland'],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_continental_east_europe',
			'clim_subarctic',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_cold_war_begins'],
			customCondition:
				"Gorbatchev doit avoir lancé la perestroïka et la glasnost. Solidarność doit avoir montré la voie en Pologne (1980-89). La stagnation économique soviétique doit être évidente. Les révolutions de 1989 doivent s'enchaîner (Pologne, Hongrie, RDA, Tchécoslovaquie, Roumanie).",
		},
		effects: {
			stabilityModifier: 2,
			prestigeModifier: 3,
			economicModifier: 1,
			nationMutations: [
				{
					nationId: 'nat_hre',
					rename: {
						name: "République fédérale d'Allemagne",
						dempinym: 'Allemand',
					},
					changeGovernance: 'republic',
					changeCapital: 'set_berlin',
				},
				{
					nationId: 'nat_kievan_rus',
					rename: { name: 'Fédération de Russie', dempinym: 'Russe' },
					changeGovernance: 'republic',
				},
			],
			customEffect:
				"Solidarność gagne les élections en Pologne (juin 1989). La Hongrie ouvre sa frontière avec l'Autriche (août). Le Mur tombe (9 novembre). La « révolution de velours » à Prague. Ceaușescu exécuté en Roumanie (Noël 1989). Réunification allemande (3 octobre 1990). Coup d'État manqué contre Gorbatchev (août 1991). L'URSS est dissoute le 25 décembre 1991. Eltsine au pouvoir.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Gorbatchev réprime comme Tiananmen (juin 1989), le Mur tient. Si l'Allemagne réunifiée quitte l'OTAN, l'Europe est différente. Si le coup d'État de 1991 réussit, l'URSS survit quelques années.",
		},
		historical_outcome:
			"L'effondrement soviétique libère 15 républiques. L'élargissement de l'OTAN et de l'UE vers l'Est. Les « thérapies de choc » en Russie (1990s) : oligarques, pauvreté, effondrement de l'espérance de vie. Poutine arrive au pouvoir (1999). La promesse de 1989 — liberté, démocratie, « fin de l'histoire » — se heurte au retour du nationalisme, de l'autoritarisme et des guerres (Yougoslavie, puis Ukraine).",
		status: 'pending',
	},

	{
		id: 'evt_tiananmen',
		name: 'Massacre de Tiananmen',
		description:
			"Le 4 juin 1989, les chars de l'Armée populaire écrasent le mouvement étudiant sur la place Tiananmen à Pékin. Des milliers de morts (estimations : 300 à 3 000). L'homme au tank. La Chine choisit : croissance économique sans liberté politique.",
		type: 'crisis',
		category: 'political',
		year: 1989,
		yearRange: [1989, 1989],
		affectedNationIds: ['nat_song'],
		affectedRegionIds: ['clim_east_asia'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_mao_cultural_revolution'],
			customCondition:
				'Les réformes économiques de Deng doivent avoir créé des aspirations démocratiques. La mort de Hu Yaobang (avril 1989) doit être le déclencheur. Les étudiants doivent occuper la place pendant 7 semaines. Les divisions au sein du Parti doivent paralyser la réponse.',
		},
		effects: {
			stabilityModifier: -1,
			prestigeModifier: -2,
			customEffect:
				"Un million de personnes sur la place (mai 1989). La « Déesse de la Démocratie ». La loi martiale (20 mai). Zhao Ziyang, secrétaire général réformateur, pleure devant les étudiants : « Nous sommes venus trop tard. » Deng ordonne la répression. Les chars entrent le 4 juin. L'homme au tank — image iconique, censurée en Chine. Purge des réformateurs. La Chine choisit le capitalisme autoritaire.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Zhao Ziyang l'emporte, la Chine s'ouvre politiquement — un scénario à la Corée du Sud. Si la répression est encore plus dure, la Chine se referme et les réformes économiques ralentissent.",
		},
		historical_outcome:
			"Le « pacte » chinois : croissance et prospérité en échange du silence politique. La censure efface Tiananmen de la mémoire collective chinoise. La Chine devient la deuxième économie mondiale (2010). Le modèle « autoritarisme + capitalisme » inspire d'autres régimes. Xi Jinping (2012) renforce le contrôle. Tiananmen reste le fantôme qui hante le Parti communiste.",
		status: 'pending',
	},

	{
		id: 'evt_apartheid_end',
		name: "Fin de l'apartheid — Mandela président",
		description:
			"Nelson Mandela, emprisonné pendant 27 ans, est libéré le 11 février 1990. L'apartheid est aboli. En 1994, Mandela est élu premier président noir d'Afrique du Sud. La Commission Vérité et Réconciliation : justice restaurative plutôt que punitive.",
		type: 'milestone',
		category: 'political',
		year: 1994,
		yearRange: [1990, 1994],
		affectedNationIds: ['nat_zimbabwe', 'nat_swahili_cities'],
		affectedRegionIds: ['clim_kalahari', 'clim_east_africa_highland'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_fall_berlin_wall', 'evt_decolonization_africa'],
			customCondition:
				"Les sanctions internationales doivent avoir isolé l'Afrique du Sud. La fin de la Guerre froide doit supprimer la justification anticommuniste de l'apartheid. De Klerk doit être un pragmatiste. Mandela doit conserver sa stature morale après 27 ans de prison.",
		},
		effects: {
			stabilityModifier: 2,
			prestigeModifier: 3,
			customEffect:
				"De Klerk libère Mandela et légalise l'ANC (février 1990). Référendum blanc : 68% pour la fin de l'apartheid (mars 1992). Les violences se poursuivent (Inkatha vs ANC, 14 000 morts). Prix Nobel de la Paix conjoint Mandela-De Klerk (1993). Élections d'avril 1994 : files d'attente de plusieurs kilomètres — les Noirs votent pour la première fois. La Commission Vérité et Réconciliation (Tutu) : amnistie contre vérité.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Mandela choisit la vengeance, l'Afrique du Sud bascule dans la guerre civile (scénario Zimbabwe). Si De Klerk refuse la transition, les sanctions détruisent l'économie.",
		},
		historical_outcome:
			"Mandela sert un seul mandat (1994-99) et se retire — exemple rare en Afrique. L'Afrique du Sud est la « nation arc-en-ciel ». Mais les inégalités économiques perdurent. Le sida tue des millions (Mbeki nie le virus). La corruption sous Zuma. Mandela meurt en 2013, icône mondiale. L'arc-en-ciel pâlit, mais l'héritage moral est immense.",
		status: 'pending',
	},

	{
		id: 'evt_internet_revolution',
		name: 'Révolution Internet et numérique',
		description:
			"Le World Wide Web (Tim Berners-Lee, 1991) transforme le monde plus profondément que l'imprimerie. E-mail, Google, Amazon, social media. L'information est instantanée. La vie privée est morte. La plus grande révolution communicationnelle depuis l'écriture.",
		type: 'milestone',
		category: 'scientific',
		year: 1991,
		yearRange: [1991, 2000],
		affectedNationIds: ['nat_england', 'nat_france', 'nat_hre', 'nat_japan'],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_northeast_america',
			'clim_japan',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: [
				'evt_second_industrial_revolution',
				'evt_space_race_moon',
			],
			requiredTechs: ['tech_computer', 'tech_satellite'],
			customCondition:
				'ARPANET (1969) doit exister. Tim Berners-Lee au CERN doit inventer le WWW (1989-91). Les ordinateurs personnels doivent être répandus (IBM PC 1981, Macintosh 1984). Les télécommunications doivent permettre une connexion mondiale.',
		},
		effects: {
			economicModifier: 3,
			prestigeModifier: 2,
			techUnlocks: ['tech_internet', 'tech_smartphone'],
			customEffect:
				'Mosaic (1993) : premier navigateur web populaire. Amazon (1994), eBay (1995). La bulle Internet (1995-2000) : le Nasdaq monte de 400%. Google (1998). La bulle éclate (2000-2002, 5 000 milliards de dollars évaporés). Mais les survivants (Amazon, Google, eBay) deviennent des géants. Le smartphone arrive (2007) et change tout — encore.',
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_internet_open',
				label: 'Internet libre et ouvert',
				description:
					"L'information doit circuler librement. Pas de censure, pas de surveillance.",
				effects: { prestigeModifier: 1, stabilityModifier: -1 },
			},
			{
				id: 'evt_internet_control',
				label: 'Contrôler et réguler Internet',
				description:
					"Filtrage, surveillance, souveraineté numérique. Protéger l'ordre social.",
				effects: { stabilityModifier: 1, prestigeModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si le Web reste académique et non commercial, la révolution est plus lente. Si la Chine avait adopté un Internet ouvert, le monde numérique serait unifié.',
		},
		historical_outcome:
			"3 milliards d'utilisateurs en 2015, 5 milliards en 2023. Les GAFAM (Google, Apple, Facebook, Amazon, Microsoft) plus puissants que de nombreux États. Les réseaux sociaux : printemps arabe, Brexit, Trump, désinformation. La Chine crée un Internet parallèle (Great Firewall). La vie privée est un souvenir. L'intelligence artificielle (GPT, 2022-) promet — ou menace — une nouvelle révolution.",
		status: 'pending',
	},

	{
		id: 'evt_rwandan_genocide',
		name: 'Génocide rwandais',
		description:
			"En 100 jours (avril-juillet 1994), 800 000 Tutsis et Hutus modérés sont massacrés au Rwanda. Les milices Interahamwe tuent à la machette. L'ONU se retire. Le monde regarde. « Plus jamais ça » — encore une fois.",
		type: 'crisis',
		category: 'political',
		year: 1994,
		yearRange: [1994, 1994],
		affectedNationIds: ['nat_swahili_cities'],
		affectedRegionIds: ['clim_east_africa_highland', 'clim_congo_rainforest'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_decolonization_africa'],
			customCondition:
				"Les tensions Hutu-Tutsi doivent être exacerbées par la colonisation belge (cartes d'identité ethniques). Le président Habyarimana doit être assassiné (avion abattu, 6 avril 1994). La Radio des Mille Collines doit inciter au massacre. L'ONU doit refuser de renforcer la MINUAR (Roméo Dallaire).",
		},
		effects: {
			stabilityModifier: -3,
			populationModifier: -0.08,
			customEffect:
				"Attentat contre l'avion présidentiel (6 avril). En quelques heures, les listes sont sorties, les barrages dressés. Voisins tuant voisins. Le général Dallaire supplie l'ONU d'intervenir — refus. La France évacue ses ressortissants (et des responsables hutus). Le FPR (Kagame) avance depuis l'Ouganda et met fin au génocide (juillet). 2 millions de réfugiés hutus fuient au Zaïre — les guerres du Congo suivront (5 millions de morts).",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'ONU envoie 5 000 casques bleus (comme le demandait Dallaire), le génocide est largement empêché. Si les accords d'Arusha (1993) sont respectés, la transition démocratique a lieu.",
		},
		historical_outcome:
			"Le Rwanda de Kagame se reconstruit : croissance économique, réconciliation (gacaca), développement numérique. Mais autoritarisme. Les guerres du Congo (1996-2003) : « la guerre mondiale africaine », 5 millions de morts. L'échec de l'ONU mène à la doctrine de la « responsabilité de protéger » (R2P, 2005). Le mot « génocide » reste le plus lourd de la langue.",
		status: 'pending',
	},

	{
		id: 'evt_european_union',
		name: "Union européenne — L'euro et l'élargissement",
		description:
			"De la CECA (1951) au traité de Maastricht (1992) et à l'euro (2002). L'Union européenne unit 28 pays, 500 millions de citoyens, et le plus grand marché unique du monde. Le projet né des ruines de 1945 : « Plus jamais la guerre en Europe. »",
		type: 'milestone',
		category: 'diplomatic',
		year: 1992,
		yearRange: [1957, 2002],
		affectedNationIds: [
			'nat_france',
			'nat_hre',
			'nat_england',
			'nat_venice',
			'nat_leon',
			'nat_poland',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_mediterranean',
			'clim_continental_east_europe',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_ww2', 'evt_fall_berlin_wall'],
			customCondition:
				"La CECA (1951) et le traité de Rome (1957) doivent exister. Le couple franco-allemand (Adenauer-De Gaulle, Kohl-Mitterrand) doit fonctionner. La chute du Mur doit accélérer l'intégration. Maastricht doit être ratifié (de justesse en France : 51%).",
		},
		effects: {
			economicModifier: 2,
			stabilityModifier: 2,
			prestigeModifier: 2,
			customEffect:
				"La CECA (1951) : charbon et acier communs → la guerre franco-allemande impossible. CEE (1957) : Marché commun. Acte unique (1986) : marché intérieur. Maastricht (1992) : citoyenneté européenne, monnaie unique. L'euro (2002) : 12 pays partagent une monnaie. Élargissement à l'Est (2004) : 10 nouveaux membres. Schengen : pas de frontières. Le Brexit (2016) — le premier départ.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_eu_integrate',
				label: "Approfondir l'intégration",
				description:
					'Fédéralisme européen. Budget commun, armée commune, solidarité.',
				effects: { economicModifier: 1, stabilityModifier: 1 },
			},
			{
				id: 'evt_eu_sovereign',
				label: 'Préserver la souveraineté nationale',
				description:
					"L'Europe des nations, pas les États-Unis d'Europe. De Gaulle avait raison.",
				effects: { prestigeModifier: 1, economicModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Maastricht échoue, l'UE reste un marché commun sans ambition politique. Si le Royaume-Uni adopte l'euro, le Brexit n'a pas lieu.",
		},
		historical_outcome:
			"L'UE est le plus grand marché unique du monde. Prix Nobel de la Paix (2012). Mais la crise de l'euro (2010-15), la crise migratoire (2015), le Brexit (2016), le COVID et la guerre en Ukraine testent la solidarité. L'UE avance par les crises — « l'Europe se fera dans les crises et elle sera la somme des solutions apportées à ces crises » (Jean Monnet).",
		status: 'pending',
	},

	{
		id: 'evt_yugoslav_wars',
		name: 'Guerres de Yougoslavie',
		description:
			'La Yougoslavie se désintègre dans le sang (1991-2001). Le siège de Sarajevo (1 425 jours). Le massacre de Srebrenica (8 000 hommes et garçons, juillet 1995). Le Kosovo (1998-99). Le retour de la guerre en Europe, 50 ans après 1945.',
		type: 'crisis',
		category: 'military',
		year: 1992,
		yearRange: [1991, 2001],
		affectedNationIds: ['nat_venice', 'nat_hre'],
		affectedRegionIds: ['clim_continental_east_europe', 'clim_mediterranean'],
		globalEvent: false,
		triggerConditions: {
			requiredEventIds: ['evt_fall_berlin_wall'],
			customCondition:
				'La mort de Tito (1980) doit avoir affaibli la cohésion yougoslave. Le nationalisme serbe (Milošević) doit monter. La Slovénie et la Croatie doivent déclarer leur indépendance (1991). La communauté internationale doit hésiter à intervenir.',
		},
		effects: {
			stabilityModifier: -3,
			populationModifier: -0.03,
			militaryModifier: -1,
			customEffect:
				"Guerre de Croatie (1991-95) : Vukovar rasé. Guerre de Bosnie (1992-95) : le siège de Sarajevo, le nettoyage ethnique, les camps. Srebrenica (juillet 1995) : les casques bleus néerlandais impuissants, 8 000 hommes et garçons massacrés par les forces serbes. L'OTAN intervient (bombardements de 1995, accords de Dayton). Guerre du Kosovo (1998-99) : bombardements de l'OTAN contre la Serbie. Milošević devant le TPIY (La Haye), meurt en détention (2006).",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Europe reconnaît rapidement les républiques avec des garanties pour les minorités, les guerres sont évitées. Si Milošević est renversé tôt, le nationalisme serbe est contenu.",
		},
		historical_outcome:
			"7 États au lieu d'un seul. 140 000 morts, 4 millions de réfugiés. Le TPIY juge les criminels de guerre. L'échec de Srebrenica hante l'ONU et les Pays-Bas. La Croatie et la Slovénie rejoignent l'UE. La Serbie négocie. Le Kosovo reste disputé. Les guerres yougoslaves rappellent que la « fin de l'histoire » était prématurée.",
		status: 'pending',
	},

	// ── 2000-2025 ──────────────────────────────────────────────────────────

	{
		id: 'evt_september_11',
		name: 'Attentats du 11 septembre',
		description:
			"Le 11 septembre 2001, 19 terroristes d'Al-Qaïda détournent quatre avions. Les Twin Towers s'effondrent à New York. Le Pentagone est frappé. 2 977 morts. Le monde bascule dans la « guerre contre le terrorisme ». Le XXIe siècle commence vraiment ce matin-là.",
		type: 'crisis',
		category: 'military',
		year: 2001,
		yearRange: [2001, 2001],
		affectedNationIds: ['nat_england', 'nat_ghaznavid'],
		affectedRegionIds: ['clim_northeast_america', 'clim_arid_mideast'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_cold_war_begins', 'evt_iranian_revolution'],
			customCondition:
				"Al-Qaïda doit exister (fondé en 1988 pendant la guerre d'Afghanistan). Ben Laden doit être en Afghanistan sous la protection des Talibans. Les attentats précédents (WTC 1993, ambassades 1998, USS Cole 2000) doivent avoir été ignorés. La sécurité aérienne doit être laxiste.",
		},
		effects: {
			stabilityModifier: -3,
			militaryModifier: 2,
			economicModifier: -2,
			customEffect:
				'Bush déclare la "guerre contre le terrorisme". Invasion de l\'Afghanistan (octobre 2001) — les Talibans tombent en deux mois. Le Patriot Act : surveillance massive, Guantánamo, torture ("techniques d\'interrogatoire renforcées"). Les libertés civiles reculent partout. L\'islamophobie monte. Le budget militaire américain explose. Le monde offre sa solidarité — "Nous sommes tous Américains" (Le Monde) — mais la solidarité ne durera pas.',
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_911_coalition',
				label: 'Rejoindre la coalition anti-terroriste',
				description:
					'Solidarité avec les USA. Participer aux opérations militaires.',
				effects: { militaryModifier: 1, prestigeModifier: 1 },
			},
			{
				id: 'evt_911_caution',
				label: 'Prudence et diplomatie',
				description:
					'Condamner le terrorisme, mais ne pas se lancer dans une guerre sans fin.',
				effects: { stabilityModifier: 1, prestigeModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les attentats sont déjoués, la \"guerre contre le terrorisme\" n'a pas lieu à cette échelle. Si les USA ne ciblent que l'Afghanistan (sans envahir l'Irak), les conséquences sont moindres.",
		},
		historical_outcome:
			"L'Afghanistan occupé pendant 20 ans (2001-2021). L'Irak envahi en 2003 sur de faux prétextes (armes de destruction massive inexistantes). L'État islamique naît du chaos irakien. Ben Laden tué (2011). Les Talibans reprennent Kaboul (août 2021). 900 000 morts dans les guerres post-11 septembre. Le Patriot Act, la NSA, Snowden — la surveillance de masse est le nouvel ordre.",
		status: 'pending',
	},

	{
		id: 'evt_iraq_war',
		name: "Guerre d'Irak — Chute de Saddam Hussein",
		description:
			"Les États-Unis envahissent l'Irak (20 mars 2003) sans mandat de l'ONU, sur la base de \"renseignements\" sur des armes de destruction massive — qui n'existent pas. Saddam tombe en trois semaines. L'occupation dure huit ans. L'Irak est détruit.",
		type: 'crisis',
		category: 'military',
		year: 2003,
		yearRange: [2003, 2011],
		affectedNationIds: ['nat_england', 'nat_ghaznavid'],
		affectedRegionIds: ['clim_arid_mideast'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_september_11'],
			customCondition:
				"Bush doit vouloir renverser Saddam (doctrine néoconservatrice). Colin Powell doit présenter de fausses preuves à l'ONU. La France (Chirac/Villepin) doit s'opposer. L'Angleterre (Blair) doit suivre.",
		},
		effects: {
			stabilityModifier: -3,
			militaryModifier: -1,
			economicModifier: -2,
			customEffect:
				'"Shock and awe" : Bagdad bombardé. La statue de Saddam renversée (9 avril). "Mission accomplie" (Bush, 1er mai 2003) — il reste 8 ans de guerre. L\'insurrection sunnite, les milices chiites, Al-Qaïda en Irak (Al-Zarqawi). Abu Ghraib : photos de torture. 200 000 civils irakiens morts. Les armes de destruction massive jamais trouvées. Saddam capturé (décembre 2003), pendu (2006).',
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_iraq_support',
				label: 'Soutenir la coalition',
				description:
					"Saddam est un dictateur sanguinaire. La démocratie mérite d'être exportée.",
				effects: { militaryModifier: 1, prestigeModifier: -1 },
			},
			{
				id: 'evt_iraq_oppose',
				label: "S'opposer à la guerre",
				description:
					"Pas de guerre sans l'ONU. Les preuves sont faibles. « La vieille Europe a raison. »",
				effects: { prestigeModifier: 1, stabilityModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Bush n'envahit pas, Saddam reste au pouvoir mais reste contenu. Si l'occupation est mieux planifiée (armée irakienne non dissoute), l'insurrection est moindre.",
		},
		historical_outcome:
			"L'Irak dévasté. La dissolution de l'armée irakienne crée des centaines de milliers de combattants sans emploi — le terreau de l'État islamique. La guerre coûte 2 000 milliards de dollars. La crédibilité américaine détruite. Le \"discours de Villepin\" à l'ONU (février 2003) reste un moment d'honneur pour la diplomatie française. L'Irak reste instable 20 ans après.",
		status: 'pending',
	},

	{
		id: 'evt_china_wto',
		name: "Entrée de la Chine à l'OMC",
		description:
			"La Chine rejoint l'Organisation mondiale du commerce le 11 décembre 2001. En 20 ans, elle devient l'usine du monde, puis la deuxième économie mondiale. 800 millions de personnes sorties de la pauvreté. Le plus grand transfert de richesse de l'histoire.",
		type: 'milestone',
		category: 'economic',
		year: 2001,
		yearRange: [2001, 2020],
		affectedNationIds: ['nat_song', 'nat_england', 'nat_japan'],
		affectedRegionIds: [
			'clim_east_asia',
			'clim_temperate_europe',
			'clim_northeast_america',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_chinese_communist_revolution', 'evt_tiananmen'],
			customCondition:
				"Les réformes de Deng Xiaoping doivent avoir transformé l'économie. Les zones économiques spéciales (Shenzhen) doivent être des succès. Les négociations OMC doivent durer 15 ans. La Chine doit promettre de respecter les règles du commerce international.",
		},
		effects: {
			economicModifier: 4,
			prestigeModifier: 2,
			customEffect:
				'Les exportations chinoises explosent : de 250 milliards (2001) à 3 500 milliards de dollars (2022). Le "choc chinois" : les industries manufacturières occidentales dévastées. La Rust Belt américaine vote Trump (2016). Shenzhen passe de village de pêcheurs à métropole de 17 millions. Le PIB chinois passe de 1 300 à 18 000 milliards de dollars. La classe moyenne chinoise : 400 millions de personnes.',
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_china_wto_engage',
				label: 'Commerce ouvert avec la Chine',
				description:
					"Le libre-échange enrichit tout le monde. La Chine se démocratisera en s'enrichissant.",
				effects: { economicModifier: 2, stabilityModifier: -1 },
			},
			{
				id: 'evt_china_wto_protect',
				label: 'Protéger les industries nationales',
				description:
					'La Chine ne joue pas selon les règles. Protéger les emplois locaux.',
				effects: { economicModifier: -1, stabilityModifier: 1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la Chine n'entre pas à l'OMC, sa croissance est plus lente. Si l'Occident impose des conditions plus strictes, le transfert industriel est limité.",
		},
		historical_outcome:
			"La Chine ne s'est pas démocratisée en s'enrichissant — l'hypothèse occidentale était fausse. Xi Jinping (2012) renforce l'autoritarisme. La guerre commerciale USA-Chine (2018-). La Chine rattrape les USA en technologie (5G, IA, espace). La \"nouvelle route de la soie\" (2013) : influence mondiale. Le XXIe siècle est sino-américain.",
		status: 'pending',
	},

	{
		id: 'evt_indian_ocean_tsunami',
		name: "Tsunami de l'océan Indien",
		description:
			"Le 26 décembre 2004, un séisme de magnitude 9.1 au large de Sumatra déclenche un tsunami dévastateur. 230 000 morts dans 14 pays. Aucun système d'alerte. L'aide internationale la plus massive de l'histoire. Les images en boucle sur les chaînes d'info en continu.",
		type: 'natural_disaster',
		category: 'natural',
		year: 2004,
		yearRange: [2004, 2005],
		affectedNationIds: ['nat_chola', 'nat_swahili_cities'],
		affectedRegionIds: [
			'clim_southeast_asia',
			'clim_south_asia',
			'clim_east_africa_highland',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_internet_revolution'],
			customCondition:
				"Le séisme doit se produire dans la zone de subduction de Sumatra. Aucun système d'alerte tsunami ne doit exister dans l'océan Indien (contrairement au Pacifique). Les côtes doivent être densément peuplées et touristiques (vacances de Noël).",
		},
		effects: {
			populationModifier: -0.03,
			economicModifier: -2,
			stabilityModifier: -1,
			customEffect:
				"Les vagues de 30 mètres frappent les côtes d'Indonésie, du Sri Lanka, d'Inde, de Thaïlande, du Kenya. Banda Aceh rasé. 230 000 morts. Des villages entiers effacés. La solidarité internationale : 14 milliards de dollars. Un système d'alerte est installé dans l'océan Indien. Le conflit acehnais se résout (accords de paix 2005, le tsunami comme catalyseur). Les caméras de touristes fournissent les premières images — l'ère du citoyen-témoin.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si un système d'alerte existe, les morts sont réduits de 80%. Si le séisme se produit plus au sud, les côtes les plus peuplées sont épargnées.",
		},
		historical_outcome:
			"Le système d'alerte tsunami de l'océan Indien est opérationnel depuis 2006. L'Indonésie est devenue un leader mondial en gestion des catastrophes. La catastrophe a tué le conflit acehnais — les pourparlers de paix aboutissent en 2005. L'aide internationale a révélé les limites des ONG (reconstruction lente, coordination chaotique). Le tsunami a inspiré les protocoles de réponse aux catastrophes du XXIe siècle.",
		status: 'pending',
	},

	{
		id: 'evt_financial_crisis_2008',
		name: 'Crise financière mondiale de 2008',
		description:
			"La faillite de Lehman Brothers (15 septembre 2008) déclenche la pire crise financière depuis 1929. Les subprimes, les CDO, les CDS — le casino financier s'effondre. Sauvetage des banques par les contribuables. 8 millions d'Américains perdent leur maison. « Too big to fail. »",
		type: 'crisis',
		category: 'economic',
		year: 2008,
		yearRange: [2007, 2012],
		affectedNationIds: ['nat_england', 'nat_france', 'nat_hre', 'nat_leon'],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_northeast_america',
			'clim_mediterranean',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_internet_revolution'],
			customCondition:
				'La dérégulation financière (abrogation de Glass-Steagall, 1999) doit avoir libéré la spéculation. Les subprimes doivent gonfler la bulle immobilière. Les agences de notation doivent accorder AAA à des produits toxiques. La titrisation doit rendre les risques invisibles.',
		},
		effects: {
			economicModifier: -4,
			stabilityModifier: -2,
			customEffect:
				'Bear Stearns (mars 2008), Lehman Brothers (septembre 2008), AIG sauvé (182 milliards). Le crédit se gèle. Le commerce mondial chute de 12%. Le chômage explose (10% aux USA, 25% en Espagne). Plans de sauvetage : TARP (700 milliards), QE (quantitative easing). La Grèce, l\'Irlande, le Portugal au bord de la faillite. La crise de l\'euro (2010-15). Occupy Wall Street (2011) : "Nous sommes les 99%."',
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_2008_bailout',
				label: 'Sauver les banques',
				description:
					"Too big to fail. Injecter des milliards pour éviter l'effondrement total.",
				effects: { economicModifier: 1, prestigeModifier: -1 },
			},
			{
				id: 'evt_2008_let_fail',
				label: 'Laisser le marché se purger',
				description:
					'Les banques qui ont spéculé doivent payer. Pas de socialisation des pertes.',
				effects: { economicModifier: -2, stabilityModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Lehman est sauvé (comme Bear Stearns), la panique est évitée. Si la régulation avait été maintenue, les subprimes n'existent pas.",
		},
		historical_outcome:
			'Les banques sauvées, les banquiers pas punis (un seul emprisonné). Les inégalités explosent. Les banques centrales impriment des milliers de milliards (QE). Les taux à zéro pendant 10 ans. La colère populaire nourrit le populisme : Trump, Brexit, gilets jaunes. La crise de 2008 est la matrice politique du monde actuel.',
		status: 'pending',
	},

	{
		id: 'evt_arab_spring',
		name: 'Printemps arabe',
		description:
			"Mohamed Bouazizi s'immole en Tunisie (17 décembre 2010). La révolution se propage : Tunisie, Égypte, Libye, Syrie, Yémen, Bahreïn. Les réseaux sociaux comme arme de mobilisation. L'espoir d'une démocratisation du monde arabe — puis la désillusion.",
		type: 'political',
		category: 'political',
		year: 2011,
		yearRange: [2010, 2013],
		affectedNationIds: ['nat_ghaznavid'],
		affectedRegionIds: [
			'clim_arid_mideast',
			'clim_sahel',
			'clim_nile_valley',
			'clim_mediterranean',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: [
				'evt_internet_revolution',
				'evt_financial_crisis_2008',
			],
			customCondition:
				'Les régimes autoritaires arabes doivent être en place depuis des décennies. Le chômage des jeunes doit être massif. Facebook et Twitter doivent permettre la coordination. La hausse des prix alimentaires (2010-11) doit enflammer la colère.',
		},
		effects: {
			stabilityModifier: -3,
			prestigeModifier: 1,
			religiousTensionModifier: 2,
			customEffect:
				'Tunisie : Ben Ali fuit (14 janvier 2011). Égypte : Moubarak renversé après 18 jours de place Tahrir. Libye : Kadhafi tué ("intervention humanitaire" de l\'OTAN, chaos ensuite). Syrie : Assad reste et la guerre civile fait 500 000 morts. Yémen : guerre civile, famine. Bahreïn : écrasé par l\'Arabie Saoudite. Seule la Tunisie réussit (temporairement) sa transition démocratique.',
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_arab_support_revolution',
				label: 'Soutenir les révolutions',
				description:
					'La démocratie est un droit universel. Aider les peuples qui se soulèvent.',
				effects: { prestigeModifier: 1, stabilityModifier: -1 },
			},
			{
				id: 'evt_arab_stability',
				label: 'Privilégier la stabilité',
				description:
					"Les dictateurs maintenaient l'ordre. Le chaos est pire que l'autoritarisme.",
				effects: { stabilityModifier: 1, prestigeModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les régimes avaient réformé (modèle marocain), les révolutions sont évitées. Si l'OTAN n'intervient pas en Libye, Kadhafi survit mais la répression est sanglante.",
		},
		historical_outcome:
			"Le bilan est amer. Seule la Tunisie a réussi sa transition (avant le recul de Saïed, 2021). L'Égypte : Morsi élu puis renversé par Sissi (2013). La Syrie : 500 000 morts, 6 millions de réfugiés, retour d'Assad puis sa chute (2024). La Libye : deux gouvernements rivaux. La crise migratoire en Europe (2015) est une conséquence directe. L'État islamique profite du chaos.",
		status: 'pending',
	},

	{
		id: 'evt_isis_caliphate',
		name: "L'État islamique — Le Califat de Daech",
		description:
			'Abu Bakr al-Baghdadi proclame le "califat" depuis la mosquée al-Nouri de Mossoul (29 juin 2014). L\'État islamique contrôle un territoire grand comme la Grande-Bretagne entre l\'Irak et la Syrie. Terreur, esclavage, destructions de Palmyre. Attentats à Paris (2015), Bruxelles (2016).',
		type: 'crisis',
		category: 'military',
		year: 2014,
		yearRange: [2014, 2019],
		affectedNationIds: ['nat_ghaznavid', 'nat_france', 'nat_england'],
		affectedRegionIds: ['clim_arid_mideast', 'clim_temperate_europe'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_iraq_war', 'evt_arab_spring'],
			customCondition:
				"Le chaos irakien et syrien doit créer un vide de pouvoir. Les anciens officiers de Saddam doivent rejoindre Daech. Le financement du Golfe et les combattants étrangers doivent affluer. Les frontières syro-irakiennes doivent s'effondrer.",
		},
		effects: {
			stabilityModifier: -3,
			religiousTensionModifier: 3,
			militaryModifier: -1,
			customEffect:
				"Mossoul tombe (juin 2014) — 30 000 combattants Daech mettent en fuite 60 000 soldats irakiens. Le génocide des Yézidis. L'esclavage des femmes. Les vidéos d'exécution comme propagande. Paris (13 novembre 2015) : 130 morts au Bataclan et aux terrasses. La coalition internationale (60 pays) bombarde. Les Kurdes (YPG/Peshmergas) combattent au sol. Raqqa et Mossoul reprises (2017). Baghdadi tué (2019).",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si l\'armée irakienne avait résisté à Mossoul, le "califat" ne naît pas. Si Assad tombe rapidement, la Syrie se stabilise et Daech n\'a pas de sanctuaire.',
		},
		historical_outcome:
			"Le califat territorial détruit (2019) mais l'idéologie survit (cellules dormantes, Sahel, Afghanistan). Les attentats en Europe renforcent l'extrême droite. La crise migratoire de 2015 (1 million de réfugiés en Europe) polarise la politique européenne. Les Kurdes, héros de la guerre contre Daech, sont abandonnés par les USA (retrait de Syrie, 2019). Le Moyen-Orient plus fragmenté que jamais.",
		status: 'pending',
	},

	{
		id: 'evt_european_migrant_crisis',
		name: 'Crise migratoire européenne',
		description:
			"En 2015, plus d'un million de migrants et réfugiés arrivent en Europe, fuyant la Syrie, l'Afghanistan, l'Érythrée. Le corps d'Alan Kurdi sur une plage turque (septembre 2015). Merkel ouvre les frontières : \"Wir schaffen das.\" L'Europe se déchire.",
		type: 'crisis',
		category: 'political',
		year: 2015,
		yearRange: [2015, 2016],
		affectedNationIds: [
			'nat_hre',
			'nat_france',
			'nat_ghaznavid',
			'nat_hungary',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_mediterranean',
			'clim_arid_mideast',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_arab_spring', 'evt_isis_caliphate'],
			customCondition:
				"La guerre civile syrienne doit créer des millions de réfugiés. Les camps au Liban et en Turquie doivent être saturés. La route des Balkans doit être praticable. La photo d'Alan Kurdi doit frapper les consciences.",
		},
		effects: {
			stabilityModifier: -2,
			religiousTensionModifier: 2,
			customEffect:
				"La route des Balkans : Turquie → Grèce → Macédoine → Serbie → Hongrie → Allemagne. Orban construit un mur. Merkel accueille 1 million de réfugiés. L'accord UE-Turquie (mars 2016) : 6 milliards d'euros pour que la Turquie retienne les migrants. Les naufrages en Méditerranée : 5 000 morts en 2016. L'extrême droite monte partout (AfD, FN, Salvini, Orban). Le Brexit (2016) est en partie une réaction à la crise migratoire.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_migrant_welcome',
				label: 'Accueillir les réfugiés',
				description: "Le droit d'asile est sacré. L'Europe a un devoir moral.",
				effects: { prestigeModifier: 1, stabilityModifier: -1 },
			},
			{
				id: 'evt_migrant_close',
				label: 'Fermer les frontières',
				description:
					"L'Europe ne peut pas accueillir toute la misère du monde. Protéger les nôtres.",
				effects: { stabilityModifier: 1, prestigeModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si la guerre en Syrie est évitée, la crise migratoire n'atteint pas cette ampleur. Si l'Europe avait un mécanisme de répartition équitable, les tensions sont moindres.",
		},
		historical_outcome:
			"L'Allemagne intègre la majorité des réfugiés (avec des difficultés). L'accord UE-Turquie réduit les arrivées mais donne un levier à Erdoğan. La crise migratoire alimente le populisme : Brexit (2016), victoire de la droite en Autriche, Italie, Suède. La Méditerranée devient un cimetière. La politique européenne est durablement transformée.",
		status: 'pending',
	},

	{
		id: 'evt_brexit',
		name: "Brexit — Le Royaume-Uni quitte l'UE",
		description:
			"Le 23 juin 2016, 51.9% des Britanniques votent pour quitter l'Union européenne. Le choc. Cameron démissionne. Trois ans de chaos parlementaire. Le 31 janvier 2020, le Royaume-Uni quitte officiellement l'UE. Le premier départ de l'histoire européenne.",
		type: 'political',
		category: 'diplomatic',
		year: 2016,
		yearRange: [2016, 2020],
		affectedNationIds: ['nat_england', 'nat_france', 'nat_hre', 'nat_scotland'],
		affectedRegionIds: ['clim_temperate_europe'],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_european_union', 'evt_european_migrant_crisis'],
			customCondition:
				'L\'euroscepticisme britannique doit être ancien (Thatcher, UKIP). La crise migratoire doit alimenter les peurs. Cameron doit promettre un référendum pour gagner les élections de 2015. La presse tabloïd doit mener campagne ("Take back control").',
		},
		effects: {
			economicModifier: -2,
			stabilityModifier: -1,
			prestigeModifier: -1,
			customEffect:
				"Le référendum divise le pays : Londres, l'Écosse et l'Irlande du Nord votent Remain. Les régions désindustrialisées votent Leave. La livre sterling chute de 10%. Theresa May négocie trois accords rejetés par le Parlement. Boris Johnson proroge le Parlement (jugé illégal). Le protocole nord-irlandais crée une frontière en mer d'Irlande. L'Écosse veut un nouveau référendum d'indépendance.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si Cameron ne promet pas de référendum, le Brexit n'a pas lieu. Si le vote est à 52% Remain (réversible avec 1.5% de swing), le Royaume-Uni reste — et l'UE est peut-être moins reformée.",
		},
		historical_outcome:
			"Le Royaume-Uni perd 4% de PIB par rapport au scénario sans Brexit (estimations OBR, 2023). Les exportations vers l'UE chutent. La City garde son importance mais perd des parts de marché (Amsterdam, Dublin). L'Écosse pousse pour l'indépendance. L'Irlande du Nord se rapproche de la République. L'UE perd son deuxième budget mais gagne en cohérence politique.",
		status: 'pending',
	},

	{
		id: 'evt_covid_pandemic',
		name: 'Pandémie de COVID-19',
		description:
			"Un coronavirus émergé à Wuhan (fin 2019) provoque la pire pandémie depuis la grippe espagnole. 7 millions de morts officiels (15-25 millions estimés). Confinements mondiaux, économie à l'arrêt, vaccins en un an. Le monde ne sera plus jamais le même.",
		type: 'natural_disaster',
		category: 'health',
		year: 2020,
		yearRange: [2020, 2023],
		affectedNationIds: [
			'nat_song',
			'nat_england',
			'nat_france',
			'nat_hre',
			'nat_leon',
			'nat_venice',
			'nat_japan',
			'nat_chola',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_east_asia',
			'clim_northeast_america',
			'clim_south_asia',
			'clim_south_american_subtropical',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_internet_revolution'],
			requiredTechs: ['tech_internet', 'tech_antibiotics'],
			customCondition:
				'Un virus respiratoire hautement transmissible doit émerger (zoonose probable). La mondialisation doit permettre une diffusion rapide (avions). Les systèmes de santé doivent être inégalement préparés. La Chine doit tarder à informer le monde.',
		},
		effects: {
			populationModifier: -0.02,
			economicModifier: -3,
			stabilityModifier: -2,
			techUnlocks: ['tech_crispr'],
			customEffect:
				"Wuhan confiné (23 janvier 2020). L'Italie submergée (mars). Le monde se confine. Télétravail, Zoom, isolement. Le PIB mondial chute de 3.5% en 2020. Les vaccins développés en 11 mois (Pfizer/BioNTech, Moderna — ARN messager, révolution biotechnologique). Mais l'inégalité vaccinale : l'Afrique très peu vaccinée. Complotisme, antivax, QAnon. Les chaînes d'approvisionnement cassées. L'inflation mondiale qui suit.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_covid_lockdown',
				label: 'Confinement strict',
				description:
					'Sauver des vies. Confiner, fermer, masquer. Coût économique massif.',
				effects: { economicModifier: -2, populationModifier: 0.01 },
			},
			{
				id: 'evt_covid_open',
				label: "Garder l'économie ouverte",
				description:
					"L'immunité collective. Le remède ne doit pas être pire que le mal.",
				effects: { economicModifier: 1, populationModifier: -0.01 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si le virus est contenu à Wuhan (comme le SRAS en 2003), la pandémie n'a pas lieu. Si les vaccins prennent 5 ans, les morts se comptent en dizaines de millions.",
		},
		historical_outcome:
			"7 millions de morts officiels, 15-25 millions estimés. Le vaccin ARNm ouvre une nouvelle ère médicale (cancer, maladies rares). Le télétravail transforme les villes et l'économie. Les inégalités explosent : les milliardaires s'enrichissent, les travailleurs précaires sombrent. La Chine s'isole (\"zéro COVID\" jusqu'en 2023). La confiance dans les institutions s'effondre. Le monde post-COVID est plus fragmenté, plus méfiant, plus numérique.",
		status: 'pending',
	},

	{
		id: 'evt_ukraine_war',
		name: "Invasion russe de l'Ukraine",
		description:
			"Le 24 février 2022, la Russie de Poutine envahit l'Ukraine. La plus grande guerre en Europe depuis 1945. Zelensky refuse de fuir : \"J'ai besoin de munitions, pas d'un taxi.\" L'Occident impose des sanctions massives et arme l'Ukraine. La guerre dure.",
		type: 'crisis',
		category: 'military',
		year: 2022,
		yearRange: [2022, 2025],
		affectedNationIds: [
			'nat_kievan_rus',
			'nat_hre',
			'nat_france',
			'nat_england',
			'nat_poland',
		],
		affectedRegionIds: [
			'clim_continental_east_europe',
			'clim_temperate_europe',
			'clim_subarctic',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_fall_berlin_wall'],
			requiredTechs: ['tech_satellite', 'tech_smartphone'],
			customCondition:
				"Poutine doit avoir annexé la Crimée (2014) sans conséquences majeures. L'élargissement de l'OTAN doit être perçu comme une menace existentielle par Moscou. L'Ukraine doit vouloir rejoindre l'UE et l'OTAN. La dépendance européenne au gaz russe doit être un levier.",
		},
		effects: {
			stabilityModifier: -3,
			militaryModifier: 2,
			economicModifier: -2,
			techUnlocks: ['tech_3d_printing'],
			customEffect:
				"L'armée russe attendue à Kyiv en 3 jours — mais l'Ukraine résiste. Bucha, Irpin : atrocités russes. La bataille de Bakhmout (la plus longue depuis Verdun). Les sanctions occidentales : SWIFT, gel des avoirs, embargo pétrolier. La crise énergétique en Europe : le gaz russe coupé, les prix flambent. La Finlande et la Suède rejoignent l'OTAN. La Russie mobilise 300 000 réservistes. Drones, guerre de tranchées, artillerie — le retour de la guerre industrielle.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_ukraine_arm',
				label: "Armer l'Ukraine",
				description:
					"L'Ukraine défend la liberté de l'Europe. HIMARS, Leopard, F-16.",
				effects: { militaryModifier: 1, economicModifier: -1 },
			},
			{
				id: 'evt_ukraine_negotiate',
				label: 'Pousser à la négociation',
				description:
					'Cesser le feu. Gel du conflit. Paix imparfaite plutôt que guerre sans fin.',
				effects: { stabilityModifier: 1, prestigeModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'OTAN avait intégré l'Ukraine avant 2022, Poutine n'envahit pas (article 5). Si Kyiv tombe en 3 jours, Zelensky en exil, gouvernement fantoche.",
		},
		historical_outcome:
			"La guerre continue en 2025. L'Ukraine tient. L'Europe se réarme massivement. La Russie est isolée mais non vaincue. Le couple sino-russe se renforce. L'ordre mondial d'après 1991 est mort. Le monde est multipolaire et dangereux. L'énergie nucléaire redevient un sujet stratégique. L'Europe redécouvre qu'elle a besoin d'une armée.",
		status: 'pending',
	},

	{
		id: 'evt_climate_crisis_acceleration',
		name: 'Accélération de la crise climatique',
		description:
			"Les années 2015-2025 sont les plus chaudes jamais enregistrées. L'accord de Paris (2015) fixe l'objectif de 1.5°C — déjà dépassé. Incendies en Australie (2020), au Canada (2023), inondations en Allemagne (2021), au Pakistan (2022). Le réchauffement climatique passe de la théorie au vécu quotidien.",
		type: 'crisis',
		category: 'natural',
		year: 2015,
		yearRange: [2015, 2025],
		affectedNationIds: [
			'nat_england',
			'nat_france',
			'nat_hre',
			'nat_song',
			'nat_chola',
			'nat_aboriginal',
			'nat_hawaii',
		],
		affectedRegionIds: [
			'clim_temperate_europe',
			'clim_arid_mideast',
			'clim_south_asia',
			'clim_tropical_africa',
			'clim_sahel',
			'clim_northeast_america',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_second_industrial_revolution'],
			requiredTechs: ['tech_internal_combustion', 'tech_electricity'],
			customCondition:
				"Les émissions de CO2 doivent avoir atteint 420 ppm (contre 280 avant l'ère industrielle). Les glaciers, la banquise arctique et la calotte du Groenland doivent fondre visiblement. Les événements météorologiques extrêmes doivent se multiplier. Le GIEC doit alerter (rapports 2018, 2021, 2023).",
		},
		effects: {
			populationModifier: -0.01,
			economicModifier: -1,
			stabilityModifier: -1,
			techUnlocks: ['tech_renewable_energy'],
			customEffect:
				"Accord de Paris (décembre 2015) : 196 pays, objectif 1.5°C. Mais les engagements sont insuffisants (trajectoire 2.7°C). Les incendies australiens (2020) : 3 milliards d'animaux tués. Le Pakistan sous les eaux (2022) : un tiers du pays inondé, 1 700 morts. Canicules record en Europe (2022-23 : 60 000 morts excédentaires). Greta Thunberg et les marches pour le climat (2018-19). COP26, COP27, COP28 : promesses, déceptions, pétrole. La fonte du Groenland s'accélère. Les îles du Pacifique disparaissent.",
		},
		severity: 10,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_climate_transition',
				label: 'Transition énergétique ambitieuse',
				description:
					'Sortir des fossiles. Renouvelables, nucléaire, sobriété. Coût massif mais nécessaire.',
				effects: { economicModifier: -1, prestigeModifier: 2 },
			},
			{
				id: 'evt_climate_delay',
				label: 'Retarder la transition',
				description:
					"L'économie d'abord. La technologie résoudra le problème plus tard.",
				effects: { economicModifier: 1, prestigeModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les pays avaient agi après Rio (1992), le 1.5°C était atteignable. Si une technologie de capture du CO2 émerge, la trajectoire change. Si les points de basculement sont franchis, le réchauffement s'emballe au-delà du contrôle humain.",
		},
		historical_outcome:
			"En 2025, le monde est à +1.3°C et la barre des 1.5°C sera franchie avant 2030. Le solaire et l'éolien sont désormais les sources d'électricité les moins chères. Mais les émissions continuent d'augmenter. Les migrations climatiques commencent (Sahel, Bangladesh, îles du Pacifique). Le changement climatique est le défi existentiel du siècle — et la réponse est encore insuffisante.",
		status: 'pending',
	},

	{
		id: 'evt_ai_revolution',
		name: "Révolution de l'intelligence artificielle",
		description:
			"ChatGPT (novembre 2022) atteint 100 millions d'utilisateurs en deux mois — le produit le plus rapidement adopté de l'histoire. L'IA générative bouleverse tous les secteurs. Le moment Oppenheimer du numérique : puissance immense, conséquences inconnues.",
		type: 'milestone',
		category: 'scientific',
		year: 2023,
		yearRange: [2022, 2025],
		affectedNationIds: [
			'nat_england',
			'nat_song',
			'nat_japan',
			'nat_france',
			'nat_hre',
		],
		affectedRegionIds: [
			'clim_northeast_america',
			'clim_east_asia',
			'clim_temperate_europe',
		],
		globalEvent: true,
		triggerConditions: {
			requiredEventIds: ['evt_internet_revolution', 'evt_covid_pandemic'],
			requiredTechs: ['tech_internet', 'tech_computer'],
			customCondition:
				"Les GPU (Nvidia) doivent permettre l'entraînement de modèles massifs. La pandémie de COVID doit avoir accéléré la digitalisation. Les Transformers (Google, 2017) doivent être inventés. La loi d'échelle (scaling laws) doit être découverte. OpenAI, Google, Anthropic doivent investir des milliards.",
		},
		effects: {
			economicModifier: 2,
			prestigeModifier: 2,
			techUnlocks: ['tech_artificial_intelligence'],
			customEffect:
				'GPT-3 (2020), DALL-E (2022), ChatGPT (2022), GPT-4 (2023), GPT-4o, Claude, Gemini. L\'IA écrit, code, dessine, compose, diagnostique. La capitalisation de Nvidia dépasse 3 000 milliards de dollars. Les emplois menacés : traduction, service client, programmation junior, design. Mais aussi : découverte de médicaments (AlphaFold), fusion nucléaire, matériaux. Le débat sur les risques existentiels ("AI alignment"). La course USA-Chine pour la suprématie IA.',
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_ai_embrace',
				label: "Adopter l'IA massivement",
				description:
					"L'IA est la prochaine révolution industrielle. Investir ou être dépassé.",
				effects: { economicModifier: 2, stabilityModifier: -1 },
			},
			{
				id: 'evt_ai_regulate',
				label: 'Réguler et encadrer',
				description:
					'Le EU AI Act comme modèle. Éthique, transparence, contrôle humain.',
				effects: { stabilityModifier: 1, economicModifier: -1 },
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les Transformers ne sont pas inventés, l'IA reste spécialisée (pas générative). Si les gouvernements imposent un moratoire, le développement ralentit. Si l'IA atteint l'AGI, tout change de manière imprévisible.",
		},
		historical_outcome:
			"En 2025, l'IA est omniprésente mais ses conséquences à long terme restent inconnues. Les deepfakes menacent la démocratie. Les emplois sont transformés plus que détruits (pour l'instant). La question de la conscience artificielle n'est pas résolue. La régulation européenne (AI Act, 2024) est pionnière. L'IA est peut-être la plus grande invention depuis l'écriture — ou le feu.",
		status: 'pending',
	},

	// ========================================================================
	// Nations sans événements — Ajout d'événements historiques réels
	// ========================================================================

	// --- nat_dai_viet : Fondation de la dynastie Lý (1009) ---
	{
		id: 'evt_ly_dynasty_founding',
		name: 'Fondation de la dynastie Lý',
		description:
			"Lý Công Uẩn, un officier de cour bouddhiste, renverse la dynastie Lê antérieure et fonde la dynastie Lý. Il transfère la capitale à Thăng Long (Hanoï), inaugurant une ère de stabilité et d'expansion pour le Đại Việt.",
		type: 'political',
		category: 'political',
		year: 1009,
		yearRange: [1009, 1010],
		affectedNationIds: ['nat_dai_viet'],
		affectedRegionIds: ['clim_southeast_asia'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"La dynastie Lê antérieure doit être affaiblie par des conflits internes. Lý Công Uẩn doit disposer d'un soutien bouddhiste et militaire suffisant.",
		},
		effects: {
			stabilityModifier: 3,
			prestigeModifier: 3,
			customEffect:
				'Transfert de la capitale à Thăng Long (Hanoï). Consolidation du pouvoir centralisé. Influence bouddhiste renforcée dans la gouvernance.',
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_ly_accept_coup',
				label: 'Soutenir la prise de pouvoir de Lý Công Uẩn',
				description:
					'La transition se fait en douceur avec le soutien du clergé bouddhiste.',
				effects: {
					stabilityModifier: 3,
					prestigeModifier: 2,
				},
			},
			{
				id: 'evt_ly_resist_coup',
				label: 'Résister au changement de dynastie',
				description:
					'Les loyalistes Lê tentent de conserver le pouvoir, provoquant une guerre civile.',
				effects: {
					stabilityModifier: -3,
					militaryModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si la dynastie Lê reste stable, Lý Công Uẩn pourrait devenir un puissant ministre plutôt que fondateur de dynastie.',
		},
		historical_outcome:
			'Lý Thái Tổ fonde la dynastie Lý en 1009 et transfère la capitale à Thăng Long en 1010. La dynastie règnera plus de 200 ans (1009-1225), établissant un État vietnamien consolidé avec un système administratif confucéen, une culture bouddhiste florissante, et une victoire décisive contre les Song à la bataille de la rivière Như Nguyệt (1077).',
		status: 'pending',
	},

	// --- nat_georgia : Unification par Bagrat III (1008) ---
	{
		id: 'evt_georgia_unification',
		name: 'Unification de la Géorgie par Bagrat III',
		description:
			"Bagrat III achève l'unification des royaumes géorgiens (Ibérie, Colchide, Kakhétie) en un seul royaume. C'est la première fois que les terres géorgiennes sont réunies sous un seul souverain, posant les bases de l'âge d'or géorgien.",
		type: 'milestone',
		category: 'political',
		year: 1008,
		yearRange: [1001, 1010],
		affectedNationIds: ['nat_georgia'],
		affectedRegionIds: ['clim_caucasus'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Bagrat doit hériter ou conquérir les différents royaumes géorgiens par succession dynastique et manœuvres politiques.',
		},
		effects: {
			stabilityModifier: 3,
			prestigeModifier: 4,
			militaryModifier: 2,
			customEffect:
				"Unification politique des terres géorgiennes. Création d'une armée unifiée. Renforcement de l'Église orthodoxe géorgienne comme ciment national.",
		},
		severity: 8,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_georgia_unify_accept',
				label: "Achever l'unification",
				description: 'Bagrat réunit tous les royaumes sous une seule couronne.',
				effects: {
					stabilityModifier: 3,
					prestigeModifier: 4,
				},
			},
			{
				id: 'evt_georgia_unify_resist',
				label: 'Les princes régionaux résistent',
				description:
					'Certains princes géorgiens refusent de renoncer à leur autonomie.',
				effects: {
					stabilityModifier: -2,
					militaryModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Sans Bagrat III, les royaumes géorgiens restent fragmentés et vulnérables aux invasions seldjoukides et byzantines.',
		},
		historical_outcome:
			"Bagrat III unifie la Géorgie en 1008, devenant le premier roi d'une Géorgie unie. Cette unification permettra à ses successeurs, notamment David IV le Bâtisseur (1089-1125) et la reine Tamar (1184-1213), de mener la Géorgie vers son âge d'or.",
		status: 'pending',
	},

	// --- nat_armenia : Chute du royaume d'Ani (1064) ---
	{
		id: 'evt_fall_of_ani',
		name: "Chute d'Ani face aux Seldjoukides",
		description:
			"Les Turcs seldjoukides d'Alp Arslan assiègent et prennent Ani, capitale du royaume bagratide d'Arménie. La ville, surnommée « la ville aux mille et une églises », est mise à sac. C'est la fin effective de l'indépendance arménienne médiévale.",
		type: 'crisis',
		category: 'military',
		year: 1064,
		yearRange: [1060, 1065],
		affectedNationIds: ['nat_armenia'],
		affectedRegionIds: ['clim_caucasus'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"Les Seldjoukides doivent avoir conquis l'Iran et progresser vers l'ouest. Byzance doit ne pas envoyer de secours suffisant.",
		},
		effects: {
			stabilityModifier: -5,
			prestigeModifier: -4,
			populationModifier: -0.15,
			economicModifier: -3,
			customEffect:
				"Destruction partielle d'Ani. Début de la diaspora arménienne vers la Cilicie, Constantinople et au-delà. Perte de l'indépendance politique.",
		},
		severity: 9,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_ani_defend',
				label: "Défendre Ani jusqu'au bout",
				description:
					'Organiser une résistance acharnée malgré les forces écrasantes seldjoukides.',
				effects: {
					stabilityModifier: -3,
					militaryModifier: -2,
					prestigeModifier: 1,
				},
			},
			{
				id: 'evt_ani_flee',
				label: 'Évacuer et préserver le peuple',
				description:
					"Organiser l'exode vers la Cilicie et les terres byzantines pour sauvegarder la culture arménienne.",
				effects: {
					stabilityModifier: -2,
					populationModifier: -0.2,
					prestigeModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si Byzance intervient ou si les Seldjoukides sont distraits, Ani pourrait résister plus longtemps. Un royaume arménien de Cilicie pourrait émerger plus tôt.',
		},
		historical_outcome:
			"Ani tombe en 1064 sous Alp Arslan. La ville est pillée et sa population massacrée ou déportée. Le royaume bagratide d'Arménie cesse d'exister. Les Arméniens fondent ensuite le royaume de Cilicie (1080-1375) sur la côte méditerranéenne, préservant leur culture et jouant un rôle clé dans les Croisades.",
		status: 'pending',
	},

	// --- nat_volga_bulgaria : Apogée commerciale de Bolgar ---
	{
		id: 'evt_volga_bulgar_trade_zenith',
		name: 'Apogée commerciale de Bolgar',
		description:
			"La ville de Bolgar, capitale des Bulgares de la Volga, atteint son apogée comme plaque tournante du commerce entre la Scandinavie, Byzance, les califats islamiques et les peuples des steppes. Le commerce de fourrures, de miel et d'esclaves enrichit considérablement l'État.",
		type: 'opportunity',
		category: 'economic',
		year: 1000,
		yearRange: [980, 1050],
		affectedNationIds: ['nat_volga_bulgaria'],
		affectedRegionIds: ['clim_continental_east_europe'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Les routes commerciales Volga-Caspienne doivent être sécurisées. Les relations avec les Rus et les califats doivent être stables.',
		},
		effects: {
			economicModifier: 3,
			prestigeModifier: 2,
			customEffect:
				'Afflux de richesse à Bolgar. Construction de mosquées et bains publics. Développement de la frappe monétaire locale.',
		},
		severity: 6,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_volga_trade_expand',
				label: 'Investir dans les routes commerciales',
				description:
					'Renforcer les caravansérails et les relations diplomatiques pour maximiser le commerce.',
				effects: {
					economicModifier: 3,
					prestigeModifier: 2,
				},
			},
			{
				id: 'evt_volga_trade_military',
				label: 'Taxer lourdement et militariser',
				description:
					'Imposer des taxes élevées et renforcer les garnisons, au risque de décourager les marchands.',
				effects: {
					economicModifier: 1,
					militaryModifier: 2,
					stabilityModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les routes sont perturbées par des raids Rus ou Petchenègues, le commerce peut décliner au lieu de prospérer.',
		},
		historical_outcome:
			"Bolgar reste un centre commercial majeur jusqu'à l'invasion mongole de 1236. Les fouilles archéologiques révèlent une ville cosmopolite avec mosquées, bains, ateliers de métallurgie et monnaies frappées localement. Le commerce de fourrures avec les populations finno-ougriennes du nord était particulièrement lucratif.",
		status: 'pending',
	},

	// --- nat_kanem : Islamisation sous le mai Hummay ---
	{
		id: 'evt_kanem_islamization',
		name: 'Islamisation du Kanem sous Hummay',
		description:
			"Le mai (roi) Hummay renverse la dynastie Duguwa et fonde la dynastie Sayfawa, introduisant l'islam comme religion d'État au Kanem. Cette conversion ouvre des liens diplomatiques et commerciaux avec le monde musulman nord-africain.",
		type: 'cultural_shift',
		category: 'religious',
		year: 1085,
		yearRange: [1075, 1097],
		affectedNationIds: ['nat_kanem'],
		affectedRegionIds: ['clim_sahel'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"Des marchands et érudits musulmans doivent avoir une présence suffisante au Kanem. Le mai Hummay doit être convaincu par les avantages diplomatiques et commerciaux de l'islam.",
		},
		effects: {
			stabilityModifier: -1,
			prestigeModifier: 3,
			religiousTensionModifier: 3,
			economicModifier: 2,
			customEffect:
				"Adoption de l'islam par l'élite. Renforcement des liens commerciaux transsahariens. Tensions avec les populations restées animistes.",
		},
		severity: 7,
		visibility: 'public',
		playerChoices: [
			{
				id: 'evt_kanem_convert',
				label: "Adopter l'islam",
				description:
					"Hummay impose l'islam comme religion officielle, ouvrant le commerce transsaharien.",
				effects: {
					prestigeModifier: 3,
					economicModifier: 2,
					religiousTensionModifier: 3,
				},
			},
			{
				id: 'evt_kanem_tradition',
				label: 'Maintenir les traditions ancestrales',
				description:
					'Refuser la conversion et maintenir les pratiques religieuses traditionnelles du Kanem.',
				effects: {
					stabilityModifier: 1,
					prestigeModifier: -1,
					economicModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Sans Hummay, l'islamisation du Kanem pourrait être plus progressive et moins politique, se diffusant par le commerce plutôt que par décret royal.",
		},
		historical_outcome:
			"La dynastie Sayfawa, fondée par Hummay vers 1085, régnera sur le Kanem-Bornou pendant plus de sept siècles — l'une des plus longues dynasties de l'histoire mondiale. L'islamisation renforce les liens avec le Maghreb et l'Égypte, mais la population rurale conserve longtemps des pratiques syncrétiques.",
		status: 'pending',
	},

	// --- nat_tibet : Renaissance bouddhiste (Rinchen Zangpo) ---
	{
		id: 'evt_tibet_buddhist_renaissance',
		name: 'Renaissance bouddhiste tibétaine',
		description:
			"Après la période de fragmentation qui a suivi l'effondrement de l'Empire tibétain (842), le traducteur Rinchen Zangpo et le roi Yeshe-Ö du Guge lancent un renouveau bouddhiste majeur. Rinchen Zangpo traduit des centaines de textes sanskrits en tibétain et fonde des monastères.",
		type: 'cultural_shift',
		category: 'religious',
		year: 1000,
		yearRange: [985, 1055],
		affectedNationIds: ['nat_tibet'],
		affectedRegionIds: ['clim_tibetan_plateau'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Le royaume de Guge doit être stable et son roi favorable au bouddhisme. Les routes vers le Cachemire et le Népal doivent être praticables.',
		},
		effects: {
			stabilityModifier: 2,
			prestigeModifier: 3,
			customEffect:
				'Construction de monastères à travers le Tibet occidental. Traduction de textes bouddhistes fondamentaux. Invitation du maître indien Atisha (1042).',
		},
		severity: 7,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_tibet_buddhism_support',
				label: 'Soutenir le renouveau bouddhiste',
				description:
					'Financer les traductions et les monastères, renforçant le bouddhisme comme religion nationale.',
				effects: {
					stabilityModifier: 2,
					prestigeModifier: 3,
					economicModifier: -1,
				},
			},
			{
				id: 'evt_tibet_buddhism_restrict',
				label: 'Limiter le pouvoir monastique',
				description:
					'Prévenir une trop grande influence des monastères sur la politique séculière.',
				effects: {
					stabilityModifier: 1,
					religiousTensionModifier: 2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Sans le soutien royal du Guge, le renouveau bouddhiste pourrait être plus lent et se diffuser par les routes commerciales plutôt que par patronage royal.',
		},
		historical_outcome:
			'Rinchen Zangpo (958-1055) traduit plus de 150 textes et fonde 108 monastères. Le maître indien Atisha arrive au Tibet en 1042, lançant la tradition Kadampa. Cette renaissance bouddhiste transforme définitivement la culture tibétaine et pose les bases des grandes écoles (Sakya, Kagyu, Gelug) qui domineront le Tibet pendant des siècles.',
		status: 'pending',
	},

	// --- nat_makuria : Apogée du royaume chrétien de Nubie ---
	{
		id: 'evt_makuria_zenith',
		name: 'Apogée de la Makurie chrétienne',
		description:
			"Le royaume chrétien de Makurie atteint son apogée culturel et politique. La cathédrale de Faras, ornée de fresques remarquables, symbolise cette prospérité. Le Baqt, traité unique avec l'Égypte musulmane, assure la paix depuis le VIIe siècle.",
		type: 'milestone',
		category: 'cultural',
		year: 1000,
		yearRange: [950, 1050],
		affectedNationIds: ['nat_makuria'],
		affectedRegionIds: ['clim_upper_nile'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Le Baqt (traité de non-agression avec les Fatimides) doit être maintenu. La stabilité interne doit être préservée.',
		},
		effects: {
			stabilityModifier: 2,
			prestigeModifier: 2,
			economicModifier: 1,
			customEffect:
				"Floraison artistique (fresques de Faras). Commerce nilotique prospère. Coexistence pacifique avec l'Égypte fatimide via le Baqt.",
		},
		severity: 5,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_makuria_prosperity',
				label: 'Investir dans la culture et le commerce',
				description:
					'Profiter de la paix pour développer les arts, les églises et le commerce nilotique.',
				effects: {
					prestigeModifier: 2,
					economicModifier: 2,
				},
			},
			{
				id: 'evt_makuria_fortify',
				label: 'Renforcer les défenses',
				description:
					"Se préparer à d'éventuelles incursions en fortifiant la frontière nord.",
				effects: {
					militaryModifier: 2,
					economicModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si le Baqt est rompu prématurément, la Makurie pourrait entrer en conflit direct avec les Fatimides dès le XIe siècle.',
		},
		historical_outcome:
			"La Makurie maintient son indépendance chrétienne jusqu'au XIVe siècle, un exploit remarquable face à l'expansion islamique. Les fresques de Faras (redécouvertes en 1961) témoignent d'une riche tradition artistique mêlant influences coptes, byzantines et africaines. Le déclin commence avec les invasions mameloukes au XIIIe siècle.",
		status: 'pending',
	},

	// --- nat_tuareg : Mouvement almoravide et contrôle saharien ---
	{
		id: 'evt_tuareg_saharan_control',
		name: 'Domination touarègue des routes sahariennes',
		description:
			"Les confédérations touarègues consolident leur contrôle sur les routes transsahariennes centrales entre le Sahel et le Maghreb. Les villes-oasis d'Agadez et de Tadmekka deviennent des étapes incontournables du commerce de l'or, du sel et des esclaves.",
		type: 'opportunity',
		category: 'economic',
		year: 1000,
		yearRange: [950, 1050],
		affectedNationIds: ['nat_tuareg'],
		affectedRegionIds: ['clim_central_sahara', 'clim_sahel'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Les confédérations touarègues doivent maintenir le contrôle des puits et oasis le long des routes.',
		},
		effects: {
			economicModifier: 3,
			prestigeModifier: 2,
			customEffect:
				"Contrôle des routes de sel d'Idjil vers le sud. Droits de passage imposés aux caravanes. Tadmekka comme centre de frappe monétaire.",
		},
		severity: 6,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_tuareg_trade_monopoly',
				label: 'Monopoliser les routes',
				description:
					'Imposer des péages élevés et contrôler strictement les passages.',
				effects: {
					economicModifier: 3,
					prestigeModifier: 1,
					stabilityModifier: -1,
				},
			},
			{
				id: 'evt_tuareg_trade_open',
				label: 'Faciliter le commerce',
				description:
					'Réduire les taxes pour encourager un trafic plus important.',
				effects: {
					economicModifier: 2,
					prestigeModifier: 2,
					stabilityModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les Almoravides prennent le contrôle direct des routes occidentales, les Touareg pourraient se replier sur les routes centrales et orientales.',
		},
		historical_outcome:
			"Les Touareg maintiennent leur rôle de gardiens et guides des routes sahariennes pendant des siècles. Tadmekka produit des copies de dinars fatimides en or. L'émergence des Almoravides (1040s) modifie l'équilibre des pouvoirs à l'ouest, mais les Touareg conservent le contrôle des routes centrales.",
		status: 'pending',
	},

	// --- nat_igbo : Royaume sacré de Nri ---
	{
		id: 'evt_nri_kingdom_consolidation',
		name: 'Consolidation du royaume sacré de Nri',
		description:
			"Le royaume de Nri, unique en Afrique par son pouvoir fondé non sur la force militaire mais sur l'autorité rituelle, consolide son influence dans le pays igbo. L'Eze Nri (roi-prêtre) exerce un pouvoir de purification et de résolution des conflits.",
		type: 'milestone',
		category: 'political',
		year: 1000,
		yearRange: [950, 1050],
		affectedNationIds: ['nat_igbo'],
		affectedRegionIds: ['clim_tropical_africa'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"La lignée royale de Nri doit maintenir sa légitimité rituelle. Les communautés environnantes doivent reconnaître l'autorité sacrée de l'Eze Nri.",
		},
		effects: {
			stabilityModifier: 2,
			prestigeModifier: 2,
			customEffect:
				"Extension du système Nri de résolution des conflits. Interdiction rituelle de la violence dans la zone d'influence de Nri. La tradition métallurgique d'Igbo-Ukwu se perpétue.",
		},
		severity: 5,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_nri_ritual_expand',
				label: "Étendre l'autorité rituelle",
				description:
					"Envoyer des agents rituels (osu) dans de nouvelles communautés pour étendre l'influence de Nri.",
				effects: {
					prestigeModifier: 3,
					stabilityModifier: 1,
				},
			},
			{
				id: 'evt_nri_isolate',
				label: 'Préserver la pureté du centre',
				description:
					'Concentrer le pouvoir rituel sur le cœur du territoire Nri.',
				effects: {
					stabilityModifier: 2,
					prestigeModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'autorité rituelle de Nri est contestée, d'autres centres de pouvoir igbo pourraient émerger plus tôt.",
		},
		historical_outcome:
			"Le royaume de Nri existe depuis le Xe siècle et perdure jusqu'en 1911. Les bronzes d'Igbo-Ukwu (IXe-Xe siècle), découverts en 1959, révèlent une métallurgie sophistiquée et des contacts commerciaux lointains. Le système Nri, fondé sur l'autorité religieuse et la résolution pacifique, est un cas unique de gouvernance non-violente en Afrique précoloniale.",
		status: 'pending',
	},

	// --- nat_ainu : Résistance face à l'expansion japonaise ---
	{
		id: 'evt_ainu_emishi_resistance',
		name: 'Résistance aïnoue face au Japon (campagnes Ezo)',
		description:
			"Les Aïnou d'Ezo (Hokkaido) font face à la pression croissante des colons et marchands japonais qui établissent des comptoirs commerciaux sur la côte sud. Les postes de Tsugaru deviennent des points de friction entre les deux cultures.",
		type: 'crisis',
		category: 'military',
		year: 1000,
		yearRange: [980, 1050],
		affectedNationIds: ['nat_ainu'],
		affectedRegionIds: ['clim_hokkaido'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Les marchands japonais doivent avoir établi des comptoirs le long du détroit de Tsugaru. La pression foncière doit avoir créé des tensions.',
		},
		effects: {
			stabilityModifier: -2,
			militaryModifier: 1,
			customEffect:
				'Conflits localisés autour des postes de commerce. Perturbation des circuits de troc traditionnels. Début de la dépendance aux produits japonais (fer, riz, sake).',
		},
		severity: 6,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_ainu_resist',
				label: 'Résister aux empiétements japonais',
				description:
					'Organiser la résistance armée et limiter les contacts commerciaux.',
				effects: {
					militaryModifier: 2,
					economicModifier: -1,
					stabilityModifier: -1,
				},
			},
			{
				id: 'evt_ainu_trade',
				label: 'Négocier des accords commerciaux',
				description:
					'Accepter le commerce avec les Japonais tout en préservant les territoires de chasse et de pêche.',
				effects: {
					economicModifier: 2,
					stabilityModifier: 1,
					prestigeModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si le Japon Heian est trop focalisé sur ses problèmes internes (rivalité Fujiwara), la pression sur les Aïnou pourrait être moindre.',
		},
		historical_outcome:
			"L'expansion japonaise vers le nord reste limitée durant l'époque Heian (794-1185), mais les comptoirs de commerce se multiplient. Les Aïnou maintiennent leur indépendance effective sur Hokkaido jusqu'à l'ère Meiji (1868). La « guerre de Koshamain » (1457) et la « révolte de Shakushain » (1669) seront des soulèvements majeurs ultérieurs.",
		status: 'pending',
	},

	// --- nat_malagasy : Achèvement de la colonisation austronésienne ---
	{
		id: 'evt_madagascar_austronesian_settlement',
		name: 'Établissement des royaumes malgaches',
		description:
			"Vers l'an 1000, la colonisation austronésienne de Madagascar est achevée. Les populations d'origine indonésienne (principalement Bornéo) se mêlent aux migrants bantu d'Afrique de l'Est. Les premiers chefferies organisées émergent sur les côtes.",
		type: 'milestone',
		category: 'cultural',
		year: 1000,
		yearRange: [900, 1100],
		affectedNationIds: ['nat_malagasy'],
		affectedRegionIds: ['clim_madagascar'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"Les communautés côtières doivent être suffisamment établies pour former des entités politiques. Les contacts avec les commerçants arabes et swahilis doivent s'intensifier.",
		},
		effects: {
			stabilityModifier: 2,
			economicModifier: 1,
			customEffect:
				"Formation de chefferies côtières. Développement de la riziculture (technique austronésienne). Début du commerce dans l'océan Indien (avec Kilwa et Zanzibar).",
		},
		severity: 5,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_madagascar_coastal',
				label: 'Développer les ports côtiers',
				description:
					"Se tourner vers le commerce maritime avec l'océan Indien.",
				effects: {
					economicModifier: 2,
					prestigeModifier: 1,
				},
			},
			{
				id: 'evt_madagascar_interior',
				label: "Coloniser l'intérieur des terres",
				description:
					'Développer la riziculture sur les hauts plateaux intérieurs.',
				effects: {
					stabilityModifier: 2,
					populationModifier: 0.05,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les communautés restent fragmentées, l'émergence de royaumes structurés pourrait être retardée.",
		},
		historical_outcome:
			"Les premiers sites archéologiques attestent d'une colonisation austronésienne achevée vers le Xe siècle. Le malgache reste une langue austronésienne (proche du ma'anyan de Bornéo) avec des emprunts bantu. Les royaumes côtiers comme Mahilaka commercent avec le monde swahili. Les royaumes Merina et Sakalava émergeront plus tard sur les hauts plateaux.",
		status: 'pending',
	},

	// --- nat_puebloans : Construction de Pueblo Bonito (Chaco Canyon) ---
	{
		id: 'evt_chaco_canyon_construction',
		name: 'Construction des grandes maisons de Chaco Canyon',
		description:
			'Les Puebloans ancestraux entreprennent la construction des gigantesques « grandes maisons » de Chaco Canyon, dont Pueblo Bonito. Ces structures de plusieurs centaines de pièces servent de centres cérémoniels, astronomiques et de redistribution des ressources.',
		type: 'milestone',
		category: 'cultural',
		year: 1020,
		yearRange: [1000, 1080],
		affectedNationIds: ['nat_puebloans'],
		affectedRegionIds: ['clim_southwest_north_america'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Une période climatique favorable doit permettre une agriculture viable dans le canyon. Un système de routes commerciales régionales doit être en place.',
		},
		effects: {
			stabilityModifier: 2,
			prestigeModifier: 3,
			customEffect:
				'Construction de structures monumentales (Pueblo Bonito : 600+ pièces). Réseau routier reliant les communautés périphériques. Centre de redistribution turquoise et cacao.',
		},
		severity: 7,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_chaco_invest',
				label: 'Investir dans la construction monumentale',
				description:
					"Mobiliser la main-d'œuvre pour ériger de nouvelles grandes maisons.",
				effects: {
					prestigeModifier: 3,
					economicModifier: -1,
				},
			},
			{
				id: 'evt_chaco_distribute',
				label: 'Prioriser les villages périphériques',
				description:
					'Développer le réseau routier et les petites communautés autour du canyon.',
				effects: {
					stabilityModifier: 2,
					economicModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si la sécheresse frappe trop tôt, la construction pourrait être abandonnée et la population dispersée.',
		},
		historical_outcome:
			"Pueblo Bonito, achevé vers 1080, compte plus de 600 pièces et monte jusqu'à quatre étages. Le réseau routier de Chaco s'étend sur 650 km. Des perroquets et du cacao mésoaméricains attestent de contacts commerciaux lointains. Chaco est abandonné vers 1130-1150 suite à une sécheresse prolongée, la population migrant vers Mesa Verde et le Rio Grande.",
		status: 'pending',
	},

	// --- nat_thule : Migration des Thulé vers l'Arctique oriental ---
	{
		id: 'evt_thule_eastward_migration',
		name: 'Migration des Thulé vers le Groenland',
		description:
			"Les Thulé, chasseurs de baleines originaires d'Alaska, achèvent leur migration vers l'est à travers l'Arctique canadien, atteignant le Groenland vers l'an 1000. Leur technologie supérieure (kayak, umiak, traîneau à chiens) leur permet de supplanter les Dorsétiens.",
		type: 'milestone',
		category: 'exploration',
		year: 1000,
		yearRange: [900, 1100],
		affectedNationIds: ['nat_thule'],
		affectedRegionIds: ['clim_arctic'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"L'optimum climatique médiéval doit ouvrir les passages arctiques. Les populations de baleines boréales doivent migrer vers l'est.",
		},
		effects: {
			prestigeModifier: 2,
			militaryModifier: 1,
			customEffect:
				"Expansion territoriale massive à travers l'Arctique. Contact avec les Dorsétiens (qu'ils supplantent). Possible contact avec les colons vikings du Groenland.",
		},
		severity: 7,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_thule_expand_east',
				label: 'Poursuivre la migration vers le Groenland',
				description:
					'Les clans Thulé suivent les baleines vers de nouveaux territoires.',
				effects: {
					prestigeModifier: 2,
					populationModifier: 0.05,
				},
			},
			{
				id: 'evt_thule_consolidate',
				label: 'Consolider les territoires acquis',
				description:
					"Renforcer les camps permanents dans le centre de l'Arctique canadien.",
				effects: {
					stabilityModifier: 2,
					economicModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si le climat se refroidit trop vite, la migration pourrait ralentir. Les Dorsétiens pourraient offrir une résistance plus forte.',
		},
		historical_outcome:
			"Les Thulé atteignent le Groenland vers 1000-1100 et y rencontrent les Vikings norrois. Les preuves archéologiques montrent des échanges (fer viking, ivoire thulé). Les Dorsétiens disparaissent progressivement, absorbés ou supplantés. Les descendants des Thulé sont les Inuit modernes du Canada, du Groenland et de l'Alaska.",
		status: 'pending',
	},

	// --- nat_haida : Florescence culturelle de Haida Gwaii ---
	{
		id: 'evt_haida_cultural_florescence',
		name: 'Florescence culturelle de Haida Gwaii',
		description:
			"Les Haïda de Haida Gwaii (îles de la Reine-Charlotte) connaissent une période d'épanouissement culturel. La richesse en saumon, cèdre et haliotide permet le développement de l'art monumental (totems), des potlatchs élaborés et d'une puissante flotte de canots de guerre.",
		type: 'opportunity',
		category: 'cultural',
		year: 1000,
		yearRange: [950, 1100],
		affectedNationIds: ['nat_haida'],
		affectedRegionIds: ['clim_pacific_northwest'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Les remontées de saumon doivent être abondantes. Les forêts de cèdre doivent être accessibles.',
		},
		effects: {
			economicModifier: 2,
			prestigeModifier: 3,
			customEffect:
				"Développement de l'art du totem et de la sculpture sur cèdre. Expansion des potlatchs comme système de redistribution. Construction de grandes maisons longues cérémonielles.",
		},
		severity: 5,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_haida_potlatch',
				label: 'Organiser de grands potlatchs',
				description:
					'Démontrer la puissance et la richesse du clan par des dons somptueux.',
				effects: {
					prestigeModifier: 3,
					economicModifier: -1,
				},
			},
			{
				id: 'evt_haida_war_canoes',
				label: 'Renforcer la flotte de canots',
				description:
					'Construire des canots de guerre en cèdre pour projeter la puissance haïda sur la côte.',
				effects: {
					militaryModifier: 2,
					prestigeModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si un tremblement de terre ou un tsunami frappe les côtes, la florescence pourrait être interrompue.',
		},
		historical_outcome:
			"Les Haïda deviennent l'un des peuples les plus prospères de la côte nord-ouest Pacifique. Leurs canots de guerre (jusqu'à 20 m) leur permettent de mener des raids jusqu'en Californie. L'art haïda (totems, masques, coffres sculptés) est reconnu comme l'un des sommets de l'art autochtone mondial. Le système de potlatch structure toute la vie sociale jusqu'à son interdiction par le Canada en 1884.",
		status: 'pending',
	},

	// --- nat_sami : Intensification du pastoralisme de renne ---
	{
		id: 'evt_sami_reindeer_pastoralism',
		name: 'Intensification du pastoralisme de renne sami',
		description:
			"Les Samis passent progressivement de la chasse au renne sauvage à un pastoralisme semi-nomade plus structuré. Cette transition, couplée à l'augmentation des contacts commerciaux avec les royaumes scandinaves (fourrures contre fer), transforme leur mode de vie.",
		type: 'cultural_shift',
		category: 'economic',
		year: 1000,
		yearRange: [900, 1100],
		affectedNationIds: ['nat_sami'],
		affectedRegionIds: ['clim_lapland'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Les populations de renne sauvage doivent diminuer ou les contacts scandinaves créer de nouveaux besoins commerciaux.',
		},
		effects: {
			economicModifier: 2,
			stabilityModifier: 1,
			customEffect:
				'Transition vers le pastoralisme semi-nomade. Commerce de fourrures avec les Scandinaves. Pression fiscale croissante des rois norvégiens et suédois (finneskatt).',
		},
		severity: 5,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_sami_pastoralism',
				label: 'Adopter le pastoralisme de renne',
				description:
					'Domestiquer et gérer les troupeaux pour un mode de vie plus stable.',
				effects: {
					economicModifier: 2,
					stabilityModifier: 1,
				},
			},
			{
				id: 'evt_sami_hunting',
				label: 'Maintenir la chasse traditionnelle',
				description:
					'Préserver le mode de vie ancestral de chasse et cueillette.',
				effects: {
					stabilityModifier: 1,
					economicModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les royaumes scandinaves ne taxent pas les Samis, la transition vers le pastoralisme pourrait être plus lente.',
		},
		historical_outcome:
			"La transition vers le pastoralisme de renne s'étale sur plusieurs siècles. Les Samis deviennent les fournisseurs principaux de fourrures pour les marchés scandinaves. La taxation multiple (finneskatt) par les rois de Norvège, Suède et Novgorod devient une source de conflit récurrente. Le joik (chant traditionnel) et le chamanisme sami persistent malgré la christianisation progressive.",
		status: 'pending',
	},

	// --- nat_mapuche : Développement de l'agriculture mapuche ---
	{
		id: 'evt_mapuche_agricultural_expansion',
		name: 'Expansion agricole et consolidation mapuche',
		description:
			'Les Mapuche du centre-sud du Chili développent une agriculture intensive (pommes de terre, maïs, quinoa) dans les vallées fertiles entre les Andes et la côte Pacifique. Les communautés renforcent leur organisation en rewe (alliances de lignages) et ayllarehue (confédérations).',
		type: 'milestone',
		category: 'economic',
		year: 1000,
		yearRange: [900, 1100],
		affectedNationIds: ['nat_mapuche'],
		affectedRegionIds: ['clim_south_america_temperate'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Les conditions climatiques doivent favoriser la culture des vallées. Les forêts mapuches doivent fournir suffisamment de bois pour les construction de rukas.',
		},
		effects: {
			economicModifier: 2,
			populationModifier: 0.05,
			stabilityModifier: 1,
			customEffect:
				"Développement de l'agriculture de vallée. Renforcement des structures confédérales (ayllarehue). Intensification de la céramique et du textile.",
		},
		severity: 5,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_mapuche_agriculture',
				label: "Intensifier l'agriculture",
				description:
					'Défricher de nouvelles vallées et développer les systèmes irrigation rudimentaires.',
				effects: {
					economicModifier: 2,
					populationModifier: 0.05,
				},
			},
			{
				id: 'evt_mapuche_warfare',
				label: 'Renforcer les confédérations guerrières',
				description: 'Prioriser les alliances militaires face aux voisins.',
				effects: {
					militaryModifier: 2,
					stabilityModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si l'Empire inca étend son influence trop au sud, les Mapuche pourraient être forcés à une résistance militaire précoce.",
		},
		historical_outcome:
			"Les Mapuche développent une société décentralisée mais résiliente qui résistera avec succès à l'Empire inca (bataille du Maule, ~1485) puis à l'Empire espagnol (guerre d'Arauco, 1550s-1883). Leur système confédéral flexible, sans roi centralisé, rend la conquête impossible car il n'y a pas de tête à couper.",
		status: 'pending',
	},

	// --- nat_muisca : Cérémonie de El Dorado à Guatavita ---
	{
		id: 'evt_muisca_el_dorado_ceremony',
		name: "Cérémonies d'investiture au lac Guatavita",
		description:
			"Les Muiscas pratiquent leur célèbre rituel d'investiture au lac Guatavita : le nouveau zipa (souverain) est recouvert de poudre d'or et se baigne dans le lac sacré, accompagné d'offrandes d'or et d'émeraudes. Ce rituel sera plus tard à l'origine de la légende d'El Dorado.",
		type: 'cultural_shift',
		category: 'cultural',
		year: 1000,
		yearRange: [900, 1100],
		affectedNationIds: ['nat_muisca'],
		affectedRegionIds: ['clim_colombian_highlands'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"La confédération muisca doit être suffisamment organisée pour maintenir le système d'investiture rituelle. L'extraction d'or et d'émeraudes doit être active.",
		},
		effects: {
			prestigeModifier: 3,
			stabilityModifier: 2,
			customEffect:
				"Renforcement de la légitimité royale par le rituel sacré. Commerce d'or et d'émeraudes avec les voisins. Consolidation de la confédération autour des centres cérémoniels.",
		},
		severity: 6,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_muisca_ceremony_lavish',
				label: 'Cérémonies somptueuses',
				description:
					"Organiser des offrandes massives d'or pour impressionner les vassaux.",
				effects: {
					prestigeModifier: 3,
					economicModifier: -1,
				},
			},
			{
				id: 'evt_muisca_ceremony_modest',
				label: 'Cérémonies modestes',
				description:
					"Réduire les offrandes d'or pour préserver les ressources.",
				effects: {
					prestigeModifier: 1,
					economicModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les mines sont épuisées ou disputées, les cérémonies pourraient devenir moins somptueuses.',
		},
		historical_outcome:
			"Les cérémonies du lac Guatavita sont attestées archéologiquement par le radeau muisca en or (trouvé en 1969, daté entre 600 et 1600). Ce rituel inspirera la légende d'El Dorado qui motivera des centaines d'expéditions espagnoles. Les Muiscas sont les plus grands orfèvres d'Amérique du Sud avec les Quimbayas, et les seuls à utiliser un système d'émeraudes comme quasi-monnaie.",
		status: 'pending',
	},

	// --- nat_guarani : Expansion et migration guarani ---
	{
		id: 'evt_guarani_expansion',
		name: 'Expansion guaranie le long des fleuves',
		description:
			'Les Guaranis poursuivent leur expansion le long des bassins du Paraná et du Paraguay, colonisant de nouvelles terres grâce à leur agriculture itinérante (manioc, maïs) et leur maîtrise de la navigation fluviale. Leur quête mythique de la « Terre sans mal » (Yvy Maraẽy) motive ces migrations.',
		type: 'milestone',
		category: 'exploration',
		year: 1000,
		yearRange: [900, 1100],
		affectedNationIds: ['nat_guarani'],
		affectedRegionIds: ['clim_south_american_subtropical'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Les sols des anciennes zones de culture doivent être épuisés, motivant la recherche de nouvelles terres. Les voies fluviales doivent être praticables.',
		},
		effects: {
			populationModifier: 0.05,
			economicModifier: 1,
			customEffect:
				'Expansion territoriale le long des rivières. Diffusion de la langue tupi-guarani. Essartage (agriculture sur brûlis) de nouvelles parcelles de forêt.',
		},
		severity: 5,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_guarani_migrate',
				label: 'Poursuivre la migration',
				description:
					'Suivre les fleuves vers de nouvelles terres, guidés par la quête de Yvy Maraẽy.',
				effects: {
					populationModifier: 0.05,
					economicModifier: 1,
				},
			},
			{
				id: 'evt_guarani_settle',
				label: 'Consolider les villages existants',
				description:
					'Renforcer les communautés actuelles et développer les réseaux de troc.',
				effects: {
					stabilityModifier: 2,
					economicModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les territoires sont déjà occupés par des peuples hostiles, la migration pourrait être ralentie.',
		},
		historical_outcome:
			"Les Guaranis occupent, à l'arrivée des Européens, un immense territoire allant de l'Amazonie au Rio de la Plata. Leur langue (guarani) est aujourd'hui langue officielle du Paraguay, parlée par 90% de la population. La quête de la « Terre sans mal » reste vivante dans la spiritualité guaranie contemporaine. Leur agriculture du manioc et du maïs influence toute l'Amérique du Sud.",
		status: 'pending',
	},

	// --- nat_hohokam : Expansion du réseau de canaux ---
	{
		id: 'evt_hohokam_canal_expansion',
		name: 'Expansion du réseau de canaux hohokam',
		description:
			"Les Hohokam du sud de l'Arizona étendent leur impressionnant réseau de canaux d'irrigation dans le bassin de la Salt River. Ces canaux, les plus sophistiqués d'Amérique du Nord, permettent de cultiver le désert de Sonora et de supporter une population croissante.",
		type: 'milestone',
		category: 'economic',
		year: 1000,
		yearRange: [900, 1100],
		affectedNationIds: ['nat_hohokam'],
		affectedRegionIds: ['clim_southwest_north_america'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"La population doit être suffisante pour fournir la main-d'œuvre nécessaire au creusement des canaux. Le débit de la Salt River doit être stable.",
		},
		effects: {
			economicModifier: 3,
			populationModifier: 0.05,
			customEffect:
				'Extension du réseau à plus de 500 km de canaux. Développement de la poterie décorée rouge-sur-chamois. Construction de la platform mound de Snaketown.',
		},
		severity: 6,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_hohokam_canals',
				label: 'Étendre le réseau de canaux',
				description:
					'Mobiliser les communautés pour creuser de nouveaux canaux.',
				effects: {
					economicModifier: 3,
					populationModifier: 0.05,
				},
			},
			{
				id: 'evt_hohokam_trade',
				label: 'Développer le commerce mésoaméricain',
				description:
					'Renforcer les liens commerciaux avec les civilisations du sud (coquillages, miroirs de pyrite).',
				effects: {
					economicModifier: 2,
					prestigeModifier: 2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si une crue majeure de la Salt River détruit les canaux, la civilisation hohokam pourrait décliner prématurément.',
		},
		historical_outcome:
			"Le réseau de canaux hohokam atteint plus de 500 km au XIe siècle, irriguant des milliers d'hectares dans le désert de Sonora. Des coquillages du Pacifique, des perroquets et des miroirs de pyrite attestent de contacts avec la Mésoamérique. La civilisation hohokam décline vers 1400, probablement suite à des inondations et sécheresses. Les O'odham (Pima et Papago) modernes sont considérés comme leurs descendants.",
		status: 'pending',
	},

	// --- nat_dorset : Déclin face à la migration thulé ---
	{
		id: 'evt_dorset_thule_contact',
		name: 'Les Dorsétiens face à la migration thulé',
		description:
			"Les Dorsétiens (Tuniit dans la tradition inuit), peuple paléoesquimau vivant dans l'Arctique canadien depuis 2000 ans, font face à l'arrivée des Thulé, technologiquement supérieurs. Sans chiens de traîneau ni kayaks, les Dorsétiens sont progressivement marginalisés.",
		type: 'crisis',
		category: 'military',
		year: 1000,
		yearRange: [900, 1200],
		affectedNationIds: ['nat_dorset'],
		affectedRegionIds: ['clim_arctic', 'clim_subarctic_canada'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"Les Thulé doivent avoir commencé leur migration vers l'est. Les territoires de chasse dorsétiens et thulé doivent se chevaucher.",
		},
		effects: {
			stabilityModifier: -3,
			populationModifier: -0.1,
			customEffect:
				'Perte progressive des territoires de chasse au phoque et au morse. Repli vers les zones les plus isolées (Terre de Baffin, Terre-Neuve).',
		},
		severity: 8,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_dorset_resist',
				label: 'Résister aux Thulé',
				description:
					'Défendre les territoires de chasse traditionnels malgré le désavantage technologique.',
				effects: {
					militaryModifier: 1,
					populationModifier: -0.15,
				},
			},
			{
				id: 'evt_dorset_retreat',
				label: 'Se replier vers des zones isolées',
				description:
					'Abandonner les territoires contestés pour survivre dans les marges.',
				effects: {
					stabilityModifier: -2,
					populationModifier: -0.05,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les Dorsétiens adoptent la technologie thulé (kayak, chiens), ils pourraient survivre comme peuple distinct.',
		},
		historical_outcome:
			"Les Dorsétiens disparaissent vers 1500, remplacés par les Thulé. L'ADN ancien révèle qu'ils formaient une population génétiquement distincte, sans mélange significatif avec les Thulé. Les Inuit les appelaient Tuniit et les décrivaient dans leurs légendes comme des géants timides. Leur art (miniatures en ivoire) est d'une finesse remarquable.",
		status: 'pending',
	},

	// --- nat_dene : Migration dene vers le sud ---
	{
		id: 'evt_dene_southern_migration',
		name: 'Migrations dénées vers le sud',
		description:
			"Des groupes dénés (athapascans) commencent une migration progressive depuis la taïga subarctique vers le sud. Certains groupes atteindront éventuellement le sud-ouest américain (ancêtres des Navajos et Apaches). D'autres restent dans la forêt boréale comme chasseurs-cueilleurs.",
		type: 'milestone',
		category: 'exploration',
		year: 1000,
		yearRange: [800, 1200],
		affectedNationIds: ['nat_dene'],
		affectedRegionIds: ['clim_subarctic_canada'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'La pression démographique ou les changements climatiques doivent motiver la dispersion des groupes dénés.',
		},
		effects: {
			populationModifier: -0.05,
			customEffect:
				"Dispersion des groupes dénés sur un immense territoire. Diversification linguistique. Certains groupes s'adaptent aux Grandes Plaines, d'autres aux déserts du sud-ouest.",
		},
		severity: 6,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_dene_migrate_south',
				label: 'Envoyer des éclaireurs vers le sud',
				description: 'Explorer les territoires au sud de la forêt boréale.',
				effects: {
					prestigeModifier: 1,
					populationModifier: -0.05,
				},
			},
			{
				id: 'evt_dene_stay_boreal',
				label: 'Rester dans la forêt boréale',
				description:
					'Consolider la maîtrise des territoires de chasse actuels.',
				effects: {
					stabilityModifier: 2,
					economicModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les pression Thulé ne se matérialise pas, la migration vers le sud pourrait être plus lente ou ne pas avoir lieu.',
		},
		historical_outcome:
			"La famille linguistique dénée (na-dené/athapascane) est l'une des plus dispersées d'Amérique. Les Navajos et Apaches, arrivés dans le sud-ouest vers 1300-1500, parlent des langues athapascanes. L'ADN et la linguistique confirment leur origine subarctique. Les Dénés restés au nord (Chipewyan, Tłı̨chǫ, Dëne Sųłiné) maintiennent aujourd'hui leur mode de vie dans la forêt boréale.",
		status: 'pending',
	},

	// --- nat_san : Pressions bantoues sur les San ---
	{
		id: 'evt_san_bantu_pressure',
		name: "Les San face à l'expansion bantoue",
		description:
			"Les San (Bochimans), plus anciens habitants d'Afrique australe, font face à l'expansion des peuples bantous (Sotho-Tswana, Nguni) qui occupent progressivement les meilleures terres avec leur agriculture et leur métallurgie. Les San sont repoussés vers les zones les plus arides du Kalahari.",
		type: 'crisis',
		category: 'military',
		year: 1000,
		yearRange: [800, 1200],
		affectedNationIds: ['nat_san'],
		affectedRegionIds: ['clim_kalahari'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"Les peuples bantous doivent avoir atteint l'Afrique australe avec leur agriculture et métallurgie.",
		},
		effects: {
			stabilityModifier: -2,
			populationModifier: -0.1,
			customEffect:
				'Perte progressive des territoires de chasse. Repli vers le Kalahari. Certains groupes San sont absorbés par les sociétés bantoues.',
		},
		severity: 7,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_san_retreat_kalahari',
				label: 'Se replier dans le Kalahari',
				description:
					'Utiliser la connaissance inégalée du désert pour survivre là où les Bantous ne peuvent pas.',
				effects: {
					stabilityModifier: -1,
					populationModifier: -0.1,
				},
			},
			{
				id: 'evt_san_coexist',
				label: 'Chercher la coexistence',
				description:
					'Adapter les pratiques et commercer avec les Bantous (viande contre fer).',
				effects: {
					economicModifier: 1,
					prestigeModifier: -2,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les Bantous avancent plus lentement, les San pourraient coexister plus longtemps dans les zones de transition.',
		},
		historical_outcome:
			"Les San survivent dans le Kalahari grâce à leur connaissance exceptionnelle du désert. Leur art rupestre, le plus ancien du monde (80 000+ ans), cesse progressivement dans les zones bantoues. L'ADN révèle que les San sont l'une des plus anciennes lignées humaines. Aujourd'hui, environ 100 000 San vivent au Botswana, en Namibie et en Afrique du Sud, luttant pour la préservation de leurs terres.",
		status: 'pending',
	},

	// --- nat_mbuti : Contacts avec les cultivateurs bantous ---
	{
		id: 'evt_mbuti_bantu_contact',
		name: 'Intensification des échanges Mbuti-Bantous',
		description:
			"Les Mbuti (Pygmées) de la forêt d'Ituri intensifient leurs échanges avec les peuples bantu agriculteurs installés en lisière de forêt. Un système de troc symbiotique s'établit : viande de chasse, miel et plantes médicinales contre fer, poterie et produits agricoles.",
		type: 'opportunity',
		category: 'economic',
		year: 1000,
		yearRange: [800, 1200],
		affectedNationIds: ['nat_mbuti'],
		affectedRegionIds: ['clim_congo_rainforest'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Les communautés bantoues doivent être installées en bordure de la forêt Ituri. Les Mbuti doivent avoir des surplus de gibier et de miel.',
		},
		effects: {
			economicModifier: 2,
			customEffect:
				'Système de troc établi avec les villages bantous. Accès aux outils en fer. Risque de dépendance économique progressive.',
		},
		severity: 4,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_mbuti_trade',
				label: 'Développer les échanges',
				description:
					'Approfondir le commerce avec les villages bantous en lisière de forêt.',
				effects: {
					economicModifier: 2,
					prestigeModifier: -1,
				},
			},
			{
				id: 'evt_mbuti_isolate',
				label: "Préserver l'isolement forestier",
				description:
					"Limiter les contacts et maintenir l'autonomie de la forêt.",
				effects: {
					stabilityModifier: 2,
					economicModifier: -1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si les Bantous n'atteignent pas l'Ituri, les Mbuti restent totalement autonomes.",
		},
		historical_outcome:
			"Les Mbuti développent un système complexe de relations avec les villageois bantous, chaque groupe Mbuti étant associé à un village partenaire. Les anthropologues (Colin Turnbull, 1961) documenteront cette relation. Les Mbuti préservent leur mode de vie de chasseurs-cueilleurs jusqu'au XXe siècle, mais la déforestation et les conflits du Congo menacent aujourd'hui leur survie.",
		status: 'pending',
	},

	// --- nat_papuan : Intensification agricole des Hautes-Terres ---
	{
		id: 'evt_papuan_highland_agriculture',
		name: 'Intensification agricole des Hautes-Terres de Papouasie',
		description:
			'Les peuples des Hautes-Terres de Nouvelle-Guinée perfectionnent leur système agricole unique basé sur la patate douce (introduite depuis la Polynésie) et le taro. Les techniques de drainage des marais et de culture en buttes permettent de nourrir des populations denses à haute altitude.',
		type: 'milestone',
		category: 'economic',
		year: 1000,
		yearRange: [800, 1200],
		affectedNationIds: ['nat_papuan'],
		affectedRegionIds: ['clim_new_guinea'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'La patate douce doit être diffusée à travers les Hautes-Terres. Les techniques de drainage doivent être maîtrisées.',
		},
		effects: {
			populationModifier: 0.1,
			economicModifier: 2,
			customEffect:
				'Croissance démographique dans les vallées drainées. Développement de systèmes complexes de redistribution (moka). Intensification des conflits ritualisés entre clans.',
		},
		severity: 5,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_papuan_agriculture',
				label: 'Drainer de nouvelles vallées',
				description:
					'Étendre les zones cultivables par le drainage des marais.',
				effects: {
					economicModifier: 2,
					populationModifier: 0.1,
				},
			},
			{
				id: 'evt_papuan_pigs',
				label: "Développer l'élevage porcin",
				description:
					"Augmenter les troupeaux de porcs, monnaie d'échange sociale.",
				effects: {
					prestigeModifier: 2,
					economicModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si la patate douce ne se diffuse pas, la population reste plus faible et dépendante du taro.',
		},
		historical_outcome:
			"Les Hautes-Terres de Nouvelle-Guinée sont l'un des sites indépendants d'invention de l'agriculture (il y a 7000 ans, site de Kuk). La patate douce, introduite entre 1000 et 1600, provoque une révolution agricole. Au contact européen (années 1930), les Hautes-Terres abritent environ un million de personnes dans des sociétés complexes sans écriture ni État. Le système d'échange moka rivalise en complexité avec les potlatchs de la côte nord-ouest.",
		status: 'pending',
	},

	// --- nat_fiji : Développement des chefferies fidjiennes ---
	{
		id: 'evt_fiji_chieftaincy_development',
		name: 'Émergence des grandes chefferies fidjiennes',
		description:
			"Les communautés fidjiennes développent un système de chefferies complexes avec des hiérarchies sociales définies. La construction de bure (maisons cérémonielles) et de fortifications (ring-ditch forts) témoigne d'une société de plus en plus stratifiée et belliqueuse.",
		type: 'political',
		category: 'political',
		year: 1000,
		yearRange: [900, 1200],
		affectedNationIds: ['nat_fiji'],
		affectedRegionIds: ['clim_fiji'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'La population doit avoir atteint une masse critique suffisante pour justifier une organisation politique plus élaborée.',
		},
		effects: {
			stabilityModifier: 1,
			militaryModifier: 2,
			customEffect:
				'Construction de fortifications en fossés circulaires. Développement du cannibalisme rituel comme institution politique. Réseau de commerce inter-insulaire.',
		},
		severity: 5,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_fiji_centralize',
				label: 'Centraliser le pouvoir',
				description:
					"Renforcer l'autorité du chef suprême sur les villages vassaux.",
				effects: {
					stabilityModifier: 1,
					prestigeModifier: 2,
				},
			},
			{
				id: 'evt_fiji_warfare',
				label: 'Intensifier les raids inter-insulaires',
				description:
					'Construire des drua (grands canoës doubles) et raider les îles voisines.',
				effects: {
					militaryModifier: 2,
					economicModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si un tsunami ou un cyclone dévaste les côtes, la centralisation politique pourrait être retardée.',
		},
		historical_outcome:
			"Les Fidji développent parmi les sociétés les plus complexes du Pacifique, avec des chefferies rivales, une agriculture intensive (terrasses) et une navigation inter-insulaire sophistiquée. Les drua (canoës doubles) sont les plus grands du Pacifique. Le cannibalisme rituel reste pratiqué jusqu'au contact européen. La confédération de Bau dominera les Fidji à partir du XVIIIe siècle.",
		status: 'pending',
	},

	// --- nat_chamorro : Culture des latte stones ---
	{
		id: 'evt_chamorro_latte_period',
		name: 'Période Latte des Chamorro',
		description:
			"Les Chamorro des îles Mariannes entrent dans la période Latte, caractérisée par la construction de maisons sur des piliers en pierre calcaire (latte stones). Ces structures monumentales, uniques dans le Pacifique, témoignent d'une société hiérarchisée et d'une expertise architecturale remarquable.",
		type: 'milestone',
		category: 'cultural',
		year: 1000,
		yearRange: [900, 1100],
		affectedNationIds: ['nat_chamorro'],
		affectedRegionIds: ['clim_mariana_islands'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				"La population chamorro doit être suffisante pour mobiliser la main-d'œuvre nécessaire au taillage et au transport des pierres.",
		},
		effects: {
			prestigeModifier: 2,
			stabilityModifier: 1,
			customEffect:
				"Construction de maisons monumentales sur piliers en corail. Développement d'un système de caste (chamorri/manachang). Pêche hauturière avec pirogues à balancier (proa).",
		},
		severity: 5,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_chamorro_build',
				label: 'Construire des structures latte plus grandes',
				description:
					'Mobiliser les matachang (classe inférieure) pour ériger des piliers monumentaux.',
				effects: {
					prestigeModifier: 3,
					economicModifier: -1,
				},
			},
			{
				id: 'evt_chamorro_seafaring',
				label: 'Développer la navigation hauturière',
				description:
					'Construire des proa (pirogues rapides) pour le commerce et la pêche.',
				effects: {
					economicModifier: 2,
					prestigeModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si un typhon majeur détruit les structures, la tradition latte pourrait évoluer vers des maisons plus modestes.',
		},
		historical_outcome:
			'La période Latte (900-1668) voit les Chamorro construire des centaines de structures sur piliers en pierre corallienne, certaines dépassant 5 mètres. Magellan sera le premier Européen à les rencontrer (1521). La colonisation espagnole (1668) et les guerres chamorro (1670-1695) détruiront presque entièrement la culture chamorro, la population passant de 50 000 à moins de 5000.',
		status: 'pending',
	},

	// --- nat_guanche : Les Guanches isolés des Canaries ---
	{
		id: 'evt_guanche_isolation',
		name: 'Isolement millénaire des Guanches',
		description:
			"Les Guanches des îles Canaries vivent dans un isolement total depuis plus d'un millénaire après avoir perdu l'art de la navigation. D'origine berbère, ils ont développé une culture unique adaptée au volcanisme insulaire : momification des morts, écriture libyco-berbère, et agriculture de l'orge.",
		type: 'cultural_shift',
		category: 'cultural',
		year: 1000,
		yearRange: [800, 1200],
		affectedNationIds: ['nat_guanche'],
		affectedRegionIds: ['clim_canary_islands'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Aucun contact extérieur ne doit avoir lieu. Les communautés de chaque île doivent évoluer indépendamment.',
		},
		effects: {
			stabilityModifier: 2,
			customEffect:
				"Développement autonome de chaque île. Pratiques de momification uniques. Culture du gofio (farine d'orge grillée). Chaque île développe un dialecte distinct.",
		},
		severity: 3,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_guanche_agriculture',
				label: "Intensifier l'agriculture",
				description:
					"Développer la culture de l'orge et l'élevage caprin sur les terrasses volcaniques.",
				effects: {
					economicModifier: 1,
					populationModifier: 0.03,
				},
			},
			{
				id: 'evt_guanche_spiritual',
				label: 'Renforcer les pratiques rituelles',
				description:
					'Consacrer plus de ressources aux rites funéraires et au culte du Teide.',
				effects: {
					stabilityModifier: 2,
					prestigeModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				"Si des marins arabes ou génois atteignent les Canaries avant la date historique, l'isolement prend fin plus tôt.",
		},
		historical_outcome:
			"Les Guanches vivent en autarcie totale jusqu'à la redécouverte des Canaries par les Génois (1312) et les Portugais (1340s). La conquête espagnole (1402-1496) entraîne l'extinction quasi-complète de la culture guanche. Leur pratique de momification, similaire à celle de l'Égypte ancienne, fascine les savants. L'ADN moderne révèle qu'environ 15-25% du patrimoine génétique canarien est d'origine guanche.",
		status: 'pending',
	},

	// --- nat_chukchi : Expansion maritime des chasseurs de morse ---
	{
		id: 'evt_chukchi_maritime_expansion',
		name: 'Expansion maritime des Tchouktches',
		description:
			"Les Tchouktches maritimes (Anqallyt) développent une culture de chasse au morse et à la baleine sur les côtes de la mer de Béring et de l'océan Arctique. Leurs embarcations en peau de morse (angyapik) leur permettent de naviguer dans les eaux glacées et de commercer avec l'Alaska.",
		type: 'opportunity',
		category: 'economic',
		year: 1000,
		yearRange: [900, 1100],
		affectedNationIds: ['nat_chukchi'],
		affectedRegionIds: ['clim_chukotka'],
		globalEvent: false,
		triggerConditions: {
			customCondition:
				'Les populations de morses et de baleines doivent être suffisantes dans les eaux de Béring.',
		},
		effects: {
			economicModifier: 2,
			customEffect:
				"Développement de la chasse au morse et à la baleine. Commerce d'ivoire de morse avec l'Alaska (Yupik) et la Sibérie. Expansion le long des côtes arctiques.",
		},
		severity: 4,
		visibility: 'national',
		playerChoices: [
			{
				id: 'evt_chukchi_maritime',
				label: 'Développer la chasse maritime',
				description:
					'Investir dans les techniques de chasse au morse et à la baleine.',
				effects: {
					economicModifier: 2,
					militaryModifier: 1,
				},
			},
			{
				id: 'evt_chukchi_reindeer',
				label: 'Développer le pastoralisme de renne',
				description:
					'Les Tchouktches terrestres (Chauchu) se concentrent sur les troupeaux de rennes.',
				effects: {
					stabilityModifier: 2,
					economicModifier: 1,
				},
			},
		],
		gmOverrideOptions: {
			canForce: true,
			canModify: true,
			canCancel: true,
			suggestedAlternative:
				'Si les routes maritimes sont bloquées par les glaces, les Tchouktches se concentrent sur le pastoralisme terrestre.',
		},
		historical_outcome:
			'Les Tchouktches deviennent les maîtres incontestés de la Tchoukotka, divisés entre maritimes (chasseurs de mammifères marins) et terrestres (éleveurs de rennes). Ils seront le seul peuple sibérien à résister avec succès à la conquête russe, repoussant les Cosaques à plusieurs reprises (1729-1764). Un traité de paix est finalement signé en 1778, reconnaissant de facto leur indépendance.',
		status: 'pending',
	},
]
