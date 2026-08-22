import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** Apple touch icon — the "b." monogram (design.md §9). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#24625f',
          color: '#fafaf8',
          fontSize: 108,
          fontWeight: 600,
          fontFamily: 'Georgia, "Times New Roman", serif',
          borderRadius: 26,
        }}
      >
        b.
      </div>
    ),
    { ...size }
  )
}
