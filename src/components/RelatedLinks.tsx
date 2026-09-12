import Link from 'next/link'
import { getPostBySlug } from '@/lib/posts'
import { getDeepDiveBySlug, getLesson } from '@/lib/deep-dives'
import styles from './RelatedLinks.module.css'

/**
 * Resolve an internal path to a human title. Handles the cross-type links in
 * `related`: posts, dive landings, and lessons. Falls back to the raw path so a
 * stale or external link still renders rather than disappearing.
 */
function resolveTitle(href: string): string {
  const segments = href.split('/').filter(Boolean)
  if (segments[0] === 'writing' && segments[1]) {
    return getPostBySlug(segments[1])?.title ?? href
  }
  if (segments[0] === 'deep-dives' && segments[1]) {
    if (segments[2]) {
      return getLesson(segments[1], segments[2])?.title ?? href
    }
    return getDeepDiveBySlug(segments[1])?.title ?? href
  }
  return href
}

/**
 * "related" block shared by lessons (and, later, posts). Given internal paths,
 * renders each as a titled link under a `t-label` heading.
 */
export default function RelatedLinks({ items }: { items: string[] }) {
  if (items.length === 0) return null

  return (
    <section className={styles.related}>
      <h2 className="t-label">related</h2>
      <ul>
        {items.map((href) => (
          <li key={href}>
            <Link href={href}>{resolveTitle(href)}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
