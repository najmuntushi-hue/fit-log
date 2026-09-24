import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getWorkout } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) notFound();

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: String(workout.rating) },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-5 sm:py-8">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent">
        <ArrowLeft className="h-4 w-4" />
        Back to library
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line lg:aspect-auto lg:min-h-[560px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span key={tag} className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase text-black">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {workout.description}
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-line bg-surface">
            <h2 className="border-b border-line px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Key Specs
            </h2>
            {specs.map((s) => (
              <div key={s.label} className="flex items-center justify-between border-b border-line px-4 py-3 text-sm last:border-b-0">
                <span className="text-xs uppercase tracking-wide text-muted">{s.label}</span>
                <span className="font-medium">{s.value}</span>
              </div>
            ))}
          </div>

          <h2 className="mt-8 font-display text-xl font-semibold uppercase tracking-wide">
            Instructions
          </h2>
          <ol className="mt-4 space-y-3">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-black">
                  {i + 1}
                </span>
                <span className="text-white/80">{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <WorkoutActions id={workout.id} />
          </div>
        </div>
      </div>
    </div>
  );
}