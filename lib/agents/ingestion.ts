import { ExtractedIndicators } from "../types/agent";
import { findClaimedOrganization } from "../data/verifiedDomains";

const URL_REGEX = /(?:https?:\/\/|www\.)[^\s/$.?#].[^\s]*/gi;
const PHONE_REGEX = /(?:\+91[\-\s]?)?[6-9]\d{9}\b/g;
const UPI_REGEX = /[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/g;

export function ingestAndExtractIndicators(rawText: string): ExtractedIndicators {
  // 1. Normalize text (strip zero-width spaces, control characters, normalize whitespace)
  const normalizedText = rawText
    .replace(/[\u200B-\u200D\uFEFF]/g, "") // strip zero-width characters
    .replace(/\s+/g, " ")
    .trim();

  // 2. Extract URLs
  const urlMatches = normalizedText.match(URL_REGEX) || [];
  const urls = Array.from(new Set(urlMatches));

  // 3. Extract Domains
  const domains: string[] = [];
  for (const url of urls) {
    try {
      const formattedUrl = url.startsWith("http") ? url : `http://${url}`;
      const urlObj = new URL(formattedUrl);
      const host = urlObj.hostname.toLowerCase();
      if (!domains.includes(host)) {
        domains.push(host);
      }
    } catch {
      // Fallback regex domain extractor if URL parse fails
      const match = url.match(/(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
      if (match && match[1] && !domains.includes(match[1])) {
        domains.push(match[1].toLowerCase());
      }
    }
  }

  // 4. Extract Phone Numbers
  const phoneMatches = normalizedText.match(PHONE_REGEX) || [];
  const phoneNumbers = Array.from(new Set(phoneMatches));

  // 5. Extract UPI Handles
  const upiMatches = normalizedText.match(UPI_REGEX) || [];
  const upiHandles = Array.from(new Set(upiMatches));

  // 6. Claimed Organizations
  const claimedOrg = findClaimedOrganization(normalizedText);
  const claimedOrganizations = claimedOrg ? [claimedOrg.name] : [];

  // 7. Suspicious Keywords
  const triggerWords = [
    "urgent", "disconnected", "tonight", "blocked", "kyc", "pan card",
    "part time", "youtube", "earn 3000", "telegram", "suvidha.apk", "anydesk",
    "scratch card", "cashback", "redelivery", "address", "otp", "pin",
    "বিদ্যুৎ", "একাউণ্ট", "বিজলী"
  ];

  const lower = normalizedText.toLowerCase();
  const suspiciousKeywords = triggerWords.filter(tw => lower.includes(tw));

  return {
    rawText,
    normalizedText,
    urls,
    domains,
    phoneNumbers,
    upiHandles,
    claimedOrganizations,
    suspiciousKeywords,
  };
}
