"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export default function NavigationNew() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Rólam", href: "/szia-norbi-vagyok" },
    { name: "Munkáim", href: "/munkak" },
    { name: "Szolgáltatások", href: "/szolgaltatasok" },
    { name: "Hírek", href: "/hirek" },
    { name: "Kapcsolat", href: "/kapcsolat" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E7ECF2] shadow-[0_4px_12px_rgba(15,23,42,0.04)] transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span
              className="text-2xl font-bold text-[#111827]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <span className="text-[#00B5F1]">Web</span>Dude
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-[#4B5563] hover:text-[#00B5F1] transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/kapcsolat"
              className="px-6 py-2.5 rounded-full bg-[#00B5F1] hover:bg-[#0095C7] text-white text-sm font-semibold transition-all duration-300 shadow-[0_4px_12px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
            >
              Kapcsolat
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-[#111827]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-[#111827]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-[#E7ECF2]"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-lg font-medium text-[#111827] hover:text-[#00B5F1] transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
                className="pt-4"
              >
                <Link
                  href="/kapcsolat"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-6 py-3 rounded-full bg-[#00B5F1] hover:bg-[#0095C7] text-white text-center font-semibold transition-all duration-300"
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
