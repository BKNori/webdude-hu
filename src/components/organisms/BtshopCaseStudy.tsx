"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { Work } from "@/types/work";
import { useRef } from "react";

interface BtshopCaseStudyProps {
  project: Work;
}

export default function BtshopCaseStudy({ project }: BtshopCaseStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 300]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    shouldReduceMotion ? [1, 1] : [1, 0]
  );

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      {/* Hero Szekció - Parallax Effect */}
      <section
        ref={containerRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <Image
            src="/assets/portfolio/btshop/btshop-banner.webp"
            alt="BTShop.hu - Enterprise E-commerce & Kulcs-Soft Integráció"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-bg-base" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1,
              ease: "easeOut",
            }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.2,
                duration: shouldReduceMotion ? 0 : 0.6,
              }}
              className="inline-block px-6 py-3 bg-sky-500/10 border border-sky-500/30 rounded-full backdrop-blur-sm"
            >
              <span className="text-sky-400 text-sm font-bold uppercase tracking-widest">
                {project.year || new Date().getFullYear()} – {project.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.4,
                duration: shouldReduceMotion ? 0 : 0.8,
              }}
              className="text-5xl sm:text-6xl md:text-8xl font-bold leading-tight"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.6,
                duration: shouldReduceMotion ? 0 : 0.8,
              }}
              className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light"
            >
              {project.description}
            </motion.p>

            {/* Szolgáltatás Kiemelők */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.8,
                duration: shouldReduceMotion ? 0 : 0.8,
              }}
              className="flex flex-wrap justify-center gap-4 pt-8"
            >
              {[
                "Enterprise E-commerce",
                "Kulcs-Soft ERP",
                "WooCommerce",
                "SEO Plugin",
                "Merchant Center",
                "Logisztika",
              ].map((service, index) => (
                <motion.span
                  key={service}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.9 + index * 0.1,
                    duration: shouldReduceMotion ? 0 : 0.4,
                  }}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-full text-sm text-slate-300 backdrop-blur-sm"
                >
                  {service}
                </motion.span>
              ))}
            </motion.div>

            {project.website && (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : 1.2,
                  duration: shouldReduceMotion ? 0 : 0.6,
                }}
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-cta-from to-cta-to hover:to-cta-hover text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-cta-to/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
              >
                Webshop megtekintése →
              </motion.a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Kihívás és Megoldás Szekció */}
      <section className="py-32 px-6 bg-linear-to-b from-bg-base to-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-sky-400">A Kihívás</span> és a Megoldás
            </h2>
            <div className="w-24 h-1 bg-sky-500 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-sky-400 mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-sky-500 rounded-full" />
                  Enterprise E-commerce
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  Egy több mint 3000 termékkel dolgozó webáruház esetében a
                  manuális készletkezelés és számlázás nem opció – az üzletmenet
                  gátja. Az ügyfél alapvető elvárása az volt, hogy a weboldal
                  tökéletes szimbiózisban működjön a saját szerverén futó
                  könyvelői programjával (Kulcs-Soft), és a logisztikától a
                  marketingig minden emberi beavatkozás nélkül történjen.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-sky-400 mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-sky-500 rounded-full" />
                  Komplex Automatizáció
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  A 16 éves WordPress fejlesztői rutinomat felhasználva nem
                  csupán egy WooCommerce áruházat építettem, hanem egy
                  robusztus, API-vezérelt adatközpontot. Kétirányú ERP
                  szinkronizáció, saját fejlesztésű SEO plugin, komplex
                  logisztikai API integrációk és data-driven marketing – minden
                  egy integrált rendszerben.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden group">
                <Image
                  src="/assets/portfolio/btshop/btshop-banner-2.webp"
                  alt="BTShop.hu Enterprise Dashboard"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden group">
                <Image
                  src="/assets/portfolio/btshop/bt-shop-weboldal-screen.webp"
                  alt="BTShop.hu Weboldal Screenshot"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technikai Szolgáltatások Szekció */}
      <section className="py-32 px-6 bg-linear-to-b from-slate-900/30 to-sky-950/20 border-y border-sky-500/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-6 py-3 bg-sky-500/20 border border-sky-500/40 rounded-full backdrop-blur-sm mb-6"
            >
              <span className="text-sky-400 text-sm font-bold uppercase tracking-widest">
                ⚡ Enterprise Fejlesztések
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Technikai <span className="text-sky-400">Megoldások</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto">
              Komplex API integrációk és egyedi fejlesztések az automatizációért
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Kétirányú ERP Szinkronizáció",
                description:
                  "Egyedi API összekötés a szerveren futó Kulcs-Soft könyvelőprogrammal. A termékadatok, árak és készletek exportja, valamint a beérkező megrendelések importja teljesen automatizált.",
                icon: "🔄",
              },
              {
                title: "Saját Fejlesztésű SEO Plugin",
                description:
                  "A dobozos megoldások helyett egy egyedi, a bolt specifikus igényeire írt WordPress plugint készítettem, amely garantálja a maximális technikai SEO pontszámot.",
                icon: "🔍",
              },
              {
                title: "Komplex Logisztika",
                description:
                  "MPL és Foxpost API integráció a zökkenőmentes csomagkezelésért és szállítási címke generálásért. Automatizált szállítási folyamatok.",
                icon: "📦",
              },
              {
                title: "Data-Driven Marketing",
                description:
                  "Google Search Console, Google Analytics 4 és Merchant Center bekötés dinamikus, napi szintű termék feed (XML) szinkronizációval. Marketing automatizáció.",
                icon: "📊",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 hover:border-sky-500/50 transition-colors duration-300 group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eredmények Szekció */}
      <section className="py-32 px-6 bg-linear-to-br from-sky-500/10 to-blue-500/10 border-y border-sky-500/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-12">
              <span className="text-sky-400">Az Eredmény</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { value: "3200+", label: "Aktív Termék" },
                { value: "100%", label: "Automatizált" },
                { value: "3", label: "API Integráció" },
                { value: "1", label: "Saját SEO Plugin" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-900/60 backdrop-blur-sm border border-sky-500/30 rounded-3xl p-8"
                >
                  <div className="text-5xl md:text-6xl font-bold text-sky-400 mb-3">
                    {stat.value}
                  </div>
                  <div className="text-slate-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {project.results?.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-900/60 backdrop-blur-sm border border-sky-500/30 rounded-3xl p-8"
                >
                  <div className="text-sky-400 font-bold text-xl mb-3">
                    {result}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-slate-200 text-xl max-w-3xl mx-auto leading-relaxed">
              A BTShop.hu projekt tökéletes példája annak, amikor a nagy
              volumenű e-commerce és a legmodernebb API technológiák egy kézben
              összpontosul. Az eredmény egy teljesen automatizált, robusztus
              rendszer, ami maximalizálja a hatékonyságot és minimalizálja a
              manuális munkát.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Szekció */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <h2 className="text-4xl md:text-6xl font-bold">
              Készen állsz a <span className="text-sky-400">következő</span>{" "}
              szintre?
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Hogyan tudnám a te vállalkozásodat is a digitális élvonalba
              repíteni enterprise e-commerce megoldásokkal?
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/kapcsolat"
                className="px-10 py-5 bg-gradient-to-r from-cta-from to-cta-to hover:to-cta-hover text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-cta-to/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
              >
                Ajánlatot kérek →
              </Link>
              <Link
                href="/munkak"
                className="px-10 py-5 border border-slate-600 hover:border-sky-500 text-slate-300 hover:text-sky-400 font-bold rounded-full transition-all duration-300"
              >
                Vissza a munkákhoz
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
