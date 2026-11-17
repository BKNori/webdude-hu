"use client";

import React from "react";
import { Download, FileText, Loader2 } from "lucide-react";

export interface AdminExportToolbarProps {
  onExportLeads: () => void;
  onExportProjects: () => void;
  onExportTransactions: () => void;
  onExportPdf: () => void;
  exportingLeads: boolean;
  exportingProjects: boolean;
  exportingTransactions: boolean;
  exportingPdf: boolean;
}

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]";

/**
 * Egységesített Admin Export vezérlősáv (CSV: Leadek, Projektek, Tranzakciók + PDF: KPI Riport).
 * Kék-Lila v7.0 glassmorphism stílussal, töltésjelzővel és teljes akadálymentesítéssel.
 */
export default function AdminExportToolbar({
  onExportLeads,
  onExportProjects,
  onExportTransactions,
  onExportPdf,
  exportingLeads,
  exportingProjects,
  exportingTransactions,
  exportingPdf,
}: AdminExportToolbarProps) {
  return (
    <div
      role="toolbar"
      aria-label="Admin adatexport műveletek"
      className="flex flex-wrap items-center gap-2.5 p-2 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80"
    >
      <button
        type="button"
        onClick={onExportLeads}
        disabled={exportingLeads}
        aria-label="Leadek exportálása CSV formátumban"
        className={`px-3.5 py-2 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-[#00B5F1]/40 text-[#00B5F1] font-mono text-xs rounded-xl transition-[border-color,background-color] duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer ${FOCUS_RING}`}
      >
        {exportingLeads ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
        ) : (
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
        )}
        <span>Leadek (CSV)</span>
      </button>

      <button
        type="button"
        onClick={onExportProjects}
        disabled={exportingProjects}
        aria-label="Projektek exportálása CSV formátumban"
        className={`px-3.5 py-2 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-[#00B5F1]/40 text-violet-300 hover:text-white font-mono text-xs rounded-xl transition-[border-color,background-color,color] duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer ${FOCUS_RING}`}
      >
        {exportingProjects ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
        ) : (
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
        )}
        <span>Projektek (CSV)</span>
      </button>

      <button
        type="button"
        onClick={onExportTransactions}
        disabled={exportingTransactions}
        aria-label="Tranzakciók exportálása CSV formátumban"
        className={`px-3.5 py-2 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-[#00B5F1]/40 text-emerald-400 font-mono text-xs rounded-xl transition-[border-color,background-color] duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer ${FOCUS_RING}`}
      >
        {exportingTransactions ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
        ) : (
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
        )}
        <span>Tranzakciók (CSV)</span>
      </button>

      <button
        type="button"
        onClick={onExportPdf}
        disabled={exportingPdf}
        aria-label="Vezetői KPI jelentés letöltése PDF formátumban"
        className={`px-4 py-2 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:opacity-90 text-white font-mono text-xs font-semibold rounded-xl transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md shadow-sky-950/30 cursor-pointer ${FOCUS_RING}`}
      >
        {exportingPdf ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-white" aria-hidden="true" />
        ) : (
          <FileText className="w-3.5 h-3.5 text-white" aria-hidden="true" />
        )}
        <span>KPI Riport (PDF)</span>
      </button>
    </div>
  );
}
