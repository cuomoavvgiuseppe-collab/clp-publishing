// REVIEW: consulenza preventiva — non ancora validato da Avv. Cuomo
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtps.aruba.it',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
})

const FROM = process.env.SMTP_USER || 'info@clppromptpack.it'

export async function sendConsulenzaLibroNotification({
  nome,
  email,
  volumeSlug,
  domanda,
  statoScreening,
}: {
  nome: string
  email: string
  volumeSlug: string
  domanda: string
  statoScreening: 'preliminare' | 'in_corso'
}) {
  const adminEmail = process.env.ADMIN_EMAIL || FROM
  const label = statoScreening === 'preliminare'
    ? 'PRELIMINARE — richiede preventivo scritto'
    : 'IN CORSO — richiede incarico dedicato'
  const domandaHtml = domanda
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')

  return transporter.sendMail({
    from: `CLP Cuomo Legal Publishing Consulenza <${FROM}>`,
    to: adminEmail,
    replyTo: email,
    subject: `[Consulenza preventiva libro] ${nome} — ${volumeSlug}`,
    html: `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#FAF8F4;font-family:Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F4;padding:40px 0;"><tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="background:#0F1620;border-radius:4px;overflow:hidden;"><tr><td style="padding:28px 36px;border-bottom:3px solid #C9A84C;"><p style="margin:0;color:#C9A84C;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">CLP Publishing — Consulenza Preventiva</p><h1 style="margin:8px 0 0;color:#F2EFEA;font-size:20px;font-weight:500;">Nuova richiesta ricevuta</h1></td></tr><tr><td style="padding:28px 36px;"><p style="margin:0 0 6px;color:#C9A84C;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Richiedente</p><p style="margin:0 0 16px;color:#F2EFEA;font-size:15px;">${nome}</p><p style="margin:0 0 6px;color:#C9A84C;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Email</p><p style="margin:0 0 16px;"><a href="mailto:${email}" style="color:#C9A84C;font-size:15px;">${email}</a></p><p style="margin:0 0 6px;color:#C9A84C;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Volume</p><p style="margin:0 0 16px;color:#F2EFEA;font-size:15px;">${volumeSlug}</p><p style="margin:0 0 6px;color:#C9A84C;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Tipo screening</p><p style="margin:0 0 20px;color:${statoScreening === 'preliminare' ? '#7EBF6E' : '#E07070'};font-size:15px;font-weight:700;">${label}</p><p style="margin:0 0 6px;color:#C9A84C;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Domanda</p><p style="margin:0;color:#F2EFEA;font-size:14px;line-height:1.7;font-style:italic;border-left:3px solid #C9A84C;padding-left:14px;">${domandaHtml}</p></td></tr><tr><td style="padding:18px 36px;border-top:1px solid rgba(255,255,255,0.1);"><p style="margin:0;color:#6B7080;font-size:11px;">Rispondi a questa email per contattare direttamente ${nome}. — CLP Cuomo Legal Publishing</p></td></tr></table></td></tr></table></body></html>`,
  })
}
