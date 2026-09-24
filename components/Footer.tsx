import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-bg">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4 text-accent" />
          <span className="font-display text-sm tracking-wide">FITLOG</span>
        </div>
        <p className="text-xs text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}