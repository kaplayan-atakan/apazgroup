import { NextRequest, NextResponse } from 'next/server';

import { IletisimFormSchema, type IletisimFormInput, zodErrorToFieldErrors } from '../../../../lib/formSchemas';
import { getTransporter, resolveSmtpUser } from '../../../../lib/mail';

export const runtime = 'nodejs';

// Basic in-memory rate limiter per IP
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HITS = 10; // allow a bit more for contact form
const hits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (rec.count >= MAX_HITS) return false;
  rec.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.ip || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, errors: { _global: 'rate_limited' } }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { _global: 'invalid_json' } }, { status: 400 });
  }

  const parsed = IletisimFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: zodErrorToFieldErrors(parsed.error) }, { status: 400 });
  }

  const data: IletisimFormInput = parsed.data as IletisimFormInput;
  // Honeypot: drop but respond OK
  if (data.hp) {
    await new Promise(r => setTimeout(r, 300));
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Prepare and send emails
  try {
    const transporter = getTransporter();
  const primary = '#1F3A52';
  const accent = '#C48A65';
    const neutralBg = '#f5f5f5';
  const now = new Date();
  const timestamp = now.toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });

    // const internalRecipients = ['info@apazgroup.com','admin@apazgroup.com'];
    const internalRecipients = ['atakan.kaplayan@apazgroup.com', 'zulal.demirci@apazgroup.com'];
    const bcc = 'atakan.kaplayan@apazgroup.com';
    const subjectBase = 'İletişim Formu Mesajı';

  const internalHtml = `<!DOCTYPE html><html lang="tr"><head><meta charSet="utf-8"/><title>${subjectBase}</title></head>
    <body style="margin:0;padding:0;background:${neutralBg};font-family:Inter,Arial,sans-serif;color:#222;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding:32px 12px;">
      <table role="presentation" width="100%" style="max-width:720px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
        <tr><td style="background:${primary};padding:18px 26px"><h1 style="margin:0;font-size:18px;line-height:1.3;color:#fff;">Yeni İletişim Mesajı</h1></td></tr>
        <tr><td style="padding:26px 30px;font-size:14px;line-height:1.55;">
          <p style="margin:0 0 18px 0;">Aşağıdaki detaylar iletişim formundan gönderildi:</p>
          <table width="100%" role="presentation" style="border-collapse:collapse;font-size:13px;">
            <tbody>
              ${[
                ['Ad Soyad', data.fullName],
                ['E-posta', data.email],
                ['Telefon', data.phone || '-'],
                ['Konu', data.subject || '-'],
                ['Mesaj', data.message.replace(/</g,'&lt;').replace(/>/g,'&gt;')],
                ['Gönderim Zamanı', timestamp]
              ].map(r=>`<tr><td style="padding:6px 8px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;width:160px;">${r[0]}</td><td style="padding:6px 10px;border:1px solid #e5e7eb;white-space:pre-line">${r[1] ?? ''}</td></tr>`).join('')}
            </tbody>
          </table>
          <p style="margin:20px 0 0 0;font-size:12px;color:#555;">Bu e-posta otomatik oluşturulmuştur.</p>
        </td></tr>
        <tr><td style="background:${primary};padding:12px 22px;text-align:center;font-size:11px;color:#fff;">&copy; ${now.getFullYear()} Apaz Group – Otomatik Bildirim</td></tr>
      </table>
    </td></tr></table>
    </body></html>`;

    const userHtml = `<!DOCTYPE html><html lang="tr"><head><meta charSet="utf-8"/><title>Mesajınız Alındı</title></head>
    <body style="margin:0;padding:0;background:${neutralBg};font-family:Inter,Arial,sans-serif;color:#222;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding:32px 12px;">
      <table role="presentation" width="100%" style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
        <tr><td style="background:${primary};padding:18px 26px"><h1 style="margin:0;font-size:19px;line-height:1.3;color:#fff;">Mesajınız Bize Ulaştı</h1></td></tr>
        <tr><td style="padding:26px 30px;font-size:14px;line-height:1.55;">
          <p style="margin:0 0 16px 0;">Sayın <strong>${data.fullName}</strong>,</p>
          <p style="margin:0 0 16px 0;">İletişim formu üzerinden bize ulaştığınız için teşekkür ederiz. Mesajınız alınmıştır ve en kısa sürede size dönüş yapacağız.</p>
          <p style="margin:0 0 16px 0;">Gönderdiğiniz mesajdan kısa bir özet:</p>
          <blockquote style="margin:0 0 18px 0;padding:12px 16px;border-left:4px solid ${accent};background:#fafafa;font-size:13px;line-height:1.55;">${data.message.substring(0,280).replace(/</g,'&lt;').replace(/>/g,'&gt;')}${data.message.length>280?'…':''}</blockquote>
          <p style="margin:0 0 0 0;font-size:12px;color:#555;">Gönderim zamanı: ${timestamp}</p>
        </td></tr>
        <tr><td style="background:${primary};padding:12px 22px;text-align:center;font-size:11px;color:#fff;">Apaz Group Destek Ekibi</td></tr>
      </table>
    </td></tr></table>
    </body></html>`;

    await transporter.sendMail({
      from: resolveSmtpUser(),
      to: internalRecipients.join(','),
  subject: `${subjectBase} – ${data.fullName}`,
      html: internalHtml,
      bcc
    });
    await transporter.sendMail({
      from: resolveSmtpUser(),
      to: data.email,
      subject: 'Mesajınız Alındı – Apaz Group',
      html: userHtml,
      bcc
    });
  } catch (err) {
    console.error('iletisim mail error', err);
    return NextResponse.json({ ok: false, errors: { _global: 'email_send_failed' } }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
