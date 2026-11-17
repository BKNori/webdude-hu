"use client";

import { motion, useReducedMotion } from "motion/react";
import ScrollVideoHero from "@/components/organisms/ScrollVideoHero";

interface PortfolioHeroProps {
  badge?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function PortfolioHero({
  badge = "Referenciák",
  titlePrefix = "Eredmények, nem csak ",
  titleHighlight = "Dizájn",
  subtitle = "Minden projekt egy egyedi kihívás, amire kreatív és technológiai választ adtam. Nézd meg a sikertörténeteket!",
  ctaLabel = "Kapcsolat →",
  ctaHref = "/kapcsolat",
}: PortfolioHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ScrollVideoHero videoSrc="/webdude-websites-promo.mp4" scrollHeight={120}>
      {/* Content overlay - WoW effect with dramatic entrance */}
      <div className="text-center space-y-8 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/80 backdrop-blur-xl border border-[#00B5F1]/30 shadow-[0_0_40px_rgba(0,181,241,0.3)]"
        >
          <span className="text-sm font-bold text-[#00B5F1] uppercase tracking-widest">
            {badge}
          </span>
        </motion.div>

        <motion.h1
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black font-heading text-white leading-tight tracking-tight"
        >
          {titlePrefix}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic pr-4">
            {titleHighlight}
          </span>
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>

        <motion.a
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.6 }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
          href={ctaHref}
          className="inline-block px-10 py-5 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:to-[#6d28d9] text-white rounded-full font-bold text-lg shadow-[0_8px_24px_rgba(0,181,241,0.2)] hover:shadow-[0_18px_40px_rgba(0,181,241,0.3)] transition-[background-color,box-shadow,transform] duration-300 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-offset-2 focus:ring-offset-bg-base"
        >
          {ctaLabel}
        </motion.a>
      </div>
    </ScrollVideoHero>
  );
}
