/**
 * Custom syntax themes keyed to the palette in docs/design/design.md §2 (light)
 * and its dark counterpart. Used as a rehype-pretty-code dual theme. Typed
 * loosely; cast at the call site. `tokenColors` (not `settings`) so
 * rehype-pretty-code recognizes these as JSON themes.
 */
type Palette = {
  bg: string
  fg: string
  comment: string
  keyword: string
  string: string
  number: string
  fn: string
}

function makeTheme(name: string, type: 'light' | 'dark', p: Palette) {
  return {
    name,
    type,
    colors: {
      'editor.background': p.bg,
      'editor.foreground': p.fg,
    },
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
        settings: { foreground: p.comment, fontStyle: 'italic' },
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
          'meta.decorator',
          'entity.name.function.decorator',
          'punctuation.decorator',
        ],
        settings: { foreground: p.keyword },
      },
      {
        scope: [
          'string',
          'string.quoted',
          'string.template',
          'punctuation.definition.string',
          'markup.inline.raw',
        ],
        settings: { foreground: p.string },
      },
      {
        scope: [
          'constant.numeric',
          'constant.language.boolean',
          'constant.other',
          'support.constant',
        ],
        settings: { foreground: p.number },
      },
      {
        scope: [
          'entity.name.function',
          'support.function',
          'meta.function-call.generic',
          'variable.function',
          'entity.name.type',
          'entity.name.class',
          'support.class',
        ],
        settings: { foreground: p.fn },
      },
      {
        scope: ['variable', 'variable.other', 'meta.definition.variable', 'identifier'],
        settings: { foreground: p.fg },
      },
    ],
  }
}

export const codeTheme = makeTheme('bijil-light', 'light', {
  bg: '#f5f3ec',
  fg: '#2f2d28',
  comment: '#9b978e',
  keyword: '#8a7f6d',
  string: '#24625f',
  number: '#a35c3a',
  fn: '#1a1a1a',
})

export const codeThemeDark = makeTheme('bijil-dark', 'dark', {
  bg: '#1c1a16',
  fg: '#d6d2c7',
  comment: '#736e62',
  keyword: '#b8a98f',
  string: '#7cb3ac',
  number: '#d08b64',
  fn: '#f4f2ec',
})
