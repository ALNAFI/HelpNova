"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleDot,
  GitBranch,
  Inbox,
  Package,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  automationFeatureConsequence,
  automationFeatureInquiries,
  automationFeatureWalkthrough,
  evaluateOrderRule,
  getAutomationInquiry,
  getAutomationResultSummary,
  getNodeExplanation,
  getWorkloadContribution,
  type AutomationInquiryId,
  type AutomationNodeId,
} from "@/data/marketing/automation-feature";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/utils/cn";

export function AutomationFeatureExplorer() {
  const [inquiryId, setInquiryId] =
    useState<AutomationInquiryId>("order-tracking");
  const [nodeId, setNodeId] = useState<AutomationNodeId>("condition");
  const inquiry = getAutomationInquiry(inquiryId);
  const evaluation = evaluateOrderRule(inquiry.topic);
  const matched = evaluation.matched;
  const destination = evaluation.destination;
  const explanation = getNodeExplanation(
    nodeId,
    inquiry,
    matched,
    destination,
  );
  const resultSummary = getAutomationResultSummary(
    inquiry,
    matched,
    destination,
  );
  const reducedMotion = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<{ kill: () => void } | null>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const groupId = useId();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = canvasRef.current;
    if (!root) return;

    timelineRef.current?.kill();
    timelineRef.current = null;

    const condition = root.querySelector("[data-node='condition']");
    const destinationNode = root.querySelector(
      `[data-node='${matched ? "orders" : "triage"}']`,
    );
    const inbox = root.querySelector("[data-inbox-panel]");
    const activePath = root.querySelectorAll<SVGPathElement>(
      matched ? "[data-route='matched']" : "[data-route='otherwise']",
    );
    const inactivePath = root.querySelectorAll<SVGPathElement>(
      matched ? "[data-route='otherwise']" : "[data-route='matched']",
    );
    const mainPaths = root.querySelectorAll<SVGPathElement>("[data-route='main']");

    if (reducedMotion) {
      mainPaths.forEach((path) => {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
        path.style.opacity = "1";
      });
      activePath.forEach((path) => {
        path.style.strokeDasharray = "none";
        path.style.strokeDashoffset = "0";
        path.style.opacity = "1";
      });
      inactivePath.forEach((path) => {
        path.style.opacity = "0.28";
        path.style.strokeDashoffset = "0";
      });
      return;
    }

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const paths = [...mainPaths, ...activePath, ...inactivePath];
      paths.forEach((path) => {
        if (typeof path.getTotalLength !== "function") return;
        const length = path.getTotalLength();
        const isInactive = [...inactivePath].includes(path);
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: isInactive ? 0.22 : 0.4,
        });
      });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      timelineRef.current = tl;

      if (condition) {
        tl.fromTo(
          condition,
          {
            boxShadow: "0 0 0 0 transparent",
          },
          {
            boxShadow:
              "0 0 0 2px color-mix(in oklab, var(--accent) 45%, transparent)",
            duration: 0.28,
            yoyo: true,
            repeat: 1,
          },
        );
      }

      mainPaths.forEach((path, index) => {
        tl.to(
          path,
          { strokeDashoffset: 0, opacity: 1, duration: 0.3 },
          index === 0 ? "-=0.1" : "-=0.12",
        );
      });

      activePath.forEach((path) => {
        tl.to(path, { strokeDashoffset: 0, opacity: 1, duration: 0.45 }, "-=0.1");
      });
      inactivePath.forEach((path) => {
        tl.to(path, { opacity: 0.24, duration: 0.2 }, "<");
      });

      if (destinationNode) {
        tl.fromTo(
          destinationNode,
          { scale: 1.05 },
          { scale: 1, duration: 0.25 },
          "-=0.08",
        );
      }

      if (inbox) {
        tl.fromTo(
          inbox,
          { boxShadow: "0 0 0 0 transparent" },
          {
            boxShadow:
              "0 0 0 2px color-mix(in oklab, var(--accent) 30%, transparent)",
            duration: 0.28,
            yoyo: true,
            repeat: 1,
          },
          "-=0.05",
        );
      }
    }, root);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      ctx.revert();
    };
  }, [inquiryId, matched, reducedMotion]);

  function selectInquiry(id: AutomationInquiryId) {
    setInquiryId(id);
    const next = getAutomationInquiry(id);
    const result = evaluateOrderRule(next.topic);
    if (liveRef.current) {
      liveRef.current.textContent = `${next.label}. ${
        result.matched ? "Matched" : "Otherwise"
      } → ${result.destination}.`;
    }
  }

  return (
    <>
      <p
        ref={liveRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      <section
        id={automationFeatureWalkthrough.id}
        className="scroll-mt-28 py-16 sm:py-20 lg:py-24"
      >
        <Container>
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              title={automationFeatureWalkthrough.title}
              description={automationFeatureWalkthrough.instruction}
              className="mb-0 max-w-3xl"
            />
            <span className="w-fit rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
              {automationFeatureWalkthrough.ruleLabel}
            </span>
          </div>

          <div
            role="radiogroup"
            aria-label="Sample inquiry"
            className="mb-6 flex flex-wrap gap-2"
          >
            {automationFeatureInquiries.map((item) => {
              const active = inquiryId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  id={`${groupId}-${item.id}`}
                  onClick={() => selectInquiry(item.id)}
                  className={cn(
                    "inline-flex cursor-pointer items-center rounded-full border px-3.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border-accent/40 bg-accent text-accent-foreground"
                      : "border-border bg-surface text-muted hover:text-foreground",
                  )}
                >
                  {active ? (
                    <span
                      className="mr-1.5 size-1.5 rounded-full bg-accent-foreground"
                      aria-hidden
                    />
                  ) : null}
                  {item.label}
                </button>
              );
            })}
          </div>

          <p className="mb-5 rounded-xl border border-border bg-surface-muted/60 px-3.5 py-3 text-sm leading-relaxed text-pretty">
            {resultSummary}
          </p>

          <div
            ref={canvasRef}
            className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]"
          >
            <div className="rounded-[var(--radius-workspace)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:p-5">
              {/* Desktop graph */}
              <div
                className="relative hidden min-h-[22rem] lg:block"
                aria-hidden={!isDesktop}
                inert={!isDesktop ? true : undefined}
              >
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 640 360"
                  fill="none"
                  aria-hidden
                >
                  <path
                    data-route="main"
                    d="M320 72 L320 128"
                    stroke="var(--accent)"
                    strokeWidth="2"
                  />
                  <path
                    data-route="matched"
                    d="M320 188 C250 210, 170 230, 140 268"
                    stroke="var(--accent)"
                    strokeWidth="2.25"
                  />
                  <path
                    data-route="otherwise"
                    d="M320 188 C390 210, 470 230, 500 268"
                    stroke="currentColor"
                    className="text-border"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />
                </svg>

                <div className="absolute top-2 left-1/2 w-[14rem] -translate-x-1/2">
                  <WorkflowNode
                    id="inquiry"
                    selected={nodeId === "inquiry"}
                    onRoute={true}
                    onSelect={setNodeId}
                    eyebrow="Trigger"
                    title="New Inquiry"
                    detail={inquiry.topicLabel}
                  />
                </div>

                <div className="absolute top-[8.25rem] left-1/2 w-[15rem] -translate-x-1/2">
                  <WorkflowNode
                    id="condition"
                    selected={nodeId === "condition"}
                    onRoute={true}
                    onSelect={setNodeId}
                    eyebrow="Condition"
                    title={automationFeatureWalkthrough.conditionQuestion}
                    detail={`Topic: ${inquiry.topicLabel}`}
                    emphasize
                  />
                </div>

                <button
                  type="button"
                  role="radio"
                  aria-checked={nodeId === "matched"}
                  onClick={() => setNodeId("matched")}
                  className={cn(
                    "absolute top-[14.5rem] left-[5.5rem] rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    matched
                      ? "border-accent/40 bg-accent/15 text-accent"
                      : "border-border bg-surface text-muted",
                    nodeId === "matched" && "ring-2 ring-ring",
                  )}
                >
                  Matched
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={nodeId === "otherwise"}
                  onClick={() => setNodeId("otherwise")}
                  className={cn(
                    "absolute top-[14.5rem] right-[5rem] rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    !matched
                      ? "border-accent/40 bg-accent/15 text-accent"
                      : "border-border bg-surface text-muted",
                    nodeId === "otherwise" && "ring-2 ring-ring",
                  )}
                >
                  Otherwise
                </button>

                <div className="absolute bottom-2 left-6 w-[12.5rem]">
                  <WorkflowNode
                    id="orders"
                    selected={nodeId === "orders"}
                    onRoute={matched}
                    onSelect={setNodeId}
                    eyebrow="Destination"
                    title="Orders"
                    detail={matched ? "Active destination" : "Not assigned"}
                    icon={Package}
                  />
                </div>

                <div className="absolute right-6 bottom-2 w-[12.5rem]">
                  <WorkflowNode
                    id="triage"
                    selected={nodeId === "triage"}
                    onRoute={!matched}
                    onSelect={setNodeId}
                    eyebrow="Destination"
                    title="General Triage"
                    detail={!matched ? "Active destination" : "Not assigned"}
                    icon={Users}
                    quiet={!matched}
                  />
                </div>
              </div>

              {/* Mobile graph */}
              <div
                className="space-y-3 lg:hidden"
                aria-hidden={isDesktop}
                inert={isDesktop ? true : undefined}
              >
                <WorkflowNode
                  id="inquiry"
                  selected={nodeId === "inquiry"}
                  onRoute={true}
                  onSelect={setNodeId}
                  eyebrow="Trigger"
                  title="New Inquiry"
                  detail={inquiry.topicLabel}
                />
                <div className="flex justify-center" aria-hidden>
                  <GitBranch className="size-4 text-accent" />
                </div>
                <WorkflowNode
                  id="condition"
                  selected={nodeId === "condition"}
                  onRoute={true}
                  onSelect={setNodeId}
                  eyebrow="Condition"
                  title={automationFeatureWalkthrough.conditionQuestion}
                  detail={`Topic: ${inquiry.topicLabel}`}
                  emphasize
                />

                <BranchRow
                  id="matched"
                  label="Matched"
                  team="Orders"
                  active={matched}
                  selected={nodeId === "matched"}
                  onSelectBranch={() => setNodeId("matched")}
                  onSelectTeam={() => setNodeId("orders")}
                  teamSelected={nodeId === "orders"}
                />
                <BranchRow
                  id="otherwise"
                  label="Otherwise"
                  team="General Triage"
                  active={!matched}
                  selected={nodeId === "otherwise"}
                  onSelectBranch={() => setNodeId("otherwise")}
                  onSelectTeam={() => setNodeId("triage")}
                  teamSelected={nodeId === "triage"}
                />
              </div>
            </div>

            <aside className="rounded-[var(--radius-workspace)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:p-5">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                Node details
              </p>
              <h3 className="mt-2 font-heading text-lg font-semibold">
                {explanation.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-accent">
                {explanation.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">
                {explanation.explanation}
              </p>
              <div className="mt-5 rounded-xl border border-border bg-surface-muted/60 px-3 py-3">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                  Role
                </p>
                <p className="mt-1.5 text-sm text-foreground">
                  {
                    (
                      {
                        inquiry: "Starts the rule with a customer message.",
                        condition: "Checks the predefined topic field.",
                        matched: "Routes matching inquiries to Orders.",
                        otherwise:
                          "Routes non-matching inquiries to General Triage.",
                        orders: "Specialist team for order-tracking questions.",
                        triage: "Fallback team for everything else.",
                      } as Record<AutomationNodeId, string>
                    )[nodeId]
                  }
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface-muted/30 py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            title={automationFeatureConsequence.title}
            className="mb-8 max-w-3xl"
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <article
              data-inbox-panel
              className="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:p-5"
            >
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Inbox className="size-4" aria-hidden />
                </span>
                <h3 className="font-heading text-base font-semibold">
                  {automationFeatureConsequence.inboxTitle}
                </h3>
              </div>

              <div className="mt-4 rounded-xl border border-border bg-surface-muted/50 p-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-heading text-sm font-semibold">
                    {inquiry.subject}
                  </p>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                    <CircleDot className="size-3" aria-hidden />
                    Open
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted">
                  Assigned team · {destination}
                </p>
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs">
                  <Users className="size-3.5 text-accent" aria-hidden />
                  <span className="font-medium">Assigned to {destination}</span>
                </div>
              </div>

              <Link
                href={automationFeatureConsequence.inboxHref}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {automationFeatureConsequence.inboxLinkLabel}
                <ArrowRight className="size-3.5" />
              </Link>
            </article>

            <article className="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:p-5">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <GitBranch className="size-4" aria-hidden />
                </span>
                <h3 className="font-heading text-base font-semibold">
                  {automationFeatureConsequence.insightsTitle}
                </h3>
              </div>

              <div className="mt-4 rounded-xl border border-border bg-surface-muted/50 px-3.5 py-3">
                <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
                  {automationFeatureConsequence.sampleLabel}
                </p>
                <p className="mt-2 font-heading text-sm font-semibold text-pretty">
                  {getWorkloadContribution(destination)}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Counts do not accumulate when you switch examples. The full
                  Insights view is available in the guided demo.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}

function WorkflowNode({
  id,
  selected,
  onRoute,
  onSelect,
  eyebrow,
  title,
  detail,
  icon: Icon,
  emphasize,
  quiet,
}: {
  id: AutomationNodeId;
  selected: boolean;
  onRoute: boolean;
  onSelect: (id: AutomationNodeId) => void;
  eyebrow: string;
  title: string;
  detail: string;
  icon?: typeof Package;
  emphasize?: boolean;
  quiet?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      data-node={id}
      onClick={() => onSelect(id)}
      className={cn(
        "w-full rounded-2xl border px-3.5 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        onRoute
          ? "border-accent/35 bg-accent/10"
          : quiet
            ? "border-border bg-surface-muted/70"
            : "border-border bg-surface",
        emphasize && "border-accent/45",
        selected && "ring-2 ring-ring",
      )}
    >
      <div className="flex items-start gap-2">
        {Icon ? (
          <Icon
            className={cn("mt-0.5 size-3.5", onRoute ? "text-accent" : "text-muted")}
            aria-hidden
          />
        ) : null}
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
            {eyebrow}
          </p>
          <p className="mt-1 font-heading text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs text-muted">{detail}</p>
        </div>
      </div>
    </button>
  );
}

function BranchRow({
  label,
  team,
  active,
  selected,
  teamSelected,
  onSelectBranch,
  onSelectTeam,
}: {
  id: string;
  label: string;
  team: string;
  active: boolean;
  selected: boolean;
  teamSelected: boolean;
  onSelectBranch: () => void;
  onSelectTeam: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3",
        active ? "border-accent/35 bg-accent/10" : "border-border bg-surface-muted/50",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onSelectBranch}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            active
              ? "border-accent/40 bg-accent text-accent-foreground"
              : "border-border bg-surface text-muted",
            selected && "ring-2 ring-ring",
          )}
        >
          {label}
        </button>
        <span className="text-xs text-muted">→</span>
        <button
          type="button"
          onClick={onSelectTeam}
          className={cn(
            "rounded-md border px-2.5 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            active
              ? "border-accent/40 bg-surface text-accent"
              : "border-border bg-surface text-muted",
            teamSelected && "ring-2 ring-ring",
          )}
        >
          {team}
        </button>
      </div>
    </div>
  );
}
