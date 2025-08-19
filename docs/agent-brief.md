# Apaz Group Web (Next.js 14) — Agent Brief

Bu belge, bu repository’deki projenin kabiliyetlerini ve çalışma ilkelerini, otomasyon/agent kullanımında doğru yönlendirmek için özetler. Hedef: modern, çok dilli (TR/EN), erişilebilir, performanslı bir kurumsal site.

## 1) Teknoloji Yığını ve Çekirdek Mimari
- Framework: Next.js 14 App Router (React 18, TypeScript strict)
- UI: Tailwind CSS; minimal custom UI bileşenleri; ikonlar SVG/React
- İçerik: Markdown + frontmatter (gray-matter) — custom content loader + Zod şemalar
- i18n: URL prefix’li locales `/tr`, `/en`; `/` -> `/tr` redirect; EN yoksa TR fallback
- SEO: Next Metadata API (title/description/alternates/canonical/openGraph/robots) + JSON-LD; sitemap.ts
- Görsel/Asset: Legacy varlıkları optimize eden script (sharp); WebP/AVIF varyantları; blur placeholder haritası
- Formlar: Başvuru formu (Zod + RHF) + API route (Node runtime, basic rate limit, honeypot)
- Test: Minimal tip/test altyapısı (tsx ile hızlı testler); planlı Jest/RTL/Playwright

## 2) Dizin Yapısı (özet)
- `src/app` — App Router sayfaları, API routes, layout
- `src/components` — UI ve içerik bileşenleri (örn. ContentArticle, BasvuruForm)
- `src/content/{locale}` — Markdown içerik kaynakları (sayfa frontmatter + body)
- `src/lib` — içerik loader, i18n, SEO yardımcıları, form şemaları, asset blur map
- `public/` — optimize görseller (webp/avif/png/jpg), statik varlıklar
- `scripts/` — asset fetch/optimize & blur map üretimi (sharp)
- `tests/` — hızlı kontrol/test dosyaları

Not: Placeholder sayfalar `src/app/[locale]/(placeholders)/...` altında ve robots `noindex` olarak işaretlidir.

## 3) İçerik Modeli ve Yükleme
- Markdown frontmatter Zod ile doğrulanır; slug => rota segmenti
- Section tipi: `prose` tabanlı gövde + genişletmeler (heroSimple, brandTeaser vs.)
- EN içeriği yoksa TR fallback gösterilir (isteğe göre robots noindex uygulanabilir; şu an placeholders için noindex aktif)
- ContentArticle bileşeni markdown’u tek merkezden render eder, JSON-LD Article üretir, blur verilerini kullanır

## 4) i18n ve URL Yapısı
- Locale path prefix: `/tr`, `/en`; root `/` -> `/tr`
- Diakritik normalizasyon middleware’i: Türkçe karakterli eski path’leri ASCII slug’a 301 yönlendirir
- Dil switcher tüm sayfalarda erişilebilir ve locale-aware

## 5) SEO, Sitemap ve Metadata
- `generateMetadata` ile sayfa bazlı: title, description, alternates (languages), canonical, OG
- `robots`: Placeholder sayfalarda `index: false, follow: true`
- `app/sitemap.ts`: localeler ve içerik sayfalarından dinamik üretim
- JSON-LD: Logo/Organization ve Article şemaları uygun sayfalarda

## 6) Asset Pipeline ve Blur Placeholder’lar
- Script: `scripts/fetch-legacy-assets.mjs`
  - Legacy dosyaları optimize eder (WebP/AVIF), gerekirse responsive varyant
  - `src/lib/asset-blur-map.json` üretir ve bileşenlerde `placeholder="blur"` için kullanılır
  - Küçük PNG ikonları için blur atlama filtresi (ikonlar/≤16KB) — keskin minik ikonlar için gereksiz blur’u önler

## 7) Formlar (Başvuru)
- UI: `react-hook-form` + `@hookform/resolvers/zod` + Tailwind
- Şema: Zod — name, email, phone, position?, message, consent (true), hp (honeypot), cv (rezerv)
- API: `/api/forms/basvuru` — Node runtime, basit IP rate limit, 500ms gecikme, honeypot’a sessiz drop
- Yanıt: `{ ok: boolean, errors?: Record<string,string> }`
- Başarılı gönderim sonrası küçük “Teşekkürler” durumu render edilir

## 8) Erişilebilirlik ve Performans İlkeleri
- A11y: Nav odak kapanışları, aria etiketleri, semantik role’ler
- Görseller: next/image; mümkün olduğunda `placeholder="blur"` ve doğru `sizes`
- Performans: Lighthouse Perf/A11y >= 90 hedefi; font/görsel optimizasyonu ve lazy yükleme

## 9) Komutlar (npm scripts)
- `dev` — Next dev
- `build` — Production build
- `start` — Production start
- `lint` — ESLint
- `typecheck` — TypeScript check
- `format` — Prettier
- `assets:pull|optimize|sync` — Legacy asset pipeline (sharp ile)
- `test` — Hızlı test (form şeması)

## 10) Agent İçin Uygulama Rehberi
- Yeni statik içerik sayfası eklemek:
  1) `src/content/tr/pages/<slug>.md` oluştur (frontmatter + body)
  2) EN çeviri yoksa `src/content/en/pages/<slug>.md` placeholder oluştur veya fallback’e güven
  3) Gerekirse özel section tipleri için ContentArticle desteklerini güncelle
  4) SEO: frontmatter seo.title/description alanlarını doldur
- Yeni rota/sayfa:
  - Mümkünse ContentArticle ile render; özel sayfalarda App Router page + `generateMetadata`
- Görsel eklemek:
  - `public/` altına yerleştir; gerekiyorsa `assets:optimize` çalıştır
  - Blur gerekiyorsa script blur map’i günceller, ikon/çok küçük PNG’lerde blur atlanır
- Form alanı değişikliği:
  - Zod şemayı güncelle + UI form alanlarını senkronize et + testleri güncelle
  - API’de doğrulamayı ve yanıtları koru (rate limit/honeypot bozulmamalı)
- i18n ekleri:
  - `src/locales/{tr,en}.json` sözlüklerine anahtar ekle; bileşenlerde dictionary kullan
- SEO/Redirects:
  - underscore/diyakritik eski path’ler için 301 next.config.js/middleware ile ayarlı; değişiklikte test et

## 11) Sınırlar ve Kaçınılacaklar
- jQuery/Bootstrap eklenmeyecek (Tailwind + Headless pattern)
- Ağır animasyonlar LCP’yi etkilemeyecek; prefers-reduced-motion’a saygı
- Dosya yükleme (CV) ilk sürümde pasif; API şeması rezervli ama upload kapalı

## 12) Test ve CI (durum)
- Hızlı şema testleri mevcut; Jest/RTL/Playwright ve CI pipeline planlandı
- Kod üretiminde: typecheck/lint/build yeşil olmalı; mümkünse küçük smoke test ekle

## 13) Yerleşik Özellikler — Kısa Liste
- Çok dilli yapı (TR/EN) + fallback
- Markdown içerik, merkezi render, JSON-LD
- SEO metadata + sitemap
- Görsel optimizasyon + blur placeholder haritası
- Başvuru formu: doğrulama + rate limit + honeypot + success UX
- Placeholder sayfalar: noindex + görsel uyarı bandı

## 14) Sık Kullanılan Dosyalar
- `src/components/content/ContentArticle.tsx`
- `src/app/[locale]/(placeholders)/*/page.tsx`
- `src/lib/content/*` (loader)
- `src/lib/formSchemas.ts`
- `src/app/api/forms/basvuru/route.ts`
- `src/locales/*.json`
- `scripts/fetch-legacy-assets.mjs`

---
Bu rehber, agent’ın güvenli ve tutarlı değişiklikler yapması için kuralları ve kabiliyetleri özetler. Büyük değişikliklerde önce şema/loader/SEO etkilerini gözden geçir, ardından test ve build doğrulaması yap.
