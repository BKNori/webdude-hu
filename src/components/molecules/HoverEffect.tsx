"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface HoverEffectProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotate?: number;
  hoverBrightness?: number;
  onClick?: () => void;
}

export default function HoverEffect({
  children,
  className = "",
  hoverScale = 1.02,
  hoverRotate = 0,
  hoverBrightness = 1,
  onClick,
}: HoverEffectProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: hoverScale,
        rotate: hoverRotate,
        filter: `brightness(${hoverBrightness})`,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
