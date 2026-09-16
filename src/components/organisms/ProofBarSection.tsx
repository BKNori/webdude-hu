"use client";

import { motion } from "motion/react";
import { Shield, TrendingUp, Award, Clock } from "lucide-react";

interface ProofBarSectionProps {
  experienceYears?: number;
  cmsExperienceYears?: number;
  lighthouseScore?: number;
}

export default function ProofBarSection({
  experienceYears = 26,
  cmsExperienceYears = 16,
  lighthouseScore = 95,
}: ProofBarSectionProps) {
  return (
    <section className="py-16 border-t border-brand-primary/10 bg-bg-elevated/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Experience Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-bg-base/50 border border-brand-primary/20 rounded-xl p-8"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-16 h-16 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                <Award className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {experienceYears} év design tapasztalat
                </h3>
                <p className="text-slate-400 mb-4">
                  {cmsExperienceYears} év WordPress & WooCommerce CMS
                  szakértelem. Minden auditunk a gyakorlati tapasztalatunkon
                  alapul.
                </p>
                <div className="flex items-center gap-2 text-emerald-500 text-sm">
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Szakértői garancia</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lighthouse Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-bg-base/50 border border-brand-primary/20 rounded-xl p-8"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-16 h-16 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {lighthouseScore}+ Lighthouse score
                </h3>
                <p className="text-slate-400 mb-4">
                  {lighthouseScore}+ Lighthouse score alapú technikai alapok.
                  Garantált teljesítmény és SEO optimalizáció.
                </p>
                <div className="flex items-center gap-2 text-emerald-500 text-sm">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">Azonnali eredmények</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="text-center p-4 bg-bg-base/30 rounded-lg">
            <div className="text-2xl font-bold text-brand-primary mb-1">47+</div>
            <div className="text-xs text-slate-400">Ügyfélvélemény</div>
          </div>
          <div className="text-center p-4 bg-bg-base/30 rounded-lg">
            <div className="text-2xl font-bold text-brand-primary mb-1">4.9</div>
            <div className="text-xs text-slate-400">Értékelés</div>
          </div>
          <div className="text-center p-4 bg-bg-base/30 rounded-lg">
            <div className="text-2xl font-bold text-brand-primary mb-1">24h</div>
            <div className="text-xs text-slate-400">Audit válaszidő</div>
          </div>
          <div className="text-center p-4 bg-bg-base/30 rounded-lg">
            <div className="text-2xl font-bold text-brand-primary mb-1">
              100%
            </div>
            <div className="text-xs text-slate-400">Siker garancia</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
