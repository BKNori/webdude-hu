import {
  SUPERADMIN_EMAIL,
  hasToolAccess,
  isSuperAdmin,
  normalizeToolIds,
} from "../tool-access-policy";
import { AI_TOOL_CATALOG, isKnownAiTool } from "@/data/ai-tools-catalog";
import {
  DESIGN_STYLE_PRESETS,
  resolvePresetHints,
} from "@/lib/workshop-presets";

describe("tool-access-policy (RBAC SSOT)", () => {
  describe("isSuperAdmin", () => {
    it("elutasítja a null / undefined / vendég alanyt", () => {
      expect(isSuperAdmin(null)).toBe(false);
      expect(isSuperAdmin(undefined)).toBe(false);
      expect(isSuperAdmin({})).toBe(false);
      expect(isSuperAdmin({ email: "ugyfel@pelda.hu", role: "client" })).toBe(
        false
      );
    });

    it("elfogadja a hello@webdude.hu e-mailt (kis/nagybetű és szóköz tűréssel)", () => {
      expect(isSuperAdmin({ email: SUPERADMIN_EMAIL })).toBe(true);
      expect(isSuperAdmin({ email: "  HELLO@WEBDUDE.HU " })).toBe(true);
    });

    it("elfogadja a role === 'admin' és az isAdmin === true jelzést", () => {
      expect(isSuperAdmin({ email: "admin2@pelda.hu", role: "admin" })).toBe(
        true
      );
      expect(isSuperAdmin({ email: "claim@pelda.hu", isAdmin: true })).toBe(
        true
      );
    });
  });

  describe("normalizeToolIds", () => {
    it("string és tömb bemenetet is tisztított tömbbé alakít", () => {
      expect(normalizeToolIds(" logo_ai_muhely ")).toEqual(["logo_ai_muhely"]);
      expect(normalizeToolIds(["banner_ai_muhely", "  ", ""])).toEqual([
        "banner_ai_muhely",
      ]);
    });
  });

  describe("hasToolAccess (3-szintű hozzáférési mátrix)", () => {
    it("1. Vendég (nincs bejelentkezve) -> mindig false", () => {
      expect(hasToolAccess(null, "logo_ai_muhely")).toBe(false);
      expect(hasToolAccess(undefined, "logo_ai_muhely")).toBe(false);
    });

    it("2. Bejelentkezett ügyfél allowedTools nélkül vagy más modullal -> false", () => {
      expect(
        hasToolAccess(
          { email: "ugyfel@ceg.hu", role: "client", allowedTools: [] },
          "logo_ai_muhely"
        )
      ).toBe(false);
      expect(
        hasToolAccess(
          {
            email: "ugyfel@ceg.hu",
            role: "client",
            allowedTools: ["banner_ai_muhely"],
          },
          "logo_ai_muhely"
        )
      ).toBe(false);
      expect(
        hasToolAccess(
          { email: "ugyfel@ceg.hu", role: "client", allowedTools: null },
          "logo_ai_muhely"
        )
      ).toBe(false);
    });

    it("2b. Bejelentkezett ügyfél üres modul-listára -> fail-closed (false)", () => {
      expect(
        hasToolAccess(
          {
            email: "ugyfel@ceg.hu",
            role: "client",
            allowedTools: ["logo_ai_muhely"],
          },
          []
        )
      ).toBe(false);
    });

    it("2c. Bejelentkezett ügyfél pontos allowedTools egyezéssel -> true", () => {
      expect(
        hasToolAccess(
          {
            email: "ugyfel@ceg.hu",
            role: "client",
            allowedTools: ["logo_ai_muhely"],
          },
          "logo_ai_muhely"
        )
      ).toBe(true);
      expect(
        hasToolAccess(
          {
            email: "ugyfel@ceg.hu",
            role: "client",
            allowedTools: ["tartalomtervezo_ai_muhely"],
          },
          ["content_workshop_ai_muhely", "tartalomtervezo_ai_muhely"]
        )
      ).toBe(true);
    });

    it("3. Szuperadmin -> 100% bypass üres allowedTools és üres toolIds mellett is", () => {
      expect(
        hasToolAccess(
          { email: "hello@webdude.hu", role: "client", allowedTools: [] },
          "logo_ai_muhely"
        )
      ).toBe(true);
      expect(
        hasToolAccess(
          { email: "masik@webdude.hu", role: "admin", allowedTools: [] },
          []
        )
      ).toBe(true);
    });
  });

  describe("AI_TOOL_CATALOG SSOT integritás", () => {
    it("tartalmazza az összes publikus /termekek/* és Pro Prompt Stúdió modul ID-t", () => {
      const requiredIds = [
        "logo_ai_muhely",
        "banner_ai_muhely",
        "midjourney_ai_muhely",
        "seo_audit_ai_muhely",
        "szezonalis_ai_muhely",
        "tartalomtervezo_ai_muhely",
        "ui_ux_ai_muhely",
        "versenytars_elemzo_ai_muhely",
        "kristofka_workflow",
        "online_graphics_prompt_studio",
        "offline_print_prompt_studio",
        "apparel_merch_prompt_studio",
        "software_arch_prompt_studio",
        "analysis_audit_prompt_studio",
      ];
      for (const id of requiredIds) {
        expect(isKnownAiTool(id)).toBe(true);
      }
      expect(AI_TOOL_CATALOG.length).toBeGreaterThanOrEqual(requiredIds.length);
      expect(isKnownAiTool("nem_letezo_modul")).toBe(false);
      expect(resolvePresetHints(null, DESIGN_STYLE_PRESETS)).toBeUndefined();
      expect(resolvePresetHints("unknown", DESIGN_STYLE_PRESETS)).toBeUndefined();
      expect(
        resolvePresetHints(DESIGN_STYLE_PRESETS[0]!.id, DESIGN_STYLE_PRESETS)
      ).toContain(DESIGN_STYLE_PRESETS[0]!.promptHint);
    });
  });
});
