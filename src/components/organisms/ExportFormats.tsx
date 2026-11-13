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
      className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
        <Layers className="w-4 h-4 text-sky-500" />
        Export Formátumok
      </h3>
      <div className="space-y-3">
        <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
          <p className="text-xs text-slate-400 mb-1">Print</p>
          <p className="text-xs text-white">{formats.print}</p>
        </div>
        <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
          <p className="text-xs text-slate-400 mb-1">Web</p>
          <p className="text-xs text-white">{formats.web}</p>
        </div>
        <div className="bg-bg-base/50 rounded-xl p-4 border border-gray-800">
          <p className="text-xs text-slate-400 mb-1">Social</p>
          <p className="text-xs text-white">{formats.social}</p>
        </div>
      </div>
    </motion.div>
  );
}
