"use client";

import { motion } from 'motion/react';

interface GenerationSkeletonProps {
  message?: string;
}

export function GenerationSkeleton({ message = "AI dolgozik..." }: GenerationSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bg-surface border border-bg-elevated rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-bg-elevated rounded w-3/4" />
        <div className="h-4 bg-bg-elevated rounded w-1/2" />
        <div className="h-4 bg-bg-elevated rounded w-5/6" />
        <div className="h-4 bg-bg-elevated rounded w-2/3" />
      </div>
      <p className="text-text-secondary mt-6 text-sm font-medium">
        {message}
      </p>
    </motion.div>
  );
}
