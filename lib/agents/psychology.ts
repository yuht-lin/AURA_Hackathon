import { PsychologicalTactic } from "../types/agent";

export function analyzePsychology(rawText: string): {
  detectedTactics: PsychologicalTactic[];
  overallManipulationIndex: number;
} {
  const text = rawText;
  const lower = text.toLowerCase();
  const tactics: PsychologicalTactic[] = [];

  // Helper to extract surrounding context/phrase
  function extractPhrase(keyword: string): string {
    const idx = lower.indexOf(keyword.toLowerCase());
    if (idx === -1) return keyword;
    const start = Math.max(0, idx - 15);
    const end = Math.min(text.length, idx + keyword.length + 25);
    return "..." + text.slice(start, end).trim() + "...";
  }

  // 1. Urgency & Time Pressure
  const urgencyKeywords = [
    "tonight at 9:30 pm", "9:30 pm", "immediately", "within 24 hours",
    "within 12 hours", "today itself", "turant", "aaji rati", "লগে লগে", "ৰাতি ৯:৩০"
  ];
  const matchedUrgency = urgencyKeywords.find(k => lower.includes(k));
  if (matchedUrgency) {
    tactics.push({
      category: "Urgency & Time Pressure",
      highlightedPhrase: extractPhrase(matchedUrgency),
      explanation: "Imposes an artificial, non-negotiable countdown to trigger panic and bypass the victim's rational verification process.",
      severity: "CRITICAL",
      recommendedResponse: "Pause immediately. Legitimate utilities and banks never provide overnight deadlines via informal SMS.",
    });
  }

  // 2. Fear & Threats
  const fearKeywords = [
    "disconnected", "cut off", "power will be disconnected", "police", "legal action",
    "arrest", "cbi", "বিজুলীৰ সংযোগ বিচ্ছিন্ন", "काट दी जाएगी"
  ];
  const matchedFear = fearKeywords.find(k => lower.includes(k));
  if (matchedFear) {
    tactics.push({
      category: "Fear & Threats",
      highlightedPhrase: extractPhrase(matchedFear),
      explanation: "Threatens punitive disruption of essential services or legal detention to induce cognitive compliance through fear.",
      severity: "CRITICAL",
      recommendedResponse: "Recognize that government bodies follow structured legal notice procedures, not abrupt threatening SMS messages.",
    });
  }

  // 3. Authority Impersonation
  const authorityKeywords = [
    "electricity office", "electricity officer", "mr. sharma", "sbi customer",
    "india post", "cbi officer", "customs", "বিষয়া শৰ্মা", "बिजली अधिकारी"
  ];
  const matchedAuth = authorityKeywords.find(k => lower.includes(k));
  if (matchedAuth) {
    tactics.push({
      category: "Authority Impersonation",
      highlightedPhrase: extractPhrase(matchedAuth),
      explanation: "Fabricates institutional titles or personal official names to establish unearned authority and discourage questioning.",
      severity: "HIGH",
      recommendedResponse: "Never dial personal numbers provided in messages claiming to represent corporate or government authorities.",
    });
  }

  // 4. Financial Greed & Unrealistic Rewards
  const greedKeywords = [
    "earn rs. 3,000", "earn 3000", "daily by simply liking", "scratch card cashback",
    "cashback reward of rs. 2,999", "bonus 500", "টকা উপার্জন", "3,000-8,000"
  ];
  const matchedGreed = greedKeywords.find(k => lower.includes(k));
  if (matchedGreed) {
    tactics.push({
      category: "Financial Greed & Unrealistic Rewards",
      highlightedPhrase: extractPhrase(matchedGreed),
      explanation: "Dangles extraordinary monetary compensation for minimal labor (e.g. liking videos), typical of advance-fee task fraud.",
      severity: "CRITICAL",
      recommendedResponse: "No legitimate business pays ₹3,000–₹8,000 daily for liking videos. Disengage immediately.",
    });
  }

  // 5. Account Suspension & KYC Pressure
  const kycKeywords = [
    "pending kyc", "kyc verification", "pan card", "blocked due to", "avoid permanent account freeze",
    "ম্যাদ উকলিছে", "केवाईसी", "खाता ब्लॉक"
  ];
  const matchedKyc = kycKeywords.find(k => lower.includes(k));
  if (matchedKyc) {
    tactics.push({
      category: "Account Suspension & KYC Pressure",
      highlightedPhrase: extractPhrase(matchedKyc),
      explanation: "Falsely alleges compliance non-conformity (PAN/KYC) to manufacture an urgent pretext for credential collection.",
      severity: "CRITICAL",
      recommendedResponse: "Visit your local bank branch or use the verified official banking app. Never update KYC via external SMS web links.",
    });
  }

  // 6. Curiosity & Emotional Manipulation
  const curiosityKeywords = [
    "package could not be delivered", "incorrect house number", "pay rs. 15",
    "failed delivery", "ডেলিভাৰী", "पार्सल"
  ];
  const matchedCuriosity = curiosityKeywords.find(k => lower.includes(k));
  if (matchedCuriosity && !matchedKyc && !matchedFear) {
    tactics.push({
      category: "Curiosity & Emotional Manipulation",
      highlightedPhrase: extractPhrase(matchedCuriosity),
      explanation: "Leverages anticipation regarding an unexpected package paired with an inconsequential fee to lower suspicion and steal card data.",
      severity: "MODERATE",
      recommendedResponse: "Check tracking numbers directly on official courier sites without clicking third-party links.",
    });
  }

  // Calculate Overall Manipulation Index (0 to 100)
  const scoreWeights = {
    CRITICAL: 30,
    HIGH: 20,
    MODERATE: 15,
    LOW: 5,
  };

  let totalScore = 0;
  for (const t of tactics) {
    totalScore += scoreWeights[t.severity];
  }

  const overallManipulationIndex = Math.min(Math.max(totalScore, tactics.length > 0 ? 35 : 0), 98);

  return {
    detectedTactics: tactics,
    overallManipulationIndex,
  };
}
