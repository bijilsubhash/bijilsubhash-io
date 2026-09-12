# Deep Dives as a second content type, disjoint from Writing

The site had one content type: Writing, a date-ordered archive of standalone
posts. We are adding a second, **Deep Dives**: structured teaching material
where a deep dive is an ordered set of lessons (grouped into parts) on one
subject, each lesson a written page with an optional YouTube video. The nav
becomes `writing – deep dives – about – cv`.

Two shape decisions are baked in here and would be expensive to undo:

1. **Subjects are not top-level.** Spark, Databricks, and whatever comes next
   (agents, MLOps) are a `subject` field on a deep dive, used to group the
   `/deep-dives` index. They are not nav items and not URL segments. The
   alternative, `/spark/...` and `/databricks/...` as siblings of `/writing`,
   was rejected because it hard-codes today's two subjects into the site's
   structure and forces a nav change for every new subject.
2. **Writing and Deep Dives are disjoint.** No post migrates into a dive, and no
   lesson is listed in the Writing archive. Posts are essays with a date and a
   take; lessons are teaching material with a place in a sequence. Migrating
   would break URLs and muddle both shapes. Cross-references use an optional
   `related` list of internal paths on either type.

Why: the goal is a place that scales to many subjects over years without
restructuring, while keeping the existing blog untouched and its URLs stable.

## Consequences

- New content root `content/deep-dives/<dive>/` with a `_dive.mdx` index that
  owns metadata and lesson order. Lesson frontmatter is a post's frontmatter
  plus optional `youtube` and `related`.
- New routes `/deep-dives`, `/deep-dives/<dive>`, `/deep-dives/<dive>/<lesson>`.
  Parts never appear in URLs.
- A separate loader `src/lib/deep-dives.ts` mirrors `src/lib/posts.ts` rather
  than generalising it.
- Tag pages stay posts-only for now; extending them to lessons is a follow-up.
- The design and vocabulary are specified in `docs/design/deep-dives.md` and the
  "Deep Dives" section of `CONTEXT.md`.
