// src/lib/utils.ts
/**
 * Utility to combine class names, filtering out falsy values.
 * Works similar to the popular `clsx` or `classnames` packages.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
