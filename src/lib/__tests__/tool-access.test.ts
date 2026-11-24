import { authorizeToolAccess, TOOL_ACCESS_ERRORS } from "../tool-access";
import { verifyUserToken, getClientUserProfileAction } from "@/actions/portal";

jest.mock("@/actions/portal", () => ({
  verifyUserToken: jest.fn(),
  getClientUserProfileAction: jest.fn(),
}));

const mockedVerify = verifyUserToken as jest.MockedFunction<
  typeof verifyUserToken
>;
const mockedProfile = getClientUserProfileAction as jest.MockedFunction<
  typeof getClientUserProfileAction
>;

describe("authorizeToolAccess (Server Action RBAC őr)", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("üres vagy nem string idToken esetén azonnal UNAUTHENTICATED-del elutasít", async () => {
    expect(await authorizeToolAccess("", "logo_ai_muhely")).toEqual({
      ok: false,
      code: "UNAUTHENTICATED",
      error: TOOL_ACCESS_ERRORS.UNAUTHENTICATED,
    });
    expect(await authorizeToolAccess(null, "logo_ai_muhely")).toEqual({
      ok: false,
      code: "UNAUTHENTICATED",
      error: TOOL_ACCESS_ERRORS.UNAUTHENTICATED,
    });
    expect(mockedVerify).not.toHaveBeenCalled();
  });

  it("érvénytelen vagy lejárt idToken esetén UNAUTHENTICATED-del elutasít", async () => {
    mockedVerify.mockResolvedValue(null);
    const res = await authorizeToolAccess("bad-token", "logo_ai_muhely");
    expect(res).toEqual({
      ok: false,
      code: "UNAUTHENTICATED",
      error: TOOL_ACCESS_ERRORS.UNAUTHENTICATED,
    });
    expect(mockedProfile).not.toHaveBeenCalled();
  });

  it("hello@webdude.hu szuperadmint profil-lekérés nélkül is átengedi", async () => {
    mockedVerify.mockResolvedValue({
      uid: "admin-1",
      email: "hello@webdude.hu",
      isAdmin: true,
    });
    const res = await authorizeToolAccess("valid-admin-token", "logo_ai_muhely");
    expect(res).toEqual({
      ok: true,
      user: { uid: "admin-1", email: "hello@webdude.hu", isAdmin: true },
    });
    expect(mockedProfile).not.toHaveBeenCalled();
  });

  it("bejelentkezett ügyfelet allowedTools jogosultság nélkül FORBIDDEN-nel elutasít", async () => {
    mockedVerify.mockResolvedValue({
      uid: "u-1",
      email: "ugyfel@pelda.hu",
      isAdmin: false,
    });
    mockedProfile.mockResolvedValue({
      success: true,
      profile: {
        uid: "u-1",
        email: "ugyfel@pelda.hu",
        name: "Teszt Ügyfél",
        role: "client",
        allowedTools: ["banner_ai_muhely"],
      },
    });
    const res = await authorizeToolAccess("client-token", "logo_ai_muhely");
    expect(res).toEqual({
      ok: false,
      code: "FORBIDDEN",
      error: TOOL_ACCESS_ERRORS.FORBIDDEN,
    });
  });

  it("sikertelen profil-lekérésnél fail-closed módon FORBIDDEN-nel elutasít", async () => {
    mockedVerify.mockResolvedValue({
      uid: "u-2",
      email: "ugyfel2@pelda.hu",
      isAdmin: false,
    });
    mockedProfile.mockResolvedValue({
      success: false,
      error: "Firestore hiba",
    });
    const res = await authorizeToolAccess("client-token", "logo_ai_muhely");
    expect(res.ok).toBe(false);
  });

  it("engedélyezett allowedTools modullal rendelkező ügyfelet átengedi", async () => {
    mockedVerify.mockResolvedValue({
      uid: "u-3",
      email: "vip@pelda.hu",
      isAdmin: false,
    });
    mockedProfile.mockResolvedValue({
      success: true,
      profile: {
        uid: "u-3",
        email: "vip@pelda.hu",
        name: "VIP Ügyfél",
        role: "client",
        allowedTools: ["logo_ai_muhely"],
      },
    });
    const res = await authorizeToolAccess("vip-token", "logo_ai_muhely");
    expect(res).toEqual({
      ok: true,
      user: { uid: "u-3", email: "vip@pelda.hu", isAdmin: false },
    });
  });

  it("Firestore role === 'admin' profilú felhasználót üres allowedTools mellett is átengedi", async () => {
    mockedVerify.mockResolvedValue({
      uid: "u-admin",
      email: "roleadmin@pelda.hu",
      isAdmin: false,
    });
    mockedProfile.mockResolvedValue({
      success: true,
      profile: {
        uid: "u-admin",
        email: "roleadmin@pelda.hu",
        role: "admin",
        allowedTools: [],
      },
    });
    const res = await authorizeToolAccess("role-admin-token", "logo_ai_muhely");
    expect(res).toEqual({
      ok: true,
      user: { uid: "u-admin", email: "roleadmin@pelda.hu", isAdmin: true },
    });
  });
});
