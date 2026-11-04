import Link from "next/link";
import type { PrivacySection } from "@/data/marketing/privacy";
import { cn } from "@/utils/cn";

type LegalSectionProps = {
  section: PrivacySection;
  index: number;
  className?: string;
};

export function LegalSection({ section, index, className }: LegalSectionProps) {
  return (
    <section
      id={section.id}
      className={cn(
        "scroll-mt-[calc(var(--header-height)+1.5rem)] border-t border-border/70 pt-8 first:border-t-0 first:pt-0",
        className,
      )}
      aria-labelledby={`${section.id}-heading`}
    >
      <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h2
        id={`${section.id}-heading`}
        className="mt-2 font-heading text-[1.55rem] font-semibold tracking-tight text-balance sm:text-[1.75rem]"
      >
        {section.title}
      </h2>
      <div className="mt-4 space-y-4">
        {section.blocks.map((block, blockIndex) => {
          if (block.type === "paragraph") {
            return (
              <p
                key={`${section.id}-p-${blockIndex}`}
                className="text-[1.02rem] leading-8 text-muted"
              >
                {renderInlineLinks(block.text)}
              </p>
            );
          }
          if (block.type === "list") {
            return (
              <ul
                key={`${section.id}-list-${blockIndex}`}
                className="list-disc space-y-2 pl-5 text-[1.02rem] leading-8 text-muted"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <aside
              key={`${section.id}-callout-${blockIndex}`}
              className="rounded-[1.2rem] border border-accent/25 bg-accent-soft/45 px-5 py-4"
            >
              <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                {block.title}
              </p>
              <p className="mt-2 text-[0.975rem] leading-7 text-foreground">
                {renderInlineLinks(block.text)}
              </p>
            </aside>
          );
        })}
      </div>
    </section>
  );
}

function renderInlineLinks(text: string) {
  if (!text.includes("Contact page")) return text;
  const parts = text.split("Contact page");
  return (
    <>
      {parts[0]}
      <Link
        href="/contact"
        className="font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Contact page
      </Link>
      {parts[1]}
    </>
  );
}
