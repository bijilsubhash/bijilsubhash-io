import Link from 'next/link'
import type { DeepDive } from '@/lib/deep-dives'
import styles from './DiveSidebar.module.css'

/**
 * Lesson-page sidebar: the dive's full table of contents with the current
 * lesson highlighted. A server component (no state): on desktop it is a sticky
 * always-open list; on mobile it collapses to a `<details>` disclosure, closed
 * by default, with the current lesson shown in the summary line.
 */
export default function DiveSidebar({
  dive,
  currentSlug,
}: {
  dive: DeepDive
  currentSlug: string
}) {
  const current = dive.lessons.find((lesson) => lesson.slug === currentSlug)

  return (
    <details className={styles.sidebar}>
      <summary className={styles.summary}>
        <span className={styles.summaryLabel}>in this deep dive</span>
        {current && (
          <span className={styles.summaryCurrent}>{current.title}</span>
        )}
      </summary>
      <nav className={styles.nav} aria-label={`${dive.title} lessons`}>
        <Link href={`/deep-dives/${dive.slug}`} className={styles.diveTitle}>
          {dive.title}
        </Link>
        <ol className={styles.parts}>
          {dive.parts.map((part, i) => (
            <li key={part.title} className={styles.part}>
              <p className={styles.partTitle}>
                <span className={styles.partNum}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.partName}>{part.title}</span>
              </p>
              <ol className={styles.lessons}>
                {part.lessons.map((lesson) => {
                  const active = lesson.slug === currentSlug
                  return (
                    <li key={lesson.slug}>
                      <Link
                        href={`/deep-dives/${dive.slug}/${lesson.slug}`}
                        className={`${styles.lesson} ${active ? styles.active : ''}`}
                        aria-current={active ? 'page' : undefined}
                      >
                        {lesson.title}
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  )
}
