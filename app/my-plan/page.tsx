import { getWorkouts } from "@/lib/api";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";

export default async function Home() {
  const workouts = await getWorkouts();
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-5 sm:py-8">
      <Hero />

      <section id="library" className="scroll-mt-24 pt-16">
        <h2 className="font-display text-3xl font-bold uppercase">
          The Library
        </h2>
        <p className="mt-1 text-sm text-muted">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      </section>
    </div>
  );
}