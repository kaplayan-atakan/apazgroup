---
title: "Apaz Group - Anasayfa"
route: "/"
localeDefault: "tr"
originalUrl: "https://www.apazgroup.com/"
layout: "site"
seo:
  title: "Apaz Group | Türk Mutfağı Markaları"
  description: "Baydöner, PidebyPide ve Bursa İshakbey ile Türkiye genelinde yenilikçi ve kaliteli restoran deneyimi."
  openGraph:
    type: "website"
    images:
      - "/og/hero.jpg"
keywords:
  - Apaz Group
  - Baydöner
  - PidebyPide
  - Bursa İshakbey
  - Franchise
design:
  themeVideo: true
  primaryColors: ["#263a4f", "#cee002"]
  accentColors: ["#9d223c", "#00a65a"]
hero:
  type: "video"
  src: "/media/apaz.mp4"
  fallbackImage: "/images/hero-fallback.jpg"
  overlay: true
  heading: "Dünyaca Ünlü Markalarımızı, Sevenleriyle Buluşturuyoruz!"
navigation:
  menu:
    - label: "Hakkımızda"
      children:
        - { label: "Yönetim", href: "/yonetim" }
        - { label: "Apaz Group Hakkında", href: "/apaz-group-hakkinda" }
        - { label: "Kalite", href: "/kalite" }
        - { label: "Haberler", href: "/haberler" }
        - { label: "Kurumsal Sosyal Sorumluluk", href: "/kurumsal-sosyal-sorumluluk-politikasi" }
        - { label: "Şeffaflık ve Hesap Verebilirlik", href: "/seffaflik-ve-hesap-verebilirlik" }
    - label: "Markalarımız"
      children:
        - { label: "Baydöner", href: "/baydoner" }
        - { label: "Pide by Pide", href: "/pide-by-pide" }
        - { label: "Bursa İshakbey", href: "/bursa-ishakbey" }
    - { label: "Franchising", href: "/franchising" }
    - { label: "Kariyer", href: "/insan-kaynaklari-politikamiz" }
    - { label: "İletişim", href: "/iletisim" }
sections:
  - id: "brands-grid"
    type: "brandGrid"
    heading: "Türkiye’nin her yerinde…"
    items:
      - slug: "pide-by-pide"
        name: "PidebyPide"
        image: "/images/brands/pidebypide-main.jpg"
        summary: "Günlük taze hamurdan, bol malzemeli pide deneyimi."
        href: "/pide-by-pide"
      - slug: "baydoner"
        name: "Baydöner"
        image: "/images/brands/baydoner-main.jpg"
        summary: "İskender alanında geniş şube ağı ve kalite standardı."
        href: "/baydoner"
      - slug: "bursa-ishakbey"
        name: "Bursa İshakbey"
        image: "/images/brands/bursaishakbey-main.jpg"
        summary: "Self servis İskender konseptiyle hızlı ve doyurucu."
        href: "/bursa-ishakbey"
  - id: "about-teaser"
    type: "splitContent"
    heading: "Apaz Hakkında"
    body:
      - "2007 yılında İzmir’de kurulan Apaz Group, Baydöner ile başladığı yolculuğunda iki yeni marka daha ekledi."
      - "2018: PidebyPide"
      - "2019: Bursa İshakbey"
      - "Yerel lezzetleri doğru hizmet ve fiyat anlayışıyla buluşturuyor."
    ctas:
      - { label: "HAKKIMIZDA", href: "/apaz-group-hakkinda" }
      - { label: "BİZDEN HABERLER", href: "/haberler" }
  - id: "news-carousel"
    type: "carousel"
    heading: "Haberler"
    items:
      - { title: "Apaz Group Koronavirüs Hamleleri", date: "2020-07-01", image: "/images/news/haber1-244.jpg", href: "/haber1" }
      - { title: "Çalışan Memnuniyetine Önem Veriyoruz", date: "2020-08-10", image: "/images/news/haber2-244.jpg", href: "/haber2" }
      - { title: "En Etkili 50 CEO / Bülent Polat", date: "2020-01-14", image: "/images/news/haber3-244.jpg", href: "/haber3" }
      - { title: "Baydöner’e iki kardeş geldi", date: "2020-03-01", image: "/images/news/haber4-244.jpg", href: "/haber4" }
  - id: "dual-banners"
    type: "twoUp"
    blocks:
      - key: "franchise"
        heading: "APAZ FRANCHISE"
        body: "Türk mutfağı vizyonu ile büyüyen yapı – yeni yatırım fırsatları."
        cta: { label: "Git ...", href: "/franchising" }
      - key: "career"
        heading: "APAZ KARİYER"
        body: "Ekip çalışması, gelişim ve samimi iş kültürü."
        ctas:
          - { label: "Git ...", href: "/insan-kaynaklari-politikamiz" }
          - { label: "Başvuru ...", href: "/bize-katilin" }
footer:
  columns:
    - title: "Site Haritası"
      links:
        - { label: "Hakkımızda", href: "/apaz-group-hakkinda" }
        - { label: "Franchising", href: "/franchising" }
        - { label: "Kariyer", href: "/insan-kaynaklari-politikamiz" }
        - { label: "İletişim", href: "/iletisim" }
    - title: "Markalarımız"
      links:
        - { label: "Baydöner", href: "/baydoner" }
        - { label: "Pide by Pide", href: "/pide-by-pide" }
        - { label: "Bursa İshakbey", href: "/bursa-ishakbey" }
    - title: "Diğer"
      links:
        - { label: "Kişisel Verilerin Korunması", href: "/kisisel-verilerin-korunmasi" }
        - { label: "Bilgi Toplumu Hizmetleri", href: "/bilgi-toplumu-hizmetleri" }
componentMapping:
  hero: "HeroVideo"
  brandGrid: "BrandGrid"
  splitContent: "SplitSection"
  carousel: "NewsCarousel"
  twoUp: "DualBanner"
i18nPlaceholders:
  - "hero.heading"
  - "about.teaser.body.0"
  - "brands.pideby.title"
  - "franchise.banner.heading"
  - "career.banner.heading"
---

# İçerik Tasarım Notları

- Hero video autoplay + mute + loop (mobilde fallback).
- Carousel responsive: 1 / 2 / 3 / 4 kırılım.
- Haber kartları: title max 2 satır, excerpt 3 satır (line-clamp).
- CTA butonları Tailwind varyant: `btn btn-outline-accent`.

```tsx
// Örnek component pseudo
<HeroVideo src="/media/apaz.mp4" heading={t('hero.heading')} overlay gradient />
```