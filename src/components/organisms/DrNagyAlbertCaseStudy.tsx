"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "motion/react";
import {
  Stethoscope,
  Calendar,
  CreditCard,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function DrNagyAlbertCaseStudy() {
  const shouldReduceMotion = useReducedMotion();

  const fadeInUp = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring" as const, stiffness: 100, damping: 20 },
        },
      };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const services = [
    {
      icon: Stethoscope,
      title: "Logó és Arculattervezés",
      description:
        "Modern, bizalomépítő logó és teljes arculattervezés, amely tükrözi a neurológiai szakértelmet és a prémium egészségügyi kommunikációt.",
    },
    {
      icon: Calendar,
      title: "Weboldal és E-recept Rendszer",
      description:
        "Modern weboldal fejlesztés online időpontfoglalással és e-recept funkcióval, amely egyszerűsíti a páciensek kommunikációját.",
    },
    {
      icon: CreditCard,
      title: "Internetes Fizetés és Távkonzultáció",
      description:
        "Biztonságos online fizetési rendszer fejlesztése távkonzultáció és online rendelés lehetőséggel a neurológiai szolgáltatásokhoz.",
    },
    {
      icon: TrendingUp,
      title: "SEO és AEO Optimalizáció",
      description:
        "Search Console és Analytics bekötésével SEO/AEO optimalizált weboldal, maximális láthatósággal a helyi és organikus keresésben.",
    },
  ];

  const results = [
    {
      icon: CheckCircle,
      text: "Komplet branding: logó, arculat, névjegykártya",
    },
    {
      icon: CheckCircle,
      text: "Marketing anyagok: molinók, reklámok, Facebook bannerek",
    },
    {
      icon: CheckCircle,
      text: "Weboldal fejlesztés modern e-recept rendszerrel",
    },
    {
      icon: CheckCircle,
      text: "Internetes fizetés: távkonzultáció és online rendelés",
    },
    {
      icon: CheckCircle,
      text: "SEO/AEO optimalizáció: Search Console és Analytics bekötés",
    },
    { icon: CheckCircle, text: "Prémium neurológus márkaidentitás" },
    { icon: CheckCircle, text: "Teljes szövegezés és marketing stratégia" },
  ];

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/portfolio/drnagyalbert/dr-nagy-albert-neurologus-2.webp"
            alt="Dr. Nagy Albert Neurológus"
            fill
            priority
            className="object-cover object-center -z-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-bg-base/80 backdrop-blur-xs -z-10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block relative pl-6 mb-8">
              <span className="text-xs uppercase font-black tracking-[0.3em] text-[#00B5F1] mb-2 block">
                Esettanulmány
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-[#00B5F1]" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-sans text-text-primary leading-tight tracking-tight mb-6">
              Dr. Nagy Albert{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                Neurológus
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Kecskeméti neurológus szakrendelő teljes körű digitális
              megjelenése és modern internetes fizetési rendszere: logó,
              arculat, weboldal, e-recept, távkonzultáció, SEO/AEO
              optimalizáció.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="https://drnagyalbert.hu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] text-white font-bold rounded-full transition-all hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,181,241,0.3)]"
              >
                <span>Weboldal megtekintése</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/munkak"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-bold rounded-full transition-all hover:bg-white/10"
              >
                <span>Vissza a referenciákhoz</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-20 bg-bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-block relative pl-6 mb-6">
                <span className="text-xs uppercase font-black tracking-[0.3em] text-[#00B5F1] mb-2 block">
                  Kihívás
                </span>
                <div className="absolute left-0 top-0 w-1 h-6 bg-[#00B5F1]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-sans text-text-primary leading-tight tracking-tight mb-6">
                Modern{""}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                  egészségügyi
                </span>{" "}
                transzformáció
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                Dr. Nagy Albert, egy kecskeméti neurológus szakrendelő számára
                teljes körű digitális megjelenést és modern internetes fizetési
                rendszert kellett létrehoznom. A cél egy olyan prémium
                egészségügyi márka volt, amely tükrözi a szakmai kiválóságot,
                bizalmat és modern technológiai megoldásokat (e-recept,
                távkonzultáció).
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden ring-1 ring-white/10">
                <Image
                  src="/assets/portfolio/drnagyalbert/dr-nagy-albert-neurologus.webp"
                  alt="Dr. Nagy Albert Neurológus"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-bg-base">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16"
          >
            <div className="inline-block relative pl-6 mb-6">
              <span className="text-xs uppercase font-black tracking-[0.3em] text-[#00B5F1] mb-2 block">
                Megoldás
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-[#00B5F1]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-text-primary leading-tight tracking-tight mb-6">
              Amit{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                csináltam
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Komplex digitális transzformációt valósítottam meg, minden
              szükséges technológiai és vizuális elemmel
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
                  className="group bg-slate-950/80 backdrop-blur-2xl ring-1 ring-white/5 rounded-3xl p-8 hover:border-[#00B5F1]/40 hover:shadow-[0_18px_40px_rgba(0,181,241,0.15)] transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#00B5F1]/30 transition-colors">
                    <Icon
                      className="w-8 h-8 text-[#00B5F1]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-200 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16"
          >
            <div className="inline-block relative pl-6 mb-6">
              <span className="text-xs uppercase font-black tracking-[0.3em] text-[#00B5F1] mb-2 block">
                Galéria
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-[#00B5F1]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-text-primary leading-tight tracking-tight mb-6">
              Vizuális{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                evidenciák
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              "/assets/portfolio/drnagyalbert/identity-design-kecskemet-copy.webp",
              "/assets/portfolio/drnagyalbert/infuzios-terapia-kecskemeten.jpg",
            ].map((img, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                className="relative aspect-4/3 rounded-2xl overflow-hidden ring-1 ring-white/10"
              >
                <Image
                  src={img}
                  alt={`Dr. Nagy Albert projekt kép ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-bg-base">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="bg-slate-950/80 backdrop-blur-2xl ring-1 ring-white/5 rounded-3xl p-8 md:p-12"
          >
            <div className="text-center mb-12">
              <div className="inline-block relative pl-6 mb-6">
                <span className="text-xs uppercase font-black tracking-[0.3em] text-[#00B5F1] mb-2 block">
                  Eredmények
                </span>
                <div className="absolute left-0 top-0 w-1 h-6 bg-[#00B5F1]" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-text-primary leading-tight tracking-tight mb-6">
                Amit{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                  elértünk
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((result, index) => {
                const Icon = result.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-slate-900/60 rounded-xl border border-white/10"
                  >
                    <Icon
                      className="w-6 h-6 text-[#00B5F1] shrink-0"
                      strokeWidth={1.5}
                    />
                    <span className="text-slate-300">{result.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bg-surface">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-sans text-text-primary leading-tight tracking-tight">
              Készen állsz a{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-[#5B21B6] italic">
                következő
              </span>{" "}
              szintre?
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mx-auto">
              Hogyan tudnám a te vállalkozásodat is a digitális élvonalba
              repíteni? Beszéljük meg a részleteket!
            </p>
            <Link
              href="/kapcsolat"
              className="inline-flex items-center gap-2 px-10 py-5 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] text-white font-bold rounded-full transition-all hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,181,241,0.3)]"
            >
              <span>Ajánlatot kérek</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
