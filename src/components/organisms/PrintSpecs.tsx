import { motion } from "motion/react";
import { Printer } from "lucide-react";
import type { PosterWorkshopOutput } from "@/types/poster-workshop";

interface PrintSpecsProps {
  specifications: PosterWorkshopOutput["specifications"];
  delay?: number;
}

export function PrintSpecs({ specifications, delay = 0 }: PrintSpecsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
        <Printer className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
        Nyomdai Specifikációk
      </h3>
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Szélesség</p>
            <p className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
              {specifications.dimensions.width}px
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Magasság</p>
            <p className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
              {specifications.dimensions.height}px
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Formátum</p>
            <p className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
              {specifications.dimensions.format}
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-3 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">DPI</p>
            <p className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
              {specifications.dimensions.dpi}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Bleed</p>
          <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{specifications.bleed}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Safe Zone</p>
          <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{specifications.safeZone}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Crop Marks</p>
          <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{specifications.cropMarks}</p>
        </div>
      </div>
    </motion.div>
  );
}
