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
      image: '/news/haber-4-thumb-wide--haberler.webp',
      date: '1 MART 2020',
      title: "Baydöner'e iki kardeş geldi: Pidebypide ve Bursa İshakbey",
      excerpt: 'Apaz Group ailesine katılan yeni markalarımızla büyümeye ve lezzet yolculuğumuza devam ediyoruz.',
      link: `/${locale}/haberler/yeni-markalar`
    }
  ];
}
