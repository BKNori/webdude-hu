import "@testing-library/jest-dom";

/**
 * Globális `motion/react` mock a jsdom környezethez.
 *
 * MIÉRT: a `motion.*` komponensek (`whileInView`, `useReducedMotion` stb.)
 * IntersectionObserver / matchMedia API-kat használnak, amelyeket a jsdom
 * nem implementál — enélkül a render `AggregateError`-ral elszáll.
 * A mock a motion komponenseket sima DOM elemekké alakítja (a motion-only
 * propokat kiszűri), a hookokat pedig stabil stubokká.
 */
jest.mock("motion/react", () => {
  const React = jest.requireActual<typeof import("react")>("react");

  const MOTION_ONLY_PROPS = new Set([
    "initial",
    "animate",
    "exit",
    "variants",
    "whileHover",
    "whileTap",
    "whileInView",
    "whileFocus",
    "whileDrag",
    "viewport",
    "transition",
    "layout",
    "layoutId",
    "layoutDependency",
    "drag",
    "dragConstraints",
    "dragElastic",
    "dragMomentum",
    "dragPropagation",
    "dragControls",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDrag",
    "onDragStart",
    "onDragEnd",
    "onDirectionLock",
    "onHoverStart",
    "onHoverEnd",
    "onTap",
    "onTapStart",
    "onTapCancel",
    "inherit",
  ]);

  const componentCache: Record<string, React.ComponentType<never>> = {};

  const motionProxy = new Proxy({} as Record<string, unknown>, {
    get: (_target, tag: string) => {
      if (tag === "__esModule") return false;
      if (!componentCache[tag]) {
        const MotionComponent = React.forwardRef(
          (props: Record<string, unknown>, ref: React.Ref<unknown>) => {
            const domProps: Record<string, unknown> = {};
            for (const [key, value] of Object.entries(props)) {
              if (!MOTION_ONLY_PROPS.has(key)) {
                domProps[key] = value;
              }
            }
            return React.createElement(
              tag,
              { ...domProps, ref } as React.HTMLAttributes<HTMLElement>,
            );
          },
        );
        MotionComponent.displayName = `motion.${tag}`;
        componentCache[tag] = MotionComponent as React.ComponentType<never>;
      }
      return componentCache[tag];
    },
  });

  return {
    __esModule: true,
    motion: motionProxy,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    MotionConfig: ({ children }: { children: React.ReactNode }) => children,
    useReducedMotion: jest.fn(() => false),
    useInView: jest.fn(() => true),
    useMotionValue: jest.fn((initial: unknown) => ({
      get: () => initial,
      set: jest.fn(),
    })),
    useTransform: jest.fn(() => ({ get: () => 0 })),
    useScroll: jest.fn(() => ({
      scrollY: { get: () => 0, on: jest.fn(), off: jest.fn() },
    })),
    useSpring: jest.fn((value: unknown) => value),
    useAnimation: jest.fn(() => ({ start: jest.fn(), stop: jest.fn() })),
    useAnimationControls: jest.fn(() => ({
      start: jest.fn(),
      stop: jest.fn(),
    })),
    useMotionValueEvent: jest.fn(),
    animate: jest.fn(),
    stagger: jest.fn((value: unknown) => value),
  };
});

/**
 * Globális `next/link` mock a jsdom környezethez, hogy a `<Link href="...">`
 * kattintások ne váltsanak ki `Error: Not implemented: navigation` console.error-t.
 */
jest.mock("next/link", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const MockLink = React.forwardRef(
    (
      props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string },
      ref: React.Ref<HTMLAnchorElement>,
    ) => {
      const { href, onClick, children, ...rest } = props;
      return React.createElement(
        "a",
        {
          href,
          ref,
          ...rest,
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            onClick?.(e);
          },
        },
        children,
      );
    },
  );
  MockLink.displayName = "NextLinkMock";
  return {
    __esModule: true,
    default: MockLink,
  };
});
