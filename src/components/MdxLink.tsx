import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'

/** Links inside prose: internal via next/link, external open in a new tab. */
export function MdxLink({ href = '', children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const isInternal = href.startsWith('/') || href.startsWith('#')
  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}
