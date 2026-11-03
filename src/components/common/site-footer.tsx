"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
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

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || reducedMotion) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-footer-brand]", {
        y: 18,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 88%",
          once: true,
        },
      });

      gsap.from("[data-footer-col]", {
        y: 20,
        autoAlpha: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 84%",
          once: true,
        },
      });

      gsap.from("[data-footer-meta]", {
        y: 12,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 78%",
          once: true,
        },
      });

      gsap.fromTo(
        "[data-footer-wordmark]",
        { y: 48, autoAlpha: 0.15 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 72%",
            once: true,
          },
        },
      );

      gsap.to("[data-footer-glow]", {
        xPercent: 8,
        yPercent: -4,
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, footer);

    return () => ctx.revert();
  }, [reducedMotion]);

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

      <Container className="relative pt-16 pb-8 sm:pt-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.6fr)] lg:gap-16 xl:gap-20">
          <div data-footer-brand className="max-w-sm">
            <Logo tone="inverse" />
            <p className="mt-5 text-justify text-[15px] leading-7 text-[#B7AEC9]">
              {footerTagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
              {footerColumns.map((column) => (
                <div key={column.title} data-footer-col>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B819C]">
                    {column.title}
                  </p>
                  <ul className="mt-3.5 space-y-2">
                    {column.links.map((link) => (
                      <li key={`${column.title}-${link.href}`}>
                        <Link
                          href={link.href}
                          className={cn(
                            "text-sm text-[#D8D0E8] transition-colors duration-200",
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
              ))}
            </div>
          </nav>
        </div>

        <div
          data-footer-meta
          className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-[#9A91AB] sm:mt-14 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>{siteConfig.copyright}</p>
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {footerLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0912]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>

      <div
        className="relative mt-4 overflow-hidden select-none sm:mt-6"
        aria-hidden="true"
      >
        <p
          data-footer-wordmark
          className="footer-wordmark mx-auto w-full px-2 text-center font-heading font-extrabold leading-none tracking-tight text-[#F4F0FA] translate-y-[38%]"
        >
          Help<span className="text-[#C4B5FD]">Nova</span>
        </p>
      </div>
    </footer>
  );
}
