import { ChatbotWidget } from "@/components/common/chatbot/chatbot-widget";
import { SiteFooter } from "@/components/common/site-footer";
import { SiteHeader } from "@/components/common/site-header";
import { SmoothScroll } from "@/components/common/smooth-scroll";
import { ChatbotProvider } from "@/context/chatbot-provider";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatbotProvider>
      <SmoothScroll>
        <div className="flex min-h-full flex-1 flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <ChatbotWidget />
      </SmoothScroll>
    </ChatbotProvider>
  );
}
