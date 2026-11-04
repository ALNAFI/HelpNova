"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { automationHomeFooter } from "@/data/marketing/home-automation";
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
      { label: "Shared Inbox", href: routes.inbox.href },
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

export function Footer2() {
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll("[data-footer2-line]");
      const heading = root.querySelector("[data-footer2-heading]");
      const links = root.querySelectorAll("[data-footer2-link]");
      gsap.set([heading, ...links], { autoAlpha: 0, y: 18 });
      gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });

      ScrollTrigger.create({
        trigger: root,
        start: "top 80%",
        end: "top 35%",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(lines, { scaleX: p });
          gsap.set(heading, { autoAlpha: Math.min(1, p * 1.4), y: 18 * (1 - p) });
          links.forEach((link, index) => {
            const local = Math.max(0, Math.min(1, (p - index * 0.04) * 1.3));
            gsap.set(link, { autoAlpha: local, y: 14 * (1 - local) });
          });
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <footer
      ref={rootRef}
      className="relative overflow-hidden border-t border-border bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_55%),linear-gradient(180deg,var(--surface-muted),var(--background))]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--au-cyan)_12%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--accent)_10%,transparent)_1px,transparent_1px)] bg-size-[48px_48px] opacity-40" />
        <div
          data-footer2-line
          className="absolute top-24 left-[10%] h-px w-[35%] bg-gradient-to-r from-transparent via-[var(--au-cyan)] to-accent"
        />
        <div
          data-footer2-line
          className="absolute top-40 right-[12%] h-px w-[28%] bg-gradient-to-r from-accent via-[var(--au-cyan)] to-transparent"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
            The Final Connection
          </p>
          <h2
            data-footer2-heading
            className="mt-4 font-heading text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.6rem]"
          >
            {automationHomeFooter.statement}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {automationHomeFooter.supporting}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={automationHomeFooter.primaryCta.href} size="lg">
              {automationHomeFooter.primaryCta.label}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              href={automationHomeFooter.secondaryCta.href}
              variant="secondary"
              size="lg"
            >
              {automationHomeFooter.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title} data-footer2-link>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
                {column.title}
              </p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/85 transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Logo href={routes.homeAutomation.href} />
          <p className="text-xs text-muted">
            © 2026 HelpNova. A personal product concept — not a live
            customer-support platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
