"use client";

import { AnimatePresence, motion } from "motion/react";
import type {
  ClientAIToolFormValues,
  ToolType,
} from "@/lib/aiToolsRegistry";

interface AIToolsGraphicsFormsProps {
  activeTool: ToolType;
  values: ClientAIToolFormValues;
  loading: boolean;
  onChange: <K extends keyof ClientAIToolFormValues>(
    field: K,
    value: ClientAIToolFormValues[K]
  ) => void;
}

/**
 * A Grafika & Tervezés kategória 5 eszközének (`midjourney_prompt`,
 * `banner_concept`, `logo_designer`, `ui_ux_designer`,
 * `seasonal_campaign_designer`) input űrlapjai.
 */
export default function AIToolsGraphicsForms({
  activeTool,
  values,
  loading,
  onChange,
}: AIToolsGraphicsFormsProps) {
  return (
    <AnimatePresence mode="wait">
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
              placeholder="pl. futurisztikus kék-lila cyberpunk stúdió, holografikus interfész..."
              value={values.imgSubject}
              onChange={(e) => onChange("imgSubject", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-primary transition-colors text-xs resize-none font-mono"
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
                value={values.imgStyle}
                onChange={(e) => onChange("imgStyle", e.target.value)}
                className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
                disabled={loading}
              >
                <option value="cinematic">Cinematic (Fotó)</option>
                <option value="photorealistic">Fotórealisztikus</option>
                <option value="minimalist_vector">Minimalista Vektor</option>
                <option value="3d_clay_render">3D Agyag Render</option>
                <option value="isometric_illustration">
                  Izometrikus Illusztráció
                </option>
                <option value="retro_synthwave">Retro Synthwave</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-400">
                Képarány (--ar)
              </label>
              <select
                value={values.imgAspectRatio}
                onChange={(e) => onChange("imgAspectRatio", e.target.value)}
                className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
                disabled={loading}
              >
                <option value="16:9">16:9 (Fekvő TV/Monitor)</option>
                <option value="1:1">1:1 (Négyzetes poszt)</option>
                <option value="9:16">9:16 (Mobil Story/TikTok)</option>
                <option value="4:5">4:5 (Insta Feed)</option>
                <option value="21:9">21:9 (Ultraszéles)</option>
              </select>
            </div>
            <div className="space-y-1.5 lg:col-span-2">
              <label className="text-[10px] uppercase font-bold text-slate-400">
                Hangulat / Fények
              </label>
              <select
                value={values.imgMood}
                onChange={(e) => onChange("imgMood", e.target.value)}
                className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
                disabled={loading}
              >
                <option value="dramatic">
                  Drámai (Mély kontraszt / Sötét árnyékok)
                </option>
                <option value="warm_cozy">
                  Meleg, otthonos (Lágy beltéri fények)
                </option>
                <option value="neon_cyberpunk">
                  Neon Cyberpunk (Cián/Viola élfények)
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
              value={values.bannerTopic}
              onChange={(e) => onChange("bannerTopic", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-primary transition-colors text-xs resize-none font-mono"
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
                value={values.bannerPlatform}
                onChange={(e) => onChange("bannerPlatform", e.target.value)}
                className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
                disabled={loading}
              >
                <option value="Facebook Cover">Facebook borítókép</option>
                <option value="Instagram Post">Instagram poszt</option>
                <option value="LinkedIn Banner">LinkedIn banner</option>
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
                value={values.bannerBrandVibe}
                onChange={(e) => onChange("bannerBrandVibe", e.target.value)}
                className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
                disabled={loading}
              >
                <option value="cyber_gold">
                  Kék-Lila v7.0 (Cyber-Dark / Electric Cyan & Violet)
                </option>
                <option value="clean_minimalist">
                  Letisztult Skandináv (Világos szürke/Fehér)
                </option>
                <option value="corporate_tech">
                  Vállalati Kék / Technológiai
                </option>
                <option value="vibrant_retro">Neon Retro / Synthwave</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

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
              value={values.logoBrandName}
              onChange={(e) => onChange("logoBrandName", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
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
              value={values.logoIndustry}
              onChange={(e) => onChange("logoIndustry", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
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
              value={values.logoCoreValues}
              onChange={(e) => onChange("logoCoreValues", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
              required
              disabled={loading}
            />
          </div>
        </motion.div>
      )}

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
              value={values.uiTargetAudience}
              onChange={(e) => onChange("uiTargetAudience", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400">
              Oldaltípus *
            </label>
            <select
              value={values.uiPageType}
              onChange={(e) => onChange("uiPageType", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
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
              value={values.campaignSeason}
              onChange={(e) => onChange("campaignSeason", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
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
              value={values.campaignProduct}
              onChange={(e) => onChange("campaignProduct", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
              required
              disabled={loading}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
