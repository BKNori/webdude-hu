import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adatvédelmi Szabályzat | WebDude",
  description:
    "WebDude adatvédelmi szabályzat és adatkezelési tájékoztató. GDPR megfelelő adatkezelés és személyes adatok védelme.",
};

export default function AdatvedelmiSzabalyzat() {
  return (
    <main className="py-20 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header section with brand color */}
          <div className="mb-12 text-center md:text-left">
            <span className="text-xs uppercase font-black tracking-[0.4em] text-[#00B5F1] mb-2 block">
              Jogi Dokumentum
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Adatvédelmi{" "}
              <span className="text-[#00B5F1] italic">Szabályzat</span>
            </h1>
            <p className="mt-4 text-slate-400 text-sm">
              Utolsó módosítás: 2026. június 22.
            </p>
          </div>

          {/* Main content wrapped in a premium glass card */}
          <div className="glass-card p-8 md:p-12 border border-white/5 bg-bg-surface/30 backdrop-blur-md shadow-2xl space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Bevezetés
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                A WebDude.hu (továbbiakban: &quot;WebDude&quot;,
                &quot;szolgáltató&quot;) elkötelezett a személyes adatok védelme
                mellett. Jelen Adatvédelmi Szabályzat (továbbiakban:
                &quot;Szabályzat&quot;) tájékoztatja a felhasználókat arról,
                hogy hogyan gyűjtjük, használjuk és védjük a személyes adatokat
                a weboldalunkon és szolgáltatásaink során.
              </p>
              <p className="text-slate-300 leading-relaxed">
                A WebDude a GDPR (Általános Adatvédelmi Rendelet - 2016/679/EU
                rendelet) és a magyar adatvédelmi törvények (2011. évi CXII.
                törvény az információs önrendelkezési jogról és az
                információszabadságról) szerint kezeli a személyes adatokat.
              </p>
            </section>

            <section className="border-t border-white/5 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Adatkezelő adatai
              </h2>
              <div className="text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong>Adatkezelő:</strong> WebDude (Norbi)
                </p>
                <p>
                  <strong>Székhely:</strong> Kecskemét, Magyarország
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:hello@webdude.hu"
                    className="text-[#00B5F1] hover:text-[#38bdf8] transition-colors underline decoration-dotted"
                  >
                    hello@webdude.hu
                  </a>
                </p>
                <p>
                  <strong>Telefon:</strong> +36 70 323 8003
                </p>
                <p className="text-slate-400 text-sm mt-4">
                  <strong>Adatvédelmi tisztviselő:</strong> Jelenleg nincs
                  kijelölt adatvédelmi tisztviselő. Az adatvédelmi kérdésekben a
                  hello@webdude.hu email címen lehet kapcsolatba lépni.
                </p>
              </div>
            </section>

            <section className="border-t border-white/5 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Kezelt személyes adatok
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                A WebDude a következő személyes adatokat gyűjti és kezeli:
              </p>
              <ul className="text-slate-300 space-y-3">
                {[
                  {
                    name: "Név",
                    desc: "Kapcsolatfelvételi űrlap kitöltésekor",
                  },
                  {
                    name: "Email cím",
                    desc: "Kapcsolatfelvételi űrlap kitöltésekor, hírlevél feliratkozáskor",
                  },
                  {
                    name: "Telefonszám",
                    desc: "Kapcsolatfelvételi űrlap kitöltésekor (opcionális)",
                  },
                  {
                    name: "Projekt típus",
                    desc: "Kapcsolatfelvételi űrlap kitöltésekor",
                  },
                  {
                    name: "Üzenet/Összegzés",
                    desc: "Kapcsolatfelvételi űrlap kitöltésekor",
                  },
                  {
                    name: "IP cím",
                    desc: "Weboldal látogatása során automatikusan gyűjtött adat",
                  },
                  {
                    name: "Browser adatok",
                    desc: "Weboldal látogatása során automatikusan gyűjtött adatok",
                  },
                  {
                    name: "Cookie hozzájárulás",
                    desc: "Cookie consent preferenciák",
                  },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B5F1] mt-2.5 shrink-0" />
                    <span>
                      <strong className="text-white">{item.name}:</strong>{" "}
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-white/5 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Cookie-k használata
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                A WebDude.hu weboldal cookie-kat használ a felhasználói élmény
                javítása és a weboldal forgalmának elemzése érdekében.
              </p>
              <ul className="text-slate-300 space-y-3 mb-6">
                {[
                  {
                    type: "Szükséges cookie-k",
                    desc: "A weboldal működéséhez elengedhetetlenek",
                  },
                  {
                    type: "Analytics cookie-k",
                    desc: "A weboldal forgalmának elemzéséhez (Google Analytics)",
                  },
                  {
                    type: "Preferencia cookie-k",
                    desc: "Felhasználói beállítások mentéséhez",
                  },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B5F1] mt-2.5 shrink-0" />
                    <span>
                      <strong className="text-white">{item.type}:</strong>{" "}
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-400 text-sm">
                A cookie-k használatát a weboldal alján található cookie consent
                banner-en keresztül fogadhatja el vagy utasíthatja el.
              </p>
            </section>

            <section className="border-t border-white/5 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Kapcsolat
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Ha bármilyen kérdése van a jelen Adatvédelmi Szabályzattal vagy
                az adatkezeléssel kapcsolatban, kérjük, lépjen velem
                kapcsolatba:
              </p>
              <div className="text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:hello@webdude.hu"
                    className="text-[#00B5F1] hover:text-[#38bdf8] transition-colors underline decoration-dotted"
                  >
                    hello@webdude.hu
                  </a>
                </p>
                <p>
                  <strong>Weboldal:</strong>{" "}
                  <a
                    href="https://webdude.hu"
                    className="text-[#00B5F1] hover:text-[#38bdf8] transition-colors underline decoration-dotted"
                  >
                    https://webdude.hu
                  </a>
                </p>
                <p>
                  <strong>Telefon:</strong> +36 70 323 8003
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
