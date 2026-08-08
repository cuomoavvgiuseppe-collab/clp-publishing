import type { Stats } from '@/types';
import { COL } from '@/lib/col';

export default function TrustBar({ stats }: { stats: Stats }) {
  return (
    <section
      style={{ backgroundColor: COL.paper, color: COL.ink, borderColor: 'rgba(0,0,0,0.06)' }}
      className="border-y"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 flex flex-wrap gap-x-10 gap-y-3 justify-center sm:justify-between text-sm">
        <div>
          <span className="font-mono font-medium">{stats.volumi_pubblicati}</span>{' '}
          {stats.volumi_pubblicati === 1 ? 'volume pubblicato' : 'volumi pubblicati'}
        </div>
        <div>
          <span className="font-mono font-medium">{stats.collane_attive}</span>{' '}
          {stats.collane_attive === 1 ? 'collana attiva' : 'collane attive'}
        </div>
        <div>
          Cartaceo e eBook su <span className="font-mono font-medium">Amazon</span>
        </div>
        <div>
          Stampa on demand —{' '}
          <span className="font-mono font-medium">nessuna scorta</span>
        </div>
      </div>
    </section>
  );
}
