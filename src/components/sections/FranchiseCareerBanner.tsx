"use client";
import Link from 'next/link';
import type { Route } from 'next';

type Props = { locale: string };

export function FranchiseCareerBanner({ locale }: Props) {
  const withLocale = (path: string) => (path === '/' ? `/${locale}` : `/${locale}${path}`);
  const franchiseHref = withLocale('/franchising') as Route;
  const careerHref = withLocale('/bize-katilin') as Route;

  const t = locale === 'tr' ? {
    franchise: 'FRANCHISE',
    career: 'KARİYER',
    centerText: 'Siz de bu büyük ailenin bir parçası olmak ister misiniz?',
    applyButton: 'BAŞVURU FORMU',
  } : {
    franchise: 'FRANCHISE',
    career: 'CAREER',
    centerText: 'Would you like to be part of this great family?',
    applyButton: 'APPLICATION FORM',
  };

  return (
    <section
      className="franchise-career-banner"
      style={{
        background: 'linear-gradient(135deg, rgba(184, 155, 111, 0.12) 0%, rgba(255, 255, 255, 0.95) 25%, rgba(255, 255, 255, 0.95) 75%, rgba(149, 105, 78, 0.15) 100%)',
        border: '2px solid rgba(184, 155, 111, 0.3)',
        maxWidth: '820px',
      }}
    >
      <div className="franchise-career-content">

        <div className="franchise-career-column franchise-career-franchise">
          <h2>{t.franchise}</h2>
          <Link
            href={franchiseHref}
            className="franchise-career-button franchise-career-button-franchise"
            style={{
              background: 'linear-gradient(135deg, #b89b6f 0%, #9b7754 100%)',
              border: '4px solid #8a6543',
              boxShadow: '0 6px 20px rgba(155, 119, 84, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              borderRadius: '36px',
              color: '#ffffff',
              padding: '8px 28px',
            }}
          >
            {t.applyButton}
          </Link>
        </div>

        <div className="franchise-career-column franchise-career-center-text">
          <p>{t.centerText}</p>
        </div>

        <div className="franchise-career-column franchise-career-kariyer">
          <h2>{t.career}</h2>
          <Link
            href={careerHref}
            className="franchise-career-button franchise-career-button-kariyer"
            style={{
              background: 'linear-gradient(135deg, #3a4a63 0%, #2a3a4d 100%)',
              border: '4px solid #1F3A52',
              boxShadow: '0 6px 20px rgba(31, 58, 82, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              borderRadius: '36px',
              color: '#ffffff',
              padding: '8px 28px',
            }}
          >
            {t.applyButton}
          </Link>
        </div>

      </div>

      <style jsx>{`
        .franchise-career-banner {
          position: relative;
          background: linear-gradient(135deg, #ffffff 0%, #fefdfb 50%, #faf8f5 100%);
          overflow: hidden;
          padding: 28px 16px 72px;
          max-width: 900px;
          margin: 20px auto;
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(31, 58, 82, 0.12), 0 2px 8px rgba(31, 58, 82, 0.08);
          border: 1px solid rgba(184, 155, 111, 0.15);
        }

        .franchise-career-content {
          display: flex;
          justify-content: space-around;
          align-items: center;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 5;
        }

        .franchise-career-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          flex: 1;
        }

        .franchise-career-center-text {
          flex: 2;
          color: #3a4a63;
          font-size: 2.1rem;
          font-weight: 700;
          line-height: 1.25;
          padding: 0 16px;
        }

        .franchise-career-column h2 {
          font-size: 2.3rem;
          font-weight: 700;
          margin: 0 0 14px 0;
          letter-spacing: 1.5px;
        }

        .franchise-career-franchise h2 {
          color: #9b7754;
        }

        .franchise-career-kariyer h2 {
          color: #3a4a63;
        }

        .franchise-career-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #ffffff;
          padding: 12px 36px;
          border-radius: 36px;
          font-weight: 700;
          font-size: 0.90rem;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .franchise-career-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%);
          transition: opacity 0.3s ease;
          opacity: 0;
        }

        .franchise-career-button:hover {
          transform: translateY(-4px) scale(1.03);
          filter: brightness(1.1);
        }

        .franchise-career-button:hover::before {
          opacity: 1;
        }

        .franchise-career-button:active {
          transform: translateY(-2px) scale(1.01);
        }

        .franchise-career-button-franchise {
          background: linear-gradient(135deg, #b89b6f 0%, #9b7754 100%);
          border: 2px solid #9b7754;
        }

        .franchise-career-button-franchise:hover {
          border-color: #8a6543;
        }

        .franchise-career-button-kariyer {
          background: linear-gradient(135deg, #3a4a63 0%, #2a3a4d 100%);
          border: 2px solid #3a4a63;
        }

        .franchise-career-button-kariyer:hover {
          border-color: #2a3a4d;
        }

        /* Bronz Şekil (Sol Aşağıdan Sağ Yukarıya Doğru Çapraz) */
        .franchise-career-banner::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: -25%;
          width: 150%;
          height: 100px;
          background-color: #9b7754;
          transform: skewY(3deg);
          transform-origin: bottom left;
          z-index: 1;
        }

        /* Koyu Navy Şekil (Sağ Aşağıdan Sol Yukarıya Doğru Çapraz) */
        .franchise-career-banner::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: -25%;
          width: 150%;
          height: 80px;
          background-color: #3a4a63;
          transform: skewY(-3deg);
          transform-origin: bottom right;
          z-index: 2;
        }

        /* MOBİL UYUMLULUK */
        @media (max-width: 800px) {
          .franchise-career-banner {
            margin: 20px;
            padding: 40px 20px 120px;
            border-radius: 20px;
          }

          .franchise-career-content {
            flex-direction: column;
            gap: 40px;
            padding: 0 20px;
          }

          .franchise-career-center-text {
            font-size: 1.8rem;
            order: 1;
          }

          .franchise-career-franchise {
            order: 2;
          }

          .franchise-career-kariyer {
            order: 3;
          }

          .franchise-career-button {
            padding: 14px 32px;
            font-size: 0.85rem;
          }

          .franchise-career-banner::before,
          .franchise-career-banner::after {
            width: 100%;
            transform: skewY(0deg);
            height: 60px;
            left: 0;
            right: 0;
          }

          .franchise-career-banner::before {
            z-index: 1;
            bottom: 0;
          }

          .franchise-career-banner::after {
            z-index: 2;
            bottom: 0;
          }
        }
      `}</style>
    </section>
  );
}
