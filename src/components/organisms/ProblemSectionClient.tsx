"use client";

import { motion, useReducedMotion } from "motion/react";
import Button from "@/components/atoms/Button";
import SectionTitle from "@/components/atoms/SectionTitle";

export default function ProblemSectionClient() {
  const shouldReduce = useReducedMotion();

  const problems = [
    {
      title: "Alacsony konverziós arány",
      description:
        "A weboldal nem generál elegendő leadet a látogatókból, ami a bevételek csökkenéséhez vezet.",
    },
    {
      title: "Lassú betöltési idő",
      description:
        "A lassú oldalbetöltés negatívan befolyásolja a felhasználói élményt és a SEO rangsorolást.",
    },
    {
      title: "Elavult design",
      description:
        "A nem modern, reszponzív dizájn csökkenti a márka hitelességét és a felhasználói elköteleződést.",
    },
  ];

  return (
    <motion.section
      className="bg-bg-surface/90 backdrop-blur-md border border-slate-700/80 p-8 rounded-3xl shadow-xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduce ? { duration: 0 } : { duration: 0.5 }}
    >
      <SectionTitle
        center
        eyebrow="Kihívás"
        title="Mi a probléma?"
        description="Keresd meg a legkritikusabb akadályokat, amelyek megakadályozzák az online sikered."
        className="mx-auto"
      />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass-card glass-card-hover p-6 text-center border border-slate-700/60 flex flex-col justify-center items-center rounded-2xl hover:border-[#00B5F1]/40 transition-colors"
          >
            <h3 className="text-xl font-bold text-text-primary mb-2">{p.title}</h3>
            <p className="text-sm text-slate-400">{p.description}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-8 flex justify-center"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          href="/kapcsolat"
          variant="primary"
          size="lg"
          analyticsEvent="cta_problem_section"
        >
          Lépj kapcsolatba velem
        </Button>
      </motion.div>
    </motion.section>
  );
}
