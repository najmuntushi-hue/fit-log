import WorkoutCard from '@/components/WorkoutCard';

export default function WorkoutGrid({ workouts }) {
  if (!workouts.length) return <div className="rounded-xl border border-line bg-panel p-10 text-center text-sm text-muted">No workouts match your search.</div>;
  return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{workouts.map(workout => <WorkoutCard key={workout.id} workout={workout} />)}</div>;
}
