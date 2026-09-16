"use client";

import ProductAccessGuard from "@/components/molecules/ProductAccessGuard";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Calendar,
  Gift,
  Sun,
  Zap,
  ArrowRight,
  Copy,
  RefreshCw,
  Star,
} from "lucide-react";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Szezonalis AI Műhely",
  description:
    "Szezonális marketing kampányok AI-generált eszközökkel. Karácsony, Black Friday, Nyár, Őszi és egyedi szezonokhoz komplett kampány sablonok és vizuális tartalom.",
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
    url: "https://webdude.hu/termekek/szezonalis-ai-muhely",
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

const seasonalCampaigns = [
  {
    id: "christmas",
    name: "Karácsony",
    description: "Ünnepi karácsonyi kampány",
    prompt:
      "Christmas campaign visual, holiday festive atmosphere, warm colors, decorative elements, seasonal marketing, premium holiday aesthetic",
    color: "from-red-500 to-green-500",
  },
  {
    id: "easter",
    name: "Húsvét",
    description: "Tavaszi húsvéti kampány",
    prompt:
      "Easter campaign visual, spring fresh colors, pastel tones, seasonal elements, festive spring aesthetic",
    color: "from-pink-500 to-yellow-500",
  },
  {
    id: "summer",
    name: "Nyár",
    description: "Nyári szezonális kampány",
    prompt:
      "Summer campaign visual, bright warm colors, beach vibes, energetic atmosphere, seasonal summer aesthetic",
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: "autumn",
    name: "Ősz",
    description: "Őszi szezonális kampány",
    prompt:
      "Autumn campaign visual, warm earth tones, falling leaves, cozy atmosphere, seasonal autumn aesthetic",
    color: "from-[#f59e0b] to-orange-500",
  },
  {
    id: "blackfriday",
    name: "Black Friday",
    description: "Akciós kampány",
    prompt:
      "Black Friday campaign visual, bold urgent colors, promotional elements, sale atmosphere, high-contrast marketing aesthetic",
    color: "from-purple-500 to-red-500",
  },
  {
    id: "newyear",
    name: "Újév",
    description: "Újévi kampány",
    prompt:
      "New Year campaign visual, celebration atmosphere, fireworks, fresh start aesthetic, premium holiday design",
    color: "from-blue-500 to-purple-500",
  },
];

const eventTypes = [
  { id: "birthday", name: "Születésnap", description: "Születésnapi ünnep" },
  { id: "anniversary", name: "Évforduló", description: "Évforduló ünnep" },
  { id: "valentine", name: "Valentin-nap", description: "Szerelmi ünnep" },
  { id: "halloween", name: "Halloween", description: "Őszi ünnep" },
];

const visualStyles = [
  { id: "festive", name: "Ünnepi", description: "Díszes, ünnepi" },
  {
    id: "minimalist",
    name: "Minimalista",
    description: "Egyszerű, letisztult",
  },
  { id: "modern", name: "Modern", description: "Kortárs, stílusos" },
  {
    id: "traditional",
    name: "Hagyományos",
    description: "Klasszikus, hagyományos",
  },
];

export default function SzezonalisAIMuhelyPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(
    seasonalCampaigns[0]
  );
  const [selectedEvent, setSelectedEvent] = useState(eventTypes[0]);
  const [selectedStyle, setSelectedStyle] = useState(visualStyles[0]);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaignGoal, setCampaignGoal] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [promotion, setPromotion] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");

  const generatePrompt = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let prompt = `Seasonal campaign for ${selectedCampaign.name}, ${selectedCampaign.description}, ${selectedEvent.name} (${selectedEvent.description}), ${selectedStyle.name} (${selectedStyle.description}), ${selectedCampaign.prompt}, Midjourney v6 Master prompt, 90/8/2 color ratio rule, professional seasonal design, commercial quality`;

      if (campaignGoal) {
        prompt += `, campaign goal: ${campaignGoal}`;
      }
      if (targetAudience) {
        prompt += `, target audience: ${targetAudience}`;
      }
      if (promotion) {
        prompt += `, promotion: ${promotion}`;
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
                  Szezonalis AI{" "}
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
                  Szezonalis grafikai kampányok AI eszközökkel. Ünnepi és
                  szezonális vizuálok generálása Midjourney v6 Master
                  promptokkal. 4.2x szezonális konverzió, 78% kampány idő
                  megtakarítás, 4K felbontású outputok.
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
                    <Calendar className="w-6 h-6 text-[#f59e0b]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">
                      AI Szezonalis Generator
                    </h2>
                    <p className="text-sm text-text-secondary">
                      Szezonalis kampány prompt generálás
                    </p>
                  </div>
                </div>

                {/* Seasonal Campaign Selection */}
                <div className="mb-8">
                  <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                    Szezonális kampány
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {seasonalCampaigns.map((campaign) => (
                      <motion.button
                        key={campaign.id}
                        onClick={() => setSelectedCampaign(campaign)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedCampaign.id === campaign.id
                            ? "border-[#f59e0b] bg-[#f59e0b]/10"
                            : "border-bg-elevated bg-bg-surface hover:border-[#f59e0b]/50"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br ${campaign.color} mb-3" />
                        <h3 className="text-base font-bold text-text-primary mb-1">
                          {campaign.name}
                        </h3>
                        <p className="text-xs text-text-secondary">
                          {campaign.description}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Event Type & Visual Style */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                      Esemény típus
                    </label>
                    <div className="space-y-2">
                      {eventTypes.map((event) => (
                        <button
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                            selectedEvent.id === event.id
                              ? "border-[#f59e0b] bg-[#f59e0b]/10"
                              : "border-bg-elevated bg-bg-surface hover:border-[#f59e0b]/50"
                          }`}
                        >
                          <span className="text-sm font-medium text-text-primary">
                            {event.name}
                          </span>
                          <span className="text-xs text-text-secondary">
                            {event.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                      Vizuális stílus
                    </label>
                    <div className="space-y-2">
                      {visualStyles.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setSelectedStyle(style)}
                          className={`w-full p-3 rounded-lg border-2 transition-all ${
                            selectedStyle.id === style.id
                              ? "border-[#f59e0b] bg-[#f59e0b]/10"
                              : "border-bg-elevated bg-bg-surface hover:border-[#f59e0b]/50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-text-primary">
                              {style.name}
                            </span>
                            <span className="text-xs text-text-secondary">
                              {style.description}
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
                      Kampány cél (opcionális)
                    </label>
                    <input
                      type="text"
                      value={campaignGoal}
                      onChange={(e) => setCampaignGoal(e.target.value)}
                      placeholder="pl. eladás növelése, márka építés, új termék bevezetés"
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
                      placeholder="pl. fiatal felnőttek, üzleti döntéshozók, szülők"
                      className="w-full p-3 rounded-lg border-2 border-bg-elevated bg-bg-base text-text-primary placeholder:text-text-secondary focus:border-[#f59e0b] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#f59e0b] uppercase tracking-[0.2em] mb-4 block">
                      Promóció / Ajánlat (opcionális)
                    </label>
                    <input
                      type="text"
                      value={promotion}
                      onChange={(e) => setPromotion(e.target.value)}
                      placeholder="pl. 50% kedvezmény, Buy 1 Get 1 Free, Ingyenes szállítás"
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
                      placeholder="pl. hangsúly a konverzióra, ünnepi hangulat, prémium megjelenés"
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
                    icon: Calendar,
                    title: "Szezonalis Kampányok",
                    description: "Szezonális marketing kampányok",
                  },
                  {
                    icon: Gift,
                    title: "Ünnepi Vizuálok",
                    description: "Ünnepi grafikák generálása",
                  },
                  {
                    icon: Sun,
                    title: "Midjourney v6 Master",
                    description: "Prémium prompt sablonok",
                  },
                  {
                    icon: Star,
                    title: "Automatikus Generálás",
                    description: "Automatikus vizuál generálás",
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
                  Szezonalis Kampányokra
                </span>
                ?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-text-secondary mb-8"
              >
                Próbáld ki az AI Szezonalis Generátort és hozz létre lenyűgöző
                szezonális kampányokat percek alatt!
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
