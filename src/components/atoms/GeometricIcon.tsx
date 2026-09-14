"use client";

import { motion } from "motion/react";

interface GeometricIconProps {
  type: "hexagon" | "triangle" | "circle" | "square" | "diamond";
  size?: number;
  color?: string;
}

const GeometricIcon = ({
  type,
  size = 24,
  color = "#ffd700",
}: GeometricIconProps) => {
  const icons = {
    hexagon: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
      </svg>
    ),
    triangle: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M12 2L22 22H2L12 2Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
      </svg>
    ),
    circle: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
      </svg>
    ),
    square: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <motion.rect
          x="3"
          y="3"
          width="18"
          height="18"
          stroke={color}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
      </svg>
    ),
    diamond: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M12 2L22 12L12 22L2 12L12 2Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
      </svg>
    ),
  };

  return icons[type];
};

export default GeometricIcon;
