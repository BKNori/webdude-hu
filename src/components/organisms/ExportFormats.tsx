import { motion } from "motion/react";
import { Layers } from "lucide-react";
import type { PosterWorkshopOutput } from "@/types/poster-workshop";

interface ExportFormatsProps {
  formats: PosterWorkshopOutput["exportFormats"];
  delay?: number;
}

export function ExportFormats({ formats, delay = 0 }: ExportFormatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
        <Layers className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
        Export Formátumok
      </h3>
      <div className="space-y-3">
        <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Print</p>
          <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC]">{formats.print}</p>
        </div>
        <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Web</p>
          <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC]">{formats.web}</p>
        </div>
        <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Social</p>
          <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC]">{formats.social}</p>
        </div>
      </div>
    </motion.div>
  );
}
