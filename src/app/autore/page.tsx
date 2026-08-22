import type { Metadata } from 'next';
import { COL } from '@/lib/col';
import { ShieldCheck, BookOpen, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: "L'autore",
  description:
    'Avv. Giuseppe Cuomo — Patrocinante in Cassazione, Studio Legale Cuomo Giuseppe, Nocera Inferiore (SA).',
};

const HIGHLIGHTS = [
  [
    Scale,
    'Patrocinante in Cassazione',
    'Abilitato al patrocinio davanti alla Corte di Cassazione e alle Magistrature Superiori.',
  ],
  [
    BookOpen,
    'Autore della collana CLP',
    'Fondatore di Cuomo Legal Platform che racchiude CLP Cuomo Legal Publishing, CLP Prompt Pack Store, CLP Cuomo Legal Consulenza Preventiva e CAP Cuomo Application Platform.',
  ],
  [
    ShieldCheck,
    'Specializzazione',
    'Previdenza sociale, diritto del lavoro, nuove tecnologie e AI Act. Consulenza a privati, professionisti e imprese.',
  ],
] as const;

export default function AutorePage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-[11px] font-mono tracking-widest mb-6" style={{ color: COL.gold }}>
            L&apos;AUTORE
          </div>
          <h1
            className="serif text-[2.1rem] sm:text-[3rem] leading-[1.1] mb-8"
            style={{ color: COL.warm }}
          >
            Avv. Giuseppe Cuomo
          </h1>
          <p className="text-base sm:text-lg max-w-2xl leading-relaxed text-justify" style={{ color: '#B7BEC9' }}>
            Avvocato patrocinante in Cassazione, con studio a Nocera Inferiore (SA). Fondatore di{' '}
            <span style={{ color: COL.warm }}>Cuomo Legal Platform</span> che racchiude{' '}
            <span style={{ color: COL.warm }}>CLP Cuomo Legal Publishing</span>,{' '}
            <span style={{ color: COL.warm }}>CLP Prompt Pack Store</span>,{' '}
            <span style={{ color: COL.warm }}>CLP Cuomo Legal Consulenza Preventiva</span> e{' '}
            <span style={{ color: COL.warm }}>CAP Cuomo Application Platform</span>.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 sm:py-28" style={{ backgroundColor: COL.paper, color: COL.ink }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-3 gap-10">
            {HIGHLIGHTS.map(([Icon, title, desc]) => (
              <div key={title}>
                <Icon size={22} color={COL.goldDark} strokeWidth={1.5} />
                <h2 className="serif text-lg mt-3 mb-2">{title}</h2>
                <p className="text-sm leading-relaxed text-justify" style={{ color: '#57534E' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio link */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <p className="text-sm" style={{ color: '#6B7280' }}>
            Studio Legale Cuomo Giuseppe · Nocera Inferiore (SA) ·{' '}
            <a
              href="https://www.studiolegalecuomogiuseppe.it"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              style={{ color: COL.gold }}
            >
              studiolegalecuomogiuseppe.it
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
