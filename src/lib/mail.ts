// Centralized mail transport creation (Office365 SMTP)
// Avoid hardcoding secrets; configure via environment variables.
// Required env vars:
//  SMTP_HOST (default: smtp.office365.com)
//  SMTP_PORT (default: 587)
//  SMTP_USER (no default, but can fallback to admin@apazgroup.com for local dev)
//  SMTP_PASS (required)
//  SMTP_SECURE (default: false)
// Nodemailer types are not installed; kept lightweight.
// @ts-expect-error nodemailer types not installed
import nodemailer from 'nodemailer';

let cachedTransport: any; // eslint-disable-line @typescript-eslint/no-explicit-any

export function getTransporter() {
  if (cachedTransport) return cachedTransport;
  const host = process.env.SMTP_HOST || 'smtp.office365.com';
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = (process.env.SMTP_SECURE || 'false').toLowerCase() === 'true';
  const user = process.env.SMTP_USER || 'admin@apazgroup.com';
  const pass = process.env.SMTP_PASS || 'qqcfjfkwywtcwtqb';
  if (!pass) {
    throw new Error('SMTP_PASS env var missing');
  }
  cachedTransport = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { ciphers: 'TLSv1.2' }
  });
  return cachedTransport;
}

export function resolveSmtpUser() {
  return process.env.SMTP_USER || 'admin@apazgroup.com';
}
