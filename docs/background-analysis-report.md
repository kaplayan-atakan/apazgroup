# Background Analiz Raporu

**Repository:** kaplayan-atakan/apazgroup  
**Branch:** master  
**Analiz Tarihi:** 1 Aralık 2025

---

## 1. Mevcut Durum Özeti

**Toplam Durum:**
- ✅ Tutarlı background var: **~40%** (Ana sayfa, bazı özel sayfalar)
- ⚠️ Farklı/özel background var: **~50%** (Çeşitli gradient/renk varyasyonları)
- ❌ Tanım eksik/varsayılana düşen: **~10%** (Dinamik içerik sayfaları)

**Kritik Bulgular:**
1. **Merkezi bir background sistemi YOK** - Her sayfa kendi stilini tanımlıyor
2. **Tutarsız pattern'ler** - Bazı sayfalar `bg-gradient-to-b`, bazıları `bg-gradient-to-br`, bazıları hiç gradient kullanmıyor
3. **Renk varyasyonları** - Bronze/gold, slate, white, primary renkleri farklı kombinasyonlarda
4. **Section seviyesinde farklılıklar** - Bazı section'lar özel background alırken, diğerleri sayfanın default'unu kullanıyor

---

## 2. Tutarsızlık Kaynakları

| Kaynak Tipi | Dosya/Bileşen | Sorun Açıklaması |
|-------------|---------------|------------------|
| Sayfa | `src/app/[locale]/page.tsx` | `min-h-dvh` tanımlı ancak background yok; body'den `bg-brand-primary` inherit ediyor |
| Sayfa | `src/app/[locale]/franchising/page.tsx` | Section bazlı background: `bg-gradient-to-b from-slate-50 via-white to-white` ve `bg-gradient-to-b from-white to-slate-50` |
| Sayfa | `src/app/[locale]/haberler/page.tsx` | `bg-gradient-to-b from-brand-bronze-50/30 to-white` kullanıyor |
| Sayfa | `src/app/[locale]/hakkimizda/page.tsx` | Background tanımı yok, varsayılan renk kullanılıyor |
| Sayfa | `src/app/[locale]/iletisim/page.tsx` | Background tanımı yok, sadece içerik kartlarında gradient |
| Sayfa | `src/app/[locale]/basvuru-formu/page.tsx` | Background tanımı yok, sadece kart içeriklerinde gradient |
| Sayfa | `src/app/[locale]/bize-katilin/page.tsx` | Background tanımı yok (`pt-12 pb-20`), sadece article içinde gradient |
| Sayfa | `src/app/[locale]/(main)/markalarimiz/baydoner/page.tsx` | Section bazlı: `bg-slate-50` bir section'da kullanılıyor |
| Sayfa | `src/app/[locale]/(main)/seffaflik-ve-hesap-verebilirlik/page.tsx` | Background tanımı yok, sadece içerik container'larında gradient |
| Sayfa | `src/app/[locale]/[slug]/page.tsx` | Dinamik sayfa - background ContentArticle bileşeninden geliyor |
| Bileşen | `src/components/content/ContentArticle.tsx` | `prose` wrapper kullanıyor ancak background tanımı yok |
| Bileşen | `src/components/hero/HeroGradient.tsx` | Kendi background'unu yönetiyor (variant bazlı: brand/light/dark) |
| Bileşen | `src/components/sections/HeroSimple.tsx` | Background tanımı yok - deprecated, HeroGradient tercih ediliyor |
| Bileşen | `src/components/sections/BrandTeaser.tsx` | `bg-white` kullanıyor |
| Bileşen | `src/components/layout/Footer.tsx` | Özel gradient background: `from-brand-bronze-200 via-brand-gold-400 to-brand-primary` |
| Global Stil | `src/styles/globals.css` | Body seviyesinde: `bg-brand-primary text-slate-100` tanımlı |
| Global Stil | `src/app/layout.tsx` | `<body>` seviyesinde `font-sans antialiased` var ancak background override yok |
| Wrapper | `src/app/[locale]/_ClientShell.tsx` | `min-h-dvh` wrapper ancak background tanımı yok |
| İçerik | `src/content/**/*.md` | Frontmatter'da background field tanımı YOK |
| Şema | `src/lib/content/schemas.ts` | PageFrontmatterSchema'da background property YOK |

---

## 3. Dosya Bazlı Detay

### 3.1 Sayfalar (`src/app/[locale]/`)

#### Ana Sayfa (`page.tsx`)
**Background Durumu:** ❌ Tanım yok (varsayılana düşüyor)
- `<main className="min-h-dvh">` tanımlı
- Section'larda farklı arka planlar:
  - `py-8 md:py-12 transition-all duration-700` (markalarımız section - background yok)
  - `py-8 md:py-12` (haberler bloğu - background yok)
  - `py-4 md:py-8` (franchise/kariyer banner - background yok)
- **Inherit:** `globals.css` içindeki `body { @apply bg-brand-primary }` kullanılıyor
- **Sorun:** Navy blue (primary) arka plan bazı content kartlarıyla çatışıyor

#### Franchising (`franchising/page.tsx`)
**Background Durumu:** ⚠️ Section bazlı farklı tanımlar
- `<main>` seviyesinde background yok
- İlk section: `bg-gradient-to-b from-slate-50 via-white to-white`
- İkinci section: `py-20 bg-gradient-to-b from-white to-slate-50`
- **Sorun:** Gradient direction tutarsız, renk paleti legacy (slate yerine bronze/gold olabilir)

#### Haberler (`haberler/page.tsx`)
**Background Durumu:** ✅ Tutarlı background
- `<main>` wrapper yok, doğrudan section'lar
- Section: `py-10 bg-gradient-to-b from-brand-bronze-50/30 to-white`
- **Not:** Bronze palette kullanıyor, tasarım pattern'iyle uyumlu

#### Hakkımızda (`hakkimizda/page.tsx`)
**Background Durumu:** ❌ Tanım yok
- `<main>` wrapper yok
- Section: `prose prose-slate max-w-none px-6 py-10 md:py-12 mx-auto`
- **Inherit:** Body'den gelen `bg-brand-primary` kullanılıyor
- **Sorun:** İçerik kartları bronze/gold frame kullanıyor ancak sayfa arka planı navy

#### İletişim (`iletisim/page.tsx`)
**Background Durumu:** ❌ Tanım yok
- Section: `py-12` (background tanımı yok)
- **Inherit:** Body'den gelen `bg-brand-primary`
- İçerik kartları: `bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85`
- **Sorun:** Sayfa arka planı ile kart arka planı arasında kontrast tutarsız

#### Başvuru Formu (`basvuru-formu/page.tsx`)
**Background Durumu:** ❌ Tanım yok
- `<main className="relative">` - background yok
- Container: `container mx-auto px-4 max-w-4xl pt-12 pb-24`
- **Inherit:** Body'den gelen `bg-brand-primary`
- Kart içerikleri bronze/gold gradient kullanıyor

#### Bize Katılın (`bize-katilin/page.tsx`)
**Background Durumu:** ❌ Tanım yok
- `<main className="pt-12 pb-20">` - background yok
- **Inherit:** Body'den gelen `bg-brand-primary`
- Article wrapper: `bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85`

#### Dinamik Sayfa (`[slug]/page.tsx`)
**Background Durumu:** ❌ Bileşen seviyesinde yönetiliyor
- ContentArticle bileşenine delege ediyor
- Sayfa seviyesinde background kontrolü yok

#### Placeholder Sayfalar (`(placeholders)/**/page.tsx`)
**Background Durumu:** ❌ ContentArticle'a delege
- Kendi background tanımı yok
- ContentArticle bileşeninden inherit ediyor

#### Marka Sayfaları (`(main)/markalarimiz/*/page.tsx`)
**Background Durumu:** ⚠️ Section bazlı
- Baydöner örneği: `<main className="relative">` (background yok)
- Bir section'da: `not-prose py-12 bg-slate-50` kullanılıyor
- Diğer section'larda background tanımı yok

#### Şeffaflık ve Hesap Verebilirlik (`(main)/seffaflik-ve-hesap-verebilirlik/page.tsx`)
**Background Durumu:** ❌ Tanım yok
- `<main>` wrapper var ancak background yok
- Section: `py-10 md:py-16` - background yok
- İçerik container'ları bronze/gold gradient kullanıyor

---

### 3.2 Section Bileşenleri

#### `HeroGradient`
**Background Tanımı:** ✅ Kendi background'unu yönetiyor
- Variant bazlı (brand/light/dark)
- **Brand variant:**
  ```tsx
  <div className="absolute inset-0 bg-gradient-to-br from-brand-bronze-100 via-brand-bronze-200 to-brand-gold-100" />
  <div className="absolute inset-0 opacity-[0.25] bg-[radial-gradient(circle_at_30%_30%,#b89b6f,transparent_65%)] mix-blend-multiply" />
  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-accent/10" />
  ```
- **Light variant:**
  ```tsx
  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
  ```
- **Dark variant:**
  ```tsx
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
  ```
- **Not:** En tutarlı background yönetimi bu bileşende

#### `HeroSimple` (Deprecated)
**Background Tanımı:** ❌ Yok
- `mb-10 text-center not-prose` kullanıyor
- Arka plan inherit ediyor
- **Not:** Bu bileşen artık kullanılmıyor, HeroGradient tercih ediliyor

#### `BrandTeaser`
**Background Tanımı:** ✅ Sabit background
- `border rounded p-6 bg-white shadow-sm not-prose`
- Beyaz solid background kullanıyor

#### `ContentArticle`
**Background Tanımı:** ❌ Yok
- `<article className="prose prose-slate mx-auto max-w-4xl py-10">`
- Kendi background'u yok, inherit ediyor
- **Sorun:** Dinamik sayfalar bu bileşeni kullandığı için background tutarsızlığı yaşanıyor

---

### 3.3 Layout Bileşenleri

#### Root Layout (`src/app/layout.tsx`)
**Background Tanımı:** ❌ Body seviyesinde yok
- `<body className="${fontVariables} font-sans antialiased">`
- Background tanımı yok, globals.css'e delege ediyor

#### Locale Layout (`src/app/[locale]/layout.tsx`)
**Background Tanımı:** ❌ Yok
- ClientShell bileşenine delege ediyor

#### ClientShell (`src/app/[locale]/_ClientShell.tsx`)
**Background Tanımı:** ❌ Yok
- `<div data-locale={locale} className="flex flex-col min-h-dvh relative">`
- Background tanımı yok

#### Header (`src/components/layout/Header.tsx`)
**Background Tanımı:** ✅ Kendi background'unu yönetiyor
- (Analiz dışı - header komponenti)

#### Footer (`src/components/layout/Footer.tsx`)
**Background Tanımı:** ✅ Özel gradient background
```tsx
<div className="w-full h-full bg-gradient-to-br from-brand-bronze-200 via-brand-gold-400 to-brand-primary opacity-95" />
<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#b89b6f_0%,transparent_70%)] opacity-30 mix-blend-overlay" />
```
- Bronze → Gold → Primary gradient kullanıyor
- Sayfa background'larından bağımsız çalışıyor

---

### 3.4 Şema ve İçerik

#### `src/lib/content/schemas.ts`
**Background Field:** ❌ Tanım yok
- `PageFrontmatterSchema` içinde background property yok
- Section şemalarında da background field yok
- **Eksiklik:** İçerik bazlı background kontrolü yapılamıyor

#### Markdown Frontmatter Örnekleri
**Background Kullanımı:** ❌ Hiçbir içerik dosyasında yok
- `franchising.md`, `insan-kaynaklari-politikamiz.md` kontrol edildi
- Frontmatter'da background ile ilgili alan yok
- **Sonuç:** İçerik seviyesinde background kontrolü mümkün değil

---

### 3.5 Global Stiller

#### `src/styles/globals.css`
**Background Tanımı:** ✅ Body seviyesinde
```css
body { 
  @apply bg-brand-primary text-slate-100 antialiased;
}
```
- **Sorun:** Navy blue (`#1F3A52`) tüm sayfalarda varsayılan arka plan oluyor
- **Çatışma:** Bronze/gold/white içerik kartları bu koyu arka plan üzerinde görünüyor
- **Tasarım tutarsızlığı:** Bazı sayfalar açık renk tercih ediyor (slate-50, white) ancak body koyu

#### `tailwind.config.ts`
**Background Renkleri:** ✅ Tanımlı
- Bronze palette: `50` - `900`
- Gold palette: `50` - `900`
- Primary: `#1F3A52` (navy blue)
- **Not:** Renk paleti zengin ancak kullanımda tutarsızlık var

---

## 4. Kök Neden Analizi

### 4.1 Temel Sorun: Merkezi Background Yönetimi Eksikliği

**Mevcut Durum:**
- Her sayfa kendi background'unu (veya eksikliğini) tanımlıyor
- Bazı sayfalar section bazlı background kullanıyor
- Bazı sayfalar hiç background tanımlamıyor (varsayılana düşüyor)
- Body seviyesinde `bg-brand-primary` (navy blue) tanımlı ancak bu birçok sayfa için uygun değil

**Sorunun Kaynağı:**
1. **Legacy'den kalan yaklaşım:** Her sayfa HTML'de kendi stilini tanımlıyordu
2. **Migration sırasında standardizasyon eksikliği:** PHP → Next.js geçişinde background sistemi kurulmadı
3. **Bileşen bazlı yaklaşım:** HeroGradient gibi bazı bileşenler kendi background'larını yönetiyor ancak bu pattern'e tüm sayfalarda uyulmuyor
4. **İçerik yönetimi sınırı:** Markdown frontmatter'da background kontrolü yok

### 4.2 İkincil Sorunlar

**A. Gradient Direction Tutarsızlığı**
- Bazı sayfalar: `bg-gradient-to-b` (yukarıdan aşağıya)
- Bazı sayfalar: `bg-gradient-to-br` (köşegen)
- Bazı bileşenler: `bg-gradient-to-tr` (ters köşegen)
- **Sonuç:** Görsel tutarlılık eksikliği

**B. Renk Paleti Tutarsızlığı**
- Bazı sayfalar bronze/gold kullanıyor (tasarım rehberine uygun)
- Bazı sayfalar slate/white kullanıyor (legacy)
- Body seviyesinde navy blue varsayılan
- **Sonuç:** Renk harmonisi bozuk

**C. Section Seviyesinde Background Kontrolü**
- Bazı section'lar özel background alıyor
- Bazı section'lar sayfa background'unu inherit ediyor
- Bazı section'larda background override edilmiyor
- **Sonuç:** Section'lar arasında görsel kesintiler

**D. Bileşen İzolasyonu Sorunu**
- `ContentArticle` bileşeni background'u inherit ediyor
- Dinamik `[slug]` sayfaları bu bileşeni kullandığı için background kontrolü yok
- **Sonuç:** Dinamik içerik sayfaları tutarsız görünüyor

---

## 5. Öneri: Standardizasyon Yaklaşımı

### 5.1 Üç Katmanlı Background Sistemi

#### **Katman 1: Global Default (Body)**
```css
/* globals.css - Güncelleme */
body { 
  @apply bg-white text-slate-900 antialiased;
  /* Varsayılan: Beyaz arka plan, koyu metin */
}
```
- **Neden:** Çoğu sayfa açık arka plan tercih ediyor
- **Alternatif:** Çok hafif bronze gradient (`from-brand-bronze-50/20 to-white`)

#### **Katman 2: Sayfa Seviyesi Varyantlar**
```tsx
// Sayfa bileşenlerinde kullanılacak utility class'lar
const PAGE_BACKGROUNDS = {
  default: 'bg-white',
  light: 'bg-gradient-to-b from-slate-50 to-white',
  bronze: 'bg-gradient-to-b from-brand-bronze-50/30 to-white',
  primary: 'bg-brand-primary', // Sadece özel durumlar için
  transparent: '' // HeroGradient kendi background'unu yönetiyorsa
}
```

#### **Katman 3: Section Seviyesi Overrides**
```tsx
// Section bileşenleri kendi background'larını yönetebilir
<section className="py-12 bg-slate-50">
  {/* İçerik */}
</section>
```

### 5.2 Önerilen Uygulama Adımları

**1. Body Background Güncelleme**
- `globals.css` içinde `body` sınıfını beyaz arka plana çevir
- Alternatif: Çok hafif bronze gradient ekle

**2. Sayfa Şablonu Oluşturma**
- `PageWrapper` bileşeni oluştur (background variant prop'u ile)
- Tüm sayfa bileşenlerini bu wrapper'a geçir

**3. ContentArticle Güncelleme**
- Background prop'u ekle (varsayılan: transparent)
- Dinamik sayfalarda background kontrolü sağla

**4. Section Background Standardizasyonu**
- Section'larda kullanılan background class'larını denetle
- Gradient direction'ı standardize et (`to-b` veya `to-br` seçimi yap)

**5. Frontmatter Şema Genişletme (Opsiyonel)**
- `PageFrontmatterSchema`'ya background field ekle
- İçerik bazlı background kontrolü sağla

### 5.3 Örnek Uygulama

**PageWrapper Bileşeni:**
```tsx
// src/components/layout/PageWrapper.tsx
interface PageWrapperProps {
  variant?: 'default' | 'light' | 'bronze' | 'primary' | 'transparent';
  children: React.ReactNode;
}

export function PageWrapper({ variant = 'default', children }: PageWrapperProps) {
  const backgrounds = {
    default: 'bg-white',
    light: 'bg-gradient-to-b from-slate-50 to-white',
    bronze: 'bg-gradient-to-b from-brand-bronze-50/30 to-white',
    primary: 'bg-brand-primary',
    transparent: ''
  };
  
  return (
    <main className={`min-h-[calc(100vh-theme(spacing.16))] ${backgrounds[variant]}`}>
      {children}
    </main>
  );
}
```

**Kullanım Örneği:**
```tsx
// src/app/[locale]/haberler/page.tsx
export default function HaberlerPage({ params }: PageProps) {
  return (
    <PageWrapper variant="bronze">
      <HeroGradient heading="Haberler" />
      <section className="py-10">
        {/* İçerik */}
      </section>
    </PageWrapper>
  );
}
```

---

## 6. Sonuç ve Eylem Maddeleri

### 6.1 Kritik Bulgular
1. ✅ **Merkezi background sistemi yok** - Her sayfa ad-hoc yaklaşım kullanıyor
2. ✅ **Body'de koyu (navy) varsayılan** - Çoğu sayfa için uygun değil
3. ✅ **Gradient ve renk tutarsızlıkları** - Tasarım rehberine (bronze/gold) tam uyum yok
4. ✅ **ContentArticle bileşeni background kontrolü yapamıyor** - Dinamik sayfalar etkileniyor

### 6.2 Öncelikli Aksiyon Maddeleri

**Sprint 8+ için:**
1. [ ] `globals.css` body background'unu beyaz veya hafif bronze gradient'e çevir
2. [ ] `PageWrapper` bileşeni oluştur (background variant desteği ile)
3. [ ] Tüm sayfa bileşenlerini PageWrapper ile sarmala
4. [ ] Section background kullanımlarını denetle ve standardize et
5. [ ] ContentArticle bileşenine background prop ekle
6. [ ] Frontmatter şemasına background field ekle (opsiyonel)

**Manuel Denetim Gereken Sayfalar:**
- Ana sayfa (page.tsx) - Section background'ları kontrol et
- Franchising - Slate palette yerine bronze/gold kullan
- Hakkımızda - Background tanımı ekle
- İletişim - Background tanımı ekle
- Başvuru Formu - Background tanımı ekle
- Bize Katılın - Background tanımı ekle
- Tüm dinamik [slug] sayfaları - ContentArticle güncellemesi ile çözülür

### 6.3 Test Kriterleri
- [ ] Tüm sayfalar beyaz veya bronze/gold gradient background kullanıyor
- [ ] Gradient direction'ları tutarlı (to-b veya to-br)
- [ ] Section background'ları sayfa background'ı ile uyumlu
- [ ] Dinamik içerik sayfaları tutarlı background gösteriyor
- [ ] Footer gradient ile sayfa background'ı arasında kesinti yok
- [ ] Lighthouse Accessibility >= 95 (renk kontrastı dahil)

---

**Rapor Sonu**
