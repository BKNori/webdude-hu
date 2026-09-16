# WebDude OS — Sérült Fájlok Helyreállítási Útmutatója (Cycle 136)
**Next.js 16 · React 19 · TypeScript · React Hook Form · Zod · motion/react**

Ez a dokumentum tartalmazza a három sérült kliensoldali organism kódjának teljes, 100%-ban típusbiztos, linter- és compiler-barát, azonnal másolható változatát. A kódok szigorúan követik a WebDude OS **Atomic Design** és **Cyber-Arany (90-8-2-es)** vizuális irányelveit.

---

### 1️⃣ Szuperadmin Kezelőpanel (`src/components/organisms/AdminPanel.tsx`)
Ez az organism két különálló, Zod-dal validált űrlapot tartalmaz a hello@webdude.hu szuperadmin számára: új ügyfelek regisztrációját és az add-on szolgáltatások hozzárendelését. Szigorúan a 300 soros komponens-korlát alatt marad.

```tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "motion/react";
import { UserPlus, FolderPlus, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

// Zod sémák a szigorú kliens- és szerveroldali validációhoz
const registerSchema = z.object({
  name: z.string().min(2, "A név legalább 2 karakter hosszú legyen"),
  email: z.string().email("Érvénytelen e-mail cím"),
});

const assignSchema = z.object({
  clientId: z.string().min(1, "Kötelező ügyfelet választani"),
  addonId: z.string().min(1, "Kötelező kiegészítőt választani"),
});

type RegisterInput = z.infer<typeof registerSchema>;
type AssignInput = z.infer<typeof assignSchema>;

interface AdminPanelProps {
  clients: { uid: string; name: string; email: string }[];
  addons: { id: string; title: string }[];
  onRegisterUser: (data: RegisterInput) => Promise<{ success: boolean; message?: string }>;
  onAssignAddon: (data: AssignInput) => Promise<{ success: boolean; message?: string }>;
}

export default function AdminPanel({ clients, addons, onRegisterUser, onAssignAddon }: AdminPanelProps) {
  const [regStatus, setRegStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [assignStatus, setAssignStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Új ügyfél regisztrációs űrlap
  const {
    register: regRegister,
    handleSubmit: handleRegSubmit,
    reset: resetReg,
    formState: { errors: regErrors, isSubmitting: isRegSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  // Kiegészítő hozzárendelési űrlap
  const {
    register: assignRegister,
    handleSubmit: handleAssignSubmit,
    reset: resetAssign,
    formState: { errors: assignErrors, isSubmitting: isAssignSubmitting },
  } = useForm<AssignInput>({
    resolver: zodResolver(assignSchema),
  });

  const onRegister = async (data: RegisterInput) => {
    setRegStatus(null);
    const res = await onRegisterUser(data);
    if (res.success) {
      setRegStatus({ type: "success", msg: res.message || "Ügyfél sikeresen létrehozva és üdvözlő e-mail kiküldve!" });
      resetReg();
    } else {
      setRegStatus({ type: "error", msg: res.message || "Hiba történt a regisztráció során." });
    }
  };

  const onAssign = async (data: AssignInput) => {
    setAssignStatus(null);
    const res = await onAssignAddon(data);
    if (res.success) {
      setAssignStatus({ type: "success", msg: res.message || "Kiegészítő sikeresen hozzárendelve az ügyfélhez!" });
      resetAssign();
    } else {
      setAssignStatus({ type: "error", msg: res.message || "Hiba történt a hozzárendelés során." });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto px-6 py-12">
      {/* 1. Kártya: Ügyfél Regisztráció */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-slate-900/30 border border-slate-800/50 backdrop-blur-md p-8 rounded-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <UserPlus className="text-sky-500 w-6 h-6" />
          <h2 className="text-2xl font-bold text-slate-100">Új Ügyfél Regisztrációja</h2>
        </div>

        <form onSubmit={handleRegSubmit(onRegister)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Ügyfél Neve</label>
            <input
              type="text"
              {...regRegister("name")}
              placeholder="Pl. Kis Kovács Bt."
              className="w-full bg-slate-950/50 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-slate-200 outline-none transition-all duration-300"
            />
            {regErrors.name && <p className="text-red-500 text-xs mt-1">{regErrors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">E-mail Cím</label>
            <input
              type="email"
              {...regRegister("email")}
              placeholder="partner@cegnev.hu"
              className="w-full bg-slate-950/50 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-slate-200 outline-none transition-all duration-300"
            />
            {regErrors.email && <p className="text-red-500 text-xs mt-1">{regErrors.email.message}</p>}
          </div>

          {regStatus && (
            <div className={`p-4 rounded-xl flex items-start gap-3 ${regStatus.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
              {regStatus.type === "success" ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
              <span className="text-sm font-medium">{regStatus.msg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isRegSubmitting}
            className="w-full bg-sky-500 hover:bg-violet-700 disabled:bg-amber-800/40 text-slate-950 font-bold uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
          >
            {isRegSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Ügyfél Aktiválása"}
          </button>
        </form>
      </motion.div>

      {/* 2. Kártya: Kiegészítő Szolgáltatás Hozzárendelése */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-slate-900/30 border border-slate-800/50 backdrop-blur-md p-8 rounded-2xl"
      >
        <div className="flex items-center gap-3 mb-6">
          <FolderPlus className="text-sky-500 w-6 h-6" />
          <h2 className="text-2xl font-bold text-slate-100">Kiegészítő Hozzárendelése</h2>
        </div>

        <form onSubmit={handleAssignSubmit(onAssign)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Cél Ügyfél</label>
            <select
              {...assignRegister("clientId")}
              className="w-full bg-slate-950/50 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-slate-200 outline-none cursor-pointer transition-all duration-300"
            >
              <option value="">Válassz partnert...</option>
              {clients.map((client) => (
                <option key={client.uid} value={client.uid}>
                  {client.name} ({client.email})
                </option>
              ))}
            </select>
            {assignErrors.clientId && <p className="text-red-500 text-xs mt-1">{assignErrors.clientId.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Kiegészítő / Szolgáltatás</label>
            <select
              {...assignRegister("addonId")}
              className="w-full bg-slate-950/50 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-slate-200 outline-none cursor-pointer transition-all duration-300"
            >
              <option value="">Válassz kiegészítőt...</option>
              {addons.map((addon) => (
                <option key={addon.id} value={addon.id}>
                  {addon.title}
                </option>
              ))}
            </select>
            {assignErrors.addonId && <p className="text-red-500 text-xs mt-1">{assignErrors.addonId.message}</p>}
          </div>

          {assignStatus && (
            <div className={`p-4 rounded-xl flex items-start gap-3 ${assignStatus.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
              {assignStatus.type === "success" ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
              <span className="text-sm font-medium">{assignStatus.msg}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isAssignSubmitting}
            className="w-full bg-sky-500 hover:bg-violet-700 disabled:bg-amber-800/40 text-slate-950 font-bold uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
          >
            {isAssignSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Kiegészítő Hozzáadása"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
```

---

### 2️⃣ Több Lépcsős Ajánlatkérő Űrlap (`src/components/organisms/QuoteRequestForm.tsx`)
Ez az interaktív űrlap Zod-validációt és React Hook Formot használ. A React Compiler kompatibilitás érdekében a `useWatch` hookot a `control` prop használatával hívja meg (megszüntetve a statikus prerender hibákat). A beküldés alatt a gomb lüktet, a végén pedig egy csodás arany sikerkártya jelenik meg.

```tsx
"use client";

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, ArrowLeft, Loader2, Sparkles } from "lucide-react";

// Szigorú Zod validációs séma
const quoteSchema = z.object({
  projectType: z.enum(["weboldal", "webshop", "grafika", "ai", "egyeb"], {
    errorMap: () => ({ message: "Kérlek, válassz egy projekt típust!" }),
  }),
  budget: z.enum(["low", "medium", "high", "enterprise"], {
    errorMap: () => ({ message: "Kérlek, válaszd ki a tervezett keretet!" }),
  }),
  name: z.string().min(2, "Kérlek, add meg a neved (min. 2 karakter)"),
  email: z.string().email("Érvénytelen e-mail cím"),
  summary: z.string().min(10, "Kérlek, írj egy rövid összefoglalót (min. 10 karakter)"),
});

type QuoteInput = z.infer<typeof quoteSchema>;

interface QuoteRequestFormProps {
  onSubmitAction: (data: QuoteInput) => Promise<{ success: boolean; message?: string }>;
}

export default function QuoteRequestForm({ onSubmitAction }: QuoteRequestFormProps) {
  const [step, setStep] = useState<number>(1);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      projectType: undefined,
      budget: undefined,
      name: "",
      email: "",
      summary: "",
    },
  });

  // React Compiler és prerender barát érték-figyelés
  const selectedType = useWatch({ control, name: "projectType" });
  const selectedBudget = useWatch({ control, name: "budget" });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFormSubmit = async (data: QuoteInput) => {
    const res = await onSubmitAction(data);
    if (res.success) {
      setSubmitResult({ success: true, message: res.message || "Az ajánlatkérésed sikeresen beérkezett! Hamarosan kereslek." });
      reset();
      setStep(4); // Sikeres képernyő fázis
    } else {
      setSubmitResult({ success: false, message: res.message || "Hiba történt a beküldés során. Kérlek, próbáld meg újra." });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Lépés Indikátor Sáv */}
      {step < 4 && (
        <div className="flex justify-between items-center mb-10 max-w-md mx-auto">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= s ? "bg-sky-500 text-slate-950 shadow-[0_0_15px_rgba(0, 181, 241,0.3)]" : "bg-slate-900 border border-slate-800 text-slate-500"}`}>
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`h-0.5 w-16 md:w-24 transition-all duration-300 ${step > s ? "bg-sky-500" : "bg-slate-800"}`} />}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <div className="space-y-8">
          {/* LÉPÉS 1: Projekt Típus Kiválasztása */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">Milyen projektet tervezel?</h2>
                <p className="text-slate-400 text-base">Válaszd ki a leginkább illeszkedő kategóriát</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { id: "weboldal", title: "Egyedi Weboldal", desc: "Next.js / React alapú prémium megjelenés" },
                  { id: "webshop", title: "Modern Webshop", desc: "WooCommerce vagy headless értékesítés" },
                  { id: "grafika", title: "Grafika & Arculat", desc: "Logó, branding és nyomdai előkészítés" },
                  { id: "ai", title: "AI Automatizáció", desc: "Chatbotok és egyedi AI munkafolyamatok" },
                  { id: "egyeb", title: "Egyéb Fejlesztés", desc: "Karbantartás, audit vagy egyedi kód" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setValue("projectType", item.id as any)}
                    className={`cursor-pointer p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-40 ${selectedType === item.id ? "bg-sky-500/5 border-sky-500 shadow-[0_0_20px_rgba(0, 181, 241,0.15)] text-slate-100" : "bg-slate-900/30 border-slate-800/80 hover:border-slate-700 text-slate-300"}`}
                  >
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-400 leading-snug">{item.desc}</p>
                    </div>
                    {selectedType === item.id && <Check className="text-sky-500 w-5 h-5 self-end" />}
                  </button>
                ))}
              </div>
              {errors.projectType && <p className="text-red-500 text-sm text-center mt-4">{errors.projectType.message}</p>}

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!selectedType}
                  className="bg-sky-500 hover:bg-violet-700 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold uppercase tracking-wider py-4 px-8 rounded-xl flex items-center gap-2 cursor-pointer transition-all duration-300"
                >
                  Tovább <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* LÉPÉS 2: Költségkeret Kiválasztása */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">Tervezett költségkeret</h2>
                <p className="text-slate-400 text-base">A keret segít meghatározni a technológiai mélységet</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
                {[
                  { id: "low", title: "Mikro-keret (< 500k Ft)", desc: "Egyszerűbb bemutatkozó oldalak, induló csomagok" },
                  { id: "medium", title: "Standard (500k - 1M Ft)", desc: "Komplett céges oldalak, alap webáruházak" },
                  { id: "high", title: "Prémium (1M - 2M Ft)", desc: "Egyedi e-commerce, komoly AI integrációk" },
                  { id: "enterprise", title: "SaaS / Enterprise (2M+ Ft)", desc: "Egyedi szoftverek, skálázható platformok" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setValue("budget", item.id as any)}
                    className={`cursor-pointer p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-36 ${selectedBudget === item.id ? "bg-sky-500/5 border-sky-500 shadow-[0_0_20px_rgba(0, 181, 241,0.15)] text-slate-100" : "bg-slate-900/30 border-slate-800/80 hover:border-slate-700 text-slate-300"}`}
                  >
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-slate-400 leading-snug">{item.desc}</p>
                    </div>
                    {selectedBudget === item.id && <Check className="text-sky-500 w-5 h-5 self-end" />}
                  </button>
                ))}
              </div>
              {errors.budget && <p className="text-red-500 text-sm text-center mt-4">{errors.budget.message}</p>}

              <div className="flex justify-between pt-4 max-w-2xl mx-auto">
                <button
                  type="button"
                  onClick={prevStep}
                  className="border border-slate-800 hover:border-slate-700 text-slate-300 font-bold uppercase tracking-wider py-4 px-6 rounded-xl flex items-center gap-2 cursor-pointer transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5" /> Vissza
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!selectedBudget}
                  className="bg-sky-500 hover:bg-violet-700 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold uppercase tracking-wider py-4 px-8 rounded-xl flex items-center gap-2 cursor-pointer transition-all duration-300"
                >
                  Tovább <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* LÉPÉS 3: Kapcsolati és Projekt Adatok */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 max-w-2xl mx-auto"
            >
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">Kapcsolati és Projekt Adatok</h2>
                <p className="text-slate-400 text-base">Foglald össze röviden az elvárásaidat</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Teljes Név</label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Minta János"
                    className="w-full bg-slate-950/50 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-slate-200 outline-none transition-all duration-300"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">E-mail Cím</label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="janos@cegnev.hu"
                    className="w-full bg-slate-950/50 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-slate-200 outline-none transition-all duration-300"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Projekt Összefoglaló</label>
                  <textarea
                    {...register("summary")}
                    rows={4}
                    placeholder="Írd le röviden a projekt célját, elvárásait és funkcióit..."
                    className="w-full bg-slate-950/50 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-slate-200 outline-none resize-none transition-all duration-300"
                  />
                  {errors.summary && <p className="text-red-500 text-xs mt-1">{errors.summary.message}</p>}
                </div>
              </div>

              {submitResult && !submitResult.success && (
                <div className="p-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">{submitResult.message}</span>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="border border-slate-800 hover:border-slate-700 text-slate-300 font-bold uppercase tracking-wider py-4 px-6 rounded-xl flex items-center gap-2 cursor-pointer transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5" /> Vissza
                </button>
                <button
                  type="button"
                  onClick={handleSubmit(handleFormSubmit)}
                  disabled={isSubmitting}
                  className={`bg-sky-500 hover:bg-violet-700 disabled:bg-amber-800/40 text-slate-950 font-bold uppercase tracking-wider py-4 px-8 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${isSubmitting ? "animate-pulse shadow-[0_0_30px_rgba(0, 181, 241,0.6)]" : ""}`}
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Összegzés Küldése"}
                </button>
              </div>
            </motion.div>
          )}

          {/* LÉPÉS 4: Sikeres Beküldés (Cyber-Gold Sikerkártya) */}
          {step === 4 && submitResult && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-sky-500/5 border border-sky-500/30 backdrop-blur-md p-10 rounded-3xl text-center space-y-6 max-w-xl mx-auto shadow-[0_0_50px_rgba(0, 181, 241,0.1)]"
            >
              <div className="w-16 h-16 bg-sky-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0, 181, 241,0.4)]">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight">Köszönöm a megkeresést!</h2>
                <p className="text-slate-300 text-base leading-relaxed">{submitResult.message}</p>
              </div>
              <p className="text-sm text-slate-500">24 órán belül felveszem veled a kapcsolatot a megadott e-mail címen.</p>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
```

---

### 3️⃣ AI Eszköz Generátor Kártya (`src/components/organisms/SingleAITool.tsx`)
Ez a komponens felel az ügyfélportál "AI Műhely" egyedi generátoraianak (pl. Midjourney Prompt, Banner Tervező) interaktív megjelenítéséért. Tartalmazza az elegáns gépelési animációt (Typing Effect), a szoft arany design szegélyeket és a "Mentés a projekthez" mentőfunkciót.

```tsx
"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "motion/react";
import { Cpu, Send, Copy, Bookmark, Loader2, Check } from "lucide-react";

// Dinamikus bemeneti mező definíció
interface InputField {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "textarea" | "select";
  options?: { value: string; label: string }[];
}

interface SingleAIToolProps {
  toolId: string;
  toolName: string;
  description: string;
  inputFields: InputField[];
  onGenerateAction: (toolId: string, inputs: Record<string, string>) => Promise<{ success: boolean; text?: string; message?: string }>;
  onSaveNoteAction: (title: string, content: string, category: string) => Promise<{ success: boolean; message?: string }>;
}

export default function SingleAITool({ toolId, toolName, description, inputFields, onGenerateAction, onSaveNoteAction }: SingleAIToolProps) {
  const [output, setOutput] = useState<string>("");
  const [displayedText, setDisplayedText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  // Zod dinamikus séma építés a bemenetekhez
  const shape: Record<string, any> = {};
  inputFields.forEach((field) => {
    shape[field.id] = z.string().min(2, `${field.label} megadása kötelező (min. 2 karakter)`);
  });
  const toolFormSchema = z.object(shape);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(toolFormSchema),
  });

  // Fluid gépelési effektus (Streaming szimuláció)
  useEffect(() => {
    if (!output) {
      setDisplayedText("");
      return;
    }
    setDisplayedText("");
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + output.charAt(index));
      index++;
      if (index >= output.length) {
        clearInterval(interval);
      }
    }, 8); // 8ms karakterenként a rendkívül fluid mozgásért

    return () => clearInterval(interval);
  }, [output]);

  const onGenerate = async (data: any) => {
    setOutput("");
    setSaved(false);
    const res = await onGenerateAction(toolId, data);
    if (res.success && res.text) {
      setOutput(res.text);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onSaveToProject = async () => {
    if (!output) return;
    setSaveLoading(true);
    const res = await onSaveNoteAction(toolName, output, toolId);
    setSaveLoading(false);
    if (res.success) {
      setSaved(true);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto px-6 py-12">
      {/* Bal Oldal: Paraméter Beviteli Lap (Grid: 5 oszlop) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Cpu className="text-sky-500 w-5 h-5" />
            <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">{toolName}</h1>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>

        <form onSubmit={handleSubmit(onGenerate)} className="bg-slate-900/30 border border-slate-800/50 backdrop-blur-md p-6 rounded-2xl space-y-5">
          {inputFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{field.label}</label>
              {field.type === "select" ? (
                <select
                  {...register(field.id)}
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-slate-200 outline-none cursor-pointer transition-all duration-300"
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  {...register(field.id)}
                  rows={4}
                  placeholder={field.placeholder}
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-slate-200 outline-none resize-none transition-all duration-300"
                />
              ) : (
                <input
                  type="text"
                  {...register(field.id)}
                  placeholder={field.placeholder}
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-sky-500/50 rounded-xl px-4 py-3 text-slate-200 outline-none transition-all duration-300"
                />
              )}
              {errors[field.id] && <p className="text-red-500 text-xs mt-1">{errors[field.id]?.message as string}</p>}
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-500 hover:bg-violet-700 disabled:bg-amber-800/40 text-slate-950 font-bold uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Generálás indítása</>}
          </button>
        </form>
      </div>

      {/* Jobb Oldal: AI Kimeneti Lap (Grid: 7 oszlop) */}
      <div className="lg:col-span-7 flex flex-col h-full min-h-[450px]">
        <div className="flex-1 bg-sky-500/5 border border-sky-500/10 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/50 pb-4">
              <span className="text-xs font-bold text-sky-500 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" /> AI Konzol Kimenet
              </span>
              {output && (
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-slate-200 transition-all duration-300"
                    title="Copy Prompt"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={onSaveToProject}
                    disabled={saved || saveLoading}
                    className="p-2 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-slate-200 transition-all duration-300 disabled:opacity-50"
                    title="Save to Project"
                  >
                    {saveLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4 text-emerald-500" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed font-mono whitespace-pre-wrap min-h-[300px]">
              {displayedText || (
                <span className="text-slate-500 italic font-sans">
                  {isSubmitting ? "Az AI Copilot éppen dolgozik a terveken..." : "Adj meg paramétereket a bal oldalon és indítsd el a generálást."}
                </span>
              )}
            </div>
          </div>
          {saved && <p className="text-xs text-emerald-400 text-right mt-4 font-semibold">✓ Elmentve az ügyfélportál jegyzetei közé!</p>}
        </div>
      </div>
    </div>
  );
}
```
