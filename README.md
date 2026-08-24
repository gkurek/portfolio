# Portfolio — Grzegorz Kurek

Personal portfolio built with **Astro 5** + **Vue 3**. Static output ready to copy to any hosting.

## Stack

- Astro (static site generation)
- Vue 3 islands (navigation, patience game)
- SCSS
- localStorage for game stats (Supabase-ready adapter stub for later)

## Requirements

- Node.js >= 22.12

## Development

```bash
npm install
npm run dev
```

Dev server: http://localhost:4321

## Production build

```bash
npm run build
```

Output lands in `dist/` — copy its contents to your hosting root (FTP/SFTP).

Static assets you want at the site root (favicon, CV PDF) go in `public/`.

## Deploy checklist

1. `npm run build`
2. Upload everything from `dist/` to www root
3. Add `public/Grzegorz_Kurek_CV.pdf` before build if CV download is needed

No PHP or server-side runtime required.

## Patience game stats

Stats are stored in the browser (`localStorage` key: `patience-game-stats`).

To switch to Supabase later:

1. Implement `src/lib/stats/supabaseAdapter.ts`
2. Set env vars (see `.env.example`)
3. Set `PUBLIC_STATS_PROVIDER=supabase`

The rest of the app uses `getStatsAdapter()` — no component changes needed.

## Project structure

```
src/
  components/     Vue islands
  composables/    shared Vue logic
  config/         site content (links, projects)
  layouts/        Astro layouts
  lib/stats/      stats adapters (localStorage / supabase stub)
  pages/          routes
  styles/         SCSS
public/           static files → copied to dist root
dist/             build output (gitignored)
```

## Legacy

Previous version (HTML + vanilla JS + PHP) is preserved on the `master` branch and tag `v1-legacy` (create tag before merge if needed).
