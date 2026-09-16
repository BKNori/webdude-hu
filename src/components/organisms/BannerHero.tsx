import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface BannerHeroProps {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  authorityMetric?: string;
  lighthouseScore?: string;
}

export default function BannerHero({
  title,
  description,
  ctaText,
  ctaHref,
  authorityMetric = "26 év design tapasztalattal",
  lighthouseScore = "95+ Lighthouse score-ral",
}: BannerHeroProps) {
  return (
    <section className="bg-bg-base p-24 flex items-center justify-between border-b-2 border-brand-primary">
      <div className="max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-6xl font-bold mb-6"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-primary text-xl mb-10"
        >
          {description}
          <span className="font-bold text-brand-primary">{authorityMetric}</span>
          és{" "}
          <span className="font-bold text-brand-primary">{lighthouseScore}</span>
          optimalizálom a webshopodat.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          href={ctaHref}
          className="inline-flex items-center gap-2 bg-brand-primary text-bg-base px-8 py-4 font-bold rounded-sm hover:opacity-90 transition-opacity"
        >
          {ctaText}
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>
    </section>
  );
}
