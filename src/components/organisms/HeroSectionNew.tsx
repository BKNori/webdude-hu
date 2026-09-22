"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import HeroDashboardMockup from "@/components/molecules/HeroDashboardMockup";

// Kulcsszavak kiemelve a jobb scannelhetőség és AEO-felismerés érdekében
const serviceHighlights = [
  "Weboldal készítés",
  "WordPress fejlesztés",
  "SEO optimalizálás",
  "Grafikai tervezés",
];

const trustPoints = [
  "Közvetlen kommunikáció — nincs közvetítő",
  "30 napos hibajavítási garancia",
  "Fix árak, fix határidők",
];

export default function HeroSectionNew() {
  const sectionRef = useRef<HTMLElement>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 90, damping: 18 },
    },
  };

  // Scroll-bound parallax: a dashboard finoman elmozdul görgetésre
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const panelY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.25]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full min-h-screen overflow-hidden bg-bg-base flex items-center"
      aria-label="Főoldal hero szekció"
    >
      {/* Brand banner — prémium kontraszt struktúra */}
      <Image
        alt="WebDude — Weboldal készítés, WordPress, SEO és grafikai tervezés Kecskemétről"
        className="object-cover -z-20 opacity-40 mix-blend-luminosity"
        fill
        priority
        quality={95}
        sizes="100vw"
        src="/assets/banners/webdude-hero.webp"
      />
      <div
        className="absolute inset-0 bg-bg-base/80 backdrop-blur-xs -z-10"
        aria-hidden="true"
      />

      {/* Tiszta CSS mesh grid — nincs WebGL */}
      <div
        className="absolute inset-0 bg-mesh-grid opacity-70 pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Finom fénygömbök — kék-lila glow + halvány rim light */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 pointer-events-none overflow-hidden -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute -top-1/4 -left-1/4 w-[55vw] h-[55vw] rounded-full hero-blob-1"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 181, 241,0.28) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full hero-blob-2"
          style={{
            background:
              "radial-gradient(circle, rgba(91, 33, 182,0.18) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </motion.div>

      {/* Fő tartalom */}
      <div className="relative z-10 w-full max-w-360 mx-auto px-6 lg:px-12 xl:px-16 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* BAL OLDAL — ügyfélszerző üzenet + egyetlen CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            {/* Lokáció badge — Kecskemét + országos */}
            <motion.div variants={fadeUpVariants}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-[#00B5F1]/25 backdrop-blur-sm mb-8">
                <span
                  className="w-2 h-2 rounded-full bg-[#00B5F1] hero-pulse-dot"
                  aria-hidden="true"
                />
                <span className="text-[#00B5F1] text-xs font-bold uppercase tracking-widest">
                  Kecskemét · Országos kiszolgálás · Távolról is
                </span>
              </div>
            </motion.div>

            {/* H1 — egyetlen, ügyfélszerző ígéret (CRO & SEO optimalizált) */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-[3.9rem] font-extrabold tracking-tight leading-[1.1] text-white mb-6"
            >
              Weboldal, ami nemcsak{" "}
              <span
                className="hero-shimmer-text"
                style={{
                  background:
                    "linear-gradient(90deg, #00B5F1 0%, #38bdf8 50%, #5B21B6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                szép, hanem ügyfeleket
              </span>{" "}
              is hoz.
            </motion.h1>

            {/* Alcím — kulcsszavak explicit felsorolása (AEO & SEO) */}
            <motion.p
              variants={fadeUpVariants}
              className="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-xl mb-6"
            >
              Egy kézben kapod a{" "}
              <span className="text-[#e2e8f0] font-semibold">
                weboldal készítést
              </span>
              ,{" "}
              <span className="text-[#e2e8f0] font-semibold">
                WordPress fejlesztést
              </span>
              ,{" "}
              <span className="text-[#e2e8f0] font-semibold">SEO-t</span> és{" "}
              <span className="text-[#e2e8f0] font-semibold">
                grafikai tervezést
              </span>{" "}
              – ügynökségi mellébeszélés nélkül,{" "}
              <span className="text-[#e2e8f0] font-semibold">
                26 év kreatív és 16 év webfejlesztői tapasztalattal.
              </span>
            </motion.p>

            {/* Szolgáltatás kulcsszavak — vizuális scannelhetőség + AEO */}
            <motion.ul
              variants={fadeUpVariants}
              className="flex flex-wrap gap-2 mb-8"
              aria-label="Fő szolgáltatások"
            >
              {serviceHighlights.map((service) => (
                <li
                  key={service}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00B5F1]/8 border border-[#00B5F1]/20 text-xs font-semibold text-[#00B5F1] tracking-wide"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#00B5F1]"
                    aria-hidden="true"
                  />
                  {service}
                </li>
              ))}
            </motion.ul>

            {/* Trust jelek */}
            <motion.ul
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10"
              aria-label="Garanciák és előnyök"
            >
              {trustPoints.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-400 font-medium"
                >
                  <CheckCircle2
                    className="w-4 h-4 text-[#00B5F1] shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </motion.ul>

            {/* CTA hierarchia — 1 primer gomb + 1 ghost/underline link */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col items-start gap-5"
            >
              {/* Primer CTA — egyetlen telített gomb */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Link
                  href="/kapcsolat"
                  id="hero-primary-cta"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-slate-950 text-base uppercase tracking-wider bg-linear-to-r from-[#00B5F1] to-[#5B21B6] hover:from-[#5B21B6] hover:to-[#5B21B6] shadow-[0_8px_32px_rgba(0,181,241,0.35)] hover:shadow-[0_12px_40px_rgba(0,181,241,0.5)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-offset-2 focus:ring-offset-bg-base"
                  aria-label="Projektfelmérés kérése — ingyenes konzultáció"
                >
                  <span>Kérj projektfelmérést</span>
                  <ArrowRight
                    className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>

              {/* Másodlagos link — ghost/underline, nem versenyez a primer CTA-val */}
              <Link
                href="/munkak"
                id="hero-secondary-cta"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-[#00B5F1] underline decoration-slate-700 underline-offset-4 hover:decoration-[#00B5F1] transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-bg-base"
                aria-label="Referenciamunkáim megtekintése"
              >
                Referenciamunkáim megtekintése
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Star rating — social proof */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-10 flex items-center gap-3 text-slate-400 text-sm"
            >
              <div className="flex gap-0.5" aria-label="5 csillag értékelés">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#00B5F1] fill-[#00B5F1]"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span>
                <strong className="text-white">4.9/5</strong> — 47+ elégedett
                ügyfél
              </span>
            </motion.div>
          </motion.div>

          {/* JOBB OLDAL — lebegő Bento Dashboard mockup */}
          <motion.div
            style={{ y: panelY }}
            className="relative flex items-center justify-center lg:justify-end"
          >
            <HeroDashboardMockup />
          </motion.div>
        </div>
      </div>

      {/* Scroll jelző */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs"
        aria-hidden="true"
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
  );
}
