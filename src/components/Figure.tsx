import Image from 'next/image'
import { getImageDimensions } from '@/lib/image-dimensions'
import styles from './Figure.module.css'

/**
 * MDX image -> figure with optional italic caption (design.md §5).
 * The markdown `alt` text becomes the caption; GIFs render unoptimized.
 */
export default function Figure({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null
  const isGif = src.toLowerCase().endsWith('.gif')
  const { width, height } = getImageDimensions(src)
  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <Image
          src={src}
          alt={alt ?? ''}
          width={width}
          height={height}
          unoptimized={isGif}
          sizes="(max-width: 767px) 100vw, 680px"
          className={styles.img}
        />
      </div>
      {alt ? <figcaption className={styles.caption}>{alt}</figcaption> : null}
    </figure>
  )
}
