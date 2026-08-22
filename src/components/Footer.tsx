import { site } from '@/lib/site'
import styles from './Footer.module.css'

/** Footer — design.md §5. No RSS link (the site has no feed). */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.copy}>© 2026 {site.name}</span>
        <nav className={styles.links} aria-label="Social">
          <a href={site.socials.github} target="_blank" rel="noopener noreferrer">
            github
          </a>
          <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">
            linkedin
          </a>
          <a href={`mailto:${site.email}`}>email</a>
        </nav>
      </div>
    </footer>
  )
}
