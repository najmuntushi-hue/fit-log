"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const workoutActive =
    pathname === "/" || pathname.startsWith("/workout");

  const planActive = pathname.startsWith("/my-plan");

  const linkBase =
    "rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm";

  const active = "bg-accent/15 text-accent";
  const idle = "text-white/70 hover:text-white";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:px-5">

        {/* Left: Logo */}
        <Link
          href="/"
          className="font-display text-lg tracking-wide sm:text-xl"
        >
          FITLOG
        </Link>

        {/* Middle: Navigation */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={`${linkBase} ${workoutActive ? active : idle}`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`${linkBase} ${planActive ? active : idle}`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Plan & Saved Counters */}
        <div className="flex items-center justify-self-end gap-1 text-xs sm:gap-3 sm:text-sm">

          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors hover:bg-white/5 sm:px-2.5"
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-black">
              {plan.length}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full px-2 py-1 transition-colors hover:bg-white/5 sm:px-2.5"
          >
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/40 px-1.5 text-xs font-bold text-white">
              {saved.length}
            </span>
          </Link>

        </div>
      </div>
    </header>
  );
}