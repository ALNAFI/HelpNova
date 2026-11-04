import type { Metadata } from "next";
import { DemoProvider } from "@/context/demo-context";

export const metadata: Metadata = {
  title: "Command Center Demo",
  description:
    "Explore HelpNova’s interactive local demo connecting Inbox, Automation, and Insights.",
};

export default function DemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DemoProvider>
      <div className="min-h-dvh flex-1">{children}</div>
    </DemoProvider>
  );
}
