import Link from "next/link";
import DirectAnswerBlock from "@/components/molecules/DirectAnswerBlock";
import ProductsCatalogClient, {
  type CatalogProduct,
  type ProductCategory,
} from "@/components/organisms/ProductsCatalogClient";
import { ShoppingBag, ArrowRight } from "lucide-react";

const products: CatalogProduct[] = [
  {
    id: 1,
    name: "AI Workflow Starter Pack",
    category: "AI Automatizáció",
    rating: 4.9,
    reviews: 23,
    description:
      "Spórolj heti 15 órát manuális munkával. Automatizáld email kampányokat, lead generálást és ügyfélszolgálatot kész AI workflow sablonokkal. 3.4x organikus elérés, 300 DPI nyomdakész outputok.",
    features: [
      "Heti 15 óra megtakarítás",
      "3.4x organikus elérés",
      "300 DPI nyomdakész outputok",
      "1 év ingyenes frissítés",
    ],
    iconName: "zap",
    color: "from-[#00B5F1] to-brand-secondary",
    href: "/termekek/ai-workflow-starter-pack",
  },
  {
    id: 2,
    name: "SEO & AEO Audit Pro",
    category: "SEO Optimalizálás",
    rating: 4.8,
    reviews: 47,
    description:
      "Dupláld meg a Google találati helyezésedet. Teljeskörű SEO és AEO audit technikai elemzéssel, kulcsszó stratégiával és AI válasz motor optimalizálással. 2.5x organikus forgalom, 89% Lighthouse score.",
    features: [
      "2.5x organikus forgalom",
      "89% Lighthouse score",
      "AI válasz motor optimalizáció",
      "Schema.org JSON-LD implementáció",
    ],
    iconName: "shield",
    color: "from-blue-500 to-sky-500",
    href: "/termekek/seo-audit-pro",
  },
  {
    id: 3,
    name: "CRO Booster Kit",
    category: "Konverzió Optimalizálás",
    rating: 4.7,
    reviews: 31,
    description:
      "Dupláld meg a konverziós rátád 30 nap alatt. A/B tesztelés, heatmap elemzés és user journey optimalizáció kész eszközökkel. 2.8x hirdetési ROI, 45% bounce rate csökkenés.",
    features: [
      "2.8x hirdetési ROI",
      "45% bounce rate csökkenés",
      "30 nap alatt dupla konverzió",
      "Kész A/B teszt sablonok",
    ],
    iconName: "sparkles",
    color: "from-purple-500 to-pink-500",
    href: "/termekek/cro-booster-kit",
  },
  {
    id: 4,
    name: "AI Chatbot Starter",
    category: "AI Megoldások",
    rating: 4.9,
    reviews: 18,
    description:
      "Válaszolj azonnal minden ügyfélkérésre 24/7. Magyar nyelvű AI chatbot rendszer, amely azonnal integrálható bármilyen weboldalra. 85% support költség csökkenés, 3.2x ügyfél elégedettség.",
    features: [
      "85% support költség csökkenés",
      "3.2x ügyfél elégedettség",
      "Magyar nyelvű AI válaszok",
      "5 perc alatt integrálható",
    ],
    iconName: "shopping-bag",
    color: "from-green-500 to-emerald-500",
    href: "/termekek/ai-chatbot-starter",
  },
  {
    id: 5,
    name: "Kristófka Munkafolyamat",
    category: "AI Műhely",
    rating: 4.9,
    reviews: 12,
    description:
      "Ingatlanbefektetői pitch generálás PDF alaprajzokból és kontextus paraméterekből. Strategist-Pro szintű AI workflow. 4.8x befektetői konverzió, 72% pitch idő megtakarítás, 500M+ Ft befektetés generáció.",
    features: [
      "4.8x befektetői konverzió",
      "72% pitch idő megtakarítás",
      "500M+ Ft generált befektetés — mért ügyfél-eredmény (ROI)",
      "Strategist-Pro AI workflow",
    ],
    iconName: "zap",
    color: "from-[#00B5F1] to-brand-secondary",
    href: "/termekek/kristofka-munkafolyamat",
  },
  {
    id: 6,
    name: "Banner AI Műhely",
    category: "AI Műhely",
    rating: 4.8,
    reviews: 15,
    description:
      "Konverziófókuszú banner tervezés Midjourney v6 Master promptokkal. 90/8/2 színarány és prémium optikai beállítások. 3.2x CTR növekedés, 67% kattintási konverzió, 4K felbontású outputok.",
    features: [
      "3.2x CTR növekedés",
      "67% kattintási konverzió",
      "4K felbontású outputok",
      "Midjourney v6 Master promptok",
    ],
    iconName: "shield",
    color: "from-blue-500 to-sky-500",
    href: "/termekek/banner-ai-muhely",
  },
  {
    id: 7,
    name: "Logo AI Műhely",
    category: "AI Műhely",
    rating: 4.9,
    reviews: 21,
    description:
      "Egyedi arculattervezés és logo generálás Midjourney v6 Master promptokkal. Prémium vizuális identitás kialakítása. 4.5x brand felismerés, 89% design konzisztencia, 300 DPI nyomdakész outputok.",
    features: [
      "4.5x brand felismerés",
      "89% design konzisztencia",
      "300 DPI nyomdakész outputok",
      "Midjourney v6 Master promptok",
    ],
    iconName: "sparkles",
    color: "from-purple-500 to-pink-500",
    href: "/termekek/logo-ai-muhely",
  },
  {
    id: 8,
    name: "Midjourney AI Műhely",
    category: "AI Műhely",
    rating: 4.8,
    reviews: 28,
    description:
      "Midjourney v6 integráció prémium vizuálokhoz. 85mm G-Master optika, chiaroscuro lighting és Cyber-Dark aesthetic. 5.2x vizuális minőség, 94% social engagement, 8K felbontású outputok.",
    features: [
      "5.2x vizuális minőség",
      "94% social engagement",
      "8K felbontású outputok",
      "85mm G-Master optika",
    ],
    iconName: "shopping-bag",
    color: "from-green-500 to-emerald-500",
    href: "/termekek/midjourney-ai-muhely",
  },
  {
    id: 9,
    name: "SEO Audit AI Műhely",
    category: "AI Műhely",
    rating: 4.7,
    reviews: 19,
    description:
      "SEO és AEO audit vizualizáció AI eszközökkel. Lighthouse score tracking, kulcsszó stratégia és AI válasz motor optimalizáció. 3.8x SEO hatékonyság, 92% technikai score, 24/7 monitoring.",
    features: [
      "3.8x SEO hatékonyság",
      "92% technikai score",
      "24/7 monitoring",
      "AI válasz motor optimalizáció",
    ],
    iconName: "shield",
    color: "from-blue-500 to-sky-500",
    href: "/termekek/seo-audit-ai-muhely",
  },
  {
    id: 10,
    name: "Szezonalis AI Műhely",
    category: "AI Műhely",
    rating: 4.6,
    reviews: 14,
    description:
      "Szezonalis grafikai kampányok AI eszközökkel. Ünnepi és szezonális vizuálok generálása Midjourney v6 Master promptokkal. 4.2x szezonális konverzió, 78% kampány idő megtakarítás, 4K felbontású outputok.",
    features: [
      "4.2x szezonális konverzió",
      "78% kampány idő megtakarítás",
      "4K felbontású outputok",
      "Midjourney v6 Master promptok",
    ],
    iconName: "shield",
    color: "from-blue-500 to-sky-500",
    href: "/termekek/szezonalis-ai-muhely",
  },
  {
    id: 11,
    name: "Tartalomtervező AI Műhely",
    category: "AI Műhely",
    rating: 4.8,
    reviews: 22,
    description:
      "Tartalom és vizuális tervezés AI eszközökkel. Blog posztok, social media tartalmak és vizuálok generálása. 3.6x tartalom hatékonyság, 82% írási idő megtakarítás, SEO-optimalizált outputok.",
    features: [
      "3.6x tartalom hatékonyság",
      "82% írási idő megtakarítás",
      "SEO-optimalizált outputok",
      "Social media tartalmak",
    ],
    iconName: "sparkles",
    color: "from-purple-500 to-pink-500",
    href: "/termekek/tartalomtervezo-ai-muhely",
  },
  {
    id: 12,
    name: "UI/UX AI Műhely",
    category: "AI Műhely",
    rating: 4.9,
    reviews: 17,
    description:
      "UI/UX tervezés AI eszközökkel. Felhasználói élmény optimalizálás és vizuális tervezés. 4.1x UX konverzió, 73% design idő megtakarítás, Figma kompatibilis outputok.",
    features: [
      "4.1x UX konverzió",
      "73% design idő megtakarítás",
      "Figma kompatibilis outputok",
      "Felhasználói élmény optimalizálás",
    ],
    iconName: "sparkles",
    color: "from-purple-500 to-pink-500",
    href: "/termekek/ui-ux-ai-muhely",
  },
  {
    id: 13,
    name: "Versenytárs Elemző AI Műhely",
    category: "AI Műhely",
    rating: 4.7,
    reviews: 16,
    description:
      "Versenytárs vizuális elemzés AI eszközökkel. Design audit, trend elemzés és versenytárs stratégia kialakítás. 3.9x versenyelő előny, 67% piac elemzés idő megtakarítás, stratégiai insightok.",
    features: [
      "3.9x versenyelő előny",
      "67% piac elemzés idő megtakarítás",
      "Stratégiai insightok",
      "Design audit és trend elemzés",
    ],
    iconName: "shopping-bag",
    color: "from-green-500 to-emerald-500",
    href: "/termekek/versenytars-elemzo-ai-muhely",
  },
];

const categories: ProductCategory[] = [
  { name: "Összes", count: products.length },
  {
    name: "AI Automatizáció",
    count: products.filter((p) => p.category === "AI Automatizáció").length,
  },
  {
    name: "SEO Optimalizálás",
    count: products.filter((p) => p.category === "SEO Optimalizálás").length,
  },
  {
    name: "Konverzió Optimalizálás",
    count: products.filter((p) => p.category === "Konverzió Optimalizálás")
      .length,
  },
  {
    name: "AI Megoldások",
    count: products.filter((p) => p.category === "AI Megoldások").length,
  },
  {
    name: "AI Műhely",
    count: products.filter((p) => p.category === "AI Műhely").length,
  },
];

export default function ProductsPage() {
  // A /termekek katalógus 100% nyilvános Server Component konverziós landing oldal —
  // a hozzáférés-ellenőrzés a generátoroknál (allowedTools) történik.
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-[#F8FAFC] dark:bg-bg-surface">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/20">
              <ShoppingBag className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
              <span className="text-xs font-bold text-[#0369A1] dark:text-[#00B5F1] uppercase tracking-[0.2em]">
                AI & Automatizáció
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] dark:text-text-primary tracking-tight">
              Prémium AI &{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
                Automatizációs Megoldások
              </span>
            </h1>
            <p className="text-lg text-[#334155] dark:text-slate-400 max-w-2xl mx-auto tracking-wide font-medium">
              Kész, azonnal integrálható AI munkafolyamatok, prompt engineering
              és automatizációs megoldások vállalkozásoknak.
            </p>
          </div>
        </div>
      </section>

      {/* AEO Direct Answer blokk — a Hero alá */}
      <DirectAnswerBlock
        id="termekek-direct-answer"
        question="Milyen prémium AI & automatizációs megoldások kínál a WebDude, kinek és milyen eredménnyel?"
        answer="Prémium AI munkafolyamatok, prompt engineering, CRO eszközök és AI műhely sablonok KKV-knak az automatizáció skálázására és a lead-generálásra. 26 év grafikai és 16 év webfejlesztői tapasztalat, egyedi árajánlat kérése."
      />

      {/* Interaktív szűrő és kártyarács (Client leaf komponens) */}
      <ProductsCatalogClient products={products} categories={categories} />

      {/* CTA Section */}
      <section className="py-16 border-t border-slate-200 dark:border-slate-800 bg-[#F1F5F9] dark:bg-bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#0F172A] dark:text-text-primary mb-4">
            Keresel egyedi megoldást?
          </h2>
          <p className="text-[#334155] dark:text-slate-400 mb-8">
            Egyedi AI workflow vagy digitális eszköz fejlesztése? Lépj
            kapcsolatba, és együtt találjuk meg a legjobb megoldást!
          </p>
          <Link
            href="/kapcsolat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold rounded-xl hover:shadow-[0_8px_24px_rgba(3,105,161,0.3)] transition-all"
          >
            Kapcsolatfelvétel
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
