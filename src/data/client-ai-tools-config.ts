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
