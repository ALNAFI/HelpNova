"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { ThemeSwitcher } from "@/components/common/theme-switcher";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  headerActions,
  headerNav,
  headerPrimaryLinks,
} from "@/config/navigation";
import { cn } from "@/utils/cn";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border bg-background/85 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-background/70 backdrop-blur-md",
      )}
    >
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {headerNav.map((group) => {
            const isOpen = openMenu === group.label;
            return (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(group.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() =>
                    setOpenMenu(isOpen ? null : group.label)
                  }
                >
                  {group.label}
                  <ChevronDown
                    className={cn(
                      "size-3.5 transition-transform",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
                <div
                  className={cn(
                    "absolute left-0 top-full z-50 min-w-[280px] pt-2 transition-all",
                    isOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1 opacity-0",
                  )}
                >
                  <div className="rounded-[var(--radius-card)] border border-border bg-surface p-2 shadow-[var(--shadow-soft)]">
                    {group.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block rounded-[var(--radius-control)] px-3 py-2.5 transition-colors hover:bg-surface-muted"
                        onClick={() => setOpenMenu(null)}
                      >
                        <span className="block text-sm font-medium text-foreground">
                          {item.label}
                        </span>
                        {item.description ? (
                          <span className="mt-0.5 block text-xs text-muted">
                            {item.description}
                          </span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          {headerPrimaryLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeSwitcher />
          <Button href={headerActions.login.href} variant="ghost" size="sm">
            {headerActions.login.label}
          </Button>
          <Button href={headerActions.demo.href} size="sm">
            {headerActions.demo.label}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeSwitcher />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-[var(--radius-control)] border border-border bg-surface"
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </Container>

      <div
        id={menuId}
        className={cn(
          "border-t border-border bg-background lg:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <div
          className="max-h-[calc(100dvh-var(--header-height))] overflow-y-auto"
          data-lenis-prevent
        >
        <Container className="space-y-6 py-5">
          {headerNav.map((group) => (
            <div key={group.label}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-[var(--radius-control)] px-3 py-2.5 text-sm font-medium text-foreground hover:bg-surface-muted"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-2 border-t border-border pt-4">
            {headerPrimaryLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-[var(--radius-control)] px-3 py-2.5 text-sm font-medium hover:bg-surface-muted"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              href={headerActions.login.href}
              variant="secondary"
              onClick={() => setMobileOpen(false)}
            >
              {headerActions.login.label}
            </Button>
            <Button
              href={headerActions.demo.href}
              onClick={() => setMobileOpen(false)}
            >
              {headerActions.demo.label}
            </Button>
          </div>
        </Container>
        </div>
      </div>
    </header>
  );
}
