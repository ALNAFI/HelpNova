import type { Metadata } from "next";
import { InboxHomePage } from "@/components/modules/home/inbox/inbox-home-page";

export const metadata: Metadata = {
  title: "Shared Inbox",
  description:
    "Explore HelpNova's Shared Inbox concept through interactive conversations, team collaboration, assignment previews, and connected support insights.",
};

export default function Page() {
  return <InboxHomePage />;
}
