import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthStatusBadge from "../AuthStatusBadge";
import { getClientUserProfileAction } from "@/actions/portal";
import { signOut } from "firebase/auth";

const pushMock = jest.fn();
const refreshMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, refresh: refreshMock }),
}));

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(async () => undefined),
}));

jest.mock("@/actions/portal", () => ({
  getClientUserProfileAction: jest.fn(),
}));

type MockUser = {
  displayName?: string | null;
  email: string | null;
  getIdToken: () => Promise<string>;
} | null;

let currentAuthUser: MockUser = null;
let mockAuthEnabled = true;

jest.mock("@/lib/firebase", () => ({
  get auth() {
    if (!mockAuthEnabled) return null;
    return {
      onAuthStateChanged: (cb: (u: MockUser) => void) => {
        cb(currentAuthUser);
        return () => {};
      },
    };
  },
}));

const mockedProfile = getClientUserProfileAction as jest.MockedFunction<
  typeof getClientUserProfileAction
>;
const mockedSignOut = signOut as jest.MockedFunction<typeof signOut>;

describe("AuthStatusBadge (Topbar / Nav / Mobile portalozott menü)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthEnabled = true;
    currentAuthUser = null;
  });

  it("ha az auth null, semleges placeholdert renderel topbar és nav módban", () => {
    mockAuthEnabled = false;
    const { container, rerender } = render(<AuthStatusBadge variant="topbar" />);
    expect(container.querySelector(".animate-pulse")).not.toBeNull();
    rerender(<AuthStatusBadge variant="nav" />);
    expect(container.querySelector(".animate-pulse")).not.toBeNull();
  });

  it("kijelentkezve /portal linket mutat topbar, mobile és nav variánsban", () => {
    const onNav = jest.fn();
    const { rerender } = render(<AuthStatusBadge variant="topbar" />);
    expect(screen.getByRole("link", { name: /belépés/i })).toHaveAttribute(
      "href",
      "/portal"
    );

    rerender(<AuthStatusBadge variant="mobile" onNavigate={onNav} />);
    const mobLink = screen.getByRole("link", {
      name: /ügyfélportál \/ belépés/i,
    });
    expect(mobLink).toHaveAttribute("href", "/portal");
    fireEvent.click(mobLink);
    expect(onNav).toHaveBeenCalledTimes(1);

    rerender(<AuthStatusBadge variant="nav" />);
    expect(screen.getByRole("link", { name: /ügyfélportál/i })).toHaveAttribute(
      "href",
      "/portal"
    );
  });

  it("bejelentkezett normál ügyfélnél a pill /portal-ra mutat, a menü pedig document.body-ba renderelődik", async () => {
    currentAuthUser = {
      displayName: null,
      email: "ugyfel@ceg.hu",
      getIdToken: async () => "tok-1",
    };
    mockedProfile.mockResolvedValue({
      success: true,
      profile: {
        uid: "u1",
        email: "ugyfel@ceg.hu",
        name: "Ügyfél",
        role: "client",
        allowedTools: [],
      },
    });

    render(<AuthStatusBadge variant="topbar" />);
    const pillLink = await screen.findByLabelText("Ügyfélportál megnyitása");
    expect(pillLink).toHaveAttribute("href", "/portal");

    const toggle = screen.getByRole("button", { name: /fiók menü/i });
    fireEvent.click(toggle);

    const menu = screen.getByRole("menu");
    expect(document.body.contains(menu)).toBe(true);
    expect(
      screen.getByRole("menuitem", { name: "Ügyfélportál (Vezérlőpult)" })
    ).toHaveAttribute("href", "/portal");
    expect(
      screen.queryByRole("menuitem", { name: "Portál Kezelő" })
    ).toBeNull();
    expect(
      screen.queryByRole("menuitem", { name: "Admin Dashboard" })
    ).toBeNull();

    // Escape bezárja a menüt
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("szuperadminnál (hello@webdude.hu) a pill /admin/portal-kezelo-re mutat, és minden admin menüpont + kijelentkezés működik", async () => {
    const onNav = jest.fn();
    currentAuthUser = {
      displayName: "hello",
      email: "hello@webdude.hu",
      getIdToken: async () => {
        throw new Error("offline fallback");
      },
    };

    render(<AuthStatusBadge variant="mobile" onNavigate={onNav} />);
    const pillLink = await screen.findByLabelText("Portál Kezelő megnyitása");
    expect(pillLink).toHaveAttribute("href", "/admin/portal-kezelo");

    fireEvent.click(screen.getByRole("button", { name: /fiók menü/i }));

    expect(
      screen.getByRole("menuitem", { name: "Ügyfélportál (Vezérlőpult)" })
    ).toHaveAttribute("href", "/portal");
    expect(
      screen.getByRole("menuitem", { name: "Portál Kezelő" })
    ).toHaveAttribute("href", "/admin/portal-kezelo");
    expect(
      screen.getByRole("menuitem", { name: "Admin Dashboard" })
    ).toHaveAttribute("href", "/admin/dashboard");

    // Kívülre kattintás bezárja
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("menu")).toBeNull();

    // Újranyitás + menüelem kattintás
    fireEvent.click(screen.getByRole("button", { name: /fiók menü/i }));
    fireEvent.click(
      screen.getByRole("menuitem", { name: "Ügyfélportál (Vezérlőpult)" })
    );
    expect(onNav).toHaveBeenCalledTimes(1);

    // Újranyitás + Kijelentkezés
    fireEvent.click(screen.getByRole("button", { name: /fiók menü/i }));
    fireEvent.click(screen.getByRole("menuitem", { name: "Kijelentkezés" }));
    await waitFor(() => expect(mockedSignOut).toHaveBeenCalledTimes(1));
    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
