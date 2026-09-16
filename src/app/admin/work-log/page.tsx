"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Clock,
  Plus,
  CheckCircle,
  AlertCircle,
  Calendar,
  Mail,
  Trash2,
  Edit2,
  Bot,
  Loader2,
} from "lucide-react";
import TaskCaptureForm from "@/components/organisms/TaskCaptureForm";
import { autoAssignAllPendingTasksAction } from "@/actions/dispatcher";

interface WorkLog {
  id: string;
  project_id?: string;
  client_id?: string;
  task_description: string;
  status: "pending" | "in-progress" | "done";
  email_reference?: string;
  time_spent?: number;
  notes?: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  due_date?: Timestamp;
  is_critical?: boolean;
}

export default function WorkLogPage() {
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "today" | "pending" | "in-progress" | "done"
  >("all");
  const [aiTriageLoading, setAiTriageLoading] = useState(false);
  const [aiTriageResult, setAiTriageResult] = useState<string | null>(null);

  useEffect(() => {
    if (!db) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    try {
      const q = query(
        collection(db, "work_logs"),
        orderBy("created_at", "desc")
      );
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          try {
            const logs = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as WorkLog[];
            setWorkLogs(logs);
            setLoading(false);
          } catch (mapError) {
            console.error("Work logs mapping error:", mapError);
            setWorkLogs([]);
            setLoading(false);
          }
        },
        (error) => {
          console.error("Work logs snapshot error:", error);
          setWorkLogs([]);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (queryError) {
      console.error("Work logs query error:", queryError);
      const timer = setTimeout(() => {
        setWorkLogs([]);
        setLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const updateStatus = async (
    id: string,
    status: "pending" | "in-progress" | "done"
  ) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, "work_logs", id), {
        status,
        updated_at: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error updating work log:", error);
    }
  };

  const deleteLog = async (id: string) => {
    if (!db) return;
    if (confirm("Biztosan törölni akarod ezt a munka-logot?")) {
      try {
        await deleteDoc(doc(db, "work_logs", id));
      } catch (error) {
        console.error("Error deleting work log:", error);
      }
    }
  };

  const handleAiTriage = async () => {
    setAiTriageLoading(true);
    setAiTriageResult(null);

    try {
      const result = await autoAssignAllPendingTasksAction();
      if (result.success) {
        setAiTriageResult(
          `AI Triage kész: ${result.assigned} feladat kiosztva, ${result.failed} feladat felülvizsgálatra vár.`
        );
      } else {
        setAiTriageResult(result.error || "AI Triage sikertelen.");
      }
    } catch (error) {
      setAiTriageResult("Hiba történt az AI Triage közben.");
      console.error(error);
    } finally {
      setAiTriageLoading(false);
      setTimeout(() => setAiTriageResult(null), 5000);
    }
  };

  const filteredLogs = workLogs.filter((log) => {
    if (filter === "all") return true;
    if (filter === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return (
        log.due_date &&
        log.due_date.toDate() >= today &&
        log.due_date.toDate() <= new Date(today.getTime() + 24 * 60 * 60 * 1000)
      );
    }
    return log.status === filter;
  });

  const getFilteredCount = (filterType: string) => {
    if (filterType === "all") return workLogs.length;
    if (filterType === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return workLogs.filter(
        (log) =>
          log.due_date &&
          log.due_date.toDate() >= today &&
          log.due_date.toDate() <=
            new Date(today.getTime() + 24 * 60 * 60 * 1000)
      ).length;
    }
    return workLogs.filter((log) => log.status === filterType).length;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30";
      case "in-progress":
        return "text-blue-500 bg-blue-500/10 border-blue-500/30";
      case "done":
        return "text-green-500 bg-green-500/10 border-green-500/30";
      default:
        return "text-gray-500 bg-gray-500/10 border-gray-500/30";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Függőben";
      case "in-progress":
        return "Folyamatban";
      case "done":
        return "Kész";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#00B5F1] text-xl">Betöltés...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Munka Log</h1>
          <p className="text-gray-400">
            Kövesd nyomon a munkádat és a feladataidat
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAiTriage}
            disabled={aiTriageLoading}
            className="flex items-center gap-2 px-4 py-3 bg-[#0f0f1a] border border-[#00B5F1]/30 hover:border-[#00B5F1] text-[#00B5F1] font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {aiTriageLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Bot className="w-5 h-5" />
            )}
            AI Triage
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-[#00B5F1] hover:bg-[#5B21B6] text-black font-bold rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Új Feladat
          </button>
        </div>
      </div>

      {aiTriageResult && (
        <div className="bg-[#00B5F1]/10 border border-[#00B5F1]/30 text-[#00B5F1] px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <Bot className="w-4 h-4" />
          <span>{aiTriageResult}</span>
        </div>
      )}

      {/* Gyors-rögzítő Form */}
      {showForm && <TaskCaptureForm />}

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {(["all", "today", "pending", "in-progress", "done"] as const).map(
          (filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === filterType
                  ? "bg-[#00B5F1] text-black"
                  : "bg-[#0f0f1a] text-gray-400 hover:bg-gray-800"
              }`}
            >
              {filterType === "all" && "Összes"}
              {filterType === "today" && "Mai határidős"}
              {filterType === "pending" && "Függőben"}
              {filterType === "in-progress" && "Folyamatban"}
              {filterType === "done" && "Kész"}
              <span className="ml-2 text-xs opacity-70">
                ({getFilteredCount(filterType)})
              </span>
            </button>
          )
        )}
      </div>

      {/* Work Logs Table */}
      <div className="bg-[#0f0f1a] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Feladat
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Státusz
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Határidő
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                E-mail
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Műveletek
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                className="hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    {log.is_critical && (
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-white font-medium">
                        {log.task_description}
                      </p>
                      {log.notes && (
                        <p className="text-gray-400 text-sm mt-1">
                          {log.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(log.status)}`}
                  >
                    {log.status === "pending" && <Clock className="w-3 h-3" />}
                    {log.status === "in-progress" && (
                      <Edit2 className="w-3 h-3" />
                    )}
                    {log.status === "done" && (
                      <CheckCircle className="w-3 h-3" />
                    )}
                    {getStatusLabel(log.status)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {log.due_date ? (
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      {log.due_date.toDate().toLocaleDateString("hu-HU")}
                    </div>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {log.email_reference ? (
                    <a
                      href={log.email_reference}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#00B5F1] hover:text-[#00B5F1]/400 text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      E-mail
                    </a>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {log.status !== "done" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            log.id,
                            log.status === "pending" ? "in-progress" : "done"
                          )
                        }
                        className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-500/10 rounded-lg transition-colors"
                        title="Státusz frissítése"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteLog(log.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Törlés"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredLogs.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Nincs megjeleníthető munka-log
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
