<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type { DotParticle, Shockwave } from './heroDotAnimation';
import {
  applyShockwaves,
  findNearestParticle,
  HOME_HERO_VARIANT,
  pushShockwave,
  resetParticles,
} from './heroDotAnimation';

const variant = HOME_HERO_VARIANT;

const rootEl = ref<HTMLElement | null>(null);
const spinEl = ref<HTMLElement | null>(null);
const isReducedMotion = ref(false);

let particles: DotParticle[] = [];
let waves: Shockwave[] = [];
let rafId = 0;
let lastTime = 0;
let yaw = 0;
let isTabVisible = true;
let motionMq: MediaQueryList | null = null;

function tick(time: number) {
  if (!isTabVisible || isReducedMotion.value) {
    rafId = 0;
    return;
  }

  const dt = Math.min(0.05, (time - lastTime) / 1000);
  lastTime = time;

  const spin = spinEl.value;
  if (!spin || !particles.length) {
    rafId = requestAnimationFrame(tick);
    return;
  }

  yaw += ((Math.PI * 2) / variant.spinDuration) * dt;

  const tilt = variant.rotateX;

  if (waves.length > 0) {
    waves = applyShockwaves(particles, waves, dt, yaw, tilt);
  } else {
    resetParticles(particles, yaw, tilt);
  }

  rafId = requestAnimationFrame(tick);
}

function startAnimation() {
  if (isReducedMotion.value || !isTabVisible || rafId) return;
  lastTime = performance.now();
  rafId = requestAnimationFrame(tick);
}

function stopAnimation() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
}

function triggerShockwave(clientX: number, clientY: number) {
  if (isReducedMotion.value) return;

  const root = rootEl.value;
  const spin = spinEl.value;
  if (!particles.length || !root || !spin) return;

  const rect = root.getBoundingClientRect();
  const nearest = findNearestParticle(
    particles,
    rect,
    clientX,
    clientY,
    yaw,
    variant.rotateX,
    variant.perspective,
  );
  waves = pushShockwave(waves, nearest.base);
  waves = applyShockwaves(particles, waves, 0, yaw, variant.rotateX);
  startAnimation();
}

function onPointerDown(event: PointerEvent) {
  if (isReducedMotion.value) return;

  event.preventDefault();
  triggerShockwave(event.clientX, event.clientY);
}

function onKeyDown(event: KeyboardEvent) {
  if (isReducedMotion.value) return;
  if (event.key !== 'Enter' && event.key !== ' ') return;

  event.preventDefault();

  const root = rootEl.value;
  if (!root) return;

  const rect = root.getBoundingClientRect();
  triggerShockwave(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

function render() {
  const spin = spinEl.value;
  if (!spin) return;

  waves = [];
  spin.replaceChildren();
  particles = variant.build(spin, variant.scale);
}

function onVisibilityChange() {
  isTabVisible = document.visibilityState === 'visible';
  if (isTabVisible) {
    startAnimation();
  } else {
    stopAnimation();
  }
}

function onMotionPreferenceChange(event: MediaQueryListEvent) {
  isReducedMotion.value = event.matches;
  if (isReducedMotion.value) {
    stopAnimation();
    waves = [];
    if (particles.length) {
      resetParticles(particles, yaw, variant.rotateX);
    }
  } else if (isTabVisible) {
    startAnimation();
  }
}

function onStageMounted() {
  const spin = spinEl.value;
  if (!spin) return;

  motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  isReducedMotion.value = motionMq.matches;

  yaw = Math.random() * Math.PI * 2;
  render();
  resetParticles(particles, yaw, variant.rotateX);

  if (!isReducedMotion.value) {
    startAnimation();
  }
}

onMounted(() => {
  onStageMounted();
  document.addEventListener('visibilitychange', onVisibilityChange);
  motionMq?.addEventListener('change', onMotionPreferenceChange);
});

onUnmounted(() => {
  stopAnimation();
  document.removeEventListener('visibilitychange', onVisibilityChange);
  motionMq?.removeEventListener('change', onMotionPreferenceChange);
});
</script>

<template>
  <div
    ref="rootEl"
    class="dots-stage"
    :class="{ 'dots-stage--static': isReducedMotion }"
    :role="isReducedMotion ? undefined : 'button'"
    :tabindex="isReducedMotion ? undefined : 0"
    :aria-hidden="isReducedMotion ? 'true' : undefined"
    :aria-label="
      isReducedMotion
        ? undefined
        : 'Animated dot sphere. Press or click to send a ripple.'
    "
    :style="{ perspective: `${variant.perspective}px` }"
    @pointerdown="onPointerDown"
    @keydown="onKeyDown"
  >
    <div class="dots-stage__tilt">
      <div ref="spinEl" class="dots-stage__spin" />
    </div>
  </div>
</template>

<style scoped>
.dots-stage {
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

.dots-stage:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.dots-stage--static {
  cursor: default;
  pointer-events: none;
  touch-action: auto;
}

.dots-stage__tilt,
.dots-stage__spin {
  transform-style: preserve-3d;
}
</style>
