"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

interface ProductPortalCtaProps {
  /** A termék neve — a CTA szövegbe illesztve */
  productName: string;
}

/**
 * Konverzió-orientált CTA szekció nyilvános termékoldalakhoz.
 * Lánc: termékoldal → portál AI Műhely (bejelentkezett demó) → /kapcsolat egyedi árajánlat.
 * Cyber-Arany dizájnnyelv: #020617 alap, #f59e0b akcentus, glassmorphism.
 */
export default function ProductPortalCta({ productName }: ProductPortalCtaProps) {
  const shouldReduceMotion = useReducedMotion();
  const spring = { type: "spring" as const, stiffness: 60, damping: 16 };

  return (
    <section className="py-16 md:py-24 px-6 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 65%)",
        }}
      />
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 28 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="relative z-10 max-w-3xl mx-auto text-center bg-slate-950/80 backdrop-blur-2xl border border-[#f59e0b]/25 rounded-3xl p-10 md:p-12 shadow-[0_0_64px_rgba(245,158,11,0.12)]"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 text-xs font-bold uppercase tracking-[0.25em] text-[#f59e0b]">
          <Sparkles className="w-4 h-4" aria-hidden />
          Élő AI demó
        </span>

        <h2 className="mt-6 text-2xl md:text-4xl font-bold tracking-tight text-[#e2e8f0] leading-tight">
          Próbáld ki a{" "}
          <span className="text-[#f59e0b]">{productName}</span> műhelyt a
          portálon
        </h2>
        <p className="mt-4 text-slate-400 leading-relaxed max-w-xl mx-auto">
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
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-black bg-[#f59e0b] hover:bg-amber-400 shadow-[0_8px_28px_rgba(245,158,11,0.35)] hover:shadow-[0_14px_40px_rgba(245,158,11,0.45)] transition-all"
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[#f59e0b] border border-[#f59e0b]/40 hover:border-[#f59e0b] hover:bg-[#f59e0b]/10 transition-all"
            >
              Egyedi árajánlat kérése
            </Link>
          </motion.div>
        </div>
        <p className="mt-5 text-xs text-slate-500 uppercase tracking-widest">
          Válasz 24 órán belül — közvetlenül tőlem
        </p>
      </motion.div>
    </section>
  );
}
