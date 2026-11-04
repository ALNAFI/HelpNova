/**
 * Scroll-ribbon path builder for Module 01.
 * Coordinates: x in aspect-scaled units (~-aspect..aspect), y in viewport heights.
 * Inspired by the OmniRoute editions ribbon silhouette (loops + left/right weave).
 */

import { homeScrollRibbonConfig } from "@/config/home-scroll-ribbon";

export type RibbonPoint = {
  x: number;
  y: number;
  z: number;
  /** Fold amount; NaN = derive from tangent */
  w: number;
};

export type RibbonPath = {
  points: Float32Array; // xyzw packed
  /** Cumulative arc length along the ribbon (for scroll-driven unroll). */
  reached: Float32Array;
  length: number;
  totalLength: number;
  /** First / last path Y — used for even scroll→length mapping. */
  yStart: number;
  yEnd: number;
};

export type SectionAnchor = {
  top: number;
  bottom: number;
  headBottom: number;
};

function helix(
  side: 1 | -1,
  y0: number,
  step: number,
  ctx: { aspect: number; scale: number },
  turns: number,
  dBase = y0,
): RibbonPoint[] {
  const amp = 0.86 * ctx.aspect;
  const lift = 0.45 * ctx.scale + 0.075;
  const out: RibbonPoint[] = [];
  const phase = side === 1 ? 0 : Math.PI;
  for (let i = 1; i <= 12 * turns; i++) {
    const u = phase + (i / 12) * Math.PI;
    const c = i / (12 * turns);
    const h = y0 + ((step * turns) / 2) * c;
    const m = 0.6 * (0.5 - 0.5 * Math.cos(0.42 * h));
    out.push({
      x: amp * Math.cos(u),
      y: h + lift * (Math.sin(2 * u) * (1 - m) + Math.sin(u) * m),
      z: 0.38 * ctx.scale * Math.sin(u),
      w: 0.9 * Math.sin(2 * u),
    });
    void dBase;
  }
  return out;
}

function sideRun(
  side: 1 | -1,
  y0: number,
  y1: number,
  ctx: { aspect: number },
): RibbonPoint[] {
  const out: RibbonPoint[] = [];
  const span = y1 - y0;
  const steps = Math.max(1, Math.ceil(span / 0.45));
  for (let i = 1; i <= steps; i++) {
    const y = y0 + (span * i) / steps;
    const s = 0.5 + 0.5 * Math.sin(1.3 * y + 0.7 * side);
    out.push({
      x: side * (1.06 * ctx.aspect + 0.14 - 0.2 * ctx.aspect * s),
      y,
      z: 0,
      w: Number.NaN,
    });
  }
  return out;
}

function bridge(
  from: 1 | -1,
  to: 1 | -1,
  y0: number,
  y1: number,
  ctx: { aspect: number; scale: number },
): RibbonPoint[] {
  const span = Math.max(y1 - y0, 0.85);
  const flips = from !== to;
  let turns = Math.max(1, Math.round(span / 0.85));
  if (turns % 2 === 1 !== flips) turns += 1;
  if (turns <= 2) return helix(from, y0, (span / turns) * 2, ctx, turns);
  const u = flips ? 1 : 2;
  const mid = y0 + (1.7 * u) / 2;
  return [...helix(from, y0, 1.7, ctx, u), ...sideRun(to, mid, y1, ctx)];
}

/** Desktop hero S-curve control points (normalized then remapped). */
const HERO_DESKTOP: [number, number][] = [
  [-0.955, 0.404],
  [-0.82, 0.348],
  [-0.75, 0.372],
  [-0.73, 0.532],
  [-0.735, 0.788],
  [-0.7, 0.884],
  [-0.64, 0.929],
  [-0.43, 0.935],
  [-0.35, 0.996],
  [-0.25, 1.14],
  [-0.17, 1.2],
  [-0.1, 1.3],
  [-0.05, 1.355],
  [0, 1.345],
  [0.06, 1.262],
  [0.15, 1.13],
  [0.25, 1.123],
  [0.35, 1.142],
  [0.42, 1.134],
  [0.49, 1.096],
  [0.55, 1.012],
  [0.61, 0.86],
  [0.67, 0.74],
  [0.76, 0.689],
  [0.82, 0.724],
  [0.865, 0.836],
  [0.888, 0.956],
  [0.86, 1.02],
  [0.8, 1.044],
  [0.755, 1.075],
  [0.765, 1.15],
  [0.85, 1.236],
  [0.89, 1.3],
  [0.905, 1.396],
];

const HERO_MOBILE: [number, number, number][] = [
  [-1.25, -0.04, 0],
  [-0.7, -0.045, 0],
  [-0.35, -0.02, 0.3],
  [0, 0, Math.PI / 2],
  [0.35, 0.02, Math.PI - 0.3],
  [0.7, 0.035, Math.PI],
  [1.25, 0.04, Math.PI],
];

function catmullRom(points: RibbonPoint[], samples = 18): RibbonPoint[] {
  if (points.length < 2) return [...points];
  const padded = [points[0], ...points, points[points.length - 1]];
  const out: RibbonPoint[] = [];
  const dist = (a: RibbonPoint, b: RibbonPoint) =>
    Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z) || 1e-4;

  for (let i = 0; i < padded.length - 3; i++) {
    const p0 = padded[i];
    const p1 = padded[i + 1];
    const p2 = padded[i + 2];
    const p3 = padded[i + 3];
    const t0 = 0;
    const t1 = t0 + Math.sqrt(dist(p0, p1));
    const t2 = t1 + Math.sqrt(dist(p1, p2));
    const t3 = t2 + Math.sqrt(dist(p2, p3));

    for (let s = 0; s < samples; s++) {
      const t = t1 + ((t2 - t1) * s) / samples;
      const interp = (key: "x" | "y" | "z" | "w") => {
        const A =
          ((t1 - t) / (t1 - t0)) * p0[key] + ((t - t0) / (t1 - t0)) * p1[key];
        const B =
          ((t2 - t) / (t2 - t1)) * p1[key] + ((t - t1) / (t2 - t1)) * p2[key];
        const C =
          ((t3 - t) / (t3 - t2)) * p2[key] + ((t - t2) / (t3 - t2)) * p3[key];
        const D =
          ((t2 - t) / (t2 - t0)) * A + ((t - t0) / (t2 - t0)) * B;
        const E =
          ((t3 - t) / (t3 - t1)) * B + ((t - t1) / (t3 - t1)) * C;
        return ((t2 - t) / (t2 - t1)) * D + ((t - t1) / (t2 - t1)) * E;
      };
      out.push({
        x: interp("x"),
        y: interp("y"),
        z: interp("z"),
        w: interp("w"),
      });
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

function resample(points: RibbonPoint[], spacing = 0.07): RibbonPoint[] {
  if (!points.length) return [];
  const out: RibbonPoint[] = [points[0]];
  let carry = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const len = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z);
    if (!len) continue;
    let s = spacing - carry;
    while (s <= len) {
      const t = s / len;
      out.push({
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        z: a.z + (b.z - a.z) * t,
        w: a.w + (b.w - a.w) * t,
      });
      s += spacing;
    }
    carry = len - (s - spacing);
  }
  return out;
}

export function buildHomeRibbonPath(opts: {
  aspect: number;
  scale: number;
  endY: number;
  sections: SectionAnchor[];
  desktop: boolean;
}): RibbonPath {
  const ctx = { aspect: opts.aspect, scale: opts.scale };
  const raw: RibbonPoint[] = [];
  let side: 1 | -1 = 1;
  let yCursor = 0.82;

  const push = (pts: RibbonPoint[]) => {
    raw.push(...pts);
    const last = pts[pts.length - 1];
    if (last) yCursor = last.y;
  };

  const fillTo = (y: number) => {
    if (y > yCursor + 0.28) push(sideRun(side, yCursor, y, ctx));
  };

  const crossTo = (next: 1 | -1, y: number) => {
    push(
      (() => {
        const a = yCursor;
        const b = Math.max(y, a + 0.7);
        const span = b - a;
        return [
          {
            x: 1.12 * side * ctx.aspect,
            y: a + 0.08 * span,
            z: 0,
            w: Number.NaN,
          },
          {
            x: 0.45 * side * ctx.aspect,
            y: a + 0.36 * span,
            z: 0.1,
            w: Number.NaN,
          },
          {
            x: 0.45 * next * ctx.aspect,
            y: a + 0.64 * span,
            z: 0.1,
            w: Number.NaN,
          },
          { x: 1.12 * next * ctx.aspect, y: b, z: 0, w: Number.NaN },
        ];
      })(),
    );
    side = next;
  };

  // Hero entry curve
  if (opts.desktop) {
    const trust = 0.88;
    const catalog = 1.38;
    const mapY = (e: number) =>
      e <= 0.884
        ? (e * trust) / 0.884
        : e <= 1.38
          ? trust + ((e - 0.884) * (catalog - trust)) / 0.496
          : catalog + (e - 1.38);
    HERO_DESKTOP.forEach(([x, ey]) => {
      raw.push({ x: x * ctx.aspect, y: mapY(ey), z: 0, w: 0 });
    });
    yCursor = mapY(HERO_DESKTOP[HERO_DESKTOP.length - 1][1]);
  } else {
    const mid = 0.95;
    HERO_MOBILE.forEach(([x, dy, w]) => {
      raw.push({ x: x * ctx.aspect, y: mid + dy, z: 0, w });
    });
    yCursor = mid + HERO_MOBILE[HERO_MOBILE.length - 1][1];
  }
  side = 1;

  // Weave through homepage sections (skip hero = index 0)
  for (let i = 1; i < opts.sections.length; i++) {
    const sec = opts.sections[i];
    if (!sec || sec.top < yCursor) continue;
    fillTo(sec.top);
    const next: 1 | -1 = side === 1 ? -1 : 1;
    crossTo(next, sec.headBottom);
    // Soft loop into the section body
    if (sec.bottom > yCursor + 0.55) {
      push(bridge(side, side, yCursor, Math.min(sec.bottom - 0.15, yCursor + 1.4), ctx));
    }
  }

  // Closing run
  if (opts.endY > yCursor + 0.35) {
    push(bridge(side, side, yCursor, opts.endY + 1.2, ctx));
  }

  const smooth = resample(catmullRom(raw, 20), 0.065);
  const packed = new Float32Array(smooth.length * 4);
  const reached = new Float32Array(smooth.length);
  let arc = 0;
  smooth.forEach((p, i) => {
    if (i > 0) {
      const prev = smooth[i - 1];
      arc += Math.hypot(p.x - prev.x, p.y - prev.y, p.z - prev.z);
    }
    reached[i] = arc;
    let w = p.w;
    if (Number.isNaN(w)) {
      const a = smooth[Math.max(0, i - 1)];
      const b = smooth[Math.min(smooth.length - 1, i + 1)];
      w = 0.9 * Math.sin(2 * Math.atan2(b.y - a.y, b.x - a.x));
    }
    packed[i * 4] = p.x;
    packed[i * 4 + 1] = p.y;
    packed[i * 4 + 2] = p.z;
    packed[i * 4 + 3] = w;
  });

  const yStart = smooth.length ? smooth[0].y : 0;
  const yEnd = smooth.length ? smooth[smooth.length - 1].y : yStart;

  return {
    points: packed,
    reached,
    length: smooth.length,
    totalLength: arc,
    yStart,
    yEnd: Math.max(yEnd, yStart + 1e-4),
  };
}

export function yFromDocument(docY: number, vh: number) {
  return (docY / Math.max(1, vh)) * 1.76;
}

/** Binary search: first index whose reached length is >= target. */
export function indexAtLength(path: RibbonPath, target: number) {
  let lo = 0;
  let hi = path.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (path.reached[mid] >= target) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}

/**
 * Target unroll length for the current scroll.
 * Maps viewport tip Y evenly across path length so sideways weaves
 * don't jump (1…6 then suddenly 15…). Tip stays near tipViewportY on average.
 * (screenY/height = (pathY - scrollNorm) / 1.76)
 */
export function headLengthForScroll(
  path: RibbonPath,
  scrollNorm: number,
  _scrollProgress: number,
) {
  if (!path.length || path.totalLength <= 0) return 0;
  const { tipViewportY } = homeScrollRibbonConfig;
  const targetY = scrollNorm + tipViewportY * 1.76;
  const span = path.yEnd - path.yStart;
  const t = Math.max(0, Math.min(1, (targetY - path.yStart) / span));
  return path.totalLength * t;
}
