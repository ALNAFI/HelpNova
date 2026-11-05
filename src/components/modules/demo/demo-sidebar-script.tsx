"use client";

import { useServerInsertedHTML } from "next/navigation";
import { DEMO_SIDEBAR_INIT_SCRIPT } from "@/lib/demo-sidebar-script";

/**
 * Injects the demo sidebar preference bootstrap into the SSR HTML stream.
 * Returns null so React 19 never mounts a <script> from the client tree.
 */
export function DemoSidebarScript() {
  useServerInsertedHTML(() => (
    <script
      id="helpnova-demo-sidebar-init"
      dangerouslySetInnerHTML={{ __html: DEMO_SIDEBAR_INIT_SCRIPT }}
    />
  ));

  return null;
}
