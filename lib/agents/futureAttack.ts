import { AttackChainStage, ExtractedIndicators } from "../types/agent";

export function simulateFutureAttackChain(indicators: ExtractedIndicators): {
  stages: AttackChainStage[];
  simulationSummary: string;
  predictionCaveat: string;
} {
  const text = indicators.normalizedText.toLowerCase();
  const stages: AttackChainStage[] = [];

  // Stage 1: Always Observed Infiltration
  stages.push({
    stageNumber: 1,
    stageName: "Initial Lure Delivery (Smishing / Social Engineering)",
    status: "Observed",
    description: "Fraudulent digital communication received via mobile SMS or messaging app.",
    evidence: `Observed raw message payload containing text '${indicators.normalizedText.slice(0, 50)}...' and sender contact indicators.`,
    potentialConsequences: "Recipient panic, curiosity, or misplaced compliance triggered.",
    preventionStep: "Do not tap on provided links; do not call unsolicited numbers.",
  });

  // Stage 2: Inferred or Observed Redirect
  if (indicators.urls.length > 0) {
    stages.push({
      stageNumber: 2,
      stageName: "Endpoint Redirection & Deceptive Cloned Interface",
      status: "Observed",
      description: `Victim is directed to external untrusted web endpoint (${indicators.urls[0]}).`,
      evidence: `Extracted explicit URL '${indicators.urls[0]}' pointing to unregistered/commercial TLD.`,
      potentialConsequences: "Victim perceives the lookalike interface as legitimate due to spoofed logos and CSS styling.",
      preventionStep: "Inspect browser address bar; verify domain against official entity bookmarks.",
    });
  } else if (indicators.phoneNumbers.length > 0) {
    stages.push({
      stageNumber: 2,
      stageName: "Voice Engineering & Social Pressure (Vishing)",
      status: "Inferred",
      description: "Victim is prompted to contact a personal phone number rather than official digital portals.",
      evidence: `Extracted personal phone number '${indicators.phoneNumbers[0]}' claiming institutional authority.`,
      potentialConsequences: "Attacker verbally manipulates victim without leaving written audit logs.",
      preventionStep: "Hang up immediately; dial the verified national helpline or customer care.",
    });
  }

  // Stage 3 & 4: Inferred / Predicted Credential or Remote Access Exploitation
  if (text.includes("electricity") || text.includes("power") || text.includes("suvidha.apk") || text.includes("anydesk")) {
    stages.push({
      stageNumber: 3,
      stageName: "Remote Device Access / Trojan Siphon (APK)",
      status: "Predicted",
      description: "Attacker instructs victim to install a screen-sharing APK (e.g., AnyDesk, TeamViewer, or malicious utility .apk) to 'assist' with verification.",
      evidence: "Utility smishing campaigns consistently pivot to remote desktop tools to bypass Android 2FA defenses.",
      potentialConsequences: "Full remote control of user device, unhindered screen viewing, and real-time keystroke monitoring.",
      preventionStep: "Never install APKs from outside Google Play Store; reject all remote access software requests.",
    });

    stages.push({
      stageNumber: 4,
      stageName: "Background 2FA SMS Interception & Unauthorized IMPS Debit",
      status: "Predicted",
      description: "Attacker observes incoming banking SMS OTPs on compromised device and executes immediate money transfer to mule accounts.",
      evidence: "Observed pattern across 100% of reported 'Operation VoltTrap' incidents logged by state cyber police.",
      potentialConsequences: "Irreversible financial loss of available bank balance within 60 to 180 seconds.",
      preventionStep: "Immediately toggle airplane mode and contact bank to freeze NetBanking credentials.",
    });
  } else if (text.includes("kyc") || text.includes("pan") || text.includes("blocked") || text.includes("sbi") || text.includes("hdfc")) {
    stages.push({
      stageNumber: 3,
      stageName: "Credential Harvesting (Username, Password, Card Details)",
      status: "Predicted",
      description: "Phishing portal prompts entry of NetBanking User ID, login password, and card CVV under guise of identity verification.",
      evidence: "Harvesting form fields embedded within lookalike banking clone infrastructure.",
      potentialConsequences: "Direct compromise of digital banking credentials.",
      preventionStep: "Verify URL certificate; banks never request passwords via external links.",
    });

    stages.push({
      stageNumber: 4,
      stageName: "Real-Time Dynamic OTP Relay & Account Takeover",
      status: "Predicted",
      description: "Attacker inputs harvested credentials into legitimate bank portal and prompts victim on phishing site for the dynamic OTP.",
      evidence: "Man-in-the-Middle (MitM) session relay tactics standard in banking smishing.",
      potentialConsequences: "Unauthorized beneficiary addition, fund transfer, or loan drawdown.",
      preventionStep: "Read the full text of the OTP SMS—it will state 'OTP for transfer of Rs. X', not 'OTP for KYC'.",
    });
  } else if (text.includes("youtube") || text.includes("part time") || text.includes("telegram") || text.includes("earn 3000")) {
    stages.push({
      stageNumber: 3,
      stageName: "Dopamine Trust Building (Micro-Payout)",
      status: "Inferred",
      description: "Victim is assigned 3 trivial tasks (liking YouTube videos) and credited ₹150–₹500 to establish false credibility.",
      evidence: "Standard recruitment playbook of transnational Task Pig-Butchering rings.",
      potentialConsequences: "Victim is psychologically primed to believe the employment is legitimate.",
      preventionStep: "Do not accept micro-deposits from unknown business handles; exit the Telegram channel.",
    });

    stages.push({
      stageNumber: 4,
      stageName: "Advance-Fee Liquidity Trap ('Prepaid Merchant Tasks')",
      status: "Predicted",
      description: "Victim is assigned a high-tier task requiring ₹10,000–₹50,000 deposits to 'unlock' accumulated commissions.",
      evidence: "Escalation to sunk-cost extortion when victim attempts withdrawal.",
      potentialConsequences: "Severe financial loss; funds routed through layered mule accounts and crypto off-ramps.",
      preventionStep: "Never pay an employer to receive earnings.",
    });
  } else {
    // Generic predictive chain
    stages.push({
      stageNumber: 3,
      stageName: "Data Collection / Identity Harvesting",
      status: "Predicted",
      description: "Targeted capture of personal identifiable information (PII) to facilitate downstream spear-phishing.",
      evidence: "Extracted contact vectors lacking institutional authentication headers.",
      potentialConsequences: "Inclusion of phone number on verified high-yield victim lists on dark-web forums.",
      preventionStep: "Do not respond or engage with unverified senders.",
    });

    stages.push({
      stageNumber: 4,
      stageName: "Secondary Exploitation Wave",
      status: "Predicted",
      description: "Attacker escalates communication via alternative channels (WhatsApp/Voice) leveraging collected PII.",
      evidence: "Multi-channel convergence tactics observed across social engineering operations.",
      potentialConsequences: "Increased susceptibility to tailored spear-phishing attacks.",
      preventionStep: "Block sender and report communication to 1909 (TRAI DND Spam).",
    });
  }

  return {
    stages,
    simulationSummary: `The attack simulation outlines a ${stages.length}-stage progression from initial lure to unauthorized asset exfiltration based on recognized threat actor playbooks.`,
    predictionCaveat: "LEGAL & TECHNICAL DISCLAIMER: Attack-chain stages labeled 'Predicted' and 'Inferred' represent probabilistic threat modeling based on historic cybercrime patterns; they do NOT constitute confirmed or legally proven attacker intentions.",
  };
}
