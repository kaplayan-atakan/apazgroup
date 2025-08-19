# Proje: Apaz Group Web Sitesi Next.js Yeniden İnşası

Bu doküman, mevcut PHP tabanlı (muhtemelen klasik server-rendered + statik HTML) Apaz Group web sitesinin (https://www.apazgroup.com/) modern bir Next.js (App Router) mimarisiyle yeniden inşa edilmesi için yönergeleri içerir. Amaç; tasarım, içerik hiyerarşisi, UX akışı ve fonksiyonları koruyup geliştirirken; sürdürülebilir, komponent tabanlı, çok dilli (TR/EN), erişilebilir ve SEO uyumlu bir yapı kurmaktır.

---

## 1. Genel Mimarî

- Framework: Next.js 14+ (App Router)
- Dil: TypeScript
- Styling:
  - Temel: Tailwind CSS + CSS Modules (gerekirse)
  - Animasyon / geçişler: Framer Motion (opsiyonel)
- UI Primitives: Headless UI / Radix UI (menü, dialog vs.)
- Form Yönetimi: React Hook Form + Zod şema validasyonu
- Çok Dillilik (i18n): next-intl veya kendi middleware tabanlı çözüm ("/tr", "/en" prefix)
- SEO / Meta: next/metadata + dinamik OpenGraph
- Görseller: next/image (statik optimize)
- İkonlar: react-icons (Ionicons, Linear Icons eşleştirilir)
- Haritalar: Google Maps embed yerine ileride Leaflet / Static Map opsiyonu (şimdilik embed korunur)
- Deployment: Vercel (önerilir)
- CMS (isteğe bağlı gelecek faz): Contentlayer veya Headless CMS (Strapi / Sanity)
- Form İşlemleri:
  - Başvuru formu ve (ileride) iletişim formları için API route + server action
  - Dosya yükleme (CV) — storage stratejisi: (1) geçici olarak /tmp + mail atma, (2) kalıcı S3 bucket (ileriki faz)
  - Bot koruması: hCaptcha / Cloudflare Turnstile (V1’de opsiyonel)

---

## 2. Proje Yapısı (Öneri)

```
/src
  /app
    /(public)
      /[locale]
        /(site)
          /layout.tsx
          /page.tsx                -> Anasayfa
          /franchising/page.tsx
          /insan-kaynaklari-politikamiz/page.tsx
          /bize-katilin/page.tsx
          /basvuru-formu/page.tsx
          /kisisel-verilerin-korunmasi/page.tsx   (placeholder)
          /cerez-politikasi/page.tsx              (placeholder)
    /api
      /forms
        /basvuru/route.ts
  /components
    /layout
    /navigation
    /ui
    /forms
    /brand
  /lib
    seo.ts
    i18n.ts
    formSchemas.ts
  /styles
    globals.css
    tailwind.css
  /content
    /tr
      franchising.md
      ...
    /en
      franchising.md (çeviri)
```

---

## 3. Komponent Hiyerarşisi

| Bölüm | Komponent | Açıklama |
|-------|-----------|----------|
| Header | `<MainNav />` | Çok seviyeli menü (dropdown) |
| Mobil Menü | `<MobileOffcanvas />` | Off-canvas overlay |
| Dil Seçici | `<LanguageSwitcher />` | /tr /en prefix route |
| Slider / Hero | `<HeroVideo />` | Video / fallback görsel |
| İçerik Bölümü | `<Section />` | Başlık + grid/stack |
| Kartlar | `<BrandCard />`, `<NewsCard />` | Tekilleştirilmiş |
| Site Haritası | `<FooterSitemap />` | Footer link kolonları |
| Footer | `<Footer />` | Sosyal + tel + mail |
| Formlar | `<ApplicationForm />` | React Hook Form + Zod |
| Form Alanları | `<FormField />` | Generic wrapper |
| Alert / Toast | `<FormStatus />` | Başarı / hata mesajları |
| Layout | `<RootLayout />`, `<SiteLayout />` | i18n + meta + theme |

---

## 4. Stil & Tasarım Notları

Orijinal sitedeki önemli görsel özellikler:

- Menüler “white_menu” – şeffaf / overlay stil
- Geniş tipografi başlıklar (Heebo / Oswald benzeri) — Google Fonts: Heebo + Oswald kullanılabilir
- Grid kullanımı: 3 sütun (markalar), 4 sütun (haberler)
- Renk Paleti (çıkarım):
  - Koyu Mavi / Lacivert (#263a4f benzeri)
  - Vurgu Sarı-Yeşil (#cee002)
  - Bordo / Kırmızı (#9d223c - alert)
  - Yeşil (#00a65a - success)
  - Gri tonları (#B2B2B2, #666666)
- Tailwind’de theme extend:

```ts
colors: {
  brand: {
    primary: '#263a4f',
    accent: '#cee002',
    danger: '#9d223c',
    success: '#00a65a',
    gray: {
      100: '#f5f5f5',
      300: '#B2B2B2',
      600: '#666666'
    }
  }
}
```

---

## 5. İçerik & Sayfa MD Dosyaları

Bu dokümanla birlikte her sitemap sayfası için bir `*.md` içerik dosyası sağlandı. İçerik dosyalarının amacı:

- Geliştiriciye hangi bölümlerin hangi sırayla geldiğini bildirmek
- Metinlerin çeviri / CMS soyutlamasına hazır olması
- Görsel / medya varlıklarının yer tutucularla işaretlenmesi
- SEO başlık & açıklama önerisi
- Bileşen eşlemesi (componentMapping alanı)

Gelecekte Contentlayer entegrasyonu ile bu MD’ler tip güvenli veri kaynağına dönüşebilir.

---

## 6. URL / Route Dönüşümleri

| Orijinal URL | Yeni Next.js Route | Not |
|--------------|-------------------|-----|
| / | /[locale] | Varsayılan /tr yönlendirme |
| /franchising | /[locale]/franchising | İçerik aynen |
| /insan_kaynaklari_politikamiz | /[locale]/insan-kaynaklari-politikamiz | Kebab-case |
| /bize_katilin | /[locale]/bize-katilin | |
| /basvuru_formu | /[locale]/basvuru-formu | Form |
| /kisisel-verilerin-korunmasi | /[locale]/kisisel-verilerin-korunmasi | İçerik yok -> placeholder |
| /cerez-politikasi | /[locale]/cerez-politikasi | İçerik yok -> placeholder |

Not: Orijinalde underscore kullanılan rotalar, Next.js tarafında SEO uyumluluğu için tire (-) ile normalize edildi (redirect ayarlanmalı).

---

## 7. Redirect Stratejisi

`next.config.js` içinde:

```js
async redirects() {
  return [
    { source: '/insan_kaynaklari_politikamiz', destination: '/tr/insan-kaynaklari-politikamiz', permanent: true },
    { source: '/bize_katilin', destination: '/tr/bize-katilin', permanent: true },
    { source: '/basvuru_formu', destination: '/tr/basvuru-formu', permanent: true },
  ];
}
```

---

## 8. Form (Başvuru Formu) Gereksinimleri

Alanlar (zorunluluk + validasyon):

| Alan | name | Tip | Validasyon |
|------|------|-----|------------|
| Ad Soyad | common_name_surname | text | min 3 |
| E-Posta | common_email | email | pattern |
| Doğum Günü | birth_day | select | required |
| Doğum Ayı | birth_month | select | required |
| Doğum Yılı | birth_year | select | required |
| Cinsiyet | common_sex | select | required |
| Medeni Durum | common_maritalStatus | select | required |
| Askerlik | common_military | select | required (erkek?) |
| Ehliyet | common_licence | select | required |
| CV | userfile | file (pdf) | mime/pdf max 5MB |
| KVKK Onay | kisiselVerilerinKorunmasi | checkbox | required |
| Çerez Onay | cerezPolitikasi | checkbox | required |

Sunucu yanıtı:
- Başarılı -> JSON { ok: true }
- Hata -> JSON { ok: false, fieldErrors?, message }

Server-side:
- Zod şeması
- Rate limiting (IP başına)
- File handling (multer veya formidable) — ilk iterasyonda opsiyonel / disable

---

## 9. Erişilebilirlik (A11y)

- Form alanlarına `<label htmlFor>` eşleşmeleri
- Dil değişiminde `<html lang="tr">`
- Navigasyon dropdown: klavye erişimi (ArrowDown, Escape)
- Renk kontrastı (WCAG AA)
- Görsel alt metinleri (logo, marka görselleri)

---

## 10. Performans

- Görseller optimize (next/image)
- Video lazy load / poster fallback
- CSS kritik boyut < 100KB (Tailwind tree-shake)
- Lighthouse hedef skorları: Performance >90, A11y >95, SEO >95

---

## 11. Güvenlik

- Form endpoint CSRF’den korunmak için (same-site cookie + token) — V2
- Dosya yükleme MIME doğrulama
- Header setleri (Vercel default + ek: Content-Security-Policy (rapor modunda başla))

---

## 12. Geliştirme Süreci (Öneri Sprint Sırası)

1. Proje iskeleti + Tailwind + i18n
2. Layout, Header, Footer
3. Anasayfa bölümleri (Hero -> Markalar -> Haberler -> Franchise/Kariyer blokları)
4. Statik içerik sayfaları (franchising, insan kaynakları…)
5. Başvuru formu (frontend + API)
6. Placeholder (kvkk, çerez)
7. Redirect / SEO / sitemap.xml jenerasyonu
8. Testler (Playwright snapshot + jest unit)
9. Performans / A11y incelemesi
10. Deploy

---

## 13. Otomasyon

- Pre-commit: ESLint + Prettier + Type-check
- CI Pipeline (GitHub Actions):
  - install -> typecheck -> lint -> build -> (preview deploy)
- Dependabot: haftalık

---

## 14. Sitemap & Robots

`/app/sitemap.ts` dinamik üretilecek (content kaynaklı). `robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://www.apazgroup.com/sitemap.xml
```

---

## 15. Bu Depoda Sağlanan MD İçerikleri

Aşağıdaki md dosyaları içeriğin çıkarılmış, normalize edilmiş, bölümlere ayrılmış halidir:

- index.md
- franchising.md
- insan-kaynaklari-politikamiz.md
- bize-katilin.md
- basvuru-formu.md
- kisisel-verilerin-korunmasi.md (placeholder)
- cerez-politikasi.md (placeholder)

Her dosyada:
- Frontmatter
- İçerik blokları (sections[])
- componentMapping
- seo
- i18nPlaceholders

---

## 16. Eksik İçerik / Varsayımlar

- KVKK ve Çerez politikası sayfaları kaynakta sağlanmadı — placeholder üretildi.
- Haberler ve diğer alt sayfalar (haber1, haber2 vs.) sitemap.xml’de yok; ileride eklenebilir.
- Video kaynağı: `apaz.mp4` — static/public’e taşınacak.
- Logolar / img path: `public/images/...` altına yeniden isimlendirilmeli (kebab-case).

---

## 17. Sonraki Faz Önerileri

- Headless CMS entegrasyonu (marka bilgileri, haberler, politika metinleri)
- Arama (Algolia / meilisearch)
- Kariyer başvurularını ATS entegrasyonuna aktarma
- Görsel CDN (Image Optimization default + Cloudflare Images opsiyonel)

---

## 18. Geliştirici Notları

- Tasarımı piksele birebir kopyalamak yerine komponent esnekliği önceliklendirilmeli.
- Çok satırlı statik paragraflar parçalanıp çeviri anahtarlarına bölünmeli.
- Form hataları Türkçe + İngilizce çeviri desteği almalı.
- Rotalarda tire standardizasyonu SEO açısından tercih edildi.

---

İyi çalışmalar. Aşağıdaki md sayfa dosyaları uygulanacak kaynaklar olarak kullanılacaktır.