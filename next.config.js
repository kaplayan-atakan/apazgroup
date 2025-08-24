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
  // Application form legacy paths -> new canonical /tr/basvuru-formu
  { source: '/basvuru_formu', destination: '/tr/basvuru-formu', permanent: true },
  { source: '/tr/basvuru_formu', destination: '/tr/basvuru-formu', permanent: true },
      { source: '/apaz_group_hakkinda', destination: '/tr/apaz-group-hakkinda', permanent: true },
  // Old canonical path is now moved to direct /hakkimizda
  { source: '/tr/hakkimizda/apaz-group-hakkinda', destination: '/tr/hakkimizda', permanent: true },
  { source: '/en/hakkimizda/apaz-group-hakkinda', destination: '/en/hakkimizda', permanent: true },
  { source: '/tr/apaz-group-hakkinda', destination: '/tr/hakkimizda', permanent: true },
  { source: '/en/apaz-group-hakkinda', destination: '/en/hakkimizda', permanent: true },
  { source: '/franchising', destination: '/tr/franchising', permanent: true },
      { source: '/haberler', destination: '/tr/haberler', permanent: true },
    { source: '/iletisim', destination: '/tr/iletisim', permanent: true },
  // Canonicalize basvuru-formu to nested career path
  // Keep English redirect (if EN variant still under career nested; adjust if page added later)
  // Turkish now served directly at /tr/basvuru-formu
  { source: '/en/basvuru-formu', destination: '/en/kariyer/basvuru-formu', permanent: true },
  // Kalite page moved under /hakkimizda
  { source: '/kalite', destination: '/tr/hakkimizda/kalite', permanent: true },
  { source: '/tr/kalite', destination: '/tr/hakkimizda/kalite', permanent: true },
  { source: '/en/kalite', destination: '/en/hakkimizda/kalite', permanent: true },
  { source: '/kariyer_egitim', destination: '/tr/kariyer/kariyer-egitim', permanent: true },
  { source: '/kariyer-ve-egitim-olanaklarimiz', destination: '/tr/kariyer/kariyer-egitim', permanent: true },
  { source: '/tr/kariyer-ve-egitim-olanaklarimiz', destination: '/tr/kariyer/kariyer-egitim', permanent: true },
  { source: '/en/kariyer-ve-egitim-olanaklarimiz', destination: '/en/kariyer/kariyer-egitim', permanent: true },
  { source: '/kurum_kulturumuz_ve_etik_politikamiz', destination: '/tr/kurum-kulturumuz-ve-etik-degerlerimiz', permanent: true },
      { source: '/kurumsal_sosyal_sorumluluk_politikasi', destination: '/tr/kurumsal-sosyal-sorumluluk-politikasi', permanent: true },
  // Canonicalize to nested career section
  { source: '/olanaklar', destination: '/tr/kariyer/olanaklar', permanent: true },
  { source: '/tr/olanaklar', destination: '/tr/kariyer/olanaklar', permanent: true },
  { source: '/en/olanaklar', destination: '/en/kariyer/olanaklar', permanent: true },
  { source: '/performans', destination: '/tr/kariyer/performans', permanent: true },
  { source: '/tr/performans', destination: '/tr/kariyer/performans', permanent: true },
  { source: '/en/performans', destination: '/en/kariyer/performans', permanent: true },
  { source: '/pide_by_pide', destination: '/tr/pide-by-pide', permanent: true },
  // Canonicalize brand top-level slugs to nested paths
  { source: '/tr/pide-by-pide', destination: '/tr/markalarimiz/pide-by-pide', permanent: true },
  { source: '/en/pide-by-pide', destination: '/en/markalarimiz/pide-by-pide', permanent: true },
      { source: '/seffaflik_ve_hesap_verebilirlik', destination: '/tr/seffaflik-ve-hesap-verebilirlik', permanent: true },
  { source: '/ucret_politikamiz', destination: '/tr/kariyer/ucret-politikamiz', permanent: true },
  { source: '/tr/ucret-politikamiz', destination: '/tr/kariyer/ucret-politikamiz', permanent: true },
  { source: '/en/ucret-politikamiz', destination: '/en/kariyer/ucret-politikamiz', permanent: true },
  { source: '/yonetim', destination: '/tr/hakkimizda/yonetim', permanent: true },
  { source: '/tr/yonetim', destination: '/tr/hakkimizda/yonetim', permanent: true },
  { source: '/en/yonetim', destination: '/en/hakkimizda/yonetim', permanent: true },
  // Baydöner moved under nested brand path
  { source: '/baydoner', destination: '/tr/markalarimiz/baydoner', permanent: true },
  { source: '/tr/baydoner', destination: '/tr/markalarimiz/baydoner', permanent: true },
  { source: '/en/baydoner', destination: '/en/markalarimiz/baydoner', permanent: true },
  { source: '/bursaishakbey', destination: '/tr/bursa-ishakbey', permanent: true },
  { source: '/tr/bursa-ishakbey', destination: '/tr/markalarimiz/bursa-ishakbey', permanent: true },
  { source: '/en/bursa-ishakbey', destination: '/en/markalarimiz/bursa-ishakbey', permanent: true },
  // Canonicalize career top-level to nested
  { source: '/tr/insan-kaynaklari-politikamiz', destination: '/tr/kariyer/insan-kaynaklari-politikamiz', permanent: true },
  { source: '/en/insan-kaynaklari-politikamiz', destination: '/en/kariyer/insan-kaynaklari-politikamiz', permanent: true },
  { source: '/tr/kurum-kulturumuz-ve-etik-degerlerimiz', destination: '/tr/kariyer/kurum-kulturumuz-ve-etik-degerlerimiz', permanent: true },
  { source: '/en/kurum-kulturumuz-ve-etik-degerlerimiz', destination: '/en/kariyer/kurum-kulturumuz-ve-etik-degerlerimiz', permanent: true },
      
      // Already kebab-case paths (for completeness)
      { source: '/kisisel-verilerin-korunmasi', destination: '/tr/kisisel-verilerin-korunmasi', permanent: true },
      { source: '/cerez-politikasi', destination: '/tr/cerez-politikasi', permanent: true }
    ];
  }
};

export default nextConfig;
