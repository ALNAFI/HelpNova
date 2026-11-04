"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  chatbotPresets,
  getChatbotPreset,
  type ChatbotPreset,
} from "@/data/chatbot/presets";

export type ChatbotMessage = {
  id: string;
  role: "user" | "assistant";
  presetId: string;
  body: string;
};

type ChatbotContextValue = {
  isOpen: boolean;
  messages: ChatbotMessage[];
  presets: ChatbotPreset[];
  open: (opener?: HTMLElement | null) => void;
  close: () => void;
  toggle: (opener?: HTMLElement | null) => void;
  askPreset: (presetId: string) => void;
  resetSession: () => void;
  returnFocus: () => void;
};

const ChatbotContext = createContext<ChatbotContextValue | null>(null);

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const openerRef = useRef<HTMLElement | null>(null);
  const messageCounter = useRef(0);

  const returnFocus = useCallback(() => {
    const opener = openerRef.current;
    if (opener && document.contains(opener)) {
      opener.focus();
    }
  }, []);

  const open = useCallback((opener?: HTMLElement | null) => {
    if (opener) openerRef.current = opener;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(
    (opener?: HTMLElement | null) => {
      setIsOpen((current) => {
        if (current) return false;
        if (opener) openerRef.current = opener;
        return true;
      });
    },
    [],
  );

  const askPreset = useCallback((presetId: string) => {
    const preset = getChatbotPreset(presetId);
    messageCounter.current += 1;
    const base = messageCounter.current;
    setMessages((current) => [
      ...current,
      {
        id: `user-${base}`,
        role: "user",
        presetId: preset.id,
        body: preset.question,
      },
      {
        id: `assistant-${base}`,
        role: "assistant",
        presetId: preset.id,
        body: preset.answer,
      },
    ]);
  }, []);

  const resetSession = useCallback(() => {
    setMessages([]);
    messageCounter.current = 0;
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      messages,
      presets: chatbotPresets,
      open,
      close,
      toggle,
      askPreset,
      resetSession,
      returnFocus,
    }),
    [
      isOpen,
      messages,
      open,
      close,
      toggle,
      askPreset,
      resetSession,
      returnFocus,
    ],
  );

  return (
    <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within ChatbotProvider");
  }
  return context;
}
