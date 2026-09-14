import React from "react";

interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-lg border border-[#E7ECF2] bg-[#F8FAFC] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#00B5F1]">
      {children}
    </span>
  );
}
