import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={`container ${styles.wrap}`}>
      <h1 className="t-page-title">Not found</h1>
      <p className={styles.text}>That page does not exist.</p>
      <div className={styles.links}>
        <Link href="/writing" className={styles.link}>
          all writing →
        </Link>
        <Link href="/" className={styles.link}>
          home →
        </Link>
      </div>
    </div>
  )
}
