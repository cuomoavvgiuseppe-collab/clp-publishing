'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { COL } from '@/lib/col';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Errore sconosciuto.');
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Errore di rete.');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    backgroundColor: COL.navyLight,
    border: '1px solid rgba(201,168,76,0.2)',
    color: COL.warm,
    borderRadius: '2px',
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    outline: 'none',
  };

  return (
    <div
      style={{ backgroundColor: COL.navy, minHeight: '100vh' }}
      className="flex items-center justify-center px-5"
    >
      <div className="w-full max-w-sm">
        <div className="text-[11px] font-mono tracking-widest mb-6" style={{ color: COL.gold }}>
          CLP PUBLISHING — ACCESSO ADMIN
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs mb-1.5" style={{ color: '#B7BEC9' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block text-xs mb-1.5" style={{ color: '#B7BEC9' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={inputStyle}
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-sm text-sm font-medium transition-opacity disabled:opacity-60"
            style={{ backgroundColor: COL.gold, color: COL.navy }}
          >
            {loading ? 'Accesso…' : 'Accedi'}
          </button>
        </form>
      </div>
    </div>
  );
}
