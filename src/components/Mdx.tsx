import { MDXRemote } from 'next-mdx-remote/rsc'
import type { ReactNode } from 'react'
import { mdxOptions } from '@/lib/mdx-options'
import CodeBlock from './CodeBlock'
import Mermaid from './Mermaid'
import Figure from './Figure'
import Callout from './Callout'
import YouTube from './YouTube'
import Video from './Video'
import { MdxLink } from './MdxLink'

const components = {
  pre: CodeBlock,
  // Neutralize rehype-pretty-code's <figure> wrapper; CodeBlock is the container.
  figure: ({ children }: { children?: ReactNode }) => <>{children}</>,
  img: Figure,
  a: MdxLink,
  Mermaid,
  Callout,
  YouTube,
  Video,
}

export async function Mdx({ source }: { source: string }) {
  const rendered = await MDXRemote({
    source,
    options: mdxOptions,
    components,
  })
  return <div className="prose">{rendered}</div>
}
