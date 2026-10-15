"use client";

import React, { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { getAdminAiAnalyticsAction } from "@/actions/ai";
import {
  getEnhancedKpiMetricsAction,
  EnhancedKpiMetrics,
} from "@/app/actions/getEnhancedKpiMetrics";
import {
  exportLeadsCSVAction,
  exportProjectsCSVAction,
} from "@/actions/admin-dashboard";
import jsPDF from "jspdf";
import {
  Brain,
  Zap,
  Users as UsersIcon,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Mail,
  FolderKanban,
  DollarSign,
  Briefcase,
  Download,
  FileText,
  Loader2,
} from "lucide-react";

interface AIStats {
  totalGenerations: number;
  popularTools: Array<{ name: string; count: number }>;
  activeClients: Array<{ id: string; name: string; count: number }>;
  recentLogs: Array<{
    id: string;
    clientName: string;
    toolName: string;
    createdAt: string;
  }>;
}

export default function AdminDashboard() {
  const [leadsCount, setLeadsCount] = useState<number | null>(null);
  const [portfolioCount, setPortfolioCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [aiStats, setAiStats] = useState<AIStats | null>(null);
  const [aiLoading, setAiLoading] = useState(true);
  const [aiError, setAiError] = useState("");

  // Bővített KPI metrikák
  const [kpiMetrics, setKpiMetrics] = useState<EnhancedKpiMetrics | null>(null);
  const [kpiLoading, setKpiLoading] = useState(true);

  // Export állapotok
  const [exportingLeads, setExportingLeads] = useState(false);
  const [exportingProjects, setExportingProjects] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);

  useEffect(() => {
    if (!auth) {
      setTimeout(() => {
        setLoading(false);
        setAiLoading(false);
        setKpiLoading(false);
      }, 0);
      return;
    }

    const unsubscribe = auth.onAuthStateChanged(async (currUser) => {
      if (currUser) {
        try {
          const idToken = await currUser.getIdToken(true);

          // 1. Fetch Standard Stats
          if (db) {
            try {
              const leadsCol = collection(db, "leads");
              const portfolioCol = collection(db, "portfolio");

              const [leadsSnap, portfolioSnap] = await Promise.all([
                getCountFromServer(leadsCol),
                getCountFromServer(portfolioCol),
              ]);

              setLeadsCount(leadsSnap.data().count);
              setPortfolioCount(portfolioSnap.data().count);
            } catch (dbError) {
              console.error("Firestore stats fetch error:", dbError);
              // Fallback: set counts to 0 instead of crashing
              setLeadsCount(0);
              setPortfolioCount(0);
            }
          }
          setLoading(false);

          // 2. Fetch AI Analytics
          try {
            const aiResult = await getAdminAiAnalyticsAction(idToken);
            if (aiResult.success && aiResult.stats) {
              setAiStats(aiResult.stats as AIStats);
            } else {
              setAiError(
                aiResult.error || "Nem sikerült betölteni az AI elemzéseket."
              );
            }
          } catch (aiError) {
            console.error("AI analytics fetch error:", aiError);
            setAiError("Hiba történt az AI elemzések betöltésekor.");
          }

          // 3. Fetch Enhanced KPI Metrics
          try {
            const kpiRes = await getEnhancedKpiMetricsAction();
            if (kpiRes.success && kpiRes.data) {
              setKpiMetrics(kpiRes.data);
            }
          } catch (kpiErr) {
            console.error("Enhanced KPI fetch error:", kpiErr);
          }
        } catch (err: unknown) {
          console.error("General stats fetch error:", err);
          setError(
            err instanceof Error
              ? err.message
              : "Hiba történt a statisztikák betöltésekor."
          );
        } finally {
          setLoading(false);
          setAiLoading(false);
          setKpiLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const getAuthHeaders = async (): Promise<
    Record<string, string> | undefined
  > => {
    if (!auth) return undefined;
    const user = auth.currentUser;
    if (!user) return undefined;
    const token = await user.getIdToken(true);
    return { Authorization: `Bearer ${token}` };
  };

  const handleExportLeads = async () => {
    setExportingLeads(true);
    try {
      const headers = await getAuthHeaders();
      const response = await exportLeadsCSVAction(headers);
      if (response.success && response.csvContent) {
        const blob = new Blob([response.csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = response.filename || "leads_export.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert(response.error || "Hiba történt a leadek exportálása során.");
      }
    } catch {
      alert("Hiba történt a leadek exportálása során.");
    } finally {
      setExportingLeads(false);
    }
  };

  const handleExportProjects = async () => {
    setExportingProjects(true);
    try {
      const headers = await getAuthHeaders();
      const response = await exportProjectsCSVAction(headers);
      if (response.success && response.csvContent) {
        const blob = new Blob([response.csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = response.filename || "projects_export.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert(response.error || "Hiba történt a projektek exportálása során.");
      }
    } catch {
      alert("Hiba történt a projektek exportálása során.");
    } finally {
      setExportingProjects(false);
    }
  };

  const handleExportPdfReport = () => {
    if (typeof window === "undefined") return;
    setExportingPdf(true);
    try {
      const doc = new jsPDF();
      const currentDate = new Date().toLocaleDateString("hu-HU");

      // Címsor és branding
      doc.setFontSize(20);
      doc.setTextColor(0, 181, 241); // Electric Cyan
      doc.text("WebDude.hu - Vezetoi KPI & Statisztikai Jelentes", 20, 20);

      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text(`Generálva: ${currentDate} | Adminisztrációs Összefoglaló`, 20, 28);

      doc.setDrawColor(30, 41, 59);
      doc.line(20, 32, 190, 32);

      // Pénzügyi és Üzleti KPI Szekció
      doc.setFontSize(14);
      doc.setTextColor(240, 240, 240);
      doc.text("1. Pénzügyi és Ügyfél Metrikák", 20, 42);

      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);

      const mrrFormatted = kpiMetrics
        ? new Intl.NumberFormat("hu-HU", { style: "currency", currency: "HUF" }).format(kpiMetrics.mrr)
        : "N/A";
      const totalRevFormatted = kpiMetrics
        ? new Intl.NumberFormat("hu-HU", { style: "currency", currency: "HUF" }).format(kpiMetrics.totalRevenue)
        : "N/A";
      const ltvFormatted = kpiMetrics
        ? new Intl.NumberFormat("hu-HU", { style: "currency", currency: "HUF" }).format(kpiMetrics.estimatedLtv)
        : "N/A";
      const churnFormatted = kpiMetrics ? `${kpiMetrics.churnRate}%` : "0%";
      const activeClientsFormatted = kpiMetrics ? `${kpiMetrics.activeClients} ügyfél / projekt` : "N/A";

      doc.text(`- Havi Visszatérő Bevétel (MRR átlag): ${mrrFormatted}`, 25, 52);
      doc.text(`- Összes Bevétel (Stripe lezárt tranzakciók): ${totalRevFormatted}`, 25, 60);
      doc.text(`- Becsült Ügyfélérték (LTV): ${ltvFormatted}`, 25, 68);
      doc.text(`- Lemondási Ráta (Churn Rate): ${churnFormatted}`, 25, 76);
      doc.text(`- Aktív Ügyfelek és Projektek száma: ${activeClientsFormatted}`, 25, 84);

      // CRM és Működési Statisztikák
      doc.setFontSize(14);
      doc.setTextColor(240, 240, 240);
      doc.text("2. CRM és Működési Állapot", 20, 100);

      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      doc.text(`- Beérkezett Leadek száma: ${leadsCount ?? 0} db`, 25, 110);
      doc.text(`- Nyilvántartott Portfólió Munkák: ${portfolioCount ?? 0} db`, 25, 118);
      doc.text(`- Lefuttatott AI Generálások: ${aiStats?.totalGenerations ?? 0} alkalom`, 25, 126);

      // Lábléc
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 270, 190, 270);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Bizalmas - WebDude.hu belső vezetői dokumentáció", 20, 276);

      doc.save(`webdude_kpi_report_${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (err) {
      console.error("PDF export hiba:", err);
      alert("Hiba történt a PDF jelentés készítésekor.");
    } finally {
      setExportingPdf(false);
    }
  };

  const formatHUF = (val: number) =>
    new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Title + Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#00B5F1] font-mono tracking-wide uppercase">
            Vezérlőpult
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            WebDude.hu adminisztrációs és AI analitikai központ
          </p>
        </div>

        {/* Quick Export Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportLeads}
            disabled={exportingLeads}
            aria-label="Leadek exportálása CSV formátumban"
            className="px-3.5 py-2 bg-[#0f172a]/70 hover:bg-[#1e293b] border border-[#1e293b] hover:border-[#00B5F1]/40 text-[#00B5F1] font-mono text-xs rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00B5F1]/50 shadow-sm"
          >
            {exportingLeads ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>Leadek (CSV)</span>
          </button>

          <button
            type="button"
            onClick={handleExportProjects}
            disabled={exportingProjects}
            aria-label="Projektek exportálása CSV formátumban"
            className="px-3.5 py-2 bg-[#0f172a]/70 hover:bg-[#1e293b] border border-[#1e293b] hover:border-purple-500/40 text-purple-400 font-mono text-xs rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50 shadow-sm"
          >
            {exportingProjects ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>Projektek (CSV)</span>
          </button>

          <button
            type="button"
            onClick={handleExportPdfReport}
            disabled={exportingPdf}
            aria-label="Vezetői KPI jelentés letöltése PDF formátumban"
            className="px-3.5 py-2 bg-gradient-to-r from-[#075985] to-[#5B21B6] hover:opacity-90 text-white font-mono text-xs font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00B5F1]/50 shadow-md shadow-sky-950/30"
          >
            {exportingPdf ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
            ) : (
              <FileText className="w-3.5 h-3.5 text-white" />
            )}
            <span>KPI Riport (PDF)</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* KPI Section: Pénzügyi és Üzleti Intelligencia (Kék-Lila v7.0) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#00B5F1]" />
            Üzleti & Pénzügyi KPI Mutatók
          </h2>
          <span className="text-[10px] font-mono text-slate-500">Stripe & Firestore Aggregáció</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* MRR */}
          <div className="bg-[#0f172a]/70 border border-[#1e293b] hover:border-[#00B5F1]/30 rounded-2xl p-5 transition-all duration-200 backdrop-blur-md shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-slate-400 font-mono uppercase tracking-wider">
                MRR (Átlag)
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#00B5F1]/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-[#00B5F1]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1 font-mono tabular-nums">
              {kpiLoading ? "..." : kpiMetrics ? formatHUF(kpiMetrics.mrr) : "0 Ft"}
            </p>
            <p className="text-[11px] text-slate-400 font-sans">Havi ismétlődő becslés</p>
          </div>

          {/* Összes Bevétel */}
          <div className="bg-[#0f172a]/70 border border-[#1e293b] hover:border-[#00B5F1]/30 rounded-2xl p-5 transition-all duration-200 backdrop-blur-md shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-slate-400 font-mono uppercase tracking-wider">
                Összes Bevétel
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1 font-mono tabular-nums">
              {kpiLoading ? "..." : kpiMetrics ? formatHUF(kpiMetrics.totalRevenue) : "0 Ft"}
            </p>
            <p className="text-[11px] text-emerald-400/90 font-sans">Lezárt tranzakciókból</p>
          </div>

          {/* Aktív Ügyfelek / Projektek */}
          <div className="bg-[#0f172a]/70 border border-[#1e293b] hover:border-[#00B5F1]/30 rounded-2xl p-5 transition-all duration-200 backdrop-blur-md shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-slate-400 font-mono uppercase tracking-wider">
                Aktív Ügyfelek
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1 font-mono tabular-nums">
              {kpiLoading ? "..." : kpiMetrics ? `${kpiMetrics.activeClients}` : "0"}
            </p>
            <p className="text-[11px] text-purple-300 font-sans">Folyamatban lévő projekt</p>
          </div>

          {/* LTV */}
          <div className="bg-[#0f172a]/70 border border-[#1e293b] hover:border-[#00B5F1]/30 rounded-2xl p-5 transition-all duration-200 backdrop-blur-md shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-slate-400 font-mono uppercase tracking-wider">
                Ügyfélérték (LTV)
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#00B5F1]/10 flex items-center justify-center">
                <UsersIcon className="w-4 h-4 text-[#00B5F1]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1 font-mono tabular-nums">
              {kpiLoading ? "..." : kpiMetrics ? formatHUF(kpiMetrics.estimatedLtv) : "0 Ft"}
            </p>
            <p className="text-[11px] text-slate-400 font-sans">Átlagos költés / ügyfél</p>
          </div>

          {/* Churn Rate */}
          <div className="bg-[#0f172a]/70 border border-[#1e293b] hover:border-[#00B5F1]/30 rounded-2xl p-5 transition-all duration-200 backdrop-blur-md shadow-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-slate-400 font-mono uppercase tracking-wider">
                Churn Rate
              </span>
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-rose-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1 font-mono tabular-nums">
              {kpiLoading ? "..." : kpiMetrics ? `${kpiMetrics.churnRate}%` : "0%"}
            </p>
            <p className="text-[11px] text-slate-400 font-sans">Projekt lemorzsolódás</p>
          </div>
        </div>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#0f0f1a] border border-gray-800 rounded-2xl p-6 hover:border-[#00B5F1]/20 transition-all">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">
              Összes Lead
            </h2>
            <div className="w-8 h-8 rounded-lg bg-[#00B5F1]/10 flex items-center justify-center">
              <Mail className="w-4 h-4 text-[#00B5F1]" />
            </div>
          </div>
          <p className="text-4xl font-bold text-[#00B5F1] mb-2">
            {loading ? "..." : leadsCount !== null ? leadsCount : "N/A"}
          </p>
          <div className="flex items-center gap-1 text-xs text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>+12% hónaphoz képest</span>
          </div>
        </div>

        <div className="bg-[#0f0f1a] border border-gray-800 rounded-2xl p-6 hover:border-[#00B5F1]/20 transition-all">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">
              Portfólió Munkák
            </h2>
            <div className="w-8 h-8 rounded-lg bg-[#00B5F1]/10 flex items-center justify-center">
              <FolderKanban className="w-4 h-4 text-[#00B5F1]" />
            </div>
          </div>
          <p className="text-4xl font-bold text-[#00B5F1] mb-2">
            {loading ? "..." : portfolioCount !== null ? portfolioCount : "N/A"}
          </p>
          <div className="flex items-center gap-1 text-xs text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>+5% hónaphoz képest</span>
          </div>
        </div>

        <div className="bg-[#0f0f1a] border border-gray-800 rounded-2xl p-6 hover:border-[#00B5F1]/20 transition-all">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">
              AI Generálások
            </h2>
            <div className="w-8 h-8 rounded-lg bg-[#00B5F1]/10 flex items-center justify-center">
              <Brain className="w-4 h-4 text-[#00B5F1]" />
            </div>
          </div>
          <p className="text-4xl font-bold text-[#00B5F1] mb-2">
            {aiLoading ? "..." : aiStats ? aiStats.totalGenerations : "N/A"}
          </p>
          <div className="flex items-center gap-1 text-xs text-emerald-400">
            <TrendingUp className="w-3 h-3" />
            <span>+28% hónaphoz képest</span>
          </div>
        </div>

        <div className="bg-[#0f0f1a] border border-gray-800 rounded-2xl p-6 hover:border-[#00B5F1]/20 transition-all">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xs font-semibold text-gray-400 font-mono uppercase tracking-wider">
              Rendszer Státusz
            </h2>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Activity className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <p className="text-sm font-bold text-emerald-500 flex items-center gap-1.5 pt-2.5 uppercase tracking-wider font-mono">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Online / Aktív
          </p>
        </div>
      </div>

      {/* Activity Feed Section */}
      <div className="border-t border-gray-800/60 pt-8">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="w-5 h-5 text-[#00B5F1]" />
          <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider">
            Friss Tevékenység
          </h3>
        </div>

        <div className="bg-[#0f0f1a]/60 border border-gray-800 rounded-2xl p-6 space-y-4">
          {aiStats?.recentLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="flex items-center gap-4 p-3 bg-[#05050a]/30 border border-gray-800/40 rounded-xl hover:border-[#00B5F1]/20 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#00B5F1]/10 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5 text-[#00B5F1]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-100 truncate">
                    {log.clientName}
                  </span>
                  <span className="text-xs text-[#00B5F1] font-mono">
                    {log.toolName}
                  </span>
                </div>
                <div className="text-xs text-gray-500 font-mono">
                  {new Date(log.createdAt).toLocaleString("hu-HU")}
                </div>
              </div>
              <div className="text-xs text-emerald-400 font-semibold">ÚJ</div>
            </div>
          ))}
          {(!aiStats || aiStats.recentLogs.length === 0) && (
            <div className="text-center py-8 text-gray-500 text-sm">
              Nincs friss tevékenység
            </div>
          )}
        </div>
      </div>

      {/* AI Analytics Section */}
      <div className="border-t border-gray-800/60 pt-8">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="w-5 h-5 text-[#00B5F1]" />
          <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider">
            Élő AI Generátor Analitika
          </h3>
        </div>

        {aiError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4" />
            <span>{aiError}</span>
          </div>
        )}

        {aiLoading ? (
          <div className="text-slate-500 text-sm font-mono flex items-center gap-2 py-6">
            <span className="w-4 h-4 border-2 border-[#00B5F1] border-t-transparent rounded-full animate-spin"></span>
            AI Statisztikák betöltése a felhőből...
          </div>
        ) : aiStats ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Popular Tools */}
            <div className="bg-[#0f0f1a]/60 border border-gray-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
                <Zap className="w-4 h-4 text-[#00B5F1]" />
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Népszerű Eszközök
                </h4>
              </div>
              <div className="space-y-3.5">
                {aiStats.popularTools.map((tool) => {
                  const percentage =
                    aiStats.totalGenerations > 0
                      ? Math.round(
                          (tool.count / aiStats.totalGenerations) * 100
                        )
                      : 0;
                  return (
                    <div key={tool.name} className="space-y-1.5 font-mono">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-sans">
                          {tool.name}
                        </span>
                        <span className="text-[#00B5F1] font-bold">
                          {tool.count} db ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-transparent h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-linear-to-r from-[#00B5F1] to-[#5B21B6] h-full rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                {aiStats.popularTools.length === 0 && (
                  <p className="text-xs text-slate-500 font-mono py-2">
                    Nincs még adat.
                  </p>
                )}
              </div>
            </div>

            {/* Active Clients */}
            <div className="bg-[#0f0f1a]/60 border border-gray-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
                <UsersIcon className="w-4 h-4 text-[#00B5F1]" />
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Aktív Felhasználók
                </h4>
              </div>
              <div className="divide-y divide-gray-800/50 max-h-70 overflow-y-auto pr-1">
                {aiStats.activeClients.map((client) => (
                  <div
                    key={client.id}
                    className="flex justify-between items-center py-2.5 font-mono text-xs"
                  >
                    <span className="text-slate-300 truncate max-w-40 font-sans">
                      {client.name}
                    </span>
                    <span className="text-[#00B5F1] font-bold bg-[#00B5F1]/5 border border-[#00B5F1]/10 px-2 py-0.5 rounded-sm">
                      {client.count} lekérés
                    </span>
                  </div>
                ))}
                {aiStats.activeClients.length === 0 && (
                  <p className="text-xs text-slate-500 font-mono py-2">
                    Nincsenek aktív kliensek.
                  </p>
                )}
              </div>
            </div>

            {/* Recent Logs */}
            <div className="bg-[#0f0f1a]/60 border border-gray-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
                <Clock className="w-4 h-4 text-[#00B5F1]" />
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  Friss Generálások
                </h4>
              </div>
              <div className="space-y-2.5 max-h-70 overflow-y-auto pr-1">
                {aiStats.recentLogs.map((log) => {
                  const logDate = new Date(log.createdAt).toLocaleTimeString(
                    "hu-HU",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }
                  );
                  return (
                    <div
                      key={log.id}
                      className="bg-[#05050a]/30 border border-gray-800/40 rounded-xl p-2.5 space-y-1 font-mono text-[10px]"
                    >
                      <div className="flex justify-between text-slate-500">
                        <span className="truncate max-w-28 text-slate-400 font-sans">
                          {log.clientName}
                        </span>
                        <span>{logDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#00B5F1]/90 font-bold">
                          {log.toolName}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {aiStats.recentLogs.length === 0 && (
                  <p className="text-xs text-slate-500 font-mono py-2">
                    Nincsenek friss naplók.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-slate-500 text-xs font-mono py-4">
            Nincs analitikai adat elérhető.
          </div>
        )}
      </div>
    </div>
  );
}
