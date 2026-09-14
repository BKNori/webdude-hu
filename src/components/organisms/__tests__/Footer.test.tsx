import { render, screen } from "@testing-library/react";
import Footer from "@/components/organisms/Footer";

describe("Footer", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-01-01"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders current year", () => {
    render(<Footer />);
    const yearText = screen.getByText(/2023/);
    expect(yearText).toBeInTheDocument();
  });

  it("renders services list with grid-cols-2 class", () => {
    render(<Footer />);
    const servicesHeading = screen.getByRole("heading", {
      name: /Szolgáltatások/i,
    });
    const servicesSection = servicesHeading.closest("div");
    const ul = servicesSection?.querySelector("ul");
    expect(ul).toHaveClass("grid");
    expect(ul).toHaveClass("grid-cols-2");
  });

  it("renders quick links list with grid-cols-1 class", () => {
    render(<Footer />);
    const quickLinksHeading = screen.getByRole("heading", {
      name: /Gyorslinkek/i,
    });
    const quickLinksSection = quickLinksHeading.closest("div");
    const ul = quickLinksSection?.querySelector("ul");
    expect(ul).toHaveClass("grid");
    expect(ul).toHaveClass("grid-cols-1");
  });

  it("includes expected link texts", () => {
    render(<Footer />);
    const linkTexts = [
      "Egyedi Weboldal Készítés",
      "WordPress Webshop",
      "WordPress Kecskemét",
      "Vírusirtás & Biztonság",
      "Grafikai Tervezés",
      "Arculat & Logó",
      "AI Prompt Engineering",
      "AI Kép- és Videógenerálás",
    ];
    linkTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
