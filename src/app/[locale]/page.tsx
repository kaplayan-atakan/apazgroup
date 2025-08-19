import { getAllPages } from '../../lib/content';

export default function Home({ params }: { params: { locale: string } }) {
  const pages = getAllPages(params.locale).slice(0, 3);
  return (
    <main className="max-w-3xl mx-auto py-12 space-y-6">
      <h1 className="text-3xl font-semibold">Anasayfa (Geçici)</h1>
  <p className="text-sm text-slate-600">Bu sayfa Sprint 1 iskelet placeholder’dır.</p>
      <section>
        <h2 className="text-xl font-medium mb-2">Örnek İçerik (İlk 3)</h2>
        <ul className="list-disc ml-6 text-sm space-y-1">
          {pages.map(p => (
            <li key={p.slug}>{p.frontmatter.title}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
