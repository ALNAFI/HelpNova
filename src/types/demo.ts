export type DemoTeam =
  | "Orders"
  | "Billing"
  | "Technical"
  | "General Triage";

export type DemoTopic =
  | "order-tracking"
  | "billing-issue"
  | "technical-support";

export type DemoRule = "order" | "billing" | "technical";

export type ConversationStatus = "open" | "resolved";

export type MessageKind = "customer" | "reply" | "note";

export type DemoView = "inbox" | "automation" | "insights";

export type InboxFilter = "all" | "open" | "resolved";

export type ComposerMode = "reply" | "note";

export type ActivityKind =
  | "created"
  | "assigned"
  | "reply"
  | "note"
  | "resolved"
  | "reopened"
  | "automation";

export type DemoMessage = {
  id: string;
  kind: MessageKind;
  author: string;
  body: string;
  createdAt: string;
};

export type DemoActivity = {
  id: string;
  conversationId: string;
  kind: ActivityKind;
  summary: string;
  createdAt: string;
  team?: DemoTeam | null;
};

export type DemoConversation = {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  topic: DemoTopic;
  status: ConversationStatus;
  team: DemoTeam | null;
  priority: "Low" | "Medium" | "High";
  tags: string[];
  channel: "Email" | "Chat";
  updatedAt: string;
  messages: DemoMessage[];
};

export type SimulationResult = {
  inquiry: DemoTopic;
  rule: DemoRule;
  matched: boolean;
  destination: DemoTeam;
  conversationId: string;
  explanation: string;
  ranAt: string;
};

export type DemoState = {
  conversations: DemoConversation[];
  activity: DemoActivity[];
  view: DemoView;
  selectedConversationId: string | null;
  inboxSearch: string;
  inboxFilter: InboxFilter;
  composerMode: ComposerMode;
  replyDraft: string;
  noteDraft: string;
  mobileThreadOpen: boolean;
  selectedInquiry: DemoTopic;
  selectedRule: DemoRule;
  selectedNodeId: string;
  simulation: SimulationResult | null;
  simulationNonce: number;
  historicalRange: 7 | 30;
  activityCounter: number;
  messageCounter: number;
};

export type DemoAction =
  | { type: "SET_VIEW"; view: DemoView }
  | { type: "SELECT_CONVERSATION"; conversationId: string | null }
  | { type: "ENSURE_CONVERSATION_SELECTION"; conversationId: string | null }
  | { type: "SET_INBOX_SEARCH"; search: string }
  | { type: "SET_INBOX_FILTER"; filter: InboxFilter }
  | { type: "SET_COMPOSER_MODE"; mode: ComposerMode }
  | { type: "SET_REPLY_DRAFT"; value: string }
  | { type: "SET_NOTE_DRAFT"; value: string }
  | { type: "SET_MOBILE_THREAD_OPEN"; open: boolean }
  | { type: "ASSIGN_TEAM"; conversationId: string; team: DemoTeam | null }
  | { type: "RESOLVE_CONVERSATION"; conversationId: string }
  | { type: "REOPEN_CONVERSATION"; conversationId: string }
  | { type: "ADD_REPLY"; conversationId: string; body: string }
  | { type: "ADD_NOTE"; conversationId: string; body: string }
  | { type: "SET_INQUIRY"; inquiry: DemoTopic }
  | { type: "SET_RULE"; rule: DemoRule }
  | { type: "SELECT_NODE"; nodeId: string }
  | { type: "RUN_SIMULATION" }
  | { type: "REPLAY_SIMULATION" }
  | { type: "SET_HISTORICAL_RANGE"; range: 7 | 30 }
  | { type: "RESET_DEMO" };
