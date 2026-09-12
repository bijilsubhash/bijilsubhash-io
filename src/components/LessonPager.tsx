import Link from 'next/link'
import type { Lesson } from '@/lib/deep-dives'
import styles from './LessonPager.module.css'

/**
 * Prev / next navigation at the foot of a lesson. Crossing a part boundary is
 * fine. At the first lesson "previous" links back to the dive landing page; at
 * the last lesson "next" is omitted.
 */
export default function LessonPager({
  diveSlug,
  diveTitle,
  lesson,
}: {
  diveSlug: string
  diveTitle: string
  lesson: Lesson
}) {
  const prevHref = lesson.prev
    ? `/deep-dives/${diveSlug}/${lesson.prev.slug}`
    : `/deep-dives/${diveSlug}`
  const prevTitle = lesson.prev ? lesson.prev.title : diveTitle

  return (
    <nav className={styles.pager} aria-label="Lesson navigation">
      <Link href={prevHref} className={`${styles.link} ${styles.prev}`}>
        <span className="t-label">previous</span>
        <span className={styles.title}>{prevTitle}</span>
      </Link>
      {lesson.next ? (
        <Link
          href={`/deep-dives/${diveSlug}/${lesson.next.slug}`}
          className={`${styles.link} ${styles.next}`}
        >
          <span className="t-label">next</span>
          <span className={styles.title}>{lesson.next.title}</span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  )
}
