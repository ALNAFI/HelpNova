"use client";

import Link from "next/link";
import { ArrowRight, CircleDot, GitBranch, Inbox, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { InquiryPathSection } from "@/components/modules/features/automation/inquiry-path-section";
import {
  automationFeatureConsequence,
  displayAutomationTeam,
  evaluateOrderRule,
  getAutomationInquiry,
  getWorkloadContribution,
} from "@/data/marketing/automation-feature";

export function AutomationFeatureExplorer() {
  // Billing example matches the Shared Inbox card subject and General Support assignment.
  const inquiry = getAutomationInquiry("billing-issue");
  const evaluation = evaluateOrderRule(inquiry.topic);
  const destination = displayAutomationTeam(evaluation.destination);

  return (
    <>
      <InquiryPathSection />

      <section className="border-t border-border bg-surface-muted/30 py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            title={automationFeatureConsequence.title}
            className="mb-8 max-w-3xl"
          />

          <div className="grid items-start gap-4 lg:grid-cols-2">
            <article className="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:p-5">
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
                  Assigned Team · {destination}
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
                <p className="mt-1.5 font-heading text-sm font-semibold leading-snug text-pretty">
                  {getWorkloadContribution(evaluation.destination)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
                  {automationFeatureConsequence.insightsNote}
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
