"use server";

import {
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { z } from "zod";

const DashboardStatsSchema = z.object({
  leadsCount: z.number(),
  activeProjectsCount: z.number(),
  completedProjectsCount: z.number(),
  onboardingLeadsCount: z.number(),
  seoAuditsCount: z.number(),
  competitorAnalysesCount: z.number(),
  contentPlansCount: z.number(),
  monthlyRevenue: z.number(),
  revenueTrend: z.string(), // "+12%" or "-5%"
  avgCompletionTime: z.number(), // napokban
  leadConversionRate: z.number(), // százalék
});

export async function getDashboardStatsAction() {
  try {
    if (!db) {
      throw new Error("Firestore nem elérhető");
    }

    // Lead aggregations
    const leadsCol = collection(db, "leads");
    const leadsSnap = await getCountFromServer(leadsCol);
    const leadsCount = leadsSnap.data().count;

    // Project aggregations
    const projectsCol = collection(db, "projects");

    const activeProjectsQuery = query(
      projectsCol,
      where("status", "==", "active")
    );
    const activeProjectsSnap = await getCountFromServer(activeProjectsQuery);

    const completedProjectsQuery = query(
      projectsCol,
      where("status", "==", "completed")
    );
    const completedProjectsSnap = await getCountFromServer(
      completedProjectsQuery
    );

    // Onboarding leads
    const onboardingLeadsQuery = query(
      leadsCol,
      where("status", "==", "onboarding")
    );
    const onboardingLeadsSnap = await getCountFromServer(onboardingLeadsQuery);

    // AI tools aggregations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const seoAuditsCol = collection(db, "seo_audits");
    const seoAuditsQuery = query(
      seoAuditsCol,
      where("createdAt", ">=", thirtyDaysAgo.toISOString())
    );
    const seoAuditsSnap = await getCountFromServer(seoAuditsQuery);

    const competitorAnalysesCol = collection(db, "competitor_analyses");
    const competitorAnalysesQuery = query(
      competitorAnalysesCol,
      where("createdAt", ">=", thirtyDaysAgo.toISOString())
    );
    const competitorAnalysesSnap = await getCountFromServer(
      competitorAnalysesQuery
    );

    const contentPlansCol = collection(db, "content_plans");
    const contentPlansQuery = query(
      contentPlansCol,
      where("createdAt", ">=", thirtyDaysAgo.toISOString())
    );
    const contentPlansSnap = await getCountFromServer(contentPlansQuery);

    // Stripe revenue aggregation (simplified - in real implementation, use Stripe API)
    const transactionsCol = collection(db, "transactions");
    const transactionsQuery = query(
      transactionsCol,
      where("createdAt", ">=", thirtyDaysAgo.toISOString())
    );
    const transactionsSnap = await getDocs(transactionsQuery);

    let monthlyRevenue = 0;
    transactionsSnap.forEach((doc) => {
      const data = doc.data();
      if (data.amount) {
        monthlyRevenue += data.amount;
      }
    });

    // Calculate revenue trend (simplified - compare with previous 30 days)
    const previousThirtyDaysAgo = new Date();
    previousThirtyDaysAgo.setDate(previousThirtyDaysAgo.getDate() - 60);

    const previousTransactionsQuery = query(
      transactionsCol,
      where("createdAt", ">=", previousThirtyDaysAgo.toISOString()),
      where("createdAt", "<", thirtyDaysAgo.toISOString())
    );
    const previousTransactionsSnap = await getDocs(previousTransactionsQuery);

    let previousRevenue = 0;
    previousTransactionsSnap.forEach((doc) => {
      const data = doc.data();
      if (data.amount) {
        previousRevenue += data.amount;
      }
    });

    let revenueTrend = "0%";
    if (previousRevenue > 0) {
      const percentage =
        ((monthlyRevenue - previousRevenue) / previousRevenue) * 100;
      revenueTrend =
        percentage >= 0
          ? `+${percentage.toFixed(1)}%`
          : `${percentage.toFixed(1)}%`;
    }

    // Calculate average completion time (days)
    const completedProjectsDetailQuery = query(
      projectsCol,
      where("status", "==", "completed")
    );
    const completedProjectsDetailSnap = await getDocs(
      completedProjectsDetailQuery
    );

    let totalCompletionTime = 0;
    let completedProjectCount = 0;

    completedProjectsDetailSnap.forEach((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt;
      const updatedAt = data.updatedAt;

      if (createdAt && updatedAt) {
        const createdDate = new Date(createdAt);
        const updatedDate = new Date(updatedAt);
        const diffTime = Math.abs(
          updatedDate.getTime() - createdDate.getTime()
        );
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        totalCompletionTime += diffDays;
        completedProjectCount++;
      }
    });

    const avgCompletionTime =
      completedProjectCount > 0
        ? totalCompletionTime / completedProjectCount
        : 0;

    // Calculate lead conversion rate
    const leadConversionRate =
      leadsCount > 0
        ? (completedProjectsSnap.data().count / leadsCount) * 100
        : 0;

    const stats = {
      leadsCount,
      activeProjectsCount: activeProjectsSnap.data().count,
      completedProjectsCount: completedProjectsSnap.data().count,
      onboardingLeadsCount: onboardingLeadsSnap.data().count,
      seoAuditsCount: seoAuditsSnap.data().count,
      competitorAnalysesCount: competitorAnalysesSnap.data().count,
      contentPlansCount: contentPlansSnap.data().count,
      monthlyRevenue,
      revenueTrend,
      avgCompletionTime,
      leadConversionRate,
    };

    const validatedStats = DashboardStatsSchema.parse(stats);

    return {
      success: true,
      stats: validatedStats,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt a statisztikák lekérése során.",
    };
  }
}

export async function exportLeadsCSVAction() {
  try {
    if (!db) {
      throw new Error("Firestore nem elérhető");
    }

    const leadsCol = collection(db, "leads");
    const leadsSnap = await getDocs(leadsCol);

    const headers = ["ID", "Név", "Email", "Telefon", "Státusz", "Létrehozva"];
    const rows = leadsSnap.docs.map((doc) => {
      const data = doc.data();
      return [
        doc.id,
        data.name || "",
        data.email || "",
        data.phone || "",
        data.status || "",
        data.createdAt || "",
      ];
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    return {
      success: true,
      csvContent,
      filename: `leads_export_${new Date().toISOString().split("T")[0]}.csv`,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt az export során.",
    };
  }
}

export async function exportTransactionsCSVAction() {
  try {
    if (!db) {
      throw new Error("Firestore nem elérhető");
    }

    const transactionsCol = collection(db, "transactions");
    const transactionsSnap = await getDocs(transactionsCol);

    const headers = [
      "ID",
      "Ügyfél ID",
      "Összeg",
      "Valuta",
      "Státusz",
      "Stripe Payment Intent ID",
      "Létrehozva",
    ];
    const rows = transactionsSnap.docs.map((doc) => {
      const data = doc.data();
      return [
        doc.id,
        data.clientId || "",
        data.amount || 0,
        data.currency || "HUF",
        data.status || "",
        data.stripePaymentIntentId || "",
        data.createdAt || "",
      ];
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    return {
      success: true,
      csvContent,
      filename: `transactions_export_${new Date().toISOString().split("T")[0]}.csv`,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt az export során.",
    };
  }
}

export async function exportProjectsCSVAction() {
  try {
    if (!db) {
      throw new Error("Firestore nem elérhető");
    }

    const projectsCol = collection(db, "projects");
    const projectsSnap = await getDocs(projectsCol);

    const headers = [
      "ID",
      "Ügyfél ID",
      "Cím",
      "Leírás",
      "Státusz",
      "Létrehozva",
      "Frissítve",
    ];
    const rows = projectsSnap.docs.map((doc) => {
      const data = doc.data();
      return [
        doc.id,
        data.clientId || "",
        data.title || "",
        data.description || "",
        data.status || "",
        data.createdAt || "",
        data.updatedAt || "",
      ];
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    return {
      success: true,
      csvContent,
      filename: `projects_export_${new Date().toISOString().split("T")[0]}.csv`,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Hiba történt az export során.",
    };
  }
}
