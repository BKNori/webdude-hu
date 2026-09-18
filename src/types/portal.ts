/**
 * WebDude Ügyfélportál - típusdefiníciók (SSOT)
 *
 * A portál (src/app/portal) domain-modellje. A `Workflow` a Firestore
 * `workflows` kollekció teljes vetülete fázis-alapú elszámolással; a
 * `ProjectTimelineGantt` ehhez képest annak minimális szeletét
 * (`TimelineWorkflowSource`) használja.
 */

import type { TimelinePhaseKey } from "@/types/timeline";

/**
 * A Firestore `workflows` kollekció dokumentuma - a portál dashboard
 * megjelenítési modellje.
 */
export interface Workflow {
  id: string;
  title: string;
  description: string;
  clientId: string;
  /** Aktuális fázis: planning -> development -> testing -> ai_integration -> completed. */
  status: TimelinePhaseKey;
  /** Admin által feltöltött munkanapló / lépéslista. */
  content: string;
  createdAt: string;
  approvedByClient?: boolean;
  clientApprovedAt?: string;

  // Fázis-alapú árazás és fizetési jelzők (Stripe mérföldkövek)
  planningPrice?: number;
  planningPaid?: boolean;
  developmentPrice?: number;
  developmentPaid?: boolean;
  testingPrice?: number;
  testingPaid?: boolean;
  ai_integrationPrice?: number;
  ai_integrationPaid?: boolean;
  completedPrice?: number;
  completedPaid?: boolean;
}

/** A szuperadmin ügyfélkezelő listájában megjelenített felhasználó. */
export interface PortalUser {
  id: string;
  uid: string;
  email: string;
  name: string;
  role: string;
}

/** A portál felső szintű nézetei. */
export type PortalTab = "portal" | "admin";
