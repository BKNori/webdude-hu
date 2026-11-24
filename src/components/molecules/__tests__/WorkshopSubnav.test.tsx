import React from "react";
import { render, screen } from "@testing-library/react";
import WorkshopSubnav from "../WorkshopSubnav";

let mockPathname = "/portal/ai-muhely";

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
}));

describe("WorkshopSubnav — Dual Theme alnavigáció (/portal/ai-muhely)", () => {
  it("a gyűjtőoldalon (/portal/ai-muhely) az Ügyfélportálra mutató vissza-linket és a Projektek ugrólinket jeleníti meg, dupla auth elemek és sticky nélkül", () => {
    mockPathname = "/portal/ai-muhely";
    render(<WorkshopSubnav />);

    const nav = screen.getByRole("navigation", {
      name: /ai műhely alnavigáció/i,
    });
    expect(nav.className).not.toMatch(/\b(sticky|fixed)\b/);

    const backLink = screen.getByRole("link", {
      name: /vissza az ügyfélportálra/i,
    });
    expect(backLink).toHaveAttribute("href", "/portal");

    expect(screen.getByText("AI Tervezőműhely")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /projektek/i })).toHaveAttribute(
      "href",
      "/portal"
    );

    // Tilos a globális HeaderNavClient elemeinek duplikálása
    expect(screen.queryByText(/kijelentkezés/i)).toBeNull();
    expect(screen.queryByText(/szuperadmin/i)).toBeNull();
  });

  it("aloldalon (/portal/ai-muhely/banner-ai-muhely) az AI Műhelybe mutató vissza-linket és a modul pontos nevét mutatja", () => {
    mockPathname = "/portal/ai-muhely/banner-ai-muhely";
    render(<WorkshopSubnav />);

    const backLink = screen.getByRole("link", {
      name: /vissza az ai műhelybe/i,
    });
    expect(backLink).toHaveAttribute("href", "/portal/ai-muhely");
    expect(screen.getByText("Banner AI Műhely")).toBeInTheDocument();
  });

  it("ismeretlen slug esetén olvasható fallback címet képez", () => {
    mockPathname = "/portal/ai-muhely/egyedi-teszt-modul/";
    render(<WorkshopSubnav />);

    expect(screen.getByText("Egyedi Teszt Modul")).toBeInTheDocument();
  });
});
