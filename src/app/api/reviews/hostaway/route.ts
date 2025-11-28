import { NextResponse } from 'next/server';
import data from '@/data/mockReviews.json';
import { normalizeHostaway } from '@/lib/normalize/normalizeHostaway';

export async function GET() {
  const reviews = normalizeHostaway(data.result);
  return NextResponse.json({ reviews });
}