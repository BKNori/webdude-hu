"use client";

import { motion } from "motion/react";
import { Shield, Zap, Activity } from "lucide-react";

interface PerformanceGaugeProps {
  score?: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function PerformanceGauge({
  score = 95,
  showLabel = true,
  size = "md",
}: PerformanceGaugeProps) {
  const sizeClasses = {
    sm: "w-32 h-32 text-2xl",
    md: "w-48 h-48 text-4xl",
    lg: "w-64 h-64 text-6xl",
  };

  const borderClasses = {
    sm: "border-4",
    md: "border-6",
    lg: "border-8",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative ${sizeClasses[size]} ${borderClasses[size]} border-brand-primary rounded-full flex items-center justify-center bg-bg-elevated/50`}
      >
        <span
          className={`${sizeClasses[size].split(" ")[2]} text-white font-mono font-bold`}
        >
          {score}+
        </span>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-center"
          >
            <span className="text-xs text-brand-primary font-bold uppercase tracking-wider">
              Lighthouse Score
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Performance Indicators */}
      <div className="flex gap-4 mt-2">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Zap className="w-3 h-3 text-emerald-500" />
          <span>Performance</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Shield className="w-3 h-3 text-blue-500" />
          <span>Security</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Activity className="w-3 h-3 text-purple-500" />
          <span>SEO</span>
        </div>
      </div>
    </div>
  );
}
