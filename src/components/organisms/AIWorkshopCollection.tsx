"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  ArrowRight,
  Layers,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { type User } from "firebase/auth";
import { getClientUserProfileAction } from "@/actions/portal";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  ADMIN_DEFAULT_ALLOWED_TOOLS,
  generatorTools,
  type ToolCategory,
} from "@/data/ai-workshop-collection-config";

export default function AIWorkshopCollection() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("all");

  useEffect(() => {
    if (!auth) {
      queueMicrotask(() => setLoading(false));
      return;
    }
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      setUser(currentUser);

      try {
        const token = await currentUser.getIdToken(true);
        const res = await getClientUserProfileAction(token);

        if (res.success && res.profile) {
          const isAdminUser =
            res.profile.role === "admin" ||
            currentUser.email === "hello@webdude.hu";
          setIsAdmin(isAdminUser);

          if (isAdminUser) {
            setAllowedTools(ADMIN_DEFAULT_ALLOWED_TOOLS);
          } else {
            setAllowedTools(res.profile.allowedTools || []);
          }
        } else {
          setError(res.error || "Nem sikerült betölteni a profiladatokat.");
        }
      } catch {
        setError("Hálózati hiba történt a profil lekérése során.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Felhasználó";

  const filteredTools =
    activeCategory === "all"
      ? generatorTools
      : generatorTools.filter((tool) => tool.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#0369A1]/15 dark:bg-[#00B5F1]/20 blur-md animate-ping" />
          <Loader2 className="w-10 h-10 animate-spin text-[#0369A1] dark:text-[#00B5F1] relative" />
        </div>
        <p className="text-xs font-bold font-mono text-slate-600 dark:text-slate-300 uppercase tracking-widest animate-pulse">
          AI Stúdió betöltése...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-3 relative">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-72 h-72 rounded-full bg-[#0369A1]/5 dark:bg-[#00B5F1]/5 blur-3xl pointer-events-none" />
        <span className="inline-block text-xs font-mono font-bold uppercase tracking-widest text-[#0369A1] dark:text-[#00B5F1]">
          Prémium AI Tervezők · 5 Szakmai Pillér
        </span>
        <h1 className="text-4xl md:text-5xl text-[#0F172A] dark:text-[#F8FAFC] tracking-tight leading-none">
          Kreatív Stúdió &amp; AI Tervezőműhely
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
          Futtass le dizájn-, arculat-, nyomdai prepress-, szoftver-architektúra
          és elemző folyamatokat determinisztikus és generatív AI motorokkal. A
          szuperadmin teljes hozzáféréssel rendelkezik, az ügyfeleknek pedig
          egyedileg oszthatók ki a modulok.
        </p>
        {user && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-mono">
              Üdvözöllek a Kreatív Stúdióban,{" "}
              <span className="text-[#0F172A] dark:text-[#F8FAFC] font-bold">
                {displayName}
              </span>
              {isAdmin && (
                <span className="text-[#6D28D9] dark:text-[#A78BFA] font-semibold">
                  {" "}
                  • Szuperadmin hozzáférés aktív
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(["all", ...CATEGORY_ORDER] as ToolCategory[]).map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              aria-pressed={isActive}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                isActive
                  ? "bg-[#0369A1] dark:bg-[#00B5F1] border-transparent text-white dark:text-slate-950 shadow-sm"
                  : "bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#0369A1] dark:hover:border-[#00B5F1] hover:text-[#0369A1] dark:hover:text-[#00B5F1] shadow-2xs dark:shadow-none"
              }`}
            >
              {cat === "all" ? "Összes" : CATEGORY_LABELS[cat]}
              <span className="ml-1.5 opacity-75 font-mono">
                {cat === "all"
                  ? generatorTools.length
                  : generatorTools.filter((t) => t.category === cat).length}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-2xl text-xs flex items-center gap-2.5 max-w-2xl font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {filteredTools.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]/90 p-10 text-center max-w-2xl mx-auto space-y-4 shadow-sm dark:shadow-none">
          <div className="w-12 h-12 rounded-2xl bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/30 text-[#0369A1] dark:text-[#00B5F1] flex items-center justify-center mx-auto">
            <Layers className="w-6 h-6" aria-hidden="true" />
          </div>
          <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest text-[#6D28D9] dark:text-[#A78BFA]">
            Pro Prompt Stúdió ·{" "}
            {activeCategory !== "all" ? CATEGORY_LABELS[activeCategory] : ""}
          </span>
          <h2 className="text-2xl text-[#0F172A] dark:text-[#F8FAFC]">
            Építés alatt — hamarosan érkezik a következő stúdió-frissítéssel
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Ezen az új szakmai pilléren már aktívan dolgozom. Addig válassz
            egyet a többi működő stúdiókategória közül azonnali tervezéshez.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
          >
            Összes eszköz megjelenítése
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const hasAccess = isAdmin || allowedTools.includes(tool.id);
            const ToolIcon = tool.icon;

            return (
              <div
                key={tool.id}
                className={`relative group bg-white dark:bg-[#0F172A]/90 border transition-all duration-300 rounded-3xl p-6 flex flex-col justify-between overflow-hidden min-h-96 ${
                  hasAccess
                    ? "border-slate-200 dark:border-slate-800 hover:border-[#0369A1]/50 dark:hover:border-[#00B5F1]/50 shadow-sm hover:shadow-md dark:shadow-none hover:-translate-y-1"
                    : "border-slate-200/80 dark:border-slate-800/80 opacity-85"
                }`}
              >
                {hasAccess && (
                  <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-[#0369A1]/5 dark:bg-[#00B5F1]/5 group-hover:bg-[#0369A1]/10 dark:group-hover:bg-[#00B5F1]/10 transition-all duration-500 blur-2xl pointer-events-none" />
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                        hasAccess
                          ? "bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 border-[#0369A1]/20 dark:border-[#00B5F1]/20 text-[#0369A1] dark:text-[#00B5F1]"
                          : "bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      <ToolIcon className="w-6 h-6" />
                    </div>

                    {hasAccess ? (
                      <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-md uppercase flex items-center gap-1 select-none">
                        <Unlock className="w-3 h-3" />
                        Aktív
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold tracking-wider text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-md uppercase flex items-center gap-1 select-none">
                        <Lock className="w-3 h-3" />
                        Zárolt
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h3
                      className={`text-xl transition-colors ${
                        hasAccess
                          ? "text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#0369A1] dark:group-hover:text-[#00B5F1]"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-12">
                      {tool.description}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                    {tool.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300 font-mono"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            hasAccess
                              ? "bg-[#0369A1] dark:bg-[#00B5F1]"
                              : "bg-slate-400 dark:bg-slate-600"
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  {hasAccess ? (
                    <Link
                      href={`/portal/ai-muhely/${tool.slug}`}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white font-bold transition-all text-xs uppercase tracking-wider cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
                    >
                      Generátor megnyitása
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <Link
                      href="/kapcsolat"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#0B1120] dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-all text-xs uppercase tracking-wider cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1]"
                    >
                      Hozzáférés igénylése
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
