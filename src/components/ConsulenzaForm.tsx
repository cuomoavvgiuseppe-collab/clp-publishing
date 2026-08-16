'use client'

// REVIEW: consulenza preventiva — non ancora validato da Avv. Cuomo

import { useState, FormEvent } from 'react'

interface ConsulenzaFormProps {
  volumeSlug: string
  volumeTitolo: string
}

type Screening = 'preliminare' | 'in_corso' | ''

export default function ConsulenzaForm({ volumeSlug, volumeTitolo }: ConsulenzaFormProps) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [domanda, setDomanda] = useState('')
  const [screening, setScreening] = useState<Screening>('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!screening) {
      setErrorMsg('Seleziona il tipo di domanda prima di inviare.')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/consulenza', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          volume_slug: volumeSlug,
          nome: nome.trim(),
          email: email.trim().toLowerCase(),
          domanda: domanda.trim(),
          stato_screening: screening,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as Record<string,string>)?.error ?? 'Errore di rete')
      }
      setStatus('ok')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Si è verificato un errore. Riprova.')
    }
  }

  if (status === 'ok') {
    return (
      <div style={{
        background: '#FAF8F4',
        border: '1px solid rgba(201,168,76,0.3)',
        borderLeft: '3px solid #C9A84C',
        padding: '32px',
        borderRadius: '2px',
      }}>
        <h3 className="serif text-xl font-medium mb-3" style={{ color: '#0F1620' }}>
          {screening === 'preliminare'
            ? 'Domanda ricevuta. Riceverai un preventivo scritto entro 24 ore.'
            : 'Messaggio ricevuto. Sarete ricontattati per un incarico dedicato.'}
        </h3>
        <p style={{ color: '#555', lineHeight: 1.7, fontSize: '0.95rem' }}>
          {screening === 'preliminare'
            ? 'L\'Avv. Cuomo esaminerà la tua domanda e ti invierà un preventivo scritto all\'indirizzo indicato. Nessun impegno prima di averlo accettato.'
            : 'La tua situazione richiede un incarico professionale dedicato. L\'Avv. Cuomo ti contatterà per valutare insieme come procedere.'}
        </p>
      </div>
    )
  }

  const inputCls = "w-full px-4 py-3 border text-sm outline-none transition-colors"
  const inputStyle = { borderColor: 'rgba(201,168,76,0.3)', background: '#FFFDF8', color: '#1A1A1A', borderRadius: '2px' }
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginBottom: '8px' }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

      {/* Screening */}
      <div>
        <label style={labelStyle} htmlFor="screening">Tipo di domanda *</label>
        <select
          id="screening"
          value={screening}
          onChange={e => setScreening(e.target.value as Screening)}
          required
          className={inputCls}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="">— Seleziona —</option>
          <option value="preliminare">Ho una domanda preliminare (situazione non ancora critica, voglio capire i miei obblighi)</option>
          <option value="in_corso">Ho una situazione già in corso (ispezione, reclamo, procedimento, urgenza)</option>
        </select>

        {screening === 'in_corso' && (
          <div style={{ marginTop: '10px', padding: '14px 16px', background: '#FFF8F0', border: '1px solid #E8CDA0', borderRadius: '2px', fontSize: '0.87rem', color: '#7A4F1A', lineHeight: 1.6 }}>
            <strong>Nota:</strong> La tua situazione richiede un incarico professionale dedicato con preventivo separato.
            Puoi comunque inviare il messaggio e l&apos;Avv. Cuomo ti contatterà per valutare come procedere.
          </div>
        )}
        {screening === 'preliminare' && (
          <div style={{ marginTop: '10px', padding: '14px 16px', background: '#F2F8F0', border: '1px solid #B8D4B0', borderRadius: '2px', fontSize: '0.87rem', color: '#3A5A30', lineHeight: 1.6 }}>
            Rientra nella consulenza preventiva. Riceverai un preventivo scritto entro 24 ore.
          </div>
        )}
      </div>

      {/* Nome */}
      <div>
        <label style={labelStyle} htmlFor="nome">Nome e cognome *</label>
        <input id="nome" type="text" value={nome} onChange={e => setNome(e.target.value)}
          required placeholder="Mario Rossi" className={inputCls} style={inputStyle} autoComplete="name" />
      </div>

      {/* Email */}
      <div>
        <label style={labelStyle} htmlFor="email">Indirizzo e-mail *</label>
        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
          required placeholder="mario.rossi@esempio.it" className={inputCls} style={inputStyle} autoComplete="email" />
      </div>

      {/* Domanda */}
      <div>
        <label style={labelStyle} htmlFor="domanda">La tua domanda *</label>
        <p style={{ fontSize: '0.83rem', color: '#888', marginBottom: '8px', lineHeight: 1.6, fontStyle: 'italic' }}>
          Descrivi brevemente la situazione e la domanda specifica. Non allegare documenti in questa fase.
        </p>
        <textarea id="domanda" value={domanda} onChange={e => setDomanda(e.target.value)}
          required rows={5}
          placeholder="Sto cercando di capire se… / Dobbiamo adeguarci prima di… / Ho ricevuto…"
          className={inputCls}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }} />
      </div>

      <p style={{ fontSize: '0.77rem', color: '#999' }}>
        Volume di riferimento: <strong style={{ color: '#555' }}>{volumeTitolo}</strong>
      </p>

      {errorMsg && (
        <p style={{ fontSize: '0.87rem', color: '#B53030', lineHeight: 1.6 }}>{errorMsg}</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            background: status === 'loading' ? '#888' : '#C9A84C',
            color: '#0F1620',
            border: 'none',
            padding: '13px 30px',
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '0.02em',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            borderRadius: '2px',
          }}
        >
          {status === 'loading' ? 'Invio in corso…' : 'Invia la domanda'}
        </button>
        <p style={{ fontSize: '0.78rem', color: '#999', fontStyle: 'italic', margin: 0 }}>
          Nessun pagamento richiesto ora — ricevi prima il preventivo.
        </p>
      </div>
    </form>
  )
}
