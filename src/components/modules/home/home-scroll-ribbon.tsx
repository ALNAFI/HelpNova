"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { homeScrollRibbonConfig } from "@/config/home-scroll-ribbon";
import {
  buildHomeRibbonPath,
  headLengthForScroll,
  indexAtLength,
  yFromDocument,
  type RibbonPath,
} from "@/lib/home-scroll-ribbon-path";
import { loadRibbonIntegrationIcons } from "@/lib/home-scroll-ribbon-icons";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

type ThemeColors = {
  dark: boolean;
  copper: [number, number, number];
  ivory: [number, number, number];
  opacity: number;
};

function readTheme(): ThemeColors {
  const dark = document.documentElement.classList.contains("dark");
  if (dark) {
    return {
      dark: true,
      copper: [0.62, 0.48, 0.92],
      ivory: [0.96, 0.93, 1],
      opacity: 0.30,
    };
  }
  return {
    dark: false,
    copper: [0.55, 0.32, 0.78],
    ivory: [0.98, 0.94, 0.9],
    opacity: 0.5,
  };
}

function collectSections(vh: number) {
  const nodes = document.querySelectorAll<HTMLElement>(
    "[data-home-ribbon-root] section",
  );
  return [...nodes].map((el) => {
    const rect = el.getBoundingClientRect();
    const topDoc = rect.top + window.scrollY;
    const bottomDoc = rect.bottom + window.scrollY;
    const head =
      el.querySelector<HTMLElement>("h1, h2, [data-ribbon-head]") ?? el;
    const headRect = head.getBoundingClientRect();
    return {
      top: yFromDocument(topDoc, vh),
      bottom: yFromDocument(bottomDoc, vh),
      headBottom: yFromDocument(headRect.bottom + window.scrollY, vh),
    };
  });
}

function drawRibbon(
  ctx: CanvasRenderingContext2D,
  path: RibbonPath,
  scrollNorm: number,
  headLen: number,
  width: number,
  height: number,
  dpr: number,
  theme: ThemeColors,
  icons: HTMLImageElement[],
) {
  const { points, length } = path;
  if (length < 3 || headLen <= 0) return;

  // Only the unrolled portion exists — nothing beyond the scroll head.
  const endIndex = Math.max(2, indexAtLength(path, headLen));
  const aspect = width / Math.max(1, height);
  const scale = Math.max(0.5, Math.min(1, aspect / 1.5));
  const halfW = 0.12 * scale * height * 0.55;

  type Edge = { lx: number; ly: number; rx: number; ry: number; lit: number };
  const edges: Edge[] = [];

  for (let i = 0; i <= endIndex; i++) {
    const x = points[i * 4];
    const y = points[i * 4 + 1];
    const z = points[i * 4 + 2];
    const fold = points[i * 4 + 3];

    const i0 = Math.max(0, i - 1);
    const i1 = Math.min(endIndex, i + 1);
    const tx = points[i1 * 4] - points[i0 * 4];
    const ty = points[i1 * 4 + 1] - points[i0 * 4 + 1];
    const len = Math.hypot(tx, ty) || 1;
    const nx = -ty / len;
    const ny = tx / len;

    const screenX = width / 2 + (x / aspect) * (width / 2);
    const screenY = ((y - scrollNorm) / 1.76) * height - z * height * 0.03;

    // Fade width in near the origin and soft-taper at the live tip.
    const along = path.reached[i];
    const grow = Math.min(1, along / Math.max(0.55, path.totalLength * 0.055));
    const tipFade = homeScrollRibbonConfig.tipFade;
    const tipRaw = Math.max(0, Math.min(1, (headLen - along) / tipFade));
    // Smoothstep so the tip eases in instead of appearing as a hard edge.
    const tipT = tipRaw * tipRaw * (3 - 2 * tipRaw);
    const widthPx =
      halfW * (0.9 + 0.1 * Math.cos(y * 1.5)) * grow * (0.2 + 0.8 * tipT);
    const facing = 0.5 + 0.5 * Math.cos(fold);
    const lit = 0.42 + facing * 0.45;

    edges.push({
      lx: screenX + nx * widthPx,
      ly: screenY + ny * widthPx,
      rx: screenX - nx * widthPx,
      ry: screenY - ny * widthPx,
      lit,
    });
  }

  // Keep only edges that currently intersect the viewport.
  const visible: Edge[] = [];
  for (let i = 0; i < edges.length; i++) {
    const e = edges[i];
    if (e.ly > -140 && e.ly < height + 140) visible.push(e);
  }
  if (visible.length < 2) return;

  const [cr, cg, cb] = theme.copper;
  const [ir, ig, ib] = theme.ivory;

  ctx.save();
  ctx.globalAlpha = theme.opacity;
  ctx.beginPath();
  ctx.moveTo(visible[0].lx, visible[0].ly);
  for (let i = 1; i < visible.length; i++) {
    ctx.lineTo(visible[i].lx, visible[i].ly);
  }
  for (let i = visible.length - 1; i >= 0; i--) {
    ctx.lineTo(visible[i].rx, visible[i].ry);
  }
  ctx.closePath();

  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(
    0,
    `rgb(${Math.round(cr * 255)} ${Math.round(cg * 255)} ${Math.round(cb * 255)})`,
  );
  grad.addColorStop(
    0.5,
    `rgb(${Math.round(((cr * 2 + ir) / 3) * 255)} ${Math.round(((cg * 2 + ig) / 3) * 255)} ${Math.round(((cb * 2 + ib) / 3) * 255)})`,
  );
  grad.addColorStop(
    1,
    `rgb(${Math.round(ir * 255)} ${Math.round(ig * 255)} ${Math.round(ib * 255)})`,
  );
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.strokeStyle = `rgba(${Math.round(ir * 255)}, ${Math.round(ig * 255)}, ${Math.round(ib * 255)}, 0.28)`;
  ctx.lineWidth = Math.max(1, 1.2 * dpr);
  ctx.stroke();

  // Same cadence as the former dots (every 8 samples), cycling the 12
  // Integrations icons continuously along the full ribbon path.
  if (icons.length > 0) {
    const iconSize = Math.max(20, Math.min(30, halfW * 0.62));
    for (let i = 2; i < edges.length - 2; i += 8) {
      const e = edges[i];
      const mx = (e.lx + e.rx) / 2;
      const my = (e.ly + e.ry) / 2;
      if (my < 8 || my > height - 8) continue;
      const icon = icons[Math.floor(i / 8) % icons.length];
      if (!icon?.complete) continue;
      const size = iconSize * (0.9 + 0.1 * e.lit);
      // Light mode needs a stronger punch so #A78BFA marks read on the ribbon.
      ctx.globalAlpha = theme.dark
        ? Math.min(1, 0.18 + theme.opacity * (1.05 + 0.2 * e.lit))
        : Math.min(1, 0.52 + theme.opacity * (1.35 + 0.3 * e.lit));
      ctx.drawImage(icon, mx - size / 2, my - size / 2, size, size);
    }
  }

  ctx.restore();
}

export function HomeScrollRibbon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) {
      canvas.dataset.renderer = "unsupported";
      return;
    }

    let path: RibbonPath | null = null;
    let raf = 0;
    let theme = readTheme();
    let icons: HTMLImageElement[] = [];
    let iconLoadId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let headCurrent = 0;
    let headTarget = 0;
    let lastTs = 0;
    let prevNorm = 0;
    const {
      reducedMotionLength,
      headFollow,
      headCatchUp,
      headFollowBoost,
    } = homeScrollRibbonConfig;

    const rebuild = () => {
      const vh = Math.max(1, window.innerHeight);
      const aspect = Math.max(0.55, width / Math.max(1, height));
      const scale = Math.max(0.5, Math.min(1, aspect / 1.5));
      path = buildHomeRibbonPath({
        aspect,
        scale,
        endY: yFromDocument(document.documentElement.scrollHeight, vh),
        sections: collectSections(vh),
        desktop: window.innerWidth > 700,
      });
      headCurrent = Math.min(headCurrent, path.totalLength);
      headTarget = Math.min(headTarget, path.totalLength);
    };

    const scrollNorm = () =>
      yFromDocument(window.scrollY, Math.max(1, window.innerHeight));

    const scrollProgress = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return 0;
      return Math.max(0, Math.min(1, window.scrollY / max));
    };

    const opacityForProgress = (p: number) => {
      const ease = (a: number, b: number, x: number) => {
        const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
        return t * t * (3 - 2 * t);
      };
      // Stay visible through pricing / FAQ; only ease out near the very end.
      const mid = ease(0.03, 0.14, p) * (1 - ease(0.94, 0.995, p));
      const tail = ease(0.94, 0.995, p);
      const base = 0.24 * (1 - tail) + 0.16 * tail;
      return (base + (0.14 - base) * mid) * (theme.opacity / 0.24);
    };

    const paintFrame = (ts: number) => {
      raf = 0;
      if (!path) return;

      const progress = scrollProgress();
      const norm = scrollNorm();
      const target = headLengthForScroll(path, norm, progress);

      if (reducedMotion) {
        headTarget = Math.min(path.totalLength * reducedMotionLength, target);
        headCurrent = headTarget;
        lastTs = 0;
        prevNorm = norm;
      } else {
        headTarget = target;
        const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 0.016;
        const scrollVel = lastTs
          ? (norm - prevNorm) / Math.max(dt, 1e-4)
          : 0;
        prevNorm = norm;
        lastTs = ts;

        const delta = headTarget - headCurrent;
        if (Math.abs(delta) > 0.0005) {
          // Ease through weave gaps (no snap blink); boost with scroll speed.
          const rate = headFollow + Math.abs(scrollVel) * headFollowBoost;
          const eased = Math.abs(delta) * (1 - Math.exp(-rate * dt));
          const floor = headCatchUp * dt;
          const step = Math.min(Math.abs(delta), Math.max(eased, floor));
          headCurrent += Math.sign(delta) * step;
        } else {
          headCurrent = headTarget;
        }
      }

      canvas.style.opacity = String(opacityForProgress(progress));
      ctx.clearRect(0, 0, width, height);
      drawRibbon(
        ctx,
        path,
        norm,
        headCurrent,
        width,
        height,
        dpr,
        theme,
        icons,
      );

      if (!reducedMotion && Math.abs(headTarget - headCurrent) > 0.001) {
        raf = requestAnimationFrame(paintFrame);
      } else {
        lastTs = 0;
      }
    };

    const reloadIcons = () => {
      const loadId = ++iconLoadId;
      // Dark: near-white on copper. Light: accent violet + heavier stroke.
      const dark = document.documentElement.classList.contains("dark");
      const color = dark ? "rgb(255 252 255)" : "#A78BFA";
      const strokeWidth = dark ? 2.05 : 2.55;
      void loadRibbonIntegrationIcons(color, strokeWidth).then((loaded) => {
        if (loadId !== iconLoadId) return;
        icons = loaded;
        requestPaint();
      });
    };

    const requestPaint = () => {
      if (raf) return;
      lastTs = 0;
      raf = requestAnimationFrame(paintFrame);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(width * dpr));
      const h = Math.max(1, Math.round(height * dpr));
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuild();
      requestPaint();
    };

    const onTheme = () => {
      theme = readTheme();
      reloadIcons();
      requestPaint();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const bodyRo = new ResizeObserver(() => {
      rebuild();
      requestPaint();
    });
    bodyRo.observe(document.body);

    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", requestPaint);

    canvas.dataset.renderer = "canvas2d";
    reloadIcons();
    resize();

    return () => {
      iconLoadId += 1;
      cancelAnimationFrame(raf);
      ro.disconnect();
      bodyRo.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", requestPaint);
    };
  }, [reducedMotion]);

  return (
    <div data-home-ribbon-root className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        className="home-scroll-ribbon"
        aria-hidden="true"
        data-renderer="pending"
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
