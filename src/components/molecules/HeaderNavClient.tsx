"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Menu,
  X,
  User,
  Bot,
  Layers,
  Package,
  Briefcase,
  Newspaper,
  Lock,
  ArrowRight,
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Language } from "@/types/dictionary";
import { getLanguageFromPathname } from "@/lib/dictionary";
import { Dictionary } from "@/types/dictionary";

interface HeaderNavClientProps {
  dictionary?: Dictionary;
  currentLang?: Language;
}
import { NAV_ITEMS, SubItem } from "@/config/navigation";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { ComponentType } from "react";

/** Egységes Electric Cyan fókuszgyűrű (WCAG 2.4.7 – látható fókusz). */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]";

/** Mobilmenü főelem ikonok — a navigációs menüpontokhoz rendelve. */
const NAV_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Norbi: User,
  "AI Megoldások": Bot,
  Szolgáltatások: Layers,
  Termékek: Package,
  Munkáim: Briefcase,
  Hírek: Newspaper,
  Ügyfélportál: Lock,
};

export default function HeaderNavClient({
  currentLang,
}: HeaderNavClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const detectedLang = getLanguageFromPathname(pathname);
  const actualLang = currentLang || detectedLang;

  // Mobil menü bezárása – ESC és a fókuszcsapda visszahívása is ezt használja.
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setOpenSection(null);
  }, []);

  // A hamburger/bezáró gomb – bezáráskor ide kerül vissza a fókusz.
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  // Fókuszcsapda KIZÁRÓLAG a mobilmenü panelre kötve (nem a teljes nav-ra).
  const mobileMenuRef = useFocusTrap<HTMLDivElement>(
    isOpen,
    closeMenu,
    toggleButtonRef
  );

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
    setDropdownTimeout(timeout);
  };

  // Scroll handling for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Desktop töréspontra váltáskor a mobil menü bezárul.
  useEffect(() => {
    if (!isOpen) return;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const handleBreakpointChange = () => {
      if (desktopQuery.matches) closeMenu();
    };

    desktopQuery.addEventListener("change", handleBreakpointChange);
    return () =>
      desktopQuery.removeEventListener("change", handleBreakpointChange);
  }, [isOpen, closeMenu]);

  // Body scroll lock: megnyitott mobilmenüben az oldal háttér nem gördíthető.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const renderDropdownContent = (subItems: SubItem[]) => {
    return (
      <div className="flex flex-col gap-1 p-4">
        {subItems.map((sub, subIndex) => (
          <motion.div
            key={sub.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: subIndex * 0.03 }}
          >
            <Link
              href={sub.href}
              aria-current={pathname === sub.href ? "page" : undefined}
              className={`block px-4 py-3 rounded-lg text-slate-200 hover:text-[#00B5F1] hover:bg-[#00B5F1]/10 transition-all duration-300 text-sm font-medium ${FOCUS_RING}`}
            >
              <div className="flex items-center gap-3">
                {sub.icon && (
                  <sub.icon className="w-4 h-4 text-[#00B5F1] shrink-0" />
                )}
                <span>{sub.name}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <>
      <motion.nav
        aria-label="Főnavigáció"
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 backdrop-blur-xl bg-bg-base/80 border-b ${
          isScrolled
            ? "border-slate-800/80 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            : "border-slate-800/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center h-full">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="WebDude főoldal"
            >
              <div className="h-8 flex items-center">
                <NextImage
                  src="/assets/logos/webdude-logo.webp"
                  alt="WebDude — Prémium webfejlesztés és AI automatizáció"
                  width={130}
                  height={32}
                  className="h-8 w-auto object-contain relative z-50 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_#00B5F1] group-hover:brightness-125"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-4">
            {NAV_ITEMS.map((item, index) => (
              <motion.div
                key={item.name}
                className="relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onMouseEnter={() => handleDropdownEnter(item.name)}
                onMouseLeave={handleDropdownLeave}
                onFocus={() => handleDropdownEnter(item.name)}
                onBlur={handleDropdownLeave}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setActiveDropdown(null);
                  }
                }}
              >
                {item.subItems ? (
                  <Link
                    href={item.href || "#"}
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === item.name}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 px-3 py-2 rounded-lg ${FOCUS_RING} ${pathname === item.href ? "text-[#00B5F1]" : "text-slate-200 hover:text-[#00B5F1]"}`}
                  >
                    {item.name}{" "}
                    <motion.span
                      aria-hidden="true"
                      animate={{
                        rotate: activeDropdown === item.name ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </Link>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`text-sm font-semibold transition-all duration-300 px-3 py-2 rounded-lg ${FOCUS_RING} ${pathname === item.href ? "text-[#00B5F1]" : "text-slate-200 hover:text-[#00B5F1]"}`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )}

                {/* DROPDOWN */}
                <AnimatePresence>
                  {activeDropdown === item.name && item.subItems && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-full lg:min-w-64 lg:max-w-80 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.6)] overflow-hidden z-40"
                      onMouseEnter={() => handleDropdownEnter(item.name)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {renderDropdownContent(item.subItems)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Language Switcher */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              <LanguageSwitcher currentLang={actualLang} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Link
                href="/kapcsolat"
                className={`relative px-6 py-2.5 rounded-full font-bold text-sm text-white transition-all duration-300 transform hover:scale-105 ${FOCUS_RING}`}
                style={{
                  background:
                    "linear-gradient(135deg, #00B5F1 0%, #5B21B6 100%)",
                  boxShadow: "0 8px 24px rgba(0, 181, 241,0.35)",
                }}
                aria-label="Kapcsolatfelvétel"
              >
                <span className="relative z-10">Kapcsolat</span>
              </Link>
            </motion.div>
          </div>

          {/* MOBILE TOGGLE – hamburger / X gomb */}
          <motion.button
            ref={toggleButtonRef}
            type="button"
            className={`lg:hidden text-slate-200 p-3 rounded-xl hover:bg-slate-800/80 transition-colors min-w-11 min-h-11 flex items-center justify-center border border-transparent hover:border-slate-700/50 ${FOCUS_RING}`}
            onClick={() => setIsOpen((prev) => !prev)}
            whileTap={{ scale: 0.92 }}
            aria-label={isOpen ? "Menü bezárása" : "Menü megnyitása"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  aria-hidden="true"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  aria-hidden="true"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY – a nav-tól független, z-50 rétegen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobilnavigáció"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col h-[100dvh] max-h-[100dvh] w-full overflow-hidden lg:hidden"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 90% 0%, rgba(0, 181, 241, 0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 10% 100%, rgba(91, 33, 182, 0.06) 0%, transparent 70%), #020617",
            }}
          >
            {/* Fejléc sáv: logó + X gomb */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-white/5 flex-shrink-0">
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center group"
                aria-label="WebDude főoldal"
              >
                <NextImage
                  src="/assets/logos/webdude-logo.webp"
                  alt="WebDude logó"
                  width={110}
                  height={28}
                  className="h-7 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_10px_#00B5F1]"
                />
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="Menü bezárása"
                className={`text-slate-300 p-2.5 rounded-xl hover:bg-slate-800/80 border border-slate-700/40 hover:border-slate-600/60 transition-all min-w-11 min-h-11 flex items-center justify-center ${FOCUS_RING}`}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Görgethető navigációs lista */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <nav
                aria-label="Mobilnavigáció lista"
                className="px-4 pt-4 pb-4 space-y-1"
              >
                {NAV_ITEMS.map((item, index) => {
                  const IconComponent = NAV_ICONS[item.name];
                  const isActive =
                    pathname === item.href ||
                    (item.subItems?.some((sub) => pathname === sub.href) ??
                      false);
                  const isSectionOpen = openSection === item.name;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: index * 0.04 }}
                    >
                      {item.subItems ? (
                        /* Sub-itemek esetén: link + accordion chevron toggle */
                        <div
                          className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                            isSectionOpen
                              ? "border-[#00B5F1]/20 bg-slate-900/60"
                              : "border-slate-800/40 bg-transparent"
                          }`}
                        >
                          {/* Fő sor: ikon + link + chevron gomb */}
                          <div className="flex items-center gap-0">
                            {/* Aktív indikátor vonal */}
                            <div
                              className={`self-stretch w-0.5 rounded-r-full transition-all duration-300 shrink-0 ${
                                isActive ? "bg-[#00B5F1]" : "bg-transparent"
                              }`}
                            />

                            {/* Nav link */}
                            <Link
                              href={item.href || "#"}
                              onClick={closeMenu}
                              aria-current={
                                pathname === item.href ? "page" : undefined
                              }
                              className={`flex-1 flex items-center gap-3.5 px-4 py-4 min-h-14 transition-colors ${FOCUS_RING} ${
                                isActive
                                  ? "text-[#00B5F1]"
                                  : "text-slate-100 hover:text-[#00B5F1]"
                              }`}
                            >
                              {IconComponent && (
                                <span
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                                    isActive
                                      ? "bg-[#00B5F1]/15 text-[#00B5F1]"
                                      : "bg-slate-800/60 text-slate-400"
                                  }`}
                                >
                                  <IconComponent className="w-4.5 h-4.5" />
                                </span>
                              )}
                              <span className="font-semibold text-base leading-tight">
                                {item.name}
                              </span>
                            </Link>

                            {/* Accordion toggle gomb */}
                            <button
                              type="button"
                              onClick={() =>
                                setOpenSection(isSectionOpen ? null : item.name)
                              }
                              aria-expanded={isSectionOpen}
                              aria-label={`${item.name} almenü ${isSectionOpen ? "bezárása" : "megnyitása"}`}
                              className={`shrink-0 w-12 h-14 flex items-center justify-center text-slate-400 hover:text-[#00B5F1] transition-colors ${FOCUS_RING}`}
                            >
                              <motion.span
                                animate={{ rotate: isSectionOpen ? 180 : 0 }}
                                transition={{
                                  duration: 0.25,
                                  ease: "easeInOut",
                                }}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </motion.span>
                            </button>
                          </div>

                          {/* Accordion tartalom */}
                          <AnimatePresence initial={false}>
                            {isSectionOpen && (
                              <motion.div
                                key="accordion"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  height: {
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                  },
                                  opacity: { duration: 0.2 },
                                }}
                                className="overflow-hidden"
                              >
                                <div className="px-3 pb-3 pt-1 border-t border-white/5">
                                  {/* Kategóriák szerint csoportosítva */}
                                  {(() => {
                                    const categories: Record<
                                      string,
                                      SubItem[]
                                    > = {};
                                    item.subItems!.forEach((sub) => {
                                      const cat = sub.category ?? "Egyéb";
                                      if (!categories[cat])
                                        categories[cat] = [];
                                      categories[cat].push(sub);
                                    });
                                    return Object.entries(categories).map(
                                      ([cat, subs], catIdx) => (
                                        <div
                                          key={cat}
                                          className={catIdx > 0 ? "mt-2" : ""}
                                        >
                                          {/* Kategória label */}
                                          <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            {cat}
                                          </p>
                                          {subs.map((sub, subIdx) => {
                                            const isSubActive =
                                              pathname === sub.href;
                                            return (
                                              <motion.div
                                                key={sub.name}
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                  duration: 0.18,
                                                  delay: subIdx * 0.04,
                                                }}
                                              >
                                                <Link
                                                  href={sub.href}
                                                  onClick={closeMenu}
                                                  aria-current={
                                                    isSubActive
                                                      ? "page"
                                                      : undefined
                                                  }
                                                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 min-h-11 ${FOCUS_RING} ${
                                                    isSubActive
                                                      ? "bg-[#00B5F1]/10 text-[#00B5F1]"
                                                      : "text-slate-300 hover:bg-slate-800/60 hover:text-slate-100"
                                                  }`}
                                                >
                                                  {sub.icon && (
                                                    <span
                                                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                                        isSubActive
                                                          ? "bg-[#00B5F1]/20 text-[#00B5F1]"
                                                          : "bg-slate-700/50 text-slate-400"
                                                      }`}
                                                    >
                                                      <sub.icon className="w-3.5 h-3.5" />
                                                    </span>
                                                  )}
                                                  <div className="flex-1 min-w-0">
                                                    <span className="font-medium block truncate">
                                                      {sub.name}
                                                    </span>
                                                    {sub.description && (
                                                      <span className="text-xs text-slate-500 block truncate leading-tight mt-0.5">
                                                        {sub.description}
                                                      </span>
                                                    )}
                                                  </div>
                                                  {isSubActive && (
                                                    <ArrowRight className="w-3.5 h-3.5 text-[#00B5F1] shrink-0" />
                                                  )}
                                                </Link>
                                              </motion.div>
                                            );
                                          })}
                                        </div>
                                      )
                                    );
                                  })()}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        /* Egyszerű navigációs elem (sub-item nélkül) */
                        <div
                          className={`flex items-center rounded-2xl border transition-all duration-300 ${
                            isActive
                              ? "border-[#00B5F1]/20 bg-slate-900/60"
                              : "border-transparent hover:border-slate-800/40 hover:bg-slate-900/30"
                          }`}
                        >
                          {/* Aktív indikátor vonal */}
                          <div
                            className={`self-stretch w-0.5 rounded-r-full transition-all duration-300 shrink-0 ${
                              isActive ? "bg-[#00B5F1]" : "bg-transparent"
                            }`}
                          />
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            aria-current={
                              pathname === item.href ? "page" : undefined
                            }
                            className={`flex-1 flex items-center gap-3.5 px-4 py-4 min-h-14 transition-colors ${FOCUS_RING} ${
                              isActive
                                ? "text-[#00B5F1]"
                                : "text-slate-100 hover:text-[#00B5F1]"
                            }`}
                          >
                            {IconComponent && (
                              <span
                                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                                  isActive
                                    ? "bg-[#00B5F1]/15 text-[#00B5F1]"
                                    : "bg-slate-800/60 text-slate-400"
                                }`}
                              >
                                <IconComponent className="w-4.5 h-4.5" />
                              </span>
                            )}
                            <span className="font-semibold text-base leading-tight">
                              {item.name}
                            </span>
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Sticky CTA panel a panel alján */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="flex-shrink-0 px-4 pt-3 pb-6 border-t border-white/5"
              style={{
                background:
                  "linear-gradient(to top, #020617 60%, transparent 100%)",
              }}
            >
              <Link
                href="/kapcsolat"
                onClick={closeMenu}
                className={`block w-full py-4 rounded-2xl font-bold text-center text-white text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_24px_rgba(0,181,241,0.3)] ${FOCUS_RING}`}
                style={{
                  background:
                    "linear-gradient(135deg, #00B5F1 0%, #5B21B6 100%)",
                }}
                aria-label="Kapcsolatfelvétel"
              >
                Kapcsolat — Kérj árajánlatot
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
