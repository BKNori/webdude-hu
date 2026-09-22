/**
 * WCAG 2.1 AA kontraszt-audit (4.5:1 normál szöveg).
 *
 * A `className` stringeken belül megkeresi azokat az elemeket, amelyek EGYIDEJŰLEG
 * definiálnak szövegszínt (`text-*`, `placeholder-*`) és háttérszínt (`bg-*`),
 * majd kiszámolja a WCAG kontrasztarányt. A self-contained párokból biztonsággal
 * megállapítható a megfelelés, mert nem függenek a szülő háttérszínétől.
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
const SKIP_PATH_PARTS = ["\\admin\\", "\\_mentesek\\"];

const PALETTE = {
  "bg-base": "#020617",
  "bg-card": "#0f172a",
  "bg-surface": "#0f172a",
  "bg-elevated": "#1e293b",
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
    100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af",
    500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937",
    900: "#111827", 950: "#030712",
  },
  sky: { 400: "#38bdf8", 500: "#0ea5e9", 600: "#0284c7" },
  emerald: { 400: "#34d399", 500: "#10b981" },
  red: { 400: "#f87171", 500: "#ef4444" },
  amber: { 400: "#fbbf24", 500: "#f59e0b" },
  violet: { 500: "#8b5cf6", 600: "#7c3aed" },
};

/** Tailwind szín token feloldása hexadecimális értékre. */
function resolveColor(token) {
  if (PALETTE[token]) return PALETTE[token];
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


/** Osztálylista feldolgozása: kigyűjti a text/bg színeket variánsonként. */
function extractColors(classString) {
  const tokens = classString
    .replace(/\$\{[^}]*\}/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const result = { baseText: null, baseBg: null, hoverText: null, hoverBg: null };

  for (const raw of tokens) {
    const token = raw.split(":").pop();
    const isHover = raw.startsWith("hover:");
    let textToken = null;
    let bgToken = null;

    if (token.startsWith("text-")) {
      const candidate = token.slice(5);
      if (candidate !== "transparent" && resolveColor(candidate)) {
        textToken = candidate;
      }
    } else if (token.startsWith("placeholder-")) {
      const candidate = token.slice(12);
      if (resolveColor(candidate)) textToken = candidate;
    } else if (token.startsWith("bg-")) {
      const candidate = token.slice(3);
      if (
        candidate !== "transparent" &&
        !candidate.startsWith("gradient") &&
        !candidate.startsWith("clip") &&
        resolveColor(candidate)
      ) {
        bgToken = candidate;
      }
    }

    if (textToken) {
      if (isHover) result.hoverText = textToken;
      else if (!result.baseText) result.baseText = textToken;
    }
    if (bgToken) {
      if (isHover) result.hoverBg = bgToken;
      else if (!result.baseBg) result.baseBg = bgToken;
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

for (const file of files) {
  if (SKIP_PATH_PARTS.some((part) => file.includes(part))) continue;

  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    const literals = line.match(/"[^"]*"|`[^`]*`|'[^']*'/g);
    if (!literals) return;

    for (const literal of literals) {
      const colors = extractColors(literal.replace(/^["'`]|["'`]$/g, ""));
      if (!colors.baseText || !colors.baseBg) continue;

      const baseRatio = contrastRatio(
        resolveColor(colors.baseText),
        resolveColor(colors.baseBg)
      );
      if (baseRatio < 4.5) {
        findings.push({
          file: path.relative(ROOT, file),
          line: index + 1,
          state: "alap",
          pair: colors.baseText + " / " + colors.baseBg,
          ratio: baseRatio,
        });
      }

      if (colors.hoverText || colors.hoverBg) {
        const hoverRatio = contrastRatio(
          resolveColor(colors.hoverText || colors.baseText),
          resolveColor(colors.hoverBg || colors.baseBg)
        );
        if (hoverRatio < 4.5) {
          findings.push({
            file: path.relative(ROOT, file),
            line: index + 1,
            state: "hover",
            pair:
              (colors.hoverText || colors.baseText) +
              " / " +
              (colors.hoverBg || colors.baseBg),
            ratio: hoverRatio,
          });
        }
      }
    }
  });
}

console.log("=== WCAG AA KONTRASZT AUDIT (text/bg parosok) ===");
console.log("Vizsgalt fajlok: " + files.length);
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
