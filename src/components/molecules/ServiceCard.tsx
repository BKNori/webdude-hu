"use client";
import React from "react";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import LucideIcon from "@/components/atoms/LucideIcon";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  icon?: string;
  description: string;
  tags?: string[];
  index?: number;
  href?: string;
}

export default function ServiceCard({
  title,
  icon,
  description,
  tags = [],
  index = 0,
  href,
}: ServiceCardProps) {
  const shouldReduceMotion = useHydratedReducedMotion();

  const cardContent = (
    <div className="bg-white dark:bg-[#0F172A]/80 backdrop-blur-xl border border-slate-200/90 dark:border-white/10 dark:border-t-white/20 rounded-3xl p-8 h-full flex flex-col shadow-[0_12px_32px_-8px_rgba(15,23,42,0.08)] dark:shadow-[0_12px_36px_rgba(2,6,23,0.35)] hover:border-[#0369A1]/40 dark:hover:border-brand-primary/50 hover:shadow-[0_20px_40px_-12px_rgba(3,105,161,0.14)] dark:hover:shadow-[0_18px_44px_rgba(0,181,241,0.18)] hover:-translate-y-1 transition-[border-color,box-shadow,transform] duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-[#00B5F1]/12 border border-sky-200/80 dark:border-[#00B5F1]/25 flex items-center justify-center group-hover:border-[#0369A1]/50 dark:group-hover:border-brand-primary/50 transition-colors shrink-0">
          {icon && (
            <LucideIcon
              name={icon}
              className="w-6 h-6 text-[#0369A1] dark:text-[#00B5F1]"
            />
          )}
        </div>
        <h3 className="text-[#0F172A] dark:text-white text-xl md:text-2xl tracking-wider">
          {title}
        </h3>
      </div>

      <p className="text-[#334155] dark:text-slate-300 text-sm leading-relaxed flex-1">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="text-xs font-semibold text-[#0369A1] dark:text-[#00B5F1] border border-sky-200 dark:border-white/10 bg-sky-50 dark:bg-[#0B1120]/60 px-3 py-1 rounded-full group-hover:border-[#0369A1]/40 dark:group-hover:border-brand-primary/40 transition-colors tabular-nums"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: (index || 0) * 0.06,
            }
      }
      className="relative group h-full"
    >
      <div className="absolute inset-0 bg-[#0369A1]/5 dark:bg-[#00B5F1]/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 -z-10" />

      {href ? (
        <Link href={href} className="block h-full">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </motion.div>
  );
}
