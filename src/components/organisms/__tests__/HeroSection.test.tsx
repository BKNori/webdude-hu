import { render, screen, act } from "@testing-library/react";

import HeroSection from "@/components/organisms/HeroSection";
import "@testing-library/jest-dom";

describe("HeroSection", () => {
  jest.useFakeTimers();

  it("cycles through banner images", () => {
    render(<HeroSection />);
    const img = screen.getByAltText("Hero banner") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("hero_banner1.png");

    // advance timer 8 seconds inside act
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    // Re-query image after state update
    const img2 = screen.getByAltText("Hero banner") as HTMLImageElement;
    expect(img2.src).toContain("hero_banner2.png");
  });
});
