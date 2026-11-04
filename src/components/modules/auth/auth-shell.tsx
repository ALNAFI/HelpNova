"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { ThemeSwitcher } from "@/components/common/theme-switcher";
import { Container } from "@/components/ui/container";
import { CursorGrid } from "@/components/ui/cursor-grid";
import { useTheme } from "@/context/theme-provider";
import { siteConfig } from "@/config/site";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: AuthShellProps) {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const targets = root.querySelectorAll<HTMLElement>("[data-auth-intro]");
      gsap.set(targets, { clearProps: "all" });
      gsap.fromTo(
        targets,
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          immediateRender: false,
        },
      );

      gsap.fromTo(
        "[data-auth-field]",
        { y: 14, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.06,
          delay: 0.18,
          ease: "power3.out",
          immediateRender: false,
        },
      );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <CursorGrid
          cellSize={60}
          color="#A78BFA"
          gridColor={isLight ? "#18181b" : "#ffffff"}
          highlight="area"
          gridStyle="lines"
          radius={160}
          holdTime={400}
          fadeDuration={800}
          lineWidth={1.25}
          fillOpacity={0.14}
          gridOpacity={isLight ? 0.2 : 0.1}
          spotlight={0.85}
          edgeFade={0.12}
          clickPulse
          lightMode={isLight}
          intro={!reducedMotion}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <div
        className="pointer-events-none absolute top-[-10%] left-1/2 size-[22rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_70%)] blur-3xl"
        aria-hidden
      />

      <header className="relative z-10">
        <Container className="flex h-14 items-center justify-between gap-4 sm:h-16">
          <Logo />
          <ThemeSwitcher />
        </Container>
      </header>

      <main
        ref={rootRef}
        className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12"
      >
        <section className="w-full max-w-md">
          <div data-auth-intro className="mb-5">
            <Link
              href="/"
              aria-label="Back to home"
              className="inline-flex size-10 items-center justify-center rounded-[var(--radius-control)] border border-border bg-surface text-muted shadow-sm transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-[color-mix(in_oklab,var(--surface)_88%,transparent)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-8">
            <p
              data-auth-intro
              className="text-xs font-semibold tracking-[0.16em] text-accent uppercase"
            >
              {eyebrow}
            </p>
            <h1
              data-auth-intro
              className="mt-3 font-heading text-[1.85rem] font-semibold tracking-tight text-balance sm:text-[2.15rem]"
            >
              {title}
            </h1>
            <p
              data-auth-intro
              className="mt-3 text-[0.975rem] leading-7 text-muted"
            >
              {description}
            </p>

            <div data-auth-intro className="mt-7">
              {children}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10">
        <Container className="py-5 text-center text-sm text-muted">
          <p>{siteConfig.copyright}</p>
        </Container>
      </footer>
    </div>
  );
}
