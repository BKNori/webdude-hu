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
      className="bg-bg-elevated/30 border border-gray-800 rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
        <Printer className="w-4 h-4 text-sky-500" />
        Nyomdai Specifikációk
      </h3>
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-bg-base/50 rounded-xl p-3 border border-gray-800">
            <p className="text-xs text-slate-400 mb-1">Szélesség</p>
            <p className="text-sm font-bold text-white">
              {specifications.dimensions.width}px
            </p>
          </div>
          <div className="bg-bg-base/50 rounded-xl p-3 border border-gray-800">
            <p className="text-xs text-slate-400 mb-1">Magasság</p>
            <p className="text-sm font-bold text-white">
              {specifications.dimensions.height}px
            </p>
          </div>
          <div className="bg-bg-base/50 rounded-xl p-3 border border-gray-800">
            <p className="text-xs text-slate-400 mb-1">Formátum</p>
            <p className="text-sm font-bold text-white">
              {specifications.dimensions.format}
            </p>
          </div>
          <div className="bg-bg-base/50 rounded-xl p-3 border border-gray-800">
            <p className="text-xs text-slate-400 mb-1">DPI</p>
            <p className="text-sm font-bold text-white">
              {specifications.dimensions.dpi}
            </p>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">Bleed</p>
          <p className="text-sm text-white">{specifications.bleed}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">Safe Zone</p>
          <p className="text-sm text-white">{specifications.safeZone}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">Crop Marks</p>
          <p className="text-sm text-white">{specifications.cropMarks}</p>
        </div>
      </div>
    </motion.div>
  );
}
