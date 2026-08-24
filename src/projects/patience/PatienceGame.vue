<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { usePatienceGame } from './usePatienceGame';

const { autoStart = true } = defineProps<{
  autoStart?: boolean;
}>();

const {
  isGameOpen,
  isStatsOpen,
  gameEnded,
  currentTime,
  stats,
  durabilityLevel,
  comparisonText,
  openGame,
  openStats,
  closeAll,
} = usePatienceGame();

const comparisonMarkup = computed(() => {
  if (!stats.value || stats.value.times.length <= 1) {
    return comparisonText.value;
  }

  return comparisonText.value.replace(
    `${stats.value.avg}s`,
    `<span>${stats.value.avg}s</span>`,
  );
});

onMounted(() => {
  if (autoStart) {
    openGame();
  }
});

onBeforeUnmount(() => {
  closeAll();
});
</script>

<template>
  <div class="modal center" :class="{ show: isGameOpen }">
    <div class="center">
      <i v-if="!gameEnded" class="fas fa-spinner spin" />
      <h2 class="game-header">
        {{ gameEnded ? 'thanks for playing :)' : 'patience game' }}
      </h2>
    </div>
    <div class="game-options" :style="{ display: gameEnded ? 'block' : 'none' }">
      <a href="#" @click.prevent="openStats">check your score</a>
      <a href="/" @click="closeAll">close</a>
    </div>
  </div>

  <div class="modal-stats center" :class="{ show: isStatsOpen }">
    <p class="stats">Time you managed to last without a click:</p>
    <h1 class="score1">{{ currentTime }}s</h1>
    <p class="stats2" v-html="comparisonMarkup" />
    <p class="stats">Your loading wheel durability level:</p>
    <h1 class="score2">{{ durabilityLevel }}</h1>
    <p v-if="stats && stats.times.length > 0" class="stats">
      Personal best: <span>{{ stats.best }}s</span>
      ({{ stats.times.length }} {{ stats.times.length === 1 ? 'round' : 'rounds' }})
    </p>
    <a href="/" @click="closeAll">close</a>
  </div>
</template>
