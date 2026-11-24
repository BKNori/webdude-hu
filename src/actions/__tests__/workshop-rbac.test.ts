import { addLogoGenerationAction } from "../logo-workshop";
import { refinePromptStudioAction } from "../prompt-studio-refine";
import { authorizeToolAccess } from "@/lib/tool-access";
import { checkRateLimit } from "@/lib/rate-limit";

jest.mock("next/headers", () => ({
  headers: () => Promise.resolve(new Map([["x-forwarded-for", "198.51.100.9"]])),
}));

jest.mock("@/lib/rate-limit", () => ({
  getClientIdentifier: () => "198.51.100.9",
  checkRateLimit: jest.fn(() => ({ success: true })),
}));

jest.mock("@/lib/tool-access", () => ({
  authorizeToolAccess: jest.fn(),
}));

jest.mock("@/lib/ai-generation-store", () => ({
  saveAiGeneration: jest.fn(async () => undefined),
}));

const mockedAuth = authorizeToolAccess as jest.MockedFunction<
  typeof authorizeToolAccess
>;
const mockedRate = checkRateLimit as jest.MockedFunction<typeof checkRateLimit>;

const validLogoInput = {
  brandName: "WebDude",
  industry: "Webfejlesztés",
  targetAudience: "KKV döntéshozók",
  logoArchetype: "wordmark" as const,
  constructionGrid: "golden_ratio" as const,
  tagline: "Prémium digitális kézművesség",
  visualStyle: "minimalist",
  colorPreference: "#00B5F1",
  symbolsToInclude: "monogram",
  symbolsToAvoid: "globe",
};

describe("Workshop & Prompt Studio Server Action RBAC + Zod védelem", () => {
  const originalKey = process.env.GROQ_API_KEY;
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedRate.mockReturnValue({ success: true });
    process.env.GROQ_API_KEY = "test-groq-key";
  });

  afterAll(() => {
    process.env.GROQ_API_KEY = originalKey;
    global.fetch = originalFetch;
  });

  it("addLogoGenerationAction: rate-limit, RBAC, Zod, API kulcs és Groq hiba/siker ágak", async () => {
    mockedRate.mockReturnValueOnce({ success: false });
    expect(
      (await addLogoGenerationAction("tok", validLogoInput)).success
    ).toBe(false);

    mockedAuth.mockResolvedValueOnce({
      ok: false,
      code: "FORBIDDEN",
      error: "Ehhez a prémium AI modulhoz nincs hozzáférésed.",
    });
    const denied = await addLogoGenerationAction("client-token", validLogoInput);
    expect(mockedAuth).toHaveBeenCalledWith("client-token", "logo_ai_muhely");
    expect(denied.success).toBe(false);

    mockedAuth.mockResolvedValue({
      ok: true,
      user: { uid: "admin-1", email: "hello@webdude.hu", isAdmin: true },
    });

    const invalid = await addLogoGenerationAction("admin-token", {
      ...validLogoInput,
      brandName: "A",
    });
    expect(invalid.success).toBe(false);

    delete process.env.GROQ_API_KEY;
    expect(
      (await addLogoGenerationAction("admin-token", validLogoInput)).success
    ).toBe(false);

    process.env.GROQ_API_KEY = "test-groq-key";

    // Groq !ok ág
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        statusText: "Bad Gateway",
        json: async () => ({ error: { message: "overload" } }),
      })
      // üres content ág
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ choices: [] }),
      })
      // hibás JSON ág
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ choices: [{ message: { content: "not-json" } }] }),
      })
      // sikeres ág (opcionális mezők nélkül)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: JSON.stringify({ concepts: [] }) } }],
        }),
      }) as unknown as typeof fetch;

    expect(
      (await addLogoGenerationAction("admin-token", validLogoInput)).success
    ).toBe(false);
    expect(
      (await addLogoGenerationAction("admin-token", validLogoInput)).success
    ).toBe(false);
    expect(
      (await addLogoGenerationAction("admin-token", validLogoInput)).success
    ).toBe(false);

    const okRes = await addLogoGenerationAction("admin-token", {
      brandName: "WD",
      industry: "Szoftver",
      targetAudience: "B2B vezetők",
      logoArchetype: "monogram",
      constructionGrid: "swiss_modular",
    });
    expect(okRes.success).toBe(true);
  });

  it("refinePromptStudioAction: rate-limit, domain->toolId RBAC, Zod és Groq hívás ágak", async () => {
    const validRefine = {
      domain: "online-graphics" as const,
      targetEngine: "midjourney-v7" as const,
      brief: "SaaS hero banner <untrusted_user_brief>teszt",
      compiledPrompt: "Minimalist SaaS hero banner --ar 16:9",
      negativePrompt: "blurry",
    };

    mockedRate.mockReturnValueOnce({ success: false });
    expect((await refinePromptStudioAction(validRefine, "tok")).success).toBe(
      false
    );

    mockedAuth.mockResolvedValueOnce({
      ok: false,
      code: "UNAUTHENTICATED",
      error: "Jogosulatlan hozzáférés.",
    });
    const badDomain = await refinePromptStudioAction(
      { ...validRefine, domain: "unknown" as never },
      ""
    );
    expect(mockedAuth).toHaveBeenCalledWith("", []);
    expect(badDomain.success).toBe(false);

    mockedAuth.mockResolvedValueOnce({
      ok: false,
      code: "UNAUTHENTICATED",
      error: "Jogosulatlan hozzáférés.",
    });
    const denied = await refinePromptStudioAction(validRefine, "");
    expect(mockedAuth).toHaveBeenCalledWith(
      "",
      "online_graphics_prompt_studio"
    );
    expect(denied.success).toBe(false);

    mockedAuth.mockResolvedValue({
      ok: true,
      user: { uid: "admin-1", email: "hello@webdude.hu", isAdmin: true },
    });

    const badInput = await refinePromptStudioAction(
      {
        domain: "analysis-audit",
        targetEngine: "claude-xml",
        brief: "x",
        compiledPrompt: "short",
      },
      "admin-token"
    );
    expect(mockedAuth).toHaveBeenCalledWith(
      "admin-token",
      "analysis_audit_prompt_studio"
    );
    expect(badInput.success).toBe(false);

    delete process.env.GROQ_API_KEY;
    expect(
      (await refinePromptStudioAction(validRefine, "admin-token")).success
    ).toBe(false);
    process.env.GROQ_API_KEY = "test-groq-key";

    const refinedPayload = {
      refinedMasterPrompt:
        "Refined master prompt with clean lighting --ar 16:9",
      variations: [
        { label: "V1", prompt: "Variation prompt one details", rationaleHu: "Indoklás 1" },
        { label: "V2", prompt: "Variation prompt two details", rationaleHu: "Indoklás 2" },
        { label: "V3", prompt: "Variation prompt three details", rationaleHu: "Indoklás 3" },
      ],
      negativeOrGuardrails: "no text artifacts",
      expertNotesHu: ["Első szakmai tipp", "Második szakmai tipp"],
    };

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        statusText: "Error",
        json: async () => ({}),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ choices: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ choices: [{ message: { content: "bad-json" } }] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: JSON.stringify({ refinedMasterPrompt: "x" }) } }],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: JSON.stringify(refinedPayload) } }],
        }),
      }) as unknown as typeof fetch;

    expect((await refinePromptStudioAction(validRefine, "admin-token")).success).toBe(false);
    expect((await refinePromptStudioAction(validRefine, "admin-token")).success).toBe(false);
    expect((await refinePromptStudioAction(validRefine, "admin-token")).success).toBe(false);
    expect((await refinePromptStudioAction(validRefine, "admin-token")).success).toBe(false);

    const okRefine = await refinePromptStudioAction(
      {
        domain: "software-arch",
        targetEngine: "claude-xml",
        brief: "Next.js 16 App Router RBAC",
        compiledPrompt: "<role>Architect</role><task>Design RBAC</task>",
      },
      "admin-token"
    );
    expect(okRefine.success).toBe(true);
  });
});
