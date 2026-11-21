import { describe, expect, it } from "vitest";
import { ingestAndExtractIndicators } from "@/lib/agents/ingestion";
import { verifyDigitalTrust } from "@/lib/agents/digitalTrust";
import { SCAM_BANK } from "./samples";

describe("digital trust agent", () => {
  it("does not mark a risky look-alike domain as official", () => {
    const result = verifyDigitalTrust(ingestAndExtractIndicators(SCAM_BANK));
    expect(result.trustStatus).not.toBe("OFFICIAL_VERIFIED");
  });

  it("reports when there is no domain to check", () => {
    const result = verifyDigitalTrust(ingestAndExtractIndicators("Call me back please"));
    expect(result.trustStatus).toBe("NO_DOMAIN_DETECTED");
  });
});
