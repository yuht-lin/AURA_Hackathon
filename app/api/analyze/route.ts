import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface AnalysisResponse {
  riskScore: number;
  threatLevel: "SAFE" | "LOW" | "SUSPICIOUS" | "CRITICAL";
  scamType: string;
  summary: string;
  psychologicalTriggers: {
    trigger: string;
    level: "Low" | "Medium" | "High";
    description: string;
  }[];
  redFlags: string[];
  safeIndicators: string[];
  actionPlan: {
    step: number;
    title: string;
    instruction: string;
    urgent: boolean;
  }[];
  officialHelplines: {
    name: string;
    contact: string;
    link?: string;
  }[];
}

// Built-in heuristic intelligence engine (guarantees rock-solid offline & demo reliability)
function analyzeWithHeuristics(content: string, type: string): AnalysisResponse {
  const text = content.toLowerCase();
  const redFlags: string[] = [];
  const safeIndicators: string[] = [];
  let riskScore = 10;
  let scamType = "Unverified Communication";
  let summary = "Message analyzed. Standard communication patterns detected.";

  // Pattern checks
  const urgencyWords = ["urgent", "immediately", "tonight", "within 24 hours", "suspended today", "last warning", "final notice", "disconnected tonight", "hurry"];
  const authorityWords = ["cbi", "police", "customs", "rbi", "income tax", "electricity board", "sbi", "hdfc", "icici", "india post"];
  const moneyGreedWords = ["earn 3000", "earn 5000", "daily income", "part time", "like youtube", "lottery", "prize", "cashback", "won", "reward", "free gift"];
  const paymentTrapWords = ["scan qr", "enter pin to receive", "pay 5 rs", "recharge fee", "token amount", "registration fee", "processing charge"];
  const kycWords = ["kyc suspended", "pan card blocked", "account deactivated", "verify kyc", "update pan", "netbanking blocked"];
  const suspiciousUrls = [".xyz", ".cc", ".top", ".tk", ".ru", "bit.ly", "tinyurl", "is.gd", "ngrok", "free.nf", "t.me"];

  // 1. Electricity scam check
  if (text.includes("electricity") && (text.includes("disconnected") || text.includes("officer") || text.includes("bill update"))) {
    riskScore += 75;
    scamType = "Fake Electricity Disconnection Fraud";
    redFlags.push("Threatens immediate power disconnection to induce panic");
    redFlags.push("Provides unofficial personal phone numbers instead of official utility contact channels");
    redFlags.push("Urges payment via third-party APK or remote access apps (e.g. AnyDesk/TeamViewer)");
  }

  // 2. Job / Telegram review scam
  else if ((text.includes("youtube") || text.includes("review") || text.includes("part time") || text.includes("wfh")) && 
           (text.includes("earn") || text.includes("daily") || text.includes("telegram") || text.includes("salary"))) {
    riskScore += 70;
    scamType = "Part-Time Task / Telegram Job Scam";
    redFlags.push("Unrealistic daily earnings promised for trivial tasks (e.g. liking videos)");
    redFlags.push("Directs victim to unverified Telegram channels or WhatsApp groups");
    redFlags.push("Typical advance-fee model leading to cryptocurrency/task recharge traps");
  }

  // 3. Banking / KYC / PAN block scam
  else if ((text.includes("kyc") || text.includes("pan") || text.includes("blocked") || text.includes("deactivated")) && 
           (text.includes("bank") || text.includes("sbi") || text.includes("hdfc") || text.includes("account") || text.includes("update"))) {
    riskScore += 80;
    scamType = "Bank KYC / PAN Card Phishing Trap";
    redFlags.push("Impersonates major banking institutions claiming immediate account lock");
    redFlags.push("Requests immediate action via unofficial links or SMS phone numbers");
    redFlags.push("Banks in India never ask for KYC updates via SMS links or personal numbers");
  }

  // 4. India Post / Courier delivery trap
  else if ((text.includes("post") || text.includes("parcel") || text.includes("package") || text.includes("courier")) && 
           (text.includes("address") || text.includes("failed") || text.includes("customs") || text.includes("update link"))) {
    riskScore += 70;
    scamType = "Courier / Postal Delivery Phishing Scam";
    redFlags.push("Falsely claims package cannot be delivered due to wrong address");
    redFlags.push("Directs to clone website asking for ₹5-₹20 fee to steal banking credentials");
    redFlags.push("High volume automated phishing campaign targeting random mobile numbers");
  }

  // 5. UPI / Cashback / Lottery trap
  else if (text.includes("cashback") || text.includes("won") || text.includes("lottery") || text.includes("prize") || text.includes("claim ₹")) {
    riskScore += 65;
    scamType = "Fake UPI Cashback / Lottery Scam";
    redFlags.push("Unsolicited prize or cashback notification without any prior participation");
    redFlags.push("May ask to scan a QR code or enter UPI PIN (entering PIN DEBITS money, never credits)");
  }

  // 6. Suspicious link detection
  if (suspiciousUrls.some(ext => text.includes(ext)) || text.includes("http://") || text.includes("bit.ly")) {
    riskScore += 20;
    redFlags.push("Contains shortened or unverified suspicious domain / URL");
  }

  // 7. Urgency check
  const hasUrgency = urgencyWords.some(w => text.includes(w));
  if (hasUrgency) {
    riskScore += 15;
    redFlags.push("Uses artificial urgency and time-pressure tactics to bypass critical thinking");
  }

  // 8. Legitimate / Safe check
  if ((text.includes("order delivered") || text.includes("out for delivery") || text.includes("otp for login")) &&
      !text.includes("click link to cancel") && !text.includes("pay fee") && !text.includes("account blocked")) {
    if (redFlags.length === 0) {
      riskScore = 5;
      scamType = "Legitimate Transactional Alert";
      safeIndicators.push("No suspicious links or calls to transfer money found");
      safeIndicators.push("Matches standard automated notifications from recognized vendors");
      safeIndicators.push("Does not pressure user to contact personal phone numbers");
    }
  }

  // Cap score between 0 and 100
  riskScore = Math.min(Math.max(riskScore, 2), 99);

  let threatLevel: "SAFE" | "LOW" | "SUSPICIOUS" | "CRITICAL" = "SAFE";
  if (riskScore >= 75) threatLevel = "CRITICAL";
  else if (riskScore >= 50) threatLevel = "SUSPICIOUS";
  else if (riskScore >= 25) threatLevel = "LOW";
  else threatLevel = "SAFE";

  if (threatLevel === "CRITICAL" || threatLevel === "SUSPICIOUS") {
    summary = `High probability of malicious intent identified (${scamType}). This communication exhibits classic social engineering patterns designed to steal funds or credentials.`;
  } else if (threatLevel === "LOW") {
    summary = "Slight anomaly detected, but no clear malicious markers found. Exercise standard caution.";
  } else {
    summary = "Safe communication. No indicators of phishing, psychological coercion, or credential harvesting detected.";
  }

  return {
    riskScore,
    threatLevel,
    scamType,
    summary,
    psychologicalTriggers: [
      {
        trigger: "Artificial Urgency",
        level: hasUrgency ? "High" : "Low",
        description: hasUrgency ? "Pressures victim with tight deadline to prevent rational verification." : "No artificial deadline pressure detected."
      },
      {
        trigger: "Authority Impersonation",
        level: authorityWords.some(w => text.includes(w)) ? "High" : "Low",
        description: authorityWords.some(w => text.includes(w)) ? "Poses as bank, government utility, or police agency." : "No false institutional authority claimed."
      },
      {
        trigger: "Financial Lure / Greed",
        level: moneyGreedWords.some(w => text.includes(w)) ? "High" : "Low",
        description: moneyGreedWords.some(w => text.includes(w)) ? "Dangles quick money, prizes or high payouts for low effort." : "No unrealistic financial promises."
      }
    ],
    redFlags: redFlags.length > 0 ? redFlags : ["No prominent red flags identified."],
    safeIndicators: safeIndicators.length > 0 ? safeIndicators : ["Standard communication structure."],
    actionPlan: threatLevel === "CRITICAL" || threatLevel === "SUSPICIOUS" ? [
      { step: 1, title: "Do Not Click or Reply", instruction: "Do not tap on any link, do not call phone numbers mentioned in the message, and never install any suggested APK.", urgent: true },
      { step: 2, title: "Never Share OTP or Enter UPI PIN", instruction: "Remember that receiving money NEVER requires entering your UPI PIN or scanning a QR code.", urgent: true },
      { step: 3, title: "Report to Cyber Crime (1930)", instruction: "Dial 1930 immediately or file an incident complaint on cybercrime.gov.in (National Cyber Crime Portal).", urgent: false },
      { step: 4, title: "Block & Mark as Spam", instruction: "Use your messaging app to block the sender and report spam to protect community members.", urgent: false }
    ] : [
      { step: 1, title: "Verify via Official App", instruction: "If this relates to an order or delivery, verify status directly inside the official app.", urgent: false },
      { step: 2, title: "Routine Vigilance", instruction: "Never share OTPs even with automated verification systems.", urgent: false }
    ],
    officialHelplines: [
      { name: "National Cyber Crime Helpline", contact: "1930", link: "tel:1930" },
      { name: "National Cyber Crime Reporting Portal", contact: "cybercrime.gov.in", link: "https://cybercrime.gov.in" },
      { name: "Chakshu - Report Fraudulent Calls/SMS", contact: "sancharsaathi.gov.in", link: "https://sancharsaathi.gov.in" },
      { name: "RBI Sachet Financial Fraud Portal", contact: "sachet.rbi.org.in", link: "https://sachet.rbi.org.in" }
    ]
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, type, imageBase64 } = body;

    if (!content && !imageBase64) {
      return NextResponse.json(
        { error: "Please provide text content or an image to analyze." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini API Key is available, invoke Gemini AI with multimodal reasoning
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are AURA ScamShield, an elite AI cybersecurity and fraud detection engine specialized in identifying scams, phishing, social engineering, and fraudulent transactions (especially in India like UPI fraud, electricity bill scams, KYC phishing, courier scams, digital arrest, job scams).

Analyze the following input thoroughly:
Input Type: ${type}
Content: "${content || 'Image attached'}"

You MUST respond strictly with valid JSON without any markdown code fences or backticks. Schema:
{
  "riskScore": <number between 0 and 100>,
  "threatLevel": <"SAFE" | "LOW" | "SUSPICIOUS" | "CRITICAL">,
  "scamType": "<Specific Scam Classification>",
  "summary": "<2-3 sentence executive summary of findings>",
  "psychologicalTriggers": [
    { "trigger": "<Urgency / Greed / Fear / Authority / Secrecy>", "level": "<Low | Medium | High>", "description": "<explanation>" }
  ],
  "redFlags": ["<red flag 1>", "<red flag 2>"],
  "safeIndicators": ["<safe indicator 1>"],
  "actionPlan": [
    { "step": 1, "title": "<action title>", "instruction": "<step description>", "urgent": <boolean> }
  ],
  "officialHelplines": [
    { "name": "National Cyber Crime Helpline", "contact": "1930", "link": "tel:1930" },
    { "name": "Cybercrime Reporting Portal", "contact": "cybercrime.gov.in", "link": "https://cybercrime.gov.in" },
    { "name": "Chakshu Portal (DoT)", "contact": "sancharsaathi.gov.in", "link": "https://sancharsaathi.gov.in" }
  ]
}`;

        let result;
        if (imageBase64) {
          const mimeType = imageBase64.startsWith("data:image/png") ? "image/png" : "image/jpeg";
          const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
          result = await model.generateContent([
            prompt,
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType
              }
            }
          ]);
        } else {
          result = await model.generateContent(prompt);
        }

        const responseText = result.response.text().trim();
        const cleanedJson = responseText.replace(/^```json/, '').replace(/```$/, '').trim();
        const parsed: AnalysisResponse = JSON.parse(cleanedJson);
        return NextResponse.json(parsed);
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to built-in heuristic engine:", geminiError);
        // Seamless fallback to heuristic engine
      }
    }

    // Default to high-performance heuristic analyzer
    const analysis = analyzeWithHeuristics(content || "", type || "text");
    return NextResponse.json(analysis);

  } catch (error: any) {
    console.error("Analysis route error:", error);
    return NextResponse.json(
      { error: "Internal server error during analysis", details: error.message },
      { status: 500 }
    );
  }
}
