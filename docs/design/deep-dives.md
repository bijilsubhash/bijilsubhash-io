# Deep Dives: design

Status: approved for build. Produced from a grill-with-docs session on 2026-09-12.
Companion docs: `CONTEXT.md` (glossary, "Deep Dives" section), `docs/adr/0006-deep-dives-as-second-content-type.md`.

## 1. Goal

Add a second content type to bijilsubhash.io for structured, curriculum-shaped teaching material on Spark and Databricks (and later agents, context engineering, MLOps). Each unit is a **deep dive**: an ordered set of **lessons**, grouped into **parts**, where each lesson is a written MDX page with an optional YouTube video embedded above it.

Writing stays exactly as it is. Nothing migrates.

### Non-goals (v1)

- No accounts, progress tracking, "mark complete", or any client-side state.
- No comments, search, or newsletter.
- No transcripts, chapter timestamps, or per-lesson time estimates.
- No status badges (in-progress / complete). Lesson count and last-updated date carry that signal.
- No changes to the Writing archive, post pages, About, CV, or the design tokens.
- No YouTube channel tooling. The site only needs a video ID.

## 2. Domain model

Vocabulary is canonical in `CONTEXT.md`. Summary:

```
Deep Dive        one finishable subject, e.g. "Spark Optimization"
  subject        single tag-like grouping: spark | databricks | agents | mlops | ...
  parts[]        ordered, named groups
    lessons[]    ordered lesson slugs
Lesson           one MDX file; text is canonical; optional youtube video
```

Rules:

- A deep dive has **one** subject. Subjects group the index page. They are not nav items and not containers in the URL.
- Parts are **required** and rendering-only. They never appear in URLs.
- Lesson order lives **only** in the dive index file, never in lesson frontmatter.
- A lesson with no `youtube` field is a normal, fully published lesson.
- Writing and Deep Dives are disjoint. A post never becomes a lesson. Cross-linking uses `related`.

## 3. Content layout

```
content/
  writing/                         (unchanged)
  deep-dives/
    spark-optimization/
      _dive.mdx                    dive index: metadata + ordered parts/lessons
      spark-architecture.mdx       lesson
      shuffle.mdx                  lesson
      spill.mdx                    lesson
      ...
    lakebase-101/
      _dive.mdx
      ...
```

Folder name = dive slug. Lesson file name = lesson slug. The `_dive.mdx` body (below the frontmatter) is the dive's landing-page intro and may use the full MDX component set.

### 3.1 Dive index frontmatter (`_dive.mdx`)

```yaml
---
title: Spark Optimization
subject: spark
description: "One-line summary for cards, meta, and OG."
youtubePlaylist: PLxxxxxxxx        # optional
draft: false                       # optional, same semantics as posts
related:                           # optional, internal paths
  - /writing/from-rdds-to-sdp
parts:
  - title: Foundations
    lessons: [spark-architecture, execution-model]
  - title: Memory
    lessons: [spill, caching]
  - title: Data movement
    lessons: [shuffle, serialization, skew]
---
Intro paragraph(s) shown on the dive landing page. Full MDX.
```

### 3.2 Lesson frontmatter

Identical to a post, plus `youtube`. No lesson-specific fields (decided: lessons look like posts).

```yaml
---
title: Shuffle
date: "2026-09-20"
description: "One-line summary used for meta and OG cards."
tags: [spark, performance]         # optional, same canonicalisation as posts
youtube: dQw4w9WgXcQ               # optional, YouTube video ID only, not a URL
draft: false                       # optional
related:                           # optional, internal paths
  - /writing/from-rdds-to-sdp
---
Body. Full MDX component set (code, mermaid, Callout, Figure, footnotes, ...).
```

`date` on a lesson means "first published". The dive's `updatedAt` is derived as the max lesson date; do not store it.

### 3.3 Validation (build-time)

Implement in the loader so `next build` fails loudly rather than silently rendering a broken dive:

- **Error**: a slug listed in `parts[].lessons` has no matching `.mdx` file.
- **Error**: the same lesson slug appears twice across parts.
- **Error**: `subject` missing, or `parts` empty.
- **Warning** (console, non-fatal): a lesson `.mdx` exists in the folder but is not listed in `_dive.mdx`. It is unreachable. This is how you park a half-written lesson without `draft: true`; both mechanisms are allowed.
- `draft: true` on a lesson removes it from the rendered dive (and from prev/next, sidebar, sitemap) in production; in development it renders, mirroring `getAllPosts`.
- `draft: true` on a dive hides the whole dive the same way.

## 4. Routes

| Route | Page | Notes |
| --- | --- | --- |
| `/deep-dives` | Index | Cards grouped by subject. |
| `/deep-dives/<dive>` | Dive landing | Title, description, intro body, full table of contents (parts + lessons), "watch the playlist" link if `youtubePlaylist` set, related links. |
| `/deep-dives/<dive>/<lesson>` | Lesson | Sidebar + video + body + prev/next. |

All statically generated via `generateStaticParams`, same as `/writing/[slug]`.

Nav order becomes `writing – deep dives – about – cv`. Update `nav` in `src/lib/site.ts`; `Header` already renders from it and handles active state via `pathname.startsWith`.

### 4.1 Index page `/deep-dives`

- Heading: "Deep dives" plus a one-line description of what the section is.
- Group by subject, in a fixed order defined in code (`spark`, `databricks`, then alphabetical for anything else). Subject label rendered lowercase to match the site's label style.
- Each dive card: title (link), description, `N lessons`, `updated <date>`. No thumbnails, no badges.
- Empty subjects are not rendered.

### 4.2 Dive landing `/deep-dives/<dive>`

- Same single-column `container` layout as a post.
- Header: title, description, meta line `N lessons – updated <date>`.
- Intro body (MDX from `_dive.mdx`).
- Table of contents: parts as `h2`-style labels, lessons as an ordered list beneath each, linking to lesson pages. Reuse `PostRow` styling if it fits; otherwise a new `LessonRow`.
- If `youtubePlaylist` is set, a single link "watch the full playlist on YouTube" near the TOC.
- Related links, if any, at the bottom under a `t-label` heading "related".

### 4.3 Lesson page `/deep-dives/<dive>/<lesson>`

Layout, desktop (>= the existing breakpoint for the header's desktop nav):

```
+-----------------+-------------------------------------------+
| DiveSidebar     | header: dive title (link back), lesson    |
| (sticky)        |         title, date – reading time, tags  |
|  Part           | [YouTube facade, if youtube set]          |
|   - lesson      | body (Mdx, .prose)                        |
|   - lesson *    | related links (if any)                    |
|  Part           | LessonPager: prev / next                  |
|   - lesson      |                                           |
+-----------------+-------------------------------------------+
```

- The body column keeps the same measure as `.prose` on post pages. The sidebar sits in the left gutter and must not narrow the reading column below the design's measure; if the viewport cannot fit both, collapse to the mobile layout.
- Mobile: sidebar becomes a collapsible "in this deep dive" disclosure above the header, closed by default, current lesson shown in the summary line.
- Sidebar highlights the current lesson. Parts are plain labels, not links.
- Video: reuse the existing `YouTube` component (lazy facade, `youtube-nocookie`). Render it directly above the body, full body width, with `title` set to the lesson title and no caption.
- Prev/next: title of the adjacent lesson with a small "previous" / "next" label. Crossing a part boundary is fine; at the first lesson "previous" links to the dive landing page; at the last lesson "next" is omitted.
- Tags render as `TagChip` exactly as on posts.

## 5. Code plan

Mirror `src/lib/posts.ts` rather than generalising it. Two small loaders are easier to read than one abstract one.

### 5.1 `src/lib/deep-dives.ts`

```ts
export type Subject = 'spark' | 'databricks' | 'agents' | 'mlops' | (string & {})

export type Lesson = {
  slug: string
  diveSlug: string
  title: string
  date: string
  description: string
  tags: string[]
  youtube?: string
  related: string[]
  draft: boolean
  readingTime: string
  content: string
  // navigation, resolved after ordering
  part: string
  index: number            // 0-based position across the whole dive
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
}

export type Part = { title: string; lessons: Lesson[] }

export type DeepDive = {
  slug: string
  title: string
  subject: Subject
  description: string
  youtubePlaylist?: string
  related: string[]
  draft: boolean
  parts: Part[]
  lessons: Lesson[]        // flattened, in order
  lessonCount: number
  updatedAt: string        // max lesson date
  content: string          // _dive.mdx body
}

export function getAllDeepDives(): DeepDive[]              // non-draft, sorted by updatedAt desc
export function getDeepDiveBySlug(slug: string): DeepDive | null
export function getLesson(dive: string, lesson: string): Lesson | null
export function groupBySubject(dives: DeepDive[]): { subject: Subject; dives: DeepDive[] }[]
```

- Read `_dive.mdx` with `gray-matter`, then each listed lesson file. Apply the validation in 3.3.
- Reuse `tagLabel` / `tagSlug` from `src/lib/tags.ts` and `reading-time` exactly as posts do.
- Drafts: same `NODE_ENV === 'development'` rule as `getAllPosts`.

### 5.2 Pages

```
src/app/deep-dives/page.tsx                          index
src/app/deep-dives/deep-dives.module.css
src/app/deep-dives/[dive]/page.tsx                   landing
src/app/deep-dives/[dive]/dive.module.css
src/app/deep-dives/[dive]/opengraph-image.tsx        copy of writing/[slug]/opengraph-image.tsx pattern
src/app/deep-dives/[dive]/[lesson]/page.tsx          lesson
src/app/deep-dives/[dive]/[lesson]/lesson.module.css
src/app/deep-dives/[dive]/[lesson]/opengraph-image.tsx
```

Metadata: follow `writing/[slug]/page.tsx` (`generateMetadata` with canonical, OG `type: 'article'`, twitter card). OG image for a lesson should include the dive title as a kicker line above the lesson title so shares read "Spark Optimization / Shuffle". Reuse `src/lib/og.tsx`.

### 5.3 Components

```
src/components/DiveCard.tsx        + .module.css   index card
src/components/DiveToc.tsx         + .module.css   parts + lessons list (landing page)
src/components/DiveSidebar.tsx     + .module.css   sticky/collapsible sidebar (lesson page); client component only if the mobile disclosure needs state, otherwise use <details>
src/components/LessonPager.tsx     + .module.css   prev / next
src/components/RelatedLinks.tsx    + .module.css   shared by posts (later) and lessons
```

Prefer `<details>/<summary>` for the mobile sidebar so `DiveSidebar` can stay a server component.

### 5.4 Other touch points

- `src/lib/site.ts`: add `{ href: '/deep-dives', label: 'deep dives' }` to `nav` between writing and about.
- `src/app/page.tsx`: add a "deep dives" block above "recent" showing the 3 most recently updated dives (title, description, lesson count). Same `t-label` heading style as "recent". Section is omitted entirely when there are no dives (so the home page is unchanged until the first dive ships).
- `src/app/sitemap.ts`: add `/deep-dives`, each dive (lastModified = `updatedAt`), each lesson (lastModified = lesson date).
- `src/app/robots.ts`: no change.
- `docs/design/design.md` §10 Routes: add the three new routes. §5 Components: add sidebar and card if new tokens are introduced (aim for none).
- `README.md` Authoring: add a "New deep dive" and "New lesson" subsection.

### 5.5 Tags

v1: `/tags/<tag>` continues to list posts only. `getAllTags` and `getPostsByTag` are unchanged. Lessons carry tags for display and metadata only. Extending tag pages to include lessons is a follow-up (it needs a mixed-type archive row).

## 6. Design constraints

- Plain CSS + CSS Modules, tokens from `docs/design/design.md`. No Tailwind (ADR 0004). No new colour tokens; the sidebar uses existing text/muted/rule tokens.
- Light and dark must both work (ADR 0005). Test the sidebar highlight and the YouTube facade in both.
- Typography conventions in `CLAUDE.md` apply to all new prose, UI strings, and comments: no em dash, no interpunct, spaced en dash as separator.
- Lowercase labels for nav and section headings, matching the existing site.
- Motion: reuse the `reveal` class where post pages use it; nothing new.

## 7. Implementation phases

Each phase should build green and be deployable on its own. Open one PR per phase so Vercel previews stay small.

1. **Loader + seed content.** `src/lib/deep-dives.ts`, validation, unit-level sanity via a throwaway script or a `console.log` in dev. Add the seed `content/deep-dives/spark-optimization/` from this pack. Add glossary section to `CONTEXT.md` and ADR 0006.
2. **Routes, no chrome.** Index, landing, lesson pages rendering plain content with existing post styles. Nav entry. Sitemap. Site is shippable here.
3. **Lesson chrome.** `DiveSidebar`, `LessonPager`, video placement, mobile disclosure. Dark mode pass.
4. **Index and home.** `DiveCard`, subject grouping, home page block, OG images.
5. **Docs.** README authoring section, design.md routes, remove any leftover TODOs.

Suggested first Claude Code prompt:

> Read `docs/design/deep-dives.md`, the "Deep Dives" section of `CONTEXT.md`, and `docs/adr/0006-deep-dives-as-second-content-type.md`. Implement phase 1 only. Mirror the patterns in `src/lib/posts.ts`. Do not touch Writing. Follow `CLAUDE.md` typography rules. Stop and show me the loader output for the seed dive before moving on.

## 8. Decisions log (from the grill)

| # | Question | Decision |
| --- | --- | --- |
| 1 | Content storage | MDX in repo, extend existing loader pattern |
| 2 | Site shape | Two content types: Writing + Deep Dives. Subjects nested, not nav. (ADR 0006) |
| 3 | Section name | `deep dives` / `deep dive` / `lesson` |
| 4 | Grouping | Deep dive contains required parts; parts are rendering-only |
| 5 | Each subject is its own dive | e.g. Spark Optimization, dbt with Databricks, Lakebase 101 |
| 6 | Text vs video | Text canonical; `youtube: <id>` optional |
| 7 | Ordering | In `_dive.mdx` index, not in lessons |
| 8 | Lesson layout | Sidebar + prev/next; no progress tracking |
| 9 | Index page | Grouped by subject; no status badge; home page gets a block |
| 10 | Existing posts | Disjoint; `related` links both ways (ADR 0006) |
| 11 | Lesson metadata | Nothing beyond a post; no prereqs/summary/time |
| 12 | Tags | Tag pages remain posts-only in v1 |
| 13 | RSS | Not in this build; see §9 |

## 9. Later / open

- **RSS feed.** The site has a sitemap but no feed. A feed helps slightly with visibility (feed readers, daily.dev-style aggregators, cross-posting tools that import from RSS) and costs about 40 lines with a route handler at `/feed.xml`. Worth doing once deep dives exist so both posts and lessons are in it. Not blocking.
- Tag pages including lessons.
- Per-subject index pages (`/deep-dives/spark`) if the index grows past ~8 dives.
- Chapter timestamps / transcript on lessons once videos exist.
- `video: { provider, id }` if you ever host outside YouTube. Mechanical change.
