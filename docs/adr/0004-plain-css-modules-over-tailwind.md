# Styling with plain CSS + CSS Modules, not Tailwind

We implement the design system as a global `tokens.css` (holding `design.md`'s `--color-*`, spacing, and type variables verbatim) plus a CSS Module per component, rather than the more common Tailwind-on-Next default.

Why: `docs/design/design.md` is a finished, fixed token system with exact hex and px values. Plain CSS lets those tokens live in `:root` byte-for-byte, so the code cannot drift from the spec, and it avoids a translation layer for a design that is stable rather than churning through layout variations. Tailwind's utility speed pays off for exploratory app UIs; this is a stable editorial design with ~7 page types.

## Consequences

- `design.md` variable names are the CSS variable names — a reader can trace any value straight back to the spec.
- Fewer dependencies to break on Next/Vercel upgrades. If the design later becomes a churning app UI, revisiting this is low-cost.
