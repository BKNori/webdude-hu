/**
 * WCAG 2.1 AA kontraszt-audit (4.5:1 normál szöveg) Dual Theme támogatással.
 *
 * A `className` stringeken belül megkeresi azokat az elemeket, amelyek EGYIDEJŰLEG
 * definiálnak szövegszínt (`text-*`, `placeholder-*`) és háttérszínt (`bg-*`),
 * majd kiszámolja a WCAG kontrasztarányt mind a Luminous Daylight (`light`),
 * mind a Luminous Slate (`dark`) témapalettán (a rögzített `dark` konténerekben
 * csak sötét módban).
 *
 * Használat: node scripts/audit-contrast.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const TARGET_DIRS = [
  path.join(ROOT, "src", "app"),
  path.join(ROOT, "src", "components"),
];
const SKIP_PATH_PARTS = ["/admin/", "/_mentesek/"];

const DARK_PINNED_MARKERS = [
  "/src/app/portal/",
  "/src/components/organisms/portal/",
  "/PortalDashboard.tsx",
  "/AIWorkshopCollection.tsx",
  "/AddonStore.tsx",
  "/AdminPanel.tsx",
  "/AdminDashboard.tsx",
  "/SuperAdminDashboard.tsx",
  "/LeadKanbanCard.tsx",
  "/LeadKanbanBoard.tsx",
  "/WorkflowChat.tsx",
  "WorkshopGenerator.tsx",
  "/CompetitorAnalyzer.tsx",
  "/ContentPlanner.tsx",
  "/EmailTemplateEditor.tsx",
  "/email-editor/",
  "/kristofka/",
  "/SEOAuditTool.tsx",
  "/SingleAITool.tsx",
  "/SuperadminWorkshopDashboard.tsx",
  "/TaskCaptureForm.tsx",
  "/WorkshopLimitBanner.tsx",
];

const LIGHT_PALETTE = {
  "bg-base": "#f8fafc",
  "bg-card": "#ffffff",
  "bg-surface": "#ffffff",
  "bg-elevated": "#f1f5f9",
  "night-950": "#eef2f7",
  "night-900": "#f8fafc",
  "night-800": "#f1f5f9",
  "night-700": "#eaf1fa",
  "paper-50": "#f8fafc",
  "paper-100": "#f1f5f9",
  "paper-card": "#ffffff",
  "ink-900": "#0f172a",
  "ink-700": "#334155",
  "ink-600": "#475569",
  "ink-line": "#e2e8f0",
  "brand-on-light": "#0369a1",
  "accent-on-light": "#6d28d9",
  "text-primary": "#0f172a",
  "text-secondary": "#334155",
  "text-muted": "#475569",
  "brand-primary": "#0369a1",
  "brand-secondary": "#6d28d9",
  "cta-from": "#075985",
  "cta-to": "#5b21b6",
  "cta-hover": "#6d28d9",
  accent: "#7c3aed",
  white: "#ffffff",
  black: "#000000",
};

const DARK_PALETTE = {
  "bg-base": "#020617",
  "bg-card": "#0f172a",
  "bg-surface": "#0f172a",
  "bg-elevated": "#1e293b",
  "night-950": "#070c1a",
  "night-900": "#0b1120",
  "night-800": "#111c33",
  "night-700": "#16223b",
  "paper-50": "#f8fafc",
  "paper-100": "#f1f5f9",
  "paper-card": "#ffffff",
  "ink-900": "#0f172a",
  "ink-700": "#334155",
  "ink-600": "#475569",
  "ink-line": "#e2e8f0",
  "brand-on-light": "#0369a1",
  "accent-on-light": "#6d28d9",
  "text-primary": "#e2e8f0",
  "text-secondary": "#94a3b8",
  "text-muted": "#64748b",
  "brand-primary": "#00b5f1",
  "brand-secondary": "#7c3aed",
  "cta-from": "#075985",
  "cta-to": "#5b21b6",
  "cta-hover": "#6d28d9",
  accent: "#7c3aed",
  white: "#ffffff",
  black: "#000000",
};

const TAILWIND_PALETTE = {
  slate: {
    50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1",
    400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155",
    800: "#1e293b", 900: "#0f172a", 950: "#020617",
  },
  gray: {
    50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af",
    500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937",
    900: "#111827", 950: "#030712",
  },
  zinc: {
    50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8", 400: "#a1a1aa",
    500: "#71717a", 600: "#52525b", 700: "#3f3f46", 800: "#27272a", 900: "#18181b", 950: "#09090b",
  },
  sky: {
    50: "#f0f9ff", 100: "#e0f2fe", 200: "#bae6fd", 300: "#7dd3fc", 400: "#38bdf8",
    500: "#0ea5e9", 600: "#0284c7", 700: "#0369a1", 800: "#075985", 900: "#0c4a6e", 950: "#082f49",
  },
  blue: {
    50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa",
    500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a", 950: "#172554",
  },
  cyan: {
    50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee",
    500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63", 950: "#083344",
  },
  emerald: {
    50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399",
    500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b", 950: "#022c22",
  },
  green: {
    50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80",
    500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d", 950: "#052e16",
  },
  red: {
    50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171",
    500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d", 950: "#450a0a",
  },
  amber: {
    50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24",
    500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f", 950: "#451a03",
  },
  violet: {
    50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd", 400: "#a78bfa",
    500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 800: "#5b21b6", 900: "#4c1d95", 950: "#2e1065",
  },
  indigo: {
    50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc", 400: "#818cf8",
    500: "#6366f1", 600: "#4f46e5", 700: "#4338ca", 800: "#3730a3", 900: "#312e81", 950: "#1e1b4b",
  },
  purple: {
    50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe", 400: "#c084fc",
    500: "#a855f7", 600: "#9333ea", 700: "#7e22ce", 800: "#6b21a8", 900: "#581c87", 950: "#3b0764",
  },
};

const IGNORED_MODIFIER_PREFIXES = [
  "disabled",
  "group-",
  "peer-",
  "focus",
  "active",
  "file",
  "before",
  "after",
  "aria-",
  "data-",
  "open",
];

/** Tailwind szín token feloldása hexadecimális értékre (támogatja az arbitrary `[#...]` jelölést is). */
function resolveColor(rawToken, palette) {
  const token = rawToken.replace(/^\[(.*)\]$/, "$1");
  if (palette[token]) return palette[token];
  if (/^#[0-9a-f]{6}$/i.test(token)) return token;
  if (/^#[0-9a-f]{3}$/i.test(token)) {
    return "#" + token[1] + token[1] + token[2] + token[2] + token[3] + token[3];
  }
  const match = token.match(/^([a-z]+)-(\d{2,3})$/);
  if (match) {
    const family = TAILWIND_PALETTE[match[1]];
    if (family && family[match[2]]) return family[match[2]];
  }
  return null;
}

function srgbToLinear(channel) {
  const value = channel / 255;
  return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  return (
    0.2126 * srgbToLinear(parseInt(hex.slice(1, 3), 16)) +
    0.7152 * srgbToLinear(parseInt(hex.slice(3, 5), 16)) +
    0.0722 * srgbToLinear(parseInt(hex.slice(5, 7), 16))
  );
}

function contrastRatio(foreground, background) {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function normalizePath(p) {
  return p.replace(/\\/g, "/");
}

function isDarkPinnedFile(filePath) {
  const norm = normalizePath(filePath);
  return DARK_PINNED_MARKERS.some((marker) => norm.includes(marker));
}

/** Osztálylista feldolgozása: kigyűjti a text/bg színeket light (`base`) és dark (`dark:`) kontextusban külön. */
function extractColors(classString) {
  const tokens = classString
    .replace(/\$\{[^}]*\}/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const result = {
    baseText: null,
    baseBg: null,
    baseBgExplicitUnresolvable: false,
    hoverText: null,
    hoverBg: null,
    hoverBgExplicitUnresolvable: false,
    darkText: null,
    darkTextExplicitUnresolvable: false,
    darkBg: null,
    darkBgExplicitUnresolvable: false,
    darkHoverText: null,
    darkHoverTextExplicitUnresolvable: false,
    darkHoverBg: null,
    darkHoverBgExplicitUnresolvable: false,
  };

  const NON_COLOR_TEXT_PREFIXES = /^(xs|sm|base|lg|xl|\d+xl|left|center|right|justify|start|end|wrap|nowrap|balance|pretty|ellipsis|clip|break-|\[[\d.]+(?:rem|px|em|ch|vw|vh|%)\])$/;
  const NON_COLOR_BG_PREFIXES = /^(none|auto|cover|contain|center|top|bottom|left|right|repeat|no-repeat|repeat-x|repeat-y|fixed|local|scroll|clip-|origin-|blend-)/;

  for (const raw of tokens) {
    const parts = raw.split(":");
    const token = parts.pop();
    const mods = parts;

    if (mods.some((m) => IGNORED_MODIFIER_PREFIXES.some((prefix) => m.startsWith(prefix)))) {
      continue;
    }

    const isDark = mods.includes("dark");
    const isHover = mods.includes("hover");

    if (token.startsWith("text-")) {
      const candidate = token.slice(5);
      if (NON_COLOR_TEXT_PREFIXES.test(candidate)) continue;
      const resolved = candidate !== "transparent" && resolveColor(candidate, DARK_PALETTE);
      if (resolved) {
        if (isDark) {
          if (isHover) result.darkHoverText = candidate;
          else if (!result.darkText) result.darkText = candidate;
        } else {
          if (isHover) result.hoverText = candidate;
          else if (!result.baseText) result.baseText = candidate;
        }
      } else {
        // Pl. `dark:text-white/70`, `dark:text-slate-300/80` vagy `dark:text-transparent`
        if (isDark) {
          if (isHover) result.darkHoverTextExplicitUnresolvable = true;
          else result.darkTextExplicitUnresolvable = true;
        }
      }
    } else if (token.startsWith("placeholder-")) {
      const candidate = token.slice(12);
      if (resolveColor(candidate, DARK_PALETTE)) {
        if (isDark) {
          if (isHover) result.darkHoverText = candidate;
          else if (!result.darkText) result.darkText = candidate;
        } else {
          if (isHover) result.hoverText = candidate;
          else if (!result.baseText) result.baseText = candidate;
        }
      }
    } else if (token.startsWith("bg-")) {
      const candidate = token.slice(3);
      if (NON_COLOR_BG_PREFIXES.test(candidate)) continue;
      const isGradient =
        candidate.startsWith("gradient") ||
        candidate.startsWith("linear") ||
        candidate.startsWith("radial") ||
        candidate.startsWith("conic");
      const resolved =
        !isGradient &&
        candidate !== "transparent" &&
        resolveColor(candidate, DARK_PALETTE);

      if (resolved) {
        if (isDark) {
          if (isHover) result.darkHoverBg = candidate;
          else if (!result.darkBg) result.darkBg = candidate;
        } else {
          if (isHover) result.hoverBg = candidate;
          else if (!result.baseBg) result.baseBg = candidate;
        }
      } else {
        // Pl. `bg-linear-to-r`, `dark:bg-transparent`, `dark:bg-slate-900/80`, `dark:bg-red-500/10`
        if (isDark) {
          if (isHover) result.darkHoverBgExplicitUnresolvable = true;
          else result.darkBgExplicitUnresolvable = true;
        } else {
          if (isHover) result.hoverBgExplicitUnresolvable = true;
          else result.baseBgExplicitUnresolvable = true;
        }
      }
    }
  }

  return result;
}

function walk(dir, accumulator) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, accumulator);
    else if (/\.tsx$/.test(entry.name)) accumulator.push(full);
  }
  return accumulator;
}

const findings = [];
const files = [];
for (const dir of TARGET_DIRS) walk(dir, files);

let auditedCount = 0;
for (const file of files) {
  const normFile = normalizePath(file);
  if (SKIP_PATH_PARTS.some((part) => normFile.includes(part))) continue;
  auditedCount++;

  const darkPinned = isDarkPinnedFile(file);
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);

  lines.forEach((line, index) => {
    const literals = line.match(/"[^"]*"|`[^`]*`|'[^']*'/g);
    if (!literals) return;

    for (const literal of literals) {
      const colors = extractColors(literal.replace(/^["'`]|["'`]$/g, ""));

      const checkPair = (textTok, bgTok, palette, state) => {
        if (!textTok || !bgTok) return;
        const fg = resolveColor(textTok, palette);
        const bg = resolveColor(bgTok, palette);
        if (!fg || !bg) return;
        const ratio = contrastRatio(fg, bg);
        if (ratio < 4.5) {
          findings.push({
            file: path.relative(ROOT, file),
            line: index + 1,
            state,
            pair: textTok + " / " + bgTok,
            ratio,
          });
        }
      };

      if (darkPinned) {
        // Rögzített sötét felületek (portál, admin/műhely eszközök): base + dark: a DARK_PALETTE ellen
        const darkText =
          colors.darkText ||
          (colors.darkTextExplicitUnresolvable ? null : colors.baseText);
        const darkBg =
          colors.darkBg ||
          (colors.darkBgExplicitUnresolvable || colors.baseBgExplicitUnresolvable
            ? null
            : colors.baseBg);
        if (darkText && darkBg) {
          checkPair(darkText, darkBg, DARK_PALETTE, "dark-pinned alap");
        }
        const hoverT =
          colors.darkHoverText ||
          (colors.darkHoverTextExplicitUnresolvable ? null : colors.hoverText);
        const hoverB =
          colors.darkHoverBg ||
          (colors.darkHoverBgExplicitUnresolvable || colors.hoverBgExplicitUnresolvable
            ? null
            : colors.hoverBg);
        if (hoverT || hoverB) {
          const effT = hoverT || darkText;
          const effB =
            hoverB ||
            (colors.hoverBgExplicitUnresolvable || colors.darkHoverBgExplicitUnresolvable
              ? null
              : darkBg);
          if (effT && effB) checkPair(effT, effB, DARK_PALETTE, "dark-pinned hover");
        }
      } else {
        // Dual Theme publikus oldalak: 1) Luminous Daylight (base), 2) Luminous Slate (dark:)
        const lightBg = colors.baseBgExplicitUnresolvable ? null : colors.baseBg;
        if (colors.baseText && lightBg) {
          checkPair(colors.baseText, lightBg, LIGHT_PALETTE, "light alap");
        }
        if (colors.hoverText || colors.hoverBg) {
          const effT = colors.hoverText || colors.baseText;
          const effB = colors.hoverBgExplicitUnresolvable
            ? null
            : colors.hoverBg || lightBg;
          if (effT && effB) checkPair(effT, effB, LIGHT_PALETTE, "light hover");
        }

        const effectiveDarkText =
          colors.darkText ||
          (colors.darkTextExplicitUnresolvable ? null : colors.baseText);
        const effectiveDarkBg =
          colors.darkBg ||
          (colors.darkBgExplicitUnresolvable || colors.baseBgExplicitUnresolvable
            ? null
            : colors.baseBg);

        if (effectiveDarkText && effectiveDarkBg) {
          checkPair(effectiveDarkText, effectiveDarkBg, DARK_PALETTE, "dark alap");
        }

        const hasDarkHoverSignal =
          colors.darkHoverText ||
          colors.darkHoverBg ||
          colors.hoverText ||
          colors.hoverBg;
        if (hasDarkHoverSignal) {
          const effHoverT =
            colors.darkHoverText ||
            (colors.darkHoverTextExplicitUnresolvable
              ? null
              : colors.hoverText || effectiveDarkText);
          const effHoverB =
            colors.darkHoverBg ||
            (colors.darkHoverBgExplicitUnresolvable || colors.hoverBgExplicitUnresolvable
              ? null
              : colors.hoverBg || effectiveDarkBg);
          if (effHoverT && effHoverB) {
            checkPair(effHoverT, effHoverB, DARK_PALETTE, "dark hover");
          }
        }
      }
    }
  });
}

console.log("=== WCAG AA DUAL-THEME KONTRASZT AUDIT (text/bg parosok) ===");
console.log("Vizsgalt fajlok: " + auditedCount);
console.log("Talalt problema: " + findings.length);
console.log("");
for (const item of findings) {
  console.log(
    item.ratio.toFixed(2) +
      ":1  [" +
      item.state +
      "]  " +
      item.pair +
      "  ->  " +
      item.file +
      ":" +
      item.line
  );
}
