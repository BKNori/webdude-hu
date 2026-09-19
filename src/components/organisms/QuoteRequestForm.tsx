"use client";

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createLeadAction } from "@/actions/lead";

const quoteSchema = z.object({
  name: z.string().min(2, "Kérlek, add meg a nevedet (min. 2 karakter)"),
  email: z.string().email("Érvénytelen e-mail cím"),
  projectType: z.string().min(1, "Kérlek, válassz projekt típust"),
  budget: z.string().min(1, "Kérlek, válassz hozzávetőleges költségkeretet"),
  summary: z
    .string()
    .min(10, "Kérlek, írd le röviden a projektet (min. 10 karakter)"),
});

type QuoteInput = z.infer<typeof quoteSchema>;

const projectTypeMap: Record<
  string,
  "webpage" | "webshop" | "graphics" | "ai" | "contact"
> = {
  webdevelopment: "webpage",
  wordpress: "webshop",
  "ai-automation": "ai",
  design: "graphics",
  other: "contact",
};

const budgetMap: Record<
  string,
  "under_500k" | "500k_1m" | "1m_2m" | "over_2m"
> = {
  "150k-300k": "under_500k",
  "300k-600k": "500k_1m",
  "600k-1.5m": "1m_2m",
  "1.5m+": "over_2m",
};

export default function QuoteRequestForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      budget: "",
      summary: "",
    },
  });

  // Safe useWatch hook with control for React Compiler compatibility
  const watchedValues = useWatch({
    control,
  });

  const onSubmit = async (data: QuoteInput) => {
    setServerError(null);
    try {
      const mappedData = {
        ...data,
        projectType: projectTypeMap[data.projectType] || "contact",
        budget: budgetMap[data.budget] || "under_500k",
      };
      const res = await createLeadAction(mappedData);
      if (res.success) {
        setIsSubmitted(true);
        reset();
      } else {
        setServerError(res.error || "Nem sikerült elküldeni az ajánlatkérést.");
      }
    } catch {
      setServerError("Váratlan hálózati hiba lépett fel.");
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!watchedValues.name || !watchedValues.email) {
        return;
      }
    }
    if (step === 2) {
      if (!watchedValues.projectType || !watchedValues.budget) {
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  if (isSubmitted) {
    return (
      <div className="bg-[#0f172a]/30 border border-sky-500/30 backdrop-blur-md rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-[0_0_50px_rgba(0, 181, 241,0.15)] animate-fade-in animate-duration-500">
        <div className="w-16 h-16 bg-sky-500/10 border border-sky-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-sky-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-[#e2e8f0] mb-4">
          Sikeres Igényfelmérés!
        </h3>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Köszönöm az ajánlatkérést! Norbi 24 órán belül személyesen jelentkezik
          a megadott e-mail címen egy átfogó javaslattal.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setStep(1);
          }}
          className="px-8 py-3 bg-sky-500 hover:bg-violet-700 text-[#020617] font-semibold uppercase tracking-wider rounded-xl transition-all"
        >
          Új Ajánlatkérés Indítása
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a]/30 border border-slate-800/50 backdrop-blur-md rounded-2xl p-8 max-w-3xl mx-auto hover:border-sky-500/10 transition-all duration-300">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">
          <span>{step}. lépés a 3-ból</span>
          <span>{Math.round((step / 3) * 100)}% Kész</span>
        </div>
        <div className="w-full bg-slate-900/50 h-1.5 rounded-full overflow-hidden border border-slate-800/20">
          <div
            className="bg-sky-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-[#e2e8f0] mb-2">
              Mutatkozz be kérlek!
            </h3>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Teljes Neved
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Pl. Kovács Gábor"
                className="w-full bg-[#1e293b]/30 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                E-mail Címed
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="gabor@kovacs.hu"
                className="w-full bg-[#1e293b]/30 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={nextStep}
                disabled={!watchedValues.name || !watchedValues.email}
                className="px-8 py-3 bg-sky-500 hover:bg-violet-700 disabled:opacity-50 text-[#020617] font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Tovább
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-[#e2e8f0] mb-2">
              Projekt adatok
            </h3>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Projekt Típusa
              </label>
              <select
                {...register("projectType")}
                className="w-full bg-[#1e293b]/50 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
              >
                <option value="">-- Válassz típust --</option>
                <option value="webdevelopment">
                  Egyedi Next.js Webfejlesztés
                </option>
                <option value="wordpress">
                  WordPress / WooCommerce Webshop
                </option>
                <option value="ai-automation">
                  AI Automatizáció & Chatbot
                </option>
                <option value="design">Grafika & Komplett Arculat</option>
                <option value="other">Egyéb egyedi megkeresés</option>
              </select>
              {errors.projectType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.projectType.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Hozzávetőleges Költségkeret
              </label>
              <select
                {...register("budget")}
                className="w-full bg-[#1e293b]/50 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
              >
                <option value="">-- Válassz keretet --</option>
                <option value="150k-300k">150 000 – 300 000</option>
                <option value="300k-600k">300 000 – 600 000</option>
                <option value="600k-1.5m">600 000 – 1 500 000</option>
                <option value="1.5m+">1 500 000 felett</option>
              </select>
              {errors.budget && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.budget.message}
                </p>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-8 py-3 bg-[#1e293b]/50 hover:bg-[#1e293b] border border-slate-800 text-slate-300 font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Vissza
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!watchedValues.projectType || !watchedValues.budget}
                className="px-8 py-3 bg-sky-500 hover:bg-violet-700 disabled:opacity-50 text-[#020617] font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Tovább
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-[#e2e8f0] mb-2">
              Rövid összefoglaló
            </h3>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Írd le röviden a céljaidat
              </label>
              <textarea
                {...register("summary")}
                rows={5}
                placeholder="Pl. szeretnék egy modern Next.js weboldalt kecskeméti kkv vállalkozásomnak, ami automatikusan gyűjti az ajánlatkéréseket..."
                className="w-full bg-[#1e293b]/30 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all resize-none"
              />
              {errors.summary && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.summary.message}
                </p>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={prevStep}
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#1e293b]/50 hover:bg-[#1e293b] border border-slate-800 text-slate-300 font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Vissza
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !watchedValues.summary}
                className={`px-8 py-3 text-[#020617] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                  isSubmitting
                    ? "bg-sky-500/30 cursor-not-allowed"
                    : "bg-sky-500 hover:bg-violet-700 animate-pulse shadow-[0_0_30px_rgba(0, 181, 241,0.6)]"
                }`}
              >
                {isSubmitting ? "Beküldés..." : "Ajánlatkérés Elküldése"}
              </button>
            </div>
          </div>
        )}
      </form>

      {serverError && (
        <div className="mt-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
          {serverError}
        </div>
      )}
    </div>
  );
}
