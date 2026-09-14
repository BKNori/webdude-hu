"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

interface SectionIndicatorProps {
  sections: Section[];
}

export default function SectionIndicator({ sections }: SectionIndicatorProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
    >
      {sections.map((section) => (
        <motion.button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center gap-3"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              activeSection === section.id
                ? "bg-amber-500 scale-125"
                : "bg-slate-600 group-hover:bg-amber-400"
            }`}
            animate={{ scale: activeSection === section.id ? 1.25 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={`text-sm font-medium transition-colors duration-300 ${
              activeSection === section.id
                ? "text-amber-500"
                : "text-slate-400 group-hover:text-amber-400"
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {section.label}
          </motion.span>
        </motion.button>
      ))}
    </motion.div>
  );
}
