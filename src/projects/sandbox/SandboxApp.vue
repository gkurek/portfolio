<script setup lang="ts">
import { ref } from 'vue';
import { useSandboxScene } from './useSandboxScene';

const containerRef = ref<HTMLElement | null>(null);

useSandboxScene(containerRef);
</script>

<template>
  <div ref="containerRef" class="sandbox" />
</template>

<style scoped>
.sandbox {
  width: 100%;
  height: 100vh;
  cursor: grab;
}

.sandbox:active {
  cursor: grabbing;
}
</style>
