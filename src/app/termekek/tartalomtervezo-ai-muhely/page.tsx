"use client";

import ProductAccessGuard from "@/components/molecules/ProductAccessGuard";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  FileText,
  Image as ImageIcon,
  Share2,
  Zap,
  ArrowRight,
  Copy,
  RefreshCw,
  PenTool,
} from "lucide-react";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Tartalomtervező AI Műhely",
  description:
    "Professzionális tartalomtervező eszköz AI-vel. Blog bejegyzések, social media tartalom, landing page szövegek és teljes tartalom kalendár generálása. SEO-optimalizált, konverzióra fókuszált.",
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
    url: "https://webdude.hu/termekek/tartalomtervezo-ai-muhely",
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

const contentTypes = [
  {
    id: "blog",
    name: "Blog Poszt",
    description: "Blog tartalom generálás",
    prompt:
      "blog post content, engaging article structure, SEO optimized, compelling headline, informative body, professional writing style",
    color: "from-blue-500 to-sky-500",
  },
  {
    id: "social",
    name: "Social Media",
    description: "Social media tartalom",
    prompt:
      "social media content, engaging captions, hashtag strategy, platform-specific format, viral potential, interactive elements",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "email",
    name: "Email Marketing",
    description: "Email kampány tartalom",
    prompt:
      "email marketing content, compelling subject line, persuasive copy, call-to-action optimization, conversion-focused",
    color: "from-[#00B5F1] to-orange-500",
  },
  {
    id: "landing",
    name: "Landing Page",
    description: "Landing page szöveg",
    prompt:
      "landing page copy, conversion-focused headlines, benefit-driven content, persuasive CTAs, sales funnel optimization",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "product",
    name: "Product Description",
    description: "Termék leírás",
    prompt:
      "product description, benefit-focused copy, feature highlights, persuasive selling points, customer-centric language",
    color: "from-yellow-500 to-[#00B5F1]",
  },
  {
    id: "ad",
    name: "Hirdetés Szöveg",
    description: "PPC hirdetés szöveg",
    prompt:
      "ad copy, compelling headlines, persuasive body text, conversion-optimized, A/B testing ready",
    color: "from-indigo-500 to-blue-500",
  },
];

const contentTones = [
  {
    id: "professional",
    name: "Professzionális",
    description: "Hivatalos, szakmai",
  },
  { id: "casual", name: "Lazán", description: "Barátságos, közvetlen" },
  { id: "humorous", name: "Humoros", description: "Vicces, szórakoztató" },
  { id: "urgent", name: "Sürgős", description: "Akciós, sürgető" },
];

const contentLengths = [
  { id: "short", name: "Rövid", description: "150-300 szó" },
  { id: "medium", name: "Közepes", description: "300-600 szó" },
  { id: "long", name: "Hosszú", description: "600-1200 szó" },
];

export default function TartalomtervezoAIMuhelyPage() {
  const [selectedContent, setSelectedContent] = useState(contentTypes[0]);
  const [selectedTone, setSelectedTone] = useState(contentTones[0]);
  const [selectedLength, setSelectedLength] = useState(contentLengths[0]);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [keywords, setKeywords] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");

  const generatePrompt = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let prompt = `Content generation for ${selectedContent.name}, ${selectedContent.description}, ${selectedTone.name} (${selectedTone.description}), ${selectedLength.name} (${selectedLength.description}), ${selectedContent.prompt}, AI-powered content creation, professional writing, SEO optimized, engaging copy`;

      if (topic) {
        prompt += `, topic: ${topic}`;
      }
      if (targetAudience) {
        prompt += `, target audience: ${targetAudience}`;
      }
      if (keywords) {
        prompt += `, keywords: ${keywords}`;
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
                  Tartalomtervező AI{" "}
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
                  Tartalom és vizuális tervezés AI eszközökkel. Blog posztok,
                  social media tartalmak és vizuálok generálása. 3.6x tartalom
                  hatékonyság, 82% írási idő megtakarítás, SEO-optimalizált
                  outputok.
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
                    <FileText className="w-6 h-6 text-[#00B5F1]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">
                      AI Tartalom Generator
                    </h2>
                    <p className="text-sm text-text-secondary">
                      AI tartalom generálás
                    </p>
                  </div>
                </div>

                {/* Content Type Selection */}
                <div className="mb-8">
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Tartalom típus
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {contentTypes.map((content) => (
                      <motion.button
                        key={content.id}
                        onClick={() => setSelectedContent(content)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedContent.id === content.id
                            ? "border-[#00B5F1] bg-[#00B5F1]/10"
                            : "border-bg-elevated bg-bg-surface hover:border-[#00B5F1]/50"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br ${content.color} mb-3" />
                        <h3 className="text-base font-bold text-text-primary mb-1">
                          {content.name}
                        </h3>
                        <p className="text-xs text-text-secondary">
                          {content.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Content Tone & Length */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                      Tartalom hangnem
                    </label>
                    <div className="space-y-2">
                      {contentTones.map((tone) => (
                        <button
                          key={tone.id}
                          onClick={() => setSelectedTone(tone)}
                          className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                            selectedTone.id === tone.id
                              ? "border-[#00B5F1] bg-[#00B5F1]/10"
                              : "border-bg-elevated bg-bg-surface hover:border-[#00B5F1]/50"
                          }`}
                        >
                          <span className="text-sm font-medium text-text-primary">
                            {tone.name}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {tone.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                      Tartalom hossz
                    </label>
                    <div className="space-y-2">
                      {contentLengths.map((length) => (
                        <button
                          key={length.id}
                          onClick={() => setSelectedLength(length)}
                          className={`w-full p-3 rounded-lg border-2 transition-all ${
                            selectedLength.id === length.id
                              ? "border-[#00B5F1] bg-[#00B5F1]/10"
                              : "border-bg-elevated bg-bg-surface hover:border-[#00B5F1]/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-text-primary">
                              {length.name}
                            </span>
                            <span className="text-xs text-text-secondary">
                              {length.description}
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
                      Téma (opcionális)
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="pl. webfejlesztés tippek, egészséges életmód, technológiai trendek"
                      className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#00B5F1] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                      Célközönség (opcionális)
                    </label>
                    <input
                      type="text"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="pl. fiatal szakemberek, kisvállalkozók, diákok"
                      className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#00B5F1] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                      Kulcsszavak (opcionális)
                    </label>
                    <input
                      type="text"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="pl. SEO, marketing, web design, AI"
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
                      placeholder="pl. hangsúly a gyakorlati tippekre, rövid és tömör stílus, SEO optimalizált"
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
                      <span>AI Tartalom Generálás</span>
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
                    icon: FileText,
                    title: "Tartalom Generálás",
                    description: "Automatikus tartalom generálás",
                  },
                  {
                    icon: ImageIcon,
                    title: "Vizuális Tervezés",
                    description: "AI vizuális tervezés",
                  },
                  {
                    icon: Share2,
                    title: "Blog Posztok",
                    description: "Blog tartalom generálás",
                  },
                  {
                    icon: PenTool,
                    title: "Social Media Tartalmak",
                    description: "Social media tartalom generálás",
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
                Készen állsz a{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
                  Tartalomtervezésre
                </span>
                ?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-text-secondary mb-8"
              >
                Próbáld ki az AI Tartalom Generátort és hozz létre lenyűgöző
                tartalmakat percek alatt!
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
      </ProductAccessGuard>
    </>
  );
}
