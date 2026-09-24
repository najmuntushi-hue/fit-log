"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Bookmark, Check, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

type Workout = {
  id: string | number;
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  category?: string | string[];
  categories?: string[];
  equipment?: string;
  duration?: number | string;
  calories?: number | string;
  caloriesBurned?: number | string;
  rating?: number | string;
  instructions?: string | string[];
};

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = String(params.id);
  const numericId = Number(id);

  const {
    plan,
    saved,
    addToPlan,
    addToSaved,
    hydrated,
  } = useFitLog();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    async function loadWorkout() {
      try {
        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`
        );

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const data = await response.json();
        setWorkout(data?.data ?? data);
      } catch {
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [id]);

  function showToast(message: string) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  }

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 w-40 rounded bg-gray-200" />

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="aspect-[4/3] rounded-2xl bg-gray-200" />

            <div className="space-y-4">
              <div className="h-10 w-3/4 rounded bg-gray-200" />
              <div className="h-5 w-full rounded bg-gray-200" />
              <div className="h-5 w-2/3 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-bold uppercase">
          Workout Not Found
        </h1>

        <p className="mt-3 text-muted">
          The workout you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-accent px-5 py-3 font-semibold text-white"
        >
          Back to Workouts
        </Link>
      </main>
    );
  }

  const name = workout.name || workout.title || "Workout";

  const image =
    workout.image ||
    workout.imageUrl ||
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e";

  const categories = Array.isArray(workout.categories)
    ? workout.categories
    : Array.isArray(workout.category)
      ? workout.category
      : workout.category
        ? [workout.category]
        : [];

  const instructions = Array.isArray(workout.instructions)
    ? workout.instructions
    : workout.instructions
      ? [workout.instructions]
      : [];

  const isPlanned =
    hydrated && plan.includes(numericId);

  const isSaved =
    hydrated && saved.includes(numericId);

  function handleAddToPlan() {
    const result = addToPlan(numericId);

    if (result === "added") {
      showToast("Added to your plan");
    } else if (result === "exists") {
      showToast("Already in your plan");
    } else {
      showToast("Your plan can contain up to 5 workouts");
    }
  }

  function handleSave() {
    const result = addToSaved(numericId);

    if (result === "added") {
      showToast("Saved for later");
    } else {
      showToast("Already saved");
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-5 sm:py-10">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-foreground"
      >
        <ArrowLeft size={18} />
        Back to Library
      </Link>

      <section className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-2xl bg-muted/10">
          <img
            src={image}
            alt={name}
            className="h-full max-h-[600px] min-h-[320px] w-full object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold uppercase text-accent"
              >
                {category}
              </span>
            ))}
          </div>

          <h1 className="mt-4 font-display text-4xl font-black uppercase tracking-tight sm:text-5xl">
            {name}
          </h1>

          {workout.subtitle && (
            <p className="mt-3 text-lg text-muted">
              {workout.subtitle}
            </p>
          )}

          {workout.description && (
            <p className="mt-5 leading-7 text-muted">
              {workout.description}
            </p>
          )}

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border p-4">
              <p className="text-xs uppercase text-muted">
                Equipment
              </p>

              <p className="mt-1 font-semibold">
                {workout.equipment || "—"}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-xs uppercase text-muted">
                Duration
              </p>

              <p className="mt-1 font-semibold">
                {workout.duration
                  ? `${workout.duration} min`
                  : "—"}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-xs uppercase text-muted">
                Calories
              </p>

              <p className="mt-1 font-semibold">
                {workout.calories ||
                  workout.caloriesBurned ||
                  "—"}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-xs uppercase text-muted">
                Rating
              </p>

              <p className="mt-1 font-semibold">
                {workout.rating || "—"}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToPlan}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isPlanned}
            >
              {isPlanned ? (
                <Check size={19} />
              ) : (
                <Plus size={19} />
              )}

              {isPlanned ? "In My Plan" : "Add to Plan"}
            </button>

            <button
              onClick={handleSave}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-accent px-5 py-3 font-bold text-accent transition hover:bg-accent/10"
            >
              <Bookmark size={19} />

              {isSaved ? "Saved" : "Save for Later"}
            </button>
          </div>
        </div>
      </section>

      {instructions.length > 0 && (
        <section className="mt-12 max-w-4xl">
          <h2 className="font-display text-2xl font-bold uppercase">
            Instructions
          </h2>

          <ol className="mt-5 space-y-4">
            {instructions.map((instruction, index) => (
              <li
                key={index}
                className="flex gap-4 rounded-xl border p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-white">
                  {index + 1}
                </span>

                <p className="pt-1 text-muted">
                  {instruction}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}