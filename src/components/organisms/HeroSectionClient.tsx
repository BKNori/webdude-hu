"use client";

import { motion, useReducedMotion } from "motion/react";
import SectionTitle from "@/components/atoms/SectionTitle";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

export default function HeroSectionClient() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="bg-[#1e293b]/30 backdrop-blur-md border border-slate-800/50 p-6 rounded-xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduce ? { duration: 0 } : { duration: 0.5 }}
    >
      <SectionTitle
        center
        eyebrow="Szolgáltatás"
        title="Weboldal Készítés"
        description="Egyedi weboldal fejlesztés React, Next.js, WordPress, Node.js technológiákkal."
        className="mx-auto"
      />
      <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
        <Badge>Webfejlesztés</Badge>
        <Button variant="secondary" href="/munkak">
          Portfólió megtekintése
        </Button>
      </div>
    </motion.div>
  );
}
