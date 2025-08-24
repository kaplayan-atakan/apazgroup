import Link from 'next/link';
import type { Route } from 'next';

type Props = { currentPage: number; totalPages: number; baseUrl: string };

export function Pagination({ currentPage, totalPages, baseUrl }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="inline-flex items-center gap-2" aria-label="Pagination">
      {pages.map((p) => {
        const href = `${baseUrl}${p === 1 ? '' : `?page=${p}`}` as Route;
        const isActive = p === currentPage;
        return (
          <Link
            key={p}
            href={href}
            className={`px-3 py-1 rounded border ${isActive ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {p}
          </Link>
        );
      })}
    </nav>
  );
}
