"use client";

import React from "react";
import { motion } from "motion/react";
import SectionTitle from "@/components/atoms/SectionTitle";
import CaseStudyCard from "@/components/molecules/CaseStudyCard";
import { useMotionPreset } from "@/hooks/useMotionPreset";

const caseStudiesData = [
  {
    client: "btshop.hu • Webáruház & AI",
    title: "Komplett headless Next.js webshop AI-asszisztenssel",
    problem:
      "Lassú betöltés, elavult dizájn és a kosár-elhagyási arány magas szintje gátolta a növekedést.",
    solution:
      "Next.js alapú, konverzióra kihegyezett headless webáruház, integrált intelligens AI értékesítési asszisztenssel.",
    testimonial: {
      text: "Az AI asszisztens bevezetése után a konverziónk azonnal megugrott, a kosárelhagyás pedig jelentősen visszaesett.",
      author: "Kovács Tamás, Alapító",
    },
    metrics: [
      { label: "Online Értékesítés", value: "+40%" },
      { label: "Kosárelhagyás csökkenés", value: "-45%" },
    ],
    gridClass: "lg:col-span-3",
  },
  {
    client: "Solar System AI • AI Automatizáció",
    title: "AI-alapú lead minősítés és automatikus ajánlatadás",
    problem:
      "A bejövő érdeklődők manuális szűrése és a személyre szabott árajánlatok megírása heti 15 órát vett el az értékesítő csapat tagjaitól.",
    solution:
      "Intelligens AI workflow-k és robotizált asszisztens, amely automatikusan cseveg a látogatókkal, előminősíti a leadeket és azonnal kiküldi a PDF ajánlatot.",
    testimonial: {
      text: "Az AI modul 3 hete fut, és azóta az adminisztrációs terheink 80%-a egyszerűen megszűnt. Végre az eladásokra koncentrálhatunk.",
      author: "Kovács Melinda, Értékesítési vezető",
    },
    metrics: [
      { label: "Admin idő megtakarítás", value: "-80%" },
      { label: "Sikeres lead minősítés", value: "92%" },
    ],
    gridClass: "lg:col-span-3",
  },
];

export default function CaseStudies() {
  const motionPreset = useMotionPreset();

  return (
    <section className="py-24 md:py-32 bg-transparent border-t border-slate-200 relative overflow-hidden">
      {/* Background glow effects for premium look */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={motionPreset}
        >
          <SectionTitle
            eyebrow="Esettanulmányok"
            title="Mérhető eredmények, amik magukért beszélnek"
            description="Nem csupán szép dizájn – hanem üzletközpontú megoldások, amelyek kézzelfogható növekedést hoznak."
            center={true}
            className="mx-auto"
          />
        </motion.div>

        {/* Asymmetric Bento Grid (6-column desktop system) */}
        <div className="mt-12 grid gap-6 grid-cols-1 lg:grid-cols-6">
          {caseStudiesData.map((it, index) => (
            <motion.div
              key={it.title}
              className={it.gridClass}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                ...motionPreset,
                delay: motionPreset.duration === 0 ? 0 : 0.1 * (index + 1),
              }}
            >
              <CaseStudyCard
                title={it.title}
                client={it.client}
                problem={it.problem}
                solution={it.solution}
                testimonial={it.testimonial}
                metrics={it.metrics}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
