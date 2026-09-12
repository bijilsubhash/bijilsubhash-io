import Link from 'next/link'
import type { DeepDive } from '@/lib/deep-dives'
import styles from './DiveCard.module.css'

/**
 * Deep Dives card: title, description, lesson count (design.md §4.1). The index
 * also shows the updated date; the home block shows lesson count only
 * (design.md §5.4), so `showUpdated` turns the date off there.
 */
export default function DiveCard({
  dive,
  showUpdated = true,
  style,
}: {
  dive: DeepDive
  showUpdated?: boolean
  style?: React.CSSProperties
}) {
  return (
    <Link
      href={`/deep-dives/${dive.slug}`}
      className={`${styles.card} reveal`}
      style={style}
    >
      <span className={styles.title}>{dive.title}</span>
      {dive.description && (
        <span className={styles.desc}>{dive.description}</span>
      )}
      <span className={`t-meta ${styles.meta}`}>
        {dive.lessonCount} {dive.lessonCount === 1 ? 'lesson' : 'lessons'}
        {showUpdated && ` – updated ${dive.updatedAt}`}
      </span>
    </Link>
  )
}
