"use client";

import { useServerInsertedHTML } from "next/navigation";
import { THEME_INIT_SCRIPT } from "@/lib/theme-script";

/**
 * Injects the theme bootstrap script into the SSR HTML stream.
 * Returns null so React 19 never mounts a <script> from the client tree.
 */
export function ThemeScript() {
  useServerInsertedHTML(() => (
    <script
      id="helpnova-theme-init"
      dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
    />
  ));

  return null;
}
