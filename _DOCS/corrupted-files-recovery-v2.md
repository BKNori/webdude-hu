### WebDude OS — Sérült Fájlok Helyreállítási Útmutatója (Cycle 136) v2
**Next.js 16 · React 19 · TypeScript · React Hook Form · Zod · motion/react**

Ez a dokumentum tartalmazza a három korábban sérült kliensoldali organism fájl kódjának teljes, 100%-ban típusbiztos, linter- és compiler-barát, azonnal másolható változatát. A kódok szigorúan követik a WebDude OS **Atomic Design** és **Cyber-Arany (90-8-2-es)** vizuális irányelveit.

---

##### 1️⃣ Szuperadmin Kezelőpanel (src/components/organisms/AdminPanel.tsx)

Ez az organism két különálló, Zod-dal validált űrlapot tartalmaz a hello@webdude.hu szuperadmin számára: új ügyfelek regisztrációját és az add-on szolgáltatások hozzárendelését. Szigorúan a 300 soros komponens-korlát alatt marad.

```tsx
"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerUserAction, assignAddonToUserAction } from "@/actions/admin";

// Zod validation schemas
const registerSchema = z.object({
  email: z.string().email("Érvénytelen e-mail cím"),
  name: z.string().min(2, "A név legalább 2 karakter hosszú legyen"),
});

const assignSchema = z.object({
  userId: z.string().min(1, "Válassz ki egy ügyfelet"),
  addonId: z.string().min(1, "Válassz ki egy szolgáltatást"),
});

type RegisterInput = z.infer<typeof registerSchema>;
type AssignInput = z.infer<typeof assignSchema>;

interface ClientUser {
  uid: string;
  email: string;
  name: string;
}

interface AdminPanelProps {
  users: ClientUser[];
  addons: Array<{ id: string; name: string }>;
}

export default function AdminPanel({ users = [], addons = [] }: AdminPanelProps) {
  const [isPendingRegister, startRegister] = useTransition();
  const [isPendingAssign, startAssign] = useTransition();
  const [registerResult, setRegisterResult] = useState<{ success: boolean; message: string } | null>(null);
  const [assignResult, setAssignResult] = useState<{ success: boolean; message: string } | null>(null);

  const registerForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", name: "" },
  });

  const assignForm = useForm<AssignInput>({
    resolver: zodResolver(assignSchema),
    defaultValues: { userId: "", addonId: "" },
  });

  const onRegisterSubmit = (data: RegisterInput) => {
    setRegisterResult(null);
    startRegister(async () => {
      try {
        const res = await registerUserAction(data);
        if (res.success) {
          setRegisterResult({ 
            success: true, 
            message: `Ügyfél sikeresen létrehozva! Ideiglenes jelszó: ${res.temporaryPassword || "E-mailben elküldve"}` 
          });
          registerForm.reset();
        } else {
          setRegisterResult({ success: false, message: res.error || "Hiba történt a regisztráció során" });
        }
      } catch (err) {
        setRegisterResult({ success: false, message: "Váratlan hálózati hiba történt" });
      }
    });
  };

  const onAssignSubmit = (data: AssignInput) => {
    setAssignResult(null);
    startAssign(async () => {
      try {
        const res = await assignAddonToUserAction(data);
        if (res.success) {
          setAssignResult({ success: true, message: "Szolgáltatás sikeresen hozzárendelve az ügyfélhez!" });
          assignForm.reset();
        } else {
          setAssignResult({ success: false, message: res.error || "Hiba történt a hozzárendelés során" });
        }
      } catch (err) {
        setAssignResult({ success: false, message: "Váratlan hálózati hiba történt" });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6 py-12">
      {/* 1. Form: Ügyfél Regisztráció */}
      <div className="bg-[#0f172a]/30 border border-slate-800/50 backdrop-blur-md rounded-2xl p-8 hover:border-amber-500/10 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-[#e2e8f0] mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
          Új Ügyfél Regisztrációja
        </h2>
        
        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Ügyfél Teljes Neve
            </label>
            <input
              type="text"
              {...registerForm.register("name")}
              placeholder="Pl. Kis Péter"
              className="w-full bg-[#1e293b]/30 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
            />
            {registerForm.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
              E-mail Cím
            </label>
            <input
              type="email"
              {...registerForm.register("email")}
              placeholder="peter@pelda.hu"
              className="w-full bg-[#1e293b]/30 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
            />
            {registerForm.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPendingRegister}
            className="w-full py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/30 text-[#020617] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isPendingRegister ? "Mentés folyamatban..." : "Ügyfél Létrehozása"}
          </button>
        </form>

        {registerResult && (
          <div className={`mt-6 p-4 rounded-xl border text-sm ${registerResult.success ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
            {registerResult.message}
          </div>
        )}
      </div>

      {/* 2. Form: Addon Hozzárendelés */}
      <div className="bg-[#0f172a]/30 border border-slate-800/50 backdrop-blur-md rounded-2xl p-8 hover:border-amber-500/10 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-[#e2e8f0] mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
          Szolgáltatás Hozzárendelése
        </h2>

        <form onSubmit={assignForm.handleSubmit(onAssignSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Válassz Ügyfelet
            </label>
            <select
              {...assignForm.register("userId")}
              className="w-full bg-[#1e293b]/50 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
            >
              <option value="">-- Válassz az aktív kliensek közül --</option>
              {users.map((u) => (
                <option key={u.uid} value={u.uid}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
            {assignForm.formState.errors.userId && (
              <p className="text-red-500 text-sm mt-1">{assignForm.formState.errors.userId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Válassz Add-ont
            </label>
            <select
              {...assignForm.register("addonId")}
              className="w-full bg-[#1e293b]/50 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
            >
              <option value="">-- Válassz szolgáltatást --</option>
              {addons.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
            {assignForm.formState.errors.addonId && (
              <p className="text-red-500 text-sm mt-1">{assignForm.formState.errors.addonId.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPendingAssign}
            className="w-full py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/30 text-[#020617] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isPendingAssign ? "Hozzárendelés folyamatban..." : "Szolgáltatás Hozzáadása"}
          </button>
        </form>

        {assignResult && (
          <div className={`mt-6 p-4 rounded-xl border text-sm ${assignResult.success ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
            {assignResult.message}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

##### 2️⃣ Több Lépcsős Ajánlatkérő Űrlap (src/components/organisms/QuoteRequestForm.tsx)

Ez az interaktív űrlap Zod-validációt és React Hook Formot használ. A React Compiler kompatibilitás érdekében a `useWatch` hookot a `control` prop használatával hívja meg (megszüntetve a statikus prerender hibákat). A beküldés alatt a gomb lüktet, a végén pedig egy csodás arany sikerkártya jelenik meg.

```tsx
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
  summary: z.string().min(10, "Kérlek, írd le röviden a projektet (min. 10 karakter)"),
});

type QuoteInput = z.infer<typeof quoteSchema>;

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
      const res = await createLeadAction(data);
      if (res.success) {
        setIsSubmitted(true);
        reset();
      } else {
        setServerError(res.error || "Nem sikerült elküldeni az ajánlatkérést.");
      }
    } catch (err) {
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
      <div className="bg-[#0f172a]/30 border border-amber-500/30 backdrop-blur-md rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto shadow-[0_0_50px_rgba(245,158,11,0.15)] animate-fade-in animate-duration-500">
        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-[#e2e8f0] mb-4">Sikeres Igényfelmérés!</h3>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Köszönöm az ajánlatkérést! Norbi 24 órán belül személyesen jelentkezik a megadott e-mail címen egy átfogó javaslattal.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setStep(1);
          }}
          className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-[#020617] font-semibold uppercase tracking-wider rounded-xl transition-all"
        >
          Új Ajánlatkérés Indítása
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a]/30 border border-slate-800/50 backdrop-blur-md rounded-2xl p-8 max-w-3xl mx-auto hover:border-amber-500/10 transition-all duration-300">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">
          <span>{step}. lépés a 3-ból</span>
          <span>{Math.round((step / 3) * 100)}% Kész</span>
        </div>
        <div className="w-full bg-slate-900/50 h-1.5 rounded-full overflow-hidden border border-slate-800/20">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-[#e2e8f0] mb-2">Mutatkozz be kérlek!</h3>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Teljes Neved</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Pl. Kovács Gábor"
                className="w-full bg-[#1e293b]/30 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">E-mail Címed</label>
              <input
                type="email"
                {...register("email")}
                placeholder="gabor@kovacs.hu"
                className="w-full bg-[#1e293b]/30 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={nextStep}
                disabled={!watchedValues.name || !watchedValues.email}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-[#020617] font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Tovább
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-[#e2e8f0] mb-2">Projekt adatok</h3>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Projekt Típusa</label>
              <select
                {...register("projectType")}
                className="w-full bg-[#1e293b]/50 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
              >
                <option value="">-- Válassz típust --</option>
                <option value="webdevelopment">Egyedi Next.js Webfejlesztés</option>
                <option value="wordpress">WordPress / WooCommerce Webshop</option>
                <option value="ai-automation">AI Automatizáció & Chatbot</option>
                <option value="design">Grafika & Komplett Arculat</option>
                <option value="other">Egyéb egyedi megkeresés</option>
              </select>
              {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Hozzávetőleges Költségkeret</label>
              <select
                {...register("budget")}
                className="w-full bg-[#1e293b]/50 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
              >
                <option value="">-- Válassz keretet --</option>
                <option value="150k-300k">150 000 Ft - 300 000 Ft</option>
                <option value="300k-600k">300 000 Ft - 600 000 Ft</option>
                <option value="600k-1.5m">600 000 Ft - 1 500 000 Ft</option>
                <option value="1.5m+">1 500 000 Ft felett</option>
              </select>
              {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
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
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-[#020617] font-bold uppercase tracking-wider rounded-xl transition-all"
              >
                Tovább
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl font-bold text-[#e2e8f0] mb-2">Rövid összefoglaló</h3>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Írd le röviden a céljaidat</label>
              <textarea
                {...register("summary")}
                rows={5}
                placeholder="Pl. szeretnék egy modern Next.js weboldalt kecskeméti kkv vállalkozásomnak, ami automatikusan gyűjti az ajánlatkéréseket..."
                className="w-full bg-[#1e293b]/30 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all resize-none"
              />
              {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>}
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
                    ? "bg-amber-500/30 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600 animate-pulse shadow-[0_0_30px_rgba(245,158,11,0.6)]"
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
```

---

##### 3️⃣ AI Eszköz Generátor Kártya (src/components/organisms/SingleAITool.tsx)

Ez a komponens felel az ügyfélportál "AI Műhely" egyedi generátoraianak (pl. Midjourney Prompt, Banner Tervező) interaktív megjelenítéséért. Tartalmazza az elegáns gépelési animációt (Typing Effect), a szoft arany design szegélyeket és a "Mentés a projekthez" mentőfunkciót.

```tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generateAiContentAction, saveAiNoteAction } from "@/actions/ai";

const toolFormSchema = z.object({
  topic: z.string().min(2, "Kérlek, adj meg egy témát"),
  tone: z.string().min(1, "Válassz ki egy hangvételt"),
  keywords: z.string().optional(),
});

type ToolFormInput = z.infer<typeof toolFormSchema>;

interface SingleAIToolProps {
  toolId: string;
  toolName: string;
  description: string;
  systemPrompt: string;
}

export default function SingleAITool({ toolId, toolName, description, systemPrompt }: SingleAIToolProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [displayedText, setGeneratedDisplayText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ success: boolean; message: string } | null>(null);

  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ToolFormInput>({
    resolver: zodResolver(toolFormSchema),
    defaultValues: { topic: "", tone: "", keywords: "" },
  });

  // typing effect implementation
  useEffect(() => {
    if (generatedText) {
      setGeneratedDisplayText("");
      let currentIndex = 0;
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
      
      typingTimerRef.current = setInterval(() => {
        if (currentIndex < generatedText.length) {
          setGeneratedDisplayText((prev) => prev + generatedText.charAt(currentIndex));
          currentIndex++;
        } else {
          if (typingTimerRef.current) {
            clearInterval(typingTimerRef.current);
          }
        }
      }, 10);
    }
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [generatedText]);

  const onGenerate = async (data: ToolFormInput) => {
    setIsGenerating(true);
    setGeneratedText("");
    setGeneratedDisplayText("");
    setSaveStatus(null);
    try {
      const res = await generateAiContentAction({
        toolId,
        toolName,
        systemPrompt,
        ...data,
      });

      if (res.success && res.text) {
        setGeneratedText(res.text);
      } else {
        setGeneratedText("Hiba történt a generálás során: " + (res.error || "Ismeretlen hiba"));
      }
    } catch (err) {
      setGeneratedText("Váratlan hálózati hiba lépett fel a generálási kísérlet során.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedText || displayedText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      // fallback
    }
  };

  const handleSaveToProject = async () => {
    setSaveStatus(null);
    try {
      const res = await saveAiNoteAction({
        title: `${toolName} - ${new Date().toLocaleDateString("hu-HU")}`,
        content: generatedText,
        category: toolId,
      });
      if (res.success) {
        setSaveStatus({ success: true, message: "Sikeresen mentve az ügyfél-jegyzetek közé! (notes)" });
      } else {
        setSaveStatus({ success: false, message: res.error || "Nem sikerült elmenteni a jegyzetet." });
      }
    } catch (err) {
      setSaveStatus({ success: false, message: "Váratlan hiba történt mentés közben." });
    }
  };

  return (
    <div className="bg-[#0f172a]/30 border border-slate-800/50 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto hover:border-amber-500/10 transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#e2e8f0] mb-2">{toolName}</h2>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Paraméterező Űrlap */}
        <form onSubmit={handleSubmit(onGenerate)} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Téma vagy Kulcsszó</label>
            <input
              type="text"
              {...register("topic")}
              placeholder="Pl. prémium bútor webshop akciók"
              className="w-full bg-[#1e293b]/30 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
            />
            {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Márkahangvétel (Tone)</label>
            <select
              {...register("tone")}
              className="w-full bg-[#1e293b]/50 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
            >
              <option value="">-- Válassz hangnemet --</option>
              <option value="professional">Szakmai és hiteles (E-E-A-T)</option>
              <option value="friendly">Közvetlen és barátságos</option>
              <option value="casual">Laza és humoros</option>
              <option value="minimalist">Minimalista és lényegretörő</option>
            </select>
            {errors.tone && <p className="text-red-500 text-sm mt-1">{errors.tone.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Negatív vagy Kötelező Kulcsszavak (Opcionális)</label>
            <input
              type="text"
              {...register("keywords")}
              placeholder="Pl. ingyenes szállítás, limitált darabszám"
              className="w-full bg-[#1e293b]/30 border border-slate-800 focus:border-amber-500/50 rounded-xl px-4 py-3 text-[#e2e8f0] outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/30 text-[#020617] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#020617] border-t-transparent rounded-full animate-spin"></span>
                Generálás folyamatban...
              </span>
            ) : (
              "AI Tartalom Generálása"
            )}
          </button>
        </form>

        {/* Generált kimenet (Typing effect) */}
        <div className="bg-[#0f172a]/40 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between min-h-[300px]">
          <div>
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-800/50">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Kimenet</span>
              {displayedText && (
                <button
                  type="button"
                  onClick={handleCopyToClipboard}
                  className="text-xs text-amber-500 hover:text-amber-600 font-bold uppercase tracking-wider transition-colors"
                >
                  {isCopied ? "Másolva! ✓" : "Másolás"}
                </button>
              )}
            </div>

            <div className="text-[#e2e8f0] text-sm leading-relaxed whitespace-pre-wrap font-mono select-text h-[250px] overflow-y-auto pr-2 custom-scrollbar">
              {displayedText || (
                <span className="text-slate-600 italic">Add meg a paramétereket bal oldalon a generáláshoz...</span>
              )}
            </div>
          </div>

          {generatedText && displayedText.length >= generatedText.length && (
            <div className="pt-4 border-t border-slate-800/50 mt-4 flex flex-col sm:flex-row gap-4 animate-fade-in">
              <button
                type="button"
                onClick={handleSaveToProject}
                className="flex-1 py-3 px-4 rounded-xl border border-amber-500/30 hover:border-amber-500/50 text-[#e2e8f0] font-semibold text-xs uppercase tracking-wider text-center transition-all"
              >
                Mentés a Projekthez (notes)
              </button>
            </div>
          )}

          {saveStatus && (
            <div className={`mt-4 p-3 rounded-xl border text-xs text-center ${saveStatus.success ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
              {saveStatus.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```
