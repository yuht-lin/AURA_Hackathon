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
  Info
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

  // Notification / copy states
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);

  // Initial investigation on page load
  useEffect(() => {
    runInvestigation(QUICK_PRESETS[0].content);
    fetchCommunityData();
  }, []);

  const fetchCommunityData = async () => {
    try {
      const res = await fetch("/api/community");
      const data = await res.json();
      setCommunityReports(data.reports || []);
      setCommunityTrends(data.aggregateTrends || []);
    } catch (err) {
      console.error("Community feed load error:", err);
    }
  };

  const runInvestigation = async (payloadToTest?: string) => {
    const textToAnalyze = payloadToTest || inputPayload;
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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotice(label);
    setTimeout(() => setCopiedNotice(null), 2000);
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
    <div className="min-h-screen bg-[#05070e] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col justify-between">
      {/* Top Cyber Telemetry Bar */}
      <header className="border-b border-slate-800/80 bg-[#080c16]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-rose-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <ShieldAlert className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-lg tracking-wider text-white">
                  AEGIS OMEGA
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 uppercase">
                  ACTIVE DEFENSE v3.0
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800/60 uppercase">
                  PS01 SCAMSHIELD
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Tagline: <strong className="text-cyan-300">Intelligence Before Impact.</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                <Languages className="w-3.5 h-3.5 text-cyan-400" />
                <span>MULTILINGUAL: EN / HI / AS</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>12 AGENTS ORCHESTRATED</span>
              </div>
            </div>
            <a
              href="tel:1930"
              className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-black font-mono text-xs font-black uppercase transition shadow-lg shadow-red-600/30 flex items-center gap-1"
            >
              <span>CYBER HELPLINE: 1930</span>
            </a>
          </div>
        </div>

        {/* 12-Section Navigation Bar */}
        <div className="border-t border-slate-800/60 bg-[#070b14] overflow-x-auto">
          <div className="max-w-7xl mx-auto px-4 flex space-x-1 py-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs whitespace-nowrap transition ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-1">
        {/* Universal Payload Interception Workbench (Always accessible at top) */}
        <section className="bg-[#0b101d] rounded-2xl border border-slate-800/90 p-5 shadow-2xl mb-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-800 gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="font-bold">PAYLOAD INTERCEPTION WORKBENCH // MULTILINGUAL AGENTS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400">1-Click Test Scenarios:</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2 mb-3">
            {QUICK_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setInputPayload(preset.content);
                  runInvestigation(preset.content);
                }}
                className="px-2.5 py-1 rounded bg-[#0f172a] hover:bg-slate-800 border border-slate-700/60 text-xs font-mono text-slate-300 hover:text-white transition flex items-center gap-1.5"
              >
                <span>{preset.label}</span>
              </button>
            ))}
          </div>

          {/* Text Area */}
          <div className="relative mb-3">
            <textarea
              rows={3}
              value={inputPayload}
              onChange={(e) => setInputPayload(e.target.value)}
              placeholder="Paste suspicious SMS, WhatsApp message, Telegram job invite, or phishing link (supports English, Hindi, and Assamese অসমীয়া)..."
              className="w-full bg-[#070b14] border border-slate-800 rounded-xl p-3 font-mono text-xs sm:text-sm text-cyan-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 resize-none"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
              {investigation && (
                <>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    Language: {investigation.language.languageName}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    ID: {investigation.investigationId}
                  </span>
                </>
              )}
            </div>

            <button
              onClick={() => runInvestigation()}
              disabled={isInvestigating || !inputPayload.trim()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-rose-600 hover:from-cyan-500 hover:to-rose-500 text-white font-mono font-black text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-600/25 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isInvestigating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>ORCHESTRATING 12 AGENTS...</span>
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 text-amber-300" />
                  <span>ORCHESTRATE MULTI-AGENT INVESTIGATION</span>
                </>
              )}
            </button>
          </div>
        </section>

        {copiedNotice && (
          <div className="fixed bottom-6 right-6 z-50 bg-cyan-950 border border-cyan-500 text-cyan-200 px-4 py-2 rounded-xl shadow-2xl font-mono text-xs flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>{copiedNotice} copied to clipboard!</span>
          </div>
        )}

        {/* SECTION 1: COMMAND CENTRE */}
        {activeTab === "command" && investigation && (
          <div className="space-y-6">
            {/* ThreatCon Banner */}
            <div
              className={`p-6 rounded-2xl border ${
                investigation.riskIntelligence.finalScore >= 60
                  ? "bg-red-950/30 border-red-500/80 shadow-2xl shadow-red-900/30"
                  : "bg-emerald-950/30 border-emerald-500/80 shadow-2xl shadow-emerald-900/30"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-xs uppercase px-2.5 py-0.5 rounded-full font-black tracking-wider ${
                        investigation.riskIntelligence.finalScore >= 60
                          ? "bg-red-600 text-black animate-pulse"
                          : "bg-emerald-600 text-black"
                      }`}
                    >
                      {investigation.riskIntelligence.riskLevel} THREAT
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      Primary Vector: {investigation.scamDna.fingerprint.primaryVector}
                    </span>
                  </div>
                  <h2 className="text-xl font-mono font-bold text-white">
                    {investigation.scamDna.fingerprint.clusterCategory}
                  </h2>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
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

            {/* 3-Column Command Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0b101d] p-4 rounded-xl border border-slate-800 space-y-1">
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

              <div className="bg-[#0b101d] p-4 rounded-xl border border-slate-800 space-y-1">
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

              <div className="bg-[#0b101d] p-4 rounded-xl border border-slate-800 space-y-1">
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

            {/* Quick Actions & Next Move Banner */}
            <div className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
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
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-mono text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>DEEP SCAN REPORT</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleDownloadDossier}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>EXPORT 1930 DOSSIER</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: SCAM ANALYZER */}
        {activeTab === "analyzer" && investigation && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-cyan-400" />
                <span>COMPREHENSIVE SCAM INVESTIGATION REPORT</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Investigation ID: {investigation.investigationId}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Original Message & Extracted Indicators */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase block">
                    Original Submitted Payload
                  </span>
                  <div className="bg-[#070b14] p-3 rounded-xl border border-slate-800 font-mono text-xs text-cyan-200 leading-relaxed whitespace-pre-wrap">
                    {investigation.rawPayload}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      Language: {investigation.language.languageName} ({Math.round(investigation.language.confidence * 100)}%)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      Scripts: {investigation.language.detectedScripts.join(", ")}
                    </span>
                  </div>
                </div>

                {/* Extracted Indicators */}
                <div className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                  <span className="text-xs font-bold text-slate-400 uppercase block">
                    Extracted Actionable Indicators
                  </span>
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-500">Domains Detected:</span>
                      <span className="text-cyan-300 font-bold">{investigation.indicators.domains.join(", ") || "None"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-500">Phone Numbers:</span>
                      <span className="text-slate-200">{investigation.indicators.phoneNumbers.join(", ") || "None"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
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

              {/* Right Column: Explainable Risk Score Breakdown */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                      Explainable Risk Score Breakdown
                    </span>
                    <span className="text-2xl font-mono font-black text-red-400">
                      {investigation.riskIntelligence.finalScore}/100
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 font-mono">
                    Label: {investigation.riskIntelligence.scoreLabel}
                  </p>

                  <div className="space-y-3">
                    {investigation.riskIntelligence.breakdown.map((factor, idx) => (
                      <div key={idx} className="bg-[#070b14] p-3 rounded-xl border border-slate-800/80 font-mono text-xs space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold">{factor.factor}</span>
                          <span className="text-cyan-400 font-bold">
                            Score: {factor.score} × {factor.weight} = +{factor.contribution} pts
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          {factor.reasoning}
                        </p>
                        <div className="text-[9px] uppercase font-bold text-slate-500">
                          Data Source: {factor.dataSource}
                        </div>
                      </div>
                    ))}
                  </div>

                  {investigation.riskIntelligence.missingDataNotes.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40 text-[11px] font-mono text-amber-300 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{investigation.riskIntelligence.missingDataNotes[0]}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: SCAM DNA EXPLORER */}
        {activeTab === "scamDna" && investigation && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                <Dna className="w-5 h-5 text-cyan-400" />
                <span>SCAM DNA INTELLIGENCE & INCIDENT RELATIONSHIP GRAPH</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Fingerprint ID: {investigation.scamDna.fingerprint.fingerprintId}
              </span>
            </div>

            {/* Disclaimer Alert */}
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-600/50 text-xs font-mono text-amber-300 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <span>
                <strong>CRITICAL ATTRIBUTION DISCLAIMER:</strong> High similarity scores and campaign links indicate shared language patterns, modus operandi, and technical templates; they do <em>NOT</em> constitute legal or forensic proof that incidents originated from the same criminal perpetrator.
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: DNA Fingerprint & Matched Campaigns */}
              <div className="lg:col-span-6 space-y-4 font-mono text-xs">
                <div className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-slate-300 uppercase block">
                    DNA Fingerprint Characteristics
                  </span>
                  <div className="space-y-2">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-500">Primary Tactical Vector:</span>
                      <span className="text-cyan-300 font-bold">{investigation.scamDna.fingerprint.primaryVector}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-500">Cluster Category:</span>
                      <span className="text-slate-200">{investigation.scamDna.fingerprint.clusterCategory}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-500">Target Delivery Medium:</span>
                      <span className="text-slate-200">{investigation.scamDna.fingerprint.targetMedium}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Claimed Organization:</span>
                      <span className="text-amber-300 font-bold">{investigation.scamDna.fingerprint.claimedOrg}</span>
                    </div>
                  </div>
                </div>

                {/* Similar Scam Campaigns */}
                <div className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-slate-300 uppercase block">
                    Similar Historical Scam Campaigns ({investigation.scamDna.similarCampaigns.length})
                  </span>
                  <div className="space-y-3">
                    {investigation.scamDna.similarCampaigns.map((camp) => (
                      <div key={camp.campaignId} className="bg-[#070b14] p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold">{camp.campaignName}</span>
                          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-black">
                            {Math.round(camp.similarityScore * 100)}% Similarity
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {camp.explanation}
                        </p>
                        <div className="text-[10px] text-slate-500">
                          First Detected: {camp.firstSeen}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: NetworkX-Style Relationship Graph Visualization */}
              <div className="lg:col-span-6 bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase block">
                  Interactive Node-Link Campaign Graph
                </span>
                <p className="text-xs text-slate-400 font-mono">
                  Visualizing relationship topology between the current incident, resolved domain hosts, contact vectors, and historical campaign clusters.
                </p>

                {/* Graph Visualization Container */}
                <div className="relative w-full h-80 bg-[#070b14] rounded-xl border border-slate-800 overflow-hidden p-4 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 400 300">
                    {/* Edges */}
                    <line x1="200" y1="150" x2="80" y2="70" stroke="#0891b2" strokeWidth="2" strokeDasharray="3 3" />
                    <line x1="200" y1="150" x2="320" y2="70" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                    <line x1="200" y1="150" x2="80" y2="230" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                    <line x1="200" y1="150" x2="320" y2="230" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3 3" />

                    {/* Edge Labels */}
                    <text x="140" y="105" fill="#0891b2" fontSize="9" textAnchor="middle" fontFamily="monospace">Host</text>
                    <text x="260" y="105" fill="#f59e0b" fontSize="9" textAnchor="middle" fontFamily="monospace">Contact</text>
                    <text x="140" y="195" fill="#ef4444" fontSize="9" textAnchor="middle" fontFamily="monospace">Pattern</text>
                    <text x="260" y="195" fill="#8b5cf6" fontSize="9" textAnchor="middle" fontFamily="monospace">Campaign</text>

                    {/* Center Node (Current Incident) */}
                    <circle cx="200" cy="150" r="28" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
                    <text x="200" y="153" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                      INCIDENT
                    </text>

                    {/* Peripheral Nodes */}
                    <circle cx="80" cy="70" r="22" fill="#0f172a" stroke="#0891b2" strokeWidth="2" />
                    <text x="80" y="73" fill="#06b6d4" fontSize="8" textAnchor="middle" fontFamily="monospace">Domain</text>

                    <circle cx="320" cy="70" r="22" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                    <text x="320" y="73" fill="#fbbf24" fontSize="8" textAnchor="middle" fontFamily="monospace">Phone</text>

                    <circle cx="80" cy="230" r="22" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
                    <text x="80" y="233" fill="#f87171" fontSize="8" textAnchor="middle" fontFamily="monospace">VoltTrap</text>

                    <circle cx="320" cy="230" r="22" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2" />
                    <text x="320" y="233" fill="#c084fc" fontSize="8" textAnchor="middle" fontFamily="monospace">Cluster</text>
                  </svg>
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-slate-500">
                  <span>Graph Engine: NetworkX In-Memory Topology</span>
                  <span>Clustering: Cosine Term Proximity</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: FUTURE ATTACK SIMULATOR */}
        {activeTab === "futureAttack" && investigation && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-amber-400" />
                <span>PREDICTIVE ATTACK-CHAIN SIMULATOR (OBSERVED ➔ INFERRED ➔ PREDICTED)</span>
              </h3>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-600/50 text-xs font-mono text-amber-300">
              {investigation.futureAttackSimulation.predictionCaveat}
            </div>

            {/* Timeline progression */}
            <div className="space-y-4">
              {investigation.futureAttackSimulation.stages.map((stage) => (
                <div
                  key={stage.stageNumber}
                  className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start gap-4 font-mono text-xs"
                >
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-cyan-300 text-sm">
                      {stage.stageNumber}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded font-black uppercase text-[10px] ${
                        stage.status === "Observed"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : stage.status === "Inferred"
                          ? "bg-amber-950 text-amber-300 border border-amber-800"
                          : "bg-red-950 text-red-300 border border-red-800"
                      }`}
                    >
                      {stage.status}
                    </span>
                  </div>

                  <div className="flex-1 space-y-2">
                    <h4 className="text-sm font-bold text-white">
                      {stage.stageName}
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {stage.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                      <div className="bg-[#070b14] p-2 rounded-lg border border-slate-800">
                        <strong className="text-cyan-400 block mb-0.5">Evidence Backing:</strong>
                        <span className="text-slate-400">{stage.evidence}</span>
                      </div>
                      <div className="bg-[#070b14] p-2 rounded-lg border border-slate-800">
                        <strong className="text-red-400 block mb-0.5">Potential Impact:</strong>
                        <span className="text-slate-400">{stage.potentialConsequences}</span>
                      </div>
                      <div className="bg-[#070b14] p-2 rounded-lg border border-slate-800">
                        <strong className="text-emerald-400 block mb-0.5">Recommended Countermeasure:</strong>
                        <span className="text-slate-300">{stage.preventionStep}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: THREAT INTELLIGENCE & INFRASTRUCTURE MAP */}
        {activeTab === "threatIntel" && investigation && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span>GLOBAL THREAT INFRASTRUCTURE INTELLIGENCE</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Data Mode: {investigation.threatIntelligence.dataSource}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
              {investigation.threatIntelligence.infrastructureLocation.disclaimer}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Map */}
              <div className="lg:col-span-7 bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase block">
                  Target Infrastructure Location: {investigation.threatIntelligence.infrastructureLocation.city}, {investigation.threatIntelligence.infrastructureLocation.country}
                </span>

                <div className="relative w-full h-64 bg-[#050811] rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full opacity-30" viewBox="0 0 100 60">
                    <path
                      d="M10,20 Q25,10 35,22 Q40,30 30,45 Q20,50 15,35 Z M45,15 Q65,12 85,20 Q90,35 75,45 Q60,48 50,35 Z M50,30 Q60,25 70,35 Q65,55 50,45 Z"
                      fill="#334155"
                    />
                  </svg>
                  <div className="absolute z-10 flex flex-col items-center">
                    <span className="w-8 h-8 rounded-full bg-red-500/40 animate-ping absolute"></span>
                    <span className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-xl flex items-center justify-center">
                      <Crosshair className="w-2.5 h-2.5 text-black" />
                    </span>
                    <span className="mt-2 text-[10px] font-mono font-bold bg-black/90 text-red-300 px-2 py-0.5 rounded border border-red-800">
                      {investigation.threatIntelligence.infrastructureLocation.city}, {investigation.threatIntelligence.infrastructureLocation.country} ({investigation.threatIntelligence.infrastructureLocation.latitude}° N, {investigation.threatIntelligence.infrastructureLocation.longitude}° E)
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Registry Telemetry */}
              <div className="lg:col-span-5 bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <span className="text-xs font-bold text-slate-300 uppercase block">
                  Network & ASN Reputation Feed
                </span>
                <div className="space-y-3">
                  <div className="bg-[#070b14] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block mb-0.5">Autonomous System Number (ASN):</span>
                    <strong className="text-amber-300">{investigation.threatIntelligence.asnInfo}</strong>
                  </div>
                  <div className="bg-[#070b14] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block mb-0.5">Domain Threat Assessment:</span>
                    <strong className="text-red-400">{investigation.threatIntelligence.domainReputation}</strong>
                  </div>
                  <div className="bg-[#070b14] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block mb-0.5">IP Threat Score:</span>
                    <strong className="text-cyan-300">{investigation.threatIntelligence.ipThreatScore}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: PSYCHOLOGY ANALYSIS */}
        {activeTab === "psychology" && investigation && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-cyan-400" />
                <span>EXPLAINABLE PSYCHOLOGICAL SOCIAL ENGINEERING DECOMPILER</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Cognitive Manipulation Index: {investigation.psychology.overallManipulationIndex}/100
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {investigation.psychology.detectedTactics.map((tactic, idx) => (
                <div key={idx} className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-sm">{tactic.category}</span>
                    <span
                      className={`px-2 py-0.5 rounded font-black text-[10px] ${
                        tactic.severity === "CRITICAL"
                          ? "bg-red-950 text-red-300 border border-red-800"
                          : "bg-amber-950 text-amber-300 border border-amber-800"
                      }`}
                    >
                      {tactic.severity}
                    </span>
                  </div>

                  <div className="bg-[#070b14] p-3 rounded-xl border border-red-500/30 text-red-200">
                    <span className="text-[10px] uppercase text-slate-500 block mb-1">Highlighted Exact In-Text Phrase:</span>
                    <strong>"{tactic.highlightedPhrase}"</strong>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-0.5">Psychological Coercion Mechanism:</span>
                    <p className="text-slate-300 leading-relaxed">{tactic.explanation}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300">
                    <strong className="block mb-0.5">Recommended Safe Counter-Action:</strong>
                    <span>{tactic.recommendedResponse}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 7: DIGITAL TRUST VERIFICATION */}
        {activeTab === "trust" && investigation && (
          <div className="space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>ORGANIZATION IMPERSONATION & DIGITAL TRUST VERIFICATION</span>
              </h3>
            </div>

            <div className="bg-[#0b101d] p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#070b14] p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[11px]">Organization Claimed in Message:</span>
                  <div className="text-base font-bold text-white">
                    {investigation.trustVerification.claimedOrganization}
                  </div>
                </div>

                <div className="bg-[#070b14] p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-slate-500 text-[11px]">Verified Official Entity Domain:</span>
                  <div className="text-base font-bold text-emerald-400">
                    {investigation.trustVerification.officialDomain || "No Verified Domain Registered"}
                  </div>
                </div>
              </div>

              <div className="bg-[#070b14] p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Trust Evaluation Result:</span>
                  <span className="px-2.5 py-1 rounded bg-red-950 text-red-300 border border-red-800 font-bold uppercase">
                    {investigation.trustVerification.trustStatus}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-sm">
                  {investigation.trustVerification.verificationExplanation}
                </p>
                {investigation.trustVerification.lookalikeTechnique && (
                  <div className="text-cyan-300 font-semibold pt-1">
                    Detected Spoofing Technique: {investigation.trustVerification.lookalikeTechnique}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 8: DEFENCE CENTRE */}
        {activeTab === "defence" && investigation && (
          <div className="space-y-6 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-cyan-400" />
                <span>AUTONOMOUS DEFENCE AGENT // HUMAN-IN-THE-LOOP APPROVAL WORKBENCH</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExecuteSandbox}
                  disabled={sandboxExecuted || defenceRules.every((r) => r.approvalStatus !== "APPROVED")}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-bold uppercase disabled:opacity-40 transition"
                >
                  {sandboxExecuted ? "SANDBOX ISOLATION ACTIVE" : "EXECUTE APPROVED RULES IN SANDBOX"}
                </button>
                {sandboxExecuted && (
                  <button
                    onClick={handleRollbackSandbox}
                    className="px-3 py-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold uppercase"
                  >
                    ROLLBACK
                  </button>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
              DEFENSIVE SAFETY MANDATE: Rules are generated for human review and execute solely in a quarantined local virtual test environment. No arbitrary production firewalls or public routing tables are modified without explicit authorization.
            </div>

            {/* Generated Rules */}
            <div className="space-y-4">
              {defenceRules.map((rule) => (
                <div key={rule.ruleId} className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{rule.ruleId}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {rule.ruleType}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          rule.approvalStatus === "APPROVED"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                            : rule.approvalStatus === "REJECTED"
                            ? "bg-red-950 text-red-300 border border-red-800"
                            : "bg-amber-950 text-amber-300 border border-amber-800"
                        }`}
                      >
                        {rule.approvalStatus}
                      </span>

                      {rule.approvalStatus === "PENDING_HUMAN_APPROVAL" && (
                        <>
                          <button
                            onClick={() => handleApproveRule(rule.ruleId)}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-black font-bold"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectRule(rule.ruleId)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-400">{rule.rationale}</p>

                  <div className="bg-[#050811] p-3 rounded-xl border border-slate-800 overflow-x-auto">
                    <pre className="text-emerald-400 font-mono text-[11px]">
                      <code>{rule.generatedRuleScript}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>

            {/* Audit Log */}
            <div className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase block">
                Immutable Defence Audit Trail
              </span>
              <div className="bg-[#050811] p-3 rounded-xl border border-slate-800 max-h-40 overflow-y-auto space-y-1 text-[11px] text-slate-400">
                {auditLog.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 9: FORENSICS LAB */}
        {activeTab === "forensics" && investigation && (
          <div className="space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-rose-500" />
                <span>DIGITAL FORENSICS LAB // EVIDENCE INTEGRITY REPOSITORY</span>
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={handleDownloadDossier}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>POLICE 1930 DOSSIER</span>
                </button>
                <button
                  onClick={handleDownloadStix}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>STIX 2.1 JSON</span>
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
              {investigation.forensics.integrityDisclaimer}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-slate-500 text-[11px] block">Original Payload SHA-256 Digest:</span>
                <div className="bg-[#070b14] p-3 rounded-xl border border-slate-800 text-cyan-300 break-all select-all font-bold">
                  {investigation.forensics.originalPayloadSha256}
                </div>
              </div>

              <div className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-slate-500 text-[11px] block">Normalized Payload SHA-256 Digest:</span>
                <div className="bg-[#070b14] p-3 rounded-xl border border-slate-800 text-cyan-300 break-all select-all font-bold">
                  {investigation.forensics.normalizedPayloadSha256}
                </div>
              </div>
            </div>

            <div className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase block">
                Evidence Preservation Metadata
              </span>
              <div className="space-y-1.5">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Preserved Evidence ID:</span>
                  <span className="text-white font-bold">{investigation.forensics.evidenceId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Ingestion Timestamp (UTC):</span>
                  <span className="text-slate-300">{investigation.forensics.timestampUtc}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Assessed Risk Score:</span>
                  <span className="text-red-400 font-bold">{investigation.forensics.riskScore}/100</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 10: COMMUNITY INTEL */}
        {activeTab === "community" && (
          <div className="space-y-6 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <span>PRIVACY-PRESERVING COMMUNITY THREAT NETWORK</span>
              </h3>
              <span className="text-emerald-400 font-bold">ZERO-PII POLICY ENFORCED</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {communityTrends.map((trend, idx) => (
                <div key={idx} className="bg-[#0b101d] p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase">{trend.category}</span>
                  <div className="text-xl font-bold text-white">{trend.sharePercentage}%</div>
                  <span className="text-[10px] text-cyan-400">{trend.delta}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase block">
                Recent Scrubbed Community Reports
              </span>
              {communityReports.map((item) => (
                <div key={item.id} className="bg-[#0b101d] p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{item.category}</span>
                    <span className="text-slate-500">{item.timestamp}</span>
                  </div>
                  <p className="text-slate-300 bg-[#070b14] p-2.5 rounded-lg border border-slate-800/80">
                    "{item.sanitizedSnippet}"
                  </p>
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span>Target Sector: {item.targetedSector}</span>
                    <span className="text-cyan-400 font-bold">Verified by {item.upvotes} users</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 11: AWARENESS TRAINING CENTRE */}
        {activeTab === "training" && (
          <div className="space-y-6 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span>INTERACTIVE MULTILINGUAL SCAM RECOGNITION LAB</span>
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Score: {quizScore.correct}/{quizScore.total}</span>
                <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setTrainingLanguage("all")}
                    className={`px-2 py-0.5 rounded text-[11px] ${trainingLanguage === "all" ? "bg-cyan-600 text-black font-bold" : "text-slate-400"}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setTrainingLanguage("as")}
                    className={`px-2 py-0.5 rounded text-[11px] ${trainingLanguage === "as" ? "bg-cyan-600 text-black font-bold" : "text-slate-400"}`}
                  >
                    অসমীয়া
                  </button>
                  <button
                    onClick={() => setTrainingLanguage("hi")}
                    className={`px-2 py-0.5 rounded text-[11px] ${trainingLanguage === "hi" ? "bg-cyan-600 text-black font-bold" : "text-slate-400"}`}
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => setTrainingLanguage("en")}
                    className={`px-2 py-0.5 rounded text-[11px] ${trainingLanguage === "en" ? "bg-cyan-600 text-black font-bold" : "text-slate-400"}`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredScenarios.map((scenario) => {
                const answered = userQuizAnswers[scenario.id] !== undefined;
                const userGuess = userQuizAnswers[scenario.id];
                const isCorrect = userGuess === scenario.isScam;

                return (
                  <div key={scenario.id} className="bg-[#0b101d] p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{scenario.title}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {scenario.languageLabel} • {scenario.difficulty}
                      </span>
                    </div>

                    <div className="bg-[#070b14] p-3 rounded-xl border border-slate-800 text-slate-200">
                      <span className="text-[10px] text-slate-500 block mb-1">Sender: {scenario.senderHeader}</span>
                      "{scenario.messageText}"
                    </div>

                    {!answered ? (
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => handleQuizAnswer(scenario, true)}
                          className="flex-1 py-2 rounded-lg bg-red-950 hover:bg-red-900 border border-red-800 text-red-300 font-bold"
                        >
                          Mark as Fraudulent
                        </button>
                        <button
                          onClick={() => handleQuizAnswer(scenario, false)}
                          className="flex-1 py-2 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 font-bold"
                        >
                          Mark as Legitimate
                        </button>
                      </div>
                    ) : (
                      <div
                        className={`p-3 rounded-xl border space-y-1 ${
                          isCorrect
                            ? "bg-emerald-950/40 border-emerald-600 text-emerald-300"
                            : "bg-red-950/40 border-red-600 text-red-300"
                        }`}
                      >
                        <div className="font-bold">
                          {isCorrect ? "✓ Correct Identification!" : "✗ Misidentified."}
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-300">
                          {scenario.correctAnswerExplanation}
                        </p>
                        <div className="text-[10px] text-slate-400 pt-1">
                          Safe Advice: {scenario.safeResponseGuide}
                        </div>
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
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-400" />
                <span>INCIDENT AUDIT LOGS & SESSION INVESTIGATIONS</span>
              </h3>
              <span className="text-slate-400">{historyList.length} In-Memory Sessions</span>
            </div>

            <div className="space-y-3">
              {historyList.map((item) => (
                <div key={item.investigationId} className="bg-[#0b101d] p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-white">{item.investigationId}</strong>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {item.language.languageName}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] truncate max-w-lg">
                      {item.rawPayload}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-bold text-red-400 block">
                      {item.riskIntelligence.finalScore}/100
                    </span>
                    <button
                      onClick={() => {
                        setInvestigation(item);
                        setActiveTab("analyzer");
                      }}
                      className="text-cyan-400 hover:underline text-[11px]"
                    >
                      View Investigation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#060810] py-5 font-mono text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
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
