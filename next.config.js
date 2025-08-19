/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: []
  },
  async redirects() {
    return [
      // Root redirect (temporary)
      { source: '/', destination: '/tr', permanent: false },
      
      // Legacy underscore to kebab-case redirects (permanent 301)
      { source: '/insan_kaynaklari_politikamiz', destination: '/tr/insan-kaynaklari-politikamiz', permanent: true },
      { source: '/bize_katilin', destination: '/tr/bize-katilin', permanent: true },
      { source: '/basvuru_formu', destination: '/tr/basvuru-formu', permanent: true },
      { source: '/apaz_group_hakkinda', destination: '/tr/apaz-group-hakkinda', permanent: true },
      { source: '/franchising', destination: '/tr/franchising', permanent: true },
      { source: '/haberler', destination: '/tr/haberler', permanent: true },
      { source: '/iletisim', destination: '/tr/iletisim', permanent: true },
      { source: '/kalite', destination: '/tr/kalite', permanent: true },
      { source: '/kariyer_egitim', destination: '/tr/kariyer-ve-egitim-olanaklarimiz', permanent: true },
      { source: '/kurum_kulturumuz_ve_etik_politikamiz', destination: '/tr/kurum-kulturumuz-ve-etik-degerlerimiz', permanent: true },
      { source: '/kurumsal_sosyal_sorumluluk_politikasi', destination: '/tr/kurumsal-sosyal-sorumluluk-politikasi', permanent: true },
      { source: '/olanaklar', destination: '/tr/olanaklar', permanent: true },
      { source: '/performans', destination: '/tr/performans', permanent: true },
      { source: '/pide_by_pide', destination: '/tr/pide-by-pide', permanent: true },
      { source: '/seffaflik_ve_hesap_verebilirlik', destination: '/tr/seffaflik-ve-hesap-verebilirlik', permanent: true },
      { source: '/ucret_politikamiz', destination: '/tr/ucret-politikamiz', permanent: true },
      { source: '/yonetim', destination: '/tr/yonetim', permanent: true },
      { source: '/baydoner', destination: '/tr/baydoner', permanent: true },
      { source: '/bursaishakbey', destination: '/tr/bursa-ishakbey', permanent: true },
      
      // Already kebab-case paths (for completeness)
      { source: '/kisisel-verilerin-korunmasi', destination: '/tr/kisisel-verilerin-korunmasi', permanent: true },
      { source: '/cerez-politikasi', destination: '/tr/cerez-politikasi', permanent: true }
    ];
  }
};

export default nextConfig;
