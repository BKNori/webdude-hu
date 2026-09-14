"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import ClientVault from "@/components/organisms/ClientVault";

export default function VaultPage() {
  const router = useRouter();

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/portal");
        return;
      }
    });

    return unsubscribe;
  }, [router]);

  return (
    <div className="min-h-screen bg-bg-base">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Digitális Széf</h1>
          <p className="text-slate-400">
            Projekt dokumentumok és megosztott fájlok
          </p>
        </div>
        <ClientVault />
      </div>
    </div>
  );
}
