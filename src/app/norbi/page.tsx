import React from "react";
import Image from "next/image";
import Link from "next/link";
import Timeline from "@/components/molecules/Timeline";

export const metadata = {
  title: "Rólam – WebDude | Norbi vagyok Kecskemétről",
  description:
    "Több mint 16 év WordPress és 26 év grafikai tapasztalattal rendelkező digitális szakember bemutatkozása.",
};

export default function AboutPage() {
  const processSteps = [
    {
      title: "Igényfelmérés",
      desc: "Közös megértés és célmeghatározás a projekthez.",
      icon: "1",
    },
    {
      title: "Design tervezés",
      desc: "Vizuális koncepció és egyedi arculat kialakítása.",
      icon: "2",
    },
    {
      title: "Fejlesztés & SEO",
      desc: "Villámgyors, keresőoptimalizált kód írása.",
      icon: "3",
    },
    {
      title: "Funkciók integrálása",
      desc: "Eshop, konverziós elemek és AI megoldások.",
      icon: "4",
    },
    {
      title: "Marketing támogatás",
      desc: "Folyamatos növekedés és eredménykövetés.",
      icon: "5",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC]">
      {/* 1. Hero Szekció (Személyes felütés) */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block relative pl-6">
              <span className="text-xs uppercase font-black tracking-[0.4em] text-[#0369A1] dark:text-[#00B5F1] mb-2 block">
                Bemutatkozás
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-[#0369A1] dark:bg-[#00B5F1]" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-heading text-[#0F172A] dark:text-white leading-tight tracking-tight">
              Üdvözöllek!
              <br /> <span className="text-[#0369A1] dark:text-[#00B5F1] italic">
                WebDude
              </span>{" "}
              vagyok.
            </h1>
            <p className="text-lg md:text-xl text-[#334155] dark:text-slate-400 max-w-lg leading-relaxed">
              Több mint <strong className="text-[#0369A1] dark:text-[#00B5F1]">16 éve</strong>{" "}
              készítek weboldalakat, és{" "}
              <strong className="text-[#0369A1] dark:text-[#00B5F1]">26 éve</strong> foglalkozom
              grafikával. Szenvedélyem a digitális kézművesség, ahol a
              letisztult design találkozik a villámgyors kóddal.
            </p>
          </div>

          <div className="relative lg:h-150 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-125 aspect-4/5 overflow-hidden rounded-4xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 glass-card border border-slate-200 dark:border-white/10 p-4">
              <div className="w-full h-full relative overflow-hidden rounded-2xl flex items-center justify-center">
                <Image
                  src="/assets/personal/webdude-kep.webp"
                  alt="WebDude Norbi"
                  width={500}
                  height={625}
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - CSS Animációval */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
          <span className="text-xs uppercase font-bold tracking-widest text-[#0F172A] dark:text-text-primary">
            Görgetés
          </span>
          <div className="w-px h-12 bg-linear-to-b from-transparent to-[#0F172A] dark:to-text-primary" />
        </div>
      </section>

      {/* 2. Röpke Történetem & Statisztika */}
      <section className="py-24 bg-[#F1F5F9] dark:bg-transparent relative border-y border-slate-200/80 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="inline-block relative pl-6">
              <span className="text-xs uppercase font-black tracking-[0.4em] text-[#0369A1] dark:text-[#00B5F1] mb-2 block">
                Röpke Történetem
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-[#0369A1] dark:bg-[#00B5F1]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-heading text-[#0F172A] dark:text-white leading-tight tracking-tight">
              A Te{" "}
              <span className="italic text-[#0369A1] dark:text-[#00B5F1]">
                Digitális Partnered.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-[#334155] dark:text-slate-400 max-w-lg leading-relaxed mx-auto">
              Hangsúlyozom:{" "}
              <strong className="text-[#0369A1] dark:text-[#00B5F1]">
                Nem egy ügynökség vagyok. Én vagyok a WebDude.
              </strong>{" "}
              Ebből pedig te is profitálsz. Nincs account manager, nincs
              félreértés, és nincsenek elszálló határidők. Csak Te, én, és a
              projekted gyerekszobája: a közvetlen, személyes együttműködés.
            </p>
          </div>

          {/* Statisztikai Kártyák */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="luminous-card p-10 text-center group">
              <span className="text-7xl font-heading block mb-4 text-[#0F172A] dark:text-text-primary group-hover:text-[#0369A1] dark:group-hover:text-[#00B5F1] tracking-wide">
                200+
              </span>
              <p className="text-sm uppercase tracking-widest font-bold text-[#475569] dark:text-slate-400">
                Projekt Készítve
              </p>
            </div>
            <div className="luminous-card p-10 text-center group">
              <span className="text-7xl font-heading block mb-4 text-[#0F172A] dark:text-text-primary group-hover:text-[#0369A1] dark:group-hover:text-[#00B5F1] tracking-wide">
                500+
              </span>
              <p className="text-sm uppercase tracking-widest font-bold text-[#475569] dark:text-slate-400">
                Lead Generált
              </p>
            </div>
            <div className="luminous-card p-10 text-center group">
              <span className="text-7xl font-heading block mb-4 text-[#0F172A] dark:text-text-primary group-hover:text-[#0369A1] dark:group-hover:text-[#00B5F1] tracking-wide">
                +150%
              </span>
              <p className="text-sm uppercase tracking-widest font-bold text-[#475569] dark:text-slate-400">
                Konverzió Növekedés
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interaktív Tanulmányi Idővonal */}
      <section className="py-24 bg-[#F8FAFC] dark:bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block relative pl-6">
              <span className="text-xs uppercase font-black tracking-[0.4em] text-[#0369A1] dark:text-[#00B5F1] mb-2 block">
                Múlt & Tapasztalat
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-[#0369A1] dark:bg-[#00B5F1]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading text-[#0F172A] dark:text-white leading-tight tracking-wide">
              Utam idáig
            </h2>
          </div>

          <Timeline />
        </div>
      </section>

      {/* 4. Küldetés és Munkamódszer */}
      <section className="py-24 bg-[#F1F5F9] dark:bg-transparent relative overflow-hidden border-t border-slate-200/80 dark:border-white/10">
        <div className="absolute top-0 right-0 w-125 h-125 bg-[#0369A1]/5 dark:bg-[#00B5F1]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <div className="inline-block relative pl-6">
              <span className="text-xs uppercase font-black tracking-[0.4em] text-[#0369A1] dark:text-[#00B5F1] mb-2 block">
                Küldetés & Módszer
              </span>
              <div className="absolute left-0 top-0 w-1 h-6 bg-[#0369A1] dark:bg-[#00B5F1]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading text-[#0F172A] dark:text-white leading-tight tracking-wide">
              &ldquo;Segíteni az ügyfeleknek kitűnni a digitális térben
              esztétikus és hatékony megoldásokkal.&rdquo;
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="luminous-card p-6 relative group overflow-hidden"
              >
                <div className="text-[100px] font-heading absolute -top-8 -right-4 text-[#0F172A] dark:text-text-primary opacity-5 group-hover:opacity-10 transition-opacity">
                  {step.icon}
                </div>
                <div className="relative z-10">
                  <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-transparent border border-slate-300 dark:border-white/10 text-[#0F172A] dark:text-text-primary flex items-center justify-center text-sm font-bold mb-6 group-hover:bg-[#0369A1] dark:group-hover:bg-[#00B5F1] group-hover:text-white dark:group-hover:text-bg-base transition-colors">
                    {step.icon}
                  </span>
                  <h4 className="text-lg font-bold mb-3 text-[#0F172A] dark:text-text-primary">
                    {step.title}
                  </h4>
                  <p className="text-sm text-[#334155] dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Konverzió (CTA) */}
      <section className="py-24 md:py-32 bg-[#EAF1FA] dark:bg-[#111C33] text-[#0F172A] dark:text-text-primary text-center relative overflow-hidden border-t border-slate-200/80 dark:border-white/10">
        {/* Accent glow on CTA section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0369A1]/10 dark:bg-[#00B5F1]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-heading text-[#0F172A] dark:text-white leading-tight tracking-tight">
              Dolgozzunk{" "}
              <span className="text-[#0369A1] dark:text-[#00B5F1] italic">együtt!</span>
            </h2>
            <p className="text-lg md:text-xl text-[#334155] dark:text-slate-300 max-w-lg leading-relaxed mx-auto">
              Készen állsz arra, hogy szintet lépjen a digitális jelenléted?
            </p>
            <div className="pt-8">
              <Link
                href="/kapcsolat"
                className="px-8 py-4 bg-linear-to-r from-[#075985] to-[#5B21B6] hover:from-[#0369A1] hover:to-[#6D28D9] text-white rounded-full font-semibold uppercase tracking-wider text-sm hover:scale-[1.03] active:scale-95 transition-all duration-300 shadow-[0_8px_28px_rgba(7,89,133,0.4)] min-h-11 min-w-11 inline-flex items-center justify-center"
              >
                Kérj ajánlatot most!
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
