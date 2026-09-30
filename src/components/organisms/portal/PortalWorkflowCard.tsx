"use client";

import {
  Activity,
  Calendar,
  CheckCircle2,
  CreditCard,
  Loader2,
  ThumbsUp,
} from "lucide-react";
import { motion } from "motion/react";
import WorkflowChat from "@/components/organisms/WorkflowChat";
import { statusConfig } from "@/lib/portalConfig";
import type { Workflow } from "@/types/portal";

interface PortalWorkflowCardProps {
  workflow: Workflow;
  idToken: string;
  userUid: string;
  actionLoading: string | null;
  formatDate: (dateStr: string) => string;
  onApprove: (workflowId: string) => void;
  onPay: (workflowId: string, phase: string) => void;
}

/**
 * Egy workflow kártya a portál Bento Gridjében: státusz-badge, haladás,
 * leírás, jegyzetek, Stripe mérföldkő-fizetés, fázis-jóváhagyás,
 * WorkflowChat és lábléc.
 */
export default function PortalWorkflowCard({
  workflow,
  idToken,
  userUid,
  actionLoading,
  formatDate,
  onApprove,
  onPay,
}: PortalWorkflowCardProps) {
  const wf = workflow;
  const config = statusConfig[wf.status] || statusConfig.planning;
  const StatusIcon = config.icon;
  const isApproved = wf.approvedByClient === true;

  return (
    <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-sky-500/50 transition-all duration-300 shadow-xl group">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${config.color}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              {config.label}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-text-primary leading-tight font-mono">
              {wf.title}
            </h3>
          </div>

          <div className="w-10 h-10 rounded-xl bg-transparent border border-slate-700 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5 text-sky-500" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-text-secondary">
            <span>Előrehaladás</span>
            <span className="font-bold text-text-primary">
              {config.progress}%
            </span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <motion.div
              className="h-full bg-linear-to-r from-sky-500 to-violet-700 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${config.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed">
          {wf.description}
        </p>

        {/* Detail block */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 md:p-5 space-y-3">
          <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">
            Jegyzetek & Lépések
          </span>
          <p className="text-xs text-slate-400 whitespace-pre-wrap leading-relaxed">
            {wf.content}
          </p>
        </div>
        {/* Payment Box (Stripe Integration) */}
        {(() => {
          const phase = wf.status;
          const priceKey = `${phase}Price` as keyof Workflow;
          const paidKey = `${phase}Paid` as keyof Workflow;
          const phasePrice = wf[priceKey]
            ? (wf[priceKey] as number)
            : 0;
          const phasePaid = wf[paidKey] === true;

          if (phasePrice <= 0) return null;

          return (
            <div className="border-t border-slate-700 pt-4 space-y-3">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">
                Pénzügyi Mérföldkő
              </span>
              {phasePaid ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="font-bold block">
                        ✓ Mérföldkő kiegyenlítve
                      </span>
                      <span className="text-[10px] text-emerald-500/70 font-mono block">
                        Díj:{" "}
                        {phasePrice.toLocaleString("hu-HU")} Ft
                        • Fizetve
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-sky-500/5 border border-sky-500/10 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-slate-300 block">
                      Aktuális mérföldkő kifizetése
                    </span>
                    <span className="text-[10px] text-sky-500 font-mono font-bold block mt-0.5">
                      Díj: {phasePrice.toLocaleString("hu-HU")}{" "}
                      Ft (Fizetésre vár)
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={
                      actionLoading === `pay_${wf.id}_${phase}`
                    }
                    onClick={() =>
                      onPay(wf.id, phase)
                    }
                    className="flex items-center justify-center gap-1.5 px-4 py-2 bg-linear-to-r from-sky-500 to-violet-700 text-bg-base font-bold text-xs uppercase tracking-wider rounded-xl hover:scale-[1.02] transition-all cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {actionLoading ===
                    `pay_${wf.id}_${phase}` ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-3.5 h-3.5" />
                        Fizetés Stripe-pal
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })()}
        {/* Approval Box */}
        <div className="border-t border-slate-700 pt-4 space-y-3">
          {isApproved ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div>
                  <span className="font-bold block">
                    ✓ Fázis jóváhagyva
                  </span>
                  {wf.clientApprovedAt && (
                    <span className="text-[10px] text-emerald-500/70 font-mono block">
                      Jóváhagyva:{" "}
                      {formatDate(wf.clientApprovedAt)}
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
                  Ha elégedett vagy a tervekkel / részletekkel,
                  indítsd el a következő lépést.
                </span>
              </div>

              <button
                type="button"
                disabled={actionLoading === wf.id}
                onClick={() => onApprove(wf.id)}
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-linear-to-r from-sky-500 to-violet-700 text-bg-base font-bold text-xs uppercase tracking-wider rounded-xl hover:scale-[1.02] transition-all cursor-pointer shrink-0 disabled:opacity-50"
              >
                {actionLoading === wf.id ? (
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
      </div>

      {/* Workflow Chat */}
      <WorkflowChat
        workflowId={wf.id}
        idToken={idToken}
        currentUserUid={userUid}
      />

      {/* Footer info */}
      <div className="flex items-center justify-between border-t border-slate-700 pt-4 mt-6 text-[10px] text-slate-500 font-mono">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Létrehozva: {formatDate(wf.createdAt)}</span>
        </div>
        <span className="text-sky-500/40">ID: {wf.id}</span>
      </div>
    </div>
  );
}
