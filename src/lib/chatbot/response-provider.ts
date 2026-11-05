/**
 * HelpNova Assistant — response provider
 * --------------------------------------
 * The floating chatbot UI never talks to an AI model directly. It calls
 * `chatbotResponseProvider.getResponse()`, which today is a local demo
 * provider that matches prepared answers from `src/data/chatbot/presets.ts`.
 *
 * Theme buyers: replace the demo provider with your own implementation.
 *
 * 1. Keep this client module free of API secrets.
 * 2. Add a Next.js Route Handler (or server action) that holds your AI key
 *    via environment variables / Netlify env — never `NEXT_PUBLIC_*`.
 * 3. Implement `ChatbotResponseProvider` to `fetch` that server endpoint.
 * 4. Assign your implementation to `chatbotResponseProvider` below.
 *
 * Do not add an AI SDK or credentials in this client bundle.
 */

import {
  chatbotPresets,
  type ChatbotPreset,
} from "@/data/chatbot/presets";
import { normalizeChatbotQuestion } from "@/lib/chatbot/normalize";

export type ChatbotResponseRequest = {
  text: string;
  /** Prior completed messages for future context-aware providers. */
  history: ReadonlyArray<{
    role: "user" | "assistant";
    body: string;
  }>;
  signal?: AbortSignal;
};

export type ChatbotResponseResult = {
  body: string;
  /** Set when a prepared preset was matched. */
  presetId?: string;
  cta?: ChatbotPreset["cta"];
};

export type ChatbotResponseProvider = {
  getResponse: (
    request: ChatbotResponseRequest,
  ) => Promise<ChatbotResponseResult>;
};

export const DEMO_FALLBACK_ANSWER =
  "Thanks for your message! This demo uses prepared answers. Connect an AI service to enable custom responses.";

const DEMO_LATENCY_MS = 700;

function matchPreparedPreset(text: string): ChatbotPreset | null {
  const normalized = normalizeChatbotQuestion(text);
  if (!normalized) return null;

  return (
    chatbotPresets.find(
      (preset) => normalizeChatbotQuestion(preset.question) === normalized,
    ) ?? null
  );
}

function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const timer = window.setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      window.clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * Local demo provider: prepared answers + fallback copy.
 * Swap this for an API-backed provider when connecting a real AI service.
 */
export const demoChatbotResponseProvider: ChatbotResponseProvider = {
  async getResponse({ text, signal }) {
    await wait(DEMO_LATENCY_MS, signal);

    const preset = matchPreparedPreset(text);
    if (preset) {
      return {
        body: preset.answer,
        presetId: preset.id,
        cta: preset.cta,
      };
    }

    return { body: DEMO_FALLBACK_ANSWER };
  },
};

/**
 * Active provider used by the floating Assistant.
 * Replace `demoChatbotResponseProvider` with your API-backed provider.
 */
export const chatbotResponseProvider: ChatbotResponseProvider =
  demoChatbotResponseProvider;

export { matchPreparedPreset };
