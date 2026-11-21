import { describe, expect, it } from "vitest";
import { orchestrateInvestigation } from "@/lib/agents/orchestrator";
import { SAFE_DELIVERY, SCAM_BANK, SCAM_ELECTRICITY } from "./samples";

describe("orchestrator", () => {
  it("produces every section of the investigation", () => {
    const inv = orchestrateInvestigation(SCAM_BANK);
    expect(inv.investigationId).toMatch(/^AEGIS-INV-[0-9A-F]{12}$/);
    for (const key of [
      "language", "indicators", "scamDna", "psychology", "trustVerification",
      "riskIntelligence", "futureAttackSimulation", "defence", "forensics", "threatIntelligence",
    ] as const) {
      expect(inv[key]).toBeDefined();
    }
  });

  it("keeps the risk score between 0 and 100", () => {
    for (const text of [SCAM_BANK, SCAM_ELECTRICITY, SAFE_DELIVERY, "hi"]) {
      const { finalScore } = orchestrateInvestigation(text).riskIntelligence;
      expect(finalScore).toBeGreaterThanOrEqual(0);
      expect(finalScore).toBeLessThanOrEqual(100);
    }
  });

  it("rates scams higher than a genuine delivery message", () => {
    const scam = orchestrateInvestigation(SCAM_BANK).riskIntelligence.finalScore;
    const safe = orchestrateInvestigation(SAFE_DELIVERY).riskIntelligence.finalScore;
    expect(scam).toBeGreaterThan(safe);
  });

  it("flags obvious scams as high risk", () => {
    expect(orchestrateInvestigation(SCAM_ELECTRICITY).riskIntelligence.finalScore).toBeGreaterThanOrEqual(50);
  });

  it("explains the score with a breakdown whose weights are sensible", () => {
    const { breakdown } = orchestrateInvestigation(SCAM_BANK).riskIntelligence;
    expect(breakdown.length).toBeGreaterThan(0);
    for (const item of breakdown) {
      expect(item.weight).toBeGreaterThanOrEqual(0);
      expect(item.weight).toBeLessThanOrEqual(1);
      expect(item.reasoning.length).toBeGreaterThan(0);
    }
  });

  it("labels threat intelligence as simulated and not a person's location", () => {
    const { threatIntelligence } = orchestrateInvestigation(SCAM_BANK);
    expect(threatIntelligence.dataSource).toBe("SIMULATED_DEMO_INTELLIGENCE");
    expect(threatIntelligence.infrastructureLocation.disclaimer.toLowerCase()).toContain("not");
  });

  it("labels each predicted attack stage as observed, inferred or predicted", () => {
    const { stages } = orchestrateInvestigation(SCAM_BANK).futureAttackSimulation;
    for (const stage of stages) {
      expect(["Observed", "Inferred", "Predicted"]).toContain(stage.status);
    }
  });
});
