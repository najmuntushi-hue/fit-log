'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFitLog } from '@/context/FitLogContext';

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  const active =
    pathname === '/'
      ? 'workouts'
      : pathname.startsWith('/my-plan')
      ? 'plan'
      : '';

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur">
      <nav className="container-fit flex min-h-[64px] items-center justify-between gap-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-black tracking-tight"
        >
          <span className="text-lg">FITLOG</span>
        </Link>

        <div className="flex items-center gap-1 rounded-full bg-transparent p-1 text-sm">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 transition ${
              active === 'workouts'
                ? 'bg-[#1d2a0a] text-fit'
                : 'text-muted hover:text-white'
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 transition ${
              active === 'plan'
                ? 'bg-[#1d2a0a] text-fit'
                : 'text-muted hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-white hover:text-fit"
          >
            <span>Plan</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-fit px-1 text-[10px] text-ink">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-muted hover:text-white"
          >
            <span>Saved</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full border border-line px-1 text-[10px]">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
          }