'use client'

import { useEffect, useId, useRef, useState } from 'react'
import styles from './Mermaid.module.css'

// The site is dark-only, so mermaid always renders against the dark ground.
const THEME_VARS = {
  background: '#1c1a16',
  mainBkg: '#201e1a',
  primaryColor: '#201e1a',
  primaryBorderColor: '#7cb3ac',
  nodeBorder: '#7cb3ac',
  primaryTextColor: '#d6d2c7',
  lineColor: '#736e62',
  fontSize: '12px',
} as const

/**
 * Client-rendered mermaid diagram, styled as a figure (design.md §5).
 * Strokes/fills are keyed to the dark palette (design.md §2).
 */
export default function Mermaid({
  chart,
  caption,
}: {
  chart: string
  caption?: string
}) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '')
  const ref = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const mermaid = (await import('mermaid')).default
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        // 'base' is the only built-in theme that honours themeVariables.
        theme: 'base',
        fontFamily: 'var(--font-mono), ui-monospace, monospace',
        themeVariables: THEME_VARS,
      })
      try {
        const { svg } = await mermaid.render(`m-${rawId}`, chart)
        if (!cancelled) setSvg(svg)
      } catch {
        if (!cancelled) setSvg('')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [chart, rawId])

  return (
    <figure className={styles.figure}>
      <div
        ref={ref}
        className={styles.diagram}
        // mermaid output is generated locally from trusted post source
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  )
}
