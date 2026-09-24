import { NextResponse } from 'next/server';

const API_URL = 'https://api.abcz.workers.dev/api/fitlog';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const response = await fetch(`${API_URL}/${id}`, { cache: 'no-store' });
    if (!response.ok) return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json({ error: 'API unavailable' }, { status: 503 });
  }
}
