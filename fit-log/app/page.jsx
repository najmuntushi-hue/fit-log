'use client';

import { Search } from 'lucide-react';
import Hero from '@/components/Hero';
import Loading from '@/components/Loading';
import SortDropdown from '@/components/SortDropdown';
import WorkoutGrid from '@/components/WorkoutGrid';
import { useEffect, useMemo, useState } from 'react';
import { getWorkouts } from '@/lib/api';

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sort, setSort] = useState('duration');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getWorkouts().then(setWorkouts).catch(() => setError('Could not load workouts. Please refresh and try again.')).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = workouts.filter(item => !q || item.name.toLowerCase().includes(q) || item.tags.some(tag => tag.toLowerCase().includes(q)));
    return [...list].sort((a, b) => Number(b[sort === 'calories' ? 'calories' : sort]) - Number(a[sort === 'calories' ? 'calories' : sort]));
  }, [workouts, sort, query]);

  return (
    <>
      <Hero />
      <section id="library" className="container-fit py-14">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><h2 className="display-font text-3xl sm:text-4xl">THE LIBRARY</h2><p className="mt-1 text-xs text-muted">Twelve lifts covering every major muscle group.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-2 text-muted"><Search size={15} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search workouts..." className="w-full bg-transparent text-xs text-white outline-none placeholder:text-muted sm:w-44" /></label>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>
        {loading ? <Loading /> : error ? <div className="rounded-xl border border-line bg-panel p-8 text-center text-sm text-red-300">{error}</div> : <WorkoutGrid workouts={filtered} />}
      </section>
    </>
  );
}
