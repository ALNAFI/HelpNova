import Link from "next/link";
import {
  CreditCard,
  FileText,
  GitBranch,
  HelpCircle,
  LayoutTemplate,
  Link2,
  Mail,
  Palette,
  ScrollText,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";

const iconMap = {
  sparkles: Sparkles,
  palette: Palette,
  form: FileText,
  link: Link2,
  scroll: ScrollText,
  help: HelpCircle,
  mail: Mail,
  layout: LayoutTemplate,
  workflow: GitBranch,
  "credit-card": CreditCard,
  shield: ShieldCheck,
} satisfies Record<string, LucideIcon>;

export type LegalInformationIcon = keyof typeof iconMap;

type LegalInformationCardProps = {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
  className?: string;
  href?: string;
  /** `start` places the icon left of the title; `top` stacks icon above title. */
  iconPosition?: "top" | "start";
};

export function LegalInformationCard({
  title,
  description,
  icon,
  className,
  href,
  iconPosition = "top",
}: LegalInformationCardProps) {
  const Icon = iconMap[icon] ?? FileText;
  const iconEl = (
    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent-soft text-accent">
      <Icon className="size-4" aria-hidden />
    </span>
  );
  const content =
    iconPosition === "start" ? (
      <>
        <div className="flex items-center gap-3">
          {iconEl}
          <h3 className="font-heading text-lg font-semibold tracking-tight">
            {title}
          </h3>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
      </>
    ) : (
      <>
        {iconEl}
        <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      </>
    );

  const classes = cn(
    "rounded-[1.35rem] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] transition-[transform,border-color,box-shadow] duration-300 sm:p-6",
    href &&
      "block hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_40px_color-mix(in_oklab,var(--accent)_12%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
