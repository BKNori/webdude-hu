"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import {
  RefreshCw,
  ShoppingBag,
  Gauge,
  Truck,
} from "lucide-react";

const spring = { type: "spring" as const, stiffness: 60, damping: 16 };

interface BentoBox {
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  glow: string;
  title: string;
  body: string;
  span?: boolean;
}

const boxes: BentoBox[] = [
  {
    icon: RefreshCw,
    accent: "text-[#00B5F1]",
    glow: "hover:border-[#00B5F1]/50",
    title: "A Könyvelési Híd — Kulcs-Soft szinkron",
    body: "Egyedi API-összekötő köti össze a webshopot és a szerveren futó Kulcs-Soft könyvelőprogramot. A termékadatok, árak és készletek automatikus exportja, a beérkező megrendelések importja kétirányú, valós idejű és nulla emberi beavatkozást igényel. A számlázás nem utómunka — a rendszer magától történik.",
    span: true,
  },
  {
    icon: ShoppingBag,
    accent: "text-[#00B5F1]",
    glow: "hover:border-[#00B5F1]/50",
    title: "Google Merchant & Feed motor",
    body: "Napi szintű, hibaablak-mentes termékfeed a Google Shopping hirdetésekhez: dinamikus XML-generálás, készletkezelés és Merchant Center + Search Console + Analytics 4 bekötés egyetlen, összehangolt ökoszisztémában.",
  },
  {
    icon: Gauge,
    accent: "text-amber-400",
    glow: "hover:border-amber-500/50",
    title: "Saját fejlesztésű SEO plugin",
    body: "3200 terméknél a dobozos SEO-bővítmények már szűk keresztmetszetek. Ezért egyedi, a bolt belső logikájára írt WordPress plugint fejlesztettem, amely maximális technikai SEO pontszámot és mérhető sebességnövekedést ad.",
  },
  {
    icon: Truck,
    accent: "text-amber-400",
    glow: "hover:border-amber-500/50",
    title: "Automatizált logisztikai lánc",
    body: "Magyar Posta és Foxpost API integráció: címkegenerálás, átadás és státuszkövetés teljesen automatizált — a megrendeléstől a csomagátadásig kéz nem érinti az adatot.",
  },
];

export default function BtshopEngineeringGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#00B5F1]">
            Mérnöki kihívások &amp; megoldások
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#e2e8f0]">
            Négy rendszer, <span className="text-[#00B5F1]">egy agy</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Nem pluginhalmozás — hanem átgondolt rendszerarchitektúra,
            ahol minden modul a többivel beszél.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {boxes.map((box, i) => {
            const Icon = box.icon;
            return (
              <motion.article
                key={box.title}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 32 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ ...spring, delay: i * 0.08 }}
                whileHover={shouldReduceMotion ? {} : { y: -8 }}
                className={`group relative bg-slate-950/80 backdrop-blur-2xl border border-slate-800/80 ${box.glow} rounded-3xl p-8 md:p-10 transition-colors ${
                  box.span ? "md:col-span-2" : ""
                }`}
              >
                <div
                  aria-hidden
                  className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-[#00B5F1]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <Icon
                  className={`w-9 h-9 ${box.accent} mb-6`}
                  aria-hidden
                />
                <h3 className="text-xl md:text-2xl font-bold text-[#e2e8f0] mb-4 tracking-tight">
                  {box.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {box.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
