"use client";

import Link from "next/link";
import React from "react";
import { motion } from "motion/react";
import { trackEvent } from "@/lib/analytics";
import Spinner from "@/components/atoms/Spinner";

type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  analyticsEvent?: string;
  analyticsParams?: Record<string, string | number>;
  target?: "_blank" | "_self" | "_parent" | "_top";
  disabled?: boolean;
  loading?: boolean;
  ariaLabel?: string;
}

const styles: Record<ButtonVariant, string> = {
  // Elsődleges CTA: kék-lila gradiens, fehér szöveg (WCAG AAA a #075985→#5B21B6 alapon)
  primary:
    "bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#6D28D9] hover:to-[#5B21B6] text-white border border-transparent shadow-[0_8px_24px_rgba(7,89,133,0.35)] hover:shadow-[0_12px_32px_rgba(91,33,182,0.45)] focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]",
  secondary:
    "bg-slate-900/80 text-text-primary border border-slate-700 hover:border-[#00B5F1]/50 hover:text-[#00B5F1] hover:shadow-[0_8px_24px_rgba(0,181,241,0.15)] focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]",
  // Akcentus: #7C3AED (violet-600) fehér szöveggel — WCAG AAA (~9:1)
  accent:
    "bg-[#7C3AED] hover:bg-[#6D28D9] text-white border border-transparent shadow-[0_8px_24px_rgba(124,58,237,0.35)] hover:shadow-[0_12px_32px_rgba(124,58,237,0.45)] focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]",
  ghost:
    "bg-transparent text-[#00B5F1] border border-slate-700 hover:bg-[#00B5F1]/10 hover:border-[#00B5F1]/50 focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]",
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  size = "md",
  onClick,
  analyticsEvent,
  analyticsParams,
  target,
  disabled = false,
  loading = false,
  ariaLabel,
}: ButtonProps) {
  const sizeClasses: Record<string, string> = {
    sm: "min-h-[40px] min-w-[120px] px-4 py-2 text-xs",
    md: "min-h-[56px] min-w-[200px] px-8 py-4 text-sm",
    lg: "min-h-[64px] min-w-[240px] px-10 py-5 text-base",
  };

  const base = `inline-flex items-center justify-center rounded-full ${sizeClasses[size]} font-bold uppercase tracking-wider transition-all duration-300 ${disabled || loading ? "opacity-50 pointer-events-none" : "active:scale-95"} ${styles[variant]} ${className}`;

  const handleClick = () => {
    if (disabled || loading) return;
    if (onClick) onClick();
    if (analyticsEvent && process.env.NODE_ENV !== "development") {
      trackEvent(analyticsEvent, analyticsParams);
    }
  };

  const content = (
    <>
      {loading && <Spinner className="mr-2" />}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.div
        whileHover={disabled ? undefined : { scale: 1.05 }}
        whileTap={disabled ? undefined : { scale: 0.95 }}
      >
        <Link
          href={href}
          className={base}
          onClick={handleClick}
          target={target}
          aria-label={ariaLabel}
          tabIndex={disabled ? -1 : undefined}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={base}
      onClick={handleClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      aria-label={ariaLabel}
    >
      {content}
    </motion.button>
  );
}
