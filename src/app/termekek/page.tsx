"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ShoppingBag,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const products = [
  {
    id: 1,
    name: "AI Workflow Starter Pack",
    category: "AI Automatizáció",
    price: 99000,
    originalPrice: 149000,
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
    icon: Zap,
    color: "from-[#f59e0b] to-orange-500",
    href: "/termekek/ai-workflow-starter-pack",
  },
  {
    id: 2,
    name: "SEO & AEO Audit Pro",
    category: "SEO Optimalizálás",
    price: 59000,
    originalPrice: 89000,
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
    icon: Shield,
    color: "from-blue-500 to-amber-500",
    href: "/termekek/seo-audit-pro",
  },
  {
    id: 3,
    name: "CRO Booster Kit",
    category: "Konverzió Optimalizálás",
    price: 79000,
    originalPrice: 119000,
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
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    href: "/termekek/cro-booster-kit",
  },
  {
    id: 4,
    name: "AI Chatbot Starter",
    category: "AI Megoldások",
    price: 129000,
    originalPrice: 179000,
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
    icon: ShoppingBag,
    color: "from-green-500 to-emerald-500",
    href: "/termekek/ai-chatbot-starter",
  },
  {
    id: 5,
    name: "Kristófka Munkafolyamat",
    category: "AI Műhely",
    price: 199000,
    originalPrice: 249000,
    rating: 4.9,
    reviews: 12,
    description:
      "Ingatlanbefektetői pitch generálás PDF alaprajzokból és kontextus paraméterekből. Strategist-Pro szintű AI workflow. 4.8x befektetői konverzió, 72% pitch idő megtakarítás, 500M+ Ft befektetés generáció.",
    features: [
      "4.8x befektetői konverzió",
      "72% pitch idő megtakarítás",
      "500M+ Ft befektetés generáció",
      "Strategist-Pro AI workflow",
    ],
    icon: Zap,
    color: "from-[#f59e0b] to-orange-500",
    href: "/termekek/kristofka-munkafolyamat",
  },
  {
    id: 6,
    name: "Banner AI Műhely",
    category: "AI Műhely",
    price: 29000,
    originalPrice: 79000,
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
    icon: Shield,
    color: "from-blue-500 to-amber-500",
    href: "/termekek/banner-ai-muhely",
  },
  {
    id: 7,
    name: "Logo AI Műhely",
    category: "AI Műhely",
    price: 39000,
    originalPrice: 99000,
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
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    href: "/termekek/logo-ai-muhely",
  },
  {
    id: 8,
    name: "Midjourney AI Műhely",
    category: "AI Műhely",
    price: 49000,
    originalPrice: 129000,
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
    icon: ShoppingBag,
    color: "from-green-500 to-emerald-500",
    href: "/termekek/midjourney-ai-muhely",
  },
  {
    id: 9,
    name: "SEO Audit AI Műhely",
    category: "AI Műhely",
    price: 69000,
    originalPrice: 109000,
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
    icon: Shield,
    color: "from-blue-500 to-amber-500",
    href: "/termekek/seo-audit-ai-muhely",
  },
  {
    id: 10,
    name: "Szezonalis AI Műhely",
    category: "AI Műhely",
    price: 39000,
    originalPrice: 69000,
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
    icon: Shield,
    color: "from-blue-500 to-amber-500",
    href: "/termekek/szezonalis-ai-muhely",
  },
  {
    id: 11,
    name: "Tartalomtervező AI Műhely",
    category: "AI Műhely",
    price: 59000,
    originalPrice: 89000,
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
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    href: "/termekek/tartalomtervezo-ai-muhely",
  },
  {
    id: 12,
    name: "UI/UX AI Műhely",
    category: "AI Műhely",
    price: 99000,
    originalPrice: 149000,
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
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    href: "/termekek/ui-ux-ai-muhely",
  },
  {
    id: 13,
    name: "Versenytárs Elemző AI Műhely",
    category: "AI Műhely",
    price: 79000,
    originalPrice: 119000,
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
    icon: ShoppingBag,
    color: "from-green-500 to-emerald-500",
    href: "/termekek/versenytares-elemzo-ai-muhely",
  },
];

const categories = [
  { name: "Összes", count: products.length },
  { name: "AI Automatizáció", count: 2 },
  { name: "SEO Optimalizálás", count: 1 },
  { name: "Konverzió Optimalizálás", count: 1 },
  { name: "AI Megoldások", count: 1 },
  { name: "AI Műhely", count: 9 },
];

export default function ProductsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      setUser(currentUser);
      // Check if user is admin (hello@webdude.hu)
      const isAdminUser = currentUser.email === "hello@webdude.hu";
      setIsAdmin(isAdminUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#f59e0b]" />
        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest animate-pulse font-bold">
          Betöltés...
        </p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center space-y-6 px-6">
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-2xl text-sm flex items-center gap-3 font-mono max-w-md text-center">
          <AlertCircle className="w-5 h-5" />
          Hozzáférés megtagadva. Csak a Superadmin férhet hozzá a termékekhez!
        </div>
        <Link
          href="/admin/login"
          className="px-6 py-3 rounded-xl bg-[#f59e0b] text-white font-bold hover:bg-[#f59e0b]/400 transition-colors"
        >
          Bejelentkezés
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-bg-surface">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20"
            >
              <ShoppingBag className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-[0.2em]">
                AI & Automatizáció
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight"
            >
              Prémium AI &{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#f59e0b]/400 to-[#d97706]">
                Automatizációs Megoldások
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-400 max-w-2xl mx-auto tracking-wide font-medium"
            >
              Kész, azonnal integrálható AI munkafolyamatok, prompt engineering
              és automatizációs megoldások vállalkozásoknak.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-slate-800 bg-bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.name}
                className="px-4 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-400 hover:border-[#f59e0b]/50 hover:text-[#f59e0b] transition-all text-sm font-medium shadow-[0_4px_12px_rgba(15,23,42,0.3)]"
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map((product, index) => {
              const ProductIcon = product.icon;
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden hover:border-[#f59e0b]/50 transition-all duration-300 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:shadow-[0_18px_40px_rgba(245,158,11,0.2)] hover:-translate-y-1"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#f59e0b]/10 to-[#d97706]/10 border border-[#f59e0b]/20 flex items-center justify-center group-hover:border-[#f59e0b]/50 transition-colors">
                        <ProductIcon className="w-7 h-7 text-[#f59e0b]" />
                      </div>
                      <div className="flex items-center gap-1 text-[#f59e0b]">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">
                          {product.rating}
                        </span>
                        <span className="text-slate-500 text-sm">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>

                    {/* Category */}
                    <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider mb-2 block">
                      {product.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-[#f59e0b] transition-colors">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-slate-400"
                        >
                          <CheckCircle className="w-4 h-4 text-[#f59e0b]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price - Removed, replaced with CTA */}
                    <div className="mb-6">
                      <p className="text-sm text-slate-400 mb-2">
                        Egyedi árazás a projekt igényei szerint
                      </p>
                    </div>

                    {/* CTA */}
                    <Link
                      href="/kapcsolat"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-linear-to-r from-[#f59e0b] to-[#d97706] text-white font-bold rounded-xl hover:shadow-[0_8px_24px_rgba(245,158,11,0.3)] transition-all group-hover:scale-[1.02]"
                    >
                      <span>Egyedi árajánlat kérése</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-slate-800 bg-bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Keresel egyedi megoldást?
          </h2>
          <p className="text-slate-400 mb-8">
            Egyedi AI workflow vagy digitális eszköz fejlesztése? Lépj
            kapcsolatba, és együtt találjuk meg a legjobb megoldást!
          </p>
          <Link
            href="/kapcsolat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#f59e0b] to-[#d97706] text-white font-bold rounded-xl hover:shadow-[0_8px_24px_rgba(245,158,11,0.3)] transition-all"
          >
            Kapcsolatfelvétel
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
