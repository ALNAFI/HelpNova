"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  headerActions,
  headerNav,
  headerPrimaryLinks,
  type NavGroup,
  type NavLink,
} from "@/config/navigation";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const ACCORDION_MS = 460;
const PANEL_MS = 420;

/** Exact `/` match; nested routes match their prefix (e.g. /blog/[slug] → /blog). */
export function navHrefMatches(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isPrimaryActive(pathname: string) {
  return headerPrimaryLinks.some((link) => navHrefMatches(pathname, link.href));
}

/** Group that owns the current route, or null when Pricing (or no match). */
export function activeNavGroupLabel(pathname: string): string | null {
  if (isPrimaryActive(pathname)) return null;

  let best: { label: string; hrefLength: number } | null = null;
  for (const group of headerNav) {
    for (const item of group.items) {
      if (!navHrefMatches(pathname, item.href)) continue;
      if (!best || item.href.length > best.hrefLength) {
        best = { label: group.label, hrefLength: item.href.length };
      }
    }
  }
  return best?.label ?? null;
}

function isLinkActive(pathname: string, href: string, pool: NavLink[]) {
  if (!navHrefMatches(pathname, href)) return false;
  // Prefer the most specific matching href in the pool (e.g. /features/chatbot over /features).
  const longerMatch = pool.some(
    (item) =>
      item.href !== href &&
      item.href.length > href.length &&
      navHrefMatches(pathname, item.href),
  );
  return !longerMatch;
}

function allNavLinks(): NavLink[] {
  return [
    ...headerNav.flatMap((group) => group.items),
    ...headerPrimaryLinks,
  ];
}

type MobileNavProps = {
  open: boolean;
  menuId: string;
  /** Bumps on each open so accordion state re-inits for the current route. */
  openEpoch: number;
  onClose: () => void;
};

export function MobileNav({
  open,
  menuId,
  openEpoch,
  onClose,
}: MobileNavProps) {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();
  const baseId = useId();
  const linkPool = allNavLinks();

  const panelDurationClass = reducedMotion
    ? "duration-0"
    : "duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <>
      <button
        type="button"
        aria-label="Dismiss menu"
        tabIndex={open ? undefined : -1}
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-0 bottom-0 top-[var(--header-height)] z-30 bg-foreground/35 backdrop-blur-[2px] lg:hidden",
          panelDurationClass,
          "transition-[opacity,visibility]",
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0",
        )}
        style={
          reducedMotion ? undefined : { transitionDuration: `${PANEL_MS}ms` }
        }
        onClick={onClose}
      />

      {/* Shell stays mounted so open animates top→down and close animates up. */}
      <div
        id={menuId}
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={cn(
          "absolute inset-x-0 top-full z-40 border-b border-border bg-background shadow-lg will-change-transform lg:hidden",
          panelDurationClass,
          "transition-transform",
          open
            ? "translate-y-0"
            : "pointer-events-none -translate-y-[calc(100%+0.5px)]",
        )}
        style={
          reducedMotion ? undefined : { transitionDuration: `${PANEL_MS}ms` }
        }
      >
        <MobileNavAccordion
          key={openEpoch}
          open={open}
          pathname={pathname}
          reducedMotion={reducedMotion}
          baseId={baseId}
          linkPool={linkPool}
          onClose={onClose}
        />
      </div>
    </>
  );
}

function MobileNavAccordion({
  open,
  pathname,
  reducedMotion,
  baseId,
  linkPool,
  onClose,
}: {
  open: boolean;
  pathname: string;
  reducedMotion: boolean;
  baseId: string;
  linkPool: NavLink[];
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(() =>
    activeNavGroupLabel(pathname),
  );

  const durationClass = reducedMotion
    ? "duration-0"
    : "duration-[460ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

  function toggleGroup(label: string) {
    setExpanded((prev) => (prev === label ? null : label));
  }

  function renderGroup(group: NavGroup) {
    const isOpen = open && expanded === group.label;
    const panelId = `${baseId}-${group.label.replace(/\s+/g, "-").toLowerCase()}`;

    return (
      <div key={group.label} className="border-b border-border last:border-b-0">
        <button
          type="button"
          className="flex min-h-11 w-full items-center justify-between gap-3 px-2.5 py-2 text-left text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-expanded={isOpen}
          aria-controls={panelId}
          tabIndex={open ? undefined : -1}
          onClick={() => toggleGroup(group.label)}
        >
          <span>{group.label}</span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-muted transition-transform",
              durationClass,
              isOpen && "rotate-180",
            )}
            aria-hidden
          />
        </button>

        <div
          id={panelId}
          role="region"
          aria-label={group.label}
          aria-hidden={!isOpen}
          inert={!isOpen ? true : undefined}
          className={cn(
            "grid transition-[grid-template-rows]",
            durationClass,
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
          style={
            reducedMotion
              ? undefined
              : { transitionDuration: `${ACCORDION_MS}ms` }
          }
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="space-y-0.5 pb-2 pl-3">
              {group.items.map((item) => {
                const active = isLinkActive(pathname, item.href, linkPool);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      tabIndex={isOpen ? undefined : -1}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block min-h-11 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-accent-soft text-accent"
                          : "text-foreground hover:bg-surface-muted",
                      )}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Container className="py-2">
      <nav aria-label="Mobile" className="flex flex-col">
        {headerNav.map(renderGroup)}

        <div className="flex flex-col gap-1 border-t border-border pt-2 pb-3">
          {headerPrimaryLinks.map((link) => {
            const active = isLinkActive(pathname, link.href, linkPool);
            return (
              <Link
                key={link.label}
                href={link.href}
                tabIndex={open ? undefined : -1}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-foreground hover:bg-surface-muted",
                )}
                onClick={onClose}
              >
                {link.label}
              </Link>
            );
          })}
          <Button
            href={headerActions.login.href}
            variant="secondary"
            className="min-h-11"
            onClick={onClose}
            tabIndex={open ? undefined : -1}
          >
            {headerActions.login.label}
          </Button>
          <Button
            href={headerActions.demo.href}
            className="min-h-11"
            onClick={onClose}
            tabIndex={open ? undefined : -1}
          >
            {headerActions.demo.label}
          </Button>
        </div>
      </nav>
    </Container>
  );
}
