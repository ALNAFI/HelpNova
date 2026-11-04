import Link from "next/link";
import { ArrowUpRight, GitBranch, Inbox, MessageCircle, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuresOverviewBento } from "@/data/marketing/features-overview";
import { cn } from "@/utils/cn";

const icons = {
  dialogue: MessageCircle,
  decision: GitBranch,
  thread: Inbox,
  workload: Users,
} as const;

export function FeaturesOverviewBento() {
  return (
    <section className="border-y border-border bg-surface-muted/35 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          title={featuresOverviewBento.title}
          className="mb-8 max-w-3xl"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {featuresOverviewBento.tiles.map((tile, index) => {
            const Icon = icons[tile.visual];
            return (
              <Link
                key={tile.id}
                href={tile.href}
                className={cn(
                  "group flex flex-col rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] transition hover:border-accent/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  index === 0 && "lg:col-span-4",
                  index === 1 && "lg:col-span-2",
                  index === 2 && "lg:col-span-2",
                  index === 3 && "lg:col-span-4",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <ArrowUpRight className="size-4 text-muted transition group-hover:text-accent" />
                </div>

                <h3 className="mt-4 font-heading text-lg font-semibold">
                  {tile.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {tile.description}
                </p>

                <BentoVisual visual={tile.visual} />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function BentoVisual({
  visual,
}: {
  visual: (typeof featuresOverviewBento.tiles)[number]["visual"];
}) {
  if (visual === "dialogue") {
    return (
      <div className="mt-5 space-y-2" aria-hidden>
        <div className="rounded-lg border border-border bg-surface-muted px-2.5 py-1.5 text-[10px]">
          What can workflow automation do?
        </div>
        <div className="ml-3 rounded-lg border border-accent/25 bg-accent/10 px-2.5 py-1.5 text-[10px]">
          Matched → Orders · Otherwise → General Triage
        </div>
      </div>
    );
  }

  if (visual === "decision") {
    return (
      <div className="mt-5 rounded-lg border border-border bg-surface-muted/70 px-3 py-2.5" aria-hidden>
        <p className="text-[10px] font-semibold text-accent">Order Tracking?</p>
        <p className="mt-1 text-[10px] text-muted">Matched · Orders</p>
        <p className="text-[10px] text-muted">Otherwise · General Triage</p>
      </div>
    );
  }

  if (visual === "thread") {
    return (
      <div className="mt-5 flex items-center gap-2" aria-hidden>
        <span className="rounded-md border border-border bg-surface-muted px-2 py-1 text-[10px]">
          Where is order #48291?
        </span>
        <span className="rounded-md border-2 border-accent/40 bg-accent/10 px-2 py-1 font-mono text-[9px] font-bold text-accent uppercase">
          Orders
        </span>
      </div>
    );
  }

  return (
    <div className="mt-5" aria-hidden>
      <div className="mb-1 flex justify-between text-[10px]">
        <span>Orders open</span>
        <span className="font-mono">1 / 1</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-border/70">
        <div className="h-full w-full rounded-full bg-accent" />
      </div>
    </div>
  );
}
