/**
 * Custom light syntax theme keyed to the palette in docs/design/design.md §2.
 * Never a dark block on the light page. Typed loosely; cast at the
 * rehype-pretty-code call site.
 */
export const codeTheme = {
  name: 'bijil-light',
  type: 'light',
  colors: {
    'editor.background': '#f5f3ec',
    'editor.foreground': '#2f2d28',
  },
  // Keyed as `tokenColors` (not `settings`) so rehype-pretty-code recognizes
  // this as a JSON theme; shiki accepts either key.
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
      settings: { foreground: '#9b978e', fontStyle: 'italic' },
    },
    {
      scope: [
        'keyword',
        'storage',
        'storage.type',
        'storage.modifier',
        'keyword.control',
        'keyword.operator',
        'keyword.other',
        'variable.language',
        'constant.language',
        'support.type',
        'entity.name.tag',
      ],
      settings: { foreground: '#8a7f6d' },
    },
    {
      scope: [
        'string',
        'string.quoted',
        'string.template',
        'punctuation.definition.string',
        'markup.inline.raw',
      ],
      settings: { foreground: '#24625f' },
    },
    {
      scope: [
        'constant.numeric',
        'constant.language.boolean',
        'constant.other',
        'support.constant',
      ],
      settings: { foreground: '#a35c3a' },
    },
    {
      scope: [
        'entity.name.function',
        'support.function',
        'meta.function-call.generic',
        'variable.function',
      ],
      settings: { foreground: '#1a1a1a' },
    },
    {
      scope: [
        'meta.decorator',
        'entity.name.function.decorator',
        'punctuation.decorator',
      ],
      settings: { foreground: '#8a7f6d' },
    },
    {
      scope: ['variable', 'variable.other', 'meta.definition.variable', 'identifier'],
      settings: { foreground: '#2f2d28' },
    },
    {
      scope: ['entity.name.type', 'entity.name.class', 'support.class'],
      settings: { foreground: '#1a1a1a' },
    },
  ],
}
