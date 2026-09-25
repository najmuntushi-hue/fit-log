"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

type Workout = {
  id: number;
  name: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  image: string;
};

export default function MyPlanPage() {
  const {
    plan,
    saved,
    done,
    hydrated,
    removeFromPlan,
    removeFromSaved,
    markDone,
  } = useFitLog();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [toast, setToast] = useState("");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to load workouts");
        }

        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Failed to load workouts:", error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 2200);

    return () => clearTimeout(timer);
  }, [toast]);

  const currentIds = activeTab === "plan" ? plan : saved;

  const currentWorkouts = useMemo(() => {
    return currentIds
      .map((id) => workouts.find((workout) => workout.id === id))
      .filter(Boolean) as Workout[];
  }, [currentIds, workouts]);

  const totalMinutes = useMemo(() => {
    return currentWorkouts.reduce(
      (total, workout) => total + workout.duration,
      0
    );
  }, [currentWorkouts]);

  const totalCalories = useMemo(() => {
    return currentWorkouts.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );
  }, [currentWorkouts]);

  if (!hydrated || loading) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center justify-center px-4">
        <p className="animate-pulse text-sm text-muted">
          Loading workouts…
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-5 sm:py-12">
      <section>
        <p className="text-sm font-semibold tracking-[0.2em] text-accent">
          YOUR WORKOUTS
        </p>

        <h1 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          MY PLAN
        </h1>

        <p className="mt-3 max-w-xl text-sm text-muted sm:text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Exercises
          </p>
          <p className="mt-2 font-display text-3xl font-bold">
            {plan.length}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Minutes
          </p>
          <p className="mt-2 font-display text-3xl font-bold">
            {totalMinutes}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Calories
          </p>
          <p className="mt-2 font-display text-3xl font-bold">
            {totalCalories}
          </p>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex gap-2 border-b border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`rounded-t-lg px-4 py-3 text-sm font-semibold transition ${
              activeTab === "plan"
                ? "bg-accent text-black"
                : "text-muted hover:text-white"
            }`}
          >
            Today's Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`rounded-t-lg px-4 py-3 text-sm font-semibold transition ${
              activeTab === "saved"
                ? "bg-accent text-black"
                : "text-muted hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {currentWorkouts.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <h2 className="font-display text-2xl font-bold uppercase">
              NOTHING HERE YET
            </h2>

            <p className="mt-2 text-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-black transition hover:opacity-90"
            >
              GO TO WORKOUTS
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {currentWorkouts.map((workout) => {
              const isDone = done.includes(workout.id);

              return (
                <article
                  key={workout.id}
                  className={`overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${
                    isDone ? "opacity-70" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row">
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="h-52 w-full object-cover sm:h-auto sm:w-56"
                    />

                    <div className="flex-1 p-5">
                      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                        {workout.muscleGroups?.join(", ")}
                      </p>

                      <h3 className="mt-2 font-display text-2xl font-bold uppercase">
                        {workout.name}
                      </h3>

                      <p className="mt-1 text-sm text-muted">
                        {workout.equipment}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
                        <span>{workout.duration} min</span>
                        <span>{workout.caloriesBurned} cal</span>
                        <span>★ {workout.rating}</span>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        <Link
                          href={`/workout/${workout.id}`}
                          className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
                        >
                          View Details
                        </Link>

                        {activeTab === "plan" && (
                          <button
                            type="button"
                            onClick={() => {
                              markDone(workout.id);
                              setToast("Workout marked as done");
                            }}
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                              isDone
                                ? "bg-white/10 text-white/60"
                                : "bg-accent text-black hover:opacity-90"
                            }`}
                          >
                            <Check size={16} />
                            {isDone ? "Done" : "Mark as Done"}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            if (activeTab === "plan") {
                              removeFromPlan(workout.id);
                              setToast("Removed from today's plan");
                            } else {
                              removeFromSaved(workout.id);
                              setToast("Removed from saved");
                            }
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-sm transition hover:bg-white/10"
                          aria-label={`Remove ${workout.name}`}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-zinc-900 px-5 py-3 text-sm font-semibold shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}