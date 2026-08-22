import Link from 'next/link'
import { tagSlug } from '@/lib/tags'
import styles from './TagChip.module.css'

/** Tag chip (design.md §5). Routes to /tags/[slug]. */
export default function TagChip({ tag }: { tag: string }) {
  return (
    <Link href={`/tags/${tagSlug(tag)}`} className={styles.chip}>
      {tag}
    </Link>
  )
}
