// src/components/organisms/HeroStaticBanner.tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export default function HeroStaticBanner() {
  const shouldReduce = useReducedMotion();

  const headline = "WebDude – AI‑hajtású digitális mesterség";
  const subHeadline =
    "Prémium webfejlesztés, AI workflow és lead‑generálás egy elegáns, cyber‑gold felülettel";
  const ctaText = "Kezdjünk el együtt";
  const ctaHref = "/kapcsolat";

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden py-16 bg-[#041356]">
      {/* Background Image */}
      <Image
        src="/hero_static_banner.png"
        alt="Hero banner"
        fill
        priority
        className="object-cover opacity-30"
      />
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#00B5F1] mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {headline}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-[#e2e8f0] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subHeadline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            shouldReduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href={ctaHref}
            className="inline-block bg-[#00B5F1] text-[#090a16] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#ffd700] transition-colors"
          >
            {ctaText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
