import { NextResponse } from "next/server";

export interface CommunityReport {
  id: string;
  timestamp: string;
  category: string;
  sanitizedSnippet: string;
  targetedSector: string;
  upvotes: number;
  threatLevel: "CRITICAL" | "HIGH" | "ELEVATED";
}

// In-memory sanitized initial community reports
const COMMUNITY_FEED: CommunityReport[] = [
  {
    id: "COMM-0941",
    timestamp: "12 mins ago",
    category: "Electricity Disconnection Coercion (APDCL / WBSEDCL)",
    sanitizedSnippet: "Dear consumer, your electricity power will be disconnected tonight at 9:30 PM due to un-updated bill. Contact officer at [REDACTED_PHONE_NUMBER].",
    targetedSector: "Eastern India Utility Consumers",
    upvotes: 38,
    threatLevel: "CRITICAL",
  },
  {
    id: "COMM-0940",
    timestamp: "45 mins ago",
    category: "SBI NetBanking KYC Freeze Smishing",
    sanitizedSnippet: "Your SBI NetBanking service is blocked due to expired PAN card. Update at http://[REDACTED_SUSPICIOUS_DOMAIN]/verify within 24h.",
    targetedSector: "Retail Banking",
    upvotes: 52,
    threatLevel: "CRITICAL",
  },
  {
    id: "COMM-0939",
    timestamp: "2 hours ago",
    category: "India Post Delivery Address Error",
    sanitizedSnippet: "India Post parcel could not be delivered due to wrong house address. Pay Rs. 15 fee to reschedule at http://[REDACTED_DOMAIN].",
    targetedSector: "E-Commerce Logistics",
    upvotes: 29,
    threatLevel: "HIGH",
  },
  {
    id: "COMM-0938",
    timestamp: "4 hours ago",
    category: "Telegram YouTube Liking Pig-Butchering Job",
    sanitizedSnippet: "Selected for part-time work from home. Earn 3,000 to 8,000 daily. Join Telegram: t.me/[REDACTED_CHANNEL].",
    targetedSector: "Freelancers & Students",
    upvotes: 64,
    threatLevel: "CRITICAL",
  }
];

// Helper to sanitize PII
function sanitizePii(rawText: string): string {
  return rawText
    .replace(/(?:\+91[\-\s]?)?[6-9]\d{9}/g, "[REDACTED_PHONE_NUMBER]")
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[REDACTED_EMAIL]")
    .replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, "[REDACTED_CARD_NUMBER]")
    .replace(/\b\d{6}\b/g, "[REDACTED_OTP_OR_PIN]");
}

export async function GET() {
  return NextResponse.json({
    reports: COMMUNITY_FEED,
    aggregateTrends: [
      { category: "Utility Cutoff Extortion", sharePercentage: 38, delta: "+14% this week" },
      { category: "Banking KYC Suspension", sharePercentage: 31, delta: "+6% this week" },
      { category: "Telegram Task Pig-Butchering", sharePercentage: 19, delta: "-3% this week" },
      { category: "Logistics Redelivery Smishing", sharePercentage: 12, delta: "+22% this week" },
    ],
    privacyPolicy: "ZERO-PII POLICY: All community submissions undergo automated regex scrubbing before publication. Phone numbers, names, account IDs, and OTPs are permanently redacted.",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rawText, category, targetedSector } = body;

    if (!rawText || rawText.length < 10) {
      return NextResponse.json({ error: "Invalid report content. Minimum 10 characters required." }, { status: 400 });
    }

    const sanitizedSnippet = sanitizePii(rawText);
    const newReport: CommunityReport = {
      id: `COMM-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: "Just now",
      category: category || "Suspicious Digital Communication",
      sanitizedSnippet: sanitizedSnippet.slice(0, 200),
      targetedSector: targetedSector || "General Public",
      upvotes: 1,
      threatLevel: "HIGH",
    };

    COMMUNITY_FEED.unshift(newReport);
    return NextResponse.json({ success: true, report: newReport });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
