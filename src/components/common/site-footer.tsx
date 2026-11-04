"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/common/logo";
import { Container } from "@/components/ui/container";
import {
  footerColumns,
  footerLegalLinks,
  footerTagline,
} from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

function footerInView(footer: HTMLElement) {
  return footer.getBoundingClientRect().top < window.innerHeight * 0.92;
}

/** Mobile packs: keep Product from leaving a ragged hole under shorter columns. */
const mobileNavLeft = footerColumns.filter((column) =>
  ["Home", "Solutions", "Company"].includes(column.title),
);
const mobileNavRight = footerColumns.filter((column) =>
  ["Product", "Resources"].includes(column.title),
);

function FooterNavColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div data-footer-col className="min-w-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B819C]">
        {title}
      </p>
      <ul className="mt-3.5 space-y-2">
        {links.map((link) => (
          <li key={`${title}-${link.href}`} className="min-w-0">
            <Link
              href={link.href}
              className={cn(
                "block max-w-full text-sm break-words text-[#D8D0E8] transition-colors duration-200",
                "hover:text-white hover:underline underline-offset-4",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0912]",
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || reducedMotion) return;

    const { gsap, ScrollTrigger } = getGsap();
    let revealed = footerInView(footer);
    let intro: gsap.core.Timeline | null = null;
    let settleFrame = 0;

    const brand = footer.querySelector<HTMLElement>("[data-footer-brand]");
    const cols = gsap.utils.toArray<HTMLElement>("[data-footer-col]", footer);
    const meta = footer.querySelector<HTMLElement>("[data-footer-meta]");
    const wordmark = footer.querySelector<HTMLElement>("[data-footer-wordmark]");
    const glow = footer.querySelector<HTMLElement>("[data-footer-glow]");
    const contentNodes = [brand, ...cols, meta].filter(Boolean) as HTMLElement[];

    const ensureVisible = () => {
      gsap.set(contentNodes, { clearProps: "opacity,visibility,transform" });
      if (wordmark) {
        // Drop GSAP inline transform so CSS crop (`translate3d(0, 6%, 0)`) applies.
        gsap.set(wordmark, { clearProps: "opacity,visibility,transform" });
      }
    };

    // Critical: never park footer content at autoAlpha:0 as a resting state.
    // Content stays CSS-visible; reveal only runs when scrolling into view.
    const playIntro = () => {
      if (revealed) return;
      revealed = true;

      intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        onInterrupt: ensureVisible,
      });

      if (contentNodes.length) {
        intro.fromTo(
          contentNodes,
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.05 },
          0,
        );
      }
      if (wordmark) {
        intro.fromTo(
          wordmark,
          { yPercent: 14, autoAlpha: 0.3 },
          { yPercent: 6, autoAlpha: 1, duration: 1, ease: "power3.out" },
          0.06,
        );
      }
    };

    ensureVisible();

    const ctx = gsap.context(() => {
      if (glow) {
        gsap.to(glow, {
          xPercent: 8,
          yPercent: -4,
          duration: 10,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      ScrollTrigger.create({
        id: "site-footer-intro",
        trigger: footer,
        start: "top 92%",
        once: true,
        onEnter: playIntro,
      });
    }, footer);

    settleFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (footerInView(footer)) {
        revealed = true;
        ensureVisible();
      }
    });

    return () => {
      window.cancelAnimationFrame(settleFrame);
      intro?.kill();
      ensureVisible();
      ctx.revert();
    };
  }, [reducedMotion]);

  // Marketing layout keeps the footer mounted across routes. Page height changes
  // after client navigations — refresh measurements and never leave content hidden.
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || reducedMotion) return;

    const { gsap, ScrollTrigger } = getGsap();
    const frame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (!footerInView(footer)) return;

      const brand = footer.querySelector<HTMLElement>("[data-footer-brand]");
      const cols = gsap.utils.toArray<HTMLElement>("[data-footer-col]", footer);
      const meta = footer.querySelector<HTMLElement>("[data-footer-meta]");
      const wordmark = footer.querySelector<HTMLElement>("[data-footer-wordmark]");
      gsap.set([brand, ...cols, meta].filter(Boolean), {
        clearProps: "opacity,visibility,transform",
      });
      if (wordmark) {
        gsap.set(wordmark, { clearProps: "opacity,visibility,transform" });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, reducedMotion]);

  return (
    <footer
      ref={footerRef}
      className="relative mt-auto overflow-x-clip bg-[#0B0912] text-[#F6F3FC]"
    >
      <div
        data-footer-glow
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[28rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(109,40,217,0.28)_0%,rgba(76,29,149,0.12)_42%,transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(167,139,250,0.08),transparent_55%)]"
      />

      {/*
        Equal gutters: px-5 (20px) on mobile; sm/lg match shared Container tokens.
        Wordmark stays outside this Container — unchanged.
      */}
      <Container className="relative px-5 pt-16 pb-8 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.6fr)] lg:gap-16 xl:gap-20">
          <div data-footer-brand className="min-w-0 max-w-sm">
            <Logo tone="inverse" />
            <p className="mt-5 text-left text-[15px] leading-7 text-[#B7AEC9]">
              {footerTagline}
            </p>
          </div>

          <nav aria-label="Footer" className="min-w-0">
            {/* Mobile: equal 1fr columns, packed stacks */}
            <div
              className="grid gap-x-5 gap-y-0 sm:hidden"
              style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
            >
              <div className="flex min-w-0 flex-col gap-8">
                {mobileNavLeft.map((column) => (
                  <FooterNavColumn
                    key={column.title}
                    title={column.title}
                    links={column.links}
                  />
                ))}
              </div>
              <div className="flex min-w-0 flex-col gap-8">
                {mobileNavRight.map((column) => (
                  <FooterNavColumn
                    key={column.title}
                    title={column.title}
                    links={column.links}
                  />
                ))}
              </div>
            </div>

            {/* Tablet / desktop: preserve existing multi-column layout */}
            <div className="hidden min-w-0 gap-x-6 gap-y-8 sm:grid sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
              {footerColumns.map((column) => (
                <FooterNavColumn
                  key={column.title}
                  title={column.title}
                  links={column.links}
                />
              ))}
            </div>
          </nav>
        </div>

        <div
          data-footer-meta
          className="footer-meta mt-12 flex flex-nowrap items-center justify-between gap-x-3 border-t border-white/10 pt-6 text-[#9A91AB] sm:mt-14 sm:gap-x-6"
        >
          <p className="footer-meta-copy shrink-0 whitespace-nowrap">
            <span className="sm:hidden">© 2026 HelpNova</span>
            <span className="hidden sm:inline">{siteConfig.copyright}</span>
          </p>
          <nav
            aria-label="Legal"
            className="footer-meta-legal flex shrink-0 flex-nowrap items-center"
          >
            {footerLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0912]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>

      {/* Wordmark: intentionally unchanged */}
      <div
        className="footer-wordmark-stage relative mt-4 select-none sm:mt-6"
        aria-hidden="true"
      >
        <p
          data-footer-wordmark
          className="footer-wordmark mx-auto w-full px-2 text-center font-heading font-extrabold tracking-tight text-[#F4F0FA]"
        >
          Help<span className="text-[#C4B5FD]">Nova</span>
        </p>
      </div>
    </footer>
  );
}
