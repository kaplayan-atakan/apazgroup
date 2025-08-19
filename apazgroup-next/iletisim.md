---
title: "İletişim"
route: "/iletisim"
originalUrl: "https://www.apazgroup.com/iletisim"
seo:
  title: "İletişim | Apaz Group"
  description: "Adres, telefon ve iletişim formu."
layout: "form"
hero:
  heading: "İletişim"
contact:
  company: "Apaz Group"
  address: "Adalet Mah. Anadolu Cad. No:41/201 Kat:20 Megapol Tower Bayraklı / İzmir"
  phone: "+90 232 464 42 35"
  fax: "+90 232 464 42 36"
  email: "info@apazgroup.com"
  mapEmbed: true
form:
  id: "contactForm"
  endpoint: "/api/forms/iletisim"
  method: "POST"
  submitLabel: "Gönder"
  fields:
    - { name: "ad_soyad", label: "Ad Soyad", type: "text", required: true, minLength: 3 }
    - { name: "email", label: "Email", type: "email", required: true }
    - { name: "telefon", label: "Telefon", type: "tel", required: true }
    - { name: "konu", label: "Konu", type: "text", required: true }
    - { name: "mesaj", label: "Mesaj", type: "textarea", required: true, minLength: 5 }
    - { name: "kisiselVerilerinKorunmasi", label: "Kişisel Verilerin Korunması", type: "checkbox", required: true, link: "/kisisel-verilerin-korunmasi" }
    - { name: "cerezPolitikasi", label: "Çerez Politikası", type: "checkbox", required: true, link: "/cerez-politikasi" }
validation:
  rules:
    mesajMax: 5000
componentMapping:
  form: "ContactForm"
i18nPlaceholders:
  - "contact.form.name"
  - "contact.form.subject"
  - "contact.form.message"
---
# Notlar

- Telefon input pattern: `^[0-9 +()-]{7,20}$`
- Map embed lazy load (Intersection Observer).