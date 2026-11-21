export type ApparelStudioMode =
  | "print-artwork"
  | "garment-tech-pack"
  | "lookbook-mockup";

export type ApparelPrintTechId =
  | "dtf"
  | "dtg"
  | "screen-print"
  | "embroidery"
  | "sublimation-aop"
  | "flex-flock";

export type ApparelPlacementId =
  | "left-chest"
  | "center-chest"
  | "full-back"
  | "sleeve"
  | "neck-label"
  | "cap-front"
  | "all-over-aop";

export type ApparelGarmentId =
  | "boxy-oversized-tee"
  | "drop-shoulder-hoodie"
  | "zip-hoodie"
  | "crewneck-sweatshirt"
  | "pique-polo"
  | "workwear-canvas-jacket"
  | "cargo-jogger"
  | "raglan-sport-jersey"
  | "dad-cap-5panel"
  | "heavyweight-tote";

export type ApparelFabricId =
  | "cotton-190gsm"
  | "heavy-cotton-280gsm"
  | "french-terry-460gsm"
  | "drifit-poly-155gsm"
  | "canvas-ripstop-360gsm"
  | "denim-twill-350gsm";

export type ApparelWashId =
  | "reactive-standard"
  | "garment-dyed"
  | "acid-mineral-wash"
  | "enzyme-vintage-wash"
  | "pigment-dyed";

export type ApparelMockupStyleId =
  | "ghost-mannequin"
  | "flat-lay-studio"
  | "streetwear-lookbook"
  | "macro-stitch-detail";

export type FabricBaseColorId =
  | "dark-black"
  | "optic-white"
  | "heather-grey"
  | "navy-slate"
  | "custom-hex";

export type ScreenPrintInkId =
  | "plastisol"
  | "water-discharge"
  | "3d-puff-ink"
  | "high-density"
  | "metallic-silver";

export type EmbroideryStitchId =
  | "satin-tatami"
  | "3d-puff-embroidery"
  | "woven-chenille-patch";

export interface ApparelOptionItem<TId extends string = string> {
  id: TId;
  label: string;
  promptHint: string;
  colors?: string[];
}

export interface ApparelPrintTechSpec {
  id: ApparelPrintTechId;
  label: string;
  badge: string;
  promptRule: string;
  forcedNegatives: string[];
  noteHu: string;
  autoTile?: boolean;
}

export interface ApparelPlacementSpec {
  id: ApparelPlacementId;
  label: string;
  sizeCm: string;
  aspectRatio: string;
  promptHint: string;
}

export interface FabricBaseColorSpec {
  id: FabricBaseColorId;
  label: string;
  hex: string;
  promptHint: string;
  needsWhiteUnderbase: boolean;
}

export const APPAREL_PRINT_TECHS: readonly ApparelPrintTechSpec[] = [
  {
    id: "dtf",
    label: "DTF (Direct-to-Film)",
    badge: "300 DPI · Éles Szél",
    promptRule:
      "300 DPI isolated DTF transfer print graphic with razor-sharp vector or halftone dot perimeter edges; STRICTLY NO semi-transparent fade, NO outer glow, NO soft feathered smoke edges (prevents white hot-melt adhesive underbase halo)",
    forcedNegatives: [
      "semi-transparent fade",
      "outer glow",
      "soft feathered smoke edges",
      "white adhesive underbase halo",
    ],
    noteHu:
      "DTF SZABÁLY: 300 DPI transzparens PNG — TILOS a félig áttetsző füst/glow szél (fehér ragasztó-halo keletkezik), használj éles kontúrt vagy halftone rasztert!",
  },
  {
    id: "dtg",
    label: "DTG (Direct-to-Garment)",
    badge: "3600×4800 px · Knock-out",
    promptRule:
      "300 DPI (4500x5400 px) DTG direct-to-garment artwork optimized for cotton fiber absorption with black/garment-color knock-out transparency",
    forcedNegatives: [" muddy low-contrast shadows", "banding artifacts"],
    noteHu:
      "DTG: 300 DPI (3600×4800 / 4500×5400 px), sötét alapnál alapszín-kivágás (garment knock-out) és előkezelő + fehér underbase.",
  },
  {
    id: "screen-print",
    label: "Szitanyomás (Screen Print)",
    badge: "1–6 Pantone · 45–55 LPI",
    promptRule:
      "Spot-color screen print artwork separated into crisp Pantone solid layers or 45-55 LPI (22.5 degree angle) halftone dots, 0.25mm white underbase choke, 0.75pt trapping registration tolerance",
    forcedNegatives: ["unseparated RGB continuous blur", "micro-gradient banding"],
    noteHu:
      "Szitanyomás: 1–6 Pantone direkt szín, halftone 45–55 LPI (22.5°), 0.2–0.35 mm fehér alányomás-szűkítés (choke) és 0.5–1 pt trapping.",
  },
  {
    id: "embroidery",
    label: "Gépi Hímzés (Embroidery)",
    badge: "Min. 1.2 mm vonal · 5 mm betű",
    promptRule:
      "Digitized machine embroidery emblem, strictly solid thread blocks (max 4-8 thread colors), STRICTLY NO color gradients, minimum line thickness 1.2-1.5mm, minimum lettering height 5mm, crisp satin stitch borders and tatami fill direction",
    forcedNegatives: [
      "color gradients",
      "fine hairline strokes under 1.2mm",
      "micro text under 5mm",
      "photorealistic airbrush shading",
    ],
    noteHu:
      "HÍMZÉS SZABÁLY: Max. 4–8 cérnaszín, TILOS a színátmenet, min. vonalvastagság 1.2–1.5 mm, min. betűmagasság 5 mm!",
  },
  {
    id: "sublimation-aop",
    label: "Szublimáció / All-Over (AOP)",
    badge: "100% Poliészter · Seamless",
    promptRule:
      "Seamless tileable all-over sublimation pattern (AOP) for 100% polyester performance fabric with full cut-and-sew panel bleed continuity",
    forcedNegatives: ["visible seam borders", "non-repeating cropped edges"],
    noteHu:
      "Szublimáció / AOP: 100% világos poliészter alapanyag, végtelenített (seamless tile) minta szabásminta-kifutóval.",
    autoTile: true,
  },
  {
    id: "flex-flock",
    label: "Flex / Flock Fólia (HTV)",
    badge: "1–3 szín · Kiszedhető vektor",
    promptRule:
      "Plotter-cut weedable HTV flex/flock vector graphic, 1-3 solid colors, bold closed geometric paths, zero gradients or tiny detached floating islands",
    forcedNegatives: ["gradients", "distressed grunge speckles", "thin unweedable hairlines"],
    noteHu:
      "Flex / Flock (HTV): 1–3 tömör szín, vágóplotterrel kiszedhető (weedable) zárt vektorformák, apró szigetek nélkül.",
  },
];

export const SCREEN_PRINT_INKS: readonly ApparelOptionItem<ScreenPrintInkId>[] = [
  { id: "plastisol", label: "Plastisol (Fedő / Élénk)", promptHint: "opaque vibrant plastisol screen-print ink" },
  { id: "water-discharge", label: "Vízbázisú / Discharge (Puha)", promptHint: "zero-hand soft-feel water-based discharge ink dyed into cotton fibers" },
  { id: "3d-puff-ink", label: "3D Puff Ink (Habosodó)", promptHint: "raised tactile 3D puff foaming screen-print ink relief" },
  { id: "high-density", label: "High-Density (Éles 3D él)", promptHint: "sharp-edged thick high-density architectural screen print" },
  { id: "metallic-silver", label: "Metál Ezüst / Króm Szita", promptHint: "reflective metallic silver shimmer screen-print ink (strictly no gold)" },
];

export const EMBROIDERY_STITCH_TYPES: readonly ApparelOptionItem<EmbroideryStitchId>[] = [
  { id: "satin-tatami", label: "Szatén + Tatami Kitöltés", promptHint: "lustrous satin stitch columns with dense tatami fill texture" },
  { id: "3d-puff-embroidery", label: "3D Puff Habosított Hímzés", promptHint: "high-profile 3D foam-core raised satin stitch embroidery" },
  { id: "woven-chenille-patch", label: "Chenille / Szőtt Felvarró", promptHint: "varsity chenille loop texture with merrowed border stitch" },
];

export const APPAREL_PLACEMENTS: readonly ApparelPlacementSpec[] = [
  { id: "left-chest", label: "Bal mell (8–10 cm)", sizeCm: "9×9 cm", aspectRatio: "1:1", promptHint: "compact left-chest emblem placement (9x9 cm) balanced for pocket-zone legibility" },
  { id: "center-chest", label: "Mellközép (26–30 cm)", sizeCm: "28×20 cm", aspectRatio: "16:9", promptHint: "bold center-chest graphic placement (28x20 cm) across front torso" },
  { id: "full-back", label: "Teljes hát (30–38 cm)", sizeCm: "34×42 cm", aspectRatio: "4:5", promptHint: "full-back statement print composition (34x42 cm) anchored 6cm below collar seam" },
  { id: "sleeve", label: "Ujj nyomat (7–9 cm)", sizeCm: "8×32 cm", aspectRatio: "9:16", promptHint: "vertical sleeve badge / forearm strip graphic (8x32 cm)" },
  { id: "neck-label", label: "Belső nyakcímke (5–7 cm)", sizeCm: "6×6 cm", aspectRatio: "1:1", promptHint: "minimalist inside neck size & brand tag print (6x6 cm)" },
  { id: "cap-front", label: "Sapka homlok (11×5.5 cm)", sizeCm: "11×5.5 cm", aspectRatio: "16:9", promptHint: "curved crown front cap panel emblem (11x5.5 cm max height)" },
  { id: "all-over-aop", label: "Teljes felület (All-Over AOP)", sizeCm: "Teljes szabásminta", aspectRatio: "1:1", promptHint: "continuous edge-to-edge all-over seamless textile pattern" },
];

export const APPAREL_GARMENTS: readonly ApparelOptionItem<ApparelGarmentId>[] = [
  { id: "boxy-oversized-tee", label: "Boxy Oversized Póló", promptHint: "heavyweight boxy oversized streetwear T-shirt with dropped shoulders and wide 2.5cm ribbed crew collar" },
  { id: "drop-shoulder-hoodie", label: "Drop-Shoulder Hoodie", promptHint: "architectural drop-shoulder pullover hoodie with double-lined hood, kangaroo pocket, and no drawstring" },
  { id: "zip-hoodie", label: "Heavy Zip-Hoodie", promptHint: "full-zip heavyweight hoodie with exposed YKK metal zipper and structured hood" },
  { id: "crewneck-sweatshirt", label: "Crewneck Pulóver", promptHint: "relaxed vintage crewneck sweatshirt with V-notch collar insert and wide rib cuffs" },
  { id: "pique-polo", label: "Galléros Piqué Polo", promptHint: "tailored corporate piqué polo shirt with knitted collar and 2-button placket" },
  { id: "workwear-canvas-jacket", label: "Workwear Canvas Dzseki", promptHint: "structured utilitarian duck-canvas work jacket with triple-stitched patch pockets" },
  { id: "cargo-jogger", label: "Cargo / Tech Jogger", promptHint: "articulated knee cargo tech-fleece jogger pants with gusseted pockets" },
  { id: "raglan-sport-jersey", label: "Raglán Csapat Sportmez", promptHint: "athletic raglan-sleeve sublimation team jersey with breathable mesh side panels" },
  { id: "dad-cap-5panel", label: "5-Panel / Baseball Sapka", promptHint: "structured 6-panel / 5-panel cotton twill cap with stitched eyelets" },
  { id: "heavyweight-tote", label: "Heavyweight Vászon Tote Bag", promptHint: "heavyweight 400gsm gusseted canvas tote bag with reinforced cross-stitched webbing handles" },
];

export const APPAREL_FABRICS: readonly ApparelOptionItem<ApparelFabricId>[] = [
  { id: "cotton-190gsm", label: "180–200 GSM Fésült Pamut", promptHint: "190 GSM combed ring-spun single jersey 100% cotton" },
  { id: "heavy-cotton-280gsm", label: "240–300 GSM Heavyweight Jersey", promptHint: "280 GSM compact heavyweight carded cotton jersey with structured drape" },
  { id: "french-terry-460gsm", label: "400–520 GSM French Terry / Fleece", promptHint: "460 GSM diagonal-loopback organic French terry heavyweight cotton" },
  { id: "drifit-poly-155gsm", label: "140–165 GSM Dri-Fit Poliészter", promptHint: "155 GSM micro-mesh moisture-wicking interlock performance polyester" },
  { id: "canvas-ripstop-360gsm", label: "300–400 GSM Canvas / Ripstop", promptHint: "360 GSM rugged cotton duck canvas and ripstop weave" },
  { id: "denim-twill-350gsm", label: "340+ GSM Farmer / Twill", promptHint: "350 GSM 3x1 right-hand diagonal bull denim twill" },
];

export const APPAREL_WASHES: readonly ApparelOptionItem<ApparelWashId>[] = [
  { id: "reactive-standard", label: "Standard Reaktív Festés", promptHint: "colorfast deep reactive dye finish" },
  { id: "garment-dyed", label: "Garment-Dyed (Konfekciófestett)", promptHint: "garment-dyed soft lived-in seam puckering and rich matte tone" },
  { id: "acid-mineral-wash", label: "Acid / Mineral Wash", promptHint: "vintage mineral acid-wash high-low seam contrast" },
  { id: "enzyme-vintage-wash", label: "Enzyme Vintage Wash", promptHint: "bio-polished enzyme stone-wash ultra-soft peach-skin handfeel" },
  { id: "pigment-dyed", label: "Pigment-Dyed Faded", promptHint: "sun-faded pigment-dyed patina along raised stitching" },
];

export const APPAREL_TRIMS: readonly ApparelOptionItem[] = [
  { id: "double-coverstitch", label: "Dupla tűs Coverstitch (4 mm)", promptHint: "4mm double-needle straddle coverstitch along armholes and shoulders" },
  { id: "flatlock-seam", label: "Flatlock Sportvarrás", promptHint: "5-thread exposed decorative flatlock seam construction" },
  { id: "heavy-rib-2x2", label: "2×2 Vastag Elasztán Passzé", promptHint: "7cm high-recovery 2x2 ribbed Lycra cuffs and hemband" },
  { id: "ykk-metal-zip", label: "YKK #5 Fém / Vislon Cipzár", promptHint: "heavy-duty YKK #5 brushed silver metal zipper hardware" },
  { id: "metal-eyelets-cord", label: "Fém Ringli & Zárt Húzózsinór", promptHint: "matte gunmetal grommet eyelets and silicone-tipped drawcords" },
  { id: "woven-damask-label", label: "Szőtt Damaszt Nyak- & Flag Címke", promptHint: "high-density woven damask main neck label and side-seam flag label" },
  { id: "satin-care-label", label: "Mosási / Care Címke (ISO)", promptHint: "interior satin wash-care instruction label with ISO laundry symbols" },
  { id: "herringbone-necktape", label: "Halszálkás Nyakmegerősítő Szalag", promptHint: "shoulder-to-shoulder cotton herringbone neck tape reinforcement" },
];

export const APPAREL_MOCKUP_STYLES: readonly ApparelOptionItem<ApparelMockupStyleId>[] = [
  { id: "ghost-mannequin", label: "Ghost Mannequin (3D Láthatatlan Próba)", promptHint: "invisible ghost-mannequin 3D hollow torso e-commerce product photography on pure neutral studio backdrop, showing inner neck label" },
  { id: "flat-lay-studio", label: "Overhead Flat-Lay Stúdió", promptHint: "90-degree overhead architectural flat-lay garment styling on matte slate surface with natural micro-folds" },
  { id: "streetwear-lookbook", label: "Editorial Streetwear Lookbook", promptHint: "high-fashion editorial streetwear lookbook campaign shot on model in minimalist concrete architecture, 85mm f/1.8 lens" },
  { id: "macro-stitch-detail", label: "Macro Textil, Öltés & Nyomat Közeli", promptHint: "100mm f/2.8 macro close-up revealing individual cotton yarn twist, ink surface texture, and stitch tension" },
];

export const FABRIC_BASE_COLORS: readonly FabricBaseColorSpec[] = [
  { id: "dark-black", label: "Obszidián Fekete (#0B1120)", hex: "#0B1120", promptHint: "deep obsidian black fabric base (#0B1120)", needsWhiteUnderbase: true },
  { id: "optic-white", label: "Optikai / Törtfehér (#F8FAFC)", hex: "#F8FAFC", promptHint: "crisp off-white / optic white fabric base (#F8FAFC)", needsWhiteUnderbase: false },
  { id: "heather-grey", label: "Melírozott Szürke (Heather)", hex: "#94A3B8", promptHint: "marled athletic heather grey cotton blend base", needsWhiteUnderbase: true },
  { id: "navy-slate", label: "Mélykék / Palaszürke (#1E293B)", hex: "#1E293B", promptHint: "deep navy slate fabric base (#1E293B)", needsWhiteUnderbase: true },
  { id: "custom-hex", label: "Saját Alapszín (HEX)", hex: "#334155", promptHint: "custom garment dye base color", needsWhiteUnderbase: true },
];

export const APPAREL_PALETTE_LOCKS: readonly ApparelOptionItem[] = [
  { id: "webdude-merch-cyan-violet", label: "WebDude Cián-Lila-Fehér (0% Arany)", promptHint: "strict print color palette: electric sky cyan #00B5F1, vivid violet #7C3AED, crisp white #FFFFFF; strictly NO gold, amber, or yellow", colors: ["#00B5F1", "#7C3AED", "#FFFFFF"] },
  { id: "streetwear-mono-chrome", label: "Streetwear Monokróm + Króm Ezüst", promptHint: "high-contrast pure white, graphite grey, and metallic chrome silver ink palette", colors: ["#FFFFFF", "#94A3B8", "#0F172A"] },
  { id: "acid-emerald-cyan", label: "Sport Smaragd & Cián", promptHint: "high-visibility emerald #10B981, electric cyan #00B5F1, and deep slate #0F172A", colors: ["#10B981", "#00B5F1", "#0F172A"] },
  { id: "custom-hex", label: "Saját Pantone / HEX", promptHint: "" },
];
