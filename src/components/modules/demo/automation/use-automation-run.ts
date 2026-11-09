"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AUTO_SCENARIOS,
  LAST_STEP,
  RESULT_HOLD_MS,
  STEP_MS,
  getInquiry,
  getRule,
  resolveOutcome,
  type TopicId,
} from "./automation-data";

export type RunPhase = "playing" | "paused" | "complete";
export type RunMode = "auto" | "manual";

const LAST_SCENARIO = AUTO_SCENARIOS.length - 1;

/**
 * Drives one routing run (steps 0..LAST_STEP).
 * - "auto": Play walks through every inquiry/rule combination (AUTO_SCENARIOS) once, then stops.
 * - "manual": the visitor picked an inquiry or rule; Play runs just that pair once.
 * Nothing starts until Play is pressed. `active` gates the timer so nothing advances off screen.
 */
export function useAutomationRun({ active }: { active: boolean }) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [inquiryId, setInquiryId] = useState<TopicId>(AUTO_SCENARIOS[0].inquiry);
  const [ruleId, setRuleId] = useState<TopicId>(AUTO_SCENARIOS[0].rule);
  const [mode, setMode] = useState<RunMode>("auto");
  const [phase, setPhase] = useState<RunPhase>("paused");
  const [step, setStep] = useState(0);

  const inquiry = getInquiry(inquiryId);
  const rule = getRule(ruleId);
  const outcome = useMemo(() => resolveOutcome(inquiry, rule), [inquiry, rule]);

  const applyScenario = useCallback((index: number) => {
    setScenarioIndex(index);
    setInquiryId(AUTO_SCENARIOS[index].inquiry);
    setRuleId(AUTO_SCENARIOS[index].rule);
  }, []);

  useEffect(() => {
    if (!active || phase !== "playing") return;

    const isLast = step === LAST_STEP;
    const hasNext = mode === "auto" && scenarioIndex < LAST_SCENARIO;
    const delay = !isLast ? STEP_MS : hasNext ? RESULT_HOLD_MS : 0;

    const id = window.setTimeout(() => {
      if (!isLast) {
        setStep(step + 1);
      } else if (hasNext) {
        applyScenario(scenarioIndex + 1);
        setStep(0);
      } else {
        setPhase("complete");
      }
    }, delay);

    return () => window.clearTimeout(id);
  }, [active, phase, step, mode, scenarioIndex, applyScenario]);

  const selectInquiry = useCallback((id: TopicId) => {
    setMode("manual");
    setInquiryId(id);
    setStep(0);
    setPhase("paused");
  }, []);

  const selectRule = useCallback((id: TopicId) => {
    setMode("manual");
    setRuleId(id);
    setStep(0);
    setPhase("paused");
  }, []);

  /** Restart the current pair from its first step. */
  const replay = useCallback(() => {
    setStep(0);
    setPhase("playing");
  }, []);

  /** Start the full sequence from combination 1. */
  const playAll = useCallback(() => {
    setMode("auto");
    applyScenario(0);
    setStep(0);
    setPhase("playing");
  }, [applyScenario]);

  const togglePlay = useCallback(() => {
    if (phase === "complete") {
      if (mode === "auto") applyScenario(0);
      setStep(0);
      setPhase("playing");
      return;
    }
    setPhase((p) => (p === "playing" ? "paused" : "playing"));
  }, [phase, mode, applyScenario]);

  const goToStep = useCallback((next: number) => {
    const clamped = Math.min(Math.max(next, 0), LAST_STEP);
    setStep(clamped);
    setPhase(clamped === LAST_STEP ? "complete" : "paused");
  }, []);

  /** Back to "Ready" on combination 1 (used by the page-level "Reset Demo"). */
  const reset = useCallback(() => {
    setMode("auto");
    applyScenario(0);
    setStep(0);
    setPhase("paused");
  }, [applyScenario]);

  return {
    inquiry,
    rule,
    matched: outcome.matched,
    team: outcome.team,
    step,
    phase,
    mode,
    scenarioIndex,
    scenarioCount: AUTO_SCENARIOS.length,
    selectInquiry,
    selectRule,
    replay,
    playAll,
    togglePlay,
    goToStep,
    reset,
  };
}
