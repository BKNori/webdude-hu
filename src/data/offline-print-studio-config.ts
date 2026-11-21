import { buildVisualPrompt } from "@/lib/prompt-engine/builders";
import { ANTI_AI_SLOP_NEGATIVE_CHIPS } from "@/lib/prompt-engine/presets";
import type { CompiledPromptResult, VisualTargetEngine } from "@/lib/prompt-engine/types";

export type PrintOutputMode = "2d-print-artwork" | "3d-print-mockup";
export type PrintProductFormatId =
  | "business-card"
  | "flyer-leaflet"
  | "folded-brochure"
  | "catalog-magazine"
  | "poster-citylight"
  | "packaging-dieline"
  | "product-bottle-label"
  | "rollup-banner"
  | "large-format-lfp"
  | "menu-invitation-cert";
export type PrintColorProfileId = "fogra39" | "fogra51" | "fogra52" | "lfp-cmyk";
export type PrintScaleId = "1:1-300dpi" | "1:1-150dpi" | "1:10-1200dpi";
export type ViewingDistanceId = "handheld" | "indoor" | "outdoor";

export interface PrintProductFormatSpec {
  id: PrintProductFormatId;
  label: string;
  aspectRatio: string;
  defaultTrimMm: string;
  defaultBleedMm: string;
  defaultSafeZoneMm: string;
  defaultScale: PrintScaleId;
  structuralHint: string;
  noteHu: string;
  isWarning?: boolean;
}

export interface PrintColorProfileSpec {
  id: PrintColorProfileId;
  label: string;
  tacLimit: string;
  promptHint: string;
}

export interface PrintOptionItem<TId extends string = string> {
  id: TId;
  label: string;
  promptHint: string;
  colors?: string[];
}

export interface OfflinePrintStudioState {
  outputMode: PrintOutputMode;
  engine: Extract<VisualTargetEngine, "midjourney-v7" | "flux-1-1-pro" | "ideogram-3" | "recraft-v3-svg">;
  subject: string;
  brandName: string;
  exactTextToRender: string;
  productFormat: PrintProductFormatId;
  trimSizeMm: string;
  bleedMm: string;
  safeZoneMm: string;
  scaleId: PrintScaleId;
  viewingDistance: ViewingDistanceId;
  colorProfile: PrintColorProfileId;
  richBlackLargeAreas: boolean;
  overprintSmallBlackText: boolean;
  spotLayers: string[];
  substrate: string;
  finishing: string[];
  visualStyle: string;
  copySpaceNote: string;
  paletteLockId: string;
  customHexColors: string;
  stylize: number;
  styleRaw: boolean;
  maxVectorColors: number;
  negativeChipIds: string[];
  customNegative: string;
}

export const PRINT_PRODUCT_FORMATS: readonly PrintProductFormatSpec[] = [
  { id: "business-card", label: "Névjegykártya (90×50 / 85×55 mm)", aspectRatio: "16:9", defaultTrimMm: "90×50 mm", defaultBleedMm: "3 mm", defaultSafeZoneMm: "5 mm", defaultScale: "1:1-300dpi", structuralHint: "90x50mm corporate business card geometry, 3mm bleed, 5mm inner safe zone", noteHu: "Névjegy: 90×50 mm vágott méret, +3 mm kifutó minden oldalon, 300 DPI." },
  { id: "flyer-leaflet", label: "Szórólap (A5 / A6 / DL)", aspectRatio: "4:5", defaultTrimMm: "148×210 mm (A5)", defaultBleedMm: "3 mm", defaultSafeZoneMm: "5 mm", defaultScale: "1:1-300dpi", structuralHint: "A5 148x210mm commercial print flyer layout, 3mm bleed, 5mm safe margin", noteHu: "Szórólap: A5/A6/DL vágott méret, 3 mm kifutó, 5 mm belső margó." },
  { id: "folded-brochure", label: "Leporelló / Göngyölt (A4→LA4)", aspectRatio: "16:9", defaultTrimMm: "297×210 mm (97-100-100 mm)", defaultBleedMm: "3 mm", defaultSafeZoneMm: "8 mm", defaultScale: "1:1-300dpi", structuralHint: "A4 to LA4 tri-fold brochure panel mechanics (97-100-100mm panels with 97mm wrap-in flap, Z-fold 99-99-99mm), mandatory creasing/scoring above 150gsm, 8mm fold-line safe zone", noteHu: "Göngyölt hajtás: 97-100-100 mm panelmechanika (97 mm behajló fül), 150g felett kötelező bígelés!", isWarning: true },
  { id: "catalog-magazine", label: "Katalógus / Magazin (A4 PUR / Irka)", aspectRatio: "4:5", defaultTrimMm: "210×297 mm + gerinc", defaultBleedMm: "3–5 mm", defaultSafeZoneMm: "10 mm", defaultScale: "1:1-300dpi", structuralHint: "A4 multi-page editorial catalog cover & spread layout, PUR perfect-bound spine allowance & 10mm inner gutter creep compensation", noteHu: "Katalógus: PUR ragasztókötésnél számolj gerincvastagsággal és 10 mm belső kötésmargóval." },
  { id: "poster-citylight", label: "Plakát / Citylight (A3–B1 / CLP)", aspectRatio: "4:5", defaultTrimMm: "700×1000 mm (B1)", defaultBleedMm: "5 mm", defaultSafeZoneMm: "15 mm", defaultScale: "1:1-150dpi", structuralHint: "Large poster / 1185x1750mm backlit citylight poster hierarchy, high distance legibility, 5mm bleed", noteHu: "Plakát / CLP: B1 (700×1000 mm) vagy Citylight (1185×1750 mm), 5 mm kifutó, távolsági fókusz." },
  { id: "packaging-dieline", label: "Csomagolás & Stancrajz (FEFCO)", aspectRatio: "1:1", defaultTrimMm: "FEFCO 0201 / 0427 / Carton", defaultBleedMm: "3–5 mm", defaultSafeZoneMm: "5 mm", defaultScale: "1:1-300dpi", structuralHint: "Packaging structural dieline & folding carton artwork (FEFCO 0201/0427 / tuck-end box / doypack), CutContour trim, Crease fold lines, glue flap kept ink-free, EAN-13 barcode quiet zone with BWR", noteHu: "Csomagolás: ragasztófület hagyd festékmentesen; CutContour + Crease + EAN-13 BWR.", isWarning: true },
  { id: "product-bottle-label", label: "Termék- & Palackcímke (Stanc)", aspectRatio: "4:5", defaultTrimMm: "80×120 mm tekercses", defaultBleedMm: "2–3 mm", defaultSafeZoneMm: "4 mm", defaultScale: "1:1-300dpi", structuralHint: "Roll-fed die-cut product & bottle label artwork, 2.5mm bleed, precision CutContour vector path and White_Ink underbase layer", noteHu: "Tekercses/íves címke: 2–3 mm kifutó, zárt CutContour + átlátszó fólián fehér alányomás." },
  { id: "rollup-banner", label: "Roll-up Banner (850×2000 mm)", aspectRatio: "9:16", defaultTrimMm: "850×2000 mm (+150 mm)", defaultBleedMm: "5 mm", defaultSafeZoneMm: "20 mm", defaultScale: "1:10-1200dpi", structuralHint: "850x2000mm retractable roll-up banner layout: mandatory 150mm bottom cassette bleed/dead-zone kept free of text or logos, eye-level headline at 1400-1700mm height", noteHu: "FIGYELEM: Roll-upnál az alsó 150 mm a kazettába tekeredik (holttér) — szöveg nem kerülhet oda!", isWarning: true },
  { id: "large-format-lfp", label: "Nagyformátumú LFP (Molinó / OWV / Wrap)", aspectRatio: "16:9", defaultTrimMm: "3000×1000 mm (1:10 skála)", defaultBleedMm: "10–20 mm", defaultSafeZoneMm: "40 mm", defaultScale: "1:10-1200dpi", structuralHint: "Large-format LFP banner / OWV perforated window film / cast vinyl vehicle wrap, 40mm perimeter hem & grommet reinforcement zone kept clear of typography", noteHu: "LFP / Molinó: 40 mm szélső visszahajtás és ringlizési zóna maradjon szövegmentes!" },
  { id: "menu-invitation-cert", label: "Étlap / Meghívó / Oklevél", aspectRatio: "4:5", defaultTrimMm: "210×297 mm (A4 kreatív)", defaultBleedMm: "3 mm", defaultSafeZoneMm: "8 mm", defaultScale: "1:1-300dpi", structuralHint: "Fine dining menu & luxury certificate print layout on textured cotton stock with silver/holographic foil stamping and blind deboss accents", noteHu: "Kreatív papíros kiadvány: 8 mm belső margó, vakdombor és ezüst/holografikus prégelési fókusz." },
];

export const PRINT_COLOR_PROFILES: readonly PrintColorProfileSpec[] = [
  { id: "fogra39", label: "ISO Coated v2 (FOGRA39 — Mázolt)", tacLimit: "300–320%", promptHint: "CMYK print color profile ISO Coated v2 (FOGRA39), max Total Area Coverage TAC 320%" },
  { id: "fogra51", label: "PSO Coated v3 (FOGRA51 — Modern Mázolt)", tacLimit: "300%", promptHint: "CMYK print color profile PSO Coated v3 (FOGRA51), max TAC 300%" },
  { id: "fogra52", label: "PSO Uncoated v3 (FOGRA52 — Mázolatlan/Kraft)", tacLimit: "260%", promptHint: "CMYK uncoated color profile PSO Uncoated v3 (FOGRA52), strict max TAC 260% to prevent ink smudging" },
  { id: "lfp-cmyk", label: "LFP CMYK / UV-Latex (Nagyformátum)", tacLimit: "280%", promptHint: "Wide-format LFP UV/Eco-Solvent CMYK profile, weather-resistant high-contrast gamut, TAC 280%" },
];

export const PRINT_SPOT_LAYERS: readonly PrintOptionItem[] = [
  { id: "pantone-spot", label: "Pantone Spot", promptHint: "dedicated Pantone PMS solid spot ink separation" },
  { id: "cut-contour", label: "CutContour (100% Magenta)", promptHint: "100% Magenta vector CutContour die-line stroke" },
  { id: "crease-line", label: "Crease / Bígelés (100% Cyan)", promptHint: "100% Cyan dashed Crease folding score line" },
  { id: "spot-uv", label: "Spot_UV (Szelektív UV-lakk)", promptHint: "high-gloss selective 3D Spot_UV varnish contrast over matte base" },
  { id: "foil-stamp", label: "Foil_Stamp (Ezüst / Holografikus / Cián)", promptHint: "metallic silver, holographic, or electric-blue hot foil stamping specular reflection" },
  { id: "white-ink", label: "White_Ink (Fehér alányomás)", promptHint: "opaque White_Ink underbase layer on dark or transparent substrate" },
  { id: "emboss-deboss", label: "Emboss / Deboss (Vakdombor)", promptHint: "tactile multi-level blind emboss and deboss relief shadows" },
];

export const PRINT_SUBSTRATE_OPTIONS: readonly PrintOptionItem[] = [
  { id: "coated-170g", label: "135–170g Műnyomó", promptHint: "170gsm silk-matte coated art paper" },
  { id: "card-350g", label: "250–350g Matt Karton", promptHint: "heavyweight 350gsm premium matte card stock" },
  { id: "creative-cotton", label: "300g Strukturált Kreatív", promptHint: "300gsm textured cotton rag fine art paper" },
  { id: "kraft-recycled", label: "250–300g Kraft / Újrahasznosított", promptHint: "280gsm unbleached natural kraft fiber board" },
  { id: "gc1-carton", label: "GC1 Dobozkarton / Hullámkarton", promptHint: "structural GC1 folding boxboard / E-flute corrugated carton" },
  { id: "lfp-vinyl-pvc", label: "PVC Molinó / OWV / Cast Vinyl", promptHint: "heavy-duty 510gsm blockout PVC banner / cast wrap vinyl" },
];

export const PRINT_FINISHING_OPTIONS: readonly PrintOptionItem[] = [
  { id: "matte-lam", label: "Matt Fólia", promptHint: "anti-glare smooth matte lamination" },
  { id: "soft-touch", label: "Soft-Touch Bársonyfólia", promptHint: "velvety soft-touch tactile lamination" },
  { id: "spot-3d-uv", label: "Szelektív 3D UV-Lakk", promptHint: "raised tactile 3D selective UV varnish highlights" },
  { id: "silver-holo-foil", label: "Ezüst / Cián Fémfólia Prégelés", promptHint: "precision silver and cyan metallic hot-foil stamping" },
  { id: "blind-deboss", label: "Vakdombor", promptHint: "crisp blind debossed sculptural indentation" },
  { id: "uv-diecut", label: "Kültéri UV Laminálás / Stancolás", promptHint: "weatherproof UV protective laminate and precision contour die-cutting" },
];

export const PRINT_SCALE_OPTIONS: readonly PrintOptionItem<PrintScaleId>[] = [
  { id: "1:1-300dpi", label: "1:1 — 300 DPI (Íves Ofszet/Digitál)", promptHint: "1:1 print scale at 300 DPI optical crispness" },
  { id: "1:1-150dpi", label: "1:1 — 150 DPI (Plakát / Roll-up)", promptHint: "1:1 wide-format print scale at 150 DPI" },
  { id: "1:10-1200dpi", label: "1:10 — 720–1200 DPI (Molinó / Autódekor)", promptHint: "1:10 engineering scale at 1200 DPI (effective 120 DPI full-size)" },
];

export const PRINT_VIEWING_DISTANCES: readonly PrintOptionItem<ViewingDistanceId>[] = [
  { id: "handheld", label: "Kézben (0.3–1 m · min. 7–9 pt)", promptHint: "handheld 0.3-1m viewing distance, razor-sharp micro-typography (min 7-9pt body)" },
  { id: "indoor", label: "Beltéri (1–5 m · min. 25–40 mm betű)", promptHint: "indoor 1-5m viewing distance, bold headline hierarchy (min 25-40mm cap height)" },
  { id: "outdoor", label: "Utcai / Kültéri (5–30 m · min. 80–150 mm betű)", promptHint: "outdoor 5-30m billboard legibility, ultra-bold high-contrast lettering (min 80-150mm cap height)" },
];

export const PRINT_PALETTE_LOCKS: readonly PrintOptionItem[] = [
  { id: "webdude-cmyk-blue-violet", label: "WebDude Kék-Lila Prepress (0% Arany)", promptHint: "CMYK-safe WebDude cyan #00B5F1, royal violet #5B21B6, rich black #0B1120; strictly NO gold, amber, or yellow", colors: ["#00B5F1", "#7C3AED", "#0B1120"] },
  { id: "swiss-mono-print", label: "Svájci Monokróm + Ezüst", promptHint: "high-contrast carbon black, pure paper white, and metallic silver PMS 877 accent", colors: ["#0F172A", "#94A3B8", "#F8FAFC"] },
  { id: "eco-emerald-kraft", label: "Smaragd & Antracit", promptHint: "forest emerald #10B981, deep slate #0F172A, crisp white ink", colors: ["#10B981", "#0F172A", "#FFFFFF"] },
  { id: "custom-hex", label: "Saját HEX / Pantone", promptHint: "" },
];

export const DEFAULT_OFFLINE_PRINT_STATE: OfflinePrintStudioState = {
  outputMode: "2d-print-artwork",
  engine: "flux-1-1-pro",
  subject: "Architectural B2B corporate tri-fold brochure layout with geometric data infographics and clean Swiss grid hierarchy",
  brandName: "WebDude Prepress Studio",
  exactTextToRender: "",
  productFormat: "folded-brochure",
  trimSizeMm: "297×210 mm (97-100-100 mm)",
  bleedMm: "3 mm",
  safeZoneMm: "8 mm",
  scaleId: "1:1-300dpi",
  viewingDistance: "handheld",
  colorProfile: "fogra39",
  richBlackLargeAreas: true,
  overprintSmallBlackText: true,
  spotLayers: ["crease-line", "spot-uv"],
  substrate: "coated-170g",
  finishing: ["matte-lam", "spot-3d-uv"],
  visualStyle: "Swiss Minimalist Grid, clean prepress editorial hierarchy",
  copySpaceNote: "Keep 8mm safety margin from all trim and fold lines; structured 3-panel column grid",
  paletteLockId: "webdude-cmyk-blue-violet",
  customHexColors: "#00B5F1, #7C3AED, #0B1120",
  stylize: 150,
  styleRaw: true,
  maxVectorColors: 4,
  negativeChipIds: ["no-fake-text", "no-clutter-artifacts"],
  customNegative: "gold, amber, yellow, RGB neon out-of-gamut clipping",
};

export interface OfflinePrintPreset {
  id: string;
  title: string;
  badge: string;
  state: Partial<OfflinePrintStudioState>;
}

export const OFFLINE_PRINT_PRESETS: readonly OfflinePrintPreset[] = [
  { id: "b2b-trifold-brochure", title: "B2B Göngyölt Prospektus (A4→LA4 97-100-100 mm, 170g Matt)", badge: "2D Prepress", state: { ...DEFAULT_OFFLINE_PRINT_STATE } },
  { id: "premium-business-card", title: "Prémium Névjegykártya (90×50 mm, 350g Soft-Touch + Spot UV + Ezüst)", badge: "3D Mockup", state: { outputMode: "3d-print-mockup", engine: "flux-1-1-pro", productFormat: "business-card", trimSizeMm: "90×50 mm", bleedMm: "3 mm", safeZoneMm: "5 mm", substrate: "card-350g", finishing: ["soft-touch", "spot-3d-uv", "silver-holo-foil"], spotLayers: ["spot-uv", "foil-stamp"], subject: "Minimalist executive business card stack on dark slate with selective 3D UV gloss and metallic silver foil monogram" } },
  { id: "cosmetic-packaging-dieline", title: "Termék Csomagolás & Stancrajz (FEFCO / Folding Carton + Cut/Crease)", badge: "Csomagolás", state: { outputMode: "2d-print-artwork", engine: "recraft-v3-svg", productFormat: "packaging-dieline", trimSizeMm: "FEFCO 0427 / Carton", bleedMm: "3–5 mm", safeZoneMm: "5 mm", substrate: "gc1-carton", spotLayers: ["cut-contour", "crease-line", "spot-uv"], maxVectorColors: 4, subject: "Flat structural folding carton packaging dieline with crisp front hero panel, glue-free flap, and barcode quiet zone" } },
  { id: "exhibition-rollup-lfp", title: "Kiállítási Roll-up & LFP (850×2000 mm + 150 mm holttér, 1:10)", badge: "Roll-up LFP", state: { outputMode: "2d-print-artwork", engine: "midjourney-v7", productFormat: "rollup-banner", trimSizeMm: "850×2000 mm (+150 mm)", bleedMm: "5 mm", safeZoneMm: "20 mm", scaleId: "1:10-1200dpi", viewingDistance: "indoor", colorProfile: "lfp-cmyk", substrate: "lfp-vinyl-pvc", subject: "High-impact conference roll-up banner artwork with top eye-level focal graphic and clean 150mm bottom cassette zone" } },
  { id: "outdoor-b1-citylight", title: "Kültéri B1 / Citylight Plakát (700×1000 mm, távolsági kontraszt)", badge: "Ideogram 3.0", state: { outputMode: "2d-print-artwork", engine: "ideogram-3", productFormat: "poster-citylight", trimSizeMm: "700×1000 mm (B1)", bleedMm: "5 mm", safeZoneMm: "15 mm", scaleId: "1:1-150dpi", viewingDistance: "outdoor", exactTextToRender: "NEXT-GEN AI STUDIO", subject: "Bold high-contrast B1 street poster with geometric focal emblem and instant 15-meter readability" } },
  { id: "catalog-gastro-menu", title: "Prémium Katalógus / Gasztro Étlap (A4 PUR gerincvastagsággal)", badge: "3D Editorial", state: { outputMode: "3d-print-mockup", engine: "flux-1-1-pro", productFormat: "catalog-magazine", trimSizeMm: "210×297 mm + 8 mm PUR gerinc", bleedMm: "5 mm", safeZoneMm: "10 mm", colorProfile: "fogra52", substrate: "creative-cotton", finishing: ["blind-deboss", "silver-holo-foil"], spotLayers: ["emboss-deboss", "foil-stamp"], subject: "Open A4 PUR perfect-bound editorial catalog and fine dining menu on textured cotton paper with blind debossed cover" } },
];

function findHint<T extends string>(list: readonly PrintOptionItem<T>[], id: string): string {
  return list.find((i) => i.id === id)?.promptHint ?? "";
}

/** Másolható magyar nyomdai műszaki adatlap (PDF/X-4 prepress specifikáció). */
export function buildPrepressSpecSummary(state: OfflinePrintStudioState): string {
  const fmt = PRINT_PRODUCT_FORMATS.find((f) => f.id === state.productFormat) ?? PRINT_PRODUCT_FORMATS[0];
  const icc = PRINT_COLOR_PROFILES.find((c) => c.id === state.colorProfile) ?? PRINT_COLOR_PROFILES[0];
  const scale = PRINT_SCALE_OPTIONS.find((s) => s.id === state.scaleId) ?? PRINT_SCALE_OPTIONS[0];
  const sub = PRINT_SUBSTRATE_OPTIONS.find((s) => s.id === state.substrate)?.label ?? state.substrate;
  const finishes = state.finishing.map((id) => PRINT_FINISHING_OPTIONS.find((f) => f.id === id)?.label ?? id).join(", ") || "Alap kivitel";
  const spots = state.spotLayers.map((id) => PRINT_SPOT_LAYERS.find((s) => s.id === id)?.label ?? id).join(", ") || "Nincs külön spot réteg";

  return [
    `=== NYOMDAI PREPRESS SPECIFIKÁCIÓ (PDF/X-4) ===`,
    `Kiadványtípus: ${fmt.label} (${state.outputMode === "2d-print-artwork" ? "2D Nyomdakész Grafika" : "3D Print Mockup"})`,
    `Vágott méret (TrimBox): ${state.trimSizeMm} | Kifutó (BleedBox): +${state.bleedMm} | Biztonsági zóna: ${state.safeZoneMm}`,
    `Méretarány & Felbontás: ${scale.label}`,
    `Színprofil & Festékterhelés: ${icc.label} (Max. TAC: ${icc.tacLimit})`,
    `Fekete kezelés: ${state.richBlackLargeAreas ? "Rich Black (C:60 M:40 Y:40 K:100) nagy felületen" : "Standard CMYK"} | ${state.overprintSmallBlackText ? "Apró szöveg (<=12 pt) 100% K Overprint" : "Knockout szöveg"}`,
    `Hordozó & Felületnemesítés: ${sub} | ${finishes}`,
    `Technikai Spot Rétegek: ${spots}`,
    `Szerkezeti megjegyzés: ${fmt.noteHu}`,
  ].join("\n");
}

/** 0 ms-os determinisztikus Offline & Nyomdai Prepress prompt-fordító. */
export function compileOfflinePrintPrompt(state: OfflinePrintStudioState): CompiledPromptResult {
  const fmt = PRINT_PRODUCT_FORMATS.find((f) => f.id === state.productFormat) ?? PRINT_PRODUCT_FORMATS[0];
  const icc = PRINT_COLOR_PROFILES.find((c) => c.id === state.colorProfile) ?? PRINT_COLOR_PROFILES[0];
  const scaleHint = findHint(PRINT_SCALE_OPTIONS, state.scaleId);
  const distHint = findHint(PRINT_VIEWING_DISTANCES, state.viewingDistance);
  const subHint = findHint(PRINT_SUBSTRATE_OPTIONS, state.substrate);
  const finishHints = state.finishing.map((id) => findHint(PRINT_FINISHING_OPTIONS, id)).filter(Boolean);
  const spotHints = state.spotLayers.map((id) => findHint(PRINT_SPOT_LAYERS, id)).filter(Boolean);
  const paletteObj = PRINT_PALETTE_LOCKS.find((p) => p.id === state.paletteLockId);

  const hexList = (state.paletteLockId === "custom-hex" ? state.customHexColors.split(",") : (paletteObj?.colors ?? []))
    .map((c) => c.trim())
    .filter((c) => /^#[0-9A-Fa-f]{3,8}$/.test(c));

  const modeClause =
    state.outputMode === "2d-print-artwork"
      ? "Flat 2D print-ready prepress key artwork extending edge-to-edge across the full BleedBox, orthographically flat front view without 3D mockup perspective or table background"
      : `Photorealistic 3D commercial print presentation mockup showcasing physical ${subHint} substrate, accurate fold/structural geometry, and ${finishHints.join(", ") || "matte print"} light refraction under studio softbox lighting`;

  const blackRules = [
    state.richBlackLargeAreas ? "deep backgrounds rendered in Rich Black (C:60 M:40 Y:40 K:100)" : "",
    state.overprintSmallBlackText ? "crisp 100% K single-plate black micro-typography overprint" : "",
  ].filter(Boolean).join(", ");

  const modeNegatives =
    state.outputMode === "2d-print-artwork"
      ? ["3D mockup perspective", "angled table surface", "drop shadows", "hands holding paper", "curled edges"]
      : ["flat unlit 2D screenshot", "low-res paper texture"];

  const chipNegatives = state.negativeChipIds
    .map((id) => ANTI_AI_SLOP_NEGATIVE_CHIPS.find((c) => c.id === id)?.promptHint ?? "")
    .filter(Boolean);

  const subjectLine = state.brandName.trim()
    ? `${state.subject.trim()} for brand "${state.brandName.trim()}"`
    : state.subject.trim();

  return buildVisualPrompt({
    engine: state.engine,
    domain: "offline-print",
    subject: `${modeClause}. ${subjectLine}`,
    styleNotes: state.visualStyle,
    composition: `${fmt.structuralHint} (Trim: ${state.trimSizeMm}, Bleed: +${state.bleedMm}, Safe zone: ${state.safeZoneMm})`,
    copySpace: state.copySpaceNote,
    safeZoneNote: `${scaleHint}, ${distHint}`,
    opticsAndLighting: [icc.promptHint, blackRules, ...spotHints].filter(Boolean).join("; "),
    materials: [subHint, ...finishHints].filter(Boolean),
    colorPalette: paletteObj?.promptHint || undefined,
    brandColorsHex: hexList,
    aspectRatio: fmt.aspectRatio,
    exactTextToRender: state.exactTextToRender,
    stylize: state.stylize,
    styleRaw: state.styleRaw,
    maxVectorColors: state.maxVectorColors,
    negativeItems: [...modeNegatives, ...chipNegatives],
    customNegative: state.customNegative,
  });
}
