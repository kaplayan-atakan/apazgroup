import type { Metadata } from 'next';

import { ContentArticle } from '../../../../components/content/ContentArticle';
import { generateSeoMetadata } from '../../../../lib/seo';

export default function AboutPage({ params }: { params: { locale: string } }) {
  return <ContentArticle locale={params.locale} slug="apaz-group-hakkinda" />;
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return generateSeoMetadata({
    title: 'Apaz Group Hakkında',
    description: "",
    locale: params.locale,
    slug: 'hakkimizda/apaz-group-hakkinda',
    type: 'article',
    imagePath: '/brand/group-apaz--about.webp'
  });
}
