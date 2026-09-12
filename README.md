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
- **New deep dive:** create `content/deep-dives/<dive-slug>/` with a `_dive.mdx`
  index that owns the metadata and the ordered parts-to-lessons list:
  ```yaml
  ---
  title: Spark Optimization
  subject: spark             # spark | databricks | agents | mlops | ...
  description: "One-line summary for cards, meta, and OG."
  youtubePlaylist: PL...     # optional
  related:                   # optional, internal paths
    - /writing/from-rdds-to-sdp
  parts:                     # required and ordered; parts never appear in URLs
    - title: Foundations
      lessons: [spark-architecture, execution-model]
    - title: Memory
      lessons: [spill, caching]
  ---
  Intro paragraph(s) for the dive landing page. Full MDX.
  ```
  Lesson order lives here and nowhere else. The folder name is the dive slug.
  Set `draft: true` to hide the whole dive in production. The build fails if a
  listed lesson slug has no matching file or is listed twice; a lesson file that
  exists but is not listed is left unreachable with a build warning.
- **New lesson:** add `content/deep-dives/<dive-slug>/<lesson-slug>.mdx`, then
  list its slug under a part in `_dive.mdx`. Front matter is a post's plus an
  optional YouTube video:
  ```yaml
  ---
  title: Shuffle
  date: "2026-09-20"
  description: "One-line summary used for meta and OG cards."
  tags: [spark, performance]   # optional
  youtube: dQw4w9WgXcQ         # optional, YouTube video ID only, not a URL
  related:                     # optional, internal paths
    - /writing/from-rdds-to-sdp
  ---
  ```
  Same MDX component set as a post. `date` is the lesson's first-published date;
  the dive's updated date is derived as the newest lesson date. Set
  `draft: true` to keep a lesson out of production.
- **About:** edit `content/about.mdx`.
- **CV:** edit `src/data/cv.ts`.
- **Images:** put files in `public/img/` and reference them as `/img/<file>`.

## Project docs

- `CONTEXT.md` — domain glossary
- `docs/adr/` — architecture decisions
- `docs/design/design.md` — the design system (source of truth for tokens)
- `DEPLOY.md` — Vercel setup and the Netlify → DNS cutover
