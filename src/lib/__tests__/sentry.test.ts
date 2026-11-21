import type { ErrorEvent, EventHint } from "@sentry/nextjs";
import {
  buildBaseSentryOptions,
  getSentryDsn,
  sanitizeRecord,
  scrubSensitiveString,
  sentryBeforeSend,
} from "@/lib/sentry";
import { logger } from "@/lib/logger";

describe("Sentry konfiguráció és adatvédelmi szűrők", () => {
  const origEnv = process.env;

  beforeEach(() => {
    process.env = { ...origEnv };
    delete process.env.NEXT_PUBLIC_SENTRY_DSN;
    delete process.env.SENTRY_DSN;
  });

  afterAll(() => {
    process.env = origEnv;
  });

  it("hiányzó vagy üres DSN esetén csendesen inaktív marad", () => {
    expect(getSentryDsn(false)).toBeUndefined();
    expect(getSentryDsn(true)).toBeUndefined();

    process.env.NEXT_PUBLIC_SENTRY_DSN = "   ";
    const opts = buildBaseSentryOptions({ isServer: false });
    expect(opts.enabled).toBe(false);
    expect(opts.dsn).toBeUndefined();
    expect(opts.sendDefaultPii).toBe(false);
  });

  it("különválasztja a publikus és a szerveroldali DSN-t, prod-ban 0.1 tracesSampleRate-tel", () => {
    process.env.NEXT_PUBLIC_SENTRY_DSN = "https://public@example.ingest.sentry.io/1";
    process.env.SENTRY_DSN = "https://server@example.ingest.sentry.io/2";
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";

    const clientOpts = buildBaseSentryOptions({ isServer: false });
    const serverOpts = buildBaseSentryOptions({ isServer: true });

    expect(clientOpts.enabled).toBe(true);
    expect(clientOpts.dsn).toBe("https://public@example.ingest.sentry.io/1");
    expect(clientOpts.tracesSampleRate).toBe(0.1);
    expect(serverOpts.dsn).toBe("https://server@example.ingest.sentry.io/2");
    expect(serverOpts.tracesSampleRate).toBe(0.1);
  });

  it("kimaszkolja a tokeneket, API kulcsokat és PII mezőket", () => {
    const scrubbed = scrubSensitiveString(
      "Authorization Bearer abcdef123456 with AIzaSyDummyFirebaseKey1234567890 for user@example.com?token=secret99"
    );
    expect(scrubbed).not.toContain("abcdef123456");
    expect(scrubbed).not.toContain("AIzaSyDummyFirebaseKey1234567890");
    expect(scrubbed).not.toContain("user@example.com");
    expect(scrubbed).not.toContain("secret99");

    const sanitized = sanitizeRecord({
      apiKey: "super-secret",
      nested: { password: "123", note: "Reach out to admin@webdude.hu" },
      safeCount: 42,
    });
    expect(sanitized.apiKey).toBe("[REDACTED]");
    expect((sanitized.nested as Record<string, unknown>).password).toBe("[REDACTED]");
    expect((sanitized.nested as Record<string, unknown>).note).toBe(
      "Reach out to [REDACTED_EMAIL]"
    );
    expect(sanitized.safeCount).toBe(42);
  });

  it("beforeSend eldobja a zajos ResizeObserver hibákat és törli az auth fejlécet + user PII-t", () => {
    const noisyEvent = {
      message: "ResizeObserver loop limit exceeded",
    } as ErrorEvent;
    expect(sentryBeforeSend(noisyEvent, {} as EventHint)).toBeNull();

    const realEvent = {
      message: "Failed calling endpoint Bearer secretTokenValue",
      user: {
        id: "uid-1",
        email: "client@example.com",
        ip_address: "192.0.2.1",
      },
      request: {
        headers: {
          Authorization: "Bearer superSecretJwtToken",
          Cookie: "session=xyz",
          "User-Agent": "TestAgent",
        },
        data: { rawPassword: "abc" },
      },
      extra: { apiKey: "secret-api-key", route: "/api/chat" },
    } as unknown as ErrorEvent;

    const filtered = sentryBeforeSend(realEvent, {} as EventHint);
    expect(filtered).not.toBeNull();
    expect(filtered?.message).not.toContain("secretTokenValue");
    expect(filtered?.user?.email).toBeUndefined();
    expect(filtered?.user?.ip_address).toBeUndefined();
    expect(filtered?.request?.headers?.Authorization).toBe("[REDACTED]");
    expect(filtered?.request?.headers?.Cookie).toBe("[REDACTED]");
    expect(filtered?.request?.data).toBe("[REDACTED]");
    expect(filtered?.extra?.apiKey).toBe("[REDACTED]");
    expect(filtered?.extra?.route).toBe("/api/chat");
  });

  it("logger.error biztonságosan fut DSN nélkül is", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      logger.error("Teszt hiba", new Error("Valami hiba Bearer xyz123"), {
        layer: "ApiRoutes",
        meta: { authorization: "secret" },
      })
    ).not.toThrow();

    expect(spy).toHaveBeenCalledTimes(1);
    const loggedJson = spy.mock.calls[0][0] as string;
    expect(loggedJson).not.toContain("xyz123");
    expect(loggedJson).toContain("[REDACTED]");
    spy.mockRestore();
  });
});
