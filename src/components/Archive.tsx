import type { Post } from '@/lib/posts'
import { groupByYear } from '@/lib/posts'
import PostRow from './PostRow'
import styles from './Archive.module.css'

/** Year-grouped list of compact post rows (design.md §2, reused by /tags). */
export default function Archive({ posts }: { posts: Post[] }) {
  const groups = groupByYear(posts)
  let running = 0

  return (
    <>
      {groups.map((group) => (
        <section key={group.year} className={styles.group}>
          <h2 className="t-label">{group.year}</h2>
          <div>
            {group.posts.map((post) => {
              const idx = running++
              const delay = idx < 12 ? `${120 + idx * 40}ms` : '0ms'
              return (
                <PostRow
                  key={post.slug}
                  post={post}
                  compact
                  style={{ animationDelay: delay }}
                />
              )
            })}
          </div>
        </section>
      ))}
    </>
  )
}
