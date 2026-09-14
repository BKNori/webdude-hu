"use client";

// Premium clean background – no animated neon spheres to keep the design minimal and performant
export default function AuroraBackground({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
    >
      {/* Background intentionally left empty for premium aesthetic */}
    </div>
  );
}
