import { describe, expect, it } from "vitest";
import { analyzePsychology } from "@/lib/agents/psychology";
import { SAFE_DELIVERY, SCAM_ELECTRICITY } from "./samples";

describe("psychology agent", () => {
  it("finds pressure tactics in a scam message", () => {
    const result = analyzePsychology(SCAM_ELECTRICITY);
    expect(result.detectedTactics.length).toBeGreaterThan(0);
    expect(result.overallManipulationIndex).toBeGreaterThan(0);
  });

  it("highlights a phrase that really appears in the text", () => {
    const result = analyzePsychology(SCAM_ELECTRICITY);
    for (const tactic of result.detectedTactics) {
      const fragment = tactic.highlightedPhrase.replace(/^\.{3}|\.{3}$/g, "").trim().toLowerCase();
      expect(SCAM_ELECTRICITY.toLowerCase()).toContain(fragment);
    }
  });

  it("scores a genuine delivery message lower than a scam", () => {
    const scam = analyzePsychology(SCAM_ELECTRICITY).overallManipulationIndex;
    const safe = analyzePsychology(SAFE_DELIVERY).overallManipulationIndex;
    expect(safe).toBeLessThan(scam);
  });
});
