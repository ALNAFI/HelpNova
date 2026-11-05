"use client";

import { useEffect, useRef, useState } from "react";
import {
  Filter,
  GitBranch,
  Inbox,
  Split,
  StickyNote,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { RubberSegment } from "@/components/ui/rubber-segment";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  ecommerceInquiries,
  ecommerceWalkthroughCopy,
  getEcommerceInquiry,
  getOrderRuleDestination,
  type EcommerceInquiryId,
} from "@/data/marketing/ecommerce";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

const inquirySegmentItems = ecommerceInquiries.map((item) => ({
  value: item.id,
  label: item.label,
}));

function isEcommerceInquiryId(value: string): value is EcommerceInquiryId {
  return ecommerceInquiries.some((item) => item.id === value);
}

export function EcommerceWalkthrough() {
  const [selectedId, setSelectedId] =
    useState<EcommerceInquiryId>("order-tracking");
  const fixture = getEcommerceInquiry(selectedId);
  const { matched, destination } = getOrderRuleDestination(fixture.topic);
  const reducedMotion = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<{ kill: () => void } | null>(null);
  const animGen = useRef(0);
  const resultCopy = matched
    ? ecommerceWalkthroughCopy.matchedResult
    : ecommerceWalkthroughCopy.otherwiseResult;

  useEffect(() => {
    const root = canvasRef.current;
    if (!root) return;

    const gen = ++animGen.current;
    timelineRef.current?.kill();
    timelineRef.current = null;

    const activePath = root.querySelector<SVGPathElement>(
      matched ? "[data-route='matched']" : "[data-route='otherwise']",
    );
    const inactivePath = root.querySelector<SVGPathElement>(
      matched ? "[data-route='otherwise']" : "[data-route='matched']",
    );
    const mainPaths = root.querySelectorAll<SVGPathElement>("[data-route='main']");
    const stamp = root.querySelector("[data-team-stamp]");
    const inbox = root.querySelector("[data-inbox-panel]");
    const result = root.querySelector("[data-route-result]");

    if (reducedMotion) {
      mainPaths.forEach((path) => {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
        path.style.opacity = "1";
      });
      if (activePath) {
        activePath.style.strokeDasharray = "none";
        activePath.style.strokeDashoffset = "0";
        activePath.style.opacity = "1";
      }
      if (inactivePath) {
        inactivePath.style.opacity = "0.4";
        inactivePath.style.strokeDashoffset = "0";
      }
      return;
    }

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const paths = [...mainPaths, activePath, inactivePath].filter(
        Boolean,
      ) as SVGPathElement[];

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: path === inactivePath ? 0.35 : 0.4,
        });
      });

      if (result) gsap.set(result, { autoAlpha: 0.45 });
      if (inbox) gsap.set(inbox, { autoAlpha: 0.55 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          if (gen !== animGen.current) return;
        },
      });
      timelineRef.current = tl;

      mainPaths.forEach((path, index) => {
        tl.to(
          path,
          { strokeDashoffset: 0, opacity: 1, duration: 0.35 },
          index === 0 ? 0 : "-=0.08",
        );
      });

      tl.to(
        activePath,
        { strokeDashoffset: 0, opacity: 1, duration: 0.5 },
        "-=0.05",
      ).to(inactivePath, { opacity: 0.4, duration: 0.25 }, "<");

      if (stamp) {
        tl.fromTo(
          stamp,
          { scale: 1.04, rotate: -3 },
          { scale: 1, rotate: -2, duration: 0.28, ease: "power2.out" },
          "-=0.1",
        );
      }

      if (result) {
        tl.to(result, { autoAlpha: 1, duration: 0.28 }, "-=0.12");
      }

      if (inbox) {
        tl.to(inbox, { autoAlpha: 1, duration: 0.3 }, "-=0.18").fromTo(
          inbox,
          { boxShadow: "0 0 0 0 transparent" },
          {
            boxShadow:
              "0 0 0 2px color-mix(in oklab, var(--accent) 45%, transparent)",
            duration: 0.28,
            yoyo: true,
            repeat: 1,
          },
          "-=0.05",
        );
      }
    }, root);

    return () => {
      animGen.current += 1;
      timelineRef.current?.kill();
      timelineRef.current = null;
      ctx.revert();
    };
  }, [matched, selectedId, reducedMotion]);

  return (
    <section
      id="where-should-this-inquiry-go"
      className="scroll-mt-28 overflow-x-clip bg-surface-muted/40 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          eyebrow={ecommerceWalkthroughCopy.eyebrow}
          title={ecommerceWalkthroughCopy.title}
          description={ecommerceWalkthroughCopy.description}
          className="mb-8 max-w-3xl"
        />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="mb-2 text-sm font-medium text-foreground">
              Select an inquiry
            </p>
            <RubberSegment
              items={inquirySegmentItems}
              value={selectedId}
              onChange={(value) => {
                if (isEcommerceInquiryId(value)) setSelectedId(value);
              }}
              trackColor="var(--surface-muted)"
              thumbColor="var(--accent)"
              textColor="var(--muted)"
              activeTextColor="var(--accent-foreground)"
              size="md"
              radius={12}
              inset={3}
              equalSlots
              stretch={100}
              squash={3}
              speed={1}
              glide={75}
              draggable
              className="w-full max-w-md sm:w-auto sm:min-w-[20rem]"
              aria-label="Inquiry type"
            />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-[12px] font-medium text-foreground">
            <Filter className="size-3.5 text-accent" aria-hidden />
            {ecommerceWalkthroughCopy.activeRuleLabel}
          </div>
        </div>

        <div
          ref={canvasRef}
          className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start"
        >
          <div className="min-w-0">
            <div className="rounded-[var(--radius-workspace)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:p-6">
              <WorkflowGraph matched={matched} destination={destination} />
              <p
                data-route-result
                className="mt-5 rounded-xl border border-border bg-surface-muted/70 px-4 py-3 text-sm leading-relaxed text-pretty"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="font-medium text-foreground">
                  {ecommerceWalkthroughCopy.liveRegionPrefix}:{" "}
                </span>
                <span className="text-muted">{resultCopy}</span>
                <span className="mt-1 block font-mono text-[11px] tracking-wide text-accent uppercase">
                  {matched ? "Matched" : "Otherwise"} → {destination}
                </span>
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <ConversationPanel
              key={selectedId}
              customerName={fixture.customerName}
              subject={fixture.subject}
              message={fixture.message}
              orderReference={fixture.orderReference}
              topicLabel={fixture.topicLabel}
              destination={destination}
              internalNote={fixture.internalNote}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function WorkflowGraph({
  matched,
  destination,
}: {
  matched: boolean;
  destination: string;
}) {
  return (
    <div className="relative">
      <div className="space-y-3">
        <NodeCard
          icon={Inbox}
          label="New Inquiry"
          detail="Customer message enters the shared inbox"
          active
        />
        <ConnectorSvg route="main" />
        <NodeCard
          icon={Filter}
          label="Topic Condition"
          detail={ecommerceWalkthroughCopy.conditionQuestion}
          active
          emphasize
        />
        <ConnectorSvg route="main" />

        <div className="grid gap-3 sm:grid-cols-2">
          <NodeCard
            icon={GitBranch}
            label="Matched"
            detail="Route to Orders"
            active={matched}
            dimmed={!matched}
          />
          <NodeCard
            icon={Split}
            label="Otherwise"
            detail="Route to General Triage"
            active={!matched}
            dimmed={matched}
          />
        </div>

        <div className="relative h-12 sm:h-14" aria-hidden>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
          >
            <path
              data-route="matched"
              d="M25 0 C25 24 50 24 50 40"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.75"
              opacity="0.35"
            />
            <path
              data-route="otherwise"
              d="M75 0 C75 24 50 24 50 40"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.75"
              opacity="0.35"
            />
          </svg>
        </div>

        <div
          data-team-stamp
          className={cn(
            "flex items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 transition-colors",
            matched
              ? "border-accent/50 bg-accent-soft"
              : "border-amber-500/40 bg-amber-500/10",
          )}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface text-accent shadow-sm">
              <Users className="size-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                Destination
              </p>
              <p className="font-heading text-lg font-semibold">{destination}</p>
            </div>
          </div>
          <span className="shrink-0 rotate-[-2deg] rounded-md border-2 border-current px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-accent uppercase">
            Assigned to {destination}
          </span>
        </div>
      </div>
    </div>
  );
}

function ConnectorSvg({ route }: { route: "main" }) {
  return (
    <div className="flex justify-center" aria-hidden>
      <svg width="4" height="28" className="overflow-visible">
        <path
          data-route={route}
          d="M2 0 V28"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}

function NodeCard({
  icon: Icon,
  label,
  detail,
  active,
  dimmed,
  emphasize,
}: {
  icon: LucideIcon;
  label: string;
  detail: string;
  active?: boolean;
  dimmed?: boolean;
  emphasize?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 transition",
        active
          ? "border-accent/40 bg-accent-soft/70"
          : "border-border bg-surface-muted/40",
        dimmed && "opacity-60",
        emphasize && "ring-1 ring-accent/25",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-xl border",
            active
              ? "border-accent/30 bg-accent text-accent-foreground"
              : "border-border bg-surface text-muted",
          )}
        >
          <Icon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="font-heading text-sm font-semibold">{label}</p>
          <p className="mt-0.5 text-xs leading-snug text-muted">{detail}</p>
        </div>
      </div>
    </div>
  );
}

function ConversationPanel({
  customerName,
  subject,
  message,
  orderReference,
  topicLabel,
  destination,
  internalNote,
}: {
  customerName: string;
  subject: string;
  message: string;
  orderReference: string | null;
  topicLabel: string;
  destination: string;
  internalNote: string;
}) {
  return (
    <article
      data-inbox-panel
      className="rounded-[var(--radius-workspace)] border border-border bg-surface shadow-[var(--shadow-soft)] transition-[box-shadow] duration-300"
    >
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-3.5">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
            {ecommerceWalkthroughCopy.conversationTitle}
          </p>
          <p className="mt-1 font-heading text-base font-semibold">
            {customerName}
          </p>
          <p className="text-sm text-muted">{subject}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Open
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="rounded-md border border-border bg-surface-muted px-2 py-1 font-mono tracking-wide">
            {topicLabel}
          </span>
          {orderReference ? (
            <span className="rounded-md border border-border bg-surface-muted px-2 py-1 font-mono tracking-wide break-all">
              {orderReference}
            </span>
          ) : null}
          <span className="rounded-md bg-accent-soft px-2 py-1 font-semibold text-accent">
            Assigned · {destination}
          </span>
        </div>

        <div className="rounded-2xl rounded-tl-md border border-border bg-surface-muted/60 px-3.5 py-3">
          <p className="text-[11px] font-medium text-muted">
            {customerName} · Customer
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-pretty">{message}</p>
        </div>

        <div className="rounded-2xl border border-accent/25 bg-accent/10 px-3.5 py-3">
          <div className="flex items-center gap-2">
            <StickyNote className="size-3.5 text-accent" aria-hidden />
            <p className="text-[11px] font-semibold tracking-[0.12em] text-accent uppercase">
              {ecommerceWalkthroughCopy.internalNoteLabel}
            </p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-pretty">
            {internalNote}
          </p>
          <p className="mt-2 text-[11px] text-muted">
            {ecommerceWalkthroughCopy.internalNoteHelper}
          </p>
        </div>
      </div>
    </article>
  );
}
