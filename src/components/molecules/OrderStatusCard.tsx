// src/components/molecules/OrderStatusCard.tsx
"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { Order } from "@/types/addon";

interface Props {
  order: Order;
  isAdmin: boolean;
  onDeliver: (orderId: string, notes: string, url: string) => Promise<void>;
}

export default function OrderStatusCard({ order, isAdmin, onDeliver }: Props) {
  const shouldReduce = useReducedMotion();
  const [delivering, setDelivering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");

  const handleDeliver = async () => {
    if (!notes.trim() || !url.trim()) {
      setError("Megjegyzés és URL kötelező");
      return;
    }
    setError(null);
    setSuccess(null);
    setDelivering(true);
    try {
      await onDeliver(order.id, notes, url);
      setSuccess("Rendelés kézbesítve");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ismeretlen hiba");
    } finally {
      setDelivering(false);
    }
  };

  return (
    <motion.div
      className="bg-bg-surface/40 backdrop-blur-xl border border-bg-elevated/80 rounded-2xl p-4 hover:border-sky-500/20 transition-all"
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: shouldReduce ? 0 : 0.3 },
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-white">{order.title || "Add‑on"}</h3>
        <span
          className={`px-2 py-0.5 rounded text-xs ${order.status === "delivered" ? "bg-emerald-500/10 text-emerald-500" : "bg-sky-500/10 text-sky-500"}`}
        >
          ${order.status}
        </span>
      </div>
      <p className="text-sm text-slate-300 mb-2">
        Ár: {order.amount.toLocaleString("hu-HU")} Ft
      </p>
      {order.status !== "delivered" && isAdmin && (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Kézbesítési megjegyzés"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3 py-1.5 bg-[#0a0f26]/80 border border-bg-elevated/80 rounded focus:outline-none focus:border-sky-500 text-sm text-white placeholder-slate-600"
          />
          <input
            type="url"
            placeholder="Kézbesítési URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-1.5 bg-[#0a0f26]/80 border border-bg-elevated/80 rounded focus:outline-none focus:border-sky-500 text-sm text-white placeholder-slate-600"
          />
          {error && (
            <div className="flex items-center text-xs text-red-400">
              <AlertCircle className="w-3 h-3 mr-1" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center text-xs text-emerald-400">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              {success}
            </div>
          )}
          <button
            type="button"
            disabled={delivering}
            onClick={handleDeliver}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-linear-to-r from-sky-500 to-violet-700 text-bg-base text-xs font-bold rounded hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {delivering ? (
              <span className="animate-pulse">Kézbesítés...</span>
            ) : (
              <>
                <CreditCard className="w-3 h-3" />
                Kézbesítés
              </>
            )}
          </button>
        </div>
      )}
    </motion.div>
  );
}
