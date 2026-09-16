"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV_ITEMS, SubItem } from "@/config/navigation";

export default function HeaderNavClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
              className="block px-4 py-3 rounded-lg text-slate-200 hover:text-[#00B5F1] hover:bg-[#00B5F1]/10 transition-all duration-300 text-sm font-medium"
            >
              {sub.name}
            </Link>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-xl bg-bg-base/80 border-b ${
        isScrolled
          ? "border-slate-800/80 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
          : "border-slate-800/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
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
                className="h-7 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_12px_#00B5F1] group-hover:brightness-125"
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
            >
              {item.subItems ? (
                <Link
                  href={item.href || "#"}
                  className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 px-3 py-2 rounded-lg ${pathname === item.href ? "text-[#00B5F1]" : "text-slate-200 hover:text-[#00B5F1]"}`}
                >
                  {item.name}{" "}
                  <motion.span
                    animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
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
                    className={`text-sm font-semibold transition-all duration-300 px-3 py-2 rounded-lg ${pathname === item.href ? "text-[#00B5F1]" : "text-slate-200 hover:text-[#00B5F1]"}`}
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Link
              href="/kapcsolat"
              className="relative px-6 py-2.5 rounded-full font-bold text-sm text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-offset-2 focus:ring-offset-bg-base"
              style={{
                background: "linear-gradient(135deg, #00B5F1 0%, #5B21B6 100%)",
                boxShadow: "0 8px 24px rgba(0, 181, 241,0.35)",
              }}
              aria-label="Kapcsolatfelvétel"
            >
              <span className="relative z-10">Kapcsolat</span>
            </Link>
          </motion.div>
        </div>

        {/* MOBILE TOGGLE */}
        <motion.button
          className="lg:hidden text-slate-200 p-3 rounded-lg hover:bg-slate-800 transition-colors min-w-11 min-h-11 flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
          aria-label="Menü megnyitása"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-700 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-2 max-w-2xl mx-auto text-center">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="border-b border-slate-700/50 last:border-0"
                >
                  {item.subItems ? (
                    <div className="flex flex-col gap-2 py-3 items-center">
                      <Link
                        href={item.href || "#"}
                        onClick={() => setIsOpen(false)}
                        className={`text-slate-200 font-semibold text-lg ${pathname === item.href ? "text-[#00B5F1]" : ""} min-h-11 flex items-center justify-center`}
                      >
                        {item.name}
                      </Link>
                      <div className="flex flex-col gap-1 items-center w-full px-4">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-[#00B5F1] py-3 text-sm transition-colors max-w-xs text-center min-h-11 flex items-center justify-center"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-slate-200 font-semibold text-lg py-3 hover:text-[#00B5F1] transition-colors min-h-11 flex items-center justify-center"
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
                className="pt-4"
              >
                <Link
                  href="/kapcsolat"
                  onClick={() => setIsOpen(false)}
                  className="block w-full max-w-xs mx-auto px-6 py-3 rounded-full font-bold text-center text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#00B5F1]"
                  style={{
                    background:
                      "linear-gradient(135deg, #00B5F1 0%, #5B21B6 100%)",
                    boxShadow: "0 4px 16px rgba(0, 181, 241,0.3)",
                  }}
                  aria-label="Kapcsolatfelvétel"
                >
                  Kapcsolat
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
