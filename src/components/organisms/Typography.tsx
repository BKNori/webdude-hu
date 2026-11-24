import { motion } from "motion/react";
import { Type } from "lucide-react";
import type { PosterWorkshopOutput } from "@/types/poster-workshop";

interface TypographyProps {
  typography: PosterWorkshopOutput["typography"];
  delay?: number;
}

export function Typography({ typography, delay = 0 }: TypographyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
        <Type className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
        Tipográfia
      </h3>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Főcím Font</p>
            <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{typography.headlineFont}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Szövegtörzs Font</p>
            <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{typography.bodyFont}</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Font Méretek</p>
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-lg p-2 border border-slate-200 dark:border-slate-800">
              <p className="text-slate-600 dark:text-slate-400">Főcím</p>
              <p className="text-[#0F172A] dark:text-[#F8FAFC]">{typography.fontSizes.headline}</p>
            </div>
            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-lg p-2 border border-slate-200 dark:border-slate-800">
              <p className="text-slate-600 dark:text-slate-400">Alcím</p>
              <p className="text-[#0F172A] dark:text-[#F8FAFC]">{typography.fontSizes.subheadline}</p>
            </div>
            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-lg p-2 border border-slate-200 dark:border-slate-800">
              <p className="text-slate-600 dark:text-slate-400">Szöveg</p>
              <p className="text-[#0F172A] dark:text-[#F8FAFC]">{typography.fontSizes.body}</p>
            </div>
            <div className="bg-slate-50 dark:bg-[#0B1120] rounded-lg p-2 border border-slate-200 dark:border-slate-800">
              <p className="text-slate-600 dark:text-slate-400">Caption</p>
              <p className="text-[#0F172A] dark:text-[#F8FAFC]">{typography.fontSizes.caption}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Line Height</p>
            <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{typography.lineHeight}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Kerning</p>
            <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{typography.kerning}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
