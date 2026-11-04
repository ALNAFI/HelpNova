/**
 * Module 01 scroll-ribbon tuning.
 * The tip aims at a fixed place in the viewport so it stays visible while scrolling.
 * Unroll/erase is locked 1:1 to scroll — no catch-up lag.
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

  /** Reduced-motion: fraction of total path shown as a static tip. */
  reducedMotionLength: 0.18,
} as const;
