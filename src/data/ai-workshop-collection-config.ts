import type React from "react";
import {
  Sparkles,
  Layout,
  Palette,
  Laptop,
  Calendar,
  Printer,
  Box,
  ClipboardList,
  MonitorPlay,
  Shirt,
} from "lucide-react";

export type ToolType =
  | "online_graphics_prompt_studio"
  | "offline_print_prompt_studio"
  | "apparel_merch_prompt_studio"
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

export type ToolCategory =
  | "online-graphics"
  | "offline-print"
  | "apparel-merch"
  | "software-arch"
  | "analysis-seo"
  | "all";

export interface ToolItem {
  id: ToolType;
  slug: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  category: Exclude<ToolCategory, "all">;
}

export const CATEGORY_LABELS: Record<Exclude<ToolCategory, "all">, string> = {
  "online-graphics": "Online Grafika & Vizuál",
  "offline-print": "Offline & Nyomda",
  "apparel-merch": "Ruha & Textil",
  "software-arch": "Web & Architektúra",
  "analysis-seo": "Elemzés, SEO & Stratégia",
};

export const CATEGORY_ORDER: Exclude<ToolCategory, "all">[] = [
  "online-graphics",
  "offline-print",
  "apparel-merch",
  "software-arch",
  "analysis-seo",
];

export const ADMIN_DEFAULT_ALLOWED_TOOLS: string[] = [
  "online_graphics_prompt_studio",
  "online-grafika-prompt-studio",
  "offline_print_prompt_studio",
  "nyomda-prepress-prompt-studio",
  "apparel_merch_prompt_studio",
  "ruha-ai-muhely",
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
];

export const generatorTools: ToolItem[] = [
  {
    id: "online_graphics_prompt_studio",
    slug: "online-grafika-prompt-studio",
    name: "Online Grafika & Kampány Pro Prompt Stúdió [PRO PROMPT]",
    description:
      "5-motoros (Midjourney v7, Flux 1.1 Pro, Ideogram 3.0, Recraft v3 SVG, Videó/Motion) kampány-, hero-, 9:16 Reels safe-zone és ad-prompt tervező élő előnézettel.",
    icon: Sparkles,
    category: "online-graphics",
    features: [
      "PRO PROMPT: 6 db 1-kattintásos kampány preset + 0 ms élő szintaxis-fordító",
      "7 platform formátum (16:9 Hero, OG, 4:5 Feed, 9:16 Reels UI safe-zone, YouTube)",
      "Copy-space, F/Z-pattern tekintetvezetés, WCAG AA kontraszt-zóna és optika",
      "Anti-AI-Slop negatív szűrő + Kék-Lila HEX paletta-zár + Groq 3 variáció",
    ],
  },
  {
    id: "midjourney_prompt",
    slug: "midjourney",
    name: "Midjourney v6.1 / v7 & Flux Pro Master",
    description:
      "Fotórealisztikus, 3D renderelt vagy minimalista illusztrációs promptok készítése 2026-os motorokkal.",
    icon: Sparkles,
    category: "online-graphics",
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
    category: "online-graphics",
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
    category: "online-graphics",
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
    description: "Weboldal szekciók elrendezése és Midjourney UI mockup promptok.",
    icon: Laptop,
    category: "online-graphics",
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
    category: "online-graphics",
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
    category: "analysis-seo",
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
    category: "online-graphics",
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
    category: "online-graphics",
    features: [
      "Midjourney v6.1/v7 és Flux Pro promptok",
      "Egyedi arculattervezés",
      "Logo generálás",
      "Brand szimbólumok",
    ],
  },
  {
    id: "apparel_merch_prompt_studio",
    slug: "ruha-ai-muhely",
    name: "Ruha Készítés, Textil & Merch Pro Prompt Stúdió [PRO PROMPT]",
    description:
      "3-módú textilipari stúdió: izolált 2D nyomatgrafika (DTF, 45–55 LPI Szita, 3D Hímzés, AOP --tile), 2D CAD Tech Pack szabásrajz + BOM és Lookbook/Ghost Mannequin mockup.",
    icon: Shirt,
    category: "apparel-merch",
    features: [
      "PRO PROMPT: Textilnyomtatási Grafika vs. 2D CAD Tech Pack vs. Lookbook Mockup",
      "6 technológia gyártási korlátokkal (DTF halo-védelem, Szita LPI/choke, Hímzés 1.2mm/5mm)",
      "10 ruhadarab + 6 GSM alapanyag + 5 mosás + 8 konstrukciós/BOM trim",
      "Sötét alapanyag White Underbase védelem + másolható Tech Pack BOM adatlap",
    ],
  },
  {
    id: "offline_print_prompt_studio",
    slug: "nyomda-prepress-prompt-studio",
    name: "Offline & Nyomdai Prepress Pro Prompt Stúdió [PRO PROMPT]",
    description:
      "Dupla módú (2D nyomdakész grafika + 3D print mockup) prepress stúdió: 10 kiadványtípus, FOGRA39/51/52 TAC, FEFCO stanc, Roll-up holttér és spot rétegek.",
    icon: Printer,
    category: "offline-print",
    features: [
      "PRO PROMPT: 2D nyomdakész grafikai alap vs. 3D ügyfélprezentációs print mockup",
      "10 formátum (névjegy, göngyölt 97-100-100 mm, FEFCO stanc, Roll-up 150 mm holttér)",
      "FOGRA39/51/52 ICC & TAC limit, Rich Black, 100% K Overprint és 7 Spot réteg",
      "Másolható PDF/X-4 műszaki adatlap + 0 ms élő prompt + Groq 3 variáció",
    ],
  },
  {
    id: "flyer_ai_muhely",
    slug: "szorolap-ai-muhely",
    name: "Nyomdakész Szórólap & Leporelló Stúdió",
    description:
      "Milliméter-pontos prepress szórólap- és hajtogatott prospektus tervezés: vágási/kifutós zónák, hajtási mechanika és panelenkénti copywriting.",
    icon: Printer,
    category: "offline-print",
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
    category: "offline-print",
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
    category: "software-arch",
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
    category: "offline-print",
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
    category: "online-graphics",
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
    category: "analysis-seo",
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
    category: "online-graphics",
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
    category: "analysis-seo",
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
    category: "online-graphics",
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
    category: "analysis-seo",
    features: [
      "Versenytárs vizuális elemzés",
      "Design audit",
      "Trend elemzés",
      "Versenytárs stratégia",
    ],
  },
];
