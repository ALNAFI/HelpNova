"use client";

import { ReadingProgress } from "@/components/modules/blog/reading-progress";

type LegalReadingProgressProps = {
  targetId: string;
};

/** Shared progress bar for long-form legal documents. */
export function LegalReadingProgress({ targetId }: LegalReadingProgressProps) {
  return <ReadingProgress targetId={targetId} />;
}
