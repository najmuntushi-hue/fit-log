'use client';
import PlanCard from '@/components/PlanCard';

export default function PlanList({ items, saved }) {
  if (!items.length) return <div className="rounded-xl border border-line bg-panel px-6 py-14 text-center"><h3 className="display-font text-2xl">NOTHING HERE YET</h3><p className="mx-auto mt-2 max-w-md text-sm text-muted">{saved ? 'Save workouts from the library and they will appear here.' : 'Browse the library and add a lift to get today moving.'}</p><a href="/" className="mt-6 inline-block rounded-md bg-fit px-5 py-3 text-xs font-black text-ink">GO TO WORKOUTS</a></div>;
  return <div className="space-y-3">{items.map(item => <PlanCard key={item.id} workout={item} saved={saved} />)}</div>;
}
