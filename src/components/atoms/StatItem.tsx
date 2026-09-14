"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatItemProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  iconColorClass?: string;
}

export default function StatItem({
  label,
  value,
  icon: Icon,
  description,
  iconColorClass = "text-amber-500",
}: StatItemProps) {
  return (
    <div className="bg-bg-surface/60 backdrop-blur-md border border-bg-elevated p-6 flex flex-col group relative overflow-hidden rounded-3xl hover:border-amber-500/30 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 h-full">
      {/* Glow Effect */}
      <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-amber-500/5 blur-2xl group-hover:bg-amber-500/10 transition-all duration-500" />

      <div className="space-y-1.5 flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 truncate">
          {label}
        </p>
        <p className="text-2xl md:text-3xl font-extrabold text-white leading-none font-mono">
          {value}
        </p>
        {description && (
          <p className="text-[10px] text-slate-500 truncate pt-0.5">
            {description}
          </p>
        )}
      </div>
      <div className="w-12 h-12 rounded-xl bg-[#070e27]/40 border border-gray-800 flex items-center justify-center shrink-0">
        <Icon
          className={`w-6 h-6 ${iconColorClass} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
