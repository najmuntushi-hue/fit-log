import Link from 'next/link';
import { Clock3, Flame, Star } from 'lucide-react';

export default function WorkoutCard({ workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="group block">
      <article className="card-hover overflow-hidden rounded-xl border border-line bg-panel">
        <div className="aspect-[1.8/1] overflow-hidden bg-[#1a1c21]">
          {workout.image ? <img src={workout.image} alt={workout.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="grid h-full place-items-center text-muted">No image</div>}
        </div>
        <div className="p-4">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {workout.tags.slice(0, 3).map(tag => <span key={tag} className="rounded-full bg-fit px-2.5 py-1 text-[9px] font-black text-ink">{tag.toUpperCase()}</span>)}
          </div>
          <h3 className="display-font text-base tracking-wide text-white">{workout.name.toUpperCase()}</h3>
          <p className="mt-1 truncate text-xs text-muted">{workout.equipment}</p>
          <div className="mt-4 grid grid-cols-3 gap-2 border border-line bg-transparent px-2 py-2 text-[10px] text-muted">
            <span className="flex items-center gap-1"><Clock3 size={12} /> {workout.duration} min</span>
            <span className="flex items-center gap-1"><Flame size={12} /> {workout.calories} kcal</span>
            <span className="flex items-center gap-1"><Star size={12} /> {workout.rating}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
