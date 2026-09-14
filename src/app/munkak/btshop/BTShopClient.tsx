"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import {
  Database,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle2,
  ShoppingCart,
  Package,
  Truck,
  Search,
  Target,
} from "lucide-react";

export default function BTShopClient() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const kpiData = [
    {
      value: "3200+",
      label: "Aktív termék",
      sub: "Valós idejű szinkronban",
      icon: Package,
      color: "#00B5F1",
    },
    {
      value: "100%",
      label: "Automatizált",
      sub: "Megrendelés- és készletkezelés",
      icon: Zap,
      color: "#00B5F1",
    },
    {
      value: "3",
      label: "API Integráció",
      sub: "Logisztika és marketing",
      icon: Database,
      color: "#00B5F1",
    },
  ];

  const timelineSteps = [
    {
      number: "01",
      title: "Kulcs-Soft ERP Szinkron",
      description:
        "Kétirányú API összekötés a szerveren futó könyvelőprogrammal. Termékadatok, árak és készletek exportja, beérkező megrendelések importja.",
      icon: Database,
    },
    {
      number: "02",
      title: "Saját SEO Plugin",
      description:
        "Egyedi, a bolt specifikus igényeire írt WordPress plugin. Garantált maximális technikai SEO pontszám és dinamikus meta adatok.",
      icon: Search,
    },
    {
      number: "03",
      title: "Logisztika Automatizáció",
      description:
        "MPL és Foxpost API integráció a zökkenőmentes csomagkezelésért és szállítási címke generálásért.",
      icon: Truck,
    },
    {
      number: "04",
      title: "Data-Driven Marketing",
      description:
        "Google Search Console, GA4 és Merchant Center bekötés dinamikus, napi szintű termék feed XML szinkronizációval.",
      icon: Target,
    },
  ];

  const techStack = [
    "WooCommerce",
    "WordPress",
    "REST API",
    "Kulcs-Soft",
    "MPL API",
    "Foxpost API",
    "Google Analytics 4",
    "Google Merchant Center",
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
              BTShop.hu:{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#0095C7]">
                100%-ban Automatizált
              </span>
              <br />
              E-kereskedelmi Ökoszisztéma
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
              <span className="text-[#00B5F1] font-semibold">
                3200+ termék.
              </span>{" "}
              <span className="text-[#00B5F1] font-semibold">
                Zéró manuális adminisztráció.
              </span>{" "}
              Egyedi könyvelőszoftver-integráció és saját fejlesztésű SEO motor.
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
              3000+ Termék, Zéró Manuális Adminisztráció
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Egy több mint 3000 termékkel dolgozó webáruház esetében a manuális
              készletkezelés és számlázás nem opció — az üzletmenet gátja. Az
              ügyfél alapvető elvárása az volt, hogy a weboldal tökéletes
              szimbiózisban működjön a saját szerverén futó{" "}
              <span className="text-[#00B5F1] font-semibold">Kulcs-Soft</span>{" "}
              könyvelőprogramjával, és a logisztikától a marketingig minden
              emberi beavatkozás nélkül történjen.
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
              API-Vezérelt Adatközpont
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              A 16 éves WordPress fejlesztői rutinomat felhasználva nem csupán
              egy WooCommerce áruházat építettem, hanem egy robusztus,
              API-vezérelt adatközpontot.
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

      {/* GALLERY SECTION */}
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
              Galéria
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              A Rendszer Élőben
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Package,
                label: "Termékoldal",
                image: "/assets/banners/webdude-hero.webp",
              },
              {
                icon: ShoppingCart,
                label: "Kosár folyamat",
                image: "/assets/banners/hero_banner1.png",
              },
              {
                icon: Globe,
                label: "Mobil nézet",
                image: "/assets/banners/szeged-terkozeves.webp",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/80 hover:border-[#00B5F1]/50 hover:shadow-[0_20px_60px_rgba(0,181,241,0.2)] overflow-hidden transition-all duration-300 group"
              >
                <div className="aspect-4/3 bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#00B5F1]/10 group-hover:bg-[#00B5F1]/20 transition-colors" />
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#00B5F1]/20 flex items-center justify-center group-hover:bg-[#00B5F1]/30 transition-colors backdrop-blur-sm">
                      <item.icon className="w-8 h-8 text-[#00B5F1]" />
                    </div>
                    <p className="text-sm text-slate-200 font-semibold">
                      {item.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
                "3200+ Aktív termék valós idejű szinkronban",
                "100% Automatizált rendelés- és készletkezelés",
                "Zéró manuális adminisztráció",
                "Lighthouse 96/100 pontszám",
                "+40% konverzió növekedés",
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
              Hasonló Projektet Szeretnél?
            </h2>
            <p className="text-lg text-slate-400 mb-8">
              Automatizált webshop, ERP integráció vagy egyedi fejlesztés?
              Beszéljünk róla.
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
