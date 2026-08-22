import type { Metadata } from 'next'
import { cv } from '@/data/cv'
import { site } from '@/lib/site'
import DownloadCV from '@/components/DownloadCV'
import styles from './cv.module.css'

export const metadata: Metadata = {
  title: 'CV',
  description: `Professional record for ${cv.name} – experience, skills, education, and certifications.`,
  alternates: { canonical: '/cv' },
}

export default function CvPage() {
  return (
    <div className={`container-wide ${styles.cv}`}>
      <header className={`${styles.head} reveal`}>
        <div className={styles.headText}>
          <h1 className="t-page-title">{cv.name}</h1>
          <p className={`t-meta ${styles.headline}`}>
            {cv.headline} –{' '}
            <a href={`mailto:${cv.email}`} className={styles.headLink}>
              {cv.email}
            </a>
          </p>
          <nav className={`t-meta ${styles.headLinks}`} aria-label="Links">
            <a href={site.socials.github} target="_blank" rel="noopener noreferrer">
              github
            </a>
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin
            </a>
            <a href={site.url} target="_blank" rel="noopener noreferrer">
              bijilsubhash.io
            </a>
          </nav>
        </div>
        <div className={styles.download}>
          <DownloadCV />
        </div>
      </header>

      <p className={styles.summary}>{cv.summary}</p>

      {/* Experience */}
      <section className={styles.section}>
        <h2 className="t-label">Experience</h2>
        {cv.experience.map((job) => (
          <div key={`${job.employer}-${job.role}`} className={styles.row}>
            <div className={styles.side}>
              <div>{job.dates}</div>
              <div className={styles.faint}>{job.location}</div>
            </div>
            <div className={styles.main}>
              <h3 className={styles.role}>{job.role}</h3>
              <div className={styles.employer}>{job.employer}</div>
              <ul className={styles.bullets}>
                {job.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className={styles.section}>
        <h2 className="t-label">Skills</h2>
        {cv.skills.map((s) => (
          <div key={s.group} className={styles.row}>
            <div className={styles.side}>{s.group}</div>
            <div className={styles.main}>
              <p className={styles.skillItems}>{s.items}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className={styles.section}>
        <h2 className="t-label">Education</h2>
        {cv.education.map((e) => (
          <div key={e.degree} className={styles.row}>
            <div className={styles.side}>{e.dates}</div>
            <div className={styles.main}>
              <h3 className={styles.role}>{e.degree}</h3>
              <div className={styles.employer}>{e.school}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Certifications */}
      <section className={styles.section}>
        <h2 className="t-label">Certifications</h2>
        {cv.certifications.map((c) => (
          <div key={c.issuer} className={styles.row}>
            <div className={styles.side}>{c.issuer}</div>
            <div className={styles.main}>
              {c.items.map((item) => (
                <div key={item.name} className={styles.cert}>
                  <span className={styles.certName}>{item.name}</span>
                  <span className={styles.certYear}>{item.year}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
