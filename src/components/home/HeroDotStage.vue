<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type { DotParticle, HeroDotVariant, Shockwave } from './heroDotAnimation';
import {
  applyShockwaves,
  findNearestParticle,
  pushShockwave,
  resetParticles,
} from './heroDotAnimation';

const props = defineProps<{
  variant: HeroDotVariant;
}>();

const rootEl = ref<HTMLElement | null>(null);
const spinEl = ref<HTMLElement | null>(null);

let particles: DotParticle[] = [];
let waves: Shockwave[] = [];
let rafId = 0;
let lastTime = 0;
let yaw = 0;

function tick(time: number) {
  const dt = Math.min(0.05, (time - lastTime) / 1000);
  lastTime = time;

  const spin = spinEl.value;
  if (!spin || !particles.length) {
    rafId = requestAnimationFrame(tick);
    return;
  }

  yaw += (Math.PI * 2 / props.variant.spinDuration) * dt;

  const tilt = props.variant.rotateX;

  if (waves.length > 0) {
    waves = applyShockwaves(particles, waves, dt, yaw, tilt);
  } else {
    resetParticles(particles, yaw, tilt);
  }

  rafId = requestAnimationFrame(tick);
}

function onPointerDown(event: PointerEvent) {
  const root = rootEl.value;
  const spin = spinEl.value;
  if (!particles.length || !root || !spin) return;

  event.preventDefault();

  const rect = root.getBoundingClientRect();
  const nearest = findNearestParticle(
    particles,
    rect,
    event.clientX,
    event.clientY,
    yaw,
    props.variant.rotateX,
    props.variant.perspective,
  );
  waves = pushShockwave(waves, nearest.base);
  waves = applyShockwaves(particles, waves, 0, yaw, props.variant.rotateX);
}

function render() {
  const spin = spinEl.value;
  if (!spin) return;

  waves = [];
  spin.replaceChildren();
  particles = props.variant.build(spin, props.variant.scale);
}

function onStageMounted() {
  const spin = spinEl.value;
  if (!spin) return;
  yaw = Math.random() * Math.PI * 2;
  render();
  lastTime = performance.now();
  rafId = requestAnimationFrame(tick);
}

onMounted(onStageMounted);
onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <div
    ref="rootEl"
    class="dots-stage"
    :style="{ perspective: `${variant.perspective}px` }"
    @pointerdown="onPointerDown"
  >
    <div class="dots-stage__tilt">
      <div ref="spinEl" class="dots-stage__spin" />
    </div>
  </div>
</template>

<style src="./_hero-stage.scss"></style>
