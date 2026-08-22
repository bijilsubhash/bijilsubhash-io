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
          Forward deployed data engineer in Sydney. I embed with client teams to
          design, build, and run data platforms end to end, most often on
          Databricks and across the modern data stack. This is where I write
          things down as I come across them, what I&apos;m learning, my take on
          the tools, the occasional opinionated architecture, a rant now and
          then, and whatever else feels worth keeping.
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
