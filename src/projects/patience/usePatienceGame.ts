import { computed, ref } from 'vue';
import { getStatsAdapter, type GameStats } from '../../lib/stats';

export function usePatienceGame() {
  const adapter = getStatsAdapter();

  const isGameOpen = ref(false);
  const isStatsOpen = ref(false);
  const gameEnded = ref(false);
  const currentTime = ref<number | null>(null);
  const stats = ref<GameStats | null>(null);

  let startTime = 0;
  let clickHandler: ((event: MouseEvent) => void) | null = null;

  const durabilityLevel = computed(() => {
    if (currentTime.value === null || stats.value === null || stats.value.times.length <= 1) {
      return 'FIRST RUN';
    }

    return currentTime.value < stats.value.avg ? 'TRIGGER HAPPY' : 'ZEN APPRENTICE';
  });

  const comparisonText = computed(() => {
    if (currentTime.value === null || stats.value === null || stats.value.times.length <= 1) {
      return 'Play a few rounds to build your personal average.';
    }

    const direction = currentTime.value > stats.value.avg ? 'above' : 'below';
    return `That's a bit ${direction} your ${stats.value.avg}s average.`;
  });

  function removeClickHandler() {
    if (clickHandler) {
      document.body.removeEventListener('click', clickHandler);
      clickHandler = null;
    }
  }

  function openGame() {
    isGameOpen.value = true;
    isStatsOpen.value = false;
    gameEnded.value = false;
    currentTime.value = null;
    removeClickHandler();

    clickHandler = (event: MouseEvent) => {
      if (!isGameOpen.value || gameEnded.value) {
        return;
      }

      const elapsed = (performance.now() - startTime) / 1000;
      if (elapsed <= 0) {
        return;
      }

      event.preventDefault();
      void finishGame(elapsed);
    };

    document.body.addEventListener('click', clickHandler);
    requestAnimationFrame(() => {
      startTime = performance.now();
    });
  }

  async function finishGame(time: number) {
    if (gameEnded.value) {
      return;
    }

    gameEnded.value = true;
    currentTime.value = parseFloat(time.toFixed(3));
    removeClickHandler();
    await adapter.saveTime(currentTime.value);
  }

  async function openStats() {
    stats.value = await adapter.getStats();
    isGameOpen.value = false;
    isStatsOpen.value = true;
  }

  function closeAll() {
    removeClickHandler();
    isGameOpen.value = false;
    isStatsOpen.value = false;
    gameEnded.value = false;
    currentTime.value = null;
  }

  return {
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
  };
}
