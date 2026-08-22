import type { Post } from '@/lib/posts'
import PostRow from './PostRow'

/**
 * A list of post rows with a staggered entrance (design.md §6):
 * first row at 120ms, +40ms per row, capped at 12 rows.
 */
export default function PostList({
  posts,
  compact = false,
  startIndex = 0,
}: {
  posts: Post[]
  compact?: boolean
  startIndex?: number
}) {
  return (
    <div>
      {posts.map((post, i) => {
        const idx = startIndex + i
        const delay = idx < 12 ? `${120 + idx * 40}ms` : '0ms'
        return (
          <PostRow
            key={post.slug}
            post={post}
            compact={compact}
            style={{ animationDelay: delay }}
          />
        )
      })}
    </div>
  )
}
