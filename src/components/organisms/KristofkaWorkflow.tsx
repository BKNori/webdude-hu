"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Building2,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { generateKristofkaPitchAction } from "@/actions/ai";
import { saveToCaseStudyAction } from "@/actions/case-study";
import { auth } from "@/lib/firebase";
import { getClientUserProfileAction } from "@/actions/portal";
import ToolAccessLock from "@/components/molecules/ToolAccessLock";
import KristofkaInputForm from "@/components/organisms/kristofka/KristofkaInputForm";
import KristofkaPitchOutput, {
  type KristofkaResult,
} from "@/components/organisms/kristofka/KristofkaPitchOutput";

export default function KristofkaWorkflow() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [result, setResult] = useState<KristofkaResult | null>(null);

  const [uploadedFileUrl, setUploadedFileUrl] = useState<string>("");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [targetAudience, setTargetAudience] = useState("");
  const [narrative, setNarrative] = useState("");
  const [tone, setTone] = useState("");
  const [energetikaiBesorolas, setEnergetikaiBesorolas] = useState("unknown");
  const [accessLoading, setAccessLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allowedTools, setAllowedTools] = useState<string[]>([]);

  useEffect(() => {
    if (!auth) {
      queueMicrotask(() => setAccessLoading(false));
      return;
    }
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setAccessLoading(false);
        return;
      }
      try {
        const token = await user.getIdToken(true);
        const res = await getClientUserProfileAction(token);
        if (res.success && res.profile) {
          setIsAdmin(
            res.profile.role === "admin" || user.email === "hello@webdude.hu"
          );
          setAllowedTools(res.profile.allowedTools || []);
        }
      } catch {
        // Profil hiba nem blokkolja — a lock panel mutatkozik.
      } finally {
        setAccessLoading(false);
      }
    });
    return unsub;
  }, []);

  const hasToolAccess = isAdmin || allowedTools.includes("kristofka_workflow");

  const notifySuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(""), 2000);
  };

  const handleGenerate = async () => {
    if (!auth?.currentUser) {
      setError("Kérlek, jelentkezz be a generáláshoz!");
      return;
    }

    if (!uploadedFileUrl || !targetAudience || !narrative || !tone) {
      setError("Kérlek, tölts fel egy fájlt és válassz ki minden opciót!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const res = await generateKristofkaPitchAction(idToken, {
        fileUrl: uploadedFileUrl,
        fileName: uploadedFileName || "fajl.pdf",
        targetAudience,
        narrative,
        tone,
        energetikaiBesorolas,
      });

      if (res.success && res.result) {
        setResult(res.result as KristofkaResult);
        setSuccess("Kristófka pitch sikeresen generálva!");

        try {
          await saveToCaseStudyAction(
            {
              title: `Kristófka Stratégia - ${new Date().toLocaleDateString("hu-HU")}`,
              clientName: "Anonimizált Ügyfél",
              workflowType: "Kristófka",
              impactMetrics: {
                efficiencyGain: "30%",
                timeSaved: "12h",
              },
              summary: `${res.result.legacy.substring(0, 100)}...`,
              status: "published",
            },
            idToken
          );
        } catch (err) {
          console.error("Case study save error:", err);
        }
      } else {
        setError(res.error || "Nem sikerült generálni a pitch-et.");
      }
    } catch {
      setError("Hiba történt a generálás során.");
    } finally {
      setLoading(false);
    }
  };

  if (accessLoading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0369A1] dark:text-[#00B5F1]" />
      </div>
    );
  }

  if (!hasToolAccess) {
    return <ToolAccessLock toolName="Kristófka Munkafolyamat" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="bg-white dark:bg-[#0F172A]/90 shadow-sm dark:shadow-none backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden space-y-6 hover:border-sky-500/50 hover:shadow-sky-500/10 transition-all duration-300"
    >
      <div className="absolute -left-24 -bottom-24 w-48 h-48 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4"
      >
        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#0369A1] dark:text-[#00B5F1] hover:bg-sky-500/20 transition-colors">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-black tracking-widest text-[#0369A1] dark:text-[#00B5F1] block">
            Strategist-Pro
          </span>
          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] font-mono -mt-0.5">
            Kristófka Munkafolyamat
          </h3>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono border-l-2 border-sky-500/30 pl-3"
      >
        Az ipari ingatlanok hasznosításának és befektetői prezentációjának
        mesterműve. Nyers alaprajzokból professzionális befektetői pitch
        generálása.
      </motion.p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 font-mono">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {!result ? (
        <KristofkaInputForm
          targetAudience={targetAudience}
          narrative={narrative}
          tone={tone}
          energetikaiBesorolas={energetikaiBesorolas}
          loading={loading}
          onTargetAudienceChange={setTargetAudience}
          onNarrativeChange={setNarrative}
          onToneChange={setTone}
          onEnergetikaiBesorolasChange={setEnergetikaiBesorolas}
          onUploadSuccess={(url, fileName) => {
            setUploadedFileUrl(url);
            setUploadedFileName(fileName);
          }}
          onUploadError={(msg) => setError(msg)}
          onGenerate={handleGenerate}
        />
      ) : (
        <KristofkaPitchOutput
          result={result}
          targetAudience={targetAudience}
          narrative={narrative}
          tone={tone}
          energetikaiBesorolas={energetikaiBesorolas}
          onReset={() => setResult(null)}
          onNotifySuccess={notifySuccess}
        />
      )}
    </motion.div>
  );
}
