import { buildVisualPrompt } from "@/lib/prompt-engine/builders";
import { ANTI_AI_SLOP_NEGATIVE_CHIPS } from "@/lib/prompt-engine/presets";
import type { CompiledPromptResult, VisualTargetEngine } from "@/lib/prompt-engine/types";
import {
  APPAREL_FABRICS,
  APPAREL_GARMENTS,
  APPAREL_MOCKUP_STYLES,
  APPAREL_PALETTE_LOCKS,
  APPAREL_PLACEMENTS,
  APPAREL_PRINT_TECHS,
  APPAREL_TRIMS,
  APPAREL_WASHES,
  EMBROIDERY_STITCH_TYPES,
  FABRIC_BASE_COLORS,
  SCREEN_PRINT_INKS,
  type ApparelFabricId,
  type ApparelGarmentId,
  type ApparelMockupStyleId,
  type ApparelOptionItem,
  type ApparelPlacementId,
  type ApparelPrintTechId,
  type ApparelStudioMode,
  type ApparelWashId,
  type EmbroideryStitchId,
  type FabricBaseColorId,
  type ScreenPrintInkId,
} from "./apparel-studio-options";

export interface ApparelStudioState {
  mode: ApparelStudioMode;
  engine: Extract<VisualTargetEngine, "midjourney-v7" | "flux-1-1-pro" | "ideogram-3" | "recraft-v3-svg">;
  subject: string;
  brandName: string;
  exactTextToRender: string;
  garment: ApparelGarmentId;
  fabric: ApparelFabricId;
  wash: ApparelWashId;
  fabricBaseColor: FabricBaseColorId;
  customBaseHex: string;
  printTech: ApparelPrintTechId;
  placement: ApparelPlacementId;
  screenPrintInk: ScreenPrintInkId;
  embroideryStitch: EmbroideryStitchId;
  maxColors: number;
  trims: string[];
  sizeRange: string;
  techPackView: "front-back-flat" | "front-back-side-flat";
  techPackNotes: string;
  mockupStyle: ApparelMockupStyleId;
  visualStyle: string;
  paletteLockId: string;
  customHexColors: string;
  stylize: number;
  styleRaw: boolean;
  tile: boolean;
  negativeChipIds: string[];
  customNegative: string;
}

export const DEFAULT_APPAREL_STUDIO_STATE: ApparelStudioState = {
  mode: "print-artwork",
  engine: "flux-1-1-pro",
  subject: "Cybernetic biomechanical geometric phoenix emblem with sharp halftone stipple shading and crisp vector linework",
  brandName: "WEBDUDE APPAREL",
  exactTextToRender: "",
  garment: "boxy-oversized-tee",
  fabric: "heavy-cotton-280gsm",
  wash: "enzyme-vintage-wash",
  fabricBaseColor: "dark-black",
  customBaseHex: "#0B1120",
  printTech: "dtf",
  placement: "full-back",
  screenPrintInk: "plastisol",
  embroideryStitch: "satin-tatami",
  maxColors: 4,
  trims: ["double-coverstitch", "heavy-rib-2x2", "woven-damask-label", "herringbone-necktape"],
  sizeRange: "XS–XXL (Boxy Unisex Grading)",
  techPackView: "front-back-flat",
  techPackNotes: "2.5 cm nyakpasszé, 4 mm dupla tűs coverstitch, ejtett váll (+4.5 cm)",
  mockupStyle: "ghost-mannequin",
  visualStyle: "Neo-Brutalist Streetwear Graphic, razor-sharp isolated contour",
  paletteLockId: "webdude-merch-cyan-violet",
  customHexColors: "#00B5F1, #7C3AED, #FFFFFF",
  stylize: 180,
  styleRaw: true,
  tile: false,
  negativeChipIds: ["no-fake-text", "no-clutter-artifacts"],
  customNegative: "gold, amber, yellow",
};

export interface ApparelPreset {
  id: string;
  title: string;
  badge: string;
  state: Partial<ApparelStudioState>;
}

export const APPAREL_PRESETS: readonly ApparelPreset[] = [
  { id: "streetwear-dtf-back", title: "Streetwear Oversized Póló — DTF Hátnyomat (30×38 cm, 280 GSM, éles kontúr)", badge: "DTF Nyomat", state: { ...DEFAULT_APPAREL_STUDIO_STATE } },
  { id: "heavy-hoodie-screenprint", title: "Prémium Heavyweight Hoodie — 4-színű Szitanyomás (45 LPI + Puff Ink, 460 GSM)", badge: "Szitanyomás", state: { mode: "print-artwork", engine: "recraft-v3-svg", garment: "drop-shoulder-hoodie", fabric: "french-terry-460gsm", printTech: "screen-print", screenPrintInk: "3d-puff-ink", placement: "center-chest", maxColors: 4, subject: "Architectural brutalist typography crest with 45 LPI halftone shadows and raised 3D puff ink main emblem" } },
  { id: "workwear-cap-embroidery", title: "Céges Munkaruha / Sapka — 3D Puff Hímzés (11×5.5 cm, max. 5 cérna)", badge: "3D Hímzés", state: { mode: "print-artwork", engine: "recraft-v3-svg", garment: "dad-cap-5panel", fabric: "denim-twill-350gsm", printTech: "embroidery", embroideryStitch: "3d-puff-embroidery", placement: "cap-front", maxColors: 4, exactTextToRender: "WD", subject: "Bold geometric monogram shield optimized for 3D foam puff satin embroidery with thick 2mm columns" } },
  { id: "team-jersey-sublimation", title: "Csapat Sportmez — Szublimáció / All-Over Print (100% Poliészter, Seamless --tile)", badge: "AOP --tile", state: { mode: "print-artwork", engine: "midjourney-v7", garment: "raglan-sport-jersey", fabric: "drifit-poly-155gsm", fabricBaseColor: "optic-white", printTech: "sublimation-aop", placement: "all-over-aop", tile: true, subject: "Seamless repeating kinetic topographic vector contour waves and hexagonal carbon mesh texture for esports team jersey" } },
  { id: "hoodie-tech-pack-cad", title: "Drop-Shoulder Hoodie — Gyártási Tech Pack & 2D Flat Sketch (Elöl/Hátul CAD + BOM)", badge: "Tech Pack CAD", state: { mode: "garment-tech-pack", engine: "recraft-v3-svg", garment: "drop-shoulder-hoodie", fabric: "french-terry-460gsm", wash: "garment-dyed", maxColors: 2, subject: "Orthographic front and back 2D CAD technical flat sketch of a boxy drop-shoulder hoodie showing coverstitch callouts, 2x2 rib cuffs, and kangaroo pocket geometry" } },
  { id: "ghost-mannequin-lookbook", title: "Webshop Ghost Mannequin / Lookbook Fotó (Boxy Tee, Enzyme Wash, stúdió)", badge: "3D Mockup", state: { mode: "lookbook-mockup", engine: "flux-1-1-pro", garment: "boxy-oversized-tee", fabric: "heavy-cotton-280gsm", wash: "enzyme-vintage-wash", printTech: "screen-print", screenPrintInk: "water-discharge", placement: "center-chest", mockupStyle: "ghost-mannequin", subject: "Invisible ghost-mannequin studio product shot of an obsidian enzyme-washed 280 GSM boxy tee featuring a soft-hand cyan and violet geometric chest print" } },
];

function lookupHint<T extends string>(items: readonly ApparelOptionItem<T>[], id: string): string {
  return items.find((i) => i.id === id)?.promptHint ?? "";
}

/** Másolható magyar Textilnyomdai / Tech Pack BOM / Mockup Gyártási Adatlap. */
export function buildApparelSpecSummary(state: ApparelStudioState): string {
  const garment = APPAREL_GARMENTS.find((g) => g.id === state.garment)?.label ?? state.garment;
  const fabric = APPAREL_FABRICS.find((f) => f.id === state.fabric)?.label ?? state.fabric;
  const wash = APPAREL_WASHES.find((w) => w.id === state.wash)?.label ?? state.wash;
  const baseColor = FABRIC_BASE_COLORS.find((b) => b.id === state.fabricBaseColor) ?? FABRIC_BASE_COLORS[0];
  const tech = APPAREL_PRINT_TECHS.find((t) => t.id === state.printTech) ?? APPAREL_PRINT_TECHS[0];
  const place = APPAREL_PLACEMENTS.find((p) => p.id === state.placement) ?? APPAREL_PLACEMENTS[0];
  const trims = state.trims.map((id) => APPAREL_TRIMS.find((t) => t.id === id)?.label ?? id).join(", ") || "Alap konfekció";
  const underbaseNote = baseColor.needsWhiteUnderbase
    ? "KÖTELEZŐ Fehér Alányomás (White Underbase + 0.25 mm choke) + Alapszín Knock-out!"
    : "Világos alapanyag — közvetlen CMYK/Spot nyomat fehér alányomás nélkül.";

  const modeLabel =
    state.mode === "print-artwork"
      ? "1) Textilnyomtatási Grafika (Izolált Nyomat)"
      : state.mode === "garment-tech-pack"
        ? "2) Ruhadarab Tech Pack & 2D CAD Flat Sketch"
        : "3) Webshop & Lookbook Prezentációs Mockup";

  return [
    `=== TEXTIL & APPAREL GYÁRTÁSI SPECIFIKÁCIÓ (TECH PACK / BOM) ===`,
    `Mód: ${modeLabel} | Márka: ${state.brandName || "WebDude Apparel"}`,
    `Ruhadarab & Szabás: ${garment} | Méretsor: ${state.sizeRange}`,
    `Alapanyag & Súly: ${fabric} | Kikészítés: ${wash}`,
    `Alapruha Szín: ${baseColor.label} -> ${underbaseNote}`,
    `Nyomtatási Technológia: ${tech.label} (Max. ${state.maxColors} szín) | Pozíció: ${place.label} (${place.sizeCm})`,
    `Konstrukció & Kellékek (BOM): ${trims}`,
    `Technológiai utasítás: ${tech.noteHu}`,
    ...(state.techPackNotes.trim() ? [`Gyártási megjegyzés: ${state.techPackNotes.trim()}`] : []),
  ].join("\n");
}

/** 0 ms-os determinisztikus Ruha, Textil & Merch prompt-fordító. */
export function compileApparelPrompt(state: ApparelStudioState): CompiledPromptResult {
  const garmentHint = lookupHint(APPAREL_GARMENTS, state.garment);
  const fabricHint = lookupHint(APPAREL_FABRICS, state.fabric);
  const washHint = lookupHint(APPAREL_WASHES, state.wash);
  const baseColor = FABRIC_BASE_COLORS.find((b) => b.id === state.fabricBaseColor) ?? FABRIC_BASE_COLORS[0];
  const tech = APPAREL_PRINT_TECHS.find((t) => t.id === state.printTech) ?? APPAREL_PRINT_TECHS[0];
  const place = APPAREL_PLACEMENTS.find((p) => p.id === state.placement) ?? APPAREL_PLACEMENTS[0];
  const inkHint = state.printTech === "screen-print" ? lookupHint(SCREEN_PRINT_INKS, state.screenPrintInk) : "";
  const stitchHint = state.printTech === "embroidery" ? lookupHint(EMBROIDERY_STITCH_TYPES, state.embroideryStitch) : "";
  const trimHints = state.trims.map((id) => lookupHint(APPAREL_TRIMS, id)).filter(Boolean);
  const mockupHint = lookupHint(APPAREL_MOCKUP_STYLES, state.mockupStyle);
  const paletteObj = APPAREL_PALETTE_LOCKS.find((p) => p.id === state.paletteLockId);

  const hexList = (state.paletteLockId === "custom-hex" ? state.customHexColors.split(",") : (paletteObj?.colors ?? []))
    .map((c) => c.trim())
    .filter((c) => /^#[0-9A-Fa-f]{3,8}$/.test(c));

  const chipNegatives = state.negativeChipIds
    .map((id) => ANTI_AI_SLOP_NEGATIVE_CHIPS.find((c) => c.id === id)?.promptHint ?? "")
    .filter(Boolean);

  if (state.mode === "print-artwork") {
    const underbaseClause = baseColor.needsWhiteUnderbase
      ? `Designed for ${baseColor.promptHint} with clean garment-color knock-out and white underbase choke registration`
      : `Designed for ${baseColor.promptHint}`;
    const shouldTile = Boolean(state.tile || tech.autoTile);

    return buildVisualPrompt({
      engine: state.engine,
      domain: "apparel-merch",
      subject: `Flat isolated 2D apparel print production artwork on a solid high-contrast neutral isolation background (NO t-shirt, NO garment folds, NO model). Motif: ${state.subject.trim()}`,
      styleNotes: [state.visualStyle, tech.promptRule, inkHint, stitchHint].filter(Boolean).join("; "),
      composition: `Target placement: ${place.promptHint} (${place.sizeCm}), limited to maximum ${state.maxColors} distinct production colors`,
      safeZoneNote: underbaseClause,
      colorPalette: paletteObj?.promptHint || undefined,
      brandColorsHex: hexList,
      aspectRatio: place.aspectRatio,
      exactTextToRender: state.exactTextToRender,
      stylize: state.stylize,
      styleRaw: state.styleRaw,
      tile: shouldTile,
      maxVectorColors: state.maxColors,
      negativeItems: [
        "t-shirt mockup",
        "hoodie garment",
        "human model",
        "hanger",
        "wrinkled fabric folds",
        ...tech.forcedNegatives,
        ...chipNegatives,
      ],
      customNegative: state.customNegative,
    });
  }

  if (state.mode === "garment-tech-pack") {
    const viewNote =
      state.techPackView === "front-back-side-flat"
        ? "Orthographic 2D CAD technical flat sketch showing FRONT, BACK, and SIDE views aligned horizontally"
        : "Orthographic 2D CAD technical flat sketch showing symmetrical FRONT and BACK views side-by-side";

    return buildVisualPrompt({
      engine: state.engine,
      domain: "apparel-merch",
      subject: `${viewNote} of a ${garmentHint} on a pure stark white #FFFFFF specification sheet background. Details: ${state.subject.trim()}`,
      styleNotes:
        "Apparel manufacturing Tech Pack CAD vector line drawing, crisp black structural seam lines, dashed coverstitch callout lines, zero photorealism, zero 3D shading",
      composition: `Construction & BOM callouts: ${trimHints.join(", ") || "standard double-needle seams"}. ${state.techPackNotes.trim()}`,
      materials: [fabricHint, washHint],
      aspectRatio: "16:9",
      exactTextToRender: state.exactTextToRender,
      stylize: 100,
      styleRaw: true,
      maxVectorColors: 3,
      negativeItems: [
        "human model",
        "3D mannequin",
        "photorealistic wrinkles",
        "studio lighting shadows",
        "perspective distortion",
        ...chipNegatives,
      ],
      customNegative: state.customNegative,
    });
  }

  // lookbook-mockup
  return buildVisualPrompt({
    engine: state.engine,
    domain: "apparel-merch",
    subject: `${mockupHint}. Showcasing a ${garmentHint} in ${baseColor.promptHint} featuring ${place.promptHint}: ${state.subject.trim()}`,
    styleNotes: `${state.visualStyle}; graphic applied via ${tech.label} (${inkHint || stitchHint || "authentic ink texture"}) following fabric micro-drape`,
    composition: `Trim & construction details visible: ${trimHints.slice(0, 3).join(", ")}`,
    opticsAndLighting: "85mm f/2.8 commercial fashion studio lighting, accurate textile weave micro-contrast",
    materials: [fabricHint, washHint],
    colorPalette: paletteObj?.promptHint || undefined,
    brandColorsHex: hexList,
    aspectRatio: "4:5",
    exactTextToRender: state.exactTextToRender,
    stylize: state.stylize,
    styleRaw: state.styleRaw,
    negativeItems: ["floating disconnected sticker graphic", "distorted collar", ...chipNegatives],
    customNegative: state.customNegative,
  });
}
