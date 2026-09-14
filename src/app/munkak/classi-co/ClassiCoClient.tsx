"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Search,
  PenTool,
  BarChart3,
  Layout,
} from "lucide-react";

export default function ClassiCoClient() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const kpiData = [
    {
      value: "100%",
      label: "Teljes körű",
      sub: "Weboldal fejlesztés",
      icon: Layout,
      color: "#00B5F1",
    },
    {
      value: "SEO",
      label: "Beindexelt",
      sub: "Google Search Console",
      icon: Search,
      color: "#00B5F1",
    },
    {
      value: "GA4",
      label: "Analytics",
      sub: "Adatok bekötve",
      icon: BarChart3,
      color: "#00B5F1",
    },
  ];

  const timelineSteps = [
    {
      number: "01",
      title: "Weboldal Tervezés",
      description:
        "WordPress alapú egyszerű céges weboldal tervezése és fejlesztése. Logó, képek és szövegírás teljes körű elvégzése.",
      icon: Layout,
    },
    {
      number: "02",
      title: "Tartalomgyártás",
      description:
        "Professzionális szövegírás minden oldalhoz, vizuális elemek és képek kiválasztása, amelyek a márka identitását tükrözik.",
      icon: PenTool,
    },
    {
      number: "03",
      title: "SEO Optimalizálás",
      description:
        "Google Search Console bekötés, oldalak beindexelése, technikai SEO optimalizálás a jobb láthatóságért.",
      icon: Search,
    },
    {
      number: "04",
      title: "Analytics Bekötés",
      description:
        "Google Analytics 4 integráció a látogatói adatok követéséhez és a marketing teljesítmény méréséhez.",
      icon: BarChart3,
    },
  ];

  const techStack = [
    "WordPress",
    "SEO",
    "Google Search Console",
    "Google Analytics 4",
    "Tartalomírás",
    "Grafikai tervezés",
  ];

  return (
    <>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
        .pulse-glow {
          animation: pulse-glow 8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .pulse-glow {
            animation: none !important;
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-bg-base" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B5F1]/20 rounded-full blur-3xl pulse-glow" />
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block text-xs uppercase tracking-[0.3em] font-bold text-[#00B5F1] mb-6">
              Esettanulmány
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight mb-8 tracking-tight">
              Classi-co.hu:{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#0095C7]">
                Teljes Körű
              </span>
              <br />
              Céges Weboldal Fejlesztés
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
              <span className="text-[#00B5F1] font-semibold">
                WordPress alapú
              </span>{" "}
              egyszerű céges weboldal tervezése, tartalomgyártással, SEO
              optimalizálással és analytics bekötéssel.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/munkak"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-offset-2 focus:ring-offset-bg-base"
                style={{
                  background:
                    "linear-gradient(135deg, #00B5F1 0%, #0095C7 100%)",
                  boxShadow: "0 0 32px rgba(0,181,241,0.35)",
                }}
              >
                További projektek <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/kapcsolat"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-slate-200 text-base bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-[#00B5F1]/40 backdrop-blur-sm transition-all duration-300"
              >
                Ingyenes konzultáció
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs"
        >
          <span className="uppercase tracking-widest font-medium">Görgess</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-[#00B5F1]" />
          </motion.div>
        </motion.div>
      </section>

      {/* KPI SECTION */}
      <section className="relative py-24 bg-bg-base">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {kpiData.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/80 p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#00B5F1]/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#00B5F1]" />
                  </div>
                  <div className="text-4xl font-bold text-text-primary mb-2">
                    {kpi.value}
                  </div>
                  <div className="text-lg font-semibold text-[#00B5F1] mb-1">
                    {kpi.label}
                  </div>
                  <div className="text-sm text-slate-400">{kpi.sub}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CHALLENGE SECTION */}
      <section className="relative py-24 bg-bg-base">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs uppercase tracking-[0.3em] font-bold text-[#00B5F1] mb-4">
              Kihívás
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Egyszerű Céges Weboldal, Professzionális Megjelenés
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              A Classi-co számára egy egyszerű, de professzionális megjelenésű
              céges weboldalra volt szükség. A feladat nem csupán a technikai
              megvalósítás volt, hanem a teljes tartalomgyártás — logó, képek,
              szövegírás — és a keresőoptimalizálás is.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="relative py-24 bg-bg-base">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs uppercase tracking-[0.3em] font-bold text-[#00B5F1] mb-4">
              Megoldás
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Teljes Körű Weboldal Fejlesztés
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              WordPress alapú weboldal tervezése és fejlesztése, teljes
              tartalomgyártással, SEO optimalizálással és analytics bekötéssel.
            </p>
          </motion.div>

          <div className="space-y-8">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#00B5F1]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-[#00B5F1] mb-2">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section className="relative py-24 bg-bg-base">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs uppercase tracking-[0.3em] font-bold text-[#00B5F1] mb-4">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Felhasznált Technológiák
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 text-sm font-medium hover:border-[#00B5F1]/50 hover:text-[#00B5F1] transition-all duration-300"
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section className="relative py-24 bg-bg-base">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs uppercase tracking-[0.3em] font-bold text-[#00B5F1] mb-4">
              Eredmények
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Mért Eredmények
            </h2>
            <ul className="space-y-4">
              {[
                "Teljes körű weboldal fejlesztés WordPress alapokon",
                "Professzionális logó és képek tervezése",
                "Kreatív szövegírás minden oldalhoz",
                "Google Search Console bekötés és beindexelés",
                "Google Analytics 4 integráció",
              ].map((result, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 text-slate-300"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#00B5F1] shrink-0 mt-0.5" />
                  <span>{result}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 bg-bg-base">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Hasonló Céges Weboldalt Szeretnél?
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              WordPress alapú weboldal, tartalomgyártással, SEO optimalizálással
              és analytics bekötéssel. Beszéljünk róla.
            </p>
            <Link
              href="/kapcsolat"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-offset-2 focus:ring-offset-bg-base"
              style={{
                background: "linear-gradient(135deg, #00B5F1 0%, #0095C7 100%)",
                boxShadow: "0 0 32px rgba(0,181,241,0.35)",
              }}
            >
              Ingyenes konzultáció <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
