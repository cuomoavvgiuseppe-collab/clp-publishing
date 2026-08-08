import { COL } from '@/lib/col';

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: '#0A0D12', borderColor: 'rgba(201,168,76,0.1)' }}
      className="py-10 border-t"
    >
      <div
        className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-between gap-4 text-xs"
        style={{ color: '#6B7280' }}
      >
        <span className="serif text-sm" style={{ color: COL.warm }}>
          CLP Publishing — Cuomo Legal Platform
        </span>
        <span>Studio Legale Cuomo Giuseppe · Nocera Inferiore (SA)</span>
      </div>
    </footer>
  );
}
