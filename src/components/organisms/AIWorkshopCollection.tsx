"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Layout,
  Palette,
  Laptop,
  Calendar,
  Lock,
  Unlock,
  ArrowRight,
  Layers,
  UserCheck,
  LogOut,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut, type User } from "firebase/auth";
import { getClientUserProfileAction } from "@/actions/portal";

type ToolType =
  | "midjourney_prompt"
  | "banner_concept"
  | "logo_designer"
  | "ui_ux_designer"
  | "seasonal_campaign_designer"
  | "kristofka_workflow"
  | "banner_ai_muhely"
  | "logo_ai_muhely"
  | "midjourney_ai_muhely"
  | "seo_audit_ai_muhely"
  | "szezonalis_ai_muhely"
  | "tartalomtervezo_ai_muhely"
  | "ui_ux_ai_muhely"
  | "versenytars_elemzo_ai_muhely";

interface ToolItem {
  id: ToolType;
  slug: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

const generatorTools: ToolItem[] = [
  {
    id: "midjourney_prompt",
    slug: "midjourney",
    name: "Midjourney v6 Master",
    description:
      "Fotórealisztikus, 3D renderelt vagy minimalista illusztrációs promptok készítése.",
    icon: Sparkles,
    features: [
      "Technical parameters (--ar, --v 6.0)",
      "Volumetric & expert lighting terms",
      "Hungarian customization tips",
    ],
  },
  {
    id: "banner_concept",
    slug: "banner",
    name: "Konverziófókuszú Banner & Ad Tervező",
    description:
      "Közösségi média és webáruház bannerek teljes elrendezési terve és promptjai.",
    icon: Layout,
    features: [
      "Layout hierarchy description",
      "Psychological color palette (HEX)",
      "High-converting headline copy",
    ],
  },
  {
    id: "logo_designer",
    slug: "logo",
    name: "Logo & Brand Szimbólum",
    icon: Palette,
    description:
      "Vektorgrafikus logótervek, modern app ikonok és arculati elemek promptjai.",
    features: [
      "3 distinct design concepts",
      "Flat vector & clean lines prompts",
      "Minimalist metaphorical descriptions",
    ],
  },
  {
    id: "ui_ux_designer",
    slug: "ui-ux",
    name: "UI/UX Wireframe mockup",
    icon: Laptop,
    description:
      "Weboldal szekciók elrendezése és Midjourney UI mockup promptok.",
    features: [
      "Section-by-section landing wireframe",
      "Micro-interaction suggestions",
      "High-fidelity Figma UI prompt",
    ],
  },
  {
    id: "seasonal_campaign_designer",
    slug: "szezonalis",
    name: "Szezonális Kampány Vizuál",
    icon: Calendar,
    description:
      "Szezonális akciók kampánygrafikáinak stílusa, hangulata és promptjai.",
    features: [
      "Seasonal vibe & mood description",
      "Thematic color codes (HEX)",
      "Product flatlay asset prompt template",
    ],
  },
  {
    id: "kristofka_workflow",
    slug: "kristofka",
    name: "Kristófka Munkafolyamat",
    description:
      "Ingatlanbefektetői pitch generálás PDF alaprajzokból és kontextus paraméterekből.",
    icon: Sparkles,
    features: [
      "PDF alaprajz elemzés",
      "Strategist-Pro AI workflow",
      "Kontextus paraméterek",
      "Pitch generálás",
    ],
  },
  {
    id: "banner_ai_muhely",
    slug: "banner-ai-muhely",
    name: "Banner AI Műhely",
    description:
      "Konverziófókuszú banner tervezés Midjourney v6 Master promptokkal.",
    icon: Layout,
    features: [
      "Midjourney v6 Master promptok",
      "90/8/2 színarány szabály",
      "85mm G-Master optika",
      "Chiaroscuro lighting",
    ],
  },
  {
    id: "logo_ai_muhely",
    slug: "logo-ai-muhely",
    name: "Logo AI Műhely",
    description:
      "Egyedi arculattervezés és logo generálás Midjourney v6 Master promptokkal.",
    icon: Palette,
    features: [
      "Midjourney v6 Master promptok",
      "Egyedi arculattervezés",
      "Logo generálás",
      "Brand szimbólumok",
    ],
  },
  {
    id: "midjourney_ai_muhely",
    slug: "midjourney-ai-muhely",
    name: "Midjourney AI Műhely",
    description: "Midjourney v6 integráció prémium vizuálokhoz.",
    icon: Sparkles,
    features: [
      "Midjourney v6 integráció",
      "85mm G-Master optika",
      "Chiaroscuro lighting",
      "Prémium vizuálok",
    ],
  },
  {
    id: "seo_audit_ai_muhely",
    slug: "seo-audit-ai-muhely",
    name: "SEO Audit AI Műhely",
    description: "SEO és AEO audit vizualizáció AI eszközökkel.",
    icon: Laptop,
    features: [
      "SEO audit vizualizáció",
      "Lighthouse score tracking",
      "Kulcsszó stratégia",
      "AI válasz motor optimalizáció",
    ],
  },
  {
    id: "szezonalis_ai_muhely",
    slug: "szezonalis-ai-muhely",
    name: "Szezonalis AI Műhely",
    description: "Szezonalis grafikai kampányok AI eszközökkel.",
    icon: Calendar,
    features: [
      "Szezonalis kampányok",
      "Ünnepi vizuálok",
      "Midjourney v6 Master promptok",
      "Automatikus generálás",
    ],
  },
  {
    id: "tartalomtervezo_ai_muhely",
    slug: "tartalomtervezo-ai-muhely",
    name: "Tartalomtervező AI Műhely",
    description: "Tartalom és vizuális tervezés AI eszközökkel.",
    icon: Layout,
    features: [
      "Tartalom generálás",
      "Vizuális tervezés",
      "Blog posztok",
      "Social media tartalmak",
    ],
  },
  {
    id: "ui_ux_ai_muhely",
    slug: "ui-ux-ai-muhely",
    name: "UI/UX AI Műhely",
    description: "UI/UX design és wireframe generálás AI eszközökkel.",
    icon: Laptop,
    features: [
      "UI/UX design generálás",
      "Wireframe tervezés",
      "Konverziófókuszú interface",
      "User experience optimalizáció",
    ],
  },
  {
    id: "versenytars_elemzo_ai_muhely",
    slug: "versenytars-elemzo-ai-muhely",
    name: "Versenytárs Elemző AI Műhely",
    description: "Versenytárs vizuális elemzés AI eszközökkel.",
    icon: Sparkles,
    features: [
      "Versenytárs vizuális elemzés",
      "Design audit",
      "Trend elemzés",
      "Versenytárs stratégia",
    ],
  },
];

export default function AIWorkshopCollection() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        router.push("/admin/login");
        return;
      }
      setUser(currentUser);

      try {
        const token = await currentUser.getIdToken(true);
        const res = await getClientUserProfileAction(token);

        if (res.success && res.profile) {
          const isAdminUser =
            res.profile.role === "admin" ||
            currentUser.email === "hello@webdude.hu";
          setIsAdmin(isAdminUser);

          // Admin users get access to all tools automatically
          if (isAdminUser) {
            setAllowedTools([
              "banner-ai-muhely",
              "cip-ai-muhely",
              "content-ai-muhely",
              "design-system-ai-muhely",
              "icon-ai-muhely",
              "logo-ai-muhely",
              "midjourney-ai-muhely",
              "poster-ai-muhely",
              "presentation-ai-muhely",
              "seo-ai-muhely",
              "social-media-ai-muhely",
              "ui-ux-ai-muhely",
              "szezonalis-ai-muhely",
              "tartalomtervezo-ai-muhely",
              "versenytars-elemzo-ai-muhely",
            ]);
          } else {
            setAllowedTools(res.profile.allowedTools || []);
          }
        } else {
          setError(res.error || "Nem sikerült betölteni a profiladatokat.");
        }
      } catch {
        setError("Hálózati hiba történt a profil lekérése során.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch {
      // Ignored
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-md animate-ping" />
          <Loader2 className="w-10 h-10 animate-spin text-sky-500 relative" />
        </div>
        <p className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest animate-pulse">
          AI Stúdió betöltése...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="w-10 h-10 rounded-xl bg-linear-to-br from-sky-500 to-violet-700 flex items-center justify-center shadow-lg shadow-sky-500/10 cursor-pointer"
            >
              <Layers className="w-5 h-5 text-white" />
            </Link>
            <div>
              <span className="text-xs uppercase font-black tracking-widest text-sky-500 block">
                WebDude AI Studio
              </span>
              <span className="text-sm font-bold text-text-primary block -mt-0.5">
                AI Tervezőműhely
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/portal"
              className="text-[10px] sm:text-xs text-slate-400 hover:text-text-primary font-bold uppercase tracking-wider transition-colors font-mono"
            >
              Projektek
            </Link>
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-slate-400 font-medium truncate max-w-37.5">
                {user?.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-700 hover:border-red-500/40 text-slate-400 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Kijelentkezés</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Title Block */}
        <div className="space-y-2 relative">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
          <span className="text-xs font-mono font-black uppercase tracking-widest text-sky-500">
            Prémium AI Tervezők
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-text-primary tracking-tight leading-none font-mono">
            Kreatív Stúdió
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            Futtass le dizájn-, arculat- és kampánytervező folyamatokat az Elite
            AI motorokkal. A szuperadmin teljes hozzáféréssel rendelkezik, az
            ügyfeleknek pedig egyedileg oszthatók ki a modulok.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl text-xs flex items-center gap-2.5 max-w-2xl font-mono">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generatorTools.map((tool) => {
            const hasAccess = isAdmin || allowedTools.includes(tool.id);
            const ToolIcon = tool.icon;

            return (
              <div
                key={tool.id}
                className={`relative group bg-slate-900/80 backdrop-blur-md border transition-all duration-300 rounded-3xl p-6 flex flex-col justify-between overflow-hidden h-96 ${
                  hasAccess
                    ? "border-slate-700 hover:border-sky-500/50 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:shadow-[0_18px_40px_rgba(0, 181, 241,0.2)] hover:-translate-y-1"
                    : "border-slate-800 opacity-75"
                }`}
              >
                {/* Visual Glow behind active items */}
                {hasAccess && (
                  <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-sky-500/5 group-hover:bg-sky-500/10 transition-all duration-500 blur-2xl pointer-events-none" />
                )}

                <div className="space-y-4">
                  {/* Icon & Access Badge Row */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                        hasAccess
                          ? "bg-sky-500/10 border-sky-500/20 text-sky-500"
                          : "bg-slate-800/40 border-slate-700/30 text-slate-500"
                      }`}
                    >
                      <ToolIcon className="w-6 h-6" />
                    </div>

                    {hasAccess ? (
                      <span className="text-[9px] font-mono font-bold tracking-wider text-emerald-500 bg-emerald-500/5 border border-emerald-500/15 px-2.5 py-1 rounded-md uppercase flex items-center gap-1 select-none">
                        <Unlock className="w-2.5 h-2.5" />
                        Aktív
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md uppercase flex items-center gap-1 select-none">
                        <Lock className="w-2.5 h-2.5" />
                        Zárolt
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h3
                      className={`text-base font-bold font-mono transition-colors ${
                        hasAccess
                          ? "text-text-primary group-hover:text-sky-500"
                          : "text-slate-400"
                      }`}
                    >
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans min-h-12">
                      {tool.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-1.5 pt-2 border-t border-slate-700">
                    {tool.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-[10px] text-slate-400 font-mono"
                      >
                        <div
                          className={`w-1 h-1 rounded-full ${hasAccess ? "bg-sky-500/60" : "bg-slate-600"}`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call To Action Button at Bottom */}
                <div className="pt-6">
                  {hasAccess ? (
                    <Link
                      href={`/portal/ai-muhely/${tool.slug}`}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/25 text-sky-500 font-bold transition-all text-xs uppercase tracking-wider font-mono cursor-pointer"
                    >
                      Generátor megnyitása
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <Link
                      href="/kapcsolat"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all text-xs uppercase tracking-wider font-mono cursor-pointer"
                    >
                      Hozzáférés igénylése
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
