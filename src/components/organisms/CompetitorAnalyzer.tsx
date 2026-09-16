"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  BarChart3,
  Users,
  Target,
  ArrowRight,
  Loader2,
  Plus,
  X,
  AlertCircle,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { analyzeCompetitorsAction } from "@/actions/ai";

interface AnalysisResult {
  targetUrl: string;
  targetScore: {
    clarity: number;
    ctaQuality: number;
    overallUX: number;
  };
  competitorScores: Array<{
    url: string;
    clarity: number;
    ctaQuality: number;
    overallUX: number;
  }>;
  analysis: {
    visualStyleComparison: string;
    ctaComparison: string;
    valuePropComparison: string;
  };
  recommendations: string[];
  upsellOpportunity: string;
}

export default function CompetitorAnalyzer() {
  const [targetUrl, setTargetUrl] = useState("");
  const [competitorUrls, setCompetitorUrls] = useState<string[]>(["", ""]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const addCompetitor = () => {
    if (competitorUrls.length < 3) {
      setCompetitorUrls([...competitorUrls, ""]);
    }
  };

  const removeCompetitor = (index: number) => {
    setCompetitorUrls(competitorUrls.filter((_, i) => i !== index));
  };

  const updateCompetitorUrl = (index: number, value: string) => {
    const newUrls = [...competitorUrls];
    newUrls[index] = value;
    setCompetitorUrls(newUrls);
  };

  const handleAnalysis = async () => {
    if (!targetUrl.trim()) {
      setError("Kérlek, adj meg egy érvényes céloldal URL-t!");
      return;
    }

    const validCompetitors = competitorUrls.filter((url) => url.trim());
    if (validCompetitors.length === 0) {
      setError("Kérlek, adj meg legalább egy versenytárs URL-t!");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      if (!auth) {
        setError("Firebase auth nem elérhető.");
        setLoading(false);
        return;
      }

      const user = auth!.currentUser;
      if (!user) {
        setError("Nincs bejelentkezve felhasználó.");
        setLoading(false);
        return;
      }

      const token = await user.getIdToken(true);
      const response = await analyzeCompetitorsAction(
        token,
        targetUrl,
        validCompetitors
      );

      if (response.success && response.analysisResult) {
        setResult(response.analysisResult);
      } else {
        setError(response.error || "Hiba történt az elemzés során.");
      }
    } catch {
      setError("Hiba történt az elemzés során.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-sky-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-500/10 border-emerald-500/20";
    if (score >= 60) return "bg-sky-500/10 border-sky-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  const maxCompetitorScore = result
    ? Math.max(...result.competitorScores.map((c) => c.overallUX))
    : 0;
  const shouldShowUpsell =
    result && result.targetScore.overallUX < maxCompetitorScore;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20"
        >
          <BarChart3 className="w-4 h-4 text-sky-500" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-500">
            AI Versenytárs-elemző
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          Konverziós Benchmarking
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-2xl mx-auto"
        >
          AI-alapú versenytárs-elemzés a Llama 3.3-70b modellel.
          Összehasonlítjuk a weboldalad konverziós elemeit a versenytársakéval,
          és konkrét fejlesztési javaslatokat adunk.
        </motion.p>
      </div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto"
      >
        <div className="glass-card p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Target className="w-4 h-4 text-sky-500" />
              Saját Weboldal URL
            </label>
            <input
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://pelda.hu"
              className="w-full px-4 py-3 bg-bg-surface border border-bg-elevated rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-500" />
                Versenytársak URL (max 3)
              </label>
              {competitorUrls.length < 3 && (
                <button
                  onClick={addCompetitor}
                  className="text-xs px-3 py-1 bg-sky-500/10 text-sky-500 rounded-full hover:bg-sky-500/20 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Hozzáadás
                </button>
              )}
            </div>
            {competitorUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => updateCompetitorUrl(index, e.target.value)}
                  placeholder={`Versenytárs ${index + 1}`}
                  className="flex-1 px-4 py-3 bg-bg-surface border border-bg-elevated rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
                {competitorUrls.length > 1 && (
                  <button
                    onClick={() => removeCompetitor(index)}
                    className="px-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            onClick={handleAnalysis}
            disabled={loading}
            className="w-full px-6 py-3 bg-sky-500 hover:bg-violet-700 text-bg-base font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Elemzés folyamatban...
              </>
            ) : (
              <>
                <BarChart3 className="w-4 h-4" />
                Versenytárs-elemzés Indítása
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Results Section - Bento Grid */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Target Score Card */}
          <div
            className={`glass-card p-8 border ${getScoreBg(result.targetScore.overallUX)}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                Saját Oldal Pontszám
              </h3>
              <div
                className={`text-5xl font-black ${getScoreColor(result.targetScore.overallUX)}`}
              >
                {result.targetScore.overallUX}/100
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-bg-elevated/50 p-4 rounded-xl">
                <div className="text-sm text-slate-400 mb-1">
                  Értékajánlat Tisztasága
                </div>
                <div
                  className={`text-2xl font-bold ${getScoreColor(result.targetScore.clarity)}`}
                >
                  {result.targetScore.clarity}
                </div>
              </div>
              <div className="bg-bg-elevated/50 p-4 rounded-xl">
                <div className="text-sm text-slate-400 mb-1">CTA Minőség</div>
                <div
                  className={`text-2xl font-bold ${getScoreColor(result.targetScore.ctaQuality)}`}
                >
                  {result.targetScore.ctaQuality}
                </div>
              </div>
              <div className="bg-bg-elevated/50 p-4 rounded-xl">
                <div className="text-sm text-slate-400 mb-1">
                  Összesített UX/CRO
                </div>
                <div
                  className={`text-2xl font-bold ${getScoreColor(result.targetScore.overallUX)}`}
                >
                  {result.targetScore.overallUX}
                </div>
              </div>
            </div>
          </div>

          {/* Competitor Scores - Bento Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {result.competitorScores.map((competitor, index) => (
              <div
                key={index}
                className={`glass-card p-6 border ${getScoreBg(competitor.overallUX)}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-white truncate">
                    Versenytárs {index + 1}
                  </h4>
                  <div
                    className={`text-3xl font-black ${getScoreColor(competitor.overallUX)}`}
                  >
                    {competitor.overallUX}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Értékajánlat</span>
                    <span className={getScoreColor(competitor.clarity)}>
                      {competitor.clarity}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">CTA Minőség</span>
                    <span className={getScoreColor(competitor.ctaQuality)}>
                      {competitor.ctaQuality}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Összesített</span>
                    <span className={getScoreColor(competitor.overallUX)}>
                      {competitor.overallUX}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Analysis Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass-card p-6">
              <h4 className="text-lg font-bold text-white mb-3">
                Vizuális Stílus
              </h4>
              <p className="text-slate-300 text-sm">
                {result.analysis.visualStyleComparison}
              </p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-lg font-bold text-white mb-3">
                CTA Összehasonlítás
              </h4>
              <p className="text-slate-300 text-sm">
                {result.analysis.ctaComparison}
              </p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-lg font-bold text-white mb-3">
                Értékajánlat
              </h4>
              <p className="text-slate-300 text-sm">
                {result.analysis.valuePropComparison}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-500" />
              Javaslatok
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* Upsell CTA */}
          {shouldShowUpsell && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 border border-sky-500/30 bg-gradient-to-br from-sky-500/5 to-transparent text-center"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  A versenytársaid jelenleg több ügyfelet konvertálnak.
                </h3>
                <p className="text-slate-300">{result.upsellOpportunity}</p>
                <button
                  onClick={() => (window.location.href = "/kapcsolat")}
                  className="px-8 py-4 bg-sky-500 hover:bg-violet-700 text-bg-base font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                >
                  Kérem a WebDude UX/UI Roast Auditot
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
