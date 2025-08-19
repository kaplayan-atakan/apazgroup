<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->
# Copilot Yönergeleri (Apaz Group Next.js Yeniden İnşa)

Bu dosya, projede GitHub Copilot'un nasıl yönlendirileceğini ve sprint bazlı yol haritasını içerir. Gerektikçe güncellenecektir.

## 1. Amaç
Mevcut PHP tabanlı sitenin (kaynak: `apazgroupsource/`) içerik, bilgi mimarisi ve fonksiyonlarını koruyup; modern, çok dilli (TR/EN), erişilebilir, performanslı bir Next.js 14 (App Router + TypeScript + Tailwind) mimarisine taşımak.

## 2. Üst Düzey Sprint Yol Haritası
| Sprint | Hedef | Çıktılar | Kabul Kriterleri |
|--------|-------|---------|------------------|
| 0 | Hazırlık & Altyapı | Repo temizliği, roadmap, Copilot yönergeleri | Yol haritası onaylı, gereksiz dosyalar kaldırıldı |
| 1 | Proje İskeleti & Temel Config | `next.config.js`, `tsconfig.json`, Tailwind, ESLint, Prettier, base layout | `npm run dev` sorunsuz, lint temiz |
| 2 | i18n & Rota Yapısı | Locale middleware, `/tr` default redirect, temel statik sayfa rotaları | TR sayfaları açılıyor, 404 yok |
| 3 | Global UI (Layout, Header, Footer, Nav) | `<RootLayout/>`, navigasyon, dil switcher, meta temel | Lighthouse A11y >= 90 |
| 4 | İçerik Sayfaları (Batch 1) | `franchising`, `insan-kaynaklari-politikamiz`, `bize-katilin` | MD kaynakları content layer ile tipli okunuyor |
| 5 | Başvuru Formu (Frontend + API) | Form bileşenleri, Zod şema, server action/route, basic rate limit | Geçerli submit -> JSON {ok:true} |
| 6 | İçerik Sayfaları (Batch 2 + Placeholder) | KVKK / Çerez placeholder, diğer kalan sayfalar | Placeholder sayfalar SEO noindex flag |
| 7 | Redirects & SEO | Eski underscore rotalara 301, dinamik metadata, sitemap | Redirect testleri geçiyor |
| 8 | Performans & A11y İyileştirme | Lazy media, image optimizasyon, font optimize | Lighthouse Perf > 90 |
| 9 | Test Otomasyonu & CI | Jest config, basic component tests, Playwright smoke, GitHub Actions | CI pipeline yeşil |
| 10 | Deploy & Son Rötuş | Vercel deploy, environment dokümantasyonu | Production URL çalışır |

## 3. Dosya / Klasör Yapısı (Hedef)
```
/src
  /app
    /[locale]
      /layout.tsx
      /page.tsx
      /franchising/page.tsx
      /insan-kaynaklari-politikamiz/page.tsx
      /bize-katilin/page.tsx
      /basvuru-formu/page.tsx
      /(placeholders)/kisisel-verilerin-korunmasi/page.tsx
      /(placeholders)/cerez-politikasi/page.tsx
    /api/forms/basvuru/route.ts
  /components
    /layout /navigation /ui /forms /brand
  /content
    /tr/*.md
    /en/*.md
  /lib (seo.ts, i18n.ts, formSchemas.ts)
  /styles (globals.css, tailwind.css)
/public (img, fonts)
```

## 4. Reverse Engineering Çıktıları (Özet)
Kaynak HTML (PHP çıktısı) dosyalarından tespit edilen asset patternleri:
- CSS: `vendors/**`, `css/bootstrap.min.css`, `css/style.css`, `css/responsive.css`
- JS: `js/popper.min.js`, `js/bootstrap.min.js`, `vendors/*/*.js`, `js/theme.js`, jQuery CDN, `gmaps.min.js`
- Görseller (örnek): `img/logo.png`, `img/logo-dark.png`, `img/pidebypide.png`, `img/baydoner.png`, `img/ishakbey.png`, `img/arrow.png`, `img/fav-icon.png`
- İkon fontları: `vendors/ionicons`, `vendors/linear-icon`, `vendors/elegant-icon`

Modernizasyon Kararları:
- Bootstrap + jQuery bağımlılığı tamamen kaldırılacak; Tailwind + Headless UI kullanılacak.
- Eski slider / animasyon eklentileri (owl-carousel, magnific-popup, animsition) yerine: native `next/image` + minimal motion (Framer Motion opsiyonel).
- İkon setleri React Icons ile haritalanacak (Ionicons + Linear benzeri).

## 5. Yapılandırma Adımları (Sprint 1 Detay)
1. `package.json` oluştur (scripts: dev, build, lint, typecheck). 
2. TypeScript init + `strict`.
3. Tailwind kurulumu (`postcss.config.js`, `tailwind.config.ts`).
4. ESLint + Prettier + import/order + Tailwind plugin.
5. Base global layout + font preload.
6. Brand renkleri tailwind theme.extend.

## 6. i18n Stratejisi (Sprint 2)
- URL prefix: `/tr`, `/en`; root `/` -> `/tr` redirect.
- Content kaynak: `src/content/{locale}/...md` (başlangıçta TR; EN placeholder).
- Basit loader: build time MD parse (Contentlayer veya hafif custom) — ilk aşamada custom.
- Çeviri anahtarları: navigation, footer, form etiketleri için JSON sözlük.

## 7. Form (Sprint 5) Teknik Plan
- `react-hook-form` + `@hookform/resolvers/zod` + `zod` şeması.
- File upload: ilk fazda disable veya accept PDF (5MB sınır) -> edge olmayan route (Node runtime).
- Rate limit: basit in-memory (per IP) + ileride Upstash Redis.
- Validation respondu: `{ ok: boolean, errors?: Record<string,string> }`.

## 8. SEO & Redirects (Sprint 7)
- `next.config.js` içinde eski underscore rotalara 301.
- `app/sitemap.ts` dinamik: content dosyaları iterate.
- OpenGraph meta: `generateMetadata` fonksiyonları.

## 9. Test & CI (Sprint 9)
- Unit: Jest + ts-jest.
- Component: React Testing Library.
- E2E: Playwright minimal smoke.
- GitHub Actions: install -> typecheck -> lint -> test -> build.

## 10. Performans Optimizasyonları (Sprint 8)
- Font subset (Google Fonts self-host).
- Image konsolidasyonu (SVG/PNG optimize, potansiyel AVIF/WebP otomatik Next).
- Tree-shake unused komponentler.

## 11. Copilot Kullanım Kuralları
- Büyük dosya eklemeden önce: kısa açıklama + beklenen çıktı.
- Her sprint başlangıcında bu dosyada "Durum" bölümünü güncelle.
- Kod üretiminde legacy jQuery / Bootstrap pattern'larından kaçın.
- Form şeması değişikliğinde: şema + UI + test senaryosu aynı commit.

## 12. Kararlar (Onaylandı)
- İçerik Yükleyici: İlk faz Custom Loader (gray-matter + zod). Contentlayer geçişi için ayrı issue açılacak ve 3 ay içinde ihtiyaç analiz edilecek.
- Framer Motion: Opsiyonel enhancement olarak eklenecek, sadece kritik olmayan görsel alanlarda (örn. brand grid reveal). Route transition ilk sürümde yok.
- Dosya Yükleme (CV): İlk sürümde pasif (UI alanı disabled / tooltip). API endpoint şema alanı hazırlanmış olacak fakat dosya kabul etmeyecek.

## 13. Framer Motion Uygulama İlkeleri
- LazyMotion + domAnimation kullan.
- prefers-reduced-motion aktifse animasyonları skip veya süre=0.
- Stagger sadece ilk viewport girişinde (viewport.once=true) tetiklensin.
- Animasyon süresi: 150–250ms; easing: easeOut.
- LCP etkileyen hero bileşeninde ağır animasyon yok.

## 14. Custom Content Loader Tasarımı
```
/lib/content/
  schemas.ts        -> Zod modelleri (PageFrontmatter, Section vs.)
  types.ts          -> Derived TS tipleri (inferred)
  fs.ts             -> low-level read/caching
  parser.ts         -> frontmatter + body parse, section tokenize
  index.ts          -> getAllPages(locale), getPageBySlug(locale, slug)
/scripts/generate-content-snapshot.ts (opsiyonel json snapshot)
```
- Cache: Dev modunda global WeakMap; prod’da sadece senkron okuma.
- Section modeli: discriminated union { type: 'prose' | 'split' | 'list' ... }.
- Slug normalizasyonu: dosya adı -> route segment (kebab-case).
- EN çevirileri yoksa fallback TR (i18n.ts içinde fallback zinciri).

## 15. Roadmap Durum Alanı
- [x] Sprint 1 Başladı
- [x] Sprint 1 Tamamlandı (İskelet, içerik loader, TR içerik migrasyonu, dinamik slug route, nav, i18n sözlük başlangıcı, root redirect)
- [x] Sprint 2 Başladı
- [x] Sprint 2 Tamamlandı (EN fallback, dil switcher, slug normalizasyonu, section şema genişletme: heroSimple & brandTeaser, nav config soyutlama, footer placeholder, diakritik middleware redirect)
- [x] Sprint 3 Başladı
- [x] Sprint 3 Tamamlandı (Header/Logo erişilebilir ve responsive, mobil menü fokus kapanışları, Footer sosyal + KVKK/Çerez linkleri, SVG Icon bileşeni + BackToTop, markdown autolink, SEO alternates/canonical + JSON-LD logo güncelleme, görseller Next/Image ile; Franchising banner, brandDetail image desteği, HR/Policies/News/Team görsel gridleri)
- [x] Sprint 4 Başladı
- [x] Sprint 4 Tamamlandı (ContentArticle merkezi içerik bileşeni, statik rotaların konsolidasyonu, dinamik [slug] sayfasının sadeleştirilmesi, blur placeholder entegrasyonu ve asset pipeline güncellemesi, content loader'ın `pages/` dizinini de taraması, franchising banner ve gridlerde blur kullanımı)
- [x] Sprint 5 Başladı
- [x] Sprint 5 Tamamlandı (Başvuru formu UI/API, Zod şeması, honeypot+rate limit, success state, minimal test)
- [x] Sprint 6 Başladı
- [x] Sprint 6 Tamamlandı (Placeholder sayfalar noindex, PlaceholderNotice bileşeni, sitemap filtreleme, CI workflow, içerik parite kontrolü, agent-brief)
- [x] Sprint 7 Başladı
- [x] Sprint 7 Tamamlandı (Tüm eski URL'lere 301 redirectler, SEO meta optimizasyonları, OG image, JSON-LD yapılandırma, Sitemap iyileştirme, robots.txt, merkezi SEO utility)
- [x] Sprint 8 Başladı

## 16. Sprint 1 Kapanış Özeti
- Yapılanlar: Config (TS/Tailwind/ESLint), base layout + font, TR markdown tüm sayfalar, custom loader + zod şema, dinamik `[slug]`, nav (geçici), i18n sözlükler (tr/en), root redirect, metadata temel.
- Kapanmamış / Delege Edilen: Section tip genişletmesi (brandDetail vb.), EN içerik üretimi, dil switcher UI, gelişmiş SEO (canonical, og:image), test altyapısı.

## 17. Sprint 2 Hedef (i18n & Rota Yapısı Derinleştirme + Temel Global UI Devamı)
Amaç: Çok dilli yapı için EN fallback mantığı, dil switcher, nav iyileştirme, slug normalizasyonu ve içerik section genişletmesi başlangıcı.

Öncelikli İş Paketleri:
1. EN Fallback: EN sayfası yoksa TR içeriği göster (metadata dahil) + `<meta name="robots" content="noindex">` opsiyonel flag (isteğe göre) şimdilik eklenmeyecek.
2. Dil Switcher Bileşeni: Aktif locale highlight + diğerine link.
3. Slug Normalizasyonu: Türkçe karakter -> ASCII (ö: o, ı: i, ş: s, ğ: g, ü: u, ç: c) pipeline; eski slug erişimleri 301.
4. Section Şema Genişletme (faz 1): `proseExtended` (markdown body), `split`, `list` haricinde `heroSimple`, `brandTeaser` (yalın placeholder tipleri).
5. Navigation Data Kaynağı: Menü tanımını kod yerine JSON/TS config dosyasına taşıma (i18n label key'leri).
6. Basit Footer Placeholder.

Kalite Kriterleri:
- /en altında sayfa isteği 200 döner; fallback log uyarısı dev’de görünür.
- Dil switcher tüm sayfalarda erişilebilir (aria-label, odak sırası).
- Slug normalizasyonu sonrası manuel testte eski diakritikli URL iskeleti 301 ile ASCII slug’a gider.
- Lint & typecheck sıfır hata.

Risk / Notlar:
- Slug normalizasyonu mevcut build edilmiş sayfaların path’lerini değiştirebilir; production öncesi uygulanacağı için cache invalidation sorun yok.
- Section genişletmesi geçici olarak UI bileşenleri olmadan placeholder render edecek.

## 18. Sprint 2 Kapanış Özeti
- Yapılanlar: EN fallback + robots noindex koşullu, dil switcher, slug normalizasyon & middleware diakritik redirect, nav config abstraction, Footer placeholder bileşeni, section şema genişletme (heroSimple, brandTeaser) + temel render.
- Kalite Durumu: Build & typecheck temiz, 34 statik sayfa, lint hatası yok, fallback log dev’de görünür.
- Eksik / Delege: heroSimple/brandTeaser görsel & motion enhancement (Sprint 3+), responsive header (mobile nav), Footer geniş içerik (link grupları, sosyal ikonlar), EN gerçek içerik üretimi, test altyapısı.

## 19. Sprint 3 İçin Adaylar
- Global header refinement (logo, responsive menü, mobile drawer)
- Footer genişletme (link grupları, sosyal ikonlar, marka açıklaması)
- Temel UI primitives (Button, Heading, Container, VisuallyHidden)
- Section bileşenlerinin ayrıştırılması & motion (Framer Motion lazy)
- SEO genişletme (canonical, og:image placeholder, sitemap.ts)
- Hazırlık: Form şeması (Sprint 5 öncesi tip taslağı) opsiyonel

### Sprint 3 Aktif İş Paketleri (Detay)
1. Header A11y & UX: ESC ile kapanma, dış tıklama kapama, odak kapanınca menü toggle butonuna dönsün, logo placeholder.
2. Footer Finalizasyon: Sosyal ikon placeholder bileşenleri (LinkedIn, Instagram), KVKK & Çerez linkleri (noindex sayfalara yönlendirme), marka kısa açıklama.
3. Markdown Render Pipeline: `remark` + `rehype` ile prose section markdown -> HTML + heading id (slug) üretimi; future: autolink headings.
4. SEO Genişleme: Locale index sayfaları + root için `alternates`, canonical env tabanlı; dynamic page OG tags ön tanımı güncelleme.
5. Motion Hazırlık (opsiyonel): Framer Motion Lazy yapı iskeleti (henüz animasyon eklenmeyebilir).

Tamamlanınca: Sprint 4 içerik & yeni section genişletmesine geçilecek.


---
Onayla / Revize et: Yol haritasını güncellemek için değişiklik taleplerini belirt.

## 20. Sprint 3 Kapanış Özeti
- Yapılanlar:
  - Header: Logo Next/Image ile locale anasayfaya link; mobil menü ESC/dış tık ile kapanma + odak döndürme.
  - Footer: Sosyal linkler (ikon + aria-label), KVKK ve Çerez placeholder linkleri, kısa marka açıklaması.
  - UI: SVG `Icon` bileşeni (menu/close/arrow-up/linkedin/x/instagram), `BackToTop` butonu.
  - Görseller: `BrandLogo` Next/Image; Franchising banner; `brandDetail` section’da gerçek görsel desteği.
  - İçerik görselleri: HR/Policies/News/Team için slug→asset haritası ve sayfada responsive grid render.
  - Markdown: rehype-slug + autolink heading stilleri.
  - SEO: alternates/canonical düzenlemeleri ve Organization JSON-LD logo yolu güncellemesi.
- Kalite Durumu: Build/Typecheck/Lint PASS; dev sunucu sorunsuz.
- Eksik / Delege: LCP için blur placeholders (sharp ile) bir sonraki sprintte; kalan PNG ikonları tamamen SVG’ye taşıma gözden geçirme.

## 21. Sprint 4 Kapanış Özeti
- Yapılanlar:
  - İçerik: `ContentArticle` bileşeni ile markdown section'ların tek yerden render'ı; JSON-LD Article eklenmesi.
  - Rotalar: `bize-katilin`, `insan-kaynaklari-politikamiz`, `franchising` ve diğer statik sayfaların ContentArticle'a geçirilmesi; `[slug]` sayfasının DRY edilmesi.
  - Varlıklar: `scripts/fetch-legacy-assets.mjs` optimize adımına blur placeholder üretimi eklendi; `src/lib/asset-blur-map.json` oluşturuldu ve kullanıma alındı.
  - Görseller: Grid ve banner görsellerinde `placeholder="blur"` + `blurDataURL` entegrasyonu.
  - Loader: `getPageBySlug` artık `content/{locale}/pages/` altını da tarıyor; SSG sırasında sayfalar bulunuyor.
- Kalite Durumu: Lint/Typecheck/Build PASS; lokal doğrulamada 404 problemi giderildi.
- Eksik / Delege: Küçük ikon PNG'leri için blur üretimini atlama optimizasyonu; ileri aşamada responsive `sizes`/`srcSet` iyileştirmeleri.

## 22. Sprint 5 Kapanış Özeti
- Yapılanlar:
  - Form: `BasvuruForm` bileşeni oluşturuldu (RHF + Zod); i18n ve erişilebilirlik desteği.
  - Şema: Zod şeması (name, email, phone, position?, message, consent) ve form UI eşleştirmesi.
  - API: `/api/forms/basvuru` route (Node runtime); basit IP rate limit; honeypot spam koruması.
  - UX: Form gönderim durumları ve teşekkür paneli; KVKK consent alanı linki.
  - Test: Şema doğrulamasını test eden minimal test scripti.
- Kalite Durumu: Lint/Typecheck/Build/Test PASS; manuel testler başarılı.
- Eksik / Delege: CV dosya yükleme alanı şemada var ama UI/API tarafında pasif; ileride analytics/Vercel entegrasyonu.

## 23. Sprint 6 Kapanış Özeti
- Yapılanlar:
  - SEO: Placeholder sayfalar (KVKK, Çerez) `robots: { index: false, follow: true }` ile işaretlendi.
  - UI: `PlaceholderNotice` bileşeni eklendi ve placeholder sayfalarda kullanıldı.
  - Sitemap: Placeholder sayfalar sitemap'ten hariç tutuldu.
  - CI: GitHub Actions workflow (`.github/workflows/ci.yml`) eklendi; lint/typecheck/format-check/test/build.
  - İçerik Denetimi: TR/EN içerik pariteleri kontrol edildi (22/22); tam eşleşme sağlandı.
  - Belgeler: `docs/agent-brief.md` proje kabiliyetlerini agent kullanımı için özetleyen kaynak oluşturuldu.
- Kalite Durumu: Lint/Typecheck/Build/Test PASS; tüm rotalar çalışır durumda.
- Eksik / Delege: 301 redirectler kısmen kuruldu (next.config.js); Sprint 7'de kapsamlı SEO iyileştirmeleri planlanıyor.

## 24. Sprint 7 Hedefleri (Redirects & Geniş SEO)
Amaç: Tüm eski rota yapılarına 301 redirectlerin tamamlanması ve SEO meta optimizasyonları.

Öncelikli İş Paketleri:
1. Redirect Tamamlama: Eski underscore rotalara 301 redirectlerin next.config.js'de genişletilmesi ve test edilmesi.
2. OG Image: OpenGraph görsel üretimi ve tüm sayfalara entegrasyonu.
3. Sitemap Zenginleştirme: lastmod bilgisi ve genişletilmiş changefreq/priority.
4. JSON-LD: Article şemasının tüm içerik sayfalarında tutarlılık kontrolü ve ek organizasyon verileri.
5. robots.txt: robots.txt ile sitemap URL'i ve allow/disallow kuralları.
6. Renk Sistemi: Tailwind tema renklerini güncelleyerek yeni renk paletini projeye yaygınlaştırma ve stil tutarlılığını güçlendirme.

Kalite Kriterleri:
- Manuel URL test: Eski underscore/diakritik URL'ler 301 ile yeni rotalara yönleniyor.
- Lighthouse SEO >= 95.
- Sitemap'in syntactic/semantic geçerliliği kontrol edildi.
- Yeni renklerin tüm UI bileşenlerinde tutarlı olarak uygulandığının kontrolü.
- Lint/Typecheck/Build/Test PASS.

## 25. Sprint 7 Kapanış Özeti
- Yapılanlar:
  - Redirectler: Tüm eski URL formatları için 301 kalıcı yönlendirmeleri eklendi (underscore_urls -> kebab-case).
  - SEO Utility: `src/lib/seo.ts` ile merkezi metadata ve yapılandırılmış veri üretim fonksiyonları oluşturuldu.
  - Sitemap: Sayfa önceliklendirme (priority) ve güncelleme sıklığı (changefreq) özellikleri eklendi.
  - robots.txt: User-agent, Allow/Disallow kuralları ve Sitemap URL'i eklendi.
  - JSON-LD: Organization ve Article şemaları için yapılandırılmış veri desteği eklendi.
  - İçerik Şemaları: Image desteği için genişletildi (heroSimple ve brandTeaser içeriklerinde).
- Kalite Durumu: Build/Typecheck/Lint PASS; manuel testlerde SEO bileşenleri çalışır durumda.
- Eksik / Delege: Renk sistemine ilişkin iyileştirmeler Sprint 8'e aktarıldı.

## 26. Sprint 8 Hedefleri (Performans & A11y İyileştirme)
Amaç: Sayfa yükleme süresinin kısaltılması, görsel optimizasyonları ve erişilebilirlik iyileştirmeleri.

Öncelikli İş Paketleri:
1. Lazy Image Loading: LCP (Largest Contentful Paint) öğeleri dışındaki görsellerde lazy loading optimizasyonu.
2. Image Size Optimizasyonu: Responsive `sizes` ve `srcset` ile cihaza uygun görsellerin sunulması.
3. Font Optimizasyonu: Web fontlarının subset edilmesi ve preload stratejisi.
4. Motion Tercih Kontrolü: `prefers-reduced-motion` medya sorgusuna göre animasyonların ayarlanması.
5. Erişilebilirlik İyileştirmeleri: ARIA attribute'ları ve klavye navigasyon kontrolü.
6. Component Bazlı Renk Sistem İyileştirmesi: Tailwind tema renklerinin tutarlı kullanımı.

Kalite Kriterleri:
- Lighthouse Performance >= 90
- Lighthouse Accessibility >= 95
- WebPageTest'te mobil için LCP < 2.5s, CLS < 0.1
- Klavye ile tüm işlevlere erişilebilirlik
- Motion Preference için destekleyici kod 
- Lint/Typecheck/Build/Test PASS.

## 27. Sprint 8 İlerleme Durumu
- Yapılanlar:
  - Motion Control: `usePrefersReducedMotion` hook ve yardımcı fonksiyonlar oluşturuldu.
  - Animasyon Bileşenleri: `FadeInSection`, `StaggeredMotionGroup` gibi erişilebilir animasyon bileşenleri.
  - Font Optimizasyonu: `next/font` ile fontların subset edilmesi ve önbelleğe alınması.
  - MotionProvider: Framer Motion ile prefers-reduced-motion entegrasyonu.
  - Lazy Loading: LCP olmayan görseller için lazy loading optimizasyonu.
  - Performans Bileşenleri: `LazyLoad`, `OptimizedImage` bileşenleri ile dinamik yükleme kontrolü.
  - Erişilebilirlik İyileştirmeleri:
    - Navigasyon bileşenleri için ARIA attribute'ları ve semantic HTML yapısı
    - Footer bileşeni için ARIA heading ve navigation yapıları
    - BackToTop bileşeni için erişilebilirlik iyileştirmeleri
    - Klavye navigasyonu ve odak yönetimi
    - Root layout için HTML/body erişilebilirlik özellikleri
  - Erişilebilirlik Bileşenleri ve Yardımcıları:
    - `AccessibleImage` bileşeni (alt text, aria-describedby, figure/figcaption)
    - `AccessibleFormLabel` bileşeni (required fields, help text, error messages)
    - `SkipLink` ve odak yönetimi
    - `LiveRegion` ve ekran okuyucu duyuruları için yardımcı hook
    - WCAG renk kontrastı yardımcı fonksiyonları
- Devam Eden:
  - Renk sisteminin tutarlı kullanımı
  - Ek bileşenlerin erişilebilirlik iyileştirmeleri
