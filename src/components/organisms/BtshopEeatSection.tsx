"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import { Fingerprint } from "lucide-react";

const spring = { type: "spring" as const, stiffness: 60, damping: 16 };

const principles = [
  {
    k: "Experience",
    v: "16 év WordPress fejlesztés, 26 év grafikai rálátás — nem elmélet, hanem üzemeltetett rendszerek tanulságai.",
  },
  {
    k: "Expertise",
    v: "API-tervezés, ERP-szinkron, feed-generálás és egyedi pluginfejlesztés egy kézben, egy architektúrai vízióval.",
  },
  {
    k: "Authoritativeness",
    v: "Nincs ügynökségi lánc, nincs alvállalkozói láncreakció — közvetlen, precíz technológia, egy felelős nevével.",
  },
  {
    k: "Trustworthiness",
    v: "A rendszer 3200 terméket és valós bevételt mozgat nap mint nap — a bizalom mérhető, nem ígérhető.",
  },
];

export default function BtshopEeatSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-24 px-6 border-y border-slate-800/60 bg-bg-surface/40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        {/* Portré / vizuál oldalsáv */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, x: -32 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="lg:col-span-2"
        >
          <div className="relative rounded-3xl overflow-hidden border border-[#00B5F1]/25 shadow-[0_0_60px_rgba(0, 181, 241,0.14)]">
            <div className="relative aspect-4/3 w-full bg-bg-base">
              <Image
                src="/assets/portfolio/btshop/btshop-dashboard-placeholder.svg"
                alt="btshop.hu rendszerdashboard — szinkronizációs áttekintés"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* E-E-A-T tartalom */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 28 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...spring, delay: 0.12 }}
          className="lg:col-span-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 backdrop-blur-2xl border border-sky-500/30 mb-6">
            <Fingerprint className="w-4 h-4 text-sky-400" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky-400">
              E-E-A-T — Egy kéz, egy felelősség
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
            Ezt a rendszert{" "}
            <span className="text-[#00B5F1]">egyetlen kézzel</span> építették
            fel.
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl">
            Nincs projektmenedzser réteg, nincs kreatív-technikai köztes
            fordítás. 26 éves grafikai és rendszermérnöki rálátással, 16 éves
            WordPress-rutinból született meg az a rendszer, amely ma a btshop.hu
            teljes üzleti hátfelét viseli.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((p, i) => (
              <motion.div
                key={p.k}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: 0.15 + i * 0.07 }}
                className="bg-slate-950/80 backdrop-blur-2xl border border-slate-800/80 rounded-2xl p-6 hover:border-sky-500/40 transition-colors"
              >
                <dt className="text-sm font-bold uppercase tracking-wider text-sky-400 mb-2">
                  {p.k}
                </dt>
                <dd className="text-sm text-slate-400 leading-relaxed">
                  {p.v}
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
