"use client";

import ResponsiveImage from "@/components/molecules/ResponsiveImage";
import Link from "next/link";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";
import { Work } from "@/types/work";

interface RimaiCaseStudyProps {
  project: Work;
}

export default function RimaiCaseStudy({ project }: RimaiCaseStudyProps) {
  const shouldReduceMotion = useHydratedReducedMotion();
  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    whileInView: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 100, damping: 20, delay },
  });

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      {/* Hero Szekció - 100vh */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ResponsiveImage
             src="/assets/portfolio/rimai/rimai-3d-glass-window-logo-mockup-copy.webp"
             alt="Rimai Útépítő Kft. 3D Logo Mockup"
             sizes="100vw"
             priority
             className="object-cover hero-parallax-img opacity-55 dark:opacity-65"
           />
          <div className="absolute inset-0 bg-linear-to-r from-[#F8FAFC]/88 via-[#F8FAFC]/52 to-transparent dark:from-[#0B1120]/85 dark:via-[#0B1120]/45 dark:to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-bg-base via-transparent to-[#F8FAFC]/35 dark:from-bg-base dark:via-transparent dark:to-[#0B1120]/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-block px-4 py-2 bg-sky-500/10 border border-[#0369A1]/25 dark:border-sky-500/20 rounded-full">
              <span className="text-[#0369A1] dark:text-sky-400 text-xs font-bold uppercase tracking-wider">
                {project.year || new Date().getFullYear()} – {project.category}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight text-balance">
              {project.title}
            </h1>

            <p className="text-lg md:text-xl text-[#334155] dark:text-slate-300 max-w-2xl mx-auto">
              {project.description}
            </p>

            {/* Statisztikák */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
                className="bg-white/95 dark:bg-slate-900/50 shadow-[0_12px_32px_rgba(15,23,42,0.06)] backdrop-blur-sm border border-[#0369A1]/25 dark:border-sky-500/20 rounded-2xl p-6"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#0369A1] dark:text-sky-400 mb-2">
                  100%
                </div>
                <div className="text-sm text-[#475569] dark:text-slate-400">Autonómia</div>
              </motion.div>
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
                className="bg-white/95 dark:bg-slate-900/50 shadow-[0_12px_32px_rgba(15,23,42,0.06)] backdrop-blur-sm border border-[#0369A1]/25 dark:border-sky-500/20 rounded-2xl p-6"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#0369A1] dark:text-sky-400 mb-2">
                  0-ról
                </div>
                <div className="text-sm text-[#475569] dark:text-slate-400">Felépítve</div>
              </motion.div>
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }}
                className="bg-white/95 dark:bg-slate-900/50 shadow-[0_12px_32px_rgba(15,23,42,0.06)] backdrop-blur-sm border border-[#0369A1]/25 dark:border-sky-500/20 rounded-2xl p-6"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#0369A1] dark:text-sky-400 mb-2">
                  360°
                </div>
                <div className="text-sm text-[#475569] dark:text-slate-400">Arculattervezés</div>
              </motion.div>
            </div>

            {project.website && (
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.5 }}
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:to-[#6d28d9] text-white font-bold rounded-full transition-[transform,box-shadow,background-color] duration-300 hover:scale-105 shadow-lg shadow-[#5B21B6]/30"
              >
                Megtekintés →
              </motion.a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Branding / Arculat Szekció - Bento Box Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-[#0369A1] dark:text-sky-400">Arculat</span> és Branding
            </h2>
            <p className="text-[#475569] dark:text-slate-400 text-lg">
              A fizikai és digitális arculat egységes megjelenítése
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              {...fadeUp(0)}
              className="md:col-span-2 relative aspect-2/1 rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
              <ResponsiveImage
             src="/assets/portfolio/rimai/rimai-arculat-1.webp"
             alt="Rimai Névjegykártyák"
             sizes="(max-width: 768px) 100vw, 66vw"
             className="object-cover"
           />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold text-lg">
                  Névjegykártyák
                </div>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(0.1)}
              className="relative aspect-square rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
              <ResponsiveImage
             src="/assets/portfolio/rimai/rimai-fal-1-scaled.webp"
             alt="Rimai Irodai Logó"
             sizes="(max-width: 768px) 100vw, 33vw"
             className="object-cover"
           />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold text-lg">Irodai Logó</div>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(0.2)}
              className="relative aspect-2/1 rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
            >
              <ResponsiveImage
             src="/assets/portfolio/rimai/rimai-poszter-copy-scaled.webp"
             alt="Rimai Autó Dekoráció"
             sizes="(max-width: 768px) 100vw, 33vw"
             className="object-cover"
           />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-bold text-lg">
                  Autó Dekoráció
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fejlesztés és Tartalom Szekció */}
      <section className="py-24 px-6 bg-[#F1F5F9] dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-[#0369A1] dark:text-sky-400">Fejlesztés</span> és Tartalom
            </h2>
            <p className="text-[#475569] dark:text-slate-400 text-lg">
              Modern WordPress rendszer és marketing-fókuszú szövegírás
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              {...fadeUp(0)}
              className="space-y-6"
            >
              <div className="bg-white/95 dark:bg-slate-900/50 shadow-[0_12px_32px_rgba(15,23,42,0.06)] border border-[#0369A1]/25 dark:border-sky-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[#0369A1] dark:text-sky-400 mb-4">
                  A Kihívás
                </h3>
                <p className="text-[#334155] dark:text-slate-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div className="bg-white/95 dark:bg-slate-900/50 shadow-[0_12px_32px_rgba(15,23,42,0.06)] border border-[#0369A1]/25 dark:border-sky-500/20 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-[#0369A1] dark:text-sky-400 mb-4">
                  A Megoldás
                </h3>
                <p className="text-[#334155] dark:text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(0.1)}
              className="space-y-6"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden group">
                <ResponsiveImage
             src="/assets/portfolio/rimai/rimai-aszfaltra-irva-copy-copy.webp"
             alt="Rimai Aszfaltra Írt"
             sizes="(max-width: 768px) 100vw, 50vw"
             className="object-cover group-hover:scale-105 transition-transform duration-500"
           />
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden group">
                <ResponsiveImage
             src="/assets/portfolio/rimai/rimai-utepites-csatornazas.webp"
             alt="Rimai Útépítés Csatornázás"
             sizes="(max-width: 768px) 100vw, 50vw"
             className="object-cover group-hover:scale-105 transition-transform duration-500"
           />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Galéria / Hangulat Szekció */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-[#0369A1] dark:text-sky-400">Galéria</span> és Hangulat
            </h2>
            <p className="text-[#475569] dark:text-slate-400 text-lg">
              Építőipari gépek és munkagépek grafikái
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              {...fadeUp(0)}
              className="relative aspect-square rounded-2xl overflow-hidden group"
            >
              <ResponsiveImage
             src="/assets/portfolio/rimai/rimai-poszter-rgb.webp"
             alt="Rimai Poszter RGB"
             sizes="(max-width: 768px) 100vw, 33vw"
             className="object-cover group-hover:scale-105 transition-transform duration-500"
           />
            </motion.div>

            <motion.div
              {...fadeUp(0.1)}
              className="relative aspect-square rounded-2xl overflow-hidden group"
            >
              <ResponsiveImage
             src="/assets/portfolio/rimai/excavator-utepites-rimai-kecskemet-copy.webp"
             alt="Excavator Útépítés"
             sizes="(max-width: 768px) 100vw, 33vw"
             className="object-cover group-hover:scale-105 transition-transform duration-500"
           />
            </motion.div>

            <motion.div
              {...fadeUp(0.2)}
              className="relative aspect-square rounded-2xl overflow-hidden group"
            >
              <ResponsiveImage
             src="/assets/portfolio/rimai/rimai-melyepites-copy-1.webp"
             alt="Rimai Mélyépítés"
             sizes="(max-width: 768px) 100vw, 33vw"
             className="object-cover group-hover:scale-105 transition-transform duration-500"
           />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eredmények Szekció */}
      <section className="py-24 px-6 bg-linear-to-br from-sky-500/10 to-brand-secondary/10 border-y border-[#0369A1]/25 dark:border-sky-500/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-12">
              <span className="text-[#0369A1] dark:text-sky-400">Az Eredmény</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {project.results?.map((result, index) => (
                <motion.div
                  key={index}
                  {...fadeUp(index * 0.1)}
                  className="bg-white/95 dark:bg-slate-900/50 shadow-[0_12px_32px_rgba(15,23,42,0.06)] backdrop-blur-sm border border-[#0369A1]/25 dark:border-sky-500/20 rounded-2xl p-6"
                >
                  <div className="text-[#0369A1] dark:text-sky-400 font-bold text-lg mb-2">
                    {result}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-[#334155] dark:text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Ez a projekt tökéletes példája annak, amikor a műszaki precizitás
              (fejlesztés, szerver) és a kreatív vízió (grafika, arculat,
              szövegírás) egy kézben összpontosul, kompromisszummentes minőséget
              eredményezve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Szekció */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            {...fadeUp(0)}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold">
              Készen állsz a <span className="text-[#0369A1] dark:text-sky-400">következő</span>{" "}
              szintre?
            </h2>
            <p className="text-[#475569] dark:text-slate-400 text-lg">
              Hogyan tudnám a te vállalkozásodat is a digitális élvonalba
              repíteni?
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/kapcsolat"
                className="px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:to-[#6d28d9] text-white font-bold rounded-full transition-[transform,box-shadow,background-color] duration-300 hover:scale-105 shadow-lg shadow-[#5B21B6]/30"
              >
                Ajánlatot kérek →
              </Link>
              <Link
                href="/munkak"
                className="px-8 py-4 border border-slate-300 dark:border-slate-600 hover:border-sky-500 text-[#334155] dark:text-slate-300 hover:text-[#0369A1] dark:hover:text-sky-400 font-bold rounded-full transition-colors duration-300"
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
