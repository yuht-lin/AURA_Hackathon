# AEGIS OMEGA 🛡️⚡
### Agentic AI Cybersecurity & Predictive Fraud Intelligence Platform
**Tagline:** *Intelligence Before Impact.*

**Submission for Hack2Skill: PromptWars x Code1 Innovators — Problem Statement PS01 (ScamShield)**

---

## 📌 Problem Statement Alignment
> **Domain: Cybersecurity**  
> *With the increasing use of digital communication, people frequently receive fraudulent SMS messages, WhatsApp messages and suspicious links pretending to be from banks, delivery services and government organisations. Many individuals struggle to distinguish between genuine and fraudulent messages. Develop a web application that helps users identify potentially fraudulent messages and understand the risks associated with suspicious digital communication.*

**Aegis Omega** directly solves this crisis by moving beyond passive text detection into an **active, self-healing, multi-agent cyber intelligence platform**. It protects citizens against threats spoofing:
* **Banking Institutions**: State Bank of India (SBI), HDFC, ICICI (KYC freeze, PAN deactivation, NetBanking lock traps)
* **Government & Utilities**: State Electricity Boards (APDCL, WBSEDCL, UPPCL power cutoff notices), Income Tax Department
* **Logistics & Delivery**: India Post (failed delivery address update fees)
* **Mobile Payments**: PhonePe / Google Pay reverse-debit QR traps

---

## 🚀 The 12-Agent Autonomous Architecture

Aegis Omega implements a modular multi-agent orchestration architecture where specialized agents process threat telemetry in parallel:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AEGIS ORCHESTRATOR AGENT                        │
├──────────────────┬──────────────────┬──────────────────┬───────────────┤
│ 1. Ingestion     │ 2. Language Det. │ 3. Scam DNA      │ 4. Threat     │
│    Agent (Clean) │    (EN, HI, AS)  │    (TF-IDF/Graph)│    Intel (ASN)│
├──────────────────┼──────────────────┼──────────────────┼───────────────┤
│ 5. Psychology    │ 6. Digital Trust │ 7. Risk Scoring  │ 8. Future     │
│    Decompiler    │    Verification  │    Engine (0-100)│    Attack Sim │
├──────────────────┼──────────────────┼──────────────────┼───────────────┤
│ 9. Autonomous    │ 10. Digital      │ 11. Community    │ 12. Report    │
│    Defence Agent │     Forensics Lab│     Intel Net    │     Generator │
└──────────────────┴──────────────────┴──────────────────┴───────────────┘
```

1. **Message Ingestion Agent**: Normalizes text, sanitizes zero-width exploits, and extracts domains, URLs, phone numbers, and UPI handles.
2. **Language Detection Agent**: Automatic identification of **English**, **Hindi (Devanagari & Hinglish)**, and **Assamese (অসমীয়া & Romanized)**, including code-mixed regional SMS dialect parsing.
3. **Scam DNA Agent**: Extracts structural fingerprints and computes cosine similarity against known historical campaigns, rendering an interactive node-link relationship graph. *(Similarity is presented with explicit non-attribution disclaimers).*
4. **Threat Intelligence Agent**: Queries domain reputation, hosting ASN, and simulated bulletproof infrastructure geolocation. *(Maps server locations only; never claims to pinpoint the physical location of a human perpetrator).*
5. **Psychology Analysis Agent**: Decompiles 7 social engineering vectors (Fear, Urgency, Authority, Greed, Trust, Curiosity, KYC Pressure) and highlights the exact suspect phrase in the text with safe counter-measures.
6. **Digital Trust Verification Agent**: Compares claimed entities against an independently verified official domain whitelist, detecting typosquatting, deceptive subdomains, and high-risk commercial TLDs (`.xyz`, `.top`, `.cc`).
7. **Explainable Risk Scoring Engine**: Computes a mathematically explainable 0–100 risk index weighted across domain authenticity, psychological pressure, credential harvesting, and OSINT reputation. Handles missing data safely without hallucinating.
8. **Future Attack Simulator Agent**: Forecasts downstream attack progressions classified into **Observed, Inferred, and Predicted** stages, detailing evidence backing, consequences, and prevention steps.
9. **Autonomous Defence Agent**: Synthesizes suggested DNS sinkhole and WAF rules with broadness validation. **Enforces an explicit Human-in-the-Loop approval gate** before simulated isolated sandbox execution with rollback functionality.
10. **Digital Forensics Agent**: Generates immutable SHA-256 digests preserving raw original vs normalized payloads, recording forensic timestamps, and audit history.
11. **Report Generation Agent**: Synthesizes downloadable formal **National Cybercrime Reporting Portal (1930 / cybercrime.gov.in) FIR Police Dossiers** citing Section 66D of the IT Act and exportable **STIX 2.1 JSON** threat bundles.
12. **Community Threat Intelligence Network**: Privacy-conscious crowdsourced feed with **automated PII scrubbing** (redacting phone numbers, names, and OTPs) tracking emerging weekly campaign shares.

---

## 🖥️ 12-Section SOC Command Interface

The user interface is designed in a Security Operations Centre (SOC) aesthetic (dark navy background `#05070e`, cyan accents `#06b6d4`, and crimson threat indicators `#ef4444`):

1. **Command Centre**: Executive telemetry overview, ThreatCon status banner, and quick actions.
2. **Scam Analyzer**: In-depth multi-agent diagnostic breakdown of submitted payloads.
3. **Scam DNA Explorer**: Fingerprint anatomy, TF-IDF term weights, campaign similarity scores, and node-link graph.
4. **Future Attack Simulator**: Multi-stage attack progression (Observed, Inferred, Predicted) with evidence backing.
5. **Threat Intelligence**: Network ASN, domain blacklist feeds, and infrastructure world map.
6. **Psychology Analysis**: Highlighted in-text coercive phrases, severity badges, and safe actions.
7. **Digital Trust Verification**: Claimed brand vs official domain comparison and lookalike technique detection.
8. **Defence Centre**: Rule inspection, human approval triggers (`Approve` / `Reject`), isolated sandbox execution, and audit log.
9. **Forensics Lab**: SHA-256 digests, integrity disclaimers, downloadable 1930 police dossiers, and STIX 2.1 JSON.
10. **Community Intel**: Crowdsourced threat intelligence with zero-PII sanitization.
11. **Awareness Training**: Interactive multilingual phishing quizzes in English, Hindi, and Assamese with Beginner, Intermediate, and Advanced tiers.
12. **Incident History**: In-memory session audit logs and instant investigation recall.

---

## 🧪 1-Click Interactive Presets (Instant Judge Testing)
Pre-loaded with verified real-world multilingual threat scenarios:
* ⚡ **APDCL বিজুলী বিল (Assamese)**: Urgent power disconnection at 9:30 PM with personal phone number.
* 🏦 **SBI बैंक खाता बंद (Hindi)**: Account deactivation warning demanding PAN link on `.xyz` phishing portal.
* ⚡ **Power Cutoff 9:30 PM (English)**: Infrastructure smishing demanding malicious APK download.
* 💼 **YouTube Job Pig-Butcher (English)**: ₹3,000–₹8,000 daily task advance-fee trap.
* 📦 **India Post Address Smish (English)**: ₹15 redelivery fee harvesting credit cards on `.top` host.
* ✅ **Amazon Delivery (Safe Control)**: Zero-false-positive control verifying authorized e-commerce delivery updates.

---

## 🛠️ Technology Stack
* **Frontend**: Next.js 14.2 (App Router), React 18, Tailwind CSS, Lucide React
* **Backend**: Next.js Serverless API Routes (`/api/analyze`, `/api/community`, `/api/export`)
* **Languages**: TypeScript, Python (WAF/iptables code generator)
* **Cryptographic Hashing**: Node.js `crypto` (SHA-256)
* **Deployment Target**: Vercel (Edge CDN & Serverless)

---

## ⚡ Zero-Config Deployment on Vercel

1. **Push to GitHub**:
   ```bash
   git push -u origin main
   ```
2. **Import into Vercel**:
   * Open [vercel.com](https://vercel.com) and log in with GitHub.
   * Click **"Add New..."** ➔ **"Project"** ➔ Select `AURA_Hackathon`.
   * *(Optional)* Add `GEMINI_API_KEY` in Environment Variables. *(Note: If omitted, the deterministic multi-agent engine automatically handles all investigations without failing!)*
   * Click **"Deploy"**.
3. **Live Public Access**:
   Vercel compiles and publishes the platform in ~60 seconds to a live HTTPS URL.

---

## 🔒 Hackathon Rules Compliance
* **Repository Size**: **< 200 KB** (Strictly complies with the < 10 MB limit).
* **Branch Policy**: Single branch `main` (Zero auxiliary branches).
* **Visibility**: Public GitHub Repository.
* **Production Build**: Verified with 0 errors via `npm run build`.
