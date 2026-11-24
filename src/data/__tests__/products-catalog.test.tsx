import fs from "fs";
import path from "path";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  CATALOG_PRODUCTS,
  PRODUCT_CATEGORIES,
} from "../products-catalog";
import ProductsCatalogClient from "@/components/organisms/ProductsCatalogClient";
import { metadata as termekekMetadata } from "@/app/termekek/layout";
import { useHydratedReducedMotion } from "@/hooks/useMotionPreset";

jest.mock("@/hooks/useMotionPreset", () => ({
  useHydratedReducedMotion: jest.fn(() => false),
}));

const mockedReducedMotion = useHydratedReducedMotion as jest.MockedFunction<
  typeof useHydratedReducedMotion
>;

describe("CATALOG_PRODUCTS & /termekek belső link és SEO integritás", () => {
  const termekekRoot = path.resolve(process.cwd(), "src/app/termekek");

  beforeEach(() => {
    mockedReducedMotion.mockReturnValue(false);
  });

  it("minden kártya href-je saját /termekek/<slug> oldalra mutat (soha nem /kapcsolat-ra), és a page.tsx létezik a fájlrendszeren", () => {
    const subdirs = fs
      .readdirSync(termekekRoot)
      .filter((entry) =>
        fs.statSync(path.join(termekekRoot, entry)).isDirectory()
      )
      .sort();

    expect(CATALOG_PRODUCTS.length).toBe(subdirs.length);

    for (const product of CATALOG_PRODUCTS) {
      expect(product.href).toBe(`/termekek/${product.slug}`);
      expect(product.href).not.toBe("/kapcsolat");

      const targetPage = path.join(termekekRoot, product.slug, "page.tsx");
      expect(fs.existsSync(targetPage)).toBe(true);

      // Zéró Fix Ár és országos pozicionálás ellenőrzése
      const combined = `${product.name} ${product.description} ${product.features.join(" ")}`;
      expect(combined).not.toMatch(/\b(Ft|HUF|EUR|Kecskemét)\b|€|\$/i);
    }

    const catalogSlugs = CATALOG_PRODUCTS.map((p) => p.slug).sort();
    expect(catalogSlugs).toEqual(subdirs);
  });

  it("a /termekek metadata megfelel a 2026-os SEO előírásoknak (50–60 kar. title, 150–160 kar. description)", () => {
    const title = String(termekekMetadata.title ?? "");
    const desc = String(termekekMetadata.description ?? "");
    expect(title.length).toBeGreaterThanOrEqual(50);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(desc.length).toBeGreaterThanOrEqual(150);
    expect(desc.length).toBeLessThanOrEqual(160);
    expect(termekekMetadata.alternates?.canonical).toBe(
      "https://webdude.hu/termekek"
    );
  });

  it("ProductsCatalogClient: minden kártya elsődleges CTA-ja és címe a saját /termekek/<slug> útvonalra vezet, és a szűrés + reduced-motion működik", () => {
    const { rerender } = render(
      <ProductsCatalogClient
        products={CATALOG_PRODUCTS}
        categories={PRODUCT_CATEGORIES}
      />
    );

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Termékek és AI Műhely Modulok",
      })
    ).toBeInTheDocument();

    for (const product of CATALOG_PRODUCTS) {
      const titleLink = screen.getByRole("link", { name: product.name });
      expect(titleLink).toHaveAttribute("href", product.href);
    }

    const primaryLinks = screen.getAllByRole("link", {
      name: /részletek és ai műhely|termék megtekintése/i,
    });
    expect(primaryLinks).toHaveLength(CATALOG_PRODUCTS.length);
    primaryLinks.forEach((link, idx) => {
      expect(link).toHaveAttribute("href", CATALOG_PRODUCTS[idx]!.href);
    });

    // Kategóriaszűrő tesztelése
    fireEvent.click(screen.getByRole("button", { name: /SEO Optimalizálás/i }));
    expect(
      screen.getAllByRole("link", { name: /termék megtekintése/i })
    ).toHaveLength(1);

    // Reduced motion ág lefedése
    mockedReducedMotion.mockReturnValue(true);
    rerender(
      <ProductsCatalogClient
        products={CATALOG_PRODUCTS}
        categories={PRODUCT_CATEGORIES}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Összes/i }));
    expect(
      screen.getAllByRole("link", {
        name: /részletek és ai műhely|termék megtekintése/i,
      })
    ).toHaveLength(CATALOG_PRODUCTS.length);
  });
});
