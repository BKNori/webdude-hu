"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Timeline from "@/components/molecules/Timeline";
import Surface from "@/components/atoms/Surface";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import {
  ArrowRight,
  Award,
  Sparkles,
  Code2,
  HeartHandshake,
} from "lucide-react";

export default function AboutContentClient() {
  const shouldReduceMotion = useHydratedReducedMotion();
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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      {/* 1. Hero Szekció (Személyes felütés) */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-24 overflow-hidden bg-[#F8FAFC] dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-white/10">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-linear-to-br from-[#0369A1]/10 to-[#6D28D9]/10 dark:from-[#00B5F1]/18 dark:to-[#7C3AED]/16 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-linear-to-br from-[#6D28D9]/10 to-transparent dark:from-[#7C3AED]/16 dark:to-transparent rounded-full blur-[100px]" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-mesh opacity-25 dark:opacity-35 z-0"
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -32 }
            }
            animate={{ opacity: 1, x: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 100, damping: 20 }
            }
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 dark:bg-white/6 border border-slate-200/90 dark:border-white/15 dark:border-t-white/25 backdrop-blur-md shadow-[0_6px_18px_rgba(3,105,161,0.08)] dark:shadow-none">
              <Sparkles
                className="w-3.5 h-3.5 text-[#0369A1] dark:text-[#00B5F1]"
                aria-hidden="true"
              />
              <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1]">
                26 Év Tapasztalat & Digitális Kézművesség
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-[#0F172A] dark:text-white leading-tight tracking-tight">
              Nem egy ügynökséggel, hanem{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA]">
                velem dolgozol
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#334155] dark:text-slate-300 max-w-lg leading-relaxed">
              Balog Norbert vagyok, a WebDude alapítója és fejlesztője. Több
              mint{" "}
              <strong className="text-[#0F172A] dark:text-white">16 éve</strong>{" "}
              építek weboldalakat és{" "}
              <strong className="text-[#0F172A] dark:text-white">26 éve</strong>{" "}
              foglalkozom professzionális grafikával és tipográfiával.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/kapcsolat"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold uppercase tracking-wider text-sm text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] shadow-[0_8px_28px_rgba(7,89,133,0.4)] transition-all duration-300 group"
              >
                Egyedi árajánlat kérése
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/munkak"
                className="inline-flex items-center justify-center px-6 py-4 rounded-full font-semibold text-sm text-[#0F172A] dark:text-slate-200 bg-white dark:bg-[#16223B]/80 border border-slate-300 dark:border-white/15 hover:border-[#0369A1]/60 dark:hover:border-[#00B5F1]/60 hover:text-[#0369A1] dark:hover:text-[#00B5F1] transition-colors"
              >
                Munkáim megtekintése
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 32 }
            }
            animate={{ opacity: 1, x: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 100, damping: 20, delay: 0.15 }
            }
            className="relative w-full flex justify-center lg:justify-end"
          >
            <div className="luminous-card relative w-full max-w-md aspect-4/5 overflow-hidden p-3">
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
      <Surface tone="night-lift" aurora className="py-24 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
            <div className="inline-block relative pl-6">
              <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] mb-2 block">
                Filozófia & Szemlélet
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-linear-to-b from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#5B21B6]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#0F172A] dark:text-white leading-tight tracking-tight">
              A közvetlen partnerség ereje
            </h2>
            <p className="text-lg text-[#334155] dark:text-slate-300 leading-relaxed">
              Nincsenek account managerek, nincs egymásra mutogatás, és nem
              veszik el az üzeneted a szervezeti szintek között. Egyetlen kézben
              összpontosul a grafikai tervezés, a frontend fejlesztés és a
              technikai keresőoptimalizálás.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="luminous-card p-8">
              <div className="w-12 h-12 rounded-xl bg-[#0369A1]/10 dark:bg-[#00B5F1]/12 border border-[#0369A1]/25 dark:border-[#00B5F1]/25 flex items-center justify-center text-[#0369A1] dark:text-[#00B5F1] mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-3">
                Közvetlen Kapcsolat
              </h3>
              <p className="text-[#334155] dark:text-slate-300 text-sm leading-relaxed">
                Végig velem tartod a kapcsolatot az első skicctől a publikálásig
                és a későbbi fejlesztésekig.
              </p>
            </div>

            <div className="luminous-card p-8">
              <div className="w-12 h-12 rounded-xl bg-[#6D28D9]/10 dark:bg-[#7C3AED]/15 border border-[#6D28D9]/25 dark:border-[#A78BFA]/30 flex items-center justify-center text-[#6D28D9] dark:text-[#A78BFA] mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-3">
                26 Év Grafikai Múlt
              </h3>
              <p className="text-[#334155] dark:text-slate-300 text-sm leading-relaxed">
                A nyomdaipari precizitásból fakadó pixelpontosság és a modern
                digitális felhasználói élmény tökéletes szintézise.
              </p>
            </div>

            <div className="luminous-card p-8">
              <div className="w-12 h-12 rounded-xl bg-[#0369A1]/10 dark:bg-[#00B5F1]/12 border border-[#0369A1]/25 dark:border-[#00B5F1]/25 flex items-center justify-center text-[#0369A1] dark:text-[#00B5F1] mb-6">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-white mb-3">
                Korszerű Architektúra
              </h3>
              <p className="text-[#334155] dark:text-slate-300 text-sm leading-relaxed">
                Next.js 16, React 19 és egyedi kódolású WordPress. Villámgyors,
                biztonságos és skálázható felületek.
              </p>
            </div>
          </div>
        </div>
      </Surface>

      {/* 3. Interaktív Szakmai Idővonal */}
      <Surface tone="night" aurora className="py-24 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block relative pl-6 mb-4">
              <span className="eyebrow-badge text-[#0369A1] dark:text-[#00B5F1] mb-2 block">
                Szakmai Mérföldkövek
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-linear-to-b from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#5B21B6]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] dark:text-white">
              Szakmai utam & tapasztalatom
            </h2>
          </div>

          <Timeline />
        </div>
      </Surface>

      {/* 4. Munkafolyamat lépései */}
      <Surface tone="slate-lift" aurora grid className="py-24 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] dark:text-white mb-4">
              Hogyan dolgozom veled?
            </h2>
            <p className="text-[#334155] dark:text-slate-300">
              Átlátható, felesleges körök nélküli folyamat a sikeres
              végeredményért.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="luminous-card p-6 relative group">
                <span className="text-xs font-mono font-bold text-[#0369A1] dark:text-[#00B5F1] block mb-3">
                  {step.icon}
                </span>
                <h3 className="text-base font-bold text-[#0F172A] dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Surface>

      {/* 5. Bottom CTA */}
      <Surface tone="night-lift" aurora className="py-24 md:py-28 text-center">
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] dark:text-white leading-tight tracking-tight">
            Beszéljük át a te projektedet is!
          </h2>
          <p className="text-lg text-[#334155] dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Kérj egyedi ajánlatot, és induljunk el egy közös, sikeres
            együttműködés felé.
          </p>
          <div className="pt-4">
            <Link
              href="/kapcsolat"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white rounded-full font-semibold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_8px_28px_rgba(7,89,133,0.4)] hover:scale-[1.03] active:scale-95"
            >
              Egyedi árajánlat kérése
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Surface>
    </div>
  );
}
