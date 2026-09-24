import Link from 'next/link';

export default function NotFound() {
  return <section className="container-fit flex min-h-[65vh] items-center justify-center py-20 text-center"><div><p className="text-xs font-black tracking-[.2em] text-fit">FITLOG 404</p><h1 className="display-font mt-3 text-7xl">PAGE NOT FOUND</h1><p className="mx-auto mt-4 max-w-md text-sm text-muted">That route does not exist. Head back to the workout library and keep moving.</p><Link href="/" className="mt-7 inline-block rounded-md bg-fit px-6 py-3 text-xs font-black text-ink">BACK TO WORKOUTS</Link></div></section>;
}
