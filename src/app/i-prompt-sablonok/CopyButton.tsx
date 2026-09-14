"use client";

import { Copy } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
      }}
      className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00B5F1] hover:bg-[#0095C7] text-white text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00B5F1] focus:ring-offset-2 focus:ring-offset-bg-base"
    >
      <Copy className="w-4 h-4" />
      Másolás
    </button>
  );
}
