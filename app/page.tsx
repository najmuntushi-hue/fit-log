"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import type { Workout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

type SortOption = "duration" | "calories" | "rating";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("duration");

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

  const sortedWorkouts = useMemo(() => {
    const list = [...workouts];

    if (sortBy === "duration") {
      return list.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "calories") {
      return list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    }

    return list.sort((a, b) => b.rating - a.rating);
  }, [workouts, sortBy]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-5 sm:py-8">
      {/* Hero Section */}
      <Hero />

      {/* Workout Library */}
      <section id="library" className="scroll-mt-24 pt-16">
        {/* Library Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-lime-400">
              WORKOUT LIBRARY
            </p>

            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              THE LIBRARY
            </h2>

            <p className="mt-2 text-sm text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-48">
            <label
              htmlFor="sort-workouts"
              className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted"
            >
              Sort by
            </label>

            <div className="relative">
              <select
                id="sort-workouts"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as SortOption)
                }
                className="w-full appearance-none rounded-full border border-white/15 bg-white/5 px-4 py-2.5 pr-10 text-sm font-medium text-white outline-none transition hover:bg-white/10 focus:border-accent"
              >
                <option value="duration" className="bg-zinc-900">
                  Duration
                </option>

                <option value="calories" className="bg-zinc-900">
                  Calories
                </option>

                <option value="rating" className="bg-zinc-900">
                  Rating
                </option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <p className="animate-pulse text-sm text-muted">
              Loading workouts…
            </p>
          </div>
        ) : sortedWorkouts.length === 0 ? (
          /* Empty / Error State */
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-lg font-semibold">
              No workouts available
            </p>

            <p className="mt-2 text-sm text-muted">
              Please try again in a moment.
            </p>
          </div>
        ) : (
          /* Workout Grid */
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}