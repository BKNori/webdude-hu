"use server";

import { headers } from "next/headers";
import { adminDb } from "@/lib/firebase-admin";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getClientUserProfileAction } from "@/actions/portal";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";

export interface ServiceRevenueItem {
  service: string;
  revenue: number;
}

export interface EnhancedKpiMetrics {
  mrr: number;
  totalRevenue: number;
  activeClients: number;
  estimatedLtv: number;
  cac: number;
  churnRate: number;
  revenueByService: ServiceRevenueItem[];
}

export type AuthHeaderInput =
  | string
  | { Authorization?: string; authorization?: string };

interface RawTransactionDoc {
  amount?: unknown;
  clientId?: unknown;
  serviceType?: unknown;
  service?: unknown;
  addonName?: unknown;
}

interface RawProjectDoc {
  status?: unknown;
}

interface RawSpendDoc {
  amount?: unknown;
}

function safeFiniteNumber(value: unknown): number {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function aggregateEnhancedKpiMetrics(
  transactions: RawTransactionDoc[],
  projects: RawProjectDoc[],
  marketingSpendDocs: RawSpendDoc[]
): EnhancedKpiMetrics {
  let totalRevenue = 0;
  const clientPayments: Record<string, number> = {};
  const revenueByServiceMap = new Map<string, number>();

  for (const data of transactions) {
    const amount = safeFiniteNumber(data.amount);
    totalRevenue += amount;

    if (data.clientId) {
      const clientId = String(data.clientId);
      clientPayments[clientId] = (clientPayments[clientId] || 0) + amount;
    }

    const rawService = data.serviceType || data.service || data.addonName;
    const serviceLabel =
      typeof rawService === "string" && rawService.trim()
        ? rawService.trim()
        : "Egyéb";
    revenueByServiceMap.set(
      serviceLabel,
      (revenueByServiceMap.get(serviceLabel) || 0) + amount
    );
  }

  let activeCount = 0;
  let cancelledCount = 0;
  for (const data of projects) {
    if (data.status === "active" || data.status === "in_progress") {
      activeCount++;
    }
    if (data.status === "cancelled") {
      cancelledCount++;
    }
  }

  let totalMarketingSpend = 0;
  for (const data of marketingSpendDocs) {
    totalMarketingSpend += safeFiniteNumber(data.amount);
  }

  const uniqueClientsCount = Object.keys(clientPayments).length;
  const totalProjectsCount = projects.length;

  const estimatedLtv =
    uniqueClientsCount > 0 ? Math.round(totalRevenue / uniqueClientsCount) : 0;
  const cac =
    uniqueClientsCount > 0 && totalMarketingSpend > 0
      ? Math.round(totalMarketingSpend / uniqueClientsCount)
      : 0;
  const churnRate =
    totalProjectsCount > 0
      ? Number(((cancelledCount / totalProjectsCount) * 100).toFixed(1))
      : 0;
  const mrr = totalRevenue > 0 ? Math.round(totalRevenue / 12) : 0;

  const revenueByService: ServiceRevenueItem[] = Array.from(
    revenueByServiceMap.entries()
  )
    .map(([service, revenue]) => ({ service, revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  return {
    mrr,
    totalRevenue,
    activeClients: activeCount,
    estimatedLtv,
    cac,
    churnRate,
    revenueByService,
  };
}

async function extractAndVerifyAdmin(
  authInput?: AuthHeaderInput
): Promise<void> {
  let token: string | null = null;

  if (typeof authInput === "string" && authInput.trim()) {
    token = authInput.startsWith("Bearer ")
      ? authInput.slice(7).trim()
      : authInput.trim();
  } else if (authInput && typeof authInput === "object") {
    const rawHeader = authInput.Authorization || authInput.authorization;
    if (rawHeader && rawHeader.startsWith("Bearer ")) {
      token = rawHeader.slice(7).trim();
    } else if (rawHeader) {
      token = rawHeader.trim();
    }
  }

  if (!token) {
    const headersList = await headers();
    const authHeader = headersList.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7).trim();
    }
  }

  if (!token) {
    throw new Error("Hiányzó vagy érvénytelen hitelesítési token.");
  }

  const userProfile = await getClientUserProfileAction(token);
  if (!userProfile.success || !userProfile.profile) {
    throw new Error("Érvénytelen felhasználói profil.");
  }

  const isAdmin =
    userProfile.profile.role === "admin" ||
    userProfile.profile.email === "hello@webdude.hu" ||
    userProfile.profile.email === "admin@webdude.hu";

  if (!isAdmin) {
    throw new Error("Nincs admin jogosultság a KPI adatok lekéréséhez.");
  }
}

export async function getEnhancedKpiMetricsAction(
  authHeader?: AuthHeaderInput
): Promise<{
  success: boolean;
  data?: EnhancedKpiMetrics;
  error?: string;
}> {
  try {
    await extractAndVerifyAdmin(authHeader);

    if (adminDb) {
      const [transactionsSnap, projectsSnap, spendSnap] = await Promise.all([
        adminDb
          .collection("transactions")
          .where("status", "==", "completed")
          .get(),
        adminDb.collection("projects").get(),
        adminDb.collection("marketing_spend").get(),
      ]);

      const metrics = aggregateEnhancedKpiMetrics(
        transactionsSnap.docs.map(
          (doc: QueryDocumentSnapshot) => doc.data() as RawTransactionDoc
        ),
        projectsSnap.docs.map(
          (doc: QueryDocumentSnapshot) => doc.data() as RawProjectDoc
        ),
        spendSnap.docs.map(
          (doc: QueryDocumentSnapshot) => doc.data() as RawSpendDoc
        )
      );

      return { success: true, data: metrics };
    }

    if (db) {
      // cPanel-barát fallback, ha az Admin SDK nincs inicializálva
      const [transactionsSnap, projectsSnap, spendSnap] = await Promise.all([
        getDocs(
          query(
            collection(db, "transactions"),
            where("status", "==", "completed")
          )
        ),
        getDocs(collection(db, "projects")),
        getDocs(collection(db, "marketing_spend")),
      ]);

      const metrics = aggregateEnhancedKpiMetrics(
        transactionsSnap.docs.map((d) => d.data() as RawTransactionDoc),
        projectsSnap.docs.map((d) => d.data() as RawProjectDoc),
        spendSnap.docs.map((d) => d.data() as RawSpendDoc)
      );

      return { success: true, data: metrics };
    }

    return {
      success: false,
      error: "Firestore adatbázis nem elérhető.",
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
