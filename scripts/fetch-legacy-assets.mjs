#!/usr/bin/env node
// Fetch legacy assets from www.apazgroup.com and place into /public with naming scheme.
// Usage: node scripts/fetch-legacy-assets.mjs [--optimize] [--force]

import { mkdirSync, writeFileSync, existsSync, readFileSync, createWriteStream, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');
const manifestPath = path.join(publicDir, 'asset-manifest.legacy.json');

const optimize = process.argv.includes('--optimize');
const force = process.argv.includes('--force');

// Asset definition: { url, file, page, alt, variants?: {webpWidth:number[]} }
// Naming: <category>/<name>--<page|context>.<ext>
const rootUrl = 'https://www.apazgroup.com/img';
const U = p => `${rootUrl}/${p}`;
const assetGroups = {
  brand: [
    { url: U('logo.png'), file: 'brand/logo--global.png', page: 'global', alt: 'Apaz Group Logo (Light)' },
    { url: U('logo-dark.png'), file: 'brand/logo-dark--global.png', page: 'global', alt: 'Apaz Group Logo (Dark)' },
    { url: U('fav-icon.png'), file: 'icons/fav-icon--global.png', page: 'global', alt: 'Site Favicon' }
  ],
  icons: [
    { url: U('arrow.png'), file: 'icons/arrow--back-to-top.png', page: 'global', alt: 'Back to top arrow icon' },
    { url: U('mouse.png'), file: 'icons/mouse--home-hero.png', page: 'home', alt: 'Scroll indicator mouse icon' },
    { url: U('icon/video-1.png'), file: 'icons/play--home-video.png', page: 'home', alt: 'Play video icon' }
  ],
  hero: [
    { url: U('home-slider/slider.jpg'), file: 'hero/slider--home-hero.jpg', page: 'home', alt: 'Hero slider background', variants: { responsive: [1920,1280,960] } }
  ],
  franchising: [
    { url: U('pidebypide.png'), file: 'brands/pidebypide-logo--franchising.png', page: 'franchising', alt: 'Pide By Pide Logo' },
    { url: U('baydoner.png'), file: 'brands/baydoner-logo--franchising.png', page: 'franchising', alt: 'Baydöner Logo' },
    { url: U('ishakbey.png'), file: 'brands/bursaishakbey-logo--franchising.png', page: 'franchising', alt: 'Bursa İshakbey Logo' },
    { url: U('BIB_GORSEL_WEB_534x598px.jpg'), file: 'brands/bursaishakbey-tile--franchising.jpg', page: 'franchising', alt: 'Bursa İshakbey Tile Image' },
    { url: U('PBP_GORSEL_WEB_534x598px.jpg'), file: 'brands/pidebypide-tile--franchising.jpg', page: 'franchising', alt: 'Pide By Pide Tile Image' },
    { url: U('BIB_GORSEL_WEB_1170x440px.jpg'), file: 'brands/bursaishakbey-hero--franchising.jpg', page: 'franchising', alt: 'Bursa İshakbey Hero Image' },
    { url: U('PBP_GORSEL_WEB_1170x440px.jpg'), file: 'brands/pidebypide-hero--franchising.jpg', page: 'franchising', alt: 'Pide By Pide Hero Image' }
  ],
  groupTiles: [
    { url: U('800-400-apaz.png'), file: 'brand/group-apaz--about.png', page: 'about', alt: 'Apaz Group Banner' },
    { url: U('800-400-baydoner.png'), file: 'brands/baydoner-banner--about.png', page: 'about', alt: 'Baydöner Banner' },
    { url: U('800-400-pidebypide.png'), file: 'brands/pidebypide-banner--about.png', page: 'about', alt: 'Pide By Pide Banner' },
    { url: U('800-400-bursaishakbey.png'), file: 'brands/bursaishakbey-banner--about.png', page: 'about', alt: 'Bursa İshakbey Banner' }
  ],
  policies: [
    { url: U('ucret_politikamiz.png'), file: 'policies/ucret-politikamiz--policy.png', page: 'ucret-politikamiz', alt: 'Compensation Policy Illustration' },
    { url: U('seffaflik.png'), file: 'policies/seffaflik--policy.png', page: 'seffaflik-ve-hesap-verebilirlik', alt: 'Transparency & Accountability Illustration' },
    { url: U('calisanlarimizin_performans_degerlendirmesi.png'), file: 'policies/performans-degerlendirmesi--policy.png', page: 'performans', alt: 'Performance Evaluation Illustration' },
    { url: U('calisanlara_sunulan_olanaklar.png'), file: 'policies/calisan-olanaklari--policy.png', page: 'olanaklar', alt: 'Employee Benefits Illustration' },
    { url: U('kurum_kulturumuz_ve_etik_politikamiz.png'), file: 'policies/kurum-kulturumuz-ve-etik--policy.png', page: 'kurum-kulturumuz-ve-etik-degerlerimiz', alt: 'Corporate Culture & Ethics Illustration' },
    { url: U('kurumsal_sosyal_sorumluluk.png'), file: 'policies/kurumsal-sosyal-sorumluluk--policy.png', page: 'kurumsal-sosyal-sorumluluk-politikasi', alt: 'Corporate Social Responsibility Illustration' },
    { url: U('kariyer_ve_egitim_olanaklarimiz.png'), file: 'policies/kariyer-egitim--policy.png', page: 'kariyer-ve-egitim-olanaklarimiz', alt: 'Career & Training Opportunities Illustration' },
    { url: U('kalite_1.png'), file: 'policies/kalite-1--kalite.png', page: 'kalite', alt: 'Quality Document 1' },
    { url: U('kalite_2.png'), file: 'policies/kalite-2--kalite.png', page: 'kalite', alt: 'Quality Document 2' },
    { url: U('kalite_3.png'), file: 'policies/kalite-3--kalite.png', page: 'kalite', alt: 'Quality Document 3' },
    { url: U('kalite_4.png'), file: 'policies/kalite-4--kalite.png', page: 'kalite', alt: 'Quality Document 4' },
    { url: U('insan-kaynaklari-politikamiz-500x600.png'), file: 'policies/insan-kaynaklari-politikamiz--policy.png', page: 'insan-kaynaklari-politikamiz', alt: 'Human Resources Policy Illustration' }
  ],
  hr: [
    { url: U('ik_apaz.jpg'), file: 'hr/ik-apaz--bize-katilin.jpg', page: 'bize-katilin', alt: 'Join Us APaz Image' },
    { url: U('ik_baydoner.jpg'), file: 'hr/ik-baydoner--bize-katilin.jpg', page: 'bize-katilin', alt: 'Join Us Baydöner Image' },
    { url: U('ik_pidebypide.jpg'), file: 'hr/ik-pidebypide--bize-katilin.jpg', page: 'bize-katilin', alt: 'Join Us Pide By Pide Image' },
    { url: U('ik_bursaishakbey.jpg'), file: 'hr/ik-bursaishakbey--bize-katilin.jpg', page: 'bize-katilin', alt: 'Join Us Bursa İshakbey Image' }
  ],
  team: [
    { url: U('levent_yilmaz.jpg'), file: 'team/levent-yilmaz--yonetim.jpg', page: 'yonetim', alt: 'Levent Yılmaz Portrait' },
    { url: U('feridun_tuncer.jpg'), file: 'team/feridun-tuncer--yonetim.jpg', page: 'yonetim', alt: 'Feridun Tuncer Portrait' },
    { url: U('bulent_polat.jpg'), file: 'team/bulent-polat--yonetim.jpg', page: 'yonetim', alt: 'Bülent Polat Portrait' }
  ],
  news: [
    { url: U('244x244-haber-1.png'), file: 'news/haber-1-thumb-square--haberler.png', page: 'haberler', alt: 'News item 1 (square)' },
    { url: U('haber-2-244x244.png'), file: 'news/haber-2-thumb-square--haberler.png', page: 'haberler', alt: 'News item 2 (square)' },
    { url: U('haber-3-244x244.png'), file: 'news/haber-3-thumb-square--haberler.png', page: 'haberler', alt: 'News item 3 (square)' },
    { url: U('haber-4-244x244.png'), file: 'news/haber-4-thumb-square--haberler.png', page: 'haberler', alt: 'News item 4 (square)' },
    { url: U('420x220-haber-1.png'), file: 'news/haber-1-thumb-wide--haberler.png', page: 'haberler', alt: 'News item 1 (wide)' },
    { url: U('haber-2-420x220.png'), file: 'news/haber-2-thumb-wide--haberler.png', page: 'haberler', alt: 'News item 2 (wide)' },
    { url: U('haber-3-420x220.png'), file: 'news/haber-3-thumb-wide--haberler.png', page: 'haberler', alt: 'News item 3 (wide)' },
    { url: U('haber-4-420x220.png'), file: 'news/haber-4-thumb-wide--haberler.png', page: 'haberler', alt: 'News item 4 (wide)' }
  ],
  cuisine: [
    { url: U('iskender_yemek_herkesin_hakki.png'), file: 'cuisine/iskender-herkesin-hakki--baydoner.png', page: 'baydoner', alt: 'İskender everyone deserves quality visual' },
    { url: U('coss_iskender.png'), file: 'cuisine/coss-iskender--baydoner.png', page: 'baydoner', alt: 'Coss İskender Product Visual' }
  ],
  brandExtras: [
    { url: U('baydoner-hakkinda-1.jpg'), file: 'brands/baydoner-about-1--baydoner.jpg', page: 'baydoner', alt: 'Baydöner About Page Image' },
    { url: U('baydoner_logo.png'), file: 'brands/baydoner-logo-alt--franchising.png', page: 'franchising', alt: 'Baydöner Alternate Logo' },
    { url: U('pidebypide_logo.png'), file: 'brands/pidebypide-logo-alt--franchising.png', page: 'franchising', alt: 'Pide By Pide Alternate Logo' },
    { url: U('bursa_ishakbey_logo.png'), file: 'brands/bursaishakbey-logo-alt--franchising.png', page: 'franchising', alt: 'Bursa İshakbey Alternate Logo' }
  ]
};

const flatList = Object.values(assetGroups).flat();

function ensureDir(p) {
  const dir = path.join(publicDir, path.dirname(p));
  mkdirSync(dir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // redirect
        return download(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode + ' for ' + url));
      const out = createWriteStream(dest);
      res.pipe(out);
      out.on('finish', () => out.close(() => resolve(dest)));
      out.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : { assets: {} };
  if (!manifest.assets) manifest.assets = {};
  const results = [];
  for (const item of flatList) {
    ensureDir(item.file);
    const target = path.join(publicDir, item.file);
    try {
      const already = existsSync(target);
      if (!already || force) {
        await download(item.url, target);
      }
      let size = 0;
      try { size = statSync(target).size; } catch (e) { /* ignore */ }
      results.push({ file: item.file, status: already && !force ? 'skipped' : 'downloaded', size });
      manifest.assets[item.file] = {
        source: item.url,
        page: item.page,
        alt: item.alt,
        size,
        variants: manifest.assets[item.file]?.variants || {}
      };
    } catch (e) {
      results.push({ file: item.file, status: 'error', error: e.message });
    }
  }
  const timestamp = new Date().toISOString();
  manifest.runs = manifest.runs || [];
  manifest.runs.push({ timestamp, optimize, force, results });
  manifest.lastRun = { timestamp, optimize, force };
  // Optimization pass
  if (optimize) {
  let sharp;
  try { sharp = (await import('sharp')).default; } catch (e) { console.warn('sharp dynamic import failed (maybe not installed yet).', e?.message); }
    if (sharp) {
      const SMALL_ICON_MAX_SIZE = 16 * 1024; // 16KB
      const isSmallPngIcon = (publicPath, sizeBytes) => {
        const lower = String(publicPath).toLowerCase();
        return lower.endsWith('.png') && (lower.startsWith('icons/') || (Number(sizeBytes) > 0 && Number(sizeBytes) <= SMALL_ICON_MAX_SIZE));
      };
      const blurMap = {}; // { '/path/in/public': 'data:image/webp;base64,...' }
      for (const item of flatList) {
        const original = path.join(publicDir, item.file);
        if (!existsSync(original)) continue;
        const parsed = path.parse(original);
        const webpOut = path.join(parsed.dir, parsed.name + '.webp');
        const avifOut = path.join(parsed.dir, parsed.name + '.avif');
        // Create webp
        if (!existsSync(webpOut) || force) {
          try { await sharp(original).webp({ quality: 74 }).toFile(webpOut); } catch (e) { console.warn('webp fail', item.file, e.message); }
        }
        // Create avif
        if (!existsSync(avifOut) || force) {
          try { await sharp(original).avif({ quality: 60 }).toFile(avifOut); } catch (e) { console.warn('avif fail', item.file, e.message); }
        }
        // Responsive variants for hero (if flagged)
        if (item.variants?.responsive && Array.isArray(item.variants.responsive)) {
          for (const w of item.variants.responsive) {
            const respOut = path.join(parsed.dir, `${parsed.name}@${w}w.webp`);
            if (!existsSync(respOut) || force) {
              try { await sharp(original).resize({ width: w }).webp({ quality: 70 }).toFile(respOut); } catch (e) { console.warn('resp fail', item.file, w, e.message); }
            }
          }
        }

        // Update manifest variants
        const manifestKey = path.relative(publicDir, original).replace(/\\/g, '/');
        manifest.assets[manifestKey] = manifest.assets[manifestKey] || { source: item.url, page: item.page, alt: item.alt, variants: {} };
        const v = manifest.assets[manifestKey].variants;
        // Ensure size metadata exists for skip logic
        if (typeof manifest.assets[manifestKey].size !== 'number' || manifest.assets[manifestKey].size <= 0) {
          try { manifest.assets[manifestKey].size = statSync(original).size; } catch { /* ignore */ }
        }
  try { if (existsSync(webpOut)) v.webp = path.relative(publicDir, webpOut).replace(/\\/g, '/'); } catch (e) { /* ignore */ }
  try { if (existsSync(avifOut)) v.avif = path.relative(publicDir, avifOut).replace(/\\/g, '/'); } catch (e) { /* ignore */ }
        if (item.variants?.responsive) {
          v.responsiveWebp = v.responsiveWebp || [];
          for (const w of item.variants.responsive) {
            const respOut = path.join(parsed.dir, `${parsed.name}@${w}w.webp`);
            try { if (existsSync(respOut)) v.responsiveWebp.push(path.relative(publicDir, respOut).replace(/\\/g, '/')); } catch (e) { /* ignore */ }
          }
        }

        // Generate tiny blur placeholder (webp ~12px width)
        const maybeSize = manifest.assets[manifestKey]?.size ?? 0;
        const skipBlur = isSmallPngIcon(manifestKey, maybeSize);
        if (skipBlur) {
          // Remove any stale blur info from previous runs and skip
          try { delete manifest.assets[manifestKey].blurDataURL; } catch { /* ignore */ }
        } else {
          try {
            const blurBuf = await sharp(original).resize({ width: 12 }).webp({ quality: 35 }).toBuffer();
            const dataUrl = `data:image/webp;base64,${blurBuf.toString('base64')}`;
            manifest.assets[manifestKey].blurDataURL = dataUrl;
            const keyWithSlash = '/' + manifestKey;
            blurMap[keyWithSlash] = dataUrl;
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn('blur fail', manifestKey, e?.message);
          }
        }
      }

      // Write blur map for app import usage
      try {
        const blurMapOut = path.join(root, 'src', 'lib', 'asset-blur-map.json');
        ensureDir(path.relative(publicDir, blurMapOut)); // ensure src/lib exists
        writeFileSync(blurMapOut, JSON.stringify(blurMap, null, 2));
        console.log('Blur map written to', blurMapOut);
      } catch (e) {
        console.warn('Failed to write blur map json:', e?.message);
      }
    }
  }
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.table(results);
  console.log('Manifest updated at', manifestPath);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
