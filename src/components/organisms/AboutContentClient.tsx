"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Timeline from "@/components/molecules/Timeline";
import { motion } from "motion/react";
import { ArrowRight, Award, Sparkles, Code2, HeartHandshake } from "lucide-react";

export default function AboutContentClient() {
  const processSteps = [
    {
      title: "Igényfelmérés & Stratégia",
      desc: "Közös megbeszélés és célmeghatározás az üzleti céljaid alapján.",
      icon: "01",
    },
    {
      title: "Dizájn & Prototípus",
      desc: "Vizuális koncepció, színek és modern arculat kialakítása.",
      icon: "02",
    },
    {
      title: "Fejlesztés & SEO",
      desc: "Villámgyors Next.js vagy WordPress kód és technikai keresőoptimalizálás.",
      icon: "03",
    },
    {
      title: "Funkciók & Integráció",
      desc: "Webáruház, számlázó, űrlapok és konverziós elemek bekötése.",
      icon: "04",
    },
    {
      title: "Támogatás & Karbantartás",
      desc: "Átadás után sem engedem el a kezed: elérhető vagyok a jövőben is.",
      icon: "05",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* 1. Hero Szekció (Személyes felütés) */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-24 overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-linear-to-br from-[#00B5F1]/15 to-purple-600/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-linear-to-br from-purple-900/20 to-slate-950 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-sky-400 text-xs font-medium uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#00B5F1]" />
              26 Év Tapasztalat & Digitális Kézművesség
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-sans text-white leading-tight tracking-tight">
              Nem egy ügynökséggel, hanem{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#a855f7]">
                velem dolgozol
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed">
              Balog Norbert vagyok, a WebDude alapítója és fejlesztője. Több mint <strong className="text-white">16 éve</strong> építek weboldalakat és <strong className="text-white">26 éve</strong> foglalkozom professzionális grafikával és tipográfiával.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/kapcsolat"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] shadow-lg shadow-sky-950/50 transition-all duration-300 group"
              >
                Egyedi árajánlat kérése
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/munkak"
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl font-medium text-slate-300 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors"
              >
                Munkáim megtekintése
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-4/5 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-3 shadow-2xl backdrop-blur-md">
              <div className="w-full h-full relative overflow-hidden rounded-2xl">
                <Image
                  src="/assets/personal/webdude-kep.webp"
                  alt="Balog Norbert - WebDude"
                  width={500}
                  height={625}
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Értékajánlat & Személyes hitvallás */}
      <section className="py-24 bg-slate-950 relative border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
            <div className="inline-block relative pl-6">
              <span className="text-xs uppercase font-black tracking-[0.4em] text-[#00B5F1] mb-2 block">
                Filozófia & Szemlélet
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-linear-to-b from-[#00B5F1] to-[#5B21B6]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-white leading-tight tracking-tight">
              A közvetlen partnerség ereje
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Nincsenek account managerek, nincs egymásra mutogatás, és nem veszik el az üzeneted a szervezeti szintek között. Egyetlen kézben összpontosul a grafikai tervezés, a frontend fejlesztés és a technikai keresőoptimalizálás.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 hover:border-[#00B5F1]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Közvetlen Kapcsolat</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Végig velem tartod a kapcsolatot az első skicctől a publikálásig és a későbbi fejlesztésekig.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 hover:border-[#00B5F1]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">26 Év Grafikai Múlt</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A nyomdaipari precizitásból fakadó pixelpontosság és a modern digitális felhasználói élmény tökéletes szintézise.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 hover:border-[#00B5F1]/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-[#00B5F1] mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Korszerű Architektúra</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Next.js 16, React 19 és egyedi kódolású WordPress. Villámgyors, biztonságos és skálázható felületek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interaktív Szakmai Idővonal */}
      <section className="py-24 bg-slate-950 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block relative pl-6 mb-4">
              <span className="text-xs uppercase font-black tracking-[0.4em] text-[#00B5F1] mb-2 block">
                Szakmai Mérföldkövek
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-linear-to-b from-[#00B5F1] to-[#5B21B6]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Szakmai utam & tapasztalatom
            </h2>
          </div>

          <Timeline />
        </div>
      </section>

      {/* 4. Munkafolyamat lépései */}
      <section className="py-24 bg-slate-900/30 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Hogyan dolgozunk együtt?
            </h2>
            <p className="text-slate-400">
              Átlátható, felesleges körök nélküli folyamat a sikeres végeredményért.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative group hover:border-[#00B5F1]/50 transition-all duration-300"
              >
                <span className="text-xs font-mono font-bold text-[#00B5F1] block mb-3">
                  {step.icon}
                </span>
                <h3 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="py-24 bg-slate-950 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            Beszéljük át a te projektedet is!
          </h2>
          <p className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Kérj egyedi ajánlatot, és induljunk el egy közös, sikeres együttműködés felé.
          </p>
          <div className="pt-4">
            <Link
              href="/kapcsolat"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369a1] hover:to-[#6d28d9] text-white rounded-xl font-bold transition-all duration-300 shadow-xl shadow-sky-950/60 hover:scale-105 active:scale-95"
            >
              Egyedi árajánlat kérése
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
