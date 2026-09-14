import { renderHook } from "@testing-library/react";
import {
  useMotionPreset,
  useFadePreset,
  useSlidePreset,
} from "@/hooks/useMotionPreset";

// Mock the motion/react module
jest.mock("motion/react", () => ({
  useReducedMotion: jest.fn(),
}));

import { useReducedMotion } from "motion/react";

describe("useMotionPreset hook", () => {
  it("returns instant duration when reduced motion is true", () => {
    (useReducedMotion as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => useMotionPreset());
    expect(result.current).toEqual({ duration: 0 });
  });

  it("returns spring animation when reduced motion is false", () => {
    (useReducedMotion as jest.Mock).mockReturnValue(false);
    const { result } = renderHook(() => useMotionPreset());
    expect(result.current).toMatchObject({
      type: "spring",
      stiffness: 350,
      damping: 30,
    });
  });
});

describe("useFadePreset hook", () => {
  it("returns instant duration when reduced motion is true", () => {
    (useReducedMotion as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => useFadePreset());
    expect(result.current).toEqual({ duration: 0 });
  });

  it("returns fade animation when reduced motion is false", () => {
    (useReducedMotion as jest.Mock).mockReturnValue(false);
    const { result } = renderHook(() => useFadePreset());
    expect(result.current).toMatchObject({ duration: 0.6, ease: "easeOut" });
  });
});

describe("useSlidePreset hook", () => {
  it("returns instant duration when reduced motion is true", () => {
    (useReducedMotion as jest.Mock).mockReturnValue(true);
    const { result } = renderHook(() => useSlidePreset());
    expect(result.current).toEqual({ duration: 0 });
  });

  it("returns spring animation when reduced motion is false", () => {
    (useReducedMotion as jest.Mock).mockReturnValue(false);
    const { result } = renderHook(() => useSlidePreset());
    expect(result.current).toMatchObject({
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  });
});
describe("useMotionPreset hook - null case", () => {
  it("returns instant duration when reduced motion is null (SSR)", () => {
    (useReducedMotion as jest.Mock).mockReturnValue(null);
    const { result } = renderHook(() => useMotionPreset());
    expect(result.current).toEqual({ duration: 0 });
  });
});

describe("useFadePreset hook - null case", () => {
  it("returns instant duration when reduced motion is null (SSR)", () => {
    (useReducedMotion as jest.Mock).mockReturnValue(null);
    const { result } = renderHook(() => useFadePreset());
    expect(result.current).toEqual({ duration: 0 });
  });
});

describe("useSlidePreset hook - null case", () => {
  it("returns instant duration when reduced motion is null (SSR)", () => {
    (useReducedMotion as jest.Mock).mockReturnValue(null);
    const { result } = renderHook(() => useSlidePreset());
    expect(result.current).toEqual({ duration: 0 });
  });
});
