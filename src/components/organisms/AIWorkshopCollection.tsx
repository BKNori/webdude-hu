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
  Printer,
  Box,
  ClipboardList,
  MonitorPlay,
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
  | "versenytars_elemzo_ai_muhely"
  | "flyer_ai_muhely"
  | "packaging_ai_muhely"
  | "project_scope_ai_muhely"
  | "signage_ai_muhely";

type ToolCategory = "visual" | "web" | "seo" | "strategy" | "all";

interface ToolItem {
  id: ToolType;
  slug: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  category: Exclude<ToolCategory, "all">;
}

const CATEGORY_LABELS: Record<Exclude<ToolCategory, "all">, string> = {
  visual: "Vizuális & Grafika",
  web: "Web & UI/UX",
  seo: "SEO & Marketing",
  strategy: "Stratégia",
};

const CATEGORY_ORDER: Exclude<ToolCategory, "all">[] = [
  "visual",
  "web",
  "seo",
  "strategy",
];

const generatorTools: ToolItem[] = [
  {
    id: "midjourney_prompt",
    slug: "midjourney",
    name: "Midjourney v6.1 / v7 & Flux Pro Master",
    description:
      "Fotórealisztikus, 3D renderelt vagy minimalista illusztrációs promptok készítése 2026-os motorokkal.",
    icon: Sparkles,
    category: "visual",
    features: [
      "Motorválasztó: Midjourney v6.1/v7, Flux.1 Pro, Ideogram 2.0, Recraft v3",
      "8 modern stílusirányzat + optikai preset chipek (85mm, tilt-shift, chiaroscuro)",
      "Képarány, stilizáció, --style raw, negatív prompt, --sref/--cref",
      "Kattintható színpaletta presetek HEX gépelés nélkül",
    ],
  },
  {
    id: "banner_concept",
    slug: "banner",
    name: "Konverziófókuszú Banner & Ad Tervező",
    description:
      "Közösségi média és webáruház bannerek teljes elrendezési terve és promptjai.",
    icon: Layout,
    category: "visual",
    features: [
      "Elrendezési hierarchia leírása",
      "Pszichológiai színpaletta (HEX)",
      "Konverzió-optimalizált headline szöveg",
    ],
  },
  {
    id: "logo_designer",
    slug: "logo",
    name: "Logo & Brand Szimbólum",
    description:
      "Vektorgrafikus logótervek, modern app ikonok és arculati elemek promptjai.",
    icon: Palette,
    category: "visual",
    features: [
      "3 különböző design koncepció",
      "Flat vector és letisztult vonalak promptok",
      "Minimalista metaforikus leírások",
    ],
  },
  {
    id: "ui_ux_designer",
    slug: "ui-ux",
    name: "UI/UX Wireframe mockup",
    description:
      "Weboldal szekciók elrendezése és Midjourney UI mockup promptok.",
    icon: Laptop,
    category: "web",
    features: [
      "Szekciónkénti landing wireframe",
      "Mikro-interakció javaslatok",
      "Magas hűségű UI prompt",
    ],
  },
  {
    id: "seasonal_campaign_designer",
    slug: "szezonalis",
    name: "Szezonális Kampány Vizuál",
    description:
      "Szezonális akciók kampánygrafikáinak stílusa, hangulata és promptjai.",
    icon: Calendar,
    category: "visual",
    features: [
      "Szezonális hangulat és vibe leírás",
      "Tematikus színkódok (HEX)",
      "Termék flatlay asset prompt sablon",
    ],
  },
  {
    id: "kristofka_workflow",
    slug: "kristofka",
    name: "Kristófka Munkafolyamat",
    description:
      "Ingatlanbefektetői pitch generálás PDF alaprajzokból és kontextus paraméterekből.",
    icon: Sparkles,
    category: "strategy",
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
      "Konverziófókuszú banner tervezés Midjourney v6.1/v7 és Flux Pro promptokkal.",
    icon: Layout,
    category: "visual",
    features: [
      "Midjourney v6.1/v7 és Flux Pro promptok",
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
      "Egyedi arculattervezés és logo generálás Midjourney v6.1/v7 és Flux Pro promptokkal.",
    icon: Palette,
    category: "visual",
    features: [
      "Midjourney v6.1/v7 és Flux Pro promptok",
      "Egyedi arculattervezés",
      "Logo generálás",
      "Brand szimbólumok",
    ],
  },
  {
    id: "flyer_ai_muhely",
    slug: "szorolap-ai-muhely",
    name: "Nyomdakész Szórólap & Leporelló Stúdió",
    description:
      "Milliméter-pontos prepress szórólap- és hajtogatott prospektus tervezés: vágási/kifutós zónák, hajtási mechanika és panelenkénti copywriting.",
    icon: Printer,
    category: "visual",
    features: [
      "8 nyomdai formátum (A5–DL, göngyölt, Z-fold, bi-fold)",
      "Prepress műszaki rajz: bleed, safe zone, TAC, Rich Black",
      "Panelenkénti zónaterv + kész magyar szövegek",
      "CMYK/Pantone swatch + pt tipográfiai skála + 8 pontos checklist",
    ],
  },
  {
    id: "packaging_ai_muhely",
    slug: "csomagolas-ai-muhely",
    name: "Nyomdakész Csomagolás & Stancrajz Stúdió",
    description:
      "FEFCO dobozok, hajtogatott kartonok, rigid box, doypack és palackcímkék: stancrajz-specifikációk, EU compliance és panelenkénti termékterv.",
    icon: Box,
    category: "visual",
    features: [
      "8 ipari struktúra (FEFCO 0427/0201, rigid box, doypack, zsugorfólia)",
      "Dieline & prepress: vágósík, hajtósáv, ragasztófül, szálirány",
      "Panelenkénti másolat + kötelező EU/jogi szimbólumok",
      "AI packshot/unboxing promptok + 8 pontos prepress checklist",
    ],
  },
  {
    id: "project_scope_ai_muhely",
    slug: "projekt-tervezo-ai-muhely",
    name: "Weboldal Architektúra & Árajánlat Stúdió",
    description:
      "Nyers ügyfél-briefből teljes oldaltérkép, SEO/AEO architektúra, 3 csomagszint és kész árajánlat-kísérőlevél — zéró fix árral.",
    icon: ClipboardList,
    category: "strategy",
    features: [
      "6 projekttípus + 5 technológiai stack + integrációs chipek",
      "6-10 oldalas sitemap H1/Sekció/Schema/AEO specifikációval",
      "3 csomagszint (Start/Pro/Enterprise) egyedi árajánlattal",
      "5 fázisú roadmap + kockázatlista + másolható ügyféllevél",
    ],
  },
  {
    id: "signage_ai_muhely",
    slug: "dekor-ai-muhely",
    name: "Roll-up, Kirakat, Molinó & Autódekor Stúdió",
    description:
      "Nagyformátumú dekoráció- és LFP tervező: méretarányos DPI, dead-zone térképek, RAL/Oracal kódok és távolsági olvashatóság.",
    icon: MonitorPlay,
    category: "visual",
    features: [
      "8 formátum (roll-up, OWV kirakat, autówrap, molinó, sajtófal, dibond)",
      "LFP mérnöki spec: skálamegfeleltetés, holttér, CutContour, fehér tinta",
      "Magassági zónaterv kártyák + távolsági mm tipográfia",
      "CMYK+RAL swatch-ok, 3 AI prompt export, 8 pontos checklist",
    ],
  },
  {
    id: "midjourney_ai_muhely",
    slug: "midjourney-ai-muhely",
    name: "Midjourney AI Műhely",
    description:
      "Midjourney v6.1/v7 és Flux.1 Pro integráció prémium vizuálokhoz.",
    icon: Sparkles,
    category: "visual",
    features: [
      "Midjourney v6.1/v7 és Flux.1 Pro",
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
    category: "seo",
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
    category: "visual",
    features: [
      "Szezonális kampányok",
      "Ünnepi vizuálok",
      "Midjourney v6.1/v7 és Flux Pro promptok",
      "Automatikus generálás",
    ],
  },
  {
    id: "tartalomtervezo_ai_muhely",
    slug: "tartalomtervezo-ai-muhely",
    name: "Tartalomtervező AI Műhely",
    description: "Tartalom és vizuális tervezés AI eszközökkel.",
    icon: Layout,
    category: "seo",
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
    category: "web",
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
    category: "strategy",
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
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("all");

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        // Névtelen látogató: a katalógus nyilvános, a kártyák zároltak
        // maradnak "Hozzáférés igénylése" CTA-val — nincs admin login redirect.
        setLoading(false);
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

  const displayName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Felhasználó";

  const filteredTools =
    activeCategory === "all"
      ? generatorTools
      : generatorTools.filter((tool) => tool.category === activeCategory);

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
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-slate-400 font-medium truncate max-w-37.5">
                {user?.email}
              </span>
              {isAdmin && (
                <span className="text-[9px] font-black uppercase tracking-widest text-[#a78bfa] bg-[#7C3AED]/15 border border-[#7C3AED]/30 px-1.5 py-0.5 rounded">
                  Szuperadmin
                </span>
              )}
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
          {/* Üdvözlő sáv — belépett státusz */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <p className="text-xs text-slate-400 font-mono">
              Üdvözöllek a Kreatív Stúdióban,{" "}
              <span className="text-slate-200 font-bold">{displayName}</span>
              {isAdmin && (
                <span className="text-[#a78bfa]">
                  {" "}
                  • Szuperadmin hozzáférés aktív
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Kategória szűrő */}
        <div className="flex flex-wrap items-center gap-2">
          {(["all", ...CATEGORY_ORDER] as ToolCategory[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                activeCategory === cat
                  ? "bg-[#00B5F1]/15 border-[#00B5F1]/50 text-[#00B5F1] shadow-[0_0_14px_rgba(0,181,241,0.15)]"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-[#00B5F1]/30 hover:text-slate-200"
              }`}
            >
              {cat === "all" ? "Összes" : CATEGORY_LABELS[cat]}
              <span className="ml-1.5 opacity-60 font-mono">
                {cat === "all"
                  ? generatorTools.length
                  : generatorTools.filter((t) => t.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl text-xs flex items-center gap-2.5 max-w-2xl font-mono">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
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
