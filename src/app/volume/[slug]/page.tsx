import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { getPublication } from '@/lib/db';
import { createAdminClient } from '@/lib/supabase/admin';
import { COL } from '@/lib/col';

export const revalidate = 3600;

// generateStaticParams runs at build time without an HTTP request,
// so we use the admin client directly (no cookies needed)
export async function generateStaticParams() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('pub_publications')
    .select('slug')
    .eq('stato', 'pubblicato');
  return (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pub = await getPublication(slug);
  if (!pub) return { title: 'Volume non trovato' };
  return {
    title: pub.titolo,
    description: pub.descrizione ?? undefined,
    openGraph: {
      title: pub.titolo,
      description: pub.descrizione ?? undefined,
      images: pub.copertina_url ? [{ url: pub.copertina_url }] : [],
    },
  };
}

export default async function VolumePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = await getPublication(slug);
  if (!pub) notFound();

  return (
    <div style={{ backgroundColor: COL.paper, color: COL.ink, minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12 sm:py-20">
        {/* Back */}
        <Link
          href="/#catalogo"
          className="inline-flex items-center gap-1.5 text-sm mb-10 transition-opacity hover:opacity-70"
          style={{ color: '#9A9488' }}
        >
          <ArrowLeft size={15} /> Tutti i volumi
        </Link>

        <div className="grid sm:grid-cols-[200px_1fr] gap-8 items-start">
          {/* Cover */}
          {pub.copertina_url ? (
            <div
              className="w-[200px] rounded-sm overflow-hidden shrink-0"
              style={{ aspectRatio: '2/3', border: `1px solid rgba(201,168,76,0.3)` }}
            >
              <Image
                src={pub.copertina_url}
                alt={`Copertina: ${pub.titolo}`}
                width={200}
                height={300}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          ) : (
            <div
              className="w-[200px] rounded-sm shrink-0"
              style={{
                aspectRatio: '2/3',
                background: `linear-gradient(160deg, ${COL.navy}, ${COL.navyLight})`,
                border: `1px solid rgba(201,168,76,0.3)`,
              }}
            />
          )}

          <div>
            <div className="text-xs font-mono tracking-widest mb-3" style={{ color: '#9A9488' }}>
              {pub.collana.toUpperCase()}
            </div>
            <h1 className="serif text-2xl sm:text-3xl mb-2 leading-tight">{pub.titolo}</h1>
            {pub.sottotitolo && (
              <p className="text-base mb-4 leading-snug" style={{ color: '#57534E' }}>
                {pub.sottotitolo}
              </p>
            )}
            <p className="text-sm mb-6" style={{ color: '#9A9488' }}>
              {[pub.anno, pub.numero_pagine_circa ? `${pub.numero_pagine_circa} pagine circa` : null]
                .filter(Boolean)
                .join(' · ')}
            </p>

            {pub.descrizione && (
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: '#3A3632' }}>
                {pub.descrizione}
              </p>
            )}
            {pub.descrizione_estesa && (
              <p className="text-[14px] leading-relaxed mb-6" style={{ color: '#57534E' }}>
                {pub.descrizione_estesa}
              </p>
            )}

            {/* Amazon buttons */}
            <div className="flex flex-wrap gap-3">
              {pub.disponibile_cartaceo && pub.link_amazon_cartaceo && (
                <a
                  href={pub.link_amazon_cartaceo}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ backgroundColor: COL.ink, color: COL.warm }}
                >
                  Acquista Cartaceo su Amazon <ExternalLink size={14} />
                </a>
              )}
              {pub.disponibile_ebook && pub.link_amazon_ebook && (
                <a
                  href={pub.link_amazon_ebook}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium border transition-opacity hover:opacity-80"
                  style={{ borderColor: COL.ink, color: COL.ink }}
                >
                  Acquista eBook su Amazon <ExternalLink size={14} />
                </a>
              )}
            </div>

            <p className="mt-5 text-xs leading-relaxed" style={{ color: '#9A9488' }}>
              I link portano direttamente su Amazon. Acquisto, spedizione e reso sono gestiti interamente da Amazon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
