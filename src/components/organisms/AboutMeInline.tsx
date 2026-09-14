import React from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";

export default function AboutMeInline() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr] items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.45em] text-slate-400">
              Norbi vagyok
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              26 év tervezés, 16 év WordPress, 2026-ban üzletközpontú SaaS
              megközelítéssel.
            </h2>
            <p className="text-base leading-8 text-slate-400">
              Közvetlenül veled dolgozom, hogy a digitális ügyfélszerzés ne csak
              dizájn, hanem rendszer legyen. A WebDude 2026 egy intelligens lead
              engine, amely vállalkozásokat segít növekedni.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/szia-norbi-vagyok" variant="secondary">
                Tudj meg többet
              </Button>
              <Button href="/kapcsolat">Találkozzunk</Button>
            </div>
          </div>
          <div className="glass-card border border-white/10 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
            <div className="aspect-square overflow-hidden rounded-4xl border border-white/5 bg-bg-surface relative">
              <Image
                src="/assets/personal/under-the-water.jpg"
                alt="Norbi - WebDude"
                width={600}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
