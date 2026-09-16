"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { resolveTimelineMilestones, summarizeTimeline } from "@/lib/timeline";
import type {
  TimelineMilestone,
  TimelineWorkflowSource,
} from "@/types/timeline";
import TimelineMilestoneItem from "@/components/molecules/TimelineMilestoneItem";

export interface ProjectTimelineGanttProps {
  /** Közvetlen mérföldkő-lista (elsőbbséget élvez, ha meg van adva). */
  milestones?: TimelineMilestone[];
  /** Workflow forrás - ebből generálódik az 5 standard szállítási fázis. */
  workflow?: TimelineWorkflowSource;
  /** Szekció címe. */
  title?: string;
  /** Szekció alcíme (alapértelmezés: a workflow címe). */
  subtitle?: string;
  /** Külső Tailwind osztályok. */
  className?: string;
}

/**
 * Projekt idővonal és Gantt vizualizáció.
 *
 * Dual-mode: közvetlen `milestones` listát jelenít meg, vagy `workflow` alapján
 * automatikusan legenerálja az 5 standard szállítási fázist. A lista minden eleme
 * a TimelineMilestoneItem molekulában renderelődik.
 */
export default function ProjectTimelineGantt({
  milestones,
  workflow,
  title,
  subtitle,
  className,
}: ProjectTimelineGanttProps) {
  const shouldReduceMotion = useReducedMotion();

  const items = useMemo(
    () => resolveTimelineMilestones(milestones, workflow),
    [milestones, workflow]
  );
  const summary = useMemo(() => summarizeTimeline(items), [items]);

  const heading = title ?? "Szállítási mérföldkövek";
  const subheading =
    subtitle ??
    workflow?.title ??
    "Valós idejű státuszkövetés és szállítási fázisok";

  return (
    <section
      aria-label="Projekt idővonal és mérföldkövek"
      className={cn(
        "relative w-full overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 backdrop-blur-xl md:p-8",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-[#00B5F1]/10 blur-3xl"
      />

      <div className="relative">
        <header className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00B5F1]/30 bg-[#00B5F1]/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#00B5F1] uppercase">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Projekt idővonal
            </span>
            <h3 className="text-xl font-bold tracking-tight text-[#e2e8f0] md:text-2xl">
              {heading}
            </h3>
            <p className="text-sm text-slate-400">{subheading}</p>
          </div>

          <dl className="flex items-center gap-5 rounded-2xl border border-slate-800/80 bg-slate-950/60 px-5 py-3">
            <div>
              <dd className="font-mono text-2xl font-bold text-[#00B5F1]">
                {summary.progress}%
              </dd>
              <dt className="text-[10px] tracking-wider text-slate-500 uppercase">
                Összesített haladás
              </dt>
            </div>
            <span className="h-12 w-px bg-slate-800" aria-hidden="true" />
            <div className="space-y-1 text-[11px]">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Fázisok</dt>
                <dd className="font-mono font-bold text-slate-200">
                  {summary.total}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Elkészült</dt>
                <dd className="font-mono font-bold text-[#00B5F1]">
                  {summary.completed}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-500">Aktív</dt>
                <dd className="font-mono font-bold text-amber-300">
                  {summary.active}
                </dd>
              </div>
            </div>
          </dl>
        </header>

        {summary.total === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-slate-800 bg-slate-950/50 p-6 text-center text-sm text-slate-400">
            Nincs megjeleníthető mérföldkő. Amint elindul egy projekt, itt
            követheted a szállítási fázisokat.
          </p>
        ) : (
          <>
            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between text-[11px] tracking-wider text-slate-500 uppercase">
                <span>Teljes projekt ütemterv</span>
                <span className="font-mono text-slate-400">
                  {summary.completed}/{summary.total} fázis kész
                </span>
              </div>
              <div
                role="progressbar"
                aria-label="Teljes projekt haladás"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={summary.progress}
                className="h-2.5 w-full overflow-hidden rounded-full border border-slate-800/80 bg-slate-950/80"
              >
                <motion.div
                  initial={shouldReduceMotion ? false : { width: 0 }}
                  animate={{ width: `${summary.progress}%` }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.9,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-[#0095C7] to-[#00B5F1]"
                />
              </div>
            </div>

            <ol role="list" className="relative mt-8 space-y-5">
              <span
                aria-hidden="true"
                className="absolute top-5 bottom-5 left-[19px] hidden w-px bg-gradient-to-b from-[#00B5F1]/45 via-slate-800 to-transparent sm:block"
              />
              {items.map((item, index) => (
                <TimelineMilestoneItem
                  key={item.id}
                  milestone={item}
                  index={index}
                  total={summary.total}
                />
              ))}
            </ol>
          </>
        )}
      </div>
    </section>
  );
}
