"use client";

import { motion } from "motion/react";
import { Shield, TrendingUp, Zap } from "lucide-react";

interface SEOAuditHeroBannerProps {
  heroVisual?: string;
}

export default function SEOAuditHeroBanner({
  heroVisual,
}: SEOAuditHeroBannerProps) {
  return (
    <section className="relative py-24 overflow-hidden bg-bg-base">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-b from-gold-primary/5 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-primary/10 border border-gold-primary/20"
            >
              <Shield className="w-4 h-4 text-gold-primary" />
              <span className="text-xs font-bold text-gold-primary uppercase tracking-wider">
                SEO & AEO Audit Pro
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              A 26 éves tapasztalat erejével a találati listák élén
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-400"
            >
              A hagyományos SEO halott. Az entitás-alapú keresőoptimalizálás és
              az AEO (Answer Engine Optimization) a jövő. Mi nem csak
              rangsorolunk, mi domináljuk a válaszokat.
            </motion.p>

            {/* Authority Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">
                  95+ Lighthouse score alapú technikai alapok
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Zap className="w-4 h-4 text-gold-primary" />
                <span className="text-sm">
                  16 év WordPress & WooCommerce CMS szakértelem
                </span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-primary text-bg-base font-bold rounded-xl hover:bg-gold-primary/90 transition-all hover:scale-105"
            >
              <Shield className="w-4 h-4" />
              <span>Ingyenes Weboldal Audit</span>
            </motion.button>
          </div>

          {/* Right Content - Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {heroVisual ? (
              <div className="aspect-video rounded-2xl overflow-hidden border border-gold-primary/20">
                <img
                  src={heroVisual}
                  alt="SEO & AEO Audit Pro Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-gold-primary/20 to-transparent border border-gold-primary/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Shield className="w-24 h-24 text-gold-primary/50 mx-auto" />
                  <p className="text-sm text-slate-400">
                    High-end analytical dashboard interface
                  </p>
                  <p className="text-xs text-slate-500">
                    Midjourney v6 Master prompt alapján
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
