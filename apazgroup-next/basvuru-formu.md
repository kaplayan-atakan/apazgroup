---
title: "Başvuru Formu"
route: "/basvuru-formu"
originalUrl: "https://www.apazgroup.com/basvuru_formu"
seo:
  title: "Kariyer Başvuru Formu | Apaz Group"
  description: "Apaz Group kariyer başvuru formu – kişisel bilgiler ve CV yükleme."
layout: "form"
form:
  id: "applicationForm"
  method: "POST"
  endpoint: "/api/forms/basvuru"
  enctype: "multipart/form-data"
  submitLabel: "Başvuruyu Gönder"
  fields:
    - name: "common_name_surname"
      label: "Ad Soyad"
      type: "text"
      required: true
      minLength: 3
    - name: "common_email"
      label: "E-Posta"
      type: "email"
      required: true
    - group: "birth_date"
      label: "Doğum Tarihi"
      fields:
        - { name: "birth_day", type: "select", options: "1..31", required: true }
        - { name: "birth_month", type: "select", options: "1..12", required: true }
        - { name: "birth_year", type: "select", options: "1944..2004", required: true }
    - name: "common_sex"
      label: "Cinsiyet"
      type: "select"
      options: ["Bay","Bayan"]
      required: true
    - name: "common_maritalStatus"
      label: "Medeni Durum"
      type: "select"
      options: ["Evli","Bekar"]
      required: true
    - name: "common_military"
      label: "Askerlik Durumu"
      type: "select"
      options: ["Yapıldı","Tecilli","Muaf"]
      required: true
    - name: "common_licence"
      label: "Ehliyet"
      type: "select"
      options: ["Yok","A1","A2","B","C","D","E","F","H"]
      required: true
    - name: "userfile"
      label: "CV (PDF)"
      type: "file"
      accept: ["application/pdf"]
      maxSizeMB: 5
      required: true
    - name: "kisiselVerilerinKorunmasi"
      label: "Kişisel Verilerin Korunması"
      type: "checkbox"
      required: true
      link: "/kisisel-verilerin-korunmasi"
    - name: "cerezPolitikasi"
      label: "Çerez Politikası"
      type: "checkbox"
      required: true
      link: "/cerez-politikasi"
validation:
  client: "React Hook Form + Zod"
  server: "Zod schema mirror"
  messages:
    invalidEmail: "Geçerli bir e-posta giriniz"
    required: "Bu alan zorunludur"
    fileType: "PDF formatında yükleyiniz"
    fileSize: "Dosya boyutu 5MB'ı geçemez"
security:
  rateLimit:
    windowSeconds: 3600
    max: 20
  antiBot: "Turnstile (opsiyonel)"
componentMapping:
  field.text: "FormTextField"
  field.select: "FormSelect"
  field.file: "FormFile"
  field.checkbox: "FormCheckbox"
  layout: "TwoColumnResponsive"
i18nPlaceholders:
  - "form.labels.name"
  - "form.labels.email"
  - "form.labels.birth"
  - "form.labels.sex"
  - "form.submit"
---
# UX Notları

- Doğum tarihi 3 ayrı select yerine tek DatePicker (mobil uyum) opsiyonel.
- Checkbox onayları yoksa disable yerine submit attempt'ta error highlight.
- Başarı sonrası:
  - Toast + teşekkür mesajı
  - Form reset
- Hata mesajları inline + üst genel özet (ARIA live region)

```ts
// Zod örneği
const ApplicationSchema = z.object({
  common_name_surname: z.string().min(3),
  common_email: z.string().email(),
  birth_day: z.string().min(1),
  birth_month: z.string().min(1),
  birth_year: z.string().min(1),
  common_sex: z.enum(["Bay","Bayan"]),
  common_maritalStatus: z.enum(["Evli","Bekar"]),
  common_military: z.enum(["Yapıldı","Tecilli","Muaf"]),
  common_licence: z.enum(["Yok","A1","A2","B","C","D","E","F","H"]),
  kisiselVerilerinKorunmasi: z.literal(true),
  cerezPolitikasi: z.literal(true),
});
```