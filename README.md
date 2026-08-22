# bijilsubhash.io

Personal website and technical blog of Bijil Subhash — a linear, single-author,
light-theme editorial blog about the modern data stack.

Built with **Next.js (App Router)** + **MDX**, styled with plain CSS + CSS
Modules from the token system in `docs/design/design.md`, deployed to **Vercel**.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Authoring

- **New post:** add `content/writing/<slug>.mdx` with front matter:
  ```yaml
  ---
  title: My Post Title
  date: "2026-08-22"
  tags: [dbt, data engineering]
  description: "One-line summary used for meta and OG cards."
  ---
  ```
  Set `draft: true` to keep a post in the repo but out of the production build.
  Rich content available in MDX: fenced code blocks (custom light syntax theme,
  copy button), ` ```mermaid ` diagrams (add `caption="..."` on the fence),
  `<Callout type="note|tip|warning">`, `<YouTube id="..." caption="..." />`,
  images (`![caption](/img/file.png)`), blockquotes, and footnotes.
- **About:** edit `content/about.mdx`.
- **CV:** edit `src/data/cv.ts`.
- **Images:** put files in `public/img/` and reference them as `/img/<file>`.

## Project docs

- `CONTEXT.md` — domain glossary
- `docs/adr/` — architecture decisions
- `docs/design/design.md` — the design system (source of truth for tokens)
- `DEPLOY.md` — Vercel setup and the Netlify → DNS cutover
