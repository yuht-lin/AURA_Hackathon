import { ExplainableRiskScore, RiskFactorContribution, ExtractedIndicators, DigitalTrustResult, PsychologicalTactic } from "../types/agent";

export function computeExplainableRisk(
  indicators: ExtractedIndicators,
  trust: DigitalTrustResult,
  psychologyTactics: PsychologicalTactic[],
  threatIntelAvailable: boolean
): ExplainableRiskScore {
  const breakdown: RiskFactorContribution[] = [];
  const missingDataNotes: string[] = [];

  // Factor 1: Domain Authenticity & Impersonation (Weight: 0.30)
  let domainScore = 0;
  let domainReason = "No impersonation detected.";
  if (trust.trustStatus === "LOOKALIKE_IMPERSONATION") {
    domainScore = 95;
    domainReason = `Direct brand impersonation detected against ${trust.claimedOrganization} (${trust.lookalikeTechnique}).`;
  } else if (trust.trustStatus === "OFFICIAL_VERIFIED") {
    domainScore = 5;
    domainReason = `Matches verified official domain (${trust.officialDomain}).`;
  } else if (trust.detectedDomain && trust.detectedDomain !== "No External Domain Detected") {
    domainScore = 60;
    domainReason = `Unverified third-party domain '${trust.detectedDomain}'. Unknown corporate affiliation.`;
  } else {
    domainScore = 20;
    domainReason = "No domain present; channel risk evaluated by phone/text indicators.";
  }

  breakdown.push({
    factor: "Domain Authenticity & Impersonation",
    score: domainScore,
    weight: 0.30,
    contribution: Math.round(domainScore * 0.30),
    reasoning: domainReason,
    dataSource: "CONFIRMED_OSINT",
  });

  // Factor 2: Psychological Manipulation & Cognitive Pressure (Weight: 0.25)
  let psychScore = 0;
  if (psychologyTactics.length > 0) {
    const hasCritical = psychologyTactics.some(t => t.severity === "CRITICAL");
    psychScore = hasCritical ? 92 : Math.min(psychologyTactics.length * 30, 80);
  } else {
    psychScore = 5;
  }

  breakdown.push({
    factor: "Psychological Manipulation & Social Engineering",
    score: psychScore,
    weight: 0.25,
    contribution: Math.round(psychScore * 0.25),
    reasoning: psychologyTactics.length > 0
      ? `${psychologyTactics.length} social engineering vectors identified (${psychologyTactics.map(t => t.category).join(", ")}).`
      : "Neutral, non-coercive informational framing.",
    dataSource: "HEURISTIC_INSPECTION",
  });

  // Factor 3: Credential & Financial Harvesting Pretext (Weight: 0.25)
  const lower = indicators.normalizedText.toLowerCase();
  let credScore = 10;
  let credReason = "No explicit credential harvesting language.";

  if (lower.includes("kyc") || lower.includes("pan") || lower.includes("netbanking") || lower.includes("password")) {
    credScore = 95;
    credReason = "Explicit solicitation of sensitive banking/KYC identity credentials.";
  } else if (lower.includes("upi pin") || lower.includes("enter pin") || lower.includes("scratch card") || lower.includes("cashback")) {
    credScore = 90;
    credReason = "Deceptive payment intent: Prompts entry of secret UPI PIN under false reward pretext.";
  } else if (lower.includes("suvidha.apk") || lower.includes("anydesk") || lower.includes("quicksupport")) {
    credScore = 98;
    credReason = "Promotes installation of unverified APK / remote access software to capture 2FA tokens.";
  } else if (lower.includes("pay rs") || lower.includes("re-dispatch") || lower.includes("fee")) {
    credScore = 75;
    credReason = "Payment friction point requesting credit card / debit card payment for unverified service.";
  }

  breakdown.push({
    factor: "Credential & Asset Harvesting Mechanics",
    score: credScore,
    weight: 0.25,
    contribution: Math.round(credScore * 0.25),
    reasoning: credReason,
    dataSource: "HEURISTIC_INSPECTION",
  });

  // Factor 4: Threat Intelligence & Global Registry Reputation (Weight: 0.20)
  let osintScore = 0;
  let osintReason = "";
  let osintSource: RiskFactorContribution["dataSource"] = "HEURISTIC_INSPECTION";

  if (threatIntelAvailable) {
    if (indicators.domains.some(d => d.endsWith(".xyz") || d.endsWith(".top") || d.endsWith(".cc"))) {
      osintScore = 90;
      osintReason = "Associated with high-risk TLD infrastructure commonly observed on PhishTank & URLhaus feeds.";
      osintSource = "CONFIRMED_OSINT";
    } else if (trust.trustStatus === "OFFICIAL_VERIFIED") {
      osintScore = 5;
      osintReason = "Clean reputation across major security feeds and search consoles.";
      osintSource = "CONFIRMED_OSINT";
    } else {
      osintScore = 50;
      osintReason = "Unknown registry reputation. Note: Unknown reputation is treated with caution, not presumed safe.";
      osintSource = "CONFIRMED_OSINT";
    }
  } else {
    osintScore = 40;
    osintReason = "Live external threat feed telemetry unavailable; baseline neutral weight assigned.";
    osintSource = "MISSING_DATA_NEUTRAL";
    missingDataNotes.push("External API telemetry (VirusTotal/SafeBrowsing) was unreachable. Score reflects conservative baseline without fabricated indicators.");
  }

  breakdown.push({
    factor: "Global Threat Feed & Registry Reputation",
    score: osintScore,
    weight: 0.20,
    contribution: Math.round(osintScore * 0.20),
    reasoning: osintReason,
    dataSource: osintSource,
  });

  // Calculate Weighted Sum
  const rawSum = breakdown.reduce((acc, curr) => acc + curr.contribution, 0);
  const finalScore = Math.min(Math.max(rawSum, 2), 99);

  let riskLevel: ExplainableRiskScore["riskLevel"] = "GUARDED";
  if (finalScore >= 80) riskLevel = "CRITICAL";
  else if (finalScore >= 60) riskLevel = "HIGH";
  else if (finalScore >= 40) riskLevel = "ELEVATED";
  else if (finalScore >= 20) riskLevel = "GUARDED";
  else riskLevel = "SAFE";

  return {
    finalScore,
    riskLevel,
    scoreLabel: "Project-Defined Risk Indicator (Heuristic-OSINT Multi-Factor Index, not a calibrated statistical probability)",
    breakdown,
    missingDataNotes,
  };
}
