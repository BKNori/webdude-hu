export interface ProductFaqItem {
  question: string;
  answer: string;
}

function serializeFaqJsonLd(schema: Record<string, unknown>): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

interface ProductFaqSectionProps {
  /** Oldal-szintű egyedi azonosító (heading id + aria-labelledby). */
  id: string;
  /** Szekció címe (H2). */
  title?: string;
  faqs: readonly ProductFaqItem[];
}

/**
 * AEO-optimalizált, LÁTHATÓ GYIK blokk + `FAQPage` JSON-LD (Server Component).
 * A Google irányelve szerint a FAQ séma tartalmának a látható oldalon is
 * szerepelnie kell — ezért a séma és a UI ugyanabból a forrásból készül.
 * XSS védelem: `serializeJsonLd` (`.replace(/</g, "\\u003c")`).
 */
export default function ProductFaqSection({
  id,
  title = "Gyakori kérdések",
  faqs,
}: ProductFaqSectionProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="py-16 md:py-24 border-t border-slate-200 dark:border-slate-800/80"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeFaqJsonLd(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-6">
        <h2
          id={`${id}-heading`}
          className="text-3xl md:text-4xl text-[#0F172A] dark:text-white mb-8 text-center tracking-tight"
        >
          {title}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group luminous-card rounded-2xl p-6 open:shadow-[0_14px_36px_-10px_rgba(15,23,42,0.12)]"
            >
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-base md:text-lg font-semibold text-[#0F172A] dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg">
                <h3 className="font-sans text-base md:text-lg font-semibold normal-case tracking-normal">
                  {faq.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-1 text-[#0369A1] dark:text-[#00B5F1] transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-[#334155] dark:text-slate-300">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
