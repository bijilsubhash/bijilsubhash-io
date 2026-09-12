import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { isGateEnabled, safeNext } from '@/lib/deep-dives-gate'
import { unlock } from './actions'
import styles from './unlock.module.css'

export const metadata: Metadata = {
  title: 'Deep dives',
  robots: { index: false, follow: false },
}

export default async function UnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  // No gate configured: the section is public, so there is nothing to unlock.
  if (!isGateEnabled()) redirect('/deep-dives')

  const params = await searchParams
  const next = safeNext(params.next)
  const hasError = params.error === '1'

  return (
    <div className={`container ${styles.wrap} reveal`}>
      <h1 className="t-page-title">Deep dives</h1>
      <p className={styles.text}>
        This section is not public yet. Enter the password to preview it.
      </p>

      <form action={unlock} className={styles.form}>
        <input type="hidden" name="next" value={next} />
        <label className="t-label" htmlFor="dd-password">
          password
        </label>
        <div className={styles.row}>
          <input
            id="dd-password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            aria-invalid={hasError}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            unlock
          </button>
        </div>
        {hasError ? (
          <p className={styles.error} role="alert">
            Incorrect password.
          </p>
        ) : null}
      </form>
    </div>
  )
}
