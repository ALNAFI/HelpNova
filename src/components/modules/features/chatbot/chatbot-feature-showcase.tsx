"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import AnimatedList, {
  type AnimatedListItem,
} from "@/components/ui/animated-list";
import { OpenChatbotButton } from "@/components/common/chatbot/open-chatbot-button";
import { AnswerPanelTransition } from "@/components/modules/features/chatbot/answer-panel-transition";
import {
  chatbotFeatureHero,
  chatbotFeatureShowcase,
  chatbotPresets,
  getChatbotPreset,
} from "@/data/marketing/chatbot-feature";
import { getChatbotPresetIndex } from "@/data/chatbot/presets";
import { cn } from "@/utils/cn";

const INITIAL_INDEX = Math.max(
  0,
  getChatbotPresetIndex(chatbotFeatureHero.heroPresetId),
);

/** Eight question rows (~45px) + seven 8px gaps + 12px viewport padding. */
const QUESTION_LIST_MAX_HEIGHT = 8 * 45 + 7 * 8 + 12;

export function ChatbotFeatureShowcase() {
  const [selectedId, setSelectedId] = useState(
    chatbotFeatureHero.heroPresetId,
  );
  const selected = getChatbotPreset(selectedId);
  const position = getChatbotPresetIndex(selectedId) + 1;

  const items = useMemo<AnimatedListItem[]>(
    () =>
      chatbotPresets.map((preset) => ({
        id: preset.id,
        title: preset.question,
      })),
    [],
  );

  const handleSelect = (item: AnimatedListItem) => {
    if (typeof item === "string") return;
    if (!item.id) return;
    setSelectedId(item.id);
  };

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

        <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <AnimatedList
            items={items}
            initialSelectedIndex={INITIAL_INDEX}
            selectOnHover={false}
            enableArrowNavigation
            animation="pop"
            stagger={0.05}
            showGradients
            fadeSize={48}
            displayScrollbar
            frame={false}
            theme="dark"
            radius={16}
            gap={8}
            width="100%"
            maxHeight={QUESTION_LIST_MAX_HEIGHT}
            className="min-w-0 w-full max-w-none self-start !rounded-none text-foreground"
            itemClassName="p-0"
            onItemSelect={handleSelect}
            renderItem={(item, index, isSelected) => {
              const entry =
                typeof item === "string" ? { title: item } : item;
              return (
                <div
                  className={cn(
                    "flex w-full min-w-0 items-start gap-3 rounded-2xl border px-3.5 py-3 text-left transition",
                    isSelected
                      ? "border-accent/40 bg-accent text-accent-foreground shadow-[var(--shadow-soft)]"
                      : "border-border bg-surface text-muted",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 font-mono text-[11px] font-semibold",
                      isSelected
                        ? "text-accent-foreground/80"
                        : "text-muted",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-medium leading-snug text-pretty">
                    {entry.title}
                  </span>
                </div>
              );
            }}
          />

          <aside className="rounded-[var(--radius-workspace)] border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-6 lg:sticky lg:top-28 lg:self-start">
            <AnswerPanelTransition switchKey={selectedId}>
              <AnswerSurface
                question={selected.question}
                answer={selected.answer}
                position={position}
              />
              <div className="mt-6" data-answer-stage="cta">
                <OpenChatbotButton size="md">
                  {chatbotFeatureShowcase.openWidgetLabel}
                  <MessageCircle className="size-4" />
                </OpenChatbotButton>
              </div>
            </AnswerPanelTransition>
          </aside>
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
      <p
        data-answer-stage="meta"
        className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase"
      >
        Question {position} of {chatbotPresets.length}
      </p>
      <h3
        data-answer-stage="heading"
        className="mt-2 font-heading text-lg font-semibold text-pretty sm:text-xl"
      >
        {question}
      </h3>
      <p
        data-answer-stage="body"
        className="mt-4 text-sm leading-relaxed text-muted text-pretty sm:text-[15px] sm:leading-7"
      >
        {answer}
      </p>
    </div>
  );
}
