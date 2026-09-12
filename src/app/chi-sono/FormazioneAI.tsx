'use client'

import { useState } from 'react'
import { COL } from '@/lib/col'

type Corso = { titolo: string; istituzione: string; piattaforma: string; categoria: string }

const CORSI: Corso[] = [
  { titolo: 'Advanced Prompt Engineering for Everyone', istituzione: 'Vanderbilt University', piattaforma: 'Coursera', categoria: 'Prompt Engineering' },
  { titolo: 'Prompt Engineering for ChatGPT', istituzione: 'Vanderbilt University', piattaforma: 'Coursera', categoria: 'Prompt Engineering' },
  { titolo: 'Chat with Your Data: Generative AI-Powered SQL Data Analysis', istituzione: 'Vanderbilt University', piattaforma: 'Coursera', categoria: 'Python & Data' },
  { titolo: 'ChatGPT Advanced Data Analysis', istituzione: 'Vanderbilt University', piattaforma: 'Coursera', categoria: 'Python & Data' },
  { titolo: 'Trustworthy Generative AI', istituzione: 'Vanderbilt University', piattaforma: 'Coursera', categoria: 'AI Generativa' },
  { titolo: 'Generative AI Deep Research: Strategic AI Edge for Leaders', istituzione: 'Vanderbilt University', piattaforma: 'Coursera', categoria: 'AI Generativa' },
  { titolo: 'Claude Code: Software Engineering with Generative AI Agents', istituzione: 'Vanderbilt University', piattaforma: 'Coursera', categoria: 'Strumenti AI' },
  { titolo: 'IA generativa: nozioni di base di ingegneria dei prompt', istituzione: 'IBM', piattaforma: 'Coursera', categoria: 'Prompt Engineering' },
  { titolo: 'Sviluppo di applicazioni AI con Python e Flask', istituzione: 'IBM', piattaforma: 'Coursera', categoria: 'Python & Data' },
  { titolo: 'IA generativa: introduzione e applicazioni', istituzione: 'IBM', piattaforma: 'Coursera', categoria: 'AI Generativa' },
  { titolo: 'Impara a scrivere prompt come un professionista', istituzione: 'Coursera', piattaforma: 'Coursera', categoria: 'Prompt Engineering' },
  { titolo: 'Stay Ahead of the AI Curve', istituzione: 'Microsoft', piattaforma: 'Coursera', categoria: 'AI Generativa' },
  { titolo: 'Use AI Responsibly', istituzione: 'Microsoft', piattaforma: 'Coursera', categoria: 'AI Generativa' },
  { titolo: 'Discover the Art of Prompting', istituzione: 'Google', piattaforma: 'Coursera', categoria: 'Prompt Engineering' },
  { titolo: 'Maximize Productivity With AI Tools', istituzione: 'Google', piattaforma: 'Coursera', categoria: 'Strumenti AI' },
  { titolo: 'Claude 101', istituzione: 'Anthropic', piattaforma: 'Anthropic', categoria: 'Strumenti AI' },
  { titolo: 'Introduction to Claude Cowork', istituzione: 'Anthropic', piattaforma: 'Anthropic', categoria: 'Strumenti AI' },
  { titolo: "AI Security e Privacy: Come proteggere l'innovazione", istituzione: 'Fastweb Digital Academy', piattaforma: 'Fastweb', categoria: 'AI Security' },
  { titolo: 'Assistenti virtuali personalizzabili', istituzione: 'Fastweb Digital Academy', piattaforma: 'Fastweb', categoria: 'Strumenti AI' },
  { titolo: 'Introduzione a Microsoft Copilot', istituzione: 'Fastweb Digital Academy', piattaforma: 'Fastweb', categoria: 'Strumenti AI' },
  { titolo: 'Introduzione a Google Gemini', istituzione: 'Fastweb Digital Academy', piattaforma: 'Fastweb', categoria: 'Strumenti AI' },
  { titolo: 'Guida a Perplexity', istituzione: 'Fastweb Digital Academy', piattaforma: 'Fastweb', categoria: 'Strumenti AI' },
  { titolo: 'Google NotebookLM', istituzione: 'Fastweb Digital Academy', piattaforma: 'Fastweb', categoria: 'Strumenti AI' },
  { titolo: "Piktochart: Visual con l'AI", istituzione: 'Fastweb Digital Academy', piattaforma: 'Fastweb', categoria: 'Strumenti AI' },
  { titolo: 'Sbobinatura con AI', istituzione: 'Fastweb Digital Academy', piattaforma: 'Fastweb', categoria: 'Strumenti AI' },
  { titolo: "Introduzione al prompt engineering per l'IA generativa", istituzione: 'LinkedIn', piattaforma: 'LinkedIn Learning', categoria: 'Prompt Engineering' },
  { titolo: "Che cos'è la IA generativa", istituzione: 'LinkedIn', piattaforma: 'LinkedIn Learning', categoria: 'AI Generativa' },
  { titolo: "Elementi essenziali per una carriera nell'IA generativa", istituzione: 'Microsoft & LinkedIn', piattaforma: 'LinkedIn Learning', categoria: 'AI Generativa' },
  { titolo: "Etica nell'epoca della IA generativa", istituzione: 'LinkedIn', piattaforma: 'LinkedIn Learning', categoria: 'AI Generativa' },
  { titolo: "Introduzione all'IA e alla sostenibilità", istituzione: 'LinkedIn', piattaforma: 'LinkedIn Learning', categoria: 'AI Generativa' },
  { titolo: "IA generativa: L'evoluzione della ricerca online intelligente", istituzione: 'LinkedIn', piattaforma: 'LinkedIn Learning', categoria: 'Strumenti AI' },
  { titolo: 'Prepararsi a usare Microsoft Copilot for Security', istituzione: 'Microsoft', piattaforma: 'LinkedIn Learning', categoria: 'AI Security' },
  { titolo: 'Microsoft Copilot for Security', istituzione: 'Microsoft', piattaforma: 'LinkedIn Learning', categoria: 'AI Security' },
  { titolo: 'Sensibilizzazione alla cybersecurity: Sicurezza sul cloud', istituzione: 'LinkedIn', piattaforma: 'LinkedIn Learning', categoria: 'AI Security' },
]

const CATEGORIE = ['Tutti', 'Prompt Engineering', 'AI Generativa', 'AI Security', 'Strumenti AI', 'Python & Data'] as const

export default function FormazioneAI() {
  const [filtro, setFiltro] = useState('Tutti')
  const visibili = filtro === 'Tutti' ? CORSI : CORSI.filter(c => c.categoria === filtro)

  return (
    <section className="py-20 sm:py-24" style={{ background: COL.paper, color: COL.ink }}>
      <style>{`
        .fai-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }
        .fai-btn { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; padding: 6px 14px; border-radius: 2px; cursor: pointer; border: 1px solid #D4C9B5; background: transparent; color: #78716C; transition: all 0.15s; }
        .fai-btn:hover { border-color: ${COL.goldDark}; color: ${COL.ink}; }
        .fai-btn.fai-active { background: ${COL.goldDark}; color: #fff; border-color: ${COL.goldDark}; }
        .fai-card { background: #fff; border: 1px solid #E8E0D5; border-top: 2px solid ${COL.goldDark}; border-radius: 2px; padding: 18px 20px; display: flex; flex-direction: column; }
        @media (max-width: 480px) { .fai-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-[11px] font-mono tracking-widest mb-4" style={{ color: COL.gold }}>
          FORMAZIONE AVANZATA
        </div>
        <h2 className="serif text-2xl sm:text-3xl mb-3" style={{ color: COL.ink }}>
          Formazione AI — Badge e Attestati
        </h2>
        <p className="text-sm leading-relaxed mb-8 max-w-2xl" style={{ color: '#57534E' }}>
          {CORSI.length} attestati verificati in Prompt Engineering, AI Generativa, AI Security e Legal Tech
          — Vanderbilt University, IBM, Google, Microsoft, Anthropic, Fastweb Digital Academy e LinkedIn Learning.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {CATEGORIE.map(cat => (
            <button key={cat} className={`fai-btn${filtro === cat ? ' fai-active' : ''}`} onClick={() => setFiltro(cat)} aria-pressed={filtro === cat}>
              {cat}
            </button>
          ))}
        </div>

        <p className="text-xs mb-4" style={{ color: '#78716C', letterSpacing: '0.04em' }}>
          {visibili.length} {visibili.length === 1 ? 'corso' : 'corsi'}{filtro !== 'Tutti' ? ` · ${filtro}` : ''}
        </p>

        <div className="fai-grid">
          {visibili.map((corso, i) => (
            <div key={`${corso.titolo}-${i}`} className="fai-card">
              <span style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: COL.goldDark, background: 'rgba(156,122,46,0.08)', border: '1px solid rgba(156,122,46,0.18)', borderRadius: '2px', padding: '3px 8px', marginBottom: '12px' }}>
                {corso.categoria}
              </span>
              <p className="serif text-sm leading-snug mb-2" style={{ color: COL.ink, flexGrow: 1 }}>
                {corso.titolo}
              </p>
              <p className="text-xs font-semibold mb-0.5" style={{ color: COL.goldDark }}>{corso.istituzione}</p>
              <p className="text-xs mb-3" style={{ color: '#78716C' }}>{corso.piattaforma}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '2px', padding: '4px 9px', alignSelf: 'flex-start' }}>
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1.5 5L4 7.5L8.5 2.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#10b981' }}>Attestato verificato</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
