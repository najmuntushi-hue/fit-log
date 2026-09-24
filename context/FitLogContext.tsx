"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const PLAN_LIMIT = 5;
const STORAGE_KEY = "fitlog-state";

type State = { plan: number[]; saved: number[]; done: number[] };
type PlanResult = "added" | "exists" | "full";
type SaveResult = "added" | "exists";

type FitLogContextType = State & {
  hydrated: boolean;
  addToPlan: (id: number) => PlanResult;
  addToSaved: (id: number) => SaveResult;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
};

const FitLogContext = createContext<FitLogContextType | null>(null);

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ plan: [], saved: [], done: [] });
  const [hydrated, setHydrated] = useState(false);

  // reload dile localStorage theke data ferot ana
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        setState({
          plan: p.plan ?? [],
          saved: p.saved ?? [],
          done: p.done ?? [],
        });
      }
    } catch {}
    setHydrated(true);
  }, []);

  // state change hole localStorage e save
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const addToPlan = (id: number): PlanResult => {
    if (state.plan.includes(id)) return "exists";
    if (state.plan.length >= PLAN_LIMIT) return "full";
    setState((s) => ({ ...s, plan: [...s.plan, id] }));
    return "added";
  };

  const addToSaved = (id: number): SaveResult => {
    if (state.saved.includes(id)) return "exists";
    setState((s) => ({ ...s, saved: [...s.saved, id] }));
    return "added";
  };

  const removeFromPlan = (id: number) =>
    setState((s) => ({
      ...s,
      plan: s.plan.filter((x) => x !== id),
      done: s.done.filter((x) => x !== id),
    }));

  const removeFromSaved = (id: number) =>
    setState((s) => ({ ...s, saved: s.saved.filter((x) => x !== id) }));

  const markDone = (id: number) =>
    setState((s) =>
      s.done.includes(id) ? s : { ...s, done: [...s.done, id] }
    );

  return (
    <FitLogContext.Provider
      value={{
        ...state,
        hydrated,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markDone,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const ctx = useContext(FitLogContext);
  if (!ctx) throw new Error("useFitLog must be used inside FitLogProvider");
  return ctx;
}