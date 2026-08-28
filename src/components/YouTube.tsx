'use client'

import { useState } from 'react'
import styles from './YouTube.module.css'

/**
 * Lazy YouTube facade – no request to YouTube until the viewer clicks
 * (design.md §5). Captioned like a figure.
 */
export default function YouTube({
  id,
  title,
  caption,
}: {
  id: string
  title?: string
  caption?: string
}) {
  const [active, setActive] = useState(false)
  const poster = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        {active ? (
          <iframe
            className={styles.iframe}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={title ?? 'YouTube video'}
            allow="accelerated-download; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={styles.facade}
            onClick={() => setActive(true)}
            aria-label={title ? `Play: ${title}` : 'Play video'}
            style={{ backgroundImage: `url(${poster})` }}
          >
            <span className={styles.play} aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  )
}
