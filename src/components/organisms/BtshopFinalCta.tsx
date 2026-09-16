"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

const spring = { type: "spring" as const, stiffness: 60, damping: 16 };

export default function BtshopFinalCta() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 181, 241,0.12) 0%, transparent 65%)",
        }}
      />

      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 32 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="relative z-10 max-w-3xl mx-auto text-center bg-slate-950/80 backdrop-blur-2xl border border-[#00B5F1]/25 rounded-3xl p-10 md:p-14 shadow-[0_0_80px_rgba(0, 181, 241,0.12)]"
      >
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00B5F1]">
          High-ticket rendszermérnöki együttműködés
        </span>
        <h2 className="mt-5 text-3xl md:text-5xl font-black tracking-tight text-[#e2e8f0] leading-tight">
          Egyedi árajánlat kérése{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6]">
            nagyvállalati rendszerekre
          </span>
        </h2>
        <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
          Ha a vállalkozásod már kinőtte a sablonmegoldásokat — szerverek,
          könyvelés, logisztika és marketing beszélnek egymás helyett —,
          beszéljük meg az igazi architektúrát. Fix árat nem árulok, mert
          rendszert tervezek, nem órát számlázok.
        </p>
        <motion.div
          whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          className="inline-block mt-10"
        >
          <Link
            href="/kapcsolat"
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-slate-950 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] hover:from-[#5B21B6] hover:to-[#5B21B6] shadow-[0_8px_32px_rgba(0, 181, 241,0.35)] hover:shadow-[0_16px_48px_rgba(0, 181, 241,0.45)] transition-all"
          >
            Egyedi árajánlatot kérek
            <ArrowRight
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              aria-hidden
            />
          </Link>
        </motion.div>
        <p className="mt-6 text-xs text-slate-500 uppercase tracking-widest">
          Válasz 24 órán belül — közvetlenül tőlem, nem call centertől
        </p>
      </motion.div>
    </section>
  );
}
