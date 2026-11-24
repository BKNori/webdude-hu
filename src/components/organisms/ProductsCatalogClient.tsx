"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import type {
  CatalogProduct,
  ProductCategory,
  ProductIconName,
} from "@/data/products-catalog";

export type { CatalogProduct, ProductCategory, ProductIconName };

interface ProductsCatalogClientProps {
  products: CatalogProduct[];
  categories: ProductCategory[];
}

const iconMap = {
  zap: Zap,
  shield: Shield,
  sparkles: Sparkles,
  "shopping-bag": ShoppingBag,
} as const;

export default function ProductsCatalogClient({
  products,
  categories,
}: ProductsCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("Összes");
  const shouldReduceMotion = useHydratedReducedMotion();

  const visibleProducts =
    selectedCategory === "Összes"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section
      aria-labelledby="termekek-katalogus-heading"
      className="bg-[#F8FAFC] dark:bg-bg-surface"
    >
      {/* Category Filter + H2 Heading */}
      <div className="py-10 border-y border-slate-200 dark:border-slate-800 bg-[#F1F5F9] dark:bg-bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            id="termekek-katalogus-heading"
            className="text-3xl md:text-4xl text-[#0F172A] dark:text-white text-center mb-6 tracking-tight"
          >
            Termékek és AI Műhely Modulok
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const isActive = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setSelectedCategory(category.name)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 rounded-lg border transition-all text-sm font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                    isActive
                      ? "bg-[#0369A1] dark:bg-[#00B5F1] border-[#0369A1] dark:border-[#00B5F1] text-white dark:text-slate-950 font-semibold shadow-sm"
                      : "bg-white dark:bg-slate-900/80 border-slate-300 dark:border-slate-700 text-[#334155] dark:text-slate-400 hover:border-[#0369A1]/50 dark:hover:border-[#00B5F1]/50 hover:text-[#0369A1] dark:hover:text-[#00B5F1] shadow-[0_4px_12px_rgba(15,23,42,0.06)] dark:shadow-[0_4px_12px_rgba(15,23,42,0.3)]"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {visibleProducts.map((product, index) => {
              const ProductIcon = iconMap[product.iconName];
              const ctaLabel =
                product.category === "AI Műhely"
                  ? "Részletek és AI Műhely"
                  : "Termék megtekintése";

              return (
                <motion.article
                  key={product.id}
                  initial={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                          delay: Math.min(index, 5) * 0.06,
                        }
                  }
                  className="group luminous-card rounded-3xl overflow-hidden flex flex-col"
                >
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <Link
                        href={product.href}
                        aria-label={`${product.name} megnyitása`}
                        className="w-14 h-14 rounded-xl bg-linear-to-br from-[#0369A1]/10 to-[#6D28D9]/10 dark:from-[#00B5F1]/10 dark:to-[#5B21B6]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/20 flex items-center justify-center group-hover:border-[#0369A1]/50 dark:group-hover:border-[#00B5F1]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                      >
                        <ProductIcon className="w-7 h-7 text-[#0369A1] dark:text-[#00B5F1]" />
                      </Link>
                      <div className="flex items-center gap-1 text-[#0369A1] dark:text-[#00B5F1]">
                        <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                        <span className="text-sm font-medium">
                          {product.rating}
                        </span>
                        <span className="text-[#475569] dark:text-slate-400 text-sm">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>

                    {/* Category */}
                    <span className="text-xs font-bold text-[#0369A1] dark:text-[#00B5F1] uppercase tracking-wider mb-2 block">
                      {product.category}
                    </span>

                    {/* Title (H3 -> saját termékoldal) */}
                    <h3 className="text-2xl text-[#0F172A] dark:text-white mb-3 group-hover:text-[#0369A1] dark:group-hover:text-[#00B5F1] transition-colors">
                      <Link
                        href={product.href}
                        className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
                      >
                        {product.name}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="text-[#334155] dark:text-slate-300 text-sm mb-5 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6 flex-1">
                      {product.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-[#334155] dark:text-slate-300"
                        >
                          <CheckCircle
                            className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1] shrink-0"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Egyedi árazás megjegyzés (Zéró Fix Ár) */}
                    <p className="text-xs text-[#475569] dark:text-slate-400 mb-4">
                      Egyedi árazás és jogosultság a projekted igényei szerint
                    </p>

                    {/* Elsődleges CTA -> SAJÁT TERMÉKOLDAL (/termekek/<slug>) */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <Link
                        href={product.href}
                        className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold rounded-full uppercase tracking-wider text-xs hover:shadow-[0_8px_24px_rgba(3,105,161,0.3)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                      >
                        <span>{ctaLabel}</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                      <Link
                        href="/kapcsolat"
                        className="inline-flex items-center justify-center py-3.5 px-4 rounded-full border border-slate-300 dark:border-slate-700 hover:border-[#0369A1] dark:hover:border-[#00B5F1] text-[#334155] dark:text-slate-300 hover:text-[#0369A1] dark:hover:text-[#00B5F1] font-semibold uppercase tracking-wider text-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                      >
                        Árajánlat
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
