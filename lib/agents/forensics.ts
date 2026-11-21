import crypto from "crypto";
import { DigitalEvidenceRecord, ExtractedIndicators } from "../types/agent";

export function generateDigitalForensics(
  rawMessage: string,
  indicators: ExtractedIndicators,
  riskScore: number
): DigitalEvidenceRecord {
  const timestampUtc = new Date().toISOString();
  const originalPayloadSha256 = crypto.createHash("sha256").update(rawMessage).digest("hex");
  const normalizedPayloadSha256 = crypto.createHash("sha256").update(indicators.normalizedText).digest("hex");
  const evidenceId = `AEGIS-EVD-${originalPayloadSha256.slice(0, 8).toUpperCase()}`;

  const auditTrail = [
    {
      event: "EVIDENCE_INGESTED",
      timestamp: timestampUtc,
      actor: "AEGIS_ORCHESTRATOR",
    },
    {
      event: "SHA256_INTEGRITY_SEALED",
      timestamp: timestampUtc,
      actor: "DIGITAL_FORENSICS_AGENT",
    },
    {
      event: "NORMALIZED_PAYLOAD_PRESERVED",
      timestamp: timestampUtc,
      actor: "MESSAGE_INGESTION_AGENT",
    },
  ];

  return {
    evidenceId,
    originalPayloadSha256,
    normalizedPayloadSha256,
    timestampUtc,
    originalMessage: rawMessage,
    normalizedMessage: indicators.normalizedText,
    extractedIndicators: indicators,
    riskScore,
    integrityDisclaimer: "FORENSIC INTEGRITY NOTICE: The SHA-256 cryptographic digest verifies that the analyzed message text has not been altered or tampered with since the recorded ingestion timestamp; it does NOT independently establish the historical authenticity, identity, or origin of the original sender.",
    auditTrail,
  };
}
