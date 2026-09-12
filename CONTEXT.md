# bijilsubhash.io

The personal website and technical blog of Bijil Subhash — a linear, single-author, light-theme-only editorial blog about the modern data stack. Built with Next.js (App Router) + MDX, deployed to Vercel. The visual system is defined in `docs/design/design.md`, which is the source of truth for all design tokens.

## Language

**Writing**:
The blog and its archive — the collection of published posts and the `/writing` route that lists them. This is the canonical term for what was previously called "blog".
_Avoid_: Blog, articles, posts (as a section name), showcase, docs

**Post**:
A single published piece of long-form writing, authored in MDX under `content/`, served at `/writing/<slug>`.
_Avoid_: Article, entry

**Draft**:
A post kept in the repo but excluded from the production build. Not published, not linked. (No drafts currently exist — the one Hugo draft was dropped in the migration.)

**Tag**:
A topic label on a post. Canonicalized to a lowercase kebab-case slug (so `DLT` and `dlt` are the same tag); displayed as a lowercase chip. Its page at `/tags/<tag>` reuses the Writing archive layout, filtered.

**About**:
The warm, human first-person narrative page (`/about`). Prose. Distinct from the CV.
_Avoid_: Bio, profile

**CV**:
The scannable, print-clean professional record (`/cv`) — experience, skills, education, certifications. Data-driven, not prose. Doubles as the downloadable résumé via print-to-PDF. Distinct from the About page.
_Avoid_: Résumé (in code/UI), profile

**Production**:
The live site at `bijilsubhash.io`, built from the `main` branch.
_Avoid_: Live, prod (in prose)

**Preview**:
An automatic Vercel deployment built for a pull request, at a unique throwaway URL. Serves as the review/staging environment. There is no long-lived "staging" branch or environment.
_Avoid_: Staging, dev deploy

**Deep Dives**:
The second content type alongside Writing: structured teaching material, and the `/deep-dives` route that lists it. Contains many deep dives, grouped by subject. *Avoid*: Courses, learn, tutorials, modules, guides, academy

**Deep Dive**:
One finishable subject taught as an ordered set of lessons, e.g. "Spark Optimization" or "Lakebase 101". Lives in `content/deep-dives/<slug>/`, served at `/deep-dives/<slug>`. Has exactly one subject and one or more parts. *Avoid*: Course, series, track, module

**Dive index**:
The `_dive.mdx` file in a deep dive's folder. Owns the dive's title, subject, description, optional playlist, and the ordered parts-to-lessons list. Its body is the dive landing page intro. Lesson order lives here and nowhere else. *Avoid*: Manifest, config, TOC (for the file)

**Subject**:
The single grouping a deep dive belongs to: `spark`, `databricks`, `agents`, `mlops`, and so on. Used to group the Deep Dives index. Not a nav item, not a URL segment, not a container. Distinct from a tag (many per item) and from a part (inside a dive). *Avoid*: Category, track, topic (as a field name)

**Part**:
A named, ordered group of lessons inside a deep dive, e.g. "Memory". Rendering-only: shows in the sidebar and table of contents, never in a URL. Every deep dive has at least one part. *Avoid*: Section, chapter, module

**Lesson**:
One unit inside a deep dive: an MDX file with the same frontmatter as a post plus optional `youtube` and `related`, served at `/deep-dives/<dive>/<lesson>`. The written text is canonical; a lesson with no video is a normal, fully published lesson. *Avoid*: Post (for a lesson), episode, article, video (as the unit)

**Video**:
The YouTube video attached to a lesson via `youtube: <video-id>`. Rendered as the existing lazy YouTube facade above the lesson body. Always YouTube; always an ID, never a URL. *Avoid*: Embed (as the noun), clip

**Playlist**:
The optional YouTube playlist ID on a dive index (`youtubePlaylist`), linked from the dive landing page. *Avoid*: Channel, series

**Related**:
An optional list of internal site paths on a post, dive, or lesson, rendered as plain links at the end of the page. The only cross-reference mechanism between Writing and Deep Dives. *Avoid*: See also (as a field name), backlinks, prerequisites

**Draft** (extended):
Applies to lessons and deep dives with the same semantics as posts (`draft: true`, hidden in Production, visible in development). A lesson file that exists but is not listed in its dive index is also unreachable and is reported as a build warning.
