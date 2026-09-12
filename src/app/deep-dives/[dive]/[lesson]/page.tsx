import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getAllDeepDives,
  getDeepDiveBySlug,
  getLesson,
} from '@/lib/deep-dives'
import { Mdx } from '@/components/Mdx'
import TagChip from '@/components/TagChip'
import YouTube from '@/components/YouTube'
import DiveSidebar from '@/components/DiveSidebar'
import LessonPager from '@/components/LessonPager'
import RelatedLinks from '@/components/RelatedLinks'
import styles from './lesson.module.css'

export function generateStaticParams() {
  return getAllDeepDives().flatMap((dive) =>
    dive.lessons.map((lesson) => ({ dive: dive.slug, lesson: lesson.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dive: string; lesson: string }>
}): Promise<Metadata> {
  const { dive: diveSlug, lesson: lessonSlug } = await params
  const dive = getDeepDiveBySlug(diveSlug)
  const lesson = getLesson(diveSlug, lessonSlug)
  if (!dive || !lesson) return {}
  const url = `/deep-dives/${dive.slug}/${lesson.slug}`
  return {
    title: `${lesson.title} – ${dive.title}`,
    description: lesson.description,
    alternates: { canonical: url },
    openGraph: {
      title: lesson.title,
      description: lesson.description,
      url,
      type: 'article',
      publishedTime: lesson.date,
      tags: lesson.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: lesson.title,
      description: lesson.description,
    },
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ dive: string; lesson: string }>
}) {
  const { dive: diveSlug, lesson: lessonSlug } = await params
  const dive = getDeepDiveBySlug(diveSlug)
  const lesson = getLesson(diveSlug, lessonSlug)
  if (!dive || !lesson) notFound()

  return (
    <div className={styles.layout}>
      <DiveSidebar dive={dive} currentSlug={lesson.slug} />

      <article className={styles.main}>
        <header className={`${styles.head} reveal`}>
          <Link href={`/deep-dives/${dive.slug}`} className={styles.kicker}>
            {dive.title}
          </Link>
          <h1 className="t-post-title">{lesson.title}</h1>
          <p className={`t-meta ${styles.meta}`}>
            {lesson.date} – {lesson.readingTime}
          </p>
          {lesson.tags.length > 0 && (
            <div className={styles.tags}>
              {lesson.tags.map((tag) => (
                <TagChip key={tag} tag={tag} />
              ))}
            </div>
          )}
        </header>

        {lesson.youtube && (
          <YouTube id={lesson.youtube} title={lesson.title} />
        )}

        <Mdx source={lesson.content} />

        <RelatedLinks items={lesson.related} />

        <LessonPager
          diveSlug={dive.slug}
          diveTitle={dive.title}
          lesson={lesson}
        />
      </article>
    </div>
  )
}
