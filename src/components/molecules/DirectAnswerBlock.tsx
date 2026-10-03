interface DirectAnswerBlockProps {
  /** Oldal-szintű egyedi azonosító a heading `id`-jéhez és az `aria-labelledby`-hez. */
  id?: string;
  /** Rövid, direkt kérdés — pontosan úgy, ahogy a látogató/AI'd megfogalmazza. */
  question: string;
  /** 40–60 szavas, entitás-gazdag válasz. Semmi ár, semmi kód, csak tények. */
  answer: string;
  /** Opcionális kulcstények — táblázatos, gyorsan átolvasható formában. */
  facts?: { label: string; value: string }[];
}

/**
 * AEO „Direct Answer" blokk (Answer Engine Optimization).
 *
 * A Perplexity / ChatGPT / Gemini a kérdés-válasz párokat a beágyazott
 * strukturált adatokból idézi. Ez a blokk:
 *  - a látható UI-ban is megjelenik (nem csak a JSON-LD-ben),
 *  - a `question` szó szerint egy természetes nyelvi kérdés,
 *  - a `answer` 40–60 szó, entitás-gazdag (16 év tapasztalat, WordPress,
 *    WooCommerce, egyedi fejlesztés, SEO),
 *  - látható határa: `border-l` brand-csík + üveg háttér — a 90-8-2
 *    szabály szerint a brand csak a kereten jelenik meg, nem a szövegen.
 *
 * **Az `id`-t mindig az adott oldalnak kell megadnia**, különben több
 * blokk ugyanazzal a `id`-vel renderelődne (duplikált DOM-id → a11y
 * hiba és hibás `aria-labelledby`-kapcsolat).
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
      <div className="relative bg-slate-950/80 backdrop-blur-2xl border border-slate-800/80 border-l-2 border-l-brand-primary rounded-2xl p-8 md:p-10">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background:
              "radial-gradient(ellipse 60% 100% at 0% 50%, rgba(0, 181, 241, 0.07) 0%, transparent 65%)",
          }}
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-4">
            <span
              className="w-1.5 h-1.5 rounded-full bg-brand-primary"
              aria-hidden="true"
            />
            Gyors válasz
          </span>
          <h2
            id={id ? `${id}-heading` : undefined}
            className="text-2xl md:text-3xl font-bold text-text-primary leading-snug mb-4"
          >
            {question}
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            {answer}
          </p>

          {facts && facts.length > 0 && (
            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-xl px-5 py-4"
                >
                  <dt className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                    {fact.label}
                  </dt>
                  <dd className="text-lg font-bold text-text-primary tabular-nums">
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