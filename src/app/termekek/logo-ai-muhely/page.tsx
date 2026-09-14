"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  PenTool,
  Palette,
  Layers,
  Zap,
  ArrowRight,
  Copy,
  RefreshCw,
  Hexagon,
} from "lucide-react";
import ProductAccessGuard from "@/components/molecules/ProductAccessGuard";

const logoStyles = [
  {
    id: "minimalist",
    name: "Minimalista",
    description: "Tiszta, egyszerű vonalvezetés",
    prompt:
      "minimalist logo design, clean lines, geometric shapes, modern typography, professional aesthetic, scalable vector style",
    color: "from-[#00B5F1] to-cyan-500",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Kortárs, innovatív",
    prompt:
      "modern logo design, contemporary aesthetic, bold typography, dynamic shapes, innovative visual identity",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professzionális, üzleti",
    prompt:
      "corporate logo design, professional business aesthetic, trustworthy colors, clean typography, established brand feel",
    color: "from-[#00B5F1] to-[#FF7A00]",
  },
  {
    id: "creative",
    name: "Kreatív",
    description: "Színes, dinamikus",
    prompt:
      "creative logo design, vibrant colors, artistic elements, unique composition, eye-catching visual",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "luxury",
    name: "Luxus",
    description: "Elegáns, prémium",
    prompt:
      "luxury logo design, elegant aesthetic, premium feel, sophisticated colors, high-end visual identity",
    color: "from-yellow-500 to-[#00B5F1]",
  },
  {
    id: "tech",
    name: "Tech",
    description: "Modern, innovatív",
    prompt:
      "tech logo design, modern innovation aesthetic, digital elements, futuristic but professional, clean tech style",
    color: "from-indigo-500 to-blue-500",
  },
];

const logoTypes = [
  { id: "wordmark", name: "Wordmark", description: "Szöveg alapú logo" },
  { id: "symbol", name: "Szimbólum", description: "Ikon alapú logo" },
  { id: "combination", name: "Kombinált", description: "Szöveg + ikon" },
  { id: "emblem", name: "Embléma", description: "Pajzs alapú" },
];

const colorSchemes = [
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
  { id: "gradient", name: "Gradiens", description: "Színátmenetes" },
  { id: "duotone", name: "Duotón", description: "Kétszínű" },
];

export default function LogoAIMuhelyPage() {
  const [selectedStyle, setSelectedStyle] = useState(logoStyles[0]);
  const [selectedType, setSelectedType] = useState(logoTypes[0]);
  const [selectedScheme, setSelectedScheme] = useState(colorSchemes[0]);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [slogan, setSlogan] = useState("");
  const [colorPreferences, setColorPreferences] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");

  const generatePrompt = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let prompt = `Logo design for ${selectedStyle.name} style, ${selectedStyle.description}, ${selectedType.name} (${selectedType.description}), ${selectedScheme.description}, ${selectedStyle.prompt}, 90/8/2 color ratio rule, professional vector graphics, scalable design, commercial quality, brand identity`;

      if (companyName) {
        prompt += `, company name: "${companyName}"`;
      }
      if (industry) {
        prompt += `, industry: ${industry}`;
      }
      if (slogan) {
        prompt += `, slogan: "${slogan}"`;
      }
      if (colorPreferences) {
        prompt += `, color preferences: ${colorPreferences}`;
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
                Logo AI{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#FF7A00]">
                  Műhely
                </span>
              </motion.h1>
              <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
                Egyedi arculattervezés és logo generálás Midjourney v6 Master
                promptokkal. Prémium vizuális identitás kialakítása. 4.5x brand
                felismerés, 89% design konzisztencia, 300 DPI nyomdakész
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
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#00B5F1]/10 to-[#FF7A00]/10 border border-[#00B5F1]/20 flex items-center justify-center">
                  <PenTool className="w-6 h-6 text-[#00B5F1]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">
                    AI Logo Generator
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
                  {logoStyles.map((style) => (
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

              {/* Logo Type & Color Scheme */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Logo típus
                  </label>
                  <div className="space-y-2">
                    {logoTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type)}
                        className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                          selectedType.id === type.id
                            ? "border-[#00B5F1] bg-[#00B5F1]/10"
                            : "border-bg-elevated bg-bg-surface hover:border-[#00B5F1]/50"
                        }`}
                      >
                        <span className="text-sm font-medium text-text-primary">
                          {type.name}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {type.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Szín séma
                  </label>
                  <div className="space-y-2">
                    {colorSchemes.map((scheme) => (
                      <button
                        key={scheme.id}
                        onClick={() => setSelectedScheme(scheme)}
                        className={`w-full p-3 rounded-lg border-2 transition-all ${
                          selectedScheme.id === scheme.id
                            ? "border-[#00B5F1] bg-[#00B5F1]/10"
                            : "border-bg-elevated bg-bg-surface hover:border-[#00B5F1]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-text-primary">
                            {scheme.name}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {scheme.description}
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
                    Cégnév (opcionális)
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="pl. WebDude, TechStart, Innovate"
                    className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#00B5F1] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Iparág (opcionális)
                  </label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="pl. webfejlesztés, e-kereskedelem, pénzügy"
                    className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#00B5F1] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Szlogen (opcionális)
                  </label>
                  <input
                    type="text"
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    placeholder="pl. Innováció a jövőben, Minőség mindenek felett"
                    className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#00B5F1] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Szín preferenciák (opcionális)
                  </label>
                  <input
                    type="text"
                    value={colorPreferences}
                    onChange={(e) => setColorPreferences(e.target.value)}
                    placeholder="pl. kék és narancs, monokróm, pasztell színek"
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
                    placeholder="pl. minimalista design, geometrikus formák, modern tipográfia"
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
                className="w-full py-4 bg-linear-to-r from-[#00B5F1] to-[#FF7A00] text-white font-bold rounded-xl hover:shadow-[0_8px_32px_rgba(0,181,241,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#FF7A00]">
                Előnyök
              </span>
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: PenTool,
                  title: "Midjourney v6 Master",
                  description:
                    "Prémium prompt sablonok a legjobb eredményekhez",
                },
                {
                  icon: Palette,
                  title: "Egyedi Arculattervezés",
                  description: "Személyre szabott vizuális identitás",
                },
                {
                  icon: Layers,
                  title: "Logo Generálás",
                  description: "Automatikus logo generálás több stílusban",
                },
                {
                  icon: Hexagon,
                  title: "Brand Szimbólumok",
                  description: "Márka szimbólum tervezés és optimalizálás",
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
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#00B5F1]/10 to-[#FF7A00]/10 border border-[#00B5F1]/20 flex items-center justify-center mb-4 group-hover:border-[#00B5F1]/50 transition-colors">
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
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#FF7A00]">
                Arculattervezésre
              </span>
              ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-text-secondary mb-8"
            >
              Próbáld ki az AI Logo Generátort és hozz létre lenyűgöző logókat
              percek alatt!
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#00B5F1] to-[#FF7A00] text-white font-bold rounded-xl hover:shadow-[0_8px_32px_rgba(0,181,241,0.4)] transition-all"
            >
              Kezdés most
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </section>
      </div>
    </ProductAccessGuard>
  );
}
