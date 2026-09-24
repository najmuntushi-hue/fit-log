"use client";

import { Plus, Bookmark } from "lucide-react";
import { toast } from "sonner";
import { useFitLog, PLAN_LIMIT } from "@/context/FitLogContext";

export default function WorkoutActions({ id }: { id: number }) {
  const { plan, addToPlan, addToSaved } = useFitLog();
  const planFull = plan.length >= PLAN_LIMIT && !plan.includes(id);

  const handlePlan = () => {
    const result = addToPlan(id);
    if (result === "added") toast.success("Added to today's plan");
    else if (result === "exists") toast.info("Already in today's plan");
    else toast.error(`Plan is full (max ${PLAN_LIMIT} lifts)`);
  };

  const handleSave = () => {
    const result = addToSaved(id);
    if (result === "added") toast.success("Saved for later");
    else toast.info("Already in your saved list");
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={handlePlan}
        disabled={planFull}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wide text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Plus className="h-4 w-4" />
        {planFull ? "Plan is full" : "Add to today's plan"}
      </button>
      <button
        onClick={handleSave}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-5 py-3 text-xs font-bold uppercase tracking-wide transition hover:border-accent hover:text-accent"
      >
        <Bookmark className="h-4 w-4" />
        Save for later
      </button>
    </div>
  );
}