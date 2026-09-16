/**
 * WebDude Projekt idővonal és Gantt - típusdefiníciók (SSOT)
 *
 * A portál projekt-idővonalának (Gantt) adatmodellje. A ProjectTimelineGantt
 * komponens a `workflow` prop alapján automatikusan legenerálja az 5 standard
 * szállítási fázist, vagy közvetlen `milestones` listát is elfogad.
 */

export type MilestoneStatus = "completed" | "in_progress" | "pending";

export type TimelinePhaseKey =
  | "planning"
  | "development"
  | "testing"
  | "ai_integration"
  | "completed";

/**
 * Mérföldkő-cím kiemelő színkulcsok.
 * A "cyan" legacy alias (v5.x adatok kompatibilitása) — új rekordnál "neutral" használandó.
 */
export type MilestoneAccent = "neutral" | "gold" | "emerald" | "slate" | "cyan";

/** A workflow dokumentum fizetési jelzőmezői (fázis-alapú elszámolás). */
export type TimelinePaidKey =
  | "planningPaid"
  | "developmentPaid"
  | "testingPaid"
  | "ai_integrationPaid"
  | "completedPaid";

export interface TimelineMilestone {
  /** Egyedi azonosító (Firestore doc ID vagy generált kulcs). */
  id: string;
  /** Mérföldkő címe. */
  title: string;
  /** Részletes leírás (opcionális). */
  description?: string;
  /** Státusz: elkészült / folyamatban / ütemezve. */
  status: MilestoneStatus;
  /** Dátum stabil ISO (YYYY-MM-DD) formátumban - hidratáció-biztos. */
  date: string;
  /** Haladás százalékban (0-100), opcionális. */
  progressPercentage?: number;
  /** Opcionális szín-felülírás (alapértelmezés: státusz alapú). */
  accent?: MilestoneAccent;
  /** Opcionális fázis-kapcsolat a fázisikon kiválasztásához. */
  phaseKey?: TimelinePhaseKey;
}

/** A Firestore `workflows` kollekció minimális vetülete, amit az idővonal használ. */
export interface TimelineWorkflowSource {
  id: string;
  title: string;
  status: TimelinePhaseKey;
  createdAt?: string;
  planningPaid?: boolean;
  developmentPaid?: boolean;
  testingPaid?: boolean;
  ai_integrationPaid?: boolean;
  completedPaid?: boolean;
}

export interface TimelinePhaseDefinition {
  key: TimelinePhaseKey;
  title: string;
  description: string;
  paidKey: TimelinePaidKey;
}

/** Az 5 standard szállítási fázis, sorrendben. */
export const TIMELINE_PHASES: readonly TimelinePhaseDefinition[] = [
  {
    key: "planning",
    title: "Tervezés és Audit",
    description:
      "Követelményfelmérés, információarchitektúra és a szállítási ütemterv rögzítése.",
    paidKey: "planningPaid",
  },
  {
    key: "development",
    title: "Fejlesztés",
    description:
      "Next.js 16 és React 19 implementáció, komponensépítés és integrációk bekötése.",
    paidKey: "developmentPaid",
  },
  {
    key: "testing",
    title: "Tesztelés és QA",
    description:
      "Reszponzivitás, Lighthouse teljesítmény, akadálymentesítés és hibajavítás.",
    paidKey: "testingPaid",
  },
  {
    key: "ai_integration",
    title: "AI Integráció",
    description:
      "AI automatizációk, asszisztens és generatív munkafolyamatok élesítése.",
    paidKey: "ai_integrationPaid",
  },
  {
    key: "completed",
    title: "Átadás és Élesítés",
    description:
      "Produkciós deploy, a dokumentáció átadása és a projekt hivatalos lezárása.",
    paidKey: "completedPaid",
  },
];

export const TIMELINE_STATUS_LABELS: Record<MilestoneStatus, string> = {
  completed: "Elkészült",
  in_progress: "Folyamatban",
  pending: "Ütemezve",
};
