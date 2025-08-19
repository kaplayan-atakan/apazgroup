import { getAllPages } from '../lib/content';
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
  const EXCLUDED_SLUGS = new Set(['cerez-politikasi', 'kisisel-verilerin-korunmasi']);
  
  // Define priorities for specific pages
  const PAGE_PRIORITIES: Record<string, PagePriority> = {
    'index': { slug: 'index', priority: 1.0, changefreq: 'weekly' },
    'franchising': { slug: 'franchising', priority: 0.9, changefreq: 'monthly' },
    'basvuru-formu': { slug: 'basvuru-formu', priority: 0.9, changefreq: 'monthly' },
    'bize-katilin': { slug: 'bize-katilin', priority: 0.9, changefreq: 'monthly' },
    'iletisim': { slug: 'iletisim', priority: 0.9, changefreq: 'monthly' },
    'haberler': { slug: 'haberler', priority: 0.8, changefreq: 'weekly' },
    'baydoner': { slug: 'baydoner', priority: 0.8, changefreq: 'monthly' },
    'pide-by-pide': { slug: 'pide-by-pide', priority: 0.8, changefreq: 'monthly' },
    'bursa-ishakbey': { slug: 'bursa-ishakbey', priority: 0.8, changefreq: 'monthly' },
    'apaz-group-hakkinda': { slug: 'apaz-group-hakkinda', priority: 0.8, changefreq: 'monthly' },
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

  // Add locale-specific pages
  for (const locale of locales) {
    const pages = getAllPages(locale).filter((p) => !EXCLUDED_SLUGS.has(p.slug));
    
    for (const page of pages) {
      const priority = PAGE_PRIORITIES[page.slug] || { priority: DEFAULT_PRIORITY, changefreq: DEFAULT_CHANGEFREQ };
      
      entries.push({
        url: `${base}/${locale}/${page.slug}`,
        lastModified,
        changeFrequency: priority.changefreq,
        priority: priority.priority
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
