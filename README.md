# AEGIS OMEGA 🛡️

### Paste a suspicious message. Find out if it is a scam in seconds.

**Tagline:** *Intelligence Before Impact.*

**Live demo:** https://aura-hackathon-one.vercel.app
**Hackathon:** Hack2Skill PromptWars x Code1 Innovators, Problem Statement PS01 (ScamShield)

---

## 1. The problem (in plain words)

Scammers send fake messages that look like they come from your bank, electricity board, India Post or PhonePe. They say things like "Your account will be blocked today" so you panic and click or share your OTP.

Most people cannot tell a real message from a fake one. **AEGIS OMEGA tells you, explains why, and shows what to do next.**

---

## 2. What it does

| You do this | AEGIS gives you this |
|---|---|
| Paste any SMS, WhatsApp message or link | A **risk score from 0 to 100** |
| | **Why** it looks like a scam, with the tricky phrases highlighted |
| | A prediction of **what the scammer will do next** |
| | **What to do now** (do not click, block, report to 1930) |
| | An **evidence report** and blocking rules you can export |

Works in **English, Hindi and Assamese**.

---

## 3. Two ways to use it: Simple and SOC

Use the toggle at the top of the screen to switch between two views.

### ✨ Simple mode (for everyday users)
- Clean and easy to read
- Gives a clear answer: safe, suspicious or dangerous
- Explains the scam in plain language
- Tells you the next safe step

### 🖥️ SOC mode (for security teams and judges)
- Full **Security Operations Centre** dashboard with 12 sections
- Shows every detail: how the score was built, scam fingerprints, predicted attack stages, defence rules, forensic hashes and exports
- Dark navy theme with cyan and red alerts

> **Tip:** Start in **Simple** to see the answer, then switch to **SOC** to see how the answer was reached.

---

## 4. Try it in 10 seconds

Click any example under the message box. No typing needed.

- ⚡ **APDCL electricity bill** (Assamese): fake power cut warning
- 🏦 **SBI account closed** (Hindi): fake PAN update link
- ⚡ **Power cut 9:30 PM** (English): fake app download
- 💼 **YouTube job** (English): fake "earn ₹3,000 to ₹8,000 a day" task
- 📦 **India Post** (English): fake ₹15 redelivery fee
- ✅ **Amazon delivery**: a real, safe message (to show it does not cry wolf)

---

## 5. How it works: 12 small agents, 5 steps

Each "agent" does one job. Together they form the analysis pipeline.

| Step | What happens | Agents |
|---|---|---|
| **1. Read** | Clean the message and detect the language | Message Ingestion, Language Detection |
| **2. Recognise** | Compare with known scam patterns and check the link | Scam DNA, Digital Trust Verification |
| **3. Understand** | Check the website's reputation and spot the psychological tricks | Threat Intelligence, Psychology Analysis |
| **4. Decide** | Calculate the score and predict the scammer's next moves | Risk Scoring Engine, Future Attack Simulator |
| **5. Respond** | Suggest blocking rules, save evidence, write reports, share safely | Autonomous Defence, Digital Forensics, Report Generation, Community Intel |

**What each one does, simply:**

1. **Message Ingestion**: cleans the text and pulls out links, phone numbers and UPI IDs.
2. **Language Detection**: recognises English, Hindi (including Hinglish) and Assamese.
3. **Scam DNA**: compares the message with known scam campaigns. It shows similarity only and never claims to know who sent it.
4. **Threat Intelligence**: checks the link's reputation and hosting. It looks at servers only, never at a person's location.
5. **Psychology Analysis**: finds 7 pressure tricks: fear, urgency, authority, greed, trust, curiosity, KYC pressure.
6. **Digital Trust Verification**: checks the link against official websites and catches look-alike domains and risky endings like `.xyz`, `.top`, `.cc`.
7. **Risk Scoring Engine**: builds the 0 to 100 score from clear parts, so you can see why. If data is missing, it says so and does not guess.
8. **Future Attack Simulator**: shows likely next steps, labelled **Observed**, **Inferred** or **Predicted**.
9. **Autonomous Defence**: suggests blocking rules. **A human must approve first**, then it runs only in a safe, simulated sandbox with undo.
10. **Digital Forensics**: creates a SHA-256 fingerprint of the message so any later change can be detected.
11. **Report Generation**: makes a police complaint report for the 1930 / cybercrime.gov.in portal (IT Act Section 66D) and a STIX 2.1 file.
12. **Community Intel**: lets people share scam patterns with phone numbers, names and OTPs automatically removed.

---

## 6. The 12 screens in SOC mode

1. **Command Centre**: overview and quick actions
2. **Scam Analyzer**: full result for your message
3. **Scam DNA Explorer**: fingerprint and similar campaigns
4. **Future Attack Simulator**: predicted attack steps
5. **Threat Intelligence**: network and domain information
6. **Psychology Analysis**: highlighted pressure phrases and safe actions
7. **Digital Trust Verification**: claimed brand vs real website
8. **Defence Centre**: review rules, Approve or Reject, audit log
9. **Forensics Lab**: SHA-256 hashes, police report, STIX export
10. **Community Intel**: shared scam trends with privacy protection
11. **Awareness Training**: quizzes in English, Hindi, Assamese (3 levels)
12. **Incident History**: previous checks in this session

---

## 7. Safety and honesty

- **No tracking of people.** A text message does not reveal who sent it or where they are, so we never claim that.
- **Blocking rules need human approval** and run only in a simulated sandbox.
- **The SHA-256 fingerprint** shows a report has not been changed. It is a tamper-evident record, not legal proof by itself.
- **Some demo data is simulated** (for example live feed items and infrastructure details).
- **Missing data is never invented.** The score says when information is unavailable.
- Always confirm with your bank or provider through their **official** app or helpline.

---

## 8. Tech stack

- **Frontend:** Next.js 14.2 (App Router), React 18, Tailwind CSS, Lucide React
- **Backend:** Next.js serverless API routes (`/api/analyze`, `/api/community`, `/api/export`)
- **Language:** TypeScript (the blocking-rule generator is TypeScript too)
- **Hashing:** Node.js `crypto` (SHA-256)
- **Hosting:** Vercel

---

## 9. Quality: tests, security and accessibility

**Automated tests (62 tests, Vitest).** Run them with `npm test`.
- Every analysis agent is tested: message cleaning, language detection, pressure-tactic detection, lookalike-domain checks, risk scoring, forensic hashing, defence rules and report generation
- All three API routes are tested, including bad input, oversized messages and rate limiting
- The tests check the important promises: scams score higher than genuine messages, blocking rules always wait for human approval, personal data is removed from community reports, and the SHA-256 hash is correct

**Security**
- Input is validated on every API route (type, length limit of 5,000 characters, safe JSON parsing)
- Rate limiting on every API route
- Community reports are stripped of HTML and personal data (phone numbers, emails, card numbers, OTPs)
- Security headers: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`
- Errors never leak internal details to the user
- No secrets in the repository, and no API keys are required

**Accessibility**
- Skip-to-content link, proper page landmarks and a labelled message box
- Screen readers announce the result ("Risk score 72 out of 100, level HIGH") and any error
- Every button has a clear name, and the Simple/SOC toggle announces which view is active
- Visible keyboard focus on every control, and full keyboard use
- Higher text contrast and no tiny text
- Animations switch off automatically for people who choose "reduce motion"
- Decorative effects are hidden from screen readers

**Efficiency**
- Removed a timer that re-drew the whole page every second
- Removed an unused dependency, so installs are smaller

**Checks you can run**

```bash
npm test          # 62 automated tests
npm run typecheck # TypeScript
npm run lint      # code style
npm run check     # all three
```

---

## 10. Run it yourself

```bash
git clone https://github.com/yuht-lin/AURA_Hackathon.git
cd AURA_Hackathon
npm install
npm run dev
```

Open http://localhost:3000.

**No API key is needed.** The built-in multi-agent engine runs the whole analysis on its own.

### Deploy on Vercel

1. Push the code to GitHub: `git push -u origin main`
2. Go to [vercel.com](https://vercel.com), click **Add New**, then **Project**, and pick `AURA_Hackathon`.
3. Click **Deploy**. It is live in about a minute.

---

## 11. If you are being scammed

- Never share your **OTP, PIN or password**.
- Do not click unknown links or install unknown apps.
- Call **1930** (National Cyber Crime Helpline) or report at **cybercrime.gov.in**.
- If money has moved, call your bank straight away.

---

**Built by Jyotishmoi Boro** for Hack2Skill PromptWars x Code1 Innovators.
