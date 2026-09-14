"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Mail,
  Coins,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Rocket,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

export interface Lead {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  summary: string;
  status: "new" | "contacted" | "proposal_sent" | "closed";
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

interface LeadKanbanCardProps {
  lead: Lead;
  onStatusChange: (leadId: string, nextStatus: Lead["status"]) => Promise<void>;
  isLoading: boolean;
}

const budgetMap: Record<string, string> = {
  under_500k: "500e Ft alatt",
  "500k_1m": "500e – 1M Ft",
  "1m_2m": "1M – 2M Ft",
  over_2m: "2M Ft felett",
};

const projectTypeMap: Record<string, string> = {
  webpage: "Weboldal",
  webshop: "Webáruház",
  graphics: "Grafika",
  ai: "AI Automatizáció",
  contact: "Kapcsolatfelvétel",
};

export default function LeadKanbanCard({
  lead,
  onStatusChange,
  isLoading,
}: LeadKanbanCardProps) {
  const router = useRouter();

  const formatDate = (seconds: number) => {
    if (!seconds) return "N/A";
    const date = new Date(seconds * 1000);
    return date.toLocaleDateString("hu-HU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusFlow = (current: Lead["status"]) => {
    const statuses: Lead["status"][] = [
      "new",
      "contacted",
      "proposal_sent",
      "closed",
    ];
    const idx = statuses.indexOf(current);
    return {
      prev: idx > 0 ? statuses[idx - 1] : null,
      next: idx < statuses.length - 1 ? statuses[idx + 1] : null,
    };
  };

  const flow = getStatusFlow(lead.status);

  return (
    <motion.div
      layoutId={`lead-${lead.id}`}
      className="bg-bg-surface/60 backdrop-blur-md border border-gray-800 hover:border-amber-500/30 rounded-xl p-5 space-y-4 transition-all duration-300 shadow-lg group relative overflow-hidden"
      whileHover={{ scale: 1.01, translateY: -2 }}
    >
      {/* Top Decorator Line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-amber-500/0 via-amber-500/20 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Name and Type */}
      <div className="space-y-1">
        <div className="flex justify-between items-start gap-2">
          <h4 className="font-bold text-white text-sm leading-tight tracking-wide truncate max-w-[70%]">
            {lead.name}
          </h4>
          <span className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold px-2 py-0.5 rounded-md shrink-0 uppercase tracking-wider">
            {projectTypeMap[lead.projectType] || lead.projectType}
          </span>
        </div>
        <a
          href={`mailto:${lead.email}`}
          className="text-xs text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-1.5 pt-1"
        >
          <Mail
            className="w-3.5 h-3.5 text-slate-500 shrink-0"
            strokeWidth={1.5}
          />
          <span className="truncate">{lead.email}</span>
        </a>
      </div>

      {/* Budget & Date */}
      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-mono bg-transparent p-2.5 rounded-lg border border-gray-800/60">
        <div className="flex items-center gap-1">
          <Coins className="w-3 h-3 text-amber-500/60" strokeWidth={1.5} />
          <span className="truncate">
            {lead.budget
              ? budgetMap[lead.budget] || lead.budget
              : "Nincs megadva"}
          </span>
        </div>
        <div className="flex items-center gap-1 justify-end">
          <Calendar className="w-3 h-3 text-slate-500" strokeWidth={1.5} />
          <span>{formatDate(lead.createdAt?.seconds)}</span>
        </div>
      </div>

      {/* AI Summary / Text */}
      <div className="text-xs text-slate-300 leading-relaxed bg-transparent p-3 rounded-lg border border-gray-800/40">
        <p className="line-clamp-3 hover:line-clamp-none transition-all cursor-pointer whitespace-pre-wrap">
          {lead.summary}
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-2 pt-1">
        {/* Prev button */}
        {flow.prev && (
          <button
            type="button"
            disabled={isLoading}
            onClick={() => onStatusChange(lead.id, flow.prev!)}
            className="p-2 rounded-lg bg-bg-elevated hover:bg-bg-surface border border-gray-800 hover:border-slate-600 text-slate-400 hover:text-white transition-all disabled:opacity-55 cursor-pointer"
            aria-label="Visszaléptetés"
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            )}
          </button>
        )}

        {/* Project Launch or Action helper */}
        {lead.status === "closed" ? (
          <button
            type="button"
            onClick={() => router.push("/admin/portal-kezelo")}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-bg-base text-[10px] font-bold uppercase tracking-wider hover:scale-[1.01] active:scale-98 transition-all shadow-[0_0_15px_rgba(245,158,11,0.1)] cursor-pointer"
          >
            <Rocket className="w-3.5 h-3.5" strokeWidth={1.5} />
            Projekt Indítása
          </button>
        ) : (
          <div className="flex-1" />
        )}

        {/* Next button */}
        {flow.next && (
          <button
            type="button"
            disabled={isLoading}
            onClick={() => onStatusChange(lead.id, flow.next!)}
            className="p-2 rounded-lg bg-bg-elevated hover:bg-bg-surface border border-gray-800 hover:border-amber-500/40 text-slate-400 hover:text-amber-500 transition-all disabled:opacity-55 ml-auto cursor-pointer"
            aria-label="Előreléptetés"
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}
