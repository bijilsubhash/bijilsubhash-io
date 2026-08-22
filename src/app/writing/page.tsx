import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import Archive from '@/components/Archive'
import styles from './writing.module.css'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Everything I have written on data engineering and the modern data stack.',
  alternates: { canonical: '/writing' },
}

export default function WritingPage() {
  const posts = getAllPosts()

  return (
    <div className="container">
      <header className={`${styles.head} reveal`}>
        <h1 className="t-page-title">Writing</h1>
        <p className={`t-meta ${styles.sub}`}>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}, newest first
        </p>
      </header>

      <Archive posts={posts} />
    </div>
  )
}
