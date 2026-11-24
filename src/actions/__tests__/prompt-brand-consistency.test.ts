/**
 * @jest-environment node
 */
import fs from "fs";
import path from "path";

const ROOT = path.join(__dirname, "..", "..", "..");
const ACTIONS_DIR = path.join(ROOT, "src", "actions");
const FORBIDDEN = /cyber[-_\s\u2011]?(gold|arany)/i;
/** Backwards-compatible input alias for old clients is explicitly marked. */
const ALIAS_MARKER = "LEGACY_BRAND_VIBE_ALIAS";

function collectFiles(): string[] {
  const actionFiles = fs
    .readdirSync(ACTIONS_DIR)
    .filter((f) => f.endsWith(".ts"))
    .map((f) => path.join(ACTIONS_DIR, f));
  return [...actionFiles, path.join(ROOT, "src", "lib", "ai-tools.ts")];
}

describe("AI prompt brand consistency (Kék-Lila v7.2 Dual Theme)", () => {
  it.each(collectFiles().map((f) => [path.relative(ROOT, f), f]))(
    "%s contains no legacy Cyber-Gold / Cyber-Arany references",
    (_name, file) => {
      const offending = fs
        .readFileSync(file, "utf8")
        .split(/\r?\n/)
        .filter((line) => !line.includes(ALIAS_MARKER))
        .filter((line) => FORBIDDEN.test(line));
      expect(offending).toEqual([]);
    }
  );
});
