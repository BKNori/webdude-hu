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
 * Egyszerű, újrahasználható „Másolás vágólapra" gomb.
 * 2 másodpercig „Másolva" állapotot mutat sikeres másolás után.
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
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono hover:bg-sky-500/20 transition-colors cursor-pointer ${FOCUS_RING} ${className}`}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? copiedLabel : label}
    </button>
  );
}
