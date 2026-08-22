import { ImageResponse } from 'next/og'
import { loadGoogleFont } from './og-fonts'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

/**
 * Shared OG share card (design.md §8): warm bg, accent bar, title in Newsreader,
 * baseline row with the wordmark and the domain.
 */
export async function renderOgCard(title: string, subtitle: string) {
  const glyphs = title + subtitle + 'Bijil Subhash bijilsubhash.io'

  const fonts: { name: string; data: ArrayBuffer; weight: 400 | 500; style: 'normal' }[] = []
  try {
    const [serif, mono] = await Promise.all([
      loadGoogleFont('Newsreader', 500, glyphs),
      loadGoogleFont('JetBrains Mono', 400, glyphs),
    ])
    fonts.push({ name: 'Newsreader', data: serif, weight: 500, style: 'normal' })
    fonts.push({ name: 'JetBrains Mono', data: mono, weight: 400, style: 'normal' })
  } catch {
    /* fall back to default fonts */
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fafaf8',
          padding: '64px 72px',
          fontFamily: fonts.length ? 'Newsreader' : 'serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{ width: 160, height: 3, background: '#24625f', marginBottom: 40 }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              lineHeight: 1.22,
              letterSpacing: '-0.02em',
              color: '#1a1a1a',
              fontWeight: 500,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: 36, color: '#1a1a1a', fontWeight: 500 }}>
            {subtitle}
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#9b978e',
              fontFamily: fonts.length ? 'JetBrains Mono' : 'monospace',
            }}
          >
            bijilsubhash.io
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: fonts.length ? fonts : undefined }
  )
}
