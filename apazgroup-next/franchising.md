---
title: "Franchising"
route: "/franchising"
originalUrl: "https://www.apazgroup.com/franchising"
seo:
  title: "Franchising | Apaz Group"
  description: "Baydöner, Bursa İshakbey ve PidebyPide franchise yatırım fırsatları."
layout: "content"
sections:
  - type: "prose"
    heading: "Franchising"
    paragraphs:
      - "Apaz Group olarak, Türk mutfağına hak ettiği değeri verme vizyonuyla çalışmalarımızı sürdürüyoruz. İstikrarlı bir şekilde büyüyoruz."
      - "Franchise şubelerimize açılış hazırlıkları öncesi ve sonrası yoğun destek sağlanır."
      - "Destek Alanları: Ürün inovasyonu, pazarlama, satın alma, lojistik, eğitim, insan kaynakları, operasyon, kalite kontrol."
      - "Baydöner: İskender severlerin tercih ettiği lider marka – yeni iller + mevcut illerde ölçek büyütme planı."
      - "Bursa İshakbey: Self servis, uygun fiyat & doyurucu menüler – şube yatırımları devam ediyor."
      - "PidebyPide: Hızlı ve doyurucu pide konsepti – franchise modeliyle cazip fırsatlar."
      - "Cazip yatırım modelleri için iletişim kanallarımızdan ulaşabilirsiniz."
  - type: "franchiseGrid"
    heading: "Sizde Hemen Başvurun…"
    brands:
      - name: "PidebyPide"
        image: "/images/brands/pidebypide-card.png"
        href: "https://www.pidebypide.com/franchise"
      - name: "Baydöner"
        image: "/images/brands/baydoner-card.png"
        href: "https://baydoner.com/hakkimizda/franchising"
      - name: "Bursa İshakbey"
        image: "/images/brands/bursa-ishakbey-card.png"
        href: "https://bursaishakbey.com/franchise"
design:
  layout: "centered"
  spacing: "comfortable"
componentMapping:
  prose: "RichTextSection"
  franchiseGrid: "FranchiseBrandGrid"
i18nPlaceholders:
  - "franchising.intro.0"
  - "franchising.supportAreas"
  - "franchising.brands.pideby"
  - "franchising.cta"
---
# Teknik Notlar

- İlk paragraf bloğu `<RichTextSection>` içinde markdown parse edilebilir.
- Franchise grid 3 sütun (md:2, sm:1).
- Dış bağlantılar noopener noreferrer.

```
CTA buton stili: variant=outline-accent
```