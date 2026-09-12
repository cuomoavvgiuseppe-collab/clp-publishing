import type { Metadata } from 'next'
import Link from 'next/link'
import { COL } from '@/lib/col'
import FormazioneAI from './FormazioneAI'

export const metadata: Metadata = {
  title: 'Chi sono — Avv. Giuseppe Cuomo',
  description:
    "Avvocato Cassazionista, Legal Technologist e AI Specialist. Oltre 25 anni di attività, Toga d'Onore 2001, patrocinante in Cassazione dal 2014. Fondatore della CLP Cuomo Legal Platform.",
}

const HIGHLIGHTS = [
  { anno: '1999', titolo: 'Fondazione dello Studio', testo: 'Fondazione dello Studio Legale Cuomo a Nocera Inferiore. Dal primo giorno, dedizione alla difesa dei diritti dei clienti con rigore professionale e approccio umano.' },
  { anno: '2001', titolo: "Toga d'Onore", testo: "Insignito della Toga d'Onore dal Consiglio dell'Ordine degli Avvocati di Nocera Inferiore (SA): riconoscimento dell'eccellenza professionale." },
  { anno: '2014', titolo: 'Patrocinio in Cassazione', testo: "Abilitato al Patrocinio davanti alla Corte di Cassazione e alle Magistrature Superiori dal 26 settembre 2014 — il massimo grado di rappresentanza legale riconosciuto dall'ordinamento italiano." },
  { anno: '2024–2026', titolo: 'Legal Technologist & CLP', testo: 'Oltre 34 certificazioni internazionali in Advanced Prompt Engineering, AI Security e Legal Tech. Fondazione della CLP Cuomo Legal Platform: 18 portali tematici, 50+ utility legali, 33 chatbot AI.' },
]

const SPECIALIZZAZIONI = [
  { area: 'Diritto Civile', dettaglio: 'Contratti, recupero crediti, risarcimento danni, controversie patrimoniali.' },
  { area: 'Diritto del Lavoro e Previdenza Sociale', dettaglio: 'Licenziamenti, mobbing, infortuni, previdenza, lavoro nero.' },
  { area: 'Diritto di Famiglia', dettaglio: 'Separazioni, divorzi, affidamento dei figli, assegno di mantenimento.' },
  { area: 'Responsabilità Professionale Medica', dettaglio: 'Malpractice, risarcimento danni da errore sanitario.' },
]

export default function ChiSonoPage() {
  return (
    <article>
      {/* Hero */}
      <section className="py-24 sm:py-32" style={{ background: COL.navy }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-[11px] font-mono tracking-widest mb-6" style={{ color: COL.gold }}>
            CLP CUOMO LEGAL PUBLISHING — CHI SONO
          </div>
          <h1 className="serif text-[2.2rem] sm:text-[3rem] leading-[1.1] mb-4" style={{ color: COL.warm }}>
            Avv. Giuseppe Cuomo
          </h1>
          <p className="serif text-lg mb-10" style={{ color: 'rgba(242,239,234,0.6)', fontStyle: 'italic' }}>
            Avvocato Cassazionista · Legal Technologist · AI Specialist
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', border: '1px solid rgba(201,168,76,0.2)' }}>
            {[
              { v: '25+', l: 'Anni di esperienza' },
              { v: '1.000+', l: 'Clienti assistiti' },
              { v: '34+', l: 'Certificazioni int.li' },
              { v: '2014', l: 'Cassazione' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '18px 26px', borderRight: i < 3 ? '1px solid rgba(201,168,76,0.2)' : 'none' }}>
                <p className="serif text-2xl mb-1" style={{ color: COL.gold }}>{s.v}</p>
                <p className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(242,239,234,0.45)' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Biografia */}
      <section className="py-20" style={{ background: COL.paper, borderBottom: '1px solid #E8E0D5' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-[11px] font-mono tracking-widest mb-4" style={{ color: COL.gold }}>PROFILO</div>
          <h2 className="serif text-2xl sm:text-3xl mb-8" style={{ color: COL.ink }}>Avvocato, tecnologista, autore</h2>
          <div className="flex flex-col gap-5 max-w-2xl">
            <p className="text-base leading-relaxed text-justify" style={{ color: '#57534E' }}>
              L&apos;Avvocato Giuseppe Cuomo ha conseguito la laurea in Giurisprudenza presso l&apos;Università degli Studi di Salerno. Dal 1999 si dedica alla difesa dei diritti dei propri clienti, con profonda specializzazione nel Diritto del Lavoro e della Previdenza Sociale e nel Diritto di Famiglia.
            </p>
            <p className="text-base leading-relaxed text-justify" style={{ color: '#57534E' }}>
              Nel 2001 è stato insignito della Toga d&apos;Onore. Dal 26 settembre 2014 è abilitato al Patrocinio davanti alla Corte di Cassazione e alle Magistrature Superiori — il massimo grado di rappresentanza legale riconosciuto dall&apos;ordinamento italiano.
            </p>
            <p className="text-base leading-relaxed text-justify" style={{ color: '#57534E' }}>
              Pioniere del Legal Tech, è fondatore di <strong style={{ color: COL.ink }}>CLP Cuomo Legal Publishing</strong>: collana editoriale di guide pratiche su diritto, tecnologia e professioni regolamentate.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20" style={{ background: '#fff', borderBottom: '1px solid #E8E0D5' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-[11px] font-mono tracking-widest mb-4" style={{ color: COL.gold }}>PERCORSO</div>
          <h2 className="serif text-2xl sm:text-3xl mb-10" style={{ color: COL.ink }}>Tappe principali</h2>
          {HIGHLIGHTS.map((h, i) => (
            <div key={i} style={{ display: 'flex', gap: '32px', padding: '24px 0', borderBottom: i < HIGHLIGHTS.length - 1 ? '1px solid #E8E0D5' : 'none' }}>
              <div style={{ flexShrink: 0, minWidth: '88px' }}>
                <p className="serif text-base" style={{ color: COL.goldDark }}>{h.anno}</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: COL.ink }}>{h.titolo}</p>
                <p className="text-sm leading-relaxed text-justify" style={{ color: '#57534E' }}>{h.testo}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Specializzazioni */}
      <section className="py-20" style={{ background: COL.paper, borderBottom: '1px solid #E8E0D5' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-[11px] font-mono tracking-widest mb-4" style={{ color: COL.gold }}>AREE DI PRATICA</div>
          <h2 className="serif text-2xl sm:text-3xl mb-8" style={{ color: COL.ink }}>Specializzazioni dello Studio</h2>
          <div style={{ border: '1px solid #E8E0D5' }}>
            {SPECIALIZZAZIONI.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '20px', padding: '18px 22px', borderBottom: i < SPECIALIZZAZIONI.length - 1 ? '1px solid #E8E0D5' : 'none', background: i % 2 === 0 ? '#fff' : COL.paper }}>
                <span className="serif text-sm" style={{ color: '#D4C9B5', flexShrink: 0, width: '28px' }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-xs font-semibold mb-1" style={{ color: COL.ink }}>{s.area}</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#57534E' }}>{s.dettaglio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formazione AI */}
      <FormazioneAI />

      {/* Contatti */}
      <section className="py-20" style={{ background: COL.navy }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-[11px] font-mono tracking-widest mb-4" style={{ color: COL.gold }}>RECAPITI</div>
          <h2 className="serif text-2xl sm:text-3xl mb-8" style={{ color: COL.warm }}>Studio Legale Cuomo</h2>
          <p className="text-sm mb-2" style={{ color: 'rgba(242,239,234,0.6)' }}>Via G. Matteotti, 14 — 84014 Nocera Inferiore (SA)</p>
          <p className="text-sm mb-2" style={{ color: 'rgba(242,239,234,0.6)' }}>Tel: +39 081 921 1148</p>
          <p className="text-sm mb-6" style={{ color: 'rgba(242,239,234,0.6)' }}>PEC: g.cuomo@avvocatinocera-pec.it</p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/collane" style={{ display: 'inline-block', background: COL.gold, color: COL.navy, textDecoration: 'none', padding: '12px 32px', fontWeight: 700, fontSize: '0.9rem', borderRadius: '2px' }}>
              Esplora la collana
            </Link>
            <a href="https://www.studiolegalecuomogiuseppe.it" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'transparent', color: 'rgba(242,239,234,0.65)', textDecoration: 'none', padding: '12px 32px', fontSize: '0.9rem', borderRadius: '2px', border: '1px solid rgba(201,168,76,0.25)' }}>
              Studio Legale
            </a>
          </div>
        </div>
      </section>
    </article>
  )
}
