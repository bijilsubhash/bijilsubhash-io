# Deploying bijilsubhash.io

Next.js (App Router) on **Vercel**. `main` is production; every pull request gets
its own preview URL. See `docs/adr/0003-vercel-deploy-topology-pr-previews.md`.

There is **no Netlify config in the repo** anymore (`netlify.toml` was removed).
The old `/blog/*` and alias URLs are preserved via 301 redirects in
`next.config.mjs` — no `_redirects` file is needed.

---

## One-time Vercel setup

1. **Create the project.** Go to <https://vercel.com/new>, import the GitHub repo
   `bijilsubhash/bijilsubhash-io`. Vercel auto-detects Next.js — accept the
   defaults:
   - Framework preset: **Next.js**
   - Build command: `next build` (default)
   - Output: default (do **not** set a static output dir)
   - Install command: `npm install` (default)
   - Root directory: `./`
   - Node version: 20 or later (Project Settings → General → Node.js Version)
2. **First deploy.** Vercel builds `main` and serves it at
   `bijilsubhash-io-*.vercel.app`. Open that URL and sanity-check the pages
   against the current live site before touching DNS.
3. No environment variables are required. (OG share cards fetch their fonts from
   Google Fonts **at build time only**; nothing is needed at runtime.)

## Add the domain (still no downtime)

4. Project → **Settings → Domains** → add `bijilsubhash.io` and `www.bijilsubhash.io`.
   Choose which is primary (apex recommended; Vercel will 308 the other to it).
   Vercel then shows the exact DNS records to create.

## DNS cutover (the switch)

Do this at whoever controls DNS for `bijilsubhash.io` today (currently the site
is served by **Netlify** — DNS may be at Netlify or at your registrar). Point the
records at Vercel:

- **Apex** `bijilsubhash.io`:
  - If the DNS host supports ALIAS/ANAME/flattened-CNAME: point it to
    `cname.vercel-dns.com`.
  - Otherwise use an **A record → `76.76.21.21`**.
- **www** `www.bijilsubhash.io`: **CNAME → `cname.vercel-dns.com`**.

Use the exact values Vercel shows in step 4 if they differ. After the records
propagate, Vercel issues the TLS certificate automatically (a few minutes to a
couple of hours). The Domains panel shows a green check when it's live.

## Retire Netlify (last)

5. Once `https://bijilsubhash.io` is verified serving from Vercel, remove the site
   from Netlify (or at minimum remove its custom domain) so it stops responding.

---

## Everyday workflow

```
git checkout -b my-change
# ... edit ...
git push -u origin my-change
# open a PR on GitHub → Vercel comments a preview URL
# review on the preview URL → merge to main → production deploy
```

## Local development

```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (run before merging anything risky)
npm run lint
```

## Where things live

- Posts: `content/writing/*.mdx` (YAML front matter: `title`, `date`, `tags`, `description`)
- About prose: `content/about.mdx`
- CV data: `src/data/cv.ts`
- Design tokens: `src/app/globals.css` (transcribed from `docs/design/design.md`)
- Redirects for old URLs: `next.config.mjs`
