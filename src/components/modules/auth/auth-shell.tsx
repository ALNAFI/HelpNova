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
          fillOpacity={0.1}
          gridOpacity={isLight ? 0.1 : 0.05}
          spotlight={0.7}
          edgeFade={0.14}
          clickPulse
          lightMode={isLight}
          intro={!reducedMotion}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-noise" />
      <div
        className="pointer-events-none absolute top-[-10%] left-1/2 size-[22rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_70%)] blur-3xl"
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
              className="group inline-flex items-center gap-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-control)] border border-border bg-surface shadow-sm transition-colors group-hover:border-border-strong group-hover:text-foreground">
                <ArrowLeft className="size-4" aria-hidden />
              </span>
              Back to home
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
        <Container className="flex flex-col items-center gap-2 py-5 text-center">
          <p className="text-sm text-muted">{siteConfig.copyright}</p>
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted"
          >
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Terms
            </Link>
          </nav>
        </Container>
      </footer>
    </div>
  );
}
