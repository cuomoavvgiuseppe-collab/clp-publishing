import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { adminGetPublications, adminCreatePublication, type PublicationInput } from '@/lib/db';

async function assertAuth() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
}

export async function GET() {
  try {
    await assertAuth();
    const pubs = await adminGetPublications();
    return NextResponse.json(pubs);
  } catch (e) {
    const msg = (e as Error).message;
    if (msg === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await assertAuth();
    const body = (await req.json()) as PublicationInput;
    const pub = await adminCreatePublication(body);
    return NextResponse.json(pub, { status: 201 });
  } catch (e) {
    const msg = (e as Error).message;
    if (msg === 'Unauthorized') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
