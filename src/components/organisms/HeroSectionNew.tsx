"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  Zap,
  TrendingUp,
  Globe,
  Star,
  CheckCircle2,
  BarChart3,
  Bot,
  Code2,
  Palette,
} from "lucide-react";

const dashboardCards = [
  {
    id: "traffic",
    icon: TrendingUp,
    label: "Organikus forgalom",
    value: "+184%",
    sub: "6 hónap alatt",
    color: "from-[#00B5F1]/20 to-[#00B5F1]/5",
    iconColor: "text-[#00B5F1]",
    accent: "#00B5F1",
  },
  {
    id: "conversion",
    icon: BarChart3,
    label: "Konverzió növekedés",
    value: "+40%",
    sub: "A/B tesztelés után",
    color: "from-[#00B5F1]/20 to-[#00B5F1]/5",
    iconColor: "text-[#00B5F1]",
    accent: "#00B5F1",
  },
  {
    id: "lighthouse",
    icon: Zap,
    label: "Lighthouse Score",
    value: "97 / 100",
    sub: "Core Web Vitals",
    color: "from-[#00B5F1]/20 to-[#00B5F1]/5",
    iconColor: "text-[#00B5F1]",
    accent: "#00B5F1",
  },
];

const techBadges = [
  { label: "Next.js 16", icon: Globe },
  { label: "React 19", icon: Code2 },
  { label: "AI Automation", icon: Bot },
  { label: "Grafika", icon: Palette },
];

export default function HeroSectionNew() {
  const sectionRef = useRef<HTMLElement>(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const panelY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const panelRotateX = useTransform(scrollYProgress, [0, 0.5], [-4, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full min-h-screen overflow-hidden bg-bg-base flex items-center"
      aria-label="Főoldal hero szekció"
    >
      {/* Háttérkép banner */}
      <Image
        src="/assets/banners/webdude-hero.webp"
        alt="WebDude Webfejlesztés & AI Banner"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover -z-20"
      />

      {/* Sötétítő réteg az olvashatóságért */}
      <div
        className="absolute inset-0 bg-slate-950/70 -z-10"
        aria-hidden="true"
      />

      {/* SVG Mesh Grid háttér */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(rgba(0,181,241,0.07) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* CSS Glow blobs */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute -top-1/4 -left-1/4 w-[55vw] h-[55vw] rounded-full bg-ambient-glow-1 hero-blob-1"
          style={{
            background:
              "radial-gradient(circle, rgba(0,181,241,0.28) 0%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.18,
          }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full hero-blob-2"
          style={{
            background:
              "radial-gradient(circle, rgba(255,122,0,0.25) 0%, transparent 70%)",
            filter: "blur(100px)",
            opacity: 0.14,
          }}
        />
      </div>

      {/* Keyframes inline */}
      <style>{`
        .hero-blob-1 {
          animation: hero-glow-1 20s ease-in-out infinite;
        }
        .hero-blob-2 {
          animation: hero-glow-2 25s ease-in-out infinite;
        }
        .shimmer-text {
          animation: shimmer-text 4s linear infinite;
        }
        .float-card-main {
          animation: float-card 6s ease-in-out infinite;
        }
        .float-card-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .float-card-sub {
          animation: float-card 8s ease-in-out infinite 1s;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-blob-1,
          .hero-blob-2,
          .shimmer-text,
          .float-card-main,
          .float-card-delayed,
          .float-card-sub {
            animation: none !important;
          }
        }
        @keyframes hero-glow-1 {
          0%,100%{transform:translate(0,0) scale(1);}
          50%{transform:translate(80px,-60px) scale(1.15);}
        }
        @keyframes hero-glow-2 {
          0%,100%{transform:translate(0,0) scale(1);}
          50%{transform:translate(-100px,70px) scale(1.2);}
        }
        @keyframes float-card {
          0%,100%{transform:translateY(0px) rotate(-1deg);}
          50%{transform:translateY(-12px) rotate(-1deg);}
        }
        @keyframes float-delayed {
          0%,100%{transform:translateY(0px) rotate(1deg);}
          50%{transform:translateY(-16px) rotate(1deg);}
        }
        @keyframes pulse-dot {
          0%,100%{opacity:1;transform:scale(1);}
          50%{opacity:0.5;transform:scale(0.8);}
        }
        @keyframes shimmer-text {
          0%{background-position:-200% center;}
          100%{background-position:200% center;}
        }
      `}</style>

      {/* Fő tartalom */}
      <div className="relative z-10 w-full max-w-360 mx-auto px-6 lg:px-12 xl:px-16 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* BAL OLDAL — tipográfia + CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            {/* Eyebrow badge */}
            <motion.div variants={fadeUpVariants}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-[#00B5F1]/25 backdrop-blur-sm mb-8">
                <span
                  className="w-2 h-2 rounded-full bg-[#00B5F1]"
                  style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                  aria-hidden="true"
                />
                <span className="text-[#00B5F1] text-xs font-bold uppercase tracking-widest">
                  Kecskemét · Magyarország · Távolról is
                </span>
              </div>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-[3.9rem] font-extrabold tracking-tight leading-[1.1] text-white mb-6"
            >
              Weboldal,{" "}
              <span
                className="shimmer-text"
                style={{
                  background:
                    "linear-gradient(90deg, #00B5F1 0%, #00D4FF 50%, #0095C7 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ami dolgozik
              </span>{" "}
              helyetted — webfejlesztés, AI automatizáció és grafikai tervezés
              Kecskemétről, országosan
            </motion.h1>

            {/* Alcím */}
            <motion.p
              variants={fadeUpVariants}
              className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl mb-8"
            >
              Webfejlesztés, AI automatizáció és grafikai tervezés{" "}
              <span className="text-white font-semibold">Kecskemétről</span>,
              országosan. 26 év tapasztalat — egy emberrel, ügynökségi
              mellébeszélés nélkül.
            </motion.p>

            {/* Trust jelek */}
            <motion.ul
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10"
              aria-label="Garanciák"
            >
              {[
                "Közvetlen kommunikáció",
                "30 napos garancia",
                "Fix határidők",
              ].map((item) => (
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

            {/* CTA gombok */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Link
                  href="/kapcsolat"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-base uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-offset-2 focus:ring-offset-bg-base"
                  style={{
                    background:
                      "linear-gradient(135deg, #00B5F1 0%, #0095C7 100%)",
                    boxShadow: "0 0 32px rgba(0,181,241,0.35)",
                  }}
                  aria-label="Egyedi árajánlat kérése"
                >
                  <span>EGYEDI ÁRAJÁNLAT KÉRÉSE</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/munkak"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-slate-200 text-base bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-[#00B5F1]/40 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-offset-2 focus:ring-offset-bg-base"
                  aria-label="Esettanulmányok és referenciák megtekintése"
                >
                  <span>Esettanulmányok</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Star rating */}
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

          {/* JOBB OLDAL — 3D Lebegő Bento Dashboard */}
          <motion.div
            style={{ y: panelY, rotateX: panelRotateX }}
            className="relative flex flex-col items-center justify-center lg:items-end"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 20,
              delay: 0.3,
            }}
          >
            {/* Főpanel */}
            <div
              className="relative w-full max-w-sm lg:max-w-md rounded-3xl overflow-hidden border border-white/10 backdrop-blur-xl float-card-main"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Panel header — macOS dots */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full bg-red-500/80"
                    aria-hidden="true"
                  />
                  <div
                    className="w-3 h-3 rounded-full bg-yellow-500/80"
                    aria-hidden="true"
                  />
                  <div
                    className="w-3 h-3 rounded-full bg-green-500/80"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  webdude.hu — live dashboard
                </span>
                <div
                  className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-wider"
                  aria-label="Élő rendszer"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                    aria-hidden="true"
                  />
                  Live
                </div>
              </div>

              {/* KPI kártyák */}
              <div className="p-6 grid grid-cols-1 gap-4">
                {dashboardCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: 0.5 + idx * 0.12,
                      }}
                      className={`flex items-center justify-between p-4 rounded-2xl bg-linear-to-br ${card.color} border border-white/8`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: `${card.accent}18` }}
                        >
                          <Icon
                            className={`w-5 h-5 ${card.iconColor}`}
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-medium leading-tight">
                            {card.label}
                          </p>
                          <p className="text-[10px] text-slate-600 mt-0.5">
                            {card.sub}
                          </p>
                        </div>
                      </div>
                      <div
                        className="text-xl font-extrabold tabular-nums"
                        style={{ color: card.accent }}
                      >
                        {card.value}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Tech badges */}
              <div className="px-6 pb-6 flex flex-wrap gap-2">
                {techBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium"
                    >
                      <Icon className="w-3 h-3" aria-hidden="true" />
                      {badge.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lebegő mellék-kártya — jobb fent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="absolute -top-6 -right-4 lg:-right-8 z-10 float-card-delayed"
              aria-hidden="true"
            >
              <div
                className="px-4 py-3 rounded-2xl border border-[#00B5F1]/25 text-[#00B5F1] text-xs font-bold flex items-center gap-2 backdrop-blur-xl"
                style={{
                  background: "rgba(0,181,241,0.08)",
                  boxShadow: "0 8px 32px rgba(0,181,241,0.15)",
                }}
              >
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Lighthouse 97/100
              </div>
            </motion.div>

            {/* Lebegő mellék-kártya — bal lent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.0,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="absolute -bottom-6 -left-4 lg:-left-8 z-10 float-card-sub"
              aria-hidden="true"
            >
              <div
                className="px-4 py-3 rounded-2xl border border-[#00B5F1]/25 text-[#00B5F1] text-xs font-bold flex items-center gap-2 backdrop-blur-xl"
                style={{
                  background: "rgba(0,181,241,0.08)",
                  boxShadow: "0 8px 32px rgba(0,181,241,0.15)",
                }}
              >
                <Zap className="w-4 h-4" aria-hidden="true" />
                Új lead érkezett
              </div>
            </motion.div>
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
