# Portfolio — Grzegorz Kurek

Personal portfolio built with **Astro 7** + **Vue 3**. Static output ready to copy to any hosting.

The homepage hero is static HTML (name, tagline, social links); only the decorative dot sphere is a Vue island (`client:idle`).

## Branches

| Branch     | Contents                                                                        |
| ---------- | ------------------------------------------------------------------------------- |
| `master`   | Homepage only — production site at [grzegorzkurek.pl](https://grzegorzkurek.pl) |
| `projects` | Full site with all demo projects (patience, natours, sandbox, dots)             |

To work on projects locally:

```bash
git checkout projects
npm install
npm run dev
```

To work on the homepage:

```bash
git checkout master
npm install
npm run dev
```

## Stack

- Astro 7 (static site generation)
- Vue 3 island for the hero dot sphere

## Requirements

- Node.js >= 22.12

## Development

```bash
npm install
npm run dev
npm run lint
npm run format:check
npm run check
npm run format
```

Dev server: [http://localhost:4321](http://localhost:4321)

## Production build

```bash
npm run build
```

Output lands in `dist/` — copy its contents to your hosting root (FTP/SFTP).

Static assets you want at the site root (favicon, OG image) go in `public/`.

Typography uses a root `font-size` of 8px on mobile and 10px from 768px up, so component sizes written in `rem` scale with the viewport.

## Analytics & privacy

In production, [PostHog](https://posthog.com/) loads when `PUBLIC_POSTHOG_KEY` is set at build time. It uses cookies and may collect usage data (page views, session replay depending on your PostHog project settings). The default host is the EU instance (`https://eu.i.posthog.com`). EU visitors should be informed via your privacy policy or cookie notice if required.

PostHog does not load on `localhost` or when the key is unset.

## Deploy checklist

1. Check out `master` for the live homepage
2. `npm run build`
3. Upload everything from `dist/` to www root

No PHP or server-side runtime required for this version

## Project structure

```
src/
  components/home/  Hero (static Astro), dot sphere (Vue island), social links
  config/           site content (name, social links, SEO)
  layouts/          Astro layouts
  pages/            routes (index only on master)
public/             static files → copied to dist root
dist/               build output (gitignored)
.github/workflows/  CI (lint, check, build)
```

## Legacy

Previous version (HTML + vanilla JS + PHP) is preserved on tag `v1-legacy`.
