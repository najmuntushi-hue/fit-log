import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-7xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        This lift doesn&apos;t exist. Head back to the library and pick another one.
      </p>
      <Link href="/" className="mt-6 rounded-md bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wide text-black transition hover:brightness-110">
        Go to workouts
      </Link>
    </div>
  );
}