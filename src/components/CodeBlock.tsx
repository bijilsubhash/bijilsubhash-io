'use client'

import { useRef, useState, type ComponentPropsWithoutRef } from 'react'
import styles from './CodeBlock.module.css'

type PreProps = ComponentPropsWithoutRef<'pre'> & {
  'data-language'?: string
}

export default function CodeBlock({ children, className, ...props }: PreProps) {
  const ref = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)
  const lang = props['data-language'] ?? 'text'

  const copy = async () => {
    const text = ref.current?.innerText ?? ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.lang}>{lang}</span>
        <button
          type="button"
          className={styles.copy}
          onClick={copy}
          aria-label="Copy code"
        >
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre ref={ref} className={styles.pre} {...props}>
        {children}
      </pre>
    </div>
  )
}
