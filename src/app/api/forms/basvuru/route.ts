import { NextRequest, NextResponse } from 'next/server';

import { BasvuruFormSchema, zodErrorToFieldErrors, type BasvuruFormInput } from '../../../../lib/formSchemas';

export const runtime = 'nodejs';

// Basic in-memory rate limiter per IP
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_HITS = 5; // 5 requests per window
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

  const contentType = req.headers.get('content-type') || '';
  let parsed: ReturnType<typeof BasvuruFormSchema['safeParse']>;
  let file: File | null = null;

  if (contentType.includes('multipart/form-data')) {
    // Parse as form-data
    const form = await req.formData();
    const data: Record<string, unknown> = {};
    for (const [key, value] of form.entries()) {
      if (key === 'cv' && value instanceof File) {
        file = value;
        data.cvName = value.name;
        data.cvType = value.type;
        data.cvSize = value.size;
      } else if (typeof value === 'string') {
        if (value === 'true' || value === 'false') data[key] = value === 'true';
        else data[key] = value;
      }
    }
    parsed = BasvuruFormSchema.safeParse(data);
  } else {
    // Parse as JSON
    let json: unknown;
    try {
      json = await req.json();
    } catch {
      return NextResponse.json({ ok: false, errors: { _global: 'invalid_json' } }, { status: 400 });
    }
    parsed = BasvuruFormSchema.safeParse(json);
  }

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: zodErrorToFieldErrors(parsed.error) }, { status: 400 });
  }

  // Honeypot: if hp has a value, silently pretend success but drop
  const data: BasvuruFormInput = parsed.data as BasvuruFormInput;
  if (data.hp) {
    await new Promise(r => setTimeout(r, 450));
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // File validations (if present)
  if (file) {
    const maxBytes = 5 * 1024 * 1024; // 5MB
    const allowed = new Set([
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]);
    if (!allowed.has(file.type)) {
      return NextResponse.json({ ok: false, errors: { _global: 'unsupported_file_type' } }, { status: 400 });
    }
    if (file.size > maxBytes) {
      return NextResponse.json({ ok: false, errors: { _global: 'file_too_large' } }, { status: 400 });
    }
    // TODO: upload to storage or email; omitted in first release.
  }

  // Small delay to make automated spamming less efficient
  await new Promise(r => setTimeout(r, 500));

  // For now, just ack success. Future: send email or persist.
  return NextResponse.json({ ok: true }, { status: 200 });
}
