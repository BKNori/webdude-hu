"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import Button from "@/components/atoms/Button";

export interface PricingTier {
  id: string;
  name: string;
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
}

export default function PricingTable({
  tiers,
  title,
  description,
}: PricingTableProps) {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const shouldReduceMotion = useHydratedReducedMotion();

  return (
    <div className="w-full">
      {(title || description) && (
        <div className="text-center mb-16">
          {title && (
            <h2 className="text-4xl md:text-5xl font-heading text-[#0F172A] dark:text-white mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-[#475569] dark:text-slate-300 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.id}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: index * 0.08,
                  }
            }
            onMouseEnter={() => setHoveredTier(tier.id)}
            onMouseLeave={() => setHoveredTier(null)}
            className={`
              relative rounded-3xl p-8 flex flex-col justify-between transition-[transform,box-shadow,border-color] duration-300
              ${
                tier.highlighted
                  ? "bg-linear-to-b from-white to-sky-50/70 dark:from-[#0F172A] dark:to-[#0B1120] border-2 border-[#0369A1] dark:border-[#00B5F1]/60 shadow-[0_20px_48px_-12px_rgba(3,105,161,0.18)] dark:shadow-[0_20px_50px_rgba(0,181,241,0.18)] lg:scale-105"
                  : "luminous-card"
              }
              ${hoveredTier === tier.id ? "scale-[1.02] border-[#0369A1]/60 dark:border-[#00B5F1]/50" : ""}
            `}
          >
            {tier.highlighted && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <div className="eyebrow-badge inline-flex items-center rounded-full bg-linear-to-r from-[#075985] to-[#5B21B6] text-white px-5 py-1.5 shadow-[0_6px_20px_rgba(7,89,133,0.4)]">
                  Népszerű
                </div>
              </div>
            )}

            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl text-[#0F172A] dark:text-white mb-2 tracking-wider">
                  {tier.name}
                </h3>
                <p className="text-sm text-[#475569] dark:text-slate-300 mb-6">
                  {tier.description}
                </p>
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#0369A1] dark:text-[#00B5F1]">
                    Egyedi árajánlat kérése
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-sky-50 dark:bg-[#00B5F1]/15 border border-sky-200 dark:border-[#00B5F1]/30 flex items-center justify-center mt-0.5">
                      <svg
                        className="w-3.5 h-3.5 text-[#0369A1] dark:text-[#00B5F1]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-[#334155] dark:text-slate-200 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              href={tier.ctaLink}
              className="w-full"
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
