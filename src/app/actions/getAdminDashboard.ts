"use server";

import { logger } from "@/lib/logger";

import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  DashboardData,
  AdminStats,
  AgentStat,
  HeliconeOverview,
} from "@/types/adminDashboard";

// Helicone API hívás (opcionális, ha nincs API key, akkor üres adatokkal tér vissza)
async function fetchHeliconeStats(
  startDate: string,
  endDate: string
): Promise<HeliconeOverview> {
  const apiKey = process.env.HELICONE_API_KEY;
  if (!apiKey) {
    return {
      totalRequests: 0,
      avgLatencyMs: 0,
      successRate: 0,
      topAgents: [],
      providerBreakdown: {},
      latencyTrend: [],
    };
  }

  try {
    const response = await fetch(
      `https://api.helicone.ai/v1/metrics/usage?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      logger.warn('fetchHeliconeStats: API hibát adott vissza, fallback üres adatokkal', {
        layer: 'ApiRoutes',
        meta: { status: response.status },
      });
      console.error("Helicone API hiba:", response.status);
      return {
        totalRequests: 0,
        avgLatencyMs: 0,
        successRate: 0,
        topAgents: [],
        providerBreakdown: {},
        latencyTrend: [],
      };
    }

    const data = await response.json();

    return {
      totalRequests: data.totalRequests || 0,
      avgLatencyMs: data.avgLatencyMs || 0,
      successRate: data.successRate || 0,
      topAgents: data.topAgents || [],
      providerBreakdown: data.providerBreakdown || {},
      latencyTrend: data.latencyTrend || [],
    };
  } catch (error) {
    logger.error('fetchHeliconeStats: kivétel', error, { layer: 'ApiRoutes' });
    console.error("Helicone API lekérdezési hiba:", error);
    return {
      totalRequests: 0,
      avgLatencyMs: 0,
      successRate: 0,
      topAgents: [],
      providerBreakdown: {},
      latencyTrend: [],
    };
  }
}

export async function getAdminDashboard(
  startDate: string,
  endDate: string
): Promise<DashboardData> {
  if (!db) {
    throw new Error("Firestore nincs inicializálva");
  }

  try {
    logger.debug('getAdminDashboard: Firestore lekérés indul', {
      layer: 'Firestore',
      meta: { startDate, endDate },
    });

    const adminStatsRef = collection(db, "admin_stats");
    const q = query(
      adminStatsRef,
      where("date", ">=", startDate),
      where("date", "<=", endDate),
      orderBy("date", "desc"),
      limit(365)
    );

    const snapshot = await getDocs(q);
    const dailyStats: AdminStats[] = [];

    if (snapshot.empty) {
      logger.warn('getAdminDashboard: admin_stats gyűjtemény üres, fallback adatok', {
        layer: 'Firestore',
        meta: { startDate, endDate },
      });
    }

    snapshot.forEach((doc) => {
      dailyStats.push(doc.data() as AdminStats);
    });

    const totalStats = {
      totalGenerations: 0,
      totalUsers: 0,
      totalTokensUsed: 0,
      totalCostUsd: 0,
    };

    const agentBreakdown: Record<string, AgentStat> = {};

    dailyStats.forEach((stat) => {
      totalStats.totalGenerations += stat.totalGenerations;
      totalStats.totalUsers += stat.totalUsers;
      totalStats.totalTokensUsed += stat.totalTokensUsed;
      totalStats.totalCostUsd += stat.totalCostUsd;

      Object.entries(stat.agentStats).forEach(([agent, agentStat]) => {
        if (!agentBreakdown[agent]) {
          agentBreakdown[agent] = {
            executions: 0,
            tokensUsed: 0,
            costUsd: 0,
          };
        }
        agentBreakdown[agent].executions += agentStat.executions;
        agentBreakdown[agent].tokensUsed += agentStat.tokensUsed;
        agentBreakdown[agent].costUsd += agentStat.costUsd;
      });
    });

    const costTrend = dailyStats
      .map((stat) => ({
        date: stat.date,
        cost: stat.totalCostUsd,
      }))
      .reverse();

    const monthlyStats: AdminStats[] = [];
    const monthlyMap: Record<string, AdminStats> = {};

    dailyStats.forEach((stat) => {
      const monthKey = stat.date.substring(0, 7);
      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = {
          date: monthKey,
          totalGenerations: 0,
          totalUsers: 0,
          totalTokensUsed: 0,
          totalCostUsd: 0,
          agentStats: {},
        };
      }
      monthlyMap[monthKey].totalGenerations += stat.totalGenerations;
      monthlyMap[monthKey].totalUsers += stat.totalUsers;
      monthlyMap[monthKey].totalTokensUsed += stat.totalTokensUsed;
      monthlyMap[monthKey].totalCostUsd += stat.totalCostUsd;

      Object.entries(stat.agentStats).forEach(([agent, agentStat]) => {
        if (!monthlyMap[monthKey].agentStats[agent]) {
          monthlyMap[monthKey].agentStats[agent] = {
            executions: 0,
            tokensUsed: 0,
            costUsd: 0,
          };
        }
        monthlyMap[monthKey].agentStats[agent].executions +=
          agentStat.executions;
        monthlyMap[monthKey].agentStats[agent].tokensUsed +=
          agentStat.tokensUsed;
        monthlyMap[monthKey].agentStats[agent].costUsd += agentStat.costUsd;
      });
    });

    Object.values(monthlyMap).forEach((stat) => {
      monthlyStats.push(stat);
    });

    monthlyStats.sort((a, b) => a.date.localeCompare(b.date));

    // Helicone statisztikák lekérdezése
    const heliconeOverview = await fetchHeliconeStats(startDate, endDate);

    return {
      dailyStats,
      monthlyStats,
      totalStats,
      agentBreakdown,
      costTrend,
      heliconeOverview,
    };
  } catch (error) {
    logger.error('getAdminDashboard: kivétel a Firestore lekérés során', error, {
      layer: 'Firestore',
      meta: { startDate, endDate },
    });
    console.error("Admin dashboard lekérdezési hiba:", error);
    return {
      dailyStats: [],
      monthlyStats: [],
      totalStats: {
        totalGenerations: 0,
        totalUsers: 0,
        totalTokensUsed: 0,
        totalCostUsd: 0,
      },
      agentBreakdown: {},
      costTrend: [],
      heliconeOverview: {
        totalRequests: 0,
        avgLatencyMs: 0,
        successRate: 0,
        topAgents: [],
        providerBreakdown: {},
        latencyTrend: [],
      },
    };
  }
}
