"use client";

import SectionTitle from "@/components/atoms/SectionTitle";
import BentoCard from "@/components/molecules/BentoCard";
import { motion } from "motion/react";

const tldrItems = [
  {
    title: "Webfejlesztés",
    description:
      "Next.js 16, React 19, TypeScript alapú prémium weboldalak és SaaS rendszerek.",
    metric: "3-12 hét",
    highlight: "Lead-first architektúra",
  },
  {
    title: "AI Automatizáció",
    description:
      "ChatGPT, Claude és egyedi AI modellekkel vezérelt munkafolyamatok és lead generálás.",
    metric: "24/7",
    highlight: "Automatizált konverzió",
  },
  {
    title: "Karbantartás",
    description:
      "Biztonsági frissítések, napi mentések és SLA alapú támogatás.",
    metric: "99.9%",
    highlight: "Uptime garancia",
  },
  {
    title: "SEO & AEO",
    description:
      "AI keresőmotorok optimalizálása és Google Search Console integráció.",
    metric: "#1",
    highlight: "AI-ready struktúra",
  },
  {
    title: "Grafikai Tervezés",
    description:
      "Arculat, logó és vizuális identitás tervezése 26+ év tapasztalattal.",
    metric: "26+ év",
    highlight: "Prémium branding",
  },
  {
    title: "WordPress",
    description:
      "WooCommerce webshopok és WordPress weboldalak fejlesztése és karbantartása.",
    metric: "16+ év",
    highlight: "Expert szint",
  },
];

export default function TLDRSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/5 to-transparent" />

      <div className="px-6 lg:px-8 relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            eyebrow="Gyors Áttekintés"
            title="WebDude 60 másodperc alatt"
            description="Minden, amit tudnod kell a szolgáltatásainkról egyetlen pillantással."
          />
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tldrItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BentoCard
                title={item.title}
                description={item.description}
                metric={item.metric}
                highlight={item.highlight}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
