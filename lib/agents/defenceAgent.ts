import { DefenceRule, ExtractedIndicators } from "../types/agent";

export function generateDefenceRecommendations(indicators: ExtractedIndicators): {
  suggestedRules: DefenceRule[];
  auditLog: string[];
} {
  const rules: DefenceRule[] = [];
  const auditLog: string[] = [];

  const timestamp = new Date().toISOString();
  auditLog.push(`[${timestamp}] Defence Agent initialized. Ingesting ${indicators.domains.length} domains, ${indicators.phoneNumbers.length} phone numbers.`);

  // 1. Domain Sinkhole Rule
  for (const domain of indicators.domains) {
    let validationStatus: DefenceRule["validationStatus"] = "VALID";
    let rationale = `Quarantine malicious host '${domain}' from resolving via local DNS lookup.`;

    // Broadness check: Ensure rule doesn't block top-level domains or major services
    const broadDomains = ["google.com", "amazon.in", "sbi.co.in", "gov.in", "nic.in", "com", "org", "net", "in"];
    if (broadDomains.includes(domain.toLowerCase())) {
      validationStatus = "OVERLY_BROAD_REJECTED";
      rationale = `CRITICAL VALIDATION FAILURE: Domain '${domain}' is a core internet service or public registrar. Blocking would cause collateral service outage. Rule rejected.`;
    }

    const script = validationStatus === "VALID"
      ? `# AEGIS OMEGA LOCAL DNS SINKHOLE RULE (SANDBOX SIMULATION)
# Target: ${domain}
# Action: Redirect to 127.0.0.1 (Loopback Sinkhole)

# Linux / Mac /etc/hosts Sinkhole:
echo "127.0.0.1 ${domain} # AEGIS-QUARANTINE" | sudo tee -a /etc/hosts > /dev/null

# Unbound / BIND9 RPZ Rule:
# ${domain} CNAME .
`
      : `# RULE REJECTED: Overly broad target. No action permitted.`;

    rules.push({
      ruleId: `RULE-DNS-${domain.replace(/[^a-zA-Z0-9]/g, "-").toUpperCase()}`,
      ruleType: "DNS_SINKHOLE",
      targetIndicator: domain,
      action: "QUARANTINE",
      validationStatus,
      approvalStatus: "PENDING_HUMAN_APPROVAL",
      generatedRuleScript: script,
      rationale,
    });

    auditLog.push(`[${timestamp}] Synthesized DNS Sinkhole rule for target '${domain}'. Validation Status: ${validationStatus}. Awaiting explicit operator confirmation.`);
  }

  // 2. WAF / URL Filter Rule
  for (const url of indicators.urls) {
    rules.push({
      ruleId: `RULE-WAF-${Math.abs(url.split("").reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0))}`,
      ruleType: "WAF_BLOCK",
      targetIndicator: url,
      action: "BLOCK",
      validationStatus: "VALID",
      approvalStatus: "PENDING_HUMAN_APPROVAL",
      generatedRuleScript: `# CLOUDFLARE WAF / NGINX REGEX FILTER RULE
# Drop HTTP requests containing matching URI pattern:
location ~* "${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}" {
    deny all;
    return 403;
}
`,
      rationale: `Block inbound/outbound client HTTP/HTTPS requests matching exact phishing path.`,
    });
  }

  // 3. SMS Filter / Carrier Block Recommendation
  for (const phone of indicators.phoneNumbers) {
    rules.push({
      ruleId: `RULE-SMS-${phone.replace(/[^0-9]/g, "")}`,
      ruleType: "SMS_FILTER",
      targetIndicator: phone,
      action: "BLOCK",
      validationStatus: "VALID",
      approvalStatus: "PENDING_HUMAN_APPROVAL",
      generatedRuleScript: `# ANDROID TELEPHONY / CARRIER SPAM FILTER
# Block and report sender MSISDN via TRAI 1909 DND protocol:
REPORT_SPAM --msisdn "${phone}" --reason "Fraudulent Utility Cutoff Coercion"
`,
      rationale: `Submit sender number '${phone}' to national DND spam filter and block SMS reception.`,
    });
  }

  return {
    suggestedRules: rules,
    auditLog,
  };
}
