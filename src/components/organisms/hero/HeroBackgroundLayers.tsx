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
      <div
        className="absolute inset-0 -z-20 overflow-hidden"
        aria-hidden="true"
      >
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
              className="object-cover hero-parallax-img opacity-48 dark:opacity-65"
              priority={currentSlide === 0}
              sizes="100vw"
              src={slide.bgImage}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tiszta CSS mesh grid — nincs WebGL */}
      <div
        className="absolute inset-0 bg-mesh-grid opacity-30 dark:opacity-25 pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Kalibrált Dual Theme irányított szövegvédelmi scrim (Luminous Daylight + Luminous Slate) */}
      <div
        className="absolute inset-0 bg-linear-to-r from-[#F8FAFC]/92 via-[#F8FAFC]/56 to-transparent dark:from-[#0B1120]/90 dark:via-[#0B1120]/50 dark:to-transparent -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-bg-base via-transparent to-[#F8FAFC]/35 dark:from-bg-base dark:via-transparent dark:to-[#0B1120]/35 -z-10"
        aria-hidden="true"
      />

      {/* Finom aurora fényrétegek — kék-lila glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-55 dark:opacity-100 -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute -top-1/4 -left-1/4 w-[55vw] h-[55vw] rounded-full hero-blob-1"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 181, 241, 0.28) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full hero-blob-2"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute -top-24 left-1/3 w-[40vw] h-[30vw] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(56, 189, 248, 0.14) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
      </motion.div>
    </>
  );
}
