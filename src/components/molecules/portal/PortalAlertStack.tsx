"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface PortalAlertStackProps {
  error: string;
  successMessage: string;
  verifyingPayment: boolean;
}

/**
 * Portál visszajelző réteg: hiba- és sikerüzenet sáv, valamint a Stripe
 * tranzakció-ellenőrzés alatti teljes képernyős overlay.
 */
export default function PortalAlertStack({
  error,
  successMessage,
  verifyingPayment,
}: PortalAlertStackProps) {
  return (
    <>
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl text-xs flex items-center gap-2.5 max-w-2xl font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-2xl text-xs flex items-center gap-2.5 max-w-2xl font-mono">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {successMessage}
        </div>
      )}

      {verifyingPayment && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-md z-100 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-sky-500" />
          <p className="text-sm font-bold font-mono text-white uppercase tracking-wider animate-pulse">
            Stripe tranzakció ellenőrzése...
          </p>
        </div>
      )}
    </>
  );
}
