import { NextResponse } from 'next/server';
import clientPromise from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { url, alias } = await request.json();

    if (!url || !alias) {
      return NextResponse.json({ error: 'Missing fields' });
    }

    const db = (await clientPromise).db('urlShortener');
    const existing = await db.collection('urls').findOne({ alias });

    if (existing) {
      return NextResponse.json({ error: 'Alias already exists' });
    }

    await db.collection('urls').insertOne({ url, alias });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Server error. Please try again later.' });
  }
}


