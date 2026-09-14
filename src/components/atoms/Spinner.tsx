import React from "react";
import { motion } from "motion/react";

export default function Spinner({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`inline-block border-4 border-t-amber-500 border-gray-200 rounded-full w-4 h-4 animate-spin ${className}`}
      role="status"
      aria-label="loading"
    />
  );
}
