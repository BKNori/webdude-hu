import React from "react";
import { cn } from "@/lib/utils";

export type SurfaceTone =
  | "night"
  | "night-lift"
  | "slate"
  | "slate-lift"
  | "paper"
  | "paper-alt";

interface SurfaceProps {
  /** Szekció tónusrendszere (Egységes Luminous Slate — DDR-006). */
  tone?: SurfaceTone;
  /** Lágy CSS aurora / mesh fényfoltok (WebGL nélkül). */
  aurora?: boolean;
  /** Finom háttér dot-grid mintázat. */
  grid?: boolean;
  /** Szemantikus konténer elem. */
  as?: "section" | "div" | "aside";
  id?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
  className?: string;
  children: React.ReactNode;
}

const TONE_CLASSES: Record<SurfaceTone, string> = {
  night:
    "bg-night-900 text-text-primary border-y border-slate-200/80 dark:border-white/8",
  "night-lift":
    "bg-night-800 text-text-primary border-y border-slate-200/90 dark:border-white/10",
  slate:
    "bg-night-800 text-text-primary border-y border-slate-200/90 dark:border-white/10",
  "slate-lift":
    "bg-night-700 text-text-primary border-y border-slate-200/90 dark:border-white/10",
  paper:
    "bg-night-800 text-text-primary border-y border-slate-200/90 dark:border-white/10",
  "paper-alt":
    "bg-night-700 text-text-primary border-y border-slate-200/90 dark:border-white/10",
};

/**
 * Surface — Dual Theme („Luminous Daylight” Default + „Luminous Slate” Dark) szekció-konténer.
 *
 * Light módban gyöngyház-fehér és jégkék rétegek (`#F8FAFC` ↔ `#F1F5F9` ↔ `#EAF1FA`),
 * Dark módban az egységes `v7.69.0` Luminous Slate rétegek (`#0B1120` ↔ `#111C33` ↔ `#16223B`).
 */
export default function Surface({
  tone = "night",
  aurora = false,
  grid = false,
  as: Tag = "section",
  id,
  ariaLabel,
  ariaLabelledby,
  className,
  children,
}: SurfaceProps) {
  const resolvedTone: SurfaceTone =
    tone === "paper" ? "night-lift" : tone === "paper-alt" ? "slate-lift" : tone;

  return (
    <Tag
      id={id}
      data-tone={resolvedTone}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={cn("relative overflow-hidden", TONE_CLASSES[tone], className)}
    >
      {aurora && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-65 dark:opacity-100"
        >
          <div
            className="absolute -top-32 -left-24 h-112 w-md rounded-full blur-[110px]"
            style={{
              background:
                "radial-gradient(circle, rgba(0, 181, 241, 0.16) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-32 -right-24 h-120 w-120 rounded-full blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(124, 58, 237, 0.14) 0%, transparent 70%)",
            }}
          />
        </div>
      )}

      {grid && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-mesh opacity-60"
        />
      )}

      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
