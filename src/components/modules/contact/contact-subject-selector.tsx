"use client";

import {
  Heart,
  MessageSquareText,
  PenLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  contactSubjects,
  type ContactSubjectId,
} from "@/data/marketing/contact";
import { cn } from "@/utils/cn";

const iconMap = {
  message: MessageSquareText,
  sparkles: Sparkles,
  heart: Heart,
  pen: PenLine,
} satisfies Record<(typeof contactSubjects)[number]["icon"], LucideIcon>;

type ContactSubjectSelectorProps = {
  value: ContactSubjectId | "";
  onChange: (value: ContactSubjectId) => void;
  error?: string | null;
  labelledBy: string;
  describedBy?: string;
};

export function ContactSubjectSelector({
  value,
  onChange,
  error,
  labelledBy,
  describedBy,
}: ContactSubjectSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
      className="grid gap-2 sm:grid-cols-2"
    >
      {contactSubjects.map((subject) => {
        const selected = value === subject.id;
        const Icon = iconMap[subject.icon];
        return (
          <button
            key={subject.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(subject.id)}
            className={cn(
              "rounded-[1.15rem] border px-3.5 py-3 text-left transition-[border-color,background-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "border-accent/45 bg-accent-soft/55 shadow-[var(--shadow-soft)]"
                : "border-border bg-surface hover:border-accent/25",
              error && !selected && "border-danger/40",
            )}
          >
            <span className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl border",
                  selected
                    ? "border-accent/30 bg-accent text-accent-foreground"
                    : "border-border bg-surface-muted text-accent",
                )}
              >
                <Icon className="size-4" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  {subject.label}
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-muted">
                  {subject.description}
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
