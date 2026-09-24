'use client';
import Link from 'next/link';
import { Check, Clock3, Flame, Star, X } from 'lucide-react';
import { useFitLog } from '@/context/FitLogContext';


export default function PlanCard({ workout, saved = false }) {
  const { removeFromPlan, markDone, removeFromSaved, notify } = useFitLog();
  const remove = saved ? removeFromSaved : removeFromPlan;
  function handleRemove() { remove(workout.id); notify(saved ? 'Removed from saved' : "Removed from today's plan"); }
  function handleDone() { markDone(workout.id); notify('Workout marked as done'); }

  return <article className={`relative grid gap-4 rounded-xl border border-line bg-panel p-3 sm:grid-cols-[150px_1fr_auto] sm:items-center ${workout.done ? 'opacity-70' : ''}`}>
    <Link href={`/workout/${workout.id}`} className="overflow-hidden rounded-lg bg-[#101216]"><img src={workout.image} alt={workout.name} className="h-28 w-full object-cover sm:h-24" /></Link>
    <div className="min-w-0"><div className="flex flex-wrap gap-1.5">{workout.tags.slice(0, 3).map(tag => <span key={tag} className="rounded-full bg-fit px-2 py-0.5 text-[8px] font-black text-ink">{tag.toUpperCase()}</span>)}</div><Link href={`/workout/${workout.id}`} className="mt-2 block"><h3 className="display-font truncate text-lg">{workout.name.toUpperCase()}</h3></Link><p className="text-xs text-muted">{workout.equipment}</p><div className="mt-3 flex flex-wrap gap-4 text-[10px] text-muted"><span className="flex items-center gap-1"><Clock3 size={12} /> {workout.duration} min</span><span className="flex items-center gap-1"><Flame size={12} /> {workout.calories} kcal</span><span className="flex items-center gap-1"><Star size={12} /> {workout.rating}</span></div></div>
    <div className="flex flex-wrap gap-2 sm:justify-end"><Link href={`/workout/${workout.id}`} className="rounded-md border border-line px-3 py-2 text-[10px] font-black text-white hover:border-fit hover:text-fit">VIEW DETAILS</Link>{!saved && <button onClick={handleDone} disabled={workout.done} className="inline-flex items-center gap-1 rounded-md border border-line px-3 py-2 text-[10px] font-black text-white hover:border-fit hover:text-fit disabled:text-fit"><Check size={13} /> {workout.done ? 'DONE' : 'MARK AS DONE'}</button>}<button onClick={handleRemove} className="grid h-8 w-8 place-items-center rounded-md border border-line text-muted hover:border-red-400 hover:text-red-300" aria-label="Remove"><X size={15} /></button></div>
  </article>;
}
