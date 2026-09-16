"use client";

import BentoCard from "@/components/molecules/BentoCard";
import SectionTitle from "@/components/atoms/SectionTitle";
import {
  FadeUpMotion,
  ScaleMotion,
} from "@/components/molecules/MotionWrapper";
import { motion } from "motion/react";

const services = [
  {
    title: "Prémium Webfejlesztés",
    description:
      "Saját fejlesztésű, villámgyors Next.js + Firebase platformok beépített lead-generálással és adminisztrációs felülettel.",
    metric: "React 19",
    highlight: "Next.js + Firebase",
  },
  {
    title: "Vállalati AI Automatizáció",
    description:
      "Intelligens AI Chatbotok, CRM integráció és egyedi workflow-k az operatív feladatok és értékesítés támogatására.",
    metric: "AI Agent",
    highlight: "Chatbot & CRM",
  },
  {
    title: "Havi Rendszerüzemeltetés",
    description:
      "Karbantartás, napi biztonsági mentések, automatizált frissítések és folyamatos SEO/AEO monitorozás a maximális sebességért.",
    metric: "Karbantartás",
    highlight: "Havi Üzemeltetés",
  },
];

export default function FeaturedServices() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      description: service.description,
    })),
  };

  return (
    <section className="py-24 md:py-32 bg-linear-to-br from-bg-surface via-bg-elevated to-bg-surface border-t border-slate-800 relative overflow-hidden">
      {/* Ötletes háttér effektek */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-linear-to-br from-sky-400/10 to-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-linear-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-linear-to-br from-blue-300/5 to-sky-300/5 rounded-full blur-[150px]" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        <FadeUpMotion>
          <SectionTitle
            eyebrow="Fő fókusz"
            title="Három pillérre épülő, értékteremtő szolgáltatások"
            description="Egyetlen cél: több lead, magasabb konverzió és kevesebb manualitás az operatív folyamatokban."
            center={true}
            className="mx-auto"
          />
        </FadeUpMotion>

        <FadeUpMotion
          delay={0.2}
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-[1.3fr_0.85fr]"
        >
          <ScaleMotion delay={0.3}>
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <BentoCard
                title={services[0].title}
                description={services[0].description}
                metric={services[0].metric}
                highlight={services[0].highlight}
                className="lg:row-span-2 flex flex-col justify-between min-h-87.5 border-sky-500/30 shadow-[0_0_40px_rgba(6,182,212,0.06)] hover:shadow-[0_0_60px_rgba(6,182,212,0.2)] transition-all duration-300"
              />
            </motion.div>
          </ScaleMotion>
          <ScaleMotion delay={0.4}>
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <BentoCard
                title={services[1].title}
                description={services[1].description}
                metric={services[1].metric}
                highlight={services[1].highlight}
                className="hover:shadow-[0_0_50px_rgba(6,182,212,0.15)] transition-all duration-300"
              />
            </motion.div>
          </ScaleMotion>
          <ScaleMotion delay={0.5}>
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <BentoCard
                title={services[2].title}
                description={services[2].description}
                metric={services[2].metric}
                highlight={services[2].highlight}
                className="hover:shadow-[0_0_50px_rgba(6,182,212,0.15)] transition-all duration-300"
              />
            </motion.div>
          </ScaleMotion>
        </FadeUpMotion>
      </div>
    </section>
  );
}
