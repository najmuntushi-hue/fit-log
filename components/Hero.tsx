import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="grid items-center gap-8 rounded-2xl border border-line bg-surface px-6 py-10 sm:px-10 md:grid-cols-2 md:py-16 lg:px-16">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-accent">
          WORKOUT LIBRARY
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
          Train with intent. Log every set.
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <Link href="#library" className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wide text-black transition hover:brightness-110">
          Browse Workouts
          <ArrowDown className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative mx-auto aspect-square w-full max-w-sm md:max-w-none">
        <Image
          src="/banner.png"
          alt="Gym machine illustration"
          fill
          priority
          sizes="(min-width: 768px) 50vw, 90vw"
          className="object-contain"
        />
      </div>
    </section>
  );
}