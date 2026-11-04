"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { inboxHomeFooter } from "@/data/marketing/home-inbox";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "AI Customer Support", href: routes.home.href },
      { label: "Automation Home", href: routes.homeAutomation.href },
      { label: "Shared Inbox Home", href: routes.homeInbox.href },
      { label: "Features", href: routes.features.href },
      { label: "Integrations", href: routes.integrations.href },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "AI Chatbot", href: routes.chatbot.href },
      { label: "Automation", href: routes.automation.href },
      { label: "Inbox Feature", href: routes.inbox.href },
      { label: "Pricing", href: routes.pricing.href },
      { label: "Guided Demo", href: routes.demo.href },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: routes.about.href },
      { label: "Contact", href: routes.contact.href },
      { label: "Case Studies", href: routes.caseStudies.href },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: routes.blog.href },
      { label: "FAQ", href: routes.faq.href },
      { label: "Privacy Policy", href: routes.privacy.href },
      { label: "Terms of Service", href: routes.terms.href },
    ],
  },
] as const;

const fragments = [
  "Where is order #48291?",
  "Internal note · Team only",
  "Assigned to Orders",
  "Resolved with context",
];

export function Footer3() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const heading = root.querySelector("[data-footer3-heading]");
      const links = root.querySelectorAll("[data-footer3-link]");
      const chips = root.querySelectorAll("[data-footer3-chip]");
      gsap.set([heading, ...links, ...chips], { autoAlpha: 0, y: 20 });

      ScrollTrigger.create({
        trigger: root,
        start: "top 85%",
        end: "top 40%",
        scrub: 0.55,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(heading, {
            autoAlpha: Math.min(1, p * 1.5),
            y: 20 * (1 - p),
          });
          chips.forEach((chip, index) => {
            const local = Math.max(0, Math.min(1, (p - index * 0.08) * 1.4));
            gsap.set(chip, { autoAlpha: local, y: 16 * (1 - local) });
          });
          links.forEach((link, index) => {
            const local = Math.max(0, Math.min(1, (p - index * 0.03) * 1.25));
            gsap.set(link, { autoAlpha: local, y: 12 * (1 - local) });
          });
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <footer
      ref={rootRef}
      className="relative overflow-hidden border-t border-border bg-[radial-gradient(ellipse_70%_50%_at_20%_0%,color-mix(in_oklab,var(--accent)_16%,transparent),transparent_55%),radial-gradient(ellipse_50%_40%_at_90%_20%,color-mix(in_oklab,var(--ih-cyan)_12%,transparent),transparent_50%),var(--background)]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,color-mix(in_oklab,var(--accent)_18%,transparent)_1px,transparent_0)] bg-size-[28px_28px] opacity-35" />
        <svg
          className="absolute inset-x-0 top-10 h-40 w-full opacity-50"
          viewBox="0 0 1200 160"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M40 120 C220 20, 380 140, 560 70 S900 10, 1160 90"
            stroke="url(#ih-footer-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="ih-footer-grad" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="var(--accent)" stopOpacity="0.1" />
              <stop offset="0.5" stopColor="var(--ih-cyan)" stopOpacity="0.7" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="ih-eyebrow">The Last Message</p>
        <h2
          data-footer3-heading
          className="mt-4 max-w-3xl font-heading text-[2rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-[2.75rem]"
        >
          {inboxHomeFooter.statement}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          {inboxHomeFooter.supporting}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {fragments.map((fragment) => (
            <span
              key={fragment}
              data-footer3-chip
              className="rounded-full border border-border bg-surface/80 px-3 py-1.5 text-xs text-muted"
            >
              {fragment}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={inboxHomeFooter.primaryCta.href} size="lg">
            {inboxHomeFooter.primaryCta.label}
            <ArrowRight className="size-4" />
          </Button>
          <Button
            href={inboxHomeFooter.secondaryCta.href}
            variant="secondary"
            size="lg"
          >
            {inboxHomeFooter.secondaryCta.label}
          </Button>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                {column.title}
              </p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href + link.label} data-footer3-link>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Logo href={routes.homeInbox.href} />
          <p className="text-sm text-muted">
            © 2026 HelpNova. A personal product concept — not a live
            customer-support platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
