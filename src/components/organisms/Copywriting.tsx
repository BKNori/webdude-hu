"use client";

import { motion } from "motion/react";
import { Type } from "lucide-react";
import type { PosterWorkshopOutput } from "@/types/poster-workshop";
import { CopyButton } from "@/components/molecules/CopyButton";

interface CopywritingProps {
  copywriting: PosterWorkshopOutput["copywriting"];
  copiedStates: Record<string, boolean>;
  onCopy: (text: string, key: string) => void;
  delay?: number;
}

export function Copywriting({
  copywriting,
  copiedStates,
  onCopy,
  delay = 0,
}: CopywritingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider flex items-center gap-2">
        <Type className="w-4 h-4 text-[#0369A1] dark:text-[#00B5F1]" />
        Copywriting
      </h3>
      <div className="space-y-3">
        <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-600 dark:text-slate-400">Főcím</p>
            <CopyButton
              copied={!!copiedStates["headline"]}
              onClick={() => onCopy(copywriting.headline, "headline")}
            />
          </div>
          <p className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">{copywriting.headline}</p>
        </div>
        <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-600 dark:text-slate-400">Alcím</p>
            <CopyButton
              copied={!!copiedStates["subheadline"]}
              onClick={() => onCopy(copywriting.subheadline, "subheadline")}
            />
          </div>
          <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{copywriting.subheadline}</p>
        </div>
        <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-600 dark:text-slate-400">Szövegtörzs</p>
            <CopyButton
              copied={!!copiedStates["body"]}
              onClick={() => onCopy(copywriting.bodyText, "body")}
            />
          </div>
          <p className="text-sm text-[#0F172A] dark:text-[#F8FAFC]">{copywriting.bodyText}</p>
        </div>
        <div className="bg-slate-50 dark:bg-[#0B1120] rounded-xl p-4 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-600 dark:text-slate-400">CTA</p>
            <CopyButton
              copied={!!copiedStates["cta"]}
              onClick={() => onCopy(copywriting.cta, "cta")}
            />
          </div>
          <p className="text-sm font-bold text-[#0369A1] dark:text-[#00B5F1]">{copywriting.cta}</p>
        </div>
      </div>
    </motion.div>
  );
}
