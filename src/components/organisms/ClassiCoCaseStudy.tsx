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

interface ClassiCoCaseStudyProps {
  project: Work;
}

export default function ClassiCoCaseStudy({ project }: ClassiCoCaseStudyProps) {
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
            src="/assets/portfolio/classi-co/szeged-terkovezes3-scopy.webp"
            alt="Classi-Co Kft. - Térkövezés és Beton Kivitelezés"
            fill
            className="object-cover"
            priority
            sizes="100vw"
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
              className="inline-block px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full backdrop-blur-sm"
            >
              <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">
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
                "Arculattervezés",
                "Weboldal",
                "SEO",
                "Tartalomírás",
                "Google Cégprofil",
                "Reklámok",
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
                className="inline-flex items-center gap-2 px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/25"
              >
                Weboldal megtekintése →
              </motion.a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Logó és Branding Szekció */}
      <section className="py-32 px-6 bg-linear-to-b from-bg-base to-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-emerald-400">Arculat</span> és Branding
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Határozott, iparághoz illő vizuális identitás és logótervezés
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-slate-900/60 border border-slate-800 flex items-center justify-center p-12"
            >
              <Image
                src="/assets/portfolio/classi-co/classi-co-logo-h100.webp"
                alt="Classi-Co Logo"
                width={400}
                height={400}
                className="object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-3">
                  <span className="w-2 h-8 bg-emerald-500 rounded-full" />
                  Komplex Arculattervezés
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  A Classi-Co Kft. számára egy határozott, iparághoz illő
                  vizuális identitást és logót terveztem. A térkövezés és beton
                  kivitelezés területén működő cég arculata a stabilitást, a
                  megbízhatóságot és a szakmai precizitást sugallja, miközben
                  modern és felismerhető marad.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-3">
                  <span className="w-2 h-8 bg-emerald-500 rounded-full" />
                  Offline Branding
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  Prémium minőségű névjegykártya tervezése a fizikai
                  találkozásokhoz. A névjegykártyák és offline marketing anyagok
                  tökéletes szinergiában vannak a digitális arculattal, egységes
                  márkaélményt nyújtva minden érintkezési ponton.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Videó Showcase Szekció - WOW FAKTOR */}
      <section className="py-32 px-6 bg-linear-to-b from-slate-900/30 to-emerald-950/20 border-y border-emerald-500/20">
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
              className="inline-block px-6 py-3 bg-emerald-500/20 border border-emerald-500/40 rounded-full backdrop-blur-sm mb-6"
            >
              <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">
                🔥 Élő Weboldal Demó
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Dinamikus <span className="text-emerald-400">Weboldal</span>{" "}
              Bemutató
            </h2>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto">
              A Classi-Co weboldal működése eszközökön - MacBook és iPhone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* MacBook Video */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900/80 border-2 border-slate-700 shadow-2xl"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source
                  src="/assets/portfolio/classi-co/macbook-air-wwwclassi-cohu-qvokictypt.webm"
                  type="video/webm"
                />
              </video>
              <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-lg">
                <span className="text-white text-sm font-medium">
                  MacBook Air Demo
                </span>
              </div>
            </motion.div>

            {/* iPhone Video */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative aspect-9/16 rounded-3xl overflow-hidden bg-slate-900/80 border-2 border-slate-700 shadow-2xl"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source
                  src="/assets/portfolio/classi-co/iphone-13-pro-wwwclassi-cohu-9h7x7sodyg.webm"
                  type="video/webm"
                />
              </video>
              <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-lg">
                <span className="text-white text-sm font-medium">
                  iPhone 13 Pro Demo
                </span>
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
              Teljes Körű <span className="text-emerald-400">Digitális</span>{" "}
              Megoldás
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Minden, ami egy megbízható online jelenlét felépítéséhez szükséges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Komplex Arculattervezés",
                description:
                  "Határozott, iparághoz illő vizuális identitás és logó megalkotása, ami megbízhatóságot sugall.",
                icon: "🎨",
              },
              {
                title: "Profi WordPress Weboldal",
                description:
                  "Modern, villámgyors és reszponzív weboldal felépítése, ami tökéletes felhasználói élményt nyújt.",
                icon: "💻",
              },
              {
                title: "Tartalomírás",
                description:
                  "Értékesítési fókuszú, bizalomépítő szövegek megírása a weboldalra, amelyek megfogják a látogatókat.",
                icon: "✍️",
              },
              {
                title: "Keresőoptimalizálás",
                description:
                  "Technikai és tartalmi SEO, hogy a cég dominálja a helyi kereséseket és organikus forgalmat tereljen.",
                icon: "🔍",
              },
              {
                title: "Google Cégprofil",
                description:
                  "A lokális jelenlét maximalizálása és a Google Cégprofil professzionális felépítése.",
                icon: "📍",
              },
              {
                title: "Reklámok és Kampányok",
                description:
                  "Konverziófókuszált vizuális anyagok és hirdetések tervezése a maximális ROI érdekében.",
                icon: "📢",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/50 transition-colors duration-300 group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
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
              <span className="text-emerald-400">Vizuális</span> Galéria
            </h2>
            <p className="text-slate-400 text-xl">
              A Classi-Co Kft. branding és weboldal vizuális elemei
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.gallery && project.gallery.length > 0 ? (
              project.gallery.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`${
                    index === 0
                      ? "lg:col-span-2 aspect-4/3"
                      : index === 1
                        ? "aspect-square"
                        : "aspect-video"
                  } relative rounded-3xl overflow-hidden group`}
                >
                  <Image
                    src={img}
                    alt={`Classi-Co Projekt kép ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <div className="text-white font-bold text-xl">
                      {index === 0
                        ? "Weboldal Design"
                        : index === 1
                          ? "Névjegykártya"
                          : index === 2
                            ? "Social Media"
                            : index === 3
                              ? "Térkövezés"
                              : index === 4
                                ? "Útbúrkolás"
                                : index === 5
                                  ? "Detail"
                                  : "Munka"}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-slate-400 col-span-4 text-center py-12">
                Nincs elérhető galéria kép.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Eredmények Szekció */}
      <section className="py-32 px-6 bg-linear-to-br from-emerald-500/10 to-teal-500/10 border-y border-emerald-500/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-12">
              <span className="text-emerald-400">Az Eredmény</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { value: "100%", label: "Arculattervezés" },
                { value: "SEO", label: "Lokális Domina" },
                { value: "WP", label: "WordPress Pro" },
                { value: "Copy", label: "Tartalomírás" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-900/60 backdrop-blur-sm border border-emerald-500/30 rounded-3xl p-8"
                >
                  <div className="text-5xl md:text-6xl font-bold text-emerald-400 mb-3">
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
                  className="bg-slate-900/60 backdrop-blur-sm border border-emerald-500/30 rounded-3xl p-8"
                >
                  <div className="text-emerald-400 font-bold text-xl mb-3">
                    {result}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-slate-200 text-xl max-w-3xl mx-auto leading-relaxed">
              A Classi-Co Kft. projekt tökéletes példája annak, amikor a
              hagyományos ipari vállalkozás és a modern digitális megoldások egy
              kézben összpontosul. Az eredmény egy megbízható, prémium online
              jelenlét, ami maximalizálja a cég lokális láthatóságát és
              konverzióját.
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
              Készen állsz a <span className="text-emerald-400">következő</span>{" "}
              szintre?
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto">
              Hogyan tudnám a te vállalkozásodat is a digitális élvonalba
              repíteni megbízható, prémium megoldásokkal?
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/kapcsolat"
                className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/25"
              >
                Ajánlatot kérek →
              </Link>
              <Link
                href="/munkak"
                className="px-10 py-5 border border-slate-600 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 font-bold rounded-full transition-all duration-300"
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
