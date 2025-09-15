export interface PageAssetItem {
  src: string;
  alt: string;
  kind?: 'image' | 'person' | 'news';
  title?: string;
  subtitle?: string;
}

const map: Record<string, PageAssetItem[]> = {
  // HR / Bize Katılın
  'bize-katilin': [
    { src: '/hr/ik-apaz--bize-katilin.jpg', alt: 'Apaz Group - Bize Katılın' },
    { src: '/hr/ik-baydoner--bize-katilin.jpg', alt: 'Baydöner - Bize Katılın' },
    { src: '/hr/ik-pidebypide--bize-katilin.jpg', alt: 'PidebyPide - Bize Katılın' },
    { src: '/hr/ik-bursaishakbey--bize-katilin.jpg', alt: 'Bursa İshakbey - Bize Katılın' }
  ],
  // İK Politikamız (temsil görsel)
  'insan-kaynaklari-politikamiz': [
    { src: '/policies/insan-kaynaklari-politikamiz--policy.png', alt: 'İK Politikamız' }
  ],
  // Haberler (örnek thumbs)
  haberler: [
    { src: '/news/haber-1-thumb-square--haberler.png', alt: 'Haber 1', kind: 'news' },
    { src: '/news/haber-2-thumb-square--haberler.png', alt: 'Haber 2', kind: 'news' },
    { src: '/news/haber-3-thumb-square--haberler.png', alt: 'Haber 3', kind: 'news' },
    { src: '/news/haber-4-thumb-square--haberler.png', alt: 'Haber 4', kind: 'news' }
  ],
  // Yönetim (örnek ekip)
  yonetim: [
    { src: '/team/levent-yilmaz--yonetim.jpg', alt: 'Levent Yılmaz', kind: 'person', title: 'Levent Yılmaz', subtitle: 'Yönetim' },
    { src: '/team/feridun-tuncer--yonetim.jpg', alt: 'Feridun Tuncer', kind: 'person', title: 'Feridun Tuncer', subtitle: 'Yönetim' },
  { src: '/team/bulent-polat--yonetim.jpg', alt: 'Bülent Polat', kind: 'person', title: 'Bülent Polat', subtitle: 'Yönetim' },
  { src: '/team/celik_basdemir.jpg', alt: 'Çelik Başdemir', kind: 'person', title: 'Çelik Başdemir', subtitle: 'Yönetim' }
  ]
};

export function getPageAssetsForSlug(slug: string): PageAssetItem[] | null {
  return map[slug] || null;
}
