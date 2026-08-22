'use client'

import styles from './DownloadCV.module.css'

/** Triggers the browser print dialog; the CV @media print styles produce the PDF. */
export default function DownloadCV() {
  return (
    <button type="button" className={styles.button} onClick={() => window.print()}>
      download PDF <span aria-hidden>↓</span>
    </button>
  )
}
