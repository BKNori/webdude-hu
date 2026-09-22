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

interface BorGarnelaCaseStudyProps {
  project: Work;
}

export default function BorGarnelaCaseStudy({
  project,
}: BorGarnelaCaseStudyProps) {
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
            src="/assets/portfolio/bor-es-garnela/bor-garnela-foodtruck-banner-eros-pista-feszt-2023-kecskemet-copy.webp"
            alt="Bor és Garnéla Food Truck - Eros Pista Fesztivál"
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
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block px-6 py-3 bg-[#00B5F1]/10 border border-[#00B5F1]/30 rounded-full backdrop-blur-sm"
            >
              <span className="text-[#00B5F1] text-sm font-bold uppercase tracking-widest">
                {project.year || new Date().getFullYear()} – {project.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-8xl font-bold leading-tight"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light"
            >
              {project.description}
            </motion.p>

            {/* Szolgáltatás Kiemelők */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 pt-8"
            >
              {[
                "Arculattervezés",
                "Weboldal",
                "SEO",
                "Étlap",
                "Reklámok",
                "Videók",
              ].map((service, index) => (
                <motion.span
                  key={service}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
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
                transition={{ delay: 1.2, duration: 0.6 }}
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-10 py-5 bg-[#00B5F1] hover:bg-[#5B21B6] text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-[#00B5F1]/25"
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
              <span className="text-[#00B5F1]">A Kihívás</span> és a Megoldás
            </h2>
            <div className="w-24 h-1 bg-[#00B5F1] rounded-full" />
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
                <h3 className="text-2xl font-bold text-[#00B5F1] mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#00B5F1] rounded-full" />A
                  Félreértett Brand
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  A Bor és Garnéla food truck számára egy komplex vizuális
                  megújulásra volt szükség. A korábbi arculat nem kommunikálta a
                  prémium minőséget és a gasztronómiai innovációt, amit a
                  vállalkozás képviselt. A cél egy olyan teljes körű branding
                  volt, ami azonnal felismerhetővé teszi a márkát, és
                  konzisztens vizuális nyelvet biztosít minden érintkezési
                  ponton.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-[#00B5F1] mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#00B5F1] rounded-full" />
                  Stratégiai Megközelítés
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  A projekt során egy komplex arculattervezési folyamatot
                  valósítottam meg, ami magában foglalta a logó, az étlapok, a
                  weboldal, a social media anyagok és a fesztivál branding
                  tervezését. A vizuális identitás a termék minőségét tükrözte,
                  miközben a modern, fiatalos célközönséget is megszólította.
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
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden group">
                <Image
                  src="/assets/portfolio/bor-es-garnela/bor-garnela-foodtruck-banner-eros-pista-feszt-2023-kecskemet-copy.webp"
                  alt="Bor és Garnéla Food Truck Banner"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden group">
                <Image
                  src="/assets/portfolio/bor-es-garnela/bor-es-garnela-etalp-terbezes.webp"
                  alt="Bor és Garnéla Étlap Tervezés"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </div>
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
              Teljes Körű <span className="text-[#00B5F1]">Szolgáltatás</span>{" "}
              Paletta
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Minden, ami egy prémium food truck brandinghez szükséges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Komplex Arculattervezés",
                description:
                  "Egyedi, a célközönséget megszólító vizuális identitás megalkotása, ami azonnal felismerhetővé teszi a márkát.",
                icon: "🎨",
              },
              {
                title: "Weboldal Készítés",
                description:
                  "Modern, gyors és reszponzív weboldal fejlesztése, ami optimalizált a konverzióra és a felhasználói élményre.",
                icon: "💻",
              },
              {
                title: "SEO Optimalizálás",
                description:
                  "Keresőoptimalizálás, hogy az oldal ne csak szép legyen, de a Google is szeresse, és organikus forgalmat tereljen.",
                icon: "🔍",
              },
              {
                title: "Étlap Tervezés",
                description:
                  "Nyomdai és digitális étlapok designja, ami azonnal eladja az ételeket és a prémium minőséget sugallja.",
                icon: "📋",
              },
              {
                title: "Reklámok és Kampányok",
                description:
                  "Konverziófókuszált vizuális anyagok készítése hirdetésekhez, ami maximalizálja a ROI-t.",
                icon: "📢",
              },
              {
                title: "Videókészítés",
                description:
                  "Dinamikus és figyelemfelkeltő promóciós videók, ami a márka történetét vizuálisan meséli el.",
                icon: "🎬",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 hover:border-[#00B5F1]/50 transition-colors duration-300 group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00B5F1] transition-colors">
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
              <span className="text-[#00B5F1]">Vizuális</span> Galéria
            </h2>
            <p className="text-slate-400 text-xl">
              A Bor és Garnéla food truck branding vizuális elemei
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 lg:row-span-2 relative aspect-square rounded-3xl overflow-hidden group"
            >
              <Image
                src="/assets/portfolio/bor-es-garnela/bor-garnela-zaszlo2-scaled.webp"
                alt="Bor és Garnéla Zászló"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold text-xl">Brand Zászló</div>
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
                src="/assets/portfolio/bor-es-garnela/bor-es-garnela-thor-advert-copy-2.webp"
                alt="Bor és Garnéla Reklám"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold">Reklám Anyag</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-square rounded-3xl overflow-hidden group"
            >
              <Image
                src="/assets/portfolio/bor-es-garnela/bor-garnela-advert.webp"
                alt="Bor és Garnéla Promóció"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold">Promóciós Grafika</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative aspect-square rounded-3xl overflow-hidden group"
            >
              <Image
                src="/assets/portfolio/bor-es-garnela/wordpress-weboldalak-boer-es-garnela.webp"
                alt="Bor és Garnéla Weboldal"
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
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative aspect-square rounded-3xl overflow-hidden group"
            >
              <Image
                src="/assets/portfolio/bor-es-garnela/ajandekutalvany-vegpsd-copy-2.webp"
                alt="Bor és Garnéla Ajándékutalvány"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold">Ajándékutalvány</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eredmények Szekció */}
      <section className="py-32 px-6 bg-linear-to-br from-[#00B5F1]/10 to-[#5B21B6]/10 border-y border-[#00B5F1]/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-12">
              <span className="text-[#00B5F1]">Az Eredmény</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { value: "100%", label: "Brand Újjászületés" },
                { value: "6+", label: "Szolgáltatás Típus" },
                { value: "2023", label: "Eros Pista Fesztivál" },
                { value: "360°", label: "Teljes Branding" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-900/60 backdrop-blur-sm border border-[#00B5F1]/30 rounded-3xl p-8"
                >
                  <div className="text-5xl md:text-6xl font-bold text-[#00B5F1] mb-3">
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
                  className="bg-slate-900/60 backdrop-blur-sm border border-[#00B5F1]/30 rounded-3xl p-8"
                >
                  <div className="text-[#00B5F1] font-bold text-xl mb-3">
                    {result}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-slate-200 text-xl max-w-3xl mx-auto leading-relaxed">
              A Bor és Garnéla projekt tökéletes példája annak, amikor a kreatív
              vízió (grafika, arculat, branding) és a stratégiai gondolkodás
              (SEO, webfejlesztés, marketing) egy kézben összpontosul, prémium
              márkát alkotva. Az eredmény egy egységes, felismerhető és
              konverzióra optimalizált vizuális identitás.
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
              Készen állsz a <span className="text-[#00B5F1]">következő</span>{" "}
              szintre?
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Hogyan tudnám a te vállalkozásodat is a digitális élvonalba
              repíteni egy egyedi, prémium brandinggel?
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/kapcsolat"
                className="px-10 py-5 bg-[#00B5F1] hover:bg-[#5B21B6] text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-[#00B5F1]/25"
              >
                Ajánlatot kérek →
              </Link>
              <Link
                href="/munkak"
                className="px-10 py-5 border border-slate-600 hover:border-[#00B5F1] text-slate-300 hover:text-[#00B5F1] font-bold rounded-full transition-all duration-300"
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
