"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Shield,
  Users,
  Zap,
  Activity,
  Settings,
  LogOut,
  Star,
  Layout,
  FileText,
  Search,
  Calendar,
  Monitor,
  FileImage,
  Share2,
  Briefcase,
  Presentation,
  Icon,
  Layers,
  Building2,
  Image,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { aiWorkshops } from "@/data/ai-workshops";

const iconMap: Record<string, React.ElementType> = {
  Logo: Sparkles,
  Image: Image,
  Search: Search,
  FileText: FileText,
  Layout: Layout,
  Calendar: Calendar,
  Monitor: Monitor,
  FileImage: FileImage,
  Share2: Share2,
  Briefcase: Briefcase,
  Presentation: Presentation,
  Icon: Icon,
  Layers: Layers,
  Building2: Building2,
};

const categoryLabels: Record<string, string> = {
  branding: "Branding",
  content: "Tartalom",
  design: "Dizájn",
  technical: "Technikai",
  workflow: "Workflow",
};

const categoryColors: Record<string, string> = {
  branding: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  content: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  design: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  technical: "bg-green-500/10 border-green-500/20 text-green-400",
  workflow: "bg-red-500/10 border-red-500/20 text-red-400",
};

export default function SuperadminWorkshopDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) {
        setLoading(false);
        return;
      }
      // Check if superadmin (hello@webdude.hu or admin role)
      const isSuperAdmin = user.email === "hello@webdude.hu";
      setIsAdmin(isSuperAdmin);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest animate-pulse font-bold">
          Dashboard betöltése...
        </p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center space-y-6 px-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
          <Shield className="w-8 h-8 text-red-400" />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-bold text-white">
            Hozzáférés megtagadva
          </h3>
          <p className="text-sm text-slate-400">
            Ez a Szuperadmin Kreatív Stúdió csak admin jogosultsággal érhető el.
          </p>
        </div>
        <Link
          href="/portal"
          className="px-6 py-3 rounded-xl bg-amber-500 text-bg-base font-bold hover:bg-amber-600 transition-colors"
        >
          Vissza a portálhoz
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-text-primary">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <Sparkles className="w-6 h-6 text-bg-base" />
            </div>
            <div>
              <span className="text-xs uppercase font-black tracking-widest text-amber-500 block">
                Szuperadmin
              </span>
              <span className="text-2xl font-extrabold text-white tracking-tight leading-none font-mono">
                Kreatív Stúdió
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Admin Hozzáférés
            </div>
            <Link
              href="/portal"
              className="px-4 py-2 rounded-xl border border-gray-800 hover:border-amber-500/30 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Kilépés
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-bg-elevated/30 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-amber-500" />
              <p className="text-xs text-slate-400">Összes Modul</p>
            </div>
            <p className="text-2xl font-bold text-white">14</p>
          </div>
          <div className="bg-bg-elevated/30 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-blue-500" />
              <p className="text-xs text-slate-400">Aktív Felhasználók</p>
            </div>
            <p className="text-2xl font-bold text-white">--</p>
          </div>
          <div className="bg-bg-elevated/30 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-green-500" />
              <p className="text-xs text-slate-400">Generálások</p>
            </div>
            <p className="text-2xl font-bold text-white">--</p>
          </div>
          <div className="bg-bg-elevated/30 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-purple-500" />
              <p className="text-xs text-slate-400">Rendszer Státusz</p>
            </div>
            <p className="text-2xl font-bold text-green-400">Online</p>
          </div>
        </div>

        {/* Workshop Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">AI Műhely Modulok</h2>
            <Link
              href="/portal/ai-muhely"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-800 hover:border-amber-500/30 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
            >
              <ExternalLink className="w-4 h-4" />
              Nyilvános Nézet
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiWorkshops.map((workshop, index) => {
              const IconComponent = iconMap[workshop.icon] || Sparkles;
              const categoryColor = categoryColors[workshop.category];

              return (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link
                    href={workshop.route}
                    className="block bg-bg-elevated/30 border border-gray-800 rounded-xl p-4 hover:border-amber-500/30 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-bg-base" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white leading-tight">
                            {workshop.name}
                          </h3>
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs font-mono border ${categoryColor}`}
                          >
                            {categoryLabels[workshop.category]}
                          </span>
                        </div>
                      </div>
                      {workshop.isPro && (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-xs font-bold text-amber-400">
                            PRO
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                      {workshop.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                      <p className="text-xs font-bold text-white">
                        {workshop.price}
                      </p>
                      <div className="flex items-center gap-1 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Megnyitás
                        </span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Gyors Műveletek</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/super-control"
              className="bg-bg-elevated/30 border border-gray-800 rounded-xl p-4 hover:border-amber-500/30 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Settings className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Rendszer Beállítások
                </p>
                <p className="text-xs text-slate-400">
                  Konfiguráció és maintenance
                </p>
              </div>
            </Link>
            <Link
              href="/admin/portal-kezelo"
              className="bg-bg-elevated/30 border border-gray-800 rounded-xl p-4 hover:border-amber-500/30 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Felhasználó Kezelő
                </p>
                <p className="text-xs text-slate-400">
                  Jogosultságok és workflow
                </p>
              </div>
            </Link>
            <Link
              href="/admin/work-log"
              className="bg-bg-elevated/30 border border-gray-800 rounded-xl p-4 hover:border-amber-500/30 transition-all flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Munkanapló</p>
                <p className="text-xs text-slate-400">
                  Generálási statisztikák
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
