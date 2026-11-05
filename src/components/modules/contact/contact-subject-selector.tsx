"use client";

import {
  Check,
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
  const focusSubject = (id: ContactSubjectId) => {
    const el = document.getElementById(`contact-subject-${id}`);
    el?.focus();
  };

  const moveSelection = (currentId: ContactSubjectId | "", delta: number) => {
    const ids = contactSubjects.map((subject) => subject.id);
    const currentIndex = currentId
      ? ids.indexOf(currentId)
      : delta > 0
        ? -1
        : 0;
    const nextIndex = (currentIndex + delta + ids.length) % ids.length;
    const nextId = ids[nextIndex];
    onChange(nextId);
    focusSubject(nextId);
  };

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
      className="grid grid-cols-1 items-stretch gap-2 sm:grid-cols-2"
    >
      {contactSubjects.map((subject) => {
        const selected = value === subject.id;
        const Icon = iconMap[subject.icon];
        return (
          <button
            key={subject.id}
            id={`contact-subject-${subject.id}`}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected || (!value && subject.id === contactSubjects[0].id) ? 0 : -1}
            onClick={() => onChange(subject.id)}
            onKeyDown={(event) => {
              if (
                event.key === "ArrowRight" ||
                event.key === "ArrowDown"
              ) {
                event.preventDefault();
                moveSelection(subject.id, 1);
                return;
              }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                moveSelection(subject.id, -1);
                return;
              }
              if (event.key === "Home") {
                event.preventDefault();
                onChange(contactSubjects[0].id);
                focusSubject(contactSubjects[0].id);
                return;
              }
              if (event.key === "End") {
                event.preventDefault();
                const last = contactSubjects[contactSubjects.length - 1];
                onChange(last.id);
                focusSubject(last.id);
              }
            }}
            className={cn(
              "relative flex h-full min-h-[5.75rem] flex-col rounded-[1.15rem] border px-3.5 py-3.5 text-left transition-[border-color,background-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "border-accent bg-accent-soft/50 shadow-[var(--shadow-soft)]"
                : "border-border bg-surface hover:border-accent/30",
              error && !selected && "border-danger/40",
            )}
          >
            {selected ? (
              <span
                className="absolute top-3 right-3 inline-flex size-5 items-center justify-center rounded-full bg-accent text-accent-foreground"
                aria-hidden
              >
                <Check className="size-3" strokeWidth={2.75} />
              </span>
            ) : null}
            <span className="flex h-full items-start gap-3 pr-6">
              <span
                className={cn(
                  "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl border",
                  selected
                    ? "border-accent/35 bg-accent text-accent-foreground"
                    : "border-border bg-surface-muted text-accent",
                )}
              >
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="flex min-h-0 flex-1 flex-col">
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
