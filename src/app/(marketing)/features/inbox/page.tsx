import type { Metadata } from "next";
import { InboxFeaturePage } from "@/components/modules/features/inbox/inbox-feature-page";

export const metadata: Metadata = {
  title: "Shared Inbox",
  description:
    "Pick up a customer conversation where your team left off—see ownership, internal notes, and status in one shared thread.",
};

export default function Page() {
  return <InboxFeaturePage />;
}
