/**
 * Publikus `/termekek` katalógus — Single Source of Truth (SSOT).
 *
 * Szabályok:
 * - Minden `href` egy valóban létező `src/app/termekek/<slug>/page.tsx` oldalra mutat.
 * - Zéró Fix Ár: nincs Ft, HUF, EUR, €, $, price vagy priceRange.
 * - Országos pozicionálás: nincs látható lokális ("Kecskemét") kulcsszó.
 * - Ugyanezt a tömböt használja a kártyarács UI, az `ItemList` JSON-LD és a `sitemap.ts`.
 */

export type ProductIconName = "zap" | "shield" | "sparkles" | "shopping-bag";

export interface CatalogProduct {
  id: number;
  slug: string;
  name: string;
  category:
    | "AI Automatizáció"
    | "SEO Optimalizálás"
    | "Konverzió Optimalizálás"
    | "AI Megoldások"
    | "AI Műhely";
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  iconName: ProductIconName;
  color: string;
  href: `/termekek/${string}`;
}

export interface ProductCategory {
  name: string;
  count: number;
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 1,
    slug: "ai-muhely",
    name: "AI Műhely Katalógus",
    category: "AI Műhely",
    rating: 4.9,
    reviews: 31,
    description:
      "Ötpilléres prémium AI tervezőműhely online grafikához, nyomdai prepresshez, ruha- és merch gyártáshoz, szoftver-architektúrához és SEO/AEO elemzéshez.",
    features: [
      "5 szakmai pillér egyetlen stúdióban",
      "Pro Prompt Stúdiók és szakértői generátorok",
      "Ügyfélportálon jogosultsággal elérhető modulok",
      "26 év grafikai + 16 év fejlesztői alapokon",
    ],
    iconName: "sparkles",
    color: "from-[#00B5F1] to-[#5B21B6]",
    href: "/termekek/ai-muhely",
  },
  {
    id: 2,
    slug: "ai-workflow-starter-pack",
    name: "AI Workflow Starter Pack",
    category: "AI Automatizáció",
    rating: 4.9,
    reviews: 23,
    description:
      "Spórolj heti 15 órát manuális munkával. Automatizáld az email kampányokat, a lead-generálást és az ügyfélszolgálatot testreszabható AI munkafolyamatokkal.",
    features: [
      "Heti 15 óra adminisztráció-megtakarítás",
      "3.4x organikus elérés támogatás",
      "300 DPI nyomdakész grafikai kimenetek",
      "1 év folyamatos sablonfrissítés",
    ],
    iconName: "zap",
    color: "from-[#00B5F1] to-brand-secondary",
    href: "/termekek/ai-workflow-starter-pack",
  },
  {
    id: 3,
    slug: "seo-audit-pro",
    name: "SEO & AEO Audit Pro",
    category: "SEO Optimalizálás",
    rating: 4.8,
    reviews: 47,
    description:
      "Teljes körű technikai SEO és AEO audit Core Web Vitals méréssel, kulcsszó-stratégiával, Schema.org tudásgráffal és AI válaszmotor optimalizálással.",
    features: [
      "2.5x organikus forgalomnövekedési cél",
      "95+ Lighthouse teljesítményfókusz",
      "AI válaszmotor (ChatGPT, Perplexity) láthatóság",
      "Schema.org JSON-LD implementációs terv",
    ],
    iconName: "shield",
    color: "from-blue-500 to-sky-500",
    href: "/termekek/seo-audit-pro",
  },
  {
    id: 4,
    slug: "cro-booster-kit",
    name: "CRO Booster Kit",
    category: "Konverzió Optimalizálás",
    rating: 4.7,
    reviews: 31,
    description:
      "Növeld a weboldalad konverziós rátáját adatvezérelt A/B teszteléssel, hőtérképes viselkedéselemzéssel és súrlódásmentes ügyfélút-optimalizációval.",
    features: [
      "2.8x hirdetési megtérülés (ROI) fókusz",
      "45% visszafordulási arány csökkentés",
      "Ügyfélút és konverziós tölcsér finomhangolás",
      "Kész A/B tesztelési keretrendszer",
    ],
    iconName: "sparkles",
    color: "from-purple-500 to-violet-600",
    href: "/termekek/cro-booster-kit",
  },
  {
    id: 5,
    slug: "ai-chatbot-starter",
    name: "AI Chatbot Starter",
    category: "AI Megoldások",
    rating: 4.9,
    reviews: 18,
    description:
      "Saját céges tudásbázisra tanított, magyar nyelvű 24/7 AI ügyfélszolgálati és lead-minősítő asszisztens Next.js és WordPress weboldalakra.",
    features: [
      "85% ügyfélszolgálati tehermentesítés",
      "3.2x gyorsabb válaszidő és elégedettség",
      "Természetes magyar nyelvű válaszok",
      "Gyors beillesztés meglévő weboldalba",
    ],
    iconName: "shopping-bag",
    color: "from-sky-500 to-indigo-500",
    href: "/termekek/ai-chatbot-starter",
  },
  {
    id: 6,
    slug: "kristofka-munkafolyamat",
    name: "Kristófka Munkafolyamat",
    category: "AI Műhely",
    rating: 4.9,
    reviews: 12,
    description:
      "Ingatlanbefektetői pitch generálás PDF alaprajzokból és kontextus-paraméterekből. Többágenses Strategist-Pro AI workflow mért ügyfél-eredményekkel.",
    features: [
      "4.8x befektetői konverzió támogatás",
      "72% pitch-előkészítési időmegtakarítás",
      "Mért ügyfél-eredmény (ROI) validáció",
      "Strategist-Pro többágenses AI pipeline",
    ],
    iconName: "zap",
    color: "from-[#00B5F1] to-brand-secondary",
    href: "/termekek/kristofka-munkafolyamat",
  },
  {
    id: 7,
    slug: "logo-ai-muhely",
    name: "Logo AI Műhely",
    category: "AI Műhely",
    rating: 4.9,
    reviews: 21,
    description:
      "Egyedi arculattervezés és logó-koncepció generálás Midjourney v6 Master promptokkal, vektoros kidolgozáshoz és 300 DPI nyomdakész kivitelhez.",
    features: [
      "4.5x erősebb márkafelismerhetőség",
      "89% vizuális arculati konzisztencia",
      "300 DPI nyomdakész irányelvek",
      "Midjourney v6 Master prompt sablonok",
    ],
    iconName: "sparkles",
    color: "from-purple-500 to-violet-600",
    href: "/termekek/logo-ai-muhely",
  },
  {
    id: 8,
    slug: "banner-ai-muhely",
    name: "Banner AI Műhely",
    category: "AI Műhely",
    rating: 4.8,
    reviews: 15,
    description:
      "Konverziófókuszú webes és social kampánybanner tervezés Midjourney v6 Master promptokkal, 90/8/2 Kék-Lila színhierarchiával és 4K kimenettel.",
    features: [
      "3.2x magasabb átkattintási arány (CTR)",
      "Copy-space és képarány kontroll (16:9, 1:1, 9:16)",
      "4K felbontású kampánykreatív alapok",
      "Midjourney v6 Master promptok",
    ],
    iconName: "shield",
    color: "from-blue-500 to-sky-500",
    href: "/termekek/banner-ai-muhely",
  },
  {
    id: 9,
    slug: "midjourney-ai-muhely",
    name: "Midjourney AI Műhely",
    category: "AI Műhely",
    rating: 4.8,
    reviews: 28,
    description:
      "Midjourney v6 prompt-rendszer fotórealisztikus termékfotókhoz és márkavizuálokhoz 85mm G-Master optikával és chiaroscuro fényeléssel.",
    features: [
      "Stock-mentes, egyedi kampányvizuálok",
      "85mm G-Master optikai paraméterezés",
      "8K részletgazdag felbontási profilok",
      "Chiaroscuro és stúdiófény kontroll",
    ],
    iconName: "shopping-bag",
    color: "from-indigo-500 to-blue-500",
    href: "/termekek/midjourney-ai-muhely",
  },
  {
    id: 10,
    slug: "seo-audit-ai-muhely",
    name: "SEO Audit AI Műhely",
    category: "AI Műhely",
    rating: 4.7,
    reviews: 19,
    description:
      "Technikai SEO, Core Web Vitals és AEO/GEO diagnosztikai prompt-tervező Lighthouse teljesítménykövetéssel és entitás-alapú kulcsszó-stratégiával.",
    features: [
      "Priorizált P0–P3 technikai SEO fókusz",
      "Core Web Vitals (LCP, CLS, INP) szempontok",
      "Kulcsszó- és keresési szándék elemzés",
      "AI válaszmotor idézhetőség (AEO/GEO)",
    ],
    iconName: "shield",
    color: "from-blue-500 to-sky-500",
    href: "/termekek/seo-audit-ai-muhely",
  },
  {
    id: 11,
    slug: "szezonalis-ai-muhely",
    name: "Szezonális AI Műhely",
    category: "AI Műhely",
    rating: 4.6,
    reviews: 14,
    description:
      "Szezonális marketingkampányok tervezése AI eszközökkel: Karácsony, Black Friday, tavaszi és nyári kampányvizuálok Midjourney v6 Master promptokkal.",
    features: [
      "4.2x szezonális kampánykonverzió fókusz",
      "78% rövidebb kampány-előkészítési idő",
      "4K felbontású ünnepi kreatívok",
      "Egységes márkaesztétika minden szezonban",
    ],
    iconName: "shield",
    color: "from-sky-500 to-violet-600",
    href: "/termekek/szezonalis-ai-muhely",
  },
  {
    id: 12,
    slug: "tartalomtervezo-ai-muhely",
    name: "Tartalomtervező AI Műhely",
    category: "AI Műhely",
    rating: 4.8,
    reviews: 22,
    description:
      "Stratégiai tartalomtervezés AI támogatással: SEO- és AEO-optimalizált blogposztok, értékesítési landing oldalak és social media tartalmak előkészítése.",
    features: [
      "3.6x gyorsabb tartalomgyártási folyamat",
      "82% szövegírási időmegtakarítás",
      "SEO- és AEO-barát H2–H3 struktúra",
      "Egységes, klisémentes szakmai márkahang",
    ],
    iconName: "sparkles",
    color: "from-purple-500 to-violet-600",
    href: "/termekek/tartalomtervezo-ai-muhely",
  },
  {
    id: 13,
    slug: "ui-ux-ai-muhely",
    name: "UI/UX AI Műhely",
    category: "AI Műhely",
    rating: 4.9,
    reviews: 17,
    description:
      "Konverziófókuszú UI/UX és wireframe tervezés AI eszközökkel: reszponzív felületi koncepciók, WCAG AA kontraszt és Figma-kompatibilis felépítés.",
    features: [
      "4.1x jobb felületi konverziós fókusz",
      "73% gyorsabb wireframe prototípus-tervezés",
      "Figma-kompatibilis komponens-hierarchia",
      "Mobile First és WCAG AA ergonómia",
    ],
    iconName: "sparkles",
    color: "from-violet-600 to-[#00B5F1]",
    href: "/termekek/ui-ux-ai-muhely",
  },
  {
    id: 14,
    slug: "versenytars-elemzo-ai-muhely",
    name: "Versenytárs Elemző AI Műhely",
    category: "AI Műhely",
    rating: 4.7,
    reviews: 16,
    description:
      "Versenytárs vizuális, UX és CRO benchmarking AI eszközökkel: értékajánlat-összevetés, design audit, piaci rés-elemzés és pozicionálási stratégia.",
    features: [
      "3.9x gyorsabb piaci helyzetkép",
      "67% piacelemzési időmegtakarítás",
      "CTA- és értékajánlat-összehasonlítás",
      "Akcióképes UX és CRO javítási pontok",
    ],
    iconName: "shopping-bag",
    color: "from-indigo-500 to-sky-500",
    href: "/termekek/versenytars-elemzo-ai-muhely",
  },
];

const CATEGORY_NAMES: Array<CatalogProduct["category"]> = [
  "AI Műhely",
  "AI Automatizáció",
  "SEO Optimalizálás",
  "Konverzió Optimalizálás",
  "AI Megoldások",
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { name: "Összes", count: CATALOG_PRODUCTS.length },
  ...CATEGORY_NAMES.map((name) => ({
    name,
    count: CATALOG_PRODUCTS.filter((p) => p.category === name).length,
  })),
];
