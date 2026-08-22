/**
 * Loads a TrueType slice of a Google font for next/og (satori needs ttf/otf,
 * not woff2). Runs at build time for statically generated OG images. Callers
 * should treat a thrown error as "fall back to default fonts".
 */
export async function loadGoogleFont(
  family: string,
  weight: number,
  text: string
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}&text=${encodeURIComponent(text)}`

  const css = await (
    await fetch(url, {
      headers: {
        // Old UA so the API serves TrueType rather than woff2.
        'User-Agent':
          'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0 Safari/537.36',
      },
    })
  ).text()

  const match = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)
  if (!match) throw new Error(`Font not found: ${family}`)

  const res = await fetch(match[1])
  if (!res.ok) throw new Error(`Font fetch failed: ${family}`)
  return res.arrayBuffer()
}
