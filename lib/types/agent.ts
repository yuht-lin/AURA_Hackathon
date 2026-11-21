export type SupportedLanguage = "en" | "hi" | "as" | "mixed";

export interface ExtractedIndicators {
  urls: string[];
  domains: string[];
  phoneNumbers: string[];
  upiHandles: string[];
  claimedOrganizations: string[];
  suspiciousKeywords: string[];
  rawText: string;
  normalizedText: string;
}

export interface LanguageDetectionResult {
  detectedLanguage: SupportedLanguage;
  languageName: string;
  confidence: number;
  isMixedLanguage: boolean;
  detectedScripts: string[];
  regionalContextNotes: string;
}

export interface ScamDnaFingerprint {
  fingerprintId: string;
  payloadHash: string;
  dominantKeywords: string[];
  claimedOrg: string;
  primaryVector: string;
  targetMedium: "SMS" | "WhatsApp" | "Telegram" | "Email" | "Web";
  tfidfVectorSummary: { [term: string]: number };
  clusterCategory: string;
}

export interface CampaignSimilarityMatch {
  campaignId: string;
  campaignName: string;
  similarityScore: number; // 0 to 1
  sharedIndicators: string[];
  explanation: string;
  firstSeen: string;
  confidenceDisclaimer: string; // explicitly noting similarity != criminal attribution
}

export interface PsychologicalTactic {
  category: 
    | "Fear & Threats"
    | "Urgency & Time Pressure"
    | "Authority Impersonation"
    | "Financial Greed & Unrealistic Rewards"
    | "Trust Exploitation"
    | "Curiosity & Emotional Manipulation"
    | "Account Suspension & KYC Pressure";
  highlightedPhrase: string;
  explanation: string;
  severity: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  recommendedResponse: string;
}

export interface RiskFactorContribution {
  factor: string;
  score: number; // 0 to 100
  weight: number; // 0 to 1
  contribution: number; // factor * weight
  reasoning: string;
  dataSource: "CONFIRMED_OSINT" | "HEURISTIC_INSPECTION" | "MISSING_DATA_NEUTRAL";
}

export interface ExplainableRiskScore {
  finalScore: number; // 0 to 100
  riskLevel: "CRITICAL" | "HIGH" | "ELEVATED" | "GUARDED" | "SAFE";
  scoreLabel: string; // Project-defined risk indicator, not calibrated probability
  breakdown: RiskFactorContribution[];
  missingDataNotes: string[];
}

export interface AttackChainStage {
  stageNumber: number;
  stageName: string;
  status: "Observed" | "Inferred" | "Predicted";
  description: string;
  evidence: string;
  potentialConsequences: string;
  preventionStep: string;
}

export interface DigitalTrustResult {
  claimedOrganization: string;
  detectedDomain: string;
  officialDomain: string | null;
  trustStatus: "OFFICIAL_VERIFIED" | "LOOKALIKE_IMPERSONATION" | "UNVERIFIED_THIRD_PARTY" | "NO_DOMAIN_DETECTED";
  lookalikeTechnique: string | null; // e.g. "Typosquatting (.xyz instead of .gov.in)", "Homoglyph substitution"
  verificationExplanation: string;
  isGovernmentOrBanking: boolean;
}

export interface DefenceRule {
  ruleId: string;
  ruleType: "DNS_SINKHOLE" | "IPTABLES_DROP" | "WAF_BLOCK" | "SMS_FILTER";
  targetIndicator: string;
  action: "BLOCK" | "QUARANTINE" | "LOG";
  validationStatus: "VALID" | "CONFLICT_DETECTED" | "OVERLY_BROAD_REJECTED";
  approvalStatus: "PENDING_HUMAN_APPROVAL" | "APPROVED" | "REJECTED";
  generatedRuleScript: string;
  rationale: string;
}

export interface DigitalEvidenceRecord {
  evidenceId: string;
  originalPayloadSha256: string;
  normalizedPayloadSha256: string;
  timestampUtc: string;
  originalMessage: string;
  normalizedMessage: string;
  extractedIndicators: ExtractedIndicators;
  riskScore: number;
  integrityDisclaimer: string; // SHA-256 verifies integrity against recorded hash, does not establish authenticity
  auditTrail: {
    event: string;
    timestamp: string;
    actor: string;
  }[];
}

export interface FullAegisInvestigation {
  investigationId: string;
  timestamp: string;
  rawPayload: string;
  language: LanguageDetectionResult;
  indicators: ExtractedIndicators;
  scamDna: {
    fingerprint: ScamDnaFingerprint;
    similarCampaigns: CampaignSimilarityMatch[];
    networkNodes: { id: string; label: string; group: string }[];
    networkEdges: { from: string; to: string; label: string; weight: number }[];
  };
  psychology: {
    detectedTactics: PsychologicalTactic[];
    overallManipulationIndex: number;
  };
  trustVerification: DigitalTrustResult;
  riskIntelligence: ExplainableRiskScore;
  futureAttackSimulation: {
    stages: AttackChainStage[];
    simulationSummary: string;
    predictionCaveat: string; // Predictions are probabilistic simulations, not confirmed attacker intent
  };
  defence: {
    suggestedRules: DefenceRule[];
    quarantineState: "IDLE" | "TEST_RUN_SANDBOX" | "REVERTED";
    auditLog: string[];
  };
  forensics: DigitalEvidenceRecord;
  threatIntelligence: {
    domainReputation: string;
    ipThreatScore: string;
    asnInfo: string;
    dataSource: "SIMULATED_DEMO_INTELLIGENCE" | "LIVE_API";
    infrastructureLocation: {
      city: string;
      country: string;
      latitude: number;
      longitude: number;
      disclaimer: string; // Infrastructure geolocation only, does not identify criminal physical location
    };
  };
}
