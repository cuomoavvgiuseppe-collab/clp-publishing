// REVIEW: consulenza preventiva — non ancora validato da Avv. Cuomo

import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendConsulenzaLibroNotification } from '@/lib/mailer'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body non valido' }, { status: 400 })
  }

  const { volume_slug, nome, email, domanda, stato_screening } = body

  if (!volume_slug || typeof volume_slug !== 'string' || volume_slug.length > 200) {
    return NextResponse.json({ error: 'volume_slug non valido' }, { status: 400 })
  }
  if (!nome || typeof nome !== 'string' || (nome as string).trim().length < 2 || (nome as string).trim().length > 200) {
    return NextResponse.json({ error: 'Nome non valido' }, { status: 400 })
  }
  if (!email || typeof email !== 'string' || !isValidEmail((email as string).trim()) || (email as string).length > 300) {
    return NextResponse.json({ error: 'Email non valida' }, { status: 400 })
  }
  if (!domanda || typeof domanda !== 'string' || (domanda as string).trim().length < 10 || (domanda as string).trim().length > 5000) {
    return NextResponse.json({ error: 'Domanda mancante o troppo breve' }, { status: 400 })
  }
  if (stato_screening !== 'preliminare' && stato_screening !== 'in_corso') {
    return NextResponse.json({ error: 'stato_screening non valido' }, { status: 400 })
  }

  const record = {
    volume_slug: (volume_slug as string).trim().toLowerCase(),
    nome: (nome as string).trim(),
    email: (email as string).trim().toLowerCase(),
    domanda: (domanda as string).trim(),
    stato_screening,
  }

  const supabase = createAdminClient()
  const { error: dbError } = await supabase.from('pub_consulenze').insert([record])
  if (dbError) {
    console.error('[pub_consulenze] DB insert error:', dbError.message)
    return NextResponse.json({ error: 'Errore interno. Riprova.' }, { status: 500 })
  }

  sendConsulenzaLibroNotification({
    nome: record.nome,
    email: record.email,
    volumeSlug: record.volume_slug,
    domanda: record.domanda,
    statoScreening: record.stato_screening as 'preliminare' | 'in_corso',
  }).catch(err => {
    console.error('[pub_consulenze] Email error:', err?.message)
  })

  return NextResponse.json({ ok: true, stato: stato_screening }, { status: 201 })
}
