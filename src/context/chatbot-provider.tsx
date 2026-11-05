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
import { chatbotResponseProvider } from "@/lib/chatbot/response-provider";

export type ChatbotMessage = {
  id: string;
  role: "user" | "assistant";
  body: string;
  /** Present when the assistant reply matched a prepared preset. */
  presetId?: string;
  cta?: ChatbotPreset["cta"];
  /** Assistant replies may fail; retry uses `replyToId`. */
  status?: "complete" | "error";
  /** For assistant messages: the user message this reply answers. */
  replyToId?: string;
};

type ChatbotContextValue = {
  isOpen: boolean;
  messages: ChatbotMessage[];
  presets: ChatbotPreset[];
  draft: string;
  isPending: boolean;
  setDraft: (value: string) => void;
  open: (opener?: HTMLElement | null) => void;
  close: () => void;
  toggle: (opener?: HTMLElement | null) => void;
  /** Send free-text or a suggested question through the shared response flow. */
  sendMessage: (text: string) => Promise<void>;
  askPreset: (presetId: string) => Promise<void>;
  /** Retry the latest failed assistant reply without duplicating the user message. */
  retryLastError: () => Promise<void>;
  resetSession: () => void;
  returnFocus: () => void;
};

const ChatbotContext = createContext<ChatbotContextValue | null>(null);

function isAbortError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === "AbortError") ||
    (error instanceof Error && error.name === "AbortError")
  );
}

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatbotMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isPending, setIsPending] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);
  const messageCounter = useRef(0);
  const pendingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<ChatbotMessage[]>([]);

  const syncMessages = useCallback((next: ChatbotMessage[]) => {
    messagesRef.current = next;
    setMessages(next);
  }, []);

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

  const toggle = useCallback((opener?: HTMLElement | null) => {
    setIsOpen((current) => {
      if (current) return false;
      if (opener) openerRef.current = opener;
      return true;
    });
  }, []);

  const runAssistantReply = useCallback(
    async (userMessage: ChatbotMessage) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      pendingRef.current = true;
      setIsPending(true);

      try {
        const history = messagesRef.current
          .filter((message) => message.status !== "error")
          .map((message) => ({
            role: message.role,
            body: message.body,
          }));

        const result = await chatbotResponseProvider.getResponse({
          text: userMessage.body,
          history,
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        messageCounter.current += 1;
        const assistant: ChatbotMessage = {
          id: `assistant-${messageCounter.current}`,
          role: "assistant",
          body: result.body,
          presetId: result.presetId,
          cta: result.cta,
          status: "complete",
          replyToId: userMessage.id,
        };

        syncMessages([...messagesRef.current, assistant]);
      } catch (error) {
        if (isAbortError(error) || controller.signal.aborted) return;

        messageCounter.current += 1;
        const failed: ChatbotMessage = {
          id: `assistant-${messageCounter.current}`,
          role: "assistant",
          body: "Something went wrong while preparing a reply. Please try again.",
          status: "error",
          replyToId: userMessage.id,
        };
        syncMessages([...messagesRef.current, failed]);
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
          pendingRef.current = false;
          setIsPending(false);
        }
      }
    },
    [syncMessages],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || pendingRef.current) return;

      messageCounter.current += 1;
      const userMessage: ChatbotMessage = {
        id: `user-${messageCounter.current}`,
        role: "user",
        body: trimmed,
        status: "complete",
      };

      syncMessages([...messagesRef.current, userMessage]);
      await runAssistantReply(userMessage);
    },
    [runAssistantReply, syncMessages],
  );

  const askPreset = useCallback(
    async (presetId: string) => {
      const preset = getChatbotPreset(presetId);
      await sendMessage(preset.question);
    },
    [sendMessage],
  );

  const retryLastError = useCallback(async () => {
    if (pendingRef.current) return;

    const current = messagesRef.current;
    const last = current[current.length - 1];
    if (!last || last.role !== "assistant" || last.status !== "error") return;

    const userMessage = current.find(
      (message) => message.id === last.replyToId && message.role === "user",
    );
    if (!userMessage) return;

    // Drop the failed assistant reply; keep the original user message.
    syncMessages(current.slice(0, -1));
    await runAssistantReply(userMessage);
  }, [runAssistantReply, syncMessages]);

  const resetSession = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    pendingRef.current = false;
    setIsPending(false);
    setDraft("");
    messageCounter.current = 0;
    syncMessages([]);
  }, [syncMessages]);

  const value = useMemo(
    () => ({
      isOpen,
      messages,
      presets: chatbotPresets,
      draft,
      isPending,
      setDraft,
      open,
      close,
      toggle,
      sendMessage,
      askPreset,
      retryLastError,
      resetSession,
      returnFocus,
    }),
    [
      isOpen,
      messages,
      draft,
      isPending,
      open,
      close,
      toggle,
      sendMessage,
      askPreset,
      retryLastError,
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

/** Returns null when no ChatbotProvider is mounted. */
export function useChatbotOptional() {
  return useContext(ChatbotContext);
}
