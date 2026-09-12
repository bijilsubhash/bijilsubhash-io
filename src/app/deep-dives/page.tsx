import type { Metadata } from 'next'
import { getAllDeepDives, groupBySubject } from '@/lib/deep-dives'
import DiveCard from '@/components/DiveCard'
import styles from './deep-dives.module.css'

export const metadata: Metadata = {
  title: 'Deep dives',
  description:
    'Curriculum-shaped teaching series on Spark, Databricks, and the tools around them, each an ordered set of lessons.',
  alternates: { canonical: '/deep-dives' },
}

export default function DeepDivesPage() {
  const dives = getAllDeepDives()
  const groups = groupBySubject(dives)

  return (
    <div className="container">
      <header className={`${styles.head} reveal`}>
        <h1 className="t-page-title">Deep dives</h1>
        <p className={`t-meta ${styles.sub}`}>
          Ordered lesson series on the tools I work with, newest first.
        </p>
      </header>

      {groups.map((group) => (
        <section key={group.subject} className={styles.group}>
          <h2 className="t-label">{group.subject}</h2>
          <div>
            {group.dives.map((dive) => (
              <DiveCard key={dive.slug} dive={dive} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
