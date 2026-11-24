import { renderHook, waitFor } from "@testing-library/react";
import { useToolAccess } from "../useToolAccess";
import { getClientUserProfileAction } from "@/actions/portal";

type AuthCallback = (user: {
  email: string;
  getIdToken: () => Promise<string>;
} | null) => void;

let mockAuthRef: {
  onAuthStateChanged: (cb: AuthCallback) => () => void;
} | null = null;

jest.mock("@/lib/firebase", () => ({
  get auth() {
    return mockAuthRef;
  },
}));

jest.mock("@/actions/portal", () => ({
  getClientUserProfileAction: jest.fn(),
}));

const mockedProfile = getClientUserProfileAction as jest.MockedFunction<
  typeof getClientUserProfileAction
>;

describe("useToolAccess hook", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockAuthRef = null;
  });

  it("ha a Firebase Auth nincs inicializálva (null), guest állapotra vált", async () => {
    mockAuthRef = null;
    const { result, unmount } = renderHook(() =>
      useToolAccess("logo_ai_muhely")
    );
    await waitFor(() => expect(result.current).toBe("guest"));
    unmount();
  });

  it("ha nincs bejelentkezett felhasználó, guest állapotot ad vissza", async () => {
    const unsub = jest.fn();
    mockAuthRef = {
      onAuthStateChanged: (cb) => {
        cb(null);
        return unsub;
      },
    };
    const { result, unmount } = renderHook(() =>
      useToolAccess(["logo_ai_muhely", "banner_ai_muhely"])
    );
    await waitFor(() => expect(result.current).toBe("guest"));
    unmount();
    expect(unsub).toHaveBeenCalledTimes(1);
  });

  it("jogosult ügyfél esetén granted állapotot ad vissza", async () => {
    mockedProfile.mockResolvedValue({
      success: true,
      profile: {
        uid: "u1",
        email: "vip@ceg.hu",
        name: "VIP",
        role: "client",
        allowedTools: ["logo_ai_muhely"],
      },
    });
    mockAuthRef = {
      onAuthStateChanged: (cb) => {
        cb({ email: "vip@ceg.hu", getIdToken: async () => "tok" });
        return () => {};
      },
    };
    const { result } = renderHook(() => useToolAccess("logo_ai_muhely"));
    await waitFor(() => expect(result.current).toBe("granted"));
  });

  it("jogosultság nélküli ügyfél vagy sikertelen profil-lekérés esetén denied", async () => {
    mockedProfile.mockResolvedValue({
      success: false,
      error: "hiba",
    });
    mockAuthRef = {
      onAuthStateChanged: (cb) => {
        cb({ email: "user@ceg.hu", getIdToken: async () => "tok" });
        return () => {};
      },
    };
    const { result } = renderHook(() => useToolAccess("logo_ai_muhely"));
    await waitFor(() => expect(result.current).toBe("denied"));
  });

  it("kivétel (getIdToken hiba) esetén fail-closed módon denied", async () => {
    mockAuthRef = {
      onAuthStateChanged: (cb) => {
        cb({
          email: "user@ceg.hu",
          getIdToken: async () => {
            throw new Error("network");
          },
        });
        return () => {};
      },
    };
    const { result } = renderHook(() => useToolAccess("logo_ai_muhely"));
    await waitFor(() => expect(result.current).toBe("denied"));
  });
});
