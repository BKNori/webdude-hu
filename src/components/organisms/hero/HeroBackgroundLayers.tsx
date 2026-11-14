"use client";

import React from "react";
import { motion, AnimatePresence, type MotionValue } from "motion/react";
import ResponsiveImage from "@/components/molecules/ResponsiveImage";
import type { SlideData } from "@/components/organisms/hero/heroSlidesConfig";

interface HeroBackgroundLayersProps {
  slide: SlideData;
  currentSlide: number;
  glowOpacity: MotionValue<number>;
}

export default function HeroBackgroundLayers({
  slide,
  currentSlide,
  glowOpacity,
}: HeroBackgroundLayersProps) {
  return (
    <>
      {/* HÁTTÉRKÉPEK — LCP VÉDELEM: kizárólag a 0. slide kap priority-t! */}
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ResponsiveImage
              alt={slide.bgAlt}
              className="object-cover opacity-65"
              priority={currentSlide === 0}
              sizes="100vw"
              src={slide.bgImage}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sötét kontrasztréteg a háttérkép felett (Kék-Lila v7.0 WCAG AAA) */}
      <div
        className="absolute inset-0 bg-slate-950/75 -z-10"
        aria-hidden="true"
      />

      {/* Tiszta CSS mesh grid — nincs WebGL */}
      <div
        className="absolute inset-0 bg-mesh-grid opacity-35 pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Szövegvédelmi scrim — bal oldali gradient a szöveg WCAG AA kontrasztjához */}
      <div
        className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-950/70 to-slate-950/35 -z-10"
        aria-hidden="true"
      />

      {/* Finom fénygömbök — kék-lila glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 pointer-events-none overflow-hidden -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute -top-1/4 -left-1/4 w-[55vw] h-[55vw] rounded-full hero-blob-1"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 181, 241,0.25) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full hero-blob-2"
          style={{
            background:
              "radial-gradient(circle, rgba(91, 33, 182,0.18) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </motion.div>
    </>
  );
}
