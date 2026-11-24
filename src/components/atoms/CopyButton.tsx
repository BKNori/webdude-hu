"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B5F1] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base";

interface CopyButtonProps {
  /** Másolandó szöveg. */
  text: string;
  /** Gomb felirata (alapértelmezett: „Másolás"). */
  label?: string;
  copiedLabel?: string;
  className?: string;
}

/**
 * Egyszerű, újrahasználható „Másolás vágólapra" gomb (DDR-006 v7.2 Dual Theme).
 */
export default function CopyButton({
  text,
  label = "Másolás",
  copiedLabel = "Másolva",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Vágólap API nem érhető el — csendben ignoráljuk
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 border border-[#0369A1]/25 dark:border-[#00B5F1]/25 text-[#0369A1] dark:text-[#00B5F1] text-xs font-mono font-semibold hover:bg-[#0369A1]/20 dark:hover:bg-[#00B5F1]/20 transition-colors cursor-pointer ${FOCUS_RING} ${className}`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? copiedLabel : label}
    </button>
  );
}
