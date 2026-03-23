import type { DailyLife } from '../../../shared/src/types/world'

// ============================================================================
// Vie quotidienne par nation et classe sociale — An 1000
// Classes principales : nobility, clergy, merchants, artisans, free_peasants,
//                        serfs, slaves, nomads, warriors
// ============================================================================

export const dailyLifeData: DailyLife[] = [
	// ========================================================================
	// SAINT-EMPIRE ROMAIN GERMANIQUE
	// ========================================================================
	{
		nationId: 'nat_hre',
		socialClass: 'nobility',
		typicalDiet: [
			'bread',
			'pork',
			'venison',
			'beer',
			'wine',
			'cheese',
			'turnips',
		],
		housing: 'Stone keep or timber manor',
		clothing: 'Woolen tunic and cloak, leather boots, fur-trimmed surcoat',
		workType: 'Estate management, military obligations, court attendance',
		leisureActivities: [
			'hunting',
			'falconry',
			'feasting',
			'chess',
			'tournaments',
		],
		averageIncome: 500,
		qualityOfLife: 8,
	},
	{
		nationId: 'nat_hre',
		socialClass: 'free_peasants',
		typicalDiet: [
			'rye_bread',
			'porridge',
			'cabbage',
			'turnips',
			'beer',
			'occasional_pork',
		],
		housing: 'Timber-frame hut with thatched roof',
		clothing: 'Rough woolen tunic, linen undershirt, leather shoes',
		workType: 'Farming cereals and livestock',
		leisureActivities: ['festivals', 'tavern', 'folk_music', 'wrestling'],
		averageIncome: 15,
		qualityOfLife: 3,
	},
	{
		nationId: 'nat_hre',
		socialClass: 'serfs',
		typicalDiet: ['rye_bread', 'porridge', 'cabbage', 'onions', 'water'],
		housing: 'One-room wattle-and-daub hut',
		clothing: 'Rough wool tunic, wooden clogs',
		workType: 'Bound labor on lords estate, three days per week',
		leisureActivities: ['church_festivals', 'folk_songs', 'dice'],
		averageIncome: 5,
		qualityOfLife: 2,
	},
	{
		nationId: 'nat_hre',
		socialClass: 'clergy',
		typicalDiet: ['bread', 'fish', 'vegetables', 'beer', 'wine', 'cheese'],
		housing: 'Monastery cell or church rectory',
		clothing: 'Black or brown habit, sandals',
		workType: 'Prayer, manuscript copying, teaching, estate management',
		leisureActivities: ['choral_singing', 'reading', 'gardening', 'debate'],
		averageIncome: 50,
		qualityOfLife: 6,
	},

	// ========================================================================
	// FRANCE
	// ========================================================================
	{
		nationId: 'nat_france',
		socialClass: 'nobility',
		typicalDiet: ['white_bread', 'venison', 'pork', 'wine', 'cheese', 'fruits'],
		housing: 'Stone castle or fortified manor',
		clothing: 'Fine wool tunic, silk-trimmed cloak, leather boots',
		workType: 'Feudal governance, warfare, court politics',
		leisureActivities: [
			'hunting',
			'falconry',
			'tournaments',
			'troubadour_poetry',
		],
		averageIncome: 450,
		qualityOfLife: 8,
	},
	{
		nationId: 'nat_france',
		socialClass: 'serfs',
		typicalDiet: ['dark_bread', 'vegetable_pottage', 'onions', 'water'],
		housing: 'Wattle-and-daub hut',
		clothing: 'Coarse wool tunic, hemp shirt',
		workType: 'Bound labor: plowing, harvesting, corvée',
		leisureActivities: ['church_festivals', 'folk_dancing', 'dice'],
		averageIncome: 4,
		qualityOfLife: 2,
	},
	{
		nationId: 'nat_france',
		socialClass: 'clergy',
		typicalDiet: ['bread', 'fish', 'vegetables', 'wine', 'cheese'],
		housing: 'Abbey or parish house',
		clothing: 'Religious habit, woolen cloak',
		workType: 'Liturgy, manuscript illumination, teaching',
		leisureActivities: [
			'choral_singing',
			'garden_tending',
			'theological_debate',
		],
		averageIncome: 40,
		qualityOfLife: 6,
	},

	// ========================================================================
	// ANGLETERRE
	// ========================================================================
	{
		nationId: 'nat_england',
		socialClass: 'nobility',
		typicalDiet: ['bread', 'beef', 'mutton', 'ale', 'mead', 'cheese', 'fish'],
		housing: 'Timber hall with stone footings',
		clothing: 'Embroidered wool tunic, gold brooches, fur-lined cloak',
		workType: 'Shire governance, military service, estate management',
		leisureActivities: ['hunting', 'feasting', 'storytelling', 'riddle_games'],
		averageIncome: 400,
		qualityOfLife: 7,
	},
	{
		nationId: 'nat_england',
		socialClass: 'free_peasants',
		typicalDiet: [
			'barley_bread',
			'pottage',
			'ale',
			'cheese',
			'occasional_bacon',
		],
		housing: 'Timber longhouse shared with livestock',
		clothing: 'Woolen tunic, linen undershirt, leather shoes',
		workType: 'Farming grain and sheep husbandry',
		leisureActivities: ['ale_house', 'wrestling', 'festivals', 'archery'],
		averageIncome: 18,
		qualityOfLife: 3,
	},

	// ========================================================================
	// ÉCOSSE
	// ========================================================================
	{
		nationId: 'nat_scotland',
		socialClass: 'warriors',
		typicalDiet: ['oat_porridge', 'barley_bread', 'beef', 'fish', 'ale'],
		housing: 'Stone roundhouse or crannog',
		clothing: 'Wool plaid cloak, leather jerkin, hide boots',
		workType: 'Clan warfare, cattle herding, raiding',
		leisureActivities: [
			'storytelling',
			'wrestling',
			'caber_tossing',
			'feasting',
		],
		averageIncome: 30,
		qualityOfLife: 4,
	},
	{
		nationId: 'nat_scotland',
		socialClass: 'free_peasants',
		typicalDiet: ['oat_porridge', 'barley_bread', 'turnips', 'fish', 'ale'],
		housing: 'Stone-and-turf hut',
		clothing: 'Rough wool garments, leather leggings',
		workType: 'Farming oats, fishing, livestock tending',
		leisureActivities: ['ceilidh_music', 'storytelling', 'wrestling'],
		averageIncome: 10,
		qualityOfLife: 3,
	},

	// ========================================================================
	// ÉTATS PONTIFICAUX
	// ========================================================================
	{
		nationId: 'nat_papal',
		socialClass: 'clergy',
		typicalDiet: ['bread', 'fish', 'olive_oil', 'wine', 'vegetables', 'cheese'],
		housing: 'Stone monastery or Vatican quarters',
		clothing: 'Elaborate vestments, silk stoles, cassock',
		workType: 'Papal administration, theological scholarship, diplomacy',
		leisureActivities: ['choral_singing', 'theological_debate', 'pilgrimage'],
		averageIncome: 200,
		qualityOfLife: 8,
	},
	{
		nationId: 'nat_papal',
		socialClass: 'merchants',
		typicalDiet: ['bread', 'meat', 'olive_oil', 'wine', 'fruits', 'cheese'],
		housing: 'Stone townhouse in Rome',
		clothing: 'Fine linen tunic, leather belt, woolen cloak',
		workType: 'Trade in religious artefacts, banking, provisioning',
		leisureActivities: ['feasting', 'horse_racing', 'dice', 'theatre'],
		averageIncome: 150,
		qualityOfLife: 7,
	},

	// ========================================================================
	// VENISE
	// ========================================================================
	{
		nationId: 'nat_venice',
		socialClass: 'merchants',
		typicalDiet: ['bread', 'seafood', 'rice', 'spices', 'wine', 'olive_oil'],
		housing: 'Brick palazzo on the lagoon with canal access',
		clothing: 'Rich silk robes, velvet cap, gold jewelry',
		workType: 'Maritime trade, shipping, banking, glass manufacturing',
		leisureActivities: ['regattas', 'theatre', 'music', 'gambling', 'feasts'],
		averageIncome: 600,
		qualityOfLife: 9,
	},
	{
		nationId: 'nat_venice',
		socialClass: 'artisans',
		typicalDiet: ['bread', 'fish', 'polenta', 'wine', 'vegetables'],
		housing: 'Small brick house in craft quarter',
		clothing: 'Linen tunic, leather apron, wool cloak',
		workType: 'Glassblowing, shipbuilding, weaving, metalwork',
		leisureActivities: ['festivals', 'tavern', 'music', 'regattas'],
		averageIncome: 60,
		qualityOfLife: 5,
	},

	// ========================================================================
	// LÉON
	// ========================================================================
	{
		nationId: 'nat_leon',
		socialClass: 'warriors',
		typicalDiet: ['bread', 'mutton', 'cheese', 'wine', 'beans', 'garlic'],
		housing: 'Fortified farmstead or frontier tower',
		clothing: 'Chainmail, leather jerkin, woolen tunic, boots',
		workType: 'Border defense against Moors, raiding, garrison duty',
		leisureActivities: ['jousting', 'storytelling', 'hunting', 'feasting'],
		averageIncome: 50,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_leon',
		socialClass: 'free_peasants',
		typicalDiet: ['bread', 'beans', 'garlic', 'onions', 'wine', 'cheese'],
		housing: 'Stone or adobe farmhouse',
		clothing: 'Rough linen tunic, leather sandals',
		workType: 'Farming wheat, tending sheep and goats',
		leisureActivities: ['fiestas', 'pilgrimage', 'folk_music', 'dancing'],
		averageIncome: 15,
		qualityOfLife: 3,
	},

	// ========================================================================
	// NAVARRE
	// ========================================================================
	{
		nationId: 'nat_navarre',
		socialClass: 'free_peasants',
		typicalDiet: ['bread', 'sheep_cheese', 'beans', 'wine', 'pork'],
		housing: 'Stone mountain farmhouse',
		clothing: 'Rough wool garments, leather boots, beret',
		workType: 'Pastoral farming, transhumance, terraced agriculture',
		leisureActivities: ['folk_dancing', 'pelota', 'festivals', 'singing'],
		averageIncome: 14,
		qualityOfLife: 4,
	},

	// ========================================================================
	// CALIFAT DE CORDOUE
	// ========================================================================
	{
		nationId: 'nat_cordoba',
		socialClass: 'nobility',
		typicalDiet: [
			'lamb',
			'rice',
			'saffron',
			'citrus_fruits',
			'almonds',
			'honey',
			'sherbet',
		],
		housing: 'Palatial estate with courtyard garden and fountains',
		clothing: 'Silk robes, embroidered tunics, turbans, jeweled slippers',
		workType: 'Court administration, poetry, learned patronage',
		leisureActivities: [
			'poetry_recitals',
			'chess',
			'falconry',
			'garden_walks',
			'music',
		],
		averageIncome: 700,
		qualityOfLife: 9,
	},
	{
		nationId: 'nat_cordoba',
		socialClass: 'merchants',
		typicalDiet: ['bread', 'lamb', 'dates', 'olive_oil', 'fruits', 'sherbet'],
		housing: 'Whitewashed stone house with inner courtyard',
		clothing: 'Fine cotton tunic, turban or cap, leather slippers',
		workType: 'Silk trade, leather goods, ceramics, long-distance commerce',
		leisureActivities: ['baths', 'chess', 'storytelling', 'market_socializing'],
		averageIncome: 250,
		qualityOfLife: 7,
	},
	{
		nationId: 'nat_cordoba',
		socialClass: 'artisans',
		typicalDiet: ['bread', 'vegetables', 'olive_oil', 'dried_fruits', 'water'],
		housing: 'Attached house in craft quarter (suq)',
		clothing: 'Cotton tunic, leather apron, sandals',
		workType: 'Ceramic tilework, leatherwork, metalwork, silk weaving',
		leisureActivities: ['baths', 'storytelling', 'festivals', 'music'],
		averageIncome: 50,
		qualityOfLife: 5,
	},

	// ========================================================================
	// DANEMARK
	// ========================================================================
	{
		nationId: 'nat_denmark',
		socialClass: 'warriors',
		typicalDiet: ['bread', 'smoked_fish', 'pork', 'mead', 'ale', 'butter'],
		housing: 'Timber longhouse',
		clothing: 'Wool tunic, chainmail, fur cloak, leather boots',
		workType: 'Raiding, mercenary service, ship maintenance, trading',
		leisureActivities: ['sagas', 'board_games', 'feasting', 'weapon_practice'],
		averageIncome: 45,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_denmark',
		socialClass: 'free_peasants',
		typicalDiet: [
			'barley_bread',
			'salted_fish',
			'butter',
			'ale',
			'root_vegetables',
		],
		housing: 'Timber longhouse shared with livestock',
		clothing: 'Wool tunic, linen undershirt, leather shoes',
		workType: 'Farming barley and rye, fishing, animal husbandry',
		leisureActivities: ['sagas', 'ale_gathering', 'board_games', 'festivals'],
		averageIncome: 15,
		qualityOfLife: 3,
	},

	// ========================================================================
	// NORVÈGE
	// ========================================================================
	{
		nationId: 'nat_norway',
		socialClass: 'warriors',
		typicalDiet: [
			'bread',
			'dried_fish',
			'whale_meat',
			'mead',
			'butter',
			'berries',
		],
		housing: 'Timber longhouse near fjord',
		clothing: 'Wool tunic, chainmail, heavy fur cloak, sealskin boots',
		workType: 'Seafaring, raiding, trading, seasonal fishing',
		leisureActivities: ['sagas', 'chess', 'swimming', 'weapon_practice'],
		averageIncome: 40,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_norway',
		socialClass: 'free_peasants',
		typicalDiet: ['flatbread', 'dried_fish', 'butter', 'skyr', 'berries'],
		housing: 'Turf-roofed timber farmhouse',
		clothing: 'Heavy wool garments, fur-lined cloak',
		workType: 'Fjord fishing, sheep herding, small-scale farming',
		leisureActivities: ['sagas', 'skiing', 'feasts', 'board_games'],
		averageIncome: 12,
		qualityOfLife: 3,
	},

	// ========================================================================
	// SUÈDE
	// ========================================================================
	{
		nationId: 'nat_sweden',
		socialClass: 'free_peasants',
		typicalDiet: [
			'barley_bread',
			'salted_fish',
			'butter',
			'ale',
			'root_vegetables',
		],
		housing: 'Timber longhouse',
		clothing: 'Wool tunic, fur-lined cloak, leather boots',
		workType: 'Farming barley, iron extraction, fur trapping',
		leisureActivities: ['sagas', 'board_games', 'blót_festivals'],
		averageIncome: 12,
		qualityOfLife: 3,
	},

	// ========================================================================
	// POLOGNE
	// ========================================================================
	{
		nationId: 'nat_poland',
		socialClass: 'nobility',
		typicalDiet: ['bread', 'pork', 'game', 'mead', 'cabbage', 'mushrooms'],
		housing: 'Timber stronghold (gród)',
		clothing: 'Fine wool tunic, fur-trimmed cloak, leather boots',
		workType: 'Military leadership, land administration, court duties',
		leisureActivities: ['hunting', 'feasting', 'horseback_riding', 'chess'],
		averageIncome: 300,
		qualityOfLife: 7,
	},
	{
		nationId: 'nat_poland',
		socialClass: 'free_peasants',
		typicalDiet: ['rye_bread', 'cabbage', 'beet_soup', 'mead', 'mushrooms'],
		housing: 'Timber hut with thatched roof',
		clothing: 'Linen tunic, wool cloak, leather sandals',
		workType: 'Farming rye and wheat, beekeeping',
		leisureActivities: ['festivals', 'folk_dancing', 'storytelling'],
		averageIncome: 12,
		qualityOfLife: 3,
	},

	// ========================================================================
	// HONGRIE
	// ========================================================================
	{
		nationId: 'nat_hungary',
		socialClass: 'warriors',
		typicalDiet: ['bread', 'beef', 'horse_milk', 'stew', 'wine'],
		housing: 'Timber-stone manor or felt tent',
		clothing: 'Leather armor, fur-trimmed tunic, riding boots',
		workType: 'Cavalry warfare, border defense, horse breeding',
		leisureActivities: ['horseback_archery', 'hunting', 'feasting', 'music'],
		averageIncome: 50,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_hungary',
		socialClass: 'free_peasants',
		typicalDiet: ['bread', 'cabbage', 'pork', 'onions', 'water'],
		housing: 'Adobe or timber hut',
		clothing: 'Linen shirt, wool trousers, leather boots',
		workType: 'Farming wheat, vineyards, animal husbandry',
		leisureActivities: ['folk_dancing', 'festivals', 'music'],
		averageIncome: 13,
		qualityOfLife: 3,
	},

	// ========================================================================
	// RUS' DE KIEV
	// ========================================================================
	{
		nationId: 'nat_kievan_rus',
		socialClass: 'nobility',
		typicalDiet: [
			'bread',
			'game',
			'fish',
			'mead',
			'honey',
			'kvas',
			'mushrooms',
		],
		housing: 'Wooden palace compound (terem)',
		clothing: 'Silk caftan, fur-trimmed cloak, gold ornaments, leather boots',
		workType: 'Military command, trade route control, tribute collection',
		leisureActivities: ['hunting', 'feasting', 'byliny_recitation', 'chess'],
		averageIncome: 400,
		qualityOfLife: 7,
	},
	{
		nationId: 'nat_kievan_rus',
		socialClass: 'merchants',
		typicalDiet: ['bread', 'fish', 'honey', 'kvas', 'cabbage', 'dried_fruits'],
		housing: 'Timber townhouse in major trading post',
		clothing: 'Wool caftan, leather belt, fur hat',
		workType: 'River trade in furs, wax, honey, and slaves',
		leisureActivities: ['tavern', 'market_socializing', 'byliny', 'dice'],
		averageIncome: 120,
		qualityOfLife: 6,
	},
	{
		nationId: 'nat_kievan_rus',
		socialClass: 'free_peasants',
		typicalDiet: ['rye_bread', 'cabbage_soup', 'porridge', 'kvas', 'mushrooms'],
		housing: 'Semi-dugout timber hut (zemlyanka)',
		clothing: 'Linen shirt, woolen coat, bast shoes (lapti)',
		workType: 'Slash-and-burn farming, beekeeping, fishing',
		leisureActivities: ['folk_songs', 'festivals', 'banya'],
		averageIncome: 10,
		qualityOfLife: 3,
	},

	// ========================================================================
	// BULGARIE DE LA VOLGA
	// ========================================================================
	{
		nationId: 'nat_volga_bulgaria',
		socialClass: 'merchants',
		typicalDiet: ['bread', 'mutton', 'dried_fish', 'honey', 'kumis'],
		housing: 'Timber trading house in Bolghar',
		clothing: 'Cotton tunic, fur-trimmed coat, leather boots',
		workType: 'Fur trade, transit commerce between East and West',
		leisureActivities: ['storytelling', 'chess', 'market_festivals'],
		averageIncome: 100,
		qualityOfLife: 6,
	},

	// ========================================================================
	// CROATIE
	// ========================================================================
	{
		nationId: 'nat_croatia',
		socialClass: 'free_peasants',
		typicalDiet: ['bread', 'fish', 'olive_oil', 'wine', 'cheese', 'vegetables'],
		housing: 'Stone or lime farmhouse',
		clothing: 'Wool tunic, linen undershirt, leather sandals',
		workType: 'Farming, fishing, olive and grape cultivation',
		leisureActivities: ['folk_singing', 'festivals', 'horse_riding'],
		averageIncome: 15,
		qualityOfLife: 4,
	},

	// ========================================================================
	// EMPIRE BYZANTIN
	// ========================================================================
	{
		nationId: 'nat_byzantine',
		socialClass: 'nobility',
		typicalDiet: [
			'white_bread',
			'lamb',
			'fish',
			'wine',
			'olive_oil',
			'spices',
			'fruits',
			'honey',
		],
		housing: 'Stone palace in Constantinople with mosaics and gardens',
		clothing: 'Silk dalmatic, purple-dyed cloak, gold jewelry, silk slippers',
		workType: 'Imperial administration, military command, court intrigue',
		leisureActivities: [
			'chariot_racing',
			'theological_debate',
			'banquets',
			'hunting',
			'music',
		],
		averageIncome: 800,
		qualityOfLife: 9,
	},
	{
		nationId: 'nat_byzantine',
		socialClass: 'merchants',
		typicalDiet: ['bread', 'fish', 'olive_oil', 'wine', 'cheese', 'vegetables'],
		housing: 'Multi-story stone house near the agora',
		clothing: 'Fine linen tunic, silk trim, leather boots',
		workType: 'Silk trade, spice import, banking, guild activities',
		leisureActivities: ['baths', 'chariot_racing', 'feasts', 'tavern'],
		averageIncome: 300,
		qualityOfLife: 7,
	},
	{
		nationId: 'nat_byzantine',
		socialClass: 'free_peasants',
		typicalDiet: [
			'bread',
			'lentils',
			'olive_oil',
			'cheese',
			'wine',
			'vegetables',
		],
		housing: 'Stone or mud-brick farmhouse',
		clothing: 'Linen tunic, wool cloak, leather sandals',
		workType: 'Farming wheat, olive and grape cultivation',
		leisureActivities: ['church_festivals', 'folk_music', 'tavern'],
		averageIncome: 20,
		qualityOfLife: 4,
	},

	// ========================================================================
	// CALIFAT FATIMIDE
	// ========================================================================
	{
		nationId: 'nat_fatimid',
		socialClass: 'nobility',
		typicalDiet: [
			'lamb',
			'rice',
			'dates',
			'honey',
			'sherbet',
			'spiced_fruits',
			'flatbread',
		],
		housing: 'Palatial residence in Cairo with courtyard and fountains',
		clothing: 'Silk robes, gold-embroidered turban, jeweled sandals',
		workType: 'Caliphal administration, religious leadership, military command',
		leisureActivities: [
			'poetry',
			'chess',
			'garden_walks',
			'astronomy',
			'music',
		],
		averageIncome: 900,
		qualityOfLife: 9,
	},
	{
		nationId: 'nat_fatimid',
		socialClass: 'merchants',
		typicalDiet: [
			'flatbread',
			'lamb',
			'dates',
			'olive_oil',
			'sherbet',
			'fruits',
		],
		housing: 'Stone townhouse near the suq',
		clothing: 'Cotton robe, embroidered cap, leather slippers',
		workType: 'Spice and textile trade, Red Sea commerce, banking',
		leisureActivities: ['baths', 'chess', 'storytelling', 'market_socializing'],
		averageIncome: 350,
		qualityOfLife: 8,
	},
	{
		nationId: 'nat_fatimid',
		socialClass: 'free_peasants',
		typicalDiet: ['flatbread', 'beans', 'onions', 'water', 'dates'],
		housing: 'Mud-brick house along the Nile',
		clothing: 'Cotton tunic, sandals',
		workType: 'Nile irrigation farming, date palm cultivation',
		leisureActivities: ['storytelling', 'festivals', 'music'],
		averageIncome: 12,
		qualityOfLife: 3,
	},

	// ========================================================================
	// ÉMIRAT BOUYIDE
	// ========================================================================
	{
		nationId: 'nat_buyid',
		socialClass: 'nobility',
		typicalDiet: [
			'lamb',
			'rice',
			'dates',
			'almonds',
			'sherbet',
			'saffron_dishes',
		],
		housing: 'Palatial estate in Baghdad or Shiraz',
		clothing: 'Silk robes, jeweled turban, embroidered slippers',
		workType: 'Military governance, court patronage, administration',
		leisureActivities: [
			'poetry',
			'chess',
			'falconry',
			'scholarly_debate',
			'baths',
		],
		averageIncome: 700,
		qualityOfLife: 8,
	},
	{
		nationId: 'nat_buyid',
		socialClass: 'free_peasants',
		typicalDiet: ['flatbread', 'dates', 'lentils', 'onions', 'water'],
		housing: 'Mud-brick house near canal',
		clothing: 'Cotton tunic, sandals',
		workType: 'Canal-irrigated farming, date palm cultivation',
		leisureActivities: ['storytelling', 'festivals', 'music'],
		averageIncome: 10,
		qualityOfLife: 3,
	},

	// ========================================================================
	// EMPIRE GHAZNAVIDE
	// ========================================================================
	{
		nationId: 'nat_ghaznavid',
		socialClass: 'warriors',
		typicalDiet: ['bread', 'mutton', 'rice', 'dried_fruits', 'yogurt'],
		housing: 'Garrison barracks or military camp',
		clothing: 'Chainmail over cotton tunic, turban, leather boots',
		workType: 'Military campaigns in India, garrison duty, raiding',
		leisureActivities: ['wrestling', 'archery', 'polo', 'storytelling'],
		averageIncome: 60,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_ghaznavid',
		socialClass: 'free_peasants',
		typicalDiet: ['flatbread', 'lentils', 'onions', 'yogurt', 'water'],
		housing: 'Mud-brick farmhouse',
		clothing: 'Cotton tunic, sandals, headscarf',
		workType: 'Irrigated agriculture, herding',
		leisureActivities: ['storytelling', 'music', 'festivals'],
		averageIncome: 8,
		qualityOfLife: 3,
	},

	// ========================================================================
	// KHANAT KARAKHANIDE
	// ========================================================================
	{
		nationId: 'nat_karakhanid',
		socialClass: 'nomads',
		typicalDiet: ['mare_milk', 'mutton', 'dried_meat', 'yogurt', 'flatbread'],
		housing: 'Felt yurt (ger)',
		clothing: 'Leather deel, fur hat, felt boots',
		workType: 'Pastoral nomadism, horse and sheep herding, seasonal migration',
		leisureActivities: [
			'horsemanship',
			'wrestling',
			'eagle_hunting',
			'storytelling',
		],
		averageIncome: 15,
		qualityOfLife: 4,
	},
	{
		nationId: 'nat_karakhanid',
		socialClass: 'merchants',
		typicalDiet: ['bread', 'mutton', 'dried_fruits', 'tea', 'yogurt'],
		housing: 'Caravanserai or Silk Road trading house',
		clothing: 'Silk caftan, fur-trimmed hat, leather boots',
		workType: 'Silk Road transit trade, horse and textile commerce',
		leisureActivities: ['chess', 'storytelling', 'polo', 'baths'],
		averageIncome: 120,
		qualityOfLife: 6,
	},

	// ========================================================================
	// DYNASTIE SONG
	// ========================================================================
	{
		nationId: 'nat_song',
		socialClass: 'nobility',
		typicalDiet: [
			'rice',
			'pork',
			'fish',
			'tea',
			'vegetables',
			'soy_sauce',
			'tofu',
			'fruits',
		],
		housing: 'Elegant timber compound with gardens in Kaifeng',
		clothing: 'Silk hanfu, jade hairpin, embroidered slippers',
		workType:
			'Civil service examinations, government administration, scholarship',
		leisureActivities: [
			'poetry',
			'calligraphy',
			'painting',
			'tea_ceremony',
			'chess_weiqi',
			'music',
		],
		averageIncome: 1000,
		qualityOfLife: 9,
	},
	{
		nationId: 'nat_song',
		socialClass: 'merchants',
		typicalDiet: ['rice', 'noodles', 'pork', 'fish', 'tea', 'vegetables'],
		housing: 'Multi-story shop-house in market district',
		clothing: 'Fine cotton robe, silk accessories',
		workType: 'Porcelain trade, silk production, tea commerce, banking',
		leisureActivities: [
			'theatre',
			'tea_houses',
			'storytelling',
			'gambling',
			'festivals',
		],
		averageIncome: 400,
		qualityOfLife: 7,
	},
	{
		nationId: 'nat_song',
		socialClass: 'free_peasants',
		typicalDiet: ['rice', 'vegetables', 'tofu', 'tea', 'occasional_pork'],
		housing: 'Timber-and-mud farmhouse with tiled roof',
		clothing: 'Cotton tunic, straw sandals, bamboo hat',
		workType: 'Rice paddy cultivation, silkworm raising, tea growing',
		leisureActivities: [
			'festivals',
			'folk_opera',
			'fire_crackers',
			'market_visits',
		],
		averageIncome: 15,
		qualityOfLife: 4,
	},

	// ========================================================================
	// DYNASTIE LIAO
	// ========================================================================
	{
		nationId: 'nat_liao',
		socialClass: 'nomads',
		typicalDiet: ['mare_milk', 'mutton', 'dried_meat', 'kumis'],
		housing: 'Felt tent (yurt) in seasonal camps',
		clothing: 'Fur-lined deel, leather boots, fur hat',
		workType: 'Pastoral nomadism, hunting, mounted warfare',
		leisureActivities: [
			'horseback_archery',
			'wrestling',
			'hunting',
			'feasting',
		],
		averageIncome: 15,
		qualityOfLife: 4,
	},
	{
		nationId: 'nat_liao',
		socialClass: 'warriors',
		typicalDiet: ['mutton', 'dried_meat', 'millet', 'kumis', 'mare_milk'],
		housing: 'Military camp or garrison town',
		clothing: 'Leather armor, fur cloak, riding boots',
		workType: 'Cavalry warfare, border patrol, hunting',
		leisureActivities: ['horseback_archery', 'wrestling', 'polo', 'feasting'],
		averageIncome: 40,
		qualityOfLife: 5,
	},

	// ========================================================================
	// GORYEO
	// ========================================================================
	{
		nationId: 'nat_goryeo',
		socialClass: 'nobility',
		typicalDiet: ['rice', 'kimchi', 'fish', 'beef', 'tea', 'soy_dishes'],
		housing: 'Hanok mansion with ondol heated floors',
		clothing: 'Silk hanbok, jade ornaments, silk shoes',
		workType:
			'Government administration, Confucian scholarship, estate management',
		leisureActivities: [
			'poetry',
			'calligraphy',
			'baduk_weiqi',
			'tea_ceremony',
			'music',
		],
		averageIncome: 500,
		qualityOfLife: 8,
	},
	{
		nationId: 'nat_goryeo',
		socialClass: 'free_peasants',
		typicalDiet: ['rice', 'barley', 'kimchi', 'dried_fish', 'vegetables'],
		housing: 'Small hanok with thatched roof, ondol floors',
		clothing: 'Cotton hanbok, straw sandals',
		workType: 'Rice and barley farming, fishing',
		leisureActivities: ['folk_games', 'festivals', 'music', 'wrestling'],
		averageIncome: 12,
		qualityOfLife: 3,
	},

	// ========================================================================
	// JAPON
	// ========================================================================
	{
		nationId: 'nat_japan',
		socialClass: 'nobility',
		typicalDiet: [
			'rice',
			'fish',
			'tofu',
			'pickled_vegetables',
			'sake',
			'seasonal_delicacies',
		],
		housing: 'Shinden-zukuri mansion with gardens in Heian-kyō',
		clothing:
			'Layered silk jūnihitoe (women) or kariginu (men), lacquered headwear',
		workType: 'Court ritual, poetry composition, calligraphy, estate oversight',
		leisureActivities: [
			'poetry_contests',
			'incense_appreciation',
			'music',
			'moon_viewing',
			'kemari',
		],
		averageIncome: 600,
		qualityOfLife: 9,
	},
	{
		nationId: 'nat_japan',
		socialClass: 'warriors',
		typicalDiet: ['rice', 'fish', 'pickles', 'miso_soup', 'sake'],
		housing: 'Fortified estate (buke-zukuri)',
		clothing: 'Hunting robe (kariginu), light armor, leather boots',
		workType: 'Mounted warfare, estate defense, hunting, land management',
		leisureActivities: [
			'archery',
			'horseback_riding',
			'sword_practice',
			'poetry',
		],
		averageIncome: 80,
		qualityOfLife: 6,
	},
	{
		nationId: 'nat_japan',
		socialClass: 'free_peasants',
		typicalDiet: ['rice', 'millet', 'pickled_vegetables', 'fish', 'water'],
		housing: 'Thatched-roof timber farmhouse',
		clothing: 'Cotton tunic, straw sandals (waraji), straw hat',
		workType: 'Rice paddy farming, fishing, silk cultivation',
		leisureActivities: ['matsuri_festivals', 'folk_dance', 'storytelling'],
		averageIncome: 10,
		qualityOfLife: 3,
	},

	// ========================================================================
	// ĐẠI VIỆT
	// ========================================================================
	{
		nationId: 'nat_dai_viet',
		socialClass: 'nobility',
		typicalDiet: [
			'rice',
			'fish_sauce',
			'pork',
			'vegetables',
			'tropical_fruits',
			'tea',
		],
		housing: 'Timber palace with tiled roof',
		clothing: 'Silk áo dài-style robes, lacquered hat',
		workType: 'Imperial administration, military command, scholarly pursuits',
		leisureActivities: ['poetry', 'chess', 'music', 'festivals', 'gardening'],
		averageIncome: 400,
		qualityOfLife: 8,
	},
	{
		nationId: 'nat_dai_viet',
		socialClass: 'free_peasants',
		typicalDiet: [
			'rice',
			'fish_sauce',
			'vegetables',
			'tropical_fruits',
			'water',
		],
		housing: 'Bamboo and thatch stilted house',
		clothing: 'Cotton tunic, conical hat (nón lá), sandals',
		workType: 'Wet rice cultivation, fishing, silkworm raising',
		leisureActivities: [
			'water_puppet_theatre',
			'festivals',
			'folk_songs',
			'cock_fighting',
		],
		averageIncome: 10,
		qualityOfLife: 3,
	},

	// ========================================================================
	// EMPIRE KHMER
	// ========================================================================
	{
		nationId: 'nat_khmer',
		socialClass: 'nobility',
		typicalDiet: [
			'rice',
			'fish',
			'spices',
			'tropical_fruits',
			'coconut_milk',
			'palm_sugar',
		],
		housing: 'Stone-and-timber palace near Angkor temple complex',
		clothing: 'Fine silk sampot, gold jewelry, flower garlands',
		workType:
			'Temple construction oversight, irrigation management, court ritual',
		leisureActivities: [
			'temple_festivals',
			'dance',
			'music',
			'cockfighting',
			'boating',
		],
		averageIncome: 500,
		qualityOfLife: 8,
	},
	{
		nationId: 'nat_khmer',
		socialClass: 'free_peasants',
		typicalDiet: ['rice', 'fish', 'vegetables', 'coconut', 'palm_sugar'],
		housing: 'Wooden stilted house with palm-leaf roof',
		clothing: 'Cotton sampot, bare-chested',
		workType: 'Rice paddy farming using baray irrigation',
		leisureActivities: ['temple_festivals', 'folk_music', 'boat_racing'],
		averageIncome: 10,
		qualityOfLife: 3,
	},

	// ========================================================================
	// SRIVIJAYA
	// ========================================================================
	{
		nationId: 'nat_srivijaya',
		socialClass: 'merchants',
		typicalDiet: ['rice', 'fish', 'spices', 'tropical_fruits', 'coconut_milk'],
		housing: 'Timber house on stilts near port',
		clothing: 'Silk sarong, gold ornaments, sandals',
		workType: 'Maritime spice trade, ship brokering, entrepôt commerce',
		leisureActivities: [
			'gamelan_music',
			'storytelling',
			'festivals',
			'boat_racing',
		],
		averageIncome: 250,
		qualityOfLife: 7,
	},
	{
		nationId: 'nat_srivijaya',
		socialClass: 'free_peasants',
		typicalDiet: ['rice', 'sago', 'fish', 'coconut', 'tropical_fruits'],
		housing: 'Bamboo and palm-leaf stilted house',
		clothing: 'Cotton sarong',
		workType: 'Fishing, rice farming, sago production, pepper cultivation',
		leisureActivities: ['gamelan_music', 'storytelling', 'festivals'],
		averageIncome: 8,
		qualityOfLife: 3,
	},

	// ========================================================================
	// EMPIRE CHOLA
	// ========================================================================
	{
		nationId: 'nat_chola',
		socialClass: 'nobility',
		typicalDiet: [
			'rice',
			'lentils',
			'ghee',
			'spices',
			'fruits',
			'milk',
			'sweets',
		],
		housing: 'Stone-and-timber palace with granite pillars',
		clothing: 'Fine silk dhoti, gold jewelry, flower garlands, silk uttariya',
		workType: 'Temple patronage, naval command, administrative oversight',
		leisureActivities: [
			'bharatanatyam_dance',
			'music',
			'poetry',
			'temple_festivals',
			'chess',
		],
		averageIncome: 700,
		qualityOfLife: 9,
	},
	{
		nationId: 'nat_chola',
		socialClass: 'free_peasants',
		typicalDiet: ['rice', 'lentils', 'vegetables', 'buttermilk', 'coconut'],
		housing: 'Thatched-roof clay house',
		clothing: 'Cotton dhoti, bare-chested, sandals',
		workType: 'Rice paddy farming, coconut cultivation, fishing',
		leisureActivities: ['temple_festivals', 'folk_music', 'kolam_drawing'],
		averageIncome: 10,
		qualityOfLife: 3,
	},

	// ========================================================================
	// CHALUKYA OCCIDENTAUX
	// ========================================================================
	{
		nationId: 'nat_chalukya',
		socialClass: 'nobility',
		typicalDiet: ['rice', 'millet', 'lentils', 'ghee', 'spices', 'fruits'],
		housing: 'Stone fort-palace with carved pillars',
		clothing: 'Silk dhoti, gold ornaments, sandalwood paste',
		workType: 'Temple building patronage, military administration, taxation',
		leisureActivities: [
			'music',
			'dance',
			'poetry',
			'hunting',
			'temple_rituals',
		],
		averageIncome: 500,
		qualityOfLife: 8,
	},
	{
		nationId: 'nat_chalukya',
		socialClass: 'free_peasants',
		typicalDiet: ['millet', 'rice', 'lentils', 'vegetables', 'buttermilk'],
		housing: 'Mud-and-stone hut with thatched roof',
		clothing: 'Cotton dhoti',
		workType: 'Millet and rice farming, cotton cultivation',
		leisureActivities: ['temple_festivals', 'folk_art', 'storytelling'],
		averageIncome: 8,
		qualityOfLife: 3,
	},

	// ========================================================================
	// EMPIRE PALA
	// ========================================================================
	{
		nationId: 'nat_pala',
		socialClass: 'clergy',
		typicalDiet: ['rice', 'vegetables', 'fruits', 'water', 'milk'],
		housing: 'Monastic cell in Nalanda or Vikramashila university',
		clothing: 'Saffron robes, sandals',
		workType: 'Buddhist scholarship, teaching, manuscript copying, meditation',
		leisureActivities: [
			'meditation',
			'philosophical_debate',
			'manuscript_illumination',
		],
		averageIncome: 30,
		qualityOfLife: 6,
	},
	{
		nationId: 'nat_pala',
		socialClass: 'free_peasants',
		typicalDiet: ['rice', 'fish', 'lentils', 'vegetables', 'water'],
		housing: 'Bamboo and mud hut near riverbank',
		clothing: 'Cotton dhoti',
		workType: 'Rice farming in Ganges delta, fishing, jute processing',
		leisureActivities: ['folk_music', 'boat_festivals', 'storytelling'],
		averageIncome: 8,
		qualityOfLife: 3,
	},

	// ========================================================================
	// EMPIRE DU GHANA
	// ========================================================================
	{
		nationId: 'nat_ghana',
		socialClass: 'nobility',
		typicalDiet: ['millet', 'sorghum', 'meat', 'fish', 'shea_butter', 'honey'],
		housing: 'Stone-and-mud palace compound in Kumbi Saleh',
		clothing: 'Cotton and silk robes, gold jewelry, sandals',
		workType: 'Gold trade oversight, tribute collection, judicial authority',
		leisureActivities: [
			'drums_and_dance',
			'storytelling',
			'horsemanship',
			'feasting',
		],
		averageIncome: 500,
		qualityOfLife: 8,
	},
	{
		nationId: 'nat_ghana',
		socialClass: 'free_peasants',
		typicalDiet: ['millet', 'sorghum', 'peanuts', 'vegetables', 'water'],
		housing: 'Round mud-brick hut with conical thatch roof',
		clothing: 'Cotton loincloth, leather sandals',
		workType: 'Millet and sorghum farming, gold panning',
		leisureActivities: ['drumming', 'storytelling', 'dancing', 'wrestling'],
		averageIncome: 6,
		qualityOfLife: 3,
	},

	// ========================================================================
	// EMPIRE DU KANEM
	// ========================================================================
	{
		nationId: 'nat_kanem',
		socialClass: 'nomads',
		typicalDiet: ['millet', 'milk', 'meat', 'dates', 'water'],
		housing: 'Hide and reed tent',
		clothing: 'Cotton robe, turban, leather sandals',
		workType: 'Cattle herding, trans-Saharan caravan escort, raiding',
		leisureActivities: [
			'storytelling',
			'wrestling',
			'horsemanship',
			'drumming',
		],
		averageIncome: 8,
		qualityOfLife: 3,
	},

	// ========================================================================
	// ÉTHIOPIE
	// ========================================================================
	{
		nationId: 'nat_ethiopia',
		socialClass: 'clergy',
		typicalDiet: [
			'injera',
			'lentils',
			'vegetables',
			'honey_wine',
			'barley_beer',
		],
		housing: 'Stone monastery carved into mountain',
		clothing: 'White cotton shamma, leather sandals',
		workType: 'Monastic life, manuscript copying, church administration',
		leisureActivities: ['religious_chanting', 'prayer', 'theological_study'],
		averageIncome: 25,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_ethiopia',
		socialClass: 'free_peasants',
		typicalDiet: [
			'injera',
			'lentils',
			'chickpeas',
			'collard_greens',
			'barley_beer',
		],
		housing: 'Round stone-and-mud tukul with thatched roof',
		clothing: 'Cotton shamma, bare feet',
		workType: 'Teff and barley farming, coffee growing, livestock herding',
		leisureActivities: ['church_festivals', 'folk_dancing', 'storytelling'],
		averageIncome: 8,
		qualityOfLife: 3,
	},

	// ========================================================================
	// CITÉS SWAHILIES
	// ========================================================================
	{
		nationId: 'nat_swahili_cities',
		socialClass: 'merchants',
		typicalDiet: [
			'rice',
			'fish',
			'coconut_milk',
			'spices',
			'tropical_fruits',
			'pilau',
		],
		housing: 'Coral-stone townhouse with carved wooden doors',
		clothing: 'White cotton robe, embroidered cap, gold ornaments',
		workType: 'Indian Ocean trade in ivory, gold, spices, and slaves',
		leisureActivities: ['poetry_recitals', 'sailing', 'music', 'festivals'],
		averageIncome: 300,
		qualityOfLife: 8,
	},
	{
		nationId: 'nat_swahili_cities',
		socialClass: 'free_peasants',
		typicalDiet: ['fish', 'rice', 'cassava', 'coconut', 'fruits'],
		housing: 'Wattle-and-daub house with palm-leaf roof',
		clothing: 'Cotton cloth wrap',
		workType: 'Fishing, farming, coconut cultivation',
		leisureActivities: [
			'music',
			'storytelling',
			'festivals',
			'fishing_competitions',
		],
		averageIncome: 8,
		qualityOfLife: 3,
	},

	// ========================================================================
	// EMPIRE TOLTÈQUE
	// ========================================================================
	{
		nationId: 'nat_toltec',
		socialClass: 'warriors',
		typicalDiet: [
			'maize_tortillas',
			'beans',
			'squash',
			'chili',
			'turkey',
			'cacao',
			'amaranth',
		],
		housing: 'Stone-and-plaster quarters near temple complex in Tula',
		clothing:
			'Quilted cotton armor (ichcahuipilli), feathered headdress, jade jewelry',
		workType: 'Temple-state warfare, conquest tribute, ceremonial duties',
		leisureActivities: ['ball_game', 'ritual_dance', 'feasting', 'music'],
		averageIncome: 50,
		qualityOfLife: 6,
	},
	{
		nationId: 'nat_toltec',
		socialClass: 'free_peasants',
		typicalDiet: ['maize_tortillas', 'beans', 'squash', 'chili', 'water'],
		housing: 'Adobe one-room house',
		clothing: 'Cotton loincloth, maguey-fiber cloak',
		workType: 'Maize farming, maguey cultivation, tribute labor',
		leisureActivities: ['festivals', 'ball_game_spectating', 'music'],
		averageIncome: 6,
		qualityOfLife: 3,
	},

	// ========================================================================
	// CITÉS-ÉTATS MAYAS
	// ========================================================================
	{
		nationId: 'nat_maya_states',
		socialClass: 'clergy',
		typicalDiet: [
			'maize_tortillas',
			'beans',
			'cacao',
			'turkey',
			'honey',
			'fruits',
		],
		housing: 'Stone temple complex quarters',
		clothing: 'Elaborate jade jewelry, quetzal feather headdress, jaguar pelts',
		workType:
			'Astronomy, calendar computation, ritual ceremonies, writing glyphs',
		leisureActivities: [
			'ball_game',
			'astronomical_observation',
			'ritual_dance',
		],
		averageIncome: 80,
		qualityOfLife: 7,
	},
	{
		nationId: 'nat_maya_states',
		socialClass: 'free_peasants',
		typicalDiet: ['maize_tortillas', 'beans', 'squash', 'chili', 'water'],
		housing: 'Thatch-roofed limestone-base hut',
		clothing: 'Cotton loincloth, huipil',
		workType: 'Milpa farming (slash-and-burn maize), beekeeping',
		leisureActivities: ['ball_game_spectating', 'festivals', 'market_visits'],
		averageIncome: 5,
		qualityOfLife: 3,
	},

	// ========================================================================
	// CULTURE MISSISSIPPIENNE
	// ========================================================================
	{
		nationId: 'nat_mississippian',
		socialClass: 'free_peasants',
		typicalDiet: ['maize', 'beans', 'squash', 'fish', 'deer_meat', 'nuts'],
		housing: 'Wattle-and-daub house near Cahokia mounds',
		clothing: 'Deerskin garments, shell ornaments',
		workType: 'Maize farming, fishing, mound-building labor',
		leisureActivities: ['chunkey_game', 'festivals', 'storytelling', 'dancing'],
		averageIncome: 5,
		qualityOfLife: 4,
	},

	// ========================================================================
	// EMPIRE WARI
	// ========================================================================
	{
		nationId: 'nat_wari',
		socialClass: 'nobility',
		typicalDiet: [
			'maize',
			'potatoes',
			'quinoa',
			'llama_meat',
			'chicha_beer',
			'peppers',
		],
		housing: 'Stone administrative compound in Huari',
		clothing: 'Fine alpaca wool tunic (unku), feather ornaments, gold earplugs',
		workType:
			'Provincial administration, irrigation management, military command',
		leisureActivities: [
			'feasting',
			'music',
			'ritual_ceremonies',
			'textile_art',
		],
		averageIncome: 300,
		qualityOfLife: 7,
	},
	{
		nationId: 'nat_wari',
		socialClass: 'free_peasants',
		typicalDiet: ['potatoes', 'maize', 'quinoa', 'chuño', 'water'],
		housing: 'Stone-and-adobe one-room dwelling on mountain terrace',
		clothing: 'Alpaca wool tunic, woven belt, leather sandals (usuta)',
		workType: "Terrace farming, llama herding, mit'a labor service",
		leisureActivities: ['festivals', 'music', 'weaving'],
		averageIncome: 5,
		qualityOfLife: 3,
	},

	// ========================================================================
	// TIBET
	// ========================================================================
	{
		nationId: 'nat_tibet',
		socialClass: 'clergy',
		typicalDiet: ['tsampa', 'yak_butter_tea', 'barley_beer', 'dried_yak_meat'],
		housing: 'Stone monastery (gompa) on mountain slope',
		clothing: 'Maroon robes, wool shawl, leather boots',
		workType: 'Buddhist study, meditation, manuscript copying, teaching',
		leisureActivities: [
			'debate',
			'meditation',
			'mandala_creation',
			'ritual_dance',
		],
		averageIncome: 20,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_tibet',
		socialClass: 'nomads',
		typicalDiet: ['tsampa', 'yak_butter_tea', 'dried_yak_meat', 'cheese'],
		housing: 'Black yak-hair tent',
		clothing: 'Heavy wool chuba robe, fur-lined boots, felt hat',
		workType: 'Yak and sheep herding, seasonal migration',
		leisureActivities: [
			'horse_racing',
			'archery',
			'folk_songs',
			'storytelling',
		],
		averageIncome: 8,
		qualityOfLife: 3,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 1
	// ========================================================================
	{
		nationId: 'nat_puebloans',
		socialClass: 'free_peasants',
		typicalDiet: ['maize', 'squash', 'beans', 'wild_game', 'pine_nuts'],
		housing:
			'Multi-story adobe pueblo (Pueblo Bonito), rooms off central plaza',
		clothing: 'Cotton tunic, yucca fiber sandals, woven blanket',
		workType: 'Irrigated farming, turquoise crafting, trade',
		leisureActivities: [
			'kachina_ceremonies',
			'pottery',
			'storytelling',
			'music',
		],
		averageIncome: 8,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_haida',
		socialClass: 'free_peasants',
		typicalDiet: ['salmon', 'halibut', 'berries', 'eulachon_oil', 'seaweed'],
		housing: 'Large cedar plank longhouse with totem pole, clan-shared',
		clothing: 'Cedar bark cape, woven hat, fur robe in winter',
		workType: 'Salmon fishing, canoe building, woodcarving, trading',
		leisureActivities: [
			'potlatch',
			'mask_dance',
			'storytelling',
			'canoe_racing',
		],
		averageIncome: 12,
		qualityOfLife: 6,
	},
	{
		nationId: 'nat_thule',
		socialClass: 'free_peasants',
		typicalDiet: ['seal', 'whale', 'caribou', 'arctic_char', 'berries'],
		housing: 'Semi-subterranean sod house (winter), skin tent (summer)',
		clothing: 'Caribou skin parka with hood, sealskin boots (kamik), mittens',
		workType: 'Whale and seal hunting, seasonal caribou migration hunting',
		leisureActivities: [
			'throat_singing',
			'storytelling',
			'drum_dance',
			'games',
		],
		averageIncome: 4,
		qualityOfLife: 3,
	},
	{
		nationId: 'nat_tui_tonga',
		socialClass: 'free_peasants',
		typicalDiet: ['taro', 'yam', 'coconut', 'fish', 'pork', 'breadfruit'],
		housing: 'Fale — open-sided thatched house on raised platform',
		clothing: 'Tapa bark cloth wrap, woven mat skirt, shell ornaments',
		workType: 'Taro and yam farming, deep-sea fishing, tribute collection',
		leisureActivities: ['kava_ceremony', 'dance', 'canoe_racing', 'wrestling'],
		averageIncome: 10,
		qualityOfLife: 6,
	},
	{
		nationId: 'nat_aboriginal',
		socialClass: 'free_peasants',
		typicalDiet: [
			'kangaroo',
			'witchetty_grub',
			'wild_yam',
			'fish',
			'honey_ant',
		],
		housing: 'Windbreak shelter (wurley/humpy), seasonal camps',
		clothing: 'Minimal — body paint for ceremonies, possum skin cloak in south',
		workType:
			'Hunting-gathering, firestick farming, seasonal migration along songlines',
		leisureActivities: [
			'corroboree',
			'rock_art',
			'storytelling',
			'didgeridoo_music',
		],
		averageIncome: 2,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_sami',
		socialClass: 'nomads',
		typicalDiet: ['reindeer_meat', 'dried_fish', 'berries', 'flatbread'],
		housing: 'Lavvu (conical tent of reindeer hides), turf hut in winter camp',
		clothing: 'Gákti (colorful wool tunic), reindeer skin boots, woven belt',
		workType: 'Reindeer herding, fishing, fur trading with Norse',
		leisureActivities: [
			'joik_singing',
			'drum_ceremony',
			'storytelling',
			'skiing',
		],
		averageIncome: 6,
		qualityOfLife: 4,
	},
	{
		nationId: 'nat_mapuche',
		socialClass: 'free_peasants',
		typicalDiet: ['potato', 'maize', 'quinoa', 'fish', 'chili_pepper'],
		housing: 'Ruka — large oval thatched house with log frame',
		clothing:
			'Wool poncho (makuñ), silver jewelry (trarilonko), leather sandals',
		workType: 'Farming, llama herding, fishing, silversmithing',
		leisureActivities: [
			'palin_game',
			'music',
			'ngillatun_ceremony',
			'storytelling',
		],
		averageIncome: 8,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_malagasy',
		socialClass: 'free_peasants',
		typicalDiet: ['rice', 'zebu_meat', 'fish', 'cassava', 'tropical_fruit'],
		housing:
			'Raised wooden house on stilts with thatched roof (Austronesian style)',
		clothing: 'Lamba (large draped cloth), raffia hat',
		workType: 'Rice paddy farming, zebu herding, fishing, coastal trade',
		leisureActivities: [
			'valiha_music',
			'storytelling',
			'moraingy_wrestling',
			'dance',
		],
		averageIncome: 7,
		qualityOfLife: 4,
	},
	{
		nationId: 'nat_yoruba',
		socialClass: 'artisans',
		typicalDiet: ['yam', 'palm_oil', 'millet', 'fish', 'beans', 'pepper'],
		housing:
			'Compound of connected rooms around central courtyard, mud-brick walls',
		clothing: 'Agbada (flowing robe), gele (head wrap), aso oke (woven cloth)',
		workType:
			'Bronze casting (lost-wax), terracotta sculpture, weaving, beadwork',
		leisureActivities: [
			'egungun_masquerade',
			'ayo_game',
			'drumming',
			'storytelling',
		],
		averageIncome: 15,
		qualityOfLife: 6,
	},
	{
		nationId: 'nat_zimbabwe',
		socialClass: 'free_peasants',
		typicalDiet: ['sorghum', 'millet', 'zebu_meat', 'wild_greens', 'beer'],
		housing: 'Circular daga (mud and thatch) hut within stone-walled enclosure',
		clothing: 'Woven cloth, tanned hides, gold and copper ornaments',
		workType: 'Farming, cattle herding, gold mining, stone masonry',
		leisureActivities: [
			'mbira_music',
			'storytelling',
			'dance',
			'cattle_display',
		],
		averageIncome: 10,
		qualityOfLife: 5,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 2
	// ========================================================================
	{
		nationId: 'nat_chimu',
		socialClass: 'artisans',
		typicalDiet: ['fish', 'corn', 'beans', 'squash', 'chicha'],
		housing: 'Adobe room within ciudadela compound, flat roof',
		clothing: 'Cotton tunic, gold ornaments, ceremonial headdress',
		workType: 'Goldsmithing, pottery, fishing, irrigation farming',
		leisureActivities: [
			'ceremonial_dance',
			'music',
			'storytelling',
			'festival',
		],
		averageIncome: 15,
		qualityOfLife: 6,
	},
	{
		nationId: 'nat_muisca',
		socialClass: 'free_peasants',
		typicalDiet: ['corn', 'potato', 'quinoa', 'beans', 'chicha'],
		housing: 'Circular bohío (thatched hut) with wattle-and-daub walls',
		clothing: 'Cotton manta (cloak), gold ornaments, feathers',
		workType: 'Farming, salt mining, gold and emerald trade',
		leisureActivities: [
			'ceremonial_dance',
			'music',
			'el_dorado_ritual',
			'storytelling',
		],
		averageIncome: 10,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_guarani',
		socialClass: 'free_peasants',
		typicalDiet: ['cassava', 'corn', 'sweet_potato', 'game', 'yerba_mate'],
		housing: 'Oga (longhouse) shared by extended family, thatch and wood',
		clothing: 'Cotton loincloth, body paint, feather ornaments',
		workType: 'Slash-and-burn farming, hunting, fishing, foraging',
		leisureActivities: [
			'ceremonial_dance',
			'drumming',
			'storytelling',
			'hunting_games',
		],
		averageIncome: 5,
		qualityOfLife: 4,
	},
	{
		nationId: 'nat_hawaii',
		socialClass: 'free_peasants',
		typicalDiet: ['taro', 'poi', 'fish', 'coconut', 'sweet_potato'],
		housing: 'Hale (thatched house) near taro paddies, stone foundation',
		clothing: "Malo (tapa loincloth), flower lei, feather cape (ali'i)",
		workType: 'Taro farming, fishing, tapa cloth making',
		leisureActivities: [
			'hula_dance',
			'surfing',
			'storytelling',
			'canoe_racing',
		],
		averageIncome: 8,
		qualityOfLife: 6,
	},
	{
		nationId: 'nat_ainu',
		socialClass: 'free_peasants',
		typicalDiet: ['salmon', 'deer', 'bear', 'wild_roots', 'millet'],
		housing: 'Chise (thatched house) with central hearth, reed walls',
		clothing: 'Attus (elm bark robe) with embroidered patterns',
		workType: 'Salmon fishing, deer hunting, foraging, trade',
		leisureActivities: [
			'yukar_recitation',
			'bear_ceremony',
			'embroidery',
			'dance',
		],
		averageIncome: 5,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_makuria',
		socialClass: 'free_peasants',
		typicalDiet: ['millet', 'dates', 'nile_fish', 'lentils', 'beer'],
		housing: 'Mud-brick house with flat roof near Nile, whitewashed walls',
		clothing: 'Coptic tunic, turban, pectoral cross',
		workType: 'Nile farming, pottery, church building, river trade',
		leisureActivities: [
			'church_singing',
			'storytelling',
			'board_games',
			'river_fishing',
		],
		averageIncome: 8,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_tuareg',
		socialClass: 'warriors',
		typicalDiet: ['camel_milk', 'dates', 'millet', 'dried_meat', 'tea'],
		housing: "Akh'am (leather tent) designed for nomadic life",
		clothing: 'Tagelmust (indigo veil), gandoura (robe), silver jewelry',
		workType: 'Caravan trading, camel herding, raiding, salt trade',
		leisureActivities: [
			'imzad_music',
			'poetry',
			'camel_racing',
			'storytelling',
		],
		averageIncome: 12,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_georgia',
		socialClass: 'free_peasants',
		typicalDiet: ['bread', 'wine', 'cheese', 'grilled_meat', 'herbs'],
		housing: 'Stone house with wooden balcony, tile or thatch roof',
		clothing: 'Chokha (tunic), papakha (hat), leather belt',
		workType: 'Winemaking (kvevri), farming, herding, church building',
		leisureActivities: [
			'polyphonic_singing',
			'supra_feast',
			'swordsmanship',
			'dance',
		],
		averageIncome: 12,
		qualityOfLife: 6,
	},
	{
		nationId: 'nat_armenia',
		socialClass: 'artisans',
		typicalDiet: ['lavash_bread', 'lamb', 'pomegranate', 'herbs', 'wine'],
		housing: 'Stone house, often with underground storage, flat/domed roof',
		clothing: 'Taraz (traditional costume), embroidered belt, headscarf',
		workType: 'Stone carving (khachkar), manuscript copying, trade, winemaking',
		leisureActivities: [
			'duduk_music',
			'church_singing',
			'board_games',
			'storytelling',
		],
		averageIncome: 18,
		qualityOfLife: 7,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 3
	// ========================================================================
	{
		nationId: 'nat_hohokam',
		socialClass: 'free_peasants',
		typicalDiet: ['corn', 'beans', 'squash', 'cactus_fruit', 'game'],
		housing: 'Pit house (semi-subterranean) with brush roof',
		clothing: 'Cotton loincloth, sandals, shell ornaments',
		workType: 'Irrigation farming, canal maintenance, pottery, shell trade',
		leisureActivities: [
			'ball_game',
			'storytelling',
			'pottery_making',
			'ceremonial_dance',
		],
		averageIncome: 5,
		qualityOfLife: 4,
	},
	{
		nationId: 'nat_dorset',
		socialClass: 'free_peasants',
		typicalDiet: ['seal', 'walrus', 'fish', 'seabird'],
		housing: 'Semi-subterranean stone and turf house with bone frame',
		clothing: 'Sealskin clothing sewn with bone needles',
		workType: 'Seal hunting on ice, ivory carving, tool making',
		leisureActivities: ['ivory_carving', 'storytelling', 'drum_dance'],
		averageIncome: 2,
		qualityOfLife: 3,
	},
	{
		nationId: 'nat_beothuk',
		socialClass: 'free_peasants',
		typicalDiet: ['caribou', 'salmon', 'seal', 'seabirds', 'berries'],
		housing: 'Mamateek (conical birch-bark shelter)',
		clothing: 'Caribou-skin garments dyed with red ochre, moccasins',
		workType: 'Caribou hunting, salmon fishing, birch bark crafting',
		leisureActivities: ['storytelling', 'dance', 'hunting_games'],
		averageIncome: 3,
		qualityOfLife: 3,
	},
	{
		nationId: 'nat_dene',
		socialClass: 'free_peasants',
		typicalDiet: ['caribou', 'fish', 'moose', 'berries', 'roots'],
		housing: 'Tipi or lean-to shelter covered with caribou hides',
		clothing: 'Caribou-skin tunic, moccasins, snowshoes',
		workType: 'Caribou hunting, fishing, trapping, dog sled travel',
		leisureActivities: ['drum_dance', 'storytelling', 'beadwork', 'games'],
		averageIncome: 3,
		qualityOfLife: 3,
	},
	{
		nationId: 'nat_mikmaq',
		socialClass: 'free_peasants',
		typicalDiet: ['salmon', 'lobster', 'moose', 'corn', 'berries'],
		housing: 'Wigwam (birch-bark dome shelter)',
		clothing: 'Moose-hide tunic, embroidered moccasins, fur cape',
		workType: 'Coastal fishing, moose hunting, quillwork, trade',
		leisureActivities: ['pow_wow', 'storytelling', 'lacrosse', 'canoe_racing'],
		averageIncome: 5,
		qualityOfLife: 4,
	},
	{
		nationId: 'nat_papuan',
		socialClass: 'free_peasants',
		typicalDiet: ['sweet_potato', 'taro', 'sago', 'pork', 'banana'],
		housing: "Round hut on stilts with thatched roof, separate men's house",
		clothing: 'Koteka (gourd), bird-of-paradise feathers, body paint',
		workType: 'Sweet potato gardening, pig herding, warfare',
		leisureActivities: [
			'sing_sing_festival',
			'body_painting',
			'storytelling',
			'dance',
		],
		averageIncome: 3,
		qualityOfLife: 3,
	},
	{
		nationId: 'nat_fiji',
		socialClass: 'free_peasants',
		typicalDiet: ['taro', 'yam', 'coconut', 'fish', 'pork'],
		housing: 'Bure (thatched rectangular house) with woven walls',
		clothing: 'Masi (tapa cloth), sulu (wrap), bone ornaments',
		workType: 'Taro farming, fishing, canoe building, warfare',
		leisureActivities: [
			'kava_ceremony',
			'dance',
			'canoe_racing',
			'storytelling',
		],
		averageIncome: 5,
		qualityOfLife: 4,
	},
	{
		nationId: 'nat_chamorro',
		socialClass: 'free_peasants',
		typicalDiet: ['rice', 'fish', 'coconut', 'taro', 'breadfruit'],
		housing: 'House on latte stone pillars with thatched roof',
		clothing: 'Tapa loincloth, shell jewelry, tattoos',
		workType: 'Fishing, farming, latte stone construction, canoe sailing',
		leisureActivities: ['proa_sailing', 'dance', 'storytelling', 'weaving'],
		averageIncome: 5,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_guanche',
		socialClass: 'free_peasants',
		typicalDiet: ['gofio', 'goat_milk', 'fish', 'berries'],
		housing: 'Natural cave dwelling or stone hut',
		clothing: 'Goatskin garments, tamarco (cape), leather sandals',
		workType: 'Goat herding, barley farming, fishing, pottery',
		leisureActivities: ['wrestling', 'stick_fighting', 'dance', 'storytelling'],
		averageIncome: 4,
		qualityOfLife: 4,
	},
	{
		nationId: 'nat_san',
		socialClass: 'free_peasants',
		typicalDiet: ['game', 'roots', 'tubers', 'berries', 'tsamma_melon'],
		housing: 'Temporary scherms (brush shelters) or rock overhang',
		clothing: 'Springbok hide, ostrich-eggshell bead ornaments',
		workType: 'Hunting with poison arrows, gathering, tracking',
		leisureActivities: [
			'trance_dance',
			'rock_art',
			'music_bow',
			'storytelling',
		],
		averageIncome: 2,
		qualityOfLife: 4,
	},
	{
		nationId: 'nat_mbuti',
		socialClass: 'free_peasants',
		typicalDiet: ['game', 'honey', 'mushrooms', 'wild_yam', 'caterpillars'],
		housing: 'Mongulu (dome-shaped leaf hut) built in hours',
		clothing: 'Bark cloth, leaves, minimal ornaments',
		workType: 'Net hunting, honey gathering, foraging, Bantu trade',
		leisureActivities: [
			'polyphonic_singing',
			'molimo_ceremony',
			'dance',
			'storytelling',
		],
		averageIncome: 2,
		qualityOfLife: 4,
	},
	{
		nationId: 'nat_igbo',
		socialClass: 'artisans',
		typicalDiet: ['yam', 'palm_oil', 'cassava', 'fish', 'palm_wine'],
		housing: 'Compound of rooms around courtyard, mud walls, thatched roof',
		clothing: 'Isiagu tunic, woven wrapper, ivory and bronze ornaments',
		workType: 'Bronze casting, farming, trade, palm oil processing',
		leisureActivities: [
			'masquerade_dance',
			'wrestling',
			'storytelling',
			'music',
		],
		averageIncome: 12,
		qualityOfLife: 5,
	},
	{
		nationId: 'nat_chukchi',
		socialClass: 'free_peasants',
		typicalDiet: [
			'reindeer_meat',
			'walrus_meat',
			'seal_fat',
			'roots',
			'berries',
		],
		housing: 'Yaranga (large conical reindeer-hide tent)',
		clothing: 'Kuhlianka (reindeer-hide suit), sealskin boots, fur gloves',
		workType: 'Reindeer herding, walrus and whale hunting, ivory carving',
		leisureActivities: [
			'drum_dance',
			'storytelling',
			'ivory_carving',
			'reindeer_racing',
		],
		averageIncome: 3,
		qualityOfLife: 3,
	},
]
