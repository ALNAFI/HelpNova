"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  headerNav,
  headerPrimaryLinks,
  type NavGroup,
} from "@/config/navigation";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const CLOSE_DELAY_MS = 160;
const OPEN_EASE = "power3.out";

export function DesktopNav() {
  const reducedMotion = usePrefersReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevIndexRef = useRef<number | null>(null);
  const wasOpenRef = useRef(false);

  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const panelId = useId();

  const activeGroup: NavGroup | undefined = headerNav.find(
    (group) => group.label === activeLabel,
  );
  const activeIndex = activeLabel
    ? headerNav.findIndex((group) => group.label === activeLabel)
    : -1;

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback(
    (label: string) => {
      clearCloseTimer();
      setActiveLabel(label);
    },
    [clearCloseTimer],
  );

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveLabel(null);
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const closeMenu = useCallback(() => {
    clearCloseTimer();
    setActiveLabel(null);
  }, [clearCloseTimer]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  useEffect(() => {
    if (!activeLabel) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeLabel, closeMenu]);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    const nav = navRef.current;
    if (!shell || !panel || !nav) return;

    const { gsap } = getGsap();

    if (!activeLabel || !activeGroup || !content) {
      wasOpenRef.current = false;
      prevIndexRef.current = null;
      if (reducedMotion) {
        gsap.set(shell, { autoAlpha: 0, y: 0 });
        return;
      }
      gsap.to(shell, {
        autoAlpha: 0,
        y: 6,
        duration: 0.16,
        ease: "power2.in",
        overwrite: "auto",
      });
      return;
    }

    const trigger = triggerRefs.current.get(activeLabel);
    if (!trigger) return;

    const navRect = nav.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();

    // Temporarily unlock size to measure the incoming menu content.
    gsap.set(panel, { width: "auto", height: "auto" });
    gsap.set(shell, { width: "auto" });
    const nextWidth = Math.ceil(Math.max(content.scrollWidth, 168));
    const nextHeight = Math.ceil(content.scrollHeight);
    const nextLeft = Math.round(triggerRect.left - navRect.left);

    const direction =
      prevIndexRef.current === null || activeIndex < 0
        ? 0
        : activeIndex > prevIndexRef.current
          ? 1
          : activeIndex < prevIndexRef.current
            ? -1
            : 0;

    const opening = !wasOpenRef.current;

    if (reducedMotion) {
      gsap.set(shell, {
        autoAlpha: 1,
        x: nextLeft,
        y: 0,
        width: nextWidth,
      });
      gsap.set(panel, { width: nextWidth, height: nextHeight });
      gsap.set(content, { autoAlpha: 1, x: 0, y: 0 });
    } else if (opening) {
      gsap.set(shell, {
        autoAlpha: 0,
        x: nextLeft,
        y: 8,
        width: nextWidth,
      });
      gsap.set(panel, { width: nextWidth, height: nextHeight });
      gsap.set(content, { autoAlpha: 1, x: 0, y: 0 });
      gsap.to(shell, {
        autoAlpha: 1,
        y: 0,
        duration: 0.28,
        ease: OPEN_EASE,
        overwrite: "auto",
      });
    } else {
      gsap.to(shell, {
        autoAlpha: 1,
        x: nextLeft,
        y: 0,
        width: nextWidth,
        duration: 0.34,
        ease: OPEN_EASE,
        overwrite: "auto",
      });
      gsap.to(panel, {
        width: nextWidth,
        height: nextHeight,
        duration: 0.34,
        ease: OPEN_EASE,
        overwrite: "auto",
      });
      gsap.fromTo(
        content,
        { autoAlpha: 0, x: direction * 12, y: 3 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.22,
          ease: OPEN_EASE,
          overwrite: "auto",
        },
      );
    }

    wasOpenRef.current = true;
    prevIndexRef.current = activeIndex;
  }, [activeLabel, activeGroup, activeIndex, reducedMotion]);

  return (
    <nav
      ref={navRef}
      className="relative hidden items-center gap-1 lg:flex"
      aria-label="Primary"
      onMouseLeave={scheduleClose}
    >
      {headerNav.map((group) => {
        const isActive = activeLabel === group.label;
        return (
          <button
            key={group.label}
            type="button"
            ref={(node) => {
              if (node) triggerRefs.current.set(group.label, node);
              else triggerRefs.current.delete(group.label);
            }}
            className={cn(
              "inline-flex items-center gap-1 rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-surface-muted text-foreground"
                : "text-muted hover:bg-surface-muted hover:text-foreground",
            )}
            aria-expanded={isActive}
            aria-haspopup="true"
            aria-controls={panelId}
            onMouseEnter={() => openMenu(group.label)}
            onFocus={() => openMenu(group.label)}
            onClick={() => (isActive ? closeMenu() : openMenu(group.label))}
          >
            {group.label}
            <ChevronDown
              className={cn(
                "size-3.5 transition-transform duration-200",
                isActive && "rotate-180",
              )}
              aria-hidden
            />
          </button>
        );
      })}

      {headerPrimaryLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
          onMouseEnter={scheduleClose}
          onFocus={scheduleClose}
        >
          {link.label}
        </Link>
      ))}

      {/* Shared morphing panel — Attio-style continuous transitions */}
      <div
        ref={shellRef}
        className={cn(
          "absolute top-full left-0 z-50 pt-1.5 opacity-0",
          activeLabel ? "pointer-events-auto" : "pointer-events-none",
        )}
        onMouseEnter={clearCloseTimer}
      >
        <div
          ref={panelRef}
          id={panelId}
          role="menu"
          aria-hidden={!activeLabel}
          className="overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-soft)]"
        >
          <div ref={contentRef} className="p-1">
            {activeGroup ? (
              <ul className="flex min-w-[10.5rem] flex-col">
                {activeGroup.items.map((item) => (
                  <li key={item.href} role="none">
                    <Link
                      role="menuitem"
                      href={item.href}
                      className="block whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus-visible:bg-surface-muted"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
