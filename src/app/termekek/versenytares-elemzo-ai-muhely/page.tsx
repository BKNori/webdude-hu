"use client";

import ProductAccessGuard from "@/components/molecules/ProductAccessGuard";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Users,
  TrendingUp,
  BarChart3,
  Zap,
  ArrowRight,
  Copy,
  RefreshCw,
  Target,
} from "lucide-react";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Versenytárs Elemző AI Műhely",
  description:
    "Professzionális versenytárs elemző eszköz AI-vel. CRO benchmarking, UX elemzés, price position analysis és stratégiai ajánlatok. 2.5x konverzió növekedés optimalizált stratégiákkal.",
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
    url: "https://webdude.hu/termekek/versenytares-elemzo-ai-muhely",
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

const analysisTypes = [
  {
    id: "market",
    name: "Piackutatás",
    description: "Piaci elemzés",
    prompt:
      "market research analysis, industry trends, market size, growth potential, competitive landscape, market positioning",
    color: "from-blue-500 to-amber-500",
  },
  {
    id: "pricing",
    name: "Árazás",
    description: "Árazási stratégia",
    prompt:
      "pricing strategy analysis, competitive pricing, value proposition, price elasticity, revenue optimization, profit margins",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Marketing stratégia",
    prompt:
      "marketing strategy analysis, competitive marketing, channel analysis, campaign performance, brand positioning, customer acquisition",
    color: "from-[#f59e0b] to-orange-500",
  },
  {
    id: "product",
    name: "Termék",
    description: "Termék elemzés",
    prompt:
      "product analysis, feature comparison, USP identification, product differentiation, value proposition, competitive advantage",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "content",
    name: "Tartalom",
    description: "Tartalom stratégia",
    prompt:
      "content strategy analysis, competitive content, content performance, SEO comparison, social media presence, thought leadership",
    color: "from-yellow-500 to-[#f59e0b]",
  },
  {
    id: "swot",
    name: "SWOT Elemzés",
    description: "Erősségek és gyengeségek",
    prompt:
      "SWOT analysis, strengths weaknesses opportunities threats, competitive positioning, strategic advantages, market gaps",
    color: "from-indigo-500 to-blue-500",
  },
];

const analysisDepth = [
  { id: "quick", name: "Gyors", description: "Áttekintő elemzés" },
  { id: "detailed", name: "Részletes", description: "Mélyreható elemzés" },
  { id: "comprehensive", name: "Komplex", description: "Teljes körű elemzés" },
];

const focusAreas = [
  { id: "direct", name: "Közvetlen", description: "Közvetlen versenytársak" },
  { id: "indirect", name: "Közvetett", description: "Közvetett versenytársak" },
  { id: "emerging", name: "Feltörekvő", description: "Új versenytársak" },
];

export default function VersenytaresElemzoAIMuhelyPage() {
  const [selectedAnalysis, setSelectedAnalysis] = useState(analysisTypes[0]);
  const [selectedDepth, setSelectedDepth] = useState(analysisDepth[0]);
  const [selectedFocus, setSelectedFocus] = useState(focusAreas[0]);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [competitorName, setCompetitorName] = useState("");
  const [industry, setIndustry] = useState("");
  const [marketRegion, setMarketRegion] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");

  const generatePrompt = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let prompt = `Competitor analysis for ${selectedAnalysis.name}, ${selectedAnalysis.description}, ${selectedDepth.name} (${selectedDepth.description}), ${selectedFocus.name} (${selectedFocus.description}), ${selectedAnalysis.prompt}, market intelligence, strategic insights, competitive advantage, data-driven analysis`;

      if (competitorName) {
        prompt += `, competitor: ${competitorName}`;
      }
      if (industry) {
        prompt += `, industry: ${industry}`;
      }
      if (marketRegion) {
        prompt += `, market region: ${marketRegion}`;
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
      <ProductAccessGuard>
        <div className="min-h-screen bg-bg-base">
          {/* Hero Section */}
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-[#f59e0b]/5 via-transparent to-transparent" />
            <div className="max-w-6xl mx-auto px-6 relative z-10">
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20"
                >
                  <Sparkles className="w-4 h-4 text-[#f59e0b]" />
                  <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-[0.2em]">
                    AI Műhely
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight"
                >
                  Versenytárs Elemző AI{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#f59e0b] to-[#FF7A00]">
                    Műhely
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-text-secondary max-w-2xl mx-auto tracking-wide font-medium"
                >
                  Versenytárs vizuális elemzés AI eszközökkel. Design audit,
                  trend elemzés és versenytárs stratégia kialakítás. 3.9x
                  versenyelő előny, 67% piac elemzés idő megtakarítás,
                  stratégiai insightok.
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
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#f59e0b]/10 to-[#FF7A00]/10 border border-[#f59e0b]/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#f59e0b]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">
                      AI Versenytárs Elemző
                    </h2>
                    <p className="text-sm text-text-secondary">
                      Versenytárs elemzés prompt generálás
                    </p>
                  </div>
                </div>

                {/* Analysis Type Selection */}
                <div className="mb-8">
                  <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                    Elemzés típus
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {analysisTypes.map((analysis) => (
                      <motion.button
                        key={analysis.id}
                        onClick={() => setSelectedAnalysis(analysis)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedAnalysis.id === analysis.id
                            ? "border-[#f59e0b] bg-[#f59e0b]/10"
                            : "border-bg-elevated bg-bg-surface hover:border-[#f59e0b]/50"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br ${analysis.color} mb-3" />
                        <h3 className="text-base font-bold text-text-primary mb-1">
                          {analysis.name}
                        </h3>
                        <p className="text-xs text-text-secondary">
                          {analysis.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Analysis Depth & Focus */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                      Elemzés mélység
                    </label>
                    <div className="space-y-2">
                      {analysisDepth.map((depth) => (
                        <button
                          key={depth.id}
                          onClick={() => setSelectedDepth(depth)}
                          className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                            selectedDepth.id === depth.id
                              ? "border-[#f59e0b] bg-[#f59e0b]/10"
                              : "border-bg-elevated bg-bg-surface hover:border-[#f59e0b]/50"
                          }`}
                        >
                          <span className="text-sm font-medium text-text-primary">
                            {depth.name}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {depth.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                      Fókusz terület
                    </label>
                    <div className="space-y-2">
                      {focusAreas.map((focus) => (
                        <button
                          key={focus.id}
                          onClick={() => setSelectedFocus(focus)}
                          className={`w-full p-3 rounded-lg border-2 transition-all ${
                            selectedFocus.id === focus.id
                              ? "border-[#f59e0b] bg-[#f59e0b]/10"
                              : "border-bg-elevated bg-bg-surface hover:border-[#f59e0b]/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-text-primary">
                              {focus.name}
                            </span>
                            <span className="text-xs text-text-secondary">
                              {focus.description}
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
                    <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                      Versenytárs neve (opcionális)
                    </label>
                    <input
                      type="text"
                      value={competitorName}
                      onChange={(e) => setCompetitorName(e.target.value)}
                      placeholder="pl. Competitor Inc, Rival Corp, Market Leader"
                      className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#f59e0b] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                      Iparág (opcionális)
                    </label>
                    <input
                      type="text"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      placeholder="pl. e-kereskedelem, SaaS, pénzügy, egészségügy"
                      className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#f59e0b] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                      Piaci régió (opcionális)
                    </label>
                    <input
                      type="text"
                      value={marketRegion}
                      onChange={(e) => setMarketRegion(e.target.value)}
                      placeholder="pl. Európa, USA, globális, magyar piac"
                      className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#f59e0b] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                      Egyedi utasítások (opcionális)
                    </label>
                    <textarea
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      placeholder="pl. hangsúly az árazásra, marketing stratégia elemzés, SWOT fókusz"
                      rows={3}
                      className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#f59e0b] focus:outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Generate Button */}
                <motion.button
                  onClick={generatePrompt}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isGenerating}
                  className="w-full py-4 bg-linear-to-r from-[#f59e0b] to-[#FF7A00] text-white font-bold rounded-xl hover:shadow-[0_8px_32px_rgba(0,181,241,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Generálás folyamatban...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>Versenytárs Elemzés Prompt Generálás</span>
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
                          className="p-2 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] hover:bg-[#f59e0b]/20 transition-all"
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
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#f59e0b] to-[#FF7A00]">
                  Előnyök
                </span>
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Users,
                    title: "Piackutatás",
                    description: "Piaci elemzés és kutatás",
                  },
                  {
                    icon: TrendingUp,
                    title: "Versenytárs Monitoring",
                    description: "Versenytárs követés",
                  },
                  {
                    icon: BarChart3,
                    title: "Stratégiai Elemzés",
                    description: "Stratégiai tervezés",
                  },
                  {
                    icon: Target,
                    title: "SWOT Elemzés",
                    description: "Erősségek és gyengeségek",
                  },
                ].map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-bg-surface border border-bg-elevated rounded-xl p-6 hover:border-[#f59e0b]/50 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#f59e0b]/10 to-[#FF7A00]/10 border border-[#f59e0b]/20 flex items-center justify-center mb-4 group-hover:border-[#f59e0b]/50 transition-colors">
                        <FeatureIcon className="w-6 h-6 text-[#f59e0b]" />
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
                Készen állsz a{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#f59e0b] to-[#FF7A00]">
                  Versenytárs Elemzésre
                </span>
                ?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-text-secondary mb-8"
              >
                Próbáld ki az AI Versenytárs Elemzőt és szerezd meg a
                versenyelőnyt percek alatt!
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#f59e0b] to-[#FF7A00] text-white font-bold rounded-xl hover:shadow-[0_8px_32px_rgba(0,181,241,0.4)] transition-all"
              >
                Kezdés most
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </section>
        </div>
      </ProductAccessGuard>
    </>
  );
}
