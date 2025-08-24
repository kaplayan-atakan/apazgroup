#!/usr/bin/env node
import nodemailer from 'nodemailer';

const { SMTP_USER, SMTP_PASS } = process.env;
if (!SMTP_USER || !SMTP_PASS) {
  console.error('Missing SMTP_USER or SMTP_PASS env variables');
  process.exit(1);
}

async function main() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { ciphers: 'TLSv1.2' }
  });
  try {
    const result = await transporter.verify();
    console.log('SMTP verify success:', result);
    process.exit(0);
  } catch (err) {
    console.error('SMTP verify failed:', err);
    process.exit(2);
  }
}

main();
