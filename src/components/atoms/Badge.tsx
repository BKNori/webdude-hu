import React from "react";

interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="eyebrow-badge inline-flex items-center rounded-full border border-sky-200 bg-sky-50 text-[#0369A1] dark:border-[#00B5F1]/25 dark:bg-[#00B5F1]/10 dark:text-[#00B5F1] px-4 py-1.5">
      {children}
    </span>
  );
}
