"use client";

import { Check, Circle } from "lucide-react";
import {
  getPasswordRequirements,
  type PasswordRequirement,
} from "@/utils/password-requirements";
import { cn } from "@/utils/cn";

type PasswordRequirementsProps = {
  value: string;
  id?: string;
};

export function PasswordRequirements({
  value,
  id,
}: PasswordRequirementsProps) {
  const requirements = getPasswordRequirements(value);
  const metCount = requirements.filter((item) => item.met).length;
  const statusLabel =
    metCount === requirements.length
      ? "All password requirements met."
      : `${metCount} of ${requirements.length} password requirements met.`;

  return (
    <div id={id} className="space-y-2" aria-live="polite">
      <p className="sr-only">{statusLabel}</p>
      <ul className="space-y-1.5" aria-label="Password requirements">
        {requirements.map((item) => (
          <RequirementRow key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function RequirementRow({ item }: { item: PasswordRequirement }) {
  return (
    <li
      className={cn(
        "flex items-center gap-2 text-sm transition-colors duration-200",
        item.met ? "text-success" : "text-muted",
      )}
    >
      <span
        className={cn(
          "inline-flex size-4 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-200",
          item.met
            ? "bg-success/15 text-success"
            : "bg-surface-muted text-muted",
        )}
        aria-hidden
      >
        {item.met ? (
          <Check className="size-3" strokeWidth={2.5} />
        ) : (
          <Circle className="size-2.5" strokeWidth={2.25} />
        )}
      </span>
      <span>
        <span className="sr-only">{item.met ? "Met: " : "Not met: "}</span>
        {item.label}
      </span>
    </li>
  );
}
