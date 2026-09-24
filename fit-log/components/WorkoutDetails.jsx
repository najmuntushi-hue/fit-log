import { Clock3, Flame, Star } from 'lucide-react';
import WorkoutActions from '@/components/WorkoutActions';

export default function WorkoutDetails({ workout }) {
  return (
    <section className="container-fit py-8 md:py-12">
      <div className="grid overflow-hidden rounded-xl border border-line bg-panel lg:grid-cols-[.95fr_1.05fr]">
        <div className="min-h-[400px] bg-[#101216] lg:min-h-[680px]">
          <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" />
        </div>
        <div className="p-6 sm:p-9 lg:p-12">
          <div className="mb-5 flex flex-wrap gap-2">{workout.tags.map(tag => <span key={tag} className="rounded-full bg-fit px-3 py-1 text-[10px] font-black text-ink">{tag.toUpperCase()}</span>)}</div>
          <h1 className="display-font text-4xl leading-none sm:text-5xl">{workout.name.toUpperCase()}</h1>
          <p className="mt-5 text-sm leading-6 text-muted">{workout.description}</p>

          <div className="mt-7 overflow-hidden rounded-lg border border-line">
            {[['EQUIPMENT', workout.equipment], ['DIFFICULTY', workout.difficulty], ['SETS', workout.sets], ['REPS', workout.reps], ['DURATION', `${workout.duration} min`], ['CALORIES', `${workout.calories} kcal`], ['RATING', workout.rating]].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b border-line px-4 py-3 text-xs last:border-0"><span className="font-bold text-muted">{label}</span><span className="font-bold text-white">{value}</span></div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="display-font text-xl">INSTRUCTIONS</h2>
            <ol className="mt-4 space-y-3">{workout.instructions.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-muted"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#20240f] text-[10px] font-black text-fit">{index + 1}</span><span>{step}</span></li>)}</ol>
          </div>
          <WorkoutActions workout={workout} />
        </div>
      </div>
    </section>
  );
}
