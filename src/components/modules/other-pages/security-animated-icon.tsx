"use client";

import { useEffect, useRef } from "react";
import {
  BadgeCheck,
  ChartColumn,
  CreditCard,
  Eye,
  KeyRound,
  Link2,
  Lock,
  Plug,
  RefreshCw,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const iconMap = {
  shield: Shield,
  eye: Eye,
  lock: Lock,
  badge: BadgeCheck,
  refresh: RefreshCw,
  key: KeyRound,
  card: CreditCard,
  plug: Plug,
  chart: ChartColumn,
  link: Link2,
} satisfies Record<string, LucideIcon>;

export type SecurityIconName = keyof typeof iconMap;

type SecurityAnimatedIconProps = {
  icon: SecurityIconName;
  className?: string;
  size?: "md" | "lg";
  tone?: "soft" | "solid";
};

export function SecurityAnimatedIcon({
  icon,
  className,
  size = "md",
  tone = "soft",
}: SecurityAnimatedIconProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const Icon = iconMap[icon];

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const { gsap } = getGsap();
    const iconEl = el.querySelector("[data-security-glyph]");
    const ringEl = el.querySelector("[data-security-ring]");
    const glowEl = el.querySelector("[data-security-glow]");
    if (!iconEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 14, autoAlpha: 0, scale: 0.92 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.55,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        },
      );

      if (ringEl) {
        gsap.to(ringEl, {
          rotate: 360,
          duration: 18,
          ease: "none",
          repeat: -1,
        });
      }

      if (glowEl) {
        gsap.to(glowEl, {
          scale: 1.18,
          autoAlpha: 0.55,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      if (icon === "refresh") {
        gsap.to(iconEl, {
          rotate: 360,
          duration: 8,
          ease: "none",
          repeat: -1,
        });
      } else if (icon === "shield" || icon === "lock" || icon === "badge") {
        gsap.to(iconEl, {
          y: -2,
          duration: 2.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      } else if (icon === "eye" || icon === "key") {
        gsap.to(iconEl, {
          scale: 1.06,
          duration: 1.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      } else {
        gsap.to(iconEl, {
          rotate: 4,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, el);

    return () => ctx.revert();
  }, [icon, reducedMotion]);

  return (
    <span
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center",
        size === "lg" ? "size-16" : "size-12",
        className,
      )}
      aria-hidden
    >
      <span
        data-security-glow
        className="absolute inset-0 rounded-2xl bg-accent/20 blur-md"
      />
      <span
        data-security-ring
        className={cn(
          "absolute inset-0 rounded-2xl border border-dashed border-accent/30",
          size === "lg" && "rounded-[1.15rem]",
        )}
      />
      <span
        className={cn(
          "relative inline-flex items-center justify-center rounded-2xl border",
          size === "lg" ? "size-14 rounded-[1.05rem]" : "size-11",
          tone === "solid"
            ? "border-accent/30 bg-accent text-accent-foreground"
            : "border-accent/25 bg-accent-soft text-accent",
        )}
      >
        <Icon
          data-security-glyph
          className={size === "lg" ? "size-6" : "size-5"}
        />
      </span>
    </span>
  );
}
