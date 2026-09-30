"use client";

import OrderStatusCard from "@/components/molecules/OrderStatusCard";
import type { Order } from "@/types/addon";

interface PortalOrdersSectionProps {
  orders: Order[];
  isAdmin: boolean;
  /**
   * A `usePortalData.handleDeliverOrder`: kézbesítés, siker/hiba jelentés
   * és a megrendelések frissítése.
   */
  onDeliver: (orderId: string, notes: string, url: string) => Promise<void>;
}

/**
 * Megrendelések szekció (superadmin nézet): OrderStatusCard rács
 * kézbesítési akcióval.
 */
export default function PortalOrdersSection({
  orders,
  isAdmin,
  onDeliver,
}: PortalOrdersSectionProps) {
  if (!(isAdmin && orders.length > 0)) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-100 mb-4">
        Megrendelések
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <OrderStatusCard
            key={order.id}
            order={order}
            isAdmin={isAdmin}
            onDeliver={onDeliver}
          />
        ))}
      </div>
    </section>
  );
}
