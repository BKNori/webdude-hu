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

export type ProductIconName = "zap" | "shield" | "sparkles" | "shopping-bag";

export interface CatalogProduct {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  iconName: ProductIconName;
  color: string;
  href: string;
}

export interface ProductCategory {
  name: string;
  count: number;
}

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
    <>
      {/* Category Filter */}
      <section className="py-8 border-b border-slate-200 dark:border-slate-800 bg-[#F1F5F9] dark:bg-bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const isActive = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setSelectedCategory(category.name)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 rounded-lg border transition-all text-sm font-medium cursor-pointer ${
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
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-[#F8FAFC] dark:bg-bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {visibleProducts.map((product, index) => {
              const ProductIcon = iconMap[product.iconName];
              return (
                <motion.div
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
                  className="group luminous-card rounded-2xl overflow-hidden"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#0369A1]/10 to-[#6D28D9]/10 dark:from-[#00B5F1]/10 dark:to-[#5B21B6]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/20 flex items-center justify-center group-hover:border-[#0369A1]/50 dark:group-hover:border-[#00B5F1]/50 transition-colors">
                        <ProductIcon className="w-7 h-7 text-[#0369A1] dark:text-[#00B5F1]" />
                      </div>
                      <div className="flex items-center gap-1 text-[#0369A1] dark:text-[#00B5F1]">
                        <Star className="w-4 h-4 fill-current" />
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

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-text-primary mb-3 group-hover:text-[#0369A1] dark:group-hover:text-[#00B5F1] transition-colors">
                      <Link href={product.href} className="hover:underline">
                        {product.name}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="text-[#334155] dark:text-slate-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-[#334155] dark:text-slate-400"
                        >
                          <CheckCircle className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price - Removed, replaced with CTA */}
                    <div className="mb-6">
                      <p className="text-sm text-[#475569] dark:text-slate-400 mb-2">
                        Egyedi árazás a projekt igényei szerint
                      </p>
                    </div>

                    {/* CTA */}
                    <Link
                      href="/kapcsolat"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold rounded-xl hover:shadow-[0_8px_24px_rgba(3,105,161,0.3)] transition-all group-hover:scale-[1.02]"
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
    </>
  );
}
