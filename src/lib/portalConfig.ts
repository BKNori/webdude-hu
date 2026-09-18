/**
 * WebDude Ügyfélportál - megjelenítési konfiguráció (SSOT)
 *
 * A portál dashboardhoz kötődő, JSX-mentes konstansok: fázis-státusz
 * megjelenítés (címke, szín, haladás, ikon), add-on kategória-leképezés
 * és a szuperadmin automatikusan elérhető AI moduljai.
 */

import {
  Activity,
  CheckCircle2,
  Compass,
  Play,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { TimelinePhaseKey } from "@/types/timeline";

/** Egy workflow-fázis megjelenítési leírása. */
export interface WorkflowStatusConfig {
  label: string;
  /** Tailwind osztályok a státusz-badge-hez. */
  color: string;
  /** Haladás százalékban (0-100). */
  progress: number;
  icon: LucideIcon;
}

/**
 * Az 5 standard szállítási fázis megjelenítési konfigurációja.
 * Kulcsai megegyeznek a `TimelinePhaseKey` unióval (a Gantt-tel közös SSOT).
 */
export const statusConfig: Record<TimelinePhaseKey, WorkflowStatusConfig> = {
  planning: {
    label: "Tervezés / Audit",
    color: "border-sky-500/30 text-sky-500 bg-sky-500/5",
    progress: 25,
    icon: Compass,
  },
  development: {
    label: "Fejlesztés alatt",
    color: "border-blue-500/30 text-blue-400 bg-blue-500/5",
    progress: 50,
    icon: Play,
  },
  testing: {
    label: "Tesztelés / QA",
    color: "border-purple-500/30 text-purple-400 bg-purple-500/5",
    progress: 75,
    icon: Activity,
  },
  ai_integration: {
    label: "AI Integráció & AEO Optimalizálás",
    color:
      "border-sky-500/40 text-sky-500 bg-sky-500/10 shadow-[0_0_15px_rgba(0, 181, 241,0.05)]",
    progress: 90,
    icon: Sparkles,
  },
  completed: {
    label: "Átadva / Kész",
    color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
    progress: 100,
    icon: CheckCircle2,
  },
};

/** Add-on azonosító -> UI kategória leképezés az onboarding űrlaphoz. */
export const categoryMap: Record<string, "cro" | "tech" | "ai" | "design"> = {
  addon_ux_roast: "design",
  addon_speed_opt: "tech",
  addon_seo_article: "ai",
  addon_cro_audit: "cro",
  addon_security_pack: "tech",
  addon_ai_chatbot: "ai",
};

/**
 * A szuperadmin (hello@webdude.hu) számára automatikusan elérhető AI modulok.
 * Normál klienseknél a users/{uid}.allowedTools mező dönt.
 */
export const SUPERADMIN_TOOLS: readonly string[] = [
  "product_desc",
  "review_assistant",
  "social_matrix",
  "cart_recovery",
  "midjourney_prompt",
  "banner_concept",
  "logo_designer",
  "ui_ux_designer",
  "seasonal_campaign_designer",
  "kristofka_workflow",
];
