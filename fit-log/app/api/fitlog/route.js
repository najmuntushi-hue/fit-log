import { NextResponse } from 'next/server';

const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

export async function GET() {
  try {
    const response = await fetch(API_URL, { cache: 'no-store' });
    if (!response.ok) return NextResponse.json({ error: 'Failed to fetch workouts' }, { status: response.status });
    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json({ error: 'API unavailable' }, { status: 503 });
  }
}
