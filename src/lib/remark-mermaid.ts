import { visit } from 'unist-util-visit'

/**
 * Replaces ```mermaid fenced code blocks with a <Mermaid chart="..." /> MDX
 * element before rehype-pretty-code runs, so mermaid source is never sent to
 * the syntax highlighter. An optional caption is read from the fence meta:
 * ```mermaid caption="A dlt pipeline under the hood"
 */
export function remarkMermaid() {
  return (tree: unknown) => {
    visit(tree as never, 'code', (node: never, index, parent) => {
      const codeNode = node as { lang?: string; value: string; meta?: string }
      if (codeNode.lang !== 'mermaid' || !parent || index === undefined) return

      const caption =
        typeof codeNode.meta === 'string'
          ? codeNode.meta.match(/caption="([^"]*)"/)?.[1]
          : undefined

      const attributes: Array<{ type: string; name: string; value: string }> = [
        { type: 'mdxJsxAttribute', name: 'chart', value: codeNode.value },
      ]
      if (caption) {
        attributes.push({ type: 'mdxJsxAttribute', name: 'caption', value: caption })
      }

      ;(parent as { children: unknown[] }).children[index] = {
        type: 'mdxJsxFlowElement',
        name: 'Mermaid',
        attributes,
        children: [],
      }
    })
  }
}
