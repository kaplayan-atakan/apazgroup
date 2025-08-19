import type { Locale } from '../../lib/i18n';
import { t } from '../../lib/i18n-dict';
import { Icon } from '../ui/Icon';

interface FooterProps { locale: Locale }

export function Footer({ locale }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer 
      className="mt-12 border-t text-xs text-slate-500 py-14 bg-slate-50/60 backdrop-blur dark:bg-slate-900/40"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Site footer</h2>
      <div className="mx-auto max-w-6xl px-4 grid gap-10 md:grid-cols-4">
        <div className="space-y-3 col-span-2 md:col-span-1">
          <div className="text-sm font-semibold tracking-wide text-slate-700" role="heading" aria-level={3}>Apaz Group</div>
          <p className="text-slate-600 text-xs leading-relaxed">Türk mutfağı değerlerini modern konseptlerle buluşturuyoruz.</p>
        </div>
        <nav aria-labelledby="footer-about-heading">
          <h3 id="footer-about-heading" className="text-[11px] font-semibold uppercase tracking-wide mb-3 text-slate-500">{t(locale,'nav.about')}</h3>
          <ul className="space-y-2" role="list">
            <li><a className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-primary rounded px-1 py-0.5" href={`/${locale}/apaz-group-hakkinda`}>{t(locale,'nav.about')}</a></li>
            <li><a className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-primary rounded px-1 py-0.5" href={`/${locale}/franchising`}>{t(locale,'nav.franchising')}</a></li>
          </ul>
        </nav>
        <nav aria-labelledby="footer-career-heading">
          <h3 id="footer-career-heading" className="text-[11px] font-semibold uppercase tracking-wide mb-3 text-slate-500">{t(locale,'nav.career')}</h3>
          <ul className="space-y-2" role="list">
            <li><a className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-primary rounded px-1 py-0.5" href={`/${locale}/bize-katilin`}>{t(locale,'nav.career')}</a></li>
            <li><a className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-primary rounded px-1 py-0.5" href={`/${locale}/insan-kaynaklari-politikamiz`}>İK Politikamız</a></li>
          </ul>
        </nav>
        <nav aria-labelledby="footer-social-heading">
          <h3 id="footer-social-heading" className="text-[11px] font-semibold uppercase tracking-wide mb-3 text-slate-500">Sosyal</h3>
          <ul className="space-y-2" role="list">
            <li>
              <a
                className="inline-flex items-center gap-2 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-primary rounded px-1 py-0.5"
                href="https://www.linkedin.com/company/apaz-group"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Apaz Group LinkedIn sayfasını ziyaret et"
              >
                <Icon name="linkedin" className="text-slate-500" aria-hidden="true" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-primary rounded px-1 py-0.5"
                href="https://x.com/ApazGroup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Apaz Group X (Twitter) sayfasını ziyaret et"
              >
                <Icon name="x" className="text-slate-500" aria-hidden="true" />
                X / Twitter
              </a>
            </li>
            <li>
              <span 
                className="inline-flex items-center gap-2 text-slate-400" 
                aria-disabled="true"
              >
                <Icon name="instagram" aria-hidden="true" />
                <span>Instagram (yakında)</span>
              </span>
            </li>
          </ul>
        </nav>
        <nav aria-label="Legal" className="md:col-span-4">
          <ul className="mt-6 flex flex-wrap gap-4 text-[11px] text-slate-500" role="list">
            <li><a className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-primary rounded px-1 py-0.5" href={`/${locale}/(placeholders)/kisisel-verilerin-korunmasi`}>KVKK</a></li>
            <li><a className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-primary rounded px-1 py-0.5" href={`/${locale}/(placeholders)/cerez-politikasi`}>Çerez Politikası</a></li>
          </ul>
        </nav>
      </div>
      <div className="mt-10 text-center text-[11px] text-slate-400">© {year} Apaz Group</div>
    </footer>
  );
}
