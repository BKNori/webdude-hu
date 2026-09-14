"use client";

import React from "react";
import { motion } from "motion/react";
import SectionTitle from "@/components/atoms/SectionTitle";
import Button from "@/components/atoms/Button";
import AiChatMockup from "@/components/molecules/AiChatMockup";
import { useMotionPreset } from "@/hooks/useMotionPreset";

export default function AiAssistantDemo() {
  const motionPreset = useMotionPreset();

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid gap-12 md:grid-cols-2 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={motionPreset}
          >
            <SectionTitle
              eyebrow="Assistant"
              title="Értékesítőd, aki sosem alszik"
              description="Interaktív AI demo: lássuk, hogyan segíti a WebDude AI Platform az ajánlatkészítést és a lead minősítést valós idejű javaslatokkal."
            />
            <p className="mt-6 text-slate-600">
              Próbáld ki az alábbi demót: írd be kérdésed, és nézd meg, hogyan
              válaszol az AI egy rövid, hasznos útmutatóval.
            </p>
            <div className="mt-6">
              <Button variant="primary">Indítsd el a demót</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              ...motionPreset,
              delay: motionPreset.duration === 0 ? 0 : 0.2,
            }}
          >
            <AiChatMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
