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
