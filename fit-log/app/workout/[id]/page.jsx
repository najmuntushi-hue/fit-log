'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading';
import WorkoutDetails from '@/components/WorkoutDetails';
import { getWorkout } from '@/lib/api';

export default function WorkoutPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { if (id) getWorkout(id).then(setWorkout).catch(() => setWorkout(null)).finally(() => setLoading(false)); }, [id]);
  if (loading) return <Loading text="Loading workout…" />;
  if (!workout) return <div className="container-fit py-20 text-center"><h1 className="display-font text-4xl">WORKOUT NOT FOUND</h1><p className="mt-3 text-sm text-muted">This workout does not exist.</p><a href="/" className="mt-6 inline-block rounded-md bg-fit px-5 py-3 text-xs font-black text-ink">BACK TO WORKOUTS</a></div>;
  return <WorkoutDetails workout={workout} />;
}
