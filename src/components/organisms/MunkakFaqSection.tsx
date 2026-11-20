/**
 * Gyakori kérdések (FAQ) szekció a /munkak oldalhoz.
 *
 * TISZTA React Server Component (RSC) — nincs `"use client"`, nincs `motion`.
 * Az AI-keresők (ChatGPT, Perplexity, Gemini) és a Google számára a
 * `FAQPage` JSON-LD séma teszi kiemelhetővé a tartalmat (AEO); a `<script>`
 * szerveroldalon, XSS-védetten (`.replace(/</g, "\\u003c")`) renderelődik.
 *
 * Színek: kizárólag Kék-Lila v7.0 (CIÓ `#00B5F1` → violet `#5B21B6`); nincs
 * arany/amber. A kérdések célja a bizalomépítés és a lead-generálás.
 */

import Link from "next/link";

/** A kérdés-válasz párok — AI-kereső-barát, konkrét, konverzió-fókuszú. */
const FAQ_ITEMS = [
  {
    question: "Milyen típusú projektekben segítek?",
    answer:
      "Egyedi weboldalak (WordPress + Kadence és teljesen egyedi Next.js fejlesztés), WooCommerce webshopok, arculattervezés, technikai SEO/AEO optimalizálás, valamint AI-vezérelt automatizációk — a teljes digitális jelenléttől a rendszerintegrációkig.",
  },
  {
    question: "Mennyibe kerül egy weboldal?",
    answer:
      "Nincs fix ár — minden projekt egyedi, a költség pedig a funkcióktól és a céloktól függ. Pontos, tételes árajánlatot a projektfelmérés után adok, kötelezettségmentesen. Kérj egyedi árajánlatot, és 24 órán belül válaszolok.",
  },
  {
    question: "Mennyi idő alatt készül el egy weboldal?",
    answer:
      "A bonyolultságtól függően általában 2-6 hét. A pontos ütemezést és az egyes mérföldköveket az ajánlatban rögzítjük, így előre látod a folyamatot.",
  },
  {
    question: "WordPress vagy egyedi fejlesztés — melyiket válasszam?",
    answer:
      "A legjobbat választom: a gyorsan bővíthető, gazdaságos WordPress + Kadence megoldásoktól a teljesen egyedi, skálázható Next.js rendszerekig. A döntés a céljaidtól, nem a technológiától függ.",
  },
];

/** FAQPage JSON-LD séma az AI-keresők (AEO) és a Google számára (XSS-védett). */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function MunkakFaqSection() {
  return (
    <section className="mt-24 rounded-3xl border border-slate-200/90 dark:border-white/10 dark:border-t-white/20 bg-[#F1F5F9] dark:bg-[#111C33]/85 px-6 py-16 md:px-12 shadow-[0_12px_32px_rgba(15,23,42,0.06)] dark:shadow-[0_12px_36px_rgba(2,6,23,0.35)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white sm:text-4xl">
            Mielőtt{" "}
            <span className="bg-linear-to-r from-[#0369A1] to-[#6D28D9] dark:from-[#00B5F1] dark:to-[#A78BFA] bg-clip-text text-transparent">
              kérdeznél
            </span>
          </h2>
          <p className="mt-4 text-lg text-[#334155] dark:text-slate-300">
            A leggyakoribb kérdések — egyenesen, mellébeszélés nélkül.
          </p>
        </div>

        <dl className="mt-12 space-y-6">
          {FAQ_ITEMS.map((item) => (
            <div key={item.question} className="luminous-card p-6">
              <dt className="text-lg font-bold text-[#0F172A] dark:text-white">
                {item.question}
              </dt>
              <dd className="mt-3 leading-relaxed text-[#334155] dark:text-slate-300">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-center text-[#334155] dark:text-slate-300">
          Van még kérdésed?{" "}
          <Link
            href="/kapcsolat"
            className="font-semibold text-[#0369A1] dark:text-[#00B5F1] hover:underline"
          >
            Írj nekem
          </Link>{" "}
          — 24 órán belül válaszolok.
        </p>
      </div>
    </section>
  );
}
