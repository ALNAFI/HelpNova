"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { ThemeSwitcher } from "@/components/common/theme-switcher";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { cn } from "@/utils/cn";

type NavGroup = {
  label: string;
  items: { label: string; href: string; active?: boolean }[];
};

const navGroups: NavGroup[] = [
  {
    label: "Home",
    items: [
      { label: "AI Customer Support", href: routes.home.href },
      {
        label: "Automation",
        href: routes.homeAutomation.href,
        active: true,
      },
      { label: "Shared Inbox", href: routes.homeInbox.href },
    ],
  },
  {
    label: "Product",
    items: [
      { label: "All Features", href: routes.features.href },
      { label: "AI Chatbot", href: routes.chatbot.href },
      { label: "Automation", href: routes.automation.href },
      { label: "Shared Inbox", href: routes.inbox.href },
      { label: "Integrations", href: routes.integrations.href },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "All Solutions", href: routes.solutions.href },
      { label: "Ecommerce", href: routes.ecommerce.href },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Blog", href: routes.blog.href },
      { label: "Case Studies", href: routes.caseStudies.href },
      { label: "FAQ", href: routes.faq.href },
    ],
  },
];

export function Nav2() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border transition-all duration-300",
            "bg-[color-mix(in_oklab,var(--au-nav)_88%,transparent)] shadow-[0_18px_50px_rgb(109_40_217_/_0.18)] backdrop-blur-xl",
            "border-[color-mix(in_oklab,var(--accent)_35%,var(--border))]",
            scrolled
              ? "h-14 px-3 sm:h-[3.6rem] sm:px-4"
              : "h-16 px-3.5 sm:h-[4.25rem] sm:px-5",
          )}
        >
          <div className="flex min-w-0 items-center gap-2">
            <Logo href={routes.homeAutomation.href} />
            <span className="hidden items-center gap-1 rounded-full border border-[color-mix(in_oklab,var(--au-cyan)_40%,var(--border))] bg-[color-mix(in_oklab,var(--au-cyan)_12%,transparent)] px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-[var(--au-cyan)] uppercase sm:inline-flex">
              <Sparkles className="size-3" aria-hidden />
              Universe
            </span>
          </div>

          <nav
            aria-label="Automation Universe"
            className="hidden items-center gap-1 lg:flex"
          >
            {navGroups.map((group) => {
              const open = openGroup === group.label;
              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-foreground/85 transition hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() =>
                      setOpenGroup(open ? null : group.label)
                    }
                  >
                    {group.label}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform",
                        open && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  {open ? (
                    <div className="absolute top-full left-0 z-50 min-w-[13rem] pt-2">
                      <div className="rounded-2xl border border-border bg-surface/95 p-2 shadow-[var(--shadow-soft)] backdrop-blur-xl">
                        {group.items.map((item) => {
                          const active =
                            item.active || pathname === item.href;
                          return (
                            <Link
                              key={item.href + item.label}
                              href={item.href}
                              className={cn(
                                "block rounded-xl px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                active
                                  ? "bg-accent/15 font-semibold text-accent"
                                  : "text-muted hover:bg-surface-muted hover:text-foreground",
                              )}
                              onClick={() => setOpenGroup(null)}
                            >
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
            <Link
              href={routes.pricing.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/85 transition hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Pricing
            </Link>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeSwitcher />
            <Button href={routes.login.href} variant="ghost" size="sm">
              Login
            </Button>
            <Button href={routes.demo.href} size="sm">
              Explore Demo
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeSwitcher />
            <button
              ref={triggerRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface"
              aria-expanded={mobileOpen}
              aria-controls={menuId}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? (
                <X className="size-5" aria-hidden />
              ) : (
                <Menu className="size-5" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div
          id={menuId}
          className="fixed inset-0 z-40 bg-[color-mix(in_oklab,var(--background)_92%,transparent)] pt-24 backdrop-blur-xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="h-full overflow-y-auto px-4 pb-10">
            <div className="mx-auto max-w-lg space-y-2">
              {navGroups.map((group) => {
                const expanded = mobileExpanded === group.label;
                return (
                  <div
                    key={group.label}
                    className="rounded-2xl border border-border bg-surface/90"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold"
                      aria-expanded={expanded}
                      onClick={() =>
                        setMobileExpanded(expanded ? null : group.label)
                      }
                    >
                      {group.label}
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform",
                          expanded && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>
                    {expanded ? (
                      <div className="space-y-1 border-t border-border px-2 py-2">
                        {group.items.map((item) => (
                          <Link
                            key={item.href + item.label}
                            href={item.href}
                            className="block rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-surface-muted hover:text-foreground"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
              <Link
                href={routes.pricing.href}
                className="block rounded-2xl border border-border bg-surface/90 px-4 py-3 text-sm font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex flex-wrap gap-2 pt-3">
                <Button href={routes.login.href} variant="secondary">
                  Login
                </Button>
                <Button href={routes.demo.href}>Explore Demo</Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
