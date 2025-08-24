import { NextResponse } from 'next/server';
// @ts-expect-error nodemailer types not installed in project
import nodemailer from 'nodemailer';

import { BasvuruExtendedFormSchema, zodErrorToFieldErrors } from '../../../../lib/formSchemas';

const truthySet = new Set(['on','true','1','yes','evet']);
function coerceBoolean(o: Record<string, unknown>, key: string) {
  const v = o[key];
  if (typeof v === 'string') {
    o[key] = truthySet.has(v.toLowerCase());
  }
}

export const runtime = 'node';
// Must be dynamic because we send emails & process uploads per request
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
  const data: Record<string, unknown> = {};
    let userfileBuffer: Buffer | undefined;
    let userfileName: string | undefined;
    let userfileType: string | undefined;
    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      for (const entry of form.entries()) {
        const [k, v] = entry;
        if (typeof v === 'string') {
          (data as Record<string,string>)[k] = v;
        } else if (v instanceof File) {
          // specifically capture CV file
          if (k === 'userfile' && v.size > 0) {
            const arr = await v.arrayBuffer();
            userfileBuffer = Buffer.from(arr);
            userfileName = v.name;
            userfileType = v.type;
          }
          data[`${k}Name`] = v.name;
          data[`${k}Type`] = v.type;
          data[`${k}Size`] = v.size;
        }
      }
    } else if (contentType.includes('application/json')) {
      const json = await req.json();
      if (json && typeof json === 'object') {
        Object.entries(json as Record<string,unknown>).forEach(([k,v])=>{ (data as Record<string,unknown>)[k]=v; });
      }
    } else {
      return NextResponse.json({ ok: false, errors: { _global: 'unsupported_content_type' } }, { status: 415 });
    }

    // Coerce checkbox values coming as 'on' / 'true' strings into booleans
    coerceBoolean(data, 'kisiselVerilerinKorunmasi');
    coerceBoolean(data, 'cerezPolitikasi');

    const parsed = BasvuruExtendedFormSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, errors: zodErrorToFieldErrors(parsed.error) }, { status: 400 });
    }
    const values = parsed.data;

    // Basic honeypot / spam guard
    if (values.hp) {
      return NextResponse.json({ ok: true });
    }

    // Create transporter (Office365 SMTP STARTTLS on 587)
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'admin@apazgroup.com',
        pass: process.env.SMTP_PASS || 'i+7P9vUkgJPB'
      },
      tls: { ciphers: 'TLSv1.2' }
    });

    const applicantEmail = values.common_email;
    const recipients = ['insankaynaklari@apazgroup.com', 'admin@apazgroup.com'];
    const bcc = 'atakan.kaplayan@apazgroup.com';

    // Brand palette reference
  const primary = '#1F3A52';
    const neutralBg = '#f5f5f5';

    const now = new Date();
    const timestamp = now.toLocaleString('tr-TR');

    // Applicant confirmation mail
    const applicantHtml = `<!DOCTYPE html><html lang="tr"><head><meta charSet="utf-8"/><title>Başvurunuz Alındı</title></head>
    <body style="margin:0;padding:0;background:${neutralBg};font-family:Inter,Arial,sans-serif;color:#222;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding:32px 12px;">
      <table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
        <tr><td style="background:${primary};padding:20px 28px"><h1 style="margin:0;font-size:20px;line-height:1.3;color:#fff;">Başvurunuz Alındı</h1></td></tr>
        <tr><td style="padding:28px 32px;font-size:15px;line-height:1.55;">
          <p style="margin:0 0 16px 0;">Sayın <strong>${values.common_name_surname}</strong>,</p>
          <p style="margin:0 0 16px 0;">Apaz Group'a göstermiş olduğunuz ilgi için teşekkür ederiz. Başvurunuz başarıyla alınmıştır ve insan kaynakları ekibimiz tarafından değerlendirilecektir.</p>
          <p style="margin:0 0 16px 0;">Uygun bir pozisyon eşleşmesi olduğunda sizinle iletişime geçeceğiz.</p>
          <p style="margin:24px 0 0 0;font-size:13px;color:#555;">Gönderim zamanı: ${timestamp}</p>
        </td></tr>
        <tr><td style="background:${primary};padding:14px 24px;text-align:center;font-size:12px;color:#fff;">&copy; ${now.getFullYear()} Apaz Group</td></tr>
      </table>
    </td></tr></table>
    </body></html>`;

    // Internal notification mail (detailed)
    const internalHtml = `<!DOCTYPE html><html lang="tr"><head><meta charSet="utf-8"/><title>Yeni Başvuru</title></head>
    <body style="margin:0;padding:0;background:${neutralBg};font-family:Inter,Arial,sans-serif;color:#222;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding:32px 12px;">
      <table role="presentation" width="100%" style="max-width:760px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
        <tr><td style="background:${primary};padding:20px 28px"><h1 style="margin:0;font-size:19px;line-height:1.3;color:#fff;">Yeni Başvuru</h1></td></tr>
        <tr><td style="padding:26px 30px;font-size:14px;line-height:1.55;">
          <p style="margin:0 0 18px 0;">Aşağıda adayın gönderdiği bilgiler yer alır:</p>
          <table width="100%" role="presentation" style="border-collapse:collapse;font-size:13px;">
            <tbody>
              ${[
                ['Ad Soyad', values.common_name_surname],
                ['E-posta', values.common_email],
                ['Doğum Tarihi', [values.birth_day, values.birth_month, values.birth_year].filter(Boolean).join('/') || '-'],
                ['Cinsiyet', values.common_sex],
                ['Medeni Durum', values.common_maritalStatus],
                ['Askerlik', values.common_military],
                ['Ehliyet', values.common_licence],
                ['KVK Onayı', values.kisiselVerilerinKorunmasi ? 'Evet' : 'Hayır'],
                ['Çerez Onayı', values.cerezPolitikasi ? 'Evet' : 'Hayır'],
                ['CV Dosyası', values.userfileName ? `${values.userfileName} (${values.userfileSize || ''} bytes)` : '-'],
                ['IP / Token', values.iletisim_token || '-'],
                ['Gönderim Zamanı', timestamp]
              ].map(r=>`<tr><td style="padding:6px 8px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;width:170px;">${r[0]}</td><td style="padding:6px 10px;border:1px solid #e5e7eb;">${r[1] ?? ''}</td></tr>`).join('')}
            </tbody>
          </table>
          <p style="margin:20px 0 0 0;font-size:12px;color:#555;">Bu e-posta otomatik oluşturulmuştur.</p>
        </td></tr>
        <tr><td style="background:${primary};padding:14px 24px;text-align:center;font-size:11px;color:#fff;">&copy; ${now.getFullYear()} Apaz Group – Otomatik Bildirim</td></tr>
      </table>
    </td></tr></table>
    </body></html>`;

    // Send emails sequentially (could be Promise.all)
    try {
      await transporter.sendMail({
        from: 'admin@apazgroup.com',
        to: applicantEmail,
        bcc,
        subject: 'Başvurunuz Alındı – Apaz Group',
        html: applicantHtml
      });
      await transporter.sendMail({
        from: 'admin@apazgroup.com',
        to: recipients.join(','),
        bcc,
        subject: 'Yeni İş Başvurusu – Apaz Group',
        html: internalHtml,
        attachments: userfileBuffer && userfileName ? [
          { filename: userfileName, content: userfileBuffer, contentType: userfileType || 'application/octet-stream' }
        ] : undefined
      });
    } catch (mailErr) {
      // Log stub (could integrate with monitoring)
      console.error('Mail send error', mailErr);
      return NextResponse.json({ ok: false, errors: { _global: 'email_send_failed' } }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, errors: { _global: 'server_error' } }, { status: 500 });
  }
}
