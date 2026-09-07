import Link from 'next/link';
import { adminGetPublications } from '@/lib/db';
import { COL } from '@/lib/col';

export default async function AdminDashboard() {
  const publications = await adminGetPublications();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="serif text-xl" style={{ color: COL.warm }}>
          Pubblicazioni
        </h1>
        <Link
          href="/admin/volume/new"
          className="text-sm px-4 py-2 rounded-sm font-medium"
          style={{ backgroundColor: COL.gold, color: COL.navy }}
        >
          + Nuovo volume
        </Link>
      </div>

      {publications.length === 0 ? (
        <p className="text-sm" style={{ color: '#6B7280' }}>
          Nessuna pubblicazione.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {publications.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-4 rounded-sm"
              style={{ backgroundColor: COL.navyLight }}
            >
              <div>
                <div
                  className="text-[10px] font-mono tracking-widest mb-1"
                  style={{ color: p.stato === 'pubblicato' ? '#4ADE80' : '#6B7280' }}
                >
                  {p.stato.toUpperCase()} · {p.collana}
                </div>
                <p className="text-sm font-medium" style={{ color: COL.warm }}>
                  {p.titolo}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
                  /volume/{p.slug}
                </p>
              </div>
              <Link
                href={`/admin/volume/${p.id}/edit`}
                className="text-xs px-3 py-1.5 rounded-sm border transition-opacity hover:opacity-70 shrink-0"
                style={{ borderColor: 'rgba(201,168,76,0.3)', color: '#B7BEC9' }}
              >
                Modifica
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
