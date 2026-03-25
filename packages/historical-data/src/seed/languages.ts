import type { Language } from '../../../shared/src/types/world'

// ============================================================================
// Langues du monde — An 1000
// ============================================================================
// speakerCount : estimation très approximative du nombre de locuteurs
// isLingua_franca : langue de commerce, diplomatie ou religion supra-nationale
// ============================================================================

export const languages: Language[] = [
	// --- Indo-européennes ---
	{
		id: 'lang_latin',
		name: 'Latin (médiéval)',
		family: 'indo_european',
		script: 'latin',
		speakerCount: 0, // langue savante, pas de locuteurs natifs
		isLingua_franca: true, // lingua franca de l'Église et des lettrés d'Europe
	},
	{
		id: 'lang_old_french',
		name: "Ancien français (langue d'oïl)",
		family: 'indo_european',
		script: 'latin',
		speakerCount: 6_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_old_occitan',
		name: "Ancien occitan (langue d'oc)",
		family: 'indo_european',
		script: 'latin',
		speakerCount: 4_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_old_english',
		name: 'Vieil anglais',
		family: 'indo_european',
		script: 'latin',
		speakerCount: 2_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_old_norse',
		name: 'Vieux norrois',
		family: 'indo_european',
		script: 'runic',
		speakerCount: 1_500_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_old_high_german',
		name: 'Ancien haut-allemand',
		family: 'indo_european',
		script: 'latin',
		speakerCount: 5_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_old_slavonic',
		name: 'Vieux-slave (slavon)',
		family: 'indo_european',
		script: 'cyrillic',
		speakerCount: 8_000_000, // comprend les dialectes slaves orientaux
		isLingua_franca: true, // liturgie orthodoxe slave
	},
	{
		id: 'lang_greek_medieval',
		name: 'Grec médiéval',
		family: 'indo_european',
		script: 'greek',
		speakerCount: 7_000_000,
		isLingua_franca: true, // langue de l'Empire byzantin
	},
	{
		id: 'lang_old_irish',
		name: 'Vieil irlandais',
		family: 'indo_european',
		script: 'latin',
		speakerCount: 500_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_romance_iberian',
		name: 'Langues romanes ibériques (castillan, léonais, etc.)',
		family: 'indo_european',
		script: 'latin',
		speakerCount: 4_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_old_italian',
		name: 'Italien proto-roman (dialectes)',
		family: 'indo_european',
		script: 'latin',
		speakerCount: 5_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_persian',
		name: 'Persan (farsi classique)',
		family: 'indo_european',
		script: 'arabic',
		speakerCount: 10_000_000,
		isLingua_franca: true, // langue de cour des Ghaznavides, Buyides
	},
	{
		id: 'lang_sanskrit',
		name: 'Sanskrit',
		family: 'indo_european',
		script: 'devanagari',
		speakerCount: 0, // langue savante / liturgique
		isLingua_franca: true, // liturgie hindoue et bouddhiste
	},
	{
		id: 'lang_hindi_prakrits',
		name: 'Prakrits / Proto-hindi',
		family: 'indo_european',
		script: 'devanagari',
		speakerCount: 30_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_old_polish',
		name: 'Ancien polonais',
		family: 'indo_european',
		script: 'latin',
		speakerCount: 1_500_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_old_hungarian',
		name: 'Ancien hongrois',
		family: 'uralic',
		script: 'latin',
		speakerCount: 1_000_000,
		isLingua_franca: false,
	},

	// --- Afro-asiatiques ---
	{
		id: 'lang_classical_arabic',
		name: 'Arabe classique',
		family: 'afro_asiatic',
		script: 'arabic',
		speakerCount: 25_000_000,
		isLingua_franca: true, // lingua franca du monde islamique
	},
	{
		id: 'lang_hebrew',
		name: 'Hébreu (liturgique)',
		family: 'afro_asiatic',
		script: 'hebrew',
		speakerCount: 0, // liturgique uniquement
		isLingua_franca: false,
	},
	{
		id: 'lang_coptic',
		name: 'Copte',
		family: 'afro_asiatic',
		script: 'greek', // alphabet copte dérivé du grec
		speakerCount: 3_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_amharic',
		name: 'Guèze / Proto-amharique',
		family: 'afro_asiatic',
		script: 'ethiopic',
		speakerCount: 2_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_berber',
		name: 'Langues berbères',
		family: 'afro_asiatic',
		script: 'none', // tradition orale, parfois tifinagh
		speakerCount: 5_000_000,
		isLingua_franca: false,
	},

	// --- Sino-tibétaines ---
	{
		id: 'lang_middle_chinese',
		name: 'Chinois moyen',
		family: 'sino_tibetan',
		script: 'chinese',
		speakerCount: 60_000_000, // Song + populations sinisées
		isLingua_franca: true, // lingua franca d'Asie orientale
	},
	{
		id: 'lang_tibetan',
		name: 'Tibétain',
		family: 'sino_tibetan',
		script: 'tibetan',
		speakerCount: 3_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_burmese',
		name: 'Birman',
		family: 'sino_tibetan',
		script: 'none', // script birman pas encore dans notre enum
		speakerCount: 2_000_000,
		isLingua_franca: false,
	},

	// --- Turkiques ---
	{
		id: 'lang_old_turkic',
		name: 'Vieux-turc (Karakhanide)',
		family: 'turkic',
		script: 'arabic', // arabisé après conversion à l'islam
		speakerCount: 5_000_000,
		isLingua_franca: false,
	},

	// --- Japonique & Coréanique ---
	{
		id: 'lang_old_japanese',
		name: 'Japonais ancien (Heian)',
		family: 'japonic',
		script: 'japanese',
		speakerCount: 6_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_korean',
		name: 'Coréen (Goryeo)',
		family: 'koreanic',
		script: 'chinese', // utilise les caractères chinois avant le hangul
		speakerCount: 4_000_000,
		isLingua_franca: false,
	},

	// --- Dravidiennes ---
	{
		id: 'lang_tamil',
		name: 'Tamoul',
		family: 'dravidian',
		script: 'tamil',
		speakerCount: 10_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_kannada',
		name: 'Kannada',
		family: 'dravidian',
		script: 'devanagari', // script kannada, approximé
		speakerCount: 5_000_000,
		isLingua_franca: false,
	},

	// --- Austronésiennes ---
	{
		id: 'lang_malay',
		name: 'Malais (Srivijaya)',
		family: 'austronesian',
		script: 'none', // scripts indiens locaux
		speakerCount: 8_000_000,
		isLingua_franca: true, // lingua franca de l'archipel
	},
	{
		id: 'lang_javanese',
		name: 'Javanais',
		family: 'austronesian',
		script: 'none',
		speakerCount: 5_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_khmer',
		name: 'Khmer',
		family: 'austronesian', // en réalité austroasiatique, mais approximé
		script: 'khmer',
		speakerCount: 4_000_000,
		isLingua_franca: false,
	},

	// --- Niger-Congo ---
	{
		id: 'lang_soninke',
		name: 'Soninké (Ghana)',
		family: 'niger_congo',
		script: 'none',
		speakerCount: 2_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_swahili_proto',
		name: 'Proto-swahili',
		family: 'niger_congo',
		script: 'none',
		speakerCount: 1_000_000,
		isLingua_franca: true, // commerce côte est-africaine
	},
	{
		id: 'lang_yoruba',
		name: 'Yoruba',
		family: 'niger_congo',
		script: 'none',
		speakerCount: 3_000_000,
		isLingua_franca: false,
	},

	// --- Nilo-sahariennes ---
	{
		id: 'lang_kanuri',
		name: 'Kanouri (Kanem)',
		family: 'nilo_saharan',
		script: 'none',
		speakerCount: 1_500_000,
		isLingua_franca: false,
	},

	// --- Tai-Kadai ---
	{
		id: 'lang_proto_thai',
		name: 'Proto-thaï',
		family: 'tai_kadai',
		script: 'none',
		speakerCount: 3_000_000,
		isLingua_franca: false,
	},

	// --- Amérique ---
	{
		id: 'lang_nahuatl',
		name: 'Nahuatl classique (Toltèque)',
		family: 'other', // uto-aztèque
		script: 'none', // pictogrammes
		speakerCount: 3_000_000,
		isLingua_franca: true, // lingua franca de Mésoamérique
	},
	{
		id: 'lang_maya',
		name: 'Langues mayas',
		family: 'mayan',
		script: 'maya_glyphs',
		speakerCount: 4_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_quechua',
		name: 'Proto-quechua',
		family: 'quechuan',
		script: 'none',
		speakerCount: 2_000_000,
		isLingua_franca: false,
	},

	// --- Peuples Tier 1 (ajouts) ---
	{
		id: 'lang_puebloan',
		name: 'Langues puebloanes (Keresan / Tanoan)',
		family: 'other',
		script: 'none',
		speakerCount: 100_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_haida',
		name: 'Haida (isolat)',
		family: 'other',
		script: 'none',
		speakerCount: 15_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_inuktitut_proto',
		name: 'Proto-inuktitut (Thulé)',
		family: 'other', // eskimo-aléoute
		script: 'none',
		speakerCount: 30_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_tongan',
		name: 'Tongien (proto-polynésien)',
		family: 'austronesian',
		script: 'none',
		speakerCount: 60_000,
		isLingua_franca: true, // lingua franca de la Polynésie occidentale
	},
	{
		id: 'lang_aboriginal_australian',
		name: 'Langues aborigènes australiennes (Pama-Nyungan)',
		family: 'other',
		script: 'none',
		speakerCount: 300_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_sami',
		name: 'Same (proto-sami)',
		family: 'uralic',
		script: 'none',
		speakerCount: 40_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_mapudungun',
		name: 'Mapudungun',
		family: 'other', // isolat / araucan
		script: 'none',
		speakerCount: 500_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_malagasy',
		name: 'Proto-malgache',
		family: 'austronesian',
		script: 'none',
		speakerCount: 200_000,
		isLingua_franca: true, // lingua franca de Madagascar
	},
	{
		id: 'lang_shona_proto',
		name: 'Proto-shona (bantou)',
		family: 'other', // bantou
		script: 'none',
		speakerCount: 300_000,
		isLingua_franca: false,
	},

	// --- Peuples Tier 2 (ajouts) ---
	{
		id: 'lang_mochica',
		name: 'Quingnam / Mochica (Chimú)',
		family: 'other', // isolat
		script: 'none',
		speakerCount: 500_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_muisca',
		name: 'Muisca cubun (chibcha)',
		family: 'other', // chibcha
		script: 'none',
		speakerCount: 300_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_guarani',
		name: 'Guaraní (tupi-guaraní)',
		family: 'other', // tupi
		script: 'none',
		speakerCount: 1_000_000,
		isLingua_franca: true, // lingua franca du bassin du Paraná
	},
	{
		id: 'lang_hawaiian',
		name: 'Hawaïen (proto-polynésien oriental)',
		family: 'austronesian',
		script: 'none',
		speakerCount: 50_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_ainu',
		name: 'Aïnou (isolat)',
		family: 'other', // isolat
		script: 'none',
		speakerCount: 60_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_old_nubian',
		name: 'Vieux-nubien',
		family: 'nilo_saharan',
		script: 'greek', // alphabet copte/grec adapté
		speakerCount: 500_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_georgian',
		name: 'Géorgien (kartvelien)',
		family: 'other', // kartvélien
		script: 'other', // alphabet mkhedruli
		speakerCount: 2_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_armenian',
		name: 'Arménien classique',
		family: 'indo_european',
		script: 'other', // alphabet arménien
		speakerCount: 3_000_000,
		isLingua_franca: false,
	},

	// --- Peuples Tier 3 (ajouts) ---
	{
		id: 'lang_oodham',
		name: "O'odham / Proto-piman (Hohokam)",
		family: 'other', // uto-aztèque
		script: 'none',
		speakerCount: 50_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_dorset_paleo',
		name: 'Paléo-esquimau (Dorset)',
		family: 'other', // paléo-eskimo
		script: 'none',
		speakerCount: 5_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_beothuk',
		name: 'Béothuk (isolat)',
		family: 'other', // isolat
		script: 'none',
		speakerCount: 3_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_dene',
		name: 'Langues dénées (athapascan)',
		family: 'other', // na-déné
		script: 'none',
		speakerCount: 50_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_mikmaq',
		name: "Mi'kmaq (algonquien)",
		family: 'other', // algonquien
		script: 'none',
		speakerCount: 20_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_papuan',
		name: 'Langues papoues (trans-Nouvelle-Guinée)',
		family: 'other', // trans-Nouvelle-Guinée
		script: 'none',
		speakerCount: 1_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_fijian',
		name: 'Fidjien (austronésien)',
		family: 'austronesian',
		script: 'none',
		speakerCount: 100_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_chamorro',
		name: 'Chamorro (austronésien)',
		family: 'austronesian',
		script: 'none',
		speakerCount: 30_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_guanche',
		name: 'Guanche (proto-berbère insulaire)',
		family: 'afro_asiatic', // berbère
		script: 'none',
		speakerCount: 80_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_san_khoisan',
		name: 'Langues San (khoïsan à clics)',
		family: 'other', // khoïsan
		script: 'none',
		speakerCount: 30_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_mbuti',
		name: 'Langues Mbuti (bantou central adopté)',
		family: 'niger_congo', // bantou
		script: 'none',
		speakerCount: 40_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_igbo',
		name: 'Igbo',
		family: 'niger_congo',
		script: 'none',
		speakerCount: 2_000_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_chukchi',
		name: 'Tchouktche (tchouktko-kamtchatke)',
		family: 'other', // tchouktko-kamtchatke
		script: 'none',
		speakerCount: 15_000,
		isLingua_franca: false,
	},
	{
		id: 'lang_manchu',
		name: 'Mandchou',
		family: 'other', // toungouse
		script: 'mongol',
		speakerCount: 3_000_000,
		isLingua_franca: false,
	},
]
