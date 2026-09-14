"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Lead {
  id: string;
  name: string;
  email: string;
  projectType: string;
  summary: string;
  status: "pending" | "contacted" | "closed";
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(!db);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<
    "all" | "pending" | "contacted" | "closed"
  >("all");

  useEffect(() => {
    if (!db) {
      return;
    }

    const fetchLeads = async () => {
      try {
        const leadsRef = collection(db!, "leads");
        const q = query(leadsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const leadsData: Lead[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          leadsData.push({
            id: doc.id,
            name: data.name || "",
            email: data.email || "",
            projectType: data.projectType || "",
            summary: data.summary || "",
            status: data.status || "pending",
            createdAt: data.createdAt || { seconds: 0, nanoseconds: 0 },
          });
        });

        setLeads(leadsData);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Hiba történt a leadek betöltésekor"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const formatDate = (timestamp: { seconds: number }) => {
    try {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleDateString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#00B5F1] text-xl">Betöltés...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-[#0f0f1a] border border-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-400">Még nincsenek leadek.</p>
      </div>
    );
  }

  const filteredLeads =
    filter === "all" ? leads : leads.filter((lead) => lead.status === filter);

  const handleStatusChange = async (
    leadId: string,
    newStatus: "pending" | "contacted" | "closed"
  ) => {
    try {
      const { doc, updateDoc } = await import("firebase/firestore");
      const leadRef = doc(db!, "leads", leadId);
      await updateDoc(leadRef, { status: newStatus });

      // Update local state
      setLeads(
        leads.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      );
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Hiba történt a státusz módosításakor"
      );
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Név",
      "Email",
      "Projekt típus",
      "Összegzés",
      "Státusz",
      "Dátum",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredLeads.map((lead) =>
        [
          `"${lead.name}"`,
          `"${lead.email}"`,
          `"${lead.projectType}"`,
          `"${lead.summary}"`,
          `"${lead.status}"`,
          formatDate(lead.createdAt),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `leadek-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#00B5F1]">Leadek</h1>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-[#0f0f1a] hover:bg-gray-800 text-[#00B5F1] font-semibold rounded-lg border border-[#00B5F1]/20 hover:border-[#00B5F1]/40 transition-colors text-sm uppercase tracking-wider"
        >
          CSV Export
        </button>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 mb-6">
        {(["all", "pending", "contacted", "closed"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === status
                ? "bg-[#00B5F1]/10 text-[#00B5F1] border border-[#00B5F1]/30"
                : "bg-[#0f0f1a] text-gray-400 border border-gray-800 hover:bg-gray-800"
            }`}
          >
            {status === "all"
              ? "Összes"
              : status === "pending"
                ? "Függőben"
                : status === "contacted"
                  ? "Kapcsolatban"
                  : "Lezárva"}
          </button>
        ))}
      </div>

      <div className="bg-[#0f0f1a] border border-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#0a0a0f] border-b border-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Név
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Projekt típus
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Összegzés
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Státusz
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Dátum
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {lead.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {lead.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {lead.projectType}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate">
                  {lead.summary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select
                    value={lead.status}
                    onChange={(e) =>
                      handleStatusChange(
                        lead.id,
                        e.target.value as "pending" | "contacted" | "closed"
                      )
                    }
                    className="bg-[#0a0a0f] border border-gray-700 text-gray-100 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B5F1]"
                  >
                    <option value="pending">Függőben</option>
                    <option value="contacted">Kapcsolatban</option>
                    <option value="closed">Lezárva</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {formatDate(lead.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
