import { Metadata } from 'next';

import { locales } from './i18n';

export type SeoProps = {
  title: string;
  description: string;
  keywords?: string[];
  locale: string;
  slug?: string;
  imagePath?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
};

/**
 * Generate standardized metadata for pages
 */
export function generateSeoMetadata({
  title,
  description,
  keywords = [],
  locale,
  slug = '',
  imagePath,
  type = 'website',
  noIndex = false,
}: SeoProps): Metadata {
  // Get base URL from env or default to localhost
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // Generate canonical URL
  const canonicalPath = slug ? `/${locale}/${slug}` : `/${locale}`;
  const canonical = `${baseUrl}${canonicalPath}`;
  
  // Generate default OpenGraph image if not provided
  const ogImageUrl = imagePath 
    ? `${baseUrl}${imagePath}` 
    : `${baseUrl}/og-image.jpg`;

  // Generate alternate URLs for each locale
  const alternates: Record<string, string> = {};
  const alternateLanguages: { [key: string]: string } = {};
  
  locales.forEach((l) => {
    const alternatePath = slug ? `/${l}/${slug}` : `/${l}`;
    const alternateUrl = `${baseUrl}${alternatePath}`;
    
    alternates[l] = alternateUrl;
    alternateLanguages[l] = alternateUrl;
  });

  return {
    title,
    description,
    keywords: keywords.join(', '),
    
    // Alternate languages and canonical links
    alternates: {
      canonical,
      languages: alternateLanguages,
    },
    
    // Handle robots directives
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    
    // OpenGraph metadata
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Apaz Group',
      locale,
      type,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    
    // Twitter metadata
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    
    // Additional metadata
    other: {
      'format-detection': 'telephone=no',
    },
  };
}

/**
 * Generate JSON-LD schema for the organization
 */
export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Apaz Group',
    url: baseUrl,
    logo: `${baseUrl}/brand/logo--global.png`,
    sameAs: [
      'https://www.linkedin.com/company/apazgroup',
      'https://www.instagram.com/apazgroup'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Çınarlı Mah. Ankara Asfaltı Cad. No: 17/402 Konak',
      addressLocality: 'İzmir',
      postalCode: '35110',
      addressCountry: 'TR'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-232-441-8080',
      contactType: 'customer service'
    }
  };
}

/**
 * Generate JSON-LD schema for an article
 */
export function generateArticleSchema({
  title,
  description,
  slug,
  locale,
  datePublished = new Date().toISOString(),
  dateModified = new Date().toISOString(),
  authorName = 'Apaz Group'
}: {
  title: string;
  description: string;
  slug: string;
  locale: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const articleUrl = slug ? `${baseUrl}/${locale}/${slug}` : `${baseUrl}/${locale}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: articleUrl,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: authorName
    },
    publisher: {
      '@type': 'Organization',
      name: 'Apaz Group',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/brand/logo--global.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    }
  };
}
