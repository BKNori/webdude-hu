"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

import { projects } from "@/data/projects";

const caseStudies = [
  {
    title: "btshop.hu • Webáruház & AI",
    category: "Komplett headless Next.js webshop AI-asszisztenssel",
    description:
      "Lassú betöltés, elavult dizájn és a kosár-elhagyási arány magas szintje gátolta a növekedést.",
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
    image: "/assets/projects/btshop.webp",
  },
  {
    title: "Solar System AI • AI Automatizáció",
    category: "AI-alapú lead minősítés és automatikus ajánlatadás",
    description:
      "A bejövő érdeklődők manuális szűrése és a személyre szabott árajánlatok megírása heti 15 órát vett el az értékesítő csapat tagjaitól.",
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
    image: "/assets/projects/solar-system-ai.webp",
  },
];

export default function PortfolioSectionNew() {
  return (
    <section className="relative py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#00B5F1]/10 text-[#00B5F1] text-sm font-semibold tracking-wider uppercase mb-4">
            Munkáim
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Esettanulmányok
          </h2>
          <p className="text-xl text-[#4B5563] max-w-2xl mx-auto">
            Valós eredmények, valós ügyfeleknek. Nézd meg a legutóbbi
            projektjeimet.
          </p>
        </motion.div>

        {/* Large Case Study Cards */}
        <div className="grid grid-cols-1 gap-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="group"
            >
              <Link href="/munkak" className="block">
                <div className="relative bg-[#F8FAFC] rounded-[40px] overflow-hidden shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 border border-[#E7ECF2]">
                  {/* MacBook Mockup Container */}
                  <div className="relative h-[450px] md:h-[550px] bg-linear-to-br from-[#111827] to-[#1E293B] p-10 md:p-16">
                    {/* MacBook Frame */}
                    <div className="relative h-full bg-[#0F172A] rounded-2xl border-4 border-[#334155] shadow-2xl overflow-hidden">
                      {/* Screen Content */}
                      <div className="relative h-full bg-white rounded-lg overflow-hidden">
                        <Image
                          src={study.image}
                          alt={study.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-10 md:p-12">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="px-4 py-2 rounded-full bg-[#00B5F1]/10 text-[#00B5F1] text-xs font-semibold tracking-wider uppercase">
                        {study.category}
                      </span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-[#111827] mb-6 group-hover:text-[#00B5F1] transition-colors duration-300">
                      {study.title}
                    </h3>

                    <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                      {study.description}
                    </p>

                    {/* Problem & Solution */}
                    <div className="space-y-6 mb-10">
                      <div>
                        <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-2">
                          Probléma
                        </h4>
                        <p className="text-[#4B5563] leading-relaxed">
                          {study.problem}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-2">
                          Megoldás
                        </h4>
                        <p className="text-[#4B5563] leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Testimonial */}
                    {study.testimonial && (
                      <div className="bg-[#F8FAFC] rounded-2xl p-6 mb-10 border border-[#E7ECF2]">
                        <p className="text-[#4B5563] italic mb-4">
                          "{study.testimonial.text}"
                        </p>
                        <p className="text-sm font-bold text-[#111827]">
                          {study.testimonial.author}
                        </p>
                      </div>
                    )}

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-8">
                      {study.metrics.map((metric) => (
                        <div key={metric.label}>
                          <div className="text-3xl md:text-4xl font-bold text-[#00B5F1]">
                            {metric.value}
                          </div>
                          <div className="text-sm text-[#94A3B8] uppercase tracking-wider">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/munkak"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#00B5F1] hover:bg-[#0095C7] text-white font-semibold transition-all duration-300 shadow-[0_8px_24px_rgba(0,181,241,0.2)] hover:shadow-[0_18px_40px_rgba(0,181,241,0.3)]"
          >
            Összes projekt megtekintése
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
