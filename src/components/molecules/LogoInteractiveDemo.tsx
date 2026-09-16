"use client";

import { Sparkles } from "lucide-react";

export default function LogoInteractiveDemo() {

  return (
    <div className="bg-[#020617] rounded-2xl border border-[#1e293b] p-6 md:p-8">
      {/* Fejléc */}
      <div className="flex flex-col gap-3 mb-8 border-b border-[#1e293b] pb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#00B5F1]/10 border border-[#00B5F1]/30">
              <Sparkles className="w-6 h-6 text-[#00B5F1]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#e2e8f0] tracking-tight">
                Logo AI Műhely
              </h2>
              <p className="text-sm text-[#94a3b8] mt-1">
                AI-alapú logógenerálás és MJ prompt készítés
              </p>
            </div>
          </div>

        {/* Zárás: fejléc és fő konténer */}
        </div>
      </div>
    </div>
  );
}
