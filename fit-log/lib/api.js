export const API_URL = '/api/fitlog';

export function normalizeWorkout(item) {
  return {
    ...item,
    id: String(item.id),
    tags: item.tags || item.muscleGroups || [],
    calories: item.calories ?? item.caloriesBurned ?? 0,
    duration: Number(item.duration || 0),
    rating: Number(item.rating || 0),
    sets: item.sets ?? 0,
    reps: item.reps ?? '-',
    instructions: Array.isArray(item.instructions) ? item.instructions : [],
    image: item.image || ''
  };
}

export async function getWorkouts() {
  const response = await fetch(API_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error('Failed to fetch workouts');
  const data = await response.json();
  return Array.isArray(data) ? data.map(normalizeWorkout) : [];
}

export async function getWorkout(id) {
  const response = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
  if (!response.ok) return null;
  const data = await response.json();
  return normalizeWorkout(data);
}
