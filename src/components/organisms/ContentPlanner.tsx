"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  FileText,
  Link,
  Mail,
  Hash,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { generateContentPlanAction } from "@/actions/ai";

interface ContentPlannerProps {
  allowedTools: string[];
  isAdmin: boolean;
}

interface ContentPlan {
  industry: string;
  targetAudience: string;
  mainProduct: string;
  blogTopics: string[];
  linkedinPosts: string[];
  newsletterTopics: string[];
  suggestedKeywords: string[];
}

export default function ContentPlanner({
  allowedTools,
  isAdmin,
}: ContentPlannerProps) {
  const [industry, setIndustry] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [mainProduct, setMainProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ContentPlan | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!industry.trim() || !targetAudience.trim() || !mainProduct.trim()) {
      setError("Kérlek, tölts ki minden mezőt!");
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
      const response = await generateContentPlanAction(
        token,
        industry,
        targetAudience,
        mainProduct
      );

      if (response.success && response.contentPlan) {
        setResult(response.contentPlan);
      } else {
        setError(response.error || "Hiba történt a tartalomtervezés során.");
      }
    } catch (err) {
      setError("Hiba történt a tartalomtervezés során.");
    } finally {
      setLoading(false);
    }
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
          <Calendar className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500">
            AI Tartalomtervező
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          3 Hónapos Tartalomnaptár
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 max-w-2xl mx-auto"
        >
          AI-alapú tartalomtervezés a Llama 3.3-70b modellel. Generáljunk blog
          témákat, LinkedIn posztokat és hírlevél témákat a célcsoportodra
          szabva.
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
            <label className="text-sm font-bold text-slate-300">Iparág</label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="pl. E-kereskedelem, SaaS, Szolgáltatás"
              className="w-full px-4 py-3 bg-bg-surface border border-bg-elevated rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300">
              Célcsoport
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="pl. 25-45 éves vállalkozók, IT döntéshozók"
              className="w-full px-4 py-3 bg-bg-surface border border-bg-elevated rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300">
              Fő Termék/Szolgáltatás
            </label>
            <input
              type="text"
              value={mainProduct}
              onChange={(e) => setMainProduct(e.target.value)}
              placeholder="pl. Webfejlesztés, CRM szoftver, Online tanácsadás"
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
            onClick={handleGenerate}
            disabled={loading}
            className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-bg-base font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Tartalomtervezés folyamatban...
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                Tartalomnaptár Generálása
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
          {/* Blog Topics */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              Blog Témák (10 db)
            </h3>
            <ul className="space-y-3">
              {result.blogTopics.map((topic, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* LinkedIn Posts */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Link className="w-5 h-5 text-blue-500" />
              LinkedIn Posztok (8 db)
            </h3>
            <ul className="space-y-3">
              {result.linkedinPosts.map((post, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {post}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Topics */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-500" />
              Hírlevél Témák (5 db)
            </h3>
            <ul className="space-y-3">
              {result.newsletterTopics.map((topic, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Keywords */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Hash className="w-5 h-5 text-purple-500" />
              Javasolt Kulcsszavak (10 db)
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.suggestedKeywords.map((keyword, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-bg-elevated rounded-full text-sm text-slate-300 border border-amber-500/20"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Upsell CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 border border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-transparent text-center"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">
                Nincs időd megírni a tartalmakat?
              </h3>
              <p className="text-slate-300">
                Hagyd a tartalomgyártást a WebDude-ra! AI+Emberi Blogcikk
                csomagunkkal professzionális, SEO-optimalizált tartalmakat
                kapsz, amik azonnal konvertálnak.
              </p>
              <button
                onClick={() => (window.location.href = "/kapcsolat")}
                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-bg-base font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                Rendeld meg a WebDude AI+Emberi Blogcikk Csomagot
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
