# Add a light/dark theme toggle

The original brief and `docs/design/design.md` specified **light theme only**. We
reversed that and added a light/dark toggle: it defaults to the visitor's OS
preference (`prefers-color-scheme`), a header control overrides it, and the
choice persists in `localStorage` with an inline no-flash script in the layout.

Why: dark mode is a common reader expectation for a technical blog, and the
token-based CSS made it cheap to add without touching component markup. The real
work was designing a warm dark palette that keeps the editorial feel and
lightening the teal accent (`#24625f` → `#7cb3ac`) for contrast on dark.

## Consequences

- Dark tokens live alongside the light ones in `src/app/globals.css`, under both
  `@media (prefers-color-scheme: dark)` and `:root[data-theme="dark"]`.
- Syntax highlighting is now a rehype-pretty-code **dual theme** (light + dark
  Shiki themes in `src/lib/shiki-theme.ts`); mermaid picks its palette from
  `useTheme()` and re-renders on change.
- OG share cards and the print/CV stylesheet stay light on purpose (fixed
  surfaces).
- `design.md` still documents the light palette as the design baseline; the dark
  palette is defined in code. Treat this ADR as the source of truth for "dark
  mode exists."
