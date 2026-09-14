"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Users,
  Briefcase,
  CheckCircle,
  Clock,
  Search,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  getDashboardStatsAction,
  exportLeadsCSVAction,
  exportTransactionsCSVAction,
  exportProjectsCSVAction,
} from "@/actions/admin-dashboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

interface DashboardStats {
  leadsCount: number;
  activeProjectsCount: number;
  completedProjectsCount: number;
  onboardingLeadsCount: number;
  seoAuditsCount: number;
  competitorAnalysesCount: number;
  contentPlansCount: number;
  monthlyRevenue: number;
  revenueTrend: string;
  avgCompletionTime: number; // napokban
  leadConversionRate: number; // százalék
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exportingLeads, setExportingLeads] = useState(false);
  const [exportingTransactions, setExportingTransactions] = useState(false);
  const [exportingProjects, setExportingProjects] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getDashboardStatsAction();
      if (response.success && response.stats) {
        setStats(response.stats);
      } else {
        setError(
          response.error || "Hiba történt a statisztikák lekérése során."
        );
      }
    } catch {
      setError("Hiba történt a statisztikák lekérése során.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await loadStats();
    };
    loadData();
  }, []);

  const handleExportLeads = async () => {
    setExportingLeads(true);
    try {
      const response = await exportLeadsCSVAction();
      if (response.success && response.csvContent) {
        const blob = new Blob([response.csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = response.filename || "leads_export.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        setError(response.error || "Hiba történt az export során.");
      }
    } catch {
      setError("Hiba történt az export során.");
    } finally {
      setExportingLeads(false);
    }
  };

  const handleExportTransactions = async () => {
    setExportingTransactions(true);
    try {
      const response = await exportTransactionsCSVAction();
      if (response.success && response.csvContent) {
        const blob = new Blob([response.csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = response.filename || "transactions_export.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        setError(response.error || "Hiba történt az export során.");
      }
    } catch {
      setError("Hiba történt az export során.");
    } finally {
      setExportingTransactions(false);
    }
  };

  const handleExportProjects = async () => {
    setExportingProjects(true);
    try {
      const response = await exportProjectsCSVAction();
      if (response.success && response.csvContent) {
        const blob = new Blob([response.csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = response.filename || "projects_export.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        setError(response.error || "Hiba történt az export során.");
      }
    } catch {
      setError("Hiba történt az export során.");
    } finally {
      setExportingProjects(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
    }).format(amount);
  };

  const isPositiveTrend = (trend: string) => trend.startsWith("+");

  // Mock revenue data for chart (in real implementation, fetch from Firestore)
  const revenueData = [
    { month: "Jan", revenue: 450000 },
    { month: "Feb", revenue: 520000 },
    { month: "Mar", revenue: 480000 },
    { month: "Apr", revenue: 610000 },
    { month: "May", revenue: 590000 },
    { month: "Jun", revenue: 720000 },
  ];

  // Project status data for PieChart
  const projectStatusData = [
    { name: "Aktív", value: stats?.activeProjectsCount || 0, color: "#10b981" },
    {
      name: "Befejezett",
      value: stats?.completedProjectsCount || 0,
      color: "#8b5cf6",
    },
  ];

  // AI tool usage data for BarChart
  const aiToolUsageData = [
    { name: "SEO Audit", value: stats?.seoAuditsCount || 0, color: "#3b82f6" },
    {
      name: "Versenytárs-elemzés",
      value: stats?.competitorAnalysesCount || 0,
      color: "#8b5cf6",
    },
    {
      name: "Tartalomtervező",
      value: stats?.contentPlansCount || 0,
      color: "#10b981",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest animate-pulse font-bold">
          Dashboard betöltése...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-base text-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400 mt-2">Üzleti KPI és statisztikák</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExportLeads}
              disabled={exportingLeads}
              className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
            >
              {exportingLeads ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Export...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Lead-ek
                </>
              )}
            </button>
            <button
              onClick={handleExportTransactions}
              disabled={exportingTransactions}
              className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
            >
              {exportingTransactions ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Export...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Tranzakciók
                </>
              )}
            </button>
            <button
              onClick={handleExportProjects}
              disabled={exportingProjects}
              className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
            >
              {exportingProjects ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Export...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Projektek
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-xl">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {stats && (
          <>
            {/* KPI Cards - Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Leads */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    Összes
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {stats.leadsCount}
                  </div>
                  <div className="text-sm text-slate-400">Lead-ek</div>
                </div>
              </motion.div>

              {/* Active Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-emerald-500/10 rounded-xl">
                    <Briefcase className="w-6 h-6 text-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    Aktív
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {stats.activeProjectsCount}
                  </div>
                  <div className="text-sm text-slate-400">Projektek</div>
                </div>
              </motion.div>

              {/* Completed Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-purple-500/10 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-purple-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    Befejezett
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {stats.completedProjectsCount}
                  </div>
                  <div className="text-sm text-slate-400">Projektek</div>
                </div>
              </motion.div>

              {/* Lead Conversion Rate */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-amber-500/10 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-amber-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    Konverzió
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {stats.leadConversionRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-slate-400">Lead → Projekt</div>
                </div>
              </motion.div>
            </div>

            {/* Additional KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Average Completion Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-indigo-500/10 rounded-xl">
                    <Clock className="w-6 h-6 text-indigo-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    Teljesítési Idő
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {stats.avgCompletionTime.toFixed(1)} nap
                  </div>
                  <div className="text-sm text-slate-400">
                    Átlagos projekt idő
                  </div>
                </div>
              </motion.div>

              {/* Onboarding */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-rose-500/10 rounded-xl">
                    <Calendar className="w-6 h-6 text-rose-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    Onboarding
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {stats.onboardingLeadsCount}
                  </div>
                  <div className="text-sm text-slate-400">
                    Lead-ek folyamatban
                  </div>
                </div>
              </motion.div>
            </div>

            {/* AI Tools Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-6 space-y-4"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                AI Eszköz Aktivitás (30 nap)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-bg-elevated/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Search className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-slate-400">SEO Audit</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stats.seoAuditsCount}
                  </div>
                </div>
                <div className="bg-bg-elevated/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-slate-400">
                      Versenytárs-elemzés
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stats.competitorAnalysesCount}
                  </div>
                </div>
                <div className="bg-bg-elevated/50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-400">
                      Tartalomtervező
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stats.contentPlansCount}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Project Status Pie Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">
                  Projekt Státuszok
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                      }
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              {/* AI Tool Usage Bar Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">
                  AI Eszköz Használat
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={aiToolUsageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="value" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Revenue Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Revenue Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-emerald-500/10 rounded-xl">
                    <DollarSign className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${isPositiveTrend(stats.revenueTrend) ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {isPositiveTrend(stats.revenueTrend) ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {stats.revenueTrend}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {formatCurrency(stats.monthlyRevenue)}
                  </div>
                  <div className="text-sm text-slate-400">
                    Havi Bevétel (30 nap)
                  </div>
                </div>
              </motion.div>

              {/* Revenue Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card p-6 lg:col-span-2"
              >
                <h3 className="text-lg font-bold text-white mb-4">
                  Bevétel Trend
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={{ fill: "#f59e0b" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-card p-6 space-y-4"
            >
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-amber-500" />
                Gyors Műveletek
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => (window.location.href = "/admin/leadek")}
                  className="px-6 py-4 bg-bg-elevated/50 hover:bg-bg-elevated rounded-xl transition-all text-left group"
                >
                  <div className="text-white font-bold group-hover:text-amber-500 transition-colors">
                    Lead-ek Kezelése
                  </div>
                  <div className="text-sm text-slate-400">
                    Összes lead megtekintése
                  </div>
                </button>
                <button
                  onClick={() => (window.location.href = "/admin/portfolio")}
                  className="px-6 py-4 bg-bg-elevated/50 hover:bg-bg-elevated rounded-xl transition-all text-left group"
                >
                  <div className="text-white font-bold group-hover:text-amber-500 transition-colors">
                    Portfolio Menedzsment
                  </div>
                  <div className="text-sm text-slate-400">
                    Projektek szerkesztése
                  </div>
                </button>
                <button
                  onClick={() =>
                    (window.location.href = "/admin/portal-kezelo")
                  }
                  className="px-6 py-4 bg-bg-elevated/50 hover:bg-bg-elevated rounded-xl transition-all text-left group"
                >
                  <div className="text-white font-bold group-hover:text-amber-500 transition-colors">
                    Portál Kezelő
                  </div>
                  <div className="text-sm text-slate-400">
                    Ügyfél portál konfiguráció
                  </div>
                </button>
                <button
                  onClick={() =>
                    (window.location.href = "/portal/kreativ-studio")
                  }
                  className="px-6 py-4 bg-bg-elevated/50 hover:bg-bg-elevated rounded-xl transition-all text-left group"
                >
                  <div className="text-white font-bold group-hover:text-amber-500 transition-colors">
                    Kreatív Stúdió
                  </div>
                  <div className="text-sm text-slate-400">
                    AI Műhely modulok kezelése
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
