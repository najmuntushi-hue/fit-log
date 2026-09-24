export default function PlanTabs({ active, onChange }) {
  return (
    <div className="flex gap-1 rounded-full bg-panel p-1 w-fit">
      {['plan', 'saved'].map(tab => <button key={tab} onClick={() => onChange(tab)} className={`rounded-full px-4 py-2 text-xs font-black transition ${active === tab ? 'bg-fit text-ink' : 'text-muted hover:text-white'}`}>{tab === 'plan' ? "TODAY'S PLAN" : 'SAVED'}</button>)}
    </div>
  );
}
