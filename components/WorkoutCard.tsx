import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="group block overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:border-accent/50">
      <div className="relative aspect-[2/1] w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span key={tag} className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase text-black">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-wide">
          {workout.name}
        </h3>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>

        <div className="mt-4 flex items-center justify-between rounded-md border border-line px-3 py-2 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}