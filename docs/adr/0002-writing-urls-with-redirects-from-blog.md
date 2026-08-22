# Posts live at /writing/<slug>, with permanent redirects from the old /blog URLs

The design puts posts at `/writing/<slug>` and the About page at `/about`. The old Hugo site served posts at `/blog/<slug>/` and also exposed bare-slug and alias URLs (`/about-me`, `/about-us`, `/contact`, and each post's bare slug at the root). We kept the design's `/writing` structure and added permanent (301) redirects from every old URL to its new home. Post slugs are unchanged, so only the path prefix moves.

Why: `/writing` matches the design and reads better, but the old `/blog/*` URLs are indexed by search engines and exist as inbound links, so silently breaking them would cost SEO and referrals. Permanent redirects preserve link equity while adopting the new structure.

## Consequences

- Redirects are declared in `next.config` (`/blog/:slug -> /writing/:slug`, `/blog -> /writing`, plus the known aliases). This list must be maintained if slugs ever change.
- Internal cross-post links written as absolute `/blog/...` URLs in older posts are rewritten to `/writing/...` during migration so they don't rely on the redirect.
