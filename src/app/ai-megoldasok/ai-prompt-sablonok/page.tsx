"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Copy,
  Check,
  Sparkles,
  Image as ImageIcon,
  Palette,
  Wand2,
  Camera,
  Zap,
  ArrowRight,
  Filter,
  Lock,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const promptTemplates = [
  {
    id: 1,
    category: "Logo Design",
    icon: Palette,
    color: "from-[#f59e0b] to-orange-500",
    title: "Minimalista Tech Logo",
    description: "Modern, tiszta vonalvezetésű tech vállalati logó",
    prompt:
      "Create a minimalist logo for a tech company, featuring a stylized letter '{LOGO_NAME}' with geometric shapes, clean lines, and a modern aesthetic. Use a gradient of Electric Cyan (#00B5F1) and deep cyan colors on a dark background. Professional, scalable, and memorable design suitable for digital platforms.",
    variables: [
      { name: "LOGO_NAME", label: "Logó Karakter/Név", placeholder: "W" },
    ],
    tags: ["Midjourney", "DALL-E", "Logo"],
  },
  {
    id: 2,
    category: "Product Photography",
    icon: Camera,
    color: "from-purple-500 to-pink-500",
    title: "Prémium Termék Fotó",
    description: "Studio minőségű termékfotó természetes megvilágítással",
    prompt:
      "Professional product photography of a {PRODUCT_NAME}, studio lighting, soft shadows, dark gradient background, high contrast, sharp focus, 4K resolution, commercial quality, minimalist composition, sleek and modern aesthetic.",
    variables: [
      { name: "PRODUCT_NAME", label: "Termék Neve", placeholder: "smartphone" },
    ],
    tags: ["Midjourney", "DALL-E", "Product"],
  },
  {
    id: 3,
    category: "Social Media Banner",
    icon: ImageIcon,
    color: "from-blue-500 to-amber-500",
    title: "Instagram Banner",
    description: "Figyelemfelkeltő social media banner modern stílusban",
    prompt:
      "Eye-catching Instagram banner for a {BRAND_NAME}, featuring abstract geometric shapes, gradient overlay of blue and cyan, modern typography, clean layout, professional aesthetic, 1080x1080 resolution, high contrast, vibrant colors.",
    variables: [
      {
        name: "BRAND_NAME",
        label: "Márka Neve",
        placeholder: "digital marketing agency",
      },
    ],
    tags: ["Midjourney", "DALL-E", "Social Media"],
  },
  {
    id: 4,
    category: "Website Hero",
    icon: Wand2,
    color: "from-emerald-500 to-teal-500",
    title: "Weboldal Hero Kép",
    description: "Professzionális weboldal hero szekció háttér",
    prompt:
      "Professional website hero background for a {PLATFORM_TYPE} platform, abstract tech visualization, gradient colors of emerald and teal, subtle geometric patterns, clean and modern design, high resolution, suitable for dark mode interface, professional business aesthetic.",
    variables: [
      { name: "PLATFORM_TYPE", label: "Platform Típus", placeholder: "SaaS" },
    ],
    tags: ["Midjourney", "DALL-E", "Web Design"],
  },
  {
    id: 5,
    category: "Brand Identity",
    icon: Sparkles,
    color: "from-rose-500 to-red-500",
    title: "Arculat Elemei",
    description: "Konzisztens márka identitás vizuális elemek",
    prompt:
      "Complete brand identity package for a {BRAND_TYPE} brand, featuring color palette of rose and red gradients, elegant typography, minimalist icons, premium texture overlays, sophisticated patterns, cohesive visual language, suitable for high-end marketing materials.",
    variables: [
      { name: "BRAND_TYPE", label: "Márka Típus", placeholder: "luxury" },
    ],
    tags: ["Midjourney", "DALL-E", "Branding"],
  },
  {
    id: 6,
    category: "App UI Design",
    icon: Zap,
    color: "from-violet-500 to-purple-500",
    title: "Mobil App UI",
    description: "Modern mobil alkalmazás felület tervezés",
    prompt:
      "Modern mobile app UI design for a {APP_TYPE} app, dark theme with violet and purple accents, clean typography, intuitive navigation, minimal icons, smooth gradients, glassmorphism effects, professional aesthetic, high contrast, user-friendly interface.",
    variables: [
      { name: "APP_TYPE", label: "App Típus", placeholder: "productivity" },
    ],
    tags: ["Midjourney", "DALL-E", "UI/UX"],
  },
  {
    id: 7,
    category: "Illustration",
    icon: ImageIcon,
    color: "from-yellow-500 to-[#f59e0b]",
    title: "3D Illusztráció",
    description: "Stílusos 3D illusztráció marketing anyagokhoz",
    prompt:
      "Stylized 3D illustration for {MATERIAL_TYPE} marketing materials, featuring abstract geometric shapes, soft lighting, gradient colors of yellow and amber, modern aesthetic, clean composition, high quality render, suitable for digital platforms, professional business use.",
    variables: [
      { name: "MATERIAL_TYPE", label: "Anyag Típus", placeholder: "marketing" },
    ],
    tags: ["Midjourney", "DALL-E", "3D"],
  },
  {
    id: 8,
    category: "Packaging Design",
    icon: Palette,
    color: "from-indigo-500 to-blue-500",
    title: "Termék Csomagolás",
    description: "Prémium termék csomagolás tervezés",
    prompt:
      "Premium product packaging design for a {PRODUCT_CATEGORY} brand, minimalist aesthetic, indigo and blue color scheme, elegant typography, clean layout, sustainable materials concept, sophisticated patterns, high-end visual presentation.",
    variables: [
      {
        name: "PRODUCT_CATEGORY",
        label: "Termék Kategória",
        placeholder: "luxury skincare",
      },
    ],
    tags: ["Midjourney", "DALL-E", "Packaging"],
  },
  {
    id: 9,
    category: "Business Card",
    icon: Palette,
    color: "from-slate-500 to-gray-500",
    title: "Professzionális Névjegykártya",
    description: "Modern üzleti névjegykártya design",
    prompt:
      "Professional business card design for a {ROLE_TYPE} executive, minimalist layout with slate and gray color scheme, elegant typography, modern geometric patterns, premium texture, clean composition, high-resolution print-ready design.",
    variables: [
      { name: "ROLE_TYPE", label: "Szerepkör", placeholder: "corporate" },
    ],
    tags: ["Midjourney", "DALL-E", "Business"],
  },
  {
    id: 10,
    category: "Book Cover",
    icon: ImageIcon,
    color: "from-red-500 to-orange-500",
    title: "Könyvborító Design",
    description: "Figyelemfelkeltő könyvborító illusztráció",
    prompt:
      "Eye-catching book cover design for a {BOOK_TYPE} book, featuring abstract geometric shapes, gradient of red and orange colors, modern typography, clean layout, professional aesthetic, high contrast, suitable for print and digital formats.",
    variables: [
      {
        name: "BOOK_TYPE",
        label: "Könyv Típus",
        placeholder: "business self-help",
      },
    ],
    tags: ["Midjourney", "DALL-E", "Publishing"],
  },
  {
    id: 11,
    category: "Icon Set",
    icon: Wand2,
    color: "from-teal-500 to-emerald-500",
    title: "Ikon Set Design",
    description: "Konzisztens ikon csomag weboldalakhoz",
    prompt:
      "Complete icon set design for a {APP_TYPE} web application, featuring 24 minimalist icons with teal and emerald color scheme, clean geometric shapes, consistent stroke width, modern aesthetic, scalable vector style, suitable for dark and light interfaces.",
    variables: [{ name: "APP_TYPE", label: "App Típus", placeholder: "web" }],
    tags: ["Midjourney", "DALL-E", "Icons"],
  },
  {
    id: 12,
    category: "Poster Design",
    icon: ImageIcon,
    color: "from-pink-500 to-rose-500",
    title: "Event Poster",
    description: "Professzionális esemény poszter design",
    prompt:
      "Professional event poster design for a {EVENT_TYPE} conference, featuring abstract geometric patterns, gradient of pink and rose colors, modern typography, clean layout, vibrant aesthetic, high contrast, suitable for print and digital promotion.",
    variables: [
      { name: "EVENT_TYPE", label: "Esemény Típus", placeholder: "tech" },
    ],
    tags: ["Midjourney", "DALL-E", "Events"],
  },
  {
    id: 13,
    category: "Social Media Post",
    icon: Sparkles,
    color: "from-purple-500 to-indigo-500",
    title: "Instagram Post",
    description: "Figyelemfelkeltő Instagram poszter sablon",
    prompt:
      "Engaging Instagram post design for a {BRAND_TYPE} brand, featuring soft gradient background of purple and indigo, elegant typography, minimalist composition, modern aesthetic, high quality, suitable for social media marketing campaigns.",
    variables: [
      { name: "BRAND_TYPE", label: "Márka Típus", placeholder: "lifestyle" },
    ],
    tags: ["Midjourney", "DALL-E", "Social Media"],
  },
  {
    id: 14,
    category: "Presentation",
    icon: Wand2,
    color: "from-blue-500 to-sky-500",
    title: "Powerpoint Sablon",
    description: "Professzionális prezentáció slide design",
    prompt:
      "Professional PowerPoint slide template for a {PRESENTATION_TYPE} presentation, featuring clean layout with blue and sky gradient, modern typography, minimalist geometric elements, professional aesthetic, high contrast, suitable for corporate presentations.",
    variables: [
      {
        name: "PRESENTATION_TYPE",
        label: "Prezentáció Típus",
        placeholder: "business",
      },
    ],
    tags: ["Midjourney", "DALL-E", "Business"],
  },
  {
    id: 15,
    category: "Email Template",
    icon: ImageIcon,
    color: "from-green-500 to-emerald-500",
    title: "Email Newsletter",
    description: "Modern email hírlevél sablon design",
    prompt:
      "Modern email newsletter template design, featuring clean layout with green and emerald color scheme, elegant typography, minimalist geometric patterns, professional aesthetic, high contrast, suitable for {CAMPAIGN_TYPE} marketing campaigns.",
    variables: [
      { name: "CAMPAIGN_TYPE", label: "Kampány Típus", placeholder: "email" },
    ],
    tags: ["Midjourney", "DALL-E", "Marketing"],
  },
  {
    id: 16,
    category: "Infographic",
    icon: ImageIcon,
    color: "from-orange-500 to-[#f59e0b]",
    title: "Adatvizualizáció Infografika",
    description: "Professzionális infografika design",
    prompt:
      "Professional infographic design for {DATA_TYPE} visualization, featuring clean layout with orange and amber gradient, modern typography, minimalist geometric charts, professional aesthetic, high contrast, suitable for business reports and presentations.",
    variables: [
      { name: "DATA_TYPE", label: "Adat Típus", placeholder: "data" },
    ],
    tags: ["Midjourney", "DALL-E", "Data"],
  },
  {
    id: 17,
    category: "Magazine Cover",
    icon: Palette,
    color: "from-violet-500 to-purple-500",
    title: "Magazin Borító",
    description: "Stílusos magazin borító design",
    prompt:
      "Stylish magazine cover design for a {MAGAZINE_TYPE} publication, featuring bold typography with violet and purple color scheme, modern geometric patterns, clean composition, professional aesthetic, high contrast, suitable for print and digital formats.",
    variables: [
      {
        name: "MAGAZINE_TYPE",
        label: "Magazin Típus",
        placeholder: "lifestyle",
      },
    ],
    tags: ["Midjourney", "DALL-E", "Publishing"],
  },
  {
    id: 18,
    category: "Website Mockup",
    icon: Wand2,
    color: "from-amber-500 to-blue-500",
    title: "Weboldal Mockup",
    description: "Professzionális weboldal mockup design",
    prompt:
      "Professional website mockup design for a {PLATFORM_TYPE} platform, featuring clean layout with cyan and blue gradient, modern typography, minimalist UI elements, professional aesthetic, high resolution, suitable for portfolio presentations.",
    variables: [
      { name: "PLATFORM_TYPE", label: "Platform Típus", placeholder: "SaaS" },
    ],
    tags: ["Midjourney", "DALL-E", "Web Design"],
  },
];

const categories = [
  "Összes",
  "Logo Design",
  "Product Photography",
  "Social Media Banner",
  "Website Hero",
  "Brand Identity",
  "App UI Design",
  "Illustration",
  "Packaging Design",
  "Business Card",
  "Book Cover",
  "Icon Set",
  "Poster Design",
  "Social Media Post",
  "Presentation",
  "Email Template",
  "Infographic",
  "Magazine Cover",
  "Website Mockup",
];

export default function AIPromptSablonokPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Összes");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [variableValues, setVariableValues] = useState<
    Record<number, Record<string, string>>
  >({});

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredPrompts =
    selectedCategory === "Összes"
      ? promptTemplates
      : promptTemplates.filter((p) => p.category === selectedCategory);

  const replaceVariables = (prompt: string, templateId: number): string => {
    const values = variableValues[templateId] || {};
    let result = prompt;
    Object.keys(values).forEach((key) => {
      result = result.replace(new RegExp(`{${key}}`, "g"), values[key]);
    });
    return result;
  };

  const copyToClipboard = (templateId: number) => {
    const template = promptTemplates.find((t) => t.id === templateId);
    if (!template) return;

    const finalPrompt = replaceVariables(template.prompt, templateId);
    navigator.clipboard.writeText(finalPrompt);
    setCopiedId(templateId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleVariableChange = (
    templateId: number,
    variableName: string,
    value: string
  ) => {
    setVariableValues((prev) => ({
      ...prev,
      [templateId]: {
        ...prev[templateId],
        [variableName]: value,
      },
    }));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-transparent text-text-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#f59e0b] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Betöltés...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-transparent text-text-primary flex items-center justify-center">
        <div className="max-w-md w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-bg-card border border-bg-elevated/40 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-[#f59e0b]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Hozzáférés Korlátozott
            </h2>
            <p className="text-slate-400 mb-6">
              Az AI prompt sablonok csak regisztrált felhasználók számára
              elérhetők. Jelentkezz be vagy regisztrálj a hozzáféréshez.
            </p>
            <div className="space-y-3">
              <Link
                href="/bejelentkezes"
                className="block w-full py-3 bg-[#f59e0b] text-bg-base font-bold rounded-xl hover:bg-[#f59e0b]/400 transition-all"
              >
                Bejelentkezés
              </Link>
              <Link
                href="/regisztracio"
                className="block w-full py-3 border border-[#f59e0b] text-[#f59e0b] font-semibold rounded-xl hover:bg-[#f59e0b]/10 transition-all"
              >
                Regisztráció
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent text-text-primary">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-[#f59e0b]/5 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider">
                AI Prompt Sablonok
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Grafikai AI Prompt
              <br />
              <span className="text-[#f59e0b]">Sablonok</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8 leading-relaxed">
              Professzionális, tesztelt prompt sablonok Midjourney, DALL-E és
              más AI képgenerálókhoz. Másold, használd, és hozz létre lenyűgöző
              grafikákat másodpercek alatt.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/szolgaltatasok/ai-prompt-engineering"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#f59e0b] text-bg-base font-bold rounded-xl hover:bg-[#f59e0b]/400 transition-all shadow-lg shadow-[#f59e0b]/20"
              >
                <span>AI Prompt Engineering Szolgáltatás</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="https://ai-prompt.hu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:border-[#f59e0b]/50 hover:text-[#f59e0b] transition-all"
              >
                <span>AI-Prompt.hu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-t border-bg-elevated/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <Filter className="w-5 h-5 text-[#f59e0b]" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-[#f59e0b] text-bg-base"
                    : "bg-bg-card border border-bg-elevated/40 text-white/70 hover:text-[#f59e0b] hover:border-[#f59e0b]/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt Templates Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPrompts.map((template, index) => {
              const Icon = template.icon;
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-bg-card border border-bg-elevated/40 rounded-2xl overflow-hidden hover:border-[#f59e0b]/50 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-bg-elevated/20">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-gray-800 to-gray-900 border border-bg-elevated/40 flex items-center justify-center group-hover:border-[#f59e0b]/30 transition-colors">
                        <Icon className="w-6 h-6 text-[#f59e0b]" />
                      </div>
                      <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider">
                        {template.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#f59e0b] transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-sm text-white/60">
                      {template.description}
                    </p>
                  </div>

                  {/* Prompt Content */}
                  <div className="p-6 bg-bg-surface/30">
                    {/* Variables Input */}
                    {template.variables && template.variables.length > 0 && (
                      <div className="mb-4 space-y-3">
                        {template.variables.map((variable) => (
                          <div key={variable.name}>
                            <label className="block text-xs font-bold text-[#f59e0b] uppercase tracking-wider mb-1">
                              {variable.label}
                            </label>
                            <input
                              type="text"
                              placeholder={variable.placeholder}
                              value={
                                variableValues[template.id]?.[variable.name] ||
                                ""
                              }
                              onChange={(e) =>
                                handleVariableChange(
                                  template.id,
                                  variable.name,
                                  e.target.value
                                )
                              }
                              className="w-full text-sm text-white/80 font-mono bg-bg-card border border-bg-elevated/40 rounded-lg p-3 focus:outline-none focus:border-[#f59e0b]/50 transition-colors"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="relative">
                      <textarea
                        value={replaceVariables(template.prompt, template.id)}
                        readOnly
                        className="w-full text-sm text-white/80 leading-relaxed mb-4 font-mono bg-bg-card border border-bg-elevated/40 rounded-lg p-4 focus:outline-none focus:border-[#f59e0b]/50 transition-colors resize-none"
                        rows={6}
                      />
                      <button
                        onClick={() => copyToClipboard(template.id)}
                        className="absolute top-2 right-2 p-2 rounded-lg bg-bg-card border border-bg-elevated/40 hover:bg-[#f59e0b] hover:text-bg-base hover:border-[#f59e0b] transition-all"
                      >
                        {copiedId === template.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-bg-card border border-bg-elevated/40 text-xs text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-bg-elevated/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Egyedi Prompt Engineering Szükséged Van?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Ha speciális igényeid vannak, segítek egyedi promptok
            kidolgozásában, amelyek pontosan az üzleti céljaidhoz illeszkednek.
          </p>
          <Link
            href="/kapcsolat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#f59e0b] text-bg-base font-bold rounded-xl hover:bg-[#f59e0b]/400 transition-all shadow-lg shadow-[#f59e0b]/20"
          >
            <span>Konzultáció Kérése</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
