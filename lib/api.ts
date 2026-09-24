import type { Workout } from "@/types/workout";

const BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(BASE, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch workouts:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Workout API unavailable:", error);
    return [];
  }
}

export async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`${BASE}/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error(`Workout ${id} API unavailable:`, error);
    return null;
  }
}