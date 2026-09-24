'use client';
import { ChevronDown } from 'lucide-react';

export default function SortDropdown({ value, onChange }) {
  return (
    <label className="relative flex items-center gap-2 text-xs font-bold text-muted">
      <span>Sort By</span>
      <span className="relative">
        <select value={value} onChange={e => onChange(e.target.value)} className="appearance-none rounded-md border border-line bg-panel py-2 pl-3 pr-8 text-xs font-semibold text-white outline-none focus:border-fit">
          <option value="duration">Duration</option>
          <option value="calories">Calories</option>
          <option value="rating">Rating</option>
        </select>
        <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted" />
      </span>
    </label>
  );
}
