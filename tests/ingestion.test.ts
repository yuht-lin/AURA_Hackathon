import { describe, expect, it } from "vitest";
import { ingestAndExtractIndicators } from "@/lib/agents/ingestion";
import { SCAM_ELECTRICITY } from "./samples";

describe("ingestion agent", () => {
  it("extracts URLs and domains", () => {
    const result = ingestAndExtractIndicators(SCAM_ELECTRICITY);
    expect(result.urls.length).toBeGreaterThan(0);
    expect(result.domains).toContain("apdcl-bill-update.xyz");
  });

  it("extracts Indian phone numbers", () => {
    const result = ingestAndExtractIndicators(SCAM_ELECTRICITY);
    expect(result.phoneNumbers.join(" ")).toContain("9876543210");
  });

  it("extracts UPI handles", () => {
    const result = ingestAndExtractIndicators("Send money to ramesh.kumar@okaxis now");
    expect(result.upiHandles).toContain("ramesh.kumar@okaxis");
  });

  it("strips zero-width characters and collapses whitespace", () => {
    const result = ingestAndExtractIndicators("Hel​lo   \n  world");
    expect(result.normalizedText).toBe("Hello world");
  });

  it("keeps the raw text untouched", () => {
    const raw = "a​b";
    expect(ingestAndExtractIndicators(raw).rawText).toBe(raw);
  });

  it("returns empty lists for plain text with no indicators", () => {
    const result = ingestAndExtractIndicators("Lunch at one?");
    expect(result.urls).toEqual([]);
    expect(result.domains).toEqual([]);
    expect(result.phoneNumbers).toEqual([]);
  });
});
