import { describe, expect, it } from "vitest";
import { orchestrateInvestigation } from "@/lib/agents/orchestrator";
import { generatePoliceDossier, generateStixBundle } from "@/lib/agents/reportGenerator";
import { SCAM_BANK } from "./samples";

describe("report generator", () => {
  const inv = orchestrateInvestigation(SCAM_BANK);

  it("includes the evidence id and hash in the police dossier", () => {
    const text = generatePoliceDossier(inv);
    expect(text).toContain(inv.forensics.evidenceId);
    expect(text).toContain(inv.forensics.originalPayloadSha256);
  });

  it("points to the national cybercrime reporting portal and 1930 helpline", () => {
    const text = generatePoliceDossier(inv).toLowerCase();
    expect(text).toContain("national cybercrime reporting portal");
    expect(text).toContain("1930");
  });

  it("builds a STIX 2.1 bundle", () => {
    const stix = generateStixBundle(inv) as { type: string; objects: unknown[] };
    expect(stix.type).toBe("bundle");
    expect(Array.isArray(stix.objects)).toBe(true);
  });
});
