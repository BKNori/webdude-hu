"use client";

import { useState, useEffect } from "react";
import { Bell, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getClientNotificationsAction, PortalNotification } from "@/app/actions/portal-notifications";

export default function NotificationCenter({ clientId }: { clientId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<PortalNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      const res = await getClientNotificationsAction(clientId);
      if (res.success && isMounted) {
        setNotifications(res.notifications);
        setUnreadCount(res.notifications.filter((n) => !n.read).length);
      }
    }
    load();
    const interval = setInterval(load, 30000); // 30 mp-es valós idejű szinkronizáció
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [clientId]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
        aria-label="Értesítések megnyitása"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-slate-950 text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-80 md:w-96 rounded-3xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-2xl p-5 z-50"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="font-bold text-white text-sm">Értesítések</h4>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 space-y-2 max-h-72 overflow-y-auto pr-1">
              {notifications.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">Nincsenek új értesítéseid.</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300"
                  >
                    {n.type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {n.type === "warning" && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
                    {n.type === "info" && <Info className="w-4 h-4 text-blue-400 shrink-0" />}
                    <div>
                      <p className="font-semibold text-white mb-0.5">{n.title}</p>
                      <p className="text-slate-400 leading-relaxed">{n.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
