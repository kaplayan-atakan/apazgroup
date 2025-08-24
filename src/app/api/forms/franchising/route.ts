import { NextRequest, NextResponse } from 'next/server';

import { FranchisingFormSchema, zodErrorToFieldErrors, type FranchisingFormInput } from '../../../../lib/formSchemas';

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

  const parsed = FranchisingFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: zodErrorToFieldErrors(parsed.error) }, { status: 400 });
  }

  const data: FranchisingFormInput = parsed.data as FranchisingFormInput;

  // Honeypot
  if (data.hp) {
    await new Promise(r => setTimeout(r, 300));
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Future: send email or persist to storage
  await new Promise(r => setTimeout(r, 400));
  return NextResponse.json({ ok: true }, { status: 200 });
}
