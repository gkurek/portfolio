// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), sitemap()],
  output: 'static',
  site: 'https://grzegorzkurek.pl',
  env: {
    schema: {
      PUBLIC_POSTHOG_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_POSTHOG_HOST: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: 'https://eu.i.posthog.com',
      }),
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
