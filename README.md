## Apaz Group Next.js Rebuild

Modern çok dilli (TR/EN) kurumsal site yeniden inşa projesi.

### Teknolojiler
- Next.js 14 (App Router, Edge OG Image)
- TypeScript Strict
- Tailwind CSS
- Custom Markdown + Zod içerik katmanı

### Geliştirme
```bash
npm install
npm run dev
```

### Ortam Değişkenleri
- `NEXT_PUBLIC_SITE_URL` : Canonical base URL (örn. https://www.apazgroup.com)

### İçerik
Markdown dosyaları `src/content/{locale}/pages/*.md` altında. EN eksikse TR fallback + `robots: noindex`.

### Sitemap
`/sitemap.xml` otomatik olarak tüm locale + sayfalar için üretildi.

### OG Image API
`/api/og?title=Baslik` dinamik Open Graph görseli (placeholder tasarım).

### UI Playground
`/[locale]/ui-playground` basit buton & heading varyantlarını gösterir (production deploy öncesi kaldırılabilir).

### Yol Haritası
Detaylar `.github/copilot-instructions.md` dosyasında.

### Agent Brief
`docs/agent-brief.md` — Projenin kabiliyetleri ve kurallarının agent odaklı özeti.
