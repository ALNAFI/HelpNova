"use client";

import { cn } from "@/utils/cn";

type GoogleAuthButtonProps = {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-5", className)}
      aria-hidden
    >
      <path
        fill="#EA4335"
        d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.3-1.9 3l3.1 2.4c1.8-1.7 2.9-4.1 2.9-7 0-.7-.1-1.3-.2-1.9H12z"
      />
      <path
        fill="#34A853"
        d="M6.6 14.3 5.7 15l-2.5 1.9C4.8 20 8.1 22 12 22c2.7 0 5-.9 6.7-2.4l-3.1-2.4c-.9.6-2 1-3.6 1-2.8 0-5.1-1.9-6-4.4z"
      />
      <path
        fill="#4A90E2"
        d="M4.1 7.1C3.4 8.5 3 10 3 11.7c0 1.7.4 3.2 1.1 4.6l3.5-2.7c-.3-.9-.5-1.8-.5-2.8 0-1 .2-1.9.5-2.7L4.1 7.1z"
      />
      <path
        fill="#FBBC05"
        d="M12 5.7c1.5 0 2.8.5 3.9 1.5l2.9-2.9C16.9 2.6 14.7 1.7 12 1.7 8.1 1.7 4.8 3.7 3.2 6.8l3.5 2.7c.8-2.5 3.2-4.4 6-4.4z"
      />
    </svg>
  );
}

export function GoogleAuthButton({
  label = "Continue with Google",
  onClick,
  disabled,
  className,
}: GoogleAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-[var(--radius-control)] border border-border-strong bg-surface px-5 text-[15px] font-medium text-foreground shadow-[var(--shadow-soft)] transition-[transform,background-color,border-color,box-shadow] duration-200 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
    >
      <GoogleMark />
      {label}
    </button>
  );
}
