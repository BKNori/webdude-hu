import React from "react";
import { render, screen } from "@testing-library/react";
import ToolAccessLock from "../ToolAccessLock";
import ToolAccessGate from "../ToolAccessGate";
import ProductFaqSection from "../ProductFaqSection";
import { useToolAccess } from "@/hooks/useToolAccess";

jest.mock("@/hooks/useToolAccess", () => ({
  useToolAccess: jest.fn(),
}));

const mockedUseToolAccess = useToolAccess as jest.MockedFunction<
  typeof useToolAccess
>;

describe("ToolAccessLock & ToolAccessGate (UI RBAC réteg)", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("ToolAccessLock: denied variáns eszköz-névvel és anélkül", () => {
    const { rerender } = render(<ToolAccessLock />);
    expect(screen.getByText("Zárolva")).toBeInTheDocument();
    expect(screen.getByText("Hozzáférés igénylése")).toHaveAttribute(
      "href",
      "/kapcsolat"
    );
    expect(screen.getByText("Vissza a Portálhoz")).toHaveAttribute(
      "href",
      "/portal"
    );

    rerender(<ToolAccessLock toolName="Logo AI Műhely" variant="denied" />);
    expect(screen.getByText("Logo AI Műhely — Zárolva")).toBeInTheDocument();
  });

  it("ToolAccessLock: guest variáns bejelentkezési és igénylési CTA-val", () => {
    render(<ToolAccessLock toolName="Banner AI Műhely" variant="guest" />);
    expect(
      screen.getByText("Banner AI Műhely — Bejelentkezés szükséges")
    ).toBeInTheDocument();
    expect(screen.getByText("Bejelentkezés")).toHaveAttribute("href", "/portal");
    expect(screen.getByText("Hozzáférés igénylése")).toHaveAttribute(
      "href",
      "/kapcsolat"
    );
  });

  it("ToolAccessGate: loading állapotban NEM rendereli a védett generátort", () => {
    mockedUseToolAccess.mockReturnValue("loading");
    render(
      <ToolAccessGate toolId="logo_ai_muhely" toolName="Logo AI Műhely">
        <div data-testid="secret-generator">Titkos Űrlap</div>
      </ToolAccessGate>
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByTestId("secret-generator")).not.toBeInTheDocument();
  });

  it("ToolAccessGate: vendégként (guest) zárolja és NEM rendereli a generátort", () => {
    mockedUseToolAccess.mockReturnValue("guest");
    render(
      <ToolAccessGate toolId="logo_ai_muhely" toolName="Logo AI Műhely">
        <div data-testid="secret-generator">Titkos Űrlap</div>
      </ToolAccessGate>
    );
    expect(
      screen.getByText("Logo AI Műhely — Bejelentkezés szükséges")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("secret-generator")).not.toBeInTheDocument();
  });

  it("ToolAccessGate: jogosultság nélküli ügyfélnél (denied) zárolja a generátort", () => {
    mockedUseToolAccess.mockReturnValue("denied");
    render(
      <ToolAccessGate toolId="logo_ai_muhely" toolName="Logo AI Műhely">
        <div data-testid="secret-generator">Titkos Űrlap</div>
      </ToolAccessGate>
    );
    expect(screen.getByText("Logo AI Műhely — Zárolva")).toBeInTheDocument();
    expect(screen.queryByTestId("secret-generator")).not.toBeInTheDocument();
  });

  it("ToolAccessGate: granted állapotban rendereli a védett generátort", () => {
    mockedUseToolAccess.mockReturnValue("granted");
    render(
      <ToolAccessGate toolId="logo_ai_muhely" toolName="Logo AI Műhely">
        <div data-testid="secret-generator">Titkos Űrlap</div>
      </ToolAccessGate>
    );
    expect(screen.getByTestId("secret-generator")).toBeInTheDocument();
  });

  it("ProductFaqSection: látható GYIK elemeket és XSS-védett FAQPage JSON-LD-t renderel", () => {
    const { container } = render(
      <ProductFaqSection
        id="teszt-faq"
        faqs={[
          { question: "Első kérdés?", answer: "Első válasz <script>alert(1)</script>" },
        ]}
      />
    );
    expect(screen.getByText("Gyakori kérdések")).toBeInTheDocument();
    expect(screen.getByText("Első kérdés?")).toBeInTheDocument();
    const ld = container.querySelector('script[type="application/ld+json"]');
    expect(ld).not.toBeNull();
    expect(ld?.innerHTML).toContain("\\u003cscript>");
    expect(JSON.parse(ld?.innerHTML ?? "{}")["@type"]).toBe("FAQPage");

    render(
      <ProductFaqSection
        id="egyedi-faq"
        title="Egyedi GYIK"
        faqs={[{ question: "Második?", answer: "Válasz" }]}
      />
    );
    expect(screen.getByText("Egyedi GYIK")).toBeInTheDocument();
  });
});
