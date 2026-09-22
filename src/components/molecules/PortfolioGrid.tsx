"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { MouseEvent } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Work } from "@/types/work";

interface PortfolioCardProps {
  project: Work;
  index: number;
}

/**
 * Egyetlen portfólió kártya — Luminous Glassmorphism, Electric Cyan spotlight,
 * pointer-követő fény és rugó-fizikás 3D dőlés (spring tilt).
 * A `featured: true` projektek a Bento Gridben kétszeres szélességet kapnak.
 */
function PortfolioCard({ project, index }: PortfolioCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);

  // Pointer-követő fényfolt (spotlight) pozíció
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(460px circle at ${pointerX}px ${pointerY}px, rgba(0, 181, 241, 0.16), transparent 72%)`;

  // 3D dőlés rugós (spring) interpolációval
  const tiltXTarget = useMotionValue(0);
  const tiltYTarget = useMotionValue(0);
  const rotateX = useSpring(tiltXTarget, { stiffness: 180, damping: 22, mass: 0.6 });
  const rotateY = useSpring(tiltYTarget, { stiffness: 180, damping: 22, mass: 0.6 });

  const isFeatured = Boolean(project.featured);
  const kpiHighlight = project.results?.[0] ?? project.category;
  const coverImage = project.bannerImage || project.image;

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const node = cardRef.current;
    if (!node || shouldReduceMotion) return;
    const rect = node.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    pointerX.set(px);
    pointerY.set(py);
    tiltYTarget.set((px / rect.width - 0.5) * 6);
    tiltXTarget.set((py / rect.height - 0.5) * -6);
  }

  function handlePointerLeave() {
    tiltXTarget.set(0);
    tiltYTarget.set(0);
  }

  return (
    <motion.article
      ref={cardRef}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: shouldReduceMotion ? 0 : Math.min(index, 5) * 0.08,
      }}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={
        shouldReduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }
      }
      className={`group relative flex overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl ring-1 ring-white/5 transition-colors duration-300 hover:border-[#00B5F1]/50 hover:shadow-[0_0_30px_rgba(0,181,241,0.2)] ${
        isFeatured ? "md:col-span-2 flex-col md:flex-row" : "col-span-1 flex-col"
      }`}
    >
      {/* Electric Cyan spotlight — pointer-követő fény */}
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div
        className={`relative z-10 overflow-hidden border-slate-800/80 ${
          isFeatured
            ? "aspect-video w-full md:aspect-auto md:min-h-[320px] md:w-1/2 md:border-r"
            : "aspect-video w-full border-b"
        }`}
      >
        <Image
          src={coverImage}
          alt={project.title}
          fill
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          unoptimized
        />
        {isFeatured && (
          <span className="absolute top-4 left-4 z-20 rounded-full bg-[#00B5F1] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-950 shadow-[0_0_24px_rgba(0,181,241,0.45)]">
            Kiemelt
          </span>
        )}
      </div>

      <div
        className={`relative z-10 flex flex-col justify-between p-6 md:p-8 ${
          isFeatured ? "w-full md:w-1/2" : "w-full grow"
        }`}
      >
        <div>
          <div className="mb-4 flex items-start justify-between gap-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#00B5F1]">
              {project.category}
            </span>
            {project.year && (
              <span className="shrink-0 text-[11px] font-semibold text-slate-500">
                {project.year}
              </span>
            )}
          </div>

          <h3 className="mb-3 text-xl font-bold text-slate-100 transition-colors group-hover:text-[#00B5F1] md:text-2xl">
            <Link
              href={`/munkak/${project.slug}`}
              className="before:absolute before:inset-0 before:z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              {project.title}
            </Link>
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-slate-400">
            {project.description}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, isFeatured ? 4 : 3).map((tag) => (
              <span
                key={`${project.id}-${tag}`}
                className="rounded-md border border-slate-700/50 bg-slate-800/50 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-slate-800/80 pt-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00B5F1] transition-colors group-hover:text-sky-400">
              {kpiHighlight}
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-[#00B5F1]">
              Esettanulmány
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function PortfolioGrid({ projects }: { projects: Work[] }) {
  return (
    <div className="relative">
      {/* Mesh grid háttér — Electric Cyan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 181, 241,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 181, 241,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Bento Grid — a kiemelt projektek kétszeres szélességet kapnak */}
      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {projects.map((project, index) => (
          <PortfolioCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
