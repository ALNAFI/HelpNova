"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { InquiryRoutingIllustration } from "@/components/modules/features/inquiry-routing-illustration";
import { featuresOverviewAutomation } from "@/data/marketing/features-overview";
import { cn } from "@/utils/cn";
import "./features-overview-automation.css";

type FeedItem = {
  id: number;
  topic: string;
  matched: boolean;
};

const INITIAL_FEED: FeedItem[] = [
  { id: 1, topic: "Billing Question", matched: false },
  { id: 2, topic: "Order Tracking", matched: true },
  { id: 3, topic: "Account Access", matched: false },
];

export function FeaturesOverviewAutomation() {
  const [feed, setFeed] = useState<FeedItem[]>(INITIAL_FEED);
  const nextIdRef = useRef(INITIAL_FEED.length);

  const handleAssign = useCallback((topic: string, matched: boolean) => {
    nextIdRef.current += 1;
    const item: FeedItem = {
      id: nextIdRef.current,
      topic,
      matched,
    };
    setFeed((prev) => [item, ...prev].slice(0, 3));
  }, []);

  return (
    <section
      id={featuresOverviewAutomation.id}
      className="scroll-mt-28 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          title={featuresOverviewAutomation.title}
          className="mb-8 max-w-3xl"
        />

        <div className="grid items-stretch gap-6 min-[821px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-[var(--radius-workspace)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)] sm:p-5">
            <InquiryRoutingIllustration onAssign={handleAssign} />
          </div>

          <div className="foa-side">
            <div className="foa-side-in">
              <div
                className={cn(
                  "foa-desc rounded-[var(--radius-card)] border border-border bg-accent-soft px-5 py-4 text-sm leading-[1.55] text-pretty text-foreground",
                )}
              >
                <p>{featuresOverviewAutomation.result}</p>
                <Link
                  href={featuresOverviewAutomation.href}
                  className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {featuresOverviewAutomation.linkLabel}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>

              <div
                className={cn(
                  "foa-panel rounded-[var(--radius-workspace)] border border-border bg-surface p-4 shadow-[var(--shadow-soft)]",
                )}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-bold tracking-[1.6px] text-muted uppercase">
                    Live routing
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-accent">
                    <i className="foa-live-dot" aria-hidden />
                    Auto-assigning
                  </span>
                </div>

                <div className="foa-feed" aria-live="polite">
                  {feed.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "foa-row flex items-center gap-2.5 rounded-xl border border-border bg-background px-3.5 text-sm text-foreground",
                        item.matched && "foa-row-hit",
                      )}
                    >
                      <span
                        className={cn(
                          "size-2 shrink-0 rounded-full",
                          item.matched ? "bg-accent" : "bg-border",
                        )}
                        aria-hidden
                      />
                      <b className="font-bold">{item.topic}</b>
                      <span className="text-muted" aria-hidden>
                        →
                      </span>
                      <span>
                        {item.matched ? "Orders" : "General Support"}
                      </span>
                      <span
                        className={cn(
                          "ml-auto whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                          item.matched
                            ? "border-accent bg-accent-soft text-accent"
                            : "border-border text-muted",
                        )}
                      >
                        {item.matched ? "Matched" : "Otherwise"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
