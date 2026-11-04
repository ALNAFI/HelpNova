"use client";

import { useEffect, useId, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { OpenChatbotButton } from "@/components/common/chatbot/open-chatbot-button";
import {
  chatbotFeatureHero,
  chatbotFeatureShowcase,
  chatbotPresets,
  getChatbotPreset,
} from "@/data/marketing/chatbot-feature";
import { getChatbotPresetIndex } from "@/data/chatbot/presets";
import { cn } from "@/utils/cn";

export function ChatbotFeatureShowcase() {
  const [selectedId, setSelectedId] = useState(
    chatbotFeatureHero.heroPresetId,
  );
  const [isDesktop, setIsDesktop] = useState(false);
  const selected = getChatbotPreset(selectedId);
  const position = getChatbotPresetIndex(selectedId) + 1;
  const groupId = useId();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <section
      id={chatbotFeatureShowcase.id}
      className="scroll-mt-28 border-y border-border bg-surface-muted/35 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          title={chatbotFeatureShowcase.title}
          description={chatbotFeatureShowcase.instruction}
          className="mb-8 max-w-3xl"
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div
            role="radiogroup"
            aria-label="Sample questions"
            className="hidden space-y-2 lg:block"
            aria-hidden={!isDesktop}
            inert={!isDesktop ? true : undefined}
          >
            {chatbotPresets.map((preset, index) => {
              const active = selectedId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  id={`${groupId}-${preset.id}`}
                  onClick={() => setSelectedId(preset.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl border px-3.5 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border-accent/40 bg-accent text-accent-foreground shadow-[var(--shadow-soft)]"
                      : "border-border bg-surface text-muted hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 font-mono text-[11px] font-semibold",
                      active ? "text-accent-foreground/80" : "text-muted",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium leading-snug">
                    {preset.question}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className="space-y-2 lg:hidden"
            aria-hidden={isDesktop}
            inert={isDesktop ? true : undefined}
          >
            {chatbotPresets.map((preset, index) => {
              const open = selectedId === preset.id;
              return (
                <div
                  key={preset.id}
                  className={cn(
                    "overflow-hidden rounded-2xl border",
                    open
                      ? "border-accent/35 bg-surface shadow-[var(--shadow-soft)]"
                      : "border-border bg-surface",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-label={`${String(index + 1).padStart(2, "0")}. ${preset.question}`}
                      onClick={() => setSelectedId(preset.id)}
                      className="flex w-full items-start gap-3 px-3.5 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="mt-0.5 font-mono text-[11px] font-semibold text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-medium leading-snug",
                          open ? "text-foreground" : "text-muted",
                        )}
                      >
                        {preset.question}
                      </span>
                    </button>
                  </h3>
                  {open ? (
                    <div className="border-t border-border px-3.5 py-3">
                      <AnswerSurface
                        question={preset.question}
                        answer={preset.answer}
                        position={index + 1}
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <aside
            className="hidden rounded-[var(--radius-workspace)] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-6 lg:block"
            aria-hidden={!isDesktop}
            inert={!isDesktop ? true : undefined}
          >
            <AnswerSurface
              question={selected.question}
              answer={selected.answer}
              position={position}
            />
            <div className="mt-6">
              <OpenChatbotButton size="md">
                {chatbotFeatureShowcase.openWidgetLabel}
                <MessageCircle className="size-4" />
              </OpenChatbotButton>
            </div>
          </aside>
        </div>

        <div
          className="mt-4 lg:hidden"
          aria-hidden={isDesktop}
          inert={isDesktop ? true : undefined}
        >
          <OpenChatbotButton size="md" className="w-full sm:w-auto">
            {chatbotFeatureShowcase.openWidgetLabel}
            <MessageCircle className="size-4" />
          </OpenChatbotButton>
        </div>
      </Container>
    </section>
  );
}

function AnswerSurface({
  question,
  answer,
  position,
}: {
  question: string;
  answer: string;
  position: number;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
        Question {position} of {chatbotPresets.length}
      </p>
      <h3 className="mt-2 font-heading text-lg font-semibold text-pretty sm:text-xl">
        {question}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-muted text-pretty sm:text-[15px] sm:leading-7">
        {answer}
      </p>
    </div>
  );
}
