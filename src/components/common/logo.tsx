import Link from "next/link";
import { cn } from "@/utils/cn";

export function Logo({
  href = "/",
  className,
  tone = "default",
}: {
  href?: string;
  className?: string;
  tone?: "default" | "inverse";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-[var(--radius-control)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        tone === "inverse" && "focus-visible:ring-offset-0 focus-visible:ring-[#A78BFA]",
        className,
      )}
      aria-label="HelpNova home"
    >
      <span className="relative flex size-8 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-[0_8px_20px_rgb(109_40_217_/_0.35)]">
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          aria-hidden
        >
          <path
            d="M7 8.5h6.5a3.5 3.5 0 0 1 0 7H11"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M11 15.5H9.2A3.2 3.2 0 0 1 6 12.3V8.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="16.5" cy="8" r="1.2" fill="currentColor" />
        </svg>
      </span>
      <span
        className={cn(
          "font-heading text-[1.05rem] font-semibold tracking-tight",
          tone === "inverse" ? "text-[#F6F3FC]" : "text-foreground",
        )}
      >
        Help<span className="text-accent">Nova</span>
      </span>
    </Link>
  );
}
