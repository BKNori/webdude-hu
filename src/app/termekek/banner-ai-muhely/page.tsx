"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Image as ImageIcon,
  Palette,
  Camera,
  Zap,
  ArrowRight,
  Copy,
  RefreshCw,
} from "lucide-react";
import ProductAccessGuard from "@/components/molecules/ProductAccessGuard";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Banner AI Műhely",
  description:
    "Professzionális banner tervező eszköz AI-vel. Minimalista, modern, elegáns és playful stílusú bannerek generálása. Social media és weboldal bannerek másodpercek alatt.",
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
    url: "https://webdude.hu/termekek/banner-ai-muhely",
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

const bannerStyles = [
  {
    id: "minimalist",
    name: "Minimalista",
    description: "Tiszta, egyszerű vonalvezetés",
    prompt:
      "minimalist banner design, clean lines, ample white space, modern typography, professional aesthetic",
    color: "from-[#00B5F1] to-sky-500",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futurisztikus, neon elemek",
    prompt:
      "cyberpunk banner design, neon lights, futuristic aesthetic, dark background with vibrant colors, tech-inspired",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professzionális, üzleti",
    prompt:
      "corporate banner design, professional business aesthetic, clean typography, trustworthy colors, modern corporate style",
    color: "from-[#00B5F1] to-[#5B21B6]",
  },
  {
    id: "creative",
    name: "Kreatív",
    description: "Színes, dinamikus",
    prompt:
      "creative banner design, vibrant colors, dynamic composition, artistic elements, eye-catching visual",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "luxury",
    name: "Luxus",
    description: "Elegáns, prémium",
    prompt:
      "luxury banner design, elegant aesthetic, premium feel, sophisticated colors, high-end visual",
    color: "from-yellow-500 to-[#00B5F1]",
  },
  {
    id: "tech",
    name: "Tech",
    description: "Modern, innovatív",
    prompt:
      "tech banner design, modern innovation aesthetic, clean tech style, digital elements, futuristic but professional",
    color: "from-indigo-500 to-blue-500",
  },
];

const aspectRatios = [
  { id: "16:9", name: "16:9 (Wide)", width: 1920, height: 1080 },
  { id: "4:3", name: "4:3 (Standard)", width: 1920, height: 1440 },
  { id: "1:1", name: "1:1 (Square)", width: 1080, height: 1080 },
  { id: "9:16", name: "9:16 (Story)", width: 1080, height: 1920 },
];

const colorPalettes = [
  {
    id: "9082",
    name: "90/8/2 (Cyber-Arany)",
    description: "90% sötét, 8% arany, 2% kiemelő",
  },
  {
    id: "monochrome",
    name: "Monokróm",
    description: "Fekete-fehér árnyalatok",
  },
  { id: "vibrant", name: "Vibráns", description: "Erős, élénk színek" },
  { id: "pastel", name: "Pasztell", description: "Finom, lágy színek" },
];

export default function BannerAIMuhelyPage() {
  const [selectedStyle, setSelectedStyle] = useState(bannerStyles[0]);
  const [selectedRatio, setSelectedRatio] = useState(aspectRatios[0]);
  const [selectedPalette, setSelectedPalette] = useState(colorPalettes[0]);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [logoDescription, setLogoDescription] = useState("");
  const [bannerText, setBannerText] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");

  const generatePrompt = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let prompt = `Banner design for ${selectedStyle.name} style, ${selectedStyle.description}, ${selectedPalette.description}, aspect ratio ${selectedRatio.id}, ${selectedStyle.prompt}, 90/8/2 color ratio rule, 85mm G-Master optics, chiaroscuro lighting, professional photography aesthetic, high resolution, commercial quality`;

      if (logoDescription) {
        prompt += `, include logo: ${logoDescription}`;
      }
      if (bannerText) {
        prompt += `, main text: "${bannerText}"`;
      }
      if (imageDescription) {
        prompt += `, background image: ${imageDescription}`;
      }
      if (ctaText) {
        prompt += `, CTA button: "${ctaText}"`;
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
                  Banner AI{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
                    Műhely
                  </span>
                </motion.h1>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Konverziófókuszú banner tervezés Midjourney v6 Master
                  promptokkal. 90/8/2 színarány és prémium optikai beállítások.
                  3.2x CTR növekedés, 67% kattintási konverzió, 4K felbontású
                  outputok.
                </p>
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
                    <ImageIcon className="w-6 h-6 text-[#00B5F1]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">
                      AI Banner Generator
                    </h2>
                    <p className="text-sm text-text-secondary">
                      Midjourney v6 Master prompt generálás
                    </p>
                  </div>
                </div>

                {/* Style Selection */}
                <div className="mb-8">
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Stílus választás
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {bannerStyles.map((style) => (
                      <motion.button
                        key={style.id}
                        onClick={() => setSelectedStyle(style)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedStyle.id === style.id
                            ? "border-[#00B5F1] bg-[#00B5F1]/10"
                            : "border-bg-elevated bg-bg-surface hover:border-[#00B5F1]/50"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br ${style.color} mb-3" />
                        <h3 className="text-base font-bold text-text-primary mb-1">
                          {style.name}
                        </h3>
                        <p className="text-xs text-text-secondary">
                          {style.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Aspect Ratio & Color Palette */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                      Méretarány
                    </label>
                    <div className="space-y-2">
                      {aspectRatios.map((ratio) => (
                        <button
                          key={ratio.id}
                          onClick={() => setSelectedRatio(ratio)}
                          className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                            selectedRatio.id === ratio.id
                              ? "border-[#00B5F1] bg-[#00B5F1]/10"
                              : "border-bg-elevated bg-bg-surface hover:border-[#00B5F1]/50"
                          }`}
                        >
                          <span className="text-sm font-medium text-text-primary">
                            {ratio.name}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {ratio.width}x{ratio.height}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                      Szín paletta
                    </label>
                    <div className="space-y-2">
                      {colorPalettes.map((palette) => (
                        <button
                          key={palette.id}
                          onClick={() => setSelectedPalette(palette)}
                          className={`w-full p-3 rounded-lg border-2 transition-all ${
                            selectedPalette.id === palette.id
                              ? "border-[#00B5F1] bg-[#00B5F1]/10"
                              : "border-bg-elevated bg-bg-surface hover:border-[#00B5F1]/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-text-primary">
                              {palette.name}
                            </span>
                            <span className="text-xs text-text-secondary">
                              {palette.description}
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
                      Logo leírása (opcionális)
                    </label>
                    <input
                      type="text"
                      value={logoDescription}
                      onChange={(e) => setLogoDescription(e.target.value)}
                      placeholder="pl. minimalista kör alakú logó, kék színű, cégneve"
                      className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#00B5F1] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                      Fő szöveg (opcionális)
                    </label>
                    <input
                      type="text"
                      value={bannerText}
                      onChange={(e) => setBannerText(e.target.value)}
                      placeholder="pl. 50% kedvezmény minden termékre"
                      className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#00B5F1] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                      Háttérkép leírása (opcionális)
                    </label>
                    <input
                      type="text"
                      value={imageDescription}
                      onChange={(e) => setImageDescription(e.target.value)}
                      placeholder="pl. termék fotó, modern irodai háttér, absztrakt minta"
                      className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#00B5F1] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                      CTA gomb szövege (opcionális)
                    </label>
                    <input
                      type="text"
                      value={ctaText}
                      onChange={(e) => setCtaText(e.target.value)}
                      placeholder="pl. Vásárolj most, Tovább, Regisztrálj"
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
                      placeholder="pl. hangsúly a konverzióra, minimalista design, prémium megjelenés"
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
                      <span>Midjourney Prompt Generálás</span>
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
                    icon: ImageIcon,
                    title: "Midjourney v6 Master",
                    description:
                      "Prémium prompt sablonok a legjobb eredményekhez",
                  },
                  {
                    icon: Palette,
                    title: "90/8/2 Színarány",
                    description:
                      "Cyber-Arany identitás a konverzió növeléséhez",
                  },
                  {
                    icon: Camera,
                    title: "85mm G-Master Optika",
                    description: "Professzionális optikai beállítások",
                  },
                  {
                    icon: Zap,
                    title: "Chiaroscuro Lighting",
                    description: "Fény-árnyék kontraszt a drámai hatásért",
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
                  Banner tervezésre
                </span>
                ?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-text-secondary mb-8"
              >
                Próbáld ki az AI Banner Generátort és hozz létre lenyűgöző
                bannereket percek alatt!
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
