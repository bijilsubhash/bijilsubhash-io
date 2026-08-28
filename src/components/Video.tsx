import styles from './Video.module.css'

/**
 * Self-hosted video, captioned like a figure (design.md §5). Native controls,
 * preload="none" + a poster so the file only downloads once the viewer plays it.
 */
export default function Video({
  src,
  poster,
  caption,
}: {
  src?: string
  poster?: string
  caption?: string
}) {
  if (!src) return null
  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <video
          className={styles.video}
          controls
          preload="none"
          poster={poster}
          playsInline
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  )
}
