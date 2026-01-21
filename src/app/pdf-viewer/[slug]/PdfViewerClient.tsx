'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { Container } from '../../../components/ui/Container';

// Served from /public/pdfjs/pdf.worker.min.js via scripts/copy-pdf-worker.mjs
pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.js';

type PdfViewerClientProps = {
  title: string;
  fileUrl: string;
};

export function PdfViewerClient({ title, fileUrl }: PdfViewerClientProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => {
      const width = el.getBoundingClientRect().width;
      setViewportWidth(Math.max(320, Math.floor(width)));
    };

    update();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }

    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const canGoPrev = pageNumber > 1;
  const canGoNext = numPages ? pageNumber < numPages : false;

  const downloadHref = useMemo(() => fileUrl, [fileUrl]);

  return (
    <main className="py-10">
      <Container>
        <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-brand-bronze-100/90 via-white to-brand-gold-200/85 ring-2 ring-brand-bronze-200/50 shadow-[0_2px_8px_rgba(184,155,111,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-brand-primary">
                {title}
              </h1>
              {numPages ? (
                <p className="text-sm text-slate-700 mt-1">
                  Sayfa {pageNumber} / {numPages}
                </p>
              ) : (
                <p className="text-sm text-slate-700 mt-1">PDF görüntüleyici</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                disabled={!canGoPrev}
                className="rounded-md px-3 py-2 text-sm font-medium bg-white/80 text-brand-primary ring-1 ring-brand-bronze-200/60 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPageNumber(p => (numPages ? Math.min(numPages, p + 1) : p))}
                disabled={!canGoNext}
                className="rounded-md px-3 py-2 text-sm font-medium bg-white/80 text-brand-primary ring-1 ring-brand-bronze-200/60 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
              <a
                href={downloadHref}
                download
                className="rounded-md px-3 py-2 text-sm font-medium bg-brand-primary text-white"
              >
                Download
              </a>
            </div>
          </div>

          <div className="mt-6">
            <div
              ref={viewportRef}
              className="w-full overflow-auto bg-white/60 rounded-xl ring-1 ring-brand-bronze-200/50 p-3"
            >
              {error ? (
                <div className="text-sm text-red-700 bg-red-50 rounded-lg p-4">
                  {error}
                </div>
              ) : (
                <Document
                  file={fileUrl}
                  loading={
                    <div className="text-sm text-slate-700 p-4">Loading PDF…</div>
                  }
                  onLoadSuccess={({ numPages: n }) => {
                    setNumPages(n);
                    setPageNumber(1);
                    setIsLoading(false);
                  }}
                  onLoadError={e => {
                    setError(
                      e instanceof Error
                        ? e.message
                        : 'PDF yüklenemedi. Lütfen daha sonra tekrar deneyin.'
                    );
                    setIsLoading(false);
                  }}
                >
                  <Page
                    pageNumber={pageNumber}
                    width={viewportWidth ?? undefined}
                    renderAnnotationLayer
                    renderTextLayer
                  />
                </Document>
              )}
            </div>

            {!error && isLoading ? (
              <p className="text-xs text-slate-600 mt-2">
                PDF işleniyor… Bu işlem mobilde birkaç saniye sürebilir.
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </main>
  );
}
