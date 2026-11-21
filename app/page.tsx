"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Zap,
  Terminal,
  Globe,
  Lock,
  Cpu,
  Radio,
  FileCode2,
  Copy,
  Check,
  AlertOctagon,
  Search,
  Crosshair,
  ExternalLink,
  Flame,
  Fingerprint
} from "lucide-react";
import { ThreatIntelligence } from "./api/analyze/route";

const DEMO_PAYLOADS = [
  {
    id: "electricity",
    label: "⚡ Electricity Cutoff",
    content: "Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from the electricity office because your previous month bill was not updated. Please immediately contact our electricity officer Mr. Sharma at 9876543210. Download Suvidha.apk to pay."
  },
  {
    id: "bank_kyc",
    label: "🏦 Bank KYC Freeze",
    content: "URGENT NOTICE: Dear SBI Customer, your NetBanking and ATM service has been blocked due to pending KYC. Please click here: http://sbi-kyc-verify-portal.xyz/verify to update your PAN Card and avoid permanent account freeze within 24 hours."
  },
  {
    id: "telegram_job",
    label: "💼 Pig-Butchering Job",
    content: "CONGRATULATIONS! Selected for Part-Time WFH. Earn Rs. 3,000 - 8,000 daily by liking YouTube videos. No experience required. Join our manager on Telegram: https://t.me/quick_cash_india_job to claim Rs. 500 bonus now!"
  },
  {
    id: "india_post",
    label: "📦 India Post Courier",
    content: "India Post: Your package #IN98410294 could not be delivered due to wrong house number. Update address and pay Rs. 15 re-dispatch fee at: http://ind-post-redelivery.top/track within 12 hours or package will be destroyed."
  },
  {
    id: "upi_qr",
    label: "💸 Fake UPI Cashback",
    content: "Congratulations! You have received a cashback reward of Rs. 2,999 on PhonePe. Click http://claim-phonepe-reward.top/upi to receive funds directly in bank account. (Enter UPI PIN to verify transfer)."
  },
  {
    id: "safe_control",
    label: "✅ Amazon (Safe Control)",
    content: "Your Amazon package with order #402-9182374 containing electronics is out for delivery today with associate Ravi. Handover code is 4829. Track your delivery safely at amazon.in/your-orders."
  }
];

export default function Home() {
  const [inputPayload, setInputPayload] = useState(DEMO_PAYLOADS[0].content);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStep, setExecutionStep] = useState(0);
  const [intel, setIntel] = useState<ThreatIntelligence | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);
  const [patchApplied, setPatchApplied] = useState(false);
  const [copiedDossier, setCopiedDossier] = useState(false);

  const handleExecute = async () => {
    if (!inputPayload.trim()) return;
    setIsExecuting(true);
    setIntel(null);
    setPatchApplied(false);

    // Staged HUD visual pipeline
    setExecutionStep(1);
    const stepTimer1 = setTimeout(() => setExecutionStep(2), 350);
    const stepTimer2 = setTimeout(() => setExecutionStep(3), 700);
    const stepTimer3 = setTimeout(() => setExecutionStep(4), 1050);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: inputPayload, type: "text" }),
      });
      const data: ThreatIntelligence = await res.json();
      setTimeout(() => {
        setIntel(data);
        setIsExecuting(false);
        setExecutionStep(0);
      }, 1400);
    } catch (err) {
      console.error(err);
      setIsExecuting(false);
      setExecutionStep(0);
    }
  };

  const handleCopyHash = () => {
    if (!intel) return;
    navigator.clipboard.writeText(intel.cryptographicEvidence.sha256Hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCopyDossier = () => {
    if (!intel) return;
    const dossier = `================================================================================
AEGIS OMEGA // FORENSIC CYBERCRIME EVIDENCE DOSSIER
EVIDENCE ID: ${intel.cryptographicEvidence.evidenceId}
TIMESTAMP: ${intel.cryptographicEvidence.timestamp}
SHA-256 DIGITAL SEAL: ${intel.cryptographicEvidence.sha256Hash}
--------------------------------------------------------------------------------
THREAT LEVEL: ${intel.threatConLevel} (${intel.threatScore}/100)
CLASSIFICATION: ${intel.scamClassification}
ORIGIN INFRASTRUCTURE: ${intel.geographicOrigin.proxyNode}
BULLETPROOF ASN: ${intel.osintData.asn}
MALICIOUS DOMAIN: ${intel.osintData.domain}
PREDICTED ATTACK VECTOR: ${intel.predictiveAttackVector.nextMovePrediction}
--------------------------------------------------------------------------------
APPLICABLE STATUTES: Section 66D Indian IT Act (Cheating by Personation) & BNS 318(4)
SUBMITTED FOR OFFICIAL POLICE / 1930 INVESTIGATION
================================================================================`;
    navigator.clipboard.writeText(dossier);
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-200 font-sans selection:bg-red-500/30 selection:text-red-200">
      {/* Top Cyber Command Bar */}
      <header className="border-b border-red-950/40 bg-[#080b14]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 flex items-center justify-center shadow-lg shadow-red-500/20">
              <ShieldAlert className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-lg tracking-wider text-white">
                  AEGIS OMEGA
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/60 uppercase">
                  ACTIVE DEFENSE v2.6
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 uppercase">
                  PS01 SCAMSHIELD
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Autonomous Threat Interception, Predictive AI & Self-Healing Patch Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>KERNEL WAF: ARMED</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>PREDICTIVE TREE: ONLINE</span>
              </div>
            </div>
            <a
              href="tel:1930"
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-black font-mono text-xs font-extrabold uppercase transition shadow-lg shadow-red-600/30"
            >
              POLICE: 1930
            </a>
          </div>
        </div>
      </header>

      {/* Main SOC Dashboard */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Terminal Input Box */}
        <section className="bg-[#0b101d] rounded-2xl border border-slate-800/80 p-6 shadow-2xl relative overflow-hidden mb-8">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>TERMINAL // INFILTRATION VECTOR INTERCEPTOR</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Paste SMS / WhatsApp / URL / Phishing Payload
            </span>
          </div>

          {/* Quick Presets */}
          <div className="mb-4">
            <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
              Select Real-World Intercepted Threat Vector:
            </span>
            <div className="flex flex-wrap gap-2">
              {DEMO_PAYLOADS.map((payload) => (
                <button
                  key={payload.id}
                  onClick={() => {
                    setInputPayload(payload.content);
                    setIntel(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#0e172a] hover:bg-slate-800 border border-slate-700/60 text-xs font-mono text-slate-300 hover:text-white transition flex items-center gap-1.5"
                >
                  <span>{payload.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Area */}
          <div className="relative mb-4">
            <textarea
              rows={4}
              value={inputPayload}
              onChange={(e) => setInputPayload(e.target.value)}
              placeholder="Paste suspicious SMS, Telegram job offer, bank KYC freeze warning, or fake payment payload..."
              className="w-full bg-[#070b14] border border-slate-800 rounded-xl p-4 font-mono text-xs sm:text-sm text-cyan-200 placeholder-slate-600 focus:outline-none focus:border-red-500/80 focus:ring-1 focus:ring-red-500/50 resize-none"
            />
          </div>

          {/* Execute Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              Autonomous AI will hunt domain OSINT, predict next move, and synthesize patch.
            </div>
            <button
              onClick={handleExecute}
              disabled={isExecuting || !inputPayload.trim()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-black font-mono font-black text-sm tracking-wider uppercase transition shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>RUNNING AUTONOMOUS PROTOCOL...</span>
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4" />
                  <span>EXECUTE INTERCEPTION & HUNT</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Live Execution HUD Diagnostic Display */}
        {isExecuting && (
          <div className="bg-[#0b101d] border border-red-500/40 rounded-2xl p-6 mb-8 font-mono text-xs text-slate-300 space-y-2 shadow-2xl">
            <div className="text-red-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              AEGIS KERNEL DEPLOYING ACTIVE COUNTERMEASURES:
            </div>
            <div className={executionStep >= 1 ? "text-cyan-300" : "text-slate-600"}>
              {`> [STEP 1] INTERCEPTING PAYLOAD & EXTRACTING DOMAINS... ${executionStep >= 1 ? "COMPLETE [DONE]" : "PENDING"}`}
            </div>
            <div className={executionStep >= 2 ? "text-cyan-300" : "text-slate-600"}>
              {`> [STEP 2] QUERYING GLOBAL OSINT THREAT FEEDS & BULLETPROOF ASNs... ${executionStep >= 2 ? "COMPLETE [DONE]" : "PENDING"}`}
            </div>
            <div className={executionStep >= 3 ? "text-cyan-300" : "text-slate-600"}>
              {`> [STEP 3] RUNNING GENERATIVE PREDICTIVE ATTACK TREE ("ATTACKER'S NEXT MOVE")... ${executionStep >= 3 ? "COMPLETE [DONE]" : "PENDING"}`}
            </div>
            <div className={executionStep >= 4 ? "text-amber-300" : "text-slate-600"}>
              {`> [STEP 4] SYNTHESIZING AUTONOMOUS SELF-HEALING FIREWALL PATCH & SHA-256 SEAL... ${executionStep >= 4 ? "COMPLETE [DONE]" : "PENDING"}`}
            </div>
          </div>
        )}

        {/* Intel Results Display */}
        {intel && (
          <div className="space-y-8 animate-fadeIn">
            {/* THREATCON ALERT BANNER */}
            <div
              className={`p-6 rounded-2xl border ${
                intel.threatScore > 50
                  ? "bg-red-950/40 border-red-500/80 shadow-2xl shadow-red-900/40"
                  : "bg-emerald-950/40 border-emerald-500/80 shadow-2xl shadow-emerald-900/40"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-xs uppercase px-2.5 py-1 rounded font-black tracking-wider ${
                        intel.threatScore > 50
                          ? "bg-red-600 text-black animate-pulse"
                          : "bg-emerald-600 text-black"
                      }`}
                    >
                      {intel.threatConLevel}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      ID: {intel.cryptographicEvidence.evidenceId}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-mono font-black text-white">
                    {intel.scamClassification}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                    {intel.executiveSummary}
                  </p>
                </div>

                <div className="text-left lg:text-right shrink-0">
                  <div
                    className={`text-5xl font-mono font-black tracking-tighter ${
                      intel.threatScore > 50 ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {intel.threatScore}/100
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                    Threat Probability Index
                  </span>
                </div>
              </div>
            </div>

            {/* TWO-COLUMN HUD: PREDICTIVE MOVE + GLOBAL MAP */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Predictive AI ("Attacker's Next Move") */}
              <div className="lg:col-span-7 bg-[#0b101d] rounded-2xl border border-amber-500/40 p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 uppercase">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>PREDICTIVE AI // ATTACKER'S NEXT MOVE</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    FORECASTING ENGINE
                  </span>
                </div>

                <div className="space-y-4 font-mono">
                  <div className="bg-[#070b14] p-4 rounded-xl border border-amber-500/30">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Targeted Cognitive Next Step:
                    </span>
                    <p className="text-sm font-semibold text-amber-200 leading-relaxed">
                      "{intel.predictiveAttackVector.nextMovePrediction}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#070b14] p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase text-slate-500 block mb-0.5">
                        Ultimate Adversary Goal:
                      </span>
                      <span className="text-slate-300 font-semibold">
                        {intel.predictiveAttackVector.attackerGoal}
                      </span>
                    </div>

                    <div className="bg-[#070b14] p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase text-slate-500 block mb-0.5">
                        Immediate Victim Risk:
                      </span>
                      <span className="text-red-400 font-bold">
                        {intel.predictiveAttackVector.immediateVictimRisk}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Psychological Manipulation Matrix */}
                <div className="mt-6 pt-4 border-t border-slate-800">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase block mb-3">
                    Psychological Coercion Decompiled:
                  </span>
                  <div className="space-y-2">
                    {intel.psychologicalVector.map((vec, i) => (
                      <div
                        key={i}
                        className="bg-[#070b14] p-3 rounded-xl border border-slate-800/80 flex items-start justify-between gap-3 text-xs font-mono"
                      >
                        <div>
                          <span className="text-white font-bold block">{vec.tactic}</span>
                          <span className="text-slate-400 text-[11px]">{vec.analysis}</span>
                        </div>
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded font-black shrink-0 ${
                            vec.intensity === "EXTREME"
                              ? "bg-red-950 text-red-400 border border-red-800"
                              : "bg-amber-950 text-amber-400 border border-amber-800"
                          }`}
                        >
                          {vec.intensity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Global Origin Map & OSINT */}
              <div className="lg:col-span-5 bg-[#0b101d] rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase">
                      <Globe className="w-4 h-4 text-cyan-400" />
                      <span>GLOBAL ORIGIN INFRASTRUCTURE MAP</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {intel.geographicOrigin.city}, {intel.geographicOrigin.country}
                    </span>
                  </div>

                  {/* SVG Vector World Map with Radar Ping */}
                  <div className="relative w-full h-44 bg-[#050811] rounded-xl border border-slate-800 overflow-hidden mb-4 flex items-center justify-center">
                    {/* Abstract World Grid */}
                    <svg className="w-full h-full opacity-40" viewBox="0 0 100 60">
                      <path
                        d="M10,20 Q25,10 35,22 Q40,30 30,45 Q20,50 15,35 Z M45,15 Q65,12 85,20 Q90,35 75,45 Q60,48 50,35 Z M50,30 Q60,25 70,35 Q65,55 50,45 Z"
                        fill="#1e293b"
                      />
                      <line x1="0" y1="30" x2="100" y2="30" stroke="#334155" strokeDasharray="1 3" strokeWidth="0.5" />
                      <line x1="50" y1="0" x2="50" y2="60" stroke="#334155" strokeDasharray="1 3" strokeWidth="0.5" />
                    </svg>

                    {/* Dynamic Pulsing Crosshair at Origin Coordinates */}
                    <div
                      className="absolute z-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${intel.geographicOrigin.coordinates.x}%`,
                        top: `${intel.geographicOrigin.coordinates.y}%`,
                      }}
                    >
                      <span className="absolute w-8 h-8 rounded-full bg-red-500/40 animate-ping"></span>
                      <span className="relative w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white shadow-lg shadow-red-500 flex items-center justify-center">
                        <Crosshair className="w-2.5 h-2.5 text-black" />
                      </span>
                      <span className="absolute -bottom-5 whitespace-nowrap text-[9px] font-mono font-bold bg-black/90 text-red-300 px-1.5 py-0.5 rounded border border-red-800">
                        {intel.geographicOrigin.proxyNode}
                      </span>
                    </div>
                  </div>

                  {/* OSINT Live Threat Telemetry */}
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-500">RESOLVED DOMAIN:</span>
                      <span className="text-cyan-300 font-bold">{intel.osintData.domain}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-500">HOST IP ADDRESS:</span>
                      <span className="text-slate-200">{intel.osintData.ipAddress}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-500">HOSTING ASN:</span>
                      <span className="text-amber-300 truncate max-w-[200px]" title={intel.osintData.asn}>
                        {intel.osintData.asn}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-500">DOMAIN LIFESPAN:</span>
                      <span className="text-red-400 font-bold">{intel.osintData.domainAge}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">BLACKLIST STATUS:</span>
                      <span className="text-red-400 font-bold">{intel.osintData.blacklistStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AUTONOMOUS SELF-HEALING FIREWALL PATCH GENERATOR */}
            <div className="bg-[#0b101d] rounded-2xl border border-cyan-500/40 p-6 shadow-2xl relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-800 gap-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-cyan-400 uppercase">
                  <FileCode2 className="w-4 h-4 text-cyan-400" />
                  <span>AUTONOMOUS SELF-HEALING FIREWALL PATCH // GENERATED BY AEGIS</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPatchApplied(true)}
                    disabled={patchApplied}
                    className={`px-3 py-1.5 rounded font-mono text-xs font-bold uppercase transition flex items-center gap-1.5 ${
                      patchApplied
                        ? "bg-emerald-600 text-black cursor-default"
                        : "bg-cyan-600 hover:bg-cyan-500 text-black shadow-lg shadow-cyan-600/30"
                    }`}
                  >
                    {patchApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>KERNEL RULE DEPLOYED (ISOLATED)</span>
                      </>
                    ) : (
                      <>
                        <Terminal className="w-3.5 h-3.5" />
                        <span>APPLY AUTONOMOUS PATCH</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-400 font-mono mb-3">
                {intel.autonomousPatch.description}
              </p>

              <div className="bg-[#050811] p-4 rounded-xl border border-slate-800 overflow-x-auto">
                <pre className="font-mono text-xs text-emerald-300 leading-relaxed">
                  <code>{intel.autonomousPatch.code}</code>
                </pre>
              </div>
            </div>

            {/* CRYPTOGRAPHIC SHA-256 EVIDENCE BLOCK & 1930 POLICE DOSSIER */}
            <div className="bg-[#0b101d] rounded-2xl border border-slate-800 p-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-800 gap-2">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-300 uppercase">
                  <Fingerprint className="w-4 h-4 text-rose-500" />
                  <span>CRYPTOGRAPHIC CHAIN-OF-CUSTODY // POLICE ADMISSIBLE EVIDENCE</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  SHA-256 IMMUTABLE INTEGRITY VERIFIED
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-2 font-mono">
                  <div className="bg-[#070b14] p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-500 block mb-1">
                      SHA-256 Cryptographic Digest:
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-cyan-300 break-all select-all">
                        {intel.cryptographicEvidence.sha256Hash}
                      </span>
                      <button
                        onClick={handleCopyHash}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs shrink-0"
                      >
                        {copiedHash ? "Copied" : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>EVIDENCE ID: <strong className="text-white">{intel.cryptographicEvidence.evidenceId}</strong></span>
                    <span>TIMESTAMP: <strong className="text-white">{intel.cryptographicEvidence.timestamp}</strong></span>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col gap-2">
                  <button
                    onClick={handleCopyDossier}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-black font-mono font-black text-xs uppercase tracking-wider transition shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                  >
                    {copiedDossier ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>COPIED POLICE DOSSIER!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>COPY 1930 / FIR DOSSIER</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs uppercase font-bold text-center transition flex items-center justify-center gap-1.5"
                  >
                    <span>LODGE AT CYBERCRIME.GOV.IN</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#060810] py-6 font-mono text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold">AEGIS OMEGA</span>
            <span>//</span>
            <span>HACK2SKILL PROMPTWARS X CODE1 INNOVATORS (PS01)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-500 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              VERCEL ZERO-CONFIG DEPLOYED
            </span>
            <a
              href="https://github.com/yuht-lin/AURA_Hackathon"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline"
            >
              GITHUB REPOSITORY
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
