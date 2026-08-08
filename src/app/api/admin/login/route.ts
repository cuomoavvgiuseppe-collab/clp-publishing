import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Troppi tentativi. Riprova tra 15 minuti.' },
      { status: 429 }
    );
  }

  const { email, password } = await req.json();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail || email !== adminEmail) {
    return NextResponse.json({ error: 'Credenziali non valide.' }, { status: 401 });
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ error: 'Credenziali non valide.' }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
