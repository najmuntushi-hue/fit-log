'use client';

import { useState } from 'react';
import Loading from '@/components/Loading';
import PlanMetrics from '@/components/PlanMetrics';
import PlanTabs from '@/components/PlanTabs';
import PlanList from '@/components/PlanList';
import { useFitLog } from '@/context/FitLogContext';

export default function MyPlanPage() {
  const { plan, saved, metrics, hydrated } = useFitLog();
  const [tab, setTab] = useState('plan');
  if (!hydrated) return <Loading text="Loading workouts…" />;
  return <section className="container-fit py-10 md:py-14">
    <div className="mb-8"><p className="text-xs font-black tracking-[.18em] text-fit">YOUR LOG</p><h1 className="display-font mt-2 text-5xl">MY PLAN</h1><p className="mt-2 text-sm text-muted">Cap of five lifts for today. Finish them, then load more.</p></div>
    <PlanMetrics metrics={metrics} />
    <div className="mt-8"><PlanTabs active={tab} onChange={setTab} /></div>
    <div className="mt-5"><PlanList items={tab === 'plan' ? plan : saved} saved={tab === 'saved'} /></div>
  </section>;
}
