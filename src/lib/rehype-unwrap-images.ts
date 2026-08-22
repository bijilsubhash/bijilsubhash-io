import { visit, SKIP } from 'unist-util-visit'

/**
 * Lifts a lone <img> out of its wrapping <p> so the image can render as a
 * block <figure> without producing invalid <figure>-inside-<p> markup.
 */
export function rehypeUnwrapImages() {
  return (tree: unknown) => {
    visit(tree as never, 'element', (node: never, index, parent) => {
      const el = node as { tagName?: string; children: Array<{ type?: string; value?: string; tagName?: string }> }
      if (el.tagName !== 'p' || !parent || index === undefined) return
      const meaningful = el.children.filter(
        (c) => !(c.type === 'text' && (c.value ?? '').trim() === '')
      )
      if (meaningful.length === 1 && meaningful[0].tagName === 'img') {
        ;(parent as { children: unknown[] }).children.splice(index, 1, meaningful[0])
        return [SKIP, index]
      }
    })
  }
}
