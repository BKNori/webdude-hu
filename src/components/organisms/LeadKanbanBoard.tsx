"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import LeadKanbanCard, { Lead } from "../molecules/LeadKanbanCard";
import { updateLeadStatusAction } from "@/actions/lead";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Clock,
  TrendingUp,
} from "lucide-react";
import StatItem from "../atoms/StatItem";

interface LeadKanbanBoardProps {
  initialLeads: Lead[];
}

const statusColumns: { key: Lead["status"]; label: string; color: string }[] = [
  {
    key: "new",
    label: "Új leadek",
    color: "border-sky-500/30 text-sky-500 bg-sky-500/5",
  },
  {
    key: "contacted",
    label: "Kapcsolatfelvétel",
    color: "border-blue-500/30 text-blue-400 bg-blue-500/5",
  },
  {
    key: "proposal_sent",
    label: "Ajánlat kiküldve",
    color: "border-purple-500/30 text-purple-400 bg-purple-500/5",
  },
  {
    key: "closed",
    label: "Sikeres (Lezárt)",
    color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5",
  },
];

export default function LeadKanbanBoard({
  initialLeads,
}: LeadKanbanBoardProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Client-side fallback fetch (in case Server-side failed or returned empty)
  const fetchLeadsClient = async () => {
    if (!db) return;
    setLoading(true);
    setError("");
    try {
      const leadsRef = collection(db, "leads");
      const q = query(leadsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const leadsData: Lead[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        let status = data.status || "new";
        if (status === "pending") status = "new";

        leadsData.push({
          id: doc.id,
          name: data.name || "Névtelen",
          email: data.email || "",
          projectType: data.projectType || "contact",
          budget: data.budget,
          summary: data.summary || data.message || "",
          status: (["new", "contacted", "proposal_sent", "closed"].includes(
            status
          )
            ? status
            : "new") as Lead["status"],
          createdAt: data.createdAt || { seconds: 0, nanoseconds: 0 },
        });
      });

      setLeads(leadsData);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Hiba történt a leadek lekérésekor."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // If the server didn't pre-fetch any leads (common in local dev without service credentials),
    // fetch them client-side once auth state is resolved.
    if (initialLeads.length === 0 && auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          fetchLeadsClient().catch(() => {});
        }
      });
      return () => unsubscribe();
    }
  }, [initialLeads]);

  const handleStatusChange = async (
    leadId: string,
    nextStatus: Lead["status"]
  ) => {
    if (!auth?.currentUser) {
      setError("Nem vagy bejelentkezve adminisztrátorként.");
      return;
    }

    // Save previous state for optimistic rollback
    const previousLeads = [...leads];

    // Optimistic UI Update: immediately move card to target column
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId ? { ...lead, status: nextStatus } : lead
      )
    );

    setActionLoading(leadId);
    setError("");
    setSuccess("");

    try {
      // 1. Get superadmin ID token
      const idToken = await auth.currentUser.getIdToken(true);

      // 2. Call Server Action
      const result = await updateLeadStatusAction(leadId, nextStatus, idToken);

      if (result.success) {
        setSuccess(result.message || "Státusz sikeresen mentve!");
      } else {
        // Rollback on failure
        setLeads(previousLeads);
        setError(result.error || "Mentési hiba történt az adatbázisban.");
      }
    } catch (err: unknown) {
      // Rollback on network/fetch error
      setLeads(previousLeads);
      setError(
        err instanceof Error ? err.message : "Kapcsolódási hiba a szerverhez."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // KPI Calculations
  const newLeadsCount = leads.filter((l) => l.status === "new").length;

  const budgetValueMap: Record<string, number> = {
    under_500k: 300000,
    "500k_1m": 750000,
    "1m_2m": 1500000,
    over_2m: 2500000,
  };

  const activePipelineValue = leads
    .filter((l) => l.status !== "closed")
    .reduce(
      (sum, l) =>
        sum + (l.budget ? budgetValueMap[l.budget] || 500000 : 500000),
      0
    );

  const formatCurrency = (val: number) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(2)} M Ft`;
    }
    return `${(val / 1000).toFixed(0)}e Ft`;
  };

  const closedCount = leads.filter((l) => l.status === "closed").length;
  const conversionRate =
    leads.length > 0 ? Math.round((closedCount / leads.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* KPI Stats (3 Bento Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatItem
          label="Új Leadek"
          value={newLeadsCount}
          icon={Clock}
          description="Feldolgozásra váró friss megkeresések"
          iconColorClass="text-sky-500"
        />
        <StatItem
          label="Aktív Értékesítési Tölcsér"
          value={formatCurrency(activePipelineValue)}
          icon={TrendingUp}
          description="Nyitott leadek becsült összértéke"
          iconColorClass="text-blue-400"
        />
        <StatItem
          label="Konverziós Arány"
          value={`${conversionRate}%`}
          icon={CheckCircle2}
          description={`Sikeresen lezárt: ${closedCount} / Összes: ${leads.length}`}
          iconColorClass="text-emerald-400"
        />
      </div>
      {/* Alert boxes */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Manual refresh block */}
      <div className="flex justify-end">
        <button
          onClick={fetchLeadsClient}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-bg-elevated hover:border-sky-500/40 hover:text-sky-500 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <RefreshCw className="w-3.5 h-3.5" />
          )}
          Frissítés
        </button>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
        {statusColumns.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.key);

          return (
            <div
              key={col.key}
              className="bg-[#0b0c16]/50 border border-gray-800/80 rounded-2xl p-4 flex flex-col min-h-125"
            >
              {/* Column Header */}
              <div
                className={`flex items-center justify-between border-b pb-3 mb-4 ${col.color} border-current/20 px-1`}
              >
                <span className="font-bold text-xs uppercase tracking-widest">
                  {col.label}
                </span>
                <span className="text-[10px] font-mono font-bold bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                  {colLeads.length}
                </span>
              </div>

              {/* Cards list with animations */}
              <div className="space-y-4 overflow-y-auto flex-1 max-h-150 pr-1">
                {loading && leads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin text-sky-500/60" />
                  </div>
                ) : colLeads.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 border border-dashed border-gray-800/40 rounded-xl text-slate-400">
                    <span className="text-[9px] uppercase tracking-wider font-bold">
                      Nincs lead
                    </span>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {colLeads.map((lead) => (
                      <LeadKanbanCard
                        key={lead.id}
                        lead={lead}
                        onStatusChange={handleStatusChange}
                        isLoading={actionLoading === lead.id}
                      />
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
