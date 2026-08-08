'use client';
import { useEffect, useRef, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { COL } from '@/lib/col';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const h = () => setReduced(mq.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return reduced;
}

export default function SealBadge({ size = 200 }: { size?: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [light, setLight] = useState({ x: 50, y: 30 });

  function handleMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -14, y: (px - 0.5) * 14 });
    setLight({ x: px * 100, y: py * 100 });
  }
  function handleLeave() {
    setTilt({ x: 0, y: 0 });
    setLight({ x: 50, y: 30 });
  }

  const pathId = 'sealpath-pub';
  return (
    <div style={{ perspective: 900 }} className="shrink-0">
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative select-none transition-transform duration-300 ease-out"
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          animation: reduced ? 'none' : 'seal-breathe 7s ease-in-out infinite',
        }}
      >
        {/* Gold disc */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at ${light.x}% ${light.y}%, #E4C878 0%, ${COL.gold} 32%, ${COL.goldDark} 68%, #6B531D 100%)`,
            boxShadow: `0 18px 40px -12px rgba(0,0,0,0.65), inset 0 2px 3px rgba(255,255,255,0.35), inset 0 -6px 14px rgba(0,0,0,0.45)`,
          }}
        />
        {/* Inner navy circle */}
        <div
          className="absolute rounded-full"
          style={{
            inset: size * 0.13,
            background: COL.navy,
            boxShadow: `inset 0 3px 8px rgba(0,0,0,0.7), inset 0 -1px 2px rgba(201,168,76,0.25)`,
          }}
        />
        {/* Circular text */}
        <svg
          viewBox="0 0 200 200"
          width={size}
          height={size}
          className="absolute inset-0"
          style={{ transform: 'translateZ(10px)' }}
          aria-hidden="true"
        >
          <defs>
            <path id={pathId} d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0" />
          </defs>
          <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="0.75" />
          <text fill={COL.gold} fontSize="11.5" letterSpacing="3.2" fontFamily="ui-monospace, monospace">
            <textPath href={`#${pathId}`} startOffset="0%">
              · COLLANA UFFICIALE · CUOMO LEGAL PLATFORM · CLP ·
            </textPath>
          </text>
        </svg>
        {/* Icon */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: 'translateZ(18px)' }}
        >
          <BookOpen
            size={size * 0.22}
            color={COL.warm}
            strokeWidth={1.1}
            style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.6))' }}
          />
        </div>
      </div>
    </div>
  );
}
