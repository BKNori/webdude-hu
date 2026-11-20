"use client";

import React from "react";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
  location?: string;
}

export default function Timeline() {
  const shouldReduceMotion = useHydratedReducedMotion();
  const basicYears: TimelineEvent[] = [
    {
      year: "1981 - 1989",
      title: "Kunmadarasi Általános Iskola",
      desc: "Az alapok elsajátítása.",
    },
    {
      year: "1989 - 1990",
      title: "Túrkeve, Ványai Ambrus Technikum",
      desc: "A technikai érdeklődés kezdetei.",
    },
    {
      year: "1990 - 1995",
      title: "Gáspár András Autóvillamossági Technikum",
      location: "Kecskemét",
      desc: "Műszaki érzék és gyakorlati rendszerszemlélet megalapozása.",
    },
  ];

  const proYears: TimelineEvent[] = [
    {
      year: "1996 - 1997",
      title: "BKSZC Kézművesipari Technikum",
      location: "Budapest",
      desc: "Az első hivatalos találkozás az iparművészettel és a kreatív folyamatokkal.",
    },
    {
      year: "1997 - 1999",
      title: "Tótfalusi Kis Miklós Nyomdaipari Szakközépiskola",
      location: "Budapest",
      desc: "Vizuális és nyomdai precizitás elsajátítása. Klasszikus tipográfia és nyomdai előkészítés – a mai napig ez alapozza meg a 'digitális kézművesség' minőségét.",
    },
    {
      year: "1999 - 2001",
      title: "AKG (Gazdasági Informatika)",
      location: "Budapest",
      desc: "Az informatikai szemléletmód és a programozási alapok elsajátítása még a modern internet térhódítása előtt.",
    },
    {
      year: "2002 - 2007",
      title: "GAMF Mérnök-informatikus szak",
      location: "Kecskemét",
      desc: "A legmagasabb szintű technikai képzés. Mérnöki programozás és rendszerszervezés, amely a ma alkalmazott modern Next.js 16, React 19 és felhőalapú szoftverarchitektúra biztos alapját jelenti.",
    },
    {
      year: "2008 - Napjainkig",
      title: "Prémium Weboldal Fejlesztés & UI/UX",
      location: "Kecskemét & Online",
      desc: "Prémium weboldal fejlesztés, modern webalkalmazások, arculattervezés és digitális termékfejlesztés vállalkozások számára. Egyedi, eladásfókuszú megoldások a konverzió maximalizálására.",
    },
    {
      year: "2020",
      title: "WebDude Márka Újjászületése",
      location: "Kecskemét",
      desc: "A WebDude márka teljeskörű átalakítása és modernizálása. A korábbi 'Norbi' márka helyett egy profibb, prémium technológiai identitás kialakítása a digitális piacon.",
    },
    {
      year: "2025",
      title: "AI Engineering & LLM Integrációk",
      location: "Online",
      desc: "AI platformok és az AI engineering elmélyült elsajátítása. OpenAI, Anthropic, Groq API és intelligens multi-agent LLM integrációk kutatása és alkalmazása az üzleti webfejlesztésben.",
    },
    {
      year: "2026",
      title: "Next.js 16 · React 19 · AI-Prompt Platformok",
      location: "Online",
      desc: "Újgenerációs WebDude OS ökoszisztéma, AI-Prompt platformok és autonóm munkafolyamatok fejlesztése. Prompt engineering, AI workflow automatizáció és csúcskategóriás generatív AI eszközök integrációja.",
    },
  ];

  return (
    <div className="relative py-10 px-4 max-w-4xl mx-auto">
      {/* Central Neon Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#0369A1] dark:bg-[#00B5F1] opacity-25 dark:opacity-20 transform md:-translate-x-1/2" />

      {/* 1. Alapozó évek (Rövidítve) */}
      <div className="mb-20">
        <motion.h3
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 100, damping: 20 }
          }
          className="text-center text-2xl md:text-3xl font-heading mb-10 text-[#0F172A] dark:text-text-primary"
        >
          Alapozó évek
        </motion.h3>
        <div className="space-y-10 opacity-90 dark:opacity-85">
          {basicYears.map((e, i) => (
            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }
              }
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 100, damping: 20 }
              }
              key={i}
              className={`relative flex flex-col md:flex-row items-center gap-6 group ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
            >
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[#F8FAFC] dark:bg-[#0B1120] border-2 border-slate-400 dark:border-slate-600 rounded-full transform -translate-x-1/2 z-10 group-hover:border-[#0369A1] dark:group-hover:border-[#00B5F1] transition-colors" />
              <div
                className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}
              >
                <span className="text-xs font-bold tracking-widest block mb-1 text-[#334155] dark:text-slate-300">
                  {e.year}
                </span>
                <h4 className="text-lg font-bold text-[#0F172A] dark:text-white leading-tight">
                  {e.title}
                </h4>
                {e.location && (
                  <span className="text-[10px] uppercase text-[#475569] dark:text-slate-400">
                    {e.location}
                  </span>
                )}
              </div>
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Szakmai alapkövek */}
      <div className="pt-10">
        <motion.h3
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 100, damping: 20 }
          }
          className="text-center text-4xl md:text-5xl font-heading mb-16 text-[#0F172A] dark:text-white"
        >
          Szakmai <span className="text-[#0369A1] dark:text-[#00B5F1]">alapkövek</span>
        </motion.h3>
        <div className="space-y-20">
          {proYears.map((e, i) => (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 100, damping: 20 }
              }
              key={i}
              className={`relative flex flex-col md:flex-row items-center gap-12 group ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
            >
              {/* Animated Dot */}
              <div className="absolute left-8 md:left-1/2 w-8 h-8 bg-[#F8FAFC] dark:bg-[#0B1120] border-4 border-[#0369A1] dark:border-[#00B5F1] rounded-full transform -translate-x-1/2 z-10 transition-all duration-500 shadow-[0_0_15px_rgba(3,105,161,0.2)] dark:shadow-[0_0_15px_rgba(0,181,241,0.2)] group-hover:scale-125 group-hover:bg-[#0369A1] dark:group-hover:bg-[#00B5F1]" />

              <div
                className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}
              >
                <div className="luminous-card p-8">
                  <span className="text-[#0369A1] dark:text-[#00B5F1] font-mono font-bold text-sm tracking-[0.2em] block mb-2 uppercase">
                    {e.year}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-bold mb-4 text-[#0F172A] dark:text-white leading-tight">
                    {e.title}
                  </h4>
                  <p className="text-[#334155] dark:text-slate-300 text-base leading-relaxed">
                    {e.desc}
                  </p>
                  {e.location && (
                    <div
                      className={`mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#475569] dark:text-slate-400 ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
                    >
                      {e.location}
                    </div>
                  )}
                </div>
              </div>

              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Összegzés */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 100, damping: 20 }
        }
        className="luminous-card mt-32 text-center max-w-2xl mx-auto p-10 relative overflow-hidden text-[#0F172A] dark:text-white"
      >
        <p className="text-xl md:text-2xl font-sans italic relative z-10 leading-relaxed text-[#1E293B] dark:text-slate-100">
          {
            '"A nyomdaipari és informatikai tanulmányaim alapozták meg a grafikai és webes szakértelmemet, amit ma WebDude-ként kamatoztatok."'
          }
        </p>
      </motion.div>
    </div>
  );
}
