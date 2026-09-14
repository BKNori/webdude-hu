import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  Sparkles,
  Copy,
  Check,
  Bot,
  MessageSquare,
  FileText,
  Share2,
  ShoppingCart,
  Loader2,
  RefreshCw,
  Save,
  AlertCircle,
  Trash2,
  Layout,
  Palette,
  Laptop,
  Calendar,
  Lock,
} from "lucide-react";
import Button from "@/components/atoms/Button";
import {
  generateAIContentAction,
  saveClientNoteAction,
  saveAiGenerationAction,
  getClientAiGenerationsAction,
  deleteAiGenerationAction,
  type AiGenerationItem,
} from "@/actions/ai";
import { auth } from "@/lib/firebase";
import TemplateSelector from "@/components/molecules/TemplateSelector";
import GraphicToolCard from "@/components/molecules/GraphicToolCard";

// ---------- Tool & Category Types ----------
type ToolType =
  | "product_desc"
  | "review_assistant"
  | "social_matrix"
  | "cart_recovery"
  | "midjourney_prompt"
  | "banner_concept"
  | "logo_designer"
  | "ui_ux_designer"
  | "seasonal_campaign_designer"
  | "kristofka_workflow";

// Subset of ToolType used for graphics templates

export interface ToolConfig {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

// ---------- Tool Registry ----------
const tools: Record<ToolType, ToolConfig> = {
  product_desc: {
    name: "Termékleírás & AEO",
    icon: FileText,
    description:
      "Konverzió‑optimalizált termékleírás és Schema.org FAQ vázlat.",
  },
  review_assistant: {
    name: "Ügyfélszolgálati Válasz",
    icon: MessageSquare,
    description: "Profi válaszok generálása ügyfélpanaszokra és értékelésekre.",
  },
  social_matrix: {
    name: "Kampány Mátrix",
    icon: Share2,
    description:
      "Facebook poszt, Instagram kép‑instrukció és hírlevél generálása.",
  },
  cart_recovery: {
    name: "Kosárelhagyó Email",
    icon: ShoppingCart,
    description: "3 stílusú kosárelhagyás‑mentő email sablon.",
  },
  midjourney_prompt: {
    name: "Midjourney v6 Master",
    icon: Sparkles,
    description: "Professzionális Midjourney promptok készítése.",
  },
  banner_concept: {
    name: "Banner & Ad Tervező",
    icon: Layout,
    description: "Konverzió‑fókuszú banner koncepciók.",
  },
  logo_designer: {
    name: "Logo & Brand Szimbólum",
    icon: Palette,
    description: "Vektorgrafikus logótervek és brand elemek.",
  },
  ui_ux_designer: {
    name: "UI/UX Wireframe mockup",
    icon: Laptop,
    description: "Weboldal vagy mobilalkalmazás UI vázlatok.",
  },
  seasonal_campaign_designer: {
    name: "Szezonális Vizuál",
    icon: Calendar,
    description: "Szezonális kampánygrafikák és prompt‑sablonok.",
  },
  kristofka_workflow: {
    name: "Kristófka Munkafolyamat",
    icon: Lock,
    description:
      "Az ipari ingatlanok hasznosításának és befektetői prezentációjának mesterműve.",
  },
};

const marketingTools: ToolType[] = [
  "product_desc",
  "review_assistant",
  "social_matrix",
  "cart_recovery",
];
const graphicsTools: ToolType[] = [
  "midjourney_prompt",
  "banner_concept",
  "logo_designer",
  "ui_ux_designer",
  "seasonal_campaign_designer",
];
const strategistTools: ToolType[] = ["kristofka_workflow"];

// ---------- Pre‑defined Templates for Graphics ----------
interface TemplateDef {
  name: string;
  values: Record<string, string>;
}

const graphicsTemplates: Record<ToolType, TemplateDef[]> = {
  product_desc: [],
  review_assistant: [],
  social_matrix: [],
  cart_recovery: [],
  kristofka_workflow: [],
  midjourney_prompt: [
    {
      name: "Futuristic Cyberpunk City",
      values: {
        imgSubject:
          "futuristic cyberpunk city skyline at night, neon lights, flying cars",
        imgStyle: "cinematic",
        imgAspectRatio: "16:9",
        imgMood: "dramatic",
      },
    },
    {
      name: "Minimalist Product Shot",
      values: {
        imgSubject:
          "minimalist product photography of a sleek smartphone on white background",
        imgStyle: "minimalist_vector",
        imgAspectRatio: "1:1",
        imgMood: "bright_clean",
      },
    },
  ],
  banner_concept: [
    {
      name: "Black Friday Sale",
      values: {
        bannerTopic: "Black Friday 50% off on all AI services",
        bannerPlatform: "Facebook Cover",
        bannerBrandVibe: "cyber_gold",
      },
    },
    {
      name: "Spring New Arrivals",
      values: {
        bannerTopic: "Spring collection launch – fresh designs",
        bannerPlatform: "Instagram Post",
        bannerBrandVibe: "clean_minimalist",
      },
    },
  ],
  logo_designer: [
    {
      name: "Tech Startup",
      values: {
        logoBrandName: "WebDude AI",
        logoIndustry: "AI software development",
        logoCoreValues: "innovation, precision, trust",
      },
    },
    {
      name: "Creative Agency",
      values: {
        logoBrandName: "PixelCraft",
        logoIndustry: "creative design agency",
        logoCoreValues: "creativity, boldness, elegance",
      },
    },
  ],
  ui_ux_designer: [
    {
      name: "Landing Page for SaaS",
      values: {
        uiTargetAudience: "SMBs looking for automation",
        uiPageType: "Landing Page",
      },
    },
    {
      name: "Mobile Checkout Flow",
      values: {
        uiTargetAudience: "e‑commerce shoppers",
        uiPageType: "Checkout",
      },
    },
  ],
  seasonal_campaign_designer: [
    {
      name: "Christmas Luxury Gifts",
      values: {
        campaignSeason: "Christmas",
        campaignProduct: "luxury watches",
      },
    },
    {
      name: "Summer Beachwear",
      values: {
        campaignSeason: "Summer",
        campaignProduct: "designer swimwear",
      },
    },
  ],
};

interface ClientAIToolsProps {
  allowedTools?: string[];
  isAdmin?: boolean;
}

export default function ClientAITools({
  allowedTools = [],
  isAdmin = false,
}: ClientAIToolsProps) {
  // ---- Core UI State ----
  const [activeCategory, setActiveCategory] = useState<
    "marketing" | "graphics" | "strategist"
  >("marketing");
  const [activeTool, setActiveTool] = useState<ToolType>("product_desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [typingInterval, setTypingInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  // ---- Marketing Tool Inputs ----
  const [prodName, setProdName] = useState("");
  const [prodSpecs, setProdSpecs] = useState("");
  const [customerMsg, setCustomerMsg] = useState("");
  const [tone, setTone] = useState("profi");
  const [campaignTheme, setCampaignTheme] = useState("");
  const [offerType, setOfferType] = useState("free_shipping");

  // ---- Graphics Tool Inputs ----
  const [imgSubject, setImgSubject] = useState("");
  const [imgStyle, setImgStyle] = useState("cinematic");
  const [imgAspectRatio, setImgAspectRatio] = useState("16:9");
  const [imgMood, setImgMood] = useState("dramatic");

  const [bannerTopic, setBannerTopic] = useState("");
  const [bannerPlatform, setBannerPlatform] = useState("Facebook Cover");
  const [bannerBrandVibe, setBannerBrandVibe] = useState("cyber_gold");

  const [logoBrandName, setLogoBrandName] = useState("");
  const [logoIndustry, setLogoIndustry] = useState("");
  const [logoCoreValues, setLogoCoreValues] = useState("");

  const [uiTargetAudience, setUiTargetAudience] = useState("");
  const [uiPageType, setUiPageType] = useState("Landing Page");

  const [campaignSeason, setCampaignSeason] = useState("Black Friday");
  const [campaignProduct, setCampaignProduct] = useState("");

  // ---- History State ----
  const [generations, setGenerations] = useState<AiGenerationItem[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [copiedGenId, setCopiedGenId] = useState<string | null>(null);

  // ---- Template UI State ----
  const [selectedTemplateIdx, setSelectedTemplateIdx] = useState<number>(-1);

  // ---- Load History on Auth Change ----
  const loadHistory = async (token: string) => {
    setHistoryLoading(true);
    const res = await getClientAiGenerationsAction(token);
    if (res.success && res.generations) setGenerations(res.generations);
    setHistoryLoading(false);
  };

  useEffect(() => {
    if (!auth) return;
    const unsub = auth.onAuthStateChanged(async (currUser) => {
      if (currUser) {
        const token = await currUser.getIdToken(true);
        void loadHistory(token);
      }
    });
    return unsub;
  }, []);

  // ---- Helper: Apply Selected Template ----
  const applyTemplate = useCallback(() => {
    if (selectedTemplateIdx < 0) return;
    const tmpl = graphicsTemplates[activeTool][selectedTemplateIdx];
    if (!tmpl) return;
    const vals = tmpl.values;
    switch (activeTool) {
      case "midjourney_prompt":
        setImgSubject(vals.imgSubject ?? "");
        setImgStyle(vals.imgStyle ?? "cinematic");
        setImgAspectRatio(vals.imgAspectRatio ?? "16:9");
        setImgMood(vals.imgMood ?? "dramatic");
        break;
      case "banner_concept":
        setBannerTopic(vals.bannerTopic ?? "");
        setBannerPlatform(vals.bannerPlatform ?? "Facebook Cover");
        setBannerBrandVibe(vals.bannerBrandVibe ?? "cyber_gold");
        break;
      case "logo_designer":
        setLogoBrandName(vals.logoBrandName ?? "");
        setLogoIndustry(vals.logoIndustry ?? "");
        setLogoCoreValues(vals.logoCoreValues ?? "");
        break;
      case "ui_ux_designer":
        setUiTargetAudience(vals.uiTargetAudience ?? "");
        setUiPageType(vals.uiPageType ?? "Landing Page");
        break;
      case "seasonal_campaign_designer":
        setCampaignSeason(vals.campaignSeason ?? "");
        setCampaignProduct(vals.campaignProduct ?? "");
        break;
      default:
        break;
    }
  }, [activeTool, selectedTemplateIdx]);

  // ---- Generate Handler ----
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const inputs: Record<string, string> = {};
      if (activeTool === "product_desc") {
        inputs.prodName = prodName;
        inputs.prodSpecs = prodSpecs;
      } else if (activeTool === "review_assistant") {
        inputs.customerMsg = customerMsg;
        inputs.tone = tone;
      } else if (activeTool === "social_matrix") {
        inputs.campaignTheme = campaignTheme;
      } else if (activeTool === "cart_recovery") {
        inputs.offerType = offerType;
      } else if (activeTool === "midjourney_prompt") {
        inputs.imgSubject = imgSubject;
        inputs.imgStyle = imgStyle;
        inputs.imgAspectRatio = imgAspectRatio;
        inputs.imgMood = imgMood;
      } else if (activeTool === "banner_concept") {
        inputs.bannerTopic = bannerTopic;
        inputs.bannerPlatform = bannerPlatform;
        inputs.bannerBrandVibe = bannerBrandVibe;
      } else if (activeTool === "logo_designer") {
        inputs.logoBrandName = logoBrandName;
        inputs.logoIndustry = logoIndustry;
        inputs.logoCoreValues = logoCoreValues;
      } else if (activeTool === "ui_ux_designer") {
        inputs.uiTargetAudience = uiTargetAudience;
        inputs.uiPageType = uiPageType;
      } else if (activeTool === "seasonal_campaign_designer") {
        inputs.campaignSeason = campaignSeason;
        inputs.campaignProduct = campaignProduct;
      }
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
        const errorMsg = result.error || "Hiba történt a generálás közben.";
        console.error("AI Generation Error:", errorMsg);
        setError(errorMsg);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Hálózati hiba.";
      console.error("AI Generation Exception:", errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // ---- Save Note Handler ----
  const handleSaveNote = async () => {
    if (!auth?.currentUser || !fullContent) return;
    setSaveLoading(true);
    setError("");
    setSaveSuccess(false);
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      let title = "AI Jegyzet";
      if (activeTool === "product_desc")
        title = `Termékleírás: ${prodName || "Névtelen"}`;
      else if (activeTool === "review_assistant")
        title = `Ügyfélszolgálati válasz: ${customerMsg.slice(0, 15)}...`;
      else if (activeTool === "social_matrix")
        title = `Kampány: ${campaignTheme.slice(0, 15)}...`;
      else if (activeTool === "cart_recovery") {
        const label =
          offerType === "free_shipping"
            ? "Ingyenes szállítás"
            : offerType === "5_coupon"
              ? "5% kupon"
              : "10% kupon";
        title = `Kosárelhagyás: ${label}`;
      } else if (activeTool === "midjourney_prompt")
        title = `Midjourney: ${imgSubject.slice(0, 15)}...`;
      else if (activeTool === "banner_concept")
        title = `Banner: ${bannerTopic.slice(0, 15)}...`;
      else if (activeTool === "logo_designer")
        title = `Logo: ${logoBrandName || "Névtelen"}`;
      else if (activeTool === "ui_ux_designer") title = `UI/UX: ${uiPageType}`;
      else if (activeTool === "seasonal_campaign_designer")
        title = `Szezonális: ${campaignSeason}`;
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

  // ---- Copy Full Content ----
  const handleCopy = async () => {
    if (!fullContent) return;
    try {
      await navigator.clipboard.writeText(fullContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  // ---- Reset All Fields ----
  const handleReset = () => {
    setProdName("");
    setProdSpecs("");
    setCustomerMsg("");
    setCampaignTheme("");
    setImgSubject("");
    setBannerTopic("");
    setLogoBrandName("");
    setLogoIndustry("");
    setLogoCoreValues("");
    setUiTargetAudience("");
    setCampaignProduct("");
    setDisplayedText("");
    setFullContent("");
    setError("");
    setSaveSuccess(false);
    if (typingInterval) {
      clearInterval(typingInterval);
      setTypingInterval(null);
    }
  };

  // ---- History Handlers ----
  const handleLoadFromHistory = async (gen: AiGenerationItem) => {
    if (!auth?.currentUser) return;
    // const idToken = await auth.currentUser.getIdToken(true); // removed unused variable
    // Set tool
    setActiveTool(gen.toolId as ToolType);
    // Reset fields
    handleReset();
    const inputs = JSON.parse(gen.inputValuesStr || "{}") as Record<
      string,
      string
    >;
    switch (gen.toolId) {
      case "product_desc":
        setProdName(inputs.prodName ?? "");
        setProdSpecs(inputs.prodSpecs ?? "");
        break;
      case "review_assistant":
        setCustomerMsg(inputs.customerMsg ?? "");
        setTone(inputs.tone ?? "profi");
        break;
      case "social_matrix":
        setCampaignTheme(inputs.campaignTheme ?? "");
        break;
      case "cart_recovery":
        setOfferType(inputs.offerType ?? "free_shipping");
        break;
      case "midjourney_prompt":
        setImgSubject(inputs.imgSubject ?? "");
        setImgStyle(inputs.imgStyle ?? "cinematic");
        setImgAspectRatio(inputs.imgAspectRatio ?? "16:9");
        setImgMood(inputs.imgMood ?? "dramatic");
        break;
      case "banner_concept":
        setBannerTopic(inputs.bannerTopic ?? "");
        setBannerPlatform(inputs.bannerPlatform ?? "Facebook Cover");
        setBannerBrandVibe(inputs.bannerBrandVibe ?? "cyber_gold");
        break;
      case "logo_designer":
        setLogoBrandName(inputs.logoBrandName ?? "");
        setLogoIndustry(inputs.logoIndustry ?? "");
        setLogoCoreValues(inputs.logoCoreValues ?? "");
        break;
      case "ui_ux_designer":
        setUiTargetAudience(inputs.uiTargetAudience ?? "");
        setUiPageType(inputs.uiPageType ?? "Landing Page");
        break;
      case "seasonal_campaign_designer":
        setCampaignSeason(inputs.campaignSeason ?? "");
        setCampaignProduct(inputs.campaignProduct ?? "");
        break;
      default:
        break;
    }
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

  // ---- Category Switch ----
  const changeCategory = (cat: "marketing" | "graphics" | "strategist") => {
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

  // ---- UI Helpers ----
  const currentTemplates = graphicsTools.includes(activeTool)
    ? graphicsTemplates[activeTool]
    : [];

  return (
    <div className="bg-linear-to-br from-bg-base via-[#041356] to-[#090a16] backdrop-blur-xl border border-bg-elevated/80 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden space-y-6">
      {/* Decorative glow */}
      <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-bg-elevated/40 pb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-black tracking-widest text-amber-500 block">
            BT-Shop AI Blueprint
          </span>
          <h3 className="text-lg font-bold text-white font-mono -mt-0.5">
            Élő AI Generátor
          </h3>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-bg-elevated/40 pb-2 gap-4">
        <button
          type="button"
          onClick={() => changeCategory("marketing")}
          className={`pb-2 px-1 font-mono text-xs font-black uppercase tracking-wider cursor-pointer border-b-2 transition-all ${
            activeCategory === "marketing"
              ? "border-amber-500 text-amber-500"
              : "border-transparent text-slate-500 hover:text-slate-300"
          }`}
        >
          Marketing & Szövegírás
        </button>
        <button
          type="button"
          onClick={() => changeCategory("graphics")}
          className={`pb-2 px-1 font-mono text-xs font-black uppercase tracking-wider cursor-pointer border-b-2 transition-all ${
            activeCategory === "graphics"
              ? "border-amber-500 text-amber-500"
              : "border-transparent text-slate-500 hover:text-slate-300"
          }`}
        >
          Grafika & Tervezés
        </button>
        <button
          type="button"
          onClick={() => changeCategory("strategist")}
          className={`pb-2 px-1 font-mono text-xs font-black uppercase tracking-wider cursor-pointer border-b-2 transition-all ${
            activeCategory === "strategist"
              ? "border-amber-500 text-amber-500"
              : "border-transparent text-slate-500 hover:text-slate-300"
          }`}
        >
          Strategist Pro
        </button>
      </div>

      {/* Tool Selector Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {(activeCategory === "marketing"
          ? marketingTools
          : activeCategory === "graphics"
            ? graphicsTools
            : strategistTools
        ).map((key) => {
          const opt = tools[key];
          const isSelected = activeTool === key;
          const cardLocked =
            !isAdmin &&
            graphicsTools.includes(key) &&
            !allowedTools.includes(key);
          return (
            <GraphicToolCard
              key={key}
              toolKey={key}
              config={opt}
              isSelected={isSelected}
              loading={loading}
              isLocked={cardLocked}
              onClick={() => {
                setActiveTool(key);
                setDisplayedText("");
                setFullContent("");
                setError("");
                setSelectedTemplateIdx(-1);
              }}
            />
          );
        })}
      </div>

      {/* Description of active tool */}
      <p className="text-xs text-slate-400 leading-relaxed font-mono border-l-2 border-amber-500/30 pl-3">
        {tools[activeTool].description}
      </p>

      {/* Global error alert */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-xs flex items-center gap-2.5 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {(() => {
        const isLocked =
          !isAdmin &&
          graphicsTools.includes(activeTool) &&
          !allowedTools.includes(activeTool);
        if (isLocked) {
          return (
            <div className="bg-bg-elevated/20 border border-bg-elevated/50 backdrop-blur-md rounded-2xl p-8 text-center space-y-6 max-w-xl mx-auto shadow-xl">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mx-auto animate-pulse">
                <Lock className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white font-mono">
                  Prémium AI Tervező Zárolva
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                  Ez a kreatív tervező modul nem érhető el az Ön aktuális
                  csomagjában. Igényeljen hozzáférést a WebDude AI Workshophoz!
                </p>
              </div>
              <Link
                href="/kapcsolat"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-bg-base font-bold text-xs uppercase tracking-wider hover:bg-amber-600 transition-all cursor-pointer font-mono"
              >
                Hozzáférés igénylése
              </Link>
            </div>
          );
        }

        return (
          <>
            {/* Template selector for graphics */}
            {activeCategory === "graphics" && currentTemplates.length > 0 && (
              <TemplateSelector
                templates={currentTemplates}
                selectedIdx={selectedTemplateIdx}
                setSelectedIdx={setSelectedTemplateIdx}
                applyTemplate={applyTemplate}
                loading={loading}
              />
            )}

            {/* Form & Output Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Input Form Column */}
              <form onSubmit={handleGenerate} className="space-y-4">
                <AnimatePresence mode="wait">
                  {activeTool === "product_desc" && (
                    <motion.div
                      key="product_desc_form"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <label
                          htmlFor="prod_name"
                          className="text-[10px] uppercase font-bold text-slate-400"
                        >
                          Termék neve *
                        </label>
                        <input
                          id="prod_name"
                          type="text"
                          placeholder="pl. Férfi Bőr Pénztárca (RFID)"
                          value={prodName}
                          onChange={(e) => setProdName(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="prod_specs"
                          className="text-[10px] uppercase font-bold text-slate-400"
                        >
                          Tulajdonságok / Kulcsszavak
                        </label>
                        <textarea
                          id="prod_specs"
                          rows={4}
                          placeholder="pl. valódi marhabőr, RFID védelemmel, fekete szín, 8 kártyahely, díszdobozban"
                          value={prodSpecs}
                          onChange={(e) => setProdSpecs(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-xs resize-none font-mono"
                          disabled={loading}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Review Assistant Form */}
                  {activeTool === "review_assistant" && (
                    <motion.div
                      key="review_assistant_form"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <label
                          htmlFor="customer_msg"
                          className="text-[10px] uppercase font-bold text-slate-400"
                        >
                          Vásárlói üzenet / Google vélemény *
                        </label>
                        <textarea
                          id="customer_msg"
                          rows={4}
                          placeholder="Másold be a kapott panaszlevelet vagy a Google/Facebook értékelés szövegét..."
                          value={customerMsg}
                          onChange={(e) => setCustomerMsg(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-xs resize-none font-mono"
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400">
                          Válasz hangneme
                        </label>
                        <select
                          value={tone}
                          onChange={(e) => setTone(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                          disabled={loading}
                        >
                          <option value="profi">
                            Profi, Megnyugtató és Segítőkész
                          </option>
                          <option value="hálás">
                            Lelkes, Hálás és Barátságos
                          </option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Social Matrix Form */}
                  {activeTool === "social_matrix" && (
                    <motion.div
                      key="social_matrix_form"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <label
                          htmlFor="campaign_theme"
                          className="text-[10px] uppercase font-bold text-slate-400"
                        >
                          Akció / Promóció témája *
                        </label>
                        <textarea
                          id="campaign_theme"
                          rows={5}
                          placeholder="pl. Tavaszi leárazás a táskákra, 20% kedvezmény minden termékre péntek éjfélig, kuponkód: SPRING20"
                          value={campaignTheme}
                          onChange={(e) => setCampaignTheme(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-xs resize-none font-mono"
                          required
                          disabled={loading}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Cart Recovery Form */}
                  {activeTool === "cart_recovery" && (
                    <motion.div
                      key="cart_recovery_form"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400">
                          Ajánlat / Ösztönző a kosárhoz
                        </label>
                        <select
                          value={offerType}
                          onChange={(e) => setOfferType(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                          disabled={loading}
                        >
                          <option value="free_shipping">
                            Ingyenes szállítás 24 órán belül
                          </option>
                          <option value="5_coupon">
                            5% extra kedvezmény kupon
                          </option>
                          <option value="10_coupon">
                            10% kuponkód limitált ideig
                          </option>
                        </select>
                      </div>
                      <div className="bg-transparent border border-gray-800/60 p-4 rounded-2xl text-[11px] text-slate-400 leading-relaxed font-mono">
                        💡 A kosárelhagyás a webáruházak egyik legfontosabb
                        kihívása. Ez az eszköz 3 különálló megközelítést
                        (pszichológiai nyomást) kínál a vásárlók
                        visszacsábításához.
                      </div>
                    </motion.div>
                  )}

                  {/* Midjourney Prompt Form */}
                  {activeTool === "midjourney_prompt" && (
                    <motion.div
                      key="midjourney_prompt_form"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <label
                          htmlFor="img_subject"
                          className="text-[10px] uppercase font-bold text-slate-400"
                        >
                          Kép tárgya / Koncepció *
                        </label>
                        <textarea
                          id="img_subject"
                          rows={3}
                          placeholder="pl. egy futurisztikus arany‑cyberpunk kávézó terasza, holografikus robot..."
                          value={imgSubject}
                          onChange={(e) => setImgSubject(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-xs resize-none font-mono"
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-slate-400">
                            Stílus
                          </label>
                          <select
                            value={imgStyle}
                            onChange={(e) => setImgStyle(e.target.value)}
                            className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                            disabled={loading}
                          >
                            <option value="cinematic">Cinematic (Fotó)</option>
                            <option value="photorealistic">
                              Fotórealisztikus
                            </option>
                            <option value="minimalist_vector">
                              Minimalista Vektor
                            </option>
                            <option value="3d_clay_render">
                              3D Agyag Render
                            </option>
                            <option value="isometric_illustration">
                              Izometrikus Illusztráció
                            </option>
                            <option value="retro_synthwave">
                              Retro Synthwave
                            </option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-slate-400">
                            Képarány (--ar)
                          </label>
                          <select
                            value={imgAspectRatio}
                            onChange={(e) => setImgAspectRatio(e.target.value)}
                            className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                            disabled={loading}
                          >
                            <option value="16:9">
                              16:9 (Fekvő TV/Monitor)
                            </option>
                            <option value="1:1">1:1 (Négyzetes poszt)</option>
                            <option value="9:16">
                              9:16 (Mobil Story/TikTok)
                            </option>
                            <option value="4:5">4:5 (Insta Feed)</option>
                            <option value="21:9">21:9 (Ultraszéles)</option>
                          </select>
                        </div>
                        <div className="space-y-1.5 lg:col-span-2">
                          <label className="text-[10px] uppercase font-bold text-slate-400">
                            Hangulat / Fények
                          </label>
                          <select
                            value={imgMood}
                            onChange={(e) => setImgMood(e.target.value)}
                            className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                            disabled={loading}
                          >
                            <option value="dramatic">
                              Drámai (Golden hour / Sötét árnyékok)
                            </option>
                            <option value="warm_cozy">
                              Meleg, otthonos (Lágy beltéri fények)
                            </option>
                            <option value="neon_cyberpunk">
                              Neon Cyberpunk (Kék/Rózsaszín fények)
                            </option>
                            <option value="bright_clean">
                              Tiszta, világos (Stúdió megvilágítás)
                            </option>
                            <option value="mysterious_foggy">
                              Misztikus (Ködös, szórt fények)
                            </option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Banner Concept Form */}
                  {activeTool === "banner_concept" && (
                    <motion.div
                      key="banner_concept_form"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <label
                          htmlFor="banner_topic"
                          className="text-[10px] uppercase font-bold text-slate-400"
                        >
                          Banner témája / Szolgáltatás / Akció *
                        </label>
                        <textarea
                          id="banner_topic"
                          rows={3}
                          placeholder="pl. 10% kedvezmény minden AI fejlesztési tanácsadásra a hétvégén a CYBER10 kóddal..."
                          value={bannerTopic}
                          onChange={(e) => setBannerTopic(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-xs resize-none font-mono"
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-slate-400">
                            Platform / Méret
                          </label>
                          <select
                            value={bannerPlatform}
                            onChange={(e) => setBannerPlatform(e.target.value)}
                            className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                            disabled={loading}
                          >
                            <option value="Facebook Cover">
                              Facebook borítókép
                            </option>
                            <option value="Instagram Post">
                              Instagram poszt
                            </option>
                            <option value="LinkedIn Banner">
                              LinkedIn banner
                            </option>
                            <option value="Blog Feature">
                              Weboldal / Blog kiemelt kép
                            </option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-slate-400">
                            Márka stílusa / Vibe
                          </label>
                          <select
                            value={bannerBrandVibe}
                            onChange={(e) => setBannerBrandVibe(e.target.value)}
                            className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                            disabled={loading}
                          >
                            <option value="cyber_gold">
                              Cyber-Gold (Fekete/Sötétkék/Arany)
                            </option>
                            <option value="clean_minimalist">
                              Letisztult Skandináv (Világos szürke/Fehér)
                            </option>
                            <option value="corporate_tech">
                              Vállalati Kék / Technológiai
                            </option>
                            <option value="vibrant_retro">
                              Neon Retro / Synthwave
                            </option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Logo Designer Form */}
                  {activeTool === "logo_designer" && (
                    <motion.div
                      key="logo_designer_form"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <label
                          htmlFor="logo_brand_name"
                          className="text-[10px] uppercase font-bold text-slate-400"
                        >
                          Márkanév / Cégnév *
                        </label>
                        <input
                          id="logo_brand_name"
                          type="text"
                          placeholder="pl. WebDude AI"
                          value={logoBrandName}
                          onChange={(e) => setLogoBrandName(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="logo_industry"
                          className="text-[10px] uppercase font-bold text-slate-400"
                        >
                          Iparág / Tevékenység *
                        </label>
                        <input
                          id="logo_industry"
                          type="text"
                          placeholder="pl. AI szoftverfejlesztés és automatizáció"
                          value={logoIndustry}
                          onChange={(e) => setLogoIndustry(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="logo_core_values"
                          className="text-[10px] uppercase font-bold text-slate-400"
                        >
                          Core értékek (vesszővel) *
                        </label>
                        <input
                          id="logo_core_values"
                          type="text"
                          placeholder="pl. innováció, precizitás, bizalom"
                          value={logoCoreValues}
                          onChange={(e) => setLogoCoreValues(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                          required
                          disabled={loading}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* UI/UX Designer Form */}
                  {activeTool === "ui_ux_designer" && (
                    <motion.div
                      key="ui_ux_designer_form"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400">
                          Célközönség *
                        </label>
                        <input
                          type="text"
                          placeholder="pl. kis- és középvállalkozások, akik automatizációt keresnek"
                          value={uiTargetAudience}
                          onChange={(e) => setUiTargetAudience(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400">
                          Oldaltípus *
                        </label>
                        <select
                          value={uiPageType}
                          onChange={(e) => setUiPageType(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                          disabled={loading}
                        >
                          <option value="Landing Page">Landing Page</option>
                          <option value="Checkout">Checkout</option>
                          <option value="Dashboard">Admin Dashboard</option>
                          <option value="Portfolio">Portfólió</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Seasonal Campaign Designer Form */}
                  {activeTool === "seasonal_campaign_designer" && (
                    <motion.div
                      key="seasonal_campaign_designer_form"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400">
                          Szezon / Ünnep *
                        </label>
                        <input
                          type="text"
                          placeholder="pl. Karácsony, Black Friday, Nyári akció"
                          value={campaignSeason}
                          onChange={(e) => setCampaignSeason(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-slate-400">
                          Termék / Szolgáltatás *
                        </label>
                        <input
                          type="text"
                          placeholder="pl. luxus óra, nyári ruha, digitális termék"
                          value={campaignProduct}
                          onChange={(e) => setCampaignProduct(e.target.value)}
                          className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors text-xs font-mono"
                          required
                          disabled={loading}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Output & Actions Column */}
              <div className="flex flex-col space-y-4">
                {/* Generated Text (typewriter) */}
                <div className="min-h-50 p-4 bg-transparent border border-bg-elevated/40 rounded-xl overflow-y-auto text-sm text-slate-300 font-mono">
                  {displayedText ||
                    (loading && (
                      <span className="animate-pulse text-slate-500">
                        Generálás...
                      </span>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-1 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 rounded-md text-sm font-medium transition-colors disabled:opacity-40"
                    onClick={handleGenerate}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    Generálás
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!fullContent}
                    className="flex items-center gap-1 px-3 py-2 bg-transparent hover:bg-transparent text-slate-400 rounded-md text-xs transition-colors disabled:opacity-40"
                  >
                    {copied ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    Másolás
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveNote}
                    disabled={saveLoading || !fullContent}
                    className="flex items-center gap-1 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500 rounded-md text-xs transition-colors disabled:opacity-40"
                  >
                    {saveLoading ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Save className="w-3 h-3" />
                    )}
                    Mentés
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1 px-3 py-2 bg-gray-600/20 hover:bg-gray-600/30 text-gray-400 rounded-md text-xs transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset
                  </button>
                </div>

                {/* Save Success Indicator */}
                {saveSuccess && (
                  <div className="flex items-center gap-2 text-emerald-500 text-sm">
                    <Check className="w-4 h-4" />
                    Jegyzet sikeresen elmentve!
                  </div>
                )}
              </div>
            </div>
          </>
        );
      })()}

      {/* History Section */}
      <div className="mt-8">
        <h4 className="text-sm font-bold text-amber-500 mb-2">
          Generáció Előzmények
        </h4>
        {historyLoading ? (
          <p className="text-slate-500 text-xs">Betöltés...</p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {generations.map((gen) => (
              <li
                key={gen.id}
                className="flex items-center justify-between bg-transparent p-2 rounded-md border border-bg-elevated/20"
              >
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-amber-500"
                    onClick={() => handleLoadFromHistory(gen)}
                  >
                    {tools[gen.toolId as ToolType]?.name || gen.toolId}
                  </Button>
                  <span className="text-xs text-slate-400">
                    {new Date(gen.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyHistoryText(gen.id, gen.outputText)
                    }
                    className={`text-xs ${copiedGenId === gen.id ? "text-emerald-500" : "text-slate-400"} hover:text-amber-500`}
                  >
                    {copiedGenId === gen.id ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteHistory(gen.id)}
                    className="text-xs text-red-500 hover:text-red-300"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
