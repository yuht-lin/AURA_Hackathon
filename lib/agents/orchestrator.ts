import crypto from "crypto";
import { FullAegisInvestigation } from "../types/agent";
import { detectLanguage } from "./language";
import { ingestAndExtractIndicators } from "./ingestion";
import { generateScamDna } from "./scamDna";
import { queryThreatIntelligence } from "./threatIntel";
import { analyzePsychology } from "./psychology";
import { verifyDigitalTrust } from "./digitalTrust";
import { computeExplainableRisk } from "./riskScoring";
import { simulateFutureAttackChain } from "./futureAttack";
import { generateDefenceRecommendations } from "./defenceAgent";
import { generateDigitalForensics } from "./forensics";

export function orchestrateInvestigation(rawPayload: string): FullAegisInvestigation {
  const timestamp = new Date().toISOString();
  const investigationId = `AEGIS-INV-${crypto.randomBytes(6).toString("hex").toUpperCase()}`;

  // 1. Message Ingestion Agent
  const indicators = ingestAndExtractIndicators(rawPayload);

  // 2. Language Detection Agent (English, Hindi, Assamese)
  const language = detectLanguage(indicators.normalizedText);

  // 3. Scam DNA Agent (TF-IDF & Campaign Clustering)
  const scamDna = generateScamDna(indicators, language.languageName);

  // 4. Threat Intelligence Agent (OSINT & Infrastructure Location)
  const threatIntelligence = queryThreatIntelligence(indicators);

  // 5. Psychology Analysis Agent (7 Coercion Vectors & In-Text Highlight)
  const psychology = analyzePsychology(indicators.normalizedText);

  // 6. Digital Trust Verification Agent (Official Domain Whitelist vs Lookalike Check)
  const trustVerification = verifyDigitalTrust(indicators);

  // 7. Explainable Risk Scoring Engine (Mathematical Factor Contributions)
  const riskIntelligence = computeExplainableRisk(
    indicators,
    trustVerification,
    psychology.detectedTactics,
    true
  );

  // 8. Future Attack Simulation Agent (Observed, Inferred, Predicted Chain)
  const futureAttackSimulation = simulateFutureAttackChain(indicators);

  // 9. Autonomous Defence Agent (Rule Synthesis, Validation & Approval Gate)
  const defence = {
    ...generateDefenceRecommendations(indicators),
    quarantineState: "IDLE" as const,
  };

  // 10. Digital Forensics Agent (SHA-256 Digest & Integrity Audit Trail)
  const forensics = generateDigitalForensics(
    rawPayload,
    indicators,
    riskIntelligence.finalScore
  );

  return {
    investigationId,
    timestamp,
    rawPayload,
    language,
    indicators,
    scamDna,
    psychology,
    trustVerification,
    riskIntelligence,
    futureAttackSimulation,
    defence,
    forensics,
    threatIntelligence,
  };
}
