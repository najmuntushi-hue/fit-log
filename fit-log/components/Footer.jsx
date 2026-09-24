import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-[#08090b]">
      <div className="container-fit flex min-h-[86px] items-center justify-between gap-5 py-5 text-xs text-muted">
        
        <div className="flex items-center gap-2 font-bold text-white">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span>FITLOG</span>
        </div>

        <p className="text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}