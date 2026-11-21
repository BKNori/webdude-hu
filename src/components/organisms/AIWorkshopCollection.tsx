"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Unlock,
  ArrowRight,
  Layers,
  UserCheck,
  LogOut,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut, type User } from "firebase/auth";
import { getClientUserProfileAction } from "@/actions/portal";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  ADMIN_DEFAULT_ALLOWED_TOOLS,
  generatorTools,
  type ToolCategory,
} from "@/data/ai-workshop-collection-config";

export default function AIWorkshopCollection() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("all");

  useEffect(() => {
    if (!auth) return;
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
  }, [router]);

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch {
      // Ignored
    }
  };

  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Felhasználó";

  const filteredTools =
    activeCategory === "all"
      ? generatorTools
      : generatorTools.filter((tool) => tool.category === activeCategory);

  if (loading) {
    return (
      <div data-theme="dark" className="min-h-screen bg-[#020617] text-[#e2e8f0] flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-md animate-ping" />
          <Loader2 className="w-10 h-10 animate-spin text-sky-500 relative" />
        </div>
        <p className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest animate-pulse">
          AI Stúdió betöltése...
        </p>
      </div>
    );
  }

  return (
    <div data-theme="dark" className="min-h-screen bg-[#020617] text-[#e2e8f0]">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="w-10 h-10 rounded-xl bg-linear-to-br from-sky-500 to-violet-700 flex items-center justify-center shadow-lg shadow-sky-500/10 cursor-pointer"
            >
              <Layers className="w-5 h-5 text-white" />
            </Link>
            <div>
              <span className="text-xs uppercase font-black tracking-widest text-sky-500 block">
                WebDude AI Studio
              </span>
              <span className="text-sm font-bold text-text-primary block -mt-0.5">
                AI Tervezőműhely
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/portal"
              className="text-[10px] sm:text-xs text-slate-400 hover:text-text-primary font-bold uppercase tracking-wider transition-colors font-mono"
            >
              Projektek
            </Link>
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs">
              <UserCheck className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-slate-400 font-medium truncate max-w-37.5">
                {user?.email}
              </span>
              {isAdmin && (
                <span className="text-[9px] font-black uppercase tracking-widest text-[#a78bfa] bg-[#7C3AED]/15 border border-[#7C3AED]/30 px-1.5 py-0.5 rounded">
                  Szuperadmin
                </span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-700 hover:border-red-500/40 text-slate-400 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Kijelentkezés</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <div className="space-y-2 relative">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
          <span className="text-xs font-mono font-black uppercase tracking-widest text-sky-500">
            Prémium AI Tervezők
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-text-primary tracking-tight leading-none font-mono">
            Kreatív Stúdió
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            Futtass le dizájn-, arculat- és kampánytervező folyamatokat az Elite
            AI motorokkal. A szuperadmin teljes hozzáféréssel rendelkezik, az
            ügyfeleknek pedig egyedileg oszthatók ki a modulok.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <p className="text-xs text-slate-400 font-mono">
              Üdvözöllek a Kreatív Stúdióban,{" "}
              <span className="text-slate-200 font-bold">{displayName}</span>
              {isAdmin && (
                <span className="text-[#a78bfa]">
                  {" "}
                  • Szuperadmin hozzáférés aktív
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(["all", ...CATEGORY_ORDER] as ToolCategory[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] ${
                activeCategory === cat
                  ? "bg-[#00B5F1]/15 border-[#00B5F1]/50 text-[#00B5F1] shadow-[0_0_14px_rgba(0,181,241,0.15)]"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-[#00B5F1]/30 hover:text-slate-200"
              }`}
            >
              {cat === "all" ? "Összes" : CATEGORY_LABELS[cat]}
              <span className="ml-1.5 opacity-60 font-mono">
                {cat === "all"
                  ? generatorTools.length
                  : generatorTools.filter((t) => t.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl text-xs flex items-center gap-2.5 max-w-2xl font-mono">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {filteredTools.length === 0 ? (
          <div className="rounded-3xl border border-[#00B5F1]/25 bg-slate-900/80 p-10 text-center max-w-2xl mx-auto space-y-4 shadow-[0_12px_36px_rgba(0,181,241,0.08)]">
            <div className="w-12 h-12 rounded-2xl bg-[#00B5F1]/10 border border-[#00B5F1]/30 text-[#00B5F1] flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" aria-hidden="true" />
            </div>
            <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest text-[#a78bfa]">
              Pro Prompt Stúdió · {activeCategory !== "all" ? CATEGORY_LABELS[activeCategory] : ""}
            </span>
            <h2 className="text-xl font-bold text-white font-mono">
              Építés alatt — hamarosan érkezik a következő stúdió-frissítéssel
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Ezen az új szakmai pilléren már aktívan dolgozom. Addig válassz egyet a többi működő stúdiókategória közül azonnali tervezéshez.
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
                className={`relative group bg-slate-900/80 backdrop-blur-md border transition-all duration-300 rounded-3xl p-6 flex flex-col justify-between overflow-hidden h-96 ${
                  hasAccess
                    ? "border-slate-700 hover:border-sky-500/50 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:shadow-[0_18px_40px_rgba(0, 181, 241,0.2)] hover:-translate-y-1"
                    : "border-slate-800 opacity-75"
                }`}
              >
                {hasAccess && (
                  <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-sky-500/5 group-hover:bg-sky-500/10 transition-all duration-500 blur-2xl pointer-events-none" />
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                        hasAccess
                          ? "bg-sky-500/10 border-sky-500/20 text-sky-500"
                          : "bg-slate-800/40 border-slate-700/30 text-slate-500"
                      }`}
                    >
                      <ToolIcon className="w-6 h-6" />
                    </div>

                    {hasAccess ? (
                      <span className="text-[9px] font-mono font-bold tracking-wider text-emerald-500 bg-emerald-500/5 border border-emerald-500/15 px-2.5 py-1 rounded-md uppercase flex items-center gap-1 select-none">
                        <Unlock className="w-2.5 h-2.5" />
                        Aktív
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md uppercase flex items-center gap-1 select-none">
                        <Lock className="w-2.5 h-2.5" />
                        Zárolt
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3
                      className={`text-base font-bold font-mono transition-colors ${
                        hasAccess
                          ? "text-text-primary group-hover:text-sky-500"
                          : "text-slate-400"
                      }`}
                    >
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans min-h-12">
                      {tool.description}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-2 border-t border-slate-700">
                    {tool.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-[10px] text-slate-400 font-mono"
                      >
                        <div
                          className={`w-1 h-1 rounded-full ${hasAccess ? "bg-sky-500/60" : "bg-slate-600"}`}
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
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/25 text-sky-500 font-bold transition-all text-xs uppercase tracking-wider font-mono cursor-pointer"
                    >
                      Generátor megnyitása
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <Link
                      href="/kapcsolat"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-all text-xs uppercase tracking-wider font-mono cursor-pointer"
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
    </div>
  );
}
