<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { HeroDotVariant } from './heroDotAnimation';

const props = defineProps<{
  variant: HeroDotVariant;
}>();

const stageEl = ref<HTMLElement | null>(null);

function render() {
  const stage = stageEl.value;
  if (!stage) return;

  stage.replaceChildren();
  stage.style.animation = `gk-spin ${props.variant.spinDuration}s linear infinite`;
  props.variant.build(stage, props.variant.scale);
}

onMounted(render);
</script>

<template>
  <div class="dots-stage" :style="{ perspective: `${variant.perspective}px` }">
    <div
      class="dots-stage__tilt"
      :style="{ transform: `rotateX(${variant.rotateX}deg) rotateZ(${variant.rotateZ}deg)` }"
    >
      <div class="dots-stage__spin" ref="stageEl" />
    </div>
  </div>
</template>

<style src="./_hero-stage.scss"></style>
