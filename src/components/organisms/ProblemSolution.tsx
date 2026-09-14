"use client";

import SectionTitle from "@/components/atoms/SectionTitle";
import ComparisonCard from "@/components/molecules/ComparisonCard";
import { motion } from "motion/react";

export default function ProblemSolution() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#020617]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-amber-500/5 to-transparent" />

      <div className="px-6 lg:px-8 relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            eyebrow="Mi működik vs. Mi nem"
            title="Felejtsd el a sablonokat. Lépj a jövőbe."
            description="Szemben állítjuk a hagyományos webfejlesztést és a WebDude AI SaaS megoldást, hogy lásd az előnyöket."
            center={true}
            className="mx-auto"
          />
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ComparisonCard
              variant="problem"
              title="Lassú, sablonos WordPress oldalak, amelyek nem hoznak leadeket, és elnyelik a marketing büdzsét."
              items={[
                "Elavult technológiai alapok",
                "Láthatatlan az AI keresők számára (AEO)",
                "Nincs fókuszban a konverzió",
                "Manuális, időrabló adminisztráció",
              ]}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ComparisonCard
              variant="solution"
              title="Saját fejlesztésű, villámgyors Next.js platformok beépített AI értékesítési és CRM asszisztenssel."
              items={[
                "Egyedi Cyber-Arany dizájn",
                "AEO/SEO optimalizált architektúra",
                "Beépített Lead generáló gépezet",
                "AI-vezérelt munkafolyamat automatizáció",
              ]}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
