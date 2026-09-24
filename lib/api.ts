import type { Workout } from "@/types/workout";

const BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch workouts");
  return res.json();
}

export async function getWorkout(id: string): Promise<Workout | null> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) return null;
  return res.json();
}