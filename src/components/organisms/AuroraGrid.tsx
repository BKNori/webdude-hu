// src/components/organisms/AuroraGrid.tsx
import React from "react";
import { cn } from "@/lib/utils";

/**
 * Responsive grid wrapper used for service and AI workshop card layouts.
 * It applies the required column breakpoints and spacing.
 */
export default function AuroraGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8",
        className
      )}
    >
      {children}
    </div>
  );
}
