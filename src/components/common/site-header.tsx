"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { DesktopNav } from "@/components/common/desktop-nav";
import { Logo } from "@/components/common/logo";
import { MobileNav } from "@/components/common/mobile-nav";
import { ThemeSwitcher } from "@/components/common/theme-switcher";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { headerActions } from "@/config/navigation";
import { cn } from "@/utils/cn";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpenEpoch, setMobileOpenEpoch] = useState(0);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-mobile-nav-open");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-mobile-nav-open", "");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setMobileOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.removeAttribute("data-mobile-nav-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header
      className={cn(
        "relative sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border bg-background/85 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-background/70 backdrop-blur-md",
      )}
    >
      {/* Opaque bar above the menu so close slides upward underneath it. */}
      <div
        className={cn(
          "relative z-50 border-b bg-background/70 backdrop-blur-md",
          scrolled
            ? "border-border bg-background/85"
            : "border-transparent",
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
              ref={toggleRef}
              type="button"
              className="inline-flex size-11 min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-control)] border border-border bg-surface"
              aria-expanded={mobileOpen}
              aria-controls={menuId}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => {
                if (!mobileOpen) setMobileOpenEpoch((epoch) => epoch + 1);
                setMobileOpen((v) => !v);
              }}
            >
              {mobileOpen ? (
                <X className="size-5" aria-hidden />
              ) : (
                <Menu className="size-5" aria-hidden />
              )}
            </button>
          </div>
        </Container>
      </div>

      <MobileNav
        open={mobileOpen}
        menuId={menuId}
        openEpoch={mobileOpenEpoch}
        onClose={closeMobile}
      />
    </header>
  );
}
