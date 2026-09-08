import Link from 'next/link';
import { adminGetPublications } from '@/lib/db';
import { createAdminClient } from '@/lib/supabase/admin';
import { COL } from '@/lib/col';

async function getViewStats() {
  const supabase = createAdminClient();
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [totalRes, todayRes, weekRes, topRes] = await Promise.all([
    supabase.from('pub_page_views').select('*', { count: 'exact', head: true }),
    supabase.from('pub_page_views').select('*', { count: 'exact', head: true }).gte('viewed_at', todayStart),
    supabase.from('pub_page_views').select('*', { count: 'exact', head: true }).gte('viewed_at', weekStart),
    supabase.rpc('pub_top_pages', { limit_n: 10 }),
  ]);

  return {
    total: totalRes.count ?? 0,
    today: todayRes.count ?? 0,
    week: weekRes.count ?? 0,
    top_pages: (topRes.data ?? []) as { page: string; views: number }[],
  };
}

export default async function AdminDashboard() {
  const [publications, stats] = await Promise.all([
    adminGetPublications(),
    getViewStats(),
  ]);

  return (
    <div>
      {/* Visitor Stats */}
      <div className="mb-10">
        <div className="text-[11px] font-mono tracking-widest mb-4" style={{ color: COL.gold }}>
          VISITATORI
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Oggi', value: stats.today },
            { label: '7 giorni', value: stats.week },
            { label: 'Totale', value: stats.total },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-sm text-center" style={{ backgroundColor: COL.navyLight }}>
              <div className="text-2xl font-mono font-bold" style={{ color: COL.gold }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: '#6B7280' }}>{s.label}</div>
            </div>
          ))}
        </div>
        {stats.top_pages.length > 0 && (
          <div className="rounded-sm overflow-hidden" style={{ backgroundColor: COL.navyLight }}>
            <div className="px-4 py-2 text-[10px] font-mono tracking-widest" style={{ color: '#6B7280' }}>
              PAGINE PIÙ VISITATE
            </div>
            {stats.top_pages.map((p) => (
              <div key={p.page} className="flex items-center justify-between px-4 py-2 border-t" style={{ borderColor: 'rgba(201,168,76,0.08)' }}>
                <span className="text-xs font-mono truncate" style={{ color: '#B7BEC9', maxWidth: '75%' }}>{p.page}</span>
                <span className="text-xs font-mono" style={{ color: COL.gold }}>{p.views}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Publications */}
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
