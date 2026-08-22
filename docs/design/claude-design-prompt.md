# Claude Design prompt — bijilsubhash.io rebuild

> Paste everything below the line into Claude Design. It asks for **mockups (artboards)** plus a **`design.md` build spec**. A later Claude Code step consumes both to build the real Next.js site.

---

Design a personal website + technical blog for **Bijil Subhash**, a data engineer and founder of NimbleStax who writes long-form posts about the modern data stack (dbt, dlt, BigQuery, Python, data architecture).

## What I want from you
1. **Mockup artboards** for the screens listed below, laid out on one canvas.
2. A **`design.md`** file in the [awesome-design-md](https://github.com/voltagent/awesome-design-md) style — a portable, markdown design-system spec (tokens, type scale, spacing, component patterns, motion, voice). This is a **build spec**: a later Claude Code step will consume it to implement the site, so make it precise and implementation-ready (exact hex values, font names/weights, px/rem scales, timings/easing). It will live in the repo, not be published.

## Tech context (so the design is realistic)
- Built later in **Next.js (App Router)**, content authored in **MDX**, deployed to **Vercel**.
- **Light theme only.** No dark mode, no theme toggle.
- Self-hosted fonts via `next/font` (no external font requests at runtime).

## Personality / direction
Warm, minimal, editorial, typography-led. Primary reference is **markhorn.dev** (restrained, high-contrast minimalism, monospace-tinged detail, generous whitespace, subtle motion). Blend in the editorial warmth of **jzhao.xyz** and the clean whitespace of **blog.tomaszgil.me**. It should read as a thoughtful, credible technical writer's home — professional but human. Do **not** use jzhao's graph/digital-garden mechanics; this is a linear blog.

## Typography (self-hosted)
- **Headings & wordmark:** Fraunces (characterful serif) — for the name, post titles, section headings.
- **Body:** Inter — long-form reading.
- **Monospace:** JetBrains Mono — for code, dates, tags, and small labels/metadata.

## Color
- **Background:** warm off-white (~`#fafaf8`).
- **Text:** soft near-black (~`#1a1a1a`), not pure black.
- **Accent:** a single restrained **muted teal / deep blue** (pick a refined value; reads technical/trustworthy). Everything else grayscale.
- Define all colors as semantic tokens in `design.md` (bg, surface, text, text-muted, accent, accent-muted, border, code-bg, etc.).

## Motion (annotate on artboards; specify exact values in design.md)
Restrained and purposeful, matching markhorn:
- Gentle **fade + slide-up** on content entering on load; **stagger** list rows.
- **Hover transitions** on links and post rows (animated underline, slight color/translate shift).
- Site-wide smooth transitions, **150–250ms, ease-out**.
- **Respect `prefers-reduced-motion`** (disable when set).
- No scroll-jacking, parallax, or heavy scroll-triggered reveals.

## Global chrome
- **Header:** wordmark "Bijil Subhash" (Fraunces, links home) on the left; nav on the right — **Writing**, **About**, **CV** (three links only). No social icons in the header.
- **Footer:** `© 2026 Bijil Subhash`, social icons (GitHub, LinkedIn, email), and an **RSS** link. Small, muted, mono labels.
- **Favicon / mark:** a minimal **"b."** monogram in Fraunces on the accent color; usable as a small header mark too.

---

## Artboards to produce (full mockups)

### 1. Home
markhorn-style. A concise intro at the top — name (Fraunces) + a sentence or two on who I am and what I write about — then a list of **recent posts** (a handful), then a link through to **Writing** (the full archive). Social links live in the footer, not here. Text-forward, no large avatar.

### 2. Writing (archive)
The complete post list. **Compact rows: date (mono) + title**, grouped by year headers once long. No tags or excerpts in the rows — keep it scannable. This is the "see it all" page.

### 3. Post (kitchen-sink reference — over-specify this one)
The reading view. Show the full type hierarchy and **every rich content type** so the component library is defined:
- Title (Fraunces) with meta line beneath: **date + reading time + tags** (mono). **No author byline.**
- Body prose (Inter) with clear heading hierarchy.
- **Code block:** light syntax theme (never a dark block on the light page), **filename/language label + copy button**, **no line numbers**. JetBrains Mono.
- **Figure:** image with italic caption.
- **Blockquote** (styled).
- **Callout** component with variants: note / tip / warning.
- **Mermaid diagram**, styled for the light theme (strokes/fills keyed to the palette).
- **YouTube embed:** lazy-loaded facade, captioned, styled like a figure.
- **Footnotes:** numbered references at the bottom with return back-links.
- Clickable **tags** at top and/or bottom.

### 4. About
Warm, human bio page — the personal/professional narrative (data engineer, ex-chemical-engineering PhD, founder of NimbleStax). Editorial, readable, a step warmer than the rest of the site.

### 5. CV
Scannable professional record, distinct from About. Sections: **experience timeline**, **skills** (grouped), **education**, and **certifications** (issuer + date + verify link/badge). Design it **print/PDF-clean** — the same page doubles as the downloadable résumé.

## Style notes (no separate artboard — describe in design.md)
- **Tag page:** clicking a tag → a filtered list reusing the **Writing** archive layout.
- **404:** minimal, on-brand, matching the system.
- **OG / social share card template:** the preview image auto-generated per post — post title in Fraunces, "Bijil Subhash" wordmark, an accent bar, on the warm off-white bg. Define the template layout.

## design.md must cover
Brand voice; color tokens (semantic + hex); type scale (font families, weights, sizes, line-heights for each role); spacing scale; radii; borders/shadows; component specs (nav, footer, list row, post-meta line, code block, callout variants, figure, blockquote, YouTube embed, tag chip, buttons/links); motion timings + easing + reduced-motion behavior; OG card template; favicon/monogram spec.
