import React from "react";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  center?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  className = "",
  center = false,
}: SectionTitleProps) {
  const textAlign = center ? "text-center" : "";
  return (
    <div
      className={`max-w-3xl ${center ? "mx-auto" : ""} ${className} ${textAlign}`}
    >
      {eyebrow ? (
        <p className="text-[clamp(0.75rem,1.5vw,0.875rem)] uppercase tracking-[0.5em] text-slate-400 mb-4 wrap-break-word">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] sm:text-[clamp(1.875rem,5vw,3rem)] md:text-[clamp(2rem,5.5vw,3.5rem)] lg:text-[clamp(2.25rem,6vw,4rem)] font-extrabold tracking-tight text-text-primary mb-6 leading-tight wrap-break-word">
        {title}
      </h2>
      {description ? (
        <p className="text-[clamp(1rem,2.5vw,1.125rem)] md:text-[clamp(1.125rem,3vw,1.25rem)] text-slate-400 leading-relaxed wrap-break-word">
          {description}
        </p>
      ) : null}
    </div>
  );
}
