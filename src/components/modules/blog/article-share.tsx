"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { blogPageCopy } from "@/data/editorial/blog";
import { cn } from "@/utils/cn";

type ArticleShareProps = {
  title: string;
  className?: string;
};

function subscribe() {
  return () => undefined;
}

function getCanNativeShare() {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export function ArticleShare({ title, className }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const canNativeShare = useSyncExternalStore(
    subscribe,
    getCanNativeShare,
    () => false,
  );

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyLink = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      try {
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        setCopied(true);
      } catch {
        setCopied(false);
      }
    }
  };

  const shareNative = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({
        title,
        url: window.location.href,
      });
    } catch {
      // User cancellation is fine.
    }
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {copied ? (
          <Check className="size-4 text-accent" aria-hidden />
        ) : (
          <Link2 className="size-4" aria-hidden />
        )}
        {copied ? blogPageCopy.linkCopied : blogPageCopy.copyLink}
      </button>
      {canNativeShare ? (
        <button
          type="button"
          onClick={shareNative}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Share2 className="size-4" aria-hidden />
          {blogPageCopy.shareArticle}
        </button>
      ) : null}
      <span className="sr-only" aria-live="polite">
        {copied ? blogPageCopy.linkCopied : ""}
      </span>
    </div>
  );
}
