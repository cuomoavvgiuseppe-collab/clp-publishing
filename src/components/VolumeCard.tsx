import Link from 'next/link';
import Image from 'next/image';
import type { Publication } from '@/types';
import { COL } from '@/lib/col';

export default function VolumeCard({ v }: { v: Publication }) {
  return (
    <Link
      href={`/volume/${v.slug}`}
      className="group block p-5 rounded-sm border-l-[3px] transition-transform hover:-translate-y-0.5"
      style={{ borderLeftColor: COL.gold, backgroundColor: COL.navyLight }}
    >
      <div className="flex gap-4 items-start">
        {v.copertina_url ? (
          <div
            className="shrink-0 w-16 rounded-sm overflow-hidden"
            style={{ aspectRatio: '2/3', border: `1px solid rgba(201,168,76,0.2)` }}
          >
            <Image
              src={v.copertina_url}
              alt={`Copertina: ${v.titolo}`}
              width={64}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div
            className="shrink-0 w-16 rounded-sm"
            style={{
              aspectRatio: '2/3',
              background: `linear-gradient(160deg, ${COL.navy}, ${COL.navyLight})`,
              border: `1px solid rgba(201,168,76,0.2)`,
            }}
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-mono tracking-widest mb-2" style={{ color: COL.gold }}>
            {v.collana.toUpperCase()}
          </div>
          <h3 className="font-medium text-[15px] leading-snug" style={{ color: COL.warm }}>
            {v.titolo}
          </h3>
          {v.sottotitolo && (
            <p className="mt-1 text-xs leading-snug" style={{ color: '#8A93A3' }}>
              {v.sottotitolo}
            </p>
          )}
          <div className="mt-3 flex items-center justify-between text-xs" style={{ color: '#8A93A3' }}>
            <span className="font-mono">
              {[v.disponibile_cartaceo && 'Cartaceo', v.disponibile_ebook && 'eBook']
                .filter(Boolean)
                .join(' · ')}
            </span>
            <span className="font-mono">{v.anno}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
