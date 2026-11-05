/**
 * Module 01 scroll-ribbon tuning.
 * The tip aims at a fixed place in the viewport so it stays visible while scrolling.
 * Path shape is unchanged — catch-up only softens weave length jumps.
 */
export const homeScrollRibbonConfig = {
  /**
   * Where the live tip sits in the viewport (0 = top, 1 = bottom).
   * 0.6 = about 60% down the screen.
   */
  tipViewportY: 0.6,

  /**
   * Path-length of the tip taper. Longer = softer fade at the live tip.
   */
  tipFade: 0.72,

  /**
   * How quickly the drawn tip eases toward the scroll target.
   * Higher = snappier; still plays through weave gaps instead of blinking.
   */
  headFollow: 22,

  /**
   * Minimum path units / second while catching a weave jump.
   * Keeps 7…14 visible when the Y-target skips ahead.
   */
  headCatchUp: 36,

  /**
   * Extra catch-up per unit of scroll velocity (scrollNorm / second).
   * Fast scrolling stays locked without long lag.
   */
  headFollowBoost: 16,

  /** Reduced-motion: fraction of total path shown as a static tip. */
  reducedMotionLength: 0.18,
} as const;
