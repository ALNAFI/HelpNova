"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { automationHomeIntegrations } from "@/data/marketing/home-automation";
import { cn } from "@/utils/cn";

export function AutomationIntegrations() {
  const [activeId, setActiveId] = useState(
    automationHomeIntegrations.items[0].id,
  );
  const active =
    automationHomeIntegrations.items.find((item) => item.id === activeId) ??
    automationHomeIntegrations.items[0];

  return (
    <section id={automationHomeIntegrations.id} className="au-section py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="au-eyebrow">A Connected Ecosystem</p>
          <h2 className="mt-3 font-heading text-[2rem] font-semibold tracking-tight text-balance sm:text-[2.6rem]">
            {automationHomeIntegrations.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {automationHomeIntegrations.description}
          </p>
          <p className="mt-3 text-xs text-muted">
            {automationHomeIntegrations.notice}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="au-panel relative mx-auto aspect-square w-full max-w-lg rounded-full p-8">
            <div className="absolute inset-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--au-lavender),var(--accent))] shadow-[0_0_40px_color-mix(in_oklab,var(--accent)_40%,transparent)]" />
            {automationHomeIntegrations.items.map((item, index) => {
              const angle =
                (index / automationHomeIntegrations.items.length) * Math.PI * 2 -
                Math.PI / 2;
              const x = 50 + Math.cos(angle) * 38;
              const y = 50 + Math.sin(angle) * 38;
              const selected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-surface text-muted hover:text-foreground",
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="au-panel rounded-[1.5rem] p-5 sm:p-6">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              {active.category}
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold">
              {active.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {active.relationship}
            </p>
            <p className="mt-4 text-xs text-muted">
              Illustrative example · not connected · no OAuth.
            </p>
            <Link
              href={automationHomeIntegrations.cta.href}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {automationHomeIntegrations.cta.label}
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
