export default function PlanMetrics({ metrics }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[['Exercises', metrics.exercises], ['Minutes', metrics.minutes], ['Calories', metrics.calories]].map(([label, value]) => (
        <div key={label} className="rounded-lg border border-line bg-panel p-5"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-muted">{label}</p><p className="mt-2 text-3xl font-black text-white">{value}</p></div>
      ))}
    </div>
  );
}
