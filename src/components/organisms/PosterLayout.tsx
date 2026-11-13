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
      className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
        <Layout className="w-4 h-4 text-sky-500" />
        Elrendezés
      </h3>
      <div className="space-y-3">
        <div>
          <p className="text-xs text-slate-400 mb-1">Grid Rendszer</p>
          <p className="text-sm text-white">{layout.gridSystem}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">Vizuális Hierarchia</p>
          <p className="text-sm text-white">{layout.visualHierarchy}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">Elem Elhelyezés</p>
          <p className="text-sm text-white">{layout.elementPlacement}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">Whitespace</p>
          <p className="text-sm text-white">{layout.whitespace}</p>
        </div>
      </div>
    </motion.div>
  );
}
