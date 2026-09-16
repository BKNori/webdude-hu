"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { performSEOAuditAction } from "@/actions/ai";
import { SEOAuditResult } from "@/lib/ai-tools";

export default function SEOAuditTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SEOAuditResult | null>(null);
  const [error, setError] = useState("");

  const handleAudit = async () => {
    if (!url.trim()) {
      setError("Kérlek, adj meg egy érvényes URL-t!");
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
      const response = await performSEOAuditAction(token, url);

      if (response.success && response.auditResult) {
        setResult(response.auditResult);
      } else {
        setError(response.error || "Hiba történt az audit során.");
      }
    } catch {
      setError("Hiba történt az audit során.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-500/10 border-emerald-500/20";
    if (score >= 60) return "bg-amber-500/10 border-amber-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20"
        >
          <Search className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
            AI SEO Audit
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          SEO Audit & Gap Analysis
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-2xl mx-auto"
        >
          AI-alapú SEO elemzés a Llama 3.3-70b modellel. Elemizzük a weboldalad
          strukturális adatait, és konkrét javaslatokat adunk a
          keresőoptimalizáláshoz.
        </motion.p>
      </div>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto"
      >
        <div className="glass-card p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300">
              Weboldal URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://pelda.hu"
              className="w-full px-4 py-3 bg-bg-surface border border-bg-elevated rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            onClick={handleAudit}
            disabled={loading}
            className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-bg-base font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Audit folyamatban...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                SEO Audit Indítása
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Results Section */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Score Card */}
          <div className={`glass-card p-8 border ${getScoreBg(result.score)}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">SEO Pontszám</h3>
              <div
                className={`text-5xl font-black ${getScoreColor(result.score)}`}
              >
                {result.score}/100
              </div>
            </div>

            <div className="w-full h-2 bg-bg-elevated rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.score}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full ${result.score >= 80 ? "bg-emerald-500" : result.score >= 60 ? "bg-amber-500" : "bg-red-500"}`}
              />
            </div>
          </div>

          {/* JSON-LD Schema Analysis */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              JSON-LD Schema (AEO)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-bg-elevated/50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-amber-500">
                  {result.jsonLdSchema.schemaCount}
                </div>
                <div className="text-xs text-slate-400 uppercase">
                  Schema Count
                </div>
              </div>
              <div className="bg-bg-elevated/50 p-4 rounded-xl">
                <div
                  className={`text-2xl font-bold ${result.jsonLdSchema.hasSchema ? "text-emerald-500" : "text-red-500"}`}
                >
                  {result.jsonLdSchema.hasSchema ? "Igen" : "Nem"}
                </div>
                <div className="text-xs text-slate-400 uppercase">
                  Van Schema
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase mb-3">
                Schema Típusok
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.jsonLdSchema.schemaTypes.length > 0 ? (
                  result.jsonLdSchema.schemaTypes.map((type, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400"
                    >
                      {type}
                    </span>
                  ))
                ) : (
                  <span className="text-red-500 text-sm">
                    Nincsenek schema típusok
                  </span>
                )}
              </div>
            </div>
            {result.jsonLdSchema.missingTypes.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase mb-3">
                  Hiányzó Ajánlott Típusok
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.jsonLdSchema.missingTypes.map((type, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-400"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Meta Tags */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              Meta Tagok
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase">
                  Title
                </label>
                <p className="text-white">
                  {result.metaTags.title || "Nincs megadva"}
                </p>
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase">
                  Description
                </label>
                <p className="text-slate-300">
                  {result.metaTags.description || "Nincs megadva"}
                </p>
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400 uppercase">
                  Keywords
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {result.metaTags.keywords.length > 0 ? (
                    result.metaTags.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-bg-elevated rounded-full text-xs text-slate-300"
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 text-sm">
                      Nincsenek kulcsszavak
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Heading Structure */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              Fejlec Struktúra
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-bg-elevated/50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-amber-500">
                  {result.headingStructure.h1.length}
                </div>
                <div className="text-xs text-slate-400 uppercase">H1</div>
              </div>
              <div className="bg-bg-elevated/50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-amber-500">
                  {result.headingStructure.h2.length}
                </div>
                <div className="text-xs text-slate-400 uppercase">H2</div>
              </div>
              <div className="bg-bg-elevated/50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-amber-500">
                  {result.headingStructure.h3.length}
                </div>
                <div className="text-xs text-slate-400 uppercase">H3</div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
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

          {/* Gap Analysis */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Gap Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase mb-3">
                  Hiányzó Kulcsszavak
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.gapAnalysis.missingKeywords.length > 0 ? (
                    result.gapAnalysis.missingKeywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-400"
                      >
                        {keyword}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 text-sm">
                      Nincsenek hiányzó kulcsszavak
                    </span>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase mb-3">
                  Versenytárs Előnyök
                </h4>
                <ul className="space-y-2">
                  {result.gapAnalysis.competitorAdvantage.length > 0 ? (
                    result.gapAnalysis.competitorAdvantage.map((adv, i) => (
                      <li
                        key={i}
                        className="text-slate-300 text-sm flex items-start gap-2"
                      >
                        <span className="text-amber-500">→</span>
                        {adv}
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-500 text-sm">
                      Nincsenek versenytárs előnyök
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Dynamic Upsell CTA based on audit results */}
          {(result.score < 70 ||
            result.jsonLdSchema.missingTypes.length > 3) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 border border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent text-center"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  {result.jsonLdSchema.missingTypes.length > 3
                    ? "AEO hiányosságok? Segítünk javítani!"
                    : "Pontszárod alacsony? Segítünk javítani!"}
                </h3>
                <p className="text-slate-300">
                  {result.jsonLdSchema.missingTypes.length > 3
                    ? `A WebDude "AEO Audit" szolgáltatásával ${result.jsonLdSchema.missingTypes.length} hiányzó JSON-LD schema implementálását vállaljuk, ami az AI keresőkben (ChatGPT, Perplexity) jobb helyezést eredményez.`
                    : 'A WebDude "UX Roast" audit szolgáltatásával részletes elemzést és konkrét fejlesztési tervet kapsz a SEO és UX optimalizáláshoz.'}
                </p>
                <button
                  onClick={() => (window.location.href = "/kapcsolat")}
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-bg-base font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                >
                  {result.jsonLdSchema.missingTypes.length > 3
                    ? "Kérd a WebDude AEO Auditot"
                    : "Kérd a WebDude UX Roast Auditot"}
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
