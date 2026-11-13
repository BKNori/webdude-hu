"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  LayoutDashboard,
  Sparkles,
  ShieldCheck,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { signOut, type User as FirebaseUser } from "firebase/auth";
import { getClientUserProfileAction } from "@/actions/portal";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base";

interface AuthStatusBadgeProps {
  /** "topbar" = vékony felső sáv, "nav" = fő navigáció, "mobile" = mobil menü */
  variant?: "topbar" | "nav" | "mobile";
}

/**
 * Globális bejelentkezési állapotjelző a fejlécbe.
 *
 * SSR-biztos: a Firebase Auth kliens oldalon inicializálódik, ezért a
 * komponens a mount-ig egy semleges placeholder-t renderel — így a
 * szerver- és kliens-HTML mindig egyezik (nincs hydration mismatch).
 *
 * Nem bejelentkezve: letisztult „Ügyfélportál / Belépés" link.
 * Bejelentkezve: Kék-Lila v7.0 glassmorphism pill — pulzáló zöld
 * „Online" pont, megjelenítendő név/email, SZUPERADMIN badge és
 * gyorsmenü (Vezérlőpult, AI Műhely, Admin Panel, Kijelentkezés).
 */
export default function AuthStatusBadge({
  variant = "nav",
}: AuthStatusBadgeProps) {
  const router = useRouter();
  // Hydration-biztos client-only jelzés: szerveren false, kliensen true.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!auth) return;
    const unsub = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setIsAdmin(false);
        return;
      }
      setUser(currentUser);
      try {
        const token = await currentUser.getIdToken(true);
        const res = await getClientUserProfileAction(token);
        const admin =
          (res.success && res.profile?.role === "admin") ||
          currentUser.email === "hello@webdude.hu";
        setIsAdmin(admin);
      } catch {
        // Hálózati hiba esetén csak az email-alapú admin ellenőrzés marad
        setIsAdmin(currentUser.email === "hello@webdude.hu");
      }
    });
    return () => unsub();
  }, []);

  // Kattintáson kívüli területre kattintva zárja a menüt.
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLogout = useCallback(async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      setMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      // Ignored — a felhasználó újra próbálhat
    }
  }, [router]);

  // Mount-ig semleges placeholder (hydration safety).
  if (!mounted || !auth) {
    if (variant === "topbar") {
      return <span className="inline-block h-4 w-20 animate-pulse rounded bg-slate-800/60" />;
    }
    return <span className="inline-block h-9 w-28 animate-pulse rounded-full bg-slate-800/60" />;
  }

  const displayName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Felhasználó";

  /* ── NINCS BELÉPVE: Portal link ─────────────────────────────────── */
  if (!user) {
    if (variant === "topbar") {
      return (
        <Link
          href="/portal"
          className={`group flex items-center gap-1.5 text-xs font-sans font-medium tracking-wide transition-colors duration-200 text-slate-400 hover:text-[#00B5F1] ${FOCUS_RING}`}
        >
          <User className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
          <span>Belépés</span>
        </Link>
      );
    }
    if (variant === "mobile") {
      return (
        <Link
          href="/portal"
          className={`flex items-center gap-3.5 px-4 py-4 min-h-14 rounded-2xl border border-slate-800/40 hover:border-[#00B5F1]/30 hover:bg-slate-900/30 transition-all text-slate-100 ${FOCUS_RING}`}
        >
          <span className="w-9 h-9 rounded-xl bg-slate-800/60 text-slate-400 flex items-center justify-center shrink-0">
            <User className="w-4.5 h-4.5" />
          </span>
          <span className="font-semibold text-base">Ügyfélportál / Belépés</span>
        </Link>
      );
    }
    return (
      <Link
        href="/portal"
        className={`flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700/60 text-slate-300 hover:text-[#00B5F1] hover:border-[#00B5F1]/40 text-xs font-bold uppercase tracking-wider transition-all ${FOCUS_RING}`}
      >
        <User className="w-3.5 h-3.5" />
        <span className="hidden md:inline">Ügyfélportál</span>
        <span className="md:hidden">Belépés</span>
      </Link>
    );
  }

  /* ── BE VAN LÉPVE: Glassmorphism pill + gyorsmenü ───────────────── */
  const pill = (
    <>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      <span className="truncate max-w-28 font-semibold text-slate-200">
        {displayName}
      </span>
      {isAdmin && (
        <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#a78bfa] text-[9px] font-black uppercase tracking-wider">
          <ShieldCheck className="w-2.5 h-2.5" />
          Szuperadmin
        </span>
      )}
    </>
  );

  const menuItems = [
    {
      href: "/portal",
      label: "Vezérlőpult",
      icon: LayoutDashboard,
    },
    {
      href: "/portal/ai-muhely",
      label: "AI Műhely",
      icon: Sparkles,
    },
    ...(isAdmin
      ? [
          {
            href: "/admin",
            label: "Admin Panel",
            icon: ShieldCheck,
          },
        ]
      : []),
  ];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        aria-label={`Fiók menü — ${displayName}`}
        className={`flex items-center gap-2 rounded-full border border-[#00B5F1]/40 bg-slate-900/90 backdrop-blur-xl px-3 py-1.5 text-xs transition-all hover:border-[#00B5F1]/70 hover:shadow-[0_0_16px_rgba(0,181,241,0.25)] ${FOCUS_RING} ${
          variant === "topbar" ? "py-1" : ""
        }`}
      >
        {pill}
        <ChevronDown
          className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="menu"
            className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="px-4 py-3 border-b border-slate-800/60">
              <p className="text-xs font-bold text-slate-200 truncate">
                {displayName}
              </p>
              {user.email && (
                <p className="text-[11px] text-slate-500 truncate">
                  {user.email}
                </p>
              )}
              {isAdmin && (
                <p className="mt-1 text-[9px] font-black uppercase tracking-widest text-[#a78bfa]">
                  Szuperadmin hozzáférés aktív
                </p>
              )}
            </div>
            <div className="p-1.5">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-[#00B5F1] hover:bg-[#00B5F1]/10 transition-colors ${FOCUS_RING}`}
                >
                  <item.icon className="w-4 h-4 text-[#00B5F1] shrink-0" />
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors ${FOCUS_RING}`}
              >
                <LogOut className="w-4 h-4 shrink-0" />
                Kijelentkezés
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
