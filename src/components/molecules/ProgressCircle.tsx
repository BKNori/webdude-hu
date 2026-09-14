"use client";

import { motion } from "motion/react";
import { useMotionPreset } from "@/hooks/useMotionPreset";

interface ProgressCircleProps {
  value: string;
  description: string;
  color?: "gold" | "dark" | "highlight";
}

const colorClasses = {
  gold: {
    stroke: "#ffd700",
    glow: "rgba(255, 215, 0, 0.3)",
  },
  dark: {
    stroke: "#64748b",
    glow: "rgba(100, 116, 139, 0.3)",
  },
  highlight: {
    stroke: "#ff6b00",
    glow: "rgba(255, 107, 0, 0.3)",
  },
};

export default function ProgressCircle({
  value,
  description,
  color = "gold",
}: ProgressCircleProps) {
  const colors = colorClasses[color];
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = 75; // 75% kör
  const motionPreset = useMotionPreset();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke={colors.stroke}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            initial={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference,
            }}
            animate={{ strokeDashoffset: circumference * (1 - progress / 100) }}
            transition={motionPreset}
            style={{ filter: `drop-shadow(0 0 8px ${colors.glow})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{value}</span>
        </div>
      </div>
      <p className="text-xs text-text-secondary text-center max-w-30">
        {description}
      </p>
    </div>
  );
}
