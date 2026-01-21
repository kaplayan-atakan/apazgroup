import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

import fs from 'fs';
import path from 'path';

function getAppSettingFromWebConfig(key) {
  try {
    const configPath = path.join(process.cwd(), 'web.config');
    const xml = fs.readFileSync(configPath, 'utf8');

    // Matches: <add key="KEY" value="VALUE" /> (single or double quotes; attribute order not guaranteed)
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

if (!process.env.NEXT_PUBLIC_SITE_URL) {
  const fromConfig = getAppSettingFromWebConfig('NEXT_PUBLIC_SITE_URL');
  if (fromConfig) process.env.NEXT_PUBLIC_SITE_URL = fromConfig;
}

const passthroughKeys = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_SECURE', 'SMTP_USER', 'SMTP_PASS'];
for (const key of passthroughKeys) {
  if (process.env[key]) continue;
  const v = getAppSettingFromWebConfig(key);
  if (v) process.env[key] = v;
}

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});