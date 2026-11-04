import { createInitialDemoState, DEMO_AGENT } from "@/data/demo/seed";
import { evaluateAutomation } from "@/utils/demo-automation";
import type {
  DemoAction,
  DemoActivity,
  DemoConversation,
  DemoState,
  DemoTeam,
} from "@/types/demo";

function nowIso() {
  return new Date().toISOString();
}

function nextActivityId(state: DemoState) {
  return `act-${state.activityCounter + 1}`;
}

function nextMessageId(state: DemoState) {
  return `msg-local-${state.messageCounter + 1}`;
}

function pushActivity(
  state: DemoState,
  partial: Omit<DemoActivity, "id">,
): Pick<DemoState, "activity" | "activityCounter"> {
  const id = nextActivityId(state);
  return {
    activityCounter: state.activityCounter + 1,
    activity: [{ ...partial, id }, ...state.activity],
  };
}

function updateConversation(
  conversations: DemoConversation[],
  conversationId: string,
  updater: (c: DemoConversation) => DemoConversation,
): DemoConversation[] {
  return conversations.map((c) =>
    c.id === conversationId ? updater(c) : c,
  );
}

function applyAssignment(
  state: DemoState,
  conversationId: string,
  team: DemoTeam | null,
  activityKind: "assigned" | "automation",
  summary: string,
): DemoState {
  const conversation = state.conversations.find((c) => c.id === conversationId);
  if (!conversation) return state;
  if (conversation.team === team) return state;

  const stamp = nowIso();
  const activityUpdate = pushActivity(state, {
    conversationId,
    kind: activityKind,
    summary,
    createdAt: stamp,
    team,
  });

  return {
    ...state,
    ...activityUpdate,
    conversations: updateConversation(
      state.conversations,
      conversationId,
      (c) => ({ ...c, team, updatedAt: stamp }),
    ),
  };
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "SET_VIEW":
      return { ...state, view: action.view };

    case "SELECT_CONVERSATION":
      return {
        ...state,
        selectedConversationId: action.conversationId,
        mobileThreadOpen: action.conversationId !== null,
        replyDraft: "",
        noteDraft: "",
      };

    case "ENSURE_CONVERSATION_SELECTION":
      return {
        ...state,
        selectedConversationId: action.conversationId,
      };

    case "SET_INBOX_SEARCH":
      return { ...state, inboxSearch: action.search };

    case "SET_INBOX_FILTER":
      return { ...state, inboxFilter: action.filter };

    case "SET_COMPOSER_MODE":
      return { ...state, composerMode: action.mode };

    case "SET_REPLY_DRAFT":
      return { ...state, replyDraft: action.value };

    case "SET_NOTE_DRAFT":
      return { ...state, noteDraft: action.value };

    case "SET_MOBILE_THREAD_OPEN":
      return { ...state, mobileThreadOpen: action.open };

    case "ASSIGN_TEAM": {
      const label = action.team ?? "Unassigned";
      return applyAssignment(
        state,
        action.conversationId,
        action.team,
        "assigned",
        action.team ? `Assigned to ${label}` : "Marked as Unassigned",
      );
    }

    case "RESOLVE_CONVERSATION": {
      const conversation = state.conversations.find(
        (c) => c.id === action.conversationId,
      );
      if (!conversation || conversation.status === "resolved") return state;

      const stamp = nowIso();
      const activityUpdate = pushActivity(state, {
        conversationId: action.conversationId,
        kind: "resolved",
        summary: `Conversation resolved for ${conversation.customerName}`,
        createdAt: stamp,
      });

      return {
        ...state,
        ...activityUpdate,
        conversations: updateConversation(
          state.conversations,
          action.conversationId,
          (c) => ({ ...c, status: "resolved", updatedAt: stamp }),
        ),
      };
    }

    case "REOPEN_CONVERSATION": {
      const conversation = state.conversations.find(
        (c) => c.id === action.conversationId,
      );
      if (!conversation || conversation.status === "open") return state;

      const stamp = nowIso();
      const activityUpdate = pushActivity(state, {
        conversationId: action.conversationId,
        kind: "reopened",
        summary: `Conversation reopened for ${conversation.customerName}`,
        createdAt: stamp,
      });

      return {
        ...state,
        ...activityUpdate,
        conversations: updateConversation(
          state.conversations,
          action.conversationId,
          (c) => ({ ...c, status: "open", updatedAt: stamp }),
        ),
      };
    }

    case "ADD_REPLY": {
      const body = action.body.trim();
      if (!body) return state;
      const conversation = state.conversations.find(
        (c) => c.id === action.conversationId,
      );
      if (!conversation) return state;

      const stamp = nowIso();
      const messageId = nextMessageId(state);
      const activityUpdate = pushActivity(state, {
        conversationId: action.conversationId,
        kind: "reply",
        summary: `Local reply added for ${conversation.customerName}`,
        createdAt: stamp,
      });

      return {
        ...state,
        ...activityUpdate,
        messageCounter: state.messageCounter + 1,
        replyDraft: "",
        conversations: updateConversation(
          state.conversations,
          action.conversationId,
          (c) => ({
            ...c,
            updatedAt: stamp,
            messages: [
              ...c.messages,
              {
                id: messageId,
                kind: "reply",
                author: DEMO_AGENT,
                body,
                createdAt: stamp,
              },
            ],
          }),
        ),
      };
    }

    case "ADD_NOTE": {
      const body = action.body.trim();
      if (!body) return state;
      const conversation = state.conversations.find(
        (c) => c.id === action.conversationId,
      );
      if (!conversation) return state;

      const stamp = nowIso();
      const messageId = nextMessageId(state);
      const activityUpdate = pushActivity(state, {
        conversationId: action.conversationId,
        kind: "note",
        summary: `Internal note added for ${conversation.customerName}`,
        createdAt: stamp,
      });

      return {
        ...state,
        ...activityUpdate,
        messageCounter: state.messageCounter + 1,
        noteDraft: "",
        conversations: updateConversation(
          state.conversations,
          action.conversationId,
          (c) => ({
            ...c,
            updatedAt: stamp,
            messages: [
              ...c.messages,
              {
                id: messageId,
                kind: "note",
                author: DEMO_AGENT,
                body,
                createdAt: stamp,
              },
            ],
          }),
        ),
      };
    }

    case "SET_INQUIRY":
      return { ...state, selectedInquiry: action.inquiry };

    case "SET_RULE":
      return { ...state, selectedRule: action.rule };

    case "SELECT_NODE":
      return { ...state, selectedNodeId: action.nodeId };

    case "RUN_SIMULATION": {
      const result = evaluateAutomation(
        state.selectedInquiry,
        state.selectedRule,
      );
      const withSim: DemoState = {
        ...state,
        simulation: result,
        simulationNonce: state.simulationNonce + 1,
        selectedNodeId: "destination",
      };
      return applyAssignment(
        withSim,
        result.conversationId,
        result.destination,
        "automation",
        `Automation routed to ${result.destination}`,
      );
    }

    case "REPLAY_SIMULATION": {
      if (!state.simulation) return state;
      return {
        ...state,
        simulationNonce: state.simulationNonce + 1,
      };
    }

    case "SET_HISTORICAL_RANGE":
      return { ...state, historicalRange: action.range };

    case "RESET_DEMO":
      return createInitialDemoState();

    default:
      return state;
  }
}
