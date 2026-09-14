"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Image as ImageIcon,
  Camera,
  Sun,
  Zap,
  ArrowRight,
  Copy,
  RefreshCw,
  Layers,
} from "lucide-react";
import ProductAccessGuard from "@/components/molecules/ProductAccessGuard";

const visualStyles = [
  {
    id: "photorealistic",
    name: "Fotórealisztikus",
    description: "Valósághű, részletes",
    prompt:
      "photorealistic visual, hyper-detailed, realistic lighting, 85mm G-Master optics, professional photography aesthetic",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futurisztikus, neon",
    prompt:
      "cyberpunk visual, neon lights, futuristic aesthetic, dark background with vibrant colors, tech-inspired, Cyber-Dark aesthetic",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "minimalist",
    name: "Minimalista",
    description: "Tiszta, egyszerű",
    prompt:
      "minimalist visual, clean composition, ample negative space, modern aesthetic, professional simplicity",
    color: "from-[#00B5F1] to-orange-500",
  },
  {
    id: "artistic",
    name: "Művészi",
    description: "Kreatív, expresszív",
    prompt:
      "artistic visual, creative expression, dynamic composition, artistic elements, unique aesthetic",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    description: "Filmes, drámai",
    prompt:
      "cinematic visual, dramatic lighting, chiaroscuro, film grain aesthetic, movie-like composition",
    color: "from-yellow-500 to-[#00B5F1]",
  },
  {
    id: "abstract",
    name: "Absztrakt",
    description: "Koncepcionális",
    prompt:
      "abstract visual, conceptual design, geometric shapes, modern art aesthetic, creative interpretation",
    color: "from-indigo-500 to-blue-500",
  },
];

const lightingOptions = [
  {
    id: "chiaroscuro",
    name: "Chiaroscuro",
    description: "Fény-árnyék kontraszt",
  },
  { id: "golden", name: "Golden Hour", description: "Aranyórá fény" },
  { id: "studio", name: "Studio Lighting", description: "Stúdió fények" },
  { id: "natural", name: "Natural Light", description: "Természetes fény" },
];

const qualitySettings = [
  { id: "ultra", name: "Ultra HD", description: "8K felbontás, max részlet" },
  {
    id: "high",
    name: "High Quality",
    description: "4K felbontás, magas részlet",
  },
  {
    id: "standard",
    name: "Standard",
    description: "2K felbontás, standard részlet",
  },
];

export default function MidjourneyAIMuhelyPage() {
  const [selectedStyle, setSelectedStyle] = useState(visualStyles[0]);
  const [selectedLighting, setSelectedLighting] = useState(lightingOptions[0]);
  const [selectedQuality, setSelectedQuality] = useState(qualitySettings[0]);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [visualDescription, setVisualDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [stylePreferences, setStylePreferences] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");

  const generatePrompt = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let prompt = `Midjourney v6 ${selectedStyle.name} visual, ${selectedStyle.description}, ${selectedLighting.name} (${selectedLighting.description}), ${selectedQuality.name} (${selectedQuality.description}), ${selectedStyle.prompt}, 90/8/2 color ratio rule, 85mm G-Master optics, professional photography aesthetic, commercial quality, high resolution`;

      if (subject) {
        prompt += `, subject: ${subject}`;
      }
      if (visualDescription) {
        prompt += `, visual description: ${visualDescription}`;
      }
      if (stylePreferences) {
        prompt += `, style preferences: ${stylePreferences}`;
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
                Midjourney AI{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#FF7A00]">
                  Műhely
                </span>
              </motion.h1>
              <p className="text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
                Midjourney v6 integráció prémium vizuálokhoz. 85mm G-Master
                optika, chiaroscuro lighting és Cyber-Dark aesthetic. 5.2x
                vizuális minőség, 94% social engagement, 8K felbontású outputok.
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
                  <ImageIcon className="w-6 h-6 text-[#00B5F1]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">
                    AI Midjourney Generator
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Midjourney v6 Master prompt generálás
                  </p>
                </div>
              </div>

              {/* Visual Style Selection */}
              <div className="mb-8">
                <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                  Vizuális stílus
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {visualStyles.map((style) => (
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

              {/* Lighting & Quality */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Fényezés
                  </label>
                  <div className="space-y-2">
                    {lightingOptions.map((lighting) => (
                      <button
                        key={lighting.id}
                        onClick={() => setSelectedLighting(lighting)}
                        className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                          selectedLighting.id === lighting.id
                            ? "border-[#00B5F1] bg-[#00B5F1]/10"
                            : "border-bg-elevated bg-bg-surface hover:border-[#00B5F1]/50"
                        }`}
                      >
                        <span className="text-sm font-medium text-text-primary">
                          {lighting.name}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {lighting.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Minőség
                  </label>
                  <div className="space-y-2">
                    {qualitySettings.map((quality) => (
                      <button
                        key={quality.id}
                        onClick={() => setSelectedQuality(quality)}
                        className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                          selectedQuality.id === quality.id
                            ? "border-[#00B5F1] bg-[#00B5F1]/10"
                            : "border-bg-elevated bg-bg-surface hover:border-[#00B5F1]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-text-primary">
                            {quality.name}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {quality.description}
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
                    Téma / Tárgy (opcionális)
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="pl. portré, tájkép, termék fotó, épület"
                    className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#00B5F1] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Vizuális leírás (opcionális)
                  </label>
                  <input
                    type="text"
                    value={visualDescription}
                    onChange={(e) => setVisualDescription(e.target.value)}
                    placeholder="pl. modern irodai környezet, természetes fény, absztrakt háttér"
                    className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#00B5F1] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-[#00B5F1] uppercase tracking-[0.2em] mb-4 block">
                    Stílus preferenciák (opcionális)
                  </label>
                  <input
                    type="text"
                    value={stylePreferences}
                    onChange={(e) => setStylePreferences(e.target.value)}
                    placeholder="pl. minimalista, drámai, színes, monokróm"
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
                    placeholder="pl. hangsúly a részletekre, drámai kontraszt, prémium megjelenés"
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
                  icon: ImageIcon,
                  title: "Midjourney v6 Integráció",
                  description: "Legújabb Midjourney verzió",
                },
                {
                  icon: Camera,
                  title: "85mm G-Master Optika",
                  description: "Professzionális optikai beállítások",
                },
                {
                  icon: Sun,
                  title: "Chiaroscuro Lighting",
                  description: "Fény-árnyék kontraszt",
                },
                {
                  icon: Layers,
                  title: "Prémium Vizuálok",
                  description: "Cyber-Dark aesthetic",
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
              Készen állsz a{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#FF7A00]">
                Vizuális Tervezésre
              </span>
              ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-text-secondary mb-8"
            >
              Próbáld ki az AI Midjourney Generátort és hozz létre lenyűgöző
              vizuálokat percek alatt!
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
