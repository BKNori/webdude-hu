"use client";
import { motion } from "motion/react";
import React from "react";
import Button from "@/components/atoms/Button";

export default function AiChatMockup() {
  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white dark:bg-bg-surface/90 backdrop-blur-md p-6 shadow-md dark:shadow-xl">
      <div className="h-64 overflow-auto rounded-xl bg-[#F8FAFC] dark:bg-bg-base/60 border border-slate-200 dark:border-slate-800 p-4">
        <div className="space-y-4">
          <div className="flex">
            <div className="mr-3 w-8 h-8 rounded-full bg-sky-500/15 dark:bg-[#00B5F1]/20 flex items-center justify-center text-[#0369A1] dark:text-[#00B5F1] font-semibold">
              U
            </div>
            <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-3 text-[#0F172A] dark:text-white border border-slate-200 dark:border-slate-700">
              Hogyan növelhetném az oldal konverzióját?
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex"
          >
            <div className="mr-3 w-8 h-8 rounded-full bg-[#0369A1] dark:bg-[#00B5F1] flex items-center justify-center text-white dark:text-bg-base font-bold">
              AI
            </div>
            <div className="rounded-xl bg-linear-to-r from-sky-500/10 to-violet-500/10 dark:from-[#00B5F1]/15 dark:to-[#5B21B6]/10 p-3 text-text-primary border border-sky-600/25 dark:border-[#00B5F1]/30">
              <p className="font-semibold text-[#0F172A] dark:text-white">
                Javaslatok a konverzió növelésére:
              </p>
              <ol className="mt-2 ml-4 list-decimal text-sm text-slate-700 dark:text-slate-300">
                <li>Optimalizált CTA és képernyő fölötti relevancia.</li>
                <li>AI-alapú ajánlatpersonalizáció a landingen.</li>
                <li>Gyorsabb betöltés, Next.js 16 és modern edge caching.</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <input
          className="flex-1 rounded-full bg-bg-base border border-slate-300 dark:border-slate-700 px-4 py-2 text-text-primary placeholder:text-slate-500 focus:outline-none focus:border-[#0369A1] dark:focus:border-[#00B5F1]"
          placeholder="Írj üzenetet..."
        />
        <Button variant="primary">Küldés</Button>
      </div>
    </div>
  );
}
