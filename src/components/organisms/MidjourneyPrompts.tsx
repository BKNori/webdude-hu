"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import type { PosterWorkshopOutput } from "@/types/poster-workshop";
import { CopyButton } from "@/components/molecules/CopyButton";

interface MidjourneyPromptsProps {
  prompts: PosterWorkshopOutput["midjourneyPrompts"];
  copiedStates: Record<string, boolean>;
  onCopy: (text: string, key: string) => void;
  delay?: number;
}

export function MidjourneyPrompts({
  prompts,
  copiedStates,
  onCopy,
  delay = 0,
}: MidjourneyPromptsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
        Midjourney Promptok
      </h3>
      <div className="space-y-3">
        <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-600 dark:text-slate-400">Primary</p>
            <CopyButton
              copied={!!copiedStates["mj-primary"]}
              onClick={() => onCopy(prompts.primary, "mj-primary")}
            />
          </div>
          <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] font-mono leading-relaxed whitespace-pre-wrap">
            {prompts.primary}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-600 dark:text-slate-400">Alternative 1</p>
            <CopyButton
              copied={!!copiedStates["mj-alt1"]}
              onClick={() => onCopy(prompts.alternative1, "mj-alt1")}
            />
          </div>
          <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] font-mono leading-relaxed whitespace-pre-wrap">
            {prompts.alternative1}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-600 dark:text-slate-400">Alternative 2</p>
            <CopyButton
              copied={!!copiedStates["mj-alt2"]}
              onClick={() => onCopy(prompts.alternative2, "mj-alt2")}
            />
          </div>
          <p className="text-xs text-[#0F172A] dark:text-[#F8FAFC] font-mono leading-relaxed whitespace-pre-wrap">
            {prompts.alternative2}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
