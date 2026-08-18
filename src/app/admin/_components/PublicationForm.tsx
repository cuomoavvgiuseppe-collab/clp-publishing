'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Publication, Collana } from '@/types';
import { COL } from '@/lib/col';

type FormData = {
  slug: string;
  titolo: string;
  sottotitolo: string;
  collana: Collana;
  numero_volume: string;
  anno: string;
  numero_pagine_circa: string;
  prezzo_cartaceo: string;
  prezzo_ebook: string;
  descrizione: string;
  descrizione_estesa: string;
  link_amazon_cartaceo: string;
  link_amazon_ebook: string;
  disponibile_cartaceo: boolean;
  disponibile_ebook: boolean;
  stato: 'bozza' | 'pubblicato';
  copertina_url: string;
};

const EMPTY: FormData = {
  slug: '',
  titolo: '',
  sottotitolo: '',
  collana: 'Previdenza Sociale',
  numero_volume: '',
  anno: String(new Date().getFullYear()),
  numero_pagine_circa: '',
  prezzo_cartaceo: '',
  prezzo_ebook: '',
  descrizione: '',
  descrizione_estesa: '',
  link_amazon_cartaceo: '',
  link_amazon_ebook: '',
  disponibile_cartaceo: true,
  disponibile_ebook: true,
  stato: 'bozza',
  copertina_url: '',
};

function pubToForm(p: Publication): FormData {
  return {
    slug: p.slug,
    titolo: p.titolo,
    sottotitolo: p.sottotitolo ?? '',
    collana: p.collana,
    numero_volume: p.numero_volume ? String(p.numero_volume) : '',
    anno: String(p.anno),
    numero_pagine_circa: p.numero_pagine_circa ? String(p.numero_pagine_circa) : '',
    prezzo_cartaceo: p.prezzo_cartaceo ? String(p.prezzo_cartaceo) : '',
    prezzo_ebook: p.prezzo_ebook ? String(p.prezzo_ebook) : '',
    descrizione: p.descrizione ?? '',
    descrizione_estesa: p.descrizione_estesa ?? '',
    link_amazon_cartaceo: p.link_amazon_cartaceo ?? '',
    link_amazon_ebook: p.link_amazon_ebook ?? '',
    disponibile_cartaceo: p.disponibile_cartaceo,
    disponibile_ebook: p.disponibile_ebook,
    stato: p.stato,
    copertina_url: p.copertina_url ?? '',
  };
}

const inputStyle = {
  backgroundColor: COL.navyLight,
  border: '1px solid rgba(201,168,76,0.2)',
  color: COL.warm,
  borderRadius: '2px',
  padding: '8px 12px',
  width: '100%',
  fontSize: '14px',
  outline: 'none',
} as const;

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  marginBottom: '6px',
  color: '#B7BEC9',
} as const;

export default function PublicationForm({
  publication,
  id,
}: {
  publication?: Publication;
  id?: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(publication ? pubToForm(publication) : EMPTY);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function set(field: keyof FormData, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const payload = {
      ...form,
      anno: parseInt(form.anno, 10),
      numero_volume: form.numero_volume ? parseInt(form.numero_volume, 10) : null,
      numero_pagine_circa: form.numero_pagine_circa ? parseInt(form.numero_pagine_circa, 10) : null,
      prezzo_cartaceo: form.prezzo_cartaceo ? parseFloat(form.prezzo_cartaceo) : null,
      prezzo_ebook: form.prezzo_ebook ? parseFloat(form.prezzo_ebook) : null,
      sottotitolo: form.sottotitolo || null,
      descrizione: form.descrizione || null,
      descrizione_estesa: form.descrizione_estesa || null,
      link_amazon_cartaceo: form.link_amazon_cartaceo || null,
      link_amazon_ebook: form.link_amazon_ebook || null,
      copertina_url: form.copertina_url || null,
    };
    try {
      const url = id ? `/api/admin/publications/${id}` : '/api/admin/publications';
      const method = id ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Errore.');
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

  async function handleDelete() {
    if (!id || !confirm(`Eliminare "${form.titolo}"? Questa azione è irreversibile.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/publications/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        setError('Errore durante eliminazione.');
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle}>Titolo *</label>
          <input
            style={inputStyle}
            value={form.titolo}
            onChange={(e) => set('titolo', e.target.value)}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Slug *</label>
          <input
            style={inputStyle}
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            required
            pattern="[a-z0-9-]+"
            title="Solo lettere minuscole, numeri e trattini"
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Sottotitolo</label>
        <input
          style={inputStyle}
          value={form.sottotitolo}
          onChange={(e) => set('sottotitolo', e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-4 gap-5">
        <div>
          <label style={labelStyle}>Collana *</label>
          <select
            style={inputStyle}
            value={form.collana}
            onChange={(e) => set('collana', e.target.value as Collana)}
          >
            <option value="Previdenza Sociale">Previdenza Sociale</option>
            <option value="Diritto delle Nuove Tecnologie">Diritto delle Nuove Tecnologie</option>
            <option value="CLP Compliance Toolkit">CLP Compliance Toolkit</option>
            <option value="Diritto di Famiglia">Diritto di Famiglia</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>N° volume</label>
          <input
            type="number"
            style={inputStyle}
            value={form.numero_volume}
            onChange={(e) => set('numero_volume', e.target.value)}
            min="1"
            placeholder="es. 5"
          />
        </div>
        <div>
          <label style={labelStyle}>Anno *</label>
          <input
            type="number"
            style={inputStyle}
            value={form.anno}
            onChange={(e) => set('anno', e.target.value)}
            required
            min="2020"
            max="2040"
          />
        </div>
        <div>
          <label style={labelStyle}>Pagine circa</label>
          <input
            type="number"
            style={inputStyle}
            value={form.numero_pagine_circa}
            onChange={(e) => set('numero_pagine_circa', e.target.value)}
            min="1"
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Descrizione breve</label>
        <textarea
          style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
          value={form.descrizione}
          onChange={(e) => set('descrizione', e.target.value)}
        />
      </div>

      <div>
        <label style={labelStyle}>Descrizione estesa</label>
        <textarea
          style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
          value={form.descrizione_estesa}
          onChange={(e) => set('descrizione_estesa', e.target.value)}
        />
      </div>

      <div>
        <label style={labelStyle}>URL copertina (Supabase Storage o Amazon)</label>
        <input
          style={inputStyle}
          value={form.copertina_url}
          onChange={(e) => set('copertina_url', e.target.value)}
          type="url"
          placeholder="https://..."
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle}>Link Amazon Cartaceo</label>
          <input
            style={inputStyle}
            value={form.link_amazon_cartaceo}
            onChange={(e) => set('link_amazon_cartaceo', e.target.value)}
            type="url"
            placeholder="https://www.amazon.it/dp/ASIN?tag=clppublishing-21"
          />
        </div>
        <div>
          <label style={labelStyle}>Link Amazon eBook</label>
          <input
            style={inputStyle}
            value={form.link_amazon_ebook}
            onChange={(e) => set('link_amazon_ebook', e.target.value)}
            type="url"
            placeholder="https://www.amazon.it/dp/ASIN?tag=clppublishing-21"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle}>Prezzo Cartaceo (€)</label>
          <input
            type="number"
            style={inputStyle}
            value={form.prezzo_cartaceo}
            onChange={(e) => set('prezzo_cartaceo', e.target.value)}
            min="0"
            step="0.01"
            placeholder="es. 22.99"
          />
        </div>
        <div>
          <label style={labelStyle}>Prezzo eBook (€)</label>
          <input
            type="number"
            style={inputStyle}
            value={form.prezzo_ebook}
            onChange={(e) => set('prezzo_ebook', e.target.value)}
            min="0"
            step="0.01"
            placeholder="es. 12.99"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#B7BEC9' }}>
          <input
            type="checkbox"
            checked={form.disponibile_cartaceo}
            onChange={(e) => set('disponibile_cartaceo', e.target.checked)}
          />
          Disponibile Cartaceo
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#B7BEC9' }}>
          <input
            type="checkbox"
            checked={form.disponibile_ebook}
            onChange={(e) => set('disponibile_ebook', e.target.checked)}
          />
          Disponibile eBook
        </label>
      </div>

      <div>
        <label style={labelStyle}>Stato</label>
        <select
          style={inputStyle}
          value={form.stato}
          onChange={(e) => set('stato', e.target.value as 'bozza' | 'pubblicato')}
        >
          <option value="bozza">Bozza</option>
          <option value="pubblicato">Pubblicato</option>
        </select>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-sm text-sm font-medium disabled:opacity-60"
          style={{ backgroundColor: COL.gold, color: COL.navy }}
        >
          {loading ? 'Salvataggio…' : id ? 'Salva modifiche' : 'Crea pubblicazione'}
        </button>
        {id && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2.5 rounded-sm text-sm border transition-opacity hover:opacity-70 disabled:opacity-40"
            style={{ borderColor: '#EF4444', color: '#EF4444' }}
          >
            Elimina
          </button>
        )}
      </div>
    </form>
  );
}
