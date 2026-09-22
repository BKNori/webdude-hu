"use client";

import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import type { Workflow } from "@/types/portal";

interface WorkflowMilestonePaymentProps {
  workflow: Workflow;
  actionLoading: string | null;
  onPay: (workflowId: string, phase: string) => void;
}

/**
 * Az aktuális fázis pénzügyi mérföldköve (Stripe).
 * Az árat a `Workflow` `${status}Price` / `${status}Paid` kulcsaiból
 * olvassa; ha nincs ár beállítva, a blokk nem renderelődik.
 */
export default function WorkflowMilestonePayment({
  workflow,
  actionLoading,
  onPay,
}: WorkflowMilestonePaymentProps) {
  const phase = workflow.status;
  const priceKey = `${phase}Price` as keyof Workflow;
  const paidKey = `${phase}Paid` as keyof Workflow;
  const phasePrice = workflow[priceKey] ? (workflow[priceKey] as number) : 0;
  const phasePaid = workflow[paidKey] === true;
  const busy = actionLoading === `pay_${workflow.id}_${phase}`;

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
              <span className="font-bold block">✓ Mérföldkő kiegyenlítve</span>
              <span className="text-[10px] text-emerald-500/70 font-mono block">
                Díj: {phasePrice.toLocaleString("hu-HU")} Ft • Fizetve
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
              Díj: {phasePrice.toLocaleString("hu-HU")} Ft (Fizetésre vár)
            </span>
          </div>

          <button
            type="button"
            disabled={busy}
            onClick={() => onPay(workflow.id, phase)}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-linear-to-r from-sky-500 to-violet-700 text-bg-base font-bold text-xs uppercase tracking-wider rounded-xl hover:scale-[1.02] transition-all cursor-pointer shrink-0 disabled:opacity-50"
          >
            {busy ? (
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
}
