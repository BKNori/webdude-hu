import type { ComponentType } from "react";
import {
  Sparkles,
  FileText,
  MessageSquare,
  Share2,
  ShoppingCart,
  Layout,
  Palette,
  Laptop,
  Calendar,
  Lock,
} from "lucide-react";

// ---------- Tool & Category Types ----------
export type ToolCategory = "marketing" | "graphics" | "strategist";

export type ToolType =
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

export interface ToolConfig {
  name: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
}

export interface ClientAIToolFormValues {
  // Marketing
  prodName: string;
  prodSpecs: string;
  customerMsg: string;
  tone: string;
  campaignTheme: string;
  offerType: string;
  // Graphics
  imgSubject: string;
  imgStyle: string;
  imgAspectRatio: string;
  imgMood: string;
  bannerTopic: string;
  bannerPlatform: string;
  bannerBrandVibe: string;
  logoBrandName: string;
  logoIndustry: string;
  logoCoreValues: string;
  uiTargetAudience: string;
  uiPageType: string;
  campaignSeason: string;
  campaignProduct: string;
}

export const DEFAULT_AI_TOOL_FORM_VALUES: ClientAIToolFormValues = {
  prodName: "",
  prodSpecs: "",
  customerMsg: "",
  tone: "profi",
  campaignTheme: "",
  offerType: "free_shipping",
  imgSubject: "",
  imgStyle: "cinematic",
  imgAspectRatio: "16:9",
  imgMood: "dramatic",
  bannerTopic: "",
  bannerPlatform: "Facebook Cover",
  bannerBrandVibe: "cyber_gold",
  logoBrandName: "",
  logoIndustry: "",
  logoCoreValues: "",
  uiTargetAudience: "",
  uiPageType: "Landing Page",
  campaignSeason: "Black Friday",
  campaignProduct: "",
};

// ---------- Tool Registry ----------
export const tools: Record<ToolType, ToolConfig> = {
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

export const marketingTools: ToolType[] = [
  "product_desc",
  "review_assistant",
  "social_matrix",
  "cart_recovery",
];

export const graphicsTools: ToolType[] = [
  "midjourney_prompt",
  "banner_concept",
  "logo_designer",
  "ui_ux_designer",
  "seasonal_campaign_designer",
];

export const strategistTools: ToolType[] = ["kristofka_workflow"];

// ---------- Pre‑defined Templates for Graphics ----------
export interface TemplateDef {
  name: string;
  values: Record<string, string>;
}

export const graphicsTemplates: Record<ToolType, TemplateDef[]> = {
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

// ---------- Pure Payload & Title Builders ----------
export function buildToolInputs(
  activeTool: ToolType,
  v: ClientAIToolFormValues
): Record<string, string> {
  switch (activeTool) {
    case "product_desc":
      return { prodName: v.prodName, prodSpecs: v.prodSpecs };
    case "review_assistant":
      return { customerMsg: v.customerMsg, tone: v.tone };
    case "social_matrix":
      return { campaignTheme: v.campaignTheme };
    case "cart_recovery":
      return { offerType: v.offerType };
    case "midjourney_prompt":
      return {
        imgSubject: v.imgSubject,
        imgStyle: v.imgStyle,
        imgAspectRatio: v.imgAspectRatio,
        imgMood: v.imgMood,
      };
    case "banner_concept":
      return {
        bannerTopic: v.bannerTopic,
        bannerPlatform: v.bannerPlatform,
        bannerBrandVibe: v.bannerBrandVibe,
      };
    case "logo_designer":
      return {
        logoBrandName: v.logoBrandName,
        logoIndustry: v.logoIndustry,
        logoCoreValues: v.logoCoreValues,
      };
    case "ui_ux_designer":
      return {
        uiTargetAudience: v.uiTargetAudience,
        uiPageType: v.uiPageType,
      };
    case "seasonal_campaign_designer":
      return {
        campaignSeason: v.campaignSeason,
        campaignProduct: v.campaignProduct,
      };
    default:
      return {};
  }
}

export function buildNoteTitle(
  activeTool: ToolType,
  v: ClientAIToolFormValues
): string {
  switch (activeTool) {
    case "product_desc":
      return `Termékleírás: ${v.prodName || "Névtelen"}`;
    case "review_assistant":
      return `Ügyfélszolgálati válasz: ${v.customerMsg.slice(0, 15)}...`;
    case "social_matrix":
      return `Kampány: ${v.campaignTheme.slice(0, 15)}...`;
    case "cart_recovery": {
      const label =
        v.offerType === "free_shipping"
          ? "Ingyenes szállítás"
          : v.offerType === "5_coupon"
            ? "5% kupon"
            : "10% kupon";
      return `Kosárelhagyás: ${label}`;
    }
    case "midjourney_prompt":
      return `Midjourney: ${v.imgSubject.slice(0, 15)}...`;
    case "banner_concept":
      return `Banner: ${v.bannerTopic.slice(0, 15)}...`;
    case "logo_designer":
      return `Logo: ${v.logoBrandName || "Névtelen"}`;
    case "ui_ux_designer":
      return `UI/UX: ${v.uiPageType}`;
    case "seasonal_campaign_designer":
      return `Szezonális: ${v.campaignSeason}`;
    default:
      return "AI Jegyzet";
  }
}
