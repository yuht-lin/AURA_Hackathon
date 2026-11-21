# AURA ScamShield 🛡️
### AI-Powered Multimodal Fraud, Phishing & Social Engineering Defense Engine
**Submission for Hack2Skill: PromptWars x Code1 Innovators — Problem Statement PS01 (ScamShield)**

---

## 📌 Executive Summary
Digital payment fraud, malicious phishing links, and deceptive messaging campaigns cause immense financial and psychological harm across India. Scammers exploit fear, urgency, and trust through fake electricity disconnections, bank account KYC locks, lucrative part-time Telegram jobs, courier address delivery failures, and reverse-UPI QR traps.

**AURA ScamShield** is a next-generation cybersecurity assistant engineered to analyze suspicious communications before victims take irreversible actions. Powered by **multimodal AI (Google Gemini 1.5 Flash)** paired with a **built-in heuristic fraud detection system**, AURA dissects incoming messages across text, screenshots, and URLs, providing real-time risk assessment, psychological manipulation scoring, and an immediate defensive action protocol.

---

## 🚀 Key Features

### 1. Multimodal Threat Inspection
* **💬 Text & SMS Inspector**: Paste any SMS, WhatsApp forward, Telegram job invite, or email. Supports English, Hindi, and Hinglish vernacular nuances.
* **📸 Screenshot & Receipt OCR**: Upload screenshots of suspicious WhatsApp chats, forged payment receipts (fake Paytm/PhonePe/GPay screens), or fake government notices.
* **🔗 Phishing URL & Domain Analyzer**: Inspects domain typosquatting (`sb1`, `in-post`), malicious free/abused TLDs (`.xyz`, `.cc`, `.top`), and deceptive masked redirect URLs.

### 2. Deep Diagnostic Analysis
* **Dynamic Threat Gauge (0–100%)**: Color-coded risk meter categorized into `CRITICAL`, `SUSPICIOUS`, `LOW`, and `SAFE`.
* **Psychological Manipulation Radar**: Evaluates coercive tactics:
  * *Artificial Urgency* (tight deadlines, immediate cutoff threats)
  * *Authority Impersonation* (fake CBI, Police, SBI, RBI, Electricity Board)
  * *Financial Greed & Lures* (too-good-to-be-true daily returns, fake cashback)
* **Pinpointed Red Flags**: Exact evidence lines detected in the text with clear rationale.
* **Legitimate Control Markers**: Accurately recognizes genuine delivery updates and bank OTPs without false positives.

### 3. Immediate Action & Emergency Helpline Integration
* **Step-by-Step Defense Protocol**: Step 1: Immediate Freeze/Do Not Click → Step 2: Never Enter UPI PIN → Step 3: Formal Cyber Crime Reporting.
* **Direct Access to National Helplines**:
  * 📞 **National Cyber Crime Helpline (1930)**
  * 🌐 **National Cyber Crime Reporting Portal** (`cybercrime.gov.in`)
  * 🛡️ **Chakshu Portal (DoT / Sanchar Saathi)**
  * 🏦 **RBI Sachet Financial Fraud Portal**

### 4. Live Cyber Threat Radar (India 2026 MOs)
* Integrated intelligence section exposing top trending fraud tactics: **Digital Arrest Scams**, **Reverse UPI Debit Traps**, and **India Post Address Failure SMS**.

---

## 🧪 1-Click Interactive Demo Scenarios (For Judges)
The application includes pre-loaded real-world presets for instant demonstration:
1. **⚡ Electricity Bill Cutoff**: Classic urgency scam claiming power disconnection at 9:30 PM with unofficial officer phone number.
2. **💼 Telegram / YouTube Job**: High-payout "like videos & earn ₹3,000–8,000/day" task-recharge trap.
3. **🏦 Bank KYC Block**: SBI account freeze warning with malicious `.xyz` phishing portal.
4. **📦 India Post Courier Issue**: Address correction SMS demanding ₹15 re-dispatch fee on `.cc` domain.
5. **💸 Fake UPI Cashback**: Scratch card reward baiting users to enter UPI PIN to receive money.
6. **✅ Amazon Delivery (Safe Control)**: Genuine delivery notification demonstrating accurate zero-false-positive filtering.

---

## 🛠️ Architecture & Tech Stack
* **Framework**: Next.js 14 (App Router) + React 18
* **Language**: TypeScript
* **Styling**: Tailwind CSS (Cyber-Shield Dark Glassmorphism)
* **Icons**: Lucide React
* **AI Engine**: Dual-Core (Google Generative AI `gemini-1.5-flash` with graceful fallback to built-in rule-based NLP Heuristics)
* **Deployment Target**: Vercel (Edge & Serverless Ready)

---

## ⚡ Deployment on Vercel (Step-by-Step)

This repository is optimized for zero-config, 1-click deployment on Vercel:

1. **Log in to Vercel**:
   Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. **Import Repository**:
   Click **"Add New..."** → **"Project"**, then select `AURA_Hackathon`.
3. **Configure Environment Variables (Optional)**:
   * To enable live Gemini AI multimodal analysis, add:
     * `GEMINI_API_KEY`: *Your Google Gemini API Key*
   *(Note: If omitted, the app automatically runs on its built-in dual-core heuristic engine without failing!)*
4. **Click Deploy**:
   Vercel builds and publishes your app in ~60 seconds to a live URL (e.g., `https://aura-hackathon.vercel.app`).
5. **Submit**:
   Copy your live Vercel URL and paste it into the **Hack2Skill Submissions Tab**!

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## 🔒 Hackathon Compliance
* **Repository Size**: **< 150 KB** (Strictly adheres to the < 10 MB limit).
* **Branch Policy**: Single branch `main` (Zero auxiliary branches).
* **Visibility**: Public GitHub Repository.
