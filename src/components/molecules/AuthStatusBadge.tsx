"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  LayoutDashboard,
  Sparkles,
  ShieldCheck,
  Gauge,
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
  /** Opcionális callback navigációkor (pl. mobil hamburger menü bezárása). */
  onNavigate?: () => void;
}

interface MenuCoords {
  top?: number;
  bottom?: number;
  right: number;
}

const ESTIMATED_MENU_HEIGHT = 280;

/**
 * Globális bejelentkezési állapotjelző és gyorsmenü a fejlécben.
 *
 * A lenyíló panelt `createPortal(..., document.body)` segítségével `fixed`
 * pozícióban, `z-[120]` rétegen rendereli, így sem a Topbar `max-h` korlátja,
 * sem a fejléc `backdrop-filter` stacking contextje, sem a Hero nem vágja le.
 */
export default function AuthStatusBadge({
  variant = "nav",
  onNavigate,
}: AuthStatusBadgeProps) {
  const router = useRouter();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [coords, setCoords] = useState<MenuCoords>({ top: 44, right: 16 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

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
        setIsAdmin(currentUser.email === "hello@webdude.hu");
      }
    });
    return () => unsub();
  }, []);

  const updateMenuPosition = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      setMenuOpen(false);
      return;
    }
    const right = Math.max(12, window.innerWidth - rect.right);
    const openUpward =
      variant === "mobile" ||
      rect.bottom + ESTIMATED_MENU_HEIGHT > window.innerHeight;

    setCoords(
      openUpward
        ? { bottom: Math.max(12, window.innerHeight - rect.top + 8), right }
        : { top: Math.max(8, rect.bottom + 8), right }
    );
  }, [variant]);

  // Kívülre kattintás, ESC, görgetés és átméretezés kezelése nyitott menünél.
  useEffect(() => {
    if (!menuOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !containerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, { passive: true });
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, updateMenuPosition]);

  const handleToggleMenu = () => {
    if (!menuOpen) updateMenuPosition();
    setMenuOpen((prev) => !prev);
  };

  const handleItemNavigate = () => {
    setMenuOpen(false);
    onNavigate?.();
  };

  const handleLogout = useCallback(async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      setMenuOpen(false);
      onNavigate?.();
      router.push("/");
      router.refresh();
    } catch {
      // Ignored — a felhasználó újra próbálhat
    }
  }, [onNavigate, router]);

  if (!mounted || !auth) {
    if (variant === "topbar") {
      return (
        <span className="inline-block h-4 w-20 animate-pulse rounded bg-slate-200/80 dark:bg-slate-800/60" />
      );
    }
    return (
      <span className="inline-block h-9 w-28 animate-pulse rounded-full bg-slate-200/80 dark:bg-slate-800/60" />
    );
  }

  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Felhasználó";

  /* ── NINCS BELÉPVE: Ügyfélportál / Belépés link ────────────────── */
  if (!user) {
    if (variant === "topbar") {
      return (
        <Link
          href="/portal"
          className={`group flex items-center gap-1.5 text-xs font-sans font-medium tracking-wide transition-colors duration-200 text-slate-600 dark:text-slate-400 hover:text-[#0369A1] dark:hover:text-[#00B5F1] ${FOCUS_RING}`}
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
          onClick={onNavigate}
          className={`flex items-center gap-3.5 px-4 py-4 min-h-14 rounded-2xl border border-slate-200/90 dark:border-slate-800/40 hover:border-[#0369A1]/40 dark:hover:border-[#00B5F1]/30 hover:bg-slate-100 dark:hover:bg-slate-900/30 transition-all text-slate-800 dark:text-slate-100 ${FOCUS_RING}`}
        >
          <span className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
            <User className="w-4.5 h-4.5" />
          </span>
          <span className="font-semibold text-base">Ügyfélportál / Belépés</span>
        </Link>
      );
    }
    return (
      <Link
        href="/portal"
        className={`flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:text-[#0369A1] dark:hover:text-[#00B5F1] hover:border-[#0369A1]/50 dark:hover:border-[#00B5F1]/40 text-xs font-bold uppercase tracking-wider transition-all ${FOCUS_RING}`}
      >
        <User className="w-3.5 h-3.5" />
        <span className="hidden md:inline">Ügyfélportál</span>
        <span className="md:hidden">Belépés</span>
      </Link>
    );
  }

  /* ── BE VAN LÉPVE: Pill közvetlen link + Portalozott gyorsmenü ──── */
  const pillHref = isAdmin ? "/admin/portal-kezelo" : "/portal";
  const menuItems = [
    {
      href: "/portal",
      label: "Ügyfélportál (Vezérlőpult)",
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
            href: "/admin/portal-kezelo",
            label: "Portál Kezelő",
            icon: ShieldCheck,
          },
          {
            href: "/admin/dashboard",
            label: "Admin Dashboard",
            icon: Gauge,
          },
        ]
      : []),
  ];

  const dropdownPortal =
    menuOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={menuRef}
            role="menu"
            aria-label="Felhasználói fiók menü"
            style={{
              position: "fixed",
              top: coords.top,
              bottom: coords.bottom,
              right: coords.right,
            }}
            className="z-[120] w-64 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/95 text-[#0F172A] dark:text-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.18)] dark:shadow-[0_24px_60px_rgba(2,6,23,0.75)] backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-900/60">
              <p className="text-xs font-bold text-[#0F172A] dark:text-white truncate">
                {displayName}
              </p>
              {user.email && (
                <p className="text-[11px] text-[#475569] dark:text-slate-400 truncate">
                  {user.email}
                </p>
              )}
              {isAdmin && (
                <p className="mt-1 text-[9px] font-black uppercase tracking-widest text-[#6D28D9] dark:text-[#a78bfa]">
                  Szuperadmin hozzáférés aktív
                </p>
              )}
            </div>
            <div className="p-1.5 space-y-0.5">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={handleItemNavigate}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#0F172A] dark:text-slate-200 hover:text-[#0369A1] dark:hover:text-[#00B5F1] hover:bg-sky-50 dark:hover:bg-[#00B5F1]/10 transition-colors ${FOCUS_RING}`}
                >
                  <item.icon className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1] shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer ${FOCUS_RING}`}
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Kijelentkezés</span>
              </button>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <Link
        href={pillHref}
        onClick={onNavigate}
        aria-label={
          isAdmin ? "Portál Kezelő megnyitása" : "Ügyfélportál megnyitása"
        }
        className={`flex items-center gap-2 rounded-l-full border border-r-0 border-[#0369A1]/40 dark:border-[#00B5F1]/40 bg-white dark:bg-slate-900/90 ${variant === "topbar" ? "py-1 pl-3 pr-2" : "py-1.5 pl-3 pr-2.5"} text-xs transition-all hover:border-[#0369A1] dark:hover:border-[#00B5F1] hover:shadow-[0_0_16px_rgba(3,105,161,0.18)] ${FOCUS_RING}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
        </span>
        <span className="truncate max-w-28 font-semibold text-[#0F172A] dark:text-slate-200">
          {displayName}
        </span>
        {isAdmin && (
          <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-violet-100 dark:bg-[#7C3AED]/20 border border-violet-300 dark:border-[#7C3AED]/40 text-[#6D28D9] dark:text-[#a78bfa] text-[9px] font-black uppercase tracking-wider">
            <ShieldCheck className="w-2.5 h-2.5" />
            Szuperadmin
          </span>
        )}
      </Link>
      <button
        type="button"
        onClick={handleToggleMenu}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        aria-label={`Fiók menü — ${displayName}`}
        className={`flex items-center rounded-r-full border border-[#0369A1]/40 dark:border-[#00B5F1]/40 bg-white dark:bg-slate-900/90 ${variant === "topbar" ? "py-1 px-2" : "py-1.5 px-2.5"} text-[#334155] dark:text-slate-300 hover:text-[#0369A1] dark:hover:text-[#00B5F1] hover:border-[#0369A1] dark:hover:border-[#00B5F1] transition-all cursor-pointer ${FOCUS_RING}`}
      >
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
        />
      </button>
      {dropdownPortal}
    </div>
  );
}
