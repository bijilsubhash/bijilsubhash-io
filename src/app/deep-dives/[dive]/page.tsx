import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllDeepDives, getDeepDiveBySlug } from '@/lib/deep-dives'
import { Mdx } from '@/components/Mdx'
import styles from './dive.module.css'

export function generateStaticParams() {
  return getAllDeepDives().map((d) => ({ dive: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dive: string }>
}): Promise<Metadata> {
  const { dive: diveSlug } = await params
  const dive = getDeepDiveBySlug(diveSlug)
  if (!dive) return {}
  const url = `/deep-dives/${dive.slug}`
  return {
    title: dive.title,
    description: dive.description,
    alternates: { canonical: url },
    openGraph: {
      title: dive.title,
      description: dive.description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: dive.title,
      description: dive.description,
    },
  }
}

export default async function DivePage({
  params,
}: {
  params: Promise<{ dive: string }>
}) {
  const { dive: diveSlug } = await params
  const dive = getDeepDiveBySlug(diveSlug)
  if (!dive) notFound()

  return (
    <article className="container">
      <header className={`${styles.head} reveal`}>
        <h1 className="t-post-title">{dive.title}</h1>
        {dive.description && (
          <p className={`t-lede ${styles.lede}`}>{dive.description}</p>
        )}
        <p className={`t-meta ${styles.meta}`}>
          {dive.lessonCount} {dive.lessonCount === 1 ? 'lesson' : 'lessons'} –
          updated {dive.updatedAt}
        </p>
      </header>

      <Mdx source={dive.content} />

      <section className={styles.toc}>
        {dive.parts.map((part) => (
          <div key={part.title} className={styles.part}>
            <h2 className="t-label">{part.title}</h2>
            <ol className={styles.lessons}>
              {part.lessons.map((lesson) => (
                <li key={lesson.slug}>
                  <Link
                    href={`/deep-dives/${dive.slug}/${lesson.slug}`}
                    className={styles.lesson}
                  >
                    {lesson.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>

      {dive.youtubePlaylist && (
        <p className={styles.playlist}>
          <a
            href={`https://www.youtube.com/playlist?list=${dive.youtubePlaylist}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            watch the full playlist on YouTube →
          </a>
        </p>
      )}

      {dive.related.length > 0 && (
        <footer className={styles.related}>
          <h2 className="t-label">related</h2>
          <ul>
            {dive.related.map((href) => (
              <li key={href}>
                <Link href={href}>{href}</Link>
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  )
}
