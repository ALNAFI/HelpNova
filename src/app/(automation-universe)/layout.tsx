import { ChatbotWidget } from "@/components/common/chatbot/chatbot-widget";
import { Footer2 } from "@/components/common/footer-2";
import { Nav2 } from "@/components/common/nav-2";
import { SmoothScroll } from "@/components/common/smooth-scroll";
import { ChatbotProvider } from "@/context/chatbot-provider";

export default function AutomationUniverseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatbotProvider>
      <SmoothScroll>
        <div className="automation-universe flex min-h-full flex-1 flex-col">
          <Nav2 />
          <main className="relative flex-1 pt-[var(--au-nav-offset,6.5rem)]">
            {children}
          </main>
          <Footer2 />
        </div>
        <ChatbotWidget />
      </SmoothScroll>
    </ChatbotProvider>
  );
}
