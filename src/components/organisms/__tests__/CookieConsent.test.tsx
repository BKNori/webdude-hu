import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import CookieConsent from "../CookieConsent";

describe("CookieConsent (mobil-kompakt, késleltetett LCP-barát banner)", () => {
  const originalEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  beforeEach(() => {
    jest.useFakeTimers();
    localStorage.clear();
    document.querySelectorAll('script[src*="googletagmanager"], script[data-ga]').forEach((el) => el.remove());
    delete (window as unknown as { requestIdleCallback?: unknown }).requestIdleCallback;
    delete (window as unknown as { cancelIdleCallback?: unknown }).cancelIdleCallback;
  });

  afterEach(() => {
    jest.useRealTimers();
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalEnv;
  });

  it("nem renderelődik blokkolóan az első LCP festés pillanatában, majd késleltetés után z-30 dialógusként megjelenik", () => {
    const { container } = render(<CookieConsent />);
    // Azonnali renderelésnél 0 DOM elem (nem rabolja el az LCP-t a Hero elől)
    expect(container.firstChild).toBeNull();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const dialog = screen.getByRole("dialog", {
      name: /cookie-k és analitika beállítások/i,
    });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveClass("z-30");
    expect(
      screen.getByRole("link", { name: /adatvédelmi szabályzat/i })
    ).toHaveAttribute("href", "/adatvedelmi-szabalyzat");
  });

  it("nem jelenik meg, ha már van mentett cookieConsent döntés", () => {
    localStorage.setItem("cookieConsent", "accepted");
    const { container } = render(<CookieConsent />);
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(container.firstChild).toBeNull();
  });

  it("támogatja a requestIdleCallback ütemezést, az elfogadást (GA4 betöltéssel) és az elutasítást", () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-TEST1234";
    const cancelMock = jest.fn();
    (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback = (
      cb
    ) => {
      cb();
      return 42;
    };
    (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback =
      cancelMock;

    const { unmount } = render(
      <CookieConsent
        dictionary={{
          ariaLabel: "Cookies settings",
          title: "Cookies",
          description: "Short text.",
          moreInfo: "More:",
          privacyPolicy: "Privacy Policy",
          privacyHref: "/en/privacy-policy",
          accept: "Accept",
          decline: "Decline",
        }}
      />
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/en/privacy-policy"
    );

    fireEvent.click(screen.getByRole("button", { name: "Accept" }));
    expect(localStorage.getItem("cookieConsent")).toBe("accepted");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.querySelector('script[src*="G-TEST1234"]')).not.toBeNull();
    expect(document.querySelector("script[data-ga]")).not.toBeNull();

    unmount();
  });

  it("elutasításkor menti a declined értéket és eltávolítja az esetleges GA scripteket", () => {
    const fakeGa = document.createElement("script");
    fakeGa.src = "https://www.googletagmanager.com/gtag/js?id=G-OLD";
    document.head.appendChild(fakeGa);
    const fakeInline = document.createElement("script");
    fakeInline.setAttribute("data-ga", "true");
    document.head.appendChild(fakeInline);

    render(<CookieConsent />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    fireEvent.click(screen.getByRole("button", { name: "Elutasítom" }));
    expect(localStorage.getItem("cookieConsent")).toBe("declined");
    expect(document.querySelector('script[src*="googletagmanager"]')).toBeNull();
    expect(document.querySelector("script[data-ga]")).toBeNull();
  });
});
