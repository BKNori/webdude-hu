import { logger } from "../logger";

describe("logger", () => {
  const originalEnv = process.env.NODE_ENV;
  afterEach(() => {
    jest.restoreAllMocks();
    (process.env as Record<string, string | undefined>).NODE_ENV = originalEnv;
  });

  it("info/warn write structured JSON", () => {
    const log = jest.spyOn(console, "log").mockImplementation(() => undefined);
    const warn = jest.spyOn(console, "warn").mockImplementation(() => undefined);
    logger.info("hello", { layer: "ServerActions", meta: { a: 1 } });
    logger.warn("careful", { layer: "ApiRoutes" });
    const first = JSON.parse(log.mock.calls[0][0] as string);
    expect(first).toMatchObject({ level: "INFO", layer: "ServerActions", message: "hello", meta: { a: 1 } });
    expect(JSON.parse(warn.mock.calls[0][0] as string).meta).toEqual({});
  });

  it("debug is silent in production only", () => {
    const debug = jest.spyOn(console, "debug").mockImplementation(() => undefined);
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    logger.debug("x", { layer: "Firestore" });
    expect(debug).not.toHaveBeenCalled();
    (process.env as Record<string, string | undefined>).NODE_ENV = "development";
    logger.debug("x", { layer: "Firestore" });
    expect(debug).toHaveBeenCalledTimes(1);
  });

  it("error handles Error, non-Error, undefined and default options", () => {
    const err = jest.spyOn(console, "error").mockImplementation(() => undefined);
    logger.error("boom", new Error("bad"), { layer: "Firestore", meta: { k: "v" } });
    logger.error("str", "plain");
    logger.error("none");
    const [a, b, c] = err.mock.calls.map((x) => JSON.parse(x[0] as string));
    expect(a.meta.error).toBe("bad");
    expect(typeof a.meta.stack).toBe("string");
    expect(a.meta.k).toBe("v");
    expect(b.meta).toEqual({ error: "plain" });
    expect(c.meta).toEqual({});
    expect(c.layer).toBe("ErrorHandling");
  });
});
