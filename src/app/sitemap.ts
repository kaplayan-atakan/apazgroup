import { getAllPages, getAllNews } from '../lib/content';
import { locales } from '../lib/i18n';

// Define priority levels for different types of pages
type PagePriority = {
  slug: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
};

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  // Exclude placeholder pages from the sitemap (they are set to robots: noindex)
  const EXCLUDED_SLUGS = new Set(['cerez-politikasi', 'kisisel-verilerin-korunmasi', 'hakkimizda/yonetim']);
  
  // Define priorities for specific pages (canonical slugs)
  const PAGE_PRIORITIES: Record<string, PagePriority> = {
    'index': { slug: 'index', priority: 1.0, changefreq: 'weekly' },
    'franchising': { slug: 'franchising', priority: 0.9, changefreq: 'monthly' },
    'basvuru-formu': { slug: 'basvuru-formu', priority: 0.9, changefreq: 'monthly' },
    'bize-katilin': { slug: 'bize-katilin', priority: 0.9, changefreq: 'monthly' },
    'iletisim': { slug: 'iletisim', priority: 0.9, changefreq: 'monthly' },
    'haberler': { slug: 'haberler', priority: 0.8, changefreq: 'weekly' },
    'baydoner': { slug: 'markalarimiz/baydoner', priority: 0.8, changefreq: 'monthly' },
    'pide-by-pide': { slug: 'markalarimiz/pide-by-pide', priority: 0.8, changefreq: 'monthly' },
    'bursa-ishakbey': { slug: 'markalarimiz/bursa-ishakbey', priority: 0.8, changefreq: 'monthly' },
  // About
  'hakkimizda': { slug: 'hakkimizda', priority: 0.8, changefreq: 'monthly' },
  'kalite': { slug: 'hakkimizda/kalite', priority: 0.7, changefreq: 'monthly' },
  // Career
  'insan-kaynaklari-politikamiz': { slug: 'kariyer/insan-kaynaklari-politikamiz', priority: 0.7, changefreq: 'monthly' },
  'ucret-politikamiz': { slug: 'kariyer/ucret-politikamiz', priority: 0.7, changefreq: 'monthly' },
  'performans': { slug: 'kariyer/performans', priority: 0.7, changefreq: 'monthly' },
  'olanaklar': { slug: 'kariyer/olanaklar', priority: 0.7, changefreq: 'monthly' },
  'kariyer-ve-egitim-olanaklarimiz': { slug: 'kariyer/kariyer-egitim', priority: 0.7, changefreq: 'monthly' },
  };
  
  // Default values for pages not explicitly listed
  const DEFAULT_PRIORITY = 0.7;
  const DEFAULT_CHANGEFREQ = 'monthly' as const;
  
  // Generate lastModified date (using build date for all pages)
  // In a production environment, this could be replaced with actual content modification dates
  const lastModified = new Date().toISOString();

  type SitemapEntry = {
    url: string;
    lastModified: string;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
  };
  
  const entries: SitemapEntry[] = [];
  // Removed / archived news slugs to exclude explicitly
  const EXCLUDED_NEWS = new Set<string>([
    '2024-08-19-paylasmak-bizde-gelenektir',
    '2020-08-10-calisan-memnuniyeti',
    '2020-07-01-koronavirus-hamleleri'
  ]);

  // Add locale-specific pages
  for (const locale of locales) {
    const seen = new Set<string>();

    // 1) Always include canonical entries defined in PAGE_PRIORITIES
    for (const key of Object.keys(PAGE_PRIORITIES)) {
      const prio = PAGE_PRIORITIES[key] as PagePriority | undefined;
      if (!prio) continue;
      const routeSlug = prio.slug; // already canonicalized (may be nested)
      if (EXCLUDED_SLUGS.has(routeSlug)) continue;
      const url = `${base}/${locale}/${routeSlug}`;
      entries.push({
        url,
        lastModified,
        changeFrequency: prio.changefreq,
        priority: prio.priority
      });
      seen.add(routeSlug);
    }

  // 2) Include remaining content pages not explicitly prioritized
    const pages = getAllPages(locale)
      .filter((p) => !EXCLUDED_SLUGS.has(p.slug))
      .filter((p) => !p.slug.startsWith('hakkimizda/yonetim'));
    for (const page of pages) {
      const routeSlug = PAGE_PRIORITIES[page.slug]?.slug || page.slug;
      if (seen.has(routeSlug)) continue; // avoid duplicates
      const prio = PAGE_PRIORITIES[page.slug] || { priority: DEFAULT_PRIORITY, changefreq: DEFAULT_CHANGEFREQ };
      entries.push({
        url: `${base}/${locale}/${routeSlug}`,
        lastModified,
        changeFrequency: prio.changefreq,
        priority: prio.priority
      });
      seen.add(routeSlug);
    }
    // 3) Include news items (under /haberler/{slug}) except excluded
    const newsDocs = getAllNews(locale).filter(n => !EXCLUDED_NEWS.has(n.slug));
    for (const n of newsDocs) {
      const url = `${base}/${locale}/haberler/${n.slug}`;
      entries.push({
        url,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.6
      });
    }
  }
  
  // Add root URL that redirects to default locale
  entries.push({
    url: `${base}/`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 1.0
  });
  
  return entries;
}
