import hu from "@/dictionaries/hu.json";
import en from "@/dictionaries/en.json";

function collectKeys(obj: unknown, prefix = ""): string[] {
  if (obj === null || typeof obj !== "object") return [];
  if (Array.isArray(obj)) {
    return [
      `${prefix}#length=${obj.length}`,
      ...obj.flatMap((item, i) => collectKeys(item, `${prefix}[${i}]`)),
    ];
  }
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) => {
    const nextPrefix = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object") {
      return collectKeys(v, nextPrefix);
    }
    return [nextPrefix];
  });
}

describe("i18n Dictionary parity (hu.json <-> en.json)", () => {
  it("has identical key structure and array lengths in hu.json and en.json", () => {
    const huKeys = collectKeys(hu).sort();
    const enKeys = collectKeys(en).sort();
    expect(enKeys).toEqual(huKeys);
  });

  it("does not contain Hungarian accented characters in en.json (except whitelisted proper nouns)", () => {
    const whitelist = ["Balog Norbert", "Kecskemét", "Balog Norbi", "WebDude"];
    const check = (obj: unknown, path = ""): string[] => {
      if (typeof obj === "string") {
        let stripped = obj;
        for (const term of whitelist) {
          stripped = stripped.split(term).join("");
        }
        return /[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/.test(stripped) ? [`${path}: ${obj}`] : [];
      }
      if (Array.isArray(obj)) {
        return obj.flatMap((item, i) => check(item, `${path}[${i}]`));
      }
      if (obj !== null && typeof obj === "object") {
        return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
          check(v, path ? `${path}.${k}` : k)
        );
      }
      return [];
    };

    expect(check(en)).toEqual([]);
  });
});
