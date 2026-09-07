import { NextRequest, NextResponse } from 'next/server';

const attempts = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const now = Date.now();
  const entry = attempts.get(ip);

  if (entry && now < entry.resetAt) {
    if (entry.count >= LIMIT) {
      return NextResponse.json(
        { error: 'Troppi tentativi. Riprova tra 15 minuti.' },
        { status: 429 }
      );
    }
    entry.count++;
  } else {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  }

  const { key } = await req.json().catch(() => ({}));
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey || !key || key !== adminKey) {
    return NextResponse.json({ error: 'Chiave non valida.' }, { status: 401 });
  }

  attempts.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_session', adminKey, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/admin',
  });
  return res;
}
