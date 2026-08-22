import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostList from '@/components/PostList'
import styles from './home.module.css'

export default function Home() {
  const posts = getAllPosts().slice(0, 5)
  return (
    <div className="container">
      <section className={`${styles.intro} reveal`}>
        <h1 className="t-display">Bijil Subhash</h1>
        <p className={styles.blurb}>
          Data engineer in Sydney and founder of NimbleStax. I write about the
          modern data stack: dbt, dlt, BigQuery, Python, and the architecture
          behind data platforms that hold up in production.
        </p>
      </section>

      <section
        className={`${styles.recent} reveal`}
        style={{ animationDelay: '120ms' }}
      >
        <h2 className="t-label">recent</h2>
        <PostList posts={posts} startIndex={2} />
        <Link href="/writing" className={styles.all}>
          all writing →
        </Link>
      </section>
    </div>
  )
}
