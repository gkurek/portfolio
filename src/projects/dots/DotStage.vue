<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { DotVariant } from './dotAnimations';

const props = defineProps<{
  variant: DotVariant;
}>();

const stageEl = ref<HTMLElement | null>(null);
const isRadar = computed(() => props.variant.id === 'radar');

function render() {
  const stage = stageEl.value;
  if (!stage) return;

  stage.replaceChildren();

  if (isRadar.value) {
    props.variant.build(stage, props.variant.scale);
    return;
  }

  stage.style.animation = props.variant.spinDuration
    ? `gk-spin ${props.variant.spinDuration}s linear infinite`
    : 'none';
  props.variant.build(stage, props.variant.scale);
}

watch(() => props.variant.id, render, { flush: 'post' });
onMounted(render);
</script>

<template>
  <div
    class="dots-stage"
    :class="{ 'dots-stage--radar': isRadar }"
    :style="isRadar ? undefined : { perspective: `${variant.perspective}px` }"
  >
    <div
      v-if="!isRadar"
      class="dots-stage__tilt"
      :style="{ transform: `rotateX(${variant.rotateX}deg) rotateZ(${variant.rotateZ}deg)` }"
    >
      <div class="dots-stage__spin" ref="stageEl" />
    </div>
    <div v-else class="dot-radar" ref="stageEl" />
  </div>
</template>

<style src="./styles/_stage.scss"></style>
