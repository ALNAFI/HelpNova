import { Footer3 } from "@/components/common/footer-3";
import { Nav3 } from "@/components/common/nav-3";
import { SmoothScroll } from "@/components/common/smooth-scroll";
import { ChatbotProvider } from "@/context/chatbot-provider";

export default function InboxHomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ChatbotProvider>
      <SmoothScroll>
        <div className="inbox-companion flex min-h-full flex-1 flex-col">
          <Nav3 />
          <main className="relative flex-1">{children}</main>
          <Footer3 />
        </div>
      </SmoothScroll>
    </ChatbotProvider>
  );
}
