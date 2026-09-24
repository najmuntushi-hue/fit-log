export default function Loading({ text = 'Loading workouts…' }) {
  return (
    <div className="flex min-h-[260px] items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-muted">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-line border-t-fit" />
        {text}
      </div>
    </div>
  );
}
