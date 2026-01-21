#!/usr/bin/env node
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

function getAppSettingFromWebConfig(key) {
  try {
    const configPath = path.join(process.cwd(), 'web.config');
    const xml = fs.readFileSync(configPath, 'utf8');
    const addTagRe = new RegExp(
      `<add\\s+[^>]*key=(?:"|')${key}(?:"|')[^>]*value=(?:"|')([^"']+)(?:"|')[^>]*/?>`,
      'i'
    );
    const match = xml.match(addTagRe);
    return match?.[1];
  } catch {
    return undefined;
  }
}

const SMTP_HOST = process.env.SMTP_HOST || getAppSettingFromWebConfig('SMTP_HOST') || 'smtp.office365.com';
const SMTP_PORT = process.env.SMTP_PORT || getAppSettingFromWebConfig('SMTP_PORT') || '587';
const SMTP_SECURE = process.env.SMTP_SECURE || getAppSettingFromWebConfig('SMTP_SECURE') || 'false';
const SMTP_USER = process.env.SMTP_USER || getAppSettingFromWebConfig('SMTP_USER');
const SMTP_PASS = process.env.SMTP_PASS || getAppSettingFromWebConfig('SMTP_PASS');

if (!SMTP_USER || !SMTP_PASS) {
  console.error('Missing SMTP_USER or SMTP_PASS (env or web.config appSettings)');
  process.exit(1);
}

async function main() {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: String(SMTP_SECURE || 'false').toLowerCase() === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { minVersion: 'TLSv1.2' }
  });
  try {
    const result = await transporter.verify();
    transporter.sendMail({
      from: SMTP_USER,
      to: 'atakan.kaplayan@apazgroup.com',
      subject: 'Test Email from SMTP',
      text: 'This is a test email sent from the SMTP test script.'
    });
    console.log('SMTP verify success:', result);
    process.exit(0);
  } catch (err) {
    console.error('SMTP verify failed:', err);
    process.exit(2);
  }
}

main();
