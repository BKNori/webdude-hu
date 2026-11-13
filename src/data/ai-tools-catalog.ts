/**
 * AI eszköz/generátor katalógus — Single Source of Truth.
 *
 * Az `id` mezők a `users/{uid}.allowedTools` Firestore tömb értékei.
 * A Szuperadmin (`hello@webdude.hu` / `role === "admin"`) ezektől
 * függetlenül 100% bypass hozzáféréssel rendelkezik.
 *
 * Használat: `/admin/portal-kezelo` jogosultság-panel checkboxai,
 * AdminPanel eszközlista, dokumentáció.
 */
export interface AiToolOption {
  id: string;
  name: string;
}

export const AI_TOOL_CATALOG: AiToolOption[] = [
  // --- ClientAITools / SingleAITool (általános AI tartalom eszközök) ---
  { id: "product_desc", name: "Termékleírás & AEO" },
  { id: "review_assistant", name: "Ügyfélszolgálati Válasz" },
  { id: "social_matrix", name: "Kampány Mátrix" },
  { id: "cart_recovery", name: "Kosárelhagyó Email" },
  { id: "midjourney_prompt", name: "Midjourney v6 Master" },
  { id: "banner_concept", name: "Banner & Ad Tervező" },
  { id: "logo_designer", name: "Logo & Brand Szimbólum" },
  { id: "ui_ux_designer", name: "UI/UX Wireframe" },
  { id: "seasonal_campaign_designer", name: "Szezonális Vizuál" },
  { id: "kristofka_workflow", name: "Kristófka Munkafolyamat" },
  // --- Workshop generátorok (portal/ai-muhely/*) ---
  { id: "banner_ai_muhely", name: "Banner AI Műhely" },
  { id: "logo_ai_muhely", name: "Logó AI Műhely" },
  { id: "flyer_ai_muhely", name: "Szórólap AI Műhely" },
  { id: "packaging_ai_muhely", name: "Csomagolás AI Műhely" },
  { id: "project_scope_ai_muhely", name: "Projekttervező AI Műhely" },
  { id: "signage_ai_muhely", name: "Dekor/Jelzés AI Műhely" },
  { id: "cip_ai_muhely", name: "CIP AI Műhely" },
  { id: "content_workshop_ai_muhely", name: "Tartalom AI Műhely" },
  { id: "design_system_ai_muhely", name: "Design System AI Műhely" },
  { id: "icon_design_ai_muhely", name: "Icon Design AI Műhely" },
  { id: "midjourney_ai_muhely", name: "Midjourney AI Műhely" },
  { id: "poster_ai_muhely", name: "Poster AI Műhely" },
  { id: "presentation_ai_muhely", name: "Presentation AI Műhely" },
  { id: "seasonal_workshop_ai_muhely", name: "Szezonális Műhely" },
  { id: "seo_audit_ai_muhely", name: "SEO Audit AI Műhely" },
  { id: "social_media_ai_muhely", name: "Social Media AI Műhely" },
  { id: "uiux_workshop_ai_muhely", name: "UI/UX Műhely" },
  { id: "szezonalis_ai_muhely", name: "Szezonális AI Műhely" },
  { id: "tartalomtervezo_ai_muhely", name: "Tartalomtervező AI Műhely" },
  { id: "ui_ux_ai_muhely", name: "UI/UX AI Műhely" },
  { id: "versenytars_elemzo_ai_muhely", name: "Versenytárs Elemző AI Műhely" },
  // --- Külön jog (prompt sablonok) ---
  { id: "prompt_templates", name: "AI Prompt Sablonok (hasPromptAccess)" },
];

/** Gyors ellenőrzés: az adott toolId szerepel-e a katalógusban. */
export function isKnownAiTool(toolId: string): boolean {
  return AI_TOOL_CATALOG.some((tool) => tool.id === toolId);
}
