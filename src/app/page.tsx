import { ArrowRight, ChevronRight, ShieldCheck, Feather, Sparkles } from 'lucide-react';
import Link from 'next/link';
import SealBadge from '@/components/SealBadge';
import EmbossedTexture from '@/components/EmbossedTexture';
import VolumeCard from '@/components/VolumeCard';
import TrustBar from '@/components/TrustBar';
import { getPublications, getStats } from '@/lib/db';
import { COL } from '@/lib/col';

export const revalidate = 3600;

const WHY_ITEMS = [
  [
    ShieldCheck,
    'Verificato',
    'Ogni riferimento normativo controllato su fonte ufficiale prima della pubblicazione, con data di aggiornamento dichiarata.',
  ],
  [
    Feather,
    'Scritto da chi pratica',
    'Non un riassunto di legge, ma il metodo di lavoro reale di uno studio legale, spiegato passo per passo.',
  ],
  [
    Sparkles,
    'Aggiornato',
    'I volumi su materie in evoluzione normativa segnalano esplicitamente cosa verificare per gli aggiornamenti futuri.',
  ],
] as const;

export default async function HomePage() {
  const [publications, stats] = await Promise.all([getPublications(), getStats()]);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <EmbossedTexture />
        <div
          className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16 sm:pb-24">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-center">
            <div>
              <div
                className="flex items-center gap-2 text-[11px] font-mono tracking-widest mb-6"
                style={{ color: COL.gold }}
              >
                <span className="inline-block w-6 h-px" style={{ backgroundColor: COL.gold }} aria-hidden="true" />
                CUOMO LEGAL PLATFORM — COLLANA EDITORIALE
              </div>
              <h1
                className="serif text-[2.1rem] leading-[1.15] sm:text-[3.1rem] sm:leading-[1.1] max-w-2xl"
                style={{ color: COL.warm }}
              >
                Manuali giuridici scritti per essere usati, non solo letti.
              </h1>
              <p className="mt-6 text-base sm:text-lg max-w-xl leading-relaxed text-justify" style={{ color: '#B7BEC9' }}>
                Volumi pratici su previdenza, nuove tecnologie e diritto del lavoro, scritti da un avvocato
                cassazionista — disponibili in cartaceo e eBook, pubblicati e spediti da Amazon.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="#catalogo"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-medium transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: COL.gold, color: COL.navy }}
                >
                  Sfoglia i volumi <ArrowRight size={16} />
                </Link>
                <Link
                  href="/autore"
                  className="inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: COL.warm }}
                >
                  Chi è l&apos;autore <ChevronRight size={15} />
                </Link>
              </div>
              <p className="mt-8 text-xs font-mono tracking-wide" style={{ color: '#6B7280' }}>
                Avv. Giuseppe Cuomo — Patrocinante in Cassazione — Studio Legale Cuomo Giuseppe
              </p>
            </div>
            <div className="justify-self-center md:justify-self-end">
              <SealBadge />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <TrustBar stats={stats} />

      {/* PERCHÉ QUESTA COLLANA */}
      <section id="collane" className="py-20 sm:py-28" style={{ backgroundColor: COL.paper, color: COL.ink }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="serif text-2xl sm:text-4xl max-w-2xl leading-tight mb-14">
            Ogni volume nasce da casi reali, non da una sintesi di normative.
          </h2>
          <div className="grid sm:grid-cols-3 gap-10">
            {WHY_ITEMS.map(([Icon, title, desc]) => (
              <div key={title}>
                <Icon size={22} color={COL.goldDark} strokeWidth={1.5} />
                <h3 className="serif text-xl mt-3 mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-justify" style={{ color: '#57534E' }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOGO */}
      <section id="catalogo" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <h2 className="serif text-2xl sm:text-3xl" style={{ color: COL.warm }}>
              I volumi
            </h2>
          </div>
          {publications.length === 0 ? (
            <p className="text-sm" style={{ color: '#8A93A3' }}>
              Nessun volume disponibile al momento.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {publications.map((v) => (
                <VolumeCard key={v.id} v={v} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
