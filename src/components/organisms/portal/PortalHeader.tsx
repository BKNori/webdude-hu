"use client";

import Link from "next/link";
import type { User } from "firebase/auth";
import { Copy, Layers, LogOut, Sparkles, UserCheck } from "lucide-react";
import { motion } from "motion/react";
import PortalNotificationBell from "@/components/molecules/PortalNotificationBell";

interface PortalHeaderProps {
  user: User;
  isAdmin: boolean;
  onLogout: () => void;
}

/**
 * A portál sticky fejléce: brand, navigáció (Projektek / Műhely /
 * Sablonok), PortalNotificationBell, email chip és kijelentkezés gomb.
 */
export default function PortalHeader({
  user,
  isAdmin,
  onLogout,
}: PortalHeaderProps) {
  return (
    <header className="border-b border-sky-500/20 bg-bg-surface/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-sky-400 to-violet-700 flex items-center justify-center shadow-lg shadow-sky-500/10">
              <Layers className="w-5 h-5 text-bg-base" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="text-lg font-bold text-text-primary tracking-tight">
                WebDude
              </span>
            </motion.div>
          </div>
          {/* Portal Navigation */}
          <nav className="flex items-center gap-3 sm:gap-4 ml-3 sm:ml-6">
            <Link
              href="/portal"
              className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-sky-500 transition-colors"
            >
              Projektek
            </Link>
            <Link
              href="/portal/ai-muhely"
              className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-sky-500 hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              Műhely
            </Link>
            {isAdmin && user?.email === "hello@webdude.hu" && (
              <Link
                href="/portal/prompt-sablonok"
                className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-sky-500 transition-colors flex items-center gap-1"
              >
                <Copy className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                Sablonok
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <PortalNotificationBell />
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-xs">
            <UserCheck className="w-3.5 h-3.5 text-sky-500" />
            <span className="text-text-primary font-medium truncate max-w-37.5">
              {user.email}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-700 hover:border-red-500/40 text-slate-400 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Kijelentkezés</span>
          </button>
        </div>
      </div>
    </header>
  );
}
