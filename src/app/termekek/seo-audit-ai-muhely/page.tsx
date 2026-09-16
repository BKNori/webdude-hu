"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Search,
  TrendingUp,
  BarChart3,
  Zap,
  ArrowRight,
  Copy,
  RefreshCw,
  Target,
} from "lucide-react";

const auditTypes = [
  {
    id: "technical",
    name: "Technikai SEO",
    description: "Technikai elemzés",
    prompt:
      "technical SEO audit, site speed analysis, mobile optimization, crawlability, indexability, technical performance review",
    color: "from-blue-500 to-sky-500",
  },
  {
    id: "content",
    name: "Tartalom SEO",
    description: "Tartalom elemzés",
    prompt:
      "content SEO audit, keyword analysis, content quality, duplicate content, content structure optimization",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "aeo",
    name: "AEO Optimalizáció",
    description: "AI válasz motor",
    prompt:
      "AEO optimization, AI answer engine optimization, schema.org implementation, structured data, featured snippets",
    color: "from-[#00B5F1] to-orange-500",
  },
  {
    id: "local",
    name: "Local SEO",
    description: "Helyi keresés",
    prompt:
      "local SEO audit, Google Business Profile optimization, local citations, NAP consistency, local search ranking",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "performance",
    name: "Teljesítmény",
    description: "Lighthouse score",
    prompt:
      "performance SEO audit, Lighthouse score optimization, Core Web Vitals, page speed, loading time analysis",
    color: "from-yellow-500 to-[#00B5F1]",
  },
  {
    id: "backlink",
    name: "Backlink Profil",
    description: "Link profil elemzés",
    prompt:
      "backlink profile audit, link quality analysis, toxic links, domain authority, link building strategy",
    color: "from-indigo-500 to-blue-500",
  },
];

const focusAreas = [
  { id: "keywords", name: "Kulcsszók", description: "Kulcsszó stratégia" },
  {
    id: "competitors",
    name: "Versenytársak",
    description: "Versenytárs elemzés",
  },
  { id: "technical", name: "Technikai", description: "Technikai SEO" },
  { id: "content", name: "Tartalom", description: "Tartalom optimalizáció" },
];

const depthLevels = [
  { id: "basic", name: "Alap", description: "Gyors áttekintés" },
  { id: "detailed", name: "Részletes", description: "Mélyreható elemzés" },
  { id: "comprehensive", name: "Komplex", description: "Teljes körű audit" },
];

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "SEO Audit AI Műhely",
  description:
    "SEO és AEO audit vizualizáció AI eszközökkel. Lighthouse score tracking, kulcsszó stratégia és AI válasz motor optimalizáció. Technikai SEO, tartalom SEO, AEO optimalizáció.",
  image: "https://webdude.hu/og/webdude-og.jpg",
  brand: {
    "@type": "Brand",
    name: "WebDude",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "HUF",
    availability: "https://schema.org/InStock",
    url: "https://webdude.hu/termekek/seo-audit-ai-muhely",
    priceValidUntil: "2027-12-31",
    seller: {
      "@type": "Organization",
      name: "WebDude.hu",
    },
    description: "Egyedi árajánlat kérése",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "31",
  },
};

export default function SEOAuditAIMuhelyPage() {
  const [selectedAudit, setSelectedAudit] = useState(auditTypes[0]);
  const [selectedFocus, setSelectedFocus] = useState(focusAreas[0]);
  const [selectedDepth, setSelectedDepth] = useState(depthLevels[0]);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [targetKeywords, setTargetKeywords] = useState("");
  const [businessGoals, setBusinessGoals] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");

  const generatePrompt = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let prompt = `SEO audit for ${selectedAudit.name}, ${selectedAudit.description}, ${selectedFocus.name} (${selectedFocus.description}), ${selectedDepth.name} (${selectedDepth.description}), ${selectedAudit.prompt}, Lighthouse score tracking, keyword strategy, AI answer engine optimization, comprehensive analysis`;

      if (websiteUrl) {
        prompt += `, website: ${websiteUrl}`;
      }
      if (targetKeywords) {
        prompt += `, target keywords: ${targetKeywords}`;
      }
      if (businessGoals) {
        prompt += `, business goals: ${businessGoals}`;
      }
      if (customInstructions) {
        prompt += `, custom requirements: ${customInstructions}`;
      }

      setGeneratedPrompt(prompt);
      setIsGenerating(false);
    }, 1500);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="min-h-screen bg-bg-base">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-[#00B5F1]/5 via-transparent to-transparent" />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="text-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B5F1]/10 border border-[#00B5F1]/20"
              >
                <Sparkles className="w-4 h-4 text-[#00B5F1]" />
                <span className="text-xs font-bold text-[#00B5F1] uppercase tracking-[0.2em]">
                  AI Műhely
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight"
              >
                SEO Audit AI{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
                  Műhely
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-text-secondary max-w-2xl mx-auto tracking-wide font-medium"
              >
                SEO és AEO audit vizualizáció AI eszközökkel. Lighthouse score
                tracking, kulcsszó stratégia és AI válasz motor optimalizáció.
              </motion.p>
            </div>
          </div>
        </section>

        {/* AI Generator Section */}
        <section className="py-16 border-t border-bg-elevated">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-bg-surface border border-bg-elevated rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#00B5F1]/10 to-[#5B21B6]/10 border border-[#00B5F1]/20 flex items-center justify-center">
                  <Search className="w-6 h-6 text-[#00B5F1]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">
                    AI SEO Audit Generator
                  </h2>
                  <p className="text-sm text-text-secondary">
                    SEO/AEO audit prompt generálás
                  </p>
                </div>
              </div>

              {/* Audit Type Selection */}
              <div className="mb-8">
                <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                  Audit típus
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {auditTypes.map((audit) => (
                    <motion.button
                      key={audit.id}
                      onClick={() => setSelectedAudit(audit)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedAudit.id === audit.id
                          ? "border-[#00B5F1] bg-[#00B5F1]/10"
                          : "border-bg-elevated bg-bg-surface hover:border-[#00B5F1]/50"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-linear-to-br ${audit.color} mb-3" />
                      <h3 className="text-base font-bold text-text-primary mb-1">
                        {audit.name}
                      </h3>
                      <p className="text-xs text-text-secondary">
                        {audit.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Focus Area & Depth */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Fókusz terület
                  </label>
                  <div className="space-y-2">
                    {focusAreas.map((focus) => (
                      <button
                        key={focus.id}
                        onClick={() => setSelectedFocus(focus)}
                        className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                          selectedFocus.id === focus.id
                            ? "border-[#00B5F1] bg-[#00B5F1]/10"
                            : "border-bg-elevated bg-bg-surface hover:border-[#00B5F1]/50"
                        }`}
                      >
                        <span className="text-sm font-medium text-text-primary">
                          {focus.name}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {focus.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Audit mélység
                  </label>
                  <div className="space-y-2">
                    {depthLevels.map((depth) => (
                      <button
                        key={depth.id}
                        onClick={() => setSelectedDepth(depth)}
                        className={`w-full p-3 rounded-lg border-2 transition-all ${
                          selectedDepth.id === depth.id
                            ? "border-[#00B5F1] bg-[#00B5F1]/10"
                            : "border-bg-elevated bg-bg-surface hover:border-[#00B5F1]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-text-primary">
                            {depth.name}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {depth.description}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text Input Fields */}
              <div className="space-y-6 mb-8">
                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Weboldal URL (opcionális)
                  </label>
                  <input
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="pl. https://example.com"
                    className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#00B5F1] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Cél kulcsszavak (opcionális)
                  </label>
                  <input
                    type="text"
                    value={targetKeywords}
                    onChange={(e) => setTargetKeywords(e.target.value)}
                    placeholder="pl. webfejlesztés, SEO, marketing"
                    className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#00B5F1] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Üzleti célok (opcionális)
                  </label>
                  <input
                    type="text"
                    value={businessGoals}
                    onChange={(e) => setBusinessGoals(e.target.value)}
                    placeholder="pl. organikus forgalom növelése, konverzió optimalizálás"
                    className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#00B5F1] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Egyedi utasítások (opcionális)
                  </label>
                  <textarea
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    placeholder="pl. hangsúly a technikai SEO-ra, helyi keresés optimalizálás, AEO fókusz"
                    rows={3}
                    className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#00B5F1] focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                onClick={generatePrompt}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isGenerating}
                className="w-full py-4 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] text-slate-950 font-bold rounded-xl hover:shadow-[0_8px_32px_rgba(0, 181, 241,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Generálás folyamatban...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>SEO Audit Prompt Generálás</span>
                  </>
                )}
              </motion.button>

              {/* Generated Prompt */}
              {generatedPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 p-6 bg-bg-base border border-bg-elevated rounded-xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-text-primary">
                      Generált Prompt
                    </h3>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={copyPrompt}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-lg bg-[#00B5F1]/10 border border-[#00B5F1]/20 text-[#00B5F1] hover:bg-[#00B5F1]/20 transition-all"
                      >
                        <Copy className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {generatedPrompt}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 border-t border-bg-elevated">
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-text-primary mb-8 text-center tracking-tight"
            >
              Funkciók és{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
                Előnyök
              </span>
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Search,
                  title: "SEO Audit Vizualizáció",
                  description: "Automatikus audit elemzés",
                },
                {
                  icon: TrendingUp,
                  title: "Lighthouse Score Tracking",
                  description: "Teljesítmény követés",
                },
                {
                  icon: BarChart3,
                  title: "Kulcsszó Stratégia",
                  description: "AI kulcsszó elemzés",
                },
                {
                  icon: Target,
                  title: "AI Válasz Motor Optimalizáció",
                  description: "AEO optimalizáció",
                },
              ].map((feature, index) => {
                const FeatureIcon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-bg-surface border border-bg-elevated rounded-xl p-6 hover:border-[#00B5F1]/50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#00B5F1]/10 to-[#5B21B6]/10 border border-[#00B5F1]/20 flex items-center justify-center mb-4 group-hover:border-[#00B5F1]/50 transition-colors">
                      <FeatureIcon className="w-6 h-6 text-[#00B5F1]" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 border-t border-bg-elevated">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-text-primary mb-4 tracking-tight"
            >
              Készen állsz az{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
                SEO Auditra
              </span>
              ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-text-secondary mb-8"
            >
              Próbáld ki az AI SEO Audit Generátort és optimalizáld weboldalad
              percek alatt!
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] text-slate-950 font-bold rounded-xl hover:shadow-[0_8px_32px_rgba(0, 181, 241,0.4)] transition-all"
            >
              Kezdés most
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </section>
      </div>
    </>
  );
}
