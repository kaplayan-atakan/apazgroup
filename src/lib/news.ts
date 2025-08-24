export interface NewsItem {
  image: string;
  date: string;
  title: string;
  excerpt: string;
  link: string;
}

// Temporary static data until a real CMS/data source is plugged in
export function getLatestNews(locale: string): NewsItem[] {
  return [
    {
      image: '/news/haber-2-thumb-wide--haberler.webp',
      date: '10 AĞUSTOS 2020',
      title: 'Çalışan Memnuniyetine Önem Veriyoruz',
      excerpt: 'Apaz Group olarak çalışan memnuniyeti ve gelişimine verdiğimiz önemle sektörde fark yaratıyoruz.',
      link: `/${locale}/haberler/calisan-memnuniyeti`
    },
    {
      image: '/news/haber-1-thumb-wide--haberler.webp',
      date: '1 TEMMUZ 2020',
      title: 'Apaz Group Koronavirüs Hamleleri',
      excerpt: 'Pandemi sürecinde aldığımız önlemler ve yürüttüğümüz çalışmalarla hem çalışanlarımızı hem de müşterilerimizi koruyoruz.',
      link: `/${locale}/haberler/koronavirus-hamleleri`
    },
    {
      image: '/news/haber-4-thumb-wide--haberler.webp',
      date: '1 MART 2020',
      title: "Baydöner'e iki kardeş geldi: Pidebypide ve Bursa İshakbey",
      excerpt: 'Apaz Group ailesine katılan yeni markalarımızla büyümeye ve lezzet yolculuğumuza devam ediyoruz.',
      link: `/${locale}/haberler/yeni-markalar`
    }
  ];
}
