import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const { page } = await req.json()
    if (!page || typeof page !== 'string') {
      return NextResponse.json({ error: 'page required' }, { status: 400 })
    }

    const supabase = createAdminClient()
    await supabase.from('pub_page_views').insert({ page: page.slice(0, 500) })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
