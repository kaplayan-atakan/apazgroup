import Link from 'next/link';

type PageProps = { searchParams?: Record<string,string|undefined> };

// Must be dynamic to access query params at request time (static build stripped them before)
export const dynamic = 'force-dynamic';

function sanitizePdfParam(raw: string | undefined): { clean: string | null; fileName: string | null; reason?: string } {
  if (!raw) return { clean: null, fileName: null, reason: 'empty' };
  let working = raw.trim();
  // First try a full decodeURIComponent; if it fails fall back to decodeURI (which tolerates encoded commas etc.)
  try { working = decodeURIComponent(working); }
  catch {
    try { working = decodeURI(working); } catch { /* keep raw */ }
  }
  // Collapse multiple leading slashes (but keep original normalization for actual file serving)
  working = working.replace(/^\/+/,'/');
  if (!working.startsWith('/hr/')) return { clean: null, fileName: null, reason: 'prefix' };
  if (working.includes('..')) return { clean: null, fileName: null, reason: 'traversal' };
  const lower = working.toLowerCase();
  if (!lower.endsWith('.pdf')) return { clean: null, fileName: null, reason: 'extension' };
  // Derive display fileName from NFC-normalized variant but return original path for serving to handle composed/decomposed mismatch
  const fileName = working.normalize('NFC').split('/').pop() || 'document.pdf';
  return { clean: working, fileName };
}

export function generateMetadata({ searchParams }: PageProps) {
  const { fileName } = sanitizePdfParam(searchParams?.src);
  const title = fileName ? `${fileName} | PDF` : 'PDF görüntüleyici';
  return { title, description: 'PDF görüntüleyici (KVKK ve politika belgeleri)' };
}

export default function PdfViewerPage({ searchParams }: PageProps) {
  const { clean, fileName, reason } = sanitizePdfParam(searchParams?.src);
  if (!clean || !fileName) {
    return (
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-3">Geçersiz belge isteği</h1>
        <p className="text-slate-700 mb-2">Yalnızca site içindeki /hr/ klasörü altındaki .pdf dosyaları görüntülenebilir.</p>
        <p className="text-xs text-slate-500 mb-6">Hata kodu: {reason}</p>
        <Link href="/" className="text-brand-primary underline">Ana sayfaya dön</Link>
      </main>
    );
  }

  // Encode only the trailing filename to ensure all special / unicode chars are safe while preserving folder path
  const pathSegments = clean.split('/');
  const last = pathSegments.pop() || '';
  const encodedFile = encodeURIComponent(last);
  const iframeSrc = pathSegments.join('/') + '/' + encodedFile;

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      {/* <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <h1 className="text-sm md:text-base font-medium truncate" title={fileName}>{fileName}</h1>
          <div className="flex items-center gap-3 shrink-0">
            <a href={iframeSrc} download className="text-xs md:text-sm text-brand-primary underline">İndir</a>
            <a href={iframeSrc} target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-slate-600 underline">Yeni sekmede aç</a>
          </div>
        </div>
      </header> */}
      <div className="flex-1">
        <iframe
          src={iframeSrc}
          title={fileName}
          className="w-full bg-white"
          style={{ height: 'calc(100vh - 56px)' }}
        />
      </div>
    </main>
  );
}
