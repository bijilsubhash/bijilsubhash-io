import { getAllDeepDives, getDeepDiveBySlug, getLesson } from '@/lib/deep-dives'
import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Bijil Subhash'

export function generateStaticParams() {
  return getAllDeepDives().flatMap((dive) =>
    dive.lessons.map((lesson) => ({ dive: dive.slug, lesson: lesson.slug })),
  )
}

export default async function Image({
  params,
}: {
  params: Promise<{ dive: string; lesson: string }>
}) {
  const { dive, lesson } = await params
  const deepDive = getDeepDiveBySlug(dive)
  const currentLesson = getLesson(dive, lesson)
  // Kicker = dive title, so a lesson share reads "Spark Optimization / Shuffle".
  return renderOgCard(
    currentLesson?.title ?? 'Bijil Subhash',
    'Bijil Subhash',
    deepDive?.title,
  )
}
