import type { ReactNode } from 'react'
import styles from './Callout.module.css'

type Variant = 'note' | 'tip' | 'warning'

const LABELS: Record<Variant, string> = {
  note: 'note',
  tip: 'tip',
  warning: 'warning',
}

/**
 * Callout with note / tip / warning variants — design.md §5.
 * Usage in MDX: <Callout type="tip">...</Callout>
 */
export default function Callout({
  type = 'note',
  children,
}: {
  type?: Variant
  children: ReactNode
}) {
  const variant: Variant = LABELS[type] ? type : 'note'
  return (
    <aside className={`${styles.callout} ${styles[variant]}`}>
      <span className={styles.label}>{LABELS[variant]}</span>
      <div className={styles.body}>{children}</div>
    </aside>
  )
}
