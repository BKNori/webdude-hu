"use server";

import { adminDb } from "@/lib/firebase-admin";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";

export interface EnhancedKpiMetrics {
  mrr: number;
  totalRevenue: number;
  activeClients: number;
  estimatedLtv: number;
  churnRate: number;
}

export async function getEnhancedKpiMetricsAction(): Promise<{
  success: boolean;
  data?: EnhancedKpiMetrics;
  error?: string;
}> {
  try {
    const transactionsSnap = await adminDb
      .collection("transactions")
      .where("status", "==", "completed")
      .get();
    const projectsSnap = await adminDb.collection("projects").get();

    let totalRevenue = 0;
    const clientPayments: Record<string, number> = {};

    transactionsSnap.forEach((doc: QueryDocumentSnapshot) => {
      const data = doc.data();
      const amount = Number(data.amount) || 0;
      totalRevenue += amount;
      if (data.clientId) {
        clientPayments[data.clientId] =
          (clientPayments[data.clientId] || 0) + amount;
      }
    });

    let activeCount = 0;
    let cancelledCount = 0;

    projectsSnap.forEach((doc: QueryDocumentSnapshot) => {
      const data = doc.data();
      if (data.status === "active" || data.status === "in_progress")
        activeCount++;
      if (data.status === "cancelled") cancelledCount++;
    });

    const uniqueClientsCount = Object.keys(clientPayments).length || 1;
    const estimatedLtv = Math.round(totalRevenue / uniqueClientsCount);
    const totalProjects = projectsSnap.size || 1;
    const churnRate = Number(
      ((cancelledCount / totalProjects) * 100).toFixed(1)
    );
    const mrr = Math.round(totalRevenue / 12); // Átlagos havi kalkuláció

    return {
      success: true,
      data: {
        mrr,
        totalRevenue,
        activeClients: activeCount,
        estimatedLtv,
        churnRate,
      },
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Ismeretlen hiba történt a KPI lekérésekor.",
    };
  }
}
