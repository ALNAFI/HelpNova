"use client";

import { useEffect, useMemo } from "react";
import { useDemo } from "@/context/demo-context";
import { ConversationList } from "@/components/modules/demo/inbox/conversation-list";
import { ConversationThread } from "@/components/modules/demo/inbox/conversation-thread";
import { CustomerContext } from "@/components/modules/demo/inbox/customer-context";
import {
  filterConversations,
  getSelectedConversation,
  selectConversationActivity,
} from "@/utils/demo-selectors";
import { cn } from "@/utils/cn";

export function InboxView() {
  const { state, dispatch } = useDemo();

  const filtered = useMemo(
    () =>
      filterConversations(
        state.conversations,
        state.inboxSearch,
        state.inboxFilter,
      ),
    [state.conversations, state.inboxSearch, state.inboxFilter],
  );

  const selected = getSelectedConversation(state);

  useEffect(() => {
    if (!state.selectedConversationId) return;
    const stillVisible = filtered.some(
      (c) => c.id === state.selectedConversationId,
    );
    if (!stillVisible && filtered.length > 0) {
      dispatch({
        type: "ENSURE_CONVERSATION_SELECTION",
        conversationId: filtered[0].id,
      });
    }
    if (!stillVisible && filtered.length === 0) {
      dispatch({
        type: "ENSURE_CONVERSATION_SELECTION",
        conversationId: null,
      });
    }
  }, [filtered, state.selectedConversationId, dispatch]);

  const activity = selected
    ? selectConversationActivity(state.activity, selected.id)
    : [];

  const showThreadMobile = state.mobileThreadOpen && selected;

  return (
    <div className="grid h-full min-h-0 grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_280px]">
      <section
        className={cn(
          "min-h-0 border-r border-[var(--demo-border)] bg-[var(--demo-panel)]/70",
          showThreadMobile ? "hidden xl:flex xl:flex-col" : "flex flex-col",
        )}
        aria-label="Conversation list"
      >
        <ConversationList
          conversations={filtered}
          selectedId={state.selectedConversationId}
          search={state.inboxSearch}
          filter={state.inboxFilter}
          onSearch={(search) =>
            dispatch({ type: "SET_INBOX_SEARCH", search })
          }
          onFilter={(filter) =>
            dispatch({ type: "SET_INBOX_FILTER", filter })
          }
          onSelect={(conversationId) =>
            dispatch({ type: "SELECT_CONVERSATION", conversationId })
          }
          onClearFilters={() => {
            dispatch({ type: "SET_INBOX_SEARCH", search: "" });
            dispatch({ type: "SET_INBOX_FILTER", filter: "all" });
          }}
        />
      </section>

      <section
        className={cn(
          "min-h-0 bg-[var(--demo-bg)]",
          showThreadMobile ? "flex flex-col" : "hidden xl:flex xl:flex-col",
        )}
        aria-label="Conversation thread"
      >
        {selected ? (
          <ConversationThread
            conversation={selected}
            activity={activity}
            composerMode={state.composerMode}
            replyDraft={state.replyDraft}
            noteDraft={state.noteDraft}
            showBack
            onBack={() =>
              dispatch({ type: "SET_MOBILE_THREAD_OPEN", open: false })
            }
            onModeChange={(mode) =>
              dispatch({ type: "SET_COMPOSER_MODE", mode })
            }
            onReplyChange={(value) =>
              dispatch({ type: "SET_REPLY_DRAFT", value })
            }
            onNoteChange={(value) =>
              dispatch({ type: "SET_NOTE_DRAFT", value })
            }
            onSubmit={() => {
              if (state.composerMode === "reply") {
                dispatch({
                  type: "ADD_REPLY",
                  conversationId: selected.id,
                  body: state.replyDraft,
                });
              } else {
                dispatch({
                  type: "ADD_NOTE",
                  conversationId: selected.id,
                  body: state.noteDraft,
                });
              }
            }}
            onAssign={(team) =>
              dispatch({
                type: "ASSIGN_TEAM",
                conversationId: selected.id,
                team,
              })
            }
            onResolve={() =>
              dispatch({
                type: "RESOLVE_CONVERSATION",
                conversationId: selected.id,
              })
            }
            onReopen={() =>
              dispatch({
                type: "REOPEN_CONVERSATION",
                conversationId: selected.id,
              })
            }
          />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center">
            <p className="text-sm text-[var(--demo-muted)]">
              Select a conversation to open the thread.
            </p>
          </div>
        )}
      </section>

      <aside
        className="hidden min-h-0 border-l border-[var(--demo-border)] bg-[var(--demo-panel)]/80 xl:block"
        aria-label="Customer context"
      >
        {selected ? (
          <CustomerContext
            conversation={selected}
            activity={activity}
            onAssign={(team) =>
              dispatch({
                type: "ASSIGN_TEAM",
                conversationId: selected.id,
                team,
              })
            }
            onResolve={() =>
              dispatch({
                type: "RESOLVE_CONVERSATION",
                conversationId: selected.id,
              })
            }
            onReopen={() =>
              dispatch({
                type: "REOPEN_CONVERSATION",
                conversationId: selected.id,
              })
            }
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-[var(--demo-muted)]">
            Customer context appears when a conversation is selected.
          </div>
        )}
      </aside>
    </div>
  );
}
