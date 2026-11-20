interface DirectAnswerBlockProps {
  /** Oldal-szintű egyedi azonosító a heading `id`-jéhez és az `aria-labelledby`-hez. */
  id?: string;
  /** Rövid, direkt kérdés — pontosan úgy, ahogy a látogató/AI'd megfogalmazza. */
  question: string;
  /** 40–60 szavas, entitás-gazdag válasz. Semmi ár, semmi kód, csak tények. */
  answer: string;
  /** Opcionális kulcstények — táblázatos, gyorsan átolvasható formában. */
  facts?: { label: string; value: string }[];
  /** Opcionális felület-tónus (Luminous Slate kompatibilitás). */
  tone?: "night" | "slate" | "paper";
}

/**
 * AEO „Direct Answer" blokk (Answer Engine Optimization).
 *
 * A Perplexity / ChatGPT / Gemini a kérdés-válasz párokat a beágyazott
 * strukturált adatokból idézi. Ez a blokk:
 *  - a látható UI-ban is megjelenik (nem csak a JSON-LD-ben),
 *  - a `question` szó szerint egy természetes nyelvi kérdés,
 *  - a `answer` 40–60 szó, entitás-gazdag,
 *  - egységes Luminous Slate üvegkártyán jelenik meg WCAG AA kontraszttal.
 */
export default function DirectAnswerBlock({
  id,
  question,
  answer,
  facts,
}: DirectAnswerBlockProps) {
  return (
    <section
      className="relative max-w-4xl mx-auto px-6 my-16"
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="relative bg-white/95 dark:bg-[#16223B]/80 backdrop-blur-2xl border border-slate-200/90 dark:border-white/10 dark:border-t-white/20 border-l-4 border-l-[#0369A1] dark:border-l-brand-primary rounded-3xl p-8 md:p-10 shadow-[0_14px_36px_-10px_rgba(15,23,42,0.08)] dark:shadow-[0_12px_40px_rgba(2,6,23,0.35)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 0% 50%, rgba(0, 181, 241, 0.08) 0%, transparent 65%)",
          }}
        />
        <div className="relative">
          <span className="eyebrow-badge inline-flex items-center gap-2 text-[#0369A1] dark:text-brand-primary bg-sky-50 dark:bg-brand-primary/10 border border-sky-200 dark:border-brand-primary/25 px-3 py-1 rounded-full mb-4">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#0369A1] dark:bg-brand-primary"
              aria-hidden="true"
            />
            Gyors válasz
          </span>
          <h2
            id={id ? `${id}-heading` : undefined}
            className="text-2xl md:text-3xl text-[#0F172A] dark:text-white leading-snug mb-4"
          >
            {question}
          </h2>
          <p className="text-base text-[#334155] dark:text-slate-200 leading-relaxed">
            {answer}
          </p>

          {facts && facts.length > 0 && (
            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-slate-50 dark:bg-[#0B1120]/75 border border-slate-200/90 dark:border-white/10 dark:border-t-white/15 rounded-2xl px-5 py-4"
                >
                  <dt className="font-mono text-xs font-medium uppercase tracking-wider text-[#475569] dark:text-slate-300 mb-1.5">
                    {fact.label}
                  </dt>
                  <dd className="text-lg font-bold text-[#0F172A] dark:text-white tabular-nums">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
