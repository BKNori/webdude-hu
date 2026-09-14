"use client";

import { motion } from "motion/react";
import {
  MessageSquare,
  Palette,
  Code,
  Shield,
  Rocket,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Konzultáció",
    description:
      "Ingyenes konzultáció a célok és igények tisztázásához. Együtt megtervezzük a digitális stratégiádat.",
    icon: MessageSquare,
  },
  {
    id: 2,
    title: "Tervezés",
    description:
      "Egyedi vizuális koncepció és modern arculat tervezés. Wireframe és prototípus készítés a tökéletes felhasználói élményért.",
    icon: Palette,
  },
  {
    id: 3,
    title: "Fejlesztés",
    description:
      "Villámgyors, keresőoptimalizált weboldal fejlesztés. Modern Next.js 16 és React 19 technológiákkal, skálázható és jövőálló megoldásokkal.",
    icon: Code,
  },
  {
    id: 4,
    title: "Tesztelés",
    description:
      "Részletes tesztelés és teljesítmény optimalizálás. Biztosítjuk a gyors betöltést és a hibamentes működést minden eszközön.",
    icon: Shield,
  },
  {
    id: 5,
    title: "Átadás",
    description:
      "Projekt átadás, oktatás és folyamatos támogatás. 30 napos garancia és prémium támogatási lehetőségek.",
    icon: Rocket,
  },
];

export default function AIWorkflowTimeline() {
  return (
    <div className="relative py-16 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h3 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 tracking-tight">
          AI Workflow Timeline
        </h3>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          5 lépésben a konzultációtól az átadásig. Norbi 26 éves grafikai és 16
          éves fejlesztői tapasztalatával.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#00B5F1]/50 via-[#00B5F1]/20 to-transparent transform md:-translate-x-1/2" />

        <div className="space-y-16">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className={`relative flex flex-col md:flex-row items-center gap-6 group ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}
            >
              {/* Card Container */}
              <div
                className={`w-full md:w-1/2 pl-20 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
              >
                <div className="bg-bg-surface/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 shadow-xl hover:border-[#00B5F1]/50 hover:shadow-[0_0_25px_rgba(0,181,241,0.15)] transition-all duration-300 group-hover:scale-[1.02]">
                  <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                    <div className="w-10 h-10 rounded-xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 flex items-center justify-center group-hover:bg-[#00B5F1]/20 transition-colors">
                      <step.icon className="w-5 h-5 text-[#00B5F1]" />
                    </div>
                    <h4 className="text-lg font-bold text-text-primary">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Badge/Dot */}
              <div className="absolute left-8 md:left-1/2 w-14 h-14 bg-bg-base border-2 border-[#00B5F1]/40 rounded-full flex items-center justify-center text-[#00B5F1] font-bold text-lg z-10 transform -translate-x-1/2 shadow-[0_0_20px_rgba(0,181,241,0.2)] group-hover:border-[#00B5F1] group-hover:shadow-[0_0_30px_rgba(0,181,241,0.4)] transition-all duration-300">
                {step.id}
              </div>

              {/* Empty placeholder to balance layout on desktop */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-20 text-center"
      >
        <Link
          href="/kapcsolat"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00B5F1]/10 border border-[#00B5F1]/20 text-[#00B5F1] text-sm font-semibold hover:bg-[#00B5F1]/20 transition-colors cursor-pointer"
        >
          <span>Konzultáció kérése</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
