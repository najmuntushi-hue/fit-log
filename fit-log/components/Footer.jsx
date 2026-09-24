import { Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-[#08090b]">
      <div className="container-fit flex min-h-[86px] items-center justify-between gap-5 py-5 text-xs text-muted">
        <div className="flex items-center gap-2 font-bold text-white"><Dumbbell size={16} className="text-fit" /> FITLOG</div>
        <p className="text-right">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
