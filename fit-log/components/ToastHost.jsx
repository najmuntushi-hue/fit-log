'use client';

import { Check } from 'lucide-react';
import { useFitLog } from '@/context/FitLogContext';

export default function ToastHost() {
  const { toast } = useFitLog();
  if (!toast) return null;
  return <div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-md border border-line bg-[#171a1f] px-4 py-3 text-xs font-bold text-white shadow-2xl"><span className="mr-2 text-fit"><Check size={14} className="inline" /></span>{toast}</div>;
}
