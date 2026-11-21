import crypto from "crypto";
import { ExtractedIndicators, ScamDnaFingerprint, CampaignSimilarityMatch } from "../types/agent";
import { KNOWN_SCAM_CAMPAIGNS, KnownCampaign } from "../data/knownCampaigns";

// Calculate term frequency vector
function computeTermFrequency(text: string): { [term: string]: number } {
  const words = text.toLowerCase().match(/[\w\u0980-\u09FF\u0900-\u097F]{3,}/g) || [];
  const tf: { [term: string]: number } = {};
  for (const w of words) {
    tf[w] = (tf[w] || 0) + 1;
  }
  const total = words.length || 1;
  for (const k in tf) {
    tf[k] = tf[k] / total;
  }
  return tf;
}

// Compute cosine similarity between two term frequency dictionaries
function cosineSimilarity(tf1: { [term: string]: number }, tf2: { [term: string]: number }): number {
  let dotProduct = 0;
  let mag1 = 0;
  let mag2 = 0;

  for (const k in tf1) {
    mag1 += tf1[k] * tf1[k];
    if (tf2[k]) {
      dotProduct += tf1[k] * tf2[k];
    }
  }

  for (const k in tf2) {
    mag2 += tf2[k] * tf2[k];
  }

  if (mag1 === 0 || mag2 === 0) return 0;
  return dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
}

export function generateScamDna(
  indicators: ExtractedIndicators,
  languageName: string
): {
  fingerprint: ScamDnaFingerprint;
  similarCampaigns: CampaignSimilarityMatch[];
  networkNodes: { id: string; label: string; group: string }[];
  networkEdges: { from: string; to: string; label: string; weight: number }[];
} {
  const text = indicators.normalizedText.toLowerCase();
  const tfVector = computeTermFrequency(indicators.normalizedText);
  const payloadHash = crypto.createHash("sha256").update(indicators.normalizedText).digest("hex").slice(0, 16);
  const fingerprintId = `DNA-${payloadHash.toUpperCase()}`;

  // Determine dominant vector
  let primaryVector = "Unclassified Digital Communication";
  let clusterCategory = "General Anomaly";

  if (text.includes("electricity") || text.includes("power") || text.includes("বিদ্যুৎ") || text.includes("bijli")) {
    primaryVector = "Critical Utility Cutoff Extortion";
    clusterCategory = "Infrastructure Smishing";
  } else if (text.includes("kyc") || text.includes("pan") || text.includes("blocked") || text.includes("একাউণ্ট")) {
    primaryVector = "Banking Account Freeze Phishing";
    clusterCategory = "Financial Credential Harvesting";
  } else if (text.includes("youtube") || text.includes("part time") || text.includes("telegram") || text.includes("earn 3000")) {
    primaryVector = "Pig-Butchering Advance-Fee Syndicate";
    clusterCategory = "Transnational Task Fraud";
  } else if (text.includes("post") || text.includes("parcel") || text.includes("package") || text.includes("address")) {
    primaryVector = "Courier Redelivery Fee Phishing";
    clusterCategory = "Logistics Smishing";
  } else if (text.includes("cashback") || text.includes("won") || text.includes("scratch card")) {
    primaryVector = "UPI Intent Reverse-Debit Fraud";
    clusterCategory = "Payment Spoofing";
  }

  const fingerprint: ScamDnaFingerprint = {
    fingerprintId,
    payloadHash,
    dominantKeywords: indicators.suspiciousKeywords.slice(0, 6),
    claimedOrg: indicators.claimedOrganizations[0] || "None Claimed",
    primaryVector,
    targetMedium: indicators.urls.some(u => u.includes("t.me")) ? "Telegram" : indicators.urls.length > 0 ? "SMS" : "WhatsApp",
    tfidfVectorSummary: Object.fromEntries(Object.entries(tfVector).slice(0, 8)),
    clusterCategory,
  };

  // Compare against known campaigns
  const similarCampaigns: CampaignSimilarityMatch[] = [];

  for (const campaign of KNOWN_SCAM_CAMPAIGNS) {
    const campaignTf = computeTermFrequency(campaign.characteristicKeywords.join(" ") + " " + campaign.modusOperandi);
    const textCosine = cosineSimilarity(tfVector, campaignTf);

    // Indicator overlap
    const sharedKeywords = campaign.characteristicKeywords.filter(k => text.includes(k.toLowerCase()));
    const sharedDomains = indicators.domains.filter(d => campaign.indicators.some(ci => ci.includes(d)));

    let score = textCosine * 0.6;
    if (sharedKeywords.length > 0) score += Math.min(sharedKeywords.length * 0.15, 0.35);
    if (sharedDomains.length > 0) score += 0.25;

    // Cap between 0 and 0.98
    const similarityScore = Math.min(Math.max(score, 0), 0.98);

    if (similarityScore > 0.3) {
      similarCampaigns.push({
        campaignId: campaign.id,
        campaignName: campaign.name,
        similarityScore: Math.round(similarityScore * 100) / 100,
        sharedIndicators: [...sharedKeywords, ...sharedDomains],
        explanation: `Matches Modus Operandi of '${campaign.name}' with shared indicators: [${sharedKeywords.concat(sharedDomains).join(", ")}].`,
        firstSeen: campaign.firstSeen,
        confidenceDisclaimer: "IMPORTANT LEGAL NOTICE: High similarity scores indicate shared tactical patterns and language templates; they do NOT constitute legal proof of identical criminal authorship or attribution.",
      });
    }
  }

  // Sort descending by similarity
  similarCampaigns.sort((a, b) => b.similarityScore - a.similarityScore);

  // Generate NetworkX-style graph data (nodes & edges)
  const networkNodes = [
    { id: fingerprintId, label: `Incident (${fingerprintId})`, group: "CURRENT_INCIDENT" },
    ...indicators.domains.map(d => ({ id: d, label: `Domain: ${d}`, group: "DOMAIN" })),
    ...indicators.phoneNumbers.map(p => ({ id: p, label: `Phone: ${p}`, group: "PHONE" })),
    ...similarCampaigns.map(c => ({ id: c.campaignId, label: c.campaignName, group: "CAMPAIGN_CLUSTER" })),
  ];

  const networkEdges = [
    ...indicators.domains.map(d => ({ from: fingerprintId, to: d, label: "Resolved Host", weight: 0.9 })),
    ...indicators.phoneNumbers.map(p => ({ from: fingerprintId, to: p, label: "Contact Channel", weight: 0.8 })),
    ...similarCampaigns.map(c => ({
      from: fingerprintId,
      to: c.campaignId,
      label: `${Math.round(c.similarityScore * 100)}% Pattern Match`,
      weight: c.similarityScore,
    })),
  ];

  return {
    fingerprint,
    similarCampaigns,
    networkNodes,
    networkEdges,
  };
}
