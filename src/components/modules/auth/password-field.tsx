"use client";

import { useId, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils/cn";

type PasswordFieldProps = {
  id?: string;
  name?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string | null;
  autoComplete?: string;
  placeholder?: string;
  describedBy?: string;
  className?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
};

export function PasswordField({
  id,
  name = "password",
  label,
  value,
  onChange,
  onBlur,
  error,
  autoComplete = "current-password",
  placeholder = "Enter your password",
  describedBy,
  className,
  inputRef: externalRef,
}: PasswordFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const localRef = useRef<HTMLInputElement>(null);
  const inputRef = externalRef ?? localRef;
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    const input = inputRef.current;
    const selectionStart = input?.selectionStart ?? null;
    const selectionEnd = input?.selectionEnd ?? null;

    setVisible((current) => !current);

    requestAnimationFrame(() => {
      const next = inputRef.current;
      if (!next) return;
      next.focus();
      if (selectionStart !== null && selectionEnd !== null) {
        next.setSelectionRange(selectionStart, selectionEnd);
      }
    });
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [describedBy, error ? errorId : null].filter(Boolean).join(" ") ||
            undefined
          }
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          className={cn(
            "auth-field h-12 w-full rounded-[var(--radius-control)] border bg-surface px-3.5 pr-12 text-[15px] text-foreground shadow-[inset_0_1px_0_color-mix(in_oklab,white_45%,transparent)] outline-none transition-[border-color,box-shadow,background-color] placeholder:text-muted/70",
            error
              ? "border-danger focus-visible:ring-2 focus-visible:ring-danger/35"
              : "border-border focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/30",
          )}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute top-1/2 right-2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-[var(--radius-control)] text-muted transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="relative size-4" aria-hidden>
            <Eye
              className={cn(
                "absolute inset-0 size-4 transition-[opacity,transform] duration-200",
                visible
                  ? "scale-75 rotate-45 opacity-0"
                  : "scale-100 rotate-0 opacity-100",
              )}
            />
            <EyeOff
              className={cn(
                "absolute inset-0 size-4 transition-[opacity,transform] duration-200",
                visible
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-75 -rotate-45 opacity-0",
              )}
            />
          </span>
        </button>
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
