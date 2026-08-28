import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Bijil Subhash – Data engineer, Sydney'

export default async function Image() {
  return renderOgCard('Bijil Subhash', 'Data engineer – Sydney')
}
