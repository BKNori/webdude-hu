import { motion } from "motion/react";
import { Layout } from "lucide-react";
import type { PosterWorkshopOutput } from "@/types/poster-workshop";

interface PosterLayoutProps {
  layout: PosterWorkshopOutput["layout"];
  delay?: number;
}

export function PosterLayout({ layout, delay = 0 }: PosterLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
        <Layout className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
        Elrendezés
      </h3>
      <div className="space-y-3">
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Grid Rendszer</p>
          <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{layout.gridSystem}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Vizuális Hierarchia</p>
          <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{layout.visualHierarchy}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Elem Elhelyezés</p>
          <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{layout.elementPlacement}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Whitespace</p>
          <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{layout.whitespace}</p>
        </div>
      </div>
    </motion.div>
  );
}
