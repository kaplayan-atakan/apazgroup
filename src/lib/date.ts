export function parseISODateToUTCNoon(dateISO: string): Date | null {
  if (!dateISO) return null;

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateISO);
  if (!match) return null;

  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);

  if (!Number.isFinite(year) || !Number.isFinite(monthIndex) || !Number.isFinite(day)) return null;
  if (monthIndex < 0 || monthIndex > 11) return null;
  if (day < 1 || day > 31) return null;

  // Use a fixed UTC time to avoid server timezone affecting the calendar day.
  return new Date(Date.UTC(year, monthIndex, day, 12, 0, 0));
}

export function formatDateLocale(dateISO: string, locale: string): string {
  const date = parseISODateToUTCNoon(dateISO);
  if (!date) return dateISO || '';

  const resolvedLocale = locale?.startsWith('tr') || locale === 'tr' ? 'tr-TR' : 'en-US';

  return new Intl.DateTimeFormat(resolvedLocale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Istanbul',
  }).format(date);
}

export function formatDateTR(dateISO: string): string {
  return formatDateLocale(dateISO, 'tr');
}
