"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import { ArrowRight, Sparkles } from "lucide-react";

interface ProductPortalCtaProps {
  /** A termék neve — a CTA szövegbe illesztve */
  productName: string;
}

/**
 * Konverzió-orientált CTA szekció nyilvános termékoldalakhoz.
 * Lánc: termékoldal → portál AI Műhely (bejelentkezett demó) → /kapcsolat egyedi árajánlat.
 * Cyber-Arany dizájnnyelv: #020617 alap, #00B5F1 akcentus, glassmorphism.
 */
export default function ProductPortalCta({ productName }: ProductPortalCtaProps) {
  const shouldReduceMotion = useHydratedReducedMotion();
  const spring = { type: "spring" as const, stiffness: 60, damping: 16 };

  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 181, 241,0.10) 0%, transparent 65%)",
        }}
      />
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 28 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="relative z-10 max-w-3xl mx-auto text-center luminous-card border border-[#0369A1]/25 dark:border-[#00B5F1]/25 p-10 md:p-12 shadow-[0_16px_48px_rgba(3,105,161,0.1)] dark:shadow-[0_0_64px_rgba(0,181,241,0.12)]"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0369A1]/30 dark:border-[#00B5F1]/30 bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 text-xs font-bold uppercase tracking-[0.25em] text-[#0369A1] dark:text-[#00B5F1]">
          <Sparkles className="w-4 h-4" aria-hidden />
          Élő AI demó
        </span>

        <h2 className="mt-6 text-2xl md:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-text-primary leading-tight">
          Próbáld ki a{" "}
          <span className="text-[#0369A1] dark:text-[#00B5F1]">{productName}</span> műhelyt a
          portálon
        </h2>
        <p className="mt-4 text-[#334155] dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
          Jelentkezz be, és futtasd le az élő, Groq-alapú generátort — ugyanazt
          a motort, amelyet a WebDude ügyfélprojektjei nap mint nap
          használnak. Utána egyedi árajánlatot kérek az Önök rendszerére.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          >
            <Link
              href="/portal/ai-muhely"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] shadow-[0_8px_28px_rgba(7,89,133,0.35)] hover:shadow-[0_14px_40px_rgba(3,105,161,0.45)] transition-all"
            >
              AI Műhely indítása
              <ArrowRight
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                aria-hidden
              />
            </Link>
          </motion.div>
          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          >
            <Link
              href="/kapcsolat"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[#0369A1] dark:text-[#00B5F1] border border-[#0369A1]/40 dark:border-[#00B5F1]/40 hover:border-[#0369A1] dark:hover:border-[#00B5F1] hover:bg-[#0369A1]/10 dark:hover:bg-[#00B5F1]/10 transition-all"
            >
              Egyedi árajánlat kérése
            </Link>
          </motion.div>
        </div>
        <p className="mt-5 text-xs text-[#475569] dark:text-slate-400 uppercase tracking-widest">
          Válasz 24 órán belül — közvetlenül tőlem
        </p>
      </motion.div>
    </section>
  );
}
