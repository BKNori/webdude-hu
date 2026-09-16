/**
 * Projekt idővonal (Gantt) segédfüggvények.
 *
 * Tiszta, determinisztikus logika - kizárólag stabil ISO stringeken (YYYY-MM-DD)
 * és UTC-alapú dátumkezelésen dolgozik. Így a szerver- és kliensoldali renderelés
 * byte-azonos kimenetet ad, és nem keletkezik hydration mismatch.
 */

import {
  TIMELINE_PHASES,
  type MilestoneStatus,
  type TimelineMilestone,
  type TimelineWorkflowSource,
} from "@/types/timeline";

/** Egy fázis névleges hossza napokban (ütemterv-becslés az idővonalhoz). */
export const PHASE_DURATION_DAYS = 10;

/** ISO nap (YYYY-MM-DD) kinyerése bármilyen ISO stringből. */
export function extractIsoDay(value?: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value ?? "");
  if (!match) return "";
  return `${match[1]}-${match[2]}-${match[3]}`;
}

/** Magyar megjelenítés: 2026. 09. 15. (determinisztikus, locale-független). */
export function formatIsoDay(value?: string): string {
  const day = extractIsoDay(value);
  if (!day) return "";
  const [year, month, date] = day.split("-");
  return `${year}. ${month}. ${date}.`;
}

/** Napok hozzáadása UTC alapon - időzóna-független és determinisztikus. */
export function shiftIsoDay(value: string, days: number): string {
  const day = extractIsoDay(value);
  if (!day) return "";
  const base = new Date(`${day}T00:00:00.000Z`);
  if (Number.isNaN(base.getTime())) return "";
  base.setUTCDate(base.getUTCDate() + days);
  return base.toISOString().slice(0, 10);
}

/** Státusz-alapú haladás, ha a mérföldkő nem ad meg explicit százalékot. */
export function statusProgress(status: MilestoneStatus, paid: boolean): number {
  if (status === "completed") return 100;
  if (status === "in_progress") return paid ? 75 : 45;
  return 0;
}

/**
 * Az 5 standard szállítási fázis automatikus legenerálása a workflow adataiból.
 * Az aktuális státusz határozza meg az aktív fázist, a fizetési jelzők pedig
 * a soron következő fázisok előrehaladását finomítják.
 */
export function buildMilestonesFromWorkflow(
  workflow: TimelineWorkflowSource
): TimelineMilestone[] {
  const foundIndex = TIMELINE_PHASES.findIndex(
    (phase) => phase.key === workflow.status
  );
  const activeIndex = foundIndex < 0 ? 0 : foundIndex;

  return TIMELINE_PHASES.map((phase, index) => {
    const paid = Boolean(workflow[phase.paidKey]);
    let status: MilestoneStatus;

    if (index < activeIndex) {
      status = "completed";
    } else if (index > activeIndex) {
      status = paid ? "in_progress" : "pending";
    } else {
      status = phase.key === "completed" ? "completed" : "in_progress";
    }

    return {
      id: `${workflow.id}-${phase.key}`,
      title: phase.title,
      description: phase.description,
      status,
      date: workflow.createdAt
        ? shiftIsoDay(workflow.createdAt, index * PHASE_DURATION_DAYS)
        : "",
      progressPercentage: statusProgress(status, paid),
      phaseKey: phase.key,
    };
  });
}

/** Egységes feloldás: a közvetlen lista elsőbbséget élvez a workflow-generálással szemben. */
export function resolveTimelineMilestones(
  milestones?: TimelineMilestone[],
  workflow?: TimelineWorkflowSource
): TimelineMilestone[] {
  if (milestones && milestones.length > 0) return milestones;
  if (workflow) return buildMilestonesFromWorkflow(workflow);
  return [];
}

export interface TimelineSummary {
  total: number;
  completed: number;
  active: number;
  progress: number;
}

/** Összesített KPI-értékek a Gantt fejlécéhez. */
export function summarizeTimeline(
  items: TimelineMilestone[]
): TimelineSummary {
  const total = items.length;
  const completed = items.filter((item) => item.status === "completed").length;
  const active = items.filter((item) => item.status === "in_progress").length;
  const summed = items.reduce(
    (acc, item) =>
      acc + (item.progressPercentage ?? statusProgress(item.status, false)),
    0
  );

  return {
    total,
    completed,
    active,
    progress: total === 0 ? 0 : Math.round(summed / total),
  };
}
