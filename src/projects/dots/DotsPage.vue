<script setup lang="ts">
import { computed, ref } from 'vue';
import DotStage from './DotStage.vue';
import { DOT_VARIANTS } from './dotAnimations';

const activeId = ref(DOT_VARIANTS[0].id);

const activeVariant = computed(() => DOT_VARIANTS.find((v) => v.id === activeId.value) ?? DOT_VARIANTS[0]);

function selectVariant(id: string) {
  if (id === activeId.value) return;
  activeId.value = id;
}
</script>

<template>
  <section class="home-hero">
    <div class="home-hero__bg" aria-hidden="true"></div>
    <div class="home-hero__grain" aria-hidden="true"></div>
    <span class="home-hero__version" aria-hidden="true">// v2.3</span>

    <div class="home-hero__content dots-content">
      <DotStage :variant="activeVariant" />

      <nav class="dots-nav" aria-label="Animation picker">
        <button
          v-for="variant in DOT_VARIANTS"
          :key="variant.id"
          type="button"
          class="dots-nav__btn"
          :class="{ 'dots-nav__btn--active': variant.id === activeId }"
          :title="variant.name"
          :aria-pressed="variant.id === activeId"
          @click="selectVariant(variant.id)"
        >
          {{ variant.number }}
        </button>
      </nav>
    </div>
  </section>
</template>

<style src="./styles/_page.scss"></style>
