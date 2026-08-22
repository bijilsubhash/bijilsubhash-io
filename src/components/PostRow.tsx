import Link from 'next/link'
import type { Post } from '@/lib/posts'
import styles from './PostRow.module.css'

/**
 * Post list row (design.md §5): fixed date column + title.
 * `compact` = archive variant (smaller title, date drops the year).
 */
export default function PostRow({
  post,
  compact = false,
  style,
}: {
  post: Post
  compact?: boolean
  style?: React.CSSProperties
}) {
  const date = compact ? post.date.slice(5) : post.date
  return (
    <Link
      href={`/writing/${post.slug}`}
      className={`${styles.row} ${compact ? styles.compact : ''} reveal`}
      style={style}
    >
      <time className={styles.date} dateTime={post.date}>
        {date}
      </time>
      <span className={styles.title}>{post.title}</span>
    </Link>
  )
}
