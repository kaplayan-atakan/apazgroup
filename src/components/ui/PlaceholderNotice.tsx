export function PlaceholderNotice({ locale = 'tr' }: { locale?: 'tr' | 'en' }) {
  const msg =
    locale === 'tr'
      ? 'Bu sayfa geçici olarak güncelleniyor. İçerik kısa süre içinde eklenecektir.'
      : 'This page is being updated. Content will be added shortly.';
  return (
    <div
      role="note"
      aria-live="polite"
      className="not-prose mb-6 rounded border border-amber-300 bg-amber-50 text-amber-900 p-3 text-sm"
    >
      {msg}
    </div>
  );
}
