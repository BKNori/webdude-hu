import { motion } from "motion/react";
import { Printer } from "lucide-react";
import type { PosterWorkshopOutput } from "@/types/poster-workshop";

interface PrintGuidelinesProps {
  guidelines: PosterWorkshopOutput["printGuidelines"];
  delay?: number;
}

export function PrintGuidelines({
  guidelines,
  delay = 0,
}: PrintGuidelinesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
        <Printer className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
        Nyomdai Irányelvek
      </h3>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Szín Mód</p>
            <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{guidelines.colorMode}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Felbontás</p>
            <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{guidelines.resolution}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Fájl Formátum</p>
            <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{guidelines.fileFormat}</p>
          </div>
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Szín Profil</p>
            <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{guidelines.colorProfile}</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Ne Tedd</p>
          <ul className="space-y-1">
            {guidelines.doNot.map((dont, index) => (
              <li key={index} className="text-xs text-[#0F172A] dark:text-[#F8FAFC]">
                {dont}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
