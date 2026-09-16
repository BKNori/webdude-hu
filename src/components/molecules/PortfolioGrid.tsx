"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import type { MouseEvent } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import { Work } from "@/types/work";

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client?: string;
  category: string;
  kpiHighlight?: string;
  description: string;
  coverImage: string;
  isFeatured?: boolean;
}

interface PortfolioGridProps {
  projects: Work[];
}

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  isSpanned: boolean;
}

/**
 * Egyetlen portfólió kártya — Luminous Glassmorphism, Electric Cyan spotlight,
 * Cyber-Arany hover és 3D dőlés (mouse-tracked tilt).
 */
function ProjectCard({ project, index, isSpanned }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);

  // Egérkövetett fényfolt (spotlight) pozíció
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(460px circle at ${pointerX}px ${pointerY}px, rgba(0,181,241,0.16), transparent 68%)`;

  // 3D dőlés rugós (spring) interpolációval
  const tiltXTarget = useMotionValue(0);
  const tiltYTarget = useMotionValue(0);
  const rotateX = useSpring(tiltXTarget, { stiffness: 180, damping: 22, mass: 0.6 });
  const rotateY = useSpring(tiltYTarget, { stiffness: 180, damping: 22, mass: 0.6 });

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const node = cardRef.current;
    if (!node || shouldReduceMotion) return;
    const rect = node.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    pointerX.set(px);
    pointerY.set(py);
    tiltYTarget.set((px / rect.width - 0.5) * 7);
    tiltXTarget.set((py / rect.height - 0.5) * -7);
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
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 26,
        delay: shouldReduceMotion ? 0 : (index % 3) * 0.08,
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -10 }}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={
        shouldReduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }
      }
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 backdrop-blur-2xl ring-1 ring-white/5 p-6 md:p-8 flex flex-col justify-between transition-colors duration-300 hover:border-amber-500/40 hover:ring-[#00B5F1]/40 hover:shadow-[0_0_60px_-14px_rgba(0,181,241,0.55)] ${
        isSpanned ? "md:col-span-2" : "col-span-1"
      }`}
    >
      {/* Electric Cyan spotlight — egérkövetett */}
      <motion.div
        aria-hidden="true"
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3 mb-6">
          <span className="inline-flex items-center rounded-full border border-[#00B5F1]/30 bg-[#00B5F1]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#00B5F1]">
            {project.category}
          </span>
          {project.kpiHighlight && (
            <div className="text-right">
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Eredmény
              </span>
              <span className="text-sm md:text-base font-bold text-transparent bg-clip-text bg-linear-to-r from-[#00B5F1] to-amber-400">
                {project.kpiHighlight}
              </span>
            </div>
          )}
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-6 border border-white/5 bg-slate-950">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes={
              isSpanned
                ? "(max-width: 1200px) 100vw, 66vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            unoptimized
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          {project.isFeatured && (
            <span className="absolute top-4 right-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-[0_0_24px_rgba(245,158,11,0.45)]">
              Kiemelt
            </span>
          )}
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-[#00B5F1] transition-colors mb-2">
          <Link href={`/munkak/${project.slug}`} className="focus:outline-none">
            <span className="absolute inset-0 z-10" />
            {project.title}
          </Link>
        </h3>

        <p className="text-sm text-slate-400 line-clamp-2 mb-6">
          {project.description}
        </p>
      </div>

      <div className="relative flex items-center justify-between pt-4 border-t border-white/10 text-xs font-semibold uppercase tracking-wider text-[#00B5F1] transition-colors duration-300 group-hover:text-amber-400">
        <span>Esettanulmány megtekintése</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </div>
    </motion.article>
  );
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  // Konvertálás ProjectItem típusra
  const projectItems: ProjectItem[] = projects.map((project) => ({
    id: project.id || project.slug,
    slug: project.slug,
    title: project.title,
    client: project.client,
    category: project.category,
    kpiHighlight: project.results?.[0] || project.description,
    description: project.description,
    coverImage: project.image || "/assets/banners/pro-web-design.jpg",
    isFeatured: project.featured || false,
  }));

  return (
    <div className="relative">
      {/* Mesh grid háttér — Electric Cyan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,181,241,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,181,241,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {projectItems.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isSpanned={project.isFeatured || index === 0}
          />
        ))}
      </div>
    </div>
  );
}