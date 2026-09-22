"use client";

import { CheckCircle2, Loader2, ThumbsUp } from "lucide-react";
import type { Workflow } from "@/types/portal";

interface WorkflowApprovalPanelProps {
  workflow: Workflow;
  actionLoading: string | null;
  onApprove: (workflowId: string) => void;
  formatDate: (dateStr: string) => string;
}

/**
 * Fázis-jóváhagyó panel: a már jóváhagyott állapot visszajelzése vagy a
 * jóváhagyás indítására szolgáló CTA.
 */
export default function WorkflowApprovalPanel({
  workflow,
  actionLoading,
  onApprove,
  formatDate,
}: WorkflowApprovalPanelProps) {
  const isApproved = workflow.approvedByClient === true;
  const busy = actionLoading === workflow.id;

  return (
    <div className="border-t border-slate-700 pt-4 space-y-3">
      {isApproved ? (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div>
              <span className="font-bold block">✓ Fázis jóváhagyva</span>
              {workflow.clientApprovedAt && (
                <span className="text-[10px] text-emerald-500/70 font-mono block">
                  Jóváhagyva: {formatDate(workflow.clientApprovedAt)}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-sky-500/5 border border-sky-500/10 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-slate-300 block">
              Kérlek hagyd jóvá az aktuális fázist!
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Ha elégedett vagy a tervekkel / részletekkel, indítsd el a
              következő lépést.
            </span>
          </div>

          <button
            type="button"
            disabled={busy}
            onClick={() => onApprove(workflow.id)}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-linear-to-r from-sky-500 to-violet-700 text-bg-base font-bold text-xs uppercase tracking-wider rounded-xl hover:scale-[1.02] transition-all cursor-pointer shrink-0 disabled:opacity-50"
          >
            {busy ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <>
                <ThumbsUp className="w-3.5 h-3.5" />
                Jóváhagyás
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
