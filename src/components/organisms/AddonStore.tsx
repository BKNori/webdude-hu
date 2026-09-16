"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { getAddonsAction, getClientOrdersAction } from "@/actions/addons";
import { createStripeCheckoutSessionAction } from "@/actions/stripe";
import { Addon, Order } from "@/types/addon";
import {
  Loader2,
  Check,
  CreditCard,
  ShoppingBag,
  Sparkles,
  Palette,
  Cpu,
  TrendingUp,
} from "lucide-react";

interface AddonStoreProps {
  idToken: string;
  onOrderError: (msg: string) => void;
}

const categoryIcons = {
  ai: Cpu,
  design: Palette,
  tech: Sparkles,
  cro: TrendingUp,
};

export default function AddonStore({ idToken, onOrderError }: AddonStoreProps) {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const router = useRouter();

  const fetchStoreData = useCallback(async () => {
    try {
      const addonsRes = await getAddonsAction(idToken);
      if (addonsRes.success && addonsRes.addons) {
        setAddons(addonsRes.addons);
      }

      const ordersRes = await getClientOrdersAction(idToken);
      if (ordersRes.success && ordersRes.orders) {
        setOrders(ordersRes.orders);
      }
    } catch {
      // Graceful error handling
    } finally {
      setLoading(false);
    }
  }, [idToken]);

  useEffect(() => {
    if (idToken) {
      void (async () => {
        await fetchStoreData();
      })();
    }
  }, [idToken, fetchStoreData]);

  const handlePurchase = async (addonId: string) => {
    setActionLoading(addonId);
    try {
      const origin = window.location.origin;
      const res = await createStripeCheckoutSessionAction(
        idToken,
        "addon",
        addonId,
        origin
      );
      if (res.success && res.url) {
        router.push(res.url);
      } else {
        onOrderError(res.error || "Hiba történt a fizetés indításakor.");
      }
    } catch {
      onOrderError("Kapcsolódási hiba a fizetés indításakor.");
    } finally {
      setActionLoading(null);
    }
  };

  const getOrderStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "paid":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
      case "delivered":
        return "bg-blue-500/10 border-blue-500/20 text-blue-400";
      default:
        return "bg-sky-500/10 border-sky-500/20 text-sky-400";
    }
  };

  const getOrderStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "paid":
        return "Fizetve / Feldolgozás alatt";
      case "delivered":
        return "Teljesítve";
      default:
        return "Fizetésre vár";
    }
  };

  if (loading) {
    return (
      <div className="glass-card border border-white/5 p-12 text-center flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
        <p className="text-xs text-slate-400 font-mono">
          Add-on áruház betöltése...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-elevated/30 backdrop-blur-md border border-bg-elevated/50 rounded-2xl p-6 md:p-8 space-y-8 relative overflow-hidden transition-all duration-300 hover:border-sky-500/10 shadow-xl">
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/2 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="space-y-1">
        <span className="text-xs font-mono font-black uppercase tracking-widest text-sky-500">
          Mikro-szolgáltatások & Extrák
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight leading-none font-mono">
          WebDude Add-on Store
        </h2>
        <p className="text-slate-400 text-xs max-w-xl">
          Bővítsd a rendszeredet extra funkciókkal, sebesség-optimalizálással
          vagy marketing tartalmakkal egy kattintással.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addons.map((addon, index) => {
          const Icon = categoryIcons[addon.category] || Sparkles;
          const isPending = actionLoading === addon.id;
          const order = orders.find((o) => o.addonId === addon.id);
          const hasPurchased =
            order && (order.status === "paid" || order.status === "delivered");

          return (
            <motion.div
              key={addon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-bg-elevated/30 backdrop-blur-md border border-bg-elevated/50 rounded-2xl p-6 flex flex-col justify-between hover:border-sky-500/20 transition-all duration-300 shadow-lg group"
            >
              <div className="space-y-4">
                {/* Badge and Icon */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded bg-transparent border border-slate-800 text-slate-400">
                    {addon.category}
                  </span>
                  <Icon
                    className="w-5 h-5 text-slate-500 group-hover:text-sky-500 transition-colors"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title & Description */}
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-base font-mono">
                    {addon.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {addon.description}
                  </p>
                </div>

                {/* Features list */}
                <ul className="space-y-2 pt-2">
                  {addon.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-xs text-slate-300"
                    >
                      <Check
                        className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & Action Button */}
              <div className="space-y-4 pt-6 border-t border-slate-800/60 mt-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] uppercase font-mono text-slate-500">
                    Egyszeri díj
                  </span>
                  <span className="text-sky-500 font-bold text-lg font-mono">
                    {addon.price.toLocaleString("hu-HU")} Ft
                  </span>
                </div>

                {hasPurchased ? (
                  <div className="w-full flex items-center justify-center gap-1.5 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold font-mono">
                    <Check className="w-4 h-4 shrink-0" strokeWidth={2.5} />
                    Aktív
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={actionLoading !== null}
                    onClick={() => handlePurchase(addon.id)}
                    className={`w-full py-3 rounded-xl bg-sky-500 text-bg-base font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-violet-700 disabled:opacity-50 ${
                      isPending
                        ? "animate-pulse shadow-[0_0_30px_rgba(0, 181, 241,0.6)]"
                        : ""
                    }`}
                  >
                    {isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin text-bg-base" />
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        Megrendelés
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Orders history list */}
      {orders.length > 0 && (
        <div className="space-y-4 border-t border-slate-800/80 pt-6 mt-8">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-slate-500" strokeWidth={1.5} />
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 block">
              Korábbi megrendeléseid
            </span>
          </div>

          <div className="space-y-2">
            {orders.map((order) => {
              const matchedAddon = addons.find((a) => a.id === order.addonId);
              return (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-transparent border border-white/5 rounded-xl p-4 gap-3 text-xs font-mono"
                >
                  <div className="space-y-1">
                    <span className="text-white font-bold block">
                      {matchedAddon?.title || "Kiegészítő szolgáltatás"}
                    </span>
                    <span className="text-[9px] text-slate-500 block">
                      Rendelés ID: {order.id} • Fizetve:{" "}
                      {order.amount.toLocaleString("hu-HU")} Ft • Dátum:{" "}
                      {new Date(order.createdAt).toLocaleDateString("hu-HU")}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-wider ${getOrderStatusBadge(order.status)}`}
                  >
                    {getOrderStatusLabel(order.status)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
