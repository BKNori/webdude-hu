import { motion } from "motion/react";
import { Layout } from "lucide-react";
import type { PosterWorkshopOutput } from "@/types/poster-workshop";

interface PosterConceptProps {
  concept: PosterWorkshopOutput["posterConcept"];
  delay?: number;
}

export function PosterConcept({ concept, delay = 0 }: PosterConceptProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
        <Layout className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
        Poszter Koncepció
      </h3>
      <div className="space-y-3">
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Stílus</p>
          <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{concept.style}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Leírás</p>
          <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{concept.description}</p>
        </div>
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Kulcselemek</p>
          <div className="flex flex-wrap gap-2">
            {concept.keyElements.map((element, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded bg-sky-500/10 border border-slate-200 dark:border-slate-800 text-[#0369A1] dark:text-[#00B5F1] text-xs"
              >
                {element}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
