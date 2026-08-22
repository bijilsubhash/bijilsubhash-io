# bijilsubhash.io — Design System

Build spec for the personal site and technical blog of Bijil Subhash. Next.js (App Router), MDX content, Vercel. **Light theme only** — no dark mode, no theme toggle. Fonts self-hosted via `next/font`.

Reference direction: markhorn.dev (restrained high-contrast minimalism, monospace detail, generous whitespace, subtle motion), with the editorial warmth of jzhao.xyz and the whitespace of blog.tomaszgil.me. Linear blog — no graph or digital-garden mechanics.

This file is the source of truth for tokens. It lives in the repo and is not published.

---

## 1. Brand voice

Writing for engineers who will have to maintain the thing being described. Plain, specific, first-person. Claims are grounded in what actually happened on a project.

- **Do:** name the tradeoff, name the tool, give the number. "Cutting ingestion costs by ~95%" beats "dramatically reduced costs."
- **Do:** lowercase for UI labels and nav (`writing`, `about`, `cv`, `all writing →`). Sentence case for headings and post titles.
- **Don't:** exclamation marks, hype adjectives, emoji, "unlock your data's potential", em-dash-heavy rhetorical constructions, "this, not that" formulations.
- **Metadata is mono and terse.** Dates are ISO (`2026-03-08`). Reading time is `11 min read`. No author byline anywhere — single-author site.
- **Empty states and 404** state the fact and offer the archive. No apology, no personality bit.

---

## 2. Color

Warm off-white ground, soft near-black text, one restrained accent. Everything else is grayscale. Accent is `#24625f` — a deep muted teal that reads technical without going corporate blue.

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#fafaf8` | Page background |
| `--color-surface` | `#f3f1ea` | Callout fills, code-block header, tag chips |
| `--color-code-bg` | `#f5f3ec` | Code block body |
| `--color-text` | `#1a1a1a` | Headings, primary body emphasis |
| `--color-text-body` | `#38362f` | Long-form prose |
| `--color-text-muted` | `#6b6862` | Secondary copy, nav rest state |
| `--color-text-faint` | `#9b978e` | Dates, mono metadata, footer |
| `--color-accent` | `#24625f` | Links, active nav, tags, diagram strokes |
| `--color-accent-hover` | `#1a4a47` | Link hover |
| `--color-accent-soft` | `#cfe0de` | Link underlines, quote rule, selection |
| `--color-border` | `#e4e2db` | Section rules, card and code borders |
| `--color-hair` | `#eae7df` | List-row dividers (lighter than border) |
| `--color-verify` | `#cfe0de` | Underline on certification verify links |
| `--color-selection` | `#cfe0de` | `::selection` background |

Callout variants (the only colors outside the palette; all desaturated to sit on the warm ground):

| Variant | Rule | Fill | Label |
|---|---|---|---|
| note | `#24625f` | `#f3f1ea` | `#24625f` |
| tip | `#4a7c3f` | `#f1f4ec` | `#3f6b36` |
| warning | `#a3742f` | `#f7f2e8` | `#8a6222` |

Syntax highlighting (light, on `--color-code-bg`):

| Role | Hex |
|---|---|
| plain / identifier | `#2f2d28` |
| keyword / decorator | `#8a7f6d` |
| string | `#24625f` |
| number | `#a35c3a` |
| comment | `#9b978e` |
| function name | `#1a1a1a` |

Never render a dark code block on the light page.

---

## 3. Typography

Three self-hosted families via `next/font/local` or `next/font/google` with `display: 'swap'` and preload on the heading + body faces.

| Role | Family | Weights |
|---|---|---|
| Headings, wordmark, post titles, pull quotes | **Newsreader** (variable, opsz 6–72) | 400, 500, 600 |
| Body, long-form prose, captions | **Inter** | 400, 500, 600 |
| Metadata, dates, tags, nav, code, labels | **JetBrains Mono** | 400, 500 |

Newsreader replaces Fraunces from the original brief: it holds the editorial warmth at display sizes without Fraunces' softness in the wordmark. Alternates evaluated on the artboards: Instrument Serif, Libre Caslon Text, Source Serif 4.

### Scale

| Token | Size / line-height | Family | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `display` | 44 / 1.10 | Newsreader | 500 | -0.025em | Home h1 |
| `page-title` | 38 / 1.15 | Newsreader | 500 | -0.02em | Writing, About, CV, 404 h1 |
| `post-title` | 40 / 1.14 | Newsreader | 500 | -0.025em | Post h1 |
| `h2` | 27 / 1.25 | Newsreader | 600 | -0.015em | Prose h2 |
| `h3` | 21 / 1.35 | Newsreader | 600 | 0 | Prose h3 |
| `lede` | 22 / 1.60 | Newsreader | 400 | 0 | About opening paragraph only |
| `row-title` | 19 / 1.35 | Newsreader | 500 | 0 | Post list rows (home) |
| `row-title-sm` | 18 / 1.35 | Newsreader | 500 | 0 | Archive rows |
| `prose` | 18 / 1.78 | Inter | 400 | 0 | Body copy |
| `prose-tight` | 18 / 1.70 | Inter | 400 | 0 | List items |
| `body-sm` | 16 / 1.65 | Inter | 400 | 0 | Callout text, CV bullets |
| `caption` | 14.5 / 1.60 | Inter | 400 italic | 0 | Figure captions |
| `wordmark` | 19 / 1 | Newsreader | 500 | -0.01em | Header |
| `nav` | 13 / 1 | JetBrains Mono | 400 | 0 | Nav, inline links |
| `meta` | 12.5 / 1.60 | JetBrains Mono | 400 | 0 | Dates, reading time, CV dates |
| `label` | 11.5 / 1 | JetBrains Mono | 500 | 0.10em | Section labels, uppercase |
| `code` | 13.5 / 1.72 | JetBrains Mono | 400 | 0 | Code blocks |
| `code-inline` | 0.94em / inherit | JetBrains Mono | 400 | 0 | Inline code |
| `chip` | 11.5 / 1 | JetBrains Mono | 400 | 0 | Tag chips |
| `footnote` | 15.5 / 1.65 | Inter | 400 | 0 | Footnote list |

Mobile (< 768px): `display` 32, `page-title` 30, `post-title` 28, `h2` 21, `h3` 18, `prose` 16.5 / 1.75, `body-sm` 14.5, `code` 11.5.

`text-wrap: pretty` on every prose paragraph, heading, and list item.

---

## 4. Spacing, measure, radii

4px base. Scale: `4, 8, 12, 14, 16, 20, 22, 26, 30, 34, 40, 48, 56, 66, 80, 88, 104`.

| Token | Value |
|---|---|
| `--measure-prose` | `680px` (home, writing, post, about, 404) |
| `--measure-wide` | `760px` (CV — carries the date column) |
| `--gutter` | `32px` desktop, `24px` mobile |
| `--header-pad-y` | `34px` desktop, `22px` mobile |
| `--footer-offset` | `104px` above the footer rule on Home, `80–96px` elsewhere |

Vertical rhythm inside prose: `h2` gets `48px` above / `14px` below; `h3` gets `36px` / `12px`; paragraphs `22px` below; block elements (code, figure, callout, quote) `26–34px` below.

Radii: `3px` chips and copy button, `4px` callouts and buttons, `5px` code blocks, figures, embed facades. Never larger — no pill cards.

Borders: `1px solid var(--color-border)` for containers, `1px solid var(--color-hair)` for list-row dividers, `2px` left rule for callouts and blockquotes.

Shadows: none in the running site. The artboards use `0 1px 2px rgba(26,26,26,.04), 0 14px 34px rgba(26,26,26,.06)` only to lift the page off the canvas.

---

## 5. Components

### Header
Baseline-aligned flex row inside the measure. Wordmark left (`wordmark` token, links home). Nav right: three mono lowercase links — `writing`, `about`, `cv` — `24px` gap. Rest `--color-text-muted`; hover `--color-text`; active `--color-text` with a `1px solid var(--color-accent)` bottom border, `2px` below the baseline. No social icons, no theme toggle. Mobile: two-bar hamburger (20px wide, 1.5px bars, 5px gap) opening a full-width panel of the same three links at `nav` size, `20px` row spacing.

### Footer
Separated by `1px solid var(--color-border)`, `24px` padding. Desktop: `© 2026 Bijil Subhash` left, social links right (`github`, `linkedin`, `email`) at `18px` gap. Mobile: links stack above the copyright, `12px` gap. All at `meta` size, `--color-text-faint`, links `--color-text-muted`. **No RSS link — the site has no feed.**

### Post list row
`display: grid; grid-template-columns: 96px 1fr; gap: 22px; align-items: baseline;` — date column fixed so titles align. `15px` vertical padding, `1px solid var(--color-hair)` top border, last row also bottom. Date in `meta` / faint; title in `row-title` / `--color-text`. No excerpts, no tags in rows. Hover: whole row `translateX(4px)`, title to `--color-accent`, date unchanged. Mobile: column stack, date above title, `4px` gap.

Archive adds year group headers — `label` token, not uppercase, `8px` below, `40px` between groups. Row dates drop the year (`07-14`).

### Post meta line
Directly under the post title. `meta` size, faint: `date · reading time`. Tag chips on the next line, `14px` below, and repeated at the end of the article above the footnotes.

### Tag chip
`chip` size, `--color-accent` on `--color-surface`, `1px solid var(--color-border)`, `4px 9px`, radius `3px`. Hover: background to `--color-accent-soft`, `180ms ease-out`. Clicking routes to `/tags/[tag]`, which reuses the **Writing** archive layout verbatim: `h1` becomes the tag name prefixed with `#`, the subtitle counts matches ("4 posts tagged dbt"), and a `clear filter` mono link sits beside it. Year grouping and row markup are unchanged.

### Code block
Container: `1px solid var(--color-border)`, radius `5px`, `overflow: hidden`, body background `--color-code-bg`. Header bar on `--color-surface` with a bottom border: filename or language left (`11.5px` mono, muted), copy button right — `11px` mono, transparent background, `1px solid var(--color-border)`, radius `3px`, `3px 8px`. Hover: text and border to accent tones. On click the label swaps to `copied` for 1600ms, then reverts. Body padding `16px 18px`, `code` token, `overflow-x: auto`. **No line numbers.** Highlighting uses the palette in §2.

### Inline code
`code-inline` size on `--color-surface`, `2px 5px`, radius `3px`, no border.

### Callout
`display: flex; gap: 12px;` `14px 16px` padding, `2px` left rule, radius `0 4px 4px 0`, colors per variant table. Label is `label` token, uppercase, `flex: none`, aligned to the first text line. Body at `body-sm`. Stack `18px` apart when consecutive; `30px` below the last one.

### Figure
Image or diagram inside a `5px`-radius container with `1px solid var(--color-border)`. Caption below at `caption` token (Inter italic, muted), `10px` gap. Images ship as `next/image` with explicit dimensions; aspect ratio 16:9 unless the source dictates otherwise.

### Blockquote
`2px solid var(--color-accent-soft)` left rule, `22px` left padding, no background. Text in Newsreader italic at `21px / 1.6`, `--color-text-body`. Optional `cite` below at `meta` size, faint, `font-style: normal`, prefixed with an em dash.

### Mermaid diagram
Rendered client-side, styled as a figure. Theme overrides: node fill `#ffffff`, node stroke `--color-accent` for source/extract nodes and `--color-text` for load/destination nodes, dashed stroke for state or side-channel nodes, edge stroke `--color-text-faint`, label text `code` token at `12px` in `#2f2d28`, node radius `4px`, stroke width `1px`. No fills from the default Mermaid palette. Always captioned.

### YouTube embed
Lazy facade — no request to YouTube until interaction. 16:9 container, `#e7e4dc` background, `1px solid var(--color-border)`, radius `5px`, poster image when available. Centered play chip: `56×40px`, radius `6px`, `rgba(26,26,26,.82)`, off-white triangle. Hover `scale(1.06)`, `180ms ease-out`. Click swaps in the iframe with `autoplay=1`. Captioned like a figure.

### Footnotes
Inline reference is a `sup` mono `11px` accent anchor. The list sits above the footer behind a `1px solid var(--color-hair)` rule with a `footnotes` label. Ordered list at `footnote` size, muted, `9px` between items; each ends with a `↩` back-link at `meta` size to the reference. Anchor jumps are instant under `prefers-reduced-motion`.

### Links
Prose links: `--color-accent` with `1px solid var(--color-accent-soft)` bottom border; hover raises the border to `--color-accent` over `180ms ease-out`. Never `text-decoration: underline`. Standalone mono links (`all writing →`) use the same treatment at `nav` size.

### Buttons
Exactly one filled button on the site: **download PDF** on the CV. `--color-bg` text on `--color-accent`, `1px solid var(--color-accent)`, `9px 15px`, radius `4px`, `meta` size, trailing `↓`. Hover background `--color-accent-hover`, `180ms ease-out`. Everything else is a link.

### CV rows
Every section is the same grid: `168px 1fr`, `26px` gap, `1px solid var(--color-hair)` bottom border. Left column is mono `12px` faint (date range, then location on a second line, or the group name for skills). Right column: role at `19px` Newsreader 600, employer at `meta` in accent, then bullets at `body-sm` with `7px` gaps. Certifications use the same two-column grid, grouped by issuer: the issuer sits once in the left column, and the right column stacks its certifications (`7px` gaps) as a `space-between` row — name left as a verify link, year right in mono `12px` faint. One year per certification, never merged into the name.

---

## 6. Motion

All transitions **150–250ms, `ease-out`** (`cubic-bezier(0, 0, 0.2, 1)`). No scroll-jacking, no parallax, no scroll-triggered reveals below the fold.

| Interaction | Spec |
|---|---|
| Content on load | `opacity: 0 → 1`, `translateY(8px) → 0`, `220ms ease-out`, no delay |
| List row stagger | Same transition, `40ms` per row, first row at `120ms`; cap the stagger at 12 rows, render the rest immediately |
| Post list row hover | `transform: translateX(4px)` + title color, `180ms ease-out` |
| Nav underline | `transform: scaleX(0 → 1)`, `transform-origin: left`, `200ms ease-out` |
| Prose link hover | Border color, `180ms ease-out` |
| Tag chip hover | Background, `180ms ease-out` |
| Copy button | Color + border `180ms`; label revert after `1600ms` |
| Embed play chip | `scale(1.06)`, `180ms ease-out` |
| Route change | Fade `150ms`, no slide |

Reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Entrance animations render in their final state (no opacity or transform offset applied at all — do not animate to it faster). Hover color changes remain; hover transforms are dropped.

---

## 7. Print (CV)

The CV page is the downloadable résumé. `@media print`:

- Hide header nav, footer social links, and the download button.
- Background `#ffffff`, text `#000000` for body copy, accent retained for employer lines only.
- Remove all shadows and container borders except the `1px` section rules.
- `break-inside: avoid` on each experience block, education row, and certification row; `break-after: avoid` on section headings.
- Type at `10.5pt` body / `13pt` role / `9pt` mono, measure full page width with `18mm` margins.
- URLs printed after link text for the certification verify links.

---

## 8. OG share card

Generated per post at **1200×630** (`next/og`, edge runtime).

- Background `--color-bg`. Padding `64px 72px`.
- `3px × 160px` accent bar at the top-left of the content box.
- Post title in Newsreader 500 at `64px / 1.22`, `-0.02em`, `--color-text`, clamped to 3 lines with ellipsis.
- Baseline row: `Bijil Subhash` in Newsreader 500 at `36px` left, `bijilsubhash.io` in JetBrains Mono at `28px` faint right.
- Fonts loaded as ArrayBuffers from `public/fonts` — no network fetch at render.
- Site-level fallback card uses the same layout with the title `Bijil Subhash` and the subtitle `Data engineer · Sydney`.

---

## 9. Favicon / monogram

`b.` in Newsreader 600, `--color-bg` on a solid `--color-accent` square.

| Size | Radius | Glyph |
|---|---|---|
| 16 | `3px` | `10px` |
| 32 | `5px` | `19px` |
| 64 / apple-touch | `9px` | `38px` |
| 180 | `26px` | `108px` |

Radius scales at roughly `0.14 × size`. At 16px the period is drawn as a separate `2×2px` square so it survives rasterisation. Ship `icon.svg`, `icon-32.png`, `apple-icon.png` via the App Router metadata convention. The 32px form doubles as an optional header mark left of the wordmark.

---

## 10. Routes

| Route | Layout |
|---|---|
| `/` | Home — intro + 5 recent posts + link to archive |
| `/writing` | Full archive, year-grouped |
| `/writing/[slug]` | Post |
| `/tags/[tag]` | Archive layout, filtered |
| `/about` | About |
| `/cv` | CV (print-ready) |
| `not-found` | 404 — same chrome, content vertically centred, links to `writing` and `home` |
