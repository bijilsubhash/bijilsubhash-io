import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { Mdx } from '@/components/Mdx'
import TagChip from '@/components/TagChip'
import styles from './post.module.css'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const url = `/writing/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="container">
      <header className={`${styles.head} reveal`}>
        <h1 className="t-post-title">{post.title}</h1>
        <p className={`t-meta ${styles.meta}`}>
          {post.date} · {post.readingTime}
        </p>
        {post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        )}
      </header>

      <Mdx source={post.content} />

      {post.tags.length > 0 && (
        <footer className={styles.bottomTags}>
          {post.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </footer>
      )}
    </article>
  )
}
