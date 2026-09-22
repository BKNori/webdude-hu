"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Fókuszálható elemek szelektorai (WCAG 2.4.3 / 2.1.2).
 * A `tabindex="-1"` szándékosan kimarad: azok programozott fókuszra valók,
 * nem a Tab-sorrend részei.
 */
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "audio[controls]",
  "video[controls]",
  "[contenteditable]:not([contenteditable='false'])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

/**
 * Csak a ténylegesen megjelenő elemeket adja vissza.
 *
 * A `getComputedStyle` a teljes CSS-kaszkádot feloldja a böngészőben, így a
 * Tailwind `hidden` (display:none) és `invisible` (visibility:hidden) osztályokat
 * is kiszűri. A `hidden` attribútumot külön vizsgáljuk, mert jsdom alatt
 * (unit tesztek) a stíluslapok nem töltődnek be.
 */
function getVisibleFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter((element) => {
    if (element.hasAttribute("disabled")) return false;
    if (element.hasAttribute("hidden")) return false;
    if (element.getAttribute("aria-hidden") === "true") return false;

    const style = window.getComputedStyle(element);
    if (style.display === "none") return false;
    if (style.visibility === "hidden") return false;

    return true;
  });
}

/**
 * Fókuszcsapda modálokhoz, teljes képernyős mobil menühöz (WCAG 2.4.3, 2.1.2).
 *
 * - Megnyitáskor az `initialFocusRef` elemre fókuszál, ha meg van adva és
 *   látható; egyébként az első fókuszálható elemre.
 * - `Tab` / `Shift+Tab` nem tud kiszökni a konténerből (fókusz-ciklus).
 * - `Escape` lenyomására meghívja az `onEscape` visszahívást (bezárás).
 * - Bezáráskor visszaállítja a fókuszt a megnyitást kiváltó elemre.
 *
 * > Fontos: a konténernek a **bezáró gombot is tartalmaznia kell**, különben
 * > billentyűzettel nem lehet elérni (WCAG 2.1.2 – No Keyboard Trap).
 *
 * @param isActive A csapda aktív állapota (nyitva van-e a felület).
 * @param onEscape Escape lenyomásakor futó visszahívás (opcionális).
 * @param initialFocusRef A megnyitáskor fókuszalandó elem (opcionális).
 * @returns A fókuszcsapdát tartalmazó elemre kötendő `ref`.
 */
export function useFocusTrap<T extends HTMLElement>(
  isActive: boolean,
  onEscape?: () => void,
  initialFocusRef?: RefObject<HTMLElement | null>
) {
  const containerRef = useRef<T | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    // Kezdeti fókusz: a megadott elem, különben az első látható interaktív elem.
    const preferred = initialFocusRef?.current ?? null;
    const initialFocusable = getVisibleFocusable(container);
    if (preferred && container.contains(preferred)) {
      preferred.focus();
    } else if (initialFocusable.length > 0) {
      initialFocusable[0].focus();
    } else {
      container.setAttribute("tabindex", "-1");
      container.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onEscape?.();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getVisibleFocusable(container);
      const activeElement =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      // Nincs fókuszálható elem: a fókusz a konténeren marad.
      if (focusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const isOutside = !activeElement || !container.contains(activeElement);

      if (event.shiftKey && (activeElement === first || isOutside)) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && (activeElement === last || isOutside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      const previous = previouslyFocusedRef.current;
      if (previous && document.contains(previous)) {
        previous.focus();
      }
    };
  }, [isActive, onEscape, initialFocusRef]);

  return containerRef;
}

export default useFocusTrap;
