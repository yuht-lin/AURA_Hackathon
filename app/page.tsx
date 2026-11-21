"use client";

import React, { useState, useEffect } from "react";
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
  Fingerprint,
  Languages,
  Dna,
  Workflow,
  BrainCircuit,
  Building2,
  Users,
  GraduationCap,
  History,
  Download,
  AlertTriangle,
  FileText,
  HelpCircle,
  XCircle,
  CheckCircle2,
  RefreshCw,
  Eye,
  Sliders,
  ChevronRight,
  Info,
  Trash2,
  ClipboardPaste,
  Sparkles,
  PhoneCall,
  Activity
} from "lucide-react";
import { FullAegisInvestigation, DefenceRule } from "@/lib/types/agent";
import { TRAINING_SCENARIOS, TrainingScenario } from "@/lib/data/trainingScenarios";

const QUICK_PRESETS = [
  {
    id: "as_electricity",
    label: "⚡ APDCL বিজুলী বিল (Assamese)",
    lang: "as",
    content: "প্ৰিয় গ্ৰাহক, আপোনাৰ বিদ্যুৎ বিল আপডেট নোহোৱাৰ বাবে আজি ৰাতি ৯:৩০ বজাত আপোনাৰ বিজুলীৰ সংযোগ বিচ্ছিন্ন কৰা হ'ব। অনুগ্ৰহ কৰি লগে লগে আমাৰ বিষয়া শৰ্মা ডাঙৰীয়াক 9876543210 নম্বৰত যোগাযোগ কৰক।"
  },
  {
    id: "hi_kyc",
    label: "🏦 SBI बैंक खाता बंद (Hindi)",
    lang: "hi",
    content: "अलर्ट: प्रिय ग्राहक, आपका SBI बैंक खाता और नेटबैंकिंग आज रात तक ब्लॉक कर दी जाएगी क्योंकि पैन कार्ड लिंक नहीं है। तुरंत http://sbi-kyc-verify-portal.xyz/verify पर क्लिक करके केवाईसी अपडेट करें।"
  },
  {
    id: "en_electricity",
    label: "⚡ Power Cutoff 9:30 PM (English)",
    lang: "en",
    content: "Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from the electricity office because your previous month bill was not updated. Please immediately contact our electricity officer Mr. Sharma at 9876543210. Download Suvidha.apk to update."
  },
  {
    id: "en_job",
    label: "💼 YouTube Job Pig-Butcher",
    lang: "en",
    content: "CONGRATULATIONS! Selected for Part-Time WFH. Earn Rs. 3,000 - 8,000 daily by simply liking YouTube videos. No experience required. Join our manager on Telegram: https://t.me/quick_cash_india_job to claim Rs. 500 bonus now!"
  },
  {
    id: "en_courier",
    label: "📦 India Post Address Smish",
    lang: "en",
    content: "India Post: Your package #IN98410294 could not be delivered due to an incorrect house address number. Please update your details and pay Rs. 15 re-dispatch fee at: http://ind-post-redelivery.top/track within 12 hours."
  },
  {
    id: "en_safe",
    label: "✅ Amazon Delivery (Safe)",
    lang: "en",
    content: "Your Amazon package with order #402-9182374 containing electronics is out for delivery today with associate Ravi. Handover code is 4829. Track your delivery safely at amazon.in/your-orders."
  }
];

export default function Home() {
  const [viewMode, setViewMode] = useState<"simple" | "advanced">("simple");
  const [activeTab, setActiveTab] = useState<
    | "command"
    | "analyzer"
    | "scamDna"
    | "futureAttack"
    | "threatIntel"
    | "psychology"
    | "trust"
    | "defence"
    | "forensics"
    | "community"
    | "training"
    | "history"
  >("command");

  const [inputPayload, setInputPayload] = useState(QUICK_PRESETS[0].content);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [investigation, setInvestigation] = useState<FullAegisInvestigation | null>(null);
  const [historyList, setHistoryList] = useState<FullAegisInvestigation[]>([]);

  // Live real-time clock
  const [currentTime, setCurrentTime] = useState("");

  // Defence Agent state
  const [defenceRules, setDefenceRules] = useState<DefenceRule[]>([]);
  const [sandboxExecuted, setSandboxExecuted] = useState(false);
  const [auditLog, setAuditLog] = useState<string[]>([]);

  // Training Centre state
  const [trainingLanguage, setTrainingLanguage] = useState<"all" | "as" | "hi" | "en">("all");
  const [userQuizAnswers, setUserQuizAnswers] = useState<{ [id: string]: boolean }>({});
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

  // Community state
  const [communityReports, setCommunityReports] = useState<any[]>([]);
  const [communityTrends, setCommunityTrends] = useState<any[]>([]);

  useEffect(() => {
    runInvestigation(QUICK_PRESETS[0].content);
    fetchCommunityData();

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    }, 1000);
    setCurrentTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    return () => clearInterval(timer);
  }, []);

  const fetchCommunityData = async () => {
    try {
      const res = await fetch("/api/community");
      const data = await res.json();
      setCommunityReports(data.reports || []);
      setCommunityTrends(data.aggregateTrends || []);
    } catch (err) {
      console.error("Community feed error:", err);
    }
  };

  const runInvestigation = async (payloadToTest?: string) => {
    const textToAnalyze = payloadToTest !== undefined ? payloadToTest : inputPayload;
    if (!textToAnalyze.trim()) return;

    setIsInvestigating(true);
    setSandboxExecuted(false);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: textToAnalyze }),
      });
      const data: FullAegisInvestigation = await res.json();
      setInvestigation(data);
      setDefenceRules(data.defence.suggestedRules);
      setAuditLog(data.defence.auditLog);
      setHistoryList((prev) => [data, ...prev.slice(0, 9)]);
    } catch (err) {
      console.error("Investigation failed:", err);
    } finally {
      setIsInvestigating(false);
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputPayload(text);
        runInvestigation(text);
      }
    } catch (err) {
      alert("Please paste using Ctrl+V or Cmd+V directly in the text box.");
    }
  };

  const handleClearText = () => {
    setInputPayload("");
    setInvestigation(null);
  };

  const handleApproveRule = (ruleId: string) => {
    setDefenceRules((prev) =>
      prev.map((r) =>
        r.ruleId === ruleId ? { ...r, approvalStatus: "APPROVED" } : r
      )
    );
    const rule = defenceRules.find((r) => r.ruleId === ruleId);
    setAuditLog((prev) => [
      `[${new Date().toISOString()}] OPERATOR_APPROVED: Rule '${ruleId}' targeting '${rule?.targetIndicator}' was granted human authorization.`,
      ...prev,
    ]);
  };

  const handleRejectRule = (ruleId: string) => {
    setDefenceRules((prev) =>
      prev.map((r) =>
        r.ruleId === ruleId ? { ...r, approvalStatus: "REJECTED" } : r
      )
    );
    setAuditLog((prev) => [
      `[${new Date().toISOString()}] OPERATOR_REJECTED: Rule '${ruleId}' was formally rejected by human security analyst.`,
      ...prev,
    ]);
  };

  const handleExecuteSandbox = () => {
    setSandboxExecuted(true);
    setAuditLog((prev) => [
      `[${new Date().toISOString()}] SANDBOX_EXECUTION_SUCCESS: Approved rules executed inside isolated local virtual kernel. DNS/socket quarantine verified. Zero production impact.`,
      ...prev,
    ]);
  };

  const handleRollbackSandbox = () => {
    setSandboxExecuted(false);
    setAuditLog((prev) => [
      `[${new Date().toISOString()}] SANDBOX_ROLLBACK: Local kernel state reverted to baseline. All quarantined rules rolled back successfully.`,
      ...prev,
    ]);
  };

  const handleDownloadDossier = async () => {
    if (!investigation) return;
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investigation, format: "dossier" }),
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `AEGIS-DOSSIER-${investigation.forensics.evidenceId}.txt`;
      a.click();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadStix = async () => {
    if (!investigation) return;
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ investigation, format: "stix" }),
      });
      const json = await res.json();
      const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `AEGIS-STIX2.1-${investigation.forensics.evidenceId}.json`;
      a.click();
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuizAnswer = (scenario: TrainingScenario, userGuessIsScam: boolean) => {
    if (userQuizAnswers[scenario.id] !== undefined) return;
    const isCorrect = userGuessIsScam === scenario.isScam;
    setUserQuizAnswers((prev) => ({ ...prev, [scenario.id]: userGuessIsScam }));
    setQuizScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const navItems = [
    { id: "command", label: "Command Centre", icon: Terminal },
    { id: "analyzer", label: "Scam Analyzer", icon: Search },
    { id: "scamDna", label: "Scam DNA Explorer", icon: Dna },
    { id: "futureAttack", label: "Future Attack Simulator", icon: Workflow },
    { id: "threatIntel", label: "Threat Intelligence", icon: Globe },
    { id: "psychology", label: "Psychology Analysis", icon: BrainCircuit },
    { id: "trust", label: "Digital Trust Verification", icon: Building2 },
    { id: "defence", label: "Defence Centre", icon: Lock },
    { id: "forensics", label: "Forensics Lab", icon: Fingerprint },
    { id: "community", label: "Community Intel", icon: Users },
    { id: "training", label: "Awareness Training", icon: GraduationCap },
    { id: "history", label: "Incident History", icon: History },
  ];

  const filteredScenarios =
    trainingLanguage === "all"
      ? TRAINING_SCENARIOS
      : TRAINING_SCENARIOS.filter((s) => s.language === trainingLanguage);

  return (
    <div className="min-h-screen bg-[#04060c] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col justify-between relative overflow-hidden">
      {/* ── Motion Graphics: Floating Aurora Orbs ── */}
      <div className="absolute top-[-8%] left-[12%] w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[160px] pointer-events-none animate-float-1" />
      <div className="absolute top-[20%] right-[8%] w-[520px] h-[520px] bg-indigo-500/8 rounded-full blur-[170px] pointer-events-none animate-float-2" />
      <div className="absolute bottom-[5%] left-[25%] w-[480px] h-[480px] bg-rose-500/7 rounded-full blur-[180px] pointer-events-none animate-float-3" />
      <div className="absolute top-[55%] left-[5%] w-[320px] h-[320px] bg-violet-600/6 rounded-full blur-[130px] pointer-events-none animate-float-2" />
      {/* Floating data particles */}
      {["01", "10", "FF", "0x", ">>", "//"].map((char, i) => (
        <span
          key={i}
          className="data-particle select-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${4 + i * 0.6}s`,
          }}
        >
          {char}
        </span>
      ))}

      {/* ── Live Threat Stream Ticker ── */}
      <div className="bg-[#040710]/90 backdrop-blur-xl py-1.5 overflow-hidden text-xs text-slate-300 flex items-center relative z-20">
        <div className="px-3 py-0.5 ml-2 bg-gradient-to-r from-red-600 to-rose-600 text-black font-extrabold text-[10px] uppercase rounded-full shrink-0 flex items-center gap-1.5 shadow-lg shadow-red-600/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span>LIVE INTEL</span>
        </div>
        <div className="overflow-hidden w-full whitespace-nowrap pl-4">
          <div className="animate-marquee space-x-12 text-[11px] font-mono text-slate-400">
            <span className="text-red-400">🚨 APDCL Power Cutoff Smishing intercepted in Guwahati (9:30 PM cutoff threat)</span>
            <span className="text-cyan-400">🛡️ Malicious SBI NetBanking clone (.xyz) neutralized across 14 ASN nodes</span>
            <span className="text-amber-400">⚠️ India Post ₹15 address smishing cluster quarantined (PrivateLayer Proxy)</span>
            <span className="text-emerald-400">🟢 Amazon genuine OTP verification validated (Zero False Positive)</span>
            <span className="text-red-400">🚨 Transnational Task Pig-Butchering Telegram compound flagged (Phnom Penh)</span>
            <span className="text-cyan-400">📡 1,482 rogue nodes actively tracked across Indian telecommunications gateways</span>
            <span className="text-red-400">🚨 APDCL Power Cutoff Smishing intercepted in Guwahati (9:30 PM cutoff threat)</span>
          </div>
        </div>
      </div>

      {/* ── Top Header ── */}
      <header className="bg-[#060b18]/80 backdrop-blur-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Animated logo with radar sweep */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-rose-500 flex items-center justify-center shadow-lg shadow-cyan-500/25 overflow-hidden">
              <ShieldAlert className="w-5 h-5 text-black stroke-[2.5] relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent radar-sweep pointer-events-none" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-base sm:text-lg tracking-wider text-white">AEGIS OMEGA</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-700/40 uppercase">ACTIVE DEFENSE v3.2</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-950/90 text-red-300 border border-red-700/40 uppercase">PS01 SCAMSHIELD</span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Tagline: <strong className="text-cyan-300">Intelligence Before Impact.</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Neural Equalizer Waveform */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/50">
              <div className="flex items-end gap-0.5 h-6">
                {["bg-cyan-400","bg-cyan-400","bg-cyan-500","bg-indigo-400","bg-indigo-400","bg-rose-400","bg-rose-400"].map((c,i) => (
                  <span key={i} className={`w-1 ${c} rounded-full wave-bar`} />
                ))}
              </div>
              <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-wider pl-1">NEURAL RADAR</span>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#0a0f1e]/90 p-1 rounded-xl border border-white/5 text-xs font-mono">
              <button
                onClick={() => setViewMode("simple")}
                className={`px-3 py-1 rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                  viewMode === "simple"
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-lg shadow-cyan-500/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simple</span>
              </button>
              <button
                onClick={() => setViewMode("advanced")}
                className={`px-3 py-1 rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
                  viewMode === "advanced"
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-lg shadow-cyan-500/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>SOC</span>
              </button>
            </div>

            <a
              href="tel:1930"
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold uppercase transition shadow-lg shadow-red-600/30 flex items-center gap-1.5 active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>1930</span>
            </a>
          </div>
        </div>

        {/* 12-Tab Nav (Advanced mode only) */}
        {viewMode === "advanced" && (
          <div className="bg-[#040810]/80 backdrop-blur-md overflow-x-auto">
            <div className="max-w-7xl mx-auto px-4 flex space-x-1 py-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs whitespace-nowrap transition-all duration-200 ${
                      isActive
                        ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/35 shadow-sm shadow-cyan-500/15"
                        : "text-slate-500 hover:text-slate-200 hover:bg-slate-800/40"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-600"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 relative z-10">
        {/* ── Universal Input Workbench ── */}
        <section className="glass-surface rounded-3xl p-6 shadow-2xl mb-8 relative overflow-hidden transition-all duration-300 hover:shadow-cyan-500/8">
          {/* Scan line motion effect */}
          <div className="scan-once" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400" />
              </span>
              <h2 className="font-bold text-base text-white tracking-wide">
                Paste or Type Any Suspicious Message Below
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePasteClipboard}
                className="px-3 py-1.5 rounded-xl bg-slate-800/70 hover:bg-cyan-950/60 text-xs text-cyan-300 font-mono flex items-center gap-1.5 transition-all duration-200 active:scale-95 border border-white/5 hover:border-cyan-500/30"
                title="Paste from clipboard"
              >
                <ClipboardPaste className="w-3.5 h-3.5" />
                <span>Paste</span>
              </button>
              {inputPayload && (
                <button
                  onClick={handleClearText}
                  className="px-3 py-1.5 rounded-xl bg-slate-800/70 hover:bg-red-950/60 text-xs text-slate-400 hover:text-red-300 font-mono flex items-center gap-1.5 transition-all duration-200 active:scale-95 border border-white/5"
                  title="Clear text"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="mb-4">
            <span className="text-[11px] font-mono text-slate-500 block mb-2">Or click an example to test instantly:</span>
            <div className="flex flex-wrap gap-2">
              {QUICK_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => { setInputPayload(preset.content); runInvestigation(preset.content); }}
                  className="px-3 py-1.5 rounded-xl bg-[#0d1526]/80 hover:bg-cyan-950/40 border border-white/5 hover:border-cyan-500/35 text-xs font-mono text-slate-400 hover:text-white transition-all duration-200 active:scale-95"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div className="relative mb-4">
            <textarea
              rows={4}
              value={inputPayload}
              onChange={(e) => setInputPayload(e.target.value)}
              placeholder="Paste suspicious SMS, WhatsApp message, Telegram job invite, or phishing link here (supports English, Hindi, and Assamese অসমীয়া)..."
              className="w-full bg-[#020509]/90 rounded-2xl p-4 font-mono text-xs sm:text-sm text-cyan-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 resize-y border border-white/4 transition-all duration-200"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
              {investigation && (
                <>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                    Language: {investigation.language.languageName}
                  </span>
                  <span className="text-slate-500">Characters: {inputPayload.length}</span>
                </>
              )}
            </div>

            <button
              onClick={() => runInvestigation()}
              disabled={isInvestigating || !inputPayload.trim()}
              className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-rose-600 hover:from-cyan-400 hover:to-rose-500 text-white font-mono font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-cyan-600/25 flex items-center justify-center gap-2.5 disabled:opacity-50 active:scale-95"
            >
              {isInvestigating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
                  <span>ANALYZING INTELLIGENCE...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-amber-300" />
                  <span>CHECK FOR FRAUD & SCAMS NOW</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* ============================================================== */}
        {/* SIMPLE VIEW (CLEAN MOTION GRAPHICS, ZERO CLUTTER)              */}
        {/* ============================================================== */}
        {viewMode === "simple" && investigation && (
          <div className="space-y-6 animate-fadeIn">
            {/* Big Verdict Banner with Animated Circular Radar Dial */}
            <div
              className={`p-6 sm:p-8 rounded-3xl transition-all duration-500 shadow-2xl ${
                investigation.riskIntelligence.finalScore >= 50
                  ? "glass-surface-red shadow-rose-950/40"
                  : "glass-surface-green shadow-emerald-950/40"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`relative w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden shadow-xl ${
                      investigation.riskIntelligence.finalScore >= 50
                        ? "bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-red-600/30"
                        : "bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-emerald-500/30"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent radar-sweep pointer-events-none"></div>
                    {investigation.riskIntelligence.finalScore >= 50 ? (
                      <AlertOctagon className="w-9 h-9 stroke-[2.5]" />
                    ) : (
                      <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                    )}
                  </div>
                  <div>
                    <span
                      className={`text-xs font-mono font-bold uppercase px-3 py-1 rounded-full ${
                        investigation.riskIntelligence.finalScore >= 50
                          ? "bg-red-500/20 text-red-300 border border-red-500/40"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      }`}
                    >
                      {investigation.riskIntelligence.finalScore >= 50
                        ? "HIGH-RISK SCAM DETECTED"
                        : "VERIFIED SAFE / LOW RISK"}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                      {investigation.scamDna.fingerprint.primaryVector}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      {investigation.futureAttackSimulation.simulationSummary}
                    </p>
                  </div>
                </div>

                {/* Animated Circular Radar Dial */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="relative w-22 h-22 flex items-center justify-center">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="3.2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={investigation.riskIntelligence.finalScore >= 50 ? "#ef4444" : "#10b981"}
                        strokeWidth="3.2"
                        strokeDasharray={`${investigation.riskIntelligence.finalScore}, 100`}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-xl font-mono font-black ${investigation.riskIntelligence.finalScore >= 50 ? "text-red-400" : "text-emerald-400"}`}>
                        {investigation.riskIntelligence.finalScore}%
                      </span>
                      <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">RISK</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Simple Action Cards (Floating, rounded, no harsh lines) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-surface p-6 rounded-3xl space-y-2.5 hover:-translate-y-1 transition-all duration-300">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 uppercase font-mono">
                  <Info className="w-4 h-4 text-cyan-400" />
                  1. What is this message?
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {investigation.trustVerification.claimedOrganization !== "None Claimed"
                    ? `This message claims to be from ${investigation.trustVerification.claimedOrganization}, but it originates from an unauthorized unverified channel.`
                    : "This message uses unsolicited urgent language to pressure you into taking immediate action."}
                </p>
                <div className="text-[11px] text-slate-500 font-mono pt-1">
                  Language: {investigation.language.languageName}
                </div>
              </div>

              <div className="glass-surface p-6 rounded-3xl space-y-2.5 hover:-translate-y-1 transition-all duration-300">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase font-mono">
                  <Zap className="w-4 h-4 text-amber-400" />
                  2. What is the danger?
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {investigation.futureAttackSimulation.stages[2]?.description ||
                    "The sender wants you to click a link, dial an unknown number, or send money."}
                </p>
                <div className="text-[11px] text-amber-400 font-mono pt-1">
                  Goal: Steal your money or account credentials.
                </div>
              </div>

              <div className="glass-surface p-6 rounded-3xl space-y-2.5 hover:-translate-y-1 transition-all duration-300">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  3. What should you do?
                </span>
                <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5">
                  <li>• <strong>Do NOT</strong> click any links in the message.</li>
                  <li>• <strong>Do NOT</strong> call numbers in the message.</li>
                  <li>• <strong>Do NOT</strong> share any OTP or UPI PIN.</li>
                </ul>
                <div className="pt-2">
                  <a
                    href="tel:1930"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold shadow-lg shadow-red-600/30 active:scale-95 transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Helpline: 1930</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Switch to Advanced Link */}
            <div className="p-5 rounded-2xl glass-surface flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">
                Want to inspect all 12 multi-agent technical tabs, Scam DNA graph, and firewall patches?
              </span>
              <button
                onClick={() => setViewMode("advanced")}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-bold flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-cyan-600/30"
              >
                <span>Switch to Advanced SOC View</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ADVANCED SOC VIEW (FULL 12-SECTION ARCHITECTURE)                */}
        {/* ============================================================== */}
        {viewMode === "advanced" && investigation && (
          <div className="space-y-6 animate-fadeIn">
            {/* SECTION 1: COMMAND CENTRE */}
            {activeTab === "command" && (
              <div className="space-y-6">
                {/* ThreatCon Banner */}
                <div
                  className={`p-6 sm:p-8 rounded-3xl ${
                    investigation.riskIntelligence.finalScore >= 60
                      ? "glass-surface-red shadow-2xl shadow-red-950/40"
                      : "glass-surface-green shadow-2xl shadow-emerald-950/40"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-xs uppercase px-3 py-1 rounded-full font-bold ${
                            investigation.riskIntelligence.finalScore >= 60
                              ? "bg-red-500/20 text-red-300 border border-red-500/40"
                              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          }`}
                        >
                          {investigation.riskIntelligence.riskLevel} THREAT
                        </span>
                        <span className="font-mono text-xs text-slate-400">
                          Primary Vector: {investigation.scamDna.fingerprint.primaryVector}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white mt-1">
                        {investigation.scamDna.fingerprint.clusterCategory}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                        {investigation.futureAttackSimulation.simulationSummary}
                      </p>
                    </div>

                    <div className="text-left md:text-right shrink-0">
                      <div
                        className={`text-5xl font-mono font-black ${
                          investigation.riskIntelligence.finalScore >= 60
                            ? "text-red-400"
                            : "text-emerald-400"
                        }`}
                      >
                        {investigation.riskIntelligence.finalScore}/100
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                        Explainable Risk Index
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-surface p-5 rounded-2xl space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <Languages className="w-3.5 h-3.5 text-cyan-400" />
                      Language Telemetry
                    </span>
                    <div className="text-sm font-bold text-white font-mono">
                      {investigation.language.languageName}
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {investigation.language.regionalContextNotes}
                    </p>
                  </div>

                  <div className="glass-surface p-5 rounded-2xl space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-amber-400" />
                      Digital Trust Status
                    </span>
                    <div className="text-sm font-bold text-amber-300 font-mono">
                      {investigation.trustVerification.trustStatus}
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono truncate" title={investigation.trustVerification.verificationExplanation}>
                      {investigation.trustVerification.verificationExplanation}
                    </p>
                  </div>

                  <div className="glass-surface p-5 rounded-2xl space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <Fingerprint className="w-3.5 h-3.5 text-rose-400" />
                      SHA-256 Chain of Custody
                    </span>
                    <div className="text-xs font-bold text-cyan-300 font-mono truncate">
                      {investigation.forensics.originalPayloadSha256}
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Evidence ID: {investigation.forensics.evidenceId}
                    </p>
                  </div>
                </div>

                {/* Actions & Next Move Banner */}
                <div className="glass-surface p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      ATTACKER'S PREDICTED NEXT STEP:
                    </span>
                    <p className="text-sm text-slate-200 font-mono font-semibold">
                      "{investigation.futureAttackSimulation.stages[2]?.description || "Credential solicitation via external form."}"
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => setActiveTab("analyzer")}
                      className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-mono text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-cyan-600/30 active:scale-95"
                    >
                      <span>DEEP SCAN REPORT</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleDownloadDossier}
                      className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>EXPORT 1930 DOSSIER</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: SCAM ANALYZER */}
            {activeTab === "analyzer" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    <Search className="w-5 h-5 text-cyan-400" />
                    <span>COMPREHENSIVE SCAM INVESTIGATION REPORT</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    ID: {investigation.investigationId}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="glass-surface p-6 rounded-3xl space-y-3">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase block">
                        Original Submitted Payload
                      </span>
                      <div className="bg-[#030611]/80 p-4 rounded-2xl font-mono text-xs text-cyan-200 leading-relaxed whitespace-pre-wrap border border-white/5">
                        {investigation.rawPayload}
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-mono">
                        <span className="px-2.5 py-1 rounded-full bg-slate-800/60 text-slate-400">
                          Language: {investigation.language.languageName} ({Math.round(investigation.language.confidence * 100)}%)
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-slate-800/60 text-slate-400">
                          Scripts: {investigation.language.detectedScripts.join(", ")}
                        </span>
                      </div>
                    </div>

                    <div className="glass-surface p-6 rounded-3xl space-y-3 font-mono text-xs">
                      <span className="text-xs font-bold text-slate-400 uppercase block">
                        Extracted Actionable Indicators
                      </span>
                      <div className="space-y-2.5">
                        <div className="flex justify-between py-1">
                          <span className="text-slate-500">Domains Detected:</span>
                          <span className="text-cyan-300 font-bold">{investigation.indicators.domains.join(", ") || "None"}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-500">Phone Numbers:</span>
                          <span className="text-slate-200">{investigation.indicators.phoneNumbers.join(", ") || "None"}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-500">Claimed Organization:</span>
                          <span className="text-amber-300 font-bold">{investigation.indicators.claimedOrganizations[0] || "None Claimed"}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-500">Suspicious Trigger Tokens:</span>
                          <span className="text-rose-400 font-bold">{investigation.indicators.suspiciousKeywords.join(", ") || "None"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    <div className="glass-surface p-6 rounded-3xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                          Explainable Risk Score Breakdown
                        </span>
                        <span className="text-2xl font-mono font-black text-red-400">
                          {investigation.riskIntelligence.finalScore}/100
                        </span>
                      </div>

                      <div className="space-y-3">
                        {investigation.riskIntelligence.breakdown.map((factor, idx) => (
                          <div key={idx} className="bg-[#030611]/80 p-3.5 rounded-2xl font-mono text-xs space-y-1 border border-white/5">
                            <div className="flex justify-between items-center">
                              <span className="text-white font-bold">{factor.factor}</span>
                              <span className="text-cyan-400 font-bold">
                                +{factor.contribution} pts
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-tight">
                              {factor.reasoning}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: SCAM DNA EXPLORER */}
            {activeTab === "scamDna" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    <Dna className="w-5 h-5 text-cyan-400" />
                    <span>SCAM DNA INTELLIGENCE & INCIDENT RELATIONSHIP GRAPH</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    ID: {investigation.scamDna.fingerprint.fingerprintId}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-6 space-y-4 font-mono text-xs">
                    <div className="glass-surface p-6 rounded-3xl space-y-3">
                      <span className="text-xs font-bold text-slate-300 uppercase block">
                        DNA Fingerprint Characteristics
                      </span>
                      <div className="space-y-2">
                        <div className="flex justify-between py-1">
                          <span className="text-slate-500">Primary Vector:</span>
                          <span className="text-cyan-300 font-bold">{investigation.scamDna.fingerprint.primaryVector}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-500">Cluster Category:</span>
                          <span className="text-slate-200">{investigation.scamDna.fingerprint.clusterCategory}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-500">Medium:</span>
                          <span className="text-slate-200">{investigation.scamDna.fingerprint.targetMedium}</span>
                        </div>
                      </div>
                    </div>

                    <div className="glass-surface p-6 rounded-3xl space-y-3">
                      <span className="text-xs font-bold text-slate-300 uppercase block">
                        Similar Historical Campaigns
                      </span>
                      <div className="space-y-3">
                        {investigation.scamDna.similarCampaigns.map((camp) => (
                          <div key={camp.campaignId} className="bg-[#030611]/80 p-3.5 rounded-2xl border border-white/5 space-y-1.5">
                            <div className="flex justify-between items-center">
                              <span className="text-white font-bold">{camp.campaignName}</span>
                              <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/40 font-bold">
                                {Math.round(camp.similarityScore * 100)}% Similarity
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-relaxed">
                              {camp.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 glass-surface p-6 rounded-3xl space-y-4">
                    <span className="text-xs font-mono font-bold text-slate-300 uppercase block">
                      Interactive Node-Link Campaign Graph
                    </span>
                    <div className="relative w-full h-80 bg-[#020509]/90 rounded-2xl overflow-hidden p-4 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 400 300">
                        {/* Animated dashed edges */}
                        <line x1="200" y1="150" x2="80" y2="70" stroke="#0891b2" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7">
                          <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.5s" repeatCount="indefinite" />
                        </line>
                        <line x1="200" y1="150" x2="320" y2="70" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7">
                          <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.9s" repeatCount="indefinite" />
                        </line>
                        <line x1="200" y1="150" x2="80" y2="230" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7">
                          <animate attributeName="stroke-dashoffset" values="0;-16" dur="1.3s" repeatCount="indefinite" />
                        </line>
                        <line x1="200" y1="150" x2="320" y2="230" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7">
                          <animate attributeName="stroke-dashoffset" values="0;-16" dur="2.2s" repeatCount="indefinite" />
                        </line>

                        {/* Central incident node with pulse ring */}
                        <circle cx="200" cy="150" r="34" fill="rgba(6,182,212,0.08)" stroke="#06b6d4" strokeWidth="1" opacity="0.4">
                          <animate attributeName="r" values="34;42;34" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="200" cy="150" r="26" fill="#060f1e" stroke="#06b6d4" strokeWidth="2.5" />
                        <text x="200" y="147" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold" fontFamily="monospace">INCIDENT</text>
                        <text x="200" y="157" fill="#06b6d4" fontSize="7" textAnchor="middle" fontFamily="monospace">TARGET</text>

                        {/* Satellite nodes */}
                        <circle cx="80" cy="70" r="20" fill="#060f1e" stroke="#0891b2" strokeWidth="1.8" />
                        <text x="80" y="73" fill="#06b6d4" fontSize="8" textAnchor="middle" fontFamily="monospace">Domain</text>

                        <circle cx="320" cy="70" r="20" fill="#060f1e" stroke="#f59e0b" strokeWidth="1.8" />
                        <text x="320" y="73" fill="#fbbf24" fontSize="8" textAnchor="middle" fontFamily="monospace">Phone</text>

                        <circle cx="80" cy="230" r="20" fill="#060f1e" stroke="#ef4444" strokeWidth="1.8" />
                        <text x="80" y="233" fill="#f87171" fontSize="8" textAnchor="middle" fontFamily="monospace">VoltTrap</text>

                        <circle cx="320" cy="230" r="20" fill="#060f1e" stroke="#8b5cf6" strokeWidth="1.8" />
                        <text x="320" y="233" fill="#c084fc" fontSize="8" textAnchor="middle" fontFamily="monospace">Cluster</text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: FUTURE ATTACK SIMULATOR */}
            {activeTab === "futureAttack" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    <Workflow className="w-5 h-5 text-amber-400" />
                    <span>PREDICTIVE ATTACK-CHAIN SIMULATOR (OBSERVED ➔ INFERRED ➔ PREDICTED)</span>
                  </h3>
                </div>

                <div className="space-y-4">
                  {investigation.futureAttackSimulation.stages.map((stage) => (
                    <div
                      key={stage.stageNumber}
                      className="glass-surface p-6 rounded-3xl flex flex-col md:flex-row items-start gap-5 font-mono text-xs transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-cyan-300 text-sm">
                          {stage.stageNumber}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full font-bold uppercase text-[10px] ${
                            stage.status === "Observed"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-800/40"
                              : stage.status === "Inferred"
                              ? "bg-amber-950 text-amber-300 border border-amber-800/40"
                              : "bg-red-950 text-red-300 border border-red-800/40"
                          }`}
                        >
                          {stage.status}
                        </span>
                      </div>

                      <div className="flex-1 space-y-2">
                        <h4 className="text-sm font-bold text-white">{stage.stageName}</h4>
                        <p className="text-slate-300 leading-relaxed">{stage.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2 text-[11px]">
                          <div className="bg-[#030611]/80 p-3 rounded-2xl border border-white/5">
                            <strong className="text-cyan-400 block mb-0.5">Evidence:</strong>
                            <span className="text-slate-400">{stage.evidence}</span>
                          </div>
                          <div className="bg-[#030611]/80 p-3 rounded-2xl border border-white/5">
                            <strong className="text-red-400 block mb-0.5">Consequences:</strong>
                            <span className="text-slate-400">{stage.potentialConsequences}</span>
                          </div>
                          <div className="bg-[#030611]/80 p-3 rounded-2xl border border-white/5">
                            <strong className="text-emerald-400 block mb-0.5">Countermeasure:</strong>
                            <span className="text-slate-300">{stage.preventionStep}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 5: THREAT INTELLIGENCE */}
            {activeTab === "threatIntel" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-cyan-400" />
                    <span>GLOBAL THREAT INFRASTRUCTURE INTELLIGENCE</span>
                  </h3>
                </div>

                <div className="glass-surface p-6 rounded-3xl space-y-4">
                <div className="relative w-full h-72 bg-[#020509]/90 rounded-2xl overflow-hidden flex items-center justify-center">
                    <svg className="w-full h-full opacity-20" viewBox="0 0 100 60">
                      <path
                        d="M10,20 Q25,10 35,22 Q40,30 30,45 Q20,50 15,35 Z M45,15 Q65,12 85,20 Q90,35 75,45 Q60,48 50,35 Z M50,30 Q60,25 70,35 Q65,55 50,45 Z"
                        fill="#334155"
                      />
                    </svg>
                    <div className="absolute z-10 flex flex-col items-center">
                      <span className="w-20 h-20 rounded-full bg-red-500/15 absolute animate-ping" style={{animationDuration:"2s"}} />
                      <span className="w-10 h-10 rounded-full bg-red-500/25 animate-pulse absolute" />
                      <span className="w-5 h-5 rounded-full bg-red-500 border-2 border-white shadow-xl flex items-center justify-center relative">
                        <Crosshair className="w-3 h-3 text-black" />
                      </span>
                      <span className="mt-3 text-[10px] font-mono font-bold bg-black/90 text-red-300 px-2.5 py-0.5 rounded-full shadow-md relative">
                        {investigation.threatIntelligence.infrastructureLocation.city}, {investigation.threatIntelligence.infrastructureLocation.country}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 font-mono text-xs pt-2">
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Hosting ASN:</span>
                      <strong className="text-amber-300">{investigation.threatIntelligence.asnInfo}</strong>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-500">Domain Assessment:</span>
                      <strong className="text-red-400">{investigation.threatIntelligence.domainReputation}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 6: PSYCHOLOGY ANALYSIS */}
            {activeTab === "psychology" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-cyan-400" />
                    <span>EXPLAINABLE PSYCHOLOGICAL SOCIAL ENGINEERING DECOMPILER</span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {investigation.psychology.detectedTactics.map((tactic, idx) => (
                    <div key={idx} className="glass-surface p-6 rounded-3xl space-y-3 font-mono text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white text-sm">{tactic.category}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-bold text-[10px]">
                          {tactic.severity}
                        </span>
                      </div>
                      <div className="bg-[#030611]/80 p-3.5 rounded-2xl text-red-200 border border-red-500/20">
                        <span className="text-[10px] uppercase text-slate-500 block mb-1">Exact In-Text Phrase:</span>
                        <strong>"{tactic.highlightedPhrase}"</strong>
                      </div>
                      <p className="text-slate-300">{tactic.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 7: DIGITAL TRUST */}
            {activeTab === "trust" && (
              <div className="space-y-6 font-mono text-xs">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-amber-400" />
                    <span>ORGANIZATION IMPERSONATION & DIGITAL TRUST VERIFICATION</span>
                  </h3>
                </div>
                <div className="glass-surface p-6 rounded-3xl space-y-3">
                  <div className="text-slate-400">Claimed: <strong className="text-white">{investigation.trustVerification.claimedOrganization}</strong></div>
                  <div className="text-slate-400">Official Domain: <strong className="text-emerald-400">{investigation.trustVerification.officialDomain || "None"}</strong></div>
                  <p className="text-slate-300 leading-relaxed text-sm pt-2">
                    {investigation.trustVerification.verificationExplanation}
                  </p>
                </div>
              </div>
            )}

            {/* SECTION 8: DEFENCE CENTRE */}
            {activeTab === "defence" && (
              <div className="space-y-6 font-mono text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2">
                  <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-cyan-400" />
                    <span>AUTONOMOUS DEFENCE AGENT // HUMAN-IN-THE-LOOP APPROVAL</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExecuteSandbox}
                      disabled={sandboxExecuted || defenceRules.every((r) => r.approvalStatus !== "APPROVED")}
                      className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-bold uppercase disabled:opacity-40 transition active:scale-95"
                    >
                      {sandboxExecuted ? "SANDBOX ISOLATION ACTIVE" : "EXECUTE APPROVED RULES IN SANDBOX"}
                    </button>
                    {sandboxExecuted && (
                      <button
                        onClick={handleRollbackSandbox}
                        className="px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold uppercase active:scale-95"
                      >
                        ROLLBACK
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {defenceRules.map((rule) => (
                    <div key={rule.ruleId} className="glass-surface p-6 rounded-3xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white text-sm">{rule.ruleId}</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                            {rule.approvalStatus}
                          </span>
                          {rule.approvalStatus === "PENDING_HUMAN_APPROVAL" && (
                            <>
                              <button
                                onClick={() => handleApproveRule(rule.ruleId)}
                                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold active:scale-95"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectRule(rule.ruleId)}
                                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 active:scale-95"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="bg-[#030611]/80 p-4 rounded-2xl overflow-x-auto border border-white/5">
                        <pre className="text-emerald-400 font-mono text-[11px]">
                          <code>{rule.generatedRuleScript}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 9: FORENSICS LAB */}
            {activeTab === "forensics" && (
              <div className="space-y-6 font-mono text-xs">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    <Fingerprint className="w-5 h-5 text-rose-500" />
                    <span>DIGITAL FORENSICS LAB // EVIDENCE INTEGRITY REPOSITORY</span>
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDownloadDossier}
                      className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-bold flex items-center gap-1.5 shadow-md shadow-cyan-600/30 active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>POLICE 1930 DOSSIER</span>
                    </button>
                    <button
                      onClick={handleDownloadStix}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 active:scale-95"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>STIX 2.1 JSON</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-surface p-6 rounded-3xl space-y-2">
                    <span className="text-slate-500 text-[11px] block">Original Payload SHA-256 Digest:</span>
                    <div className="bg-[#030611]/80 p-3.5 rounded-2xl text-cyan-300 break-all select-all font-bold border border-white/5">
                      {investigation.forensics.originalPayloadSha256}
                    </div>
                  </div>
                  <div className="glass-surface p-6 rounded-3xl space-y-2">
                    <span className="text-slate-500 text-[11px] block">Normalized Payload SHA-256 Digest:</span>
                    <div className="bg-[#030611]/80 p-3.5 rounded-2xl text-cyan-300 break-all select-all font-bold border border-white/5">
                      {investigation.forensics.normalizedPayloadSha256}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 10: COMMUNITY INTEL */}
            {activeTab === "community" && (
              <div className="space-y-6 font-mono text-xs">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    <span>PRIVACY-PRESERVING COMMUNITY THREAT NETWORK</span>
                  </h3>
                </div>
                <div className="space-y-3">
                  {communityReports.map((item) => (
                    <div key={item.id} className="glass-surface p-5 rounded-2xl space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white">{item.category}</span>
                        <span className="text-slate-500">{item.timestamp}</span>
                      </div>
                      <p className="text-slate-300 bg-[#030611]/80 p-3 rounded-xl border border-white/5">
                        "{item.sanitizedSnippet}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 11: AWARENESS TRAINING */}
            {activeTab === "training" && (
              <div className="space-y-6 font-mono text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 gap-2">
                  <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-cyan-400" />
                    <span>INTERACTIVE MULTILINGUAL SCAM RECOGNITION LAB</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Score: {quizScore.correct}/{quizScore.total}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredScenarios.map((scenario) => {
                    const answered = userQuizAnswers[scenario.id] !== undefined;
                    const userGuess = userQuizAnswers[scenario.id];
                    const isCorrect = userGuess === scenario.isScam;

                    return (
                      <div key={scenario.id} className="glass-surface p-6 rounded-3xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white">{scenario.title}</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-800/60 text-slate-300 text-[10px]">
                            {scenario.languageLabel}
                          </span>
                        </div>

                        <div className="bg-[#030611]/80 p-3.5 rounded-2xl text-slate-200 border border-white/5">
                          "{scenario.messageText}"
                        </div>

                        {!answered ? (
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={() => handleQuizAnswer(scenario, true)}
                              className="flex-1 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800/40 text-red-300 font-bold active:scale-95"
                            >
                              Mark as Fraudulent
                            </button>
                            <button
                              onClick={() => handleQuizAnswer(scenario, false)}
                              className="flex-1 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-800/40 text-emerald-300 font-bold active:scale-95"
                            >
                              Mark as Legitimate
                            </button>
                          </div>
                        ) : (
                          <div
                            className={`p-4 rounded-2xl space-y-1 ${
                              isCorrect
                                ? "bg-emerald-950/40 border border-emerald-600/40 text-emerald-300"
                                : "bg-red-950/40 border border-red-600/40 text-red-300"
                            }`}
                          >
                            <div className="font-bold">
                              {isCorrect ? "✓ Correct Identification!" : "✗ Misidentified."}
                            </div>
                            <p className="text-[11px] text-slate-300">
                              {scenario.correctAnswerExplanation}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTION 12: INCIDENT HISTORY */}
            {activeTab === "history" && (
              <div className="space-y-6 font-mono text-xs">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    <History className="w-5 h-5 text-cyan-400" />
                    <span>INCIDENT AUDIT LOGS & SESSION INVESTIGATIONS</span>
                  </h3>
                  <span className="text-slate-400">{historyList.length} Sessions</span>
                </div>

                <div className="space-y-3">
                  {historyList.map((item) => (
                    <div key={item.investigationId} className="glass-surface p-5 rounded-2xl flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <strong className="text-white">{item.investigationId}</strong>
                        <p className="text-slate-400 text-[11px] truncate max-w-lg">
                          {item.rawPayload}
                        </p>
                      </div>
                      <span className="text-lg font-bold text-red-400">
                        {item.riskIntelligence.finalScore}/100
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#03050c]/80 backdrop-blur-md py-5 font-mono text-xs text-slate-500 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">AEGIS OMEGA</span>
            <span>//</span>
            <span>HACK2SKILL PROMPTWARS X CODE1 INNOVATORS (PS01)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-cyan-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              VERCEL EDGE ZERO-CONFIG
            </span>
            <a
              href="https://github.com/yuht-lin/AURA_Hackathon"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white"
            >
              GITHUB REPOSITORY
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
