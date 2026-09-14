"use client";

import React, { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
}

export default function AccordionItem({
  question,
  answer,
}: AccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl border border-bg-elevated bg-bg-surface overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white"
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className="text-amber-500">{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <div className="px-6 pb-6 text-sm leading-relaxed text-text-secondary">
          {answer}
        </div>
      ) : null}
    </div>
  );
}
