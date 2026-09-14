import { useReducedMotion } from "motion/react";

/**
 * Motion preset hook for accessibility
 * Returns appropriate transition settings based on user's reduced motion preference
 *
 * Best practices:
 * - Gate the transition, not the component
 * - Keep motion.div in tree for layout animations
 * - Use duration: 0 for reduced motion instead of disabling animations entirely
 */
export function useMotionPreset() {
  const shouldReduceMotion = useReducedMotion();

  // During SSR, shouldReduceMotion is null - treat as unknown, don't animate yet
  if (shouldReduceMotion === null) {
    return { duration: 0 };
  }

  return shouldReduceMotion
    ? { duration: 0 } // Instant transitions for reduced motion
    : {
        type: "spring" as const,
        stiffness: 350,
        damping: 30,
      }; // Smooth spring animation for normal motion
}

/**
 * Fade animation preset
 */
export function useFadePreset() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion === null) {
    return { duration: 0 };
  }

  return shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: "easeOut" as const };
}

/**
 * Slide animation preset
 */
export function useSlidePreset() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion === null) {
    return { duration: 0 };
  }

  return shouldReduceMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      };
}
