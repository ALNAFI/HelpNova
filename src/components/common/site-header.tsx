"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { DesktopNav } from "@/components/common/desktop-nav";
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

        <DesktopNav />

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
          <Container className="space-y-4 py-4">
            {headerNav.map((group) => (
              <div key={group.label}>
                <p className="mb-1 px-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground hover:bg-surface-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-1.5 border-t border-border pt-3">
              {headerPrimaryLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-2.5 py-1.5 text-sm font-medium hover:bg-surface-muted"
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
