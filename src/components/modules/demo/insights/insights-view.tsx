"use client";

import { useMemo } from "react";
import { useDemo } from "@/context/demo-context";
import { KpiCards } from "@/components/modules/demo/insights/kpi-cards";
import { StatusChart } from "@/components/modules/demo/insights/status-chart";
import { TeamWorkloadChart } from "@/components/modules/demo/insights/team-workload";
import { HistoricalChart } from "@/components/modules/demo/insights/historical-chart";
import { RecentActivity } from "@/components/modules/demo/insights/recent-activity";
import {
  selectLiveKpis,
  selectOpenWorkload,
  selectRecentActivity,
  selectStatusDistribution,
} from "@/utils/demo-selectors";

export function InsightsView() {
  const { state, dispatch } = useDemo();

  const kpis = useMemo(
    () => selectLiveKpis(state.conversations),
    [state.conversations],
  );
  const status = useMemo(
    () => selectStatusDistribution(state.conversations),
    [state.conversations],
  );
  const workload = useMemo(
    () => selectOpenWorkload(state.conversations),
    [state.conversations],
  );
  const recent = useMemo(
    () => selectRecentActivity(state.activity),
    [state.activity],
  );

  const handleOpenConversation = (conversationId: string) => {
    dispatch({ type: "SELECT_CONVERSATION", conversationId });
    dispatch({ type: "SET_MOBILE_THREAD_OPEN", open: true });
    dispatch({ type: "SET_VIEW", view: "inbox" });
  };

  return (
    <div className="h-full min-h-0 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:px-8 lg:py-7">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 pb-8 sm:gap-5">
        <KpiCards kpis={kpis} />

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          <StatusChart open={status.open} resolved={status.resolved} />
          <TeamWorkloadChart items={workload} />
        </div>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)]">
          <HistoricalChart
            range={state.historicalRange}
            onRangeChange={(range) =>
              dispatch({ type: "SET_HISTORICAL_RANGE", range })
            }
          />
          <RecentActivity
            items={recent}
            conversations={state.conversations}
            onOpenConversation={handleOpenConversation}
          />
        </div>
      </div>
    </div>
  );
}
