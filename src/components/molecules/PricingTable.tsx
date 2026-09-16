"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Button from "@/components/atoms/Button";

export interface PricingTier {
  id: string;
  name: string;
  price?: string | null;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  ctaLink: string;
}

interface PricingTableProps {
  tiers: PricingTier[];
  title?: string;
  description?: string;
  currency?: "Ft" | "€" | "$";
}

export default function PricingTable({
  tiers,
  title,
  description,
  currency = "Ft",
}: PricingTableProps) {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  return (
    <div className="w-full">
      {(title || description) && (
        <div className="text-center mb-16">
          {title && (
            <h2 className="text-4xl md:text-5xl font-serif font-black text-text-primary mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseEnter={() => setHoveredTier(tier.id)}
            onMouseLeave={() => setHoveredTier(null)}
            className={`
              relative rounded-3xl border p-8 transition-all duration-300
              ${
                tier.highlighted
                  ? "bg-linear-to-b from-sky-500/10 to-sky-500/5 border-sky-500/50 shadow-2xl shadow-sky-500/20 scale-105"
                  : "glass-card border border-white/5"
              }
              ${hoveredTier === tier.id ? "scale-[1.03] border-sky-500/30 shadow-2xl shadow-sky-500/5" : ""}
            `}
          >
            {tier.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="inline-flex items-center rounded-full bg-sky-500 text-[bg-transparent] px-6 py-2 text-sm font-bold">
                  Népszerű
                </div>
              </div>
            )}

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                {tier.name}
              </h3>
              <p className="text-sm text-slate-400 mb-6">{tier.description}</p>
              {tier.price ? (
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-black text-brand-primary">
                    {tier.price}
                  </span>
                  <span className="text-lg text-slate-400">{currency}</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-brand-primary">
                    Kérjen árajánlatot
                  </span>
                </div>
              )}
            </div>

            <ul className="space-y-4 mb-8">
              {tier.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center mt-0.5">
                    <svg
                      className="w-4 h-4 text-sky-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-300 leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              href={tier.ctaLink}
              className={tier.highlighted ? "w-full" : "w-full"}
              variant={tier.highlighted ? "primary" : "secondary"}
            >
              {tier.ctaText}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
