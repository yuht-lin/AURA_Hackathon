import { describe, expect, it } from "vitest";
import { ingestAndExtractIndicators } from "@/lib/agents/ingestion";
import { generateDefenceRecommendations } from "@/lib/agents/defenceAgent";
import { SCAM_ELECTRICITY } from "./samples";

describe("defence agent", () => {
  const result = generateDefenceRecommendations(ingestAndExtractIndicators(SCAM_ELECTRICITY));

  it("suggests at least one rule for a message with a bad domain", () => {
    expect(result.suggestedRules.length).toBeGreaterThan(0);
  });

  it("never applies a rule without human approval", () => {
    for (const rule of result.suggestedRules) {
      expect(rule.approvalStatus).toBe("PENDING_HUMAN_APPROVAL");
    }
  });

  it("keeps an audit log", () => {
    expect(result.auditLog.length).toBeGreaterThan(0);
  });
});
