import { getWorkouts } from "@/lib/api";

export default async function Home() {
  const workouts = await getWorkouts();
  return (
    <main className="p-8 font-display text-4xl text-accent">
      {workouts.length} workouts loaded
    </main>
  );
}