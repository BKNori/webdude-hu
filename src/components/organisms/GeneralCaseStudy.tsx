"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Work } from "@/types/work";

interface GeneralCaseStudyProps {
  project: Work;
}

export default function GeneralCaseStudy({ project }: GeneralCaseStudyProps) {
  const shouldReduceMotion = useReducedMotion();

  const heroSrc =
    project.bannerImage ||
    project.image ||
    "/assets/banners/pro-web-design.jpg";

  const showChallenge = Boolean(project.challenge);
  const showSolution = Boolean(project.solution);

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroSrc}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-bg-base" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            {project.description}
          </p>
          {project.website && (
            <Link
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-[#00B5F1] to-[#5B21B6] text-white font-bold rounded-full transition-all hover:scale-[1.02] shadow-[0_8px_24px_rgba(0,181,241,0.3)]"
            >
              <span>Weboldal megtekintése</span>
            </Link>
          )}
        </motion.div>
      </section>

      {/* Gallery Section — Luminous Glassmorphism + Cyber-Arany glow */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="relative py-20 px-6 overflow-hidden">
          {/* Mesh grid háttér */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60 mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0, 181, 241,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 181, 241,0.07) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              Projekt <span className="text-[#00B5F1]">Galéria</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 28, scale: 0.96 }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    type: "spring",
                    stiffness: 230,
                    damping: 26,
                    delay: shouldReduceMotion ? 0 : (index % 6) * 0.07,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -8, rotateX: 2, scale: 1.02 }
                  }
                  style={{ transformPerspective: 1200 }}
                  className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-2xl ring-1 ring-white/5 transition-colors duration-300 hover:border-sky-500/40 hover:ring-[#00B5F1]/50 hover:shadow-[0_0_52px_-12px_rgba(0, 181, 241,0.55)]"
                >
                  <Image
                    src={image}
                    alt={`${project.title} - ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-12">
            {showChallenge && (
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-2xl p-8 transition-colors duration-300 hover:border-sky-500/40 hover:shadow-[0_0_52px_-16px_rgba(0, 181, 241,0.5)]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(520px circle at 12% 0%, rgba(0, 181, 241,0.14), transparent 62%)",
                  }}
                />
                <h3 className="relative text-xl font-bold text-[#00B5F1] mb-4">
                  A Kihívás
                </h3>
                <p className="relative text-slate-400 leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            )}
            {showSolution && (
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-2xl p-8 transition-colors duration-300 hover:border-sky-500/40 hover:shadow-[0_0_52px_-16px_rgba(0, 181, 241,0.5)]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(520px circle at 12% 0%, rgba(0, 181, 241,0.14), transparent 62%)",
                  }}
                />
                <h3 className="relative text-xl font-bold text-[#00B5F1] mb-4">
                  A Megoldás
                </h3>
                <p className="relative text-slate-400 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-2xl p-8 transition-colors duration-300 hover:border-sky-500/40 hover:shadow-[0_0_52px_-16px_rgba(0, 181, 241,0.5)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(520px circle at 12% 0%, rgba(0, 181, 241,0.14), transparent 62%)",
                }}
              />
              <h3 className="relative text-xl font-bold text-[#00B5F1] mb-4">
                Az Eredmény
              </h3>
              <div className="relative space-y-3">
                {project.results?.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-slate-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400 shadow-[0_0_12px_2px_rgba(0, 181, 241,0.45)]"
                    />
                    <span>{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Készen állsz a <span className="text-[#00B5F1]">következő</span>{" "}
            szintre?
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/kapcsolat"
              className="px-8 py-4 bg-[#00B5F1] hover:bg-[#5B21B6] text-slate-950 font-bold rounded-full transition-all duration-300 hover:scale-105"
            >
              Ajánlatot kérek →
            </Link>
            <Link
              href="/munkak"
              className="px-8 py-4 border border-slate-600 hover:border-[#00B5F1] text-slate-400 hover:text-[#00B5F1] font-bold rounded-full transition-all duration-300"
            >
              Vissza a munkákhoz
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
