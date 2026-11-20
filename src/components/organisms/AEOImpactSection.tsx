"use client";

import { motion } from "motion/react";
import { TrendingUp, ArrowRight, BarChart3 } from "lucide-react";

interface AEOImpactSectionProps {
  beforeScore?: number;
  afterScore?: number;
}

export default function AEOImpactSection({
  beforeScore = 45,
  afterScore = 95,
}: AEOImpactSectionProps) {
  return (
    <section className="py-16 border-t border-brand-primary/10 bg-bg-elevated/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-4">
            AEO Impact - Hogyan változik a weboldal láthatósága
          </h2>
          <p className="text-[#475569] dark:text-slate-400 max-w-2xl mx-auto">
            Dinamikus grafikon - AEO Impact animáció a WebDude audit előtt és
            után
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Before State */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="luminous-card border-red-500/20 rounded-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-600 dark:text-red-500">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">Audit Előtt</h3>
                <p className="text-sm text-[#475569] dark:text-slate-400">Hagyományos SEO</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#475569] dark:text-slate-400">Lighthouse Score</span>
                  <span className="text-red-600 dark:text-red-500 font-bold">{beforeScore}</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-bg-elevated rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${beforeScore}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full bg-red-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#475569] dark:text-slate-400">Organikus Találat</span>
                  <span className="text-red-600 dark:text-red-500 font-bold">Alacsony</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-bg-elevated rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "30%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-red-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#475569] dark:text-slate-400">AI Válasz Motor</span>
                  <span className="text-red-600 dark:text-red-500 font-bold">Nem látható</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-bg-elevated rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "10%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full bg-red-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* After State */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="luminous-card border-emerald-500/20 rounded-xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-500">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">Audit Után</h3>
                <p className="text-sm text-[#475569] dark:text-slate-400">
                  WebDude AEO Optimalizáció
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#475569] dark:text-slate-400">Lighthouse Score</span>
                  <span className="text-emerald-600 dark:text-emerald-500 font-bold">
                    {afterScore}+
                  </span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-bg-elevated rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${afterScore}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#475569] dark:text-slate-400">Organikus Találat</span>
                  <span className="text-emerald-600 dark:text-emerald-500 font-bold">Magas</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-bg-elevated rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#475569] dark:text-slate-400">AI Válasz Motor</span>
                  <span className="text-emerald-600 dark:text-emerald-500 font-bold">Domináns</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-bg-elevated rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "95%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Impact Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-8"
        >
          <div className="flex items-center gap-4 bg-[#0369A1]/10 dark:bg-brand-primary/10 border border-[#0369A1]/25 dark:border-brand-primary/20 rounded-full px-6 py-3">
            <span className="text-sm text-[#475569] dark:text-slate-400">WebDude Audit</span>
            <ArrowRight className="w-5 h-5 text-[#0369A1] dark:text-brand-primary" />
            <span className="text-sm font-bold text-[#0F172A] dark:text-white">
              +{afterScore - beforeScore}% Lighthouse javulás
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
