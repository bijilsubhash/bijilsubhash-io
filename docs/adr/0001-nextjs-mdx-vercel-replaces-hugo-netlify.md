# Rebuild on Next.js + MDX + Vercel, retiring Hugo + Netlify

The site was a Hugo static site (theme `nightfall` via git submodules, mermaid module) deployed on Netlify. We rebuilt it as a Next.js (App Router) site with content authored in MDX, styled from the token system in `docs/design/design.md`, and deployed to Vercel.

Why: the new editorial design system needs precise, component-level control (custom code blocks, callouts, a lazy YouTube facade, per-post OG cards via `next/og`, a data-driven print-clean CV) that is awkward inside a third-party Hugo theme. MDX gives first-party React components inside prose; Vercel gives zero-config previews, edge OG generation, and `next/font` self-hosting. The four published posts were migrated; all Hugo artifacts (config, layouts, theme submodules, `netlify.toml`) were removed.

## Consequences

- Content is now MDX under `content/`, front matter is YAML. Reading time, syntax highlighting, and mermaid are handled by build/runtime tooling rather than the Hugo theme.
- Lock-in shifts to Next.js/React and Vercel. Static export remains possible if we ever need to leave, but OG generation and image optimization assume Vercel.
- Netlify and its DNS must be disconnected manually as the final cutover step (see ADR-0003).
