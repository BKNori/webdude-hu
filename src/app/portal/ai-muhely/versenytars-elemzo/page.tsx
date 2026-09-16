"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import CompetitorAnalyzer from "@/components/organisms/CompetitorAnalyzer";

export default function CompetitorAnalyzerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) return;
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }
      setLoading(false);
    });
    return unsub;
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#00B5F1]" />
        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest animate-pulse font-bold">
          Versenytárs-elemző betöltése...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-slate-200 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <CompetitorAnalyzer />
      </div>
    </div>
  );
}
