"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContactForm } from "@/actions/contact";
import { trackEvent } from "@/lib/analytics";

// Zod séma a kapcsolatfelvételi űrlap validálásához
const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "A névnek legalább 2 karakterből kell állnia!" }),
  email: z.string().email({ message: "Kérlek, érvényes email címet adj meg!" }),
  projectType: z
    .string()
    .min(1, { message: "Kérlek, válassz projekt típust!" }),
  message: z
    .string()
    .min(10, { message: "Az üzenetnek legalább 10 karakterből kell állnia!" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onError = () => {
    trackEvent("form_error", {
      projectType: getValues("projectType"),
      form: "contact",
      errorType: "validation_error",
    });
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(null);

    try {
      // Server Action hívás Firebase leads mentéssel
      const result = await submitContactForm(data);

      if (result.success) {
        setSubmitSuccess(true);
        trackEvent("generate_lead", {
          projectType: data.projectType,
          form: "contact",
        });
        reset();
      } else {
        setSubmitSuccess(false);
        trackEvent("form_error", {
          projectType: data.projectType,
          form: "contact",
          errorType: "server_error",
        });
      }
    } catch {
      setSubmitSuccess(false);
      trackEvent("form_error", {
        projectType: data.projectType,
        form: "contact",
        errorType: "network_error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card p-10 bg-bg-surface/80 backdrop-blur-xl border border-sky-500/20 rounded-3xl relative overflow-hidden shadow-2xl shadow-sky-500/10">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      {submitSuccess ? (
        <div className="text-center py-12 space-y-6 relative z-10">
          <div className="w-20 h-20 mx-auto bg-sky-500/10 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-sky-500"
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
          <h3 className="text-2xl font-black text-sky-500">
            Sikeres üzenetküldés!
          </h3>
          <p className="text-slate-300 max-w-sm mx-auto text-sm leading-relaxed">
            Köszönöm az érdeklődést, Norbi hamarosan (általában 24 órán belül)
            felveszi veled a kapcsolatot a megadott email címen.
          </p>
          <button
            type="button"
            onClick={() => setSubmitSuccess(null)}
            className="mt-6 px-6 py-3 bg-sky-500/10 border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-bg-base rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300"
          >
            Új üzenet küldése
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-2xl font-black mb-8 text-text-primary relative z-10">
            Közvetlen üzenet
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-6 relative z-10"
          >
            {/* Név mező */}
            <div>
              <label
                htmlFor="name"
                className="text-xs uppercase tracking-widest font-bold mb-2 block text-slate-400"
              >
                Neved
              </label>
              <input
                id="name"
                type="text"
                placeholder="Kovács János"
                aria-invalid={errors.name ? "true" : "false"}
                {...register("name")}
                className={`w-full bg-transparent border rounded-xl px-5 py-4 text-text-primary placeholder:text-slate-500 outline-none transition-all duration-200 focus:ring-1 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-bg-elevated focus:border-sky-500 focus:ring-sky-500"
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-xs font-semibold mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email mező */}
            <div>
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-widest font-bold mb-2 block text-slate-400"
              >
                Email címed
              </label>
              <input
                id="email"
                type="email"
                placeholder="janos@ceged.hu"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
                className={`w-full bg-transparent border rounded-xl px-5 py-4 text-text-primary placeholder:text-slate-500 outline-none transition-all duration-200 focus:ring-1 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-bg-elevated focus:border-sky-500 focus:ring-sky-500"
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs font-semibold mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Projekt típusa dropdown */}
            <div>
              <label
                htmlFor="projectType"
                className="text-xs uppercase tracking-widest font-bold mb-2 block text-slate-400"
              >
                Projekt típusa
              </label>
              <select
                id="projectType"
                aria-invalid={errors.projectType ? "true" : "false"}
                {...register("projectType")}
                className={`w-full bg-transparent border rounded-xl px-5 py-4 text-text-primary outline-none transition-all duration-200 focus:ring-1 ${
                  errors.projectType
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-bg-elevated focus:border-sky-500 focus:ring-sky-500"
                }`}
              >
                <option value="">Válassz projekt típust...</option>
                <option value="webdesign">Weboldal tervezés</option>
                <option value="webfejlesztes">Webfejlesztés</option>
                <option value="wordpress">WordPress projekt</option>
                <option value="grafikai">Grafikai tervezés</option>
                <option value="ai">AI megoldás</option>
                <option value="egyeb">Egyéb</option>
              </select>
              {errors.projectType && (
                <span className="text-red-500 text-xs font-semibold mt-1 block">
                  {errors.projectType.message}
                </span>
              )}
            </div>

            {/* Üzenet mező */}
            <div>
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-widest font-bold mb-2 block text-slate-400"
              >
                Üzenet (Projekt rövid leírása)
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Mesélj röviden a megvalósítandó ötletről..."
                aria-invalid={errors.message ? "true" : "false"}
                {...register("message")}
                className={`w-full bg-transparent border rounded-xl px-5 py-4 text-text-primary placeholder:text-slate-500 outline-none transition-all duration-200 focus:ring-1 ${
                  errors.message
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-bg-elevated focus:border-sky-500 focus:ring-sky-500"
                }`}
              />
              {errors.message && (
                <span className="text-red-500 text-xs font-semibold mt-1 block">
                  {errors.message.message}
                </span>
              )}
            </div>

            {/* Küldés Gomb */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-sky-500 to-violet-700 hover:from-violet-700 hover:to-sky-800 disabled:from-slate-700 disabled:to-slate-800 text-bg-base disabled:text-slate-400 font-bold py-4 rounded-xl uppercase tracking-widest text-sm shadow-xl shadow-sky-500/20 hover:-translate-y-1 disabled:transform-none transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-bg-base"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Küldés folyamatban...
                </>
              ) : (
                "Üzenet Küldése →"
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
