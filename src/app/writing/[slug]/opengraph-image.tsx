import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Bijil Subhash'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  return renderOgCard(post?.title ?? 'Bijil Subhash', 'Bijil Subhash')
}
