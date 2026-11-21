import crypto from "crypto";
import { describe, expect, it } from "vitest";
import { ingestAndExtractIndicators } from "@/lib/agents/ingestion";
import { generateDigitalForensics } from "@/lib/agents/forensics";
import { SCAM_BANK } from "./samples";

describe("forensics agent", () => {
  const indicators = ingestAndExtractIndicators(SCAM_BANK);
  const record = generateDigitalForensics(SCAM_BANK, indicators, 90);

  it("computes a correct SHA-256 of the original message", () => {
    const expected = crypto.createHash("sha256").update(SCAM_BANK).digest("hex");
    expect(record.originalPayloadSha256).toBe(expected);
  });

  it("derives the evidence id from the hash", () => {
    expect(record.evidenceId).toBe(`AEGIS-EVD-${record.originalPayloadSha256.slice(0, 8).toUpperCase()}`);
  });

  it("gives the same hash for the same message", () => {
    const again = generateDigitalForensics(SCAM_BANK, indicators, 90);
    expect(again.originalPayloadSha256).toBe(record.originalPayloadSha256);
  });

  it("gives a different hash when the message changes", () => {
    const changed = generateDigitalForensics(SCAM_BANK + "!", ingestAndExtractIndicators(SCAM_BANK + "!"), 90);
    expect(changed.originalPayloadSha256).not.toBe(record.originalPayloadSha256);
  });

  it("states what the hash does and does not prove", () => {
    expect(record.integrityDisclaimer.length).toBeGreaterThan(20);
  });

  it("records an audit trail", () => {
    expect(record.auditTrail.length).toBeGreaterThan(0);
  });
});
