"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Timeline from "@/components/molecules/Timeline";
import { motion } from "motion/react";

export default function AboutPage() {
  const processSteps = [
    {
      title: "Igényfelmérés",
      desc: "Közös megértés és célmeghatározás a projekthez.",
      icon: "1",
    },
    {
      title: "Design tervezés",
      desc: "Vizuális koncepció és egyedi arculat kialakítása.",
      icon: "2",
    },
    {
      title: "Fejlesztés & SEO",
      desc: "Villámgyors, keresőoptimalizált kód írása.",
      icon: "3",
    },
    {
      title: "Funkciók integrálása",
      desc: "Eshop, konverziós elemek és AI megoldások.",
      icon: "4",
    },
    {
      title: "Marketing támogatás",
      desc: "Folyamatos növekedés és eredménykövetés.",
      icon: "5",
    },
  ];

  return (
    <main className="min-h-screen bg-bg-base text-text-primary">
      {/* 1. Hero Szekció (Személyes felütés) */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-40 overflow-hidden">
        {/* Ötletes háttér effektek */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-linear-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-linear-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-br from-blue-300/10 to-cyan-300/10 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-block relative pl-6">
              <span className="text-xs uppercase font-black tracking-[0.4em] text-[#00B5F1] mb-2 block">
                Bemutatkozás
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-linear-to-b from-[#00B5F1] to-[#0095C7] rounded-full" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight">
              Üdvözöllek!
              <br />{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#0095C7] italic">
                WebDude
              </span>{" "}
              vagyok.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed">
              Több mint <strong className="text-[#00B5F1]">16 éve</strong>{" "}
              készítek weboldalakat, és{" "}
              <strong className="text-[#00B5F1]">26 éve</strong> foglalkozom
              grafikával. Szenvedélyem a digitális kézművesség, ahol a
              letisztult design találkozik a villámgyors kóddal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-150 w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-125 aspect-4/5 overflow-hidden rounded-4xl shadow-[0_25px_50px_rgba(0,181,241,0.15)] rotate-2 hover:rotate-0 transition-transform duration-700 glass-card border border-slate-700/30 p-4 backdrop-blur-md bg-bg-surface/50">
              <div className="w-full h-full relative overflow-hidden rounded-2xl flex items-center justify-center">
                <Image
                  src="/assets/personal/webdude-kep.webp"
                  alt="WebDude Norbi"
                  width={500}
                  height={625}
                  priority
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - CSS Animációval */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        >
          <span className="text-xs uppercase font-bold tracking-widest text-text-primary">
            Görgetés
          </span>
          <div className="w-px h-12 bg-linear-to-b from-transparent to-[#00B5F1]" />
        </motion.div>
      </section>

      {/* 2. Röpke Történetem & Statisztika */}
      <section className="py-24 bg-transparent relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-10"
          >
            <div className="inline-block relative pl-6">
              <span className="text-xs uppercase font-black tracking-[0.4em] text-[#00B5F1] mb-2 block">
                Röpke Történetem
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-linear-to-b from-[#00B5F1] to-[#0095C7] rounded-full" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight">
              A Te{" "}
              <span className="italic text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#0095C7]">
                Digitális Partnered.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mx-auto">
              Hangsúlyozom:{" "}
              <strong className="text-[#00B5F1]">
                Nem egy ügynökség vagyok. Én vagyok a WebDude.
              </strong>{" "}
              Ebből pedig te is profitálsz. Nincs account manager, nincs
              félreértés, és nincsenek elszálló határidők. Csak Te, én, és a
              projekted gyerekszobája: a közvetlen, személyes együttműködés.
            </p>
          </motion.div>

          {/* Statisztikai Kártyák */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              { value: "200+", label: "Projekt Készítve" },
              { value: "500+", label: "Lead Generált" },
              { value: "+150%", label: "Konverzió Növekedés" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-surface/80 backdrop-blur-md border border-slate-700 rounded-2xl p-10 shadow-[0_8px_24px_rgba(0,181,241,0.06)] hover:shadow-[0_18px_40px_rgba(0,181,241,0.1)] hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <span className="text-6xl font-black font-serif block mb-4 text-text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-[#00B5F1] group-hover:to-[#0095C7] transition-all">
                  {stat.value}
                </span>
                <p className="text-sm uppercase tracking-widest font-bold text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interaktív Tanulmányi Idővonal */}
      <section className="py-32 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block relative pl-6">
              <span className="text-xs uppercase font-black tracking-[0.4em] text-[#00B5F1] mb-2 block">
                Múlt & Tapasztalat
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-linear-to-b from-[#00B5F1] to-[#0095C7] rounded-full" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight">
              Utam idáig
            </h2>
          </motion.div>

          <Timeline />
        </div>
      </section>

      {/* 4. Küldetés és Munkamódszer */}
      <section className="py-32 bg-linear-to-br from-bg-surface to-bg-elevated relative overflow-hidden">
        <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-br from-[#00B5F1]/10 to-[#0095C7]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-24"
          >
            <div className="inline-block relative pl-6">
              <span className="text-xs uppercase font-black tracking-[0.4em] text-[#00B5F1] mb-2 block">
                Küldetés & Módszer
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-linear-to-b from-[#00B5F1] to-[#0095C7] rounded-full" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight">
              &ldquo;Segíteni az ügyfeleknek kitűnni a digitális térben
              esztétikus és hatékony megoldásokkal.&rdquo;
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-bg-surface/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 relative shadow-[0_8px_24px_rgba(0,181,241,0.06)] hover:shadow-[0_18px_40px_rgba(0,181,241,0.1)] hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
              >
                <div className="text-[100px] font-black font-serif absolute -top-8 -right-4 text-text-primary opacity-5 group-hover:opacity-10 transition-opacity">
                  {step.icon}
                </div>
                <div className="relative z-10">
                  <span className="w-8 h-8 rounded-full bg-transparent border border-slate-700 text-text-primary flex items-center justify-center text-sm font-bold mb-6 group-hover:bg-linear-to-r group-hover:from-[#00B5F1] group-hover:to-[#0095C7] group-hover:text-white group-hover:border-transparent transition-all">
                    {step.icon}
                  </span>
                  <h4 className="text-lg font-black font-outfit mb-3 text-text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-[#00B5F1] group-hover:to-[#0095C7] transition-all">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Konverzió (CTA) */}
      <section className="py-40 bg-linear-to-br from-bg-surface to-bg-elevated text-text-primary text-center relative overflow-hidden border-t border-slate-800">
        {/* Accent glow on CTA section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-linear-to-br from-[#00B5F1]/10 to-[#0095C7]/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-10"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight">
              Dolgozzunk{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#0095C7] italic">
                együtt!
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mx-auto">
              Készen állsz arra, hogy szintet lépjen a digitális jelenléted?
            </p>
            <div className="pt-8">
              <Link
                href="/kapcsolat"
                className="px-8 py-4 bg-linear-to-r from-[#00B5F1] to-[#0095C7] hover:from-[#0095C7] hover:to-[#007A9E] text-white rounded-full font-bold hover:scale-105 active:scale-95 transition-transform duration-300 shadow-[0_8px_24px_rgba(0,181,241,0.3)] hover:shadow-[0_18px_40px_rgba(0,181,241,0.4)] min-h-11 min-w-11 inline-block"
              >
                Kérj ajánlatot most!
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
