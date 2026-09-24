import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section className="container-fit mt-8 overflow-hidden rounded-xl border border-line bg-panel shadow-glow">
      <div className="grid min-h-[390px] items-center gap-8 px-7 py-10 md:grid-cols-[1.1fr_.9fr] md:px-12">
        <div>
          <p className="mb-5 text-xs font-black tracking-[.18em] text-fit">WORKOUT LIBRARY</p>
          <h1 className="display-font max-w-2xl text-5xl leading-[.92] text-white sm:text-6xl md:text-7xl">TRAIN WITH INTENT. <br /> LOG EVERY SET.</h1>
          <p className="mt-6 max-w-xl text-sm leading-6 text-muted sm:text-base">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
          <a href="#library" className="mt-7 inline-flex items-center gap-2 rounded-md bg-fit px-5 py-3 text-xs font-black text-ink transition hover:brightness-90">BROWSE WORKOUTS <ArrowDown size={15} strokeWidth={3} /></a>
        </div>
        <div className="relative flex min-h-[270px] items-center justify-center md:min-h-[330px]">
          <div className="absolute h-56 w-56 rounded-full bg-fit/10 blur-3xl" />
          <img src="/banner.png" alt="Workout illustration" className="relative max-h-[330px] w-full object-contain drop-shadow-2xl" />
        </div>
      </div>
    </section>
  );
}
