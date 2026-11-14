"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import {
  generateAIContentAction,
  saveClientNoteAction,
  saveAiGenerationAction,
  getClientAiGenerationsAction,
  deleteAiGenerationAction,
  type AiGenerationItem,
} from "@/actions/ai";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import TemplateSelector from "@/components/molecules/TemplateSelector";
import HistoryList from "@/components/molecules/HistoryList";
import GenerationOutput from "@/components/molecules/GenerationOutput";
import KristofkaWorkflow from "@/components/organisms/KristofkaWorkflow";
import AIToolsCategoryAndSelector from "@/components/organisms/ai-tools/AIToolsCategoryAndSelector";
import AIToolsMarketingForms from "@/components/organisms/ai-tools/AIToolsMarketingForms";
import AIToolsGraphicsForms from "@/components/organisms/ai-tools/AIToolsGraphicsForms";
import {
  tools,
  marketingTools,
  graphicsTools,
  graphicsTemplates,
  DEFAULT_AI_TOOL_FORM_VALUES,
  buildToolInputs,
  buildNoteTitle,
  type ClientAIToolFormValues,
  type ToolCategory,
  type ToolType,
} from "@/lib/aiToolsRegistry";

interface ClientAIToolsProps {
  allowedTools?: string[];
  isAdmin?: boolean;
}

export default function ClientAITools({
  allowedTools = [],
  isAdmin = false,
}: ClientAIToolsProps) {
  const [activeCategory, setActiveCategory] =
    useState<ToolCategory>("marketing");
  const [activeTool, setActiveTool] = useState<ToolType>("product_desc");
  const [formValues, setFormValues] = useState<ClientAIToolFormValues>(
    DEFAULT_AI_TOOL_FORM_VALUES
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [typingInterval, setTypingInterval] = useState<NodeJS.Timeout | null>(null);
  const [generations, setGenerations] = useState<AiGenerationItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [copiedGenId, setCopiedGenId] = useState<string | null>(null);
  const [selectedTemplateIdx, setSelectedTemplateIdx] = useState<number>(-1);

  const handleFieldChange = useCallback(
    <K extends keyof ClientAIToolFormValues>(field: K, value: ClientAIToolFormValues[K]) => {
      setFormValues((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // ─── Kliensoldali Firestore fallback (`ai_generations` kollekció) ─────────
  const loadHistoryFallback = useCallback(async (): Promise<AiGenerationItem[] | null> => {
    if (!db || !auth?.currentUser) return null;
    try {
      const uid = auth.currentUser.uid;
      const isHelloAdmin = auth.currentUser.email === "hello@webdude.hu";
      const col = collection(db, "ai_generations");
      const q = isHelloAdmin ? col : query(col, where("clientId", "==", uid));
      const snap = await getDocs(q);
      const items: AiGenerationItem[] = snap.docs.map((d) => {
        const data = d.data() as Record<string, unknown>;
        const rawCreated = data.createdAt;
        const createdAt =
          rawCreated instanceof Timestamp
            ? rawCreated.toDate().toISOString()
            : typeof rawCreated === "string"
              ? rawCreated
              : "";
        return {
          id: d.id,
          clientId: (data.clientId as string) ?? "",
          clientName: (data.clientName as string) ?? "",
          toolId: (data.toolId as string) ?? "",
          toolName: (data.toolName as string) ?? "",
          inputValuesStr:
            typeof data.inputValues === "string"
              ? data.inputValues
              : JSON.stringify(data.inputValues ?? {}),
          outputText: (data.outputText as string) ?? "",
          createdAt,
        };
      });
      items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      return items;
    } catch {
      return null;
    }
  }, []);

  const loadHistory = useCallback(async (token: string) => {
    setHistoryLoading(true);
    try {
      const res = await getClientAiGenerationsAction(token);
      if (res.success && res.generations) {
        setGenerations(res.generations);
      } else {
        const fallback = await loadHistoryFallback();
        if (fallback) setGenerations(fallback);
      }
    } catch {
      const fallback = await loadHistoryFallback();
      if (fallback) setGenerations(fallback);
    } finally {
      setHistoryLoading(false);
    }
  }, [loadHistoryFallback]);

  useEffect(() => {
    if (!auth) return;
    const unsub = auth.onAuthStateChanged(async (currUser) => {
      if (currUser) {
        const token = await currUser.getIdToken(true);
        void loadHistory(token);
      }
    });
    return unsub;
  }, [loadHistory]);

  const applyTemplate = useCallback(() => {
    if (selectedTemplateIdx < 0) return;
    const tmpl = graphicsTemplates[activeTool]?.[selectedTemplateIdx];
    if (!tmpl) return;
    setFormValues((prev) => ({
      ...prev,
      ...(tmpl.values as Partial<ClientAIToolFormValues>),
    }));
  }, [activeTool, selectedTemplateIdx]);

  const handleGenerate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!auth?.currentUser) {
      setError("Kérlek, jelentkezz be újra a generáláshoz!");
      return;
    }
    setLoading(true);
    setError("");
    setDisplayedText("");
    setFullContent("");
    setSaveSuccess(false);
    if (typingInterval) {
      clearInterval(typingInterval);
      setTypingInterval(null);
    }
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const inputs = buildToolInputs(activeTool, formValues);
      const result = await generateAIContentAction(idToken, activeTool, inputs);
      if (result.success && result.content) {
        setFullContent(result.content);
        void saveAiGenerationAction(idToken, {
          toolId: activeTool,
          toolName: tools[activeTool].name,
          inputValues: inputs,
          outputText: result.content,
        }).then(() => void loadHistory(idToken));
        let idx = 0;
        const interval = setInterval(() => {
          if (idx >= result.content.length) {
            clearInterval(interval);
            return;
          }
          setDisplayedText(result.content.slice(0, idx + 4));
          idx += 4;
        }, 12);
        setTypingInterval(interval);
      } else {
        setError(result.error || "Hiba történt a generálás közben.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Hálózati hiba.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async () => {
    if (!auth?.currentUser || !fullContent) return;
    setSaveLoading(true);
    setError("");
    setSaveSuccess(false);
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const title = buildNoteTitle(activeTool, formValues);
      const res = await saveClientNoteAction(
        idToken,
        title,
        fullContent,
        activeTool
      );
      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setError(res.error || "Nem sikerült menteni a jegyzetet.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Mentési hiba.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!fullContent) return;
    try {
      await navigator.clipboard.writeText(fullContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleReset = () => {
    setFormValues(DEFAULT_AI_TOOL_FORM_VALUES);
    setDisplayedText("");
    setFullContent("");
    setError("");
    setSaveSuccess(false);
    if (typingInterval) {
      clearInterval(typingInterval);
      setTypingInterval(null);
    }
  };

  const handleLoadFromHistory = (gen: AiGenerationItem) => {
    if (!auth?.currentUser) return;
    const toolId = gen.toolId as ToolType;
    setActiveTool(toolId);
    if (marketingTools.includes(toolId)) setActiveCategory("marketing");
    else if (graphicsTools.includes(toolId)) setActiveCategory("graphics");
    else setActiveCategory("strategist");

    handleReset();
    try {
      const parsed = JSON.parse(gen.inputValuesStr || "{}") as Partial<
        ClientAIToolFormValues
      >;
      setFormValues((prev) => ({ ...prev, ...parsed }));
    } catch {}
    setFullContent(gen.outputText);
    setDisplayedText(gen.outputText);
  };

  const handleCopyHistoryText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedGenId(id);
      setTimeout(() => setCopiedGenId(null), 2000);
    } catch {}
  };

  const handleDeleteHistory = async (id: string) => {
    if (!auth?.currentUser) return;
    const idToken = await auth.currentUser.getIdToken(true);
    const res = await deleteAiGenerationAction(idToken, id);
    if (res.success) {
      setGenerations((prev) => prev.filter((g) => g.id !== id));
    } else {
      setError(res.error || "A törlés sikertelen.");
    }
  };

  const changeCategory = (cat: ToolCategory) => {
    setActiveCategory(cat);
    setActiveTool(
      cat === "marketing"
        ? "product_desc"
        : cat === "graphics"
          ? "midjourney_prompt"
          : "kristofka_workflow"
    );
    setDisplayedText("");
    setFullContent("");
    setError("");
    setSelectedTemplateIdx(-1);
  };

  const currentTemplates = graphicsTools.includes(activeTool)
    ? graphicsTemplates[activeTool]
    : [];
  const isLocked = !isAdmin && !allowedTools.includes(activeTool);

  return (
    <div className="bg-linear-to-br from-bg-base via-bg-surface to-bg-base backdrop-blur-xl border border-bg-elevated/80 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden space-y-6">
      <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-brand-primary/5 blur-3xl pointer-events-none" />

      <AIToolsCategoryAndSelector
        activeCategory={activeCategory}
        activeTool={activeTool}
        loading={loading}
        isAdmin={isAdmin}
        allowedTools={allowedTools}
        error={error}
        onCategoryChange={changeCategory}
        onSelectTool={(key) => {
          setActiveTool(key);
          setDisplayedText("");
          setFullContent("");
          setError("");
          setSelectedTemplateIdx(-1);
        }}
      />

      {isLocked ? (
        <div className="bg-bg-elevated/20 border border-bg-elevated/50 backdrop-blur-md rounded-2xl p-8 text-center space-y-6 max-w-xl mx-auto shadow-xl">
          <div className="w-16 h-16 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mx-auto animate-pulse">
            <Lock className="w-8 h-8" strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-heading font-normal uppercase tracking-wide text-white">
              Prémium AI Tervező Zárolva
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
              Ez a kreatív tervező modul nem érhető el az Ön aktuális
              csomagjában. Igényeljen hozzáférést a WebDude AI Workshophoz!
            </p>
          </div>
          <Link
            href="/kapcsolat"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-cta-from to-cta-to hover:bg-cta-hover text-white font-sans font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            Hozzáférés igénylése
          </Link>
        </div>
      ) : activeTool === "kristofka_workflow" ? (
        <KristofkaWorkflow />
      ) : (
        <>
          {activeCategory === "graphics" && currentTemplates.length > 0 && (
            <TemplateSelector
              templates={currentTemplates}
              selectedIdx={selectedTemplateIdx}
              setSelectedIdx={setSelectedTemplateIdx}
              applyTemplate={applyTemplate}
              loading={loading}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <form onSubmit={handleGenerate} className="space-y-4">
              {activeCategory === "marketing" && (
                <AIToolsMarketingForms
                  activeTool={activeTool}
                  values={formValues}
                  loading={loading}
                  onChange={handleFieldChange}
                />
              )}
              {activeCategory === "graphics" && (
                <AIToolsGraphicsForms
                  activeTool={activeTool}
                  values={formValues}
                  loading={loading}
                  onChange={handleFieldChange}
                />
              )}
            </form>

            <GenerationOutput
              displayedText={displayedText}
              loading={loading}
              hasContent={!!fullContent}
              copied={copied}
              saveLoading={saveLoading}
              saveSuccess={saveSuccess}
              onGenerate={handleGenerate}
              onCopy={handleCopy}
              onSaveNote={handleSaveNote}
              onReset={handleReset}
            />
          </div>
        </>
      )}

      <HistoryList
        generations={generations}
        historyLoading={historyLoading}
        copiedGenId={copiedGenId}
        onLoad={handleLoadFromHistory}
        onCopy={handleCopyHistoryText}
        onDelete={handleDeleteHistory}
      />
    </div>
  );
}
