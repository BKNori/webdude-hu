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

interface HuMagoCaseStudyProps {
  project: Work;
}

export default function HuMagoCaseStudy({ project }: HuMagoCaseStudyProps) {
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
            src="/assets/portfolio/hu-mago-kft/hu-mago-kft -banner.webp"
            alt="HU-MÁGÓ Kft. - Ipari Gépkereskedelem Innováció"
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
              className="inline-block px-6 py-3 bg-indigo-500/10 border border-indigo-500/30 rounded-full backdrop-blur-sm"
            >
              <span className="text-indigo-400 text-sm font-bold uppercase tracking-widest">
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
                "E-kereskedelem",
                "SEO",
                "GDPR",
                "Branding",
                "AI Tech",
                "Nyomdai anyagok",
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
                className="inline-flex items-center gap-2 px-10 py-5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/25"
              >
                Weboldal megtekintése →
              </motion.a>
            )}
          </motion.div>
        </div>
      </section>

      {/* A Kihívás és Megoldás Szekció */}
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
              <span className="text-indigo-400">A Kihívás</span> és a Megoldás
            </h2>
            <div className="w-24 h-1 bg-indigo-500 rounded-full" />
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
                <h3 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                  Hagyományos vs. Innováció
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  A HU-MÁGÓ Kft. számára egy komplex digitális transzformációs
                  projektet valósítottam meg. A hagyományos ipari
                  gépkereskedelem területén működő vállalat modern,
                  technológia-fókuszú megjelenésre volt szüksége, ami nemcsak a
                  termékeket, hanem az innovációt is bemutatja. A cél egy olyan
                  teljes körű rendszer volt, ami ötvözi a prémium
                  e-kereskedelmet a legmodernebb AI technológiákkal.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-indigo-400 mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                  Stratégiai Megközelítés
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  A projekt során egy komplex ökoszisztémát építettem fel:
                  WooCommerce alapú e-kereskedelmi rendszert, stratégiai SEO
                  infrastruktúrát, GDPR-kompatibilis adatkezelést, prémium
                  offline brandinget, és a leginnovatívabb elemként egyedi AI
                  prompt reklám generátort. Minden komponens egységesen
                  illeszkedik, maximális konverziót és jogi biztonságot
                  biztosítva.
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
                  src="/assets/portfolio/hu-mago-kft/humago-fal-copy.webp"
                  alt="HU-MÁGÓ Kft. Hero Banner"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden group">
                <Image
                  src="/assets/portfolio/hu-mago-kft/hu-mago-magazin-mocdddkup-copy.webp"
                  alt="HU-MÁGÓ Kft. Katalógus"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Innováció Szekció - Kiemelt */}
      <section className="py-32 px-6 bg-linear-to-b from-slate-900/30 to-indigo-950/20 border-y border-indigo-500/20">
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
              className="inline-block px-6 py-3 bg-indigo-500/20 border border-indigo-500/40 rounded-full backdrop-blur-sm mb-6"
            >
              <span className="text-indigo-400 text-sm font-bold uppercase tracking-widest">
                🚀 Innovatív Technológia
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              AI Prompt{" "}
              <span className="text-indigo-400">Reklám Generátor</span>
            </h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto">
              Egyedi fejlesztésű mesterséges intelligencia alapú marketing
              automatizáció
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-indigo-950/30 border border-indigo-500/30 rounded-3xl p-12 backdrop-blur-sm shadow-2xl shadow-indigo-500/10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Forradalmasítsd a Marketinget AI-val
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  A HU-MÁGÓ Kft. számára egy egyedi, mesterséges intelligenciára
                  épülő &quot;AI prompt reklám generátort&quot; fejlesztettem.
                  Ez az innovatív megoldás automatizálja a hirdetési kreatívok
                  gyártását, minimalizálva a humán erőforrást és maximalizálva a
                  konverziót.
                </p>
                <div className="space-y-4">
                  {[
                    "Automatizált kreatív generálás",
                    "Konverzió-fókuszált prompt engineering",
                    "Skálázható marketing infrastruktúra",
                    "Valós idejű optimalizálás",
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                      <span className="text-slate-200">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-linear-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="text-6xl mb-4">🤖</div>
                    <div className="text-indigo-400 font-bold text-xl">
                      AI Powered
                    </div>
                    <div className="text-slate-400 text-sm mt-2">
                      Marketing Automation
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Szolgáltatások Részletes Szekció */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Teljes Körű <span className="text-indigo-400">Digitális</span>{" "}
              Transzformáció
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Minden, ami egy modern ipari vállalat digitális ökoszisztémájához
              szükséges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Komplex E-kereskedelem",
                description:
                  "Teljes körű, egyedi WooCommerce webshop fejlesztése, amely maximalizálja a konverziót és optimalizálja a vásárlói élményt.",
                icon: "🛒",
              },
              {
                title: "Stratégiai SEO",
                description:
                  "Keresőoptimalizálás a maximális organikus láthatóság és a stabil Google helyezések érdekében hosszú távon.",
                icon: "🔍",
              },
              {
                title: "GDPR Adatbiztonság",
                description:
                  "Precíz és teljes körű GDPR integráció, hogy a weboldal jogilag sebezhetetlen és transzparens legyen.",
                icon: "🔒",
              },
              {
                title: "Offline Branding",
                description:
                  "Prémium minőségű névjegykártya és termékkatalógus tervezése, ami tökéletes szinergiában van a digitális arculattal.",
                icon: "🎨",
              },
              {
                title: "AI Marketing Tech",
                description:
                  "Egyedi fejlesztésű AI prompt reklám generátor, ami forradalmasítja a marketing kreatívok gyártását.",
                icon: "🤖",
              },
              {
                title: "Teljes Ökoszisztéma",
                description:
                  "Digitális és offline világok tökéletes integrációja egy egységes, prémium márkaidentitás alatt.",
                icon: "🌐",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 hover:border-indigo-500/50 transition-colors duration-300 group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
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

      {/* Galéria és Showcase Szekció */}
      <section className="py-32 px-6 bg-linear-to-b from-slate-900/30 to-bg-base">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-indigo-400">Vizuális</span> Galéria
            </h2>
            <p className="text-slate-400 text-xl">
              A HU-MÁGÓ Kft. branding és digitális megjelenés vizuális elemei
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 relative aspect-4/3 rounded-3xl overflow-hidden group"
            >
              <Image
                src="/assets/portfolio/hu-mago-kft/hu-mago-magazin-mocdddkup-copy.webp"
                alt="HU-MÁGÓ Kft. Katalógus"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold text-xl">
                  Termékkatalógus
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-square rounded-3xl overflow-hidden group"
            >
              <Image
                src="/assets/portfolio/hu-mago-kft/hu-mago-nevjegyek-tervek.webp"
                alt="HU-MÁGÓ Kft. Névjegykártya"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold">Névjegykártya</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-video rounded-3xl overflow-hidden group"
            >
              <Image
                src="/assets/portfolio/hu-mago-kft/humago-allo-banner-a-shopbansss-cssopy-copy.webp"
                alt="HU-MÁGÓ Kft. Weboldal Banner"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold">Weboldal Design</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative aspect-video rounded-3xl overflow-hidden group"
            >
              <Image
                src="/assets/portfolio/hu-mago-kft/nevjegykartya-tervezes-es-nyomtatas.webp"
                alt="HU-MÁGÓ Kft. Nyomdai Anyagok"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold">Nyomdai Anyagok</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative aspect-video rounded-3xl overflow-hidden group"
            >
              <Image
                src="/assets/portfolio/hu-mago-kft/csaj-shop-copy.webp"
                alt="HU-MÁGÓ Kft. E-kereskedelem"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold">E-kereskedelem</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eredmények Szekció */}
      <section className="py-32 px-6 bg-linear-to-br from-indigo-500/10 to-purple-500/10 border-y border-indigo-500/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-12">
              <span className="text-indigo-400">Az Eredmény</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { value: "100%", label: "Digitális Transzformáció" },
                { value: "6+", label: "Szolgáltatás Típus" },
                { value: "AI", label: "Innovatív Tech" },
                { value: "GDPR", label: "Jogi Biztonság" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-900/60 backdrop-blur-sm border border-indigo-500/30 rounded-3xl p-8"
                >
                  <div className="text-5xl md:text-6xl font-bold text-indigo-400 mb-3">
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
                  className="bg-slate-900/60 backdrop-blur-sm border border-indigo-500/30 rounded-3xl p-8"
                >
                  <div className="text-indigo-400 font-bold text-xl mb-3">
                    {result}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-slate-200 text-xl max-w-3xl mx-auto leading-relaxed">
              A HU-MÁGÓ Kft. projekt tökéletes példája annak, amikor a
              hagyományos ipari innováció és a legmodernebb AI technológia egy
              kézben összpontosul. Az eredmény egy komplex, jogilag biztonságos
              és konverzióra optimalizált digitális ökoszisztéma, ami
              maximalizálja a vállalat online jelenlétét.
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
              Készen állsz a <span className="text-indigo-400">következő</span>{" "}
              szintre?
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Hogyan tudnám a te vállalkozásodat is a digitális élvonalba
              repíteni AI technológiával és prémium brandinggel?
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/kapcsolat"
                className="px-10 py-5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-500/25"
              >
                Ajánlatot kérek →
              </Link>
              <Link
                href="/munkak"
                className="px-10 py-5 border border-slate-600 hover:border-indigo-500 text-slate-300 hover:text-indigo-400 font-bold rounded-full transition-all duration-300"
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
