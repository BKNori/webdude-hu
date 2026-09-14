"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Button from "@/components/atoms/Button";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // CTA megjelenése 500px scroll után
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-bg-surface/90 backdrop-blur-xl border border-amber-500/30 rounded-full px-6 py-3 shadow-[0_8px_32px_rgba(255,215,0,0.2)] flex items-center gap-4">
            <span className="text-sm text-text-secondary hidden md:block">
              Készen állsz a projektre?
            </span>
            <Button href="/kapcsolat" variant="primary">
              Konzultáció kérés
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
