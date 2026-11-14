"use client";

import { AnimatePresence, motion } from "motion/react";
import type {
  ClientAIToolFormValues,
  ToolType,
} from "@/lib/aiToolsRegistry";

interface AIToolsMarketingFormsProps {
  activeTool: ToolType;
  values: ClientAIToolFormValues;
  loading: boolean;
  onChange: <K extends keyof ClientAIToolFormValues>(
    field: K,
    value: ClientAIToolFormValues[K]
  ) => void;
}

/**
 * A Marketing & Szövegírás kategória 4 eszközének (`product_desc`,
 * `review_assistant`, `social_matrix`, `cart_recovery`) input űrlapjai.
 */
export default function AIToolsMarketingForms({
  activeTool,
  values,
  loading,
  onChange,
}: AIToolsMarketingFormsProps) {
  return (
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
              value={values.prodName}
              onChange={(e) => onChange("prodName", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
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
              value={values.prodSpecs}
              onChange={(e) => onChange("prodSpecs", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-primary transition-colors text-xs resize-none font-mono"
              disabled={loading}
            />
          </div>
        </motion.div>
      )}

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
              value={values.customerMsg}
              onChange={(e) => onChange("customerMsg", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-primary transition-colors text-xs resize-none font-mono"
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-slate-400">
              Válasz hangneme
            </label>
            <select
              value={values.tone}
              onChange={(e) => onChange("tone", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
              disabled={loading}
            >
              <option value="profi">Profi, Megnyugtató és Segítőkész</option>
              <option value="hálás">Lelkes, Hálás és Barátságos</option>
            </select>
          </div>
        </motion.div>
      )}

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
              value={values.campaignTheme}
              onChange={(e) => onChange("campaignTheme", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-primary transition-colors text-xs resize-none font-mono"
              required
              disabled={loading}
            />
          </div>
        </motion.div>
      )}

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
              value={values.offerType}
              onChange={(e) => onChange("offerType", e.target.value)}
              className="w-full bg-transparent border border-bg-elevated/80 rounded-xl px-4 py-2.5 text-slate-200 focus:outline-none focus:border-brand-primary transition-colors text-xs font-mono"
              disabled={loading}
            >
              <option value="free_shipping">
                Ingyenes szállítás 24 órán belül
              </option>
              <option value="5_coupon">5% extra kedvezmény kupon</option>
              <option value="10_coupon">10% kuponkód limitált ideig</option>
            </select>
          </div>
          <div className="bg-transparent border border-slate-800/60 p-4 rounded-2xl text-[11px] text-slate-400 leading-relaxed font-mono">
            💡 A kosárelhagyás a webáruházak egyik legfontosabb kihívása. Ez az
            eszköz 3 különálló megközelítést (pszichológiai nyomást) kínál a
            vásárlók visszacsábításához.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
