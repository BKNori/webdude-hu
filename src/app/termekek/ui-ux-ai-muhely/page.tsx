"use client";

import ProductAccessGuard from "@/components/molecules/ProductAccessGuard";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Layout,
  Smartphone,
  Monitor,
  Zap,
  ArrowRight,
  Copy,
  RefreshCw,
  Layers,
} from "lucide-react";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "UI/UX AI Műhely",
  description:
    "Professzionális UI/UX tervező eszköz AI-vel. Landing page tervezés, mobil alkalmazás tervezés, weboldal interface generálás és teljes design system létrehozása. Konverzióra optimalizált, prémium esztétika.",
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
    url: "https://webdude.hu/termekek/ui-ux-ai-muhely",
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

const designStyles = [
  {
    id: "minimalist",
    name: "Minimalista",
    description: "Tiszta, egyszerű",
    prompt:
      "minimalist UI/UX design, clean interface, ample white space, modern typography, professional aesthetic, user-friendly",
    color: "from-blue-500 to-amber-500",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Kortárs, innovatív",
    prompt:
      "modern UI/UX design, contemporary aesthetic, bold typography, dynamic layout, innovative user experience",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professzionális, üzleti",
    prompt:
      "corporate UI/UX design, professional business aesthetic, trustworthy colors, clean interface, established UX patterns",
    color: "from-[#f59e0b] to-orange-500",
  },
  {
    id: "creative",
    name: "Kreatív",
    description: "Színes, dinamikus",
    prompt:
      "creative UI/UX design, vibrant colors, artistic elements, unique composition, eye-catching interface",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "luxury",
    name: "Luxus",
    description: "Elegáns, prémium",
    prompt:
      "luxury UI/UX design, elegant aesthetic, premium feel, sophisticated colors, high-end user experience",
    color: "from-yellow-500 to-[#f59e0b]",
  },
  {
    id: "tech",
    name: "Tech",
    description: "Modern, innovatív",
    prompt:
      "tech UI/UX design, modern innovation aesthetic, digital elements, futuristic but professional, clean tech style",
    color: "from-indigo-500 to-blue-500",
  },
];

const deviceTypes = [
  { id: "desktop", name: "Desktop", description: "Asztali interface" },
  { id: "mobile", name: "Mobile", description: "Mobil interface" },
  { id: "responsive", name: "Responsive", description: "Reszponzív design" },
  { id: "tablet", name: "Tablet", description: "Tablet interface" },
];

const uxFocus = [
  {
    id: "conversion",
    name: "Konverzió",
    description: "Konverzió optimalizált",
  },
  {
    id: "accessibility",
    name: "Akadálymentesítés",
    description: "WCAG kompatibilis",
  },
  { id: "speed", name: "Sebesség", description: "Gyors betöltés" },
  {
    id: "engagement",
    name: "Elköteleződés",
    description: "Felhasználói élmény",
  },
];

export default function UIUXAIMuhelyPage() {
  const [selectedStyle, setSelectedStyle] = useState(designStyles[0]);
  const [selectedDevice, setSelectedDevice] = useState(deviceTypes[0]);
  const [selectedFocus, setSelectedFocus] = useState(uxFocus[0]);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectType, setProjectType] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [brandGuidelines, setBrandGuidelines] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");

  const generatePrompt = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let prompt = `UI/UX design for ${selectedStyle.name} style, ${selectedStyle.description}, ${selectedDevice.name} (${selectedDevice.description}), ${selectedFocus.name} (${selectedFocus.description}), ${selectedStyle.prompt}, wireframe design, user experience optimization, conversion-focused interface, professional design, commercial quality`;

      if (projectType) {
        prompt += `, project type: ${projectType}`;
      }
      if (targetAudience) {
        prompt += `, target audience: ${targetAudience}`;
      }
      if (brandGuidelines) {
        prompt += `, brand guidelines: ${brandGuidelines}`;
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
                  UI/UX AI{" "}
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
                  UI/UX tervezés AI eszközökkel. Felhasználói élmény
                  optimalizálás és vizuális tervezés. 4.1x UX konverzió, 73%
                  design idő megtakarítás, Figma kompatibilis outputok.
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
                    <Layout className="w-6 h-6 text-[#f59e0b]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">
                      AI UI/UX Generator
                    </h2>
                    <p className="text-sm text-text-secondary">
                      Midjourney v6 Master prompt generálás
                    </p>
                  </div>
                </div>

                {/* Design Style Selection */}
                <div className="mb-8">
                  <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                    Design stílus
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {designStyles.map((style) => (
                      <motion.button
                        key={style.id}
                        onClick={() => setSelectedStyle(style)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedStyle.id === style.id
                            ? "border-[#f59e0b] bg-[#f59e0b]/10"
                            : "border-bg-elevated bg-bg-surface hover:border-[#f59e0b]/50"
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

                {/* Device Type & UX Focus */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                      Eszköz típus
                    </label>
                    <div className="space-y-2">
                      {deviceTypes.map((device) => (
                        <button
                          key={device.id}
                          onClick={() => setSelectedDevice(device)}
                          className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                            selectedDevice.id === device.id
                              ? "border-[#f59e0b] bg-[#f59e0b]/10"
                              : "border-bg-elevated bg-bg-surface hover:border-[#f59e0b]/50"
                          }`}
                        >
                          <span className="text-sm font-medium text-text-primary">
                            {device.name}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {device.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                      UX fókusz
                    </label>
                    <div className="space-y-2">
                      {uxFocus.map((focus) => (
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
                      Projekt típus (opcionális)
                    </label>
                    <input
                      type="text"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      placeholder="pl. e-kereskedelmi oldal, SaaS dashboard, mobil app"
                      className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#f59e0b] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                      Célközönség (opcionális)
                    </label>
                    <input
                      type="text"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="pl. fiatal felnőttek, üzleti felhasználók, idősek"
                      className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#f59e0b] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                      Brand irányelvek (opcionális)
                    </label>
                    <input
                      type="text"
                      value={brandGuidelines}
                      onChange={(e) => setBrandGuidelines(e.target.value)}
                      placeholder="pl. minimalista, modern, prémium, barátságos"
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
                      placeholder="pl. hangsúly a konverzióra, akadálymentesítés, gyors betöltés"
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
                    icon: Layout,
                    title: "UI/UX Design Generálás",
                    description: "Automatikus UI/UX design",
                  },
                  {
                    icon: Smartphone,
                    title: "Wireframe Tervezés",
                    description: "Wireframe generálás",
                  },
                  {
                    icon: Monitor,
                    title: "Konverziófókuszú Interface",
                    description: "Konverzió optimalizált design",
                  },
                  {
                    icon: Layers,
                    title: "UX Optimalizáció",
                    description: "User experience optimalizáció",
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
                Készen állsz az{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#f59e0b] to-[#FF7A00]">
                  UI/UX Tervezésre
                </span>
                ?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-text-secondary mb-8"
              >
                Próbáld ki az AI UI/UX Generátort és hozz létre lenyűgöző
                interface-eket percek alatt!
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
