import type { NationLanguage } from '../../../shared/src/types/world'

// ============================================================================
// Langues par nation — An 1000
// ============================================================================

export const nationLanguages: NationLanguage[] = [
	// ========================================================================
	// EUROPE OCCIDENTALE
	// ========================================================================
	{
		nationId: 'nat_hre',
		officialLanguageId: 'lang_latin',
		spokenLanguages: [
			{ languageId: 'lang_old_high_german', percentage: 0.7 },
			{ languageId: 'lang_latin', percentage: 0.05 },
			{ languageId: 'lang_old_italian', percentage: 0.12 },
			{ languageId: 'lang_old_slavonic', percentage: 0.1 },
			{ languageId: 'lang_old_french', percentage: 0.03 },
		],
		literacyRate: 0.05,
	},
	{
		nationId: 'nat_france',
		officialLanguageId: 'lang_latin',
		spokenLanguages: [
			{ languageId: 'lang_old_french', percentage: 0.6 },
			{ languageId: 'lang_old_occitan', percentage: 0.3 },
			{ languageId: 'lang_latin', percentage: 0.05 },
			{ languageId: 'lang_old_norse', percentage: 0.03 },
		],
		literacyRate: 0.04,
	},
	{
		nationId: 'nat_england',
		officialLanguageId: 'lang_latin',
		spokenLanguages: [
			{ languageId: 'lang_old_english', percentage: 0.8 },
			{ languageId: 'lang_old_norse', percentage: 0.12 },
			{ languageId: 'lang_latin', percentage: 0.05 },
			{ languageId: 'lang_old_french', percentage: 0.03 },
		],
		literacyRate: 0.04,
	},
	{
		nationId: 'nat_scotland',
		officialLanguageId: 'lang_latin',
		spokenLanguages: [
			{ languageId: 'lang_old_irish', percentage: 0.65 },
			{ languageId: 'lang_old_english', percentage: 0.2 },
			{ languageId: 'lang_old_norse', percentage: 0.1 },
			{ languageId: 'lang_latin', percentage: 0.03 },
		],
		literacyRate: 0.03,
	},
	{
		nationId: 'nat_papal',
		officialLanguageId: 'lang_latin',
		spokenLanguages: [
			{ languageId: 'lang_old_italian', percentage: 0.8 },
			{ languageId: 'lang_latin', percentage: 0.15 },
		],
		literacyRate: 0.12,
	},
	{
		nationId: 'nat_venice',
		officialLanguageId: 'lang_latin',
		spokenLanguages: [
			{ languageId: 'lang_old_italian', percentage: 0.85 },
			{ languageId: 'lang_latin', percentage: 0.08 },
			{ languageId: 'lang_greek_medieval', percentage: 0.04 },
			{ languageId: 'lang_classical_arabic', percentage: 0.03 },
		],
		literacyRate: 0.15,
	},

	// ========================================================================
	// IBÉRIE
	// ========================================================================
	{
		nationId: 'nat_leon',
		officialLanguageId: 'lang_latin',
		spokenLanguages: [
			{ languageId: 'lang_romance_iberian', percentage: 0.85 },
			{ languageId: 'lang_latin', percentage: 0.05 },
			{ languageId: 'lang_classical_arabic', percentage: 0.08 },
		],
		literacyRate: 0.04,
	},
	{
		nationId: 'nat_navarre',
		officialLanguageId: 'lang_latin',
		spokenLanguages: [
			{ languageId: 'lang_romance_iberian', percentage: 0.8 },
			{ languageId: 'lang_latin', percentage: 0.05 },
		],
		literacyRate: 0.03,
	},
	{
		nationId: 'nat_cordoba',
		officialLanguageId: 'lang_classical_arabic',
		spokenLanguages: [
			{ languageId: 'lang_classical_arabic', percentage: 0.55 },
			{ languageId: 'lang_romance_iberian', percentage: 0.3 },
			{ languageId: 'lang_berber', percentage: 0.1 },
			{ languageId: 'lang_hebrew', percentage: 0.05 },
		],
		literacyRate: 0.2,
	},

	// ========================================================================
	// SCANDINAVIE
	// ========================================================================
	{
		nationId: 'nat_denmark',
		officialLanguageId: 'lang_old_norse',
		spokenLanguages: [
			{ languageId: 'lang_old_norse', percentage: 0.92 },
			{ languageId: 'lang_old_english', percentage: 0.05 },
			{ languageId: 'lang_latin', percentage: 0.02 },
		],
		literacyRate: 0.03,
	},
	{
		nationId: 'nat_norway',
		officialLanguageId: 'lang_old_norse',
		spokenLanguages: [
			{ languageId: 'lang_old_norse', percentage: 0.96 },
			{ languageId: 'lang_old_irish', percentage: 0.02 },
		],
		literacyRate: 0.02,
	},
	{
		nationId: 'nat_sweden',
		officialLanguageId: 'lang_old_norse',
		spokenLanguages: [
			{ languageId: 'lang_old_norse', percentage: 0.95 },
			{ languageId: 'lang_old_slavonic', percentage: 0.03 },
		],
		literacyRate: 0.02,
	},

	// ========================================================================
	// EUROPE ORIENTALE
	// ========================================================================
	{
		nationId: 'nat_poland',
		officialLanguageId: 'lang_latin',
		spokenLanguages: [
			{ languageId: 'lang_old_polish', percentage: 0.9 },
			{ languageId: 'lang_latin', percentage: 0.04 },
			{ languageId: 'lang_old_high_german', percentage: 0.04 },
		],
		literacyRate: 0.03,
	},
	{
		nationId: 'nat_hungary',
		officialLanguageId: 'lang_latin',
		spokenLanguages: [
			{ languageId: 'lang_old_hungarian', percentage: 0.8 },
			{ languageId: 'lang_old_slavonic', percentage: 0.1 },
			{ languageId: 'lang_latin', percentage: 0.05 },
			{ languageId: 'lang_old_high_german', percentage: 0.05 },
		],
		literacyRate: 0.03,
	},
	{
		nationId: 'nat_kievan_rus',
		officialLanguageId: 'lang_old_slavonic',
		spokenLanguages: [
			{ languageId: 'lang_old_slavonic', percentage: 0.85 },
			{ languageId: 'lang_old_norse', percentage: 0.05 },
			{ languageId: 'lang_old_turkic', percentage: 0.05 },
			{ languageId: 'lang_greek_medieval', percentage: 0.03 },
		],
		literacyRate: 0.04,
	},
	{
		nationId: 'nat_volga_bulgaria',
		officialLanguageId: 'lang_old_turkic',
		spokenLanguages: [
			{ languageId: 'lang_old_turkic', percentage: 0.7 },
			{ languageId: 'lang_old_slavonic', percentage: 0.15 },
			{ languageId: 'lang_classical_arabic', percentage: 0.1 },
		],
		literacyRate: 0.05,
	},
	{
		nationId: 'nat_croatia',
		officialLanguageId: 'lang_latin',
		spokenLanguages: [
			{ languageId: 'lang_old_slavonic', percentage: 0.88 },
			{ languageId: 'lang_latin', percentage: 0.06 },
			{ languageId: 'lang_old_italian', percentage: 0.04 },
		],
		literacyRate: 0.04,
	},

	// ========================================================================
	// BYZANCE
	// ========================================================================
	{
		nationId: 'nat_byzantine',
		officialLanguageId: 'lang_greek_medieval',
		spokenLanguages: [
			{ languageId: 'lang_greek_medieval', percentage: 0.65 },
			{ languageId: 'lang_old_slavonic', percentage: 0.1 },
			{ languageId: 'lang_classical_arabic', percentage: 0.08 },
			{ languageId: 'lang_latin', percentage: 0.05 },
			{ languageId: 'lang_old_turkic', percentage: 0.05 },
			{ languageId: 'lang_coptic', percentage: 0.04 },
		],
		literacyRate: 0.15,
	},

	// ========================================================================
	// MONDE ISLAMIQUE
	// ========================================================================
	{
		nationId: 'nat_fatimid',
		officialLanguageId: 'lang_classical_arabic',
		spokenLanguages: [
			{ languageId: 'lang_classical_arabic', percentage: 0.55 },
			{ languageId: 'lang_coptic', percentage: 0.25 },
			{ languageId: 'lang_berber', percentage: 0.12 },
			{ languageId: 'lang_hebrew', percentage: 0.05 },
		],
		literacyRate: 0.15,
	},
	{
		nationId: 'nat_buyid',
		officialLanguageId: 'lang_classical_arabic',
		spokenLanguages: [
			{ languageId: 'lang_classical_arabic', percentage: 0.4 },
			{ languageId: 'lang_persian', percentage: 0.45 },
			{ languageId: 'lang_old_turkic', percentage: 0.08 },
			{ languageId: 'lang_hebrew', percentage: 0.03 },
		],
		literacyRate: 0.12,
	},
	{
		nationId: 'nat_ghaznavid',
		officialLanguageId: 'lang_persian',
		spokenLanguages: [
			{ languageId: 'lang_persian', percentage: 0.4 },
			{ languageId: 'lang_old_turkic', percentage: 0.25 },
			{ languageId: 'lang_hindi_prakrits', percentage: 0.2 },
			{ languageId: 'lang_classical_arabic', percentage: 0.1 },
		],
		literacyRate: 0.08,
	},
	{
		nationId: 'nat_karakhanid',
		officialLanguageId: 'lang_old_turkic',
		spokenLanguages: [
			{ languageId: 'lang_old_turkic', percentage: 0.65 },
			{ languageId: 'lang_persian', percentage: 0.15 },
			{ languageId: 'lang_classical_arabic', percentage: 0.1 },
			{ languageId: 'lang_middle_chinese', percentage: 0.05 },
		],
		literacyRate: 0.06,
	},

	// ========================================================================
	// ASIE ORIENTALE
	// ========================================================================
	{
		nationId: 'nat_song',
		officialLanguageId: 'lang_middle_chinese',
		spokenLanguages: [
			{ languageId: 'lang_middle_chinese', percentage: 0.92 },
			{ languageId: 'lang_tibetan', percentage: 0.03 },
			{ languageId: 'lang_classical_arabic', percentage: 0.02 },
		],
		literacyRate: 0.25,
	},
	{
		nationId: 'nat_liao',
		officialLanguageId: 'lang_middle_chinese',
		spokenLanguages: [
			{ languageId: 'lang_old_turkic', percentage: 0.45 },
			{ languageId: 'lang_middle_chinese', percentage: 0.4 },
			{ languageId: 'lang_korean', percentage: 0.08 },
		],
		literacyRate: 0.08,
	},
	{
		nationId: 'nat_goryeo',
		officialLanguageId: 'lang_korean',
		spokenLanguages: [
			{ languageId: 'lang_korean', percentage: 0.92 },
			{ languageId: 'lang_middle_chinese', percentage: 0.06 },
		],
		literacyRate: 0.12,
	},
	{
		nationId: 'nat_japan',
		officialLanguageId: 'lang_old_japanese',
		spokenLanguages: [
			{ languageId: 'lang_old_japanese', percentage: 0.95 },
			{ languageId: 'lang_middle_chinese', percentage: 0.04 },
		],
		literacyRate: 0.12,
	},

	// ========================================================================
	// ASIE DU SUD-EST
	// ========================================================================
	{
		nationId: 'nat_dai_viet',
		officialLanguageId: 'lang_middle_chinese',
		spokenLanguages: [
			{ languageId: 'lang_proto_thai', percentage: 0.8 },
			{ languageId: 'lang_middle_chinese', percentage: 0.15 },
		],
		literacyRate: 0.06,
	},
	{
		nationId: 'nat_khmer',
		officialLanguageId: 'lang_khmer',
		spokenLanguages: [
			{ languageId: 'lang_khmer', percentage: 0.85 },
			{ languageId: 'lang_sanskrit', percentage: 0.08 },
			{ languageId: 'lang_malay', percentage: 0.05 },
		],
		literacyRate: 0.05,
	},
	{
		nationId: 'nat_srivijaya',
		officialLanguageId: 'lang_malay',
		spokenLanguages: [
			{ languageId: 'lang_malay', percentage: 0.55 },
			{ languageId: 'lang_javanese', percentage: 0.25 },
			{ languageId: 'lang_sanskrit', percentage: 0.1 },
			{ languageId: 'lang_tamil', percentage: 0.05 },
			{ languageId: 'lang_classical_arabic', percentage: 0.05 },
		],
		literacyRate: 0.06,
	},

	// ========================================================================
	// ASIE DU SUD
	// ========================================================================
	{
		nationId: 'nat_chola',
		officialLanguageId: 'lang_tamil',
		spokenLanguages: [
			{ languageId: 'lang_tamil', percentage: 0.75 },
			{ languageId: 'lang_kannada', percentage: 0.1 },
			{ languageId: 'lang_sanskrit', percentage: 0.08 },
			{ languageId: 'lang_malay', percentage: 0.04 },
		],
		literacyRate: 0.08,
	},
	{
		nationId: 'nat_chalukya',
		officialLanguageId: 'lang_kannada',
		spokenLanguages: [
			{ languageId: 'lang_kannada', percentage: 0.7 },
			{ languageId: 'lang_tamil', percentage: 0.1 },
			{ languageId: 'lang_sanskrit', percentage: 0.1 },
			{ languageId: 'lang_hindi_prakrits', percentage: 0.08 },
		],
		literacyRate: 0.06,
	},
	{
		nationId: 'nat_pala',
		officialLanguageId: 'lang_sanskrit',
		spokenLanguages: [
			{ languageId: 'lang_hindi_prakrits', percentage: 0.7 },
			{ languageId: 'lang_sanskrit', percentage: 0.15 },
			{ languageId: 'lang_tibetan', percentage: 0.05 },
		],
		literacyRate: 0.07,
	},

	// ========================================================================
	// AFRIQUE
	// ========================================================================
	{
		nationId: 'nat_ghana',
		officialLanguageId: 'lang_soninke',
		spokenLanguages: [
			{ languageId: 'lang_soninke', percentage: 0.6 },
			{ languageId: 'lang_classical_arabic', percentage: 0.2 },
			{ languageId: 'lang_berber', percentage: 0.15 },
		],
		literacyRate: 0.05,
	},
	{
		nationId: 'nat_kanem',
		officialLanguageId: 'lang_kanuri',
		spokenLanguages: [
			{ languageId: 'lang_kanuri', percentage: 0.7 },
			{ languageId: 'lang_classical_arabic', percentage: 0.15 },
			{ languageId: 'lang_berber', percentage: 0.1 },
		],
		literacyRate: 0.04,
	},
	{
		nationId: 'nat_ethiopia',
		officialLanguageId: 'lang_amharic',
		spokenLanguages: [
			{ languageId: 'lang_amharic', percentage: 0.55 },
			{ languageId: 'lang_classical_arabic', percentage: 0.1 },
			{ languageId: 'lang_hebrew', percentage: 0.05 },
		],
		literacyRate: 0.05,
	},
	{
		nationId: 'nat_swahili_cities',
		officialLanguageId: 'lang_swahili_proto',
		spokenLanguages: [
			{ languageId: 'lang_swahili_proto', percentage: 0.6 },
			{ languageId: 'lang_classical_arabic', percentage: 0.25 },
			{ languageId: 'lang_tamil', percentage: 0.05 },
		],
		literacyRate: 0.06,
	},

	// ========================================================================
	// AMÉRIQUES
	// ========================================================================
	{
		nationId: 'nat_toltec',
		officialLanguageId: 'lang_nahuatl',
		spokenLanguages: [
			{ languageId: 'lang_nahuatl', percentage: 0.8 },
			{ languageId: 'lang_maya', percentage: 0.15 },
		],
		literacyRate: 0.02,
	},
	{
		nationId: 'nat_maya_states',
		officialLanguageId: 'lang_maya',
		spokenLanguages: [
			{ languageId: 'lang_maya', percentage: 0.9 },
			{ languageId: 'lang_nahuatl', percentage: 0.08 },
		],
		literacyRate: 0.04,
	},
	{
		nationId: 'nat_mississippian',
		officialLanguageId: 'lang_nahuatl',
		spokenLanguages: [{ languageId: 'lang_nahuatl', percentage: 0.95 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_wari',
		officialLanguageId: 'lang_quechua',
		spokenLanguages: [{ languageId: 'lang_quechua', percentage: 0.85 }],
		literacyRate: 0.0,
	},

	// ========================================================================
	// ASIE CENTRALE
	// ========================================================================
	{
		nationId: 'nat_tibet',
		officialLanguageId: 'lang_tibetan',
		spokenLanguages: [
			{ languageId: 'lang_tibetan', percentage: 0.85 },
			{ languageId: 'lang_sanskrit', percentage: 0.08 },
			{ languageId: 'lang_middle_chinese', percentage: 0.05 },
		],
		literacyRate: 0.08,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 1
	// ========================================================================
	{
		nationId: 'nat_puebloans',
		officialLanguageId: 'lang_puebloan',
		spokenLanguages: [{ languageId: 'lang_puebloan', percentage: 0.95 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_haida',
		officialLanguageId: 'lang_haida',
		spokenLanguages: [{ languageId: 'lang_haida', percentage: 0.95 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_thule',
		officialLanguageId: 'lang_inuktitut_proto',
		spokenLanguages: [{ languageId: 'lang_inuktitut_proto', percentage: 0.95 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_tui_tonga',
		officialLanguageId: 'lang_tongan',
		spokenLanguages: [{ languageId: 'lang_tongan', percentage: 0.95 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_aboriginal',
		officialLanguageId: 'lang_aboriginal_australian',
		spokenLanguages: [
			{ languageId: 'lang_aboriginal_australian', percentage: 0.95 },
		],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_sami',
		officialLanguageId: 'lang_sami',
		spokenLanguages: [
			{ languageId: 'lang_sami', percentage: 0.9 },
			{ languageId: 'lang_old_norse', percentage: 0.08 },
		],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_mapuche',
		officialLanguageId: 'lang_mapudungun',
		spokenLanguages: [{ languageId: 'lang_mapudungun', percentage: 0.95 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_malagasy',
		officialLanguageId: 'lang_malagasy',
		spokenLanguages: [
			{ languageId: 'lang_malagasy', percentage: 0.85 },
			{ languageId: 'lang_classical_arabic', percentage: 0.08 },
		],
		literacyRate: 0.02,
	},
	{
		nationId: 'nat_yoruba',
		officialLanguageId: 'lang_yoruba',
		spokenLanguages: [{ languageId: 'lang_yoruba', percentage: 0.92 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_zimbabwe',
		officialLanguageId: 'lang_shona_proto',
		spokenLanguages: [{ languageId: 'lang_shona_proto', percentage: 0.9 }],
		literacyRate: 0.0,
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 2
	// ========================================================================
	{
		nationId: 'nat_chimu',
		officialLanguageId: 'lang_mochica',
		spokenLanguages: [
			{ languageId: 'lang_mochica', percentage: 0.85 },
			{ languageId: 'lang_quechua', percentage: 0.1 },
		],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_muisca',
		officialLanguageId: 'lang_muisca',
		spokenLanguages: [{ languageId: 'lang_muisca', percentage: 0.95 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_guarani',
		officialLanguageId: 'lang_guarani',
		spokenLanguages: [{ languageId: 'lang_guarani', percentage: 0.95 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_hawaii',
		officialLanguageId: 'lang_hawaiian',
		spokenLanguages: [{ languageId: 'lang_hawaiian', percentage: 1.0 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_ainu',
		officialLanguageId: 'lang_ainu',
		spokenLanguages: [
			{ languageId: 'lang_ainu', percentage: 0.9 },
			{ languageId: 'lang_old_japanese', percentage: 0.05 },
		],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_makuria',
		officialLanguageId: 'lang_old_nubian',
		spokenLanguages: [
			{ languageId: 'lang_old_nubian', percentage: 0.8 },
			{ languageId: 'lang_coptic', percentage: 0.1 },
			{ languageId: 'lang_classical_arabic', percentage: 0.08 },
		],
		literacyRate: 0.1,
	},
	{
		nationId: 'nat_tuareg',
		officialLanguageId: 'lang_berber',
		spokenLanguages: [
			{ languageId: 'lang_berber', percentage: 0.85 },
			{ languageId: 'lang_classical_arabic', percentage: 0.1 },
		],
		literacyRate: 0.03, // tifinagh limité
	},
	{
		nationId: 'nat_georgia',
		officialLanguageId: 'lang_georgian',
		spokenLanguages: [
			{ languageId: 'lang_georgian', percentage: 0.85 },
			{ languageId: 'lang_greek_medieval', percentage: 0.05 },
			{ languageId: 'lang_armenian', percentage: 0.05 },
		],
		literacyRate: 0.1,
	},
	{
		nationId: 'nat_armenia',
		officialLanguageId: 'lang_armenian',
		spokenLanguages: [
			{ languageId: 'lang_armenian', percentage: 0.9 },
			{ languageId: 'lang_greek_medieval', percentage: 0.04 },
			{ languageId: 'lang_persian', percentage: 0.03 },
		],
		literacyRate: 0.12, // tradition littéraire ancienne
	},

	// ========================================================================
	// PEUPLES AUTOCHTONES ET MARGINALISÉS — TIER 3
	// ========================================================================
	{
		nationId: 'nat_hohokam',
		officialLanguageId: 'lang_oodham',
		spokenLanguages: [{ languageId: 'lang_oodham', percentage: 0.95 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_dorset',
		officialLanguageId: 'lang_dorset_paleo',
		spokenLanguages: [{ languageId: 'lang_dorset_paleo', percentage: 1.0 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_beothuk',
		officialLanguageId: 'lang_beothuk',
		spokenLanguages: [{ languageId: 'lang_beothuk', percentage: 1.0 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_dene',
		officialLanguageId: 'lang_dene',
		spokenLanguages: [{ languageId: 'lang_dene', percentage: 0.95 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_mikmaq',
		officialLanguageId: 'lang_mikmaq',
		spokenLanguages: [{ languageId: 'lang_mikmaq', percentage: 0.95 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_papuan',
		officialLanguageId: 'lang_papuan',
		spokenLanguages: [{ languageId: 'lang_papuan', percentage: 0.95 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_fiji',
		officialLanguageId: 'lang_fijian',
		spokenLanguages: [{ languageId: 'lang_fijian', percentage: 0.95 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_chamorro',
		officialLanguageId: 'lang_chamorro',
		spokenLanguages: [{ languageId: 'lang_chamorro', percentage: 1.0 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_guanche',
		officialLanguageId: 'lang_guanche',
		spokenLanguages: [{ languageId: 'lang_guanche', percentage: 1.0 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_san',
		officialLanguageId: 'lang_san_khoisan',
		spokenLanguages: [{ languageId: 'lang_san_khoisan', percentage: 1.0 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_mbuti',
		officialLanguageId: 'lang_mbuti',
		spokenLanguages: [{ languageId: 'lang_mbuti', percentage: 0.95 }],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_igbo',
		officialLanguageId: 'lang_igbo',
		spokenLanguages: [
			{ languageId: 'lang_igbo', percentage: 0.9 },
			{ languageId: 'lang_yoruba', percentage: 0.05 },
		],
		literacyRate: 0.0,
	},
	{
		nationId: 'nat_chukchi',
		officialLanguageId: 'lang_chukchi',
		spokenLanguages: [{ languageId: 'lang_chukchi', percentage: 1.0 }],
		literacyRate: 0.0,
	},
]
