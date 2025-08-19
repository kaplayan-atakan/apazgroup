import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Apaz Group';
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg,#0f172a,#1e293b)',
            color: 'white',
            fontSize: 56,
            fontFamily: 'sans-serif',
            letterSpacing: '-1px'
        }}
      >
        <div style={{ fontSize: 24, opacity: 0.7, marginBottom: 24 }}>Apaz Group</div>
        <div style={{ padding: '0 80px', textAlign: 'center' }}>{title}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
