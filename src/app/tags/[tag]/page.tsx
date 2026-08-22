import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllTags, getPostsByTag } from '@/lib/posts'
import Archive from '@/components/Archive'
import styles from './tag.module.css'

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  const info = getAllTags().find((t) => t.slug === tag)
  if (!info) return {}
  return {
    title: `#${info.label}`,
    description: `Posts tagged ${info.label}.`,
    alternates: { canonical: `/tags/${info.slug}` },
  }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const info = getAllTags().find((t) => t.slug === tag)
  if (!info) notFound()

  const posts = getPostsByTag(tag)

  return (
    <div className="container">
      <header className={`${styles.head} reveal`}>
        <h1 className="t-page-title">#{info.label}</h1>
        <p className={`t-meta ${styles.sub}`}>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} tagged {info.label}
          <Link href="/writing" className={styles.clear}>
            clear filter
          </Link>
        </p>
      </header>

      <Archive posts={posts} />
    </div>
  )
}
