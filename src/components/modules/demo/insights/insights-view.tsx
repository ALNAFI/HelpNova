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

  return (
    <div className="h-full min-h-0 overflow-y-auto p-3 sm:p-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 pb-6">
        <KpiCards kpis={kpis} />

        <div className="grid gap-4 lg:grid-cols-2">
          <StatusChart open={status.open} resolved={status.resolved} />
          <TeamWorkloadChart items={workload} />
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <HistoricalChart
            range={state.historicalRange}
            onRangeChange={(range) =>
              dispatch({ type: "SET_HISTORICAL_RANGE", range })
            }
          />
          <RecentActivity items={recent} />
        </div>
      </div>
    </div>
  );
}
