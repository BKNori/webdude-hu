"use client";

import { Clock } from "lucide-react";
import type { Workflow } from "@/types/portal";
import PortalWorkflowCard from "./PortalWorkflowCard";

interface PortalWorkflowGridProps {
  workflows: Workflow[];
  idToken: string;
  userUid: string;
  actionLoading: string | null;
  formatDate: (dateStr: string) => string;
  onApprove: (workflowId: string) => void;
  onPay: (workflowId: string, phase: string) => void;
}

/**
 * A portál workflow Bento Gridje: üres állapot (nincs hozzárendelt folyamat)
 * vagy a workflow-kártyák rácsa.
 */
export default function PortalWorkflowGrid({
  workflows,
  idToken,
  userUid,
  actionLoading,
  formatDate,
  onApprove,
  onPay,
}: PortalWorkflowGridProps) {
  if (workflows.length === 0) {
    return (
      <div className="bg-slate-900/80 border border-sky-500/20 rounded-3xl p-12 text-center max-w-2xl mx-auto space-y-4">
        <Clock className="w-12 h-12 text-slate-500 mx-auto animate-pulse" />
        <h3 className="text-lg font-bold text-text-primary font-mono">
          Nincs még hozzárendelt workflow
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          Jelenleg nem található aktív fejlesztési folyamat ehhez a
          fiókhoz. Hamarosan elkészítem a workflow-dat, és itt fogod
          látni az előrehaladást!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {workflows.map((wf) => (
        <PortalWorkflowCard
          key={wf.id}
          workflow={wf}
          idToken={idToken}
          userUid={userUid}
          actionLoading={actionLoading}
          formatDate={formatDate}
          onApprove={onApprove}
          onPay={onPay}
        />
      ))}
    </div>
  );
}
