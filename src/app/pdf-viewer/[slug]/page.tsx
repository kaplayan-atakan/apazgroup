import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { PdfViewerClient } from './PdfViewerClient';

type PageProps = {
  params: { slug: string };
};

const PDF_VIEWERS: Record<string, { title: string; fileUrl: string }> = {
  'kimyasal-bilgi': {
    title: 'Kimyasal Bilgi',
    fileUrl: '/hr/kimyasal_bilgi.pdf',
  },
};

export function generateMetadata({ params }: PageProps): Metadata {
  const viewer = PDF_VIEWERS[params.slug];
  if (!viewer) return { title: 'PDF' };

  return {
    title: viewer.title,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function PdfViewerPage({ params }: PageProps) {
  const viewer = PDF_VIEWERS[params.slug];
  if (!viewer) return notFound();

  return <PdfViewerClient title={viewer.title} fileUrl={viewer.fileUrl} />;
}
