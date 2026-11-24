import { motion } from "motion/react";
import { Palette } from "lucide-react";
import type { PosterWorkshopOutput } from "@/types/poster-workshop";

interface ColorPaletteProps {
  colorPalette: PosterWorkshopOutput["colorPalette"];
  delay?: number;
}

export function ColorPalette({
  colorPalette,
  delay = 0,
}: ColorPaletteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
        <Palette className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
        Szín Paletta (CMYK)
      </h3>
      <div className="grid grid-cols-5 gap-3">
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg mx-auto mb-2"
            style={{ backgroundColor: colorPalette.primary }}
          />
          <p className="text-xs text-slate-600 dark:text-slate-400">Primary</p>
          <p className="text-xs font-mono text-[#0F172A] dark:text-[#F8FAFC]">{colorPalette.primary}</p>
          <p className="text-xs font-mono text-[#0369A1] dark:text-[#00B5F1]">
            {colorPalette.cmykValues.primary}
          </p>
        </div>
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg mx-auto mb-2"
            style={{ backgroundColor: colorPalette.secondary }}
          />
          <p className="text-xs text-slate-600 dark:text-slate-400">Secondary</p>
          <p className="text-xs font-mono text-[#0F172A] dark:text-[#F8FAFC]">
            {colorPalette.secondary}
          </p>
          <p className="text-xs font-mono text-[#0369A1] dark:text-[#00B5F1]">
            {colorPalette.cmykValues.secondary}
          </p>
        </div>
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg mx-auto mb-2"
            style={{ backgroundColor: colorPalette.accent }}
          />
          <p className="text-xs text-slate-600 dark:text-slate-400">Accent</p>
          <p className="text-xs font-mono text-[#0F172A] dark:text-[#F8FAFC]">{colorPalette.accent}</p>
          <p className="text-xs font-mono text-[#0369A1] dark:text-[#00B5F1]">
            {colorPalette.cmykValues.accent}
          </p>
        </div>
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg mx-auto mb-2"
            style={{ backgroundColor: colorPalette.background }}
          />
          <p className="text-xs text-slate-600 dark:text-slate-400">Background</p>
          <p className="text-xs font-mono text-[#0F172A] dark:text-[#F8FAFC]">
            {colorPalette.background}
          </p>
        </div>
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg mx-auto mb-2"
            style={{ backgroundColor: colorPalette.text }}
          />
          <p className="text-xs text-slate-600 dark:text-slate-400">Text</p>
          <p className="text-xs font-mono text-[#0F172A] dark:text-[#F8FAFC]">{colorPalette.text}</p>
        </div>
      </div>
      <div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Indoklás</p>
        <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC]">{colorPalette.rationale}</p>
      </div>
    </motion.div>
  );
}
