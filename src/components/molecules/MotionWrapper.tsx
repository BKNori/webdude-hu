"use client";

import {
  LazyMotion,
  domAnimation,
  m,
  TargetAndTransition,
  VariantLabels,
} from "motion/react";
import { useMotionPreset } from "@/hooks/useMotionPreset";

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  initial?: TargetAndTransition | VariantLabels;
  animate?: TargetAndTransition | VariantLabels;
  whileInView?: TargetAndTransition | VariantLabels;
  viewport?: { once?: boolean; margin?: string };
}

/**
 * MotionWrapper - Client component for wrapping Server Component content with motion animations
 *
 * This component enables Server Components to remain server-side while still having
 * motion animations applied through this client-side wrapper.
 *
 * Best practices:
 * - Use for scroll-triggered animations (whileInView)
 * - Supports reduced motion accessibility
 * - Uses cinematic spring physics from DESIGN_SYSTEM.md
 */
export default function MotionWrapper({
  children,
  className = "",
  delay = 0,
  initial = { opacity: 0, y: 30 },
  animate = { opacity: 1, y: 0 },
  whileInView = undefined,
  viewport = { once: true, margin: "-100px" },
}: MotionWrapperProps) {
  const motionPreset = useMotionPreset();

  // Apply delay only if duration is not 0 (reduced motion)
  const finalDelay = motionPreset.duration === 0 ? 0 : delay;

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={initial}
        animate={animate}
        whileInView={whileInView}
        viewport={viewport}
        transition={{ ...motionPreset, delay: finalDelay }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

/**
 * FadeUpMotion - Specific preset for fade-up animations
 */
export function FadeUpMotion({
  children,
  className = "",
  delay = 0,
}: Omit<
  MotionWrapperProps,
  "initial" | "animate" | "whileInView" | "viewport"
>) {
  return (
    <MotionWrapper
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
      delay={delay}
    >
      {children}
    </MotionWrapper>
  );
}

/**
 * ScaleMotion - Specific preset for scale animations
 */
export function ScaleMotion({
  children,
  className = "",
  delay = 0,
}: Omit<
  MotionWrapperProps,
  "initial" | "animate" | "whileInView" | "viewport"
>) {
  return (
    <MotionWrapper
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={className}
      delay={delay}
    >
      {children}
    </MotionWrapper>
  );
}
