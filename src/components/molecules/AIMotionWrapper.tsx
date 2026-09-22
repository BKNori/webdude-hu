"use client";

import React from "react";
import { motion } from "motion/react";

interface AIMotionWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

export default function AIMotionWrapper({ children, delay = 0 }: AIMotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}