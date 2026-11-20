"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Check } from "lucide-react";
import { Language } from "@/types/dictionary";
import { switchLocalePath } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLang: Language;
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const languages: { code: Language; label: string }[] = [
    { code: "hu", label: "Magyar" },
    { code: "en", label: "English" },
  ];

  const handleLanguageChange = (lang: Language) => {
    const target = switchLocalePath(pathname, lang);
    router.push(target);
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100/90 dark:bg-slate-900/40 backdrop-blur-md border border-slate-300/80 dark:border-slate-700/50 hover:border-[#0369A1]/60 dark:hover:border-[#00B5F1]/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-offset-2 focus:ring-offset-bg-base"
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {currentLanguage?.label}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 bg-white/98 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-xl shadow-xl overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors focus:outline-none focus:bg-slate-100 dark:focus:bg-slate-800/50"
              >
                <span className="text-sm text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  {lang.code}
                </span>
                <span className="text-sm text-slate-800 dark:text-slate-300">{lang.label}</span>
                {lang.code === currentLang && (
                  <Check className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1] ml-auto" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}