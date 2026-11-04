"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, MessageSquareText, X } from "lucide-react";
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
      { label: "Automation", href: routes.homeAutomation.href },
      {
        label: "Shared Inbox",
        href: routes.homeInbox.href,
        active: true,
      },
    ],
  },
  {
    label: "Product",
    items: [
      { label: "Features", href: routes.features.href },
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

export function Nav3() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 overflow-visible bg-transparent px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cn(
            "pointer-events-auto mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-3 overflow-visible transition-all duration-300 lg:grid-cols-[auto_1fr_auto]",
            scrolled ? "gap-2" : "gap-3",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2.5 rounded-[1.35rem] rounded-br-md border px-3 transition-all duration-300",
              scrolled
                ? "border-[color-mix(in_oklab,var(--accent)_28%,var(--border))] bg-[color-mix(in_oklab,var(--ih-nav)_72%,transparent)] shadow-[0_10px_28px_rgb(109_40_217_/_0.12)] backdrop-blur-md"
                : "border-border/35 bg-transparent shadow-none backdrop-blur-none",
              scrolled ? "h-12 sm:h-[3.25rem]" : "h-14 sm:h-[3.75rem]",
            )}
          >
            <Logo href={routes.homeInbox.href} />
            <span className="hidden items-center gap-1.5 border-l border-border pl-2.5 text-[10px] font-semibold tracking-[0.16em] text-accent uppercase sm:inline-flex">
              <span
                className="size-1.5 animate-pulse rounded-full bg-[var(--ih-cyan)]"
                aria-hidden
              />
              Inbox
            </span>
          </div>

          <nav
            aria-label="Shared Inbox navigation"
            className={cn(
              "hidden items-center justify-center gap-0.5 rounded-[1.35rem] rounded-tl-md border px-2 transition-all duration-300 lg:flex",
              scrolled
                ? "border-border/70 bg-[color-mix(in_oklab,var(--ih-nav)_72%,transparent)] backdrop-blur-md"
                : "border-border/35 bg-transparent backdrop-blur-none",
              scrolled ? "h-12" : "h-14",
            )}
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
                    className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-foreground/85 transition hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => setOpenGroup(open ? null : group.label)}
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
                    <div className="absolute top-full left-0 z-50 min-w-[13.5rem] pt-2">
                      <div className="overflow-hidden rounded-2xl rounded-tl-md border border-border bg-surface/96 p-2 shadow-[var(--shadow-soft)] backdrop-blur-xl">
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
              className="rounded-xl px-3 py-2 text-sm font-medium text-foreground/85 transition hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Pricing
            </Link>
          </nav>

          <div
            className={cn(
              "flex items-center justify-end gap-2 rounded-[1.35rem] rounded-bl-md border px-2.5 transition-all duration-300",
              scrolled
                ? "border-border/70 bg-[color-mix(in_oklab,var(--ih-nav)_72%,transparent)] backdrop-blur-md"
                : "border-border/35 bg-transparent backdrop-blur-none",
              scrolled ? "h-12" : "h-14",
            )}
          >
            <ThemeSwitcher />
            <div className="hidden items-center gap-1.5 lg:flex">
              <Button href={routes.login.href} variant="ghost" size="sm">
                Login
              </Button>
              <Button href={routes.demo.href} size="sm">
                Explore Demo
              </Button>
            </div>
            <button
              ref={triggerRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls={menuId}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? (
                <X className="size-5" aria-hidden />
              ) : (
                <MessageSquareText className="size-5" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div
          id={menuId}
          className="fixed inset-0 z-40 bg-[color-mix(in_oklab,var(--background)_94%,transparent)] pt-[4.75rem] backdrop-blur-2xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-full flex-col overflow-y-auto px-4 pb-10">
            <p className="mb-4 text-[11px] font-semibold tracking-[0.2em] text-accent uppercase">
              Conversation menu
            </p>
            <div className="mx-auto w-full max-w-lg space-y-2">
              {navGroups.map((group) => {
                const expanded = mobileExpanded === group.label;
                return (
                  <div
                    key={group.label}
                    className="overflow-hidden rounded-[1.25rem] rounded-tl-md border border-border bg-surface/95"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3.5 text-left font-heading text-lg font-semibold"
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
                className="block rounded-[1.25rem] rounded-tl-md border border-border bg-surface/95 px-4 py-3.5 font-heading text-lg font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex flex-wrap gap-2 pt-4">
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
