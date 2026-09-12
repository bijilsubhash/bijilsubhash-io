import { getAllDeepDives, getDeepDiveBySlug } from '@/lib/deep-dives'
import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Bijil Subhash'

export function generateStaticParams() {
  return getAllDeepDives().map((d) => ({ dive: d.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ dive: string }>
}) {
  const { dive } = await params
  const deepDive = getDeepDiveBySlug(dive)
  return renderOgCard(deepDive?.title ?? 'Bijil Subhash', 'Bijil Subhash')
}
