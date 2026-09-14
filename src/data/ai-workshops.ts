export interface AiWorkshop {
  id: string;
  name: string;
  description: string;
  price: string;
  route: string;
  category: "branding" | "content" | "design" | "technical" | "workflow";
  icon: string;
  cycle: number;
  features: string[];
  isPro?: boolean;
}

export const aiWorkshops: AiWorkshop[] = [
  {
    id: "logo-ai-muhely",
    name: "Logo AI Műhely",
    description:
      "Professzionális logo tervezés AI-val. Brand guidelines, export formátumok és több variáció egyetlen kattintással.",
    price: "49,000 Ft",
    route: "/portal/ai-muhely/logo-ai-muhely",
    category: "branding",
    icon: "Logo",
    cycle: 176,
    features: [
      "Brand guidelines generálás",
      "Több export formátum (SVG, PNG, PDF)",
      "Light/Dark variációk",
      "Szín paletta és tipográfia",
    ],
    isPro: true,
  },
  {
    id: "midjourney-ai-muhely",
    name: "Midjourney AI Műhely",
    description:
      "Professzionális Midjourney promptok generálása. AI képgenerálás optimalizált promptokkal és paraméterekkel.",
    price: "29,000 Ft",
    route: "/portal/ai-muhely/midjourney-ai-muhely",
    category: "design",
    icon: "Image",
    cycle: 177,
    features: [
      "Optimalizált Midjourney promptok",
      "Több stílus és aspektus arány",
      "--v 6.0 és --style raw paraméterek",
      "Kreatív és fotórealisztikus módok",
    ],
  },
  {
    id: "seo-audit-ai-muhely",
    name: "SEO Audit AI Műhely",
    description:
      "Átfogó SEO audit és AEO optimalizálás. Lighthouse score javítás és AI kereső motor optimalizálás.",
    price: "69,000 Ft",
    route: "/portal/ai-muhely/seo-audit-ai-muhely",
    category: "technical",
    icon: "Search",
    cycle: 178,
    features: [
      "Lighthouse 95+ score célok",
      "Entity-based SEO stratégia",
      "AI Answer Engine optimalizálás",
      "Meta description és title generálás",
    ],
  },
  {
    id: "tartalomtervezo-ai-muhely",
    name: "Tartalomtervező AI Műhely",
    description:
      "Stratégiai tartalomtervezés és blog bejegyzés generálás. SEO-optimalizált cikkek és social media tartalom.",
    price: "39,000 Ft",
    route: "/portal/ai-muhely/tartalomtervezo-ai-muhely",
    category: "content",
    icon: "FileText",
    cycle: 179,
    features: [
      "SEO-optimalizált cikkek",
      "Social media tartalom",
      "Blog stratégia és naptár",
      "Kulcsszó kutatás és integráció",
    ],
  },
  {
    id: "ui-ux-ai-muhely",
    name: "UI/UX AI Műhely",
    description:
      "Felhasználói élmény és felület tervezés. Wireframe, mockup és interaktív prototípus generálás.",
    price: "59,000 Ft",
    route: "/portal/ai-muhely/ui-ux-ai-muhely",
    category: "design",
    icon: "Layout",
    cycle: 180,
    features: [
      "Wireframe és mockup generálás",
      "Interaktív prototípusok",
      "UX best practices alkalmazás",
      "Responsive design irányelvek",
    ],
  },
  {
    id: "szezonalis-ai-muhely",
    name: "Szezonalis AI Műhely",
    description:
      "Szezonalis kampányok és ünnepi tartalom generálás. Karácsony, Black Friday, Halloween és több ünnep.",
    price: "34,000 Ft",
    route: "/portal/ai-muhely/szezonalis-ai-muhely",
    category: "content",
    icon: "Calendar",
    cycle: 181,
    features: [
      "Szezonalis kampány tervek",
      "Ünnepi tartalom és copy",
      "Social media posztok",
      "Email marketing sablonok",
    ],
  },
  {
    id: "banner-ai-muhely",
    name: "Banner AI Műhely",
    description:
      "Konverziófókuszú banner tervezés. Platform-specifikus dimenziók, art direction és több variáció.",
    price: "29,000 Ft",
    route: "/portal/ai-muhely/banner-ai-muhely",
    category: "design",
    icon: "Monitor",
    cycle: 184,
    features: [
      "Platform-specifikus dimenziók",
      "Art direction és stílus",
      "Több variáció és A/B teszt",
      "Konverzió-optimalizált copy",
    ],
  },
  {
    id: "poster-ai-muhely",
    name: "Poster AI Műhely",
    description:
      "Nyomdai kész poster tervezés. CMYK értékek, tipográfiai hierarchia és bleed/safe zone irányelvek.",
    price: "39,000 Ft",
    route: "/portal/ai-muhely/poster-ai-muhely",
    category: "design",
    icon: "FileImage",
    cycle: 185,
    features: [
      "Nyomdai kész specifikációk",
      "CMYK értékek és tipográfia",
      "Bleed és safe zone irányelvek",
      "Print-ready export formátumok",
    ],
  },
  {
    id: "social-media-ai-muhely",
    name: "Social Media AI Műhely",
    description:
      "Multi-platform social media tartalom. Instagram, Facebook, LinkedIn, TikTok engagement-fókuszú copywriting.",
    price: "44,000 Ft",
    route: "/portal/ai-muhely/social-media-ai-muhely",
    category: "content",
    icon: "Share2",
    cycle: 186,
    features: [
      "Multi-platform támogatás",
      "Engagement-fókuszú copywriting",
      "Platform-specifikus irányelvek",
      "Hashtag stratégia és naptár",
    ],
  },
  {
    id: "cip-ai-muhely",
    name: "CIP AI Műhely",
    description:
      "Vállalati arculati elemek tervezés. Névjegykártya, levélpapír, arculati kézikönyv és nyomdai kész specifikációk.",
    price: "54,000 Ft",
    route: "/portal/ai-muhely/cip-ai-muhely",
    category: "branding",
    icon: "Briefcase",
    cycle: 187,
    features: [
      "Névjegykártya és levélpapír",
      "Arculati kézikönyv",
      "Nyomdai kész specifikációk",
      "CMYK értékek és irányelvek",
    ],
  },
  {
    id: "presentation-ai-muhely",
    name: "Presentation AI Műhely",
    description:
      "Pitch deck és prezentáció tervezés. Narratív struktúra, dia sablonok és vizuális hierarchia.",
    price: "49,000 Ft",
    route: "/portal/ai-muhely/presentation-ai-muhely",
    category: "content",
    icon: "Presentation",
    cycle: 188,
    features: [
      "Pitch deck narratív struktúra",
      "Sales és investor deck",
      "Dia sablonok és layout",
      "Vizuális hierarchia és tipográfia",
    ],
  },
  {
    id: "icon-design-ai-muhely",
    name: "Icon Design AI Műhely",
    description:
      "SVG vektor ikonok tervezése. Icon szettek 15 stílussal, minimalista szimbólumok és optimalizált útvonalak.",
    price: "34,000 Ft",
    route: "/portal/ai-muhely/icon-design-ai-muhely",
    category: "design",
    icon: "Icon",
    cycle: 189,
    features: [
      "SVG vektor ikonok",
      "Icon szettek 15 stílussal",
      "Minimalista szimbólumok",
      "Optimalizált SVG útvonalak",
    ],
  },
  {
    id: "design-system-ai-muhely",
    name: "Design System AI Műhely",
    description:
      "Design tokens és komponens könyvtár tervezés. Tailwind CSS v4 integráció, Zod validáció és skálázható rendszer.",
    price: "79,000 Ft",
    route: "/portal/ai-muhely/design-system-ai-muhely",
    category: "technical",
    icon: "Layers",
    cycle: 190,
    features: [
      "Design tokens és spacing",
      "Komponens könyvtár",
      "Tailwind CSS v4 integráció",
      "Zod validáció és dokumentáció",
    ],
  },
  {
    id: "kristofka-munkafolyamat",
    name: "Kristófka Munkafolyamat",
    description:
      "Strategist-Pro ingatlanbefektetői pitch generálás. PDF alaprajzokból és kontextus paraméterekből komplex prezentációk.",
    price: "149,000 Ft",
    route: "/portal/ai-muhely/kristofka",
    category: "workflow",
    icon: "Building2",
    cycle: 0,
    features: [
      "PDF alaprajz feldolgozás",
      "Kontextus paraméterek",
      "Ingatlanbefektetői pitch",
      "Strategist-Pro workflow",
    ],
    isPro: true,
  },
] as const;

export const getWorkshopById = (id: string): AiWorkshop | undefined => {
  return aiWorkshops.find((workshop) => workshop.id === id);
};

export const getWorkshopsByCategory = (
  category: AiWorkshop["category"]
): AiWorkshop[] => {
  return aiWorkshops.filter((workshop) => workshop.category === category);
};

export const getProWorkshops = (): AiWorkshop[] => {
  return aiWorkshops.filter((workshop) => workshop.isPro);
};
