import React from "react";

export const metadata = {
  title: "Felhasználási Feltételek | WebDude",
  description:
    "WebDude felhasználási feltételek és jogi nyilatkozatok. Prémium webfejlesztési, grafikai és AI-automatizációs szolgáltatások.",
};

export default function FelhasznalasiFeltetelek() {
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
              Felhasználási{" "}
              <span className="text-[#00B5F1] italic">Feltételek</span>
            </h1>
            <p className="mt-4 text-slate-400 text-sm">
              Utolsó módosítás: 2026. június 19.
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
                Üdvözöljük a WebDude.hu weboldalon. A jelen felhasználási
                feltételek (továbbiakban: &quot;Feltételek&quot;) szabályozzák a
                WebDude.hu (továbbiakban: &quot;WebDude&quot;, &quot;mi&quot;,
                &quot;szolgáltató&quot;) által nyújtott szolgáltatások
                használatát. A WebDude.hu weboldal elérésével és használatával
                Ön elfogadja ezeket a feltételeket. Ha nem ért egyet a jelen
                Feltételekkel, kérjük, ne használja a weboldalunkat.
              </p>
              <p className="text-slate-300 leading-relaxed">
                A WebDude egy prémium magyar webfejlesztési, grafikai és
                AI-automatizációs ügynökség, amely 26+ év tapasztalattal nyújt
                teljes körű digitális megoldásokat vállalkozásoknak.
                Szolgáltatásaink magukba foglalják a webfejlesztést, UI/UX
                tervezést, grafikai tervezést, AI workflow kiépítést és egyedi
                szoftverfejlesztést.
              </p>
            </section>

            <section className="border-t border-white/5 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Szolgáltatások köre
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                A WebDude.hu weboldalon bemutatott szolgáltatások a következőket
                foglalják magukba:
              </p>
              <ul className="text-slate-300 space-y-3 mb-6">
                {[
                  "Egyedi weboldal és webshop fejlesztés (Next.js, React, WordPress, WooCommerce)",
                  "UI/UX tervezés és felhasználói élmény optimalizálás",
                  "Grafikai tervezés és arculattervezés (logó, branding, nyomdai előkészítés)",
                  "AI workflow kiépítés és prompt engineering",
                  "AI kép- és videógenerálás",
                  "WordPress vírusirtás és biztonsági audit",
                  "SEO optimalizálás és AEO (Answer Engine Optimization)",
                  "Digitális konzultáció és stratégiai tanácsadás",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B5F1] mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-300 leading-relaxed">
                A szolgáltatások részletes leírása és árazása a weboldal
                megfelelő szolgáltatás oldalaikon található. A WebDude
                fenntartja a jogot a szolgáltatások módosítására, frissítésére
                vagy megszüntetésére bármikor előzetes értesítés nélkül.
              </p>
            </section>

            <section className="border-t border-white/5 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Szellemi alkotások joga és Szerzői jogok
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                A WebDude.hu weboldalon található minden tartalom, beleértve de
                nem kizárólagosan a szövegeket, képeket, grafikákat, logókat,
                videókat, szoftvereket és egyéb anyagok, a WebDude vagy
                licencadóinak szellemi tulajdonát képezik, és a szerzői jogi
                törvények védelme alatt állnak.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                A WebDude.hu weboldalon található tartalom másolása,
                reprodukálása, terjesztése, módosítása, publikálása vagy egyéb
                módon történő felhasználása a WebDude előzetes írásos engedélye
                nélkül szigorúan tilos. A weboldal tartalmának bármilyen
                engedély nélküli felhasználása szerzői jogi jogsértésnek
                minősül.
              </p>
              <p className="text-slate-300 leading-relaxed">
                A WebDude által fejlesztett egyedi szoftverek, weboldalak és
                egyéb digitális termékek a megrendelő tulajdonát képezik a
                teljes kifizetést követően, kivéve a nyílt forráskódú
                komponenseket és könyvtárakat, amelyek saját licencfeltételeik
                alatt maradnak.
              </p>
            </section>

            <section className="border-t border-white/5 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Felelősségkorlátozás
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                A WebDude.hu weboldalt és a benne található információkat
                &quot;jelenlegi állapotában&quot; és &quot;elérhetőként&quot;
                biztosítjuk, mindenféle garancia vagy feltételek nélkül.
              </p>
              <p className="text-slate-300 leading-relaxed mb-6">
                A WebDude semmilyen esetben nem vállal felelősséget az
                alábbiakért:
              </p>
              <ul className="text-slate-300 space-y-3 mb-6">
                {[
                  "A weboldal vagy bármely szolgáltatás megszakadásáért vagy hibájáért",
                  "A weboldalon található információk pontatlanságáért vagy hiányosságáért",
                  "A weboldal használatából eredő bármilyen közvetlen vagy közvetett kárért",
                  "Harmadik felek által nyújtott szolgáltatásokért vagy tartalmakért",
                  "A weboldalhoz való hozzáférés elvesztéséért vagy a személyes adatok védelméért",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B5F1] mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-slate-300 leading-relaxed">
                A WebDude nem garantálja, hogy a weboldal vírusmentes,
                hibamentes vagy folyamatosan elérhető. A felhasználó saját
                felelősségére használja a weboldalt és a szolgáltatásokat.
              </p>
            </section>

            <section className="border-t border-white/5 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Személyes adatok védelme
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                A WebDude elkötelezett a személyes adatok védelme mellett. A
                weboldal használatával kapcsolatban gyűjtött személyes adatok
                kezelésére az Adatvédelmi Szabályzatunk vonatkozik, amelyet a
                weboldalon külön dokumentumként talál.
              </p>
              <p className="text-slate-300 leading-relaxed">
                A WebDude a GDPR (Általános Adatvédelmi Rendelet) és a magyar
                adatvédelmi törvények szerint kezeli a személyes adatokat, és
                biztosítja az adatok biztonságát és védelmét.
              </p>
            </section>

            <section className="border-t border-white/5 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Szerződéses kapcsolat
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                A WebDude által nyújtott szolgáltatások igénybevétele
                szerződéses kapcsolatot teremt a WebDude és a megrendelő között.
                A szerződéses feltételek a konkrét szolgáltatásra vonatkozó
                ajánlatban és megrendelésben vannak rögzítve.
              </p>
              <p className="text-slate-300 leading-relaxed">
                A WebDude fenntartja a jogot a szolgáltatások nyújtásának
                megtagadására bármely ügyféllel szemben, indoklás nélkül,
                különösen ha az ügyfél megsérti a jelen Feltételeket vagy
                bármely alkalmazandó jogszabályt.
              </p>
            </section>

            <section className="border-t border-white/5 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Fizetési feltételek
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                A WebDude által nyújtott szolgáltatások árazása a weboldalon
                található árak szerint érvényes. A WebDude fenntartja a jogot az
                árak módosítására bármikor előzetes értesítés nélkül.
              </p>
              <p className="text-slate-300 leading-relaxed">
                A fizetési feltételek a konkrét szolgáltatásra vonatkozó
                ajánlatban vannak rögzítve. A WebDude elfogadja a banki utalást,
                a PayPal fizetést és egyéb egyeztetett fizetési módokat.
              </p>
            </section>

            <section className="border-t border-white/5 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Garancia és visszatérítés
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                A WebDude által nyújtott szolgáltatásokra a konkrét
                szolgáltatásra vonatkozó ajánlatban rögzített garancia
                feltételei vonatkoznak. A WebDude nem vállal általános
                visszatérítési garanciát, kivéve a jogszabályban kötelezően
                előírt esetekben.
              </p>
              <p className="text-slate-300 leading-relaxed">
                A WebDude törekszik a legmagasabb minőségű szolgáltatások
                nyújtására, és minden panaszt komolyan vesz. Ha bármilyen
                problémája van a szolgáltatásainkkal, kérjük, lépjen velem
                kapcsolatba.
              </p>
            </section>

            <section className="border-t border-white/5 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Jogorvoslat
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                A jelen Feltételekből eredő bármilyen vitát elsődlegesen
                tárgyalásos úton kívánunk rendezni. Ha a tárgyalás nem vezet
                eredményre, a felek a magyar bíróságok joghatóságát elfogadják.
              </p>
              <p className="text-slate-300 leading-relaxed">
                A jelen Feltételekre a magyar jogszabályok vonatkoznak,
                különösen a Polgári Törvénykönyvről szóló 2013. évi V. törvény
                és a szerzői jogi törvények.
              </p>
            </section>

            <section className="border-t border-white/5 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Feltételek módosítása
              </h2>
              <p className="text-slate-300 leading-relaxed">
                A WebDude fenntartja a jogot a jelen Feltételek bármikor történő
                módosítására. A módosított feltételek a weboldalon történő
                közzétételükkel lépnek hatályba. A weboldal további használata a
                módosított feltételek elfogadását jelenti.
              </p>
            </section>

            <section className="border-t border-white/5 pt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#00B5F1] rounded-full" />
                Kapcsolat
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Ha bármilyen kérdése van a jelen Feltételekkel vagy a WebDude
                szolgáltatásaival kapcsolatban, kérjük, lépjen velem
                kapcsolatba:
              </p>
              <div className="text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:hello@webdude.hu"
                    className="text-[#00B5F1] hover:text-[#ffd700] transition-colors underline decoration-dotted"
                  >
                    hello@webdude.hu
                  </a>
                </p>
                <p>
                  <strong>Weboldal:</strong>{" "}
                  <a
                    href="https://webdude.hu"
                    className="text-[#00B5F1] hover:text-[#ffd700] transition-colors underline decoration-dotted"
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
