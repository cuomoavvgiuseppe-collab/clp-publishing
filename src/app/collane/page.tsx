import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getPublications } from '@/lib/db';
import { COL } from '@/lib/col';

export const metadata: Metadata = {
  title: 'Le collane — CLP Cuomo Legal Publishing',
  description:
    'Le collane editoriali di CLP Cuomo Legal Publishing: Diritto del Lavoro e della Previdenza Sociale, Diritto di Famiglia, CLP Compliance Toolkit.',
};

export const revalidate = 3600;

const COLLANA_ORDER = [
  'Diritto del Lavoro e della Previdenza Sociale',
  'Cuomo Legal Platform — Collana Diritto di Famiglia',
  'Diritto di Famiglia',
  'CLP Compliance Toolkit',
  'Diritto delle Nuove Tecnologie',
  'Previdenza Sociale',
];

export default async function CollanePage() {
  const publications = await getPublications();

  const byCollana = publications.reduce<Record<string, typeof publications>>((acc, pub) => {
    if (!acc[pub.collana]) acc[pub.collana] = [];
    acc[pub.collana].push(pub);
    return acc;
  }, {});

  const collaneSorted = COLLANA_ORDER.filter((c) => byCollana[c]);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-[11px] font-mono tracking-widest mb-6" style={{ color: COL.gold }}>
            LE COLLANE
          </div>
          <h1
            className="serif text-[2.1rem] sm:text-[3rem] leading-[1.1] mb-6"
            style={{ color: COL.warm }}
          >
            Le collane editoriali
          </h1>
          <p className="text-base max-w-2xl leading-relaxed text-justify" style={{ color: '#B7BEC9' }}>
            CLP Cuomo Legal Publishing organizza la propria produzione editoriale in collane tematiche.
            Ogni collana raccoglie volumi dedicati a un'area del diritto, scritti con lo stesso metodo:
            normativa aggiornata, riferimenti pratici e linguaggio accessibile.
          </p>
        </div>
      </section>

      {/* Collane */}
      <section className="pb-24" style={{ backgroundColor: COL.paper, color: COL.ink }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-16 space-y-20">
          {collaneSorted.map((collana) => {
            const pubs = byCollana[collana];
            return (
              <div key={collana}>
                <div
                  className="pb-3 mb-8 border-b"
                  style={{ borderColor: `rgba(201,168,76,0.25)` }}
                >
                  <div className="text-[10px] font-mono tracking-widest mb-2" style={{ color: COL.gold }}>
                    COLLANA
                  </div>
                  <h2 className="serif text-xl sm:text-2xl" style={{ color: COL.ink }}>
                    {collana}
                  </h2>
                </div>
                <div className="space-y-4">
                  {pubs.map((pub) => (
                    <Link
                      key={pub.id}
                      href={`/volume/${pub.slug}`}
                      className="group flex gap-5 items-start p-4 rounded-sm transition-colors hover:bg-[#F5F0E8]"
                      style={{ border: '1px solid rgba(0,0,0,0.07)' }}
                    >
                      {pub.copertina_url ? (
                        <div
                          className="shrink-0 w-14 rounded-sm overflow-hidden"
                          style={{ aspectRatio: '2/3', border: '1px solid rgba(201,168,76,0.2)' }}
                        >
                          <Image
                            src={pub.copertina_url}
                            alt={`Copertina: ${pub.titolo}`}
                            width={56}
                            height={84}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <div
                          className="shrink-0 w-14 rounded-sm"
                          style={{
                            aspectRatio: '2/3',
                            background: `linear-gradient(160deg, ${COL.navy}, ${COL.navyLight})`,
                            border: '1px solid rgba(201,168,76,0.2)',
                          }}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="serif text-base leading-snug mb-1" style={{ color: COL.ink }}>
                          {pub.titolo}
                        </h3>
                        {pub.sottotitolo && (
                          <p className="text-xs leading-snug mb-2" style={{ color: '#6B6560' }}>
                            {pub.sottotitolo}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs font-mono" style={{ color: '#9A9488' }}>
                          <span>{pub.anno}</span>
                          {pub.numero_pagine_circa && <span>{pub.numero_pagine_circa} pag.</span>}
                          {pub.disponibile_cartaceo && pub.prezzo_cartaceo && (
                            <span>Cartaceo € {Number(pub.prezzo_cartaceo).toFixed(2)}</span>
                          )}
                          {pub.disponibile_ebook && pub.prezzo_ebook && (
                            <span>eBook € {Number(pub.prezzo_ebook).toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                      <ArrowRight
                        size={16}
                        className="shrink-0 mt-1 opacity-30 group-hover:opacity-70 transition-opacity"
                        style={{ color: COL.goldDark }}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
