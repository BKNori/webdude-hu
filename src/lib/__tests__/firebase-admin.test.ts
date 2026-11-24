/**
 * @jest-environment node
 */
const ENV_KEYS = [
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "FIREBASE_ADMIN_CLIENT_EMAIL",
  "FIREBASE_ADMIN_PRIVATE_KEY",
] as const;

const getApps = jest.fn();
const initializeApp = jest.fn();
const cert = jest.fn((k: unknown) => k);
const getFirestore = jest.fn(() => ({ kind: "db" }));
const getStorage = jest.fn(() => ({ kind: "storage" }));

jest.mock("firebase-admin/app", () => ({
  getApps: (...a: unknown[]) => getApps(...a),
  initializeApp: (...a: unknown[]) => initializeApp(...a),
  cert: (key: unknown) => cert(key),
}));
jest.mock("firebase-admin/firestore", () => ({
  getFirestore: () => getFirestore(),
}));
jest.mock("firebase-admin/storage", () => ({
  getStorage: () => getStorage(),
}));

type AdminModule = typeof import("../firebase-admin");

async function load(withCreds: boolean): Promise<AdminModule> {
  for (const k of ENV_KEYS) delete process.env[k];
  if (withCreds) {
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = "proj";
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL = "a@b.c";
    process.env.FIREBASE_ADMIN_PRIVATE_KEY = "line1\\nline2";
  }
  let mod!: AdminModule;
  await jest.isolateModulesAsync(async () => {
    mod = await import("../firebase-admin");
  });
  return mod;
}

describe("firebase-admin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "warn").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });
  afterAll(() => jest.restoreAllMocks());

  it("exports null handles without credentials", async () => {
    const mod = await load(false);
    expect(mod.adminApp).toBeUndefined();
    expect(mod.adminDb).toBeNull();
    expect(mod.adminStorage).toBeNull();
  });

  it("initialises a new app when none exists", async () => {
    getApps.mockReturnValue([]);
    initializeApp.mockReturnValue({ name: "new" });
    const mod = await load(true);
    expect(initializeApp).toHaveBeenCalledTimes(1);
    expect(cert).toHaveBeenCalledWith(
      expect.objectContaining({ privateKey: "line1\nline2" })
    );
    expect(mod.adminApp).toEqual({ name: "new" });
    expect(mod.adminDb).toEqual({ kind: "db" });
    expect(mod.adminStorage).toEqual({ kind: "storage" });
  });

  it("reuses an existing app", async () => {
    getApps.mockReturnValue([{ name: "existing" }]);
    const mod = await load(true);
    expect(initializeApp).not.toHaveBeenCalled();
    expect(mod.adminApp).toEqual({ name: "existing" });
  });

  it("falls back to null handles when initialisation throws", async () => {
    getApps.mockReturnValue([]);
    initializeApp.mockImplementation(() => {
      throw new Error("bad key");
    });
    expect((await load(true)).adminDb).toBeNull();
    initializeApp.mockImplementation(() => {
      throw "string failure";
    });
    expect((await load(true)).adminStorage).toBeNull();
  });
});
