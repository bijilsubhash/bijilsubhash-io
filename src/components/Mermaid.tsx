'use client'

import { useEffect, useId, useRef, useState } from 'react'
import styles from './Mermaid.module.css'

/**
 * Client-rendered mermaid diagram, styled as a figure for the light theme
 * (design.md §5). Theme overrides key strokes/fills to the palette.
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
        themeVariables: {
          background: '#ffffff',
          mainBkg: '#ffffff',
          primaryColor: '#ffffff',
          primaryBorderColor: '#24625f',
          nodeBorder: '#24625f',
          primaryTextColor: '#2f2d28',
          lineColor: '#9b978e',
          fontSize: '12px',
        },
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
