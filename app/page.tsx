"use client";

import React, { useState } from "react";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  UploadCloud,
  ExternalLink,
  PhoneCall,
  Zap,
  Briefcase,
  Building2,
  Package,
  Gift,
  CheckCircle2,
  XCircle,
  Copy,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info,
  Lock,
  Globe
} from "lucide-react";
import { AnalysisResponse } from "./api/analyze/route";

const DEMO_PRESETS = [
  {
    id: "electricity",
    label: "Electricity Bill Cutoff",
    icon: Zap,
    type: "text",
    content: "Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from the electricity office because your previous month's bill was not updated. Please immediately contact our electricity officer Mr. Sharma at 9876543210. Thank you."
  },
  {
    id: "job",
    label: "Telegram / YouTube Job",
    icon: Briefcase,
    type: "text",
    content: "CONGRATULATIONS! You have been selected for Part-Time Work from Home. Earn Rs. 3,000 - 8,000 daily by simply liking YouTube videos & rating Google Maps hotels. No experience required. Join our official manager on Telegram: https://t.me/quick_cash_india_job to claim your Rs. 500 joining bonus!"
  },
  {
    id: "kyc",
    label: "Bank Account KYC Block",
    icon: Building2,
    type: "text",
    content: "URGENT NOTICE: Dear SBI Customer, your NetBanking and ATM service has been blocked due to pending KYC verification. Please click here: http://sbi-kyc-update-portal.xyz/verify to update your PAN Card and avoid account freeze within 24 hours."
  },
  {
    id: "courier",
    label: "India Post Address Issue",
    icon: Package,
    type: "text",
    content: "India Post: Your package #IN98410294 could not be delivered on 20/11/2026 due to an incorrect house address number. Please update your address details and pay Rs. 15 re-dispatch charges here: http://ind-post-redelivery.cc/track"
  },
  {
    id: "cashback",
    label: "Fake UPI Cashback",
    icon: Gift,
    type: "text",
    content: "You have won a scratch card cashback of Rs. 2,999 on PhonePe! Click http://claim-phonepe-reward.top/upi to send this reward directly to your bank account. (Enter UPI PIN to verify transfer)."
  },
  {
    id: "safe",
    label: "Amazon Delivery (Safe)",
    icon: CheckCircle2,
    type: "text",
    content: "Your Amazon package with order #402-9182374-1029384 containing your electronics order is out for delivery today with delivery associate Ravi Kumar. Share delivery code 4829 with the associate upon receipt. Track at amazon.in/your-orders."
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"text" | "screenshot" | "url">("text");
  const [inputText, setInputText] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageBase64(null);
    setImagePreview(null);
  };

  const loadPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setActiveTab("text");
    setInputText(preset.content);
    setResult(null);
  };

  const handleAnalyze = async () => {
    let contentToAnalyze = "";
    if (activeTab === "text") contentToAnalyze = inputText.trim();
    else if (activeTab === "url") contentToAnalyze = urlInput.trim();
    else if (activeTab === "screenshot") contentToAnalyze = "Uploaded Screenshot for OCR and visual fraud detection";

    if (!contentToAnalyze && !imageBase64) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: contentToAnalyze,
          type: activeTab,
          imageBase64: imageBase64,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Error analyzing:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    const summaryText = `AURA ScamShield Report:\nThreat: ${result.threatLevel} (${result.riskScore}% Risk)\nType: ${result.scamType}\nSummary: ${result.summary}`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case "CRITICAL":
        return {
          bg: "bg-red-500/10",
          border: "border-red-500/40",
          text: "text-red-400",
          badge: "bg-red-500/20 text-red-300 border-red-500/30",
          bar: "bg-red-500",
        };
      case "SUSPICIOUS":
        return {
          bg: "bg-amber-500/10",
          border: "border-amber-500/40",
          text: "text-amber-400",
          badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
          bar: "bg-amber-500",
        };
      case "LOW":
        return {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/40",
          text: "text-yellow-400",
          badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
          bar: "bg-yellow-400",
        };
      default:
        return {
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/40",
          text: "text-emerald-400",
          badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
          bar: "bg-emerald-500",
        };
    }
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col justify-between">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                  AURA ScamShield
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-mono">
                  PS01
                </span>
              </div>
              <p className="text-[10px] text-slate-400">PromptWars x Code1 Innovators</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Dual-Core AI Engine Active
            </div>
            <a
              href="tel:1930"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/60 border border-red-800/50 text-red-300 text-xs font-semibold transition"
              title="National Cyber Crime Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Cyber Helpline: 1930</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Multimodal Fraud & Social Engineering Defense
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Analyze Suspicious Messages, Links & Payment Receipts
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Protecting citizens against UPI traps, fake electricity bills, bank KYC deactivation scams, 
            and malicious phishing URLs with deep psychological and technical pattern detection.
          </p>
        </div>

        {/* 1-Click Test Scenarios (Judges Presets) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Quick-Test Real World Scenarios (1-Click Demo)
            </span>
            <span className="text-[11px] text-slate-500">Click to instantly populate & test</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {DEMO_PRESETS.map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.id}
                  onClick={() => loadPreset(preset)}
                  className="flex items-center gap-2 p-2.5 rounded-xl glass-card hover:bg-slate-800/80 border border-slate-700/50 hover:border-cyan-500/50 transition-all text-left group"
                >
                  <div className="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-cyan-950 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" />
                  </div>
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white truncate">
                    {preset.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Workbench & Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Panel */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6">
            {/* Mode Tabs */}
            <div className="flex border-b border-slate-800 pb-4 mb-5 gap-2">
              <button
                onClick={() => setActiveTab("text")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  activeTab === "text"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <span>💬 Text Message / SMS</span>
              </button>
              <button
                onClick={() => setActiveTab("screenshot")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  activeTab === "screenshot"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <span>📸 Upload Screenshot</span>
              </button>
              <button
                onClick={() => setActiveTab("url")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                  activeTab === "url"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <span>🔗 Suspicious URL</span>
              </button>
            </div>

            {/* Tab 1: Text */}
            {activeTab === "text" && (
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    rows={7}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste the suspicious SMS, WhatsApp message, Telegram job invite, or email text here..."
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 resize-none"
                  />
                  {inputText && (
                    <button
                      onClick={() => setInputText("")}
                      className="absolute top-3 right-3 text-xs text-slate-500 hover:text-slate-300"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Characters: {inputText.length}</span>
                  <span>Supports English, Hindi, and Hinglish SMS</span>
                </div>
              </div>
            )}

            {/* Tab 2: Screenshot */}
            {activeTab === "screenshot" && (
              <div className="space-y-4">
                {!imagePreview ? (
                  <label className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-900/50 hover:bg-slate-900 transition">
                    <UploadCloud className="w-10 h-10 text-cyan-400 mb-3" />
                    <span className="text-sm font-medium text-slate-200 mb-1">
                      Upload Screenshot or Photo
                    </span>
                    <span className="text-xs text-slate-500 text-center">
                      WhatsApp chat screenshot, fake payment confirmation, or phishing SMS (PNG, JPG, WEBP)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
                    <img
                      src={imagePreview}
                      alt="Uploaded screenshot"
                      className="w-full h-56 object-contain bg-black/40"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-600 text-white p-1.5 rounded-lg text-xs"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <p className="text-xs text-slate-500">
                  Multimodal vision extracts text, inspects forged UI elements, and detects fake QR/payment seals.
                </p>
              </div>
            )}

            {/* Tab 3: URL */}
            {activeTab === "url" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">
                    Target URL or Domain
                  </label>
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://sbi-kyc-update-portal.xyz or bit.ly/claim-upi"
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
                  />
                </div>
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs text-slate-400 space-y-1">
                  <div className="flex items-center gap-2 text-cyan-400 font-medium">
                    <Globe className="w-3.5 h-3.5" />
                    Domain Threat Checks:
                  </div>
                  <p>• Typosquatting (e.g. `sb1`, `hfdc`, `in-post`)</p>
                  <p>• Dangerous Free/Abused TLDs (`.xyz`, `.cc`, `.top`, `.tk`)</p>
                  <p>• Masked URL redirect shorteners</p>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="mt-6">
              <button
                onClick={handleAnalyze}
                disabled={
                  isAnalyzing ||
                  (activeTab === "text" && !inputText.trim()) ||
                  (activeTab === "url" && !urlInput.trim()) ||
                  (activeTab === "screenshot" && !imageBase64)
                }
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Scanning Vectors & Psychological Triggers...</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    <span>Run Deep Security Inspection</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-6">
            {!result && !isAnalyzing && (
              <div className="glass-panel rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[460px] border-dashed">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4">
                  <ShieldCheck className="w-8 h-8 text-cyan-500/50" />
                </div>
                <h3 className="text-lg font-semibold text-slate-200 mb-2">
                  Ready to Inspect
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mb-6">
                  Select a test scenario above or paste any SMS/URL to generate an instant risk breakdown, psychological manipulation radar, and defensive action plan.
                </p>
                <div className="grid grid-cols-2 gap-3 w-full max-w-xs text-left">
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                    <span className="text-cyan-400 font-bold block mb-1">01. Multi-Vector</span>
                    <span className="text-slate-400 text-[11px]">Text, image OCR, URL patterns</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
                    <span className="text-cyan-400 font-bold block mb-1">02. Actionable</span>
                    <span className="text-slate-400 text-[11px]">Direct 1930 / portal protocol</span>
                  </div>
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="glass-panel rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[460px]">
                <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin mb-4"></div>
                <h3 className="text-lg font-semibold text-slate-200 mb-2 animate-pulse">
                  Deconstructing Message Patterns...
                </h3>
                <p className="text-xs text-slate-400">
                  Cross-referencing fraud signatures, psychological coercion vectors, and malicious endpoints.
                </p>
              </div>
            )}

            {result && !isAnalyzing && (
              <div className="glass-panel rounded-2xl p-6 space-y-6">
                {/* Threat Banner & Score */}
                {(() => {
                  const style = getThreatColor(result.threatLevel);
                  return (
                    <div className={`p-4 rounded-xl border ${style.bg} ${style.border}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {result.threatLevel === "CRITICAL" ? (
                            <ShieldAlert className="w-6 h-6 text-red-400 animate-pulse" />
                          ) : result.threatLevel === "SUSPICIOUS" ? (
                            <AlertTriangle className="w-6 h-6 text-amber-400" />
                          ) : (
                            <ShieldCheck className="w-6 h-6 text-emerald-400" />
                          )}
                          <div>
                            <span className={`text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full border ${style.badge}`}>
                              {result.threatLevel} THREAT
                            </span>
                            <h4 className="text-base font-bold text-white mt-1">
                              {result.scamType}
                            </h4>
                          </div>
                        </div>

                        {/* Circular/Gauge Risk Score */}
                        <div className="text-right">
                          <div className="text-3xl font-black tracking-tight text-white">
                            {result.riskScore}%
                          </div>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            Risk Level
                          </span>
                        </div>
                      </div>

                      {/* Score Bar */}
                      <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden mb-3">
                        <div
                          className={`h-full ${style.bar} transition-all duration-700`}
                          style={{ width: `${result.riskScore}%` }}
                        ></div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {result.summary}
                      </p>
                    </div>
                  );
                })()}

                {/* Psychological Manipulation Triggers */}
                <div>
                  <h5 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    Psychological Manipulation Radar
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {result.psychologicalTriggers.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-slate-300">{item.trigger}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded ${
                              item.level === "High"
                                ? "bg-red-950 text-red-400 border border-red-800/50"
                                : item.level === "Medium"
                                ? "bg-amber-950 text-amber-400 border border-amber-800/50"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {item.level}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Red Flags Detected */}
                {result.redFlags && result.redFlags.length > 0 && (
                  <div>
                    <h5 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      Key Evidence & Red Flags
                    </h5>
                    <ul className="space-y-1.5">
                      {result.redFlags.map((flag, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-300 bg-red-950/20 border border-red-900/30 p-2 rounded-lg"
                        >
                          <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Safe Indicators (if any) */}
                {result.safeIndicators && result.safeIndicators.length > 0 && (
                  <div>
                    <h5 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Legitimate Safe Indicators
                    </h5>
                    <ul className="space-y-1.5">
                      {result.safeIndicators.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-300 bg-emerald-950/20 border border-emerald-900/30 p-2 rounded-lg"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Defensive Action Protocol */}
                <div>
                  <h5 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    Recommended Defensive Protocol
                  </h5>
                  <div className="space-y-2">
                    {result.actionPlan.map((action) => (
                      <div
                        key={action.step}
                        className={`p-3 rounded-xl border text-xs flex items-start gap-3 ${
                          action.urgent
                            ? "bg-red-950/30 border-red-800/50 text-red-200"
                            : "bg-slate-900 border-slate-800 text-slate-300"
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 font-bold text-[11px] text-cyan-400">
                          {action.step}
                        </span>
                        <div>
                          <div className="font-semibold text-white flex items-center gap-2">
                            {action.title}
                            {action.urgent && (
                              <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-red-800/60 text-red-200">
                                Urgent
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 text-[11px] mt-0.5">
                            {action.instruction}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Official Indian Helplines */}
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                    Official Incident Reporting Channels:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {result.officialHelplines.map((line, idx) => (
                      <a
                        key={idx}
                        href={line.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-cyan-300 transition"
                      >
                        <span>{line.name}:</span>
                        <strong className="text-white">{line.contact}</strong>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Share / Copy Report */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 border border-slate-800 transition"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? "Copied Report!" : "Copy Incident Summary"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Scam Radar & Threat Intelligence Section */}
        <section className="mt-14 pt-10 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-cyan-400" />
                Active Cyber Threat Radar (India 2026)
              </h2>
              <p className="text-xs text-slate-400">
                Current top modus operandi tracked by national cybercrime advisories.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
              Updated Live
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/40">
                  CRITICAL SURGE
                </span>
                <span className="text-[11px] text-slate-500">MHA Advisory</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                "Digital Arrest" Extortion
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Scammers impersonate CBI/Customs officers on Skype/WhatsApp video calls, claiming your Aadhaar is linked to illegal narcotics, coercing panic bank transfers.
              </p>
              <div className="text-[11px] text-cyan-300 font-medium">
                Rule: Law enforcement NEVER conducts digital trials on video calls.
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                  HIGH VOLUME
                </span>
                <span className="text-[11px] text-slate-500">NPCI Warning</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                Reverse UPI Debit Trap
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Scammers send fake "Collect Request" or QR codes claiming to send you marketplace payments or refunds. Entering your UPI PIN debits your account.
              </p>
              <div className="text-[11px] text-cyan-300 font-medium">
                Rule: UPI PIN is ONLY needed to SEND money, never to receive.
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  AUTOMATED PHISHING
                </span>
                <span className="text-[11px] text-slate-500">DoT / Sanchar Saathi</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                India Post Parcel Failure SMS
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Mass SMS claiming your package cannot be delivered due to wrong address, providing `.cc` or `.top` clone portals asking for ₹10-₹20 fee to capture cards.
              </p>
              <div className="text-[11px] text-cyan-300 font-medium">
                Rule: India Post never sends SMS from personal 10-digit mobile numbers.
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">AURA ScamShield</span>
            <span>•</span>
            <span>Hack2Skill PromptWars x Code1 Innovators (PS01)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Vercel Edge Ready
            </span>
            <a
              href="https://github.com/yuht-lin/AURA_Hackathon"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              GitHub Repository
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
