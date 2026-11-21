import { LanguageDetectionResult, SupportedLanguage } from "../types/agent";

// Assamese character ranges and unique characters (ৰ, ৱ)
const ASSAMESE_UNIQUE_CHARS = /[ৰৱ]/;
const BENGALI_ASSAMESE_SCRIPT = /[\u0980-\u09FF]/;
const DEVANAGARI_SCRIPT = /[\u0900-\u097F]/;
const LATIN_SCRIPT = /[a-zA-Z]/;

// Key vocabulary for Romanized/Transliterated Assamese
const ASSAMESE_TRANSLITERATED_KEYWORDS = [
  "apunar", "apuni", "bili", "kat", "hobo", "toka", "korok", "uporot",
  "dibo", "lagibo", "bisari", "mukhyo", "aaji", "rati", "kora", "naamot",
  "porikha", "ekount", "amar", "bondho"
];

// Key vocabulary for Romanized/Transliterated Hindi (Hinglish)
const HINDI_TRANSLITERATED_KEYWORDS = [
  "aapka", "aapke", "karein", "hoga", "raat", "turant", "sampark",
  "kare", "bijli", "khata", "paise", "milega", "kijiye", "bheje", "adhikari"
];

export function detectLanguage(text: string): LanguageDetectionResult {
  const clean = text.trim();
  const detectedScripts: string[] = [];

  const hasBengaliAssamese = BENGALI_ASSAMESE_SCRIPT.test(clean);
  const hasDevanagari = DEVANAGARI_SCRIPT.test(clean);
  const hasLatin = LATIN_SCRIPT.test(clean);
  const hasAssameseUnique = ASSAMESE_UNIQUE_CHARS.test(clean);

  if (hasBengaliAssamese) detectedScripts.push("Bengali-Assamese (অসমীয়া)");
  if (hasDevanagari) detectedScripts.push("Devanagari (देवनागरी)");
  if (hasLatin) detectedScripts.push("Latin / Roman Script");

  const isMixedLanguage = detectedScripts.length > 1;
  const lower = clean.toLowerCase();

  // 1. Native Script Assamese Check
  if (hasBengaliAssamese) {
    const isExplicitAssamese = hasAssameseUnique || lower.includes("আপোনাৰ") || lower.includes("বিদ্যুৎ") || lower.includes("কৰক") || lower.includes("হ'ব");
    return {
      detectedLanguage: "as",
      languageName: "অসমীয়া (Assamese)",
      confidence: isExplicitAssamese ? 0.98 : 0.85,
      isMixedLanguage,
      detectedScripts,
      regionalContextNotes: "Assamese script and linguistic patterns identified. Regional advisory mapped to Assam Power Distribution (APDCL) and North East cyber cell.",
    };
  }

  // 2. Native Script Hindi Check
  if (hasDevanagari) {
    return {
      detectedLanguage: "hi",
      languageName: "हिन्दी (Hindi)",
      confidence: 0.95,
      isMixedLanguage,
      detectedScripts,
      regionalContextNotes: "Devanagari Hindi script detected. Standard national consumer protection advisories applied.",
    };
  }

  // 3. Transliterated / Romanized Assamese Check
  const assameseKeywordMatches = ASSAMESE_TRANSLITERATED_KEYWORDS.filter(kw => lower.includes(kw));
  if (assameseKeywordMatches.length >= 2) {
    return {
      detectedLanguage: "as",
      languageName: "Assamese (Romanized / অসমীয়া)",
      confidence: 0.88,
      isMixedLanguage: true,
      detectedScripts,
      regionalContextNotes: "Romanized Assamese detected with regional phonetic spellings.",
    };
  }

  // 4. Transliterated Hindi (Hinglish) Check
  const hindiKeywordMatches = HINDI_TRANSLITERATED_KEYWORDS.filter(kw => lower.includes(kw));
  if (hindiKeywordMatches.length >= 2) {
    return {
      detectedLanguage: "hi",
      languageName: "Hinglish (Romanized Hindi)",
      confidence: 0.90,
      isMixedLanguage: true,
      detectedScripts,
      regionalContextNotes: "Hinglish communication detected. Frequently used in SMS phishing campaigns targeting mobile consumers.",
    };
  }

  // Default to English
  return {
    detectedLanguage: "en",
    languageName: "English",
    confidence: 0.96,
    isMixedLanguage,
    detectedScripts,
    regionalContextNotes: "Standard English message structure.",
  };
}
