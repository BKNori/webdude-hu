"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  Compass,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatIsoDay, statusProgress } from "@/lib/timeline";
import {
  TIMELINE_STATUS_LABELS,
  type MilestoneAccent,
  type MilestoneStatus,
  type TimelineMilestone,
  type TimelinePhaseKey,
} from "@/types/timeline";

export interface TimelineMilestoneItemProps {
  /** Megjelenítendő mérföldkő. */
  milestone: TimelineMilestone;
  /** Sorrendi index (0-alapú) - animációs késleltetéshez és sorszámozáshoz. */
  index: number;
  /** Összes fázis száma a sorszámozáshoz. */
  total: number;
  /** Külső Tailwind osztályok. */
  className?: string;
}

/** Fázisonkénti ikon a mérföldkő node-okhoz. */
const PHASE_ICONS: Record<TimelinePhaseKey, LucideIcon> = {
  planning: Compass,
  development: Code2,
  testing: Activity,
  ai_integration: Sparkles,
  completed: Rocket,
};

/** Státusz-ikonok. */
const STATUS_ICONS: Record<MilestoneStatus, LucideIcon> = {
  completed: CheckCircle2,
  in_progress: Clock,
  pending: Calendar,
};

/** Idővonal-pont (node) stílusok státusz szerint. */
const NODE_STYLES: Record<MilestoneStatus, string> = {
  completed:
    "border-[#00B5F1] bg-[#00B5F1]/15 text-[#00B5F1] shadow-[0_0_18px_rgba(0, 181, 241,0.35)]",
  in_progress: "border-sky-400 bg-sky-500/10 text-sky-300 animate-pulse",
  pending: "border-slate-800 bg-slate-950 text-slate-500",
};

/** Gantt sáv kitöltés státusz szerint. */
const BAR_FILL: Record<MilestoneStatus, string> = {
  completed: "bg-gradient-to-r from-[#5B21B6] to-[#00B5F1]",
  in_progress: "bg-gradient-to-r from-sky-500 to-sky-300",
  pending: "bg-slate-700",
};

/** Státusz badge stílusok. */
const STATUS_BADGES: Record<MilestoneStatus, string> = {
  completed: "border-[#00B5F1]/30 bg-[#00B5F1]/10 text-[#00B5F1]",
  in_progress: "border-sky-400/30 bg-sky-500/10 text-sky-300",
  pending: "border-slate-800 bg-slate-900/70 text-slate-400",
};

/** Opcionális szín-felülírás a mérföldkő címéhez. */
const ACCENT_TITLE: Record<MilestoneAccent, string> = {
  neutral: "text-[#e2e8f0]",
  cyan: "text-[#e2e8f0]", // legacy alias — v5.x adatok kompatibilitása
  gold: "text-[#e2e8f0]", // v7.0: semlegesítve — arany brand tiltva
  emerald: "text-emerald-300",
  slate: "text-slate-300",
};

/**
 * Egyetlen mérföldkő az idővonalon: node + tartalom-kártya + mini Gantt sáv.
 */
export default function TimelineMilestoneItem({
  milestone,
  index,
  total,
  className,
}: TimelineMilestoneItemProps) {
  const shouldReduceMotion = useReducedMotion();

  const StatusIcon = STATUS_ICONS[milestone.status];
  const NodeIcon = milestone.phaseKey
    ? PHASE_ICONS[milestone.phaseKey]
    : StatusIcon;
  const progress =
    milestone.progressPercentage ?? statusProgress(milestone.status, false);
  const dateLabel = formatIsoDay(milestone.date);

  return (
    <motion.li
      role="listitem"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: "easeOut",
      }}
      className={cn("relative sm:pl-14", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-4 left-0 hidden h-10 w-10 items-center justify-center rounded-full border-2 transition-colors sm:flex",
          NODE_STYLES[milestone.status]
        )}
      >
        <NodeIcon className="h-4 w-4" />
      </span>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 transition-colors hover:border-[#00B5F1]/35 md:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border sm:hidden",
                NODE_STYLES[milestone.status]
              )}
            >
              <NodeIcon className="h-4 w-4" />
            </span>
            <div>
              <h4
                className={cn(
                  "text-sm font-semibold tracking-tight md:text-base",
                  ACCENT_TITLE[milestone.accent ?? "neutral"]
                )}
              >
                {milestone.title}
              </h4>
              {milestone.description ? (
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {milestone.description}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase",
                STATUS_BADGES[milestone.status]
              )}
            >
              <StatusIcon className="h-3 w-3" aria-hidden="true" />
              {TIMELINE_STATUS_LABELS[milestone.status]}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/70 px-2.5 py-1 text-[10px] font-medium text-slate-400">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              {dateLabel || "Ütemezés folyamatban"}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-[10px] tracking-wider text-slate-500 uppercase">
            <span>
              Fázis {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <span className="font-mono text-slate-400">{progress}%</span>
          </div>
          <div
            role="progressbar"
            aria-label={`${milestone.title} haladás`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="h-2 w-full overflow-hidden rounded-full border border-slate-800/80 bg-slate-950/80"
          >
            <motion.div
              initial={shouldReduceMotion ? false : { width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.7,
                delay: shouldReduceMotion ? 0 : index * 0.08,
                ease: "easeOut",
              }}
              className={cn("h-full rounded-full", BAR_FILL[milestone.status])}
            />
          </div>
        </div>
      </div>
    </motion.li>
  );
}
