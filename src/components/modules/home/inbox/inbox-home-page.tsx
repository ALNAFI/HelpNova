"use client";

import { InboxChannels } from "@/components/modules/home/inbox/inbox-channels";
import { InboxCollaboration } from "@/components/modules/home/inbox/inbox-collaboration";
import { InboxConversations } from "@/components/modules/home/inbox/inbox-conversations";
import { InboxFinalCta } from "@/components/modules/home/inbox/inbox-final-cta";
import { InboxHandoff } from "@/components/modules/home/inbox/inbox-handoff";
import { InboxHero } from "@/components/modules/home/inbox/inbox-hero";
import { InboxInsights } from "@/components/modules/home/inbox/inbox-insights";
import { InboxOrganization } from "@/components/modules/home/inbox/inbox-organization";
import { InboxPricingFaq } from "@/components/modules/home/inbox/inbox-pricing-faq";
import { InboxScrollProgress } from "@/components/modules/home/inbox/inbox-scroll-progress";
import { NovaScrollProvider } from "@/components/modules/home/inbox/nova-scroll-context";
import { NovaCompanionLayer } from "@/components/modules/home/inbox/nova-companion-layer";

export function InboxHomePage() {
  return (
    <NovaScrollProvider>
      <div id="inbox-companion-page">
        <InboxScrollProgress />
        <NovaCompanionLayer />
        <InboxHero />
        <InboxChannels />
        <InboxConversations />
        <InboxCollaboration />
        <InboxOrganization />
        <InboxHandoff />
        <InboxInsights />
        <InboxPricingFaq />
        <InboxFinalCta />
      </div>
    </NovaScrollProvider>
  );
}
