"use client";

import OnboardingForm from "@/components/molecules/OnboardingForm";
import type { Order } from "@/types/addon";
import { categoryMap } from "@/lib/portalConfig";

interface PortalOnboardingSectionProps {
  orders: Order[];
  /** A `usePortalData.refreshOrders` függvénye (onboarding utáni frissítés). */
  refreshOrders: () => Promise<void>;
}

/**
 * Onboarding adatlapok szekció: a kifizetett, de még kitöltetlen add-onok
 * megrendelésekhez rendeli a kategória-specifikus OnboardingForm-ot.
 */
export default function PortalOnboardingSection({
  orders,
  refreshOrders,
}: PortalOnboardingSectionProps) {
  const pendingOrders = orders.filter(
    (o) => o.status === "paid" && !o.onboardingSubmitted
  );

  if (pendingOrders.length === 0) return null;

  return (
    <section className="mb-12 space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-mono font-black uppercase tracking-widest text-sky-500">
          Kötelező lépések
        </span>
        <h2 className="text-2xl font-extrabold text-text-primary tracking-tight font-mono">
          Onboarding Adatlapok Kitöltése
        </h2>
        <p className="text-slate-400 text-xs max-w-xl">
          Kérlek, töltsd ki az onboarding adatlapot a megvásárolt
          add-onokhoz, hogy elkezdhessem a munkát!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pendingOrders.map((order) => {
          const category = categoryMap[order.addonId] || "design";
          return (
            <div
              key={order.id}
              className="bg-slate-900/80 border border-slate-700 backdrop-blur-md rounded-2xl p-6 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-text-primary text-base font-mono">
                  {order.title}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-sky-500/10 text-sky-500 border border-sky-500/20">
                  Kitöltésre vár
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Kérlek, add meg a szükséges technikai / dizájn
                részleteket az alábbi űrlapon.
              </p>
              <OnboardingForm
                orderId={order.id}
                category={category}
                onSubmitSuccess={async () => {
                  // Refresh orders after submission
                  await refreshOrders();
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
