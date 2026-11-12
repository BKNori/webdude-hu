import { CheckCircle2, XCircle } from "lucide-react";

interface ComparisonCardProps {
  variant: "problem" | "solution";
  title: string;
  items: string[];
}

export default function ComparisonCard({
  variant,
  title,
  items,
}: ComparisonCardProps) {
  const isProblem = variant === "problem";
  return (
    <article
      className={`bg-slate-900/80 backdrop-blur-md border rounded-3xl p-8 shadow-[0_8px_24px_rgba(15,23,42,0.3)] hover:border-sky-500/50 hover:shadow-[0_18px_40px_rgba(0, 181, 241,0.2)] hover:-translate-y-1 transition-all duration-300 ${isProblem ? "border-slate-700" : "border-sky-500/20 shadow-[0_0_30px_rgba(0, 181, 241,0.1)]"}`}
    >
      <header>
        <h3 className="text-xl md:text-2xl text-white tracking-wider">{title}</h3>
      </header>
      <ul className="mt-6 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3">
            {isProblem ? (
              <XCircle
                className="w-4 h-4 mt-0.5 text-slate-500 shrink-0"
                aria-hidden="true"
              />
            ) : (
              <CheckCircle2
                className="w-4 h-4 mt-0.5 text-[#00B5F1] shrink-0"
                aria-hidden="true"
              />
            )}
            <span className="text-sm text-slate-300 font-normal">{it}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
