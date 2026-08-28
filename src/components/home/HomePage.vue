<script setup lang="ts">
import { site } from '../../config/site';
import HeroDotStage from './HeroDotStage.vue';
import { HOME_HERO_VARIANT } from './heroDotAnimation';

const github = site.social.find((item) => item.id === 'github');
const linkedin = site.social.find((item) => item.id === 'linkedin');
</script>

<template>
  <section class="home-hero">
    <div class="home-hero__bg" aria-hidden="true"></div>
    <div class="home-hero__grain" aria-hidden="true"></div>
    <span class="home-hero__version" aria-hidden="true">// v2.3</span>

    <div class="home-hero__content">
      <HeroDotStage class="home-hero__stage" :variant="HOME_HERO_VARIANT" aria-hidden="true" />

      <h1 class="home-hero__name">
        {{ site.name }}
      </h1>

      <p class="home-hero__tagline">
        <span>&gt; {{ site.tagline }}</span>
        <span class="home-hero__cursor" aria-hidden="true">_</span>
      </p>

      <nav class="home-hero__social" aria-label="Social links">
        <a
          v-if="github"
          :href="github.url"
          :title="github.title"
          target="_blank"
          rel="noreferrer noopener"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10Z" />
          </svg>
        </a>
        <a
          v-if="linkedin"
          :href="linkedin.url"
          :title="linkedin.title"
          target="_blank"
          rel="noreferrer noopener"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-3.96 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48Z" />
          </svg>
        </a>
      </nav>
    </div>
  </section>
</template>
