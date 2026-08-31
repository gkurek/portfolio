# Portfolio — Grzegorz Kurek

Personal portfolio built with **Astro 7** + **Vue 3**. Static output ready to copy to any hosting.

The homepage hero is static HTML (name, tagline, social links); only the decorative dot sphere is a Vue island (`client:idle`).

## Branches

| Branch | Contents |
|--------|----------|
| `master` | Homepage only — production site at [grzegorzkurek.pl](https://grzegorzkurek.pl) |
| `projects` | Full site with all demo projects (patience, natours, sandbox, dots) |

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
npm run check
npm run format
```

Dev server: http://localhost:4321

## Production build

```bash
npm run build
```

Output lands in `dist/` — copy its contents to your hosting root (FTP/SFTP).

Static assets you want at the site root (favicon, CV PDF) go in `public/`.

## Deploy checklist

1. Check out `master` for the live homepage
2. `npm run build`
3. Upload everything from `dist/` to www root
4. Add `public/Grzegorz_Kurek_CV.pdf` before build if CV download is needed

No PHP or server-side runtime required.

## Project structure

```
src/
  components/home/  Hero (static Astro), dot sphere (Vue island), social links
  config/           site content (name, social links)
  layouts/          Astro layouts
  pages/            routes (index only on master)
public/             static files → copied to dist root
dist/               build output (gitignored)
.github/workflows/  CI (lint, check, build)
```

## Legacy

Previous version (HTML + vanilla JS + PHP) is preserved on tag `v1-legacy`.
