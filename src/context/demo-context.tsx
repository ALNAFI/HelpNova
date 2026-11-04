"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { createInitialDemoState } from "@/data/demo/seed";
import { demoReducer } from "@/context/demo-reducer";
import type { DemoAction, DemoState } from "@/types/demo";

type DemoContextValue = {
  state: DemoState;
  dispatch: Dispatch<DemoAction>;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    demoReducer,
    undefined,
    createInitialDemoState,
  );

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error("useDemo must be used within DemoProvider");
  }
  return ctx;
}
