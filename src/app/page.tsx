import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { getAllDeepDives } from '@/lib/deep-dives'
import { isGateEnabled } from '@/lib/deep-dives-gate'
import PostList from '@/components/PostList'
import DiveCard from '@/components/DiveCard'
import styles from './home.module.css'

export default function Home() {
  const posts = getAllPosts().slice(0, 5)
  // Hidden from the public home page while the section is gated.
  const dives = isGateEnabled() ? [] : getAllDeepDives().slice(0, 3)
  return (
    <div className="container">
      <section className={`${styles.intro} reveal`}>
        <h1 className="t-display">Bijil Subhash</h1>
        <p className={styles.blurb}>
          Data and AI engineer from Sydney, Australia. I embed with client teams to
          design, build, and run data platforms end to end, specialising in
          Databricks after a few years across the modern data stack. This is where I write
          things down as I come across them, what I&apos;m learning, my take on
          the tools, the occasional opinionated architecture, a rant now and
          then, and whatever else feels worth keeping.
        </p>
      </section>

      {dives.length > 0 && (
        <section
          className={`${styles.dives} reveal`}
          style={{ animationDelay: '120ms' }}
        >
          <h2 className="t-label">deep dives</h2>
          <div>
            {dives.map((dive, i) => (
              <DiveCard
                key={dive.slug}
                dive={dive}
                showUpdated={false}
                style={{ animationDelay: `${160 + i * 40}ms` }}
              />
            ))}
          </div>
          <Link href="/deep-dives" className={styles.all}>
            all deep dives →
          </Link>
        </section>
      )}

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
