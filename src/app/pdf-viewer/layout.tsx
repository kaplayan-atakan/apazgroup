import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import type { ReactNode } from 'react';

export default function PdfViewerLayout({ children }: { children: ReactNode }) {
  return children;
}
