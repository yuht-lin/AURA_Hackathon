import { DigitalTrustResult, ExtractedIndicators } from "../types/agent";
import { findClaimedOrganization, evaluateDomainTrust } from "../data/verifiedDomains";

export function verifyDigitalTrust(indicators: ExtractedIndicators): DigitalTrustResult {
  const claimedOrg = findClaimedOrganization(indicators.normalizedText);
  const detectedDomain = indicators.domains[0] || (indicators.urls[0] ? new URL(indicators.urls[0].startsWith("http") ? indicators.urls[0] : `http://${indicators.urls[0]}`).hostname : "");

  if (!detectedDomain) {
    return {
      claimedOrganization: claimedOrg ? claimedOrg.name : "None Identified",
      detectedDomain: "No External Domain Detected",
      officialDomain: claimedOrg ? claimedOrg.officialDomains[0] : null,
      trustStatus: "NO_DOMAIN_DETECTED",
      lookalikeTechnique: null,
      verificationExplanation: claimedOrg 
        ? `Message references '${claimedOrg.name}', but conducts communication entirely via phone/offline channels without verifiable domain infrastructure.`
        : "No external domain or corporate entity identified in payload.",
      isGovernmentOrBanking: claimedOrg ? (claimedOrg.category === "Banking" || claimedOrg.category === "Government/Tax") : false,
    };
  }

  const trustEval = evaluateDomainTrust(detectedDomain, claimedOrg);

  return {
    claimedOrganization: claimedOrg ? claimedOrg.name : "Unspecified Public Claim",
    detectedDomain,
    officialDomain: trustEval.officialDomain,
    trustStatus: trustEval.trustStatus as DigitalTrustResult["trustStatus"],
    lookalikeTechnique: trustEval.lookalikeTechnique,
    verificationExplanation: trustEval.verificationExplanation,
    isGovernmentOrBanking: trustEval.isGovernmentOrBanking,
  };
}
