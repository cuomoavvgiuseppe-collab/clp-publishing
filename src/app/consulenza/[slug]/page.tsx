// REVIEW: consulenza preventiva — non ancora validato da Avv. Cuomo

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPublication } from '@/lib/db'
import { createAdminClient } from '@/lib/supabase/admin'
import { CONSULENZA_LIBRI } from '@/lib/consulenza-libri-content'
import ConsulenzaForm from '@/components/ConsulenzaForm'
import { COL } from '@/lib/col'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('pub_publications')
    .select('slug')
    .eq('stato', 'pubblicato')
  return (data ?? [])
    .filter((p: { slug: string }) => !!CONSULENZA_LIBRI[p.slug])
    .map((p: { slug: string }) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const [pub, content] = [await getPublication(slug), CONSULENZA_LIBRI[slug]]
  if (!pub || !content) return { title: 'Consulenza preventiva' }
  return {
    title: `Consulenza preventiva — ${pub.titolo}`,
    description: content.headline,
  }
}

export const revalidate = 3600

export default async function ConsulenzaVolumePage({ params }: PageProps) {
  const { slug } = await params
  const [pub, content] = await Promise.all([
    getPublication(slug),
    Promise.resolve(CONSULENZA_LIBRI[slug]),
  ])

  if (!pub || !content) notFound()

  return (
    <div style={{ backgroundColor: COL.paper, color: COL.ink, minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ backgroundColor: COL.navy, padding: '72px 0 56px' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <Link href="/consulenza" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: COL.gold, textDecoration: 'none', marginBottom: '28px', opacity: 0.8 }}>
            ← Consulenza preventiva
          </Link>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COL.gold, fontWeight: 700, marginBottom: '16px' }}>
            Consulenza preventiva — {pub.collana}
          </p>
          <h1 className="serif" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', fontWeight: 500, color: COL.warm, lineHeight: 1.25, maxWidth: '24ch', marginBottom: '28px', fontStyle: 'italic' }}>
            {content.headline}
          </h1>
          <div style={{ display: 'inline-flex', alignItems: 'flex-start', gap: '10px', padding: '14px 18px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderLeft: `3px solid ${COL.gold}`, borderRadius: '2px', maxWidth: '600px' }}>
            <p style={{ fontSize: '0.87rem', color: '#A8ADBE', lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>
              Questa è una domanda tipica che riceve un parere scritto entro 24 ore.
              La tua potrebbe essere diversa — è normale. Inviala e ricevi un preventivo.
            </p>
          </div>
        </div>
      </section>

      {/* Perché prima */}
      <section style={{ padding: '60px 0', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 grid sm:grid-cols-3 gap-10">
          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COL.gold, fontWeight: 700, marginBottom: '8px' }}>Perché prima</p>
            <h2 className="serif" style={{ fontSize: '1.2rem', fontWeight: 500, color: COL.ink, lineHeight: 1.35 }}>
              Un parere preventivo cambia le opzioni disponibili.
            </h2>
          </div>
          <div className="sm:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {content.perchePrima.map((para, i) => (
              <p key={i} className="serif" style={{ fontSize: '1rem', color: COL.ink, lineHeight: 1.8 }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Esempi domande */}
      <section id="domande" style={{ padding: '60px 0', borderBottom: '1px solid rgba(0,0,0,0.08)', background: '#FFFDF8' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COL.gold, fontWeight: 700, marginBottom: '8px' }}>
            Esempi di domande
          </p>
          <h2 className="serif text-xl font-medium mb-8" style={{ color: COL.ink }}>
            Che domande puoi fare
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {content.esempiDomande.map((q, i) => (
              <div key={i} style={{ display: 'flex', gap: '18px', padding: '20px 0', borderBottom: i < content.esempiDomande.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none' }}>
                <span className="serif" style={{ fontSize: '1rem', fontWeight: 500, color: 'rgba(0,0,0,0.15)', flexShrink: 0, width: '26px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="serif" style={{ fontSize: '1rem', color: COL.ink, lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                  &ldquo;{q}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ambito e limiti */}
      <section id="ambito" style={{ padding: '60px 0', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COL.gold, fontWeight: 700, marginBottom: '8px' }}>
            Ambito e limiti
          </p>
          <h2 className="serif text-xl font-medium mb-8" style={{ color: COL.ink }}>Cosa comprende e cosa no</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Comprende */}
            <div style={{ background: '#FFFDF8', border: '1px solid rgba(0,0,0,0.08)', borderTop: '3px solid #4A7A40', padding: '24px', borderRadius: '2px' }}>
              <h3 style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A7A40', fontWeight: 700, marginBottom: '18px' }}>Comprende</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {content.ambitoSi.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#4A7A40', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    <span style={{ fontSize: '0.9rem', color: COL.ink, lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Non comprende */}
            <div style={{ background: '#FFFDF8', border: '1px solid rgba(0,0,0,0.08)', borderTop: `3px solid ${COL.navy}`, padding: '24px', borderRadius: '2px' }}>
              <h3 style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: COL.navy, fontWeight: 700, marginBottom: '18px' }}>Non comprende</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {content.ambitoNo.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: COL.navy, flexShrink: 0, marginTop: '2px', opacity: 0.5 }}>✕</span>
                    <span style={{ fontSize: '0.9rem', color: COL.ink, lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="richiedi" style={{ padding: '68px 0', background: '#F2EFEA' }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COL.gold, fontWeight: 700, marginBottom: '8px' }}>
            Invia la domanda
          </p>
          <h2 className="serif text-2xl font-medium mb-2" style={{ color: COL.ink }}>
            Richiedi il preventivo
          </h2>
          <p style={{ fontSize: '0.92rem', color: '#666', lineHeight: 1.7, marginBottom: '32px' }}>
            Nessun pagamento ora. Prima ricevi il preventivo scritto — procedi solo se lo accetti.
          </p>
          <ConsulenzaForm volumeSlug={slug} volumeTitolo={pub.titolo} />
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ padding: '40px 0', borderTop: '1px solid rgba(0,0,0,0.08)', background: '#FFFDF8' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <p style={{ fontSize: '0.8rem', color: '#888', lineHeight: 1.75, maxWidth: '70ch', fontStyle: 'italic' }}>
            {content.disclaimer}
          </p>
        </div>
      </section>

    </div>
  )
}
