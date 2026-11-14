"use server";

import { headers } from "next/headers";
import { adminDb } from "@/lib/firebase-admin";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getClientUserProfileAction } from "@/actions/portal";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";

export interface EnhancedKpiMetrics {
  mrr: number;
  totalRevenue: number;
  activeClients: number;
  estimatedLtv: number;
  churnRate: number;
}

export type AuthHeaderInput =
  | string
  | { Authorization?: string; authorization?: string };

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

    let totalRevenue = 0;
    const clientPayments: Record<string, number> = {};
    let activeCount = 0;
    let cancelledCount = 0;
    let totalProjectsCount = 0;

    if (adminDb) {
      const [transactionsSnap, projectsSnap] = await Promise.all([
        adminDb
          .collection("transactions")
          .where("status", "==", "completed")
          .get(),
        adminDb.collection("projects").get(),
      ]);

      transactionsSnap.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        const amount = Number(data.amount) || 0;
        totalRevenue += amount;
        if (data.clientId) {
          clientPayments[String(data.clientId)] =
            (clientPayments[String(data.clientId)] || 0) + amount;
        }
      });

      totalProjectsCount = projectsSnap.size;
      projectsSnap.forEach((doc: QueryDocumentSnapshot) => {
        const data = doc.data();
        if (data.status === "active" || data.status === "in_progress") {
          activeCount++;
        }
        if (data.status === "cancelled") {
          cancelledCount++;
        }
      });
    } else if (db) {
      // cPanel-barát fallback, ha az Admin SDK nincs inicializálva
      const [transactionsSnap, projectsSnap] = await Promise.all([
        getDocs(
          query(
            collection(db, "transactions"),
            where("status", "==", "completed")
          )
        ),
        getDocs(collection(db, "projects")),
      ]);

      transactionsSnap.forEach((docSnap) => {
        const data = docSnap.data();
        const amount = Number(data.amount) || 0;
        totalRevenue += amount;
        if (data.clientId) {
          clientPayments[String(data.clientId)] =
            (clientPayments[String(data.clientId)] || 0) + amount;
        }
      });

      totalProjectsCount = projectsSnap.size;
      projectsSnap.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.status === "active" || data.status === "in_progress") {
          activeCount++;
        }
        if (data.status === "cancelled") {
          cancelledCount++;
        }
      });
    } else {
      return {
        success: false,
        error: "Firestore adatbázis nem elérhető.",
      };
    }

    const uniqueClientsCount = Object.keys(clientPayments).length || 1;
    const estimatedLtv = Math.round(totalRevenue / uniqueClientsCount);
    const totalProjects = totalProjectsCount || 1;
    const churnRate = Number(
      ((cancelledCount / totalProjects) * 100).toFixed(1)
    );
    const mrr = Math.round(totalRevenue / 12);

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
