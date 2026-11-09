"use client";

import { useDemo } from "@/context/demo-context";
import { topicToConversationId } from "@/data/demo/seed";
import {
  AutomationStudio,
} from "@/components/modules/demo/automation/automation-studio";
import type { TopicId } from "@/components/modules/demo/automation/automation-data";
import type { DemoTopic } from "@/types/demo";

const topicIdToDemoTopic: Record<TopicId, DemoTopic> = {
  orders: "order-tracking",
  billing: "billing-issue",
  technical: "technical-support",
};

type AutomationViewProps = {
  resetSignal?: number;
};

export function AutomationView({ resetSignal }: AutomationViewProps) {
  const { dispatch } = useDemo();

  return (
    <div className="h-full min-h-0 overflow-x-hidden overflow-y-auto">
      <AutomationStudio
        resetSignal={resetSignal}
        onViewConversation={({ inquiryId }) => {
          const conversationId =
            topicToConversationId[topicIdToDemoTopic[inquiryId]];
          dispatch({ type: "SELECT_CONVERSATION", conversationId });
          dispatch({ type: "SET_MOBILE_THREAD_OPEN", open: true });
          dispatch({ type: "SET_VIEW", view: "inbox" });
        }}
      />
    </div>
  );
}
