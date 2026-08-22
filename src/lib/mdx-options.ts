import type { PluggableList } from 'unified'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode, { type Options as PrettyCodeOptions } from 'rehype-pretty-code'
import { remarkMermaid } from './remark-mermaid'
import { rehypeUnwrapImages } from './rehype-unwrap-images'
import { codeTheme, codeThemeDark } from './shiki-theme'

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: codeTheme, dark: codeThemeDark } as unknown as PrettyCodeOptions['theme'],
  keepBackground: false,
  defaultLang: 'text',
  bypassInlineCode: true,
}

const remarkPlugins: PluggableList = [remarkGfm, remarkMermaid]
const rehypePlugins: PluggableList = [
  rehypeSlug,
  rehypeUnwrapImages,
  [rehypePrettyCode, prettyCodeOptions],
]

export const mdxOptions = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins,
    rehypePlugins,
  },
}
