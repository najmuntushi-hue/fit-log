'use client';
import { Check, Heart, Plus } from 'lucide-react';
import { useFitLog } from '@/context/FitLogContext';


export default function WorkoutActions({ workout }) {
  const { plan, saved, addToPlan, saveForLater, notify } = useFitLog();
  const isAdded = plan.some(item => String(item.id) === String(workout.id));
  const isSaved = saved.some(item => String(item.id) === String(workout.id));
  const full = plan.length >= 5 && !isAdded;

  function handlePlan() {
    if (isAdded || full) return;
    addToPlan(workout);
    notify('Added to today\'s plan');
  }
  function handleSave() {
    if (isSaved) return;
    saveForLater(workout);
    notify('Saved for later');
  }

  return (
    <div className="relative mt-8 flex flex-wrap gap-3">
      <button onClick={handlePlan} disabled={isAdded || full} className={`inline-flex items-center gap-2 rounded-md px-5 py-3 text-xs font-black transition ${isAdded ? 'bg-[#31420b] text-fit' : full ? 'bg-line text-muted' : 'bg-fit text-ink hover:brightness-90'}`}>
        {isAdded ? <Check size={15} /> : <Plus size={15} />}{isAdded ? 'ADDED TO PLAN' : full ? 'PLAN IS FULL' : "ADD TO TODAY'S PLAN"}
      </button>
      <button onClick={handleSave} disabled={isSaved} className={`inline-flex items-center gap-2 rounded-md border px-5 py-3 text-xs font-black transition ${isSaved ? 'border-[#31420b] bg-[#151c0b] text-fit' : 'border-line bg-transparent text-white hover:border-fit hover:text-fit'}`}>
        <Heart size={15} />{isSaved ? 'SAVED' : 'SAVE FOR LATER'}
      </button>
    </div>
  );
}
