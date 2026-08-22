'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { COL } from '@/lib/col';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.shiftKey && e.ctrlKey && e.key === 'P') {
        e.preventDefault();
        router.push('/admin');
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [router]);

  return (
    <header
      className={`sticky top-0 z-30 transition-colors ${scrolled ? 'backdrop-blur border-b' : ''}`}
      style={{
        backgroundColor: scrolled ? 'rgba(15,22,32,0.92)' : 'transparent',
        borderColor: 'rgba(201,168,76,0.15)',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="serif text-lg tracking-tight" style={{ color: COL.warm }}>CLP</span>
          <span className="text-[11px] font-mono tracking-widest" style={{ color: COL.gold }}>CUOMO LEGAL PUBLISHING</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: '#B7BEC9' }}>
          <Link href="/#catalogo" className="hover:text-white transition-colors">Volumi</Link>
          <Link href="/collane" className="hover:text-white transition-colors">Collane</Link>
          <Link href="/autore" className="hover:text-white transition-colors">L&apos;autore</Link>
          {/* REVIEW: consulenza preventiva — non ancora validato da Avv. Cuomo */}
          <Link href="/consulenza" className="hover:text-white transition-colors" style={{ color: COL.gold, opacity: 0.85 }}>Consulenza preventiva</Link>
        </nav>
        <Link
          href="/#catalogo"
          className="text-sm px-4 py-2 rounded-sm font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: COL.gold, color: COL.navy }}
        >
          Sfoglia i volumi
        </Link>
      </div>
    </header>
  );
}
