// REVIEW: consulenza preventiva — non ancora validato da Avv. Cuomo

import type { Metadata } from 'next'
import Link from 'next/link'
import { getPublications } from '@/lib/db'
import { CONSULENZA_LIBRI } from '@/lib/consulenza-libri-content'
import { COL } from '@/lib/col'

export const metadata: Metadata = {
  title: 'Consulenza preventiva — CLP Cuomo Legal Publishing',
  description:
    'Parere scritto su domande preliminari AI Act, GDPR e compliance digitale. Prima che la situazione richieda una decisione urgente.',
}

export const revalidate = 3600

export default async function ConsulenzaHubPage() {
  const publications = await getPublications()
  const pubs = publications.filter(p => CONSULENZA_LIBRI[p.slug])

  return (
    <div style={{ backgroundColor: COL.paper, color: COL.ink, minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ backgroundColor: COL.navy, padding: '80px 0 64px' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COL.gold, fontWeight: 700, marginBottom: '18px' }}>
            Consulenza preventiva scritta
          </p>
          <h1 className="serif" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 500, color: COL.warm, lineHeight: 1.2, maxWidth: '20ch', marginBottom: '24px' }}>
            Prima di decidere, vale sempre la pena chiedere.
          </h1>
          <p style={{ fontSize: '1rem', color: '#A8ADBE', lineHeight: 1.75, maxWidth: '54ch', marginBottom: '36px' }}>
            Poni la tua domanda per iscritto su AI Act, GDPR o compliance digitale.
            Ricevi un preventivo entro 24 ore, poi — se lo ritieni utile — un parere
            scritto personale dell&apos;Avv. Cuomo. Nessun impegno prima del preventivo.
          </p>
          <a href="#volumi" style={{ display: 'inline-block', background: COL.gold, color: COL.navy, padding: '12px 28px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', borderRadius: '2px' }}>
            Scegli l&apos;argomento
          </a>
        </div>
      </section>

      {/* Come funziona */}
      <section style={{ padding: '60px 0', borderBottom: `1px solid rgba(0,0,0,0.08)` }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <h2 className="serif text-xl font-medium mb-8" style={{ color: COL.ink }}>Come funziona</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { n: '01', t: 'Scegli l\'argomento', d: 'Seleziona il volume più vicino alla tua domanda.' },
              { n: '02', t: 'Scrivi la domanda', d: 'Descrivi brevemente la situazione e cosa vuoi sapere.' },
              { n: '03', t: 'Ricevi il preventivo', d: 'Entro 24 ore ricevi il preventivo. Nessun impegno prima.' },
              { n: '04', t: 'Ricevi il parere', d: 'Solo dopo aver accettato, ricevi il parere scritto personale.' },
            ].map(s => (
              <div key={s.n}>
                <p className="serif" style={{ fontSize: '2.2rem', fontWeight: 500, color: 'rgba(0,0,0,0.1)', lineHeight: 1, marginBottom: '10px' }}>{s.n}</p>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: COL.ink, marginBottom: '6px' }}>{s.t}</h3>
                <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elenco volumi */}
      <section id="volumi" style={{ padding: '60px 0 80px' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: COL.gold, fontWeight: 700, marginBottom: '8px' }}>
            Seleziona il volume
          </p>
          <h2 className="serif text-xl font-medium mb-10" style={{ color: COL.ink }}>
            {pubs.length} aree di consulenza disponibili
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {pubs.map((pub, i) => (
              <Link
                key={pub.id}
                href={`/consulenza/${pub.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 0',
                  borderBottom: i < pubs.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                  textDecoration: 'none',
                  color: COL.ink,
                }}
              >
                <div>
                  <p className="serif" style={{ fontSize: '1.05rem', fontWeight: 500, marginBottom: '3px' }}>{pub.titolo}</p>
                  {pub.sottotitolo && (
                    <p style={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.4 }}>{pub.sottotitolo}</p>
                  )}
                </div>
                <span style={{ fontSize: '0.78rem', color: COL.gold, letterSpacing: '0.04em', flexShrink: 0, marginLeft: '16px' }}>
                  Invia domanda →
                </span>
              </Link>
            ))}
          </div>

          {pubs.length === 0 && (
            <p style={{ color: '#888', fontSize: '0.95rem', fontStyle: 'italic' }}>
              Le aree di consulenza sono in fase di configurazione. Torna presto.
            </p>
          )}
        </div>
      </section>

      {/* Banner autore */}
      <section style={{ background: COL.navy, padding: '52px 0' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 flex flex-wrap gap-8 items-center justify-between">
          <div>
            <p className="serif" style={{ fontSize: '1.3rem', fontWeight: 500, color: COL.warm, marginBottom: '10px' }}>
              Avv. Giuseppe Cuomo <span style={{ color: COL.gold, fontStyle: 'italic', fontWeight: 400 }}>— Cassazionista</span>
            </p>
            <p style={{ fontSize: '0.9rem', color: '#A8ADBE', lineHeight: 1.7, maxWidth: '52ch' }}>
              Iscritto all&apos;Ordine degli Avvocati di Salerno, autore della collana CLP Compliance Toolkit.
              Il parere è scritto, personale, non generato da AI.
            </p>
          </div>
          <Link href="/autore" style={{ display: 'inline-block', border: `1px solid ${COL.gold}`, color: COL.gold, padding: '11px 24px', textDecoration: 'none', fontSize: '0.87rem', fontWeight: 600, borderRadius: '2px' }}>
            Chi è l&apos;autore
          </Link>
        </div>
      </section>

    </div>
  )
}
