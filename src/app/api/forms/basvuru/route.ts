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

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { _global: 'invalid_json' } }, { status: 400 });
  }

  const parsed = BasvuruFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: zodErrorToFieldErrors(parsed.error) }, { status: 400 });
  }

  // Honeypot: if hp has a value, silently pretend success but drop
  const data: BasvuruFormInput = parsed.data as BasvuruFormInput;
  if (data.hp) {
    await new Promise(r => setTimeout(r, 450));
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Small delay to make automated spamming less efficient
  await new Promise(r => setTimeout(r, 500));

  // For now, just ack success. Future: send email or persist.
  return NextResponse.json({ ok: true }, { status: 200 });
}
