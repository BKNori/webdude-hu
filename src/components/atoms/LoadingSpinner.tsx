"use client";

import { motion } from "motion/react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-sky-500/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-sky-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent border-t-orange-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
