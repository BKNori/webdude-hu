import { motion } from "motion/react";
import { Layers, Sun, Moon, Target } from "lucide-react";
import type { PosterWorkshopOutput } from "@/types/poster-workshop";

interface PosterVariationsProps {
  variations: PosterWorkshopOutput["variations"];
  delay?: number;
}

export function PosterVariations({
  variations,
  delay = 0,
}: PosterVariationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
        <Layers className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
        Változatok
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-3 h-3 text-[#0369A1] dark:text-[#00B5F1]" />
            <p className="text-xs text-slate-600 dark:text-slate-400">Light Mode</p>
          </div>
          <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
            {variations.lightMode}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Moon className="w-3 h-3 text-[#0369A1] dark:text-[#00B5F1]" />
            <p className="text-xs text-slate-600 dark:text-slate-400">Dark Mode</p>
          </div>
          <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
            {variations.darkMode}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-3 h-3 text-[#0369A1] dark:text-[#00B5F1]" />
            <p className="text-xs text-slate-600 dark:text-slate-400">Grayscale</p>
          </div>
          <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] leading-relaxed">
            {variations.grayscale}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
