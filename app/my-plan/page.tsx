"use client";

import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";

export default function MyPlan() {
  const { plan, saved, removeFromPlan, removeFromSaved } = useFitLog();

  const totalMinutes = plan.reduce(
    (total, workout) => total + (workout.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + (workout.calories || 0),
    0
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-bold tracking-[0.2em] text-orange-500">
          YOUR WORKOUTS
        </p>

        <h1 className="mt-2 text-4xl font-extrabold text-gray-900">
          My Plan
        </h1>

        <p className="mt-3 text-gray-600">
          Keep track of your workouts and saved exercises.
        </p>
      </div>

      {/* Metrics */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-gray-100 p-6">
          <p className="text-sm text-gray-500">Exercises</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {plan.length}
          </p>
        </div>

        <div className="rounded-2xl bg-gray-100 p-6">
          <p className="text-sm text-gray-500">Minutes</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {totalMinutes}
          </p>
        </div>

        <div className="rounded-2xl bg-gray-100 p-6">
          <p className="text-sm text-gray-500">Calories</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {totalCalories}
          </p>
        </div>
      </div>

      {/* Today's Plan */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Today&apos;s Plan
          </h2>

          <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
            {plan.length} exercises
          </span>
        </div>

        {plan.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 px-6 py-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900">
              Your plan is empty
            </h3>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              Add workouts from the workout library to start building your
              plan.
            </p>

            <Link
              href="/#library"
              className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
            >
              Go to Workouts
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plan.map((workout) => (
              <article
                key={workout.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                {workout.image ? (
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-gray-100 text-gray-400">
                    No Image
                  </div>
                )}

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900">
                    {workout.name}
                  </h3>

                  <div className="mt-3 flex gap-4 text-sm text-gray-500">
                    <span>{workout.duration || 0} min</span>
                    <span>{workout.calories || 0} cal</span>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="flex-1 rounded-full bg-orange-500 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-orange-600"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => removeFromPlan(workout.id)}
                      className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Saved */}
      <section className="mt-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Saved for Later
          </h2>

          <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
            {saved.length} saved
          </span>
        </div>

        {saved.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 px-6 py-12 text-center">
            <h3 className="text-xl font-bold text-gray-900">
              No saved workouts
            </h3>

            <p className="mt-2 text-gray-500">
              Save workouts from the details page to see them here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {saved.map((workout) => (
              <article
                key={workout.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                {workout.image ? (
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-gray-100 text-gray-400">
                    No Image
                  </div>
                )}

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900">
                    {workout.name}
                  </h3>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="flex-1 rounded-full bg-orange-500 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-orange-600"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => removeFromSaved(workout.id)}
                      className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}