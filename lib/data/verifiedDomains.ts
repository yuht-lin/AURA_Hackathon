export interface VerifiedEntity {
  name: string;
  aliases: string[];
  category: "Banking" | "Postal/Courier" | "Government/Tax" | "Utility" | "E-Commerce" | "Telecommunications";
  officialDomains: string[];
  officialShortCodes?: string[];
  officialHelpline?: string;
}

export const VERIFIED_ORGANIZATIONS: VerifiedEntity[] = [
  {
    name: "State Bank of India (SBI)",
    aliases: ["sbi", "state bank", "yono", "onlinesbi"],
    category: "Banking",
    officialDomains: ["sbi.co.in", "onlinesbi.sbi", "bank.sbi"],
    officialShortCodes: ["SBINB", "SBISMS", "ATMSBI"],
    officialHelpline: "1800 1234 / 1800 2100",
  },
  {
    name: "HDFC Bank",
    aliases: ["hdfc", "hdfc bank", "netbanking.hdfcbank"],
    category: "Banking",
    officialDomains: ["hdfcbank.com"],
    officialShortCodes: ["HDFCBK", "HDFCLO"],
    officialHelpline: "1800 202 6161",
  },
  {
    name: "ICICI Bank",
    aliases: ["icici", "icicibank", "imobile"],
    category: "Banking",
    officialDomains: ["icicibank.com"],
    officialShortCodes: ["ICICIB", "ICICIT"],
    officialHelpline: "1800 1080",
  },
  {
    name: "India Post",
    aliases: ["india post", "post office", "dak seva", "speed post", "ind post", "ভাৰতীয় ডাক"],
    category: "Postal/Courier",
    officialDomains: ["indiapost.gov.in", "ippbonline.com"],
    officialShortCodes: ["INDPOST", "IPPB"],
    officialHelpline: "1800 266 6868",
  },
  {
    name: "Income Tax Department of India",
    aliases: ["income tax", "it department", "incometax", "pan card", "nsdl", "utiitsl"],
    category: "Government/Tax",
    officialDomains: ["incometax.gov.in", "tin-nsdl.com", "pan.utiitsl.com"],
    officialShortCodes: ["ITDEPT", "NSDLP"],
    officialHelpline: "1800 180 1961",
  },
  {
    name: "State Electricity Board",
    aliases: ["electricity board", "power department", "electricity bill", "bijli vibhag", "apdcl", "বিদ্যুৎ"],
    category: "Utility",
    officialDomains: ["apdcl.org", "wbsedcl.in", "uppcl.org", "tnebnet.org", "mahadiscom.in", "bsesdelhi.com"],
    officialHelpline: "1912 (National Power Emergency)",
  },
  {
    name: "PhonePe",
    aliases: ["phonepe", "phone pe", "ybl"],
    category: "Banking",
    officialDomains: ["phonepe.com"],
    officialHelpline: "080-68727374",
  },
  {
    name: "Amazon India",
    aliases: ["amazon", "amazon india", "amazon pay"],
    category: "E-Commerce",
    officialDomains: ["amazon.in", "amazon.com"],
    officialHelpline: "1800 3000 9009",
  }
];

export function findClaimedOrganization(text: string): VerifiedEntity | null {
  const lower = text.toLowerCase();
  for (const org of VERIFIED_ORGANIZATIONS) {
    if (org.aliases.some(alias => lower.includes(alias.toLowerCase()))) {
      return org;
    }
  }
  return null;
}

export function evaluateDomainTrust(domain: string, claimedOrg: VerifiedEntity | null) {
  if (!claimedOrg) {
    // Check if domain is using dangerous / abused TLD
    const suspiciousTlds = [".xyz", ".top", ".cc", ".tk", ".ml", ".cf", ".gq", ".ru", ".buzz", ".work"];
    const isSuspiciousTld = suspiciousTlds.some(tld => domain.toLowerCase().endsWith(tld));
    return {
      trustStatus: isSuspiciousTld ? "LOOKALIKE_IMPERSONATION" : "UNVERIFIED_THIRD_PARTY",
      officialDomain: null,
      lookalikeTechnique: isSuspiciousTld ? "Suspicious High-Risk Free/Abused TLD" : null,
      verificationExplanation: isSuspiciousTld 
        ? `Domain '${domain}' utilizes a high-risk TLD frequently associated with automated short-lived phishing campaigns.`
        : `Domain '${domain}' is an unverified third-party origin. No known official public authority association found.`,
      isGovernmentOrBanking: false,
    };
  }

  const cleanDomain = domain.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
  const isExactOfficial = claimedOrg.officialDomains.some(official => 
    cleanDomain === official || cleanDomain.endsWith("." + official)
  );

  if (isExactOfficial) {
    return {
      trustStatus: "OFFICIAL_VERIFIED",
      officialDomain: cleanDomain,
      lookalikeTechnique: null,
      verificationExplanation: `Verified legitimate endpoint. Matches officially registered domain for ${claimedOrg.name}.`,
      isGovernmentOrBanking: claimedOrg.category === "Banking" || claimedOrg.category === "Government/Tax" || claimedOrg.category === "Postal/Courier",
    };
  }

  // Detect typosquatting / homoglyph tricks
  let technique = "Lookalike Domain Impersonation";
  if (cleanDomain.includes("-") || cleanDomain.includes("kyc") || cleanDomain.includes("verify") || cleanDomain.includes("update") || cleanDomain.includes("login")) {
    technique = "Deceptive Keyword Prepending/Appending";
  } else if (cleanDomain.endsWith(".xyz") || cleanDomain.endsWith(".cc") || cleanDomain.endsWith(".top")) {
    technique = "Unofficial Commercial TLD Spoofing Official Public Entity";
  }

  return {
    trustStatus: "LOOKALIKE_IMPERSONATION",
    officialDomain: claimedOrg.officialDomains[0],
    lookalikeTechnique: technique,
    verificationExplanation: `Impersonation Alert: Message claims affiliation with '${claimedOrg.name}' (official domain: ${claimedOrg.officialDomains.join(", ")}), but directs users to untrusted lookalike host '${domain}'.`,
    isGovernmentOrBanking: true,
  };
}
